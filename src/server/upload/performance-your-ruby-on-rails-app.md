Khi làm việc với bất cứ một ngôn ngữ nào thì ngoài việc viết code chạy cho đúng với logic của bài toán thì việc viết code làm sao để hiệu suất của chương trình nhanh cũng quan trọng không kém. Gần đây tôi có làm phần tối ưu cho một dự án và đã tìm ra một số vấn đề và giải pháp cho hiệu suất của dự án.
## Database
Khi các ứng dụng của chúng tôi phát triển lớn hơn, chắc chắn chúng có xu hướng chứa nhiều dữ liệu hơn và yêu cầu các truy vấn ngày càng phức tạp. Vì vậy vấn đề tối ưu truy vấn cần được tối ưu để cải thiện chương trình.
### Indexing: Why and When
index cơ sở dữ liệu như là chỉ mục ở mặt sau của một cuốn sách; thay vì phải đọc toàn bộ cuốn sách, bạn có thể quét một chỉ mục theo thứ tự bảng chữ cái để biết vị trí của những gì bạn đang tìm kiếm, và sau đó bỏ qua trang đó. Nói chung, bất kỳ cột nào bạn thường sử dụng để tìm kết quả (WHERE) hoặc sắp xếp (ORDER) có thể là một index. Khóa ngoại thường được lập index để cải thiện hiệu suất. Bạn có thể kiểm tra nhật ký của mình (hoặc đầu ra máy chủ Rails trong bảng điều khiển) để kiểm tra xem truy vấn nào chậm.

ActiveRecord đã tự động lập index - mọi index nhập đều có id riêng, đóng vai trò là khóa chính. Các khóa chính được lập chỉ mục theo mặc định; bạn có thể nhận thấy rằng việc tìm kiếm một cái gì đó theo id nhanh hơn. Tuy nhiên trong thực tế chúng ta cần phải tìm kiếm nhiều trường trong table nữa, các field này cần được đánh index để tìm kiếm nhanh hơn.\
chúng ta sử dụng command này để tạo index trong rails:
> rails g migration add_index_to_name_column_on_person
Chúng ta có index như sau:
```
class AddIndexToNameColumnOnPerson < ActiveRecord::Migration[5.2]
  def change
    add_index :people, :name
  end
end
```
Bây giờ chúng ta truy vấn vào bảng Person có 30.000 records. Thời gian truy vấn đã giảm đi khá nhiều.
```
Before: Person.find_by(name: "Jon Snow") => 25.3ms
After: Person.find_by(name: "The Hound") => 0.6ms
```
### Partial Indexing
Partial Indexing cho phép chúng ta đánh index theo điều kiện của cột
```
class AddPartialIndexToPersonOnName < ActiveRecord::Migration[5.2]
  def change
    add_index :people, :name, where: "(name = chuc)"
  end
end
```
Điều này tăng tốc mọi thứ, tiết kiệm không gian và không lãng phí bộ nhớ. Nếu Partial Indexing phù hợp với nhu cầu của bạn, bạn hoàn toàn nên sử dụng nó thay vì index đầy đủ.
### Pluck
Để lấy hai trường trong một table cho vào mội mảng thì lúc trước tôi làm như sau:
```
Job.limit(5).map { | item | [ item.id, item.name ] }
Job Load (3.1ms)  SELECT  `jobs`.* FROM `jobs` WHERE `jobs`.`active` = 1 LIMIT 5
```
kết quả như sau:
> [[2136, "name"], [2137, "name"], [2138, "name"], [2139, "name"], [2140, "name"]]
Tuy nhiên sau khi tìm hiểu về pluck và áp dụng thời gian đã giảm đáng kể, Mọi người có thể tham khảo ở [đây](https://viblo.asia/p/tan-man-ve-select-va-pluck-trong-rails-ZjleaBRlkqJ)
```
Job.limit(5).pluck(:id, :name):name_badge: (0.6ms)  SELECT  `jobs`.`id`, `jobs`.`position` FROM `jobs` WHERE `jobs`.`active` = 1 LIMIT 5
```
### Fix N +1
```
User.all.each do |user|
 product = Product.where email:  user.id
end
```
Sau khi truy vấn log của query trên sẽ như sau:
```
User Load (0.9ms)  SELECT "users".* FROM "users"
Product Load (0.2ms)  SELECT  "products".* FROM "products" WHERE "products"."user_id" = ? LIMIT ?  [["user_id", 1], ["LIMIT", 1]]
Product Load (0.1ms)  SELECT  "products".* FROM "products" WHERE "products"."user_id" = ? LIMIT ?  [["user_id", 2], ["LIMIT", 1]]
Product Load (0.1ms)  SELECT  "products".* FROM "products" WHERE "products"."user_id" = ? LIMIT ?  [["user_id", 3], ["LIMIT", 1]]
```
Đoạn lệnh trên đã thực hiện rất nhiều câu queries, một câu lệnh để lấy ra tất cả user, và N câu lệnh query để thực hiện dựa trên số lượng user. Đó là vấn để N +1 và để fix chúng ta sử dụng Eager loading.
Sau khi sử dụng Eager loading chúng ta đã giải quyết được vấn đề n + 1 không chi có sử dụng Eager loading mới giải quyết được n + 1 ví dụ như cache query, mọi người khi code lên để ý log khi chúng ta viết code.N + 1 cũng là một phần làm giảm hiệu suất của chượng trình.
```
User.includes(:products).each do |user|
 product = Product.where email:  user.id
end
```
log query :
```
User Load (0.1ms)  SELECT "users".* FROM "users"
Product Load (0.1ms)  SELECT "products".* FROM "products" WHERE "products"."user_id" IN (1, 2, 3)
```
sau khi sử dụng Eager loading chỉ tạo ra 2 câu queries, một câu lệnh để lấy ra tất cả user, và câu lệnh còn lại lấy ra tất cả Product thuộc user đó.

Hi vọng với những điều tôi chia sẻ có thể giúp đỡ bạn trong việc nâng cao hiệu suất cho ứng dụng của bạn.
Happy coding!