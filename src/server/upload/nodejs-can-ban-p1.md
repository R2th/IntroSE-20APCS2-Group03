Khi nói đến JavaScript thì đa số anh em sẽ nghĩ ngay đến ngôn ngữ lập trình phía client chạy trên trình duyệt. Nhưng rồi một ngày đẹp trời sự ra đời của NodeJs đã thay đổi cách nhìn về javascript chỉ xử lý ở phía client. NodeJs là một cách để chạy JavaScript trên server. Vậy NodeJS nó là gì? Và làm sao có thể nó có thể xử lý trên server. Nào, chúng ta cùng nhau bắt đầu tìm hiểu :D
## NodeJs là gì
Theo Wikipedia thì `Node.js` là một hệ thống phần mềm được thiết kế để viết các ứng dụng internet có khả năng mở rộng, đặc biệt là máy chủ web. Chương trình được viết bằng JavaScript, sử dụng kỹ thuật điều khiển theo sự kiện, nhập/xuất không đồng bộ để tối tiểu tổng chi phí và tối đại khả năng mở rộng. Node.js bao gồm có V8 JavaScript engine của Google, libUV, và vài thư viện khác
<br>
Node.js được tạo bởi Ryan Dahl từ năm 2009, và phát triển dưới sự bảo trợ của Joyent
<br>
Có rất nhiều sự nhầm lẫn cho những người mới sử dụng `Node` là hiểu sai chính xác nó là gì
<br>
Một điều quan trọng cần nhận ra là `Node` không phải là một webserver. Tự nó không làm gì cả. Nó không hoạt động như Apache. Không có tệp cấu hình nơi chúng ta trỏ đến tệp HTML. Nếu bạn muốn nó là một máy chủ HTTP, bạn phải viết một máy chủ HTTP. `Node.js` chỉ là một cách khác để thực thi mã trên máy tính của bạn. Nó đơn giản là một JavaScript runtime
## Cài đặt nodejs trên ubuntu
### Cài đặt nodejs và npm từ Ubuntu repository
Đầu tiên chúng ta cập nhật các package bằng dòng lệnh:
```
sudo apt update
```
Cài đặt nodejs sử dụng apt package manager:
```
sudo apt install nodejs
```
Để xác minh cài đặt thực hiện lệnh sau:
```
nodejs --version
```
Nếu cài đặt thành công thì kết quả của dòng lệnh trên là:
```
v8.10.0
```
đây là phiên bản hiện tại trên máy của mình
<br>
Để có thể tải xuống các gói npm, bạn cũng cần cài đặt npm, trình quản lý gói Node.js. Để làm như vậy, gõ:
```
sudo apt install npm
```
Để xác minh cài đặt thực hiện lệnh sau:
```
npm --version
```
Nếu cài đặt thành công thì kết quả của dòng lệnh trên là:
```
3.5.2
```
đây là phiên bản hiện tại trên máy của mình
### Cài đặt Node.js từ NodeSource repository
Kích hoạt NodeSource repository bằng lệnh curl sau:
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
```
Lệnh trên sẽ thêm khóa ký NodeSource vào hệ thống của bạn, tạo tệp kho lưu trữ nguồn apt, cài đặt tất cả các gói cần thiết và làm mới bộ đệm apt. Phiên bản LTS hiện tại của Node.js là phiên bản 10.x
<br>
Khi NodeSource được bật, hãy cài đặt Node.js và npm bằng cách nhập:
```
sudo apt install nodejs
```
Gói nodejs này chứa cả `node` và `npm`
<br>
Và kiểm tra cài đặt thành công hay chưa chúng ta kiểm tra version của `node` và `npm` trên máy:
```
node --version
```
và 
```
npm --version
```
## Mô hình quy trình Node.js
### Mô hình máy chủ web truyền thống
Trong mô hình máy chủ web truyền thống, mỗi yêu cầu được xử lý bởi một luồng chuyên dụng từ nhóm luồng. Nếu không có luồng nào có sẵn trong nhóm luồng tại bất kỳ thời điểm nào thì yêu cầu sẽ đợi đến luồng có sẵn tiếp theo. Luồng chuyên dụng thực hiện một yêu cầu cụ thể và không quay lại nhóm luồng cho đến khi hoàn thành thực hiện và trả về phản hồi.
![](https://images.viblo.asia/98b50c56-25c3-4220-8b0a-a4ab0181de95.png)
### Mô hình quy trình Node.js
Node.js xử lý các yêu cầu của người dùng khác nhau khi so sánh với mô hình máy chủ web truyền thống. Node.js chạy trong một quy trình duy nhất và mã ứng dụng chạy trong một luồng và do đó cần ít tài nguyên hơn các nền tảng khác. Tất cả các yêu cầu của người dùng đối với ứng dụng web của bạn sẽ được xử lý bởi một luồng duy nhất và tất cả công việc I / O hoặc công việc chạy dài được thực hiện không đồng bộ cho một yêu cầu cụ thể. Vì vậy, đơn luồng này không phải đợi yêu cầu hoàn thành và được tự do xử lý yêu cầu tiếp theo. Khi công việc I / O không đồng bộ hoàn thành thì nó sẽ xử lý yêu cầu thêm và gửi phản hồi.
<br>
Một vòng lặp sự kiện liên tục theo dõi các sự kiện sẽ được nêu ra cho một công việc không đồng bộ và thực hiện chức năng gọi lại khi công việc hoàn thành. Trong nội bộ, Node.js sử dụng libev cho vòng lặp sự kiện, lần lượt sử dụng nhóm luồng C ++ bên trong để cung cấp I / O không đồng bộ.
![](https://images.viblo.asia/b95e1467-ac15-4b73-be57-4fd00845c441.png)
Mô hình quy trình Node.js làm tăng hiệu suất và khả năng mở rộng. Node.js không phù hợp với một ứng dụng thực hiện các hoạt động đòi hỏi nhiều CPU như xử lý hình ảnh hoặc công việc tính toán nặng nề khác vì phải mất thời gian để xử lý yêu cầu và do đó chặn đơn luồng
## Ứng dụng đầu tiên với Node.js
Khi bạn bắt đầu xây dựng các ứng dụng dựa trên `HTTP` trong `Node.js`, các module `http / https` tích hợp là những module bạn sẽ tương tác. Bây giờ, hãy tạo máy chủ `HTTP Node.js` đầu tiên của bạn. Chúng ta sẽ cần yêu cầu module `http` và liên kết máy chủ của chúng ta với cổng 3000 để lắng nghe.
```js
// nội dung file index.js
const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('Something went wrong', err)
  }

  console.log(`server is listening on ${port}`)
})

```
Bạn có thể bắt đầu với:
```
node index.js
```
Sau đó mở trình duyệt lên và truy cập vào localhost:3000 và kết quả trên màn hình sẽ hiện ra dòng chữ:
```
Hello Node.js Server!
```

Những điều cần chú ý ở đây:
- requestHandler: chức năng này sẽ được gọi mỗi khi có yêu cầu đến máy chủ. Nếu bạn truy cập localhost: 3000 từ trình duyệt của bạn
- Chúng ta sử dụng http đã tạo và gọi phương thức http.createServer () để tạo một máy chủ và sau đó chúng ta liên kết nó tại cổng 3000 bằng phương thức `listen` được liên kết với phiên bản máy chủ
- if (err): xử lý lỗi - nếu cổng đã được sử dụng hoặc vì bất kỳ lý do nào khác, máy chủ của chúng tôi không thể khởi động, chúng tôi sẽ được thông báo tại đây

## Lời kết
Trong bài viết này mình đã giới thiệu với các bạn `nodejs` là gì, cách cài đặt, về mô hình quy trình và cách tạo một ứng dụng đơn giản với module http. Cảm ơn các bạn đã theo dõi bài viết của mình và theo dõi bài viết tiếp theo của mình về `nodejs` <3
## Tài liệu tham khảo
- https://www.tutorialsteacher.com/nodejs/nodejs-process-model