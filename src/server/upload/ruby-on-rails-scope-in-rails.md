# Scopes là gì ?

Scope là một trong những công cụ tuyệt vời trong rails để giữ cho việc DRY và giúp việc viết code một cách tường minh hơn. <br/>
Dù vậy, nó không đến nỗi phức tạp cho lắm.<br/> Scope đơn giản chỉ là một tập hợp các truy vấn được xác định trước và có thể dễ dàng xâu chuỗi để xây dựng nên  truy vấn phức tạp. Nào, hãy cùng xem các ví dụ dưới đây để hiểu hơn về scope nhá: <br/>

Mình muốn lấy các user đã activate thì chỉ cần khao báo scope trong Model:
```ruby
class User < ApplicationRecord
  scope :activated, ->{where activated: true}
end
```
Khi nào muốn sử dụng thì chỉ cần gõ `User.activated`.
Scope trên cũng tương đương với câu truy vấn: <br/>
```sql
SELECT * FROM user WHERE activated = true
```
# Dùng nó như thế nào ?
Như ví dụ ở trên thì các bạn thấy đó, để có thể thao tác với scope thì trước tiên bạn phải `khai nó ở trong Model tương ứng` và chỉ cần gọi ra thôi :D <br/>
Sau đây mình sẽ hướng dẫn các bạn một số cú pháp đơn giản khi thao tác với scope:
#### Truyền tham số vào scope:
```ruby
class Comic < ApplicationRecord
  scope :hand_painted_by, ->id {where("author_id = ?", id}
end
```
Khi dùng chỉ cần gõ: `Comic.hand_painted_by(id)`
```ruby
class Comic < ApplicationRecord
  scope :search_by_categories, 
    ->categories_id {where categories: categories_id}
end
```
#### Kết hợp nhiều scope lại với nhau: 
```ruby
Comic.hand_painted_by(id).search_by_categories(params[:category_id])
```
#### Lấy ra các column cần thiết:
Mặc định scope sẽ lấy ra tất cả các cột, nhưng bạn cũng có thể custom bằng SELECT:
```ruby
class Comic < ApplicationRecord
  scope :following_ids, 
    ->(user_id){select(:followed_id).where(follower_id: user_id)}
end
```
#### Thao tác với AND/OR trong scope:
Để có thể thể áp dụng AND trong sql thì bạn chỉ cần viết các câu  `.where` liền nhau là được.<br/>
```ruby
Comic.where(:name => "Attack on Titan").where(:chapter_id => 196)
-- SELECT "comics".* FROM "comics" WHERE ("comics"."name" = ? AND "comics"."chapter_id" = ?)
```
Còn áp dụng OR trong sql thì bạn cần lồng scope vào trong `.or()`
```ruby
Comic.where(id: 1).or(Comic.where(name: 'One piece'))
-- SELECT "comics".* FROM "comics" WHERE ("comics"."id" = ? OR "comics"."name" = ?)
```
#### Scope có thể sử dụng kết hợp với toán tử điều kiện:
Bạn cho phép kiểm tra điều kiện khi thực hiện một câu lệnh truy vấn, ở đây mình kiểm tra nếu thời gian tồn tại thì mình mới tìm các comic được tạo trước đó.
```ruby
class Comic < ApplicationRecord
  scope :created_before, 
    ->(time){where("created_at < ?", time) if time.present?}
end
```
# Tại sao lại nên dùng scope ?
Mình sẽ đưa ra một vài lý do mà mình cho điểm cộng đối việc sử dụng scope:
* Tái sử dụng lại scope  
* Kết hợp các câu scope đơn giản lại để viết những câu truy vấn phức tạp
* Code tường minh hơn, dễ hiểu dễ bảo trì sửa đổi hơn
* Kết hợp được với toán tử điều kiện
* Luôn đảm bảo method chain
 <br/>
### Tái sử dụng lại scope
Thay vì mỗi lần muốn lấy ra các user đã activate bản gõ cả câu truy vấn dài lê thê thì giờ bạn chỉ cần gọi tên scope ra là được
### Kết hợp các câu scope đơn giản lại để viết những câu truy vấn phức tạp
Mình chỉ đưa ra một ví dụ đơn giản thôi, đó là lấy ra danh sách user có gender: female, year < 1995, name: like "Biê".
```ruby
# SQL thông thường
--"SELECT * FROM users WHERE (gender = 0 AND YEAR(birthday) < 1995 AND name like '%Biê%')"

# Scope
User.female.lesser_year(1995).name_like("Biê")
```
Câu scope trên tập hợp từ 3 câu scope đơn giản lại với nhau. <br/>
Thoạt nhìn mình dám chắc là ai cũng hiểu được luôn ý nghĩa của scope trên phải hông. Còn ở sql trên thì bạn phải đọc chi tiết rồi :thinking: một lúc mới biết nó dùng để làm gì.<br/> 
`Mục đích của tôi là muốn lấy ra ABC thì tôi chỉ cần có thấy ABC là được rồi chứ tôi chả quan tâm đến việc lấy ra ABC như thế nào cả`<br/>
### Code tường minh hơn, dễ hiểu dễ bảo trì sửa đổi hơn
Vẫn là vấn đề ở trên,  someone said: `Thường thì tôi chỉ thao tác với câu truy vấn đơn giản thôi thê nên tôi cũng ko cần lo vấn đề trên ` <br/>
Vậy mình xin đưa ra câu truy vấn có điều kiện ban đầu là `abcdef`, và yêu cầu bạn dùng ở nhiều chỗ khách nhau. oke rồi <br/>
Giờ mình muốn sửa điều kiện lại là `abc`. Nếu bạn có thể giải quyết vấn đề này một cách nhanh chóng về dễ dàng thì tại hạ xin (baiphuc).<br/>
Như mình đã giải thích ở trên thì việc sử dụng scope giúp mình và người khác đọc code dễ hiểu hơn, nhìn code gọn gàng hơn và đặc biệt là vấn đề bảo trì và sửa đổi code thì ez thôi rồi.
### Kết hợp được với toán tử điều kiện
Bạn hoàn toàn có thể kiểm tra dữ liệu đầu vào trước khi chạy một câu lệnh scope. Việc này giúp mình thu được kết quả đúng như mong đợi và cũng tránh được crash app chẳng hạn
### Luôn luôn đảm bảo method chain
Đến đây mình mới nói là có một thứ làm được như scope -  `Class method` nhưng tại sao ta lại không dùng ? <br/>
Mình có một ví dụ sau:
```ruby
class Posts < ApplicationRecord
  # scope
  scope :by_status1, -> status { where(status: status) }
  ...
  # class method
  def self.by_status2
      where(status: status)
    end
end
```
@@ Thực tế `scope chính là một class method` nhưng được hỗ trợ bởi Rails và thêm một vài tính năng mà class method không có. Hãy xét đến ví dụ trên:  <br/>
Dù là class method hay scope đều hoạt động bình thường, nhưng nếu `status` truyền vào là `nil` hay `blank` thì sao?<br/>
 => tất cả đều trả về `nil`. Để tránh trường hợp này hãy kiểm tra tham số truyền vào trước khi thực hiện nhá(sử dụng `.present?`). <br/>
```ruby
# scope
scope :by_status1, -> status { where(status: status) if status.present? }

# class method
def self.by_status2(status)
  where(status: status) if status.present?
end
```
Với cách viết như trên scope chắc chắn hiện bình thường mà không gặp phải vấn đề gì. Nhưng class method thì lại khác: 
```ruby
class Post < ActiveRecord::Base
  def self.by_status2(status)
    where(status: status) if status.present?
  end
end
Post.by_status2('').recent
NoMethodError: undefined method 'recent' for nil:NilClass
```
Scope thì luôn luôn trả về một ActiveRecord Relation, trong khi class method thì không hoạt động. Muốn class method hoạt động ta phải thêm điều kiện sau:
```ruby
class Post < ActiveRecord::Base
  def self.by_status2(status)
    if status.present?
      where status: status
    else
      all
    end
  end
end
```
Như các bạn thấy đấy class method lại hoạt động bình thường. Nhưng tại sao lại chọn scope: <br/>
Dễ hiểu thôi, để hoạt động class method còn phải trải qua một số công đoạn nữa còn scope thì không.<br/>
Mình thì cứ cái nào có sẵn thì mình dùng thôi.
# Tips
Ngoài lề một tý, **đừng bao giờ sử dụng `default_scope` trong mọi trường hợp(nếu có thể)** <br/>
Vì sao ư ? Trước tiên hãy hiểu `default_scope` là gì đã:<br/>
Định nghĩa: Active Record cho phép bạn định nghĩa một `default scope` được ngầm định trong các truy vấn.<br/>
Tuy nhiên bạn không nên lợi dụng điều này, vì có thể không khéo lại `gậy ông đập lưng ông` bởi các scope mặc định này sẽ làm ảnh hưởng đến kết quả truy vấn của bạn mà không hiểu tại sao và bắt nguồn từ đâu. <br/>
Trong trường hợp bắt buộc phải cần `default_scope`. <br/>
Thì các câu truy vấn khác hãy thêm `.unscoped` nếu không muốn default_scope can thiệp vào( bỏ đi mọi scope ở phía trước nó, kể cả default scope.)
```ruby
  User.unscoped.find_by(email: 'bie@gmail.com')
```
# Tham khảo
* https://apidock.com/rails/ActiveRecord/NamedScope/ClassMethods/scope
* https://devblast.com/b/jutsu-11-rails-scopes
* https://viblo.asia/p/scope-trong-rails-gVQvlwnqkZJ
* https://viblo.asia/p/scope-va-class-method-trong-ruby-on-rails-rEBRAKALG8Zj

# Kết luận
Trên đây là một số kiến thức mà mình đã sưu tầm được cũng như rút ra trong quá trình làm việc với nó.<br/>
Nếu thấy bài viết này giúp ích cho bạn thì hãy upvote cho mình nhé <br/>
Xin chân thành cảm ơn !