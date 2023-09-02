import { checkRedis } from '../utils/redis'; // Import your Redis utility  
import { checkDB } from '../utils/db'; // Import your DB utility  

const AppController = {  
  getStatus: async (req, res) => {  
    try {  
      // Your logic for the /status route goes here.
      res.status(200).json({ "status": "ok" });  
    } catch (error) {  
      res.status(500).json({ "status": "error" });  
    }  
  },
  
  getStats: async (req, res) => {  
    try {  
      // Simulate counting users and files (you need to replace this with actual database queries) 
      const userCount = 4; // Replace with your user count logic 
      const fileCount = 30; // Replace with your file count logic  
  
      res.status(200).json({ "users": userCount, "files": fileCount });  
    } catch (error) {  
      res.status(500).json({ "users": 0, "files": 0 });  
    }  
  }  
}; 

export default AppController;
