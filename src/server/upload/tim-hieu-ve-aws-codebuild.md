Bài viết gốc của anh Morishita tại [tech.actindi.net](https://tech.actindi.net/2018/08/31/120906)

# CodeBuild là gì?
[CodeBuild](https://aws.amazon.com/jp/codebuild/?sc_channel=PS&sc_campaign=acquisition_JP&sc_publisher=google&sc_medium=code_build_b&sc_content=code_build_e&sc_detail=code%20build&sc_category=code_build&sc_segment=173323550600&sc_matchtype=e&sc_country=JP&sc_brand=brand&ef_id=WwPdMQAAALDfxhMJ:20180829145951:s) là 1 service của AWS, 1 service *quản lý việc build hệ thống toàn diện*.

Tức dùng nó bạn không chỉ biên dịch mã nguồn mà còn xử lý các tiến trình khác tùy thuộc vào cài đặt của bạn.
# Đặc điểm
## Sử dụng môi trường xử lý thông số kỹ thuật cao trong vài phút
Với cấu hình mạnh nhất, bạn có thể sử dụng môi trường **8vCPU, bộ nhớ 15GB**. Đối với loại EC 2, nó gần với c5.2 xlarge.

Ví dụ: nếu bạn cần xử lý 1 giờ/ngày vào 20 ngày làm việc/tháng, bạn sẽ tốn 313,30$/tháng nếu bạn chạy phiên bản c5.2 xlarge mọi lúc.

Mặt khác, nếu là CodeBuild, chi phí theo giờ cao hơn EC2, nhưng vì nó chỉ tính phí vào thời gian cần thiết, 0,020$/phút x 60 phút x 20 ngày = 24$. Chỉ tốn 24$. Rõ ràng là bạn thấy nó **tiết kiệm hơn hẳn**.
## Tốn ít thời gian và công sức hơn
EC2 có thể custom để chạy trong thời gian cần thiết? Bạn có thể nghĩ thế. Tất nhiên bạn có thể làm điều đó. Tuy nhiên với cách ấy, liệu bạn có chuẩn bị một script khởi động và dừng phiên bản EC2 và một máy khác để chạy nó không?

Với CodeBuild, chỉ cần hướng dẫn thực hiện bằng API, cung cấp môi trường thực thi theo yêu cầu, thực hiện xử lý và hoàn thiện. Không cần tới thao tác clean-up sau khi xong việc.

Vì bạn cũng có thể sử dụng CloudWatch Event làm trình kích hoạt để thực thi, nên bạn có thể thực hiện thường xuyên nếu bạn không cần chạy API định kỳ trên các máy khác. Ngay cả khi bạn cần chạy nhiều môi trường cùng một lúc, bạn có thể chạy số lượng bao nhiêu cũng được chỉ với vài lệnh từ console.

Không có giới hạn 5 phút như Lambda, và **cảm giác sảng khoái** với việc không cần quản lý máy chủ mà vẫn có được sức mạnh tính toán cần thiết!
## Hỗ trợ nhiều ngôn ngữ lập trình
Ôi cái này cũng là chuyện phổ biến hiện nay ấy mà. Đây là vài ngôn ngữ CodeBuild hỗ trợ
* Golang
* Java
* Node.js
* PHP
* Python
* Ruby
* .NET Core
* Docker

Tất cả đều thuộc Docker Image với base là OS Ubuntu 14. Bạn cũng có thể chọn Windows.
## Chơi tốt với GitHub
Code xử lý bởi CodeBuild có thể được lấy từ GitHub, cũng như việc push code mới lên GitHub để chạy tiến trình mới.
## Anh em với nhiều service khác của AWS
Cùng 1 cha Amazon để ra thì việc phải chơi chung với nhau cũng không có gì lạ. Thực sự thì đây là 1 sự thuận tiện bởi bạn sẽ không mất nhiều thời gian nếu cần phải thêm CodePipeline, CodeDeploy hay CloudWatch Event.
# Vậy thử thí nghiệm nào
Chúng ta sẽ làm thí nghiệm với RSpec của 1 ứng dụng Ruby on Rails, gồm các bước sau:
- Lấy mã nguồn từ GitHub.
- Chạy `docker-compose` để chạy RSpec.
- Ghi kết quả test ra 1 file và đặt ở bucket S3.
# Thiết lập project CodeBuild
Project được thực hiện trên hệ thống có thông số như sau:
- docker image: aws/codebuild/docker:17.09.0
- máy chạy: bộ nhớ 15 GB, 8vCPU
- đối tượng thí nghiệm: repository tên rails-app ở GitHub.

Trên console của AWS, thiết lập như sau:

![](https://images.viblo.asia/e4cd38e0-bc35-48fe-8114-11ec929b7c15.png)

## buildspec.yml
CodeBuild định nghĩa nội dung xử lý với một tệp có tên buildspec.yml. Tập tin này được bao gồm trong code ở Github. Như vậy, bản thân buildspec.yml cũng được xét vào version controll.

Trong trường hợp của ví dụ này, nội dung của nó như sau.
```
version: 0.2

phases:
  pre_build:
    commands:
      - echo Starting pre_build phase at `date`
      - $(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)
      - mkdir -p ./coverage/
  build:
    commands:
      - echo Build Phase started on `date`
      - echo Running RSpec test sequence
      - chmod -R 755 bin
      - docker-compose -f docker-compose-rspec.yml up --abort-on-container-exit
  post_build:
    commands:
      - echo Post Build Phase started on `date`
      - cp ./log/test.log ./coverage/
artifacts:
  files:
    - '**/*'
  base-directory: 'coverage'
```
## phase:
Chúng ta sẽ xử lý các `phases`:
 - `pre_build:` - `build:` Tạo 1 thư mục `/coverage/` để log lại ECR và kết quả ra.
 - `build:` chạy RSpec bằng `docker-compose`
 - `post_build:` - `build:` ghi toàn bộ việc xử lý của phase vào file log ở thư mục `/coverage/`.
 ## artifacts:
 Tất cả các file đều được chứa ở folder `/coverage/`.
 ## docker-compose-rspec.yml
 ```
 version: '2'
services:
  db:
    image: mysql:5.6
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
    ulimits:
      nofile: 65536
  rails:
    image: "xxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/rails:base"
    environment:
      RAILS_ENV: test
      RACK_ENV: test
      SECRET_KEY_BASE: pickasecuretoken
    ulimits:
      nofile: 65536
    command: [
      "prehook", "bundle install --with test", "--",
      "prehook", "yarn install", "--",
      "prehook", "bundle exec rake webpacker:compile", "--",
      "prehook", "bundle exec rake db:create", "--",
      "bin/rspec-queue", "spec" ]
    volumes:
      - .:/rails-app
    depends_on:
      - db
 ```
 ## 2 container
 2 container cần khởi động là `db` của MySQL và `rails` container chứa RSpec.
 # 1 số nhược điểm
 - Khó debug
 - Shell script không có đặc quyền thực thi
 - Dừng ở exit status khác 0
 # Vậy dùng khi nào thì tốt?
 - Xây dựng 1 Docker image
 - Xử lý batch