Khi làm việc với dự án Laravel, nhiều lúc chúng ta sẽ phải đặt các xử lý logic ra một nơi ngoài Controllers và Models, thường được gọi là Services. Có một vài cách để sử dụng Services: Static Methods, Object hoặc Dependency Injection. Hãy tìm hiểu xem chúng hoạt động như thế nào và sử dụng trong trường hợp nào.Khi làm việc với dự án Laravel, nhiều lúc chúng ta sẽ phải đặt các xử lý logic ra một nơi ngoài Controllers và Models, thường được gọi là Services. Có một vài cách để sử dụng Services: Static Methods, Object hoặc Dependency Injection. Hãy tìm hiểu xem chúng hoạt động như thế nào và sử dụng trong trường hợp nào.


-----

Xem phần 1 ở đây:  [Laravel: khi nào thì dùng Dependency Injection, Services và Static Methods - Phần 1](https://viblo.asia/p/laravel-khi-nao-thi-dung-dependency-injection-services-va-static-methods-phan-1-QpmlepqNZrd)

-----

## Cách 4: Dependency Injection - Trường hợp đơn giản
Nếu bạn có một vài phương thức trong controller và muốn sử dụng cùng một Service cho các phương thức đó, bạn có thể inject nó ở constructor của controller như một tham số type-hinted. Ví dụ:
```php
class ClientReportController extends Controller
{
    private $reportService;

    public function __construct(ReportService $service)
    {
        $this->reportService = $service;
    }

    public function index(Request $request)
    {
        $entries = $this->reportService->getTransactionReport($request->input('project'));
        // ...
    }

    public function income(Request $request)
    {
        $entries = $this->reportService->getIncomeReport($request->input('project'));
        // ...
    }
}
```

1. Khởi tạo thuộc tính private trong controller: **$reportService**
2. Truyền tham số có type là **ReportService** vào phương thức **__construct**
3. Trong **constructor**, gán tham số này cho thuộc tính private đã tạo.
4. Khi đó, trong các phương thức của controller, chúng ta có thể sử dụng **$this->reportService** và các phương thức của nó.

### Khi nào thì sử dụng cách này?
Khi bạn có nhiều phương thức trong controller sử dụng cùng một Service, và Service không cần tham số khởi tạo như ở [cách 3](https://viblo.asia/p/laravel-khi-nao-thi-dung-dependency-injection-services-va-static-methods-phan-1-QpmlepqNZrd#_cach-3-service-object-voi-tham-so-5). Cách này giúp bạn không cần khởi tạo lại **ReportService** ở từng phương thức của controller.

-----

Chưa hết, bạn còn có thể sử dụng kiểu injection này ở bất kỳ phương thức nào và không chỉ ở Controller. Đó gọi là method injection. Ví dụ:
```php
class ClientReportController extends Controller
{
    public function index(Request $request, ReportService $reportService)
    {
        $entries = $reportService->getTransactionReport($request->input('project'));
        // ...
    }
```
Như bạn thấy, không cần Constructor hay thuộc tính private nào cả. Bạn chỉ cần inject biến type-hinted và sử dụng nó trong phương thức đó. Còn lại đã có Laravel lo.
Nhưng thành thật mà nói, theo như ví dụ trên, cách này không hữu dụng cho lắm. Bởi vì code của nó vẫn dài như [cách 2](https://viblo.asia/p/laravel-khi-nao-thi-dung-dependency-injection-services-va-static-methods-phan-1-QpmlepqNZrd#_cach-2-service-object-voi-non-static-method-3) hay [cách 3](https://viblo.asia/p/laravel-khi-nao-thi-dung-dependency-injection-services-va-static-methods-phan-1-QpmlepqNZrd#_cach-3-service-object-voi-tham-so-5). Vậy lợi ích thực sự của **dependency injection** là gì?

## Cách 5: Dependency Injection với Interface
Trong ví dụ trước, chúng ta truyền tham số vào Controller và Laravel đã giúp chúng ta khởi tạo Service object.
Vậy điều gì sẽ xảy ra nếu chúng ta muốn kiểm soát giá trị biến đó? Ví dụ chúng ta muốn sử dụng một Service cho môi trường local và một Service khác cho môi trường production chẳng hạn?

Để làm điều đó, chúng ta cần tạo một **Interface** và hai Service implement Interface đã tạo. Interface sẽ khai báo các thuộc tính và phương thức bắt buộc phải có trong các class implement nó. Ví dụ:

Đầu tiên, chúng ta cần tạo file mới **app/Interfaces/ReportServiceInterface.php**
```php
namespace App\Interfaces;

interface ReportServiceInterface {

    public function getTransactionReport(int $projectId = NULL);

}
```
Ở Interface, chúng ta chỉ cần khai báo tên phương thức và các tham số. Những class implement Interface này bắt buộc phải có phương thức getTransactionReport với tham số truyền vào giống hệt như ở Interface.

TIếp theo là file **app/Services/ReportService.php**
```php
use App\Interfaces\ReportServiceInterface;

class ReportService implements ReportServiceInterface {

    public function getTransactionReport(int $projectId = NULL)
    {
        // ... same old code
    }
}
````
Tương tự với file **app/Services/YearlyReportService.php**
```php
use App\Interfaces\ReportServiceInterface;

class YearlyReportService implements ReportServiceInterface {

    private $year;

    public function __construct(int $year = NULL)
    {
        $this->year = $year;
    }

    public function getTransactionReport(int $projectId = NULL)
    {
        // same old code with $year as a parameter
    }
}
```

Bây giờ đến phần chính, chúng ta sẽ sử dụng class nào cho type-hint ở Controller. ReportService hay YearlyReportService? Thực tế chúng ta sẽ không sử dụng class nào cả, chúng ta sẽ sử dụng Interface.
```php
use App\Interfaces\ReportServiceInterface;

class ClientReportController extends Controller
{
    private $reportService;

    public function __construct(ReportServiceInterface $reportService)
    {
        $this->reportService = $reportService;
    }

    public function index(Request $request)
    {
        $entries = $this->reportService->getTransactionReport($request->input('project'));
        // ... Same old code
    }
}
````
Phần chính ở đây là **__construct(ReportServiceInterface $reportService)**. Bây giờ, chúng ta có thể gắn bất kỳ class nào implement Interface đó.
Tuy nhiên, chúng ta sẽ bị mất "magic injection" của Laravel. Bởi vì framework không biết cần phải sử dụng class nào. Do đó, nó sẽ trả về lỗi.
Điều đó hoàn toàn bình thường, bởi vì chúng ta chưa khai báo class nào cần được khởi tạo. Chúng ta cần khai báo ở **app/Providers/AppServiceProvider.php** trong phương thức **register()**.
Để ví dụ này được rõ ràng, chúng ta sẽ sử dụng câu lệnh điều kiện ở đây. Nếu đang ở môi trường local, chúng ta sẽ sử dụng **ReportService**, và ngược lại **YearlyReportService** cho môi trường production.
```php
use App\Interfaces\ReportServiceInterface;
use App\Services\ReportService;
use App\Services\YearlyReportService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (app()->environment('local')) {
            $this->app->bind(ReportServiceInterface::class, function () {
                return new ReportService();
            });
        } else {
            $this->app->bind(ReportServiceInterface::class, function () {
                return new YearlyReportService();
            });
        }
    }
}
```
Điều gì sẽ xảy ra?
Chúng ta chọn Service nào sẽ được sử dụng, tùy thuộc vào môi trường ứng dụng đang chạy là local hay production.

### Khi nào thì sử dụng cách này?
Ví dụ trên có lẽ là cách sử dụng phổ biến nhất của Dependency Injection thông qua Interfaces. Khi bạn cần thay đổi Service theo điều kiện nào đó và có thể dễ dàng thực hiện trong Service Provider.
Một số ví dụ khác như là khi bạn muốn thay đổi nhà cung cấp email hoặc dịch vụ thanh toán, ... Nhưng điều quan trọng nhất là bạn phải chắc chắn rằng các service đó implement cùng một interface.

-----

Cảm ơn các bạn đã đọc bài viết. Hi vọng qua bài viết này các bạn có thể hiểu thêm về cách sử dụng cũng như các trường hợp sử dụng Service và Service Injection.