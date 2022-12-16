* Đối với những bạn đã và đang sử dụng Django. Thì Queryset là công cụ tuyệt vời hỗ trợ ta trong việc truy vấn cơ sở dữ liệu.
* Chỉ cần thêm relationship, ta có thể dễ dàng truy vấn từ bảng này sang bảng khác 1 cách dễ dàng. Tuy nhiên, đôi khi việc quá lạm dụng truy vấn với relationship có thể ảnh hưởng không nhỏ tới tốc độ và hiệu năng ứng dụng của bạn.
* Ở bài viết hôm nay, mình sẽ giới thiệu tới các bạn 1 cách để tối ưu hóa truy vấn CSDL trong Django Framework đó là sử dụng `select_related và fetch_related`
# Chuẩn bị
* Đầu tiên các bạn cần 1 project Django. Sau đó tạo 1 app tên `books` với các models như sau:
```
from django.db import models


class Book(models.Model):
    name = models.CharField(max_length=200)
    public_at = models.DateField()
    author = models.ForeignKey('Author', on_delete=models.CASCADE)
    categories = models.ManyToManyField('Category', related_name='books')

    def __str__(self):
        return self.name


class Author(models.Model):
    full_name = models.CharField(max_length=200)
    dob = models.DateField()

    def __str__(self):
        return self.full_name


class Category(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name

```
* Ở đây mình tạo ra 3 models. Author và Book là quan hệ 1-n. Book và Category là quan hệ n-n
* Tiếp theo thêm 1 hàm decorator để đo thời gian thực hiện hàm và số lượng query để ta có thể so sánh hiệu quả giữa trước và sau khi tối ưu
```
from django.db import connection, reset_queries
import time
import functools


def query_debugger(func):
    @functools.wraps(func)
    def inner_func(*args, **kwargs):
        reset_queries()

        start_queries = len(connection.queries)

        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()

        end_queries = len(connection.queries)

        print("Function : " + func.__name__)
        print("Number of Queries : {}".format(end_queries - start_queries))
        print("Finished in : {}".format(end - start))

        return result

    return inner_func
```
# Select_related
## Đặt vấn đề
* Bây giờ, mình có 1 hàm lấy ra tên tất cả sách trong DB và tên tác giả của từng sách. Thông thường ta thường làm như sau:
```
@query_debugger
def book_list():
    queryset = Book.objects.all()

    books = []
    for book in queryset:
        books.append({'name': book.name, 'author': book.author.full_name})

    return books
```

* Mình chạy thử hàm này và cho ra kết quả như sau:
```
Function : book_list
Number of Queries : 6
Finished in : 0.01809368800604716
[{'name': 'Thiên long truyện', 'author': 'Trần Quang Hiệp'}, {'name': 'Linh vũ thiên hạ', 'author': 'Nguyễn Văn Diện'}, {'name': 'Vũ luyện điên phong', 'author': 'Nguyễn Quang Diệu'}, {'name': 'Lên bờ xuống ruộng', 'author': 'Nguyễn Văn Diện'}, {'name': 'Độc tôn', 'author': 'Lê Huỳnh Đức'}]
```
* Bây giờ thử phân tích nhé:
    * Đầu tiên hệ thống sẽ truy vấn CSDL và lấy ra thông tin của tất cả các quyển sách.  Ở đây là 1 query.
    * Tiếp theo lặp tất cả các sách vừa lấy được. thêm thông tin vào biến books. đồng thời truy vấn để lấy ra tên tác giả. Mỗi vòng lặp là 1 query. Như trong ví dụ trên, CSDL của mình có 5 quyển sách, vậy thì vòng lặp sẽ thực hiện 5 query.
    * Tổng cả function sẽ là 1 + 5 = 6 query như kết quả ở trên.
* Vậy function trên có vấn đề ở chỗ nào? Giả sử bây giờ CSDL của bạn có 100 quyển sách, vậy theo cách làm trên, hệ thống sẽ phải thực hiện 101 câu query. Và thử tưởng tượng nếu bạn có hàng ngàn quyền sách thì sẽ thế nào? Rõ ràng là sẽ ảnh hưởng rõ rệt tới hiệu năng của hệ thống phải không nào.
## Giải pháp
* Để khắc phục vấn đề trên, Django cung cấp cho chúng ta hàm `select_related`. Hàm này sinh ra nhằm ngăn chặn việc lạm dụng truy vấn qua relationship tạo ra quá nhiều query tới CSDL.
* Hàm `select_related` hoạt động bằng cách JOIN các trường của các bảng liên quan. Vì thế, `select_related` lấy các đối tượng liên quan trong cùng 1 truy vấn CSDL.
* `select_related` chỉ sử dụng cho quan hệ `one-to-one` hoặc quan hệ `one-to-many` mà chứa `foreign-key`
* Viết lại hàm trên với `select_related`:
```
@query_debugger
def book_list():
    queryset = Book.objects.select_related('author')

    books = []

    for book in queryset:
        books.append({'name': book.name, 'author': book.author.full_name})

    return books
```
* Kết quả :
```
Function : book_list
Number of Queries : 1
Finished in : 0.004872963996604085
[{'name': 'Thiên long truyện', 'author': 'Trần Quang Hiệp'}, {'name': 'Linh vũ thiên hạ', 'author': 'Nguyễn Văn Diện'}, {'name': 'Vũ luyện điên phong', 'author': 'Nguyễn Quang Diệu'}, {'name': 'Lên bờ xuống ruộng', 'author': 'Nguyễn Văn Diện'}, {'name': 'Độc tôn', 'author': 'Lê Huỳnh Đức'}]
```
* Có thể thấy sự khác biệt rõ rệt. Số câu truy vấn giảm từ 6 còn 1. Bởi vì `select_related` chỉ query 1 lần duy nhất. Lấy tất cả thông tin sách đồng thời join các bảng liên quan  vào Queryset. Nên sau đó nếu dùng relation với queryset sẽ tự động lấy các dữ liệu trong Queryset mà không cần query lại DB.
# Prefetch_related
* Nếu như `select_related` sử dụng cho quan hệ `one-to-one` hoặc quan hệ `one-to-many` mà chứa `foreign-key` thì `prefetch_related` sử dụng cho quan hệ `many-to-many` và quan hệ `one-to-many` ngược.
* `prefetch_related` thực hiện tra cứu riêng cho từng mối quan hệ.
* Ví dụ: Mình muốn lấy ra tất cả các Category. Mỗi category sẽ chứa đủ tên các quyển sách của category đó. Thông thường ta hay làm như sau:
```
@query_debugger
def category_with_book_list():

    queryset = Category.objects.all()

    categories = []

    for category in queryset:
        books = [book.name for book in category.books.all()]
        categories.append({'name': category.name, 'books': books})

    return categories
```
* Kết quả
```
Function : category_with_book_list
Number of Queries : 6
Finished in : 0.009519919003651012
```
```
[
    {'books': ['Vũ luyện điên phong', 'Độc tôn'], 'name': 'Viễn tưởng'},
    {'books': ['Thiên long truyện', 'Vũ luyện điên phong'], 'name': 'Ngôn tình'}, 
    {'books': ['Linh vũ thiên hạ', 'Lên bờ xuống ruộng'], 'name': 'Trinh thám'}, 
    {'books': ['Thiên long truyện', 'Linh vũ thiên hạ', 'Lên bờ xuống ruộng'], 'name': 'Tâm lý'}, 
    {'books': ['Độc tôn'], 'name': 'Kinh dị'}
]
```
* Vấn đề ở hàm này cũng tương tự như ví dụ ở phần `select_related`, mỗi lần câu lệnh `category.books.all()` chạy sẽ sinh ra 1 query tới DB. 
* Hãy thử thay `prefetch_related` để xem sự khác biệt nhé.
```
@query_debugger
def category_with_book_list():

    queryset = Category.objects.prefetch_related('books')

    categories = []

    for category in queryset:
        books = [book.name for book in category.books.all()]
        categories.append({'name': category.name, 'books': books})

    return categories
```
* Kết quả
```
Function : category_with_book_list
Number of Queries : 2
Finished in : 0.013129211998602841
[
    {'books': ['Vũ luyện điên phong', 'Độc tôn'], 'name': 'Viễn tưởng'}, 
    {'books': ['Thiên long truyện', 'Vũ luyện điên phong'], 'name': 'Ngôn tình'}, 
    {'books': ['Linh vũ thiên hạ', 'Lên bờ xuống ruộng'], 'name': 'Trinh thám'},
    {'books': ['Thiên long truyện', 'Linh vũ thiên hạ', 'Lên bờ xuống ruộng'], 
    'name': 'Tâm lý'}, {'books': ['Độc tôn'], 'name': 'Kinh dị'}
]
```
* Với `prefetch_related`, bạn sẽ chỉ cần 2 query để lấy tất cả thông tin trên.
* Hàm `Category.objects.prefetch_related('books')` thực hiện lấy thông tin tất cả các category và tìm nạp trước thông tin các books liên quan vào Queryset Cache. Mỗi khi hàm `category.books.all()` được gọi, thay vì query DB để lấy thông tin, nó sẽ tìm trong Queryset cache 
# Kết luận
* Những vấn đề tưởng chừng như đơn giản, nhưng lắm lúc nó lại không đơn giản chút nào phải không ?
* Mong là qua bài viết này, mọi người có thể có cái nhìn sâu hơn khi code. Tối ưu code là điều cần thiết đối với mỗi developer. 
# Tài liệu tham khảo
* https://www.kite.com/python/docs/django.db.models.QuerySet.prefetch_related
* https://medium.com/better-programming/django-select-related-and-prefetch-related-f23043fd635d
* https://docs.djangoproject.com/en/3.0/ref/models/querysets/#prefetch-objects