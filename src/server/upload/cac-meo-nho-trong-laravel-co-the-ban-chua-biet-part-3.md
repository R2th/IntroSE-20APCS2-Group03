## 1. Form validation - Chỉ bắt lỗi đầu tiên
Mặc định, Laravel Validation sẽ trả về một mảng các chứa tất cả các lỗi (nếu có). Nếu chỉ muốn validation dừng lại ngay khi gặp lỗi đầu tiên, hãy sử dụng rule `bail`:
```php
$request->validate([
    'title' => 'bail|required|unique:posts|max:255',
    'body' => 'required',
]);
```

## 2. Hạn chế update field
Nếu bạn có một field chỉ muốn đặt giá trị một lần, không cho phép update, bạn có thể đặt hạn chế vào Model bằng cách sử dụng mẹo sau:
```php
class User extends Model
{
    public function setEmailAttribute($value)
    {
        if ($this->email) {
            return;
        }

        $this->attributes['email'] = $value;
    }
}
```

## 3. Chuẩn bị dữ liệu cho Form validation
Nếu bạn muốn sửa đổi dữ liệu input trước khi validation, có một method là `prepareForValidation` trong class `FormRequest` hỗ trợ điều này:
```php
use Illuminate\Support\Str;

protected function prepareForValidation()
{
    $this->merge([
        'slug' => Str::slug($this->title),
    ]);
}
```

## 4. So sánh ngày với Carbon
Nếu bạn có một bảng events với các trường start_date và end_date, và bạn muốn kiểm tra xem có event nào diễn ra vào ngày hôm nay không:
```php
$startOfDay = now()->startOfDay();

Event::whereDate('start_date', '>=', $startOfDay)
    ->whereDate('end_date', '<=', $startOfDay)
    ->get();
````

## 5. Nhóm theo chữ cái đầu tiên
Bạn có thể nhóm dữ liệu Eloquent theo các điều kiện tuỳ ý, đây là ví dụ nhóm theo chữ cái đầu tiên của tên người dùng.
```php
$users = User::all()->groupBy(function($item) {
    return $item->name[0];
});
```

## 6. SoftDeletes và Query Builder
Chú ý rằng SoftDeletes chỉ hoạt động với Eloquent, không hoạt động với Query Builder .
```php
// Loại trừ các bản ghi bị soft delete
$users = User::all();

// KHÔNG loại trừ các bản ghi bị soft delete
$users = DB::table('users')->get();
```