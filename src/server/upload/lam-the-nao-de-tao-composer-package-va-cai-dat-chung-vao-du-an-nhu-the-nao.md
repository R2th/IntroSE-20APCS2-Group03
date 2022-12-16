# Làm thế nào để tạo composer package cho php
## Đặt vấn đề
Chào mọi người. Trong quá trình mình học tập và làm việc với các dự án, mình cũng từng thắc mắc hàng loạt câu hỏi vì sao khi làm việc với những thứ mà mình tiếp xúc và đặc biệt là với framword Laravel.
* Ủa composer là gì ?
* Ơ sao cài nhiều package vậy ?
* Package này có an toàn không ?
* Mình có thể làm và chia sẻ rộng rãi nó được không nhỉ ?
* Rồi cả hàng loạt kết quả xảy ra như : không sử dụng composer thì có ổn không ? package này là của ai ? có uy tín không ? mình làm package cá nhân liệu có bị nổi tiếng không ? .... .

Ok. Sau những hàng loạt câu hỏi mà mình tự hỏi và giải đáp, Nhân ngày hôm nay mình xin chia sẻ mọi người về các bước tạo package và cài đặt chúng vào laravel như thế nào.
Bắt đầu thôi !!!.
## 1. Composer là  gì ? lợi ích mà composer mang lại.

![](https://images.viblo.asia/4becfccf-efdc-414a-9ac2-2f2888e04043.jpeg)

**Composer** được ra mắt vào 01/03/2012, kể từ đó composer được phổ biến rộng rãi cũng là công cụ thiết yếu cho những anh em trong lập trình PHP.

**Composer** là ứng dụng giúp quản lý các thư viện bên ngoài trong project php, nó giúp lập trình viên quản lý dễ dàng với các thư viện. Nó sẽ tự động tải code của thư viện mà bạn muốn thêm vào và cập nhật các phiên bản mới.

Để hiểu rõ hơn về composer bạn có thể đọc qua bài viết của anh Thắng : https://viblo.asia/p/tim-hieu-ve-composer-jlA7GKWGKZQ2

## Bắt đầu demo thôi .
### Bước 1 : bạn tạo cấu trúc thư mục 

![](https://images.viblo.asia/71f63a33-84de-4926-8c6e-3ed39216254c.png)
Trong cấu trúc thư mục bao gồm.

* `src` : Là thư mục chứa code xử lý của bạn
* `composer.json` là file mà mình khai báo những thông tin và dependencies trong package. 
* `index.php` mình dùng để test package đã chạy bình thường chưa ( bạn có thể bỏ chúng khi đẩy lên trang quản lý package của composer ).

Trong file `composer.json` mình khai báo.

![](https://images.viblo.asia/3bd5675a-1ada-4d73-be48-31a2fc53641b.png)

Trong file này mình đã viết luôn chuẩn `autoload` psr-4 .
### Bước 2 : thực hiện viết code và chạy lệnh.
Trong bước này mình sẽ viết một số câu đơn giản và chạy để áp dụng chuẩn autoload cho dự án.

`Chuẩn autoload dùng để load các class trong PHP một cách tự động vào cấu trúc thư mục và tên class`

=> Chạy lệnh `composer dumpautload` để chúng tự động tạo thư mục tự sinh.
<br>

![](https://images.viblo.asia/0ee1de45-c572-43d8-968a-1cb3e71d09dd.png)
tiếp tục viết code trong src và index thôi.
File User.php
```
<?php

namespace App\Models;

class User
{
    function index()
    {
        echo "khoan";
    }
}
```
File homecontroller
```
<?php


namespace App\Controllers;


class HomeControlle.php
{
    public function getAll()
    {
        echo "1234";
    }
}

```
File Index.php
```
<?php
require __DIR__ . '/vendor/autoload.php';

use App\Models\User;
use App\Controllers\HomeController;

$user = new user();

$user->index();

$homeController = new HomeController();
$homeController->getAll();

```
### Bước 3 : Test code và đẩy lên trang quản lý package của composer thôi.
* Test package xem chạy tốt không nha.
![](https://images.viblo.asia/d29f51d2-81c7-4141-8d37-6c3544bac299.png)
* Giờ test cũng ngon rồi đẩy lên git thôi.
* Truy cập vào link : https://packagist.org/ sau khi đăng nhập thì submit đường link git của bạn thôi.

<br>
mình đã submit thành công và đây là kết quả.

![](https://images.viblo.asia/a071f3aa-2835-4817-8719-41bfb500ee0c.png)
### Bước 4 : Cài nó vào laravel thôi.
các bạn tạo thư mục laravel và cài đặt package  như bình thường .


`Lưu ý : do bạn không báo version của package thì khi bạn cài nó sẽ bão lỗi :v cái này coi như là mình để dành phần cuối cho các bạn `:v:


![](https://images.viblo.asia/48c06e16-4892-4d91-b5b9-300bce10d706.png)
Giờ tạo controller rồi test thôi :v.
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Controllers\HomeController;

class TestController extends Controller
{
    public function index()
    {
        $user = new HomeController();
        $user->getAll();
    }
}

```
**Kết quả nè**
![](https://images.viblo.asia/78e0fcf0-2449-4dfa-afdb-f23881ccdb1a.png)
# Tổng kết.
* Sau bài viết này mình hy vọng mọi có thể hiểu rõ về composer cách tạo package và phát triển cộng đồng PHP rộng rãi. Biết đâu sau này mọi người  lại sử dụng package của bạn và bạn lại là sự lựa chọn ưu tiên hàng đầu thì sao :).
* Rất mong các bạn đưa ra đóng góp và lời khuyên chân thành để mình có thể phát triển bản thân hơn.
<br>
Cảm ơn các bạn !!!
# Tài liệu tham khảo
https://blog.jgrossi.com/2013/creating-your-first-composer-packagist-package/
https://viblo.asia/p/tu-tao-composer-package-cho-php-n7prv33ovKod
https://viblo.asia/p/tao-mot-package-don-gian-voi-laravel-5-7rVRqw94G4bP

Link git package : https://github.com/kawaibii/demopackageComposer .
<br>
Link git laravel đã cài package : https://github.com/kawaibii/packagedeverlop .