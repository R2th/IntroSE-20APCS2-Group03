Chào các bạn Trong bài  này, mình sẽ giới thiệu có các bạn về khái niệm Đối số trong Python. Các bạn cùng tìm hiểu trong bài viết của mình nhé!


----


####  Khái niệm Đối Số

Trong Python, bạn có thể định nghĩa một hàm có số lượng đối số thay đổi.Chúng ta đã hiểu  về cách xác định một hàm và gọi nó. Nếu không, lệnh gọi hàm sẽ dẫn đến lỗi. Đây là một ví dụ.

``` html
def greet(name, msg):
    """This function greets to
    the person with the provided message"""
    print("Hello", name + ', ' + msg)

greet("Monica", "Good morning!")
```

Kết quả :

``` html
Hello Monica, Good morning!
```
Ở ví dụ trên hàm `greet()` có 2 tham số.

Ví ta đã call hàm này và có truyền vào 2 tham số nên hàm đã chạy chính xác và không gặp lỗi.

Nếu như ta call hàm này mà truyền vào thiếu một tham số hoặc không truyền vào tham số nào. Thì nó sẽ sảy ra lỗi. Khi hàm được định nghĩa có bao nhiêu tham số thì khi call hàm ta cần truyền vào đủ các tham số đó. 

Dưới đây là ví dụ thông báo lỗi khi ta call hàm mà truyền thiếu tham số :
 
 Lỗi khi call hàm `greet` mà truyền thiếu 1 tham số :
 
``` html
>>> greet("Monica")    # only one argument
TypeError: greet() missing 1 required positional argument: 'msg'
```

 Lỗi khi call hàm `greet` mà không truyền tham số :
 
 ``` html
>>> greet()    # no arguments
TypeError: greet() missing 2 required positional arguments: 'name' and 'msg'
```

----


#### Các biến của hàm  Đối Số trong Python

Trong Python, có nhiều cách khác  nhau để định nghĩa một hàm có thể nhận số lượng đối số thay đổi.

Dưới đây mình sẽ nêu ra 3 cách khác nhau để định nghĩa nhé :D :


##### Đối số mặc định trong Python

Các đối số của hàm sẽ  có giá trị mặc định trong Python.

 Ta  có thể cung cấp giá trị mặc định cho một đối số bằng cách sử dụng toán tử gán `(=)`. Đây là một ví dụ:
 

 ``` html
def greet(name, msg="Good morning!"):
    """
    This function greets to
    the person with the
    provided message.

    If the message is not provided,
    it defaults to "Good
    morning!"
    """

    print("Hello", name + ', ' + msg)


greet("Kate")
greet("Bruce", "How do you do?")
```

Kết quả :

 ``` html
Hello Kate, Good morning!
Hello Bruce, How do you do?
```

Ở ví dụ trên thì tham số `name` sẽ không có giá trị mặc định và khi call function thì cần bắt buộc phải truyền tham số name vào function.

Ngược lại với tham số `msg` đã luôn được gán giá trí mặc định là `"Good morning!"`. Vì vậy nếu như khi call function chúng ta có thể truyền tham số `msg`. Nếu ta truyền tham số vào thì `msg` sẽ có value là giá trí chúng ta truyền vào. Nếu chúng ta không truyền tham số thì giá trị của `msg` mặc định sẽ luôn là `"Good morning!"`. Tức là với function này thì `msg` sẽ là tham số không bắt buộc.



----

##### Đối số từ khóa trong Python

Khi chúng ta gọi một hàm với một số giá trị, các giá trị này được gán cho các đối số theo vị trí của chúng.

Ví dụ khi chúng ta gọi hàm `greet()` với cách gọi các tham số `greet("Bruce", "How do you do?")` . thì giá trị `Bruce` sẽ tương ứng với với đối số `name` và `"How do you do?"` sẽ là của đối số `msg`.

Python cho phép các hàm được gọi bằng cách sử dụng các đối số từ khóa. Khi chúng ta gọi các hàm theo cách này, thứ tự (vị trí) của các đối số có thể bị thay đổi. Các lệnh gọi sau đến hàm `greet()` ở trên  đều hợp lệ và tạo ra cùng một kết quả.

 ``` html
# 2 keyword arguments
greet(name = "Bruce",msg = "How do you do?")

# 2 keyword arguments (out of order)
greet(msg = "How do you do?",name = "Bruce") 

1 positional, 1 keyword argument
greet("Bruce", msg = "How do you do?")   
```

Như chúng ta thấy, chúng ta có thể thay đổi  các đối số vị trí với các đối số từ khóa trong khi gọi hàm. Nhưng chúng ta phải lưu ý rằng các đối số từ khóa phải tuân theo các đối số vị trí.


Có một đối số vị trí sau các đối số từ khóa sẽ dẫn đến lỗi. Ví dụ:

 ``` html
greet(name="Bruce","How do you do?")
```

Kết quả lỗi trả về :

 ``` html
SyntaxError: non-keyword arg after keyword arg
```


----


##### Đối số tùy chọn trong Python

Có những trường hợp chúng ta có thể sẽ chưa biết trước được số lướng đối số sẽ truyền vào một hàm là bao nhiều. Với trường hợp này Python sẽ cho chúng ta 1 giải pháp đó là gọi hàm với số lượng đối số tùy chọn.

Trong khi định  nghĩa hàm, chúng ta sẽ  sử dụng dấu hoa thị `(*)` trước tên tham số để biểu thị loại đối số này. Đây là một ví dụ.

 ``` html
def greet(*names):
    """This function greets all
    the person in the names tuple."""

    # names is a tuple with arguments
    for name in names:
        print("Hello", name)


greet("Monica", "Luke", "Steve", "John")
```

Kết quả :

 ``` html
Hello Monica
Hello Luke
Hello Steve
Hello John
```

Ở ví dụ trên chúng ta đã gọi hàm với nhiều đối số. Các đối này được gói lại thành một bộ giá trị trước khi truyền vào hàm.Bên trong hàm, chúng ta sử dụng vòng lặp for để lấy lại tất cả các đối số.

----

#### Kết Luận
Dưới đây mình đã giới thiệu với các bạn về khái niệm của Đối Số trong Python
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://www.programiz.com/python-programming/object-oriented-programming