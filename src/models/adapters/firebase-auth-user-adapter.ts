import { AuthUser } from '@/models/store/firebase-auth-user';

export class FBAuthUserAdapter {
    public email: string | null = null;
    public name: string | null = null;
    protected _firebase_user_info?: firebase.UserInfo;
  
    constructor(firebase_user_info?: firebase.UserInfo) {
      if (firebase_user_info) {
        this._firebase_user_info = firebase_user_info;
        this.email = firebase_user_info.email;
        this.name = firebase_user_info.displayName;
      }
    }
  
    adaptAuthUser(): AuthUser {
        const authUser = new AuthUser();
        authUser.name = this.name || "";
        authUser.email = this.email || "";
        if (this._firebase_user_info) {
            authUser.phone_number = this._firebase_user_info.phoneNumber || ""
            authUser.uid = this._firebase_user_info.uid;
            authUser.avatar_url = this._firebase_user_info.photoURL || "";
        }
        return authUser;
    }
  }