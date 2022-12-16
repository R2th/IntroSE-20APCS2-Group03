## N+1 query và cách phòng tránh
### N+1 query là gì?
Nói đơn giản thì, n+1 query là một cách truy vấn không hiệu quả do sử dụng quá nhiều truy vấn. Để hiểu rõ hơn thì chúng ta cùng xem xét một ví dụ sau:

Ở đây tôi có 2 model là User và Comment như sau:

```ruby
class User < ActiveRecord::Base
  has_many :comments
end

class Comment < ActiveRecord::Base  
  belongs_to :user
end
```
Đây là một mối quan hệ khá đơn giản: một user có thể tạo nhiều comment

Tôi muốn lấy ra những user của 5 comment đầu tiên, ta có đoạn code sau:
```ruby
Comment.limit(5).each do |comment|
  comment.user
end 
```
Những truy vấn được tạo ra khi chạy đoạn code trên là:
![](https://images.viblo.asia/f342e341-98ca-4491-885c-fb283181debc.png)

Sử dụng 1 truy vấn để lấy ra 5 comment đầu tiên.
Và dùng 5 truy vấn để lấy ra user của những comment đó.

Đó gọi là n+1 query.

Với số lượng bản ghi ít thì lượng truy vấn trên không gây ảnh hưởng nhiều, nhưng khi làm một dự án lớn, sô bản ghi lên đến hàng nghìn thì những truy vấn kiểu này sẽ gây ảnh hưởng rất lớn đến hiệu năng của chương trình.

### Includes Method

Thật may mắn, chúng ta có một cách truy vấn tốt hơn nhiều giúp giải quyết được vấn đề trên. Đó là sử dụng phương thức includes của Active Record.

Tôi có thể viết lại code cho ví dụ phía trên sử dụng includes như sau:
```ruby
Comment.includes(:user).limit(5).each do |comment|
  comment.user
end
```
Cùng xem lại kết quả nào:

![](https://images.viblo.asia/97757f71-ea94-469c-be3c-b9a15bb08c9a.png)
Như bạn thấy, đoạn code này giúp chúng ta chỉ phải sử dụng 2 truy vấn: một truy vấn lấy ra các comment và một truy vấn lấy ra các user.

Phương thức includes sử dụng một khái niệm gọi là "Eager Loading".

Trong ví dụ trên, eager loading hoạt động bằng cách load trước tất cả các user cho mỗi comment trước và được lưu trữ tạm thời trong bộ nhớ đệm.

Điều này cho phép lặp qua tất cả các comments và gọi đến ".user" mà không phải động vào database nhiều lần.

### Cách phòng tránh n+1 query

1. Sử dụng gem Bullet để xác định những chỗ cần sửa n+1 query

Sau khi cài đặt và config đầy đủ, khi chạy trên trình duyệt, nếu có n+1 query cần phải sửa, trình duyệt sẽ bật lên một cảnh báo cho mỗi n+1 query và đưa ra cách giải quyết bằng eager loading.

2. Khi association là has_many, sử dụng số nhiều cho tên class trong includes

```ruby
@libraries = Library.where(size: 'large').includes(:books)
```

3. Khi association là belongs_to/has_one, sử dụng số ít cho tên class trong includes

```ruby
@books = Book.all.includes(:author)
```
4. Load nhiều association, sử dụng dấu phảy để ngăn cách
```ruby
@library = Library.all.includes(:books, :magazines, :scrolls)
```
5. Load association lồng nhau 1 cấp, sử dụng như hash
```ruby
@library = Library.all.includes(books: :author)
```
6. Load association lồng nhau 2+ cấp, sử dụng như hash
```ruby
@library = Library.all.includes(books: [author: :bio])
```
7. Load các association phức tạp sử dụng dấu phảy và hash lồng
```ruby
@library = Library.all.includes(books: :author, scrolls: :scribe)
```
8. Đặt includes sau các điều kiện truy vấn nhưng trước khi tính toán và limit

```ruby
@libraries = Library.where(size: "large").includes(:books).limit(5)
@authors = Author.where(genre: "History").includes(:books).limit(3)
```
9. Phương thức includes là cách viết tắt cho 2 loại eager loading

preload: tạo 2 truy vấn, một truy vấn lấy model chính và một truy vấn lấy ra các model liên kết.

eager_load: Sử dụng left outer join tạo một truy vấn lấy ra model chính và các model liên kết.

Sử dụng includes cho phép Rails tự lựa chọn sử dụng preload hay eager_load.

10. Sử dụng gem Searchkick cũng cung cấp hỗ trợ cho eager loading 

Ví dụ:

```ruby
Book.search "moby dick", include: [:author, :isbn, :publisher]
```

**Tóm lại,** phương thức includes của Active Record thực sự rất hữu ích, nó load dữ liệu trước cho bạn, giúp việc truy xuất dữ liệu trong các Active Record associations nhanh hơn và hiệu quả hơn.

Tài liệu tham khảo: 

https://medium.com/@bretdoucette/n-1-queries-and-how-to-avoid-them-a12f02345be5
https://medium.com/@codenode/10-tips-for-eager-loading-to-avoid-n-1-queries-in-rails-2bad54456a3f