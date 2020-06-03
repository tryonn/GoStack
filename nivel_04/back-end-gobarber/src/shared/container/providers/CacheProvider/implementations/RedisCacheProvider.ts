import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from "../models/ICacheProvider";
import cacheConfig from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {

  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);

  }

  public async save(key: string, value: string): Promise<void> {

    console.log(key);
    console.log(JSON.stringify(value));


    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parseData = JSON.parse(data) as T;

    return parseData;
  }

  public async invalidate(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
