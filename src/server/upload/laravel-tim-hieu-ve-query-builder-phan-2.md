# Where Clauses
<br>

 **Simple Where Clauses**
 
 Bạn có thể sử dụng phương thức ```where``` trong query builder instance để thêm mệnh đề ```where``` vào truy vấn. Hầu hết cách gọi cơ bản của ```where``` yêu cầu ba tham số. Tham số đầu tiên là tên của cột. Tham số thứ 2 là một toán tử, nó chính là bất kì toán tử nào mà được hỗ trợ bởi cơ sở dữ liệu. Tham số thứ 3 là giá trị để so sánh với cột.

Ví dụ, đây là một truy vấn để kiểm tra giá trị của cột "votes" bằng 100:
```php
$users = DB::table('users')->where('votes', '=', 100)->get();
```
Để thuận tiện, bạn có thể đơn giản chỉ muốn lấy một cột có giá trị bằng giá trị đã cho, bạn chỉ cần truyền giá trị trực tiếp vào như là tham số thứ 2 vào phương thức ```where```:
```php
$users = DB::table('users')->where('votes', 100)->get();
```
Dĩ nhiên, bạn cũng có thể sử dụng nhiều toán tử khác khi viết mệnh đề ```where```:
```php
$users = DB::table('users')
                ->where('votes', '>=', 100)
                ->get();

$users = DB::table('users')
                ->where('votes', '<>', 100)
                ->get();

$users = DB::table('users')
                ->where('name', 'like', 'T%')
                ->get();
 ```
 Bạn có thể truyền vào một mảng điều kiện vào phương thức ```where```:
 ```php
 $users = DB::table('users')->where([
    ['status', '=', '1'],
    ['subscribed', '<>', '1'],
])->get();
```

<br>

**Or Statements**

Bạn có thể nối tiếp các ràng buộc where cùng nhau, cũng như thêm mệnh đề ```or``` vào truy vấn. Phương thức ```orWhere``` chấp nhận các đối số giống như  ```where```:
```php
$users = DB::table('users')
                    ->where('votes', '>', 100)
                    ->orWhere('name', 'John')
                    ->get();
```

<br>

**Additional Where Clauses**

**_whereBetween_**

Phương thức ```whereBetween``` kiểm tra giá trị một cột có ở giữa 2 giá trị:

```php
$users = DB::table('users')
                    ->whereBetween('votes', [1, 100])->get();
 ```
 
 **_whereNotBetween_**
 
 Phương thức ```whereNotBetween``` kiểm tra giá trị của cột có nằm bên ngoài hai giá trị:
 
 ```php
 $users = DB::table('users')
                    ->whereNotBetween('votes', [1, 100])
                    ->get();
  ```
  
  **_whereIn / whereNotIn_**
  
  Phương thức ```whereIn``` kiểm tra giá trị của cột nằm trong một mảng:
  
  ```php
  $users = DB::table('users')
                    ->whereIn('id', [1, 2, 3])
                    ->get();
   ```
   Phương thức ```whereNotIn``` kiểm tra giá trị của cột nằm ngoài một mảng mảng:
   ```php
   $users = DB::table('users')
                    ->whereNotIn('id', [1, 2, 3])
                    ->get();
   ```
   
   **_whereNull / whereNotNull_**
   
   Phương thức ```whereNull``` để kiểm tra giá trị của cột đã cho là ```NULL```:
   ```php
   $users = DB::table('users')
                    ->whereNull('updated_at')
                    ->get();
   ```
   
   Phương thức ```whereNotNull``` kiểm tra giá trị của cột không là NULL:
   
   ```php
   $users = DB::table('users')
                    ->whereNotNull('updated_at')
                    ->get();
   ```
   
  **_whereDate / whereMonth / whereDay / whereYear_**
  
  Phương thức ```whereDate``` sử dụng để so sánh giá trị cột với ngày (kiểu date):
  
  ```php
  $users = DB::table('users')
                ->whereDate('created_at', '2016-12-31')
                ->get();
 ```
 Phương thức ```whereMonth``` sử dụng để so sánh giá trị cột với 1 tháng đặc biệt trong năm:
 ```php
 $users = DB::table('users')
                ->whereMonth('created_at', '12')
                ->get();
```
Phương thức ```whereDay``` sử dụng để so sánh giá trị cột với một ngày đặc biệt của tháng:
```php
$users = DB::table('users')
                ->whereDay('created_at', '10')
                ->get();
 ```
 
 Phương thức ```whereYear``` sử dụng để so sánh giá trị cột với một năm được chỉ định:
 
 ```php
 $users = DB::table('users')
                ->whereYear('created_at', '2016')
                ->get();
  ```
  
  **_whereColumn_**

Phương thức ```whereColumn``` kiểm tra giá trị hai cột bằng nhau:
```php
$users = DB::table('users')
                ->whereColumn('first_name', 'last_name')
                ->get();
 ```
 Bạn cũng có thể truyền một toán tử so sánh vào phương thức:
 ```php
 $users = DB::table('users')
                ->whereColumn('updated_at', '>', 'created_at')
                ->get();
 ```
 Phương thức ```whereColumn``` có thể được truyền vào một mảng các điều kiện. Những điều kiện này sẽ được nối với nhau sử dụng toán tử ```and```:
 ```php
 $users = DB::table('users')
                ->whereColumn([
                    ['first_name', '=', 'last_name'],
                    ['updated_at', '>', 'created_at']
                ])->get();
 ```
 
 <br>

### Parameter Grouping

Đôi khi bạn có thể cần tạo nhiều mệnh đề where nâng cao như "where exists" hoặc nhóm các tham số lồng nhau. Laravel query builder có thể xử lí tốt việc này. Để bắt đầu, hãy xem ví dụ sau về việc nhóm các ràng buộc trong ngoặc:
```php
DB::table('users')
            ->where('name', '=', 'John')
            ->orWhere(function ($query) {
                $query->where('votes', '>', 100)
                      ->where('title', '<>', 'Admin');
            })
            ->get();
 ```
 Như bạn có thể thấy, truyền một ```Closure``` vào phương thức ```orWhere``` chỉ thị cho query builder bắt đầu một nhóm ràng buộc. ```Closure``` sẽ nhận một query builder instance mà bạn có thể sử dụng để thiết lập các ràng buộc mà sẽ được đặt trong trong ngoặc. Ví dụ trên sẽ tạo ra một câu lệnh SQL như sau:
 ```sql
 select * from users where name = 'John' or (votes > 100 and title <> 'Admin')
 ```
 
 ### Where Exists Clauses
 
  <br>
  
  Phương thức ```whereExists``` cho phép bạn viết các mệnh đề ```where exists```. Phương thức ```whereExists``` chấp nhận tham số là một ```Closure``` sẽ nhận một query builder instance cho phép bạn định nghĩa truy vấn sẽ được đặt trong mệnh đề:
  ```php
  DB::table('users')
            ->whereExists(function ($query) {
                $query->select(DB::raw(1))
                      ->from('orders')
                      ->whereRaw('orders.user_id = users.id');
            })
            ->get();
   ```
   
   Truy vấn trên sẽ sinh ra đoạn SQL sau:
   ```php
   select * from users
where exists (
    select 1 from orders where orders.user_id = users.id
)
```

### JSON Where Clauses

<br>

Laravel cũng hỗ trợ truy vấn với cột kiểu JSON trên database có hỗ trợ kiểu JSON cho cột. Hiện tại, MySQL 5.7 và Postgres có hỗ trợ JSON. Để truy vấn một cột JSON, sử dụng toán tử ```->``` operator:
```php
$users = DB::table('users')
                ->where('options->language', 'en')
                ->get();

$users = DB::table('users')
                ->where('preferences->dining->meal', 'salad')
                ->get();
 ```
 
 # Ordering, Grouping, Limit, & Offset
 
 <br>
 
 **orderBy**
 
 Phương thức ```orderBy``` cho phép bạn sắp xếp kết quả của truy vấn bởi một cột cho trước. Tham số đầu tiên của phương thức ```orderBy``` sẽ là cột bạn muốn sắp xếp, trong khi tham số thứ 2 là chiều của sắp xếp và có thể là ```asc``` hoặc ```desc```:
 ```php
 $users = DB::table('users')
                ->orderBy('name', 'desc')
                ->get();
  ```
  
  **latest / oldest**
  
  Các phương thức ```latest``` và ```oldest``` cho phép bạn dễ dàng sắp xếp kết quả theo ngày. Theo mặc định, kết quả sẽ được sắp xếp theo cột ```created_at```. Hoặc, bạn có thể thay đổi tên cột mà bạn muốn sắp xếp theo:
```php
$user = DB::table('users')
                ->latest()
                ->first();
 ```
 
 **inRandomOrder**
 
 Phương thức ```inRandomOrder``` có thể được sử dụng để sắp xếp kết quả truy vấn một cách ngẫu nhiên. Ví dụ bạn có thể sử dụng phương thức này để lấy một user ngẫu nhiên:
```php
$randomUser = DB::table('users')
                ->inRandomOrder()
                ->first();
```

**groupBy / having / havingRaw**

Phương thức ```groupBy``` và ```having``` có thể được sử dụng để nhóm kết quả truy vấn. Phương thức  ```having``` có cách sử dụng tương tự phương thức where:
```php
$users = DB::table('users')
                ->groupBy('account_id')
                ->having('account_id', '>', 100)
                ->get();
```
Phương thức ```havingRaw``` có thể được sử dụng thiết lập các chuỗi vào mệnh đề ```having```. Ví dụ chúng ta có thể tìm toàn bộ các department mà có sale lớn hơn $2,500:
```php
$users = DB::table('orders')
                ->select('department', DB::raw('SUM(price) as total_sales'))
                ->groupBy('department')
                ->havingRaw('SUM(price) > 2500')
                ->get();
 ```
 
 **skip / take**
 
 Để giới hạn số kết quả trả về từ truy vấn, hoặc bỏ qua một số cho trước các kết quả trong truy vấn bạn có thể sử dụng phương thức ```skip``` và ```take```:
```php
$users = DB::table('users')->skip(10)->take(5)->get();
```
Ngoài ra, bạn có thể sử dụng phương thức ```limit``` và ```offset```:
```php
$users = DB::table('users')
                ->offset(10)
                ->limit(5)
                ->get();
 ```
 
 # Conditional Clauses
 
 Đôi khi bạn có thể muốn áp dụng cho một truy vấn khi có một cái gì đó đúng. Ví dụ, bạn có thể  muốn áp dụng một câu lệnh ```where``` khi có giá trị nhập vào ở trong trong request đến. Bạn có thể thực hiện điều này bằng cách sử dụng phương thức ```when```:
```php
$role = $request->input('role');

$users = DB::table('users')
                ->when($role, function ($query) use ($role) {
                    return $query->where('role_id', $role);
                })
                ->get();
```
Phương thức ```when``` chỉ thực hiện ```Closure``` đã cho khi tham số đầu tiên là ```true```. Nếu tham số đầu tiên là  ```false```, ```Closure``` sẽ không được thực thi.

Bạn có thể truyền một ```Closure``` khác như là tham số thứ ba của phương thức ```when```. ```Closure``` này sẽ thực thi nếu tham số thứ nhất là ```false```. Để minh họa cách sử dụng tính năng này, chúng ta sẽ cấu hình mặc định sắp xếp một truy vấn:
```php
$sortBy = null;

$users = DB::table('users')
                ->when($sortBy, function ($query) use ($sortBy) {
                    return $query->orderBy($sortBy);
                }, function ($query) {
                    return $query->orderBy('name');
                })
                ->get();
 ```
 
 # Inserts
Query builder cũng cung cấp một phương thức ```insert``` cho việc chèn các bản ghi vào trong bảng. Phương thức ```insert``` chấp nhận một mảng gồm tên cột và giá trị để thêm vào:
```php
DB::table('users')->insert(
    ['email' => 'john@example.com', 'votes' => 0]
);
```
Bạn có thể chèn nhiều bản ghi riêng biệt vào bảng với một lần gọi ```insert``` bằng cách truyền vào một mảng chứa các mảng. Mỗi mảng con đại diện cho một dòng sẽ được chèn vào bảng:
```php
DB::table('users')->insert([
    ['email' => 'taylor@example.com', 'votes' => 0],
    ['email' => 'dayle@example.com', 'votes' => 0]
]);
```

**Auto-Incrementing IDs**

Nếu bảng có một auto-incrementing id, sử dụng phương thức ```insertGetId``` để thêm vào một bản ghi vào sau đó lấy ID:
```php
$id = DB::table('users')->insertGetId(
    ['email' => 'john@example.com', 'votes' => 0]
);
```

# Updates
Tất nhiên, ngoài việc chèn thêm bản ghi vào database, query builder cũng có thể cập nhật bản ghi có sẵn bằng cách sử dụng phương thức ```update```. Phương thức ```update``` giống như ```insert```, chấp nhận một mảng các cặp tên cột và giá trị có trong cột để cập nhật. Bạn có thể hạn chế truy vấn ```update``` bằng cách sử dụng mệnh đề ```where```:
```php
DB::table('users')
            ->where('id', 1)
            ->update(['votes' => 1]);
```

### Updating JSON Columns

Khi cập nhật cột JSON, bạn nên sử dụng cú pháp ```->``` để truy cập đến key của đối tượng JSON. Thao tác này chỉ được hỗ trợ trên cơ sở dữ liệu hỗ trợ kiểu JSON:
```php
DB::table('users')
            ->where('id', 1)
            ->update(['options->enabled' => true]);
```

### Increment & Decrement
Query builder cũng cung cấp các phương thức thuận tiện cho việc tăng hay giảm giá trị của một cột. Đây chỉ đơn giản là một shortcut, cung cấp một interface nhanh chóng và ngắn gọn so với việc viết cú pháp ```update```.

Cả hai phương thức trên đều chấp nhận ít nhất 1 tham số: cột để thay đổi. Một tham số thứ 2 có thể tùy chọn được truyền vào để điều khiển giá trị tăng hay giảm cho cột:
```php
DB::table('users')->increment('votes');

DB::table('users')->increment('votes', 5);

DB::table('users')->decrement('votes');

DB::table('users')->decrement('votes', 5);
```
Bạn cũng có thể chỉ định thêm các cột để cập nhật trong khi thực hiện:
```php
DB::table('users')->increment('votes', 1, ['name' => 'John']);
```

# Deletes

Tất nhiên, query builder cũng có thể được sử dụng để xóa các bản ghi từ bảng thông qua phương thức ```delete```. Bạn có thể ràng buộc cú pháp delete bằng cách thêm mệnh đề ```where``` trước khi gọi phương thức  ```delete```:
```php
DB::table('users')->delete();

DB::table('users')->where('votes', '>', 100)->delete();
```
Nếu bạn muốn ```truncate``` toàn bộ bảng, cái mà sẽ xóa toàn bộ các dòng và reset lại auto-incrementing ID về 0, bạn có thể sử dụng phương thức ```truncate```:
```php
DB::table('users')->truncate();
```

# Pessimistic Locking

Query builder cũng bao gồm các hàm nhỏ để giúp bạn thực hiện "pessimistic locking" trong truy vấn ```select```. Để chạy cú pháp với một "shared lock", bạn có thể sử dụng phương thức ```sharedLock``` trong truy vấn. Một shared lock bảo về các dòng được chọn khỏi việc bị thay đổi tới khi transaction của bạn được ủy thác:
```php
DB::table('users')->where('votes', '>', 100)->sharedLock()->get();
```
Ngoài ra, bạn có thể sử dụng phương thức ```lockForUpdate```. Một "for update" lock bảo về các dòng khỏi việc thay đổi hoặc bị selected bởi các shared lock khác:
```php
DB::table('users')->where('votes', '>', 100)->lockForUpdate()->get();
```

Tài liệu: https://laravel.com/docs/5.4/queries