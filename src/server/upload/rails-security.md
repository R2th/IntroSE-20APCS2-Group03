Chào mọi người, bài viết hôm nay mình sẽ nói tới một số vấn đề về bảo mật mà chúng ta cần quan tâm khi làm việc với **Rails**.
## Authentication
Một điều quan trọng khi làm việc với **authentication**:
> Always salt and hash all passwords!

Lý do duy nhất cho việc lưu trữ `password` dưới dạng `plain text` là khi `password` phải cung cấp cho các `external service` dưới dạng `plain text`. Ngoài ra `password` phải được mã hóa trước khi lưu trữ trong `database`
### Hashing password
**Hashing password** để tránh trường hợp lộ `password` khi dữ liệu trong `database` bị đánh cắp.
```ruby
require 'digest/sha1'

$hashes = {}

def hash(password)
    Digest::SHA1.hexdigest(password)
end
def store_password(login, password)
    $hashes[login] = hash(password)
end
def verify_password(login, password)
    $hashes[login] == hash(password)
end

store_password('alice', 'kittens')
store_password('bob', 'kittens')

$hashes # => {"alice"=>"3efd62ee86d4a141c3e671d86ba1579f934cf04d",
        # "bob"=> "3efd62ee86d4a141c3e671d86ba1579f934cf04d"}

verify_password('alice', 'kittens') # => true
verify_password('alice', 'mittens') # => false
verify_password('bob', 'kittens') # => true
```
Mặc dù **hashing password** bảo mật hơn việc để `password` dưới dạng `plain text`, tuy nhiên cách này vẫn không đảm bảo tuyệt đối.<br>
Ví dụ ai đó có file password này có thể suy ra `alice` và `bob` có cùng mật khẩu.<br>
Hơn nữa, hacker có thể lấy thông tin mật khẩu người dùng **rainbow attack**:<br>
Hacker sẽ tính toán ra **rainbow table** bằng việc sử dụng `hash` function với `password` được thử lần lượt. Sau đó chỉ cần so sánh từng `hashed password` trong `database` với các giá trị lấy được từ **rainbow table**.<br>
Kiểu tấn công này có thể ngăn chặn với việc dùng **salt**:
### Salting password
```ruby
require 'digest/sha1'

$hashes = {}
$salts = {}

def hash(password, salt)
    Digest::SHA1.hexdigest("--#{salt}--#{password}--")
end
def generate_salt(login)
    Digest::SHA1.hexdigest("--#{Time.now.to_s}--#{login}--")
end
def store_password(login, password)
    salt = $salts[login] = generate_salt(login)
    $hashes[login] = hash(password, salt)
end
def verify_password(login, password)
    $hashes[login] == hash(password, $salts[login])
end

store_password('alice', 'kittens')
store_password('bob', 'kittens')

$hashes # => {"alice"=>"955b034a284ed2405c8f1a275e2191484161b1c5",
        # "bob"=> "2f7ef18f0f50efd2b8684c49e85befc95509a74f"}
$salts # => {"alice"=>"0682a0e26655e234ee45ea6a68af8ebd3e2c0eaf",
        # "bob"=> "6116fb3dc0e9824b7c99e81f6dac6c17b7a6257b"}

verify_password('alice', 'kittens') # => true
verify_password('alice', 'mittens') # => false
verify_password('bob', 'kittens') # => true
```
Với việc lưu trữ thêm `salt` digest cho từng user sẽ đảm bảo security hơn: <br>
* Đảm bảo các `password` không bao giờ hash ra cùng giá trị
* `rainbow attack` sẽ trở nên khó khăn hơn
## Don't trust the Client
> Không bao giờ tin tưởng bất cứ gì nhận được từ client
 
Bởi vì client có thể gửi bất cứ gì mong muốn, có thể chèn thêm các header giả mạo, những parameter đặc biệc, query string bất thường, ...
* Form parameter (Trong query string hay data từ POST request)
* Cookies
* Referer header: chứa URI của trang liên kết tới trang hiện tại
### Form processing
Rails hỗ trợ `mass assignment` từ các `form parameters` tới `ActiveRecord` object, do đó các form field như `user[name]`, `user[age]`, ... có thể được gán cho `User` object bằng một dòng code: 
```ruby
user = User.new params[:user]
```
Điều này rất nguy hiểm khi cho phép client gửi bất kì `params` nào mong muốn, ví dụ như `user[role]: :admin`, ...
Để giải quyết vấn đề này, ta có thể sử dụng `attr_protected` trong `ActiveRecord` để chỉ ra những attribute nào không được assign qua `mass assignment`, hoặc sử dụng `permit` method đối với `params` trong controller.
### Hidden field
Ví dụ về việc sử dụng **hidden field** trong Rails form:
```ruby
# app/models/comment.rb
class Comment < ActiveRecord::Base
    belongs_to :user
end

# app/controllers/comments_controller.rb
class CommentsController < ApplicationController
    def new
        @comment = Comment.new(user_id: get_current_user)
    end
    def create
        @comment = Comment.create params[:comment]
    end
end

# app/views/comment/new.html
<% form_for :comment do |f| %>
    <%= f.hidden_field :user_id %>
    Comment: <%= f.text_field :comment %>
<% end %>
```
Với việc tin tưởng hidden_field `user_id`, `params[:comment][:user_id]` không được verify, chúng ta đã cho phép tạo comment cho bất kỳ user nào trong hệ thống.
### Client-side validation
Việc `validation` không nhất thiết chỉ nên xử lý phía server, ta nên thêm `validatation` ở cả phía client.<br>
Điều này rất hữu ích khi user để trống hay nhập sai format các form field, **client-side validation** sẽ xử lý những trường hợp như thế này, không cần tốn `request` tới server cho việc validate này.<br>
### Cookies
Trong Rails, ta không cần sử dụng tới `raw_cookie`, việc sử dụng `session` sẽ trở nên bảo mật và an toàn hơn.<br>
Bởi việc lưu trữ `session` luôn ở `server-side`, `sessionID` rất khó để đoán ra, đảm bảo rằng nếu user có một `sessionID` cụ thể, user đó có thể access tới `session` đó.
### Double-check everything
`REST` dựa trên `resource-based` `URIs` (mỗi một URI đại diện cho  một `resource` cụ thể), điều này có thể dễ dàng bị bỏ qua vấn đề về security:
```ruby
# app/models/message.rb
class Message < ActiveRecord::Base
    belongs_to :user
end

# app/controllers/messages_controller.rb
class MessagesController < ApplicationController
    def show
        @message = Message.find params[:id]
    end
end
```
Ví dụ trên cho phép mọi `user` đều có thể đọc được mọi `message` của bất kì ai. Có thể fix lại như sau:
```ruby
def show
    @message = Message.find_by_user_id_and_id(current_user.id,
    params[:id])
end
```
## Cross-Site Request Forgery
Là một kiểu tấn công khá phổ biến, hacker giả mạo là trình duyệt của người dùng gửi request tới trang web.<br>
Nếu người dùng đã đăng nhập với trang web của chúng ta, và việc xác thực này thông qua `cookies`, lúc này trình duyệt lưu trữ `cookies` của trang web và sẽ gửi `cookies` này khi request, `server` nhận thông tin `authentication` này và thực hiện xử lý request giả mạo đó.<br>
![](https://images.viblo.asia/04adf961-40c5-4379-88ac-4d22d8c290c9.png)
<br>Để chống lại **CSRF**, `Rails` tạo ra một `token` ứng với mỗi `session`, `token` này được gắn vào trường `hidden_field` ở mỗi form. Việc sử dụng `token` giúp:
* Gây khó cho hacker trong việc tạo ra một `token` chuẩn dựa vào `sessionID`
* Token sẽ thay đổi với từng `session`
<br>Những form được gửi tới sẽ không được xử lý nếu không có `token` hợp lệ
## SQL Injection
Cách tấn công sử dụng lỗ hỗng với những câu truy vấn SQL:
```ruby
search = params[:q]
Person.find_by_sql %(SELECT * FROM people WHERE name = '#{search}%')
```
Câu truy vấn SQL tìm những người có `name` ứng với tham số `search` được truyền vào. <br>
Nếu tham số `search` người dùng nhập : `“ '; DROP TABLE people; -- ”` thì câu truy vấn tới database sẽ như sau: 
```mysql
SELECT * FROM people WHERE name = ''; DROP TABLE people; --%';
```
Câu lệnh này sẽ xóa Table `people`!
Một ví dụ khác với `“ ' OR 1 = 1; -- ”`: 
```mysql
SELECT * FROM people WHERE name = '' OR 1 = 1; --%';
```
Cây lệnh này sẽ trả về toàn bộ `people` trong hệ thống.<br>
Để chống lại **SQL injection** ta có thể viết như sau:
```ruby
User.where("id = ?", params[:user][:user_id]).first
```
`Rails` cũng có thể xử lý những ký tự đặc biệt khi thực hiện câu truy vấn sql (`'` `""`, kí tự `NULL` hay kí tự xuống dòng) qua một số method như `Model.find(id)`, `Model.find_by_something(something)`.<br>
Mọi người có thể tìm hiểu thêm tại [https://rails-sqli.org/](https://rails-sqli.org/)



-----

Trên đây là tìm hiểu của mình về một số vấn đề về **security** trong `Rails`, cảm ơn mọi người đã đọc bài viết :confused: