###  Giới thiệu

   Trong thế giới lập trình thì chắc hẳn đâu đâu bạn cũng sẽ gặp phải javascript, và bạn có thể tưởng tượng được rằng javascript 
   ngày càng lón mạnh và phát triển như thế nào.
     
   Trên phương diện về desktop app thì nổi bật có Electron. Là một nền tảng phát triển phần mềm được Github xây dựng, 
   Electron sẽ cho phép các lập trình viên có thể dùng JavaScript cùng các ngôn ngữ căn bản khác của web như HTML và CSS để tạo ra 
   các ứng dụng desktop chạy được trên Windows, Linux và Mac OS X.
  
 ### Viết một ứng dụng cơ bản
  Theo như sự phát triển, bản chất một ứng dụng Electron sẽ giống như là một ứng dụng Nodejs. Bắt đầu chương trình thì vẫn sẽ có package.json, 
  giống hệt với module Nodejs. Một ứng dụng Electron cơ bán nhất sẽ có cấu trúc như sau:
  
```
   your-app/
├── package.json
├── main.js
└── index.html
```

 Tạo mới một folder trống cho ứng dụng Electron của bạn. Mở command line và chạy lệnh npm int trên chính thư mục đó.
 
` npm init`
 
 npm sẽ hướng dẫn bạn tạo một file package.json cơ bản. Sau khi đã chạy xong,  nội dung bên trong file package.json 
 sẽ có thể trông như thế này:
 
```
 {
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```
 
 Chú ý: Nếu trường chính không có trong package.json, Electron sẽ cố gắng tải một file index.js (như trong Nodejs). 
 Nếu đây là một ứng dụng đơn giản, bạn sẽ thêm một start script để thực thi package hiện tại:
 
 ```
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

 Thay đổi ứng dụng Node này thành ứng dụng Electron khá đơn giản, chúng ta chỉ cần thay thế "start": "node  ." bằng "start": "electron  ."
 
```
 {
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

### Cài đặt Electron

 Tại thời điểm này, bạn sẽ cần phải cài đặt electron. Cách làm được khuyên dùng là cài đặt nó dưới dạng development 
 trong ứng dụng của bạn, cho phép bạn làm việc trên nhiều ứng dụng với các phiên bản Electron khác nhau. 
 Để làm như vậy, hãy chạy lệnh sau từ thư mục của ứng dụng của bạn:
 
` npm install --save-dev electron`
 
### Thử một ví dụ mẫu

 Chú ý: bạn phải cài git và npm thì mới chạy thử được ví dụ này.
 
 Clone và run code từ https://github.com/electron/electron-quick-start
 
* Clone the repository 
`git clone https://github.com/electron/electron-quick-start`
* Go into the repository
`cd electron-quick-start`
* Install dependencies
`npm install`
* Run the app
`npm start`

### Thành quả

![](https://images.viblo.asia/7ee16d91-1c10-45d5-849c-e1a2c76ebe5c.PNG)

### Nguồn tham khảo

   https://electronjs.org/docs/tutorial/first-app