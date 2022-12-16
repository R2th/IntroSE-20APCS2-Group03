# Giới thiệu
Chào mọi người, chắc các bạn đã quá quen thuộc với các avatar mặc định của `Google`. Bạn có thể nhận thấy, các ảnh avatar mặc định này khá là thú vị, nó được tạo theo tên viết tắt của mỗi tài khoản người dùng. Và hôm nay, trong bài viết này mình sẽ hướng dẫn các bạn tạo các ảnh avatar theo tên viết tắt như vậy trong ứng dụng `Laravel` bằng package `laravolt/avatar`.
# Cài đặt
Chạy lệnh sau để  cài đặt `laravolt/avatar`:
* Đối với Laravel >= 5.2
    ```
    composer require laravolt/avatar
    ```
* Đối với Laravel < 5.2 
    ```
    composer require laravolt/avatar ~0.3
    ```
# Service Provider & Facade
Từ phiên bản Laravel 5.5 trở đi thì `laravolt/avatar` sẽ được tìm thấy tự động (auto-discovery). Ngược lại đối với các phiên bản Laravel < 5.5, bạn cần thêm providers và aliases cho `laravolt/avatar` trong file `config/app.php`:
```
'providers' => [
    ....
    Laravolt\Avatar\ServiceProvider::class
],

'aliases' => [
    ....
    'Avatar'    => Laravolt\Avatar\Facade::class,
],
```
# Sử dụng
1. **Tạo ảnh dưới dạng dữ liệu Base64**:
    ```
    Avatar::create('Peter Paker')->toBase64();
    ```
    Dòng code này sẽ tạo một ảnh với 2 chữ viết tắt của tên mà bạn đã truyền vào (ở đây mình truyền vào là "Peter Paker", vậy kết quả sẽ là "PP") và chuyển ảnh đã tạo thành dữ liệu `Base64`, bạn có thể hiển thị dữ liệu này thành hình ảnh thông qua thuộc tính `src` của thẻ `img` như sau:
    
    ```
    <img src="{{ Avatar::create('Peter Paker')->toBase64() }}" />
    ```
2. **Lưu ảnh thành file**:
    
    Bạn có thể lưu ảnh thành file với phương thức `save()`. Bạn còn có thể tùy chỉnh chất lượng ảnh với tham số `quanlity` (có giá trị từ 0 - 100), giá trị mặc định là 90.
    ```
    Avatar::create('Tony Stark')->save('sample.png');
    Avatar::create('Tony Stark')->save('sample.jpg', 100); // quality (0 - 100)
    ```
3. **Tạo ảnh dưới dạng SVG**:
    ```
    Avatar::create('Steve Roger')->toSvg();
    ```
    Phương thức `toSvg()` sẽ tạo ảnh dạng svg, bạn chỉ cần copy và paste dòng lệnh này vào nơi bạn muốn hiển thị ảnh.
# Một số cấu hình
Bạn hãy chạy lệnh sau để tạo file cấu hình `config/laravolt/avatar.php` của `laravolt/avatar`:
```
php artisan vendor:publish --provider="Laravolt\Avatar\ServiceProvider"
```
Mở file này lên, ta có thể thấy được tất các các tùy chọn cấu hình cơ bản. Một số tùy chọn quan trọng:
* `height` và `width`: thiết lập chiều cao và chiều rộng của ảnh.
* `ascii`: Giá trị mặc định là `false`, mặc định `laravolt/avatar` sẽ lấy các chữ cái đầu của từ để tạo tên viết tắt, tuy nhiên đối với các kí tự Non-ASCII (ā, Ě, ǽ, ...) thì `laravolt/avatar` sẽ phụ thuộc vào font đã thiết lập, nếu font này có hỗ trợ thì sẽ hiển thị, ngược lại thì không. Nếu giá trị của tùy chọn này được thiết lập là `true` thì `laravolt/avatar` sẽ tự động thay thế các kí tự thành các kí tự ASCII gần nhất (ví dụ "Ě" sẽ thay thế thành "E", "á" sẽ thành "a", ...).
* `shape`: thiết lập hình dạng ảnh ("circle" - hình tròn hoặc "square" - hình vuông). Mặc đình là hình tròn, nhưng các bạn nên thiết lập thành hình vuông rồi dùng css để thay đổi hình dạng mà mình mong muốn.
* `chars`: Số kí tự tối đa của tên viết tắt, giá trị mặc định là 2.
* `backgrounds` và `foregrounds`: Thiết lập màu nền và màu chữ, mặc định là một mảng các giá trị màu sắc, `laravolt/avatar` sẽ lấy ngẫu nhiên một giá trị trong mảng này để tạo màu nền và màu chữ cho ảnh.
* Ngoài ra còn có các tùy chọn thiết lập khác như `fonts`, `fontSize`, `border`, ...

# Một số phương thức hỗ trợ
Trong nhiều trường hợp, bạn muốn tạo ảnh với các giá trị thiết lập khác mặc định mà không muốn thay đổi file `config/laravolt/avatar.php`. Để giải quyết vấn đề đó `laravolt/avatar` còn cung cấp cho chúng ta một số phương thức:
* Thiết lập kích thước ảnh với `setDimension()`:
    ```
    Avatar::create('Bruce Banner')->setDimension(100); //width = height = 100 pixel
    Avatar::create('Bruce Banner')->setDimension(100, 200); // width = 100, height = 200
    ```
* Thiết lập màu nền với `setBackground()`:
    ```
    Avatar::create('Bruce Banner')->setBackground('#001122');
    ```
* Thiết lập màu chữ với `setForeground()`:
    ```
    Avatar::create('Bruce Banner')->setForeground('#999999');
    ```
* Thiết lập font với `setFont()`:
    ```
    Avatar::create('Bruce Banner')->setFont('/path/to/font.ttf');
    ```
* Thiết lập hình dạng ảnh với `setShape()`:
    ```
    Avatar::create('Bruce Banner')->setShape('square');
    ```
* .... (Xem thêm các phương thức khác tại [đây](https://github.com/laravolt/avatar))

Bạn có thể thiết lập cùng lúc nhiều giá trị bằng cách nối các phương thức với nhau:
```
Avatar::create('Thor')->setDimension(50)->setFontSize(18)->toBase64();
```
Ngoài ra bạn còn có thể lấy một đối tượng `Image` với phương thức `getImageObject()`, phương thức này sẽ trả về một thể hiện của [Intervention image](http://image.intervention.io/) để bạn có thể sử dụng cho các mục đích khác.
```
Avatar::create('Groot')->getImageObject();
```
# Ứng dụng vào Laravel
1. **Tạo migration:** 

    Ở đây mình sẽ tạo một bảng users đơn giản với các trường name, email, password và avatar:
    ```
    <?php

    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class CreateUsersTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('users', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('email')->unique();
                $table->string('password');
                $table->string('avatar')->nullable();
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
            Schema::dropIfExists('users');
        }
    }
    ```
    Bạn hãy chạy lệnh sau để tạo bảng nhé:
    ```
    php artisan migrate
    ```
   
2. **Tạo model**: 

    Tạo một model `App\Models\User.php` như sau: 
    ```
    <?php

    namespace App\Models;

    use Illuminate\Notifications\Notifiable;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Avatar;

    class User extends Authenticatable
    {
        use Notifiable;

        /**
         * The attributes that are mass assignable.
         *
         * @var array
         */
        protected $fillable = [
            'name', 
            'email', 
            'password',
            'avatar',
        ];

        /**
         * The attributes that should be hidden for arrays.
         *
         * @var array
         */
        protected $hidden = [
            'password',
        ];
    }
    ```
    
3. **Tạo ảnh avatar mặc định**:

    Mình sẽ `append` thêm vào model thuộc tính `avatar_path` để chứa đường dẫn avatar của user. Đồng thời mình sẽ sử dụng `Accessors` để lấy giá trị của thuộc tính này. `Accessors` này có nhiệm vụ kiểm tra xem thuộc tính `avatar` của user có rỗng hay không, nếu rỗng thì sẽ tạo và trả về một avatar mặc định theo tên viết tắt của user, ngược lại sẽ trả về avatar hiện tại của user. Bạn hãy thêm đoạn code sau đây vào file `App\Models\User.php`:
    ```
    protected $appends = [
        'avatar_path'
    ];

    public function getAvatarPathAttribute()
    {
        if (empty($this->attributes['avatar'])) {
            return Avatar::create($this->attributes['name'])
                ->setDimension(30, 30)
                ->setFontSize(10)
                ->setShape('square')
                ->toBase64();
        }

        return $this->attributes['avatar']; 
    }
    ```
4. **Sử dụng**:

    Bạn chỉ cần gọi `$user->avatar_path` ở thuộc tính `src` của thẻ `img` ở bất kì view nào mà bạn muốn hiển thị avatar của user:
    ```
    <img src="{{ $user->avatar_path }}" title="avatar">
    ```
5. **Kết quả demo**:

![](https://images.viblo.asia/8bc428c6-a6f8-494a-963d-a3db98e56bfa.png)

Nhìn nó khá là thú vị và giống với `Google` phải không các bạn, với các avatar như thế này, ứng dụng web của bạn sẽ chuyên nghiệp hơn, gây thiện cảm với người dùng hơn là việc dùng 1 ảnh nào đó để thiết lập avatar mặc định. Không chỉ là users bạn còn có thể dùng nó để  tạo avatar tên viết tắt cho teams, groups,... Trong demo này mình chỉ sử dụng `laravolt/avatar` thông qua một `Accessors` đơn giản, tuy nhiên bạn có thể tùy biến sử dụng theo cách của riêng bạn. 
    
   Tuy package này được phát triển cho Laravel, tuy nhiên bạn còn có thể sử dụng nó vào các ứng dụng Php khác (xem thêm tại [đây](https://github.com/laravolt/avatar))
# Kết luận
Qua bài viết này, mình đã giới thiệu và hướng dẫn cho các bạn cách tạo ảnh avatar mặc định theo tên viết tắt trong ứng dụng `Laravel` thông qua `laravolt/avatar`. Đây là một package đơn giản nhưng vô cùng thú vị.

Hy vọng bài viết của mình sẽ giúp ích cho các bạn :).
# Tham khảo
[https://github.com/laravolt/avatar](https://github.com/laravolt/avatar)