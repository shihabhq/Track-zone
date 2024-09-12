import { useState } from "react";
import CreateButton from "../buttons/ceateButton";
import styles from "./input.module.css";

import { differenceInMinutes, getHours, getMinutes, setHours } from "date-fns";

const MyTimeInput = ({ controlSelf }) => {
  const now = new Date();
  const [utcOffsetTime, setUtcOffsetTime] = useState(6);
  const [hours, setHours] = useState(getHours(now));
  const [minutes, setMinutes] = useState(getMinutes(now));
  const [operation, setOperation] = useState("+");

  const handleUtcOffsetChange = (e) => {
    setUtcOffsetTime(e.target.value); // Set the UTC offset from input
  };
  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };
  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };
  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (hours !== "" && minutes !== "") {
      const timeObj = {
        id: new Date().getTime(),
        hours: Number(hours),
        minutes: Number(minutes),
        format: "UTC",
        operation: operation,
        timeSet: Number(utcOffsetTime),
      };
      localStorage.setItem("ownTime", JSON.stringify(timeObj));
      controlSelf(false);

      alert("time added successfully");
    } else {
      alert("Please select both hours and minutes.");
    }
  };
  const syncCurrentTime = () => {
    const now = new Date();

    const timeObj = {
      id: new Date().getTime(),
      hours: now.getHours(),
      minutes: now.getMinutes(),
      format: "UTC",
      operation: "+",
      timeSet: 6,
    };
    localStorage.setItem("ownTime", JSON.stringify(timeObj));
    controlSelf(false);
    alert("time added successfully");
  };

  return (
    <div className={styles["input-container"]}>
      <div
        onClick={() => controlSelf(false)}
        className={styles["form-container"]}
      ></div>
      <form className={styles["form-style"]}>
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <CreateButton
            padding={".75rem 1rem"}
            bgColor={"#ff2211"}
            buttonName={"X"}
            onclick={(e) => (e.preventDefault(), controlSelf(false))}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>My time</h3>
          <CreateButton
            buttonName={"sync Current time"}
            padding={"1rem 1rem"}
            fontSize={"18px"}
            bgColor={"#222"}
            onclick={syncCurrentTime}
          />
        </div>
        <hr style={{ margin: "1rem 0" }} />
        <div style={{ display: "flex" }}>
          <div>
            <h3
              style={{
                fontSize: "22px",
                margin: "1rem 0",
              }}
            >
              Set time
            </h3>
            <div style={{ display: "flex" }}>
              <div>
                <h3>Hours</h3>
                <select
                  value={hours}
                  onChange={handleHoursChange}
                  style={{ padding: "5px", marginRight: "10px" }}
                >
                  <option value="" disabled>
                    Select Hour
                  </option>
                  {[...Array(24)].map((_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h3>Minutes</h3>
                <select
                  value={minutes}
                  onChange={handleMinutesChange}
                  style={{ padding: "5px", marginRight: "10px" }}
                >
                  <option value="" disabled>
                    Select Hour
                  </option>
                  {[...Array(60)].map((_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <h3>Set Utc format</h3>
          <div style={{ display: "flex" }}>
            <select
              value={operation}
              onChange={handleOperationChange}
              style={{ padding: "5px", marginRight: "10px" }}
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <select
              value={utcOffsetTime}
              onChange={handleUtcOffsetChange}
              style={{ padding: "5px", marginRight: "10px" }}
            >
              <option value="" disabled>
                Select time
              </option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={Number(i)}>
                  {i.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <CreateButton
          onclick={handleSubmit}
          bgColor={"#445"}
          buttonName={"create"}
          padding={"1rem 1.2rem"}
        />
      </form>
    </div>
  );
};

export default MyTimeInput;
