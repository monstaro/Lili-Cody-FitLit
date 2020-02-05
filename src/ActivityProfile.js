class ActivityProfile {
  constructor(userID) {
    
  }

  findMilesWalked(date) {
// user.strideLength (ft) * steps = totalFt
// totalFt / 5280 = number of miles (round to two decimal places)
  }

  findMinutesActive(date) {

  }

  findAvgMinActiveWeek(startDate) {

  }

  findIfStepGoalMet(date) {

  }

  findDaysGoalExceeded() {
// Filter entries by this.numSteps > user.stepGoal (get goal objects)
// Map goal objects to return a dates array
  }

  findStairRecord() {
// Use reduce and Math.max to find the highest stair count
// Use find to return the object of that activity
// Return the activity.date and highest stair count
  }

  findLastEntry() {
    return this.entries[this.entries.length - 1].numOunces;
  }

  
}

if (typeof module !== 'undefined') {
  module.exports = ActivityProfile;
}
