import { differenceInSeconds, differenceInMinutes } from "date-fns";

const calculateTimeDifference = (firstTime, secondTime) => {
  // Parse the first and second times into Date objects for today
  const today = new Date();

  const [firstHours, firstMinutes] = firstTime.split(":").map(Number);
  const [secondHours, secondMinutes] = secondTime.split(":").map(Number);

  const firstDate = new Date(today.setHours(firstHours, firstMinutes, 0, 0));
  const secondDate = new Date(today.setHours(secondHours, secondMinutes, 0, 0));

  // Get the total difference in minutes
  let totalMinutes = differenceInMinutes(firstDate, secondDate);

  // Handle the negative difference by taking absolute value if needed
  totalMinutes = Math.abs(totalMinutes);

  // Convert total minutes to hours and minutes
  const hoursDiffer = Math.floor(totalMinutes / 60);
  const minutesDiffer = totalMinutes % 60;

  return {
    hoursDiffer,
    minutesDiffer,
  };
};
export default calculateTimeDifference;
