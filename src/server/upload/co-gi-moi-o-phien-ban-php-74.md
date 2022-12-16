PHP 7.4 là phiên bản PHP mới nhất được phát hành ngày 28 tháng 11, 2019. Trong bài này, tôi sẽ nói đến một số tính năng mới, vài cách tinh chỉnh hiệu năng và lý do vì sao bạn nên chuyển lên PHP 7.4.

PHP liên tục phát triển mạnh. Bằng việc tung ra bản cập nhật PHP 7.4 mới nhất này, nó đã thêm được rất nhiều tính năng mới. Giống với những phiên bản PHP 7 trước – hiệu năng và tốc độ đều cải thiện. Một trong những tính năng mới hay nhất là atures is preloading. Nó giúp đẩy nhanh tốc độ thực thi script, đồng thời cũng có tính năng làm code gọn gàng hơn, nhờ vào việc đơn giản hóa những dòng code thông dụng.

PHP 7.4 đã được kiểm chứng là tốt hơn PHP 7.3, về mặt hiệu năng và các cải thiện đáng kể khác.
![Hiệu năng của PHP 7.4 so với các version trước](https://images.viblo.asia/3f9f01d1-9037-4226-bd1d-76469a7486fb.jpg)

## Có gì mới ở PHP 7.4?

Từ năm 2016, PHP7 đã được nâng cấp hằng năm. Mỗi năm nó đều có tính năng mới, và có tính năng giúp viết code gọn hơn, khiến cho ngôn ngữ lập trình thân thiện với developer hơn.

### Preloading

Khi sử dụng framework hoặc library, files được tải lên và link trên mỗi request. Preloading là khi bạn tải framework và libraries vào trong OPCache. Nó giúp server tải file PHP trước và lưu trên bộ nhớ khi khởi động để có sẵn cho bất kỳ request nào tương lai!

Preloading được chạy bằng php.ini với chỉ dẫn: opache.preload. Nó bắt PHP script chạy khi server khởi động. Nó cũng có thể được dùng để tải lên nhiều file khác hoặc chọn để inlcude hay compile chúng.
Preloaded files cũng bị nằm trong bộ nhớ OPCache mãi mãi. Những preload files này cũng sẵn sàng dùng cho request tương lai nếu cần sử dụng.

### Spread Operator trong Array Expressions
Khi PHP 5.6 phát hành, PHP bắt đầu hỗ trợ argument unpacking (spread operator). Còn bây giờ với 7.4, chúng ta có thể dùng tính năng này với array expression. Để làm vậy, nó chỉ cần dùng `…` (3 chấm) là được.

Hãy xem qua ví dụ bên dưới:

```php
$arr1 = ['3', '4'];
$arr2 = ['1', '2', ...$arr1, '5'];
// ['1', '2', '3', '4', '5'];
```

Giờ chúng ta có thể mở rộng array từ mọi nơi trong một array khác, chỉ bằng cú pháp Spread Operator.

``` php
$num1 = [1, 2, 3];
$num2 = [...$num1]; // [1, 2, 3]
$num3 = [0, ...$num1]; // [0, 1, 2, 3]
$num4 = array(...$num1, ...$num2, 111); // [1, 2, 3, 1, 2, 3, 111]
$num5 = [...$num1, ...$num1]; // [1, 2, 3, 1, 2, 3]
```

```php
function getNum(){
    return ['1', '2', '3'];
}
$num = [...getNum(), '4', '5', '6'];

// ['1', '2', '3', '4', '5', '6'];
```

Spread operatos có hiệu năng tốt hơn so với bản 7.3 array_merge. Đó là vì spread oeprator là ngôn ngữ cấu trúc trong khi đó array_merge là một hàm. Cũng vì spread operator hỗ trợ objects triển khai ngang còn array_merge chỉ hỗ trợ arrays.

### Weak References

PHP 7.4 bây giờ đã có class WeakReference, không nên lầm lẫn với class WeakRed và Weakref extension.

WeakReferences giúp programmer gọi tham chiếu tới một object. Nó hữu dụng vì nó không ngăn object bị hủy. Hó hỗ trợ triển khai cache có cấu trúc.

```php
WeakReference {
    /* Methods */
    public __construct ( void )
    public static create ( object $ref ) : WeakReference
    public get ( void ) : ?object
}
```

### Contravariant Parameters và Covariant Returns

Hiện tại, PHP sử dụng hầu như invariant parameter types và return types. Có nghĩa là, nếu một phương thức có parameter hay return type của X thì subtype parameter hoặc return type cũng phải là loại X.

Bây giờ với PHP 7.4, nó cho phép covariant (được sắp từ chi tiết đến tổng quan) và contravariant (ngược lại) trên parameter và return types.

Đây là ví dụ của cả hai:

Ví dụ return type của covariant:

``` php
interface Factory {
    function make(): object;
}

class UserFactory implements Factory {
    function make(): User;
}
```

Ví dụ loại contravariant parameter:

```php
interface Concatable {
    function concat(Iterator $input);
}
class Collection implements Concatable {
    function concat(iterable $input) {/* . . . */}
}
```

### Typed Properties 2.0

Từ PHP 5, type hints đã được hỗ trợ, cho phép một loại biến nhất định được chuyển tới hàm hoặc class. Khi nâng cấp lên PHP 7.2, data type object xuất hiện, và các loại khác có thể cũng được chờ đón hơn trong tương lai. Tương lai giờ đã ở đây rồi

Trong  phiên bản 7.4 mới, PHP có thể hỗ trợ những loại sau:

```php
bool, int, float, string, array, object, iterable, self, parent
any class or interface name
?type // kiểu dữ liệu trả về có thể là bất kỳ kiểu nào kể trên
```

### Arrow Functions 2.0
Arrow function giờ có dạng đơn giản hơn nhiều:

```php
fn(parameter_list) => expr
```
(nani) cứ như đang code javascript vậy...

### Những thứ bị loại bỏ trên PHP 7.4

- Type real
- Magic quotes legacy
- array_key_exists() với objects
- Bộ lọc FILTER_SANITIZE_MAGIC_QUOTES
- Phương pháp reflection export()
- mb_strrpos() với cách encode làm đối số thứ 3
- Parameter implode() order mix
- Unbinding $this khỏi non-static closures
- Hàm hebrevc()
- Hàm convert_cyr_string()
- money_format() function
- ezmlm_hash() function
- restore_include_path() function
- allow_url_include ini directive

## Nguồn tham khảo
- [https://www.php.net/releases/7_4_0.php](https://www.php.net/releases/7_4_0.php)
- [https://www.hostinger.com/](https://www.hostinger.com/)