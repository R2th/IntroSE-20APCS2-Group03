## Mở đầu
Trong hai bài viết trước của serie, mình đã giới thiệu với các bạn về vấn đề kiểm tra tính đúng đắn của dữ liệu nhập vào do người dùng cung cấp, cụ thể là cách kiểm trả dữ liệu và hiển thị lại lỗi cho người dùng. Ở bài viết này, mình sẽ hướng dẫn các bạn cách tạo ra những điều kiện dùng để kiểm tra dữ liệu do chính các bạn định nghĩa. Để hiểu được nội dung bài viết bạn nên có kiến thức cơ bản về cách validate dữ liệu trong Laravel, nếu không bạn có thể đọc lại các bài viết trước của mình nói về phần này ở [đây](https://viblo.asia/p/validation-trong-laravel-p1-Ljy5VxgVZra).

## Vấn đề
Laravel mặc định đã cung cấp cho chúng ta rất nhiều các điều kiện có thể sử dụng để kiểm tra dữ liệu đến, chi tiết các điều kiện mà Laravel cung cấp cũng như cách sử dụng các bạn có thể xem ở [đây](https://laravel.com/docs/5.6/validation#available-validation-rules) :
![](https://images.viblo.asia/0d61afed-39d5-4a1d-90ef-48878014e78e.png)
Tuy nhiên trong thực tế, không phải chỉ nhữngđiều kiện này là đủ cho project của chúng ta mà chúng ta có những điều kiện riêng cho project. Laravel cũng đã tính toán tới vấn đề này vì thế nó đã cung cấp cho chúng ta một số cách để tạo ra các điều kiện mới theo yêu cầu của cá nhân.

## Custom validation rules
Giả sử chúng ta có 2 field cần kiểm trả lần lượt là:
```html
<input type='text' name='name'>
<input type='text' name='number'>
```
Và chúng ta muốn validation 2 field trên với điều kiện như sau:
- `name`: 
    - Không được để trống
    - Tối thiểu 6 kí tự
    - Tất cả các từ phải viết hoa
 - `number`:
     - Không được để trống
     - Là số
     - Tổng của các chữ cái trong `name` + `number` phải là số chẵn (điều kiện này hơi vớ vấn các bạn thông cảm :)) ).

 Đây là form của chúng ta:
 
 ![](https://images.viblo.asia/a6e367b6-43f9-4d14-afd4-df744d3d459f.png)
 
 Chúng ta sẽ sử dụng **FormRequest** như trong bài viết trước đấy để validate form trên. Còn đây là những điều kiện cơ bản của Laravel mà ta dùng để validate 2 field trên:
 ```php
 public function rules()
{
    return [
        'name' => 'required|size:6',
        'number' => 'required|numeric',
    ];
}
 ```
Với nội dung điều kiện như trên, ta đã có thể thỏa mãn 2 điều điện đầu tiên của field `name` và điều kiện thứ nhất của filed `number` Để thực hiện việc validate tất cả các chữ viết hoa hay tổng các chứ của `name` và `number` chia hết cho 5, ta cần phải tự định nghĩa điều kiện này. Dưới đây là một số phương pháp mà Laravel cung cấp cho việc tự định nghĩa điều kiện: 
### 1. Sử dụng Closures
Nếu học `PHP` chắc hẳn bạn đã biết đến khái niệm `Closure`, để định nghĩa một điều kiện sử dụng Closure, ta cần sửa lại phần điều kiện của các field thành một `array` chứ không phải một `string` như ở trên, việc sửa đổi như sau:
```php
 public function rules()
{
    return [
        'name' => [
            'required',
            'size:6',
        ],
        
        'number' => [
            'required',
            'numeric'
        ]
    ];
}
```
Tiếp đến ta thêm một `Closure` có dạng như sau vào cả 2 field:
```php
function ($attribute, $value, $fail) {

}
```
`Closure` trên gồm có 3 biến mặc định là:
-  `$attribute`: chính là tên của field cần validate tương ứng, ở đây sẽ lần lượt là `name` và `number`.
-  `$value`: là giá trị nhận vào khi người dùng submit form.
-  `$fail`: là một `callback` được gọi đến khi việc validate thất bại. Đây chính là nơi mà bạn có thể truyền vào thông báo khi việc validate thất bại.

Sau khi thêm `Closure` vào điều kiệncủa chúng ta sẽ có dạng như sau:
```php
 public function rules()
{
    return [
        'name' => [
            'required',
            'size:6',
            function ($attribute, $value, $fail) {

            }
        ],
        
        'number' => [
            'required',
            'numeric'
            function ($attribute, $value, $fail) {

            }
        ]
    ];
}
```
Đầu tiên chúng ta sẽ tiến hành định nghĩa điều kiện yêu cầu cho field `name` phải được nhập vào dưới dạng uppercase như sau:
```php
function ($attribute, $value, $fail) {
    if (strtoupper($value) !== $value) {
        return $fail("The $attribute must be upper case");
    }
}
```
Như bạn thấy ở trên, ta chỉ việc sử dụng hàm `strtoupper()` có sẵn trong **PHP** để chuyển `$value` người dùng nhập vào sang dạng viết hoa và so sánh nó với `$value` gốc. Trường hợp `$value` của người dùng nhập vào là viết hoa thì việc validate là thành công và không có lỗi gì. Còn trong trường hợp ngườ dùng nhập không phải chữ in hoa sẽ lập tức dẫn đến điều kiện `if` đúng và sẽ chạy hàm `$fail()` và trả lại lỗi. Ở đây trong hàm `$fail()` ta có thể dùng `$attribute` để tạo thông báo về lỗi cho người dùng. Sau đó ta chạy thử submit lại form với điều kiện vừa nhập sẽ thu được kết quả như sau:
- Trường hợp để form trống:
![](https://images.viblo.asia/9e5fb729-2976-4641-a960-0aa972ee88d9.png)
- Trường hợp nhập nội dung cả 2 field như `name` < 6 kí tự và không viết hoa:
- 
 ![](https://images.viblo.asia/27b50275-c94f-4ba1-ba44-23b0fc018819.png)
- Nhập `name` > 6 kí tự nhưng không viết hoa:!
[](https://images.viblo.asia/835ec553-ec4b-40ec-b7f5-8160b38e361b.png)
- Nhập `name` thỏa mãn các điều kiện:
![](https://images.viblo.asia/7858e41d-8d80-4ae7-8507-ad80b9bcf5db.png)

*mình cố tình không nhập filed number để controller sẽ tự động redirect về form với giá trị cũ đã nhập để chứng minh nếu nhập đúng sẽ không có error*

Như vậy ta đã tạo được điều kiện thứ nhất yêu cầu toàn bộ nội dung field `name` nhập vào phải là uppercase. Tiếp đến với field `number` ta không những cần `$value` của chính nó mà còn cần cả `$value` của field `name`. Để thực hiện điều đó, ta làm như sau:
```php
function ($attribute, $value, $fail) {
    if ((strlen($this->name) + $value) % 2 != 0) {
        return $fail("Sum of $attribute and name's total chars must be an even number");
    }
}
```
Mặc định trong **FormRequest** ta có thể truy cập đến giá trị của các field khác thông qua từ khóa `$this->[name_of_the_field]`. Chính vì thể ở `Closure` trên ta có thể dùng `$this->name` để lấy giá trị field `name` rồi dùng để tính tổng và kiểm tra xem có phải số chăn không. Ta có thể thử nghiệm lại điều kiện vừa tạo như sau:
- Để trống `name` và nhập `number` là số lẻ:

  ![](https://images.viblo.asia/f1bfcefc-0b79-4bf7-9a90-420156857c77.png)

Như ta thấy 3 là số lẻ và `name` để trống nên tổng là 3 và là số lẻ nên validate fail.
- Để trống `name` và nhập `number` là số chẵn:

    ![](https://images.viblo.asia/5539783c-f37a-4b84-8ef7-751f843b832b.png)

Ở đây tổng là 4 là số chẵn nên validate thành công.

- Cuối cùng ta thử nhập cả `name` và `number` sao cho tổng thỏa mãn:

   ![](https://images.viblo.asia/f710ada6-9860-495a-82c6-7ca12c56332d.png)

Như vậy với `name` gồm 6 ký tự và `number` bằng 4 ta thu được tổng 10 là số chẵn nên thỏa mãn điều kiện của điều kiện ta vừa tạo. Trường hợp nhập tổng `name` và `number ` lẻ sẽ xuất hiện lỗi:<br/>

![](https://images.viblo.asia/642a8897-e853-48b5-a12e-63048d9d6ffd.png)


Đây là kết quả cuối cùng chúng ta thu được trong hàm `rules()` của **FormRequest**:
```php
public function rules()
{
    return [
        'name' => [
            'required',
            'min:6',
            function ($attribute, $value, $fail) {
                if (strtoupper($value) !== $value) {
                    return $fail("The $attribute must be upper case");
                }
            },
        ],

        'number' => [
            'required',
            'numeric',
            function ($attribute, $value, $fail) {
                if ((strlen($this->name) + $value) % 2 != 0) {
                    return $fail("Sum of $attribute and name's total chars must be an even number");
                }
            }
        ]
    ];
}
```

Với cách sử dụng `Closure` như ở trên, bạn đã có thể tự tạo ra những rule riêng phù hợp với project của mình tuy nhiên, trong trường hợp cùng một rule bạn tạo với `Closure` nhưng được sử dụng ở nhiều nơi khác nhau thì cách làm trên có vẻ không ổn cho lắm. Nếu chẳng may, bạn có thay đổi rule sẽ phải đi đến từng vị trí bạn copy `Closure` như ở ví dụ trên để sửa rất mất công. Chính vì thế, Laravel còn cung cấp cho chúng ta cách làm khác để giải quyết vấn đề này là `Rule Object`. Tuy nhiên `Rule Object`,
### 2. Rule Object
`Rule Object` là một class mà trong đó bạn có thể định nghĩa các custom rule của bạn tương tự như `Closure` và có thể gọi đến instance của class rule đó ở bất cứ đâu bạn cần. Nếu có thay đổi,  bạn chỉ cần mở lại class đó lên và chỉnh sửa thì tất cả các vị trí sử dụng instance của class sẽ được cập nhật theo. Để tạo một `Rule Object`, ta sử dụng cú pháp sau:
```bash
$ php artisan make:rule [class_name]
```
Ở đây mình sẽ làm ví dụ về cách tạo `Rule Object ` cho rule của field `number`. Còn lại field `name` bạn hãy dựa vào ví dụ của mình và tự làm theo để nắm rõ hơn cách sử dụng. Ta tiến hành tạo `Rule Object` với cú pháp nói trên:
```bash
$ php artisan make:rule CustomEvenNumber
```
Xong khi gõ lệnh trên, trong folder app của bạn sẽ xuất hiện một thư mục mới là `Rules`, bên trong đó sẽ chứa các class mà bạn dùng để định nghĩa các rule:

![](https://images.viblo.asia/7eab35ca-7b58-4044-978e-131402afd457.png)

Đây là nội dung bên trong của class `CustomEvenNumber`:
```php
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CustomEvenNumber implements Rule
{
    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        //
    }

    public function message()
    {
        return 'The validation error message.';
    }
}

```
Class này gồm có 3 hàm hình:
- `__construct()`: hàm khởi tạo của rule, nơi ta có thể truyền thêm các biến khác vào
- `passes()`: hàm để định nghĩa giá trị của filed cần valite có thỏa mãn hay không (2 biến `$attribute` và `$value` có giá trị tương tự như  sử dụng `Closure`)
- `mesage()`: thông báo trả về nếu điều kiện không thỏa mãn

Vì điều kiện ta cần tạo yêu cầu giá trị của field `name`, nên ta sẽ tiến hành truyền giá trị đó vào thông qua hàm `__construct()` như sau:
```php
protected $name;

public function __construct($name)
{
    $this->name = $name;
}
```
Tiếp đó trong hàm `passes()` ta sẽ định nghĩa nội dung tương tự với cách làm `Closure` nói trên. Tuy nhiên bạn nên chú ý  rằng với cách sử dụng `Closure` ta sẽ định nghĩa điều kiện dẫn đến việc validate thất bại còn trong hàm `passes()` ta định nghĩa điều kiện validate thành công -> nội dung của `Closure` và `Rule Object` là ngược nhau. Vì thế nội dung hàm `passes()` như sau:
```php
public function passes($attribute, $value)
{
    return (strlen($this->name) + $value) % 2 == 0;
}
```
Còn nội dung của `Closure`:
```php
function ($attribute, $value, $fail) {
        if ((strlen($this->name) + $value) % 2 != 0) {
            return $fail("Sum of $attribute and name's total chars must be an even number");
        }
    }
```
Bạn có thể thấy 2 điều kiện khác nhau, một là khác 0 còn một là bằng 0. Cuối cùng, trong hàm `message()` ta copy lại nội dung từ bên `Closure` và sửa lại một chút như sau:
```php
public function message()
{
    return "Sum of :attribute and name's total chars must be an even number";
}
```
Đây là nội dung hoàn chỉnh của class `CustomEventNumber`:
```php
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CustomEvenNumber implements Rule
{

    protected $name;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function passes($attribute, $value)
    {
        return (strlen($this->name) + $value) % 2 == 0;
    }

    public function message()
    {
        return "Sum of :attribute and name's total chars must be an even number";
    }
}
```
Quay lại bên **FormReques** ta sẽ xóa phần `Closure` của field `number` và thay class `CustomEvenNumber` như sau:
```php
'number' => [
    'required',
    'numeric',
    new CustomEvenNumber($this->name),
]
```
Tương tự như trong `Closure` ta cũng phải truyền vào `$this->name` là giá trị của field `name`. Bạn nhớ `use` class vừa tạo ở đầu class **FormRequest**:
```php
use App\Rules\CustomEvenNumber;
```
Cuối cùng, đây là nội dung hoàn chỉnh của **FormRequest**:
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\CustomEvenNumber;

class CustomRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => [
                'required',
                'min:6',
                function ($attribute, $value, $fail) {
                    if (strtoupper($value) !== $value) {
                        return $fail("The $attribute must be upper case");
                    }
                },
            ],

            'number' => [
                'required',
                'numeric',
                new CustomEvenNumber($this->name),
            ]
        ];
    }
}
```
**Lưu ý**: Khi dùng `Rule Object` hay `Closure` bạn đều có thể sử dụng `Eloquent` để truy cập tới CSDL.

## Kết bài
Đây là bài viết thứ 3 cũng là bài viết cuối cùng của mình về việc validate dữ liệu trong Laravel. Nếu bạn có bất cứ thắc mắc gì có thể comment ở phía bên dưới. Cảm ơn bạn đã đọc và hãy nhớ click nút **Up vote** :D :D :D  để ủng hộ mình .