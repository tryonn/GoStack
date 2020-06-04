import IHashProvider from "../models/IHashProvider";

class FakeHashProvider implements IHashProvider {

  public async generateHash(paylod: string): Promise<string> {
    return paylod;
  };
  public async compareHash(paylod: string, hashed: string): Promise<boolean> {
    return paylod === hashed;
  };
};
export default FakeHashProvider;
