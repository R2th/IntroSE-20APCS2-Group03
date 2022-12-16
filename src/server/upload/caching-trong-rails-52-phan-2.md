Ở nội dung [phần trước](https://viblo.asia/p/caching-trong-rails-52-naQZRAd0Kvx) mình đã đề cập tới sử dựng  Fragment Cache trong Rails. Ở phần 2 của bài viết mình sẽ trình bày nhiều hơn về việc mở rộng cũng như nhưng tính năng cao hơn của Fragment Cache.

# Auto-expiring Caches

Quản lý fragment caching khá phức tạp với quy ước đặt tên được sử dụng trong phần [này](https://viblo.asia/p/caching-trong-rails-52-naQZRAd0Kvx#_cache-lai-ca-table-15). Một mặt, bạn có thể chắc chắn rằng cache không có bất kỳ bản ballast thừa nào nếu bạn đã lập trình gọn gàng, nhưng mặt khác, nó không thực sự quan trọng. Cache được cấu trúc theo cách nó xóa các phần tử cũ và không còn cần thiết. Nếu bạn sử dụng một cơ chế cung cấp cho một fragment caching một tên duy nhất, như trong asset pipeline, sau đó bạn sẽ không gặp phải những rắc rối khi xóa fragment cache.

Rails có hỗ trợ việc này và khá dễ dàng để làm.

```
# app/views/companies/index.html.erb 

<h1>Companies</h1>
<% cache(@companies) do %>
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
          <td><%= link_to ‘Destroy’, company, method: :delete, data: {confirm: ‘Are you sure?’} %></td>
        </tr>
      <% end %>
    </tbody>
  </table>
<% end %>

<br />

<%= link_to ‘New Company’, new_company_path %>
```

Bạn yêu cầu Rails tạo cache key cho @companies và sử dụng nó. Nếu bạn muốn xem tên của cache key đó trong log, bạn phải thêm `config.action_controller.enable_fragment_cache_logging = true` vào file `config/environments/development.rb`.

Không có câu trả lời chung cho câu hỏi về chi tiết bạn sử dụng bao nhiêu cho fragment cache. Cách duy nhất là thực hành và check log để xem mất bao lâu.

# Russian Doll Caching

Trong ví dụ trước, bạn đã tạo một bộ nhớ cache phân đoạn cho toàn bộ bảng công ty. Nếu một công ty trong bảng đó thay đổi, toàn bộ bảng phải được trả lại. Tùy thuộc vào loại dữ liệu, có thể mất nhiều thời gian.

Ý tưởng về `Russian Doll Caching` là bạn lưu trữ không chỉ toàn bộ bảng mà còn từng hàng của bảng. Vì vậy, khi một hàng thay đổi, chỉ cần hàng này phải được hiển thị; tất cả các hàng khác có thể được tìm nạp từ bộ nhớ cache. Khi làm tốt, điều này có thể tiết kiệm rất nhiều tài nguyên.

```
# app/views/companies/index.html.erb

<h1>Companies</h1>
<% cache(@companies) do %>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Number of employees</th>
        <th colspan="3"></th>
      </tr>
    </thead>
    <tbody>
      <% @companies.each do |company| %>
        <% cache(company) do %>
          <tr>
            <td><%= company.name %></td>
            <td><%= company.employees.count %></td>
            <td><%= link_to "Show", company %></td>
            <td><%= link_to "Edit", edit_company_path(company) %></td>
            <td><%= link_to "Destroy", company, method: :delete, data: {confirm: "Are you sure?"} %></td>
          </tr>
        <% end %>
      <% end %>
    </tbody>
  </table>
<% end %>

<br />

<%= link_to "New Company", new_company_path %>
```

Rails theo dõi tổng MD5 của views. Vì vậy, nếu bạn thay đổi file (ví dụ: app/views/companies/index.html.erb), MD5 thay đổi và tất cả cache cũ sẽ hết hạn.

# Cache Store

Cache store quản lý các fragment caches. Mặc định sẽ là Rails MemoryStore. Cache store này rất tốt cho việc phát triển nhưng ít phù hợp hơn với môi trường production vì nó hoạt động độc lập cho mỗi process Vì vậy, nếu bạn có nhiều process hoạt động song song trong môi trường production, mỗi process sẽ giữ MemoryStore của riêng mình.

## MemCacheStore
Hầu hết các ứng dụng Rails sử dụng [memcached](http://memcached.org/) trên môi trường production. Để sử dụng memcached chúng ta chỉ cần thiết lập như sau.

```
# config/environments/production.rb

config.cache_store = :mem_cache_store
```

Sự kết hợp của caches tự động hết hạn sử dụng và memcached là một công thức tuyệt vời cho một trang web thành công.

## Các Cache stores khác

Trong document của Rails, bạn sẽ tìm thấy danh sách các [cache store khác nhau](http://guides.rubyonrails.org/caching_with_rails.html#cache-stores). 

# Page Caching

Page caching đã bị xóa khỏi core của Rails 4.0, nhưng nó vẫn có sẵn như một gem và nó rất mạnh. Để thực hiện page caching, bạn cần một chút kiến thức về cấu hình web server (ví dụ: Nginx hoặc Apache). Page caching không dành cho những người mới học.

Page caching, là tất cả về việc đặt một trang HTML hoàn chỉnh (nói cách khác, kết quả render của một views) vào một thư mục con của thư mục `public` và nó được gửi trực tiếp từ đó bởi web server (ví dụ, Nginx) bất cứ khi nào trang web được truy cập tiếp theo. Ngoài ra, bạn cũng có thể lưu phiên bản .gz đã nén của trang HTML tại đó. Một web server production sẽ tự động phân phối các file và cũng có thể được cấu hình để mọi tệp .gz hiện tại được gửi trực tiếp.

Trong 1 view phức tạp, có thể mất 500ms hoặc thậm chí nhiều hơn để hiển thị; thời gian tiết kiệm được sẽ là rất đáng kể. Bạn cần tiết kiệm tài nguyên server có giá trị và có thể phục vụ nhiều user truy cập hơn với cùng một phần cứng. Lợi nhuận của user từ việc phân phối trang web nhanh hơn.

Khi lập trình ứng dụng Rails của bạn, hãy đảm bảo rằng bạn cũng cập nhật trang này hoặc xóa nó! Bạn sẽ tìm thấy một mô tả về cách thực hiện điều này trong phần “Xóa Page Caches Tự động.” Nếu không, bạn sẽ kết thúc với bộ nhớ cache đã lỗi thời sau này.

Ngoài ra, hãy đảm bảo rằng page caching từ chối tất cả thông số URL theo mặc định. Ví dụ: nếu bạn cố gắng truy cập: http://localhost:3000/companies?Search=abc, điều này sẽ tự động trở thành http://localhost:3000/companies. Nhưng điều đó có thể dễ dàng được sửa với logic routes khác nhau.

Hãy cài đặt một ứng dụng mới và thêm gem sau trong Gemfile:

```
# Gemfile 

gem "actionpack-page_caching"
```

Cuối cùng, bạn phải thông báo cho Rails nơi lưu trữ các tệp bộ nhớ cache. 
```
# config/application.rb

config.action_controller.page_cache_directory = "#{Rails.root.to_s}/public/deploy"
```

# Bật Page Caching trong môi trường development
```
# config/environments/development.rb

config.action_controller.perform_caching = true
```

Nếu không, page caching sẽ không được bật ở môi trường development. Ở môi trường production, page caching tự động được bật.

# Configure Web Server

Bạn cần phải báo cho web server (Nginx hoặc Apache) kiểm trả trong thư mục public/deploy trước khi call tới Rails application. Bạn phải cấu hình để nhận được file .gz nếu có.

Không có cách nào hoàn hảo để làm điều đó. Bạn phải tìm cách tốt nhất để làm điều đó trong môi trường.

Là một hack nhanh chóng và dơ bẩn trong development, bạn có thể đặt page_cache_directory để public. 

```Ruby
config.action_controller.page_cache_directory = "#{Rails.root.to_s}/public"
```

# Caching company views

Bật page caching trong controller. Nếu bạn muốn cache view cho companies, hãy thay đổi như sau:

```
# app/controllers/companies_contrloller.rb

class CompaniesController < ApplicationController
 caches_page :show
 
 [...]
end
```

Trước khi mở ứng dụng cấu trúc thư mục `public` như sau:

```
public/
+ — 404.html
+ — 422.html
+ — 500.html
+ — apple-touch-icon-precomposed.png
+ — apple-touch-icon.png
+ — favicon.ico
+ — robots.txt
```

Sau khi mở ứng dụng và chuyển tới 2 trang là http://localhost:3000/companies và http://localhost:3000/companies/1 thư mục `public` sẽ như sau:
```
public
+ — 404.html
+ — 422.html
+ — 500.html
+ — apple-touch-icon-precomposed.png
+ — apple-touch-icon.png
+ — deploy
| + — companies
| + — 1.html
+ — favicon.ico
+ — robots.txt
```

File public/deploy/companies/1.html được tạo bởi page caching.

Từ giờ, khi truy cập trang thì ứng dụng sẽ chỉ lấy từ trong cache ra.

# gz Versions

Nếu bạn sử dụng page caching, bạn nên lưu vào cache các file .gz được nén trực tiếp. Có thể thực hiện điều này thông qua tùy chọn `gzip: true`

```
# app/controllers/companies_controller.rb

class CompaniesController < ApplicationController
 caches_page :show, gzip: true
 
 [...]
end
```

Thao tác này sẽ tự động lưu phiên bản nén và không nén phiên bản của từng page caching

```
public
+ — 404.html
+ — 422.html
+ — 500.html
+ — apple-touch-icon-precomposed.png
+ — apple-touch-icon.png
+ — deploy
| + — companies
| + — 1.html
| + — 1.html.gz
+ — favicon.ico
+ — robots.txt
```

# Phần mở rộng .html

Khi truy cập trang http://localhost:3000/companies , Rails sẽ lưu lại dưới dạng file `companies.html`. Vì vậy, web server sẽ tìm và phân phối file html nếu bạn truy cập http://localhost:3000/companies.html, thay vì cố truy cập http://localhost:3000/companies vì phần mở rộng .html ở cuối URL bị thiếu.

Nếu bạn đang sử dụng Nginx server, cách dễ nhất để làm điều này là điều chỉnh lệnh try_files trong tệp cấu hình Nginx như sau:

```
try_files $uri/index.html $uri $uri.html @unicorn;
```

Nginx sau đó kiểm tra xem file có phần mở rộng .html của hiện tại URL truy cập tồn tại.

# Tự động xóa Page Caches

Ngay khi dữ liệu được sử dụng trong views thay đổi, các file cache đã lưu phải bị xóa. Nếu không, trang web của bạn sẽ hiển thị lại thông tin cũ trước đó.

Theo tài liệu chính thức của Rails, giải pháp cho vấn đề này là class **ActionController::Caching::Sweeper**. Nhưng cách tiếp cận này, được mô tả tại http://guides.rubyonrails.org/caching_with_rails.html#sweepers, có một bất lợi lớn: `nó bị giới hạn trong các action xảy ra trong controller`. Vì vậy, nếu một action được kích hoạt thông qua URL của trình duyệt web, cache tương ứng cũng bị thay đổi hoặc bị xóa. Nhưng nếu một đối tượng bị xóa trong console, **sweeper** sẽ không nhận ra điều này. Vì vậy, tôi sẽ chỉ cho bạn một cách tiếp cận không sử dụng **sweeper** nhưng làm việc trực tiếp trong model với các ActiveRecord callback.

Ở ứng dụng phone book, khi cập company chúng ta sẽ luôn luôn phải xóa cache cho http://localhost:3000/companies và http://localhost:3000/companies/:company_id. Bên cạnh đó khi cập nhật employee, bạn cũng cần phải xóa cache tương ứng liên quan tới employee đó. 

## Model

Bạn vẫn cần phải sửa các model sao cho các cache tương ứng được xóa tự động ngay sau khi một đối tượng được tạo, chỉnh sửa hoặc xóa, như được hiển thị

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
   ActionController::Base.expire_page(Rails.application.routes.url_helpers.company_path(self))
   ActionController::Base.expire_page(Rails.application.routes.url_helpers.companies_path)
 end
end
```

```Ruby
# app/models/employee.rb

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
   ActionController::Base.expire_page(Rails.application.routes.url_helpers.employee_path(self))
   ActionController::Base.expire_page(Rails.application.routes.url_helpers.employees_path)
   self.company.expire_cache
 end
end
```

## Chuẩn bị sẵn cache

Bây giờ bạn đã đọc qua chương này, đây là một mẹo cuối cùng: **preheat cache**!

Ví dụ, nếu bạn có một ứng dụng web trong một công ty và bạn biết rằng lúc 9 giờ sáng, tất cả nhân viên sẽ đăng nhập và sau đó truy cập ứng dụng web này, thì tốt nhất là hãy để máy chủ web request tất cả các views trước đó 1 vài giờ thông qua cronjob. Vào ban đêm, có thể máy chủ của bạn sẽ không làm gì cả.

Kiểm tra các behavior patterns của user. Với các trang web công khai, điều này có thể được thực hiện, ví dụ: thông qua Google Analytics (www.google.com/analytics/). Bạn sẽ thấy rằng vào những thời điểm nhất định trong ngày, có nhiều lưu lượng truy cập hơn. Nếu bạn có một giai đoạn yên tĩnh trước đó, bạn có thể sử dụng nó để làm ấm cache.

Mục đích của việc này là để tiết kiệm tài nguyên server và đạt được chất lượng tốt hơn cho user vì trang web được hiển thị nhanh hơn.

# Đọc thêm
Nguồn thông tin tốt nhất về chủ đề này nằm trong [tài liệu của Rails](http://guides.rubyonrails.org/caching_with_rails.html). Ở đó, bạn có thể tìm thêm thông tin (ví dụ: low-level caching).

Rất cảm ơn các bạn đã theo dõi. Bài viết được dịch từ [đây](https://medium.com/rubyinside/https-medium-com-wintermeyer-caching-in-ruby-on-rails-5-2-d72e1ddf848c).