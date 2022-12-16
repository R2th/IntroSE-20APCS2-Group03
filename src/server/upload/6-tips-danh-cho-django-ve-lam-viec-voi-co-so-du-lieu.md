Đối với mỗi 1 framework ORM cung cấp tiện ích tuyệt vời cho các developer để truy cập trừu tượng vào database. Nhằm mục đích tìm kiếm cơ sở dữ liệu và thay đổi một số mặc định thường thấy để có thể  cải tiến những chức năng để thao tác mạnh mẽ với các cơ sở dữ liệu hơn. Trong bài này tôi sẽ chia sẻ 9 mẹo để làm việc với cơ sở dữ liệu trong Django.
# 1. Aggregation with Filter
Trước khi sử dụng Django 2.0 nếu chúng ta muốn có được một cái gì đó giống như tổng số người dùng và tổng số người dùng hoạt động, chúng tôi phải dùng đến các biểu thức có điều kiện:
```
from django.contrib.auth.models import User
from django.db.models import (
    Count,
    Sum,
    Case,
    When,
    Value,
    IntegerField,
)
User.objects.aggregate(
    total_users=Count('id'),
    total_active_users=Sum(Case(
        When(is_active=True, then=Value(1)),
        default=Value(0),
        output_field=IntegerField(),
    )),
)
```
Trong Django 2,0 một đối số **filter** được thêm vào để tổng hợp các chức năng đã được thêm vào để làm cho điều này dễ dàng hơn rất nhiều:
```
from django.contrib.auth.models import User
from django.db.models import Count, F
User.objects.aggregate(
    total_users=Count('id'),
    total_active_users=Count('id', filter=F('is_active')),
)
```
Nếu bạn đang sử dụng PostgreSQL, hai truy vấn sẽ giống như sau:
```
SELECT
    COUNT(id) AS total_users,
    SUM(CASE WHEN is_active THEN 1 ELSE 0 END) AS total_active_users
FROM
    auth_users;
-----------------------------------
SELECT
    COUNT(id) AS total_users,
    COUNT(id) FILTER (WHERE is_active) AS total_active_users
FROM
    auth_users;
 ```
 
# 2. Kết quả QuerySet as namedtuples
Trong Django 2.0 một thuộc tính mới đã được thêm vào giá trị danh sách tên **[named](https://docs.djangoproject.com/en/2.0/ref/models/querysets/#django.db.models.query.QuerySet.values_list)**. Thiết lập của named là true sẽ trả về queryset như một danh sách các namedtuples:
```
> user.objects.values_list(
    'first_name',
    'last_name',
)[0]
(‘Haki’, ‘Benita’)
> user_names = User.objects.values_list(
    'first_name',
    'last_name',
    named=True,
)
> user_names[0]
Row(first_name='Haki', last_name='Benita')
> user_names[0].first_name
'Haki'
> user_names[0].last_name
'Benita
```
# 3. Custom Functions
Django ORM rất mạnh và tính năng phong phú nhưng nó không thể đáp ứng đủ với tất cả cơ sở dữ liệu. May mắn là ORM cho phép chúng ta mở rộng nó với các chức năng tùy chỉnh.
Giả sử chúng ta có modal Report với một field là duration. Chúng ta muốn tìm thời lượng trung bình của tất cả report:
```
from django.db.models import Avg
Report.objects.aggregate(avg_duration=Avg(‘duration’))
> {'avg_duration': datetime.timedelta(0, 0, 55432)}
```
Tuyệt, nhưng average chỉ cho ra độ chính xác thấp. Chúng ta cũng hãy thử lấy độ lệch tiêu chuẩn:
```
from django.db.models import Avg, StdDev
Report.objects.aggregate(
    avg_duration=Avg('duration'),
    std_duration=StdDev('duration'),
)
ProgrammingError: function stddev_pop(interval) does not exist
LINE 1: SELECT STDDEV_POP("report"."duration") AS "std_dura...
               ^
HINT:  No function matches the given name and argument types. You might need to add explicit type casts.
```
PostgreSQL không hỗ trợ stddev trên một khoảng thời gian - chúng ta cần phải chuyển đổi khoảng thời gian cho một số trước khi chúng ta có thể áp dụng STDDEV_POP vào.
```
SELECT
    AVG(duration),
    STDDEV_POP(EXTRACT(EPOCH FROM duration))
FROM 
    report;
      avg       |    stddev_pop    
----------------+------------------
 00:00:00.55432 | 1.06310113695549
(1 row)
````
Vậy làm thế nào chúng ta có thể thực hiện điều này trong Django? Bạn đoán nó - một chức năng tùy chỉnh:
```
# common/db.py
from django.db.models import Func
class Epoch(Func):
   function = 'EXTRACT'
   template = "%(function)s('epoch' from %(expressions)s)"
   ```
   Và sử dụng chức năng mới của chúng tôi như thế này:
   ```from django.db.models import Avg, StdDev, F
from common.db import Epoch
Report.objects.aggregate(
    avg_duration=Avg('duration'), 
    std_duration=StdDev(Epoch(F('duration'))),
)
{'avg_duration': datetime.timedelta(0, 0, 55432),
 'std_duration': 1.06310113695549}
 ```
# 4.  Statement Timeout
Đây có lẽ là mẹo đơn giản và quan trọng nhất. Việc lập trình dễ dẫn đến sự chủ quan và chúng ta phạm sai lầm. Chúng ta không thể xử lý từng trường hợp nên chúng ta phải đặt giới hạn.
Không giống như các máy chủ ứng dụng không chặn khác như Tornado, asyncio hoặc thậm chí Node, Django thường sử dụng quy trình các worker đồng bộ. Điều này có nghĩa là khi một người dùng thực hiện một hoạt động lâu dài, quá trình worker bị chặn và không ai có thể sử dụng nó cho đến khi nó được thực hiện.
Tôi chắc chắn rằng không có ai thực sự chạy Django chỉ với một quy trình worker nhưng tôi vẫn muốn đảm bảo rằng một truy vấn không chiếm  nhiều tài nguyên quá lâu.
Chúng ta có thể thiết lập thời gian chờ global trong tệp wsgi.py như sau:
```
# wsgi.py
from django.db.backends.signals import connection_created
from django.dispatch import receiver
@receiver(connection_created)
def setup_postgres(connection, **kwargs):
    if connection.vendor != 'postgresql':
        return
    
    # Timeout statements after 30 seconds.
    with connection.cursor() as cursor:
        cursor.execute("""
            SET statement_timeout TO 30000;
        """)
   ```
   Tại sao lại là wsgi.py? Bằng cách này, nó chỉ ảnh hưởng đến quá trình worker chứ không ảnh hướng đến các truy vấn phân tích ngoài, các cron task, v.v ...
   # 5. Select for update … of
Một mô hình phổ biến để thao tác một transaction trong có ví dụ như sau:
```
from django.db import transaction as db_transaction
...
with db_transaction.atomic():
  transaction = (
        Transaction.objects
        .select_related(
            'user',
            'product',
            'product__category',
        )
        .select_for_update()
        .get(uid=uid)
  )
    ...
 ```
Để thao tác một transaction thường liên quan đến một số thuộc tính từ người dùng và sản phẩm vì vậy chúng ta thường sử dụng select_related để bắt buộc tham gia và lưu một số truy vấn. Việc cập nhật transaction cũng liên quan đến việc có được một khóa để đảm bảo nó không bị người khác can thiệp.

Khi select_for_update được sử dụng cùng với select_related, Django sẽ cố gắng lấy một khóa trên tất cả các bảng trong truy vấn.
```
from django.db import transaction as db_transaction
...
with db_transaction.atomic():
  transaction = (
        Transaction.objects
        .select_related(
            'user',
            'product',
            'product__category',
        )
        .select_for_update(
            of=('self',)
        )
        .get(uid=uid)
  )
  ```
  Tùy chọn **of** đã được thêm vào select_for_update. Sử dụng chúng ta có thể rõ ràng các bảng mà chúng ta muốn khóa. **self** là một từ khóa đặc biệt cho thấy chúng ta muốn khóa mô hình mà chúng ta đang làm việc, trong trường hợp này là Transaction.
   
  # 6. FK Indexes
  Khi tạo một mô hình, Django sẽ tự động tạo một chỉ mục(index) B-Tree trên bất kỳ khoá ngoại nào. Indexes B-Tree có thể khá nặng và đôi khi chúng không thực sự cần thiết.
  
  Một ví dụ điển hình là một model thông qua mối quan hệ M2M:
  ```
  class Membership(Model):
    group = ForeignKey(Group)
    user = ForeignKey(User)
```
Trong model trên, Django sẽ tạo ra hai chỉ mục - một cho người dùng và một cho nhóm. Một mô hình phổ biến khác trong mô hình M2M là thêm một ràng buộc duy nhất trên hai trường. Trong trường hợp này có nghĩa là người dùng chỉ có thể là thành viên của cùng một nhóm sau khi:
```
class Membership(Model):
    group = ForeignKey(Group)
    user = ForeignKey(User)
    class Meta:
        unique_together = (
           'group',
           'user',
        )
```
unique_together cũng sẽ tạo một index trên cả hai trường. Vì vậy, chúng tôi nhận được một model với hai field và ba index.
Tùy thuộc vào công việc với mỗi model,  có thể loại bỏ các chỉ mục FK và giữ chỉ một trong những được tạo ra bởi các ràng buộc duy nhất:
```
class Membership(Model):
    group = ForeignKey(Group, db_index=False)
    user = ForeignKey(User, db_index=False)
    class Meta:
        unique_together = (
            'group',           
            'user',
        )
```
Việc đơn giản đánh index sẽ giúp create và update dữ liệu nhanh hơn

nguồn : https://medium.com/@hakibenita/9-django-tips-for-working-with-databases-beba787ed7d3