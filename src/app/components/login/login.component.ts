import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage = ''; // Error message to display to the user
  loading = false; // Indicates the loading state
  constructor(private studentService: StudentService, private router: Router) {}

  onSubmit(form: any) {
    if (!form.valid) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const { email, password } = form.value;
    console.log('Email:', email, 'Password:', password);
  
    this.studentService.loginStudent(email, password).subscribe(
      response => {
        console.log('Login Successful:', response);
        // alert('Login successful!');
        localStorage.setItem('userProfile', JSON.stringify({
          studentId: response.studentId,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email
        }));
        Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome to your profile.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to the profile page after alert is closed
          this.router.navigate(['/profile']);
        });
      },
      error => {
        console.error('Login Failed:', error);
        alert('Invalid credentials. Please try again.');
      }
    );
  }


  
}