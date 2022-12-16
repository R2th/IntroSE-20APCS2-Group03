## Tìm hiểu về  elFinder
**elFinder** là một mã nguồn mở tích hợp cho web để quản lý tệp được viết bằng Javascript và sử dụng thư viện Jquery UI. Nó cung cấp bộ thư viện có thể tích hợp cho nhiều ***framework*** và nhiều trình soạn thảo web như ***ckeditor***, ***tinymce*** giúp người dùng một trải nghiệm đơn giản, sáng tạo và đầy tiện lợi.

## Cài đặt và cấu hình elFinder vào Laravel
Hiện tại phiên bản phát triển riêng cho Laravel: https://github.com/barryvdh/laravel-elfinder

Ngoài ra, chúng ta có thể tìm hiểm thêm các cập nhật mới nhất tại: https://github.com/Studio-42/elFinder
### Cài đặt

Cài đặt qua Composer
>  composer require barryvdh/laravel-elfinder

hoặc thêm  vào composer.json
> "barryvdh/laravel-elfinder": "^0.4.1"

Thiết lập **ServiceProvider** vào providers trong file cấu hình tại **app/config/app.php** với nội dung sau:
> Barryvdh\Elfinder\ElfinderServiceProvider::class

Tiếp đó, chúng ta cần copy assets file vào thư mục public bằng command:
>php artisan elfinder:publish

### Cấu hình
Cấu hình mặc định sẽ được tạo gọi bởi file cấu hình trong thư mục public, chúng ta có thể thay đổi các thuộc tính trong file cấu hình này.
> php artisan vendor:publish --provider='Barryvdh\Elfinder\ElfinderServiceProvider' --tag=config

Trong file cấu hình **config/elfinder.php** được sinh ra, chúng ta có thể thay đổi đường dẫn mặc định, quyền truy cập và xác định thuộc tính **roots** riêng.
### Cấu hình Filesystem disks
Laravel có khả năng sử dụng bộ chuyển đổi **FIlesystems** là ổ lưu trữ nội bộ hay một **Cloud** riêng. Chúng ta có thể thêm các nơi lưu trữ khác nhau vào elFinder bằng cách sử dụng cấu hình ổ lưu trữ.
Ví dụ như thêm local disks, public và s3
```
'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
        ],

    ],
```

## Ứng dụng elFinder vào Laravel
### Tạo input với Popup
Chúng ta có thể tham khảo một số thuộc tính cấu hình elFinder tại: https://github.com/Studio-42/elFinder/wiki/Connector-configuration-options

**Đoạn code minh họa:**

Khởi tạo một input với popup được viết bằng **Javascript**:
```
@extends('admin.layouts.master')
@section('content')
    <div class="row">
        <div class="col-sm-6">
            <input type="text" id="file_input" class="form-control">
        </div>
        <div class="col-sm-1">
            <button type="button" class="btn btn-default" onclick="openElfinder()">Select image</button>
        </div>
    </div>
    <div class="modal fade" id="elfinderShow">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div id="elfinder"></div>
          </div>
        </div>
      </div>
    </div>

@endsection
@push('scripts')

<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/elfinder.min.css') }}">

<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/theme.css') }}">

<!-- elFinder JS (REQUIRED) -->
<script src="{{ asset('assets/js/elfinder.min.js') }}"></script>

<script type="text/javascript">
    function openElfinder(){
        $('#elfinderShow').modal();

        $('#elfinder').elfinder({
            debug: false,
            lang: 'jp',
            width: '100%',
            height: '80%',
            customData: {
                _token: '{{ csrf_token() }}'
            },
            commandsOptions: {
                getfile: {
                    onlyPath: true,
                    folders: false,
                    multiple: false,
                    oncomplete: 'destroy'
                },
                ui : 'uploadbutton'
            },
            mimeDetect: 'internal',
            onlyMimes: [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif'
            ],
            url: '{{ route("elfinder.connector") }}',
            soundPath: '{{ asset('packages/barryvdh/elfinder/sounds') }}',
            getFileCallback: function(file) {
                //Something code
            
                $('#elfinderShow').modal('hide');
            },
            resizable: false
        }).elfinder('instance');

    }
</script>
@endpush
```
Kết quả như hình:
![](https://images.viblo.asia/5255ac4e-4a67-4614-95b9-ab680342f9bf.png)

![](https://images.viblo.asia/51bf2c65-8591-48e4-99fd-8de1730aac91.png)

### Tích hợp elFinder vào CKeditor
Chúng ta có thể tích hợp vào CKeditor với route name sau:
> 'elfinder.ckeditor'

Cấu hình CKeditor config file:
> config.filebrowserBrowseUrl = APP_URL +  '/elfinder/ckeditor';
> 



**Nguồn tham khảo:**
> https://github.com/barryvdh/laravel-elfinder
> 
> https://github.com/Studio-42/elFinder/wiki/Connector-configuration-options