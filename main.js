const userData = require('./data/users.js');
const User = require ('./src/User.js');
const UserRepository = require ('./src/UserRepository.js');

loadUser();

const loadUser = () => {
  let random = Math.floor(Math.random()*(50));
  const userRepo = new UserRepository(userData);
  const user = new User(random);
}
