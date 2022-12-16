# I. Lời mở đầu
Hôm nay mình sẽ chia sẻ cách mình đã push notifications lên các thiết bị (bao gồm app và web). Để thực hiện được việc này mình đã sử dụng schedule của Laravel và Firebase Cloud Messaging.


# II. Thực hiện
## 1. Create a new project

Mình sẽ bỏ qua bước này để các bạn tìm hiểu. Để setup 1 database thì bạn cần truy cập vào https://firebase.google.com/ , rồi khởi tạo 1 database mới.


## 2. Setup Env ( Cài đặt môi trường) trên laravel
Đầu tiên cần thêm vào package laravel-firebase:

`composer require kreait/laravel-firebase`

Sau khi cài đặt xong package thì set vào file `.env` 2 biến mới

```
FIREBASE_CREDENTIALS=config/name-file.json
FIREBASE_DATABASE_URL=https://name-project.firebaseio.com
```

Đọc đến đây sẽ có bạn thắc mắc là giá trị 2 biến môi trường ở trên kia lấy đâu ra? Đối với `FIREBASE_CREDENTIALS` các bạn sẽ vào phần project mà đã tạo 1 database ở bước 1. Chọn project setting >> service accounts, sau đó chọn  Generate new private key lúc này bạn sẽ tải xuống 1 file json. Đưa file đó vào thư mục config.
Đối với `FIREBASE_DATABASE_URL` thì sẽ lấy giá trị từ databaseURL trong file json bạn vừa tải ở trên.
![](https://images.viblo.asia/de4b1f43-1e22-4b76-8f65-740f9a066b25.png)
![](https://images.viblo.asia/10abbf76-0d11-41c9-89f5-b8f3fa64db6c.png)

Xong các bước trên thì chạy câu lệnh để khởi tại file `firebase` trong thư mục config. Trong file này sẽ gọi đến 2 biến môi trường setup ở trên để kết nối với firebase.

`php artisan vendor:publish --provider="Kreait\Laravel\Firebase\ServiceProvider" --tag=config`

Vậy là đã xong phần setup môi trường!!!
## 3. Xử lý gửi notifications
Mình sẽ tạo 1 job là `SendNotifications`, lưu ý trong job này bạn sẽ không `implements ShouldQueue`. Trong phần handle mình sẽ gọi đến SDK `app('firebase.messaging')`, có rất [nhiều cách](https://firebase-php.readthedocs.io/en/latest/cloud-messaging.html#send-messages-to-multiple-devices-multicast) và format để gửi 1 notification. Ở đây mình sẽ sử dụng format gửi theo topic như đoạn code dưới:

```
public function handle()
{
       $messaging = app('firebase.messaging');
       $message = CloudMessage::fromArray([ 
           'topic' => 'ios',
           'notification' => [
               'body' => 'Xin chào đây là thông báo đầu tiên',
               'title' => 'Thông báo đầu tiên'
           ],
           'time' => Carbon::now()->timestamp
       ]);
 }
```

## 4. Sử dụng schedule để push notification
   Để sử dụng schedule mình sẽ vào file `Kernel.php` trong này bạn sẽ gọi đến job mình mới tạo ở bước trên trong `function schedule`. 
   Oke vậy là đã xong phần backend rồi !!! Đến đây để nhận được thông báo trên các thiết bị thì chúng ta cần xử lý tiếp phía fontend để hoàn chỉnh toàn bộ chức năng. Phần fontend mình sẽ chia sẻ tiếp trong 1 bài viết khác.
   
   ```
protected function schedule(Schedule $schedule)
{ 
    $schedule->job(new SendNotification)->everyMinute();
 }
```



# III. Kết bài
Trên đây, mình đã chia với các bạn cách push notifications trong laravel phần backend. Hy vọng, bài viết này của mình sẽ giúp ích cho các bạn xử lý notifications, bài viết này còn nhiều thiếu xót mong các bạn góp ý để mình hoàn thiện thêm.

Cám ơn các bạn đã đọc bài viết.

# IV. Tài liệu tham khảo
https://github.com/kreait/laravel-firebase
https://firebase-php.readthedocs.io/en/latest/cloud-messaging.html#send-messages-to-multiple-devices-multicast