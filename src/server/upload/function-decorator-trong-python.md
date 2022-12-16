Python là một ngôn ngữ rất mạnh mẽ, một trong những phần quan trọng nhất của Python đó decorator. Trong ngữ cảnh của design pattern, ta có thể hiểu decorator là những functions thay đổi tính năng của một function, method hay class một cách dynamic, mà không phải sử dụng subclass. Nó rất tiện lợi khi bạn muốn mở rộng tính năng của một function mà bạn không muốn thay đổi nó. Chúng ta có thể implement decorator pattern bất nơi nào, nhưng Python tạo điều kiện cho việc đó bằng cách cung cấp nhưng tính năng và cú pháp vô cùng tiện ích. 

Trong bài viết này, chúng ta sẽ cùng tìm hiểu về Python fucntion decorator, cùng với một loạt các ví dụ để làm sáng tỏ vấn đề.

Về cơ bản, decorator hoạt động như một wrapper, thay đổi hành vi của một đoạn code trước và sau khi một target function được thực thi mà không phải thay đổi chính target function, tăng cường chức năng ban đầu bằng cách decorating nó.

### Mọi thứ trong Python đều là object

Trước khi đi sâu vào tìm hiểu decorator, ta cần ôn lại một vài kiến thức về Python. Trong Python, function cũng là object và chúng ta có thể làm được nhiều thứ với function.

##### Gán cho nó bằng một biến

```python
def greet(name):
    return "hello "+name

greet_someone = greet
print greet_someone("John")

# Outputs: hello John
```

##### Định nghĩa function trong một function khác:

```python
def greet(name):
    def get_message():
        return "Hello "

    result = get_message()+name
    return result

print greet("John")

# Outputs: Hello John
```

##### Function có thể truyền như một tham số đến một function khác

```python
def greet(name):
   return "Hello " + name 

def call_func(func):
    other_name = "John"
    return func(other_name)  

print call_func(greet)

# Outputs: Hello John
```

##### Function có thể trả về một function khác

Nói cách khác function có thể sinh ra một function

```python
def compose_greet_func():
    def get_message():
        return "Hello there!"

    return get_message

greet = compose_greet_func()
print greet()

# Outputs: Hello there!
```

##### Inner function có quyền truy cập đến tài nguyên trong scope nó thuộc về

Thường được biết đến với cái tên là `closure`.

```python
def compose_greet_func(name):
    def get_message():
        return "Hello there " + name + "!"

    return get_message

greet = compose_greet_func("John")
print greet()

# Outputs: Hello there John!
```

### Thành phần của decorator

Function decorator đơn giản là wrapper của một function có sẵn. Kết hợp những tính chất đã được đề cập ở trên lại, chúng ta có thể xây dựng một decorator:

```python
def a_new_decorator(a_func):

    def wrapTheFunction():
        print("I am doing some boring work before executing a_func()")

        a_func()

        print("I am doing some boring work after executing a_func()")

    return wrapTheFunction

def a_function_requiring_decoration():
    print("I am the function which needs some decoration to remove my foul smell")

a_function_requiring_decoration()
#outputs: "I am the function which needs some decoration to remove my foul smell"

a_function_requiring_decoration = a_new_decorator(a_function_requiring_decoration)
#a_function_requiring_decoration được wrap bởi wrapTheFunction

a_function_requiring_decoration()
#outputs:I am doing some boring work before executing a_func()
#        I am the function which needs some decoration to remove my foul smell
#        I am doing some boring work after executing a_func()
```

Chúng ta vừa áp dụng những quy tắc học được từ nãy. Đây chính xác là những gì decorator làm trong Python. Nó wrap một function và thay đổi cách hoạt động của nó

### Python's Decorator Syntax

Python khiến việc tạo và sử dụng decorator trở nên gọn gàng hơn. Để decorate function `a_function_requiring_decoration` chúng ta không cần phải viết `a_function_requiring_decoration = a_new_decorator(a_function_requiring_decoration)` thay vào đó ta có thể viết như sau sử dụng cách viết tắt gọn gàng hơn bằng ký hiệu `@` kèm tên của decorating function phía trên function đang được decorate

```python
@a_new_decorator
def a_function_requiring_decoration():
    """Hey you! Decorate me!"""
    print("I am the function which needs some decoration to "
          "remove my foul smell")

a_function_requiring_decoration()
#outputs: I am doing some boring work before executing a_func()
#         I am the function which needs some decoration to remove my foul smell
#         I am doing some boring work after executing a_func()

#cách viết @a_new_decorator là cách viết tắt thay cho:
a_function_requiring_decoration = a_new_decorator(a_function_requiring_decoration)
```

Nhưng cách viết này nhiều khi lại không như chúng ta mong muốn, sau khi đã decorate function `a_function_requiring_decoration`, chạy đoạn code sau:

```python
print(a_function_requiring_decoration.__name__)
# Output: wrapTheFunction
```

Giờ đây, function của chúng ta đã bị thay thế bởi `wrapTheFunction`. Nó sẽ ghi đè tên và doc string của fucntion đó. Python đã cung cấp một function giải quyết vấn đề này đó là `functool.wraps`. Cùng thay đổi ví dụ trước bằng `functool.wraps`:

```python
from functools import wraps

def a_new_decorator(a_func):
    @wraps(a_func)
    def wrapTheFunction():
        print("I am doing some boring work before executing a_func()")
        a_func()
        print("I am doing some boring work after executing a_func()")
    return wrapTheFunction

@a_new_decorator
def a_function_requiring_decoration():
    """Hey yo! Decorate me!"""
    print("I am the function which needs some decoration to "
          "remove my foul smell")

print(a_function_requiring_decoration.__name__)
# Output: a_function_requiring_decoration
```

*Note: `@wrap` nhận một function sẽ được decorate copy cả function name, doc string, list các tham số,... Nó cho phép truy cập những thuộc tính của function trước khi function được decorate*

Bây giờ chúng ta sẽ cùng áp dụng decorator vào một số use case:

### Use-cases

#### Authorization

Decorators có thể giúp kiểm tra một người đã được ủy quyền để sử dụng một endpoint nào đó trên ứng dụng web. Nó được sử dụng rất rộng rãi trong framework Flask hay Django của Python. Sau đây là một ví dụ xác thực dựa vào việc sử dụng decorator:

```python
from functools import wraps

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            authenticate()
        return f(*args, **kwargs)
    return decorated
```

#### Logging

Logging là một ví dụ khác có thể sử dụng decorator:

```python
from functools import wraps

def logit(func):
    @wraps(func)
    def with_logging(*args, **kwargs):
        print(func.__name__ + " was called")
        return func(*args, **kwargs)
    return with_logging

@logit
def addition_func(x):
   """Do some math."""
   return x + x


result = addition_func(4)
# Output: addition_func was called
```

### Sử dụng decorator với tham số

Nếu chú ý, chúng ta có thể thấy `@wraps` cũng là một decorator, nhưng nó được truyền vào một tham số như những function khác. Khi chúng ta sử dụng cú pháp `@my_decorator`, chúng ta gọi một wrapper fucntion với một function như một tham số. Với Python, tất cả đều là object, kể cả function, chúng ta có thể viết một function trả về một wrapper function.

#### Viết decorator bên trong một function

Quay trở lại với ví dụ về logging và tạo một wrapper cho phép chúng ta định nghĩa một file log output

```python
from functools import wraps

def logit(logfile='out.log'):
    def logging_decorator(func):
        @wraps(func)
        def wrapped_function(*args, **kwargs):
            log_string = func.__name__ + " was called"
            print(log_string)
            # Open the logfile and append
            with open(logfile, 'a') as opened_file:
                # Now we log to the specified logfile
                opened_file.write(log_string + '\n')
        return wrapped_function
    return logging_decorator

@logit()
def myfunc1():
    pass

myfunc1()
# Output: myfunc1 was called

@logit(logfile='func2.log')
def myfunc2():
    pass

myfunc2()
# Output: myfunc2 was called
```

#### Decorator Class

Giờ đây chúng ta đã có logit decorator, nhưng đôi khi trong ứng dụng của chúng ta có một vài thành phần nguy hiểm, và lỗi xảy ra ở những phần đó cần được chú ý đến ngay lập tức khi nó bắt đầu xảy ra. Ví dụ đôi khi chúng ta muốn ghi log ra file, nhưng với những lỗi nghiêm trọng chúng ta muốn gửi mail, nhưng vẫn giữ cả log cho phép theo dõi. Đây là một case chúng ta có thể sử dụng đến kế thừa.

May mắn là với Python, class cũng có thể được sử dụng để build decorator. Chúng ta sẽ xây dựng lại logit class thay vì function.

```python
class logit(object):
    def __init__(self, logfile='out.log'):
        self.logfile = logfile

    def __call__(self, func):
        log_string = func.__name__ + " was called"
        print(log_string)
        
        with open(self.logfile, 'a') as opened_file:
        
            opened_file.write(log_string + '\n')
        # gửi thông báo sau khi log ra file xong
        self.notify()

    def notify(self):
        # đây là class log file thường nên sẽ không implement chức năng gửi mail
        pass
```

Cách implement này nhìn gọn gàng hơn cách viết nested function trả về wrapper function, và cách wrap function với decorator vẫn sử dụng cú pháp như cũ:

```python
@logit()
def myfunc1():
    pass
```

Bây giờ chúng ta có thể kế thừa logit class và thêm chức năng gửi mail bằng cách overwrite hàm `notify`

```python
class email_logit(logit):
    '''
    A logit implementation for sending emails to admins
    when the function is called.
    '''
    def __init__(self, email='admin@myproject.com', *args, **kwargs):
        self.email = email
        super(email_logit, self).__init__(*args, **kwargs)

    def notify(self):
        # Gửi email đến self.email
        pass
```