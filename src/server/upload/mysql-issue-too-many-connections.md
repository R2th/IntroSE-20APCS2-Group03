## 1. Lỗi Too many connections
Trong quá trình làm việc với hệ quản trị cơ sơ sở dữ liệu(Mysql, Postgres, Oracle...)  rất nhiều khi gặp lỗi "**Too many connections**".
Tại thời điểm đó, database không thể tiếp tục nhận các kết nối đến.
* Bạn không thể connect dùng GUI.
* Các service và application không hoạt động. 

-> Giải pháp đơn giản nhất là reset lại database, để đóng các connections hiện tại.

- **Ưu điểm**: Nhanh, dễ dàng.
- **Nhược điểm**: Nó chỉ giải quyết tạm thời, 1 thời gian sau (1 giờ, 1 ngày ...) database sẽ lại tiếp tục gặp lỗi này, không giải quyết được gốc rễ của vấn đề.

Nếu là 1 kỹ sư có tâm với sản phẩm của mình, chúng ta sẽ cố gắng đi sâu vào gốc dễ vấn đề để xử lý:

Trong bài hướng dẫn này, mình hướng dẫn 1 số cách check trên Mariadb các database khác làm tương tự.
## 2. Phân tích nguyên nhân
* Suy nghĩ đầu tiên trong đầu kiểm tra **max connections** hiện tại và  tăng giới hạn của nó. 

```
show global variables like '%max_connections%'
```

![](https://images.viblo.asia/d5da05a7-7511-4dc9-9783-d72dd6842232.png)

Như trong hình ta có thể thấy, hiện tại database của mình đang là **max_connections=100**
Như vậy nó chỉ cho tối đa 100 connections. Mình sẽ tăng nó lên 1000. 
```
set global max_connections = 1000;
```

Đến đây các bạn sẽ tiếp tục hỏi, tại sao không tăng đến 1 triệu đi. Thực ra cái gì cũng có giá của nó. 
Mình sẽ tiếp tục phân tích.

Phụ thuộc vào RAM available của hệ thống là bao nhiêu, lượng ram sử dụng cho mỗi connection là bao nhiêu.
Lưu ý rằng không có giới hạn cứng của **max_connections**. 
Chúng ta phải lựa chọn 1 cách thông mình dự vào workload của hệ thống.
Ví dụ: Với những kết nối sử dụng các bảng tạm, bộ nhớ sử dụng cho 1 connection sẽ nhiều. Với các server có it bộ nhớ hay giới hạn số lượng connection ở phía ứng dụng: **max_connections=100-300**.
Với các server từ **16G RAM** trở lên, **max_connections>=1000**, nếu ứng dụng xử lý tốt, tác vụ đơn giản (không dùng nhiều bảng tạm, bộ nhớ tạm)  có thể **max_connections=8000**.

* Chúng ta cần xem xét chi tiết, connection đến từ đâu để xử lý thay vì chỉ cắm đầu vào tăng max_connections.

Chạy lệnh này để kiểm tra cơ sở dữ liệu đang có các connection đến từ đâu (**Host**), từ user nào (**User**), database nào (**db**).  Xem chi tiết tại [đây](https://www.mysqltutorial.org/mysql-show-processlist/#:~:text=The%20SHOW%20PROCESSLIST%20command%20returns,threads%20with%20the%20KILL%20statement.&text=Accounts%20with%20the%20PROCESS%20privilege,threads%20associated%20with%20their%20accounts.) 
Kết quả như bên dưới.
```
show processlist ;
```
![](https://images.viblo.asia/750bba1f-7a98-4e20-9654-a30b47050fbb.png)

Từ hình trên ta có thể thấy:
- 1. 5 connections đầu Id (1->5) là của hệ thống -> cái này không can thiệp.
- 2. 3 connections tiếp Id (12->14) của cái gì đó chạy bằng user (haproxy) -> nó là của service của mình
- 3. connection cuối cùng đến từ chính GUI của mình đang thực hiện để querry. 
## 3. Kết luận
Từ đó chúng ta có thể kiểm tra được ứng dụng nào đang tạo nhiều connections. Chúng ta sẽ đi vào ứng dụng, kiểm tra các thông số của nó để tìm hướng giải quyết.
Bài viết tiếp theo, mình sẽ đưa ra 1 ví dụ cụ thể cách mình xử lý trong bài toán thực tế.
- Có thể ứng dụng config không đúng.
- Ứng dụng bị leak connection (cái này rất nghiêm trọng)
- Ứng dụng đang bị DDOS

Nếu cần trao đổi, mọi người hãy comment bên dưới.