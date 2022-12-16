> Khi validate dữ liệu, có khá nhiều rules mà laravel validation đã có sẵn, nhưng chúng ta không để ý và vẫn đi custom lại nó. Ở đây mình sẽ điểm qua một số rule cho mọi người xem có đúng mình đã quên nó hay không
## unique
 Có nhiều bạn thắc mắc tại sao mình lại nhắc đến unique này vào đúng không? Bình thường mọi người hay dùng unique rule để validate unique input. Điều này thì ai cũng biết. Cú pháp vẫn hay dùng là:
`field => unique: table_names`

Và nhiều khi việc unique nó cũng chỉ dừng lại như thế này. Tuy nhiên nếu unique trong table, và ignore  id đã chọn thì mọi người sẽ thấy hơi rối đúng không. Có thể mình diễn đạt như vậy sẽ thấy hơi khó hiểu đúng không. Mình sẽ lấy ví dụ cho dễ hiểu hơn về trường hợp này.

Ví dụ: trong table users, bạn thiết kế field email là unique. Khi edit user, có thể chỉnh sửa email, và thằng email được chỉnh sửa này vẫn phải unique với toàn bộ email của table thì mới hợp lý. Nếu bạn vẫn phang validate với cú pháp mình vừa nói ở trên áp dụng cho thằng input email này thì dữ liệu email sẽ phải unique với toàn bộ email của users. Và dĩ nhiên nó cũng phải unique với cả thằng email cũ. Nếu bạn muốn edit user bắt buộc edit cả thằng email thì không sao, nhưng nếu việc edit email là không bắt buộc thì unique ở đây sẽ bị sai.

Ở đây, laravel đã cũng cấp sẵn cho bạn trường hợp này rồi, trong docs cũng đã đề cập rồi nhưng có thể bạn sẽ bỏ qua hoặc lãng quên nó. Với cú pháp như sau bạn sẽ có thể thực thi unique rule với input là unique với toàn bộ email của table users, và ignore email của thằng user có id bạn truyền vào:
```
use Illuminate\Validation\Rule;

Validator::make($data, [
    'email' => [
        'required',
        Rule::unique('users')->ignore($user->id),
    ],
]);
```
hoặc đơn giản hơn, bạn có thể dùng cú pháp như sau
```
'email' => 'unique:users,email,' . $this->id,
```
## confirmed
Có thể nhiều người đã biết, tuy nhiên ở đây mình đề cập đến có thế cho mọi người nhớ lại hoặc ai chưa biết thì biết (hôm trước dự án mình làm có bạn vẫn không biết đó).

Thường chúng ta hay dùng trường này trong trường hợp validate password có yêu cầu nhập confirm password. Tức là input sẽ có trường: password và password_confirm, 2 trường này yêu cầu là phải giống nhau. Có nhiều bạn không biết đến rule confirmed và có thể sẽ tạo một rule bắt value của 2 thằng này giống nhau. 

Ví dụ, ở đây bạn validate thằng password input và map vs thằng input password confirm. Thằng input có name là password, thì thằng confirm sẽ là tổ hợp name của input cần confirm + hậu tố: confirmation. Tức là form có 2 input với name lần lượt là: password, password_confirmation. Rule chúng ta chỉ cần thiết lập:
```
'password' => ['required', 'confirmed']
```
## regex
Đối với regex thì chính xác là mình cũng mới đọc docs thấy nó thôi, chứ trước đây toàn tạo một rule mới tự code tay cho to tay thôi. Đọc đến thằng này mới thấy mình quê, laravel validation nó có sẵn mà không biết. Giống cái tên của rule đấy, rule này yêu cầu field cần validate phải match  phù hợp pattern của regex. Ai không biết regex thì có thể tự tìm hiều thêm nhé. Ở đây mình không giới thiệu đâu, bao giờ tay to thì mình mới nói về nó.

Cú pháp của regex sẽ như sau:
```
'field_name' => 'regex:pattern'
// ví du:
'password' => 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&"*()\-_=+{};:,<.>]).{8,255}+$/'
```

> Trên đây là nhưng rule mà mình thấy là bản thân mình và bạn bè xung quanh hay quên và bỏ qua nó. Các bạn có quên rule nào có thể đóng góp thêm bằng việc comment ở dưới bài viết của mình.
> 

Một số lưu ý nữa khi viết validate mình muốn nhắc các bạn:    
*     Custom Error Messages
*     Custom attribute name
## Custom Error Messages 
 Việc custom message error là hoàn toàn có thể, chứ không nhất thiết bạn phải dùng message default của laravel validation nhé
 Ví dụ như sau:
```
 $messages = [
    'required' => 'Tôi thích :attribute nay la bắt buộc với message thông báo này đó',
];

$validator = Validator::make($input, $rules, $messages);
```
## Custom attribute name
Ở message error thường xuất hiện yếu tố :attribute, attribute này được xác định chính là name của input. Tuy nhiên code chúng ta để một name theo đúng quy tắc ví dụ như user_id, nhưng đến lúc hiển thị chúng ta không muốn nó xuất hiện cái tên này sẽ làm người dùng kho hiểu, mà thay vào đó là cái tên dễ hiểu. Như vậy chúng ta cần custom atrribute name này. Việc này thực hiện rất dễ dàng bằng cách chúng ta thêm attribute vào array `attributes` ở file validation.php (resources/lang/xx/validation.php)
```
'attributes' => [
    'email' => 'email address',
    'user_id' => 'user'
],
```
### Lời chào: 
Trên đây là những chú ý mình muốn nhắc nhở khi viết validate. Hi vọng sẽ có ích với mọi người