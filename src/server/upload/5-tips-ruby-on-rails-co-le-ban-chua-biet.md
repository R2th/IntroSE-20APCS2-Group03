Bài viết được dịch từ nguồn [5 Ruby on Rails Tips You Probably Don’t Know](https://hackernoon.com/5-ruby-on-rails-tips-you-probably-dont-know-8b80b4a0890f)

![](https://images.viblo.asia/a82f7366-05b6-4002-8be3-454816f40fc3.jpg)

Từ khi bắt đầu làm việc với Ruby on Rails, sau nhiều năm sử dụng nó, tôi không thể ngừng tự hỏi mình đã khám phá được điều gì mới mẻ trong thế giới của Ruby. 
Trong bài viết này, thôi chia sẻ một loạt nội dung tôi đã khám phá trong thời gian vừa qua. Chúng thường ít được sử dụng trong các methods và và không thông dụng cho lắm..humm nhưng có lẽ nó có thể sẽ khiến cho đoạn code của bạn trở nên sạch sẽ và gọn gàng hơn. Và có một số nội dung chỉ là những thay đổi xuất hiện trong version mới của Ruby hoặc Rails mà bạn chưa đọc tới.

## 1. Hash#dig
Đã bao nhiêu lần bạn đã làm như thế này:
```
... if params[:user] && params[:user][:address] && params[:user][:address][:somewhere_deep]
```
Đơn giản, hãy sử dụng **dig** giống như toán tử **&.** được dùng trong Hash, bạn có thể viết lại với:
```
... if params.dig(:user, :address, :somewhere_deep)
```
## 2. Object#presence_in
Điều này tôi đã tìm hiểu được trong một bài viết về Query Object trong Ruby on rails. Nó cho phép bạn thay thế điều kiện bằng một method khi bạn không thực sự cần thiết kết quả của một điều kiện boolean.
```
sort_options = [:by_date, :by_title, :by_author]
...
sort = sort_options.include?(params[:sort]) 
  ? params[:sort] 
  : :by_date
# Another option
sort = (sort_options.include?(params[:sort]) && params[:sort]) || :by_date
```
Như thế này có vẻ ổn hơn: 
```
params[:sort].presence_in(sort_options) || :by_date
```
## 3. Module#alias_attribute
Well, tôi đã tìm thấy điều tuyệt vời này khi tôi làm việc với một cơ sở dữ liệu kế thừa. Tôi có một số bảng với các cột có tên kì dị như `SERNUM_0`, `ITMDES1_0` và còn hơn thế nữa. Chúng tôi sử dụng ActiveRecord model và thay vì việc viết các truy vấn như `WeirdTable.where(SERNUM_0: ‘123’)`, chúng tôi sử dụng `alias_attribute` 
Về cơ bản, alias_attribute là một phương thức được Rails cung cấp sẵn, nó bao hàm sẵn getter và setter và phương thức truy vấn. 
Ví dụ: 
```
class Content < ActiveRecord::Base
  # has a title attribute
end

class Email < Content
  alias_attribute :subject, :title
end

e = Email.find(1)
e.title    # => "Superstars"
e.subject  # => "Superstars"
e.subject? # => true
e.subject = "Megastars"
e.title    # => "Megastars"
```
Bạn có thể tạo aliases cho các thuộc tính của bạn và truy vấn trong ActiveRecord một cách đơn giản để có thể sử dụng. 
## 4. Object#presence
Có lẽ điều này đã có trên trang chủ [apidock](https://apidock.com/rails/Object/presence) nhưng có thể nhiều người chưa từng biết. `Trả về object nếu nó tồn tại, nếu không trả về nil.`
```
object.presence
```
tương đương với
```
object.present? ? object : nil
```
Ví dụ bạn có thể viết đoạn code dưới đây:
```
state   = params[:state]   if params[:state].present?
country = params[:country] if params[:country].present?
region  = state || country || 'US'
```
gọn lại:
```
region = params[:state].presence || params[:country].presence || 'US'
```
## 5. Module#delegate
Điều này hiếm khi được các lập trình viên sử dụng bởi một vài lí do. Mục đích chính của phương pháp này là 
tuân theo [Loose coupling](https://en.wikipedia.org/wiki/Loose_coupling) và [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter). Delegate giúp dễ dàng gọi các public methods của object khác giống như là của chính mình, đặc biệt với các models có quan hệ phức tạp thì bạn có thể thực hiện gọi từ một class đến nhiều class khác.

**delegate** được sử dụng một cách đơn giản:
```
class Profile < ApplicationRecord
  belongs_to :user
  delegate :email, to: :user
end
...
profile.email # equivalent to profile.user.email
```
Ở ví dụ trên, ta đã có thể sử dụng trực tiếp được `profile.email`, email có thể là một phương thức hoặc một thuộc tính của Users model. Rất tiện lợi phải không ?

Để hiểu sâu hơn về **delegate** bạn có thể theo dõi bài viết [Using delegate in Rails](https://medium.com/@pk60905/using-delegate-in-rails-527332da7f96)

Hi vọng một số Tips trên có thể hữu ích đối với bạn. 

Thanks full!