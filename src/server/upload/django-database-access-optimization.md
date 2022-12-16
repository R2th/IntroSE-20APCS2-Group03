Một QuerySet có thể được xây dựng, filter, sliced mà không hit vào database cho đến khi nó đánh gía kết quả truy vấn.
Có thể đánh giá QuerySet bằng các cách sau:
* Iteration
* Slicing
* Pickling/Caching
* repr()
* len()
* list()
* bool()

Để hiểu rõ hơn về các cách trên thì xin các bạn có thể xem thêm [tại đây](https://docs.djangoproject.com/en/2.0/ref/models/querysets/).
Trong bài này mình xin trình bày các cách đơn giản để tối ưu hóa truy vấn database.
Trong suốt cả bài này mình sẽ sử dụng Collection là User và Post.

# **1. Caching và QuerySet**
Django lưu trữ kết quả của một query trong cache khi bạn tìm nạp kết quả đó lần đầu tiên.
ví dụ như sau:
```
>>> first_names = [ user.first_name for user in User.objects.all()]
>>> emails = [ user.email for user in User.objects.all()]
```
Để tránh việc tác động vào db nhiều lần thì ta có thể sử dụng ***Django's database cache*** như sau:
```
>>> users = User.objects.all()                            # Không có tác động nào vào db
>>> first_names =  [user.first_name for user in users]    # tác động vào db và lưu kết quả vào cache
>>> emails = [user.email for user in users]               # sử dụng kết quả users trong cache.
```

Hoặc có cách khác :

```
>>> users = User.objects.all()
>>> db = dict(users.values_list("first_name", "email"))
>>> first_names, emails = db.keys(), db.values()
```

***Note:***
QuerySet sẽ không cache nếu nhử nó không được đánh giá:
```
queryset = Users.objects.all()
first_five = queryset[:5]    # tác động vào db
first_ten = queryset[:10]    # lại tác động vào db
```
Để tránh trường hợp trên ta có thể làm như sau:
```
users = Users.objects.all()
bool(users)  # queryset đã được đánh giá và lưu vào cache 
first_five = users[:5]    #  uses the cache
first_ten = users[:10]    # uses the cache
```

Nhưng không tránh được trường hợp gọi các thuộc tính quan hệ cũng là cho việc hit vào db nhiều lần:
```
>>> user = User.objects.get(id=1)
>>> user.post.all() # tác động vào db
>>> user.post.all() #lại tác động vào db tìm kiếm.
```
# **2. Sử dụng "Q" object**
QuerySet trong db sử dụng câu lệnh "and" trong truy vấn khi sử dụng filter:
```
>>> User.objects.filter(email__contains="adam", first_name="Adam")
SELECT * FROM user_table WHERE email LIKE '%adam%'  AND first_name=Adam; query string
```
Nhưng nếu muốn filter với câu lệnh "or" thì rất khó, nếu không nói là phải if else phúc tạp với 1 truy vấn đơn giản.
Chính vì vậy ta có thể sử dụng :
```
>>> from django.db.models import Q
>>> users = User.objects.filter(Q(email__startswith="an") | Q(email__startswith="sa"))
SELECT * FROM user_table WHERE email LIKE 'an%' OR email LIKE 'sa%' # query string
```
Đơn giản hơn nhiều. Cú pháp "Q" object sử dụng các điểu kiện như sau:
```
|  = OR
& = AND
~ = NOT
```

# **3. Tạo nhiều object sử dụng bulk_create()**
Giả sử ta 4 user:
```
>>> users_details = [
        ("Dian", "dian@test.com"),
        ("Ravi", "ravi@test.com"),
        ("Santa", "santa@test.com"),
        ("Shera", "shera@test.com")
]
>>> for first_name, email in users_details:
>>>     User.objects.create(first_name=first_name, email=email)
```
với đoạn code ở trên thì lặp rồi tạo từng object một, lần lần như thế thì lại phải tác động vào db một lần. Như thế rất không tốt. Thay vào đó thì django đã cũng cấp một hàm tạo hàng loạt object mà chỉ hit vào db một lần như sau:
```
>>> instance_list = [User(first_name=first_name, email=email) for first_name, email in users_details]
>>> User.objects.bulk_create(instance_list)
```
Nhưng với cách này thì có 1 số chú ý như sau:
* Hàm save() sẽ không được gọi, và  pre_save và post_save signal(hàm callback) không được gửi.
* Nó sẽ không hoạt đông trong model con với sự kếs thừa của nhiều bảng.
* không hoạt với với quan hệ nhiều nhiều
* Nếu khóa chính của model là AutoField() thì nó sẽ không lấy được và đặt khóa chính thuộc tính trừ khi db support(PostgreSQL).

# **4. Sử dụng F() expressions**
Cùng xem ví dụ dưới đây:

```
>>> users = User.objects.filter(designation="Developer")
>>> for user in users:
>>>    user.salary += 5000
>>>    user.save()
```
Với ví dụ trên thì mỗi lần update chúng ta sẽ tác động vào db một lần. Chúng ta có thể làm cho nó tác động vào db 1 lần duy nhất như sau:
```
>>> from django.db.models import F

>>> amount = 5000
>>> users = User.objects.filter(designation="Developer")
>>> users.update(salary=F("salary")+amount)
```
Một F() object đại diện cho giá trị của một model field. Nó có thể tham chiếu tới giá trị của model field đó và có thể tác với db mà không cần kéo các giá trị của chúng ra khỏi db để ném vào bộ nhớ của python, như thế sẽ tránh được việc tác động vào db nhiều lần.
Chính vì thế F() có thể giảm được số query tác động vào db.

# **5. Chỉ lựa chọn những field cần thiết để giảm thời gian truy vấn**
* **sử dụng values or values_list**
values và values_list có thể rất hữu dụng khi bạn có một collection(table) với nhiều cột mà chỉ muốn lấy một số column nhất định với kiểu dict hoặc tuple.

```
# Bad query
>>> users = User.objects.filter(province='ha-noi').select_related('post')
>>> my_list = []
>>> for user in users:
>>>   mylist.append({'title':user.name, 'post_title':users.post.title}) 

# Good Query
>>> mylist = User.objects.filter(province='ha-noi').values('name', 'post__title')
```

**Note:**

QuerySet.values()  sẽ trả queryset dạng dict. Mỗi dict đại diện cho 1 instance

QuerySet.values_list() sẽ trả lại queryset dạng tuple. Mỗi tuple đại diện cho 1 instance. order của tuple là theo id.

* **sử dụng only and defer**
Nếu bạn chỉ muốn lấy một số field nhất định thì có thể dùng only

```
>>> User.objects.only("username", "email")
```

Còn defer thì ngược lại với only, nếu bạn muốn lấy hầu hết các field mà muốn bỏ đi một số field.

```
>>> User.objects.defer("password")
```

Trên đây là một số cách cơ bản để có thể tăng performance khi query vào db. Hi vọng nó có ích với các bạn. Cảm ơn đã đọc bài viết của mình.

Tham khảo:
https://docs.djangoproject.com/en/2.0/ref/models/querysets/

https://micropyramid.com/blog/django-database-access-optimization/