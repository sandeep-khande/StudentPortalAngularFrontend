import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


   // To store profile details

  profile: any; // To store profile details
  loading = true; // Indicates loading state

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the ID from localStorage
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
      alert('User is not logged in!');
      this.router.navigate(['/login']);
      return;
    }

    // Parse the stored user data and get the ID
    const { studentId } = JSON.parse(userProfile);

    // Fetch profile details from the backend using the ID
    this.studentService.getStudentProfile(studentId).subscribe(
      response => {
        console.log('Profile Loaded:', response);
        this.profile = response;
        this.loading = false;
      },
      error => {
        console.error('Failed to Load Profile:', error);
        alert('Failed to load profile. Please try again.');
        this.loading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/dashboard']); // Replace '/dashboard' with the desired route
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then(result => {
      if (result.isConfirmed) {
        // Clear localStorage and navigate to the login page
        localStorage.clear();
        Swal.fire(
          'Logged Out',
          'You have been successfully logged out.',
          'success'
        ).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
