Đã bao giờ bạn cần chương trình của bạn chờ một cái gì đó? Thường thì bạn sẽ muốn các đoạn code được xử lý càng nhanh càng tốt. Nhưng cũng có khi để code "ngủ" chính là những gì bạn quan tâm.

Ví dụ, bạn có thể sử dụng `sleep()` để tạo độ trễ trong chương trình của bạn. Có thể bạn cần chờ một file được upload hoặc download, hoặc chờ một một biểu đồ được load hoặc vẽ lên trên màn hình. Thậm chí, có thể bạn cần tạm dừng những các lượt gọi tới một API web, hoặc giữa các câu truy vấn (query) tới database.

Trong tutorial này, bạn sẽ tìm hiểu cách thêm các lời gọi hàm `sleep()` với:
- `time.sleep()`
- Decorator
- Thread
- Async IO
- Graphical User Interface

Chú ý bài viết này dành cho các lập trình viên trung cấp (intermediate)!

### Adding a Python `sleep()` Call With `time.sleep()`

Python có hỗ trợ sẵn cho việc "đưa" chương trình của bạn vào giấc ngủ. Hàm `sleep()` thuộc module `time` được sử dụng để tạm dừng luồng xử lý của thread gọi tới nó bao lâu bạn muốn.

Đây là một ví dụ về cách sử dụng nó:

```Python
>>> import time
>>> time.sleep(3) # Sleep for 3 seconds
```

Nếu bạn chạy đoạn code trên trong console, bạn sẽ phải đợi một chút trước khi bạn muốn thêm vào một câu lệnh mới.

>**Note**: Trong Python 3.5, các core developer đã thay đổi hành vi của `time.sleep()` một chút. Lời gọi `sleep()` sẽ kéo dài ít nhất bằng số giây mà bạn truyền vào, thậm chí cả khi giấc ngủ bị phá bơi một signal. Tuy nhiên, việc này sẽ không đúng nếu bản thân signal raise lên exception.

Bạn có thể kiểm tra xem các giấc ngủ kéo dài bao lâu bằng cách sử dụng module `timeit`:

```Shell
$ python3 -m timeit -n 3 "import time; time.sleep(3)"
3 loops, best of 3: 3 sec per loop
```

Ở đây, bạn chạy module `timeit` với tham số `-n` - số lần mà câu lệnh sẽ được chạy. Bạn có thể thấy rằng là `timeit` chạy câu lệnh 3 lần và thời gian chạy tốt nhất là 3 giây, đúng là điều chúng ta mong đợi.

Số lần chạy code mặc định của `timeit` là 1,000,000. Nếu bạn chạy đoạn code trên với `-n` mặc định, terminal sẽ treo xấp xỉ 34 ngày! Module `timeit` còn có các lựa chọn khác khi chạy lệnh, bạn có tham khảo thêm ở [đây](https://docs.python.org/3/library/timeit.html#timeit-command-line-interface).

Hãy thử tạo ra một cái gì đó thực tế hơn! Một quản trị hệ thống cần biết khi nào một trong các website của họ "chết". Bạn muốn có thể check trạng thái hệ thống một cách thường xuyên nhưng bạn không thể truy vấn web server liên tục hoặc việc đó có thể ảnh hưởng tới hiệu năng. Một cách để làm việc này là sử dụng `sleep()`:

```Python
import time
import urllib.request
import urllib.error

def uptime_bot(url):
    while True:
        try:
            conn = urllib.request.urlopen(url)
        except urllib.error.HTTPError as e:
            # Email admin / log
            print(f'HTTPError: {e.code} for {url}')
        except urllib.error.URLError as e:
            # Email admin / log
            print(f'URLError: {e.code} for {url}')
        else:
            # Website is up
            print(f'{url} is up')
        time.sleep(60)

if __name__ == '__main__':
    url = 'http://www.google.com/py'
    uptime_bot(url)
```

Ở đây bạn định nghĩa hàm `uptime_bot()` có nhận một URL là tham số đầu vào. Hàm này sau đó sẽ thử mở URL đó với `urllib`. Nếu có lỗi `HTTPError` hay `URLError`, chương trình bắt và in ra lỗi. (Trong thực tế, bạn có thể sẽ log lại lỗi và gửi email tới chủ hoặc quản trị viên của website đó.)

Nếu không có lỗi xảy ra, chương trình sẽ thông báo là mọi thứ đều ổn. Cho dù điều gì có xảy ra, chương trình của bạn cũng sẽ ngủ trong khoảng 60 giây. Điều này có nghĩa là bạn chỉ truy cập vào website một phút một lần. Đường link trong ví dụ bị chết vậy nên chương trình sẽ in ra dòng sau trong console mỗi phút một lần:

```Shell
HTTPError: 404 for http://www.google.com/py
```

Hãy update code với một URL còn sống kiểu như [https://google.com](https://google.com). Sau đó chạy lại chương trình và thấy mọi thứ ổn hơn. Bạn có thể thử update code để gửi email hoặc log các lỗi. Chi tiết hơn về các vấn đề này, bạn có thể tìm hiểu [Sending Emails With Python](https://realpython.com/python-send-email/) và [Logging in Python](https://realpython.com/python-logging/).

Nguồn: https://realpython.com/python-sleep/