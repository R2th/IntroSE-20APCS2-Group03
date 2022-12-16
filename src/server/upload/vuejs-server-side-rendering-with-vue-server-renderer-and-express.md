Chào các đồng nghiệp, những năm gần đây thuật ngữ "Single Page Aplication"( thường được viết tắt SPA) và một số framwork javascript hộ trợ chúng ta xây dựng một trang web SPA nhanh và dễ dàng như Vuejs hay Reactjs...Tuy nhiên trang web SPA thông thường cũng găp một hạn chế như: Việc load source lần đầu lâu do file sau khi build có dung lượng lớn, không tốt cho sale. Từ hạn chế đó lại sinh ra thuật ngữ "Server Side Render"(SSR). Lấy ví dụ như khi bạn xây dựng một trang web SPA thông thường bằng Laravel(backend) và Vuejs thì code frontend của bạn sau khi build sẽ nằm trong một file js (thường hay đặt là app.js). Sau khi load trang đầu tiên về browser thì các thao tác get data từ server và update lại view từ data cho người dùng do code trong file app.js đảm nhận, server chỉ trả về browser data dạng json. Nói cách khác thì tất cả các code html sẽ được rende từ file app.js.  Còn SSR các bạn hiểu đơn giản là server sẽ render code html rồi trả về và browser chỉ việc hiển thị. Trong bài viết này mình sẽ build và demo một project đơn giản về SSR sử dụng vue & vue-server-renderer và nodejs.
## Khởi tạo project.
Trong phần này tôi sẽ setup server node và cài một số package cần thiết. Chú ý là máy phải được cài node nhé(tốt nhất là version mới nhất).
- Tạo thư mục có tên tùy ý, ở đây tôi sẽ đặt tên "ssr".
- Bên trong thư mục chạy lệnh sau để sinh ra file package.js để quản lý package.
```
npm init -y
```
- Tiếp theo cài các package cần thiết:
```
npm install express vue vue-server-renderer --save
```
## Rendering a Vue Instance
Sau khi cài đặt các package ở, Tôi sẽ tạo một file index.js với nội dung như sau:
```
// Step 1: Create a Vue instance
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// Step 2: Create a renderer
const renderer = require('vue-server-renderer').createRenderer()

// Step 3: Render the Vue instance to HTML
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
```

Lưu lại và chạy lệnh:
```
node index.js
```
sẽ in ra
```
<div>Hello World</div>
```
Các bạn thấy đoạn code trên render ra code html từ một instance của vue.
## Integrating with a Server
Ở phần này tôi sẽ kết hợp vue-server-renderer và express để trả về browser code html đã được render trên server. Sữa lại nội dung file index.js thành:
```
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)
```
Lưu lại và chạy lệnh:
```
node index.js
```
Sau đó sử dụng browser truy cập vào địa chỉ:
```
localhost:8080
```
Mở debuger của browser lên kiểm tra dạng response trả về thì sẽ thấy là code html->chúng ta đã render code html từ vue instance trên server thành công.
## The End
Trên đây tôi đã giới thiệu demo với các bạn về SSR sử dụng vue, vue-server-renderer và express, có gì không hiểu hoặc lỗi chỗ nào các bạn có thể comment bên dưới để mình giải đáp nhé. Trong các bài viết sau tôi sẽ tiếp tục viết sâu hơn về ssr mong các bạn đón đọc.