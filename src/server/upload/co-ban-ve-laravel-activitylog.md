# Laravel Activitylog
## **1. Tổng quan**
Nếu các bạn đang muốn lưu lại hoạt động của người dùng khi họ thêm, sửa, xoá ... thì gói thư viện `spatie/laravel-activitylog` sẽ rất hữu ích dành cho mong muốn của bạn. Nó sẽ tự động  ghi lại những sự kiện với model và sẽ lưu toàn bộ chúng vào bảng `activity_log` tạo trước đó.
## **2. Cài đặt**
**Yêu cầu**: Gói `activitylog` yêu cầu **PHP 7.1+** và **Laravel 5.2 trở lên**.

Cài đặt thông qua composer:
```
composer require spatie/laravel-activitylog
```
Gói thư viện này sẽ tự động đăng ký với service provider tuy nhiên bạn cần chắc chắn bạn có thể vào **config/app.php**  để kiểm tran xem đã có dòng lệnh bên dưới chưa: 
```php
'providers' => [
    ...
    Spatie\Activitylog\ActivitylogServiceProvider::class,
];
```
Kế đến bạn chạy dòng lệnh bên dưới để tạo bảng và model trong ứng dụng laravel:
```
php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="migrations"
```

Sau khi  chạy xong  xong câu lệnh trên bạn tiếp tục chạy câu lệnh `php artisan migrate` để tạo ra bảng `activity_log`.

Bạn cũng có thể tuỳ chỉnh thông tin với tệp cấu hình, tệp cấu hình có nội dung như bên dưới :
```php
return [

    /*
     * If set to false, no activities will be saved to the database.
     */
    'enabled' => env('ACTIVITY_LOGGER_ENABLED', true),

    /*
     * When the clean-command is executed, all recording activities older than
     * the number of days specified here will be deleted.
     */
    'delete_records_older_than_days' => 365,

    /*
     * If no log name is passed to the activity() helper
     * we use this default log name.
     */
    'default_log_name' => 'default',

    /*
     * You can specify an auth driver here that gets user models.
     * If this is null we'll use the default Laravel auth driver.
     */
    'default_auth_driver' => null,

    /*
     * If set to true, the subject returns soft deleted models.
     */
    'subject_returns_soft_deleted_models' => false,

    /*
     * This model will be used to log activity.
     * It should be implements the Spatie\Activitylog\Contracts\Activity interface
     * and extend Illuminate\Database\Eloquent\Model.
     */
    'activity_model' => \Spatie\Activitylog\Models\Activity::class,

    /*
     * This is the name of the table that will be created by the migration and
     * used by the Activity model shipped with this package.
     */
    'table_name' => 'activity_log',
];
```
Vậy là đã cài đặt xong thế là có thể dùng được rồi!
## **3. Sử dụng cơ bản**
* **Ví dụ đơn giản để ghi lại hoạt động của** :
```php
activity()->log('Look mum, I logged something');
```
* Bạn có thể nhận dữ liệu thông qua `Spatie\Activitylog\Models\Activity` model
```php
$lastActivity = Activity::all()->last(); //Lấy ra hoạt cuối cùng

$lastActivity->description; //trả về 'Look mum, I logged something';

```
* Bạn có thể chỉ định một đối tượng mà hoạt động được thực hiện trên nó bằng cách sử dụng `performedOn`:
```php
activity()
   ->performedOn($someContentModel)
   ->log('edited');

$lastActivity = Activity::all()->last(); //trả về hoạt động cuối cùng

$lastActivity->subject; //trả về model đã được truyền từ performedOn;
```
* Bạn có thể thiết lập người tạo ra hoạt động bằng cách sử dụng phương thức `causeBy`:
```php
activity()
   ->causedBy($userModel)
   ->performedOn($someContentModel)
   ->log('edited');
   
$lastActivity = Activity::all()->last(); //trả về hoạt động cuối cùng

$lastActivity->causer; //trả về model đã được truyền từ causedBy;   
```
Hàm `causedBy()` có thể thay thế bằng `by`

Nếu bạn không sử dụng `causedBy` nó sẽ tự động sử dụng  người dùng đang đăng nhập.
* **Cài đặt thuộc tính tuỳ chỉnh**:
Bạn có thể thêm bất cứ thuộc tính nào bạn  `withProperties`
```php
activity()
   ->causedBy($userModel)
   ->performedOn($someContentModel)
   ->withProperties(['key' => 'value'])
   ->log('edited');
   
$lastActivity = Activity::all()->last(); //trả về hoạt động cuối cùng
   
$lastActivity->getExtraProperty('key'); //trả về 'value' 

$lastActivity->where('properties->key', 'value')->get(); //trả về tất cả các hành động nêu thuộc tính `key` = 'value'
```
**Tuỳ chỉnh trước khi lưu hoạt động**: Bạn có thể sử dụng phương thức tap() để lọc các thuộc tính và thêm các trường bạn muốn trước khi lưu.

Cau khi sử dụng package một thời gian nó có thể sẽ ghi rất nhiều các hoạt động. Để dọn dẹp bớt các hoạt động đã lưu trữ bạn có thể sử dụng `artisan command` với lệnh `activitylog:clean`. Khi chạy lệnh này nó sẽ xoá toàn bộ các hoạt động đã được lưu.
Bạn có thể sử dụng cronjob thông qua `Laravel's scheduler` để dọn dẹp hằng ngày hoặc dọn dẹp định kì.
```php
//app/Console/Kernel.php

protected function schedule(Schedule $schedule)
{
   $schedule->command('activitylog:clean')->daily();
}
```
* **dọn dẹp định kỳ**:
`php artisan activitylog:clean --days=7`

Nếu bạn cần dọn dẹp một hoạt động log bất kì bạn có thể sử dụng
```
php artisan activitylog:clean my_log_channel// my_log_channel là tên hoạt động bạn muốn xoá
```
**Logging model events**
Bạn chỉ cần use `LogsActivity` trong model
```php
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class NewsItem extends Model
{
    use LogsActivity;

    protected $fillable = ['name', 'text'];
    
    protected static $logAttributes = ['name', 'text'];
}
```

**Hãy xem khi create 1 đối tượng thì log sẽ ra sao:**
```php
$newsItem = NewsItem::create([
   'name' => 'original name',
   'text' => 'Lorum'
]);

$activity = Activity::all()->last();

$activity->description; //trả 'created'
$activity->subject; //trả về 1 thể hiện của NewsItem
$activity->changes; //trả về ['attributes' => ['name' => 'original name', 'text' => 'Lorum']];

```
**tương tự với hàm update:**
```php
$newsItem->name = 'updated name'
$newsItem->save();

//updating the newsItem will cause an activity being logged
$activity = Activity::all()->last();

$activity->description; //trả 'updated'
$activity->subject; //trả về 1 thể hiện của NewsItem
$activity->changes;//
trả về [
   'attributes' => [
        'name' => 'updated name',
        'text' => 'Lorum',
    ],
    'old' => [
        'name' => 'original name',
        'text' => 'Lorum',
    ],
];
```
* **Sử dụng multiple log:**

Nếu không chỉ định tên log thì hoạt động sẽ trả về tên log mặc định
```php
activity()->log('hi');

$lastActivity = Spatie\Activitylog\Models\Activity::all()->last();

$lastActivity->log_name; //trả 'default';

```
Nếu bạn chỉ định tên log cho hoạt động thì nó sẽ trả về tên được truyền vào hoạt động được lưu

```php
activity('other-log')->log("hi");

Activity::all()->last()->log_name; //trả về 'other-log';

```
**LogsActivity** trait sử dụng `default_log_name` từ tệp cấu hình, bạn cũng có thể thay đổi tên mặc định bằng cách sử dụng
```php
protected static $logName = 'custom_log_name_for_this_model';
```
**Lấy ra hoạt động**
`Activity` model nó cũng giống như Eloquent model mà bạn đã biết: 
```php
Activity::where('log_name' , 'other-log')->get(); //trả về tất cả các activity có log_name  là 'other-log'

Activity::inLog('other-log')->get();

//Bạn có thể truyền nhiều log name vào scope
Activity::inLog('default', 'other-log')->get();

//hoăc truyền vào một array
Activity::inLog(['default', 'other-log'])->get();

```
## 4. Kết luận:
**ActivityLog** là một thư viện sẵn có để bạn có thể lưu lại những hoạt động của người sử dụng nó hỗ trợ rất nhiều cho ứng dụng của bạn. Mong rằng bài viết này sẽ có ích cho bạn. Cảm ơn bạn đã tìm đọc!

**Nguồn:** https://docs.spatie.be/laravel-activitylog/v3