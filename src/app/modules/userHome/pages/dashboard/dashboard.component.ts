import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { HotelsListComponent } from "../../components/events-list/events-list.component";
import { Dialog } from 'primeng/dialog';
import { RegisterEventComponent } from "../../components/register-event/register-event.component";
import { BookingListComponent } from "../../components/booking-list/booking-list.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { IEvent, IRegisterEvent } from '../../../../domains/interfaces/IEvent';
import { IGenericForm } from '../../../../domains/interfaces/IGenericForm';
import { EventsService } from '../../../../core/services/events/events.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CardModule,
    TabsModule,
    TableModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    OverlayBadgeModule,
    HotelsListComponent,
    Dialog,
    RegisterEventComponent,
    BookingListComponent,
    ToastModule
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService]

})
export class DashboardComponent {

  showDgRegisterEvent = false;
  updateEvents = signal(false);
  registerEventInfo!: IGenericForm<IRegisterEvent>;

   constructor(
      private messageService: MessageService,
      private eventService: EventsService,
      private storage: StoreService,
      private router: Router,
    ){}

  registerEventData(eventFormData:IGenericForm<IRegisterEvent> ){
    this.registerEventInfo = eventFormData;
  }

  openRegisterHotelDialog(){
    this.showDgRegisterEvent = true;
  }

  registerNewEvent(){
    const dataRegister: IRegisterEvent = this.registerEventInfo.data;
    dataRegister.eventDate = new Date(dataRegister.eventDate).toISOString();
    this.eventService.registerEvent(dataRegister).subscribe({
      next: ()=>{
        this.updateEvents.set(true);
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Excelente!',
            detail: 'El Evento se ha registrado exitosamente',
            life: 3000
          });
        this.showDgRegisterEvent = false;
      },
      error:()=>{
        this.messageService.add(
          {
            severity: 'error',
            summary: 'lo sentimos!',
            detail: 'Ha ocurrido un error registrando el evento',
            life: 3000
          });
      }
    })
  }

  showEventDetails(eventSelect: IEvent){
    this.storage.saveItemSession(Constants.storageKeys.session.eventSelect,eventSelect);
    this.router.navigateByUrl(`${this.router.url}/event-details`);
  }
}
