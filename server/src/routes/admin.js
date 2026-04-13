import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

function checkAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  next();
}

router.use(checkAdmin);

router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        verificationStatus: true,
        companyName: true,
        createdAt: true,
      }
    });

    res.json({ users });
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

router.get('/companies', async (req, res) => {
  try {
    const companies = await prisma.user.findMany({
      where: { role: 'company' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        companyName: true,
        businessNumber: true,
        verificationStatus: true,
        department: true,
        position: true,
        createdAt: true,
      }
    });

    res.json({ companies });
  } catch (error) {
    console.error('Admin get companies error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

router.patch('/companies/:userId/verify', async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['pending', 'verified', 'rejected'].includes(status)) {
      return res.status(400).json({ error: '유효하지 않은 상태값입니다.' });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { verificationStatus: status },
      select: {
        id: true,
        email: true,
        name: true,
        companyName: true,
        verificationStatus: true,
      }
    });

    res.json({ user, message: '기업 인증 상태가 변경되었습니다.' });
  } catch (error) {
    console.error('Admin verify company error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

export default router;
