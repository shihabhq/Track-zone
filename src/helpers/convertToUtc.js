import {
  addHours,
  subHours,
  differenceInMinutes,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";

const convertToUTC = (
  hours,
  minutes,
  timeZone,
  operation,
  timeSet,
  ownTime
) => {
  let date = new Date();
  date.setHours(hours), date.setMinutes(minutes);

  const operate = (operation, date, timeSet) => {
    if (operation === "+") {
      return subHours(date, timeSet);
    } else if (operation === "-") {
      return addHours(date, timeSet);
    }
  };

  const reverseOperate = (operation, date, timeSet) => {
    if (operation === "+") {
      return addHours(date, timeSet);
    } else if (operation === "-") {
      return subHours(date, timeSet);
    }
  };

  const newTimeWithinZone = operate(operation, date, timeSet);

  const zones = {
    GMT: 0,
    UTC: 0,
    EST: 5,
    PST: 8,
  };

  const { operation: myOperation, timeSet: myTimeSet } = ownTime;
  const UtcConverted = subHours(newTimeWithinZone, zones[timeZone]);
  const UtcSyncedToMyTime = reverseOperate(
    myOperation,
    UtcConverted,
    myTimeSet
  );

  return setSeconds(UtcSyncedToMyTime, 0);
};

export default convertToUTC;
