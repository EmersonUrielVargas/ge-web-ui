import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IEvent } from '../../../../domains/interfaces/IEvent';
import { EventsService } from '../../../../core/services/events/events.service';
import { EStatusEvent } from '../../../../domains/enums/EStatusEvent';

@Component({
  selector: 'events-list',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    OverlayBadgeModule
  ],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss'
})
export class HotelsListComponent implements OnInit, OnChanges {
  @Output() selectedEvent = new EventEmitter<IEvent>();
  @Input() updateList = false;
  eventList!: IEvent[];

  constructor(
    private eventService: EventsService
  ){}

  ngOnInit(): void {
    this.getEventsList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.updateList) {
      this.getEventsList();
    }
  };

  getEventsList(){
    this.eventService.getEvents().subscribe({
      next: (response)=>{
        this.eventList = response;
      }
    });
  }

  selectEvent(eventSelect: IEvent) {
    this.selectedEvent.emit(eventSelect);
  }

  getSeverity(status: EStatusEvent) {
    switch (status) {
      case EStatusEvent.FULL:
        return 'secondary';

      case EStatusEvent.ACTIVE:
        return 'success';

      case EStatusEvent.CANCELED:
          return 'danger';
      default:
        return 'secondary'
    }
  }
}
