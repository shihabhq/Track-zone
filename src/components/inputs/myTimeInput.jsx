import InputComponent from "./input";
import createMyObject from "../../helpers/createObject";

import { getHours, getMinutes } from "date-fns";

const MyTimeInput = ({
  controlSelf,
  name,
  syncTime,
  formatName,
  canSetZone,
  setItemInto,
  createName
}) => {
  const handleSubmit = (
    e,
    { hours, minutes, operation, utcOffsetTime, currentFormat }
  ) => {
    e.preventDefault();
    const timeObj = createMyObject(
      hours,
      minutes,
      operation,
      utcOffsetTime,
      currentFormat
    );
    if (setItemInto === "ownTime") {
      localStorage.setItem("ownTime", JSON.stringify(timeObj));
      controlSelf(false);
    } else {
      alert("Please Give enough information");
    }
  };

  const syncCurrentTime = () => {
    const now = new Date();

    const timeObj = createMyObject(
      now.getHours(),
      now.getMinutes(),
      "+",
      6,
      "UTC"
    );

    localStorage.setItem("ownTime", JSON.stringify(timeObj));
    controlSelf(false);
    alert("time added successfully");
  };

  return (
    <InputComponent
      name={name}
      syncTime={syncTime}
      formatName={formatName}
      canSetZone={canSetZone}
      syncCurrentTime={syncCurrentTime}
      controlSelf={controlSelf}
      handleSubmit={handleSubmit}
      createName={createName}
    />
  );
};

export default MyTimeInput;
