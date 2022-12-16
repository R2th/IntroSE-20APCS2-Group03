## Giới thiệu
Laravel cung cấp 1 bộ lệnh command Artisan vô cùng mạnh mẽ và làm đơn giản hóa công việc coding. Có lẽ chúng ta thường sử dụng nhất là lệnh `make:xxx` như `make:model` hoặc `make:migration`,... Nhưng bạn có biết tất cả lệnh đó không? Hơn nữa, bạn có biết các parameters của chúng có thể giúp tạo code nhanh hơn không?

Phiên bản mình đang sử dụng là Laravel 8.14.0, ở phiên bản này cung cấp đến 23 lệnh `laravel artisan make:xxx`:

```
make:cast            Create a new custom Eloquent cast class
make:channel         Create a new channel class
make:command         Create a new Artisan command
make:component       Create a new view component class
make:controller      Create a new controller class
make:event           Create a new event class
make:exception       Create a new custom exception class
make:factory         Create a new model factory
make:job             Create a new job class
make:listener        Create a new event listener class
make:mail            Create a new email class
make:middleware      Create a new middleware class
make:migration       Create a new migration file
make:model           Create a new Eloquent model class
make:notification    Create a new notification class
make:observer        Create a new observer class
make:policy          Create a new policy class
make:provider        Create a new service provider class
make:request         Create a new form request class
make:resource        Create a new resource
make:rule            Create a new validation rule
make:seeder          Create a new seeder class
make:test            Create a new test class
```

Kể từ phiên bản Laravel 6.x, câu lệnh `make:auth` đã bị xóa và tách ra thành UI package cho riêng nó.

Danh sách trên không cung cấp cho chúng ta bất kỳ thông tin nào về các tham số hoặc tùy chọn cho các lệnh này. Vì vậy, mình muốn giới thiệu tổng quan về từng loại ở đây, bắt đầu với những cái thường được sử dụng nhất.

### 1. make:controller

Câu lệnh này tạo 1 file controller mới trong thư mục `app/Http/Controllers`
```
php artisan make:controller UserController
```

**Parameters:**
- Controller sẽ chứa 1 method cho mỗi hoạt động tài nguyên có sẵn, bao gồm: `index()`, `create()`, `store()`, `show()`, `edit()`, `update()`, `destroy()`.

```
--resource
```

- Tương tự như `--resource` ở trên, nhưng chỉ tạo ra 5 phương thức: `index()`, `store()`, `show()`, `update()`, `destroy()`. Bởi vì create/edit form không cần thiết cho API.
```
--api
```

- Tạo controller với magic method `__invoke()`
```
--invokable
```

- Model sẽ được tạo và sử dụng trong resource controller's method hay còn gọi là route model binding.
```
--model=Team
```

### 2. make:model

Câu lệnh này giúp chúng ta tạo một class Eloquent model.
```
php artisan make:model Photo
```

**Parameters:**
- Tạo 1 file migration với model tương ứng.
```
--migration

// or
--m
```

- Tạo 1 file controller với model tương ứng
```
--controller

// or
--c
```

- Tạo 1 file resource controller với model tương ứng
```
--resource

// or
--r
```

- Câu lệnh này chấp nhận nhiều tham số cùng lúc
```
php artisan make:model Project --migration --controller --resource

// or shorter
php artisan make:model Project --mcr
```
- Tạo 1 factory mới cho model tương ứng
```
--factory

// or
--f
```
- Để tạo tất cả các thứ kể trên, bao gồm: migration, factory, resource controller, chúng ta sử dụng tham số
```
--all

// or
--a
```
- Tạo class model cho dù nó đã tồn tại
```
--force
```
- Tạo model cho bảng trung gian - pivot table
```
--pivot
```

### 3. make:migration 
Câu lệnh này giúp chúng ta tạo một file migration.
```
php artisan make:migration create_teams_table
```
**Parameters:**
- Mặc định tên table sẽ được lấy theo cấu trúc `create_xxx_table` với `xxx` là tên table, nếu bạn muốn sử dụng 1 tên khác hãy sử dụng tham số sau đây
```
--create=Table_name
```
- Tạo file migration để chỉnh sửa cho 1 table
```
--table=Table_name
```
- Mặc định file migration sẽ được tạo trong thư mục database/migrations, nếu bạn muốn lưu trong thư mục khác hãy sử dụng tham số dưới đây
```
--path=Path_name
```
- Để xuất ra màn hình terminal đường dẫn của file migration, ta sử dụng 1 trong 2 tham số sau
```
// đường dẫn tuyệt đối
--realpath

// đường dẫn đầy đủ
--fullpath
```

### 4. make:seeder

Câu lệnh này giúp chúng ta tạo 1 class seeder để seed dữ liệu.
```
php artisan make:seeder TeamsSeeder
```

**Parameters:** không có.
### 5. make:request
Để tạo 1 form request ta sử dụng câu lệnh
```
php artisan make:request StoreTeamRequest
```
Nó sẽ tạo 1 form request class trong thư mục `app/Http/Requests`.

**Parameters:** không có.

### 6. make:middleware
Câu lệnh này giúp chúng ta tạo 1 class middleware
```
php artisan make:middleware CheckAge
```
**Parameters:** không có.
### 7. make:policy
Tạo 1 class policy mới.

```
php artisan make:policy PostPolicy
```

**Parameters:**
- Nếu bạn muốn tạo 1 file policy với các method tương ứng CRUD
```
--model=Post
```

### 8. make:command
Tạo 1 câu lệnh artisan mới.
```
php artisan make:command SendEmails
```
- Tự động gán tên câu lệnh vào thuộc tính `$signature` của class
```
--command=send-emails
```
**Lưu ý:** Khi run câu lệnh artisan bạn không cần phải nhập đúng tên câu lệnh, chỉ cần gõ một vài chữ cái bắt đầu của tên, nếu cụm chữ cái đó là duy nhất thì câu lệnh sẽ được thực thi.
### 9. make:event
Để tạo 1 class event để xử lý sự kiện, ta sử dụng câu lệnh:
```
php artisan make:event OrderShipped
```
**Parameters:** không có.
### 10. make:listener
Có event thì không thể thiếu class listener để lắng nghe sự kiện rồi
```
php artisan make:listener SendShipmentNotification 
```
**Parameters:**
- Gán event mà class listener sẽ lắng nghe
```
--event=Event
```
- Việc lắng nghe sự kiện sẽ được đẩy vào hàng đợi và xử lý sau
```
--queued
```
### 11. make:job
Class job sẽ được tạo mới và lưu vào thư mục `app/Jobs` thông qua câu lệnh:
```
php artisan make:job NewJob
```
Class được tạo sẽ implement `Illuminate\Contracts\Queue\ShouldQueue` interface để đẩy job vào hàng đợi để chạy không đồng bộ (async)

**Parameters:**
- Để 1 job chạy đồng bộ ta sử dụng tham số
```
--sync
```
## Tạm kết
Trên đây mình đã liệt kê danh sách 11/23 câu lệnh `php artisan make:xxx` có sẵn trong Laravel. Hy vọng sẽ giúp ích cho các bạn trong quá trình học tập và làm việc. Cảm ơn các bạn đã đọc bài ;) 

**Còn tiếp...**