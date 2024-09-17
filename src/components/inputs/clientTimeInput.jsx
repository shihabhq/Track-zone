import InputComponent from "./input";
import createMyObject from "../../helpers/createObject";

import { getHours, getMinutes } from "date-fns";

const ClientTimeInput = ({
  controlSelf,
  name,
  formatName,
  canSetZone,
  setItemInto,
  changeDataName,
  dataName,
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
    if (setItemInto === "allotTimes" && dataName) {
      const existingData = JSON.parse(localStorage.getItem("allotTimes")) || [];
      timeObj.dataName = dataName;
      timeObj.events = {};

      // Push new data (inputData object) into the array
      const updatedData = [timeObj, ...existingData];

      // Save the updated array back to localStorage
      console.log(timeObj);
      localStorage.setItem("allotTimes", JSON.stringify(updatedData));
      controlSelf(false);
    } else {
      alert("Please Give enough information");
    }
  };

  return (
    <InputComponent
      dataName={dataName}
      name={name}
      formatName={formatName}
      canSetZone={canSetZone}
      controlSelf={controlSelf}
      createMyObject={createMyObject}
      setItemInto={setItemInto}
      handleSubmit={handleSubmit}
      createName={"Create Time"}
    >
      <input
        style={{
          outline: "none",
          padding: ".75rem 1rem",
          fontSize: "18px",
          borderRadius: "20px",
        }}
        onChange={changeDataName}
        type="text"
        name=""
        id="name"
        placeholder="Enter the client name"
      />
    </InputComponent>
  );
};

export default ClientTimeInput;
