class ActivityProfile {
  constructor(user, data) {
    this.user = user
    this.entries = data.filter(user => user.userID === this.user.id)
  }
  findLastEntry() {
    return this.entries[this.entries.length - 1].date
  }
  findMilesWalked(date) {
    let walkDay = this.entries.find(entry => entry.date === date);
    let totalFt = this.user.strideLength * walkDay.numSteps;
    let numMiles = totalFt / 5280;
    return Math.round((numMiles + Number.EPSILON) * 100) / 100
  }
  findSteps(date) {
    return this.entries.find(entry => entry.date === date).numSteps
  }

  findMinutesActive(date) {
    return this.entries.find(entry => entry.date === date).minutesActive
  }

  findAvgMinActiveWeek(endDate) {
    
    const lastDate = new Date(endDate);
    
    const subtractWeek = () => {
      return new Date(lastDate.getTime() - (7 * 24 * 60 * 60 * 1000))
    }
    const firstDate = subtractWeek();
    const datesInRange = this.entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return firstDate < entryDate && entryDate <= lastDate;
    });
    return datesInRange.reduce((acc, day) => {
      acc += day.minutesActive
      return acc
    }, 0) / datesInRange.length
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
}

if (typeof module !== 'undefined') {
  module.exports = ActivityProfile;
}
