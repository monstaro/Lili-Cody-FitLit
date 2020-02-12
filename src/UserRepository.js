class UserRepository {
  constructor(data) {
    this.data = data
  }

  getUserData(id) {
    return this.data.find(user => user.id === id)
  }

  findAvgStepGoal() {
    let average = this.data.reduce((acc, cur) => {
      acc += cur.dailyStepGoal
      return acc;
    }, 0)
    return (average / this.data.length)
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
