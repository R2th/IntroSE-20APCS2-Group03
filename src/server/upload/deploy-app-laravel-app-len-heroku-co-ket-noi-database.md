Trong bài hôm nay, thì mình sẽ giới thiệu cho các bạn cách để deploy một app Laravel lên Heroku bằng git và Heroku CLI. Heroku là nền tảng đám mây cho phép các lập trình viên xây dựng, triển khai, quản lý và mở rộng ứng dụng, nó rất linh hoạt và dễ sử dụng, cung cấp cho một con đường đơn giản nhất để đưa sản phẩm tiếp cận người dùng. 

Tuy nhiên, Heroku chỉ phù hợp với những app đơn giản, cơ sở dữ liệu không quá phức tạp, ít người dùng và cho các bạn dùng để test. Nếu bạn muốn xây dựng những app lớn và người dùng sẽ có trải nghiệm tốt thì nên deploy lên những Hosting tốt hơn nhé. 

## Bắt đầu thôi nào!
### 1. Cài đặt Heroku CLI 
Heroku CLI (Command Line Interface) là cách đơn giản để chúng ra tạo và quản lý các apps Heroku của bạn thông qua terminal. Dưới đây mình sẽ cài đặt Heroku CLI cho Ubuntu 16+, nếu bạn sử dụng hệ điều hành khác thì có thể tham khảo [tại đây](https://devcenter.heroku.com/articles/heroku-cli)
```
sudo snap install --classic heroku
```
Sau khi cài đặt thì kiểm tra xem Heroku đã được cài đặt thành công hay chưa 
```
heroku --version
```

### 2. Cài đặt app Laravel 
Vẫn là câu command quen thuộc mà những người học Laravel đều biết (nhưng chưa chắc nhớ :sweat_smile:)
```
composer create-project --prefer-dist laravel/laravel deploy_heroku "5.8.*"
```
Ở đây mình cài bản 5.8 vì thấy nó khá là ổn định, ít có những lối lặt vặt về version 

### 3. Tạo Procfile
Tại folder root của laravel app, tạo một file Procfile. Trong file Procfile chúng ta sẽ chỉ định command được thực thi bởi app khi khởi chạy. 
```
web: vendor/bin/heroku-php-apache2 public/
```

### 4. Cài đặt git và thực hiện commit cho app 
```
git init

git add .

git commit -m 'Deploy App Heroku'
```

### 5. Login Heroku thông qua Heroku CLI 
Để thực hiện bước này, bạn phải có 1 tài khoản Heroku. Nếu chưa có hãy đăng ký thôi nào https://signup.heroku.com/. Sau khi đã có tài khoản thì thực hiện command
```
heroku login
```
Sau khi nhập thì sẽ xuất hiện câu hỏi: `heroku: Press any key to open up the browser to login or q to exit: ` nhấn một từ bất kỳ rồi enter để tiếp tục. Khi trình duyệt được mở lên thì nhấn Log in. 

![](https://images.viblo.asia/527995ff-6be5-43c4-830e-ea6021ac02c5.png)

Đây là kết quả sau khi login Heroku bằng CLI 
```
Logging in... done
Logged in as khanhXXX@gmail.com
```

### 6. Tạo app trên Heroku 
Sau khi đã login thành công thì chúng ta thực hiện tạo app Heroku bằng CLI
```
heroku create
```

Một repository được tạo thành công  
```
Creating app... done, ⬢ cryptic-stream-28489
https://cryptic-stream-28489.herokuapp.com/ | https://git.heroku.com/cryptic-stream-28489.git
```

Khi kiểm tra `git remote -v`  thì thấy remote heroku đã được tạo trong app 
```
$ git remote -v
heroku	https://git.heroku.com/cryptic-stream-28489.git (fetch)
heroku	https://git.heroku.com/cryptic-stream-28489.git (push)
```

### 7. Deploy code lên repo vừa tạo được
Bây giờ chỉ cần push code lên repo vừa tạo bằng command
```
git push heroku master
```

App đã được release thành công 
![](https://images.viblo.asia/3b762752-463d-4b37-aed5-db15a09ba049.png)

### 8. Cấu hình env cho project trên Heroku 
Phần này bạn có thể vào phần settings của app bạn vừa tạo trên [Dashboard Heroku ](https://dashboard.heroku.com/). Tạo phần Config Vars bạn thêm các key cho app Laravel
![](https://images.viblo.asia/fe3f57f6-f42d-457d-860f-11a38937cce9.png)


Trên Terminal thực hiện command `heroku open` để mở app, và dưới đây là kết quả sau khi chúng ta deploy
![](https://images.viblo.asia/c51ea8fb-f14d-4275-a716-7649ac35b2b5.png)

### 9. Cấu hình Https cho app 
Sau khi lượn 1 lượt các page của app thì mình thấy chỉ có trang root là được `https` còn lại đều là `http` , vậy nên chúng ta sẽ cấu hình lại để tất cả chuyển sang `https` nhé

![](https://images.viblo.asia/0589e145-68b3-4776-8f11-723284f497da.png)

Trong file `AppServiceProvider.php` chúng ra sẽ thêm vào function `register()` như bên dưới 
```php
public function register()
{
    if (env('APP_ENV') == 'Production') {
        URL::forceScheme('https');
    }
}
```

#### Sau khi thay đổi code thì bạn cũng phải thực hiện commit và push code lên lại như phần trước nhé!

```
git add .
git commit -m 'message'
git push heroku master
```


**Và config cho app trong phần settings `APP_ENV` bằng `Production` luôn. Reopen lại app để test nhé !**
![](https://images.viblo.asia/649d7f38-79ac-4bef-ac9d-6202097e1e89.png)

![](https://images.viblo.asia/5e2009b0-927c-4bcd-8a9f-a683b5781927.png)

## Thực hiện kết nối SQL cho app 
Chắc chắn là app động thì phải có Database rồi, dưới đây là các bước để kết nối Database trên Heroku

### Thực hiện cài Heroku Postgres và cấu hình lại cho App
Tại phần resources, chúng ta tìm `Heroku Postgres` và thực hiện cài đặt vào app
![](https://images.viblo.asia/3ddc54fb-e714-4dee-80c0-76c1a45cbcc3.png)
![](https://images.viblo.asia/2d5d41a5-8dbb-476f-93e9-d11b940936f5.png)

Sau khi đã cài xong thì click vào package đó. Vào phần `Settings` và `View Database Credentials` để biết được thông tin Database rồi cấu hình vào env app.

![](https://images.viblo.asia/aa174855-3dca-4249-92dd-e2ef8aa73d9f.png)

**Chú ý, ở phần `DB_CONNECTION` sẽ là `pgsql`, không phải là `mysql` nhé**
![](https://images.viblo.asia/142a9419-48b4-4498-9d5e-efdb8640493e.png)

### Thực hiện migration 
Command `heroku apps` để kiểm tra những apps trên Heroku của bạn
```
$ heroku apps 
=== khanhXXX@gmail.com Apps
cryptic-stream-28489
```

Command `heroku run bash --app name-your-app` để thực hiện truy cập vào app thông qua CLI 
```
$ heroku run bash --app cryptic-stream-28489
Running bash on ⬢ cryptic-stream-28489... up, run.6492 (Free)
```

Bây giờ bạn có thể thực hiện các command của Laravel ngay trên Heriku CLI
![](https://images.viblo.asia/1ecf7e8b-1d1b-4fb3-b287-07c25c6d8f1a.png)

### Và đây là kết quả :heart_eyes:
![](https://images.viblo.asia/08630172-b336-47e4-a216-8aad70bdd0ea.png)

## Tổng kết
Trên đây là các bước để deploy một app Laravel lên Heroku của mình, bài viết còn sơ sài nên mong mọi người có thể góp ý để mình phát triển hoàn thiện hơn. Cảm ơn mọi người đã theo dõi bài biết, chúc mọi người thành công :+1:

Đây là link đồ án tốt nghiệp mà mình đã deploy lên Heroku, các bạn có thể tham khảo tại đây nhé: https://shielded-stream-69901.herokuapp.com/