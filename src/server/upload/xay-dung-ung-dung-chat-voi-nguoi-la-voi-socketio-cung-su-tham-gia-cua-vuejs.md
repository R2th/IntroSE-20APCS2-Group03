# Mở đầu
Chắc hẳn các bạn không còn xa lạ gì với kiểu ứng dụng chat với người lạ trên facebook hay trên các ứng dụng web. Kiểu như mình có thể nc tâm sự với một cú có gai nào đó trên mạng mà cả 2 người cùng không có thông tin gì về nhau. và khi kết thúc cuộc nói chuyện cũng chẳng có tin nhắn nào được lưu lại cả. Thích hợp với các FA như các bạn :)

Ở bài viết này mình sẽ thử làm 1 app chat như vậy và cũng để tìm hiểu về thằng socketio này.

# Socket io là gì ?
* Là một module của Nodejs
* Được sử dụng trong các ứng dụng web thời gian thực.
* Tạo ra một cơ chế liên lạc giữa client và server
* Có thể cài đặt các module của Nodejs bằng NPM.

Các bạn có thể tìm hiểu thêm ở đây: https://socket.io/docs/


# Cấu trúc thư mục
Mình sẽ tạo ra 2 thư mục là : server và client

![](https://images.viblo.asia/57437156-7317-41a6-980e-ed3794e975b6.png)

* Thư mục `client` là nơi chưa code phần giao diện chát ở đây mình dùng vue-cli để tạo nhanh 1 project vuejs

```
vue create client
```

* Thư mục `server` sẽ là nơi cài đặt thư viện socket io trên môi trường nodejs

Trong thư mục server mình tạo ra file package.json với nội dung sau:

```json
{
  "name": "chat",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index"
  },
  "author": "phamtuananh760",
  "license": "ISC",
  "dependencies": {
    "nodemon": "^2.0.4",
    "socket.io": "^2.3.0"
  }
}

```

Chạy lệnh: 
```
npm install
```
Để install  package nodemon và  socket.io


Và tạo ra 1 file index.js đây là nơi xử lý logic của mình

Cấu trúc thư mục cuối cùng sẽ như thế này:

![](https://images.viblo.asia/96789d45-1b56-4079-b3aa-620600769000.png)

Cd vào thư mục server và chạy lệnh để khởi động server:
```
npm run dev
```

Cd vào client và chạy lệnh :
```
npm run serve
```

Giờ thì vào đường dẫn localhost:8080 xem đã cài đặt thành công chưa:

![](https://images.viblo.asia/463361ca-d6c4-4bc6-9b3b-615412d0be53.png)

Vậy là ok rồi !!!

# Lắc não và Code
Về phần server, Vì ứng dụng không lưu lại thông tin người dùng cũng như lịch sử tin nhắn nên sẽ không cần đến cơ sở dữ liệu. Server chỉ nhận các even từ người này và emit tới người kia trong cùng 1 room. Và đảm bảo mỗi room chỉ có 2 client.

Về phần client sẽ kết nối đến server socket và sẽ nhận và hiển thị tin nhắn nếu nhận được tn đến room của mình. Thông báo có ng vào phòng hoặc rời phòng.

Đầu tiên mình dựng server socket ở cổng 3000 như sau:
```server/index.js
const io = require('socket.io')(3000);

io.on('connect', socket => {
  console.log('có người kết nối này');
});

```

Khi có client kết nối đến thì mình sẽ log ra "có người kết nối này" để test việc kết nối giữa client với server.

Để client vue kết nối được đến server mình dùng thêm 1 package vue-socket.io:
```
npm install vue-socket.io --save
```

Sau khi cài đặt xong mình thêm đoạn code này vào file client/src/main.js:

```client/src/main.js
import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}))

new Vue({
  render: h => h(App),
}).$mount('#app')
```

F5 lại trình duyệt. Và thấy server log như này là kết nối thành công rồi :

![](https://images.viblo.asia/f677335e-ea35-48c3-9d41-c5ec0f3b82c7.png)

Tiếp theo khi client kết nối đến thì mình sẽ phải join client vào 1 room sao cho room đó đang có dưới 2 client đang join. và nếu không tìm được room nào như thế thì mình sẽ tạo 1 room mới vào join client đó vào. Mình sẽ đặt các room theo thứ tự từ 0 đến vân vân :

```server/index.js
const io = require('socket.io')(3000);

const getClientRoom = () => {
    let index = 0;
    while (true) {
      if(!io.sockets.adapter.rooms[index] || io.sockets.adapter.rooms[index].length < 2) {
        return index;
      }
      index ++;
    }
}

io.on('connect', socket => {
    const clientRoom = getClientRoom(); // Lấy room thỏa mãn điều kiện

    socket.join(clientRoom);

    if(io.sockets.adapter.rooms[myRoom].length < 2) { //kiểm tra xem phòng có dưới 2 ng trong phòng không 
        io.in(myRoom).emit('statusRoom', 'Đang chờ người lạ ...'); // emit cho tất cả client trong phòng
    } else {
        io.in(myRoom).emit('statusRoom', 'Người lạ đã vào phòng'); // emit cho tất cả client trong phòng
    }
    
    socket.on('disconnect', (reason) => { // Khi client thoát thì emit cho người cùng phòng biết
      socket.to(clientRoom).emit('statusRoom', 'Người lạ đã thoát. Đang chờ người tiếp theo ....');
    });
});

```

Hàm getClientRoom() mình sẽ duyệt qua các phòng nhằm tìm ra phòng đang có 1 client, hoặc tất cả các phòng đã có 2 ng rồi thì sẽ tạo phòng mới và join client đó vào.

Sau khi join xong mình sẽ emit tình trạng phòng đó cho client. Nếu phòng hiện tại đang có 1 người thì emit với message '`Đang chờ người lạ ...`'. Nếu đủ 2 người sẽ emit với mesage '`Người lạ đã vào phòng`' cho client , Khi người dùng thoát cũng emit về thông báo ng dùng đã thoát.

Các bạn có thể tham khảo các lệnh emit của socket io tại bài viết này : https://viblo.asia/p/tat-tan-tat-nhung-lenh-emit-trong-socketio-Qbq5Qj8wKD8


Để client có thể nhận được tình trạng phòng mình sẽ code thêm trong file `client/src/App.vue`:

```js
<template>
  <div id="app">
    <div v-for="(message, index) in messages" :key="index">
      {{ message.type }} : {{ message.message }}
    </div>
    <input type="text" v-model="text">
    <button>Send</button>
  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      text: '',
      messages: [],
    }
  },

  sockets: {
    initRoom: function (message) { // Đây là nơi nhận cái even initRoom với param là message mà server emit về
      this.messages.push({
        message,
        type: 'status',
      })
    }
  },
}
</script>

```

Vậy là đã lấy được tình trạng phòng. giờ thì mở 2 tab trình duyệt test thôi :

![](https://images.viblo.asia/fc6dea48-87b1-4262-be39-9fab9aa5bd91.gif)

Vậy là ok rồi. Có thể thấy nếu mở 2 tab mà đã cùng 1 room rồi. thì khi mở tab thứ 3 thì tab này sẽ join vào room khác.

Tiếp theo là sự kiện gửi và nhận tin nhắn giữa 2 client:

Dưới client khi ấn nút gửi thì sẽ emit 1 event lên server:
```js
methods: {
    sendMessage() {
      if(this.text !== '') {
        this.$socket.emit('sendMessage', this.text) // emit lên server
        this.messages.push({
          message: this.text,
          type: 'send',
        })
      }
      this.text = ''
    }
  }
```
Đồng thời mình push luôn message ấy vào mảng đã có.

Trên server để nhận event mình dùng 
```js
socket.on('sendMessage', function (message) { // nhận message từ client 
    socket.to(clientRoom).emit('receiveMessage', message); // emit message ấy cho người trong room ngoại trừ người gửi
})
```

Tương tự dưới client để nhận tin nhắn của người khác mình dùng: 

``` js
sockets: {
    statusRoom: function (message) {
      this.messages.push({
        message,
        type: 'status',
      })
    },
    receiveMessage: function (message) { //nhận tín nhắn từ ng khác trong phòng, push tin nhắn vào mảng ban đầu
      this.messages.push({
        message,
        type: 'receive',
      })
    },
  },
```
Vậy là hoàn thành sương sương chức năng rồi. chạy lên xem ok chưa.

![](https://images.viblo.asia/10238e94-31fa-4837-adfc-852b0119cefe.gif)

Vậy là xong rồi. lên mạng kiếm cái template chat nào xịn xò tý là ok.

![](https://images.viblo.asia/f469661c-49ae-4819-a36c-fb38d57f5a5d.gif)



# Dockerize ứng dụng
Để chạy project mà không phụ thuộc vào môi trường trên máy thì mình thêm file docker-compose.yml

```yml
version: '3'
services:
    server:
        image: node:10-alpine
        volumes:
        - ./server:/server
        working_dir: /server
        ports:
        - "3000:3000"
        restart: unless-stopped
        command: >
            sh -c "npm i && npm run dev"
    client:
        image: node:10-alpine
        volumes:
        - ./client:/client
        working_dir: /client
        ports:
        - "8080:8080"
        restart: unless-stopped
        command: >
            sh -c "npm i && npm run serve"

```

Giờ thì cần chạy lệnh

```
docker-compose up
```

# Source code, demo

Các bạn có thể tham khảo code ở đây : https://github.com/phamtuananh1996/chat

Demo: https://chatvnl.herokuapp.com

Các bạn có thể mở 2 tab để test
# Tổng kết
Vậy là mình đã hoàn thành 1 ứng dụng nhỏ nhỏ vui vui để hiểu cách dùng socketio rồi. Hẹn các bạn vào các bài viết tiếp theo, nếu hay các upvote và comment gạch đá nhiệt tình nhé.

Đọc thêm nhiều bài viết của mình ở đây  https://phamtuananh1996.github.io