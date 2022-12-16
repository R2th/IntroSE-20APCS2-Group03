Việc validate là rất cần thiết kể cả về phía server hay là client. Và chắc hẳn khi chúng ta mới làm quen với laravel sẽ biết đến cách validate này
```
/**
 * Store a new blog post.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ]);
 
    // The blog post is valid...
}
```
Theo như document là Laravel cung cấp, ta đang sử dụng chức năng validate() được cung cấp bở class Request, nếu các field của chúng ta thỏa mãn các điều kiện theo yêu cầu thì hàm store sẽ tiếp tục xử lý bình thường. Nếu mộ trong các field không thỏa mã yêu cầu sẽ sinh ra Exception đồng thời trả lại lỗi cho người dùng ở dạng phù hợp.
Nếu chúng ta có nhiều field cần validate thì việc này sẽ làm cho controller của ta khá là dài.
Để giải quyết vấn đề này Laravel đã cung cấp cho ta một công cụ là Form Request
#  Cách tạo Form Request
Laravel cung cấp cho chúng ta câu lệnh 
```
php artisan make:request <tên class bạn muốn tạo>
```
Câu lệnh này sẽ tạo cho ta một class trong thư mục Request. Và mặc định trông nó sẽ như thế này:
```
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
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
Để sử dụng được form request này thì bạn cần use chúng ở trong controller
Giả sử như mình tạo một class tên là StorePostRequest:
```
php artisan make:request StorePostRequest
```
Sử dụng trong controller ở đây mình sử dụng cho hàm store:
```
use App\Http\Requests\StorePostRequest;
.........
public function store(StorePostRequest $request){
............
}
```
## authorize():
Dùng để xác định xem người dùng nào có quyền thực hiện request này. Thường mình sẽ sửa lại thành return true tương ứng với ai cũng có thể thực hiện request này.Tạm thời cái này chúng ta chưa bàn đến
## rules():
Dùng để xác định các quy tắc cho các fields mà chúng ta truyền lên:
Cách thiết lập rules sẽ giống như chúng ta validation bên controller. Nó sẽ giống như thế này
```
public function rules()
{
    return [
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ];
}
```
Cách validate trên vẫn khá đơn giản. Giả sử chúng ta trong trường hợp cần validate phức tạp hơn. Ví dụ như chúng ta có thêm một trường comments kiểu array chẳng hạn. Và trông nó sẽ kiểu như thế này:
```
[
    {
        vote: '1',
        content:'test validate'
    },
    {
        vote: '2',
        content:'test validate'
    },

]
```
Giả sử chúng ta muốn validate cái trường vote kia là integer chẳng hạn. Không thể dùng 'vote' => 'integer' được.Lúc đó chúng ta phải dùng thế này:
```
'comements.*.vote' => 'integer'
```
Dấu * ở đằng sau laravel sẽ hiểu là để truy cập vào từng phần tử của mảng, .vote là để truy cập đến thuộc tính vote của mỗi phần tử.
Trường hợp phải validate một mảng truyền lên gặp khá là nhiều nên mình liệt kê ở đây. Ngoài ra vẫn còn nhiều trường hợp phức tạp khác nhưng hiện tại mình chưa nghĩ ra :)))
Ngoài các rules mình liệt kê ở trên ra thì laravel còn cung cấp cho chúng ta khá nhiều rules nữa các bạn có thể xem tại đây :https://laravel.com/docs/9.x/validation#available-validation-rules
Sau khi pass qua các rules này rồi thì controller sẽ tiếp tục được thực hiện.Còn nếu không pass thì server sẽ trả lại một message mặc đinh được laravel thiết lập sẵn tương ứng với từng rules.Để config lại phần message này thì chúng ta sẽ dùng hàm message().
## message()
Để config lại phần message mà server trả ra theo ý của bạn thì chúng ta phải ghi đè hàm message của laravel. Chúng ta sẽ tạo một hàm message ở trong request mà chúng ta vừa tạo:
```
public function messages()
{
    return [
        'title.required' => 'A title is required',
        'body.required' => 'A message is required',
        .........
    ];
}
```
Ở đây title.required là chúng ta đang config lại phần message cho rule required của trường title. Và với các trường khác cũng tương tự như vậy : 'tên-trường.rule' => '..........'
# Kết bài
Ở trên mình đã nêu ra những thứ cơ bản về form request hi vọng là sẽ giúp ích được cho các bạn khi mới làm quen với framework laravel. Bài viết chắc hẳn sẽ còn nhiều thiếu sót các bạn có thể góp ý cho mình bằng cách comment ở dưới. Và cuối cùng cảm ơn các bạn rất nhiều vì đã giành thời gian đọc bài viết của mình 😄😄😄