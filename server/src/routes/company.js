import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/request-verification', async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    if (user.role !== 'company') {
      return res.status(403).json({ error: '기업 회원만 인증을 요청할 수 있습니다.' });
    }

    if (user.verificationStatus === 'verified') {
      return res.status(400).json({ error: '이미 인증 완료된 기업입니다.' });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { verificationStatus: 'pending' }
    });

    res.json({ message: '인증 요청이 완료되었습니다. 관리자의 검토를 기다려주세요.' });
  } catch (error) {
    console.error('Request verification error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

export default router;
