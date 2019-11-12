const TIMEOUT = 30 * 1000;
const sessions = {};

function refresh(data) {
  data.timestamp = Date.now();
  sessions[`${data.userName}-${data.office}`] = data;
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
  console.log('Connected users: ');
  console.log('\t' + Object.keys(sessions).join(' '));
  setTimeout(() => expireSessions(io), 3000);
}

module.exports = {
  refresh, 
  expireSessions
}