Các dự án dựa trên API ngày càng phổ biến và chúng khá dễ tạo trong Laravel. Nhưng một chủ đề ít được nói đến đó là cách xử lý lỗi (errors) đối với các trường hợp ngoại lệ (exception) khác nhau. Người dùng API thường phàn nàn rằng họ nhận được "Server error" nhưng không nhận được message có giá trị. Vậy, làm thế nào để xử lý API errors một cách duyên dáng?

<br>

### Main Goal: Status Code + Readable Message

Đối với API, lỗi chính xác thậm chí còn quan trọng hơn so với các dự án web chỉ dành cho trình duyệt. Giống như mọi người, chúng ta có thể hiểu lỗi được thông báo từ trình duyệt và sau đó quyết định phải làm gì, nhưng đối với API - chúng thường được sử dụng bởi các phần mềm khác chứ không phải bởi mọi người, do đó, kết quả trả về nên có thể đọc được bởi các máy. Và điều đó có nghĩa là các HTTP status code.

Mỗi request từ API trả về một status code, với các request success, nó thường là 200 hoặc 2xx với XX là số khác.

Nếu bạn trả về error response, nó sẽ không chứa mã 2xx, đây là những lỗi phổ biến nhất:

| Status | Code	Meaning |
| -------- | -------- |
| 404	| Not Found (page or other resource doesn’t exist) |
| 401	| Not authorized (not logged in) |
| 403	| Logged in but access to requested area is forbidden |
| 400	| Bad request (something wrong with URL or parameters) |
| 422	| Unprocessable Entity (validation failed) |
| 500	| General server error |

<br>

Lưu ý rằng nếu chúng ta không chỉ định status code trả về, thì Laravel sẽ tự động làm điều đó cho chúng ta và điều đó có thể không chính xác. Vì vậy, nên chỉ định code bất cứ khi nào có thể.

Thêm vào đó, chúng ta cần quan tâm đến những **human-readable messages**. Vì vậy, response tốt điển hình nên chứa HTTP error code và JSON kết quả trả về với nội dung như sau:

```
{
    "error": "Resource not found"
}
```

Lý tưởng nhất, nó nên chi tiết hơn nữa để giúp người sử dùng API xử lý lỗi. Dưới đây, một ví dụ về cách API Facebook trả về lỗi:

```
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

Thông thường, nội dung "error" là nội dung được hiển thị trở lại trình duyệt hoặc ứng dụng di động. Vì vậy, những gì sẽ được đọc bởi con người, chúng ta cần làm cho nó trở nên rõ ràng và với càng nhiều chi tiết cần thiết càng tốt.

Bây giờ, hãy để đến với các tips thực sự về cách làm cho các API error tốt hơn.

### Tip 1. Switch APP_DEBUG=false Even Locally

Có một setting quan trọng trong file ```.env``` của Laravel - đó là ```APP_DEBUG``` có thể ```true``` hoặc ```false```.

Nếu bạn set nó thành ```true```,  thì tất cả các errors của bạn sẽ được hiển thị một cách chi tiết, bao gồm tên của các class, DB tables, ...

![](https://images.viblo.asia/7273e2ca-a19c-40e4-a1c4-156102465e89.png)

Đây là một vấn đề lớn về bảo mật, vì vậy trong môi trường production, bạn nên set biến này thành ```false```.

Nhưng tôi khuyên bạn nên tắt nó cho các dự án API ngay cả trên môi trường local, đây là lý do tại sao:

Bằng cách tắt các errors thực tế, bạn sẽ bị buộc phải suy nghĩ như người sử dụng API, người sẽ chỉ nhận được "Server errors" và không có thêm thông tin. Nói cách khác, bạn sẽ buộc phải suy nghĩ cách xử lý lỗi và cung cấp các thông báo hữu ích từ API.

### Tip 2. Unhandled Routes – Fallback Method

Tình huống đầu tiên - điều gì sẽ xảy ra nếu ai đó gọi API route không tồn tại, nó thực sự có thể khả thi nếu ai đó thậm chí đã mắc lỗi đánh máy trong URL. Theo mặc định, bạn nhận được phản hồi này từ API:

```
Request URL: http://q1.test/api/v1/offices
Request Method: GET
Status Code: 404 Not Found
{
    "message": ""
}
```

Và đó là thông báo OK-ish, ít nhất mã 404 được truyền chính xác. Nhưng bạn có thể làm một công việc tốt hơn và giải thích error với một số messages.

Để làm điều đó, bạn có thể chỉ định phương thức ```Route::fallback()``` ở cuối file ```routes/api.php```, xử lý tất cả các routes không chính xác.

```
Route::fallback(function(){
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact info@website.com'], 404);
});
```

Kết quả sẽ tương tự với 404 response, nhưng bây giờ với error message cung cấp thêm một số thông tin về những việc cần làm với lỗi này.

### Tip 3. Override 404 ModelNotFoundException

Một trong những trường hợp Exception thường gặp nhất là "model object is not found", thường được thrown bởi ```Model::findOrFail($id)```. Nếu chúng ta để nó ở đó, thì message điển hình mà API của bạn sẽ hiển thị:

```
{
    "message": "No query results for model [App\\Office] 2",
    "exception": "Symfony\\Component\\HttpKernel\\Exception\\NotFoundHttpException",
    ...
}
```

Nó đúng, nhưng không phải là một message tốt để hiển thị cho end user, phải không? Do đó, lời khuyên của tôi là ghi đè xử lý cho Exception cụ thể đó.

Chúng ta có thể làm điều đó trong ```app/Exceptions/Handler.php``` (hãy nhớ file đó, chúng ta sẽ quay lại nó nhiều lần sau), trong phương thức ```render()```:

```
// Don't forget this in the beginning of file
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

Chúng ta có thể ```catch``` bất kỳ số lượng ```Exception``` nào trong method này. Trong trường hợp này, chúng ta đã trả lại cùng một 404 code nhưng với một message dễ đọc hơn như thế này:

```
{
    "error": "Entry for Office not found"
}
```

**Lưu ý:** bạn có biết một phương thức thú vị```$exception->getModel()``` không? Có rất nhiều thông tin rất hữu ích mà chúng ta có thể nhận được từ object ```$exception```, ở đây, một ảnh chụp màn hình từ PhpStorm auto-complete:

![](https://images.viblo.asia/0b31665c-fb95-427f-9b63-242a4362f6f5.png)

### Tip 4. Catch As Much As Possible in Validation

Trong các project điển hình, các developer không phá vỡ các validate rules, chủ yếu gắn bó với các quy tắc đơn giản như, ```required```, ```date```, ```email```, ... . Nhưng đối với các API, nó thực sự là nguyên nhân gây ra lỗi điển hình nhất - đó là người sử dụng post dữ liệu không hợp lệ và sau đó bị hỏng.

Nếu chúng tôi không đặt thêm effort vào việc catching bad data, thì API sẽ vượt qua xác thực phía back-end và chỉ throw lỗi đơn giản "Server error" mà không có bất kỳ chi tiết nào.

Chúng ta hãy xem ví dụ này - chúng ta có một phương thức ```store()``` trong Controller:

```
public function store(StoreOfficesRequest $request)
{
    $office = Office::create($request->all());
    
    return (new OfficeResource($office))
        ->response()
        ->setStatusCode(201);
}
```

File FormRequest của chúng ta ```app/Http/Requests/StoreOffericesRequest.php``` chứa hai rules:

```
public function rules()
{
    return [
        'city_id' => 'required|integer|exists:cities,id',
        'address' => 'required'
    ];
}
```

Nếu chúng ta bỏ lỡ cả hai tham số đó và chuyển các giá trị trống ở đó, API sẽ trả về một lỗi khá dễ đọc với status code là 422 (mã này được tạo theo mặc định của Laravel validation failure):

```
{
    "message": "The given data was invalid.",
    "errors": { 
        "city_id": ["The city id must be an integer.", "The city id field is required."],
        "address": ["The address field is required."]
    }
}
```

Như bạn có thể thấy, nó liệt kê tất cả các fields error, cũng đề cập đến tất cả các errors cho từng field, không chỉ lỗi đầu tiên được bắt.

Bây giờ, nếu chúng ta không chỉ định các validate rules đó và cho phép vượt qua validate, thì đây là API trả về:

```
{
    "message": "Server Error"
}
```

Là nó. "Server error". Không có thông tin hữu ích khác về những gì đã sai, field nào bị thiếu hoặc không chính xác. Vì vậy, người sử dụng API sẽ không biết phải làm gì.

Vì vậy, tôi sẽ lặp lại quan điểm của mình ở đây - làm ơn, hãy cố gắng nắm bắt càng nhiều tình huống càng tốt trong các validate rules. Kiểm tra sự tồn tại của field, loại của nó, giá trị min-max, duplicate, ...

### Tip 5. Generally Avoid Empty 500 Server Error with Try-Catch

Tiếp tục với ví dụ trên, các empty error là điều tồi tệ nhất khi sử dụng API. Nhưng thực tế khắc nghiệt là bất cứ điều gì có thể sai, đặc biệt là trong các dự án lớn, vì vậy chúng ta không thể khắc phục hoặc dự đoán các lỗi ngẫu nhiên.

Mặt khác, chúng ta có thể ```catch``` chúng! Với [Try catch PHP block](https://stackify.com/php-try-catch-php-exception-tutorial/).

Hãy tưởng tượng Controller code này:

```
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

Nó là một ví dụ hư cấu, nhưng khá thực tế. Tìm kiếm một user bằng email, sau đó tạo record, sau đó thực hiện một cái gì đó với record đó. Và trên bất kỳ step nào, một cái gì đó sai có thể xảy ra. Email có thể trống, không thể tìm thấy admin (hoặc tìm thấy admin sai), phương thức service có thể gây ra bất kỳ lỗi hoặc exception nào khác, ...

Có nhiều cách để xử lý và sử dụng try-catch, nhưng một trong những cách phổ biến nhất là chỉ có một try-catch lớn, với các trường hợp ngoại lệ khác nhau:

```
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

Như bạn có thể thấy, chúng ta có thể gọi ```abort()``` bất cứ lúc nào và thêm một error message mà chúng ta muốn. Nếu chúng ta làm điều đó trong mọi Controller (hoặc phần lớn trong số chúng), thì API của chúng ta sẽ trả về 500 tương tự như "Server error", nhưng với nhiều hơn  actionable error messages.

### Tip 6. Handle 3rd Party API Errors by Catching Their Exceptions

Ngày nay, dự án web sử dụng rất nhiều API bên ngoài và chúng cũng có thể fail. Nếu API của họ tốt, thì họ sẽ cung cấp một cơ chế exception và error thích hợp (trớ trêu thay, đó là một điểm của toàn bộ bài viết này), vì vậy hãy để sử dụng nó trong các app của chúng ta.

Ví dụ, hãy để Guzzle curl request đến  một số URL và catch exception.

Code đơn giản:
```
$client = new \GuzzleHttp\Client();
$response = $client->request('GET', 'https://api.github.com/repos/guzzle/guzzle123456');
// ... Do something with that response
```

Như bạn có thể thấy, Github URL không hợp lệ và repository  này không tồn tại. Và nếu chúng ta để lại code như vậy, API của chúng ta sẽ throw .. đoán xem .. Yup,  “500 Server error” không có chi tiết nào khác. Nhưng chúng ta có thể bắt exception và cung cấp thêm chi tiết cho người sử dụng:

```
// at the top
use GuzzleHttp\Exception\RequestException;

// ...

try {
    $client = new \GuzzleHttp\Client();
    $response = $client->request('GET', 'https://api.github.com/repos/guzzle/guzzle123456');
} catch (RequestException $ex) {
    abort(404, 'Github Repository not found');
}
```

### Tip 6.1. Create Your Own Exceptions

Chúng ta thậm chí có thể tiến thêm một bước và tạo exception của riêng mình, liên quan cụ thể đến một số lỗi API của bên thứ 3.

```
php artisan make:exception GithubAPIException
```

Sau đó, file mới được tạo của chúng ta ```app/Exceptions/GithubAPIException.php``` sẽ giống như sau:

```
namespace App\Exceptions;

use Exception;

class GithubAPIException extends Exception
{

    public function render()
    {
        // ...
    }

}
```

Chúng ta thậm chí có thể để trống, nhưng vẫn throw nó như một exception. Ngay cả tên exception cũng có thể giúp người dùng API tránh các lỗi trong tương lai. Vì vậy, chúng ta làm điều này:

```
try {
    $client = new \GuzzleHttp\Client();
    $response = $client->request('GET', 'https://api.github.com/repos/guzzle/guzzle123456');
} catch (RequestException $ex) {
    throw new GithubAPIException('Github API failed in Offices Controller');
}
```

Không chỉ vậy - chúng ta có thể chuyển việc xử lý lỗi đó thành file ```app/Exceptions/Handler.php```. Như thế này:

```
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

**Tài liệu:** https://laraveldaily.com/laravel-api-errors-and-exceptions-how-to-return-responses/