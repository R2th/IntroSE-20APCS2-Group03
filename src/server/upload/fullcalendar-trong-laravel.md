Trong bài viết này mình sẽ giới thiệu về fullcalendar trong laravel. Full calendar sử dụng khi nào? Khi mà trang web của bạn có chức năng nào đó liên quan đến các mốc thời gian, cần được sắp xếp và hiển thị cho người dùng dễ nhìn, dễ sử dụng. Ví dụ trong cái của mình là quản lý các cuộc họp thì mình cần hiển thị các cuộc họp đó theo thời gian dưới dạng lịch để dễ nhìn hơn. 
# Các bước thực hiện
Bạn cài package sử dụng lệnh sau:
`composer require maddhatter/laravel-fullcalendar`
Hoặc thêm dòng sau đây vào file composer.json trong phần require, sau đó chạy `composer update`

```php
"require": {
	"maddhatter/laravel-fullcalendar": "~1.0"
}
```

Đối với Laravel 5.4 trở về trước
Bạn thêm dòng sau vào phần provider trong file app.php:
```php
MaddHatter\LaravelFullcalendar\ServiceProvider::class,
```
Trong phần alias thêm:
```php
'Calendar' => MaddHatter\LaravelFullcalendar\Facades\Calendar::class,
```
Với phiên bản Laravel 5.5 trở lên thì provider và Calendar alias được tự động đăng ký.

### Tạo event
Sử dụng event()
Cách đơn giản nhất để tạo một event là truyền các thông tin vào Calendar::event() như sau:

```php
$event = \Calendar::event(
    "Valentine's Day", //event title
    true, //full day event?
    '2019-02-14', //start time, must be a DateTime object or valid DateTime format, 
    '2019-02-14', //end time, must be a DateTime object or valid DateTime format,
	1, //optional event ID
	[
		'url' => 'http://full-calendar.io'
	]
);
```

### Controller
Sau đây là một controller đơn giản để tạo event

```php
$events = [];
$events[] = \Calendar::event(
    'Event One', //event title
    false, //full day event?
    '2015-02-11T0800', //start time (you can also use Carbon instead of DateTime)
    '2015-02-12T0800', //end time (you can also use Carbon instead of DateTime)
	0 //optionally, you can specify an event ID
);

$events[] = \Calendar::event(
    "Valentine's Day", //event title
    true, //full day event?
    new \DateTime('2015-02-14'), //start time (you can also use Carbon instead of DateTime)
    new \DateTime('2015-02-14'), //end time (you can also use Carbon instead of DateTime)
	'stringEventId' //optionally, you can specify an event ID
);

$eloquentEvent = EventModel::first(); 

$calendar = \Calendar::addEvents($events)
    ->addEvent($eloquentEvent, [
        'color' => '#800', //set custom color fo this event
    ])->setOptions([ //set fullcalendar options
		'firstDay' => 1
	])->setCallbacks([ //set fullcalendar callback options (will not be JSON encoded)
        'viewRender' => 'function() {alert("Callbacks!");}'
    ]);

return view('hello', compact('calendar'))
```

### View
Sau đó để hiển thị calendar bạn tạo view như sau:

```php
<!doctype html>
<html lang="en">
<head>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.2.7/fullcalendar.min.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.2.7/fullcalendar.min.css"/>
    <style>
        /* ... */
    </style>
</head>
<body>
    {!! $calendar->calendar() !!}
    {!! $calendar->script() !!}
</body>
</html>
```

**Thành quả sau khi hoàn thành sẽ trông như thế này**, các bạn có thể custom lại màu mè các thứ cho nó đẹp hơn :)))

![](https://images.viblo.asia/fdb9b6e4-7928-419b-95ba-e99d7c0710b1.png)


## Kết luận
Đây là hướng dẫn cơ bản nhất về tạo một full calendar  có thể dễ dàng áp dụng vào project  riêng của bạn.