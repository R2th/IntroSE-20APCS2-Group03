# Mở đầu
Tiếp tục phần các relations để nói ở trước https://viblo.asia/p/active-record-association-relation-part-1-m68Z0dQjZkG, mình xin giới thiệu qua một số option được thêm vào các relations để thực hiện nhiều chức năng khác nhau, có một số option rất ít khi đụng đến nhưng nó thật sự rất hay và hữu ích như: counter_cache, auto_save, inverse_of, ...
# Class_name & foreign_key
Giả sử ta có model User, 1 user có 1 người quản lí và 1 user cũng có thể quản lí nhiều người(giống ví dụ self join ở bài trước), thì ta có thể sử dụng options class_name và foreign_key để thể hiện mội quan hệ trên:
```
#model/user.rb
has_many :subordinates, class_name: User.name, foreign_key: :manager_id
belongs_to :manager, class_name: User.name
```
khi gọi `@user.subordinates` thì ta được query tương ứng là: `#SELECT `users`.* FROM `users` WHERE `users`.`manager_id` = 1`
* `class_name` sẽ nói cho rails biết bạn belongs_to đến model nào
* `foreign_key` sẽ belongs_to đến model theo key nào
# Counter_cache
Trong ví dụ khác, giả sử 1 user có nhiều documents
```
#model/document.rb
belongs_to :user, counter_cache: :documents_counter
```
* Ở table user chúng ta sẽ phải thêm 1 field documents_counter
* field này ánh xạ với số lượng documents hiện có của mỗi user
* Khi create, update, destroy thì documents_counter tự động cập nhật theo từng thao tác
# Touch
Cũng như ví dụ trên, 1 user có nhiều documents:
```
#class document
belongs_to :user, touch: true
```
* Với option `touch` được set true thì khi 1 document của user được create hoặc update, thì field update_at của user đó cũng được cập nhật lại tại thời điểm mà document đó thay đổi.
when create, updated document of category, author update attributes updated_at
# Primary_key
```
#model user
  self.primary_key = 'guid'

#model document
  belongs_to :user,  primary_key: 'guid'
```
* Mặc định thì ở table document sẽ lưu id của user ở field user_id, tuy nhiên chúng ta có thể thay đổi nó bằng cách sử dụng option  `primary_key`
* Khi build, create, destroy, document nó sẽ hiểu id của user quản lí document đó là giá trị của được lưu ở field 'guid'
# Optional
```
#class document
belongs_to :user, optional: true
```
* Mặc định thì optional được set là false.
* Khi được set true thì nó cho phép 1 object của model document có thể có trường user_id là null.
# Dependent
```
#class document
belongs_to :user
#class user
has_many :documents, dependent: :destroy
```
* Khi option `depentdent` được set với giá trị là destroy thì sau khi mỗi user bị xóa đi thì tất cả các documents của nó cũng sẽ bị xóa đi. 
* Ngoài ra thì nó còn có các option delete, nullify tượng tự như destroy thì nó thực hiện nhiệm vụ như tên của nó.
* Với value là `restrict_with_exception` thì khi xóa 1 user có documents nó sẽ raise 1 exception `ActiveRecord::DeleteRestrictionError: Cannot delete record because of dependent documents` cà không cho xóa user
* Với value là `restrict_with_error` khi xóa 1 user có documents thì nó sẽ rollback và đưa error vào đối tượng user đó.
# Auto_save
```
#class user
has_many :documents
#class document
belongs_to :user, auto_save: true
```
* Option `auto_save` được set true thì khi update, create user, nếu documents của user đó có thay đổi từ trước thì nó cũng sẽ được update theo.
# Inverse_of
`Inverse_of` là một cách tiện dụng để gắn cờ cho Ruby rằng các đối tượng liên quan có thể được truy cập từ một trong hai hướng. `post.comments` và `comment.post`. `Inverse_of` làm cho nó rõ ràng rằng các đối tượng trong các mối quan hệ thực sự là cùng một đối tượng. Bạn chỉ định `inverse_of` như sau:

```
# app/models/post.rb
has_many :comments, inverse_of: post
```
Nếu bạn làm điều này khi không chỉ định inverse_of :

```
post = Post.first
post.update_attribute(:importance, false)
comment = post.comments.first
working_post = comment.post
working_post.update_attribute(:importance, true)
post.importance?
=> false
```
Nó vẫn nghĩ răng post là unimportant.. đó là bởi vì comment.post đã thực hiện truy vấn database riêng và có một truy vấn mới và riêng biệt của cùng một bài đăng, và biến post lưu bản gốc không biết rằng bản ghi cơ sở dữ liệu đã được thay đổi. Bây giờ với inverse_of, bạn làm theo các bước tương tự :
```
post = Post.first
post.update_attribute(:importance, false)
comment = post.comments.first
working_post = comment.post
working_post.update_attribute(:importance, true)
post.importance?
=> true
```

Tốt hơn nhiều! Bởi vì comment.post không làm một truy vấn cơ sở dử liệu, thay vào đó nó sử dụng cùng một thể hiện của các đối tượng post đã có trong bộ nhớ. Vì vậy, thay đổi trong working_post được tự động hiển thị trong post cùng một lúc, tránh những kết quả bất ngờ.

# Kết luận
Trong bài viết này mình đã giới thiệu một số option hữu ích của các relations trong Active Record rồi đấy, mong nó sẽ có ích với mọi người. 

# Tài liệu tham khảo
http://guides.rubyonrails.org/association_basics.html#polymorphic-associations