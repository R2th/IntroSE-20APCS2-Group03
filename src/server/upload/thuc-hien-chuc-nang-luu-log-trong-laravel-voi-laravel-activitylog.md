<div align="center">

# Lời nói đầu
</div>

Lại là mình tiếp tục với series [Những chức năng bạn có thể cần trong một project Laravel](https://viblo.asia/s/nhung-chuc-nang-ban-co-the-can-trong-mot-project-laravel-AyK8VmW9lxX) đây. Và trong bài viết hôm nay mình sẽ giới thiệu với các bạn cách thực hiện chức năng lưu log các hoạt động của người dùng trên trang web của bạn (thường thì chức năng được sử dụng ở bên admin là chủ yếu chứ mình thấy bên client cũng ít).

Nhưng dù là làm cho bên nào sử dụng thì mình cũng thấy đây là một chức năng cần thiết để bạn có thể quản lí trang web tốt hơn. Và không cần dài dòng nữa, mình xin giới thiệu đến các bạn package [spatie/laravel-activitylog](https://docs.spatie.be/laravel-activitylog/v3/introduction/).

<div align="center">

# Nội dung
</div>

<div align="center">

## Cài đặt
</div>

- Trước khi bắt đầu vào đặt thì chúng ta cần làm rõ là hiện tại package này đã có 3 phiên bản v1, v2 và v3. Tất nhiên là 3 phiên bản sẽ yêu cầu phiên bản PHP và Laravel khác nhau, vì vậy, nếu bạn đang sử dụng phiên bản PHP/Laravel cũ thì hãy cân nhắc lựa chọn phiên bản phù hợp nhé. Còn nếu như bạn cứ hàng mới nhất mà xài thì cũng không cần quan tâm lắm đâu 

    |Version | Requirement PHP | Requirement Laravel |
    | -------- | -------- | -------- |
    | v1     | PHP 7.0+     | Laravel 5.2     |
    | v2     | PHP 7.1+     | Laravel 5.5     |
    | v3     | PHP 7.2+    | Laravel 6     |

- Sau khi đã nắm được các requirement thì chúng ta hãy bắt tay vào setup nào
    - **Cài đặt package thông qua composer**: 
        ```bash
        composer require spatie/laravel-activitylog
        ```
    - **Publish migration**: câu lệnh này sẽ tự động tạo cho bạn file migration để tạo bảng `activity_log`. Tuy nhiên cần chú ý rằng, model IDs mặc định được sử dụng dạng integers, vì vậy nếu bạn sử dụng UUIDs hoặc bất kì format nào khác thì bạn hãy nhớ sửa lại file migration cho trường `subject_id` và `causer_id` trước khi migrate nhé
        ```bash
        php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="migrations"
        ```
        Sau khi đã chắc chắn file migration đã đúng theo mục  đích sử dụng rồi thì hãy tạo bảng `activity_log` với câu lệnh
        ```bash
        php artisan migrate
        ```
    - **Config file**:
        ```bash
        #publish config
        php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="config"
        ```
        Sau đó, bạn sẽ thu được file config có nội dung như sau (đã có comment cụ thể cho từng dòng nên chắc mình cũng không cần phải giải thích gì thêm nhỉ):
        ```config/activitylog.php
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

             /*
              * This is the database connection that will be used by the migration and
              * the Activity model shipped with this package. In case it's not set
              * Laravel database.default will be used instead.
              */
            'database_connection' => env('ACTIVITY_LOGGER_DB_CONNECTION'),
        ];
        ```
        
    

<div align="center">

## Cách thực hiện để lưu lại log hoạt động
</div>

- Làm việc với log thì chỉ có 2 thao tác cơ bản, đó là **lưu log** và **hiển thị log**, và dù là thao tác nào thì các bạn cũng phải nhớ use model của nó vào bằng cách   
    ```php
    use Spatie\Activitylog\Models\Activity;
    ```
   
- **Lưu log**: để có thể ghi log thì chắc chắn sẽ có 2 đối tượng tham gia, đó là `đối tượng tác động` và `đối tượng bị tác động`. Ở đây:
    -  `đối tượng tác động` gọi là **causer** (thường sẽ là model **User**). 
        -  Để khai báo causer chúng ta sử dụng function `->causedBy($model)` hoặc dùng dạng rút gọn là `->by($model)`. Nếu như bạn không khai báo thì nó sẽ tự hiểu **causer** là user đang log in.
        -  Còn nếu bạn không muốn lưu lại **causer** thì chỉ cần gọi `causedByAnonynmous`/`byAnonymous`.
    -  `đối tượng bị tác động` gọi là  **subject** (có thể là bài post, comment, ...). Để khai báo subject chúng ta sử dụng function `->performedOn($subjectModel)` hoặc `->on($subjectModel)`.

    - Ngoài ra, bạn cần khai báo `description` cho bản ghi để mô tả hành động mà **causer** thực hiện (ví dự như là thêm/sửa/xoá) bằng function `->log('added/edited/deleted')`.

    - Như vậy để lưu lại 1 bản ghi log đầy đủ ta sẽ có dạng như sau:
        ```php
        use Spatie\Activitylog\Contracts\Activity;
        
        activity()
           ->causedBy($user)
           ->performedOn($subjectModel)
           ->log('added/edited/deleted');
        ```
    
    - Đây là đối với bảng `activity_log` mặc định, còn nếu bạn có thêm trường khác vào trong bảng thì để điền giá trị vào trường ấy thì bạn sẽ sử dụng thêm `tap()` như sau:
        ```php
        activity()
           ->causedBy($user)
           ->performedOn($subjectModel)
           ->tap(function(Activity $activity) {
              $activity->custom_field = 'value';
           })
           ->log('added/edited/deleted');
        ```
    

- **Hiển thị log**
    
    Để lấy ra các bản ghi log thì rất đơn giản, không khác gì một model bình thường
    ```php
    $logs = Activity::all(); //lấy tất cả các bản ghi
    //Ngoài ra bạn có thể thêm điều kiện truy vấn tuỳ với bài toán của bạn
    ```

- **Xoá log**: Rõ ràng nếu trang web của bạn hoạt động ổn (tức là có một lượng người truy cập và sử dụng thường xuyên) thì số lượng bản ghi trong bảng log sẽ ngày một nhiều lên và có thể làm chậm đi tốc độ truy vấn. Và bạn sẽ cần phải xoá các bản log đã quá cũ không cần thiết. 

    Và để làm được điều đó thì bạn sẽ thực hiện câu lệnh  
    ```
    php artisan activitylog:clean
    ```
    
    Đến đây hẳn bạn sẽ thắc măc là nếu chỉ có mỗi câu lệnh như trên thì sẽ **XOÁ HẾT** bản ghi à thì câu trả lời là **KHÔNG**. Trong file config phía trên có 1 dòng là `delete_records_older_than_days` tức là câu lệnh sẽ xoá những bản ghi cũ hơn ngày này (như config mặc định là **365 ngày**). 
    
    Ngoài ra, bạn cũng có thể thêm `--days=XXX` vào câu lệnh để có thể lựa chọn số ngày khác với trong config!

<div align="center">
    
# Lời kết
</div>

- Về cơ bản thì như vậy là đã đủ để bạn có thể hoàn thành được chức năng lưu log đơn giản. Tuy nhiên tuỳ thuộc vào bài toán thực tế mà các bạn cần giải quyết thì sẽ cần phải customize lại cho phù hợp. Vì vậy hãy tìm hiểu thêm ở trong link document phía dưới.

- Nếu thấy bài viết của mình hữu ích với bạn thì hãy upvote bài viết hoặc follow series [Những chức năng bạn có thể cần trong một project Laravel](https://viblo.asia/s/nhung-chuc-nang-ban-co-the-can-trong-mot-project-laravel-AyK8VmW9lxX) để không bỏ lỡ các bài viết tiếp theo nhé!

<div align="center">

# Tài liệu tham khảo
</div>

- github: https://github.com/spatie/laravel-activitylog
- homepage: https://docs.spatie.be/laravel-activitylog/v3/introduction/