# Introduction
Contracts của Laravel là một bộ các interfaces định nghĩa các core services cung cấp bởi framework. Ví dụ, một contract ```Illuminate\Contracts\Queue\Queue``` định nghĩa các phương thức cần thiết cho các queueing jobs, trong khi ```Illuminate\Contracts\Mail\Mailer``` định nghĩa các phương thức cần thiết để gửi email.

<br>

Mỗi contract đều có sẵn một corresponding implementation tương ứng được cung cấp bởi framework. Ví dụ, Laravel cung cấp một queue implementation với các drivers khác nhau, và một mailer implementation được hỗ trợ bởi [SwiftMailer](https://swiftmailer.symfony.com/).

<br>

Tất cả các Contracts của Laravel đều nằm trong [their own GitHub repository](https://github.com/illuminate/contracts). Nó cung cấp một tài liệu tham khảo nhanh cho tất cả những các contracts có sẵn, cũng như một package tách lẻ có thể được sử dụng bởi các package developer.

<br>

### Contracts Vs. Facades
Laravel [facades](https://viblo.asia/p/laravel-tim-hieu-ve-facades-gGJ59jnxKX2) và các hàm helper cung cấp một cách thuận tiện để sử dụng services của Laravel mà không cần type-hint và resolve contracts khỏi service container. Trong hầu hết các trường hợp, mỗi một facede đều có một contract tương ứng.

<br>

Không giống với facades, contacts không yêu cầu bạn phải thêm chúng trong class constructor, contracts cho phép bạn khai báo các dependencies tường mình cho class của bạn. Một số  developer muốn xác định rõ ràng các dependencies của họ theo cách này và do đó họ thích dùng contracts hơn, trong khi các developer khác lại thích sự tiện lợi của facades.

<br>

# When To Use Contracts
Như đã thảo luận, có nhiều quyết định nên sử dụng contracts hoặc facades sẽ trở thành sở thích của cá nhân hoặc team development. Cả contracts và facades có thể sử dụng để tạo ra các ứng dụng Laravel mạnh mẽ, được thử nghiệm tốt. Miễn là bạn đang tập trung vào class responsibilities, bạn sẽ nhận thấy rất ít sự khác biệt giữa sử dụng contracts và facades.

<br>

Tuy nhiên, bạn có thể vẫn có mội số câu hỏi liên quan đến contracts. Ví dụ, tại sao sử dụng interfaces? Không phải là việc sử dụng interfaces làm cho mọi thứ trở nên phức tạp hơn? Vậy hãy tìm hiểu lý do sử dụng interface theo hai tiêu đề sau: loose coupling và simplicity.

<br>

### Loose Coupling
Đầu tiên, cùng nhau review một số code được kết hợp chặt chẽ với một cache implementation. Xem đoạn code dưới đây:
```
<?php

namespace App\Orders;

class Repository
{
    /**
     * The cache instance.
     */
    protected $cache;

    /**
     * Create a new repository instance.
     *
     * @param  \SomePackage\Cache\Memcached  $cache
     * @return void
     */
    public function __construct(\SomePackage\Cache\Memcached $cache)
    {
        $this->cache = $cache;
    }

    /**
     * Retrieve an Order by ID.
     *
     * @param  int  $id
     * @return Order
     */
    public function find($id)
    {
        if ($this->cache->has($id))    {
            //
        }
    }
}
```
Trong class này, code được kết hợp chặt chẽ với một cache implementation. Nó được liên kết chặt chẽ bởi chúng ta đang phụ thuộc vào lớp Cache từ một package. Nếu API của package này thay đổi, mã nguồn của chúng ta cũng bắt buộc phải thay đổi theo.

<br>

Tương tự như vậy, nếu chúng ta muốn thay đổi công nghệ cache cơ bản (Memcached) bằng một công nghệ khác (Redis), chúng ta lại phải thay đổi repository của chúng ta. Repository của chúng ta không nên biết quá rõ về việc ai cung cấp dữ liệu và cung cấp như thế nào.

<br>

**Instead of this approach, we can improve our code by depending on a simple, vendor agnostic interface:**

```
<?php

namespace App\Orders;

use Illuminate\Contracts\Cache\Repository as Cache;

class Repository
{
    /**
     * The cache instance.
     */
    protected $cache;

    /**
     * Create a new repository instance.
     *
     * @param  Cache  $cache
     * @return void
     */
    public function __construct(Cache $cache)
    {
        $this->cache = $cache;
    }
}
```
Bây giờ, code không được kết hợp vớt bất kỳ vendor cụ thể nào, thậm chí cả Laravel. Kể từ khi contracts package không có chứa bất kì implementation và dependencies nào, bạn có thể dễ dàng viết một implementation của bất kì contract nào, điều này cho phép bạn thay đổi implementation cache của bạn mà không phải thay đổi mã nguồn của đoạn sử dụng cache nữa.

### Simplicity

Khi mà tất cả services của Laravel đều được định nghĩa trong các interface đơn giản, nó rất dễ dàng để xác định các chức năng được cung cấp bởi một service nhất định. **Contract được sử dụng như một bản tài liệu ngắn gọn cho các tính năng của framework.**

<br>

Thêm vào đó, khi bạn phụ thuộc vào các interface đơn giản, code sẽ trở nên dễ  hiểu và dễ bảo trì hơn. Thay vì theo dõi các phương thức nào có sẵn trong một class lớn và phức tạp, bạn có thể tham khảo một interface đơn giản và clean.

# How To Use Contracts
Vậy thì làm thế nào để  bạn có được một implementation của contract? Nó thực sự rất đơn giản.

Nhiều kiểu class trong Laravel được resolve qua các [service container](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2), bao gồm controllers, event listeners, middleware, queued jobs, và even route Closures. Vì thế, để  có được một implementation của contract, bạn chỉ cần "type-hint" interface trong hàm khởi tạo của class đang được resolve.

Xem ví dụ dưới đây về event listener:
```
<?php

namespace App\Listeners;

use App\User;
use App\Events\OrderWasPlaced;
use Illuminate\Contracts\Redis\Database;

class CacheOrderInformation
{
    /**
     * The Redis database implementation.
     */
    protected $redis;

    /**
     * Create a new event handler instance.
     *
     * @param  Database  $redis
     * @return void
     */
    public function __construct(Database $redis)
    {
        $this->redis = $redis;
    }

    /**
     * Handle the event.
     *
     * @param  OrderWasPlaced  $event
     * @return void
     */
    public function handle(OrderWasPlaced $event)
    {
        //
    }
}
```
Khi mà event listener được resolve, thì service container sẽ đọc phần type-hint trên hàm khởi tạo của class, và inject giá trị phù hợp vào. Để tìm hiểu thêm về đăng kí vào trong service container, kiểm tra [tài liệu](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2).

# Contract Reference
Các bạn có thể tham khảo tài liệu dưới đây:
https://laravel.com/docs/5.7/contracts#contract-reference


Tài liệu: https://laravel.com/docs/5.7/contracts