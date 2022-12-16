![](https://images.viblo.asia/35641535-edd4-4d24-959d-7370510c13cd.png)
Google đã cung cấp một số dịch vụ như firebase cho phép chúng ta xây dựng một backend mà không phải lo lắng về việc lưu trữ, cấu hình và bảo mật. Quan trọng hơn nữa là nó miễn phí.
Đó là lý do tại sao, trong bài viết này mình sẽ chia sẻ một cách để giả lập máy chủ với Firebase Cloud Function.
### 1. Create the Firebase project

Đầu tiên, chúng ta cần vào bảng điều khiển Firebase và tạo một dự án.
![](https://images.viblo.asia/b146d4ff-e2b5-4418-8288-a37419c37812.png)
![](https://images.viblo.asia/2457ce8b-e0b1-4243-9c99-e66f1c264cf0.png)
Dự án Firebase được tạo, đã đến lúc bắt đầu các project files.

Để làm điều này, chúng ta cần trình quản lý package npm. Vì vậy, hãy kiểm tra nếu nó được cài đặt trên máy tính bằng cách chạy lệnh này:
![](https://images.viblo.asia/24ff2bd1-94e9-4d06-9044-25d40475c3a4.png)

Nếu lệnh này không được tìm thấy. Truy cập trang web NPM và nhấp vào Tải xuống Node.js và npm: 
https://www.npmjs.com/get-npm

Bây giờ chúng ta đã cài đặt npm, chúng ta có thể chạy các lệnh sau
```
> npm cài đặt -g firebase-tools  # install các công cụ firebase
> mkdir MockGithub  # tạo một thư mục
> cd MockGithub  #navigate vào thư mục này
> firebase init  #initiate dự án máy chủ
```
Trong phần đầu tiên, chúng ta phải chọn “Functions” , với phím cách và sau đó nhấp Enter để tiếp tục.
![](https://images.viblo.asia/276b7dbb-eed4-477a-aa6f-77f89bfe2001.png)

Tiếp theo đó ta sẽ chọn ngôn ngữ Javascript/Typescript language cho phép ta config một số tệp mặc định. Bạn có thể xem hình bên dưới
![](https://images.viblo.asia/85c2d979-1770-4200-aded-209841400e1e.png)

Nó sẽ kết thúc bằng một thông báo thành công. Một firebase.json và một functions/. 

Hãy kiểm tra mẫu phản hồi từ API Github REST thực sự với CURL hoặc ứng dụng thử nghiệm API như Insomnia để có thể sao chép nó. https://insomnia.rest/

Tôi cố gắng tìm thông tin tài khoản github của mình bằng cách gọi URL:
```
https://api.github.com/users/:login
```
![](https://images.viblo.asia/f78bb446-6c6d-4a8b-baa0-8e4bad4b5b2f.png)
![](https://images.viblo.asia/ac511a6d-d44d-483e-a514-447299bcb115.png)
### 2. Config Router
Chúng ta có thể thấy rằng phản hồi là một đối tượng JSON đơn giản với một số trường.
Tiếp theo chung ta sẽ cài express trong dự án để tuy chỉnh router (đừng quên tùy chọn lưu để tự động thêm nó vào danh sách các phụ thuộc trong pack.json ).
```
> npm install express --save
```
 Mình sẽ mở tệp  functions/index.js và tiến hành configure routes như bên dưới:

```
var functions = require('firebase-functions')
var express = require('express')
// for typescript use :
// import * as functions from 'firebase-functions'
// import * as express from 'express'

const app = express();

// listen the path suffix /:login
app.get('/:login', (req, res) => {
    switch(req.params.login.toLowerCase()){ // test the :login value
        case "earlmegget21":
            res.send({
                id: 1234, 
                name: "Rudy Sonetti", 
                login: "EarlMegget21"
            })
            break;
        case "florent37":
            res.send({
                id: 2000, 
                name: "Florent Champigny", 
                login: "florent37"
            })
            break;
        default: // send an error otherwise
            res.status(404).send({message: "User not found"})
    }
});

// listen the path prefix /users
exports.users = functions.https.onRequest(app);
```
Trong đoạn mã trên, máy chủ của mình lắng nghe URL:  /users/:login với param là login
Response chúng ta nhận được là một object JSON với id, name, login. Nếu rơi vào trường hợp ERROR sẽ trả ra mã lỗi là 404.
Bây giờ chúng ta sẽ tiến hành deploy bằng câu lệnh bên dưới:
```
> firebase deploy
```
![](https://images.viblo.asia/08f4ea21-baec-4299-8f8f-b6b738bc2833.png)
Khi hoàn tất chúng ta sẽ có một api link: 
```
https://us-central1-mockgithub-18fe8.cloudfifts.net/users/:login
```
Tiến hành kiểm tra:
![](https://images.viblo.asia/6394df55-c707-495c-ad25-9b484fd2609e.png)
Bạn có thể xem toàn bộ mã trên link github:

https://github.com/EarlMegget21/MockGithub-FireBase
Một ứng dụng nhỏ trên android để test API
https://github.com/EarlMegget21/MockGithub-Android/
Bài viết của mình tới đây là hết. Cảm ơn mọi người đã đọc.
### 3. THAM KHẢO
https://proandroiddev.com/mocking-a-server-with-firebase-3b4376ce3596?fbclid=IwAR14UNjgdimSnnSfp8q7SnlsxXpwJ7Z2G0V80qpnGsn1Q5WhqaFX3enZ1w8

https://firebase.google.com/docs/functions/get-started?authuser=1

https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c?gi=a23717a08121

https://square.github.io/retrofit/