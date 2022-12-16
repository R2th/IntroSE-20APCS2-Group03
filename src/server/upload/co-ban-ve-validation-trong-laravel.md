Cho dù các bạn đang sử dụng ngôn ngữ lập trình  nào thì việc kiểm tra tính hợp lệ của dữ liệu khi người dùng gửi lên cũng đều rất cần thiết. Trong bài viết này mình sẽ giới thiệu với các bạn về việc xử lý dữ liệu đầu vào bằng cách sử dụng Validation trong Laravel <br>
# 1. Tạo đường dẫn
Đầu tiên chúng ta tạo ra 2 đường dẫn để thao tác, ví dụ với việc đăng nhập người dùng:
```sql
Route::get('login', 'LoginController@getLogin');
Route::post('login', 'LoginController@postLogin');
```
* Route GET Login sẽ điều hướng đến hàm getLogin trong LoginController và trả về hiển thị form nhập dữ liệu đăng nhập của user
* Route POST Login sẽ điều hướng đến hàm postLogin trong LoginController, tại đây sẽ xử lý việc Validation dữ liệu do Client gửi lên và xử lý thao tác đăng nhập với dữ liệu nhận được.
# 2. Tạo Controller xử lý
Tiếp theo, chúng ta sẽ tạo ra Controller để xử lý với 2 route trên. Các bạn chạy:
```php
php artisan make:controller LoginController
```
File LoginController.php sẽ tự động được sinh ra trong thư mục app/Http/Controllers. Các bạn thêm vào 2 function getLogin và postLogin như sau:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getLogin()
    {
        return view('login');
    }

    public function postLogin(Request $request)
    {
        //Validate and login user....
    }
}
```
# 3. Validate dữ liệu đầu vào
Ở đây route GET Login sẽ trả về cho chúng ta 1 form nhập liệu như sau:
![](https://images.viblo.asia/5325a321-cfec-4cdd-92f2-f6dbf709121d.jpg)
Vấn đề ở đây là chúng ta cần kiểm tra xem dữ liệu nhập vào đã đúng định dạng hay chưa, cụ thể là:
* **email:** bắt buộc nhập vào với đúng định dạng email
* **password:** bắt buộc nhập vào và phải gồm tối thiểu 8 kí tự <br>
Nếu như chưa biết đến validation mà Laravel cung cấp thì điều đầu tiên chúng ta nghĩ đến sẽ là:
```perl
public function postLogin(Request $request)
{
    $email = $request->email;
    $password = $request->password;

    if( kiểm tra định dạng của email && kiểm tra định dạng của password) {
        // xử lý việc đăng nhập
    } else {
        return false;
    }
}
```
Việc xử lý kiểm tra email và password ở đây mất khá nhiều thời gian và có thể bạn phải tách riêng ra để xử lý chứ không thể viết trực tiếp trong hàm if() được. Nếu tiếp tục xử lý như vậy với những form có nhiều trường hơn thì thật sự là vấn đề cần xem xét.<br>

Thật may là laravel đã hỗ trợ Validation cho việc này.
## Sử dụng validate() được cung cấp bởi class Request
```php
public function postLogin(Request $request)
{
    $validatedData = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:8',
    ]);

    //....
}
```
Theo như [document Laravel](https://laravel.com/docs/7.x/validation) cung cấp, ở đây, ta đang sử dụng chức năng validate() được cung cấp bởi class Request, nếu các field của chúng ta thỏa mãn các điều kiện theo yêu cầu thì hàm store sẽ tiếp tục xử lý bình thường. Nếu một trong các field không thỏa mã yêu cầu sẽ sinh ra Exception đồng thời trả lại lỗi cho người dùng. <br>

Ngoài ra, các quy tắc xác thực có thể được chỉ định dưới dạng các mảng quy tắc thay vì một |chuỗi được phân tách đơn lẻ :
```php
public function postLogin(Request $request)
{
    $validatedData = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required', 'string', 'min:8'],
    ]);

    //....
}
```
Cả hai cách viết trên đều hợp lệ và đều trả về các lỗi tuơng ứng với từng trường dữ liệu cho người dùng. Tuy nhiên chúng sẽ trực tiếp trả về erros và redirect lại trang form. 
Trong trường hợp bạn không muốn dùng hàm validate() được cung cấp bởi class Request và muốn ***tự mình quyết định khi có lỗi sẽ thực hiện hành động gì hoặc chuyển hướng đi đâu*** thì có thể sử dụng Validator facades.
```php
public function postLogin(Request $request)
{
    $validator = Validator::make($request->all(), [
         'email' => 'required|email',
         'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
        // Do something
    }
}
```
Để có thể sử dụng được Validator các bạn cần phải thêm `use Validator;` ở phần khai báo đầu Controller.
## Sử dụng Form Request Validation
Với 2 phương pháp trên các bạn đã tiết kiệm được kha khá thời gian và công sức trong viêcj kiểm tra dữ liệu đầu vào. Tuy nhiên thì nếu đúng theo MVC thì nhiệm vụ của Controller là * điều hướng* dữ liệu, nó không nhất thiết phải kiêm luôn cả nhiệm vụ xử lý dữ liệu đầu vào, và Laravel đã cung cấp một giải pháp để tách riêng việc xử lý kiểm tra dữ liệu đầu vào.<br>
Đối với các tình huống xác thực phức tạp hơn, yêu cầu kiểm tra nhiều trường dữ liệu đầu vào hơn bạn có thể muốn tạo một form request riêng. Yêu cầu biểu mẫu là các lớp yêu cầu tùy chỉnh có chứa logic xác thực. Ta làm như sau:
```php
php artisan make:request LoginRequest
```
Commant trên sẽ sinh ra file LoginRequest.php bên trong thư mục app/Https/Requests với nội dung:
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            //
        ];
    }
}
```
Function rules() sẽ là nơi định nghĩa quy định cho các field của chúng ta. Bây giờ chúng ta chỉ cần bê nguyên những điều kiện như ở trên xuống đặt trong function rules():
```php
public function rules()
    {
        return [
             'email' => 'required|email',
             'password' => 'required|string|min:8',
        ];
    }
```
Bây giờ để bên LoginController hiểu được nó cần phải sử dụng LoginRequest để kiểm tra dữ liệu đầu vào chúng ta cần `use App\Http\Controllers\Request\LoginRequest`  vào phần đầu của LoginController đồng thời cần thay thế Request mặc định truyền vào trong hàm postLogin bằng LoginRequest như sau:
```javascript
 public function postLogin(LoginRequest $request)
    {
        //Do something...
    }
```
Bây giờ LoginController sẽ chỉ cần thực hiện nhiệm vụ tiếp theo là kiểm tra xử lý chức năng đăng nhập của ngươì dùng nếu dữ liệu gửi lên đã "vượt qua vòng kiếm duyệt" đầu tiên.<br>
Bạn có thể tùy chỉnh các thông báo lỗi được sử dụng bởi yêu cầu biểu mẫu bằng cách ghi đè messages phương thức. Phương thức này sẽ trả về một mảng các cặp thuộc tính / quy tắc và các thông báo lỗi tương ứng của chúng. Ở đây chúng ta thực hiện điều này bằng cách thêm 1 function messages vào LoginRequest như sau:
```php
public function messages()
{
    return [
        'email.required' => 'Bạn bắt buộc phải nhập Email',
        'email.email' => 'Email không đúng định dạng',
         'password.required' => 'Bạn bắt buộc phải nhập password',
         //...
    ];
}
```
# 4.Hiển thị thông tin lỗi trả về
Trong blade template của Laravel cung cắp sẵn cho chúng ta một object chứa trong biến có tên là ***$errors*** là thể hiện của class Illuminate\Support\MessageBag. Tất cả các lỗi validation được sinh ra sẽ đều được lưu trữ trong biến này và sau đó ở bên giao diện bạn có thể dùng biến này để hiện thị dữ liệu theo ý muốn của bạn. Một số hàm thường sử dụng để lấy ra và hiển thị lỗi bên blade template:
* $errors->any(): Kiểm tra xem có lỗi nào không
* $errors->all(): Lấy toàn bộ lỗi (thường dùng trong vòng lặp foreach)
* $errors->has('<name_input>'): Kiểm tra xem có lỗi nào cho input field có name là <name_input> hay không
* $errors->first('<name_input>'): Lấy ra lỗi đầu tiên của input field có name là <name_input> 
Cụ thể, để hiển thị toàn bộ những lỗi trả về khi validate dữ liệu ta làm như sau:
```php
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
```
Tuy nhiên trong thực tế thì không ai lại hiển thị toàn bộ lỗi trả về cùng một chỗ như vậy mà sẽ hiển thị lỗi tuơng ứng bên dưới từng trường để người dùng tiện theo dõi và điều chỉnh cho phù hợp. Cụ thể trong file balde chúng ta làm như sau:
```html
<form action="/login" method="post">
    @csrf

    <div class="form-group">
        <label class="label">Email</label>
        <div class="control">
            <input class="input" type="email" placeholder="e.g. barryallen@example.com" name="email">
        </div>
        <p class="help is-danger">{{ $errors->first('email') }}</p>
    </div>

    <div class="form-group">
        <label class="label">Password</label>
        <div class="control">
            <input class="input" type="password" placeholder="Your password" name="email">
        </div>
        <p class="help is-danger">{{ $errors->first('password') }}</p>
    </div>

    <button type="submit"> Login </button>
</form>
```
Kết quả thu được như sau:
![](https://images.viblo.asia/b96385b2-9182-43b8-a544-c2444c92644b.png)
# Tổng kết
Mong ra qua bài viết này của mình các bạn sẽ hiểu hơn về cơ bản cách sử dụng validation của Laravel để kiểm tra dữ liệu đầu vào.<br>
Nếu thấy bài viết hữu ích thì đừng quên cho mình 1 upvote nhé, cảm ơn các bạn.