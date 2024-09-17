import CreateButton from "../buttons/ceateButton";
import styles from "./card.module.css";
import convertToUTC from "../../helpers/convertToUtc";
import { useState, useEffect } from "react";
import createMyObject from "../../helpers/createObject";
import calculateTimeDifference from "../../helpers/differentFromCurrent";

import {
  differenceInSeconds,
  format,
  addSeconds,
  setHours,
  setMinutes,
  setSeconds,
  getSeconds,
  differenceInMinutes,
  min,
  getMinutes,
} from "date-fns";
import InputComponent from "../inputs/input";

const ClientCardContainer = ({
  dataName,
  currentFormat,
  timeSet,
  operation,
  hours,
  minutes,
  createdAt,
  deleteItem,
  id,
  allotTimes,
  setAllotTimes,
  ownTime,
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

  const convertedTime = convertToUTC(
    hours,
    minutes,
    currentFormat,
    operation,
    timeSet,
    ownTime
  );

  const [editShow, setEditShow] = useState(false);
  const [currentTime, setCurrentTime] = useState(calculateInitialTime());
  const [timeConverted, setTimeConverted] = useState(convertedTime);

  useEffect(() => {
    setCurrentTime(calculateInitialTime());
    const seconds = getSeconds(calculateInitialTime());
    const minutes = getMinutes(calculateInitialTime());
    setTimeConverted(setSeconds(setMinutes(convertedTime, minutes), seconds));
  }, [ownTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => addSeconds(prevTime, 1));
      setTimeConverted((prevTime) => addSeconds(prevTime, 1));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleEditSubmit = (
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

    const indexToUpdate = allotTimes.findIndex(
      (allotTime) => allotTime.id === id
    );
    if (indexToUpdate !== -1) {
      // Create a new array by mapping over the old array and updating the specific item
      const updatedAllotTimes = allotTimes.map((allotTime, index) =>
        index === indexToUpdate ? { ...allotTime, ...timeObj } : allotTime
      );

      // Update the state with the new array
      setAllotTimes(updatedAllotTimes);
      localStorage.setItem("allotTimes", JSON.stringify(updatedAllotTimes));
    }
  };

  const handleShowingEditInput = () => {
    setEditShow(true);
  };

  const formattedTime = format(currentTime, "HH:mm:ss");
  const formattedConvertedTime = format(timeConverted, "HH:mm:ss");

  function getMyTime(ownTime) {
    // Create a new Date object
    let date = new Date();

    // Set hours, minutes, and seconds to the given time, while keeping the date the same
    date.setHours(ownTime.hours, ownTime.minutes, 0, 0); // setHours(hours, minutes, seconds, milliseconds)

    return format(date, "HH:mm:ss");
  }

  const { hoursDiffer, minutesDiffer } = calculateTimeDifference(
    formattedConvertedTime,
    getMyTime(ownTime)
  );

  console.log(hoursDiffer);

  return (
    <div className={styles.card}>
      <div className={styles["card-container"]}>
        <h3>{dataName}</h3>
        <div className={styles["card-container"]}>
          <CreateButton
            onclick={handleShowingEditInput}
            buttonName={"Edit"}
            bgColor={"#008fe1"}
            padding={".75rem 1rem"}
          />
          <CreateButton
            onclick={() => deleteItem(id)}
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
          <h3>{formattedConvertedTime}</h3>
          <p>{`${ownTime.format} ${ownTime.operation} ${ownTime.timeSet}`}</p>
        </div>
      </div>
      <p style={{ color: "red", fontSize: "18px" }}>
        This time differs {hoursDiffer} hours and {minutesDiffer} minutes from{" "}
        <br /> your current time
      </p>
      {/* <CreateButton bgColor={"#6004d9"} buttonName={"Create Events"} /> */}
      {editShow && (
        <InputComponent
          controlSelf={setEditShow}
          name={dataName + " edit"}
          createName={"Edit"}
          canSetZone={true}
          formatName={`current:${currentFormat} ${operation} ${timeSet}`}
          handleSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default ClientCardContainer;
