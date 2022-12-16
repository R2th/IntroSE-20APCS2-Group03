# Feathersjs Part I
Trong bài viết này mình sẽ giới thiệu các bạn một thêm một library REST API của Node đó là [Feathesrjs](https://feathersjs.com/). Bài viết này giữ trên hướng phát triển của featherjs V 4. và mình sử dụng Sequelize để kết nội với db của mình, và chúng ta có thể tạo, update, xóa, hoặc edit model của mình theo Rest API. Tuy nhiên bài viết này không mang tính chất login (Authentication) cho việc CRUD, nhưng đó là basic cho các bạn để hiểu biết về Feathersjs.
![](https://images.viblo.asia/bc5aed79-b964-4857-8f79-de5f94174505.jpeg)
## 1.Giới thiệu về Feathersjs
   - là framework REST API dành cho node.
   - là framework micro service dành code node.
   - hỗ trợ code trên javascript và [typescript](https://www.typescriptlang.org/).
   - Đến thời điểm này framework đã phát triển phiên bản chính thức tới v 4.3.0 trên [npm](https://www.npmjs.com/package/@feathersjs/feathers).
 ## 2. Bản chất Featherjs
 Đối với Featherjs, chúng ta phải phần chia thành 3 loại lớn:
 
* **Core**: là những hàm dành cho cả server và client.
* **Server**: chỉ dành cho phần server và dùng những method từ phần core để tạo ra API trong Nodejs Server.
* **Client**: Modules dành cho phần client (Nodejs, browser hoăc React Native) và được kết nội với Feathers API SERVER.

![](https://images.viblo.asia/71ddf370-e893-47b7-83d0-ba80d500fd21.png)

## 3. Core

Feathers core có mục địch dành cho cả server và client, có nghĩa là chay luôn client + server cùng giống Framework Ruby On Rails, Django .... Có bảo gồm những module sau:
*  **Application** :  Bản thân thất là quan trọng của Feathers Application API được gọi la main.
*  **Services**:  Dành để tạo service object
*  **Hooks**: là middleware service.
*  **Events**: Sự kiện được gửi bởi hàm của Feathers service.
*  **Errors**: là class tâp trung phần error lúc gửi request tới Feathers.
## 4. Server
Trong phần này được phần chia thành 3 phần lớn:
###  Transports
Dành riêng cho phần api server là được tao ra để hộ trỡ cho những mục đích sau:
* **Express** : dịch chuyển REST API.
* **Socket.io**: dịch chuyển Realtime được tạo ra từ Socket.io.
* **Primus**: dịch chuyển Realtime được tao ra từ Primus.
* **Configuration**: cấu hình node và phần server.
* **Channel**: được gọi là sự kiện được kết nội tới phần realtime của client.
### 5. Client
Phần này sẽ hộ trỡ riêng dành cho phần client. Bảo gồm những phần sau:
* **Usage**: Dùng cho node, React Native và Webpack. có nghĩa là bạn có thể cái đặt Feathersjs trong  React Native hoặc Webpack xong rồi và request tới server.
* **Rest**: cấu hình dịch chuyển dành cho REST API cho những server usage.
* **Socket.io** : cấu hình dịch chuyển dành cho Socket.io API Usage.
* **Primus**: cấu hình dịch chuyển dành cho Primus API Usage.

### 6. Authentication
Feathersjs authentication được phát triển trên [mechanism](https://en.wikipedia.org/wiki/Mechanism), như vậy chúng ta có thể lưa chọn những cách sau này để viết một application authentication cho feathersjs của các bạn:
* **Service**:  Trái tìm của authentication, bạn cần phải cầu hình lúc bắt đầu.
* **Strategies**: là những class hộ trỡ authenticate cho feathersjs, tới thời điểm này, bản thân của strategies đã hô trỡ:
    * JWTStrategy: ```@feathersjs/authentication``` dành cho việc login bằng API JWT authentication
    * LocalStrategy: ```@feathersjs/authentication-local``` dành cho viêc bằng email và password.
    * OAuthStrategy: ```@feathersjs/authentication-oauth``` dành cho việc dùng Login băng (Facebook, Twitter ...)
  
### 7. Databases

Phần này được dành cho việc kết nội với DB và việc query:
* **Adapters**: phần sánh sách những db được có thể dùng trong Feathersjs
* **Common API** : dành cho việc cấu hình và kết nội db với API.
* **Querying**: dành cho việc query  mechanism.

## Kết luận
Bài viết này chỉ là phần thời thiệu qua về Feathersjs và có muc đích cho các bạn dễ tìm hiểu về Feathersjs.  Như thế nào trong bài viết này cùng có phần sai hoặc giải thích không đúng nghĩa (Tiếng Viết). Các bạn có thể cho mình xin vài comment để chính sửa và phát triển bài viết sau này càng tốt hơn.

## Tài liệu:
- [Feathersjs](https://docs.feathersjs.com)