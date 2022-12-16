# Giới thiệu về Pytest
## Đặt vấn đề
Bạn viết 1 service mà nó yêu cầu lấy dữ liệu từ bên thứ ba sau đó phải xử lý dữ liệu nhận được để đưa ra kết quả trả về cho response, giả sử quá trình đó diễn ra rất mất thời gian (tầm 5s). Và bây giờ bạn muốn kiểm thử hoạt động của service của mình nhưng lại không mong muốn nó gọi API của bên thứ 3 liên tục mỗi lần test vì nó sẽ làm cho quá trình test chậm lại, vả lại việc gọi thêm API sẽ đòi hỏi nhiều bước làm của bạn
Một trường hợp khác là hàm cần test cần thao tác với database, nhưng ta không được phép thay đổi hay cập nhật vào database đó (vì sẽ làm nguy hiểm đến hệ thống đang chạy).
Vậy điều chúng ta cần ở đây chính là việc có thể thay thế việc gọi API hay truy cập database bằng một hành động khác nào đó mà vẫn có dữ liệu trả về tương tự như API, chúng ta tạm gọi đó là việc `mock` hay còn gọi là `patching`
## Pytest
Không giống như phần lớn các ngôn ngữ lập trình, Python sử dụng 1 thư viện `built-in` cho việc testting đó là `pytest`
Để cài đặt và sử dụng `pytest`, ta chạy câu lệnh sau:
> `pip install pytest-mock`
## Cách sử dụng của Pytest
Đầu tiên ta cần có một hàm để mang đi test, giả sử nó có tên là `example()`
Việc ta cần làm là:
1. Tạo file test với cú pháp bắt buộc: có bắt đầu hoặc kết thúc bằng từ `test`
    Ví dụ: `test_file.py`
2. Tạo hàm test với cú pháp bắt đầu bằng từ `test`
    Ví dụ: `test_example()`
    Sử dụng `assert` để so sánh kết quả khi gọi hàm `example()` với `output` ta mong muốn
    (`assert` sẽ raise lên lỗi khi kết quả không bằng nhau)
3. Chạy test
    Sử dụng `command-line` để chạy dòng lệnh sau:
> `pytest [-k example] -[v] -[vv] [-s]`
```
Giải thích:
    Flag `-k` đi kèm với 1 keyword, Pytest sẽ tìm các hàm có tên hàm chứa keyword đó để chạy (rất hữu ích trong trường hợp bạn viết nhiều hàm test cho nhiều API và muốn chạy 1 hàm cụ thể)
    Flag `-v` sẽ hiển thị nhiều thông tin của testcase hơn khi chạy testing
    Flag `-vv` tương tự như `-v` nhưng sẽ hiển thị chi tiết trong trường hợp nếu testcase failed (đầu ra với output khác nhau) sẽ chỉ ra khác nhau ở đoạn nào
    Flag `-s` sẽ thực thi và in ra nội dung của các câu lệnh print trong code (Mà pytest sẽ bỏ qua lệnh print)
```
# Ví dụ đơn giản về sử dụng Pytest
Ví dụ này sẽ giúp bạn hiểu tại sao nên sử dụng `mock` để có thể tăng tốc độ testing và không ảnh hưởng đến code base mà bạn đã viết
Giả sử ta có hàm `get_operating_system` sẽ cho ta biết máy tính đang sử dụng Windows hay Linux
```
# application.py 
from time import sleep  
def is_windows():    
    # This sleep could be some complex operation instead
    sleep(5)    
    return True  
def get_operating_system():    
    return 'Windows' if is_windows() else 'Linux'
```
Trong đó, hàm `is_windows` để check nếu hệ điều hành hiện tại là Windows hay không, ta giả sử hàm này khá phức tạp và tốn khá nhiều thời gian để chạy, ta giả sử bằng hàm sleep(5), nghĩa là chương trình sẽ mất 5s để xử lý
Hàm `get_operating_system` sẽ là phần code base và ta cần phải mang nó đi test để kiểm thử
Ta cần một hàm chạy test, có tên là `test_get_operating_system` sau:
```
# test_application.py

from application import get_operating_system

def test_get_operating_system():
    assert get_operating_system() == 'Windows'
```
Sau đó ta chạy lệnh test:
```
$ pytest
================ test session starts ========================
Python 3.7.3, pytest-5.4.1, py-1.8.1, pluggy-0.13.1
rootdir: /usr/Personal/Projects/pytest-and-mocking
plugins: mock-2.0.0
collected 1 item

test_application.py .                                    [100%]

================ 1 passed in 5.05s ==========================
```
Ta thấy kết quả chạy thực sự khá lâu, và để khắc phục điều đó, ta sẽ sử dụng khái niệm gọi là `mocker` và để nó là tham số của hàm test, nó có tác dụng làm test của ta khi gọi đến hàm `is_windows()` sẽ không chạy hàm thật, mà return luôn về giá trị mà ta định sẵn trong đối số của `mocker`
`mocker` sẽ nhận 2 đối số, một là `path` - là đường dẫn đến nơi hàm mà ta định fake hàm, hai là `return_value` là giá trị trả về khi gọi hàm fake đó
Bây giờ ta sẽ update lại hàm test, sử dụng `mocker`:
```
# 'mocker' fixture provided by pytest-mock
def test_get_operating_system(mocker):  
    # Mock the slow function and return True always
    mocker.patch('application.is_windows', return_value=True) 
    assert get_operating_system() == 'Windows'
```
Ta chạy lại code test sẽ thấy kết quả được cải thiện:
```
$ pytest
============ test session starts ==================
Python 3.7.3, pytest-5.4.1, py-1.8.1, pluggy-0.13.1
rootdir: /mnt/c/Personal/Projects/pytest-and-mocking
plugins: mock-2.0.0
collected 1 item

test_application.py .                          [100%]

=========== 1 passed in 0.11s ======================
```
Trong ví dụ trên ta mặc định những gì ta trả về chỉ là giá trị `true`, giờ muốn nó là `false` thì sẽ viết như sau:
```
def test_operation_system_is_linux(mocker):
    mocker.patch('application.is_windows', return_value=False) # set the return value to be False
    assert get_operating_system() == 'Linux'
```
# Tài liệu tham khảo
https://www.freblogg.com/pytest-functions-mocking-1