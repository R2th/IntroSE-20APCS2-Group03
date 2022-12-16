(Bài viết chống chỉ định với các thành phần nghiêm túc)

Chào mừng mày đã đến với bài viết: Relationship là cái quái quỷ gì vậy!!! :)

Giới thiệu qua một chút: Laravel hỗ trợ hệ quản trị cơ sở dữ liệu quan hệ, nếu mày từng dùng Laravel chắc cũng biết đi. Trong đó có Query Builder và Eloquent ORM.

Nói đơn giản dễ hiểu thì Query Builder tương tự như truy vấn SQL bình thường, còn ORM (Object Relational Mapping) tương tự, nhưng nó được "đối tượng hóa" nên có ActiveRecord đẹp, thân thiện và làm giảm tính phức tạp của cú pháp truy vấn. Tuy vậy, để có thể "đối tượng hóa" những quan hệ của một cơ sở dữ liệu thì cũng quá cmn phức tạp. Vì sao à? Vì mấy cái cú pháp đơn giản, dựng sẵn thì không phải của mày (cũng không phải của tao :)) nên muốn sử dụng thì phải học thôi. Mà đã học là phải học hết, không thể học kiểu dở dở dang dang. Vì vậy, nếu đã đọc bài này, tao hi vọng mày đọc hết bài, vậy thôi. Hẹn mày ở dòng cuối cùng nhé ;) hehe.

## 1. Giới thiệu
Trong cơ sở dữ liệu quan hệ, quan trọng nhất chính là mối quan hệ giữa các bảng. Dưới đây là những quan hệ được hỗ trợ bởi Eloquent trong Laravel:
 ```php   
    1.     One To One
    2.     One To Many
    3.     Many To Many
    4.     Has Many Through
    5.     Ponymorphic Relations
    6.     Many To Many Ponymorphic Relations
 ```
## 2. Các relationships
### 1. One To One
Ví dụ đơn giản: mối quan hệ 1 người có thể có một ngôi nhà. 

Để định nghĩa mối quan hệ này, đầu tiên, chúng ta sẽ định nghĩa một hàm `house()` trong model User:
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function house()
    {
        return $this->hasOne(House::class);
    }
}
```
Phương thức hasOne sẽ trả về record theo quan hệ 1-1 tương ứng.
Để có thể sử dụng mối quan hệ này, ta sẽ sử dụng những hàm đã định nghĩa như một thuộc tính của model:
```php
$house = User::findOrFail(1)->house;
```
Với việc truy vấn 1 đối tượng (sử dụng `find()` hoặc `findOrFail()`), ta có thể trỏ trực tiếp tới quan hệ. Tuy nhiên, nếu truy vấn nhiều bản ghi, ta nên sử dụng phương thức `with()` để truy vấn hiệu quả hơn với [Eager Loading](https://laravel.com/docs/5.5/eloquent-relationships#eager-loading):
```php
$user = House::select([*])->with(['house'])->get();
```
Như vậy, ta có thể lấy về users kèm theo house tương ứng của chúng.

Eloquent mặc định khóa ngoại cho mối quan hệ là nametable_id. Ví dụ, với hàm `house()` trong User, khóa chính là trường id của User, và khóa ngoại là trường 'user_id' của House. Nếu bạn muốn định nghĩa lại, hãy thêm tham số vào phương thức `hasOne()`:
```php
hasOne(Model::class, 'foreign_key', 'local_key');
```
trong đó, 'foreign_key' là tên khóa ngoại, và 'local_key' là tên khóa chính.
<br><br>
Tiếp theo, chúng ta sẽ định nghĩa một hàm `user()` trong model House:
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```
Phương thức `user()` sẽ trả về một bản ghi tương ứng theo quan hệ 1-1:
```php
$user = House::findOrFail(1)->user;
```
Lưu ý, tương tự như `hasOne()`, ta hoàn toàn có thể định nghĩa lại các khóa mặc định của hàm belongsTo():
```php
belongsTo(Model::class, 'foreign_key', 'other_key');
```
Nếu mày thắc mắc là rằng tại sao lại đặt `hasOne()` ở model User, và `belongsTo()` ở model House, thì lý do là, phải có người thì mới có nhà. Hay nói cách khác đây là mối quan hệ, mỗĩ người có thể có một căn nhà, và mỗi căn nhà thì thuộc về một người.
### 2.  One To Many 
Ví dụ: Một công ty có thể có rất nhiều thành viên.
Đầu tiên, ta sẽ định nghĩa bên phía công ty - model Company một hàm `members()`:
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public function members()
    {
        return $this->hasMany(User::class);
    }
}
```
Tiếp theo, bên phía model User, ta sẽ định nghĩa một hàm `company()`:
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
```
Để sử dụng mối quan hệ này, ví dụ, từ phía Company, ta có thể truy vấn bằng cách coi **member** là một thuộc tính của Company:
```php
$members = Company::find(1)->member;
```
Lưu ý, tương tự `hasOne()`, `hasMany()` cũng cho phép thay đổi tên khóa chính và khóa ngoại mặc định:
```php
hasMany(Model::class, 'foreign_key', 'local_key');
```
### 3. Many To Many
Quan hệ Many To Many, hay n-n là quan hệ tương đối phức tạp. Tao sẽ cố gắng nói đơn giản nhất có thể. Cơ mà tao cũng không chắc đâu :D

Ví dụ: Một sinh viên thì có thể đăng kí nhiều môn học, và một môn học thì có thể được đăng kí bởi nhiều sinh viên.

Theo chuẩn N3, để tránh dư thừa dữ liệu thì chúng ta cần có 3 model: User, Subject và Subject_User
>>Lưu ý: Tại sao lại là Subject_User mà không phải User_Subject? Vì theo quy tắc đặt tên của Laravel Convention (thứ tự alpha-beta), thì Subject đứng trước User :)

Để định nghĩa quan hệ này, ta cần định nghĩa hàm `users()` phía Subject và hàm `subjects()` phía User, như sau:
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }
}
```
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function users()
    {
        return $this->belongsToMany(Subject::class);
    }
}
```
Lưu ý, ta có thể định nghĩa lại tên bảng trung gian, khóa ngoại của `belongsToMany()`:
```php
belongsToMany(Model::class, 'intermediate_table', 'foreign_key_1', 'foreign_key_2')
```
Tương tự như 1-1 và 1-n, ta có thể coi subjects và users là các thuộc tính của model để thực hiện truy vấn.

**Cách lấy dữ liệu của model trung gian, ở đây là Subject_User:**

Sử dụng thuộc tính pivot:
```php
$ids = User::find(1)->pivot->id;
```
Mặc định, chỉ có các khóa của model tồn tại trong đối tượng pivot. Nếu bảng pivot có nhiều thuộc tính hơn, ta cần chỉ định chúng khi định nghĩa quan hệ bằng hàm `withPivot()`:
```php
return $this->belongsToMany(Model::class)->withPivot('column1', 'column2', ...);
```
Còn nếu muốn lọc quan hệ trả về, chúng ta sẽ sử dụng hàm `wherePivot()`, hoặc `wherePivotIn()`.
### 4. Has Many Through
Đây là một cách rất hay, giúp chúng ta tạo ra một liên kết truy vấn thuận lợi cho những mối quan hệ "xa xôi" bắn đại bác cả ngày mới tới. 
Ví dụ: Một Country có nhiều bài Post thông qua các User.
Dưới đây là mẫu về các bảng:
```php
countries
    id - integer
    name - string

users
    id - integer
    country_id - integer
    name - string

posts
    id - integer
    user_id - integer
    title - string
```
Ta có thể thấy, bảng posts không hề có country_id, và country cũng không có liên hệ trực tiếp nào với posts. Dù biết là thông qua User, một Country có thể có nhiều Posts, nhưng làm sao để có thể lấy được posts từ country? Giờ ta sẽ xây dựng một mối quan hệ Has Many Througn để giải quyết vấn đề này.
Trong Model Country:
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public function posts()
    {
        return $this->hasManyThrough(Post::class, User::class);
    }
}
```
Lưu ý, ta có thể định nghĩa lại khóa chính và khóa ngoại của các bảng trong hàm `hasManyThrougn()`. Ví dụ như:
```php
return $this->hasManyThrough(Post::class, User::class, 'country_id', 'user_id', 'id');
```
### 5. Polymorphic Relations
Đơn giản thì nó là quan hệ đa hình. Tao sẽ lấy luôn ví dụ cụ thể cho dễ hiểu nhé. Tao có 3 bảng: medias, posts và videos. Trong đó posts và videos đều có thể coi là các medias.
```php
posts
    id - integer
    title - string
    content - text

videos
    id - integer
    title - string
    url - string

medias
    id - integer
    body - text
    target_id - integer
    target_type - string
```
Để xây dựng mối quan hệ này, ta sẽ lần lượt xây dựng các model Media, Post và Video:
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    /**
     * Get all of the owning commentable models.
     */
    public function target()
    {
        return $this->morphTo();
    }
}

```
```php
class Post extends Model
{
    public function medias()
    {
        return $this->morphMany(Media::class, 'target');
    }
}
```
```php
class Video extends Model
{
    public function medias()
    {
        return $this->morphMany(Media::class, 'target');
    }
}
```
Mối quan hệ được định nghĩa sử dụng `morphOne()` hay `morphMany()` phụ thuộc quan hệ giữa các model, ở đây là 1-n.
### 6. Many To Many Polymorphic Relations
Phức tạp hơn so với Polymorphic Relations, đây là quan hệ đa hình nhiều nhiều. Ví dụ:

```php
posts
    id - integer
    name - string

videos
    id - integer
    name - string

tags
    id - integer
    name - string

taggables
    tag_id - integer
    target_id - integer
    target_type - string
```
Để xây dựng mối quan hệ này, ta cần định nghĩa:
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'target');
    }
}
```
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'target');
    }
}
```
```php
<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function posts()
    {
        return $this->morphedByMany(Post::class, 'target');
    }

    public function videos()
    {
        return $this->morphedByMany(Video::class, 'target');
    }
}
```
Trên đây là một số chia sẻ của mình về Eloquent: Relationship. Mình xưng hô như vậy vì đơn giản mình chỉ chia sẻ những gì mình biết, chứ mình không dạy ai cả. Mong là bài viết xàm xí này của mình có thể giúp ích cho các bạn. Cảm ơn vì đã đọc đến dòng cuối cùng này. 

Tài liệu tham khảo: https://laravel.com/docs/5.5/eloquent-relationships