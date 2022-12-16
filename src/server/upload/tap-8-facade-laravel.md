Chào mừng các bạn đã quay trở lại với series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)". Ngày hôm nay, chúng ta lại tiếp tục tìm hiểu về một khái niệm kiến trúc của Laravel nữa, đó chính là "Facade". Đây chắc hẳn là một thuật ngữ khó hình dung được ý nghĩa khi bạn mới vừa nghe đến nó. Trong tập này, mình sẽ cố gắng giải thích để các bạn có thể vượt qua "Facade" như các bạn đã vượt qua "[Service container](https://viblo.asia/p/tap-6-service-container-laravel-RQqKL2drl7z)" vậy.

> **Khuyến cáo:** Đây là một trong những phần Laravel nâng cao, chính vì thế sẽ gây khó hiểu, mất nghị lực, quyết tâm khi học. Mình khuyên bạn hãy đọc một lần, nếu thấy không thể tiếp thu thì có thể bỏ qua.  

# I. Giới thiệu (Introduction)
"Facade" có nghĩa thuần túy là "mặt tiền" hay "bề ngoài". Nếu như ai đã từng nghe qua cái tên này thì chắc cũng biết nó là một design pattern. Nhưng liệu khi đưa vào Laravel nó có gì khác biệt không?

Facade cung cấp một "static" interface cho các class có sẵn trong service container của ứng dụng. Nó cung cấp cho chúng ta quyền truy cập hầu hết tất cả các tính năng của Laravel, cung cấp một lợi ích rất quan trọng trong quá trình build ứng dụng - cú pháp ngắn gọn, dễ tiếp cận, có tính linh hoạt, dễ test hơn các static method truyền thống.

Tất cả các Laravel facade đều được định nghĩa tại namespace `Illumination\Support\Facades`. Các bạn mở file `config/app.php` và kéo tới mảng `aliases` gần cuối file, một list dài được liệt kê trong mảng. Quan sát một chút, bạn sẽ thấy đa phần các class đều chứa namespace `Illumination\Support\Facades`, đó chính là các facade.

Thông qua config này, thay vì bạn phải gọi một namespace dài, khó nhớ thì Laravel đã thay thế bằng một tên ngắn gọn mà bạn tùy ý quyết định.

Chẳng hạn như:

```PHP:config/app.php
'Route' => Illuminate\Support\Facades\Route::class,
```

Với config trên thay vì:

```PHP:routes/web.php
Illuminate\Support\Facades\Route::get('/', function() {
    return view('welcome');
});
```

bạn chỉ cần:

```PHP:routes/web.php
Route::get('/', function() {
    return view('welcome');
});
```

Giới thiệu sơ qua để các bạn hình dung một chút trong đầu về facade như thế nào, giờ chúng ta đào sâu hơn nhé!

# II. Khi nào sử dụng facade? (When to use facade?)
Facade có rất nhiều lợi ích. Nó cung cấp cú pháp ngắn gọn, dễ nhớ cho phép bạn sử dụng các tính năng của Laravel mà không cần phải nhớ các tên class dài loằn ngoằn để inject hoặc cấu hình chúng một cách thủ công, rườm rà. Hơn nữa, chúng rất dễ sử dụng để test.

Tuy nhiên, có một vài lưu ý bạn cần phải nhớ khi sử dụng facade. Bởi vì facade dễ dàng sử dụng mà không cần đến thao tác inject gì cả, nhưng chính vì cái dễ ấy có thể tiềm ẩn nhiều nguy hiểm. Thử tưởng tượng trong một class sử dụng quá nhiều facade, nó sẽ làm class bạn "phình to", khó kiểm soát phạm vi của nó, vì bạn đâu biết được, đằng sau các facade đơn giản ấy lại là một quá trình xử lý phức tạp. Vì vậy, khi sử dụng facade, bạn cần đặc biệt chú ý đến phạm vi các facade trong class.

> Để sử dụng facade, chúng ta có hai cách:
> 1. Sử dụng thông qua class
> 2. Sử dụng thông qua global helper function (nếu có hỗ trợ)

## 1. Sử dụng với class
Cũng tương tự như các code example trên, ta có thể gọi một `static` method bằng facade class. chẳng hạn:

```PHP:routes/web.php
Route::get('/', function() {
    return View::make('welcome');
});
```

(`View` là một facade dùng để tương tác với template trong Laravel)

## 2. Sử dụng global helper function
Một số facade cốt lỗi của Laravel có thể sử dụng các global helper function để thay thế cho phương thức class trên. 

```PHP:routes/web.php
Route::get('/', function() {
    return view('welcome');
});
```

Hàm `view` sẽ thay thế cho `View::make` giúp ta code nhanh, thuận tiện hơn.

# III. Laravel facade hoạt động như thế nào? (How Laravel facade work)
Trước tiên ta hãy cùng tìm hiểu một chút về facade design pattern.

## 1. Facade design pattern
Về khái niệm, facade design pattern hiểu đơn giản là nó sẽ giúp coder giao tiếp với source code xử lý phức tạp một cách dễ dàng thông qua một class facade trung gian.

Giả sử mình có thông tin của một user bao gồm tên, địa chỉ và học vấn.
**Trong đó:**
* Tên gồm: họ tên và tên đăng nhập
* Địa chỉ: số nhà, đường, thành phố
* Học vấn: trường cấp 1, 2, 3 và đại học

Đây là file data của user đó:
```PHP:data.php
<?php

return [
    'name' => [
        'fullname' => 'Nguyễn Văn A',
        'username' => 'anguyen'
    ],
    
    'address' => [
        'number_house' => '89',
        'street' => 'Lê Lợi',
        'city' => 'Hồ Chí Minh'
    ],
    
    'education' => [
        'primary_school' => 'Nguyễn Trãi',
        'junior_high_school' => 'Lê Hồng Phong',
        'high_school' => 'Lê Lợi',
        'university' => 'Sài Gòn'
    ]
];
```

> **Yêu cầu:** Lấy tất cả thông tin user.

Nếu làm theo cách thông thường thì bạn sẽ có thể xử lý theo hai hướng:
1. Xử lý tất cả các yêu cầu trên trong một class `User`.
2. Tạo ra 3 class con `NameUser`, `AddressUser` và `EducationUser` để xử lý từng yêu cầu.

Đối với cách 1, mình sẽ tạo thêm file `User.php`, ta sẽ có cấu trúc thư mục như sau:

```
myproject/
|   autoload.php
|   data.php
|   User.php
|   index.php
```

Các bạn quan sát nội dung file `User.php` mình code để thực hiện yêu cầu trên:

```PHP:User.php
<?php

class User
{
    protected $user, $name, $address, $education;
    
    public function __construct()
    {
         $this->user = require_once 'data.php';
         
         $this->name = $this->user['name'];
         $this->address = $this->user['address'];
         $this->education = $this->user['education'];
    }
    
    public function getFullname()
    {
        return $this->name['fullname'];
    }
    
    public function getUsername()
    {
        return $this->name['username'];
    }
    
    public function getNumberHouse()
    {
        return $this->address['number_house'];
    }
    
    public function getStreet()
    {
        return $this->address['street'];
    }
    
    public function getCity()
    {
        return $this->address['city'];
    }
    
    public function getPrimarySchool()
    {
        return $this->education['primary_school'];
    }
    
    public function getJuniorHighSchool()
    {
        return $this->education['junior_high_school'];
    }
    
    public function getHighSchool()
    {
        return $this->education['high_school'];
    }
    
    public function getUniversity()
    {
        return $this->education['university'];
    }
}
```

Đầu tiên ta nói về ưu điểm của cách 1. Nếu xử lý tất cả trong một class `User` thì sẽ giúp cho coder dễ dàng lấy thông tin user một cách nhanh chóng.

```PHP:index.php
<?php

require_once 'autoload.php';

$user = new User;

$user->getFullname();
$user->getCity();

//
```

Nhưng xét về nhược điểm, bạn có thể nhận ra rằng file `User.php` quá dài, xử lý nhiều trường khác nhau. Nếu đây không phải là một ví dụ nhỏ dễ hình dung mà là một project quy mô vừa thôi thì cũng đủ làm ta thấy choáng ngợp nếu nhồi nhét các phương thức, thuộc tính vào một class như vậy. 

> **Nhận xét cách 1:**
> * Ưu điểm: cung cấp cú pháp dễ nhớ, nhanh chóng 
> * Nhược điểm: class xử lý quá nhiều, khó bảo trì, nâng cấp.
> 
> ⇒ Chưa thuyết phục.  

Đối với cách 2, ta sẽ có cấu trúc thư mục như sau:

```
myproject/
|   autoload.php
|   data.php
|   NameUser.php
|   AddressUser.php
|   EducationUser.php
|   index.php
```

Nội dung mỗi class `NameUser.php`, `AddressUser.php` và `EducationUser.php` lần lượt là:

```PHP:NameUser.php
<?php

class NameUser
{
    protected $name;
    
    public function __construct()
    {
        $data = require_once 'data.php';
        
        $this->name = $data['name'];
    }
    
    public function getFullname()
    {
        return $this->name['fullname'];
    }
    
    public function getUsername()
    {
        return $this->name['username'];
    }
}
```

```PHP:AddressUser.php
<?php

class AddressUser
{
    protected $address;
    
    public function __construct()
    {
        $data = require_once 'data.php';
        
        $this->name = $data['address'];
    }
    
    public function getNumberHouse()
    {
        return $this->address['number_house'];
    }
    
    public function getStreet()
    {
        return $this->address['street'];
    }
    
    public function getCity()
    {
        return $this->address['city'];
    }
}
```

```PHP:EducationUser.php
<?php

class EducationUser
{
    protected $education;
    
    public function __construct()
    {
        $data = require_once 'data.php';
        
        $this->name = $data['address'];
    }
    
    public function getPrimarySchool()
    {
        return $this->education['primary_school'];
    }
    
    public function getJuniorHighSchool()
    {
        return $this->education['junior_high_school'];
    }
    
    public function getHighSchool()
    {
        return $this->education['high_school'];
    }
    
    public function getUniversity()
    {
        return $this->education['university'];
    }
}
```

Đối với cách này, ưu điểm của nó là đã phân chia các yêu cầu nhỏ thành từng class riêng, có tính tách rời, dễ dàng xử lý khi có vấn đề.

Nhưng với cách 2, ta lại gặp phải một nhược điểm đó chính là về cách thức lấy thông tin user. 

```PHP:index.php
<?php

require_once 'autoload.php';

$nameUser = new NameUser;
$addressUser = new AddressUser;
$educationUser = new Education;

$nameUser->getUsername();
$addressUser->getCity();
$educationUser->getHighSchool();

//
```

Ở đây chỉ có 3 class nên có thể bạn nghĩ sẽ nhớ được, không trở ngại. Nhưng bạn thử tưởng tượng nếu ứng dụng bạn "phình to" ra, class xử lý khởi tạo thêm rất nhiều, việc nhớ tên từng class với nhiệm vụ của nó thật sự là một vấn đề đáng quan tâm.

> **Nhận xét cách 2:**
> * Ưu điểm: phân chia công việc cho từng class, dễ dàng bảo trì, nâng cấp
> * Nhược điểm: khó khăn trong việc nhớ cú pháp, tên và nhiệm vụ của từng class
> 
> ⇒ Chưa thuyết phục. 

Nhưng với facade design pattern, nó sẽ lấy ưu điểm của cả hai cách trên để tạo ra hiệu năng tuyệt vời.

> **Ưu điểm facade design pattern:**
> 1. Phân chia công việc cho từng class, dễ dàng bảo trì, nâng cấp
> 2. Cung cấp cú pháp dễ nhớ, nhanh chóng 

Để đáp ứng yêu cầu trên với facade design patter, chúng ta có cấu trúc thư mục như sau:

```
myproject/
|   autoload.php
|   data.php
|   User.php
├── Facades/
|   |   NameUser.php
|   |   AddressUser.php
|   |   Education.php
|   index.php
```

Ba file trong thư mục `Facades` thì mình sẽ giữ nguyên nội dung như ở cách 2, chỉ thêm namespace ở đầu file:

```PHP
namespace Facades;
```

Bây giờ mình chỉ viết xử lý ở file `User.php`.

```PHP:User.php
<?php

use Facades\NameUser;
use Facades\AddressUser;
use Facades\EducationUser;

class User
{
    protected $name, $address, $education

    public function __construct()
    {
        $this->name = new NameUser;
        $this->address = new AddressUser;
        $this->education = new EducationUser;
    }
    
    public function __call($method, $parameters)
    {
        if (method_exists($this->name, $method) == true) {
            return $this->name->{$method}();
        }

        if (method_exists($this->address, $method) == true) {
            return $this->name->{$method}();
        }

        if (method_exists($this->education, $method) == true) {
            return $this->name->{$method}();
        }
    }
}
```

Nếu đã học PHP OOP, chắc bạn cũng đã quá quen thuộc với magic-method `__call` rồi. Method `__call` sẽ được thực thi khi class object chứa nó gọi một method nào đó không tồn tại. Sau đó mình sẽ kiểm tra xem method đó thuộc object nào trong 3 class object đã set ở `__construct` rồi thực thi nó. Như vậy bạn thấy, bây giờ `User` đóng vai trò là một facade, vừa đạt được hiệu năng, vừa tối ưu được cú pháp.

```PHP:index.php
<?php

require_once 'autoload.php';

$user = new User;

$user->getFullname();
$user->getCity();

//
```

Dưới đây là mô hình hoạt động của facade design pattern:

![](https://images.viblo.asia/499239cf-5fef-42ea-9f76-1ea065aa5e8e.JPG)


## 2. Cách thức hoạt động của Laravel facade
Bây giờ chúng ta đi từ cái đầu tiên trước, bạn hiểu dòng code dưới đây như thế nào?

```PHP
View::make('welcome')
```

Chắc hẳn nhiều người nghĩ rằng dòng code trên đã gọi một static method với tên là `make` trong class `View` ở root path (đường dẫn thư mục gốc)

Nếu bạn suy nghĩ như cách trên thì bạn đã phạm 2 lỗi:
1. Chẳng có cái class `View` nào ở trong root path cả. Vì như đã nói ở phần giới thiệu, `View` này là một facade và nó đã được alias trong config, tên namespace đầy đủ của nó là `Illuminate\Support\Facades\View`.
2. Dòng code trên chẳng gọi cái method `make` nào ở trong class `View` cả. Nếu không tin bạn có thể mở file `vendor/laravel/framework/src/Illumination/Support/Facades/View.php` lên và quan sát xem, chẳng có cái method nào ngoài `getFacadeAccessor`.
    ```PHP:vendor/laravel/framework/src/Illumination/Support/Facades/View.php
    protected static function getFacadeAccessor()
    {
        return 'view';
    }
    ```

Vậy cái method `make` ở đâu chui ra mà class `View` có thể gọi ra được? Chúng ta bắt đầu đào sâu thêm nhé! 

Các bạn để ý một chút sẽ thấy class `View` này extend với `Facade`. Tại thư mục chứa file `View.php`, tìm đến file `Facade.php` lên. Tìm kiếm với từ khóa "getFacadeAccessor" bạn sẽ dễ dàng tìm được method này:

```PHP:vendor/laravel/framework/src/Illumination/Support/Facades/Facade.php
protected static function getFacadeAccessor()
{
    throw new RuntimeException('Facade does not implement getFacadeAccessor method.');
}
```

Từ đây ta có thể kết luận được, mỗi file facade đều bắt buộc phải khai báo method `getFacadeAccessor`. Method này có tác dụng báo cho class `Facade` biết rằng facade đó sẽ đại diện cho service nào trong container. 

Kéo đến cuối file `Facade.php`, ta dễ dàng tìm được magic-method `__callStatic` cho việc gọi các phương thức của service.

```PHP:vendor/laravel/framework/src/Illumination/Support/Facades/Facade.php
public static function __callStatic($method, $args)
{
    $instance = static::getFacadeRoot();

    if (! $instance) {
        throw new RuntimeException('A facade root has not been set.');
    }

    return $instance->$method(...$args);
}
```

`$instance` sẽ được nhận giá trị là class object trong container tương ứng với tên mà `getFacadeAccessor` đã khai báo từ static-method `getFacadeRoot`.

```PHP:vendor/laravel/framework/src/Illumination/Support/Facades/Facade.php
public static function getFacadeRoot()
{
    return static::resolveFacadeInstance(static::getFacadeAccessor());
}
```

Cuối cùng thực thi method với dòng:

```PHP:vendor/laravel/framework/src/Illumination/Support/Facades/Facade.php
return $instance->$method(...$args);
```

Ngoài ra, mình phát hiện trong mỗi file facade, nếu method `getFacadeAccessor` trả về một chuỗi, tức facade đó có thể dùng global helper function với tên tương ứng, chẳng hạn như facade `View` này có thể sử dụng global helper function `view` trùng với giá trị mà `getFacadeAccessor` trả về.

Từ đó ta kết luận lại:

> * Trong ứng dụng Laravel, facade cung cấp quyền truy cập các object trong container. "Thiết bị" làm công việc này chính là class `Facade`. Tất cả các Laravel facade, cũng như các facade bạn tự tạo ra đều extend với  class `Illumination\Support\Facades\Facade`.
> 
> * Class `Facade` dùng magic-method `__callStatic()` trì hoãn resolve object trong container.
> 
> * Nếu `getFacadeAccessor` của facade nào trả về dạng chuỗi, tức là facade đó có thể sử dụng thông qua global helper function
> 
> ⇒ Cách thức hoạt động của Laravel facade cũng kế thừa từ facade design pattern.

# IV. Real-time facade
Khi sử dụng real-time facade, bạn có thể coi bất kì class nào trong ứng dụng như thế nó là một facade. 

Bây giờ bạn tạo cho mình một model với tên là "Post".

> php artisan make:model Post

Code lần lượt hai file `app/User.php` và `app/Post.php` như sau:

```PHP:app/User.php
<?php

namespace App;

//...

use App\Post;

class User extends Authenticatable
{
    use Notifiable;

    // ...

    public function publishPost(Post $post)
    {
        $post->publish();
    }
}
```

Ở method `publishPost`, mình đã inject vào class dependency `Post` để có thể gọi method `publish` ở model `Post`.

```PHP:app/Post.php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function publish()
    {
        echo 'Post was published.';
    }
}
```

Tại file `routes/web.php`, ta sẽ khởi tạo `User` và gọi method `publishPost`:

```PHP:routes/web.php
return app()->make('App\User')->publishPost(app()->make('App\Post'));
```

Nạp server và ta sẽ có kết quả như sau:

![](https://images.viblo.asia/53422d31-ec7f-44a1-8dcd-83070208de2c.JPG)

Bây giờ mình không muốn phải khai báo tham số nhận dependency ở method `publish` trong `User` thì phải làm sao? Real-time facade sẽ giúp chúng ta làm việc này. 

Để có thể đáp ứng yêu cầu của mình thì trước tiên ta phải biến model `Post` thành một facade. Đầu tiên, bạn thêm tiền tố `Facades` cho namespace `App\Post` khi `use` tại class `User`/.

```PHP:app/User.php
use Facades\App\Post;
```

Sau đó, các bạn sửa code lại trong method `publishPost` như sau:
```PHP:app/User.php
public function publishPost()
{
    Post::publish();
}
```

Rồi giờ các bạn nạp server và thử xem. Yeah, kết quả vẫn không thay đổi. Real-time facade đã biến model `Post` thành facade tức thời trong phạm vi file `app/User.php`.

> **Lưu ý**: Chính vì quá "ảo diệu" như vậy nên cũng có thể gây vấn đề nguy hiểm nếu bạn lạm dụng quá nhiều như mình đã đề cập ở phần trước vì sự khó kiểm soát của facade.

# V. Tham khảo lớp facade (Facade Class Reference)
Bạn có thể truy cập đường dẫn [này](https://laravel.com/docs/5.8/facades#facade-class-reference) tại Laravel Documents để tìm hiểu thêm các facade.

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ