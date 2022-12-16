Khi nói đến việc xây dựng container Docker, chúng ta nên luôn cố gắng để có thể tạo ra các image vớ kích thước nhỏ hơn. Giảm kích thước image của bạn sẽ giúp cải thiện tính bảo mật, hiệu suất hiệu quả và khả năng bảo trì của các container của bạn.

Trong bài biết này, mình sẽ chia sẻ một số những phương pháp có thể giúp tối ưu hóa kích thước image của chúng ta.

# 1. Chọn đúng base image.

Lựa chọn base image phù hợp là bước đầu tiên và là bước quan trọng trong quá trình build image docker của bạn. Việc lựa chọn base image phụ thuộc vào nhiều điều kiện như loại ứng dụng bạn muốn chạy trên container là gì? hay các công cụ bạn cần có trong container để chạy ứng dụng của mình,... Theo mình tổng kết lại, có 2 đặc điểm chính để bạn có thể lựa chọn base image của mình như sau:
- Lựa chọn base image gần với nhu cầu ứng dụng của bạn nhất có thể. Ví dụ khi bạn cần 1 môi trường chạy app laravel với composer. Thay bằng lựa chọn base image là ubuntu sau đó bạn tự cài composer lên đó thì bạn nên chọn base image là composer có sẵn của Docker. Việc này giúp ta tối ưu thời gian build. Ngoài ra, các base image này thường đã được Docker xây dựng là các base image được tối ưu nhất rồi. Rất khó để bạn có thể làm tốt hơn.
- Trừ khi yêu cầu ứng dụng của bạn  không cho phép hoặc image không có sẵn, nếu không hãy luôn sử dụng image được dựng trên `alpine`. **`Alpine Linux` là một distro linux dựa trên musl và BusyBox, được phát triển chú trọng về đơn giản, bảo mật và hiệu quả tài nguyên**. Nói gắn gọn thì đây là một distro linux gọn nhẹ hơn và an toàn hơn. 
  
  Điểm trừ duy nhất của alpine đó là việc nó rất nhỏ gọn nên bạn phải tự cài đặt thêm các công cụ hay  thư viện bạn cần dùng cho ứng dụng của mình, và thỉnh thoảng cũng khá là rắc rối :D

  Ví dụ, thay vì sử dụng `FROM node:12`, hãy thử  chuyển qua sử dụng `FROM node:12-alpine`, bạn sẽ thấy dung lượng của image giảm đi rất nhiều đấy. Các image dựng trên alpine có dung lượng rất nhẹ, với nodejs là giảm từ 900MB của bản mặc định xuống chỉ còn 70MB của alpine. 
# 2. Tối ưu hóa Layers.

Docker image được xây dựng từ một loạt các layer. Mỗi câu lệnh trong Dockerfile đều tạo ra một read-only layer bọc vào image do câu phía trên tạo ra và tiếp tục tạo ra một image mới. Image cuối cùng chính là một củ hành lớn với nhiều lớp. Ngay cả container thực ra cũng là một writable layer bọc lên trên image.
![](https://images.viblo.asia/4e442b5f-5241-415b-a925-e52a654057b3.jpg)

Các layer không phải là **free**. Chúng chiếm dụng không gian và khi layer xếp chồng lên nhau ngày càng nhiều thì kích thước image cuối cùng của bạn cũng tăng lên. Nguyên nhân là do hệ thống sẽ lưu giữ tất cả các thay đổi giữa các chỉ thị Dockerfile khác nhau. Do vậy. **giảm số lượng layer** là điều đầu tiên cần nghĩ khi muốn giảm kích thước images.

Mối step trong Dockerfile đều tạo ra layer, tuy nhiên, những step có các chỉ thị Dockerfile tạo ra các thay đổi so với layer hiện tại thì sẽ tạo ra các layer mới với size > 0 bytes. Kể từ Docker 1.10, các chỉ thị `COPY`, `ADD` và `RUN` trong Dockerfile sẽ thêm một layer mới vào image của bạn vì chúng sẽ thay đổi file system. Các chỉ thị như `WORDIR`, `CMD` hay `EXPOSE`,... sẽ tạo ra các layer trống với size =  0 bytes.

Ví dụ, chúng ta có Dockerfile đơn giản sau:

```
FROM ubuntu:18.04

WORKDIR /var/www

RUN apt-get update
RUN apt-get -y install curl
RUN apt-get -y install vim
```
Sau đó, ta thực hiện build image từ Dpckerfile treen: `docker build -t layer:example .`

Sau khi image được tạo, bạn có thể xem tất cả các layer được tạo bằng lệnh `docker history <image>`
```
$ ~ docker history ubuntu:example   
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
3254f0ec9c48        8 minutes ago       /bin/sh -c apt-get -y install vim               54.8MB              
dac7e4ba12f9        8 minutes ago       /bin/sh -c apt-get -y install curl              14.3MB              
be0ed9278c8f        2 hours ago         /bin/sh -c apt-get update                       34.1MB              
a6494da55123        2 hours ago         /bin/sh -c #(nop) WORKDIR /var/www              0B                  
56def654ec22        2 weeks ago         /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B                  
<missing>           2 weeks ago         /bin/sh -c mkdir -p /run/systemd && echo 'do…   7B                  
<missing>           2 weeks ago         /bin/sh -c [ -z "$(apt-get indextargets)" ]     0B                  
<missing>           2 weeks ago         /bin/sh -c set -xe   && echo '#!/bin/sh' > /…   745B                
<missing>           2 weeks ago         /bin/sh -c #(nop) ADD file:4974bb5483c392fb5…   63.2MB 
```

Tiếp theo, thay vì sử dụng 3 chỉ thị `RUN` như trên, ta có thể viết lại Dockerfile trên thành:

```
FROM ubuntu:18.04

WORKDIR /var/www

RUN apt-get update && apt-get -y install curl vim
```
Sau đó, ta thực hiện build image từ Dpckerfile treen: `docker build -t layer:example.01 .` và xem các layer được tạo:
```
$ ~ history ubuntu:example.01   
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
27f132fcb254        5 seconds ago       /bin/sh -c apt-get update && apt-get -y inst…   102MB               
a6494da55123        2 hours ago         /bin/sh -c #(nop) WORKDIR /var/www              0B                  
56def654ec22        2 weeks ago         /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B                  
<missing>           2 weeks ago         /bin/sh -c mkdir -p /run/systemd && echo 'do…   7B                  
<missing>           2 weeks ago         /bin/sh -c [ -z "$(apt-get indextargets)" ]     0B                  
<missing>           2 weeks ago         /bin/sh -c set -xe   && echo '#!/bin/sh' > /…   745B                
<missing>           2 weeks ago         /bin/sh -c #(nop) ADD file:4974bb5483c392fb5…   63.2MB 
```
# 3. Sử dụng multi-stage builds.
Multi-stage build là một tính năng mới được giới thiệu từ Docker v17.05. Multi-stage build rất hữu ích khi bạn muốn tối ưu hóa Dockerfile của mình mà vẫn giữ cho nó vừa dễ đọc, vừa dễ mantain.

Khi chương trình được bạn xây dựng và chương trình đó chỉ cần chạy 1 hoặc vài file thực thi, cấu hình. Các file trong chương trình đó lại yêu cầu cần cài đặt môi trường, gói, mô-đun rất khó và phức tạp. Nó còn cần một dung lượng khá cao nên có thể khiến cho file Images của bạn nặng hơn. Tuy nhiên, với multi-stage build bạn có thể thực hiện các công việc cài đặt đó ở các stage có đầy đủ môi trường, rồi copy file cần thiết sang stage dựa trên images nhẹ hơn, nhưng đủ để execute/run ứng dụng của bạn.

Ví dụ, để build Dockerfile cho một ứng dụng Laravel đơn gian, ta sẽ thực hiện qua các bước sau:
- **Step 1: Composer**
  + Sử dụng base image là composer
  + Copy các file cần thiết cho "composer install"
  + Chạy "composer install"
  + Copy các file còn lại
  + Chạy "composer dump-autoload"
```
#
# PHP Dependencies
#
FROM composer:2.0 as vendor

WORKDIR /app

COPY database/ database/
COPY composer.json composer.json
COPY composer.lock composer.lock

RUN composer install \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --no-dev \
    --prefer-dist

COPY . .
RUN composer dump-autoload
```
- **Step 2: NPM**
  + Sử base image dụng NodeJs
  + Cop files cần thiết cho "npm install".
  + Chạy "npm install".
  + Copy files cần thiết cho build frontend.
  + Build 
```
#
# Frontend
#
FROM node:14.9 as frontend

WORKDIR /app

COPY artisan package.json webpack.mix.js yarn.lock tailwind.js ./

RUN npm install

COPY resources/js ./resources/js
COPY resources/sass ./resources/sass

RUN npm run production
```
- **Step 3: Application**
  + Sử dụng base image là php-fpm
  + Sao chép các tệp đã được build từ các step trước 
  + Triển khai ứng dụng của bạn
```
#
# Application
#
FROM php:7.4-fpm

WORKDIR /app

# Install PHP dependencies
RUN apt-get update -y && apt-get install -y libxml2-dev
RUN docker-php-ext-install pdo pdo_mysql mbstring opcache tokenizer xml ctype json bcmath pcntl

# Copy Frontend build
COPY --from=frontend /app/node_modules/ ./node_modules/
COPY --from=frontend /app/public/js/ ./public/js/
COPY --from=frontend /app/public/css/ ./public/css/
COPY --from=frontend /app/public/mix-manifest.json ./public/mix-manifest.json

# Copy Composer dependencies
COPY --from=vendor /app/vendor/ ./vendor/
COPY . .

RUN php artisan config:cache
RUN php artisan route:cache
```
# 4.  Loại bỏ hoặc không sử dụng những packages hay file không cần thiết.

*''Khi Build các container để chạy trong production, mọi package không sử dụng, hoặc các package được bao gồm cho mục đích debug, cần được loại bỏ.''*

Dưới đây là một số tips giúp bạn thực hiện điều đó:
### Đừng cài đặt các debug tools như vim/curl/...

Một trường hợp thường thấy là các developer cài đặt các công cụ  như `vim` và `curl` trong của họ Dockerfile để họ có thể dễ dàng debug ứng dụng của họ hơn. Thế nhưng, trừ khi ứng dụng của bạn phụ thuộc vào chúng, đừng cài đặt những phụ thuộc đó. Làm như vậy sẽ đi ngược lại mục đích của việc sử dụng một base image nhỏ gọn.

*Nhưng nếu không cài đặt thì làm thế nào để có thể debug được?*

Câu trả lời là bạn hãy luôn có những Dockerfile với đầy đủ những tool bạn cần trên môi trường staging. Sau đó, khi đem chúng triển khai trên môi trường production thì hãy loại bỏ tất cả các công cụ đó đi nhé =)))

### Hãy sử dụng `.dockerignore` files

Thư mục trên host chứa Dockerfile gọi là build context. Khi build toàn bộ các file/thư mục trong build context được send đến docker server. Nếu build context có một file nặng vài G mà không dùng đến trong image thì nó cũng bị send đến server và điều này không chỉ làm tăng kích thước của image lên mà còn gây lãng phí thời gian build image một các đáng kể. Do vậy, khi muốn bỏ đi một hoặc một số file/folder nào đó thì ta cần tạo ra một file tên là `.dockerignore`, vai trò của nó thì y như `.gitignore` vậy, và cú pháp cũng viết cũng tương tự như thế.

Ví dụ :
```
# Git
*/**/.git
*/**/.gitignore
*/**/.gitattributes

# Docker
.dockerignore

# Env files
.env*

# node_modules
node_modules

# Logs
*/**/*.log

# Tests
tests
jest.config.js

# Linters
.eslintrc
.eslintignore

# Readme
README.md
```

### Sử dụng `--no-install-recommends` trong `apt-get install`

Hãy sử dụng `-- no-install-recommends` trên các `apt-get install -y` của bạn. Điều này có thể giúp bạn giảm đáng kể kích thước bằng cách tránh cài đặt các gói mà ứng dụng của bạn không hề cần đến nhưng được khuyến khích cài đặt cùng với các gói.

Ngoài ra, hãy sử dụng `--no-cache` trên các `apk add` để cho phép không lưu giữ index locally, giúp giảm kích thước image của bạn.
### Hãy thêm `rm -rf /var/lib/apt/lists/*` vào cùng layer với `apt-get installs`

Thêm `rm -rf /var/lib/apt/lists/*` vào cuối sau khi cài đặt với `apt-get -y install` để dọn dẹp.
Tương tự đối với `yum install`, bạn hãy thêm `yum clean all` vào nhé.

Ngoài ra, chẳng hạn nếu bạn cài đặt `wget` hoặc `curl` để download một số package, hãy nhớ kết hợp tất cả chúng trong một chỉ thị `RUN`. Sau đó vào cuối layer của chỉ thị `RUN`, hãy sử dụng `apt-get remove curl` hoặc `wget`khi bạn không cần chúng nữa. Điều này phù hợp với bất kỳ package nào mà bạn chỉ cần tạm thời.

# Tạm kết

Qua một số phương pháp mình vừa chia sẻ trên đây, hy vọng các bạn có thể xây dựng được các docker image với kích thước tối ưu nhất và mang lại nhiều lợi ích trong quá trình sử dụng image của mình nhé.

Cảm ơn các bạn đã theo dõi bài viết của mình!