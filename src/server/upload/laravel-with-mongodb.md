![](https://images.viblo.asia/9fa160c5-8757-4c23-93b6-6a91a460c577.jpg)
# Mở đầu
Hello anh em, đến hẹn lại lên hôm nay mình xin chia sẻ với mọi người về chủ đề Laravel kết hợp với MongoDB mà thông thường ta hay kết hợp Laravel với MySQL. Và mặc định thì Laravel chỉ hỗ trợ các cơ sở dữ liệu có cấu trúc như: MySQL, PostgreSQL, SQLite, SQL Server. Tuy nhiên theo thời thế thì NoSQL ngày càng phát triển mạnh mẽ và được tin dùng bởi nó linh động và có tốc độ cao mà điển hình là MongoDB. Trong phạm vi bài viết này mình chỉ xin đề cập đến MongoDB thay cho cơ sở dữ liệu không có cấu trúc NoSQL. Để tận dụng được những điểm tốt của NoSQL bây giờ ta sẽ tìm cách để có thể sử dụng MongoDB trong Laravel để mang lại hiệu quả tốt nhất. Bắt đầu thôi...
# Cài đặt và sử dụng
Để cài đặt MongoDB ta chỉ cần vài bước cơ bản như sau: ( ở đây mình cài trên Ubuntu 16.04, trên các hệ điều hành khác các bạn có thể tham khảo ở trang chủ của nó)

B1: Thêm package
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
```
B2: 
```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
```
B3:
```bash
sudo apt-get update
```
B4: Cài đặt MongoDB
```bash
sudo apt-get install -y mongodb-org
```
Sau khi cài xong thì ta đã có mongodb trong máy rồi, việc tiếp theo là ta sẽ cài thêm 1 công cụ để tiện quản lý cơ sở dữ liệu. Nó giống như MySQL Workbench thì ở đây ta sẽ sử dụng MongoDB Compass. Việc cài đặt nó khá đơn giản nên các bạn có thể cài theo [hướng dẫn này](https://docs.mongodb.com/compass/current/install/) nhé. 

Như vậy là ta đã có MongoDB chạy trong máy rồi. Nhưng vẫn chưa đủ, ta phải cài đặt thêm driver để PHP có thể kết nối và thao tác với MongoDB. Việc cài đặt driver này diễn ra như sau:
```sh
$ git clone https://github.com/mongodb/mongo-php-driver.git
$ cd mongo-php-driver
$ git submodule update --init
$ phpize
$ ./configure
$ make all
$ sudo make install
```
Và cuối cùng ta cần làm đó là cài đặt package hỗ trợ Laravel kết nối và thao tác với MongoDB giống như Eloquent mặc định của Laravel. Package đó là [jenssegers/mongodb](https://github.com/jenssegers/laravel-mongodb). Cài đặt đơn giản qua composer:
`composer require jenssegers/mongodb`.
Mọi thứ đã sẵn sàng, giờ ta có thể sử dụng ngay: Bây giờ ở model ta sẽ extends class Model Eloquent của mongodb:
```php
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class User extends Eloquent {}
```
Và bây giờ mọi thứ đã giống như Eloquent tương tác với MySQL rồi nhé:
```php
$users = User::all();
$user = User::find('517c43667db388101e00000f');
$users = User::where('votes', '>', 100)->take(10)->get();
$users = User::where('votes', '>', 100)->orWhere('name', 'John')->get();
$users = User::whereIn('age', [16, 18, 20])->get();
// OrderBy
$users = User::orderBy('name', 'desc')->get();
// Offset & Limit
$users = User::skip(10)->take(5)->get();
// Distinct
$users = User::distinct()->get(['name']);
// Advanced Wheres
$users = User::where('name', '=', 'John')->orWhere(function($query)
    {
        $query->where('votes', '>', 100)
              ->where('title', '<>', 'Admin');
    })
    ->get();
// Group By
$users = Users::groupBy('title')->get(['title', 'name']);
// Like
$user = Comment::where('body', 'like', '%spam%')->get();

// Hỗ trợ luôn soft delete
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class User extends Eloquent {

    use SoftDeletes;

    protected $dates = ['deleted_at'];

}
// ...
```

Ngoài ra MongoDB còn có các toán tử đặc biệt:
```php
// Tìm các document có trường được chỉ định
User::where('age', 'exists', true)->get();
// Tìm kiếm theo mảng 
User::where('roles', 'all', ['moderator', 'author'])->get();
// Sử dụng regex
User::where('name', 'regex', new \MongoDB\BSON\Regex("/.*doe/i"))->get();
// Tìm theo loại dữ liệu https://docs.mongodb.com/manual/reference/operator/query/type/#op._S_type
User::where('age', 'type', 2)->get();
// Truy vấn theo khoảng cách và kinh độ vĩ độ
$users = User::where('location', 'near', [
	'$geometry' => [
        'type' => 'Point',
	    'coordinates' => [
	        -0.1367563,
            51.5100913,
        ],
    ],
    '$maxDistance' => 50,
]);
// GeoWithin
$users = User::where('location', 'geoWithin', [
	'$geometry' => [
        'type' => 'Polygon',
	    'coordinates' => [[
            [
                -0.1450383,
                51.5069158,
            ],       
            [
                -0.1367563,
                51.5100913,
            ],       
            [
                -0.1270247,
                51.5013233,
            ],  
            [
                -0.1450383,
                51.5069158,
            ],
        ]],
    ],
]);
// GeoIntersects
$locations = Location::where('location', 'geoIntersects', [
    '$geometry' => [
        'type' => 'LineString',
        'coordinates' => [
            [
                -0.144044,
                51.515215,
            ],
            [
                -0.129545,
                51.507864,
            ],
        ],
    ],
]);

```
### Relations
Hỗ trợ các loại relationship sau:
* hasOne
* hasMany
* belongsTo
* belongsToMany
* embedsOne
* embedsMany

Các quan hệ `hasOne`, `hasMany`, `belongsTo` về cơ bản cách lưu dữ liệu giống như với MySQL nhưng với `belongsToMany` thì lại là một điểm khác biệt. Ở MySQL ta dùng thêm 1 bảng trung gian để lưu quan hệ gọi là pivot table nhưng với MongoDB thì ta không cần làm như vậy mà ta chỉ cần lưu id của bảng quan hệ vào 1 trường dạng mảng của bảng còn lại. Ví dụ như User belongsToMany với Role thì ta trong bảng users ta có trường role_ids lưu các id của role mà user đó nắm giữ đồng thời trong bảng roles ta lại có trường user_ids là mảng chứa các user id mà role đó thuộc về. :D 

Ngoài các quan hệ đó ta có thêm 2 quan hệ đặc biệt nữa thể hiện đặc tính của MongoDB đó là `embedsOne` và `embedsMany`. 2 quan hệ này khá giống với `hasOne` và `hasMany` tuy nhiên điểm khác biệt đó là Embed Model này sẽ nằm trong object của Model cha. Ví dụ User có nhiều tài khoản social network thì về mặt dữ liệu sẽ là
```json
{
    "_id":"5b237057f7c10c102d3d6072",
    "email":"example@gmail.com",
    "name":"Vo Hong Quan",
    "password":"$2y$10$O9ICdUQxafdXlR/x3NN.4.RsMB1U.bGebGZo81.lMq26zC1uAQ1Se",
    "updated_at":"2018-06-15T07:52:55.000Z",
    "created_at":"2018-06-15T07:52:55.000Z",
    "role_ids":["5b31b8b4f7c10c4c6b72a0e2"],
    "social_networks": [
        {
            "_id": "5b31e8a0f7c10c086450a552",
            "social_id": "23232010",
            "social_name": "QuanKim",
            "social_type": "facebook",
            "created_at": "2018-06-15 14:52:55.000",
            "updated_at": "2018-06-15 14:52:55.000"
        }
    ]
}
```
### MySQL Relations
Ngoài ra nếu trong dự án của bạn sử dụng cả mongodb và mysql thì package này vẫn hỗ trợ 1 trait để có thể hoạt động với các relations giống như mặc định của Laravel đó là `Jenssegers\Mongodb\Eloquent\HybridRelations`. Cách sử dụng như sau:
User model sử dụng mysql để lưu trữ ta khai báo như sau:
```php
use Jenssegers\Mongodb\Eloquent\HybridRelations;

class User extends Eloquent {

    use HybridRelations;

    protected $connection = 'mysql';

    public function messages()
    {
        return $this->hasMany('Message');
    }

}
```
Còn với Message model dùng mongodb để lưu trữ:
```php
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Message extends Eloquent {

    protected $connection = 'mongodb';

    public function user()
    {
        return $this->belongsTo('User');
    }

}
```
### Queues
Chính sửa file config/queue.php
```php
'connections' => [
    'database' => [
        'driver' => 'mongodb',
        'table'  => 'jobs',
        'queue'  => 'default',
        'expire' => 60,
    ],
```
Để handle failed jobs ta sửa config/queue.php:
```php
'failed' => [
    'database' => 'mongodb',
    'table'    => 'failed_jobs',
    ],
```
Thêm service provider: `Jenssegers\Mongodb\MongodbQueueServiceProvider::class,`

### Laravel Passport
Ngoài ra trong quá trình tìm hiểu và làm việc với MongoDB thì khi mình thử với Laravel Passport lại không hỗ trợ MongoDB. Vì vậy ta lại cần thêm 1 package để có thể custom lại passport để sử dụng cho MongoDB. Đó là [Laravel MongoDB Passport](https://packagist.org/packages/designmynight/laravel-mongodb-passport). Nôm na thì tác giả đã viết lại các model ẩn dùng cho Laravel Passport mặc định hỗ trợ cho MongoDB. 

Cài đặt bằng composer:
`composer require designmynight/laravel-mongodb-passport`
Về cách sử dụng thì hoàn toàn tương tự Laravel Passport. Ta chỉ cần sửa đổi một chút class User:
```php
namespace App;

use Illuminate\Notifications\Notifiable;
use DesignMyNight\Mongodb\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
}
```

# Kết luận
Như vậy mình vừa chia sẻ xong cách để chúng ta có thể sử dụng NoSQL trong Laravel mà cụ thể là MongoDB. Nếu dự án của bạn cần chuyển sang một cơ sở dữ liệu NoSQL hoặc kết hợp vào với MySQL thông thường thì hãy thử MongoDB nhé.
Cảm ơn các bạn đã theo dõi bài viết. :smiley: