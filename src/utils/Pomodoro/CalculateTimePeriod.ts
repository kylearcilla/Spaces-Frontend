import moment from "moment";

// ...for calculating time period with an unknown ending
export const calulateTimePeriod = (start: Date, cycles: number, pomPeriod: number, breakPeriod: number): any => {
  const pomodoroStart = moment(start);
  const totalTime = pomPeriod * cycles + breakPeriod * (cycles - 1);
  const pomodoroEnd = pomodoroStart.clone().add(totalTime, "m");
  const hours = Math.floor(totalTime / 60);
  const minutes = Math.floor(totalTime - hours * 60);

  const result = {
    hours: hours > 0 ? `${hours} ${hours > 1 ? "hrs" : "hr"}` : "",
    minutes: minutes > 0 ? (minutes > 1 ? `${minutes} mins` : `${minutes} min`) : "",
    starts: pomodoroStart.format("LT"),
    ends: pomodoroEnd.format("LT"),
  };

  return result;
};

// ...for calculating time period with an known ending
export const calculateTimePeriodWithEnd = (start: Date, end: Date): any => {
  const begin = moment(start);
  const finish = moment(end);
  const diff = Math.abs(moment.duration(finish.clone().diff(begin)).asSeconds());
  const hours = Math.floor(diff / 3600);  
  const minutes = Math.floor((diff - hours * 3600) / 60);
  const secs = Math.floor(diff - (minutes * 60)); 
  
  const result = {
    hours: hours > 0 ? `${hours} ${hours > 1 ? "hrs" : "hr"}` : "",
    minutes: minutes >= 1 ? (minutes > 1 ? `~${minutes} mins` : `${minutes} min`) : (secs > 1 ? `${secs} secs` : `${secs} sec`),
    starts: begin.format("LT"),
    ends: finish.format("LT"),
  };

  return result;
};

// Formats Into: HH:MM - HH:MM (HH Hours, MM Minutes)
export const makeTimePeriodString = (timePeriod: any): string => {
  const string = `${timePeriod.starts} - ${timePeriod.ends} ${timePeriod.hours} ${timePeriod.minutes}`;
  return string;
};

// Calculate End Time From Given Values
export const calculateEndTime = (startTime: Date, pomPeriod: number, breakPeriod: number, cycles: number) => {
  const totalTime = pomPeriod * cycles + breakPeriod * (cycles - 1);
  const pomodoroEnd = moment(startTime).clone().add(totalTime, "m");
  return pomodoroEnd;
};
