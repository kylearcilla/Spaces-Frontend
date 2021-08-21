import moment, { Moment } from "moment";
import { getUserSessions } from "..";

// EXAMPLE: <key: "12:00AM," value: [sessions]>
export const displayTodaySession = async (email: string, token: string) => {
  const res: any = await getUserSessions(email, token);
  if (res.error) return res;

  const sessionsData = res;
  const sessionsMap = new Map();

  sessionsData.forEach((session: any) => {
    const sessionTime = moment(session.date_created).format("hh:00 A");
    if (sessionsMap.has(sessionTime)) {
      sessionsMap.set(sessionTime, [...sessionsMap.get(sessionTime), session]);
      return;
    }
    sessionsMap.set(sessionTime, [{ ...session }]);
  });
  return {
    sessionsLength: sessionsData.length,
    sessionsData: sessionsMap,
  };
};

// EXAMPLE: <key: "Monday"," value: [sessions]>
export const displayWeekSessions = async (email: string, token: string) => {
  const res: any = await getUserSessions(email, token);
  if (res.error) return res;

  const sessionsData = res;
  const sessionsMap = new Map();

  sessionsMap.set("Sunday", []);
  sessionsMap.set("Monday", []);
  sessionsMap.set("Tuesday", []);
  sessionsMap.set("Wednesday", []);
  sessionsMap.set("Thursday", []);
  sessionsMap.set("Friday", []);
  sessionsMap.set("Saturday", []);

  const startWeek = moment(new Date()).startOf("week");
  const endWeek = moment(new Date()).endOf("week");

  sessionsData.forEach((session: any) => {
    // only get this week's dates
    if (!isSameTimePeriod(moment(session.date_created), startWeek, endWeek)) {
      return;
    }
    const sessionTime = moment(session.date_created).format("dddd");
    sessionsMap.set(sessionTime, [...sessionsMap.get(sessionTime), session]);
  });

  return {
    sessionsLength: sessionsData.length,
    sessionsData: sessionsMap,
  };
};

// EXAMPLE: <key: "July 21 - 27", value: [sessions]>
export const displayMonthSessions = async (email: string, token: string) => {
  const res: any = await getUserSessions(email, token);
  if (res.error) return res;

  const sessionsData = res;
  const sessionsMap = new Map();

  generateWeekKeys(sessionsMap);
  const firstDayOfMonth = moment(new Date()).clone().startOf("month");

  let start;
  let end;

  for (let i = 0; i < sessionsData.length; i++) {
    const session: any = sessionsData[i];
    const startDate = new Date(session.date_created);

    if (moment(startDate).clone().isBefore(firstDayOfMonth)) continue;

    start = moment(startDate).clone().startOf('week');
    end = moment(startDate).clone().endOf('week');

    // if a date is found that starts before the first week
    if (start.clone().isBefore(firstDayOfMonth.clone().startOf('w'))) break;
    
    const key = generateStringInput(start, end);
    sessionsMap.set(key, [...sessionsMap.get(key), session]);
  }

  return {
    sessionsLength: sessionsData.length,
    weekCount: sessionsMap.size,
    sessionsData: sessionsMap,
  };
};

// Fills Keys with Week Periods of a Month <key: "July 21 - 27", value: []>
const generateWeekKeys = (map: Map<string, any>): void => {
  const firstDayOfMonth = moment(new Date()).startOf('month');
  const lastDayOfMonth = moment(new Date()).endOf('month');
  
  let start = lastDayOfMonth.clone().startOf('week');
  let end = lastDayOfMonth.clone().endOf('week');
  let sum = 0;
  
  map.set(generateStringInput(start, end), []);
  
  while (true) {
      start = lastDayOfMonth.clone().subtract(sum += 7, 'd').startOf('w');
      end = lastDayOfMonth.clone().subtract(sum, 'd').endOf('w');
      if (start.clone().isBefore(firstDayOfMonth.clone().startOf('w'))) {
          break;
      }
      map.set(generateStringInput(start, end), []);
  }
}

// Returns a Key from Two Dates: Returns 'July 21 - 27'
const generateStringInput = (firstDate: Moment, secondDate: Moment): string => {
  const isSame = firstDate.isSame(secondDate, "month");
  const key = `${firstDate.format('MMMM D')} - ${isSame ? secondDate.format('D') : secondDate.format('MMMM D')}`;
  return key;
};


const isSameTimePeriod = (time: Moment, timeStart: Moment, timeEnd: Moment): boolean => {
  if ((time.isBefore(timeEnd) && time.isAfter(timeStart)) || time.isSame(timeStart) || time.isSame(timeEnd)) {
    return true;
  }
  return false;
};
