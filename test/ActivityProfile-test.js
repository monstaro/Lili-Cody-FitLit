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
  it(`should store a list of the user's friends`, () => {
    expect(activityProfile.friends).to.deep.equal([16, 4, 8]);
  });
  it('should find the miles walked on a certain date', () => {
    expect(activityProfile.findMilesWalked('2019/06/15')).to.equal(2.91);
  });
  it('should find the minutes active on a certain day', () => {
    expect(activityProfile.findMinutesActive('2019/06/16')).to.equal(175);
  });
  it('should return the steps taken on a date', () => {
    expect(activityProfile.findSteps('2019/06/17')).to.equal(14329);
  });
  it('should be able to return an array of entries for a week given an end date', () => {
    expect(activityProfile.findDateRange('2019/06/17')).to.deep.equal([
  {
    userID: 1,
    date: '2019/06/15',
    numSteps: 3577,
    minutesActive: 140,
    flightsOfStairs: 16
  },
  {
    userID: 1,
    date: '2019/06/16',
    numSteps: 6637,
    minutesActive: 175,
    flightsOfStairs: 36
  },
  {
    userID: 1,
    date: '2019/06/17',
    numSteps: 14329,
    minutesActive: 168,
    flightsOfStairs: 18
  }
]);
  });
  it('should find avg mins active for given week', () => {
    expect(activityProfile.findAvgMinActiveWeek('2019/06/21')).to.equal(171);
  });
  it('should determine if the step goal was met that day', () => {
    expect(activityProfile.findIfStepGoalMet('2019/06/21')).to.equal(false);
  });
  it('should find all the days the user exceeded their step goal', () => {
    expect(activityProfile.findDaysGoalExceeded()).to.deep.equal(['2019/06/17', '2019/06/20', '2019/06/22', '2019/08/24']);
  });
  it('should find their all time stair climbing record', () => {
    expect(activityProfile.findStairRecord().flightsOfStairs).to.equal(36);
  });

  it('should return any trends where their steps increase for at least three days', () => {
    expect(activityProfile.findThreeDayTrends('numSteps')).to.deep.equal([['2019/06/15', '2019/06/18'],
    ['2019/06/18', '2019/06/21']]);
  });
  it('should return total steps taken for a week', () => {
    expect(activityProfile.showTotalStepsForWeek('2019/06/17')).to.equal(24543);
  });
  it.only('should compare the users steps to all users steps that day', () => {
    expect(activityProfile.compareStepsToAllUsers('2019/06/17')).to.equal('Out of 5 users, you had step count number 1!')
  })
})
