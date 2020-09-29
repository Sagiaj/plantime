import * as types from "../mutation-types";
import { ActionTree, GetterTree, MutationTree } from 'vuex';

type loadingScreenState = {
    viewLoadingState: boolean;
    navLoadingState: boolean;
};

const state: loadingScreenState = {
    viewLoadingState: false,
    navLoadingState: false
};

const mutations: MutationTree<any> = {
  [types.SET_VIEW_LOADING_STATE](stt: loadingScreenState, loading_state: boolean) {
      stt.viewLoadingState = loading_state;
  },
  [types.SET_NAV_LOADING_STATE](stt: loadingScreenState, loading_state: boolean) {
      stt.navLoadingState = loading_state;
  }
};

const actions: ActionTree<any, any> = {
  async setViewLoadingState({ commit, state, dispatch }, loading_state: boolean) {
      try {
          await commit(types.SET_VIEW_LOADING_STATE, loading_state);
      } catch (err) {
          await dispatch("propagateError", err);
      }
  },
  async setNavLoadingState({ commit, state, dispatch }, loading_state: boolean) {
    try {
        await commit(types.SET_NAV_LOADING_STATE, loading_state);
    } catch (err) {
        await dispatch("propagateError", err);
    }
}
};

const getters: GetterTree<any, any> = {
    viewLoadingState(stt: loadingScreenState) {
        return stt.viewLoadingState;
    },
    navLoadingState(stt: loadingScreenState) {
        return stt.navLoadingState;
    }
};

export default {
  state,
  mutations,
  actions,
  getters
};
