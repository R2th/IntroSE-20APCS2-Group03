## Lời mở đầu

Chào các bạn, trong quá trình làm việc thì việc chúng ta thực hiện quy trình sau sẽ được lặp lại nhiều lần (tùy dự án hay công ty, ở đây mình chỉ lấy ví dụ): 
- Thành viên trong team sẽ tạo pull request.
- Code của bạn sẽ được review, check các lỗi về convention,...
- Sau khi merge thì code sẽ được chạy unit test.
- Sau đó code của bạn sẽ được merge.
- ...
- ...

Chúng ta thấy rằng những công việc ở trên sẽ được lặp lại liên tục, tuy nhiên chúng ta hoàn toàn có thể sử dụng CI để thực hiện các công việc ở trên một cách tự động và nhanh chóng. Chính vì vậy hôm nay mình xin mạn phép hướng dẫn các bạn tích hợp CI cho repository trên Github của bạn. Thực ra thì mình cũng mới thử nó ngày hôm nay thôi, nên còn nhiều điều thiếu sót, mong các bạn bỏ qua nhé. :D

## Vậy CI là gì?
Khái niệm về và các bài giới thiệu về CI thì trên mạng đã có rất nhiều rồi. Mình xin phép trích dẫn xuống dưới để các bạn có thể tiện bài mình mà hiểu luôn.

### Khái niệm
Tích hợp liên tục (CI) là phương pháp phát triển phần mềm đòi hỏi các thành viên trong nhóm tích hợp công việc thường xuyên. Mỗi ngày, các thành viên đều phải theo dõi và phát triển công việc của họ ít nhất một lần. Việc này sẽ được một nhóm khác kiểm tra tự động, nhóm này sẽ tiến hành kiểm thử truy hồi để phát hiện lỗi nhanh nhất có thể. Cả nhóm thấy rằng phương pháp tiếp cận này giúp giảm bớt vấn đề về tích hợp hơn và cho phép phát triển phần mềm gắn kết nhanh hơn.

### Tại sao phải dùng CI?
Sử dụng phương pháp CI giúp cho hệ thống luôn đảm bảo là build được và chạy đúng (do phải pass qua toàn bộ test case). Mặt khác các công đoạn test sẽ được hệ thống CI server thực hiện tự dộng giúp cho ta có thể dễ dàng biết được tình trạng của một branch, một commit nào đó và không cần lấy source về test thử. Do đó tốc độ phát triển được tăng lên. 

### Workflow của CI

![](https://images.viblo.asia/522720ae-b707-43ef-a733-cc1b141bcfc3.jpg)

Workflow của phương pháp CI được chia thành 6 bước như sau:

Bước 1: Các người phát triển sẽ đưa phần source mà họ đã thay đổi lên Source Control Server. Khi đó Source Control Server sẽ thông báo với CI Server là có bản source mới.

Bước 2: CI Server lấy source mới về

Bước 3, 4 & 5 CI Server sẽ build, test và cập nhật lại trạng thái build của bản source đó.

Bước 6: CI Server sẽ thông báo đến người quản lý và các người phát triển về tình trạng của bản code mới.

## Bắt tay vào thực hiện

### Danh sách các CI Service trên Github
Hiện tại thì Github đã hỗ trợ khá nhiều các CI service giúp cho việc tích hợp CI vô cùng dễ dàng. Các bạn có thể xem danh sách các service tại đây: [Continuous integration](https://github.com/marketplace/category/continuous-integration).
Mình sẽ sử dụng CircleCI nhé, một phần là vì mình mới chỉ dùng thằng này, một phần là do mình cảm thấy nó khá đầy đủ, nhanh và dễ sử dụng nữa.

![](https://images.viblo.asia/b2b80677-f5ba-4a8c-b9af-91d1f4085849.jpg)

### Đăng ký CircleCI

Các bạn chọn **CircleCI** và kéo xuống dưới cùng:

![](https://images.viblo.asia/399a92e6-1726-4a3a-a94a-6682e5f3ed8c.jpg)


Như các bạn thấy thì ở bản Free các bạn sẽ có:
- 1500 phút build
- Không giới hạn repository và user
- 4x project build cùng lúc với public repository và 1x với private repository

Bấm **Install it for free** để cài đặt nhé. Tiếp theo thì các bạn cứ bấm vào nút xanh lá cây cho mình nhé. Ở bước cuối thì nó sẽ bắt bạn cấp quyền vào tài khoản Github, các bạn cứ bấm đồng ý luôn nhé. :D

Sau khi đăng ký xong thì nó sẽ chuyển bạn trến trang như sau tức là bạn đã đăng ký thành công:

![](https://images.viblo.asia/fc616f03-5dc4-4fb1-abb5-a072d6bfd4ba.jpg)

### Tích hợp vào repository

#### Bước 1 Bấm ADD PROJECT
Vẫn ở màn hình trên, các bạn bấm **ADD PROJECTS**.
![](https://images.viblo.asia/9667e99e-77b8-486f-b8a7-719de05ff968.jpg)

Các bạn sẽ thấy danh sách các repository có trên account github của mình.
![](https://images.viblo.asia/2b93f0d8-af95-4ee5-b635-ddb6e1d98303.jpg)

#### Bước 2 SET UP PROJECT
Sau đó các bạn chọn **Set up project** để bắt đầu Set up cho repository của bạn.

#### Bước 3 Chọn các thông số
Ở màn hình này các bạn có thể chọn hệ điều hành cho server CI, đồng thời các bạn cũng có thể chọn ngôn ngữ chính của project. Ở đây mình dùng Laravel (PHP) nên mình sẽ chọn ngôn ngữ chính là PHP và hệ điều hành là Linux nhé.

![](https://images.viblo.asia/4fbe838c-f797-4730-abeb-3ae25631feb8.png)

#### Bước 4 Tính hợp vào source code

Bước 1: Vào trong source code của mình, tạo thư mục tên là **.circleci**.

Bước 2: Tạo file có tên là **config.yml**

Bước 3: Nội dung file **config.yml**

```yml
# PHP CircleCI 2.0 configuration file
#
# Check https://circleci.com/docs/2.0/language-php/ for more details
#
version: 2
jobs:
  build:
    docker:
      - image: circleci/php:7.1-node-browsers

    working_directory: ~/repo

    steps:
      - checkout
      - run: composer global require "squizlabs/php_codesniffer=*"
      - run: git clone https://github.com/wataridori/framgia-php-codesniffer.git ~/.composer/vendor/squizlabs/php_codesniffer/src/Standards/Framgia
      # Download and cache dependencies
      - restore_cache:
          keys:
          - v1-dependencies-{{ checksum "composer.json" }}
          # fallback to using the latest cache if no exact match is found
          - v1-dependencies-

      - run: composer install -n --prefer-dist

      - save_cache:
          paths:
            - ./vendor
          key: v1-dependencies-{{ checksum "composer.json" }}
        
      # run tests!
      - run: sudo ~/.composer/vendor/bin/phpcs --ignore=vendor,bootstrap/cache/,storage,database,*.js,*.css,public/index.php,*.blade.php --standard=Framgia ./
      - run: php -r "file_exists('.env') || copy('.env.example', '.env');"
      - run: php artisan key:generate
      - run: vendor/bin/phpunit
```

**Giải thích qua 1 chút: **

Đây là 1 docker image để có thể sử dụng PHP trên CI Server, các bạn có thể tích hợp thêm các image cần thiết để sử dụng.
```
jobs:
  build:
    docker:
      - image: circleci/php:7.1-node-browsers # Đây là 1 docker image để có thể sử dụng PHP trên CI Server
```

Các câu lệnh ở dưới đây sẽ thực hiện các mục đích sau:

Trong steps run sẽ là các command mà CI Server sẽ chạy: 

- Cài đặt PHPCS: `composer global require "squizlabs/php_codesniffer=*"`.
- Tích hợp Framgia Standard để check convention tại Framgia: `git clone https://github.com/wataridori/framgia-php-codesniffer.git ~/.composer/vendor/squizlabs/php_codesniffer/src/Standards/Framgia`.
- Install các dependence cho Laravel: `composer install -n --prefer-dist`
- Tiếp theo là copy file .env rồi generate key (ai dùng Laravel sẽ hiểu).  
-  Chạy PHPCS để bắt đầu thực hiện check convention: `sudo ~/.composer/vendor/bin/phpcs --ignore=vendor,bootstrap/cache/,storage --standard=Framgia ./`
- Tùy dự án, tùy ngôn ngữ, tùy framework mà các bạn sẽ điều chính khác nhau nhé.

Các bạn có thể tham khảo hướng dẫn viết **config.xml** tại các link sau:
- [Dành cho PHP](https://circleci.com/docs/2.0/language-php/)
- [Nodejs](https://circleci.com/docs/2.0/language-javascript/)
- ...
- Truy cập vào đây để xem nhiều hơn nữa: https://circleci.com/docs/2.0/
```
jobs:
    ...
    steps:
      - checkout
      - run: composer global require "squizlabs/php_codesniffer=*"
      - run: git clone https://github.com/wataridori/framgia-php-codesniffer.git ~/.composer/vendor/squizlabs/php_codesniffer/src/Standards/Framgia
      # Download and cache dependencies
      - restore_cache:
          keys:
          - v1-dependencies-{{ checksum "composer.json" }}
          # fallback to using the latest cache if no exact match is found
          - v1-dependencies-

      - run: composer install -n --prefer-dist

      - save_cache:
          paths:
            - ./vendor
          key: v1-dependencies-{{ checksum "composer.json" }}
        
      # run tests!
      - run: php -r "file_exists('.env') || copy('.env.example', '.env');"
      - run: php artisan key:generate
      - run: sudo ~/.composer/vendor/bin/phpcs --ignore=vendor,bootstrap/cache/,storage --standard=Framgia ./
      - run: vendor/bin/phpunit
```

###  Thử nghiệm

Sau khi làm xong file **config.xml**, các bạn thực hiện các bước để đẩy code lên Github. Khi code được đẩy lên thì quay trở lại Circle, các bạn sẽ thấy CI đang chạy (RUNNING):
![](https://images.viblo.asia/269c0b83-7c96-4dde-8602-0e26a871b1e8.png)

Nếu có chữ **SUCCESS** tức là bạn đã thành công:
![](https://images.viblo.asia/d540ebdf-a16e-40a2-9b6f-6bb409f91ce8.jpg)

Nếu có chữ **FAILED** tức là build thất bại:
![](https://images.viblo.asia/d59b472f-253a-4e15-8616-34d8d7a899cd.jpg)

Các bạn có thể xem tại sao mình lại thất bại, ở đây là lỗi convention do PHPCS check:

![](https://images.viblo.asia/5ca32fc9-e4b1-407b-8262-281382d59830.png)

## Kết thúc
Trên đây là toàn bộ hướng dẫn tích hợp CI vào project của mình trên Github. Cảm ơn các bạn đã đọc, bài viết còn nhiều sai sót nên mong các bạn bỏ qua cho. :D

Tham khảo:
- https://viblo.asia/p/su-dung-framgia-ci-check-convention-project-php-tren-local-V3m5W1zgZO7
- https://www.gocit.vn/bai-viet/tich-hop-lien-tuc-ci-la-gi/
- https://circleci.com/docs/2.0