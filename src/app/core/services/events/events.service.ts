import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '@envs/environments';
import { GlobalService } from '../global/global.service';
import { IEvent, IRegisterEvent } from '../../../domains/interfaces/IEvent';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private global: GlobalService
  ) {

  }

  getEvents(): Observable<IEvent[]>{
    return this.global.get(`${environments.URL_EVENTS_MNGR}/events`);
  }

  getEventById(eventId: number): Observable<IEvent>{
    return this.global.get(`${environments.URL_EVENTS_MNGR}/events/${eventId}`);
  }

  registerEvent(eventData: IRegisterEvent): Observable<any>{
    return this.global.post(`${environments.URL_EVENTS_MNGR}/events/schedule`, eventData);
  }

  updateEvent(eventData: IRegisterEvent): Observable<any>{
    return this.global.patch(`${environments.URL_EVENTS_MNGR}/events/modify/${eventData.id}`, eventData);
  }
}
