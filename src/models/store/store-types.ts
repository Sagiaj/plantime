import { FirebaseError } from 'firebase';
import { AuthUser } from './firebase-auth-user';
import Task from './task';
import UserSettings from './user-settings';

export type authState = {
  user: AuthUser | null;
  authentication_error: null | FirebaseError;
  authStateFinished: boolean;
  finishedAuthInteraction: boolean;
};

export type userSettingsState = {
  user_settings: UserSettings;
};

export type userTasksState = {
  userTasks: Task[];
};
