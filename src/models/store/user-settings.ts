import BelongsToUser from '../base/abstract-belongs-to-user';
import { Weekdays } from "../calendar/weekdays";
import WorkHours from '../calendar/work-hours';

export default class UserSettings extends BelongsToUser {
    is_first_time_user: boolean = false;
    work_days: Weekdays[] = [];
    work_hours: WorkHours = new WorkHours();
    timezone: number = 0;
    current_goal: string = ""

    constructor(settings?: UserSettings) {
        super(settings);
        if (settings) {
            this.is_first_time_user = !!settings.is_first_time_user;
            if (settings.work_days) {
                this.setWorkDays(settings.work_days);
            }
            if (settings.work_hours) {
                this.setWorkHours(settings.work_hours["start"], settings.work_hours["end"]);
            }
            this.setTimezone(settings.timezone);
        }
    }

    setWorkDays(days: Weekdays[]) {
        this.work_days = days;
    }

    setWorkHours(start: string, end: string) {
        this.work_hours.start = start;
        this.work_hours.end = end;
    }

    setTimezone(timezone: number) {
        this.timezone = timezone || new Date().getTimezoneOffset();
    }

    setCurrentGoal(current_goal: string) {
        this.current_goal = current_goal;
    }
}
