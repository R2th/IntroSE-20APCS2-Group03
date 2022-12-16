Nếu bạn đã từng tạo một ứng dụng với nhiều hơn một model, bạn sẽ cần phải suy nghĩ mình sẽ phải sử dụng mối quan hệ gì giữa các model đó.

Khi mà độ phức tạp của ứng dụng tăng lên, có thể khó xác định được các model của bạn nên tồn tại những mối quan hệ nào?

Một tình huống thường xảy ra khi một số  model của bạn cần có quyền truy cập vào chức năng của model thứ 3. Hai phương thức mà Rails có thể áp dụng được là single-table inheritance (STI) và polymorphic association.

![](https://images.viblo.asia/4024c88f-e84e-4a13-825b-3f76ad7783d9.png)

Trong STI nhiều lớp con kế thừa từ một superclass với tất cả dữ liệu trong cùng một bảng trong cơ sở dữ liêu. Superclass có cột "type" để xác định lớp con nào thuộc đối tượng.

Trong polymorphic association, một model có thể belongs_to với một hoặc nhiều hơn models khác, mà chỉ cần định nghĩa một association. Mỗi model, bao gồm cả model polymorphic đều có bảng riêng trong cơ sở dữ liệu.

Bây giờ chúng ta sẽ tìm hiều từng phương thức để xem khi nào sẽ sử dụng chúng.

## Single-table inheritance

Ví dụ: Chúng ta đạng tạo ra một ứng dụng liệt kê các loại xe khác nhau được bán tại một đại địa phương. Đại lý này bán ôtô, xe máy và xe đạp.

Đối với mỗi chiếc xe, các đại lý muốn theo dõi giá, màu sắc kể cả những chiếc xe đã bán. Trong ví dụ này việc áp dụng STI là quyết định đúng đắn, bởi vì mỗi loại xe đại lý đều quan tâm đến tính chất giá, màu sắc và đã bán hay chưa, khi đó chúng ta có thể  dùng chung cùng một dữ liệu cho mỗi đối tượng (oto, xe máy, xe đạp).

Chúng ta có thể tạo ra một superclass `Vehicle` với các thuộc tính `color`, `price`, `purchased`. Mỗi lớp con (oto, xe máy, xe đạp) có thể kế thừa từ `Vehicle` và có subclass sẽ nhận được tất cả thuộc tính của superclass.

Tạo bảng `vehicles`:

```
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
Điều quan trọng khi tạo bảng cho superclass là phải có một cột `type`. Điều này báo cho Rails biết rằng chúng ta đang sử dụng STI và tất cả dữ liệu cho `Vehicle` và các lớp con đều được lưu trữ trên cùng một bảng.

Các model:

```
class Vehicle < ApplicationRecord
end

class Bicycle < Vehicle
end

class Motorcycle < Vehicle
end

class Car < Vehicle
end
```

Lợi ích khi sử dụng STI: bất kỳ phương thức hoặc validations trong lớp `Vehicle` đều được chia sẻ với lớp con. Chúng ta cũng có thể thêm các phương thức duy nhất vào bất kỳ lớp con nào nếu cần. Mặc dù đều cùng kế thừa cùng một lớp nhưng chúng độc lập nhau, các phương thức được định nghĩa trong lớp con đều không thể chia sẻ cho nhau.

```
mustang = Car.new(price: 50000, color: red)
harley = Motorcycle.new(price: 30000, color: black)

mustang.price
=> 50000

harley.price
=> 30000
```

### Adding functionality

Ví dụ: Cửa hàng đại lý quyết định thu thập thêm thông tin về các phương?

Với `Bicycles`, họ muốn biết mỗi chiếc xe đạp có phải là xe đạp đi đường bộ, núi hay xe hybrid. Còn `Cars` và `Motorcycles` họ muốn theo dõi mã lực.

Chúng ta sẽ tạo 1 migration để thêm cột `bicycle_type` và `horsepower` tới bảng `Vehicle`.

Nhưng trong trường hợp này tất cả thuộc tính của supperclass không cần phải chia sẻ hết cho các subclass. Bất kỳ `Bicycle` cũng không cần thuộc tính `horsepower` còn với `Car` hoặc `Motorcycles` sẽ không cần `bicycle_type`.

Tuy nhiên mỗi chiếc xe đạp trong bảng dữ liệu vẫn có trường `horsepower` và mỗi ô tô, xe máy cũng sẽ có trường `bicycle_type`.

Các vấn đề có thể xảy ra:

1. Dữ liệu trong bảng sẽ có nhiều giá trị `null` vì các đối tượng sẽ có các trường không áp dụng cho chúng. Các giá trị `null` có thể gặp vấn đề khi chúng ta thêm validations tới model của chúng.

2. Khi dữ liệu bảng tăng lên, chúng ta sẽ mất nhiều chi phí hiệu suất khi thực hiện truy vấn. Việc tìm kiếm một số `bicycle_type` sẽ phải tìm kiếm mọi thanh ghi trong bảng mặc dù chỉ có ở `Bicycles`, còn `Car` và `Motocycle` thì không.

3. Như vậy không có phương thức gì có thể ngăn ngừa người dùng thêm dữ liệu thừa, không phù hợp vào model. Ví dụ vẫn có thể tạo 1 `Bicycle` với `horsepower` = 100

Như vậy có thể thấy STI vẫn có một số sai sót. Nhưng với trường hợp model của bạn chia sẻ các trường dữ liệu mà không có khả năng thay đổi thì STI quả là một quyết định đúng đắn.

## Polymorphic Associations

Với polymorphic associations, một model có thể  có `belongs_to` với một hoặc nhiều hơn models khác, mà chỉ cần định nghĩa trên một association.

Điều này rất hữu ích khi một số model không có mối quan hệ hoặc chia sẻ dữ liệu với nhau, nhưng có một mối quan hệ với polymorphic class.

Ví dụ: Trên trang web Facebook, cả cá nhân và nhóm đều có thể chia sẻ bài viết.

Các các nhân và các nhóm không liên quan đến nhau và dữ liệu khác nhau. Một nhóm có thể có các trường `member_count` và `group_type` không áp dụng cho một các nhân được.

Trương hợp không sử dụng polymorphic associations.

```
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
Thông thường, để tìm ra người sở hữu một hồ sơ nào đó, chúng tôi nhìn vào cột đó là `foreign_key`. Foreign_key là id được sử dụng để tìm đối tượng liên quan trong bảng của model liên quan.

Tuy nhiên bảng `Post` sẽ có hai khóa ngoài: `group_id` và `person_id`.

Khi cố gắng tìm chủ sở hữu của một bài đăng, chúng tôi sẽ phải thực hiện một điểm để kiểm tra cả hai cột để tìm đúng ngoại ngữ, thay vì dựa vào một cột. Điều gì xảy ra nếu chúng ta gặp phải tình huống mà cả hai cột đều có giá trị?

Polymorphic associations sẽ giải quyết vấn đề này bằng cách gôpj chức năng này thành một liên kết. 

```
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
Quy ước Rails để đặt tên cho một hiệp hội đa hình sử dụng “-able” với tên lớp (: postable cho lớp Post). Điều này làm cho nó rõ ràng trong mối quan hệ của bạn mà lớp là polymorphic. Nhưng bạn có thể sử dụng tên bất kỳ cho polymorphic associations mà bạn thích.

Về database, để có thể sử dụng Polymorphic associations chúng ta cần phải có 2 cột `type` và `id` cho lớp polymorphic.

Cột `postable_type` ghi lại model bài đăng thuộc về, trong khi cột `postable_id` theo dõi id của đối tượng sở hữu:

```
haley = Person.first
=> returns Person object with name: "Haley"

article = haley.posts.first
article.postable_type
=> "Person"

article.postable_id
=> 1 # The object that owns this has an id of 1 (in this case a Person)

new_post = haley.posts.new()
# Automatically fills in postable_type and postable_id using haley object
```

Chú ý: polymorphic associations có thể làm việc với cả liên kết `has_one` và `has_many`

```
haley.posts
# returns ActiveRecord array of posts

haley.posts.first.content
=> "The content from my first post was a string..."
```

Sẽ có chút vấn đề khi bạn muốn lấy chủ sở hữu bài viết. Bởi chủ sở hữu bài viết có thể là một trong 2 class cá nhân hoặc nhóm. Nhưng vẫn có cách giải quyết nhanh chóng, bạn cần thêm 1 cột khóa ngoại và cột `type` cho class polymorphic. Bạn có thể tìm chủ sở hữu bài viết nhanh chóng:

```
new_post.postable
=> returns Person object

new_post.postable.name
=> "Haley"
```

### How to know which method to use

STI và polymorphic associations mặc dù không phải là giải pháp duy nhất cho quan hệ model `tree-like` nhưng cả hai đều có lợi thế rõ ràng.

Cả hai ví dụ `Vehicle` và `Postable` đều có thể triển khai được bằng cả 2 phương pháp. Tuy nhiên có một vài lý do để phân biệt phương thức nào tốt nhất trong tình huống nào.

Dưới đây là bốn yếu tố cần xem xét khi quyết định xem một trong các phương pháp này có phù hợp với nhu cầu của bạn hay không.

1. Database structure: STI chỉ sử dụng một bảng cho tất cả các lớp trong mối quan hệ, trong khi polymorphic association sử dụng một bảng cho mỗi lớp. Mỗi phương pháp đều có những ưu điểm và nhược điểm riêng khi ứng dụng phát triển
2. Shared data or state: STI là một lựa chọn tuyệt vời nếu các mô hình của bạn có nhiều thuộc tính được chia sẻ. Nếu không, polymorphic association có lẽ là sự lựa chọn tốt hơn.
3. Future concerns: Xem xét cách ứng dụng của bạn có thể thay đổi và phát triển. Nếu bạn đang xem xét STI nhưng nghĩ rằng bạn sẽ thêm các mô hình hoặc trường mô hình đi chệch khỏi cấu trúc được chia sẻ, bạn có thể muốn suy nghĩ lại về kế hoạch của mình. Nếu bạn nghĩ rằng cấu trúc của bạn có thể vẫn giữ nguyên, thì STI thường sẽ nhanh hơn để truy vấn.

## Tài liệu tham khảo
- https://guides.rubyonrails.org/association_basics.html
- https://medium.freecodecamp.org/single-table-inheritance-vs-polymorphic-associations-in-rails-af3a07a204f2
- https://launchschool.com/blog/understanding-polymorphic-associations-in-rails