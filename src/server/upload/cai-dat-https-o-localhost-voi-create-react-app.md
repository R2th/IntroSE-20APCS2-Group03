Khi tạo một Project bằng `create-react-app` và start dự án sẽ nhìn thấy `http://localhost:3000`. Những khi bạn muốn test app của bạn ở trên `https` thì cần phải làm như thế nào.

Để giải quyết vấn đề trên, hôm nay mình sẽ nói về vấn đề tạo `SSL certificate` để có thể sử dụng `https` trên `localhost`


`create-react-app` là một cách tạo nhanh và đơn giản dự án React.

```
npx create-react-app https-local-app
cd https-local-app
npm start
```

Sau khi chạy xong những bước trên. App của chúng ta sẽ chạy ở  `http://localhost:3000`


## 1. Thêm HTTPS
Ở file `package.json`, cập nhật đoạn `start script`

```
"scripts": {
    "start": "HTTPS=true react-scripts start",
    ...
}
```

Chạy lại `npm start` and màn hình trình duyệt của bạn sẽ hiển thị như thế này:

![](https://images.viblo.asia/7839e0c3-62a4-4eae-abb7-f76a5f7c04a9.png)

## 2. Tạo SSL Certificate
Ở bước trước, chúng ta đã set để cho phép app chạy https. Nhưng bạn chưa có một `SSL Certificate`, vì vậy kết nối của bạn hiển thị trên màn hình không được bảo mật. Vì vậy bây giờ chúng ta tạo `SSL Certificate` mà nó làm việc trên `localhost`. Cách đơn giản nhất để có được `SSL Certificate`, ta sử dụng một `tool` được gọi là  [mkcert](https://github.com/FiloSottile/mkcert)

Tham khảo link [mkcert](https://github.com/FiloSottile/mkcert) để cài đặt tool cho từng hệ điều hành. Ở đây mình dùng macOS

```
# Cài đặt mkcert tool
brew install mkcert

# Thiết lập mkcert trên máy tính của bạn (Tạo a CA)
mkcert -install
```

Sau khi chạy dòng lệnh trên, bạn sẽ có thể tạo được `CA` (certificate authority) trên máy tính của mình. CA đảm bảo bạn tạo nhiều `certificates` cho tất cả những dự án trong tương lai

Từ thư mục root của dự án. Bạn chạy dòng lệnh sau:

```
# tạo thư mục .cert nếu nó chưa tồn tại
mkdir -p .cert

# Tạo một certificate (chạy từ thư mục root của dự án)
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```

Chúng ta sẽ lưu `certificate` đã được tạo in thư mục `.cert`. Thư mục này sẽ không commit trên repo, nên bạn cần bỏ qua thư mục này ở trong file `.gitignore`
## 3. Thêm SSL Certificate trong start script
Tiếp theo, chúng ta cần cập nhật `start script` với `certificate` đã được tạo mới:
```
"scripts": {
    "start": "HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}
```
Khi bạn chạy `npm start` lại, bạn sẽ thấy kết nối của bạn đã được bảo mật và sử dụng `https` ở `localhost` như hình bên dưới

![](https://images.viblo.asia/b79168af-de27-4eab-b3ae-9a1d360a1ee6.png)