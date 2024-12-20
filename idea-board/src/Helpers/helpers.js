export { DUMMY_DATA, getFormattedDate };

const DUMMY_DATA = [
  {
    id: 0,
    title: "Make your dishes truly spicy!",
    details:
      "To add real spice to your dishes, experiment with fresh chili peppers like habaneros or Thai bird's eye chilies. Pair these with a bit of acidity, like lime juice, to balance the heat and enhance the flavor.",
    editing: false,
    createdAt: "18 Dec 24 | 8:12 am",
    lastUpdated: "19 Dec 24 | 5:30 pm", // 3 hours after createdAt
  },
  {
    id: 1,
    title: "Master the art of sous-vide cooking!",
    details:
      "Sous-vide is a technique that involves cooking food in a vacuum-sealed bag in low-temperature water for hours. This method ensures perfectly tender and evenly cooked meals with enhanced flavor and moisture.",
    editing: false,
    createdAt: "18 Dec 24 | 8:12 am",
    lastUpdated: "19 Dec 24 | 5:30 pm", // 3 hours after createdAt
  },
  {
    id: 2,
    title: "Perfect the sear for delicious crusts!",
    details:
      "To get that irresistible crispy crust, make sure your pan is extremely hot before adding the meat. Use a high-smoke point oil like vegetable or grapeseed oil to prevent burning and achieve that golden-brown exterior.",
    editing: false,
    createdAt: "18 Dec 24 | 8:12 am",
    lastUpdated: "19 Dec 24 | 5:30 pm", // 3 hours after createdAt
  },
  {
    id: 3,
    title: "Boost flavor with caramelization!",
    details:
      "Caramelization is the process of browning sugar in food, which adds rich flavor and depth. For a perfect caramelization, ensure your heat is moderate and don’t rush—let the sugar slowly transform to a golden hue.",
    editing: false,
    createdAt: "18 Dec 24 | 8:12 am",
    lastUpdated: "19 Dec 24 | 5:30 pm", // 3 hours after createdAt
  },
  {
    id: 4,
    title: "Achieve perfect seasoning every time!",
    details:
      "Seasoning is an art—always taste your food as you cook. Start with salt and pepper, and then layer in additional spices, tasting frequently to balance the flavors and elevate the dish.",
    editing: false,
    createdAt: "18 Dec 24 | 8:12 am",
    lastUpdated: "19 Dec 24 | 5:30 pm", // 3 hours after createdAt
  },
];

function getFormattedDate(newDateObject) {
  const options = {
    year: "2-digit", // "24"
    month: "short", // "Dec"
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
