# Giới thiệu
Slim là một framework nhỏ, siêu nhẹ của PHP giúp bạn nhanh chóng viết các ứng dụng web và API đơn giản nhưng mạnh mẽ. Nó đang nhanh chóng trở thành PHP framework được lựa chọn nhiều nhất để phát triển API và các ứng dụng web nhỏ.
Mặc dù bạn có thể tạo REST API trong một số framework khác như Laravel, CakePHP,  Symfony, Codeigniter, ... nhưng chúng cần có rất nhiều nỗ lực mới có thể học được và thường quá rườm rà để sử dụng trong các dự án cần phát triển nhanh.
![](https://images.viblo.asia/f0f7582a-a311-406d-b452-d7d1aea0a14c.jpg)

Slim hỗ trợ tất cả các phương thức HTTP (GET, POST, PUT, DELETE). Slim có cấu trúc URL rất tiện dụng với các route, middlewares, bodyparser cùng với page templates, flash message, encrypted  cookie, ...

# Cài đặt
Đầu tiên chúng ta sẽ cần phải cài đặt Slim framework cho dự án REST API.
## Step 1: Cài đặt Slim Framework từ Composer
Chạy lệnh này tại thư mục mà bạn muốn cài đặt ứng dụng Slim Framework.
```
composer create-project slim/slim-skeleton [my-app-name]
```
Thay thế [my-app-name] bằng tên thư mục của bạn.
Để chạy ứng dụng trong quá trình phát triển, bạn có thể chạy lệnh này:
```
composer start
```
Chạy http://localhost:8080 bạn sẽ thấy giao diện của Slim3.
![](https://images.viblo.asia/9b105db6-c5be-48bf-bc22-dc7a748c64ae.png)
## Step 2: Kết nối database
Slim không đi kèm với một tiện ích kết nối cơ sở dữ liệu của riêng nó. Bạn có thể sử dụng bất kỳ bộ công cụ kết nối cơ sở dữ liệu mà bạn muốn. Hôm nay trong ứng dụng demo, mình sẽ sử dụng MYSQL.
Mình sẽ demo 1 database có bảng `library` (thư viện sách):

**1. Tạo bảng.**

```sql
CREATE TABLE IF NOT EXISTS `library` (

 id int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,

 book_name varchar(100) NOT NULL,

 book_isbn varchar(100) NOT NULL,

 book_category varchar(100) NOT NULL

) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
```

**2. Kết nối Slim với database**

Mởf ile `src/settings.php` của bạn và cài đặt cơ sở dữ liệu của bạn bằng cách thêm code dưới đây:
```
 // Database connection settings
        "db" => [
            "host" => "locahost",
            "dbname" => "your-database-name",
            "user" => "your-mysql-user",
            "pass" => "your-mysql-password"
        ],
```
Bây giờ mở file `src/dependencies.php` của bạn và cấu hình thư viện cơ sở dữ liệu. Có rất nhiều thư viện cơ sở dữ liệu có sẵn cho PHP, nhưng ví dụ này sử dụng PDO - đây là thư viện có sẵn trong PHP theo chuẩn vì vậy nó rất hữu ích trong mỗi dự án, hoặc bạn có thể sử dụng thư viện của riêng bạn.
Trong đoạn code dưới đây, chúng ta sẽ chèn đối tượng cơ sở dữ liệu vào container bằng cách sử dụng dependency injection, trong trường hợp này được gọi là db:
```
// PDO database library 
$container['db'] = function ($c) {
    $settings = $c->get('settings')['db'];
    $pdo = new PDO("mysql:host=" . $settings['host'] . ";dbname=" . $settings['dbname'],
        $settings['user'], $settings['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};
```
## Step 3: Viết API
Setup các thứ đủ rồi, bây giờ là lúc để chúng ta tương tác API. Chúng ta sẽ thực hiện gọi các API sau đây:

| Method | URL | Action |
| -------- | -------- | -------- |
| GET | /books | Lấy danh sách tài liệu trong thư viện |
| GET | /book/1	| Lấy tài liệu có id == 1 |
| POST | /book | Thêm mới tài liệu |
| PUT |  /book/1 | Cập nhật tài liệu có id == 1 | 
| DELETE | /book/1 | Xóa tài liệu có id == 1 |

**1. Lấy danh sách tài liệu**

Chúng ta sẽ tạo ra một route mới để khi người dùng truy cập `/books`, nó sẽ trả về một danh sách tất cả tài liệu ở định dạng JSON. Mở `src/routes.php` của bạn và thêm:
```
$app->get('/books', function (Request $request, Response $response, array $args) {
    $db = $this->db->prepare("SELECT * FROM library ORDER BY book_id");
    $db->execute();
    $books = $db->fetchAll();
    return $response->withJson($books);
});
```
Hàm này đơn giản là trả về tất cả các thông tin cần thiết như bạn thấy trong truy vấn này. Để gọi API này sử dụng URL: `http://localhost:8080/books`.
Để làm việc với các API, tôi khuyên bạn nên nên sử dụng Postman (có sẵn từ Chrome App Store). Plugin này rất hữu ích trong việc quản lý và sử dụng API.

Demo:
![](https://images.viblo.asia/f7a7b2bc-1c73-4a4e-8be9-c7a6ce24fb41.png)

**2. Lấy một tài liệu**

Chúng ta sẽ tạo ra một route mới để khi người dùng truy cập `/book/{id}`, nó sẽ trả về một tài liệu ở định dạng JSON.
```
// Retrieve book with id 
 $app->get('/book/[{id}]', function (Request $request, Response $response, array $args) {
    $db = $this->db->prepare("SELECT * FROM library WHERE book_id = :id");
    $db->bindParam("id", $args['id']);
    $db->execute();
    $book = $db->fetchObject();
    return $this->response->withJson($book);
 });
```
Demo:
![](https://images.viblo.asia/cea6dfa2-b994-44f0-b251-a1b29bf46377.png)

**3. Thêm mới tài liệu**

Chúng ta sẽ tạo một route mới để khi người dùng gửi một yêu cầu post lên `/book` với dữ liệu cần thiết, ứng dụng sẽ thêm một bản ghi mới vào cơ sở dữ liệu.
```
// Add a new book
 $app->post('/book', function (Request $request, Response $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO library (`book_name`, `book_isbn`, `book_category`) VALUES (:bookName, :bookIsbn, :bookCategory)";
    $db = $this->db->prepare($sql);
    $db->bindParam("bookName", $input['book_name']);
    $db->bindParam("bookIsbn", $input['book_isbn']);
    $db->bindParam("bookCategory", $input['book_category']);
    $db->execute();
    $input['id'] = $this->db->lastInsertId();
    return $this->response->withJson($input);
 });
```
Mở Postman và click Body. Chon `x.www-form-urlencoded` rồi thêm các params vào thông qua method POST.
Demo:
![](https://images.viblo.asia/9047b177-449d-4db0-ad0c-700cdfe93071.png)

**4. Cập nhật tài liệu**
```
// Update book with given id
 $app->put('/book/[{id}]', function (Request $request, Response $response, array $args) {
    $input = $request->getParsedBody();
    $sql = "UPDATE library SET book_name=:bookName, book_isbn = :bookIsbn, book_category = :bookCategory WHERE id=:id";
    $db = $this->db->prepare($sql);
    $db->bindParam("bookName", $input['book_name']);
    $db->bindParam("bookIsbn", $input['book_isbn']);
    $db->bindParam("bookCategory", $input['book_category']);
    $db->bindParam("id", $args['id']);
    $db->execute();
    $input['id'] = $args['id'];
    return $this->response->withJson($input);
 });
```
Demo:
![](https://images.viblo.asia/539412f4-7eb4-448c-8afa-4ca266ccd5ad.png)

**5. Xóa tài liệu**

```
 // DELETE a book with given id
 $app->delete('/book/[{id}]', function (Request $request, Response $response, array $args) {
    $sth = $this->db->prepare("DELETE FROM library WHERE id=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    return $this->response->withJson();
 });
```
Demo:
![](https://images.viblo.asia/95eac3dd-bc9e-46f8-a8dd-9dc238827226.png)

Đây là file `src/routes.php` cuối cùng hoàn chỉnh:
```
<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/books', function (Request $request, Response $response, array $args) {
    $db = $this->db->prepare("SELECT * FROM library ORDER BY book_id");
    $db->execute();
    $books = $db->fetchAll();
    return $this->response->withJson($books);
});

// Retrieve book with id 
 $app->get('/book/[{id}]', function (Request $request, Response $response, array $args) {
    $db = $this->db->prepare("SELECT * FROM library WHERE book_id = :id");
    $db->bindParam("id", $args['id']);
    $db->execute();
    $book = $db->fetchObject();
    return $this->response->withJson($book);
 });

// Add a new book
 $app->post('/book', function (Request $request, Response $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO library (`book_name`, `book_isbn`, `book_category`) VALUES (:bookName, :bookIsbn, :bookCategory)";
    $db = $this->db->prepare($sql);
    $db->bindParam("bookName", $input['book_name']);
    $db->bindParam("bookIsbn", $input['book_isbn']);
    $db->bindParam("bookCategory", $input['book_category']);
    $db->execute();
    $input['id'] = $this->db->lastInsertId();
    return $this->response->withJson($input);
 });

// Update book with given id
 $app->put('/book/[{id}]', function (Request $request, Response $response, array $args) {
    $input = $request->getParsedBody();
    $sql = "UPDATE library SET book_name=:bookName, book_isbn = :bookIsbn, book_category = :bookCategory WHERE id=:id";
    $db = $this->db->prepare($sql);
    $db->bindParam("bookName", $input['book_name']);
    $db->bindParam("bookIsbn", $input['book_isbn']);
    $db->bindParam("bookCategory", $input['book_category']);
    $db->bindParam("id", $args['id']);
    $db->execute();
    $input['id'] = $args['id'];
    return $this->response->withJson($input);
 });

 // DELETE a book with given id
 $app->delete('/book/[{id}]', function (Request $request, Response $response, array $args) {
    $sth = $this->db->prepare("DELETE FROM library WHERE id=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    return $this->response->withJson();
 });

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
```
# Kết luận
Tạo và sử dụng REST API với Slim framework rất dễ dàng. Ưu điểm lớn nhất của nó là tính dễ sử dụng và nhẹ.
Hy vọng thông qua bài viết này, ngoài các framework phổ biến ra các bạn có thể có thêm sự lựa chọn về Rest API cho các dự án nhỏ, cần thời gian phát triển nhanh là Slim.
Bài viết này cũng chỉ giới thiệu sơ qua về Rest API với Slim. Vẫn còn rất nhiều thứ khác của Slim nữa, mình sẽ tiếp tục giới thiệu về các tính năng khác của framework nhẹ, nhỏ mà "có võ" này ở các bài tiếp theo.
Nếu bạn cần hiểu rõ hơn về bài viết này hoặc có bất kỳ câu hỏi nào khác về Slim Framework, hãy cho tôi biết qua phần nhận xét.
# Tham khảo
http://www.slimframework.com/
https://www.cloudways.com/blog/simple-rest-api-with-slim-micro-framework/
https://coderwall.com/p/otcphg/create-a-json-restfull-api-using-slim-framework
http://scottnelle.com/616/connecting-slim-framework-mysql/
https://www.phpflow.com/php/create-simple-rest-api-using-slim-framework/
https://arjunphp.com/creating-restful-api-slim-framework/