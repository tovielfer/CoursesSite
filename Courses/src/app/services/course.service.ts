import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private _http: HttpClient) { }
  getCourses(): Observable<Course[]> {
    return this._http.get<Course[]>("/api/Course");
  }
  getCourseById(id: number): Observable<Course> {
    return this._http.get<Course>(`/api/Course/${id}`);
  }
  addCourse(c: Course) {
    return this._http.post("/api/Course", c);
  }
  editCourse(c: Course) {
    return this._http.post(`/api/Course/`, c);
  }
}
