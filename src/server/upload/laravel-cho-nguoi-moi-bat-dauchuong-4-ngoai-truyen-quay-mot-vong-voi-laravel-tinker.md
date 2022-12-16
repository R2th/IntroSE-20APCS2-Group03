## Quậy một vòng với Laravel Tinker

Tiếp theo series về Laravel cho người mới bắt đầu chúng ta sẽ tiếp tục tiến đến một công cụ khác rất đặc trưng của Laravel so với các Framework PHP khác đó là `artisan`.
Và một thứ mình cực kì thích là mình có thể tương tác với đoạn code mình vừa viết thông qua Laravel Tinker.
Nói sơ qua về Tinker thì bạn có thể tham khảo trong bài viết https://viblo.asia/p/laravel-tinker-AoDKYNQDzvg.
Hôm nay mình sẽ nói sơ qua về các mục bên dưới

	* Khởi động tinker trong laravel project
	* Các thao tác hay thực hiện trong tinker
	* List các commands hay dùng của tinker
	* Tại sao lại dùng Tinker ? (phần ngoại truyện)

### 1. Khởi động tinker trong laravel project

Ta có thể khởi động tinker tại thư mục gốc của project như bên dưới

`php artisan tinker`

Khi khởi động câu lệnh bên trên xong kết quả sẽ là

```bash
Psy Shell v0.7.2 (PHP 5.6.23 窶・cli) by Justin Hileman
 >>>
```


Sau khi chạy câu lệnh trên , chúng ta có thể access đến Models mà đã tạo trong laravel, chẳng hạn như
```bash
>>> App\Models\Plan::count()
=> 73597
```

Hoặc ta có thể tạo mới một instance của model

```bash
>>> $user = new App\Models\User
=> App\Models\User {#691}
>>> $user->username = "ArtisanTest"
=> "ArtisanTest"
>>> $user->email = "Test@gmail.com"
=> "Test@gmail.com"
>>> $user->password = "12345678"
=> "12345678"
>>> $user->role_id = 1
=> 1
>>> $user->valid = 1
=> 1
>>> $user->save()
=> true
```

Câu lệnh trên sẽ tạo một user mới và gán nó vào trong biến `$user`, chúng ta có thể dùng câu lệnh `$user->save()` để save user vừa tạo vào trong DB. 
Như vậy chúng ta có thể thao tác bằng command line dễ dàng các tác vụ như :

	1. Thao tác các bảng ghi của bảng
	2. Truy vấn cột (ví dụ bảng của chúng ta có quá nhiều data)
	3. Tạo các test data dựa trên các data mẫu

### 2. Các thao tác hay dùng trong tinker

#### 2.1Tôi muốn viết hàm trong tinker có được không ?

Câu trả lời là được nhé. Nhưng hẳn nhiên là khi viết hàm, chúng ta nên có dấu xuống dòng cho từng dòng lệnh tách bạch với nhau. Nhưng khi enter thì `tinker` có thể lầm tưởng rằng đó kết thúc câu lệnh. Để tránh điều này,chúng ta có thể kết thúc từng câu lệnh với kí tự `\` . Nó  cho phép chúng ta có thể input trên nhiều dòng; mỗi dòng sẽ có bắt đầu là `...`. REPL sẽ tiếp tục chấp nhận input nhiều dòng. Nào hãy xem ví dụ bên dưới nhé

```bash
>>> function sayHello($userId) { \
... $user = App\Models\User::find($userId); \
... return "Hello {$user->username}-san";}
=> null
>>> sayHello(30)
=> "Hello kkakass-san"
```

Nhưng ngộ nhỡ đoạn function trên có lỗi lầm gì thì làm sao mà tôi có thể đọc được stack trace nhỉ

```bash
>>> sayHello(39)
PHP error:  Trying to get property of non-object on line 4
```

(Ở đây mình cố ý để ra lỗi, userid 39 là chưa tồn tại trong hệ thống )
  
Mình muốn xem đoạn code vừa execute phía trên có lỗi lầm gì không ?
  
Ta có thể dùng command line `wtf` của tinker để xem stacktrace của hàm vừa gọi liền trước đó.

```bash
>>> wtf


  [Psy\Exception\ErrorException]
  PHP error:  Trying to get property of non-object on line 4


Exception trace:
 () at :4
 Psy\Exception\ErrorException::throwException() at D:\Working\laravel\laravel5-example\vendor
\psy\psysh\src\Psy\Shell.php:723
 Psy\Shell->handleError() at D:\Working\laravel\laravel5-example\vendor\psy\psysh\src\Psy\Exe
cutionLoop\Loop.php(79) : eval()'d code:4
 sayHello() at D:\Working\laravel\laravel5-example\vendor\psy\psysh\src\Psy\ExecutionLoop\Loo
p.php(79) : eval()'d code:1
 eval() at D:\Working\laravel\laravel5-example\vendor\psy\psysh\src\Psy\ExecutionLoop\Loop.ph
p:79
 Psy\ExecutionLoop\{closure}() at D:\Working\laravel\laravel5-example\vendor\psy\psysh\src\Ps
y\ExecutionLoop\Loop.php:135
 Psy\ExecutionLoop\Loop->run() at D:\Working\laravel\laravel5-example\vendor\psy\psysh\src\Ps
y\Shell.php:307
 Psy\Shell->doRun() at D:\Working\laravel\laravel5-example\vendor\symfony\console\Application
.php:117
 Symfony\Component\Console\Application->run() at D:\Working\laravel\laravel5-example\vendor\p
sy\psysh\src\Psy\Shell.php:273
 Psy\Shell->run() at D:\Working\laravel\laravel5-example\vendor\laravel\framework\src\Illumin
ate\Foundation\Console\TinkerCommand.php:54
 Illuminate\Foundation\Console\TinkerCommand->fire() at n/a:n/a
 call_user_func_array() at D:\Working\laravel\laravel5-example\vendor\laravel\framework\src\I
lluminate\Container\Container.php:507
 Illuminate\Container\Container->call() at D:\Working\laravel\laravel5-example\vendor\laravel
\framework\src\Illuminate\Console\Command.php:169
 Illuminate\Console\Command->execute() at D:\Working\laravel\laravel5-example\vendor\symfony\
console\Command\Command.php:256
 Symfony\Component\Console\Command\Command->run() at D:\Working\laravel\laravel5-example\vend
or\laravel\framework\src\Illuminate\Console\Command.php:155
 Illuminate\Console\Command->run() at D:\Working\laravel\laravel5-example\vendor\symfony\cons
ole\Application.php:794
 Symfony\Component\Console\Application->doRunCommand() at D:\Working\laravel\laravel5-example
\vendor\symfony\console\Application.php:186
 Symfony\Component\Console\Application->doRun() at D:\Working\laravel\laravel5-example\vendor
\symfony\console\Application.php:117
 Symfony\Component\Console\Application->run() at D:\Working\laravel\laravel5-example\vendor\l
aravel\framework\src\Illuminate\Foundation\Console\Kernel.php:107
 Illuminate\Foundation\Console\Kernel->handle() at D:\Working\laravel\laravel5-example\artisa
n:36

--
0:  () at :4
```

Như vậy thì ta có thể trace lỗi dễ dàng hơn rồi.nhỉ

#### 2.2 Up/Down site bằng tinker

Tinker có hỗ trợ ta một command line để down site xuống ở mode maintainance.

Ví dụ như câu lệnh bên dưới sẽ `down` site xuống mode maintainance

```bash
>>> down
Application is now in maintenance mode.
>>>
```

Khi truy xuất trang web ta sẽ thấy hiển thị ra thông báo bên dưới

<img class="alignnone size-medium wp-image-83" src="http://nech.info/wp-content/uploads/2016/12/artisan_3-1024x488.png" alt="" width="100%" height="100%" srcset="http://nech.info/wp-content/uploads/2016/12/artisan_3-300x143.png 300w, http://nech.info/wp-content/uploads/2016/12/artisan_3-768x366.png 768w,  1024w, http://nech.info/wp-content/uploads/2016/12/artisan_3.png 1535w" sizes="(max-width: 300px) 100vw, 300px" />

Khi chúng ta đã hoàn thành maintainance mode thì chúng ta có thể dùng câu lệnh ngược lại của `down` là `up` để mang application của chúng ta `go live` trở lại

<pre class="language-bash">>>> up
Application is now live.</pre>

Vậy là chúng ta đã có thể access trang web một cách bình thường lại rồi

* * *

### 3. List các commands của tinker

Các command của tinker ta có thể truy xuất qua câu lệnh `help` trong tinker. Danh sách các command hỗ trợ như bên dưới

```bash
help Show a list of commands. Type `help [foo]` for information about [foo
]. Aliases: ?
 ls List local, instance or class variables, methods and constants.
 Aliases: list, dir
 dump Dump an object or primitive.

 doc Read the documentation for an object, class, constant, method or prop
erty. Aliases: rtfm, man
 show Show the code for an object, class, constant, method or property.

 wtf Show the backtrace of the most recent exception.
 Aliases: last-exception, wtf?
 whereami Show where you are in the code.

 throw-up Throw an exception out of the Psy Shell.

 trace Show the current call stack.

 buffer Show (or clear) the contents of the code input buffer.
 Aliases: buf
 clear Clear the Psy Shell screen.

 history Show the Psy Shell history.
 Aliases: hist
 exit End the current session and return to caller.
 Aliases: quit, q
 clear-compiled Remove the compiled class file

 down Put the application into maintenance mode

 env Display the current framework environment

 optimize Optimize the framework for better performance

 up Bring the application out of maintenance mode

 migrate Run the database migrations

 inspire Display an inspiring quote
```

### Kết luận
Hi cọng chúng ta sẽ có thể dùng `php artisan tinker` để hỗ trợ công việc develop , cũng như thực hiện testing ut các đoạn code mà mình đã viết ra để có những đoạn code chất lượng hơn.
Phần chính về Laravel tinker cũng như các command của nó mình sẽ publish trong vài ngày tới. Phần artisan và tinker sẽ đề cập đến
*  Artisan là gì
*  Các commands cơ bản mà artisan đã hỗ trợ
*  Tôi muốn viết custom commands có được không ?
*  Nhận tham số đầu vào của custom artisan như thế nào ?
*  Gọi artisan command trong một method khác có được không ? (ví dụ mình gọi trong một method nào đó của controller chẳng hạn)

### Ngoại truyện:
*Question : Tại sao tinker lại chạy được* 
> Thật ra tinker được dựa trên PsySH một REPL (Read Eval Print Loop), console (tạm dịch là “Đọc - Thực Thi - Print kết quả - Đọc tiếp (chờ input từ console)” . 
> Bạn có thể tìm hiểu kỹ hơn ở đây (tiếng Anh). 
> https://presentate.com/bobthecow/talks/php-for-pirates#slide-61
> 
*Question : Tại sao tôi lại cần cái này  (dd) là đủ rồi mà*
> Giả sử khi chúng ta vừa mới viết một đoạn code xong, chúng ta muốn tương tác trực tiếp với code của mình chúng ta có thể làm kiểu 
```bash
>>> $myFreshNewClass = app(FreshNewClass::class)
>>> $myFreshNewClass->testMethod('param1', 'param2')
>>> // see your result here
``` 

> Chẳng phải thế này chúng ta có thể tự UT (với một vài trường hợp `testMethod` mà ta vừa viết sao ? Thường thì mình sẽ tương tác với code mình vừa viết và note lại những command mình tương tác với nó vào trong Unit Test của class đó. Và khi chúng ta càng tương tác được nhiều với code của mình thì lượng bugs có thể phát sinh cũng sẽ được giảm thiểu. Tất nhiên chúng ta không thể nào code dược những đoạn code zero bugs cả. Tuy nhiên nếu chúng ta phát hiện sớm + test sớm được những đoạn code đó thì sẽ có thể nâng cao được chất lượng code hơn nữa ^^