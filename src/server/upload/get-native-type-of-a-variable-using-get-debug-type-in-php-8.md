## 1. Giới thiệu

![image.png](https://images.viblo.asia/828fd37d-4e9e-4982-a7f6-a00075da3629.png)

Trước **PHP 8**, bất cứ khi nào bạn muốn lấy kiểu của một biến, bạn có thể sử dụng hàm **gettype** . 
```
<?php

$foo = 'bar';

echo gettype($foo); // string

$object = new stdClass;

echo gettype($object); // object
```

Như bạn có thể thấy, hàm **gettype** sẽ trả về kiểu của một biến dưới dạng một chuỗi. Đây là tất cả các giá trị có thể được trả về bởi hàm.

* boolean
* integer
* double
* string
* array
* object
* resource
* resource (closed) as of PHP 7.2.0
* NULL
* unknown type

Nhưng vấn đề với **gettype** là nó trả về các kiểu dài thay vì các kiểu gốc và quen thuộc hơn. Ví dụ, nó trả về integer thay vì int, double thay vì float, ...

Để giảm thiểu vấn đề này, **PHP 8** đã giới thiệu một hàm mới có tên là **get_debug_type**, cùng nhau khai sáng thôi nào !
## 2. Bắt đầu
Hàm **get_debug_type** mới sẽ trả về kiểu "gốc" thực sự của một biến. Và như mình đã nói trước đó, hàm sẽ khác với **gettype** ở chỗ nó sẽ trả về các tên kiểu gốc, ví dụ: int thay vì integer, double thay vì float.

Bảng sau đây cho thấy hàm **get_debug_type** trả về cho các giá trị khác nhau và hàm **gettype**:

![](https://images.viblo.asia/b50c3a65-b3f5-47ce-a52b-989e73cebe67.png)

Ngoài ra, hàm sẽ tự động get tên lớp của các đối tượng. Vì vậy, thay vì làm như vậy bằng cách sử dụng **gettype**:

```
<?php

$bar = $arr['key'];

if (!($bar instanceof Foo)) {
  throw new TypeError('Expected ' . Foo::class . ' got ' . (is_object($bar) ? get_class($bar) : gettype($bar)));
}
```

Bạn có thể đơn giản hóa nó bằng cách sử dụng **get_debug_type** (get_class) như vậy.
```
<?php
$bar = $arr['key'];

if (!($bar instanceof Foo)) { 
  throw new TypeError('Expected ' . Foo::class . ' got ' . get_debug_type($bar));
}
```

## 3. Kết thúc
Vì vậy, nếu bạn muốn nhất quán hơn trong việc nhận kiểu của một biến bạn nên sử dụng hàm **get_debug_type** thay vì hàm **gettype**.

Thân ái ! chồ tộm biệt ! 
Quyết thắng đại dịch!