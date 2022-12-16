# Base project extension
Chúng ta sẽ dùng sẵn template vue-web-extension https://github.com/Kocal/vue-web-extension để cài đặt nhanh 1 extensions cơ bản với vue.

![](https://images.viblo.asia/4ae9d9da-3c3a-4d0e-bad8-ebf42809a8e6.png)


# cài đặt các package liên quan đến pusher socket.io
```
npm install webextension-polyfill pusher-js
```
# Config với pusher
Chúng ta sẽ tạo 1 tài khoản trên pusher và tạo app cho cổng kết nối realtime với channel này
Sau khi tạo app chúng ta sẽ có giao diện như sau:
![](https://images.viblo.asia/f92fe83f-00f5-4c17-93cc-b8255a3eeedc.png)

### Cài đặt Pusher CLI
Mục đích bài viết này là test được tính năng realtime mà extension có thể sử dụng được, nên mình sẽ sử dụng luôn tính năng đẩy event qua CLI của pusher
Các bạn có thể tham khảo thêm tại đây https://pusher.com/docs/channels/pusher_cli/installation

Ở dưới đây mình cài đặt pusher CLI qua ubuntu nên sẽ sử dụng file .deb để cài đặt
https://github.com/pusher/cli/releases
### Login pusher CLI
Chúng ta sẽ vào trang setting của account để lấy được mã API key, nếu chưa có các bạn có thể generate ở bên phải
https://dashboard.pusher.com/accounts/edit
![](https://images.viblo.asia/f08372fb-528c-462d-983f-8184fb702739.png)
```
pusher login
```
chúng ta sẽ điền API key

# Test kết nối
Chúng ta sẽ có lấy app-id để bắn message hello-world
```
pusher channels apps trigger --app-id 994609 \
  --channel my-channel \
  --event my-event \
  --message hello-world
```
ngay tại trang của app pusher chúng ta đã thấy được popup thành công như thế này
![](https://images.viblo.asia/cc0fc8a0-9773-4a16-b73d-75db9f39dcb6.png)

# Config với extensions
Dựa theo các thông tin về app trên pusher chúng ta sẽ dùng thêm key để kết nối với cluster
![](https://images.viblo.asia/205d2614-105e-4bfb-821a-da8d3148e7e6.png)
Tại file `background.js`
```js
const Pusher = require('pusher-js');
const browser = require('webextension-polyfill');

var pusher = new Pusher('bfeb68a74a1fe0f7e52e', {
    cluster: 'ap1'
  });
// phần này là bắt message được đẩy đi
var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        // set badgeText
        browser.browserAction.setBadgeText({ text: data });
    });
```

### Chạy kết quả
```
yarn watch:dev
```
Chúng ta sẽ load folder `dist` với môi trường dev của extensions

![](https://images.viblo.asia/0baac5e7-09eb-4565-81d3-0b95c7e47277.png)

Tiếp tục chạy tiếp đẩy message khác cho extension
```bash
pusher channels apps trigger --app-id 994609   --channel my-channel   --event my-event   --message alert
```
chúng ta nhận được sau khi đẩy message mà không cần phải bật extensions vì extensions nó chạy trong nền trình duyệt
![](https://images.viblo.asia/5f666a71-3cae-47bd-bde4-4ef5c2a0f4ec.png)

# Kết luận
Đây chỉ là ví dụ đơn giản để thử nghiệm tính năng realtime nhận socket.io của client extension. Chúng ta có thể kết hợp chúng để tạo notifications lịch hẹn, thông báo, đánh dấu các dấu mốc, nhắc nhở, cập nhật phiên bản mới