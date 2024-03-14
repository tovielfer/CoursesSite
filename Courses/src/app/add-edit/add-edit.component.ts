
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course, TypeLearning } from '../models/course.model';
import { CoursesService } from '../services/course.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {
  course: Course = new Course();
  courseId?: number;
  courseForm!: FormGroup;
  typeLearning = TypeLearning;
  categories!: Category[];
  constructor(private route: ActivatedRoute, private _courseService: CoursesService, private _categoriesService: CategoryService, private r: Router) { }

  get syllabusControls(): FormArray {
    return this.courseForm.controls['syllabus'] as FormArray;
  }

  addSyllabusItem() {
    this.syllabusControls.push(new FormControl('', Validators.required));
  }
  cancel() {
    this.course = new Course();
    this.r.navigate(["/allCourses"])
  }
  ngOnInit(): void {
    this.getCourse();
    this.getCategories();
    this.initForm();
  }
  getCourse() {
    this.route.params.subscribe((param) => {
      this.courseId = param['course'];
      this._courseService.getCourses().subscribe({
        next: (res) => {
          this.course = res.filter(x => x.id == this.courseId)[0];
        }
      })
    })
  }
  getCategories() {
    this._categoriesService.getCategorys().subscribe({
      next: res => { this.categories = res }
    })
  }
  initForm() {
    this.courseForm = new FormGroup({
      'name': new FormControl(this.course?.name, [Validators.required]),
      'categoryId': new FormControl(this.course?.categoryId, [Validators.required]),
      'countLessons': new FormControl(this.course?.countLessons, [Validators.required]),
      'dateStart': new FormControl(this.course?.dateStart, [Validators.required]),
      'syllabus': new FormArray([new FormControl('', [Validators.required])]),
      'type': new FormControl(this.course?.type, [Validators.required]),
      'image': new FormControl(this.course?.image, [Validators.required]),
    })
    this.updateFormValues();
  }
  updateFormValues() {
    const silibusFormArray = this.courseForm.get('syllabus') as FormArray;
    silibusFormArray.removeAt(0);
    this.course?.syllabus?.forEach((silibusItem) => {
      silibusFormArray.push(new FormControl(silibusItem, [Validators.required]));
    });
  }
  removeSyllabusItem(i: number) {
    const silibusFormArray = this.courseForm.get('syllabus') as FormArray;
    silibusFormArray.removeAt(i);
  }
  getChanges(): boolean {
    let isNew: boolean = false
    if (this.course == undefined)
      this.course = new Course();
    this.course.name = this.courseForm.controls['name'].value;
    this.course.categoryId = parseInt(this.courseForm.controls['categoryId'].value);
    this.course.countLessons = this.courseForm.controls['countLessons'].value;
    this.course.dateStart = this.courseForm.controls['dateStart'].value;
    this.course.syllabus = this.courseForm.controls['syllabus'].value;
    this.course.type = this.courseForm.controls['type'].value == "פרונטלי" ? 0 : 1;
    this.course.image = this.courseForm.controls['image'].value;
    if (this.course.lacturerId == -1) 
    {
      isNew = true;
      this.course.lacturerId = JSON.parse(sessionStorage.getItem("userId")!)
    }
    return isNew;
  }
  onSubmit() {
    let isNew: boolean = this.getChanges();
      if (!isNew) {
        this._courseService.editCourse(this.course).subscribe({
          next: () => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "עודכן בהצלחה!!",
              showConfirmButton: false,
              timer: 1500
            }
            );
            this.r.navigate(["/allCourses"]);
          }
        });
      }
      else {
        this._courseService.addCourse(this.course).subscribe({
          next: () => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "נוסף בהצלחה!!",
              showConfirmButton: false,
              timer: 1500
            }
            );
            this.r.navigate(["/allCourses"]);
          }
        })
      }
    }
  }