# Đặt vấn đề
Trước đây mình đã từng đặt một câu hỏi thế này trên Viblo: https://viblo.asia/q/laravel-login-su-dung-so-dien-thoai-khong-can-ma-nuoc-jeZ1eo1YZWz. Ngày đó mình vẫn thắc mắc rằng không biết các hệ thống người ta lưu trữ số điện thoại kiểu gì để có thể vừa đăng nhập được khi nhập mã vùng hoặc không nhập mã vùng. Ví dụ nhập +840981234789 hoặc 0981234789 hoặc 840981234789 thì đều đăng nhập được.Và sau một thời gian tìm hiểu và nghiên cứu mình cũng đã tìm được giải pháp cho vấn đề này và topic này mình sẽ chia sẻ với các bạn. Bắt đầu thôi...

# Thiết kế database
Để lưu trữ số điện thoại trong DB ta cần lưu mã vùng (+84), mã code (VN) và số quốc gia (0981234789). Như vậy ta sẽ tạo ra 1 bảng là `phone_numbers` để lưu trữ số điện thoại. Bảng này sẽ có các field là `region_code`, `country_code`, `national_number` và 1 field nữa gọi là `e164_format` là định dạng số điện thoại có đầy đủ mã vùng và số quốc gia ví dụ `+84981234789`
Để demo cho chức năng này ta tạo các migrations như sau:

users table:
```php
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
        Schema::dropIfExists('users');
    }
}
```

phone_numbers table:
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhoneNumbersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phone_numbers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('region_code');
            $table->string('country_code');
            $table->string('national_number');
            $table->string('e164_format');
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
        Schema::dropIfExists('phone_numbers');
    }
}

```

# Google's libphonenumber and Laravel Phone
Tiếp theo để hỗ trợ chúng ta trong việc parsing, format, validate số điện thoại của các quốc gia trên thế giới ta sẽ nhờ đến 1 thư viện của Google đó là https://github.com/googlei18n/libphonenumber. Rất tiếc thư viện này lại không hỗ trợ PHP. :smile: Nhưng đừng vội lo lắng vì đã có người viết lại thư viện này trên PHP. Đó là https://github.com/giggsey/libphonenumber-for-php. Bây giờ ta hãy xem nó làm được gì nào:
![](https://images.viblo.asia/53f2f886-95fb-4ce7-a3d8-f0e2b15cc345.jpg)
Với input đầu vào mà mã code quốc gia 2 kí tự và số quốc gia ta thấy thư viện này làm đc nhiều thứ hay ho phết. Có chuyển đổi sang các dạng format khác như E164, dạng số quốc tế... đồng thời còn có vaidation xem số có hợp lệ không còn xem nó là dạng số di động hay máy bàn nữa, tiện lợi quá. Vậy tiếp theo ta chỉ cần làm một màn hình đăng kí số điện thoại cho phép người dùng nhập vào mã vùng quốc gia và số quốc gia là mọi thứ đơn giản hơn rất nhiều rồi. 
thêm 1 chút nữa: thư viện này đã được tích hợp với Laravel qua package [Laravel Phone](https://github.com/Propaganistas/Laravel-Phone). Quá ngon phải không nào :smiley:

Tiếp theo ta sẽ nhờ đến Laravel để tạo khung đăng nhập đăng kí bằng câu lệnh `php artisan make:auth`. Sau đó ta cần sửa form đăng kí để có thể nhập số điện thoại. Tạm tưởng tượng như sau: 1 selectbox cho phép chọn mã vùng chứa toàn bộ thông tin các mã vùng trên toàn thế giới. Và 1 ô input nữa cho phép nhập số điện thoại quốc gia. Để làm cái selectbox kia thì ta có nhiều cách. Nếu làm thủ công thì ta cần danh sách mã quốc gia 2 kí tự của toàn bộ các nước trên thế giới....

# Package International Telephone Input
Trong lúc đang suy nghĩ tự mày mò để làm bằng tay cái selectbox kia thì mình lại thử dạo 1 vòng google xem có ai làm sẵn chưa và đúng như mình nghĩ 1 thư viện tuyệt vời nữa lại hiện ra trước mắt: [Intl tel input](https://github.com/jackocnr/intl-tel-input). Để sử dụng thư viện này thì quá đơn giản các bạn có thể đọc ở document của nó. Sau đây là đoạn code mình đã chỉnh sửa ở trang đăng kí.
```php

<div class="form-group row">
    <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('Phone number') }}</label>

    <div class="col-md-6">
        <input type="phone_number" class="form-control phone-number{{ $errors->has('phone_number') ? ' is-invalid' : '' }}" name="phone_number" value="{{ old('phone_number') }}" required>
        <input type="hidden" name="region_code">

        @if ($errors->has('phone_number'))
            <span class="invalid-feedback" role="alert">
                <strong>{{ $errors->first('phone_number') }}</strong>
            </span>
        @endif
    </div>
</div>


@section('style')
    <link href="{{ asset('css/intlTelInput.css') }}" rel="stylesheet">
@endsection

@section('script')
    <script src="{{ asset('js/intlTelInput.js') }}" defer></script>

    <script>
        $(function () {
            $('.phone-number').intlTelInput({
                initialCountry: "auto",
                geoIpLookup: function(callback) {
                    $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "VN";
                        callback(countryCode);
                    });
                },
                preferredCountries: ['vn', 'us', 'jp']
            });

            $(".phone-number").on("countrychange", function(e, countryData) {
                $(this).parents('.form-group').find('.region-code').val(countryData.iso2);
            });
        });
    </script>
@endsection
```

Ta có kết quả như sau:

![](https://images.viblo.asia/1c1e94ce-0ce2-48b5-a06f-e3a817bd78f8.jpg)

![](https://images.viblo.asia/cbaf0130-a4ad-4720-b049-5ab42d0bfbed.jpg)
Và bây giờ khi submit form thì sẽ gửi đồng thời cả input hidden region_code lên server để xử lý lưu vào DB. Giả sử ta chọn Việt Nam và nhập số 0981 234 789 thì gửi lên server sẽ là phone_number = 0981234789 và region_code=VN.

Và câu chuyện trên server sẽ diễn ra như sau:
```php
// Override lại các hàm trong app\Http\Controller\Auth\RegisterController.php
/**
 * Get a validator for an incoming registration request.
 *
 * @param  array  $data
 * @return \Illuminate\Contracts\Validation\Validator
 */
protected function validator(array $data)
{
    return Validator::make($data, [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6|confirmed',
        'phone_number' => 'phone:' . request()->get('region_code')
    ]);
}

/**
 * Create a new user instance after a valid registration.
 *
 * @param  array  $data
 * @return \App\User
 */
protected function create(array $data)
{
    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
    ]);

    $phoneNumberObject = phone($data['phone_number'], $data['region_code']);

    // Model User has one Model PhoneNumber
    $user->phoneNumber()->create([
        'country_code' => $phoneNumberObject->getPhoneNumberInstance()->getCountryCode(),
        'region_code' => $phoneNumberObject->getCountry(),
        'national_number' => $phoneNumberObject->getPhoneNumberInstance()->getNationalNumber(),
        'e164_format' => $phoneNumberObject->formatE164()
    ]);

    return $user;
}
```
Như vậy ta đã hoàn thành chức năng đăng kí sử dụng số điện thoại.

Bây giờ để đăng nhập bằng số điện thoại chấp nhận các loại format như bài toán ban đầu đặt ra thì flow tiếp theo sẽ như sau: Người dùng nhập số điện thoại và mật khẩu (bây giờ field số điện thoại chỉ còn 1 input chứ ko cho chọn mã vùng như ở đăng kí nữa để cho phép người dùng nhập tự do) => dựa vào ip người dùng ta lấy ra mã nước iso 2 kí tự. Và dùng thư viện LaravelPhone để parsing số điện thoại của người dùng ra dạng e164 format. Tiếp tục truy vấn vào bảng phone_numbers theo e164_format từ đó truy ra người dùng ở bảng user => Đăng nhập thành công.
Đến đây mình xin phép chỉ viết ra flow và không đi chi tiết nữa vì nó khá dễ rồi phải không. :smile:
# Kết bài
Như vậy với bài toán đơn giản lưu số điện thoại thế nào cho hợp lý vào Database mình đã giải quyết được bằng giải pháp trên. Nếu các bạn có ý tưởng gì hay ho cho vấn đề này thì chia sẻ thêm nhé. Bài viết đã quá dài rồi mình xin phép dừng lại tại đây. Xin cảm ơn các bạn đã theo dõi. 

## Tham khảo
* https://github.com/giggsey/libphonenumber-for-php#online-demo
* https://github.com/Propaganistas/Laravel-Phone
* https://github.com/jackocnr/intl-tel-input