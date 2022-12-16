# 1. Mở đầu
Các trang web về quản trị nội dung (CMS) đều nhúng một trình soạn thảo editor, cho phép người dùng làm việc với văn bản, các hiệu ứng như phông chữ, màu sắc, cùng với hình ảnh khiến cho việc soạn thảo văn bản được thuận tiện hơn. Một số trình soạn thảo phổ biến và miễn phí trên internet như tinyMCE, CKeditor, SummerNote... Ở đây trong bài viết này, tôi muốn giới thiệu với bạn về quá trình cài đặt trình soạn thảo tinyMCE. Không chỉ trình soạn thảo, tôi sẽ tích hợp laravel filemanager vào trình soạn thảo tinyMCE cho phép quản lý các file khi upload.
![](https://images.viblo.asia/8c75333b-8976-409f-81c9-25b711df8cbb.png)
# 2. TinyMCE
## Giới thiệu
- TinyMCE là trình soạn thảo WYSIWYG dựa trên web nguồn mở phổ biến nhất thế giới.
- Được hàng triệu nhà phát triển tin cậy và yêu thích và được tích hợp vào hàng nghìn ứng dụng, chẳng hạn như:
    - Hệ thống quản lý nội dung (CMS)
    - Hệ thống quản lý học tập (LMS)
    - Hệ thống quản lý quan hệ khách hàng (CRM) và tự động hóa tiếp thị
    - Hệ thống tiếp thị qua email
    - Tạo nội dung trong hệ thống SaaS.
## Cài đặt TinyMCE
- Bước 1: Cài đặt thông qua package manager
```javascript
npm install tinymce
OR
yarn add tinymce
```
- Bước 2: Sử dụng webpack mix
```js
mix.js([
    'resources/js/app.js',
    'node_modules/tinymce/tinymce.min.js',
], 'public/js/app.js')
    .sass('resources/sass/app.scss', 'public/css');

mix.copyDirectory('node_modules/tinymce/plugins', 'public/js/tinymce/plugins');
mix.copyDirectory('node_modules/tinymce/themes', 'public/js/tinymce/themes');
mix.copyDirectory('node_modules/tinymce/icons', 'public/js/tinymce/icons');
mix.copyDirectory('node_modules/tinymce/skins', 'public/js/tinymce/skins');
```

>    Ở đây ta mix file node_modules/tinymce/tinymce.min.js vào chung trong file public/js/app.js
>    và copy các plugins, themes, icons, skins ra ngoài thư mục public để tiny có thể gọi đến.

- Bước 3: Tạo view và route
```html:views/tinymce.blade.php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Timymce</title>
</head>
<body>
    <form action="#" method="post" enctype="multipart/form-data">
        @csrf
        <textarea id="timymce" name="tinymce"></textarea>
        <button type="submit">Submit</button>
    </form>
    <script src="{{ mix('js/app.js') }}"></script>
    <script>
        tinymce.baseURL = "js/tinymce";
        tinymce.init({
            selector: "textarea#timymce",
            toolbar: "insertfile undo redo | styleselect | bold italic |
            alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
        });
    </script>
</body>
</html>
```
```php:routes/web.php
Route::get('/tinymce', function () {;
    return view('tinymce');
});
```
- Giao diện của tinymce sau khi tích hợp vào textarea.
![](https://images.viblo.asia/0f5ac732-5b6d-4dca-8ecf-5de70d187319.png)
# 3. Laravel filemanager
![](https://images.viblo.asia/e125dbe1-48b5-4191-84fe-dff19f8c73f0.png)
## Giới thiệu
- Xử lý file là một trong những quy trình tiêu chuẩn trong hầu hết các dự án web, nhưng không dễ dàng để xây dựng từ đầu: file extensions, uploads, thumbnails, protection.
- Các tính năng:
    - Tích hợp CKEditor và TinyMCE
    - Kiểm tra dữ liệu updaload.
    - Cắt và thay đổi kích thước hình ảnh
    - Thư mục công khai và riêng tư cho nhiều user
    - Có thể tùy chỉnh routes, middlewares, views, và đường dẫn folder.
    - Hỗ trợ hai loại : files and images. Mỗi loại hoạt động trong thư mục khác nhau.
    - Các ngôn ngữ được hỗ trợ : ar, bg, de, el, en, es, fa, fr, it, he, hu, nl, pl, pt-BR, pt_PT, ro, ru, sv, tr, zh-CN, zh-TW.
## Cài đặt
- Yêu cầu:
    - php >= 5.4
    - exif extension
    - fileinfo extension
    - GD Library >=2.0 or Imagick PHP extension >=6.5.7
    - Laravel 5
- Tiến hành cài đặt
- Bước 1: Cài đặt package `unisharp/laravel-filemanager` bằng composer
```bash
composer require unisharp/laravel-filemanager
```
- Bước 2: Đưa các config và assets của package ra ngoài
```bash
php artisan vendor:publish --tag=lfm_config
php artisan vendor:publish --tag=lfm_public
```
Bước 3: Clear cache
```bash
php artisan route:clear
php artisan config:clear
```
Bước 4: Sysmlink tài nguyên từ storage ra ngoài public để laravel filemanager có thể truy cập đến
```bash
php artisan storage:link
```
Bước 5: Tạo các route cần thiết cho laravel filemanager
```php:routes/web.php
Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
     \UniSharp\LaravelFilemanager\Lfm::routes();
});
```
- Thử vào trang demo nào `{BASE_URL}/laravel-filemanager/demo`

![](https://images.viblo.asia/42dafdc0-6a02-464f-b859-816b7832a3fb.png)
## File config lfm
```php:config/lfm.php
<?php
return [
    'use_package_routes'       => true,
    'allow_private_folder'     => true,
    'private_folder_name'      => UniSharp\LaravelFilemanager\Handlers\ConfigHandler::class,
    'allow_shared_folder'      => false,
    'shared_folder_name'       => 'shares',
    'folder_categories'        => [
        'file'  => [
            'folder_name'  => 'files',
            'startup_view' => 'grid',
            'max_size'     => 50000, // size in KB
            'valid_mime'   => [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif',
                'image/svg+xml',
            ],
        ],
        'image' => [
            'folder_name'  => 'photos',
            'startup_view' => 'list',
            'max_size'     => 50000, // size in KB
            'valid_mime'   => [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif',
                'image/svg+xml',
                'application/pdf',
                'text/plain',
            ],
        ],
    ],
    'paginator' => [
        'perPage' => 30,
    ],
    'disk'                     => 'public',
    'rename_file'              => false,
    'alphanumeric_filename'    => false,
    'alphanumeric_directory'   => false,
    'should_validate_size'     => false,
    'should_validate_mime'     => false,
    'over_write_on_duplicate'  => false,
    'should_create_thumbnails' => false,
    'thumb_folder_name'        => 'thumbs',
    'raster_mimetypes'         => [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
    ],
    'thumb_img_width'          => 200, // px
    'thumb_img_height'         => 200, // px
    'file_type_array'          => [
        'pdf'  => 'Adobe Acrobat',
        'doc'  => 'Microsoft Word',
        'docx' => 'Microsoft Word',
        'xls'  => 'Microsoft Excel',
        'xlsx' => 'Microsoft Excel',
        'zip'  => 'Archive',
        'gif'  => 'GIF Image',
        'jpg'  => 'JPEG Image',
        'jpeg' => 'JPEG Image',
        'png'  => 'PNG Image',
        'ppt'  => 'Microsoft PowerPoint',
        'pptx' => 'Microsoft PowerPoint',
    ],
    'php_ini_overrides'        => [
        'memory_limit' => '256M',
    ],
];
```
- Một số cấu hình cần lưu ý:
    - `paginator`: Hiển thị số lượng mỗi trang.
    - `disk`: Nơi lưu trữ ảnh (với giá trị `public`: Sẽ lưu dưới local, `s3`: Sẽ lưu trữ trên cloud dựa vào config trong filemanager.php)
    - `should_validate_size`: validate file upload.
    - `should_validate_mime`: validate minetype.
    - `raster_mimetypes`: Định nghĩa minetype được upload.
- Các config còn lại các bạn có thể tự tìm hiểu...
# 4. Tích hợp laravel filemanager vào tinymce
- Tinymce cũng có công cụ quản lý file mạnh mẽ là https://www.tiny.cloud/drive nhưng muốn sử dụng chức năng này thì phải tra phí và nó sẽ lưu trên server của nó mình không quản lý được. Vậy nên laravel filemanager là một lựa chọn không tệ để quản lý file.
- Bước 1: Sử dụng plugins image, imagetool và toolbar image
    - Cấu hình tinymce sẽ như sau:
```js
tinymce.init({
    selector: "textarea#timymce",
    plugins: [
        "image imagetool",
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic |
        lignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
        image",
});
```
- Bước 2: Sử dụng function `file_picker_callback(callback, value, meta)` để custom lại dialog chọn image file click vào biểu tượng upload
    - `callback`: Một callback được gọi, khi bạn có tệp nó mong đợi giá trị mới cho trường làm đối số đầu tiên và tùy chọn thông tin meta cho các trường khác trong dialog làm đối số thứ hai.
    - `value`: Giá trị hiện tại của trường bị tác động.
    - `meta`: Đối tượng chứa giá trị của các trường khác trong dialog được chỉ định.
    - Tiny chỉ cung cấp cho cung ta cái hook, còn việc triển khai như thế nào thì mình lại tự code.
```js
tinymce.init({
    selector: "textarea#timymce",
    plugins: [
        "image imagetool",
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic |
        alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
        image",
    file_picker_callback: function (callback, value, meta) {
        let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        let y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

        let type = 'image' === meta.filetype ? 'Images' : 'Files',
            url  = '/laravel-filemanager?editor=tinymce5&type=' + type;

        tinymce.activeEditor.windowManager.openUrl({
            url : url,
            title : 'Filemanager',
            width : x * 0.8,
            height : y * 0.8,
            onMessage: (api, message) => {
                callback(message.content);
            }
        });
    }
});
```
- Đầu tiên `file_picker_callback` sẽ lấy with, hieght của màn hình hiện tại, để tính toán kích thước của dialog khi upload.
- Tiếp theo sẽ kiểm tra file type và sinh ra một url.
- Open một dialog cho phép chọn ảnh.
    - `url`: Giá trị vừa được sinh ra ở trên.
    - `title`: Tiêu đề của dialog.
    - `width`: Chiều rộng của dialog.
    - `height`: Chiều cao của dialog.
    - `onMessage`: Khi chọn ảnh trong filemanager xong thì sẽ trả về link ảnh cho dialog của tinymce.
- Bây giờ thử demo một chút.
![](https://images.viblo.asia/d8c6060b-c364-44bd-a39e-361f328ffbad.gif)
# 5. Tài liệu tham khảo
- [Tinymce](https://www.tiny.cloud/docs/)
- [Laravel filemanager](https://unisharp.github.io/laravel-filemanager/)