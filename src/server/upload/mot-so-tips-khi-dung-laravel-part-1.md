### 1. Show database query in raw SQL format.

Đôi khi bạn có thể muốn xem một số truy vấn cơ sở dữ liệu ở định dạng raw SQL để tối ưu hóa hiệu suất của ứng dụng của bạn hoặc đơn giản cho mục đích gỡ lỗi. Có nhiều cách để đạt được điều này. Tùy chọn đầu tiên là sử dụng tính năng query logging.
```
    DB::enableQueryLog(); // Bật tính năng query logging
    DB::table('users')->get(); // Chạy truy vấn bạn muốn ghi log
    Log::debug(DB::getQueryLog()); // Xuất định dạng row sql tới application log của bạn
```
    
Cách khác liên quan đến việc sử dụng hàm toSql của Query Builder's để echo raw SQL ra màn hình:
    
```
echo DB::table('users')->toSql(); // prints "select * from users"
```
    
Một vài hàm sử dụng với Eloquent ORM:
```
echo User::get()->toSql(); // prints "select * from `users`"
```
    
### 2. Making your code more readable using Eloquent query scopes.
Thông thường, khi sử dụng Eloquent ORM trong các ứng dụng Laravel của chúng ta, chúng ta cần các điều kiện nhất định khi làm việc với dữ liệu. Ví dụ: hãy xem xét truy vấn này:
```
$active_administrators = User::where('active', '=', 1)->where('is_admin', '=', 1)->get();
```
Chúng ta có thể dễ dàng sử dụng các điều kiện này ở nhiều vị trí trong suốt ứng dụng của chúng ta. Để làm cho code của chúng ta dễ đọc hơn và không bị lặp lại, chúng ta có thể sử dụng query scopes. Trong ví dụ này, chúng ta sẽ tạo các function sau trong model User.
```
public function scopeActive($query)
{
    return $query->where('active', '=', 1);
}

public function scopeAdmin($query)
{
    return $query->where('is_admin', '=', 1);
}
```
Bây giờ, truy vấn ban đầu của chúng ta sẽ trông như thế này:
```
$active_administrators = User::active()->admin()->get();
```
### 3. Set model column value automatically on create
Có một số tình huống mà bạn muốn tự động đặt một cột nhất định khi tạo bản ghi mới. Để đạt được điều này, bạn có thể sử dụng model's creating event bên trong phương thức boot của model. Trong ví dụ này, chúng ta đặt giá trị của cột paid là 0 (false) trên model Invoice cho mỗi bản ghi mà chúng ta tạo:
```
class Invoice extends Model {
    protected static function boot()
    {
        parent::boot();

        Invoice::creating(function($model) {
            $model->paid = 0;
        });
    }
}
```
### 4. Deleting related records automatically
Trong quá trình thiết kế cơ sở dữ liệu ứng dụng, điển hình như việc tạo các bảng liên quan. Khi xóa các bản ghi mẹ, nó cũng là thông lệ tiêu chuẩn và một nguyên tắc thiết kế cơ sở dữ liệu tốt để xóa các bản ghi liên quan đến con. Để đạt được điều này trong Laravel, chúng ta có thể sử dụng model's deleting event bên trong phương thức boot của model. Ví dụ: để xóa tất cả các mục của một hóa đơn:
```
class Invoice extends Model
{
    public function items()
    {
        return $this->hasMany('\App\Models\Item');
    }

    public static function boot() {
        parent::boot();

        static::deleting(function($invoice) {
             foreach ($invoice->items as $item) {
                 $item->delete();
             }
        });
    }
}
```
### 5. Avoid errors by using the optional helper
Thông thường, khi truy cập các object values, nếu object đó là null, code của bạn sẽ xuất hiện lỗi. Ví dụ:
```
return $invoice->total;
```
Sẽ phát sinh lỗi nếu object invoice là empty. Một cách đơn giản để tránh lỗi là sử dụng Laravel helper:
```
return optional($invoice)->total;
```
Bây giờ, nếu object $invoice là null, code của bạn sẽ trả về null thay vì phát sinh lỗi. Bạn cũng có thể sử dụng closure với tùy chon helper. Nó nhận được closure vì đó là đối số thứ hai và nó sẽ được gọi nếu đối số đầu tiên không null.
```
return optional(Invoice::find($id), function ($invoice) {
    return $invoice->total;
});
```
### 6. Update or create
Trong khi làm việc với databases, thông thường sẽ kiểm tra xem một bản ghi nhất định có tồn tại hay không và cập nhật nó cho phù hợp, hoặc tạo một bản ghi mới. Kiểu như thế này:
```
$invoice = Invoice::where('active', 1)
    ->where('client', 'My client')
	->where('price', 49)
    ->first();

if ($invoice) {
    $invoice->update(['price' => 29]);
}
```
Thay vào đó, bạn có thể sử dụng method updateOrCreate của Eloquent's:
```
$invoice = Invoice::updateOrCreate(
    ['active' => '1', 'client' => 'My client'],
    ['price' => 29]
);
```
### 7. Hide columns in a query result
Khi truy vấn dữ liệu với Eloquent, đôi khi bạn có thể muốn ẩn một số cột nhất định. Có một số cách để đạt được điều này nhưng cách nhanh nhất là sử dụng hàm makeHidden:
```
$tickets = Ticket::all()->makeHidden(['created_at', 'updated_at']);
```

Source:  https://laravelbit.com