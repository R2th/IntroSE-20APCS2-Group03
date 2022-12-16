Nếu đã từng dùng qua các thư viện liên quan đến toán học của Python như `numpy`, các bạn sẽ để ý thấy các nó có tốc độ xử lý rất nhanh. Điều này là do một phần của package này được viết bằng C/C++ và phần code Python gọi những phần đó để chạy nên tốc độ chạy khi xử lý của `numpy` khá là nhanh.

![image.png](https://images.viblo.asia/e3ca3ccf-4e7c-4331-814f-d3680eab084c.png)

Vậy làm sao để có thể gọi được mã C++ từ trong Python? Trong Python, có khá nhiều thư viện có thể giúp bạn đạt được điều này. Bài viết sau đây sẽ hướng dẫn bạn dùng thư viện `ctypes` của Python để có thể call function được code bằng C++.
# Lợi ích của việc dùng hàm C++ trong Python
Trước hết, đây là những lợi ích của việc call function được viết bằng C++ trong Python:

* **Tận dụng code C++ đã có sẵn**: Nếu bạn đã có sẵn một hàm/thư viện được viết bằng C++ và đã được test kỹ càng, bạn có thể tận dụng chúng được luôn thay vì phải viết toàn bộ sang Python. Nó sẽ giúp bạn tiết kiệm được đáng kể thời gian để code.
* **Tăng tốc độ xử lý**: Python là ngôn ngữ thông dịch, còn C++ là ngôn ngữ biên dịch, do đó, C++ sẽ có tốc độ nhanh hơn rất nhiều so với Python. Ngoài ra, GIL (Global Interpreter Lock) của Python chỉ cho phép chạy **duy nhất** một thread tại một thời điểm nên việc dùng thread sẽ không thể tận dụng được các core của CPU. Việc dùng C++ còn giúp loại bỏ được hạn chế này.

# 1. Chuẩn bị shared library
Để dùng được code C++ trong Python, bạn sẽ cần phải compile nó ra dưới dạng shared library. Trong Windows, đây sẽ là một file có đuôi `.dll`, còn với Linux, nó sẽ có đuôi `.so`. Trong bài viết này, mình sẽ dùng Windows và compiler MSVC để làm ví dụ.

Trong ví dụ này, mình sẽ xuất một function in ra dãy số Fibonacci đến số thứ `n`. Code mẫu này mình sẽ save với đường dẫn `src\test.cpp`:
```
#include <iostream>
#include <vector>

extern "C" {
    __declspec(dllexport) int test_func(int n) {
        std::vector<int> f;
        int i;

        f.push_back(0);  // f[0] = 0
        f.push_back(1);  // f[1] = 1

        for (i = 2; i <= n; i++) {
            f.push_back(f[i - 1] + f[i - 2]);
        }
        
        std::cout << "Fibonacci up until " << n << "-th digit: ";
        for (i = 1; i <= n; i++) {
            std::cout << f[i] << " ";
        }
        return f[n];
    }
}
```

Trong đoạn code trên, block lệnh `extern "C"` đơn giản được dùng để tắt cơ chế name mangling của C++ cho các hàm được định nghĩa ở trong. Cụ thể, C++ có hỗ trợ function overloading, nghĩa là ta có thể có nhiều function cùng một tên mà chỉ cần khác kiểu và số lượng tham số được định nghĩa. Tuy nhiên, ngôn ngữ lập trình C lại không hỗ trợ cơ chế này nên cần phải sử dụng nó để code C++ có thể tương thích được với C. Khi compile đoạn code dưới đây, compile sẽ báo lỗi `error C2733: 'test_func': you cannot overload a function with 'extern "C"' linkage`.
```
extern "C" {
    int test_func(double a) {
        ...
    }

    int test_func(int n) {
        ...
    }
}
```

Còn đoạn `__declspec(dllexport)` đơn giản được dùng để báo cho compiler biết rằng nó cần export function (với ví dụ trên là function `test_func`) ra một file DLL.

Sau khi có được hàm C++, ta cần compile code ra một file obj. Với MSVC, cú pháp để compile là:
```
cl /EHsc /c src\test.cpp /Fo"obj\\fibo.obj"
```

Sau khi compiler biên dịch ra file `obj\fibo.obj`, ta cần link nó ra file DLL với lệnh sau:
```
link /DLL /OUT:fibo.dll obj\fibo.obj
```

Kết quả, ta sẽ được một `fibo.dll` có hàm `test_func` để dùng ở ngoài.

# 2. Dùng shared library trong Python với `ctypes`
Python cung cấp sẵn cho ta thư viện `ctypes` cho phép chúng ta tạo các kiểu dữ liệu tương thích với C và gọi các hàm từ shared library. Chi tiết về các kiểu dữ liệu `ctypes` cho phép tạo có thể xem tại [đây.](https://docs.python.org/3/library/ctypes.html#fundamental-data-types)

Đầu tiên, ta cần import `ctypes` để có thể dùng nó. Sau đó, ta sẽ dùng `CDLL` để load file `fibo.dll` ở ví dụ bên trên. `CDLL` sẽ đại diện cho library mà chúng ta load và ta có thể dùng nó để gọi các hàm trong file DLL.
```
from ctypes import *

external_lib = CDLL("fibo.dll")
...
```

Sau đó, ta có thể gọi luôn hàm `test_func` của `external_lib`. Trong ví dụ này, ta có thể pass thẳng một vài kiểu dữ liệu (ví dụ như `int` làm tham số của `test_func`) mà không cần phải qua data type của `ctypes`. Tuy nhiên, bạn vẫn nên dùng các data type mà `ctypes` cung cấp.

```
a = external_lib.test_func(6)
print(a)
```
hoặc
```
n = c_int(6)
a = external_lib.test_func(6)
print(a)
```

Đều cho ra output là:
```
Fibonacci up until 6-th digit: 1 1 2 3 5 8
8
```

Mặc định, kiểu dữ liệu trả về sẽ là `int`. Với ví dụ trên, ta sẽ không cần phải code thêm gì cả. Tuy nhiên, với trường hợp dưới đây, ta sẽ cần phải sửa lại code một chút.

```
// test.cpp
#include <iostream>
#include <vector>

extern "C" {
    __declspec(dllexport) float test_func(float a) {
        if (97 <= a && a <= 122) {
            return a - 32;
        }
        return 1000000;
    }
}
```

```
# main.py
from ctypes import *

try:
    external_lib = CDLL("test.dll")

    a = external_lib.test_func(6.0)
    print(a)
    b = external_lib.test_func(100.0)
    print(b)
except Exception as e:
    print(e)
```

Nếu như ta chạy đoạn code Python trên, nó sẽ báo lỗi:
```
argument 1: <class 'TypeError'>: Don't know how to convert parameter 1
```
Mặc dù giá trị `6.0` trong Python có kiểu dữ liệu là `float`, tuy nhiên, `float` của Python hoàn toàn khác so với `float` của C++. Khi đó, ta sẽ phải dùng đến `c_float` của `ctypes` để chuyển kiểu dữ liệu.

```
# main.py
from ctypes import *

try:
    external_lib = CDLL("test.dll")

    a = external_lib.test_func(c_float(6.0))
    print(a)
    b = external_lib.test_func(c_float(100.0))
    print(b)
except Exception as e:
    print(e)
```

Lúc này, đoạn code trên sẽ không bị lỗi convert parameter nữa. Tuy nhiên, kết quả mà hàm trả ra lại không hề đúng chút nào.
```
1297564045
1297564045
```

Như đã nhắc ở trên, việc gọi hàm ngoài sẽ luôn trả về một giá trị `int`. Việc dùng sai kiểu dữ liệu sẽ ảnh hưởng đến giá trị trả về. Do đó, ta cần định nghĩa lại kiểu dữ liệu trả về của hàm. Việc này được thực hiện bằng cách assign attribute `restype` của function sang một dạng mà `ctypes` hỗ trợ. Với ví dụ trên, đoạn code sau sẽ giải quyết vấn đề đó:
```
# main.py
from ctypes import *

try:
    external_lib = CDLL("test.dll")

    #external_lib.test_func.restype = c_float
    a = external_lib.test_func(c_float(6.0))
    print(a)
    b = external_lib.test_func(c_float(100.0))
    print(b)
except Exception as e:
    print(e)
```

Bằng cách đổi data type mà function return về sang `c_float`, ta sẽ có được kết quả đúng:

```
1000000.0
68.0
```

Như vậy, bài viết trên đã hướng dẫn các bạn gọi được function được viết bằng C++ ở trong Python. Hy vọng bài viết này sẽ hữu ích cho các bạn.