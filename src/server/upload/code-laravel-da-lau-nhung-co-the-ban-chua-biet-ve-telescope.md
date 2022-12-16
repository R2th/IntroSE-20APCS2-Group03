<div align="center">
    
# Lời mở đầu    

</div>

- Xin chào các bạn, đã lâu rồi mình mới tiếp tục series [**Những chức năng bạn có thể cần trong một project Laravel**](https://viblo.asia/s/nhung-chuc-nang-ban-co-the-can-trong-mot-project-laravel-AyK8VmW9lxX) này. Và hôm nay bài viết này sẽ không đề cập đến một chức năng cho người sử dụng website mà là một công cụ hỗ trợ cho chính những developer chúng ta để công việc debug trở nên dễ dàng hơn đôi chút, còn fix bug có dễ hơn không thì mình không dám đảm bảo nha :laughing::laughing::laughing::laughing::laughing::laughing:

- Nói đến đây thì có thể nhiều người sẽ nghĩ đến **[Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)**, tuy nhiên trong bài viết này mình sẽ giới thiệu đến các bạn một công cụ "mới mẻ" hơn khá nhiều.

<div align="center">
    
# Nội dung

</div>

<div align="center">
    
## Giới thiệu về Telescope

</div>

Theo như định nghĩa trên trang github của Telescope thì đây là một công cụ hỗ trợ debug trong framework Laravel. Telescope cung cấp những thông tin như queued jobs, schedule, database queries, ... để giúp bạn có thể debug dễ dàng hơn trên môi trường local.

> Laravel Telescope is an elegant debug assistant for the Laravel framework. Telescope provides insight into the requests coming into your application, exceptions, log entries, database queries, queued jobs, mail, notifications, cache operations, scheduled tasks, variable dumps and more. Telescope makes a wonderful companion to your local Laravel development environment.


<div align="center">
    
## Cài đặt Telescope

</div>

- Để cài đặt được Telescope, yêu cầu tối thiểu là bạn phải sử dụng phiên bản **Laravel 5.7.7 trở lên**, đơn giản là vì Telescope ra đời từ phiên bản Laravel 5.7, nếu các bạn thử truy cập đường link https://laravel.com/docs/x.y/telescope với x.y < 5.7 thì sẽ thu được kết quả như thế này: 

![](https://images.viblo.asia/f8064989-7fee-4f84-b3a5-994ad0da67e7.jpg)

- Khi đã thoả mãn requirement, bạn sẽ tiền hành cài đặt package thông qua composer:
    - **B1**: cài đặt package thông qua composer
        ```bash
        composer require "laravel/telescope":"~1.0"
        #nếu bạn chỉ muốn sử dụng cho môi trường local của bản thân thì chỉ cần thêm option --dev vào câu lệnh
        ``` 

    - **B2**: chạy 2 câu lệnh để publish assets và chạy migration
        ```bash
        php artisan telescope:install         #publish assets lần đầu tiên
        Publishing Telescope Service Provider...
        Publishing Telescope Assets...
        Publishing Telescope Configuration...
        Telescope scaffolding installed successfully.
        
        php artisan telescope:publish         #re-publish assets mỗi khi update lại telescope
        ```
        
        ```bash
        php artisan migrate         #migrate database
        Migrating: 2018_08_08_100000_create_telescope_entries_table
        Migrated:  2018_08_08_100000_create_telescope_entries_table
        ```
        
    - **B3**: cũng giống như các công cụ debug khác thường không được cài đặt trên môi trường production, vì vậy, để cài đặt telescope cho môi trường local, ngoài việc thêm option **`--dev`** vào câu lệnh thì sẽ phải xoá `TelescopeServiceProvider` khỏi `config/app.php` và thêm vào `App\Providers\AppServiceProvider` đoạn code sau:
         ```php
         /**
         * Register any application services.
         *
         * @return void
         */
        public function register()
        {
            if ($this->app->environment('local')) {
                $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
                $this->app->register(TelescopeServiceProvider::class);
            }
        }
         ```

    - **B4**: thiết lập cấu hình cho telescope trong file `config/telescope.php`. Trong file config này có chứa những thông tin như:
        - **domain**: `'domain' => env('TELESCOPE_DOMAIN', null)`
        - **enabled**/**disabled**: `'enabled' => env('TELESCOPE_ENABLED', true)`
        - **middleware**: khai báo những middleware được sử dụng cho các telescope route.
        - **watchers**: khai báo những watcher được sử dụng để thu thập dữ liệu khi có một request hoặc một command được thực thi (VD: **QueryWatcher**. **CommandWatcher**, **JobWatcher**, **LogWatcher**, ...)
        

<div align="center">
    
## Một số chức năng đáng chú ý

</div>

<div align="center">
    
### Hiển thị avatar của user

</div>

- Với tính năng này, trong màn hình dashboard của telescope sẽ hiển thị avatar của user đang được xác thực để thực thi các request hoặc command. Với thiết lập mặc định thì sẽ sử dụng dịch vụ **Gravatar web service** để tạo avatar, tuy nhiên bạn vẫn có thể tuỳ chỉnh trong  `App\Providers\TelescopeServiceProvider` giống như bên dưới:
    ```php
    use App\Models\User;
    use Laravel\Telescope\Telescope;

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // ...

        Telescope::avatar(function ($id, $email) {
            return '/avatars/'.User::find($id)->avatar_path;
        });
    }
    ```

<div align="center">
    
### Requests

</div>

- Mỗi khi có một request được gửi lên thì sẽ được lưu lại thông tin giống như hình bên dưới. Như các bạn có thể thấy thì  những thông tin của request gồm có `phương thức request (GET/POST/...)`, `route`, [`HTTP response status code`](https://viblo.asia/p/ban-da-thuc-su-biet-http-response-status-code-gGJ59NOrKX2) và `thời gian gửi request`.

    ![](https://images.viblo.asia/33fe1dca-93d4-407d-bb0f-db42738e79a2.png)

- Bạn có thể click vào request để có thể xem thông tin chi tiết của request đó (**Headers**/**Session**/**Response**/**Logs**/**Queries**/...), giống như hình ảnh bên dưới.

    ![](https://images.viblo.asia/9471a461-4dfd-49c1-a84e-14901f2a3c16.png)


<div align="center">
    
### Command

</div>

- Đây là phần lưu lại thông tin của mỗi command giống như request, cũng bao gồm 2 màn hình **danh sách command** và màn hình **thông tin chi tiết của command**.

![](https://images.viblo.asia/0ceefa10-7ac7-495d-b4ee-46a64200dfa0.png)
<div align="center">
    
**danh sách command**

</div>

![](https://images.viblo.asia/57bf0a1b-18e2-4fdc-8bb1-158a4ba2bd98.png)
<div align="center">
    
**thông tin chi tiết của command**

</div>

- Trong màn hình thông tin chi tiết, bạn có thể xem được danh sách các câu truy vấn (queries) được thực thi bên trong command. 
    - Thông tin thời gian thực thi (duration) để biết được câu truy vấn của bạn nhanh hay chậm, từ đó có thể điều chỉnh câu truy vấn để tối ưu performance cho command của bạn/
    - Ngoài thời gian thực thi nhanh hay chậm thì bạn có thể xem được có bao nhiêu câu truy vấn bị lặp lại (**duplicate query**) làm chậm tốc độ truy vấn để có thể loại bỏ. 

<div align="center">
    
### Jobs

</div>

- Trong màn hình danh sách các jobs đã và đang thực thi, bạn có thể nắm được thông tin **tên job**, **connection** (sync), **status**, **thời điểm chạy job**.

![](https://images.viblo.asia/217fd523-918e-4d64-b148-fe4c498892b3.png)
<div align="center">
    
danh sách các **jobs** (thông tin gần giống vs màn **request**)

</div>

![](https://images.viblo.asia/3a8c3194-c2c1-4c01-b0f1-10694da0a0f4.png)
<div align="center">
    
thông tin chi tiết của **job**

</div>

- Màn hình chi tiết bao gồm các thông tin như sau:
    -  **status**: trạng thái của job (**pending**/**processed**/**failed**)
    -  **connection**: sync
    -  **tries**: số lần chạy job
    -  **timeout**: thời gian tối đa mà command có thể chạy, tính bằng **giây** (**s**)
    -  **data**: **job**/**delay**/**queue**/...

<div align="center">
    
### Ngoài ra còn rất nhiều chức năng khác rất hữu dụng, bạn có thể xem chi tiết bằng cách click vào danh sách sidebar của màn hình dashboard (Logs/Queries/Exceptions/Cache/...)

</div>

<div align="center">
    
# Tổng kết    

</div>

- Hy vọng bài viết này đã cung cấp cho các bạn một công cụ hữu ích để có thể làm cho cuộc đời của các bạn developer bớt khổ hơn trong công cuộc debug cũng như là cải thiện một phần performance của trang web.
- Nếu thấy bài viết này hữu ích, hãy upvote bài viết ủng hộ cho mình và clip bài viết lại để có thể xem lại sau này nhé. 
- Còn nếu như bài viết có vấn đề gì chưa tốt, các bạn hãy comment xuống dưới góp ý  giúp mình để có thể cải thiện khả năng trình bày cũng như kiến thức một cách nhanh chóng và kịp thời nhất nhé.

<div align="center">
    
# Tài liệu tham khảo

</div>

- Github repository: https://github.com/laravel/telescope
- Laravel document: https://laravel.com/docs/8.x/telescope
- [Google.com](https://www.google.com/search?q=laravel+telescope&rlz=1C1CHBF_enVN917VN917&oq=Laravel+telescope&aqs=chrome.0.69i59j0i22i30l2j0i22i30i395l2j69i60l3.7475j1j7&sourceid=chrome&ie=UTF-8)