var expect = require("chai").expect;
// var generateMessage = require("./message");

describe("canary test", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });
});
// describe("generateMessage", function() {
//   it("should generate correct message object", function() {
//     var from = "roc";
//     var text = "some message";
//     var message = generateMessage(from, text);
//     expect(message.createdAt).toBeA("number");
//     expect(message).toInclude({ from: "roc", text: "some message" });
//   });
// });
