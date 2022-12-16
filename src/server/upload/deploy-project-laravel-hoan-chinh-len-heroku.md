# 1. Giới thiệu
Đối với lập trình viên khi làm xong project ta muốn gắn vào CV hay trang cá nhân của mình để mọi người có thể xem được thì đều cần deploy lên một server nào đó với tên miền. Tuy nhiên không phải ai cũng có điều kiện để mua riêng một host và một tên miền để làm việc đó nhất là các bạn sinh viên. Hôm nay mình xin hướng dẫn anh em deploy một project **Laravel** hoàn chỉnh lên **Heroku**. Hi vọng bài viết này sẽ giúp ích được cho anh em.
# 2. Mở đầu
Để chuẩn bị cho việc deploy anh em cần chuẩn bị các bước sau đây
1. Đăng ký tài khoản trên heroku(nếu chưa có) link đăng ký https://dashboard.heroku.com/
2. Chuẩn bị project Laravel cần deploy
# 3. Tạo app trên heroku
Sau khi đã chuẩn bị được các bước trên các bạn đăng nhập vào heroku của mình. Ở trang Dashboard bạn chọn **New** và **Create new app**
![image.png](https://images.viblo.asia/a5e0da8b-ab46-48cf-83ba-df7c5234e6e4.png)
Sau đó ta sẽ cần chọn tên của app và chọn **region**. Có 2 region là USA và Europe. Mình hay chọn USA
![image.png](https://images.viblo.asia/a537e402-c6a9-409e-8138-5490a0fc59dc.png)
Sau khi tạo app thành công Heroku sẽ redirect bạn về trang quản trị của app đó.
![image.png](https://images.viblo.asia/09dbbe91-1428-444f-a5ac-99db8f54c4e5.png)
Đến đây là ta đã tạo app thành công và chuẩn bị deploy project của mình.
# 4. Thêm cơ sở dữ liệu.
Đối với mỗi project không thể thiếu sự góp mặt của **CSDL**. Heroku cung cấp cho bạn CSDL miễn phí gọi là **Heroku Postgres**. Không những thế Heroku còn cung cấp cho bạn rất nhiều add-ons khác cho project của bạn như Mysql, MongoDb, Redis... Tuy nhiên không phải các add-ons này đều miễn phí. Một số add-ons có sẵn Free nhưng bạn vẫn cần đăng ký với thẻ Visa trước để sử dụng. Nếu có thẻ visa bạn có thể yên tâm cung cấp vì chỉ khi bạn vượt quá giới hạn của Free plan mới bị tính phí và trước khi vượt quá Heroku sẽ gửi thông báo cho bạn. Bạn có thể xem các add-ons mà Heroku hỗ trợ ở [đây](https://elements.heroku.com/addons).
Quay lại với việc tạo CSDL. Ở đây mình dùng **Heroku Postgres**. Khi bạn nhập chữ P sẽ gợi ý cho bạn 
![image.png](https://images.viblo.asia/47950952-7ae4-409e-abf6-f0feb112ca8b.png)
Một popup sẽ hiện ra bạn nhấn Submit Order Form để xác nhận.
![image.png](https://images.viblo.asia/4d75f579-9c01-46b4-9942-61b5f84de7ef.png)
Màn hình quản trị của DB Postgres hiện ra bạn click vào Heroku Postgres để xem chi tiết thông tin DB của bạn. Màn hình này sẽ hiện thị các thông tin
* Plan đang sử dụng
* Số bảng trong CSDL
* Số record
* Số connections đến CSDL, ...
![image.png](https://images.viblo.asia/d2d6385a-604d-46a8-bf9f-77fff90b77af.png)
Tiếp theo bạn sẽ cần lấy thông tin của **Postgres** để cấu hình như bạn cấu hình trong file **.env**. Chọn **Settings** và click vào **View Crendetials**. Một màn hình hiện ra gồm các thông tin cấu hình DB. Ta sẽ cần dùng cấu hình này để config trên server của heroku. Bước tiếp theo mình sẽ chỉ rõ hơn
![image.png](https://images.viblo.asia/d36cc722-2ee1-4f86-821f-0c9bef0e0572.png)
# 5. Cài đặt Heroku CLI
Để có thể deploy ở trên máy của bạn cần cài thêm Heroku CLI. Link cài đặt ở [đây](https://devcenter.heroku.com/articles/heroku-cli). Tùy thuộc vào hệ điều hành mà bạn đang sử dụng, bạn hãy chọn bản tương ứng.
# 6. Deploy project lên Heroku
Như các bạn đã biết trong Laravel các biến môi trường của chúng ta thường được lưu trong file **.env**. Tuy nhiên file này chứa các thông tin nhạy cảm nên thường được đưa vào **igrnore** khỏi git trong suốt quá trình làm việc. Heroku giúp chúng ta có thể cấu hình các biến môi trường này. Các bước thực hiện sẽ như sau. Các bạn quay trở lại màn hình quản lý dashboard app của mình và chọn settings
![image.png](https://images.viblo.asia/7672ca6b-6e7a-4f29-830e-ae52790b5b93.png)
Tiếp đó chọn Reveal Configs Vars tại đây các bạn cấu hình tương tự như config trong file **.env** của bạn.
![image.png](https://images.viblo.asia/fe41d4f2-fd5b-4448-8495-0c91979828f6.png)
Sau khi đã tạo xong biến môi trường nhiệm vụ tiếp theo cần làm là tạo config cho `Heroku`. File này giống như file Config để Heroku có thể biết được vị trí file index.php trong ứng dụng của bạn. Các bạn tạo file có tên **Procfile** trong ứng dụng cùng cấp với thư mục app với nội dung như sau.
![image.png](https://images.viblo.asia/5c2e5fbe-2773-4b53-a55e-a1b46e7db90c.png)

Heroku cho phép bạn deploy trực tiếp project hoặc bạn có thể deploy qua github. Ở đây mình xin hướng dẫn các bạn deploy trực tiếp.
Nếu project của bạn chưa thực hiện init repository thì bạn cần thực hiện init trước.
```
$ git init
```
Tiếp đến ta cần add link repo trên heroku
```
$ heroku git:remote add laravel-demo-deploy-heroku
```
Sau đó ta tiến hành add và commit các thay đổi đã thực hiện bằng các lệnh:
```
$ git add .
$ git commit -m "Deploy"
```
Cuối cùng ta tiến hành deploy bằng câu lệnh
```
$ git push heroku master
```
Trong trường hợp bạn không push từ nhánh master thì cần dùng lệnh:
```
$ git push heroku <your-branch>:master
// Với your-branch là  nhánh hiện tại của bạn
```
Không giống như việc push lên github việc deploy lên Heroku sẽ phải đợi một lúc. Và nếu thành công sẽ hiển thị như sau
![image.png](https://images.viblo.asia/688e80c9-c67d-4eae-af75-37c3260b24c8.png).
Các bạn cũng có thể xem log trên trang quản trị của Heroku.
# 7. Chạy command
Laravel cung cấp cho chúng ta công cụ `artisan` mạnh mẽ để chạy command. Heroku cũng hỗ trợ việc này. Tại dashboard app của bạn click chọn **More** run **Console**
![image.png](https://images.viblo.asia/a6220be0-7369-491f-9179-5c618bbf5c58.png)
Chúng ta tiến hành tạo bảng bằng lệnh
![image.png](https://images.viblo.asia/46bbad49-b497-4da4-9db1-93717d5325aa.png)
Ta cũng có thể chạy trực tiếp trên terminal của máy bằng câu lệnh
```
$ heroku run php artisan migrate
```
Project của mình sau khi thực hiện nó sẽ trông như thế này. Các bạn có thể tham khảo project của mình tại [đây](https://hotel-booking-sun.herokuapp.com/)
![image.png](https://images.viblo.asia/b24ea1b5-e55e-40a1-a668-fc921dba9666.png)
# 8. Một số lỗi hay gặp
## 8.1 Lỗi không nhận HTTP
Có 2 cách giải quyết như sau
- Cách 1: Bạn có thể sửa toàn bộ link về HTTPS :).
- Cách 2: bạn cần force project của mình sử dụng HTTPS bằng cách khai báo code sau trong function `boot()` của `AppServiceProvider`
```
use URL;
//
public function boot()
{
    URL::forceScheme('https');
}
```
## 8.2 Lỗi không chạy được script
Trong project của bạn có thể sẽ cần sử dụng một số câu lệnh của `bower`  hay `npm mix` để render css, js ra ngoài public. Hay một số câu lệnh của php để render code ra public trong quá trình build như `php artisan vendor:publish`. Để thực hiện việc này các bạn cần khai báo trong `postinstall` như sau trong `packages.json` 
![image.png](https://images.viblo.asia/b137fcc1-e36b-4c52-86d9-e6f6a9043126.png)

# 9. Kết thúc
Hi vọng qua bài viết của mình các bạn có thể dễ dàng deploy project Laravel của mình lên Heroku một cách dễ dàng. Nếu có thắc mắc gì hãy comment bên dưới mình sẵn sàng trả lời. Cám ơn các bạn đã xem bài viết của mình.
# 10. Tham khảo
https://viblo.asia/p/huong-dan-deploy-project-laravel-cua-ban-len-heroku-maGK7WRbKj2