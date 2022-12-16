Nếu bạn đã từng tạo một ứng dụng với nhiều hơn một mô hình (model), bạn sẽ cần phải suy nghĩ về loại mối quan hệ sẽ sử dụng giữa các mô hình đó.
Khi độ phức tạp của ứng dụng tăng lên, sẽ khó để xác định giữa các mô hình của bạn nên tồn tại những mối quan hệ nào?
Tình huống thường xảy ra là khi một số mô hình của bạn cần có quyền truy cập vào chức năng của mô hình thứ 3. Hai phương thức mà Rails cung cấp để giải quyết vấn đề này là Single-table inheritance(STI) và Polymorphic association.
![](https://images.viblo.asia/ae01aff3-0c25-4aa2-8c66-d559553b8c75.png)
* Với Single-table inheritance(STI), nhiều lớp con sẽ kế thừa từ một lớp cha với tất cả dữ liệu trong cùng một bảng trong cơ sở dữ liệu. Lớp cha có một cột là "type" để xác định lớp con nào thuộc về một đối tượng.
* Với Polymorphic association, một mô hình có thể belongs_to (thuộc về) với một hoặc nhiều mô hình khác bằng cách sử dụng duy nhất một liên kết. Mỗi mô hình, bao gồm cả mô hình đa hình (model polymorphic) đều có một bảng riêng trong cơ sở dữ liệu.
Bây giờ, hãy cùng xem xét từng phương pháp để xác định xem khi nào thì sử dụng chúng.
<br>**Single-Table Inheritance**<br>
Cách đề biết khi nào nên sử dụng STI là khi các mô hình của bạn có dữ liệu hoặc trạng thái (data/state) được chia sẻ. Và hành vi chia sẻ là tùy chọn.
Hãy giả sử chúng ta cần tạo ra một ứng dụng liệt kê các loại xe khác nhau được bán tại một đại lý. Sản phẩm chúng ta có là ôtô, xe máy và xe đạp.
Đối với mỗi chiếc xe, đại lý muốn theo dõi giá, màu sắc và liệu những chiếc xe đó có được mua hay không. Với ví dụ này việc áp dụng STI là một lựa chọn đúng đắn, bởi mỗi loại xe đại lý đều quan tâm đến các tính chất như giá, màu sắc và đã bán hay chưa. Chúng ta có thể dùng cùng một dữ liệu cho mỗi đối tượng.
Chúng ta sẽ có lớp cha là `Vehicle` với các thuộc tính `color, price, purchased`. Mỗi lớp con (ôtô, xe máy và xe đạp) có thể kế thừa từ `Vehicle` và tất cả đều có thể nhận được các thuộc tính giống nhau.
Migration để tạo bảng `Vehicle` có thể sẽ trông như sau:
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
Điều quan trọng khi áp dụng STI là chúng ta phải tạo cột `type` cho lớp cha. Điều này cho rails biết rằng chúng ta đang sử dụng STI và muốn tất cả dữ liệu cho `Vehicle` và các lớp con của nó nằm trong cùng một bảng trong cơ sở dữ liệu.

Các lớp mô hình của chúng ta sẽ như sau:
```
class Vehicle < ApplicationRecord
```
```
class Bicycle < Vehicle
```
```
class Motorcycle < Vehicle
```
```
class Car < Vehicle
```
Phương pháp này rất tuyệt vời vì bất kỳ phương thức hoặc xác thực nào trong lớp cha `Vehicle` đều được chia sẻ với mỗi lớp con của nó. Chúng ta có thể thêm các phương thức duy nhất vào bất kỳ lớp con nào nếu cần. Chúng độc lập với nhau và các phương thức của chúng không thể chia sẻ cho nhau.
Ngoài ra, vì chúng ta biết rằng các lớp con chia sẻ các trường dữ liệu giống nhau, chúng ta có thể thực hiện các lệnh gọi giống nhau trên các đối tượng từ các lớp khác nhau:
```
mustang = Car.new(price: 50000, color: red)harley = Motorcycle.new(price: 30000, color: black)
```
```
mustang.price=> 50000
```
```
harley.price=> 30000
```
<br>**Adding functionality**<br>
Bây giờ, ta sẽ giả sử rằng đại lý quyết định thu thập thêm thông tin về các loại xe.
Với `Bicycles`, họ muốn biết mỗi chiếp xe có phải là xe đạp đi đường trường, leo núi hay xe đạp lai. Đối với `Cars` và Motorcycles, họ muốn theo dõi mã lực.
Chúng ta sẽ tạo một migration để thêm cột `bicycle_type` và `horsepower` tới bảng `Vehicle`.
Với Bicycles, họ muốn biết mỗi chiếc xe đạp có phải là xe đạp đi đường bộ, núi hay xe hybrid. Còn `Cars` và `Motorcycles` họ muốn theo dõi mã lực.
Chúng ta sẽ tạo 1 migration để thêm cột bicycle_type và horsepower tới bảng Vehicle.
Và thật hiển hiên rằng, các mô hình của chúng ta không còn chia sẻ dữ liệu một cách hoàn hảo nữa. Đối tượng `Bicycles` không cần thuộc tính `horsepower` cũng như `Cars` và `Motorcycles` không cần thuộc tính `bicycle_type`.
Tuy nhiên, thực tế mỗi chiếc xe đạp trong bảng dữ liệu vẫn có trường `horsepower` và mỗi ô tô, xe máy cũng sẽ có trường `bicycle_type`.
Vậy, các vấn đề sẽ nảy sinh : 
1. Bảng của chúng ta sẽ có rất nhiều giá trị null ( nil trong trường hợp của Ruby) vì các đối tượng sẽ có các trường không áp dụng cho chúng. Các giá trị null có thể gặp vấn đề khi chúng ta thêm xác nhận (validations) tới các mô hình của chúng.
2. Khi dữ liệu bảng dần tăng lên, có thể gặp phải chi phí hiệu suất khi truy vấn nếu không thêm bộ lọc. Việc tìm kiếm một số `bicycle_type` sẽ phải tìm kiếm mọi bản ghi trong bảng mặc dù chỉ có ở `Bicycles`, còn `Cars` và `Motocycles` thì không.
3. Như vậy, không có gì ngăn cản người dùng thêm dữ liệu “không phù hợp” vào sai mô hình. Ví dụ: Một người dùng có thể tạo một `Bicycles` với `horsepower =1000` . Chúng ta sẽ cần xác thực và thiết kế ứng dụng tốt để ngăn việc tạo ra một đối tượng không hợp lệ.
Vì vậy, chúng ta có thể thấy STI có một số sai sót. Nó rất tốt cho các ứng dụng mà mô hình của bạn chia sẻ các trường dữ liệu và không có khả năng thay đổi.
<br>**Polymorphic Associations**<br>
Với các liên kết đa hình (Polymorphic Associations), một mô hình có thể thuộc về (belongs_to) một số mô hình bằng một liên kết (association) duy nhất.
Khi một số mô hình không có mối quan hệ hoặc chia sẻ dữ liệu với nhau, nhưng có một mối quan hệ với lớp đa hình.
Ví dụ, hãy nghĩ về một trang mạng xã hội như Facebook. Trên Facebook, cả cá nhân và nhóm đều có thể chia sẻ bài viết.
Các các nhân và các nhóm không liên quan đến nhau và kiểu dữ liệu khác nhau. Một nhóm có thể có các trường `member_count` và `group_type` không áp dụng cho một các nhân được.
Trường hợp không sử dụng liên kết đa hình.
```
class Post  belongs_to :person  belongs to :groupend
```
```
class Person  has_many :postsend
```
```
class Group  has_many :postsend
```
Thông thường, để tìm ra ai sở hữu một hồ sơ nhất định, chúng ta nhìn vào cột đó là `foreign_key`. `Foreign_key` là một id được sử dụng để tìm đối tượng liên quan trong bảng của mô hình liên quan.
Tuy nhiên bảng `Post` sẽ có hai khóa ngoài: `group_id` và `person_id`. Điều này sẽ có vấn đề.
Khi cố gắng tìm chủ sở hữu của một bài đăng, chúng ta sẽ phải kiểm tra cả hai cột để tìm chính xác khóa ngoại, thay vì dựa vào một. Điều gì xảy ra nếu chúng ta gặp phải trường hợp cả hai cột đều có giá trị?
Liên kết đa hình sẽ giải quyết vấn đề này bằng cách gộp chức năng này thành một liên kết.
Chúng ta có thể đại diện cho các lớp của mình như thế này:
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
Quy ước Rails để đặt tên cho một kết hợp đa hình sử dụng “-able” với tên lớp ( `:postable` cho lớp `Post`). Điều này làm rõ trong các mối quan hệ của bạn lớp nào là đa hình. Nhưng bạn có thể sử dụng bất kỳ tên nào cho liên kết đa hình mà bạn muốn.
Đối với cơ sở dữ liệu, chúng ta cần có 2 cột type và id cho lớp đa hình này.
Cột postable_type ghi lại mô hình mà bài viết thuộc về, trong khi cột postable_id theo dõi id của đối tượng sở hữu:
```
haley = Person.first=> returns Person object with name: "Haley"
```
```
article = haley.posts.firstarticle.postable_type=> "Person"
```
```
article.postable_id=> 1 # The object that owns this has an id of 1 (in this case a Person)
```
```
new_post = haley.posts.new()# Automatically fills in postable_type and postable_id using haley object
```
Một liên kết đa hình chỉ là sự kết hợp của hai hoặc nhiều liên kết thuộc về (belongs_to). Do đó, bạn có thể hành động giống như cách bạn làm khi sử dụng hai mô hình có liên kết thuộc về(belongs_to).
Chú ý: Liên kết đa hình có thể làm việc với cả has_one và has_many
```
haley.posts# returns ActiveRecord array of posts
```
```
haley.posts.first.content=> "The content from my first post was a string..."
```
Một điểm khác biệt là đi ngược lại từ một bài đăng để truy cập chủ sở hữu của nó, vì chủ sở hữu của nó có thể đến từ một trong số các lớp.
Để thực hiện điều đó nhanh chóng, bạn cần thêm cột khóa ngoại và cột `type` vào lớp đa hình . Bạn có thể tìm thấy chủ nhân của một bài đăng bằng cách sử dụng `postable`:
```
new_post.postable=> returns Person object
```
```
new_post.postable.name=> "Haley"
```
<br>**Summary**<br>
Single-Table Inheritance và Polymorphic associations mặc dù không phải là giải pháp duy nhất cho quan hệ mô hình tree-like nhưng cả hai đều có ưu nhược điểm riêng.
Cả hai ví dụ `Vehicle` và `Postable` đều có thể triển khai được bằng cả 2 phương pháp. Tuy nhiên có một vài lý do để phân biệt phương thức nào tốt nhất trong tình huống nào.
1. Database structure: STI chỉ sử dụng một bảng cho tất cả các lớp trong mối quan hệ, trong khi liên kết đa hình (polymorphic associations) sử dụng một bảng cho mỗi lớp.
2. Shared data or state: STI là một lựa chọn tuyệt vời nếu các mô hình của bạn có nhiều thuộc tính được chia sẻ. Nếu không, liên kết đa hình (polymorphic associations) có lẽ là sự lựa chọn tốt hơn.
3. Future concerns: Xem xét cách ứng dụng của bạn có thể thay đổi và phát triển. Nếu bạn đang xem xét STI nhưng nghĩ rằng bạn sẽ thêm các mô hình hoặc trường mô hình khác với cấu trúc được chia sẻ, bạn có thể muốn suy nghĩ lại kế hoạch của mình. Nếu bạn cho rằng cấu trúc của mình có khả năng được giữ nguyên, STI nói chung sẽ nhanh hơn để truy vấn.
4. Data integrity: Nếu một ứng dụng sử dụng cơ sở dữ liệu của bạn, liên kết đa hình có lẽ là một lựa chọn tồi tệ vì dữ liệu của bạn sẽ bị xâm phạm.
<br>**References**<br>
https://www.freecodecamp.org/news/single-table-inheritance-vs-polymorphic-associations-in-rails-af3a07a204f2/#:~:text=In%20Single%2DTable%20Inheritance%20(STI,models%20using%20a%20single%20association.