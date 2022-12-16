Kể từ khi tôi bắt đầu làm việc với Ruby on Rails, và sau vài tháng sử dụng nó, tôi không thể ngừng tự hỏi khi tôi khám phá ra điều gì đó mới mẻ trong thế giới Ruby. Ruby luôn tạo ra các cách để làm cho một lập trình viên hạnh phúc, và đôi khi trong quá trình viết code chúng ta quên mất những điều có sẵn ấy. Dưới đây tôi sẽ chỉ ra cho các bạn 5 mẹo mà có thể bạn không biết( hoặc đã biết rồi).
# 1. Hash#dig
Đã bao nhiêu lần bạn viết những dòng code như thế này ?
```
... if params[:user] && params[:user][:address] && params[:user][:address][:somewhere_deep]
```
Hãy sử dụng "dig", và viết lại nó như thế này 
```
... if params.dig(:user, :address, :somewhere_deep)
```
Trông có vẻ clear hơn nhỉ, dễ đọc, dễ sửa, dễ dùng. Các bạn có thể tìm hiểu rõ về [dig](https://stackoverflow.com/questions/34346653/how-do-i-use-arraydig-and-hashdig-introduced-in-ruby-2-3) trước khi sử dụng nó nhé. 
# 2. Object#presence_in
Trong khá nhiều trường hợp chúng ta đã code những dòng đại loại thế này :
```
sort_options = [:by_date, :by_title, :by_author]
...
sort = sort_options.include?(params[:sort]) 
  ? params[:sort] 
  : :by_date
# Another option
sort = (sort_options.include?(params[:sort]) && params[:sort]) || :by_date
```
Nhìn có vẻ rườm rà rắc rối, nhưng thay vào đó chúng ta có thể sử dụng presence_in, và refactor lại đoạn code trên:
```
params[:sort].presence_in(sort_options) || :by_date
```
# 3. Module#alias_attribute
Trong một vài trường hợp khi chung ta nhúng tay vào một dự án cũ, có thể cả chục năm trước và nhìn thấy DB có các cột đặt tên 1 kiểu "lạ lùng" như NGAYTHANG, HOTEN ....
khi ánh xạ vào ActiveRecord việc gọi các tên như vậy thường gây nhiều rắc rối, chúng ta có thể dễ dàng đặt lại tên cho chúng bằng alias_attribute: 
```
alias_attribute :name, :HOTEN 

scpoe :by_name, -> name {where name: name}
```

# 4. Object#presence
Presence thì chắc các bạn gặp khá nhiều rồi nhỉ?
Nó chỉ đơn giản là 
```
object.present? ? object : nil
```
# 5. Module#delegate
Một cách tiện lợi để không phải gọi ra một thuộc tính quan hệ dài dòng là sử dụng delegate.
```
class Profile < ApplicationRecord
  belongs_to :user
  delegate :email, to: :user
end
...
profile.email # equivalent to profile.user.email
```
nguồn : https://hackernoon.com/5-ruby-on-rails-tips-you-probably-dont-know-8b80b4a0890f