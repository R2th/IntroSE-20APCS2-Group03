Bài viết này chia sẻ một số cú pháp giúp code của bạn trông sạch sẽ hơn, một số phần chỉ mới xuất hiện ở các phiên Ruby hoặc Rails gần đầy
## Hash#dig
Chắc hẳn đã có nhiều lần bạn code một số thứ trông như thế này
```
if params[:user] && params[:user][:address] && params[:user][:address][:somewhere_deep]
```
Hãy sữ dụng div như &. là một toán tử điều hướng an toàn nhưng được dùng cho Object. và bây giờ ta có thể viết lại như sau
```
if params.dig(:user, :address, :somewhere_deep)
```
## Object#presence_in
Một toán tử rất hay về đối tượng truy vấn trong Ruby on Rails. Nó cho phép bạn thay thế các điều kiện bằng một method duy nhất khi bạn không thực sự cần một kết quả kiểu boolean trong kết quả. VÍ dụ:

```
sort_options = [:by_date, :by_title, :by_author]
...
sort = sort_options.include?(params[:sort]) 
  ? params[:sort] 
  : :by_date
# Another option
sort = (sort_options.include?(params[:sort]) && params[:sort]) || :by_date
```
Viết lại có vẻ tốt hơn nhỉ 
```
params[:sort].presence_in(sort_options) || :by_date
```
## Module#alias_attribute
Cách để map table trong CSDL với Active record thay vì viết các query và scope. ta có thể dùng alias_attribute.
```
alias_attribute :name, :ITMDES1_0
...
scope :by_name, -> (name) { where(name: name) }
```
## Object#presence
Rất hữu ích. object.presence tương đương với
```
object.present? ? object : nil
```
## Module#delegate
Mục đích của phương pháp này là nới lỏng và theo định luật Demeter.
```
class Profile < ApplicationRecord
  belongs_to :user
  delegate :email, to: :user
end
...
profile.email # equivalent to profile.user.email
```

Hi vọng sẽ hữu ích cho bạn !