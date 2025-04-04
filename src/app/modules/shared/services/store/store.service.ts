import { Injectable } from '@angular/core';
import { CryptoService } from '../../../../core/services/crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private crypto :CryptoService
  ) { }

  private getItemStorage(key: string, storage: Storage): any{
    let value = storage.getItem(btoa(key));
    try {
      if(value){
        value = JSON.parse(this.crypto.decryptData(value));
      }
    } catch (error) {
      value = this.crypto.decryptData(value || '');
    }
    return typeof value === null? undefined: value;
  }

  public getItemLocal(key: string){
    return this.getItemStorage(key, localStorage);
  }
  public getItemSession(key: string){
    return this.getItemStorage(key, sessionStorage);
  }

  public clearSessionStorage(){
    sessionStorage.clear();
  }

  public clearLocalStorage(){
    localStorage.clear();
  }

  public clearBrowserStorage(){
    localStorage.clear();
    sessionStorage.clear();
  }

  saveItemSession(key: string, body: unknown){
    this.saveItemStorage(key,body,sessionStorage);  
  }

  saveItemLocal(key: string, body: unknown){
    this.saveItemStorage(key,body,localStorage);
  }

  private saveItemStorage(key: string, body: unknown, storage: Storage){
    let finalBody = body;
    if (typeof body !== 'string') {
      finalBody = JSON.stringify(body);
    }
    const formatkey = btoa(key)
    storage.setItem(formatkey,this.crypto.encryptData(finalBody as string));
  }
}
