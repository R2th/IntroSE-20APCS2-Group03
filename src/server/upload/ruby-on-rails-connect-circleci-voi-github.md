Trong bài viết này chúng ta sẽ tìm hiểu:
- CI là gì?
- CircleCI là gì?
- Cách connect CircleCI với GitHub
![](https://images.viblo.asia/aab02437-2d56-48f8-8399-9747f6f85e0e.jpg)

## 1. CI là gì?
CI là viết tắt của Continuous Integration (Tích hợp liên tục)

CI là phương pháp phát triển phần mềm đòi hỏi các thành viên trong nhóm phải tải code của họ lên kho lưu trữ thường xuyên, lý tưởng là nhiều lần trong ngày.

Mỗi lần họ làm, mã được xác minh bởi một bản dựng tự động, bộ kiểm tra chạy các công cụ phân tích mã tĩnh chuyên dụng kiểm tra các lỗ hổng bảo mật, lỗi và tất cả các loại không chính xác.

Điều này rất tốt cho cả nhóm giúp giảm bớt vấn đề và phát triển phần mềm nhanh hơn.

## 2. Tại sao nên sử dụng CircleCI?

CircleCI tích hợp với VCS và tự động chạy các bước mỗi khi nó phát hiện ra một thay đổi trong repository.

Một bản CircleCI bao gồm các bước sau:

- Dependencies
- Testing
- Deployment

## 3. Các bước connect CircleCI với github

**Bước 1: Tạo một repository trên github.**

![](https://images.viblo.asia/dbb116d6-553c-4415-a04b-d6ce17ef7e6f.png)

Sau đó bạn clone repository về máy bằng lệnh

`git clone YOUR_REPOSITORY_URL`

**Bước 2: Tạo tài khoản CircleCI được liên kết với Github**

Thực hiện theo các hướng dẫn bên dưới để tạo tài khoản CircleCI được liên kết với tài khoản Github và để thiết lập CI cho dự án Ruby on Rails.

1. Vào trang [web chính thức của CircleCI ](https://circleci.com/)
2. Nhấp vào "Sign up with Github"

![](https://images.viblo.asia/48ba5c09-5635-47ed-86a3-e3bc4845faf9.png)
4. Trên trang ủy quyền cho CircleCI , nhấp vào "Authorize CircleCI".

![](https://images.viblo.asia/3ea7f6d8-1a21-4b7b-a93b-8256e33cd0b9.png)

Bạn sẽ được chuyển hướng đến bảng điều khiển CircleCI.


5. Thêm dự án trong bảng điều khiển CircleCI

Trong tab dự án, chọn "Add projects".

**Bước 3: Tạo file cấu hình CircleCI**

Trong thư mục gốc của dự án, tạo tệp cấu hình CircleCI.

```
cd path/to/your/project/root
mkdir .circleci
touch .circleci / config.yml
```
Mở tệp cấu hình CircleCI

Mình sẽ config với MySQL, RSpec, RuboCop, Brakeman, Rails Best Practices
### Ruby on Rails với MySQL trên CircleCI
MySQL là lựa chọn phổ biến thứ hai cho các ứng dụng Ruby on Rails, chỉ sau PostgreSQL.

Để CircleCI hoạt động, bạn sẽ cần một thiết lập cụ thể trong tệp config/database.yml. Lưu ý rằng dotenv-rails gem được sử dụng.

config/database.yml

```
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV['DB_POOL'] %>
  username: <%= ENV['DB_USERNAME'] %>
  password: <%= ENV['DB_PASSWORD'] %>
  host: <%= ENV['DB_HOST'] %>
  port: 3306

development:
  <<: *default
  database: connect_circleci_demo_development

test:
  <<: *default
  database: connect_circleci_demo_test

production:
  <<: *default
  database: connect_circleci_demo_production
```

.circleci/config.yml
```
version: 2.1

executors:
  default:
    working_directory: ~/connect_circleci_demo
    docker:
      - image: circleci/ruby:2.6.5
        environment:
          BUNDLE_JOBS: 3
          BUNDLE_PATH: vendor/bundle
          BUNDLE_RETRY: 3
          BUNDLER_VERSION: 2.0.1
          RAILS_ENV: test
          DB_HOST: 127.0.0.1
          DB_USERNAME: root
          DB_PASSWORD: ''
      - image: circleci/mysql:8.0.18
        command: [--default-authentication-plugin=mysql_native_password]
        environment:
          MYSQL_ALLOW_EMPTY_PASSWORD: 'true'
          MYSQL_ROOT_HOST: '%'

commands:
  configure_bundler:
    description: Configure bundler
    steps:
      - run:
          name: Configure bundler
          command: |
            echo 'export BUNDLER_VERSION=$(cat Gemfile.lock | tail -1 | tr -d " ")' >> $BASH_ENV
            source $BASH_ENV
            gem install bundler

jobs:
  build:
    executor: default
    steps:
      - checkout
      - restore_cache:
          keys:
            - connect_circleci_demo-{{ .Branch }}-{{ checksum "Gemfile.lock" }}
            - connect_circleci_demo-
      - configure_bundler
      - run:
          name: Install bundle
          command: bundle install
      - run:
          name: Wait for DB
          command: dockerize -wait tcp://127.0.0.1:3306 -timeout 1m
      - run:
          name: Setup DB
          command: bundle exec rails db:create db:schema:load --trace
      - save_cache:
          key: connect_circleci_demo-{{ .Branch }}-{{ checksum "Gemfile.lock" }}
          paths:
            - vendor/bundle
      - persist_to_workspace:
          root: ~/
          paths:
            - ./connect_circleci_demo

workflows:
  version: 2
  integration:
    jobs:
      - build
```

Có nhiều điều chỉnh cần thiết để code này hoạt động với một dự án cụ thể.

1. Trong Docker Ruby image, dòng 7, điều chỉnh phiên bản Ruby của bạn. Mình sử dụng phiên bản 2.6.5
2. Trong Docker MySQL image, dòng 17, điều chỉnh phiên bản MySQL của bạn. Mình sử dụng phiên bản 8.0.18.
3. Thay thế tất cả các lần xuất hiện của "connect_circleci_demo" bằng tên dự án Ruby on Rails của bạn.

Để quy trình công việc được chuyển qua CircleCI, bạn cần migrate tạo bảng cho database và phải kiểm tra tệp db/schema.rb vào repository.

### Ruby on Rails với RSpec trên CircleCI
Rspec là một testing framework dành cho Ruby, bên cạnh những testing framwork khác, Rspec được biết đến và sử dụng bởi cú pháp dễ đọc. Rspec có thể đọc và hiểu bởi những người có ít kiến thức về lập trình nhất. Nó khiến cho việc giao tiếp giữa lập trình viên, tester, và ngay cả khách hàng trở nên dễ dàng hơn.

Trong CI, chạy bộ test là một trong những công việc phổ biến nhất, để đảm bảo rằng các tính năng mới không ảnh hưởng hay phá vỡ các phần được kiểm tra tốt khác của ứng dụng Ruby on Rails.

Đây là công việc hoàn hảo cho CircleCI, vì vậy nếu bạn đã quyết định thực hiện nó, hãy chỉnh sửa tệp config.yml đã tạo trước đó, thêm công việc RSpec và chạy nó trong quy trình công việc được xác định.

```
jobs:
  build:
    executor: default
    steps:
      - checkout
      - restore_cache:
          keys:
            - hix-{{ .Branch }}-{{ checksum "Gemfile.lock" }}
            - hix-
      - configure_bundler
      - run:
          name: Install bundle
          command: bundle install
      - run:
          name: Wait for DB
          command: dockerize -wait tcp://127.0.0.1:3306 -timeout 1m
      - run:
          name: Setup DB
          command: bundle exec rails db:create db:schema:load --trace
      - run:
          name: RSpec
          command: |
            bundle exec rspec --profile 10 \
                              --format progress
      - store_artifacts:
          path: coverage
      - save_cache:
          key: hix-{{ .Branch }}-{{ checksum "Gemfile.lock" }}
          paths:
            - vendor/bundle
      - persist_to_workspace:
          root: ~/
          paths:
            - ./hix

workflows:
  version: 2
  integration:
    jobs:
      - build
```

### Ruby on Rails với RuboCop trên CircleCI

RuboCop là công cụ linting mã Ruby phổ biến nhất hiện có, với gần 400 quy tắc được kiểm tra trong cấu hình mặc định.

Bên cạnh gem mặc định, có các plugin kiểm tra các quy tắc hiệu suất mã Ruby on Rails, RSpec và Ruby, được kết hợp với tổng số gần 500 quy tắc được kiểm tra, mỗi khi mã mới được đóng góp cho codebase.

Nếu bạn quyết định sử dụng RuboCop trong dự án Ruby on Rails thì đây là cấu hình CircleCI cần thiết.

```
rubocop:
    executor: default
    steps:
      - attach_workspace:
          at: ~/
      - configure_bundler
      - run:
          name: Rubocop
          command: bundle exec rubocop

workflows:
  version: 2
  integration:
    jobs:
      - build
      - rubocop:
          requires:
            - build
```

### Ruby on Rails với Brakeman trên CircleCI
Brakeman là ruby gem phổ biến nhất cho kiểm toán lỗ hổng bảo mật của ứng dụng Ruby on Rails.

Nó cung cấp một công cụ dòng lệnh đơn giản trong tổng số 29 cảnh báo, kiểm tra mã ứng dụng Ruby on Rails của bạn để biết các cuộc tấn công SQL Injection hoặc Cross-Site Scripting có thể xảy ra.

CircleCI là nơi hoàn hảo để kiểm tra mã của bạn để bảo mật, vì vậy nếu bạn quyết định sử dụng Brakeman trong ứng dụng Ruby on Rails, thì đây là cấu hình CircleCI bắt buộc.

```
brakeman:
    executor: default
    steps:
      - attach_workspace:
          at: ~/
      - configure_bundler
      - run:
          name: Brakeman
          command: bundle exec brakeman

workflows:
  version: 2
  integration:
    jobs:
      - build
      - brakeman:
          requires:
            - build
```
Hãy nhớ rằng, sử dụng bất kỳ công cụ kiểm toán bảo mật nào cũng không đảm bảo rằng ứng dụng Ruby on Rails của bạn an toàn 100%. Vui lòng đọc [Top 10 Most Critical Web Application Security Risks](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project) và trên hết những thứ khác, kiểm tra trang web của bạn thường xuyên bằng các công cụ như Mozilla Observatory.

# Kết luận
Ruby on Rails là một lựa chọn rất phổ biến để phát triển ứng dụng web và nó mang lại nhiều lợi ích, một trong số đó là cộng đồng chia sẻ kiến thức và cách thực hiện điều đó chính xác.

Rất nhiều kiến thức này đã được add vào các công cụ phân tích mã tĩnh cho phép các nhà phát triển dễ dàng tìm thấy lỗi của họ.

CircleCI rất đơn giản để sử dụng hiện nay, nhà cung cấp Continous Integration rất mạnh mẽ cho phép bạn xây dựng, test code ứng dụng Ruby on Rails của mình với thiết lập tối thiểu, miễn phí.

Nếu bạn quan tâm đến chất lượng code ứng dụng Ruby on Rails và bảo trì dễ dàng, đó là sự kết hợp hoàn hảo cho bạn.

Link tham khảo:

https://circleci.com/docs/2.0/enable-checks/

https://hixonrails.com/ruby-on-rails-tutorials/ruby-on-rails-set-up-on-github-with-circleci/