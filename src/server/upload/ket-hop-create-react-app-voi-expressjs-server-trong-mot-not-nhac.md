### Giới thiệu
Khi bắt đầu với một ngôn ngữ, framework, hay thư viện mới, hẳn ai cũng có một thắc mắc chung đó là nên bắt đầu từ đâu?, làm thế nào set up môi trường để bắt đầu ứng dụng kinh điển ‘Hello World!’. Với React chúng ta có tool create-react-app giúp dễ dàng bắt đầu tạo một ứng dụng mới chỉ với 3 câu lệnh trên terminal, điều này giúp chúng ta tiết kiệm khá nhiều time cho việc set up môi trường để bắt đầu viết code. 

Với các bạn đã và đang sử dụng React, đã bao giờ bạn setup một môi trường mà server side sử dụng Express node js còn client side sử dụng create-react-app? Bài viết này sẽ hướng dẫn các bạn setup một môi trường dev cho cả 2 phía server và client, cộng thêm tính năng automatic reloading giúp cho việc dev tiện lợi hơn, sau đó mình sẽ giải thích về workflow của set up này.

### Setup project
Backend setup:

1. Mở terminal, cd đến thư mục bạn muốn tạo project. (Ví dụ Desktop/Projects)
2. mkdir demo-server-client && cd demo-server-client
3. npm init -y
Sử dụng IDE ưa thích của bạn mở project lên, ở đây mình dùng Webstorm.

![](https://images.viblo.asia/a5449d47-ae49-474d-b5d0-f3f012725a43.png)

Tiếp theo, cài đặt express package module để có thể sử dụng express server.

Mở terminal của IDE:

```
npm install –save express
```

Trong thư mục của project tạo mới file index.js và nhập vào nội dung sau:
```
const express = require('express')
 
const app = express()
 
app.get('/', (req, res) => {
   res.send('hello from server!')
})
 
app.listen(5000, () => {
   console.log('App listening on port 5000')
})
```
Trong terminal chạy câu lệnh:  ` node index.js`

Trong console log của terminal ta thấy app đang chạy, tiếp theo mở trình duyệt ưa thích và gõ vào thanh địa chỉ: `localhost:5000`

![](https://images.viblo.asia/2ba76156-32d0-4866-9166-64e43b3170b2.png)

Đến đây chúng ta đã hoàn thành xong phần set up trên server. Tiếp theo là tới client.

Đầu tiên các bạn mở terminal lên để cài đặt create-react-app:

MacOS: `sudo npm install -g create-react-app`

Window: npm install -g create-react-app

Tiếp theo là tạo project mới với create-react-app(ở đây mình lấy tên app là client): create-react-app client

Sau khi tạo mới xong app, ta chạy thử client side server: cd client && npm start

Trình duyệt sẽ tự động mở ứng dụng React:

![](https://images.viblo.asia/eeaf0456-eb3a-4dc3-bcd2-875ce323e79c.png)

Đến đây project của chúng ta trông như sau:

![](https://images.viblo.asia/26abed48-7862-45c3-b642-8388410cbef7.png)

Setup để project có thể run đồng thời 2 server: `cd demo-server-client && npm install –save concurrently`

Thêm đoạn code sau vào file package.json:

```
"server": "node index.js",
"client": "npm run start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\""
```

![](https://images.viblo.asia/1a45cfd3-f148-44da-9e91-f838d3c81edf.png)https://images.viblo.asia/1a45cfd3-f148-44da-9e91-f838d3c81edf.png

Bây giờ muốn run project ta chỉ cần gõ lệnh sau: `npm run dev`

Ok, đến đây chúng ta đã set up xong project, tiếp theo là làm thế nào để giao tiếp giữa express server và client-server?

Giả sử server có một api /api/helloworld như sau:

```
app.get('/api/helloworld', (req, res) => {
  res.json({sayHi: 'hello from server, nice to meet you!'})
})

```

![](https://images.viblo.asia/6c8aeec1-7c6d-49ab-a5d3-71af1a52b301.png)

Làm thế nào để phía client side gửi request lên và lấy về dữ liệu json {sayHi: ‘hello from server, nice to meet you!’}?

Có bạn sẽ nghĩ: Oh, đơn giản ta vô client side, gửi request lên localhost:5000/api/helloworld lấy dữ liệu về rồi hiển thị ra. Bắt đầu nào.

Đầu tiên cd tới client và cài đặt axios để fetch data: npm install –save axios

thêm đoạn code sau vào client/src/App.js

![](https://images.viblo.asia/5ecafff5-9b17-4e3c-9a58-bf6df29c8717.png)

Run lại project với: `npm run dev`

![](https://images.viblo.asia/04f41d11-8a3a-4db2-9db1-6491a98cb94d.png)

Trong mục debug của brower ta thấy xuất hiện lỗi CORS, làm thể nào để fix lỗi này? Mở file package.json trong client/package.json, thêm proxy như sau:

![](https://images.viblo.asia/5f101f2b-f784-4689-8c07-d9b2d9cc9ab6.png)

Sửa lại đường dẫn một chút trong file App.js

![](https://images.viblo.asia/5d248248-fecc-4262-9b1c-4d82ba5e6a3a.png)

Run lại project:

![](https://images.viblo.asia/101b1642-754a-4ff0-a344-e476cf7137be.png)

### Giải thích workflow
Ok, vậy là mọi thứ đúng như ta mong muốn: Sự kết hợp giữa react server và express server. Có thể các bạn sẽ nghĩ “Nếu chỉ đơn giản vậy thì google search cái là xong, ông viết bài này chi cho mệt”, nhưng điều mình thực sự muốn chia sẻ ở đây là các bạn có thể dễ dàng fix lỗi này và dev ngon lành, nhưng thực sự các bạn đã hiểu kiến trúc này chưa? các bạn đã thực sự hiểu workflow của nó? khi deploy lên server online thì sẽ như thế nào? tại sao lại dùng thêm react server trong khi chúng ta đã có express server?…

Mình sẽ giải thích workflow trong môi trường dev và deploy sẽ khác nhau như thế nào, từ đó các bạn sẽ tự có câu trả lời.

Trong môi trường Development thì workflow minh họa như hình sau:

![](https://images.viblo.asia/1fcb21fd-3cb7-41bb-bdb9-95e9511d3507.png)

Theo hình trên react server cung cấp các dữ liệu liên quan đến front-end (html, javascript, css…) , express server cung cấp tất cả các dữ liệu khác bên trong ứng dụng (json data)( Chúng ta hoàn hoàn có thể build 1 express server, và bên trong server đó, chứa tất cả các logic cho việc build một ứng dụng react, điều này đòi hỏi khá nhiều cấu hình phức tạp và tốn thời gian cho việc set up môi trường, gây sự chán nản cho các bạn khi mới bắt đầu.)

![](https://images.viblo.asia/bd2376e3-8554-4677-938d-4d2e0443fe6a.png)

Khi người dùng gửi yêu cầu tới máy chủ localhost:3000,nếu yêu cầu chỉ cần trả về dữ liệu tĩnh, react-server sẽ trả về các file html, css, javasript… tương ứng. Khi người dùng yêu cầu dữ liệu động từ cơ sở dữ liệu, phía client sẽ gửi yêu cầu tới react-server thông qua proxy, nó tự động lấy request đó chuyển tiếp nó tới Express Server(cụ thể ở đây là máy chủ localhost:5000).

Đó là ở chế độ development, workflow sẽ thay đổi thế nào nếu chúng ta upload ứng dụng lên online server, ví dụ như Heroku chẳng hạn. Chúng ta sẽ phải mở file package.json, sửa proxy target thành “https://yourappname.herokuapp.com:5000” or whatever?

Câu trả lời rất đơn giản, đó là chúng ta chẳng phải sửa lại gì cả, bởi vì react-server không tồn tại trong production mode, trước khi chúng ta deploy ứng dụng lên react app sẽ được build ra một folder chứa tất cả các resource của app.(Dùng lệnh cd client && npm run build)

![](https://images.viblo.asia/a7c6ba5c-1e48-4f7b-ba33-9a8f1a9f27d3.png)
Khi trình duyệt gửi 1 request lên ứng dụng của chúng ta (giả sử ứng dụng đã được deploy lên heroku), tùy trường hợp cụ thể, response sẽ gửi về dữ liệu tĩnh (static files) hoặc dữ liệu được xử lý và lấy ra từ Database. Không còn bất kỳ dấu hiệu nào của react-server nào ở đây nữa, nó chỉ tồn tại trong môi trường development.

Nguồn tham khảo:

https://expressjs.com/

https://github.com/facebook/create-react-app

https://www.udemy.com/node-with-react-fullstack-web-development/

Source code:

https://github.com/danghv/demo-react-express