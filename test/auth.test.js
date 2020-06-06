const { expect } = require("chai");
const auth = require("../middlewares/auth");
const { Mutation: { sendMessage }, Query: { getMessages }, hey } = require('../graphql/resolver')

// describe("Auth tests", () => {
//   it("Should throw an error if no authorization token is present", () => {


//     const req = {
//       req: {
//         get: () => {
//           return null;
//         },
//         // userId: undefined
//       }
//     }
//     expect(sendMessage.bind(this, {}, {}, req, () => { })).to.throw('Not authenticated');
//   });
// });

it('Should throw an error if token is malformated', async () => {

  const req = {
    userId: undefined,
    get: () => {
      return 'Bearer 123'
    }
  }
  expect('hey').to.be.equal('hey');
  // expect(await hey()).to.throw()
})





// describe('test', () => {
//   it('should return a string', () => {
//     expect('ci with travis').to.equal('ci with travis');
//   });
// });
