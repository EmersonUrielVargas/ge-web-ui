import { Injectable } from '@angular/core';
import { GlobalService } from '../../../../core/services/global/global.service';
import { environments } from '@envs/environments';
import { map, Observable } from 'rxjs';
import moment from 'moment';
import { diffDays } from '@formkit/tempo';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private global:GlobalService
  ) { 
  }
  
  getCities(): Observable<any>{
    const body = {
      "country": "Colombia"
    }
    return this.global.post(environments.URL_CITIES, body).pipe(
      map((response) => {
        return response.data.map((city: string)=>{
          return {
            label: city,
            value: city
          }
        });
      })
    );
  }
}
