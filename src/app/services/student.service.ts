import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { reset } from '../models/Reset';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  

  constructor(private http: HttpClient) {}

  private baseUrl = 'https://localhost:7016/api/students';

  registerStudent(student: Student): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, student);
  }

  loginStudent(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  getStudentProfile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/StudentDetails/${id}`);
  }

  updateStudentProfile(id: number, reset: reset): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateStudentDetails/${id}`, reset);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  generateResetLink(email: string): Observable<any> {
    // Send email as JSON string with correct headers
    return this.http.post(`${this.baseUrl}/generate-reset-link`, `"${email}"`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  resetPassword(resetDto: { token: string; password: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/reset-password`, resetDto, {
      headers: { 'Content-Type': 'application/json' },
    });
  }  

}
