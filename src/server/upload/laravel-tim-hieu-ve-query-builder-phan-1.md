# Introduction
Query builder cung cấp một giao thức thuận tiện, linh hoạt cho việc tạo và thực thi các truy vấn dữ liệu. Nó có thể sử dụng để thực hiện hầu hết các tính toán dữ liệu trong ứng dụng của bạn, và hoạt động trên tất các các hệ cơ sở dữ liệu được hỗ trợ.

Laravel query builder sử dụng PDO parameter binding để bảo vệ ứng dụng của bạn khỏi tấn công SQL injection. Vì vậy không cần phải xử lí các chuỗi khi truyền vào.
# Retrieving Results
<br>

**Retrieving All Rows From A Table**

Bạn có thể sử dụng phương thức ```table``` trong ```DB``` facade để bắt đầu một query. Phương thức ```table``` trả về một instance của fluent query builder với bảng đã cho, cho phép bạn thêm nhiều ràng buộc vào truy vấn và lấy kết quả bằng phương thức ```get```:

```
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show a list of all of the application's users.
     *
     * @return Response
     */
    public function index()
    {
        $users = DB::table('users')->get();

        return view('user.index', ['users' => $users]);
    }
}
```
Phương thức ```get``` trả về một ```Illuminate\Support\Collection``` chứa các kết quả mà mỗi kết quả là một instance của PHP ```StdClass```. Bạn có thể truy cập mỗi cột giá trị bằng cách coi cột như là thuộc tính của một object:

```
foreach ($users as $user) {
    echo $user->name;
}
```
<br>

**Retrieving A Single Row / Column From A Table**

Nếu bạn chỉ cần lấy một row từ bảng dữ liệu, bạn có thể sử dụng phương thức ```first```. Phương thức này sẽ trả về một đối tượng đơn ```StdClass```:
```
$user = DB::table('users')->where('name', 'John')->first();

echo $user->name;
```
Nếu bạn không cần lấy toàn bộ row, bạn có thể lấy ra một giá trị từ một bản ghi sử dụng phương thức ```value```. Phương thức này sẽ trả về giá trị của cột ngay tức khắc:
```
$email = DB::table('users')->where('name', 'John')->value('email');
```

<br>

**Retrieving A List Of Column Values**

Nếu bạn muốn lấy một Collection chứa các giá trị của một cột, bạn có thể sử dụng phương thức ```pluck```. Trong ví dụ này, chúng ta sẽ lấy một Collection của các role titles:

```
$titles = DB::table('roles')->pluck('title');

foreach ($titles as $title) {
    echo $title;
}
```
Bạn cũng có thể chỉ định một cột key cho Collection trả về:
```
$roles = DB::table('roles')->pluck('title', 'name');

foreach ($roles as $name => $title) {
    echo $title;
}
```

<br>

### Chunking Results

Nếu bạn phải làm việc với hàng nghìn record dữ liệu, hãy xem xét việc sử dụng phương thức ```chunk```. Phương thức này sẽ lấy một đoạn nhỏ (chunk) các kết quả tại một thời điểm, và nạp từng chunk này vào một  ```Closure``` để xử lí. Phương thức này vô cùng hữu ích cho việc viết [Artisan commands](https://laravel.com/docs/5.4/artisan) để xử lí hàng nghìn record. Ví dụ hãy làm việc với toàn bộ bảng ```users``` với các chunks 100 bản ghi một lúc:
```
DB::table('users')->orderBy('id')->chunk(100, function ($users) {
    foreach ($users as $user) {
        //
    }
});
```
Bạn có thể dừng các chunk khác khỏi việc xử lí bằng cách trả về ```false``` từ ```Closure```:

<br>

### Aggregates
Query builder cũng cung cấp một tập hợp các phương thức khác nhau, như là ```count```, ```max```, ```min```,  ```avg```, và ```sum```. Bạn có thể gọi bất kì phương thức nào sau cấu trúc truy vấn của bạn:
```
$users = DB::table('users')->count();

$price = DB::table('orders')->max('price');
```
Dĩ nhiên, bạn cũng có thể kết những phương thức này với các mệnh đề khác để tạo nên câu truy vấn:
```
$price = DB::table('orders')
                ->where('finalized', 1)
                ->avg('price');
```

<br>

# Selects
<br>

**Specifying A Select Clause**

Tất nhiên, có thể không phải lúc nào bạn cũng muốn lấy toàn bộ các cột từ một bảng. Sử dụng phương thức ```select``` bạn có thể chỉ định tùy chọn một mệnh đề ```select``` cho truy vấn:
```
$users = DB::table('users')->select('name', 'email as user_email')->get();
```
Phương thức ```distinct``` cho phép bạn ép buộc truy vấn trả về các kết quả phân biệt:
```
$users = DB::table('users')->distinct()->get();
```
Nếu bạn đã có sẵn một query builder instance và bạn muốn thêm một cột vào mệnh đề select, bạn có thể sử dụng phương thức ```addSelect```:
```
$query = DB::table('users')->select('name');

$users = $query->addSelect('age')->get();
```

<br>

# Raw Expressions

<br>

Đôi khi bạn có thể cần sử dụng một raw expression trong truy vấn. Những expression này sẽ được đưa vào truy vấn như các chuỗi, vì vậy hãy cẩn thận đừng tạo bất kì lỗi SQL injection nào. Để tạo một raw expression, bạn có thể sử dụng phương thức DB::raw:
```
$users = DB::table('users')
                     ->select(DB::raw('count(*) as user_count, status'))
                     ->where('status', '<>', 1)
                     ->groupBy('status')
                     ->get();
```

<br>

# Joins

<br>

**Inner Join Clause**

Query builder cũng có thể được sử dụng để viết các câu lệnh join. Để thực hiện một "inner join" SQL cơ bản, bạn có thể sử dụng phương thức ```join``` trên một query builder instance. Tham số được truyền vào đầu tiên trong phương thức ```join``` là tên của bảng bạn join đến, trong khi tham số còn lại chỉ định các cột ràng buộc cho việc join. Tất nhiên như bạn có thể thấy, bạn có thể join nhiều bảng trong một truy vấn:
```
$users = DB::table('users')
            ->join('contacts', 'users.id', '=', 'contacts.user_id')
            ->join('orders', 'users.id', '=', 'orders.user_id')
            ->select('users.*', 'contacts.phone', 'orders.price')
            ->get();
```
<br>

**Left Join Clause**

Nếu bạn muốn thực hiện một "left join" thay vì "inner join", sử dụng phương thức leftJoin. Phương thức ```leftJoin``` này có cú pháp giống phương thức ```join```:
```
$users = DB::table('users')
            ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
            ->get();
```

<br>

**Cross Join Clause**

Để thực hiện một "cross join", sử dụng phương thức ```crossJoin``` với tên của bảng bạn muốn cross join đến. Cross join sinh ra một cartesion product giữa bảng đầu tiên và bảng được join.
```
$users = DB::table('sizes')
            ->crossJoin('colours')
            ->get();
```

<br>

**Advanced Join Clauses**

Bạn cũng có thể chỉ định nhiều mệnh đề join nâng cao. Để bắt đầu, truyền một ```Closure``` như là tham số thứ 2 vào phương thức ```join```. ```Closure``` sẽ nhận một đối tượng ```JoinClause``` cho phép bạn chỉ định các ràng buộc trong mệnh đề ```join```:
````
DB::table('users')
        ->join('contacts', function ($join) {
            $join->on('users.id', '=', 'contacts.user_id')->orOn(...);
        })
        ->get();
````
Nếu bạn muốn sử dụng mệnh đề "where" trong truy vấn join của bạn, bạn có thể sử dụng phương thức ```where``` và ```orWhere``` trong join. Thay vì so sánh 2 cột, các phương thức này sẽ so sánh cột với một giá trị:
```
DB::table('users')
        ->join('contacts', function ($join) {
            $join->on('users.id', '=', 'contacts.user_id')
                 ->where('contacts.user_id', '>', 5);
        })
        ->get();
 ```
 
 <br>
 
 # Unions
 
 <br>
 
 Query builder cũng cung cấp một cách nhanh chóng để "union" 2 truy vấn với nhau. Ví dụ, bạn có thể tạo một truy vấn khởi tạo, và sau đó sử dụng phương thức ```union``` để nối nó vào truy vấn thứ 2:
```
$first = DB::table('users')
            ->whereNull('first_name');

$users = DB::table('users')
            ->whereNull('last_name')
            ->union($first)
            ->get();
 ```
 
 <br>
 
 Tài liệu: https://laravel.com/docs/5.4/queries