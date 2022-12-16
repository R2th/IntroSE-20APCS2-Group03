# Giới thiệu
Chào mọi người, đối với một lập trình viên việc giao tiếp bên thứ ba là một phần không thể thiếu đối với chúng ta, chúng giúp ta giảm thiểu rất nhiều thời gian, công sức và tiền bạc. Giải quyết những công việc được giao một cách nhanh chóng thay vì chúng ta mất hàng giờ hàng ngày để làm nhiệm vụ đó.

Nhân cơ hội này mình xin giới thiệu một số công cụ hay thư viện mình hay dùng và hay nghĩ đến nó mỗi khi nhắc đến việc giao tiếp bên thứ ba.
*  cURL
*  Guzzle

Ok cùng mình bắt đầu tìm hiểu nhé! !!
# cURL
## cURL là gì 
cURL là một thư viện cho phép bạn gửi nhận thông tin bằng cú pháp URL, nó cho phép bạn kết nối nhiều loại máy chủ và nhiều loại giao thức khác nhau ngoài HTTP, HTTPS nó còn hỗ trợ cả FPT, gopher, telnet ...

Đối với giao thức HTTP, cURL hỗ trợ việc gửi dữ liệu  sử dụng các phương thức hiện có như GET,POST, PUT,PATCH ... vịệc xác thực có thể được thực hiện thông qua việc thiết lập header cho request.
## Cài đặt cURL
Việc cài đặt cũng khá đơn giản hoặc thậm trí bạn cũng không cần cài đặt khi bạn đã cài Xampp, hoặc có thể cài đặt php và cURL thông qua câu lệnh 

`sudo apt install php php-curl`

Do mình đã cài đặt rồi và đây là kết quả mình đã cài đặt :
![](https://images.viblo.asia/91c87517-9a10-469c-a85d-4d899abaa85f.png)

## Sử dụng cURL
### Setup
 - Mình sử dụng một trang web có tên https://www.mockapi.io/
 ![](https://images.viblo.asia/5214ee6f-7e85-4c85-9010-14a476364577.png)
 Trang web này cho phép bạn gọi và giao tiếp qua bên thứ ba miễn phí thay cho việc bạn cài đặt và xử lý tốn rất nhiều  thời gian tạo và xử lý dữ liệu.
 
 Dể bắt đầu sử dụng cURL mình sẽ thực hiện 4 bước : 
 * Khởi tạo cURL
 * cấu hình cURL
 *  thực thi,
 *   ngắt cURL 
 *    giải phóng dữ liệu.
 
 Ví dụ:
 ```
echo "demo cURL";

// khoi tao curl

$curl = curl_init();

// set cac thuoc tinh trong curl

curl_setopt_array($curl, [

   CURLOPT_URL =>"https://6077af6b1ed0ae0017d6b206.mockapi.io/user"
]);

// thuc thi cau lenh

$data = curl_exec($curl);
var_dump($data);

//ket thuc va giai phong curl

curl_close($curl); 
```
Trong phần này khá là dễ hiểu mình mong bạn chú đến lệnh `curl_setopt_array($curl, $array)`
câu lệnh này quan trọng curl để xử lý hoặc xác thực các dữ liệu với 
* tham số thứ nhất là đối tượng url
* tham số thứ hai là các option mà bạn cấu hình

Dưới đây là một số option mà mình nghĩ nó quan trọng:


| Option | Giải thích |
| -------- | -------- |
| CURLOPT_URL    | Gọi đến đường dẫn cần xử lý     |
| cURLOPT_TIMEOUT | Thiết lập thời gian tối đa của url |
| CURLOPT_HEADER|thiết lập true, false để lấy header trong đầu ra|
| CURLOPT_FILE | Thiết lập này kết quả sẽ được lưu vào file |
| CURL_HTTPHEADER | là một mảng của các trường trong HTTP HEADER |
| CURLOPT_CUSTOMEREQUEST | Thiếp lập phương thức  |
 
 Bạn có thể tham khảo ở website: https://www.php.net/manual/en/function.curl-setopt.php
###  Tiến hành CRUD đơn giản
#### Lấy dữ liệu
```
$curl = curl_init();
curl_setopt_array($curl, [
   CURLOPT_URL => 'https://6077af6b1ed0ae0017d6b206.mockapi.io/user'
])j
$data = curl_exec($curl);
var_dump($data);
curl_close($curl);
```
#### Thêm dữ liệu

```

$data = array("name" => "le dac khoan");
$json = json_encode($data);

$curl = $data = array("name" => "le dac khoan");
$json = json_encode($data);

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://6077af6b1ed0ae0017d6b206.mockapi.io/user',
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => $json,
    CURLOPT_RETURNTRANSFER => true,

]);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'content-type: application/json'
));

$result = curl_exec($curl);

var_dump($result);

curl_close($curl);
```
**Phần này mình lưu ý mọi người về `URL_HTTPHEADER` option này định nghĩa dữ liệu gửi đi của bạn, nó tùy thuộc vào dữ liệu gửi đi của bạn thì bạn sẽ set cho nó đúng định dạng**

Ví dụ :  
* content-type:application/json
 * content-type: text/html
####  Xóa dữ liệu
```
    $curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://6077af6b1ed0ae0017d6b206.mockapi.io/user/4',
    CURLOPT_CUSTOMREQUEST => 'DELETE',
    CURLOPT_RETURNTRANSFER => true
]);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'content-type: application/json'
]);

$data = curl_exec($curl);

var_dump($data);

curl_close($curl);
```
#### Cập nhập dữ liệu
```
$data = array("name" => "le dac khoan2");
$json = json_encode($data);

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://6077af6b1ed0ae0017d6b206.mockapi.io/user/22',
    CURLOPT_CUSTOMREQUEST => "PUT",
    CURLOPT_POSTFIELDS => $json,
    CURLOPT_RETURNTRANSFER => true,

]);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'content-type: application/json'
));

$result = curl_exec($curl);

var_dump($result);

curl_close($curl);
```
# Guzzle
## Guzzle là gì ?
Guzzle là một composer package được tích hợp sẵn trong một số famework hiện đại như : laravel, symfony ... .

Ngoài ra guzzle cũng là một HTTP client giúp việc gửi reuqest trở lên đơn giản và dễ dàng, bản mới nhất hiện tại là guzzle 7.
Một số lợi ích mà guzzle mang lại :
*  Guzzle có thể gửi cà yêu cầu đông bộ, và không đồng bộ.

*  Hỗ trợ đơn giản để tạo để tạo truy vấn như : post request, sử 

*  dụng http cookie, upload và dowload ảnh, gửi dữ liệu json, ...

*  Cho phép sử dụng các thư viện tiêu chuẩn psr-7

*  Hệ thống middleware cho phép bạn kiểm soát các hành vi của client

## Cài đặt Guzzle 
Vì guzzle là một package composer , bạn cần tải composer để tiếp tục cài đặt và phải sử dụng trong dự án của bạn .
<br>
Link cài đặt composer : https://tecadmin.net/install-php-composer-on-ubuntu/
Sau khi tiến hành cài đặt xong bạn chạy câu lệnh
```
composer require guzzlehttp/guzzle
```
Bạn có thể kiểm tra guzzle đã cài đặt thành công chưa ở file composer.json
![](https://images.viblo.asia/68c72917-4074-4527-b466-e806500ea3c2.png)
OK giờ đã cài xong giờ mình sẽ làm một CURD đơn giản nhất.
## Sử dụng guzzle 
### Setup

- Mình sẽ tạo class để setting một số thứ cơ bản để mỗi lần gọi bớt phải làm nhiều thao tác liên tuc cụ thể là :
```
namespace App\Client;

use GuzzleHttp\Client;

class Clients
{
    protected $client;

    function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://6077af6b1ed0ae0017d6b206.mockapi.io'
        ]);
    }

    public function client()
    {
        return $this->client;
    }
}
```
<br>
Ở đây mình đã đẻ base_uri để khi mỗi lần mình gọi không cần phải gửi đến một đường dẫn dài dài cho chúng. Ngoài ra bạn có thể cài đặt thêm một số option nữa mình nghĩ nó quan trọng với dự án.


| option |ý nghĩa |
| -------- | -------- |
| body     | Option này giúp bạn kiểm soát được nội dung của request, là các value bạn gửi đi(ví dụ post, path, put)     |
| timeout | Option này giới hạn thời gian của một request |
| headers | Option này cho phép bạn truyền nhiều các key value ở header mỗi request |
| form_params | Option này cho bạn gửi application/x-www-form-urlencoded POST request. |
<br>
còn rất nhiều option bạn có thể tham khảo qua ở website: https://docs.guzzlephp.org/en/stable/request-options.html

### Tiến hành CRUD đơn giản.
Trong file Web.php
```
Route::get('/', function () {
    return view('welcome');
});

Route::resource('/user', \App\Http\Controllers\UserController::class);

```

#### Lấy toàn bộ dữ liệu
```
public function index()
    {

        $result = $this->client->client()->get('/user');

        $users = json_decode($result->getBody());

        foreach($users as $user) {

            echo $user->name . "<br>";
        }
    }
```
#### Thêm dữ liệu
Tạo một file add.blade.php đơn giản:
```
<div class="container">
        <form method="post" action="{{ route('user.store') }}">
            @csrf
            <input type="text" name="name">
            <button type="submit"> Send </button>
        </form>
    </div>
```
Xử lý để tạo :
```
    public function create()
    {
        return view('add');
    }

    public function store(Request $request)
    {
        $result = $this->client->client()->post('/user', [
            'json' => [
                'name' => $request->name,
            ]
        ]);
        echo $result->getBody();
    }
```
#### xóa dữ liệu
```
    public function destroy($id)
    {
        $result = $this->client->client()->delete("/user/{$id}");
        
        echo $result->getBody();
    }
```
#### cập nhập dữ liệu
Tạo một file update.blade.php như trên.
```
<!DOCTYPE html>
<html>
<title>demo CRUD</title>
<body>
<div class="container">
    <form method="post" action="{{ route('user.update', $user->id) }}">
        @csrf
        <input type="text" name="name" value="{{ $user->name }}">
        <button type="submit"> Send </button>
    </form>
</div>
</body>
</html>
```
Phần xử lý của mình :
```
     public function edit($id)
    {
        $result = $this->client->client()->get("/user/{$id}");

        $user = json_decode($result->getBody());
        return view('update', compact('user'));
    }
    
    public function update(Request $request, $id)
    {
        $result = $this->client->client()->put("/user/{$id}", [
            'json' => [
                'name' => $request->name,
            ]
        ]);

        echo $result->getBody();
    }
```

## Tổng kết
* Theo đánh giá khách quan từ mình khi sử dụng hai công cụ trên, quả thật cURL nó hơi khó khăn đối với người mới bắt đầu như mình và mọi người đã làm quen với composer thì tốt nhất chúng ta nên dùng guzzle cho nhanh và tiện nhưng không vì thế mà chúng ta cứ làm khi không hiểu bản chất của nó.
* Bài viết của mình chỉ mang tính chất giới thiệu và sử dụng cơ bản, nếu có ý tưởng nào hay mong mọi người chia sẻ và cùng tìm hiểu với mình nhé.
* Cảm ơn các bạn đã quan tâm, nếu có gì chưa hiểu hoặc sai ở đâu có mình xin nhận mọi lời góp ý từ mọi người. Cảm ơn mọi người nhớ !!!! À tý quên câu chữ của mình hơi lủng củng có gì mọi người bỏ qua nhớ
* Link Tham khảo: 

https://viblo.asia/p/curl-va-cach-su-dung-trong-php-naQZRAXdKvx
https://docs.guzzlephp.org/en/stable/index.html

 https://hackernoon.com/creating-rest-api-in-php-using-guzzle-d6a890499b02
 
 https://artisansweb.net/use-guzzle-php-http-client-sending-http-requests/