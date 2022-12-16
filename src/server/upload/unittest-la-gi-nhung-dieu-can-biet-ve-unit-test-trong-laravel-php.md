# Tổng quan
Chào mọi người, chắc hẵn mỗi lập trình viên chúng ta đều không thể không biết tới việc kiểm thử. Kiểm thử là một công việc không thể thiếu trong quá trình phát triển phần mềm.  Ban đầu, mình khi bước vào lập trình cũng chỉ nghĩ rằng việc kiểm tra lại tính chính xác của chương trình hay phát hiện những lỗi không mong muốn chỉ dành cho QA/Tester, còn người phát triển chỉ cần tập trung vào việc viết code để làm sao cho chạy ổn định. Nhưng ý nghĩ của mình hoàn toàn sai lầm khi bắt đầu đi làm và tiếp xúc với dự án bài bản, khi mà việc testing sẽ song song với việc chúng ta lập trình cũng như do chính chúng ta thực hiện mặc dù có cách thức có đôi chút khác biệt so với việc kiểm thử của QA hay Tester.

Việc viết test là rất quan trọng ngay khi chúng ta bắt đầu làm dự án, vì chỉ khi chúng ta kiểm soát được từng thành phần nhỏ trong những đoạn code của mình thì chúng ta mới có thể phát triển ứng dụng, kiểm soát lỗi một cách dễ dàng và thời gian đấy sẽ rút ngắn hơn rất nhiều so với việc code không được viết test. Đơn giản việc test cho từng dòng code của chính chúng ta tự viết ra, khi có lỗi sẽ biết và khoanh vùng được lỗi đấy ra ngay để fix tránh tình trạng mất quá nhiều thời gian vào việc tìm lỗi thay vì xây dựng phát triển ứng dụng. Có bug là fix luôn chứ không đợi đến QA :)) 

# 1. Vấn đề chính
**Vậy Unit Test là gì ?** tại sao những lập trình viên đều bắt buộc phải tìm hiểu cũng như áp dụng nó trong dự án của mình. 

Unit được dịch là đơn vị. Tức là kiểm thử ở mức đơn vị, mà mỗi đơn vị ở đây chính là các Method, function,  class. Viết kiểm thử cho các function, class này giúp chúng ta có thể hiểu rõ được luồng xử lý của từng thành phần nhỏ để từ đó có thể yên tâm xây dựng những chức năng lớn hơn từ chúng. 
- Unit Test giúp chúng ta tiết kiệm thời gian cũng như chi phí trong việc phát triển ứng dụng.
- Unit Test giúp chúng ta dễ dàng nắm bắt luồng xử lý trong code và từ đó có thể dễ dàng nâng cấp dễ dàng.
- Unit Test chất lượng có thể như là một tài liệu cho dự án.
- Qua Unit Test chúng ta có thể tách các function riêng lẻ vừa dễ dàng cho việc kiểm thử cũng như dễ dàng cho việc tái sử dụng.

**Một số công cụ cho việc sử dụng Unit Test**: 
- **Junit**: Junit là công cụ kiểm thử miễn phí sử dụng cho ngôn ngữ Java.
- **NUnit**: NUnit được sử dụng rộng rãi trong Kiểm thử đơn vị và với tất cả các ngôn ngữ .net. Nó là một công cụ mã nguồn mở, cho phép viết các kịch bản một cách thủ công. Nó cũng hỗ trợ việc test dựa trên các dữ liệu macó thể chạy song song.
- **EMMA**: EMMA là một bộ công cụ mã nguồn mở để phân tích và báo cáo mã được viết bằng ngôn ngữ Java. Emma hỗ trợ các kiểu coverage như method, line, basic block. Nó dựa trên Java nên không phụ thuộc thư viện bên ngoài và có thể truy cập mã nguồn.
- **PHPUnit**: PHPUnit là một công cụ kiểm tra đơn vị cho lập trình viên PHP. PHPUnit sử dụng những thành phần nhỏ để kiểm tra và kiểm tra chúng một cách riêng biệt. Công cụ này cũng cho phép các nhà phát triển sử dụng các phương pháp xác nhận xác định trước để khẳng định rằng hệ thống hoạt động theo một cách nhất định như hoạt động đúng hay không.

![](https://images.viblo.asia/5455873d-ffff-43c7-a8c3-83328a2508b4.png)
UnitTest sẽ có các trạng thái chính là : 
- Fail : Lỗi khi test
- Ignore : Tạm ngừng thực hiện
- Pass: Test không bị lỗi và hoạt động như ý muốn.

Một Unit Test tốt cần đảm bảo các điều kiện sau: 
- Mỗi UnitTest phải hoàn toàn độc lập và không liên quan đến những thành phần khác. Trong trường hợp thành phần khác có thay đổi thì UnitTest đấy cũng sẽ không bị ảnh hưởng.
- Tại một thời điểm chỉ kiểm tra một đơn vị.
- Khi nâng cấp hoặc thay đổi hay viết mới một thành phần nào đó phải đảm bảo viết UnitTest cho chúng.
- Việc test sẽ không được gây ảnh hưởng vào cơ sở dữ liệu thật.
# 2. UnitTest trong Laravel.
Bài hôm nay mình sẽ chúng ta cũng sẽ  tìm hiểu qua về PHPUnit là công cụ chính cho việc viết và chạy UnitTest đã tích hợp sẵn trong Laravel. 

Trong laravel, để viết test chúng ta sẽ viết ở trong folder ```test```

![](https://images.viblo.asia/87f63fea-b22b-4e83-9195-3c6e8cc79638.png)
Giải thích các thư mục : 

- tests: chứa code cho việc kiểm thử ứng dụng
- tests/Browser: chưa các file dùng để test cho view, tương tác với trình duyệt. 
- tests/Feature: chứa các file feature test
- tests/Unit: chứa các file unit test
- TestCase: là 1 bootstrap file để thiết lập môi trường Laravel cho các tests
- phpunit.xml là file cấu hình cho PHPUnit

Quy tắc tạo file test: 
- Tên của class test sẽ có cấu trúc hậu tố thêm từ Test . vd: PostControllerTest
- Tạo đường dẫn file test có cấu trúc giống với đường dẫn file thật:  Ví dụ tôi muốn test một Controller và có đường dẫn folder: Http/Controllers/PostController.php thì chúng ta sẽ tạo file unit test có cấu trúc đường dẫn là : tests/Unit/Http/Controllers/PostControllerTest.php.

Những thứ chúng ta cần test trong Laravel: 
- Controllers
- Models
- View
- Repository
- Auth policies...

Để tạo file unit test:
```
  php artisan make:test UserTest --unit
```
Khi tạo một file test chúng ta sẽ sử dụng 2 method setUp và tearDown. Vậy 2 method đấy dùng để làm gì?
Đơn giản setUp method sẽ là nơi để chúng ta tạo môi trường chuẩn bị trước khi test như tạo một user có quyền admin chẳng hạn, hay sử dụng một model chuẩn bị cho việc test. method này sẽ chạy trước mỗi function test của chúng ta. 

Như vậy các bạn cũng sẽ đoán được tearDown để làm gì đúng không. Nó chính là method để chúng ta dọn dẹp những môi trường đã thiết lập trong khi setUp. 
### Assertions
Assertions: Dịch ra là khẳng định. Tức là những method assertions sẽ giúp chúng ta khẳng định xem output có đúng thứ mà chúng ta mong muốn không.

Một số assertion thường gặp như: 

- **assertEquals**: hàm này sẽ thực hiện xem 2 kết quả có bằng nhau không
- **assertInstanceOf**: Hàm nãy sẽ thực hiện xác định kết quả so sánh có đúng intance  mong muốn hay không
- **assertArrayHasKey**: Thực hiện xem kết quả cần so sánh (mảng) bên trong có key cho trước hay không.
- **assertTrue**: Thực hiện xem kết quả cần so sánh có bằng true hay không.
- **assertFalse**:   Thực hiện xem kết quả cần so sánh có bằng true hay không.
- **assertIsArray**: Thực hiện xem kết quả cần so sánh có phải là một mảng hay không.
- và còn một số assert khác mọi người vào doc của laravel để tìm hiểu thêm nhé. 

### Ví dụ test một model trong laravel: 
```php
<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'password',
        'name',
        'avatar',
        'email',
        'address',
        'phone_number',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
```
Ở file test: 
```php
<?php

namespace Tests\Unit\Models;

use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Comment;
use App\Models\Rating;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class UserTest extends TestCase
{
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = new User();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        unset($this->user);
    }

    public function test_table_name()
    {
        $this->assertEquals('users', $this->user->getTable());
    }

    public function test_fillable()
    {
        $this->assertEquals([
            'username',
            'password',
            'name',
            'avatar',
            'email',
            'address',
            'phone_number',
            'role_id',
        ], $this->user->getFillable());
    }

    public function test_hidden()
    {
        $this->assertEquals([
            'password',
            'remember_token'
        ], $this->user->getHidden()
        );
    }
    
    protected function test_belongsTo_relation($related, $foreignKey, $ownerKey, $model, $relationName)
    {
        $relation = $model->$relationName();

        $this->assertInstanceOf(BelongsTo::class, $relation);
        $this->assertInstanceOf($related, $relation->getRelated());
        $this->assertEquals($ownerKey, $relation->getOwnerKeyName());
        $this->assertEquals($foreignKey, $relation->getForeignKeyName());
    }

    public function test_role_relation()
    {
        $this->test_belongsTo_relation(
            Role::class,
            'role_id',
            'id',
            $this->user,
            'role'
        );
    }
}

```
Cuối cùng chúng ta sẽ chạy câu lệnh artisan: 
```
 php artisan test
```
Phía trên mình đã test cho một Model User có relation với Role. Trong file test này một số function như getFillable() hay getHidden() dùng để test cho thuộc tính fillable hay hidden trong Laravel. Ngoài ra để test relation, mình đã dùng assertInstanceOf để test quan hệ trong user có đúng là instance của BelongsTo trong Laravel hay không cũng test OwnerKeyName hay ForeignKeyName như trên.

# Tổng kết 
Đọc xong bài viết này chắc hẳn các bạn đã nắm được những kiến thức cơ bản của Unit Test. Vơi những kiến thức này khi làm việc chúng ta cần phải tìm hiểu thêm những phương thức có sẵn để test trong tài liệu chính của mỗi công cụ. Việc test song song khi code là một việc rất quan trọng và cần thiết đảm bảo cho việc phát triển ứng dụng một cách chuyên nghiệp và tiết kiệm công sức, thời gian. Mong bài viết có thể giúp ích cho mọi người một chút nào đấy trong công việc của mình. Xin cảm ơn các bạn và hẹn vào một ngày gần nhất!