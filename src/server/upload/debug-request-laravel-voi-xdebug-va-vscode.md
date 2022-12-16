# 1.Đặt vấn đề
Xin chào mọi người, trong bài viết này mình sẽ chia sẻ cho mọi người các debug `request` trong `Laravel`. Chắc hẳn đối với một lập trình viên kĩ năng debug là không thể thiếu. Trong `Laravel` có mình thấy anh em hay  dùng hàm `dd()` hoặc `Log::info()` để debug 1 biến hoặc một đoạn code.

Nhìn chung thì cách này khá nhanh và hiệu quả cho việc debug các vấn đề đơn giản, nhưng khi gặp 1 bug mà logic phức tạp thì mình sẽ cần bẫy debug ở khá nhiều chỗ.
```php
    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $admin = $this->adminRepository->findById($id);
        \Log::info($admin);
        $groups = $this->roleRepository->getRole();
        \Log::info($groups);
        $currentGroup = $admin->roles->first()->id ?? '';
        \Log::info($currentGroup);

        return view('admin.settings.manage_user.update', compact('admin', 'groups', 'currentGroup'));
    }
```
> Debug everywhere

Còn chưa kể với anh em muốn đào sâu nghiên cứu Laravel như mình, xem request truyền từ đâu đến đâu, việc debug ở nhiều file khác nhau bằng `dd()` hoặc `Log::info()` thực sự bất tiện. Và đây là lúc `Xdebug` phát huy tác dụng của mình.
Mình biết tới Xdebug thông qua một buổi chia sẻ của một ông anh trong group. Mạn phép nay được chia sẻ với mọi người.
# 2. Giải quyết vẫn đề
## 2.1 Cài đặt Xdebug
Ở đây mình dùng linux nên cách bật terminal lên và gõ lệnh 
```bash
# ubuntu 
$ sudo apt-get install php-xdebug
# macos
$ brew install php71-xdebug
#centos 7
$ yum install php-xdebug
```
Tiếp theo là ghi nội dung cấu hình php vào file `php-info.txt` rồi copy chúng vào ô input trên [trang xdebug](https://xdebug.org/wizard.php)
Bằng lệnh sau
```bash
$ php -i > php-info.txt //Ghi nội dung vào file php-info.txt
$ sudo nano php-info.txt // Lấy nội dung 
```
Nội dụng file php-info.txt thường sẽ là 
![](https://images.viblo.asia/d8549fbe-2b54-4405-9683-26ff81089729.png)
Copy paste nội dung vào trang chủ
![](https://images.viblo.asia/8b4d8c5f-d35b-459f-94f2-327151f3e967.png)

Tiếp theo là kiểm tra và cấu hình Xdebug 
```bash
$ php -m | grep xdebug
xdebug //Khá ổn
```
Cấu hình, tìm tới file php.ini và thêm vào cuối file 
```bash
[xdebug]
xdebug.remote_enable=1
xdebug.remote_autostart=1
```
Việc cuối cùng là check lại xem đã ăn xdebug chưa 
```bash
FRAMGIA\nguyen.huu.su@framgia0110-pc:~$ php -i | grep xdebug.remote
xdebug.remote_addr_header => no value => no value
xdebug.remote_autostart => On => On
xdebug.remote_connect_back => Off => Off
xdebug.remote_cookie_expire_time => 3600 => 3600
xdebug.remote_enable => On => On
xdebug.remote_handler => dbgp => dbgp
xdebug.remote_host => localhost => localhost
xdebug.remote_log => no value => no value
xdebug.remote_mode => req => req
xdebug.remote_port => 9000 => 9000
xdebug.remote_timeout => 200 => 200
```
Trên VS Code thì cực kì đơn giản, mọi người chỉ cần cài đặt PHP Debug
![](https://images.viblo.asia/bc410aba-0a20-4e35-96f7-3373f6df556e.png)
Nó ngay cái đầu tiên ấy, mình install vào rồi nên nó không hiện nút để install =)). Xong cấu hình nhé, giờ thì nhảy vào debug
## 2.2 Tiến hành Debug

Mình sẽ tiến hành debug trên Laravel. Ở đây cụ thể mình sẽ debug trong function `index()` của `HomeController`.
Mình đặt break point ở dòng 11 `return view('home')`.
![](https://images.viblo.asia/96fa505f-4907-4f71-89ae-0a365371db1f.png)
Khi lựa chọn môi trường PHP nó sẽ sinh ra 1 file launch.json chỉ cần save nội dung file này là được 
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for XDebug",
            "type": "php",
            "request": "launch",
            "port": 9000
        },
        {
            "name": "Launch currently open script",
            "type": "php",
            "request": "launch",
            "program": "${file}",
            "cwd": "${fileDirname}",
            "port": 9000
        }
    ]
}
```
Tiến hành kích hoạt xdebug để nó watching trong project 
![](https://images.viblo.asia/61ddab98-6094-4ef4-87da-c1f4378ccf58.png)
Giờ thì chỉ cần gọi đến hàm để nó tiến hành debug. Ở đây route mình khai báo là 
```php
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/home', 'HomeController@index')->name('home');
```
Lên sau khi chạy serve mình gọi url `http://localhost:8000/home`
![](https://images.viblo.asia/f39e8dbc-1e0d-42ec-9ad1-1f87f0665720.gif)
Bùm !!! Vậy là quá trình debug bắt đầu. Bạn có thể để ý khung call stack bên trái, Xdebug lưu lại toàn bộ quá trình mà Laravel đã tạo ra 1 file view là render lên trình duyệt 
1.  Đầu tiên là chạy vào `require_once __DIR__.'/public/index.php';` file server.php để require_once file index.php
2.  Khởi tạo các biến `$request` ở dòng 55 file index.php
3.  Sau 1 tỉ bước thì nó mới nhảy được vào hàm `index()` 

Bạn nào muốn đào sâu Laravel, xem chi tiết từng request có thể vào mò mẫm trong này. :D 

Ngoài Laravel bạn còn có thể debug đoạn code nào của php. Cùng xem ví dụ sau 
```php
<?php
$firstNumber = 5;
$secondNumber = 5;
$sum = $firstNumber + $secondNumber;
if ($sum === 10) {
    echo "sum = 10";
} else {
    echo "sum != 10";
}

```
Khi sử dụng Xdebug ta sẽ theo dõi từng giá trị của biến mà không phải `var_dump()` everywhere 

![](https://images.viblo.asia/10e9d188-9e64-432d-aab0-32b7ec1e25ef.png)
 Như trên hình bạn có thể thấy tất cả giá trị của biến trong đoạn code được hiện thị ra trên VsCode, thật tiện cho việc Debug.
 # 3. Tổng kết
Như vậy là mình đã hướng dẫn các bạn cách để sử dụng Xdebug cho việc debug cũng như theo dõi toàn bộ quá trình xử lí của Laravel.
Mọi thắc mắc đóng góp vui lòng comment bên dưới. Cảm ơn các bạn đã theo dõi bài viết.

Nguồn tham khảo: [Xdebug Doc ](https://xdebug.org/)