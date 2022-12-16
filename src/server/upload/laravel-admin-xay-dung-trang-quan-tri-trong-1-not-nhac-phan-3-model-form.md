## Giới thiệu 
Ở phần 2, chúng ta đã tìm hiểu các cách để custom trang Index - hiển thị bảng dữ liệu sinh động với các chức năng mạnh mẽ trong Laravel-admin. Phần thứ 3 này, chúng ta sẽ xem làm thế nào để tạo ra trang Create/Edit thực hiện tác vụ thêm sửa xóa dữ liệu nhé.

Để custom trang Create/Edit thì chúng ta chỉ cần chỉnh sửa trong function `form()` trong Controller:

```php
<?php

namespace App\Admin\Controllers;

use App\Models\User;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;

class UserController extends AdminController
{
    ...
    protected function form()
    {
        $form = new Form(new User());

        $form->text('name', __('Name'));
        $form->email('email', __('Email'));
        $form->datetime('email_verified_at', __('Email verified at'))->default(date('Y-m-d H:i:s'));
        $form->password('password', __('Password'));
        $form->text('remember_token', __('Remember token'));

        return $form;
    }
}
```

### 1. Cách sử dụng cơ bản
Thêm input để xử lý dữ liệu:
```php
// Hiển thị ID của record
$form->display('id', 'ID');

// Thêm input dạng text
$form->text('title', 'Movie title');

// Input dạng select
$directors = [
    'John'  => 1,
    'Smith' => 2,
    'Kate'  => 3,
];

$form->select('director', 'Director')->options($directors);

// Input dạng textarea
$form->textarea('describe', 'Describe');

// Input dạng number
$form->number('rate', 'Rate');

// Input dạng select DateTime
$form->dateTime('release_at', 'release time');
```

Tùy chỉnh các nút chức năng mặc định ở Header
```php
$form->tools(function (Form\Tools $tools) {
    // Disable `List` btn.
    $tools->disableList();

    // Disable `Delete` btn.
    $tools->disableDelete();

    // Disable `view` btn.
    $tools->disableView();

    // Thêm 1 btn tùy chỉnh
    $tools->add('<a class="btn btn-sm btn-danger"><i class="fa fa-trash"></i>&nbsp;&nbsp;delete</a>');
});
```

Tùy chỉnh các nút chức năng mặc định ở Footer
```php
$form->footer(function ($footer) {
    // Disable reset btn
    $footer->disableReset();

    // Disable submit btn
    $footer->disableSubmit();

    // Disable `View` checkbox
    $footer->disableViewCheck();

    // Disable `Continue editing` checkbox
    $footer->disableEditingCheck();

    // Disable `Continue Creating` checkbox
    $footer->disableCreatingCheck();

});
```

Để xác định xem trang biểu mẫu hiện tại là Create hay Edit ta sử dụng method:
```php
$form->isCreating();

$form->isEditing();
```

### 2. Form Fields
Các public methods tương ứng các attributes trong thẻ input HTML:

```php
// Set the value to save
$form->text('title')->value('text...');

// Set default value
$form->text('title')->default('text...');

// Set help message
$form->text('title')->help('help...');

// Set attributes of field element
$form->text('title')->attribute(['data-title' => 'title...']);
$form->text('title')->attribute('data-title', 'title...');

// Set placeholder
$form->text('title')->placeholder('Please input...');

// Set required
$form->text('title')->required();

// Setting pattern
$form->text('title')->pattern('[A-z]{3}');

// Setting readonly
$form->text('title')->readonly();

// Setting disable
$form->text('title')->disable();

// Setting autofocus
$form->text('title')->autofocus();
```

**Text Input:**
```php
$form->text($column, [$label]);

// Thêm các rules để validate input 
$form->text($column, [$label])->rules('required|min:10');

// Set FontAwesome icon
$form->text($column, [$label])->icon('fa-pencil');

// Set datalist
$form->text($column, [$label])->datalist(['key' => 'value']);

// Set inputmask, xem thêm tại https://github.com/RobinHerbots/Inputmask
$form->text('code')->inputmask(['mask' => '99-9999999']);

```

**Textarea:**
```php
$form->textarea($column[, $label])->rows(10);
```

**Radio, Checkbox:**
```php
$form->radio($column[, $label])->options(['m' => 'Female', 'f'=> 'Male'])->default('m');

$form->checkbox($column[, $label])->options([1 => 'foo', 2 => 'bar', 'val' => 'Option name']);

// Setting options sử dụng closures
$form->checkbox($column[, $label])->options(function () {
    return [1 => 'foo', 2 => 'bar', 'val' => 'Option name'];
});

// Thêm nút check all options
$form->checkbox($column[, $label])->options([])->canCheckAll();
```

**Select:**
```php
$form->select($column[, $label])->options([1 => 'foo', 2 => 'bar', 'val' => 'Option name']);

// Load options bằng Ajax
$form->select('user_id')->options(function ($id) {
    $user = User::find($id);

    if ($user) {
        return [$user->id => $user->name];
    }
})->ajax('/admin/api/users');

// Controller method để xử lý api `/admin/api/users`
public function users(Request $request)
{
    $q = $request->get('q');

    return User::where('name', 'like', "%$q%")->paginate(null, ['id', 'name as text']);
}
```

Select component còn hỗ trợ cho việc xử lý select cha-con phụ thuộc lẫn nhau:
```php
$form->select('province')->options(...)->load('city', '/api/city');

$form->select('city');
```

**Datetime Input:**
```php
$form->time($column[, $label])->format('HH:mm:ss');

$form->datetime($column[, $label])->format('HH:mm:ss');

$form->date($column[, $label])->format('HH:mm:ss');
```

### 3. Image/File Upload

**1. Upload Image:**

Để sử dụng local upload, chúng ta phải cấu hình thư mục tải lên tại `upload.image` trong file `config/admin`
```php
$form->image($column[, $label]);

// Tùy chỉnh đường dẫn lưu file và tên file
$form->image($column[, $label])->move($dir, $name);

// crop the picture
$form->image($column[, $label])->crop(int $width, int $height, [int $x, int $y]);

// add watermark
$form->image($column[, $label])->insert($watermark,'center');

// Thêm nút xóa ảnh
$form->image($column[, $label])->removable();

// Giữ lại ảnh khi xóa dữ liệu 
$form->image($column[, $label])->retainable();

// Thêm nút download
$form->image($column[, $label])->downloadable();
```

**2. Upload File:**

Để sử dụng local upload, chúng ta phải cấu hình thư mục tải lên tại `upload.file` trong file `config/admin`
```php
$form->file($column[, $label]);

// Tùy chỉnh đường dẫn lưu file và tên file
$form->file($column[, $label])->move($dir, $name);

// set the upload file type
$form->file($column[, $label])->rules('mimes:doc,docx,xlsx');

// Thêm nút xóa file
$form->file($column[, $label])->removable();

// Giữ lại files khi xóa dữ liệu 
$form->file($column[, $label])->retainable();

// Thêm nút download
$form->file($column[, $label])->downloadable();
```

### 4. Xử lý dữ liệu có quan hệ - Relationship
**1. One to One - Quan hệ 1-1**
Ví dụ model `User` và `Profile` có quan hệ 1-1

**HasOne:**
```php
$form = new Form(new User);

$form->text('name');
$form->text('email');

// Các trường được liên kết với Profile
$form->text('profile.age');
$form->text('profile.gender');
```

- Các sử dụng cho **BelongsTo** và **MorphOne** tương tự như với **HasOne**

**2. One to Many - Quan hệ 1-n**

Ví dụ một `Post` có nhiều `Comment`
```php
// Main table field
$form->text('title')->rules('required');
$form->textarea('content')->rules('required');

// Subtable fields
$form->hasMany('comments','Comment', function (Form\NestedForm $form) {
    $form->text('title');
    $form->text('content');
});
```

**2. Many to Many - Quan hệ n-n**

Ví dụ `User` và `Role` có quan hệ n-n, ta có thể sử dụng `multiselect` hoặc `checkbox`

```php
$form = new Form(new User);

$form->multipleSelect('roles','Role')->options(Role::all()->pluck('name','id'));
// or
$form->checkbox('roles','role')->options(Role::all()->pluck('name','id'));
```

### 5. Form Validation 

Khi làm việc với input không thể thiếu việc validate dữ liệu.Trong Laravel-admin, chúng ta có thể sử dụng các rule validation của Laravel.
```php
$form->text('title')->rules('required|min:3');

// Những xử lý validate phức tạp có thể sử dụng callback
$form->text('title')->rules(function ($form) {
    if (!$id = $form->model()->id) {
        return 'unique:users,email_address';
    }
});

// Custom message error
$form->text('code')->rules('required|regex:/^\d+$/|min:10', [
    'regex' => 'code must be numbers',
    'min'   => 'code can not be less than 10 characters',
]);

// Database unique check
$form->text('username')
     ->creationRules(['required', "unique:user_table"])
     ->updateRules(['required', "unique:user_table,username,{{id}}"]);
```


## Tạm kết

Ở phần 3 này, chúng ta đã cùng nhau tìm hiểu cách tùy chỉnh trang Create/Edit để mạnh mẽ hơn, phục vụ nhiều mục đích hơn khi sử dụng package **`Laravel-admin`**.

Hy vọng bài viết sẽ giúp ích cho các bạn trong quá trình học tập và làm việc. Cảm ơn bạn đã đọc bài ❤️

Nguồn:

- https://laravel-admin.org/docs/en