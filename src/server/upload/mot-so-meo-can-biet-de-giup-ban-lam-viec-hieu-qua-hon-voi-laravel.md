Xin chào các bạn, trong cuộc đời coder của chúng ta, chắc hẳn không ít trong số chúng ta gặp phải những tình huống dở khóc dở cười ví dụ như code quá dài dòng, rườm rà, hiệu xuất chưa cao hay đại loại là một dòng code lặp đi lặp lại nhiều nơi và chưa biết cách tái sử dụng chúng như thế nào cho hiệu quả :v: thì ở bài viết này mình sẽ thảo luận về một số cách giúp các bạn cải thiện đáng kể việc coding của các bạn dưới đây nhé. Let's go :v: 

## 1. Controllers should... well, control

Đã bao giờ bạn viết một Controller nó bự tương tự như vậy chưa?
```
use Validator;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class AuthenticationController extends Controller {
  public function index(Request $request) {
    if ($request->wantsJson()) {
      $validator = Validator::validate($request->all(), [
        'token' => 'required|filled|string'
      ]);

      if ($validator->fails()) {
        return response()->json('wrong token', 400);
      }

      $serviceAccount = ServiceAccount::fromArray(config('firebase'));
      $firebase = (new Factory)->withServiceAccount($serviceAccount)
        ->create()
        ->getAuth();

      try {
        $firebase->verifyIdToken($token);

        return response()->json('ok');
      } catch(Exception $exception) {
        app('sentry')->captureException($exception);

        return response()->json('unauthorized', 403);
      }
    } else {
      abort(403);
    }
  }
}
```
Khi mới tập tành viết Laravel, hầu hết các bạn thường viết hết code xử lý Request, Validation, hay Logic code vào hết Controller. Việc này làm cho Controller phình to ra, code sẽ rất là "smell" và khó maintain sau này.

Vậy hãy thử cách ở dưới :
```
use App\Firebase;
use App\Http\Requests\AuthenticationRequest;

class AuthenticationController extends Controller {
  public function index(AuthenticationRequest $request) {
    if ($request->wantsJson()) {
      if (Firebase::tokenValid($request->input('token'))) {
        return response()->json('ok');
      } else {
        return response()->json('unauthorized', 403);
      }
    } else {
      abort(403);
    }
  }
}
```
Các bạn có thể thấy, với đoạn code trên, Controller chỉ có nhiệm vụ xử lý các request và điều hướng, định tuyến các route. Các bạn **không nên để business logic code vào trong controller** để tránh việc phình to controller. Việc xử lý các business logic các bạn có thể xử lý riêng ở [Models.](https://laravel.com/docs/7.x/eloquent)  

Để hạn chế tối đa trong việc phình to controller thì việc xử lý các [Validation](https://laravel.com/docs/7.x/validation) và [Error handling](https://laravel.com/docs/7.x/errors) cũng nên được tách riêng ra, chúng ta chỉ cần gọi các Validation và Error khi cần sử dụng nó. Chúng ta sẽ nói về việc này ở mục dưới nhé các bạn ^^

## 2. Cleaner validation with Form requests
Vừa nhắc đến thì anh ấy đây :v Một trong những yếu tố làm Laravel trở nên phổ biến hiện nay đó là việc bố trí một bố cục rõ ràng cho việc coding và tái sử dụng sau này. Và việc validation với Laravel cũng không ngoại lệ.
Để làm rõ hơn vấn đề này, chúng ta sẽ lấy ví dụ về việc xử lý validation của giỏ hàng. Ở đây mình sẽ gọi là `user cart`
```
use App\Product;
use App\Order;
use App\Session;

class CartController extends Controller {
  public function store(Request $request) {
    $request->validate([
      'id' => 'required|exists:product,id'
    ]);

    // Request passed, time to save the data

    $productId = $request->input('id');
    $product = Product::find($productId);

    Order::insert([
      'productId' => $product->id
    ]);

    Session::flash('success', 'Order completed!');

    return response()->view('product');
  }
},
```
Với đoạn code trên, có thể thấy rằng ta đang validation trực tiếp vào controller bằng `$request->validate`, điều này là ổn nhưng thử tưởng tượng xem nếu trúng ta cần validate nhiều field hoặc muốn tùy chỉnh việc validation thì việc viết trực tập vào controller sẽ làm cho nó phình to ra, rất dài dòng và khi nhìn lại đoạn code trong controller của bạn để bảo trì thì chỉ có nước "ngất xỉu" nhỉ :v 

Vậy hãy thử tách ra xem, đầu tiên bạn tạo một Form Request bằng lệnh:

```
php artisan make:request CartRequest
````

Sau khi thực hiện câu lệnh, một file sẽ được tạo ra ở `app/Http/Requests/CartRequest.php` . Mở nó ra và sữa đoạn code của bạn lại như sau:
```
use Illuminate\Foundation\Http\FormRequest;

class CartRequest extends FormRequest {
  public function authorize() {
    return true; // Unless you have Guards, set it to true.
  }

  public function rules() {
    return [
      'id' => 'required|exists:product,id'
    ];
  }
}
```
Sau đó gọi nó trong Controller như sau :
```
use App\Product;
use App\Order;
use App\Session;
use App\Http\Requests\CartRequest;

class CartController extends Controller {
  public function store(CartRequest $request) {
    // The request is validated using our CartRequest

    $productId = $request->input('id');
    $product = Product::find($productId);

    Order::insert([
      'productId' => $product->id
    ]);

    Session::flash('success', 'Order completed!');

    return response()->view('product');
  }
}
```
Việc này giúp controller trở nên ngắn gọn và việc xử lý các validation với form request cũng dễ dàng hơn, bảo đảm cho việc bảo trì sau này vì bạn có thể **tái sử dụng** được nó. 
```
use App\Http\Requests\ProductRequest;

class Shoe extends Controller {
  public function index(ProductRequest $request) {
    // ...
  }
}

class Clothing extends Controller {
  public function index(ProductRequest $request) {
    // ...
  }
}
```

## 3. Type hint your models in your controllers
Đã bao giờ bạn viết một route dài 3km như này chưa :v:
```
Route::get('/customer/{customerId}/contract/{contractId}/invoice/{invoiceId}', 'CustomerContractInvoiceController@show');
```
Và khi bạn tìm kiếm thì sẽ phải như này nhỉ (lol)
```
use App\Customer;
use App\Contract;
use App\Invoice;

class CustomerContractInvoiceController extends Controller {
  public function show(Request $request, int $customerId, int $contractId, int $invoiceId) {
    $customer = Customer::findOrFail($customerId);
    $contractId = Contract::findOrFail($contractId);
    $invoice = Invoice::findOrFail($invoiceId);

    // ...
  }
}
```
Để xử lý trường hợp trên Laravel cung cấp cho bạn [Route model binding](https://laravel.com/docs/5.8/routing#route-model-binding).
Sau khi sử dụng, nếu muốn lấy name của một customer thì bạn chỉ cần làm như sau:
```
use App\Customer;
use App\Contract;
use App\Invoice;

class CustomerContractInvoiceController extends Controller {
  public function show(Request $request, Customer $customer, Contract $contract, Invoice $invoice) {
    $customerName = $customer->name;

    // ...
  }
}
```
Thật vi diệu đúng không nào, bằng cách này bạn có thể làm việc trực tiếp với Eloquent models của Laravel. Để làm được điều này, Laravel cần bạn chỉ định đúng thuộc tính `$primaryKey` trên `model` của bạn, mình sẽ làm như sau:
```
use Illuminate\Database\Eloquent\Model;

class Customer extends Model {
  protected $primaryKey = 'customerId';
}
```
Như bạn thấy, khi chỉ định được `$primaryKey` thì việc lấy data từ DB sẽ rất dễ dàng thông qua `Model binding` sẽ dễ dàng hơn rất dễ dàng và cải thiện đáng kể performance của dự án (len)

## 4. Centralized error handling
Có khi nào bạn phải check các error cho việc validation như trên chưa ?
```
use Validator;
use Session;

class NewsletterController extends Controller {
  public function store(Request $request) {
    $validator = new Validator($request->all(), [
      'email' => 'required|email'
    ]);

    if ($validator->fails) {
      return redirect()->back()->withInput()->withErrors($validator);
    }

    Session::flash('success', 'We publish each week so stay tuned!');

    return redirect()->route('newsletter.success');
  }
}
```
Như mình đã đề cập ở đầu bài, thì việc xử lý các error handling cũng như validation vậy. Việc config các `error` sẽ giúp bạn tăng khả năng xử lý các exceptions được bắn ra bởi các `Form Requests`. Để làm việc này các bạn cần vào file `app/Exceptions/Handler.php`
```
class Handler extends ExceptionHandler {
  public function report(Exception $exception) {
    // This is where you log to your error dashboard like Sentry, ...

    parent::report($exception);
  }

  public function render($request, Exception $exception) {
    // Here we manage errors globally
  }
}
```
Chúng ta sẽ customize việc xử lý error cho validation vào phương thức `render` như sau:
```
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler {
  public function report(Exception $exception) {
    // This is where you log to your error dashboard like Sentry, ...

    parent::report($exception);
  }

  public function render($request, Exception $exception) {
    if ($exception instanceof ValidationException) {
      return redirect()->back()->withInput()->withErrors($exception->errors());
    }
  }
}
```
Bạn cũng có thể quản lý các lỗi điều hướng và AJAX trong cùng một lúc như sau:
```
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler {
  public function report(Exception $exception) {
    // This is where you log to your error dashboard like Sentry, ...

    parent::report($exception);
  }

  public function render($request, Exception $exception) {
    // The request have a "Accept: application/json"
    // This is an AJAX request
    if ($request->wantsJson()) {
      if ($exception instanceof ValidationException) {
        return response()->json($exception->errors(), 400);
      }
    }
    // This is a normal form validation 
    else {
      if ($exception instanceof ValidationException) {
        return redirect()->back()->withInput()->withErrors($exception->errors());
      }      
    }
  }
}
```
Thật vi diệu đúng không nào :v:

## 5. Collections... collections everywhere
Một điều tiếc nuối ở PHP đó chính là sự thiếu hụt về OOP, nhưng javascript lại rất tuyệt vời với POP.
```
const popularPosts = posts.filter(post => post.views > 5000)->map(post => post.title);
```
Trong Laravel, một trong những tính năng tuyệt vời nhất của nó đó chính là `Collections`.  Do đó, `eloquent models` trở nên rất tiện dụng và chúng ta có thể sử dụng nó một cách linh hoạt.
```
use App\Post;

$popularPosts = Post::all()->filter(function($post) { 
  return $post->views > 5000;
})->map(function($post) {
  return $post->title;
});
```
Bạn thậm chí có thể sử dụng nó bên ngoài Eloquent như :
```
$menus = [
  [ 'placement' => 'left', 'text' => 'Home' ],
  [ 'placement' => 'left', 'text' => 'About us' ],
  [ 'placement' => 'right', 'text' => 'Contact' ]
];

$rightMenus = collect($menus)->filter(function($menu) {
  return $menu['placement'] === 'right';
});
```
Các bạn đã thấy vì sao `Collections` vì sao được ưa dùng đến như vậy rồi đấy (ahihi)

## 6. Factorize your routes with resources
Mình không biết bạn đã gặp vấn đề này lần nào chưa, chưa khi mình xây dựng một web app, thì `routes/web.php` của tôi đôi lúc nó sẽ trông loằn ngoằng như thế này:
```
// routes/web.php

Route::get('/customer', 'CustomerController@index');
Route::get('/customer/create', 'CustomerController@create');
Route::get('/customer/{id}', 'CustomerController@show');
Route::get('/customer/{id}/edit', 'CustomerController@edit');
Route::get('/customer/{id}/delete', 'CustomerController@delete');
Route::get('/customer/{id}/phone', 'CustomerPhoneController@index');
Route::get('/customer/{id}/phone/create', 'CustomerPhoneController@create');
Route::get('/customer/{customerId}/phone/{phoneId}', 'CustomerPhoneController@show');
Route::get('/customer/{customerId}/phone/{phoneId}/edit', 'CustomerPhoneController@edit');

Route::post('/customer', 'CustomerController@store');
Route::post('/customer/{id}/phone', 'CustomerPhoneController@store');

Route::put('/customer/{id}', 'CustomerController@update');
Route::put('/customer/{customerId}/phone/{phoneId}', 'CustomerPhoneController@update');

Route::delete('/customer/{id}', 'CustomerController@destroy');
Route::delete('/customer/{customerId}/phone/{phoneId}', 'CustomerPhoneController@destroy');
```
Vì thế, việc Factory lại `route` của bạn để nó trở nên ngắn gọn hơn là một điều rất cần thiết. Vì bạn không chỉ quản lý một `route` là `/customer` mà còn phải quản lý những `route` khác như `customer address`, `customer contract`,...

Hãy thử tưởng tượng  xem `route` bạn sẽ bao nhiêu ngàn line, chằng chịt nếu bạn cứ viết như vậy (sohai)

Nên để Factory cho việc này, Laravel cung cấp cho chúng ta một thử gọi là [Resources controllers](https://laravel.com/docs/5.1/controllers#restful-resource-controllers)
```
// routes/web.php

Route::resource('customer', 'CustomerController');
Route::resource('customer.phone', 'CustomerPhoneController');
```
Rất nhanh gọn và nguy hiểm đúng không ạ :v: Resources làm việc bằng cách tự động binding đối số đầu tiên với 4 phương thức HTTP phổ biến. Bạn có thể check lại các route thông qua lệnh `php artisan route:list`.

Việc tạo `resources` này cũng rất đơn giản, Laravel đã cung cấp cho các bạn lệnh tạo các `resources` thông qua artisan như sau:
```
php artisan make:controller CustomerController --resource
```
Sau khi thực hiện thì chúng ta sẽ có một Resources controller với các methods dưới :
```
// app/Http/Controllers/CustomerController.php

use Illuminate\Http\Request;

class CustomerController extends Controller
{
  public function index() {}

  public function create() {}

  public function store(Request $request) {}

  public function show($id) {}

  public function edit($id) {}

  public function update(Request $request, $id) {}

  public function destroy($id) {}
}
```
Và khi bạn tạo một Model, bạn cũng có thể tạo liên kết Controller liên quan của nó trong resource mode như sau:
```
php artisan make:model Customer --resource --controller
```
Và chúng ta sẽ có một Controller tương ứng như sau:
```
// app/Http/Controllers/CustomerController.php

use App\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
  public function index() {}

  public function create() {}

  public function store(Request $request) {}

  public function show(Customer $customer) {}

  public function edit(Customer $customer) {}

  public function update(Request $request, Customer $customer) {}

  public function destroy(Customer $customer) {}
}
```
Quá ngon với những gì mà `Resources controller` đem lại :v:

## 7. Lean code with mutators
Thỉnh thoảng, bạn muốn hiển thị cả `họ và tên` của một `khách hàng`, nhưng trong DB của bạn lại tách biệt 2 `field` này ra và bạn phải hiển thị như sau :
```
<!-- resources/views/customer/show.blade.php -->

@extends('layout/logged')
@section('content')
  <h1>viewing customer {{ $customer->firstName }} {{ $customer->lastName }}</h1>
@endsection
```
Hmm, hơi củ chuối nhỉ ?? Vậy có cách nào xử lý triệt để vấn đề này không? Câu trả lời là có và rất đơn giản đối với Mutators :v:

Mutators sẽ giúp bạn trừu tượng hóa các business logic một cách nhanh chóng như sau.
```
// app/Customer.php

use Illuminate\Database\Eloquent\Model;

class Customer extends Model {
  protected $table = 'customer';

  public function getNameAttribute() {
    return "{$this->firstName} {$this->lastName}";
  }
}
```
Để có quyền truy cập vào thuộc tính `$customer-> name`, bạn cần tạo một function như trên, function mà bạn tạo phải có format 
```
public function get<yourattribute>Attribute() {}
```
Laravel sẽ cung cấp cho bạn thuộc tính này khi dùng với Eloquent và bạn có thể gọi nó dễ dàng trong `blade` :
```
<!-- resources/views/customer/show.blade.php -->

@extends('layout/logged')
@section('content')
  <h1>{{ $customer->name }}</h1>
@endsection
```

Tốt hơn nữa, bạn cũng có thể `cast` dữ liệu từ DB. Hãy tưởng tượng, bạn muốn khách hàng có đồng ý nhận tin tức mới hay không,  thì trong DB sẽ lưu một trường là `wantsNewsletter` với kiểu dữ liệu là `boolean`. 

Thì như các bạn đã biết, trong MySQL không tồn tại kiểu dữ liệu `boolean` , vì vậy chúng ta phải mô phỏng trường `wantsNewsletter` như bên dưới :
```
wantsNewsletter TINYINT(1) NOT NULL DEFAULT 0
```
0 là `false`, 1 là `true`. Trong eloquent model, Laravel cho phép chúng ta có thể cast dữ liệu sang kiểu boolean như sau:
```
// app/Customer.php

use Illuminate\Database\Eloquent\Model;

class Customer extends Model {
  protected $table = 'customer';
  protected $casts = [
    'wantsNewsletter' => 'boolean'
  ];

  public function getNameAttribute() {
    return "{$this->firstName} {$this->lastName}";
  }
}
```
Với việc cast như trên thì bạn có thể yên tâm sử dụng toán tử `===` để thực hiện việc so sánh của mình rồi :D thật tiện lợi đúng không nào :v: 
```
// app/Console/Commands/SendNewsletter.php

use Illuminate\Console\Command;
use App\Mail\NewsletterMail;
use App\Customer;

class SendNewsletter extends Command {
  protected $signature = 'newsletter:send';

  public function handle() {
    $customers = Customer::all();

    $customers = $customers->filter(function($customer) {
      $customer->wantsNewseletter === true;
    });

    foreach($customers as $customer) {
      Mail::to($customer->email)->send(new NewsletterMail($customer));
    }
  }
}
```

## Tổng kết
Trên đây là những mẹo giúp bạn có thể cải thiện việc code của mình, giúp cho code của bạn có thể tái sử dụng tốt hơn, nâng cao được hiệu suất công việc cũng như việc bảo trì sau này. Hy vọng bài viết này sẽ đem đến cho bạn điều đó ^^

Bài viết được tham khảo và dịch từ https://dev.to/khalyomede/7-tips-to-stay-productive-with-laravel-964 nên nếu có những chỗ không đúng hay không sát lắm thì các bạn comment cho mình biết để mình sửa nhé.

Cảm ơn các bạn đã theo dõi bài viết, hẹn gặp lại các bạn vào bài viết tiêp theo :D

## Tham khảo
https://dev.to/khalyomede/7-tips-to-stay-productive-with-laravel-964