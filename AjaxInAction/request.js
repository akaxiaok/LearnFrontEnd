(function () {
  var console = document.getElementsByClassName && window.console || {};

  function log() {
    var win = document.getElementById('console');
    if (!win) {
      win = document.createElement('div');
      var closeBtn = document.createElement('button');
      closeBtn.value = 'close';
      closeBtn.onclick = function () {
        win.style.display = 'none';
      }
      win.appendChild(closeBtn);
      win.style.position = 'absolute';
      win.style.right = '0';
      win.style.width = '300px';
      win.style.height = '600px';
      win.style.overflow = 'scroll';
      win.style.background = '#ccc';
      win.id = 'console';
      document.body.appendChild(win);
    }
    var str = '';
    for (var i = 0; i < arguments.length; i++) {
      str += arguments[i].toString() + ',';
    }
    var br = document.createElement('br');
    var text = document.createTextNode(str); //xss here
    win.appendChild(br);
    win.appendChild(text);
    win.display = 'block';
  }

  console.log = console.log || log;
  var request = {};
  var STATE = {
    UNINITIALIZED: 0,
    LOADING: 1,
    LOADED: 2,
    INTERACTIVE: 3,
    COMPLETE: 4
  };

  function sendRequest(url, params, method) {
    if (!method) {
      method = 'GET';
    }
    request = initRequest();
    if (request) {
      request.onreadystatechange = handleStateChange;
      request.open(method, url, true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send(params);
    }
  }

  function initRequest() {
    var req = null;
    // IE 11 模拟 IE 5、7时，XMLHttpRequest 存在
    if (window.XMLHttpRequest && document.getElementsByClassName) {
      return new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
      try {
        req = new ActiveXObject('Msxml2.XMLHTTP');
      }
      catch (otherMS) {
        try {
          req = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (error) {
          return null;
        }
      }
    }
    return req;
  }

  function handleStateChange() {
    if (request.readyState === STATE.COMPLETE) {
      console.log(request.responseText);
    } else {
      console.log('loading...', request.readyState);
    }
  }

  window.onload = function () {
    var reqButton = document.getElementById('request');
    reqButton.onclick = function () {
      sendRequest('https://api.github.com/users/akaxiaok');
    }
  };
})();
