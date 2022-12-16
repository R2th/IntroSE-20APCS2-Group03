Trong bất kỳ ngôn ngữ nào, kể cả Laravel thật khó để có thể biết được tất cả các tính năng. Trong bài viết này mình xin giới thiệu với mọi người 10 tính năng Eloquent mà có thể bạn chưa biết.

## **1. Tùy chỉnh tên cột timestamp**

Theo mặc định, các model Laravel có dấu thời gian `created_at` và `updated_at`. Bạn có thể ghi đè các tên cột này bằng cách định nghĩa một biến constant trong model của bạn. Nếu mô hình của bạn sử dụng xóa mềm, bạn có thể ghi đè luôn tên cột `deleted_at`.
lớp Người dùng mở rộng Mô hình 
```php
class User extends Model
{
    const CREATED_AT = 'created';
    const UPDATED_AT = 'last_update';
    const DELETED_AT = 'removed';
}
```

## **2. Exists property**

Thuộc tính `exists` cho biết đối tượng có tồn tại trong cơ sở dữ liệu hay không. Khi bạn tạo một model mới, thuộc tính `exists` sẽ được đặt thành `false`. Khi model của bạn được lưu hoặc truy xuất từ `cơ sở dữ liệu`, thuộc tính `exists` sẽ được đặt thành `true`.
```php
$user = new User;
$user->name = 'NhiTT';
$user->email = 'nhitt@example.com';
$user->password = 'secret';
$user->exists; // false
$user->save();
$user->exists; // true
```

## **3. Dirty**

Để kiểm tra xem một model đã được chỉnh sửa hay chưa khi nó được lấy từ cơ sở dữ liệu, bạn có thể sử dụng phương thức `isDirty`. Thật tốt khi biết rằng khi một model không được lưu, tất cả `isDirty` phương thức sẽ trả về `true`. Phương thức này có một tham số tùy chọn giúp nó có thể kiểm tra xem một thuộc tính cụ thể có `dirty` hay không.

Bạn có thể sử dụng phương thức `getDirty` để có được một mảng của tất cả các động cơ dirty trên model instance.
```php
$user = User::first();
$user->isDirty(); // false
$user->name = 'NhiTT';
$user->isDirty(); // true
$user->isDirty('email'); // false
$user->isDirty('name'); // true
$user->getDirty(); // ["name" => "NhiTT"]
```


## **4. Original**

Để lấy các giá trị thuộc tính original của một model có thể được thực hiện bằng cách sử dụng phương thức `getOriginal`. Phương thức này có một tham số tùy chọn giúp nó có thể nhận được giá trị ban đầu của một thuộc tính cụ thể.
```php
$user = User::first();
$user->name = 'NhiTT';

$user->getOriginal(); // Array with "name" => "NhiTT"
$user->getOriginal('name'); // "NhiTT"
```


## **5. Clone một model**

Nó có thể được thực hiện bằng cách gọi phương thức `replicate` thể hiện trên mô hình của bạn.
```php
$user = User::first();
$clonedUser = $user->replicate();
```


## **6. Chuyển đổi một model hoặc collection thành mảng**

`toArray` có thể chuyển đổi một model hoặc collection thành một mảng PHP đơn giản.
```php
// Convert a model instance to an array
$user = User::first();
$user->toArray();
// Convert a collection to an array
$users = User::all();
$users->toArray();
```

## **7. Refresh**

Phương thức `refresh` sẽ làm mới mô hình bằng cách lấy dữ liệu mới từ cơ sở dữ liệu. Tất cả các mối quan hệ được tải của nó sẽ được làm mới.
```php
$user= User::where('name', 'NhiTT')->first();
$user->name= 'NhiTT';
$user->address->city = "Ha Noi";
$user->refresh();
$user->name; // "NhiTT2"
$user->address->city; // "Thanh Hoa"
```

## **8. Without events**

Đôi khi bạn muốn tạo hoặc cập nhật một model mà không bắn bất kỳ sự kiện nào. Trong Laravel có thể thực hiện một cuộc gọi lại mà không cần thực hiện bất kỳ sự kiện model nào cho bất kỳ loại model nào.
```php
$user = User::withoutEvents(function () {
    return factory(User::class)->create(); 
});
```


## **9. Push**

Phương pháp `push` lưu mô hình và tất cả các mối quan hệ của nó.
```php
$user = User::where('name', 'NhiTT')->first();
$user->age = 25;
$user->address->city = "Ha Noi"; 
```

Nếu bạn chỉ gọi phương thức lưu trên người dùng, địa chỉ sẽ không được lưu.

```php
$user->save();
```

Bằng cách sử dụng phương pháp `push` cả người dùng và địa chỉ sẽ được lưu lại.

```php
$user->push();
```

## **10. Force a delete on a soft delete model**

Trong một số tình huống bạn muốn xóa một model đã xóa mềm khỏi cơ sở dữ liệu của bạn. Điều này có thể được thực hiện bằng cách sử dụng phương thức `forceDelete`.

```php
$user = User::first();
$user->forceDelete();
```

\
Vậy trên đây là 10 tính năng mình nghĩ có thể các bạn sẽ có lúc dùng. Mình cũng tình cờ đọc được và muốn ghi lại. Còn rất nhiều tính năng mình k thể biết được hết, chúng mình cùng dần tìm hiểu nhé

source:

https://laravel.com/docs/6.x/eloquent

https://medium.com/swlh/10-eloquent-features-that-you-might-not-know-about-75d8221d4adc