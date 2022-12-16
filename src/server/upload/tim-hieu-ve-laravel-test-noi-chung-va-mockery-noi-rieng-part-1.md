<div align="center">
    
# Lời nói đầu 
</div>
Xin chào các bạn, mình đã quay trở lại rồi đây (còn lợi hại hay ăn hại hơn thì các bạn hãy comment trong bài viết này cho mình biết nhé!)

Xàm xàm tí thôi, hôm nay mình sẽ trở lại với series về Laravel với một nội dung mà các developer ai cũng biết nhưng không phải ai cũng để tâm đến, đó là **TEST** trong **LARAVEL**.

Lí do thì cũng khá đơn giản thôi, vì trước đây mình thường chỉ tập trung tìm cách làm sao để code chạy được là được (facepalm) nhưng bây giờ khác rồi, code chạy trên local rồi mà không pass test thì còn lâu mới được merge :scream: :scream: :scream:

Thế là mình quyết định tìm hiểu về cách viết test trong laravel và bài viết này được ra đời!
<br>
Về cơ bản thì bài này là dev viết về test nên nếu có gì chưa đúng thì rất mong mọi người góp ý để mình hoàn thiện hơn!

<div align="center">
    
# Nội dung
</div>

Như tiêu đề các bạn có thể thấy là bài viết sẽ có 2 phần viết về **Test** và **Mockery**. Trong phần đầu này, mình sẽ đề cập đến một số vấn đề cơ bản khi viết **test** cho một project **Laravel**

<div align="center">
    
## Tổng quan về test
</div>

Kiểm thử đơn giản là việc bạn kiểm tra xem phần mềm được viết ra có
- Đảm bảo chạy đúng với requirement của khách hàng hay không?
- Có nảy sinh ra lỗi, hay vấn đề làm ảnh hưởng đến phần mềm/trải nghiệm người dùng hay không?

<br>

Trước kia, mình (và có lẽ cũng kha khá bạn khác) viết code mà chỉ cần quan tâm đến một điều duy nhất, đó là: "**Code có chạy được hay không?**". Và khi đó việc test với mình chạy bằng "cơm" rất đơn giản như sau:
- B1: Đọc requirement
- B2: Code theo requirement
- B3: Chạy code để check xem đã chạy đúng chưa
- B4: Thử lại với các trường hợp khác xem có lỗi xảy ra không.

-> và khi không thấy có lỗi thì mình yên tâm là code của mình đã ok.

<br>
Nhưng thực tế thì không, có một nguyên tắc kiểm thử nói rằng:

> Kiểm thử chỉ có thể chứng minh chương trình đang có lỗi, nhưng không thể chứng minh rằng chương trình đã hết lỗi.

tức là bạn sẽ không thể nào test hết được tất cả các lỗi, và test bằng cơm thì lại càng không!!!!!!!!!!!!!

<br>
Nghe cái này xong thấy có vẻ giống cô Tấm nhặt thóc với gạo nhỉ (làm bằng tay thì không biết baoh thì mới xong). Vì vậy chúng ta cần phải nhờ đến một "thế lực mạnh mẽ" giúp đỡ. Đó chính là "**AUTOMATION TEST**"

<div align="center">
    
## Automation test
</div>

Cái tên kiểm thử tự động đã nói lên tất cả rồi phải không, bạn sẽ không phải test bằng tay nữa mà việc này được đẩy cho máy tính. Và tất nhiên, để máy tính có thể làm được thì bạn cần phải dạy nó. Đấy chính là phần khó của **Automation test**.
-  Ưu điểm của automation test:
    - tự động hóa công việc kiểm thử (hầu như cái gì tự động cũng hay hơn đúng ko, vì bản chất con người đều lười biếng mà :smile::smile:) 
    - giảm thiểu thời gian test (có thể chạy hàng loạt test case chỉ với vài phút, giây)
    - trong quá trình code thì chắc chắn sẽ có những sửa đổi (từ to đến nhỏ), và việc kiểm thử tự động sẽ giảm thiểu được rất nhiều effort so với kiểm thử thủ công (vì cứ có thay đổi là lại phải test lại)
-  Nhược điểm của automation test:
    - rất nhiều thứ cần phải học
    - cần thời gian viết code test (nhưng mà cái này lại được đánh đổi bằng cái lợi ích ở bên trên, và chắc chắn là nó xứng đáng để cho bạn đánh đổi đấy)
    - trên thực tế cần test những chức năng rất phức tạp, khó khăn khi viết test (mình đang dính phải cái này đây)

Về cơ bản thì kiểm thử được chia ra làm 3 mức:
+ **Unit Test**: đây là phần kiểm thử hướng tới những function, method, class trong chương trình

    => trong một project chắc chắn sẽ có rất nhiều các class, function, vì vậy số lượng unit test thường sẽ rất lớn. Tuy số lượng thì rất hoành tráng nhưng đa phần các unit test khá đơn giản. 
+ **Integration Test**: gọi là kiểm thử tích hợp, thường sẽ là kiểm thử cả một tính năng hoặc một service của chương trình

    =>  thay vì test từng class, function nhỏ thì kiểm thử tích hợp sẽ test việc sử dụng kết hợp các controller/service với nhau để tạo thành một chức năng hoàn chỉnh.
    
    Đến đây, sẽ có nhiều người thắc mắc, đặt ra câu hỏi là:

 > "**Integration** là tổng hợp nhiều **Unit Test**. Vậy nếu các **Unit Test** đúng thì chắc chắn **Integration** cũng sẽ đúng (kiểu nhiều cái đúng cộng lại thì cũng sẽ đúng). Vậy Integration Test không phải thừa sao?"

<hr>


   => trên thực tế, thì cuộc sống nói chung cũng như lập trình nói riêng nhiều khi không giống như toán học. Và hình ảnh sau sẽ cho các bạn thấy rõ điều đó (nhiều cái đúng cộng lại chưa chắc đã đúng)
    ![](https://images.viblo.asia/69b00e6d-9bf7-4c19-9366-94820990edf2.gif)
    
<div align="center">

Mọi thứ đều có vẻ đúng cho đến khi kết hợp chúng với nhau :rofl::rofl::rofl:
</div>

+ **System Test**: kiểm thử hệ thống là kiểm thử một chương trình đã hoàn chỉnh và tích hợp đầy đủ.

    => cái này thì không quá quan tâm đến việc code chạy đúng hay sai nữa (vì đã có 2 thằng kia phụ trách rồi), mà nó đi sâu vào trải nghiệm người dùng đối với chương trình hơn (**giao diện**, **bảo mật**, **hiệu năng**, ...). Và tất nhiên là nó cũng sẽ khó hơn.


Và hình ảnh dưới đây là minh hoạ cho tương quan giữa ba mức độ test này:
![](https://images.viblo.asia/cb9a58e4-7da6-4823-9564-9a1dbb5bae99.png)

<div align="center">
    
## Bắt tay vào viết test trong Laravel
</div>
Xàm xí mấy cái lí thuyết như thế là đủ rồi, giờ chúng ta hãy cùng bắt tay vào làm thôi không lại buồn ngủ.

<div align="center">
    
### Khởi tạo file test và chạy test
</div>

Cũng giống như [code convention](https://viblo.asia/p/coding-convention-doi-voi-mot-project-php-ORNZqNPrl0n) thì viết Unit test cũng có một số quy tắc cần phải tuân thủ như sau:
- Tên file sẽ đặt theo **PascalCase** tương ứng với source mà nó test. VD bạn test **UserController** thì tên file test sẽ là **UserControllerTest**
- Với những project lớn, tốt nhất nên tạo cấu trúc thư mục file test tương ứng với cấu trúc source code để có thể dễ dàng theo dõi, bảo trì và phát triển.
- Tên method test thường sẽ đặt tên theo **snake_case** (có thể sử dụng **camelCase**) và bắt đầu bằng tiền tố **test_**
- Tên method phải thể hiện được chức năng, kết quả mong muốn. VD: **test_admin_can_ban_an_user()**

<br>

```bash
php artisan make:test TenFileTest  #file sẽ được lưu trong thư mục Feature

php artisan make:test TenFileTest --unit #file sẽ được lưu trong thư mục Unit

#chạy tất cả các test
./vendor/bin/phpunit 

#chỉ chạy 1 file test nhất định
./vendor/bin/phpunit Test-Path
./vendor/bin/phpunit --fillter TenFileTest
```

Một file test đầy đủ thường có 5 phần như sau (và đây cũng đang xếp theo thứ tự thực hiện khi mà chạy file test):
- **setUpBeforeClass()**: chạy khi bắt đầu class test
- **setUp()**: chạy trước mỗi method test
- **test_abc_xyz()**: thực thi method test
- **tearDown()**: chạy sau mỗi method test
- **tearDownAfterClass()**: chạy sau khi kết thúc class test

=> ví dụ:

```php
<?php
namespace Tests\Unit\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;
use App\Models\Comment;
use App\Models\User;

class CommentTest extends TestCase
{
    protected $comment;
    
    public function setUp()
    {
        parent::setUp();
        $this->comment = new Comment();
    }
    
    public function test_checks_if_user_is_owner_of_comment()
    {
        $user = new User;
        $user->id = 1;
        $author = new User;
        $author->id = 2;
        $comment = new Comment;
        $comment->user_id = 2;
        $this->assertFalse($comment->ownedBy($user));
        $this->assertTrue($comment->ownedBy($author));
    }
}
```

<br>

Xem xong file test trên bạn có thắc mắc cái **$this->assertFalse** với **$this->assertTrue** là gì không? Nếu không thì bạn không cần đọc tiếp phần tiếp theo nữa đâu (vì 1 là bạn đã biết rồi, 2 là bạn không muốn biết).

**Assertion** nói  đơn giản là cách bạn nói cho method test biết kết quả mong muốn trả về khi chương trình chạy đúng là gì. Cụ thể ở trong ví dụ trên:
+ `$comment` có `user_id` là 2, tức là nó thuộc về `$author`
+ và khi chạy test, nếu chương trình chạy đến `$user` thì phải trả về false, `$author` thì trả về true.

Ngoài trả về kết quả True/False thì Laravel còn cung cấp thêm một số assertion khác:
```php

//assertion đối với kết quả trả về
assertTrue() / assertFalse()
assertEquals() / assertNotEquals() // So sánh bằng
assertSame() / assertNotSame() // So sánh bằng, cùng kiểu
assertContains() / assertNotContains() // Array contain, String contains
assertArrayHasKey() / assertArrayNotHasKey()
assertInstanceOf() / assertNotInstanceOf() // Đối tượng thuộc/không thuộc class
assertCount()

//assertion xác thực người dùng:
assertAuthenticated() //kết quả trả về user đã đăng nhập
assertGuest() //kết quả trả về user là khách (chưa đăng nhập)
assertCredentials()/assertInvalidCredentials(); //kết quả thông tin đăng nhập trả về là hợp lệ/không hợp lệ

// assertion dùng cho database
assertDatabaseHas() //kết quả trả về mong muốn là có dữ liệu nhập vào ở trong database
assertDatabaseMissing() //kết quả trả về mong muốn là không có dữ liệu nhập vào ở trong database
assertSoftDeleted() //kế quả trả về mong muốn là bản ghi đã bị soft delete
```

<div align="center">
    
# Lời kết
</div>

Trên đây là những điều cơ bản nhất về test nói chung và unit test cho laravel nói riêng. Phần sau chúng ta sẽ đi sâu tìm hiểu thêm về Mockery nữa nhé (mình cũng đang chật vật với nó đây này :scream::scream::scream::scream:)

Đọc xong bài này, bạn nghĩ mình có thể viết được Unit Test chưa? Hãy thử với chính project của mình đi nào!

Đây mới chỉ là những kiến thức cơ bản nhất khi viết automation test thôi. Hãy tìm hiểu và làm thêm thật nhiều để có thể nâng cao khả năng nhé.

Hẹn gặp lại các bạn trong bài viết tiếp theo!
<div align="center">
    
# Tài liệu tham khảo
</div>

- Laravel doc: https://laravel.com/docs/5.5/testing
- Series về test của tác giả Pham Tuan: https://viblo.asia/s/php-unit-testing-with-phpunit-Wj53OmBb56m