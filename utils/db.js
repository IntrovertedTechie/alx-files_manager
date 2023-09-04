const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.dbName = null;
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (error) throw error;
      this.dbName = client.db(database);

      // Check if the database exists, and create it if missing
      this.dbName.listCollections().toArray((err, collections) => {
        if (err) throw err;
        const dbExists = collections.some((collection) => collection.name === 'users' || collection.name === 'files');

        if (!dbExists) {
          // Create the necessary collections (users and files)
          this.dbName.createCollection('users');
          this.dbName.createCollection('files');
        }
      });
    });
  }

  isAlive() {
    return !!this.dbName;
  }

  async nbUsers() {
    const nbusers = await this.dbName.collection('users').countDocuments();
    return nbusers;
  }

  async nbFiles() {
    const nbfiles = await this.dbName.collection('files').countDocuments();
    return nbfiles;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
