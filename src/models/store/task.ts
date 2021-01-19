import BelongsToUser from '../base/abstract-belongs-to-user';
import { TaskStatus } from '../enums/TaskStatus';
import { v4 as uuid } from "uuid";

export default class Task extends BelongsToUser {
    _id: string = uuid();
    tag: string = "";
    status: TaskStatus = TaskStatus.ToDo;
    is_active: boolean = false;
    belongs_to_user_email: string = "";
    start_ts: number = 0;
    end_ts: number = 0;
    goal: string = "";
    title: string = "";

    constructor(fb_data?: Task) {
        super(fb_data);
        if (fb_data) {
            this.tag = fb_data.tag || "";
            this._id = fb_data._id || uuid();
            this.belongs_to_user_email = fb_data.belongs_to_user_email || "";
            this.end_ts = fb_data.end_ts || 0;
            this.start_ts = fb_data.start_ts || 0;
            this.status = fb_data.status || TaskStatus.ToDo;
            this.is_active = fb_data.is_active || false;
            this.goal = fb_data.goal || "";
            this.title = fb_data.title || "";
        }
    }

    finish() {
        this.status = TaskStatus.Done;
        this.is_active = false;
    }

    start() {
        this.status = TaskStatus.ToDo;
        this.is_active = true;
    }
}
