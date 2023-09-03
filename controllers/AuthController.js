import redisClient from '../utils/redis';
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';

class AuthController {
  /**
   * Sign in the user and generate an authentication token
   * @param {*} request request object
   * @param {*} response response object
   */
  static async getConnect(request, response) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    // Retrieve the user based on email and password
    const user = await dbClient.getUserByEmailAndPassword(email, sha1(password));

    if (!user) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const token = uuidv4();

    // Store the user ID in Redis with the token as the key for 24 hours
    await redisClient.set(`auth_${token}`, user.id, 86400);

    return response.status(200).json({ token });
  }

  /**
   * Sign out the user based on the token
   * @param {*} request request object
   * @param {*} response response object
   */
  static async getDisconnect(request, response) {
    const { 'x-token': token } = request.headers;

    if (!token) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Delete the token from Redis
    await redisClient.del(`auth_${token}`);

    return response.status(204).send();
  }
}

export default AuthController;
