# 1.Giới Thiệu
Các bảng trong cơ sở dữ liệu thường có liên quan tới một bảng khác. Ví dụ một blog có thể có nhiều comment, hay một đơn hàng sẽ phải có thông tin liên quan của người dùng mà đã đặt nó. Eloquent giúp cho quản lý và làm việc với những quan hệ này một cách đơn giản và hỗ trợ nhiều kiểu quan hệ.

# 2. Các quan hệ 
## Một - Một 
Quan hệ một - một một quan hệ đơn giản. Ví dụ, một User model có thể liên quan với một Phone. Để định nghĩa mối quan hệ này, chúng ta tạo một phương thức phone trong model User. phương thức phone sẽ trả về kết quả của phương thức hasOne dựa trên lớp Eloquent model:
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Get the phone record associated with the user.
     */
    public function phone()
    {
        return $this->hasOne('App\Phone');
    }
}
```
Tham số đầu tiên truyền vào phương thức **hasOne** là tên của model liên quan. Một khi quan hệ đã được định nghĩa, chúng ta có thể truy xuất bản ghi liên quan bằng cách sử dụng các thuộc tính động của Eloquent. Các thuộc tính này cho phép bạn truy cập các hàm về mối quan hệ như là các thuộc tính đã được định nghĩa trong model:

```PHP
$phone = User::find(1)->phone;
```

Eloquent giả sử khóa ngoại của quan hệ dựa trên tên model. Trong trường hợp này, Phone model sẽ tự động được giả sử có một khóa ngoại tên `user_id`. Nếu bạn muốn ghi đè quy tắc này, bạn có thể truyền vào một tham số thứ 2 vào phương thức `hasOne`:

```PHP 
return $this->hasOne('App\Phone', 'foreign_key');
```
Thêm vào đó Eloquent giả sử rằng khóa ngoại có 1 giá trị tương ứng với cột id (hay khóa chính do bạn đặt) của bảng chứa khóa chính. Hay nói một cách khác, Eloquent sẽ tìm kiếm giá trị của user id trong cột user_id của bản ghi Phone. Nếu bạn muốn sử dụng một cột tên khác id, bạn sẽ phải truyền vào phương thức hasOne một tham số thứ 3 để chị định khóa chính này:

```PHP
return $this->hasOne('App\Phone', 'foreign_key', 'local_key');
```

## Một - Nhiều

Quan hệ "một - nhiều" là quan hệ mà một model có nhiều model khác. Ví dụ một bài viết có vố số các bình luận. Giống như các mối quan hệ khác trong Eloquent, quan hệ này được định nghĩa bằng một hàm trong model:

```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Get the comments for the blog post.
     */
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
```

Hãy nhớ, Eloquent sẽ tự động xác định cột khóa ngoại trên model Comment với định dạng "snake case" là tên của model chứa khóa chính + _id, trong trường hợp này khóa ngoại sẽ là post_id

Khi quan hệ đã được định nghĩa, chúng ta có thể truy cập danh sách comment bằng cách sử dụng thuộc tính comments. Hãy nhớ, Eloquent cung cấp các "thuộc tính động", chúng ta có thể truy cập các hàm quan hệ nếu như chúng được định nghĩa như thuộc tính của model:

```PHP
$comments = App\Post::find(1)->comments;

foreach ($comments as $comment) {
    //
}
```

Tất nhiên, tất cả các quan hệ cũng được dùng như query builders, bạn có thể thêm các ràng buộc khác cho những comments bằng cách gọi phương thức comments và tiếp tục thêm các điều kiện vào truy vấn:

```PHP
$comments = App\Post::find(1)->comments()->where('title', 'foo')->first();
```

Giống như phương thức hasOne, bạn cũng có thể định nghĩa khóa chính và khóa ngoại riêng cho mình bằng cách truyền tham số vào phương thức hasMany:

```PHP
return $this->hasMany('App\Comment', 'foreign_key');

return $this->hasMany('App\Comment', 'foreign_key', 'local_key');
```

## Nhiều - Nhiều

Quan hệ nhiều nhiều có hơi phức tạp hơn quan hệ hasOne và hasMany một chút. Ví dụ như là mối quan hệ của 1 user với nhiều "role" (vai trò, quyền, kiểu như admin, mod,...), khi mà các role cũng được đảm nhận bởi nhiều user. Cụ thể hơn, nhiều user có thể có cùng role "Admin". Để định nghĩa mối quan hệ này, cần đến 3 bảng: users, roles, role_user. Bảng role_user xuất phát từ tên của những bảng hay model liên quan, và bao gồm các cột user_id và role_id.

Quan hệ nhiều nhiều được định nghĩa bởi phương thức belongsToMany. Ví dụ sau sẽ định nghĩa phương thức roles trong model User:
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The roles that belong to the user.
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }
}
``` 

Khi quan hệ được định nghĩa, bạn có thể truy cập vào các role của user thông quan thuộc tính roles:

```PHP
$user = App\User::find(1);

foreach ($user->roles as $role) {
    //
}
```

Tất nhiên cũng giống như tất cả các kiểu quan hệ khác, bạn cũng có thể gọi phương thức roles và thêm vào nó các ràng buộc:

```PHP
$roles = App\User::find(1)->roles()->orderBy('name')->get();
```

Như đã nhắc đến từ trước, để xác định tên của table để join quan hệ này (ở đây là table role_user), Eloquent sẽ join 2 model tên liên quan theo thứ tự alphabetical. Tuy nhiên bạn có thể đặt tên tùy chọn bằng cách truyền vào tham số thứ 2 trong phương thức belongsToMany:

```PHP
return $this->belongsToMany('App\Role', 'role_user');
```

Để tùy chọn lựa chọn cột để join, bạn có thể truyền thêm tham số vào hàm belongsToMany với tham số thứ 3 là tên của khóa ngoại ứng với model định nghĩa quan hệ (ở đây là User) và tham số thứ 4 là tên cột của khóa ngoại ứng với model tham chiếu đến (ở đây là Role). 2 tham số user_id và role_id là 2 cột khóa ngoại của table role_user:

```PHP
return $this->belongsToMany('App\Role', 'role_user', 'user_id', 'role_id');
```

## Has Many Through

Quan hệ "has-many-through" cung cấp một thuận tiện short-cut để truy cập vào các mối quan hệ xa thông qua một mối quan hệ trung gian. Ví dụ, một Country model có thể có nhiều Post model thông qua một User model trung gian. Trong ví dụ này, bạn có thể dễ dàng lấy tất cả các blog post cho 1 country.Hãy nhìn vào các bảng cần thiết để xác định mối quan hệ này:
![alt](https://i.2kvn.com/img/vib-2021-85c12eb6-7c0d-4b75-950b-ceaf26896a56.png)

Mặc dù post không chứa cột country_id, mối quan hệ hasManyThrough cung cấp quyền truy cập vào post của country thông qua $country->posts. Để thực hiện các truy vấn này, Eloquent kiểm tra các country_id trên bảng user trung gian. Sau khi tìm ra id của user phù hợp, chúng được sử dụng để truy vấn bảng posts. Bây giờ chúng ta đã xem xét các cấu trúc bảng cho các mối quan hệ, hãy định nghĩa nó trên Country model.

```PHP
<?php 
namespace App\Models; 
use Illuminate\Database\Eloquent\Model; 
class Country extends Model
{ 
/** * Get all of the posts for the country. */ 
    public function posts() { 
        return $this->hasManyThrough(Post::class, User::class); 
    }
}
```

Đối số đầu tiên truyền cho phương thức hasManyThrough là tên của model cuối cùng chúng ta muốn truy cập, trong khi đối số thứ 2 là tên của model trung gian. Nếu bạn muốn tùy chỉnh các foreign key của relationship, bạn có thể truyền vào các đối số thứ 3 và thứ 4 của phương thức hasManyThrough. Đối số thứ 3 là foreign key của model trung gian, đối số thứ 4 là foreign key của model cuối cùng và đối số thứ 5 là local key.

```PHP
class Country extends Model
{ 
public function posts() { 
return $this->hasManyThrough( Post::class, User::class, 'country_id', 'user_id', 'id' ); 
    }
}
```

* Nguồn tham khảo: (https://laravel.com/docs/9.x/eloquent-relationships)