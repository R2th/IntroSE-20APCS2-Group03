Các thông điệp HTTP là căn bản của việc lập trình web. Trình duyệt web và các HTTP client như là cURL tạo các thông điệp HTTP với mục đích yêu câu để gửi về server, khi đó server sẽ trả về thông điệp phản hồi. Phias server sẽ nhận các yêu cầu và gửi trả phản hồi.

<br>
Các thông điệp HTTP thường được ẩn đi đối với người dùng cuối, nhưng với tư cách là nhà phát triển, chúng ta cần hiểu được cấu trúc và cách thức nó hoạt động và các để truy cập hoặc điều khiển các thông điệp ấy để thực hiện các nhiệm vụ, có thể là gửi yêu cầu tới 1 HTTP API hoặc là tiếp nhận 1 yêu cầu được gửi đến.

Các thông điệp HTTP đều có 1 định dạng sau
```
POST /path HTTP/1.1
Host: example.com

foo=bar&baz=bat
```
Dòng đầu tiên của thông điệp là dòng "reuquest line"(dòng yêu cầu), chứa các thành phần sau theo thứ tự: phương thức request HTTP, mục tiêu của yêu cầu(thường là 1 URI hoặc là 1 đường dẫn ở web server) và phiên bản của thủ tục HTTP. Tiếp theo dòng đó sẽ là 1 hay nhiều HTTP header, dòng trống và cuối cùng là thân của thông điệp.

Thông điệp phản hồi có định dạng tương tự:
```
HTTP/1.1 200 OK
Content-Type: text/plain

This is the response body
```
Dòng đầu tiên là "trạng thái", chứa các thành phần sau theo thứ tự: phiên bản của thủ tục HTTP, mã trạng thái của HTTP, dòng "lí do", mô tả đọc được với người của mã HTTP. Tiếp theo dòng đó sẽ là 1 hay nhiều HTTP header, dòng trống và cuối cùng là thân của thông điệp y như thông điệp yêu cầu bên trên.

Các interface mô tả trong document này đều về các cách trừu tượng hóa thông điệp HTTP và các phần tử chứa đựng chúng.
# Đặc tả
## Thông điệp
1 thông điệp HTTP có thể là yêu cầu từ client tới server hoặc phản hồi cỉa server cho client. Đây là định nghĩa cho các interface cho thông điệp HTTP là `Psr\Http\Message\RequestInterface` và `Psr\Http\Message\ResponseInterface`. 

Cả `Psr\Http\Message\RequestInterface` và `Psr\Http\Message\ResponseInterface` đều mở rộng từ `Psr\Http\Message\MessageInterface`. CÓ THỂ triển khai trực tiếp `Psr\Http\Message\MessageInterface`, nhưng NÊN triển khai cả `Psr\Http\Message\RequestInterface` và `Psr\Http\Message\ResponseInterface`.

Từ đây đến hết bài viết, namespace `Psr\Http\Message` sẽ được bỏ qua khi đề cập các interface trên.
## HTTP header
### Các trường tên header không phân biệt chữ hoa chữ thường
Các thông điệp HTTP bao gồm các trường tên header không phân biệt chữ hoa chữ thường. Header được lấy theo tên từ các lớp thực hiện `MessageInterface` theo cách không phân biệt chữ hoa chữ thường. Ví dụ, việc lấy tiêu đề foo sẽ trả lại kết quả tương tự như lấy tiêu đề FoO. Tương tự, đặt tiêu đề Foo sẽ ghi đè lên bất kỳ giá trị tiêu đề foo nào được đặt trước đó.

Mặc dù các tiêu đề đó có thể được truy xuất phân biệt chữ hoa chữ thường, trường hợp ban đầu PHẢI được bảo quản trong việc triển khai, đặc biệt khi được truy xuất với `getHeaders()`

Các ứng dụng HTTP không phù hợp CÓ THỂ phụ thuộc vào một trường hợp nhất định, vì vậy nó hữu ích cho người dùng để có thể ra lệnh cho trường hợp của các tiêu đề HTTP khi tạo một yêu cầu hoặc phản hồi.
```
$message = $message->withHeader('foo', 'bar');

echo $message->getHeaderLine('foo');
// Outputs: bar

echo $message->getHeaderLine('FOO');
// Outputs: bar

$message = $message->withHeader('fOO', 'baz');
echo $message->getHeaderLine('foo');
// Outputs: baz

```
### Header với nhiều giá trị
Để phù hợp với các tiêu đề có nhiều giá trị vẫn cung cấp sự tiện lợi khi làm việc với các tiêu đề như các chuỗi, các tiêu đề có thể được lấy ra từ một cá thể của một `MessageInterface` như một mảng hoặc một chuỗi. Sử dụng phương thức `getHeaderLine()` để lấy ra một giá trị tiêu đề như là một chuỗi chứa tất cả các giá trị tiêu đề của một tiêu đề không phân biệt dạng chữ theo tên được nối với một dấu phẩy. Sử dụng `getHeader()` để lấy một mảng của tất cả các giá trị tiêu đề cho một tiêu đề không phân biệt dạng chữ cụ thể theo tên.
```
$message = $message
    ->withHeader('foo', 'bar')
    ->withAddedHeader('foo', 'baz');

$header = $message->getHeaderLine('foo');
// $header contains: 'bar, baz'

$header = $message->getHeader('foo');
// ['bar', 'baz']
```
Lưu ý: Không phải tất cả các giá trị tiêu đề đều có thể được ghép bằng dấu phẩy (ví dụ:`Set-Cookie`). Khi làm việc với các tiêu đề như vậy, người tiêu dùng các lớp dựa trên `MessageInterface` NÊN dựa vào phương thức `getHeader ()` để lấy các tiêu đề đa giá trị như vậy.
### Host header
Trong các yêu cầu, tiêu đề `Host` thường được dùng để phản chiếu lại thành phần chủ của URI, cũng như là phần chủ được sử dụng để biểu diễn kết nối TCP. Tuy nhiên, đặc tả HTTP cho pháp tiêu đề `Host` phân biệt 2 chức năng trên với nhau.

Trong quá trình xây dựng ứng dụng, việc triển khai PHẢI cố gắng đặt tiêu đề `Host` từ 1 URI được cung cấp trong trường hợp chưa có tiêu đề `Host`.

`RequestInterface::withUri()` sẽ thay thế tiêu đề `Host` của yêu cầu bằng tiêu đề `Host` mà phù hợp với thành phần chủ của cái `UriInterface` được chấp nhận theo mặc định.

Bạn có thể chọn việc duy trì trạng thái ban đầu của tiêu đề `Host` bằng cách truyền giá trị `true` cho tham số (`$preserveHost`) thứ 2. Khi giá trị này được đặt là `true`, thông điệp yêu cầu sẽ không cập nhật tiêu đề `Host` của thông điệp trả về, trừ phi thông điệp yêu cầu không có tiêu đề `Host`.

Bảng này minh họa những gì `getHeaderLine('Host')` sẽ trả về cho một yêu cầu được trả về bởi `withUri()` với tham số `$preserveHost` được đặt thành `true` cho các yêu cầu ban đầu và URI khác nhau.
Tiêu đề host yêu cầu<sup>[1]</sup> | Thành phần host yêu cầu<sup>[2]</sup> | Thành phần host URI<sup>[3]</sup> | Kết quả
----------------------------------------|--------------------------------------------|----------------------------------------|--------
''                                      | ''                                         | ''                                     | ''
''                                      | foo.com                                    | ''                                     | foo.com
''                                      | foo.com                                    | bar.com                                | foo.com
foo.com                                 | ''                                         | bar.com                                | foo.com
foo.com                                 | bar.com                                    | baz.com                                | foo.com
* 1: Tiêu đề `Host` trước khi hoạt động
* 2: Thành phần máy chủ lưu trữ của URI được soạn trong yêu cầu trước khi hoạt động.
* 3: Thành phần chứa URI được đưa vào thông qua `withUri()`
### Các dòng dữ liệu
Các thông điệp HTTP bao gồm dòng bắt đầu, các tiêu đề và phần thân. Phần thân thông điệp có thể vô cùng nhỏ nhưng cũng có thể to khủng khiếp. Cố gắng để có thể đưa ra thông điệp dưới dạng 1 chuỗi sẽ dẫn tới việc tốn nhiều bộ nhớ hơn dự tính vì phần thân cần được chứa trọn vẹn trong bộ nhớ. Cố gắng để lưu trữ phần thân của 1 yêu cầu hay phản hồi trong bộ nhớ có thể  dẫn tới cản trở việc triển khai làm các thông điệp có dung lượng lớn hơn. `StreamInterface` được sử dụng để ẩn chi tiết triển khai khi luồng dữ liệu được đọc từ hoặc được ghi vào. Giải pháp khi 1 chuỗi cõ thể là thông điệp được triển khai đúng kiểu, các luồng được dựng sẵn là `php://memory` và `php://temp` có thể được đưa vào sử dụng.

`StreamInterface` đưa ra một số phương pháp cho phép các luồng được đọc từ, được ghi vào và đi qua một cách hiệu quả.

Các luồng thể hiện chức năng của chúng theo 3 cách:`isReadable()`,`isWritable()` và `isSeekable()`. Những phương thức này có thể được sử dụng bởi các cộng tác viên luồng để xác định liệu một luồng có khả năng đáp ứng yêu cầu của họ hay không.

Mỗi luồng có 3 khả năng khác nhau: nó có thể là chỉ đọc, chỉ ghi, hoặc đọc-ghi. Nó cũng có thể cho phép truy cập ngẫu nhiên tùy ý (tìm kiếm chuyển tiếp hoặc quay trở lại bất kỳ vị trí nào) hoặc chỉ truy cập tuần tự (ví dụ trong trường hợp của một socket, pipe hoặc luồng dựa trên call-back).

Cuối cùng, `StreamInterface` định nghĩa phương thức `__toString()` để đơn giản hóa việc truy xuất hoặc đưa ra toàn bộ nội dung cùng một lúc.

Không giống như interface yêu cầu và phản hồi, `StreamInterface` không mô hình hóa bất biến. Trong trường hợp một luồng PHP thực sự được đsong gói, bất biến là không thể thực thi, vì bất kỳ mã nào tương tác với tài nguyên có thể thay đổi trạng thái của nó (bao gồm vị trí con trỏ, nội dung và nhiều thứ khác). Đề xuất của chúng tôi là triển khai sử dụng luồng chỉ đọc cho các yêu cầu phía máy chủ và phản hồi phía máy khách. Người tiêu dùng nên nhận thức được thực tế rằng thể hiện luồng có thể có thể thay đổi và, như vậy, có thể thay đổi trạng thái của thông báo; khi nghi ngờ, hãy tạo một luồng mới và đính kèm nó vào một thông điệp để thực thi trạng thái.
### Mục tiêu yêu cầu và URI 
Theo RFC 7230, các thông điệp yêu cầu chứa “mục tiêu yêu cầu” làm phân đoạn thứ hai của dòng yêu cầu. Mục tiêu yêu cầu có thể là một trong các dạng sau:
* **origin-form**, bao gồm đường dẫn, và, nếu có, chuỗi truy vấn; điều này thường được gọi là URL tương đối. Thư được truyền qua TCP thường có dạng gốc; dữ liệu lược đồ và quyền hạn thường chỉ xuất hiện thông qua các biến CGI.
* **absolute-form**, bao gồm lược đồ, quyền hạn ("`[user-info@]host[:port]`", trong đó các mục trong ngoặc là tùy chọn), đường dẫn (nếu có), chuỗi truy vấn (nếu có) và đoạn ( nếu có). Điều này thường được gọi là một URI tuyệt đối, và là biểu mẫu duy nhất để chỉ định một URI được mô tả chi tiết trong RFC 3986. Biểu mẫu này thường được sử dụng khi thực hiện các yêu cầu tới các proxy HTTP.
* **authority-form**, chỉ bao gồm thẩm quyền. Điều này thường được sử dụng trong các yêu cầu CONNECT, để thiết lập kết nối giữa máy khách HTTP và máy chủ proxy.
* **asterisk-form**, chỉ bao gồm chuỗi `*` và được sử dụng với phương pháp OPTIONS để xác định các khả năng thông thường của máy chủ web.

Ngoài các mục tiêu yêu cầu này, thường có ‘URL hiệu quả’ tách biệt với mục tiêu yêu cầu. URL hiệu quả không được truyền trong một thông báo HTTP, nhưng nó được sử dụng để xác định giao thức (http/https), cổng và tên máy chủ để thực hiện yêu cầu.

Các URL có hiệu quả được biểu diễn bởi `UriInterface`. `UriInterface` mô hình URI HTTP và HTTPS như được chỉ định trong RFC 3986 (trường hợp sử dụng chính). Giao diện này cung cấp các phương thức để tương tác với các phần URI khác nhau, điều này sẽ làm giảm nhu cầu phân tích cú pháp lặp lại của URI. Nó cũng chỉ định phương thức `__toString()` để đúc URI được mô hình hóa để biểu diễn chuỗi của nó.

Khi truy lục mục tiêu yêu cầu với `getRequestTarget()`, theo mặc định, phương thức này sẽ sử dụng đối tượng URI và trích xuất tất cả các thành phần cần thiết để xây dựng origin-form. Origin-form cho đến nay là mục tiêu yêu cầu phổ biến nhất.

Nếu người dùng cuối mong muốn sử dụng một trong ba biểu mẫu khác hoặc nếu người dùng muốn ghi đè rõ ràng mục tiêu yêu cầu, có thể làm như vậy với `withRequestTarget()`.

Gọi phương thức sẽ không ảnh hưởng tới URI, vì sẽ được trả lại với `getUri()`.

Ví dụ với yêu cầu asterisk-form:
```
$request = $request
    ->withMethod('OPTIONS')
    ->withRequestTarget('*')
    ->withUri(new Uri('https://example.org/'));
```
Kết quả trả về
```
OPTIONS * HTTP/1.1
```
Nhưng đó là nếu máy khách HTTP sẽ có thể sử dụng URL hiệu quả (từ `getUri()`), để xác định giao thức, tên máy chủ và cổng TCP.

Một máy khách HTTP PHẢI bỏ qua các giá trị của `Uri::getPath()` và `Uri::getQuery ()`, và thay vào đó sử dụng giá trị được trả về bởi `getRequestTarget()`, mặc định để nối hai giá trị này.

Máy khách chọn không triển khai 1 hoặc nhiều hơn trong số 4 biểu mẫu yêu cầu-mục tiêu, PHẢI vẫn sử dụng `getRequestTarget()`. Các máy khách này PHẢI từ chối các mục tiêu yêu cầu mà chúng không hỗ trợ, và KHÔNG ĐƯỢC trả về các giá trị từ `getUri()`.

`RequestInterface` cung cấp các phương thức để truy xuất mục tiêu yêu cầu hoặc tạo một cá thể mới với mục tiêu yêu cầu được cung cấp. Theo mặc định, nếu không có mục tiêu yêu cầu nào được cấu tạo cụ thể trong cá thể, `getRequestTarget()` sẽ trả về dạng gốc của URI được tạo (hoặc “/” nếu không có URI nào được tạo). `withRequestTarget($requestTarget)` tạo một cá thể mới với đích yêu cầu đã chỉ định, và do đó cho phép các nhà phát triển tạo các thông báo yêu cầu đại diện cho ba biểu mẫu yêu cầu khác (absolute-form, authority-form, và asterisk-form). Khi được sử dụng, cá thể URI được tạo sẵn vẫn có thể được sử dụng, đặc biệt là trong các máy khách, nơi nó có thể được sử dụng để tạo kết nối đến máy chủ.
### Yêu cầu phía server
`RequestInterface` cung cấp đại diện chung của thông báo yêu cầu HTTP. Tuy nhiên, các yêu cầu phía máy chủ cần xử lý bổ sung, do tính chất của môi trường phía máy chủ. Việc xử lý phía máy chủ cần phải tính đến Giao diện Cổng chung (CGI), và cụ thể hơn là việc trừu tượng hóa và mở rộng CGI của PHP thông qua API Máy chủ (SAPI) của nó. PHP đã cung cấp sự đơn giản hóa xung quanh marshaling đầu vào thông qua superglobals như:
* `$_COOKIE`
* `$_GET`
* `$_POST`
* `$_FILES`
* `$_SERVER`

`ServerRequestInterface` mở rộng `RequestInterface` để cung cấp một sự trừu tượng xung quanh các superglobals khác nhau này. Thực hành này giúp giảm sự liên kết với siêu người dùng của người tiêu dùng và khuyến khích và thúc đẩy khả năng kiểm tra người tiêu dùng yêu cầu.

Yêu cầu máy chủ cung cấp thêm một thuộc tính, "attributes", để cho phép người tiêu dùng có khả năng nhìn vào, phân tích và so khớp yêu cầu đối với các quy tắc cụ thể cho ứng dụng (chẳng hạn như đối sánh đường dẫn, đối sánh lược đồ, đối sánh lưu trữ, v.v.). Như vậy, yêu cầu máy chủ cũng có thể cung cấp thông điệp giữa nhiều người tiêu dùng yêu cầu.
### Tải file lên
`ServerRequestInterface` chỉ định một phương thức để lấy một cây các tệp tải lên trong một cấu trúc chuẩn hóa, với mỗi lá là một cá thể của tệp `UploadedFileInterface`.

Các superglobal `$ _FILES` có một số vấn đề phổ biến khi xử lý mảng đầu vào tập tin. Ví dụ: nếu bạn có biểu mẫu gửi một mảng tệp - ví dụ: tên đầu vào "files", gửi `file[0]` và `file[1]` - PHP sẽ đại diện cho điều này là:
```
array(
    'files' => array(
        'name' => array(
            0 => 'file0.txt',
            1 => 'file1.html',
        ),
        'type' => array(
            0 => 'text/plain',
            1 => 'text/html',
        ),
        /* etc. */
    ),
)
```
thay vì:
```
array(
    'files' => array(
        0 => array(
            'name' => 'file0.txt',
            'type' => 'text/plain',
            /* etc. */
        ),
        1 => array(
            'name' => 'file1.html',
            'type' => 'text/html',
            /* etc. */
        ),
    ),
)
```
Kết quả là người tiêu dùng cần biết chi tiết triển khai ngôn ngữ này và viết mã để thu thập dữ liệu cho một lần tải lên nhất định.

Ngoài ra, các tình huống tồn tại khi `$_FILES` không được điền khi tệp tải lên xảy ra:
* Không dùng phương thức `POST` của HTTP.
* Đang kiểm thử đơn vị
* Khi sử dụng 1 môi trường không SAPI như [ReactPHP](https://reactphp.org/)

Trong những trường hợp như vậy, dữ liệu phải được đưa vào cẩn thận:
* Một quá trình có thể phân tích cú pháp nội dung thư để khám phá các tệp tải lên. Trong những trường hợp như vậy, việc triển khai có thể chọn không ghi các tệp tải lên hệ thống tệp, mà thay vào đó, hãy đóng gói chúng trong một luồng để giảm bộ nhớ, I/O và lưu trữ trên cao.
* Trong các trường hợp thử nghiệm đơn vị, các nhà phát triển cần có khả năng lập và/hoặc giả lập siêu dữ liệu tải lên tệp để xác thực và xác minh các kịch bản khác nhau.

`getUploadedFiles()` cung cấp cấu trúc chuẩn hóa cho người tiêu dùng. Triển khai dự kiến sẽ:
* Tổng hợp tất cả thông tin cho một tệp tải lên nhất định và sử dụng nó để điền một instance `Psr\Http\Message\UploadedFileInterface`.
* Tạo lại cấu trúc cây đã gửi, với mỗi lá là cá thể `Psr\Http\Message\UploadedFileInterface` thích hợp cho vị trí đã cho trong cây.

Cấu trúc cây được tham chiếu nên bắt chước cấu trúc đặt tên trong đó các tệp đã được gửi.

Trong ví dụ đơn giản nhất, đây có thể là một phần tử biểu mẫu được đặt tên được gửi dưới dạng:
```
<input type="file" name="avatar" />
```
Trong trường hợp này, `$_FILES` có cấu trúc:
```
array(
    'avatar' => array(
        'tmp_name' => 'phpUxcOty',
        'name' => 'my-avatar.png',
        'size' => 90996,
        'type' => 'image/png',
        'error' => 0,
    ),
)
```
Biểu mẫu thông thường được trả về bởi `getUploadedFiles()` sẽ là:
```
array(
    'avatar' => /* UploadedFileInterface instance */
)
```
Trong trường hợp đầu vào sử dụng ký hiệu mảng cho tên:
```
<input type="file" name="my-form[details][avatar]" />
```
`$_FILES` sẽ kết thúc như thế này:
```
array(
    'my-form' => array(
        'details' => array(
            'avatar' => array(
                'tmp_name' => 'phpUxcOty',
                'name' => 'my-avatar.png',
                'size' => 90996,
                'type' => 'image/png',
                'error' => 0,
            ),
        ),
    ),
)
```
Và cây trả về bởi `getUploadedFiles()` có dạng:
```
array(
    'my-form' => array(
        'details' => array(
            'avatar' => /* UploadedFileInterface instance */
        ),
    ),
)
```
Trong vài trường hợp, bạn có thể thiết lập riêng mảng các tệp:
```
Upload an avatar: <input type="file" name="my-form[details][avatars][]" />
Upload an avatar: <input type="file" name="my-form[details][avatars][]" />
```
(Ví dụ: các điều khiển JavaScript có thể sinh ra các đầu vào tải lên tệp bổ sung để cho phép tải lên nhiều tệp cùng một lúc.)

Trong trường hợp này, việc triển khai đặc tả phải tổng hợp tất cả thông tin liên quan đến tệp tại chỉ mục đã cho. Lý do là vì `$_FILES` lệch khỏi cấu trúc bình thường của nó trong những trường hợp như vậy:
```
array(
    'my-form' => array(
        'details' => array(
            'avatars' => array(
                'tmp_name' => array(
                    0 => '...',
                    1 => '...',
                    2 => '...',
                ),
                'name' => array(
                    0 => '...',
                    1 => '...',
                    2 => '...',
                ),
                'size' => array(
                    0 => '...',
                    1 => '...',
                    2 => '...',
                ),
                'type' => array(
                    0 => '...',
                    1 => '...',
                    2 => '...',
                ),
                'error' => array(
                    0 => '...',
                    1 => '...',
                    2 => '...',
                ),
            ),
        ),
    ),
)
```
Mảng `$_FILES` ở trên sẽ tương ứng với cấu trúc sau được trả về bởi `getUploadedFiles()`:
```
array(
    'my-form' => array(
        'details' => array(
            'avatars' => array(
                0 => /* UploadedFileInterface instance */,
                1 => /* UploadedFileInterface instance */,
                2 => /* UploadedFileInterface instance */,
            ),
        ),
    ),
)
```
Người tiêu dùng sẽ truy cập vào index `1` của mảng lồng nhau bằng cách sử dụng:
```
$request->getUploadedFiles()['my-form']['details']['avatars'][1];
```
Bởi vì dữ liệu tệp được tải lên là bắt nguồn (bắt nguồn từ `$_FILES` hoặc phần thân yêu cầu), một phương thức biến thể, `withUploadedFiles()`, cũng có mặt trong giao diện, cho phép ủy nhiệm quá trình chuẩn hóa sang một tiến trình khác.

Trong trường hợp các ví dụ ban đầu, mức tiêu thụ tương tự như sau:
```
$file0 = $request->getUploadedFiles()['files'][0];
$file1 = $request->getUploadedFiles()['files'][1];

printf(
    "Received the files %s and %s",
    $file0->getClientFilename(),
    $file1->getClientFilename()
);

// "Received the files file0.txt and file1.html"
```
Đề xuất này cũng nhận ra rằng việc triển khai có thể hoạt động trong môi trường không phải SAPI. Như vậy, `UploadedFileInterface` cung cấp các phương thức để đảm bảo các hoạt động sẽ hoạt động bất kể môi trường. Đặc biệt:
* `moveTo($targetPath)` được cung cấp như là một thay thế an toàn và được đề nghị để gọi `move_uploaded_file()` trực tiếp trên tệp tải lên tạm thời. Việc triển khai sẽ phát hiện hoạt động chính xác để sử dụng dựa trên môi trường.
* `getStream()` sẽ trả về một cá thể `StreamInterface`. Trong môi trường không phải SAPI, một khả năng được đề xuất là phân tích các tệp tải lên cá nhân thành các luồng `php://temp` thay vì trực tiếp vào tệp; trong những trường hợp như vậy, không có tệp tải lên nào. `getStream()` do đó được đảm bảo hoạt động bất kể môi trường.

Như ví dụ: 
```
// Move a file to an upload directory
$filename = sprintf(
    '%s.%s',
    create_uuid(),
    pathinfo($file0->getClientFilename(), PATHINFO_EXTENSION)
);
$file0->moveTo(DATA_DIR . '/' . $filename);

// Stream a file to Amazon S3.
// Assume $s3wrapper is a PHP stream that will write to S3, and that
// Psr7StreamWrapper is a class that will decorate a StreamInterface as a PHP
// StreamWrapper.
$stream = new Psr7StreamWrapper($file1->getStream());
stream_copy_to_stream($stream, $s3wrapper);
```
# Gói thư viện
Các lớp và lớp giao diện được cung cấp dưới đây như 1 phần của gói [psr/http-message](https://packagist.org/packages/psr/http-message)
# Các Interface
## Psr\Http\Message\MessageInterface
```
<?php
namespace Psr\Http\Message;

/**
 * HTTP messages consist of requests from a client to a server and responses
 * from a server to a client. This interface defines the methods common to
 * each.
 *
 * Messages are considered immutable; all methods that might change state MUST
 * be implemented such that they retain the internal state of the current
 * message and return an instance that contains the changed state.
 *
 * @see http://www.ietf.org/rfc/rfc7230.txt
 * @see http://www.ietf.org/rfc/rfc7231.txt
 */
interface MessageInterface
{
    /**
     * Retrieves the HTTP protocol version as a string.
     *
     * The string MUST contain only the HTTP version number (e.g., "1.1", "1.0").
     *
     * @return string HTTP protocol version.
     */
    public function getProtocolVersion();

    /**
     * Return an instance with the specified HTTP protocol version.
     *
     * The version string MUST contain only the HTTP version number (e.g.,
     * "1.1", "1.0").
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * new protocol version.
     *
     * @param string $version HTTP protocol version
     * @return static
     */
    public function withProtocolVersion($version);

    /**
     * Retrieves all message header values.
     *
     * The keys represent the header name as it will be sent over the wire, and
     * each value is an array of strings associated with the header.
     *
     *     // Represent the headers as a string
     *     foreach ($message->getHeaders() as $name => $values) {
     *         echo $name . ': ' . implode(', ', $values);
     *     }
     *
     *     // Emit headers iteratively:
     *     foreach ($message->getHeaders() as $name => $values) {
     *         foreach ($values as $value) {
     *             header(sprintf('%s: %s', $name, $value), false);
     *         }
     *     }
     *
     * While header names are not case-sensitive, getHeaders() will preserve the
     * exact case in which headers were originally specified.
     *
     * @return string[][] Returns an associative array of the message's headers.
     *     Each key MUST be a header name, and each value MUST be an array of
     *     strings for that header.
     */
    public function getHeaders();

    /**
     * Checks if a header exists by the given case-insensitive name.
     *
     * @param string $name Case-insensitive header field name.
     * @return bool Returns true if any header names match the given header
     *     name using a case-insensitive string comparison. Returns false if
     *     no matching header name is found in the message.
     */
    public function hasHeader($name);

    /**
     * Retrieves a message header value by the given case-insensitive name.
     *
     * This method returns an array of all the header values of the given
     * case-insensitive header name.
     *
     * If the header does not appear in the message, this method MUST return an
     * empty array.
     *
     * @param string $name Case-insensitive header field name.
     * @return string[] An array of string values as provided for the given
     *    header. If the header does not appear in the message, this method MUST
     *    return an empty array.
     */
    public function getHeader($name);

    /**
     * Retrieves a comma-separated string of the values for a single header.
     *
     * This method returns all of the header values of the given
     * case-insensitive header name as a string concatenated together using
     * a comma.
     *
     * NOTE: Not all header values may be appropriately represented using
     * comma concatenation. For such headers, use getHeader() instead
     * and supply your own delimiter when concatenating.
     *
     * If the header does not appear in the message, this method MUST return
     * an empty string.
     *
     * @param string $name Case-insensitive header field name.
     * @return string A string of values as provided for the given header
     *    concatenated together using a comma. If the header does not appear in
     *    the message, this method MUST return an empty string.
     */
    public function getHeaderLine($name);

    /**
     * Return an instance with the provided value replacing the specified header.
     *
     * While header names are case-insensitive, the casing of the header will
     * be preserved by this function, and returned from getHeaders().
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * new and/or updated header and value.
     *
     * @param string $name Case-insensitive header field name.
     * @param string|string[] $value Header value(s).
     * @return static
     * @throws \InvalidArgumentException for invalid header names or values.
     */
    public function withHeader($name, $value);

    /**
     * Return an instance with the specified header appended with the given value.
     *
     * Existing values for the specified header will be maintained. The new
     * value(s) will be appended to the existing list. If the header did not
     * exist previously, it will be added.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * new header and/or value.
     *
     * @param string $name Case-insensitive header field name to add.
     * @param string|string[] $value Header value(s).
     * @return static
     * @throws \InvalidArgumentException for invalid header names.
     * @throws \InvalidArgumentException for invalid header values.
     */
    public function withAddedHeader($name, $value);

    /**
     * Return an instance without the specified header.
     *
     * Header resolution MUST be done without case-sensitivity.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that removes
     * the named header.
     *
     * @param string $name Case-insensitive header field name to remove.
     * @return static
     */
    public function withoutHeader($name);

    /**
     * Gets the body of the message.
     *
     * @return StreamInterface Returns the body as a stream.
     */
    public function getBody();

    /**
     * Return an instance with the specified message body.
     *
     * The body MUST be a StreamInterface object.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return a new instance that has the
     * new body stream.
     *
     * @param StreamInterface $body Body.
     * @return static
     * @throws \InvalidArgumentException When the body is not valid.
     */
    public function withBody(StreamInterface $body);
}
```
## Psr\Http\Message\RequestInterface
```
<?php
namespace Psr\Http\Message;

/**
 * Representation of an outgoing, client-side request.
 *
 * Per the HTTP specification, this interface includes properties for
 * each of the following:
 *
 * - Protocol version
 * - HTTP method
 * - URI
 * - Headers
 * - Message body
 *
 * During construction, implementations MUST attempt to set the Host header from
 * a provided URI if no Host header is provided.
 *
 * Requests are considered immutable; all methods that might change state MUST
 * be implemented such that they retain the internal state of the current
 * message and return an instance that contains the changed state.
 */
interface RequestInterface extends MessageInterface
{
    /**
     * Retrieves the message's request target.
     *
     * Retrieves the message's request-target either as it will appear (for
     * clients), as it appeared at request (for servers), or as it was
     * specified for the instance (see withRequestTarget()).
     *
     * In most cases, this will be the origin-form of the composed URI,
     * unless a value was provided to the concrete implementation (see
     * withRequestTarget() below).
     *
     * If no URI is available, and no request-target has been specifically
     * provided, this method MUST return the string "/".
     *
     * @return string
     */
    public function getRequestTarget();

    /**
     * Return an instance with the specific request-target.
     *
     * If the request needs a non-origin-form request-target — e.g., for
     * specifying an absolute-form, authority-form, or asterisk-form —
     * this method may be used to create an instance with the specified
     * request-target, verbatim.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * changed request target.
     *
     * @see http://tools.ietf.org/html/rfc7230#section-5.3 (for the various
     *     request-target forms allowed in request messages)
     * @param mixed $requestTarget
     * @return static
     */
    public function withRequestTarget($requestTarget);

    /**
     * Retrieves the HTTP method of the request.
     *
     * @return string Returns the request method.
     */
    public function getMethod();

    /**
     * Return an instance with the provided HTTP method.
     *
     * While HTTP method names are typically all uppercase characters, HTTP
     * method names are case-sensitive and thus implementations SHOULD NOT
     * modify the given string.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * changed request method.
     *
     * @param string $method Case-sensitive method.
     * @return static
     * @throws \InvalidArgumentException for invalid HTTP methods.
     */
    public function withMethod($method);

    /**
     * Retrieves the URI instance.
     *
     * This method MUST return a UriInterface instance.
     *
     * @see http://tools.ietf.org/html/rfc3986#section-4.3
     * @return UriInterface Returns a UriInterface instance
     *     representing the URI of the request.
     */
    public function getUri();

    /**
     * Returns an instance with the provided URI.
     *
     * This method MUST update the Host header of the returned request by
     * default if the URI contains a host component. If the URI does not
     * contain a host component, any pre-existing Host header MUST be carried
     * over to the returned request.
     *
     * You can opt-in to preserving the original state of the Host header by
     * setting `$preserveHost` to `true`. When `$preserveHost` is set to
     * `true`, this method interacts with the Host header in the following ways:
     *
     * - If the Host header is missing or empty, and the new URI contains
     *   a host component, this method MUST update the Host header in the returned
     *   request.
     * - If the Host header is missing or empty, and the new URI does not contain a
     *   host component, this method MUST NOT update the Host header in the returned
     *   request.
     * - If a Host header is present and non-empty, this method MUST NOT update
     *   the Host header in the returned request.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * new UriInterface instance.
     *
     * @see http://tools.ietf.org/html/rfc3986#section-4.3
     * @param UriInterface $uri New request URI to use.
     * @param bool $preserveHost Preserve the original state of the Host header.
     * @return static
     */
    public function withUri(UriInterface $uri, $preserveHost = false);
}
```
### Psr\Http\Message\ServerRequestInterface
```
<?php
namespace Psr\Http\Message;

/**
 * Representation of an incoming, server-side HTTP request.
 *
 * Per the HTTP specification, this interface includes properties for
 * each of the following:
 *
 * - Protocol version
 * - HTTP method
 * - URI
 * - Headers
 * - Message body
 *
 * Additionally, it encapsulates all data as it has arrived at the
 * application from the CGI and/or PHP environment, including:
 *
 * - The values represented in $_SERVER.
 * - Any cookies provided (generally via $_COOKIE)
 * - Query string arguments (generally via $_GET, or as parsed via parse_str())
 * - Upload files, if any (as represented by $_FILES)
 * - Deserialized body parameters (generally from $_POST)
 *
 * $_SERVER values MUST be treated as immutable, as they represent application
 * state at the time of request; as such, no methods are provided to allow
 * modification of those values. The other values provide such methods, as they
 * can be restored from $_SERVER or the request body, and may need treatment
 * during the application (e.g., body parameters may be deserialized based on
 * content type).
 *
 * Additionally, this interface recognizes the utility of introspecting a
 * request to derive and match additional parameters (e.g., via URI path
 * matching, decrypting cookie values, deserializing non-form-encoded body
 * content, matching authorization headers to users, etc). These parameters
 * are stored in an "attributes" property.
 *
 * Requests are considered immutable; all methods that might change state MUST
 * be implemented such that they retain the internal state of the current
 * message and return an instance that contains the changed state.
 */
interface ServerRequestInterface extends RequestInterface
{
    /**
     * Retrieve server parameters.
     *
     * Retrieves data related to the incoming request environment,
     * typically derived from PHP's $_SERVER superglobal. The data IS NOT
     * REQUIRED to originate from $_SERVER.
     *
     * @return array
     */
    public function getServerParams();

    /**
     * Retrieve cookies.
     *
     * Retrieves cookies sent by the client to the server.
     *
     * The data MUST be compatible with the structure of the $_COOKIE
     * superglobal.
     *
     * @return array
     */
    public function getCookieParams();

    /**
     * Return an instance with the specified cookies.
     *
     * The data IS NOT REQUIRED to come from the $_COOKIE superglobal, but MUST
     * be compatible with the structure of $_COOKIE. Typically, this data will
     * be injected at instantiation.
     *
     * This method MUST NOT update the related Cookie header of the request
     * instance, nor related values in the server params.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * updated cookie values.
     *
     * @param array $cookies Array of key/value pairs representing cookies.
     * @return static
     */
    public function withCookieParams(array $cookies);

    /**
     * Retrieve query string arguments.
     *
     * Retrieves the deserialized query string arguments, if any.
     *
     * Note: the query params might not be in sync with the URI or server
     * params. If you need to ensure you are only getting the original
     * values, you may need to parse the query string from `getUri()->getQuery()`
     * or from the `QUERY_STRING` server param.
     *
     * @return array
     */
    public function getQueryParams();

    /**
     * Return an instance with the specified query string arguments.
     *
     * These values SHOULD remain immutable over the course of the incoming
     * request. They MAY be injected during instantiation, such as from PHP's
     * $_GET superglobal, or MAY be derived from some other value such as the
     * URI. In cases where the arguments are parsed from the URI, the data
     * MUST be compatible with what PHP's parse_str() would return for
     * purposes of how duplicate query parameters are handled, and how nested
     * sets are handled.
     *
     * Setting query string arguments MUST NOT change the URI stored by the
     * request, nor the values in the server params.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * updated query string arguments.
     *
     * @param array $query Array of query string arguments, typically from
     *     $_GET.
     * @return static
     */
    public function withQueryParams(array $query);

    /**
     * Retrieve normalized file upload data.
     *
     * This method returns upload metadata in a normalized tree, with each leaf
     * an instance of Psr\Http\Message\UploadedFileInterface.
     *
     * These values MAY be prepared from $_FILES or the message body during
     * instantiation, or MAY be injected via withUploadedFiles().
     *
     * @return array An array tree of UploadedFileInterface instances; an empty
     *     array MUST be returned if no data is present.
     */
    public function getUploadedFiles();

    /**
     * Create a new instance with the specified uploaded files.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * updated body parameters.
     *
     * @param array $uploadedFiles An array tree of UploadedFileInterface instances.
     * @return static
     * @throws \InvalidArgumentException if an invalid structure is provided.
     */
    public function withUploadedFiles(array $uploadedFiles);

    /**
     * Retrieve any parameters provided in the request body.
     *
     * If the request Content-Type is either application/x-www-form-urlencoded
     * or multipart/form-data, and the request method is POST, this method MUST
     * return the contents of $_POST.
     *
     * Otherwise, this method may return any results of deserializing
     * the request body content; as parsing returns structured content, the
     * potential types MUST be arrays or objects only. A null value indicates
     * the absence of body content.
     *
     * @return null|array|object The deserialized body parameters, if any.
     *     These will typically be an array or object.
     */
    public function getParsedBody();

    /**
     * Return an instance with the specified body parameters.
     *
     * These MAY be injected during instantiation.
     *
     * If the request Content-Type is either application/x-www-form-urlencoded
     * or multipart/form-data, and the request method is POST, use this method
     * ONLY to inject the contents of $_POST.
     *
     * The data IS NOT REQUIRED to come from $_POST, but MUST be the results of
     * deserializing the request body content. Deserialization/parsing returns
     * structured data, and, as such, this method ONLY accepts arrays or objects,
     * or a null value if nothing was available to parse.
     *
     * As an example, if content negotiation determines that the request data
     * is a JSON payload, this method could be used to create a request
     * instance with the deserialized parameters.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * updated body parameters.
     *
     * @param null|array|object $data The deserialized body data. This will
     *     typically be in an array or object.
     * @return static
     * @throws \InvalidArgumentException if an unsupported argument type is
     *     provided.
     */
    public function withParsedBody($data);

    /**
     * Retrieve attributes derived from the request.
     *
     * The request "attributes" may be used to allow injection of any
     * parameters derived from the request: e.g., the results of path
     * match operations; the results of decrypting cookies; the results of
     * deserializing non-form-encoded message bodies; etc. Attributes
     * will be application and request specific, and CAN be mutable.
     *
     * @return mixed[] Attributes derived from the request.
     */
    public function getAttributes();

    /**
     * Retrieve a single derived request attribute.
     *
     * Retrieves a single derived request attribute as described in
     * getAttributes(). If the attribute has not been previously set, returns
     * the default value as provided.
     *
     * This method obviates the need for a hasAttribute() method, as it allows
     * specifying a default value to return if the attribute is not found.
     *
     * @see getAttributes()
     * @param string $name The attribute name.
     * @param mixed $default Default value to return if the attribute does not exist.
     * @return mixed
     */
    public function getAttribute($name, $default = null);

    /**
     * Return an instance with the specified derived request attribute.
     *
     * This method allows setting a single derived request attribute as
     * described in getAttributes().
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * updated attribute.
     *
     * @see getAttributes()
     * @param string $name The attribute name.
     * @param mixed $value The value of the attribute.
     * @return static
     */
    public function withAttribute($name, $value);

    /**
     * Return an instance that removes the specified derived request attribute.
     *
     * This method allows removing a single derived request attribute as
     * described in getAttributes().
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that removes
     * the attribute.
     *
     * @see getAttributes()
     * @param string $name The attribute name.
     * @return static
     */
    public function withoutAttribute($name);
}
```
## Psr\Http\Message\ResponseInterface
```
<?php
namespace Psr\Http\Message;

/**
 * Representation of an outgoing, server-side response.
 *
 * Per the HTTP specification, this interface includes properties for
 * each of the following:
 *
 * - Protocol version
 * - Status code and reason phrase
 * - Headers
 * - Message body
 *
 * Responses are considered immutable; all methods that might change state MUST
 * be implemented such that they retain the internal state of the current
 * message and return an instance that contains the changed state.
 */
interface ResponseInterface extends MessageInterface
{
    /**
     * Gets the response status code.
     *
     * The status code is a 3-digit integer result code of the server's attempt
     * to understand and satisfy the request.
     *
     * @return int Status code.
     */
    public function getStatusCode();

    /**
     * Return an instance with the specified status code and, optionally, reason phrase.
     *
     * If no reason phrase is specified, implementations MAY choose to default
     * to the RFC 7231 or IANA recommended reason phrase for the response's
     * status code.
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * updated status and reason phrase.
     *
     * @see http://tools.ietf.org/html/rfc7231#section-6
     * @see http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
     * @param int $code The 3-digit integer result code to set.
     * @param string $reasonPhrase The reason phrase to use with the
     *     provided status code; if none is provided, implementations MAY
     *     use the defaults as suggested in the HTTP specification.
     * @return static
     * @throws \InvalidArgumentException For invalid status code arguments.
     */
    public function withStatus($code, $reasonPhrase = '');

    /**
     * Gets the response reason phrase associated with the status code.
     *
     * Because a reason phrase is not a required element in a response
     * status line, the reason phrase value MAY be empty. Implementations MAY
     * choose to return the default RFC 7231 recommended reason phrase (or those
     * listed in the IANA HTTP Status Code Registry) for the response's
     * status code.
     *
     * @see http://tools.ietf.org/html/rfc7231#section-6
     * @see http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
     * @return string Reason phrase; must return an empty string if none present.
     */
    public function getReasonPhrase();
}
```
## Psr\Http\Message\StreamInterface
```
<?php
namespace Psr\Http\Message;

/**
 * Describes a data stream.
 *
 * Typically, an instance will wrap a PHP stream; this interface provides
 * a wrapper around the most common operations, including serialization of
 * the entire stream to a string.
 */
interface StreamInterface
{
    /**
     * Reads all data from the stream into a string, from the beginning to end.
     *
     * This method MUST attempt to seek to the beginning of the stream before
     * reading data and read the stream until the end is reached.
     *
     * Warning: This could attempt to load a large amount of data into memory.
     *
     * This method MUST NOT raise an exception in order to conform with PHP's
     * string casting operations.
     *
     * @see http://php.net/manual/en/language.oop5.magic.php#object.tostring
     * @return string
     */
    public function __toString();

    /**
     * Closes the stream and any underlying resources.
     *
     * @return void
     */
    public function close();

    /**
     * Separates any underlying resources from the stream.
     *
     * After the stream has been detached, the stream is in an unusable state.
     *
     * @return resource|null Underlying PHP stream, if any
     */
    public function detach();

    /**
     * Get the size of the stream if known.
     *
     * @return int|null Returns the size in bytes if known, or null if unknown.
     */
    public function getSize();

    /**
     * Returns the current position of the file read/write pointer
     *
     * @return int Position of the file pointer
     * @throws \RuntimeException on error.
     */
    public function tell();

    /**
     * Returns true if the stream is at the end of the stream.
     *
     * @return bool
     */
    public function eof();

    /**
     * Returns whether or not the stream is seekable.
     *
     * @return bool
     */
    public function isSeekable();

    /**
     * Seek to a position in the stream.
     *
     * @see http://www.php.net/manual/en/function.fseek.php
     * @param int $offset Stream offset
     * @param int $whence Specifies how the cursor position will be calculated
     *     based on the seek offset. Valid values are identical to the built-in
     *     PHP $whence values for `fseek()`.  SEEK_SET: Set position equal to
     *     offset bytes SEEK_CUR: Set position to current location plus offset
     *     SEEK_END: Set position to end-of-stream plus offset.
     * @throws \RuntimeException on failure.
     */
    public function seek($offset, $whence = SEEK_SET);

    /**
     * Seek to the beginning of the stream.
     *
     * If the stream is not seekable, this method will raise an exception;
     * otherwise, it will perform a seek(0).
     *
     * @see seek()
     * @see http://www.php.net/manual/en/function.fseek.php
     * @throws \RuntimeException on failure.
     */
    public function rewind();

    /**
     * Returns whether or not the stream is writable.
     *
     * @return bool
     */
    public function isWritable();

    /**
     * Write data to the stream.
     *
     * @param string $string The string that is to be written.
     * @return int Returns the number of bytes written to the stream.
     * @throws \RuntimeException on failure.
     */
    public function write($string);

    /**
     * Returns whether or not the stream is readable.
     *
     * @return bool
     */
    public function isReadable();

    /**
     * Read data from the stream.
     *
     * @param int $length Read up to $length bytes from the object and return
     *     them. Fewer than $length bytes may be returned if underlying stream
     *     call returns fewer bytes.
     * @return string Returns the data read from the stream, or an empty string
     *     if no bytes are available.
     * @throws \RuntimeException if an error occurs.
     */
    public function read($length);

    /**
     * Returns the remaining contents in a string
     *
     * @return string
     * @throws \RuntimeException if unable to read.
     * @throws \RuntimeException if error occurs while reading.
     */
    public function getContents();

    /**
     * Get stream metadata as an associative array or retrieve a specific key.
     *
     * The keys returned are identical to the keys returned from PHP's
     * stream_get_meta_data() function.
     *
     * @see http://php.net/manual/en/function.stream-get-meta-data.php
     * @param string $key Specific metadata to retrieve.
     * @return array|mixed|null Returns an associative array if no key is
     *     provided. Returns a specific key value if a key is provided and the
     *     value is found, or null if the key is not found.
     */
    public function getMetadata($key = null);
}
```
## Psr\Http\Message\UriInterface
```
<?php
namespace Psr\Http\Message;

/**
 * Value object representing a URI.
 *
 * This interface is meant to represent URIs according to RFC 3986 and to
 * provide methods for most common operations. Additional functionality for
 * working with URIs can be provided on top of the interface or externally.
 * Its primary use is for HTTP requests, but may also be used in other
 * contexts.
 *
 * Instances of this interface are considered immutable; all methods that
 * might change state MUST be implemented such that they retain the internal
 * state of the current instance and return an instance that contains the
 * changed state.
 *
 * Typically the Host header will also be present in the request message.
 * For server-side requests, the scheme will typically be discoverable in the
 * server parameters.
 *
 * @see http://tools.ietf.org/html/rfc3986 (the URI specification)
 */
interface UriInterface
{
    /**
     * Retrieve the scheme component of the URI.
     *
     * If no scheme is present, this method MUST return an empty string.
     *
     * The value returned MUST be normalized to lowercase, per RFC 3986
     * Section 3.1.
     *
     * The trailing ":" character is not part of the scheme and MUST NOT be
     * added.
     *
     * @see https://tools.ietf.org/html/rfc3986#section-3.1
     * @return string The URI scheme.
     */
    public function getScheme();

    /**
     * Retrieve the authority component of the URI.
     *
     * If no authority information is present, this method MUST return an empty
     * string.
     *
     * The authority syntax of the URI is:
     *
     * <pre>
     * [user-info@]host[:port]
     * </pre>
     *
     * If the port component is not set or is the standard port for the current
     * scheme, it SHOULD NOT be included.
     *
     * @see https://tools.ietf.org/html/rfc3986#section-3.2
     * @return string The URI authority, in "[user-info@]host[:port]" format.
     */
    public function getAuthority();

    /**
     * Retrieve the user information component of the URI.
     *
     * If no user information is present, this method MUST return an empty
     * string.
     *
     * If a user is present in the URI, this will return that value;
     * additionally, if the password is also present, it will be appended to the
     * user value, with a colon (":") separating the values.
     *
     * The trailing "@" character is not part of the user information and MUST
     * NOT be added.
     *
     * @return string The URI user information, in "username[:password]" format.
     */
    public function getUserInfo();

    /**
     * Retrieve the host component of the URI.
     *
     * If no host is present, this method MUST return an empty string.
     *
     * The value returned MUST be normalized to lowercase, per RFC 3986
     * Section 3.2.2.
     *
     * @see http://tools.ietf.org/html/rfc3986#section-3.2.2
     * @return string The URI host.
     */
    public function getHost();

    /**
     * Retrieve the port component of the URI.
     *
     * If a port is present, and it is non-standard for the current scheme,
     * this method MUST return it as an integer. If the port is the standard port
     * used with the current scheme, this method SHOULD return null.
     *
     * If no port is present, and no scheme is present, this method MUST return
     * a null value.
     *
     * If no port is present, but a scheme is present, this method MAY return
     * the standard port for that scheme, but SHOULD return null.
     *
     * @return null|int The URI port.
     */
    public function getPort();

    /**
     * Retrieve the path component of the URI.
     *
     * The path can either be empty or absolute (starting with a slash) or
     * rootless (not starting with a slash). Implementations MUST support all
     * three syntaxes.
     *
     * Normally, the empty path "" and absolute path "/" are considered equal as
     * defined in RFC 7230 Section 2.7.3. But this method MUST NOT automatically
     * do this normalization because in contexts with a trimmed base path, e.g.
     * the front controller, this difference becomes significant. It's the task
     * of the user to handle both "" and "/".
     *
     * The value returned MUST be percent-encoded, but MUST NOT double-encode
     * any characters. To determine what characters to encode, please refer to
     * RFC 3986, Sections 2 and 3.3.
     *
     * As an example, if the value should include a slash ("/") not intended as
     * delimiter between path segments, that value MUST be passed in encoded
     * form (e.g., "%2F") to the instance.
     *
     * @see https://tools.ietf.org/html/rfc3986#section-2
     * @see https://tools.ietf.org/html/rfc3986#section-3.3
     * @return string The URI path.
     */
    public function getPath();

    /**
     * Retrieve the query string of the URI.
     *
     * If no query string is present, this method MUST return an empty string.
     *
     * The leading "?" character is not part of the query and MUST NOT be
     * added.
     *
     * The value returned MUST be percent-encoded, but MUST NOT double-encode
     * any characters. To determine what characters to encode, please refer to
     * RFC 3986, Sections 2 and 3.4.
     *
     * As an example, if a value in a key/value pair of the query string should
     * include an ampersand ("&") not intended as a delimiter between values,
     * that value MUST be passed in encoded form (e.g., "%26") to the instance.
     *
     * @see https://tools.ietf.org/html/rfc3986#section-2
     * @see https://tools.ietf.org/html/rfc3986#section-3.4
     * @return string The URI query string.
     */
    public function getQuery();

    /**
     * Retrieve the fragment component of the URI.
     *
     * If no fragment is present, this method MUST return an empty string.
     *
     * The leading "#" character is not part of the fragment and MUST NOT be
     * added.
     *
     * The value returned MUST be percent-encoded, but MUST NOT double-encode
     * any characters. To determine what characters to encode, please refer to
     * RFC 3986, Sections 2 and 3.5.
     *
     * @see https://tools.ietf.org/html/rfc3986#section-2
     * @see https://tools.ietf.org/html/rfc3986#section-3.5
     * @return string The URI fragment.
     */
    public function getFragment();

    /**
     * Return an instance with the specified scheme.
     *
     * This method MUST retain the state of the current instance, and return
     * an instance that contains the specified scheme.
     *
     * Implementations MUST support the schemes "http" and "https" case
     * insensitively, and MAY accommodate other schemes if required.
     *
     * An empty scheme is equivalent to removing the scheme.
     *
     * @param string $scheme The scheme to use with the new instance.
     * @return static A new instance with the specified scheme.
     * @throws \InvalidArgumentException for invalid schemes.
     * @throws \InvalidArgumentException for unsupported schemes.
     */
    public function withScheme($scheme);

    /**
     * Return an instance with the specified user information.
     *
     * This method MUST retain the state of the current instance, and return
     * an instance that contains the specified user information.
     *
     * Password is optional, but the user information MUST include the
     * user; an empty string for the user is equivalent to removing user
     * information.
     *
     * @param string $user The user name to use for authority.
     * @param null|string $password The password associated with $user.
     * @return static A new instance with the specified user information.
     */
    public function withUserInfo($user, $password = null);

    /**
     * Return an instance with the specified host.
     *
     * This method MUST retain the state of the current instance, and return
     * an instance that contains the specified host.
     *
     * An empty host value is equivalent to removing the host.
     *
     * @param string $host The hostname to use with the new instance.
     * @return static A new instance with the specified host.
     * @throws \InvalidArgumentException for invalid hostnames.
     */
    public function withHost($host);

    /**
     * Return an instance with the specified port.
     *
     * This method MUST retain the state of the current instance, and return
     * an instance that contains the specified port.
     *
     * Implementations MUST raise an exception for ports outside the
     * established TCP and UDP port ranges.
     *
     * A null value provided for the port is equivalent to removing the port
     * information.
     *
     * @param null|int $port The port to use with the new instance; a null value
     *     removes the port information.
     * @return static A new instance with the specified port.
     * @throws \InvalidArgumentException for invalid ports.
     */
    public function withPort($port);

    /**
     * Return an instance with the specified path.
     *
     * This method MUST retain the state of the current instance, and return
     * an instance that contains the specified path.
     *
     * The path can either be empty or absolute (starting with a slash) or
     * rootless (not starting with a slash). Implementations MUST support all
     * three syntaxes.
     *
     * If an HTTP path is intended to be host-relative rather than path-relative
     * then it must begin with a slash ("/"). HTTP paths not starting with a slash
     * are assumed to be relative to some base path known to the application or
     * consumer.
     *
     * Users can provide both encoded and decoded path characters.
     * Implementations ensure the correct encoding as outlined in getPath().
     *
     * @param string $path The path to use with the new instance.
     * @return static A new instance with the specified path.
     * @throws \InvalidArgumentException for invalid paths.
     */
    public function withPath($path);

    /**
     * Return an instance with the specified query string.
     *
     * This method MUST retain the state of the current instance, and return
     * an instance that contains the specified query string.
     *
     * Users can provide both encoded and decoded query characters.
     * Implementations ensure the correct encoding as outlined in getQuery().
     *
     * An empty query string value is equivalent to removing the query string.
     *
     * @param string $query The query string to use with the new instance.
     * @return static A new instance with the specified query string.
     * @throws \InvalidArgumentException for invalid query strings.
     */
    public function withQuery($query);

    /**
     * Return an instance with the specified URI fragment.
     *
     * This method MUST retain the state of the current instance, and return
     * an instance that contains the specified URI fragment.
     *
     * Users can provide both encoded and decoded fragment characters.
     * Implementations ensure the correct encoding as outlined in getFragment().
     *
     * An empty fragment value is equivalent to removing the fragment.
     *
     * @param string $fragment The fragment to use with the new instance.
     * @return static A new instance with the specified fragment.
     */
    public function withFragment($fragment);

    /**
     * Return the string representation as a URI reference.
     *
     * Depending on which components of the URI are present, the resulting
     * string is either a full URI or relative reference according to RFC 3986,
     * Section 4.1. The method concatenates the various components of the URI,
     * using the appropriate delimiters:
     *
     * - If a scheme is present, it MUST be suffixed by ":".
     * - If an authority is present, it MUST be prefixed by "//".
     * - The path can be concatenated without delimiters. But there are two
     *   cases where the path has to be adjusted to make the URI reference
     *   valid as PHP does not allow to throw an exception in __toString():
     *     - If the path is rootless and an authority is present, the path MUST
     *       be prefixed by "/".
     *     - If the path is starting with more than one "/" and no authority is
     *       present, the starting slashes MUST be reduced to one.
     * - If a query is present, it MUST be prefixed by "?".
     * - If a fragment is present, it MUST be prefixed by "#".
     *
     * @see http://tools.ietf.org/html/rfc3986#section-4.1
     * @return string
     */
    public function __toString();
}
```
## Psr\Http\Message\UploadedFileInterface
```
<?php
namespace Psr\Http\Message;

/**
 * Value object representing a file uploaded through an HTTP request.
 *
 * Instances of this interface are considered immutable; all methods that
 * might change state MUST be implemented such that they retain the internal
 * state of the current instance and return an instance that contains the
 * changed state.
 */
interface UploadedFileInterface
{
    /**
     * Retrieve a stream representing the uploaded file.
     *
     * This method MUST return a StreamInterface instance, representing the
     * uploaded file. The purpose of this method is to allow utilizing native PHP
     * stream functionality to manipulate the file upload, such as
     * stream_copy_to_stream() (though the result will need to be decorated in a
     * native PHP stream wrapper to work with such functions).
     *
     * If the moveTo() method has been called previously, this method MUST raise
     * an exception.
     *
     * @return StreamInterface Stream representation of the uploaded file.
     * @throws \RuntimeException in cases when no stream is available.
     * @throws \RuntimeException in cases when no stream can be created.
     */
    public function getStream();

    /**
     * Move the uploaded file to a new location.
     *
     * Use this method as an alternative to move_uploaded_file(). This method is
     * guaranteed to work in both SAPI and non-SAPI environments.
     * Implementations must determine which environment they are in, and use the
     * appropriate method (move_uploaded_file(), rename(), or a stream
     * operation) to perform the operation.
     *
     * $targetPath may be an absolute path, or a relative path. If it is a
     * relative path, resolution should be the same as used by PHP's rename()
     * function.
     *
     * The original file or stream MUST be removed on completion.
     *
     * If this method is called more than once, any subsequent calls MUST raise
     * an exception.
     *
     * When used in an SAPI environment where $_FILES is populated, when writing
     * files via moveTo(), is_uploaded_file() and move_uploaded_file() SHOULD be
     * used to ensure permissions and upload status are verified correctly.
     *
     * If you wish to move to a stream, use getStream(), as SAPI operations
     * cannot guarantee writing to stream destinations.
     *
     * @see http://php.net/is_uploaded_file
     * @see http://php.net/move_uploaded_file
     * @param string $targetPath Path to which to move the uploaded file.
     * @throws \InvalidArgumentException if the $targetPath specified is invalid.
     * @throws \RuntimeException on any error during the move operation.
     * @throws \RuntimeException on the second or subsequent call to the method.
     */
    public function moveTo($targetPath);

    /**
     * Retrieve the file size.
     *
     * Implementations SHOULD return the value stored in the "size" key of
     * the file in the $_FILES array if available, as PHP calculates this based
     * on the actual size transmitted.
     *
     * @return int|null The file size in bytes or null if unknown.
     */
    public function getSize();

    /**
     * Retrieve the error associated with the uploaded file.
     *
     * The return value MUST be one of PHP's UPLOAD_ERR_XXX constants.
     *
     * If the file was uploaded successfully, this method MUST return
     * UPLOAD_ERR_OK.
     *
     * Implementations SHOULD return the value stored in the "error" key of
     * the file in the $_FILES array.
     *
     * @see http://php.net/manual/en/features.file-upload.errors.php
     * @return int One of PHP's UPLOAD_ERR_XXX constants.
     */
    public function getError();

    /**
     * Retrieve the filename sent by the client.
     *
     * Do not trust the value returned by this method. A client could send
     * a malicious filename with the intention to corrupt or hack your
     * application.
     *
     * Implementations SHOULD return the value stored in the "name" key of
     * the file in the $_FILES array.
     *
     * @return string|null The filename sent by the client or null if none
     *     was provided.
     */
    public function getClientFilename();

    /**
     * Retrieve the media type sent by the client.
     *
     * Do not trust the value returned by this method. A client could send
     * a malicious media type with the intention to corrupt or hack your
     * application.
     *
     * Implementations SHOULD return the value stored in the "type" key of
     * the file in the $_FILES array.
     *
     * @return string|null The media type sent by the client or null if none
     *     was provided.
     */
    public function getClientMediaType();
}
```
# Tham khảo
https://www.php-fig.org/psr/psr-7/