Hôm nay mình sẽ giới thiệu với mọi người về Eager Loading trong Django. Chắc hẳn những ai từ các ngôn ngữ khác như Ruby hay là PHP chuyển qua Python đều quá quen thuộc với từ khóa này phải không nào? Nhưng không phải tất cả mọi người đều biết về nó và mình sẽ cùng các bạn tìm hiểu xem Eager Loading trong Django sẽ như thế nào nhé. Let's go!
![](https://images.viblo.asia/e048e910-b1a5-4037-af72-29df2c8e0398.png)

# Eager Loading là gì? 
**Eager Loading** là một khái niệm trong khi truy xuất dữ liệu, bạn sẽ nhận được các data cần thiết cùng với các đối tượng (object) có liên quan đến data đó. Nó ngược lại với **Lazy Loading** khi bạn chỉ nhận được một data trong một lần truy vấn (query) và phải thực hiện query tiếp khi bạn muốn lấy ra các objects liên quan đến nó. 

Nói đến đây thì hơi khó hiểu đúng không =)) vì mình cũng thấy nó hơi rối. Nhưng không sao, chúng ta cùng nhau một lần nữa hiểu nó qua ví dụ sau nhé: 
```python
# models.py
from django.db import models


class Brand(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Car(models.Model):
    brand = models.ForeignKey('Brand', db_column='brand_id', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    def __str__(self):
        return self.name
```
```python
>>> from models import Car
>>> cars = Car.objects.all()
>>> for car in cars:
...     print(car.brand.name)
```
Có thể dễ dàng thấy được trong ví dụ trên chúng ta đã phải thực hiện: 1 query để lấy ra tất cả các xe ô tô và cùng mới mỗi chiếc xe ô tô đó sẽ là 1 query để lấy ra tên hãng của nó. Nếu chúng ta có 10 chiếc ô tô, vòng lặp này sẽ phải thực hiện 11 queries. 

Hay nói cách khác, chúng ta đã phải thực hiện **N+1** queries. Nếu chúng ta có tới vài nghìn, hay thậm chí là vài triệu chiếc xe thì sao nhỉ? Đó là một con số khổng lồ...

Nhưng với **Eager Loading**, thì bài toán này được giải quyết thật dễ dàng.
# Giải quyết bài toán
Đối với bài toán này, mình sẽ giới thiệu với các bạn 2 cách để giải quyết nó. Trước khi tìm hiểu xem 2 cách này là gì, chúng ta hãy thử chạy 1 đoạn code sau:
```python
# Cách 1
>>> from models import Car
>>> cars = Car.objects.select_related('brand')
>>> for car in cars:
...     print(car.brand.name)
```
```python
# Cách 2
>>> from models import Car
>>> cars = Car.objects.prefetch_related('brand')
>>> for car in cars:
...     print(car.brand.name)
```
Nếu nhìn qua, chúng ta có thể thấy 2 cách này không khác gì nhau và cũng gần giống với cách viết ban đầu đúng không nào? Nhưng sau khi chạy, chúng ta thử nhìn xem số query mà 2 đoạn code này đã thực hiện là gì nhé 
```SQL
# Cách 1
SELECT `car`.`id`, `car`.`brand_id`, `car`.`name`, `car`.`model`, `brand`.`id`, `brand`.`name` FROM `car` INNER JOIN `brand` ON (`car`.`brand_id` = `brand`.`id`)
```
```sql
# Cách 2
SELECT `car`.`id`, `car`.`brand_id`, `car`.`name`, `car`.`model` FROM `car`
SELECT `brand`.`id`, `brand`.`name` FROM `brand` WHERE `brand`.`id` IN (1, 2, 3, 4, 5)
```
Đến đây, chúng ta đã nhận ra được sự khác biệt giữa 2 cách và so với cách viết ban đầu rồi phải không. Qua đoạn code trên, mình muốn giới thiệu đến các bạn 2 cách xử lý đó là sử dụng `select_related` và `prefetch_related`. 

Theo [doc](https://docs.djangoproject.com/en/3.1/ref/models/querysets/#select-related) của Django đã nói rõ:
- `select_related` follow các mối quan hệ khóa ngoài, select các **đối tượng liên quan** đến nó khi thực hiện query bằng cách **JOIN** chúng.
- `prefetch_related` thực hiện các tìm kiếm riêng biệt cho từng mối quan hệ và thực hiện  ***joining in python**.

>  Sorry các bạn vì mình phải đánh dấu hoa thị (*) trước cụm từ **joining in python**. Bởi vì mình không biết phải diễn tả làm sao cho nó đúng nhất thông điệp của cụm từ này.

Cả `select_related` và `prefetch_related` được thiết kế nhẳm mục đích làm giảm số lượng query, nhưng chúng được thực hiện theo những cách khác nhau. 

`select_related` hoạt động bằng cách tạo query join và bao gồm các trường của đối tượng có liên quan trong câu lệnh **SELECT**. Cũng bởi lý do này, `select_related` chỉ mất một query mà có thể nhận được tất cả các object liên quan. Tuy nhiên, có một vài lưu ý khi các bạn sử dụng `select_related` đó là do chỉ mất 1 query mà có thể lấy ra tất cả các đối tượng liên quan, do đó để tránh có quá nhiều các tập kết quả lớn từ việc join nhiều mối quan hệ vào với nhau, thì `select_related` được khuyên dùng trong mối quan hệ một - nhiều hoặc một - một.

Mặt khác, `prefetch_related` thực hiện các truy vấn riêng biệt cho từng mối quan hệ và thực hiện kết hợp chúng lại. Điều này cho phép nó tìm kiếm và lọc trước các đối tượng trong mối quan hệ nhiều - nhiều bằng mệnh đề **WHERE IN**, điều này không thể thực hiện được bởi `select_related`.

Trên đây là những chia sẻ của mình trong việc giải quyết vấn đề N+1 queries. Hy vọng các bạn tiếp tục ủng hộ mình trong những bài viết tiếp theo.
![](https://images.viblo.asia/3e8ca5a4-c625-49f9-894a-109b5277c29c.jpg)

#### Related links:
https://docs.djangoproject.com/en/3.0/ref/models/querysets/#select-related

https://stackoverflow.com/a/45377282