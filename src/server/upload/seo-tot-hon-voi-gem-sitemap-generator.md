## Lời nói đầu
Trong thế giới web hiện nay, việc **SEO** (search engine optimization) là không thể thiếu sau khi tạo một trang web phải không ạ ?
Với suy nghĩ đó thì một newbie Ruby on Rails developer như mình sẽ phải giải quyết yêu cầu đó trong tương lai không xa.
Thông qua giao thức (protocol), sitemaps được mã hóa dưới dạng UTF-8 và được lưu dưới dạng file XML. Nó cung cấp tấm bản đồ rõ ràng nhất cho các con bot, công cụ thu thập thông tin để cung cấp dịch vụ tìm kiếm như **Google**, **duckduckgo**. Việc này cực kỳ đơn giản nhưng lại trở nên phức tạp nếu đối tượng cần tạo sitemaps là một website lớn và phức tạp.
Phức tạp thì nên để máy tính thực hiện chứ nhỉ, chứ tạo sitemaps bằng cơm sao được :v Bắt đầu thôi nào
## Giải pháp (gem sitemap_generator)
Có rất nhiều giải pháp để tạo sitemaps cho Rails nhưng mình thích hơn cả là `gem sitemap_generator`. Hãy cùng mình xem nó có những chức năng thú vị gì nhé.
* Nó hoạt động độc lập. Vậy nên chúng ta có thể sử dụng nó mà không cần đến Rails
* Cực kỳ linh hoạt
* Gem có những quy chuẩn riêng không bị ảnh hưởng bởi các config của ứng dụng khác
* Nó cho phép chúng ta tải lên file sitemaps từ bên thứ 3 (là file đã được tạo ra bởi công cụ khác)
* Nó sẽ tự động pings khi **sitemap** được tạo hoàn chỉnh
* Hỗ trợ đa sitemap với nhiều định dạng media như video, images, news, etc

Trong bài viết này mình sẽ sử dụng Rails để tạo web app với một vài tính năng đơn giản để thực hiện tạo sitemaps.
## Tạo project
Mở terminal lên và gõ lệnh 

```
$ rails new Sitemapper -T
```
Câu lệnh hẳn rất quen thuộc mỗi khi bắt đầu project mới phải không, mình thêm `-T` để loại bỏ các file test nhé. Ở đây gem tương thích với mọi phiên bản của Rails nên các bạn sử dụng phiên bản nào cũng được. Rails 5, hoặc Rails 6 (mới nhất) cũng oke. Sau khi lệnh chạy xong, các bạn vào thư mục project `cd Sitemapper` rồi chạy `rails s` rồi mở trình duyệt vào đường dẫn `localhost:3000` nếu hiện lên màn hình **Yay! You’re on Rails!** là được rồi nhé.

Giờ chúng ta cần có một số routes, models, controllers, migrations cho project nhé. Project sẽ là 1 blog có  **Category**, mỗi **Category** lại có nhiều **Post** với thuộc tính đơn giản là `title` và `content`. 

```
$ rails g model Category title:string
$ rails g model Post category:belongs_to title:string body:text
$ rails db:migrate
```
Chúng ta thêm quan hệ liên kết các model lại nếu chưa có nhé
```ruby:app/models/category.rb
class Category < ApplicationRecord
  has_many :posts
end

```

```ruby:app/models/post.rb
class Post < ApplicationRecord
  belongs_to :category
end
```
Giờ đến phần không thể thiếu là Routes
```ruby:config/routes.rb
Rails.application.routes.draw do
  resources :categories do
    resources :posts
  end
end
```
và đừng quên thêm đường dẫn mặc định nhé.
```ruby:
root to: 'pages#index'
```
Tạo Controller tương ứng với model
```
$ rails g controller categories
$ rails g controller posts
$ rails g controller pages
```
Tiếp đó để tạo một số dữ liệu mẫu ta dùng `gem fake`
```ruby:Gemfile
...
group :development, :test do
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "faker"
end
...
```
sau đó nhớ chạy `bundle install` nhé
Thay đổi file seed nữa là oke.
```ruby:db/seed.rb
5.times do
  category = Category.create({title: Faker::Book.title})

  5.times do
    category.posts.create({title: Faker::Book.title,body: Faker::Lorem.sentence})
  end
end
```
Số "5" bạn có thể tùy chỉnh nếu muốn nhiều dữ liệu hơn nhé.
Giờ chạy lệnh seed data
```
rails db:seed
```
## gem "sitemap_generator"
Thêm gem vào `Gemfile` rồi chạy lệnh bundle install
```
...
gem "sitemap_generator"
...
```
```
$ bundle install
```
Dùng rake để cài đặt sitemaps, chạy lệnh:
```
$ rake sitemap:install
```
lệnh bên trên sẽ tạo cho ta 1 file config `configs/sitemap.rb`. Mở file lên ta có thể thấy ngay dòng đầu tiên (không tính comment)
```ruby:configs/sitemap.rb
SitemapGenerator::Sitemap.default_host = "http://www.example.com"
```
Đó là dòng config domain của website. Ta có thể thay đổi tùy ý theo domain của mình.

Hoặc chúng ta có thể config multi sitemap nếu cần như là:
```ruby:configs/sitemap.rb
# config/google_sitemap.rb
SitemapGenerator::Sitemap.default_host = "https://google.mysite.com"
SitemapGenerator::Sitemap.sitemaps_path = "sitemaps/google"
SitemapGenerator::Sitemap.create do
  add '/home'
end

# config/apple_sitemap.rb
SitemapGenerator::Sitemap.default_host = "https://apple.mysite.com"
SitemapGenerator::Sitemap.sitemaps_path = "sitemaps/apple"
SitemapGenerator::Sitemap.create do
  add '/home'
end

# config/bing_sitemap.rb
SitemapGenerator::Sitemap.default_host = "https://bing.mysite.com"
SitemapGenerator::Sitemap.sitemaps_path = "sitemaps/bing"
SitemapGenerator::Sitemap.create do
  add '/home'
end
```
Mình sẽ sửa lại là :
```ruby:configs/sitemap.rb
SitemapGenerator::Sitemap.default_host = "http://test-sitemap.sun-asterisk.com"
```

Đến phần chính đó là `SitemapGenerator::Sitemap.create `
chúng ta thêm trang default
```ruby
SitemapGenerator::Sitemap.create do
  add root_path
end
```

`add` có thể nhận các tham số [bunch of arguments](https://github.com/kjvarga/sitemap_generator#supported-options-to-add)
chúng ta thêm code để generate cho **Post**, **Category** và có file hoàn chỉnh như sau:
```ruby:configs/sitemap.rb
SitemapGenerator::Sitemap.default_host = "http://test-sitemap.sun-asterisk.com"

SitemapGenerator::Sitemap.create do
  add root_path

  Category.find_each do |category|
    add category_posts_path(category), :changefreq => 'weekly', :lastmod => category.updated_at

    category.posts.each do |post|
      add category_post_path(category, post), :changefreq => 'yearly', :lastmod => post.updated_at
    end
  end
end
```
`changefreq` là khoảng cách thời gian mỗi lần dữ liệu đó thay đổi. Mặc định sẽ là **Time.zone.now**

Xong, giờ ta chạy lệnh sau để quét và tạo file sitemap tự động.
```
$ rails sitemap:refresh
```
Đây là kết quả của mình
![](https://images.viblo.asia/6558db91-6314-4062-92fe-94c3279305f4.png)

Các bạn tìm đến thư mục `public` sẽ tìm thấy **sitemap.xml.gz**, giải nén file ra ta được sitemap.xml. Mở thử bằng trình duyệt để dễ nhìn hơn nhé

![](https://images.viblo.asia/d1bceffe-70b8-4d44-8915-7e14540570ec.png)

#### Các bạn có thể tham khảo thêm các option của `add` ở [đây](https://github.com/kjvarga/sitemap_generator) để tùy biến theo yêu cầu của dự án nhé. 
#### source code: [demo source](https://github.com/tungblvt-1933/demo_gem_sitemap_generator)

#### Cám ơn các bạn đã đọc.