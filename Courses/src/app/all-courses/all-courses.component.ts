import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/course.service';
import { Course } from '../models/course.model';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent implements OnInit {
  constructor(private _courses: CoursesService, private router: Router, private _categories: CategoryService) { }
  courses: Course[] = [];
  categories: Category[] = [];
  selectedCategoryId = -1;
  selectedType = -1;
  selectedName = "";
  isConnected: boolean = false;
  ngOnInit(): void {
    this.isConnected = sessionStorage.getItem("user") == JSON.stringify(new User());
    this._courses.getCourses().subscribe({
      next: (res) => { this.courses = res; }
    })
    this._categories.getCategorys().subscribe({
      next: (res) => {
        this.categories = res;
        if (this.categories.filter(c => c.id == -1).length == 0)
          this.categories.unshift({ id: -1, name: "כל הקטגוריות", icon: "" })
      }
    })
  }
  showCourseDetails(id: number) {
    this.router.navigate(["/courseDetails", { "id": id }])
  }
  filterCategory(event: any) {
    this.selectedCategoryId = parseInt(event.target.value);
  }
  filterType(event: any) {
    this.selectedType = parseInt(event.target.value);
  }
  filterName(event: any) {
    this.selectedName = event.target.value;
  }
}


