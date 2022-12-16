Khi sử dụng [Form Request Validation](https://laravel.com/docs/5.7/validation#form-request-validation), nó có thể thực sự tiện dụng để có thể thao tác request data trước khi chạy bất kỳ validation rules nào. Điều này có thể là:
* Ép dữ liệu thành định dạng validation mong đợi (ví dụ: chuyển đổi danh sách các value được phân tách bằng dấu phẩy thành một mảng).
* Chuyển đổi kiểu dữ liệu (ví dụ: từ string sang integer hoặc string sang boolean)
* Bắt lỗi người dùng như viết sai chính tả,..
* Loại bỏ nội dung không phù hợp hoặc có khả năng độc hại khỏi dữ liệu đầu vào.
### Ví dụ về form request
Ví dụ để lưu 1 bài post vào cơ sở dữ liệu, ta sẽ validate cho nó như sau:
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:200',
            'body' => 'required',
            'tags' => 'required|array|max:10',
            'is_published' => 'required|boolean',
            'author_name' => 'required',
        ];
    }
}
```
Bây giờ giả sử người dùng đã submit form để tạo bài post và dữ liệu truyền vào như sau:
```php
[
    'title' => 'My bolg post',
    'body' => 'This is the <script>alert('Evil!')</script> post body.',
    'tags' => 'laravel,code,updates',
    'is_published' => 'true',
    'author_name' => 'Ben Sampson',
]
```
Ta thấy trong **tags** được gửi đi là 1 danh sách các value được phân tách bằng dấu phẩy và **is_published** đầu vào là 1 string. Cả 2 trường này sẽ bị báo lỗi mặc dù đúng nội dung nhưng sai về định dạng.<br>
Ngoài ra trong 1 số trường hợp xui xẻo thì **title** có thể lỗi sai chính tả và **body** có thể dính mã độc. Mặc dù về mặt kỹ thuật đây có thể không phải là vấn đề của validate, nhưng chúng ta vẫn có thể giúp người dùng từ chính họ và bảo vệ ứng dụng của mình.
### Method *prepareForValidation*
Nhìn vào lớp ***Illuminate\Foundation\Http\FormRequest*** tất cả các form request đều được extend, ta có thể thấy nó sử dụng 1 trait để gọi ValidatesWhenResolvedTrait. Trait chứa method mà ta đang tìm kiếm cho phép chúng ta truy cập vào dữ liệu yêu cầu trước khi xác thực bất kỳ thứ gì bắt đầu. Method này được đặt tên là **prepareForValidation** và mặc định không được hành động, có nghĩa nó được đặt ở đó với mục đích duy nhất là bị ghi đè.
```php
protected function prepareForValidation()
{
    // no default action
}
```
### Thao tác dữ liệu được request
Bên trong form request, chúng tao có thể sử dụng method **prepareForValidation** để xác định bất kỳ request nào vào.<br>
Bởi vì lớp **FormRequest** kế thừa lớp **Request**, ta có thể truy cập thông qua hàm helper **merge** để có thể chỉ update các giá trị đầu vào mà ta cần. Chúng ta cũng có thể truy cập giá trị đầu vào như các thuộc tính trên lớp
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:200',
            'body' => 'required',
            'tags' => 'required|array|max:10',
            'is_published' => 'required|boolean',
            'author_name' => 'required',
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'title' => fix_typos($this->title),
            'body' => filter_malicious_content($this->body),
            'tags' => convert_comma_separated_values_to_array($this->tags),
            'is_published' => (bool) $this->is_published,
        ]);
    }
}
```
Sử dụng các hàm helper magic này, chúng ta đã có thể quản lý được dữ liệu đầu vào như sau trước khi validate được thực hiện:
```php
[
    'title' => 'My blog post',                  // ✅ Lỗi chính tả dc fix.
    'body' => 'This is the post body.',         // ✅ Loại bỏ các mã độc hại!
    'tags' => ['laravel', 'code', 'updates'],   // ✅ bây giờ đã là 1 mảng!
    'is_published' => true,                     // ✅ đúng dạng boân
    'author_name' => 'Ben Sampson',         
 ```
 Các giá trị được update theo yêu cầu, vì thế chúng ta truy cập chúng trong controller sau khi thực hiện xác nhận, chúng ta sẽ lấy lại các giá trị bị thao túng.<br>
 Nguồn bài: https://sampo.co.uk/blog/manipulating-request-data-before-performing-validation-in-laravel?fbclid=IwAR2eicdofY5nNxuOaemD3dDRTLJm0n5Be9dRvchRy2bZJZC4-ZIBO1xedAA