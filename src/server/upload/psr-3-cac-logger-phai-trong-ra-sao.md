Bài viết này sẽ nhằm đưa ra 1 khung chung cho các thư viện log.

Mục đích chính là cho phép các thư viện nhận được 1 đối tượng `Psr\Log\LoggerInterface` và viết vào trong đó log 1 cách tổng quan và dễ dàng. Các Framework và CMS có nhu cầu tùy chỉnh theo mục đích riêng CÓ THỂ mở rộng interface này, nhưng NÊN giữ nguyên sự tương thích với tài liệu này. Điều này sẽ đảm bảo cho thư viện của bên thứ 3 khi được sử dụng sẽ được ghi tập trung vào log của ứng dụng.

Trong doc này, người cài đặt ám chỉ người cài đặt `LoggerInterface` trong 1 framework hay thư viện có sử dụng log. Còn người dùng lẫn người ghi log ở đây đều được gọi là người dùng .
# Đặc điểm kỹ thuật
## Căn bản
- `LoggerInterface` có 8 phương thức để viết log, tương đương với 8 cấp độ của RFC 5424 (debug, thông tin, lưu ý, cảnh báo, báo lỗi, nghiêm trọng, báo động, khẩn cấp).
- Phương thức thứ 9 - `log`, sẽ nhận cấp độ log như tham số đầu tiên. Gọi phương thức này với 1 hằng số cấp độ log phải cho kết quả tương đương như việc gọi phương thức cấp độ cụ thể. Gọi phương thức này với một cấp độ không được xác định bởi đặc điểm kỹ thuật này PHẢI ném một `Psr\Log\InvalidArgumentException` nếu việc cài đặt không biết mức độ như thế nào. Nếu như người dùng ở đây không biết chắc chắn mức độ được tùy chỉnh riêng có được hỗ trợ bởi việc cài đặt không thì KHÔNG NÊN dùng.

## Thông điệp
- Mỗi phương thức chấp nhận một chuỗi như là thông điệp, hoặc một đối tượng với một phương thức `__toString()`. Người cài đặt CÓ THỂ xử lý đặc biệt đối với các đối tượng được truyền. Nếu không xử lý đặc biệt, người cài đặt PHẢI xuất nó ra một chuỗi.
- Thông điệp CÓ THỂ chứa các placeholder mà sau này người cài đặt CÓ THỂ thay thế bằng giá trị từ mảng ngữ cảnh.

Placeholder PHẢI phản hồi cho các khóa của mảng ngữ cảnh.

Tên placeholder phải được phân tách bằng 1 dấu ngoặc nhọn đơn mở `{` và 1 dấu ngoặc nhọn đơn đóng `}`. KHÔNG ĐƯỢC có khoảng trắng giữa tên placeholder và phần phân tách.

Placeholder chỉ NÊN dùng các kí tự `A-Z`, `a-z`, `0-9`, `_` và `.`. Việc sử dụng các ký tự khác được dành riêng cho các sửa đổi trong tương lai của đặc tả placeholder.

Người cài đặt CÓ THỂ dùng placeholder để cài đặt các thuật toán thoát ra và biên dịch log để hiển thị. Người dùng KHÔNG NÊN bỏ qua các giá trị placeholder trước khi đọc vì họ không thể biết được ngữ cảnh nào dữ liệu sẽ được hiển thị.
```
<?php

/**
 * Interpolates context values into the message placeholders.
 */
function interpolate($message, array $context = array())
{
    // build a replacement array with braces around the context keys
    $replace = array();
    foreach ($context as $key => $val) {
        // check that the value can be casted to string
        if (!is_array($val) && (!is_object($val) || method_exists($val, '__toString'))) {
            $replace['{' . $key . '}'] = $val;
        }
    }

    // interpolate replacement values into the message and return
    return strtr($message, $replace);
}

// a message with brace-delimited placeholder names
$message = "User {username} created";

// a context array of placeholder names => replacement values
$context = array('username' => 'bolivar');

// echoes "User bolivar created"
echo interpolate($message, $context);
```
## Ngữ cảnh
- Mỗi phương thức chấp nhận một mảng như dữ liệu ngữ cảnh. Điều này có nghĩa là giữ bất kỳ thông tin không liên quan nào không phù hợp trong chuỗi. Mảng có thể chứa bất cứ thứ gì. Những người cài đặt PHẢI đảm bảo họ xử lý dữ liệu ngữ cảnh với càng nhiều sự nới lỏng càng tốt. Giá trị đã cho trong ngữ cảnh KHÔNG ĐƯỢC đưa ra ngoại lệ hay bất kỳ lỗi, cảnh báo hoặc thông báo nào về php.
- Nếu một đối tượng `Exception` được truyền trong dữ liệu ngữ cảnh, nó PHẢI ở khóa `'exception'`. Ghi log các ngoại lệ là một mẫu phổ biến và điều này cho phép người triển khai trích xuất theo dõi ngăn xếp các ngoại lệ khi backend của log hỗ trợ điều đó. Người cài đặt PHẢI xác minh rằng khóa `'exception'` thực sự là một `Exception` trước khi sử dụng nó theo cách như vậy, vì nó CÓ THỂ chứa bất cứ điều gì.
## Các lớp và giao diện hỗ trợ
- Lớp `Psr\Log\AbstractLogger` cho phép bạn thực hiện `LoggerInterface` rất dễ dàng bằng cách mở rộng nó và thực hiện phương thức `log` chung. Tám phương thức khác chuyển tiếp thông điệp và ngữ cảnh đến nó.
- Tương tự, lớp `Psr\Log\LoggerTrait` chỉ yêu cầu cài đặt phương thức `log` chung. Tuy nhiên vì trait này không thể tự cài interface nên bạn phải tự cài `LoggerInterface`.
- `Psr\Log\NullLogger` được cung cấp cùng với giao diện. Nó CÓ THỂ được sử dụng bởi người sử dụng giao diện để cung cấp một "lỗ đen" quay lại nếu không có trình ghi log. Tuy nhiên, log có điều kiện sẽ là cách tiếp cận tốt hơn nếu chi phí tạo dữ liệu ngữ cảnh quá cao.
- `Psr\Log\LoggerAwareInterface` chỉ chứa một phương thức `setLogger(LoggerInterface $logger)` và có thể được sử dụng bởi các framework để tự động nối các cá thể tùy ý với một trình ghi log.
- `Psr\Log\LoggerAwareTrait` có thể được sử dụng để thực hiện giao diện tương đương dễ dàng trong bất kỳ lớp nào. Cho phép truy cập `$this->logger`.
- `Psr\Log\LogLevel` chứa 8 cấp độ log.
# Gói
1 phần của gói [psr/log](https://packagist.org/packages/psr/log), gồm các giao diện, các lớp đã mô tả ở trên cũng như các lớp ngoại lệ có liên quan và một bộ kiểm thử được cung cấp để kiểm tra việc cài đặt.
# Psr\Log\LoggerInterface
```
<?php

namespace Psr\Log;

/**
 * Describes a logger instance
 *
 * The message MUST be a string or object implementing __toString().
 *
 * The message MAY contain placeholders in the form: {foo} where foo
 * will be replaced by the context data in key "foo".
 *
 * The context array can contain arbitrary data, the only assumption that
 * can be made by implementors is that if an Exception instance is given
 * to produce a stack trace, it MUST be in a key named "exception".
 *
 * See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
 * for the full interface specification.
 */
interface LoggerInterface
{
    /**
     * System is unusable.
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function emergency($message, array $context = array());

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function alert($message, array $context = array());

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function critical($message, array $context = array());

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function error($message, array $context = array());

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function warning($message, array $context = array());

    /**
     * Normal but significant events.
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function notice($message, array $context = array());

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function info($message, array $context = array());

    /**
     * Detailed debug information.
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function debug($message, array $context = array());

    /**
     * Logs with an arbitrary level.
     *
     * @param mixed $level
     * @param string $message
     * @param array $context
     * @return void
     */
    public function log($level, $message, array $context = array());
}
```
# Psr\Log\LoggerAwareInterface
```
<?php

namespace Psr\Log;

/**
 * Describes a logger-aware instance
 */
interface LoggerAwareInterface
{
    /**
     * Sets a logger instance on the object
     *
     * @param LoggerInterface $logger
     * @return void
     */
    public function setLogger(LoggerInterface $logger);
}
```
# Psr\Log\LogLevel
```
<?php

namespace Psr\Log;

/**
 * Describes log levels
 */
class LogLevel
{
    const EMERGENCY = 'emergency';
    const ALERT     = 'alert';
    const CRITICAL  = 'critical';
    const ERROR     = 'error';
    const WARNING   = 'warning';
    const NOTICE    = 'notice';
    const INFO      = 'info';
    const DEBUG     = 'debug';
}
```
# Tài liệu tham khảo
https://www.php-fig.org/psr/psr-3/