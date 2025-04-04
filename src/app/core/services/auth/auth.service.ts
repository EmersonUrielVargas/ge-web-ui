import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { StoreService } from '../../../modules/shared/services/store/store.service';
import { Constants } from '../../../modules/shared/constants/Constants';
import { GlobalService } from '../global/global.service';
import { environments } from '@envs/environments';
import { UserCredentials, UserData, UserRegisterInfo } from '../../interfaces/IUserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser$ = new BehaviorSubject<UserData| undefined>(undefined);
  constructor(
    private storage: StoreService,
    private global: GlobalService
  ) {
    this.currentUser$.next(this.getUserData())
  }

  getUserData(){
    return this.storage.getItemSession(Constants.storageKeys.session.user);
  }

  loginUser(userCredentials: UserCredentials): Observable<UserData>{
    const url = `${environments.URL_API_USERS}/login`
    return this.global.post(url, userCredentials).pipe(
      map((data)=>{
        this.storage.saveItemSession(Constants.storageKeys.session.authToken, data.token);
        const dataUserDecode = JSON.parse(atob(data.token.split('.')[1]));
        this.storage.saveItemSession(Constants.storageKeys.session.user, dataUserDecode);
        this.currentUser$.next(dataUserDecode);
        return {
          name: dataUserDecode.name,
          email: dataUserDecode.email,
          id: dataUserDecode.id
        }
      }),
      catchError((err) => {
        console.error('Error en la autenticación:', err);
        return throwError(() => new Error('Error en el login'));
      })
    )
  }

  registerUser(UserRegisterInfo: UserRegisterInfo): Observable<UserData>{
    const url = `${environments.URL_API_USERS}/register`
    return this.global.post(url, UserRegisterInfo);
  }
}
