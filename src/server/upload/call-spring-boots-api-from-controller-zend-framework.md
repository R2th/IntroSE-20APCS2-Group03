# Làm thế nào để gọi api từ spring boot ở zf2?
### * Các thư viện *
```
use Zend\Http\Request;
use Zend\Http\Client;
use Zend\Stdlib\Parameters;
```

### * Step 1 : Khởi tạo request 
`$request = new Request();`

### * Step 2 : Tạo header cho request vừa tạo
```
$request->getHeaders()->addHeaders(array(
    'Content-Type' => 'application/x-www-form-urlencoded; charset=UTF-8'
));
```

### * Step 3 : Tạo uri cho request vừa tạo
```
$uri = "http://.... "
$request->setUri($uri);
```

### * Step 4 : Tạo method ứng với api muốn gọi (vd : POST) 
`$request->setMethod('POST');`

### * Step 5 : Tạo các tham số cần chuyền (Với method POST)
`$request->setPost(new Parameters(array('someparam' => $somevalue)));`

### * Step 6 : Tạo client để dispatch request đó
```
$client = new Client();
$response = $client->dispatch($request);
```

### * Step 7 : Giải mã response data
`$data = json_decode($response->getBody(), true);`