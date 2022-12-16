Do khởi điểm là 1 SEO-er nên khi phát triển các ứng dụng web đưa ra thị trường, đối tượng người dùng của mình không giới hạn ở 1 quy mô nhỏ hay ứng dụng nội bộ sử dụng nên mình luôn đòi hỏi các ứng dụng web do mình phát triển phải luôn thân thiện với BOT của các công cụ tìm kiếm để mình có cơ sở SEO tốt hơn. Do đó, khi lựa chọn sử dụng Reactjs để phát triển 1 Web single Page App thì mình nghĩ ngay đến Nextjs Framework và đã làm việc với nó trong 1 thời gian khá dài.

> NextJs là một framework nhỏ gọn giúp bạn có thể xây dựng ứng dụng Single Page App - Server Side Rendering với ReactJs một cách dễ dàng.
> 

Dù default Next server mặc định là đã đủ đáp ứng các ứng dụng. Nhưng đôi khi bạn muốn chạy server của riêng mình để tùy chỉnh router và tích hợp các module khác khi cần 1 cách linh động nhất. Do đó, việc custom server Nextjs là điều cần thiết. Bởi vì máy chủ Next.js thực chất chỉ là một mô-đun node.js, bạn có thể kết hợp nó với bất kỳ phần nào khác của hệ sinh thái node.js.

Ví dụ trước đây làm việc với Server Rails, để phát triển các chức năng realtime với Websocket thì đã có ActionCable hỗ trợ.Tuy nhiên, nếu nhắc đến vấn đê Realtime thì không thể bỏ qua Js nhất là khi đụng tới Nodejs thì Socket.Io là 1 module của NodeJs cực kỳ bá giúp phát triển các ứng dụng realtime đơn giản, dễ dàng với việc nó hỗ trợ sẵn các phương thức để bắn data cho các đối tượng connection khác nhau.

Vấn đề ở đây là bây giờ mình muốn tích hợp Socket.io thì phải làm thế nào? Edit file nào phía server?

Đó là lúc các bạn cần custom server để có thể quản lý server nextjs linh động hơn.

## Custom server Express
Express là một framework rất nổi tiếng của Nodejs, dùng để tạo nên các ứng dụng web trên môi trường Nodejs. Ở đây mình sẽ custom Server with express, sử dụng Express để custom routing luôn.

**Bước 1:**
Đầu tiên các bạn cần tạo ra 1 server. Tạo file server.js

```
const express = require('express') // Sử dụng framework express
const next = require('next') // Include module next

const port = parseInt(process.env.PORT, 10) || 3000 // Port để chạy app Nextjs, cũng là server nodejs
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

//Tạo ra các router. Dòng này có ý nghĩa khi gửi request đến path /a . Sẽ render file /a.js trong thư mục pages/a.js của Nextjs
  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

// Nếu các bạn muốn các routing tự động liến kết đến route files giống với cấu trúc của Nextjs thì chỉ cần thêm 3 dòng bên dưới
// https://nextjs.org/docs/routing/introduction
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

**Bước 2:**
Các bạn sửa file package.json để chuyển từ việc sử dụng Server Next default qua server Nodejs đã được custom ở trên. Tìm đoạn
```
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
```
**sửa thành**
```
"scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "cross-env NODE_ENV=production node server.js"
  },
```

Đơn giản như vậy là các bạn đã có 1 server chạy Nodejs/ Express cho ứng Nextjs của bạn. Sau này cần cài đặt thêm các module, package gì cho server thì các bạn npm bình thường và require hoặc vào file server này để cấu hình thêm.

![](https://images.viblo.asia/7f1fc9c9-b3a2-4753-8843-b7784448e570.jpg)

Mình thử truy cập vào routing `/a `như đã cài đặt ở trên xem thử có chạy đúng không. 
Kết quả là đã render đúng template
![](https://images.viblo.asia/4cc94a76-1724-42cb-897e-3a489eca0755.png)


Đây là 1 ví dụ khi các bạn muốn cài đặt Socket.IO vào ứng dụng. Ở phía server các bạn require socket.io
```
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const messages = {
  chat1: [],
  chat2: [],
}

// socket.io server
io.on('connection', socket => {
  socket.on('message.chat1', data => {
    messages['chat1'].push(data)
    socket.broadcast.emit('message.chat1', data)
  })
  socket.on('message.chat2', data => {
    messages['chat2'].push(data)
    socket.broadcast.emit('message.chat2', data)
  })
})

nextApp.prepare().then(() => {
  app.get('/messages/:chat', (req, res) => {
    res.json(messages[req.params.chat])
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

Bên phía client Nextjs, chỉ cần import thêm file socketio js client để 2 bên client và server tương tác với nhau. Nếu các bạn sử dụng Reactjs/ Nextjs như mình thì tham khảo https://github.com/socketio/socket.io-client

Nếu muốn tìm hiểu về socket Io để viết các ứng dụng realtime thì các bạn có thể vào trang chủ của nó: https://socket.io/

Trong các bài viết tiếp theo, mình sẽ cố gắng đi sâu vào Nextjs, cách phát triển các ứng dụng Nextjs kết hợp sử dụng tối đa giá trị mà Nodejs mang lại cũng như tối ưu tốt hơn SEO cho Nextjs qua cách cấu hình Meta tag, Schema JSON và Open Graph để ứng dụng của bạn thân thiện nhất với các công cụ tìm kiếm.

Chúc các bạn thành công!