# Giới thiệu
Chào các bạn, như các bạn cũng đã biết Laravel cung cấp cho chúng ta nhiều Rule để validation dữ liệu như `required`, `integer`, `date`, `min`, `max`, `unique`, .... Tuy nhiên nếu chúng ta muốn validation của mình theo các Rule mà Laravel không hỗ trợ thì sao? Để đáp ứng việc này, Laravel còn cho phép chúng ta *Custom Validate Rules*, tức là cho phép chúng ta định nghĩa các Rule mà chúng ta mong muốn. Ở các phiên bản Laravel < 5.5, việc *Custom Validate Rules*  được thực hiện bằng cách sử dụng phương thức `extend` đặt trong phương thức `boot()` của `AppServiceProvider` (https://laravel.com/docs/5.6/validation#using-extensions). 

Từ phiên bản 5.5, Laravel cung cấp thêm một cách *Custom Validate Rules* là sử dụng **Rule Objects**. Đến phiên bản 5.6, thì Laravel cung cấp thêm một cách nữa là sử dụng **Closures**. Trong bài viết này, chúng ta sẽ cùng tìm hiểu về 2 cách *Custom Validate Rules* mới nhất này nhé. 
# Custom Validate Rules với Rule Objects
**Bước 1: Tạo View** 

Ở đây mình đã tạo sẵn một view với 2 trường là **Text** và **Number**
```
<!DOCTYPE html>
<html>
<head>
    <title>Custom Valdiation Rule on Laravel 5.6</title>
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Custom Valdiation Rule on Laravel 5.6</div>

                    <div class="card-body">
                        <form method="POST" action="{{ route('custom') }}">
                            @csrf

                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">Text</label>

                                <div class="col-md-6">
                                    <input type="text" name="text" 
                                        class="form-control{{ $errors->has('text') ? ' is-invalid' : '' }}"
                                        value="{{ old('text') }}" 
                                        required autofocus>

                                    @if ($errors->has('text'))
                                        <span class="invalid-feedback">
                                            <strong>{{ $errors->first('text') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Number</label>

                                <div class="col-md-6">
                                    <input type="text" name="number" 
                                        class="form-control{{ $errors->has('number') ? ' is-invalid' : '' }}" required>

                                    @if ($errors->has('number'))
                                        <span class="invalid-feedback">
                                            <strong>{{ $errors->first('number') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Let's Go
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

**Bước 2: Tạo Controller, Route**  

Chúng ta sẽ tạo controller `ValidateRuleCustomController` như ở dưới:
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValidateRuleCustomController extends Controller
{
    public function show()
    {
        return view('validate');
    }

    public function validateCustom(Request $request)
    {
        return 'You have validated success';
    }
}
```

Tiếp theo, chúng ta tạo 2 Route trong file `routes/web.php`, một cái dùng để hiển thị view, và một cái khi submit dữ liệu sẽ validate và trả về kết quả:
```
Route::get('/custom-rule/show', 'ValidateRuleCustomController@show');

Route::post('/custom-rule/validate', 'ValidateRuleCustomController@validateCustom')
    ->name('custom');
```

**Bước 3: Validation** Ở đây mình sử dụng Form Request để validate dữ liệu.

Tạo **Form Request** với tên là `ValidationRequest` bằng lệnh sau:
```
php artisan make:request ValidationRequest
```
Sau khi chạy lệnh bạn sẽ nhận được file `app/Http/Requests/ValidationRequest.php`. 

Sau đó, bạn thêm đoạn code ở dưới vào file (bạn nhớ `return true` trong phương thức `authorize()` để request hoạt động):
```
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'text' => 'required',
            'number' => 'required','integer',
        ];
    }
}
```
Sử dụng `ValidationRequest` mới tạo vào **Controller**:

Khai báo sử dụng `ValidationRequest` trong controller `app\Http\Controllers\ValidateRuleCustomController`:
```
use App\Http\Requests\ValidationRequest;
```
Sử dụng `ValidationRequest` thay cho `Request` ở phương thức `validateCustom(Reques $request)`
```
public function validateCustom(ValidationRequest $request)
```

Bây giờ bạn đã có một validation đơn giản. Tuy nhiên ở đây, nếu mình muốn trường **text** chỉ nhận một chuỗi IN HOA thì như thế nào? Để giải quyết việc này, chúng ta sử dụng *Custom Validate Rules* bằng **Rule Object** của Laravel. Tiếp tục đến bước 4 nào.

**Bước 4: Tạo Rule Object** 

Vấn đề đặt ra: Trường **text** chỉ nhận một chuỗi IN HOA

Tạo một **Rule Object** với tên là `UppercaseRule` bằng lệnh sau:
```
php artisan make:rule UppercaseRule
```
Sau khi chạy lệnh bạn sẽ nhận được file `app/Rules/UppercaseRule.php`. Sau đó, bạn thêm đoạn code như ở dưới:
```
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class UppercaseRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return (strtoupper($value) === $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be Uppercase.';
    }
}
```
*Ở đây một **Rule Object** sẽ có 2 phương thức là `pasess` và `message`. 

+ Phương thức `passes($attribute, $value)` với `$attribute` là tên của thuộc tính được validate, `$value` là giá trị của thuộc tính đó. Phương thức này nên được `return true` hoặc `false` tùy thuộc vào việc thuộc tính `$attribute` có hợp lệ hay không.
+ Phương thức `message()` trả về một thông báo nếu validation thất bại. Bạn cũng có thể gọi phương thức `trans()` ở đây để `i18n` nếu bạn muốn.

Sử dụng `UppercaseRule` mới vừa tạo vào **Form Request**:

Khai báo sử dụng `UppercaseRule` trong file `app/Http/Requests/ValidationRequest.php`
```
use App\Rules\UppercaseRule;
```
Gọi UppercaseRule trong phương thức `rules()`
```
    public function rules()
    {
        return [
            'text' => [
                'required',
                new UppercaseRule(),
            ],

            'number' => 'required|integer',
        ];
    }
```
Thật đơn giản để tạo một **Rule Custom** với **Rule Object** phải không nào. Tương tự như trên, bạn có thể tạo ra các **Rule** mà bạn mong muốn rồi đấy. 

Tiếp theo chúng ta sẽ tìm hiểu thêm một cách nữa để tạo một **Rule Custom**.
# Custom Validate Rules với Closures
**Bước 1: Tạo View, Controller, Route:**   Mình sẽ sử dụng lại view, controller, route của ví dụ trên.

**Bước 2: Tạo Rule với Closure:**  

Vấn đề đặt ra: Ở đây mình muốn trường **number** chỉ nhận các số chia hết cho 5.

Bạn chỉ cần thêm đoạn code ở dưới vào phương thức `rules()` trong file `app/Http/Requests/ValidationRequest.php`

```
    public function rules()
    {
        return [
            'text' => [
                'required',
                new UppercaseRule(),
            ],

            'number' => [
                'required',
                'integer',
                function ($attribute, $value, $fail) {
                    if ((($value % 5) != 0) || ($value == 0)) {
                        return $fail('The ' . $attribute . ' must be divisible by 5');
                    }
                }
            ],
        ];
    }
```
*Ở đây:  chúng ta sẽ sử dụng một **Closure** trong mảng các **rule** của trường **number** để tạo một **Rule Custom** thay vì sử dụng một **Rule Object** để tạo. **Closure** này sẽ nhận 3 tham số  là:
+ `$attribute` : tên của thuộc tính được validate
+ `$value`: giá trị của thuộc tính đó
+ `$fail`: một `callback` mà nó sẽ được gọi khi validation thất bại. Bạn sẽ truyền thông báo mà bạn muốn trả về khi validation thất bại vào trong `callback` này.

Đơn giản phải không nào. Với **Closure** sẽ cho phép chúng ta tạo nhanh một **Rule Custom** hơn so với **Rule Object**. Tùy vào ứng dụng của bạn mà chọn cách thích hợp nhé.
# Kết luận
Qua bài này mình đã giới thiệu với các bạn 2 cách để tạo một **Rule Custom** trong Laravel 5.6. 
Hy vọng các bạn sẽ thích bài viết của mình.

Mình cũng chỉ vừa tiếp cận với Laravel thôi nên bài viết có gì sơ sót mong mọi người bỏ qua. (hehe)
# Tham khảo
https://laravel.com/docs/5.6/validation#using-rule-objects

https://laravel.com/docs/5.6/validation#using-closures