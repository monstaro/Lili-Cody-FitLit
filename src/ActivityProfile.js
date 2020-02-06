class ActivityProfile {
  constructor(user, data) {
    this.user = user
    this.data = data;
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
    return Math.round(datesInRange.reduce((acc, day) => {
      acc += day.minutesActive
      return acc
    }, 0) / datesInRange.length)
  }

  findIfStepGoalMet(date) {
    return this.findSteps(date) >= this.user.dailyStepGoal ? true : false
  }

  findDaysGoalExceeded() {
    return this.entries.filter(entry => entry.numSteps > this.user.dailyStepGoal).map(goodDay => goodDay.date)
  }

  findStairRecord() {


    let stairRecord = this.entries.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)
    return stairRecord[0]

      //we can use this to return both the date and stair count on the DOM
  }
  findAllUsersStairClimbAvg(date) {
    
    let dates = this.data.filter(a => a.date === date)
    return Math.round(dates.reduce((acc, cur) => {
        acc += cur.flightsOfStairs
      return acc
    }, 0) / dates.length);
    // let newEntries = 
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityProfile;
}
