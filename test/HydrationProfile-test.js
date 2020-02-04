const chai = require('chai');
const expect = chai.expect;

const Hydration = require ('../src/HydrationProfile.js')
const User = require ('../src/User.js')

let user;
let hydration;

describe('Hydration', function() {
  beforeEach(() => {
    user = new User(userData)
  })
  it('should be a function', function() {
    expect(Hydration).to.be.a('function');

  });
})