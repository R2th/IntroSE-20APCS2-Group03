Bản thân khi tiếp xúc với bất kỳ một ngôn ngữ mới nào, về cơ bản ban đầu mọi người chúng ta đều giống nhau, đều mắt chữ A, miệng chữ O... tóm lại là có một cái nhìn đầy lạ lẫm. Theo thời gian tìm hiểu và thực hành thực sự thì mỗi người sẽ bồi đắp thêm những kỹ năng và hiểu biết nhất định về ngôn ngữ đó. Từ quen mắt, quen tay cho đến thành thạo và hiểu rõ. Tôi đến với Ruby rất tình cờ và đầy bất ngờ khi tham gia chương trình workshop với tên gọi Rails Girl - chương trình dành cho những cô gái đam mê, yêu thích lập trình hay những cô nàng chưa có một cảm tình nào đặc biệt nhằm mục đích nhen nhóm và truyền dẫn cái ngọn lửa đam mê đó.

Ngay từ đầu, khi tiếp xúc và được giới thiệu về một ngôn ngữ còn khá mới mẻ ở Việt Nam, tôi đã thực sự bất ngờ về tốc độ tạo một website rất đơn giản của Ruby chỉ trong vài nốt nhạc. Cảm thấy đầy hứng thú để tìm tòi, khám và phá cái ngôn ngữ đầy tính bất ngờ này. Tuy nhiên, chỉ học theo làm nhanh mà không thực sự hiểu rõ thì không phải là cách hay lâu dài để làm việc với một ngôn ngữ bất kỳ. Tiên quyết vẫn là tư duy của bản thân bạn và đồng thời là những thời gian bạn bỏ ra để học hỏi, tìm hiểu và thực hành. Từ việc nhận thấy những hạn chế của bản thân về những kiến thức của cái thứ ngôn ngữ đang làm việc mỗi ngày nhưng thực chất vẫn chưa hiểu rõ về nó. Chuỗi bài viết này, tôi dành thời gian để dịch cũng như tìm hiểu lại những kiến thức từ dạng basic đến advance để củng cố lại những kiến thức của bản thân và tìm hiểu về những góc ngách nhỏ nhất đã từng bỏ sót qua trong qúa trinh được trainning. Hay nói một cách mỹ từ là "Yêu lại từ đầu" =))

Active Record Basics
Mục đích của bài viết, để chúng ta hiểu và biết thêm về:

Object Relational Mapping và Active Record trong Rails là gì, và sử dụng chúng như thế nào?
Cách phù hợp hóa Active Record với mô hình MVC.
Làm thế nào mà Active Record model thao tác dữ liệu được lưu trữ trong một CSDL quan hệ.
Convention về cách đặt tên Active Record schema.
Các khái niệm về migration, validations, callbacks database.

# 1. Active Record là gì?
Chắc hẳn chúng ta không còn xa lạ với mô hình MVC. Trong Ruby thì Actice Record chính là M trong mô hình MVC

which is the layer of the system responsible for representing business data and logic

hiểu nôm na là nó được xem như là layer của hệ thống với chức năng trình diễn những logic và data nghiệp vụ. Tạo điều kiện cho việc khởi tạo và sử dụng các đối tượng nghiệp vụ, có dữ liệu cần lưu trữ liên tục đến một DataBase. Đó như là một implemention của mẫu Active Record mà bản thân của nó là một mô tả cho hệ thống Object Relational Mapping.

## 1.1 The Active Record Pattern:
Active Record được mô tả bởi Martin Fowler trong cuốn sách của ông Patterns of Enterprise Application Architecture. Trong Active Record, các đối tượng mang cả dữ liệu và hành vi liên tục hoạt động trên dữ liệu đó. Đảm bảo logic truy cập dữ liệu là một phần của đối tượng hỗ trợ người dùng đối tượng cách ghi và đọc dữ liệu từ DB.

## 1.2. Ánh xạ quan hệ đối tượng(ORM - Object Relational Mapping):
Gọi tắt là ORM - là một kỹ thuật kết nối các đối tượng của một ứng dụng tới các bảng tương ứng trong một hệ thống quản trị cơ sở dữ liệu quan hệ. Sử dụng ORM, các thuộc tính và quan hệ của các đối tượng trong một ứng dụng có thể dễ dàng lưu trữ và truy xuất từ DB mà không cần viết các câu lệnh SQL trực tiếp.

## 1.3: Active Record được xem như một framework ORM:
Đưa ra nhiều cơ chế và quan trọng là những khả năng sau:
Represent models and their data.
Represent associations between these models.
Represent inheritance hierarchies through related models.
Validate models before they get persisted to the database.
Perform database operations in an object-oriented fashion.

# 2. Quy ước về config trong Active Record
Khi viết các ứng dụng sử dụng các ngôn ngữ lập trình khác hoặc các khuôn khổ, có thể cần phải viết rất nhiều mã cấu hình. Điều này đặc biệt đúng đối với các khuôn khổ ORM nói chung. Tuy nhiên, nếu bạn làm theo các quy ước được chấp nhận của Rails, bạn cần phải viết cấu hình rất ít khi tạo các mô hình Active Record.

## 2.1. Quy ước về đặt tên:
Active Record sẽ dùng một số quy ước đặt tên mặc định, để tìm ra cách mapping các model với các bảng được khởi tạo trong DB. Rails sẽ pluralize tên class để tìm râ table tương ứng trong DB. Cơ chế chuyển đổi của Rails rất mạnh mẽ, có khả năng thay đổi các từ thường xuyên và bất thường sang dạng số nhiều (và singularize). Khi sử dụng các tên class có hai từ trở lên thì tên class model phải tuân theo các quy ước của Ruby, sử dụng mẫu CamelCase, trong khi tên bảng phải chứa các từ được phân cách bằng dấu gạch dưới.

Ví dụ như sau:

```
| Model / Class | Table / Schema |
| LineItem | line_items |
| Deer | deers |
```

## 2.2: Schema Conventions
Active Record sử dụng các quy ước đặt tên cho các cột trong các bảng cơ sở dữ liệu, tùy thuộc vào mục đích của các cột này.
Foreign keys - được đặt tên theo mẫu singularized_table_name_id (ví dụ: item_id, order_id). Là những field mà Active Record sẽ tìm kiếm khi bạn tạo ra sự liên kết giữa các model của bạn. Primary keys - mặc định Active Record sẽ sử dụng một cột số nguyên tên là id làm khóa chính của bảng. Khi sử dụng Active Record Migrations để tạo các bảng thì cột này sẽ được tạo tự động.

Ngoài ra, còn có một số tên cột tùy chọn sẽ thêm các tính năng bổ sung cho các thể hiện Active Record như sau: Created_at: Tự động được thiết lập để ngày giờ hiện tại khi record được tạo ra lần đầu tiên. Updated_at: Tự động được thiết lập để ngày giờ hiện tại bất cứ khi nào record được update. lock_version: Thêm optimistic locking vào 1 model. type: Xác định model sử dụng Single Table Inheritance (association_name)_type: Lưu trữ type cho liên kết polymorphic. (table_name)_count: Dùng để cache số lượng các đối tượng thuộc về các liên kết.* Ví dụ*, ta có cột comments_count trong bảng posts, thì ở đây trong 1 class Post có nhiều thể hiện Comment sẽ cache số lượng các comment đã có cho mỗi bài post.

# 3. Khởi tạo Active Record Models
Thật dễ dàng để chúng ta có thể tạo được mode AR(Active Record - bài viết này đề cập khá nhiều đến từ này, vì thế tôi sẽ viết gọn và gọi tắt chúng là AR).

```
class User < ApplicationRecord
end
```

Việc làm trên sẽ tạo ra một model/class Article và nó sẽ mapping với table articles trong DB. Và bằng cách này, chúng ta cũng có thể map các cột của mỗi hàng trong bảng đó với ác thuộc tính trong class. Gỉa dụ ta tạo bảng article bằng câu lệnh SQL như sau:

```
CREATE TABLE user (
   id int(11) NOT NULL auto_increment,
   name varchar(255),
   address varchar(1000),
   PRIMARY KEY (id)
);
```
Thì ta cũng có thể truy xuất tới DB bằng những câu lệnh như sau chẳng hạn:

```
user  = User.new
user.name = "Nguyen van bay"
puts article.title # "Nguyen van bay"
```

# 4. Overriding the Naming Conventions
Khi bạn làm theo một quy ước đặt tên khác hoặc cần phải sử dụng ứng dụng Rails của bạn với cơ sở dữ liệu kế thừa, vậy điều gì sẽ xảy ra? Bạn không cần qúa lo lắng, hay băn khoăn về vấn đề này, vì bạn có thể dễ dàng ghi đè các quy ước mặc định đó. AR kế thừa từ ActiveRecord :: Base, định nghĩa một số phương pháp hữu ích cho bạn. Bạn có thể sử dụng phương thức ActiveRecord :: Base.table_name = method để xác định tên bảng nên được sử dụng.

# 5. CRUD: Reading and Writing Data
CRUD: chính là viết gọn tắt của các hành động Create, Read, Update và Delete. AR tự động tạo ra các phương pháp để cho phép một ứng dụng đọc và thao tác dữ liệu được lưu trữ trong bảng của nó.

## 5.1. Create
Các đối tượng AR có thể được khởi tạo từ một hash hay một khối block, thậm chí là những thuộc tính được set bằng tay sau khi khởi tạo. Ví dụ: Ta có class Article ở trên có 2 thuộc tính là: title và content.
User.create(name: "Nguyen van bay", address: "Duc thuong hoai duc ha noi")
gọi phương thức create nó sẽ create và save một bản ghi mới vào trong DB.
hoặc, ta có thể gọi phương thức new, tuy nhiên new nó chỉ tạo ra một thể hiện của đối tượng, nếu muốn lưu trữ bản ghi mới vào trong DB, sau method new, ta có thể gọi save như sau:

```
user = User.create(name: "Nguyen van bay", address: "Duc thuong hoai duc ha noi")
user.save
```

## 5.2. Read
AR cung cấp một API phong phú để truy cập dữ liệu trong cơ sở dữ liệu. Dưới đây là một vài ví dụ về các phương pháp truy cập dữ liệu khác nhau được cung cấp bởi AR

Lấy tất cả bản ghi của User
`User.all`

Lấy bản ghi đầu tiên
`User.first`

Đếm số lương bản ghi
`User.count`

tìm tất cả các User có address là "Duc thuong hoai duc ha noi" và sắp xếp theo created_at
`User.where(name: "Nguyen van bay").order(created_at: :desc)`
Tham khảo thêm tại Active Record Query Interface.

## 5.3. Update Một đối tượng AR sau khi được lấy ra thì các thuộc tính của nó có thể được sửa đổi và lưu lại vào DB.
```
user = User.first
user.name = "Nguyen van bay update"
user.save
<=> art.update(title: "Nguyen van bay update")
```

## 5.4. Delete
Một đối tượng User sau khi được lấy ra, thì ta cũng có thể remove hay destroy nó khỏi DB

```
user = User.first
user.destroy
```

# 6. Validations
AR cho phép ta validate trạng thái của một đối tượng trước khi ghi nó vào DB. Có rất nhiều phương thức mà ta có thể dùng để kiểm tra đối tượng cũng như validate các gía trị thuộc tính của nó không rỗng, là duy nhất và chưa tồn tại trong DB theo format cụ thể và nhiều hơn nữa. Validation là một vấn đề quan trọng để xem xét khi duy trì DB. Vì thế, các method save và update khi chạy: chúng sẽ trả về false khi xác nhận không thành công và không thực sự thực hiện bất kỳ hoạt động nào trên cơ sở dữ liệu. Ngoài ra, chúng cũng có anh chị em cùng cha khác ông nội là save! và update!. Với bọn này, validations always run. Chúng sẽ raise ActiveRecord::RecordInvalid nếu validate fail.

```
class  User < ApplicationRecord
  validates :name, presence: true
end
 
user  = User.new
user.save  # => false
art.save! # => ActiveRecord::RecordInvalid: Validation failed: Name can't be blank
```

# 7. Callbacks
Callbacks are methods that get called at certain moments of an object's life cycle. With callbacks it is possible to write code that will run whenever an Active Record object is created, saved, updated, deleted, validated, or loaded from the database.

Có thể hiểu Callbacks ghi lại hoạt động cho phép đính kèm mã cho các sự kiện nhất định trong vòng đời của các model. Điều này, cho phép bạn thêm các behavior vào model để thực hiện mã code khi các event xảy ra. Chẳng hạn như khi tạo mới một bản ghi, cập nhật hay xóa bản ghi đó... Bạn có thể đọc thêm về Callback tại đây Active Record Callbacks

# 8. Migrations
Rails cung cấp một ngôn ngữ miền cụ thể để quản lý database schema được gọi là migrations.

# 9. Tài liệu tham khảo 
https://guides.rubyonrails.org/active_record_basics.html