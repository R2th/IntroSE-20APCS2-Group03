## Node JS là gì?
> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

* NodeJS là một nền tảng (Platform) được xây dựng trên nền tảng Javascript V8 Engine. Được xây dựng để phát triển những ứng dụng server side.
* Phần core sử dụng Javascript và C++ cho phép xử lý với hiệu năng cao.
* Phù hợp với các ứng dụng xử lý nhanh, real time hoặc những ứng dụng cần thay đổi công nghệ nhanh.
* Chạy sigle thread nhưng có cơ chế non blocking giúp chạy bất đồng bộ, tăng khả năng xử lý.
* Thường phát triển theo hướng module hóa thành các phần nhỏ của ứng dụng và có thể thêm module có sẵn bên ngoài thông qua NPM, yarn....

## Kiến trúc
![Các thành phần và kiến trúc của NodeJS](https://images.viblo.asia/07b0de9c-1682-4d87-a3b1-79e8d3a85760.png)

Các bạn có thể tham khảo thêm ở  [đây](https://viblo.asia/p/nodejs-architecture-concept-p2-RQqKLEx6Z7z)

## Non Blocking IO
Là phương pháp để xử lý đồng thời nhiều request trên một luồng đơn (single thread) mà không cần đợi hoàn thành xử lý của request trước rồi mới xử lý request sau. NodeJS sử dụng cơ chế Event loop để xử lý Non-blocking tất cả các request để tăng tốc độ xử lý nhưng chúng ta vẫn có thể xử lý đồng bộ: sử dụng hàm callback, async/await, promise. 

## package manager
Về tổng quan, package manager là một kho lưu trữ những để xuất bản(publishing ) các package/module để người khác có thể sử dụng và một bộ dòng lệnh (command line) để cài đặt, quản lý version, quản lý các gói phụ thuộc, gỡ cài đặt các package/module có trên kho lưu trữ.
Hiện tại có rất nhiều package manager được sử dụng nhưng thông dụng nhất vẫn là npm, yarn. 
Có thể tìm kiếm và sử dụng các package/module ở đây: [NPM](https://www.npmjs.com/), [Yarn](https://classic.yarnpkg.com/en/)

## Express là gì?
> Fast, unopinionated, minimalist web framework for Node.js

**Web Applications**: Cung chấp rất nhiều tính năng mạnh mẽ và linh hoạt trên nền tảng web cũng như những ứng dụng di động. Express hỗ rợ các phương thức HTTP và midleware tạo ra môt API vô cùng mạnh mẽ và dễ sử dụng. Có thể tổng hợp một số chức năng chính của express như sau:

**APIs**: Với vố số các tiện ích HTPP và midleware tùy chỉnh, việc tạo một API với express trở nên nhanh chóng và dễ dàng.

**Performance** Express cung cập một layer(lớp) các tính năng cơ bản của một web application nhưng không ảnh hưởng đến các tính năng có sẵ của NodeJS

**Frameworks** Là base(nền tảng) của nhiều framework phổ biến khác.

## axios
> Promise based HTTP client for the browser and node.js

Là một thư việc rất thông dụng để tạo một promise request HTTP ở cả client side lẫn server side, 
- Tạo  [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) từ browser.
- Tạo [HTTP](https://nodejs.org/api/http.html) requests từ NodeJS.
- Hỗ trợ cho [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API (xử lý đồng bộ).
- Thay đổi dữ liệu của request và response.
- Hủy requests.
- Tự động chuyển đổi dữ liệu thành dữ liệu JSON.
- Hỗ trợ [XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) cho client side.
## Socket.io
> FEATURING THE FASTEST AND MOST RELIABLE REAL-TIME ENGINE

Là một công cụ thời gian thực nhanh nhất và đáng tin cậy nhất.

Socket.io cho phép giao tiếp hai chiều theo thời gian thực thông qua các sự kiện. Gồm 2 phần chính: Một máy chủ Nodejs (kho lưu trữ) và một Javascript client library (Thư viện javascript cho ứng dụng khách) cho client (trình duyệt, moblie, ...)

Ngoài gia javascript socket.io được thêm vào một số ngôn ngữ: Java, C++, Swift, Dart.

**Nguồn:** https://github.com/socketio/socket.io https://github.com/axios/axios https://expressjs.com/