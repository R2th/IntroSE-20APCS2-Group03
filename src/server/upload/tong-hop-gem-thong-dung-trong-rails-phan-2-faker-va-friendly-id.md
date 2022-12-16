Ở phần này mình sẽ giới thiệu 2 gems rất quen thuộc với Ruby developers và hơn nữa, mình nghĩ đây cũng là những gem sẽ giúp ích cho các bạn newbies trong quá trình học Ruby on Rails

# I. Gem Faker
## 1. Giới thiệu
Faker là một gem không hề xa lạ đối với các lập trình viên Ruby on Rails, và hầu như mọi dự án Rails có Unit test thì đều sử dụng gem này. Vậy nên có thể gọi đây là gem mà bạn cần phải biết nếu như bạn đang muốn học lập trình với Rails
## 2. Cài đặt

Tất nhiên rồi, để cài đặt thì phải "đăng ký giấy tờ" ở gemfile rồi sau đó chạy lệnh bundle install
``` gem 'faker'```
> Lưu ý: Nếu như bạn gặp phải lỗi version như thế này ``` uninitialized constant Faker::[some_class] ``` thì bạn đổi dòng trên thành 
> 
> ``` gem 'faker', :git => 'https://github.com/faker-ruby/faker.git', :branch => 'master' ``` cho chắc kèo nhé :D

## 3. Sử dụng
Thử mở rails console và chạy những lệnh này nhé

```
require 'faker'

Faker::Name.name      #=> "Leo Kilback"

Faker::Internet.email #=> "lanie_cronin@kihn.com"

```
Dễ hiểu phải không nào :D

Một số cách dùng khác
```
Faker::Name.unique.name #=> Sẽ trả về giá trị name unique, không trùng với tất cả các name mà bạn fake trước đó
```
Trong trường hợp bạn đã sử dụng hết tất cả các name(unique) của gem thì nó sẽ không cho bạn tạo thêm nữa và trả về lỗi ``` Faker::UniqueGenerator::RetryLimitExceeded ```. Lúc này, bạn cần một lệnh để clear những giá trị đã sử dụng để fake lại :D 
```
Faker::Name.unique.clear # Clear hết tất cả giá trị name đã sử dụng
```

Ngoài ra, Faker cũng hỗ trợ để fake một số thứ khác như:
```
## Default ##
Faker::Address
Faker::Alphanumeric
Faker::Ancient
Faker::App
Faker::Appliance
Faker::Artist

......
```
```
## Games ##
Faker::Game
Faker::Games::ClashOfClans
Faker::Games::DnD
Faker::Games::Dota

......
```
```
## Sports ##
Faker::Sports::Basketball
Faker::Sports::Football

......
```
Các bạn tham khảo thêm nhé, thường thì mình chỉ sử dụng để fake một số thứ ở mục Default thôi, lúc viết bài này mình có test qua thì thấy fake được khá là rộng rãi

Tham khảo thêm ở đây nhé: https://github.com/faker-ruby/faker

# II. Gem Friendly Id

## 1. Giới thiệu
Nếu bạn để ý URL của những trang web trên mạng thì sẽ thấy nó khá là khác biệt với URL trong project mà mình tự làm. Ví dụ URL của bạn thường có id http://localhost:3000/post/1 Nhưng URL trên mạng thì lại news.com/post/this-is-post-name/

 Một URL như thế này được gọi là một friendly url. Nhìn vào url cũng có thể biết đc đại khái một số thông tin của trang đó thay vì chỉ là một id
 
 ## 2. Cài đặt
 Đăng ký "giấy tờ" ở gemfile ``` gem "friendly_id" ``` rồi niệm thần chú bundle install
 
 Thêm column slug vào bảng mà bạn muốn sử dụng friendly id sau đó chạy migrate để update DB.
 
 VD bạn có table ```posts``` có column ```title```. Trên URL bạn muốn hiển thị title thay vì id của post đó như thông thường. Cơ chế của gem này là convert title sang dạng this-is-title rồi lưu vào column slug. Mỗi khi hiển thị trên url thì lấy slug ra hiển thị :D
 
 Tiếp theo, ở trong model ```Post``` bạn thêm vào những dòng sau
 ```
 class Post < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
end
 ```
 Như vậy, bạn đã chỉ định lấy title làm slug rồi nhé
 
 ## 3. Sử dụng
 Mỗi khi gọi Post ở bất kì nơi nào trong project, thay vì Post.find id ta đổi thành Post.friendly.find id
 
 Ta thử tạo một post ``` Post.create! title: "example post"```
 
 Ở trên URL ta dễ dàng truy cập đến post đó với đường dẫn ``` http://localhost:3000/posts/example-post. ```
 
 Tài liệu tham khảo: https://github.com/norman/friendly_id
 # Tổng kết
 Hi vọng bài viết sẽ giúp ích cho các bạn trong quá trình tiếp cận và học Ruby on Rails. Cám ơn các bạn đã đọc bài :female_detective::female_detective::female_detective: