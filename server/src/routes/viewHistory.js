import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/my-history', async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    let history = [];

    if (user.role === 'individual') {
      history = await prisma.viewHistory.findMany({
        where: { viewedId: userId },
        include: {
          viewer: {
            select: {
              id: true,
              name: true,
              companyName: true,
              department: true,
              position: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      history = history.map(h => ({
        id: h.id,
        viewerCompanyName: h.viewer.companyName,
        viewerDepartment: h.viewer.department,
        viewerPosition: h.viewer.position,
        viewedAt: h.createdAt,
        reason: h.reason
      }));
    } else if (user.role === 'company') {
      history = await prisma.viewHistory.findMany({
        where: { viewerId: userId },
        include: {
          viewed: {
            select: {
              id: true,
              name: true,
              desiredJob: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      history = history.map(h => ({
        id: h.id,
        viewedProfileName: h.viewed.name,
        viewedJob: h.viewed.desiredJob,
        viewedAt: h.createdAt,
        reason: h.reason
      }));
    }

    res.json({ history });
  } catch (error) {
    console.error('View history error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

export default router;
