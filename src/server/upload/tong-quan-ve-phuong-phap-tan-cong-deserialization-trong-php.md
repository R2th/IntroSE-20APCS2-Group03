## Quá trình Serialization và Deserialization đối tượng
* Serialization là quá trình chuyển đổi trạng thái thông tin của một đối tượng thành một hình thức có thể được lưu trữ hoặc truyền đi. Các thông tin chuyển đổi có thể được lưu trữ trên một đĩa. Trong quá trình truyền qua mạng, nó có thể ở dạng byte, XML, JSON,…
* Deserialization là quá trình ngược lại của quá trình serialization, thực hiện lấy dữ liệu từ các định dạng có cấu trúc, khôi phục thông tin theo byte, XML, JSON,... thành các đối tượng .

![](https://images.viblo.asia/ccbd9bb1-5dfa-4867-829c-264dd8d8f8c2.png)
#####  Quá trình Serialization đối tượng:

* Trong ngôn ngữ PHP, hàm hỗ trợ Serialization đối tượng là `serialize( )`. Input của hàm này là một object và output của hàm sẽ là một chuỗi lưu object đó, cụ thể sẽ lưu class của object và các thuộc tính của object.

![](https://images.viblo.asia/cfbde218-e4cc-4693-8abb-c4f402a1b092.png)

![](https://images.viblo.asia/522a8a9c-5cf6-44b5-a917-f7417392a4a8.png)

 *  Ở đây, khỏi tạo một class Student với các thuộc tính $name và $age, cùng với những phương thức `setName( )`,`getName( )`, `setAge( )`, getAge( ), và hai magic method `__sleep( )`, `__wakeup( )`. Tiếp theo khởi tạo một object $student và khởi tạo giá trị thuộc tính cho object $student thông qua hai phương thức `setName( )`, và `setAge( )`. 
*  Dạng của object trước khi được serialize:

![](https://images.viblo.asia/e55ea180-557c-470a-b169-dc41f4752385.png)

* Tiếp theo, gọi hàm serialize( ), tham số truyền vào phương thức là một object, ở truyền vào object $student. Hàm serialize( ) sẽ trả về một chuỗi lưu object được truyền vào. Chuỗi này sẽ được lưu vào $serializeStudent. Dạng của object sau khi được serialize:

![](https://images.viblo.asia/a3b24902-d490-4e3a-8fe4-d871fb28e897.png)

#### Quá trình Deserialization đối tượng

* Trong ngôn ngữ PHP, hàm hỗ trợ Deserialization đối tượng là `unserialize( )`. Input của phương thức này là một chuỗi đại diện cho object. Output là object được xây dựng lại từ chuỗi truyền vào hàm `unserialize( )`.

![](https://images.viblo.asia/cd78c5ba-3110-4dce-979a-712a958843d9.png)

* Ở đây, sử dụng biến $serializeStudent truyền vào hàm `unserialize( )` để xây dựng lại object từ` $serializeStudent` và lưu vào biến `$deserializeStudent`. Sau đây là kết quả:

![](https://images.viblo.asia/89d80225-6568-4779-a439-01faf8e847a0.png)

* Kết quả nhận được sau khi `deserialize` từ biến `$serializeStudent` giống với dạng object trước khi được `serialize`.
## Giới thiệu về lỗ hổng Deserialization
* Trong TOP10 OWASP 2017, OWASP xếp lỗ hổng này ở vị trí thứ 8: Top 10-2017 A8-
Insecure Deserialization. Ứng dụng mắc phải lỗ hổng này khi không kiểm tra dữ liệu đầu vào
trước khi thực hiện deserialize. Dữ liệu không đúng định dạng hoặc dữ liệu không mong muốn
có thể bị lợi dụng để thay đổi luồng xử lý của ứng dụng, gây ra hậu quả có thể là tấn công từ
chối dịch vụ hoặc thực thi mã tùy ý.
* Lỗ hổng Deserialization trong PHP hay với một tên gọi khác là PHP Object Injection
có thể giúp kẻ tấn công thực hiện các loại tấn công khác nhau, chẳng hạn như `Code Injection`,
`SQL Injection`, `Path Traversal` , `DDos`, tùy thuộc vào ngữ cảnh. Lỗ hổng này xảy ra khi dữ liệu
đầu vào không được kiểm tra đúng cách trước khi được chuyển đến hàm PHP `unserialize()`.
Với các lớp phương thức Magic method `__wakeup()` , `__destruct()`, `__toString()` cùng với các `POP chain` giúp cho đối tượng tấn công thực thi lỗi này.
* Năm 2010, Stefan Ess có bài thuyết trình của tại hội nghị BlackHat đã đề cập đến những
nguy cơ tận dụng lỗi `PHP Object Injection` với nền tảng được xây dựng trên ngôn ngữ PHP là
WordPress sử dụng `serialize()` và `unserialize()`. Dựa vào đó, năm 2013, Tom Van Goethem,
tiến sỹ tại Bỉ đã tìm được lỗ hổng `PHP Object Injection` trên nền tảng `WordPress` (version
3.6.1).Cũng trong năm 2013, một nền tảng khác là `Joomla `cũng bị lỗ hổng tương tự `(CVE2013-3242).` Đến năm 2015, Johannes Dahse , tiến sĩ người Đức đã tìm ra lỗ hổng `PHP Object Injection` ở một phần mềm thương mại điện tử được xây dựng trên ngôn ngữ `PHP` là
`Magento(version 1.9.0.1)` . Theo sau đó, chứng kiến sự gia tăng về lỗ hổng `Deserialization`
trên nhiều ứng dụng web cho phép cả tấn công thi mã từ xa `(RCE) `và quản lý máy tính của
nạn nhân từ xa. Trong những năm gần đây có khoảng 60 lỗ hổng `Deserialization` có thể thực
thi mã từ xa, hơn 80 lỗ hổng đã được báo cáo. Năm 2017,` OWASP` xếp lỗ hổng `Deserialization`
ở vị trí thứ `8` trong top `10 OWASP`. Những số liệu thống kê trên cho thấy sự nguy hiểm cũng
như phổ biến của lỗ hổng trên nền tảng `PHP`.
## Kỹ thuật Property Oriented Programming
* Các lỗ hổng liên quan đến bộ nhớ như tràn bộ đệm, lỗi sai định dạng, đã được biết đến
từ lâu. Các phương pháp bảo vệ như `ASLR` và `DEP` được triển khai rộng rãi để chống lại việc
khai thác các lỗ hổng trên. Tuy nhiên, kẻ tấn công có thể sử dụng các kỹ thuật khác để vượt
qua lớp phòng thủ trên, ví dụ như kỹ thuật `Code reuse`. Các kỹ thuật `Code reuse` như `ReturntoLibc`, `Return-Oriented Programming `và `Jump-Oriented Programming` có thể vượt qua một số
biện pháp phòng thủ trên. Với `ROP `và `JOP`, kẻ tấn công có thể sử dụng lại các đoạn mã nguồn
trong chương trình (được gọi là `gadgets`) và kết hợp chúng lại với nhau để xây dựng thành
`payload` `(gadget chains`).
* Vào năm 2009, Esser đã trình diễn kỹ thuật `Code reuse` tồn tại trên ứng dụng` PHP`.
Cụ thể, anh đã giới thiệu khả năng tấn công chèn đối tượng `Web` mà kẻ tấn công có thể sửa
đổi các thuộc tính của đối tượng. Do đó, dữ liệu và luồng điều khiển của ứng dụng có thể bị
thay đổi. Và anh cũng là người đã đặt ra thuật ngữ `Property-Oriented Programming `(`POP`).
* `Property-Oriented Programming` (`POP`) là khi chúng ta có thể điều khiển thuộc tính của
đối tượng và có thể làm ảnh hưởng đến luồng thực thi của chương trình. Một `POP gadget` là
đoạn mã mà chúng ta có thể làm ảnh hưởng đến thuộc tính của một số đối tượng. Đây chính 
là một `ROP` cấp cao (một kỹ thuật được sử dụng trong khai thác tham nhũng bộ nhớ). Thay vì
`ROP gadget` đẩy giá trị lên ngăn xếp, thì `POP gadget` cho phép chúng ta ghi một số dữ liệu vào
`file`. Tấn công `Code reuse` cũng có thể xảy ra dựa trên các đoạn mã đã có sẵn, được gọi là
`gadge`t, được thực thi để thực hiện một hành động không mong muốn như thực thi lệnh hệ
thống tùy ý. Quá trình `Deserialization` có thể đặt các giá trị của biến tùy ý, cho phép kẻ tấn
công có thể kiểm soát một số dữ liệu. Điều này cũng cho phép kẻ tấn công sử dụng một` gadget`
để gọi một `gadget` thứ hai, vì các phương thức thường được gọi trên các đối tượng và được
lưu trữ cho các biến của thực thể. Khi một loại các `gadget` liên kết với nhau, nó được là `gadget chain`.
* Một điểm quan trọng ở đây là khai thác lỗ hổng `Deserialize` không phải là gửi các đoạn
`code` lên chương trình để thực thi. Chúng ta chỉ đơn giản là gửi thuộc tính của các lớp mà máy
chủ đã có biết để thực hiện tác thao tác mã đã có, liên quan đến các thuộc tính đó. Để khai
thác thành công lỗ hổng `Deserialization` cần có 2 điều kiện:
    1. Điểm đầu vào, là nơi mà kẻ tấn công gửi các dữ liệu đã được `serialize`
đến mục tiêu và mục tiêu sẽ thực hiện `deserialize` đoạn dữ liệu này.
    2. Kẻ tấn công có thể thao túng được một hoặc nhiều đoạn mã thông qua
quá trình `deserialize`.
* Ví dụ, có hai điều kiện tiên quyết mà một ứng dụng `PHP` cần phải đáp ứng để có thể sử
dụng `POP` để khai thác lỗ hổng `PHP Object Injection`. Đầu tiên, có ít nhất một `magic method`
được gọi lúc ứng dụng đang chạy, được xác định đúng trong lớp thuộc đối tượng mà kẻ tấn
công muốn `inject`. Thứ hai, lớp được chọn cần phải được load trong phạm vi của lệnh gọi
`unserialize()`, và kẻ tấn công có thể điều khiển được đầu vào của hàm `unserialize()`.
* Trong kịch bản dưới đây, Có 3 `gadgets` được kết hợp để tạo thành lỗ hổng xoá file tuỳ ý.

![](https://images.viblo.asia/6703f2c8-2119-429d-b193-20033a3a7be6.png)

![](https://images.viblo.asia/4cbed1c5-e594-4614-9f51-825800832ccb.png)

* Lỗ hổng `POI `tồn tại ở dòng `19`, nơi mà người dùng có thể nhập dữ liệu đầu vào và chương
trình thực hiện `deserialize`. Ở dòng `20`, `21` kẻ tấn công đã chèn một đối tượng `Database` với
thuộc tính `handle` được đặt là một đối tượng của lớp` TempFile`. Thuộc tính `filename` được đặt
với nội dung là `../../.htaccess`.
* Khi ứng dụng kết thúc, đối tượng database đã được chèn sẽ được thực thi nhờ hàm
`__destruct()` tự động gọi. Bởi vì thuộc tính handle đã được chèn thành đối tượng lớp `TempFile`,
gọi đến hàm `shutdown()` của lớp `File`. Trong hàm `shutdown()` sẽ gọi đến phương thức `close`
được kế thừa ở lớp `TempFile`. Ở đây, với `filename` mà `attacker `truyền vào sẽ được chương
trình xoá file đó. Kết quả là file `.htaccess `đã bị xoá.

### Tobe continue...