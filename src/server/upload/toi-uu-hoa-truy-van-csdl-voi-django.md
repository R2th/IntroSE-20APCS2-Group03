- Tốc độ (performance) của 1 trang web luôn là vấn đề đươc quan tâm hàng đầu của các đội ngũ phát triển cũng như các khách hàng, bởi vì nó ảnh hưởng trực tiếp đến trải nghiệm người dùng. Ngoài ra 1 trang web tối ưu tốt sẽ giảm thời gian cho mỗi request, từ đó server có thể đáp ứng được nhiều request hơn, giảm được nhiều yêu cầu về phần cứng.
- Khi nhắc đến  làm thế nào để tăng tốc độ trang web, thì việc tối ưu hóa truy vấn CSDL luôn là 1 trong những phương pháp được nghĩ đến đầu tiên. 
- Nói 1 cách nôm na như hiểu biết của mình thì tối ưu hóa truy vấn CSDL là việc giảm thiểu tối đa số query vào CSDL cho một request.
- Việc viết mã nguồn có tối ưu hóa truy vấn hay không cũng là 1 trong những yếu tố giúp xác định trình độ của 1 lập trình viên. 
- Vậy làm thế nào để tối ưu truy vấn? Trong bài viết lần này, mình sẽ giới thiệu tới các bạn 1 số cách thường dùng áp dụng với Framework Django.
# Đánh indexes
- Đánh indexes cho CSDL là cách ưu tiên số 1 để cải thiện hiệu năng truy vấn CSDL. 
- Đánh index cho các field sẽ giúp CSDL tìm kiếm dễ dàng hơn mà không cần phải quét toàn bộ bản ghi trong bảng từ đó đạt hiệu suất tìm kiếm cao hơn. 
- Tuy nhiên không phải vì thế mà bạn đánh index cho tất cả các trường trong bảng vì như thế sẽ khiến CSDL phải xử lý quá nhiều các index khi chạy query từ đó khiến việc đánh index trở nên phản tác dụng. Vì vậy việc đánh index sao cho hợp lý cũng rất quan trọng.
- Đối với mình thì thường mình sẽ lựa chọn các bảng có số lượng lớn bản ghi và đánh index cho các trường thường xuyên phải tìm kiếm của bảng này ví dụ như khóa chính (Hiện tại thì MySQL đã auto đánh index cho các trường khoa chính).
 # QuerySet
- Các Framework ngày này hầu hết đều có các công cụ giúp thao tác DB thuận tiện, dễ dàng hơn thay vì việc phải viết các SQL query thuần. Đối với Django thì công cụ này chính là QuerySet. 
- Với các đặc tính vốn có của mình cùng nhiều hàm hỗ trợ đắc lực,  QuerySet hoàn toàn là công cụ có thể giúp bạn tối ưu các truy vấn CSDL.
## Đặc tính của QuerySet
### QuerySet rất "lazy"
- Tạo 1 QuerySet không đồng nghĩa với việc truy vấn CSDL. Bạn có thể xếp chồng các bộ Filter cho QuerySet cả ngày mà nó vẫn sẽ không thực hiện 1 hành động truy vấn nào tới CSDL.
- Ví dụ:
```
>>> q = Entry.objects.filter(headline__startswith="What")
>>> q = q.filter(pub_date__lte=datetime.date.today())
>>> q = q.exclude(body_text__icontains="food")
>>> print(q)
```
- Thoạt nhìn thì sẽ nghĩ ở đây sẽ phải query 3 lần. Thực tế thì django sẽ chỉ truy vấn 1 lần ở dòng cuối cùng `print(q)`. 
- Khi gọi đến hàm `print(q)`, QuerySet sẽ được thực thi (evaluated), tạo 1 truy vấn tới CSDL.
- Vậy khi nào thì 1 QuerySet được thực thi?
### When QuerySets are evaluated?
- QuerySet sẽ được thực thi khi bạn có 1 tác vụ khiến nó evaluated.
- Các tác vụ làm QuerySet được thực thi:
    - Vòng lặp : QuerySet sẽ thục thi truy vấn trong lần lặp đầu tiên nếu bạn lặp nó
    ```
    for e in Entry.objects.all():
        print(e.headline)
    ```
    - Slicing: Một QuerySet có thể được cắt sử dụng cú pháp cắt list của python. Cắt 1 QuerySet chưa được thực thi sẽ trả về 1 QuerySet cũng chưa thực thi, nhưng Django sẽ thực thi truy vấn nếu bạn dùng tham số "step" trong cú pháp cắt
    ```
    entries = Entry.objects.all() 
    a = entries[2:4]                #This line will not excute query
    print(a[0])                     #This line will excute query
    ```
    
    - `repr()` QuerySet sẽ được thực thi khi bạn gọi nó với hàm `repr()`
    -  `len()`: QuerySet sẽ thực thi truy vấn khi bạn gọi đến hàm `len()` cho nó để kiểm tra số phần tử. Chú ý rằng, nếu bạn chỉ cần lấy ra số lượng kết quả của truy vấn, bạn nên sử dụng hàm `count()` thay vì dùng `len()` sẽ cho tốc độ tốt hơn.
    -  `list()`: Việc sử dụng hàm `list()` với QuerySet sẽ buộc nó thực thi
    ```
    entríes = list(Entry.objects.all())
    ```
    - `bool()`: Kiểm tra boolean của 1 QuerySet bằng cách sử dụng các hàm như `bool()`, `if`, `or`, `and`,.. cũng sẽ buộc QuerySet thực thi truy vấn.
    ```
     entríes = Entry.objects.all()
     if entries:                      #This will make QuerySet evaluated
         ........
    ```
   - Nếu bạn chỉ muốn check 1 QuerySet có tồn tại hay không, sẽ cho tốc độ truy vấn nhanh và hiệu quả hơn nếu bạn dùng `exists()`
   ### Dữ liệu QuerySet được lưu trong bộ nhớ như thế nào ?
- Data mỗi QuerySet lấy được sau khi thực thi đều được chứa trong 1 bộ nhớ đệm và sẽ được lấy ra khi gọi lại mà không cần truy vấn lại DB thêm lần nữa. Hiểu được cách nó hoạt động sẽ giúp bạn dễ dàng tối ưu truy vấn hơn
- Tuy nhiên nếu bạn không sử dụng QuerySet đúng nhiều khi sẽ phản tác dụng. Ví dụ:
```
>>> print([e.headline for e in Entry.objects.all()])
>>> print([e.pub_date for e in Entry.objects.all()])
```
- Đoạn mã trên sẽ thực hiện 2 truy vấn y hệt vào database để lấy ra tất cả các Entry. Để tránh điều này, hãy tận dụng khả năng lưu cache của QuerySet và sử dụng lại
```
>>> queryset = Entry.objects.all()
>>> print([p.headline for p in queryset]) # Evaluate the query set.
>>> print([p.pub_date for p in queryset]) # Re-use the cache from the evaluation.
```
## Prefetch_related và Select_related
- Quan điểm của mình khi tối ưu truy vấn, đó là "Hãy lấy ra tất cả những gì bạn biết là bạn sẽ cần trong 1 lần truy vấn". Tại sao ta phải chạy đi chạy lại nhiều lần để lấy từng thứ khác nhau trong khi ngay từ đầu ta đã biết ta sẽ phải cần đến chúng.
- `prefetch_related` và `select_related` là 2 công cụ đắc lực của Django giúp bạn làm điều này. Mình đã có 1 bài nói chi tiết về cơ chế và cách dùng của 2 thằng này, các bạn có thể xem[ tại đây](https://viblo.asia/p/toi-uu-truy-van-csdl-trong-django-voi-select-related-va-prefetch-related-L4x5xLdq5BM)
- Về cơ bản, `prefetch_related` và `select_related` sẽ hỗ trợ nạp trước các relationship cho 1 QuerySet vào cache và khi được gọi đến sẽ lấy data đã nạp trước để trả về thay vì tạo 1 truy vấn vào Database. 
- Ví dụ:
```
students = Student.objects.all()
for student in students:
    print(student.class.class_name)
```
- Đoạn code trên sẽ mất 1 query DB để lấy ra tất cả students và N query tương ứng với N students lấy được để lấy ra class_name của mỗi students.
- Nếu sử dụng select_related, ta sẽ chỉ mất 1 query duy nhất với mọi N:
```
students = Student.objects.all().select_related
for student in students:
    print(student.class.class_name)
```
- Thử tưởng tượng số students lên tới con số hàng ngàn, hàng triệu bản ghi thì nếu dùng cách 1 chắc chắn sẽ giết chết hệ thống của bạn đó.
-  Một số lưu ý khi sử dụng  `prefetch_related` và `select_related`:

**1. Không sử dụng `filter` khi QuerySet đã thực thi:**
- Khi 1 QuerySet chưa được thực thi, bạn có thể thoải mái thêm các `filter` mà sẽ không bị tạo truy vấn DB, ngược lại nếu đã thực thi, khi add thêm `filter` sẽ tạo lại 1 truy vấn CSDL
```
books = Book.objects.all().select_related('type')

# Print name of all book has type Math
math_books = books.filter(type__name='math') 
for item in math_books:
    print(item.name)
    
# Print name of all book has type Biology    
biology_boos = books.filter(type__name='biology') 
for item in biology_books:
    print(item.name)
```
- Trong trường hợp này, hãy đưa QuerySet về list sau đó thực hiện tìm kiếm trong list này.
```
books = Book.objects.all().select_related('type')
books = list(books)
# Print name of all book has type Math
math_books = [item for item in books if item.type.name == 'math']
for item in math_books:
    print(item.name)
    
# Print name of all book has type Biology    
biology_boos = [item for item in books if item.type.name == 'biology']
for item in biology_books:
    print(item.name)
```

**2. Đừng dùng `first()` hoặc `index`**
- Dùng `first()` hoặc index để lấy 1 giá trị trong QuerySet sẽ thực thi 1 truy vấn tới CSDL
```
books = Book.objects.all().select_related('type')
print(books.first().type.name)       #Excute query to DB
print(books[2].type.name)            #Excute query to DB
```
- Hãy chuyển về list và bạn có thể dùng index để lấy các giá trị mà không lo bị truy vấn lại DB
```
books = list(Book.objects.all().select_related('type'))   # Excute query to DB
print(books[0].type.name)                                 # Not excute query to DB
print(books[2].type.name)                                 # Not excute query to DB
```
## update() và delete()
- Thay vì chạy vòng lặp 1 QuerySet, set cho từng object các thuộc tính chung 1 giá trị và `save` đơn lẻ, hãy dùng `update()` để có thể update tất cả trong 1 câu query, vừa ngắn gọn code, vừa đảm bảo performance.
```
Entry.objects.filter(pub_date__year=2010).update(comments_on=False)
```
- Tương tự, hãy xóa nhiều object cùng lúc thay vì xóa riêng lẻ.
```
Entry.objects.filter(blog=b).delete()
```
## Bulk methods
- Sử dụng các bulk methods nếu có thể sẽ giúp giảm thiếu rất nhiều truy vấn DB
### bulk_create()
- Insert 1 lúc nhiều object trong 1 query 
```
Entry.objects.bulk_create([
    Entry(headline='This is a test'),
    Entry(headline='This is only a test'),
])
```
sẽ hiệu quả hơn là insert từng bản ghi riêng lẻ
```
Entry.objects.create(headline='This is a test')
Entry.objects.create(headline='This is only a test')
```
### bulk_update()
- Tương tự nếu update 1 lúc nhiều object trong 1 query 
```
entries = list(Entry.objects.filter(pub_date__year=2010))
entries[0].headline = 'This is not a test'
entries[1].headline = 'This is no longer a test'
Entry.objects.bulk_update(entries, ['headline'])
```
sẽ hiệu quả hơn update riêng lẻ từng object
```
entries = list(Entry.objects.filter(pub_date__year=2010))
entries[0].headline = 'This is not a test'
entries[0].save()
entries[1].headline = 'This is no longer a test'
entries[1].save()
```
## Sử dụng giá trị foreign key thay vì relationship
- Nếu bạn chỉ muốn lấy giá trị của foreign key, hãy sử dụng foreign key trên object bạn đã lấy thay vì gọi relationship để lấy giá trị foreign key
```
entry.blog_id
```
thay vì:
```
entry.blog.id
```
## Đừng dùng order_by() nếu không cần 
- Việc dùng order_by() sẽ làm tăng thời gian thực thi của QuerySet vì thế hãy bỏ order_by() nếu bạn không thật sự cần nó. 
- Nếu trong class Model bạn có định nghĩa `ordering` mặc định trong class Meta thì bạn có thể loại bỏ nó bằng cách gọi order_by() trong QuerySet mà không truyền vào tham số gì
```
Entry.objects.filter(pub_date__year=2010).order_by()
```
# Kết luận
- Trên đây là 1 vài cách mà mình biết mong là có thể giúp các bạn cải thiện các ứng dụng của bản thân cho tốc độ và trải nghiệm tốt hơn.
- Nếu có gì còn sai hay thiếu xót rất mong được sự góp ý từ các bạn.
- Thank for reading..
# Tài liệu tham khảo
- https://docs.djangoproject.com/en/3.0/topics/db/optimization/