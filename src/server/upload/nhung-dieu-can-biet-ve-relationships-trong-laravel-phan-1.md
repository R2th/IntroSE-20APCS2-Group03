Hello mn, cũng lâu rồi mình không "đụng chạm" tới phần này nên bài viết này mình sẽ vừa ôn lại vừa giới thiệu cho các bạn những thứ mình biết về relationships. Chắc các bạn cũng biết rằng mỗi một PHP Framework có một cách tạo relationships model khác nhau, tuy nhiên *''background''* của nó đều chỉ là những câu lệnh SQL mà thôi, tương tự với Laravel Framework. Thông qua việc define các relationships trong model, chúng ta có thể thực hiện các truy vấn dữ liệu mà không cần viết các câu SQL, điều này khiến cho việc thao tác với database trở nên dễ dàng và dễ hiểu hơn rất nhiều.

## Các loại relationships 

Trong 1 cơ sở dữ liệu quan hệ  thì các table sẽ liên kết với nhau thông qua quan hệ :
- One to One
- One to Many
- Many to Many
- Has Many Through
- Polymorphic Relations
- Many To Many Polymorphic Relations

## Định nghĩa

Eloquent Relationships được define là các function bên trong Eloquent Model Class. Giống như các Eloquent Model, các relationships cũng hỗ trợ các query builder mạnh mẽ và cung cấp nhiều tính năng hay ho khác nữa( mình sẽ nói tới ở phần khác nhé). Bây giờ chúng ta sẽ cùng xem làm thế nào để xác định từng loại relationship và dùng trong trường hợp nào.

   ### One to One
   
   Đây là một quan hệ rất thường thấy. 
   
   Ví dụ : ta có quan hệ sau 1 người sẽ chỉ có 1 thẻ căn cước công dân.
![](https://images.viblo.asia/5dad77c9-2544-42b0-9418-1a98103ef88e.png)


  Chúng ta đặt một method **card** trong **User** model class  để xác định mối quan hệ này :
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Get the card record associated with the user.
     */
    public function phone()
    {
        return $this->hasOne(Card::class);
    }
}
```
Đối số đầu tiên truyền cho phương thức hasOne là tên của model được liên kết (nên đặt các class model trong cùng thư mục để không phải khai báo model, ở trên ta đã sử dụng **Card::class** mà không cần phải **use App\Models\Card** ). Một khi các mối quan hệ được xác định, chúng ta có thể truy xuất các bản ghi sư dụng Eloquent's dynamic properties. Dynamic properties cho phép bạn truy cập vào các relationship functions như thể nó là thuộc tính được định nghĩa trên các model:
```php
$card = User::find(1)->card;
```

Eloquent giả định các foreign key dựa theo tên model.Trong trường hợp này, Card model sẽ tự động lấy foreign key là user_id. Nếu bạn muốn đặt tên khác cho foreign key trỏ tới bảng Users ở bảng Cards, bạn có thể thêm vào đối số thứ 2 của hasOne method:
![](https://images.viblo.asia/c062086f-cf31-4eac-8777-41aea9b4e094.png)


```php
return $this->hasOne(Card::class, 'congdan_id');
```

Ngoài ra, nếu bạn muốn dùng cột tên userId làm primary key của bảng Users, bạn có thể truyền thêm 1 đối số thứ 3 trong phương thức hasOne như sau:
![](https://images.viblo.asia/0ffcb90b-d9d8-4e4a-aaec-ddef0bb86623.png)


```php
return $this->hasOne(Card::class, 'congdan_id', 'userId');  
```

Mình hay sử dụng thiết kế đầu tiên, ngắn gọn và chỉ cần nhớ tên bảng.

Tiếp tục nhé, ta vừa mới define quan hệ "1 người  có 1 thẻ căn cước công dân", bây giờ ta sẽ định nghĩa quan hệ "1 thẻ căn cước thuộc về 1 công dân " , còn gọi là Inverse của Relationship.

Trong **Card** model  ta truy cập vào **User** model thông qua method **user**. Chúng ta sử dụng phương thức nghịch đảo của hasOne là belongsTo:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    /**
     * Get the user that owns the card.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

Tương tự như trường hợp trên khi bạn muốn tự đặt tên khác cho foreign key hay cả primary key thì ta sẽ dùng như sau :
```php
public function user()
{
    return $this->belongsTo(User::class, 'congdan_id');  //đặt tên khác cho foreign key trong Cards table
}
```
hoặc
```php
public function user()
{
    return $this->belongsTo(User::class, 'congdan_id', 'userId'); //đặt tên khác cho primary key của Users table
}
```

### One To Many
Giống như tên gọi, 1 model sẽ sở hữu nhiều model khác. Quay trở lại với ví dụ kinh điển đó là 1 bài đăng trên facebook sẽ có nhiều lượt like. Giống như nhiều Eloquent relationship khác, one-to-many được xác định bằng 1 function được đặt ở model local (mình coi model local là Post):
![](https://images.viblo.asia/7cf77a0b-f699-4959-bebf-17a8bdba8d39.png)


```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Get the likes for the facebook post.
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
```
Nhớ rằng, Eloquent sẽ tự động xác định đúng cột foreign key trên Like model. Theo quy ước, Eloquent sẽ có "snake case" tên của model và hậu tố _id. Vì vậy, trong ví dụ này, Eloquent sẽ hiểu foreign key trên Like model chính là post_id.

Một khi relationship được xác định, chúng ta có thể truy cập lấy collection của Like Model bằng cách truy cập lấy likes property như sau:
```php
$likes = Post::find(1)->likes;
```
Bạn có thể rằng buộc
```php
$likes = Post::find(1)->likes()->where('something_condition')->first();
```

Giống như hasOne, bạn cũng có thể ghi đè các foreign key hay local key bằng cách thêm các đối số cho phương thức hasMany.
```php
return $this->hasMany(Like::class, 'foreign_key');

return $this->hasMany(Like::class, 'foreign_key', 'local_key');
```


Tiếp tục, ta sẽ định nghĩa Inverse của quan hệ One To Many trên là "mỗi một like thuộc về duy nhất 1 bài đăng ": 
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    /**
     * Get the post that owns the like.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
```
Bây giờ từ 1 like ta có thể lấy thông tin về post sở hữu nó thông qua "dynamic property" là post: 
```php
$like = Like::find(1);

echo $like->post;
```

Tương tự, bạn cũng có thể ghi đè các foreign key hay local key như sau :
```php
public function post()
{
    return $this->belongsTo(Post::class, 'foreign_key');
}
```
```php
public function post()
{
    return $this->belongsTo(Post::class, 'foreign_key', 'local_key');
}
```

### Many To Many

Hơi phức tạp so với hasOne và hasMany. Một ví dụ cho mối quan hệ này như là 1 user sẽ có nhiều roles và 1 role cũng sẽ thuộc về nhiều user. Để xác định relationship này, cần thiết phải có 3 bảng: users, roles và user_role. Bảng user_role sẽ chứa 2 column user_id và role_id.
![](https://images.viblo.asia/21223874-6d15-4b66-a8f7-077775dca244.png)


Quan hệ many-to-many được định nghĩa bằng cách gọi phương thức belongsToMany dựa trên Eloquent class. Ví dụ, hãy định nghĩa phương thức roles trên User model.
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

Một khi các mối quan hệ được xác định, bạn có thể truy cập vào roles bằng cách truy cập dynamic property:
```php
$user = User::find(1);
```
Giống như tất cả các relationship khác, bạn có thể gọi phương thức roles và tiếp tục cho thêm vào các query:
```php
$roles = User::find(1)->roles()->orderBy('name')->get();
```
Để xác định tên bảng của bảng tham gia vào relationship, Eloquent sẽ join 2 model liên quan theo thứ tự của bảng chữ cái. Tuy nhiên, bạn cũng có thể ghi đè quy ước này. Bạn có thể làm như vậy bằng cách thêm vào 1 đối số thứ 2 trong phương thức belongsToMany như sau:
```php
return $this->belongsToMany(Role::class, 'role_user');
```
Ngoài tùy biến trên, bạn có thể tùy biến các tên cột của các keys bằng cách truyền thêm đối số cho phương thức belongsToMany. Đối số thứ 3 là tên foreign key mà bạn đang xác định relationship, trong khi đối số thứ 4 là tên foreign key trong model mà bạn đang join đến.
```
return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
```
**Định nghĩa Inverse của quan hệ**

Để xác định các nghịch đảo của mối quan hệ many-to-many, bạn chỉ cần đặt một phương thức belongsToMany trên model của bạn. Chúng ta hay định nghĩa phương thức users trên Role model:
```php
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
**Truy xuất dữ liệu trong bảng trung gian** ( ở đây là bảng user_role):

Khi làm việc với mối quan hệ many-to-many đòi hỏi cần thêm 1 bảng trung gian. Eloquent cung cấp một số cách hữu ích để tương tác với bảng này. Ví dụ, chúng ta hãy giả định đối tượng đang sử dụng của chúng ta đã có nhiều đối tượng Role. Sau khi truy cập mối quan hệ này, chúng ta có thể truy cập vào bảng trung gian bằng cách sử dụng **pivot attribute** trên model.
```php
$user = User::find(1);

foreach ($user->roles as $role) {
    echo $role->pivot->created_at;
}
```
Chú ý rằng, mỗi Role model chúng ta nhận được tự động gán một pivot attribute. Thuộc tính này chứa 1 model đại diện cho bảng trung gian, và có thể sử dụng như bất kỳ Eloquent model nào khác. Theo mặc định, chỉ có các keys sẽ có mặt trên các pivot object. Nếu bảng pivot của bạn chứa các thuộc tính mở rộng, bạn phải xác định chúng khi xác định các mối quan hệ:
```php
return $this->belongsToMany(Role::class)->withPivot('column1', 'column2');
```
Nếu bạn muốn bảng pivot của bạn tự động có created_at và updated_at timestamps, sử dụng các phương thức Timestamps vào trong định nghĩa của mối quan hệ:
```php
return $this->belongsToMany(Role::class)->withTimestamps();
```
Ta cũng có thể lọc các mối quan hệ thông qua các cột bảng trung gian bởi belongsToMany bằng cách sử dụng phương thức wherePivot and wherePivotIn khi định nghĩa các mối quan hệ:
```php
return $this->belongsToMany(Role::class)->wherePivot('approved', 1);

return $this->belongsToMany(Role::class)->wherePivotIn('approved', [1, 2]);
```
### Has Many Through
Quan hệ "has-many-through" cung cấp một thuận tiện short-cut để truy cập vào các mối quan hệ xa thông qua một mối quan hệ trung gian. Ví dụ, một Country model có thể có nhiều Post model thông qua một User model trung gian. Trong ví dụ này, bạn có thể dễ dàng lấy tất cả các blog post cho 1 country. Hãy nhìn vào các bảng cần thiết để xác định mối quan hệ này:
![](https://images.viblo.asia/85c12eb6-7c0d-4b75-950b-ceaf26896a56.png)
Mặc dù post không chứa cột country_id, mối quan hệ hasManyThrough cung cấp quyền truy cập vào post của country thông qua $country->posts. Để thực hiện các truy vấn này, Eloquent kiểm tra các country_id trên bảng user trung gian. Sau khi tìm ra id của user phù hợp, chúng được sử dụng để truy vấn bảng posts. Bây giờ chúng ta đã xem xét các cấu trúc bảng cho các mối quan hệ, hãy định nghĩa nó trên Country model.
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /**
     * Get all of the posts for the country.
     */
    public function posts()
    {
        return $this->hasManyThrough(Post::class, User::class);
    }
}
```
Đối số đầu tiên truyền cho phương thức hasManyThrough là tên của model cuối cùng chúng ta muốn truy cập, trong khi đối số thứ 2 là tên của model trung gian. Nếu bạn muốn tùy chỉnh các foreign key của relationship, bạn có thể truyền vào các đối số thứ 3 và thứ 4 của phương thức hasManyThrough. Đối số thứ 3 là foreign key của model trung gian tới model đang đứng, đối số thứ 4 là foreign key của model cuối cùng tới model trung gian và đối số thứ 5 là local key.
```php
class Country extends Model
{
    public function posts()
    {
        return $this->hasManyThrough(
            Post::class, User::class,
            'country_id', 'user_id', 'id'
        );
    }
}
```
### Tạm kết
Ok, bài viết cũng khá dài rồi, mình sẽ để các relationship còn lại cho bài viết sau. Hy vọng bài viết sẽ giúp các bạn nắm được 1 số relationship cơ bản. Cám ơn mn đã quan tâm đến bài viết :grinning: