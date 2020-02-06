class ActivitySummary {
  constructor(data) {
    this.data = data;
  }

    findMonthlyAvgs(month) {
      const monthEntries = this.data.map(entry => {
        entry.date = entry.date.slice(5, 7);
        return entry;
      });
      const filteredMonthEntries = monthEntries.filter(entry => {
        return entry.date = month;
      });
      const avg = (metric) => {
        const average = filteredMonthEntries.reduce((acc, entry) => {
          acc += entry[metric];
          return acc;
        }, 0) / filteredMonthEntries.length
        return Math.round(average);
      };
      const monthAvgs = filteredMonthEntries.reduce((acc, entry) => {
        acc.avgSteps = avg('numSteps');
        acc.avgMins = avg('minutesActive');
        acc.avgStairs = avg('flightsOfStairs');
        return acc;
      }, {});
      return monthAvgs;
      }

      showStepTrends() {
    // Filter entry[i - 1].steps  < entry[i].steps < entry[i + 1].steps returns true
    // Filter for those entries
    // From [i - 1] to [i + 1], you increased steps every day!
      }

      findBestStepsMonth() {
    // We added this method.
    // Find monthly averages for June - Sept (since that’s the only data we have)
    // Find Math.max of those
    // Return that month
      }

      findWorstStepsMonth() {
    // We added this method.
    // Same as above but with Math.min
      }
}


if (typeof module !== 'undefined') {
  module.exports = ActivitySummary;
}
