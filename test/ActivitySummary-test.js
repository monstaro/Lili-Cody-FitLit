const chai = require('chai');
const expect = chai.expect;

const sampleUsers = require ('../data/sample-users.js');
const sampleActivity = require ('../data/sample-activity.js');
const UserRepository = require ('../src/UserRepository.js');
const ActivitySummary = require ('../src/ActivitySummary.js');

describe('ActivitySummary', function() {
  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers);
    activitySum = new ActivitySummary(sampleActivity);
  });

  it('should be a function', () => {
    expect(ActivitySummary).to.be.a('function');
  });

  it('should store all sleep data', () => {
    expect(activitySum.data).to.deep.equal(sampleActivity);
  });

  it('should be able to return an object of all sleep averages for a month', () => {
    expect(activitySum.findMonthlyAvgs('06')).to.deep.equal({
      month: '06',
      avgSteps: 7980,
      avgMins: 160,
      avgStairs: 22
    });
  });

  it('should be able to return an array of all of the months it has data for', () => {
    expect(activitySum.findAllMonths()).to.deep.equal([ '06', '08' ])
  });

  it ('should be able to find the best steps month', () =>  {
    expect(activitySum.findBestStepsMonth()).to.equal('08');
  });

  it ('should be able to find the worst steps month', () =>  {
    expect(activitySum.findWorstStepsMonth()).to.equal('06');
  });

  it('should return the avg stairs climbed of all users on a specific date', () => {
    expect(activitySum.findAllUsersAvg('2019/06/17', 'flightsOfStairs')).to.equal(15)
  });

  it('should return the avg steps of all users on a specific date', () => {
    expect(activitySum.findAllUsersAvg('2019/06/17', 'numSteps')).to.equal(10781)
  });

  it('should return the avg mins active of all users on a specific date', () => {
    expect(activitySum.findAllUsersAvg('2019/06/17', 'minutesActive')).to.equal(111)
  });
});
