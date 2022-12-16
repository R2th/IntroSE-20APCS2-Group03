Hôm nay mình xin chia sẻ một điều dù nhỏ nhưng khá thú vị về [request](https://laravel.com/docs/5.6/requests) trong Laravel. Đó là khi bạn lấy data từ request gửi về server. Cùng tìm hiểu nhé.

Trước tiên, mình có một ví dụ nhỏ sau đây. Bạn thường xử lý data dạng request POST cho các function *store()* hay *update()* của bạn như thế nào? Có vẻ đây là câu hỏi khá đơn giản nhỉ, nhưng thật ra có khá nhiều sự lựa chọn, đã bao giờ bạn thử liệt kê nó ra chưa?

```php
public function store(Request $request) {
  $email = $request->input('email'); // option 1
  $email = $request->get('email'); // option 2
  $email = $request->email; // even more simple?
  $email = request('email'); // there's also helper
  $email = data_get($request, 'email'); // did you even know this function?
}
```
Bạn thấy sao? Có điều gì khác biệt nhỉ?

Ok, tạm thời cứ bỏ qua hàm *data_get()* bởi vì nó chỉ là một [helper](https://laravel.com/docs/5.5/helpers#method-data-get) mà Laravel cung cấp giúp ta lấy ra value từ một array.
Còn những dòng code còn lại thì sao? Hầu hết chúng đều làm một công việc giống nhau. Nhưng điều khác biệt giữa chúng là ở một vài trường hợp mà có thể bạn chưa để ý. Cùng đi vào những cases đó nhé

## $request->get() và $request->input()
Ở trường hợp này, *input()* sẽ hữu ích hơn, vì nó giúp ta có thể lấy đc value từ nested data
```php
$name = $request->input('products.0.name'); // this will work
$name = $request->get('products.0.name'); // this will NOT work
$name = $request->get('products')[0]['name']; // this will work instead
```
Bạn có nhớ helper *data_get()* bên trên không? Thực tế là $request->input() là sự kết hợp của $request->get() và helper *data_get()*
Trong document chính thức của Laravel ở các ví dụ đều sử dụng *->input()* và thậm chí không đề cập tới *->get()*
## Direct property
Bạn đã bao giờ sử dụng *request->email* chưa? Nếu chưa bạn có thể ngó qua [đây](https://laravel.com/docs/5.5/requests#retrieving-input)
- *input()* hoạt động trong bất kể method nào của HTTP
- *input()* có thể lấy được các giá trị được từ request payload, bao gồm cả query string
Tiếp theo, *request->name* được nhắc tới như thế nào?
```
You may also access user input using dynamic properties on the Illuminate\Http\Request instance. When using dynamic properties, Laravel will first look for the parameter’s value in the request payload. If it is not present, Laravel will search for the field in the route parameters.
```

## request() helper
Đây là một helper mà Laravel cung cấp để chúng ta thuận tiện khi truy xuất các dữ liệu từ request.
Function này trả ra request instance hiện tại hoặc một giá trị theo key tương ứng:
```php
$request = request();
$value = request('key', $default = null);
```

Cơ bản thì nó chỉ là một cách viết ngắn gọn cho $request->input()
Và đương nhiên, đừng quên bạn có thể để default value ở param thứ 2 của function này trong trường hợp giá trị của key đó không tồn tại.

## Conclusion:
Trên đây là một vài điểm nhỏ nhưng khá hay mà chúng ta có thể ít để ý khi làm việc với Laravel. Nếu còn điều gì mà bạn đã trải qua cảm thấy hay ho thì đừng quên chia sẻ dưới comment nhé!!
## Reference:
https://laraveldaily.com/differences-request-get-vs-request-input-vs-helper-vs-get_data/