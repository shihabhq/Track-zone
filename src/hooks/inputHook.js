import { useState } from "react";
import { getHours, getMinutes } from "date-fns";

const useInput = ({ now }) => {
  const [utcOffsetTime, setUtcOffsetTime] = useState(6);
  const [hours, setHours] = useState(getHours(now));
  const [minutes, setMinutes] = useState(getMinutes(now));
  const [operation, setOperation] = useState("+");
  const [currentFormat, setCurrentFormat] = useState("UTC");

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
  const handleFormatChange = (e) => {
    setCurrentFormat(e.target.value);
  };

  return {
    utcOffsetTime,
    hours,
    minutes,
    operation,
    handleUtcOffsetChange,
    handleHoursChange,
    handleMinutesChange,
    handleOperationChange,
    currentFormat,
    handleFormatChange
  };
};

export default useInput;
