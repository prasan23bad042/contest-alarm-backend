import { Router, Request, Response } from 'express';
import { getUpcomingContests } from '../db/contestRepository';

const router = Router();

router.get('/upcoming', async (req: Request, res: Response) => {
  try {
    const upcomingContests = await getUpcomingContests();

    res.status(200).json({
      success: true,
      count: upcomingContests.length,
      contests: upcomingContests,
    });
  } catch (error: any) {
    console.error(
      '[API ERROR] Failed to fetch upcoming contests:',
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        'Failed to fetch contests from database',
    });
  }
});

export default router;
