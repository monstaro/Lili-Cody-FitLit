class User {
  constructor(userData) {
    this.id = userData.id
    this.name = userData.name
    this.address = userData.address
    this.email = userData.email
    this.strideLength = userData.strideLength
    this.dailyStepGoal = userData.dailyStepGoal
    this.friends = userData.friends
  }

  returnFirstName() {

  }

  compareStepsWithFriend(friendID, startDate) {
// Find total steps for user and for friend
// Return a message that says “___ had __ more steps this week!”
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
