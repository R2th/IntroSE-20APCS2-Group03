Đôi khi, có thể có một số yêu cầu cần phải chạy các raw queries trong Laravel. Trong bài viết này, bạn sẽ tìm hiểu cách chạy các raw queries trong Laravel và cách ngăn chặn SQL injection với nó.

### Prerequisites

* Làm việc ứng dụng Laravel và nhiệt tình học hỏi :)
* Ở đây tôi sẽ giới thiệu các ví dụ đơn giản phải cung cấp cho bạn thông tin chi tiết về cách chạy các truy vấn phức tạp

### Running RAW Queries Syntax

Để chạy raw queries bạn sử dụng phương thức `DB::select()` với cú pháp như sau:

```php
\DB::select("
    /** Your Query */
");
 ```

 ### Problem (SQL Injection)

 Bạn phải chạy các raw queries như sau.

 Ví dụ: Tôi muốn lấy các posts mà có `author` và `published_on` mà **lớn hơn một số ngày**

 ```php
 $author         = 'Channaveer';
$publishedDate  = '2020-02-01';

$post = \DB::select("
    SELECT 
        id, title, body, author, published_on
    FROM posts
    WHERE
        published_on >= $publishedDate and author = $author
");
```
Không có gì sai trong query trên. Mọi thứ đều hoạt động tốt.

**Còn vấn đề bảo mật thì sao?** Bảo mật đóng một vai trò quan trọng trong ứng dụng của bạn, ngay cả khi bạn chạy ứng dụng cho mục đích nội bộ, có thể phát sinh yêu cầu publish nó ở đâu đó để có thể truy cập từ xa.

Quan sát `published_on >= $publishedDate` và `author = $author` được hardcoded, đây là lỗ hổng thực sự nơi dễ bị SQL Injection  và khai thác cơ sở dữ liệu của bạn.

### Solution (Positional Bindings & Named Bindings)

**Positional Bindings ( ? )**

Tại vị trí binding chúng ta sẽ sử dụng `?` làm chỗ dành cho các giá trị và sau đó chuyển các giá trị này trong tham số thứ 2 thành mảng thông thường và phải tuân theo cùng một chuỗi các vị trí.

> LƯU Ý: Điều tôi muốn nói là với cùng một chuỗi các vị trí  trong ví dụ, `published_on` xuất hiện đầu tiên trong query, do đó, `$publishedDate` xuất hiện trước trong mảng tham số thứ 2 và sau đó là `author` & `$author` tương ứng.

```php
$author         = 'Channaveer';
$publishedDate  = '2020-02-01';

$post = \DB::select("
    SELECT 
        id, title, body, author, published_on
    FROM
        posts
    WHERE
        published_on >= ?
            and
        author = ?
    ",
    [ $publishedDate, $author ]
);
```
<br>

**Named Binding ( : )**

Trong các binding được đặt tên, chúng ta sử dụng `:` với `name` là placeholder. Ví dụ `:publishedOn`. Ở đây không cần phải theo thứ tự thứ nhất và thứ hai như trước đó

```php
$author     = 'Channaveer';
$publishedDate = '2020-02-01';
$post = \DB::select("
    SELECT 
        id, title, body, author, published_on
    FROM
        posts
    WHERE
        published_on >= :publishedDate
          and
        author = :author
    ", 
    [ ":publishedDate" => $publishedDate, ":author" => $author ]
);
```

Điều nay giúp bạn tránh khỏi các SQL Injection.

<br>

**FUN PART**

Bạn có thể chạy các phép toán CRUD của mình trong hàm `\DB:select()`. Nhưng không nên làm như vậy. Vì Laravel đã cho `DB:select` `DB::insert` `DB::update` `DB::delete` `DB::statement` cho nó.

<br>

**CRUD OPERATIONS ( DB::select(), DB::update(), DB::insert(), DB::delete(), DB::statement() )**
> Tip: Tôi thường thích Bindings được đặt tên với `:name` vì nó sẽ rõ ràng hơn và có thể maintainable trong tương lai mà không gặp nhiều rắc rối

<br>

***Fetch Details - DB::select()***

Để lấy bất kỳ details nào từ cơ sở dữ liệu, bạn sử dụng phương thức này như bạn đã thấy trước đó. Điều này trả về mảng kết quả.

```php
$author     = 'Channaveer';
$publishedDate = '2020-02-01';
$post = \DB::select("
    SELECT 
        id, title, body, author, published_on
    FROM
        posts
    WHERE
        published_on >= :publishedDate
          and
        author = :author
    ", 
    [ ":publishedDate" => $publishedDate, ":author" => $author ]
);
```

<br>

***Insert Details - DB::insert()***

Để insert vào bảng cơ sở dữ liệu của bạn, bạn sử dụng phương thức này.Nó nhận query trong tham số đầu tiên và các giá trị trong tham số thứ hai:

```php
$post = \DB::insert("
    INSERT INTO 
        posts
            (title, body, author, published_on)
    VALUES
        (:title, :body, :author, :published_on)
    ", [ 
        ":title"        => request('title'),
        ":body"         => request('body') , 
        ":author"       => session()->get('user_details')->id,
        ":published_on" => request('published_on')
    ]
);
```

<br>

***Update Details - DB::update()***

Để cập nhật các record đã tồn tại chúng ta sử dụng như sau. `update` trả về số lượng rows bị ảnh hưởng.

```php
$post = \DB::update("
    UPDATE 
        posts
    SET
        title      = :title,
        body      = :body,
        published_on  = :published_on
    WHERE
        id = :id
    ", [ 
        "id"      => $id
        ":title"    => request('title'),
        ":body"     => request('body') , 
        ":published_on" => request('published_on')
    ]
);
```

<br>

***Delete Details - DB::delete()***

Để delete bất kỳ record nào từ cơ sở dữ liệu sử dụng theo cách sau. `delete` sẽ trả về số rows bị ảnh hưởng.

```php
$post = \DB::delete("
    DELETE
    FROM 
        posts
    WHERE
        id = :id
    ", [ 
        "id"      => $id
    ]
);
```

<br>

***Generic Statements - DB::statement()***

Nhiều queries không trả về kết quả, vì vậy chạy các câu lệnh chung sẽ sử dụng phương thức này.

```php
\DB::statement("DROP TABLE posts");
```

<br>

### Kết luận
Hy vọng bạn thực sự thích bài viết này, nếu vậy hãy chia sẻ nó với bạn bè của bạn.

<br>

***Tài liệu:*** https://stackcoder.in/posts/how-to-run-raw-queries-securely-in-laravel