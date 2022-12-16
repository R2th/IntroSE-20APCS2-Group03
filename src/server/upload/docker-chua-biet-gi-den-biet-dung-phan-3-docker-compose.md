# 1. Mở đầu
+ Xin chào các bạn, sau khi đi qua hai phần đầu của series: `Docker - Chưa biết gì đến biết dùng`, chúng ta đã tìm hiểu `Docker, dockerfile, image, container ...` là gì và sử dụng chúng như thế nào.

+ Hôm nay chúng ta sẽ tiếp tục tìm hiểu `docker-compose`  - một công cụ `kết nối` các `container` lại và làm cho chúng có thể `tương tác` với nhau.


![](https://images.viblo.asia/4ba52c53-7c59-4443-b1fd-f47b460455a3.png)
# 2. Bài toán
Câu chuyện đặt ra là:

`-> Chúng ta muốn ứng dụng Docker cho`

+ Dự án `mới`

+ Hoặc dự án `đang phát triển`

`-> Vậy chúng ta làm như thế nào ?`


+ Qua tìm hiểu ở hai phần đầu của series, chúng ta hoàn toàn có thể sử dụng `Dockerfile`

+ Cài đặt tất cả những môi trường cần thiết (như mysql, redis,  php,... ) lên một container `duy nhất` 

+ Rồi chạy project trên container đó.

![](https://images.viblo.asia/58e1a26b-1afc-48aa-b139-de5c8021f67f.png)

`-> Tuy nhiên:`

+ Nếu như bạn muốn dùng kết hợp nhiều `image có sẵn` trên [DockerHub](https://hub.docker.com) thì sao ? 

+ Nếu một cơ sở dữ liệu `dùng chung` cho nhiều project thì sẽ xử lý thế nào ?

+ Hơn nữa, với tư duy của OOP, 1 class thì không nên `cõng nhiều nhiệm vụ`.


`-> Từ đó sinh ra docker-compose để kết nối các container riêng lẻ với nhau.`

- Khi đó, chúng ta sẽ xây dựng nhiều container, khi nào cần tương tác với database thì gọi tới `container mysql` chẳng hạn, tương tác với redis thì gọi tới `container redis`, cần cái gì thì gọi tới container làm nhiệm vụ đó.

![](https://images.viblo.asia/fd676d6c-88ef-4c1a-a148-4eb871f23401.png)

+ Cùng nhìn hình ảnh con `bạch tuộc` đại diện cho `docker-compose` (mình đoán thế) đang dùng các xúc tu để cuộn các container lên kìa.  

` -> Okie, ý tưởng cơ bản là vậy, cùng tìm hiểu chi tiết nhé !  `
  
 + À quên, bài viết sử dụng [Rails framework](https://rubyonrails.org) (một framework của Ruby dùng để lập trình web) để ứng dụng Docker, còn với các framework của `PHP (Laravel, Yii, ...)` hay `Python (Django, ...)` thì mình sẽ tìm cách làm tương tự nha.
 
 + Quan trọng là mình hiểu cách sử dụng `docker-compose`, nếu có điều kiện, mình sẽ tìm hiểu và viết thêm bài hướng dẫn sử dụng Docker trên Laravel hoặc các framework khác.
 
 + Các bạn cũng có thể skip để chuyển sang [Docker: Chưa biết gì đến biết dùng ( Phần 4 - Một số trick tối ưu và lưu ý )](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-4-mot-so-trick-toi-uu-va-luu-y-LzD5dJREZjY)

![](https://images.viblo.asia/1ca75943-1a33-47a5-b40e-b4f9bdde7102.gif)![](https://images.viblo.asia/1ca75943-1a33-47a5-b40e-b4f9bdde7102.gif)  `Let go ` ![](https://images.viblo.asia/1ca75943-1a33-47a5-b40e-b4f9bdde7102.gif)![](https://images.viblo.asia/1ca75943-1a33-47a5-b40e-b4f9bdde7102.gif)

# 3. Cài đặt Docker-compose

Tham khảo trên [trang chủ](https://docs.docker.com/compose/install) nào, trên `Linux` thì sẽ như sau:


+ `Step 1:` Run this command to download the latest version of Docker Compose.

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

+ `Step 2:` Apply executable permissions to the binary

```
sudo chmod +x /usr/local/bin/docker-compose
```

+ `Step 3:` Test the installation

```
docker-compose --version
```


-> Đây là phiên bản đang cài đặt trên máy tính của mình:
```
docker-compose version 1.23.1, build b02f1306
```

`-> Xong roài, có vẻ nhanh - gọn - nhẹ`  :v: :v: :v:

# 4. Cấu trúc thư mục

`-> Tham khảo tài liệu từ đâu ?`

 + Khá là hay ho khi trên trang chủ Docker đã có bài hướng dẫn [Docker for Rails](https://docs.docker.com/compose/rails).

+ Thông thường, mình thấy tham khảo trên trang chủ cũng khá là đủ rồi 

+ Nhưng cũng hơi bất ngờ khi trong thực tế làm dự án, anh em trong team nhận thấy vẫn còn một số điểm `chưa được thực sự tối ưu` 

+ Nên sau đây chúng ta cùng tìm hiểu cách `apply docker-compose` dựa vào bài hướng dẫn trên và đống thời `tối ưu` hơn nhé ! Nếu các bạn nhận thấy phần nào có thể làm tốt hơn thì mời comment bên dưới nha.
 
`-> Tạo các file cấu hình`


Bao gồm [3 file sau](https://github.com/HoanKy/docker_tutorial/tree/rails_mysql_core):

![](https://images.viblo.asia/27e04dce-ee4f-4dbd-9eb4-819371f78e40.png)

+ `1. docker / entrypoint.sh`:   


  Liệt kê những câu lệnh cần chạy sau khi bật container.


+ `2. Dockerfile`

  Về công dụng của nó thì chắc hẳn các bạn còn nhớ chúng ta đã đề cập ở  [bài trước](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-2-dockerfile-RQqKLzeOl7z#_21-dockerfile-la-gi--2):
![](https://images.viblo.asia/e5fd3528-9874-4554-867b-c5d29b073c59.png)


+ `3. docker-compose.yml`: 

  Dùng để `khai báo` và `điều phối` hoạt động của các `container` trong project.


# 5. Xác định các container cần thiết

Ở mức cơ bản nhất, chúng ta sẽ xây dựng 2 container:

`-> Thứ nhất là container dùng để kết nối tới cơ sở dữ liệu.`

  + Hiện nay, phần lớn các dự án có lẽ hay sử dụng `mysql`, để gần gũi và quen thuộc với mọi người nên mình sẽ dùng cơ sở dữ liệu [mysql](https://hub.docker.com/_/mysql). 
  
  + Còn nếu hịn hò hơn thì bạn có thể [tìm hiểu](https://viblo.asia/p/8-diem-so-sanh-giua-mysql-va-postgresql-de-chon-lua-cai-nao-phu-hop-hon-OeVKB4NElkW) và sử dụng `postgresql` nhé
  
  + Teachnical leader của dự án mình cũng khuyến khích sài công cụ này, và google một hồi thì có vẻ như nó có nhiều ưu điểm hơn thật, ví dụ như lưu trữ với kiểu dữ liệu array hay gán giá trị mặc định với kiểu dữ liệu `text` ...
    
  + Quay trở lại vấn đề chính nào, quan sát:
    ```
    https://hub.docker.com/_/mysql/
    ```
    Chúng ta sẽ thấy tên organization là `/_/` và bên dưới tên image có dòng chữ `Docker Official Images`
    
    ![](https://images.viblo.asia/56906740-0f2c-4c95-8cff-eb8558a4e7fa.png)
    
    Đây chính là những `image chính thức` được Docker cung cấp, chúng ta sẽ yên tâm hơn khi sử dụng, và khuyến cáo luôn là nên sử dụng (Hàng chính hãng, ít có khả năng gặp bug hơn hoặc chèn mã độc)
    ___
    Trên DockerHub còn rất nhiều image khác dành cho [mysql](https://hub.docker.com/search?q=mysql&type=image), ví dụ [bitnami/mysql](https://hub.docker.com/r/bitnami/mysql)
    
    ![](https://images.viblo.asia/9d71b570-8fe3-4c45-b072-00527fb7d3ac.png)
    
    Đây là những image do các cá nhân, tổ chức khác xây dựng, có thể sẽ có những cải tiến so với bản official nhưng độ tin cậy và chính xác thì khó mà bằng bản chuẩn được.
    ___
    
`-> Thứ hai là container dùng cho web application.`

   + Có thể có bạn chưa rõ, ta có PHP là một ngôn ngữ lập trình, Laravel là một PHP framework, dùng để lập trình web.

   + Thì tương tự như vậy, Ruby cũng là một ngôn ngữ lập trình, Rails là một Ruby framework dùng để lập trình web.
    
   ![](https://images.viblo.asia/8bae3636-1c7d-4ae6-bc4b-d85e1346ed0c.png)
    
    
  + Lát nữa chúng ta dùng image [ruby](https://hub.docker.com/_/ruby) này để tạo `container` cho `web application` nhé !
    
    ---
`-> Okie xong, đã xác định được 2 image tương ứng với 2 container cần xây dựng.`


# 6. Viết docker-compose
Chúng ta sẽ viết `docker-compose.yml` trước để có cái nhìn tổng quan về các services trong project nhé


+ Phiên bản của `docker-compose`

```
version: '3.5'
```

+ Liệt kê các services
```
services:
    mysql:
        ...
        ...
        ...
    app:
        ...
        ...
        ...
``` 

+ Cài đặt cho từng services


```
mysql:
    image: mysql:5.7
    container_name: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
    volumes:
      - docker/database:/var/lib/mysql
```

☑ [image](https://docs.docker.com/compose/compose-file/#image): Chỉ định `image` để khởi động `container`, ở đây ta dùng image có sẵn như đã nói ở mục 4.

☑ [container_name](https://docs.docker.com/compose/compose-file/#container_name): Chỉ định tên container tùy chỉnh, thay vì tên mặc định.

☑ [restart](https://docs.docker.com/compose/compose-file/#restart): Giá trị mặc định là `no`, còn nếu bạn đặt là `always` thì container sẽ khởi động lại nếu mã thoát cho biết lỗi không thành công.

☑ [environment](https://docs.docker.com/compose/compose-file/#environment):  Thêm các biến môi trường

☑ [volumes](https://docs.docker.com/compose/compose-file/#volumes): Chia sẻ dữ liệu giữa container (máy ảo) và host (máy thật) hoặc giữa các container với nhau.

  Ví dụ: 
  
  + Khi `container mysql` tạo và lưu dữ liệu thì dữ liệu này sẽ lưu ở trong thư mục `var/lib/mysql` của container. Như vậy nếu như container này bị xóa đi thì chúng ta sẽ `mất toàn bộ data`
  
  ![](https://images.viblo.asia/eceab69d-3056-458e-a2ec-dc067b61def9.gif)
  
  + Ôi buồn quá   -_-  Làm gì bây giờ ?
  
  + Giải pháp là chúng ta sẽ `sao lưu` dữ liệu đó ra ngoài máy host, như vậy khi container bị xóa, dữ liệu sẽ vẫn được lưu trữ ở máy host. Và ở khi bật lại container, dữ liệu lại được mount từ máy host vào trong container và chúng ta tiếp tục sử dụng nó bình thường.
  
  + Thư mục lưu trữ data ở ngoài máy host sẽ không được `commit` vào git, ta đưa nó vào [gitignore](https://github.com/HoanKy/docker_tutorial/blob/rails_mysql/.gitignore#L29). 
       ```
      # Ignore data backup
      docker/database
      ```

  + Ở một số hướng dẫn có lưu dữ liệu backup vào trong thư mục mà framework đã `gitignore` sẵn, ví dụ như đối với `Rails` là `/tmp` hoặc lưu ở ngoài thư mục dự án thì không cần `gitignore` nó nữa.
  
```
app:
    container_name: app
    build: .
    volumes:
      - .:/my_app
    ports:
      - "3000:3000"
    environment:
      DATABASE_HOST: mysql
      DATABASE_USER_NAME: root
      DATABASE_PASSWORD: root
```

☑ [build](https://docs.docker.com/compose/compose-file/#build): Sử dụng khi chúng ta không xây dựng `container` từ `image` có sẵn nữa mà xây dựng nó từ `Dockerfile`. 
  + Nếu `Dockerfile` nằm cùng thư mục với `docker-compose.yml` thì chỉ cần 
   ```
   build: .
   ```
  + Nếu bạn muốn đặt `Dockerfile` trong thư mục `docker` để cùng với `entrypoint.sh` cho gọn thì sửa thành
  ```
      build:
         context: ./
         dockerfile: docker/Dockerfile
  ```

☑ [ports](https://docs.docker.com/compose/compose-file/#ports): Cấu hình cổng kết nối
  
  Có thể chỉ định cả 2 cổng (HOST:CONTAINER)  tức là (cổng ở máy thật: cổng ở máy ảo) hoặc chỉ định mình cổng cho máy ảo thôi.
  
  Ví dụ: `"2222:3333"` Khi bạn truy cập vào cổng `2222` ở máy thật thì sẽ được trỏ tới truy cập ở cổng `3333` của máy ảo.
  
☑ [environment](https://docs.docker.com/compose/compose-file/#environment): Bổ sung các biến môi trường.


  Lưu ý rằng `DATABASE_HOST` chính là tên của service mysql.


   Mình đã push code lên [Github](https://github.com/HoanKy/docker_tutorial/blob/rails_mysql_core/docker-compose.yml).
# 7. Viết Dockerfile
-> Bây giờ ta sẽ viết `Dockerfile` cho container `app` trên kia nhé, chỗ mà `build .` ấy.

+ Image cơ sở
    ```
    FROM ruby:2.5.1
    ```

+ Đánh dấu lãnh thổ chút
    ```
    LABEL author.name="HoanKy" \
    author.email="hoanki2212@gmail.com"
    ```

+ Cặt đặt các phần mềm cần thiết cho máy ảo
    ```
    RUN apt-get update && \
      apt-get install -y nodejs nano vim
    ```

+ Set timezone cho máy ảo (Optional)
    ```
    ENV TZ=Asia/Ho_Chi_Minh
    RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
    ```

+ Chỉ định thư mục làm việc mặc định (Optional)
    ```
    ENV APP_PATH /my_app
    WORKDIR $APP_PATH
    ```

+ Cài đặt framework cần thiết cho dự án

    ```
    COPY Gemfile Gemfile.lock $APP_PATH/
    RUN bundle install --without production --retry 2 \
      --jobs `expr $(cat /proc/cpuinfo | grep -c "cpu cores") - 1`
    ```

+ Copy tất cả dữ liệu tự máy host vào trong container
    ```
    COPY . $APP_PATH
    ```

+ Cấu hình file `entrypoint.sh`
    ```
    COPY docker/entrypoint.sh /usr/bin/
    RUN chmod +x /usr/bin/entrypoint.sh
    ENTRYPOINT ["entrypoint.sh"]
    EXPOSE 3000
    ```
+ Thiết lập câu lệnh mặc định sẽ chạy khi khởi động `container`

     ```
     CMD ["rails", "server", "-b", "0.0.0.0"]
     ```


-> Mình có push code mẫu lên [Github](https://github.com/HoanKy/docker_tutorial/blob/rails_mysql_core/Dockerfile)

# 8. Viết entrypoint.sh
-> Chạy `file sh` với bash chứ ko phải là  [sh hay zsh](https://viblo.asia/p/hieu-ro-hon-toi-uu-va-su-dung-phim-tat-cho-terminal-ORNZqowM50n)
```
#!/bin/bash
set -e
```

-> Xóa tiến trình cũ 

```
rm -f /my_app/tmp/pids/server.pid
```

+ Mỗi khi khởi chạy `rails server`  sẽ có một mã `id` được sinh ra và lưu vào file `tmp/pids/server.pid` để đánh dấu rằng đã tồn tại tiến trình rails đang chạy.

+ Khi bạn stop `rails server` thì rails sẽ xóa nội dung file này, tuy nhiên trong trường hợp bạn `kill rails process` thì rails server sẽ bị stop mà chưa kịp xóa nội dung file, và khi bạn start lại server thì sẽ gặp lỗi
    ```
    => Booting Puma
    => Rails 5.0.0 application starting in development on http://0.0.0.0:3000
    => Run `rails server -h` for more startup options
    A server is already running. Check /balabala/tmp/pids/server.pid.
    Exiting
    ```

+ Như vậy, ta sẽ xóa thủ công nó luôn để đảm bảo không gặp lỗi này, gọi là chặn từ lúc trứng nước.

-> Thực thi câu lệnh truyền vào.

```
exec "$@"
```



Mình có push code mẫu lên [Github](https://github.com/HoanKy/docker_tutorial/blob/rails_mysql_core/docker/entrypoint.sh)

# 9. Sử dụng docker-compose

### 9.1 Trường hợp tạo dự án mới

`-> Khi setup project với Rails trực tiếp trên máy thật theo cách truyền thống`

+ Chạy câu lệnh sau để initialize project, khi đó các file, folder sẽ tự động được sinh ra:
    ```
    rails new . --force --no-deps --database=mysql
    ```

`-> Khi setup project thông qua Docker thì sao ?`

+ Khi đó, chúng ta sẽ không cài Rails vào máy thật nữa.

+ Hãy run một `container` đã cài `Rails` lên và chạy câu lệnh trên bên trong `container` đó, rồi mount các file, folder của framework được vừa được tạo ra ngoài máy host.

+ Ở đây, container đó chính là container `app` mà ta vừa xây dựng ở trên.

+ Cú pháp để chạy một câu lệnh bên trong `container` như sau:

    ```
    sudo docker-compose run + tên container + Câu lệnh muốn chạy
    ```

   Như vậy, bạn hãy chạy:

    ```
    docker-compose run app rails new . --force --no-deps --database=mysql
    ```

![](https://images.viblo.asia/9adbd67c-01ff-4f59-a905-d1e6e191ff12.png)

+ Việc này sẽ mấy chút thời gian, trong quá trình chờ đợi thì bạn nên theo dõi log ở Terminal để xem các bước Docker thực hiện như thế nào nhé ! 

` -> Note 1: Khai báo Rails version`

+  Nếu bạn cài Rails trực tiếp trên máy thật thì đã có sẵn phiên bản của Ruby (ngôn ngữ lập trình) và Rails (framework của ngôn ngữ) rồi, ví dụ:

    ```
     $ ruby -v 
     ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-linux]

     $ rails -v
     Rails 5.2.2.1
    ```

   Còn như ở Dockerfile phía trên, chúng ta mới chỉ có 
   ```
   FROM ruby:2.5.1
   ```
   chứ chưa cài đặt Rails.
   
 + Thứ hai là khi build image, ở step 
   ```
   COPY Gemfile Gemfile.lock $APP_PATH/
   ```
   có nghĩa là copy Gemfile từ máy host vào container thì chúng ta chưa có file này ở máy host:

    Như thế sẽ gặp lỗi:  `no such file or directory`
    
 + Vậy nên, chúng ta tạo thêm 2 file: Gemfile và Gemfile.lock

      Gemfile:
   
     ```
    source "https://rubygems.org"
    gem "rails", "~>5"
     ```

      Gemfile.lock
    ```
    # File này để trống
    ```

![](https://images.viblo.asia/ae9229e5-9d76-44cb-b512-5525f49ec0d8.png)

+ Rồi sau đó hẵng chạy lại câu lệnh 

   ```
   docker-compose run app rails new . --force --no-deps --database=mysql
   ```
   
   
+ Mình đã push code mẫu lên [Github](https://github.com/HoanKy/docker_tutorial/tree/rails_mysql_core) rồi nhé, bởi vì đây là config thư viện của Rails nên không giới thiệu chung với các config của Docker.


` -> Note 2: Cấp lại quyền cho file, folder`

+ Có thể bạn đã biết, mặc định thì docker chạy với `user root` nên những file, folder nó tạo ra (sau khi `mount` từ `container` ra máy `host`) cũng ở quyền `root`.

![](https://images.viblo.asia/ae97cd2c-6be0-48b6-8703-8c93830c4c99.png)


+ Vậy nên khi bạn dùng editor để `chỉnh sửa` những file này thì `Linux OS` sẽ thông báo.

    ```
    Permission denied
    ```

+ Giải pháp thì set lại quyền cho nó thôi

    ```
    sudo chown -R $USER:$USER .
    ```

![](https://images.viblo.asia/e3b58304-4ede-4ade-8e86-20ea482b4b05.png)

`-> Note 3: Cấu hình để kết nối tới database`

  + Đối với `Rails framework`  thì config này nằm ở file `config/database.yml` 
  
  Sửa từ
  ```
  default: &default
      adapter: mysql2
      encoding: utf8
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
      username: root
      password:
      host: localhost
  ```
  thành 
  ```
  default: &default
        adapter: mysql2
        encoding: utf8
        pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
        username: <%= ENV.fetch("DATABASE_USER_NAME") || "root" %>
        password: <%= ENV.fetch("DATABASE_PASSWORD") || "root" %>
        host: <%= ENV.fetch("DATABASE_HOST") || "mysql" %>
  ```

+ Xong xuôi thì bạn chuyển qua mục 10.2 được rồi.

### 9.2 Trường hợp cho dự án đang phát triển

`-> Sửa cấu hình kết nối database`

+ Chỉnh sửa file `config setting connect database` cho phù hợp nếu cần (ví dụ với Rails: config/database.yml )

`-> Build các image cần thiết`

+ Cú pháp
    ```
    docker-compose build
    ```

+ Nếu gặp lỗi này

   ```
   IOError: Can not read file in context: /home/nguyenvanhoan/GitRepo/docker_tutorial/docker/database/ca-key.pem
   ```

  Do một số file trong thư mục `back_up database` cần quyền `root` để truy cập, hãy đổi thành

    ```
    sudo docker-compose build
    ```

![](https://images.viblo.asia/59fb3fcd-980d-43a5-a8b2-59d0ac3a6900.png)

`-> Khởi chạy container:`

+ Cú pháp
    ```
    sudo docker-compose up
    ```

    Màn hình log:

![](https://images.viblo.asia/ac2ec4d8-fb52-4df6-a98d-7c4ca5223eff.png)

  Òa, log bắn ra ầm ầm, kệ nó đi, bạn vào địa chỉ :
  
   ```
    http://localhost:3000
   ```
  
  và tận hưởng thành quả nào:

   ![](https://images.viblo.asia/eb546c30-f0e7-468f-b915-f708f6531f50.png)

`-> Vâng, bug đỏ lòm đập vào mặt, lỗi này là do chúng ta chưa tạo database.`

+ Tạo cơ sở dữ liệu

    Với mỗi framework sẽ có cách khác nhau để tạo `database`.
    
    Còn đối với rails, nếu ở máy thật, bạn cần gõ 2 câu lệnh sau để tạo database:
    ```
    # Xóa và tạo lại các bảng và quan hệ giữa chúng
    rails db:migrate:reset
    ```

    Còn bây giờ, chúng ta hãy truy cập vào máy ảo để chạy câu lệnh này, bằng cách 
    ```
    sudo docker-compose run + tên container + Câu lệnh muốn chạy
    ```
    
    Và ở đây, ta cần:
    ```
    sudo docker-compose run app rails db:migrate:reset
    ```
 
 ![](https://images.viblo.asia/54742a62-9504-4307-af65-1646a1272a47.png)
 
  + Truy cập vào `http://localhost:3000` nào
     
     ![](https://images.viblo.asia/e8afba11-056a-4e47-b708-cee0137d0bdf.png)
  
   + Lưu ý
     
     + Nếu vừa rồi bạn ấn `Ctrl + C` để dừng `docker-compose up` thì khi chạy câu lệnh tạo cơ sở dữ liệu sẽ gặp lỗi 
     ```
     Mysql2::Error::ConnectionError: Unknown MySQL server host 'mysql' (-2)
     ```
     
  +   Vì sao ?
     
      Nhìn vào log trên ta sẽ thấy 

![](https://images.viblo.asia/248ddd94-92e2-48df-af9d-e5863d4d7b14.png)
     
 Tức là `service mysql` đã bị dừng lại, vậy nên `service app` của chúng ta không thể kết nối tới `mysql service`.
     
+   Để giải quyết điều này thì có nhiều cách:
     
 1. Đơn giản nhất là bạn giữ nguyên tab đang chạy `docker-compose up` và mở thêm tab để chạy migrate data.

 2. Dùng option `-d`
     ```
     docker-compose up -d
     ```

 3. Thay đổi cách khởi động các `container` thủ công

     Bài cũng đã dài, chúng ta sẽ tìm hiểu cách 3 ở phần 4 nhé, đây cũng là cách khuyến khích sử dụng.

 4. Thay đổi cách khởi động các `container` bằng `depends_on`

     Cách này không khuyến khích (Cũng sẽ giải thích ở phần 4 luôn)
 ___

![](https://images.viblo.asia/ba8b4fc3-b5ad-4379-9619-85edbf1b7230.png)

 + Cũng đủ kiến thức cơ bản về `docker-compose` rồi
 + Nếu bạn gặp lỗi hoặc bị vướng ở đoạn nào chưa hiểu thì hãy để lại bình luận bên dưới, mình sẽ support nếu có thể nhé !
 + Code mẫu cho phần core config mình đã push lên [đây](https://github.com/HoanKy/docker_tutorial/tree/rails_mysql_core).
 + Còn code sau khi các file được sinh ra thì mình đã push lên [đây](https://github.com/HoanKy/docker_tutorial/tree/rails_mysql).
     
# 10. Updating ...

+ Còn một chút lưu ý cũng như một số mẹo để sử dụng docker nhanh, gọn nhẹ hơn.
 
  => Mình sẽ cập nhật ở phần 4 nhé. Mời cả nhà đón đọc !
  
+  ###############################################

   :D :D :D Thank for your attention :D :D :D 

   :D :D :D Mình đã viết xong [Docker: Chưa biết gì đến biết dùng ( Phần 4 - Một số trick tối ưu và lưu ý )](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-4-mot-so-trick-toi-uu-va-luu-y-LzD5dJREZjY), mời các bạn đọc tiếp. :D :D :D 
   
![](https://images.viblo.asia/ef1050c5-4427-4242-8bbd-78f2cfbea142.gif)