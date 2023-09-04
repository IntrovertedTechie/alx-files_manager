import { MongoClient } from 'mongodb';

// Set up URL and database name
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const url = `mongodb://${host}:${port}`;
const dbName = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    this.client.connect(async (err) => {
      if (err) {
        console.error(`MongoDB connection error: ${err}`);
      } else {
        console.log('Connected to mongodb server');
        // Create the 'files_manager' database if it doesn't exist
        await this.createDatabase(dbName);
        this.db = this.client.db(dbName);
      }
    });
  }

  // Helper function to create the database if it doesn't exist
  async createDatabase(databaseName) {
    const adminDb = this.client.db('admin');
    const databasesList = await adminDb.admin().listDatabases();

    if (!databasesList.databases.find(db => db.name === databaseName)) {
      await adminDb.admin().createDatabase(databaseName);
    }
  }

  // ... (rest of the methods are similar)
}

const dbClient = new DBClient();
export default dbClient;
