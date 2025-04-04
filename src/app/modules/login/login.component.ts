import { Component, OnInit, signal } from '@angular/core';
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
    
  ){}

  ngOnInit(): void {
    if (this.isloggin()) {
      this.loginForm = new FormGroup({
          email: new FormControl('',[Validators.required,Validators.email]),
          password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      })
    }else{
      this.loginForm = new FormBuilder().group({
          name: new FormControl('',[Validators.required]),
          email: new FormControl('',[Validators.required,Validators.email]),
          password: new FormControl('',[Validators.required,Validators.minLength(8)]),
          confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
      },
      { validators: this.passwordValidator })
    }
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
        console.log('vamos pa laruta')
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

  passwordValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  showLogginForm(show: boolean){
    this.isloggin.set(show);
  }

}
