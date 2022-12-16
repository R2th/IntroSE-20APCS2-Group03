# Giới thiệu
Bài viết này mình xin tổng hợp một số exception thường gặp khi phát triển các ứng dụng liên quan đến framework Laravel và các cách khắc phục chúng.
# Các lỗi thường gặp
## 1. RuntimeException in EncryptionServiceProvider.php
### Exception
![](https://images.viblo.asia/6c7c6257-688b-484a-8b76-1fe9b827bc21.png)
### Solution
Chạy command
```
php artisan key:generate
```
## 2. Whoops, looks like something went wrong... require(../vendor/autoload.php)
### Exception
![](https://images.viblo.asia/3876f036-f73e-4908-b470-0ca8e0fc4db5.png)
### Solution
Chạy command
```
composer install
```
hoặc 
```
composer update
```
**Note:** Khi dùng composer update xin lưu ý version của các package trong composer.json ạ.
## 3. [PDO Exception] SQLSTATE[HY000] [1045] Access denied for user ****@'localhost' (using password: YES)
### Exception
![](https://images.viblo.asia/d7e3b07e-b8cf-4f43-8996-f4ee41468927.jpg)
### Solution
1. Kiểm tra cấu hình database trong **.env:**
```
DB_HOST=database_host
DB_DATABASE=database_name
DB_USERNAME=database_username
DB_PASSWORD=database_password
DB_LOGQUERY=true
```
 
2. Sau khi thay đổi lại cấu hình, các bạn hãy restart lại server và trình duyệt nhé.

3. Nếu lỗi vẫn xảy ra, hãy chạy command:
```
php artisan config:clear
```
## 4. [ReflectionException] Class CategoryTableSeeder does not exist
### Exception
![](https://images.viblo.asia/e4047957-d4c5-4ce6-be42-61249533ebb7.png)
### Solution
Nếu class CategoryTableSeeder **đúng đường dẫn, đúng tên, đúng đuôi file** mà vẫn báo lỗi thì hãy chạy comand:
```
composer dump-autoload
```
## 5. TokenMismatchException in VerifyCsrfToken.php
### Exception
![](https://images.viblo.asia/4ff79dd1-cc29-4ca2-bb02-49fab2e0c830.jpg)
### Solution
1. Thêm token vào form khi submit:
```
{{ csrf_field() }}
```
hoặc 
```
<input type="hidden" name="_token" value="{!! csrf_token() !!}">
```
**Note:** Form::open() và Form::model() tự động generate ra token khi bạn sử dụng package illuminate/html hoặc laravelcollective/html.

2. Nếu bạn submit form bằng ajax, hãy thêm đoạn code này vào đầu file JS của bạn:
```
$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
```
## 6. NotFoundHttpException in RouteCollection.php
### Exception
![](https://images.viblo.asia/833f3d3f-654a-44ef-b6f9-37d2368d3780.png)
### Solution
```
sudo chmod -R 777 storage
```
```
sudo chmod -R 777 bootstrap/cache
```
## 7. [Illuminate\Database\QueryException] SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes
### Exception
![](https://images.viblo.asia/b8e21ac5-8847-4a19-b5c5-ab60a90e4730.png)
### Solution
Mở file **AppServiceProvider.php** và override lại function **boot()**:
```
use Illuminate\Support\Facades\Schema;

.....

public function boot()
{
    Schema::defaultStringLength(191);
}
```
## 8. MassAssignmentException
### Exception
![](https://images.viblo.asia/1379d9cd-e8e1-4ee2-8c0d-1008619d9a05.png)
### Solution
Mass Assignment chỉ định những cột nào cho phép được sử dụng bằng cách khai báo chúng vào trong biến **$fillable** hoặc **$guarded** để đảm bảo an toàn cho DB vì chúng ta sẽ không thể biết được user sẽ đưa vào những giá trị như nào và chúng có hại hay là không.

Để sửa lỗi này, chúng ta sẽ bổ sung thêm $fillable hoặc $guarded trong Model. Ví dụ:
```
class Ticket extends Model
{
     protected $fillable = ['title', 'content', 'slug', 'status', 'my_attribute'];
}
```

## 9. MethodNotAllowedHttpException
### Exception
![](https://images.viblo.asia/3d8f6a26-3401-4f3b-96f7-abf4a04fb002.png)
### Solution
Laravel sẽ không cho phép chúng ta thực hiện việc **UPDATE** hoặc **DELETE** mà không có token. Ví dụ:
```
<a href="{!! action('TicketsController@destroy', $ticket->slug) !!}" class="btn btn-info" onclick="return confirm('Are you sure?')" >
     Delete
</a>
```
=> Cần phải sửa thành:
```
<form method="post" action="{!! action('TicketsController@destroy', $ticket->slug) !!}" class="pull-left">
    {{ csrf_field() }}
    {{ method_field('DELETE') }}
    <div>
        <button type="submit" class="btn btn-warning">Delete</button>
    </div>
</form>
```
Đối với việc update thì chúng ta sẽ đổi thành:
```
{{ method_field('PUT') }}
```
## 10. ModelNotFoundException
### Exception
![](https://images.viblo.asia/f3ef626d-966f-4c13-88d2-ed3773339d68.png)
### Solution
Lỗi này thường xảy ra khi chúng ta thực hiện findOrFail($id) hoặc firstOrFail ($id) nhưng $id bạn đang cố lấy không tồn tại trong cơ sở dữ liệu.

=> Kiểm tra lại DB và check $id nhé :D 
# Tài liệu tham khảo
https://hoclaptrinh.vn/posts/7-loi-thuong-gap-khi-lam-viec-voi-laravel-framework

https://viblo.asia/p/tim-hieu-laravel-tu-so-0-p4-EyORkbxjGqB

http://tutlaravel.blogspot.com/2015/10/khac-phuc-mot-so-loi-thuong-gap-khi-cai.html

https://laracasts.com/discuss/channels/tips/a-list-of-most-common-laravel-errors-exceptions