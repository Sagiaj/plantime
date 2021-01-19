import * as types from "../mutation-types";
import { FirebaseAuth } from '@/plugins/firebase';
import { FirebaseError } from 'firebase';
import { AuthUser } from '@/models/store/firebase-auth-user';
import { authState } from '@/models/store/store-types';
import { FBAuthUserAdapter } from '@/models/adapters/firebase-auth-user-adapter';
import { MutationTree, ActionTree, GetterTree } from 'vuex';

const state: authState = {
  user: null,
  authentication_error: null,
  authStateFinished: false,
  finishedAuthInteraction: false,
  preAuthRoute: ""
};

const mutations: MutationTree<any> = {
  [types.SET_USER](stt: authState, user: AuthUser) {
    stt.user = user;
  },
  [types.SET_AUTH_STATE_FINISHED](stt: authState, isLoaded: boolean) {
    stt.authStateFinished = isLoaded;
  },
  [types.SET_AUTHENTICATION_ERROR](stt: authState, error: FirebaseError) {
    stt.authentication_error = error;
  },
  [types.SET_FINISHED_AUTH_INTERACTION](stt: authState, finished: boolean) {
    stt.finishedAuthInteraction = finished;
  },
  [types.SET_PRE_AUTH_ROUTE](stt: authState, route: string) {
    stt.preAuthRoute = route;
  }
};

const actions: ActionTree<any, any> = {
  setPreAuthRoute({ commit, dispatch, state }: any, route: string) {
    commit(types.SET_PRE_AUTH_ROUTE, route);
  },
  async updateUserData({ commit, dispatch, state }: any, user: firebase.UserInfo) {
    let authUser: AuthUser;
    try {
      authUser = new FBAuthUserAdapter(user).adaptAuthUser();
      commit(types.SET_USER, authUser);
    } catch (err) {
      dispatch("propagateError", err);
    }
    commit(types.SET_AUTH_STATE_FINISHED, true);
    return user;
  },
  async authLogin({ commit, dispatch, state }: any) {
    try {
      try {
        const prov = new FirebaseAuth.GoogleAuthProvider();
        prov.addScope('profile');
        prov.addScope('email');
        // const { user } = await FirebaseAuth().signInWithPopup(prov);
        await FirebaseAuth().signInWithRedirect(prov);
      } catch (err) {
        await commit(types.SET_USER, null);
        dispatch("propagateError", err);
      }
      // await commit(types.SET_AUTH_STATE_FINISHED, true);
      await commit(types.SET_FINISHED_AUTH_INTERACTION, true);
    } catch (err) {
      dispatch("propagateError", err);
      return Promise.reject(err);
    }
  },
  async authAutoLogin({ commit, dispatch, state, rootState }, user: firebase.UserInfo) {
    console.log("Auth/authAutoLogin - start");
    try {
      console.log("Auth/authAutoLogin - user=", user);
      if (!user) {
        try {
          console.log("Auth/authAutoLogin - calling FirebaseAuth/getRedirectResult");
          const result = await FirebaseAuth().getRedirectResult();
          if (result.user) {
            user = result.user;
            const createdUser = new FBAuthUserAdapter(user).adaptAuthUser();
            console.log("Auth/authAutoLogin - calling Auth/updateUserData");
            await dispatch("updateUserData", createdUser);
          }
        } catch (err) {
          await dispatch("propagateError", err.message, { root: true });
          await commit(types.SET_AUTHENTICATION_ERROR, err);
        }
      } else {
        const parsedUser = new FBAuthUserAdapter(user).adaptAuthUser();
        await commit(types.SET_USER, parsedUser);
      }
      console.log("Auth/authAutoLogin - calling UserSettings/getUserSettings");
      await dispatch("getUserSettings", null, { root: true });
    } catch (err) {
      dispatch("propagateError", err);
    }
    console.log("Auth/authAutoLogin - setting auth state finished true");
    await commit(types.SET_AUTH_STATE_FINISHED, true);
    await commit(types.SET_FINISHED_AUTH_INTERACTION, true);
  },
  async authSignOut({ commit, dispatch, state }: any) {
    await dispatch("setViewLoadingState", true);
    try {
      const signedOut = await FirebaseAuth().signOut();
      commit(types.SET_USER, null);
    } catch (err) {
      dispatch("propagateError", err);
    }
    await dispatch("setViewLoadingState", false);
  },
  async setAuthStateFinished({ commit }: any, isLoaded: boolean) {
    commit(types.SET_AUTH_STATE_FINISHED, isLoaded);
  },
  setForbidden({ commit, dispatch }: any, forbidden: boolean) {
    try {
      commit(types.SET_AUTHENTICATION_ERROR, forbidden);
      commit(types.SET_FINISHED_AUTH_INTERACTION, true);
    } catch (err) {
      commit(types.SET_AUTHENTICATION_ERROR, false);
      dispatch("propagateError", err);
    }
  }
};

const getters: GetterTree<any, any> = {
  user(stt: authState) {
    return stt.user;
  },
  authStateFinished(stt: authState) {
    return stt.authStateFinished;
  },
  authenticationError(STT: authState) {
    return STT.authentication_error;
  },
  forbidden(stt: authState) {
    return stt.authentication_error;
  },
  finishedAuthInteraction(stt: authState) {
    return stt.finishedAuthInteraction;
  },
  preAuthRoute(stt: authState) {
    return stt.preAuthRoute;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
