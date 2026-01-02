// 
function prettifyDate(date, options) {
  const opt = {
    hourCycle: "h23",
    year: "numeric",
    month: "long",
    day: "numeric",
  }


  
  /* 
    undefined - it means that locale will depend on user's system setting
  */
  switch (options) {
    case "date":
      /* 
        Date format: 01/30/2000 -> and depending on user's location
      */
      return new Date(date).toLocaleString(undefined, { hourCycle: "h23" });
    case "fullDate":
      /* 
        Full date format: day ("9"),month ("December"), 2000 -> and depending on user's location 
      */
      return new Date(date).toLocaleDateString(undefined, opt/* { hourCycle: "h23" } */);
    default:
      /* 
        "date" as default
      */
      return new Date(date).toLocaleString(undefined, { hourCycle: "h23" });
  }
}

export {
  prettifyDate,
};