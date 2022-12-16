Tiếp theo [bài 1](https://viblo.asia/p/toi-uu-sql-join-where-phan-1-aWj53BApl6m) về tối ưu performance.

Mình có các bảng như sau: 
1. **dashboards**(id, name) 
```
CREATE TABLE `dashboards` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)
```
2. **user_logs**(id, user_id, dashboard_id)
```
CREATE TABLE `user_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `dashboard_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
```

Yêu cầu bài toán đặt ra:
Hiển thị ra tên dashboard và số lượng người truy cập vào dashboards dựa vào bảng logs theo thứ tự giảm dần.
Ví dụ:


| dashboard id | dashboard name | number of users |
| -------- | -------- | -------- |
| 10     | Dashboad 10     | 10000   |
| 2     | Dashboad test    | 9999   |
| 1     | Dashboad final   | 99   |


Theo như yêu cầu bài toán, 
- join bẳng **dashboads** với bảng **user_logs**, 
- sau đó **group** theo **ul.dashboard_id**
- sort giảm dần như code bên dưới.

```
select d.id, d.name, count(distinct ul.dashboard_id) as count
from dashboards d
         join user_logs ul on d.id = ul.dashboard_id
group by ul.dashboard_id
order by count desc;
```

Dừng lại phân tích chút, bảng user_logs chứa rất nhiều data (10tr bản ghi, mỗi lần 1 user vào dashboard là lại được log lại). -> chưa tối ưu performance. 
ý tưởng tương tự như [bài viết số 1](https://viblo.asia/p/toi-uu-sql-join-where-phan-1-aWj53BApl6m)
nghĩ cách giảm số lượng bản ghi trước khi join 

### Aggregate trước, join sau. 
Nhận thấy bảng user_logs này, chỉ cần lấy thông tin dashboard_id và count(số lượng user đã truy cập), số lượng bản ghi tạo ra bằng số lượng dashboards

```
select dashboard_id, count(distinct user_id) as count
from user_logs group by dashboard_id;
```

sau đó join thì sẽ nhanh hơn rất nhiều. cuối cùng ta có.

```
select *
from dashboards d
         join
     (select dashboard_id, count(distinct user_id) as count
      from user_logs
      group by dashboard_id) temp_logs
     on d.id = temp_logs.dashboard_id
order by temp_logs.count desc;
```


### Nếu vẫn muốn cải tiến perform, chúng ta làm như sau: 
1. Giảm số lượng bản ghi trong user_logs 
Ta nhận thấy trong bảng user_logs thì chỉ cần quan tâm đến cặp user_id, dashboard_id.
Ví dụ 1 người vào xem dashboard 1000 lần thì chỉ cần 1 cặp duy nhất user_id, dashboard_id 

```
select distinct user_id, dashboard_id
from user_logs;
```
Đoạn tiếp theo query tương tự ở bước trên
cuối cùng ta có.

```
select *
from dashboards d
         join
     (select dashboard_id, count(distinct user_id) as count
      from (select distinct user_id, dashboard_id from user_logs) as user_dashboards
      group by dashboard_id) temp_logs
     on d.id = temp_logs.dashboard_id
order by temp_logs.count desc;
```

Nếu cần trao đổi, mọi người hãy bình luận bên dưới.
Cảm ơn vì đã đọc bài của mình.