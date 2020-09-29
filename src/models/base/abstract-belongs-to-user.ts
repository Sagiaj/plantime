import { AuthUser } from '../store/firebase-auth-user';

export default abstract class BelongsToUser {
    belongs_to_user_email: string = "";
    user: AuthUser = new AuthUser();

    constructor(data?: any) {
        if (data) {
            this.belongs_to_user_email = data.belongs_to_user_email || "";
            this.user = data.user || new AuthUser();
        }
    }

    setUser(user: AuthUser) {
        this.user = user;
    }

    getUser(): AuthUser {
        return this.user;
    }
}
