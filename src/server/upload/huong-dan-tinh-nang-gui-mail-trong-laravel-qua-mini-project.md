##### Xin chào mọi người, sau một thời gian vắng bóng thì mình đã tiếp tục quay trở lại rồi đây. Nhân dịp mình đang làm project ở trường và trong đó có chức năng gửi email nên trong bài viết này mình sẽ hướng dẫn các bạn tạo chức năng gửi mail bằng ứng dụng Laravel.
![](https://images.viblo.asia/967505fc-e257-4268-bf0f-bf79a9a1aaca.png)
Ý tưởng của mình sẽ tạo ra một mini project với các chức năng cơ bản. Với mỗi chức năng chúng ta sẽ gửi email cho người dùng về thông tin của hành động đó.
### 1. Tạo project Laravel
Để thực hiện được chức năng cơ bản thì điều bắt buộc với chúng ta là phải có một project laravel đúng không nào? =))
Ở đây mình dùng lệnh `laravel` để tạo project.
```markdown
laravel new send_email
```
### 2. Migration
Sau khi khởi tạo project thành công, chúng ta sẽ tạo một bảng tasks trong CSDL (Cơ sở dữ liệu ) bằng cách sử dụng `migration`
```
php artisan make:migration create_tasks_table
```
Sau khi tạo migration, chúng ta sẽ có được một file migration như thế này. Việc của chúng ta là giờ thêm những cột muốn thêm vào `function up()` như dưới đây:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
```
Ở đây mình chỉ cần cột id và name cho bảng này là được rồi.
### 3. Model
```php
php artisan make:model Task
```
Tương tự với model, sau khi chạy câu lệnh trên thì cũng sẽ xuất hiện file như dưới đây.
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'name',
    ];
}
```
Các thuộc tính không cần thiết thì mình sẽ không viết vào đi vì trong trường hợp này đối với mình chỉ cần `fillable` là đủ rồi :)
### 4. Routing
Trước khi tạo được route thì chúng ta phải tạo controller trước.
```php
php artisan make:controller TaskController
```
Sau khi có controller rồi thì việc tiếp theo của chúng ta là khởi tạo route thôi nhỉ :D 
```php
Route::get('/', 'TaskController@index')->name('index');
Route::post('/task', 'TaskController@store')->name('store.task');
Route::delete('/task/{task}', 'TaskController@delete')->name('delete.task');
```
### 5. Tạo function CRUD
Tới bước này, mình sẽ chia ra làm 2 phần đó là:
* Tạo Functions
* Tạo Views
##### Functions
Chúng ta có một TaskController gồm các functions như sau:
```php
<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();

        return view('index', compact($tasks));
    }

    public function store(Request $request)
    {
        $task = new Task();
        $task->name = $request->name;
        $task->save();

        return redirect()->back();
    }

    public function delete($id)
    {
        $task = Task::find($id);
        $task->delete();

        return redirect()->back();
    }
}
```
##### View
Chúng ta sẽ tạo ra 2 view. Đó là `app.blade.php` để chứa bố cục của giao diện và `tasks.blade.php` chứa bảng dữ liệu và form thêm mới.
```html
~~ resources/views/layouts/app.blade.php ~~

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Sending Email with Laravel Mailer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/f714ee491f.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container">
        <nav class="navbar navbar-expand-md bg-light navbar-light">
            <a class="navbar-brand" href="#">Tasks</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
            </div>
        </nav>
        <br>
        @yield('content')
    </div>
</body>
</html>
```
```html
~~ resources/views/tasks.blade.php ~~

@extends('layouts.app')

@section('content')
    <div class="panel-body" style="margin-bottom: 30px">
        <form action="{{ route('store.task') }}" method="POST" class="form-horizontal">
        @csrf
            <div class="card">
                <h5 class="card-header">
                    New Task
                </h5>
                <div class="card-body row">
                    <label class="col-sm-2" for="task-name"><b>Task</b></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="Enter task..." name="name">
                    </div>
                    <!-- Add Task Button -->
                    <div class="col-sm-2">
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-plus"></i>
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    @if (count($tasks) > 0)
        <div class="card">
            <h5 class="card-header">
                    Current Tasks
            </h5>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="table table-striped task-table">
                            <!-- Table Headings -->
                            <thead>
                                <th>Task</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                            @foreach ($tasks as $task)
                                <tr>
                                    <td class="table-text">
                                        <div>{{ $task->name }}</div>
                                    </td>
                                    <td>
                                        <form action="{{ url('task/'.$task->id) }}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('DELETE') }}
                                            <button type="submit" class="btn btn-danger">
                                                <i class="fa fa-trash"></i> Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    @endif
@endsection
```
Khi đó, giao diện hoàn chỉnh mà chúng ta nhận được sẽ là: 
![](https://images.viblo.asia/be215116-ade9-499c-a23c-7a3f71bdd2bd.png)

> Interface hơi ngu mong mọi người bỏ qua =)))
### 6. Gửi Email
Giờ đây sẽ đến chức năng chính của chúng ta đó là gửi email.
##### B1. Config file `.env`
Do mình sử dụng Gmail để gửi nên mình sẽ config theo Gmail. Các bạn tìm đến phần có nội dung và sửa lại như dưới đây:
```php
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
```
Khi sử dụng Gmail thì:
* MAIL_DRIVER (phương thức gửi mail) là smtp.
* MAIL_HOST (host) của Gmail là smtp.gmail.com. 
* MAIL_PORT (cổng kết nối đến Gmail) là 587.
* MAIL_USERNAME là chính gmail của bạn.
* MAIL_PASSWORD là mật khẩu gmail của bạn.

Khi sử dụng password bạn cần chú ý một vài điều: 
> Nếu Gmail của bạn bật bảo mật 2 lớp (Two-factor Authentication) thì bạn cần tạo ra mật khẩu ứng dụng 1 lần của gmail để có thể sử dụng được, bạn có nhập mật khẩu của gmail thì cũng không thể dùng được trong trường hợp này. Mình không khuyến khích các bạn bỏ lớp bảo mật nâng cao này đi. (Ở cuối bài mình sẽ hướng dẫn các bạn cách để lấy mật khẩu ứng dụng của gmail) 

Vậy là đã xong bước config.
##### B2. Xử lí
Mình sẽ gửi Email cho trường hợp khi tạo mới hoặc xóa một task. 
##### B2.1. Tạo job

Đầu tiên mình sẽ tạo ra một job sử dụng để nhận công việc mỗi khi trong controller chuẩn bị đi đến bước return kết quả. Cụ thể ở đây là job gửi email:
```php
 php artisan make:job SendEmail
```
Sau khi chạy lệnh trên thì mình sẽ có một file đó là `app/Jobs/SendEmail.php`
```php
<?php

namespace App\Jobs;

use Mail;
use App\Mail\MailNotify;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data;
    protected $users;

    /**
     * Create a new job instance.
     *
     * @param $data
     */
    public function __construct($data, $users)
    {
        $this->data = $data;
        $this->users = $users;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->users as $user) {
            Mail::to($user->email)->send(new MailNotify($this->data));
        }
    }
}
```
Ở trong file này sẽ nhận nhiệm vụ nhận thông tin bao gồm `$message và $users`
trong đó `$message `là tin nhắn và `$users` là loạt những người dùng mà sẽ gửi từ controller. Tiếp theo là thực hiện công việc gửi email cho người dùng với nội dung của email sẽ được nhận lại khi gọi `Notification`.
##### B2.2. Tạo Mailable
 ```
 php artisan make:mail MailNotify
 ```
 ```php
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailNotify extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    /**
     * Create a new data instance.
     *
     * @return void
     */

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('nguyenhuuhai98@gmail.com')
            ->view('mails.mail-notify')
            ->subject('Notification email');
    }
}
 ```
 ##### B2.3. Tạo template cho mail
 Mình sẽ sử dụng một file `blade.php` để tạo giao diện cho email mình sẽ gửi
 ```html
~~  resources/views/mails/mail-notify  ~~
<div>
    <h2>{{ $data['type'] }}</h2>
    <p> <b>{{ $data['task'] }}</b> {{ $data['content'] }}</p>
</div>
 ```
 Mọi người tự customize lại template này hoặc có thể dùng luôn của mình như ở đây cũng được =)))
 ##### B2.4. Nhận data từ Controller
 Ở `function store()` của Controller mình sẽ sửa lại như sau:
 ```php
public function store(Request $request)
{
    $task = new Task();
    $task->name = $request->name;
    $task->save();

    $users = User::all();
    $message = [
        'type' => 'Create task',
        'task' => $task->name,
        'content' => 'has been created!',
    ];
    SendEmail::dispatch($message, $users)->delay(now()->addMinute(1));

    return redirect()->back();
}
 ```
 Ở đây mình thêm hai biến là `$users` và `$message` mục đích để lấy ra tất cả user trong CSDL và tạo ra message cho hành động, sau đó sẽ gửi truyền cả hai vào trong job SendEmail để thực hiện gửi mail. 
 Tương tự với `function delete()` cũng như vậy
 ```php
 public function delete($id)
{
    $task = Task::find($id);
    $task->delete();

    $users = User::all();
    $message = [
        'type' => 'Delete task',
        'task' => $task->name,
        'content' => 'has been deleted!',
    ];
    SendEmail::dispatch($message, $users)->delay(now()->addMinute(1));

    return redirect()->back();
}
 ```
 ##### B3. Chạy project
 Công việc đã xong xuôi rồi giờ chúng ta hãy cùng nhau chạy chương trình 1 lượt nha. 
 ![](https://images.viblo.asia/1bf772e8-880d-4129-8302-6f883f4417f9.png)
 Và đây là thành quả của mình.
 ### Hướng dẫn lấy mật khẩu ứng dụng của Gmail
 Như ở trên mình đã nói, nếu bạn sử dụng bảo mật 2 lớp của Gmail thì cần phải có mật khẩu ứng dụng thì mới có thể sử dụng được chức năng gửi email này. Nên sau đây mình sẽ hướng dẫn các bạn lấy mật khẩu ứng dụng của gmail.
 
 Đầu tiên, các bạn truy cập vào trang quản lí tài khoản của Google tại [đây](https://myaccount.google.com/). Sau khi truy cập và đăng nhập bạn sẽ thấy màn hình sau:
 ![](https://images.viblo.asia/27eacfd9-00f5-41e3-abfb-d6d56e252c6c.png)

Ở cột bên trái, các bạn chọn **Bảo mật**. 
![](https://images.viblo.asia/46243fca-1e70-44fd-b797-554a7e472351.png)

 Tại đây, bạn có thể thấy phần **Đăng nhập vào Google** có phần **Xác minh 2 bước** đang bật, tức là tài khoản của bạn đang được  bảo vệ với lớp bảo mật nâng cao.

Tiếp đến bạn chọn **Mật khẩu ứng dụng**, khi này Google sẽ yêu cầu bạn nhập lại mật khẩu một lần nữa. Sau khi nhập lại mật khẩu thì bạn sẽ thấy màn hình này. ![](https://images.viblo.asia/6f0dea35-fd98-44a6-9565-24d0ae99866f.png)

Giờ bạn sẽ chọn **Ứng dụng** và **Thiết bị**, sau đó ấn **Tạo**.
![](https://images.viblo.asia/b77cd950-5fbf-4fc8-8da9-16e9c53bac0e.png)

Sau khi Tạo thì bạn sẽ nhận được một chuỗi gồm 16 kí tự, đó là **mật khẩu ứng dụng** của bạn. Bạn dùng mật khẩu này để dán vào phần **MAIL_PASSWORD** trong project trên.
### Tổng kết
Vậy là đã hoàn thành, mình vừa hướng dẫn các bạn thực hiện chức năng gửi email thông qua việc sử dụng Job, Mailable của Laravel với một project nho nhỏ. Câu cú mình còn hơi lủng củng nên mong các bạn bỏ qua. =)))
Nếu các bạn thành công đừng tiếc cho mình xin 1 upvote nha :D (kamsamita)

Tài liệu tham khảo: https://laravel.com/docs/6.x/mail<br>
Source code: https://github.com/nguyenhuuhai98/send_email

#### Chúc các bạn thành công !