# I. Tạo Authentication riêng để kiểm tra đăng nhập cho bảng trong Laravel.
Laravel đã xây dựng sẵn thư viện Auth để lập trình viên kiểm tra  đăng nhập một cách dễ dàng hơn nhưng vấn đề đặt ra là ngoài bảng 'user' được xây dựng sẵn để kiểm tra thì bây giờ mình muốn kiểm tra ở một bảng khác được không, hay mình không muốn kiểm tra trường 'email',  'password' như được xây dựng sẵn mà mình muốn kiểm tra trường 'name' thì phải làm thế nào. Và điều đặc biệt nhất mình muốn chia sẻ trong bài hôm này là ngoài kiểm tra đăng nhập cho bảng 'user' mình muốn **kiểm tra đăng nhập cho các bảng khác nữa như 'admin', 'customer'**, nữa thì bài viết này mình sẽ nói đến cách làm của mình cho trường hợp trên.
## 1. Sơ lược auth.
- Authentication theo Wikipedia:
**là một hành động nhằm thiết lập hoặc chứng thực một cái gì đó (hoặc một người nào đó) đáng tin cậy, có nghĩa là, những lời khai báo do người đó đưa ra hoặc về vật đó là sự thật. Xác thực một đối tượng còn có nghĩa là công nhận nguồn gốc (provenance) của đối tượng, trong khi, xác thực một người thường bao gồm việc thẩm tra nhận dạng của họ. Việc xác thực thường phụ thuộc vào một hoặc nhiều nhân tố xác thực (authentication factors) để minh chứng cụ thể.**
- Theo như wikipedia định nghĩa thì các bạn cũng đã hiểu sơ qua về nó rồi đúng không. Ở trong lập trình khái niện nó cũng như thế, và ứng dụng thực tiễn là chức năng đăng nhập vào hệ thống.
- Các bài viết giới thiệu về Auth rất nhiều rồi nên mình không nói lại nữa. Bài viết của anh Nguyễn Hoàng rất đầy đủ và chi tiết bạn nào chưa biết về auth thì nên đọc qua link bên dưới trước khi tiếp tục bài viết này nhé! Còn bạn nào biết rồi thì ta tiếp tục với phần tiếp theo.
link: https://viblo.asia/p/tim-hieu-ve-authentication-trong-laravel-Ljy5VoG3Kra
## 2. các bước tạo auth xác thực với bảng dữ liệu.
- b1: Tạo auth.
- b2: Bạn tạo Model cho bảng cần kiểm tra.
- b3: Chỉnh sửa file auth.
- b4: use auth và sử dụng.
## 3. Thực hành cụ thể với bảng 'loyal_customers'.
### 3.1 tạo bảng.
- **Lưu ý: các lệnh chạy trong command với win và chạy terminal đối với unbutu.**
- Kiểm tra đăng nhập với một bảng, hai bảng, ba bảng, ... thì làm thế nào? Đây là câu hỏi khi mình bắt đầu tìm hiểu về auth. Khi bạn đã hiểu rõ về nó thì câu hỏi này mặc nhiên sẽ biến mất thôi, vì để trả lời cho câu hỏi này nó khá là đơn giản.

- Để kiểm tra với một bảng khác thì các bạn cần tạo cho mình một bảng để kiểm tra (lưu ý ở đây mình không dùng bảng user của laravel nhé, nếu các bạn chỉ cần kiểm tra 1 bảng thì có thể đổi tên bảng user trong model và tên model trong file config/auth đọc link bên trên) ở đây mình cần kiểm tra thêm một bảng nữa thì mình tạo bảng cần kiểm tra. Ở đây mình tạo bảng có tên là 'loyal_customers'. Bạn nào chưa biết tạo bảng thì xem lại phần migrations trong laravel ngay đi nhé.
Để tạo một file migration có tên 'loyal_customers'  ta sử dụng lệnh:
```
php artisan make:migration loyal_customers --create=loyal_customers
```
- bạn vào database/migrations có file tên ....loyal_customers.php bạn mở nó lên (Lưu ý mình dùng sublime text 3) và thêm cho nó vài trường dữ liệu.
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class LoyalCustomers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loyal_customers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loyal_customers');
    }
}
```
- Bên trên mình đã thêm một vài trường dữ liệu vào migration các trường dữ liệu các bạn có thể thay đổi tùy ý. Ở đây mình kiểm tra với email và password nên mình có 2 trường dữ liễu email và password. Trường 'email_verified_at' dùng để xác thực email khi bạn đăng ký tài khoản cho email (lưu ý chỉ có từ phiên bản 5.7 trở lên). Sau người dung đăng kí xong, một email với link verify sẽ được gửi đến email của họ. Việc còn lại là người đăng ký sẽ truy cập vào link đấy và việc verify email sẽ thành công. Tuy nhiên, nếu người đăng ký tài khoản chưa verify ta sẽ thông báo cho họ phải verify trước khi truy cập vào các nội dung khác của web, bằng việc sử dụng middleware verified mà Laravel đã cung cấp tại các route mà bạn muốn.  Hơi dài dòng bạn nào muốn tìm hiểu về cái này thì lên google search từ khóa 'email_verified_at laravel' nhé. Còn 'rememberToken' là để lưu trạng thái đăng nhập của người dùng nếu nói ngắn gọn là như thế. 2 trường trên bạn không thêm vào bảng dữ liệu cũng được. Có migration rồi thì các bạn chỉ cần chạy lệnh để tạo bảng thôi nào. Lệnh chạy migration:
```
php artisan migrate
```
- Lưu ý để chạy được migrate các bạn phải tạo database và cấu hình cho file .env đã nhé.
### 3.2 tạo dữ liệu mẫu.
- Có bảng để kiểm tra rồi thi bây giờ làm gì đây. Tất nhiên tạo dữ liệu mẫu rồi, bạn có thể dùng seeder để tạo dữ liệu mẫu hoặc tạo trực tiếp trong cơ sở dữ liệu cho mình nhé. Khuyến khích tạo bằng seeder nhé tạo trực tiếp chỉ để test thôi chứ không ai làm vậy đâu các bạn. Bạn nào chưa biết tạo seeder thì tìm hiểu đi cũng đơn giản thôi. Ở đây mình dùng luân file 'UserTableSeeder.php' trong database/seeds cho nhanh, bạn có thể tạo seeder riêng.
```php
<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
         $data = [
            [
                'email' => 'lxc150896@gmail.com',
                'password' => bcrypt('12345'),
            ],
            [
                'email' => 'lxc@gmail.com',
                'password' => bcrypt('12345'),
            ],
            [
                'email' => 'admin@gmail.com',
                'password' => bcrypt('12345'),
            ],
        ];
        DB::table('loyal_customers')->insert($data);
    }
}
```
- Bên trên là phần mình tạo dữ liệu mẫu. Giờ thì chạy lệnh seeder để tạo dữ liệu mẫu thôi nào.
```
php artisan db:seed
or
php artisan db:seed --class=UserTableSeeder
```
### 3.3 tạo route.
- Để bài viết cụ thể nhất cho những bạn mới tìm hiểu mình sẽ làm rõ ràng hơn và đầy đủ hầu hết các bước. Tiếp theo bạn hãy vào routes/web.php và thêm cho mình 2 route này vào file web.php.
```php
route::get('/', 'UserController@getLogin');
route::post('/', 'UserController@postLogin');
```
- Có route rồi thì tạo controller thôi.
```
php artisan make:controller UserController
```
- Ở trên chỉ là các bước tạo môi trường để test đăng nhập cho bảng 'loyal_customers' thôi các bạn. Bây giờ mới đên phần chính.
### 3.4 Kiểm tra đăng nhập cho bảng 'loyal_customers'.
- b1: Tạo auth.
-  làm việc với auth mà không tạo auth sao được đúng không nào.  Bạn mở command (với unbutu thì là terminal nhé nhớ cd vào project cuả bạn!)  và chạy câu lệnh sau:
```
php artisan make:auth
```
- b2: Bạn tạo Model cho bảng 'loyal_customers', câu lệnh:
```
php artisan make:model LoyalCustomer
```
- Bạn cấu hình cho model 'LoyalCustomer' như sau
```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class LoyalCustomer extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
```
- Như bạn thấy model của chúng ta extends Authenticatable chứ không phải extends Model phải không nào. Bạn tạo auth để kiểm tra cho bảng dữ liệu của mình thì model tương tác với bảng dữ liệu của bạn phải extends Authenticatable rồi. Với model này bạn có thể sử dụng như model bình thường nhé, nghĩa là bạn có thể thêm, sửa, xóa hay truy vấn dữ liệu một cách bình thường.
- b3: Chỉnh sửa file auth
- Bạn vào config mở file auth.php lên và để ý hai phần chính trong file auth.php là 'guards' và 'providers' đây cũng là hai thành phần cốt lõi  của Authentication. Trước hết bạn xem đoạn code sau.
```php
//có sẵn
'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
        ],
//đây là đoạn mình thêm vào dùng để xác thực
        'loyal_customer' => [
            'driver' => 'session',
            'provider' => 'loyal_customers',
        ],
        'loyal_customer-api' => [
            'driver' => 'token',
            'provider' => 'loyal_customers',
        ],
    ],
```
- Như bạn thấy đoạn trên là code trong auth xây dựng sẵn để kiểm tra đăng nhập, đoạn dưới mình chỉ đổi tên 1 chút còn gần như hoàn toàn giống đoạn trên.
- Guard các bạn cứ hiểu như là một cách cung cấp logic được dùng để xác thực người dùng. Trong Laravel, thường hay dùng session guard hoặc token guard. Session guard duy trì trạng thái người dùng trong mỗi lần request bằng cookie. Còn Token guard xác thực người dùng bằng cách kiểm tra token hợp lệ trong mỗi lần request.

Vì vậy, như bạn thấy, guard xác định logic của việc xác thực, và không cần thiết để luôn xác thực bằng cách lấy các thông tin hợp lệ từ phía back-end. Bạn có thể triển khai một guard mà chỉ cần kiểm tra sự có mặt của một thông tin cụ thể trong headers của request và xác thực người dùng dựa trên điều đó.
- Tiếp theo bạn xem đoạn code với thành phần chính thứ 2 là 'providers'.
```php
//có sẵn trong auth.php
'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],
//truy suất dữ liệu cho bảng
        'loyal_customers' => [
            'driver' => 'eloquent',
            'model' => App\LoyalCustomer::class,
        ],
    ],
```
- Như ban thấy Providers lấy ra dữ liệu người dùng từ phía back-end. Nếu guard yêu cầu người dùng phải hợp lệ với bộ lưu trữ ở back-end thì việc triển khai truy suất người dùng sẽ được providers thực hiện.Laravel hỗ trợ cho việc người dùng truy suất sử dụng Eloquent và Query Buider vào database. Tại 'model' là đường dẫn đến model của bạn, bạn nào để mode 'LoyalCustomer' trong Models/LoyalCustomer thì phải sửa đường dẫn này lại thành 'model' => App\Models\LoyalCustome::class. Cũng như bạn thấy với 'providers' laravel xây dựng sẵn và mặc định model được kiểm tra là model User. Để thay đổi tại phần 'model' bạn có thể sửa đường dẫn tới model User( 'model' => App\User::class) thành tên model mà bạn muốn kiểm tra nhưng nhớ tại bảng dữ liệu của bạn phải có trường email để kiểm tra hoặc nếu không có trường email mà bạn muốn kiểm tra với trường name thì đơn giản trong model 'LoyalCustomer'  bạn phải sửa trường email thành name là được.
- Dưới đây là file auth.php đầy đủ.
```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | here which uses session storage and the Eloquent user provider.
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | Supported: "session", "token"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
        ],
        'loyal_customer' => [
            'driver' => 'session',
            'provider' => 'loyal_customers',
        ],
        'loyal_customer-api' => [
            'driver' => 'token',
            'provider' => 'loyal_customers',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | If you have multiple user tables or models you may configure multiple
    | sources which represent each model / table. These sources may then
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],

        'loyal_customers' => [
            'driver' => 'eloquent',
            'model' => App\LoyalCustomer::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | You may specify multiple password reset configurations if you have more
    | than one user table or model in the application and you want to have
    | separate password reset settings based on the specific user types.
    |
    | The expire time is the number of minutes that the reset token should be
    | considered valid. This security feature keeps tokens short-lived so
    | they have less time to be guessed. You may change this as needed.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,
        ],
        'loyal_customers' => [
            'provider' => 'loyal_customers',
            'table' => 'password_resets',
            'expire' => 60,
        ],
    ],

];
```
- Tại phần 'passwords' chúng ta đăng ký tài khoản với hệ thống thì trường password phải tối thiểu 60 ký tự và tối đa 255 ký tự nhé.
### 3.5 Xây dựng controller và chạy thử.
- Dài dòng là thế nhưng chỉ với 3 bước đơn giản bạn đã cấu hình song auth để kiểm tra đăng nhập cho bảng 'loyal_customers' rồi đấy. Vậy sao mà biết với 3 bước đơn giản trên thì code của mình chắc đã đúng và sẽ hoạt động được.
-  Quay lại với phần đầu khi mình tạo controller và migrate. để test xem nó có thực sự hoạt động thì bạn tiếp tục xíu nữa để test xem nó đã thực sự chạy chưa nhé.
- Bạn vào controllers và mở Usercontroller.php mà bạn đã tạo bên trên lên. Ở routes bạn đã cấu hình cho controller này rồi đúng không và controller này nó có 2  phương thức 'getLogin' và 'postLogin', nếu bạn chưa tạo thì tạo đi nhé bên trên mình đã hướng dẫn rồi đấy. Sau khi đã mở 'UserController.php' lên bạn cấu hình như sau (đừng quên bước 4 là use thư viện auth vào nhé).
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\LoyalCustomer;//user model can kiem tra
use Auth; //use thư viện auth

class UserController extends Controller
{
    public function getLogin()
    {
        return view('login');//return ra trang login để đăng nhập
    }

    public function postLogin(Request $request)
    {
        $arr = [
            'email' => $request->email,
            'password' => $request->password,
        ];
        if ($request->remember == trans('remember.Remember Me')) {
            $remember = true;
        } else {
            $remember = false;
        }
        //kiểm tra trường remember có được chọn hay không
        
        if (Auth::guard('loyal_customer')->attempt($arr)) {

            dd('đăng nhập thành công');
            //..code tùy chọn
            //đăng nhập thành công thì hiển thị thông báo đăng nhập thành công
        } else {

            dd('tài khoản và mật khẩu chưa chính xác');
            //...code tùy chọn
            //đăng nhập thất bại hiển thị đăng nhập thất bại
        }
    }
}
```
- Đến đây còn thiếu mỗi cái view 'login' nữa thôi. bạn tạo file login.blade.php trong thư mục view như sau:
```html
<form method="post">
  <h1>Login</h1>
  <input name="email" placeholder="Username" type="email" required="">
  <input name="password" placeholder="Password" type="password" required="">
  <button>Submit</button>
  {{ csrf_field() }}
</form>
<style type="text/css">
	form {
  box-sizing: border-box;
  width: 260px;
  margin: 100px auto 0;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  padding-bottom: 40px;
  border-radius: 3px;
}
form h1 {
  box-sizing: border-box;
  padding: 20px;
}
 
input {
  margin: 40px 25px;
  width: 200px;
  display: block;
  border: none;
  padding: 10px 0;
  border-bottom: solid 1px #1abc9c;
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #1abc9c 4%);
  background-position: -200px 0;
  background-size: 200px 100%;
  background-repeat: no-repeat;
  color: #0e6252;
}
input:focus, input:valid {
  box-shadow: none;
  outline: none;
  background-position: 0 0;
}
input:focus::-webkit-input-placeholder, input:valid::-webkit-input-placeholder {
  color: #1abc9c;
  font-size: 11px;
  transform: translateY(-20px);
  visibility: visible !important;
}
 
button {
  border: none;
  background: #1abc9c;
  cursor: pointer;
  border-radius: 3px;
  padding: 6px;
  width: 200px;
  color: white;
  margin-left: 25px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
}
button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
}
</style>
```
- OK rồi bạn chạy thử vầ nhập dữ liệu xem có ra gì không nào
- Đây là kết quả khi mình nhập đúng và nhập sai. Vậy là đã kiểm tra được rồi đó các bạn.

![](https://images.viblo.asia/51cbbaa2-2df1-4b58-88c4-8bcdae4015b1.png)

![](https://images.viblo.asia/dbf87873-4e44-46a2-bf21-5fc13147bee6.png)

- Các bạn có thể tùy chỉnh code sao cho phù hợp với nhu cầu hoặc áp dụng vào project nếu cần.
## 4. Cách dùng.
- Để kiểm tra check trong auth bạn có thể dùng guard cách dùng như sau.
- kiểm tra đăng nhập thay vì auth::check() đấy là với auth.php có một guard bây giờ bạn có 2 hay nhiều guard thì cần gọi cụ thể guard cần check.
- vd: 
+ Auth::guard('loyal_customer')->attempt($arr)
+ Auth::guard('loyal_customer')->check()
+ Auth::guard('loyal_customer')->id()
+ ... tương tự.
## 5. kết luận.
Bài viết tuy dài nhưng để check đăng nhập với auth thì chỉ cần thông qua hai bước đơn giản thế thôi những râu ria dài dòng kia là để mình thực hành trực tiếp xem kết quả có thành công hay không các bạn có thể lấy code đấy để test thử.
Như vậy mình đã giới thiệu cho các bạn về việc kiểm tra đăng nhập với 2 hay nhiều bảng khác nhau với authentication trong Laravel, còn rất nhiều hàm mà Auth hỗ trợ, các bạn có thể xem trong documentation của nó nhé. Mọi thắc mắc gì hãy comment phía dưới bài viết của mình nhé. Thank!