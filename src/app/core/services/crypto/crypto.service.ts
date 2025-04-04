import { Injectable } from '@angular/core';
import { environments } from '@envs/environments';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  public encryptData(data: string): string{
    return CryptoJS.AES.encrypt(data, environments.CYPHER_KEY).toString()
  }

  public decryptData(data: string): string{
    return CryptoJS.AES.decrypt(data, environments.CYPHER_KEY).toString(CryptoJS.enc.Utf8);
  }
}
