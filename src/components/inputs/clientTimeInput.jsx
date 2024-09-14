import InputComponent from "./input";
import createMyObject from "../../helpers/createObject";

import { getHours, getMinutes } from "date-fns";

const ClientTimeInput = ({
  controlSelf,
  name,
  syncTime,
  formatName,
  canSetZone,
  setItemInto,
  changeDataName,
  dataName,
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
      dataName={dataName}
      name={name}
      syncTime={syncTime}
      formatName={formatName}
      canSetZone={canSetZone}
      syncCurrentTime={syncCurrentTime}
      controlSelf={controlSelf}
      createMyObject={createMyObject}
      setItemInto={setItemInto}
      
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
