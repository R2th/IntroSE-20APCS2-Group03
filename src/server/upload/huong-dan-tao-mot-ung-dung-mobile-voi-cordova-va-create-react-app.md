![](https://images.viblo.asia/b58182ea-b2c7-4ef5-83e5-d1a81742e372.png)
Trong bài viết này mình sẽ sử dụng Cordova để tạo một ứng dụng có thể chạy trên điện thoại di động từ Reactjs.

# Bắt đầu với Cordova

Đầu tiên mình cài đặt Cordova CLI, và sử dụng nó để tạo project

```
npm install -g cordova
cordova create tomato
```

Lệnh trên sẽ giúp bạn có đầy đủ các file cần thiết để phát triển Cordova app. Trong thư mục trên bạn sẽ thấy cấu trúc thư mục như sau:
![](https://images.viblo.asia/4ef5d836-5134-4a2d-8256-fb55991c11c2.png)

* Config.xml cho phép bạn tuỳ chỉnh thiết lập của ứng dụng. Bạn có thể [xem thêm](https://cordova.apache.org/docs/en/9.x/config_ref/index.html)
* Thư mục hooks có thể đặt các lệnh sử dụng với Cordova CLI. Bạn có thể tích hợp nó với GIT, hoặc viết các lệnh hook của riêng mình.
* Thư mục platforms bao gồm tất cả các file code, cài đặt để tạo ứng dụng tương ứng với nền tảng mà bạn thêm vào như andoird, ios.
* Thư mục plugins bao gồm các plugins của Cordova.
* Thư mục www là nơi đặt code của bạn như html, css, js.

## Thêm Platforms

Trong bài viết mình chỉ thêm cho android, tuy nhiên với IOS bạn cũng có thể theo dõi các bước này một các tương tự. 
Đầu tiên hãy chạy lệnh:
```
cordova platform add android
```
Tiếp theo chạy lệnh `cordova requirements` để kiểm tra bạn đã cài đặt đầy đủ các chương trình mà Cordova yêu cầu cho nền tảng bạn cần phát triển hay chưa.
```
$ cordova requirements
Requirements check results for android:
Java JDK: installed .
Android SDK: installed
Android target: installed android-19,android-21,android-22,android-23,Google Inc.:Google APIs:19,Google Inc.:Google APIs (x86 System Image):19,Google Inc.:Google APIs:23
Gradle: installed
```

Build App
Mặc định bạn đã có sẵn một ví dụ mẫu của Cordova khi tạo thư mục dự án rồi, hãy thử build ra ứng dụng để đảm bảo nó hoạt động chính xác.

```
cordova build andoird
```

Để test ứng dụng mình sử dụng Andoird Studio, mở thư mục `platforms/andoird`. Chọn Run:

![](https://images.viblo.asia/50538cce-6f35-43c7-8901-a038876aada9.png)

Vậy là bạn đã có thể build thành công một ứng dụng andoird với Cordova.

# Cài đặt ứng dụng với Create-react-app

Ở đây mình sử dụng create-react-app
```
npm init react-app app
```

Câu lệnh trên tạo thư mục app bên trong thư mục mà chúng ta tạo bằng Cordova, mình sẽ cần chỉnh lại lệnh build có sẵn của project vừa tạo. Trong file app/package.json thay đổi:
```
"build": "react-scripts build"
```
Thành
```
"build": "react-scripts build && cp -a ./build/. ../www/"
```
Ngoài ra bạn cần khai báo homepage trong package.json:
```
"homepage": "."
```
Trong file `app/src/index.js` thêm đoạn code sau để kiểm tra khi chúng ta mở ứng dụng trên điện thoại:
```js
const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}

```
Trong file `app/public/index.html` thêm:
```
<script type="text/javascript" src="cordova.js"></script>
```
Bây giờ mình đã có thể build ứng dụng được rồi, để tiện thì tạo một file bash `build.sh` để chạy như sau:
```shell
#! /bin/bash

cd ./app && yarn build
cordova build android
```

Sau khi tạo, bạn thêm quyền thực thi câu lệnh cho file:
```
sudo chmod +x build.sh
```

Ở thư mục gốc chạy `./build.sh` và xem kết quả trên simulator:

![](https://images.viblo.asia/378b6464-51e8-43e6-afb9-54bb65a83858.png)

# Tổng kết
Vậy là từ giờ ngoài việc tạo ứng dụng chạy trên trình duyệt, bạn còn có thể tạo thêm cả ứng dụng trên điện thoại dị động nếu muốn ^^