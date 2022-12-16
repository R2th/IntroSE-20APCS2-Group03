![](https://images.viblo.asia/3e27d67d-6e4a-4aad-8c2c-2cdda5a483ae.png)
Hầu hết các nhà phát triển web co rúm lại khi họ nghe về TDD (phát triển theo hướng kiểm tra). Chúng ta sẽ làm gì được yêu cầu lập trình với TDD trước.

Khi bạn đang bắt đầu, sẽ cảm thấy bị áp đảo. Nếu bạn chống lại nó, nó sẽ khiến bạn khó học nó hơn. Vậy bạn nên làm gì? Nắm lấy nó. Vâng, nó có lý do tại sao nó ở đó. Sẽ luôn có những cuộc tranh luận về công nghệ, cho dù ngôn ngữ lập trình hay quy trình bạn sẽ sử dụng để phát triển phần mềm.

Một số người có thể đồng ý rằng Lập trình XP hoặc Xtreme tốt hơn TDD và ngược lại. Nó thực sự sẽ đi sâu vào con đường mà bạn muốn đi với tư cách là một lập trình viên, đặc biệt nếu bạn là trưởng nhóm. Vì vậy, hãy chọn một cách khôn ngoan.

Lưu ý: Đây là TDD cho các phản hồi API. Nếu bạn muốn thử nghiệm tính năng với Laravel, hãy tìm đến bài viết này.
Cùng bắt tay vào làm!

# 1. Chuẩn bị Laravel Test.
Trên thư mục gốc của bạn, hãy cập nhật tệp phpunit.xml  của bạn với:
```php
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
<env name="API_DEBUG" value="false"/>
<ini name="memory_limit" value="512M" />
```
Vì vậy nó sẽ trông như thế này:
```php
<?xml version="1.0" encoding="UTF-8"?>
<phpunit backupGlobals="false"
         backupStaticAttributes="false"
         bootstrap="vendor/autoload.php"
         colors="true"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         processIsolation="false"
         stopOnFailure="false">
    <testsuites>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>

        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
    </testsuites>
    <filter>
        <whitelist processUncoveredFilesFromWhitelist="true">
            <directory suffix=".php">./app</directory>
        </whitelist>
    </filter>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="CACHE_DRIVER" value="array"/>
        <env name="SESSION_DRIVER" value="array"/>
        <env name="QUEUE_DRIVER" value="sync"/>
        <env name="DB_CONNECTION" value="sqlite"/>
        <env name="DB_DATABASE" value=":memory:"/>
        <env name="API_DEBUG" value="false"/>
        <env name="MAIL_DRIVER" value="log"/>
        <ini name="memory_limit" value="512M" />
    </php>
</phpunit>
```

Chúng ta chỉ cần kiểm tra trong bộ nhớ để nó sẽ nhanh hơn. Chúng ta sẽ sử dụng cơ sở dữ liệu **sqlite** và **: memory:** cho cơ sở dữ liệu. Bạn phải sửa lỗi thành sai vì chúng ta chỉ cần các lỗi thực tế để xác nhận. Tăng giới hạn bộ nhớ có thể cần thiết trong tương lai khi các cuộc gọi thực tế của bạn trở nên tốn kém bộ nhớ.

Hãy chắc chắn về **TestCase** cơ bản của bạn nếu chuẩn bị cho nó.
```php
<?php
    namespace Tests;
    use Illuminate\Foundation\Testing\DatabaseMigrations;
    use Illuminate\Foundation\Testing\DatabaseTransactions;
    use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
    use Faker\Factory as Faker;
    /**
     * Class TestCase
     * @package Tests
     * @runTestsInSeparateProcesses
     * @preserveGlobalState disabled
     */
    abstract class TestCase extends BaseTestCase
    {
        use CreatesApplication, DatabaseMigrations, DatabaseTransactions;
        protected $faker;
        /**
         * Set up the test
         */
        public function setUp()
        {
            parent::setUp();
            $this->faker = Faker::create();
        }
        /**
         * Reset the migrations
         */
        public function tearDown()
        {
            $this->artisan('migrate:reset');
            parent::tearDown();
        }
      }
```
Chúng ta cần thêm `trait`  **DatabaseMigations** , vì vậy trong mỗi lần chạy thử nghiệm, các file migration cũng đang được chạy. Bạn cũng có thể nhận thấy rằng chúng ta có các phương thức **setUp ()** và **tornDown ()** cần thiết để hoàn thành chu trình đó của ứng dụng trong quá trình thử nghiệm.
# 2. Viết test thực tế của bạn.
Để **PHPUNIT** biết bài test của bạn, bạn có thể đặt /** @test */chú thích trên ***docblock*** hoặc test_ làm tiền tố.
```php
<?php
namespace Tests\Unit;
use Tests\TestCase;
class ArticleApiUnitTest extends TestCase
{
  public function it_can_create_an_article()
  {
      $data = [
        'title' => $this->faker->sentence,
        'content' => $this->faker->paragraph
      ];
    
      $this->post(route('articles.store'), $data)
        ->assertStatus(201)
        ->assertJson($data);
  }
}
```
Trong bài test này, chúng ta kiểm tra xem ta có thể tạo một bài viết không.
Chúng ta khẳng định rằng nếu ứng dụng sẽ cung cấp cho chúng ta trạng thái 201 và liệu ứng dụng có phản hồi với dữ liệu JSON chính xác hay không .
Đối với Laravel, vì nó đang sử dụng **Active Record ORM Pattern**, vì vậy dữ liệu tốt nhất nên tồn tại trong cơ sở dữ liệu khi được tạo.
Sau khi chúng ta tạo thử nghiệm đầu tiên, hãy chạy` phpunit` hoặc `vendor/bin/phpunit`.

![](https://images.viblo.asia/be9009a4-9fba-4973-a2ce-c9a89860767a.png)
Khi chúng ta chạy `phpunit`,  **FAILED** ! Cái này có phải là tốt không? Đúng vậy. Bởi vì chúng ta đã chạy theo quy tắc thứ hai của TDD rằng nó sẽ **FAIL** sau khi tạo bài test.

Đầu tiên chúng ta hãy kiểm tra tại sao nó thất bại.

Chúng ta khẳng định trong thử nghiệm rằng nó sẽ trả về một 201 nhưng nó đã trả về 404 . Tại sao?

Hầu hết các bạn có thể biết tại sao nhưng đối với những người khác, đó là do URL chưa được xây dựng. Các [POST] /api/v1/articles  chưa tồn tại vì vậy nó ném 404 .

Chúng ta cần phải làm gì?
# 3. Tạo Url trong file Routes.
Chúng ta hãy tạo URL và xem những gì sẽ xảy ra.

Chuyển đến file `/routes/api.php` của bạn và tạo URL. Khi bạn tạo các tuyến url trong **api.php** , nó sẽ tự động thêm tiền tố vào `/api`.
```php
<?php
use App\Http\Controllers\Api\ArticlesApiController;
use Illuminate\Support\Facades\Route;
Route::group(['prefix' => 'v1'], function () {
  Route::resource('articles', ArticlesApiController::class);
});
```
Bạn có thể chạy:

`php artisan make:controller ArticlesApiController —-resource`

hoặc bạn có thể tạo nó bằng tay. Các yêu cầu **POST** sẽ gọi đến controller `ArticlesApiController’s`, phương thức **store()** .

# 4. Debug controller.
```php
<?php
namespace App\Http\Controllers\Api;
class ArticlesApiController extends Controller 
{
    public function store() {
        dd('success!');
    }
}
```
Hãy debug và xem liệu cuộc gọi có thể đến trong phần ứng dụng của chúng ta không và chạy lại **phpunit** .

![](https://images.viblo.asia/34857df9-8ff9-47d4-a02e-535085577b9b.png)

Nó đang trả ra cho chúng ta chuỗi `"success"` trong terminal! Điều này có nghĩa là nó đang bắt bài test của chúng ta.
# 5. Validate inputs.
Đừng quên xác thực dữ liệu đi vào cơ sở dữ liệu của bạn. Vì vậy, chúng ta tạo ra một lớp mới gọi là `CreateArticleRequest` để xử lý xác nhận.
```php
<?php
namespace App\Http\Controllers\Api;
class ArticlesApiController extends Controller 
{
    public function store(CreateArticleRequest $request) {
        dd('success!');
    }
}
```

Và nó chứa cái gì? Tất nhiên là các quy tắc xác nhận!
```php
<?php
namespace App\Articles\Requests;
use Illuminate\Foundation\Http\FormRequest;
class CreateArticleRequest extends FormRequest
{
    /**
     * Transform the error messages into JSON
     *
     * @param array $errors
     * @return \Illuminate\Http\JsonResponse
     */
    public function response(array $errors)
    {
        return response()->json($errors, 422);
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required'],
            'content' => ['required']
        ];
    }
}
```

Điều này là rất tốt bởi vì chúng ta có thể tạo sau này trong một thử nghiệm khác để xem liệu nó có bắt được các lỗi xác thực hay không, nhưng đó sẽ là một bài viết riêng biệt để làm cho hướng dẫn này trở nên đơn giản hơn :).
# 6. Trả về article đã được tạo.
```php
<?php
namespace App\Http\Controllers\Api;
class ArticlesApiController extends Controller 
{
    /**
    * @param CreateArticleRequest $request
    */
    public function store(CreateArticleRequest $request) {
      return Article::create($request->all());
    }
}
```
Bạn có thể nhận thấy rằng lớp Article được tô sáng. Điều này là do IDE (PhpStorm) không thể định vị lớp đó. Vì vậy, hãy tạo ra nó!
# 7. Tạo class Article.
```php
<?php
namespace App\Articles;
use Illuminate\Database\Eloquent\Model;
class Article extends Model {
  protected $fillable = [
    'title',
    'content'
  ];
  
}
```
Trên class Article, bạn phải xác định để **fillable** và **hidden** các **field**. Khi bạn đã thực hiện xong, hãy kiểm tra lại controller của bạn và import class Article.
```php
  <?php
namespace App\Http\Controllers\Api;
use App\Articles\Article;
class ArticlesApiController extends Controller 
{
    /**
    * @param CreateArticleRequest $request
    */
    public function store(CreateArticleRequest $request) {
      return Article::create($request->all());
    }
}
```
Nếu bạn để ý, sẽ thấy class không được tô sáng nữa vì IDE có thể xác định vị trí file.
Chúng ta đang thấy được gần như ở đó! Kiểm tra được thiết lập chính xác, URL đã được xây dựng và có thể truy cập được, controller để bắt nó cũng được đặt và class để mô hình hóa các bảng cơ sở dữ liệu của chúng ta đã sẵn sàng. Bây giờ, chúng ta hãy cố gắng chạy lại **phpunit**.
# 8. Chạy lại phpunit để xem những gì đang được thực hiện.
![](https://images.viblo.asia/f2445d6e-3ab5-46d4-9179-94b48febaa46.png)
Nó thất bại lần nữa. :( Như vậy là tốt hay xấu?. Tốt vì trạng thái 201 đã thay đổi từ 404 thành 500 (nếu bạn nhận thấy điều đó) .

Và cái xấu, nó thất bại? Khi bạn muốn debug và xem ứng dụng thực sự đang ném ra cái gì, bạn có thể làm điều này trong bài test của mình. Chỉ cần thêm phương thức `->dump() ` sau khi gửi request.
```php
<?php
namespace Tests\Unit;
use Tests\TestCase;
class ArticleApiUnitTest extends TestCase
{
  public function it_can_create_an_article()
  {
      $data = [
        'title' => $this->faker->sentence,
        'content' => $this->faker->paragraph
      ];
    
      $this->post(route('articles.store'), $data)
        ->dump()
        ->assertStatus(201)
        ->assertJson($data);
  }
}
```
Bạn có thể debug thêm output của  POST request của chúng ta . Nó có thể có tất cả thông tin bạn cần. Nếu nó vẫn không cung cấp cho bạn một gợi ý về những gì đang xảy ra, bạn có thể dựa vào file `/storage/logs/laravel.log `.

Vì vậy, chúng ta hãy kiểm tra tại sao lỗi đã biến thành 500 .

Chúng ta đang cố gắng chèn dữ liệu vào một bảng chưa tồn tại do đó ứng dụng đang phàn nàn rằng không có bảng nào để chèn dữ liệu vào.
# 9. Tạo các bảng cơ sở dữ liệu.
Bạn chỉ cần chạy lệnh laravel:

`php artisan make:migration create_articles_table –create=articles`

![](https://images.viblo.asia/7fba6bdd-c987-445e-96c9-034d36e66d34.png)
Và nó sẽ tự động tạo một file migration dưới theo

`/database/migrations`
```php
<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('content');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
```
Theo mặc định, nó sẽ chỉ có các trường ID và Timestamp. Tùy thuộc vào bạn để điền vào các trường bắt buộc.
# 10. Chạy lại phpunit.
![](https://images.viblo.asia/e4f746c7-6a37-4fff-9c74-d05dd2cfbe5d.png)

Ooops, **FAILED** một lần nữa? Whyyyyyyy ??? Nhưng nếu bạn kiểm tra cẩn thận, bạn đang đi đúng hướng! Mã trạng thái đã thay đổi một lần nữa từ 500 thành 200. Trạng thái 200 là một dấu hiệu tốt bởi vì điều đó có nghĩa là nó đang trả lại một cái gì đó thành công sau khi yêu cầu POST! Nó không phù hợp với cái chúng ta cần. Chúng tôi cần mã 201 để biết rằng một **article** thực tế được chèn vào cơ sở dữ liệu. Vì vậy, chúng ta cần sửa controller của mình thành:
```php
<?php
namespace App\Http\Controllers\Api;
use App\Articles\Article;
class ArticlesApiController extends Controller 
{
    /**
    * @param CreateArticleRequest $request
    */
    public function store(CreateArticleRequest $request) {
      return Article::create($request->all(), 201);
    }
}
```
# 11. Chạy phpunit và hi vọng vào điều tốt đẹp :D.
![](https://images.viblo.asia/068b04d1-fc6d-40d5-a437-9e1485297b41.png)
XIN CHÚC MỪNG! 

Đây chỉ là cách thực hiện đơn giản của TDD trên Laravel . Có những cách tiếp cận khác về điều này mà tôi có thể đề cập trong tương lai như **repository pattern** . **Repository pattern** được triển khai tốt nhất với DDD hoặc phát triển theo hướng tên miền.

Cảm ơn các bạn đã theo dõi bài viết. Link tham khảo:
https://medium.com/@jsdecena/simple-tdd-in-laravel-with-11-steps-c475f8b1b214