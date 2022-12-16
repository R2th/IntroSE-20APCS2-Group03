# Về callbacks
### Kể tên các callbacks
Callback là một phương thức của Active Record,cho phép bạn thực thi các phương thức đã khai báo trước đó một cách tự động trước khi (hoặc sau khi, hoặc cả trước và sau khi) một đoạn code khác trong chương trình được chạy
<br> Thứ tự chạy của callbacks với mỗi hành động được thể hiện  ở báng dưới đây.

| CREATE | UPDATE |
| -------- | -------- |
|before_validation | before_validation |
|after_validation | before_validation |
|before_save | before_save |
|around_save | around_save |
|before_create | before_create | 
|around_create | around_create |
|after_create | after_create |
|after_save | after_save |
|after_commit/after_rollback  | after_commit/after_rollback |

| DELETE | OTHER |
| -------- | -------- |
|before_destroy |after_commit/after_rollback |
|around_destroy |before_action và after_action |
|after_destroy |after_initialize and after_find |


### Sử dụng như thế nào?
**Sử dụng callback** <br>
before_action :method_callback, only/except: action_must_callback <br>
Hoặc callback :method_callback <br>

**Skipping Callbacks**<br>
Khi sử dụng các phương pháp sau sẽ bỏ qua callbacks: <br>

* decrement
* decrement_counter
* delete
* delete_all
* increment
* increment_counter
* toggle
* update_column
* update_columns
* update_all
* update_counters

Tuy nhiên, Chúng ta nên thận trọng khi sử dụng những phương thức này vì các quy tắc nghiệp vụ quan trọng và logic ứng dụng có thể được giữ trong các cuộc gọi lại. Bằng cách chuyển chúng mà không hiểu các hàm ý tiềm năng có thể dẫn đến dữ liệu không hợp lệ.
# Thế nào là Strong params?
Strong Parameters là một phương pháp để đối phó với lỗi bảo mật khi sử dụng tính năng Mass Assignment.
Strong params để làm gì?
Strong parameters ngăn chặn việc ta không kiểm soát được những giá trị trong params.
- require(:user): bắt buộc trong params phải có key là user
- permit(:name, :email) để xác định các thuộc tính sẽ truyền vào params.
Nếu truyền thuộc tính không có trong permit thì nó sẽ không được lưu khi create/update và thuộc tính này sẽ không còn sau khi chạy qua strong params.
# Nested attributes là gì?
Nested attributes là kỹ thuật dùng để **create/remove** các record này khi **create/update** record khác; thường áp dụng với các object có quan hệ **has_one** hoặc **has_many**.
### Cơ chế của nested attribute
Để sử dụng cần kích hoạt nó bằng cách sử dụng phương thức **accepts_nested_attributes_for** trong model tương ứng
Một số tùy biến khi sử dụng **accepts_nested_attributes_for**:	
#### :allow_destroy
true hoặc false, nếu là true thì có thể xóa record
#### :reject_if
Cho phép bạn chỉ định một Proc hoặc một Symbol trỏ vào một phương thức để kiểm tra một bản ghi có được phép tạo ra hay không
#### :limit
Cho phép bạn chỉ định số lượng tối đa của các record liên quan có thể được xử lý với các thuộc tính lồng nhau
:limit option chỉ áp dụng cho quan hệ one-to-many.
#### :update_only
Cho phép bạn chỉ định một record chỉ có thể được update thôi, nếu record đó đã tồn tại; khi chưa tồn tại thì có thể create. 
Chỉ hoạt động cho quan hệ one-to-one.
### Cơ chế create một bản ghi	
Ví dụ: User has one Avatar
```ruby
user_params = require(:user).permit :username, avatar_attributes[:id, :url]
```
Khi new user ta lấy được params có dạng như sau:
```ruby
{ user: 
  { 
    username: 'A', 
    avatar_attributes: { 
      url: 'abc.jpg' 
    } 
  } 
}
user  = User.create(params[:user])
```


# Một số loại gem cơ bản
Để sử dụng gem thì ta cần khai báo gem đó trong tập tin Gemfile theo cú pháp sau
```ruby
  gem "name of gem", ~version
```
Sau đó chạy lại bundle install để cài đặt gem và sử dụng <br>
Một số gem cần tạo các tập tin để thiết đặt. Ví dụ như gem config dưới đây
```ruby
    rails g config:install
```

### Gem Pry-Rails
Bạn muốn debug ???
https://github.com/pry/pry
binding.pry
### Gem Config
Gem config giúp quản lý và sử dụng dễ dàng các settings trong project. Nói 1 cách đơn giản là tất cả các biến, giá trị cần dùng để cấu hình hệ thống được khai báo tập trung trong 1 hoặc 1 vài file<br>
https://github.com/railsconfig/config

### Gem figaro, dotenv
Quản lý toàn bộ biến môi trường của dự án<br>
http://railsapps.github.io/rails-environment-variables.html

### Gem kaminari
Dùng để phân trang<br>
https://github.com/amatsuda/kaminari Dùng cùng với gem "bootstrap4-kaminari-views"<br>

### Pagy (replace kaminari)
Dùng để phân trang<br>
https://github.com/ddnexus/pagy

### Gem Devise
Devise là một gem rất linh hoạt được sử trong quá trình xác thực người dùng<br>
https://github.com/plataformatec/devise

### Gem CanCanCan
Phân quyền cho ruby on rails, nó hạn chế các tài nguyên được phép truy cập<br>
https://github.com/CanCanCommunity/cancancan

### PAPERCLIP hoặc CarrierWave
2 Gem đều dùng để upload ảnh hay file cho dự án của bạn , cách sử dụng của cả 2 đều không quá phức tạp nhưng mình khuyên dùng carrierwave.

### Gem Ransack
Search được đơn giản và kết hợp được nhiều điều kiện search<br>
https://github.com/activerecord-hackery/ransack

### Background job: sidekiq, rescue, delayed job
 https://github.com/mperham/sidekiq<br>
https://github.com/resque/resque<br>
https://github.com/codez/delayed_cron_job