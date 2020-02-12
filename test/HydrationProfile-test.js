const chai = require('chai');
const expect = chai.expect;

const Hydration = require ('../src/HydrationProfile.js')
const sampleUsers = require ('../data/sample-users.js')
const sampleHydration = require ('../data/sample-hydration.js')
const User = require ('../src/User.js')
const UserRepository = require ('../src/UserRepository.js')

let userRepo;
let userData
let user;
let hydration;

describe('Hydration', function() {

  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers)
    userData = userRepo.getUserData(4)
    user = new User(userData)
    hydration = new Hydration(user.id, sampleHydration)
  })

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should instantiate with the current user id', () => {
    expect(hydration.id).to.equal(user.id)
  });

  it(`should store all of the user's entries`, () => {
    expect(hydration.entries).to.deep.equal([
      {userID: 4, date: '2019/06/15', numOunces: 85},
      {userID: 4, date: '2019/06/16', numOunces: 95},
      {userID: 4, date: '2019/06/17', numOunces: 82},
      {userID: 4, date: '2019/06/18', numOunces: 93},
      {userID: 4, date: '2019/06/19', numOunces: 21},
      {userID: 4, date: '2019/06/20', numOunces: 95},
      {userID: 4, date: '2019/06/21', numOunces: 91},
      {userID: 4, date: '2019/06/22', numOunces: 34}
    ])
  });

  it('should use the id to determine the avg ounces of fluid consumed from all days', () => {
    expect(hydration.calculateAllTimeOzAvg()).to.equal(74)
  });

  it('should use an id and date to determine how much fluid was dranken that day', () => {
    expect(hydration.findOzConsumed("2019/06/15")).to.equal(85)
  });

  it('should take in a date and determine the amount of oz of that week', () => {
    expect(hydration.findOzForWeek("2019/06/21")).to.deep.equal([ 85, 95, 82, 93, 21, 95, 91 ])
  });

  it('should be able to return the latest entry', () => {
    expect(hydration.findLastEntry()).to.equal('2019/06/22');
  });
})
