# Giới thiệu

Xin chào các bạn, hôm nay mình sẽ cùng các bạn đi tìm hiểu các thao tác với cơ sở dữ liệu trong laravel và từng bước làm chủ nó.

Thao tác với cơ sở dữ liệu là một trong những việc thường xuyên phải làm nhất, nó cũng một phần quyết định tốc độ trang web của bạn. 

Laravel cung cấp cho ta hai công cụ để làm việc với cơ sở dữ liệu: Eloquent ORM và Query Builder.
Cả hai công cụ này đều hoạt động trên các hệ thống cơ sở dữ liệu quan hệ phổ biến hiện nay như: mysql, sqlite, pgsql, sqlsrv.

Bài viết này mình sẽ đề cập đến việc sử dụng Eloquent ORM (mình hay gọi nó bằng cái tên đơn giản là Model) truy vấn đến cơ sở dữ liệu. Lúc đầu mới học laravel mình khá là lúng túng trong việc thực hiện các query SQL sử dụng model. Nó khá là rắc rối nếu bạn chưa quen sử dụng nó nhưng khi bạn đã quen với nó rồi thì mọi thứ trở nên thật dễ dàng và vi diệu.

Hôm nay mình sẽ giúp bạn (nhất là những bạn mới học laravel) sử dụng tốt hơn công cụ tuyệt vời này. Chúng ta sẽ sử dụng laravel phiên bản mới nhất hiện tại là [5.8](https://github.com/laravel/laravel/archive/v5.8.17.zip).

# Kiến thức cơ bản
## Giới thiệu model

Khi sử dụng Eloquent ORM thì mỗi bảng trong cơ sở dữ liệu của bạn đều có một "Model" tương ứng để tương tác với bảng đó. Bảng người dùng (`users`) sẽ có model tương ứng là `User`. Bảng bài viết (`posts`) sẽ tương ứng với model `Post`. Chú ý quy tắc tên bảng là số nhiều và tên Model sẽ là số ít. Từ Model bạn sẽ dễ dàng tạo truy vấn dữ liệu trong bảng hoặc chèn, cập nhật dữ liệu của bảng đó. Theo mặc định model khi tạo ra sẽ ở ngay trong thư mục `app`. Thông thường thì mình sẽ chuyển tất cả các model vào thư mục `Models` cho dễ quản lý và đỡ rối mắt.

![](https://images.viblo.asia/1f1b49c8-ce3c-415d-a292-1106f706fa23.png)

Như vậy mỗi khi tạo model mới thì mình sẽ gõ lệnh `php artisan make:model Models\\ModelName` thay vì `php artisan make:model ModelName` như trước nữa.

## Thuộc tính của model

Trong model sẽ có khá là nhiều thuộc tính. Mình cần chú ý các thuộc tính hay dùng sau:  `$table`, `$fillable`, `$hidden`, `$casts`, `$dates`, `$perPage`
Ví dụ: Model `User` sẽ có thuộc tính như thế này
```PHP
<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
```

- `$table` tên bảng. Các truy vấn sẽ được thực hiện trực tiếp vào bảng có tên khai báo ở đây. Nếu tên bảng không được khai báo thì laravel sẽ lấy tên class dưới dạng số nhiều của từ cuối và kiểu snake.

Ví dụ: Tên class là `PostCategory` thì tên bảng sẽ là `post_categories`, nếu tên bảng của bạn là từ tiếng Anh thì sẽ biến đổi đúng dạng số nhiều được nhé không phải chỉ đơn thuần là thêm `s` đằng sau đâu. Nếu bạn tạo bảng đúng với quy tắc và không... sai chính tả thì mọi thứ sẽ vẫn hoạt động bình thường nếu bạn không khai báo thuộc tính `$table`.
- `$fillable` các trường có thể gán giá trị. Tức là nếu bạn thực hiện tạo mới một bản ghi (`create`) hoặc cập nhật một bản ghi (`update`) thì mảng giá trị truyền vào sẽ được lọc chỉ lấy các dữ liệu có key thuộc mảng `$fillable`.

Ví dụ khi bạn thực hiện:
```PHP
User::create(['first_name' => 'Hoang', 'last_name' => 'Hoi', 'name' => 'Hoang Hoi', 'email' => 'hoi@gmail.com', 'password' => '12344321'])
```
Thì dữ liệu truyền vào sẽ bị loại bỏ những trường không có trong `$fillable` chỉ còn `['name' => 'Hoang Hoi', 'email' => 'hoi@gmail.com', 'password' => '12344321']`. Sau đó mới tạo câu truy vấn chèn vào bảng dữ liệu đã sửa. Nhiều người em, người bạn mình đã từng mắc phải lỗi khi thêm một cột mới vào bảng nhưng quên không cập nhật thuộc tính `$fillable` dẫn đến việc không tạo được giá trị cho trường mới thêm, mặc dù request gửi lên có giá trị.

- `$hidden` quy định các trường được ẩn đi khi biến đổi Model thành kiểu dữ liệu mảng hoặc json (laravel gọi đây là `serialization`). Như ở trong model `User` trên kia có `password` và `remember_token` trong mảng `$hidden` nên khi `$user->toArray()` chúng ta sẽ không thấy các trường này. Điều tương tự cũng xảy ra khi bạn thực hiện `toJson()`.

- `$casts` quy định kiểu dữ liệu của các trường. Giá trị của các trường sẽ được chuyển thành kiểu dữ liệu tương ứng khi bạn thao tác với nó.

Ví dụ:
```
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
```

Khi bạn gọi `$user->email_verified_at` thì kiểu dữ liệu của nó sẽ là `Carbon object`. Và khi bạn gán `$user->email_verified_at = Carbon::now()` thì lúc save lại laravel sẽ chuyển `Carbon object` này thành date time string và thực hiện lưu và database. Nếu bạn truyền vào là string `$user->email_verified_at = '1994-10-13 12:00:00'` thì khi bạn lấy ra vẫn là `Carbon object`. Thật là vi diệu phải không! Laravel hỗ trợ tất cả kiểu dữ liệu phổ biến của PHP. Nếu bạn truyền vào sai kiểu dữ liệu đã định nghĩa thì nó sẽ báo lỗi ngay. Điều này sẽ giúp bạn thao tác dễ dàng hơn và không phải lo lắng về việc dữ liệu bị sai không parse được khi gửi xuống front end.

- `$dates` quy định các trường có kiểu dữ liệu thuộc dạng date.


- `$perPage` số phần tử trong một trang khi bạn thực hiện hàm `paginate()` thay cho `get()`.

Ngoài các thuộc tính mình hay dùng ở trên thì model có 2 thuộc tính quan trọng mà bạn cần biết nữa: `$attributes` và `$original`. Đây là 2 thuộc tính chứa dữ liệu của một bản ghi (một hàng trong bảng cơ sở dữ liệu) mà model đó nắm giữ. Cùng là dữ liệu của 1 bản ghi nhưng nó sẽ khác nhau như sau:
- `$original` chứa giá trị nguyên thủy của bản ghi đó. Giá trị giống hệt với giá trị trong database. Giá trị này được lấy ra bằng hàm `getOriginal($key)`.
- `$attributes` chứa giá trị với các trường đã được thay đổi đúng kiểu dữ liệu mà bạn định nghĩa (trong `$dates` hoặc `$casts`). Giá trị này được lấy ra bằng hàm `getAttributes($key)`.

Ví dụ: trường `email_verified_at` của model `User` trên kia có khai báo `$cast` là `datetime`. Giả sử trong database có giá trị là `2019-10-13 12:00:00`. Khi gọi hàm `$user->getOriginal('email_verified_at')` sẽ nhận được giá trị là `2019-10-13 12:00:00`. Còn khi gọi hàm `$user->getAttributes('email_verified_at')` sẽ ra `Carbon` object.

## Liên kết các bảng

Vì model là mô hình của bảng nên bảng có các liên kết với nhau như thế nào thì model sẽ liên kết với nhau như vậy. Có khá nhiều mối quan hệ giữa các model: quan hệ một - một (One To One), quan hệ một - nhiều (One To Many), quan hệ nhiều - nhiều thông qua bảng trung gian (Many To Many), quan hệ một - một thông qua bảng khác (Has One Through),...

Các quan hệ này sẽ được biểu diễn bằng một hàm trong model.

Ví dụ: Một người dùng có nhiều bài viết thì sẽ được biểu diễn mối quan hệ như thế này

```
<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /* .................. */

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
```

# Sử dụng thế nào

## Truy vấn cơ sở dữ liệu

Việc cơ bản nhất và đơn giản nhất của việc dùng model là truy vấn cơ sở dữ liệu của bảng mà nó đại diện. Việc sử dụng thì khá đơn giản:

Ví dụ truy vấn lấy tất cả users có `id` > 10 
```PHP
$users = App\Models\User::where('id', '>', 10)->get();
```

Câu lệnh trông có vẻ đơn giản như vậy thôi nhưng thực tế thì nó sẽ thực hiện qua nhiều giai đoạn. Nếu bạn đã từng vào đọc code của abstract class `Illuminate\Database\Eloquent\Model` xem nó có các phương thức gì thì sẽ không tìm thấy được cái phương thức `where` kia ở đâu. Vậy thực chất `where` đó là phương thức của class nào và nó ở đâu, tại sao nó lại thực hiên được ở đây. Chúng ta cùng tìm hiểu nhé!

Đầu tiên bạn cần biết luồng hoạt động khi ta gọi một hàm trong php. Khi gọi một hàm từ bên ngoài của một object, nếu hàm đó có tồn tại với tầm nhìn là `public` thì tất nhiên hàm đó sẽ được gọi rồi. Nhưng trong trường hợp hàm đó không tồn tại dưới dạng `public` thì hàm magic `__call($method, $parameters)` sẽ được gọi thay thế. Đối với một hàm static cũng vậy sẽ có hàm `__callStatic($method, $parameters)` được gọi thay thế khi hàm không tồn tại.

Như vậy đối với câu lệnh bên trên thì php sẽ gọi hàm `__callStatic` của `User`. Tức là hàm `__callStatic` của `Model` đó. Bây giờ bạn có thể tự tin vào xem thực chất Model đã làm gì với lời gọi hàm của mình.

```PHP
    public static function __callStatic($method, $parameters)
    {
        return (new static)->$method(...$parameters);
    }
```

Hàm này cơ bản sẽ tạo một Object mới của Model và gọi hàm `$method` trong object đó. Param truyền vào thì sẽ tương tự param mình truyền từ bên ngoài. Tuy nhiên hàm `where` lại không có trong model vậy thì tiếp theo sẽ là `__call($method, $parameters)` được gọi là cái chắc rồi.

```PHP
    public function __call($method, $parameters)
    {
        if (in_array($method, ['increment', 'decrement'])) {
            return $this->$method(...$parameters);
        }

        return $this->forwardCallTo($this->newQuery(), $method, $parameters);
    }
```

Hàm này thì nhìn có vẻ rắc rối nhưng thực chất thì nó... rắc rối thật. :) :) Sẽ có 2 trường hợp: 

- Nếu tên hàm là `increment` hoặc `decrement` thì sẽ gọi hàm đó trong model. Nhưng tại sao không gọi trực tiếp ở bên ngoài được mà phải gọi thông qua hàm `__call` vậy. Bởi vì... bạn hãy kéo lên xem hàm đó. Nó là các hàm `protected` sẽ không gọi được từ bên ngoài. Thật là vi diệu phải không. Gọi hàm protected theo kiểu gọi hàm static thông qua hàng loạt các magic function (`User::increment()`). Tuy nhiên bạn có thể gọi hàm theo kiểu bình thường bên ngoài như cách gọi hàm public vậy (`$user->increment()`).
- Nếu tên hàm khác các tên bên trên thì sẽ chạy lệnh `return $this->forwardCallTo($this->newQuery(), $method, $parameters);`. Lệnh này có 2 phần: Tạo một object truy vấn mới `$this->newQuery()` và gọi hàm `$method` của truy vấn đó với tham số truyền vào là `$parameters`. Hàm `forwardCallTo` sẽ làm nhiệm vụ gọi `$method` trong object truy vấn mới được tạo ra và trả về `Exception` nếu không gọi được. Hàm `newQuery()` nếu bạn truy xuất đến cuối cùng thì nó sẽ tạo một `EloquentBuilder` mới tinh để thực hiện các truy vấn trên đó. Như vậy thì hàm `where` này chính là hàm `where` của `Illuminate\Database\Eloquen\Builder`.

Sau khi tạo một `EloquentBuilder` và thêm `where` vào thì dữ liệu nhận được sẽ là một `EloquentBuilder`. Xong hàm `get()` sẽ được thực hiện trên `EloquentBuilder` đã where đó để thực hiện câu truy vấn theo đúng như mục đích của chúng ta.

Chúng ta đã thực hiện một đống các thao tác chỉ với một câu lệnh hết sức là đơn giản như vậy thôi. Các bạn có thể tìm hiểu thêm cách hoạt động của các truy vấn phức tạp hơn để hiểu sâu hơn về Eloquent và mình sẽ không sợ nó nữa. Việc cần làm của chúng ta bây giờ là làm sao có thể sử dụng những gì đã có sẵn một cách tốt nhất.

Bạn để ý thì nếu mình gọi như câu lệnh trên kia thì sẽ tạo ra một `Model object` rồi tạo một `EloquentBuilder` từ model đó. Nếu bạn thực hiện nhiều truy vấn kiểu thế này
```PHP
$usersActived = App\Models\User::where('is_active', 1)->get();
$usersDeactived = App\Models\User::where('is_active', 0)->get();
```
Thì kết quả sẽ phải tạo 2 model `User` và mỗi một model đó sẽ tạo 1 `EloquentBuilder` rồi truy vấn trên `EloquentBuilder`. Xong việc thì 2 model đó không còn tác dụng và chẳng để làm gì nữa. Có vẻ hơi phí vì mình phải khởi tạo model những 2 lần trong khi đó mình có thể dùng 1 model tạo ra nhiều `EloquentBuilder` thông qua hàm `newQuery()`. Để tối ưu hơn một chút ta sẽ thay đoạn code trên thành:
```PHP
$userModel = new App\Models\User;

$usersActived = $userModel->newQuery()->where('is_active', 1)->get();
$usersDeactived = $userModel->newQuery()->where('is_active', 0)->get();
```

Code có vẻ ngon hơn rồi đấy. `$userModel` sẽ được sử dụng lại một cách triệt để hơn và mình vẫn giữ được nó để sử dụng cho các việc khác.

## Load các relations

Có nhiều trường hợp khi bạn truy vấn một đống dữ liệu và muốn lấy kèm theo các dữ liệu liên quan. Giả sử lấy danh sách bài viết (posts) và kèm theo các bình luận (comments) của bài viết đó chẳng hạn. Laravel thực hiện load các dữ liệu này một cách rất thông minh. Đối với bản laravel 5.8 thì sẽ có nhiều cách load được dữ liệu kèm theo:
- Sử dụng phương thức `with()` khi có một truy vấn (*Eloquent builder*)
- Sử dụng phương thức `load()` khi đã nhận được dữ liệu *Eloquent collection* hoặc *Model*

Ví dụ:
```
$postsUsingWith = Post::with('comments')->get();
$postsUsingLoad = Post::get()->load('comments');
```

Đối với 2 cách này thì tham số truyền vào như nhau và cách thức thực hiện giống nhau:
- Truyền vào danh sách **tên hàm** relation trong model hoặc là mảng tên hàm. Bạn hãy nhớ đó là tên hàm chứ không phải tên bảng, cũng không phải tên model.
- Cách thực hiện sẽ lấy toàn bộ id của posts -> thực hiện truy vấn lấy comments với điều kiện `post_id` thuộc mảng id vừa lấy ra (sử dụng điều kiện WHERE IN) -> gán các comments và relation tương ứng của từng post.

Với cách này thì bạn chỉ cần thực hiện 2 câu truy vấn thao tác với khóa chính `id` và khóa ngoại `post_id`. Nếu bạn đánh index cho khóa ngoài như bài viết [Sử dụng index để tăng tốc câu truy vấn trong mysql với laravel](https://viblo.asia/p/su-dung-index-de-tang-toc-cau-truy-van-trong-mysql-voi-laravel-aWj539VGZ6m) thì tốc độ truy vấn sẽ cực cao.

Tránh trường hợp mình chỉ lấy thông tin post mà không load comment. Khi nào dùng mới gọi như dưới đây:
```PHP
$posts = Post::get();
foreach ($posts as $post) {
    $comments = $post->comments;
    /** -- thao tác với $comments ---*/
}
```

Đối với trường hợp này thì `comments` của mỗi `$posts` sẽ được load ra mỗi khi câu lệnh `$comments = $post->comments;` được chạy. Với mỗi lần load này thì một câu truy vấn sẽ được tạo ra và thực hiện. Đoạn mã trên sẽ tạo ra `n + 1` truy vấn (n là số lượng bài posts). Như vậy thì rất tốn tài nguyên nên bạn hãy load dữ liệu trước khi dùng để tối ưu nhất nhé.

Suy nghĩ ở một khía cạnh khác tại sao mình chỉ gọi `$post->comments` mà relation `comments` được load ra. Lại một sự vi diệu không hề nhẹ ở đây.

`$post->comments` có nghĩa là mình đang cố gắng lấy một thuộc tính của `$post`. Khi thuộc tính `$comments` không tồn tại thì sẽ như kiểu *hàm* không tồn tại bên trên và sẽ gọi một hàm magic phải không? Thật sự đúng là như vậy. Hàm được gọi lần này sẽ là hàm `__get($key)`. Hãy vào hàm `__get` ở trong Model xem có gì nào.
```PHP
    public function __get($key)
    {
        return $this->getAttribute($key);
    }
```

Bùm, nó chính là việc gọi hàm `getAttribute()` của Model đó. Hàm này có kiểu là *public*, vậy thì `$post->comments` sẽ giống `$post->getAttribute($key)` rồi. Nếu bạn muốn tìm hiểu `getAttribute` xem nó có gì thì phải vào trait `Illuminate\Database\Eloquent\Concerns\HasAttributes` chứ trong Model không có đâu.
```PHP
    public function getAttribute($key)
    {
        if (! $key) {
            return;
        }
        
        if (array_key_exists($key, $this->attributes) ||
            $this->hasGetMutator($key)) {
            return $this->getAttributeValue($key);
        }

        if (method_exists(self::class, $key)) {
            return;
        }

        return $this->getRelationValue($key);
    }
```

Nhìn sơ sơ qua thì sẽ thấy:
- Nếu `$key` có tồn tại trong mảng `$this->attributes` thì sẽ lấy giá trị `attribute` có key là như thế. Thuộc tính `attributes` là một mảng chứa giá trị của một hàng (một bản ghi) của bảng mà model nắm giữ.
- Dòng `if (method_exists(self::class, $key)) {return;}` để loại bỏ các phương thức có trong class hiện tại - chính là `Illuminate\Database\Eloquent\Model` vì Model sử dụng trait này. Mục đích của việc này là không cho phép người dùng đặt tên hàm relation trùng với tên của các hàm có sẵn trong Model. Bạn chú ý không được đặt tên trùng với các hàm sẵn có nhé, sẽ không dùng được đâu.
- Trường hợp cuối cùng là sẽ lấy giá trị relation `$this->getRelationValue($key)`.
```PHP
    public function getRelationValue($key)
    {
        if ($this->relationLoaded($key)) {
            return $this->relations[$key];
        }
        
        if (method_exists($this, $key)) {
            return $this->getRelationshipFromMethod($key);
        }
    }
```
Relation đã được load thì lấy giá trị đã load và nếu chưa load thì sẽ load và trả về giá trị. Kết quả của lần load này sẽ được lưu lại để sử dụng cho lần sau. Do vậy chỉ lần đầu tiên gọi `$post->comments` thì mới tạo ra một truy vấn. Những lần tiếp theo sẽ không tạo ra một truy vấn nào nữa. Trường hợp nếu không tồn tại relation thì sẽ không thấy lệnh `return`, tức là trả về giá trị `null` đó.

Chức năng này sẽ vô cùng hữu dụng trong trường hợp chỉ thao tác với một post. Bạn sẽ không cần phải load trước dữ liệu. Khi nào muốn dùng thì gọi thôi.

## Phân biệt model, eloquent collection, collection, eloquent builder, query builder
Như ở trên mình có đề cập đến khá nhiều loại đối tượng nào là model, eloquent collection rồi đến eloquent builder, query builder. Có khá nhiều loại để phải nhớ khi thao tác truy vấn dữ liệu. Bạn cần phải thật chắc về việc phân biệt các đối tượng này. Lúc nào sẽ trả về model, lúc nào sẽ trả về eloquent collection bạn phải nắm rõ thì mới không gọi hàm nhầm được. Mới đầu mình học laravel cũng rất hay nhầm. Có một số lúc lại dùng hàm `with()` đối với model object. Vì vậy trong khi code có khi mình phải dùng `dd()` xem biến hiện tại đang là gì để thực hiện cho đúng. Mới đầu gà mờ thế thôi bây giờ thì đỡ rồi he... he... Trên thực tế để phân biệt được các loại này thì bạn cần thao tác nhiều, rèn luyện nhiều để có các kỹ năng và nhớ được hết các hàm của nó.

`Eloquent collection` sẽ extends `collection`. Nó là tập hợp nhiều `model`. `Eloquent builder` **không** extends `query builder` mà nó sử dụng `query builder` như một công cụ để thực hiện câu truy vấn dữ liệu. Mình đã đúc kết một số kinh nghiệm như sau:
- Hàm hay sử dụng nhất chính là `get()`. Nó sẽ luôn trả về **eloquent collection**
- Trước khi gọi các hàm để thực hiện truy vấn như `get()`, `first()`, `count()`, `paginate()`,... thì nó sẽ là **eloquent builder**
- Đối với relation thì relation số nhiều kết quả sau khi load sẽ là **eloquent collection** còn số ít sẽ là **model**
- Việc gọi `$post->comments()` với `$post->comments` là khác nhau. `$post->comments()` chỉ tạo ra một dạng relation sử dụng `eloquent builder` để bạn thao tác truy vấn dữ liệu. `$post->comments` sẽ load relation `comments` đồng thời trả về dữ liệu đã load được. 2 loại này chỉ khác nhau có ngoặc hoặc không có ngoặc nên bạn không được nhầm nhé.

# Kết luận
Như vậy chúng ta đã cùng nhau tìm hiểu cách hoạt động của một số lệnh đơn giản mà mình hay sử dụng nhất với model. Khi hiểu được cách hoạt động của nó chúng ta sẽ sử dụng nó một cách hiệu quả hơn. Chủ đề tiếp theo sẽ liên quan đến việc sử dụng Model để giải quyết một số yêu cầu hay gặp phải khi mình lập trình như *Thực hiện các điều kiện lồng nhau*, *Sử dụng where has hay where exist*, *Tạo default cho các trường*, *Reload lại dữ liệu của model*,  *Truy vấn những dữ liệu cần tính toán*,... các bạn nhớ đón đọc nhé.

Bài viết của mình xin kết thúc tại đây. Hi vọng sẽ giúp ích được cho các bạn. Nếu bạn thấy hay thì hãy upvote và chia sẻ cho bạn bè cùng đọc. Đừng quên Follow mình để nhận được thông báo khi mình có bài viết mới nhé. Chúc các bạn có một ngày tốt lành!