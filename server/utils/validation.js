var isRealString = (str) => {
  //Check if it's string and is non empty:
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};
