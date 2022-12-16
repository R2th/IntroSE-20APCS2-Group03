*Làm sao để biết đoạn thuật toán này của mình đã đủ nhanh, đoạn code này của mình chạy nhanh hơn đoạn code cũ, sử dụng hàm này sẽ tối ưu hơn hàm kia...bla bla. Đó là khi ta nói tới benchmark - đo đạc xem code ta viết chạy nhanh như thế nào, tắc nghẽn chỗ nào. Trong python có nhiều công cụ khác nhau để thực hiện việc đo đạc này và bài này sẽ giới thiếu tới một vài công cụ đó.*

### 1. Module timeit
Python có một module có sẵn là `timeit`. Bạn có thể sử dụng nó để đo cho những đoạn mã nhỏ của mình. Module `timeit` sử dụng các chức năng thời gian dành riêng cho nền tảng  để bạn có được thời gian chính xác nhất.
Module `timeit` có giao diện dòng lệnh, nhưng cũng có thể import được. Chúng ta sẽ demo thử qua dòng lệnh này nhé:
```
python -m timeit -s "[ord(x) for x in 'abcdfghi']"
100000000 loops, best of 3: 0.0115 usec per loop

python -m timeit -s "[chr(int(x)) for x in '123456789']"
100000000 loops, best of 3: 0.0119 usec per loop
```
Mô tả ngắn gọn:

`-m` chỉ định module làm chương trình chính

`-s` khai báo với module `timeit` thiết lập chạy 1 lần

Sau đó, nó chạy mã vòng lặp trên trong 3 lần và trả về mức trung bình tốt nhất trong 3 lần đó.

Giờ, chúng ta thử viết một hàm và sử dụng nó vào dòng lệnh xem sao
```
# simple_func.py
def my_function():
    try:
        1 / 0
    except ZeroDivisionError:
        pass
```
Đoạn mã trên chỉ đơn giản là gây ra một exception chia cho số 0, bắt exception đó và bỏ qua. Nhớ di chuyển đến thư mục làm việc chứa file trên trước khi chạy dòng lệnh sau:
```
python -m timeit "import simple_func; simple_func.my_function()"
1000000 loops, best of 3: 1.77 usec per loop
```

OK, giờ ta sẽ thử import `timeit` vào trong các đoạn code test nhé. 
```
import timeit


def my_function():
    try:
        1 / 0
    except ZeroDivisionError:
        pass
 
if __name__ == "__main__":
    print timeit.timeit(my_function, number=1000000)
```
Đoạn code trên là mình import module `timeit` trực tiếp vào code, sử dụng hàm `timeit()` để tính số thời gian chạy xong n lần gọi hàm `my_function()` và mình đc kết quả `0.969364881516` sau 1M lần.

### 2. Sử dụng decorator
Chúng ta có thể tự tạo một bộ đếm thời gian riêng từ những module sẵn có trong python, tuy độ chính xác không cao nhưng cũng sẽ rất thú vị
```
import random
import time
 
def timerfunc(func):
    """
    A timer decorator
    """
    def function_timer(*args, **kwargs):
        """
        A nested function for timing other functions
        """
        start = time.time()
        value = func(*args, **kwargs)
        end = time.time()
        runtime = end - start
        msg = "The runtime for {func} took {time} seconds to complete"
        print(msg.format(func=func.__name__,
                         time=runtime))
        return value
    return function_timer
 
 
@timerfunc
def long_runner():
    for x in range(5):
        sleep_time = random.choice(range(1,5))
        time.sleep(sleep_time)
 
if __name__ == '__main__':
    long_runner()
```
Ở đoạn mã trên, chúng ta sử dụng 2 module từ thư viện chuẩn của python là `random` và `time`. Sau đó, chúng ta tạo ra một function decorator. Decorator là gì bạn có thể tìm hiểu thêm trên mạng nhé. Cách tính thời gian thực thi của một funtion rất đơn gian, khai báo thời gian bắt đầu rồi thực thi hàm đó, sau khi nhận kết quả trả về thì chốt lại bằng một biến kết thúc và tính hiệu 2 thời gian đó. EZ phải không nào. 

### 3. Timing Context Manager
Nâng cao hơn cách số 2 là ta sẽ khai báo một class, còn phương pháp thì vẫn như vậy thôi. Chúng ta sử dụng thêm các method __init__ để khởi tạo, __enter__ để trả về chính nó và __exit__ để tính toán, in ra thời gian đã sử dụng.
```
import random
import time
 
class MyTimer():
 
    def __init__(self):
        self.start = time.time()
 
    def __enter__(self):
        return self
 
    def __exit__(self, exc_type, exc_val, exc_tb):
        end = time.time()
        runtime = end - self.start
        msg = 'The function took {time} seconds to complete'
        print(msg.format(time=runtime))
 
 
def long_runner():
    for x in range(5):
        sleep_time = random.choice(range(1,5))
        time.sleep(sleep_time)
 
 
if __name__ == '__main__':
    with MyTimer():
        long_runner()
```


### 4. Module cProfile
Python đi kèm với trình biên dịch đã tích hợp sẵn. Có module `profile` và `cProfile`. Module `profile` là thuần tùy để sử dụng nhưng nó tiêu tốn nhiều chi phí cho bất kỳ thứ gì bạn cấu hình, nên nó luôn được recommended sử dụng cProfile có các phương thức tương tự nhưng nhanh hơn nhiều
```
>>> import cProfile
>>> cProfile.run("[x for x in range(1500)]")
         4 function calls in 0.001 seconds
 
   Ordered by: standard name
 
   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.000    0.000 <string>:1(<listcomp>)
        1    0.000    0.000    0.000    0.000 <string>:1(<module>)
        1    0.001    0.001    0.001    0.001 {built-in method builtins.exec}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```
Dòng đầu tiên cho thấy thời gian và số lần gọi hàm. Dòng số 2 là cách sắp xếp kết quả. Sau đó là bảng thông tin các kết quả:
* **ncalls**: Số lượng cuộc gọi được thực hiện
* **tottime**:  Tổng thời gian đã dành cho function
* **percall**: Thời gian trung bình trên mỗi lần thực hiện call function
* **cumtime**: Thời gian tích lũy cho việc này và tất cả các chức năng con. Nó thậm chí còn chính xác cho các chức năng đệ quy
* Cột **ncalls** thứ 2 là thương của **cumtime** chia cho các lệnh gọi nguyên thủy
* **filename:lineno(function)** dữ liệu tương ứng của từng chức năng

### 5. Module line_profiler
Một module bên thứ 3, cài đặt qua pip như sau:
```
pip install line_profiler
```
Cách sử dụng dòng lệnh thông thường:
```
kernprof -l silly_functions.py
```
Khi chạy dòng lệnh trên thì toàn bộ output sẽ được ném vào file `silly_functions.py.lprof` đặt ngay tại thư mục làm việc. Thử với một đoạn script sau:
```
# silly_functions.py
import time
 
@profile
def fast_function():
    print("I'm a fast function!")
 
@profile
def slow_function():
    time.sleep(2)
    print("I'm a slow function")
 
if __name__ == '__main__':
    fast_function()
    slow_function()
```
Sau đó chạy dòng lệnh trên với tham số **-v**
```
kernprof -l -v silly_functions.py
```
và ta được kết quả:
```
I'm a fast function!
I'm a slow function
Wrote profile results to silly_functions.py.lprof
Timer unit: 1e-06 s
 
Total time: 3.4e-05 s
File: silly_functions.py
Function: fast_function at line 3
 
Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
     3                                           @profile
     4                                           def fast_function():
     5         1           34     34.0    100.0      print("I'm a fast function!")
 
Total time: 2.001 s
File: silly_functions.py
Function: slow_function at line 7
 
Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
     7                                           @profile
     8                                           def slow_function():
     9         1      2000942 2000942.0    100.0      time.sleep(2)
    10         1           59     59.0      0.0      print("I'm a slow function")
```
Giải thích từng ý nghĩa có phần dữ liệu output này:
* **Line #**: Số dòng của mã được define
* **Hits**: Số lần được thực hiện (chạy qua) ở dòng đó
* **Time**: Tổng số thời gian mà dòng đó đã tiêu tốn
* **Per Hit**: Số thời gian trung bình thực hiện mỗi lần
* **% Time**: Tỉ lệ thời giản sử dụng ở dòng này so với toàn bộ function đã sử dụng
* **Line Contents**: Mã nguồn

### 6. Module memory_profiler
Một module bên thứ 3 nữa là `memory_profiler`. Module giúp ta theo dõi mức độ tiêu thụ bộ nhớ trong một quy trình hoặc theo từng dòng lệnh. Để cài đặt ta sử dụng `pip`
```
pip install memory_profiler
```
`memory_profiler` có cách thức hoạt động tương tự như `line_profiler`. Thử sử dụng một đoạn script sau:
```
# memo_prof.py 
@profile
def mem_func():
    lots_of_numbers = list(range(1500))
    x = ['letters'] * (5 ** 10)
    del lots_of_numbers
    return None
 
if __name__ == '__main__':
    mem_func()
```
Sau đó chạy dòng lệnh:
```
python -m memory_profiler memo_prof.py 
```
Ta có được đoạn output sau:
```

Filename: memo_prof.py
 
Line #    Mem usage    Increment   Line Contents
================================================
     1   16.672 MiB    0.000 MiB   @profile
     2                             def mem_func():
     3   16.707 MiB    0.035 MiB       lots_of_numbers = list(range(1500))
     4   91.215 MiB   74.508 MiB       x = ['letters'] * (5 ** 10)
     5   91.215 MiB    0.000 MiB       del lots_of_numbers
     6   91.215 MiB    0.000 MiB       return None
```
Nội dung của các cột khá tường minh. Số dòng, số mem đã sử dụng, số mem đã tăng so với dòng phía trước và cuối cùng là mã nguồn

`memory_profiler` cũng cung cấp một mã lệnh để tạo báo cáo sử dụng bộ nhớ đầy đủ theo thời gian:
```
$ mprof run memo_prof.py
mprof: Sampling memory every 0.1s
running as a Python program...
```
Sử dụng thêm lệnh 
```
mprof plot
```
để có được biểu đồ trực quan dưới đây
![](https://images.viblo.asia/3b0637d4-facb-4f9d-b57b-c82eb1859863.png)

### 7. Module profilehooks
Thêm một module bên thứ 3 nữa là `profilehooks`, nó là bộ sưu tập các decorator được thiết kế cho các chức năng định hình. Cài đặt:
```
pip install profilehooks
```
Thử với đoạn mã sau:
```
# profhooks.py
from profilehooks import profile
 
 
@profile
def mem_func():
    lots_of_numbers = list(range(1500))
    x = ['letters'] * (5 ** 10)
    del lots_of_numbers
    return None
 
if __name__ == '__main__':
    mem_func()
```
Lệnh chạy đơn giản chỉ cần
```
python profhooks.py
```
và output:
```
*** PROFILER RESULTS ***
mem_func (c:\Users\mike\Dropbox\Scripts\py3\profhooks.py:3)
function called 1 times
 
         3 function calls in 0.096 seconds
 
   Ordered by: cumulative time, internal time, call count
 
   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.096    0.096    0.096    0.096 profhooks.py:3(mem_func)
        1    0.000    0.000    0.000    0.000 {range}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
        0    0.000             0.000          profile:0(profiler)
```
Nhìn giống output của `cProfile` nhỉ. `profilehooks` có thêm 2 decorator. Cái đầu tiên là **timecall** cho chúng ta biết thời gian chạy hàm:
```
# profhooks2.py
from profilehooks import timecall
 
@timecall
def mem_func():
    lots_of_numbers = list(range(1500))
    x = ['letters'] * (5 ** 10)
    del lots_of_numbers
    return None
 
if __name__ == '__main__':
    mem_func()
```
và output:
```
  mem_func (profhooks2.py:4):
    0.075 seconds
```
Nhìn nó giống **timeit** quá ta. Thử với decorator thứ 2 là **coverage** nào. Thay thế **timecall** thành **coverage** và chạy thử lại:
```

*** COVERAGE RESULTS ***
mem_func (profhooks2.py:4)
function called 1 times

       @coverage
       def mem_func():
    1:     lots_of_numbers = list(range(1500))
    1:     x = ['letters'] * (5 ** 10)
    1:     del lots_of_numbers
    1:     return None
```
nó cung cấp cho bạn thông tin số lần chạy qua các dòng khi chạy hàm trên. Cái này không liên quan lắm tới bài này nhưng thôi giới thiếu nốt cho các bạn :D

### 8. Kết luận
Qua các mục trên mình đã giới thiệu cho các bạn cách cách, module sử dụng để đo đạc được thời gian thực thi của các hàm, hiệu năng sử dụng...bla bla để từ đó tối ưu được code, đưa ra được quyết định nên dùng cái gì. Chúc các bạn thành công!