class ActivityProfile {
  constructor(user, data) {
    this.user = user;
    this.data = data;
    this.entries = data.filter(user => user.userID === this.user.id);
    this.friends = user.friends;
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

  findFlightsClimbed(date) {
    return this.entries.find(entry => entry.date === date).flightsOfStairs
  }

  findDateRange(endDate) {
    const lastDate = new Date(endDate);
    const subtractWeek = () => {
      return new Date(lastDate.getTime() - (7 * 24 * 60 * 60 * 1000))
    }
    const firstDate = subtractWeek();
    const datesInRange = this.entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return firstDate < entryDate && entryDate <= lastDate;
    });
    return datesInRange;
  }

  findAvgMinActiveWeek(endDate) {
    const datesInRange = this.findDateRange(endDate);
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

  findThreeDayTrends(activity) {
    let start = 0;
    const trends = [];

    for (let current = 1; current < this.entries.length; current++) {
      const prevEntry = this.entries[current - 1];
      const currEntry = this.entries[current];

      if (currEntry[activity] < prevEntry[activity] && current - start >= 3) {
        trends.push([this.entries[start].date, currEntry.date]);
        start = current;
      } else if (currEntry[activity] < prevEntry[activity] && current - start < 3) {
        start = current;
      }
    }
    return trends;
  }

  showTotalStepsForWeek(endDate) {
    const datesInRange = this.findDateRange(endDate);
    const totalSteps = datesInRange.reduce((acc, entry) => {
      acc += entry.numSteps;
      return acc;
    }, 0);
    return totalSteps;
  }
  compareStepsToAllUsers(date) {
    let allUserSteps = this.data.filter(entry => {
      return entry.date === date
    }).reduce((acc, cur) => {
        acc.push(cur.numSteps)
      return acc
    }, []).sort((a, b) => b - a)
    let userStepIndex = allUserSteps.indexOf(this.findSteps(date))
    let totalUsers = allUserSteps.length

    return `Out of ${totalUsers} users, you had step count number ${userStepIndex + 1}!`
  }
  compareMinsActiveToAllUsers(date) {
    let allUserMins = this.data.filter(entry => {
      return entry.date === date
    }).reduce((acc, cur) => {
        acc.push(cur.minutesActive)
      return acc
    }, []).sort((a, b) => b - a)
    let userActivityIndex = allUserMins.indexOf(this.findMinutesActive(date))
    let totalUsers = allUserMins.length
    return `You placed ${userActivityIndex + 1} out of ${totalUsers} for minutes active today and `
  }
  compareFlightsClimbedToAllUsers(date) {
    let allFlightsClimbed = this.data.filter(entry => {
      return entry.date === date
    }).reduce((acc, cur) => {
        acc.push(cur.flightsOfStairs)
      return acc
    }, []).sort((a, b) => b - a)
    let userFlightIndex = allFlightsClimbed.indexOf(this.findFlightsClimbed(date))
    let totalUsers = allFlightsClimbed.length
    return `${userFlightIndex + 1} out of ${totalUsers} for flights climbed!`
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityProfile;
}
