import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // Define MongoDB connection parameters using environment variables or defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URL
    const url = `mongodb://${host}:${port}/${database}`;

    // Create a MongoDB client instance
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('MongoDB Connection Error:', err);
      });
  }

  async isAlive() {
    // Use ping to check if the MongoDB client is connected
    try {
      await this.client.db().admin().ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    // Implement the logic to count the number of documents in the 'users' collection
  }

  async nbFiles() {
    // Implement the logic to count the number of documents in the 'files' collection
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();

export default dbClient;
