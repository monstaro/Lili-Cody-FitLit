const chai = require('chai');
const expect = chai.expect;

const sampleUsers = require ('../data/sample-users.js');
const sampleSleep = require ('../data/sample-sleep.js');
const UserRepository = require ('../src/UserRepository.js');
const SleepSummary = require ('../src/SleepSummary.js');

describe('SleepProfile', function() {

  beforeEach(() => {
    userRepo = new UserRepository(sampleUsers);
    sleepSum = new SleepSummary(sampleSleep);
  });

  it('should be a function', () => {
    expect(SleepSummary).to.be.a('function');
  });

  it('should store all sleep data', () => {
    expect(sleepSum.data).to.deep.equal(sampleSleep);
  });

  it('should be able to find the avg sleep hours for all users', () => {
    expect(sleepSum.findAvgSleep('hoursSlept')).to.equal(7.1);
  });

  it('should be able to find the avg sleep quality for all users', () => {
    expect(sleepSum.findAvgSleep('sleepQuality')).to.equal(3.4);
  });

  it('should be able to return an array of entries for a week given an end date', () => {
    expect(sleepSum.findDateRange('2019/06/17')).to.deep.equal(sampleSleep);
  });

  it('should be able to find the best quality sleepers for a week', () => {
    expect(sleepSum.findBestQualitySleepers('2019/06/17')).to.deep.equal([2, 3, 5]);
  });

  it('should be able to find the worst quality sleepers for a week', () => {
    expect(sleepSum.findWorstQualitySleepers('2019/06/17')).to.deep.equal([1, 4]);
  });

  it('should be able to find the longest sleepr(s) for a given date', () => {
    expect(sleepSum.findLongestSleeper('2019/06/17')).to.deep.equal([  {
        "userID": 5,
        "date": "2019/06/17",
        "hoursSlept": 10.5,
        "sleepQuality": 3.7
      }]);
  });
});
