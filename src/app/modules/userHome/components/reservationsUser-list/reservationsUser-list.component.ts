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
import { IReservations } from '../../../../domains/interfaces/IReservations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'reservationsUser-list',
  imports: [
    CommonModule,
    TagModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    OverlayBadgeModule,
    TableModule
  ],
  templateUrl: './reservationsUser-list.component.html',
  styleUrl: './reservationsUser-list.component.scss'
})
export class reservationsUserListComponent implements OnInit {

  reservations: IReservations[] = [];
  @Input() eventId!: number;
  
  constructor(
    private router: Router,
    private reservationService: ReservationsService,
    private storage: StoreService
  ){

  }
  ngOnInit(): void {
    const user:UserData = this.storage.getItemSession(Constants.storageKeys.session.user);
    this.reservationService.getReservationsByEvent(user.id).subscribe({
      next:(response)=>{
        if (response) {
          this.reservations= response;
        }
      }
    })
  }

}
