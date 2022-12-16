Chào các bạn trong bài viết này, mình sẽ giới thiệu với các bạn về cách tùy chỉnh các `Exceptions` trong Python.Mình sẽ giải thích cho các bạn hiểu và cách xử dụng chúng. Các bạn cùng tìm hiểu trong bài viết của mình nhé!

----

Trong bài này mình sẽ hướng dẫn các bạn cách tùy chỉnh các `Exceptions` theo mong muốn của cá nhân các bạn. Mình sẽ đưa ra những ví dụ để các bạn dễ hiểu hơn.

Trong Python đã có sẵn rất nhiều `Exceptions` được tích hợp sẵn.Tuy nhiên đôi khi bạn vẫn cần tạo ra các `Exceptions` của riêng mình để phục vụ mục đích của bạn.

----

####  Tạo Exceptions tùy chỉnh

Trong Python, người dùng có thể xác định các `Exceptions` tùy chỉnh bằng cách tạo mới 1 `Exceptions`. `Exceptions` tạo mới phải được dẫn xuất từ `Exceptions` có sẵn của hệ thống.

``` html
>>> class CustomError(Exception):
...     pass
...

>>> raise CustomError
Traceback (most recent call last):
...
__main__.CustomError

>>> raise CustomError("An error occurred")
Traceback (most recent call last):
...
__main__.CustomError: An error occurred
```

Ở ví dụ trên. Mình đã tạo 1 `Exceptions` có tên là `CustomError` từ `Exceptions` có sẵn. `Exceptions` mới này sẽ raise ra một message thông báo lỗi.

Khi thiết kế một chương trình Python bạn nên đặt tất cả các tất cả các `Exceptions` do người dùng định nghĩa ra một file riêng. Và define file dưới tên gọi `exceptions.py ` hoặc là `errors.py`.

----

####  Ví dụ : `Exception` do người dùng định nghĩa trong Python


Ở trong ví dụ này mình sẽ minh họa các sử dụng `Exception` do người dùng định nghĩa ra trong một chương trình thực tế.

Chương trình này sẽ yêu cầu người dụng nhập một số cho đến khi số mà họ nhập đúng với số mà chúng ta đã định nghĩa sẵn.
Để giúp cho người dùng có thể tìm ra số đó nhanh hơn chúng ra sẽ define ra những message  gợi ý cho họ.

``` html
# define Python user-defined exceptions
class Error(Exception):
    """Base class for other exceptions"""
    pass


class ValueTooSmallError(Error):
    """Raised when the input value is too small"""
    pass


class ValueTooLargeError(Error):
    """Raised when the input value is too large"""
    pass


# you need to guess this number
number = 10

# user guesses a number until he/she gets it right
while True:
    try:
        i_num = int(input("Enter a number: "))
        if i_num < number:
            raise ValueTooSmallError
        elif i_num > number:
            raise ValueTooLargeError
        break
    except ValueTooSmallError:
        print("This value is too small, try again!")
        print()
    except ValueTooLargeError:
        print("This value is too large, try again!")
        print()

print("Congratulations! You guessed it correctly.")
```


Đây là ví dụ khi bạn chạy chương trình trên :


``` html
Enter a number: 12
This value is too large, try again!

Enter a number: 0
This value is too small, try again!

Enter a number: 8
This value is too small, try again!

Enter a number: 10
Congratulations! You guessed it correctly.
```

Chúng ta sẽ định nghĩa 1 call để gọi đến exceptions `Error` được định nghĩa sẵn trong hệ thống.
2 exceptions khác là (`ValueTooSmallError` và `ValueTooLargeError`) mà chương trình trên gọi đều được bắt nguồn từ class `Error`. Đây là một cách thông thường để xác định `exceptions` do người dụng define trong Python. Tuy nhiên bạn vẫn sẽ có những cách khác để tùy chỉnh `exceptions`.


----

####  Tùy chỉnh class Exception

Ta có thêm 1 cách nữa là tùy chỉnh class `Exception` để có thể nhận vào các đối số khác theo mong muốn của chúng ta.

Để tìm hiểu về cách tùy chỉnh các class `Exception` thì bạn cần có kiến thức cơ bản về lập trình Hướng Đối Tượng.

Dưới đây mình có 1 ví dụ :

``` html
class SalaryNotInRangeError(Exception):
    """Exception raised for errors in the input salary.

    Attributes:
        salary -- input salary which caused the error
        message -- explanation of the error
    """

    def __init__(self, salary, message="Salary is not in (5000, 15000) range"):
        self.salary = salary
        self.message = message
        super().__init__(self.message)


salary = int(input("Enter salary amount: "))
if not 5000 < salary < 15000:
    raise SalaryNotInRangeError(salary)
```

Đầu ra của chương trình trên :

``` html
Enter salary amount: 2000
Traceback (most recent call last):
  File "<string>", line 17, in <module>
    raise SalaryNotInRangeError(salary)
__main__.SalaryNotInRangeError: Salary is not in (5000, 15000) range
```


Ở đây chung ta đã ghi đè hàm tạo của class `Exception` để nhận vào 2 param là `salary` và `message`.Sau đó hàm tạo của class  `Exception` cha sẽ được gọi theo cách thủ công với đối số `self.messag` bằng cách sử dụng `super()`.

Thuộc tính `self.salary` sẽ được sử dụng ở dưới.Sau đó, phương thức `__str__` kế thừa của class `Exception` được sử dụng để hiển thị thông báo tương ứng khi `SalaryNotInRangeError` được raise.


Chúng ta cũng có thể tùy chỉnh chính phương thức `__str__ `bằng cách ghi đè nó.


``` html
class SalaryNotInRangeError(Exception):
    """Exception raised for errors in the input salary.

    Attributes:
        salary -- input salary which caused the error
        message -- explanation of the error
    """

    def __init__(self, salary, message="Salary is not in (5000, 15000) range"):
        self.salary = salary
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'{self.salary} -> {self.message}'


salary = int(input("Enter salary amount: "))
if not 5000 < salary < 15000:
    raise SalaryNotInRangeError(salary)
```

Đầu ra của chương trình :

``` html
Enter salary amount: 2000
Traceback (most recent call last):
  File "/home/bsoyuj/Desktop/Untitled-1.py", line 20, in <module>
    raise SalaryNotInRangeError(salary)
__main__.SalaryNotInRangeError: 2000 -> Salary is not in (5000, 15000) range
```

----

#### Kết Luận
Dưới đây mình đã giới thiệu với các bạn cách tùy chỉnh `Exception` trong Python và 1 số ví dụ cụ thể
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://www.programiz.com/python-programming/user-defined-exception