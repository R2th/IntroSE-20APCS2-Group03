![](https://images.viblo.asia/5a6690bd-03ca-412f-ae8a-3ec669e84c4d.png)

## Tìm Hiểu Về HTTP Client
Khi ta truy cập một website và tương tác với các thành phần của website để gửi thông tin thì bản chất của việc đó là browser thay ta gửi đi các HTTP requests. Khi đó browser mà chúng ta đang dùng đóng vai trò một HTTP client.

![](https://images.viblo.asia/598ab999-830f-467b-a752-6ed2e01712c3.png)

Không chỉ có browser được đóng vai trò là HTTP client, bất kỳ phần mềm nào có thể gửi HTTP request và nhận được response từ HTTP server thì đều là HTTP client cả.
![](https://images.viblo.asia/7792fcf6-6d53-48f8-867e-b7412a08dfb1.png)
Với PHP, ta có thể viết những đoạn code để request đến server khác. Ứng dụng thực tiễn của PHP HTTP client rất nhiều.

## Guzzle Là Gì ?
Guzzle là một PHP HTTP client giúp việc gửi HTTP request trở lên đơn giản. Phiên bản mới nhất là Guzzle 6. Các lợi thế của Guzzle 6:
* Dễ dàng thực hiện tạo query string, POST request, streaming large upload, streaming large download, sử dụng HTTP cookies, upload dữ liệu Json....
* Có thể gửi cả request đồng bộ và không đồng bộ bằng cách sử dụng cùng một interface.
* Sử dụng tiểu chuẩn PSR-7 cho request, response, stream. Điều này giúp bạn dễ dàng tích hợp các thư viện khác sử dụng PSR-7 với Guzzle. (Các phiên bản trước không sử dụng PSR-7)
* Không phụ thuộc chặt vào cURL, PHP stream, sockets hoặc vòng lặp không bị chặn.
* Hệ thống Middleware cho phép bạn kiểm soát hành vi của client

## Cài Đặt Guzzle
Vì là một composer package nên bạn phải cài composer và tích hợp composer vào dự án của bạn đã, những framework hiện đại như Symfony và Laravel thì không cần vì chúng đã được tích hợp sẵn rồi. Tiếp theo là dùng lệnh sau để thêm Guzzle vào dự án:
```
composer require guzzlehttp/guzzle
```

## Test Một Số Request Bằng Guzzle
### Gửi Get request
```
public function getGuzzleRequest()
{
    $client = new \GuzzleHttp\Client();
    $request = $client->get('http://myexample.com');
    $response = $request->getBody();
   
    dd($response);
}
```
### Gửi POST request
```
public function postGuzzleRequest()
{
    $client = new \GuzzleHttp\Client();
    $url = "http://myexample.com/api/posts";
   
    $myBody['name'] = "Demo";
    $request = $client->post($url,  ['body'=>$myBody]);
    $response = $request->send();
  
    dd($response);
}
```
### Gửi PUT request
```
public function putGuzzleRequest()
{
    $client = new \GuzzleHttp\Client();
    $url = "http://myexample.com/api/posts/1";
    $myBody['name'] = "Demo";
    $request = $client->put($url,  ['body'=>$myBody]);
    $response = $request->send();
   
    dd($response);
}
```
### Gửi DELETE request
```
public function deleteGuzzleRequest()
{
    $client = new \GuzzleHttp\Client();
    $url = "http://myexample.com/api/posts/1";
    $request = $client->delete($url);
    $response = $request->send();
  
    dd($response);
}
```

## Tổng Kết
Việc dùng thư viện sẽ giúp bạn tiết kiệm được kha khá thời gian và tránh được nhiều lỗi không đáng có. Tuy vậy, nó vẫn có nhược điểm cho nên đừng lạm dụng quá.

Thứ nhất là làm cho bạn phụ thuộc vào thư viện, thứ hai là làm tăng độ cồng kềnh của dự án. Chỉ cần maintainer thư viện đó lỡ tay release một bản lỗi thôi là dự án bạn cũng lỗi theo, hoặc là cả một project của bạn chỉ có một chỗ gọi HTTP GET request đơn giản nhưng bạn lại cài cả một thư viện to uỳnh vào là không cần thiết.