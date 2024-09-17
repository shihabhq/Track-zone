import { useState } from "react";
import CreateButton from "../buttons/ceateButton";
import styles from "./card.module.css";

import ClientCardContainer from "./clientCardContainer";

const ClientCard = ({ allotTimes, setAllotTimes,ownTime,setOwnTime }) => {
  // delete Functionality:
  const deleteItem = (id) => {
    const filteredAllotTimes = allotTimes.filter(
      (allotTime) => allotTime.id !== id
    );
    setAllotTimes(filteredAllotTimes);
    localStorage.setItem("allotTimes", JSON.stringify(filteredAllotTimes));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {allotTimes.map((allotTime) => {
        const {
          id,
          dataName,
          hours,
          minutes,
          format: currentFormat,
          operation,
          timeSet,
          createdAt,
        } = allotTime;
        return (
          <ClientCardContainer
            key={id}
            id={id}
            dataName={dataName}
            timeSet={timeSet}
            operation={operation}
            hours={hours}
            currentFormat={currentFormat}
            minutes={minutes}
            createdAt={createdAt}
            deleteItem={deleteItem}
            allotTimes={allotTimes}
            setAllotTimes={setAllotTimes}
            ownTime={ownTime}
            setOwnTime={setOwnTime}
          />
        );
      })}
    </div>
  );
};

export default ClientCard;
