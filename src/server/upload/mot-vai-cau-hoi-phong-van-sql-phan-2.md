Để nối tiếp bài viết [một vài câu sql thường gặp trong phỏng vấn sql (phần 1)](https://viblo.asia/p/mot-vai-cau-sql-thuong-gap-trong-phong-van-sql-phan-1-V3m5W16bZO7) hôm nay mình xin tiếp tục giới thiệu đến các bạn phần tiếp theo của loạt bài viết nhân dịp mình sắp đi phỏng vấn ở một công ty mới :)
#### 1. Câu 1
#### Cho bảng sau:

```sql
Id	Name			ReferredBy
1	John Doe		NULL
2	Jane Smith		NULL
3	Anne Jenkins		2
4	Eric Branford		NULL
5	Pat Richards		1
6	Alice Barnes		2
```
#### Đây là một truy vấn được viết để trả về danh sách khách hàng không được giới thiệu bởi Jane Smith:
```sql
SELECT Name FROM Customers WHERE ReferredBy <> 2;
```
#### Câu truy vấn trả về kết quả là gì? Tại sao? viết lại truy vấn?

**trả lời:**

Nhìn vào bảng ta có thể dễ dàng thấy có 4 khách hàng không được giới thiệu bởi Jane Smith nhưng câu truy vấn trên sẽ chỉ trả lại một kết quả: Pat Richards. Tất cả những khách hàng được giới thiệu bởi "không ai cả" (NULL) thì không xuất hiện dù rõ ràng họ không được giới thiệu bởi Jane Smith và NULL khác 2 vì sao lại như vậy? câu trả lời là:
   
   SQL Server sử dụng three-valued logic, điều này có thể là vấn đề cho các lập trình viên quen với tow-valued logic (TRUE hoặc FALSE) hầu hết các ngôn ngữ lập trình sử dụng. Nghe có vẻ hàn lâm nhưng có thể hiểu là trong hầu hết các ngôn ngữ, nếu bạn được sử dụng ReferredBy = 2 và ReferredBy <> 2, bạn sẽ mong đợi một trong số chúng là đúng và cái còn lại là sai, với cùng giá trị của ReferredBy. Tuy nhiên, trong SQL Server, nếu ReferredBy là NULL, cả hai đều không đúng và không phải là false. Bất cứ điều gì so với NULL đánh giá đến giá trị thứ ba trong three-valued logic: UNKNOWN.
   
bạn có thể viết lại truy vấn như sau :
```sql
SELECT Name FROM Customers WHERE ReferredBy IS NULL OR ReferredBy <> 2
```
#### 2. Câu 2 
#### Từ sơ đồ cơ sở dữ liệu dưới đây hãy viết một truy vấn SQL để trả về một danh sách tất cả các hóa đơn. Đối với mỗi hóa đơn, hãy hiển thị ID hóa đơn, ngày thanh toán, tên của khách hàng và tên của khách hàng đã giới thiệu khách hàng đó (nếu có). Danh sách phải được sắp xếp theo ngày thanh toán.
![](https://images.viblo.asia/a391de5c-56a7-4c3d-9eb3-02f188e3f7d2.png)

**Trả lời:**

```sql
SELECT i.Id, i.BillingDate, c.Name, r.Name AS ReferredByName
FROM Invoices i
 JOIN Customers c ON i.CustomerId = c.Id
 LEFT JOIN Customers r ON c.ReferredBy = r.Id
ORDER BY i.BillingDate;
```
#### 3. Sự khác nhau giữa char và varchar?
* Khi được lưu trữ trong cơ sở dữ liệu, varchar chỉ sử dụng không gian được phân bổ. Ví dụ. nếu bạn có một varchar (1999) và đặt 50 byte trong bảng, nó sẽ sử dụng 52 byte(2 byte tiền tố chiều dài).

* Nhưng khi được lưu trữ trong cơ sở dữ liệu, char luôn sử dụng độ dài tối đa và được đệm trắng. Ví dụ. nếu bạn có char (1999) và đặt 50 byte trong bảng, nó sẽ tiêu thụ 2000 byte.

#### 4. DATETIME, DATE, TIMESTAMP trong mySQL


| Kiểu dữ liệu | Mô tả | Định dạng hiển thị | Phạm vi|
| -------- | -------- | -------- | -------- |
| DATETIME     | Sử dụng khi bạn cần giá trị lưu trữ cả hai thông tin ngày tháng và thời gian.     | YYYY-MM-DD HH:MM:SS| '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.|
| DATE | 	Sử dụng khi bạn muốn lưu trữ chỉ thông tin ngày tháng. | YYYY-MM-DD | '1000-01-01' to '9999-12-31'.|
|TIMESTAMP| Lưu trữ cả hai thông tin ngày tháng và thời gian. Giá trị này sẽ được chuyển đổi từ múi giờ hiện tại sang UTC trong khi lưu trữ, và sẽ chuyển trở lại múi giờ hiện tại khi lấy dữ liệu ra.| YYYY-MM-DD HH:MM:SS | '1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC|

* nguồn tham khảo: https://www.toptal.com/sql/interview-questions