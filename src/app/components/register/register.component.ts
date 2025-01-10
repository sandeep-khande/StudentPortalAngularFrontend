import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage = ''; // To display error messages
  loading = false; // To indicate loading state
  router: any;
  
  constructor(private studentService: StudentService){}

  onSubmit(form: any) {
    // Validate form
    if (!form.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const { firstName, lastName, email, password } = form.value;
    console.log('Registration Data Sent to Backend:', { firstName, lastName, email, password });

    // Start loading
    this.loading = true;
    this.errorMessage = '';

    // Call the registration service
    this.studentService.registerStudent({ firstName, lastName, email, password }).subscribe(
      response => {
        console.log('Registration Successful:', response);
        Swal.fire({
          title: 'Registration Successful!',
          text: 'You have successfully registered. Please log in.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirect to login page after success
          this.router.navigate(['/login']);
        });
        this.loading = false;

        // Redirect to login page after successful registration
        // this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration Failed:', error);
        Swal.fire({
          title: 'Registration Failed',
          text: 'An error occurred during registration. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        this.errorMessage = 'Registration failed. Please try again.';
        this.loading = false;
      }
    );
  }
}
