import { Router, Request, Response } from 'express';
import { syncPlatform } from '../sync/platformSyncEngine';
import { syncPlatforms } from '../sync/syncPlatforms';

const router = Router();

// Sync multiple platforms
router.post(
  '/',
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const platforms =
        req.body?.platforms;

      if (
        !Array.isArray(platforms) ||
        platforms.length === 0
      ) {

        res.status(400).json({
          success: false,
          message:
            'platforms must be a non-empty array',
        });

        return;
      }

      const result =
        await syncPlatforms(platforms);

      res.status(
        result.success ? 200 : 500
      ).json(result);

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message:
          error.message ||
          'Sync failed',
      });
    }
  }
);

// Backward-compatible single-platform route
router.post(
  '/:platform',
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const platform =
        String(req.params.platform)
          .trim()
          .toLowerCase();

      if (!platform) {

        res.status(400).json({
          success: false,
          message:
            'Platform is required',
        });

        return;
      }

      const result =
        await syncPlatform(platform);

      res.status(
        result.success ? 200 : 500
      ).json(result);

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message:
          error.message ||
          'Sync failed',
      });
    }
  }
);

export default router;