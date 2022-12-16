![](https://images.viblo.asia/7cb4e436-5e13-46b4-a0f7-3d555895ff58.png)
# Firebase Hosting là gì ?
Firebase hosting là một dịch vụ lưu trữ của Google cung cấp môi trường hosting cho static web một cách an toán, nhanh chóng, dễ dàng và hoàn toàn miễn phí .
# Tại sao lại là Firebase Hosting ?
Hầu hết các dịch vụ web hosting sẽ tính phí hoặc sẽ chậm nếu chúng free , ngoài ra bạn phải trả một khoản phí cho chứng chỉ SSL để chuyển trang web của bạn thành một trang web an toàn với https
Lưu trữ trên Firebase là hoàn toàn miễn phí và theo mặc định nó cung cấp chứng chỉ SSL và nó được cung cấp một tốc độ truy cập đáng ấn tượng ở bất cứ đâu .
# Deploy React app lên Firebase Hosting
## Demo
Trong bài viết này mình sẽ demo deploy một React app lên Firebase Hosting
### React app
Mình sẽ sử dụng **create-react-app myapp** để tạo nhanh một react app 
Trước khi chạy create-react-app bạn sẽ cần **[install Node.js](https://nodejs.org/en/download/)** . Nếu đã install rồi thì chúng ta hãy tiếp tục với lệnh : 
```
npm install -g create-react-app
```
Sau khi chạy hãy thử tạo ứng dụng với các lệnh :
```
create-react-app myapp
cd myapp
npm start
```
Bạn đã vừa tạo dược một React app rồi đấy :
![](https://images.viblo.asia/66d2c93e-1e41-48ac-8f97-85df8dcd4bdf.png)

Sau đó ta sử dụng lệnh 
```
npm build
```
để build code 

### Firebase:
Vào [firebase](https://firebase.google.com/) và đăng nhập với tài khoản Google rồi tạo một project ví dụ firebase-demo

![](https://images.viblo.asia/aa06d0a0-dd2b-4df8-9f70-6e0a48127029.png)

Chọn Hosting 

![](https://images.viblo.asia/ee51bbc5-2f4a-4ad2-8706-753ab2cb7a51.png)

Nhấn Get started rồi install Firebase CLI bằng lệnh :
```
npm install -g firebase-tools
```
Đăng nhập Google và khởi tạo
```
firebase login
firebase init
```
Sau khi init 
* Chọn Hosting 
* Chọn tên project vừa tạo khi nãy
* **What do you want to use as your public directory?**  build
* **Configure as a single-page app (rewrite all urls to /index.html)?** Yes
* **File build/index.html already exists. Overwrite?** No

Chú thích :
* What do you want to use as your public directory?  : ở đây yêu cầu chọn folder để render trang web . Với mặc định sẽ là thư mục tên là public nhưng chúng ta đã chạy npm build và tạo ra được thư mục build nên chọn file build
* Configure as a single-page app (rewrite all urls to /index.html)? : có cấu hình ứng dụng như một single-page app không  ? chúng ta sẽ chọn YES như vậy web sẽ chạy vào index.html . Nếu chọn NO họ sẽ tự tạo ra 1 file build và bên trong chứa file 404.html và index.html
* File build/index.html already exists. Overwrite? : do chúng ta đã build và có file index.html nên ở đây họ hỏi có Overwrite không ? Chúng ta sẽ chọn là NO

![](https://images.viblo.asia/78151bf3-81ce-454f-b178-c6b356d84539.png)

Sau đó firebase sẽ tạo cho chúng ta 2 file là .firebaserc và firebase.json
 
Cuối cùng sử dụng lệnh 
```
firebase deploy
```

Sau đó bạn sẽ đc trả lại Hosting URL

Như vậy là các bạn đã deploy thành công react app lên firebase hosting rồi đấy rất đơn giản phải không nào

Nếu muốn disable project đang chạy sử dụng lệnh 
```
firebase hosting:disable
```

Nguồn tham khảo : https://firebase.google.com/docs/cli/