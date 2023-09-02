const db = require('../utils/db');
const redis = require('../utils/redis');

class AppController {
  static async getStatus(req, res) {
    try {
      // Check Redis and Database status using your utility functions
      const redisStatus = await redis.checkRedis();
      const dbStatus = await db.checkDatabase();

      if (redisStatus && dbStatus) {
        res.status(200).json({ "redis": true, "db": true });
      } else {
        res.status(500).json({ "redis": false, "db": false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "Internal server error" });
    }
  }

  static async getStats(req, res) {
    try {
      // You should count the number of users and files using your collections here
      const usersCount = await db.countUsers();
      const filesCount = await db.countFiles();

      res.status(200).json({ "users": usersCount, "files": filesCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "Internal server error" });
    }
  }
}

module.exports = AppController;
