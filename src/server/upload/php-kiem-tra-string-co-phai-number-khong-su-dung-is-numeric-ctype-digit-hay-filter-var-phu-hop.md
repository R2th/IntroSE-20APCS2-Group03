Để kiểm chứng kí tự mà user nhập vào là số nguyên hay không thì không phải là việc dùng hàm thích hợp là is_number hay ctype_digit mà tuỳ thuộc vào logic của ứng dụng mà có trường hợp filter_var cũng không phù hợp.  Về validation của CakePHP3 cũng có những vấn đề nhất định. Ngoài ra Symfony thì is_int hoặc is_numeric hoặc ctype_digit được sử dụng tuỳ trường hợp. Laravel cũng tương tự sử dụng filter_var

Kết luận: Trường hợp mà kết hợp được với logic của ứng dụng thì sử dụng filter_var. Những trường hợp còn lại, sử dụng tương tự như validation của CakePHP.

Tham khảo bảng dưới đây
is_numeric, filter_var, ctype_digit, intval lý tưởng là được đánh dấu [o] chỉa ra giá trị số nguyên,  ngoài ra thì không phải số nguyên.

![](https://images.viblo.asia/b4fa8393-9f8d-412b-aae7-1c9ac677b9e1.png)

### is_numeric
là hàm sử dụng để check có phải là số hay không (không chỉ số nguyên). Không chỉ check được những số nhỏ mà cả những số vượt quá mức giới hạn của PHP cũng có thể check được
Tuy nhiên đây không phải hàm thích hợp ở phương diện check số nguyên 

```
assert(is_numeric('0'));
assert(is_numeric('1'));
assert(is_numeric('1 ') === false); // 1 với space
assert(is_numeric('a') === false);
assert(is_numeric('0.0'));
assert(is_numeric('.123'));
assert(is_numeric('123.'));
assert(is_numeric('-1'));
assert(is_numeric('-1.0'));
assert(is_numeric('+1'));
assert(is_numeric('+1.0'));
assert(is_numeric('042')); // hệ cơ số 8
assert(is_numeric('08')); // 0 đến 10 hệ cơ số「8」
assert(is_numeric('1e2')); // hiển thị 100
assert(is_numeric('1.001e2')); // hiên thị 100.1
assert(is_numeric('1e+2')); //  hiển thị 100
assert(is_numeric('1e-2')); // biểu thị 0.01
assert(is_numeric('0xA') === false); // 10 ở cơ số 16
assert(is_numeric('9223372036854775807')); // PHP_INT_MAX
assert(is_numeric('9223372036854775808')); // PHP_INT_MAX + 1
assert(is_numeric('-9223372036854775808')); // PHP_INT_MIN
assert(is_numeric('-9223372036854775809')); // PHP_INT_MIN - 1
assert(is_numeric('INF') === false);
assert(is_numeric('NAN') === false);
```

### ctype_digit
là hàm dùng để điều tra có phải số hay không, dùng để check những kí tự số như là 0~9 và không check được số âm
Tuy nhiên, đây cũng không phải hàm thích hợp ở phương diện check số nguyên

```
assert(ctype_digit('0'));
assert(ctype_digit('1'));
assert(ctype_digit('1 ') === false); // 1 với space
assert(ctype_digit('a') === false);
assert(ctype_digit('0.0') === false);
assert(ctype_digit('.123') === false);
assert(ctype_digit('123.') === false);
assert(ctype_digit('-1') === false);
assert(ctype_digit('-1.0') === false);
assert(ctype_digit('+1') === false);
assert(ctype_digit('+1.0') === false);
assert(ctype_digit('042')); // cơ số 8
assert(ctype_digit('08')); // 0 đến 10 ở hệ cơ số 8
assert(ctype_digit('1e2') === false); // biểu thị 100
assert(ctype_digit('1.001e2') === false); // biểu thị 100.1
assert(ctype_digit('1e+2') === false); // biểu thị100
assert(ctype_digit('1e-2') === false); // biểu thị0.01
assert(ctype_digit('0xA') === false); // 10 ở cơ số 16
assert(ctype_digit('9223372036854775807')); // PHP_INT_MAX
assert(ctype_digit('9223372036854775808')); // PHP_INT_MAX + 1
assert(ctype_digit('-9223372036854775808') === false); // PHP_INT_MIN
assert(ctype_digit('-9223372036854775809') === false); // PHP_INT_MIN - 1
assert(ctype_digit('INF') === false);
assert(ctype_digit('NAN') === false);
```

### filter_var
là hàm dùng để filter theo giá trị,  tham số thứ 2 truyền vào FILTER_VALIDATE_INT nếu thành công thì trả về int thất bại thì trả về false
Tuy nhiên, filter_var có thuộc tính trim sẽ loại bỏ khoảng trắng ‘1 ’ sẽ trả về int(1)
```
assert(filter_var('0', FILTER_VALIDATE_INT) === 0);
assert(filter_var('A', FILTER_VALIDATE_INT) === false);
```

Ngoải ra cũng chấp nhận trường hợp thêm + vào như string("+1”). Nếu muốn tường mình thì có thể sử dụng strpos để check 
```
assert(filter_var('1 ', FILTER_VALIDATE_INT) === 1);
```

Tương tự đối với việc sử dụng validate của Laravel

TIếp Theo là ví dụ về filter_var
```
assert(filter_var('+1', FILTER_VALIDATE_INT) === 1);
```

CakePHP3 Validate
CakePHP3 đã có hàm check số nguyên đó là method Cake\Validation\Validation::isInteger()
Tuy nhiên không check được cho trường hợp hệ cơ số 8 hoặc là PHP_MAX_INT vì thế nên tránh sử dụng hàm này để validate
```
$filter_var = function (string $value): bool {
    return filter_var($value, FILTER_VALIDATE_INT) !== false;
};

assert($filter_var('0'));
assert($filter_var('1'));
assert($filter_var('1 ')); // 1 với space
assert($filter_var('a') === false);
assert($filter_var('0.0') === false);
assert($filter_var('.123') === false);
assert($filter_var('123.') === false);
assert($filter_var('-1'));
assert($filter_var('-1.0') === false);
assert($filter_var('+1'));
assert($filter_var('+1.0') === false);
assert($filter_var('042') === false); // hệ cơ số 8
assert($filter_var('08') === false); // 0 đén 10 ở hệ cơ số「8」
assert($filter_var('1e2') === false); // biển thị 100
assert($filter_var('1.001e2') === false); // biểu thị 00.1
assert($filter_var('1e+2') === false); // biểu thị 100
assert($filter_var('1e-2') === false); // biểu thị 0.01
assert($filter_var('0xA') === false); // 10 biểu thị ở hệ cơ số 16
assert($filter_var('9223372036854775807')); // PHP_INT_MAX
assert($filter_var('9223372036854775808') === false); // PHP_INT_MAX + 1
assert($filter_var('-9223372036854775808')); // PHP_INT_MIN
assert($filter_var('-9223372036854775809') === false); // PHP_INT_MIN - 1
assert($filter_var('INF') === false);
assert($filter_var('NAN') === false);
```

### Intval
Không phải là hàm dùng để kiểm chứng nhưng mà các bạn có thể tham khảo
```
assert(intval('0') === 0);
assert(intval('1') === 1);
assert(intval('1 ') === 1); // 1 với space
assert(intval('a') === 0);
assert(intval('0.0') === 0);
assert(intval('.123') === 0);
assert(intval('123.') === 123);
assert(intval('-1') === -1);
assert(intval('-1.0') === -1);
assert(intval('+1') === 1);
assert(intval('+1.0') === 1);
assert(intval('042') === 42); // hệ cơ số 8
assert(intval('08') === 8); // 0 đến 10 ở hệ cơ số「8」
assert(intval('1e2') === 100); // biểu thị 100
assert(intval('1.001e2') === 100); // biểu thị 100.1
assert(intval('1e+2') === 100); // biểu thị 100
assert(intval('1e-2') === 0); // biểu thị 0.01
assert(intval('0xA') === 0); // 10 biểu thị ở hệ cơ số 16
assert(intval('9223372036854775807') === PHP_INT_MAX); // PHP_INT_MAX
assert(intval('9223372036854775808') === PHP_INT_MAX ); // PHP_INT_MAX + 1
assert(intval('-9223372036854775808') === PHP_INT_MIN); // PHP_INT_MIN
assert(intval('-9223372036854775809') === PHP_INT_MIN); // PHP_INT_MIN - 1
assert(intval('INF') === 0);
assert(intval('NAN') === 0);
```