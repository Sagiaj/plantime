import * as types from "../mutation-types";
import { userTasksState } from '@/models/store/store-types';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { FirebaseService } from '@/services/firebase-service';
import Task from '@/models/store/task';
import { AuthUser } from '@/models/store/firebase-auth-user';
import UserSettings from '@/models/store/user-settings';

const state: userTasksState = {
    userTasks: []
};

const mutations: MutationTree<any> = {
  [types.SET_USER_TASKS](stt: userTasksState, tasks: Task[]) {
      stt.userTasks = tasks;
  },
  [types.ADD_USER_TASK](stt: userTasksState, task: Task) {
      stt.userTasks.push(task);
  }
};

const actions: ActionTree<any, any> = {
  async saveUserTasks({ commit, state, dispatch, rootState }, tasks: Task[]) {
      const user: AuthUser = rootState.auth.user;
      await dispatch("setViewLoadingState", true);
      try {
          const updatedTasks = tasks.map(t => new Task(t));
          await FirebaseService.saveUserTasks(user, updatedTasks);
          await commit(types.SET_USER_TASKS, updatedTasks);
      } catch (err) {
          await dispatch("propagateError", err);
      }
      await dispatch("setViewLoadingState", false);
  },
  async addUserTask({ commit, state, dispatch, rootState }, tasks: Task[]) {
    const user: AuthUser = rootState.auth.user;
    await dispatch("setViewLoadingState", true);
    try {
      const updatedTasks = tasks.map(t => new Task(t));
      await FirebaseService.saveUserTasks(user, updatedTasks);
      await commit(types.ADD_USER_TASK, updatedTasks);
    } catch (err) {
      await dispatch("propagateError", err);
    }
    await dispatch("setViewLoadingState", false);
  },
  async getUserTasks({ commit, state, dispatch, rootState }) {
    const user: AuthUser = rootState.auth.user;
    await dispatch("setViewLoadingState", true);
    try {
      const tasks = await FirebaseService.getUserTasks(user);
      commit(types.SET_USER_TASKS, tasks);
    } catch (err) {
      await dispatch("propagateError", err);
    }
    await dispatch("setViewLoadingState", false);
  },
  async getUserTasksList({ commit, state, dispatch, rootState }) {
    const user: AuthUser = rootState.auth.user;
    const userSettings: UserSettings = rootState.settings.user_settings;
    await dispatch("setViewLoadingState", true);
    try {
      const tasks = await FirebaseService.getUserTasksList(user, userSettings.current_goal);
      commit(types.SET_USER_TASKS, tasks);
    } catch (err) {
      await dispatch("propagateError", err);
    }
    await dispatch("setViewLoadingState", false);
  }
//   async saveUserTask({ commit, state, dispatch, rootState }, task: Task) {
//     const user: AuthUser = rootState.auth.user;
//     await dispatch("setViewLoadingState", true);
//     try {
//         const newTask = new Task(task);
//         await FirebaseService.saveUserTasks(user, [newTask]);
//         await commit(types.ADD_USER_TASK, newTask);
//     } catch (err) {
//         await dispatch("propagateError", err);
//     }
//     await dispatch("setViewLoadingState", false);
//   }
};

const getters: GetterTree<any, any> = {
    userTasks(stt: userTasksState) {
      return stt.userTasks;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
