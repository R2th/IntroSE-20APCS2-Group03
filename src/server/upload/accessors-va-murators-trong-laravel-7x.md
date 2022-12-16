## Giới thiệu
Accessors và Murator cho phép bạn format(định dạng) lại các thuộc tính của Eloquent khi mà chúng ta lấy ra hoặc thêm mới dựa trên Model.  Ví dụ, khi thêm mới một user bạn muốn trước khi thêm mới thì nó sẽ tự động mã hóa giá trị của password trước khi được lưu vào cơ sở dữ liệu hay là lấy ra một cái tên trong cơ sở dữ liệu dưới dạng là in hoa thì `accessors`  và `murators` sẽ giúp chúng ta làm điều này.
Ngoài ra Eloquent cũng có thể tự động chuyển trường date thành Carbon instance hay là chuyển 1 đoạn text thành kiểu dữ liệu json.

## 1. Định nghĩa một Accessors
Nói sơ qua một chút là `accessors` sẽ giúp chúng ta định dạng dữ liệu khi chúng ta get dữ liệu từ cơ sở dữ liệu.
Giả sử chúng ta có trường `name` trong bảng `user` và muốn khi lấy dữ liệu ra nó sẽ ở dạng in hoa. Trước tiên chúng ta cần phải tạo một method để định nghĩa việc này trong model `User` dưới dạng `get` + `tên trường in hoa chữ cái đầu` + `Attribute`. Ở trường hợp này method được viết sẽ là `getNameAttribute`. 
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{

    public function getNameAttribute($value)
    {
        return strtoupper($value);
    }
}

```
Giờ thử test xem kết quả như thế nào nhé, các bạn sẽ tạo một `route` như sau:
```php
Route::get('/accessors', function() {
  $user = App\User::find(1);

  return $user->name;
});
```
giờ các bạn truy cập [localhost:8000/accessors](http://127.0.0.1:8000/accessors) và xem kết quả.

Hay thậm chí các bạn có thể tự định nghĩa một thuộc tính mới với các thuộc tính có sẵn ví dụ :
```php
public function getFullNameAttribute()
{
    return "{$this->first_name} {$this->last_name}";
}
```
cách lấy ra cũng tương tự
```php
$user->fullname;
```

## 2. Định nghĩa một murators.
Khác với `accessors` thì `murators` dùng để format dữ liệu trước khi lưu vào cơ sở dữ liệu. Để định nghĩa một `murators` gần giống với `accessors` chỉ khác là tiền tố sẽ là `set`. Ví dụ ta sẽ định dạng lại trường `name` thành không in hoa trước khi được lưu vào cơ sở dữ liệu. Vậy method ở đây sẽ là `setNameAttribute`
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtolower($value);
    }
}
```
Để test chúng ta cũng tạo một route với nội dung:
```php
Route::get('/murators', function() {
  $user = App\User::find(1);
  $user->name = "CCC";
  $user->save();
  return $user->name;
});
```
Để kiểm tra dữ liệu được lưu đúng hay không mở `php artisan tinker` lên để kiểm tra `App\User::find(1)`, chúng ta sẽ thấy giá tri của trường `name` vừa được lưu sẽ là `ccc`.

## 3. Date Murators
Mặc định thì Eloquent sẽ tự động chuyển 2 trường `created_at` và `update_at` thành Carbon instance, và nó được cung cấp rất nhiều các hàm hữu ích. Chúng ta cũng có thể thêm các thuộc tính date bằng cách sử dụng `$date` trong model
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'seen_at',
    ];
}
```
Khi một trường là kiểu `date` bạn có thể đặt giá trị cho nó là một `UNIX timestamp`, date string (Y-m-d), date-time string hoặc là một instance của Carbon, và giá trị của date sẽ tự động lưu trong database.
### Date formats
Mặc định timestamps được định dạng là `Y-m-d H:i:s`, bạn có thể custom lại định dạng này bằng cách sử dụng thuộc tính `dateFormat` trong model, thuộc tính này sẽ định dạng lại là kiểu dữ liệu date sẽ được lưu như thế nào trong database.
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $dateFormat = 'Y-m-d';
}
```
##  4. Attribute Casting
Thuộc tính `$cast` giúp chuyển đổi các thuộc tính sang các kiểu dữ liệu bình thường. Thuộc tính `$cast` thường là một array với key là tên của thuộc tính cần chuyển và value là kiểu dữ liệu mà bạn muốn chuyển. Các kiểu dữ liệu mà thuộc tính `$cast` hỗ trợ : `integer, real, float, double, decimal:<digits>, string, boolean, object, array, collection, date, datetime, and timestamp`.
Ví dụ, ta có thuộc tính `is_admin` được lưu trong database là `0` và `1` với kiểu dữ liệu `integer` nhưng bạn lại muốn sử dụng nó như kiểu dữ liệu `boolean` thì làm như sau
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $casts = [
        'is_admin' => 'boolean',
    ];
}
```
rồi chúng ta sử dụng `is_admin` như một thuộc tính có kiểu dữ liệu `boolean`
```php
$user = App\User::find(1);

if ($user->is_admin) {
    
}
```

### Custom cast
Bạn có thể định nghĩa một thuộc tính `cast` cho riêng bạn bằng cách tạo ra một lớp implements từ `CastsAttributes ` interface. Có một điểm phải chú ý là class mới được tạo ra này phải tồn tại 2 method `get` và `set` với những nhiệm vụ khách nhau. Phương thức `get` dùng để chuyển đổi dữ liệu trong database thành kiểu dữ liệu `cast` mà bạn định nghĩa, còn phương thức `set` có nhiệm vụ ngược lại để chuyển dữ liệu được chuyển đổi thành kiểu dữ liệu gốc để lưu trong database. Ví dụ chúng ta custom thuộc tính `cast` là kiểu dữ liệu json.
```php
<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class Json implements CastsAttributes
{

    public function get($model, $key, $value, $attributes)
    {
        return json_decode($value, true);
    }

    public function set($model, $key, $value, $attributes)
    {
        return json_encode($value);
    }
}
```
Rồi chúng ta sẽ sử dụng nó ở model.
```php
<?php

namespace App;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $casts = [
        'options' => Json::class,
    ];
}
```

### Array & JSON Casting
`Cast` kiểu array rất hữu dụng khi chúng ta sử dụng chúng với column được lưu dưới dạng json.
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $casts = [
        'options' => 'array',
    ];
}
```

Khi khai báo thế này thì chúng ta sẽ sử dụng và xử lý dữ liệu như với array trong PHP. Khi bạn set giá trị cho thuộc tính `options`, mảng đã cho sẽ tự động được chuyển hóa hóa trở lại thành JSON để lưu trữ:
```php
$user = App\User::find(1);

$options = $user->options;

$options['key'] = 'value';

$user->options = $options;

$user->save();
```

### Date Casting
Khi sử dụng `cast` với kiểu dữ liệu là date và datetime, chúng ta có thể định dạng lại cho kiểu dữ liệu này
```php
protected $casts = [
    'created_at' => 'datetime:Y-m-d',
];
```

### Query Time Casting
Đôi khi bạn có thể sử dụng cả `cast` trong các câu truy vấn
```php
use App\Post;
use App\User;

$users = User::select([
    'users.*',
    'last_posted_at' => Post::selectRaw('MAX(created_at)')
            ->whereColumn('user_id', 'users.id')
])->get();
```

Thuộc tính `last_posted_at` dựa trên kết quả của câu selectRaw, nó sẽ hợp lý hơn nếu chúng ta set kiểu dữ liệu cho `last_posted_at` là kiểu date, đơn giản bằng cách sử dụng phương thức `withCasts`.
```php
$users = User::select([
    'users.*',
    'last_posted_at' => Post::selectRaw('MAX(created_at)')
            ->whereColumn('user_id', 'users.id')
])->withCasts([
    'last_posted_at' => 'date'
])->get();
```

Ngoài ra bạn cũng có thể xem cách sự hữu ích khác mà thuộc tính `cast` mang lại tại [đây](https://laravel.com/docs/7.x/eloquent-mutators).