class ActivitySummary {
  constructor(data) {
    this.data = data;
  }
  findMonthlyAvgs(month) {
    // We added this method.
    // Use reduce to find avgs of each
    // Return object with avgs of steps, minutes, and stairs
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