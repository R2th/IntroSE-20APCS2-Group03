Như các bạn đã biết, với ROR, **ActiveRecord** sẽ thực hiện các truy vấn trên cơ sở dữ liệu cho bạn và tương thích với hầu hết các hệ thống cơ sở dữ liệu (CSDL) như SQLite3, MySQL, ... Những truy vấn này giúp bạn thao tác với CSDL một cách nhanh hơn, tiện lợi hơn, phục vụ tốt cho mô hình MVC.  

Điều đặc biệt là dù bạn đang sử dụng CSDL nào, định dạng phương thức ActiveRecord sẽ luôn giống nhau.   

Giả sử chúng ta có 2 model Post và User gồm các field sau: (2 model này sẽ được dùng xuyên suốt các bài viết về ActiveRecord Query)    
***Model Post***
| Tên trường | Kiểu dữ liệu |
| - | - |
| id | Integer |
| title | String |
| content | String |
| user_id | Integer |

---   
***Model User***   
| Tên trường | Kiểu dữ liệu |
| - | - |
| id | Integer |
| firstName | String |
| lastName | String |
| email | String |
| age | Integer|

---
Bây giờ, ở phần 1 này chúng ta  sẽ tìm hiểu một số định dạng phương thức thường sử dụng (cơ bản) nhé!!!.

### 1. Lấy tất cả record với *.all*
> Để lấy tất cả bài Post hiện có, ta có thể dùng câu lệnh
```ruby
posts = Post.all
# "SELECT * FROM Post"
```

### 2. Lấy record đầu tiên và record cuối cùng với *.first* và *.last*

> Để lấy bài Post đầu tiên (hay cuối cùng) ta sẽ có câu lệnh
```ruby
# Bài Post đầu tiên trong Model
firstPost = Post.first

# Bài Post cuối cùng trong Model
lastPost = Post.last
```

### 3. Đếm số record hiện có với *.count*
> Đếm số User hiện có trong model User
```ruby
countOfUser = User.count
# SELECT COUNT(*) FROM User
```

> Đếm số record của tất cả User có firstName là "John"
```ruby
User.where(firstName: "John").count
# SELECT COUNT(*) FROM User WHERE (firstName = 'John')
```
### 4. Xóa toàn bộ các record với *delete_all*

Phương thức này sẽ giúp ta xóa toàn bộ record hiện có của một model, nó sẽ trả về số record được xóa (số record hiện tại)
> Xóa toàn bộ bài Post
```ruby
deletedPost = Post.delete_all
```
### 5. Truy vấn có điều kiện: *.where*   
   
Khi bạn muốn truy vấn CSDL, mà kết quả trả về là các giá trị phù hợp với một điều kiện nào đó, thì đây là phương thức phù hợp cho bạn. 

> Để lấy các User có firstName là "John" ta sẽ có câu lệnh như sau   
```ruby
peoples = User.where(firstName: 'John')
# "SELECT * FROM User WHERE firstName='John'"
```

Phương thức này cũng cho phép các bạn có nhiều điều kiện kết hợp với nhau khi truy vấn (or hoặc and)

> Để lấy các User có firstName là "John" và lastName là "David" ta sẽ có câu lệnh như sau (Toán tử and)
```ruby
peoples = User.where(firstName: 'John', lastName: 'David')
# "SELECT * FROM User WHERE firstName='John' AND lastName='David'"
```

> Để lấy các User có firstName là "John" hoặc lastName là "David" ta sẽ có câu lệnh (Toán tử or)
```ruby
peoples = User.where('first_name = ? or last_name = ?', 'John', 'David')
# SELECT "User".* FROM "Users" WHERE (firstName = 'John' or lastName = 'David')
```

Ngoài ra ta cũng có thể truyền tham số đầu vào là 1 mảng các giá trị. 

> Để lấy các User có firstName là "John" hoặc "Michela" hoặc "Jack" ta có câu lệnh
```ruby
peoples = User.where(firstName: ['John', 'Michela', 'Jack'])
# SELECT "User".* FROM "User" WHERE firstName IN ('John', 'Michela', 'Jack')
```
> Để lấy các User có lastName là "Stone" hoặc "Trum hoặc rỗng (NULL) ta có câu lệnh
```ruby
peoples = User.where(firstName: ['Stone', 'Trum', nil])
```

### 6. Truy vấn có điều kiện (phủ định) với *where.not*

Phương thức này chính là phương thức phủ định của ***.where***

> Để lấy các User có email khác NULL, ta có câu lệnh:
```ruby
peoples = User.where.not(email: nil)
```

### 7. Tìm kiếm theo một trường (field) với *find_by*
Phương thức này trả về ***bản ghi đầu tiên*** khớp với dữ liệu bạn tìm kiếm
> Để lấy ra User đầu tiên có firstName là "John", ta cũng có thể dùng câu lệnh:
```ruby
peoples = User.find_by(firstName: 'John')
```
Tương tự như ***.where***, phương thức này cũng có thể truy vấn với nhiều tham số đầu vào. Tuy nhiên, như đã nói, ***.where*** trả về tất cả các record khớp với dữ liệu tìm kiếm, còn ***.find_by*** chỉ trả về record đầu tiên tìm thấy

> Để lấy ra User đầu tiên có firstName là "John" và lastName là "David" ta cũng có thể dùng câu lệnh:
```ruby
peoples = User.find_by(firstName: 'John', lastName: 'David')
```

### 8. Giới hạn số lượng record lấy ra và vị trí (index) record muốn lấy với *.limit* và *.offset*

Phương thức ***.limit*** giúp ta giới hạn số record lấy ra
> Lấy ra 3 bài Post đầu tiên
```ruby
firstThreePost = Post.limit(3)
# "SELECT `Post`.* FROM `Post` LIMIT 3"
```

Phương thức ***.offset*** sẽ giúp ta bỏ qua một số report nhất định trước khi chọn dữ liệu
> Lấy các bài Post có thứ tự từ 21 trở về sau
```ruby
postsFromTwentyFirst = Post.offset(20)
# "SELECT `Post`.* FROM `Post` OFFSET 20"
```

Ta cũng có thể kết hợp 2 phương thức này
> Lấy ra 3 bài Post kể từ bài Post có thứ tự 21 (Từ 21 đến 23)
```ruby
posts = Post.limit(3).offset(20)
# "SELECT `Post`.* FROM `Post` LIMIT 3 OFFSET 20"
```

---

Như vậy, qua phần 1 này, ta đã nắm được 8 phương thức đầu tiên. Hẹn gặp lại các bạn ở các phần tiếp theo :)
Thanks for reading!!!

---