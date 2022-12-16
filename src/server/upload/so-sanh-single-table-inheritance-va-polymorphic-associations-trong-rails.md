Khi xây dựng một ứng dụng lớn, việc quyết định xem các bảng có quan hệ với nhau như thế nào là một vấn đề quan trọng và có ảnh hưởng rất nhiều tới dự án sau này. Một trong những tình huống hay xảy ra là khi chúng ta có nhiều model cần sử dụng các chức năng của một model khác. Trong tình huống như vậy Rails cung cấp cho chúng ta hai giải pháp là **single-table inheritance** và **polymorphic association**.
![](https://images.viblo.asia/6f6a8135-1261-46a9-a0c5-c1dce1e47201.png)

Trong **Single-Table Inheritance(STI)**, nhiều model con kế thừa từ một model cha và tất cả dữ liệu đều được **lưu trong cùng một bảng**. Model cha sẽ có một trường `type` để xác định các model con.

Trong **Polymorphic Association**, một model có thể thuộc về nhiều model khác nhau mà chỉ sử dụng duy nhất một association. Mỗi model, bao gồm cả model đa hình **đều có một bảng riêng trong database**. Cùng đi vào chi tiết 2 phương pháp nhé.

## Single-Table Inheritance
Chúng ta sẽ thường sử dụng STI trong trường hợp các models đều **sử dụng chung các trường.** Đi vào ví dụ cho rõ ràng hơn nhé.

Giả sử chúng ta cần xây dựng một ứng dụng liệt kê các phương tiện đang giảm giá của một đại lý. Các phương tiện bao gồm ô tô, xe máy, xe đạp, vân vân. Với mỗi phương tiện, người bán cần biết được giá cả, màu sắc và trạng thái đã bán hay chưa. Đây là lúc chúng ta sử dụng tới STI vì tất cả các model đều sử dụng chung các trường này. 

Để bắt đầu chúng ta tạo một model cha là `Vehicle` với các thuộc tính `color`, `price`, `purchased`. Mỗi model con đều có thể kế thừa các thuộc tính này từ `Vehicle`. File migrate của chúng ta sẽ như sau:
```ruby
class CreateVehicles < ActiveRecord::Migration[5.1]
  def change                           
    create_table :vehicles do |t|                             
      t.string :type, null: false                         
      t.string :color                             
      t.integer :price                            
      t.boolean :purchased, default: false                                                      
    end                         
  end                       
end
```

Rails sử dụng trường `type` để biết rằng chúng ta đang dùng **STI** và muốn tất cả các dữ liệu của `Vehicle` và các model con (`bicycle`, `car`, `motorcycle`) đều thuộc cùng một bảng trong database. Các class tương ứng với model sẽ như sau

```ruby
class Vehicle < ApplicationRecord
end

class Bicycle < Vehicle
end

class Motorcycle < Vehicle
end

class Car < Vehicle
end
```

Vậy là bất cứ method hay validation nào trong class `Vehicle` cũng sẽ được các class con kế thừa. Chúng ta cũng có thể thêm các method riêng của mỗi class con nếu cần. Hơn nữa chúng ta biết tất cả class con đều có các trường dữ liệu giống class cha, do vậy có thể sử dụng chung một lời gọi hàm trên các class khác nhau.
```ruby
mustang = Car.new price: 50000, color: red
harley = Motorcycle.new price: 30000, color: black
mustang.price
=> 50000
harley.price
=> 30000
```

### Mở rộng chức năng
Giờ người bán muốn biết thêm vài thông tin khác về các loại phương tiện. Với xe đạp họ muốn biết xem đó là loại xe thường hay xe địa hình. Tương tự với với xe máy và ô tô thì chúng ta cần biết phân khối xe. Chúng ta sẽ lại tạo file migrate để thêm trường `bicycle_type` và `horsepower` vào bảng `Vehicle`. 

Lúc này vấn đề sẽ bắt đầu xuất hiện. Nếu thêm thuộc tính như vậy các model sẽ không còn dùng chung tất cả các trường dữ liệu nữa. Trong thực tế mọi `bicycle` sẽ không có thuộc tính `horsepower` và tương tự với `car` và `motorcycle` sẽ không có `bicycle_type`. Nhưng nếu tạo file migrate kiểu vậy khi sử dụng STI thì tình huống như vậy sẽ xảy ra và kéo theo các vấn đề sau:
- Bảng lúc này sẽ có rất nhiều giá trị rỗng `nil`. Các giá trị này sẽ khiến các thao tác validation của chúng ta vất vả hơn khá nhiều.
- Khi bảng mở rộng chúng ta sẽ phải cân nhắc tới hiệu năng khi truy vấn nếu không thêm các bộ lọc. Ví dụ khi tìm kiếm một loại xe đạp theo `bicycle_type` hệ thống sẽ thực hiện truy vấn tất cả dữ liệu trong bảng kể cả nó là `Cars` hay `Motorcycles`
- Người dùng có thể thêm các dữ liệu không hợp lệ vào cơ sở dữ liệu do họ có thể tạo ra một loại xe đạp có phân khối là 100! Chúng ta sẽ cần validate và thiết kế app thật tốt để phòng tránh trường hợp này

Có thể thấy STI có khá nhiều nhược điểm và chúng ta chỉ nên dùng khi các model đều có các trường dữ liệu giống nhau và không thay đổi về lâu dài.

### Ưu điểm
- Dễ cài đặt
- DRY
### Nhược điểm
- Khó mở rộng: bảng dễ phình to do đó khó bảo trì và thực hiện truy vấn.
- Cần cân nhắc khi thêm model hoặc thuộc tính mới do các vấn đề đã viết ở trên.
- Cho phép tạo các objects không hợp lệ nếu không validate kĩ càng.
- Gây khó khăn khi cần validate hoặc truy vấn.
## Polymorphic Association - Liên kết đa hình
Sử dụng polymorphic associations, một model có thể thuộc về nhiều model khác nhau chỉ với một liên kết duy nhất. Polymorphic rất có ích khi có nhiều model không có quan hệ hay chia sẻ dữ liệu với nhau, nhưng lại đều có quan hệ với một model khác. Lý thuyết đọc hơi khó hiểu nhưng các tình huống thực tế phải sử dụng polymorphic association thì rất nhiều.

Với các trang mạng xã hội như Facebook, một cá nhân hay một group đều có thể đăng bài. Cá nhân và group này không liên quan tới nhau do vậy chúng có dữ liệu khác nhau. Một group có thể có các trường như `member_count` và `group_type` mà một người không có và ngược lại.

Nếu không sử dụng polymorphic association chúng ta sẽ có đoạn code sau
```ruby
class Post
  belongs_to :person
  belongs to :group
end

class Person
  has_many :posts
end

class Group
  has_many :posts
end
```
Trong trường hợp này chúng ta sẽ phải xem xét tới một vấn đề là khóa ngoại. Khóa ngoại thường là một id dùng để tìm kiếm các bản ghi trong các bảng liên quan. Nhưng bảng `Post` lúc này có tới tận hai trường là khóa ngoại: `group_id` và `person_id`. Khi tìm kiếm chủ của một bài đăng, chúng ta sẽ phải kiểm tra cả hai cột này để tìm ra khóa ngoại thay vì chỉ dựa vào một cột. Nhưng chuyện gì sẽ xảy ra nếu cả hai cột đều có giá trị? 

Polymorphic association sẽ giải quyết vấn đề này bằng cách gộp tất cả lại thành một liên kết duy nhất. Các class sẽ được biểu diễn như sau
```ruby
class Post
  belongs_to :postable, polymorphic: true
end

class Person
  has_many :posts, as :postable
end

class Group
  has_many :posts, as :postable
end
```
Cú pháp của Rails khi sử dụng polymorphic association là "-able" + tên class đóng vai trò đa hình (`:postable` với class `Post`). Để database biết chúng ta sử dụng polymorphic association, chúng ta sẽ dùng thêm các cột `_type` và `_id` cho class. Trường `postable_type` cho biết một post thuộc về model nào và trường `postable_id` cho biết id của người tạo post
```ruby
haley = Person.first
=> trả về một object của Person  
article = haley.posts.first
article.postable_type
=> "Person"
article.postable_id
=> 1 # id của object sở hữu article
new_post = haley.posts.new
# tạo Post object mới với các trường postable_type và postable_id có dữ liệu của object haley
```

Một polymorphic association chỉ là kết hợp của hai hay nhiều liên kết `belongs_to`. Với các liên kết `has_one` và `has_many` polymorphic association cũng hoạt động tương tự
```ruby
haley.posts
# trả về một mảng các ActiveRecord của post do haley tạo
```

### Vấn đề toàn vẹn dữ liệu
Khi sử dụng polymorphic association cần cẩn thận với tính toàn vẹn dữ liệu. Trong các quan hệ `belongs_to` thông thường, chúng ta sẽ sử dụng khóa ngoại để trỏ tới các bản ghi liên quan. Ngoài chức năng đấy ra khóa ngoại có nhiều tác dụng hơn việc chỉ hình thành một liên kết. Chúng còn giúp chúng ta tránh được các lỗi tham chiếu tới các bảng liên quan khác. Ví dụ nếu ai đó định tạo một object có khóa ngoại trỏ tới một object null sẽ gây lỗi. 

Không may là các class đóng vai trò đa hình lại không có khóa ngoại. Chúng ta đã dùng trường `_type` và `_id` để thay thế cho một khóa ngoại. Điều này đồng nghĩa với việc dữ liệu của chúng ta sẽ không được bảo vệ như khi sử dụng khóa ngoại. Rails và ActiveRecord rất tiện lợi, nhưng bất cứ ai có thể trực tiếp truy cập vào cơ sở dữ liệu đều có thể tạo hoặc update một bản ghi tham chiếu tới một bản ghi rỗng khác nếu chúng ta dùng polymorphic association.
```ruby
Group.find 1000
=> ActiveRecord::RecordNotFound: Couldn't find Group with 'id'=1000
# SQL
INSERT INTO POSTS (postable_type, postable_id) VALUES ('Group', 1000)
=> # thực hiện thành công dù cho bản ghi có id=1000 trong bảng Group không tồn tại 
```
Nhưng nếu ứng dụng được xây dựng cẩn thận thì chúng ta hoàn toàn có thể tránh được vấn đề này. Trong trường hợp các ứng dụng hoặc các database khác cần truy cập database của bạn, bạn nên xem xét lại việc sử dụng polymorphic để đảm bảo tính toàn vẹn cho dữ liệu.
### Ưu điểm:
- Dễ mở rộng khi dữ liệu gia tăng: các dữ liệu sẽ được lưu ở nhiều bảng khác nhau trong database tránh bị phình to.
- Dễ mở rộng khi có thêm nhiều model: có thể dễ dàng tạo thêm association cho các model với class đa hình.
- DRY
### Nhược điểm
- Việc có nhiều bảng sẽ khiến việc truy vấn khó khăn hơn.
- Khong có khóa ngoại. Trường `id` có thể tham chiếu tới tất cả các bảng liên quan khác có thể khiến việc truy vấn chậm hơn.
- Nếu bảng lớn thì sẽ tốn nhiều bộ nhớ để lưu giá trị trường `postable_type`
- Tính toàn vẹn dữ liệu bị giảm
## STI hay Polymorphic Association?
Cả STI lẫn Polymorphic Association đều có những ưu nhược điểm riêng. Trong hai ví dụ trên cả `Vehicle` lẫn `Postable` đều có thẻ sử dụng cả STI lẫn Polymorphic Association. Tuy vậy khi nào dùng thì qua hai ví dụ trên chúng ta cũng đã biết nên lựa chọn giải pháp nào rồi. Tổng hợp lại có bốn vấn đề chính bạn nên cân nhắc để lựa chọn giải pháp phù hợp nhất :
- **Cấu trúc cơ sở dữ liệu**: STI chỉ sử dụng duy nhát một bảng cho tất cả các model, trong khi polymorphic mỗi model đều có một bảng riêng.
- **Các trường dùng chung**: STI là lựa chọn tuyệt vời nếu các model của bạn có nhiều trường dùng chung. Nếu không hãy cứ dùng polymorphic
- **Các vấn đề trong tương lai**: hãy cân nhắc khi ứng dụng của bạn thay đổi và mở rộng. Nếu định dùng STI hãy nghĩ tới lúc bạn cần thêm các model và thuộc tính khác trong tương lai. Nếu cấu trúc không có gì thay đổi thì STI sẽ nhanh hơn khi truy vấn
- **Toàn vẹn dữ liệu**: nếu dữ liệu của bạn không được bảo vệ cẩn thận, polymorphic association sẽ là lựa chọn tồi.
## Tham khảo
[Single-table inheritance vs. polymorphic associations in Rails: find what works for you](https://medium.freecodecamp.org/single-table-inheritance-vs-polymorphic-associations-in-rails-af3a07a204f2#6a54)