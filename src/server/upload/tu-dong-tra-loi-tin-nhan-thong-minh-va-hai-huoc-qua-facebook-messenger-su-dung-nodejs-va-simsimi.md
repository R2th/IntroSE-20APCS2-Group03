Xin chào các bạn, hôm nay mình sẽ chia sẻ một ứng dụng rất hay dành cho những ai đang sử dụng Facebook Messenger. Đó là tự động trả lời tin nhắn 1 cách thông minh cũng như hài hước bằng cách khá đơn giản là sử dụng package Simsimi và Node.js.
#### Bắt đầu
```shell
$ mkdir facebook-chat && cd facebook-chat // tạo và di chuyển đến thư mục
$ npm init // tạo file package.json, bạn cứ enter cho đến hết là được
$ touch index.js // tạo file index.js
```
Đầu tiên bạn cần cài đặt package cần thiết đó là `facebook-chat-api`, `simsimi` và `dotenv`:
```shell
$ npm install simsimi
$ npm install facebook-chat-api
$ npm install dotenv
```
Tiếp theo trong file `index.js`: 
```js
require('dotenv').config();
var login = require('facebook-chat-api');
const simsimi = require('simsimi')({
	key: `${process.env.KEY}`,
	api: 'http://sandbox.api.simsimi.com/request.p',
	lc: 'vn',
	ft: '1.0'
});

login({
	email: `${process.env.EMAIL}`,
	password: `${process.env.PASSWORD}`
},
(err, api) => {
	if (err) return console.error(err);
	api.listen(function callback(err, message) {
		if (message.type === 'message') {
			simsimi(message.body)
				.then(response => {
					api.sendMessage(`BOT: ${response}`, message.threadID);
					console.log(message.body);
					console.log(`BOT: ${response}`);
					api.markAsRead(message.threadID);
				})
				.catch(err => {
					api.sendMessage(
						'BOT: Tao đang đơ, không trả lời được :)',
						message.threadID
					);
					console.log(err);
				});
		} else {
			api.sendMessage(
				'BOT: Tao đang đơ, không trả lời được :)',
				message.threadID
			);
			console.log(err);
		}
	});
}
);
```
Sau đó các bạn tao thêm file `.env`, sau đó nhập `EMAIL` và `PASSWORD` vào nhé.
Còn 1 phần quan trọng nữa đó là `KEY`.
Vậy `KEY` này lấy ở đâu?


Các bạn truy cập vào địa chỉ [này](http://developer.simsimi.com/) để đăng kí một tài khoản trên Simsimi nhé.
Sau khi đăng kí xong, bạn chạy vào phần api và chọn vào phần `Signup for Trial key` như hình dưới:
![](https://images.viblo.asia/5ca2d140-ed70-4bee-9116-c19c12ca6632.png)
Do đây chỉ là thử nghiệm nên mình sẽ chỉ chọn cái Free để test thôi, còn nếu ai có hứng thú có thể mua với các gói khác nhau :D.

Sau khi đăng kí thành công bạn sẽ có một giao diện như sau: 
![](https://images.viblo.asia/99e410cc-4b2a-43ae-9c30-d42a4f374878.png)
Đây chính là key mà bạn cần tìm, bạn thêm thông số  `KEY` vào file `.env` nhé. 
Cơ mà bạn chỉ được dùng thử 1 tuần, mỗi ngày 100 requests thôi nhé =))) (facepalm).

Vậy là xong rồi, giờ chúng ta chỉ việc chạy thôi
```shell
$ node index.js
```
#### Thành quả
Và đây là kết quả của mình: 
![](https://images.viblo.asia/ea64705c-6e6c-4c94-9937-ed518f3bdf74.png)

Thật ra để làm được như vậy cũng không có gì khó khăn lắm, chỉ việc cài đặt package và gọi đến nó là được. :D 

À còn một lưu ý nữa mà mình thấy đó là nếu bạn gửi ảnh hoặc dữ liệu không phải message thì nó sẽ không thể hoạt động được. 

Cuối cùng, cảm ơn các bạn đã theo dõi và đọc bài viết này. Mình xin dừng bài viết lại tại đây. Có thắc mắc hoặc chia sẻ gì các bạn cứ để lại comment cho mình nhé. Source code mình để trên [Github](https://github.com/phimanh2905/facebookchatbot.git) các bạn có thể xem và tham khảo. Tạm biệt!