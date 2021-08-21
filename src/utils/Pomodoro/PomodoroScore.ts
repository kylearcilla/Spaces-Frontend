import moment from "moment";
import { Data } from "../../elements";

// does not generate a score if one cycle has not been done
// if user ends less than a pomPeriod after the start time, then does not count
export const isTooEarly = (start: Date, end: Date, pomodroPeriod: number) => {
  const pomodoroStart = moment(start);
  const pomodoroPeriod = pomodroPeriod;
  const userEnd = moment(end);

  if (moment.duration(userEnd.diff(pomodoroStart)).asSeconds() < pomodoroPeriod * 60) {
    return true;
  }

  return false;
};

// calculates user performance score (in medals) from stats
export const scoreUserPerformance = (sessionObject: any) => {
  const userEndTime = moment(sessionObject.userEndTime);
  const pomodoroStart = moment(sessionObject.startTime);
  const pomodoroEnd = moment(sessionObject.endTime);
  const elapsed = moment.duration(userEndTime.clone().diff(pomodoroEnd)).seconds();
  const maxTime = 45 * elapsed;

  // when user ends early
  if (elapsed < 0) {

    // total session length
    const totalLength = moment.duration(pomodoroEnd.clone().diff(pomodoroStart)).asSeconds();
    // total user length
    const userLength = moment.duration(userEndTime.clone().diff(pomodoroStart)).asSeconds();

    const scoreOfBeforeEnd = (userLength / totalLength) * 100;
    return getMedal(scoreOfBeforeEnd , false);
  }

  // when user ends after pomodoro End
  if (Math.abs(elapsed) > maxTime) {
    return "silver";
  }

  const toSubtract = Math.floor((Math.abs(elapsed) / maxTime) * 100);
  const score = (100 - toSubtract) / 100;

  return getMedal(score * 100, true);
};

// generates feedback gif and texts after a session is finished
export const performanceFeedback = (performanceScore: string): any => {
  let performanceFeedback = {};
  if (performanceScore === "gold") {
    performanceFeedback = Data.pom.goldResponse;
  } else if (performanceScore === "silver") {
    performanceFeedback = Data.pom.silverResponse;
  } else {
    performanceFeedback = Data.pom.bronzeResponse;
  }
  return performanceFeedback;
};

const getMedal = (score: number, hasPassedPomEnd: boolean): string => {
  if (!hasPassedPomEnd) {
    if (score > 80 && score <= 100) {
      return "gold";
    } else if (score > 55 && score <= 80) {
      return "silver";
    } else {
      return "bronze";
    }
  }

  if (score > 70 && score <= 100) {
    return "gold";
  }
  return "silver";
};
