import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '@envs/environments';
import { GlobalService } from '../global/global.service';
import { IEvent, IRegisterEvent } from '../../../domains/interfaces/IEvent';
import { IRegisterReservation, IReservations, IUpdateReservation } from '../../../domains/interfaces/IReservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(
    private global: GlobalService
  ) {

  }

  getReservationsByUser(userId: number): Observable<IReservations[]>{
    return this.global.get(`${environments.URL_EVENTS_MNGR}/reservations/user/${userId}`);
  }

  getReservationByIds(userId: number, eventId: number): Observable<IReservations>{
    return this.global.get(`${environments.URL_EVENTS_MNGR}/reservations/${userId}/${eventId}`);
  }

  getReservationsByEvent(eventId: number): Observable<IReservations[]>{
    return this.global.get(`${environments.URL_EVENTS_MNGR}/reservations/event/${eventId}`);
  }

  scheduleReservation(reservationData: IRegisterReservation): Observable<any>{
    return this.global.post(`${environments.URL_EVENTS_MNGR}/reservations/register`, reservationData);
  }

  cancelReservation(reservationData: IUpdateReservation): Observable<any>{
    return this.global.delete(`${environments.URL_EVENTS_MNGR}/reservations/cancel`, reservationData);
  }

}
