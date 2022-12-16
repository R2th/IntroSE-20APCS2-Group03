Nếu lên google các bạn gõ Service Provider, hay Service Provider là gì, thì sau khi vào các bài viết về nó, chắc chắn các bạn sẽ nhận được những ý kiến rằng nó là một phần rất quan trọng trong Laravel. Tuy nhiên việc chỉ đọc mà không thực tế (tự tìm hiểu) thì sẽ rất khó tiếp thu cũng như hiểu được vấn đề. Vì vậy hôm nay mình cũng xin phép chia sẻ một chút thông tin mà mình tìm hiểu được qua bài viết này, đó là **Service Provider** trong Laravel. Sau khi đọc xong bài viết này, hi vọng các bạn có thể đưa ra quan điểm cá nhân về câu hỏi:
>Service Provider là gì?. Nó quan trọng cỡ nào trong ứng dụng của chúng ta?

## 1. Mở đầu
Ở bài trước, mình đã viết về việc [Laravel đã xử lý một request như thế nào?](https://viblo.asia/p/laravel-da-xu-ly-mot-request-nhu-the-nao-bJzKmG7Ol9N). Nếu như đọc bài viết của mình, hẳn các bạn cũng đã hiểu được phần nào về cách xử lý request trong Laravel. Và Service Provider cũng đã xuất hiện ở bài trước rồi. Giờ mình cùng xem Service Provider hoạt động như thế nào trong ứng dụng của chúng ta nhé.
> Note: Nên xem qua bài trước của mình vì có một chút thông tin liên quan
## 2. Nội dung
Cùng quay lại một chút ở bài trước trong phần handle request, có đoạn mình có nhắc đến. Đoạn này nằm xen kẽ giữa lúc Laravel nhận request và dispatch request lên router. Đây là nơi quá trình **bootstrapping** bắt đầu diễn ra.
```php
$this->bootstrap();

public function bootstrap()
{
    if (! $this->app->hasBeenBootstrapped()) {
        $this->app->bootstrapWith($this->bootstrappers());
    }
}
```

Bạn có thể xem nó tại `Illuminate\Foundation\Application.php`
Hàm này sẽ nạp các `bootstrappers`. Các `bootstrappers` ở đây được lấy từ trong hàm `$this->bootstrappers()`. Đó là những class sau:
```php
protected $bootstrappers = [
    \Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables::class, // nạp các biến môi trường
    \Illuminate\Foundation\Bootstrap\LoadConfiguration::class, // nạp các configuration file
    \Illuminate\Foundation\Bootstrap\HandleExceptions::class, // nạp các file cho việc xử lý exceptions
    \Illuminate\Foundation\Bootstrap\RegisterFacades::class, // đăng ký facade
    \Illuminate\Foundation\Bootstrap\RegisterProviders::class, // đăng ký các service provider
    \Illuminate\Foundation\Bootstrap\BootProviders::class, // boot
];
```
Mở file `Illuminate\Foundation\Application.php` và tìm đến hàm `bootstrapWith` ta sẽ thấy hàm này sẽ tạo ra các `bootstrappers` mà mình liệt kê bên trên, sau đó nạp các `bootstrappers` này vào trong application của bạn.  
```php
$this->make($bootstrapper)->bootstrap($this);
```
Giờ chúng ta sẽ tìm hiểu xem Laravel Service provider hoạt động như thế nào nhé. Chúng ta biết biết chắc chắn là trong mỗi `bootstrapper` này đều có một hàm `bootstrap`. 

Ở trên mình cũng giải thích lại về chức năng của từng `bootstrapper` này. Tuy nhiên ở đây mình sẽ đi vào class `\Illuminate\Foundation\Bootstrap\RegisterProviders::class`  để xem Service Provider đã làm những gì cho application của chúng ta:<br>
```php
public function bootstrap(Application $app)
{
    $app->registerConfiguredProviders();
}
```
Ở đoạn xử lý đầu tiên, `$providers` của chúng ta sẽ trả về một kết quả đó là danh sách các provider nằm trong key `'providers'` và bắt đầu bằng `Illuminate\\` tại `config/app.php`. 
```php
$providers = Collection::make($this->config['app.providers'])
                ->partition(function ($provider) {
                    return Str::startsWith($provider, 'Illuminate\\');
                });
```
Ở đoạn xử lý thứ 2, Laravel sẽ gộp các providers có được tại hàm
```php
$this->make(PackageManifest::class)->providers()
```
vào các providers đã lấy được ở trên.
Mình sẽ xem các providers trong cái hàm ở trên là những providers nào nhé.  `Illuminate\Foundation\PackageManifest.php`:
```php
public function providers()
{
    return collect($this->getManifest())->flatMap(function ($configuration) {
        return (array) ($configuration['providers'] ?? []);
    })->filter()->all();
}
```

Có vẻ hơi khó hiểu :D. Xem hàm `getManifest` xem nó có gì nào ?? 
```php
protected function getManifest()
{
    if (! is_null($this->manifest)) {
        return $this->manifest;
    }

    if (! file_exists($this->manifestPath)) {
        $this->build();
    }

    $this->files->get($this->manifestPath, true);

    return $this->manifest = file_exists($this->manifestPath) ?
        $this->files->getRequire($this->manifestPath) : [];
}
```
Nên nhớ ở trên chúng ta **make** một class **PackageManifest** và không truyền cho nó cái gì cả. Vậy thì constructor của nó chả có gì. Vậy là trong hàm `getManifest()`, property `$this->manifest` ở đây đang không có giá trị. <br>
Khoan đã, [quay lại bài trước](https://viblo.asia/p/laravel-da-xu-ly-mot-request-nhu-the-nao-bJzKmG7Ol9N), các bạn để ý cho mình phần **2.2. Khởi tạo một instance từ Laravel Application** có một đoạn mình có nói rằng Laravel khởi tạo một instance của `PackageManifest`. 
```php
$this->instance(PackageManifest::class, new PackageManifest(
    new Filesystem, $this->basePath(), $this->getCachedPackagesPath()
));
```
Trước hết hãy để ý một điều, Laravel sử dụng hàm này trước khi quá trình **bootstrapping** xuất hiện. Chi tiết các bạn hãy mở lại file `public/index.php` và đọc theo bài viết trước của mình, sẽ thấy thứ tự như mình nói. 

Vậy lúc này trong class **PackageManifest** có gì ??<br>
Mình đang cần quan tâm đến hàm `providers` vậy nên ta cần biết tham số thứ 3 trong constructor, đó là `$manifestPath` là gì. <br>
Tương ứng như chúng ta thấy, đó là:
```php
$this->getCachedPackagesPath() // bootstrap/cache/packages.php
```

Giờ chúng ta hiểu, giá trị `$this->manifestPath` chính là chuỗi  **bootstrap/cache/packages.php**, hãy cùng tiếp tục xem Service Provider đã làm gì tiếp theo.<br>
Mở file `bootstrap/cache/packages.php` , chúng ta thấy 1 array chứa các cặp array khác có key là `'providers'` và `'aliases'`.
Mà hàm `providers` của chúng ta lấy các key là `'providers'` <br> Đến đây có thể hiểu rằng Laravel sẽ lấy tất cả các providers trong application của chúng ta bằng cách lấy các providers có tiền tố `Illuminate\\` tại `config/app.php` và danh sách các providers tại `caches/packages.php`. Sau khi tập hợp tất cả các providers chúng ta sẽ quay lại hàm **registerConfiguredProviders()**: 
```php
(new ProviderRepository($this, new Filesystem, $this->getCachedServicesPath()))
                    ->load($providers->collapse()->toArray());
```
Trong hàm này,  tất cả các đăng ký các event khi load các provider, sau đó các từng provider này sẽ được đăng ký bằng cách gọi đến hàm register trong class `Application`:
```php
foreach ($manifest['when'] as $provider => $events) {
    $this->registerLoadEvents($provider, $events);
}

// We will go ahead and register all of the eagerly loaded providers with the
// application so their services can be registered with the application as
// a provided service. Then we will set the deferred service list on it.
foreach ($manifest['eager'] as $provider) {
    $this->app->register($provider);
}
```
Trong hàm `register` tại class Application, mỗi service provider sẽ được gọi đến method `register` của chính provider đó. 
```php
if (method_exists($provider, 'register')) {
    $provider->register();
}
```
Và nếu các bạn có để ý, trong các provider tại method `register`, chúng ta sẽ thường sử dụng việc binding tại hàm này, Tuy nhiên có một cách ngắn hơn đó là  nếu provider của bạn đang có property là `$bindings` hoặc `$singletons` thì Laravel sẽ tự động binding theo cặp key, value này.
```php
if (property_exists($provider, 'bindings')) {
    foreach ($provider->bindings as $key => $value) {
        $this->bind($key, $value);
    }
}

if (property_exists($provider, 'singletons')) {
    foreach ($provider->singletons as $key => $value) {
        $this->singleton($key, $value);
    }
}

// Ví dụ
public $bindings = [
   A::class => B::class,
];
 //=> $this->bind(A::class, B::class);
/**
* All of the container singletons that should be registered.
*
* @var array
*/
public $singletons = [
   A::class => B::class,
];
 //=> $this->singleton(A::class, B::class);
```
Để tìm hiểu kĩ hơn về cơ chế binding và resolve cũng như các thông tin, khái niêm về Service Container, các bạn có thể tìm hiểu về các bài viết trên Viblo: <br>
- https://viblo.asia/p/3KbvZ1wLGmWB
- https://viblo.asia/p/hoc-laravel-service-container-MVpvKrndkKd
- https://viblo.asia/p/laravel-service-container-in-depth-tips-to-customize-your-application-RQqKLnqNl7z


Đến đây, nếu application của bạn chưa nạp các provider thì nó sẽ nạp tất cả các provider đó, nếu không, nó sẽ chỉ nạp các provider mới. Thay vì việc phải quay lại làm một công việc từ đầu, thì nó sẽ không làm lại nữa mà chỉ làm các công việc mới thôi.  
```php
if ($this->booted) {
    $this->bootProvider($provider);
}

protected function bootProvider(ServiceProvider $provider)
{
    if (method_exists($provider, 'boot')) {
        return $this->call([$provider, 'boot']);
    }
}
```
Để mình giải thích kỹ hơn về phần này nhé. Tưởng tượng bạn đang có một máy tính bao gồm 1 bàn phím, 1 con chuột, 1 màn hình. Và bạn đã build những thứ đó thành một máy tính mà bạn đang sử dụng.  (giả sử là vậy :') ). Tuy nhiên nếu bạn muốn lắp thêm 1 màn, hoặc một chiếc bàn phím hay một con chuột khác thì bạn sẽ không phải tháo rời hết các bộ phận để build lại, mà chỉ tiếp tục gắn nó vào hệ thống máy tính mà bạn đã dựng lên trước đó. Với Laravel cũng vậy, sau khi kết thúc quá trình **bootstrapping** lần đầu tiên (quá trình build máy ở lần đầu tiên), các package/library hiện có đã có thể sử dụng. Giả sử bạn muốn install thêm các package/library khác (lắp thêm chuột, bàn phím...) thì Laravel chỉ nạp lại những package mới này và đăng ký các provider tương ứng cho chúng vào application của bạn thôi.
<br>
Vậy là chúng ta sẽ hiểu việc đăng ký **providers** như sau:
```php
$providers = Collection::make($this->config['app.providers'])
                ->partition(function ($provider) {
                    return Str::startsWith($provider, 'Illuminate\\');
                });
// lấy tất cả provider có tiền tố là Illuminate\\ từ config/app.php
$providers->splice(1, 0, [$this->make(PackageManifest::class)->providers()]);
// lấy tất cả các providers từ bootstrap/cache/packages.php rồi kết hợp với các providers ở trên.
// Lúc này trong application chúng ta đã có đc đầy đủ các providers rồi
(new ProviderRepository($this, new Filesystem, $this->getCachedServicesPath()))
            ->load($providers->collapse()->toArray());
// Các providers này sẽ được gọi tự động đăng kí (register), nạp vào application (boot)
```
Vậy nên chúng ta thường thấy các provider sẽ có các phương thức như `boot` hay `register` mà không phải các phương thức khác, tất cả là do Laravel đã thiết kế nên như vậy. Đã bao giờ các bạn sử dụng command để thêm các package/library ngoài vào, sau đó thêm các provider của nó vào trong `config/app.php` chưa? Mình nghĩ là rồi ý nhỉ. Thường thì chúng ta chỉ cần import nó vào và sử dụng mà không cần biết rằng tại sao nó lại vận hành được. Thật ra thì vấn đề này Laravel đã giúp chúng ta làm tất cả rồi :')

## 3. Kết luận
Đến đây, hãy cũng trả lời cho câu hỏi **Service Provider là gì?**
Cá nhân mình nghĩ, Service Provider là một khái niệm khá trừu tượng, tuy nhiên cũng có thể hiểu một cách tổng quan rằng trong quá trình **bootstrapping application**, thì Service Provider chính là phần quan trọng nhất. Còn ý kiến của các bạn thì sao. Nếu có hãy để lại  một comment nhé :) 

Qua bài chia sẻ về Service Provider trong Laravel, mình cảm thấy đây là một phần rất quan trọng trong quá trình phát triển của framework này. Hi vọng sau khi đọc hết bài này của mình,  các bạn có thể tự tạo ra được các provider trong ứng dụng của bạn. Nếu ai chưa tìm hiểu thì có thể tìm hiểu sâu hơn về Laravel và chia sẻ với mọi người. Mình nghĩ nó thật sự hay, lôi cuốn và hấp dẫn.  Bài viết của mình mới ở mức tìm hiểu, nên nội dung có thể vẫn chưa đi hết được các chi tiết, vẫn còn sơ sài và thiếu xót, rất mong được các bạn góp ý. 

Cảm ơn các bạn đã theo dõi bài viết của mình. Hẹn gặp lại!
![](https://images.viblo.asia/7ecd1943-b49b-455c-b1f9-00e968ac8139.gif)