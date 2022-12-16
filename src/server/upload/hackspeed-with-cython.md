Python là một trong những ngôn ngữ lập trình phổ biến và được yêu thích nhất hiện nay. Tuy nhiên, khi làm việc với Python, bạn sẽ gặp hoặc được nghe kể về một trong những điểm yếu tới thời điểm này: `Python is slow`.

Có một vài cách để speed up đoạn code Python của bạn. Có thể bạn đã đọc ở đâu đó:
- Using multi-processing libraries
- Using asynchronous

Bạn có thể đọc thêm bài viết của mình [tại đây](https://viblo.asia/p/giai-phap-tang-performance-python-code-parallel-programming-QpmlewnNKrd).

Như ở trên, bạn sẽ tiếp cận 2 mặt để speed up Python code: `parallel programming` và `asynchronous programming`. Bây giờ, mình sẽ giới thiệu một mặt tiếp cận khác. Đó là `Cython`.

![](https://images.viblo.asia/c3f71d8f-8e9d-4374-8db2-aa0fcd8045df.png)
# What's Cython ?

Có thể hiểu Cython là một bước trung gian giữa Python và C/C++. Nó cho phép bạn viết Python pure với một số sửa đổi nhỏ, sau đó được dịch trực tiếp sang C.

Cython sẽ mang cho bạn sức mạnh kết hợp của Python và C:
- Python code gọi qua lại C hoặc C ++ code native bất kỳ lúc nào.
- Dễ dàng điều chỉnh Python code để có hiệu suất như C code đơn giản bằng cách thêm khai báo kiểu tĩnh, cũng theo cú pháp Python.
- Tương tác hiệu quả với các big data set.
- Integrate native với code có sẵn, low-level hoặc high-performance libs/apps.

    ...

Một số thông tin khác:
- Core Developers: Stefan Behnel, Robert Bradshaw, Lisandro Dalcín, Mark Florisson, Vitja Makarov, Dag Sverre Seljebotn.
- Repository: https://github.com/cython/cython
- Homepage: https://cython.org
- License: Apache License 2.0

Bạn có thể dễ dàng cái Cython qua pip

```sh
pip install cython
```


So với Python code, bạn cần phải thêm type information to every variable. Thông thường, để khai báo một biến Python, rất đơn giản:

```py
x = 1
```

Với Cython, bạn cần add thêm type cho biến đó:

```cython
cdef int x = 1
```

Cũng giống trong C, khai báo type cho variable trong Cython là bắt buộc. 

# Types in Cython

Khi sử dụng Cython, có hai điểm khác nhau cho variable và function.

For variable:

```cpython
cdef int a, b, c
cdef char *s
cdef float x = 0.5 (single precision)
cdef double x = 60.4 (double precision)
cdef list images
cdef dict user 
cdef object card_deck
```

Tất cả các type này bắt nguồn từ C/C++. 

For function:

```
def function1...
cdef function2...
cpdef function2...
```

Với:
- def: Function python pure, chỉ gọi từ Python.
- cdef: Cython only functions. Chỉ được gọi từ Cython.
- cpdef: C and Python function. Có thể được gọi từ C và Python.

# How to speedup your code with Cython

Đầu tiên, mình sẽ tạo một đoạn code Python pure với for-loop. 

```python

#run_test_python.py
def test_python(x):
    y = 1
    for i in range(1, x+1):
        y *= i
    return y
```

Áp dụng những gì đã đã hiểu ở trên, mình sẽ viết đoạn code bằng Cython cùng với một ý nghĩa:

```cython
#run_test_cython.pyx
cpdef int test_cython(int x):
    cdef int y = 1
    cdef int i
    for i in range(1, x+1):
        y *= i
    return y
```

Khi code Cython, make sure rằng toàn bộ các variable của bạn phải được set type. 

Tiếp theo, ta cần tạo một file để compile từ Cython -> C code:

```python
# setup.py
from distutils.core import setup
from Cython.Build import cythonize

setup(ext_modules = cythonize('run_test_cython.pyx'))
```

Sau khi đặt `run_test_cython.pyx` và `setup.py` cùng dir, ta bắt đầu thực hiện compile:

```sh
% python setup.py build_ext --inplace                                        
Compiling run_test_cython.pyx because it changed.
[1/1] Cythonizing run_test_cython.pyx
running build_ext
building 'run_test_cython' extension
creating build
creating build/temp.linux-x86_64-3.6
gcc -pthread -Wno-unused-result -Wsign-compare -DNDEBUG -g -fwrapv -O3 -Wall -fPIC -I/home/ha.hao.minh/.pyenv/versions/viblo-venv/include -I/home/ha.hao.minh/.pyenv/versions/3.6.8/include/python3.6m -c run_test_cython.c -o build/temp.linux-x86_64-3.6/run_test_cython.o
gcc -pthread -shared -L/home/ha.hao.minh/.pyenv/versions/3.6.8/lib -L/home/ha.hao.minh/.pyenv/versions/3.6.8/lib build/temp.linux-x86_64-3.6/run_test_cython.o -o /home/ha.hao.minh/workspace/viblo/112019/run_test_cython.cpython-36m-x86_64-linux-gnu.so
```

Kế quả:

```sh
% ls
build  run_test_cython.c  run_test_cython.cpython-36m-x86_64-linux-gnu.so  run_test_cython.pyx  run_test_python.py  setup.py
```

Bạn sẽ thấy được trong folder này đã chứa toàn bộ files cần cho việc run C code. Nếu bạn tò mò đoạn code Cython kia sẽ compile ra đoạn code C là gì bạn có thể cat để xem file đó:

```sh
cat run_test_cython.c 
```

Nào, đã đến lúc thể hiện sức mạnh của C code. Đoạn code sau để so sánh tốc độ của Python pure và Cython:

```python
# speedtest.py
import run_test_python
import run_test_cython
import time

def speedtest_python(number):
    start = time.time()
    run_test_python.test_python(number)
    end = time.time()

    py_time = end - start
    print(f"Python time = {py_time}")

    return py_time


def speedtest_cython(number):
    start = time.time()
    run_test_cython.test_cython(number)
    end =  time.time()

    cy_time = end - start
    print("Cython time = {}".format(cy_time))

    return cy_time

if __name__=="__main__":
    for number in [10, 100, 1000, 10000, 100000]:
        print(f"Speedtest with number = {number}")
        py_time = speedtest_python(number)
        cy_time = speedtest_cython(number)
        print("Speedup = {}".format(py_time / cy_time))

```

Kết quả sau khi chạy `speedtest.py`

```sh
% python speedtest.py
Speedtest with number = 10
Python time = 3.5762786865234375e-06
Cython time = 7.152557373046875e-07
Speedup = 5.0
Speedtest with number = 100
Python time = 7.867813110351562e-06
Cython time = 2.384185791015625e-07
Speedup = 33.0
Speedtest with number = 1000
Python time = 0.0002810955047607422
Cython time = 9.5367431640625e-07
Speedup = 294.75
Speedtest with number = 10000
Python time = 0.02144336700439453
Cython time = 7.62939453125e-06
Speedup = 2810.625
Speedtest with number = 100000
Python time = 3.1171438694000244
Cython time = 8.630752563476562e-05
Speedup = 36116.70994475138

```

Với cấu hình máy hiện tại để test của mình:
- CPU: Intel® Core™ i5-4460 CPU @ 3.20GHz × 4 
- Ram: 8G

Fill kết quả vào table cho dễ nhìn:

| Number | Python time | Cython time | Speedup |
|---|---|---|---|
| 10 | 3.5762786865234375e-06 | 7.152557373046875e-07 | 5.0 |
| 100 | 7.867813110351562e-06 | 2.384185791015625e-07 | 33.0 |
| 1000 | 0.0002810955047607422 | 9.5367431640625e-07 | 294.75 |
| 10000 | 0.02144336700439453 | 7.62939453125e-06 | 2810.625 |
| 100000 | 3.1171438694000244 | 8.630752563476562e-05 | 36116.70994475138 |

`36116` - Có vẻ là một con số không tưởng :D.

Rõ ràng, Cython mang đến cho bạn performance rất tốt. Đây cũng là một giải pháp khả thi nếu bạn muốn cải tiến code của bạn.

Source: https://cython.org/

Thanks for reading!