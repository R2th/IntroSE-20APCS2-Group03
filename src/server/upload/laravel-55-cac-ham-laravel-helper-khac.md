# Mở đầu 
- Phần này giới thiệu các hàm khác mà laravel helper hỗ trợ lập trình viên.

## abort()
-  **abort** sẽ ném ra một **HTTP exception** và nó sẽ dược nhận bởi *exception handler*
    Ví dụ 
    ```
        Ném ra 404 - Not Found 
        abort(404);
    ```
- Có thể trả về nội dung text của exception.  Thường thì ném về 404 not found, hay 400 -bad request thì gặp nhiều đều biết cả. Cái message nội dung text truyền vào thì thường là truyền về lý do tại sao nó ra 404, như kiểu ID không tồn tại, hoặc gì gì đó. Chứ 404 mà truyền về message *not found* thì thôi, cứ dùng mặc định thôi. Còn có thể custom header của response trả về. 
    Ví dụ 
    ```
        Ném ra 403
        abort(403, 'UnAuthorized', $header);
    ```
    :notebook:  Đừng bao giờ ném ra lỗi 403 mà message trả về lại là UnAuthorized. Vì Lỗi UnAuthorized nó phải trả về http code là 401. Có những HTTP status code nào và ý nghĩa của nó thì nên tìm hiểu rõ ràng. Cái gì là chuẩn chung thì nên dùng, kiểu như nói ngôn ngữ chung với nhau, thì dễ hiểu, một mình một kiểu, thì ít người chơi :facepunch: 

## abort_if()
- Giống như abort(), cũng ném ra một HTTP exception, tuy nhiên có thêm điều kiện. Thỏa mãn điều kiện , thì sẽ giống như abort. 
    
    Ví dụ
    ```
    if ($love_crush == $crush_love) {
            abort(500, 'Power');
     }
     abort_if($love_crush == $crush_love, 500, 'Power');
    ```
    :laughing: :laughing: :laughing: :laughing: :laughing: :laughing: :laughing: 

## abort_unless()
- Giống như abort(), cũng giống abort_if, đều tung ra HTTP exception, tuy nhiên abort_if trả về HTTP exception nếu điều kiện trả về **true**, còn **abort_unless**  nếu điều kiện truyền vào trả về giá trị **false** 
   
    Ví dụ 
    ```
    if (! $fail_in_love) { 
        abort(500);
    }
    abort_unless($fail_in_love, 500);
    ```
    
## app()
- Trả về một thể hiện của *service container*
- :question: [ Cái gì là *service container*? ](https://laravel.com/docs/master/container)
- Hàm này ít dùng.  À, mình ít dùng. :facepunch: 

## auth()
- Trong document thì nó diễn giải nào là trả về authenticator ..vân vân và mây mây. Thật ra hiểu nôm na đơn giản là nó check xem user đã login chưa. Cái login này được Laravel hỗ trợ rồi, chỉ việc *gen* ra thôi. 
-  Rồi để lấy user đang login thì dùng 
    ```
    auth()->user();
    // Có thể truyền guard vào
    auth('admin')->user();
    ```

## back()
- Hàm trả về một *redirect HTTP response* đến trang ngay trước hành động của user. 
- Hiểu nôm na là đang nhập dữ liệu form, ấn submit dữ liệu, dữ liệu lỗi, nó dừng lại ở y nguyên cái trang đang nhập dữ liệu cho form. 
- Tìm hiểu kỹ hơn về *[redirect HTTP response](https://laravel.com/docs/master/responses#redirects)* sẽ dễ hiểu hơn khi nào dùng back(). 

## bcrypt()
- Trả về giá trị hash của giá trị truyền vào, giá trị hash sử dụng [*Bcrypt*](https://en.wikipedia.org/wiki/Bcrypt)
    ```
    $password = bcrypt('my-secret-password');
    // "$2y$10$mYShzuVdouPWdQ1kW9SkR.3ab/dpRdGLjwqBRaU4RRtvKdbLMyxKC"
    ```

## broadcast()
- Broadcast sự kiện cho listener của nó. 
- Hiểu đơn giản là, giả sử có sự kiện update thông tin user, giờ nó ném thông tin, a, có thằng đang update thông tin này, cho listener của nó. Rồi thằng listener nó làm gì thì làm. :) 


## blank()
- Check xem giá trị đưa vào có rỗng hay không thì trả về **true**, không rỗng thì trả về **false**. 

    Ví dụ: 
    ```
    blank('');
    blank('   ');
    blank(null);
    blank(collect());

    // true

    blank(0);
    blank(true);
    blank(false);

    // false
    ```
    
## cache()
- Hàm này sử dụng với hai mục đích chính: Một là lấy giá trị từ key truyền vào trong cache, nếu không có giá trị nào trả về thì có thể nhận giá trị default. Hai là thêm một cặp key=>value vào trong cache
  Ví dụ như sau: 
  ```
  // Trường hợp lấy giá trị 
  $value = cache('key);
  $value = cache('key', 'default_value');
  // Trường hợp thêm key=>value 
  cache(['key'=>'value'], now()=>addSeconds(10));
  // Tham số thứ 3 là thời gian tồn tại của cặp key=>value này. 
  ```

## class_uses_recursive()
- Hàm này trả về toàn bộ những trait mà class sử dụng. :question: [php trait là gì? ](https://viblo.asia/p/php-traits-la-gi-aWj5321Pl6m)

    Ví dụ: 
    ```
    $traits = class_uses_recursive(App\User::class);
    ```
    
## collect()
- Tạo một **collection** từ những giá trị truyền vào
   Ví dụ 
   ```
   $collection = collect(['taylor', 'abigail']);
   ```
   
## config()
- Hàm trả về những giá trị trong file thư mục config. Sử dụng dấu chấm (dot syntax) để truy nhập vào các giá trị trong các file khác nhau 
   Ví dụ 
   ```
   $value = config('app.timezone');

    $value = config('app.timezone', $default);
   ```
- Cũng có thể sử dụng hàm này để thay đổi giá trị trong file config trong lần chạy như sau
   ```
   config(['app.debug' => true]);
   ```

## cookie()
- Tạo một **cookie** 
  Ví dụ: 
  ```
  $cookie = cookie('name', 'value', $minutes);
  ```

## csrf_field()
- Thường dùng trong template của laravel (trong file .blade.php). Chức năng chính là generate ra csrf token trong form nhập liệu
```
    // Syntax trong file .blade.php
    {{ csrf_field() }}
```

## csrf_token()
- Hàm này trả về csrf token hiện tại đang được sử dụng 
   Ví dụ: 
   ```
       $token = csrf_token();
   ```

## dd()
- Thường được sử dụng thường xuyên trong quá trình debug. Chức năng chủ yếu là dump giá trị hoặc chuỗi giá trị truyền vào. 
  Ví dụ 
  ```
     dd($value);

    dd($value1, $value2, $value3, ...);
  ```

## decrypt()
- decrypt chuỗi hash được hash bằng hàm **encrypt**, trả về giá trị ban đầu. 

## dispatch()
- Thêm một việc vào hàng đợi công việc của laravel. 
  Ví dụ: 
  ```
  dispatch(new App\Jobs\SendEmails);
  ```
  
## dispatch_now()
- Thay vì xếp hàng, chờ đến lượt trong hàng đợi công việc của laravel, hàm này cho phép bạn đưa ra một chỉ lệnh để công việc thực hiện ngay lập tức bởi laravel. :) 

## dump()
- Giống dd thôi. :face_with_thermometer: 

## encrypt()
- Hash một chuỗi truyền vào. Cơ chế hash như nào? chắc cũng không cần quan tâm lắm nhỉ. Cứ biết là dùng để hash value truyền vào, chỉ có thể decrypt bằng hàm decrypt 

## env()
- Trả về các giá trị của các biến môi trường 
  Ví dụ 
  ```
      $env = env('APP_ENV');

    // Returns 'production' if APP_ENV is not set...
    $env = env('APP_ENV', 'production');
  ```
  
## event()
- Gửi một event đến với listener của nó. Tìm hiểu rõ hơn về event và listener sau. 

## factory()
- Dùng các class factory để generate dữ liệu để test

## filled()
- Giống y hệt hàm blank(). Nhưng hàm blank() trả về **true** nếu gía trị truyền vào là **rỗng**, về **false** nếu không **rỗng**, còn hàm filled này thì ngược lại hàm blank()

## info()
- Hàm này chủ yếu là ghi vào file log nội dung gì đó trong trường hợp cần ghi log thôi. 
  ```
  info('Api không tìm thấy bài viết' , ['id' => $article->id]);
  ```
  
## logger()
- **logger()** được sử dụng chủ yếu vào việc ghi message và ghi log. thuy nhiên level log ở mức khác với info. **logger()** thường được ghi log trong quá trình debug là nhiều. 


## method_field()
- Dùng trong template (trong file có định dạng .blade.php)
- Dùng để genereate ra biến giả mạo phương thức của form. 
  Ví dụ: 
  ```
    <form method="POST">
        {{ method_field('DELETE') }}
  </form>
  ```
 :question:  vậy phương thức khi submit form là post hay là delete
 :right_anger_bubble:  cái này mình chưa dùng bao giờ, để có bữa nào khác mình thử phát rồi cập nhật lại document sau. 
 
## now()
- Hàm này generate ra ngày tháng hiện tại, là một thể hiện của [Carbon](https://carbon.nesbot.com/). 

## old()
- Thường được dùng trong template. Dùng để nhận lại các giá trị mà người dùng nhập vào trong quá trình validate dữ liệu form bị lỗi. 

##  optional()
- Hàm này cho phép truy nhập các thuộc tính của object, trong trường hợp truy nhập thuộc tính của object không tồn tại, nó trả về null, chứ không báo lỗi. 
   Ví dụ: 
   ```
   // Object a có thuộc tính b và không có thuộc tính c. 
   // Truy cập 
   $a->b // OK
   $a->c // Lỗi, tung ra exception 
   optional($a->c) // Không lỗi trả về null 
   ```

## policy()
- Hàm này trả về policy của một class được truyền vào. Nên dịch policy là gì nhỉ? :D. Laravel có policy với những class, Thật ra gần giống cái hạn chế các action với các class khác nhau. Kiểu A có thể làm gì đó với B, A không thể làm gì với B, Đấy ví dụ vậy. 

## redirect()
- Hàm này dùng nhiều trong controller, trả về một *redirect HTTP response* thôi. 

## report()
- Báo cáo một exception về exception handler. 
- Các mức log theo chuẩn [PSR-3](https://viblo.asia/p/psr-3-logger-interface-djeZ1xmjKWz)

## request()
- Trả về request hiện tại. 

## rescue()
- Hàm này sẽ thực hiện việc bắt mọi exception xảy tra trong quá trình thực hiện một **Closure** và báo cáo về exception handler, Tuy nhiên tiến trình thực thi vẫn thực hiện tiếp mà không bị dừng lại. 

## resolve
- Hàm này cập nhật sau nhé. đọc tài liệu không hiểu lắm. mà lại chưa dùng lần nào. 

## response 
- Tạo một thể hiện của http response 

## retry()
- Thử đi thử lại một việc đến khi thành công hoặc đến một số lần tối đa cho phép mà không thành công thì tung exception. Việc này hiểu như kiểu đăng nhập bằng tại khoản, nhưng cho phép nhập sai mật khẩu tối đa 5 lần, nếu hết 5 lần thì tài khoản sẽ tạm khóa 15 phút. 

## session()
- Dùng để get hoặc set các giá trị trong một [sesstion](https://laravel.com/docs/master/session) 

## tap()
- Hàm này  bổ sung sau nhé. :metal: 

## today()
- Giống hàm now(), tuy nhiên chỉ trả về ngày tháng năm của thời gian hiện tại. 

## throw_if()
- Giống abort_if(), nhưng không trả về http response, mà là exception

## throw_unless()
- Giống abort_unless()

## trait_uses_recursive()
- Trả về mọi trait được sử dụng bởi một trait truyền vào. 
:tired_face: Dài quá đi mất, nên mình cứ bổ sung dần dần nhé. 

## validator()
- Tạo một thể hiện của **validator**, với nhưng tham số truyền vào. Tìm hiểu kỹ hơn về validator, sẽ  hiểu rõ hàm này hơn. 

## value()
- Trả về giá trị truyền vào, nếu truyền vào là **Closure** thì thực hiện xong rồi trả về giá trị 

## view()
- Trả về view thôi, trong mô hình MVC thì nó chính là view vậy. Được sử dụng nhiều trong controller. 

## with()
- Giống value() anh em ạ. thường thì render dữ liệu từ Controller xuống View cũng có thể dùng with().