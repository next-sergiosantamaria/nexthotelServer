userList = [];

fetch('/user/list').then(response => 
  response.json().then(data => {
    userList = data;
  })
);

function checkIfUserExists(input) {
  const user = input.value;

  if (userList.find(item => item.name === user)) {
    configAvatar.setAttribute('disabled', 'true');
  } else {
    configAvatar.setAttribute('disabled', '');
  }
}