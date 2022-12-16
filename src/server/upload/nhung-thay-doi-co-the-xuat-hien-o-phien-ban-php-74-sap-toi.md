Khi bản cập nhật mới nhất của `PHP 7.3` vừa được ra mắt hôm 10/01 còn hết hot thì nhiều blog công nghệ đã đưa ra nhiều đồn đoán về thế hệ tiếp theo của `PHP 7`, sẽ  được cập nhật vào tháng 11/2019. Sau đây, chúng ta cùng điểm qua một vài thay đỏi được đề xuất trong phiên bản sắp tới nhé.

- [Có gì mới ở PHP 7.3 Alpha 1?](https://viblo.asia/p/co-gi-moi-o-php-73-alpha-1-vyDZOWqPZwj)

## Những thay đổi có thể xuất hiện ở phiên bản PHP 7.4 sắp tới.

### 1. Preloading
`Preloading` là một bổ sung tuyệt vời cho PHP core, nó sẽ đem lại cải thiện hiệu suất lớn. Nếu bạn đang phải thường xuyên sử dụng các framework, toàn bộ file phải tải và biên dịch lại mỗi request. `Preloading` cho phép server tải PHP file vào memory khi khởi động và khiến chúng luôn sẵn sàng cho các request tiếp theo.

Tuy nhiên chúng ta phải đánh đổi việc khởi động lại server mỗi khi file được preload thay đổi để đổi lấy cải thiện về hiệu năng như trên.

### 2. Typed properties

Các biến của `Class` có thể được type-hinted:

``` php
class A
{
    public int $number;
    
    public Foo $bar;
}
```

Cập nhật này khiến chúng ta liên tưởng đến các ngôn ngữ có giằng buộc chặt chẽ về kiểu dữ liệu như C/C++/Java. Nó cũng khá thú vị, nhưng với mình, khi trending của các ngôn ngữ mới đang dần rời bỏ OOP thì nó đem lại chút bối rối (confused). Và theo như mình biết, thì `Typed properties` đã được merged và xác nhận là sẽ có mặt ở phiên bản `PHP 7.4`.

### 3. Improved type variance

Hiện tại các tham số truyền vào hàm đều có kiểu cố định và khi return cũng vậy. Điều này dẫn tới, nếu method của lớp cha có tham số và giá trị trả về kiểu T, thì tương ứng method của lớp con kế thừa cũng phải đảm bảo điều này. Khá là bất tiện, vì vậy trong phiên bản tới, PHP đang muốn cải thiện điều này như sau

``` php
class ParentType {}
class ChildType extends ParentType {}

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

với tham số truyền vào cũng vậy

``` php
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

### 4. Foreign Function Interface

Foreign Function Interface, `FFI`, cho phép thực thi một đoạn code ngôn ngữ C và sử dụng kiểu dữ liệu của ngôn ngữ C, điều này giúp việc phát triển `system code` trở nên linh hoạt và hiệu quả hơn. `FFI` là một tính năng khiên Python và LuaJIT cực kỳ hữu dụng cho việc triển khai nhanh ứng dụng. Với PHP, `FFI` hướng tới việc viết các PHP extensions và binding chúng tới C libraries trong PHP.

- Gọi tới các hàm từ `shared library`

``` php
<?php
// Tạo FFI object, nạp libc và export hàm printf() của C
$ffi = FFI::cdef(
    "int printf(const char *format, ...);",
    "libc.so.6");
// Gọi tới hàm printf() của C
$ffi->printf("Hello %s!\n", "world");
```

### 5. Null Coalescing Assignment Operator
Toán tử kết hợp với việc gán giá trị đã xuất hiện từ lâu. Ví dụ như `$x = $x + 3` bạn có thể viết ngắn thành `$x += 3`. PHP là một ngôn ngữ tập trung vào web, toán tử `??` thường xuyên được sử dụng để kiểm tra biến tồn tại hay không như 

``` php
$username = $_GET['user'] ?? 'nobody';
```
Vầ khi có vài trường hợp tên biến dài hơn `$username` , việc sử dụng `??` sẽ lặp lại tên biến đó

``` php
$this->request->data['comments']['user_id'] = $this->request->data['comments']['user_id'] ?? 'value';
```

Vì thế đề xuất toán tử kết hợp việc gán giá trị sẽ vô cùng hữu ích, thay vì lặp lại đoạn code như trên, ta đơn giarn viết thành

``` php
$this->request->data['comments']['user_id'] ??= 'value';
```

### 6. `ext-hash` luôn được enabled

Hash extension cung cấp nhiều thuật toán hashing  đặc biệt quan trọng trong các ứng dụng hiện nay cho người dùng, và đội ngũ phát triển PHP. Gần đây, ở 1 topic trên Github xuất hiện một đề nghị `ext-hash` nên trở thành một extension đặc biệt, giống như `date`,  `spl` và `pcre`, nó không thể bị disable.