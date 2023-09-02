import { checkRedis } from '../utils/redis'; // Import your Redis utility
import { checkDB } from '../utils/db'; // Import your DB utility

const AppController = {
  getStatus: async (req, res) => {
    try {
      const redisStatus = await checkRedis();
      const dbStatus = await checkDB();
      
      if (redisStatus && dbStatus) {
        res.status(200).json({ "redis": true, "db": true });
      } else {
        res.status(500).json({ "redis": false, "db": false });
      }
    } catch (error) {
      res.status(500).json({ "redis": false, "db": false });
    }
  },

  getStats: async (req, res) => {
    try {
      // Use your collections (e.g., users and files) to count users and files
      const userCount = await UserCollection.countDocuments();
      const fileCount = await FileCollection.countDocuments();

      res.status(200).json({ "users": userCount, "files": fileCount });
    } catch (error) {
      res.status(500).json({ "users": 0, "files": 0 });
    }
  }
};

export default AppController;
