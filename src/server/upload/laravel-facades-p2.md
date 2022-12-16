### Real-Time Facades
Sử dụng real-time facades, bạn có thể sử dụng bất cứ class nào trong application của miễn là nó có một facade. Để minh họa điều này chúng ta hãy đến với một ví dụ nhỏ sau . giả sử chúng ta có 1 model Podcast có 1 publish method . tuy nhiên để pushblish podcast thì chúng ta cần inject một Publiser instance : 
```
<?php

namespace App;

use App\Contracts\Publisher;
use Illuminate\Database\Eloquent\Model;

class Podcast extends Model
{
    /**
     * Publish the podcast.
     *
     * @param  Publisher  $publisher
     * @return void
     */
    public function publish(Publisher $publisher)
    {
        $this->update(['publishing' => now()]);

        $publisher->publish($this);
    }
}
```

Việc thực hiện inject một publisher trong vào trong method cho phép chúng ta dễ dàng kiểm tra phương pháp này một cách độc lập trước khi chúng ta có thể mock injected pulisher. Tuy nhiên thì nó yêu cầu chúng ta luôn luôn phải pass một pulisher instance mỗi khi chúng ta call đến publish method.
Việc sử dụng real-time facades, chúng ta có thể duy trì khả năng test tương tự trong khi không bắt buộc phải pass một Publisher instance. Dể có thể tạo một real-time facade, thì cần phải thêm vào prefix Facase vào trước phần  namespace của class: 
```
<?php

namespace App;

use Facades\App\Contracts\Publisher;
use Illuminate\Database\Eloquent\Model;

class Podcast extends Model
{
    /**
     * Publish the podcast.
     *
     * @return void
     */
    public function publish()
    {
        $this->update(['publishing' => now()]);

        Publisher::publish($this);
    }
}
```
Khi sử dụng real-time Facades, việc triển khai publisher sẽ được resolved ra khỏi vùng đang sử dụng service container bằng cách sử dụng phần interface hoặc tên class xuất hiện sau tiền tố Facades. Khi testing, chúng ta có thể sử dụng Laravel's built-in facade testing helper để mocck method call: 
```
<?php

namespace Tests\Feature;

use App\Podcast;
use Tests\TestCase;
use Facades\App\Contracts\Publisher;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PodcastTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A test example.
     *
     * @return void
     */
    public function test_podcast_can_be_published()
    {
        $podcast = factory(Podcast::class)->create();

        Publisher::shouldReceive('publish')->once()->with($podcast);

        $podcast->publish();
    }
}
```

### Thao khảo các class facade
Dưới đây bạn sẽ tìm thấy mọi facades và class basic của nó. Đây là một công cụ hữu ích để nhanh chóng đào sâu vào tài liệu API cho một facades root đã cho sẵn. Các service container binding key cũng được included nếu có.

| Facade | Class | Service Container Binding
| -------- | -------- | -------- |
| App | Illuminate\Foundation\Application | app
| Artisan | Illuminate\Contracts\Console\Kernel | artisan
| Auth | Illuminate\Auth\AuthManager | auth
| Auth (Instance) | Illuminate\Contracts\Auth\Guard | auth.driver
| Blade | Illuminate\View\Compilers\BladeCompiler | blade.compiler
| Broadcast | Illuminate\Contracts\Broadcasting\Factory |  
| Broadcast (Instance) | Illuminate\Contracts\Broadcasting\Broadcaster |  
| Bus | Illuminate\Contracts\Bus\Dispatcher |  
| Cache | Illuminate\Cache\CacheManager | cache
| Cache (Instance) | Illuminate\Cache\Repository | cache.store
| Config | Illuminate\Config\Repository | config
| Cookie | Illuminate\Cookie\CookieJar | cookie
| Crypt | Illuminate\Encryption\Encrypter | encrypter
| DB | Illuminate\Database\DatabaseManager | db
| DB (Instance) | Illuminate\Database\Connection | db.connection
| Event | Illuminate\Events\Dispatcher | events
| File | Illuminate\Filesystem\Filesystem | files
| Gate | Illuminate\Contracts\Auth\Access\Gate |  
| Hash | Illuminate\Contracts\Hashing\Hasher | hash
| Lang | Illuminate\Translation\Translator | translator
| Log | Illuminate\Log\Logger | log
| Mail | Illuminate\Mail\Mailer | mailer
| Notification | Illuminate\Notifications\ChannelManager |  
| Password | Illuminate\Auth\Passwords\PasswordBrokerManager | auth.password
| Password (Instance) | Illuminate\Auth\Passwords\PasswordBroker | auth.password.broker
| Queue | Illuminate\Queue\QueueManager | queue
| Queue (Instance) | Illuminate\Contracts\Queue\Queue | queue.connection
| Queue (Base Class) | Illuminate\Queue\Queue |  
| Redirect | Illuminate\Routing\Redirector | redirect
| Redis | Illuminate\Redis\RedisManager | redis
| Redis (Instance) | Illuminate\Redis\Connections\Connection | redis.connection
| Request | Illuminate\Http\Request | request
| Response | Illuminate\Contracts\Routing\ResponseFactory |  
| Response (Instance) | Illuminate\Http\Response |  
| Route | Illuminate\Routing\Router | router
| Schema | Illuminate\Database\Schema\Builder |  
| Session | Illuminate\Session\SessionManager | session
| Session (Instance) | Illuminate\Session\Store | session.store
| Storage | Illuminate\Filesystem\FilesystemManager | filesystem
| Storage (Instance) | Illuminate\Contracts\Filesystem\Filesystem | filesystem.disk
| URL | Illuminate\Routing\UrlGenerator | url
| Validator | Illuminate\Validation\Factory | validator
| Validator (Instance) | Illuminate\Validation\Validator |  
| View | Illuminate\View\Factory | view
| View (Instance) | Illuminate\View\View |  

Nguồn https://laravel.com/docs/5.6/facades