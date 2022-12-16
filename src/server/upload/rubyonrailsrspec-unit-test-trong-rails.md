# Unit Test là gì ?
> Hồi mới lên thành phố chân ướt chân ráo bước vào thế giới ngầm (RoR) mình dường như chưa hiểu thực sự ý nghĩa của viết Unit Test (Rspec). Và công việc đầu tiên của mình khi được add vào dự án là cover hết đống controller đang còn đỏ hỏn chưa ai đụng vào. Lúc đó thậm chí mình còn không biết phải bắt đầu từ đâu. Sau một ngày search, translate từ nhiều nguồn khác nhau thì mình cũng có 1 chút base về Rspec

# Dòng Rspec đầu tiên
> Sau 1 khoảng thời gian đọc tài liệu thì mình đã bắt đầu đặt những dòng Rspec đầu tiên, nó trông có vẻ khá thuận lợi: `bunder exec rspec`
![](https://images.viblo.asia/479878ed-9f25-4dbf-b30b-19417805ce51.png)

LGTM

Nhưng mà khoan đã, nó lạ lắm... Có vẻ như mình chỉ bắt `happy case`. Lúc đầu tôi cũng chỉ nghĩ rằng là nó `XANH` là được và viết 1 cách qua loa. Đời không như mơ.......

>Sau khi tạo PR và review code thì mình đã nhận ra vấn đề và lại quay lại đọc tài liệu, Sau bao lần nước đổ lá khoai thì mình cũng ngấm được một ít là đôi khi thà không viết test còn hơn viết test yếu (một cách sơ sài, cẩu thả)

# Mục đích viết Rspec
* Đầu tiên dễ thấy nhất đó là bạn có một `evindence` làm hài lòng sếp, hài lòng khách hàng rằng Unit test của tôi cover được xx% code![](https://images.viblo.asia/ff1f90af-ce2c-466c-87e9-d9df54c21a1e.png)

* Viết unit test giúp kiểm tra đoạn code vừa viết có chạy hay ko.
* Giúp dev liệt kê các trường hợp có thể xảy ra với đoạn code mình vừa viết. Qua đó giúp phát hiện các trường hợp lúc code bị thiếu, chưa nghĩ ra. Cũng như có thể tái hiện các trường hợp mà khi test tay chưa test được.
*  Unit test có thể làm tăng đáng kể chất lượng dự án của chúng ta, khiến code của bạn chạy một cách chính xác nhất. Trước khi đến tay QA mà unit test đã pass hết các case khi đó lượng bug sẽ giảm một cách đáng kể
* Viết unit test tốt thì khi maintain dự án sẽ giảm thiểu rủi ro và đỡ mất nhiều effort khi mà một thời gian sau bạn chỉ cần nhìn vào rspec là có thể hiểu được code .

# Gem hỗ trợ
> Sau khi có cái nhìn chính xác về Rspec mình tiếp tục tìm hiểu sâu hơn về Rspec và nghiên cứu những gem hỗ trợ viết Rspec 1 cách tốt nhất

## rspec-rails
> Đây là một gem rất mạnh trong ruby on rails nhằm mục đích kiểm thử các chức năng được viết bởi ruby on rails. [Tham Khảo](https://github.com/rspec/rspec-rails)
### Cài đặt
Thêm vào gemfile
```
group :development, :test do
  gem 'rspec-rails', '~> 6.0.0'
end
```
Sau đó chạy `bundle install`

Khởi tạo thư mục spec, run 
```
rails generate rspec:install
```
Một thư mục `rspec` sẽ được tạo như bên dưới sau khi install :
```
$ rails generate rspec:install
      create  .rspec
      create  spec
      create  spec/spec_helper.rb
      create  spec/rails_helper.rb
```
### Running specs
Chạy tất cả spec file
```
bundle exec rspec
```

Hoặc với scope là models
```
bundle exec rspec spec/models
```
Chạy riêng từng file
```
bundle exec rspec spec/controllers/accounts_controller_spec.rb
```
 Chạy từ số dòng trong file
 ```
 bundle exec rspec spec/controllers/accounts_controller_spec.rb:8
 ```
## fake
> Đơn giản là 1 gem để tạo `fake data`

### Cài đặt
Thêm dòng sau vào Gemfile sau đó chạy lệnh bundle install:
```
group :test do
  gem 'faker'
end
```
### Cách dùng
Hãy tưởng tượng đơn giản gem này cung cấp cho chúng ta 1 module  là `Faker` và các `model` có sẵn dữ liệu trong đó, chúng ta có thể kiểm tra nó như sau.
![](https://images.viblo.asia/42f380bc-57ec-4660-92ae-b1ee06c5ac12.png)

Sử dụng nó kết hợp với `factory_bot_rails` gem để tạo nên những dữ liệu fake chạy Rspec

## factory_bot_rails
> Như đã nói ở trên, Gem này cho phép chúng ta tạo ra các object cần thiết cho việc test với các giá trị mặc định, kết hợp cùng với Faker chúng ta có thể tạo ra các object(factory) với gía trị ngẫu nhiên

### Cài đặt 
Thêm vào gemfile sau đó chạy bundle install:
```
group :development, :test do
  gem 'factory_bot_rails'
end
```
### Cách dùng
> Sẽ cần 1 vài config để nó có thể hoạt động mượt mà, các bạn tham khảo thêm [Ở đây](https://github.com/thoughtbot/factory_bot_rails)

Ví dụ: Fake 1 user bao gồm `email` vs `password` sẽ trông như thế này

```
FactoryBot.define do
  factory :user do
    email { 'test@example.com' }
    password { 'password1' }
  end
end
```
Khi kết hợp với Faker

```
FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end
end
```

Cách gọi trong file test
Ví dụ: Tạo sẵn 1 user để phục vụ cho hàm `show`, `update`
```
let!(:user) { FactoryBot.create(:user) }
# hoặc với shorthand
let!(:user) { create(:user) }
```
Để dùng `shorthand` cần config trong `spec/rails_helper.rb`
```
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```
## shoulda-matchers
> Gem này giúp chúng ta viết test dễ dàng hơn, tiết kiệm được thời gian khi viết các test dài và phức tạp, code ngắn gọn, dễ đọc. Ví dụ khi test các validate hay association.

### Cài đặt
Thêm vào gemfile sau đó chạy `bundle i`

```
group :test, :development do
  gem 'rspec-rails'
  gem 'shoulda-matchers'
end
```

Trước khi dùng `shoulda-matchers` code của bạn sẽ như này: 

```
RSpec.describe Array do
  describe "when first created" do
    it { is_expected.to be_empty }
  end
end
```

sau khi dùng `shoulda-matcher` sẽ chỉ cần như này:
```
RSpec.describe Array do
  describe "when first created" do
    it { should be_empty }
  end
end
```

> Ngoài ra `Shoulda Matchers ` cung cấp cho ta rất nhiều phương thức dùng để test `ActiveModel` và `ActiveRecord`

Một số method thường dùng:

`ActiveModel matchers`
Xem chi tiết cách dùng [tại đây](https://github.com/thoughtbot/shoulda-matchers)
```
allow_value
have_secure_password
validate_absence_of
validate_acceptance_of
validate_confirmation_of
validate_exclusion_of
validate_inclusion_of
validate_length_of
validate_numericality_of
validate_presence_of
```

`ActiveRecord matchers`
```
accept_nested_attributes_for
belong_to
define_enum_for
have_and_belong_to_many
have_db_column
have_db_index tests
have_many
have_one
have_readonly_attribute
serialize
validate_uniqueness_of
```
## rails-controller-testing
> Cái tên nói lên tất cả, gem này hỗ trợ cho việc test controller, bằng việc cung cấp 2 method chính là  `assigns` và `assert_template`

### Cài đặt
Thêm vào gemfile sau đó chạy `bundle i`
```
gem 'rails-controller-testing'
```
### Cách dùng
`assigns` cho phép bạn truy cập  vào các biến `instance` trong action

Ví dụ:
`PostsController`
```ruby
class PostsController < ActionController::Base
  def index
    @posts = Post.all
    respond_to do |format|
        format.html  # index.html.erb
        format.json  { render :json => @posts }
      end
  end
end
```
Test cho `PostsController` với action `index`

```ruby
class PostControllerTest < ActionController::TestCase
  def test_index
    get :index
    assert_equal Post.all, assigns(:posts)
  end
end
```

`assert_template` cho phép bạn biết được template sẽ được render

```ruby
class PostControllerTest < ActionController::TestCase
  def test_index
    get :index
    assert_template 'posts/index'
  end
end
```

# Kết luận
Trên đây là những trải nghiệm, kinh nghiệm của mình về Rspec muốn chia sẻ đến mọi người.
Bài viết chỉ mang tính chất chém gió và chia sẻ. Hi vọng những thông tin ở trên sẽ giúp ích được cho bạn đọc khi bắt đầu dự án Ruby on Rails của mình

> Đừng viết Rspec cho có, hãy bỏ thời gian cho nó, bạn sẽ nhận lại được rất nhiều thứ sau này.


# Tài liệu tham khảo
https://github.com

https://itzone.com.vn/