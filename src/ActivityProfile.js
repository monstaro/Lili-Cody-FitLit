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
  findActivity(date, activity) {
    return this.entries.find(entry => entry.date === date)[activity]
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

  findDataForWeek(activity, endDate) {
    const datesInRange = this.findDateRange(endDate);
    return datesInRange.map(entry => entry[activity]);
  }

  findAvgMinActiveWeek(endDate) {
    const datesInRange = this.findDateRange(endDate);
    return Math.round(datesInRange.reduce((acc, day) => {
      acc += day.minutesActive
      return acc
    }, 0) / datesInRange.length)
  }

  findIfStepGoalMet(date) {
    return this.findActivity(date, 'numSteps') >= this.user.dailyStepGoal ? true : false
  }

  findDaysGoalExceeded() {
    return this.entries.filter(entry => entry.numSteps > this.user.dailyStepGoal).map(goodDay => goodDay.date)
  }

  findRecord(activity) {
    let activityRecord = this.entries.sort((a, b) => b[activity] - a[activity])
    return `${activityRecord[0][activity]} on ${activityRecord[0].date.slice(5)}`
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

  showTotalForWeek(activity, endDate) {
    const datesInRange = this.findDateRange(endDate);
    const total = datesInRange.reduce((acc, entry) => {
      acc += entry[activity];
      return acc;
    }, 0);
    return total;
  }
  compareToAllUsers(date, activity) {
    let allUserData = this.data.filter(entry => {
      return entry.date === date
    }).reduce((acc, cur) => {
      acc.push(cur[activity])
      return acc
    }, []).sort((a, b) => b - a)
    let userDataIndex = allUserData.indexOf(this.findActivity(date, activity))
    let totalUsers = allUserData.length
    return `${userDataIndex + 1} / ${totalUsers}`
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityProfile;
}
