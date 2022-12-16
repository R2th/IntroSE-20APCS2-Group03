![](https://images.viblo.asia/418a015e-72ae-4efe-aaad-0a7de958cb97.jpg)

Sự khác biệt cơ bản giữa primary key và unique key là primary key không chấp nhận giá trị NULL trong khi giá trị NULL được cho phép trong các ràng buộc unique key.

## Bảng so sánh

| Tiêu chí |Primary key | Unique key |
| -------- | -------- | -------- |
| Công dụng | Nó được sử dụng để làm định danh duy nhất cho mỗi hàng trong bảng.      | Nó cũng xác định duy nhất một hàng, nhưng không là khóa chính.      |
| NULL | không chấp nhận giá trị NULL | chấp nhận giá trị NULL |
| Số lượng khóa có thể được xác định trong bảng  | Chỉ có duy nhất 1 primary key trong 1 bảng | Có thể nhiều hơn 1 |
| Index | Tạo chỉ mục theo nhóm | Tạo chỉ mục không phân cụm |

## Primary key

Một cột có thể được gọi là primary key của bảng nếu nó xác định duy nhất từng bộ (hàng) trong bảng đó. Nó thực thi các ràng buộc toàn vẹn đối với bảng. Chỉ có một primary key trong một bảng. Primary key không chấp nhận các giá trị trùng lặp và NULL. Primary key được chọn cẩn thận khi các thay đổi có thể xảy ra theo cách hiếm khi xảy ra, có nghĩa là khóa chính trong bảng rất hiếm khi thay đổi. 

Hãy hiểu khái niệm về primary key với thông qua ví dụ sau. Ở đây chúng ta đang tạo một bảng có tên là bảng Student, bảng này có các thuộc tính như Roll_number, Name, Batch, Phone_number, Citizen_ID. 

![](https://images.viblo.asia/b3c540ef-8400-4910-962e-4b84a4f063e6.jpg)

Trong ví dụ này, Roll_number không bao giờ được có giá trị giống hệt nhau và NULL, bởi vì mọi student đăng ký vào một trường đại học có một Roll_number duy nhất. Không có hai student nào có thể có cùng Roll_number và mỗi hàng trong bảng được xác định duy nhất bằng Roll_number của student. Vì vậy, chúng ta có thể đặt thuộc tính Roll_number làm primary key trong trường hợp cụ thể này. 

Primary key có thể được tham chiếu bằng foreign key. Nó tạo ra một chỉ mục nhóm duy nhất trên bảng. Trong một chỉ mục được phân nhóm, các hàng dữ liệu được sắp xếp và lưu trữ trong một bảng hoặc các views trên cơ sở các giá trị chính của nó. Chỉ có thể có một chỉ mục nhóm trong một bảng, lý do đằng sau điều này là một hàng dữ liệu trong bảng chỉ có thể được sắp xếp theo một thứ tự. 

## Unique key

Tương tự như primary key, ràng buộc unique key cũng xác định duy nhất một bộ giá trị riêng lẻ trong một mối quan hệ. Nhưng, có những khác biệt nhất định giữa chúng. Một bảng có thể có nhiều hơn một khóa duy nhất. Ràng buộc unique key chỉ có thể chấp nhận một giá trị NULL cho một cột.

Hãy hiểu điều này với ví dụ tương tự, trong đó chúng ta có bảng Student với các thuộc tính Roll_number, Name, Batch, Phone_number và Citizen_ID. Thuộc tính Roll_number được gán primary key.

![](https://images.viblo.asia/b3c540ef-8400-4910-962e-4b84a4f063e6.jpg)

Tại đây, Citizen_ID có thể được chỉ định với các ràng buộc duy nhất trong đó mỗi mục trong cột Citizen_ID phải là duy nhất, không được trùng lặp vì mỗi công dân của một quốc gia phải có số nhận dạng duy nhất của mình. Tuy nhiên, nếu một student di cư từ một quốc gia khác, trong trường hợp đó, họ sẽ không có Citizen_ID và mục nhập có thể có giá trị NULL vì một NULL được cho phép trong ràng buộc duy nhất. 

Các ràng buộc duy nhất cũng được tham chiếu bởi foreign key. Nó có thể được sử dụng khi ai đó muốn thực thi các ràng buộc trên một cột và một nhóm các cột không phải là primary key. Không giống như primary key, nó tạo chỉ mục không phân cụm. Các chỉ mục không phân cụm có cấu trúc khác biệt với các hàng dữ liệu. Mỗi mục nhập khóa-giá trị trong đó trỏ đến hàng dữ liệu chứa giá trị khóa do đó nó sử dụng con trỏ. 

## Tổng kết

Primary key và unique key đều phục vụ mục đích của một mã định danh duy nhất cho các hàng của bảng với các giá trị duy nhất trong một cột hoặc nhóm cột. Các ràng buộc khóa này được phân biệt đáng kể khi mỗi bảng có thể có nhiều nhất một khóa chính trong khi một bảng có thể có nhiều unique key không phải là primary key.