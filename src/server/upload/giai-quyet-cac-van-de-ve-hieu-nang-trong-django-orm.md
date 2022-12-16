Django là một công cụ tuyệt vời, giúp khi viết các ứng dụng web tăng năng suất đáng kể. Giống như với bất kỳ các framework nào khác, khi bạn bắt đầu khởi đầu làm quen với những mô hình dữ liệu đơn giản, mọi thứ phải thật sự nhanh chóng. Khi bạn bắt đầu thêm các ràng buộc trong real-world và mô hình dữ liệu phát triển phức tạp, có thể bạn sẽ thấy rằng các hướng giải quyết bạn đã sử dụng ngay từ đầu sẽ không hiệu quả. Giống như khi bạn tìm hiểu thêm về domain, bạn cần phải điều chỉnh code của mình cho phù hợp.
# 1. Bạn cần tìm gì
Với một ứng dụng web phức tạp, thật khó để biết bắt đầu từ đâu?
Một kỹ thuật bottom-up để làm việc với dữ liệu, bắt đầu từ việc dữ liệu sống đến cách dữ liệu được hiển thị, đưa ra một cách tiếp cận thực dụng để gỡ lỗi các vấn đề hiệu suất.
* Datastore - Kho dữ liệu (missing indexes / data-model)
* Interface to the datastore- Giao diện với kho dữ liệu (the ORM / inefficient queries)
* Displaying / using the data (Views / reports)
Phần lớn các vấn đề hiệu suất trong một ứng dụng web có liên quan đến việc truy cập cơ sở dữ liệu. Django có một bản tóm tắt chi tiết về cách tối ưu hóa làm việc với cơ sở dữ liệu. ORM rất lớn và cần có chiến lược để xây dựng mã hiệu quả ngay từ đầu. Khi tiếp cận tối ưu hóa, code thường có thể trở nên không rõ ràng. Nếu phải đối mặt với sự lựa chọn giữa một hiệu suất thấp hoặc code rõ ràng
# 2. Tool
Bước đầu tiên để khắc phục sự cố là có thể xác định được vấn đề. Khi làm việc với ORM, có một vài điều bạn có thể làm. Hiểu **django.db.connection**, ghi lại các truy vấn được thực hiện với [kết nối ](https://docs.djangoproject.com/en/1.10/faq/models/#faq-see-raw-sql-queries)hiện tại.
```
>>> from django.db import connection
>>> connection.queries
[]
>>> Author.objects.all()
<QuerySet [<Author: Author object>]>
>>> connection.queries
[{u'time': u'0.002', u'sql': u'SELECT "library_author"."id", "library_author"."name" FROM "library_author" LIMIT 21'}]
```
Điều này có thể rườm rà và khi bạn thực hiện nhiều truy vấn hơn, có thể khó tóm tắt thông tin.
Trong shell, sử dụng lệnh shell_plus của django-exension với flag --print-sql được bật.
```
>>> Author.objects.all()
SELECT "library_author"."id", "library_author"."name" FROM "library_author" LIMIT 21
Execution time: 0.001393s [Database: default]
<QuerySet [<Author: Author object>]>
```
Với máy chủ, phần mềm [trung gian](https://github.com/dobarkod/django-queryinspect) nên chạy trong nền của môi trường DEBUG của bạn và truy vấn log chỉ ra các bản sao. [Django-debug-toolbar](http://django-debug-toolbar.readthedocs.io/en/stable/) cung cấp thông tin này trong chính trang đó.
# 3. Example Schema
```
class Author(models.Model):
    name = models.TextField()

class Book(models.Model):
    title = models.TextField()
    author = models.ForeignKey(
        Author, on_delete=models.PROTECT, related_name='books', null=True
    )
   ```
   # 4. Size and Existence
Như đã biết khi sử dụng count và exits khá khó khăn. Django caches querysets,  vì khi bạn đang sử dụng dữ liệu của  queryset, hãy sử dụng các hoạt động python tích hợp sẵn. Khi không sử dụng dữ liệu, hãy sử dụng các phương thức queryset.
```
#  Don't waste a query if you are using the queryset
books = Book.objects.filter(..)
if books:
  do_stuff_with_books(books)

#  If you aren't using the queryset use exist
books = Book.objects.filter(..)
if books.exists():
  do_some_stuff()

#  But never
if Book.objects.filter(..):
  do_some_stuff()
  ```
  Điều này cũng đúng khi bạn cần size của queryset. Nếu bạn đang sử dụng queryset, hãy sử dụng len() hoặc count.
  ```
  books = Book.objects.filter(..)
if len(books) > 5:
  do_stuff_with_books(books)

#  If you aren't using the queryset use count
books = Book.objects.filter(..)
if books.count() > 5:
  do_some_stuff()

#  But never
if len(Book.objects.filter(..)) > 5:
  do_some_stuff()
  ```
  # 5. Getting only what you need
  Theo mặc định, tất cả  yêu cầu Django các cột được quản lý thành bảng và với một đối tượng Python. Khi bạn chỉ cần một tập hợp các cột từ bảng, thường sử dụng values hoặc values_list. Những phương thức này bỏ qua bước tạo một đối tượng python phức tạp và thay vào đó sử dụng các dicts, tuple hoặc thậm chí là các giá trị thuần túy. Nó thậm chí có thể xử lý các cột thông qua các mối quan hệ thẳng về phía trước.
  ```
  #  Retrieve values as a dictionary
>>> Book.objects.values('title', 'author__name')
<QuerySet [{'author__name': u'Nikolai Gogol', 'title': u'The Overcoat'}, {'author__name': u'Leo Tolstoy', 'title': u'War and Peace'}]>

#  Retrieve values as a tuple
>>> Book.objects.values_list('title', 'author__name')
<QuerySet [(u'The Overcoat', u'Nikolai Gogol'),
(u'War and Peace', u'Leo Tolstoy')]>
>>> Book.objects.values_list('title')
<QuerySet [(u'The Overcoat',), (u'War and Peace',)]>

#  With one value, it is easier to flatten the list
>>> Book.objects.values_list('title', flat=True)
<QuerySet [u'The Overcoat', u'War and Peace']>
```
# 6. Relationship Problems
ORM của Django cho phép bạn tương tác với một cơ sở dữ liệu quan hệ theo cách tự nhiên cho ngôn ngữ lập trình Python hướng đối tượng.
```
# Get the Author's name of a Book
book = Book.objects.first()
book.author.name
```
Django sử dụng lazy loading để chỉ tải tác giả nếu bạn cần nhưng nó sẽ query rất nhiều lần
```
>>> Author.objects.count()
20
>>> Book.objects.count()
100
#  This block is 101 queries.
#  1 for the books and 1 for each author that lazy-loaded 
books = Book.objects.all()
for book in books:
   do_stuff(book.title, book.author.name)

#  This block is 20 queries.
#  1 for the author and 1 for the books of each author
authors = Author.objects.prefetch_related('books').all()
for author in authors:
   do_stuff_with_books(author.name, author.books.all())
   ```
   Django nhận ra vấn đề và cung cấp [select_related](https://docs.djangoproject.com/en/1.10/topics/db/optimization/#retrieve-everything-at-once-if-you-know-you-will-need-it) và prefetch_related để giải quyết vấn đề đó
```
#  This block is 1 query
#  The authors of all the books are pre-fetched in one query
book = Book.objects.selected_related('author').all()
for book in books:
   do_stuff(book.title, book.author)

#  This block is 1 query
#  The books of all the authors are pre-fetched in one query
authors = Author.objects.prefetch_related('books').all()
for author in authors:
   do_stuff_with_books(author.name, author.books.all())
   ```
   # 7. Easier doesn’t always mean better
   Django làm cho việc theo dõi các mối quan hệ trở nên dễ dàng.Điều này dẫn đến các chức năng không thể quản lý các tác dụng phụ của chính chúng.Khi bạn truyền vào model instance cho một hàm và sử dụng một mối quan hệ, thực tế là không thể biết được mối quan hệ đã được tìm nạp hay chưa.
 ```
 def author_name_length(book):
    return len(book.author.name)

def process_author_books(author):
    for book in author.books.all():
        do_stuff(book)
   ```
   Liệu author_name_length hoặc process_author_books có tạo truy vấn không? Sử dụng các hàm này mà không có select_related hoặc prefetch_related trong vòng lặp có thể vô tình dẫn đến hàng trăm truy vấn. Django sẽ âm thầm thực hiện các truy vấn. Bạn có thể giám sát logs SQL của mình và gọi hàm để tìm hiểu xem nó có nên tìm nạp trước hay không.
   # 8. How do we fix it?
   Chúng ta có thể giải quyết vấn đề này, có thể mở rộng Django để được rõ ràng hơn về tiêu thụ tài nguyên? Nhiều cơ sở dữ liệu đã giải quyết vấn đề này theo nhiều cách khác nhau. Ví dụ elixir ecto cấu trúc Ecto.Association.NotLoaded thay vì ngầm làm cho truy vấn.
```
>>> book.author.name
Traceback (most recent call last):
File "<console>", line 1, in <module>
File "/Users/kyle/orm_test/library/models.py", line 18, in __get__
'Use `select_related` or `fetch_{rel}`'.format(rel=self.field.name)
RelationNotLoaded: Relation `author` not loaded. Use `select_related` or `fetch_author`

#  We explicitly fetch the resource
>>> book.fetch_author()
<Author: Author object>
>>> book.author.name
"Fyodor Dostoevsky"

#  Select related works just as well
>>> book = Book.objects.select_related('author').first()
>>> book.author.name
"Anton Chekhov"
```
# 9. Conclusion
* Tạo thói quen cấu trúc  code và ghi lại các truy vấn mà nó tạo ra
* Truy vấn không nên trong vòng lặp
* Hiểu cách ORM lưu trữ dữ liệu
* Biết khi Django sẽ thực hiện một truy vấn
* Không được tối ưu hóa quá mức 

nguồn: https://medium.com/@hansonkd/performance-problems-in-the-django-orm-1f62b3d04785