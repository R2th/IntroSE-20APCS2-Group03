### Để đảm bảo chúng ta có cùng 1 cách hiểu về Migration trong Ruby on Rails, chúng ta cần hiểu qua về Active Record là gì và có tác dụng như thế nào trong rails 

- Để hiểu 1 cách đơn giản, Active Record là 1 khái niệm được dùng trong các công nghệ làm web back-end hiện đại theo mô hình Model - View - Controller (viết tắt là MVC), trong đó Model là các luồng làm việc với dữ liệu, View là các xử lý liên quan đến giao diện, tương tác đối với người dùng cuối (end-user) hoặc front-end (web app, mobile app), còn Controller là tất cả những logic cầu nối giữa Model và View.

- Khi mới ra đời, việc sử dụng các raw query (các câu lệnh query trực tiếp dữ liệu từ database) ngay trong các Controller là khá phổ biến, nhưng bộc lộ rất nhiều nhược điểm như:

- Không tường minh: các câu lệnh dài dằng dặc, nối vài bảng với nhau gây rối rắm và không rõ ràng về chức năng
Khó bảo trì: vì lý do ở trên nên thường việc debug một đoạn code viết bằng raw query rất đau đầu và mất nhiều thời gian, đôi khi còn không hiệu quả bằng đoạn code viết ban đầu (?!)
Không an toàn: SQL injection là 1 thủ thuật (thủ đoạn ?!) được các hacker đời đầu ưa chuộng, vì nó đơn giản, đánh vào các câu query được viết ẩu & các server không được đầu tư kỹ về bảo mật
Do vậy, cần có 1 tầng logic nằm giữa các nhu cầu xử lý dữ liệu của lập trình viên và các lệnh cấp thấp tương tác trực tiếp với database engine (như MySQL hoặc PostgreSQL). Active Record là 1 kỹ thuật nhằm giải quyết vấn đề này.

-  Trong Ruby on Rails, Active Record được thiết kế rất gần với cấu trúc và đặc tính của các SQL database, vậy nên đối với các bạn đã thành thạo 1 SQL database từ trước là 1 lợi thế. Ngược lại, những ai đã từng làm việc với NoSQL như MongoDB trong Ruby on Rails (thông qua 1 Object-Relational Mapping - ORM tên là Mongoid), cũng không khó khăn lắm để làm quen với các khái niệm trong Active Record (vì Mongoid được làm ra dựa trên Active Record nhưng chỉ dành cho NoSQL).

- Tuy nhiên có 1 thứ mà bất kỳ ai cũng phải vượt qua, đó là Migration. Về cơ bản, các SQL database đều quy định khá chặt chẽ về cấu trúc các bảng dữ liệu, được gọi là schema. Mỗi khi chúng ta định nghĩa 1 bảng dữ liệu, 1 schema được sinh ra để lưu lại cấu trúc của bảng đó. Tuy nhiên trong quá trình phát triển dự án, schema cần luôn luôn thay đổi 1 cách linh hoạt. Nếu chỉ tiến hành thay đổi tại Active Record, các database engine sẽ báo lỗi do sự sai khác về định nghĩa. Lúc này có 2 cách để tiếp tục làm việc:

- Drop database: tức là xóa toàn bộ dữ liệu của bảng đó đi, khi đó database engine sẽ ghi dữ liệu theo schema mới
Viết các Migration: toàn bộ dữ liệu vẫn được dữ nguyên, nhưng database engine biết được cột (column) nào sẽ được thay đổi và cần thay đổi như thế nào.
Cách thứ nhất rất nhanh và dễ, nhưng là 1 thói quen xấu, đặc biệt khi dự án đã ra mắt người dùng cuối, chạy và ghi nhận dữ liệu thật, thì không có cách nào xóa trắng dữ liệu được cả. Vậy nên chúng ta cần đến cách thứ 2, đó là viết Migration.

### 1. Migration là gì?
- Là một trong những tính năng quan trọng của Active record, Migration cho phép người lập trình có thể thay đổi được cấu trúc cũng như dữ liệu nằm bên trong database mà không cần phải vào trực tiếp bên trong nó. Với Rails, người thực hiện chỉ cần thông qua Ruby DSL là có thể miêu tả được sự thay đổi của các table.
- Có thể hiểu một cách đơn giản rằng nó chính là mô tả một cách chi tiết về việc đổi mới cấu trúc bảng cũng như các dữ liệu nằm bên trong database mà không gặp phải nhiều khó khăn như trước. Bạn có thể hiểu mỗi migration giữ vai trò như là một version của database. Ở thời điểm ban đầu, schema chỉ có trống không, nhưng sau mỗi lần migration thì sẽ modify nhằm mục đích thêm, chuyển đổi vị trí table, cột, rows…
- Active record có thể cập nhật schema theo thời gian. Và ở bất kỳ thời điểm nào trong quá khứ nó cũng đều có thể cập nhật được các version của schema đến bản mới nhất. Chưa hết, Active record còn có thể cập nhật được file db/schema.rb, đây là cách để giúp nó thống nhất được cấu trúc mới nhất ở trong database.

### 2. Create migration

**Create migration**
Migration thường sẽ được lưu trữ trong thư mục db/migrate, theo đó cứ mỗi file là sẽ có một class migration. File migration có định dạng YYYYMMDDHHMMSS_create_products.rb, còn file tên thì có đi kèm với thời gian để người thực hiện có thể phân biệt được dễ dàng cùng với các version migation. Yêu cầu đối với các class đó là phải có sự thống nhất toàn bộ với tên file theo đúng định dạng.

**Run Active record**
Trong rails, nó có tồn tại một vài class rake đóng vai trò để chạy migration. Nếu xét các trường hợp bin/rails db:migrate thì không có cái nào sở hữu được tốc độ chạy nhanh như Class rake run migration. Về thứ tự thực hiện migrate thì nó còn phải dựa vào thời gian.
Khi bắt đầu cho command db:migrate hoạt động thì đồng thời task db:schema:dump cũng được đề cập đến, task này sẽ cập nhật file schema db/schema.rb và schema đóng vai trò kết nối cấu trúc tất cả của database.

**Rollback**
Có không ít trường hợp, người thực hiện muốn rollback lại version ngay trước, đó là khi migration không đúng hoặc muốn quay trở lại…Như vậy, dù bạn không nắm rõ được version chính xác của bản cần rollback đi chăng nữa thì cũng chỉ cần run command bên dưới là được.

### 3. Schema là gì

**Schema**
- Bởi vì sức mạnh của rails migration là không thể đáp ứng được, do vậy muốn có được nguồn thông tin đủ tin tưởng để tạo schema trong database thì dường như là bất khả thi. Khi deploy new instance của application thì không nhất thiết phải làm toàn bộ các bảng migration cũ. Việc thực hiện có rất có thể sẽ dẫn đến tình trạng lỗi nhiều, khó kiểm soát được. Giải pháp được coi là đơn giản cũng như rút ngắn được thời gian đó là đọc vào database nhưng cái ghi trong file schema hiện tại.

- File schema nếu biết được ở object của Active record thì sẽ xảy ra thuộc tính ra sao khi mà các thông tin schema không tồn tại trong code model? Thường thì trong lập trình nó sẽ được chia ra thành các bảng migration và lưu lại trong đó. Còn đối với việc sử dụng gem annotate_models thì toàn bộ các comment thông tin tóm tắt schema sẽ được cập nhật, đổi mới tự động vào đầu của model file.

**Các loại Schema dumps**
Dumps schema có hai cách khác nhau, đối với dump thì nó sẽ được setting ở bên trong file config/application.rb của config.active_record.schema_format, chỉ định sql hoặc là :ruby. Đối với trường hợp chỉ định :ruby thì schema sẽ được giữu lại ở bên trong db/schema.rb. Bạn chỉ cần click thử vào file thì chắc chắn sẽ nhìn thấy giống như một bảng migration lớn vậy.

### 4. Migration và seed data

Đôi khi cũng có một số trường hợp dùng migration nhằm mục đích gia tăng thêm data và database, song ở rails nó có bao gồm thêm tính năng seed để đưa dât vào database ngay thời điểm ban đầu. Việc thêm code ruby vào file db/seeds.rb và run bin/rails db:seed sẽ xuất hiện data ngay tức thì.