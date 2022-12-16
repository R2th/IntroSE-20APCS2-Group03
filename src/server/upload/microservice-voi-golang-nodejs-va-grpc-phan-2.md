Tiếp tục [phần 1](https://viblo.asia/p/microservice-voi-golang-nodejs-va-grpc-phan-1-jvElamq6lkw), phần này mình sẽ tạo một con `node server` để connect đến `core server` và cũng chỉ để hiển thị `hello world`
### Node Server
- Cũng tương tự như phần trước, phần này mình sẽ tạo một folder proto nhưng bên trong nó phức tạp hơn chút vì phải compile proto sang js.
- Tạo một file `package.json` ngang cấp với `helloworld.proto`

package.json
```
{
  "name": "node-server-proto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "proto-gen": "export PROTO_DEST=./ && protoc -I ./ --plugin=\"protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin\" --js_out=\"import_style=commonjs,binary:${PROTO_DEST}\" --grpc_out=${PROTO_DEST} ./*.proto"
// ở đây có cả option cho typescript, nếu bạn cần thì để lại comment nhé
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "grpc-tools": "^1.10.0"
  }
node golang gRPC Happy New Year

Tiếp tục [phần 1](https://viblo.asia/p/microservice-voi-golang-nodejs-va-grpc-phan-1-jvElamq6lkw), phần này mình sẽ tạo một con `node server` để connect đến `core server` và cũng chỉ để hiển thị `hello world`

### Node Server

- Cũng tương tự như phần trước, phần này mình sẽ tạo một folder proto nhưng bên trong nó phức tạp hơn chút vì phải compile proto sang js.

- Tạo một file `package.json` ngang cấp với `helloworld.proto`

​

package.json
}
```
để đơn giản hơn cho việc generate file complie, mình dã viết sẵn đoạn script và bạn chỉ cần chạy `npm run proto-gen` (sau khi npm install) là ok, và cấu trúc thư mục nó sẽ thế này
![](https://images.viblo.asia/57914a0b-c1c5-481e-8945-4174817eca6e.png)

Sau khi thực hiện xong proto, thì mình sẽ tạo file `app.js` để thực hiện hóa việc connect tới `core server` và vẫn tạo thêm `package.json` trông nó như thế này
```
{
  "name": "node-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app.js" // đoạn này viết cho nó phức tạp thôi, chứ bạn chạy luôn node app.js cho nhanh nhé =))
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "grpc": "^1.24.4",
    "minimist": "^1.2.0",
    "google-protobuf": "^3.0.0"
  },
  "dependencies": {}
}
```
và file app.js
```
var messages = require('./proto/helloworld_pb');
var services = require('./proto/helloworld_grpc_pb');

var grpc = require('grpc');
var parseArgs = require('minimist');

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50053';
  }
  var client = new services.GreeterClient(target,
                                          grpc.credentials.createInsecure());
  var request = new messages.HelloRequest();
  var user;
  if (argv._.length > 0) {
    user = argv._[0]; 
  } else {
    user = 'world';
  }
  request.setName(user);
  client.sayHello(request, function(err, response) {
    console.log('Greeting:', response.getMessage());
  });
}

main();
```
Đọc code thì cũng rất dễ hiểu phải không =))
![](https://images.viblo.asia/eb6894d2-a1b3-402d-a2e0-6f044c0172ae.png)
(dòng kết qủa trên là test với `go-server` nhé)

Và đây là kết qủa sau khi chạy lệnh `node app.js`
![](https://images.viblo.asia/920a9be6-5d42-4d6c-b48e-5b73b0d9a8a9.png)

Và đây là toàn bộ cấu trúc thư mục của mình
![](https://images.viblo.asia/40164db3-a5fb-45da-82a9-4025d6765ee1.png)
Nếu phát triển theo hướng microservice, thì theo mình bạn nên tạo mỗi server là một github phát triển riêng (chí ít là chia theo module) để cố gắng không ảnh hưởng nhất có thể đến những thứ đã được thực hiện, và việc một line github giành riêng cho việc phát triển riêng cho proto.
### Kết thúc
- Vậy là mình đã trình bày xong việc sử dụng microservice với `golang-golang`, `golang-nodejs` (giao tiếp giua các server) 
- Và đây là [source code](https://github.com/sontt-1215/microservice) của hai phần mình đã viết