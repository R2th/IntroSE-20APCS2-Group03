Đây là chuỗi bài viết theo phong thái dễ hiểu, đơn giản, cơ bản, phù hợp với những người bắt đầu với Laravel từ con số 0. 

Trong bài viết này chúng ta sẽ quan tâm đến một số cách sử dụng eloquent trong laravel nhé. Xem lại khái niệm về eloquent tại [đây](https://viblo.asia/p/laravel-vo-long-phan-2-co-ban-ve-truy-cap-toi-database-trong-laravel-1Je5EyGm5nL#_eloquent-model-2).
# Basic Eloquent
   Phần này sẽ bao gồm các nội dung sau:
* Các quan hệ (Relationship)
* Sinh dữ liệu để test và triển khai quan hệ một nhiều.

## Các quan hệ - Basic Eloquent Relationships
Trong cơ sở dữ liệu quan hệ, chúng ta đã rất quen thuộc  với các mối quan hệ như một-một, một-nhiều, nhiều-nhiều. Cũng như các ngôn ngữ khác, Eloquent sẽ có các method để mô phỏng các quan hệ này với mục đích hạn chế chúng ta phải viết những câu SQL query.

Ví dụ trong thực tế như sau:
> Một giảng viên đại học xuất bản các bài báo khoa học. Tức, một giảng viên sẽ có một hoặc nhiều bài báo. 

Mô phỏng trong cơ sở dữ liệu quan hệ sẽ như sau:
> Mối quan hệ giữa hai thực thể này là một-nhiều (một giảng viên có nhiều bài báo). Khi triển khai thực tế, sẽ có 2 bảng là **users** và **articles**. Để thiết lập mối quan hệ một nhiều thì ở bảng **articles** sẽ có thêm trường user_id (khóa ngoại liên kết tới bảng **users**).

Mô phỏng trong code của laravel với các method tương ứng.
```php:app/User.php
...
class User extends Authenticatable
{
    ...
    public function articles()
    {
        # hasMany(): có nhiều
        return $this->hasMany(Article::class);
    }
}
```
```php:app/Article.php
...
class Article extends Model
{
    ...
    public function user()
    {
        # belongsTo(): thuộc về
        return $this->belongsTo(User::class);
    }
}
```
Chúng ta thử cùng suy nghĩ thực tế như sau:
> Với trường hợp thực tế như trên, có thể khi muốn có thông tin liên quan, ta sẽ **hỏi**:
> * Giảng viên có những bài báo nào?
> * Giảng viên có tất cả bao nhiêu bài báo?
> * Giảng viên có bài báo nào tên là "Laravel" không?
> * ...
> 
> ⇒ Đi từ giảng viên để **hỏi-truy vấn** dữ liệu về các bài báo.
> 
> * Bài báo này là của ai?
> * Bài báo có mã hiệu đính (id) là 1 là của ai?
> * ...
> 
> ⇒ Đi từ bài báo để **hỏi-truy vấn** dữ liệu về giảng viên.

Ta sẽ thực thi câu lệnh như sau tại `php artisan tinker`:
```
$user=App\User::find(1);
$user->articles;
```
Câu lệnh `$user->articles` sẽ gọi đến method được đặc tả ở `app/User.php`, thì hàm `hasMany()` sẽ tiếp tục được triển khai. Method này sẽ tự thông dịch ra những câu truy vấn SQL như `select * from articles where user_id=$user->id` và trả về kết quả truy vấn. **Như vậy đã trả lời được câu hỏi "Giảng viên có những bài báo nào?"**

Ta thấy ở đây mọi thứ đều có liên kết và được truy vấn thông qua liên kết đó. Mọi thứ từ thực tế đến môi trường code đều trở nên logic, dễ hiểu theo hướng suy nghĩ của con người.

Với những câu hỏi có sự tùy biến sâu hơn thì laravel sẽ cung cấp thêm các method để chúng ta có những truy vấn ưng ý tại [đây](https://laravel.com/docs/8.x/eloquent#collections). Các kết quả truy vấn trả về sẽ được đặt trong một kiểu trong laravel là Collections, vì thế chúng ta có thể tiếp tục áp dụng các method của Collections tại [đây](https://laravel.com/docs/8.x/eloquent-collections#available-methods).

Ngoài ra, eloquent cũng cung cấp đa dạng các cách thiết lập Relationship tại [đây](https://laravel.com/docs/8.x/eloquent-relationships).

Khối lượng kiến thức khá lớn, hãy nghiên cứu dần dần nhé. <3 Phần tiếp theo chúng ta sẽ thực hành những điều ở trên.
## Sinh dữ liệu để test và triển khai quan hệ một nhiều.
Như đã nói ở trên, để triển khai quan hệ một nhiều giữa **users-articles** ta sẽ thêm trường user_id vào bảng **articles**, và thiết lập khóa ngoài cho nó link đến bản users. Chứng ta có thể sửa file migrate như sau.
```php:database/migrations/2020_08_17_014933_create_articles_table.php
...
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            # Thêm trường user_id
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->text('excerpt');
            $table->text('body');
            $table->timestamps();

            # Thêm khóa ngoài ở trường user_id link đến trường id của bảng users.
            # Tùy chọn onDelete('cascade') ở đây để đảm bảo khi xóa user, thì các article cũng được xóa đi (xóa giảng viên thì các bài báo của giảng viên đó cũng được xóa đi).
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }
 ...
```
Chạy lệnh để reset các file migrate:
```
php artisan migrate:fresh
```

Các bài hướng dẫn của mình dựa theo chuỗi video laravel from scratch trên laracasts, thì mình thấy tác giả sửa file migrate và chạy lệnh reset toàn bộ các file migrate. Nhưng thực tế, thông thường, chúng ta sẽ add thêm một migrate nữa để thay đổi cấu trúc database và chạy lệnh `php artisan migrate` để chạy migrate file đó, hạn chế sửa các file migrate cũ. Cơ mà, bài viết được viết trên tinh thần tôn trọng tác giả và tại mình cũng hơi lười xíu thôi :joy:

Bây giờ chúng ta sẽ chuyển sang phần generate ra dữ liệu để test. Thông qua các file factory. Chúng ta cứ hiểu, các file như các nhà máy, và nhà máy thì phải sản xuất gì đó đúng không, các nhà máy này sẽ sản xuất dữ liệu database cho chúng ta. Nội dung file factory user.
```php:database/factories/UserFactory.php
<?php

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
});
```
Trong file trên, có sử dụng thư viện PHP là [Faker](https://github.com/fzaninotto/Faker) giúp chúng ta sinh dữ liệu tương ứng mà mình muốn. 
Chạy câu lệnh sau trong `tinker` để kêu nhà máy tạo giảng viên cho chúng ta :construction_worker: 
```
factory(App\User::class)->create();
```
Kết quả ví dụ:
```
=> App\User {#3147
     name: "Jean Koepp DDS",
     email: "tfeest@example.org",
     email_verified_at: "2020-09-16 03:54:11",
     updated_at: "2020-09-16 03:54:11",
     created_at: "2020-09-16 03:54:11",
     id: 11,
   }
```
Tạo giảng viên với số lượng mình muốn, ví dụ ở đây là 5.
```
factory(App\User::class, 5)->create();
```
Chúng ta sẽ tạo file factory cho article như sau.
```
php artisan make:factory ArticleFactory -m "App\Article"
```
Sau đó sửa lại file factory tương ứng như sau (bảng có trường nào thì ta sẽ faker cho trường đó).
```php:database/factories/ArticleFactory.php
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Article;
use Faker\Generator as Faker;

$factory->define(Article::class, function (Faker $faker) {
    return [
        # Khi chạy factory này sẽ chạy thêm factory user để có id gán cho user_id.
        'user_id' => factory(App\User::class),
        'title' => $faker->sentence(),
        'excerpt' => $faker->sentence(),
        'body' => $faker->paragraph()
    ];
});
```
Tạo bài báo với số lượng mình muốn, ví dụ ở đây là 5.
```
factory(App\Article::class, 5)->create();
```
Vì file factory này khi khởi chạy thì bên trong một file factory cũng sẽ được gọi. Tức sẽ tạo ra các giảng viên mới và gán tương ứng với các bài báo được tạo.
Để tạo bài báo cho một người dùng cụ thể, ta có thể override thuộc tính user_id như sau.
```
factory(App\Article::class, 5)->create(['user_id' => 1]);
```
Tương ứng với tạo 5 bài báo cho giảng viên có id là 1.

Ngoài ra chúng ta cũng có thể override các thuộc tính khác. Ví dụ như:
```
factory(App\Article::class, 5)->create(['title' => 'Override the title']);
```

Sau khi đã thiết lập các quan hệ `hasMany()` và `belongsTo()` như phần trước, thì giờ chúng ta có thể thực hiện các truy xuất như sau trong `tinker`
```
$user=App\User::find(1);
$user->articles;
App\Article::find(1)->user;
```

Kiến thức đang dần nâng cao lên. Nếu có gì không hiểu, thì hãy comment nhé. 
> Phần này xin được tạm kết tại đây! 
> Nguồn tham khảo: https://laracasts.com/series/laravel-6-from-scratch/