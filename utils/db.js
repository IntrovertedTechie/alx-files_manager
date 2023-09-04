// Import necessary MongoDB packages
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // MongoDB connection settings
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URL
    this.url = `mongodb://${this.host}:${this.port}/${this.database}`;

    // Initialize MongoDB client
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
  }

  async isAlive() {
    try {
      // Check if the MongoDB client is connected
      await this.client.connect();
      return true;
    } catch (error) {
      return false;
    } finally {
      this.client.close();
    }
  }

  async nbUsers() {
    // Implement code to count documents in the 'users' collection
  }

  async nbFiles() {
    // Implement code to count documents in the 'files' collection
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
