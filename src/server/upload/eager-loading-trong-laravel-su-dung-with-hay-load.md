# 1. Eager Loading là gì?
Khi chúng ta sử dụng ORM trong laravel, mặc định ORM sẽ ở chế độ "lazy" khi load lên tất cả các model quan hệ (relation). Cụ thể hơn chúng ta cùng xem xét một ví dụ ở docs của laravel như sau:
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
        return $this->belongsTo('App\Author');
    }
}
```
Và có một đoạn code như sau:
```
$books = App\Book::all();

foreach ($books as $book) {
    echo $book->author->name;
}
```
Nhìn vào ví dụ trên chúng ta sẽ thấy:
+ 1 câu query để lấy ra tất cả các bản ghi từ bảng books
+ Với mỗi bản ghi book chúng ta lại query thêm một câu để lấy ra tên author từ mối quan hệ
=> Vậy với n bản ghi book chúng ta sẽ cần tới N+1 query, một số lượng query khổng lồ, và laravel đã cung cấp cho chúng ta 2 phương thức là load() và with() để giải toán vấn đề trên.
# 2. Sử dụng with() hay load()?
Phần lớn chúng ta giải quyết vấn đề lazy loading chúng ta hay sử dụng phương thức with(), và quên đi rằng laravel cũng còn một phương thức khác để giải quyết vấn đề này là load().
### 2.1 Eager loading với phương thức with()
`$books = App\Book::with('author')->get();`

Câu truy vấn thực thi sẽ là như thế này:
```
select * from books
select * from authors where id in (1, 2, 3, 4, 5, ...)
```
Chúng ta nhận ra điểm mạnh của phương thức này là chúng ta thay vì phải tốn N+1 query thì chúng ta sẽ chỉ tốn 2 query.
+ 1 câu query load ra tất cả bản ghi book
+ 1 câu query load ra mối quan hệ với bảng authors
### 2.2 Eager loading với phương thức load()
`$books = App\Book::all()->load('author');`
Chúng ta nhận được câu truy vấn thực thi tương tự như sử dụng with()
```
select * from books
select * from authors where id in (1, 2, 3, 4, 5, ...)
```
### 2.3 Sự khác nhau giữa with() và load()?
Mò vào core của laravel chúng ta sẽ thấy như sau:
```
    /**
     * Begin querying a model with eager loading.
     *
     * @param  array|string  $relations
     * @return \Illuminate\Database\Eloquent\Builder|static
     */
    public static function with($relations)
    {
        return (new static)->newQuery()->with(
            is_string($relations) ? func_get_args() : $relations
        );
    }

    /**
     * Eager load relations on the model.
     *
     * @param  array|string  $relations
     * @return $this
     */
    public function load($relations)
    {
        $query = $this->newQuery()->with(
            is_string($relations) ? func_get_args() : $relations
        );

        $query->eagerLoadRelations([$this]);

        return $this;
    }
```
Chúng ta sẽ nhận thấy rằng phương thức with() nó sẽ thực thi  ngay sau câu truy vấn đầu và khi nó gặp các phương phức dạng như get(), first(), all(), ...
Còn load() thì nó sẽ chạy phương thức đầu tiên load ra các bản ghi, và load các mối quan hệ ở thời điểm sau này.
### 2.4 Sử dụng load() như thế nào?
```
$books = App\Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```
Khi sử dụng load() chúng ta có quyền quyết định có chạy câu query thứ 2 để load các mối quan hệ hay không với các điều kiện mở rộng.
Vì thế tại mỗi trường hợp cụ thể mà chúng ta nên sử dụng load() hay with() để giải quyết vấn đề N+1 query.

Tài liệu tham khảo:
https://laravel.com/docs/5.2/eloquent-relationships#lazy-eager-loading