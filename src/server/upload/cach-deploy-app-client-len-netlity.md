# Deploy React Application lên Netlify
Mình vừa mới deploy 1 app bằng react, nên mình muốn chia sẽ với các bạn và vấn đề của mình găp phải khi đưa lên Netlify.

## 1. Đăng nhập
Đầu tiên bạn cần có tài khoản. Netlify cho phép bạn đăng nhập bằng 4 cách Github, Gitlab, Bitbucket và bằng Email.
![](https://images.viblo.asia/8c646cfb-e410-4f1d-a6c9-1738cd4c581f.png)

Sau khi đăng nhập bạn sẽ thấy giao diện như thế này dùng để upload project của bạn lên.
![](https://images.viblo.asia/9c5d3900-c59a-41de-8023-2a8813d5a941.png)

## 2. Deploy sản phẩm lên nào
Đầu tiên chúng ta phải build sản phẩm bằng lệnh:
```
npm run build
```
Sau khi chạy lệnh trên ta sẽ có được 1 thư mục build trong project
![](https://images.viblo.asia/df21f9bf-1001-4b24-973a-cb72e1dceb9a.png)

Đến đây ta sẽ có 2 cách để deploy sản phẩm

### 1. Kéo thả (Drag & Drop)

Netlify rất dễ để sử dụng kéo thả để deploy. Sau khi bạn có thư mục **build** vừa tạo ra khi nãy. Bạn có thể kéo thả thư mục **build** đó vào để tiến hành deploy project của mình lên

![](https://images.viblo.asia/d72bbf6d-073a-4547-a1e4-0f4e730c572a.gif)

### 2. Dùng câu lệnh
Netlify cung cấp cho ta các câu lệnh để có thể deploy với command line.
1. Đầu tiên, chúng ta cần phải cài đặt Netlify CLI với câu lệnh:
```
npm install netlify-cli -g
```

2. Tiếp theo chúng ta phải login Netlify bằng câu lệnh:
```
netlify login
```
Bạn sẽ được dẫn vào trang của Netlify để Authorize
![](https://images.viblo.asia/6e5750b7-950a-4934-b913-1d0be5e848e6.png)

3. Tiếp theo bạn nhập lệnh deploy app:
```
netlify deploy
```

4. Sau khi nhập lệnh sẽ hỏi bạn `"What wơuld you like to do"` hãy chọn `Create & configure a new site` để tạo mới 1 site.

![](https://images.viblo.asia/11547629-b8f9-4bbc-92e4-9ff2a3b7e427.png)

5. Đặt Site name. Bạn có thể enter nếu không muốn đặt tên gì.

![](https://images.viblo.asia/ef062b10-5fa2-4a63-95b3-a286dbd2db6a.png)

6. Chọn account

![](https://images.viblo.asia/10b25909-acbd-40ee-9bb1-6d1c63c9d697.png)

7. Chọn đường dẫn thư mục build

![](https://images.viblo.asia/5493bf15-54f5-4c51-bbbb-f382d4fba9d7.png)

**Chú ý:** nếu không có chọn đường dẫn

   1. Ctrl+C để huỷ deploy. Quay lại project bạn sẽ thấy thư mục mới được tạo ra `.netlify`. 
   2. Mở thử mục này ra bạn sẽ thấy có 1 thư mục `build`, xoá nó đi.
   3. Copy thư mục `build` bên ngoài vào `.netlity`.
   4. Chạy lại lệnh `netlify deploy`

Sau khi hoàn thành bạn sẽ được

![](https://images.viblo.asia/c71d007f-b807-4e3d-970d-582b31401dde.png)

`Live Draft URL` là đường link nháp bạn có thể truy cập vào đây để xem sản phẩm của mình được deploy lên sẽ như thế nào. Khi đã hài lòng với nó bạn thì chính thức deploy nó bằng cách gõ lệnh `netlify deploy --prod` để hoàn thành.

![](https://images.viblo.asia/7a0db012-0a21-4837-84b2-2b14b681f7f7.png)

## Kết

Cảm ơn bạn đã theo dõi đến đây. Sau khi làm xong bạn đã có thể public project của mình lên mạng

Tài liệu tham khảo: 

https://www.freecodecamp.org/news/how-to-deploy-a-react-application-to-netlify-363b8a98a985/