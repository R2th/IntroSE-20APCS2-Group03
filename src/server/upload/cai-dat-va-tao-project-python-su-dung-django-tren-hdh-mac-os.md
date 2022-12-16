Python là một ngôn ngữ lập trình đang phát triển và nó không có dấu hiệu sẽ chậm lại trong vài năm tiếp theo. Google, Microsoft, và nhiều tập đoàn, công ty tin học sử dụng để vận hành hệ thống dịch vụ của mình.

Các nhà nghiên cứu khóa học, phân tích dữ liệu lớn cũng thích sử dụng Python cho công việc của mình, vì nó được việc, không màu mè, học nhanh, dùng luôn. Bạn sẽ bắt gặp Python trong hầu như mọi web applications, desktop apps, network servers, machine learning, media tool,…<br>

Trong bài viết này, mình xin hướng dẫn các bạn cài đặt Python, sử dụng Django trên hệ điều hành Mac OS. <br>

Dữ liệu thống kê: 12/2018

![](https://images.viblo.asia/c11dc963-7c75-4729-a943-1972e1ea6cca.jpg)

### 1. Cài đặt Python và django<br><br>
**1.1 Cài đặt python3**<br>
Đầu tiên bạn mở terminal lên và chạy dòng lệnh để cài đặt python3
```
brew install python
```

Kiểm tra version:<br>
```
python3
```

![](https://images.viblo.asia/95462c46-6d19-4c8b-92b6-c615e04a3a36.png)

**1.2 Cài đặt Django**
<br>

chạy dòng lệnh cài đặt django: 
```
sudo pip install django
```
<br>

### 2. Tạo project<br><br>
Các bạn mở terminal và gõ lệnh sau cd đến Desktop: cd Desktop<br>
Tạo 1 project django python_web: <br>
```
django-admin startproject python_web
```

![](https://images.viblo.asia/615649f1-8dd4-4cfd-b254-95d77d0a841e.png)

Sau đó gọi đến thư mục python_web: cd python_web<br>
Mở project bằng IDE vscode: code .

![](https://images.viblo.asia/917df047-4866-464c-a7ed-b468f65ce612.png)

Bạn có thể ấn tổ hợp “control + ~” để mở terminal đã tích hợp sẵn trong IDE.<br><br>
Chạy project: <br>
```
python manage.py runserver
```

![](https://images.viblo.asia/35af5ca1-f63e-4d92-9a13-52d7cc9048ab.png)

Sau đó ra trình duyệt để gõ http://localhost:8000/ hoặc http://127.0.0.1:8000/ để kiểm tra.<br>

![](https://images.viblo.asia/ad696053-9fc0-4fe5-8252-367d7971ed72.png)

Vậy là bạn đã thành công bước tạo project rồi đó.<br>
Để đổi cổng bạn chạy server ảo:<br>
```
python manage.py runserver 8080
```

Và truy cập http://localhost:8080/ để kiểm tra.<br><br>

### 3. Tạo WebApp<br><br>
Tạo webapp đơn giản: <br>
```
python manage.py startapp home
```
<br>
Sau khi chạy lệnh:

![](https://images.viblo.asia/427afe45-cb8c-472e-9c67-053b01f1218c.png)

Sau đó cập nhật lại file settings.py: Khai báo cho project biết rằng ta vừa tạo app này.

![](https://images.viblo.asia/5d4140f2-664d-4d76-87f8-4ea8e6f873ab.png)

Cập nhật db: <br> 
```
python manage.py migrate
``` 
<br>
Hoạt động của web: <br>

![](https://images.viblo.asia/74c0d7cc-0cf6-45e7-aa05-33c34bb87b7e.png)

Máy người dùng gửi HTTP Request đến server, server phân tích request của người dùng sẽ gửi lại Response cho máy người dùng.<br><br>
**Viết hàm xử lý response: home/views.py**
![](https://images.viblo.asia/62d65d33-0667-4b61-915d-6c8543590368.png)

Tạo ra 1 file urls.py trong thư mục home: touch home/urls.py<br>

![](https://images.viblo.asia/7b2dd22b-4ca3-459f-bfda-47c373aa2768.png)

Tiếp theo gọi urls từ app home ở folder python_web: urls.py

![](https://images.viblo.asia/5e580cf7-4e4b-4759-84bc-104bc6f7d8b1.png)

Chạy lệnh runserver: 
```
python manage.py runserver 
```
=> Truy cập http://localhost:8000/

![](https://images.viblo.asia/22f70914-0699-44e9-b3c4-a0cd8552df8a.png)

Có 2 url để chọn: admin/home<br>
Truy cập: http://localhost:8000/home/ => kết quả: 

![](https://images.viblo.asia/f0bdb6f7-f376-45b5-95f5-e6178b377e49.png)

Code đã đẩy lên github: https://github.com/buitiendo/dobt_python_web <br>
Các bạn có thể tải về và chạy thử.

Bài viết của mình đã giới thiệu với các bạn cách cài đặt và tạo project python đơn giản. Chúc các bạn thành công!