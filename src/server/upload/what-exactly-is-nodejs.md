Nodejs là một runtime (run-time system: phần mềm được thiết kế để chạy các chương trình máy tính với một hoặc nhiều ngôn ngữ xác định). 

Vậy nó làm việc như thế nào? 

Nó được xây dựng trên nền V8 javascript engine – cỗ máy thực thi mã javascript của trình duyệt nổi tiếng Chrome. Nói cách đơn giản, Nodejs giúp server của chúng ta có thể được viết bằng javascript. 

Node.js có thể chạy được trên nhiều nền tảng khác nhau như Windows, Linux hay Mac OS. Node.js được phát triển sử dụng V8 Engine là bộ thư viện JavaScript được Google phát triển để viết trình duyệt web Chrome.

Node.js xuất hiện khi các JavaScript developer mở rộng nó từ thứ mà bạn chỉ có thể chạy trên trình duyệt tới thứ mà bạn có thể chạy trên máy của mình như một ứng dụng độc lập.

Bây giờ bạn có thể làm nhiều với JavaScript hơn là chỉ tạo các trang websites tương tác với nhau.

JavaScript bây giờ có khả năng làm những việc mà các ngôn ngữ kịch bản khác như Python có thể làm.

Cả JavaScript và Node.js đều chạy trên môi trường V8 JavaScript runtime - một trình thông dịch JavaScript cực nhanh chạy trên trình duyệt Chrome. Công cụ này lấy các đoạn mã JavaScript và chuyển đổi chúng thành một mã máy đơn giản. Mã máy là loại mã cấp thấp mà máy tính có thể chạy mà không cần phải thông dịch nó lần đầu tiên.

## Why Node.js?

Dưới đây là định nghĩa chính thức được đưa ra trên trang web chính thức của NodeJs:

> Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine.

>
>Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

>
>Node.js’ package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

Như bên trên chúng ta đã thảo luận câu định nghĩa đầu tiện "Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine". Vậy bây giờ chúng ta sẽ tìm hiểu hai câu còn lại để tìm hiểu tại sao có Node.js lại có thể phổ biến đến thế.

I/O đề cập đến input/output. Nó có thể là bất cứ điều gì khác nhau, từ đọc/viết các tập tin trên local để tạo để thực hiện yêu cầu HTTP đến một  API.

I/O rất mất thời gian và do đó nó chặn các chức năng khác.

Hãy xem một kịch bản đưới đây. Xét trường hợp chúng ta yêu cầu lấy dữ liệu chi tiết của user1 và user2 từ database và sau đó in chúng ra màn hình / console. Kết quả phản hồi có thể sẽ mất thời gian nhưng cả 2 yêu cầu truy vấn dữ liệu người dùng có thể được tiến hành 1 cách độc lập tại cùng 1 thời điểm.

![](https://images.viblo.asia/934ab3b8-ce07-4120-98a1-714a5cd74f3d.png)

                                 Blocking I/O (bên trái) với Non-Block I/O (bên phải)

## Blocking I/O

Trong phương pháp chặn, yêu cầu dữ liệu của user2 không được bắt đầu cho đến khi dữ liệu user1 được in trên lên màn hình trình duyệt.

Nếu đây là một web server, chúng ta sẽ phải bắt đầu một luồng mới cho mỗi người dùng mới. Nhưng JavaScript là single-threaded (không hẳn là thật sự nhưng nó có một vòng lặp sự kiện đơn luồng mà chúng ta sẽ thảo luận sau). Chính điều này khiến cho JavaScript không phù hợp lắm cho tác vụ đa luồng.

Đó là lý do vì sao non-blocking ra đời.
## Non-blocking I/O

Mặt khác khi yêu cầu sử dụng non-blocking, bạn có thể bắt đầu yêu cầu dữ liệu cho user2 mà không cần phải chờ phản hồi yêu cầu cho user1. Bạn có thể khởi tạo cả hai yêu cầu song song.
    
 Non-blocking I/O loại bỏ sự cần thiết của multi-threading, bởi vì server có thể sử lý nhiều requests trong cùng một thời điểm. 
## The JavaScript event loop
Nếu bạn có 26 phút, hãy xem video tuyệt vời này giải thích  về Node Event Loop:

https://www.youtube.com/watch?v=8aGhZQkoFbQ

Dưới đây là lời giải thích từng bước ngắn gọn về cách hoạt động của JavaScript Event Loop.
![](https://images.viblo.asia/83ce70a4-2c0a-499a-9377-1d43b57776fe.png)                                                         

1. Chèn main() vào ngăn xếp đợi thực hiện(call stack).
2. Chèn console.log() vào call stack. Hàm này chạy ngay lập tức, và được đưa ra khỏi stack.
3. Chèn setTimeout(2000) vào ngăn xếp. setTimeout(2000) là một Node API. Khi chúng ta gọi nó, chúng ta đăng ký 1 cặp event-callback. Sự kiện sẽ đợi 2000 mili giây, sau đó gọi lại function ....
4. Sau khi đăng ký nó trong các API, setTimeout(2000) được bật ra từ call stack.
5. Bây giờ setTimeout(0) thứ hai được đăng ký theo cùng một cách. Bây giờ chúng ta có hai Node API đang đợi để thực hiện.
6. Sau khi chờ 0 giây, setTimeout(0) được chuyển đến hàng đợi callback, và điều tương tự cũng xảy ra với setTimeout(2000).
7. Trong hàng đợi callback, các function chờ đến khi call stack trống, bởi vì chỉ một câu lệnh có thể thực hiện tại một thời điểm.Điều này được thực hiện bởi vòng lặp event.
8. Console.log() cuối cùng chạy, và main() được xuất hiện từ call stack.
9. Vòng lặp event thấy rằng call stack trống và hàng đợi callback không trống. Vì vậy, nó di chuyển các callbacks (theo thứ tự first-in-first-out) tới call stack để thực hiện.

## npm

Tại đây là những thư viện được xây dựng bởi cộng động, hầu như đều miễn phí, sẽ giải quyết hầu hết các vấn đề chung của bạn. Npm (quản lý gói Node) có các gói bạn có thể sử dụng trong các ứng dụng của mình để làm cho sự phát triển của bạn hơn và hiểu quả hơn.

## Require

Có 3 điều cần chú ý:
* Nó tải các modules đi kèm cới Node.js giống như hệ thống file và HTTP từ API Node.js.
* Nó tải các thư viện của bên thứ ba như Express và Mongoose mà bạn cài đặt từ npm.
* Nó cho phép bạn yêu cầu các tệp của riêng bạn và module hóa dự án.
Yêu cầu là một hàm, và nó chấp nhận một tham số "đường dẫn" và trả về `module.exports`.

## Node Module
Node Module là một khối mã có thể sử dụng lại,  bởi những đoạn mã trùng lặp hoặc tồn tại mà không ảnh hưởng đến các đoạn mã khác.

Bạn có thể viết các module của riêng bạn và sử dụng nó trong các ứng dụng khác nhau. Node.js có một tập hợp các module tích hợp mà bạn có thể sử dụng mà không cần cài đặt thêm.

## V8 Turbo-charges JavaScript by leveraging C++
V8 là một cỗ máy mã nguồn mở được viết bằng C++.

JavaScript -> V8(C++) -> Machine Code

V8 thực hiện một kịch bản được gọi là ECMAScript như được quy định trong ECMA-262. ECMAScript được tạo ra bởi Ecma International để chuẩn hóa JavaScript.

Về cơ bản, điều này cho phép bạn thêm các tính năng vào JavaScript bằng cách nhúng V8 vào mã C ++ để mã C ++ của bạn hiểu rõ hơn những gì tiêu chuẩn ECMAScript quy định khác.
## Events
Đôi khi có điều gì đó có thể xảy ra trong ứng dụng mà chúng ta có thể phản hồi:

* Sự kiện hệ thống: C ++ core từ thư viện có tên libuv. (Ví dụ, đọc xong một tập tin).
* Sự kiện tùy chỉnh: JavaScript core.

## Writing Hello World in Node.js
Tạo tệp app.js có nội dung sau:

```
console.log("Hello World!");
```

Mở thiết bị node terminal, thay đổi thư mục thành thư mục nơi tệp được lưu và chạy `node app.js`.

Đó vừa rùi bạn đã viết một chương trình nhỏ bằng Node.js

## Tài liệu tham khảo:
Có rất nhiều tài nguyên mà bạn có thể sử dụng để tìm hiểu thêm về Node.js, bao gồm freeCodeCamp.org.
https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5