Đối với lập trình Web, việc quản lý upload file và ảnh làm sao để linh hoạt trong việc thao tác và đảm bảo an toàn cho server là một việc tương đối khó với các bạn mới bắt đầu. Hôm nay, mình xin giới thiệu cho các bạn package [unisharp/laravel-filemanager](https://unisharp.github.io/laravel-filemanager/config), một package mạnh xong việc cài đặt cấu hình thì rất nhanh và đơn giản. 

## Các tính năng
* Hỗ trợ upload ảnh với CKEditor và TinyMCE
* Có nút upload ảnh riêng
* Validate dữ liệu được tải lên
* Cắt và chỉnh sửa kích thước của ảnh
* Public và private thư mục ảnh cho chế độ Multi-User
* Chỉnh sửa routes, middleware, views, đường dẫn ảnh
* Hỗ trợ tạo file và ảnh: 
* Hỗ trợ đa ngôn ngữ: ar, bg, de, el, en, es, fa, fr, it, he, hu, nl, pl, pt-BR, pt_PT, ro, ru, sv, tr, zh-CN, zh-TW

![](https://images.viblo.asia/9aba99d9-de75-4c35-ace5-342e9ea63095.png)

![](https://images.viblo.asia/fe7cd870-0735-4d5e-9f3b-5516868a4736.png)

## Cài đặt
1. Cài đặt gói thư viện [Unisharp/laravel-filemanager](https://unisharp.github.io/laravel-filemanager/) thông qua composer:
```php
composer require unisharp/laravel-filemanager:~1.8
```

2. Đối với phiên bản laravel 5.5 trở xuống. Trong **config/app.php** thêm nhưng dòng sau:
```php
'providers' => [
    ...
    UniSharp\LaravelFilemanager\LaravelFilemanagerServiceProvider::class,
    Intervention\Image\ImageServiceProvider::class,
],
```
Và thêm alias:
```php
'aliases' => [
    ...
    'Image' => Intervention\Image\Facades\Image::class,
],
```
Đối với các phiên bản Laravel 5.5 trở lên thì có thể bỏ qua bước này =))

3. Publish package’s config và assets:
```php
 php artisan vendor:publish --tag=lfm_config
 php artisan vendor:publish --tag=lfm_public
```

4. Xóa Cache:
```php
 php artisan route:clear
 php artisan config:clear
```

5. Chỉnh lại **APP_URL** trong file .env  đúng đường dẫn web của bạn, cấp quyền ghi cho thư mục file & ảnh được cấu hình trong file **config/lfm.php**

## Cấu hình package
File cấu hình của Laravel-filemanager được lưu trong **config/lfm.php**:

-Với Routes:
* use_package_routes: Sử dụng routes của package, mặc định là true, nếu false bạn phải định nghĩa lại tất cả các routes của package .
* middlewares: Các routes mặc định sẽ phải đi qua các middleware được định nghĩa ở đây.
* url_prefix: Định nghĩa tiền tố url.
* allow_multi_user: Cho phép tạo lưu file & ảnh riêng cho mỗi user  
* allow_share_folder: Tạo thư mục chia sẻ.

-Thư mục lưu trữ của package:
* base_directory: Tùy chỉnh thư mục lưu (public, resource, storage ...).

-Giao diện hiển thị:
* images_startup_view: Kiểm hiển thị giao diện ảnh: 'grid', 'list'.
* files_startup_view: Kiểm hiển thị giao diện file: 'grid', 'list'.

-Upload / Validation:
* rename_file: nếu true, file và ảnh tải nên sẽ được đổi tên.
* should_validate_size: file và ảnh tải nên sẽ được verify size.
* max_image_size: size tối đa cho ảnh.
* max_file_size: size tối đa cho file.
* should_validate_mime: file và ảnh tải nên sẽ được verify kiểu file
* valid_image_mimetypes: Khai báo các kiểu file được phép tải

## Sử dụng
1. Sử dụng qua CKEditor:
```js
<textarea id="my-editor" name="content" class="form-control">{!! old('content', 'test editor content') !!}</textarea>
<script src="//cdn.ckeditor.com/4.6.2/standard/ckeditor.js"></script>
<script>
  var options = {
    filebrowserImageBrowseUrl: '/laravel-filemanager?type=Images',
    filebrowserImageUploadUrl: '/laravel-filemanager/upload?type=Images&_token=',
    filebrowserBrowseUrl: '/laravel-filemanager?type=Files',
    filebrowserUploadUrl: '/laravel-filemanager/upload?type=Files&_token='
  };
</script>

//
<script>
CKEDITOR.replace('my-editor', options);
</script>

//Sử dụng với jquery:
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="/vendor/unisharp/laravel-ckeditor/adapters/jquery.js"></script>
<script>
$('textarea.my-editor').ckeditor(options);
</script>
```

![](https://images.viblo.asia/82865066-ffab-4ac4-b795-e9172c0eab7f.png)

![](https://images.viblo.asia/b740bd48-cd8d-4edd-9f07-7eec15111c9c.png)

2. Sử dụng với TinyMCE4
```js
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<textarea name="content" class="form-control my-editor">{!! old('content', 'sacsa') !!}</textarea>
<script>
var editor_config = {
    path_absolute : "/",
    selector: "textarea.my-editor",
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media",
    relative_urls: false,
    file_browser_callback : function(field_name, url, type, win) {
        var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

        var cmsURL = editor_config.path_absolute + 'laravel-filemanager?field_name=' + field_name;
        if (type == 'image') {
            cmsURL = cmsURL + "&type=Images";
        } else {
            cmsURL = cmsURL + "&type=Files";
        }

        tinyMCE.activeEditor.windowManager.open({
            file : cmsURL,
            title : 'Filemanager',
            width : x * 0.8,
            height : y * 0.8,
            resizable : "yes",
            close_previous : "no"
        });
    }
};

tinymce.init(editor_config);
</script>
```

![](https://images.viblo.asia/97dda310-c6fb-4220-a3a1-4e29d8c96f67.png)

![](https://images.viblo.asia/875ddedd-e8ae-4d9f-ac26-8370f5511a92.png)

3. Đôi khi bạn không muốn sử dụng chung với text editor như CKEditor hay TinyMCE4, bạn vẫn có thể sử dụng package với 1 nút button đơn giản:
```html
<div class="input-group">
    <input type="button" id="lfm" data-input="thumbnail" data-preview="holder" value="Upload">
    <input id="thumbnail" class="form-control" type="text" name="filepath">
</div>
<img id="holder" style="margin-top:15px;max-height:100px;">
```
Với Javascripts:
```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="/vendor/laravel-filemanager/js/lfm.js"></script>
<script>
    $('#lfm').filemanager('image');
</script>
```

![](https://images.viblo.asia/5dba2e82-a33c-404b-ad04-607ab0295acf.png)

4. Embed file manager

Còn có một cách nhanh hơn để sử dụng package đó là sử dụng thẻ iframe với src đã được dựng sẵn khi bạn publish:
```html
<iframe src="/laravel-filemanager" style="width: 100%; height: 500px; overflow: hidden; border: none;"></iframe>
```
## Tổng kết
Bài viết trên với mục đích giới thiệu package dùng để quản lý file và ảnh trong laravel, nếu bạn có biết thêm nhiều package tương tự thì hãy chia sẻ cho mình và các bạn khác cùng biết. Cảm ơn!

## Tham khảo
[https://unisharp.github.io/laravel-filemanager/](https://unisharp.github.io/laravel-filemanager/)