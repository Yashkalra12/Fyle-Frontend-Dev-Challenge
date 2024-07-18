import { Component } from '@angular/core';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent {
  username: string = '';
  workoutType: string = 'Running';
  workoutMinutes: number = 0;

  addWorkout() {
    if (!this.username || !this.workoutType || !this.workoutMinutes) return;

    let userData = JSON.parse(localStorage.getItem('userData') || '[]');
    let user = userData.find((u: any) => u.name.toLowerCase() === this.username.toLowerCase());

    if (user) {
      user.workouts.push({ type: this.workoutType, minutes: this.workoutMinutes });
    } else {
      userData.push({
        id: userData.length + 1,
        name: this.username,
        workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
      });
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.reload();
  }
}
