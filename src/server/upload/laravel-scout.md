# Giới thiệu
Scout là thư viện cung cấp 1 giải pháp đơn giản và dựa vào driver để đưa tìm kiếm full-text vào Eloquent Models. Sử dụng các model observer, Scout sẽ tự động cập nhật và đồng bộ hóa các index tìm kiếm của bạn với các bản ghi Eloquent.

Hiện tại, Scout mặc định kết nối với driver Algolia; tuy nhiên các bạn có thể dễ dàng cài đặt mở rộng cho Scout hoặc viết driver search riêng. Ví dụ như với 1 search engine nổi tiếng là ElasticSearch có ví dụ [đây](https://viblo.asia/p/elasticsearch-with-php-gDVK2jLvKLj), hoặc 1 search engine khác là TNTSearch thì mình cũng từng thử [demo](https://viblo.asia/p/demo-laravel-voi-scout-tntsearch-voi-viec-tim-kiem-phim-nhat-naQZRbMjZvx) đây. 
# Cài đặt
Đầu tiên, cài đặt Scout bằng Composer:
```
composer require laravel/scout
```
Sau khi cài đặt Scout, bạn nên công khai cấu hình Scout bằng cách sử dụng lệnh `vendor: publish` của Artisan. Lệnh này sẽ cho phép đưa file `scout.php` vào thư mục config.
```
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```
Cuối cùng, đưa trait `Laravel\Scout\Searchable` vào model bạn mong muốn có thể tìm kiếm được. Trait này sẽ tạo 1 model observer để liên tục đồng bộ hóa model với driver tìm kiếm.
```
<?php

namespace App;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Searchable;
}
```
## Queueing
Mặc dù Scout là không bắt buộc, nhưng khi dùng Scout thì bạn nên coi trọng việc cấu hình lại queue driver trước khi dùng thư viện này. Chạy một queue worker sẽ cho phép Scout xếp hàng tất cả các hoạt động đồng bộ hóa thông tin mô hình của bạn với các chỉ mục tìm kiếm của bạn, cung cấp thời gian phản hồi tốt hơn cho giao diện web của ứng dụng của bạn.

Sau khi cấu hình lại queue driver, đặt giá trị của `queue` trong `config/scout.php` thành `true`
```
'queue' => true,
```
## Driver
### Algolia
Với driver Algolia, bạn phải chỉnh `id` và `secret` lấy từ Algolia của bạn(và nhân tiện, Algolia cho phép dùng thử free 14 ngày). Sau khi tùy chỉnh, cài đặt Algolia PHP SDK bằng Composer:
```
composer require algolia/algoliasearch-client-php
```
# Tùy chỉnh
## Tùy chỉnh chỉ mục Model
Mỗi Eloquent model được đồng bộ hóa với "chỉ mục" tìm kiếm đã cho, chứa tất cả các bản ghi có thể tìm kiếm cho model đó. Nói cách khác, bạn có thể nghĩ về từng chỉ mục giống như một bảng MySQL. Theo mặc định, mỗi model sẽ được duy trì cho một chỉ mục phù hợp với tên "bảng" điển hình của model. Thông thường, đây là dạng số nhiều của tên model; tuy nhiên, bạn có thể tùy chỉnh chỉ mục của mô hình bằng cách ghi đè phương thức `searchableAs` trên model:
```
<?php

namespace App;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Searchable;

    /**
     * Get the index name for the model.
     *
     * @return string
     */
    public function searchableAs()
    {
        return 'posts_index';
    }
}
```
## Tùy chỉnh dữ liệu cho phép search
Theo mặc định, toàn bộ biểu mẫu `toArray` của một mô hình cụ thể sẽ được duy trì cho chỉ mục tìm kiếm của nó. Nếu bạn muốn tùy chỉnh dữ liệu được đồng bộ hóa với chỉ mục tìm kiếm, bạn có thể ghi đè lên phương thức `toSearchableArray` trên mô hình:
```
<?php

namespace App;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Searchable;

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Customize array...

        return $array;
    }
}
```
## Tùy chỉnh ID của Model
Theo mặc định, Scout sẽ sử dụng khóa chính của model làm ID duy nhất được lưu trữ trong chỉ mục tìm kiếm. Nếu bạn cần tùy chỉnh hành vi này, bạn có thể ghi đè phương thức `getScoutKey` trên mô hình:
```
<?php

namespace App;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use Searchable;

    /**
     * Get the value used to index the model.
     *
     * @return mixed
     */
    public function getScoutKey()
    {
        return $this->email;
    }
}
```
# Đánh chỉ mục
## Nhập hàng loạt
Nếu bạn đang cài đặt Scout vào một dự án hiện có, bạn có thể đã có các bản ghi cơ sở dữ liệu mà bạn cần phải nhập vào trình điều khiển tìm kiếm của bạn. Scout cung cấp lệnh Artisan `import` mà bạn có thể sử dụng để nhập tất cả các bản ghi hiện có của bạn vào chỉ mục tìm kiếm của bạn:
```
php artisan scout:import "App\Post"
```
Lệnh `flush` có thể được sử dụng để xóa tất cả các bản ghi của một mô hình khỏi các chỉ mục tìm kiếm của bạn:
```
php artisan scout:flush "App\Post"
```
## Thêm bản ghi
Một khi bạn đã thêm trait `Laravel\Scout\Searchable` vào một model, tất cả những gì bạn cần làm là `save` một model instance và nó sẽ tự động được thêm vào chỉ mục tìm kiếm của bạn. Nếu bạn đã cấu hình Scout để sử dụng hàng đợi, thao tác này sẽ được thực hiện dưới nền bởi queue worker của bạn:
```
$order = new App\Order;

// ...

$order->save();
```
### Thêm thông qua query
Nếu bạn muốn thêm một tập hợp các mô hình vào chỉ mục tìm kiếm của mình thông qua truy vấn Eloquent, bạn có thể chuỗi phương thức `searchable` vào truy vấn Eloquent. Phương thức `searchable` sẽ chia các kết quả của truy vấn và thêm các bản ghi vào chỉ mục tìm kiếm của bạn. Một lần nữa, nếu bạn đã cấu hình Scout để sử dụng hàng đợi, tất cả các khối sẽ được thêm vào background bởi queue worker của bạn:
```
// Adding via Eloquent query...
App\Order::where('price', '>', 100)->searchable();

// You may also add records via relationships...
$user->orders()->searchable();

// You may also add records via collections...
$orders->searchable();
```
Phương thức `searchable` có thể được coi là một hoạt động "upsert". Nói cách khác, nếu bản ghi mô hình đã có trong chỉ mục của bạn, nó sẽ được cập nhật. Nếu nó không tồn tại trong chỉ mục tìm kiếm, nó sẽ được thêm vào chỉ mục.
## Cập nhật bản ghi
Để cập nhật một model có thể tìm kiếm được, bạn chỉ cần cập nhật các thuộc tính của model instance và `save` model vào cơ sở dữ liệu của bạn. Scout sẽ tự động duy trì các thay đổi đối với chỉ mục tìm kiếm của bạn:
```
$order = App\Order::find(1);

// Update the order...

$order->save();
```
Bạn cũng có thể sử dụng phương thức `searchable` trên truy vấn Eloquent để cập nhật một tập hợp các model. Nếu các model không tồn tại trong chỉ mục tìm kiếm của bạn, chúng sẽ được tạo:
```
// Updating via Eloquent query...
App\Order::where('price', '>', 100)->searchable();

// You may also update via relationships...
$user->orders()->searchable();

// You may also update via collections...
$orders->searchable();
```
## Loại bỏ bản ghi
Để xóa một bản ghi khỏi chỉ mục của bạn, `delete` mô hình khỏi cơ sở dữ liệu. Hình thức xóa này thậm chí còn tương thích với các mẫu bị xóa soft-deleted:
```
$order = App\Order::find(1);

$order->delete();
```
Nếu bạn không muốn truy xuất mô hình trước khi xóa bản ghi, bạn có thể sử dụng phương thức `unsearchable` trên một instance hoặc collection truy vấn Eloquent:
```
// Removing via Eloquent query...
App\Order::where('price', '>', 100)->unsearchable();

// You may also remove via relationships...
$user->orders()->unsearchable();

// You may also remove via collections...
$orders->unsearchable();
```
## Tạm dừng lập chỉ mục
Đôi khi bạn có thể cần thực hiện một loạt các hoạt động Eloquent trên một mô hình mà không đồng bộ hóa dữ liệu model với chỉ mục tìm kiếm của bạn. Bạn có thể làm điều này bằng cách sử dụng phương thức `withoutSyncingToSearch`. Phương thức này chấp nhận một callback đơn sẽ được thực hiện ngay lập tức. Mọi hoạt động trong model xảy ra trong callback sẽ không được đồng bộ hóa với chỉ mục của mô hình:
```
App\Order::withoutSyncingToSearch(function () {
    // Perform model actions...
});
```
## Model Instance có thể tìm kiếm có điều kiện
Đôi khi, bạn có thể chỉ cần tạo mô hình có thể tìm kiếm trong các điều kiện nhất định. Ví dụ, hãy tưởng tượng bạn có model `App\Post` có thể thuộc một trong hai trạng thái: "draft" và "published". Bạn chỉ có thể muốn cho phép các bài đăng "published" có thể tìm kiếm được. Để thực hiện điều này, bạn có thể định nghĩa phương thức `shouldBeSearchable` trên model của mình:
```
public function shouldBeSearchable()
{
    return $this->isPublished();
}
```
# Tìm kiếm
Đã đến chức năng quan trọng nhất.

Bạn có thể bắt đầu tìm kiếm một model bằng cách sử dụng phương thức `search`. Phương thức tìm kiếm chấp nhận một chuỗi đơn sẽ được sử dụng để tìm kiếm các model của bạn. Sau đó, bạn nên chuỗi phương thức `get` vào truy vấn tìm kiếm để truy xuất các model Eloquent khớp với truy vấn tìm kiếm đã cho:
```
$orders = App\Order::search('Star Trek')->get();
```
Vì các tìm kiếm Scout trả về một tập hợp các mô hình Eloquent, bạn thậm chí có thể trả lại kết quả trực tiếp từ một tuyến hoặc bộ điều khiển và chúng sẽ tự động được chuyển thành JSON:
```
use Illuminate\Http\Request;

Route::get('/search', function (Request $request) {
    return App\Order::search($request->search)->get();
});
```
Nếu bạn muốn nhận được các kết quả thô trước khi chúng được chuyển đổi thành các model Eloquent, bạn nên sử dụng phương thức `raw`:
```
$orders = App\Order::search('Star Trek')->raw();
```
Các truy vấn tìm kiếm thường sẽ được thực hiện trên chỉ mục được chỉ định bởi phương thức `searchableAs` của model. Tuy nhiên, bạn có thể sử dụng phương thức `within` để chỉ định một chỉ mục tùy chỉnh cần được tìm kiếm thay thế:
```
$orders = App\Order::search('Star Trek')
    ->within('tv_shows_popularity_desc')
    ->get();
```
## Các mệnh đề where
Scout cho phép bạn thêm các mệnh đề "where" đơn giản vào các truy vấn tìm kiếm của bạn. Hiện tại, các mệnh đề này chỉ hỗ trợ kiểm tra bình đẳng số cơ bản và chủ yếu hữu ích cho việc tìm kiếm các truy vấn tìm kiếm theo ID mượn. Vì chỉ mục tìm kiếm không phải là một cơ sở dữ liệu quan hệ, nên các mệnh đề "where" nâng cao hiện không được hỗ trợ:
```
$orders = App\Order::search('Star Trek')->where('user_id', 1)->get();
```
## Phân trang
Ngoài việc truy xuất tập hợp các model, bạn có thể phân trang kết quả tìm kiếm của mình bằng phương thức `paginate`. Phương thức này sẽ trả về một instance `Paginator` giống như khi bạn đã phân trang một truy vấn Eloquent truyền thống:
```
$orders = App\Order::search('Star Trek')->paginate();
```
Ta cũng có thể truyền tham số vào `paginate` để số kết qủa hiện ra trong 1 trang như ta mong muốn
```
$orders = App\Order::search('Star Trek')->paginate(10);
```
Và ta đưa vào Blade như thường 
```
<div class="container">
    @foreach ($orders as $order)
        {{ $order->price }}
    @endforeach
</div>

{{ $orders->links() }}
```
## Soft deleting
Nếu các model được lập chỉ mục của bạn bị xóa mềm và bạn cần phải tìm kiếm các model bị xóa mềm của bạn, hãy đặt tùy chọn `soft_delete` của tệp cấu hình `config / scout.php` thành `true`:
```
'soft_delete' => true,
```
Khi tùy chọn cấu hình này là `true`, Scout sẽ không xóa các mô hình bị xóa mềm khỏi chỉ mục tìm kiếm. Thay vào đó, nó sẽ thiết lập một thuộc tính `__soft_deleted` ẩn trên bản ghi được lập chỉ mục. Sau đó, bạn có thể sử dụng phương thức `withTrashed` hoặc` onlyTrashed` để truy xuất các bản ghi đã xóa mềm khi tìm kiếm:
```
// Include trashed records when retrieving results...
$orders = App\Order::withTrashed()->search('Star Trek')->get();

// Only include trashed records when retrieving results...
$orders = App\Order::onlyTrashed()->search('Star Trek')->get();
```
CHÚ Ý: Khi một model bị xóa mềm bị xóa vĩnh viễn bằng `forceDelete`, Scout sẽ tự động xóa nó khỏi chỉ mục tìm kiếm.
# Tùy chỉnh Engine
## Tự viết engine
Nếu một trong những công cụ tìm kiếm được xây dựng trong Scout không phù hợp với nhu cầu của bạn, bạn có thể viết engine của riêng bạn và đăng ký nó với Scout. Engine của bạn sẽ extend abstract class `Laravel\Scout\Engines\Engine`. Abstract class này chứa bảy phương thức mà công cụ tùy chỉnh của bạn phải triển khai:
```
use Laravel\Scout\Builder;

abstract public function update($models);
abstract public function delete($models);
abstract public function search(Builder $builder);
abstract public function paginate(Builder $builder, $perPage, $page);
abstract public function mapIds($results);
abstract public function map($results, $model);
abstract public function getTotalCount($results);
```
Bạn có thể thấy hữu ích khi xem lại việc triển khai các phương thức này trên class `Laravel\Scout\Engines\AlgoliaEngine`. Class này sẽ cung cấp cho bạn một điểm khởi đầu tốt cho việc học cách thực hiện từng phương pháp trong công cụ của riêng bạn.
## Đăng ký engine
Một khi bạn đã viết công cụ tùy chỉnh của bạn, bạn có thể đăng ký nó với Scout bằng cách sử dụng phương thức `extend` của trình quản lý công cụ Scout. Bạn nên gọi phương thức `extend` từ phương thức `boot` của `AppServiceProvider` hoặc bất kỳ nhà cung cấp dịch vụ nào khác mà ứng dụng của bạn sử dụng. Ví dụ, nếu bạn đã viết `MySqlSearchEngine`, bạn có thể đăng ký nó như sau:
```
use Laravel\Scout\EngineManager;

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    resolve(EngineManager::class)->extend('mysql', function () {
        return new MySqlSearchEngine;
    });
}
```
Khi công cụ của bạn đã được đăng ký, bạn có thể chỉ định nó là `driver` Scout mặc định trong tệp cấu hình `config / scout.php` của bạn:
```
'driver' => 'mysql',
```
# Tham khảo
https://laravel.com/docs/5.7/scout/