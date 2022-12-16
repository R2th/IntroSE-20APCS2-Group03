Từ Laravel 5.4, chúng ta đã được biết đến một tính năng mới đó là "real-time facades", làm cho [facades](https://laravel.com/docs/5.8/facades) càng trở nên tiện lợi hơn. Chúng được define "real-time" thay vì các class như trước đây. Taylor cũng đã từng đăng [tweeted](https://twitter.com/taylorotwell/status/814944242158149632) về điều này. Nhưng chúng là gì và hoạt động như thế nào? Chúng ta cùng tìm hiểu nhé

![](https://images.viblo.asia/bbd04618-f792-4497-81cd-1663d4c1045b.png)

## Giới thiệu về Facades trong Laravel
*Nếu bạn đã biết Facades hoạt động như thế nào, thì bạn có thể đọc luôn sang phần Real-time Facade nhé.*

Facade trong Laravel chính là những *shortcut classes*, chúng cung cấp những cách truy cập *static* tới những hàm *non-static* bên trong những class service được bao bọc trong Laravel container. Nghe có vẻ hơi khó hiểu nhỉ. Mình sẽ đi vào một đoạn code cụ thể để các bạn dễ hình dung hơn nhé.

Ví dụ, mình đang muốn lấy một giá trị từ session với key là 'important', chúng ta có thể làm như sau:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Session\SessionManager;

class ThingController extends Controller
{
    protected $session;

    public function __construct(SessionManager $session)
    {
        $this->session = $session;
    }

    public function doThing()
    {
        $importantValue = $this->session->get('important');
    }
}
```

hoặc nếu phải lấy ra ở phần view:

```html
Your user ID is: {{ app('Illuminate\Session\SessionManager')->get('important') }}
```

Với cách trên bạn sẽ phải inject một session instance vào bất cứ đâu mà bạn cần để sử dụng. Nó ko phải là vấn đề lớn lắm, nhưng đặc biệt ở phần view và đôi khi là ở controllers, điều đó không được thuận tiện cho lắm đúng không? *app()* helper có thể đơn giản hóa việc đó, như ở ví dụ ở phần view bên trên. Nhưng với Facades, thì chúng ta có thể làm điều đó một cách nhẹ nhàng và đơn giản hơn thế.

```php

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

public function ThingController extends Controller
{
    public function doThing()
    {
        $importantValue = Session::get('important');
    }
}
```

hoặc là ở view thì:

```html
Your user ID is: {{ Session::get('important') }}
```

Nếu bạn vào core của Laravel, bạn sẽ thấy Facade  hoạt động như sau

```php
class Session extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'session';
    }
}
```

Chúng ta có thể hiểu rằng, nó đang nói với container rằng: "Khi một static method trong Session facade được sử dụng, hãy gọi nó bên trong instance của app('session')". Facade sẽ lấy ra một instance được sinh ra từ container, sau đó gọi method trực tiếp từ đó.
Thật tuyệt vời phải không nào? Vậy thì real-time facade còn tuyệt vời tới mức nào? Chúng ta cũng tiếp tục tìm hiểu nhé


## Giới thiệu real-time facades

Real-time facade giúp chúng ta có thể tự tạo ra facade một cách nhanh chóng. Thay vì việc phải tạo ra một facade class như Session facade như mình đã đề cập bên trên, chúng ta có thể sử dụng như bình thường mà chỉ cần thêm **Facades** vào phần đầu của namespace.

Chúng ta cùng đi vào ví dụ cụ thể nhé. Ví dụ mình có class tên là Chát và bên trong có method burndown()
```php

<?php

namespace App;

class Charts
{
    protected $dep;

    public function __construct(SomeDependency $dep)
    {
        $this->dep = $dep;
    }

    public function burndown()
    {
        return 'stuff here' . $this->dep->stuff();
    }
}
```
Không có gì đặc biệt ở trong class trên đúng ko, và bình thường chúng ta sẽ sử dụng chúng ở view như sau:

```html
<h2>Burndown</h2>
{{ app(App\Charts::class)->burndown() }}
```

Và bây giờ thì hãy biến chúng thành facade chỉ bằng cách thay đổi namspace:

```html
<h2>Burndown</h2>
{{ Facades\App\Charts::burndown() }}
```

hoặc là ở class, sẽ biến đổi từ:
```php
<?php

namespace App\Stuff;

use App\Charts;

class ThingDoer
{
    private $charts;

    public function __construct(Charts $charts)
    {
        $this->charts = $charts;
    }

    public function doThing()
    {
        $this->charts->burndown();
    }
}
```

trở thành

```php
<?php

namespace App\Stuff;

use Facades\App\Charts;

class ThingDoer
{
    public function doThing()
    {
        Charts::burndown();
    }
}
```

Thật đơn giản và nhanh chóng đúng không nào? Bây giờ bạn đã có thể tự tạo ra những Facade cho riêng mình chỉ với 1 tích tắc rồi đó :D

## Summary:
Bên trên mình đã giới thiệu một cách nhanh chóng và đơn giản cách tạo ra một facade nhanh chóng, nếu như Taylor nói thì là "nhanh như bay" :D Nếu bạn biết thêm thông tin về việc nhanh như bay này bạn có thể đọc [bài này](https://medium.com/@taylorotwell/expressive-code-real-time-facades-41c442914291) của Taylor nhé :D

## References:
https://mattstauffer.com/blog/real-time-automatic-facades-in-laravel-5-4/#whats-new
https://medium.com/@taylorotwell/expressive-code-real-time-facades-41c442914291