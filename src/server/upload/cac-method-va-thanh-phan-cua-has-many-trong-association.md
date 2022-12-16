# Association
Trong Rails, association là một kết nối giữa hai mô hình Active Record. 

Tại sao chúng ta cần sự liên kết giữa các mô hình? 

Bởi vì chúng làm cho các hoạt động phổ biến đơn giản và dễ dàng hơn trong code của chúng ta.
## Has_many

Association has_many chỉ ra một kết nối một-nhiều với một mô hình khác. Đây thường là association được sử dụng nhiều nhất trong Ruby On Rails

Has_many có đầy đủ thành phần là 
```
has_many(name, scope, options, &extension)
```
Nếu bạn chỉ khai báo 
```
has_many :books 
```
nghĩa là bạn đang khai báo has_many :books với **name** là books, **scope** là nil và không có **option** nào

### Method của Has_many
Trong đó, sẽ có các method để chúng ta có thể truy xuất và truy vấn các **collection** của các đối tượng liên quan đến nó:

Ở đây, mình sử dụng **collection** đại diện cho đối số truyền vào, giả sử có collection.empty?,  bạn khai báo has_many :books thì sẽ tương đương với books.empty? 

**Sau đây là các method của has_many: **

**collection**: Trả về một mảng của tất cả các đối tượng liên quan đến nó. Một mảng trống được trả về nếu không tìm thấy.

Ví dụ: Có 2 model là Author và Book. 1 Author thì có nhiều Books

Trong model Author chúng ta khai báo
```
has_many :books 
```

Trong model Book chúng ta khai báo
```
belongs_to :author 
```

Khi đó để trả về mảng có tất cả các books liên quan đến author của nó

Chúng ta cùng test thử trong Rails Console

![](https://images.viblo.asia/a742c38b-c8a3-4f31-b010-737c771212a7.png)
Dòng thứ nhất, khởi tạo đối tượng author với author thứ nhất trong database

Sau đó, author.books sẽ trả về 1 mảng books liên quan đến author thứ nhất là book với tên Book 1, Book 2, Book 3

**collection<<(object, …)** : Thêm một hoặc nhiều object vào collection. Thao tác này sẽ ngay lập tức kích hoạt cập nhật SQL mà không cần phải gọi lời lưu hoặc cập nhật trên object cha, trừ khi object cha là bản ghi mới

Ví dụ: 

![](https://images.viblo.asia/f2aed760-bd93-4018-8bdf-5a1e95e10f0c.png)

Khởi tạo object book với name là "Book 4"

Thêm object này vào collection bằng cách author.books<< book như hình trên

**collection.delete(object, …)**: Loại bỏ một hoặc nhiều object khỏi collection bằng cách đặt khóa ngoại của chúng thành NULL. Các object sẽ bị destroyed nếu chúng được liên kết với dependent: :destroy  và xóa nếu chúng được liên kết với người phụ thuộc:: delete_all.

**collection.destroy(object, …)**: Loại bỏ một hoặc nhiều object khỏi collection bằng cách chạy *destroy* trên mỗi bản ghi

**collection_singular_ids**: Trả về mảng các id của object liên quan

VD: author.book_ids

**collection.size**: Trả về số lượng các object mà được associated

VD: author.books.size

**collection.build(attributes = {}, …)**: Trả về một hoặc nhiều object của collection được khởi tạo với các attributes và được liên kết với object này thông qua khóa ngoại nhưng chưa được lưu
VD: author.books.build (author.books.new là 1 cách viết khác của build nhưng chức năng đều tương tự)
![](https://images.viblo.asia/e0d1b59b-dcc8-4529-bcfc-e0a781c6a71e.png)

**collection.create(attributes = {}):** Trả về 1 object mới của collection mà đã được khởi tạo với attributes, liên kết với object này thông qua khóa ngoại, và đã được lưu (nếu nó pass validation).
![](https://images.viblo.asia/65133123-8df0-48de-8a72-9c09b29c23f3.png)
### Thành phần hay dùng trong Has_many
Đó là các method cơ bản hay được dùng trong has_many. Sau đây là các thành phần của has_many giúp chúng ta có ích hơn khi dùng nó. Bạn có thể dùng hoặc không dùng nó cũng đều được

**:class_name**:  Bạn có thể chỉ định tên của association bằng với tên khác
Có has_many :books, bạn đang muốn đổi tên association sang diaries chẳng hạn
VD: Bạn khai báo 
```
class Author < ApplicationRecord
  has_many :diaries, class_name: "Book"
end
```

Kết quả vẫn ra như bình thường

![](https://images.viblo.asia/78d5f0b6-64fd-4269-b429-aafb9c26c271.png)

**:foreign_key**: Chỉ định khóa ngoại của association đó. Theo mặc định thì Rails sẽ xác định khóa ngoại sẽ là tên class + hậu tố id
Vì thế, lớp Author có has_many :books, thì lớp Book sẽ có khóa ngoại là author_id. Sử dụng option này nếu bạn sử dụng khóa ngoại với tên khác

**:primary_key**: Chỉ định tên của cột để sử dụng làm khóa chính cho association. Theo mặc định, đây là id.

**:dependent**:  Kiểm soát những gì xảy ra với các object con được liên kết khi object bị hủy. 
Lưu ý rằng chúng được thực hiện như callbacks, và Rails thực hiện callbacks theo thứ tự. Do đó, các callbacks khác có thể ảnh hưởng đến :dependent, và :dependent có thể ảnh hưởng đến các callbacks khác. Trong đó: 

*:destroy*: các object được liên kết với object cha sẽ bị phá hủy

VD:   has_many :books, dependent: :destroy

*:delete_all* : các object được liên kết sẽ bị xóa trực tiếp từ database (nên callbacks sẽ không được thực thi).

*:nullify* : chỉ định khóa ngoại thành NULL. Callbacks không được thực thi