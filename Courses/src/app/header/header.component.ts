import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  ngOnInit(): void {
    this.isLacturer = JSON.parse(sessionStorage.getItem("isLacturer")!);
  }
  constructor(private _router: Router) {
  }
  isLacturer!: boolean;
  isConnect() {
    return sessionStorage.getItem("user") != JSON.stringify(new User());
  }
  toHome() {
    this._router.navigate(["/home"]);
  }
  toLogin() {
    this._router.navigate(["/login"]);
  }
  toRegister() {
    this._router.navigate(["/register"]);
  }
  toAllCourses() {
    this._router.navigate(["/allCourses"]);
  }
  toAddEdit() {
    this._router.navigate(["/add-edit"]);
  }
  getCurrentRoute(): string {
    return this._router.url.split('/')[1];
  }
  logOut() {
    sessionStorage.setItem("userId", JSON.stringify(undefined));
    sessionStorage.setItem("user", JSON.stringify(new User()));
    this._router.navigate(["/"])
  }
}
