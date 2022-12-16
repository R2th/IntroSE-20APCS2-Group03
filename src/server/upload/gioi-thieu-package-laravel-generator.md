# Giới thiệu
Chào các bạn, hôm nay mình sẽ giới thiệu đến các bạn một package rất bổ ích cho lập trình viên Laravel đó là Laravel Generator. Một công cụ rất hữu ích và giúp chúng ta có thể tiết kiệm được rất nhiều thời gian trong khi làm các chức năng đơn giản như CRUD, viết API, viết UnitTest. Chúng ta cùng tìm hiểu xem nó như thế nào nhé.
# Cài đặt
Có rất nhiều cách để cài đặt Laravel Generator nhưng mình xin phép giới thiệu một cách phổ biến nhất để thêm package này vào dự án hiện tại của bạn. 
Đầu tiên thêm các package sau vào file `composer.json`
```
"require": {
    "infyomlabs/laravel-generator": "5.6.x-dev",
    "laravelcollective/html": "^5.6.0",
    "infyomlabs/adminlte-templates": "5.6.x-dev",
    "doctrine/dbal": "~2.3"
}  
```
Chạy `composer update` để tải về các package trên. 

Thêm các service provider vào file `config\app.php`
```
Collective\Html\HtmlServiceProvider::class,
Laracasts\Flash\FlashServiceProvider::class,
Prettus\Repository\Providers\RepositoryServiceProvider::class,
\InfyOm\Generator\InfyOmGeneratorServiceProvider::class,
\InfyOm\AdminLTETemplates\AdminLTETemplatesServiceProvider::class,
```

Thêm alias vào mảng aliases trong file `config\app.php`
```
'Form'      => Collective\Html\FormFacade::class,
'Html'      => Collective\Html\HtmlFacade::class,
'Flash'     => Laracasts\Flash\Flash::class,
```
Chạy dòng lệnh `php artisan vendor:publish`

Setup .env các thứ xong bây giờ ta muốn tạo các chức năng cơ bản của dòng lệnh `php artisan make:auth` nhưng lại ghép được luôn với giao diện AdminLTE ta chỉ cần gõ dòng lệnh sau `php artisan infyom.publish:layout `. Thử chạy `php artisan serve` để xem thành quả.
![](https://images.viblo.asia/81824e50-2309-43b9-b4b8-262583cf1849.png)
Vâng thật đơn giản để tạo ra giao diện admin chuyên nghiệp phải không nào. :smiley:

# Các chức năng chính
## Code generator
Với Laravel Generator bạn chỉ cần gõ 1 dòng lệnh nó sẽ tự sinh ra các file tương ứng cho bạn (nâng cấp của `php artisan make:`)
![](https://images.viblo.asia/ae9cf0fd-0eef-4178-8ad5-39ff9b212abf.png)
Bản nâng cấp thì đương nhiên phải ngon hơn rồi. Cụ thể đó là nó có thể giúp bạn tạo model, view, controller, migration, tests, request,... Thậm chí có thể tạo luôn chức năng CRUD sử dụng VueJS Framework. Những công việc mà hàng ngày bạn phải làm thủ công thì nay đã có Laravel Generator giúp đỡ bạn hoàn thành chúng thật nhanh để bạn có thể dùng thời gian đó làm việc khác.

## API generator
Package này có thể giúp bạn tạo ra đầy đủ chức năng api với validations và routes.
Giờ đây việc tạo API cũng cực kì đơn giản. Bạn chỉ cần gõ lệnh `php artisan infyom:api Post` và làm theo yêu cầu của command là bạn có thể tạo các chức năng API chỉ trong vòng một nốt nhạc. Quá là tiết kiệm thời gian luôn.;) ![](https://images.viblo.asia/0b2d4eea-8ed1-4917-8313-08a8978e366a.png)

## Scaffold Generator
 Cụ thể là bạn có thể gõ một dòng lệnh để tạo full chức năng CRUD cho một model. Ví dụ như `php artisan infyom:scaffold Post` sau đấy  nó sẽ yêu cầu bạn nhập vào các field của model đó và nó sẽ tự động tạo ra đầy đủ model, view, controller, migration, request, validation, responsitory.... Vâng quá ngon phải không nào, bình thường bạn sẽ phải tự tạo từng file một và ghép chúng lại, bây giờ Laravel Generator sẽ giúp bạn làm mọi việc và bạn chỉ cần thưởng thức một cốc coffee là mọi thứ đã xong rồi. Sẵn sàng cho bạn code những chức năng cao cấp hơn. :smiley:
![](https://images.viblo.asia/4b1e1186-6f00-4ba1-81e0-92c4b3db268a.png)

# Templates
Laravel Generator hỗ trợ bạn tạo layout, giao diện rất nhanh và đơn giản. Cụ thể nó hỗ trợ 4 loại template sau:

## AdminLTE
Giao diện Admin quen thuộc giờ đây chúng ta có thể mang nó vào project một cách nhanh nhất có thể. 
Thêm package vào file `composer.json`
```
"require": {
    "infyomlabs/adminlte-templates": "5.6.x-dev"
} 
```
Chạy `composer update`
Thêm service provider
```
InfyOm\AdminLTETemplates\AdminLTETemplatesServiceProvider::class,
```
Update config template trong file `config/infyom/laravel_generator.php`
```
'templates' => 'adminlte-templates'
```
Cuối cùng chạy `php artisan infyom.publish:layout`

## Bootstrap
Trước khi muốn chuyển từ 1 template sang 1 template khác thì bạn cần phải xóa bỏ template cũ trước bằng cách remove package trong composer và bỏ service provider.
Sau đó thêm package vào composer.json
```
"require": {
    "infyomlabs/core-templates": "5.5.x-dev"
} 
```

Thêm provider
```
InfyOm\CoreTemplates\CoreTemplatesServiceProvider::class, 
```
Update config template trong file `config/infyom/laravel_generator.php`
```
'templates' => 'core-templates'
```
Cuối cùng chạy `php artisan infyom.publish:layout`

## Metronic
Tương tự 2 templates trên nhưng thay đổi package thành `infyomlabs/metronic-templates`
Service provider `InfyOm\MetronicTemplates\MetronicTemplatesServiceProvider::class,`

## FlatLab
Package: `infyomlabs/flatlab-templates`
Service Provider: `InfyOm\FlatLabTemplates\FlatLabTemplatesServiceProvider::class, `

# Generator GUI Interface Beta
Ngoài những thứ ngon lành trên thì giờ đây đội ngũ Infyom mới cho ra mắt package GUI Interface để thay thế những dòng lệnh khô khan trên thành một giao diện thân thiện và dễ sử dụng. 
Để thử chức năng này ta làm như sau:
Thêm package `composer.json`
```
"require": {
    "infyomlabs/generator-builder": "dev-master"
} 
```
Thêm service provider:
```
\InfyOm\GeneratorBuilder\GeneratorBuilderServiceProvider::class,
```
Chạy publish command `php artisan vendor:publish ` 
Publish route: `php artisan infyom.publish:generator-builder`.
Nó sẽ tự động thêm các route sau:
```php
Route::get('generator_builder', '\InfyOm\GeneratorBuilder\Controllers\GeneratorBuilderController@builder');
Route::get('field_template', '\InfyOm\GeneratorBuilder\Controllers\GeneratorBuilderController@fieldTemplate');
Route::post('generator_builder/generate', '\InfyOm\GeneratorBuilder\Controllers\GeneratorBuilderController@generate');
```
Bây giờ bạn thử gõ link `/generator_builder` để xem giao diện của nó:
![](https://images.viblo.asia/203f9588-112b-43af-a8f3-e54a1b974b2d.png)
Giờ đã dễ sử dụng hơn rồi đúng ko nào. ;)

# Kết luận
Với coder giảm thiểu công việc vặt để tăng năng suất là một điều cực kì cần thiết. Vậy giờ đây đã có Laravel Generator giúp bạn loại bỏ đi những công việc đơn giản nhưng lại cực kì thủ công và chiếm khá nhiều thời gian trong khi code của bạn. Thay vào đó bạn có thể để đầu óc thư giãn hoặc học hỏi các công nghệ mới hơn. Bài viết đã khá dài mình xin kết thúc tại đây, cảm ơn các bạn đã đọc bài viết. Chúc các bạn code vui code khỏe :* 

## Tham khảo
[Laravel Generator](http://labs.infyom.com/laravelgenerator/)