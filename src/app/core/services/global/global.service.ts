import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private http: HttpClient
  ) {

  }

  get( url: string, headers?: HttpHeaders, params?: HttpParams): Observable<any>{
    const options ={
      ...(headers && { headers: headers}),
      ...(params && { params: params})
    }
    return this.http.get(url, options);
  }

  post( url: string, body?:any, headers?: HttpHeaders, params?: HttpParams): Observable<any>{
    const options ={
      ...(headers && { headers: headers}),
      ...(params && { params: params})
    }
    return this.http.post(url, body, options);
  }

  put( url: string, body?:any, headers?: HttpHeaders, params?: HttpParams): Observable<any>{
    const options ={
      ...(headers && { headers: headers}),
      ...(params && { params: params})
    }
    return this.http.put(url, body, options);
  }

  patch( url: string, body?:any, headers?: HttpHeaders, params?: HttpParams): Observable<any>{
    const options ={
      ...(headers && { headers: headers}),
      ...(params && { params: params})
    }
    return this.http.patch(url, body, options);
  }

  delete( url: string, body?:any, headers?: HttpHeaders, params?: HttpParams): Observable<any>{
    const options ={
      ...(headers && { headers: headers}),
      ...(params && { params: params})
    }
    return this.http.delete(url,{ body, ...options});
  }
}
