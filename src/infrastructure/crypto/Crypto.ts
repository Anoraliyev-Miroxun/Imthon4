import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptoService {
  async encrypt(data: string) {
    return hash(data, 7);
  }

  async decrypt(data: string, encryptData: string) {
    return compare(data, encryptData);
  }
}
