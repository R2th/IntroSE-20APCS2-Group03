Khi mới bắt đầu code với Laravel, mình cảm thấy có rất nhiều thứ có thể thực hiện tốt hơn khi sử dụng với Model.Sau  một thời gian code với Laravel Model và tìm hiểu thì mình thấy một số điều thú vị mà bạn có thể sử dụng Model một cách dễ dàng.

Trong bài viết này mình sẽ cung cấp cho các bạn 7 lời khuyên mà mọi người sử dụng Laravel nên biết để tận dụng tối đa Model.

**1: Cách tạo Model bằng command**

Khi tạo một Model thông qua command, bạn có thể chỉ định thư mục Model sẽ được tạo. Việc của bạn cần làm là nhập tên thư mục lưu Model ở phía trước tên của Model. Điều này thực sự hữu ích khi bạn muốn lưu Model ở thư mục riêng thay vì mặc định lưu ở thư mục `app`

`php artisan make:model Models/Product`

**2: Casting attributes**

Thuộc tính `$casts` cung cấp một phương thức convert attributes thành các kiểu dữ liệu khác nhau khá tiện lợi. Thuộc tính $casts là một mảng có key là tên của attribute được cast, còn giá trị là kiểu dữ liệu bạn muốn cast. Các kiểu dữ liệu để cast được hỗ trợ bao gồm: `integer`, `real`, `float`,  `double`, `string`, `boolean`, `object`, `array`, `collection`, `date`, `datetime`, và `timestamp`.

Ví dụ, hãy cast attribute `is_admin` được lưu trong database là integer (`0` hoặc `1`) thành giá trị `boolean`:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be casted to native types.
     *
     * @var  array
     */
    protected $casts = [
        'is_admin' => 'boolean',
    ];
}
```

Bây giờ, attribute `is_admin` sẽ luôn luôn được cast thành `boolean` khi bạn truy cập nó, thậm chí nếu giá trị nó được lưu trong database là kiểu `integer`:

```php
$user = App\User::find(1);

if ($user->is_admin) {
    //
}
```


**3: Visibility**

Sẽ có lúc bạn muốn giới hạn attributes như `password` không được hiển thị trong kết quả array hay JSON sau khi convert. Để làm được điều đó, thêm vào thuộc tính `$hidden` vào trong model:
Để khai báo một accessor, tạo một hàm getFooAttribute trong model với Foo là tên của cột bạn muốn truy cập sử dụng kiểu "camel". Ở ví dụ này, chúng ta sẽ khai báo một accessor cho  first_name. Accessor sẽ tự động được gọi bởi Eloquent khi lấy giá trị của  first_name attribute:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var  array
     */
    protected $hidden = ['password'];
}
```

Một cách khác, bạn có thể sử dụng thuộc tính `visible` để định nghĩa một white-list của những thuộc tính đó được bao gồm trong mảng của model và JSON representation. Tất cả các thuộc tính khác sẽ bị hidden khi model được convert thành mảng hoặc JSON:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var  array
     */
    protected $visible = ['first_name', 'last_name'];
}
```

Điều này hoạt động giống như các thuộc tính `$fillable` và `$guarded`

**4: Accessors**

Để khai báo một accessor, tạo một hàm `getFooAttribute` trong model với `Foo` là tên của cột bạn muốn truy cập sử dụng kiểu "camel". Ở ví dụ này, chúng ta sẽ khai báo một accessor cho  `first_name`. Accessor sẽ tự động được gọi bởi Eloquent khi lấy giá trị của  `first_name` attribute:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Get the user's first name.
     *
     * @param    string  $value
     * @return  string
     */
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
}
```

Như bạn thấy, giá trị gốc của column được truyền vào accessor, cho phép bạn thay đổi và trả về giá trị. Để lấy gía trị này, chỉ cần truyền vào tên attribute là  `first_name` trong model instance:

```php
$user = App\User::find(1);

$firstName = $user->first_name;
```

**5: Mutator**

Để khai báo một `mutator`, khai báo một hàm `setFooAttribute` trong model `Foo` là tên của cột theo "studly". Vì vậy, lần nữa, định nghĩa một `mutator` cho thuộc tính `first_name`. Mutator sẽ được tự động gọi khi chúng ta set giá trị của thuộc tính `first_name` trong model:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Set the user's first name.
     *
     * @param    string  $value
     * @return  void
     */
    public function setFirstNameAttribute($value)
    {
        $this->attributes['first_name'] = strtolower($value);
    }
}
```

Mutator sẽ nhận giá trị được gán vào, cho phép bạn thay đổi tuỳ ý trong thuộc tính $attributes của Eloquent model. Ví dụ, chúng ta có thể gán giá trị thuộc tính `first_name` cho `Sally`:

```php
$user = App\User::find(1);

$user->first_name = 'Sally';
```

**6: Appending values**

Thỉnh thoảng, khi casting models thành array hoặc JSON, bạn cũng có thể thêm vào thuộc tính mà không có trường lưu trong database. Để làm thế, đầu tiện cần phải khai báo một `accessor`:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Get the administrator flag for the user.
     *
     * @return  bool
     */
    public function getIsAdminAttribute()
    {
        return $this->attributes['admin'] == 'yes';
    }
}
```

Khi đã tạo được accessor, thêm vào tên của attribute vào thuộc tính `appends` trong model. Chú ý là tên của attribute là theo kiểu "snake case", mặc dù accessor được xác định bằng kiểu "camel case":

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The accessors to append to the model's array form.
     *
     * @var  array
     */
    protected $appends = ['is_admin'];
}
```

Khi mà attribute được thêm vào trong danh sách `appends`, nó sẽ được thêm vào khi convert thành thành array hay JSON. Attribute trong mảng `appends` cũng sẽ tuần tự theo cấu hình `visible` và  `hidden` trong model.

**7: Touches**

Khi một Model có quan hệ beLongsTo hoặc beLongsToMany với một Model khác, ví dụ một Comment thuộc về một Blog, trường hợp này rất hữu ích khi cập nhật `timestap` của cha khi con được cập nhật.Điều này có thể thực hiện bằng cách thêm vào mối quan hệ thuộc tính `$touches`:

```php
class Comment extends Model
{
    protected $touches = ['blog'];

    public function blog()
    {
        return $this->belongsTo(App\Blog::class);
    }
}
```

Khi Model Comment được cập nhật thì sẽ tự động cập nhật thuộc tính `update_at` của Blog

**Tổng kết**

Trên đây là 7 điều mà mình muốn chia sẻ với các bạn để tận dụng tối đa khi làm việc với Model

**Nguồn tham khảo**

[Medium](https://itnext.io/7-things-you-need-to-know-to-get-the-most-out-of-your-laravel-model-4f915acbb47c)

[Laravel Mutators](https://laravel.com/docs/5.8/eloquent-mutators)

[Laravel Serialization](https://laravel.com/docs/5.8/eloquent-serialization)