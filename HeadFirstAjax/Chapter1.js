(function () {
  var baseURL = 'https://api.github.com';
  var GET = "GET";
  var POST = "POST";

  function createRequest() {
    var request = {};
    if (XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    if (ActiveXObject) {
      try {
        request = new ActiveXObject('Msxml2.XMLHTTP');
      }
      catch (otherMS) {
        try {
          request = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (error) {
          return null;
        }
      }
    }
    return null;
  }

  function getDetail(name) {
    var request = createRequest();

    function displayDetails() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var detailDiv = document.createElement('div');
          detailDiv.innerHTML = request.responseText;
          document.body.appendChild(detailDiv);
        }
      }
    }

    if (!request) {
      alert('can not use ajax');
      return;
    }
    var url = baseURL + '/users/' + encodeURI(name);
    request.open(GET, url, true);
    request.onreadystatechange = displayDetails;
    request.send();
  }

  var button = document.getElementById('request');
  button.onclick = getDetail.bind(null, 'akaxiaok');
})();

