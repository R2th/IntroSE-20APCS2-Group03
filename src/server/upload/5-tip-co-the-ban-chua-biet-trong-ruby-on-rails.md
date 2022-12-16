Đây là một bài viết được dịch lài từ [5 ruby on rails tips you probably dont know](https://hackernoon.com/5-ruby-on-rails-tips-you-probably-dont-know-8b80b4a0890f) 

Khi tôi làm việc với ruby on rails, tôi đã không thể ngừng tự hỏi tôi đã khám phá ra điều gì mới mẻ trong thế giới của Ruby. Và đây là cách nó hoạt động, bạn biết đấy, Ruby làm cho các developer happy và sau mỗi năm nó phải phát triển thêm các các công cụ mới giúp cho mã của bạn dễ hiểu hơn nhiều, nó làm code sạch hơn và người đọc cũng dễ hiểu hơn

Dưới đây là một số tip mà bạn sẽ hay thường xuyên sử dụng khi code ruby on rails và bạn sẽ hiểu được sự tiện lợi của nó như thế nào, xin mời trải nghiệm.

### Hash#dig
Trong khoảng thời gian bạn làm việc với ruby, bạn đã bao giờ gặp phải trường hợp phải xử lý rất nhiều `condition` với `param` như dưới nè chưa
```rb
... if params[:user] && params[:user][:address] && params[:user][:address][:somewhere_deep]
```

vậy thay vì viết như trên chúng ta có thể viết gói gọn lại thành
```rb
... if params.dig(:user, :address, :somewhere_deep)
```

### Object#presence_in
bình thường để  kiểm tra một dữ liệu có tồn tại trong mảng hay không chúng ta thường hay sử dụng `include?`, nhiều lúc cách sử  dụng `includes?` để check cũng mang lại nhiều bất tiện, ví dụ như dưới đây:
```rb
sort_options = [:by_date, :by_title, :by_author]
...
sort = sort_options.include?(params[:sort]) 
  ? params[:sort] 
  : :by_date
# Another option
sort = (sort_options.include?(params[:sort]) && params[:sort]) || :by_date
```
thay vào đó ta có thể sử dụng `presence_in` thay thế
```rb
params[:sort].presence_in(sort_options) || :by_date
```
như vậy đơn giản hơn rất nhiều.

### Module#alias_attribute
Khi trong table của chúng ta đã có các trường như `SERNUM_0` hay `ITMDES1_0`, và thay vì để tên nó giữ nguyên như vậy và sử  dụng trực tiếp trong các Query như `WeirdTable.where(SERNUM_0: ‘123’)`, chúng ta có thể sử dụng `alias_attribute` để tiện lơi hơn trong cách sử dụng, nó  khiến cho `scope` dễ đọc, dễ hiểu hơn
```rb
alias_attribute :name, :ITMDES1_0
...
scope :by_name, -> (name) { where(name: name) }
```

### Object#presence
chắc các bạn đã quá quen sử dụng với hàm duới đây
```rb
object.present? ? object : nil
```
Vậy giờ thay vì phải viết dài như vậy, chúng ta chỉ cần đơn giản sử dụng `object.presence`.
Đơn giản hơn rất nhiều có phải không ^_^

### Module#delegate
Cái nè thực sự hay, chắc cũng đã rất nhiều bạn dùng quen món nè, cho bạn nào chưa dùng bao giờ. 
bình thường khi ta có
```rb
class Profile < ApplicationRecord
  belongs_to :user
end
```
và chúng ta muốn truy xuất `email` từ `profile`, chúng ta thường hay sử dụng lệnh `profile.user.email`
Bây giờ chúng ta có thể làm một cách đơn giản hơn bằng cách sử dụng `delegate` như dưới đây:

```rb
class Profile < ApplicationRecord
  belongs_to :user
  delegate :email, to: :user
end
...
profile.email # equivalent to profile.user.email
```
Như vậy chúng ta chỉ cần đơn giản sử dụng `profile.email` thay vì phải sử dụng `profile.user.email`

### Kết Luận:
Trên đây là một vài tip hữu dụng giúp chúng ta có thể code hanh hơn,tiện hơn là happy hơn

Chúc các bạn vui vẻ