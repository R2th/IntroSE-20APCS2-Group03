Python decorators có thể cung cấp cho bạn khả năng thêm các chức năng mới vào bất kỳ object gọi được nào mà không thực sự chạm hoặc thay đổi mã bên trong nó. Điều này mang lại sự đóng gói tốt hơn và giúp bạn viết mã sạch hơn và dễ hiểu hơn. Tuy nhiên, decorators được coi l một chủ đề khá advanced trong Python vì việc hiểu và viết nó đòi hỏi bạn phải quen với nhiều khái niệm bổ sung như first class objects, higher order functions, closures, v.v. Trước tiên, mình sẽ cố gắng giới thiệu các khái niệm này khi cần thiết và sau đó làm sáng tỏ khái niệm cốt lõi của lớp decorator theo từng lớp.

## First Class Objects

Trong Python, về cơ bản mọi thứ là một đối tượng và các hàm được coi là các đối tượng hạng nhất. Nó có nghĩa là các hàm có thể được truyền xung quanh và được sử dụng làm đối số, giống như bất kỳ đối tượng nào khác (chuỗi, int, float, list, v.v.). Bạn có thể gán các hàm cho các biến và coi chúng như bất kỳ đối tượng nào khác. Xem xét ví dụ này:

```python
def func_a():
    return "I was angry with my friend."

def func_b():
    return "I told my wrath, my wrath did end"

def func_c(*funcs):
    for func in funcs:
        print(func())

main_func = func_c
main_func(func_a, func_b)
```

```
>  I was angry with my friend.
>  I told my wrath, my wrath did end
```

Ví dụ trên cho thấy cách Python đối xử với các chức năng như những công dân hạng nhất. Đầu tiên, tôi đã định nghĩa hai hàm, func_a và func_b và sau đó func_c lấy chúng làm tham số. func_c chạy các chức năng được lấy làm tham số và in kết quả. Sau đó, chúng ta gán func_c cho biến main_func. Cuối cùng, chúng tôi chạy main_func và nó hoạt động giống như func_c.

## Higher Order Functions

Python cũng cho phép bạn sử dụng các hàm làm giá trị trả về. Bạn có thể nhận một hàm khác và trả về hàm đó hoặc bạn có thể định nghĩa một hàm trong một hàm khác và trả về hàm bên trong.

```python
def higher(func):
    """Đây là higher order function.
    nó trả về một function khác.
    """

    return func

def lower():
    return "I'm hunting high and low"

higher(lower)
```

`> <function __main__.lower()>`

Bây giờ bạn có thể gán kết quả của hàm higher cho một biến khác và thực hiện chức năng đầu ra.

```python
h = higher(lower)
h()
```

`> "I'm hunting high and low"`

Hãy xem xét một ví dụ khác trong đó bạn có thể định nghĩa một hàm lồng trong một hàm và trả về hàm lồng nhau thay vì kết quả của hàm bọc ngoài nó.

```python
def outer():
    """Định nghĩa và trả về một hàm nested trong một hàm khác."""

    def inner():
        return "Hello from the inner func"

    return inner

inn = outer()
inn()
```

`> 'Hello from the inner func' `

## Closures

Các hàm lồng nhau có thể truy cập các biến ở nơi nó đc bọc. Trong Python, các biến non-local này mặc định là read only và chúng ta phải khai báo chúng rõ ràng là non-local (sử dụng từ khóa nonloca) để có thể sửa đổi chúng. Sau đây là một ví dụ về hàm lồng nhau truy cập vào một biến non-local.

```python
def burger(name):
    def ingredients():
        if name == "deli":
            return ("steak", "pastrami", "emmental")
        elif name == "smashed":
            return ("chicken", "nacho cheese", "jalapeno")
        else:
            return None

    return ingredients

ingr = burger("deli")
ingr()
```

`> ('steak', 'pastrami', 'emmental')`

Hàm burger được gọi với chuỗi "deli" và hàm trả về được liên kết với tên ingr. Khi gọi ingr (), biến truyền vào vẫn được ghi nhớ và sử dụng để rút ra kết quả mặc dù chức năng burger() bên ngoài đã kết thúc vòng đời của nó.

Kỹ thuật này mà trong nó một số dữ liệu ("deli") được gắn kèm thẳng vào code để có thể dùng lại sau được gọi là closure trong Python. Giá trị biến được ghi nhớ ngay cả khi nó ra khỏi phạm vi ban đầu hoặc function ban đầu bị xóa khỏi namespace hiện tại. Decorator sử dụng khía cạnh này của các biến không cục bộ nhiều lần và bạn sẽ thấy nó trong các phần dưới.

## Viết một Decorator đơn giản

Với những điều kiện tiên quyết đã đc làm rõ, hãy cùng tạo ra decorator đơn giản đầu tiên của bạn.

```python
def deco(func):
    def wrapper():
        print("This will get printed before the function is called.")
        func()
        print("This will get printed after the function is called.")

    return wrapper
```

Trước khi sử dụng decorator, hãy viết một function đơn giản mà không có bất kỳ tham số nào.

```python
def ans():
    print(42)
```

Đối xử với các chức năng như first-class objects, bạn có thể sử dụng decorator của mình như thế này:

```python
ans = deco(ans)
ans()
```

```
> This will get printed before the function is called.
  42
  This will get printed after the function is called.
```

Trong hai dòng trên, bạn có thể thấy cách hoạt động của một decorator rất đơn giản. Hàm decorator của chúng ta nhận một hàm mục tiêu, thao tác chức năng đích bên trong hàm bao bọc và sau đó trả về hàm bao bọc. Chạy chức năng được trả về bởi trình decorator, bạn sẽ nhận được kết quả sửa đổi của mình. Nói một cách đơn giản, decorator bao bọc một chức năng và sửa đổi hành vi của nó.

>  Hàm decorator chạy tại thời điểm các chức năng được trang trí được khai báo, không phải khi nó được gọi.

## Cú pháp @

Cách mà bạn đã sử dụng decorator trong phần trước có thể cảm thấy một chút củ chuối. Đầu tiên, bạn phải gõ tên ans ba lần để gọi và sử dụng decorator. Ngoài ra, nó trở nên khó khăn hơn để phân biệt decorator đang chạy ở đâu. Vì vậy, Python cho phép bạn sử dụng trang trí với cú pháp đặc biệt @. Bạn có thể áp dụng decorate của bạn trong khi khai báo chức năng của bạn, như thế này:

```python
@deco
def func():
    ...


# Giờ bạn có thể gọi func được decorate như một func bình thường
func()
```

##  Decorating Function có tham số

Trình decorator đơn giản mà chúng ta viết ở trên sẽ chỉ hoạt động với các chức năng không có tham số. Nó sẽ thất bại và raise TypeError nếu bạn cố gắng trang trí một hàm có đối số. Bây giờ, hãy tạo ra một trình decorator khác gọi là yell, hàm này sẽ nhận vào một chuỗi và biến chuỗi đó thành chữ hoa.

```python
def yell(func):
    def wrapper(*args, **kwargs):
        val = func(*args, **kwargs)
        val = val.upper() + "!"
        return val

    return wrapper
```

Tạo một function có chức năng trả về một chuỗi.

```python
@yell
def hello(name):
    return f"Hello {name}"
    
hello("redowan")
```

```
> 'HELLO REDOWAN!'
```

Hàm hello lấy chuỗi name làm tham số và trả về tin nhắn dưới dạng chuỗi. Hãy nhìn cách decorator yell sửa đổi chuỗi trả về của hello, biến nó thành chữ hoa và thêm một dấu phụ! ký mà không trực tiếp thay đổi bất kỳ mã nào trong chức năng hello.

## Ví dụ thực tế

Trước khi chuyển sang phần tiếp theo, hãy cùng xem một vài ví dụ thực tế về decorator:

### Timer

Timer decorator sẽ giúp bạn đếm giờ cho function của bạn một cách không xâm phạm (ko động vào code của function). Nó có thể giúp bạn trong khi gỡ lỗi và định hình các chức năng của bạn.

```python
import time
import functools

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        val = func(*args, **kwargs)
        end_time = time.time()
        run_time = end_time - start_time
        print(f"Finished running {func.__name__} in {run_time:.4f} seconds.")
        return val

    return wrapper

@timer
def dothings(n_times):
    for _ in range(n_times):
        return sum((i ** 3 for i in range(100_000)))
        
dothings(100_000)
```

```
> Finished running dothings in 0.0231 seconds.
  24999500002500000000
```

### Exception Logger

Giống như decorator đếm giờ, chúng ta có thể định nghĩa một decorator logger sẽ ghi lại trạng thái của một function. Đối với phần trình diễn này, mình sẽ xác định một trình ghi nhật ký ngoại lệ sẽ hiển thị thông tin bổ sung như dấu thời gian, tên đối số khi có exception xảy ra bên trong function được decorate.

```python
import functools
from datetime import datetime


def logexc(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):

        # Stringify the arguments
        args_rep = [repr(arg) for arg in args]
        kwargs_rep = [f"{k}={v!r}" for k, v in kwargs.items()]
        sig = ", ".join(args_rep + kwargs_rep)

        # Try running the function
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print("Time: ", datetime.now().strftime("%Y-%m-%d [%H:%M:%S]"))
            print("Arguments: ", sig)
            print("Error:\n")
            raise

    return wrapper

@logexc
def divint(a, b):
    return a / b
    

divint(1, 0)
```

```
> Time:  2020-05-12 [12:03:31]
    Arguments:  1, 0
    Error:

    ------------------------------------------------------------

    ZeroDivisionError         Traceback (most recent call last)
    ....
```

### Retry

Hãy tưởng tượng một tình huống mà function của bạn chạy không thành công do một số vấn đề liên quan đến I/O và bạn muốn thử lại lần nữa. Decorator có thể giúp bạn đạt được điều đó theo hướng tái sử dụng. Hãy viết một retry decorator sẽ chạy lại chức năng được trang trí nhiều lần nếu xảy ra lỗi http.

```python
import functools
import requests

def retry(func):
    """This will rerun the decorated callable 3 times if
    the callable encounters http 500/404 error."""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        n_tries = 3
        tries = 0
        while True:
            resp = func(*args, **kwargs)
            if resp.status_code == 500 or resp.status_code == 404 and tries < n_tries:
                print(f"retrying... ({tries})")
                tries += 1
                continue
            break
        return resp

    return wrapper

@retry
def getdata(url):
    resp = requests.get(url)
    return resp

resp = getdata("https://httpbin.org/get/1")
resp.text
```

```
> retrying... (0)
  retrying... (1)
  retrying... (2)

  '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">\n<title>404 Not Found</title>\n<h1>Not Found</h1>\n<p>The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again.</p>\n'
```

### Decorator lồng nhau

Bạn có thể áp dụng nhiều decorator cho một chức năng bằng cách xếp chồng chúng lên nhau. Hãy để định nghĩa hai decorator đơn giản và sử dụng cả hai trên một chức năng.

```python
import functools

def greet(func):
    """Greet in English."""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        val = func(*args, **kwargs)
        return "Hello " + val + "!"

    return wrapper

def flare(func):
    """Add flares to the string."""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        val = func(*args, **kwargs)
        return "🎉 " + val + " 🎉"

    return wrapper

@flare
@greet
def getname(name):
    return name

getname("Nafi")
```

```
> '🎉 Hello Nafi! 🎉'
```

##  Khai báo Decorator với ClasD

Lần này, mình sẽ sử dụng một lớp để khai báo một decorator. Các class có thể thuận tiện để tránh kiến trúc lồng nhau trong khi viết decorator. Ngoài ra, nó có thể hữu ích để sử dụng một class trong khi viết stateful decorator. Bạn có thể làm theo mẫu dưới đây để viết decorator với class.

```python
class ClassDeco:
    def __init__(self, function):
        functools.update_wrapper(self, func)
        self.func = func

    def __call__(self, *args, **kwargs):

        # You can add some code before the function call
        val = self.func(*args, **kwargs)
        # You can also add some code after the function call

        return val
```

Hãy để sử dụng mẫu trên để viết một decorator có tên là Emphasis sẽ thêm các thẻ in đậm `<b> </b>` vào kết quả của function.

```python
import functools

class Emphasis:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func

    def __call__(self, *args, **kwargs):
        val = self.func(*args, **kwargs)
        return "<b>" + val + "</b>"

@Emphasis
def hello(name):
    return f"Hello {name}"

print(hello("Nafi"))
print(hello("Redowan"))
```

```
> <b>Hello Nafi</b>
  <b>Hello Redowan</b>
```

Phương thức init() lưu trữ một tham chiếu đến hàm num_calls và có thể thực hiện các khởi tạo cần thiết khác. Phương thức call() sẽ được gọi thay cho hàm decorator. Về cơ bản, nó thực sự giống như hàm Wrapper() trong các ví dụ trước của chúng ta. Lưu ý rằng bạn cần sử dụng hàm funcools.update_wrapper() thay vì @funcools.wraps.

Trước khi tiếp tục, hãy để viết một stateful decorator có thể nhớ trạng thái của lần chạy trước. Ở đây, decorator Tally sẽ theo dõi số lần các chức năng decorate được gọi trong dictionary.

```python
import functools

class Tally:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.tally = {}
        self.n_calls = 0

    def __call__(self, *args, **kwargs):
        self.n_calls += 1
        self.tally[self.func.__name__] = self.n_calls

        print("Callable Tally:", self.tally)
        return self.func(*args, **kwargs)

@Tally
def hello(name):
    return f"Hello {name}!"

print(hello("Redowan"))
print(hello("Nafi"))
```

```
> Callable Tally: {'hello': 1}
  Hello Redowan!
  Callable Tally: {'hello': 2}
  Hello Nafi!
```