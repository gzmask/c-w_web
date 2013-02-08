var http = require('http'),
    nodemailer = require("nodemailer"),
    ss = require('socketstream');

// Define a single-page client called 'main'
ss.client.define('main', {
  view: 'index.html',
  css:  ['libs/jquery.lightbox-0.5.css', 'libs/bootstrap.min.css', 'libs/bootstrap-responsive.min.css', 'libs/style.css'],
  code: ['libs/jquery.min.js', 'app', 'libs/jquery.lightbox-0.5.min.js', 'libs/jquery.localscroll-1.2.7.js', 'libs/jquery.scrollTo-1.4.3.1.js', 'libs/bootstrap.min.js'],
  tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
  res.serveClient('main');
});

// Code Formatters
//ss.client.formatters.add(require('ss-stylus'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
//ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
var server = http.Server(ss.http.middleware);
server.listen(3000);

// Start SocketStream
ss.start(server);
