import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'hell-dev-secret-key-change-in-production';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

// POST /api/auth/signup/individual
router.post('/signup/individual', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      postcode,
      address,
      detailAddress,
      termsAgree,
      policyAgree,
      marketingAgree
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: '필수 항목이 누락되었습니다.' });
    }

    if (!termsAgree || !policyAgree) {
      return res.status(400).json({ error: '필수 약관에 동의해주세요.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: '이미 가입된 이메일입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        postcode: postcode || null,
        address: address || null,
        detailAddress: detailAddress || null,
        termsAgree,
        policyAgree,
        marketingAgree: marketingAgree || false,
        role: 'individual'
      }
    });

    const token = generateToken(user);
    
    res.status(201).json({
      message: '개인 회원가입이 완료되었습니다.',
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error('Individual signup error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// POST /api/auth/signup/company
router.post('/signup/company', async (req, res) => {
  try {
    const {
      managerName,
      email,
      password,
      phone,
      companyName,
      businessNumber,
      department,
      position,
      postcode,
      address,
      detailAddress,
      termsAgree,
      policyAgree,
      marketingAgree
    } = req.body;

    if (!managerName || !email || !password || !companyName || !businessNumber) {
      return res.status(400).json({ error: '필수 항목이 누락되었습니다.' });
    }

    if (!termsAgree || !policyAgree) {
      return res.status(400).json({ error: '필수 약관에 동의해주세요.' });
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ error: '이미 가입된 이메일입니다.' });
    }

    const existingBusiness = await prisma.user.findUnique({ where: { businessNumber } });
    if (existingBusiness) {
      return res.status(409).json({ error: '이미 등록된 사업자등록번호입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: managerName,
        email,
        password: hashedPassword,
        phone: phone || null,
        companyName,
        businessNumber,
        department: department || null,
        position: position || null,
        postcode: postcode || null,
        address: address || null,
        detailAddress: detailAddress || null,
        termsAgree,
        policyAgree,
        marketingAgree: marketingAgree || false,
        role: 'company',
        verificationStatus: 'pending'
      }
    });

    const token = generateToken(user);
    
    res.status(201).json({
      message: '기업 회원가입이 완료되었습니다. 기업 인증 후 이용 가능합니다.',
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error('Company signup error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: '이메일과 비밀번호를 입력해주세요.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    const token = generateToken(user);
    
    res.json({
      message: '로그인 성공',
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ message: '로그아웃되었습니다.' });
});

export default router;
