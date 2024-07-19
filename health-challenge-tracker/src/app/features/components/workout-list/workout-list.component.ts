import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = [];
  searchTerm: string = '';
  filterType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5; 
  totalPages: number = 1;
  uniqueWorkoutTypes: string[] = [];
  totalPagesArray: number[] = [];
  itemsPerPageOptions = [5, 10, 15, 20]; 

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('userData') || '[]');
    this.uniqueWorkoutTypes = this.getUniqueWorkoutTypes();
    this.applyFilters();
  }

  applyFilters() {
    let filteredUsers = this.users;

    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterType) {
      filteredUsers = filteredUsers.filter(user =>
        user.workouts.some((workout: any) => workout.type === this.filterType)
      );
    }

    this.totalPages = Math.ceil(filteredUsers.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate(filteredUsers);
  }

  paginate(filteredUsers: any[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = filteredUsers.slice(start, end);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.applyFilters();
  }

  getUserWorkouts(user: any) {
    return user.workouts.map((workout: any) => workout.type).join(', ');
  }

  getTotalWorkoutMinutes(user: any) {
    return user.workouts.reduce((acc: number, workout: any) => acc + workout.minutes, 0);
  }

  getUniqueWorkoutTypes() {
    const types = this.users.flatMap(user => user.workouts.map((workout: any) => workout.type));
    return [...new Set(types)];
  }
}
