## 1. Lời mở đầu
PHP phiên bản 8.0 đã được chính thức phát hành một thời gian, theo các chuyên gia thì PHP có khá nhiều công nghệ đột phá nhằm tăng tính liên kết và cải thiện tốc độ xử lý. Vậy chúng ta cùng nhau tìm hiểu xem php8.0 có gì khác mới mẽ nhé.

## 2. Các tính năng mới
### 1. Attributes
Thay vì chú thích PHPDoc, giờ đây bạn có thể sử dụng siêu dữ liệu có cấu trúc với cú pháp gốc của PHP.

```
/*** PHP 7 ***/
class PostsController
{
    /**
     * @Route("/api/posts/{id}", methods={"GET"})
     */
    public function get($id) { /* ... */ }
}

/*** PHP 8 ***/
class PostsController
{
    #[Route("/api/posts/{id}", methods: ["GET"])]
    public function get($id) { /* ... */ }
}
```

### 2. Union types (Hợp nhất các kiểu)
Thay vì các chú thích PHPDoc cho sự kết hợp của các kiểu, bạn có thể sử dụng các khai báo kiểu liên minh gốc được xác thực trong thời gian chạy.

```
/*** PHP 7 ***/
class Number {
  /** @var int|float */
  private $number;

  /**
   * @param float|int $number
   */
  public function __construct($number) {
    $this->number = $number;
  }
}

new Number('NaN'); // Ok

/*** PHP 8 ***/
class Number {
  public function __construct(
    private int|float $number
  ) {}
}

new Number('NaN'); // TypeError
```

### 2. JIT (Just in Time)

Tính năng được mong đợi nhất ở lần cập nhật này. Vậy JIT là gì?

PHP JIT được thực hiện gần như độc lập, nó có thể được bật / tắt vào lúc biên dịch mã code PHP. Khi được bật, mã PHP được lưu trữ trong một vùng nhớ cache và sẽ được chạy khi có yêu cầu.

Nói một cách ngắn gọn thì JIT sẽ giúp PHP biên dịch nhanh hơn, đây là điều mà các lập trình viên mong muốn nhất ở bất kì một ngôn ngữ lập trình nào.

Bạn có thể tìm hiểu thêm về JIT [ở đây](https://stitcher.io/blog/php-8-nullsafe-operator) hoặc [ở đây](https://wiki.php.net/rfc/jit)

![](https://images.viblo.asia/e2b2b1e7-0513-4d40-b8d6-fe28c001961a.png)

### 3. Toán tử nullsafe
Thay vì điều kiện kiểm tra null, bây giờ bạn có thể sử dụng một chuỗi các cuộc gọi với toán tử nullsafe mới. Khi đánh giá một phần tử trong chuỗi fails, quá trình thực thi của toàn bộ chuỗi sẽ bị hủy bỏ và toàn bộ chuỗi được gán là null.

```
/*** PHP 7 ***/
$country =  null;

if ($session !== null) {
  $user = $session->user;

  if ($user !== null) {
    $address = $user->getAddress();
 
    if ($address !== null) {
      $country = $address->country;
    }
  }
}

/*** PHP 8 ***/
$country = $session?->user?->getAddress()?->country;
```

### 4. Match expression
Match là biểu thức mới tương tự như switch và có các tính năng sau:

Match là một biểu thức, có nghĩa là kết quả của nó có thể được lưu trữ trong một biến hoặc được trả về. Các nhánh so sánh chỉ hỗ trợ các biểu thức một dòng và không cần break; để kết thúc lệnh. Match không so sánh chặt chẽ.

```
/*** PHP 7 ***/
switch (8.0) {
  case '8.0':
    $result = "Oh no!";
    break;
  case 8.0:
    $result = "This is what I expected";
    break;
}
echo $result;
//> Oh no!


/*** PHP 8 ***/
echo match (8.0) {
  '8.0' => "Oh no!",
  8.0 => "This is what I expected",
};
//> This is what I expected
```

### 5. Named arguments (Đối số được đặt tên)
Chỉ xác định các thông số bắt buộc, bỏ qua các thông số tùy chọn.
Các lập luận không phụ thuộc vào trật tự và tự ghi lại.

```
/*** PHP 7 ***/
htmlspecialchars($string, ENT_COMPAT | ENT_HTML401, 'UTF-8', false);

/*** PHP 8 ***/
htmlspecialchars($string, double_encode: false);
```

### 6. Consistent type errors for internal functions (Nhất quán lỗi cho các chức năng nội bộ)
Hầu hết các chức năng nội bộ hiện ném Error exception nếu việc xác thực các tham số không thành công.

```
/*** PHP 7 ***/
strlen([]); // Warning: strlen() expects parameter 1 to be string, array given

array_chunk([], -1); // Warning: array_chunk(): Size parameter expected to be greater than 0

/*** PHP 8 ***/
strlen([]); // TypeError: strlen(): Argument #1 ($str) must be of type string, array given

array_chunk([], -1); // ValueError: array_chunk(): Argument #2 ($length) must be greater than 0
```

### 7. Constructor property promotion
RFC này bổ sung thêm đường cú pháp để tạo các đối tượng giá trị hoặc đối tượng truyền dữ liệu. Thay vì chỉ định các thuộc tính của lớp và một hàm tạo cho chúng, PHP giờ có thể kết hợp chúng thành một, giúp tiết kiệm viết mã hơn để xác định và khởi tạo thuộc tính.

Với PHP7 trở về trước thì chúng ta phải khai báo các thuộc tính một cách rõ ràng. Trong hàm khởi tạo constructor nếu muốn gắn giá trị lúc khởi tạo thì cũng phải chỉ định một cách cụ thể. Xem ví dụ sau:

```
/*** PHP 7 ***/
class Point {
  public float $x;
  public float $y;
  public float $z;

  public function __construct(
    float $x = 0.0,
    float $y = 0.0,
    float $z = 0.0,
  ) {
    $this->x = $x;
    $this->y = $y;
    $this->z = $z;
  }
}
```

Đoạn code trên quả nhiên khá dài dòng, vì vậy theo ông Nikita Popov (tác giả của RFC) tiết lộ sẽ rút gọn lại cách khai báo các tham số bằng cách đặt trong các tham số ở hàm khởi tạo luôn. Cụ thể như ví dụ trên sẽ được viết lại như sau:

```
/*** PHP 8 ***/
class Point {
  public function __construct(
    public float $x = 0.0,
    public float $y = 0.0,
    public float $z = 0.0,
  ) {}
}
```

Tuy nhiên theo cá nhân mình thấy viết cách này đúng là rất ngắn gọn, nhưng sẽ khó nhìn và kiểm soát tham số hơn cho lập trình viên. Nhưng nếu code quen thì cũng có thể chấp nhận được vì nó quá tiện.

## 3. Tổng kết
Trong bài viết này là một vài tính năng cơ bản được cập nhật ở phiên bản PHP 8. Hy vọng trong thời gian tới chúng ta sẽ được trải nghiệm những tính năng tuyệt vời của PHP 8 trong các dự án mới nhé.

**Nguồn tham khảo**

https://www.php.net/

https://wiki.php.net/rfc/jit