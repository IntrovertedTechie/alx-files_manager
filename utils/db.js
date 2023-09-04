import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client.connect(async (err) => {
      if (err) {
        console.error(`MongoDB connection error: ${err}`);
      } else {
        console.log('MongoDB connected');
        // Create the 'files_manager' database if it doesn't exist
        const db = this.client.db(database);
        await db.createCollection('users'); // Create a collection (table) for users
        await db.createCollection('files'); // Create a collection (table) for files
      }
    });
  }

  // ... (rest of the methods are similar)
}

const dbClient = new DBClient();

export default dbClient;
