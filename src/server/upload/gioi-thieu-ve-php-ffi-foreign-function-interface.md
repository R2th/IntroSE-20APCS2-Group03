# Giới thiệu
Được đề xuất từ RFC: [PHP RFC: FFI - Foreign Function Interface](https://wiki.php.net/rfc/ffi), PHP FFI đã chính thức được chấp nhận và trở thành một extension của PHP từ phiên bản PHP 7.4.

FFI cho phép bạn sử dụng các thư viện shared library (các file `.so` hay `.dll`) từ các ngôn khác như C, Go, Rust,... trực tiếp bằng PHP code mà không phải viết PHP extension bằng ngôn ngữ C.

> Các shared library thường được viết bằng C. Nhưng nó có thể viết bằng nhiều ngôn ngữ khác mà có khả năng biên dịch như: C++, Rust, Go,.... Trên Linux, thư viện được compile thành các `.so` file. Trên Windows nó là `.dll` file.

> Thông thường các PHP extension được viết bằng ngôn ngữ C, chẳng hạn PHP PDO, GD, Imagick, Bcmath... và các extensions phải cài đặt như một package của hệ thống chứ không thể cài trực tiếp bằng `composer`.

![](https://images.viblo.asia/a15c0645-3593-437c-a545-6ec1d5de5d06.png)

PHP FFI còn đang được phát triển và có tiềm năng ứng dụng cao, một vài ví dụ:

- Prototype nhanh các thư viện mà chưa có PHP extension chẳng hạn [Tensorflow](https://github.com/dstogov/php-tensorflow), [Redis client](https://blog.remirepo.net/post/2019/10/23/FFI-extension-usage-with-PHP-7.4), các thư viện liên quan đến ML, thư viện bản quyền,...
- Tích hợp các thư viện dễ hơn mà không cần expert về ngôn ngữ C
- Implement các tác vụ yêu cầu độ tải cao bằng C, Rust sau đó tích hợp vào PHP
- [PHP Engine Direct API](https://github.com/lisachenko/z-engine)
- [Immutable object library for PHP](https://github.com/lisachenko/immutable-object)
- https://github.com/gabrielrcouto/awesome-php-ffi

> Python trở thành ngôn ngữ phổ biến nhất cho Machine Learning cũng nhờ có FFI do có khả năng dễ dàng tích hợp với các thư việc C.
> https://dev.to/verkkokauppacom/introduction-to-php-ffi-po3

# Thử dùng PHP FFI
Để sử dụng PHP FFI, cách đơn giản là sử dụng docker PHP 7.4:

```bash
docker run --name php74 -it php:7.4 bash
```

Sau đó chạy các lệnh để cài đặt FFI extension:

```bash
apt-get update && apt-get install libffi-dev && docker-php-ext-configure ffi --with-ffi && docker-php-ext-install ffi
```

Kiểm tra lại xem FFI extension đã được load chưa bằng lệnh:

```bash
php -m
```
=> Output:
```
[PHP Modules]
Core
...
FFI
...

[Zend Modules]
...
```

Theo mặc định FFI được enable trong các trường hợp sau:

1. Chạy PHP script bằng PHP CLI, ví dụ `php test-ffi.php`
2. Sử dụng tính năng `preload` của PHP 7.4 khi chạy web app => tham khảo [bài biết về preload](https://viblo.asia/p/php-php-74-preload-toc-do-ban-tho-cho-php-1Je5ExBGlnL)

Tuy nhiên có thể thiết lập lại thông qua giá trị `ffi.enable` trong php.ini:

```ini
; FFI API restriction. Possible values:
; "preload" - enabled in CLI scripts and preloaded files (default)
; "false"   - always disabled
; "true"    - always enabled
ffi.enable=preload
```

# Ví dụ

## Load thư viện có sẵn

Ví dụ đơn giản đầu tiên đó là load thư viện `libc` và export function `printf()` để sử dụng trong PHP:

```php
<?php
// Tạo FFI object, load libc và export function printf()
// Xem thêm: https://www.php.net/manual/en/ffi.cdef.php
$ffi = FFI::cdef(
    'int printf(const char *format, ...);', // function prototype từ thư viện, thực tế có thể copy nó từ file header của C (file `.h`)
    'libc.so.6' // Tên thư viện, thường là nó nằm ở địa chỉ `/lib/x86_64-linux-gnu/libc.so.6` đối với Linux
);

// call C printf()
$ffi->printf("Hello %s!\n", 'world');
```

Ngoài cách sử dụng [`FFI::cdef`](https://www.php.net/manual/en/ffi.cdef.php) chúng ta có thể sử dụng [`FFI::load`](https://www.php.net/manual/en/ffi.load.php) để load trực tiếp file header `.h`:

Tạo file header `header.h`:

```c
#define FFI_LIB "libc.so.6"

int printf(const char *format, ...);
```

Định nghĩa `FFI_LIB` để set đường dẫn đến thư viện (đường dẫn tương đối hoặc tuyệt đối hoặc tên thư viện hệ thống).

Load FFI:

```php
<?php
$ffi = FFI::load(__DIR__ . '/header.h');

$ffi->printf("Hello %s!\n", 'world');
```

Trông có vẻ sáng sủa hơn vì chúng ta đã tách việc định nghĩa function cần binding thành 1 file riêng biệt đúng theo cú pháp của C.

## Tự tạo thư viện

Trong ví dụ này chúng ta sẽ tạo một thư viện C và sau đó load vào PHP qua FFI.

Để tạo 1 thư viện đơn giản, cần có những file sau:

```
|-- lib
|   `-- fibo
|       |-- fibo.c
|       `-- fibo.h
`-- test.php
```

File `fibo.h` để khai báo prototype cho C function:
```h
#define FFI_LIB "./lib/fibo/fibo.so"

int fibo(int n);
```

File `fibo.c` để implement fibonacci function theo prototype từ file `fibo.h`:
```c
#include "fibo.h"

int fibo(int n) {
    if (n <= 2) {
        return n;
    }

    return fibo(n - 1) + fibo(n - 2);
}
```

Tiếp theo chúng ta sẽ compile thành shared libary `fibo.so` sử dụng `gcc`:

```bash
cd lib/fibo/
gcc -c fibo.c
gcc -shared -o fibo.so fibo.o
```

Tiếp theo là test với PHP:

```php
<?php
if ($argc < 2) {
    echo 'HELP: php test.php <number>' . PHP_EOL;
    exit(0);
}

$ffi = FFI::load(__DIR__ . '/lib/fibo/fibo.h');

$number = $argv[1];
echo sprintf('Fibo(%d) = %d', $number, $ffi->fibo($number)) . PHP_EOL;
```

Bạn có thể tham khảo thêm cách biên dịch shared library tại bài viết https://platform.sh/blog/2020/php-fun-with-ffi-just-enough-c/

## Ví dụ với `libuuid`
PHP có một vài thư viện để generate UUID. Một trong số đó là sử dụng [PECL UUID extension](https://pecl.php.net/package/uuid).

Bạn có thể đọc code của nó trên [GitHub](https://github.com/php/pecl-networking-uuid). Extension đảm nhiệm vai trò binding PHP functions với [`libuuid`](https://git.kernel.org/pub/scm/fs/ext2/e2fsprogs.git/tree/lib/uuid). Để nó hoạt động, bạn phải cài đặt `libuuid` trên hệ thống (phần lớn đã được cài sẵn trên Linux) và  PECL.

Đây là luồng hoạt động khi chúng ta gọi function `uuid_create()` trong PHP:

```
   +---------------------+
   |    your PHP code    |
   +---+-------------^---+
       v             ^
   +---v-------------+---+
   |     PHP engine      |
   +---+-------------^---+
       v             ^
   +---v-------------+---+
   |   UUID extension    |
   +---+-------------^---+
       v             ^
   +---v-------------+---+
   |       UUID lib      |
   +---------------------+
```

Tính năng của FFI thể hiện ở việc thay thế layer "UUID extension" bằng code PHP trực tiếp.

Trong thư viện `libuuid` có file header `uuid.h` mô tả các function prototype do thư viện cung cấp, ví dụ:

```h
# …
# Some constants:
#define UUID_VARIANT_NCS    0
#define UUID_VARIANT_DCE    1
#define UUID_VARIANT_MICROSOFT  2
#define UUID_VARIANT_OTHER  3

# Some function declarations:
void uuid_generate(uuid_t out);
int uuid_compare(const uuid_t uu1, const uuid_t uu2);
# …
```

Chúng ta sẽ tạo file header để FFI load bằng cách copy file `uuid.h` và loại bỏ những function không cần thiết, cũng như thiết lập giá trị `FFI_LIB`:

```h
#define FFI_LIB "libuuid.so.1"

typedef unsigned char uuid_t[16];

extern void uuid_generate_time(uuid_t out); // v1
extern void uuid_generate_md5(uuid_t out, const uuid_t ns, const char *name, size_t len); // v3
extern void uuid_generate_random(uuid_t out); // v4
extern void uuid_generate_sha1(uuid_t out, const uuid_t ns, const char *name, size_t len); // v5
```

Đến đây, tương tự như các ví dụ trên, ta có thể gọi các function `uuid_generate_time`, `uuid_generate_md5`, `uuid_generate_random`, `uuid_generate_sha1` trong PHP. Có một chút khác biệt đó là các function này không trả về kết quả mà cần 1 biến đầu ra (có kiểu là `uuid_t`) là tham số cho function:

```php
<?php
$output = $ffi->new('uuid_t');

$ffi->uuid_generate_random($output);
```

Ở đây chúng ta sử dùng function [`$ffi->new()`](https://www.php.net/manual/en/ffi.new.php) để khởi tạo biến thuộc kiểu `uuid_t` trong C.

Tham khảo thêm tại: https://github.com/jolicode/ffi-uuid

Ngoài ra mình cũng thử nghịch với lib của VLC để thử chơi mp3 bằng PHP nhưng chưa được, bạn nào có ý tưởng thì chia sẻ nhé :D => https://www.reddit.com/r/PHP/comments/gdgvyg/poc_php_ffi_and_libvlc/

# Kết luận
Chúng ta đã thực hiện việc binding thư viện bên ngoài khá dễ dàng với PHP FFI.

Cảm ơn các bạn đã đọc và hy vọng bài viết có thể giúp bạn có cái nhìn ban đầu về FFI và nghĩ ra được nhiều ứng dụng hơn với FFI.

# Reference:
- https://wiki.php.net/rfc/ffi
- https://www.php.net/manual/en/book.ffi.php
- https://dev.to/verkkokauppacom/introduction-to-php-ffi-po3
- https://jolicode.com/blog/php-7-4-ffi-what-you-need-to-know
- https://www.zend.com/blog/php-foreign-function-interface-ffi
- https://blog.remirepo.net/post/2019/10/23/FFI-extension-usage-with-PHP-7.4
- https://github.com/gabrielrcouto/awesome-php-ffi/
- https://github.com/SerafimArts/opengl-demo