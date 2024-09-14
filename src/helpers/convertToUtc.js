const convertToUTC = (timeZone, operation, timeSet, hours) => {
  const operate = (operation, cb) => {
    if (operation === "+") {
      return cb() + timeSet;
    } else if (operation === "-") {
      return cb() - timeSet;
    }
  };
  const zones = {
    GMT: (time) => time,
    UTC: (time) => time,
    EST: (time) => time + 5,
    PST: (time) => time + 8,
  };

  return operate(operation, () => zones[timeZone](parseInt(hours))) % 12;
};

export default convertToUTC;
