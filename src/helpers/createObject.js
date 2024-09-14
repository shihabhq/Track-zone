const createMyObject = (hours, minutes, operation, utcTime, format) => {
  const timeObj = {
    id: new Date().getTime(),
    hours: Number(hours),
    minutes: Number(minutes),
    format: format,
    createdAt: new Date(),
    operation: operation,
    timeSet: Number(utcTime),
  };

  return timeObj;
};

export default createMyObject;
