# Xử lý data từ người dùng trong Laravel

Tiếp theo bài viết về Laravel Routing, chúng ta sẽ cùng tìm hiểu về cách Laravel Handling User data (hay nói cách khác là request từ phía client.) Phần này bao gồm:
  - Xử lý request từ phía User
  - Mass assignment trong Eloquent models
  - Xử lý file upload
  - Validation form Request


## Inject User's Request

Cách nhanh nhất để có thể lấy được thông tin từ request của user là inject `Illuminate\Http\Request` object. Thông qua object này chúng ta có thể tương tác với dữ liệu mà user đã input bao gồm các tham số của POST/GET, url ... 

### Các cách để access Request object
Ngoài việc thực hiện inject Request object vào controller chúng ta có thể access Request object thông qua facade `Request` hoặc global helper function `request()`. 
Tuy nhiên lần này chúng ta sẽ xem cách inject `Illuminate\Http\Request` như bên dưới

```php
Route::post('form', function (Illuminate\Http\Request $request){
	//Access $request object logic
});
```
Chúng ta có thể tự hỏi, cái gì truyền vào `$request`, để trả lời câu hỏi này các bạn có thể xem bài viết liên quan đến Container ở đây.

Tiếp theo chúng ta sẽ bàn về các methods hay được sử dụng để lấy thông tin từ request object

### request()->all()
Lấy tất cả nội dung của request và trả về một array tương ứng. hàm `$request->all()` chỉ lấy các parameters nằm trong body của request, không bao gồm header. Tuy nhiên `$request->all()` vẫn có thể lấy các parameter được chỉ định trong url. 
Ví dụ 

```html
<form method="POST" action="/form?utm=112233">
	<input type="hidden" value="abc" name="key" />
	<input type="submit">
</form>
```

```php
Route::post('form', function(Illuminate\Http\Request $request){
	var_dump($request->all());
})
```

Output
```
[
	'key' => '123',
	'utm' => 112233,
]
```

Ta có thể thấy bên trong url `/form?utm=112233` có parameter và ta cũng có thể access parameter này (`utm`) thông qua `$request`

### request->except() và request->only()

Như tên gọi của nó. Chúng ta có thể loại bỏ một vài input hoặc chỉ lấy những input nằm trong whitelist. Việc sử dụng 2 hàm này cùng nhau sẽ cực kì hiệu quả (cũng như an toàn) để lọc các input chúng ta dùng cho Mass Assignments. (Mass assignment là gì thì một tí chúng ta sẽ tìm hiểu ở bên dưới.)

*🌈 Ví dụ*

```php
Route::post('form', function(Illuminate\Http\Request $request){
	var_dump($request->except('key'));
})
```

thì ta sẽ có
```
[
	'utm' => 112233,
]
```
Tương tự đối với `only()`

```php
Route::post('form', function(Illuminate\Http\Request $request){
	var_dump($request->only('key'));
})
```

thì ta sẽ có
```
[
	'key' => '123',
]
```

### request->has() và request->exists()
Như tên gọi của chúng, 2 hàm này kiểm tra xem một tham số có nằm trong request hay không.
Còn điểm khác biệt giữa `has()` và `exists()`  là:  `has()` sẽ trả về `FALSE` nếu một tham số tồn tại bên trong request và nó không có giá trị (null hoặc là chuỗi rỗng). `exists()` chỉ kiểm tra tham số có tồn tại trong request và trả về `TRUE` nếu nó tồn tại 

### request->input()
Nếu như `all()`, `only()` hay `except()` sẽ trả về chúng ta một mảng các request thì hàm `input()` sẽ cho ta một field trong request. Và chúng ta có thể truyền giá trị mặc định nếu field chúng ta muốn truy xuất không tồn tại bên trong request.

```php
$var = $request->input('field', 'default-value');
```

Tham số đầu tiên của hàm `input()` là tên field chúng ta muốn truy xuất, tham số thứ hai là giá trị mặc định chúng ta sẽ trả về nếu field muốn truy xuất không tồn tại.

### Array Input
Laravel còn cung cấp cho chúng ta một công cụ cực kì hữu hiệu khi truy xuất tham số theo dạng mảng.
Giả sử ta có
```html
<form method="POST" action="/form?utm=112233">
	<input type="text" name="members[0][firstName] value="John" />
	<input type="text" name="members[0][lastName]" value="Smith" />
	<input type="text" name="members[1][firstName]" value="Simsons" />
	<input type="text" name="members[1][lastName]" value="Timothy" />
	<input type="submit">
</form>
```

```php
Route::post('form', function(Illuminate\Http\Request $request){
	$memberZeroFirstName = $request->input('members.0.firstName');
	$allMemberFirstNames = $request->input('members.*.firstName');
	$memberZero = $request->input('members.0');
});
```

Output:
```
	//$memberZeroFirstName = "John",
	//$allMemberFirstNames = ["John", "Simsons"],
	//$memberZero = ["firstName" => "John", "lastName" => "Smith"],
```

Chúng ta cũng có thể sử dụng một cách khác bao gồm Facade, hoặc global helper để trích xuất data từ user input như đoạn code mẫu bên dứơi

```php
	request()->input('firstName'); //Global helper
	Request::input('firstName'); //Facade
```

## Route Data
Route của chúng ta cũng chính là một user data, hãy thử xem đoạn url bên dưới
`http://myapp.com/users/15` chúng ta có 2 segments là `user` và `15` và request object cung cấp cho chúng ta 2 methods để truy xuất đến từng segment bao gồm.
  - `request->segments()` : trả về một array các segment của nằm trong url
  - `request->segment($segmentId)`: trả về segment có id chỉ định. (segmentId có index là 1 do đó ở ví dụ trên thì `request->segment(1)` sẽ trả về `user`) 

## Uploaded Files
Để access thông tin file upload chúng ta sẽ sử dụng thông qua method `Request::file()` hàm này sẽ nhận tham số là `input_name` và trả về `Symfony\Component\HttpFoundation\File\UploadedFile`
Chúng ta chỉ có thể access thông qua method `file()` còn các method đề cập ở trên (`all()`, `only()` ...) chỉ trả về các parameter không phải là file.
Class `UploadedFile` là extends của class 	`SplFile` php, chúng ta có thể dùng các hàm bên dưới để thao tác file
  - `guessExtension()`
  - `getMimeType()`
  - `store()`
  - `storePublicly()`
  - `getError()`
  - `getClientOriginalName()`
  - `getClientOriginalExtension()`

Đa phần là các hàm liên quan đến việc lấy thông tin file, đoán biết extension ... 

**Lưu ý** : Khi upload file bạn cần chỉ định `enctype` của form cho chính xác (`multipart/form-data`)

## Validating Form Request
Laravel cung cấp cho ta vài công cụ để thực hiện validate request. Chúng ta có thể tự thực hiện validate hoặc sử dụng hàm `validate()` có sẵn trong từng Controller.

### sử dụng validate() trong từng controller
Controller của laravel đều có sử dụng `ValidateRequests` trait, trong trait này có cung cấp cho chúng ta một method `validate()`. Chúng ta thử xem đoạn code bên dưới và phân tích nhé

```php
class RegisterController extends Controller{
	public function create(){
		return view('user.register');
	}
	public function store(Request $request){
		$this->validate($request,[
			'email' => 'required|unique:users',
			'name' => 'required|max:125',
		]);
		//If validate OK, proceed to store this User to database
	}
}
```

Đoạn validate dù chỉ dài có 4 dòng. Nhưng thật sự nó chứa đựng rất nhiều logic bên trong đó. Trước tiên chúng ta define những field input mà chúng ta sẽ validate ở đây là `email` và `name`. Các rules input có thể được tiếp nối với nhau thông qua dấu `|` chúng ta có thể define một field là `required` và limit số ký tự mà nó có thể nhận được `max:125` chẳng hạn.
Nếu `validate` method OK, thì đoạn xử lý bên dưới sẽ được tiếp tục, còn không thì `ValidationException` sẽ được throw, tương ứng với việc chúng ta sẽ dừng xử lý. Nếu route này được gọi thông qua Ajax thì một response dạng Json sẽ được tạo ra chưa message lỗi. Nếu không phải là gọi Http Ajax thì Laravel sẽ redirect về màn hình trước đó + các thông tin lỗi để chúng ta xử lý và hiển thị lên màn hình.

**Các rule validate mà Laravel hỗ trợ**: 
Chúng ta có thể thấy laravel hỗ trợ khá nhiều ở đoạn Sample trên chẳng hạn. Bên dưới liệt kê ra một số pattern dùng để validate mà Laravel hỗ trợ sẵn 
  - *Require the field*
	  - `required`, `required_if`
	  - `required_unless`
  - *Field phải chứa một ký tự bất kỳ*
	  - `alpha` , `alpha_dash`, `integer`
  - *Input phải là một pattern nào đó (email, ip, hay url chẳng hạn)*
	  - `email`, `ip`, `active_url`

....
Các bạn có thể tham khảo thêm ở đây: 
https://laravel.com/docs/5.6/validation#available-validation-rules


### Manual Validation 
Nếu chúng ta không sử dụng hàm `validate` có sẵn trong controller, chúng ta hoàn toàn có thể tự tạo một `validator` và dùng nó để validate input từ request.

Ví dụ:
```php
Route::post('register', function(Illuminate\Http\Request $request){
	$validator = Validator::make($request->all(), [
		'email' => 'required|unique:users|email',
		'name' => 'required|max:200', 
	]);
	if ($validator->fails()){
		return redirect('register')
				->withErrors($validator)
				->withInput
	}
	//Information is valid, so save it.
})
```

Ở đây khi check `$validator->fails()` chúng ta đã kết thúc xử lý và trả về error cho enduser.

### Hiển thị error messages
Ở 2 phần trên chúng ta đã đề cập đến việc khi validate failed thì sẽ có một response (redirect hoặc json response) trả về cho enduser có kèm với thông tin lỗi. 
Chúng ta có thể dùng view để hiển thị error cho end-user như bên dưới

```php
@(Technical Blog)[Publish]if ($errors->any())
	<ul id="errors">
		@foreach ($errrors as $error)
			<li>{{ $error }} </li>
		@endforeach
	</ul>
@endif
```
## Eloquent Mass assignment

Ở phần đầu chúng ta có đề cập đến việc tại sao dùng `request->only()` và `request->exept()` chẳng hạn có thể nâng cao được security. Thử xem đoạn code ở bên dứơi

```php
	Route::post('update-profile', function(Request $request){
		$user = auth()->user(); //get current loggedin user
		$user->update($request->all()); // update current user. 
	});
```

Ở đây chúng ta  gọi `update($request->all())` . Đây gọi là **Eloquent Mass assignment**. Chúng ta không chỉ định rõ ràng nhưng field nào trong model User sẽ được update, chúng ta truyền toàn bộ request và Laravel sẽ tự mapping field của model với input của Request.  Giả sử chúng ta chỉ muốn update lại `name` và `email` của user, nhưng bằng cách nào đó, user cũng có truyền `id` lên một cách cố tình, và chúng ta update luôn cả `id` thành một giá trị khác, như thế thì không tốt phải không nào. 
Vì vậy khi chúng ta sửa lại thành bên dưới

```php
	Route::post('update-profile', function(Request $request){
		$user = auth()->user(); //get current loggedin user
		$user->update($request->only(['email', 'name'])); // update current user. 
	});
```

Thì sẽ nâng cao được security của hệ thống, tránh việc update những fields mà mình không muốn update. 

***Note** 
Model trong laravel cũng có hỗ trợ việc chỉ cho phép mass assign những fields nằm trong `$fillable` . Chúng ta sẽ tìm hiểu về việc này thông qua bài viết tiếp theo

## Kết luận
Chúng ta có thể access đến request thông qua facade, global helper hoặc inject vào trong route, chúng ta có các hàm để tương tác với request object đồng thời validate được request thông qua manual validator hoặc hàm `validate` của Controller. 
Khi một request bị validate failed, chúng ta sẽ nhận được một response (redirect hoặc json) có kèm thông tin lỗi để hiển thị lên màn hình.