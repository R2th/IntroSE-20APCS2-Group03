PHP 7.4 có lẽ sẽ được phát hành vào khoảng tháng 12 năm 2019 (thời điểm viết bài là tháng 5/2019), tuy nhiên thông tin này chưa được xác nhận. Cùng xem sẽ có những thay đổi gì mới nhé. :D

Bài này mình có đăng trên blog cá nhân ở đây :rofl::rofl::rofl::rofl::rofl::rofl:: [Có gì mới ở PHP 7.4 ](https://nobi.dev/p/co-gi-moi-o-php-7-4/)

-----


## Short closures / Short arrow function
Short closures ([Short arrow function](https://nobi.dev/t/php-arrow-functions/)) giúp bạn code closure function một cách ngắn gọn hơn

```php
$result = Collection::from([1, 2])
    ->map(function ($v) {
        return $v * 2;
    })
    ->reduce(function ($tmp, $v) {
        return $tmp + $v;
    }, 0);

echo $result; // 6

// with arrow functions:
$result = Collection::from([1, 2])
    ->map(fn($v) => $v * 2)
    ->reduce(fn($tmp, $v) => $tmp + $v, 0);

echo $result; // 6
```

Bài chi tiết: 
* [PHP đã thông qua Short Arrow Functions RFC (hàm mũi tên)](https://nobi.dev/p/php-da-thong-qua-short-arrow-functions-rfc-ham-mui-ten/)
* [PHP RFC: Arrow Functions 2.0](https://wiki.php.net/rfc/arrow_functions_v2)
# Typed properties
Ở phiên bản [PHP 7.4](https://nobi.dev/t/php-7-4/), bạn có thể type-hinted các properties của Class

```php
class Example
{
    // Toàn bộ các kiểu đều được hỗ trợ, ngoại trừ "void" và"callable"
    public int $scalarType;
    protected ClassName $classType;
    private ?ClassName $nullableClassType;
    
    // Kiểu cũng hợp lệ trên các thuộc tính tĩnh
    public static iterable $staticProp;
    
    // Kiểu cũng có thể được sử dụng với ký hiệu/từ khóa "var"
    var bool $flag;
    
    // Typed properties có thể có các giá trị mặc định
    public string $str = "foo";
    public ?string $nullableStr = null;
    
    // Kiểu áp dụng cho tất cả các thuộc tính trong một lần khai báo
    public float $x, $y;
    
    // tương đương với:
    public float $x;
    public float $y;
}
```

Bài chi tiết: [PHP RFC: Typed Properties 2.0](https://wiki.php.net/rfc/typed_properties_v2)

## Improved type variance
Kiểu trả về của function được ghi đè trong class con sẽ không bắt buộc phải giống với kiểu trả về của function đó trong class cha nữa:

```php
class ParentType
{
    //
}

class ChildType extends ParentType
{
    //
}

class A
{
    public function covariantReturnTypes(): ParentType
    { /* … */ }
}

class B extends A
{
    public function covariantReturnTypes(): ChildType
    { /* … */ }
}
```

Tương tự là kiểu của tham số truyền vào cũng không bắt buộc phải giống với function của class cha nữa:

```php
class A
{
    public function contraVariantArguments(ChildType $type)
    { /* … */ }
}

class B extends A
{
    public function contraVariantArguments(ParentType $type)
    { /* … */ }
}
```

Bài chi tiết: [PHP RFC: Covariant Returns and Contravariant Parameters](https://wiki.php.net/rfc/covariant-returns-and-contravariant-parameters)

## Null Coalescing Assignment Operator
Là một toán tử mới, thay vì code như này:


```php
$data['date'] = $data['date'] ?? new DateTime();
```

thì bạn có thể code ngắn hơn ở PHP 7.4 như sau:

```php
$data['date'] ??= new DateTime();
```

Bài chi tiết: [PHP RFC: Null Coalescing Assignment Operator](https://wiki.php.net/rfc/null_coalesce_equal_operator)

## Array spread operator
Bạn sẽ có thể sử dụng toán tử `...` cho arrays, lưu ý là chỉ sử dụng được với array có keys có kiểu là numeric thôi nhé:

```php
$arrayA = [1, 2, 3];

$arrayB = [4, 5];

$result = [0, ...$arrayA, ...$arrayB, 6 ,7];

// [0, 1, 2, 3, 4, 5, 6, 7]
```

Bài chi tiết:
* [Spread Operator cho mảng sẽ xuất hiện ở PHP 7.4  ](https://nobi.dev/p/spread-operator-cho-bieu-thuc-mang-se-xuat-hien-o-php-7-4/)
* [Spread Operator in Array Expression](https://wiki.php.net/rfc/spread_operator_for_array)

## Foreign function interface

Foreign Function Interface (viết tắt FFI) cho phép chạy code C bằng cách gọi từ PHP, điều đó có nghĩa PHP extensions sẽ được có thể được viết bằng code PHP thuần, tất nhiên bạn vẫn phải có kiến thức về C :D

Bài chi tiết: [PHP RFC: FFI - Foreign Function Interface](https://wiki.php.net/rfc/ffi)

## Preloading

Preloading là một bổ sung tuyệt vời cho PHP core, có thể dẫn đến một số cải tiến hiệu suất lớn.

Nếu bạn đang phải thường xuyên sử dụng các framework hiện nay, toàn bộ file sẽ phải tải và biên dịch lại mỗi khi có request.

Preloading cho phép server tải PHP file vào memory khi khởi động và khiến chúng luôn sẵn sàng cho các request tiếp theo.

Tuy nhiên chúng ta phải đánh đổi việc khởi động lại server mỗi khi file được preload thay đổi để đổi lấy cải thiện về hiệu năng như trên.

Bài chi tiết: [PHP RFC: Preloading](https://wiki.php.net/rfc/preload)

## Custom object serialization

Bài chi tiết: [PHP RFC: New custom object serialization mechanism](https://wiki.php.net/rfc/custom_object_serialization)

## Reflection for references
Class `ReflectionReference` được thêm vào ở PHP 7.4.

Bài chi tiết: [PHP RFC: Reflection for references](https://wiki.php.net/rfc/reference_reflection)

## Thêm function `mb_str_split`

Thêm function `mb_str_split` tương tự như `str_split` nhưng với multi byte strings.

Bài chi tiết: [PHP RFC: mb_str_split](https://wiki.php.net/rfc/mb_str_split)

## Extension `ext-hash` sẽ luôn được kích hoạt

Như tiêu đề  `ext-hash` sẽ luôn được kích hoạt khi bạn install PHP 7.4

Bài chi tiết: [RFC: Always available hash extension](https://wiki.php.net/rfc/permanent_hash_ext)

## PEAR sẽ không được kích hoạt mặc định nữa

Vì BEAR không được maintain tích cực nữa nên sẽ không được kích hoạt mặc định khi cài PHP 7.4

## Password Hashing Registry

Những thay đổi bên trong về cách sử dụng các thư viện hash, để người dùng dễ sử dụng chúng hơn.

Bài chi tiết: [PHP RFC: Password Hashing Registry](https://wiki.php.net/rfc/password_registry)

## Deprecate `ext/wwdx`

Bài chi tiết: [PHP RFC: Unbundle ext/wddx](https://wiki.php.net/rfc/deprecate-and-remove-ext-wddx)

## PHP Short open tags deprecated

PHP Short open tags `<?` sẽ không khuyến khích dùng nữa và sẽ bị loại bỏ ở PHP 8. Cú pháp `<?=` không bị ảnh hưởng.

Bài chi tiết: [PHP RFC: Deprecate PHP Short open tags](https://wiki.php.net/rfc/deprecate_php_short_tags)

## Deprecate left-associative ternary operator

```php
// cách viết này sẽ không được khuyến khích sử dụng nữa và sẽ báo lỗi ở PHP 8
1 ? 2 : 3 ? 4 : 5;   

// thế này thì OK
(1 ? 2 : 3) ? 4 : 5;
```

Bài viết chi tiết: [PHP RFC: Deprecate left-associative ternary operator](https://wiki.php.net/rfc/ternary_associativity)

## Cải tiến quy trình bỏ phiếu RFC
Cải tiến có vẻ không liên quan đến PHP 7.4 lắm, tuy nhiên:

* RFC luôn cần hơn 2/3 phiếu đồng thuận để được chấp nhận.
* Sẽ không có RFC có thời gian bỏ phiếu ngắn nữa, tất cả RFC phải được mở ít nhất 2 tuần.

## Vấn đề tương thích ngược với các phiên bản PHP cũ hơn

Xem [tài liệu nâng cấp](https://github.com/php/php-src/blob/PHP-7.4/UPGRADING) để giải quyết các vấn đề về có thể xảy ra khi nâng cấp lên PHP 7.4.

## Vẫn đang tiếp tục cập nhật... ;)