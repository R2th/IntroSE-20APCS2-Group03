# 1. What is the Black-box testing?
* Black-box testing là việc thực hiện kiểm tra các chức năng của một ứng dụng mà KHÔNG cần quan tâm vào cấu trúc bên trong, thiết kế hoặc mã hóa của nó.
* Mục đích chính là xác nhận phần mềm có hoạt động đáp ứng với tài liệu đặc tả hay mong đợi của khách hàng hay không. 
* Thường được thực hiện bởi các testers.
* Được áp dụng cho các giai đoạn:
   + Unit test
   + Integration test
   + System test
   + Acceptance test
   + Regression testing.
# 2. Black Box test design
## 2.1 Equivalence partitioning (EP) - Phân vùng tương đương (EP)
- Kỹ thuật phân vùng các input, output thành các khu vực có hành vi tương tự để được xử lý theo cùng một cách giống nhau
- Một giá trị trong vùng tương đương hoạt động -> đồng nghĩa với các giá trị còn lại trong vùng cũng sẽ hoạt động 
- Khi design tests thì sẽ bao gồm tất cả các phân vùng hợp lệ và không hợp lệ

Ví dụ: Ở một trang web mua sắm rau củ. Trang này chỉ cho phép bạn submit đơn hàng khi bạn mua tối thiếu 0.5 kg và tối đa 25 kg. 

Từ đó ta có thể chia thành 3 phân vùng tương đương như sau: 
 ![](https://images.viblo.asia/b9353a08-3ed9-4d3e-99e7-96f0c81ca2b3.png)
Vùng 1: x <0.5 kg

Vùng 2: 0.5 kg <= x <= 25 kg

Vùng 3: x> 25 kg

Vì hệ thống chỉ chấp nhận giá trị  "0.5 kg <= x <= 25 kg" nên đây được gọi là phân vùng valid. 2 phân vùng còn lại là invalid. 
## 2.2 Boundary value analysis (BVA)- Phân tích giá trị biên (BVA)
- Giá trị biên: Là giá trị ngay ở rìa của mỗi phân vùng tương đương
- Giá trị này thường không chính xác bằng những giá trị bên trong vùng tương đương, nên nó là nơi hay xảy ra lỗi nhất 
- Two-point boundary: giá trị lớn nhất và nhỏ nhất của phân vùng tương đương đó
- Three boundary values: các giá trị trước, tại và ngay trên giá trị biên
- Khi design tests thì sẽ bao gồm tất cả các giá trị biên hợp lệ và không hợp lệ

Như ví dụ trên, ta có 2 giá trị biên 0.5 và 25 

 Khi nhắc tới phân vùng tương đương thì sẽ ưu tiên pick những giá trị nằm giữa để test (ví dụ 0.2, 15, 35) còn với "Two-point boundary" thì sẽ là các giá trị cận với biên: 04, 0,5, 25, 25.1
 
Tương tự thì three boundary values: 0.4, 0.5, 0.6, 24.9, 25, 25.1

## 2.3 Decision tables - bảng quyết định
- Khám phá sự kết hợp của các yếu tố input, output, action: Xác định các giá trị đầu vào, các hành động có thể có, và output có thể xảy ra. Từ đó lập thành bảng để theo dõi các trường hợp có thể có. 
- Các giá trị của các điều kiện và hành động thường được hiển thị dưới dạng giá trị Boolean (True or False)

Một ví dụ đơn giản cho form login 

| Condition | case01| case02 | case03 | case04 |
| -------- | -------- | -------- |  -------- |  -------- |  -------- |
|Email     | True     | True     | False | False |
|Password      | True     | False     | True | False |
|Result     | Success     | Error     | Error | Error |

Kết hợp các điều kiện true/false của đầu vào sẽ cho các result khác nhau. Tương ứng với các trường hợp có thể xảy ra. 

Từ đó có thể pick testcase phù hợp để đảm bảo độ bao phủ. 
## 2.4 State transition testing - Test chuyển đổi trạng thái
- Sử dụng biểu đồ chuyển đổi trạng thái để thấy các trạng thái phần mềm có thể có, cách truyền những giá trị Input khác nhau cho ra kết quả trạng thái khác nhau. Từ đó có cái nhìn bao quát và hiểu được cách xử lý của hệ thống 

Ví dụ: Trạm ATM cho phép access vào account khi người dùng nhập số mã pin sai không được quá 3 lần, nếu quá 3 lần sẽ bị nuốt thẻ card.

Từ yêu cầu trên ta có bảng sơ đồ trạng thái như hình dưới

Để cover 100% state transition coverage thì phải đảm bảo tất cả state được đi qua => như ví dụ này thì chúng ta đang có 2 tcs như sau:

TC1: Start ==> Access to account

TC2: Start ==> Eat Card
![](https://images.viblo.asia/9332c20c-5181-4358-9b11-3eb21850d895.png)