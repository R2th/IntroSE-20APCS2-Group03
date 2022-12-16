PHP 8 đã được nhắc đến khá nhiều gần đây (ít nhất đối với mình), và sau tới 5 bản release candidate, cuối cùng nó đã có thể sử dụng chính thức vào ngày hôm nay - 26/11/2020, thay vì kèm dòng cảnh báo `Please DO NOT use this version in production, it is an early test version.` 😅😅 

Là một bản cập nhật lớn, PHP 8 đi kèm với rất nhiều tính năng mới và cải thiện hiệu suất. Tuy nhiên, nếu bạn đang xài php7.2 trở xuống, khả năng cao dự án của bạn sẽ cần thay đổi chút ít để có thể chạy mượt mà trên PHP 8, nếu bạn có dự định nâng cấp :3 nhưng chắc không mấy ai thay đổi môi trường cho dự án đang chạy đâu 😂😂



# Tính năng mới
Hãy điểm qua vài tính năng hay ho mới của PHP 8, mà mình nghĩ các bạn theo PHP sẽ thích thú 😉😉

## Union types
Giúp cho kiểu dữ liệu của PHP có thể linh hoạt hơn. `Union types` là một tập hợp 2 hoặc nhiều kiểu dữ liệu cho cùng 1 biến

```php
public function foo(array|string $input): int|float;
```

Cẩn thận một chút là `void` không thể là 1 phần của khai báo `union types`, vì nó chẳng trả về giá trị gì cả =]]. Ngoài ra `nullable` có thể xài trong `unions type` bằng cú pháp `|null`, hoặc sử dụng dấu `?`

```php
public function foo(array|null $foo): void;

public function bar(?string $bar): void;
```

## Nullsafe operator
Mọi người mà quen thuộc cái `null coalescing operator`, kiểu `$a ?? 'baro'` thì chắc cũng biết, cái đồ chơi này không hoạt động với function. Nên bạn vẫn phải check bằng cơm qua if else, hoặc nếu xài laravel thì có thêm helper `optional()`. Ví dụ như:

```php
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
```

Thì với PHP 8, các bạn có thể tóm gọn nó như này:

```php
$country = $session?->user?->getAddress()?->country;
```

## Named arguments
Đồ chơi này cho phép các bạn truyền giá trị cho tham số, nhưng thông qua key của tham số đó. Vì thế bạn không còn phải quan tâm tới thứ tự tham số, cũng như bỏ qua một số tham số không bắt buộc
```php
function foo(string $a, string $b, ?string $c = null, ?string $d = null, ?string $e = null) 
{ /* … */ }

foo(
    e: 'value b', 
    a: 'value a', 
    c: 'value r',
    b: 'value o',
);
```

## Match expression
Họ hàng anh em với `switch case`, `match` trả về trực tiếp giá trị và lược bỏ `break`
```php
echo match (200) {
  '200', '401', '404' => "Oh no!",
  200 => "It seems good.",
};
//> It seems good.
```

## Constructor property promotion
Bạn nào xài php chắc đã quá quen với cảnh này
```php
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
Và đồ chơi tiếp theo sẽ giúp tiết kiệm kha khá dòng code chỉ để khai báo mấy cái propertise như trên, đặc biệt là ai đang xài Laravel Livewire chắc sẽ thích 😆😆

```php
class Point {
  public function __construct(
    public float $x = 0.0,
    public float $y = 0.0,
    public float $z = 0.0,
  ) {}
}
```

## Throw expression
Với phiên bản này, `throw` sẽ là một expression thay vì statement như trước. Tức là bạn có thể viết như này 
```php
$triggerException = fn () => throw new ApiException();

$order = $list['order'] ?? throw new OrderNotFound('order');
```


### Và còn nhiều nhiều nữa...
Phiên bản này có rất nhiều thay đổi, mình tạm thời mồi chài vài thứ hay ho ra đây cho các bạn quan tâm đã 😄😄

Xem thêm chi tiết tại [Trang chủ PHP 8](https://www.php.net/releases/8.0/en.php) nhé