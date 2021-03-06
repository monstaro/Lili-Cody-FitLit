class SleepSummary {
  constructor(data) {
    this.data = data;
  }

  findAvgSleep(activity) {
    const total = this.data.reduce((acc, entry) => {
      acc += entry[activity];
      return acc;
    }, 0);
    const avg = total / this.data.length;
    return Math.round(avg * 10) / 10;
  }

  findDateRange(endDate) {
    const lastDate = new Date(endDate);
    const subtractWeek = () => {
      return new Date(lastDate.getTime() - (7 * 24 * 60 * 60 * 1000))
    }
    const firstDate = subtractWeek();
    const datesInRange = this.data.filter(entry => {
      const entryDate = new Date(entry.date);
      return firstDate < entryDate && entryDate <= lastDate;
    });
    return datesInRange;
  }

  findAllSleepAvgs(endDate) {
    const datesInRange = this.findDateRange(endDate);
    const condensed = {};
    datesInRange.forEach(entry => {
      if (!condensed[entry.userID]) {
        condensed[entry.userID] = [entry.sleepQuality];
      } else {
        condensed[entry.userID].push(entry.sleepQuality);
      }
    });
    const condensedKeys = Object.keys(condensed);
    condensedKeys.forEach(key => {
      const total = condensed[key].reduce((acc, val) => {
        acc += val;
        return acc;
      }, 0);
      const avg = total / condensed[key].length
      condensed[key] = Math.round(avg * 10) / 10;
    })
    return condensed;
  }

  findBestQualitySleepers(endDate) {
    const condensed = this.findAllSleepAvgs(endDate);
    const condensedKeys = Object.keys(condensed);
    const bestSleepers = condensedKeys.filter(key => {
      return condensed[key] > 3;
    })
    const bestSleeperIds = bestSleepers.map(sleeper => parseInt(sleeper));
    return bestSleeperIds;
  }

  findWorstQualitySleepers(endDate) {
    const condensed = this.findAllSleepAvgs(endDate);
    const condensedKeys = Object.keys(condensed);
    const worstSleepers = condensedKeys.filter(key => {
      return condensed[key] < 3;
    })
    const worstSleeperIds = worstSleepers.map(sleeper => parseInt(sleeper));
    return worstSleeperIds;
  }

  findLongestSleeper(date) {
    const dateEntries = this.data.filter(entry => entry.date === date);
    const longestTime = dateEntries.reduce((acc, entry) => {
      return Math.max(acc, entry.hoursSlept)
    }, 0)
    return dateEntries.filter(entry => entry.hoursSlept === longestTime);
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepSummary;
}
