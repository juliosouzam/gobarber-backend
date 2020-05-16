export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compoareHash(payload: string, hashed: string): Promise<boolean>;
}
