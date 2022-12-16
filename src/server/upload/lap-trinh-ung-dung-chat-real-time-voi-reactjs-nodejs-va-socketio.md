Chào mọi người, cũng đã vài tuần không viết về react. Hôm nay mình sẽ quay lại với một bài đơn giản với một chức năng rất quen thuộc đối với chúng ta. Đấy là chức năng chat real-time, nghe thì có vẻ khó nhưng chỉ cần vài bước đơn giản là bạn có thể tạo ra được một chức năng nhắn tin vui cho riêng mỉnh rồi. Và nếu các bạn có hứng thú thì cùng tiếp tục đọc bài viết nhé.

![](https://images.viblo.asia/ba84882e-aa59-4eda-a890-29b62efb79c3.png)


Những thứ cần ngày hôm nay là: 
- Một chiếc lap top (tất nhiên rồi heheh) 
- Kiến thức với React.js
- Kiến thức với socket.io 
- Kiến thức với nodejs express

Tất cả đều chỉ cần mức cơ bản là có thể làm một chức năng chat đơn giản rồi nhé. Mà nếu chưa biết về mấy cái kể trên thì bạn có thể vào đọc các bài viết khác trong Viblo nhé. Rất nhiều bài hay và hấp dẫn đấy! Mình cũng có một series về làm quen với React ở [đây](https://viblo.asia/s/lam-quen-voi-reactjs-GJ59jLj9KX2) . Các bạn vào tham khảo để biết thêm nhé, và còn những kiến thức khác nếu chưa rõ thì với bài viết này chỉ ở mức cơ bản vì vậy những câu lệnh rất đơn giản. Nên mình nghĩ ai cũng có thể làm được theo hướng dẫn. Chúng ta cùng bắt đầu thôi.

# 1. Socket.io
 Socket.io ?? nghe quen quen mà ngại sử dụng, ngại tiếp xúc. Nếu ai đang thế thì thử đọc bài của mình và bắt tay làm thử có khi lại thấy hay và dễ đấy
 
 
 Socket.io là một thư viện cho phép giao tiếp theo thời gian thực (real-time), 2 chiều và dựa trên các sự kiện giữa trình duyệt và máy chủ. Nó bao gồm: 
 - Một server Node.js
 - Một thư viện Client Javascript (ví dụ như socket.io-client) để cho phép sử dụng socket ở phía client.

![](https://images.viblo.asia/d73b1c32-aa59-43e5-bcb5-7ba330c9b9d4.png)

Như vậy chúng ta sẽ có giao tiếp 2 chiều, browser phát (emit) sự kiện tới server lắng nghe, và server có thể lắng nghe hoặc phát sự kiện tới client, với thời gian delay rất thấp. Việc sử dụng socket.io ở cả phỉa client và server đều rất giống nhau vì vậy việc tiếp cận khá dễ dàng. Cần 3 hoạt động chính: 
- Khởi tạo kết nối.
- Lắng nghe sự kiện.
- Gừi sự kiện kèm theo data.

Có 2 method mà chúng ta dùng nhiều nhất trong bài ngày hôm nay đấy là socket.on() và socket.emit() là 2 cái cơ bản và dễ nhất với socket.io . Với on() dùng để lắng nghe sự kiện và emit() chính là phát ra sự kiện từ client tới server hoặc có thể ngược lại. Chúng ta cùng đi vào phần chính là coding nào. 
# 2. Tạo server:

Đầu tiên chúng ta cùng tạo một thư mục của ứng dụng là app-chat nhé. Trong này mình sẽ tạo tiếp 2 thư mục con là server và web (client). Oke,  bước đầu tiên chúng ta sẽ cần tạo một server node.js express. Ai chưa cài node.js thì mình có dẫn link ở đây nhé : 
https://nodejs.org/en/ .
Init npm : 
```bash
$ npm init
 ```
Để cài thêm socket.io , express sử dụng cho server chúng ta cũng cần chạy thêm command: 

```bash 
$ npm i express socket.io --save
```
và 
```bash
npm i nodemon --save-dev
```

Để sử dụng nodemon (cái này dùng để reload lại server mỗi khi chúng ta sửa code) trên môi trường developement.
Hoặc nhanh hơn chúng ta có thể tạo file package.json như sau vào thư mục server: 
```json 
{
  "name": "web",
  "version": "1.0.0",
  "description": "app chat ver 1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \\\"Error: Have error\\\" && exit 1"
  },
  "author": "hieupv",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "socket.io": "^4.1.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```
Và chạy ``` npm install ``` và xong ! Chúng ta đã cài đủ những thư viện cần thiết phía server .
Ở đây file chạy chính là index.js vậy chúng ta cần tạo thêm một file index.js nữa và code như dưới đây: 

```
var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server đang chay tren cong 3000');
});
```

Test thử server: 
```bash 
$ npm start 

> web@1.0.0 start /home/pham.viet.hieu/Documents/AppChat/server
> nodemon index.js

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server đang chay tren cong 3000
```

Oke ngon lành rồi chúng ta cùng tiếp tục thêm socket.io nhé :
```js
var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
  }); 
  // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 


socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id); 

  socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

server.listen(3000, () => {
    console.log('Server đang chay tren cong 3000');
});
```
# 3. Phía client: 
Client mình sẽ đặt ứng dụng bên trong folder web nhé. Chúng ta ra thư mục root của app và chạy khởi tạo một ứng dụng reactjs:
```bash
$ npx create-react-app web
```

```bash
$ cd web
```
Cài luôn package socket.io cho react: 
```bash
$ npm install socket.io-client
```

```bash
$ npm start 
//sẽ chạy ứng dụng ở cồng 3001 vì cồng 3000 đã chạy express
```

Ở bài này mình sẽ không chia nhỏ component mà mình sẽ viết luôn vào 1 component App.js ở bên ngoài cho nhanh nhé :D 
Đầu tiên cũng cứ phải test cái đã xem có chạy được không :v 

```js
import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const host = "http://localhost:3000";

function App() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
  }, []);


  return (
      <></>
  );
}

export default App;
```

```bash 
New client connected
```

Như này là ngon rồi , thêm code vào nhé :D Chúng ta cần tạo ra một ô nhập tin nhắn và nút gửi trước : 

```jsx

return (<div class="box-chat">
  <div class="box-chat_message">
      // phần này cho tin nhắn
  </div>

  <div class="send-box">
      <textarea 
        value={}  
        onKeyDown={}
        onChange={} 
        placeholder="Nhập tin nhắn ..." 
      />
      <button onClick={}>
        Send
      </button>
  </div>
</div>);

```

Ở hooks useEffect() chúng ta cần thêm một cái quan trọng nhất đấy là lắng nghe sự kiện được phát ra từ server để nhận tin nhắn khi có tin nhắn mới: 
```js
 useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
  
    socketRef.current.on('getId', data => {
      setId(data)
    }) // phần này đơn giản để gán id cho mỗi phiên kết nối vào page. Mục đích chính là để phân biệt đoạn nào là của mình đang chat.

    socketRef.current.on('sendDataServer', dataGot => {
      setMess(oldMsgs => [...oldMsgs, dataGot.data])
    }) // mỗi khi có tin nhắn thì mess sẽ được render thêm 

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  
  ```

Khi submit nút gửi, chúng ta cần phát ra sự kiện để gửi dữ liệu tới server 
```js
 const sendMessage = () => {
   if(message !== null) {
      const msg = {
        content: message, 
        id: id
      }
      socketRef.current.emit('sendDataClient', msg)

    /*Khi emit('sendDataClient') bên phía server sẽ nhận được sự kiện có tên 'sendDataClient' và handle như câu lệnh trong file index.js
          socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
            socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
          })
    */
      setMessage('')
    }
}
```

Render từng khung tin nhắn nhé, chúng ta sẽ gán thêm class phục vụ cho việc chút nữa style lại để phân biệt cái nào là của mình chat :)))
```jsx
  const renderMess =  mess.map((m, index) => 
    <div 
        key={index} 
        className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}
    >
      {m.content}
    </div>
  )
```
Nhớ thêm lại vào template :D 
```jsx
return (<div class="box-chat">
  <div class="box-chat_message">
      {renderMess}
  </div>

  <div class="send-box">
      <textarea 
        value={}  
        onKeyDown={}
        onChange={} 
        placeholder="Nhập tin nhắn ..." 
      />
      <button onClick={}>
        Send
      </button>
  </div>
</div>);

```

![](https://images.viblo.asia/ebaf8285-15cf-4e2d-93f3-c6d134b5fd55.gif)

Có vẻ ok rồi đấy cho thêm tí CSS cho lung linh nào : (mình css tay không có thư viện nào cho nhanh nhé)

![](https://images.viblo.asia/41437178-f4f9-4c9c-8b53-73ea9066fd4c.gif)

Vậy là hoàn tất! 

Full source code: https://github.com/phamviethieu/chat-app
# 4. Kết luận: 
Bài viết của mình đến đây là kết thúc. Với chút kiến thức cơ bản với socket.io, node.js hay react.js thì chúng ta đã có thể tự làm một ứng dụng chat cho riêng mình. Và như này thì mới chỉ là sử dụng cho việc chat không lưu dữ liệu hay chat không cần đăng nhập. Nhưng mình nghĩ đây sẽ là cái cơ bản nhất giúp mọi người có thể tự mình phát triển thêm ứng dụng về sau như lưu lại dữ liệu vào database hay đăng nhập để chat hoặc thêm ngày giờ thời gian chat như messager. Mọi người có thể tự tìm hiểu thêm thì sẽ tốt hơn. Cảm ơn mọi người đã kiên nhẫn đọc hết bài viết. Nếu thấy hay thì đừng quên upvote và clip cho mình nhé. Many thanks !!!