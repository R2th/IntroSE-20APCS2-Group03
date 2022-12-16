Đây là bài viết tổng hợp lại kiến thức của mình khi bắt đầu tìm hiểu về CircleCI. Và một hướng dẫn đơn giản để sử dụng nó.

# CI là gì?
CI là viết tắt của Continuous Integration có thể dịch là "Tích hợp liên tục". Đây được xem là một phương pháp phát triển phần mềm tối ưu, mỗi khi có một thay đổi đối với code, sẽ có một server tự động build, chạy test để kiểm tra và đảm bảo không có lỗi nào xuất hiện trong quá trình phát triển. Việc này cũng đòi hỏi các thành viên trong team phải liên tục cập nhật code của họ lên các kho lưu trữ một cách thường xuyên.
# CD là gì?
CD (Continuous Deployment) tạm dịch là "Triển khai liên tục" là một quá trình phát hành sản phẩm hoặc phần mềm, các thay đổi về code sẽ tự động được deploy tự động lên các server staging, production, cùng với việc chạy các bài test để đảm bạo độ chính xác.
# Giới thiệu tool CircleCI
CircleCI là một nền tảng giúp chúng ta có thể áp dụng CI/CD vào dự án một cách dễ dàng. Chỉ cần đăng nhập bằng một tài khoản github là các repo của bạn đã có thể kết nối với CircleCI.

![](https://images.viblo.asia/8bfe8803-2e09-4f51-82f7-5c8ed5b6f352.png)

Quá trình chạy 1 job trên CircleCI như sau:
1. Khi code được merge vào một branch thì sẽ CircleCI sẽ tự động bắt được sự kiện này và chạy job tương ứng đã được config.
2. CircleCI tạo một môi trường trên server của nó, pull docker images và run các steps để build code dựa theo các config của chúng ta.
3. Sau khi chạy xong hết các step thì công việc của nó đã xong, bạn có thể xem trạng thái thành công hay thất bại ở màn Dashboard.

Tiếp theo là một số khái niệm khi làm việc với CIrcleCI.

## configuration

Toàn bộ cài đặt của bạn với CircleCI đều được đặt ở trong file `.circleci/config.yml`
```
|-- .circleci
|  |-- config.yml
```

Chi tiết hơn bạn có thể tham khảo https://circleci.com/docs/2.0/configuration-reference/

## pipelines
Một pipeline là toàn bộ cấu hình của bạn khi bạn làm việc với một dự án. Có thể được nhìn thấy thông qua CircleCI cloud. Pipeline bao gồm các workflows của bạn, và workflow lại bao gồm các jobs.

## workflows
Chịu trách nhiệm sắp xếp nhiều công việc. Ví dụ như một workflow để build -> chạy test -> deploy.
## jobs
Chịu trách nhiệm thực hiện các steps thường là một loạt câu lệnh.
# Chạy thử trên ứng dụng rails

Đầu tiên thì mình tạo một repository mới trên github.
![](https://images.viblo.asia/265f9cef-2827-4751-a92e-77862d50027f.png)

Sau khi tạo thì có thể vào mục projects trên CircleCI là đã có thể thấy project vừa tạo.

![](https://images.viblo.asia/6e893ecb-6680-4d0d-9a3d-8f15d6e1740b.png)

Tiếp theo thì bạn có thể tạo một project rails, cài đặt rspec, rubocop... và push code nên repo.
Để cho tiện thì mình có fork dự án demo của circle về để xem và nó config như sau:

```yml config.yml
version: 2.1

# Các orb giống như các thư viện chưa các jobs có sẵn cho chúng ta sử dụng
orbs:
  ruby: circleci/ruby@1.1.0
  node: circleci/node@2

jobs:
  build:
    docker:
        # docker image mà ta sử dụng
      - image: cimg/ruby:2.7-node
    steps:
      - checkout
      # cài đặt gem, bundle
      - ruby/install-deps
      # store bundle cache
      - node/install-packages:
          pkg-manager: yarn
          cache-key: "yarn.lock"
  test:
    parallelism: 3
    docker:
      - image: cimg/ruby:2.7-node
      - image: circleci/postgres:9.5-alpine
        environment:
          POSTGRES_USER: circleci-demo-ruby
          POSTGRES_DB: rails_blog_test
          POSTGRES_PASSWORD: ""
    environment:
      BUNDLE_JOBS: "3"
      BUNDLE_RETRY: "3"
      PGHOST: 127.0.0.1
      PGUSER: circleci-demo-ruby
      PGPASSWORD: ""
      RAILS_ENV: test
    steps:
      - checkout
      - ruby/install-deps
      - node/install-packages:
          pkg-manager: yarn
          cache-key: "yarn.lock"
      - run:
          name: Wait for DB
          command: dockerize -wait tcp://localhost:5432 -timeout 1m
      - run:
          name: Database setup
          command: bundle exec rails db:schema:load --trace
      # Run rspec in parallel
      - ruby/rspec-test
      - ruby/rubocop-check

workflows:
  version: 2
  build_and_test:
    jobs:
      - build
      - test:
          requires:
            - build

```

Ở đây các lệnh run đều đã có sẵn trong orb, nhưng tùy vào công việc mà bạn cũng có thể tự viết các lệnh của riêng mình.

![](https://images.viblo.asia/85ec2c8b-9568-4cbe-b78c-8c9ac6bfb8c8.png)

Sau khi có file config thì mỗi khi chúng ta có bất kỳ commit nào CircleCI sẽ tự động chạy workflow của chúng ta, bạn có thể cài đặt lại ở phần Project Setting > Advanced.

...

Giao diện và cách sử dụng CircleCI ở mức cơ bản thì khá đơn giản và dễ sử dụng. Hy vọng sau bài viết của mình, các bạn có thể có hứng thú hơn để sử dụng thử nền tảng này.