import IHashProvider from "../models/IHashProvider";
import { hash, compare } from "bcryptjs";

class BCryptHashProvider implements IHashProvider {

  public async generateHash(paylod: string): Promise<string> {
    return hash(paylod, 8);
  };
  public async compareHash(paylod: string, hashed: string): Promise<boolean> {
    return compare(paylod, hashed);
  };
};
export default BCryptHashProvider;
