import UserSettings from "../models/store/user-settings"

export const hasRequiredUserSettings = (userSettings: UserSettings) => {
    return userSettings &&
    userSettings.work_days &&
    userSettings.work_hours &&
    userSettings.work_hours.start &&
    userSettings.work_hours.end &&
    userSettings.current_goal;
};
