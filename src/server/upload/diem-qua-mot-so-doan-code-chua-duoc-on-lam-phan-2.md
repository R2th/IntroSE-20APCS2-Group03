Bài viết dưới đây sẽ tiếp tục chỉ ra một vài trường hợp có thể gặp phải khi viết code PHP nói chung, Laravel nói riêng. Đó có thể là lỗi logic cơ bản, cách sử dụng hàm chưa hợp lý; Hoặc chỉ đơn giản là những lỗi convention không đáng có.

Ngoài ra, một vài ví dụ liên quan đến JS nói chung và Jquery nói riêng cũng sẽ được đề cập.

Phần 1 của series: [Điểm qua một số đoạn code chưa được ổn lắm (Phần 1)](https://viblo.asia/p/diem-qua-mot-so-doan-code-chua-duoc-on-lam-phan-1-1VgZv4W95Aw)

## 10. Sử dụng nhiều hàm `isset()` cùng lúc

Thay vì viết như sau:
```php
if (isset($a) && isset($b) && isset($c)) {...}
```

Có thể gộp thành một lời gọi hàm:
```php
if (isset($a, $b, $c) {...}
````

## 11. Thứ tự assertion chưa hợp lý khi viết Unit Test

```php
class A {
    function foo() {
        return true;
    }
}

function bar() {
    return new A();
}

$a = bar();
$this->assertTrue($a->foo());
$this->assertInstanceOf(A::class, $a);
```

Việc kiểm tra `$a` có phải instance của `A::class` hay không nên được thực hiện trước khi test các hàm bên trong `A::class`.

```php
$this->assertInstanceOf(A::class, $a);
$this->assertTrue($a->foo());
```

## 12. Dùng hàm `isset()` để kiểm tra null với cú pháp truy cập mảng trên `\Illuminate\Http\Request` (Laravel)
```php
public function foo(\Illuminate\Http\Request $request)
{
    if (isset($request['a'])) {
        var_dump('a is exist and not null');
    } else {
        var_dump('a is not exist nor null');
    }
}
```

Khi gửi request với `a = null`, hàm trên vẫn sẽ hiển thị kết quả bên trong điều kiện `if`, thay vì `else`.

Để có thể truy cập các thuộc tính của đối tượng `Request` với cú pháp dạng mảng, class `Request` phải implement interface [ArrayAccess](https://www.php.net/manual/en/class.arrayaccess.php).

Do đó, khi sử dụng `isset()` trên `$request['a']`, thực chất là đang gọi tới hàm [`offsetExists`](https://www.php.net/manual/en/arrayaccess.offsetexists.php) được implement trong class [`\Illuminate\Http\Request` ](https://github.com/laravel/framework/blob/5.8/src/Illuminate/Http/Request.php#L636).
```php
/**
 * Determine if the given offset exists.
 *
 * @param  string  $offset
 * @return bool
 */
public function offsetExists($offset)
{
    return Arr::has(
        $this->all() + $this->route()->parameters(),
        $offset
);
```

Hàm này chỉ kiểm tra sự tồn tại của `a` trong request gửi lên, chứ không kiểm tra giá trị của `a` có null hay không.
```php
isset($request['a']) === $request->offsetExists('a') // true;
```

Đây là điểm dễ nhầm lẫn khi hàm `isset()` mặc định sẽ kiểm tra một biến có tồn tại và khác null hay không.

Vì vậy, hãy thận trọng khi sử dụng cú pháp array trên đối tượng `\Illuminate\Http\Request`: `if (isset($request['a']) && !is_null($request['a']))`; hoặc chuyển về dạng array khi sử dụng hàm `isset()`
```php
public function foo(\Illuminate\Http\Request $request)
{
    $data = $request->only('a');
    if (isset($data['a'])) {
        var_dump('a is exist and not null');
    } else {
        var_dump('a is not exist nor null');
    }
}
```

## 13. Dùng magic method vô tội vạ
```php
public function foo(\Illuminate\Http\Request $request)
{
    $title = $request->title;
    $content = $request->content;
    var_dump($title);
    var_dump($content );
}
```

Đoạn code trên là ví dụ điển hình khi muốn truy cập vào một giá trị trong request gửi lên theo key, dựa vào magic method.

Ở ví dụ này, dữ liệu gửi lên là một request chứa thông tin về tiêu đề (`title`) và nội dung (`content`) của một bài `post` nào đó.

Việc truy cập thông qua key `title` khá suôn sẻ, mặc dù điều này là không nên và nhiều rủi ro. Có thể tham khảo thêm tại bài viết sau: [Laravel requests... DEADLY flexible](https://viblo.asia/p/laravel-requests-deadly-flexible-vyDZOy175wj)

Tuy nhiên, vấn đề sẽ thấy rõ hơn khi sử dụng magic method ở dòng code phía dưới:

`$content = $request->content;`

Dòng code này thay vì lấy giá trị của ô input `content`  gửi lên, thì nó ưu tiên lấy giá trị của thuộc tính `protected $content` trong class [Request](https://github.com/symfony/http-foundation/blob/master/Request.php#L121) trước. Do đó, dẫn đến kết quả không mong muốn.

Chính vì vậy, ngoài việc không đặt tên key trong request trùng với những thuộc tính trong class Request, magic method nên hạn chế được sử dụng khi muốn truy cập vào một giá trị trong Laravel request.

## 14. Đặt tên hàm không bắt đầu bằng một động từ

Một hàm thường đại diện cho một thao tác/chức năng nào đó. Vì vậy nên đặt tên hàm bắt đầu bằng một động từ.

Thay vì
```php
function passwordValidation() {}
```

Có thể cân nhắc đổi thành:
```php
function execPasswordValidation() {}
```

```php
function validatePassword() {}
```

## 15. Tên của mảng không ở dạng số nhiều
```php
$post = [];
foreach ($post as $eachPost)
{
    //
}

$commentData = [];
foreach ($commentData as $comment)
{
    //
}
```

Convention đặt tên mảng ở dạng số nhiều là không bắt buộc trong một số trường hợp. Tuy nhiên, việc đặt tên ở dạng số nhiều sẽ giúp code trở nên dễ đọc hơn đôi chút.

```php
$post = [];
foreach ($posts as $post)
{
    //
}

$comments = [];
foreach ($comments as $comment)
{
    //
}

```

## 16. Đặt tên route chưa hợp lý

```php
Route::name('posts.')->prefix('posts')->group(function () {
    Route::get('/', 'PostController@list')->name('list_of_posts');
    // Or
    //Route::get('/', 'PostController@list')->name('post_list');
    //Route::get('/', 'PostController@list')->name('list_post');
    Route::get('/create', 'PostController@create')->name('create_post');
});
```

Việc gọi và sử dụng route theo route name tương ứng:
```php
route('posts.list_of_posts');
route('posts.create_post');
```

Thay vào đó, có thể rút gọn lại:
```php
Route::name('posts.')->prefix('posts')->group(function () {
    Route::get('/', 'PostController@list')->name('list');
    Route::get('/create', 'PostController@create')->name('create');
});

route('posts.list');
route('posts.create');
```

## 17. Duplicate jQuery selector

```javascript
$('#foo').show();
$childElements = $('#foo').find('.bar');
```

Ngoài một số trường hợp đặc biệt, thì đoạn code trên chưa được tối ưu lắm khi thực hiện tìm kiếm cùng một element tới hai lần. Có thể cân nhắc sửa lại như sau:

```javascript
var parentElement = $('#foo');
parentElement.show();
var childElements = parentElement.find('.bar');
```

## 18. Truy cập thuộc tính có thể không tồn tại trong một đối tượng

```javascript
$.ajax({
    error: function (errorResponse) {
        let errors = errorResponse.foo.bar;
        showBarError(errors);
    },
});
```

Ở ví dụ trên, lỗi khi submit Ajax request sẽ được hiển thị thông qua hàm `showBarError()`. Hàm này nhận tham số là giá trị của thuộc tính  `bar` trong đối tượng `errorResponse.foo`.

Nếu như response lỗi được trả về là một đối tượng có cấu trúc đúng như trên, việc hiển thị lỗi sẽ không gặp vấn đề gì.

Tuy nhiên, trong thực tế, đặc biệt là những trường hợp xử lý lỗi, dữ liệu trả về có thể bất định và khó lường trước. Do đó, nên cân nhắc bổ sung các câu điều kiện kiểm tra trước khi truy cập thuộc tính của một đối tượng hoặc sử dụng cú pháp `try-catch`.

```javascript
$.ajax({
    error: function (errorResponse) {
        try {
            let errors = errorResponse.foo.bar;
            showError(errors);
        } catch (exception) {
            showUndefinedError(exception);
        }
    },
});
```

```javascript
$.ajax({
    error: function (errorResponse) {
        let errors = [];
        let foo = errorResponse.foo;
        if (foo.bar) {
            errors = foo.bar;
        }

        showBarError(errors);
    },
});
```
## 19. Khởi tạo giá trị không cần thiết
```javascript
let foo = 'bar';

if (isTrue()) {
    foo = 'true';
} else {
    foo = 'false';
}
```

Việc khởi tạo giá trị ban đầu `bar` trong ví dụ trên là không cần thiết vì giá trị của biến `foo` luôn bị ghi đè trong câu lệnh `if-else` phía dưới. Tùy vào bài toán thực tế, có thể sửa lại theo một trong hai hướng sau:

```javascript
let foo = 'false';

if (isTrue()) {
    foo = 'true';
}
```

```javascript
let foo;

if (isTrue()) {
    foo = 'true';
} else {
    foo = 'false';
}
```

Tuy nhiên, trong một số trường hợp đặc biệt, ví dụ như hàm `isTrue()` throw một exception nào đó, việc khởi tạo giá trị ban đầu vẫn trở nên cần thiết.

```javascript
let foo = 'bar';

try {
    if (isTrue()) {
        foo = 'true';
    } else {
        foo = 'false';
    }
} catch (e) {
    report(e);
}
```