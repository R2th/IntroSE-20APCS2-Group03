Xin chào các bạn,

Đi vài vòng tham khảo 1 số các project mình cũng thấy được nhiều điều thú vị mà mình cũng chưa biết, do đó nay mình xin chia sẻ 1 thứ mà mình biết được trong tuần vừa rồi :v Đó là cách validate request trong laravel, validate thì có tương đối nhiều cách nhưng xử lý bằng **Form Request Validation** giúp cho ta san sẻ được công việc mà Controller lẫn Model phải thực hiện và khiến cho code dễ đọc và đỡ rối hơn. Oke ta bắt đầu thôi.
# 1. Vấn đề
Đầu tiên bài toán chúng ta đưa ra là ta có 1 chức năng đăng ký được viết custom lại để dùng như 1 API.
Hàm **register()** sẽ nhận đầu vào gồm có '*email*' và '*password*' của người gửi. Thông thường ta sẽ hay viết như là : 
```php
public function register(Request $request)
    {
        // validate incoming request        
        $validator = Validator::make($request->all(), [
           'email' => 'required|email|unique:users',
           'password' => 'required'
       ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 404);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
       // finally store our user
        $user = User::create($input);
        return response()->json(['success' => 'Tạo thành công'], 200);
    }
```
Nhìn ở trên chúng ta thấy rằng có vẻ thằng Controller này đang phải đảm đương hơi  nhiều công việc, với việc xử lý logic đơn giản chúng ta đã phải tốn kha khá dòng code rồi, nếu logic phức tạp với nhiều validate hơn thì code sẽ thực sự rối. Đây là lúc ta cần đến ***Form Request***. 
# 2. Tạo Form Request
Ta sẽ tạo **FormRequest** qua lệnh artisan: 
> php artisan make:request RegisterRequest

Oke, lệnh này sẽ tạo ra cho chúng ta file *RegisterRequest* ở *App\Http\Requests*. File này gồm 2 default method là **authorize()** và **rules()**. 
Hàm authorize() này ta có thể check điều kiện có cho phép được sử dụng *request* này hay không.  Ví dụ cho dễ hiểu, giả sử mình ghét mấy thằng có IP: 127.0.0.1 thì mình sẽ chặn không cho mấy thằng nhãi ý đăng ký :
```php
public function authorize()
    {
        if(\Request::ip() == '127.0.0.1'){
            return false;
        }
            return true;
    }
```
Oke mấy thằng nhóc get out of my server. 

Mặc định khi bạn return false thì server sẽ trả về cho bạn lỗi 403 còn return true thì sẽ kiểm tra tiếp đến điều kiện input. À thế điều kiện input là gì ???

Thì điều kiện input được khai báo trong hàm **rules()**. Giả sử mình validate như sau:
```php
 public function rules()
    {
        return [
            'email' => 'required|max:255',
            'password' => 'required|min:5'
        ];
    }
```
À vậy là mình đã ép phải điền 2 trường này và số kí tự như trên. 

Tiếp theo trong controller chúng ta sẽ sửa lại: 
```php
public function register(RegisterRequest $request)
    {
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
       $user = User::create($input);
        return response()->json(['success' => 'Tạo thành công'], 200);
    }
```
# 3. Vấn đề tiếp theo...
Oke khá ngon rồi, giờ bật lên và chạy phát. Điều không ổn ở đây là khi mình login oke thì không sao nhưng khi điền sai hoặc thiếu thì đều trả về màn hình login. Hơi khó hiểu 1 chút. Sau 1 đọc thêm doc trên laravel thì mình thấy họ có thêm method **message()**. Oke vậy mình cũng sẽ thêm xem sao : 
```php
public function messages()
    {
        return [
            'email.required' => 'Email is required!',
            'password.required' => 'Password is required!',
            'password.min' => 'Password is too short',
        ];
    }
```
Lại bật lại lên và chạy, mọi thứ vẫn như cũ, lại phải *google* tiếp vợi. Sau 1 hồi mày mò thì mình cũng tìm thấy 1 hàm giải quyết được thằng này. mình sẽ override lại method  **failedValidation()** của class **FormRequest**. 

Đại khái mình sẽ thêm vào class **RegisterRequest**: 
```php
protected function failedValidation(Validator $validator) 
    {

        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json(
            [
                'error' => $errors,
                'status_code' => 422,
            ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
    }
```
oke bật lên thử bỏ trường *password* đi và cuối cùng cũng nhận được kết quả: 
```php
{
    "error": {
        "password": [
            "Password is required!"
        ]
    },
    "status_code": 422,
}
```
Mình có tìm hiểu qua thì thấy thằng **FormRequest** này cũng có hàm **failedValidation()**, thằng này có throw ra exception nhưng lại redirect : 
```php
protected function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator))
                    ->errorBag($this->errorBag)
                    ->redirectTo($this->getRedirectUrl());
    }
```
và thằng đệ **getRedirectUrl()** của nó thì
```php
protected function getRedirectUrl()
    {
        $url = $this->redirector->getUrlGenerator();

        if ($this->redirect) {
            return $url->to($this->redirect);
        } elseif ($this->redirectRoute) {
            return $url->route($this->redirectRoute);
        } elseif ($this->redirectAction) {
            return $url->action($this->redirectAction);
        }

        return $url->previous();
    }
```
có lẽ do nguyên nhân này mà nãy giờ khi mình điền fail nó thường trả về màn login mặc dù trang chủ báo :
> If validation fails, a redirect response will be generated to send the user back to their previous location. The errors will also be flashed to the session so they are available for display. If the request was an AJAX request, a HTTP response with a 422 status code will be returned to the user including a JSON representation of the validation errors.

Cái này mình mới thử chạy API trên postman không biết khi gọi request ajax thường sẽ như thế nào (vì chưa có đủ time test ae thông cảm, anh em nào verify được thì comment dưới bài cho mình phát). 

Okay thì trên là cách để mình xử lý 1 request gửi đến và kiểm soát nó. Ta có thể viết cho nó theo 1 design pattern để dễ xử lý hơn như đặt 1 interface Request rồi abtract BaseRequest gì đó cho đỡ tốn flow khi muốn sửa code.

Cảm ơn mọi người đã đọc, hy vọng bài viết có thể hữu ích :D 
### Nguồn tham khảo
* https://laravel.com/docs/5.7/validation#creating-form-requests
* https://medium.com/@kamerk22/the-smart-way-to-handle-request-validation-in-laravel-5e8886279271
* https://medium.com/@Sirolad/laravel-5-5-api-form-request-validation-errors-d49a85cd29f2