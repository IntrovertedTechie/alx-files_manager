const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.db = null;
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/`;

    MongoClient.connect(url, { useUnifiedTopology: true }, async (error, client) => {
      if (error) throw error;
      this.db = client.db(database);

      // Check if the database exists, and create it if missing
      const collections = await this.db.listCollections().toArray();
      const collectionNames = collections.map((collection) => collection.name);

      if (!collectionNames.includes('users')) {
        await this.db.createCollection('users', { capped: false });
      }

      if (!collectionNames.includes('files')) {
        await this.db.createCollection('files', { capped: false });
      }
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    if (!this.db) return 0;
    const nbUsers = await this.db.collection('users').countDocuments();
    return nbUsers;
  }

  async nbFiles() {
    if (!this.db) return 0;
    const nbFiles = await this.db.collection('files').countDocuments();
    return nbFiles;
  }

  // Define the usersCollection method to return the 'users' collection
  usersCollection() {
    if (!this.db) return null;
    return this.db.collection('users');
  }

  // Define the filesCollection method to return the 'files' collection
  filesCollection() {
    if (!this.db) return null;
    return this.db.collection('files');
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
