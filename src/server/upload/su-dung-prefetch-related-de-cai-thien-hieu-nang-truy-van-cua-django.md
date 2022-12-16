# 1. Mở đầu.
Chắc hẳn đối với những developer python nói chung và django nói riêng thì việc sử dụng ORM của django chẳng có gì xa lạ đối với select_related và prefetch_related, hôm nay mình xin tổng kết kiến thức chung, cách sử dụng của chúng trong project hiện tại mình đang phát triển. 

đầu tiên phải có cơ sở dữ liệu , chúng ta có models như sau :
```
class Program(models.Model):
    name = models.CharField(max_length=20)

class Price(models.Model):
    program = models.ForeignKey(Program)
    from_date = models.DateTimeField()
    to_date = models.DateTimeField()

class Order(models.Model):
    state = models.CharField(max_length=20)
    items = models.ManyToManyField(Price)
```
* Program là một phiên, bài giảng hoặc một ngày hội nghị.
*  Người dùng có thể đăng ký một hoặc nhiều programs. Mỗi mục trong Order là giá program tại thời điểm đặt hàng.
# 2. Vấn đề đặt ra.
Để lấy ra tên trương trình mà 1 cá nhân đăng kí học cần truy vấn
```
> o = Order.objects.filter(state=’completed’).first()
(0.002) SELECT … FROM “orders_order” WHERE “orders_order”.”state” = ‘completed’ ORDER BY “orders_order”.”id” ASC LIMIT 1;
> [p.program.name for p in o.items.all()]
(0.002) SELECT … FROM “events_price” INNER JOIN “orders_order_items” ON (“events_price”.”id” = “orders_order_items”.”price_id”) WHERE “orders_order_items”.”order_id” = 29; args=(29,)
(0.001) SELECT … FROM “events_program” WHERE “events_program”.”id” = 8; args=(8,)
```
* Để thực hiện truy vấn số order cần 1 câu query
* Để lấy tên chương trình cần thêm 1 query nữa

Nếu cần 2 queries cho mỗi order, số queries cho 100 orders se là 1 + 100 * 2 = 201 queries. Rất nhiều !!!

Hãy sử dụng Django để giảm số lượng truy vấn:
```
> o.items.values_list(‘program__name’)
(0.003) SELECT “events_program”.”name” FROM “events_price” INNER JOIN “orders_order_items” ON (“events_price”.”id” = “orders_order_items”.”price_id”) INNER JOIN “events_program” ON (“events_price”.”program_id” = “events_program”.”id”) WHERE “orders_order_items”.”order_id” = 29 LIMIT 21;
```
Tuyệt ! Django đã thực hiện một liên kết giữa Price và Program và giảm số lượng truy vấn xuống chỉ còn một truy vấn cho mỗi order. Số query giảm còn 101, vậy có thể làm tốt hơn không ?
# 3. Vì sao không sử dụng join
Câu hỏi đầu tiên xuất hiện trong đầu là Tại sao chúng ta không thể join các bảng?

Nếu chúng ta có foreign key, chúng ta có thể sử dụng select_related hoặc chúng ta đã làm ở trên để tìm nạp các trường liên quan trong một truy vấn duy nhất.

Ví dụ: chúng ta đã tìm nạp tên program cho một danh sách price trong một truy vấn duy nhất bằng cách sử dụng value_list (‘program__name').  Chúng ta đã có thể làm điều đó bởi vì mỗi mức giá có liên quan đến chính xác một program.

Nếu mối quan hệ giữa hai mô hình là nhiều với nhiều người, chúng ta không thể làm điều đó. Mỗi order có một hoặc nhiều price liên quan - nếu chúng ta tham gia hai bảng, chúng tôi sẽ nhận được các đơn hàng trùng lặp:
```
SELECT
    o.id AS order_id,
    p.id AS price_id
FROM 
    orders_order o 
    JOIN orders_order_items op ON (o.id = op.order_id) 
    JOIN events_price p ON (op.price_id = p.id) 
ORDER BY 
    1,
    2;
order_id | price_id 
----------+----------
       45 |       38
       45 |       56
       70 |       38
       70 |       50
       70 |       77
       71 |       38
```
# 4. Nhập prefetch_related
```
> o = Order.objects.filter(
    state='completed',
).prefetch_related(
    'items__program',
).first()
(0.002) SELECT ... FROM "orders_order" WHERE "orders_order"."state" = 'completed' ORDER BY "orders_order"."id" ASC LIMIT 1;
(0.001) SELECT ("orders_order_items"."order_id") AS "_prefetch_related_val_order_id", "events_price"... FROM "events_price" INNER JOIN "orders_order_items" ON ("events_price"."id" = "orders_order_items"."price_id") WHERE "orders_order_items"."order_id" IN (29);
(0.001) SELECT "events_program"."id", "events_program"."name" FROM "events_program" WHERE "events_program"."id" IN (8);
```
Trong truy vấn thứ hai và thứ ba, chúng ta có thể thấy Django đã tìm nạp thông qua bảng order_order_items và các programs có liên quan từ event_program. Các kết quả của việc tìm nạp trước  (prefetch) được lưu trữ trên các đối tượng.
```
> [p.program.name for p in o.items.all()]
```
Không có truy vấn bổ sung - chính xác những gì chúng ta muốn!
Khi sử dụng prefetch, nó rất quan trọng để làm việc với object và không phải với query. Cố gắng tìm nạp (prefetch) tên chương trình bằng một truy vấn sẽ tạo ra kết quả tương tự nhưng sẽ dẫn đến một truy vấn bổ sung:
```
> o.items.values_list(‘program__name’)
(0.002) SELECT “events_program”.”name” FROM “events_price” INNER JOIN “orders_order_items” ON (“events_price”.”id” = “orders_order_items”.”price_id”) INNER JOIN “events_program” ON (“events_price”.”program_id” = “events_program”.”id”) WHERE “orders_order_items”.”order_id” = 29 LIMIT 21;
```
vậy đã giảm số query 100 order chỉ cần 3 câu queries
# 5. Giới thiệu về Prefetch
Prefetch object được giới thiệu từ Django 1.7 kế thừa từ prefetch_related.

Object mới cho phép developer ghi đè truy vấn được Django sử dụng để tìm nạp trước (prefetch) các đối tượng liên quan. Trong ví dụ trước của chúng ta, Django đã sử dụng hai truy vấn cho prefetch - một cho  thông qua  bảng price và một cho bảng program. Điều gì sẽ xảy ra nếu chúng ta có thể bảo Django kết hợp hai bảng này lại với nhau?
```
> prices_and_programs = Price.objects.select_related(‘program’)
> o = Order.objects.filter(
    state='completed'
).prefetch_related(
    Prefetch('items', queryset=prices_and_programs)
).first()
(0.001) SELECT … FROM “orders_order” WHERE “orders_order”.”state” = ‘completed’ ORDER BY “orders_order”.”id” ASC LIMIT 1;
(0.001) SELECT (“orders_order_items”.”order_id”) AS “_prefetch_related_val_order_id”, “events_price”…., “events_program”…. INNER JOIN “events_program” ON (“events_price”.”program_id” = “events_program”.”id”) WHERE “orders_order_items”.”order_id” IN (29);
```

Chúng ta đã tạo một truy vấn tham gia price với các programs. Nói với Django sử dụng truy vấn này để tìm nạp trước  (prefetch) các giá trị. Điều này giống như nói với Django rằng chúng ta có ý định tìm nạp  (prefetch) cả items và programs cho mỗi order.
```
> [p.program.name for p in o.items.all()]
```
Khi chúng ta nói chuyện trước đó về các models, chúng ta đã đề cập rằng price được mô hình hóa dưới dạng bảng SCD. Điều này có nghĩa là chúng ta có thể chỉ muốn truy vấn price active tại một ngày nhất định sử dụng from_date và end_date:
```
> now = timezone.now()
> active_prices = Price.objects.filter(
    from_date__lte=now,
    to_date__gt=now,
)
```
Sử dụng Prefetch object, chúng ta có thể yêu cầu Django lưu trữ các đối tượng được prefetched objects trong một thuộc tính mới của tập kết quả:
```
> active_prices_and_programs = (
    Price.objects.filter(
        from_date__lte=now,
        to_date__gt=now,
    ).select_related('program')
)
> o = Order.objects.filter(
    state='completed'
).prefetch_related(
    Prefetch(
        'items',
        queryset=active_prices_and_programs,
        to_attr='active_prices',
    ),
).first()
(0.001) SELECT … FROM “orders_order” WHERE “orders_order”.”state” = ‘completed’ ORDER BY “orders_order”.”id” ASC LIMIT 1;
(0.001) SELECT … FROM “events_price” INNER JOIN “orders_order_items” ON (“events_price”.”id” = “orders_order_items”.”price_id”) INNER JOIN “events_program” ON (“events_price”.”program_id” = “events_program”.”id”) WHERE (“events_price”.”from_date” <= ‘2017–04–29T07:53:00.210537+00:00’::timestamptz AND “events_price”.”to_date” > ‘2017–04–29T07:53:00.210537+00:00’::timestamptz AND “orders_order_items”.”order_id” IN (29));
```
Chúng ta có thể thấy trong log Django chỉ thực hiện hai truy vấn và truy vấn tìm nạp trước bao gồm bộ lọc tùy chỉnh mà chúng ta đã xác định.
Để tìm nạp price active, chúng ta có thể sử dụng thuộc tính mới  to_attr:
```
> [p.program.name for p in o.active_prices]
```
Nguồn: https://hackernoon.com/all-you-need-to-know-about-prefetching-in-django-f9068ebe1e60
https://medium.com/@lucasmagnum/djangotip-select-prefetch-related-e76b683aa457
https://docs.djangoproject.com/en/1.11/ref/models/querysets/#prefetch-related