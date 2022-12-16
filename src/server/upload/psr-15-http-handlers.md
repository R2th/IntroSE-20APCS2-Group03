Tài liệu này mô tả các giao diện chung cho các trình xử lý yêu cầu máy chủ HTTP ("trình xử lý yêu cầu") và các thành phần phần mềm trung gian máy chủ HTTP (“phần mềm trung gian”) sử dụng các thông báo HTTP như được mô tả bởi [PSR-7](https://viblo.asia/p/psr-7-interface-cua-cac-thong-diep-http-LzD5dBWYZjY) hoặc các PSR thay thế tiếp theo.

Trình xử lý yêu cầu HTTP là một phần cơ bản của bất kỳ ứng dụng web nào. Mã phía máy chủ nhận được một thông điệp yêu cầu, xử lý nó và tạo ra một thông báo phản hồi. Middleware HTTP là một cách để di chuyển yêu cầu chung và xử lý phản hồi ra khỏi tầng ứng dụng.

Các interface được mô tả trong tài liệu này là các abstraction cho các trình xử lý yêu cầu và middleware.
# 1. Đặc tả
## 1.1. Các handler yêu cầu
Trình xử lý yêu cầu là một thành phần riêng lẻ xử lý một yêu cầu và tạo ra một phản hồi, như được định nghĩa bởi PSR-7.

Trình xử lý yêu cầu CÓ THỂ ném một ngoại lệ nếu các điều kiện yêu cầu ngăn không cho nó tạo ra phản hồi. Loại ngoại lệ không được xác định.

Yêu cầu các trình xử lý sử dụng tiêu chuẩn này PHẢI thực hiện giao diện sau: `Psr\Http\Server\RequestHandlerInterface`
## 1.2. Middleware
Một component middleware là một component riêng lẻ tham gia, thường cùng với các component middleware khác, trong việc xử lý một yêu cầu đến và tạo ra một đáp ứng kết quả, như được định nghĩa bởi PSR-7.

Một component middleware CÓ THỂ tạo và trả về một phản hồi mà không ủy thác cho một trình xử lý yêu cầu, nếu đủ điều kiện được đáp ứng.

Middleware sử dụng tiêu chuẩn này PHẢI thực hiện giao diện sau:`Psr\Http\Server\MiddlewareInterface`
## 1.3. Tạo ra phản hồi
Tất cả mọi người được KHUYẾN KHÍCH rằng bất kỳ middleware hoặc trình xử lý yêu cầu nào tạo ra một phản hồi hoặc sẽ tạo một mẫu thử nghiệm của `ResponseInterface` theo PSR-7 hoặc một factory có khả năng tạo ra một instance `ResponseInterface` để ngăn chặn sự phụ thuộc vào việc thực hiện thông điệp HTTP cụ thể.
## 1.4. Xử lý ngoại lệ
Tất cả mọi người được KHUYẾN KHÍCH rằng bất kỳ ứng dụng nào sử dụng middleware bao gồm một component nhận các ngoại lệ và chuyển đổi chúng thành các phản hồi. Middleware này NÊN là component đầu tiên được thực thi và đóng gói tất cả các xử lý tiếp theo để đảm bảo rằng một phản hồi luôn được tạo ra.
# 2. Các Interface
## 2.1 Psr\Http\Server\RequestHandlerInterface
Interface sau PHẢI được thực hiện bởi các trình xử lý yêu cầu.
```php
namespace Psr\Http\Server;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Handles a server request and produces a response
 *
 * An HTTP request handler process an HTTP request in order to produce an
 * HTTP response.
 */
interface RequestHandlerInterface
{
    /**
     * Handles a request and produces a response
     *
     * May call other collaborating code to generate the response.
     */
    public function handle(ServerRequestInterface $request): ResponseInterface;
}
```
## 2.2 Psr\Http\Server\MiddlewareInterface
Interface sau PHẢI được thực hiện bởi các thành phần middleware tương thích.
```php
namespace Psr\Http\Server;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Participant in processing a server request and response
 *
 * An HTTP middleware component participates in processing an HTTP message:
 * by acting on the request, generating the response, or forwarding the
 * request to a subsequent middleware and possibly acting on its response.
 */
interface MiddlewareInterface
{
    /**
     * Process an incoming server request
     *
     * Processes an incoming server request in order to produce a response.
     * If unable to produce the response itself, it may delegate to the provided
     * request handler to do so.
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface;
}
```
# Tham khảo
https://www.php-fig.org/psr/psr-15/