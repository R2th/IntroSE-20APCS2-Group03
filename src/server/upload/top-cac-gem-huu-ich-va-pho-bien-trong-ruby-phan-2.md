Link phần 1: https://viblo.asia/p/top-cac-gem-huu-ich-va-pho-bien-trong-ruby-phan-1-Qpmle2y95rd
### Upload file
Thỉnh thoảng, chúng ta cần xây dựng một website cho phép người dùng tải lên các tệp đính kèm, như là tài liệu hay ảnh. Để đảm bảo tính năng này dễ sử dụng và thân thiện với người dùng hết sức có thể, chúng ta có thể sử dụng một vài thư viện sau.
* [Carrierwave](https://github.com/carrierwaveuploader/carrierwave) là giải pháp đơn giản và cực kì linh hoạt để upload file cho Rails, Sinatra và các framework khác của Ruby. Nó cung cấp cho bạn `store` để lưu trữ vĩnh viễn, `cache` để lưu trữ tạm thời, bạn có thể sử dụng nhiều `store` khác nhau, cả lưu trong máy và trên cloud.  Nếu mà bạn muốn quản lý nhiều version của ảnh, như kiểu ảnh gốc và ảnh thumbnail thì gem này cũng hỗ trợ, tuy nhiên phải cài thêm Imagemagick và MiniMagick để resize ảnh. Ngoài ra, Carrierwave làm việc với AWS S3, vì vậy nó rất phù hợp dùng với gem [Fog](https://github.com/fog/fog), giúp tích hợp nhiều cloud server, bao gồm cả Rackspace Server và Brightbox.
* [CarrierWave Backgrounder](https://github.com/lardawge/carrierwave_backgrounder) dùng với Carrierwave. Nó cho phép dời cái quá trình xử lý và nén ảnh thành một tiến trình chạy ngầm. Hiện tại, nó hỗ trợ cho Delayed Job, Resque, Sidekiq, SuckerPunch, Girl Friday, Qu, và Queue Classic.
* [MiniMagick](https://github.com/minimagick/minimagick) vừa được nhắc đến ở trên, dùng để resize, xoay, đổi format ảnh,... như một sự thay thế nhỏ gọn hơn cho RMagick. Nó cho giúp giảm dung lượng bộ nhớ để xử lý. Nó cho phép bạn truy cập vào tất cả các tùy chọn dòng lệnh ImageMagick có. Cách hoạt động của nó sẽ là tạo một bản sao từ ảnh chúng ta truyền vào, sửa nó và lưu lại thành 1 file mới, mà ko ảnh hưởng đến bản gốc.
### Search
Trong một vài project, khi lượng thông tin trở nên quá lớn, việc tìm kiếm dữ liệu sẽ trở nên khó khăn hơn. Để việc tìm kiếm với các options trở nên thân thiện hơn, chúng ta có thể sử dụng gem sau:
* [Elasticsearch](https://github.com/elastic/elasticsearch-ruby) là hệ thống tìm kiếm được sử dụng rộng rãi trong các doanh nghiệp. Gem này tích hợp ElasticSearch vào ứng dụng Rails với đầy đủ tính năng, bao gồm cả full-text search. Cụ thể thì cũng có nhiều bài giải thích và hướng dẫn sử dụng ElasticSearch rồi nên mình sẽ ko nói nữa, mọi người có thể tự google để tìm hiểu.
### Admin panels
Xây dựng một trang web lớn thường phải quản lý một lượng lớn dữ liệu. Các tiện ích sau đây sẽ giúp chúng ta quản trị cơ sở dữ liệu toàn diện hơn.
* [Activeadmin](https://github.com/activeadmin/activeadmin): Plugin này giúp bạn dễ dàng tạo ra các giao diện trang admin đẹp mắt và tùy chỉnh nó

![](https://images.viblo.asia/4fd747e4-fe6d-49fe-a968-091a9428f140.png)

* [Administrate](https://github.com/thoughtbot/administrate): tương tự như Activeadmin, nhưng đơn giản hơn, chỉ để quản lý dữ liệu, thêm, sửa, xóa

![](https://images.viblo.asia/a8a965ad-15fe-4d30-84b2-2a61ddaf80bf.png)

### Một số gem khác
Bonus thêm một số gem mà bạn có thể thấy thú vị, theo trình tự phổ biến trên github
* [Sidekiq](https://github.com/mperham/sidekiq) là một công cụ đơn giản và hiệu quả của Ruby để chạy các luồng xử lý ngầm. Nó áp dụng các luồng để xử lý nhiều công việc cùng một lúc trong một quy trình. Tuy Sidekiq không bắt buộc dùng với Rails, nhưng khi kết hợp với Rails thì việc xử lý trở nên đơn giản hơn bao giờ hết. Sidekiq còn tương thích với Resque, nó có định dạng message giống nhau, nên có thể tích hợp sử dụng cả 2 cùng lúc.
* [Simple_form](https://github.com/plataformatec/simple_form) như tên gọi, giúp cho việc tạo form trong Ruby dễ dàng hơn mà không làm ảnh hưởng đến bố cục. Ví dụ như tạo một form đăng nhập:
```

```
* [Friendly_Id](https://github.com/norman/friendly_id) là một công cụ tuyệt vời để giúp URL trở nên thân thiện hơn, cụ thể là nó sẽ thay thế con số id vô nghĩa thành một chuỗi kí tự có nghĩa nào đó, như kiểu
```
# without FriendlyId
http://example.com/states/4323454

# with FriendlyId
http://example.com/states/washington
```
cách dùng thì cũng rất là đơn giản, ví dụ muốn thay id thành tên của user, thì trong model thêm dòng:
```
class User < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
end
```
sau đó trong controller, khi muốn tìm user đó, thì thay vì dùng `User.find(id)` ta dùng `User.friendly.find(id)` thì URL của nó sẽ thành http://localhost:3000/users/name. Kể cả khi tìm kiếm, thay vì truyền id vào, ta cũng có thể truyền `name` vào: `User.friendly.find("name")`.
* [Dotenv-rails](https://github.com/bkeepers/dotenv) là gem dùng để load các biến môi trường từ file .env có thể nằm bên ngoài thư mục dự án, bằng cách này, chúng ta có thể thay đổi thông tin giữa các môi trường deploy và giữ được những thông tin cần đảm bảo bí mật như key để đăng nhập với service bên ngoài. 
* [Slim](https://github.com/slim-template/slim) là một template về ngôn ngữ, giúp giảm thiểu các cú pháp không quá cần thiết mà vẫn không khiến code trở nên khó hiểu. Dễ thấy nhất là nó sẽ bỏ đi các thẻ đóng, thêm các cú pháp viết tắt, như kiểu thay vì viết `<div id="a">` thì chỉ cần viết `#a`, ngoài ra còn có thêm nhiều cái hay ho nữa, mọi người đọc gem để biết thêm nhé. Có thể lúc đầu sẽ hơi khó dùng 1 chút, nhưng đến lúc dùng quen rồi thì thích kinh khủng luôn, nhanh hơn viết code HTML thuần rất nhiều. 
* [Redis](https://github.com/redis/redis-rb) là thư viện mã nguồn mở Ruby-client. Để hiểu hơn về Redis thì mình thấy bài này viết khá chi tiết, mọi người có thể đọc thêm để hiểu: https://viblo.asia/p/gioi-thieu-ve-redis-su-dung-rails-model-caching-voi-redis-RQqKLYvzZ7z
* [Annotate](https://github.com/ctran/annotate_models) đơn giản hóa công việc với các model của Rails. Nó sẽ thêm 1 đoạn comment về các thuộc tính của bảng của model đó. Kiểu như:
```
# == Schema Info
#
# Table name: line_items
#
#  id                  :integer(11)    not null, primary key
#  quantity            :integer(11)    not null
#  product_id          :integer(11)    not null
#  unit_price          :float
#  order_id            :integer(11)
#

 class LineItem < ActiveRecord::Base
   belongs_to :product
  . . .
```
Tính năng này sẽ giúp code đơn giản hơn, vì khi có quá nhiều bảng và quá nhiều thuộc tính, không phải lúc nào ta cũng nhớ được hết các thuộc tính của bảng. Mỗi khi có sự thay đổi thêm bớt thuộc tính nó cũng sẽ tự động update lại đoạn comment trên.
* [Pg_search](https://github.com/Casecommons/pg_search)  là một giải pháp thay thế khá tốt cho ElasticSearch khi làm việc với PostgreSQL. Nó hỗ trợ 2 cách tìm kiếm là multi-search và search scopes. Multi-search là khi mà ta muốn tìm trên nhiều Active Record, ví dụ như với cùng 1 đoạn text muốn tìm kiếm trên cả bảng A và bảng B, nó sẽ giúp ta trộn lẫn dữ liệu và đánh index cho nó. Cách còn lại là search scopes, cho phép tìm kiếm nâng cao hơn trên 1 Active Record, nó sẽ có ích khi xây dựng những tính năng như autocomplete (tự động hoàn thành, như google đoán trước mình muốn search cái gì) hoặc lọc theo một giá trị nào đó.
* [Wicked](https://github.com/schneems/wicked) giúp ta xây dựng các trang step-by-step (như kiểu google form có nhiều trang, hoặc là như form tạo mới phải điền form => xác nhận thông tin => submit,...)
* [Config](https://github.com/railsconfig/config) là cách tốt nhất để kết nối các cài đặt đa môi trường của yaml với Rails, Sinatra và các framwork khác của Ruby. Nó giúp quản lý một cách dễ dàng các setting cho từng môi trường. Mặc định nó sẽ tự sinh ra 4 file:
```
config/settings.yml
config/settings/development.yml
config/settings/production.yml
config/settings/test.yml
```
Bạn có thể sửa setting cho từng môi trường trong từng file.
* [I18n-tasks](https://github.com/glebm/i18n-tasks) giúp bạn tìm và quản lý  các bản dịch bị thiếu hoặc không được sử dụng. Nó có thể dùng với bất kì dự án có sử dụng gem I18n làm mặc định. Nó còn có thể thêm bản dịch mới thông qua Google translate API.
* [Money_rails](https://github.com/RubyMoney/money-rails) như tên gọi, được dùng với các đơn vị tiền tệ. Nó sẽ tự động update tỉ giá và quy đổi giá tiền thành đơn vị mong muốn.
* [Impressionist](https://github.com/charlotte-ruby/impressionist) cho phép đếm lượt view của trang và gán vào 1 model. Mục đích là để cung cấp số liệu thống kê ngay lập tức, thay vì phải gửi lên Google Analytics và lấy từ API của họ về. Nó có thể sinh ra 1 bảng riêng lưu số lượt view, hoặc là thêm một cột `counter_cache` vào model và tự động tăng mỗi lần bản ghi đấy được xem, nếu không thích tên `counter_cache` cũng có thể đặt tên khác bằng cách khai báo:
```
is_impressionable :counter_cache => true, :column_name => :my_column_name
```
* [Route_translator](https://github.com/enriclluelles/route_translator): nội dung web thì dịch rồi, nhưng còn 1 cái là URL thì thường được viết mặc định là tiếng Anh, gem này sẽ giúp ta dịch cả URL. Ví dụ như trong file router
```
Rails.application.routes.draw do
  localized do
    resources :cars, only: [:index, :create]
  end
end
```
thêm cả vào file locale
```
es:
  routes:
    cars: coches
    new: nuevo
fr:
  routes:
    cars: voitures
    new: nouveau
```
thì khi gõ rails routes nó sẽ sinh ra các link sau
```
 Prefix Verb   URI Pattern                     Controller#Action
       cars_fr GET    /fr/voitures(.:format)          cars#index {:locale=>"fr"}
       cars_es GET    /es/coches(.:format)            cars#index {:locale=>"es"}
       cars_en GET    /cars(.:format)                 cars#index {:locale=>"en"}
               POST   /fr/voitures(.:format)          cars#create {:locale=>"fr"}
               POST   /es/coches(.:format)            cars#create {:locale=>"es"}
               POST   /cars(.:format)                 cars#create {:locale=>"en"}
    new_car_fr GET    /fr/voitures/nouveau(.:format)  cars#new {:locale=>"fr"}
    new_car_es GET    /es/coches/nuevo(.:format)      cars#new {:locale=>"es"}
    new_car_en GET    /cars/new(.:format)             cars#new {:locale=>"en"}
```

Nguồn tham khảo: https://medium.com/codica/40-best-ruby-gems-we-cant-live-without-8ccf314fcd38