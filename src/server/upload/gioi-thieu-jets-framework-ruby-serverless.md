[Ruby on Jets](http://rubyonjets.com/) là 1 framework cho phép bạn xây dựng 1 ứng dụng web serverless bằng Ruby. Cấu trúc của nó bao gồm đầy đủ các thành phần để có thể giúp bạn xây dựng và triển khai ứng dụng với [AWS Lambda](https://aws.amazon.com/lambda/). Khi bạn thích vẻ đẹp của Ruby, Rails và AWS, đồng thời muốn xây 1 ứng dụng serverless thì Jets là framework đáng để thử. Đó là lý do mà Jets ra đời.

Để hiểu sâu về Jets, bạn phải nắm rõ các khái niệm về **AWS Lambda** và **API Gateway** vì Jets kết nối code của bạn tới các tài nguyên của 2 công nghệ trên.
**AWS Lambda** cung cấp các Function dưới dạng các Service. Nó cho phép bạn chạy và tải code lên mà không cần quan tâm cấu trúc đằng sau của hệ thống.
**API Gateway** là lớp đảm nhiệm việc routing của Lambda. Nó được sử dụng để điều hướng các đích đến REST URL cho Lambda.
# Ví dụ kiến trúc cho Jets
Mọi kiến trúc đều có thể được xây dựng bằng Jets. Dưới đây là ví dụ về 1 kiến trúc web truyền thống khi sử dụng Jets.



Bạn chỉ cần viết code, còn việc code chuyển thành hàm trong AWS Lambda và API Gateway, hãy để Jets lo :sunglasses:
# Các hàm
Jets hỗ trợ việc viết các hàm của AWS Lambda với Ruby. Bạn có thể định nghĩa chúng trong thư mục `app/functions`. Ví dụ:
```ruby
# app/functions/simple.rb
def handler_function(event:, context:)
  puts "hello world"
end
```
Phần xử lý mặc định được đặt tên là `handler_function`. Hàm lambda được hiển thị ở Lambda console như sau:



Và đây là kết quả nếu bạn chạy code ở console của AWS Lambda:



Những hàm trên dù được hỗ trợ bởi Jets, nhưng các class như Controller và Job còn mạnh hơn.
# Controller
Đây là 1 controller mẫu:
```ruby
# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  def index
    # renders Lambda Proxy structure compatiable with API Gateway
    render json: {hello: "world", action: "index"}
  end

  def show
    id = params[:id] # params available
    # puts goes to the lambda logs
    puts event # raw lambda event available
    render json: {action: "show", id: id}
  end
end
```
Nếu như bạn code Rails và Sinatra, đoạn code trên trông thân thương tới lạ. Các phương thức Helper như params hỗ trợ các tham số từ event của API Gateway. Phương thức render sẽ trả về 1 cấu trúc Lambda Proxy mà API Gateway đọc và hiểu được.

Jets “xử” từng phương thức đặt ở khả năng truy cập public và chuyển chúng thành các hàm của Lambda như này:

![](https://images.viblo.asia/8e83605c-e95e-4ffd-be30-8af6c32fa218.jpg)

# Routes
Ví dụ về routes:
```ruby
# config/routes.rb
Jets.application.routes.draw do
  get  "posts", to: "posts#index"
  get  "posts/new", to: "posts#new"
  get  "posts/:id", to: "posts#show"
  post "posts", to: "posts#create"
  get  "posts/:id/edit", to: "posts#edit"
  put  "posts", to: "posts#update"
  delete  "posts", to: "posts#delete"
end
```
Jets đọc file này, tạo ra các tài nguyên API Gateway tương ứng, và kết nối chúng với các hàm của Lambda.


# Jobs
Jets cũng hỗ trợ cho việc xử lý các tác vụ bất đồng bộ không nằm trong vòng request – response của web. Ví dụ:
```ruby
# app/jobs/hard_job.rb
class SteveJob < ApplicationJob
  rate "10 hours" # every 10 hours
  def dig
    {done: "digging"}
  end

  cron "0 */12 * * ? *" # every 12 hours
  def lift
    {done: "lifting"}
  end
end
```
Đoạn code trên sẽ tạo ra các hàm Lambda và các luật sự kiện CloudWatch để xử lý tiến trình công việc.

Bạn có thể check các hàm ấy ở console của Lambda:



Bạn cũng có thể thấy các CloudWatch Event Rule tương ứng ở console của CloudWatch


# Cấu trúc thư mục
Đây là cấu trúc thư mục của 1 project Jets
```
.
├── app
│   ├── controllers
│   ├── helpers
│   ├── javascript
│   ├── jobs
│   ├── models
│   └── views
├── bin
├── config
├── db
├── public
└── spec
```
Chúng ta vẫn có 3 folder của mô hình MVC: `app/models`, `app/views`, và `app/controllers`. Thư mục `config` sẽ chứa tất cả các cài đặt cấu hình của project.
# Thử nhanh nào
Bây giờ là lúc thử Jets qua loa 1 chút. Mở terminal và chạy các lệnh sau:
```bash
gem install jets
jets new demo
cd demo
jets generate scaffold Post title:string
vim .env.development # edit with local db settings
jets db:create db:migrate
jets server
```
Lệnh `jets server` sẽ tạo ra 1 server giả lập lại API Gateway để các bạn có thể thử local trên máy. Cứ mở http://localhost:8888/posts và nghịch ngợm thôi.

Khi bạn sẵn sàng, hãy sửa `.env.development.remote` để kết nối với 1 cơ sở dữ liệu RDS và triển khai ở AWS Lambda.
```bash
$ vim .env.development.remote # adjust with remote db settings
$ jets deploy
API Gateway Endpoint: https://puc3xyk4cj.execute-api.us-west-2.amazonaws.com/dev/
```
Bạn sẽ thấy 1 thứ kiểu kiểu như lày:

Các hàm Lambda: 

![](https://images.viblo.asia/46b790c9-9614-4eb7-9b74-3e70370e4f86.jpg)

API Gateway:

![](https://images.viblo.asia/e17f9116-0f64-4a19-b115-2109e95317cc.jpg)

Giao diện cái app:

![](https://images.viblo.asia/7e4556b1-fc47-4a36-b197-23b7564a3cf2.jpg)

# Môi trường bổ sung
Chạy ứng dụng trên AWS Lambda có 1 điều thuận lợi là bạn chỉ bị tính phí với những request thực sự. Nên các môi trường bổ sung hầu như [AWS free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) đều có. Chỉ cần:
```
JETS_ENV_EXTRA=2 jets deploy
JETS_ENV_EXTRA=3 jets deploy
...
JETS_ENV_EXTRA=8 jets deploy
```
 Chỉ phải mất vài phút là có môi trường miễn phí không giới hạn.
# Binary Gems
Khi làm Serverless, bạn cos thể sẽ gặp vài vấn đề tế nhị với binary gem. Phần lớn các gem là code Ruby thuần và có thể dùng tự nhiên ở AWS Lambda. Tuy nhiên, có gem như nokogiri lại dùng các native extension để compile. Do đó, bạn phải compile các gem này ra kiến trúc mà Lambda xử lý được. Jets giải quyết vấn đề này bằng Lambda Gems. Hãy click vào [Lambda Gems](https://www.lambdagems.com/) để có thể tìm hiểu thêm.
# Tham khảo:
https://blog.boltops.com/2018/08/18/introducing-jets-a-ruby-serverless-framework