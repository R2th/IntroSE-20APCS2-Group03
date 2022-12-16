## 1. Heroku là gì?

Heroku là một nền tảng đám mây dựa trên ứng dụng Container dưới dạng Dịch vụ (Paas). Các nhà phát triển sử dụng Heroku để triển khai, quản lý và mở rộng các ứng dụng hiện đại.  Nền tảng này  rất linh hoạt và dễ sử dụng, cung cấp cho các nhà phát triển con đường đơn giản để đưa sản phẩm ra thị trường. Nó giúp các nhà phát triển tập trung vào phát triển sản phẩm mà không cần quan tâm đến việc vận hành máy chủ hay phần cứng...


![](https://images.viblo.asia/ae7e6395-8480-47e5-a4d2-ef46aca7e7ff.png)


## 2. Cách thức hoạt động

Khi bạn triển khai một ứng dụng  Heroku, bạn phải thiết lập một máy ảo  được gọi là slug, sử dụng 1 hay nhiều buildpacks. Khi một máy ảo được khởi chạy từ slug đó, nó được gọi là  dyno. Về cơ bản, thì chúng ta hiểu nôm na là khi triển khai thì mặc định heroku sẽ tạo ra một container chứa đầy đủ các môi trường liên quan cho ứng dụng của bạn hoạt động.


![](https://images.viblo.asia/bae32750-d183-483d-9a30-00aeea2f191c.png)


## 3. Triển khai ứng dụng trên Heroku

Để triển khai ứng dụng lên heroku trước tiên bạn phải:
* cài heroku vào thiết bị của bạn.
* tạo một tài khoản heroku
* login vào hệ thống thông qua thiết bị của bạn.

Còn cách làm như thế nào thí các bạn hãy search trên gg vì nó rất nhiều.
Trong bài này mình chỉ chú trọng đến các bước triển khai thôi. Cụ thể: 


   ### 3.1. Deploy với các buildpacks mặc định của Heroku
 
 Bạn phải đang ở trong thư mục gốc của app.
   
*    Bước 1: Login vào heroku heroku login
*    Bước 2: Tạo một ứng dụng trên heroku  heroku create <app-name> --buildpack <buildpack> . Mặc đinh nếu bạn không set buildpack thì heroku sẽ tự động phát hiện và set buildpack một cách tự động là một trong các buildpack officals của họ.  [tham khảo tại đây](https://devcenter.heroku.com/articles/buildpacks) . Trong trường hợp không thể phát hiện ra thì heroku sẽ thông báo lỗi. Bạn có thể set lại buildpack như sau  eroku buildpacks:set <buildpacks> 

 ![](https://images.viblo.asia/4e9dcfb1-0406-4c93-83c0-139bdb136fa7.png)

*    Bước 3: Update code của bạn với git: git add ./ ,  git commit , git push heroku HEAD:master -f  chắc các bạn biết hết các câu này rồi nhỉ.
*    Bước 4. Sau khi update code heroku sẽ tiến hành build và run ứng dụng với 1 file có tên là **Procfile** (với mỗi loại ứng dụng sẽ có các Procfile riêng). Trong trường hợp bạn sử dụng buildpack từ bên thứ 3 thì trong thư mục project phải có thêm một file Procfile (Nó sẽ đóng vai trò là thực thi các tác vụ cần thiết để ứng dụng của bạn có thể hoạt động). [Tham khảo thêm tại đây ](https://devcenter.heroku.com/articles/procfile)  
*    Bước 5: Vậy là đã deploy lên heroku. còn việc nó chạy có đúng ý bạn hay không lại là một chuyện khác. Có thể check logs như sau. `heroku logs -t` .

**Chú ý** : Trong trường hợp ứng dụng của bạn yêu cầu một số thứ "đặc biệt" mà các thứ trên không thể làm được. Có 2 cách như sau:
*    Tự cấu hình buildpack theo cách riêng của bạn. [Tham khảo tại đây](https://devcenter.heroku.com/articles/buildpack-api)  Hoặc mình sẽ có bài viết chia sẻ về phần này trong lần tới.
*    Xây dựng một **container** riêng để chạy ứng dụng của bạn trên máy local. Xong đưa cho **Heroku** cái đó. Bảo nó là hãy chạy app của anh trên môi trường này nhá. Đảm bảo heroku sẽ nghe lời ngay ý mà.
  
   
   ### 3.2. Tùy chỉnh môi trường deploy với **Docker** trên **Heroku**
1. Cài đặt và thiết lập plugins

Tại thời điểm viết bài này, tình năng này của heroku là mới phát hành và để sử dụng nó chúng ta cần update lên bản mới nhất và cài plugin **heroku-manifest**. Làm như sau: 
    
```
    heroku update beta
    heroku plugins:install @heroku-cli/plugin-manifest
```
    Tiếp theo,  tạo heroku app: 
```
    heroku create <appname> --manifest
```
    
 Ví dụ: 
    
 ![](https://images.viblo.asia/a57495e6-6f78-4834-a265-359ad7e71a70.png)

 Vậy là đã tạo thành công heroku app với plugin **heroku-manifest** 
    
2. Triển khai với docker images đã được build sẵn

Trước tiên các bạn cần có kiến thức cơ bản về Docker và Docker-compose cũng như images và container. Mình sẽ không giới thiệu chi tiết các bạn có thể  tham khảo thêm ở nhiều nguồn khác nhau.
    Trong bài viết này mình sẽ tiên hành xây dựng một container chạy rails kết hợp với thư viện để sử dụng **sql server**  (cái này mặc định **heroku** không support nhá.)
    tham khảo dockerfile của barreto [ở đây ](https://github.com/rhuanbarreto/ruby-freetds) đây là Dockerfile cài đặt FreeTDS hỗ trợ cho việc kết nối và thao tác với SQL server.
    
 Việc tiếp theo của chúng ta là cấu hình để cài đặt thêm các thư viện cần thiết cho app của chúng ta. Đây là Dockerfile mình sử dụng:

    
    
 ```

    FROM rhuan/ruby-freetds:2.6

#throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN gem install rails -v 5.2.4
RUN gem install bundler:2.0.2
RUN bundle install

COPY . .
    
```
    
 Ở đây mình sử dụng rails 5.2.4 với bundler 2.0.2
   
   
 Tiếp theo mình tạo một file cấu hình với Docker-compose: 
```
    
    version: '3'
services:
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/usr/src/app
    ports:
      - "5000:3000"
    
```

 Sau đó mình sử dụng docker-compse để build ra container:
        
    docker-compose up
    
Hoặc nếu không muốn sử dụng console log thì có thể dùng lệnh sau:
        
    docker-compose up -d 

    
 tiếp  ta push cái container vừa tạo lên Heroku:
    
    heroku container:push web
    
 Tiếp theo đó, release trên heruku:
    heroku container:release web
 
 Cuối cùng tận hưởng thành quả thôi.
    
    heroku open 
    
Có thể tham khảo thêm tại đây: [https://devcenter.heroku.com/articles/container-registry-and-runtime](https://devcenter.heroku.com/articles/container-registry-and-runtime)
    
3. Triển khai với Dockerfile và cấu hình heroku.yml
(hẹn trong phần 2)
4. Triển khai với custom buildpacks
    (Hẹn trong phần 2)
    
## 4. Tham khảo
    
*  https://www.merixstudio.com/blog/deploying-docker-heroku-tutorial/
*  https://devcenter.heroku.com/articles/local-development-with-docker-compose#introduction-to-docker-compose
*  https://devcenter.heroku.com/articles/container-registry-and-runtime