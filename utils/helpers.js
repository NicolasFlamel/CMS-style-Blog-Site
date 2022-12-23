module.exports = {
  formatDate: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  sameUser: (loggedInUser, secondUser) => {
    // compares two userID and returns true or false
    return loggedInUser === secondUser
  },
};
