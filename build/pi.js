self.addEventListener('message', function(e) {
  var precision = parseInt(e.data),
      pi = 4,
      top = 4,
      bot = 3,
      minus = true;
  for (var i = 0; i < precision; i++) {
    pi += (minus == true) ? -(top / bot) : (top / bot);
    minus = !minus;
    bot += 2;
  }
  self.postMessage(pi);
}, false)
