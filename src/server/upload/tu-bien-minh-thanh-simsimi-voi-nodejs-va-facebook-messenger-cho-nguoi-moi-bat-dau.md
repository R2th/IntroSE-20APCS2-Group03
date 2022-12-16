Chào các bạn, chắc các bạn cũng chẳng lạ gì với chú gà SimSimi với những câu trả lời bá đạo đã từng là hot trend một vài năm trước đây nhỉ. Hôm nay chúng ta sẽ tự biến facebook messenger của mình "cosplay" thành chú gà này nhé =))
( Khuyến khích các bạn nên dùng nick phụ thôi nha, do có sử dụng email, mật khẩu đăng nhập và sử dụng module bên thứ 3 nên mình không thể kiểm soát được )
CÔNG CỤ CẦN DÙNG:

* Nodejs
* Facebook Chat Api
* Axios
* Simsimi Api ( Do đây không phải api chính thức của simsimi nên mình sẽ dùng server của mình lọc response )
* Một tài khoản facebook clone để test
Đầu tiên các bạn cần cài đặt NODEJS, nếu chưa biết cách cài thì các bạn tìm hiểu ở link này :
https://nodejs.org/en/download/package-manager/ .Sau khi download nodejs thành công bạn vào cmd hoặc terminal gõ
```
node -v
```
Nếu hiện ra phiên bản hiện tại của bạn như hình thì đã ok rồi đó.
![](https://images.viblo.asia/a3f50f1f-498e-4848-bffb-fbcdcfcb4942.png)
Tiếp theo chúng ta tạo một folder mới rồi khởi tạo project trong folder đó nha
Trong folder mới bạn bật terminal hoặc cmd lên rồi gõ :
```
npm init
```
Sau đó nhập thông tin hoặc nhấn enter để tạo project theo default.
Tiếp theo, bạn cần cài package Facebook Chat Api, tiêp tục bạn gõ lệnh:
```
npm install facebook-chat-api
```
Đợi một lúc để npm cài đặt package nhé.
Sau khi cài đặt thành công sẽ có thông báo như hình dưới.

![](https://images.viblo.asia/a3f50f1f-498e-4848-bffb-fbcdcfcb4942.png)

Tiếp theo bạn tạo một file có tên index.js rồi nhập đoạn code sau đây vào:
```
const login = require("facebook-chat-api");

// Create simple echo bot
login({email: "FB_EMAIL", password: "FB_PASSWORD"}, (err, api) => {
    if(err) return console.error(err);

    api.listen((err, message) => {
        api.sendMessage(message.body, message.threadID);
    });
});

```
Phần FB_EMAIL và FP_PASSWORD bạn nhập email và password của mình vào.
Mở terminal lên ta gõ lệnh
```
node index
```
Đoạn code trên sẽ tạo một server chatbot tự động trả lời tin nhắn giống hệt tin nhắn nó nhận được.Nếu trên terminal chạy như hình dưới thì là server đang chạy đó.
![](https://images.viblo.asia/5731514e-dc06-464d-9eca-e89ccaea3e31.png)

Bây giờ ta dùng facebook clone nhắn tin cho chính mình xem sao :))

![](https://images.viblo.asia/64d2ba7f-aa1e-4790-b30d-239ac702a4a3.png)

Ngon, giờ tiêp tục gán linh hồn của chú gà SimSimi cho em ấy nào.

Bây giờ chúng ta sẽ dùng thêm package Axios để gửi request đến api Simsimi:
```
npm i axios
```
Sau khi cài axios ta sửa lại code trong file index.js như sau:
```
const login = require("facebook-chat-api");
const axios = require("axios");

login({email: "FB_EMAIL", password: "FB_PASSWORD"}, (err, api) => {
    if(err) return console.error(err);

    api.listen((err, message) => {
      axios.get('http://api.minhhieu.asia/vi.php',{params:{text:message.body}})
      .then( response =>{
        api.sendMessage(response.data, message.threadID);
      } )

    });
});
```
Đoạn code trên sẽ lắng nghe tin nhắn đến của bạn, gửi request đến Simsimi Api và lấy response trả về để trả lời.
Ta chạy lại server:
```
node index
```
Nếu server chạy ngon, không báo lỗi gì thì ta đã thành công rồi đó.

![](https://images.viblo.asia/02d24092-0f69-4aa3-8154-e635adbf055a.png)

Sau đó chúng ta vào facebook clone nhắn cho nick chính và tận hưởng thành quả thôi :))
![](https://images.viblo.asia/07de09e4-55f8-4fd5-bd27-94cdbe5bcd37.png)



-----
Bài viết được trích từ trong blog của mình `http://www.minhhieu.asia/tu-bien-minh-thanh-simsimi/`. Do mới tập viết blog nên còn có những chỗ sai sót, mong được các  bạn góp ý. Many thanks =))