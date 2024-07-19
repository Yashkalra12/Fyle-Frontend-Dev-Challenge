import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor() {}

  getUserData() {
    return JSON.parse(localStorage.getItem('userData') || '[]');
  }

  saveUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  addWorkout(username: string, workoutType: string, workoutMinutes: number) {
    if (!username || !workoutType || !workoutMinutes) return;

    let userData = this.getUserData();
    let user = userData.find((u: any) => u.name.toLowerCase() === username.toLowerCase());

    if (user) {
      user.workouts.push({ type: workoutType, minutes: workoutMinutes });
    } else {
      userData.push({
        id: userData.length + 1,
        name: username,
        workouts: [{ type: workoutType, minutes: workoutMinutes }],
      });
    }

    this.saveUserData(userData);
  }
}
