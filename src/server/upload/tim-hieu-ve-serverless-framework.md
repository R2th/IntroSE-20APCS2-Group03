Bài viết gốc xem tại: https://vtitech.vn/tim-hieu-ve-serverless-framework/

Hôm nay mình sẽ cùng các bạn làm quen với Serverless framework - một trong những framework xây dựng ứng dụng serverless phổ biến hiện nay.

# Tổng quan về Serverless
Serverless là 1 framework miễn phí và Open Source viết bằng Node.js. Serverless là framework đầu tiên được phát triền nhằm xây dựng ứng dụng trên AWS Lambda.

Đánh giá cá nhân thì mình thấy Serverless là 1 framework khá gọn nhẹ, dễ dùng. Bởi sau khi khởi tạo 1 project Serverless mới, ngoài thư mục dependancies chúng ta không cần quan tâm nhiều ra thì có 2 phần: source code tự phát triển thêm và file `serverless.yml`. So với 1 số framework server như Rails, Laravel,... thì quả là gọn nhẹ về số lượng file.

# Cài đặt và các CLI
## Cài đặt
Do là 1 framework phát triển bằng Node.js nên Serverless đương nhiên quản lý bằng `npm`. Vì vậy cách cài đơn giản nhất là dùng `npm`:
```bash
npm install -g serverless
```
Có 1 vài cách khác nữa các bạn có thể xem ở link doc của Serverless mà mình đã đưa ở thư mục tham khảo. Tuy nhiên theo ý kiến cá nhân thì NodeJS là 1 trong những công cụ phổ biến của lập trình hiện đại nên cách tốt nhất vẫn là cài NodeJS từ đầu rồi sau đó cài Serverless vẫn tối ưu nhất.
## CLI
* Cách khởi tạo 1 project Serverless mới:
```bash
serverless
```
* Cách deploy:
```bash
serverless deploy
```
Bằng cách này, bạn có thể tạo 1 project Serverless bằng cách tạo 1 folder chứa mã nguồn và file `serverless.yml` cài đặt cấu trúc và cách triển khai code. Sau đó chạy deploy và code của chúng ta sẽ được triển khai trên AWS Lambda.
* Invoke function hello
```bash
serverless invoke -f hello

# Invoke và hiển thị log:
serverless invoke -f hello --log
```
* Fetch log của function
```bash
serverless logs -f hello

# Tail logs
serverless logs -f hello --tail
```
* Xóa
```bash
serverless remove
```
Command này cho phép bạn xóa đi toàn bộ các resource AWS với chắc chắn không gặp bất cứ 1 lỗi nào.
# File serverless.yml
`serverless.yml` là file sẽ cho chúng ta setup các dịch vụ AWS chúng ta sẽ dùng và function nào cũng ta sẽ invoke. Mục này chúng ta sẽ nhìn và phân tích file `serverless.yml` mà mình đã dựng dựa theo ví dụ thực hành mình làm ở link thứ 2 phần tham khảo
```yaml
service: language-corrector
frameworkVersion: '3'

provider:
  name: aws
  stage: dev
  region: ap-northeast-1
  profile: Gryqhon
  runtime: python3.8
  ecr:
    images:
      gingerit:
        path: ./
  apiGateway:
    apiKeys:
      - free:
          - language-corrector-free
      - paid:
          - language-corrector-paid
    usagePlan:
      - free:
          quota:
            limit: 100
            offset: 1
            period: MONTH
          throttle:
            burstLimit: 1
            rateLimit: 1
      - paid:
          quota:
            limit: 1000
            offset: 1
            period: MONTH
          throttle:
            burstLimit: 200
            rateLimit: 100

functions:
  gingerit:
    timeout: 10
    memorySize: 256
    image:
      name: gingerit
    events:
      - http:
          path: language_corrector
          method: post
          cors: false
          async: false
          private: false
```
Chúng ta sẽ cùng phân tích các định nghĩa trong file trên:

* `service`: tên của service được triển khai.
* `frameworkVersion`: chỉ định version của framework. Đây là cài đặt optional.
* `provider`: Nền tảng cloud mà Serverless framework triển khai. Mặc định sẽ là AWS, nhưng các bạn có thể cài đặt là Google cloud hay Azure được.
* `functions`: Các function được triển khai.

Ở `provider`, các cài đặt sẽ gồm có:

* `name`: Tùy theo nền tảng bạn triển khai mà bạn để là `aws`, `google` hay là `azure`.
* `runtime`: Ngôn ngữ được sử dụng của service. Ví dụ là `nodejs14.x` hay `python3.8`
* `region`: Đây là cài đặt optional. Mặc định là `us-east-1`. Còn mình đang ở Nhật nên chọn `ap-northeast-1`
* `profile`: Đây cũng là cài đặt optional. Máy mình sử dụng đang không để credantial mặc định nên thêm config này vào.
* Sau đó là các dịch vụ bổ sung như `ecr` hay `apiGateway` tùy theo project của bạn

Ở `functions`, chúng ta sẽ có:

* Tên function, ở đây là `gingerit`
* Sau function name sẽ là `image` hoặc `handler`
* Các cài đặt optional là `timeout`, `memorySize`.
* Phần `event` là phần trigger ở trên Lambda. Trong ví dụ này do là API Gateway nên sẽ có phần http. Có sự gần gũi với SAM.
# Link tham khảo
* https://www.serverless.com/framework/docs
* https://towardsdatascience.com/build-a-serverless-api-with-amazon-lambda-and-api-gateway-dfd688510436