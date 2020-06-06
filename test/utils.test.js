const { expect } = require('chai')
const { sum } = require('../utils')

describe('utils tests', async () => {
    it('should return the sum of 2 numbers', async () => {
        expect(await sum(2, 2)).to.be.equals(4);
    })
})