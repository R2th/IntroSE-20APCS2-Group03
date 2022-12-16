![image.png](https://images.viblo.asia/f8325d6e-8653-455a-9a5f-dcf2d8aed72c.png)

Hôm nay chúng ta cùng tìm hiểu WhereHas và With trong laravel nhé^^
Có thể bạn đã biết với [Eloquent relationships](https://laravel.com/docs/8.x/eloquent-relationships) mặc định thì access đến data trong Eloquent sẽ dùng"lazy loaded". Điều này có nghĩa là dữ liệu relationship không thực sự được tải cho đến khi bạn truy cập thuộc tính lần đầu tiên. Tuy nhiên, Eloquent có thể ["eager load"](https://laravel.com/docs/8.x/eloquent-relationships#eager-loading) các relationships tại thời điểm bạn truy vấn parent model. Eager loading làm giảm bớt vấn đề truy vấn "N + 1". Để minh họa vấn đề truy vấn *N + 1*, hãy xem xét model Book "belongs to" Author model dưới đây nhé
```
<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Book extends Model
{
 /**
 * Get the author that wrote the book.
 */
 public function author()
 {
 return $this->belongsTo(Author::class);
 }
}
```
Chúng ta có thể sử dụng eager loading để giảm hoạt động này xuống chỉ còn hai truy vấn. Khi xây dựng một truy vấn, chúng ta có thể chỉ định những relationships nào nên được tải bằng cách sử dụng phương thức with():
```
$books = Book::with('author')->get();
foreach ($books as $book) {
 echo $book->author->name;
}
```
Query Results:
```
select * from books
select * from authors where id in (1, 2, 3, 4, 5, …)
```
Khi truy xuất các model records, bạn có thể muốn giới hạn kết quả của mình dựa trên sự tồn tại của một relationship. Ví dụ: Hãy tưởng tượng bạn muốn truy xuất tất cả các tác giả có tên sách bắt đầu bằng PHP. Để làm như vậy, bạn có thể chuyển tên của relationship vào phương thức whereHas() và xác định các ràng buộc truy vấn bổ sung trên các truy vấn has của bạn:
```
$authors = Author::whereHas('books', function (Builder $query) {
 $query->where('title', 'like', 'PHP%');
})->get();
```
Query Results:
```
select * from authors WHERE EXISTS(SELECT * FROM authors WHERE authors.id = books.author_id and books.title like 'PHP%');
```
Khi truy vấn này được thực thi, bạn nhận được tất cả các tác giả có ít nhất một cuốn sách bắt đầu bằng PHP.
Bây giờ Nếu bạn lặp lại các tác giả và truy cập vào mối quan hệ sách như vậy,
```
foreach ($authors as $author) {
 echo $author->book->title;
}
```
Bạn sẽ kết thúc với N+1 và để giải quyết nó, chắc chắn bạn sẽ sử dụng phương thức with() để eager load books:
```
$authors = Author::with('books')
 ->whereHas('books', function (Builder $query) {
 $query->where('title', 'like', 'PHP%');
 })
 ->get();
```
Query Results:
```
select * from authors WHERE EXISTS(SELECT * FROM authors WHERE authors.id = books.author_id and books.title like 'PHP%');
select * from books where `books`.`author_id` in (1, 5, 11, 22, 46, 62, ….)
```
Thế là chúng ta đã giải quyết vấn đề N + 1, nhưng WAIT bạn có nhận thấy điều gì đó không? truy vấn thứ 2 chỉ nhận được tất cả sách từ các tác giả đã chọn từ truy vấn thứ nhất, phải không?
Truy vấn đầu tiên của chúng ta đã thực hiện công việc của nó và chỉ cho chúng ta các tác giả có sách bắt đầu bằng PHP, nhưng truy vấn thứ 2 (eager load) sẽ cho chúng ta tất cả sách cho từng tác giả, điều đó có nghĩa là nếu chúng ta lặp lại các tác giả và gọi relationship book, chúng ta sẽ xem thêm những cuốn sách khác không chỉ những cuốn sách bắt đầu với PHP.
```
[
 App\Author : {
 id: 1
 name: "author 1",
 …,
 books: [
 App\Books: {
 ….
 title: 'PHP'
 },
 App\Books: {
 ….
 title: 'Java'
 },
 App\Books: {
 ….
 title: 'How to use'
 },
 …
 ]
 }
 …
]
```
để nhận được kết quả tương tự như chúng ta muốn từ whereHas chúng ta cần sử dụng cùng một truy vấn điều kiện bên trong phương thức with().
```
$authors = Author::with(['books' => fn($query) => $query->where('title', 'like', 'PHP%')])
 ->whereHas('books', fn ($query) => 
 $query->where('title', 'like', 'PHP%')
 )
 ->get();
```
Query Results:
```
select * from authors WHERE EXISTS(SELECT * FROM authors WHERE authors.id = books.author_id and books.title like 'PHP%');
select * from books where `books`.`author_id` in (1, 5, 11, 22, 25, 27, 35, 39, 46, 62, ….) and books.title like 'PHP%');
```
Bạn đã nhận thấy truy vấn thứ 2 có cùng điều kiện với truy vấn thứ nhất?
Bây giờ, những kết quả mà chúng ta đang tìm kiếm trở thành:
```
[
 App\Author : {
 id: 1
 name: "author 1",
 …,
 books: [
 App\Books: {
 ….
 title: 'PHP'
 },
 …
 ]
 },
 App\Author : {
 id: 2
 name: "author 2",
 …,
 books: [
 App\Books: {
 ….
 title: 'PHP'
 },
 App\Books: {
 ….
 title: 'PHP Laravel'
 },
 …
 ]
 }
 …
]
```
Cuối cùng, việc thực hiện truy vấn này trên tất cả các nơi và lặp lại các điều kiện giống nhau, rất cồng kềnh, vì vậy chúng ta sẽ sử dụng local scope(phạm vi cục bộ) trong model Author.
```
public function scopeWithWhereHas($query, $relation, $constraint){
 return $query->whereHas($relation, $constraint)
 ->with([$relation => $constraint]);
}
```
Bây giờ, code của chúng ta đã gọn gàng hơn nhiều bằng cách gọi nó theo cách này:
```
Author::withWhereHas('books', fn($query) =>
 $query->where('title', 'like', 'PHP%')
)->get();
```
Query Results:
```
select * from authors WHERE EXISTS(SELECT * FROM authors WHERE authors.id = books.author_id and books.title like 'PHP%');
select * from books where `books`.`author_id` in (1, 5, 11, 22, 25, 27, 35, 39, 46, 62, ….) and books.title like 'PHP%');
```
Cảm ơn bạn đã đọc hết nha:blush:

Link bài viết gốc: https://dev.to/psylogico/laravel-wherehas-and-with-550o