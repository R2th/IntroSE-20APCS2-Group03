> Xin chào moi người, chắc hẳn ai làm việc với Laravel cũng sẽ gặp phải trường hợp một request không được xử lý, sẽ làm cho chương trình gặp lỗi. Vậy nên việc xử lý request trước khi thao tác với chúng là điều vô cùng quan trọng. Và thật tuyệt vời khi Laravel có một số tính năng tuyệt vời giúp ta dễ dàng hơn trong việc xử lý.
****
## 1.  Xử lý trong controller

> Hầu hết chúng ta đều quen thuộc với việc sử dụng validator trong controller. Và đó là cách phổ biến nhất để xử lý xác thực cho yêu cầu đến.

* Ví dụ dưới đây là validator của một UserController

{@embed: https://gist.github.com/kamerk22/4ffe185b2418158d1c09f6117732fc0f}
* Cách này mặc dù không có gì là sai, nhưng đây không phải là cách tốt nhất khi mà validator trong controller, vì controller chỉ nên là nơi xử lý logic các request từ route và trả về cá phản hồi.

* Viết validator xác nhận trong controller sẽ phá vỡ Nguyên tắc chịu trách nhiệm duy nhất (The Single Responsibility Principle).

* Chúng ta đều biết rằng các yêu cầu thay đổi theo thời gian và mọi yêu cầu đều thay đổi trách nhiệm lớp học của bạn cũng thay đổi. Vì vậy, có nhiều trách nhiệm trong lớp đơn khiến việc quản lý rất khó khăn.
****
## 2. Xử lý với FormRequest

* Và để khắc phục cách trên, Laravel đã có Form Request, một lớp yêu cầu riêng biệt chứa validation xác thực. Để tạo một lớp `FormRequest`, bạn có thể sử dụng lệnh Artisan bên dưới.

  `php artisan make:request UserStoreRequest`

* Khi đó một lớp UserRequest sẽ được tạo ra trong thư mục ***app\Http\Request***
    
    {@embed: https://gist.github.com/kamerk22/c0d52b0d3e5fbbf21ad6766737ca1c2b}
    
* Lớp `FormRequest` có hai phương thức mặc định là `auth () `và `rules ()`.

* Bạn có thể thực hiện bất kỳ logic ủy quyền nào trong phương thức `auth ()` cho dù người dùng hiện tại có được phép yêu cầu hay không. Và trong phương thức `rules ()` bạn có thể viết tất cả các quy tắc hợp lệ của bạn.

* Có một phương thức `messages()` nơi bạn có thể truyền mảng thông báo xác thực của riêng mình.

> Và bây giờ chúng ta có thể sử dụng lớp `UserStoreRequest` này cho lớp `UserController` thay vì viết trực tiếp trong controller, giúp code trở nên trong sạch hơn =)))

{@embed: https://gist.github.com/kamerk22/c1e661132c0b12dce6524ea71e90941a}

* Nếu xác nhận không thành công, nó sẽ chuyển hướng người dùng đến vị trí trước đó với một lỗi.

* Tùy thuộc vào thông báo lỗi loại yêu cầu của bạn sẽ được flash trong session. Nếu yêu cầu là một AJAX thì một error với status: 422 sẽ được trả về ở định dạng JSON.

****
## 3. Bonus thêm
> Giả sử người dùng đã nhập số điện thoại di động như thế này + 99-9999–999999 hoặc + 99- (9999) - (999999). Lỗi rất phổ biến khiến chúng tôi không thể buộc người dùng phải nhập lại cùng một chi tiết.

> Một số ví dụ khác là người dùng đã nhập email như Foo@Bar.COM hoặc FOO@Bar.com. Hoặc nhập tên và họ như FOO bAR hoặc foo baR

> Giữ ứng dụng của bạn và Người dùng của bạn an toàn bằng cách dùng filter vào. Sử dụng filter trong ứng dụng của bạn, nó sẽ đảm bảo rằng dữ liệu của bạn luôn được định dạng và nhất quán. Trong nhiều trường hợp xác nhận không thành công do lỗi định dạng ngớ ngẩn.

> Sanitizer chứa các phương pháp để chuyển đổi và lọc dữ liệu của chúng tôi theo định dạng chung trước khi cung cấp cho trình xác thực.

Vậy nên có thể sử dụng gói [Waavi/Sanitizer](https://github.com/Waavi/Sanitizer) với nhiều filter.


Hãy tạo lớp abstract BaseFormRequest cho Form Request của chúng ta và sử dụng đặc điểm SanitizesInput ở đây:

{@embed: https://gist.github.com/kamerk22/a3ecda8706e775212987a2b952b7adf3}

* Sau đó hay để lớp `UserStoreRequest` kế thừa từ lớp `BaseFormRequest`

{@embed: https://gist.github.com/kamerk22/c6d293f2695dab9fa807550b1f509ef6}

* Đặc điểm SanitizesInput cung cấp một bộ lọc phương thức () để định dạng dữ liệu yêu cầu của chúng tôi trước khi cung cấp cho trình xác thực. filter () phương thức trả về mảng các bộ lọc hợp lệ. 
* Ở ví dụ trên chuyển đổi email người dùng thành chữ thường và cắt tỉa giống như cách chuyển đổi tên thành chữ hoa và thoát khỏi bất kỳ thẻ HTML nào.

## Phần kết luận

Lúc đầu, có vẻ như không cần thiết để tạo lớp validator cho tất cả. Nhưng hãy tưởng tượng đặt tất cả logic validate của bạn vào cùng một controller. Nó giống như một cơn ác mộng khủng khiếp 👻 khi nó đến để quản lý mã của bạn và tồi tệ nhất nếu ai đó phải quản lý nó =))))).

Bài viết tham khảo từ [The Smart Way To Handle Request Validation In Laravel ](https://medium.com/@kamerk22/the-smart-way-to-handle-request-validation-in-laravel-5e8886279271)

****
Cảm ơn bạn đã lắng nghe !!