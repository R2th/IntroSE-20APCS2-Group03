### Lời mở đầu
Để một trang web có thể chuyển đổi đa ngôn ngữ phục vụ cho nhiều người ở những quốc gia khác nhau thì nhà phát triển web cần phải quốc tế hóa trang web của họ và có rất nhiều cách để làm điều đó. Sau đây mình xin chia sẻ đến các bạn mới bắt đầu làm web bằng rails như mình một cách để làm cho trang web có thể chuyển đổi được đa ngôn ngữ bằng cách sử dụng I18n.
### 1. I18n là gì?
 I18n là viết tắt của từ Internationalization(Quốc tế hóa) nếu như bạn để ý thì số 18 trong i18n chính là 18 ký tự đứng giữa chữ cái i đầu tiên và chữ cái n cuối cùng trong từ bị viết tắt đó. Đơn giản i18n hỗ trợ ta trong việc chuyển đổi đa ngôn ngữ cho ứng dụng và nó đã được rails hỗ trợ từ phiên bản 2.2, nhưng trong bài viết này mình xin phép tập trung vào i18n trong rails 5.
### 2. I18n trong Rails 5
Có một số tính năng API mà trong Rails 5 đã hỗ trợ cho việc quốc tế hóa ngôn ngữ cho ứng dụng của bạn:
* Looking up translations
* Interpolating data into translations
* Pluralizing translations
* Using safe HTML translations (view helper method only)
* Localizing dates, numbers, currency, etc.

Ta sẽ sử dụng phương thức t(translate) helper và file .yml trong thư mục config/locales (mặc định ban đầu trong là file en.yml) để chuyển đổi giữa các ngôn ngữ trong ứng dụng.

Dưới đây sẽ là ví dụ cho thấy cách sử dụng t()


| Chưa sử dụng i18n | Đã sử dụng i18n |
| -------- | -------- |
|       ![](https://images.viblo.asia/02f4c73f-5391-46ac-a5b8-b93acd8085b3.png)| ![](https://images.viblo.asia/2018875f-b3aa-4dde-8f62-95a4453af674.png)   | 

### 3. Tìm hiểu i18n qua ví dụ
* Bước 1:
    Hãy tạo một ứng dụng với tên i18n_demo bằng câu lệnh
    
   ![](https://images.viblo.asia/2eebee50-0d0a-46e5-9e75-4663874a0f20.png)


* Bước 2: Tạo một trang đơn giản view/static_pages/home.html.erb như sau:


| code | Giao diện |
| -------- | -------- | 
|   ![](https://images.viblo.asia/e5c1f02d-cc42-4af7-bed1-c3d1d646c6fb.png)   |      ![](https://images.viblo.asia/ce2209eb-f845-450c-9f11-c392c2d69cd0.png)|





     
* Bước 3: Trong thư mục config/locales đã có sẵn file en.yml như đã nói ở trên, ta sẽ tạo thêm một file vi.yml. Sau đó tiến hành đặt tên cho các biến cố định

| en.yml | vi.yml |
| -------- | -------- | 
| ![](https://images.viblo.asia/1d2ae41d-f800-4f6a-9e3e-a6df67b90b59.png)     | ![](https://images.viblo.asia/d1efbd56-c961-40b7-82ea-6060563b5491.png)     | 



* Bước 4:  Quản lý miền địa phương qua các yêu cầu bằng cách xác định một hành động trước trong ApplicationController

   ![](https://images.viblo.asia/87cf00ae-0794-45aa-8b6a-f9e491577d0d.png)
   
   Để cài đặt ngôn ngữ mặc định cho ứng dụng ta sửa trong file config/application.rb, ở đây mình để mặc định là tiếng anh(:en)
   ![](https://images.viblo.asia/2a54b9b1-327a-4c73-966a-a63feba8b1cd.png)
   Để áp dụng cá chuyển đổi ngôn ngữ trong ứng dụng của mình thì đơn giản trong config/routes.rb sẽ áp dụng tùy chọn :locale scope
   
   ![](https://images.viblo.asia/1a13cfdb-dc90-4c32-8a57-eedf2d5c4eb9.png)
   

* Bước 5: Tiến hành sửa trang đã tạo ở bước 2 theo i18n như sau


| code |Tiếng anh | Tiếng việt |
| -------- | -------- | -------- |
|     ![](https://images.viblo.asia/1079af06-03b4-4657-9ff4-556b22d224b7.png) |  ![](https://images.viblo.asia/130cbd41-0893-45e7-adb5-04cc85fb3651.png)   | ![](https://images.viblo.asia/e0426004-10e8-4520-a2a3-4290ff4cec60.png)     |


Để truy xuất nội dung của i18n ta có thể sử dụng các cách sau:
    

 Cách 1: Ta sẽ sử dụng đường dẫn đâỳ đủ đến key muốn truy xuất
        vd: t "static_pages.home.title", và cách này luôn cho kết quả đúng.
        
 Cách 2: Như trong code trên mình dùng t ".title" và không cần viết đầy đủ đường dẫn là bởi vì mình đang thao tác trong Controller static_pages với Action home nên rails sẽ tìm theo Controller và Action cho mình. Đây được gọi là “Lazy” Lookup. Lưu ý nếu ta không thao tác trong Controller và Action trên thì cách này sẽ không đúng.   
### Lời kết
Mình mong rằng qua bài viết của mình sẽ giúp cho các bạn mới làm quen với i18n dễ dàng hơn. Cảm ơn các bạn đã đọc bài viết của mình!

   [Tham Khảo](https://lingohub.com/frameworks-file-formats/rails5-i18n-ruby-on-rails/)