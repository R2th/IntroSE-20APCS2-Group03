#### Khởi tạo Node Js ####
Một dự án chạy bằng Node là có Express js. Qua bài https://expressjs.com/en/starter/generator.html thì chúng ta có thể tự động sinh ra cấu trúc dự án giống như trong cấu trúc sau:
```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

Sau đó để chạy được dự án thì dựa vào file **package.json** thì để chạy cần dùng lệnh `npm run start`

#### Tích hợp socket io ####
Để cài đặt thì cần thêm thư viện Socket Io thì dùng lệnh trực tiếp là `npm install socket.io` tiếp đến để viết riêng 1 phần xử lý riêng phần socket ở trong file **bin/www** như sau
```
const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:8000',
    methods: ["GET", "POST"]
  }
});
app.set('socketIO', io);
require('../app/controllers/socket')(io);
```

Khi khai báo như thế này thì sẽ là tạo ra port 3001 để dành cho socket và chỉ nhận request từ đường link http://localhost:8000
Và để có thể config được thông tin này thì có thể dùng env thông qua thư viện dotenv. Như vậy file www sẽ như sau:
```
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('chatnodejs:server');
var http = require('http');
require('dotenv').config();

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
var socketPort = normalizePort(process.env.SOCKETPORT || '3001');
var webUrl = process.env.WEBURL || 'http://localhost:8000';
app.set('port', port);
app.set('socketPort', socketPort);
app.set('webUrl', webUrl);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Socket IO
 */
const io = require('socket.io')(socketPort, {
  cors: {
    origin: webUrl,
    methods: ["GET", "POST"]
  }
});
app.set('socketIO', io);
require('../app/controllers/socket')(io);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

Còn về file xử lý socket riêng viết như sau:
```
module.exports = function(io) {
  io.on('connection', socket => {
    socket.on('disconnect', async function() {
  });
}  
```

#### Xử lý bên client ####
Đầu tiên cần sử dụng socketio bên client thì có phần html để lấy list danh sách với input gửi message
```
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
```

Tiếp đến khi load thư viện js socket như sau:
```
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
```

Tiếp đến bắt sự kiện khi submit form gửi message lúc đấy sẽ gửi lên socket theo sự kiện `send_message`
```
<script>
  var socket = io();

  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('send_message', input.value);
      input.value = '';
    }
  });
</script>
```

Sau khi gửi message cần có sự kiện lấy danh sách message
```
socket.on('show_message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
```
Như vậy toàn bộ file index.html như sau
```
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
      #input:focus { outline: none; }
      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages > li { padding: 0.5rem 1rem; }
      #messages > li:nth-child(odd) { background: #efefef; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    var socket = io();

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
  </body>
</html>
```