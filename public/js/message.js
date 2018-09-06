var moment = require("moment");

var generateMessage = function(from, text) {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};




module.exports = generateMessage;
