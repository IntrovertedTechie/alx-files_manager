import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.error(`Redis error: ${error}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  async set(key, value, duration) {
    return this.client.setex(key, duration, value);
  }

  async del(key) {
    return this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
