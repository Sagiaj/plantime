import TextValuePair from '../TextValuePair';

export enum Weekdays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
};

export default class Weekday {
  static WEEKDAYS = Weekdays;

  static parseTextValuePairList(): TextValuePair[] {
    const list: TextValuePair[] = [];
    for (const key in Weekday.WEEKDAYS) {
        const day = Weekday.WEEKDAYS[key];
        list.push(new TextValuePair(day, key));
    }

    return list;
  }
}
