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

  it(`should store the user's information`, () => {
    expect(activityProfile.user).to.deep.equal(user);
  });

  it(`should store a list of the user's friends`, () => {
    expect(activityProfile.data).to.deep.equal(sampleActivity);
  });

  it(`should store a list of the user's personal data`, () => {
    expect(activityProfile.entries).to.deep.equal([
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
      },
      {
        userID: 1,
        date: '2019/06/18',
        numSteps: 4419,
        minutesActive: 165,
        flightsOfStairs: 33
      },
      {
        userID: 1,
        date: '2019/06/19',
        numSteps: 8429,
        minutesActive: 275,
        flightsOfStairs: 2
      },
      {
        userID: 1,
        date: '2019/06/20',
        numSteps: 14478,
        minutesActive: 140,
        flightsOfStairs: 12
      },
      {
        userID: 1,
        date: '2019/06/21',
        numSteps: 6760,
        minutesActive: 135,
        flightsOfStairs: 6
      },
      {
        userID: 1,
        date: '2019/06/22',
        numSteps: 10289,
        minutesActive: 119,
        flightsOfStairs: 6
      },
      {
        userID: 1,
        date: '2019/08/23',
        numSteps: 8213,
        minutesActive: 122,
        flightsOfStairs: 27
      },
      {
        userID: 1,
        date: '2019/08/24',
        numSteps: 11654,
        minutesActive: 270,
        flightsOfStairs: 19
      }
    ]);
  });

  it(`should store the user's friends`, () => {
    expect(activityProfile.friends).to.deep.equal([16, 4, 8]);
  });

  it('should be able to return the date of the last entry', () => {
    expect(activityProfile.findLastEntry()).to.equal('2019/08/24');
  });

  it('should find the miles walked on a certain date', () => {
    expect(activityProfile.findMilesWalked('2019/06/15')).to.equal(2.91);
  });

  it('should return the steps taken on a date', () => {
    expect(activityProfile.findActivity('2019/06/17', 'numSteps')).to.equal(14329);
  });

  it('should find the minutes active on a certain day', () => {
    expect(activityProfile.findActivity('2019/06/16', 'minutesActive')).to.equal(175);
  });

  it('should return the stairs climbed on a date', () => {
    expect(activityProfile.findActivity('2019/06/17', 'flightsOfStairs')).to.equal(18);
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

  it('should find all steps taken for a given week', () => {
    expect(activityProfile.findDataForWeek('2019/06/21', 'numSteps')).to.deep.equal([3577, 6637, 14329, 4419, 8429, 14478, 6760]);
  });

  it('should find all mins active taken for a given week', () => {
    expect(activityProfile.findDataForWeek('2019/06/21', 'minutesActive')).to.deep.equal([140, 175, 168, 165, 275, 140, 135]);
  });

  it('should find all stairs climbed for a given week', () => {
    expect(activityProfile.findDataForWeek('2019/06/21', 'flightsOfStairs')).to.deep.equal([16, 36, 18, 33, 2, 12, 6]);
  });

  it('should find avg steps taken for given week', () => {
    expect(activityProfile.findAvgForWeek('2019/06/21', 'numSteps')).to.equal(8376);
  });

  it('should find avg mins active for given week', () => {
    expect(activityProfile.findAvgForWeek('2019/06/21', 'minutesActive')).to.equal(171);
  });

  it('should find avg stairs climbed for given week', () => {
    expect(activityProfile.findAvgForWeek('2019/06/21', 'flightsOfStairs')).to.equal(18);
  });

  it('should determine if the step goal was met that day', () => {
    expect(activityProfile.findIfStepGoalMet('2019/06/21')).to.equal(false);
  });

  it('should find all the days the user exceeded their step goal', () => {
    expect(activityProfile.findDaysGoalExceeded()).to.deep.equal(['2019/06/17', '2019/06/20', '2019/06/22', '2019/08/24']);
  });

  it('should find their all time step record', () => {
    expect(activityProfile.findRecord('numSteps')).to.equal('14478 on 06/20');
  });

  it('should find their all time mins active record', () => {
    expect(activityProfile.findRecord('minutesActive')).to.equal('275 on 06/19');
  });

  it('should find their all time stair climbing record', () => {
    expect(activityProfile.findRecord('flightsOfStairs')).to.equal('36 on 06/16');
  });

  it('should return any trends where their steps increase for at least three days', () => {
    expect(activityProfile.findThreeDayTrends('numSteps')).to.deep.equal([['2019/06/15', '2019/06/18'],
      ['2019/06/18', '2019/06/21']]);
  });

  it('should return any trends where their stairs climbed increase for at least three days', () => {
    expect(activityProfile.findThreeDayTrends('flightsOfStairs')).to.deep.equal([['2019/06/21', '2019/08/24']]);
  });

  it('should return any trends where their mins active increase for at least three days', () => {
    expect(activityProfile.findThreeDayTrends('minutesActive')).to.deep.equal([]);
  });

  it('should return total steps taken for a week', () => {
    expect(activityProfile.showTotalForWeek('numSteps', '2019/06/17')).to.equal(24543);
  });

  it('should return total mins active for a week', () => {
    expect(activityProfile.showTotalForWeek('minutesActive', '2019/06/17')).to.equal(483);
  });

  it('should return total stairs climbed for a week', () => {
    expect(activityProfile.showTotalForWeek('flightsOfStairs', '2019/06/17')).to.equal(70);
  });

  it('should compare the users steps to all users steps that day', () => {
    expect(activityProfile.compareToAllUsers('2019/06/17', 'numSteps')).to.equal('1 / 5')
  });

  it('should compare the users flights of stairs to all users stairs that day', () => {
    expect(activityProfile.compareToAllUsers('2019/06/17', 'flightsOfStairs')).to.equal('3 / 5')
  });

  it('should compare the users mins active to all users mins active that day', () => {
    expect(activityProfile.compareToAllUsers('2019/06/17', 'minutesActive')).to.equal('1 / 5')
  });
})
