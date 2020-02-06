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
let activityProfile;

describe('ActivityProfile', function() {
  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers);
    userData = userRepo.getUserData(1);
    user = new User(userData);
    activityProfile = new ActivityProfile(user, sampleActivity);
  })

  it('should be a function', () => {
    expect(ActivityProfile).to.be.a('function');
  });
  // it('should contain the entries', () => {
  //   expect(activityProfile.entries).length
  // })
  it('should find the miles walked on a certain date', () => {
    expect(activityProfile.findMilesWalked('2019/06/15')).to.equal(2.91)
  })
  it('should find the minutes active on a certain day', () => {
    expect(activityProfile.findMinutesActive('2019/06/16')).to.equal(175)
  })
  it('should return the steps taken on a date', () => {
    expect(activityProfile.findSteps('2019/06/17')).to.equal(14329)
  })
  it('should find the lastest entry', function () {
    expect(activityProfile.findLastEntry()).to.equal("2019/08/24")
  })
  it('should find avg mins active for given week', () => {
    expect(activityProfile.findAvgMinActiveWeek('2019/06/21')).to.equal(171
    )
  })
  it('should determine if the step goal was met that day', () => {
    expect(activityProfile.findIfStepGoalMet('2019/06/21')).to.equal(false)
  })
  it('should find all the days the user exceeded their step goal', () => {
    expect(activityProfile.findDaysGoalExceeded()).to.deep.equal(['2019/06/17', '2019/06/20', '2019/06/22', '2019/08/24'])
  })
  it('should find their all time stair climbing record', () => {
    expect(activityProfile.findStairRecord().flightsOfStairs).to.equal(36)
  })
  it('should return the avg stairs climbed of all users on a specific date', () => {
    expect(activityProfile.findAllUsersStairClimbAvg('2019/06/17', userRepo)).to.equal(15)
  })
  it('should return the avg steps of all users on a specific date', () => {
    expect(activityProfile.findAllUsersStepsTaken('2019/06/17', userRepo)).to.equal(10781)
  })
  it('should return the avg mins active of all users on a specific date', () => {
    expect(activityProfile.findAllUsersMinsActive('2019/06/17', userRepo)).to.equal(111)
  })
})
