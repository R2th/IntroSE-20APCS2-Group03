### 1. Sweet alert là gì
Sweet alert là 1 gói trong Laravel , nó sử dụng để thay thế hộp thông báo của Javascript khi chúng ta sử dụng Laravel. Giao diện của nó khá đẹp, responsive và dễ dàng chỉnh sửa tùy theo sở thích người dùng.
![](https://images.viblo.asia/1ebcadeb-30ea-4a23-b788-075d9cb3e4c5.gif)

### 2. Cài đặt Sweet alert trong Laravel
- Để bắt đầu với SweetAlert2 , sử dụng Composer thêm package vào thư mục dự án:
    ```php
        composer require realrashid/sweet-alert
    ```
- Sau khi cài đặt gói Sweet-alert , đăng ký gói trong Service Provider:    
    ```php
        RealRashid\SweetAlert\SweetAlertServiceProvider::class,
    ```
- Trong file *config/app.php* của bạn :
![](https://images.viblo.asia/0f0fe628-767c-4f9d-a6fe-2d04ea4700f4.png)

- Sau đó, ta thêm **Alert** facade vào biến **aliases** cũng trong file *config/app.php* :
```php
'Alert' => RealRashid\SweetAlert\Facades\Alert::class,
```

### 3. Cấu hình
- Thêm *'sweetalert::alert'*vào trong file giao diện của bạn :
```php
    @include('sweetalert::alert')
```

- Sau đó chạy lện dưới đây để sử dụng gói trong dự án :
```php
php artisan sweetalert:publish
```

- Nếu bạn không muốn sử dụng file **sweetalert.all.js** đã được load trước, bạn có thể sử dụng CDN(Content Delivery Network) :
```php
@include('sweetalert::alert', ['cdn' => "https://cdn.jsdelivr.net/npm/sweetalert2@9"])
```

### 4. Demo thông báo với alert() và toast()
#### 4.1. alert() demo 

 ```php 
alert()->success('SuccessAlert','Lorem ipsum dolor sit amet.');
 ```

![](https://images.viblo.asia/d376c6e2-f08f-48b0-922f-27c6f305d2ab.png)

***
```php
alert()->info('InfoAlert','Lorem ipsum dolor sit amet.');
```
![](https://images.viblo.asia/be98b0ee-899b-4088-971a-3711a461d68d.png)

***
```php
alert()->warning('WarningAlert','Lorem ipsum dolor sit amet.');
```
![](https://images.viblo.asia/68fa286a-c118-4122-b343-164665049a14.png)

***
```php
alert()->error('ErrorAlert','Lorem ipsum dolor sit amet.');
```
![](https://images.viblo.asia/1c2aadc3-efdc-453c-a1fb-4ee7eeca3cdb.png)

***
```php
alert()->question('QuestionAlert','Lorem ipsum dolor sit amet.');
```
![](https://images.viblo.asia/8f5af18c-a141-4dd9-96cb-1c570c969828.png)

***
```php
alert()->image('Image Title!','Image Description','Image URL','Image Width','Image Height');
```
![](https://images.viblo.asia/50478c72-b583-4488-9bb4-043c0940733d.png)

***
```php
alert()->html('<i>HTML</i> <u>example</u>',"
  You can use <b>bold text</b>,
  <a href='//github.com'>links</a>
  and other HTML tags
",'success');
```
![](https://images.viblo.asia/8d89f3f2-fa6e-4ffa-b5aa-9d1daa82404d.png)

#### 4.1. toast() demo
Bạn có thể đặt vị trí hiển thị mặc định bằng cách sửa các biến trong file **config/sweetalert.php** hoặc sử dụng hàm helper **position()** , ngoài ra còn có thuộc tính đặt thời gian cho hộp thông báo tự đóng, hiển thị nút đóng hộp thông báo,... các bạn có thể tham khảo thêm tại [link này](https://realrashid.github.io/sweet-alert) tại mục **Helpers**.

```php
toast('Success Toast','success');
```
![](https://images.viblo.asia/2c464ee3-c227-4c1f-b6c6-06adf6e518f6.png)

```php
toast('Info Toast','info');
```
![](https://images.viblo.asia/981844d4-ab6e-46d4-8cc5-c3ecde73ef12.png)

```php
toast('Warning Toast','warning');
```
![](https://images.viblo.asia/03c1b521-f0ac-4496-a331-f6d4a5f05d56.png)

```php
toast('Question Toast','question');
```
![](https://images.viblo.asia/32e9971b-8d65-4804-a562-a3cf065d3291.png)


```php
toast('Error Toast','error');
```
![](https://images.viblo.asia/bcc51c7c-465c-47ef-94b3-e94390b67599.png)

Trên đây mình đã giới thiệu cho mọi người về SweetAlert package trong Laravel, hẹn gặp mọi người trong các bài viết tiếp theo.

Tham khảo : https://realrashid.github.io/sweet-alert/