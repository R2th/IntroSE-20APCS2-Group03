# 1. Lời nói đầu:
Vậy thế nào là gọi api bên thứ 3. Các bạn có thể hiểu với một số chức năng đã được code sẵn, xử lý, tối ưu ..., việc của chúng ta là đọc hiểu xem nó thực hiện công việc gì, và đảm bảo cung cấp những input mà nó cần. Có đôi khi phải custom, ghi đè để phù hợp với tính chất công việc, nhưng thường thì trường hợp này rất ít xảy ra. Nói chung các bạn có thể hiểu đơn giản, họ đã xử lý nó trước cho bạn rồi, việc của bạn là đọc hiểu và truyền vào đúng input mà thôi và bạn sẽ có một output như họ đã cam kết.

# 2. Guzzle là gì:
Theo document thì: 
```
Guzzle is a PHP HTTP client that makes it easy to send HTTP requests and trivial to integrate with web services.
Simple interface for building query strings, POST requests, streaming large uploads, streaming large downloads, using HTTP cookies, uploading JSON data, etc...
Can send both synchronous and asynchronous requests using the same interface.
Uses PSR-7 interfaces for requests, responses, and streams. This allows you to utilize other PSR-7 compatible libraries with Guzzle.
Abstracts away the underlying HTTP transport, allowing you to write environment and transport agnostic code; i.e., no hard dependency on cURL, PHP streams, sockets, or non-blocking event loops.
Middleware system allows you to augment and compose client behavior.
```
Có thể hiểu nó sẽ support bạn dễ dàng tạo ra các querry string, streaming large download, sử dụng HTTP cookies vv... Và nó không phụ thuộc vào cURL, PHP stream, sockets hoặc vòng lặp không bị chặn. Và chắc chắn nó sẽ hỗ trợ middleware rồi :v

# 3. Cài đặt Guzzle:
Vì nó là một package nên bạn sẽ phải cài nó vào project của mình :D. Các bạn có thể chạy đoạn lệnh.

```php
composer require guzzlehttp/guzzle
```

Cùng tìm hiểu nó chạy như thế nào qua ví dụ basic:

đầu tiên cơ bản chúng ta có thể xem một ví dụ trên document để cùng hiểu nó hoạt động như thế nào:

```php
$client = new GuzzleHttp\Client();
$res = $client->request('GET', 'https://api.github.com/user', [
    'auth' => ['user', 'pass']
]);

echo $res->getBody();
```

Đầu tiên mình sẽ tạo một biến có type là **GuzzleHttp\Client()** tiếp theo mình có thể trỏ đến request mà mình đang hướng đến, ở đây vấn đề chỉ là cú pháp :D, các bạn sẽ cần chú ý xem yêu cầu đầu vào của api mà mình cần là gì nhé (yaoming). Sau đó các bạn có thể dùng cầu lệnh `echo $res->getStatusCode();` để check trạng thái mã code của bạn trả về. Còn hàm cách bạn check là gì thì còn tùy thuộc framework bạn sử dụng là gì, ví dụ mình sử dụng laravel thì mình sẽ sử dụng dd() để check :v. Sau khi đã check song như mình viết ở trên `echo $res->getBody();` để lấy ra response của bạn :D.

# Ví dụ:
Kết thúc basic syntax, chúng ta cùng vi vu sang cái gì đó sát với thực tế hơn nhé:


Tôi đang có một server xử lý ảnh, tôi chỉ cần nhập ảnh vào, server đó sẽ style lại nó theo một trend trên mạng :D. Việc của tôi bây giờ là nhập một ảnh, và nó sẽ trả về response cho tôi một ảnh đã được xử lý, việc của tôi là chỉ cần render nó ra thôi. Khá dễ phải không nào.

Ok bắt tay vào làm nào.

Đầu tiên tôi cần kết nối tới server kia, tất nhiên rồi:
```php
$client = new GuzzleHttp\Client();
$res = $client->request('POST', 'server của tôi', [
]);
```

Tiếp theo tôi cần có headers. Có thể bên kia sẽ cần một số kiểu dữ liệu đặc biệt thì sao :v.

```php
'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'auth_trusted_header',
                ],
```
Ukm hòm hòm rồi đấy công việc của tôi là gửi cái file ảnh đấy đi thôi :D
```php
'multipart' => [
                    [
                        'name' => 'file',
                        'contents' => fopen($request->file->path(), 'r'),
                        'filename' => $request->file->hashName(),
                    ],
                ],
```
OK tất cả đã đầy đủ và giờ tôi chỉ cần lấy cái response này ra nữa thôi: 
```php
$response->getBody()->getContents()
```
ok bây giờ chúng ta cùng tổng hợp lại code nào:
```php
$client = new GuzzleHttp\Client();
$response = $client->request('POST', 'server của tôi', [
'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'auth_trusted_header',
                ],
'multipart' => [
                    [
                        'name' => 'file',
                        'contents' => fopen($request->file->path(), 'r'),
                        'filename' => $request->file->hashName(),
                    ],
                ],
]);

$response->getBody()->getContents()
```
ok vậy là xong rồi đấy.

Nhưng nếu server của tôi là GET, PUT vv... mà không phải là POST thì sao. Các bạn chỉ chú ý một chút về cấu trúc của nó thôi, Guzzle sẽ gồm 3 phần:

* Phần một: Method, và đây cũng là phần các bạn thắc mắc ở trên. Chúng ta sẽ thay đổi các method cho phù hợp ở đây.
* Phần hai: Link đến server mà các bạn kết nối
*  Phần ba: Là phần cung cấp input đầu vào cho server. Ở đây các bạn phải custom cho đúng với yêu cầu mà server các bạn cần, nhưng thường sẽ gồm 2 phần con:
1. *    headers: Với một số trường hợp server của các bạn sẽ không yêu cầu headers, vì thế các bạn có thể bỏ qua nó. Nhưng đa phần với các api được bảo mật thì gần như không có trường hợp này xảy ra, vì vậy các bạn cần đọc kỹ api của mình để điền đúng và đủ header vào nhé. Mình cảm thấy phần này là ngốn thời gian nhất (caycu)
2. * Phần tiếp theo mình tạm gọi là content vì với mỗi kiểu method hay với từng kiểu data mà các bạn gửi sẽ  cần có một content phù hợp. Ví dụ ở đây khi mình gửi ảnh thì sẽ là `multipart`, nhưng khi đầu vào cần kiểu json thì ở đây các bạn sẽ cần mảng `'json' => []`. Mình khuyên các bạn cần chúng ý phần `Content-Type` mà api của cạc bạn yêu cầu, sau khi đã biết được api yêu cầu gì thì các bạn có thể tìm ở trên [document](https://docs.guzzlephp.org/en/stable/request-options.html)  của guzzle để tìm hàm phù hợp. Vì dù có kỹ tới đâu mình cũng không thể giới thiệu hết tới các bạn được, mỗi phiên bản nó lại thêm một vài hàm mới mà :v

Tiếp theo: làm sao để test xem cái request tôi gọi có đúng không :v, ngoài cách check theo `getStatusCode()` thụ động ở trên các bạn còn có thể check bằng cách: 
```php
['debug' => true]
```
# Middleware
Mình sử dụng framework laravel nên mình cũng không sử dụng middleware của guzzle :D. Nhưng mà bạn ơi, chúng ta là ai, là developer chứ ai. Việc chúng ta thích là gì, là ngoài phá hoại chúng ta kiếm tìm những thứ mới mẻ để áp dụng và xây dựng project, làm sao cho con bug sau to hơn con bug trước. Nhưng chúng ta sẽ không bao giờ từ bỏ, sẽ không bao giờ bỏ cuộc tại vì chúng ta đã có "viblo nơi cộng đồng chia sẻ kiến thức" :D.

theo như document thì middleware có thể hiểu như sau:

```
Middleware augments the functionality of handlers by invoking them in the process of generating responses. Middleware is implemented as a higher order function that takes the following form ...
```
các bạn có thể tìm hiểu thêm ở đây: https://docs.guzzlephp.org/en/stable/handlers-and-middleware.html

có thể hiểu đơn giản nó cho phép bạn kiểm soát hành vi của client (yaoming)

Vì mình cũng chưa tìm hiểu sâu về phần này lên cũng không dám múa rìu qua mắt thợ :D. Nên mình để link bài viết mình đang tìm hiểu tại đây
https://bitpress.io/laravel/php/2017/04/07/laravel-guzzle-6-middleware/


# Kết luận:

Đọc tới đây chắc các bạn cũng đã hình dung được Guzzle là gì cũng như cách sử dụng, hoạt động của nó rồi đúng không ạ :D. Nếu thấy bài viết hay đừng quên để lại 1 like và comment nhé thank !!!
![](https://images.viblo.asia/862d5e57-e2e7-48dd-ac42-013b443109ed.jpg)