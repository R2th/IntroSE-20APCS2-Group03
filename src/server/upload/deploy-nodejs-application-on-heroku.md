### 1. Mở đầu:
Bài viết này với mục đích giúp các bạn mới bắt đầu muốn deploy 1 ứng dụng Nodejs lên Heroku. Heroku là một cloud platform như một dịch vụ hỗ trợ một số ngôn ngữ lập trình được sử dụng làm mô hình triển khai ứng dụng web. Heroku là một nền tảng dưới dạng dịch vụ (PaaS) cho phép các nhà phát triển xây dựng, chạy và vận hành các ứng dụng hoàn toàn trong đám mây. Heroku là một nền tảng ứng dụng đám mây đa ngôn ngữ cho phép các nhà phát triển triển khai, mở rộng và quản lý các ứng dụng của họ. 
 
### 2. Register on the Heroku platform:
 Đầu tiên chúng ta cần phải tạo 1 account trên Heroku (tất nhiên là loại free rồi :D). Chúng ta truy cập vào đường link sau để đăng kí : https://signup.heroku.com/
 
### 3. Download and install CLI Heroku:
Chúng ta truy cập vào link : https://devcenter.heroku.com/articles/heroku-cli để download phiên bản dùng cho hệ điều hành của mình.
![](https://images.viblo.asia/7d484417-55bb-4667-8be5-ace4c748bf8d.png)

### 4.Deploying Your Node App:
Về phần source code NodeJs tôi không nhắc tới trong phần này. Nên các bạn có thể tự chuẩn bị trước nhé :D.

Đầu tiên chúng ta login account đã đăng kí ở bước 1 vào : https://id.heroku.com/login

Sau đó chúng ta tạo 1 new app trên Heroku:

![](https://images.viblo.asia/333fd5cf-6783-42b5-a2e8-52e686710534.png)

![](https://images.viblo.asia/39d75cde-6ad1-4bab-88c7-33095ab487b3.png)

Tiếp theo chúng ta sẽ dùng Terminal để deploy source vào new app chúng ta vừa mới tạo trên Heroku

Đầu tiên login vào heroku bằng Terminal
``` heroku login ```
Sau đó tạo a new Git repository
```
git init
heroku git:remote -a viablo-demo
```

Giờ chúng ta deploy application của mình
```
git add .
git commit -am "the first deploy on heroku"
git push heroku master
```

Và kết quả của chúng ta bằng cách truy cập vào trang : https://viablo-demo.herokuapp.com.

![](https://images.viblo.asia/5121c6ce-7a72-4b20-b90d-10333d52e637.png)

### 5. Lời kết:
Hy vọng với bài viết nhỏ này sẽ giúp cho những người mới có thể deploy được application đầu tiên của mình trên Heroku.Chúng các bạn thành công