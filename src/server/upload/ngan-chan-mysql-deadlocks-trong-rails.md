# 1. Deadlocks là gì
Trong MySQL, **Deadlocks** là khi mà 2 Transaction trong đó Transaction này giữ một Lock trên một row của Data Table còn Transaction kia đang cần xử lý row đó. Deadlock khiến cho 2 Transaction phải **wait** trên Transaction khác đang giữ Lock của row. Điều này không thể xảy ra vì cả hai đều bị mắc lại khi phải chờ xử lý row của Transaction khác. 

Do đó, MySQL time out một hoặc cả hai Transaction và giải phóng Lock của row. Cách giải quyết vấn đề đơn giản nhất là khóa càng ít row càng tốt và trong thời gian ngắn nhất. Cùng với cách giải quyết này là một số cách khác để ngăn chặn Deadlocks MYSQL trong Rails sẽ được trình bày ở dưới dây !!

# 2. Xử lý Tracsaction trong thời gian ngắn
Lock thường được giải phóng vào cuối của Transaction, do đó giữ các Transaction ngắn sẽ giúp Locks đc xử lý sớm. Tuy nhiên, đối với Rails, các Callback gọi lại Lifecycle của ActiveRecord có thể sẽ kéo dài xử lý trong Transactions.

ActiveRecord tự động bắt đầu một Transaction để lưu bất kỳ bản ghi nào và tất cả các Callback đến ActiveRecord sẽ kích hoạt trong Transaction đó. Điều này có thể gây ra vấn đề nghiêm trọng trong code.

Ví dụ: 
```ruby
class Profile
  before_save :update_logo
  def update_logo
    ... upload the thumbnail ..
  end
end
```
Trong class Profile có 1 hàm xử lý update, và callback ở đây load hàm xử lý trước khi lưu bản ghi vào Active Record. 

Điều này có nghĩa là row của Profile bị khóa cho đến khi Logo được load và dẫn đến deadlocks nếu như thời gian load Logo là quá dài (vì nó khiến cho thời gian mà row của Profile bị khóa tăng lên).

Giải pháp ở đây là sử dụng **after_commit** giữ các xử lý như load Logo lên được giữ ở bên ngoài Transactions

Nhưng đó không phải là cách duy nhất các callback đến Lifecycle của ActiveRecord có thể ảnh hưởng đến code. Ví dụ:

```ruby
class User
  after_save :set_permissions
  def set_permissions
    user.permissions.update_attributes!(admin: true)
  end
end
```
Đoạn code trên trước tiên sẽ có được Lock trên User và sau đó là Permission trong một Transaction. Nếu một số xử lý khác có Lock trên Permission có thể sinh ra deadlocks. 

Sửa đổi một loạt các bản ghi trong các callback đến ActiveRecord là một cách sinh ra deadlocks không thể đoán trước.

Để tránh những vấn đề này (việc sử dụng quá mức callbacks đến ActiveRecord nói chung là có vấn đề), hãy tách hoàn toàn khỏi callbacks đến ActiveRecord. Sử dụng **form objects**,  **interactors**, **service objects** là một giải pháp tốt để tách khỏi callbacks đến ActiveRecord. 

Thực hiện update trên các bản ghi theo linear fashion (tuyến tính) mà không cần dựa vào callbacks sẽ cho phép kiểm soát phạm vi Transaction, do đó tránh được Deadlocks.

# 3. Xếp thứ tự các Lock trong code
Nếu Transaction khóa nhiều hơn một bản ghi (explicitly hoặc implicitly) thì cần đảm bảo thứ tự các row bị khóa luôn giữ nguyên.

Ví dụ: Giả sử đang làm việc trên một ứng dụng thương mại điện tử và người dùng được cung cấp mã phiếu giảm giá chỉ áp dụng cho một số mặt hàng nhất định (chỉ có thể được sử dụng một lần bởi người dùng) và người dùng không thể mua hết các mặt hàng trong kho. 

 Thiết kế code để thỏa mãn yêu cầu trên như sau:

```ruby
def purchase(purchase_params)
  Item.transaction do
    # lets ensure nobody else can purchase selected item
    item = Item.available.where(item_id: purchase_params[:item_id]).lock(true)
    item.update_inventory
    order.add(item)
    # lets ensure discount cant be used elsewhere
    discount = Discount.unused.where(discount_id: purchase_params[:discount_id]).lock(true)
    process_payment
    discount.mark_discount_as_used
  end
end
```
Locks được mua theo cùng thứ tự trên item và discount của món hàng thì code sẽ ko có deadlocks.

Nhưng nếu đang làm việc trên một ứng dụng blog và bất cứ khi nào người dùng cập nhật một bài đăng, tất cả các bài đăng cần phải được republished. Thiết kế code để thỏa mãn yêu cầu trên như sau:

```ruby 
User.transaction do
  ..
  user.posts.order("posts.updated_at").each {|post| post.publish! }
  ..
end
```
Đoạn code này có thể gây ra Deadlock trong hệ thống vì các Transaction khác nhau chạy cùng lúc có thể có được khóa theo posts thứ tự khác.

**Transaction#1** có thể lấy **user.posts.order("posts.updated_at") as [post1, post2, post3]** trong khi **Transaction#2** có thể lấy được **[post2, post1, post3]**. **Transaction#1** khóa post1 còn **Transaction#2** khóa post2

Sau đó **Transaction#1** cố gắng khóa post2 và bị chặn còn **Transaction#2** cố gắng khóa post1 và bị chặn, dẫn đến Deadlocks.

# 4. Có được locks với transaction càng sớm càng tốt
Như đã thấy từ ví dụ trước, đôi khi không dễ để đảm bảo hoặc tìm được thứ tự mà row của Profile sẽ bị khóa

Trong những trường hợp như vậy, sẽ an toàn hơn rất nhiều khi giải phóng Lock càng sớm càng tốt cho Transactions

Có thể cải tiến lại đoạn code về đăng bài post ở mục 3 như sau

```ruby
User.transaction do
  # lets ensure nobody else can update these posts
  user.posts.lock(true)
  ..
  user.posts.order("posts.updated_at").each {|post| post.publish! }
  ..
end
```

Đoạn code đảm bảo 2 Transaction sẽ không bao giờ Deadlock khi cập nhật các bài đăng đó.

Trong nhiều trường hợp, tốt hơn hết là chỉ sử dụng **update_all**

```ruby
User.transaction do
  ..
  Post.where(user_id: user.id).update_all(state: 'published')
  ..
end
```

# 5. Sử dụng Nested Transactions không giải phóng Locks
Nếu đang sử dụng **Nested Transaction** và có được Lock trên một bản ghi trong đó, Lock sẽ chỉ được giải phóng khi Transaction bên ngoài được commit bởi vì với MySQL thì **Nested Transactions** chỉ là **savepoints**

```ruby
User.transaction do
  Post.transaction do
    post = Post.find(1).lock(true)
  end # lock on post will not be released here.
end
```

**Cảm ơn các bạn đã theo dõi bài viết đến đây !!**

**Link tham khảo https://www.brightbox.com/blog/2014/11/13/preventing-mysql-deadlocks/**