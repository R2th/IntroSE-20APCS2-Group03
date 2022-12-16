Tiếp tục với phần trước, hôm nay mình sẽ giới thiệu tiếp 10 thủ thuật nữa.
## 11. Order by Mutator
Giả sử bạn đang làm như sau:
```
function getFullNameAttribute()
{
  return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
}
```
Tuy nhiên nếu bạn muốn sắp xếp theo `full_name` thì làm theo cách trên sẽ không hoạt động:
`$clients = Client::orderBy('full_name')->get(); // doesn't work`
Vì thế chúng ta nên sửa lại một xíu thôi, chúng ta sẽ sắp xếp sau khi lấy chúng ra:
`$clients = Client::get()->sortBy('full_name'); // works!`
## 12. Sắp xếp trong phạm vi toàn cục
Nếu bạn đang muốn `User:all()` sẽ lấy ra toàn bộ user đã được sắp xếp theo `name`. Lúc này bạn cần chỉ định nó trong phạm vi toàn cục. Và nhớ lại ở mục trước mình đã giới thiệu trong hàm boot(), giờ ta làm như sau:
```
protected static function boot()
{
    parent::boot();

    // Order by name ASC
    static::addGlobalScope('order', function (Builder $builder) {
        $builder->orderBy('name', 'asc');
    });
}
```
## 13. Lồng câu lệnh truy vấn
Đôi lúc bạn cần lồng các câu truy vấn vào các câu lệnh trong Eloquent, vậy chúng ta có giải pháp gì? Bạn có thể xem qua ví dụ sau:
```
// whereRaw
$orders = DB::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();

// havingRaw
Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();

// orderByRaw
User::where('created_at', '>', '2016-01-01')
  ->orderByRaw('(updated_at - created_at) desc')
  ->get();
```
## 14. Tạo bản sao của một hàng
Cái này có vẻ hơi vô duyên, nhưng nếu bạn muốn tạo một bản sao dữ liệu của 1 hàng đã có rồi lưu nó lại trong database thì bạn có thể thực hiện như sau:
```
$task = Tasks::find(1);
$newTask = $task->replicate();
$newTask->save();
```
## 15. Phương thức chunk()  cho những bảng lớn
Thực ra thủ thuật này ít liên quan tới Eloquent mà nó lại dính dáng tới Collection cơ. Tuy nhiên nó cũng khá là hữu dụng trong việc xử lý các tập dữ liệu lớn. Đó là bạn có thể chia nhỏ chúng thành nhiều phần.
Bạn vẫn hay làm:
```
$users = User::all();
foreach ($users as $user) {
    // ...
```
```
Xong bạn thực tế nên:
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```
## 16. Thêm điều kiện khi tạo model
Chúng ta vẫn thường tạo model bằng câu lệnh artisan như sau:
`php artisan make:model Company`
Nhưng bạn có biết rằng, cú pháp sau sẽ tạo thêm các file liên quan đến Model của bạn không ?
`php artisan make:model Company -mcr`
-m tạo ra file migration
-c tạo ra file controller
-r tạo ra controller tuân thủ resful
## 17. Ghi đè updated_at khi lưu
Bạn có biết rằng, phương thức ->save() chấp nhận việc chúng ta truyền tham số vào trong nó không? Và một ví dụ là chúng ta có thể bỏ qua updated_at để điền vào đó giá trị thời gian hiện tại. Hãy thử xem ví dụ này:
```
$product = Product::find($id);
$product->updated_at = '2019-01-01 10:00:00';
$product->save(['timestamps' => false]);
```
Ở đây, chúng ta sẽ ghi đè giá trị của updated_at để điền vào giá trị mà chúng ta chỉ định.
## 18. Kết quả sau khi update() ?
Bạn đã bao giờ thắc mắc về kết quả trả về của hàm này?
`$result = $products->whereNull('category_id')->update(['category_id' => 2]);`
Câu trả lời là nó sẽ trả về số hàng bị ảnh hưởng
## 19. Chuyển dấu ngoặc vuông thành truy vấn Eloquent
Điều gì sẽ xảy ra nếu bạn viết một câu truy vấn như sau:
`... WHERE (gender = 'Male' and age >= 18) or (gender = 'Female' and age >= 65)`
Và muốn chuyển đổi nó về cách viết của Eloquent:
```
$q->where('gender', 'Male');
$q->orWhere('age', '>=', 18);
$q->where('gender', 'Female');
$q->orWhere('age', '>=', 65);
```
Thực tế đó là một cách sai. Và chúng ta phải làm như sau: 
```
$q->where(function ($query) {
    $query->where('gender', 'Male')
        ->where('age', '>=', 18);
})->orWhere(function($query) {
    $query->where('gender', 'Female')
        ->where('age', '>=', 65); 
})
```
## 20. Thêm nhiều tham số vào orWhere()
Cuối cùng bạn có thể truyền một loạt các tham số vào hàm orWhere(). Bạn vẫn hay thường viết
```
$q->where('a', 1);
$q->orWhere('b', 2);
$q->orWhere('c', 3);
```
Nhưng hãy thử viết thế này đi, xem kết quả ra sao nhé:
```
$q->where('a', 1);
$q->orWhere(['b' => 2, 'c' => 3]);
```