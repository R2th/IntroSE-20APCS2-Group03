Trong các bài trước, chúng ta đã biết viết một số unit test cơ bản, biết cách sử dụng annotation `@dataProvider`, tạo báo cáo và sử dụng một số assertions.

Các unit test cho đến bây giờ vẫn còn rất đơn giản, chỉ là test các điều kiện `if/else` hay các method trong cùng class. Cách tiếp cận này giúp chúng ta dễ hiểu hơn khi mới bắt đầu, tuy nhiên trong thực tế ít khi ta bắt gặp các trường hợp đơn giản như vậy, điều bạn sẽ thường gặp đó là các method của đối tượng này gọi đến method của đối tượng khác, các method static, hoặc các đối tượng được truyền qua parameter (dependency injection).

Trong bài viết này, tôi sẽ đề cập nhiều hơn về một số khái niệm nâng cao trong unit test, với ví dụ code mà có lẽ đã khá quen thuộc với chúng ta đó là: sử dụng API từ bên thứ ba, cụ thể ở đây là API của Authorize.net.

### Vấn đề
Đầu tiên, chúng ta sẽ tiến hành cài đặt thư việc của Authorize.net:
```sh
composer require ajbdev/authorizenet-php-api
```

Tiếp theo, bạn hãy tạo file `src/Payment.php` và paste đoạn code sau:
```php
<?php

namespace App;

use AuthorizeNetAIM;
use Exception;

class Payment
{
    const API_ID = 123456;
    const TRANS_KEY = 'TRANSACTION KEY';

    public function processPayment(array $paymentDetails)
    {
        $transaction = new AuthorizeNetAIM(self::API_ID, self::TRANS_KEY);
        $transaction->amount = $paymentDetails['amount'];
        $transaction->card_num = $paymentDetails['card_num'];
        $transaction->exp_date = $paymentDetails['exp_date'];

        $response = $transaction->authorizeAndCapture();

        if ($response->approved) {
            return $this->savePayment($response->transaction_id);
        } else {
            throw new Exception($response->error_message);
        }
    }

    public function savePayment($transactionId)
    {
        // Logic for saving transaction ID to database or anywhere else would go in here
        return true;
    }
}
```
Đoạn code này trông có vẻ khá đơn giản, nhưng nó không thể test được. Bạn sẽ sớm biết được lý do tại sao.

Tiếp theo, sẽ là file test case `tests/PaymentTest.php`:
```php
<?php

namespace Tests;

use App\Payment;
use TestCase;

class PaymentTest extends TestCase
{
    //
}
```

Trước khi viết test case đầu tiên, hãy nghĩ xem chúng ta cần test những gì từ đoạn code đã cho.

Hai trường hợp rõ ràng đó là:

- Trường hợp `$response->approved` trả về `true`, sẽ dẫn đến lời gọi hàm `::savePayment()` (hiện đang trả về `true`)
- Trường hợp `$response->approved` trả về `false`, sẽ ném ra 1 Exception.

Theo cách làm từ trước đến nay, chúng ta có 1 test case như sau: truyền vào parameter cho method và expected method return `true`
```php
public function testProcessPaymentReturnsTrueOnSuccessfulPayment()
{
    $paymentDetails = array(
        'amount'   => 123.99,
        'card_num' => '4111-1111-1111-1111',
        'exp_date' => '03/2013',
    );

    $payment = new Payment();
    $result = $payment->processPayment($paymentDetails);

    $this->assertTrue($result);
}
```

Thử chạy phpunit và fail, tất nhiên rồi, nhưng vấn đề gì đã xảy ra?
![](https://images.viblo.asia/ef68cfe3-2f70-40cd-ab0c-69a48887d6ab.png)

Authorize.net trả về message lỗi: "The merchant login ID or password is invalid or the account is inactive."!

Vậy thì ta có thể đăng ký 1 tài khoản hợp lệ trên Authorize.net và sửa lại input trong test case?

Ok, điều này có thể giải quyết vấn đề, nhưng vấn đề khác lại sinh ra: Nếu bạn xem chi tiết bên trong class `AuthorizeNetAIM`, bạn sẽ để ý thấy độ phức tạp sẽ tăng lên nhanh chóng - method này gọi method kia, method kia lại gọi thêm nhiều method khác nữa. Thậm chí có cả 1 đoạn dùng `cURL` để connect đến server Authorize.net.
Điều gì sẽ xảy ra nến server Authorize.net không hoạt động hoặc mạng Internet bị sập khi ta đang chạy unit test?

Tại sao chúng ta lại lo lắng quá nhiều về điều gì sẽ xảy ra trong class bên ngoài? Vì chúng ta không muốn phụ thuộc vào một mã nguồn bên ngoài mà không thuộc phạm vi điều khiển của chúng ta. Nhưng chắc phải có cách nào đó tốt hơn chứ...?


### Mock object
PHPUnit cung cấp tính năng hỗ trợ chúng ta xử lý các denpendency bên ngoài. Về cơ bản đó là thay thế đối tượng thật bằng một đối tượng giả (gọi là `fake` hoặc `mock object`) mà chúng ta có toàn quyền kiểm soát, loại bỏ mọi phụ thuộc vào hệ thống hoặc code bên ngoài mà chúng ta không cần phải test.

Chúng ta đã biết method `::authorizeAndCapture()` trong lớp  `AuthorizeNetAIM` gây ra cho code unit test của chúng ta một vấn đề lớn đó là nó gọi đến 1 hệ thống server bên ngoài.

Nhưng, vẫn còn một vấn đề đó là làm thế nào để truyền vào mock object vào method đang test, khi mà đối tượng `AuthorizeNetAIM` đang được khởi tạo bên trong method:
```php
public function processPayment(array $paymentDetails)
{
    $transaction = new AuthorizeNetAIM(self::API_ID, self::TRANS_KEY);
    // ...
}
```

#### Dependency Injection
Có một kỹ thuật gọi là `Dependency Injection`, nghe tên có vẻ hơi lạ nhưng thực ra nó là một kỹ thuật vô cùng đơn giản. 

Thay vì sử dụng `new` để khởi tạo đối tượng bên trong method của bạn, chúng ta sẽ truyền đối tượng đó vào method thông qua tham số của method:
Ví dụ, từ đoạn code:
```php
public function processPayment(array $paymentDetails)
{
    $transaction = new AuthorizeNetAIM(self::API_ID, self::TRANS_KEY);
    $transaction->amount = $paymentDetails['amount'];
    $transaction->card_num = $paymentDetails['card_num'];
    $transaction->exp_date = $paymentDetails['exp_date'];

    $response = $transaction->authorizeAndCapture();

    if ($response->approved) {
        return $this->savePayment($response->transaction_id);
    }

    throw new Exception($response->error_message);
}
```
sẽ được chuyển thành:
```php
public function processPayment(AuthorizeNetAIM $transaction, array $paymentDetails)
{
    $transaction->amount = $paymentDetails['amount'];
    $transaction->card_num = $paymentDetails['card_num'];
    $transaction->exp_date = $paymentDetails['exp_date'];

    $response = $transaction->authorizeAndCapture();

    if ($response->approved) {
        return $this->savePayment($response->transaction_id);
    }

    throw new Exception($response->error_message);
}
```

Có nghĩa là bạn đang _đẩy trách nhiệm_ khởi tạo đối tượng `AuthorizeNetAIM` ra bên ngoài class `Payment`. 
Bạn có thể tìm hiểu thêm về Dependency Injection ở blog của tác giả [Fabien Potencier](http://fabien.potencier.org/what-is-dependency-injection.html).

Kỹ thuật đơn giản nhưng mang lại rất nhiều lợi ích.

#### Nhưng tại sao sử dụng dependency injection
Chúng ta đang muốn thay thế object thật với một mock object mà đúng không? Thế thì bạn sẽ làm thế nào khi mà code của bạn đang tự tạo ra object đó:
```php
$transaction = new \AuthorizeNetAIM(self::API_ID, self::TRANS_KEY);
```
Câu trả lời ngắn gọn đó là: *Không thể làm được*.

Dài dòng hơn thì: bạn có thể, "giải pháp" ở đây là [runkit](http://php.net/manual/en/book.runkit.php), tuy nhiên đó là một ý tưởng tồi và nên tránh trong mọi trường hợp. 

Runkit cho phép bạn thay thế code trong lúc thự thi, nghe có vẻ đúng thứ chúng ta cần đúng không? Thay thế object thật bằng mock object? Runkit sử dụng một kỹ thuật gọi là [monkey patching](http://en.wikipedia.org/wiki/Monkey_patch) và để xem tại sao nó lại là ý tưởng tồi, bạn hãy xem bài viết này ==> [link](https://www.littlehart.net/atthekeyboard/2012/07/13/monkey-patching-is-for-closers/).

Một lần nữa, chúng ta quay lại với câu trả lời "_Không thể làm được_".

Vì vậy, cách giải quyết ở đây là truyền object vào parameter của method: `public function processPayment(AuthorizeNetAIM $transaction, array $paymentDetails)`. Với [type hint](http://php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration) là `AuthorizeNetAIM $transaction` có nghĩa chúng ta có cần truyền vào object thoả mãn quan hệ `is_a`: object thuộc class này hoặc có class này là class cha ông.

Các class kế thừa class `AuthorizeNetAIM` sẽ thoả mãn điều này. Vậy thì đơn giản, chúng ta chỉ cần tạo 1 class mới `AuthorizeNetAIMFake` extends `AuthorizeNetAIM` và override tất cả method để return về các giá trị chúng ta mong muốn. Điều này thực sự không phải là một ý tưởng tồi và thực tế nó áp dụng tốt cho các bộ mã nguồn nhỏ. Nhưng điều gì sẽ xảy ra khi bạn có 5 rồi 10 hay 50 hoặc hàng trăm... class cần phải override. Bạn có thực sự muốn tạo ra và maintain hàng trăm file chẳng có chức năng gì ngoài việc extends 1 lớp khác và override tất cả method. Phải có cách nào đó tốt hơn.

#### PHPUnit Mock helper
Với việc thay đổi source code theo dependency injection, unit test của chúng ta bây giờ sẽ trông như thế này:
```php
<?php

namespace Tests;

use App\Payment;
use AuthorizeNetAIM;
use PHPUnit\Framework\TestCase;

class PaymentTest extends TestCase
{
    public function testProcessPaymentReturnsTrueOnSuccessfulPayment()
    {
        $paymentDetails = array(
            'amount'   => 123.99,
            'card_num' => '4111-1111-1111-1111',
            'exp_date' => '03/2013',
        );

        $payment = new Payment();

        $authorizeNet = new AuthorizeNetAIM(Payment::API_ID, Payment::TRANS_KEY);

        $result = $payment->processPayment($authorizeNet, $paymentDetails);

        $this->assertTrue($result);
    }
}
```
Vấn đề với code này là nó vẫn phụ thuộc vào class `AuthorizeNetAIM`, nhưng chúng ta không muốn tạo 1 class trống `AuthorizeNetAIMFake` để giải quyết vấn đề này. Vậy làm gì bây giờ?

PHPUnit cung cấp một phương thức hữu ích đó là `getMockBuilder`, nó cho phép bạn tạo 1 class mới thoả mãn điều kiện trên ngay khi đang chạy test mà không phải tạo file mới cho mỗi class.
```php
$authorizeNet = $this->getMockBuilder(AuthorizeNetAIM::class)
    ->setConstructorArgs([Payment::API_ID, Payment::TRANS_KEY])
    ->getMock();
```

Thử kiểm tra xem bên trong đối tượng mới này có gì với `var_dump($authorizeNet);`, ta thấy nó rất giống với class ban đầu:
```php
class Mock_AuthorizeNetAIM_084f7b20#17 (12) {
    private $__phpunit_invocationMocker => NULL
    protected $_x_post_fields           => array(5) {
        'version'        => string(3) "3.1"
        'delim_char'     => string(1) ","
        'delim_data'     => string(4) "TRUE"
        'relay_response' => string(5) "FALSE"
        'encap_char'     => string(1) "|"
    }
    private $_additional_line_items => array(0) {}
    protected $_custom_fields       => array(0) {}
    public $verify_x_fields         => bool(true)
    private $_all_aim_fields        => array(61) {
        [0]  => string(7) "address"
        [1]  => string(18) "allow_partial_auth"
        [2]  => string(6) "amount"
        [3]  => string(9) "auth_code"
        [4]  => string(24) "authentication_indicator"
        [5]  => string(13) "bank_aba_code"
        [6]  => string(14) "bank_acct_name"
        [7]  => string(13) "bank_acct_num"
        [8]  => string(14) "bank_acct_type"
        [9]  => string(17) "bank_check_number"
        [10] => string(9) "bank_name"
        [11] => string(9) "card_code"
        [12] => string(8) "card_num"
        [13] => string(31) "cardholder_authentication_value"
        [14] => string(4) "city"
        [15] => string(7) "company"
        [16] => string(7) "country"
        [17] => string(7) "cust_id"
        [18] => string(11) "customer_ip"
        [19] => string(10) "delim_char"
        [20] => string(10) "delim_data"
        [21] => string(11) "description"
        [22] => string(16) "duplicate_window"
        [23] => string(4) "duty"
        [24] => string(11) "echeck_type"
        [25] => string(5) "email"
        [26] => string(14) "email_customer"
        [27] => string(10) "encap_char"
        [28] => string(8) "exp_date"
        [29] => string(3) "fax"
        [30] => string(10) "first_name"
        [31] => string(20) "footer_email_receipt"
        [32] => string(7) "freight"
        [33] => string(20) "header_email_receipt"
        [34] => string(11) "invoice_num"
        [35] => string(9) "last_name"
        [36] => string(9) "line_item"
        [37] => string(5) "login"
        [38] => string(6) "method"
        [39] => string(5) "phone"
        [40] => string(6) "po_num"
        [41] => string(17) "recurring_billing"
        [42] => string(14) "relay_response"
        [43] => string(15) "ship_to_address"
        [44] => string(12) "ship_to_city"
        [45] => string(15) "ship_to_company"
        [46] => string(15) "ship_to_country"
        [47] => string(18) "ship_to_first_name"
        [48] => string(17) "ship_to_last_name"
        [49] => string(13) "ship_to_state"
        [50] => string(11) "ship_to_zip"
        [51] => string(15) "split_tender_id"
        [52] => string(5) "state"
        [53] => string(3) "tax"
        [54] => string(10) "tax_exempt"
        [55] => string(12) "test_request"
        [56] => string(8) "tran_key"
        [57] => string(8) "trans_id"
        [58] => string(4) "type"
        [59] => string(7) "version"
        [60] => string(3) "zip"
    }
    protected $_api_login       => int(123456)
    protected $_transaction_key => string(15) "TRANSACTION KEY"
    protected $_post_string     => NULL
    public $VERIFY_PEER         => bool(true)
    protected $_sandbox         => bool(true)
    protected $_log_file        => bool(false)
}
```

Các method của nó cũng có tương ứng với class ban đầu, `print_r(get_class_methods($authorizeNet));`:
```php
[0] => __clone
[1] => authorizeAndCapture
[2] => priorAuthCapture
[3] => authorizeOnly
[4] => void
[5] => captureOnly
[6] => credit
[7] => __set
[8] => setFields
[9] => setCustomFields
[10] => addLineItem
[11] => setECheck
[12] => setField
[13] => setCustomField
[14] => unsetField
[15] => setSandbox
[16] => setLogFile
[17] => getPostString
[18] => expects
[19] => staticExpects
[20] => __phpunit_getInvocationMocker
[21] => __phpunit_getStaticInvocationMocker
[22] => __phpunit_hasMatchers
[23] => __phpunit_verify
[24] => __phpunit_cleanup
[25] => __construct
```
Tuy nhiên, có 1 ngoại lệ đó là tất cả method của mock object đều trả về `null`.
Những method này được gọi là `stubs`!

### Stub method

Stub method là một method bắt chước hành vi của method ban đầu theo 2 tiêu chí: cùng tên và cùng parameters. Điểm khác biệt của stub method là tất cả code logic bên trong sẽ bị loại bỏ.

Ví dụ, đây là method ban đầu từ class `AuthorizeNetAIM`:
```php
public function authorizeAndCapture($amount = false, $card_num = false, $exp_date = false)
{
    ($amount ? $this->amount = $amount : null);
    ($card_num ? $this->card_num = $card_num : null);
    ($exp_date ? $this->exp_date = $exp_date : null);
    $this->type = "AUTH_CAPTURE";
    return $this->_sendRequest();
}
```
Một stub method có thể như sau:
```php
public function authorizeAndCapture($amount = false, $card_num = false, $exp_date = false)
{
    return null;
}
```

Tất cả method trong mock object là stub method và tất cả đều return null.

Lợi ích của stub method ở đây là method `authorizeAndCapture()` không còn gửi request đến server `Authorize.net` nữa. Thay vào đó nó luôn return giá trị null mỗi khi được gọi đến.

Thêm một bước tiến: **Bây giờ bạn đã có thể overridden giá trị trả về của 1 method bằng stub method bên trong unit test**.

Giá trị trả về có thể là bất kỳ - null, string, array, integers, các object khác hoặc thậm chí là mock object. Tuy nhiên, chúng ta sẽ đi chi tiết hơn về stub method trong bài tiếp theo.

Bây giờ, code unit test của chúng ta sẽ như sau:
```php
<?php

namespace Tests;

use App\Payment;
use AuthorizeNetAIM;
use PHPUnit\Framework\TestCase;

class PaymentTest extends TestCase
{
    public function testProcessPaymentReturnsTrueOnSuccessfulPayment()
    {
        $paymentDetails = [
            'amount'   => 123.99,
            'card_num' => '4111-1111-1111-1111',
            'exp_date' => '03/2013',
        ];

        $payment = new Payment();

        $authorizeNet = $this->getMockBuilder(AuthorizeNetAIM::class)
            ->setConstructorArgs([Payment::API_ID, Payment::TRANS_KEY])
            ->getMock();

        $result = $payment->processPayment($authorizeNet, $paymentDetails);

        $this->assertTrue($result);
    }
}
```
Chạy lại test, và kết quả là:
```
There was 1 error:

1) Tests\PaymentTest::testProcessPaymentReturnsTrueOnSuccessfulPayment
Trying to get property of non-object

/phpunit-tut/src/Payment.php:18
/phpunit-tut/tests/PaymentTest.php:23

FAILURES!
Tests: 11, Assertions: 10, Errors: 1.
```

`Payment.php:18` tương ứng với code `if ($response->approved) {`. `$response` được khởi tạo với `$response = $transaction->authorizeAndCapture();`. Như bạn vừa biết thì mặc định tất cả stub method đều trả về null, do đó lỗi này là hiển nhiên rồi.

Do đó chúng ta biết rằng, chúng ta cần phải overridden giá trị trả về của `authorizeAndCapture()`, và may mắn thay nó khá là đơn giản.

#### Override stub method return values

Để thay đổi giá trị trả về của stub method, chúng ta có thêm 5 method mới của PHPUnit:
```php
$authorizeNet->expects($this->once())
    ->method('authorizeAndCapture')
    ->will($this->returnValue('RETURN VALUE HERE!'));
```
Đoạn code trên có ý nghĩa là chúng ta đang định nghĩa rằng đối tượng `$authorizeNet` sẽ gọi method `authorizeAndCapture()` một lần và nó sẽ trả về giá trị là `RETURN VALUE HERE`.

Bắt đầu quá trình là `expects()`, method này có 1 parameter, đó là số lần chúng ta mong muốn method được gọi trong code. Có nhiều tuỳ chọn ở đây, bao gồm `once()`, `any()`, `never()` và một vài tuỳ chọn khác.
Nếu chúng ta định nghĩa 1 method được gọi 1 lần (once) nhưng khi chạy qua unit test nó không được gọi lần nào hoặc gọi nhiều hơn 1 lần, unit test của chúng ta sẽ fail.
Nếu chúng ta định nghĩa nó không bao giờ được gọi (never), nhưng điều ngược lại xảy ra thì unit test sẽ fail.
`any()` có nghĩa là: Tôi không quan tâm nó được gọi bao nhiêu lần, nhưng khi được gọi thì đây là giá trị trả về.

`method()` có tham số là tên method cần override. Trong trường hợp này là method `$response = $transaction->authorizeAndCapture();`.

Và chúng ta có method `will()` chỉ đơn giản là wrap method `returnValue()` nơi mà bạn định nghĩa giá trị trả về của method, trong trường hợp này đó là `RETURN VALUE HERE!`.

Nếu chạy lại unit test bây giờ, nó vẫn tiếp tục bị fail, bởi vì stub method `authorizeAndCapture()` đang trả về string, trong khi đó, code của chúng ta đang cần 1 object với các thuộc tính `approved` và `transaction_id`. Một biện pháp đơn giản cho các kiểu đối tượng này là sử dụng `\stdClass`:
```php
$response = new \stdClass();
$response->approved = true;
$response->transaction_id = 123;
```

Và bây giờ là unit test hoàn chỉnh:
```php
<?php

namespace Tests;

use stdClass;
use App\Payment;
use AuthorizeNetAIM;
use PHPUnit\Framework\TestCase;

class PaymentTest extends TestCase
{
    public function testProcessPaymentReturnsTrueOnSuccessfulPayment()
    {
        $paymentDetails = [
            'amount'   => 123.99,
            'card_num' => '4111-1111-1111-1111',
            'exp_date' => '03/2013',
        ];

        $payment = new Payment();

        $response = new stdClass();
        $response->approved = true;
        $response->transaction_id = 123;

        $authorizeNet = $this->getMockBuilder(AuthorizeNetAIM::class)
            ->setConstructorArgs([Payment::API_ID, Payment::TRANS_KEY])
            ->getMock();

        $authorizeNet->expects($this->once())
            ->method('authorizeAndCapture')
            ->will($this->returnValue($response));

        $result = $payment->processPayment($authorizeNet, $paymentDetails);

        $this->assertTrue($result);
    }
}
```

### Kết luận
Vẫn còn khá nhiều việc cần phải làm. Nhìn vào code chúng ta có thể xác định chúng ta cần phải cover nhiều kịch bản nữa khi `$response->approved` trả về `false`, và làm thế nào để ném ra exception `throw new Exception($response->error_message);`...

Tuy nhiên, cho đến đây bạn đã học được khái niệm cơ bản của `mock object`, `stub method` và lý do tại sao dependency injection là 1 kỹ thuật hữu ích cho testing.

Trong bài tới, chúng ta sẽ tìm hiều về `mock method` (hơi khác một chút so với `mock object` và `stub method`), bắt exception và viết test cho các code phức tạp hơn nữa.