class ActivityProfile {
  constructor(user, data) {
    this.user = user
    this.entries = data.filter(user => user.userID === this.user.id)
  }

  findMilesWalked(date) {
    let walkDay = this.entries.find(entry => entry.date === date);
    let totalFt = this.user.strideLength * walkDay.numSteps;
    let numMiles = totalFt / 5280;
    return Math.round((numMiles + Number.EPSILON) * 100) / 100
  }

  findMinutesActive(date) {
   return this.entries.find(entry => entry.date === date).minutesActive
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
