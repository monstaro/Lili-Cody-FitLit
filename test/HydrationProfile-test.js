const chai = require('chai');
const expect = chai.expect;

const Hydration = require ('../src/HydrationProfile.js')
const sampleUsers = require ('../data/sample-users.js')
const sampleHydration = require ('../data/sample-hydration.js')
const User = require ('../src/User.js')
const UserRepository = require ('../src/UserRepository.js')

let userRepo;
let user;
let data;
let hydration;


describe('Hydration', function() {
  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers)
    data = userRepo.getUserData(4)
    user = new User(data)
    hydration = new Hydration(user.id)
  })
  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });
  it('should instantiate with the current user id', () => {
    expect(hydration.id).to.equal(user.id)
  })
  it('should use the id to determine the avg ounces of fluid consumed from all days', () => {
    expect(hydration.calculateAllTimeOzAvg()).to.equal(74)
  })
  it('should use an id and date to determine how much fluid was dranken that day', () => {
    expect(hydration.findOzConsumed("2019/06/15")).to.equal(85)
  })
  it('should take in a date and determine the average fl oz of that week', () => {
    expect(hydration.calculateWeekAvg("2019/06/15")).to.equal(74)
  })
})