# Introduction

`SweetAlert2` là 1 package được sử dụng để  tùy chọn hiêt thị các alert trên website.

> Package `SweetAlert2` chỉ hổ trợ từ phiên bản laravel 5.5 trở lên.
# Install
Để cài đặt SweetAlert2 trong laravel, chúng ta sử dụng composer.

```
composer require realrashid/sweet-alert
```

### Configuration
Sau khi cài đặt xong package, chúng ta phải đăng kí `RealRashid\SweetAlert\SweetAlertServiceProvider::class` trong file `config/app.php`.
```
'providers' => [
    // Other service providers...

    RealRashid\SweetAlert\SweetAlertServiceProvider::class,
],
```

Thêm `Alert` facade vào `aliases`.
```
'Alert' => RealRashid\SweetAlert\Facades\Alert::class,
```

### Thêm thư viện `sweetalert2.js` vào layout

Install thư viện javascript `sweetalest2` băng npm 
```
npm i sweetalert2
```
hoặc sử dụng link cdn
```
<script src="https://unpkg.com/sweetalert2@7.18.0/dist/sweetalert2.all.js"></script>
```

Trong file master layout của bạn, import thư viện `sweetalest2`.
```
<script src="https://unpkg.com/sweetalert2@7.18.0/dist/sweetalert2.all.js"></script>
```
Sau đó include sweetalert view.
```
@include('sweetalert::alert')
```

# Usage
### Sử dụng `Facade`

Đầu tiên bạn phải import Alert Facade, `use RealRashid\SweetAlert\Facades\Aler;` or `Use Alert;` trong controller.

```
Alert::alert('Title', 'Message', 'Type');
Alert::success('Success Title', 'Success Message');
Alert::info('Info Title', 'Info Message');
Alert::warning('Warning Title', 'Warning Message');
Alert::error('Error Title', 'Error Message');
Alert::question('Question Title', 'Question Message');
Alert::html('Html Title', 'Html Code', 'Type');
Alert::toast('Toast Message', 'Toast Type', 'Toast Position');
```

### Sử dụng hàm `helper`
**Alert**
```
alert('Title','Lorem Lorem Lorem', 'success');

alert()->success('Title','Lorem Lorem Lorem');

alert()->info('Title','Lorem Lorem Lorem');

alert()->warning('Title','Lorem Lorem Lorem');

alert()->question('Title','Lorem Lorem Lorem');

alert()->error('Title','Lorem Lorem Lorem');

alert()->html('<i>HTML</i> <u>example</u>'," You can use <b>bold text</b>, <a href='//github.com'>links</a> and other HTML tags ",'success');
```
**Toast**
```
toast('Your Post as been submited!','success','top-right');
```

# Demo
### Success Alert & Success Error

Hiển thị thông báo khi tạo 1 post thành công hoặc thất bại.
```
public function store(PostRequest $request)
{
    $post = Post::create($request->all());

    if ($post) {
        alert()->success('Post Created', 'Successfully'); // hoặc có thể dùng alert('Post Created','Successfully', 'success');
    } else {
        alert()->error('Post Created', 'Something went wrong!'); // hoặc có thể dùng alert('Post Created','Something went wrong!', 'error');
    }
    
    return redirect()->route('posts.index');
}
```

![](https://images.viblo.asia/8eabdf6f-7380-4844-89f6-bc2693622496.png)

![](https://images.viblo.asia/e46d41b6-9dd8-4c04-a085-5609c366f054.png)

# Methods Definition
**`persistent($showConfirmBtn, $showCloseBtn)`**
```
->persistent(false,true)
```
Hàm này có 2 đối số truyền vào:
* `$showConfirmBtn`: giá trị mặc định là true, cài đặt hiển thị buttom comfirm.  
* `$showCloseBtn` mặc định là false, cài đặt hiển thị buttom close.  

**`autoClose($milliseconds)`**
```
->autoClose(5000);
```
Đối số  `$milliseconds` có giá trị mặc định 5000, set tự động ẩn alert.
**`showConfirmButton($btnText, $btnColor)` `showCancelButton($btnText, $btnColor)` `showCloseButton($btnText, $btnColor)`**
```
->showConfirmButton('Button Text','#3085d6');
->showCancelButton('Button Text','#3085d6');
->showCloseButton('Button Text','#3085d6');
```
Config button confirm, cancel, close.

**`footer($htmlcode)`**
```
->footer('<a href>This is html codes :D</a>');
```
Import code html vào footer của alert.

**`toToast($position)`**

`$position` mặc định: 'top-right'.
```
->toToast();
```
# Một vài hình ảnh demo

![](https://images.viblo.asia/ced0bbda-ea23-48e8-b2d8-6a07dac53d9d.png)

![](https://images.viblo.asia/982b4b9a-45d9-440d-b1ec-43d4d6b3ea8f.png)

![](https://images.viblo.asia/50d377a1-31c5-435e-8308-530c8a3aaf23.png)

![](https://images.viblo.asia/a58ddef1-9bd6-448a-b3d6-bdc1438644b5.png)

![](https://images.viblo.asia/ca23f2a5-f1b7-4ddc-9045-17971eaba59c.png)


> Các bạn có thể tham khảo chi tiết tại https://github.com/realrashid/sweet-alert