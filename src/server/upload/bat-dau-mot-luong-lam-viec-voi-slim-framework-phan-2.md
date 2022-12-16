Ở bài trước https://viblo.asia/p/bat-dau-voi-framework-slim-4-part-1-E375z6xb5GW mình đã giới thiệu qua về framwork Slim cũng như một vài bước setup cơ bản khi mà Slim yêu cầu mình cần cái gì mới cài cái đó thay như vì laravel sẽ luôn có sẵn đợi chúng ta gọi đến. Bài viết này sẽ tiếp tục các bước còn lại để hoàn chỉnh một project với Slim.

## Route
Cùng đi vào tạo route đầu tiên với slim nhé!

Mở file `config\routes.php` và thêm vào đoạn code dưới đây nhé.
```config\routes.php
<?phpconfig\routes.php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {
    $app->get('/', function (
        ServerRequestInterface $request,
        ResponseInterface $response
    ) {
        $response->getBody()->write('Hello World!');

        return $response;
    });
};
```
Nếu ai đã biết đến laravel thì đoạn khai báo route nãy cũng tương tự như đoạn khai báo route này trong laravel vậy:
```
Route::get('/', function()
{
    return 'Hello World';
});
```
 Nếu bạn yêu cầu truy vấn một trang có định dạng `basepath + '/'` Slim sẽ sử dụng function để xử lý với hai biến đầu vào là $request (nơi chứa các yêu cầu đến server) và $response (sẽ xử lý việc trả về data của server). Cụ thể sẽ là $reponse in ra một dòng text `Hello World!`
 
 ### Good URLs
 ***Lưu ý:*** Thư mục `public/` chỉ là thư mục `DocumentRoot` của máy chủ, nhưng nó sẽ không bao giờ là một phần của base path hay url.
* https://www.example.com
* https://www.example.com/users
* https://www.example.com/my-app
* https://www.example.com/my-app/users

### Bad URLs
* https://www.example.com/public
* https://www.example.com/public/users
* https://www.example.com/my-app/public
* https://www.example.com/my-app/public/users

## Actions
slim cung cấp một số phương thức để thêm controller logic trực tiếp trong function callback. PSR-7 request object được inject vào route của slim như tham số đầu tiên trong callback function.

Cùng xem lại ví dụ về route ở bên trên. Tuy việc khai báo như vậy khá trực quan tuy nhiên nó không hề phù hợp với những kịch bản có logic nghiệp vụ phức tạp. Giả sử có hàng chục hoặc hàng trăm route cần được đăng ký và xử lý. Trừ khi logic của bạn cực kỳ đơn giản tuy nhiên việc viết logic trong callback này có thể làm file route của bạn không hề clean một chút nào, và thực sự điều này không hề được recommend. Sẽ tốt hơn rất nhiều nếu chúng ta có thể đưa phần xử lý logic vào từng file riêng cũng tương tự như laravel và route đơn giản chỉ cần điều hướng về đúng file xử lý đó. Đó là lý do mà `Single Action Controller` được sử dụng.

Mỗi Single Action controller sẽ được đại diện bởi một class riêng của nó.

`Action` sẽ thực hiện những nhiệm vụ sau:
* Thu thập thông tin đầu vào từ Http Request (Nếu cần thiết)
* Gọi đến phần xử lý với các input đã thu thập ở bước trên và giữ lại kết quả
* Tạo Http response(thường trả với kết quả của phần xử lý)

Những logic bao gồm cả validate form đầu vào, xử lý lỗi,.. sẽ được đẩy xuống phần xử lý riêng hoặc trình reder response.

Một response có thể được render tới HTML (thường là twig) cho một web request thông thường hoặc JSON cho RESTful API request,...

Giờ cùng đi tìm hiểu cụ thể xem một luồng khi gọi từ routes đi đến action sẽ xử lý như thế nào.

### Web request
Tạo  một thư mục con: `src/Action`  
Tạo một action class: `src/Action/HomeAction.php`
```src/Action/HomeAction.php
<?php

namespace App\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class HomeAction
{
    public function __invoke(
        ServerRequestInterface $request, 
        ResponseInterface $response
    ): ResponseInterface {
        $response->getBody()->write('Hello World!');

        return $response;
    }
}
```
Sau đó thay đoạn xử lý route `\` trong `config\routes.php` bằng đoạn xử lý sau:
```config\routes.php
<?php

use Slim\App;

return function (App $app) {
    $app->get('/', \App\Action\HomeAction::class)->setName('home');
};
```
Vâng với các bước trên thì thay vì bạn xử lý việc viết dòng chữ `Hello World!` ngay ở route thì bạn sẽ đưa nó về action để xử lý.

### RESTful API request
Với RESTful API request thì thông thường phần action của mình sẽ trả về dưới dạng JSON. Để viết một JSON response hợp lệ bạn có thể viết chuỗi json_encode vào content của response và set content-type của header là `application/json`:

```src/Action/HomeAction.php
<?php

namespace App\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class HomeAction
{
    public function __invoke(
        ServerRequestInterface $request, 
        ResponseInterface $response
    ): ResponseInterface {
        $response->getBody()->write(json_encode(['success' => true]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
```

Mở trình duyệt trang home và bạn sẽ nhận được kết quả `{"success":true}`

Trong trường hợp bạn muốn đổi status code của response trả về bạn chỉ cần sử dụng phương thức `$response->withStatus(x)` Ví dụ:
```
$result = ['error' => ['message' => 'Validation failed']];

$response->getBody()->write(json_encode($result));

return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(422);
```

Trên đây là cách sử dụng một action cơ bản, nhưng như mình nói ở phía trên action chủ yến chỉ nên thực hiện việc nhận input điều hướng đến phần xử lý input lấy kết quả đó và trả về response. Vậy phần xử lý được Action gọi đến sẽ như thế nào?
## Domain
Vâng đây chính là phần mà Action gọi đến xử lý logic như mình đã nói ở phía trên

Quên CRUD đi, API của bạn sẽ phải thực hiện xử lý với nghiệp vụ chứ không đơn giản chỉ là các thao tác với database.

Bạn không nên để các xử lý logic trong action. Phần xử lý đó sẽ được action gọi đến domain, resp, service. Nếu bạn muốn tái sử dụng service ở nhiều action khác nhau thì bạn chỉ cần gọi đến service của mình ở action đó.

### Service
Như đã giải thích ở phía trên thì service sẽ thực hiện logic nghiệp vụ

Tạo `UserCreator` service như dưới đây:
```src/Domain/User/Service/UserCreator.php
<?php

namespace App\Domain\User\Service;

use App\Domain\User\Repository\UserCreatorRepository;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class UserCreator
{
    /**
     * @var UserCreatorRepository
     */
    private $repository;

    /**
     * The constructor.
     *
     * @param UserCreatorRepository $repository The repository
     */
    public function __construct(UserCreatorRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Create a new user.
     *
     * @param array $data The form data
     *
     * @return int The new user ID
     */
    public function createUser(array $data): int
    {
        // Input validation
        $this->validateNewUser($data);

        // Insert user
        $userId = $this->repository->insertUser($data);

        // Logging here: User created successfully
        //$this->logger->info(sprintf('User created successfully: %s', $userId));

        return $userId;
    }

    /**
     * Input validation.
     *
     * @param array $data The form data
     *
     * @throws ValidationException
     *
     * @return void
     */
    private function validateNewUser(array $data): void
    {
        $errors = [];

        // Here you can also use your preferred validation library

        if (empty($data['username'])) {
            $errors['username'] = 'Input required';
        }

        if (empty($data['email'])) {
            $errors['email'] = 'Input required';
        } elseif (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
            $errors['email'] = 'Invalid email address';
        }

        if ($errors) {
            throw new ValidationException('Please check your input', $errors);
        }
    }
}
```
Giải thích qua đoạn code trên một chút. Nó có nhiệm vụ xử lý logic nhận input, validate input, nếu validate fail nó sẽ throw ra lỗi ValidationExceoption và yêu cầu check lại input, còn nếu input hợp lệ nó sẽ gọi đến repository (phần làm việc với db) để tạo một user mới.

Và đoạn repository hay ValidationException mình vừa nhắc đến lại là thứ chúng ta phải đi tìm hiểu tiếp theo.

### Validation
ValidationException sẽ không phải là một thứ có sẵn mà mình phải tạo ra nó:
```src/Exception/ValidationException.php
<?php

namespace App\Exception;

use RuntimeException;
use Throwable;

final class ValidationException extends RuntimeException
{
    private $errors;

    public function __construct(
        string $message, 
        array $errors = [], 
        int $code = 422, 
        Throwable $previous = null
    ){
        parent::__construct($message, $code, $previous);

        $this->errors = $errors;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
```

ValidationException sẽ có status code là 422, messsage và error chính là message và mảng các error. Pattern này gọi là [Notification pattern](https://martinfowler.com/articles/replaceThrowWithNotification.html)

Nếu bạn thích pattern này cho việc validate thì thư viện này sẽ được recommend nhé: [selective/validation](https://github.com/selective-php/validation). 
### Repository
Repository sẽ chịu trách nhiệm làm việc với database.

có hai loại repository:  `collection-oriented` và `persistence-oriented` repositories. Trong bài viết này chúng ta sẽ nói về `persistence-oriented repositories`
vì chúng hợp với việc xử lý một lượng lớn dữ liệu.

Repository sẽ là source của tất cả dữ liệu mà ứng dụng của bạn cần và nó cũng là trung gian giữa service và database. Một repository sẽ cải thiện khả năng maintain, test và readable bằng cách tách logic nghiệp  vụ ra khỏi logic thao tác dữ liệu và cung cấp các quy tắc truy cập được quản lý tập trung và nhất quán cho một nguồn dữ liệu.

Mỗi public repository sẽ đại diện cho một câu truy vấn. Giá trị trả về sẽ đại diện cho kết quả của câu truy vấn đó. Transaction sẽ được xử lý ở level cao hơn như service mà không phải trong repository.

Cùng thử tạo một repository thao tác với bảng `user`.

Chạy câu lệnh sql sau để tạo bảng user ở database test của bạn
```
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Setting kết nối db
```config/settings.php
// Database settings
$settings['db'] = [
    'driver' => 'mysql',
    'host' => 'localhost',
    'username' => 'root',
    'database' => 'test',
    'password' => '',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'flags' => [
        // Turn off persistent connections
        PDO::ATTR_PERSISTENT => false,
        // Enable exceptions
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        // Emulate prepared statements
        PDO::ATTR_EMULATE_PREPARES => true,
        // Set default fetch mode to array
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        // Set character set
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci'
    ],
];
```
***Lưu ý**: Sử dụng PDO và SQL ở đây chỉ cho mục đích học tập. Trong một ứng dụng thực tế, việc sử dụng SQL QuickBuilder sẽ được khuyến khích vì nó sẽ hữu ích trong việc bảo trì và bảo mật.*

Chèn định nghĩa cho PDO::class vào container: `config/container.php`
```
PDO::class => function (ContainerInterface $container) {
    $settings = $container->get('settings')['db'];

    $host = $settings['host'];
    $dbname = $settings['database'];
    $username = $settings['username'];
    $password = $settings['password'];
    $charset = $settings['charset'];
    $flags = $settings['flags'];
    $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";

    return new PDO($dsn, $username, $password, $flags);
},
```

Kể từ bây giờ, PHP-DI sẽ luôn được inject cùng PDO instance ngay khi chúng ta khai báo PDO trong constructor dạng dependency.

Tạo thư mục `src/Domain/User/Repository`
Tạo file `src/Domain/User/Repository/UserCreatorRepository.php` và thêm vào đoạn code
```UserCreatorRepository.php
<?php

namespace App\Domain\User\Repository;

use PDO;

/**
 * Repository.
 */
class UserCreatorRepository
{
    /**
     * @var PDO The database connection
     */
    private $connection;

    /**
     * Constructor.
     *
     * @param PDO $connection The database connection
     */
    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    /**
     * Insert user row.
     *
     * @param array $user The user
     *
     * @return int The new ID
     */
    public function insertUser(array $user): int
    {
        $row = [
            'username' => $user['username'],
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email'],
        ];

        $sql = "INSERT INTO users SET 
                username=:username, 
                first_name=:first_name, 
                last_name=:last_name, 
                email=:email;";

        $this->connection->prepare($sql)->execute($row);

        return (int)$this->connection->lastInsertId();
    }
}

```
Lưu ý khai báo PDO class là bắt buộc với tất cả các repository vì nó chứa phần code kết nối db và tất nhiên rồi repository là phần phải thao tác với db.

Cuối cùng là khai báo thêm một routes phương thức Post để tạo user
```
$app->post('/users', \App\Action\UserCreateAction::class);
```

Và `UserCreateAction` class sẽ được định nghĩa như sau:
```UserCreateAction.php
<?php

namespace App\Action;

use App\Domain\User\Service\UserCreator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class UserCreateAction
{
    private $userCreator;

    public function __construct(UserCreator $userCreator)
    {
        $this->userCreator = $userCreator;
    }

    public function __invoke(
        ServerRequestInterface $request, 
        ResponseInterface $response
    ): ResponseInterface {
        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();

        // Invoke the Domain with inputs and retain the result
        $userId = $this->userCreator->createUser($data);

        // Transform the result into the JSON representation
        $result = [
            'user_id' => $userId
        ];

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    }
}
```

Đoạn này sẽ lấy input từ request và truyền xuống service và như ở phía trên đã giải thích service thực hiện việc validate và insert bản ghi mới vào db bằng việc gọi đến repository. Và cuối cùng trả về reponse dạn json.

Như vậy là chúng ta đã tìm hiểu xong một luồng làm việc của request. Cấu trúc thư mục sẽ có dạng
![](https://images.viblo.asia/8c6c27c8-6a63-4e16-89af-5298202e79c1.png)
Chúc bạn thành công.

## Tài liệu tham khảo
>https://odan.github.io/2019/11/05/slim4-tutorial.html#actions