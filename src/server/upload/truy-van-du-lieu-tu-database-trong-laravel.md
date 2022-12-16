# Eloquent ORM và Query Builder
## WHAT?
* Eloquent ORM đi kèm với Laravel cung cấp ActiveRecord đầy đủ và đơn giản để làm việc với database. Mỗi bảng của database sẽ được ánh xạ qua ‘Model’, và model này được sử dụng để tương tác với bảng.
* Query Builder giúp chúng ta tạo những truy vấn từ database, có thể được sử dụng để thực thi hầu hết những thao tác về database trong ứng dụng và làm việc với tất cả những database được hỗ trợ.

## HOW?
### Eloquent
Trong Eloquent mỗi bảng trong database phải ứng với 1 model. Lưu ý là mỗi Eloquent model này đều phải extend `Illuminate\Database\Eloquent\Model`
<br>Trả về 1 **Eloquent Collections**, trong đó mỗi kết quả là 1 **object**.
```php
User::all();
```
### Query builder
Query Builder xây dựng lớp DB để thực hiện các câu truy vấn. Do đó, để bắt đầu 1 Query Builder, ta sử dụng hàm table() trong DB facade.
<br>Trả về 1 **mảng kết quả** , trong đó mỗi kết quả là 1 **object StdClass** của PHP
```php
DB::table($ten_bang)->bieuthuc->laydulieu();
```
* $ten_bang là đặt bảng mà trong truy vấn sẽ truy vấn tới.
* bieuthuc là các biểu thức mà trong câu truy vấn sẽ thực hiện như: where, orWhere, orderBy, groupBy, ...
* laydulieu() là phương thức để thực thi câu truy vấn bao gồm các biểu thức trước đó, cơ bản nhất là get() ngoài ra còn có, first(), pluck(), lists(), ...
Ví dụ:
```php
DB::table('users)->get();
```
Để biết các biểu thức trong query builder hỗ trợ, bạn chạy đoạn code sau và bạn sẽ thấy là có rất nhiều query được hỗ trợ:
```php
var_dump(get_class_methods('\Illuminate\Database\Query\Builder'));
```
## COMPARE?
* Eloquent được xây dựng lên từ Query Builder nên Query Builder không sử dụng được method của eloquent.
* Trường hợp phải join hai hay nhiều bảng nên sử dụng query builder để truy vấn theo các điều kiện chặt chẽ hơn
* Query Builder có hiệu suất truy vấn dữ liệu nhanh hơn Eloquent ORM bởi vì Eloquent phải thêm một lớp trong ứng dụng và yêu cầu nhiều truy vấn SQL
# Eager Loading
## WHAT?
Khi chúng ta sử dụng ORM trong laravel, mặc định ORM sẽ ở chế độ "lazy" khi load lên tất cả các model quan hệ (relation). Chúng ta cùng xem xét một ví dụ
```php
<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
```
Và có một đoạn code như sau:
```php
$comments = App\Comment::all();
foreach ($comments as $comment) {
    echo $comment->user->name;
}
```
Nhìn vào ví dụ trên chúng ta sẽ thấy:
*  1 câu query để lấy ra tất cả các bản ghi từ bảng comments
*  Với mỗi bản ghi comment chúng ta lại query thêm một câu để lấy ra tên user từ mối quan hệ 

=> Vậy với n bản ghi comment chúng ta sẽ cần tới **N+1 query**, một số lượng query khổng lồ
## HOW?
Laravel đã cung cấp cho chúng ta 2 phương thức là `load()` và `with()` để xử lý vấn đề trên.
### Eager loading với phương thức with()
```php
$comments = App\Comment::with('user')->get();
```
Câu truy vấn thực thi sẽ là như thế này:
```sql
select * from comments
select * from users where id in (1, 2, 3, 4, 5, ...)
```
Chúng ta nhận ra điểm mạnh của phương thức này là chúng ta thay vì phải tốn N+1 query thì chúng ta sẽ chỉ tốn 2 query.
* 1 câu query load ra tất cả bản ghi comment
* 1 câu query load ra mối quan hệ với bảng users

Nếu cần chỉ định thêm điều kiện ở câu truy vấn thì làm như sau
```sql
$users = User::with(['posts' => function($query) {
  $query->where('title', 'like', '%first%');
}])->get();
```
### Eager loading với phương thức load()
```php
$comments = App\Comment::all()->load('user');
```
Chúng ta nhận được câu truy vấn thực thi tương tự như sử dụng with()
```sql
select * from comments
select * from users where id in (1, 2, 3, 4, 5, ...)
```
### Sự khác nhau giữa with() và load()?
Chúng ta sẽ nhận thấy rằng 
* `with()` nó sẽ thực thi ngay sau câu truy vấn đầu và khi nó gặp các phương phức dạng như get(), first(), all(), ...
* `load()` thì nó sẽ chạy phương thức load ra các bản ghi trước và load các mối quan hệ sau. Khi sử dụng load() chúng ta có quyền quyết định có chạy câu query thứ 2 để load các mối quan hệ hay không
### Sử dụng như thế nào?
* Sử dụng phương thức with() khi có một truy vấn (Eloquent builder)
* Sử dụng phương thức load() khi đã nhận được dữ liệu Eloquent collection hoặc Model