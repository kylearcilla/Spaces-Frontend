import {
  calculateEndTime,
  calculateTimePeriodWithEnd,
  calulateTimePeriod,
  isTooEarly,
  makeTimePeriodString,
  scoreUserPerformance,
} from "../../utils";
import { SessionObject } from "../types";

export const setNewSessionObject = (values: any) => {
  const newSession = { ...values };
  newSession.startTime = new Date();
  newSession.currentTime = { minutes: 0, seconds: 0 };
  newSession.currentCycle = 1;
  newSession.currentPeriod = "study";
  newSession.isJustFinishedPeriod = false;
  newSession.isFinished = false;
  newSession.isEarly = false;
  newSession.endTime = calculateEndTime(
    newSession.startTime,
    newSession.pomodoroPeriod,
    newSession.breakPeriod,
    newSession.cycles
  );

  localStorage.setItem("currentSession", JSON.stringify(newSession));

  return newSession;
};

export const contiueToNextPeriod = (sessionObject: SessionObject) => {
  sessionObject.isJustFinishedPeriod = true;
  if (sessionObject.currentPeriod === "study") {
    // if coming from study period, and if last cycle, increase cycle, to pass isFinished check later
    if (sessionObject.currentCycle === sessionObject.cycles) {
      sessionObject.currentCycle++;
    }
    sessionObject.currentPeriod = "break";

    // cycle increases after break since: 1 cycle = 1 study + 1 break
  } else {
    sessionObject.currentCycle++;
    sessionObject.currentPeriod = "study";
  }
};

export const checkIfSessionIsFinished = (
  sessionObject: SessionObject,
  callback: any
) => {
  if (sessionObject.currentCycle > sessionObject.cycles) {
    sessionObject.isFinished = true;
    sessionObject.isJustFinishedPeriod = false;
    callback();
    // score the time, and save the thing (if at least one cycle has been done)
    return;
  }
};

export const calculateFinishedSessionStats = (
  finishedObject: SessionObject
) => {
  const actualTime = calulateTimePeriod(
    finishedObject.startTime,
    finishedObject.cycles,
    finishedObject.pomodoroPeriod,
    finishedObject.breakPeriod
  );
  const userTime = calculateTimePeriodWithEnd(
    finishedObject.startTime,
    finishedObject.userEndTime
  );
  const medal = scoreUserPerformance(finishedObject);

  finishedObject.stats = {
    actualTime: makeTimePeriodString(actualTime),
    userTime: makeTimePeriodString(userTime),
    medal: medal,
  };

  return finishedObject;
};

export const tooEarlyCheck = (finishedObject: SessionObject) => {
  if (
    isTooEarly(
      finishedObject.startTime,
      finishedObject.userEndTime,
      finishedObject.pomodoroPeriod
    ) &&
    finishedObject.cycles !== 1
  ) {
    return true;
  }
  return false;
};
