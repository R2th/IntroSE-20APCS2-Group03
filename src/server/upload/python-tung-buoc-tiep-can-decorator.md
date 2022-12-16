##### Khi làm việc với `Python`, chúng ta thường gặp rất nhiều function `@` trước khi định nghĩa một hàm hay 1 class. Đây là 1 feature đặc biệt của Python. Nên mình và các bạn cùng nhau hiểu để rõ hơn về nó nha :grin:
![](https://images.viblo.asia/a37dafb0-c6c3-46c5-84a4-5d2bb9623ad3.png)
Nhưng trước tiên, chúng ta hãy cùng quay lại và bắt đầu từ những Function của Python. 
## 1. Function
Một function trong `Python` được định nghĩa như sau:
```python
def function_name(name):
    return 'My name is %s' % name
```
Function trên lấy `name` làm giá trị đầu vào và trả về một string. Trong đó:
- `def` là từ khóa được sử dụng để định nghĩa một hàm.
- `function_name` là tên của function.
- Biến trong dấu ngoặc đơn `(name)` là đối số bắt buộc cho function.
- Những dòng tiếp theo ở trong là nội dung hoặc định nghĩa của function.
## 2. Tính chất của `function`
Trong `Python`, các function được coi như là các đối tượng first-class. Điều này có nghĩa là Python coi 1 function là 1 value. Chúng ta có thể gán một function cho một biến, chuyển nó làm đối số cho một function khác hoặc trả về nó dưới dạng value từ một function khác.<br>
Nói thì có vẻ dài dòng thì mình cùng lấy 1 ví dụ nha.
```python
def say_hello():
    print('Hello world!')
```
Ở đây chúng ta định nghĩa một function `say_hello'`. Giờ thì chúng ta có thể gán giá trị cho nó.
```python
>>> say_hi = say_hello
```
Giờ đây, chúng ta có thể gọi đến `say_hi` giống như function `say_hello`.
```python
>>> say_hi()
Hello world!
```
Chúng ta cũng có thể truyền một function cho một function khác như một đối số.
```python
def execute(func):
    print('Before execution')
    func()
    print('After execution')
```
Vì vậy, khi chúng ta chuyển function `say_hello` để chạy, kết quả đầu ra sẽ được như sau:
```python
>>> execute(say_hello)
Before execution
Hello world!
After execution
```
`Python` cũng hỗ trợ chúng ta trong việc lồng các functions. Nó có nghĩa là chúng ta có thể định nghĩa một function trong body hoặc định nghĩa một function khác. Chúng ta cùng lấy 1 ví dụ khác cho điều này:
```python
def foo(x):
    def bar(y):
        return x+y
    return bar
```
Ở ví dụ trên, mình đã sử dụng 2 khái niệm được nói ở trên:
- Trả về một function (`bar`) dưới dạng value trả về của function `foo`.
- Lồng function `bar` trong định nghĩa của function `foo`. 

Giờ chúng ta cùng chạy đoạn code trên nha.
```python 
>>> v1 = foo(3)
```
Ở đây, `v1` lưu trữ value trả về của function `foo`, tức là function `bar`. Điều gì sẽ xảy ra nếu chúng ta gọi `v1` với một vài tham số?
```python
>>> print(v1(7))
10
```
Khi một function được xử lý dưới dạng data (trong trường hợp này là trả về dưới dạng value từ một function khác), nó ngầm mang thông tin cần thiết để thực thi. Điều này được gọi là tính đóng gói (closure) trong Python.  Chúng ta có thể kiểm tra việc đóng gói của function bằng cách sử dụng thuộc tính `__closure__` của function. Nó sẽ trả về cho chúng ta một `tuple` chứa tất cả các closures của function đó. Nếu chúng ta muốn xem bất kỳ nội dung nào của closure, chúng ta có thể làm như dưới đây.
```python
>>> v1.__closure__
(<cell at 0x7f517bcc5d30: int object at 0xb010e0>,)
>>> v1.__closure__[0].cell_contents
3
```
Chúng ta đã biết được cả 2 thuộc tính của function, hãy xem chúng ta có thể sử dụng các thuộc tính này trong các tình huống thực tế nha.<br>Giả sử chúng ta muốn thực hiện một số chức năng chung trước hoặc sau khi thực hiện function. Nó có thể giống như một lệnh hiển thị thời gian thực hiện của function chẳng hạn.
<br><br>Một cách dễ dàng để làm điều này là viết bất kì điều gì trước và sau khi thực hiện dưới dạng các dòng code trước và sau tương ứng. Ví dụ:
```python
def say_hello():
    print('Before execution')
    print('Hello world!')
    print('After execution')
```
Nhưng đây có thực sự là một cách tốt để thực hiện? Như mình nói ở trên, đây là một chức năng chung nên điều gì sẽ xảy ra nếu chúng ta nhiều hơn 1 function và chúng ta phải thực hiện cùng một đoạn code cho tất cả function khác?
```python
def say_hello():
    print('Hello world')
    
   
def say(func):
    def hello(*args, **kwargs):
        print('Before execution')
        execute = func(*args, **kwargs)
        print('After execution')
        return execute
    return hello
```
Function `say_hello` chỉ in ra `Hello world`. Còn function `say` nhận một function làm đối số và tạo ra một function khác là `hello` trong định nghĩa của nó. `hello` thực hiện một số câu lệnh in trước và sau khi thực hiện function được truyền vào dưới dạng đối số cho `say`.<br>
Giờ chúng ta truyền function `say_hello` vào trong `say` nha.
```python
>>> new_say_hello = say(say_hello)
```
`new_say_hello` là một function khác được return từ function `say`. Vậy thì output của function `new_say_hello` sẽ như thế nào? Let's check it.
```python
>>> new_say_hello()
Before execution
Hello world
After execution
```
Và điều  gì sẽ xảy ra nếu chúng ta nếu chúng ta gán lại hàm mới được trả về từ function `say` cho function `say_hello`?
```python
>>> say_hello = say(say_hello)
>>> say_hello()
Before execution
Hello world
After execution
```
Chúng ta đã thay đổi chức năng của của function `say_hello` mà không thay đổi đoạn code của chính function này. <br>
Vậy tiếp theo sẽ là gì? Nếu đã đọc đến đây, thì chúng ta đã tìm hiểu xong về bản chất của `decorator` rồi đó. Mình sẽ giải thích thêm nha.
## 3. Decorator
`decorator` là function cho phép chúng ta có thể tự do mở rộng hoặc chỉnh sửa function một cách linh hoạt mà không cần thực hiện thay đổi code ban đầu của nó. <br>
Trong ví dụ tren, hàm `say` cung cấp cho chúng ta chức năng này (nó thay đổi output của hàm `say_hello`). Vì vậy, `say` được gọi là `decorator`. Thay vì truyền thẳng `say_hello` đến `say`, chúng ta có thể viết tắt:
```python
@say
def say_hello():
    print('Hello world')
```
Mình hy vọng các bạn đã hiểu được `decorator` là gì. Có khi nào bạn tự hỏi tại sao chúng ta cần return một function từ `say`? Mà chúng ta chỉ cần gọi function `say`, trong đó chúng ta có thể in các dòng lệnh cùng với việc thực hiện function đối số? 
```python
def say_1(func):
    print('Before execution')
    func()
    print('After execution')
```
Giả sử, mình đồng ý với gợi ý này. Nhưng mình cũng có một vài câu hỏi:
- Giờ đây, `say_hello` sẽ lưu giá trị là gì? Nó có thể gọi luôn được không?.

=> `say_hello` sẽ lưu giá trị None là giá trị trả về cho `say_1`. Nên chúng ta không thể gọi `say_hello` ngay lập tức.
-  Điều gì sẽ xảy ra nếu chúng ta muốn mở rộng một function có một vài đối số như dưới đây:
```python
def say_2(func, arg1, arg2):
    print('Before execution')
    func(arg1, arg2)
    print('After execution')
```
Nhưng vấn đề ở đây là: làm thế nào để nhận được giá trị của `arg1` và `arg2` tại thời điểm truyền bất kỳ function nào tới `say_2`?
```python
>>> say_hello = say_2(say_hello, arg1, arg2)
```
Ở đây, chúng ta không thể lấy được giá trị của `arg1` và `arg2`. <br>
Mình hy vọng 2 câu hỏi này có thể giải thích được tại sao `decorator` cần phải return một function.
## 4. Một vài ví dụ về `decorator`
- Tính thời gian thực hiện một function:
```python
def compute_execution_time(func):
    def compute(*args, **kwargs):
        start_time = time.time()
        response = func(*args, **kwargs)
        end_time = time.time()
        print(end_time - start_time)
        return response
    return compute
 ```
 - Hoặc trong một ứng dụng web, nó có thể sử dụng để kiểm tra user đã login hay chưa:
```python
def login_required(func):
    def check_login(request, *args, **kwargs):
        if request.user.is_authenticated():
            return func(request, *args, **kwargs)
        else:
            return redirect('/login')
    return check_login
```

## 5. Lời kết
Cảm ơn các bạn đã đọc đến đây. Mình hy vọng bài viết này có thể cung cấp những kiến thức cơ bản nhất về `decorator` trong Python và một số trường hợp sử dụng. Nếu bạn có một số gợi ý để có thể giúp mọi người tiếp cận đến `decorator` một cách dễ hiểu nhất, hãy comment ở bên dưới nha.


### Related links
- https://www.programiz.com/python-programming/function
- https://dbader.org/blog/python-decorators