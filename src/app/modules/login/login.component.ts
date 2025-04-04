import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import {StyleClassModule} from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  imports: [
    CheckboxModule,
    ReactiveFormsModule,
    StyleClassModule,
    ButtonModule,
    PasswordModule,
    InputGroupModule,
    FloatLabelModule,
    InputGroupAddonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  isloggin = signal(true);

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
    
  ){}

  ngOnInit(): void {
      this.loginForm = new FormBuilder().group({
          name: new FormControl('',[]),
          email: new FormControl('',[Validators.required,Validators.email]),
          password: new FormControl('',[Validators.required,Validators.minLength(8)]),
          confirmPassword: new FormControl('',[]),
      })
  }
  sendForm(){
    if (this.isloggin()) {
      this.logginUser();
    }else{
      this.registerUser();
    }
  }

  logginUser(){
    this.authService.loginUser(this.loginForm.value).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/userHome');
      },
      error:()=>{
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Lo sentimos',
            detail: 'Ha ocurrido un error, tu inicio de sesion no fue exitoso',
            life: 3000
          });
      }
    })
  }

  registerUser(){
    this.authService.registerUser(this.loginForm.value).subscribe({
      next:(response)=>{
        this.isloggin.set(true);
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Excelente!',
            detail: 'Te has registrado exitosamente',
            life: 3000
          });
      },
      error:()=>{
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Lo sentimos',
            detail: 'Ha ocurrido un error, tu registro no fue exitoso',
            life: 3000
          });
      }
    })
  }


  isValidButton(){
    const password = this.loginForm.get('password')?.value;
    const confirmPassword = this.loginForm.get('confirmPassword')?.value;
    const validPassword =  this.isloggin()? true : password === confirmPassword;
    return this.loginForm.valid && validPassword;
  }

  showLogginForm(show: boolean){
    this.isloggin.set(show);
    if (this.isloggin()) {
      this.loginForm.get('name')?.clearValidators();
      this.loginForm.get('confirmPassword')?.clearValidators();
      this.loginForm.get('name')?.updateValueAndValidity();
      this.loginForm.get('confirmPassword')?.updateValueAndValidity();
      
    } else {
      this.loginForm.get('name')?.setValidators([Validators.required]);
      this.loginForm.get('confirmPassword')?.setValidators([Validators.required]);
      this.loginForm.get('name')?.updateValueAndValidity();
      this.loginForm.get('confirmPassword')?.updateValueAndValidity();
      
    }
    setTimeout(() => this.cdr.detectChanges(), 1); 
  }

}
