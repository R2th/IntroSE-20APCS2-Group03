# 0. Mở đầu.
- Xin chào các bạn, sau một loạt bài hướng dẫn "HỌC REACTJS THÔNG QUA VÍ DỤ" thì chắc hẳn các bạn đã biết cách xây dựng cho mình những project Reactjs với những chủ để là những vấn đề hay gặp trong thực tế. Vậy làm thế nào project của bạn có thể deploy để mọi người cùng biết đến. Chính vì vậy hôm nay sau khi kết thúc chuỗi bài học reactjs thông qua ví dụ mình xin hướng dẫn các bạn làm thêm một bước cuối cùng nữa là deploy project reactjs lên firsebase. Cùng theo dõi bài viết của mình nhá.
# 1. Chuẩn bị Project.
- Trước khi deploy thì chắc chắn là bạn đã có một project, để cho nhanh mình sử dụng react-create-app để tạo nhanh 1 project react nhá:(Trước khi chạy create-react-app bạn sẽ cần install Node.js . Nếu đã install rồi thì chúng ta hãy tiếp tục với lệnh)
```javascript
npm install -g create-react-app
```
Sau khi chạy hãy thử tạo ứng dụng với các lệnh :
```javascript
create-react-app myapp
cd myapp
npm start
```
Sau khi cài đặt thành công chúng ta sẽ có kết quả như sau:
![](https://images.viblo.asia/230880c3-a2fa-4855-9cd5-4d2d0a7291a4.png).
# 2. Deploy react app lên firebase.
## Bước 1: Đăng kí tài khoản và tạo mới project  trên firsebase.
- bạn truy cập vào đường dẫn này sau đó nhấn vào dấu (+) để taọ mới project như hình vẽ:
![](https://images.viblo.asia/052ff177-0c36-4282-b711-919af307127a.png)
- sau đó đăng kí tên project.
![](https://images.viblo.asia/01400efd-fe1a-4325-8eed-e22e59178812.png)
- Bạn tiếp tục nhấn continue để hoàn thành nhé.

## Bước 2: Sử dụng các lệnh trên terminal để deploy.
### Bước 2.1: install Firebase CLI bằng lệnh :
```
npm install -g firebase-tools
```
sau đó 
```javascript
firebase init
```
### Bước 2.2: 
- Sau đó, chọn tùy chọn Hosting. Nếu bạn quan tâm đến việc sử dụng một công cụ khác để lưu trữ ứng dụng Firebase của mình, hãy chọn tùy chọn khác:
![](https://images.viblo.asia/47c5ef23-5273-4f00-9ef6-0ca106dfec54.png)
### Bước 2.3: 
Vì Google biết về các dự án Firebase được liên kết với tài khoản của bạn sau khi đăng nhập, bạn có thể chọn dự án Firebase của mình từ danh sách các dự án từ nền tảng Firebase:
![](https://images.viblo.asia/bb832bf2-c5ed-474a-9bef-00360380dc17.png)
### Bước 2.4: 
đặt tên thư mục để  build - thông thường mình sẽ đặt luôn tên thư mục là "build" luôn.
![](https://images.viblo.asia/f0a12186-da90-459e-bb67-9eaf6a77d496.png)
### Bước 2.5:  chạy lệnh deploy.
```javascript
firebase deploy
```
sau khi chạy xong nó sẽ ra như sau: sẽ chứa url web của bạn: 
```javascript
Project Console: https://console.firebase.google.com/project/my-react-project-abc123/overview
Hosting URL: https://my-react-project-abc123.firebaseapp.com
```
## 3. Kết luận.
vậy những thao tác đơn giản mình đã hướng dẫn các bạn deploy lên firebase, Chúc các bạn thành công và hẹn gặp lại các bạn trong những bài viết tiếp theo nhé.