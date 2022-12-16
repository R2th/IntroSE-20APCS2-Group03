## CRUD Testing

Kiểm thử CRUD là một kiểm thử hộp đen của chức năng cơ sở dữ liệu.

Như chúng ta đã biết, kiểm thử hộp đen xem xét hệ thống phần mềm thử nghiệm là "hộp đen và các thử nghiệm được thực hiện thông qua giao diện người dùng.

Mọi hành động front-end như đăng ký tài khoản, chỉnh sửa chi tiết cá nhân, xem chi tiết, xóa tài khoản, v.v. có hành động CRUD tương ứng trong cơ sở dữ liệu. 

Kiểm thử CRUD được thực hiện để kiểm tra xem các hành động này có phản ánh trong Cơ sở dữ liệu đúng hay không.

Kiểm thử CRUD khác với thử nghiệm front-end hộp đen thông thường, nơi chúng ta kiểm tra các thông báo thành công như “Tài khoản được tạo thành công” sau khi người dùng đăng ký vv... Ở đây chúng ta phải kiểm tra xem chi tiết tài khoản có thực sự được nhập vào Cơ sở dữ liệu hay không.
<br>
<br>
**Có hai cách để người kiểm thử thủ công có thể thực hiện việc này:**

1) Thực thi các truy vấn của chính chúng ta - Người thử nghiệm (tester) có hiểu biết tốt về yêu cầu phần mềm và ngôn ngữ SQL có thể thực hiện các truy vấn riêng của họ để kiểm tra cơ sở dữ liệu. Bằng cách này, tất cả các trường hợp có thể được xác minh với các truy vấn tốt.

2) Thực hiện các truy vấn với sự trợ giúp của nhà phát triển - Người thử nghiệm có thể bắt đầu bằng việc xác minh giao diện người dùng của ứng dụng và nhận các truy vấn từ nhà phát triển.

<br>

**Các câu hỏi sau đây cần được xem xét khi viết các trường hợp kiểm tra cho các hoạt động CRUD:**

* Hành động CRUD nào là hợp lệ và hành động nào không hợp lệ cho một ứng dụng thử nghiệm?
* Quan hệ CRUD có liên quan gì với nhau?
* Khi nào các hành động CRUD được thực thi?
* Ai đang truy cập chức năng CRUD? Hệ thống có đặt các đặc quyền khác nhau cho những người dùng khác nhau không?

<br>

**Quy trình thử nghiệm chung cho thử nghiệm DB không khác với thử nghiệm GUI hộp đen thủ công thông thường**
<br>

*STEP 1: Chuẩn bị môi trường thử nghiệm*

*STEP 2: Thực hiện các bước kiểm tra*

*STEP 3: Kiểm tra kết quả kiểm tra*

*STEP 4: Xác nhận kết quả thực tế theo kết quả mong đợi*

*STEP 5: Báo cáo lỗi và các phát hiện khác*

<br>
Để kiểm tra kết quả thử nghiệm, phản hồi GUI và kết quả truy vấn được sử dụng. Đối với thử nghiệm hộp đen CRUD, chúng tôi chỉ cần một truy vấn, đó là SELECT
<br>

Như chúng ta đều biết, cơ sở dữ liệu lưu trữ dữ liệu. Khi chúng ta cần lấy dữ liệu, truy vấn SELECT được sử dụng

Trong thử nghiệm hộp đen, chỉ cần sử dụng truy vấn này để xem các hành động thông qua giao diện người dùng có hiển thị phản ánh đúng trong cơ sở dữ liệu hay không

<br>

**‘SELECT’ có thể được sử dụng theo các cách sau:**

1) Nếu người kiểm tra muốn kiểm tra và xác minh tất cả dữ liệu, anh ta có thể sử dụng biểu tượng bắt đầu (*) trong truy vấn SELECT. Đây là dạng truy vấn SELECT đơn giản nhất.

`SELECT * FROM table_name;`

Câu lệnh trên chọn tất cả các trường từ tất cả các hàng từ bảng table_name.

2) Trong một số trường hợp, kết quả truy vấn đầu tiên có thể lộn xộn. Nếu trình kiểm tra chỉ quan tâm đến một số trường, thì tập lệnh sau có thể được sử dụng.

`SELECT ‘field_1’, ‘field_2’, ‘field_3’ FROM table_name;`

Câu lệnh trên chọn các trường, ‘field_1’, ‘field_2’ và ‘field_3’ từ tất cả các hàng từ bảng table_name.

3) Nếu người thử nghiệm muốn xem kết quả dựa trên bất kỳ tiêu chí nào, thì mệnh đề WHERE có thể được sử dụng.

`SELECT ‘field_1’ FROM table_name WHERE field_2 = ‘success’;`

Câu lệnh trên chọn trường, ‘field_1’ từ tất cả các hàng từ bảng table_name, trong đó ‘field2’ là ‘success’.

## Làm thế nào để kiểm thử chức năng CRUD của một phần mềm?

Hãy xem xét ví dụ về giao diện người dùng sau, cho phép một số đặc quyền người dùng nhất định để sử dụng cơ sở dữ liệu MySQL để lưu trữ dữ liệu.


| Ví dụ | Database chi tiết |
| -------- | -------- |
| 1. Có thể CREATE product với các chi tiết product name, product description, product price sử dụng ‘Product Add’ form| Database : Shopping_DB<br> Table: product<br> Fields: product_name, product_details, product_price<br> Tạo một hàng trong bảng 'Product' với các chi tiết được thêm vào trong các trường tương ứng|
| 2. Có thể READ chi tiết product name, product description, product price trong ‘Product details page’. | Database : Shopping_DB<br> Table: product<br> Fields: product_name, product_details, product_price<br> Chọn tất cả dữ liệu hoặc chọn một dữ liệu cụ thể từ bảng 'Product' |
| 3. Có thể UPDATE product name, product description, product price sử dụng ‘Product Edit’ form. | Database : Shopping_DB<br> Table: product<br> Fields: product_name, product_details, product_price<br> Cập nhật tất cả chi tiết hoặc chi tiết cụ thể trong một hàng cụ thể trong bảng 'Product' |
| 4. Có thể DELETE product | Database : Shopping_DB<br> Table: product<br> Fields: product_name, product_details, product_price<br> Xóa tất cả chi tiết trong bảng 'sản phẩm' bằng cách xóa bảng hoặc xóa một hàng cụ thể khỏi bảng. |

<br>
Chức năng CRUD có thể được kiểm tra như thế nào cho trường hợp này
<br>

Lưu ý: Luôn tiến hành kiểm tra CRUD trong các bãi cơ sở dữ liệu vì thử nghiệm này có thể gây ra những thay đổi trong cơ sở dữ liệu. Lệnh dưới đây có thể được sử dụng để lấy một bãi chứa toàn bộ cơ sở dữ liệu

`$ mysqldump -u [uname] -p [pass] Shopping_DB > Shopping_DB_backup.sql`

### CREATE

**Thêm một product mới, bạn có thể thực hiện các bước sau:**

1. Tải biểu mẫu 'Product Add'
2. Nhập tên product , đặt tên là 'test name'
3. Nhập mô tả cho product, với nội dung là 'this is test product detail’'
4. Nhập giá product, với giá trị là '100'
5. Gửi biểu mẫu (submit form)

**Kiểm tra kết quả:**
* Tester kiểm tra xem product được hiển thị với tất cả các chi tiết trong giao diện người dùng của ứng dụng phần mềm
* Tester thực hiện truy vấn trong máy chủ cơ sở dữ liệu MYSQL để kiểm tra xem hàng cụ thể có tồn tại không bằng truy vấn

**Sử dụng truy vấn:**

`SELECT * FROM products WHERE product_name = ‘test name’;`
<br>

**Kết quả truy vấn từ MySQL:**

Một hàng có các chi tiết tương ứng sẽ được hiển thị

`mysql> SELECT * FROM products WHERE product_name = ‘test name’;`

`+-------------+-----------------------------+-----------------+`

`|product_name | product_details | product_price | `

`+-------------+-----------------------------+-----------------+`

`| test name | this is test product details| 100 | `
<br>

**Các trường hợp khác cần xem xét:**

* Đối với một số hệ thống, người dùng khác nhau sẽ có các đặc quyền khác nhau. Trong trường hợp đó, người kiểm thử có thể phải kiểm tra phản hồi cho từng vai trò của người dùng
* Nếu không cho phép product bị trùng lặp, người kiểm thử có thể kiểm tra bằng cách thêm một sản phẩm có cùng chi tiết một lần nữa. Lần này cơ sở dữ liệu không nên có mục nhập thứ hai tương ứng với cùng một product
* Nếu phần mềm cho phép nhiều product được tạo cùng một lúc, thì người kiểm thử có thể kiểm tra xem tất cả các chi tiết của tất cả các product đã được nhập vào cơ sở dữ liệu đúng hay chưa
* Thử các kết hợp đầu vào khác nhau
* Kiểm tra những gì xảy ra trong thời gian ngừng máy chủ

### READ
**Để kiểm tra xem mục nhập đã tạo có thể đọc được hay không, bạn có thể thực hiện các bước sau:**
1. Tạo một số product với các kết hợp đầu vào khác nhau thông qua chức năng CREATE, có tên là test name 1, test name 2, test name 3
2. Hãy thử tìm kiếm các product

**Kiểm tra kết quả:**
* Tester kiểm tra xem chi tiết product là chính xác không
* Tester so sánh các chi tiết đang hiển thị với các chi tiết được lưu trong cơ sở dữ liệu
<br>

**Sử dụng truy vấn:**

`SELECT * FROM products WHERE product_name = ‘test name 1’ OR product_name = ‘test name 12’ OR product_name = ‘test name 3’;`
<br>

**Kết quả truy vấn từ MySQL:**

Chi tiết của các product được chọn phải được hiển thị. Người kiểm thử có thể xác minh và so sánh điều này với kết quả trong giao diện người dùng

`mysql> SELECT * FROM products WHERE product_name = ‘test name 1’ OR product_name = ‘test name 12’ OR product_name = ‘test name 3’;`

`+-------------+-----------------------------+-----------------+ `

`|product_name | product_details | product_price | `

`+-------------+-----------------------------+-----------------+ `

`| test name 1 | this is test product detail1| 100 | `

`| test name 2 | this is test product detail2| 100 |`

`| test name 3 | this is test product detail3| 100 |`
<br>

**Các trường hợp khác cần xem xét:**
* Xem từng mục một
* Xem nhiều mục cùng một lúc
* Đang cố gắng xem một mục không tồn tại
* Hãy thử tìm kiếm với các điều kiện khác nhau
* Thử kiểm tra chức năng cho các vai trò người dùng khác nhau
* Kiểm tra những gì xảy ra trong thời gian ngừng máy chủ

### UPDATE
**Để chỉnh sửa hoặc cập nhật các mục hiện có, bạn có thể thực hiện các bước sau:**
1. Tạo một product bằng chức năng CREATE.
2. Chỉnh sửa các trường khác nhau của product, đổi 'test name’ thành ‘V Neck Top'.
3. Gửi đi

**Kiểm tra kết quả:**
* Kiểm tra thủ công xác minh rằng chi tiết sản phẩm đã thay đổi
* Tester thực hiện truy vấn MYSQL và xem chi tiết
<br>

**Sử dụng truy vấn:**

`SELECT * FROM products WHERE product_name = ‘V Neck Top’;`
<br>

**Kết quả truy vấn từ MySQL:**

Một hàng có chi tiết tương ứng sẽ được hiển thị

`mysql> SELECT * FROM products WHERE product_name = ‘V Neck Top’;`

`+-------------+-----------------------------+-----------------+`

`|product_name | product_details | product_price | `

`+-------------+-----------------------------+-----------------+ `

`| V Neck Top | this is test product details| 100 | `

`+-------------+-----------------------------+-----------------+`

Nếu bạn tìm kiếm với tên product cũ, cơ sở dữ liệu sẽ không trả về chi tiết

**Các trường hợp khác cần xem xét:**

* Cập nhật nhiều mục cùng một lúc
* Cập nhật thành giá trị khóa đã tồn tại
* Cập nhật tất cả chi tiết hoặc một phần chi tiết
* Cập nhật các trường với các kết hợp đầu vào khác nhau
* Kiểm tra tính năng được cập nhật cho các Đặc quyền khác nhau
* Kiểm tra những gì xảy ra trong thời gian ngừng máy chủ

### DELETE
**Để kiểm tra chức năng xóa, bạn có thể thực hiện các bước sau:**
1. Tạo một product với chức năng CREATE
2. Xóa product

**Kiểm tra kết quả:**

* Tester kiểm tra xem product có bị xóa khỏi giao diện người dùng không?
* Tester kiểm tra cơ sở dữ liệu MySQL và xác nhận rằng bản ghi tương ứng đã bị xóa
<br>

**Sử dụng truy vấn:**

`SELECT * FROM products WHERE product_name = ‘test name’;`
<br>

**Kết quả truy vấn từ MySQL:**

Điều này sẽ hiển thị kết quả truy vấn như được hiển thị bên dưới

`mysql>SELECT * FROM products WHERE product_name = ‘test name’;
Empty set (0.00 sec)`
<br>

**Các trường hợp khác cần xem xét:**
* Xóa nhiều mục trong một yêu cầu
* Xóa một mục được cập nhật
* Lấy hai tab và cố gắng yêu cầu xóa cho một product từ cả hai tab

## Kết luận
Kiểm tra cơ sở dữ liệu rất quan trọng vì nó xác nhận tính bảo mật và độ tin cậy của một ứng dụng phần mềm

Hầu hết các ứng dụng phần mềm xử lý việc creating, reading, updating và deleting dữ liệu đến/từ cơ sở dữ liệu

Theo yêu cầu phần mềm, chu trình CRUD có thể thay đổi

Người thử nghiệm nên lập kế hoạch các trường hợp thử nghiệm dựa trên chu kỳ CRUD

Các chức năng CRUD có thể được kiểm tra thủ công và được xác minh từ giao diện người dùng và cơ sở dữ liệu

Truy vấn SELECT có thể được sử dụng để xác minh các thay đổi trong cơ sở dữ liệu tương ứng với từng hoạt động CRUD

<br>

*Nguồn tham khảo: https://www.softwaretestinghelp.com/crud-testing/*