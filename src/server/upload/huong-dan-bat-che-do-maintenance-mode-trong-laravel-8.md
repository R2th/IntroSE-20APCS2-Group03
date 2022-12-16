Vấn đề cần chia sẽ với các bạn là khi bật chế độ bảo trì trong laravel 8 với câu lệnh `php artisan down` hoặc `Artisan::call("down")`. Khi đó, bạn vào bất kỳ đường dẫn nào của website cũng sẽ chỉ nhận được thông báo như dưới đây "503 | SERVICE UNAVAILABLE". 

Bây giờ chúng ta muốn truy cập vào 1 số đường dẫn khi vẫn bật chế độ bảo trì. Ví dụ như chỉ truy cập vào trang quản trị của website chẳng hạn.

Các bạn vào: App/Http/Middleware/PreventRequestsDuringMaintenance.php

```
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array
     */
    protected $except = [
    ];
}

```

Các bạn thay đổi lại thành:

```
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array
     */
    protected $except = [
        //
        'admin/*',
        'admin'
    ];
}

```

Đoạn code ở trên có nghĩa là cho phép truy những đường dẫn http://localhost/admin , http://localhost/admin/*  trong chế độ bảo trì. (ví dụ: * = san-pham || * = them-san-pham). Chúc các bạn thành công