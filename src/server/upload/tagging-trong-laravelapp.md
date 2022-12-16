Trong những năm gần đây, các hệ thống gắn thẻ đã trở thành một cách phổ biến để phân loại các mặt hàng và bạn có thể tìm thấy chúng trong hầu hết mọi ứng dụng. Từ các bài đăng trên blog đến danh sách việc cần làm, tất cả đều có triển khai gắn thẻ.
Hãy cùng xem xét việc tích hợp hệ thống gắn thẻ dễ dàng như thế nào trong ứng dụng Laravel. Trong ứng dụng [Laravel Links](https://laravel-news.com/links) tôi đã tạo một vài tuần trước, tôi quyết định thêm gắn thẻ vào các liên kết và hướng dẫn sau để thiết lập nó.
## Cài đặt gói
Cộng đồng đã tạo ra một số gói gắn thẻ và bạn sẽ cần nghiên cứu xem gói nào phù hợp với trường hợp sử dụng của bạn. Đây là ba trong số những cái phổ biến nhất mà tôi tìm thấy:
* [Cartalyst Tags](https://cartalyst.com/manual/tags/2.0)
* [Eloquent Taggable](https://github.com/cviebrock/eloquent-taggable)
* [Laravel Tagging](https://github.com/rtconner/laravel-tagging)

Tôi chọn gói Gắn thẻ Laravel bởi [rtconner](https://github.com/rtconner) và việc cài đặt rất đơn giản.
Đầu tiên ta cài đặt gói:
```
composer require rtconner/laravel-tagging "~2.0"
```
 Thêm dòng sau vào file config/app.php:
` Conner\Tagging\Providers\TaggingServiceProvider::class,`
Bây giờ thì publish folder vendor ra nào:
`php artisan vendor:publish --provider="Conner\Tagging\Providers\TaggingServiceProvider"`
Sau đó chạy migrate:
`php artisan migrate`
Bây giờ chúng ta thêm trait vào model. Giả sử model của chúng ta là `Links.php`

```
use Conner\Tagging\Taggable;

class Links extends Model
{
    use Taggable;

    protected $table = 'links';
}
```

Đó là tất cả những gì cần thiết để có được thiết lập và sẵn sàng để sử dụng; Tuy nhiên, nó để lại một bước quan trọng. Việc gắn thẻ thường cần JavaScript và kiểu dáng để giúp người dùng dễ dàng chọn thẻ hiện có hoặc thêm thẻ mới.
## Cài đặt jQuery và Selectize

Package Selectize được viết bởi Brian Reavis là một jQuery based plugin để biến trường đầu vào thành một hệ thống gắn thẻ. Plugin này có thể dễ dàng được cài đặt thông qua NPM và sau đó thiết lập bằng [Browserify](http://browserify.org/) với Elixir.

Trong thiết bị đầu cuối của bạn cài đặt jQuery và Chọn và tự động lưu chúng vào gói.json của bạn với các mục sau:
```
npm install jquery --save
npm install selectize --save
```
Nếu bạn mở pack.json bây giờ, bạn sẽ thấy các phụ thuộc sau:
```
"dependencies": {
  "laravel-elixir": "^3.0.0",
  "bootstrap-sass": "^3.0.0",
  "jquery": "^2.1.4",
  "selectize": "^0.12.1"
}
```
Bootstrap và Elixir được bao gồm sẵn trong bản cài đặt Laravel mặc định. Mà bây giờ sẽ sử dụng để kết thúc cài đặt.
Tạo file `resources/assets/js/app.js`  và thêm vào như sau:
```
window.$ = window.jQuery = require('jquery')
require('selectize');
var bootstrap = require('bootstrap-sass');

$( document ).ready(function() {
    $('#tags').selectize({
        delimiter: ',',
        persist: false,
        valueField: 'tag',
        labelField: 'tag',
        searchField: 'tag',
        options: tags,
        create: function(input) {
            return {
                tag: input
            }
        }
    });
});
```

Điều này sẽ làm là sử dụng browserify để lấy jQuery, Chọn và Bootstrap JavaScript vào tệp của chúng tôi. Chúng tôi gán jQuery cho cửa sổ để các plugin có thể đọc nó từ phạm vi toàn cầu. Sau đó, chúng tôi sẽ chỉ định Plugin Chọn kích thước cho bất kỳ đầu vào nào với id của các thẻ Wikipedia.
Trước khi chúng tôi có thể biên dịch, chúng tôi cần điều chỉnh tệp gulp của mình.
```
elixir(function(mix) {
    mix.sass('app.scss')
        .browserify('app.js');
});
```

Thay đổi độc đáo ở đây là lời kêu gọi trình duyệt. Cuộc gọi đó cho phép các dòng của chúng tôi yêu cầu các dòng của mình kéo theo các phụ thuộc thích hợp.
## Bootstrap Styles
Vì Bootstrap đã được bao gồm, chúng tôi có thể sử dụng nó để xử lý các kiểu của chúng tôi. Mở app.scss và bỏ ghi chú dòng này:
`@import "node_modules/bootstrap-sass/assets/stylesheets/bootstrap";`
Điều này sẽ kéo bootstrap trực tiếp từ thư mục node_modules.

Tất cả những gì còn lại là kéo theo các kiểu cho Chọn. Plugin có hỗ trợ bootstrap và nó chỉ là vấn đề nhập tệp css đó:
`@import "node_modules/selectize/dist/css/selectize.bootstrap3";`

Bây giờ nếu bạn chạy gulp, mọi thứ sẽ được biên dịch và chế độ xem của bạn sẽ hiển thị đúng.

## Hiển thị và lưu trữ Tag
Trong mẫu của chúng tôi, chúng tôi cần tạo hai mục mới. Trường nhập để thêm thẻ và mảng JavaScript của thẻ hiện có để Chọn có thể tự động hoàn tất.

Trong bộ điều khiển của chúng tôi, kéo ra tất cả các thẻ hiện có và gán chúng cho chế độ xem:

```
$tags = Links::existingTags()->pluck('name');
return view('create', compact('tags'));
```
Sau đó, trong mẫu tạo của chúng tôi thêm các thẻ đầu vào:
`<input type="text" name="tags" id="tags">`

Tiếp theo một loạt các thẻ JavaScript mới:

```
<script>
var tags = [
    @foreach ($tags as $tag)
    {tag: "{{$tag}}" },
    @endforeach
];
</script>
```

Bây giờ khi biểu mẫu được gửi, tạo mô hình và đính kèm các thẻ:

```
// Create the link first
$link = Links::create([...]);

// Now add tags
$link->tag(explode(',', $request->tags));
```

Với tất cả các thiết lập này, bây giờ bạn có thể lưu các thẻ và tự động hoàn thành các thẻ hiện có.

## Thêm options cho tagging
Gói gắn thẻ Laravel bao gồm nhiều tính năng hơn so với những gì đã được hiển thị cho đến nay. Dưới đây là danh sách tất cả các tính năng có sẵn:
### Eager Loading
`$link = Link::with('tagged')->first(); // eager load`
### Removing Tags
```
$link->untag('laravel'); // remove Laravel tag
$article->untag(); // remove all tags
```
### Syncing Tags
`$link->retag(['tutorial', 'package']); // delete current tags and save new tags`
### Fetching by Tag
```
Link::withAnyTag(['laravel','tutorial'])->get(); // fetch with any tag listed

Link::withAllTags(['package', 'php'])->get(); // only fetch with all the tags
```

Nếu bạn có bất kỳ câu hỏi nào về cách tôi đã làm hoặc có phản hồi, xin vui lòng bình luận bên dưới.