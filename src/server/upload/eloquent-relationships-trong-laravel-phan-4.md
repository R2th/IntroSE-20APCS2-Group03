Vậy là qua 3 phần viết về Relationships trong Laravel, khá dài rồi nhỉ. Phần này sẽ là phần cuối cùng về chủ để này, mình chia sẻ về Eager Loading và cách insert, update các quan hệ nhé.
Phần 3 các bạn xem [ở đây](https://viblo.asia/p/eloquent-relationships-trong-laravel-phan-3-6J3ZgxQqlmB) nhé.
## 4. Eager Loading
Nhắc đến Eager Loading các bạn phải nhớ ngay đến `vấn đề N + 1 query` nhé. Vấn đề này xảy ra khi bạn gọi relationship của model như 1 thuộc tính, khi đó dữ liệu quan hệ là "lazy loaded". Nói dễ hiểu hơn là các relationship không thực sự load ra trước khi bạn gọi đến nó. Khi gọi relationship sẽ gặp thực hiện N + 1 câu truy vấn. Nếu dùng **eager loading**, vấn đề này sẽ được giảm bớt. 

Ví dụ: Model `Book` có quan hệ với `Author`
```
class Book extends Model
{
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
```
Sau đó lấy tất cả sách và in ra tên tác giả:
```
$books = Book::all();

foreach ($books as $book) {
    echo $book->author->name;
}
```
Dòng lệnh đầu tiên sẽ thực hiện 1 truy vấn lấy ra tất cả book. Giả sử có N quyển sách. Vòng lặp sẽ lặp N lần, mỗi lần thực hiện 1 truy vấn lấy ra tên tác giả của sách. Vậy là N + 1 truy vấn rồi. :(

Nếu dùng **eager loading**, bạn chỉ mất 2 truy vấn thôi :). Ta sẽ dùng phương thức `with()`. Tham số truyền vào là tên của relationship muốn lấy ra cùng model. 
```
$books = Book::with('author')->get();

foreach ($books as $book) {
    echo $book->author->name;
}
```
Khi đó, relationship sẽ được load ra cùng với model. 2 truy vấn được thực hiện:
```
select * from books

select * from authors where id in (1, 2, 3, 4, 5, ...)
```
Muốn **lấy nhiều relationship cùng 1 câu lệnh**, truyền mảng relationship vài hàm `with()`.
```
$books = Book::with(['author', 'publisher'])->get();
```
**Eager loading lồng nhau**

Ví dụ: lấy ra tác giả (author) của sách và cách liên hệ (contacts) của tác giả đó, ta dùng dấu '.' nhé.
```
$books = Book::with('author.contacts')->get();
```
**Eager loading lồng nhau trong quan hệ đa hình**

Ví dụ ta có model `ActivityFeed`:
```
class ActivityFeed extends Model
{
    /**
     * Get the parent of the activity feed record.
     */
    public function parentable()
    {
        return $this->morphTo();
    }
}
```
Giả sử 3 model `Event, Photo, Post` có thể tạo ra `ActivityFeed`. Model `Event` belongsTo `Calendar`, `Photo` belongsTo `Tag`, `Post` belongsTo `Author`.  Để truy vấn `ActivityFeed` và lấy ra `parentable` cùng với các quan hệ belongsTo tương ứng, ta dùng `morphWith()`.
```
use Illuminate\Database\Eloquent\Relations\MorphTo;

$activities = ActivityFeed::query()
    ->with(['parentable' => function (MorphTo $morphTo) {
        $morphTo->morphWith([
            Event::class => ['calendar'],
            Photo::class => ['tags'],
            Post::class => ['author'],
        ]);
    }])->get();
```
**Eager loading với các cột**

Đôi khi mình không muốn lấy ra tất cả các trường của 1 model thì có thể chọn các trường cụ thể. Chú ý là nên lấy ra `id` và các khóa ngoại khác nhé.

Ví dụ mình chỉ lấy cột id và name của author.
```
$books = Book::with('author:id,name')->get();
```
**Eager loading mặc định**

Nếu bạn muốn mỗi khi truy vấn model đều dùng Eager loading thì bạn có thể thêm thuộc tính `$with` vào model.
```
class Book extends Model
{
    // luôn load quan hệ author
    protected $with = ['author'];

    /**
     * Get the author that wrote the book.
     */
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
```
Có mặc định thì cũng có cách để bỏ đi những mặc định này nhé. Nếu bạn không muốn load thêm `author` thì dùng phương thức `without()` nhé.
```
$books = Book::without('author')->get();
```
### Thêm ràng buộc cho Eager Loading
Nâng cao hơn 1 chút, ta sẽ thêm ràng buộc khi dùng Eager Loading. Trong 1 số trường hợp, các relationship có thêm điều kiện. 

Ví dụ: chỉ load ra những `posts` có `title` chứa chữ `first`.
```
$users = User::with(['posts' => function ($query) {
    $query->where('title', 'like', '%first%');
}])->get();
```
**Note**: Không dùng các phương thức `limit` và `take` trong trường hợp này.
### Lazy Eager Loading
**Lazy Eager Loading** khác với Lazy Loading ở bên trên nhé. Phương pháp này dùng khi bạn muốn load 1 relationship sau khi đã truy vấn model cha, khi nào dùng thì mới load ra. Tất nhiên nó vẫn tối ưu câu truy vấn nhé. Thay vì dùng `with()` ta sẽ dùng **`load()`**.
```
$books = Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```
Tham số truyền vào là các relationship muốn lấy ra.

Tương tự bên trên, ta có thể thêm ràng buộc truy vấn cho Lazy Eager Loading.
```
$author->load(['books' => function ($query) {
    $query->orderBy('published_date', 'asc');
}]);
```
**`loadMissing()`**
Vì truy vấn lấy relationship thực hiện sau khi đã lấy ra model cha nên bạn có thể load relationship khi nó chưa được load trước đó.
```
public function format(Book $book)
{
    $book->loadMissing('author');

    return [
        'name' => $book->name,
        'author' => $book->author->name,
    ];
}
```
**Lazy Eager Loading lồng nhau & morphTo**

Sử dụng ví dụ của phần Eager Loading, thay vì dùng `withMorth()` ta dùng **`loadMorph()`**.
```
$activities = ActivityFeed::with('parentable')
    ->get()
    ->loadMorph('parentable', [
        Event::class => ['calendar'],
        Photo::class => ['tags'],
        Post::class => ['author'],
    ]);
```


## Tổng kết
Mình xin kết thúc Relationships trong Laravel ở đây. Hy vọng sau khi đọc, các bạn có thể hiểu và áp dụng được relationship vào project của mình 1 cách thật sự tự tin và chính xác. 

## Tài liệu tham khảo
https://laravel.com/docs/6.x/eloquent-relationships#constraining-eager-loads