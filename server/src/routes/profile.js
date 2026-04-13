import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/me', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        address: true,
        desiredJob: true,
        careerLevel: true,
        employmentType: true,
        workStyle: true,
        introduction: true,
        profileVisibility: true,
        allowProposals: true,
        verificationStatus: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    res.json({ profile: user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

router.patch('/visibility', async (req, res) => {
  try {
    const { visibility } = req.body;

    if (!['public', 'conditional', 'private'].includes(visibility)) {
      return res.status(400).json({ error: '유효하지 않은 공개 범위입니다.' });
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { profileVisibility: visibility },
      select: {
        id: true,
        profileVisibility: true
      }
    });

    res.json({ message: '공개 범위가 저장되었습니다.', profile: user });
  } catch (error) {
    console.error('Update visibility error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

export default router;
