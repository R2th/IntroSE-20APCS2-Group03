Trong series này, mình sẽ đưa ra các bài toàn mình và đồng nghiệp gặp phải. 
nó là các yêu cầu gặp phải trong quá trình làm việc, nó không quá khó. Mình note lại vừa để chia sẻ, vừa lưu lại cho bản thân:

### 1. Yêu cầu
Mình có 2 bảng như thế này:
**services** 
| id | name |
| -------- | -------- |
| 1     | service 1    |
| 2     | service 2   |
| 3     | service 3    |




**room_services** Giá trị trong bảng 
| room_id | service_id |
| -------- | -------- |
| 1     | 2    |
| 1     | 3   |
| 2   | 2    |
| 3     | 2    |
| 1     | 1    |
| 2     | 3    |


Mỗi quan hệ như sau: **1 phòng có nhiều dịch vụ**, **mỗi dịch vụ có thể thực hiện ở nhiều phòng**


Yêu cầu bài toán: **Tìm ra Id rất cả các phòng mà thực hiện tất cả các dịch vụ**:
Như trên ví dụ trên mình sẽ tìm ra phòng 1(id = 1) nó thực hiện cả 3 dịch vụ (1,2,3)

Để hiểu hơn bài toán, mình nên chủ động tạo dữ liệu, thử đọc yêu cầu làm thử sau đó đọc tiếp sẽ hiệu quả hơn.

### 2. Phân tích:
- Dựa vào bảng **services**, ta lấy được danh sách tất cả các **service_id**
```
select id from rooms;
```
- Dựa vào bảng **room_services**, khi group theo **service_id** thì ta sẽ nhóm lại các nhóm dịch vụ theo **room_id**
các service_id thì chỉ có thể thu được dựa vào các toán tử [aggrate function](https://www.w3resource.com/mysql/aggregate-functions-and-grouping/aggregate-functions-and-grouping-in-mysql.php)
Mình có thể sử dụng kết quả của các hàm này để so sánh với list Id từ bảng room 
### 3. Giải pháp
**Cách 1**: Dựa vào toán tử **sum**
```
select room_id
from room_services
group by room_id
having sum(service_id) = (select sum(id) from services);
```

**Cách 2**: Nếu trường **service_id** không phải số nguyên, thì ta có thể dùng hàm **group_concat** để tạo thành các **chuỗi**, lưu ý đến thứ tự, khi đó ta cần phải **sort** trước
```
select room_id
from room_services
group by room_id
having group_concat(service_id order by service_id) = (select group_concat(id order by id) from services);
```

Nếu cần trao đổi, mọi người hãy bình luận bên dưới. Cảm ơn vì đã đọc bài của mình.