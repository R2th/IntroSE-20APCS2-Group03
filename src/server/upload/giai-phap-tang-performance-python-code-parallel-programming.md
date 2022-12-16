## Introduction

Nếu bạn đã làm các dự án về Python, bạn sẽ gặp trường hợp code của mình chạy quá chậm. Có nhiều cách để cải thiện việc này. Ở đây, mình sẽ hướng dẫn cải thiện hiệu năng thông qua lập trình song song.
![](https://images.viblo.asia/4df37b47-55e1-4354-b85d-07720f9ea4a4.gif)

## Multiprocessing và Multithreading

Có lẽ đây là giải pháp đầu tiên mà các bạn sẽ nghĩ tới. Nhưng tới đây, sẽ cần phải phân biệt rõ 2 khái niệm: **process** và **thread**.

- **Process** hiểu đơn giản nó là một program đang working.
- **Thread** hiển đơn giản nó là một khối các instructions độc lập trong một process.

Một điểm đáng chú ý: cả **multiprocessing** và **multithreading** đều sử dụng cơ chế **GIL**. Đấy là nói với **CPython**. Và hệ quả đó là: **CPython** không hoàn toàn hỗ trợ đa luồng. Bởi vì, **GIL** chỉ giới hạn một thread chạy ở một thời điểm.

**GIL** là gì và vì sao bị rất nhiều người phàn nàn nhưng **GIL** không được gỡ bỏ trong **CPython**, các bạn có thể tham khảo: https://realpython.com/python-gil/

Trong Python,

- **Multiprocessing**: có package `multiprocessing`: https://docs.python.org/3.7/library/multiprocessing.html
- **Multithreading**: có package `threading`: https://docs.python.org/3.7/library/threading.html#module-threading

Example multiprocessing:

```sh
>>> import multiprocessing
>>> from multiprocessing import Pool, TimeoutError
>>> import time
>>> import os
>>> def f(x):
...     return x*x
... 
>>> if __name__ == '__main__':
...     number_cpu = multiprocessing.cpu_count()
...     print("Number CPU {}".format(number_cpu))
...     with Pool(processes=number_cpu) as pool:
...             print(pool.map(f, range(10)))
...             for i in pool.imap_unordered(f, range(10)):
...                     print(i)
...             res = pool.apply_async(time.sleep, (10,))
...             try:
...                      print(res.get(timeout=1))
...             except TimeoutError:
...                     print("We lacked patience and got a multiprocessing.TimeoutError")
... 
Number CPU 4
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
0
1
4
9
16
25
49
36
64
81
We lacked patience and got a multiprocessing.TimeoutError

```

Example multitheading:

```sh
>>> import logging
>>> import threading
>>> import time
>>> 
>>> def thread_function(name):
...     logging.info("Thread {}: starting".format(name))
...     time.sleep(1)
...     logging.info("Thread {}: finishing".format(name))
... 
>>> if __name__ == "__main__":
...     logging.basicConfig(format="%(asctime)s: %(message)s", level=logging.INFO, datefmt="%H:%M:%S")
...     logging.info("Main    : before creating thread")
...     x = threading.Thread(target=thread_function, args=(1,))
...     logging.info("Main    : before running thread")
...     x.start()
...     logging.info("Main    : wait for the thread to finish")
...     logging.info("Main    : all done")
... 
15:26:02: Main    : before creating thread
15:26:02: Main    : before running thread
15:26:02: Thread 1: starting
15:26:02: Main    : wait for the thread to finish
15:26:02: Main    : all done
>>> 15:26:03: Thread 1: finishing

```

Ưu điểm khi sử dụng multitheading hoặc multiprocessing là việc handle nó khá là đơn giản.

Nhược điểm là chính bởi sử dụng GIL nên hiệu quả tối ưu nó performance nó không được cao cho lắm :D.

## Asynchronous Programming

Từ **Python 3.4**, chúng ta có 1 module mới với tên là `asyncio`. 

`asyncio` sử dụng syntax `async/await` giống với **Javascript ES6**.

`asyncio` thường được sử dụng với hệ thống IO-bound and high-level structured network code.

`asyncio` cung cấp APIs dùng để:

- Run Python coroutines concurrently
- Control over their execution
- Control subprocesses
- Synchronize concurrent code
- Distribute tasks via queues
...

Example:

```sh
>>> import asyncio
>>> async def coroutine_1():
...     print('coroutine_1 yielding control. Going to be blocked for 10 seconds')
...     await asyncio.sleep(10)
... 
>>> async def coroutine_2():
...     print('coroutine_2 yielding control. Going to be blocked for 5 seconds')
...     await asyncio.sleep(5)
...
>>> loop = asyncio.get_event_loop()
>>>
>>> loop.run_until_complete(asyncio.gather(coroutine_1(), coroutine_2()))
coroutine_2 yielding control. Going to be blocked for 5 seconds
coroutine_1 yielding control. Going to be blocked for 10 seconds
[None, None]
```

Ưu điểm khi sử dụng asyncio là nó phù hợp với hệ thống IO-bound và high-level structured network code.

Nhược điểm là nếu hệ thống của bạn dạng CPU-bound thì chẹp.. consider sử dụng multiprocessing/multithreading thay thế. Ngoài ra, những hệ thống Python cũ hơn 3.4 thì Say good bye và không hẹn gặp lại.

## Using Worker: JobQueue và Pubsub

Một giải pháp nữa nó lại không quá liên quan tới Python. Nó liên quan tới kiến trúc hệ thống nhiều hơn. Với những hệ thống Python version đã cũ. Nếu việc upgrade Python version nó không khả thi, bạn có thể consider đến giải pháp này.

Nếu các logic của bạn phức tạp và xử lý rất nhiều dữ liệu thì tạo dựng một vài con worker sẽ không phải ý tồi.

Thường các con worker mình sẽ sử dụng 2 cơ chế chính là:

- **JobQueue**
- **PubSub**

Redis đều hỗ trợ rất tốt 2 cơ chế này.

Example Job Queue:

```py
# worker.py
from mymodule import count_words_at_url
from redis import Redis
from rq import Queue


q = Queue(connection=Redis())
job = q.enqueue(count_words_at_url, 'http://dantri.com')



# mymodule.py
import requests

def count_words_at_url(url):
    resp = requests.get(url)
    print( len(resp.text.split()))
```
Example Pubsub bạn có thể tham khảo tại đây:https://viblo.asia/p/gioi-thieu-ve-pubsub-va-su-dung-python-va-redis-demo-pubsub-V3m5WbywlO7

Ưu điểm khi sử dụng giải pháp này là mình có thể tận dụng các hệ thống Python đã rất cũ nhưng muốn nó vẫn chạy ngon.

Nhược điểm là vì là giải pháp này mang tính hệ thống nhiều nên cần phải cân nhắc rất kỹ.

## Conclusion

Parallel programming là một giải pháp để tăng performance cho các project Python. Và tất nhiên tùy thuộc vào bài toán của mình để áp dụng giải pháp nào tốt nhất.