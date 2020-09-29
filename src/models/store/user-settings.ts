import BelongsToUser from '../base/abstract-belongs-to-user';
import { Weekdays } from "../calendar/weekdays";
import WorkHours from '../calendar/work-hours';

export default class UserSettings extends BelongsToUser {
    work_days: Weekdays[] = [];
    work_hours: WorkHours = new WorkHours();
    timezone: string = "";

    constructor(settings?: UserSettings) {
        super(settings);
    }

    setWorkDays(days: Weekdays[]) {
        this.work_days = days;
    }

    setWorkHours(start: number, end: number) {
        this.work_hours.start = start;
        this.work_hours.end = end;
    }

    setTimezone(timezone: string) {
        this.timezone = timezone;
    }
}
