# Lấy kết quả:
### Lấy toàn bộ kết quả trong một bảng:
```
$users = DB::table('users')->get();
```
Phương thức `get` trả về một `Illuminate \ Support \ Collection` chứa các kết quả trong đó mỗi kết quả là một thể hiện của đối tượng PHP `stdClass`. Bạn có thể truy cập giá trị của từng cột bằng cách truy cập cột đó như một thuộc tính của đối tượng:
```
foreach ($users as $user) {
    echo $user->name;
}
```
### Lấy một hàng / cột đơn từ bảng:
* Lấy ra cột đầu tiên từ bẳng:

`$user = DB::table('users')->where('name', 'John')->first();`

* Lấy ra 1 cột bất kỳ theo id:

`$user = DB::table('users')->find(3);`

# Tính toán:
* Đếm số lượng bản ghi trong 1 bảng:

`$users = DB::table('users')->count();`

* Tìm giá trị lớn nhất trong bảng:

`$price = DB::table('orders')->max('price');`

* Tính tổng theo các điều kiện cho trước: 

```
$price = DB::table('orders')
                ->where('finalized', 1)
                ->avg('price');
```
              
# Select (Lựa chọn):
Không phải lúc nào bạn cũng có thể muốn chọn tất cả các cột từ bảng cơ sở dữ liệu. Sử dụng method `select`, bạn có thể chỉ định method `select` tùy chỉnh cho truy vấn:

Trong bảng users chỉ truy vấn tới 2 cột name và email ta làm như sau:

`$users = DB::table('users')->select('name', 'email as user_email')->get();`

Lấy ra các kết quả của bảng users không trùng nhau ta sử dụng:

`$users = DB::table('users')->distinct()->get();`

# Truy vấn dữ liệu với Raw:
Đôi khi bạn có thể cần sử dụng một biểu thức thô trong một truy vấn. Để tạo một biểu thức thô, bạn có thể sử dụng phương thức `DB :: raw`:

```
users = DB::table('users')
                     ->select(DB::raw('count(*) as user_count, status'))
                     ->where('status', '<>', 1)
                     ->groupBy('status')
                     ->get();
```
CHÚ Ý: Các câu lệnh raw sẽ được đưa vào truy vấn dưới dạng chuỗi, vì vậy bạn phải cực kỳ cẩn thận để không tạo ra các lỗ hổng `SQL injection.`

## Raw method:
* selectRaw:
```
$orders = DB::table('orders')
                ->selectRaw('price * ? as price_with_tax', [1.0825])
                ->get();
```
* whereRaw / orWhereRaw:
```
$orders = DB::table('orders')
                ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
                ->get();
```
* orderByRaw:
```
$orders = DB::table('orders')
                ->orderByRaw('updated_at - created_at DESC')
                ->get();
```
* groupByRaw:
```
$orders = DB::table('orders')
                ->select('city', 'state')
                ->groupByRaw('city, state')
                ->get();
```
# Join trong laravel:
### Inner join:
Để thực hiện một "inner join" cơ bản, bạn có thể sử dụng phương thức `join` trên một phiên bản trình tạo truy vấn. Đối số đầu tiên được truyền cho phương thức nối là tên của bảng mà bạn cần tham gia, trong khi các đối số còn lại chỉ định các ràng buộc cột cho phép nối. Bạn thậm chí có thể tham gia vào nhiều bảng trong một truy vấn duy nhất:
```
$users = DB::table('users')
            ->join('contacts', 'users.id', '=', 'contacts.user_id')
            ->join('orders', 'users.id', '=', 'orders.user_id')
            ->select('users.*', 'contacts.phone', 'orders.price')
            ->get();
```
Trên đây là câu truy vấn lấy ra bảng users, join với bảng contacts và bảng orders theo id và lấy ra tất cả các cột của bảng users, cột phone của bảng contacts và cột price của bảng orders
### Left Join / Right Join:
Nếu bạn muốn thực hiện "left join" hoặc "right join", hãy sử dụng các method `leftJoin` hoặc `rightJoin`:
```
$users = DB::table('users')
            ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
            ->get();

$users = DB::table('users')
            ->rightJoin('posts', 'users.id', '=', 'posts.user_id')
            ->get();
```
### Advanced Join Clauses:
Bạn cũng có thể chỉ định các mệnh đề nối nâng cao hơn. Để bắt đầu, hãy chuyển một Closure làm đối số thứ hai vào phương thức nối. Closua sẽ nhận được một đối tượng JoinClause cho phép bạn chỉ định các ràng buộc đối với mệnh đề tham gia:
```
DB::table('users')
        ->join('contacts', function ($join) {
            $join->on('users.id', '=', 'contacts.user_id')->orOn(...);
        })
        ->get();
```