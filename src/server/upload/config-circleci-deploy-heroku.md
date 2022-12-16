**Bài viết gốc: [DnlBlog](https://www.dnlblog.com/posts/config-circleci-deploy-heroku)**

Hôm trước, mình có tìm hiểu về CircleCI, tiện có cái blog cá nhân này khiến mình tự hỏi, tại sao không sử dụng luôn CircleCI để deploy lên Heroku? Mặc dù việc deploy một ứng dụng lên Heroku cũng không phải là một vấn đề quá khó khăn và mất nhiều thời gian, tất cả những gì chúng ta cần làm là kéo code mới về rồi push ngược lên branch master của Heroku. Nhưng mà được dùng free thì tại sao chúng ta lại từ chối, hơn nữa, sử dụng CircleCI cũng khiến chúng ta có thêm cái để đi bịp mấy anh em chưa biết (hơi buồn là mình chưa bịp được ai cả, mấy anh em khác còn tỉnh hơn mình nhiều).

## CircleCI là gì ?
Đầu tiên chúng ta cần biết CircleCI là gì. Hiểu đơn giản, nó là một nền tảng cho phép chúng ta kiểm tra code, và deploy code tự động. Thử tưởng tượng, bạn có một trang web và để chạy trang web đó bạn cần tới 69 server. Mỗi khi release một version, những công việc mà bạn phải làm là gì? Chắc chắn sẽ không ít chút nào. Nhưng với CircleCI, bạn gần như không phải làm gì cả, chỉ cần ấn nút merge trên Github, BitBucket...thế là xong. CircleCI sẽ giúp bạn làm mọi thứ, từ việc kéo code mới nhất về, kiểm tra xem code hiện tại có gây ra lỗi hay không, access vào từng server và deploy code của bạn lên đó.Tuy nhiên CircleCI không chỉ có vậy, nó còn có thể giúp bạn nhiều hơn thế nữa. Nhưng đầu tiên, bạn phải nói cho nó biết nó sẽ phải làm gì trước đã và nơi mà bạn giao tiếp với CircleCI chính là `.circleci/config.yml` .

## Configuring CircleCI
Thông thường một file CircleCI config sẽ bao gồm 3 thành phần chính đó là:

`version`: Chỉ định version được sử dụng, mỗi version sẽ có các keyword khác nhau.

`jobs`: Định nghĩa các kịch bản được sử dụng khi chạy.

workflows: Thứ tự và điều kiện để chạy các kịch bản bên trên.

Bây giờ mình sẽ đi chi tiết vào từng phần để từng bước xây dựng lên một file CircleCI config.

### version
version: 2.1
Chúng ta sử dụng version mới nhất của CircleCI là 2.1. Tất cả trong phần này chỉ có vậy.

### jobs
Trong phần này chúng ta sẽ định nghĩa 2 jobs để phục vụ cho mục đích của mình là CI/CD, trong đó các bước để thực hiện CI mình sẽ định nghĩa nó ở trong phần `build`.

```yml
build:
  docker:
    - image: circleci/ruby:2.6.3-stretch-node
      environment:
        RAILS_ENV: test
    - image: circleci/mysql:5.7
      environment:
        MYSQL_USER: db_username
        MYSQL_DATABASE: db_app_test
        MYSQL_PASSWORD: db_password
        MYSQL_ROOT_PASSWORD: db_root_password
  steps:
    - checkout
    - restore_cache:
        name: Restore bundle cache
        keys:
          - app-{{ checksum "Gemfile.lock" }}

    - run: gem install bundler:2.1.4

    - run: bundle install --path vendor/bundle

    - save_cache:
        name: Save bundle cache
        key: app-{{ checksum "Gemfile.lock" }}
        paths:
          - vendor/bundle

    - run: dockerize -wait tcp://127.0.0.1:3306 -timeout 1m

    - run: cp .env.example .env

    - run: bundle exec rails db:migrate

    - run: bundle exec rubocop

    - run: bundle exec rspec
```
Ở trong phần docker, chúng ta sử dụng 2 images là `circleci/ruby:2.6.3-stretch-node` và `circleci/mysql:5.7` cùng với đó là setting một số biến môi trường sẽ được sử dụng trong các container tương ứng với các image này.

Chúng ta định nghĩa các bước cần làm bên trong phần steps. Các bước đó bao gồm việc cài đặt `bundle:2.1.4` và các gem cần thiết. Các gem này sau khi cài đặt sẽ được cache lại dựa vào nội dung trong `Gemfile.lock`. Nghĩa là chỉ khi nào `Gemfile.lock` có thay đổi thì mới tiến hành bundle lại và khi đó thư mục `vendor/bundle` sẽ được update. Điều này sẽ giúp bạn giảm đáng kể thời gian một lần build. Tiếp theo chúng ta chạy lệnh:
```yml
- run: dockerize -wait tcp://127.0.0.1:3306 -timeout 1m
```
Lệnh này có nhiệm vụ đợi `circleci/mysql:5.7` đến khi nào nó được khởi tạo và sẵn sàng cho việc kết nối. Bên trong Rails app, chúng ta config file `config/database.yml` với nội dung như sau:

```yml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: <%= ENV["DATABASE_HOST"] %>
  username: <%= ENV["DATABASE_USERNAME"] %>
  password: <%= ENV["DATABASE_PASSWORD"] %>
  socket: /var/run/mysqld/mysqld.sock

development:
  <<: *default
  database: <%= ENV["DATABASE_NAME"] %>

test:
  <<: *default
  database: <%= ENV["DATABASE_NAME"] %>

production:
  <<: *default
  database: <%= ENV["DATABASE_NAME"] %>
Do đó, để kết nối được với container circleci/mysql:5.7, chúng ta sẽ cần chuẩn bị một file .env.example:

DATABASE_HOST=127.0.0.1
DATABASE_NAME=db_app_test
DATABASE_USERNAME=db_username
DATABASE_PASSWORD=db_password
```
Sau đó sử dụng lệnh:
```yml
- run: cp .env.example .env
```
để có thể sử dụng những biến môi trường này trong Rails app. Trước đó bạn đừng quên thêm:
```ruby
gem "dotenv-rails"
```
vào trong Gemfile nhé. Đến đây chúng ta đã hoàn thành việc build ứng dụng của mình bằng docker mà CircleCI cung cấp. Tiếp theo bạn có thể chạy bất cứ thứ gì mình muốn, trong trường hợp của mình là:

```yml
- run: bundle exec rails db:migrate

- run: bundle exec rubocop

- run: bundle exec rspec
```
Nếu như không có bất cứ lỗi nào xảy ra thì coi như bản build của bạn đã thành công, đồng thời bạn cũng vừa thực hiện xong CI cho ứng dụng của mình. Từ đây chúng ta có thể thấy, việc thực hiện CI cho một ứng dụng, điều quan trong nhất không phải là bạn đã làm nó như thế nào mà là việc ứng dụng của bạn có được viết test hay không. Một ứng dụng không có test thì có CI hay không cũng đều như nhau cả.

Bây giờ là lúc chúng ta đến với CD, những gì chúng ta muốn CircleCI làm sẽ được xác định trong phần deploy.

```yml
deploy:
  machine: true
  steps:
    - checkout
    - run: |-
        cat >> ~/.netrc \<<EOF
          machine api.heroku.com
            login $HEROKU_USERNAME
            password $HEROKU_PASSWORD
          machine git.heroku.com
            login $HEROKU_USERNAME
            password $HEROKU_PASSWORD
        EOF
    - run: chmod 600 ~/.netrc 
    - run: heroku git:remote -a your_app
    - run: git push heroku master:master -f
    - run: heroku run rails db:migrate --app your_app
```
Ở phần này, mọi thứ có vẻ đơn giản hơn. Chúng ta không cần dùng tới docker, tất cả những gì chúng ta cần là một chiếc máy tính có khả năng kéo code trên nhánh master về, login vào Heroku và sau đó push code đó lên Heroku. CircleCI có thể cung cấp cho chúng ta một chiếc máy tính như vậy:
```yml
machine: true
```
Chỉ đơn giản như vậy bạn đã có những gì mình mong muốn. Bạn có thể xem đây là một máy chủ trung gian, nó có nhiệm vụ kết nối giữa Github của bạn và Heroku. Khi đăng ký CircleCI mặc định việc kết nối tới Github của bạn đã hoàn toàn được CircleCI xử lý, do đó chỉ với câu lệnh:
```yml
- checkout
```
bạn đã có thể kéo code mới nhất từ Github của mình về rồi. Như vậy bây giờ chỉ cần tìm cách để connect được tới Heroku nữa là xong.

Đầu tiên các bạn nên tìm hiểu qua `.netrc` tại [đây](https://ec.haxx.se/usingcurl/usingcurl-netrc). Hiểu đơn giản `.netrc` là một file được lưu trong thư mục home trên các hệ điều hành Unix, nó cho phép người dùng lưu user name và password, sau đó sử dụng nó để login vào các server FTP một cách tự động. Đến đây thì đơn giản rồi, chúng ta chỉ việc ghi thông tin đăng nhập Heroku vào trong `~/.netrc` trên máy chủ mà CircleCI vừa cung cấp:

```yml
- run: |-
    cat >> ~/.netrc \<<EOF
      machine api.heroku.com
        login $HEROKU_USERNAME
        password $HEROKU_PASSWORD
      machine git.heroku.com
        login $HEROKU_USERNAME
        password $HEROKU_PASSWORD
    EOF
```
Trong đó các bạn để ý đến 2 biến `$HEROKU_USERNAME` và `$HEROKU_PASSWORD`, đây là các biến môi trường bạn phải setting trên CircleCI. Trong phần **Pipelines**, mỗi project sẽ có một phần **Project Settings**, từ đây các bạn có thể dễ dàng tìm thấy mục **Environment Variables**, đây là nơi bạn thêm các biến môi trường cần thiết cho ứng dụng của mình. Bạn có thể sử dụng những biến này ở bất cứ trong trong `.cricleci/config.yml` bằng việc thêm vào phía trước tên biến ký tự `$` .

Xong xuôi đâu đó, bạn có thể sẽ phải cấp quyền để máy chủ có thể đọc được file `~/.netrc` khi nó thực hiện login vào Heroku:
```yml
- run: chmod 600 ~/.netrc
```
Nếu như đến đây mọi thứ vẫn tốt đẹp thì bây giờ sẽ là thời khắc quan trọng nhất. Chúng ta sẽ add Heroku remote cho local repository (ở đây là máy chủ mà chúng ta đang làm việc):
```yml
- run: heroku git:remote -a your_app
```
Tiếp đó là push code lên branch master của Heroku remote mà chúng ta vừa thêm vào:
```yml
- run: git push heroku master:master -f
```
Và cuối cùng là chạy mấy lệnh cần thiết khác:
```yml
- run: heroku run rails db:migrate --app your_app
```
### workflows
Vừa rồi chúng ta đã đi xác định những công việc cần phải làm trong quá trình CI/CD. Bây giờ là lúc chúng ta sẽ xác định thứ tự thực hiện của chúng:

```yml
workflows:
  version: 2
  build_deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: master
```
Chúng ta định nghĩa một workflows có tên là `build_deploy`. Trong này sẽ thực hiện 2 việc đó là build và deploy tương ứng với 2 jobs mà chúng ta vừa xây dựng phía trên.

Nội dung của nó có thể hiểu đơn giản là: "***Thực hiện build khi có bất kỳ thay đổi nào trên Github, nếu như đó là thay đổi trên branch master thì sau khi build thành công sẽ thực hiện deploy code mới***".

## Summary
Đến đây tổng hợp lại tất cả những thứ vừa làm, chúng ta sẽ có một file `.circleci/config.yml` hoàn chỉnh:

```yml
---
version: 2.1

jobs:
  build:
    docker:
      - image: circleci/ruby:2.6.3-stretch-node
        environment:
          RAILS_ENV: test
      - image: circleci/mysql:5.7
        environment:
          MYSQL_USER: db_username
          MYSQL_DATABASE: db_app_test
          MYSQL_PASSWORD: db_password
          MYSQL_ROOT_PASSWORD: db_root_password
    steps:
      - checkout
      - restore_cache:
          name: Restore bundle cache
          keys:
            - app-{{ checksum "Gemfile.lock" }}

      - run: gem install bundler:2.1.4

      - run: bundle install --path vendor/bundle

      - save_cache:
          name: Save bundle cache
          key: app-{{ checksum "Gemfile.lock" }}
          paths:
            - vendor/bundle

      - run: dockerize -wait tcp://127.0.0.1:3306 -timeout 1m

      - run: cp .env.example .env

      - run: bundle exec rails db:migrate

      - run: bundle exec rubocop
  deploy:
    machine: true
    steps:
      - checkout
      - run: |-
          cat >> ~/.netrc \<<EOF
            machine api.heroku.com
              login $HEROKU_USERNAME
              password $HEROKU_PASSWORD
            machine git.heroku.com
              login $HEROKU_USERNAME
              password $HEROKU_PASSWORD
          EOF
      - run: chmod 600 ~/.netrc 
      - run: heroku git:remote -a your_app
      - run: git push heroku master:master -f
      - run: heroku run rails db:migrate --app your_app
workflows:
  version: 2
  build_deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: master
```
Chúc các bạn may mắn!