*Sau 3 ngày hì hục, tìm tài liệu, thử, gọi trợ giúp các kiểu thì mình cũng đã tích hợp thành công con CI cho dự án Rails API. Hiện tại, Framgia CI đang có 2 version v2 và v3. Bài này mình sẽ hướng dẫn cấu hình với bản v2.*
### 1. Tạo docker image, upload lên hub docker
*Bước 1: Tạo thư file `Dockerfile` vào thư mục gốc của dự án như sau:*
```
FROM ruby:2.4.1

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get install -y nodejs && npm install -g gulp-cli bower eslint babel-eslint eslint-plugin-angular

COPY Gemfile /cache/Gemfile
COPY Gemfile.lock /cache/Gemfile.lock

RUN cd /cache && bundle install

RUN curl -o /usr/bin/framgia-ci https://raw.githubusercontent.com/framgia/ci-report-tool/master/dist/framgia-ci && chmod +x /usr/bin/framgia-ci

```
Nội dung file này là tạo một image bao gồm: một image có tên `ruby:2.4.1` (image của docker giống như file ghost bên win, là bản nén gồm những thứ đã cài đặt sẵn rồi, chỉ việc bung ra và dùng) đã có đủ ruby version 2.4.1, bundle, gem... các kiểu và cài thêm vào đó những thứ ta cần như nodejs, gulp-cli... Copy file Gemfile, Gemfile.lock ở thư mục dự án của hiện tại vào folder `cache`, chạy bundle để install gem, cài Framgia CI.

*Bước 2: Build image từ `Dockerfile` vừa tạo:*

Cài Docker trên máy của bạn(Tự tìm hiểu) và chạy lệnh build image sau:
```
docker build -t [image-name] .
```

*Bước 3: Upload lên hub docker*

Vào trang https://hub.docker.com/ và tạo tk, rồi tạo một `Automatic build`(trong tab Create gần avatar) trỏ đến dự án hiện tại trên git/bitbucket...
![](https://images.viblo.asia/b3c76622-4178-4cad-a72d-49a014b55f1d.png)
![](https://images.viblo.asia/a2e99653-53ff-4fd3-9d1d-33beefd98c43.png)
Tiếp theo là chọn dự án, rồi điền thêm description, nhớ để chế độ public cho repo(Vì phần này liên quan đến bảo mật nên mình k share màn hình được)
Sau khi thành công ta được kq:
![](https://images.viblo.asia/cafa907e-8629-4408-b693-86eab98dc94c.png)

Tiếp theo, đẩy image vừa tạo ở bước 2 lên hub docker theo tài liệu[ ở đây](https://docs.docker.com/docker-cloud/builds/push-images/)

### 2. Cấu hình cho CI
*Bước 1: Tạo file .drone.yml trong thư mục gốc của dự án*
```
# .drone.yml
build:
  image: quyetlqp/blog
  environment:
    REPO_URL: git@github.com:framgia/rails5_skeleton.git
    EMAIL_USERNAME: sample@sample.com
    EMAIL_PASSWORD: sample1
    HOST: localhost:3000
    AWS_REGION: ap-northeast-1
    AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY
    S3_BUCKET_NAME: S3_BUCKET_NAME
    DATABASE_HOSTNAME: 127.0.0.1 #không sửa
    DATABASE_NAME: rails_app_development
    DATABASE_USERNAME: test #không sửa
    DATABASE_PASSWORD: test #không sửa
    REDIS_HOSTNAME: localhost
    RAILS_ENV: test #không sửa
    SECRET_KEY_BASE: ci_test
    DEVISE_SECRET_KEY: ci_test
    WEB_SERVER: unicorn
    NUM_UNICORN_WORKERS: 3
  commands:
    - framgia-ci test-connect 127.0.0.1 3306
    - bundle install
    - RAILS_ENV=test rake db:create db:migrate
    - framgia-ci run

compose:
  database:
    image: mysql
    environment:
      MYSQL_DATABASE: rails_app_development
      MYSQL_USER: test #không sửa
      MYSQL_PASSWORD: test #không sửa
      MYSQL_ROOT_PASSWORD: root #không sửa
  redis:
    image: redis:3.0.7
cache:
  mount:
    - .git`
```
Trong file trên là những cấu hình riêng của môi trường test, tên biến môi trường thì đặt theo dự án hiện tại. Riêng nhưng dòng mình có comment `Không sửa` thì cần giữ lại đúng giá trị cho biến môi trường đó, còn lại nhưng biến môi thì nếu dùng thì thêm, không thì xóa. Trong phần `compose` nếu dự án k sử dụng redis thì có thể xóa đi. File này đóng vai trò chim mồi cho git hiểu được cần chạy CI cho PR này.

*Bước 2: Tạo file .framgia-ci.yml trong thư mục gốc của dự án*

Trong file này chính là những lệnh bạn muốn chạy test cho dự án
```
# .framgia-ci.yml
project_type: ruby
test:
  bundle-audit:
    command: bundle-audit check --update > .framgia-ci-reports/bundle-audit.txt
    ignore: true
  rspec:
    command: rspec --format html --out .framgia-ci-reports/rspec.html spec/
  brakeman:
    command: brakeman -o .framgia-ci-reports/brakeman.html -o .framgia-ci-reports/brakeman.json
    ignore: true
  reek:
    command: reek --format html > .framgia-ci-reports/reek.html app/
    ignore: true
  rubocop:
    command: bundle exec rubocop --require rubocop/formatter/checkstyle_formatter --format RuboCop::Formatter::CheckstyleFormatter --no-color --rails --out .framgia-ci-reports/rubocop.xml app/ lib/
    ignore: true
```
Tiếp đó, tạo thêm 1 thư mục `.framgia-ci-reports` trong thư mục gốc của dự án, tạo file `.keep` vào thư mục vừa tạo và gitignore toàn bộ file trong thư mục `.framgia-ci-reports` ngoại trừ file `.keep`

*Bước 3: Active repo dự án chạy CI*

Xin quyền admin cho repo dự án và tài khoản CI sau đó vào trang http://ci.framgia.vn/, sang tab `AVAILABLE REPOSITORIES` chọn repo và active nó.

*Bước 4: Đẩy toàn bộ nhưng code đã thay đổi ở trên lên git và chờ xem nó chạy CI*

### 3. Config cho CI push notification trên Chatwork group
Cái này thì ez lắm, vào trang http://ci-reports.framgia.vn/ chọn dự án, chọn mục `SETTINGS`, enable `Chatwork notification`. Trong phần `Chatwork Bot` thêm vào một api key của 1 tài khoản chatwork(tự tìm hiểu tạo api key ntn nhé). Trong phần `Room list` thì thêm vào room id của group muốn bắn notification. Chú ý: tài khoản chatwork cần phải join vào group đó thì mới bắn đc notification nhé. Xong rồi đó, push -f lại thử thôi
### 4. Kết luận
Nhìn thì ez vậy thôi chứ lỗi sẽ gặp nhiều ở phần sau khi đẩy lên CI test toàn fail đấy nhé. Cái này thì hơi khó hướng dẫn nên các bạn tự tìm hiểu phần này nhé :D