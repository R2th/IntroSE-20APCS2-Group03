# 0. Giới thiệu
- Feathers là 1 mã nguồn mở phục vụ việc tạo REST và realtime API đối với các ứng dụng JS hiện đại
- Feathers hỗ trợ cả ở client và server, khá tiện dụng cho các ứng dụng JS
- Feather không phải là 1 framework, nó chỉ là công cụ hỗ trợ (giống như npm hay yarn) xây dựng kiến trúc code. Về cốt lõi, Feathers là một tập hợp các công cụ và một mẫu kiến trúc code giúp dễ dàng tạo các API REST, có thể mở rộng và các ứng dụng thời gian thực. Với Feathers, bạn có thể xây dựng các code service mẫu trong vài phút và các ứng dụng sẵn sàng được làm ra trong vài ngày
- Feather hỗ trợ các ứng dụng làm việc với API. Các ứng dụng web JS không sử dụng API có lẽ không nên sử dụng Feathers
# 1. Cài đặt
Feathers và đa số package làm việc với NodeJS v6.0.0 trở lên, bạn cần cài NodeJS version lớn hơn `6.0.0` để sử dụng
```
$ node --version
v8.5.0
```
```
$ npm --version
5.5.1
```
# 2. Các khái niệm cơ bản trong Feathers

Chúng ta xét ví dụ khi tạo một ứng dụng chat với Feathers Js và React sử dụng mongoose. Để làm việc này nếu bạn không dùng Feathers bạn hoàn toàn có thể làm được. Bạn cài đặt các package và cấu hình chúng
* express
* mongoose
* socket-io
* jwt
* ...
và các package khác hỗ trợ khác .... và bên client bạn cần cài socket.io-client. 

Nếu sử dụng Feathers, nó đã cài đặt và cấu hình đầy đủ các package đó và bạn chỉ cần gọi nó để sinh code, cài đặt nó với 1 lệnh duy nhất =))
```
$ feathers generate app
```
## 2.1. Tạo ứng dụng

Bạn nên cài Feathers ở chế độ dòng lệnh để sử dụng các lệnh hỗ trợ 1 cách dễ dàng
```
npm install @feathersjs/cli -g
```
Tạo thư mục ứng dụng
```
mkdir feathers-basics
cd feathers-basics
```
Sau đó nó sẽ hiển thị các công nghệ bạn cần trong ứng dụng của mình, bạn chỉ việc tích chọn trên giao diện, khá đơn giản
```
$ feathers generate app
```
![](https://images.viblo.asia/9853ddb6-1ab0-48c9-9b2c-eb01610652b5.png)
## 2.2. Service
Service là trái tim của mọi ứng dụng Feathers và các đối tượng hoặc thực thể của các class để thực hiện các phương thức nhất định. Các service độc lập với nhau và có thể tương tác với các loại dữ liệu như:
- Đọc và ghi dữ liệu vào database
- Tích hợp vào các file system
- Gọi các API khác
- Gọi các dịch vụ khác như: Gửi email, xử lý thông tin thanh toán, trả về thông tin thời thiết ... =)) 

Hiểu đơn giản, service có chức năng chính là nơi cung cấp các REST API cho ứng dụng, bạn hoàn toàn có thể custom để thêm các dịch vụ khác đã kể ở trên.

Các phương thức CRUD mà 1 đối tượng service có thể thực thi.

* find - Lấy tất cả dữ liệu (có thể thêm các query để lọc dữ liệu)
* get - Lấy 1 thực thể dữ liệu dựa vào điều kiện duy nhất của nó
* create - Tạo 1 bản ghi mới
* update - Cập nhật 1 bản ghi dữ liệu đã tồn tại bằng cách thay thế hoàn toàn nó
* patch - Cập nhật một hoặc nhiều bản ghi dữ liệu bằng cách hợp nhất với dữ liệu mới
* remove - Xóa một hoặc nhiều bản ghi dữ liệu đã tồn tại

Tạo service

Để tạo service, bạn chỉ cần sử dụng 1 lệnh duy nhất và chọn tên cũng như DB sử dụng trong service
```
feathers generate service
```
![](https://images.viblo.asia/8d75b33b-81d0-4846-b925-ab5251c1ab19.png)
Sử dụng service:
```js
await app.service('messages').create({
  text: 'First message'
});
```
## 2.2. Hook
Hook là 1 middleware có thể thêm các xử lý trước khi hoặc sau khi thực hiện các thao tác, các phương thức của service. Nó có thể là thêm các thông tin vào model trước khi thực hiện hành động tiếp theo, xử lý lại dữ liệu trước khi trả về API, bắn ra các sự kiện ...
Chi tiết bạn có thể tham khảo [đây](https://docs.feathersjs.com/guides/basics/hooks.html)

Tạo hook: Để tạo 1 hook, bạn cũng chỉ cần thao tác 1 dòng lệnh và lựa chọn cách thức sử dụng dễ dàng như với service
```
feathers generate hook
```
![](https://images.viblo.asia/40d0b8c0-8379-42a9-96a1-c39778dd41fa.png)
## 2.3. Realtime API

Mặc định Feathers services sẽ tự động sinh các sự kiện `created, updated, patched và removed` khi thực hiện các phương thức `create, update, patch hoặc remove`. Real-time có nghĩa là những sự kiện này cần được truyền tới các client đang kết nối và chúng có thể phản ứng lại phù hợp (như là cập nhật lại giao diện).

Để cho phép giao tiếp thời gian thực với client, bạn cần một phương tiện vận chuyển dữ liệu hỗ trợ giao tiếp hai chiều. Kỹ thuật này trong Feathers là Socket.io và Primus và cả 2 đều sử dụng websocket để nhận sự kiện real-time và cũng như gọi các phương thức từ service

### 2.3.2. Sử dụng transpot
Cài đặt
```js
npm install @feathersjs/socketio --save
```
Cấu hình trong Feathers
```js
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

// This creates an app that is both, an Express and Feathers app
const app = express(feathers());

// Turn on JSON body parsing for REST services
app.use(express.json())
// Turn on URL-encoded body parsing for REST services
app.use(express.urlencoded({ extended: true }));
// Set up REST transport using Express
app.configure(express.rest());
// Configure the Socket.io transport
app.configure(socketio());
// Set up an error handler that gives us nicer errors
app.use(express.errorHandler());


// Start the server on port 3030
app.listen(3030);
```

### 2.3.3. Channel
Kênh để xác định sự kiện real-time sẽ được gửi tới những client nào. Feathers có hỗ trợ 1 số kênh mặc định
Bạn cần đăng kí kênh để ứng dụng biết gửi các sự kiện này đến đâu
```js
// On any real-time connection, add it to the `everybody` channel
app.on('connection', connection => app.channel('everybody').join(connection));

// Publish all events to the `everybody` channel
app.publish(() => app.channel('everybody'));
```
### 2.3.4. Lắng nghe sự kiện phía client
Khi server đã publish sự kiện đến client, công việc tiếp theo của client là bắt sự kiện này để xử lý phản ứng lại sự kiện cho phù hợp (thường là thay đổi giao diện). Có 2 cách để client đón nhận sự kiện này

* Cách 1: Sử dụng socket.io-client

Tuy nhiên hãy chú ý sự kiện bạn lắng nghe và bắt phải bắt đầu với tên service, nó có dạng như `messages created`
```js
/* global io */

// Create a websocket connecting to our Feathers server
const socket = io('http://localhost:3030');

// Listen to new messages being created
socket.on('messages created', message =>
  console.log('Someone created a message', message)
);
```
Nếu bạn custom lại 1 sự kiện, bạn càng phải nhớ tên đúng của sự kiện để tránh bắt nhầm (mình sẽ ví dụ ở phần sau)
* Cách 2: Sử dụng feathers-client
Tạo file chung feather.js để sử dụng chung cho ứng dụng
```js
import io from "socket.io-client";
import feathers from "@feathersjs/client";
// Socket.io is exposed as the `io` global.
const socket = io("http://localhost:3030");
// @feathersjs/client is exposed as the `feathers` global.
const client = feathers()
  .configure(feathers.socketio(socket))
  //incase we later have to do authentication
  .configure(
    feathers.authentication({
      storage: window.localStorage
    })
  );
export default client;
```
Lúc này chúng ta sẽ dễ dàng lắng nghe sự kiện từ server
```js
...
import client from "./../../feathers.js";
....
// Method 2: Get firstEvent from messages service
client.service("messages").on("firstEvent", data => {
  console.log("First event", data);
});

client.service("messages").on("created", data => {
  console.log("Got myevent", data);
  this.props.dispatch({ type: "GET_NEW_MSG_SAGA", data });
});
```
### 2.3.5. Custom lại 1 event
Để tạo 1 sự kiện không nằm trong các event mặc định của Feathers bạn cần làm như sau
* Đăng ký sự kiện mới trong service

Đăng ký trong class service
```js
class PaymentService {
  constructor() {
    this.events = ['status'];
  },

  create(data, params) {
    createStripeCustomer(params.user).then(customer => {
      this.emit('status', { status: 'created' });
      return createPayment(data).then(result => {
        this.emit('status', { status: 'completed' });
      });
    });
  }
}
```
Hoặc đăng ký trong Object service
```js
// Initialize our service with any options it requires
app.use("/messages", {
  events: ["firstEvent"],

  async create(data, params) {
    .....
  },
}
```
* Phát sự kiện

Bạn có thể sử dụng service để phát sự kiện ở bất cứ đâu nhưng bạn nên phát sự kiện ở hook
```js
app.service('messages').hooks({
  after: {
    create(context) {
      context.service.emit('firstEvent', { status: 'completed' });
    }
  }
});
```
* Publish sự kiện đến client

Khi server đã bắn ra 1 sự kiện nhiệm vụ tiếp theo là cần chuyển event này đến 1 kênh nào đó để xác định client nào sẽ nhận sự kiện này thông qua phương thức [publish](https://docs.feathersjs.com/api/channels.html)
* Đón nhận sự kiện phía client

Như đã đề cập ở trên, tên sự kiện đón nhận cần có tiền tố là tên service (nếu không sử dụng feathers client)
```js
// Method 1: Get firstEvent from messages service
socket.on("messages firstEvent", function() {
  console.log("first event 1");
});
// Method 2: Get firstEvent from messages service
client.service("messages").on("firstEvent", data => {
  console.log("First event 3", data);
});
```
# 3. Một vài thứ hay ho khác
- Hỗ trợ authenticaion với JWT

Việc sinh và kiểm tra token với JWT đã được hỗ trợ sẵn trong Feathers, công việc của bạn chỉ là gọi và sử dụng nó
https://docs.feathersjs.com/guides/auth/readme.html
- Feathres hỗ trợ database đa dạng. 

Feathers hỗ trợ ứng dụng của bạn làm việc với rất nhiều database  https://docs.feathersjs.com/api/databases/adapters.html

- Feathers client

Không chỉ hỗ trợ mạnh phía server, feathers cũng hỗ trợ client với các thao tác cho trình duyệt
https://docs.feathersjs.com/guides/basics/clients.html

# Tài liệu tham khảo
* [Home page of Feathers](https://docs.feathersjs.com/)
* [Create a Chat Application](https://docs.feathersjs.com/guides/chat/readme.html)
* [My project with FeathersJS](https://github.com/minhnv2306/react-node-chat-API-)