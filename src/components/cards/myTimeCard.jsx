import { useEffect, useState } from "react";
import { addSeconds, format, setHours, setMinutes, setSeconds } from "date-fns";

const MyCard = ({ storedTime }) => {
  const { hours, minutes, format: timeFormat, operation, timeSet } = storedTime;

  // Initialize the time based on storedTime
  const [currentTime, setCurrentTime] = useState(
    setSeconds(setMinutes(setHours(new Date(), hours), minutes), 0)
  );

//   Update currentTime when storedTime changes
  useEffect(() => {
    const updatedTime = setSeconds(
      setMinutes(setHours(new Date(), hours), minutes),
      0
    );
    setCurrentTime(updatedTime);
  }, [storedTime]); 

  // Function to update time every second using date-fns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => addSeconds(prevTime, 1));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

//   Format the current time using date-fns
  const formattedTime = format(currentTime, "HH:mm:ss");

  return (
    <div style={cardStyle}>
      <h1>My time</h1>
      <p>
        Time: {formattedTime} {timeFormat} {operation} {timeSet}
      </p>
    </div>
  );
};

// Basic inline styling for the card
const cardStyle = {
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "10px",
  width: "300px",
  textAlign: "center",
};

export default MyCard;
