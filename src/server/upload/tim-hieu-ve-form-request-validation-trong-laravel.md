Để dễ dàng validate dữ liệu phức tạp và nhiều trường cần validate thì Laravel cung cấp một giải pháp mà laravel gọi là
> custom request classes that contain validation logic.

Tạm dịch là một lớp tùy chỉnh nơi mà kiểm soát tính hợp lệ của dữ liệu đầu vào. Sau khi một request được gửi lên từ phía client thì request sẽ được validate dữ liệu bởi class form request trước khi được controller sử dụng
# Vậy làm sao để sử dụng nó
Rất đơn giản, bạn chỉ việc gõ dòng lệnh Artisan CLI
```
php artisan make:request NameRequest
```
là mọi thứ đã sẵn sàng cho bạn custom tại thư mục: *app/Http/Requests*
```
<?php
class CommentRequest extends FormRequest
{
    public function authorize()
    {
        return false;
    }

    public function rules()
    {
        return [
            //
        ];
    }
}
```
Tại class này bạn có thể thoải mái thêm vào các *validation rules* mà bạn muốn
```
 public function rules()
 {
      return [
          //   Let's add a few validation rules
           'comment' => 'required|string|max:255',
        ];
}
```
Hàm authorize() dùng để *Determine if the user is authorized to make this request* . Ví dụ như bạn muốn xác thực xem một người dùng có cố chỉnh sửa comment mà họ không sở hữu không.
```
public function authorize()
{
    $commentId = $this->route('comment');

    return Comment::where('id', $commentId)
        ->where('user_id', Auth::id())->exists();
}
```
Chú ý: commentId được lấy từ tham số của URI khi như tham số {comment} được truyền vào trong route bên dưới: 
```
Route::post('comment/{comment}');
```
Nêu hàm authorize() trả về false thì một HTTP response với status 403 sẽ được tự động trả về và controller method của bạn sẽ không được thực hiện. Nếu không cần xác thực gì thêm hoặc thực hiện việc đó ở một nơi khác bạn có thể `return true;` trong hàm authorize() cho lẹ :3
```
public function authorize()
{
    return true;
}
```
Hàm rules() sẽ trả về một mảng các messages errors nếu như dữ liệu không phù hợp với validation rules bạn yêu cầu. Dĩ nhiên bạn có thể thoải mái custom lại nó cho phù hợp với yêu cầu sử dụng.
Ví dụ như bạn muốn hiển thị message errors bằng tiếng việt trong khi các messages viết sẵn là tiếng anh chẳng hạn.
```
 public function messages()
 {
     return [
         'comment.max' => 'Nội dung bình luận phải có độ dài ngắn hơn 255 kí tự',
     ];
 }
```
Mọi việc đã xong bây giờ bạn chỉ cần 
```
use App\Http\Requests\CommentRequest;

public function store(CommentRequest $request)
{
    // logic code
}
```
là có thể sử dụng request đã được validate rồi.

Mình cũng mới học laravel chưa lâu nên bài viết còn nhiều thiếu sót :3 ahihi. Hẹn gặp trong các bài viết sau =))