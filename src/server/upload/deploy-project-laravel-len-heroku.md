Để có thể chia sẻ và show sản phẩm web do chính mình làm ra thì chúng ta cầ mua hosting, domain để deploy. Đối với những bạn sinh viên có chi phí hạn hẹp thì khó có thể bỏ ra một khoản tiền để đầu tư như vậy. Nên trong bài viết này mình sẽ hướng dẫn các bạn deploy dự án Laravel lên Heroku.

# Heroku
Đầu tiên để deploy lên Heroku thì trước hết ta phải tìm hiểu xem Heroku nó là cái gì đã =))). **Heroku** là một nền tảng đám mây, nó giúp chúng ta triển khai các dự án một cách nhanh gọn và nó hoàn toàn miễn phí. **Heroku** cũng hỗ trợ rất nhiều các ngôn ngữ như: **PHP**, **Go**, **Java**, **Ruby**, ... Ngoài ra nền tảng này còn rất nhiều tiệc ích khác mà các bạn có thể khám phá nó ở [đây](https://www.heroku.com/)

# Deploy project lên Heroku
### Tạo tài khoản

Đầu tiên các bạn hãy lên trang chủ https://www.heroku.com/ để tạo một tài khoản.

### Cài đặt Heroku CLI
Sau khi đã tạo tài khoản xong thì các bạn lên [đây](https://devcenter.heroku.com/articles/heroku-cli) để cài **Heroku CLI**. **Heroku CLI** cần Git để có thể cài đặt nên hay chắc chắn rắng máy tính của bạn đã có sẵn Git k thì bạn có thể tiến hành cài đặt Git theo hướng dẫn ở [đây](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

* **Windows**: Tải bản cài đặt tương ứng với 64-bit hoặc 32-bit
* **Ubuntu 16+**: `sudo snap install --classic heroku`
* **MacOS**: `brew tap heroku/brew && brew install heroku`

Sau khi đã cài đặt xong rồi thì các bạn tiến hành đăng nhập vào **Heroku** ở terminal:
```
heroku login

›   Warning: Our terms of service have changed: https://dashboard.heroku.com/terms-of-service
heroku: Press any key to open up the browser to login or q to exit: 
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/c2ccb156-6c78-43fe-86e5-5db78bf0aa55?requestor=SFMyNTY.g2gDbQAAAA0xNC4yNDcuMTcyLjU4bgYA_r1CjnkBYgABUYA.jKXfNZ95ugOtRroDuvTpJxyjTlHAc3Yi1J5ASQmsNCY
Logging in... done
Logged in as ha******@gmail.com
```

Command sẽ mở trình duyệt lên và bạn tiến hành login.

### Deploy
**Bước 1**: Tạo một project trên **Heroku**
* Ở màn dashbaord các bạn chọn New->Create a new app
* Sau đó tiến hành điền tên app và chọn region (các bạn chọn US hoặc Europe)
![](https://images.viblo.asia/de3a7fed-a86e-4e53-b2bf-e6dad5e073df.png)

**Bước 2**: Tạo Procfile có nội dung như sau. FIle này ta sẽ để ở thư mục root (cùng cấp với thư mục app)

```Procfile
web: vendor/bin/heroku-php-apache2 public/
```
**Bước 3**: Đưa project lên **Heroku**. Ở đây mình dùng Heroku CLI đã cài đặt trước đó
* Nếu project của bạn chưa được quản lý bằng git các bạn có thể chọn git init đê khởi tạo
* Tiến hành add remote heroku
    * `heroku git:remote -a heorku-app-deploy`  (`heroku-app-deploy` đây là tên project mình vừa tạo trên heroku)
    ```
    heroku git:remote -a heorku-app-deploy
    
  › Warning: heroku update available from 7.52.0 to 7.54.0.
   set git remote heroku to https://git.heroku.com/heorku-app-deploy.git
    ```
    * `git remote -v` để kiểm tra xem đã add thành công hay chưa.
    ```
    heroku  https://git.heroku.com/heorku-app-deploy.git (fetch)
    heroku  https://git.heroku.com/heorku-app-deploy.git (push)
    ```
    * Tiến hành git add, và commit như bình thường nhưng mình sẽ đẩy project lên heroku chứ không phải github
    * `git push heroku master`
    * Sau khi đã push xong các bạn lên heroku để kiểm tra xem đã thành công hay chưa
    ![](https://images.viblo.asia/c8aaf62c-177b-459a-a0cf-515827ce08a3.png)

    * Nhìn vào phần activity các bạn có thể thấy mình vừa đẩy project từ local lên và khi truy cập vào app có báo lỗi 500 | Server Eror (cái này là do bạn chưa setup một số biến môi trường như APP_KEY)
    ![](https://images.viblo.asia/d69e03f5-38cf-430c-883b-15f54a4be34e.png)

**Bước 4**: Tạo biến môi trường cho app. Cũng giống như project ở local thì bạn có file `.env` thì app trên heroku cũng phải có những biến môi trường tương tự như vậy. Các bạn có thể dễ dàng cái đặt biến môi trường trong phần Settings. Ở đây mình sẽ tiến hành thêm các config bằng terminal.

* `heroku config:add <name-config>` dùng câu lệnh này để add. Ở đây mình sẽ thêm một số config sau:
    * APP_NAME
    * APP_ENV
    * APP_KEY
    * APP_DEBUG=true (cái này để các bạn có thể debug trên production =))) sau khi debug xong ta nên tắt nó đi nhé :))))
    * APP_URL (cái này các bạn điền URL của app trên heroku)
* Sau khi đã thêm các key như ở bên trên thì các bạn truy cập đến URL của project ta có thể thấy ứng dụng đã chạy được rồi.
![](https://images.viblo.asia/643c19da-8b02-41c9-8b67-761010b18cb6.png)

**Bước 5**: Ứng dụng thì phải có database chứ đúng không =))) Chứ chả lẽ cái app Laravel của bạn chỉ là một cái Landing Page (lol).
* Trong phần Resources các bạn tiến hành tìm Add-ons **Heroku Postgres** và tiến hành cài đặt.
![](https://images.viblo.asia/c157e359-a8f2-45c8-9512-8d5f037afd4e.png)
* Sau khi đã thêm Add-ons xong các bạn có thể kiểm tra credentials của nó
```
heroku pg:credentials:url

Connection info string:
   "dbname=****** port=*** user=*** password=*** sslmode=require"
Connection URL:
   postgres:***
```
* Sau đó ta sẽ tiến hành thêm config cho database theo dữ liệu mà ta vừa xem
    * DB_CONNECTION=pgsql
    * DB_HOST= `như bên trên`
    * DB_PORT=`như bên trên`
    * DB_DATABASE=`như bên trên`
    * DB_USERNAME=`như bên trên`
    * DB_PASSWORD=`như bên trên`
* Sau khi đã thêm các config ta sẽ tiến hành migrate: `heroku run php artisan migrate` (hoặc có thể `heroku run bash` để vào server)
* Vì ứng dụng mình đưa lên chỉ có chức năng đăng nhập và đăng ký nên mình sẽ test các chức năng đó xem đã ổn chưa. Còn tùy ứng dụng của các bạn xem có chức năng gì rồi tiến hành test xem database đã hoạt động hay chưa :v.

# Tổng kết
Qua bài viết này mình đã hướng dẫn các bạn cách deploy một project Laravel lên **Heroku**. Các project khác thì cách làm cũng tương tự như vậy để rõ hơn về các bước các bạn có thể tham khảo trên trang chủ của **Heroku**. Chúng ta sẽ không cần phải chia sẻ project một cách nông dân như là đem máy đến cho thằng bạn xem =)), hay kết nối chung một mạng LAN, hay sử dụng `ngrok` để forward để mạng của bạn (cái này cũng khá nhanh gọn nhưng bạn phải luôn luôn bật và có một số vấn đề khác về bảo mật nữa). Chúc các bạn thành công deploy project của mình để chia sẻ với mọi người. Cảm ơn các bạn đã theo dõi đến hết bài viết ❤️.