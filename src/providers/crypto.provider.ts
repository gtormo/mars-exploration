import { environment } from '../../environment';

// Modules
import { Cipher, createCipheriv, createDecipheriv, Decipher, randomBytes } from 'crypto';

// Types
import { IEncrypt } from '../types/crypto.type';

const { algorithm, secret, bytes } = environment.crypto;
const iv = randomBytes(bytes);

export const encrypt = (value: string): IEncrypt => {
  const cipher: Cipher = createCipheriv(algorithm, secret, iv);
  const encrypted: Buffer = Buffer.concat([cipher.update(value), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

export const decrypt = (hash: IEncrypt): string => {
  const decipher: Decipher = createDecipheriv(algorithm, secret, Buffer.from(hash.iv, 'hex'));

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final()
  ]);

  return decrpyted.toString();
};
