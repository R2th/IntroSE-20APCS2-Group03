# Giới thiệu
Nếu bạn đã từng làm việc với ruby on rails trong một khoảng thời gian chắc hẳn bạn sẽ không còn xa lạ gì với gem này nữa. Kaminari là một gem rất phổ biến trong phân trang, nó giúp bạn dễ dàng tạo các phân trang cho bất cứ danh sách nào.
# Cài đặt
Thêm dòng sau vào Gemfile, sau đó chạy lệnh bundle install:
```ruby
   gem 'kaminari'
```
# Các câu query cơ bản
1.page: số thứ tự trang

Lấy ra những user ở trang số 7(mặc định per_page là 25)
```ruby
User.page(7)
```
Lưu ý: phân trang bắt đầu từ trang 1 chứ không phải trang 0( trang 0 sẽ trả về kết quả giống của trang 1)
Bạn có thể lấy ra số trang hoặc điều kiện của trang bằng cách sử dụng các phương thức bên dưới:
```ruby
User.count                     #=> 1000
User.page(1).limit_value       #=> 20
User.page(1).total_pages       #=> 50
User.page(1).current_page      #=> 1
User.page(1).next_page         #=> 2
User.page(2).prev_page         #=> 1
User.page(1).first_page?       #=> true
User.page(50).last_page?       #=> true
User.page(100).out_of_range?   #=> true
```
2.per: số item trên một trang

Để hiển thị nhiều bản ghi hơn trên mỗi trang( thay đổi giá trị của per_page)
```ruby
User.page(7).per(50)
```
Lưu ý: Phương thức per không được xác định trong models mà phải thông qua page. Điều này là hoàn toàn hợp lí vì bạn không thể xác định lấy ra bao nhiêu item trong khi không biết số thự tự của trang.
Ngoài ra khi sử dụng per, limit thì số lượng sẽ bị ghi đè lên. Muốn lấy ra tổng số item thì dùng phương thức total_count:
```ruby
User.count                     #=> 1000
a = User.limit(5); a.count     #=> 5
a.page(1).per(20).size         #=> 20
a.page(1).per(20).total_count  #=> 1000
```
3.padding:  lấy ra một số item
```ruby
User.page(7).per(50).padding(3)
```
Lưu ý: padding cũng không phải là phương thức được xác định trực tiếp từ models

4.Unscoping

Nếu vì một số lí do bạn cần unscope các phương thức page và per, bạn cần gọi except(:limit, :offset)
```ruby
users = User.page(7).per(50)
unpaged_users = users.except(:limit, :offset) # unpaged_users will not use the kaminari scopes
```
# Cấu hình Kaminari
1.Tùy chỉnh cấu hình chung

Bạn có thể cấu hình lại các giá trị mặc định bắng cách ghi đè giá trị của chúng bằng cách sử dụng phương thức Kaminari.configure
```ruby
default_per_page      # 25 by default
max_per_page          # nil by default
max_pages             # nil by default
window                # 4 by default
outer_window          # 0 by default
left                  # 0 by default
right                 # 0 by default
page_method_name      # :page by default
param_name            # :page by default
params_on_first_page  # false by default
```
Tạo tập tin cấu hình mặc định vào thư mục config/initializers. Chạy lệnh sau, sau đó có thể tùy chỉnh bất kì giá trị mặc định nào của Kaminari:
```ruby
rails g kaminari:config
```
2.Cấu hình giá trị mặc định của per_page cho mỗi Model bằng paginates_per

Bạn có thể chỉ định giá trị mặc định cho per_page cho mỗi model bằng cách sử dụng khai báo DSL sau:
```ruby
class User < ActiveRecord::Base
  paginates_per 50
end
```
3.Cấu hình giá trị mặc định của Max per_page cho mỗi Model bằng cách dùng max_paginates_per

Bạn có thể chỉ định giá trị per_page lớn nhất cho mỗi model bằng cách sử dụng khai báo DSL sau. Nếu gía trị per định nghĩa lớn hơn giá trị này thì max_paginates_per sẽ được sử dụng thay thế cho giá trị per. Mặc định max_paginates_per là nil tức là chúng ta không áp đặt bất kì giá trị per_page tối đa nào cả.
```ruby
class User < ActiveRecord::Base
  max_paginates_per 100
end
```
# Controller
Số thự tự trang sẽ được truyền vào qua params[:page]
```ruby
@users = User.order(:name).page params[:page]
```
# View
Để gọi phân trang trong view:
```ruby
<%= paginate @users %>
```
Để chỉnh lại giao diện cho đẹp mắt hơn, chúng ta có thể cài thêm gem bootstrap. Sau đó trong view chúng ta sửa lại như sau:
```ruby
<%= paginate @users, theme: 'twitter-bootstrap-3' %>
```
# Tham khảo 
https://github.com/kaminari/kaminari