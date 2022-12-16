## Mở đầu
Xin chào mọi người, hôm nay mình sẽ giới thiệu với mọi người một chủ đề đã được đề cập rất nhiều trong Laravel. Đó là viết Test. Tuy nhiên, mình vẫn thấy rất nhiều trường hợp, đó là khi viết code xong, là xong =))) ( Ngày trước mình training cũng thế  :v ) bây giờ cũng vậy :D (có chăng về nhà mở code ra rồi cứ vừa học vừa viết thôi). Chúng ta bắt đầu luôn nha.
## Nội dung
#### Tại sao phải viết test
Mình cũng không biết tại sao nữa =)) Chỉ cần làm thế nào cho code chạy là được rồi. Mình cứ nghĩ như vậy đến 1 ngày, thằng bạn nó động vào code, nó bảo: "Mày viết code mà không viết test thế nhỡ có lỗi mà mày không tìm ra thì làm thế nào". Thì lúc đầu mình nghe nó nói câu này thì thấy cũng chả sợ. Dù sao thì mình code nó vẫn chạy cơ mà. * Vẫn cười *. Thế rồi nó nhờ mượn máy, ngồi xem 1 tí, 1 lúc sau nó bảo mình: "Đây, xem đi, đỏ lòm chưa". Mình bắt đầu thấy sợ dần...sợ dần...và thế là...mình tìm hiểu về test (yaoming) <br/>
Mình thử mò mẫm, đọc tài liệu thì thấy cái "test" này khá là mơ hồ , rộng, có một chút trừu tượng cũng như gây sự khó khăn khi mới tiếp xúc. Thành ra mình cứ lên [Testing-Laravel](https://laravel.com/docs/5.7/testing) đọc dần rồi làm thử. Nhưng quả thật thấy nó cứ khó khó kiểu gì, như kiểu nhìn thấy rồi mà không thể chạm tới =))
Sau đó cứ tập viết một chút, đọc nhiều, code nhiều hơn, dần dần cũng ngộ ra rằng, viết test cũng có nhiều cái hay, giúp code chặt chẽ hơn, như mình thì hay nghĩ là viết test cũng là một cái gì đó nó sẽ chống lưng một phần cho code. =))) Thế nên hãy tập viết test luôn nhé các bạn. :D 
#### Giới thiệu một số loại test
##### Test relationship. 
Ở đây mình xin giới thiệu 2 relationship để test đó là belongsTo và hasMany. 
Giả sử mình đang có 1 project Laravel, sử dụng CSDL là MySQL, đã chạy lệnh `php artisan make:auth`, tiếp đó mình sẽ chạy thêm một migration mới để tạo thêm 1 bảng nữa, mình sẽ tạo bảng có tên là `Book` (model) và cuối cùng là run: `php artisan migrate`. 

```php
//User.php
public function books()
    {
        return $this->hasMany(Book::class);
    }
//Book.php
public function user()
    {
        return $this->belongsTo(User::class);
    }
```
Giờ ta sẽ test 2 relation này. 
```shell
php artisan make:test ModelTest --unit
```
Chạy xong, mở file tests/Unit sẽ thấy file `ModelTest.php`. <br>
Tiếp theo, model User cần test relationship `books` với model `Book`: 
```php
protected function assertHasMany($related, $foreignKey, $model, $relationName)
{
    $relation = $model->$relationName();

    $this->assertInstanceOf(HasMany::class, $relation, 'Relation is wrong');
    $this->assertInstanceOf($related, $relation->getRelated(), 'Related model is wrong');
    $this->assertEquals($foreignKey, $relation->getForeignKeyName(), 'Foreign key is wrong');
}

public function test_it_has_many_books()
{
    $this->assertHasMany(Book::class, 'user_id', new User, 'books');
}
```
Các bạn nhớ `use` các Class đã sử dụng vào nhé. `HasMany` và `BelongsTo` ở đây mà mình sử dụng đó là use `Illuminate\Database\Eloquent\Relations\HasMany` và `use Illuminate\Database\Eloquent\Relations\BelongsTo`, chúng đều được extends thì `Relation` class bên trong Laravel.  <br>
Mở terminal lên: <br>
```shell
vendor/bin/phpunit
```
Một màu xanh lá cây rồi đúng không các bạn. Tương tự với model `Book` cũng tương tự. Đây là code đầy đủ:
```php
<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\User;
use App\Book;

class ModelTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_it_has_many_books()
    {
        $this->assertHasMany(Book::class, 'user_id', new User, 'books');
    }

    public function test_it_belongs_to_user()
    {
        $this->assertBelongsTo(User::class, 'user_id', 'id', new Book, 'user');
    }

    protected function assertHasMany($related, $foreignKey, $model, $relationName)
    {
        $relation = $model->$relationName();

        $this->assertInstanceOf(HasMany::class, $relation, 'Relation is wrong');
        $this->assertInstanceOf($related, $relation->getRelated(), 'Related model is wrong');
        $this->assertEquals($foreignKey, $relation->getForeignKeyName(), 'Foreign key is wrong');
    }

    protected function assertBelongsTo($related, $foreignKey, $ownerKey, $model, $relationName)
    {
        $relation = $model->$relationName();

        $this->assertInstanceOf(BelongsTo::class, $relation, 'Relation is wrong');
        $this->assertInstanceOf($related, $relation->getRelated(), 'Related model is wrong');
        $this->assertEquals($ownerKey, $relation->getOwnerKey(), 'Owner key is wrong');
        $this->assertEquals($foreignKey, $relation->getForeignKey(), 'Foreign key is wrong');
    }
}

```
##### Test Controller
Phần này mình sẽ lại làm dựa trên code có sẵn mà Laravel đã cung cấp =)) Không phải mình lười mà là vì làm như vậy sẽ tiện hơn rất nhiều. (yaoming)
<br>
Ở phần trên mình, sau khi các bạn migrate thành công, các bạn run: `php artisan serve --port=1011`, rồi mở browser lên gõ địa chỉ `localhost:1011` nhé (yaoming), bật F12 lên, chạy vào tab network, sau đó đăng kí tài khoản như bình thường. Sau khi tạo thành công tài khoản, bạn sẽ thấy server trả về một status code đó là 302. Chúng ta sẽ nhớ số 302 này để chút nữa test haa. 
Tạo file test: 
```
php artisan make: RegisterTest
```
Mình không biết lấy tên gì nên thôi gọi tạm là Register nhé các bạn =)) <br>
Giờ viết test như thế nào nhỉ? Các bạn thử "đoán xem" ? Mình thì nghĩ: * Có 1 cục dữ liệu gửi bằng method Post lên sau đó nhận về status code là 302 * Ồ, thử viết xem. =))) 
```php
//đây là cục data mà mình sẽ gửi
$data = [
    'name' => 'depzai10111995', //đây là lí do nãy mình mở port 1011 =))
    'email' => 'vunguyen10111995@gmail.com',
    'password' => '123456',
    'password_confirmation' => '123456'
];

$this->postJson('/register')->assertStatus(422); // nếu mà chỉ gửi request nhưng không có data thì sẽ báo lỗi 

$this->postJson('/register', $data)->assertStatus(302); // đây là những gì mà mình vừa nghĩ -> success
```

Thực ra để cover được hết các trường hợp thì rất là rộng là gần như là cực khó. Vì vậy mình chỉ viết coi như một trường hợp nhỏ xíu thôi. :D
##### Test Email
Mình thì hay dùng [mailtrap.io](https://mailtrap.io) để test mail. Việc tạo mail trên mailtrap rất dễ dàng. Bạn chỉ việc đăng kí tài khoản, bạn sẽ có đầy đủ thông tin, thông tin này bạn sẽ điền vào file `.env` là xong. <br>
Ví dụ đây là thông tin trên mailtrap của mình sau khi mình đăng kí :

![](https://images.viblo.asia/f27aa8b6-a617-4af0-a6a7-1b5c33ec7bab.png)
File `.env`: 
```php
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=a0c37d8720d520
MAIL_PASSWORD=cd03b4a773604b
MAIL_ENCRYPTION=tls

MAIL_FROM=from@example.com
MAIL_NAME=Example
```
Để gửi mail được, có nhiều cách, nhưng mình sẽ làm thật lòng vòng, mình sẽ tạo một job và một mail:
```
php artisan make:job SendMailMessageCreatedTest //job

php artisan make:mail MailCreateAccount //mail
```
Sửa lại file: `App\Http\Controllers\Auth\RegisterController`: 
```php
protected function create(array $data)
{
    User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
    ]);

    $user = User::where('email', $data['email'])->first();

    dispatch_now(new SendMailMessageCreated($user));

    return $user;
}
```

File `SendMailMessageCreated`: 
```php
protected $user;

public function __construct(User $user)
{
    $this->user = $user;
}

/**
 * Execute the job.
 *
 * @return void
 */
public function handle()
{
    $info = new MailCreateAccount($this->user);


    Mail::to($this->user->email)->send($info);
}
```
File `MailCreateAccount`:
```php
public function __construct(User $user)
{
    $this->user = $user;
}

/**
 * Build the message.
 *
 * @return $this
 */
public function build()
{
    return $this
        ->view('emails.test', ['user' => $this->user]);
}
```
Tạo blade gửi mail `resoure/emails/test.blade.php`:
```php
Hello, {{ $user->name }}
```
Giờ ta sẽ lại tạo file để test chức năng gửi mail:
```
php artisan make:test SendMailMessageCreatedTest
```
Nội dung của file này:
```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Jobs\SendMailMessageCreated;
use App\Mail\MailCreateAccount;
use Illuminate\Support\Facades\Mail;

class SendMailMessageCreatedTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_it_can_send_mail()
    {
        $user = factory(User::class)->create();

        Mail::fake();


        $job = new SendMailMessageCreated($user);

        $job->handle();

        return Mail::assertSent(MailCreateAccount::class, 1);
    }
}
```
Vậy là xong, sau khi chúng ta chạy lại test sẽ có kết quả là pass 100%. Vậy là quá trình bắt đầu viết test cũng đem lại một chút niềm vui để chúng ta có thể tiếp tục tìm hiểu. :D 
## Lời kết
Qua bài chia sẻ này, hi vọng có thể giúp mọi người, đặc biệt là những người mới tiếp xúc với Laravel, có thể có hứng thú cũng như quan tâm đến việc viết test cho code mà mình đã tạo ra. Thực sự thì phạm vi của test rất rộng, nó còn phụ thuộc vào người viết code nữa. Để viết được test, bạn phải cảm nhận được mình đang đứng ở phía khách quan, để có thể nhìn nhận được tất cả vấn đề mà code có thể xảy ra, nhằm viết test và khắc phục lỗi cho nó. Bài chỉa sẻ của mình xin hết. Cảm ơn các bạn đã đọc. Tạm biệt :D Hãy nhớ comment nếu có vấn đề gì nhé. 
Đây là [SourceCode](https://github.com/vunguyen10111995/Laravel-LearningTest) cho bạn nào quan tâm.!