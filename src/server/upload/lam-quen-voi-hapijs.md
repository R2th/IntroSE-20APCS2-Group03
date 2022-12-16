### 1. Hapi.js là gì?

Hapi.js (còn được gọi là hapi) là một open-source framework dùng để xây dựng các ứng dụng web. Việc sử dụng hapi phổ biến nhất là xây dựng các API service.

### 2. Tại sao nên sử dụng hapi.js?

Hapi có cấu trúc đơn giản, dễ dàng làm quen và sử dụng. Cộng đồng sử dụng đông đảo nên bạn sẽ nhận được nhiều support. Hệ thống plugin của hapi vô cùng phong phú và mạnh mẽ, cho phép bạn thêm các tính năng mới và sửa lỗi với tốc độ nhanh. Hapi cho phép bạn xây dựng các API có thể mở rộng, đây là một điểm cộng rất lớn cho các ứng dụng lớn.

### 3. Bắt đầu nhanh với hapi.js

#### 3.1 Cài đặt hapi

Hapi là một framework nodejs, cho nên các bạn cần chắc chắn đã cài đặt **nodejs** và **npm**. Các bước cài đặt hapi vô cùng đơn giản và tương tự với các project nodejs khác. Bạn tạo mới một thư mục với tên project (trong ví dụ này là **hello-hapi**) và thực hiện các bước sau:

* Đi vào thư mục project: `cd hello-hapi`
* Khởi tạo mới project: `npm init`
* Cài đặt package hapi.js: `npm install @hapi/hapi`

#### 3.2 Tạo một server hapi cơ bản

Từ thư mục project, các bạn tạo một file index.js với nội dung như sau:

```javascript
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
```

Đầu tiên, bạn require hapi và khởi tạo mới một server Hapi.server() có chứa thông tin về port và host. Sau đó bạn start server và log ra thông báo. Chi tiết về các thuộc tính khi khởi tạo server các bạn có thể tham khảo tại đây: https://hapijs.com/api#-serveroptions

#### 3.3 Thêm một route xử lý request

Sau khi các bạn chạy server ở bước trên, thì mới chỉ nhận được log thông báo server đang chạy. Để xử lý các request gọi lên server, các bạn cần thêm các route cho server.

```javascript
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });
  
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    }
  });
  
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
```

Sửa lại file index.js với nội dung như trên và start lại server. Lúc này, khi truy cập vào trình duyệt với url http://localhost:3000 các bạn sẽ thấy dòng text 'Hello World!' hiển thị trên màn hình.

Các bạn có thể nhận thấy, để thêm một route vào ứng dụng hapi rất dễ dàng, tên các thuộc tính của route cũng đã gợi ra các chức năng tương ứng. Để biết thêm các thuộc tính của route và cách dùng, các bạn tham khảo tại đây: https://hapijs.com/api#route-options

#### 3.4 Tổ chức thư mục

Về cách tổ chức thư mục dự án thì mỗi người có một phong cách khác nhau. Không có một cách nào là tốt nhất cho tất cả, nó chỉ phù hợp cho đa số mà thôi. Đối với dự án hapi mình thường đi theo cách tổ chức thư mục như sau:

![](https://images.viblo.asia/78e758bc-fc54-4bab-acc1-0f70ba657f13.png)

### 4. Lời kết

Bài viết này cho các bạn cái nhìn cơ bản về hapi.js framework. Hi vọng các bạn sẽ thấy thích nó và tiếp tục theo dõi những bài viết tiếp theo trong series về hapi.js. Cảm ơn các bạn đã dành thời gian cho bài viết này!

**Nguồn:** http://codemoingay.com/hapi-js-co-ban-lam-quen-voi-hapi-js