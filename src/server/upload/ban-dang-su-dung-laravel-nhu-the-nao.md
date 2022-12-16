# Bạn có hạnh phúc với Laravel?
**Laravel** là một PHP framework , một kẻ sinh sau đẻ muộn nhưng đang vươn mình trở thành một trong những framework tốt nhất hiện nay.
Laravel luôn tạo cho các developer cảm giác hạnh phúc như cái cách tương tự và có phần tốt hơn mà `Ruby on  Rails` mang lại cho các developer vậy.
Tới với laravel bạn sẽ tiến tới cái code đẹp đẹp và điêu luyện như một artisan vậy (yaoming) .
> Love beautiful code? We do too.

# Bạn sử dụng laravel như thế nào?
> Khi sử dụng framework một cách hợp lí, khả năng mở rộng của nó là vô hạn (yaoming)

Chúng ta đã biết trên thực tế có hàng trăm desgin partern, vô số cách tổ chức một project laravel nhưng hầu như đầu tuân thủ theo nguyên tắc  `SOLID principles`. 
Một vài workflows mà chúng ta sẽ hay gặp như:
* Kiểu 1: Controller -> Model
* Kiểu 2 : Controller -> Repository -> Model
* Kiểu 3: Controller -> Service -> Repository -> Model ( Kiểu này có vẻ như được ưa chuộng nhất, và chúng ta sẽ đi tìm hiểu cái này).
* Kiểu 4: Controller -> Jobs ->  Service -> Repository -> Model
* Kiểu 5:  Controller -> Jobs ->  Repository -> Model
Chúng ta sẽ đi 1 vòng để xem những kiểu viết được sử dụng nhiều tại các phần của laravel sẽ là như nào.

# Route
Sử dụng  Resource Controllers làm cho code của chúng ta trông gọn gàng và chúng ta dễ dàng điều hướng.
```
Route::resource('/users', 'UserController', [
    'only' => ['index',]
]);

Route::group(['prefix' => admin''], function() {
    Route::resource('/books',  'Admin\BookController', ['only' => [
        'create', 'store',
    ]]);
});
```
kết quả routes như thế này:
```
GET     
    /users          
    App\Http\Controllers\UserController@index
GET     
    /admin/books/create
    App\Http\Controllers\Admin\BookController@create
POST    
    /admin/books/
    App\Http\Controllers\Admin\BookController@store
```
# Controller
Chúng ta luôn được laravel khuyến khích sử dụng 7 methods trong `Resource Controllers`:
* index()
* create()
* store()
* show()
* edit()
* update()
* destroy()

Tại mỗi controller chúng ta luôn sử dụng Automatic Injection để đưa các cái service vào trong mỗi controller cần xử lí,  controller gần như chỉ điều hướng và đẩy xử lí logic vào services và trông có vẻ gọn gàng và sạch sẽ (yaoming).
```
class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

   public function index(Request $request)
    {
        $params = $request->all();
        $books = $this->bookService->paginateList($params);

        return view('book.index', compact('books', 'params'));
    }
}
```

# Services
Đưa dữ liệu điều hướng từ controller sang services và xử lí logic tại đây, còn việc truy vấn cơ sở dữ liệu sẽ do repository đảm nhiệm. Nó có thể trông như thế này:

```
<?php

namespace App\Services;
use App\Repository\BookRepositoryInterface;

class AdminService extends BaseService
{
    protected $userRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }
    public function paginateList($params)
    {
        $params = filter($params, ['keyword']);
        $page = isset($params['page']) ?? config('common.page_default');
        $keyword = isset($params['keyword']) ?? $params['keyword'];

        return $this->bookRepository->paginateList($page, ['*'], $keyword);
    }
}
```

# Repositories
Phần Interface:
```
<?php

namespace App\Repository;
use Illuminate\Support\Collection;

interface BookRepositoryInterface
{
    public function paginateList($page = null, array $columns = ['*'], $keyword);
}
```
Phần khai triển có thể sẽ trông như thế này (Nhớ binding nhé):
```
<?php
namespace App\Repository;
use Illuminate\Database\Connection;
use Illuminate\Support\Collection;

class BookRepositoryInterface implements BookRepositoryInterface
{
    public function paginateList($page = null, array $columns = ['*'], $keyword)
    {
        //code logic
    }
}
```
Việc chia nhỏ lớp và xử lí khiến code của bạn dễ dàng debug cũng như mở rộng. Mỗi phần đảm nhiệm một chức vụ và chức năng riêng, khiến code trở nên đẹp =]]
# Traits
Đôi khi chúng ta có các method cần tái sử dụng ở nhiều nơi, và Traits như một giải pháp không tồi cho việc này. Có nhiều thích sử dụng Traits nhiều người không thích, tùy vào cảm nhận mỗi người.

```
<?php

namespace App\Repositories\Traits;

trait Sortable
{
    public $sortBy = 'created_at';

    public $sortOrder = 'asc';

    public function setSortBy($sortBy = 'created_at')
    {
        $this->sortBy = $sortBy;
    }

    public function setSortOrder($sortOrder = 'desc')
    {
        $this->sortOrder = $sortOrder;
    }
}

```


# API
Kể từ khi phiển bản 5.5 ra mắt, việc sử dụng chung một format cho các API đã trở lên đơn giản hơn bao giờ hết. Chúng ta có thể sử dụng API Resources (https://laravel.com/docs/5.6/eloquent-resources) để code gọn gàng hơn so với việc như này.
```
<?php

class BlaBlaController

    public function index()
    {
        $companies = $this->company->with(['bla'])->paginate(10);
        foreach ($companies as $company) {
            $companyOffice = $this->companyOffice->findByField('email', $company->email, $columns = ['*'])->first();
            $company->name = $companyOffice->lastname . ' ' . $companyOffice->firstname;
        }
        if (request()->wantsJson()) {
            return response()->json([
                'data' => $companies,
            ]);
        }
        return view('pages.list_companies', compact('companies'));
    }
}
```
> Một ngày nào đó code cũng trờ về với cát bụi vậy chúng ta cố gắng viết code sạch để làm gì?
> 
Tài liệu tham khảo:

https://laravel.com/

https://medium.com/@smayzes/how-do-you-work-in-laravel-5a763fe5c5a0