Cảm ơn [@kylekatarnls](https://github.com/kylekatarnls "@kylekatarnls") đã luôn tận tâm bảo trì Carbon (thư viện PHP Datetime), để từ phiên bản [**Laravel 5.8**](https://tuhoclaptrinh.net/go/CS6zFY "Category Laravel 5.8") tới đây chúng ta đã có thể sử dụng **Carbon 1.0** và **Carbon 2.0**. Bản cập nhật này bạn có thể sử dụng Carbon bất biến (immutable) và thậm chí trong project **Laravel** của bạn còn được sử dụng **CarbonImmutable** làm mặc định.

Trước đây Carbon bị chê vì nó có thể thay đổi được (mutable) và đối thủ của nó là [https://github.com/cakephp/chronos](https://github.com/cakephp/chronos) 

Ví dụ nhé:
```php
    $dt = Carbon::now(); // ngày hôm nay 12/10
    $dt->addDays(3); // ngày 15/10
    $dt->addDays(5); // ngày 20/10 😄😄😄
```
Ví dụ trên về Carbon mutable bạn thấy chưa nè, rõ ràng biến $dt không bảo toàn giá trị của nó, nếu bạn muốn `$dt->addDays(5);` thành ngày 17/10 bạn phải viết như thế này:
```php
    $dt = Carbon::now(); // ngày 12/10
    $dt->copy()->addDays(3); // ngày 15/10
    $dt->copy()->addDays(5); // ngày 17/10
```
Chuyện bất biến hay không bất biến sẽ chẳng có gì đáng nói khi bạn sử dụng trong project PHP bình thường, trong **Laravel** thì lại khác, trường DATETIME trong Laravel được chuyển thành object Carbon khi output bạn có thể `dd($model->created_at)` để kiểm tra xem thực hư.

Và khi Carbon bất biến, nếu ở đâu đó làm một hành động gì thay đổi giá trị, sẽ ảnh hưởng đến toàn bộ hệ thống vì bạn không kiểm soát được 💀💀💀

Cho nên phiên bản **Laravel 5.8** sẽ cho phép bạn dùng **CarbonImmutable** (Carbon bất biến ~ như const vậy) bằng cách sử dụng Facade Date (`Illuminate\Support\Facades\Date`) trong `AppServiceProvider@register`.  Không chỉ CarbonImmutable, giờ đây bạn có thể chọn **Chronos** hay chỉ đơn giản **DateTime** nhé:
```php
    public function register()
    {
        Date::use(CarbonImmutable::class);
    }
```
[From Tự học lập trình](https://tuhoclaptrinh.net/posts/laravel-5-8-cap-nhat-carbon-2-0)