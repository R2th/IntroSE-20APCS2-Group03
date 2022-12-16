Với tất cả các tính năng có sẵn trong Laravel, thật khó để biết tất cả. Một số tính năng thậm chí không được ghi lại đúng cách. Trong bài viết này mình sẽ cung cấp cho bạn 10 tính năng Eloquent mà bạn có thể không biết.

**1: Custom timestamp column names**

Mặc định, khi tạo migration cho các Model thì có các dấu thời gian là  `created_at`  và  `updated_at`. Bạn có thể ghi đè tên các cột này bằng cách xác định 1 biến không đổi trong Model mà bạn muốn ghi đè. Nếu Model sử dụng soft deletes bạn cũng có thể ghi đè cột  `deleted_at`.

```php
class User extends Model
{
    const CREATED_AT = 'created';
    const UPDATED_AT = 'last_update';
    const DELETED_AT = 'removed';
}

```

**2: The exists property**

Nó cho biết đối tượng có tồn tại trong database hay không.Khi bạn tạo mới một model instance thì thuộc tính exists sẽ set là  `false` , khi model của bạn được lưu hoặc truy xuất từ database thì thuộc tính exists được set thành  `true`

```php
$user = new User;
$user->name = 'George';
$user->email = 'george@example.com';
$user->password = 'secret';
$user->exists; // false
$user->save();
$user->exists; // true
```

**3: Dirty**

Đôi khi bạn muốn kiểm tra sự thay đổi giá trị của các attributes của một object model, hoặc kiểm tra giá trị của chúng trước khi thay đổi,bạn có thể sử dụng phương thức  `isDirty()`

* Ví dụ, bạn có 1 user như sau:

```php
{
    name: "Quy",
     email: "quy@example.org",
     updated_at: "2019-06-13 10:38:29",
     created_at: "2019-06-13 10:38:29",
     id: 1,
}
```

* Kiểm tra xem có giá trị có bị thay đổi so với database ko?

```php
>>> $user->name = 'Laravel'
=> "Laravel"
>>> $user->isDirty(); //Object có bị thay đổi ko?
=> true
>>> $user->isDirty('name'); //Kiểm tra attributes có bị thay đổi không?
=> true
>>> $user->isDirty('email');
=> false
>>> $user->isDirty(['email', 'name']); // isDirty() có thể nhận một array các attributes, chỉ cẩn có 1 attributes thay đổi thì kết quả cũng là true.
=> true
```

**4: Original**

Sau khi thay đổi bản ghi Eloquent, bạn có thể lấy được các attribute gốc ban đầu bằng cách gọi  `getOriginal()`

```php
$user = User::first();
$user->name = 'James';

$user->getOriginal(); // Array with "name" => "George"
$user->getOriginal('name'); // "George"
```

**5: Cloning a model**

Bạn có thể clone một model bằng cách sử dụng replicate(). Nó sẽ tạo một bản sao của model thành một instance mới và chưa tồn tại.

```php
$user = User::first();
$clonedUser = $user->replicate();
```

**6: Convert a model or collection to array**

Phương thức  `toArray()` có thể chuyển đổi 1 model hoặc collection thành mảng

```php
// Chuyển đổi 1 model instance thành mảng
$user = User::first();
$user->toArray();

// Chuyển đổi 1 collection thành mảng
$users = User::all();
$users->toArray();
```

**7: Refresh**

Phương thức `refresh()` sẽ làm mới model bằng cách lấy dữ liệu từ database, tất cả các relationships của nó cũng được làm mới.

```php
$user= User::where('name', 'George')->first();
$user->name= 'James';
$user->address->city = "New York";
$user->refresh();
$user->name; // "George"
$user->address->city; // "Washington"
```
**8: Without events**

Đôi khi bạn muốn tạo hoặc cập nhật 1 model mà không dùng bất kỳ event nào.Trong Laravel có thể thực hiện bằng cách sau

```php
$user = User::withoutEvents(function () {
    return factory(User::class)->create(); 
});
```

**9: Push**

Đôi khi bạn muốn lưu không chỉ nó, mà toàn bọ những gì liên quan tới nó thì bạn sử dụng phương thức `push()`

```php
$user = User::where('name', 'George')->first();
$user->age = 42;
$user->address->city = "New York"; 
```

Nếu bạn gọi phương thức `save()` trên `user` thì `address` sẽ không được lưu

```php
$user->save();
```

Bằng cách sử dụng `push()` thì cả `user` và `address` sẽ được lưu

```php
$user->push();
```

**10: Force a delete on a soft delete model**

Bạn có thể cần thực xoá một model khỏi database. Để xoá vĩnh viễn một soft delete model, hãy sử dụng hàm `forceDelete()`

```php
$user = User::first();
$user->forceDelete();
```

**Nguồn tham khảo**

https://medium.com/swlh/10-eloquent-features-that-you-might-not-know-about-75d8221d4adc