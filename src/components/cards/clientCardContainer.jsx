import CreateButton from "../buttons/ceateButton";
import styles from "./card.module.css";
import convertToUTC from "../../helpers/convertToUtc";
import { useState, useEffect } from "react";
import {
  differenceInSeconds,
  format,
  addSeconds,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";

const ClientCardContainer = ({
  dataName,
  currentFormat,
  timeSet,
  operation,
  hours,
  minutes,
  createdAt,
}) => {
  const calculateInitialTime = () => {
    const initialDifference = differenceInSeconds(
      new Date(),
      new Date(createdAt)
    );

    return setSeconds(
      setMinutes(setHours(new Date(), hours), minutes),
      initialDifference
    );
  };
  const [currentTime, setCurrentTime] = useState(calculateInitialTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => addSeconds(prevTime, 1));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const formattedTime = format(currentTime, "HH:mm:ss");

  const convertedTimeinHour = convertToUTC(
    currentFormat,
    operation,
    timeSet,
    hours
  );
  const formatUtc = format(
    setSeconds(
      setMinutes(setHours(new Date(), convertedTimeinHour), minutes),
      0
    ), 'HH:mm:ss'
  );


  return (
    <div className={styles.card}>
      <div className={styles["card-container"]}>
        <h3>{dataName}</h3>{" "}
        <div className={styles["card-container"]}>
          <CreateButton
            buttonName={"Edit"}
            bgColor={"#008fe1"}
            padding={".75rem 1rem"}
          />
          <CreateButton
            buttonName={"Delete"}
            bgColor={"#f10000"}
            padding={".75rem 1rem"}
          />
        </div>
      </div>
      <hr />
      <div className={styles["card-container"]} style={{ gap: "2rem" }}>
        <div className={styles["time-container"]}>
          <h2>Given Time</h2>
          <h3>{formattedTime}</h3>
          <p>
            {currentFormat} {operation} {timeSet}
          </p>
        </div>
        <div className={styles["time-container"]}>
          <h2>UTC converted Time</h2>
          <h3>{formatUtc}</h3>
          <p>UTC + 4</p>
        </div>
      </div>
      <p style={{ color: "red", fontSize: "18px" }}>
        This time is 6 hours 30 minutes added to <br /> your current time
      </p>
      <CreateButton bgColor={"#6004d9"} buttonName={"Create Events"} />
    </div>
  );
};

export default ClientCardContainer;
