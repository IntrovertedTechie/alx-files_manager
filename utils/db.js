import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    this.db = null;
    this.usersCollection = null;
    this.filesCollection = null;

    MongoClient.connect(url, { useUnifiedTopology: true })
      .then((client) => {
        this.db = client.db(DB_DATABASE);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        this.db = null;
      });
  }

  isAlive() {
    return Boolean(this.db);
  }

  async nbUsers() {
    if (!this.usersCollection) return 0;
    const numberOfUsers = await this.usersCollection.countDocuments();
    return numberOfUsers;
  }

  async nbFiles() {
    if (!this.filesCollection) return 0;
    const numberOfFiles = await this.filesCollection.countDocuments();
    return numberOfFiles;
  }
}

const dbClient = new DBClient();

export default dbClient;
