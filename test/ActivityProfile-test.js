const chai = require('chai');
const expect = chai.expect;

const sampleUsers = require ('../data/sample-users.js');
const sampleActivity = require ('../data/sample-activity.js')
const User = require ('../src/User.js');
const UserRepository = require ('../src/UserRepository.js');
const ActivityProfile = require ('../src/ActivityProfile.js')

let userRepo;
let user;
let userData;
let activitySummary;

describe('ActivityProfile', function() {
  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers);
    userData = userRepo.getUserData(1);
    user = new User(userData);
    activitySummary = new ActivityProfile(user, sampleActivity);
  })

  it('should be a function', () => {
    expect(ActivityProfile).to.be.a('function');
  });
  it('should find the miles walked on a certain date', () => {
    expect(activitySummary.findMilesWalked('2019/06/15')).to.equal(2.91)
  })
  it('should find the minutes active on a certaun day', () => {
    expect(activitySummary.findMinutesActive('2019/06/16')).to.equal(220)
  })
})
