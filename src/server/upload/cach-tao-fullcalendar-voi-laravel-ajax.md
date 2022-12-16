![](https://images.viblo.asia/53b966d7-9b3c-4bd9-af70-b6317ec9e0a0.png)
Xin chào các bạn !
Hôm nay mình sẽ giớí thiệu tới các bạn 1 ví dụ nhỏ về việc tạo ra 1 full-calendar trên ứng dụng hệ thống của các bạn.
Đôi lúc trong các sản phẩm của khách hàng, họ sẽ sẽ yêu cầu chúng ta phát triển thêm tính năng calendar để thuận tiện cho việc đặt lịch nhắc nhở cho công việc trong hệ thống của họ.
Và tất nhiên đối với 1 developer thì chúng ta sẽ phải hoàn thành tất cả các yêu cầu của khách hàng, lúc trước mình cũng đã từng phát triển 1 tính năng full-calendar gần giống với Google-calendar, nhưng lúc đó hầu như là mình phải xử lý thủ công bằng js thuần bên phía client, và phải code khá là nhiều. Nhưng mà bây giờ chúng ta hoàn toàn có thể tạo ra tính năng full-calendar với laravel 1 cách đơn giản và ko mấy phức tạp với các thư viện được hỗ trợ (mình nói ko mấy phước phước tạp là còn tùy vào các option được phát triển  nhé).
Chúng ta bắt đầu nhé.

### Step Flow
* Install Laravel Fresh App
* Setup Database
* Make Route
* Create Controller & Methods
* Create Blade View
* Make Folder
* Run Development Server
* Conclusion

## Install Laravel Fresh App
Đầu tiên là chúng ta cần phải cài đặt Laravel về local của các bạn ( à mình mặc định là các bạn đã biết qua về php & laravel rồi nhé ), các bạn copy đoạn code bên dưới và dán vào terminal nhé ( nếu dùng window thì các bạn mở command-line lên nhé).
```
composer create-project --prefer-dist laravel/laravel demo-calendar
```

## Setup Database
Tiếp theo là phần setup database, các bạn mở file .env lên và config lại các thông tin như bên dưới ( tất nhiên các bạn có thể setup lại theo ý của các bạn )

```
 DB_CONNECTION=mysql 
 DB_HOST=127.0.0.1 
 DB_PORT=3306 
 DB_DATABASE=here your database name here
 DB_USERNAME=here database username here
 DB_PASSWORD=here database password here
```

* Đối với các bạn mới làm quen với laravel, thì các bạn lưu các phần DB_DATABASE, DB_USERNAME, DB_PASSWORD. Đây chính là thông DB của bạn trên phpmysql nhé.
## Generate Migration & Model
Tiếp theo là việc tạo ra các bảng dữ liệu mẫu và model cho database của chúng ta.
```
php artisan make:model Event-m
```

Câu lệnh bên trên sau khi chạy sẽ tạo ra cho chúng ta 1 file Event trong databases/migrations và 1 file model trong app/...
Các bạn thêm đoạn code bên dưới vào file migrate.
```
<?php
 
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
 
class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->dateTime('start');
            $table->dateTime('end');
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
        Schema::dropIfExists('events');
    }
}
```
Sau đó thì chạy câu lệnh bên dưới để việc tạo table lên db được thực thi.
```
php artisan migrate
```

## Make Route
Tiếp theo các bạn di chuyển tới app/routes/web.php, vào tạo ra các route như bên dưới.
```
//fullcalender
Route::get('fullcalendar','FullCalendarController@index');
Route::post('fullcalendar/create','FullCalendarController@store');
Route::post('fullcalendar/update','FullCalendarController@update');
Route::post('fullcalendar/delete','FullCalendarController@destroy');
```

## Create Controller
Tiếp theo chúng ta tạo ra 1 FullCalendarController để phúc vụ cho việc xử lý các request từ route. Các bạn chạy đoạn lênh phía dưới
```
php artisan make:controller FullCalendarController
```

Sau đó các bạn di chuyển vào app/controllers/FullCalendarController.php và thêm đoạn code bên dưới.
```
<?php
   
namespace App\Http\Controllers;
   
use App\Event;
use Illuminate\Http\Request;
use Redirect,Response;
   
class FullCalenderController extends Controller
{
 
    public function index()
    {
        if(request()->ajax()) 
        {
 
         $start = (!empty($_GET["start"])) ? ($_GET["start"]) : ('');
         $end = (!empty($_GET["end"])) ? ($_GET["end"]) : ('');
 
         $data = Event::whereDate('start', '>=', $start)->whereDate('end',   '<=', $end)->get(['id','title','start', 'end']);
         return Response::json($data);
        }
        return view('fullcalender');
    }
    
   
    public function store(Request $request)
    {  
        $insertArr = [ 'title' => $request->title,
                       'start' => $request->start,
                       'end' => $request->end
                    ];
        $event = Event::insert($insertArr);   
        return Response::json($event);
    }
     
 
    public function update(Request $request)
    {   
        $where = array('id' => $request->id);
        $updateArr = ['title' => $request->title,'start' => $request->start, 'end' => $request->end];
        $event  = Event::where($where)->update($updateArr);
 
        return Response::json($event);
    } 
 
 
    public function destroy(Request $request)
    {
        $event = Event::where('id',$request->id)->delete();
   
        return Response::json($event);
    }    
 
 
}
```
Trong Controller mình sẽ thực hiện xử lý các thao tác cơ bản đối với dữ liệu, các bạn có thể phát triển thêm các chức năng khác tùy theo ý các bạn nhé.

## Create Blade view
Tiếp theo các bạn duy chuyển tới app/resources/views, các bạn tạo ra 1 fullcalendar.blade.php và copy đoạn code bên dưới vào file của các bạn, đây là nơi chúng ta sẽ nhận dữ liệu đổ ra từ Controller và hiển thị ra giao diện ra phía clent.
```
<!DOCTYPE html>
<html>
<head>
  <title>Laravel Fullcalender Add/Update/Delete Event</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js" integrity="sha256-4iQZ6BVL4qNKlQ27TExEhBN1HFPvAvAMbFavKKosSWQ=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.js"></script>
<body>
 
  <div class="container">
      <div class="response"></div>
      <div id='calendar'></div>  
  </div>
 
 
</body>
</html>
```
*  Các bạn để ý trên phần  thẻ </head> nhé, ở đây mình đã import các thư viện như fullcalendar và momentJs để phục vụ cho việc tạo calendar.
Các bạn có thể import bằng CDN như mình hoặc để đảm bảo hơn cho phần test thì tốt nhất các bạn nên dowload về project của mình.

Tiếp theo các bạn copy đoạn xử lý js bên dưới vào phần cuối trong thẻ file balde hoặc các bạn có thể tạo ra 1 file js riêng trong public và import vào cũng được.
```
<script>
  $(document).ready(function () {

        var SITEURL = "{{url('/')}}";
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var calendar = $('#calendar').fullCalendar({
            editable: true,
            events: SITEURL + "fullcalendar",
            displayEventTime: true,
            editable: true,
            eventRender: function (event, element, view) {
                if (event.allDay === 'true') {
                    event.allDay = true;
                } else {
                    event.allDay = false;
                }
            },
            selectable: true,
            selectHelper: true,
            select: function (start, end, allDay) {
                var title = prompt('Event Title:');

                if (title) {
                    var start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
                    var end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");

                    $.ajax({
                        url: SITEURL + "/fullcalendar/create",
                        data: {'title' : title, 'start': start, 'end': end},
                        type: "POST",
                        success: function (data) {
                            displayMessage("Added Successfully");
                        }
                    });
                    calendar.fullCalendar('renderEvent',
                        {
                            title: title,
                            start: start,
                            end: end,
                            allDay: allDay
                        },
                        true
                    );
                }
                calendar.fullCalendar('unselect');
            },

            eventDrop: function (event, delta) {
                var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
                var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
                $.ajax({
                    url: SITEURL + '/fullcalendar/update',
                    data: {'title': event.title, 'start': start, 'end': end, 'id': event.id},
                    type: "POST",
                    success: function (response) {
                        displayMessage("Updated Successfully");
                    }
                });
            },
            eventClick: function (event) {
                var deleteMsg = confirm("Do you really want to delete?");
                if (deleteMsg) {
                    $.ajax({
                        type: "POST",
                        url: SITEURL + '/fullcalendar/delete',
                        data: {'id': event.id},
                        success: function (response) {
                            if(parseInt(response) > 0) {
                                $('#calendar').fullCalendar('removeEvents', event.id);
                                displayMessage("Deleted Successfully");
                            }
                        }
                    });
                }
            }

        });
    });

    function displayMessage(message) {
        $(".response").html("<div class='success'>"+message+"</div>");
        setInterval(function() { $(".success").fadeOut(); }, 1000);
    }
</script>
```

## Run Development Server
OK !! Và giờ giờ là công việc cuối cùng để cùng xem kết quả.
Các bạn chạy câu lênhj bên dưới.
```
php artisan serve
 Nếu các bạn ko sử dụng port 80, thì có thể tuy biến như bên dưới cho phù hợp với port trên local của các bạn nhé
 php artisan serve --port=8080  
```

* Các bạn nhập url như bên dưới trên trình duyệt của các bạn.
```
http://localhost/fullcalendar  // đối với port 80
hoặc 
http://localhost:8080/fullcalendar      // đối với các port khác 80
```

## Conclusion
OK... thế là hoàn tất nhé, như vậy là mình đã giới thiệu tới các bạn cách tạo ra 1 chức năng Calendar và thao tác dữ liệu cơ bản trên calendar đó.
Chúc các bạn thành công và các bản có thể dựa trên nền tảng này để có thể tạo ra 1 full-calendar có thể xử được các chức năng phức tạo hơn.