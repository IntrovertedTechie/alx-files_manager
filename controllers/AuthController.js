import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';

export default class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [email, password] = credentials.split(':');

    if (!email || !password) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const hashedPassword = sha1(password); // Hash the provided password

    // Check if the user exists in the database
    const user = await dbClient.usersCollection().findOne({ email, password: hashedPassword });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Generate a random token using uuidv4
    const token = uuidv4();
    const key = `auth_${token}`;

    // Store the user ID in Redis with a 24-hour expiration
    await redisClient.set(key, user._id.toString(), 86400);

    return res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { token } = req.query;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;

    // Verify the token and delete it from Redis
    const userId = await redisClient.get(key);

    if (!userId || userId !== user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await redisClient.del(key);

    return res.status(204).send();
  }
}
