class ActivitySummary {
  constructor(data) {
    this.data = data;
  }

  findMonthlyAvgs(month) {
    const filteredMonthEntries = this.data.filter(entry => {
      return entry.date.slice(5, 7) === month;
    });
    const avg = (metric) => {
      const average = filteredMonthEntries.reduce((acc, entry) => {
        acc += entry[metric];
        return acc;
      }, 0) / filteredMonthEntries.length
      return Math.round(average);
    };
    const monthAvgs = {
      month,
      avgSteps: avg('numSteps'),
      avgMins: avg('minutesActive'),
      avgStairs: avg('flightsOfStairs')
    };
    return monthAvgs;
  }

  findAllMonths() {
    const allMonths = [];
    this.data.forEach(entry => {
      const month = entry.date.slice(5, 7);
      if (allMonths.indexOf(month) === -1) {
        allMonths.push(month);
      }
    });
    return allMonths;
  }

  findBestStepsMonth() {
    const allMonths = this.findAllMonths();
    const monthAvgs = allMonths.map(month => {
      return this.findMonthlyAvgs(month);
    });
    const bestSteps = monthAvgs.reduce((acc, avg) => {
      return Math.max(acc, avg.avgSteps);
    }, 0);
    const bestMonth = monthAvgs.find(avg => {
      return avg.avgSteps === bestSteps;
    });
    return bestMonth.month;
  }

  findWorstStepsMonth() {
    const allMonths = this.findAllMonths();
    const monthAvgs = allMonths.map(month => {
      return this.findMonthlyAvgs(month);
    });
    const worstSteps = monthAvgs.reduce((acc, avg) => {
      return Math.min(acc, avg.avgSteps);
    }, 100000);
    const worstMonth = monthAvgs.find(avg => {
      return avg.avgSteps === worstSteps;
    });
    return worstMonth.month;
  }

  findAllUsersAvg(date, activity) {
    let dates = this.data.filter(a => a.date === date)
    return Math.round(dates.reduce((acc, cur) => {
      acc += cur[activity];
      return acc;
    }, 0) / dates.length);
  }
}


if (typeof module !== 'undefined') {
  module.exports = ActivitySummary;
}
