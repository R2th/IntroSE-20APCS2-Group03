# Giới thiệu
SOLID là viết tắt của 5 chữ cái đầu trong 5 nguyên tắc thiết kế hướng đối tượng. Giúp cho lập trình viên viết ra những đoạn code dễ đọc, dễ hiểu, dễ maintain.

Năm nguyên tắc thiết kế này bao gồm:

* **`S`** :  Single-responsibility principle (SRP)
* **`O`** : Open–closed principle (OCP)
* **`L`** : Liskov substitution principle (LSP)
* **`I`** : Interface segregation principle (ISP)
* **`D`** : Dependency inversion principle (DIP)

# Nội dung
## Single-responsibility principle (SRP)
Nguyên lý thiết kế này được hiểu đơn giản là một lớp thì chỉ nên có một nhiệm vụ duy nhất. Khi một class có quá nhiều chức năng thì theo thời gian phát triển của dự án thì class đó cũng phình to ra và dẫn tới việc khó phát triển khó maintain hơn.

Để hiểu rõ về nguyên lý SRP chúng ta hãy xét ví dụ dưới đây
```php
class Document
{
    protected $title;
    protected $content;

    public function __construct(string $title, string $content)
    {
        $this->title = $title;
        $this->content= $content;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getContent(): string
    {
        return $this->content;
    }
    
    public function exportHtml() {
        echo "DOCUMENT EXPORTED TO HTML".PHP_EOL;
        echo "Title: ".$this->getTitle().PHP_EOL;
        echo "Content: ".$this->getContent().PHP_EOL.PHP_EOL;
    }

    public function exportPdf() {
        echo "DOCUMENT EXPORTED TO PDF".PHP_EOL;
        echo "Title: ".$this->getTitle().PHP_EOL;
        echo "Content: ".$this->getContent().PHP_EOL.PHP_EOL;
    }
}
```
Theo như chúng ta thấy thì class Document ở trên vừa chịu trách nhiệm làm lớp đại diện cho Document vừa chịu trách nhiệm export nó ra các định dạng khác nhau.

Để theo như đúng nguyên lý thiết kế SRP thì chúng ta sẽ tách exportHtml và exportPdf thành hai lớp riêng với lớp Document.
```php
interface ExportableDocumentInterface
{
    public function export(Document $document);
}
```
```php
class HtmlExportableDocument implements ExportableDocumentInterface
{
    public function export(Document $document)
    {
        echo "DOCUMENT EXPORTED TO HTML".PHP_EOL;
        echo "Title: ".$document->getTitle().PHP_EOL;
        echo "Content: ".$document->getContent().PHP_EOL.PHP_EOL;
    }
}
```
```php
class PdfExportableDocument implements ExportableDocumentInterface
{
    public function export(Document $document)
    {
        echo "DOCUMENT EXPORTED TO PDF".PHP_EOL;
        echo "Title: ".$document->getTitle().PHP_EOL;
        echo "Content: ".$document->getContent().PHP_EOL.PHP_EOL;
    }
}
```
## Open–closed principle (OCP)
Vê cơ bản thì nguyên lý này được hiểu theo nghĩa chúng ta có thể thoải mái mở rộng một class nhưng chúng ta không thể sửa đổi bên trong class đó.

Chúng ta hãy xét ví dụ nếu như chúng ta có một hệ thống hoạt động tốt với chức năng login bình thường (người dùng nhập email và password), bây giờ nếu muốn mở rộng hệ thống login thông qua một bên thứ ba ví dụ như google, github,... thì bạn sẽ làm như nào. Để giải quyết được bài toán này thì bạn cần hiểu rõ là bài toán đang yêu cầu một chức năng mới chứ không phải sửa đổi chức năng login hiện tại.Nếu sửa đổi chức năng login hiện tại thì đã vi phạm nguyên lý OCP.

 Sửa đổi chức năng login hiện có => vi phạm nguyên lý thiết kế OCP
```php
class LoginService
{
    public function login($user)
    {
        if ($user instanceof User) {
            $this->authenticateUser($user);
        } else if ($user instanceOf ThirdPartyUser) {
            $this->authenticateThirdPartyUser($user);
        }
    }
}
```

Sử dụng interface và mở rộng chứ năng login bằng cách thêm phương thức login bằng bên thứ 3 => thỏa mãn nguyên lý thiết kế OCP.
```php 
interface LoginInterface
{
    public function authenticateUser(UserInterface $user);
}

class UserAuthentication implements LoginInterface
{
    public function authenticateUser(UserInterface $user)
    {
        // TODO: Implement authenticateUser() method.
    }
}

Class ThirdPartyUserAuthentication implements LoginInterface
{
    public function authenticateUser(UserInterface $user)
    {
        // TODO: Implement authenticateUser() method.
    }
}

class LoginService
{
    public function login(LoginInterface $loginService, UserInterface $user)
    {
        $loginService->authenticateUser($user);
    }
}
```
Ngoài bài toán login thì còn một bài toán cũng có cách xử lý tương đương là thêm phương thức thanh toán cho một hệ thống.

Một số lợi ích của việc áp dụng nguyên lý OCP vào trong lập trình: 
* Mở rộng các chức năng của hệ thống, mà không chạm vào cốt lõi của hệ thống.
* Ngăn chặn việc phá vỡ các bộ phận của hệ thống bằng cách thêm các chức năng mới.
* Dễ dàng kiểm thử.
## Liskov substitution principle (LSP)
Nguyên tắc này được hiểu theo nghĩa các object của class con có thể thay thế class cha mà không thay đổi tính đúng đắn của chương trình.

Ví dụ khi ta muốn viết một chương trình để mô tả các loài chim bay được nhưng chim cánh cụt không bay được. Vì vậy khi viết đến hàm chim cánh cụt thì khi gọi hàm bay của chim cánh cụt, ta sẽ quăng NoFlyException, như vậy đã vi phạm nguyên lý LSP.
```php
class Bird 
{
    public function fly()
    {
        return "Fly";
    }
}
class EagleBird extends Bird
{
    public function fly()
    {
        return "Eagle Fly";
    }
}
class SparrowBird extends Bird
{
    public function fly()
    {
        return "Sparrow Fly";
    }
}
class PenguinBird extends Bird
{
    public function fly()
    {
        throw new NoFlyException();
    }
}
```
## Interface segregation principle (ISP)
Thay vì sử dụng một interface lớn thì chúng ta hãy tách chúng thành các interface nhỏ với các mục đích cụ thể. Bạn hãy tưởng tưởng bạn có một interface to đùng với rất nhiều các method khác nhau và khi mỗi class implement các interface đó thì đều phải overide tất cả các method đó, rất là bất tiện đúng không nào ? Nhưng nếu chúng ta tách chúng ra thành các interface nhỉ với từng mục đích khác nhau, class nào có nhu cầu sử dụng chức năng nào thì chỉ cần implement chứ năng đó, rất dễ dàng cho việc quản lý các interface.
```php
interface Workable
{
    public function canCode();
    public function code();
    public function test();
}

class Developer implements Workable
{
    public function canCode()
    {
        return true;
    }
    public function code()
    {
        return 'coding';
    }
    public function test()
    {
        return 'testing in localhost';
    }
}

class Tester implements Workable
{
    public function canCode()
    {
        return false;
    }
    public function code()
    {
        // El QA no puede programar
         throw new Exception('Opps! I can not code');
    }
    public function test()
    {
        return 'testing in test server';
    }
}
```
Với ví dụ trên chúng ta có thể nhìn thấy lớp Tester có method là code không tương thích với nó và buộc phải trả về exception, để sửa lỗi này thì chúng ta sẽ áp dụng nguyên lý ISP và t tách interface trên thành các interface nhỏ hơn.
```php
interface Codeable
{
    public function code();
}

interface Testable
{
    public function test();
}

class Programmer implements Codeable, Testable
{
    public function code()
    {
        return 'coding';
    }
    public function test()
    {
        return 'testing in localhost';
    }
}

class Tester implements Testable
{
    public function test()
    {
        return 'testing in test server';
    }
}
```
Như chúng ta thấy vì tester không thể code nên chúng ta chỉ cần implement interface Testable, như vậy thì sẽ không gây ra lỗi.

## Dependency inversion principle (DIP)

DIP được xem như là nguyên tắc khó hiểu nhất của SOLID. Nội dung của nguyên tắc này nói các module cấp cao không nên phụ thuộc vào các module cấp thấp mà cả hai nên phụ thuộc vào abstraction. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại (Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation).
```php
class Email
{
    public function sendEmail()
    {
        // code to send mail
    }
}

class Notification
{
    private $email;
    public function notification()
    {
        $this->email = new Email();
    }

    public function promotionalNotification()
    {
        $this->email->sendEmail();
    }

```
Đối với đoạn code trên thì nó vẫn hoạt động bình thường nhưng nó gặp phải vấn đề là Notification phụ thuộc trực tiếp vào Email và nó vi phạm nguyên lý SRP vì nó vừa phải gửi email vừa phải khởi tạo Email để thực hiện việc gửi email. Bây giờ chúng ta sẽ chuyển Notification phụ thuộc vào interface mà không phụ thuộc vào Email.
```php
interface MessengerInterface
{
    public function sendMessage();
}
class Email implements MessengerInterface
{
    public function sendMessage()
    {
        // code to send email
    }
}

class SMS implements MessengerInterface
{
    public function sendMessage()
    {
        // code to send SMS
    }
}

class Notification
{
    private $messenger;
    public function notification(MessengerInterface $messenger)
    {
        $this->messenger = $messenger;
    }
    public function doNotify()
    {
        $this->messenger->sendMessage();
    }
}
```
Như vậy chúng ta có thể thấy class Notification không phụ thuộc trực tiếp vào Email hay SMS mà nó phục thuộc vào interface MessengerInterface, với điều đó thì sau này chúng ta có thể mở rộng thêm các hình thức gửi tin nhắn khác ngoài email và sms.
# Kết luận
Chúng ta đã cùng tìm hiểu về nguyên lý thiết kế SOLID, cảm ơn các bạn đã theo dõi bài viết. Mong bài viết có thể đem lại những kiến thức hữu ích cho các bạn. Hẹn gặp lại các bạn vào những bài viết tiếp theo.