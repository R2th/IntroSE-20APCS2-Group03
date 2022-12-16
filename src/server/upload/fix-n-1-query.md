## 1. Mở đầu
Như mình đã giới thiệu trong bài trước về N + 1 và làm sao để phát hiện N + 1 Query [Tại đây](https://viblo.asia/p/bullet-gem-check-n-1-query-L4x5xwbalBM). Thì hôm nay, mình sẽ giới thiệu về các phương pháp để `fix N + 1` 
## 2. Cách khác phục
### 2.1 Sử dụng `select in ()` (preload)
```
Library.preload(:books)
Library Load (0.2ms)  SELECT "libraries".* FROM "libraries"
Book Load (0.4ms)  SELECT "books".* FROM "books" WHERE "books"."library_id" IN (1, 2, 3)
```
Chúng ta cần 2 truy vấn:
* Truy vấn đầu tiên để load toàn bộ Library
* Truy vấn thứ 2 để load các Books tương ứng với những Libraries đó.

`Note:` 
* Khi dùng `SELECT IN()` các bạn nên cẩn thận với số lượng id trong `IN()` Vì trường hợp số lượng ids này quá lớn sẽ dẫn đến performance của bạn sẽ bị giảm. 
* Bạn nên sử dụng `SELECT IN()` trong trường hợp số lượng ids cố định và ko quá nhiều. Trường hợp nhiều thì bạn nên dùng cách tới đây, đó là sử dụng `JOIN` 

### 2.2  Sử dụng `Join` (eagerload)
```
Library.eager_load(:books)
SQL (0.7ms)  SELECT "libraries"."id" AS t0_r0, "libraries"."name" AS t0_r1, "libraries"."created_at" AS t0_r2, "libraries"."updated_at" AS t0_r3, "libraries"."book_id" AS t0_r4, "books"."id" AS t1_r0, "books"."title" AS t1_r1, "books"."created_at" AS t1_r2, "books"."updated_at" AS t1_r3, "books"."library_id" AS t1_r4 FROM "libraries" LEFT OUTER JOIN "books" ON "books"."library_id" = "libraries"."id"
```
### 2.2 Sử dụng `includes` 
* Đối với quan hệ `has_many` ta sử dụng includes class name dạng số nhiều
 ```
libraries = Library.where(size: 'large').includes(:books)
```
* Đối với quan hệ `belongs_to / has_one` ta sử dụng includes class name dạng số it
```
books = Book.all.includes(:author)
```
* Đối với trường hợp có nhiều quan hệ cùng một lúc ta dùng
```
libraries = Library.all.includes(:books, :magazines, :scrolls)
```
* Đối với trường hợp quan hệ lồng nhau 1 cấp ta sử dụng
```
libraries = Library.all.includes( books: :author )
```
* Đối với trường hợp quan hệ lồng nhau 2 cấp ta sử dụng

Cách 1:
```
libraries = Library.all.includes( books: [ author: :bio ] )
```
Cách 2:
```
libraries = Library.all.includes( :books => { :author => :bio } )
```
* Trường hợp có các quan hệ lồng nhau và các quan hệ thông thường
```
libraries = Library.all.includes( { :books => :author }, :scrolls, :magazines )
```
* Đặt `includes` ngay sau câu truy vấn và trước biểu thức tính toán và limit
```
libraries = Library.where(size: "large").includes(:books).limit(5)
authors = Author.where(genre: "Romantic").includes(:books).limit(5)
```
* Khi sử dụng full text search với gem Searchkick thì bản thân gem searchkich cũng đã hổ trọ eager loading với cấu trúc sau:
```
Book.search "Rowling", include: [:author, :publisher]
```

`Note:` 
* Mặc định của `includes` là dùng `select in` nhưng nếu cần thiết có thể chuyển sang `joins`
* SELECT IN
```
Library.includes(:books)
```
* JOIN
```
Library.includes(:books).references(:books)
```
 ## 3. Tài liệu tham khảo
 https://medium.com/@codenode/10-tips-for-eager-loading-to-avoid-n-1-queries-in-rails-2bad54456a3f

https://viblo.asia/p/select-in-va-joins-trong-framework-rails-oOVlY4YyZ8W