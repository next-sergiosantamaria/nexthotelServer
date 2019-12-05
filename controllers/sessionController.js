const TIMEOUT = 30 * 1000;
const sessions = {};
let usersLength = 0;

function refresh(data) {
  data.timestamp = Date.now();
  sessions[`${data.userName};;${data.office}`] = data;
};

function expireSessions(io) {
  const keys = Object.keys(sessions);
  const now = Date.now();

  keys.forEach(key => {
    if (sessions[key].timestamp + TIMEOUT < now) {
      io.emit("logOutUser", sessions[key]);
      delete sessions[key];
    }
  });
  if (keys.length !== usersLength) {
    usersLength = keys.length;
    console.log('Connected users: ');
    console.log('\t' + Object.keys(sessions).join(' '));
  }
  setTimeout(() => expireSessions(io), 3000);
}

const list = () => Object.keys(sessions);

module.exports = {
  refresh, 
  expireSessions,
  list
}