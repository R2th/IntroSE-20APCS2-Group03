# 1. Event

Cũng giống như laravel, FuelPHP hỗ trợ đăng ký sự kiện mặc định hoặc đăng ký các event riêng biệt cho các phương thức khác gọi đến.
## 1.1. Cách 1: Đăng ký trong config
Thực hiện sự kiện khi request tới, khi khởi tạo xong fuelPHP, ...Để thêm xử lý cho các event này, khá đơn giản, thêm trực tiếp vào file config
Bạn có thể tham khảo các sự kiện hỗ trợ trong FuelPHP tại [đây](https://fuelphp.com/docs/classes/event.html).

## 1.2. Cách 2: Đăng ký tùy chọn
Ý tưởng vẫn là có 1 hàm đăng ký sự kiện và có 1 hàm gọi sự kiện, hết. Ta viết các event thành các lớp riêng sau đó gọi nếu có nhu cầu thôi =)).

### Bước 1: Viết thử một sự kiện 

(APPCLASS/fuel/app/classes/event/register.php)
```php
<?php
/**
 * Created by PhpStorm.
 * User: FRAMGIA\nguyen.van.minhb
 * Date: 20/07/2018
 * Time: 08:56
 */
namespace Event;

class Register
{
    // Sự kiện echo ra một string
    public static function my_event()
    {
        echo "Event: my_event";
    }
}
```

### Bước 2: Đăng ký sự kiện: **register()** methods

Ví dụ viết đăng ký này trong controller (event.php)
```php
<?php
/**
 * Created by PhpStorm.
 * User: FRAMGIA\nguyen.van.minhb
 * Date: 20/07/2018
 * Time: 08:50
 */
class Controller_Event extends \Controller
{
    public function before()
    {
        // Register an event for class
        Event::register('my_event', '\Event\Register::my_event');
    }
}
```

### Bước 3: Gọi event thôi: **trigger()** method
```php
public function action_register()
    {
        // Call an event
        Event::trigger('my_event');
    }
```

Bật trình duyệt lên và test thôi: http://bookstore.local/event/register

# 2. Queues
Sử dụng hàng đợi giúp bạn giải quyết các vấn đề liên quan cải thiện hiệu suất cho ứng dụng, tránh bị crash hoặc phải chờ đợi một sự kiện nào đó quá lâu. Sử dụng queus trong Laravel khá đơn giản, không cần bên thứ 3 mà có thể sử dụng thêm các queue vào database và chạy job. Tuy nhiên đối với FuelPHp thì không hỗ trợ mạnh được như vậy.
## 2.1. Requirements
* PHP 5.3.3+
* pda/pheanstalk: gói xử lý queue
* beanstalkd: bên thứ 3 hỗ trợ queue

## 2.2. Cài đặt
* Cách 1: Sử dụng composer: cập nhật `composer.json`
```
...
    "require": {
        ...
        "hosopy/fuel-jobqueue": "dev-master",
        ...
    },
    ...
```
Chạy thôi: 

`$ composer install`

* Cách 2: Cài thủ công (không nên dùng bị có thể gặp lỗi)

Download zip archive or clone this repository, and extract to `fuel/app/packages/fuel-jobqueue.`.

## 2.3. Sử dụng
Kích hoạt package
```
'always_load' => array(
    'packages' => array(
        'fuel-jobqueue',
        ...
```
Cấu hình, copy cấu hình mặc định vào ứng dụng của bạn sau đó sửa như sau (như đã nói ở trên, chúng ta sẽ sử dụng bên thứ 3 để quản lý job: `beanstalkd`):

`$ cp fuel/packages/fuel-jobqueue/config/jobqueue.php fuel/app/config`

Giữ lại cấu hình mặc định nếu bạn muốn sử dụng beanstalkd:
```
return array(
    // default connection name
    'default' => 'default_connection',
    
    'connections' => array(
        'default_connection' => array(
            'driver'   => 'beanstalkd',
            'host'     => '127.0.0.1',
            'port'     => '11300',
            'queue'    => 'jobqueue',
        ),
    ),
);
```
Cài đặt và chạy beanstalkd:
```
# Example: Ubuntu
$ sudo apt-get install beanstalkd
```

## 2.4. Định nghĩa job

Định nghĩa xử lý job trong lớp `fuel/app/classes/myjob.php.`:

```
<?php
class Myjob
{
    // [IMPORTANT] Requires 'fire' method as a entry point.
    // Job này test delay 10s mới tạo 1 bản ghi vào DB
    public function fire($job, $data)
    {
        sleep(10);
        $post = new \Model\Post();
        $post->title = 'Hehe';
        $post->content = 'Content';
        $post->save();
    }
}
```
## 2.5. Hàng đợi Job

Trong Controller của bạn gọi, call `\Jobqueue\Queue::push($job, $data)` để đẩy một công việc mới vào hàng đợi:

```
class Controller_Welcome extends Controller
{
    public function action_index()
    {
        // push a new job onto the default queue of the default connection.
        // 'Myjob' is a class name you have defined.
        \Jobqueue\Queue::push('Myjob', array('message' => 'Hello World!'));
        
        return Response::forge(View::forge('welcome/index'));
    }
    ...
```
## 2.6. Chạy worker

Queued jobs cannot be executed untill the worker process pop it from the queue.

```
$ cd FUEL_ROOT
$ php oil refine jqworker:listen --connection=default_connection --queue=jobqueue
```
# 3. Một vài bug bạn có thể gặp phải
* Không tìm thấy lớp `Process`: hãy cài lại package "hosopy/fuel-jobqueue" bằng composer thay vì cài đặt thủ công
* Không tìm thấy lớp `Pheanstalk_Pheanstalk`. Hãy giảm phiên bản `"pda/pheanstalk"` xuống 2.1 vì có thể lâu lắm rồi tác giả package đó không nâng cấp (5 năm trước @@)
* Nhắc lại 2 package chính cần cài:
```
"require": {
    ...
    "hosopy/fuel-jobqueue": "dev-master",
    "pda/pheanstalk": "^2.1"
},
```
* Khi chạy worker, nó không hỗ trợ mạnh như Laravel, ta không thể quan sát được các job nào đang chạy, job nào ok, job nào fail (chưa biết cách chỉnh sửa)
* Không có nhiều tham số cấu hình (delay job, thử lại bao nhiêu lần .. như Laravel)
* Để chạy Job cần chạy cả worker và beanstalkd
# Tài liệu tham khảo
* fuel-jobqueue package github: https://github.com/hosopy/fuel-jobqueue
* Event class: https://fuelphp.com/docs/classes/event.html
* Github project: https://github.com/minhnv2306/authencation_fuelphp