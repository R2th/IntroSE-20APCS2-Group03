Hôm nay mình sẽ giới thiệu với mọi người về Eager Loading trong laravel. Nếu các bạn đã làm việc với Laravel thì cũng đã sử dụng eloquent relationships để thao tác với dữ liệu và sẽ có trường hợp bạn gặp phải vấn đề N+1 câu truy vấn.
N+1 câu truy vấn là gì? giải quyết nó như thế nào? Eager Loading là gì? chúng ta cùng tìm hiểu nhé.
## N+1 câu truy vấn là gì?
Khi chúng ta sử dụng eloquent relationships trong laravel, mặc định eloquent relationships sẽ ở chế độ "lazy" khi load lên tất cả các model quan hệ (relation). Để minh họa vấn đề truy vấn N + 1, hãy xem xét một model Book có quan hệ với Author:
```php
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
        return $this->belongsTo('App\Author');
    }
}
```
Bây giờ, hãy lấy tất cả các cuốn sách và tác giả của chúng:
```php
$books = App\Book::all();

foreach ($books as $book) {
    echo $book->author->name;
}
```
* Vòng lặp này sẽ thực hiện 1 truy vấn để truy xuất tất cả các sách trên bảng, sau đó một truy vấn khác cho mỗi cuốn sách để truy xuất tác giả. Vì vậy, nếu chúng ta có 25 cuốn sách, vòng lặp này sẽ chạy 26 truy vấn: 1 cho cuốn sách gốc và 25 truy vấn bổ sung để truy xuất tác giả của mỗi cuốn sách. 
##### Thật là kinh khủng nếu dữ liệu của chúng ta có hàng triệu cuốn sách. Tốc độ truy vấn sẽ rất lâu và khiến cho người dùng khó chịu khi phải chờ đợi, nhưng thật may khi ta có  Eager Loading để giải quyết vấn đề này.
## Sử dụng  Eager Loading để giải quyết vấn đề N+1 truy vấn
Chúng ta có thể sử dụng Eager Loading để số lượng xuống chỉ còn 2 truy vấn. Khi truy vấn, bạn có thể chỉ định những mối quan hệ nào sẽ được eager loaded  bằng phương thức with(): 
```php
$books = App\Book::with('author')->get();

foreach ($books as $book) {
    echo $book->author->name;
}
```
Đối với thao tác này, chỉ có hai truy vấn sẽ được thực hiện:
```sql
select * from books

select * from authors where id in (1, 2, 3, 4, 5, ...)
```
### Eager Loading truy vấn nhiều quan hệ
Đôi khi bạn có thể cần lấy một số mối quan hệ khác nhau trong một truy vấn. Để làm như vậy, chỉ cần truyền các đối số bổ sung cho phương thức with:<br>

```php
$books = App\Book::with('author', 'publisher')->get();
```
### Constraining Eager Loads
Đôi khi bạn có thể muốn Eager Loading một quan hệ, nhưng cũng chỉ định các ràng buộc truy vấn bổ sung cho truy vấn Eager Loading. Đây là một ví dụ:

```php
$users = App\User::with(['posts' => function ($query) {
    $query->where('title', 'like', '%first%');

}])->get();
```
Trong ví dụ này, Eloquent sẽ chỉ Eager Loading các bài đăng trong đó cột title của bài đăng có chứa từ đó first. Tất nhiên, bạn có thể gọi các phương thức xây dựng truy vấn khác để tùy chỉnh thêm hoạt động Eager Loading:

### Lazy Eager Loading
Đôi khi bạn có thể cần  Eager Loading một mối quan hệ sau khi đối tượng cha đã được lấy. Điều này giúp chúng ta có quyền quyết định có chạy câu query thứ 2 để load các mối quan hệ hay không với các điều kiện mở rộng.

```php
$books = App\Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```
## Kết bài
Tài liệu tham khảo : https://laravel.com/docs/5.2/eloquent-relationships#lazy-eager-loading <br>
Cảm ơn mọi người đã quan tâm.