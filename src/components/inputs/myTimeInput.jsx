
import InputComponent from "./input";
import createMyObject from "../../helpers/createObject";


import { getHours, getMinutes } from "date-fns";

const MyTimeInput = ({
  controlSelf,
  name,
  syncTime,
  formatName,
  canSetZone,
  setItemInto
}) => {
  

  
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
      createMyObject={createMyObject}
      setItemInto={setItemInto}
    />
  );
};

export default MyTimeInput;
