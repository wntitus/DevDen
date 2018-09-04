var generateMessage = function(from, text) {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

// var generateLocationMessage = function(from, lat, long){
//     return{
//         from,
//         url:`https://www.google.com/maps?=${lat},${long}`,
//         createdAt: new Date().getTime()
//     };
// };

module.exports = generateMessage;
// module.exports = generateLocationMessage;