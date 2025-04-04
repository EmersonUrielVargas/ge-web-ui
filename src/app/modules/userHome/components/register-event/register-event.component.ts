import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TagModule } from 'primeng/tag';
import { UtilitiesService } from '../../../shared/services/utilities/utilities.service';
import moment from 'moment';
import { IEvent, IRegisterEvent } from '../../../../domains/interfaces/IEvent';
import { IGenericForm } from '../../../../domains/interfaces/IGenericForm';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { UserData } from '../../../../core/interfaces/IUserData';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'register-event',
  imports: [
    FormsModule,
    TextareaModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    SelectModule,
    InputGroupAddonModule,
    FloatLabelModule,
    DatePickerModule,
    TagModule
  ],
  templateUrl: './register-event.component.html',
  styleUrl: './register-event.component.scss'
})
export class RegisterEventComponent implements OnInit {
  @Input() isUpdate = false;
  @Input() preloadData: IEvent | undefined;
  @Output() formEventData = new EventEmitter<IGenericForm<IRegisterEvent>>();
  minDate = moment().startOf('day').toDate();
  cities:City[]= []
  eventForm: FormGroup = new FormGroup({});
  constructor(
    private utilities: UtilitiesService,
    private storage: StoreService
  ){

  }

  ngOnInit(): void {
    this.utilities.getCities().subscribe({
      next: (cities)=>{
        this.cities= cities;
      }
    })
    const user:UserData = this.storage.getItemSession(Constants.storageKeys.session.user);
    this.eventForm = new FormGroup({
      name: new FormControl(this.preloadData? this.preloadData.name : ''),
      description: new FormControl(this.preloadData? this.preloadData.description: ''),
      location: new FormControl(this.preloadData? this.preloadData.location : null),
      attendeesSize: new FormControl(this.preloadData? this.preloadData.attendeesSize : 1),
      eventDate: new FormControl(this.preloadData? new Date(this.preloadData.eventDate) : ''),
      status: new FormControl(this.preloadData? this.preloadData.status.id : 1),
      organizerId: new FormControl(this.preloadData? this.preloadData.organizerId.id : user.id),
    })

    this.eventForm.statusChanges.subscribe({
      next:()=>{
        this.formEventData.emit({
          data: this.eventForm.value,
          formStatus: this.eventForm.status
        })
      }
    })
  }

  cancelEvent(){}

}
