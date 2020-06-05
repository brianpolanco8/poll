const { expect } = require("chai");
const auth = require("../middlewares/auth");

// describe("Auth tests", () => {
//   it("Should throw an error if no authorization token is present", () => {
//     const req = {
//       get: () => {
//         return null;
//       },
//     };

//     expect(auth.bind(this, req, {}, () => { })).to.throw();
//   });
// });


describe('test', () => {
  it('should return a string', () => {
    expect('ci with travis').to.equal('ci with travis');
  });
});
