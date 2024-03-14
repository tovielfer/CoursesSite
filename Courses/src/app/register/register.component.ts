import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  users: User[] = [];
nameLogin:string="";
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router,
    private r:ActivatedRoute
  ) { }

  ngOnInit(): void {
this.r.params.subscribe((p)=>{
  this.nameLogin=p['name']
})
    this.initializeForm();
    this.getUsers();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      name: [this.nameLogin, [Validators.minLength(3), Validators.maxLength(20), Validators.required]],
      password: ['', [Validators.minLength(3), Validators.required]],
      confirmPassword: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      address: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]]
    }, { validators: this.matchPassword });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
      },
      error: (err) => console.log(err)
    });
  }

  matchPassword(formGroup: FormGroup): { [s: string]: boolean } {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null! : { 'passwordMismatch': true };
  }

  togglePasswordVisibility(fieldId: string): void {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field.type === 'password') {
      field.type = 'text';
    } else {
      field.type = 'password';
    }
  }

  onSubmit(): void {
    let tempUser: User = this.registerForm.value;
    if (this.users?.filter(x => x.name == tempUser.name).length > 0) {
      Swal.fire({
        icon: "error",
        title: "אופסססס...",
        text: "שם משתמש קים",
        footer: '<a href="/login">להתחברות</a>'
      });
    }
    else {
      this.userService.addUser(tempUser).subscribe({
        next: (res) => {
          sessionStorage.setItem("userId",JSON.stringify(tempUser.id));
          sessionStorage.setItem("user",JSON.stringify(tempUser));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "נכנסת בהצלחה",
            showConfirmButton: false,
            timer: 1500
          });
        }, error: err => console.log(err)
      })
    }
  }
}
