import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data from local storage', () => {
    const userData = [{ name: 'John', workouts: [] }];
    localStorage.setItem('userData', JSON.stringify(userData));
    expect(service.getUserData()).toEqual(userData);
  });

  it('should save user data to local storage', () => {
    const userData = [{ name: 'John', workouts: [] }];
    service.saveUserData(userData);
    expect(JSON.parse(localStorage.getItem('userData')!)).toEqual(userData);
  });

  it('should add a new workout to existing user', () => {
    const userData = [{ name: 'John', workouts: [] }];
    localStorage.setItem('userData', JSON.stringify(userData));
    service.addWorkout('John', 'Running', 30);
    const updatedUserData = service.getUserData();
    expect(updatedUserData[0].workouts).toEqual([{ type: 'Running', minutes: 30 }]);
  });

  it('should add a new user with workout if user does not exist', () => {
    service.addWorkout('Jane', 'Cycling', 45);
    const userData = service.getUserData();
    expect(userData.length).toBe(1);
    expect(userData[0].name).toBe('Jane');
    expect(userData[0].workouts).toEqual([{ type: 'Cycling', minutes: 45 }]);
  });
});
