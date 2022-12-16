Cache cho các ứng dụng web, đa số mọi người có xu hướng sử dụng nó khi gặp phải các vấn đề về hiệu suất. Trước tiên, admin thường xem xét cơ sở dữ liệu và đánh `index`. Nếu điều đó không giúp được gì, admin sẽ xem xét các views và thêm `fragment caching`. Nhưng đây không phải là cách tiếp cận tốt nhất để làm việc với cache.

Mục đích của bài viết này là giúp bạn hiểu cách hoạt động của `key-based cache` . Sau đó bạn có thể sử dụng phương pháp này để lên kế hoạch cho các ứng dụng mới đã có ở cấp cấu trúc cơ sở dữ liệu theo cách mà bạn có thể cache tối ưu trong quá trình phát triển.

Có hai đối số chính để sử dụng cache:

* Ứng dụng trở nên nhanh hơn cho người dùng. Trang web nhanh hơn dẫn đến người dùng hạnh phúc hơn, dẫn đến tỷ lệ sử dụng tốt hơn.
* Bạn cần ít phần cứng hơn cho server vì bạn cần ít hơn tài nguyên CPU và RAM để xử lý các query.

*Nếu hai đối số này không liên quan đến bạn, thì không cần phải đọc bài viết này này.*

Bài viết này sẽ bao gồm ba phương pháp cache:

* **HTTP caching**: Đây là sledgehammer giữa các phương thức caching và vũ khí hiệu suất tối thượng. Đặc biệt, các trang web dành cho thiết bị di động nên cố gắng tận dụng tối đa HTTP cache. Nếu bạn sử dụng kết hợp key-based cache expiration và HTTP cache, sẽ tiết kiệm một lượng thời gian xử lý lớn trên server và cả băng thông.
* **Page caching**: Đây là tuốc nơ vít (screwdriver) trong số các phương pháp caching. Bạn có thể tăng rất nhiều hiệu suất, nhưng nó không phải là tốt dưới dạng HTTP cache.
* **Fragment caching**: Đây là nhíp (tweezers ) giữa các phương pháp caching. Nhưng đừng đánh giá thấp nó! 

Mục đích cuối cùng là để kết hợp tối ưu cả ba phương pháp trên.

# Ví dụ

Bạn sẽ sử dụng một phone book đơn giản với một model **Company** và **Employee**.

Tạo ứng dụng Rails mới:

```
$ rails new phone_book
 […]
$ cd phone_book
$ rails generate scaffold company name
 […]
$ rails generate scaffold employee company:references last_name first_name phone_number
 […]
$ rails db:migrate
 […]
```

## Model

```Ruby
# app/models/company.rb

class Company < ApplicationRecord
 validates :name, presence: true, uniqueness: true
 
 has_many :employees, dependent: :destroy
 
 def to_s
   name
 end
end
```

```Ruby
# app/models/employee.rb

class Employee < ApplicationRecord
 belongs_to :company, touch: true
 
 validates :first_name, presence: true
 validates :last_name, presence: true
 validates :company, presence: true
 
 def to_s
   “#{first_name} #{last_name}”
 end
end
```

## View
```
# app/views/companies/index.html.erb

[…]
<table>
 <thead>
   <tr>
     <th>Name</th>
     <th>Number of employees</th>
     <th colspan=”3"></th>
   </tr>
 </thead>
 <tbody>
   <% @companies.each do |company| %>
     <tr>
       <td><%= company.name %></td>
       <td><%= company.employees.count %></td>
       […]
     </tr>
   <% end %>
 </tbody>
</table>
[…]
```

```
# app/views/companies/show.html.erb

<p id=”notice”><%= notice %></p>
<p>
 <strong>Name:</strong>
 <%= @company.name %>
</p>
<% if @company.employees.any? %>
  <h1>Employees</h1>
  <table>
    <thead>
      <tr>
        <th>Last name</th>
        <th>First name</th>
        <th>Phone number</th>
      </tr>
    </thead>
    <tbody>
      <% @company.employees.each do |employee| %>
        <tr>
          <td><%= employee.last_name %></td>
          <td><%= employee.first_name %></td>
          <td><%= employee.phone_number %></td>
        </tr>
      <% end %>
    </tbody>
  </table>
<% end %>
<%= link_to ‘Edit’, edit_company_path(@company) %> |
<%= link_to ‘Back’, companies_path %>
```

## Tạo dữ liệu mẫu

Chúng ta sẽ sử dụng gem **Faker** để tạo ra một lượng dữ liệu tên và số điện thoại. 

```Ruby
# Gemfile

[…]
gem ‘faker’
[…]
```

Tất nhiên sau đó bạn cần phải chạy lệnh
```
$ bundle install
```

Sau đó sẽ update seed file như sau:
```Ruby
# db/seed.rb

30.times do
 company = Company.new name: Faker::Company.name
 if company.save
   SecureRandom.random_number(100).times do
     company.employees.create first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, phone_number: Faker::PhoneNumber.phone_number
   end
 end
end
```

Tạo dữ liệu mẫu vào database:
```
$ rails db:seed
```

## Tốc độ bình thường của trang để tối ưu hóa

Bắt đầu ứng dụng Rails trong chế độ development (Liên quan giá trị thời gian, tất nhiên phụ thuộc vào phần cứng bạn đang sử dụng.)

```
$ rails server
```

Để truy cập các trang web, sử dụng công cụ dòng lệnh curl (http://curl.haxx.se/). Tất nhiên, bạn cũng có thể truy cập web trên trình duyệt. Bạn có thể xem thời gian được hiển thị trong Rails log. Trong thực tế, bạn cần thêm thời gian nó cần cho trang được gửi đến trình duyệt web.

* Hiển thị tất cả company (app/views/companies/index.html.erb)

Tại URL http://localhost:3000/companies, người dùng có thể thấy danh sách tất cả các công ty đã lưu với số lượng nhân viên có liên quan.

```
Generating the page takes 89ms on my machine.

Completed 200 OK in 89ms (Views: 79.0ms | ActiveRecord: 9.6ms)
```

* Xem chi tiết 1 company (app/views/companies/show.html.erb)

Tại URL http://localhost:3000/companies/1, người dùng có thể thấy chi tiết của công ty đầu tiên với tất cả nhân viên.

```
Generating the page takes 51ms on my machine.

Completed 200 OK in 51ms (Views: 48.9ms | ActiveRecord: 0.9ms)
```

# HTTP Caching

HTTP caching cố gắng sử dụng lại các trang web hoặc tệp đã tải. Ví dụ: nếu bạn truy cập một trang web như www.nytimes.com hoặc www.wired.com nhiều lần trong ngày để đọc tin tức mới nhất, sau đó các yếu tố nhất định của trang đó (ví dụ: biểu trưng ở đầu trang) sẽ không được tải lại từ server trong lần truy cập thứ hai của bạn.Trình duyệt của bạn đã có các tệp này trong local cache, tính năng này sẽ tiết kiệm thời gian tải và băng thông.

Trong Rails, mục đích của bạn là trả lời câu hỏi “Có một trang đã thay đổi?” trong controller. Thông thường, phần lớn thời gian được sử dụng để response data trong view. 

## Last-Modified

Browser biết khi nào nó đã tải xuống một tài nguyên (ví dụ: web page) và sau đó đặt nó vào bộ nhớ cache của nó. Ở request thứ 2, nó có thể chuyển thông tin này đến server trong If-Modified-Since: header. Sau đó, server có thể so sánh thông tin này với tệp tương ứng và phân phối phiên bản mới hơn hoặc trả lại `HTTP 304 Not Modified code as response`. Trong trường hợp 304, web trình duyệt cung cấp phiên bản được lưu trong bộ nhớ cache cục bộ. Bạn sẽ thấy: “Tất cả đều rất tốt cho hình ảnh, nhưng nó sẽ không giúp ích gì cho tôi với các trang web được tạo động như trang index của công ty (companies/index.html.erb).” Tuy nhiên, bạn đang đánh giá thấp sức mạnh của Rails. [Para, Type = Important, ID = Par41]

*Vui lòng sửa đổi thời gian được sử dụng trong các ví dụ phù hợp với các ví dụ của riêng bạn hoàn cảnh.*

Thay đổi một chút method show trong controller:
```Ruby
# app/controllers/companies_controller.rb

# GET /companies/1
# GET /companies/1.json

def show
 fresh_when last_modified: @company.updated_at
end
```

Sau khi khởi động lại ứng dụng Rails, hãy nhìn vào HTTP header của http://localhost:3000/companies/1, như sau:

```
$ curl -I http://localhost:3000/companies/1
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Last-Modified: Sat, 27 Jan 2018 18:38:05 GMT
[…]
```

Mục `Last-Modified` trong HTTP header được tạo bởi `fresh_when` trong controller. Nếu sau đó bạn truy cập vào cùng một trang web và chỉ định thời gian này, sau đó bạn không nhận được trang web trở lại; bạn nhận được tin "304 Not Modified", như được hiển thị ở đây:

```
$ curl -I http://localhost:3000/companies/1 — header
‘If-Modified-Since: Sat, 27 Jan 2018 18:38:05 GMT’
HTTP/1.1 304 Not Modified
[…]
```

Trong Rails log, bạn sẽ thấy:

```
Started HEAD “/companies/1” for 127.0.0.1 at 2018–01–27 18:24:21 +0100
Processing by CompaniesController#show as */*
 Parameters: {“id”=>”1"}
 Company Load (0.1ms) SELECT “companies”.* FROM “companies” WHERE
“companies”.”id” = ? LIMIT ? [[“id”, 1], [“LIMIT”, 1]]
Completed 304 Not Modified in 2ms (ActiveRecord: 0.1ms)
```

Chỉ cần 2ms trên máy của tôi để trả lời yêu cầu này, so với 51ms của biến thể chuẩn. Điều này nhanh hơn nhiều! Vì vậy, bạn đã sử dụng ít tài nguyên hơn trên máy chủ và lưu một lượng lớn băng thông. Người dùng sẽ có thể xem trang nhanh hơn rất nhiều.

## etag

Đôi khi trường update_at của một object cụ thể không có ý nghĩa một mình. Ví dụ: nếu bạn có trang web nơi người dùng có thể đăng nhập và trang này sau đó tạo nội dung trang web dựa trên một role model, nó có thể xảy ra mà người dùng A là quản trị viên có thể thấy link Update, còn người dùng dùng B (tài khoản thường)thì không. Trong trường hợp như vậy, tiêu đề Last-Modified được giải thích trước đó không giúp ích gì. Trên thực tế, nó sẽ làm hại.

Trong những trường hợp này, bạn có thể sử dụng tiêu đề etag. Etag được tạo ra bởi máy chủ web và được phân phối khi trang web được truy cập lần đầu tiên. Nếu người dùng truy cập lại cùng một URL, trình duyệt sau đó có thể kiểm tra xem trang web tương ứng đã thay đổi hay chưa bằng cách gửi truy vấn `If-None-Match` tới server.

Thay đổi method `index` và `show` trong controller như sau:
```Ruby
# app/controllers/companies_controller.rb

# GET /companies
# GET /companies.json
def index
 @companies = Company.all
 fresh_when etag: @companies
end

# GET /companies/1
# GET /companies/1.json
def show
 fresh_when etag: @company
end
```

Một tính năng đặc biệt của Rails được đưa vào sử dụng cho etag: Rails tự động đặt một mã thông báo CSRF mới cho mỗi khách truy cập mới của trang web. Điều này ngăn chặn các cuộc tấn công giả mạo yêu cầu [cross-site](http://wikipedia.org/wiki/Cross_site_request_forgery). Nhưng nó cũng có nghĩa là mỗi người dùng mới của một trang web sẽ nhận được một thẻ mới cho cùng một trang. Để đảm bảo rằng cùng một người dùng cũng nhận được mã thông báo CSRF giống hệt nhau, chúng được lưu trữ trong cookie của trình duyệt web và được gửi lại server mỗi khi trang web được truy cập. Bạn phải nói với curl rằng bạn muốn lưu tất cả cookie trong một tệp và truyền các cookie này sau nếu nhận được yêu cầu.

Để lưu, bạn sử dụng tham số -c cookies.txt.

```
$ curl -I http://localhost:3000/companies -c cookies.txt
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
ETag: W/”53830a75ef520df8ad8e1894cf1e5003"
 […]
```

Với tham số -b cookies.txt, curl gửi các cookie này đến server khi có request. Bây giờ bạn nhận được cùng một etag cho hai request tiếp theo.

```
$ curl -I http://localhost:3000/companies -b cookies.txt
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
ETag: W/”53830a75ef520df8ad8e1894cf1e5003"
[…]

$ curl -I http://localhost:3000/companies -b cookies.txt
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-Xss-Protection: 1; mode=block
X-Content-Type-Options: nosniff
ETag: W/”53830a75ef520df8ad8e1894cf1e5003"
[…]
```

Bây giờ bạn sử dụng etag này để tìm hiểu trong request với `If-None-Match` nếu session bạn đã lưu trong cache vẫn được cập nhật.

```
$ curl -I http://localhost:3000/companies -b cookies.txt — header
‘If-None-Match: W/”53830a75ef520df8ad8e1894cf1e5003"’
HTTP/1.1 304 Not Modified
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
ETag: W/”53830a75ef520df8ad8e1894cf1e5003"
[…]
```

Bạn nhận được 304 Not Modified response. Hãy xem log của Rails.

```
Started HEAD “/companies” for 127.0.0.1 at 2018–01–27 18:36:25 +0100
Processing by CompaniesController#index as */*
 (0.2ms) SELECT COUNT(*) AS “size”, MAX(“companies”.”updated_at”) AS
timestamp FROM “companies”
Completed 304 Not Modified in 24ms (ActiveRecord: 0.2ms)
```

Rails chỉ mất 24ms trên máy để xử lý request. Thêm vào đó, bạn đã lưu lại băng thông. Người dùng sẽ hài lòng với ứng dụng web tốc độ cao.

Tìm thêm thông tin chung về tiêu đề etag tại [đây.](https://en.wikipedia.org/wiki/HTTP_ETag)

## current_user và các tham số khác

Là cơ sở để tạo ra một etag, bạn có thể vượt qua không chỉ một đối tượng mà còn là một mảng các đối tượng. Bằng cách này, bạn có thể giải quyết vấn đề với người dùng đã đăng nhập có thể nhận nội dung khác với người dùng không đăng nhập. Giả sử rằng một người dùng đã đăng nhập là đầu ra với phương thức current_user.

Bạn phải thêm etag {current_user.try: id} vào app/controllers/application_controller.rb để chắc chắn rằng tất cả các etags trong ứng dụng bao gồm giá trị current_user.id, không có gì nếu không có ai đăng nhập

```Ruby
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
 etag { current_user.try :id }
end
```

Bạn cũng có thể nối các đối tượng khác trong mảng này và sử dụng cách tiếp cận này xác định khi một trang không thay đổi.

## The Magic of touch

Điều gì sẽ xảy ra nếu một object employee được chỉnh sửa hoặc xóa? Sau đó, view ở show và index cũng sẽ phải thay đổi. Chúng ta sẽ thêm vào model như sau:

```Ruby
# app/models/employee.rb

belongs_to :company, touch: true
```

Mỗi khi một object của model `Employee` được lưu ở dạng đã chỉnh sửa và `touch: true` được sử dụng, ActiveRecord sẽ cập nhật đối tượng Company tương ứng trong database. Trường `updated_at` được đặt thành hiện tại thời gian. Nói cách khác, nó là "touched".

Cách tiếp cận này đảm bảo rằng nội dung chính xác được phân phối.

## stale?

Cho đến bây giờ, tôi đã giả định rằng chỉ các trang HTML đang được phân phối. Vì thế, Tôi đã cho thấy cách sử dụng `fresh_when` và sau đó làm mà không có `respond_to do` | `format` | `block`. Nhưng HTTP caching không bị giới hạn ở các trang HTML. Chuyện gi xảy ra nếu bạn cũng muốn trả về JSON, và muốn phân phối nó qua HTTP caching? Bạn cần sử dụng method `stale?`. Sử dụng `stale?` tương tự như sử dụng method fresh_when. 

```Ruby
# app/controllers/companies_controller.rb

def show
 if stale? @company
   respond_to do |format|
     format.html
     format.json { render json: @company }
   end
 end
end
```

## Sử dụng Proxies (public)

Tôi cũng đã giả sử bạn đang sử dụng cache trên trình duyệt web. Nhưng trên Internet, có nhiều proxy gần gũi hơn với người dùng và do đó có thể hữu ích cho caching trong trường hợp các trang không được cá nhân hóa. Nếu ví dụ là điện thoại có thể truy cập cuốn sách, sau đó bạn có thể kích hoạt các dịch vụ miễn phí của proxy với thông số `public: true` trong `fresh_when` hoặc với `stale?`.

```Ruby
# app/controllers/companies_controller.rb

# GET /companies/1
# GET /companies/1.json
def show
 fresh_when @company, public: true
end
```

```
$ curl -I http://localhost:3000/companies/1
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
ETag: W/”f37a06dbe0ee1b4a2aee85c1c326b737"
Last-Modified: Sat, 27 Jan 2018 17:16:53 GMT
Content-Type: text/html; charset=utf-8
Cache-Control: public
[…]
```

`Header Cache-Control: public` cho tất cả các proxy rằng họ cũng có thể cache trang web này

Sử dụng proxy luôn phải được thực hiện với sự thận trọng tuyệt đối. Một mặt, chúng rất phù hợp để cung cấp trang web của riêng bạn một cách nhanh chóng hơn cho người dùng, nhưng mặt khác, bạn phải hoàn toàn chắc chắn rằng không có trang được cá nhân hóa được lưu trữ trên proxy công cộng. Ví dụ: CSRF tags và flash messages không bao giờ kết thúc bằng public proxy. Đối CSRF tags, bạn nên tạo đầu ra của csrf_meta_tag trong app/views/layouts/application.html.erb mặc định phụ thuộc vào đặt câu hỏi liệu trang có thể được lưu vào bộ nhớ cache công khai hay không, như được hiển thị ở đây:

```
<%= csrf_meta_tag unless response.cache_control[:public] %>
```

## Cache-Control with Time Limit

Khi sử dụng `etag` và `Last-Modified`, bạn có thể giả định rằng trình duyệt web chắc chắn sẽ kiểm tra một lần nữa với máy chủ web nếu phiên bản được lưu trong cache là như nhau. Đây là một cách tiếp cận rất an toàn.

Nhưng có thể thực hiện tối ưu hóa thêm một bước bằng cách dự đoán tương lai: nếu bạn đã chắc chắn khi phân phối trang mà trang này sẽ không thay đổi trong một khoảng thời gian (hai phút, giờ hoặc ngày tiếp theo), bạn có thể thông báo với trình duyệt. Sau đó, nó không cần phải kiểm tra lại một lần nữa trong khoảng thời gian đã chỉ định này. Tiết kiệm trên không có lợi thế, đặc biệt là với các trình duyệt web di động có độ trễ tương đối cao. Ngoài ra, bạn lưu tải trên máy chủ trên máy chủ web.

Trong output của HTTP header, bạn có thể đã nhận thấy dòng tương ứng trong các ví dụ `etag` và `Last-Modified`

```
Cache-Control: max-age=0, private, must-revalidate
```

Mục phải xác thực lại cho trình duyệt web biết rằng chắc chắn kiểm tra lại với server để xem liệu một trang web có thay đổi trong thời gian chờ đợi. Tham số thứ hai - `private` - có nghĩa là chỉ trình duyệt web được phép lưu trang này. Bất kỳ proxy nào trên đường không được phép lưu vào bộ nhớ cache trang này.

Nếu bạn quyết định trang web sẽ không thay đổi trong ít nhất hai phút, thì bạn có thể mở rộng code ví dụ bằng cách thêm phương thức `expires_in`. 
```Ruby
# app/controllers/companies_controller.rb

# GET /companies/1
# GET /companies/1.json
def show
 expires_in 2.minutes
 fresh_when @company, public: true
end
```

Bây giờ bạn sẽ nhận được một thông tin kiểm soát cache khác nhau để đáp ứng request.

```
$ curl -I http://localhost:3000/companies/1
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Date: Sat, 27 Jan 2018 17:58:56 GMT
ETag: W/”f37a06dbe0ee1b4a2aee85c1c326b737"
Last-Modified: Sat, 27 Jan 2018 17:16:53 GMT
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=120, public
[…]
```

Hai phút được chỉ định bằng giây (max-age = 120) và bạn không còn cần phải xác thực lại. Vì vậy, trong 120 giây tiếp theo, trình duyệt web không cần phải kiểm tra lại với server để xem liệu nội dung của trang này có thay đổi hay không.

Cơ chế này cũng được sử dụng bởi `asset pipeline`. Assets được tạo ở đó trong môi trường Production có thể được xác định rõ ràng bằng tổng kiểm tra trong tên tệp và có thể được lưu trong một thời gian dài cả trong trình duyệt web và trong các proxy công cộng. Đó là lý do tại sao bạn có phần sau trong file cấu hình Nginx:

```
location ^~ /assets/ {
 gzip_static on;
 expires max;
 add_header Cache-Control public;
}
```

# Fragment Caching (cache phân mảnh)

Với Fragment Caching, bạn có thể lưu vào từng thành phần riêng lẻ của view. Bạn có thể sử dụng nó một cách an toàn kết hợp với HTTP caching và page caching.
Việc này sẽ giảm tải cho server và tăng hiệu suất, có nghĩa là tăng khả năng sử dụng.

## Bật Fragment Caching ở môi trường Development 

Fragment Caching mặc định sẽ tắt trong môi trường development. Bạn có thể kích hoạt nó bằng lệnh rails dev: cache, tệp tmp/caching-dev.txt.

```
$ rails dev:cache
Development mode is now being cached.
```

Để hủy kích hoạt cahce, hãy chạy lại lệnh tương tự (thao tác này sẽ xóa tệp tmp/caching-dev.txt)

Ở môi trường production, Fragment caching được bật mặc định

## Cache lại cả table 
Ở trang http://localhost:3000/companies, một bảng danh sách tất cả các công ty được hiển thị. Bạn có thể cache toàn bộ bảng này. Để làm được bạn chỉ cần cache lại cả bảng đó bằng cách đặt trong một block như sau

```
<% cache("name_of_cache") do %>
[…]
<% end %>
```

Chỉnh sửa lại view một chút

```
# app/views/companies/index.html.erb

<h1>Companies</h1>
<% cache(‘table_of_all_companies’) do %>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Number of employees</th>
        <th colspan=”3"></th>
      </tr>
    </thead>
    <tbody>
      <% @companies.each do |company| %>
        <tr>
          <td><%= company.name %></td>
          <td><%= company.employees.count %></td>
          <td><%= link_to ‘Show’, company %></td>
          <td><%= link_to ‘Edit’, edit_company_path(company) %></td>
          <td><%= link_to ‘Destroy’, company, method: :delete, data: {confirm: ‘Are you sure?’ } %></td>
       </tr>
     <% end %>
   </tbody>
  </table>
<% end %>
<br />
<%= link_to ‘New Company’, new_company_path %>
```

Sau đó, bạn có thể khởi động máy chủ Rails với máy chủ rails và đi đến URL http://localhost:3000/companies.

Lần đầu tiên, một trang có bộ nhớ cache phân mảnh chậm hơn một chút vì bộ nhớ cache phải được ghi. Lần thứ hai nó nhanh hơn rất nhiều.

## Xóa Fragment Cache

Với phương thức `expire_fragment`, bạn có thể xóa cache cụ thể. Về cơ bản, bạn có thể xây dựng ý tưởng này trong model theo cách tương tự như được hiển thị trong phần “Xóa bộ đệm trang một cách tự động” (sẽ trinh bày ở phần 2).

```Ruby
# app/models/company.rb

class Company < ActiveRecord::Base
 validates :name, presence: true, uniqueness: true
 
 has_many :employees, dependent: :destroy
 
 after_create :expire_cache
 after_update :expire_cache
 before_destroy :expire_cache
 
 def to_s
   name
 end
 
 def expire_cache
   ActionController::Base.new.expire_fragment(‘table_of_all_companies’)
 end
end
```

Vì số lượng nhân viên cũng có liên quan, bạn cũng phải mở rộng `app/models/employees.rb` cho phù hợp

```Ruby
# app/models/employees.rb

class Employee < ActiveRecord::Base
 belongs_to :company, touch: true
 
 validates :first_name, presence: true
 validates :last_name, presence: true
 validates :company, presence: true
 
 after_create :expire_cache
 after_update :expire_cache
 before_destroy :expire_cache
 
 def to_s
   “#{first_name} #{last_name}”
 end
 
 def expire_cache
   ActionController::Base.new.expire_fragment(‘table_of_all_companies’)
 end
end
```

Xóa fragment caches cụ thể cần phải rất cẩn thận. Đầu tiên, bạn thường bỏ lỡ mọi thứ; thứ hai, trong các dự án lớn, không dễ dàng theo dõi tất cả các tên bộ nhớ cache khác nhau. Thường thì sẽ dễ dàng hơn khi tự động tạo tên thông qua phương thức `cache_key`. Sau đó hết hạn tự động trong bộ nhớ cache.


Nội dung hôm nay tôi đã giới thiệu tới mọi người cơ bản về việc cài đặt và sử dụng Fragment Cache trong Rails. Ở phần 2 của bài viết tôi sẽ trình bày nhiều hơn về việc mở rộng cũng như nhưng tính năng cao hơn của Fragment Cache.