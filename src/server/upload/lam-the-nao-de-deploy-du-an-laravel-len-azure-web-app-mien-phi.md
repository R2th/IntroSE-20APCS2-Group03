## 1. Mở Đầu :

- Laravel là một framework PHP rất mạnh và phổ biến trong những năm gần đây, được cộng đồng mã nguồn mở đánh giá rất cao, và được sử dụng nhiều bởi các PHP programmer có kinh nghiệm. Khi làm xong một trang web bằng Laravel, thì chắc hẳn ai cũng muốn đưa sản phẩm của chúng ta từ môi trường local trên máy lên chạy ở môi trường thực tế để có thể đưa ra cho mọi người sử dụng và đảm bảo ứng dụng web của chúng ta chạy tốt trên môi trường thực tế. Hơn nữa việc tìm kiếm một server miễn phí - ngon - ổn định là điều không dễ. Trong bài viết ngày hôm nay, mình sẽ hướng dẫn các bạn deploy ứng dụng Laravel của mình lên Azure Web App.

## 2. Chuẩn bị :

- Một tài khoản Azure Portal có 200$ miễn phí nếu bạn dùng thẻ visa hoặc master card để đăng ký hoặc dùng mail edu để đăng ký để được tặng 100$ dùng trong 30 days.  Link đăng ký [tại đây](https://azure.microsoft.com/en-us/free/)
- Chuẩn bị một tài khoản github để push dự án của bạn lên repository.
- Một ứng dụng Laravel hoạt động trơn tru ở local .

## 3. Các bước thực hiện :

### Bước 1 : Tạo WebApp + Mysql :
- Đầu tiên vào [Azure Portal ](https://portal.azure.com/#create/hub) tìm Web App + MySQL và tạo ứng dụng. 
![](https://images.viblo.asia/8c73945f-3fc0-4fd3-bfd1-6af14d419e7f.png)

- Các bạn điền đầy đủ vào form như trên sau đó chọn input **Database Settings Required** để thiết lập Mysql.
-![](https://images.viblo.asia/1b9c2a3a-23fd-46a4-89d3-8fb65fd668b9.JPG)

- Sau đó điền đầy đủ thông tin **Mysql** như sau và tiếp tục để tạo :
-![](https://images.viblo.asia/8051e699-c3c2-404b-bf23-16e474f3aa6c.JPG)

### Bước 2 : Config Web App đã tạo :
- Đây là Web App mà mình đã tạo và chúng ta đã sở hữu một host với tên miền : https://dinhlong.azurewebsites.net 
![](https://images.viblo.asia/a1ae85e3-eee3-4cd8-9e2d-4f0f7766a013.JPG)

- Tiếp theo bạn vào **Settings >Configuration > General setting** để cài môi trường PHP cho host và save setting.
![](https://images.viblo.asia/43a15180-4218-4027-8abc-9f1dd690961a.JPG)

### Bước 3 : Cài đặt Composer và phpMyAdmin Extension :
- Tại sidebar của web app bạn tìm đến Extensions :
![](https://images.viblo.asia/d913e1a1-217f-4a47-bf4b-632b13639454.JPG)

- Click **Add button > choose extension**, sau đó tìm Composer và cài đặt : 

![](https://images.viblo.asia/8adc426e-dba8-4981-8993-caaf9178a9df.JPG)

- Tương tự cài đặt luôn **phpMyAdmin Extension** và đây là kết quả sau khi cài :

![](https://images.viblo.asia/4b6e5be5-2c84-42bc-a014-676bb5b96692.JPG)

- READY ! Chúng ta đã config một số thứ cơ bản giờ deploy ứng dụng Laravel qua repo của bạn trên github thôi nào :))

### Bước 4  : Upload ứng dụng Laravel lên Azure :
- Tại sidebar của web app bạn tìm đến deployment > **deployment center**, có rất nhiều công cụ để đưa code của bạn lên, ở đây mình ứng dụng CI, CD  rất thuận lợi khi release một tính năng mới kết hợp với github repo của mình.  Các bạn tham khảo [tại đây](https://viblo.asia/p/ci-cd-va-devops-07LKXYXDZV4)

![](https://images.viblo.asia/b2d0575a-3f64-48f3-b98e-6f2950a3d9ee.JPG)

- Chọn repo và nhánh mà bạn muốn upload code lên azure sau đó tiến hành hoàn tất, azure sẽ tự động pull code của bạn và chạy composer install :

![](https://images.viblo.asia/b9a11e4a-dc61-45aa-89b8-0c3e6d4f59b3.JPG)

### Bước 5  : Cài đặt Laravel :
- Chúng ta vào **development tools** > **App service editor**. Click  **Go** để vào vùng quản lý code của bạn, chọn Open Kudu Console để vào terminal.
![](https://images.viblo.asia/5a567445-3546-4de4-a151-2b2a48d26111.JPG)

- Vào thư mục gốc của ứng dụng **site -> wwwroot** và tiến hành gõ các lệnh sau :

* Tạo database và config database

`copy .env.example .env`

* Cập nhật file env của bạn như sau các bạn lấy :

![](https://images.viblo.asia/0fd9c00a-a9fb-484c-ae6c-559296068e1b.JPG)

* Với thông tin mysql các bạn lấy tại **Settings -> Configuration -> Connection strings**

![](https://images.viblo.asia/8763441d-9d0a-4c14-a667-f8f25ef92283.JPG)

* Nhớ vào **Extensions -> phpMyAdmin Extension** -> Chọn **Browse** tạo database để migrate nhé:

![](https://images.viblo.asia/5312e06c-df87-4387-ba30-56ae9cfd6ccd.JPG)

* Tạo ra key cho dự án

```
php artisan key:generate
```

* Tạo ra các bảng và dữ liệu mẫu cho database

```
php artisan migrate
php artisan db:seed
```

![](https://images.viblo.asia/6454c9f2-a8da-4309-81a8-6196b231e52a.JPG)

## 5. Hoàn thành :

Như vậy ta đã hoàn thành xong việc cấu hình và deploy cho Laravel project và hơn nữa khi các bạn push code mới lên git repo của các bạn, azure sẽ tự động pull và tích hợp cho bạn luôn . Hi vọng hướng dẫn này của mình sẽ giúp các bạn cải thiện được quá trình deploy lên các môi trường, đặc biệt là môi trường production sau này.
Link demo nếu server còn live : [Click vào đây](http://nhom5.azurewebsites.net/public/)