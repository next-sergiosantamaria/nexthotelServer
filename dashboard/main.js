var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://34.244.128.204:8080/users', true);

request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        console.log(data.data);
        chargeDatas(data.data);
      } else {
        console.log('error');
      }
  }

  request.send();

  function chargeDatas(usersData){
    $("#dataTable").append("<table id='tableBox' class='tableBox'>" +
                                "<tr class='headerRow'>" +
                                    "<th class='headerElement'>Tester Name</div>" +
                                    "<th class='headerElement'>User Name</div>" +
                                    "<th class='headerElement'>user birthDate</div>" +
                                    "<th class='headerElement'>User Gender</div>" +
                                    "<th class='headerElement'>Current date</div>" +
                                    "<th class='headerElement'>Experiment Duration</div>" +
                                    "<th class='headerElement'>Room</div>" +
                                    "<th class='headerElement'>experiment</div>" +
                                    "<th class='headerElement'>First view lamp led</div>" +
                                    "<th class='headerElement'>first lamp interaction</div>" +
                                    "<th class='headerElement'>First view TV Led</div>" +
                                    "<th class='headerElement'>Firt TV interaction</div>" +
                                    "<th class='headerElement'>first view courtain Led</div>" +
                                    "<th class='headerElement'>First courtain interaction</div>" +
                                "</tr>" +
                           "</table>");
    usersData.forEach(element => {
        $("#tableBox").append(
            "<tr class='dataRow'>" +
                "<th class='dataElement'>" + element.testerName + "</div>" +
                "<th class='dataElement'>" + element.userName + "</div>" +
                "<th class='dataElement'>" + element.userBirthDate + "</div>" +
                "<th class='dataElement'>" + element.userGender + "</div>" +
                "<th class='dataElement'>" + element.currentDate + "</div>" +
                "<th class='dataElement'>" + element.experimentDuration + "</div>" +
                "<th class='dataElement'>" + element.roomOfexperiment + "</div>" +
                "<th class='dataElement'>" + element.experiment + "</div>" +
                "<th class='dataElement'>" + element.lampLed + "</div>" +
                "<th class='dataElement'>" + element.lampInteraction + "</div>" +
                "<th class='dataElement'>" + element.tvLed + "</div>" +
                "<th class='dataElement'>" + element.tvInteraction + "</div>" +
                "<th class='dataElement'>" + element.courtinLed + "</div>" +
                "<th class='dataElement'>" + element.courtinInteraction + "</div>" +
            "</tr>"
            );
    });
  }
