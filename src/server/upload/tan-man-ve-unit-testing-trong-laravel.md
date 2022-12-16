Tớ có tìm hiểu 1 chút kiến thức về unit testing trong larave. Chính vì vậy mà hôm nay tớ ngoi lên để xin được chia sẻ 1 chút kiến thức mà tớ tìm hiểu được. Biết đâu có bạn nào đấy cũng đang cần:relaxed:

Mình bắt đầu luôn nhé :stuck_out_tongue_winking_eye:

### 1. Convention
**Cấu trúc thư mục**

* Tất cả Unit Tests được đặt trong thư mục tests/Unit (xem config testsuite trong phpunit.xml)

* Tất cả Integration Tests được đặt trong thư mục tests/Integration

* Tất cả Feature Tests được đặt trong thư mục tests/Feature

* Nội dung bên trong thư mục Unit nên có cấu trúc giống với cấu trúc bên trong thư mục app. Ví dụ như Unit Test cho file app/Models/User.php tương ứng là tests/Unit/Models/UserTest.php

**Quy tắc đặt tên**

* Thường có namespace bắt đầu với Tests\ (xem phần autoload-dev trong composer.json)

* Method test nên được bắt đầu bằng test, viết dạng camelCase hay snake_case đều được, nhưng nên chọn 1 trong hai cho thống nhất, prefer snake_case để cho dễ đọc hơn.
    ```
    public function test_store_answer_failed_return_back()
    {
    }
    ```
### 2. Test controller
Controller là thành phần làm nhiệm vụ điều hướng, nó nhận request từ client, gọi đến domain object để thực hiện logic và lấy kết quả trả về.

Với cách làm trên, ta có thể viết test như sau:

**Test unit**
* Test trả về đúng view, data
    ```
    class AnswerControllerTest extends TestCase
    {
        public function test_index_return_view()
        {
            $anwerService = Mockery::mock(AnswerService::class);
            $controller = new AnswerController($answerService);
            $request = new Request();

            $view = $controller->index($request);

            $this->assertEquals('web.answers.index', $view->name());
        }
    }
    ```
* Test redirection
    ```
    public function test_redirect_after_created_success
    {
        $this->assertInstanceOf(RedirectResponse::class, $response);
        $this->assertEquals(route('answer.index'), $response->headers->get('Location'));
    }

    public function test_redirect_after_created_failed()
    {
        $this->assertInstanceOf(RedirectResponse::class, $response);
        $this->assertEquals(route('answer.create'), $response->headers->get('Location'));
    }
    ```
**Test integration với Form Request**

```
    class AnswerControllerTest extends TestCase
    {
        use DatabaseTransactions;

        protected $user;
        protected $question;
        protected $answer;

        public function setUp(): void
        {
            parent::setUp();

            $this->user = factory(User::class)->create([
                'email' => 'answerControllerTest@sun-asterisk.com',
            ]);

            $this->question = factory(Question::class)->create();
            $this->answer = factory(Answer::class)->create([
                'user_id' => $this->user->id,
                'question_id' => $this->question->id,
            ]);

            $this->actingAs($this->user);
        }

        private function validInputs($overrides = [])
        {
            return array_merge([
                'user_id' => $this->user->id,
                'question_id' => $this->question->id,
                'answer' => 'This is answer of question',
            ], $overrides);
        }

        /**
         * @param array $inputs Request data
         *
         * @dataProvider provide_data_validate_answer_failed_when_content_answer_invalid
         */
        public function test_validate_answer_failed_when_content_answer_invalid($inputs)
        {
            $response = $this->postJson(
                action([AnswerController::class, 'store']),
                $this->validInputs($inputs)
            );

            $response->assertStatus(422)
                ->assertJsonStructure(['message', 'errors' => ['answer']]);
        }

        public function provide_data_validate_answer_failed_when_content_answer_invalid()
        {
            return [
                [['answer' => '']],
                [['answer' => '    ']],
            ];
        }
    }
```
### 3. Test Form Request
Form Request Validation giúp cho ta san sẻ được công việc mà Controller lẫn Model phải thực hiện và khiến cho code dễ đọc và đỡ rối hơn.

Vì vậy mình nên thực hiện integration test khi test controller để xem nó có hoạt động như mong muốn khi kết hợp với controller hay không.

Ví dụ mình đã đưa ra bên trên mục **Test integration với Form Request** rồi nhé^^
### 4. Test Model
Trong laravel test model thì mình có thể test như sau:

**Test accessors and mutators**
```
class User extends Model
{
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }
}

class UserTest extends TestCase
{
    public function test_hashes_password_when_set()
    {
        Hash::shouldReceive('make')->once()->andReturn('hashed');

        $author = new User;
        $author->password = 'foo';

        $this->assertEquals('hashed', $author->password);
    }
}
```
 
 **Test scopes**
```
class User extends Model
{
    public function scopeOldest($query)
    {
        return $query->orderBy('age', 'desc');
    }
}

class UserTest extends TestCase
{
    public function test_gets_olders_user()
    {
        // Arrange: Insert two test rows into a test DB
        Factory::create('User', ['age' => 20]);
        Factory::create('User', ['age' => 30]);

        // Act: call the method
        $oldest = User::oldest()->first();

        // Assert
        $this->assertEquals(30, $oldest->age);
    }
}
```
**Test relationships**
```
public function test_answer_belongs_to_user()
    {
        $user = factory(User::class)->create(); 
        $answer = factory(Answer::class)->create(['user_id' => $user->id]); 
        
        $this->assertInstanceOf(BelongsTo::class, $answer->user());
        $this->assertInstanceOf(User::class, $answer->user);
        $this->assertEquals('user_id', $answer->user()->getForeignKeyName());
    }
```
**Test custom methods**
```
class User extends Model
{
    public function fullname()
    {
        return $this->firstname . ' - ' . $this->lastname;
    }
}

class UserTest extends TestCase
{
    public function test_get_full_name()
    {
        $user = new User;
        $user->firstname = 'Thu'
        $user->lastname = 'Hoai'

        $this->assertEquals('Thu Hoai', $user->fullname());
    }
}
```
**Integration test cho việc thiết lập fillable, hidden, casts**
```
public function test_fields_are_fillable()
    {
        $inputs = [
            'user_id' => 10,
            'question_id' => 20,
            'answer' => 'This is answer the question',
        ];

        $answer = Answer::create($inputs);

        $this->assertEquals($inputs['user_id'], $answer->user_id);
        $this->assertEquals($inputs['question_id'], $answer->question_id);
        $this->assertEquals($inputs['answer'], $answer->answer);
    }
```
### 5. Test Service/Repository
Đối với service/repository mình thường thực hiện integration test với DB riêng biệt => để kiểm tra thực tế có update được vào db hay không?
```
class AnswerServiceTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;
    protected $question;
    protected $answer;
    protected $answerService;

    public function setUp(): void
    {
        $this->answerService = app()->make(AnswerService::class);
        parent::setUp();
    }

    public function test_store_success()
    {
        $inputs = [
            'user_id' => 1,
            'question_id' => 1,
            'answer' => 'Create answer of question',
        ];

        $answer = $this->answerService->store($inputs);

        $this->assertNotNull($answer->id);
        $this->assertDatabaseHas('answers', [
            'answer' => $inputs['answer']
        ]);
    }
}
```

Reference:

https://viblo.asia/p/viet-test-trong-laravel-63vKj0R6l2R

https://laravel.com/docs/8.x/http-tests

...