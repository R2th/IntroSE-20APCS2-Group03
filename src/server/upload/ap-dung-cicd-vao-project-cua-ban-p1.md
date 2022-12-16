## 1. Mở đầu
<hr>

Trước khi bắt đầu đọc bài viết này, bạn nên đã có những hiểu biết cơ bản về CI/CD là gì và nó phục vụ các mục đích gì trong quá trình phát triển của một project. Nếu bạn chưa biết đến nó là gì thì bạn có thể tìm hiểu qua một chút ở bài viết [này](https://viblo.asia/p/ci-cd-va-devops-07LKXYXDZV4). Đồng thời bạn nên có 1 chút kiến thức về Docker thì càng tốt mà không có cùng không sao :D.


## 2. Giới thiệu
<hr>

Ở bài part 1 của viết này, mình sẽ hướng dẫn các bạn tích hợp CI vào project của mình với một dịch vụ cung cấp plan miễn phí là [CircleCI](https://circleci.com/). Vì đây là plan miễn phí nên nó cũng có khá nhiều mặt hạn chế tùy thuộc vào project của bạn. Theo cá nhân mình thì nó sẽ phù hợp cho các project thuộc dạng opensource và team dev chỉ khoảng < 5 người. Lý do tại sao thì mình sẽ trình bày ở cuối bài viết. Vì mình chủ yếu làm việc với ngôn ngữ `PHP` cụ thể là `Laravel` nên trong bài viết này mình sẽ hướng dẫn bạn tích hợp với project `Laravel`. Nào chúng ta hãy bắt tay vào việc.

## 3. Bắt đầu
<hr>

### 3.1 Thêm file cấu hình cho CircleCI
Trước khi tích hợp file cấu hình cho CircleCI, bạn cần đảm bảo 2 điều kiện sau:
- Bạn đang có một project (ở đây của mình là `Laravel)`
- Project của bạn đang sử dụng Github hoặc Bitbucket vì mặc định CircleCI đang hỗ trợ 2 nền tảng này<br>
 
Sau khi đã thỏa mã 2 điều kiện trên, trong folder root của project của bạn, bạn tạo 1 folder có tên là `.circleci` và bên trong đó tạo thêm 1 file `config.yml`. Sau khi tạo, thì cấu trúc folder của mình sẽ có dạng như sau:

![](https://images.viblo.asia/8bb4f30c-781d-4062-93b4-772a2bc5943c.png)

Nội dung của file `config.yml` đối với project `Laravel` sẽ có thể có dạng như sau:
```yaml
version: 2
jobs:
  build:
    docker:
      - image: 7896/civ3-workspace:2.0
    steps:
      - checkout
      - run: cp .env.example .env

      # composer cache
      - restore_cache:
          keys:
            - vendor-v1-{{ checksum "composer.lock" }}
      - run:  composer install
      - save_cache:
          key: vendor-v1-{{ checksum "composer.lock" }}
          paths:
            - vendor

      # run test
      - run: phpcs app
```
<br>
Giải thích sơ qua một chút về nội dung file:

- Gồm có 2 phần chính là `docker` và `steps`
    - Đầu tiên bạn có thể thấy ở phần `docker` mình đang sử dụng một `image` có tên là `7896/civ3-workspace:2.0`. Đối với các bạn đã biết về Docker hay chưa biết về Docker thì đơn giản image giống như 1 cái hộp đã được cài một số thứ hỗ trợ chúng ta trong việc chạy test project như `php`, `composer`, `git` và tool dùng để kiểm tra convention cho `php` là `phpcs` cùng một vài tool khác. Nội dung cụ thể image bạn có thể xem ở [đây](https://github.com/FramgiaDockerTeam/laravel-workspace/blob/master/Dockerfile).
    - Tiếp đó phần `steps` là các bước lần lượt mà chúng ta sẽ chạy cho project của chúng ta, cụ thể:
        - `checkout` - Clone code từ github - đây là lệnh mặc định của CircleCI.
        - `run: [lệnh]` - Các lệnh cần thực hiện.
        - `restore_cache` - Khôi phục lại folder chứa cái package (vendor/) dựa trên file `composer.lock`
        - `save_cache` - Lưu lại folder `vendor` nesu file `composer.lock` bị thay đổi hay do bạn xóa hoặc thêm package mới.
        - Việc cache lại folder vendor giúp tăng tốc cho bản build của bạn cho những lần chạy sau vì thay vì phải install lại các package thì đầu thì ta có thể tái sử dụng lại folder vendor của bản build trước đó nếu file `composer.lock` không bị thay đổi.<br>
        *Lưu ý phần resore và save cache bạn cần sắp xếp theo đúng thư tự trên để hoạt động đúng*
        
        <br>
### 3.2 Tiến hành chạy build
Sau khi đã thêm file config cho CircleCI, ta sẽ tiến hành truy cập vào trang web https://circleci.com và tiến hành đăng nhập với [Github](https://github.com). Sau khi đã đăng nhập, bạn chọn mục `Add project` sau đó chọn project bạn vừa config và bấm `Set Up Project`:

![](https://images.viblo.asia/474cb9f0-c202-4812-8ed8-c6a27310c9d5.png)
 
 Sau khi chọn `Set Up Project` sẽ hiện ra một màn hình mới và bạn lần lượt chọn `OS` là Linux, `Language` là PHP và cuối cùng bấm `Start building` để tiến hành build thử lần đầu tiên:
 
![](https://images.viblo.asia/44d05ee3-95c5-4a1f-9b22-9f9109af73d0.png)

Nếu config đúng thì bạn sẽ thấy bản build đầu tiên của bạn được chạy trên CircleCI như sau:

![](https://images.viblo.asia/f464e36f-0f0c-4bbc-af5b-1767885aeb29.png)

Bạn cần đợi khoảng vài chục giây cho đến vài chục phút tùy thuộc vào độ lớn của project trước khi thu được kết quả từ bản build. Ở đây mình dùng project mới nên chỉ tốt khoảng vài chục giây để chạy. Đây là kết quả sau khi chạy:

![](https://images.viblo.asia/4fa33d9b-9ce7-4956-8161-11626e58e975.png)

Để xem điều gì dẫn đến bản build của bạn bị fail bạn có thể bấm vào đó để xem chi tiết bản build bằng cách bấm vào bản build đó sau đó chọn chi tiết `build` như sau:

![](https://images.viblo.asia/355ac5c0-dc96-4a1f-81b6-a671174aa458.png)

![](https://images.viblo.asia/628e44ff-6fa6-4221-973d-6b195b55e595.png)

Ở đây sẽ xuất hiện lần lượt các lệnh mà chúng ta đã thực hiện cho bản build đó giống như trong file `config.yml` mà ta đã cấu hình ở trên bao gồm việc tải `image docker` mà chúng ta đã khai báo, clone code về, restore/save cache và chạy lệnh `phpcs app`. Ta có thể bấm lần vào các lệnh để xem được nội dung chi tiết với mỗi lệnh đó. Ở đây ta sẽ thử click vào lệnh `phpcs app` để xem chúng ta mắc phải lỗi convention gì và có thể tiến hành sửa chữa:

![](https://images.viblo.asia/e6ca3a93-8e27-4928-9c75-af9c8a8536e4.png)

Như vậy là về cơ bản, project của chúng ta đã chạy được trên CircleCI, giờ đây với mỗi push/pull request đến repository này của chúng ta sẽ tạo ra một bạn build tương ứng kiểm tra convention của code mới. Trước khi thử đẩy pull mới, mình sẽ sửa lại lệnh chạy `phpcs` thành tiêu chuẩn convention mà mình hay dùng (đã được cài sẵn trong docker image ở trên) và sửa các lỗi phát sinh. Đây là kết quả sau khi chúng ta đã sửa lỗi convention và đẩy lại lên:

![](https://images.viblo.asia/9fa892dd-c46f-4a8b-98d5-8006543e0a30.png)

Lúc này bản build của chúng ta đã success đồng nghĩa với việc pass các yêu cầu về convention mà ta đặt ra. Tuy nhiên trong project thường chúng ta sẽ có cả phần `unit-test` nên chúng ta sẽ tiến hành thêm lệnh chạy `unit-test` của `Laravel` vào file `config.yml` như sau:
```yaml
version: 2
jobs:
  build:
    docker:
      - image: 7896/civ3-workspace:2.0
    steps:
      - checkout
      - run: cp .env.example .env

      # composer cache
      - restore_cache:
          keys:
            - vendor-v1-{{ checksum "composer.lock" }}
      - run:  composer install
      - save_cache:
          key: vendor-v1-{{ checksum "composer.lock" }}
          paths:
            - vendor

      # run test
      - run: phpcs --standard=Framgia app
      - run: ./vendor/bin/phpunit
```

Sau đó chúng ta lại tiến hành push tiếp lên repository trên github để CircleCI tiếp tục kiểm tra cả `phpcs` và `phpunit`:

![](https://images.viblo.asia/6498f5d7-97d1-4800-9021-4dbffddaa1e1.png)

Tuy nhiên lần này `phpcs` của chúng ta vẫn pass như bình thường còn `unit-test` lại bị fail. Chúng ta có thể mở tab chạy lệnh `./vendor/bint/phpunit` để xem thông tin lỗi và sửa nó. Ở đây có vẻ do mình thiếu lệnh tạo key cho file `.env` dẫn tới bản build bị lỗi. Chúng ta có thể sửa nó lại bằng cách thêm lệnh sinh key cho file `config.yml` như sau:
```yaml
version: 2
jobs:
  build:
    docker:
      - image: 7896/civ3-workspace:2.0
    steps:
      - checkout
      - run: cp .env.example .env
 
      # composer cache
      - restore_cache:
          keys:
            - vendor-v1-{{ checksum "composer.lock" }}
      - run:  composer install
      - save_cache:
          key: vendor-v1-{{ checksum "composer.lock" }}
          paths:
            - vendor

      # run test
      - run: php artisan key:generate
      - run: phpcs --standard=Framgia app
      - run: ./vendor/bin/phpunit
```

Sau khi đã sửa thì mọi thứ lại đâu vào đó:

![](https://images.viblo.asia/07c652b2-b25c-4cad-9a9e-1be6df3af955.png)

### 3.3 framgia-cli tool

- Với cách setup như trên sẽ xảy ra một vấn đề đó là trong trường hợp lệnh `phpcs` bị lỗi thì bản build sẽ lập tức báo fail và đồng thời dẫn tới bản build bị fail và không chạy đến tất cả các lệnh phía sau nữa. Trong trường hợp cả `phpcs` lẫn `phpunit` của bạn bị lỗi thì bạn sẽ phải cần tới 2 lần gửi pull/push request để có thể fix được hết lỗi. Trên thực tế, một project thông thường của bạn có thể test cả `phpcs`, `phpunit` và thậm chí cả `eslint` cho javascript convention. Nếu mỗi trong trường hợp đen đủi bạn sẽ phải tốn tận 3 push/pull request để sửa nó. Để giải quyết vấn đề này. Để giải quyết vấn đề này, ta sẽ sử dụng một cli tool đã có sẵn trong `image docker` mà ta dùng ở trên tên là `framgia-cli`. Tool này sẽ hỗ trợ bạn chạy toàn bộ các lệnh bạn khai báo sau khi toàn bộ các lệnh đã chạy xong thì nó mới đưa ra kết quả fail hay success cho toàn bộ bản build đó. Nếu bạn dùng `image docker` cá nhân thì có thể xem hướng dẫn cài đặt tool vào project image của bạn ở [đây](https://github.com/framgiaci/framgia-ci-cli).

Sau đó trong folder root của project, ta sẽ thêm 1 file có tên là `framgia-ci.yml` với nội dung như sau:
```yaml
project_type: php
test:
  phpcs:
    command: phpcs --standard=Framgia app
  phpunit:
    command: ./vendor/bin/phpunit
```
File này sẽ là nơi các bạn khai báo các lệnh cần chạy khi test với cấu trúc file như trên. Sau khi đó bạn thêm tiếp lệnh sửa lại trong file `.circleci/config.yml` như sau:
```yaml
version: 2
jobs:
  build:
    docker:
      - image: 7896/civ3-workspace:2.0
    steps:
      - checkout
      - run: cp .env.example .env

      # composer cache
      - restore_cache:
          keys:
            - vendor-v2-{{ checksum "composer.lock" }}
      - run:  composer install
      - save_cache:
          key: vendor-v2-{{ checksum "composer.lock" }}
          paths:
            - vendor

      # run test
      - run: php artisan key:generate
      - run: framgia-ci run --local
```
Cuối cùng ta lưu lại và đẩy lại lên repository của bạn rồi kiểm tra bên CircleCI sẽ thấy bản build mới nhất được chạy với tool vừa cài đặt:

![](https://images.viblo.asia/6eb8e68f-3eec-464b-a5ac-0fb020da4a11.png)

Nếu bản build của bạn success thì sẽ trả về kết quả như ảnh trên đồng thời hiển thị các command success như bạn khai báo trong file. Giờ chúng ta sẽ thử lại với trường hơp `phpcs` fail xem nó có chạy `phpunit` hay không bằng cách bạn thêm vài lỗi convention vào folder app của mình. Đây là kết quả:

![](https://images.viblo.asia/398b814e-526e-4ec3-b1ee-2290611538d2.png)

Như bạn thấy ta vẫn chạy được `phpunit` mặc dù fial ở `phpcs` vậy là đã đạt được mục tiêu mà chúng ta mong muốn. Giờ đây kể cả bạn thêm cả `eslint` thì chỉ với 1 bản build bạn cũng có thể phát hiện hết các lỗi và sửa nó nhanh chóng hơn.

### 3.4 Thêm database
Database là một phần không thể thiếu khi bạn chạy `unit-test` và đương nhiên việc tích hợp thêm một database hỗ trợ cho `unit-test` cũng vô cùng đơn giản. Tất cả những gì bạn cần làm là chọn một loại database: `mysql`, `pgsql`, ... sau đó lấy `image` của nó trên [docker-hub](https://hub.docker.com/) sau đó thêm nó vào file `.circleci/config.yml` như sau. Ở khối docker mình sẽ thêm database là `mysql` cùng với các biến môi trường cần thiết:
```yaml
version: 2
jobs:
  build:
    docker:
      - image: 7896/civ3-workspace:2.0
      - image: mysql:5.7
        environment:
          MYSQL_HOST: 127.0.0.1
          MYSQL_DATABASE: homestead
          MYSQL_USER: homestead
          MYSQL_PASSWORD: secret
          MYSQL_ROOT_PASSWORD: root
    steps:
      - checkout
      - run: cp .env.example .env
 
      # composer cache
      - restore_cache:
          keys:
            - vendor-v1-{{ checksum "composer.lock" }}
      - run:  composer install
      - save_cache:
          key: vendor-v1-{{ checksum "composer.lock" }}
          paths:
            - vendor

      # run test
      - run: php artisan key:generate
      - run: framgia-ci run --local
```
Bạn cần đảm bảo rằng trong file `.env.example` của bạn cũng có phần khai báo cơ sở dữ liệu với các thông tin về host, tên database, username và password trùng với mục ta vừa thêm ở trên như sau:
```
# .env.example
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```
Sau khi đã làm 2 việc trên, ta tiếp tục thử thêm lệnh 2 lệnh sau vào trong file `.circleci/config.yml` như sau:
```yaml
 # run test
- run: php artisan key:generate
- run: framgia-ci test-connect 127.0.0.1 3306 60
- run: php artisan migrate
```
- Ở đây bạn có thể để ý thấy mình thêm 2 lệnh, lệnh thứ nhất dùng để kiểm tra connection đến database mysql mà chúng ta vừa thêm ở phần `docker` vời thới gian timeout là 60 giây. Sở dĩ ta cần thực hiện kiểm tra điều này vì khi bắt đầu khởi tạo container cho database, CircleCI sẽ không dừng lại đợi việc khởi tạo database thành công mà sẽ tiếp tục chạy các lệnh phía dưới. Vì thế trong trường hợp database chưa được khởi tạo thành công mà đã chạy đến lệnh cần dùng đến database sẽ trả về cho chúng ta lỗi không kết nối được database. Hoặc nếu quá 60s mà kết nối database thất bại cũng sẽ báo lại kết quả luôn mà không chạy các lệnh khác. Còn lệnh thứ hai sau đó đơn giản là migrate các bảng của chúng ta vào database.<br>

Sau khi đã thêm các nội dung như trên, ban lưu lại sau đó tiếp tục đẩy lên repository và kiểm tra trên CircleCI sẽ có kết quả như sau:

![](https://images.viblo.asia/1fdd7fb4-a3be-4a07-b7a0-51fca3fea2fe.png)

Bạn có thể thấy có thêm phần `Container mysql:5.7` là khối chứa dữ thông tin về việc tạo container cho database của chúng ta cùng với 2 lệnh là `framgia-ci test-connect 127.0.0.1 3306 60` và `php artisan migrate` mà chúng ta mới thêm vào. Thử mở mục `php artisan migrate` ta sẽ thấy việc migrate database đã thành công:

![](https://images.viblo.asia/59004d8c-c71c-428e-9eab-f58f9af35d26.png)

## Kết bài
<hr>

Mong rằng qua bài viết của mình bạn đã biết được cách áp dụng CI vào project của mình với CircleCI. Trong bài viết tiếp theo mình sẽ hướng dẫn các bạn cách sử dụng `Notifications` với CircleCI và cách chúng ta có thể thực hiện auto deploy lên `Heroku` của bạn, các bạn hãy chú ý đón đọc :D. Nếu có bất cứ thắc mắc gì bạn có thể comment ở phía dưới để mình giải đáp. Cám ơn các bạn đã đọc !!!