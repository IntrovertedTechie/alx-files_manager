import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/**
 * Class for performing operations with Mongo service
 */
class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        // console.log('Connected successfully to server');
        this.db = client.db(DB_DATABASE);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      } else {
        console.log(err.message);
        this.db = false;
      }
    });
  }

  /**
   * Checks if connection to MongoDB is alive.
   * @return {boolean} true if connection is alive, or false if not.
   */
  isAlive() {
    return Boolean(this.db);
  }

  /**
   * Returns the number of documents in the collection users.
   * @return {Promise<number>} Number of users.
   */
  async nbUsers() {
    const numberOfUsers = await this.usersCollection.countDocuments();
    return numberOfUsers;
  }

  /**
   * Returns the number of documents in the collection files.
   * @return {Promise<number>} Number of files.
   */
  async nbFiles() {
    const numberOfFiles = await this.filesCollection.countDocuments();
    return numberOfFiles;
  }

  /**
   * Retrieves a user by their email address.
   * @param {string} email - The email address of the user to retrieve.
   * @returns {Promise<object|null>} A promise that resolves with the user object or null if not found.
   */
  async getUserByEmail(email) {
    try {
      const user = await this.usersCollection.findOne({ email });
      return user;
    } catch (error) {
      console.error('Error retrieving user by email:', error);
      throw error; // Rethrow the error to be handled where this function is called.
    }
  }
}

const dbClient = new DBClient();

export default dbClient;
