### 1. Tổng quan
Ứng dụng Line là gì?
> Thỏa sức gọi điện và nhắn tin miễn phí không giới hạn! LINE là ứng dụng kết nối mới cho phép bạn gọi điện và nhắn tin miễn phí suốt cả ngày dù ở bất cứ nơi đâu.

Ngoài nhắn tin/gọi điện, Line cũng có Channel (giống fanpage như Facebook). Khi người dùng follow kênh của bạn, bạn có thể tương tác/push message/notifycation cho người dùng một cách chủ động. Và nó tích hợp vào hệ thống của bạn khá dễ dàng qua API cung cấp từ Line Develop
Demo nhẹ
- Hệ thống gửi message tới người dùng
![](https://images.viblo.asia/79358319-f69c-413a-8540-11bb5e299e19.png)

- Người dùng nhận được message
-![](https://images.viblo.asia/bed73c07-8200-4311-862f-c66d4bd64d2e.jpg)

Để làm được như trên, ở bài viết này, mình sẽ hướng dẫn cách đăng ký, setting cho tài khoản Line Develop và phần 2 sẽ là code thế nào.

### 2. Setting Line
#### 1. Tạo tài khoản Line Develop
- Tải app Line về điện thoại smartphone [Android](https://play.google.com/store/apps/details?id=jp.naver.line.android&hl=vi)/[iOS](https://apps.apple.com/us/app/line/id443904275)
- Truy cập phần **Cài đặt** > **Quản lý tài khoản** và đăng ký email/mật khẩu để cho phần login vào Line develop qua email

![](https://images.viblo.asia/ac0cc55c-369a-4cae-aac3-ff44ca342aab.png)
- Login vào [Line developer](https://access.line.me/oauth2/v2.1/login?loginState=BbagvU3LHiUBdkhIkCAfiD&loginChannelId=1576775644&returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dprofile%26response_type%3Dcode%26state%3Dj2FCxPSFfslQo9EP%26redirect_uri%3Dhttps%253A%252F%252Faccount.line.biz%252Flogin%252Fline-callback%26client_id%3D1576775644#/) qua địa chỉ email và mật khẩu tạo ở bước trên

Thế là xong phần đăng ký

#### 2. Setting channel Mesaging API
- Tại màn hình [console](https://developers.line.biz/console/?status=success) sau khi login, tạo mời một Provider
![](https://images.viblo.asia/e4a96681-2679-4195-b9c6-e316b086dc76.png)
- Truy cập vào Provider vừa tạo, chọn "Create a new channel" và tạo 2 loại channel sau:
![](https://images.viblo.asia/b38dc16b-acd5-4a06-8a68-e97cb62d8562.png)
- Truy cập vào Channel Mesaging API, tab **Messaging API**, mục *Channel access token* generate access token cho channel và lưu vào một biến **LINE_ACCESS_TOKEN**
![](https://images.viblo.asia/83467e71-c6ab-4e48-8524-b508a72b263f.png)

#### 3. Setting channel Line Login
- Tab **Base settings**, mục *Basic infomation*, copy Channel ID lưu vào biến môi trường **CHANNEL_ID**
- Mục *Channel secret*, copy giá trị lưu vào biến **CHANNEL_SECRET** (Click vào button issue để generate nếu chưa có)
- 
- Tại mục **Linked OA**, bấm edit và chọn Channel Message API đã tạo nhằm mục đích hiển thị button add friend Channel Message API khi end-user allow Line login
![](https://images.viblo.asia/0acf73ec-1d8b-4513-b4a5-0b569cbfb730.png)

### 3. Tổng kết 
Sau phần setting ta có thêm được 3 giá **LINE_ACCESS_TOKEN**, **CHANNEL_ID** và **CHANNEL_SECRET** sẽ dùng trong phần 2 của bài viết....chờ nhé :D