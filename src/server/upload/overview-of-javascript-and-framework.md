### **I.Overview of Javascript**
Với sự phổ biến và phát triển mạnh mẽ của javascript trong lập trình hiện nay thì việc ra đời rất nhiều các framework về js là điều k cần bàn cãi.
Js cũng là 1 trong những ngôn ngữ có cộng đồng phát triển mạnh mẽ nhất thế giới. 
Giữa vô vàn các ngã rẽ , các lối đi khác nhau, trước mắt là hàng trăm framework đầy lôi cuốn vậy ta nên chọn con đường nào, lối đi nào để chung sống với nó.
Sau đây mình sẽ nói tổng quan về các điều cần và nên có khi bạn học js

### **II. JavaScript & DOM Fundamentals**
Trước khi bạn muốn chuyển hướng sang 1 công việc sử dụng javascript bạn nên nắm việc 1 số điều cơ bản:
**ES6**: Phiên bản hiện tại của javascript  là ES2016 (ES7), nhưng tới bây giờ nhiều developer vẫn chưa năm chắc ES6. Đã đến lúc tìm hiểu nhưng yếu tố cần thiết sau:
Arrow functions, rest/spread, default parameters, concise object literals, destructuring…
**Closures** Learn how JavaScript’s function scopes behave.
**Functions & pure functions:** Bạn nghĩ răng bạn đã nắm rõ javascript nhưng bạn đừng quên răng javascript có 1 vài "tricks" giúp bạn code lên tay rất nhanh, và bạn sẽ cần
học về các "Pure Function" nó là một nguyên tắc trong functional programing.
**Builtin methods** Học và nắm vững các kiểu dữ liệu đặc biệt là: arrays, objects, strings, and numbers..
**Callback** Một callback là 1 function và được gọi bởi 1 function khác khi kết quả đã sẵn sàng
**Promises:** Vậy promise sinh ra để xử lý kết quả của một hành động cụ thể, kết quả của mỗi hành động sẽ là thành công hoặc thất bại và Promise sẽ giúp chúng ta giải quyết câu hỏi
 "Nếu thành công thì làm gì? Nếu thất bại thì làm gì?"
**Ajax & server API calls:** Tất cả các ứng dụng cuối cùng đều cần làm việc với network.Vậy nên bạn nên biết cách làm thế nào để giai tiếp với API
**Node và express** Node cho phép bạn sử dụng javascript làm server thay vì client như bình thường. Có nghĩa là nó sẽ cho phép bạn lưu trữ dữ liệu và gọi ra bất cứ ở đâu bạn cần.
express là 1 framework phổ biến của Node

### **III.Tooling**
**Chrome Dev Tools**  DOM inspect & JS debugger: có khá nhiều công cự debugger js nổi tiếng mặc dù bạn firefox cũng có khá nhiều tool dành cho developer rất hay mà bạn muốn tìm hiểu thêm
**npm:** Tất nhiên là không thể thiếu NPM rồi. Một trong những kho lưu trữ các gói open-source của javascript khổng lồ nhất
**git & GitHub** một công cụ quản lý source code tuyệt vời
**Webpack** là 1 trong những công cụ quản lý, cài đặt gỡ bỏ source code phổ biến nhất hiện nay với các gói javascript chuẩn
**Yarn** tất nhiên Yarn cái tên mới nổi. Nó như NPM nhưng cài đặt nhanh và gọn hơn khá nhiều
**TypeScript**   Nó có thể được coi là một phiên bản nâng cao của Javascript bởi việc bổ sung tùy chọn kiểu tĩnh và lớp hướng đối tượng mà điều này không có ở Javascript.
TypeScript có thể sử dụng để phát triển các ứng dụng chạy ở client-side (Angular2) và server-side (NodeJS).

### ****IV: React 

React là một thư viện viết bằng javascript, dùng để xây dựng giao diện người dùng(User Interface – UI). UI tất nhiên là quan trọng, nhưng không phải là tất cả. Để phát triển ứng dụng hoàn chỉnh,
một mình React Js là không làm được tất cả, bạn sẽ cần thêm:
Server side language: để xử lý logic và lưu trữ dữ liệu trên server.
HTML/CSS nếu bạn làm ứng dụng web.
Flux: là một kiến trúc giúp bạn tổ chức code rõ ràng và sạch sẽ.
Objective C: nếu bạn sử dụng React để xây dựng app cho iOS

### ****V: Redux

Redux nổi lên trong vòng 2 năm nay như 1 hiện tượng, nó thậm chí thay thế luôn kiến trúc Flux của Facebook dùng cho React,
và hiện tại Facebook cũng khuyến cáo dev chuyển qua dùng Redux vì nhiều ưu điểm được cải tiến từ Flux.
Redux js là một thư viện Javascript giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng.
Về cơ bản Redux có 4 thành phần như sau:
Action: Là nơi mang các thông tin dùng để gửi từ ứng dụng đến Store. Các thông tin này là 1 object mô tả những gì đã xảy ra.
Reducer: Là nơi xác định State thay đổi như thế nào.
Store: Là nơi quản lý State, cho phép truy cập State qua getState(), update State qua dispatch(action), đăng kí listener qua subscribe(listener).

### ****Angular 2+*

Angular là một bộ Javascript Framework rất mạnh và thường được sử dụng để xây dựng project Single Page Application (SPA). Nó hoạt động dựa trên các thuộc tính mở rộng HTML
(các atributes theo quy tắc của Angular). Đây là một Framework mã nguồn mở hoàn toàn miễn phí và được hàng ngàn các lập trình viên trên thế giới ưa chuộng và sử dụng.
- Phát triển dự trên Javascript
- Tạo các ứng dụng client-side theo mô hình MVC.
- Khả năng tương thích cao, tự động xử lý mã javascript để phù hợp vứi mỗi trình duyệt.
- Mã nguồn mở, miễn phí hoàn toàn và được sủ dụng rộng rãi.
+ Các components  chinh:
    ng-app : định nghĩa và liên kết một ứng dụng AngularJS tới HTML.
    ng-model : gắn kết giá trị của dữ liệu ứng dụng AngularJS đến các điều khiển đầu vào HTML.
    ng-bind : gắn kết dữ liệu ứng dụng AngularJS đến các thẻ HTML.
### **RxJS**

RxJS là viết tắt của Reactive Extensions Library for JavaScript 
RxJS đơn giản là một thư viện xử lý bất đồng bộ (asynchronous data streams) hay nói đúng hơn là nó không hề xa lạ, hầu hết các sự kiện mà bạn
làm việc cùng đều là một "luồng" các sự kiện khác nhau và RxJS sẽ giúp bạn tạo được các luồng sự kiện này từ "mọi thứ" (ít nhất là đối với javascript).

### ****Kết

Trên đây chỉ là tổng quan về 1 số framework và tool về javascript, chỉ là tóm gọn và chưa thể nắm băt hết nhưng cái hay của javascript. Mong các bạn thông cảm