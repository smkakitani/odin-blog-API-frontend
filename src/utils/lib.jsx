


// 
function prettifyDate(date) {
  // undefined - it means that locale will depend on user's system setting
  const prettyDate = new Date(date).toLocaleString(undefined, { hourCycle: "h23" })
  return prettyDate;
}

export {
  prettifyDate,
};