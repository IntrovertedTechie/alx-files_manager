const { checkRedis, checkDatabase } = require('../utils'); // Import your utility functions

class AppController {
  static getStatus(req, res) {
    // Check Redis and Database status using your utility functions
    const redisStatus = checkRedis();
    const dbStatus = checkDatabase();

    if (redisStatus && dbStatus) {
      res.status(200).json({ "redis": true, "db": true });
    } else {
      res.status(500).json({ "redis": false, "db": false });
    }
  }

  static getStats(req, res) {
    // You should count the number of users and files using your collections here
    const usersCount = /* Count users from your collection */;
    const filesCount = /* Count files from your collection */;

    res.status(200).json({ "users": usersCount, "files": filesCount });
  }
}

module.exports = AppController;
