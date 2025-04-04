import { Component, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RegisterEventComponent } from "../../components/register-event/register-event.component";
import { Dialog } from 'primeng/dialog';
import { DialogAction } from '../../../shared/enums/EDialogAction';
import { DialogItems } from '../../../shared/interfaces/IDialogItems';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { ToastModule } from 'primeng/toast';
import { IEvent, IRegisterEvent } from '../../../../domains/interfaces/IEvent';
import { IGenericForm } from '../../../../domains/interfaces/IGenericForm';
import { EventsService } from '../../../../core/services/events/events.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserData } from '../../../../core/interfaces/IUserData';
import { reservationsUserListComponent } from "../../components/reservationsUser-list/reservationsUser-list.component";
import { IRegisterReservation } from '../../../../domains/interfaces/IReservations';
import { ReservationsService } from '../../../../core/services/reservations/reservations.service';


@Component({
  selector: 'event-details',
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    BadgeModule,
    ButtonModule,
    RegisterEventComponent,
    Dialog,
    OverlayBadgeModule,
    ConfirmDialogModule,
    ToastModule,
    reservationsUserListComponent
],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  providers: [ConfirmationService,MessageService]
})
export class EventDetailsComponent implements OnInit{

  showDialog = false;
  dialogInfo =  signal<DialogItems>({
    title: 'Actualizacion de datos',
    labelBtnAccept: 'Actualizar',
    labelBtnCancel: 'Cancelar',
    actionType: DialogAction.EVENT_UPDATE
  })
  
  isOwnerEvent = false;
  eventDetails!: IEvent;
  currentUser!: UserData;


  eventDataForm!: IGenericForm<IRegisterEvent>;

  constructor(
    private storage: StoreService,
    private authService: AuthService,
    private eventService: EventsService,
    private messageService: MessageService,
    private reservationService: ReservationsService,
    private confirmationService: ConfirmationService,
  ){
    
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user=>{
      if (user) {
        this.currentUser = user;
      }
    })
    const sessionEventData = this.storage.getItemSession(Constants.storageKeys.session.eventSelect);
    if (sessionEventData) {
      this.getEventDetailsData(sessionEventData.id);
    }
  }

  confirmReservation(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Deseas realizar la confirmación de la reserva?',
        header: 'Perfecto, un paso más.',
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
          this.sheduleReservation();
        }
      });
  }

  getEventDetailsData(id: number){
    this.eventService.getEventById(id).subscribe({
      next:(response)=>{
        if (response) {
          this.eventDetails = response;
          this.isOwnerEvent = this.currentUser?.id === this.eventDetails.organizerId.id;
        }
      }
    });
  }

  sheduleReservation(){
    const reservationData: IRegisterReservation = {
      isActive: true,
      eventId: this.eventDetails.id,
      userId: this.currentUser.id
    }
    this.reservationService.scheduleReservation(reservationData).subscribe({
      next:()=>{
        this.getEventDetailsData(this.eventDetails.id);
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Excelente!',
            detail: 'Tu reserva se ha realizado exitosamente',
            life: 3000
          });
      },
      error: (error)=>{
        console.log('error del back', error)
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Lo siento!',
            detail: 'Ha ocurrido un error al realizar la reserva, intenta mas tarde!',
            life: 3000
          });
      }
    })
  }

  enableEditForm(){
    this.showDialog = true;
  }

  updateEventData(){
    if (this.eventDetails) {
      const infoUpdate: IRegisterEvent = this.eventDataForm.data;
      this.eventService.updateEvent(infoUpdate).subscribe({
        next: (response) =>{
          this.showDialog = false;
          this.getEventDetailsData(this.eventDetails.id);
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Excelente!',
              detail: 'El evento se ha actualizado exitosamente',
              life: 3000
            });
        },
        error: ()=>{
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Lo siento!',
              detail: 'Ha ocurrido un error al actualizar el evento, revisa la información e intenta nuevamente',
              life: 3000
            });
        }
      });
    }
  }

  saveEventData(newEventData: IGenericForm<IRegisterEvent>){
    this.eventDataForm = newEventData;
  }

  enableFormUpdateEvent(){
    this.dialogInfo.set({
      title: 'Actualizacion de datos',
      labelBtnAccept: 'Actualizar',
      labelBtnCancel: 'Cancelar',
      actionType: DialogAction.EVENT_UPDATE
    })
    this.showDialog = true;
  }
  

  dialogAccept(){
    this.confirmationService.confirm({
      message: '¿Deseas confirmar los cambios en la reserva?',
      header: 'Perfecto, un paso más.',
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
        this.updateEventData();
      }
    });
  }
}
