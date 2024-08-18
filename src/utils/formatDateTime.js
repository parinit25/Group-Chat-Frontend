// src/utils/formatDateTime.js

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  // Get day of the month
  const day = date.getUTCDate();

  // Get month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];

  // Get hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "P.M." : "A.M.";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format minutes to always show two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${month} ${hours}:${formattedMinutes} ${ampm}`;
};
