Bài viết được dịch từ sách **Laravel Up and Running** , chương 11: The Container. Mình không dịch hết cả chương mà chọn lọc những phần mà mình nghĩ là liên quan nhất và quan trọng nhất đến title bài viết (để tránh rườm rà) :D Mọi người thấy có gì không đúng comment ở dưới cho mình nhé.

**Laravel's service container**, hay **dependency injection container**, luôn nằm ở phần core của phần lớn các ứng dụng hay các chương trình. **Container** là công cụ đơn giản chúng ta có thể sử dụng để gán hay giải quyết khi sử dụng *class* và *interface*, nó cũng là 1 công cụ quản lý mạnh mẽ và đa dạng cho các gói liên kết của ứng dụng. Chúng ta sẽ cùng tìm hiểu cách nó hoạt động và cách sử dụng nó. 

## 1. Giới thiệu nhanh về Dependency Injection (DI)
DI là 1 cách thức thay thế cho việc khởi tạo trực tiếp bên trong class, thay vào đó ta sẽ inject class đó từ bên ngoài. Điều này phần lớn được thực hiện bằng cách inject nó vào constructor (lớp khởi tạo) của class, có nghĩa rằng các Object này đã được inject khi class chính được tạo ra. Ví dụ dưới đây miêu tả cách sử dụng cơ bản của DI:
```php
<?php
class UserMailer
{
    protected $mailer;
    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }
    public function welcome($user)
    {
        return $this->mailer->mail($user->email, 'Welcome!');
    }
}
```

Như ta thấy, class UserMailer cho chúng ta biết rằng nên inject 1 Mailer Object khi khởi tạo đối tượng này và phương thức phía dưới cũng gọi đến Mailer Object.
Lợi ích của DI là nó cho phép ta tự do thay đổi object được inject, mock Object cho việc testing và cho phép ta chỉ cần khởi tạo 1 lần nhưng vẫn có thể dùng nhiều lần các Object được inject.

## 2.DI và Laravel
Ví dụ ở trên cho ta thấy cách cơ bản để inject 1 object vào class. Tuy nhiên bản chất của việc DI này nhằm phục vụ cho việc khi ta muốn thay đổi đối tượng khởi tạo, như đã nói ở trên, ta được phép tự do thay đổi object được inject. Ta sẽ vào thử ví dụ sau để thấy điều này: 
```php
$mailer	= new MailgunMailer($mailgunKey, $mailgunSecret, $mailgunOptions);
$userMailer	= new UserMailer($mailer);
$userMailer->welcome($user);
```
Chúng ta có dịch vụ Mailgun và lớp MailgunMailer được kế thừa từ lớp cha Mailer. Và chúng ta sẽ sử dụng nó cho việc gửi mail trong ví dụ này. Nhưng 1 ngày kia khi công nghệ thay đổi, ta muốn sử dụng 1 dịch vụ khác, ta hoàn toàn có thể thay thế bằng dịch vụ khác bằng DI. 

## 3. app() global Helper
Trước khi chúng ta đến với cách hoạt động thực sự của *container*, ta sẽ đá qua chút về cách đơn giản nhất để lấy 1 object ra khỏi container, đó là ***app()*** helper.

Đưa vào bất kỳ đoạn string hay full path của class name, hoặc 1 shortcut của laravel, nó đều trả lại cho chúng ta 1 instance của lớp đó:
```php
$logger	= app(Logger::class);
```
Đây là cách đơn giản nhất để tương tác với container. 
> Nó tè 1: Chúng ta hay thấy có nhiêu syntax khi để khởi tạo instance này như $this->app('Tên_lớp'), hay $app->make('Tên_lớp') thậm chí là $app('Tên_lớp'). Đừng lo sợ vì đó chỉ là những cách viết khác nhau để khởi tạo mà thôi, chúng có tác dụng tương đương. 

## 4. Cách Container được kết nối
Ta có ví dụ sau:
```php
class Bar
{
    public function	__construct() {}
}
class Baz
{
    public function	__construct() {}
}
class Foo
{
    public function	__construct(Bar	$bar, Baz $baz) {}
}
$foo = app(Foo::class);
```

Điều khác biệt ở ví dụ này là lớp Foo có tới 2 object ở hàm construct, và khi khởi tạo instance của lớp Foo thì ta cũng không hề đăng ký cho nó lớp Bar và Baz ... vậy có nghĩa là lớp Foo này sẽ được khởi tạo mà không có 2 object trên ??? 
Tuy nhiên laravel đã làm điều này hộ chúng ta, container biết được và đọc type-hints của chúng ta ở constructor, nó cũng resolve ra những instance của 2 object này và inject nó vào instance của lớp Foo khi khởi tạo. Nó được gọi là ***autowiring*** (cái này làm mình khổ sở cả buổi sáng vì không hiểu nó truyền construct vào ở đâu trong khi thằng cu bên cạnh bảo cách này vẫn hoạt động :( ) . Việc này giúp code của bạn ngắn hơn rất nhiều trong việc binding.
> Nó tè 2: Anh em chắc nhiều người không hiểu TypeHint là gì :v (giống mình v~) thì tên đầy đủ nó là typehinting, trong PHP có nghĩa là đặt tên của class hoặc interface ở trước biến khi truyền biến vào 1 hàm ( đại khái nó giống kiểu khi khai báo DI nhưng bạn có thể để kiểu array, string ... nữa) VD: 
> `public	function	__construct(Logger	$logger)	{}` thì Logger $logger chính là typehint, nó cho biết là biến truyền vào phải bắt buộc có kiểu được khai báo, sai là vỡ alo đỏ lòm ngay.

## 5. Binding class tới container.
Bài viết cũng dài phết rồi, mình định dừng lại nhưng đoạn này hay quá lại phải viết tiếp, ai đọc mà buồn ngủ thì để hôm sau đọc tiếp nhé, đoạn này hay lắm.

Tiếp tục, Binding class tới container của laravel là bảo với container rằng: "Nếu dev cần 1 instance của 1 class, chúng ta sẵn sàng có code để chạy khởi tạo nó cùng với chính xác params cũng như các object phụ thuộc và trả về 1 cách đúng đắn nhất" (dịch y hệt trong sách =.=).
### 5.1 Binding đến closure.
Oke chúng ta hãy xem cách để **bind** class đến container. Hành động **bind** này sẽ được viết trực tiếp ở trong *Service Provider* (lại 1 khái niệm nữa nhắc tên nhưng mình sẽ không đi sâu vào nó, anh em có thể tìm kiếm xem nó là gì, hoặc lười thì chờ mình viết bài về nó nhé)
> Nó tè 3: **Service Provider** đại khái là 1 service dựng sẵn của laravel cho phép chúng ta đăng ký trên toàn bộ ứng dụng cái mà ta sẽ dùng chung.

Ta sẽ tạo mới 1 service provider hoặc dùng AppServiceProvider dựng sẵn của laravel: 
```php
//	In	service	provider
public function	register()
{
    $this->app->bind(LoggerInterface::class,	function ($app)	{
        return new Logger($sth);
    });
}
```
Ở trên ta  sử dụng $this->app là 1 instance của container và bind() là method sử dụng để bind tới container.
> Nó tè 4: Nhiều anh em không hiểu bind là gì, thì nó là việc đặt cho thằng này bằng 1 thằng khác. Ông nào chơi cs1.1 sẽ hay thấy bảo bind nút thì nó tương tự đấy, giả sử ta bind nút Fire là Mouse1 chả hạn.

Ví dụ trên ta đã bind LoggerInterface::class bằng 1 lớp Logger vậy là mỗi khi nhúng LoggerInterface vào thì ta hiểu đó chính là Logger. Mục đích việc này cũng như nãy ta đã nói, nhằm cho việc thay thế khi ta không muốn LoggerInterface sử dụng class Logger mà sử dụng class Logger1, khi đó ta chỉ việc bind lại cho nó Logger1 là có thể sử dụng lớp này rồi. 

### 5.2 Binding bằng singletons, và instances
Đầu tiên là singletons, nghe cái tên đã thấy có cái gì đó liên quan đến số 1 rồi. Nhưng single ở đây không phải là độc thân FA mà nó đầu ra của binding closure ở trên sẽ được cache lại và nó sẽ không gọi lại mỗi lần bạn tạo mới instance, tức là nó chỉ được gọi 1 lần duy nhất (dùng thằng này phải cực kỳ cẩn thận vì nếu bạn khởi tạo nó 2 lần, thì cả 2 giá trị ý sẽ luôn là 1). Cách sử dụng thì đơn giản tương tự như trên và thay bằng hàm singleton():
```php
public function register()
{
    $this->app->singleton(Logger::class, function () {
        return	new	Logger('\log\path\here', 'error');
    });
}
```
Ta cũng có cách tương tự và cũng trả ra 1 lần duy nhất đó là instance, khác 1 chút ở việc là ta đã có sẵn object muốn trả về:
```php
public function register()
{
    $logger = new Logger('\log\path\here', 'error');
        $this->app->instance(Logger::class,	$logger);
}
```

Oke viết đến đây là đủ dài rồi, mình viết theo ý hiểu của mình kết hợp với quyển sách kia nên nếu anhem nào đọc sách rồi mà thấy khác thì không phải mình dịch láo đâu :v, rảnh tay mình sẽ dịch nốt đoạn cuối của chương này, nó cũng khá hay và có nhiều cái để tham khảo. Cảm ơn mọi người đã đọc bài viết này của mình.'