# Mở đầu
Hiện nay, PHP vẫn đang là một ngôn ngữ phát triển vô cùng mạnh mẽ. Những framework như [Laravel](https://laravel.com), [Symfony](https://symfony.com/), [CakePHP](https://cakephp.org/),... hay những CMS như [Wordpress](https://wordpress.org/), [Joomla](https://www.joomla.org/), [Magento](https://magento.com/),... là những công cụ tuyệt vời giúp việc tạo ra websites trở lên nhanh chóng và thuận tiện. Không quá khi nói rằng, nhờ PHP mà việc sở hữu một websites trở nên dễ dàng hơn bao giờ hết. Bên cạnh những kết quả đáng kinh ngạc dành cho người dùng cuối, thật khó để một lập trình viên PHP "mới" có thể cảm nhận được hết những khó khăn trong quá trình phát triển một dự án PHP, đặc biệt là khi phải quản lý hàng tá những thư viện trước thời điểm Composer ra đời (năm 2011). Vì vậy, tôi xin được chỉ ra một vài điểm khó khăn mà tôi thực sự đã gặp phải trước khi biết đến và sử dụng Composer.

# Cài đặt
Giả sử, tôi đang phải bắt tay vào phát triển những websites bằng PHP khi chưa có Composer (Tôi muốn nhấn mạnh vào việc quản lý thư viện PHP khi chưa có Composer). Những dự án cứ thế dần dần được hình thành và đi vào hoạt động. Trong số đó, có rất nhiều những tác vụ quen thuộc như xác thực (đăng ký, đăng nhập,...), đọc/ghi CSDL, xử lý session/cookies,... mà tôi và mọi lập trình viên PHP khác phải lặp đi lặp lại ngày này qua ngày khác. Và như vậy, nhiều thư viện đã được hình thành để giúp công việc trở nên dễ dàng hơn. Theo thời gian, tôi hình thành thói quen lên mạng Internet, tìm kiếm các thư viện phục vụ cho dự án của mình. Mọi thứ có vẻ hoạt động rất tốt.

Nhưng không, mọi việc chỉ suôn sẻ cho đến khi những vấn đề xuất hiện dồn dập. Một ngày đẹp trời, trong khi muốn cài đặt thêm một số thư viện để làm cái gì đó hay ho, tôi chợt nhận ra rằng, số lượng thư viện đang được sử dụng đã tăng lên kha khá. Tôi bắt đầu cảm thấy lúng túng khi phải quản lý chúng. Việc cài đặt thư viện thủ công như thế này đã bộc lộ những vấn đề sau:

- **Khó khăn khi thêm thư viện mới**: Thư viện tăng lên đồng nghĩa với việc các tệp định nghĩa class, function,... tăng lên. Khi đó, tôi sẽ phải thật cẩn thận trong việc tải tệp nào trước, tải tệp nào sau vì các class và function có thể phụ thuộc lẫn nhau. Và như vậy, nếu không tải các tệp theo đúng thứ tự, việc xảy ra lỗi là điều tất yếu.

```php
<?php

// ...
require_once '/path/to/SuperClass.php'; // Phải được tải trước tệp SubClass.php
require_once '/path/to/SubClass.php'; // Phải được tải trước tệp GrantClass.php
require_once '/path/to/GrantClass.php'; // Phải được tải trước một số tệp khác.
// ...

```

- **Tải nhiều tệp thừa**: Khi tải các tệp php một cách thủ công, không thể tránh khỏi việc một số tệp bị thừa trong khi xử lý các tác vụ. Ví dụ, ai đó muốn ghé thăm trang chủ của websites, hệ thống lúc này không cần xử lý đến thư mục và tệp, gửi email,... Nhưng tôi luôn tải các tệp ở trên và dĩ nhiên tất cả đều thừa thãi ở tác vụ này.

```php
<?php

// Những thư viện thừa khi request không yêu cầu thao tác với thư mục/tệp hoặc gửi email.
require '/path/to/Filesystem/files.php';
require '/path/to/Email/files.php';
// ...
```
- **Thư viện yêu cầu chéo**: Tôi muốn cài đặt a nhưng a lại yêu cầu b, b lại yêu cầu c, e, d... Tôi chưa muốn bàn đến việc các thư viện khác nhau có thể yêu cầù cùng một thư viện nhưng phiên bản khác nhau.

3 vấn đề cài đặt như trên đã khiến tôi vô cùng đau đầu. Nhưng cũng có một cách để khắc phục điều này, PHP 5 trở lên đã cung cấp cho chúng ta hàm [__autoload](http://php.net/manual/en/function.autoload.php) (hoặc [spl_autoload_register](http://php.net/manual/en/function.spl-autoload-register.php)). Nó hoạt động theo cơ chế lazy load, tôi hiểu một cách đơn giản là "cần thì tải". Hãy cùng thực viện ví dụ dưới đây nhé.

```php
<?php

define('BASE_PATH', '/path/to/root');

// Khi truy xuất đến một class tên là Mail_Transporter, tôi sẽ tải tệp /path/to/root/libs/Mail/Transporter.php

function __autoload($class)
{
    $path = realpath(BASE_PATH . '/libs/' . str_replace('_', '/', $class) . '.php');

    if (file_exists($path)) {
        require $path;
    }
}
```

Với tôi, đây cũng chỉ là cách khắc phục nhất thời. Ở thời điểm mà mọi thứ chưa có chuẩn mực nào để tuân thủ, việc mỗi thư viện khai báo một kiểu cũng là chuyện dễ hiểu. Như vậy, các thư viện tăng lên thì tôi cũng phải cập nhật những luật riêng để tải chúng, về lâu dài thì mọi thứ vẫn khá lộn xộn.

# Cập nhật, Nâng cấp
Như vậy, việc cài đặt tuy khó khăn nhưng phần nào đó vẫn đang đáp ứng được yêu cầu công việc của tôi. Như thường lệ, mọi chuyện có hơi chút suôn sẻ thì những vấn đề lại bắt đầu ập đến. Xong xong với quá trình phát triển phần mềm, chúng ta (từ lập trình viên, tester, nhà phát triển phần mềm đến người dùng cuối) đều phải quen với những thay đổi như cải tiến và cả lỗi phần mềm. Thư viện lập trình cũng không phải ngoại lệ. Chúng là sản phẩm của quá trình phát triển phần mềm, chúng sẽ phải thay đổi theo thời gian.

- **Khó cập nhật phiên bản mới**: Một ngày nọ, tôi phát hiện ra method connect của thư viện Database đang gặp vấn đề . May mắn thay, khi tìm kiếm sự giúp đỡ, tôi thấy rằng tác giả của thư viện này đã sửa lỗi và release phiên bản mới. Tôi sẽ xóa thư mục cũ và tải thư viện mới về thay thế cho bản cũ. Một lần thì được nhưng 2, 3,... n lần thì liệu có ổn?

- **Tăng nguy cơ phát sinh lỗi mới**: Nếu chỉ có một hoặc hai thư viện thì việc cập nhật thủ công phần nào là chấp nhận được. Thế còn khi chúng ta sử dụng 10, 20 thư viện thì sao? Tôi còn chưa kể đến việc các phiên bản mới đó có thay đổi yêu cầu.

Với tôi, nếu đã chót dùng phiên bản nào thì tốt hơn hết là không bao giờ nâng cấp cho dù bản mới có nhiều tính năng hấp dẫn đến đến đâu đi nữa. Nếu vẫn muốn dùng, tôi sẽ sử dụng cho dự án mới hoàn toàn.

# Xung đột
Tôi thực sự đã nói không với chuyện nâng cấp thư viện. Nhưng những vấn đề khó khăn vẫn chưa kết thúc. Có rất nhiều thư viện hay mà tôi muốn dùng nhưng không may, chúng có thể rất "ghét" nhau. Nếu muốn dùng cái này thì bắt buộc phải bỏ cái khác. Những thư viện đó đơn giản là không thể dung hòa.

- **Xung đột thư viện**: Dự án của tôi đang sử dụng thư viện a mà trong a đã có một class Common. Bây giờ, tôi tìm được một thư viện khá hay b. Nhưng khi cài đặt vào dự án và chờ đợi kết quả thì có thông báo lỗi là class Common đã tồn tại. Điều này nghĩa là tôi đã không thể phát hiện ra lỗi này sớm hơn (phải cài đặt xong mới biết) và tôi cũng chỉ có thể dùng một trong hai thư viện này.

# Kết luận
Trên đây, tôi đã kể ra những sự khó khăn khi phải quản lý thư viện một cách thủ công. Qua đó, tôi mong các bạn có thể phần nào hiểu được sự ra đời của những package management, dependency manager đã giúp chúng ta giải quyết triệt để các vấn đề nan giải trong việc quản lý thư viện mã nguồn mở  (cụ thể là PHP - Composer trong trường hợp này). Lợi ích mà chúng đem lại quả là vô cùng to lớn.

Chúc các bạn học tập và làm việc vui vẻ!