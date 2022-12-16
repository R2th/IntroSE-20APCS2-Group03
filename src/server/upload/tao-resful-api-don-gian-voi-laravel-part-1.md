Trong bài này, mình sẽ hướng dẫn cách tạo Resful API đơn giản với Laravel PHP.

Công cụ cần thiết:

* PHP 7.1 or Higher
* Composer
* MySql
* Laravel 5.6 or Higher
* Postman

Để hiểu được bài này thì các bạn cũng phải có kỹ năng lập trình PHP cơ bản nhé! :)

Chúng ta sẽ build ra một app CRUD. Vậy CRUD là gì ? Đó là Create, Read, Update, and Delete. App chúng ta sẽ có những điểm cơ bản sau đây:

`GET /api/students`  trả về toàn bộ danh sách học sinh theo  `GET` request.

`GET /api/students/{id}` trả về cụ thể một học sinh có mã ID theo `GET` request.

`POST /api/students` tạo mới một học sinh theo `POST` request.

`PUT /api/students/{id}` update một học sinh trong danh sách với mã ID có sẵn với `PUT` request.

`DELETE /api/students/{id}` xoá một học sinh ra khỏi danh sách vứoi `DELETE` request.

Lớp Student (học sinh) này thì chỉ có trường name (tên) và course (môn học) .

### Tạo project với Laravel

$create-project --prefer-dist laravel/laravel api-prj "5.8.*"

$php artisan serve

Sau đó trên https://localhost:8000 sẽ hiển thị thế này:

![](https://images.viblo.asia/4abe626b-d4f7-4e36-ade9-c1143add30b7.png)

Kế tiếp chúng ra sẽ tạo database cho project:

`$ mysql -uroot -p`  // Đăng nhập vào MySQL

Tạo một database mới:

CREATE DATABASE 'laravel';

Lúc nào trong Phpadmin thì Database đã tạo thành công:

![](https://images.viblo.asia/567c7987-d728-478e-bce1-d94bc6f50147.png)

Bây giờ chúng ta sẽ tiến hành tạo Modal để tiến hành làm việc với migration. Chạy lệnh sau:

`$php artisan make:model Student -m `

hoặc

`$php artisan make:model Student migration`

File mới được tạo ra app/Student.php nhưng để tương để tương tác với database chúng ta update lại như sau:

```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = "students";

    protected $fillable = ['name', 'course'];
}
```

 Hơn nữa thì một migration file được tạo ra ở thư mực `database/migrations` để tạo bảng dữ liệu. Chúng ra sẽ phải chỉnh sửa lại file này để tạo ra cột name và courses, với kiểu dữ liệu cho phù hợp với cột đó:
 
 ```
 public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('course');
            $table->timestamps();
        });
    }
```

Kế tiếp, chúng ra cần chỉnh sửa một chút ở file .env để app có thể tác với máy chủ mysql:

```
DB_CONNECTION=mysql
DB_HOST=172.20.0.2
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=user
DB_PASSWORD=password
```

Kế tiếp chúng ra sẽ migrate project với cơ sở dữ liệu:

` $php artisan migrate`

Kết quả database tạo ra các bảng như hình sau:

![](https://images.viblo.asia/3cd5090c-ea93-4ed3-a44d-cac88c85ee20.png)


 Như vậy là phần setup và tạo cơ sở dữ liệu đã xong, phần kế tiếp chúng ta sẽ nghiên cứu về Route cũng như Modal.