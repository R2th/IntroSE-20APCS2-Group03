Các dự án dựa trên API đang ngày càng phổ biến và chúng khá dễ tạo ra trong Laravel. Nhưng một chủ đề nhỏ được nói đến - đó là cách xử lý lỗi cho các ngoại lệ khác nhau. Những khách hàng dùng API thường phàn nàn rằng họ nhận được “Server error” nhưng không có nội dung bị lỗi là gì. Vậy, làm thế nào để xử lý lỗi API một cách duyên dáng? Làm thế nào để trả lại chúng ở dạng dễ đọc
## Main Goal: Status Code + Message dễ đọc
Mọi request API trả về đều có status code, đối với các request thành công, nó thường là 200 hoặc 2xx với XX là số khác.

Nếu bạn trả về response lỗi, nó sẽ không chứa mã 2xx, đây là những lỗi phổ biến nhất:
![](https://images.viblo.asia/b1f1a17c-6a3d-464e-b21b-dd75b7a8bc4f.png)

Lưu ý, nếu chúng ta không chỉ định mã xác nhận trả về, thì Laravel sẽ tự động làm điều đó và điều đó có thể không chính xác. Vì vậy, nên chỉ định mã một cách chính xác nhất có thể.

Cách tốt nhất, nội dung thông báo lỗi nên chi tiết hơn, để giúp người dùng API xử lý lỗi dễ dàng hơn . Dưới đây, một ví dụ về cách API Facebook trả về lỗi:
```php
{
  "error": {
    "message": "Error validating access token: Session has expired on Wednesday, 14-Feb-18 18:00:00 PST. The current time is Thursday, 15-Feb-18 13:46:35 PST.",
    "type": "OAuthException",
    "code": 190,
    "error_subcode": 463,
    "fbtrace_id": "H2il2t5bn4e"
  }
}
```
Thông thường, nội dung của error được hiển thị ở trên browser hoặc mobile app. Đó là thứ mà con người đọc được, do đó chúng ta cần phải quan tâm đến điều đó rõ ràng và chi tiết hơn.

Các cách tạo nên API errors tốt hơn
## Tip 1. Đặt APP_DEBUG=false ngay cả trên Local
Một cài đặt quan trọng trong file .*env* của Laravel - đó là ***APP_DEBUG*** có thể *true* hoặc *false*.
Nếu APP_DEBUG=true, tất cả error sẽ được hiển thị chi tiết như tên class, các bảng db, v.v.
![](https://images.viblo.asia/bca03e71-38a7-48da-8c63-0b5d9a18f425.png)
Đây là vấn đề bảo mật rất lớn, vì vậy trong môi trường product, Laravel khuyên bạn nên đặt là *false*.
Tuy nhiên chúng ta nên tắt nó trong khi làm project về API, vì khi đó chúng ta sẽ chỉ nhận được thông báo "Server error", từ đó ta buộc phải suy nghĩ làm thế nào để xử lý nó và sẽ tạo những message thông báo lỗi hữu ích hơn từ API
## Tip 2. Route không tồn tại – Fallback Method
Lỗi này xảy ra khi 1 ai đó gọi 1 route API không tồn tại, có thể là do nhập sai tên lên đường dẫn url. Mặc định API trả về thông báo:
```php
Request URL: http://test/api/v1/offices
Request Method: GET
Status Code: 404 Not Found
{
    "message": ""
}
```
Nó có vẻ OK với status code là 404. 

Tuy nhiên ta có thể tạo ra 1 message giải thích lỗi chi tiết hơn. Khi đó ta sẽ dùng method ***Route::fallback()*** trong ***routes/api.php***, định tuyến sẽ xử lý tất cả cách route không tồn tại
```php
Route::fallback(function(){
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact info@website.com'], 404);
});
```
Kết quả sẽ là 404, nhưng bây giờ với thông báo lỗi cung cấp thêm một số thông tin về những việc cần làm với lỗi này.
## Tip 3. Override 404 ModelNotFoundException
Một trong những trường hợp ngoại lệ thường gặp nhất là không tìm thấy đối tượng, lỗi này được ném vào trong ***Model::findOrFail($id)*** . Khi đó API sẽ hiển thị:
```php
{
    "message": "No query results for model [App\\Office] 2",
    "exception": "Symfony\\Component\\HttpKernel\\Exception\\NotFoundHttpException",
    ...
}
```
Nó chính xác, nhưng không phải là "pretty message" để hiển thị cho người dùng cuối. Do đó, chúng ta nên ghi đè xử lý cho các exception cụ thể.

Chúng ta có thể làm điều đó trong ***app/Exceptions/Handler.php*** , trong phương thức ***render()*** :
```php
use Illuminate\Database\Eloquent\ModelNotFoundException;

// ...

public function render($request, Exception $exception)
{
    if ($exception instanceof ModelNotFoundException) {
        return response()->json([
            'error' => 'Entry for '.str_replace('App\\', '', $exception->getModel()).' not found'], 404);
    }

    return parent::render($request, $exception);
}
```
Chúng ta có thể bắt bất kỳ số lượng exception trong method này. Trong trường hợp này, chúng ta đã trả lại cùng một mã 404 nhưng với một thông báo dễ đọc hơn như thế này:
```php
{
    "error": "Entry for Office not found"
}
```
**Note**: ***$exception->getModel()*** để lấy ra Model bị lỗi
## Tip 4. Bắt càng nhiều càng tốt trong Validation
Đối với API việc validate cho các request là rất hữu dụng để chúng ta biết được lỗi nằm ở đâu, đó là lỗi gì. 

Ví dụ trong hàm ***store()*** trong controller, ta có:
```php
public function store(StoreOfficesRequest $request)
{
    $office = Office::create($request->all());
    
    return (new OfficeResource($office))
        ->response()
        ->setStatusCode(201);
}
```
Và trong file ***app/Http/Requests/StoreOfficesRequest.php*** ta có 2 rule:
```php
public function rules()
{
    return [
        'city_id' => 'required|integer|exists:cities,id',
        'address' => 'required'
    ];
}
```
Nếu chúng ta bỏ qua cả hai tham số đó và đặt các giá trị là rỗng, API sẽ trả về một error khá dễ đọc với mã trạng thái 422 
```php
{
    "message": "The given data was invalid.",
    "errors": { 
        "city_id": ["The city id must be an integer.", "The city id field is required."],
        "address": ["The address field is required."]
    }
}
```
Như ta có thể thấy, nó liệt kê tất cả trường bị lỗi, không chỉ lỗi đầu tiên được bắt.

Bây giờ nếu chúng ta không validate cho các request thì API sẽ hiển thị như sau:
```php
{
    "message": "Server Error"
}
```
Như này ta sẽ không biết được lỗi nằm ở đâu để giải quyết.
## Tip 5. Tránh lỗi 500 Server Error với try-catch
>  Lỗi này sẽ xuất hiện trong trường hợp server trang web bạn đang cố gắng truy cập bị lỗi, server không thể xác định chính xác vấn đề hoặc do có quá nhiều người truy cập vào trang đó cùng thời điểm với bạn, do file .htaccess bị lỗi... 
>  
Hãy tưởng tượng đoạn code sau trong Controller:
```php
public function store(StoreOfficesRequest $request)
{
    $admin = User::find($request->email);
    $office = Office::create($request->all() + ['admin_id' => $admin->id]);
    (new UserService())->assignAdminToOffice($office);
    
    return (new OfficeResource($office))
        ->response()
        ->setStatusCode(201);
}
```
Đây là ví dụ hư cấu, nhưng khá thực tế. Tìm kiếm user bằng email, sau đó tạo 1 bản ghi, thực hiện hành động gì đó với bản ghi đó. Và trong bất kỳ bước nào, cũng có thể có lỗi xảy ra. Email có thể trống, không thể tìm thấy Admin (hoặc tìm thấy sai Admin) hoặc server lỗi , v.v.

Khi đó ta nên sử dụng ***try-catch*** để bắt các lỗi ngoại lệ này:
```php
try {
    $admin = User::find($request->email);
    $office = Office::create($request->all() + ['admin_id' => $admin->id]);
    (new UserService())->assignAdminToOffice($office);
} catch (ModelNotFoundException $ex) { // User not found
    abort(422, 'Invalid email: administrator not found');
} catch (Exception $ex) { // Anything that went wrong
    abort(500, 'Could not create office or assign it to administrator');
}
```
Hàm ***abort()*** được gọi bất cứ lúc nào và thêm một thông báo lỗi mà chúng ta muốn. Nếu chúng ta làm điều đó trong mọi (hoặc phần lớn)  controller , thì API sẽ trả về 500 tương tự như “Server error”, nhưng với các thông báo lỗi dễ nhìn hơn.

## Tip 6. Xử lý lỗi API của bên thứ 3 bằng cách bắt ngoại lệ
Ngày nay, dự án web sử dụng rất nhiều API của bên thứ 3 và chúng cũng có thể gây lỗi. 

Ví dụ, get dữ liệu từ Guzzle
```php
$client = new \GuzzleHttp\Client();
$response = $client->request('GET', 'https://api.github.com/repos/guzzle/guzzle123456');
// ... Do something with that response
```
Như ta có thể thấy, URL Github không hợp lệ và repos này không tồn tại. Nếu viết như trên API sẽ lại trả về lỗi “Server error” không rõ ràng gì cả.
Khi đó ta nên viết lại như sau:
```php
use GuzzleHttp\Exception\RequestException;

// ...

try {
    $client = new \GuzzleHttp\Client();
    $response = $client->request('GET', 'https://api.github.com/repos/guzzle/guzzle123456');
} catch (RequestException $ex) {
    abort(404, 'Github Repository not found');
}
```
## Tip 6.1. Tự tạo Exception
Chúng ta có thể tự tạo Exception để bắt lỗi API của bên thứ 3
```
php artisan make:exception GithubAPIException
```
Khi đó file ***app/Exceptions/GithubAPIException.php*** sẽ được tạo ra
```php
namespace App\Exceptions;

use Exception;

class GithubAPIException extends Exception
{
    public function render()
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', 'https://api.github.com/repos/guzzle/guzzle123456');
        } catch (RequestException $ex) {
            throw new GithubAPIException('Github API failed in Offices Controller');
        }
    }
}
```
Không chỉ vậy - Ta có thể chuyển việc xử lý lỗi đó vào file ***app/Exceptions/Handler.php***  (xem lại Tip 3) làm việc đó
```php
public function render($request, Exception $exception)
{
    if ($exception instanceof ModelNotFoundException) {
        return response()->json(['error' => 'Entry for '.str_replace('App\\', '', $exception->getModel()).' not found'], 404);
    } else if ($exception instanceof GithubAPIException) {
        return response()->json(['error' => $exception->getMessage()], 500);
    } else if ($exception instanceof RequestException) {
        return response()->json(['error' => 'External API call failed.'], 500);
    }

    return parent::render($request, $exception);
}
```

**Nguồn**: https://laraveldaily.com/laravel-api-errors-and-exceptions-how-to-return-responses/