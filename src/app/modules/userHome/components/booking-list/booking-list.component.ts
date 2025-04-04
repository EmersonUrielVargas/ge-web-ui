import { Component, Input, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { ReservationsService } from '../../../../core/services/reservations/reservations.service';
import { UserData } from '../../../../core/interfaces/IUserData';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { IReservations, IUpdateReservation } from '../../../../domains/interfaces/IReservations';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'agent-booking-list',
  imports: [
    CommonModule,
    TagModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    OverlayBadgeModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule
  ],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
  providers:[ConfirmationService,MessageService]
})
export class BookingListComponent implements OnInit {

  reservations: IReservations[] = [];
  
  constructor(
    private router: Router,
    private reservationService: ReservationsService,
    private storage: StoreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){

  }
  ngOnInit(): void {
    const user:UserData = this.storage.getItemSession(Constants.storageKeys.session.user);
    this.reservationService.getReservationsByUser(user.id).subscribe({
      next:(response)=>{
        if (response) {
          this.reservations= response;
        }
      }
    })
  }

  confirmCancelReservation(reservation: IReservations) {
    this.confirmationService.confirm({
        message: '¿Deseas realizar la cancelación de la reserva?',
        header: 'Solo para estar seguros',
        icon: 'pi pi-exclamation-circle',
        rejectButtonProps: {
            label: 'Volver',
            severity: 'secondary',
            outlined: true
        },
        acceptButtonProps: {
            label: 'Confirmar'
        },
        accept: () => {
          this.cancelReservation(reservation);
        }
      });
  }

  cancelReservation(reservation: IReservations){
    const reservationData:IUpdateReservation = {
      eventId: reservation.eventId,
      userId: reservation.userId
    }
    this.reservationService.cancelReservation(reservationData).subscribe({
      next:()=>{

      }
    })
  }

}
