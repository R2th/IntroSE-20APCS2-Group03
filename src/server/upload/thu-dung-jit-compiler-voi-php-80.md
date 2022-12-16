Chắc bạn đã nghe tin cách đây vài tháng là JIT compiler sẽ được thêm vào PHP 8. Nếu bạn chưa nghe thì nó là cái [poll này](https://wiki.php.net/rfc/jit#proposed_voting_choices). 90% số contributor tham gia đã vote đồng ý đưa tính năng này vào phiên bản PHP 8. Từ PHP 7.0 đến giờ chúng ta đã liên tục có những thay đổi giúp tăng hiệu năng rồi, và đây sẽ lại là bước đột phá mới về hiệu năng cho PHP. Đây là một tính năng rất lớn, nó đã được bắt đầu phát triển cách đây cả 2 năm rồi, PHP 8.0 thì ít nhất cũng  hơn 1 năm nữa mới ra mắt. Trong bài này chúng ta hãy cùng xem quá nó là gì và thử dùng nó xem thế nào nhé.

## JIT là gì?

Có thể bạn cũng chưa biết về JIT nên trước hết hãy giải thích nó là gì đã nhé. Chắc bạn cũng đã biết PHP là một ngôn ngữ thông dịch, nghĩa là code của bạn không cần phải được compile trước khi chạy (giống như C/C++). Thay vào đó thì PHP engine sẽ đọc code của bạn và chạy. Nói cách khác là bạn không code để compile thành machine code cho máy tính chạy mà là code một cái kịch bản và đưa cho PHP để nó chạy.

PHP có một cái *virtual machine* gọi là Zend VM. Tại sao gọi nó là *virtual machine*, bởi vì nó đóng vai trò giống như máy tính của bạn trong việc chạy code, như vừa giải thích ở trên ấy. Nó có nhiệm vụ đọc và chạy code PHP của bạn. Nhưng mà trước đó thì code của bạn sẽ được PHP đọc và dịch thành *opcode*, là ngôn ngữ mà Zend VM hiểu được đã. Sau đó thì Zend VM mới chạy *opcode* đó được. Đây là một cái hình minh họa cho dễ hiểu.

![php-lifecycle](https://images.viblo.asia/1b309382-deae-4c2d-9795-b49867b78e91.png)

Vậy là chúng ta cần một bước compile trước rồi mới đến bước thông dịch. Để tiết kiệm thời gian thì chúng ta có một cái gọi là OPCache (Opcode Cache) để lưu lại kết quả của bước compile để lần sau không cần phải compile nữa.

Đó là cách PHP hoạt động cho tới bây giờ. Vậy bây giờ nói về JIT compiler nhé. Ngay tên gọi của nó đã có từ *compiler* rồi. Nghĩa là chúng ta sẽ compile code thành machine code để chạy. JIT là viết tắt của "**J**ust-**I**n-**T**ime", nghĩa là lúc nào cần đến thì mới compile thay vì compile trước rồi mới chạy. Khi nào chạy mới compile.

Đối với PHP thì JIT compiler sẽ compile opcode thành machine code và chạy luôn code đó thay vì phải đưa cho Zend VM để nó chạy. Vậy là chúng ta không cần bước thông dịch nữa và tất nhiên là code chạy nhanh hơn rồi :).

## Nhanh hơn thật không?

Đây là 1 cái demo cho thấy tốc độ vượt trội của PHP với JIT compiler so với phiên bản cũ. Trong video là một đoạn code tạo hình ảnh 3D.

{@embed:https://www.youtube.com/watch?v=dWH65pmnsrI}

Nhưng mà đợi đã, có ai lại dùng PHP để tạo hình ảnh 3D bao giờ đâu :expressionless:.

Vì code của chúng ta bây giờ được compile thành machine code và được chạy trực tiếp bởi CPU thay vì trình thông dịch nên tốc độ được tăng lên chính là ở những đoạn code tính toán và sử dụng CPU nhiều. Như đoạn code ở trên chẳng hạn. Nhưng mà web app thì lại chẳng có mấy thứ code như thế mà toàn là code phụ thuộc vào I/O (database query, file upload, HTTP request...), trong đó phần lớn thời gian là app của bạn chả làm gì mà chỉ ngồi đợi kết quả từ database hay API... Vậy nên rất tiếc là web app của bạn hầu như sẽ chẳng nhanh lên tí nào cả :rofl:.

## Thế JIT để làm gì

Kể từ PHP 7.0, vấn đề performance của PHP đã được quan tâm hơn bao giờ hết, một phần nhờ sự cạnh tranh đến từ HHVM của Facebook (cũng dùng JIT compiler). OPCache, cấu trúc dữ liệu, mọi thứ đều được tối ưu từng tí một để đạt hiệu năng cao nhất. Và rồi gần như chẳng còn chỗ nào để improve mà mang lại hiệu năng tăng đáng kể nữa cả.

Ngoài ra thì hiệu năng của PHP đối với một ngôn ngữ server đã có thể xem là khá tốt rồi, không còn là PHP chậm chạp ngày xưa nữa. Nên cũng đã đến lúc mở rộng khả năng của PHP một chút, đến những lĩnh vực như data analysis, 3D/2D rendering...

Trước đây những đoạn code đòi hỏi performance cao thường được viết dưới dạng C/C++ extension thay vì PHP package. Ví dụ như *phpredis* luôn nhanh hơn *predis*  đến 6-7 lần. Nếu code PHP được compile thay vì interpret thì chúng ta sẽ có được những package PHP với hiệu năng không kém gì các extension viết bằng C/C++.

Vậy nên JIT compiler đã được chọn vì đây là hướng đi thú vị và tiềm năng hơn cả.

## Dùng thử xem sao

Giới thiệu xong rồi thì bây giờ hãy thử dùng xem sao. Vì vẫn chưa có bản release cho PHP 8.0 nên mình sẽ phải compile từ source code. Source code của PHP thì ở [đây](https://github.com/php/php-src). Dù version 7.4 vẫn đang alpha nhưng master đã là 8.0 rồi. Đầu tiên tải source code về đã

```sh
wget -O php.zip https://github.com/php/php-src/archive/master.zip
unzip php.zip
cd php-src-master
```

Sau đó cài dependencies. Mình dùng Ubuntu, nếu bạn dùng distro khác thì tự tìm package tương tự nhé.

```sh
apt-get install \
    autoconf \
    bison \
    dpkg-dev \
    file \
    g++ \
    gcc \
    libc-dev \
    make \
    pkg-config \
    re2c \
    libxml2-dev \
    libsqlite3-dev
```

Generate build files.

```sh
./buildconf
```

Sau đó là chạy `./configure` để setup bản build. Lựa chọn các option để compile PHP. Bạn có thể chọn chỗ để cài bằng cách thêm `--prefix=<install_dir>`. Mặc định nó sẽ cài vào `/usr/local/bin` nên nếu bạn có cài sẵn 1 phiên bản PHP khác rồi thì nhớ set cái này. PHP sẽ được cài vào đường dẫn `<install_dir>/bin/php`. Thêm cả đường dẫn cho file config bằng `--with-config-file-path` và `--with-config-file-scan-dir` nếu bạn muốn nữa.

Ngoài ra cũng còn nhiều option khác, bạn có thể xem tất cả option bằng cách chạy

```sh
./configure --help
```

Ví dụ mình chạy `./configure` như sau

```sh
./configure \
    --prefix=/opt \
    --with-config-file-path=/opt/php \
    --with-config-file-scan-dir=/opt/php/conf.d
```

Build.

```sh
make -j$(nproc)
```

Build xong thì cài. Có thể sẽ phải dùng `sudo` tùy prefix mà bạn chọn lúc trước nhé.

```sh
make install
```

Thử kiểm tra bằng `php -v` xem. À nếu bạn có set `--prefix` vừa nãy thì nhớ chạy PHP đúng đường dẫn nhé. Ví dụ `/opt/bin/php -v`.

```text
PHP 8.0.0-dev (cli) (built: Jul 15 2019 02:22:59) ( NTS )
Copyright (c) The PHP Group
Zend Engine v4.0.0-dev, Copyright (c) Zend Technologies
    with Zend OPcache v8.0.0-dev, Copyright (c), by Zend Technologies
```

JIT compiler là một phần của OPCache extension nên để dùng được JIT thì bạn phải bật OPCache trước đã. Thêm mấy dòng này vào file php.ini ở trong `config-file-path` lúc nãy nhé.

```ini
zend_extension=opcache.so
opcache.enable=1
opcache.enable_cli=1
```

Để bật JIT compiler thì bạn thêm 2 dòng này. Dòng thứ 2 là optional nhé, nhưng mà có vẻ được khuyến khích nên dùng thay vì default. Chi tiết về các config bạn có thể xem ở [đây](https://wiki.php.net/rfc/jit#phpini_defaults).

```ini
opcache.jit_buffer_size=32M
opcache.jit=1235
```

Bây giờ bạn thử chạy một file PHP với option `-dopcache.jit_debug=1` xem. Sẽ thấy được assembly code được compile ra. Ví dụ mình có file như này.

```php
<?php

$a = 0;

for ($i = 0; $i < 10000; $i++) {
    $a += $i;
}

echo $a;
```

Thì nó sẽ compile thành assembly code như sau.

```asm
JIT$/php-src-master/hello.php: ; (/php-src-master/hello.php)
        sub $0x10, %rsp
        lea 0x50(%r14), %rdi
        cmp $0xa, 0x8(%rdi)
        jnz .L1
        mov (%rdi), %rdi
        cmp $0x0, 0x18(%rdi)
        jnz .L12
        add $0x8, %rdi
.L1:
        test $0x1, 0x9(%rdi)
        jnz .L13
.L2:
        mov $0x0, (%rdi)
        mov $0x4, 0x8(%rdi)

; ...
; dài lắm demo một đoạn thôi nhé
```

Bây giờ thử 1 chút benchmark xem nó có nhanh hơn không nhé. Trong source code của PHP có sẵn 1 file [Zend/bench.php](https://github.com/php/php-src/blob/master/Zend/bench.php) để bạn chạy thử. Trong file này đều là những đoạn code tính toán rất nhiều (hash, loop .etc). Đây là kết quả mình chạy ra (đã được format lại cho dễ so sánh).

```text
                   No OPCache       OPCache        JIT
simple             0.021            0.006          0.001
simplecall         0.007            0.004          0.001
simpleucall        0.017            0.003          0.001
simpleudcall       0.019            0.003          0.001
mandel             0.079            0.022          0.007
mandel2            0.081            0.033          0.008
ackermann(7)       0.016            0.013          0.008
ary(50000)         0.008            0.004          0.003
ary2(50000)        0.003            0.003          0.002
ary3(2000)         0.033            0.028          0.011
fibo(30)           0.055            0.043          0.022
hash1(50000)       0.015            0.010          0.009
hash2(500)         0.006            0.007          0.005
heapsort(20000)    0.021            0.023          0.010
matrix(20)         0.020            0.017          0.010
nestedloop(12)     0.038            0.016          0.006
sieve(30)          0.012            0.008          0.003
strcat(200000)     0.004            0.004          0.002
--------------------------------------------------------
Total              0.456            0.247          0.112
```

Tất nhiên là nó chạy nhanh hơn rồi, không có gì lạ cả. Mình sẽ thử benchmark 1 cái web app nữa xem sao. Mình tạo 1 cái project Laravel mới tinh và benchmark bằng tool ApacheBench

```sh
ab -t10 -c10 http://test.localhost/
```

Kết quả thì đúng như chúng ta đã nói ở phần trước là chả khác gì cả :D.

```text
PHP 7.3: 131.37 req/s
PHP 8.0 + JIT: 133.57 req/s
```

## TL;DR

Tóm lại là PHP có nhanh lên đáng kể, nhưng trước mắt thì hầu hết code PHP đang tồn tại trên thế giới này sẽ chẳng nhanh hơn là mấy. Tuy nhiên, những hướng phát triển mới sẽ sớm mở ra với PHP.