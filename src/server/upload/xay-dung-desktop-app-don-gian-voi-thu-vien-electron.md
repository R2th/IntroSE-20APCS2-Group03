## 1. Giới thiệu
> `Electron` là một thư viện mã nguồn mở được phát triển bởi Github dành cho việc xây dựng các ứng dụng desktop với HTML, CSS và Javascript. Electron hoàn thành điều này bằng cách kết hợp Chromium và Node.js vào nhau để có thể chạy cùng một lúc. Ứng dụng có thể được đóng gói cho cả Mac, Windows và Linux.

Từ khái niệm trên chúng ta đã hiểu rằng để xây dựng một desktop app không còn phức tạp như chúng ta từng nghĩ, bạn đang là một web developer chỉ biết HTML, CSS, javascript bạn vẫn có thể tự tạo cho mình một app dễ dàng và không hề kém chuyên nghiệp.
Bạn đã bao giờ sử dụng skype, slack. Cả hai đều có phiên bản dành cho desktop và chúng hoạt động thực sự mượt mà y như mobile app vậy. Ngoài ra còn rất nhiều ứng dụng đang sử dụng Electron js để xây dựng desktop app, bạn có thể xem trong hình dưới đây:
![](https://images.viblo.asia/cd3898a9-cf19-4c3a-b083-9c84cdd2d803.png)

Electron ra đời năm 2013 và đã trở thành một công cụ phổ biển được sử dụng bởi các nhà phát triển mã nguồn mở. Chỉ cần có kiến thức một chút về web kết hợp với electron là bạn đã có thể tự build cho mình một desktop app với giao diện y hệt như một trang web nhưng lại được mở như một cửa sổ window vậy. Cúng thú vị đúng không :)

## 2. Thử nghiệm
Để chạy thử một ứng dụng electron bạn chỉ cẩn thực hiện các thao tác đơn giản sau và xem kết quả, ở đây mình dùng hệ điều hành ubuntu.
```
$ git clone https://github.com/electron/electron-api-demos
$ cd electron-api-demos
$ npm install
$ npm start
```

Sau khi chạy start bạn sẽ ngay lập tức thấy app của chúng ta xuất hiện
![](https://images.viblo.asia/aa6699f0-a319-4418-bd1c-c1acff0aff7e.png)
Mọi thao tác trên app giống hệt như bạn đang thao tác trên browser vậy, khi build xong app nếu trên window bạn sẽ thấy nó tạo ra file .exe, bạn hoàn toàn có thể sử dụng hoặc gửi file này cho một user khác sử dụng mà không cần build lại hoặc phải có code mới chạy được.

## 3. Hello World!
Để hiểu hơn về cách sử dụng `Electron` chúng ta cùng bắt tay xây dựng một app đơn giản để hiển thị ra `Hello World!`.
Tại thư mục hiện tại chúng ta cùng tạo folder tên là **demo-electron** sau đó:
```
> cd demo-electron
> npm init
```
Trong khi chạy `npm init` chúng ta sẽ bị hỏi điền những thông tin cấu hình, các bạn cứ điền gì cũng được hoặc enter để bỏ qua. Khi hỏi đến phần main (tức là hỏi file js mặc định , ở đây mình đặt là `main.js`)

Sau khi chạy npm init chúng ta đã có file package.json. Tiếp theo đơn giản là install electron như bao thư viện js khác mà chúng ta đã dùng thôi.
```
> npm install --save electron
```

Tiếp theo chúng ta tạo file HTML để load vào trong electron, mình đặt tên là `mainWindow.html`.

Bây giờ cấu trúc thư mục và file package.json sẽ nhìn kiểu thế này:

![](https://images.viblo.asia/3b704351-27e5-4d23-9dea-fcba86d747f2.png)

> Chú ý trong file package.json chúng ta cần thêm lệnh `start` vào mục scripts, để khi chạy `npm start` sẽ gọi command `electron .`

Tiếp theo là 2 file `main.js` và `mainWindow.html` nội dung đơn giản như sau:

![](https://images.viblo.asia/1e8f38d2-f9d1-4284-969a-b7f99aacd796.png)

Như vậy là chúng ta đã code xong một app đơn giản với nội dung là Hello World!
Để test thử bạn chỉ cần chạy `npm start` trong thư mục **demo-electron**.

![](https://images.viblo.asia/2cc92ebd-203a-480f-aae6-a5fcb7faea1d.png)

Và kết quả là chúng ta có một desktop app đơn giản hiển thị dòng chữ Hello World! như thế này.

## 4. Kết luận
Qua ví dụ trên, phần nào giúp bạn hiểu được Electron là gì và cách sử dụng thư viện này như thế nào. Hy vọng các bạn sẽ tiếp tục tìm hiểu để tự phát triển cho mình một Desktop app thú vị. Cảm ơn các bạn đã đón đọc bài viết của mình!

## 5. Tài liệu tham khảo
https://electronjs.org/

https://medium.com/developers-writing/building-a-desktop-application-with-electron-204203eeb658