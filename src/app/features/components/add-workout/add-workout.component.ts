import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css'],
})
export class AddWorkoutComponent {
  username: string = '';
  workoutType: string = 'Running';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    this.workoutService.addWorkout(this.username, this.workoutType, this.workoutMinutes);
    window.location.reload();
  }
}
