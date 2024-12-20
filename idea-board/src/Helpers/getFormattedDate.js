export default function getFormattedDate(newDateObject) {
  const options = {
    year: "2-digit", // "24"
    month: "short", // "Jan"
    day: "numeric", // "1" (removes leading zero)
    hour: "2-digit", // "11"
    minute: "2-digit", // "03"
    hour12: true, // "am/pm"
  };

  // Format the date using `Intl.DateTimeFormat`
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    newDateObject
  );

  // Format the time as "am/pm", removing seconds
  const timeString = newDateObject
    .toLocaleTimeString("en-GB", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })
    .toLowerCase()
    .replace(/(.*)\s/, "$1");

  // Combine date and time without commas
  // Combine date and time correctly without a comma after the year
  const [day, month, year] = formattedDate.split(" ");
  return `${day} ${month} ${year.replace(",", "")} | ${timeString}`;
}
