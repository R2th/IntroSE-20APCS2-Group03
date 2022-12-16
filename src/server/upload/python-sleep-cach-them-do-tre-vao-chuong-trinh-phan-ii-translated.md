Phần I của bài viết: https://viblo.asia/p/python-sleep-how-to-add-time-delays-to-your-code-part-i-translated-6J3ZgP6glmB

### Adding a Python `sleep()` Call With Decorators

Có những khi bạn cần thử lại một hàm bị lỗi. Một trường hợp phổ biến chính là khi download file lúc server bận. Bạn thường không muốn gửi request lên server một cách quá thường xuyên, vậy nên việc thêm một lời gọi `sleep()` giữa các request là điều cần thiết.

Một trường hợp khác bản thân tôi đã trải qua chính là khi tôi cần check trạng thái của một UI trong một phiên test tự động. UI có thể load nhanh hơn hoặc chậm hơn bình thường, tùy vào máy tính mà bạn đang chạy test. Điều này có thể thay đổi những gì xuất hiện trên màn hình ở thời điểm chương trình xác thực một điều gì đó.

Trong trường hợp này, tôi có thể để chương trình ngủ một lát và kiểm tra lại mọi thức trong một hoặc hai giây sau đó. Việc chạy test thành công hay thất bại lại nằm ở những khoảnh khắc ngủ này.

Bạn có thể sử dụng **decorator** để thêm lời gọi `sleep()` trong những trường hợp này. Nếu bạn không quen với decorator hoặc bạn muốn nâng cao kiến thức về nó, bạn có xem tutorial [Primer on Python Decorators](https://realpython.com/primer-on-python-decorators/). Hãy xem ví dụ sau:

```Python
import time
import urllib.request
import urllib.error

def sleep(timeout, retry=3):
    def the_real_decorator(function):
        def wrapper(*args, **kwargs):
            retries = 0
            while retries < retry:
                try:
                    value = function(*args, **kwargs)
                    if value is None:
                        return
                except:
                    print(f'Sleeping for {timeout} seconds')
                    time.sleep(timeout)
                    retries += 1
        return wrapper
    return the_real_decorator
```

`sleep()` là decorator của bạn. Nó nhận một giá trị `timeout` và số lần nó nên `retry` - mặc định là 3. Trong `sleep()` là một hàm khác, `the_real_decorator()`, chấp nhận hàm được decorate.

Cuối cùng, hàm trong cùng `wrapper()` nhận các đối số (argument) và các đối số từ khóa (keyword argument) mà bạn truyền vào hàm được decorate. Đây là nơi ma thuật xuất hiện! Bạn sử dụng vòng lặp `while` để thử lại việc gọi hàm. Nếu có exception, bạn gọi `time.sleep()`, tăng biến đếm `retries` và chạy hàm lần nữa.

Bây giờ, viết lại `uptime_bot()` để sử dụng decorator mới của bạn:

```Python
@sleep(3)
def uptime_bot(url):
    try:
        conn = urllib.request.urlopen(url)
    except urllib.error.HTTPError as e:
        # Email admin / log
        print(f'HTTPError: {e.code} for {url}')
        # Re-raise the exception for the decorator
        raise urllib.error.HTTPError
    except urllib.error.URLError as e:
        # Email admin / log
        print(f'URLError: {e.code} for {url}')
        # Re-raise the exception for the decorator
        raise urllib.error.URLError
    else:
        # Website is up
        print(f'{url} is up')

if __name__ == '__main__':
    url = 'http://www.google.com/py'
    uptime_bot(url)
```

Ở đây, bạn decorate `uptime_bot()` với lệnh `sleep()` 3 giây. Bạn cũng đã loại bỏ vòng lặp `while` ban đầu cũng như là lời gọi tới `sleep(60)`. Decorator sẽ đảm nhiệm việc này từ bây giờ.

Một thay đổi khác mà bạn đã thực hiện chính là thêm một lệnh `raise` bên trong các khối xử lý exception. Việc này đảm bảo decorator sẽ hoạt động đúng đắn. Bạn có thể viết decorator để xử lý những lỗi này nhưng bởi vì các exception chỉ  áp dụng với `urllib`, tốt hơn bạn nên giữ nguyên decorator như trước đó. Như vậy, bạn có thể sử dụng nó ở nhiều nơi.

Có một vài thứ bạn có thể làm để cải tiến decorator của bạn. Nếu chương trình đã thử đủ số lần mà vẫn thất bại, bạn sẽ thấy nó raise lại lỗi cuối cùng. Decorator cũng sẽ chờ 3 giây sau lần thất bại cuối cùng và đây có thể là điều mà bạn không hề mong muốn. Cứ thoải thay đổi nó theo ý bạn nhé!

### Adding a Python `sleep()` Call With Threads

Có những khi bạn muốn thêm lời gọi `sleep()` vào một **thread**. Có thể bạn đang chạy một migration script với hàng triệu bản ghi trong production. Bạn không muốn gây ra thời gian chết nhưng cũng không muốn chờ lâu hơn mức cần thiết để hoàn thành việc migration, vậy nên bạn quyết định sử dụng tới các thread.

>**Chú ý:** Thread là một cách thức thực hiện [concurrency](https://realpython.com/python-concurrency/) trong Python. Bạn có thể chạy đồng thời vài thread để tăng hiệu suất chương trình. Nếu bạn chưa quen với thread, bạn có thể xem bài viết [An Intro to Threading in Python](https://realpython.com/intro-to-python-threading/).

Để tránh việc khách hàng chú ý tới bất cứ sự chậm trễ nào, mỗi thread cần chạy trong một khoảng thời gian ngắn, sau đó đi ngủ. Có hai cách để làm việc này:

1. Sử dụng `time.sleep()` như ở trên
2. Sử dụng `Event.wait()` từ module `threading`

Hãy bắt đầu từ `time.sleep()`.

#### Using `time.sleep()`

[Logging Cookbook](https://docs.python.org/3/howto/logging-cookbook.html#logging-from-multiple-threads) đã đưa ra một ví dụ tuyệt vời sử dụng `time.sleep()`. Module `logging` có tính thread-safe, vậy nên nó hữu ích hơn một chút so với [print()](https://realpython.com/python-print/) với bài tập này. Đoạn code sau dựa vào ví dụ này:

```Python
import logging
import threading
import time

def worker(arg):
    while not arg["stop"]:
        logging.debug("worker thread checking in")
        time.sleep(1)

def main():
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(relativeCreated)6d %(threadName)s %(message)s"
    )
    info = {"stop": False}
    thread = threading.Thread(target=worker, args=(info,))
    thread_two = threading.Thread(target=worker, args=(info,))
    thread.start()
    thread_two.start()

    while True:
        try:
            logging.debug("Checking in from main thread")
            time.sleep(0.75)
        except KeyboardInterrupt:
            info["stop"] = True
            logging.debug('Stopping')
            break
    thread.join()
    thread_two.join()

if __name__ == "__main__":
    main()
```

Ở đây, bạn sử dụng module `threading` để tạo ra hai thread. Bạn cũng tạo một object logging chịu trách nhiệm log `threadName` vào stdout. Tiếp theo, bạn khởi động cả hai thread và khởi tạo một vòng lặp từ thread chính liên tục. Bạn sử dụng `KeyboardInterrupt` để bắt thao tác `^Ctrl + C` từ người dùng.

Thử chạy đoạn code trên trong terminal, bạn sẽ thấy output giống như sau:

```Shell
 0 Thread-1 worker thread checking in
 1 Thread-2 worker thread checking in
 1 MainThread Checking in from main thread
752 MainThread Checking in from main thread
1001 Thread-1 worker thread checking in
1001 Thread-2 worker thread checking in
1502 MainThread Checking in from main thread
2003 Thread-1 worker thread checking in
2003 Thread-2 worker thread checking in
2253 MainThread Checking in from main thread
3005 Thread-1 worker thread checking in
3005 MainThread Checking in from main thread
3005 Thread-2 worker thread checking in
```

Khi mỗi thread chạy rồi ngủ, logging sẽ được in ra console. Thông qua ví dụ này, bạn có thể sử dụng những khái niệm này trong code của riêng bạn.

#### Using `Event.wait()`

Module `threading` cung cấp `Event()` mà bạn có thể sử dụng như `time.sleep()`. Tuy nhiên, `Event()` có ưu điểm là nó đáp ứng tốt hơn. Lý giải cho điều này là khi event được thiết lập, chương trình sẽ thoát ra khỏi vòng loop ngay lập tức. Với `time.sleep()`, code của bạn sẽ cần chờ lời gọi `sleep()` kết thúc trước khi thread có thể thoát.

Lý do bạn muốn sử dụng `wait()` ở đây là bởi vì `wait()` có tính **non-blocking** trong khi `time.sleep()` là **blocking**. Điều này có nghĩ là khi bạn sử dụng `time.sleep()`, bạn sẽ chặn thread chính và nó sẽ không tiếp tục chạy trong khi chờ lời gọi `sleep()` kết thúc. `wait()` giải tuyết được vấn đề này. Bạn có thể đọc thêm về tất cả những thứ liên quan đến threading ở phần [documentation](https://docs.python.org/3/library/threading.html#event-objects) của Python.

Đây là cách bạn thêm một lời gọi `sleep()` với `Event.wait()`:

```Python
import logging
import threading

def worker(event):
    while not event.isSet():
        logging.debug("worker thread checking in")
        event.wait(1)

def main():
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(relativeCreated)6d %(threadName)s %(message)s"
    )
    event = threading.Event()

    thread = threading.Thread(target=worker, args=(event,))
    thread_two = threading.Thread(target=worker, args=(event,))
    thread.start()
    thread_two.start()

    while not event.isSet():
        try:
            logging.debug("Checking in from main thread")
            event.wait(0.75)
        except KeyboardInterrupt:
            event.set()
            break

if __name__ == "__main__":
    main()
```

Trong ví dụ này, bạn tạo ra `threading.Event()` và truyền nó cho `worker()`. (Nhớ lại trong ví dụ trước, bạn đã truyền một dict). Tiếp theo, bạn có thể dựng lên các vòng lặp để kiểm tra `event` đã được thiết lập hay chưa. Nếu chưa, code của bạn sẽ in ra một message và chờ một chút trước khi kiểm tra lại. Để thiết lập event, bạn có ấn `^Ctrl + C`. Một khi event đã được thiết lập, `worker()` sẽ trả về, vòng loop sẽ bị break và kết thúc chương trình.

Nguồn: https://realpython.com/python-sleep/