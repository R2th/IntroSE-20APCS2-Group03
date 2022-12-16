# **1.Giới thiệu**
![](https://images.viblo.asia/ecaae5ba-224f-4194-8ee3-5294771b5d45.png)

Laravel cung cấp file nhật ký lưu trữ tất cả ngoại lệ lỗi, thời gian chạy hoặc bất kỳ lỗi nào khác có được, tất cả các lỗi đều được ghi lại và lưu trong một file log được đặt tại `storage\logs\laravel.log`.

Theo thời gian thì chúng làm cho kích thước file log tăng lên nhanh chóng, đây có thể là một vấn đề phổ biến đối với một số ứng dụng Laravel đơn giản được lưu trữ với dung lượng ổ đĩa giới hạn.

Thay vì xóa bằng tay hoặc sử dụng **ssh** , **filezilla** để xóa file log này theo cách thủ công nhiều lần, ở đây tôi sẽ chỉ cho bạn cách thực hiện điều đó  trực tiếp trên ứng dụng, tức là khi bạn truy cập **www.yoursite.come/clear** thì file log đó sẽ bị xóa và **Server** của bạn sẽ có nhiều không gian để bơm ô xy hơn. ( ^_^)

* **Lưu ý:**  Cách này là không nên xảy ra với ứng dụng đã được chạy trên môi trường **production**.
# **2.Bắt đầu**
* Chuyển tệp **routes/web.php** của bạn và thêm đoạn code sau:
    ```
    Route::get('/clear', function() {
    exec('rm -f ' . storage_path('logs/laravel.log'));
    
    return 'Log file deleted';
    });
    ```
* Thêm **Artisan command** để **optimize** ứng dụng của bạn:
    ```
    Route::get('/clear', function() {
    Artisan::call('config:cache');
    Artisan::call('config:clear');
    Artisan::call('cache:clear');

    Artisan::call('view:clear');
    Artisan::call('route:clear');

    exec('rm -f ' . storage_path('logs/laravel.log'));

   return 'Log file deleted and Cache is cleared';
    })->name('clear.cache');
    ```
* **Deploy**
    ```
    php artisan serve
    ```
    
   Run: http://127.0.0.1:8000/clear
   
   `Log file deleted and Cache is cleared`
# **3.Kết luận**
Hy vọng với chia sẻ nhỏ này sẽ giúp anh em cải thiện hiệu suất làm việc của mình, để ứng dụng chạy mượt mà hơn !
Nếu đi sâu vồ phân tích log thì a/e có thể tìm hiểu package này nhé : [LogViewer](https://packagist.org/packages/arcanedev/log-viewer)

Thân ái , chồ tộm biệt , quyết thắng ! 😜