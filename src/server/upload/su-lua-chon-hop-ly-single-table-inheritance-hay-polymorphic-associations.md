Khi xây dựng một ứng dụng có nhiều `model`, điều quan trọng là phải xác định rõ ràng các loại mối quan hệ được sử dụng để liên kết các `model` với nhau. Quy mô ứng dụng càng lớn thì việc xác định mối quan hệ nào nên tồn tại giữa các `model` càng khó.
Ví dụ một trường hợp chúng ta thường gặp phải, đó là: một số `model` này lại có quyền truy cập vào chức năng của một `model` thứ ba nào đó.<br><br>
![](https://images.viblo.asia/b610cacf-8a76-427e-b6d4-f885cafc159a.png)<br><br>
`Rails` có hỗ trợ hai phương thức để chúng ta "ứng phó" với những trường hợp này là:
| Single Table Inheritance | Polymorphic Associations |
| -------- | -------- | -------- |
| Nhiều `subclass` cùng kế thừa từ một `superclass`.| Một model có thể `belongs_to` nhiều model khác nhưng chỉ sử dụng một liên kết đơn. |
| Tất cả dữ liệu đều đặt ở một bảng trong cơ sở dữ liệu. `Superclass` có trường `type` để xác định `subclass` nào `belongs_to` đối tượng.| Mỗi model, cả `polymorphic model` đều có bảng riêng trong cơ sở dữ liệu.|
Đi sâu tìm hiểu thêm nhé ;) 
<br>
## Single Table Inheritance - STI

STI thích hợp sử dụng khi các model chia sẻ dữ liệu hay trạng thái cho nhau. Chúng ta có thể tùy chọn các hành vi được chia sẻ đó.<br>
<br>***Ví dụ:*** Một cửa hàng phân phối các loại xe: `Cars`, `Motorcycles`, `Bicycles`. Quản lý muốn theo dõi thông tin của từng xe, bao gồm: màu sắc xe (`color`), giá bán (`price`), tình trạng bán (`purchased`).<br>
Đây là một tình huống hoàn hảo cho việc dùng STI, những dữ liệu giống nhau sẽ được cung cấp cho từng class. <br>
<br>Tạo một superclass `Vehicle` với các thuộc tính `color`, `price` và `purchased`. Khi đó, các `class con` kế thừa từ nó có thể `get` tất cả các thuộc tính đó.<br>
<br>Và một điều hết sức quan trọng: cần thêm cột `type` cho `superclass`. Nó thông báo cho `Rails` biết, chúng ta đang dùng STI, muốn toàn bộ dữ liệu cho `Vehicle` và các lớp con của nó trong cùng một table cơ sở dữ liệu.
```Ruby
class CreateVehicles < ActiveRecord::Migration[5.2]
  def change
    create_table :vehicles do |t|
      t.string :color
      t.integer :price
      t.boolean :purchased, default: false
      t.string :type, null: false
    end
  end
end
```
Các class sẽ như sau:
```Ruby
class Vehicle < ApplicationRecord
end

class Car < Vehicle
end

class Motorcycle < Vehicle
end

class Bicycle < Vehicle
end
```
Bất kỳ `method` hay `validation` nào trên class `Vehicle` theo cài đặt như trên đều được chia sẻ với các `subclass` của nó. Ngoài ra, chúng ta còn có thể thêm các `method riêng` khác cho các subclass nếu cần thiết. Các subclass này đều chia sẻ trường dữ liệu giống nhau, nên chúng ta có thể thực hiện `gọi hàm` tương tự nhau trên các đối tượng từ các class khác nhau, nhưng các class này là `độc lập`.
```Ruby
ford = Car.new(color: black, price: 30000)
yamada = Bicycle.new(color: white, price: 182)

ford.price 
# => 30000
yamada.price
# => 182
```
### Thêm chức năng
Bây giờ, giả sử nhân viên quyết định thu thập thêm thông tin về các loại xe. Xe đạp thì muốn biết là xe đường bộ hay xe địa hình. Oto và moto thì cần thông tin mã lực (`horsepower`). Vì vậy, chúng ta sẽ thêm `bicycle_type` và `horsepower` vào `Vehicles` table.<br>
<br>À!!! Đã có vấn đề nảy sinh ở đây. `Bicycle` đương nhiên không cần tới thuộc tính `horsepower`, và ngược lại thằng `Car` và `Motorcycle` cũng không cần `bicycle_type`. Nhưng mỗi `Bicycle` trong bảng `Vehicles` bây giờ lại có trường `horsepower` và `Car`, `Motorcycle` lại có trường `bicycle_type`. Một số vấn đề có thể phát sinh trong tình huống này:<br>
1. Các đối tượng sẽ có trường không sử dụng làm cho table có nhiều giá trị `null`. Những giá trị `null` này là nguyên nhân phát sinh vấn đề khi thực hiện `validation` model.
2. Khi table mở rộng cần chú ý tới hiệu năng truy vấn. Ví dụ, khi thực hiện search theo `bicycle_type`, sẽ duyêt toàn bộ hàng trong table kể cả với `Cars` và `Motorcycles`.
3. Người dùng hoàn toàn có thể thêm dữ liệu `không hợp lệ`. Do đó, cần `xác thực` và thiết kế hệ thống để ngăn chặn việc tạo đối tượng không hợp lệ.

STI còn nhiều nhược điểm và chỉ nên dùng khi các model chia sẻ dữ liệu giống nhau, không thay đổi.
### Điểm mạnh
* Cài đặt dễ dàng
* `DRY` - Lưu code trùng lặp bằng cách sử dụng các thuộc tính được thừa kế và chia sẻ.
* Cho phép các subclass có hành vi riêng của mình khi cần.
### Điểm yếu
* Khi dữ liệu phát triển, bảng sẽ to ra và khi ấy khó thực hiện truy vấn hay duy trì.
* Cần chú ý khi thêm các model hay trường mới mà không liên quan tới sự chia sẻ chung.
* Cho phép tạo các đối tượng không hợp lệ nếu `validation` không hiệu quả.
* Nhiều giá trị `null` trong table, khó `validate` và `truy vấn`.

## Polymorphic Associations - PA
Một model có thể `belongs_to` nhiều model chỉ với một `liên kết duy nhất`. Thích hợp khi một số model không có quan hệ hay chia sẻ dữ liệu với model khác, nhưng lại có quan hệ với class đa hình.<br>
<br>***Ví dụ:*** Một cửa hàng, các nhân viên (`Employee`) và sản phẩm (`Product`) đều có ảnh của mình. Nhân viên và sản phẩm không có liên quan với nhau, do đó chúng có dữ liệu khác nhau. `Employee` có trường như `admin` hay `gender` không áp dụng được cho `Product` và ngược lại.<br>
<br>Nếu không có liên kết đa hình, chúng ta cài đặt như thế này:
```ruby
class Picture < ApplicationRecord
  belongs_to :employee
  belongs_to :product
end
 
class Employee < ApplicationRecord
  has_many :pictures
end
 
class Product < ApplicationRecord
  has_many :pictures
end
```
Bình thường, để tìm ra chủ sở hữu một `picture`, chúng ta nhìn cột `foreign_key`. `Foreign_key` là `id` được sử dụng để tìm kiếm bản ghi phù hợp trong bảng của model liên quan.<br>
<br>Tuy nhiên, `Picture` có hai khóa ngoại: `employee_id` và `product_id`. Vấn đề là ở đây. Khi thực hiện tìm chủ sở hữu `picture`, sẽ phải thực hiện kiểm tra `cả hai` cột để tìm đúng khóa ngoại, thay vì một cột. Điều gì xảy ra nếu gặp phải tình huống mà cả hai cột đều hợp lệ?<br>
<br>PA giải quyết vấn đề này bằng cách gộp chức năng thành một liên kết duy nhất. 
```Ruby
class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true
end
 
class Employee < ApplicationRecord
  has_many :pictures, as: :imageable
end
 
class Product < ApplicationRecord
  has_many :pictures, as: :imageable
end
```
Theo quy ước, Rails đặt tên một liên kết đa hình là `tên class` kết hợp với đuôi `_able`. Điều này thể hiện rõ ràng trong mối quan hệ rằng nó là một `class đa hình`. Nhưng cũng có thể sử dụng bất kỳ tên nào cho liên kết đa hình, ví dụ ở đây dùng `:imageable` chứ không phải `:pictureable` cho `class Picture`.<br>
<br>Và quan trọng hơn, để cơ sở dữ liệu biết chúng ta sử dụng liên kết đa hình, cần thêm các cột đặc biệt `type` và `id` cho class đa hình. `:imageable_type` cho biết `picture` thuộc model nào, trong khi cột `:imageable_id` cho biết `id` của chủ sở hữu picture đó.
```Ruby
@employee = Employee.first
# trả về Employee object 

@employee.pictures
# trả về một collection các pictures của @employee

avatar = @employee.pictures.first
avatar.imageable_type
# => "Employee"
avatar.imageable_id
# => 1 

new_picture = @employee.pictures.new()
# Tự động điền vào imageable_type và imageable_id thông tin của @employee object
```
Một liên kết đa hình chỉ là sự kết hợp của hai hoặc nhiều liên kết `belongs_to`. Do vậy, có thể làm tương tự như khi sử dụng hai model có liên kết `belongs_to`. Với quan hệ `has_one` và `has_many`, PA cũng hoạt động tương tự.<br>
<br>Cũng có thể truy cập vào `parent` của một thể hiện `@picture` của model `Picture` qua `@picture.imageable`. Để thực hiện điều này, cần `khai báo` cả cột `khóa ngoạ` và cột `type` trong model khai báo `interface` đa hình:
```Ruby
class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.string :name
      t.references :imageable, polymorphic: true, index: true
      t.timestamps
    end
  end
end
```
Ngoài ra, Rails thực hiện một số bảo mật trong các liên kết đa hình. Chỉ các class là một phần của liên kết mới có thể được include dưới dạng `imageable_type`:
```Ruby
new_picture.update(imageable_type: "FakeClass")
=> NameError: uninitialized constant FakeClass
```
### Xâm phạm toàn vẹn dữ liệu

Trong một liên kết `belongs_to` bình thường, chúng ta sử dụng các khóa ngoại để `tham chiếu` liên kết. Thực sự chúng có nhiều quyền hơn là việc chỉ tạo một liên kết. Các khóa ngoại cũng ngăn các lỗi tham chiếu bằng cách yêu cầu các đối tượng được tham chiếu tới phải tồn tại trong table. Xuất hiện lỗi khi tham chiếu tới đối tượng null.<br>
<br>Mà các class đa hình lại không thể có các khóa ngoại, sử dụng `type` và `id` thay khóa ngoại. Điều này có nghĩa là chúng ta `mất đi` sự bảo vệ của các khóa ngoại. Nếu ai đó có quyền `truy cập trực tiếp` vào cơ sở dữ liệu thì đều có thể tạo hoặc cập nhật các đối tượng tham chiếu đến các đối tượng `null`.<br>
<br>***Ví dụ:*** `Picture` vẫn được tạo ngay cả khi `Product` được liên kết không tồn tại:
```Ruby
Product.find(500)
# => ActiveRecord::RecordNotFound (Couldn't find Product with 'id'=500)

# SQL
INSERT INTO PICTURES (imageable_type, imageable_id) VALUES ('Product', 500)
# => vẫn thực hiện thành công dù không có bản ghi Product có id = 500 tồn tại
```
May mắn, vấn đề vẫn có thể ngăn chặn được nếu xây dựng ứng dụng cẩn thận. Nếu các ứng dụng hoặc cơ sở dữ liệu khác cần truy cập vào cơ sở dữ liệu, bạn nên xem xét các phương pháp khác thay thế hơn là sử dụng liên kết đa hình nhằm đảm bảo toàn vẹn dữ liệu.

### Điểm mạnh
* Dễ dàng mở rộng quy mô dữ liệu: dữ liệu được phân phối trên một số bảng khác nhau để giảm thiểu tối đa bảng.
* Dễ dàng mở rộng số lượng model: nhiều model hơn có thể dễ dàng kết hợp với các class đa hình.
* `DRY`: tạo một class sử dụng cho nhiều class khác.

### Điểm yếu
* Nhiều bảng hơn có thể làm cho các truy vấn khó khăn hơn và tốn kém hơn khi dữ liệu phát triển.
* Không thể có khóa ngoại. Cột `id` có thể tham chiếu bất kỳ tới model table nào được liên kết, điều này làm chậm truy vấn. Nó phải kết hợp với cột `type`.
* Nếu bảng lớn, cần nhiều không gian lưu trữ các giá trị chuỗi cho `imageable_type`.
* Toàn vẹn dữ liệu bị xâm phạm.

## Vậy chọn STI hay Polymorphic Associations?

STI và PA đều có điểm mạnh và yếu riêng, đôi khi có một số điểm giống nhau khi sử dụng. Tùy hoàn cảnh mà phương pháp này có lợi thế hơn phương pháp kia.<br>
<br>Và đây là bốn yếu tố cần xem xét khi quyết định lựa chọn một trong hai phương pháp này, liệu rằng nó có phù hợp với nhu cầu của bạn hay không?
|STT|Yếu tố| Ý nghĩa|
| -------- | -------- | -------- |
| 1 | Cấu trúc của cơ sở dữ liệu | STI chỉ sử dụng một bảng cho tất cả các class trong liên kết, trong khi PA mỗi class đều có bảng riêng.|
| 2 | Dữ liệu, trạng thái được chia sẻ | STI là một tùy chọn tuyệt vời nếu các model của bạn có nhiều thuộc tính được chia sẻ. Nếu không, polymorphic association là một quyết định hợp lý. |
| 3 | Vấn đề trong tương lai| Xem xét cách ứng dụng của bạn có thể thay đổi và phát triển. Nếu bạn đang cân nhắc một STI nhưng nghĩ rằng bạn sẽ thêm các model hoặc các trường model đi chệch khỏi cấu trúc được chia sẻ, bạn có thể muốn suy nghĩ lại. Còn nếu bạn cho rằng cấu trúc của bạn vẫn giữ nguyên, thì STI sẽ truy vấn nhanh hơn.|
| 4 | Toàn vẹn dữ liệu | Nếu dữ liệu không được chứa bảo vệ chắc chắn, thì STI là sự lựa chọn đúng đắn hơn PA.|

<br>Tham khảo
1. [STI & Polymorphic Association](https://medium.freecodecamp.org/single-table-inheritance-vs-polymorphic-associations-in-rails-af3a07a204f2)
2. [Polymorphic Association](https://guides.rubyonrails.org/association_basics.html#polymorphic-associations)