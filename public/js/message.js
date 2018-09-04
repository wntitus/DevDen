var generateMessage = function(from, text) {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};
module.exports = generateMessage;
