![](https://images.viblo.asia/91313522-1b9a-47ca-9a13-74d58f9a181f.jpg)

## 1. updateOrCreate.
- Nếu bạn cần kiểm tra xem bản ghi có tồn tại hay không, sau đó cập nhật nó hoặc tạo bản ghi mới, bạn có thể thực hiện nó trong một câu lệnh **updateOrCreate** ()
```php
//  Logic sử  lý như sau
$flight = Flight::where('title', 'departure')
    ->where('destination',  'San Diego')
    ->first();
 
if ($flight) {
    $flight->update([
        'price' => '99',
        'discounted' => '1',
    ])
} else {
    $flight = Flight::create([
        'title' => 'departure',
        'destination' => 'San Diego',
        'price' => '99',
        'discounted' => '1',
    ]);
}

// Thay vào đó ta có thể dùng updateOrCreate()
$flight = Flight::updateOrCreate(
    [
        'title' => 'departure',
        'destination' => 'San Diego',
    ],
    [
        'price' => '99',
        'discounted' => '1',
    ]
);
```
## 2. Eloquent relationships
-  Bạn có thể chỉ định orderBy () trực tiếp trên các mối quan hệ Eloquent của mình.
```php
public function products()
{
    return $this->hasMany(Product::class);
}

public function productsByName()
{
    return $this->hasMany(Product::class)->orderBy('name');
}
```
## 3. Eloquent method latest/oldest.
- Thay vì sử dụng order by created_at desc/asc thì có thể  sử dụng Eloquent method latest/oldest.
```php
// Thay vì viết
User::orderBy('created_at', 'desc')->get();

// Bạn có thể sử dụng
User::latest()->get();

// Mặc định latest() sẽ order theo created_at
// Tương tự với method oldest() cũng order by created_at asc
User::oldest()->get();

// Bạn có thể chỉ ra cụ thể order theo trường nào
// VD: Nếu bạn muốn order theo updated_at
$lastUpdateUser = User::latest('updated_at')->first();
```
## 4. Query Scopes
- Bạn có thể kết hợp và query scopes truy vấn trong Eloquent, sử dụng nhiều scope trong một truy vấn.
```php
// app/User.php model

public function scopeActive($query) {
    return $query->where('active', 1);
}

public function scopeRegisteredWithinDays($query, $days)
{
    return $query->where('created_at', '>=', now()->subDays($days));
}

// Controller
$user = User::registeredWithinDays(30)->active()->get();
```
## 5. Auth
- Nếu bạn muốn nhận được ID của người dùng đã đăng nhập.
```php 
1. {{ auth()->id() }} ;
2. {{ \Auth::user()->id }}
3. {{ auth()->user()->id }}
4. {{ \Auth::id() }}
```
## 6. Foreach loop
- Trong Blade, bên trong vòng lặp `@foreach`, với biến $loop, bạn có thể kiểm tra xem phần tử hiện tại là đầu tiên, cuối cùng hay số của nó trong iteration.
```php
@foreach ($users as $user)
    @if ($loop->first)
        This is the first iteration.
    @endif

    @if ($loop->last)
        This is the last iteration.
    @endif

    <p>This is user {{ $user->id }}</p>
@endforeach
```
- Để  foreach các phần tử trong mảng và in ra STT của các item.
```php
<table>
    <thead>
        <tr>
            <td>STT</td>
            <td>Name</td>
        </tr>
    </thead>
    <tbody>
        @foreach ($items as $index => $item)
            <tr>
                <td>{{ $index + 1}}</td> 
                <td>{{ $item }}</td>
            </tr>  
        @endforeach
    </tbody>
</table>
```
- Thay vì viết `{{ $index + 1 }}` thì có thể  dùng biến $loop như sau `{{ $loop->iteration }}`
- Biến $loop cũng chứa nhiều thuộc tính hữu ích khác.  [Đọc thêm](https://laravel.com/docs/master/blade#the-loop-variable)
## 7. Accessors & Mutators
- **Accessors**: Định nghĩa method để get dữ liệu mong muốn dựa trên các thuộc tính của model VD:
- Để  hiển thị full name thì bạn phải cộng chuỗi như sau.
```php
{{ $user->first_name . $user->last_name }}
```
- Bạn có thể định nghĩa method để sử lý việc này.
```php
/**
 * Get the user's full name.
 *
 * @return string
 */
public function getFullNameAttribute()
{
    return "{$this->first_name} {$this->last_name}";
}
```
- Để lấy ra full name thì chỉ cần gọi
```php
{{ $user->fullName }} or {{ $user->full_name }}
```
- **Mutators**: Sẽ set giá trị của model trước khi lưu vào database
```php
/**
 * Set the post's slug.
 *
 */
public function setSlugAttribute()
{
    $this->attributes['slug'] = Str::slug($this->title, '-');
}
```
## 8. Where attribute
- Bình thường chúng ta khi sử dụng where sẽ viết như sau:
```php
$use = User::where('name', 'I am Gosu')->get();
```
- Nhưng có thể viết ngắn gọn hơn.
```php
$use = User::whereName('I am Gosu')->get();
```
- Bạn có thể where bất trường trường nào tương tự như trên VD: role_id -> whereRoleId, status -> whereStatus
## 9. Soft-deletes
- Hãy cẩn thận với các thao tác soft delete và query builder. Đừng quên rằng soft delete sẽ loại trừ các mục khi bạn sử dụng Eloquent, nhưng sẽ không hoạt động nếu bạn sử dụng query builder.
```php
// Chỉ lây những user có deleted_at null 
$user = User::all();

// Sẽ lấy tât cả user
$user = DB::table('users')->get();
```
## 10. CONST
- Để làm cho code của bạn dễ đọc hơn đối với người khác, thay vì sử dụng các số được hard code cho một số giá trị, hãy đặt chúng thành các hằng số connst với tên rõ ràng.
```php
// Thay vì sử dụng các số hard coded, mọi người sẽ không hiểu role_id 1 là admin
$use = User::where('role_id', 1)->get();

// Add const in App\User.php

class User extends Authenticatable
{
    const ROLE_ADMIN = 1;
    const ROLE_USER = 2;
}

$use = User::where('role_id', User::ROLE_ADMIN)->get();
```