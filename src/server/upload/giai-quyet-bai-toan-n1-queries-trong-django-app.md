Django framework cho phép bạn xây dựng ứng dụng web cực kỳ nhanh. Một trong những tính năng tốt nhất của nó là Object-relational mapper (ORM) - Trình ánh xạ quan hệ đối tượng, cho phép tạo ra các truy vấn đến DB mà không cần viết bất kỳ câu lênh SQL thuần nào. Django cho phép viết các truy vấn bằng python, sau đó sẽ cố gắng chuyển các câu lệnh đó thành SQL hiệu quả, nhưng đôi khi kết quả lại "kém lý tưởng".

Một trong những vấn đề phổ biến của DB là ORM có thể gây ra N+1 truy vấn - một vấn đề không còn xa lạ, nó ảnh hưởng đến hiệu suất khi làm việc với DB, bao gồm 1 truy vấn ban đầu và mỗi một dòng trong kết quả đó lại sinh ra một truy vấn khác (N). Nó thường xảy ra khi trong DB chứa các bảng có quan hệ cha-con (Select tất cả các đối tượng cha/con mong muốn, và sau đó lại lặp qua mỗi bản ghi và select đối tượng con/cha). Ứng dụng web có thể hoạt động tốt với lượng dữ liệu nhỏ, nhưng khi dữ liệu tăng lên thì lượng truy vấn cũng sẽ tăng lên và ảnh hưởng đến hiệu năng của hệ thống.

Mỗi framework sẽ có nhiều cách để hỗ trợ giải quyết bài toán này và Django cũng không ngoại lệ. Cùng đi vào chi tiết để hiểu rõ hơn.

> Cài đặt [Django debug Toolbar](https://django-debug-toolbar.readthedocs.io/) để xem truy vấn sql khi thao tác với dữ liệu bằng shell

**Ví dụ:**
Có 2 bảng với các trường cơ bản, trong đó author và book có quan hệ 1 - n:
- authors (id: int, first_name: varchar(50), last_name: varchar(50), date_of_birth: date)
- books (id: int, title: varchar(255), description: text, author: int)

Thiết kế model trong Django:
```python
# /app_name/models.py
from django.db import models

class Author:
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.id}: {self.name}"

class Book:
    title = models.CharField(max_length=255)
    description = models.TextField()
    author = models.ForeignKey("Author", on_delete=models.SET_NULL, null=True) # khóa ngoại đến bảng `authors`
    
    def __str__(self):
        return f"{self.id}: {self.title}"
```


### **(N+1) truy vấn**

**Bài toán 1**: In ra tên tác giả của các cuốn sách có tiêu đề bắt đầu với từ "Book", thực hiện xử lý như sau:
```python
# Lấy danh sách books mà tiêu đề bắt đầu chuỗi "Book"
books = Book.objects.filter(title__startswith="Book")

# In tên tác giả tương ứng cho mỗi sách
for book in books:
    print(f"Book ID: {book.id} - Author name: {book.author.first_name}, {book.author.last_name}")
```

Quan sát câu truy vấn sql:
![image.png](https://images.viblo.asia/8c05bda3-5ac7-409b-8cb2-08e2458077fc.png)

Có thể thấy 4 câu truy vấn: 1 câu truy vấn lấy từ bảng books theo điều kiện và 3 câu truy vấn lấy từ bảng authors với điều kiện `authors.id = books.author_id` tương ứng.

**Bài toán 2**: In ra tiêu đề sách của các tác giả có tên "Author"
```python
authors = Author.objects.filter(first_name="Author")

# 
for author in authors:
    books = author.book_set.all()
    for book in books:
        print(book.title)
```
Quan sát có 4 câu truy vấn: 1 câu truy vấn lấy từ bảng authors theo điều kiện và 3 câu truy vấn lấy từ bảng books với điều kiện `books.author_id = authors.id` tương ứng

Quan sát kết quả:
![image.png](https://images.viblo.asia/1681232d-e2b1-4ba1-94f9-02f304d8a71d.png)

### Giải quyết bài toán
Django cung cấp 2 phương thức của `Queryset`: [select_related()](https://docs.djangoproject.com/en/3.2/ref/models/querysets/#select-related) và [prefetch_related()](https://docs.djangoproject.com/en/3.2/ref/models/querysets/#prefetch-related) để giải quyết bài toán (N+1) truy vấn. 2 phương thức này hoạt động tương tự, đều fetch model quan hệ cùng với truy vấn ban đầu.


|| select_related() | prefetch_related() |
| --------| -------- | -------- |
| Trả về     | QuerySet     | QuerySet     |
| Quan hệ     |one-to-one (1-1), one-to-many (1-n)   | one-to-one (1-1), one-to-many (1-n), many-to-many (n-n),  many-to-one (n-1)  |
| Truy vấn     | 1 truy vấn: tạo ra câu SQL join và bao gồm các fields của đối tượng liên quan trong câu SELECT     | 2 truy vấn riêng biệt cho từng đối lượng     |

==> Cụ thể với từng bài toán đã nêu ở trên, chúng giải quyết như sau:

**Bài toán 1**: sử dụng được cả 2 phương thức vì fetch author - 1 từ book - n

- Phương thức **select_related()**
```python
books = Book.objects.filter(title__startswith="Book").select_related("author")
for book in books:
    print(f"Book ID: {book.id} - Author name: {book.author.first_name}, {book.author.last_name}")
```
Truy vấn: CHỈ sử dụng 1 câu truy vấn duy nhất với kỹ thuật `LEFT OUTER JOIN`
![image.png](https://images.viblo.asia/ad8cfd04-2532-4197-897c-dc1e714e45c2.png)

- Phương thức prefetch_related()
```python
books = Book.objects.filter(title__startswith="Book").prefetch_related("author")
for book in books:
    print(f"Book ID: {book.id} - Author name: {book.author.first_name}, {book.author.last_name}")
```
Truy vấn: sử dụng 2 câu truy vấn, 1 câu truy vấn tìm books, 1 câu truy vấn trong bảng authors dùng kỹ thuật `WHERE ... IN ()`
![image.png](https://images.viblo.asia/ecc3febe-6a4e-48e3-a44a-b8dff4c3d32b.png)

**Bài toán 2**: Chỉ sử dụng được phương thức prefetch_related() vì fetch book - n từ author - 1
- Phương thức prefetch_related()
```python
authors = Author.objects.filter(first_name="Author").prefetch_related("book_set")
for author in authors:
    books = author.book_set.all()
    for book in books:
        print(book.title)
```
Truy vấn:
![image.png](https://images.viblo.asia/9aef5cde-9773-4742-b4c0-12d56cfb4b3e.png)

Vậy tùy từng bài toán cụ thể mà lựa chọn dùng 2 phương thức trên, hoặc kết hợp cả 2 cho phù hợp :grinning:

Tham khảo: https://docs.djangoproject.com/en/3.2/ref/models/querysets/#select-related