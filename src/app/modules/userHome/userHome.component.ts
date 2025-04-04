import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumComponent } from "./components/breadcrum/breadcrum.component";
import { StoreService } from '../shared/services/store/store.service';
import { UserData } from '../../core/interfaces/IUserData';
import { Constants } from '../shared/constants/Constants';
import { MenuItem } from 'primeng/api';
import { userHomeConstants } from './constants/userHomeConstants';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-user-home',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RouterModule,
    AvatarModule,
    BreadcrumComponent
],
  templateUrl: './userHome.component.html',
  styleUrl: './userHome.component.scss'
})
export class UserHomeComponent implements OnInit{
  isHome = signal(true)
  avatarUrl = '@resources/profile.png'
  breadCrumbItems = signal<MenuItem[]>([])
  user!: UserData

  constructor(
    private router: Router,
    private storage: StoreService
  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome.set(this.router.url === '/userHome');
        this.updateRoutes(this.router.url);
      }
    });
  }

  ngOnInit(): void {
    this.user = this.storage.getItemSession(Constants.storageKeys.session.user);
    this.breadCrumbItems.set([
      { 
        icon: 'pi pi-home',
        route: '/userHome'
      }
    ]);
  }

  
  updateRoutes(path: string){
    const items:MenuItem[] = [
      { 
        icon: 'pi pi-home',
        route: '/userHome'
      }
    ];
    userHomeConstants.breadCrumdItems.forEach((item)=>{
      if (path.includes(item.route)) {
        items.push(item)
      }
    })
    this.breadCrumbItems.set(items);
  }


}
