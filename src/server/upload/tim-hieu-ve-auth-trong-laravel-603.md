# 1.  Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;Sau những ngày lang bạt những kiến thức khác, mình nhìn lại một Framework đang làm nó đã có sự thay đổi khá nhiều. Bài này sẽ tìm hiểu lại nó để đỡ quên. Giờ mình đi tìm hiều `auth` trong Framework `laravel`. `Auth` là gì. Thì chúng đơn giản là phần đăng kí, đăng nhập, reset passwork ...
# 2. Nội dung
1.  Cài đặt framework
2.  Tìm hiểu và cài đặt auth 
3.  Những kiến thức liên quan

### 1. Cài đặt framework
&nbsp;&nbsp;&nbsp;&nbsp;Cài đặt băng `composer`. Chúng ta mở Terminal lên  và thực hiện gõ lệnh dưới đây.
> composer create-project --prefer-dist laravel/laravel my_all

&nbsp;&nbsp;&nbsp;&nbsp;Khi cài đặt xong ta có framework laravel phiên bản mới nhất. Như bản hiện tại là `Laravel Framework 6.0.3`.


### 2. Tìm hiểu và cài đăt auth
Từ những phiên bản trước ta sẽ thực hiện 
> php artisan make:auth

&nbsp;&nbsp;&nbsp;&nbsp;Để thực hiện tạo các chức năng mà laravel làm sẵn cho chúng ta.

&nbsp;&nbsp;&nbsp;&nbsp;Nhưng ở phiên bản này, khi cài đặt framwork đã có sẵn các controller cũng như model sẵn rồi, nhưng lại chưa có view để ta trỏ tới.
do vậy chúng ta phải thực hiên cài thư viên kèm theo đó là
> composer require laravel/ui --dev

và sau đó ta cần thêm lệnh này 

> php artisan ui vue --auth 

để render ra view mặc định của laravel.

Đừng quên tạo ra một db cho app nha, sau đó chạy 

   > php artisan migrate
  
mục đích cái này là render table user để phục vụ cho các chức năng liên quan auth.

giờ đây ta xem chức năng có những gì nào nha...đây là mặc định thôi nha
![Home](https://images.viblo.asia/01fcce98-1dda-448d-b37c-c11ab97eb801.png)

Đây là giao diện mặc định của laravel làm cho chúng ta. Từ đây ta có thể thấy có chức năng login, register 
![Register](https://images.viblo.asia/dcb48a25-2eb8-43b5-8f98-da1ae106bec6.png)

Bên trên là form cơ bản để đăng kí người dùng, cũng rất tuyệt đó..được validate đầy đủ nha

![Login](https://images.viblo.asia/e0c9dd6b-bf51-4966-acf9-97b2a51326b4.png)

bên trên là login, ngoài ra ta còn thấy ở đây là có thêm chức năng reset mật khẩu.

![](https://images.viblo.asia/23ad77c1-5485-4c17-945c-4044cd1d06fd.png)

Đây là 3 chức năng khá cơ bản, tùy vào mục đích và ý muốn mà ta custom.
### 3. Những kiến thức liên quan
Có 2 cụm từ `Guards` và `Providers` chúng ta cần tìm hiểu nó là gì nha.

**Guards**  giống như là một nhà cung cấp logic dùng để xác thực. Ở laravel ta hay dùng `session guard` hoặc `token guard` dùng .

&nbsp;&nbsp;&nbsp;&nbsp;Để duy trì trạng thái người dùng trong mỗi lần request bằng cookie ta dùng `session guard`. Phía còn lại `token guard` dùng để xác thực người dùng bằng cách kiểm tra token có hợp lệ hay không trong mỗi lần request.

**Providers** giúp chúng ta lấy dữ liệu người dùng từ phía back-end. Laravel hỗ trợ cho việc người dùng truy xuất dữ liệu qua Eloquent và Query Buider vào database.

Trên là 2 cụm từ ta có thể nhìn thấy trong code, và ta có thể sử dụng nó khi hiểu về nó.

Mặc định laravel sinh ra cho ta các controller sau `LoginController, RegisterController, ResetPasswordController`. Ở trong mỗi controller này đều có 
```php 
protected $redirectTo = '/home';
```
đây là biến chuyển hướng sau khi thực hiện tác vụ.. ví dụ khi login xong ta muốn bay vào màn hình nào đó.


mặc đinh laravel cho chúng ta đăng kí, đăng nhập bằng email, nhưng ở đây ta có thể config sang username

```php
public function username()
{
    return 'username';
}
```

Chúng ta có thể truy xuất người dùng đã xác thực

```php 
$id = Auth::user()->id; hoặc Auth::id() //Lấy về ID người .
$user = Auth::user() // Lấy về tất cả các thông tin của người dùng.
$email = Auth::user()->email // Lây về email người dùng.
```

nhưng muốn dùng được ta phải `use Illuminate\Support\Facades\Auth`


Để kiểm người dùng đã đăng nhập hệ thống chưa ta dùng 

```php
if (Auth::check()) {
echo "ok login";
}
```

Ngoài cách sử dụng `route('logout')` để logout user ra ngoài khỏi hệ thống thì chúng ta có thể sử dụng `Auth::logout()`.


# Kết luận
Chúng ta đã dùng được các chức năng Auth cơ bản của laravel. Lần tới ta sẽ đi tìm hiểu sâu hơn, và làm theo ý muốn nhé

# Tài liệu tham khảo
[Tài liệu 1](https://laravel.com/docs/6.x/authentication)