# Nodejs là gì?
Node là trình biên dịch Javascript điều khiển không đồng bộ dựa trên công cụ Javascrip V8 của Chrome, được thiết kế để xây dựng các ứng dụng mạng có thể mở rộng.

Nodejs sẽ cho phép bạn xây dựng server side bằng Javascript. Bạn có thể băn khoăn về điều này: Như bạn đã biết, JavaScript là ngôn ngữ chạy ở phía client browser. Browser engine sẽ compile JavaScript code thành các command. Những người tạo ra Nodejs đã sử dụng Chrome engine để tạo ra môi trường cho việc sử dụng nó bên phía server. Và chúng ta có gì? JavaScript ở backend!

JavaScript là ngôn ngữ sự kiện, chạy single thread. Nghĩa là mỗi lần thực thi nó sẽ chạy tuần tự các function, và bạn sẽ không muốn làm cản trở việc thực thi main thread đó. Và đó nghĩa là bất đồng bộ, xử lý các sự kiện mà không làm gián đoạn main thread. Node dựa trên thực thi non-blocking, điều đó làm nó trở thành một trong những công cụ nhanh nhất cho việc xây dựng ứng dụng web ngày nay. Chúng ta sẽ xem xét trong ví dụ "Hello World" dưới đây.

# Xây dựng ứng dụng Hello World bằng Nodejs

## Install Node.js

Truy cập trang [**nodejs.org**](https://nodejs.org/en/), chọn hệ điều hành mà mình sử dụng, tải về và cài đặt:

![](https://images.viblo.asia/53b2e8a2-fcfc-459e-99fd-9feb3a23842b.png)

## Tạo thư mục project

Mở command promt và gõ:

```
mkdir myapp
cd myapp
```

Để tạo thư mục mới tên là myapp vào chuyển đến thư mục đó. *mkdir = "make directory"*, *cd = "change directory"*. Người dùng Windows có vẻ sẽ khó quen với điều này, tuy nhiên nó cũng tương tự việc click chuột phải chọn *New Folder* vậy, trông pro hơn tí thôi :v 

## Tạo project và kết nối đến npm

Sau khi tạo thư mục có cái tên rất sáng tạo là myapp, chúng ta sẽ cần tạo project và kết nối nó đến npm. Np- cái gì cơ? Nghe khó hiểu thế? Okay, npm là viết tắt của Node Package Manager, là nơi đặt tất cả các package của node. Package có thể xem như tập các gói code, như module, thực hiện các chức năng chuyên biệt. Chức năng là những gì chúng ta - các developers - đang và hay sử dụng. Chúng ta sử dụng interface của chương trình ứng dụng, API, cung cấp cho chúng ta bởi các module. Thế API là cái chi chi? 

Là cái [này này](https://medium.freecodecamp.com/what-is-an-api-in-english-please-b880a3214a82) :v Ở đây mình sẽ không nói về cái này vì lan man quá :v Tạm hiểu nó là một phần của server phục vụ cho việc nhận request và gửi trả response lại cho client.

Chạy câu lệnh sau để tạo project:

```
npm init
```

Câu lệnh trên sẽ tạo ra file package.json trong folder *myapp*. File sẽ bao gồm các node package mà chúng ta đã download vào trong project. Câu lệnh sẽ nhắc bạn nhập một số thứ, cứ việc enter tẹt thôi :v Nhưng gượm đã, trừ cái này:

```
entry point: (index.js)
```

bạn sẽ muốn đổi tên nó lại thành cái này:

```
app.js
```

## Install [Express](http://expressjs.com/) trong thư mục *myapp*

Vẫn trong thư mục *myapp*, chạy:

```
npm install express --save
```

Lệnh *install* sẽ tìm kiếm package mà chúng ta muốn cài đặt và cài đặt vào project của chúng ta. Đến đây, chúng ta có thể thấy thư mục *node_modules* đã được tạo ra trong project. Đây là một bước rất quan trọng, chúng ta có thể yêu cầu bất kì file nào được cài đặt gần đây trong ứng dụng. Việc thêm -save sẽ lưu package vào dependencies list, nằm tỏng package.json trong thư mục *myapp*.

Yeah, đến đây thì các bạn sẽ tự hỏi, Express chính xác là cái gì?  Dịch vụ gửi mail? Đối thủ của dịch vụ chuyển phát nhanh FedEx? Không phải, Express:

*“Fast, unopinionated, minimalist web framework for Node.js” — Taken from Express.js’ official website*

Express cung cấp cho chúng ta một công cụ mạnh mẽ và dễ sử dụng để xây dựng và hoặt động ứng dụng web. Express đã trở nên rất phổ biến, đủ để trở thành một tiêu chuẩn trong phần lớn các ứng dụng Node.js ngày nay và rất được khuyến khích sử dụng.

## Khởi chạy text editor và tạo một file tên app.js

```js
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

Đây là nơi chúng ta sử dụng các package mà vừa mới cài đặt. Dòng đầu tiên, chúng ta tạo biến chứa module tên là express, lấy nó từ folder *node_module*. Module thực chất là một function. Gán function cho một biến cho phép bạn truy cập một bộ công cụ được xác định trước sẽ giúp cho việc code (cuộc sống) của chúng ta dễ dàng hơn (yaoming). Bạn có thể xem biến *app* như là một object, có phương thức mà chúng ta sử dụng để xây dựng một chương trình thực tế.

Phương thức listen khởi chạy server là lắng nghe kết nối ở port 3000. Nó sẽ phản hổi "Hello World!" cho get request cho URL root (/). Với những path khác, sẽ phản hồi với *404 Not Found*.

## Run app

Chạy command:

```
node app.js
```

Sau khi chạy command, load http://localhost:3000/ trên browser vầ xem kết quả. Bạn sẽ nhìn thấy “Example app listening on port 3000!” log ở trong command line.

![](https://images.viblo.asia/7aa62ca7-bb26-45c8-bbf1-ccf07b8e5873.png)

Done. Bạn đã tạo được ứng dụng Node đầu tiên thành công với output rất khủng khiếp và phức tạp! (đùa thôi). Đừng dừng lại ở đây, hãy tiếp tục khám phá thế giới tuyệt đpej của Node.js với rất nhiều thứ thú vị đang chờ đợi.

Sau khi hoàn thành thì cấu trúc thư mục sẽ như này:

![](https://images.viblo.asia/13d4fe78-0676-46ed-87af-6b6e48def43c.png)
Xanh lá là folder, xanh da trời là file

Cảm ơn mọi người đã đọc bài của mình :D