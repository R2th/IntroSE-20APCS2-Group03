## VCR là gì?
### Đặt vấn đề
Trong việc phát triển Rails app, việc bạn thực hiện gọi một thư viện bên thứ ba ( third party ) là khó có thể tránh khỏi. Ví dụ như trong việc thực hiện module login, khách hàng yêu cầu: "Tao muốn người dùng của tao có thể login qua mạng xã hội như facebook, line, tao muốn dùng firebase để quản lý việc này" hay đến module thanh toán "Tao tìm hiểu thấy payjp thực hiện được chức năng thanh toán, mày dùng cái đấy cho tao nhé!" OK, ít ra nó cũng đã tìm hiểu nên chỉ điểm rõ ràng, điểm cộng. Giờ việc của coder chúng ta là lên trang chủ mấy thư viện này, đọc docs rồi config linh tinh các kiểu. Config xong thì lao vào code, test rồi lại code, test ... Sau một hồi, woa, chạy rồì ( vỗ tay ). Giờ thì commit, push code lên nào, cơ mà techlead comment: "Ơ, ko viết test hả em?". Oạch, quên cmnr T.T Giờ thì lao vào viết rspec, chạy pass hết rồi, cảm thẩy ổn ổn rồi nên push lên lại. AI ngờ lên đến github thì bị chết CI với lỗi: Connect PayjpTimeout :v, felling bất hạnh. Rerun CI lại lần nữa, test pass. Tưởng răng ngon ghẻ, được merge rồi, ai ngờ Techlead lại comment tiếp: "Dùng vcr đi em!" VCR là gì, ông này viết sai chính tả à (if you know what i mean), lại lên google, gõ "vcr rspec", hóa ra là có thật :v: 
### VCR là gì?
VCR đầu tiên, làm một gem của rails https://github.com/vcr/vcr Nó thật sự hữu ích trong việc viết test khi gọi thư viện bên ngoài trong rails app của bạn. VCR sẽ ghi lại request và response của bên thứ ba lần đầu, sau đó, khi đến lần thứ hai bạn gọi đến request này, nó sẽ gọi lại response đã được thu lúc trước, do đó, có thể phần viết test của bạn, request đến bên thứ ba rất nhiều lần, nhưng thực chất, chỉ có một lần mà thôi.
## Sử dụng như thế nào
### Config
Tương tự như các gem khác, bạn phải thêm "gem 'vcr'" vào trong gem file của mình, tuy nhiên, để có thể gọi request đến các thư viện ngoài, bạn cần thêm gem phụ trợ khác, ví dụ như "Webmock" https://github.com/bblimke/webmock hay "Typhoeus" https://github.com/typhoeus/typhoeus ... Ở đây, mình sẽ sử dụng webmock, khi đó, Gemfile của bạn sẽ thêm 2 dòng sau:
```
Gemfile


gem 'vcr'
gem 'webmock'
```
chạy bundle install nào.
Sau đó, trong file spec_helper.rb
```
spec_helper.rb

require "vcr"

VCR.configure do |config|
  config.cassette_library_dir = "spec/vcr"
  config.hook_into :webmock
end
```
Giải thích ngắn gọn như sau: Dòng đầu tiên giúp gem VCR được load ở trong rspec, khi đã được load rồi, mình config cho gem như sau:
* Thư mục để lưu các response: "spec/vcr". Như mình đã nói ở trên, các response sẽ được thu lại lần đầu tiên, và ghi vào các file .yml. Các file .yml này như mình config ở đây sẽ được đặt ở foler spec/vcr.
* Gem để hỗ trợ tạo request sang bên thứ ba: webmock
### VCR trong rspec
Sau khi đã config xong, để test một method có câu lệnh gọi sang bên thứ ba thì hãy viết trong file test:
```
VCR.use_cassette "request's name", record: record_mode  do
      // method có chứa request
end
```
Để cho dễ hiểu, mình giả sử muốn lấy tất cả các customer trên payjp, mình sẽ gọi:
```
VCR.use_cassette "get all customer", record: :once do
  Payjp::Customer.all
end
```
( Ghi chú là để chạy được đoạn code này bạn hãy config đầy đủ môi trường cho payjp nhé!. )
Sau đó, chạy `rspec` như bình thường, bạn sẽ thấy foler `spec/vcr` được tạo ra, trong foler sẽ có file `get_all_customer.yml`. Mở file này, bạn sẽ thấy  request và response vừa được gọi, chẳng hạn:
```
---
http_interactions:
- request:
    method: get
    uri: https://api.pay.jp/v1/customers
    body:
      encoding: US-ASCII
      string: ''
    headers:
      Accept:
      - "*/*"
      Accept-Encoding:
      - gzip, deflate
      User-Agent:
      - Payjp/v1 RubyBindings/0.0.6
      Authorization:
      - Basic *************
      Content-Type:
      - application/x-www-form-urlencoded
      X-Payjp-Client-User-Agent:
      - *****************
      Host:
      - api.pay.jp
  response:
    status:
      code: 200
      message: OK
    headers:
      Date:
      - Fri, 23 Nov 2018 06:56:59 GMT
      Content-Type:
      - application/json; charset=utf-8
      Content-Length:
      - '553'
      Connection:
      - keep-alive
      Server:
      - nginx
      Request-Id:
      - dd913d40-a022-4264-94d5-c698f196f73f
      X-Frame-Options:
      - SAMEORIGIN
      Strict-Transport-Security:
      - max-age=86400; includeSubDomains
    body:
      encoding: UTF-8
      string: |-
        {
          "count": 3,
          "data": [
            {
              "cards": {
                "count": 0,
                "data": [],
                "has_more": false,
                "object": "list",
                "url": "/v1/customers/cus_842e21be700d1c8156d9dac025f6/cards"
              },
              "created": 1433059905,
              "default_card": null,
              "description": "test",
              "email": null,
              "id": "cus_842e21be700d1c8156d9dac025f6",
              "livemode": false,
              "metadata": null,
              "object": "customer",
              "subscriptions": {
                "count": 0,
                "data": [],
                "has_more": false,
                "object": "list",
                "url": "/v1/customers/cus_842e21be700d1c8156d9dac025f6/subscriptions"
              }
            },
            {...},
            {...}
          ],
          "has_more": true,
          "object": "list",
          "url": "/v1/customers"
        }
    }
    http_version: 
  recorded_at: Fri, 23 Nov 2018 06:56:59 GMT
recorded_with: VCR 4.0.0
```
Việc đặt tên cho record cũng tương đối quan trọng khi dùng vcr, vì có khi nào bạn muốn mở cả file dài ngoằng này ra để đọc xem nội dung bên trong nó như thế nào à? Hãy đặt tên dễ hiểu, ngắn gọn để teammate nó ko nhìn mình với ánh mắt hình viên đạn nhé :v 
Ở các test case tiếp theo, nếu bạn vẫn gọi đến request này, hãy viết tên record trùng với record bạn đã viết lúc trước nhé:
```
VCR.use_cassette "get all customer", record: :once do
      // method có chứa request
end
```
VCR cung cấp các record modes như sau:
* `once`: Đây là mode mặc đinh, mode này sẽ
    * "Replay" request 
    * Tạo ra request mới và ghi lại response trong file .yml nếu file này chưa tồn tại
    * Khi đã có file .yml, mode này sẽ raise lỗi nếu có request mới không tồn tại trong record
* `all`:
    * Mode này sẽ lưu lại tất cả request và response và đặc biệt là nó sẽ không replay bất kì request nào
    * Mode này có vẻ như đang đi ngươc lại ý nghĩa của gem, nhưng nó thật sự hữu ích vì reponse của bạn sẽ luôn được cập nhật realtime với dữ liệu bên thứ ba, hay khi bạn muốn log lại tất cả các request
* `new_episodes`:
    * Tạo thêm request và ghi lại cả request và response mới
    * Replay lại request trước đó
    * Mode này thường được sử dụng để kiểm tra dữ liệu sau khi thực hiện các thao tác thêm mới, sửa, xóa...
* `none`:
    * Replay request đã có
    * Raise lỗi nếu có request mới tạo ra
    * Vì mode này không tạo ra request gửi đến bên thứ ba nên thực chất nó chỉ là đọc file .yml đã có sẵn

Bên cạnh đó, để kiểm tra request mới đã tồn tại hay chưa, VCR sẽ matching request đó với các request đã có sẵn, mặc định là http method và uri. Tuy nhiên, bạn cũng có thể kiểm tra trên nhiều thuộc tính khác nhau như:
* method: Các HTTP method như `GET`, `POST`, `PUT` hay `DELETE`
* uri: URI đầy đủ của request
* host:  Host của URI
* path: Path của URI
* query: Query trên URI, thứ tự của các query sẽ không ảnh hưởng đến kết quả
* body: Request body
* headers: Request header

Để kiểm tra request trùng lặp, bạn  có thể sử dụng phương thức:
` :match_requests_on => []` 
Với giá trị trong mảng là các thuộc tính đã được nêu trên.

## Tài liệu tham khảo
https://relishapp.com/vcr/vcr/v/3-0-3/docs