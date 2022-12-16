**1. Khái niệm: Bảng quyết định là gì?**

*  Bảng quyết định là một đại diện bảng đầu vào gồm có các điều kiện đầu vào, các tình huống thử nghiệm và các kết quả. Đây là một công cụ rất hiệu quả được sử dụng cho cả kiểm thử phần mềm phức tạp và quản lý các yêu cầu.
*  Bảng quyết định là một kỹ thuật tốt để áp dụng cho những trường hợp cần nhiều sự kết hợp. Bảng quyết định hỗ trợ việc lựa chọn test case một cách có hệ thống và có thể đem lại nhiều lợi ích trong việc nhận biết vấn đề tiềm ẩn và sự không rõ ràng trong đặc tả (specification).
*  Bảng quyết định đảm bảo bao gồm tất cả các kết hợp có thể có của các giá trị điều kiện được gọi là thuộc tính tính đầy đủ, mang lại số testcase tối thiểu với độ bao phủ tối đa.
*  Phương pháp này khắc phục được khuyết điểm của 2 phương pháp phân tích giá trị biên và phân vùng tương đương, đó là kiểm soát được sự kết hợp của của các giá trị đầu vào bằng cách sử dụng mô hình quan hệ logic nguyên nhân - kết quả cho các thành phần phần mềm. <br>

***2. Tổng quát hóa Bảng quyết định***

* Các điều kiện đầu vào được thường chỉ ra dưới dạng giá trị Đúng (T) và Sai (F).
* Các tình huống thử nghiệm/số lượng kết hợp có thể của các condition/ số rules được tính theo công thức sau:

  + Giả sử trường hợp mỗi condition có số các giá trị giống nhau. Số condition là n, mỗi condition có m giá trị thì số rules là: <br>
=> Số rules = số giá trị của condition1 * số giá trị của condition2 * …. * số giá trị của condition n = m * m * … * m = m^n ( nhớ nhanh sẽ là lũy thừa bậc n của m)

   + Trong trường hợp, chúng ta cũng có số condition là n nhưng mỗi condition có số giá trị khác nhau thì số trường hợp kiểm thử được tính tương tự như sau: <br>
= > Số rules = số giá trị của condition 1 * số giá trị của condition 2 * …. * số giá trị của condition n.

+ Khi số lượng conditions/input tăng lên và giá trị của conditons được biểu diễn dưới nhiều dạng khác nhau ngoài 2 giá trị thông thường là T/F thì Bảng quyết định sẽ trở nên phức tạp hơn.
+ Các kết quả là kết quả mong muốn của người dùng, hoạt động của hệ thống khi thực hiện các tình huống kiểm thử.<br>

***3, Các bước để tạo bảng quyết định***

*Bước 1*: Liệt kê tất cả Conditions/Inputs<br>
*Bước 2*: Tính số lượng kết hợp có thể (Rules)<br>
*Bước 3*: Đặt tất cả các kết hợp trong bảng<br>
*Bước 4*: Giảm thiểu các case kết hợp và quyết định test case<br>

*Hãy cùng đi vào các ví dụ cụ thể, follow theo những bước tạo bảng quyết định trên.*

***Ví dụ 1***: Hãy tạo Bảng quyết định cho chức năng đăng nhập. <br>

![image.png](https://images.viblo.asia/c8e62bdb-0ca8-421b-bb40-e681f0cf5a15.png)

Điều kiện rất đơn giản nếu người dùng cung cấp tên người dùng và mật khẩu chính xác, người dùng sẽ được chuyển đến trang chủ. Nếu bất kỳ đầu vào nào sai, một thông báo lỗi sẽ được hiển thị.

***Step 1***: Có 2 Conditions là Email và Password

***Step 2***: Tính số Rules

• Có 2 conditions

• Mỗi condition có 2 giá trị T/F. <br>

+ T : Email/Password đúng<br>
+  F: Email/Password sai<br>
=> Số rules = số giá trị của Condition của Email * số giá trị của Condition Password = 2*2 = 4

***Step 3***: Đặt các kết hợp trong bảng

![image.png](https://images.viblo.asia/0f41b11f-a7de-486a-b153-e521dddfac14.png)

***Step 4***: Rút gọn testcase

Điều kiện đăng nhập là cả Email và Password đều đúng. Nên khi nhập Email sai hoặc Password sai thì hệ thống đã hiện thị thông báo lỗi rồi. Vì vậy trường hợp nhập cả Email và Password đều sai không cần thiết nữa và có thể được bỏ qua.

*Bảng quyết định sau khi rút gọn là:* <br>

![image.png](https://images.viblo.asia/c16105aa-ebce-4c0d-b0b4-09e74e4f7eca.png)

**Ví dụ 2**: Một nhà sách áp dụng một số hình thức bán chiết khấu như sau:

● Nếu khách hàng mua sách trong dịp sinh nhật, giảm giá 20% trên mỗi hóa đơn

● Nếu khách hàng có thẻ tích điểm, chiết khấu 15% trên mỗi hóa đơn

● Nếu khách hàng có voucher giảm giá, chiết khấu 30% trên mỗi hóa đơn

Không áp dụng đồng thời các chương trình khuyến mãi, nếu có nhiều ưu đãi thì ưu đãi cao nhất áp dụng. Sử dụng bảng quyết đinh để liệt kê các trường hợp kiểm thử.

***Step 1*** Conditions:

+ Condition 1 là Birthday
+ Condition 2 là Point
+ Condition 3 là Voucher

***Step 2***: Tính rules

+  Có 3 conditions

+  Mỗi conditions có 2 giá trị T/F

+ Số rules = số giá trị của Condition1 * số giá trị của Condition2 * số giá trị của Condition3 = 2 * 2 * 2 =8

***Step 3***: Xây dựng bảng quyết định:

![image.png](https://images.viblo.asia/5243e3f1-2f1c-4248-89e1-e8d2be5d0e60.png)

*Diễn giải một số rule:*

+ Rules 1: Khách hàng mua sách trong dịp sinh nhật, vừa có thẻ tích điểm, vừa có voucher giảm giá. Quy tắc là: không áp dụng đồng thời các chương trình khuyến mãi, nếu có nhiều ưu đãi thì ưu đãi cao nhất. Nên trong Rules 1 khách hàng sẽ được nhận ưu đãi 30%. <br>
+ Rules 2: Khách hàng mua sách trong dịp sinh nhật, vừa có thẻ tích điểm nhưng không có voucher giảm giá thì được nhận chiết khấu 20%.<br>
+ Rules 8: Khách hàng không mua sách trong dịp sinh nhật, không có thẻ tích điểm, và cũng không có voucher giảm giá. Nên kết quả là 0%.<br>

***Step 4***: Giảm số lượng testcase thừa

Lựa chọn các kết quả và xem xét điều kiện của các rules đó để collapse. Ở đây là các ô có đồng màu.
![image.png](https://images.viblo.asia/4f3dcce9-148b-4971-9b28-9b19a8999b04.png)
=> Còn 4 testcase <br>

Sau khi thực hiện các bước tuần tự, với số lượng kết hợp case ban đầu đã có thể giảm tới mức tối thiểu, với số case còn lại đó vẫn hoàn toàn cover được toàn bộ function, không gặp phải hiện trạng test trùng lặp, thiếu case, ...giảm thiểu effort test đến mức tối đa..

Cảm ơn mọi người đã đọc!