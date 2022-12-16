## Lời nói đầu
Thực tế thì những người mới bắt đầu code Ruby sẽ đi theo xu hướng viết "đầy đủ". Theo cái cách tương đối "dài dòng" như các ngôn ngữ họ đã tiếp xúc trước đó, mà không biết  rằng có thể  viết chúng ngắn gọn hơn với các Syntax Ruby được định nghĩa lên.
Bài viết này sẽ tổng hợp 1 vài cách viết ngắn gọn các method trong Ruby on Rails, giúp đoạn code của bạn sẽ ngắn gọn và có vẻ "Pro" hơn phần nào đó.
Nào giờ thì chúng ta lên đường ^^

## Let's go
Chúng ta sẽ đi từ cái đơn giản nhất, ai cũng biết đến cái không phải ai cũng biết nhé =))

#### Giảm số dòng code với mệnh đề If
Có quen thuộc quá không?
```ruby
if user.active?
  send_mail_to(user)
end
```

```ruby
send_mail_to(user) if user.active?
```
#### Thay thế if + not (!if) bằng unless 
Cái này có vẻ ở đâu cũng thế nhỉ =))
```ruby
user.destroy if !user.active?
```

```ruby
user.destroy unless user.active?
```

Note: Tuy nhiên, nếu các mệnh đề sau If + not  khi được kết nối bởi các toán tử && hoặc ||. Thì việc biến đổi sử dụng `unless` ở đây vô hình chung lại phản tác dụng, và sẽ tạo ra gánh nặng được áp đặt trên não của người đọc code =)), vì vậy nó là tốt hơn để sử dụng nếu điều kiện như là một điều kiện phức tạp và đừng lạm dụng `Unless` quá.
Ví dụ dưới đây là 1 điển hình cho việc đọc hiểu khá thốn khi cố tình dùng `unless`
```ruby
## Mệt =))
user.destroy unless (user.active? || user.admin?) && !user.spam?
```
#### Giảm số dòng bằng cách sử dụng toán tử tam phân
Tên gọi thuần việt là: toán tử ba ngôi =)), cách dùng này thì cũng khá quen thuộc với anh em từ dev Java sang
```ruby
if user.admin?
  "I appreciate for that."
else
  "Thanks."
end
```
```ruby
user.admin? ? "I appreciate for that." : "Thanks"
```
Cũng tương tự với việc sử dụng `unless` ở trên thì khi dùng toán tử tam phân anh em cũng đừng lạm dụng quá, kiểu lồng nhau `nested` như thế này mình nghĩ là không nên
```ruby
user.admin? ? user.active? ? "I appreciate for that." : "Are you OK?" : "Thanks."
```
#### Khai báo biến và dùng luôn
```ruby
user = find_user
if user
  send_mail_to(user)
end
```
```ruby
if user = find_user
  send_mail_to(user)
end
```
Cách viết này khá thú vị, tuy nhiên có nhiều người lại không thích vì dễ gây hiểu nhầm việc gán giá trị cho biến trong mệnh đề `if` thành toán tử so sánh `==`
#### Kiểm tra nil của 1 đổi tượng
Viết nếu bạn muốn kiểm tra các điều kiện bằng cách gọi các thuộc tính và phương thức của nó chỉ khi có một đối tượng con
Đoạn mã sau đây cho thấy rằng `parent.children` có thể là nil
```ruby
if parent.children
  if parent.children.singleton?
    singleton = parent.children.first
    send_mail_to(singleton)
  end
end
```
```ruby
if parent.children && parent.children.singleton?
  singleton = parent.children.first
  send_mail_to(singleton)
end
```

Trong Ruby 2.3, một toán tử mới `&.`. Được gọi là toán tử điều hướng an toàn được gọi đã được thêm vào (Mình có 1 bài riêng về toán tử này, ae tìm post cũ, tăng view cho mình nha :v)
Với điều này, bạn có thể thử các cuộc gọi phương thức trên các đối tượng có thể là số không.
Nếu đối tượng là nil, giá trị trả về cũng là nil
```ruby
if parent.children&.singleton?
  singleton = parent.children.first
  send_mail_to(singleton)
end
```
Note: tuy nhiên cách viết này cũng có 1 vài điểm khá bất cập, ví dụ bạn gọi sai thuộc tính hoặc method sau object thì thay vì  raise exception như bình thường thì sẽ vẫn trả về nil, điều này sẽ khiến chúng ta có thể bị "lừa" khi debugger nên mọi người cùng chú ý điểm này
```ruby
##Ví dụ gõ sai tên method singleton?
parent.children.singletom? => raise exception
parent.children&.singletom? => nil
```
#### Không cần dùng return cuối phương thức
Ruby có cái rất hay là sẽ lấy dòng cuối cùng mỗi phương thức làm giá trị trả về mà không cần dùng `return` như các ngôn ngữ khác
```ruby
def build_message(user)
  message = 'hello'
  message += '!!' if user.admin?
  return message
end
```
```ruby
def build_message(user)
  message = 'hello'
  message += '!!' if user.admin?
  message
end
```
#### Sử dụng Object #tap, 1 cho tất cả
Thay vì khởi tạo object -> gán giá trị cho các thuộc tính của object đó -> trả về dưới dạng return object
```ruby
def build_user
  user = User.new
  user.email = "hoge@hoge.com"
  user.name = "Taro Yamada"
  user
end
```
```ruby
def build_user
  User.new.tap do |user|
    user.email = "hoge@hoge.com"
    user.name = "Taro Yamada"
  end
end
```
#### Lược dấu ngoặc đơn cuối method
Cái này mình thấy cũng có cái hay, cũng có cái không hợp lý, để mình kể 1 câu chuyện nhỏ.
Trước convention Ruby công ty mình có yêu cầu là lược bỏ dấu () cuối phương thức, và rồi thì khi Review code ae đều comment yêu cầu nhau remove () khi nhìn thấy.
Đến 1 ngày kia, làm việc cùng anh em PHP (anh em PHP sang dev Ruby) cho rằng việc bỏ () đôi khi là k cần thiết, vì nó làm mất đi sự trong sáng của code.
=> 2 phe bỏ và không bỏ ()
=> sau đó, gọi là "dĩ hòa vĩ quý" chúng mình thống nhất việc bỏ () là optional.
```ruby
def build_user(params, condition)
  users = User.get_by_scope(params, condition)
  ...
end
```
```ruby
def build_user params, condition
  users = User.get_by_scope params, condition
  ...
end
```
Các bạn sẽ chọn cách viết nào?

(còn tiếp, còn rất nhiều =)))