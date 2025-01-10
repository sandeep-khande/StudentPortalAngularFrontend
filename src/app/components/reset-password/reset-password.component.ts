import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  loading = false; // Indicates loading state
  errorMessage = ''; // To store error messages
  email = ''; // For requesting reset link
  newPassword = ''; // For resetting password
  confirmPassword = ''; // Confirm password
  token: string | null = null; // Reset token from URL

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract the token from the query parameters
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

   // Request reset link
  onGenerateResetLink() {
    if (!this.email) {
      Swal.fire('Validation Error', 'Please enter your email address.', 'warning');
      return;
    }
  
    this.loading = true;
    this.studentService.generateResetLink(this.email).subscribe(
      (response) => {
        Swal.fire('Success', 'Reset link sent to your email.', 'success');
        this.loading = false;
      },
      (error) => {
        Swal.fire('Error', 'Failed to send reset link. Please try again.', 'error');
        this.loading = false;
      }
    );
  }
  

  // Reset password
  onSubmit() {
    if (!this.newPassword || !this.confirmPassword) {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'warning');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match. Please try again.', 'error');
      return;
    }

    if (!this.token) {
      Swal.fire('Error', 'Invalid reset link. Please request a new one.', 'error');
      return;
    }

    this.loading = true;
    this.studentService
      .resetPassword({ token: this.token, password: this.newPassword })
      .subscribe(
        (response) => {
          Swal.fire('Success', 'Password reset successfully!', 'success').then(() => {
            this.router.navigate(['/login']);
          });
          this.loading = false;
        },
        (error) => {
          Swal.fire('Error', 'Failed to reset password. Please try again.', 'error');
          this.loading = false;
        }
      );
  }


}
