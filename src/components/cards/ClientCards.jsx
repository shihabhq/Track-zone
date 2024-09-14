import { useState } from "react";
import CreateButton from "../buttons/ceateButton";
import styles from "./card.module.css";

import ClientCardContainer from "./clientCardContainer";

const ClientCard = ({ allotTimes }) => {
  // const {dataName,currentFormat,timeSet,operation} = allotTimes
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
          createdAt
        } = allotTime;
        return (
          <ClientCardContainer
            key={id}
            dataName={dataName}
            timeSet={timeSet}
            operation={operation}
            hours={hours}
            currentFormat={currentFormat}
            minutes={minutes}
            createdAt={createdAt}
            allotTimes={allotTimes}
          />
        );
      })}
    </div>
  );
};

export default ClientCard;
