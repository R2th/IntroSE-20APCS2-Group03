`ctypes` module là module dạng built-in cực mạnh của Python. Nó cho phép bạn sử dụng các lib sẵn có thừ một ngôn ngữ khác. Bài viết này sẽ giới thiệu những thứ basic nhất về `ctypes` kết hợp với C language.

## Make C library example

Dưới đây là function giải phường trình bậc 1 viết bằng C.

Mô tả function cơ bản nó thế này:

```echo
+ Sẽ có 2 paramters a và b
+ Nếu a == 0:
    + Nếu b == 0: in ra Phương trình vô số nghiệm.
    + Nếu b != 0: in ra Phương trình vô nghiệm.
+ Nếu a! == 0:
    + Nghiệm sẽ là: x = -b/a
    + In ra nghiệm.
```

Define function đó bằng C:

```c
void calculate_simple_equation(float a, float b) {
    if (a==0) {
        if (b==0) {
            printf("Phương trình vô số nghiệm");
            return;
        }
        printf("Phương trình vô nghiệm");
        return;
    }
    printf("Phương trình có nghiệm là x=%f", -b/a);
    return;
}
```

Lưu đoạn code chưa function trên vào file `clibdev.c`.

```c
#include <stdio.h>


void calculate_simple_equation(float a, float b) {
    if (a==0) {
        if (b==0) {
            printf("Phương trình vô số nghiệm");
            return;
        }
        printf("Phương trình vô nghiệm");
        return;
    }
    printf("Phương trình có nghiệm là x=%f", -b/a);
    return;
}
```

Cuối cùng ta cần build đoạn code trên thành một C library.

Trong thư mục project, nơi chứa file `clibdev.c`, ta sẽ cần tạo Makefile có nội dung như sau:

```Makefile
clibdev.so: clibdev.o
	gcc -shared -o clibdev.so clibdev.o

clibdev.o: clibdev.c
	gcc -c -Wall -Werror -fpic clibdev.c
```

`Make` thì available trên mọi Linux. Tuy nhiên `gcc` thì hên xui :D. Bạn phải make sure là đã cài `gcc`. Nếu chưa có bạn có thể dễ dàng cài đặt qua các `package-management system`.

```sh
$ gcc --version    
gcc (Ubuntu 5.4.0-6ubuntu1~16.04.11) 5.4.0 20160609
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE
```

Sau khi setup các kiểu sau, ta dùng lệnh sau để build:

```sh
$ make
gcc -c -Wall -Werror -fpic clibdev.c
gcc -shared -o libclib1.so clibdev.o

$ tree
.
├── clibdev.c
├── clibdev.o
├── libclib1.so
└── Makefile

0 directories, 4 files

```

Tất nhiên, nếu bạn không thích dùng `make`, bạn có thể dùng `bash` script hoặc `Python` script...

## Load C library with Python's “ctypes” Module

Ta tạo một file Python để test việc load C library.

```py
# load_c_lib.py
#!/usr/bin/env python
# -*- coding: utf-8 -*-

if __name__ == "__main__":
    pass
```

Để tiện việc import, file `load_c_lib.py` sẽ được đặt trong folder project cùng với `clibdev.so` và `Makefile`.

Add Python code load C lib:

```py
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import ctypes

if __name__ == "__main__":
    libc = ctypes.CDLL("./clibdev.so")

    pass
```

## Call C function from Python script

Bài toán là giải phương trình bậc nhất. Do vậy, params a, và b ta sẽ cho phép user nhập từ bàn phím:

```py
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import ctypes

if __name__ == "__main__":
    libc = ctypes.CDLL("./clibdev.so")

    print("Giải phương trình bậc nhất.\n")
    a = float(input("Nhập tham số a: \n"))
    b = float(input("Nhập tham số b: \n"))

    print(f"Nghiệm của phương trình: {a}x + {b} = 0 là: \n")
```

Tiếp theo, ta call C function và truyền `a` và `b` vào cùng.

```py
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import ctypes

if __name__ == "__main__":
    libc = ctypes.CDLL("./clibdev.so")

    print("Giải phương trình bậc nhất.\n")
    a = float(input("Nhập tham số a: \n"))
    b = fload(input("Nhập tham số b: \n"))

    print(f"Nghiệm của phương trình: {a}x + {b} = 0 là: \n")

    # Calling C function with params a and b
    libc.calculate_simple_equation.argtypes = [ctypes.c_float, ctypes.c_float]
    libc.calculate_simple_equation(a, b)
```

Chạy script `load_c_lib.py`:

```sh
$ python load_c_lib.py
Giải phương trình bậc nhất.

Nhập tham số a: 2
Nhập tham số b: 3
Nghiệm của phương trình: 2.0x + 3.0 = 0 là:

Phương trình có nghiệm là x = -1.500000%

```

Một điểm chú ý khi sử sử dụng `ctypes` là việc ta cần phải giải phóng memory allocation. Để làm việc này tự động bạn thêm đoạn code sau.

```py
alloc_func = libc.alloc_C_string
alloc_func.restype = ctypes.POINTER(ctypes.c_char)

print("Allocating and freeing memory in C")
c_string_address = alloc_func()

phrase = ctypes.c_char_p.from_buffer(c_string_address)
print(f"Python was just handed {hex(ctypes.addressof(c_string_address.contents))}({ctypes.addressof(c_string_address.contents)}):{phrase.value}")

free_func = libc.free_C_string
free_func.argtypes = [ctypes.POINTER(ctypes.c_char), ]
print(f"Python is sending to C {hex(ctypes.addressof(c_string_address.contents))}({ctypes.addressof(c_string_address.contents)}):{phrase.value)}"

free_func(c_string_address)
```

## Conclusion

Với Python built-in `ctypes`, bạn có thể dễ dàng tương tác với C lib. Ngoài `ctypes`, bạn có thể tham khảo một thirt-party khác như `cffi`.

Sources:
- https://docs.python.org/3/library/ctypes.html
- https://realpython.com/build-python-c-extension-module/
- https://dbader.org/blog/python-ctypes-tutorial