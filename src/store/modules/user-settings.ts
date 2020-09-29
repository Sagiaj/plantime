import * as types from "../mutation-types";
import { userSettingsState } from '@/models/store/store-types';
import UserSettings from '@/models/store/user-settings';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { FirebaseService } from '@/services/firebase-service';

const state: userSettingsState = {
    user_settings: new UserSettings()
};

const mutations: MutationTree<any> = {
  [types.SET_USER_SETTINGS](stt: userSettingsState, user_settings: UserSettings) {
      stt.user_settings = user_settings;
  }
};

const actions: ActionTree<any, any> = {
  async updateUserSettings({ commit, state, dispatch }, settings: UserSettings) {
      await dispatch("setViewLoadingState", true);
      try {
          const updatedSettings = new UserSettings(settings);
          await FirebaseService.saveUserSettings(updatedSettings);
          await commit(types.SET_USER_SETTINGS, updatedSettings);
      } catch (err) {
          await dispatch("propagateError", err);
      }
      await dispatch("setViewLoadingState", false);
  }
};

const getters: GetterTree<any, any> = {
  userSettings(stt: userSettingsState) {
      return stt.user_settings;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
