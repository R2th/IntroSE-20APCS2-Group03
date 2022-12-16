Xin chào các bạn đã quay trở lại với [series học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình 👋👋

Ở bài trước chúng ta đã cùng nhau [dockerize ứng dụng VueJS và ReactJS](https://viblo.asia/p/dockerize-ung-dung-vuejs-reactjs-ORNZqxwNK0n) cùng với đó các vấn đề liên quan trong quá trình làm quen với Docker

Ở bài này chúng ta sẽ cùng nhau dockerize một ứng dụng Laravel nhé (hình như ae đọc blog của mình toàn fan Laravel thôi :D)

Bắt đầu thôi nào

# Tiền Setup
Nhớ check là các bạn đã cài Docker và Docker-compose rồi nhé. Nếu chưa thì nhớ check lại [phần cuối bài trước](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_setup-docker-va-docker-compose-14) của mình để biết cách cài đặt nhé.
# Setup

Nhớ check là các bạn đã cài Docker và Docker-compose rồi nhé. Nếu chưa thì nhớ check lại [phần cuối bài trước](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_setup-docker-va-docker-compose-14) của mình để biết cách cài đặt nhé.

Setup
Các bạn clone source code [ở đây nhé](https://gitlab.com/maitrungduc1410/learning-docker)

Ở bài này ta sẽ chỉ cần quan tâm tới 1 folder trong source code bên trên đó là **docker-laravel** nhé 😉

Ở thư mục trên mình đã tạo sẵn cho các bạn một project Laravel rồi. Nếu máy các bạn có PHP, composer cài sẵn thì có thể chạy lên xem thử. Còn nếu không thì vẫn ok nhé, hãy cứ giữ "zin" cho máy gốc của các bạn và Docker sẽ lo hết ;)

# Build Docker Image
## Lắc não
Đối với project Laravel sẽ "hơi khó hơn" chút khi dockerize, do đó mình sẽ phân tích cho các bạn trước, rồi sau đó ta sẽ cùng cấu hình môi trường dựa vào phân tích nhé.

- Để chạy được một project Laravel đơn giản (như bài này) ta cần tới **PHP** (đương nhiên :-D) và **composer** (chưa nói tới DB, redis,....)
- Để chạy được code PHP ta cần 1 bạn tên gọi là "handler", ý là code PHP không phải cứ thế ăn ngay chạy luôn được, cần phải có một anh bạn đảm nhận nhiệm vụ thực thi code PHP. Và ở thời điểm hiện tại thì PHP-FPM là phổ biến nhất, nên ta sẽ dùng PHP-FPM
- Thường thường hay thực tế là mình thấy là hầu hết thì ta sẽ dùng cùng với một webserver như Apache hay Nginx trong việc vận hành ứng dụng PHP (Laravel). Vì Nginx hiện tại cực kì phổ biến và mạnh mẽ vượt trội nhiều so với Apache. Nên ta sẽ dùng Nginx nhé

Do đó bài này ta sẽ tách ứng dụng thành 2 phần như sau:
- Một phần chứa PHP-FPM, trong đó có cài  tất cả mọi thứ liên quan như composer, thư viện, setup, vì php-fpm đảm nhiệm vai trò chính trong việc chạy code
- Một phần là webserver Nginx đóng vai trò như là 1 anh gác cửa, đứng ở bên ngoài, khi có request gửi đến anh gác cửa anh ấy sẽ làm một số nhiệm vụ và chuyển request vào cho php-fpm ở bên trong xử lý

Vì vậy lát nữa các bạn sẽ thấy ta có 2 services tương ứng ở file **docker-compose.yml** chứ không phải một như các bài trước nhé.
## Câú hình Dockerfile
Ở bài này Nginx ta chưa cần cấu hình gì phức tạp nên ta sẽ không cần 1 Dockerfile cho bạn ý, mà lát nữa ta dùng trực tiếp image Nginx được build sẵn. 

Ở đây ta chỉ cần viết cấu hình Dockerfile cho php-fpm nhé ;)

Ở folder **docker-laravel** các bạn tạo file **Dockerfile** với nội dung như sau:
```dockerfile
# Set master image
FROM php:7.2-fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Install PHP Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory
COPY . .
```
Mình sẽ giải thích những điểm quan trọng ở file Dockfile nhé:
- Đầu tiên ta bắt đầu từ image có tên **php:7.2-fpm-alpine** (mình lấy [ở đây](https://hub.docker.com/_/php))
- Tiếp theo ta chuyển đến đường dẫn **/var/www/html**
- Tiếp đó ta cài composer, để ta có thể cài các thư viện php
- Tiếp nữa là ta COPY toàn bộ folder hiện tại ở môi trường ngoài vào đường dẫn hiện tại trong Image, chính là WORKDIR

Ô không thấy CMD đâu cả ??? Ở bài đầu thấy nói là cần phải có CMD ở cuối Dockerfile thì mới chạy được cơ mà???

Chúng ta cùng vào tận gốc rễ image **php:7.2-fpm-alpine** [ở đây](https://github.com/docker-library/php/blob/331e0f4b4d365990a8fbd487da9c6494ad10ccba/7.2/alpine3.10/fpm/Dockerfile) nhé. Kéo xuống tận cùng và các bạn thấy có những dòng sau:
```
EXPOSE 9000
CMD ["php-fpm"]
```
Ở trên các bạn có thể thấy là bản thân image **php:7.2-fpm-alpine** đã chạy CMD cho chúng ta rồi, nên khi chạy Docker sẽ thấy là "container vẫn luôn trong trạng thái hoạt động" :D, đó là lí do vì sao ở Dockerfile của chúng ta ta không cần CMD nữa

Đồng thời các bạn chú ý cho mình dòng bên trên **EXPOSE 9000**, chú ý cho mình dòng đó, lát mình giải thích nhé ;)

## Build Image
Và vẫn như thường lệ như các bài khác, để build image thì ta chạy command sau nhé:
```
docker build -t learning-docker/laravel:v1 .
```
## Cấu hình docker-compose
Ta tạo file **docker-compose.yml** với nội dung như sau nhé:
```yaml
version: '3.4'
services:

  #PHP Service
  app:
    image: learning-docker/laravel:v1
    restart: unless-stopped
    volumes:
      - ./:/var/www/html

  #Nginx Service
  webserver:
    image: nginx:1.17-alpine
    restart: unless-stopped
    ports:
      - "8000:80"
    volumes:
      - ./:/var/www/html
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
```
Nom cũng ná ná các bài trước nhỉ :-D

Nhưng cũng cần giải thích một số chỗ ở trên cho các bạn thắc mắc nhé:
- ở service **app** mình có **mount** (hay hiểu đơn giản hơn đó là ánh xạ) 1 volume từ folder hiện tại vào bên trong container ở đường dẫn  **/var/www/html**, để làm gì thì các bạn xem ở cuối bài nhé
- ở service **webserver** ta vừa mount folder hiện tại vào bên trong **/var/www/html** đồng thời cũng mount thêm  file **nginx.conf** ở folder hiện tại vào bên trong container ở đường dẫn **/etc/nginx/conf.d/default.conf**. Vì để nginx có thể hiểu được php và vận hành cho đúng thì ta cần thêm 1 chút config nhỏ để khi được khởi chạy, Nginx sẽ đọc file config và vận hành cho đúng, file config đó sẽ được ta định nghĩa ở phần tiếp theo nhé :)
## Cấu hình Nginx
Mọi bài trước build xong Image là chạy được rồi nhưng bài này chúng ta cần phải cầu hình Nginx thêm chút nữa, vì lát nữa ta dùng Nginx như webserver nhé :)

Ở folder gốc **docker-laravel** chúng ta tạo file **nginx.conf** với nội dung như sau:
```
server {
    listen 80;
    index index.php index.html;

    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;

    root /var/www/html/public;

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_hide_header X-Powered-By;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
}
```
Ở trên các bạn chú ý dòng **fastcgi_pass app:9000;**: khi có request gửi đến nginx, nginx sẽ chuyển request đó tới PHP-FPM đang lắng nghe ở host tên là **app** và port **9000**.

Giải thích chút nhé :

Host tên là **app** ở đâu ra vậy? đó chính là địa chỉ của service **app** tên này sẽ phải trùng khớp với tên của service ta định nghĩa ở file **docker-compose nhé**

Cổng 9000 ở đâu ra đây, có thấy ở file **docker-compose** có map port gì đâu nhỉ? Thì các bạn xem lại phần cấu hình Dockerfile bên trên đoạn cuối chúng ta có vọc thử image **php:7.2-fpm-alpine** và thấy có đoạn **EXPOSE 9000**, đây là điểm rất quan trọng mà mình muốn các bạn để ý. 

EXPOSE 9000 nhằm mục đích muốn nói là: tôi chấp nhận cho container khác giao tiếp với tôi ở port 9000

Các bạn chú ý sự khác nhau giữa mapping port ở các bài trước và EXPORT port ở bài này nhé:
- Mapping port nhằm giúp thế giới bên ngoài giao tiếp được với container
- Export port nhằm giúp các container có thể giao tiếp được với nhau, ở trên **webserver** sẽ cần phải gửi request tới **app**, nên app phải expose port 9000, nhưng **webserver** không cần expose vì chẳng có ai gọi đến nó cả.
- Ở thế giới bên ngoài sẽ không gọi được vào service **app** ở port 9000 nhưng **webserver** thì có thể nhé :)

> Nếu bạn nào vẫn băn khoăn về việc có hay không cần EXPOSE và ý nghĩa của nó thì đọc comment có 1 bạn đã hỏi và mình đã làm demo trực tiếp giải thích nhé ;)
## Chạy project
À trước khi chạy các bạn tạo file `.env` đã nhé:
```
cp .env.example .env
```

Xong xuôi tất cả cấu hình rồi thì giờ ta chạy project thôi nhé. Các bạn chạy command sau:
```
docker-compose up
```

Sau đó mở trình duyệt và ta sẽ thấy như sau:

![Docker laravel](https://images.viblo.asia/8200f726-c8c5-4f43-9619-fe0bea097a00.png)

Đó là bởi vì ta chưa chạy **composer install**, lí do vì sao không chạy ngay lúc build image thì các bạn lại xem ở cuối bài nhé.

Và command này phải được chạy ở container của service **app** nhé, vì ở bên **webserver** chỉ có trách nhiệm "gác cửa" thôi, không có php hay composer gì cả, nếu ta chạy ở đó sẽ báo lỗi command not found nhé ;)

Để chạy **composer install** ta có 2 cách:
1. Chui vào trong container **app**
2. Đứng ở ngoài và chạy

Ta sẽ dùng cách 2 cho tiện nhé, các bạn chạy command sau:
```
docker-compose exec app composer install
```
Chờ command chạy xong ta quay lại F5 trình duyệt và thấy:

![Docker laravel](https://images.viblo.asia/39b8706b-a90c-42e2-becc-47e5a61d8d77.png)

Đó là vì ta chưa generate key cho project, nhưng đừng bấm vào nút "generate app key" nhé, ta làm bằng tay cho "nguy hiểm" :-D, các bạn chạy command sau để generate key nhé:
```
docker-compose exec app php artisan key:generate
```

Sau đó ta quay lại trình duyệt F5 lần nữa và....:

![Docker Laravel](https://images.viblo.asia/2b22bea8-a6be-4a2c-b04f-79a27c1a2e81.png)
## Nếu bạn gặp lỗi Permission Denied
Bởi vì container service `app` thì `php-fpm` nó được chạy bằng user `www-data` với `userId:groupId` là `82:82`, kiểm chứng bằng cách chạy:
```
docker-compose exec app sh
top
```
Các bạn sẽ thấy như sau:

![](https://images.viblo.asia/fb0dd4c3-55a5-4069-a6fe-77d267f35dfd.png)

Nhưng vì ta đang mount toàn bộ code ở môi trường gốc vào trong service `app` do vậy toàn bộ code thực tế trong container sẽ **ăn theo** permission với môi trường ngoài, và trong trường hợp này rất có khả năng code ở môi trường ngoài đang không phải thuộc sở hữu của  `userId:groupId=82:82`

Do đó để fix lỗi này thì các bạn làm như sau, **ở môi trường ngoài** ta chạy:
```
sudo chwown -R 82:82 .
```
Sau đó chạy lại docker-compose down và up đi là sẽ oke

> Lỗi này không xảy ra trên MacOS, nhưng đúng là ta nên đổi permission code ở môi trường ngoài cho khớp với user thực tế chạy trong container để tránh lỗi sau này

# Câu hỏi liên quan
## Tại sao không chạy composer install ngay lúc build image?
Câu trả lời là các bạn có thể để composer install ở trong Dockerfile để command đó được chạy ngay lúc build image. Nếu như thế thì ta cần phải comment đoạn **mount** volume của service app lại và mọi thứ sẽ chạy bình thường

Nhưng ở các bài sau ta sẽ cần sửa code trực tiếp ở bên ngoài và bên trong container sẽ phải được cập nhật lại để ta thấy được thay đổi trên trình duyệt luôn, như thế thì ta lại phải **mount** volume của service app.

Ừ thế **mount** volume của service app thì vấn đề gì xảy ra?

Khi ta **mount** volume của service app từ bên ngoài vào trong container thì khi container được khởi tạo, toàn bộ file từ bên ngoài sẽ được ghi đè vào bên trong container, dẫn tới việc folder **vendor** (do composer install mà có) sẽ bị biến mất trong container, vì ở môi trường ngoài ta đâu có **vendor**

Do đó ở bài này mình cho các bạn làm quen luôn và từ các bài sau thì ta đều chạy **composer install** sau chứ không cho vào file Dockerfile nhé các bạn

## Build lại image và lúc "chui" vào container app tôi thấy có file nginx.conf, có cần thiết?
Đúng là service app không cần gì đến file **nginx.conf**, service **app** đảm nhận trách nhiệm thực thi code PHP, còn service **nginx** mới cần đến file đó.

Mặc định khi build image sẽ lấy toàn bộ file ở folder hiện tại và build, nếu các bạn muốn bỏ đi một hoặc một số file/folder nào đó thì ta cần tạo ra một file tên là **.dockerignore**, vai trò của nó thì y như **.gitignore** vậy, và cú pháp cũng viết cũng xêm như thế.

Ví dụ ở bài của chúng ta, ta tạo file **.dockerignore** với nội dung như sau:
```
nginx.conf
```
Thì khi build image file nginx.conf sẽ được bỏ qua và container **app** của chúng ta khi chạy sẽ không có file đó nữa, giảm size của image xuống ;)

Các bạn nhớ file **.dockerignore** này nhé, ta sẽ dùng rất nhiều đấy ;)

## Ở bên trên phần cấu hình Dockerfile, đoạn giải thích lí do không cần CMD, vậy tại sao điều tương tự không xảy ra ở bài Dockerize ứng dụng NodeJS?

Nếu các bạn để ý ở bài [Dockerize ứng dụng NodeJS](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG#_cau-hinh-dockerfile-3) ở file Dockerfile ta vẫn phải có CMD, mặc dù khi vọc cấu hình của image **node:13-alpine** [ở đây](https://github.com/nodejs/docker-node/blob/31bd89bbd77709b5dae93c31dbd74bf32b7c4867/13/alpine3.10/Dockerfile) ta cũng đã thấy người ta có viết **CMD [ "node" ]**

Thế tại sao bài này ta lại không cần ??

VÌ lí do ở bài [Dockerize ứng dụng NodeJS](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG) ta cần chạy CMD là **npm start**, và CMD đó sẽ "ghi đè" lại CMD mà image **node:13-alpine** khai báo sẵn

Còn ở bài này thì ta không có yêu cầu gì đặc biệt và ta có thể sử dụng CMD mặc định  image **php:7.2-fpm-alpine** cung cấp

Hơi lằng nhằng  một chút các bạn để ý cho mình nhé ;)

# Bài về nhà
Có 1 bí mật đó là trong bài này ta hoàn toàn có thể không dùng tới Dockerfile, vì settings khá đơn giản, ta có thể chỉ cần dùng docker-compose.yml là đủ để chạy project lên được

Các bạn thử làm xem và comment cho mình biết kết quả nhé ;)

# Tổng kết
Lại thêm một bài với rất nhiều thứ mới, :-D. 

Ở bài này các bạn có thêm khá nhiều khái niệm mới, không chỉ mỗi Docker mà giờ là cả Linux và Webserver, đọc blog mà có khi đầu óc đang quay cuống :-D.Có nhiều đoạn mình nghĩ nát óc để giải thích nhưng cũng không chắc là đã dễ hiểu cho các bạn. Bài này mình sẽ còn phải review và edit nhiều nhiều để giúp bạn đọc dễ hiểu hơn.

Mình khuyên  là các bạn cứ từ từ bình tĩnh, ban đầu cứ "chấp nhận" và dùng nó, sau đó vừa làm vừa học và tìm hiểu thêm và nhận ra chân lý nhé ;)

Qua bài này có một số nội dung quan trọng mình muốn nói như sau:
- EXPOSE PORT, phân biệt EXPOSE PORT với Mapping Port
- Dùng **.dockerignore** để bỏ đi file nào ta không muốn khi build image

Cá nhân mình thấy dockerize ứng dụng Laravel khá là lằng nhằng, nhưng khi các bạn đã quen rồi thì nó sẽ thực sự hữu ích, không chỉ dạy cho ta kiến thức về Docker mà còn cả những kiến thức liên quan đến Linux và webserver (nginx). Project Laravel này mới chỉ có Hello World, đến bài có MySQL, Redis, Queue, Horizon, Schedule task,... thì lúc đó mới thật sự là thách thức nhé :-D

Ở bài này chúng ta vẫn chưa làm phần support cho việc sửa code trực tiếp từ bên ngoài và thấy thay đổi ngay trên trình duyệt, ta cứ đi từ từ, chầm chậm các bạn nhé ;)

Nếu có gì thắc mắc các bạn cứ để lại comment cho mình biết nhé.

Source code bài này mình để [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh **complete-tutorial** nhé)

Cám ơn các bạn đã theo dõi và hẹn gặp lại các bạn vào các bài sau ^^