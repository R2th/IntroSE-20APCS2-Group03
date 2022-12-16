### Giới thiệu
Như các bạn biết, trong một database thì các tables thường có quan hệ với nhau. Ví dụ 1 bài viết(Post) thì có một hoặc nhiều bình luận(Comments), hoặc 
một đơn hàng(order) sẽ có liên quan đến người đặt hàng(User) đã đặt nó.<br>
Eloquent trong laravel sẽ giúp chúng ta quản lý và làm việc với các quan hệ giữa các tables với nhau một cách dễ dàng.<br>
Bài viết này mình sẽ giới thiệu cách sử dụng các quan hệ(Relationships) trong Laravel 8 như bên dưới.<br>
* One To One
* One To Many
* One To Many (Inverse) / Belongs To
* Has One Of Many
* Has One Through
* Has Many Through
*  Many To Many

### Create tables demo
Trước khi đi vào ví dụ cách sử dụng các quan hệ giữa các bảng, mình sẽ tạo các tables và dữ liệu demo như bên dưới.<br>
**Table Users:**<br>
![](https://images.viblo.asia/5cb5f8e2-b5a4-4aeb-aef5-f033baed0471.png)

**Table Phones:**<br>
![](https://images.viblo.asia/a27f5097-f042-4b20-8a2e-f3e6b95cdff1.png)

**Table Posts:**<br>
![](https://images.viblo.asia/d6764206-a515-483e-b743-8b6e0a72c0f7.png)

**Table Comments:**<br>
![](https://images.viblo.asia/cf246665-d5b3-42b1-89f4-06d6ecb1eb37.png)

ok, sau khi mình đã có 4 tables ứng với dữ liệu như bên trên thì bây giờ mình sẽ đi vào chi tiết cách sử dụng của các quan hệ.<br>

### 1. Cách sử dụng quan hệ One To One
One-to-one relationship là một loại cơ bản của quan hệ trong database.Ví dụ một  người dùng(User) sở hữu một cái điện thoại(Phone).<br>
Để định nghĩa quan hệ mình sẽ tạo method phone bên trong model User.  Method phone sẽ gọi  method hasOne và trả về kết quả.<br>
Method hasOne thì có sẵn trong model của bạn vì nó kế thừa từ class Model  Illuminate\Database\Eloquent\Model.<br>

**app\Models\User.php**
```PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Get the phone associated with the user.
     */
    public function phone()
    {
        return $this->hasOne(Phone::class);
    }
}
```
Đối số đầu tiên trong method hasOne là name class của model Phone .<br>
Tiếp tục hãy thêm code vào controller như bên dưới.<br>
**app\Http\Controllers\UserController**
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getPhone()
    {
        $phone = User::find(1)->phone;
        dd($phone->toArray());
    }
}
```
**Output:**
```PHP
array:5 [▼
  "id" => 1
  "user_id" => 1
  "name" => "Iphone 11 promax"
  "created_at" => "2022-01-24T16:36:49.000000Z"
  "updated_at" => "2022-01-24T16:36:49.000000Z"
]
```

Eloquent trong laravel sẽ xác định foreign key trong table Phones dựa vào quy tắc tên của model cha(model User) nối với '_id'<br>
```
Tên của model cha là : User
Suy ra foreign key trong table Phones sẽ tự động được hiểu là trường : user_id
```

Trường hợp bạn không muốn dùng trường user_id làm foreign key trong table Phones, bạn có thể thêm đối số thứ 2 vào method hasOne như dưới.<br>
```
return $this->hasOne(Phone::class, 'foreign_key');

// foreign_key là khóa ngoại bạn muốn đặt tên riêng theo ý của bạn trong table phones
```
Ngoài ra, Eloquent sẽ thực hiện so sánh giá trị id(primary key) của table Users với giá trị user_id(foreign key) của table Phones.<br>
Trường hợp bạn không muốn sử dụng trường id trong table Users làm primary key để liên kết với table phones thì bạn có thể thêm đối số thứ 3 như bên dưới<br>
```
return $this->hasOne(Phone::class, 'foreign_key', 'local_key');

//foreign_key nằm trong table Phones
//local_key nằm trong table Users(local_key là trường sẽ liên kết với table Phones)

```
**Defining The Inverse Of The Relationship**<br>
Trường hợp bạn muốn biết chiếc điện thoại(Phone) thuộc sở hữu của người dùng(User) nào thì chúng ta có thể sử dụng method belongsTo.<br>
**app\Models\Phone.php**
```PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;

    /**
     * Get the user that owns the phone.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

```
Khi gọi method user, Eloquent sẽ so sánh trường id(primary key) trong table Users với trường user_id trong table Phones xem có khớp không.<br>
Tiếp tục hãy thêm code vào controller như bên dưới.<br>
**app\Http\Controllers\PhoneController**
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Phone;

class PhoneController extends Controller
{
    public function getUser()
    {
        $user = Phone::find(1)->user;
        dd($user->toArray());
    }
}

```
**Output:**
```PHP
array:10 [▼
  "id" => 1
  "name" => "Eliezer Ondricka"
  "email" => "karson.stoltenberg@example.net"
  "email_verified_at" => "2021-12-31 09:42:50"
  "country_id" => null
  "password" => "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"
  "remember_token" => "nkRApJ9NFZ"
  "is_active" => 0
  "created_at" => "2021-12-31T09:42:50.000000Z"
  "updated_at" => "2021-12-31T09:42:50.000000Z"
]

```
Trường hợp bạn không muốn dùng trường user_id làm foreign key trong table Phones, bạn có thể thêm đối số thứ 2 vào method belongsTo như dưới.<br>
```php
/**
 * Get the user that owns the phone.
 */
public function user()
{
    return $this->belongsTo(User::class, 'foreign_key');
}

//foreign_key nằm trong table Phones

```
Trường hợp bạn không muốn sử dụng trường id trong table Users làm primary key mà muốn sử dụng trường khác để liên kết với table phones, thì bạn có thể thêm đối số thứ 3<br>
```
/**
 * Get the user that owns the phone.
 */
public function user()
{
    return $this->belongsTo(User::class, 'foreign_key', 'owner_key');
}

//foreign_key nằm trong table Phones
//owner_key trường nằm trong table Users(owner_key là trường sẽ liên kết với table Phones)

```
### 2. Cách sử dụng quan hệ One To Many
One-to-many relationship được sử dụng để xác định một thành phần là thành phần cha của một hay nhiều thành phần con.Ví dụ một bài viết (post) có nhiều bình luận(comments) cho bài viết đó.<br>
Như tất cả các Eloquent relationships khác, one-to-many relationships sẽ sử dụng một method trong Eloquent model của bạn.<br>
Tiếp theo hãy thêm code vào model bên dưới.<br>
**app\Models\Post.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * Get the comments for the blog post.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}

```
**app\Http\Controllers\PostController**
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function getComments()
    {
    	$comments = Post::find(1)->comments;
        dd($comments->toArray());
    }
}

```
**Output**
```php
array:2 [▼
  0 => array:5 [▼
    "id" => 1
    "post_id" => 1
    "content" => "Tôi muốn đăng ký khóa học PHP"
    "created_at" => "2022-01-24T17:15:27.000000Z"
    "updated_at" => null
  ]
  1 => array:5 [▼
    "id" => 2
    "post_id" => 1
    "content" => "Tôi muốn đăng ký khóa học PHP"
    "created_at" => "2022-01-24T17:15:27.000000Z"
    "updated_at" => null
  ]
]

```
Eloquent cũng sẽ tự động xác định trường foreign key phù hợp nằm trong table comments.Theo quy tắc tên của model cha(model Post) nối với "_ id".<br>
Trong ví dụ này foreign key trong bảng comments sẽ là trường post_id.<br>
Vì tất cả các mối quan hệ cũng đóng vai trò như là query builders, chúng ta cũng có thể thêm các điều kiện vào relationship vào method comments.<br>
Hãy update code như bên dưới<br>
**app\Http\Controllers\PostController**
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function getComments()
    {
    	$comments = Post::find(1)->comments
    				->where('id', 1);
        dd($comments->toArray());
    }
}

```
**Output:**
```
array:1 [▼
  0 => array:5 [▼
    "id" => 1
    "post_id" => 1
    "content" => "Tôi muốn đăng ký khóa học PHP"
    "created_at" => "2022-01-24T17:15:27.000000Z"
    "updated_at" => null
  ]
]
```
Giống như method hasOne, bạn cũng có thể ghi đè các foreign keys và local keys bằng cách truyền các đối số vào method hasMany:<br>
```php
return $this->hasMany(Comment::class, 'foreign_key');

return $this->hasMany(Comment::class, 'foreign_key', 'local_key');
```
### 3.One To Many (Inverse) / Belongs To
Trường hợp từ một comment mà muốn truy cập đến parent post thì hãy định nghĩa method như bên dưới trong child model.<br>
**app\Models\Comment.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    /**
     * Get the post that owns the comment.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}

```
**app\Http\Controllers\CommentController**
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function getPost()
    {
		$comment = Comment::find(2);
		dd($comment->post->title);
    }
}

```
Trường hợp foreign_key trong quan hệ không tuân theo conventions thì bạn có thể thay thế bằng một custom foreign key name vào đối số thứ 2 trong method belongsTo <br>
```
/**
 * Get the post that owns the comment.
 */
public function post()
{
    return $this->belongsTo(Post::class, 'foreign_key');
}
```
Nếu parent model không sử dụng id làm primary key hoặc bạn muốn sử dụng một trường khác để làm quan hệ thay cho khóa chính thì hãy thêm đối số thứ 3 vào method belongsTo<br>
```
/**
 * Get the post that owns the comment.
 */
public function post()
{
    return $this->belongsTo(Post::class, 'foreign_key', 'owner_key');
}
```
### 4.Has One Of Many
Một bảng có thể có nhiều quan hệ với những bảng khác.Thỉnh thoảng chúng ta muốn lấy bản ghi mới nhất hoặc cũ nhất của bảng liên quan.<br>
Ví dụ một user có nhiều posts nhưng bạn lại chỉ muốn lấy post mới nhất hoặc post cũ nhất thì bạn có thể thêm vào model user method như bên dưới.<br>
**app\Models\User.php**<br>
**Lấy bản ghi mới nhất của bảng posts**
```
/**
 * Get the user's most recent Post.
 */
public function latestPost()
{
    return $this->hasOne(Post::class)->latestOfMany();
}
```
**Lấy bản ghi cũ nhất của bảng posts**
```
/**
 * Get the user's oldest Post.
 */
public function oldestPost()
{
    return $this->hasOne(Post::class)->oldestOfMany();
}
```
**Lấy bản ghi của bảng posts với điều kiện**
```
/**
 * Get the user's largest Post.
 */
public function largestPost()
{
    return $this->hasOne(Post::class)->ofMany('price', 'max');
}
```

### 5.Has One Through
Mối quan hệ "has-one-through" xác định mối quan hệ 1-1 với một model khác.<br>
Ví dụ một Mechanic(thợ sửa xe) sửa một chiếc Car(oto) và mỗi Car sẽ thuộc một Owner(chủ chiếc oto đó)<br>
Trong khi Mechanic và Owner lại không có quan hệ trong database nhưng Mechanic có thể truy cập Owner thông qua model Car.<br>
Chúng ta có thể tóm tắt cấu trúc bảng của mối quan hệ như dưới đây.<br>
```
mechanics
    id - integer
    name - string
 
cars
    id - integer
    model - string
    mechanic_id - integer
 
owners
    id - integer
    name - string
    car_id - integer
```
Bây giờ chúng ta đã kiểm tra cấu trúc bảng cho mối quan hệ, hãy xác định mối quan hệ trên model Mechanic:
```PHP
<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Mechanic extends Model
{
    /**
     * Get the car's owner.
     */
    public function carOwner()
    {
        return $this->hasOneThrough(Owner::class, Car::class);
    }
}
```
Đối số đầu tiên được truyền cho phương thức hasOneThrough là tên của model mà chúng ta muốn truy cập, trong khi đối số thứ hai là tên của model trung gian<br>
### 6.Has Many Through
Mối quan hệ "has-many-through" cung cấp một cách thuận tiện để truy cập các quan hệ thông qua một quan hệ trung gian.<br>
Ví dụ một model Project có thể truy cập nhiều model Deployment thông qua một model Environment trung gian.<br>
Chúng ta có thể tóm tắt cấu trúc bảng của mối quan hệ như dưới đây.<br>
```
projects
    id - integer
    name - string
 
environments
    id - integer
    project_id - integer
    name - string
 
deployments
    id - integer
    environment_id - integer
    commit_hash - string
```
Bây giờ chúng ta đã kiểm tra cấu trúc bảng cho mối quan hệ, hãy xác định mối quan hệ trên Project model:
```PHP
<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Project extends Model
{
    /**
     * Get all of the deployments for the project.
     */
    public function deployments()
    {
        return $this->hasManyThrough(Deployment::class, Environment::class);
    }
}

```
Đối số đầu tiên được truyền cho method hasManyThrough là tên của model mà chúng ta muốn truy cập, trong khi đối số thứ hai là tên của model trung gian.<br>
### 7.Many To Many
Many-to-many là quan hệ phức tạp hơn quan hệ hasOne và hasMany và chúng ta phải có 1 bảng trung gian để liên kết giữa 2 tables.<br>
ví dụ của quan hệ many-to-many là một user có nhiều quyền(roles) và quyền đó có thể được gán cho nhiều users khác.<br>
Để định nghĩa quan hệ này chúng ta cần có 3 tables: users, roles, và role_user. <br>
role_user sẽ được hiểu là table trung gian và tên table trung gian được nối với nhau theo thứ tự bảng chữ cái ABC của tên 2 model role, user.<br>
Chúng ta có thể tóm tắt cấu trúc bảng của mối quan hệ như dưới đây.<br>
```
users
    id - integer
    name - string

roles
    id - integer
    name - string

role_user
    user_id - integer
    role_id - integer
```
**Model Structure**<br>
Mình sẽ dùng method belongsToMany để định nghĩa quan hệ nhé
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The roles that belong to the user.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
```
Lấy roles của user trong controller.<br>
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getRoles()
    {
        $roles = User::find(1)->roles;
        dd($roles);
    }
}
```
Thêm điều kiện khi truy vấn dữ liệu.<br>
```
$roles = User::find(1)->roles()->orderBy('name')->get();
```

Trường hợp bạn không muốn sử dụng tên table trung gian theo quy ước thì bạn có thể thêm đối số thứ 2 vào phương thức belongsToMany.
```
return $this->belongsToMany(Role::class, 'role_user');
```

Bạn cũng có thể customize 2 khóa ngoại tương ứng trong bảng trung gian bằng cách truyền đối số thứ 3, 4 vào method belongsToMany
```
return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
```
**Defining The Inverse Of The Relationship**<br>
Trường hợp bạn muốn lấy thông tin users từ role thì bạn phải định nghĩa một method như bên dưới cái sẽ trả về kết quả trong method belongsToMany.<br>
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * The users that belong to the role.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
```

Hy vọng bài viết hữu ích cho các bạn!