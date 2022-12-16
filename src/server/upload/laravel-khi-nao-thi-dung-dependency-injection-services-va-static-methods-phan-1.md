Khi làm việc với dự án Laravel, nhiều lúc chúng ta sẽ phải đặt các xử lý logic ra một nơi ngoài Controllers và Models, thường được gọi là Services. Có một vài cách để sử dụng Services: Static Methods, Object hoặc Dependency Injection. Hãy tìm hiểu xem chúng hoạt động như thế nào và sử dụng trong trường hợp nào.

## Ví dụ: Report Controller
Giả sử ứng dụng của chúng ta xây dựng có chức năng báo cáo theo tháng. Nếu chúng ta đặt hết vào trong controlller, thì sẽ như sau:
```php
// ... use statements

class ClientReportController extends Controller
{
    public function index(Request $request)
    {
        $q = Transaction::with('project')
            ->with('transaction_type')
            ->with('income_source')
            ->with('currency')
            ->orderBy('transaction_date', 'desc');
        if ($request->has('project')) {
            $q->where('project_id', $request->project);
        }

        $transactions = $q->get();

        $entries = [];

        foreach ($transactions as $row) {
            // ... Some logic codes
        }

        return view('report', compact('entries'));
    }
}
```

Bạn có thể thấy tất cả DB queries, logic codes được viết trực tiếp vào controller. Có vẻ như sẽ quá nhiều cho một controller, vì vậy chúng ta cần đưa chúng vào một nơi khác.

## Cách 1: Sử dụng Static Service “Helper”

Cách phổ biến nhất là đưa logic code từ Controller vào một class khác, thường được gọi là Service, hay còn gọi là “helper” hoặc đơn giản hơn là “function”.

Lưu ý: Service classes không phải là một phần của Laravel, do đó không có lệnh Artisan ```make:service```. Đó chỉ là những class PHP để tính toán và xử lý logic, và “service” chỉ là một cái tên để đại diện cho chúng.

Chúng ta sẽ tạo một file app/Services/ReportService.php:
```php
namespace App\Services;

use App\Models\Transaction;
use Carbon\Carbon;

class ReportService
{
    public static function getTransactionReport(int $projectId = NULL)
    {
        $q = Transaction::with('project')
            ->with('transaction_type')
            ->with('income_source')
            ->with('currency')
            ->orderBy('transaction_date', 'desc');
        if (!is_null($projectId)) {
            $q->where('project_id', $projectId);
        }
        $transactions = $q->get();
        $entries = [];

        foreach ($transactions as $row) {
            // ... Some logic codes
        }

        return $entries;
    }
}
```
Bây giờ, chúng ta có thể gọi method này từ Controller:
```php
// ... other use statements
use App\Services\ReportService;

class ClientReportController extends Controller
{
    public function index(Request $request)
    {
        $entries = ReportService::getTransactionReport($request->input('project'));

        return view('report', compact('entries'));
    }
}
```
Bây giờ thì Controller đã gọn gàng hơn nhiều rồi đúng không?

Như bạn thấy, chúng ta sử dụng static method và gọi với cú pháp ```Class::method```. Do đó chúng ta không cần tạo object cho class ReportService.
### Khi nào thì sử dụng cách này?
Khi bạn sử dụng những function đơn giản mà không cần quan tâm tới class và không thay đổi các thuộc tính trong class. Nó giống như global helper, nhưng được đặt trong ReportService.

Nhưng nếu bạn muốn lưu lại data trong Service…
## Cách 2: Service Object với Non-Static Method
Một cách khác đó là sử dụng non-static method và tạo object:

app/Services/ReportService.php:
```php
class ReportService
{
    public function getTransactionReport(int $projectId = NULL)
    {
        // ... code như ở cách 1

        return $entries;
    }

}
```
ClientReportController:
```php
// ... other use statements
use App\Services\ReportService;

class ClientReportController extends Controller
{
    public function index(Request $request)
    {
        $entries = (new ReportService())->getTransactionReport($request->input('project'));

        return view('report', compact('entries');
    }
}
```
Hoặc nếu bạn muốn viết rõ ra:
```php
$reportService = new ReportService();
$entries = $reportService->getTransactionReport($request->input('project'));
```
Có vẻ không khác nhiều với cách 1 nhỉ? Đó là bởi vì trên đây chỉ là một trường hợp đơn giản.
Nhưng nếu trong service của bạn có các Chaining method thì bạn sẽ thấy tác dụng của cách này. Ví dụ:
```php
class ReportService {

    private $year;

    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    public function getTransactionReport(int $projectId = NULL)
    {
        $q = Transaction::with('project')
            ->with('transaction_type')
            ->with('income_source')
            ->with('currency')
            ->whereYear('transaction_date', $this->year)
            ->orderBy('transaction_date', 'desc');
        if (!is_null($projectId)) {
            $q->where('project_id', $projectId);
        }
        $transactions = $q->get();
        $entries = [];

        foreach ($transactions as $row) {
            // ... Some logic codes
        }

        return $entries;
    }
}
```
Và ở Controller:
```php
public function index(Request $request)
{
    $entries = (new ReportService())
        ->setYear(2020)
        ->getTransactionReport($request->input('project'));

        return view('report', compact('entries');
    }
}
```
### Khi nào thì sử dụng cách này?
Khi bạn muốn sử dụng Chaining method như ví dụ trên đây.

## Cách 3: Service Object với tham số
Khi bạn muốn khởi tạo Service với các tham số có sẵn, ví dụ như năm hoặc tháng cho tất cả phương thức trong Service.

app/Services/YearlyReportService.php:
```php
class YearlyReportService {

    private $year;

    public function __construct(int $year)
    {
        $this->year = $year;
    }

    public function getTransactionReport(int $projectId = NULL)
    {
        // Notice the ->whereYear('transaction_date', $this->year)
        $q = Transaction::with('project')
            ->with('transaction_type')
            ->with('income_source')
            ->with('currency')
            ->whereYear('transaction_date', $this->year)
            ->orderBy('transaction_date', 'desc');

        $entries = [];

        foreach ($transactions as $row) {
            // ... Same 50 line of code
        }

        return $entries;
    }

    // Another report that uses the same $this->year
    public function getIncomeReport(int $projectId = NULL)
    {
        // Notice the ->whereYear('transaction_date', $this->year)
        $q = Transaction::with('project')
            ->with('transaction_type')
            ->with('income_source')
            ->with('currency')
            ->whereYear('transaction_date', $this->year)
            ->where('transaction_type', 'income')
            ->orderBy('transaction_date', 'desc');

        $entries = [];

        // ... Some more logic

        return $entries;
    }
}
```
Có vẻ phức tạp hơn một chút rồi nhỉ.

Bây giờ, chúng ta cũng phải thay đổi ở Controller.
```php
// ... other use statements
use App\Services\YearlyReportService;

class ClientReportController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->input('year', date('Y')); // default to current year
        $reportService = new YearlyReportService($year);

        $fullReport = $reportService->getTransactionReport($request->input('project'));
        $incomeReport = $reportService->getIncomeReport($request->input('project'));
    }
}
```
Trong ví dụ này, cả 2 method của Service sẽ sử dụng chung tham số ```$year``` mà chúng ta truyền vào khi khởi tạo object.

Bây giờ, việc tạo Service object này sẽ có ý nghĩa hơn so với sử dụng static methods.
### Khi nào thì sử dụng cách này?
Khi Service của bạn có các tham số mà bạn muốn truyền vào khi khởi tạo.

continue...