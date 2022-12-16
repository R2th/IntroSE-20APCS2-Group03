Mặc định, các Model trong Laravel sẽ có các trường timestamps là created_at và updated_at. Hôm nay chúng ta sẽ tìm hiểu cách tùy biến và thực hiện vài thao tác thú vị với nó nhé.

## 1. Disable Timestamps
Khi bạn create/update dữ liệu thông qua Model, Laravel sẽ tự động insert/update timestamps. Đối với những DB table không có các field timestamps, bạn có thể disable chúng để tránh lỗi.
```php
class Role extends Model
{
    public $timestamps = FALSE;
}
```

## 2. Thay đổi tên column timestamps
Mặc định, các field timestamps được đặt tên là inserted_at, updated_at. Bạn có thể thay đổi chúng trong Model:
```php
class Role extends Model
{
    const CREATED_AT = 'create_time';
    const UPDATED_AT = 'update_time';
}
```

## 3. Thay đổi format timestamps
Mặc định, timestamps sẽ có format `Y-m-d H:i:s`, tuy nhiên bạn có thể thay đổi chúng theo ý thích:
```php
class User extends Model
{
    protected $dateFormat = 'U';
}
```
Bạn có thể xem thêm chi tiết tại: [Laravel documents](https://laravel.com/docs/master/eloquent-mutators#date-mutators)

## 4. Many-to-Many: Pivot Table with Timestamps
Một trường hợp ngoại lệ của timestamps là pivot table (bảng trung gian trong quan hệ n-n). Laravel không tự update timestamps vào pivot table. Nhưng chúng ta cũng có thể tùy biến để thêm timestamps bằng cách thêm ```withTimestamps()``` vào Model.
```php
class User extends Model
{
    public function roles()
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }
}
```

## 5. Sắp xếp theo timestamps với lastest() và oldest()
Thay vì viết:
```php
User::orderBy('created_at', 'desc')->get();
User::orderBy('created_at', 'asc')->get();
```
Thì bạn có thể viết ngắn gọn lại như sau:
```php
User::lastest()->get();
User::oldest()->get();
```

Trong trường hợp muốn sắp xếp theo một field khác, ví dụ ```created_at```, chúng ta làm như sau:
```php
User::lastest('created_at')->get();
```

## 6. Bỏ qua updated_at khi update Model.
Trong một số trường hợp, nếu muốn bỏ qua ```updated_at``` khi update, chúng ta làm như sau:
```php
$user = User::find(1);
$user->name = 'Example';
$user->timestamps = false;
$user->save();
```

## 7. Touch and Parent Touch
Ngược lại với mục 6, khi bạn chỉ muốn update field updated_at của Model. Thay vì viết:
```php
$user->update(['updated_at' => now()]);
```
Chúng ta có thể viết ngắn gọn như sau:
```php
$user->touch();
```

Trong trường hợp bạn muốn update cả field updated_at của các relationships, bạn có thể định nghĩa thông qua thuộc tính `$touches` trong Model.
```php
class Comment extends Model
{
    protected $touches = ['post'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
```

## 8. Timestamps tự động cast thành Carbon object
Mặc định, timestamps được cast thành `$dates`, do đó, bạn có thể gọi các phương thức Carbon trên chúng.
```
$user->created_at->diffForHumans();
```


-----

Cảm ơn các bạn đã theo dõi bài viết, hi vọng các mẹo nhỏ trên sẽ hữu ích cho bạn.

Tham khảo: https://laraveldaily.com/8-tricks-with-laravel-timestamps/