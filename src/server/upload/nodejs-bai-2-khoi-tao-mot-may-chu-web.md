Trong bài viết này, chúng ta sẽ thực hiện tạo ra một máy chủ web đơn giản với NodeJS và thảo luận về các công cụ sơ khai được sử dụng.

## Cái máy chủ web trông như thế nào?

Theo mình đoán thì cái máy chủ web chắc là một cái laptop hay máy tính để bàn nào đó giống như chiếc mà bạn đang sử dụng. Bởi vì về cơ bản thì đó cũng chỉ là một chiếc máy tính thôi mà.  :D Điều quan trọng ở đây là phần mềm - Chắc chắn ở đó có một phần mềm luôn luôn vận hành và chờ đợi yêu cầu được gửi đến từ các trình duyệt web để xử lý và gửi thông tin phản hồi lại. Và bây giờ thì chúng ta sẽ tạo ra một phần mềm như vậy chạy ngay trên chiếc máy tính của bạn. :D

Đầu tiên chúng ta cần copy/paste một đoạn code ví dụ từ trang chủ của NodeJS vào một tệp có tên là `server.js`.

```server.js
   /* Creating a server */

const http = require('http');

const handleRequest = function(request, response) {
   response.setHeader('content-type', 'text/plain');
   response.statusCode = 200;
   response.end('Hello NodeJS Server !');
};

const server = http.createServer(handleRequest);

   /* Start running server */

const port = 3000;
const hostname = '127.0.0.1';

const callback = function() {
   console.log('Server is running at...');
   console.log('http://' + hostname + ':' + port + '/');
};

server.listen(port, hostname, callback);
```

Sau đó tại cửa sổ dòng lệnh, chúng ta chạy tệp `server.js` để thử xem có gì được in ra trong `console` không. :D

```CMD.io
node server.js
:: kết quả:
:: 'Server is running at...'
:: 'http://127.0.0.1:3000/'
```

```Terminal.io
node server.js
# kết quả:
# 'Server is running at...'
# 'http://127.0.0.1:3000/'
```

Rồi... xong! Bây giờ bạn thử dùng trình duyệt web truy xuất tới địa chỉ được in ra trong cửa sổ dòng lệnh xem. :D

[http://127.0.0.1:3000/](http://127.0.0.1:3000/)
![](https://images.viblo.asia/660e4cba-e09f-47c2-88fa-5f96e714ce20.png)

Nếu bạn đang có một thiết bị khác nữa ví dụ như điện thoại smartphone, máy tính bảng, hay một chiếc máy tính khác trong cùng mạng Wi-Fi, hãy thử dùng thiết bị đó để truy xuất theo đường dẫn:

`http://địa.chỉ.IP.nội.bộ.máy.tính.của.bạn:3000/`

Như vậy là chúng ta đã có một chiếc máy chủ web đúng nghĩa rồi phải không? :D  Bây giờ nếu như bạn đang sử dụng một đường truyền internet với hợp đồng hơi xịn và được cấp một địa chỉ IP mạng cố định, thì bạn còn có thể nhờ bạn của bạn truy cập từ một nơi khác tới với đường dẫn dưới đây để xem `server` của bạn đã hoạt động `online` được chưa. :D

`http://IP.nhà.mạng.cung.cấp.cho.bạn/IP.nội.bộ.của.bạn:3000/`

Rồi sau đó bạn có thể thuê một tên miền đẹp đẹp như kiểu `tên-của-bạn.vn` và nhờ công ty phân phối tên miền xử lý giúp thao tác trỏ về địa chỉ trên; Như vậy là bạn đã có một trang web `online` với chiếc máy chủ web miễn phí rồi. :D

## Máy chủ web online miễn phí cho các ứng dụng NodeJS cỡ mini

Tới đây mình muốn giới thiệu tới bạn một trang web miễn phí host cho nhu cầu sử dụng đơn giản như làm blog cá nhân. Và đặc biệt là trang web này được tạo ra cho những người đang tự mầy mò học lập trình NodeJS như chúng ta. :D

`Glitch` - [https://glitch.com/](https://glitch.com/)

`Glitch` hoàn toàn miễn phí với nhu cầu sử dụng đơn giản với tổng thời gian online của ứng dụng NodeJS mà bạn đặt tại đó là `1000 giờ/1 tháng`. Vậy là danh sách những công cụ `miễn phí` để học tập và làm việc của chúng ta đã lại dài thêm một chút nữa rồi. :D Điều đáng nói là sau khi đăng ký tài khoản thành viên của `Glitch` và tạo một dự án `project` thì chúng ta có luôn một trình soạn thảo code `online`.

![](https://images.viblo.asia/5363a0fa-a200-42f8-9d13-b25c66d66550.png)

Thanh điều khiển ở phía bên dưới màn hình cũng có phần mở cửa sổ dòng lệnh `Terminal` và nút `Preview` để mở và xem kết quả vận hành của trang web mà chúng ta đang xây dựng.

![](https://images.viblo.asia/fc1bdde9-5fe2-477c-bf26-fcfadca43099.png)

Mặt khác nữa là tên miền của `Glitch` cũng khá đẹp phải không? :D  Như vậy là có khả năng bạn sẽ không phải tốn tiền thuê tên miền cho trang blog cá nhân, và chiếc máy tính của bạn cũng có thể được nghỉ ngơi chứ không phải online 24/24. :D

`Github Pages` thực sự cũng rất tuyệt cho nhu cầu blog cá nhân nhưng phần mềm ứng dụng ở phía `server-side` được cố định là `Jekyll` và chúng ta không thể thay đổi được. Sau khi xây dựng xong một blog đơn giản bằng `NodeJS` và `Glitch`, rất có thể chúng ta sẽ nghĩ tới việc làm một trang blog khác để tận dụng hết khả năng của `Github Pages`. :D

Tuy nhiên thì bây giờ chúng ta nên đánh dấu và lưu lại mọi dự định khác để dành thời gian học thêm kiến thức về NodeJS đã. :D

## Những điểm cần quan tâm trong đoạn code server đầu tiên

Về mặt tổng quan, phần code ví dụ mà chúng ta mới copy/paste từ trang chủ của NodeJS cũng không quá khó hiểu phải không? :D Ở đây chúng ta có 2 thao tác chính là -

- Tạo ra một `object` mô phỏng phần mềm có tên là `server` được gắn kèm một hàm xử lý yêu cầu `handleRequest`.
- Khởi chạy phần mềm `server` bằng cách gọi phương thức `listen` với các giá trị truyền vào mô tả đường dẫn để truy cập tới trang web; Và một hàm gọi lại `callback` sẽ được thực thi sau khi phần mềm `server` khởi động xong - tức là khi phương thức `listen` được thực thi xong.

Về hàm gọi lại `callback` thì chúng ta đã nói đến trong bài viết [[JavaScript] Bài 11 - Hàm & Vùng](https://viblo.asia/p/63vKjAaR52R). Tuy nhiên phần viết về hàm `callback` thì mình bổ sung hơi muộn, vì vậy nên nếu như bạn đọc bài đó từ sớm và không thấy nói tới `callback` thì thông cảm cho mình nhé - mấy ngày gần đây mình đãng trí lắm. :D

Đoạn code khởi chạy phần mềm `server` ở phía bên dưới trông khá dễ hiểu. Do đó điểm chính mà chúng ta cần quan tâm tới lúc này có lẽ là hàm xử lý `handleRequest`. Bởi vì về cơ bản thì phần mềm này đã hoạt động được khi chúng ta gửi yêu cầu tới bằng cách dùng trình duyệt truy xuất vào địa chỉ [http://127.0.0.1:3000/](http://127.0.0.1:3000/) với vai trò là một người dùng đang muốn xem nội dung của trang web. Việc cần làm bây giờ là chúng ta cần gửi trang chủ `index.html` mà chúng ta đã có tới cho người dùng chứ không phải là một dòng thông báo như trong code ví dụ.

Cụ thể hơn là chúng ta sẽ cần tìm hiểu cách làm thế nào để truy xuất nội dung của một tệp `index.html` đã được lưu trữ trong chiếc máy chủ của chúng ta. Rồi sau đó tiếp tục tìm hiểu cách làm thế nào để gửi nội dung đó theo dạng phản hồi lại yêu cầu của người dùng.

Bài viết của chúng ta tới đây cũng đã hơi dài quá rồi; Và để duy trì trọng tâm của bài xoay quanh việc giới thiệu và khởi tạo một máy chủ NodeJS, chúng ta sẽ để dành thắc mắc mới nảy sinh cho bài sau. Hãy nghỉ giải lao một chút trước khi tiếp tục. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[[NodeJS] Bài 3 - Gửi Một Tệp HTML Cho Trình Duyệt Web](https://viblo.asia/p/4P856rPG5Y3)