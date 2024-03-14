import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/course.service';
import { Course } from '../models/course.model';
import { NgClass, NgFor } from '@angular/common';
import { LacturerService } from '../services/lacturer.service';
import { Lacturer } from '../models/lacturer.model';
import { DateFormatPipe } from "../date.pipe";
import { User } from '../models/user.model';
import { IconPipePipe } from '../icon.pipe';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-course-details',
  standalone: true,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
  imports: [NgFor, DateFormatPipe, IconPipePipe, NgClass]
})
export class CourseDetailsComponent {
  course: Course = new Course();
  courseId!: number;
  lecturer?: Lacturer;
  isLacturer?: boolean;
  user!: User;
  isSoon: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router, private _lservice: LacturerService, private _customerService: CoursesService) { }
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.courseId = param['id'];
    })
    this._customerService.getCourses().subscribe({
      next: (res) => {
        this.course = res.filter(x => x.id == this.courseId)[0];
        this._lservice.getLacturers().subscribe({
          next: (res) => {
            this.lecturer = res.filter(x => x.id == this.course.lacturerId)[0];
          }
        })
        this.isSoon = differenceInDays(this.course.dateStart, new Date()) <= 7;
      }
    });
    this.user = JSON.parse(sessionStorage.getItem("user")!);
    this.isLacturer = JSON.parse(sessionStorage.getItem("isLacturer")!);

  }
  goBack() {
    this.router.navigate(['/allCourses'])
  }
  goEdit() {
    this.router.navigate(['/add-edit', { 'course': this.course.id }])
  }

}

