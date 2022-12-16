# Mở đầu
![](https://images.viblo.asia/fc970a68-116e-415b-9065-7ada6c680efd.png)
Laravel Scout là một trong những gói được sử dụng phổ biến nhất trong Laravel để thêm tìm kiếm toàn văn bản trong Model Eloquent . Đây là một giải pháp dựa trên trình điều khiển được thực hiện chính xác để làm việc với Eloquent. Nó giúp dễ dàng lập chỉ mục và tìm kiếm nội dung của Model Eloquent thông qua đồng bộ hóa liên tục. Nó tạo điều kiện để giữ cho các chỉ mục tìm kiếm của bạn được đồng bộ hóa thường xuyên bằng cách sử dụng các trình quan sát mô hình.

Theo mặc định, Laravel Scout được cấu hình sẵn cho Algolia - một dịch vụ tìm kiếm tự động hoàn thành nhanh chóng của Laravel. Nhưng với mục đích của bài viết này, chúng ta sẽ cấu hình nó với Laravel Elaticsearch, đây cũng là một trong những công cụ web tốt nhất có sẵn để quản lý các chỉ mục tìm kiếm trong các ứng dụng.

# Cấu hình
Hãy bắt đầu bằng cách cài đặt Scout trong project của chúng ta bằng cách chạy lệnh sau:

```
composer require laravel/scout
```

Khi bạn đã cài đặt nó, bạn có thể xuất bản tệp cấu hình của nó bằng cách chạy lệnh sau:

```
php artisan vendor:publish
--provider="Laravel\Scout\ScoutServiceProvider"
```

Bây giờ, chúng ta hãy cài đặt gói Elaticsearch cho gói PHP và ElSTERearch Eloquent cho Laravel bằng cách chạy các lệnh sau:

```
ScoutEngines\ElSTERearch\ElSTERearchProvider::class,
```

Tất cả các gói yêu cầu hiện đã được cài đặt thành công. Đã đến lúc cấu hình app/scout.php để sử dụng trình điều khiển Elaticsearch.

```
'driver' => env('SCOUT_DRIVER', 'elasticsearch'),
```

Thêm cấu hình cho Elaticsearch trong cùng một tệp như được đưa ra dưới đây:

```
'elasticsearch' => [
    'index' => env('ELASTICSEARCH_INDEX', 'blog'),
    'config' => [
        'hosts' => [
             env('ELASTICSEARCH_HOST', 'localhost'),
         ],
     ],
],
```

Sau khi hoàn thành, bước tiếp theo là tạo một mô hình có thể tìm kiếm được bởi Elaticsearch cho full-text.

# Tạo mô hình cho tìm kiếm full-text
Chạy lệnh sau để tạo Model:

```
php artisan make:model Blog
```

Bây giờ, thêm Laravel Scout Searchable của Laravel trong Model mới được tạo. Đây là cách thực hiện:

```
<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
class Blog extends Model
{
   use Searchable;
  
   public $fillable = ["title","content"];
}
```

Bước tiếp theo là sử dụng Laravel Tinker để thêm một số blog thử nghiệm trong bảng của chúng ta có chứa tiêu đề và nội dung.

![](https://images.viblo.asia/86705a00-3d71-46f8-9291-5d47043f1c97.png)

Bây giờ, nhập mô hình này trong Scout để làm cho nó có thể tìm kiếm được với Elaticsearch.

```
php artisan scout:import “App\Blog”
```

# Kiểm tra tìm kiếm full-text
Chúng ta đã thêm dữ liệu trong các blog. Chúng ta sẽ kiểm tra tìm kiếm full-text bằng Tinker. Chạy các lệnh sau để tìm kiếm khi Tinker bắt đầu hoạt động:

```
App\Blog::search('scout')->get();
App\Blog::search('full text')->get();
```

Kiểm tra kết quả của cả hai lệnh trong hình ảnh được đưa ra dưới đây:
![](https://images.viblo.asia/50b1b7e5-f329-436f-9dc5-397001c03dcc.png)

# Kết luận
Laravel Scout là một công cụ dựa trên trình điều khiển tuyệt vời giúp thêm tìm kiếm toàn văn bản và lập chỉ mục nhanh trong mô hình Eloquent. Hơn nữa, sự tích hợp của nó trong Laravel khá dễ dàng như trong bài viết ở trên.