const getUTCTime = (dateTimeString) => {
    const dt = new Date(dateTimeString);
    const dtNumber = dt.getTime();
    const dtOffset = dt.getTimezoneOffset() * 6000;
    const dtUTC = new Date();
    dtUTC.setTime(dtNumber - dtOffset);
    return dtUTC.toISOString();
  };
  
  module.exports = getUTCTime;
