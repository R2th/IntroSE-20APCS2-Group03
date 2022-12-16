Khi bắt đầu với ngôn ngữ python, chắc điều gầy khó hiểu nhất chính là trước mỗi funtiong thường xuất hiện ký tự @ với một cái tên nào đó.
Đó chính là decorator trong python.
Dưới đây là những ví dụ về functions trong python cái mà được sử dụng để hiểu về decorator functions.
1. Trong python, chúng ta có thể định nghĩa một hàm bên trong một hàm khác.
2. Trong python, một hàm có thể được coi như là một tham số của một hàm khác (một hàm có thể cũng có thể trả lại một hàm).

```
# một hàm có thể được định nghĩa bên trong hàm khác
# một hàm có thể là một coi là một tham số của hàm khác
 
def messageWithWelcome(str):
 
    # Nested function
    def addWelcome():
        return "Welcome to "
 
    # Return concatenation of addWelcome() and str.
    return  addWelcome() + str
 
# To get site name to which welcome is added
def site(site_name):
    return site_name
 
print messageWithWelcome(site("GeeksforGeeks"))
```
Output:
```
Welcome to GeeksforGeeks
```

### Function Decorator
Một decorator là một hàm lấy hàm làm tham số duy nhất và trả về một hàm. Điều này rất hữu ích, giống như một lớp vỏ bọc, nó làm thay đổi hành vi của code trước và sau khi gọi hàm chính. Ví dụ trên có thể được viết lại.
Chúng ta sử dụng @func_name để chỉ rõ một decorator được áp dụng trên một hàm khác.
```
def decorate_message(fun):
 
    # Nested function
    def addWelcome(site_name):
        return "Welcome to " + fun(site_name)
 
    # Decorator returns a function
    return addWelcome
 
@decorate_message
def site(site_name):
    return site_name;
  
print site("GeeksforGeeks")
```
Output:
```
Welcome to GeeksforGeeks
```

Decorator có thể cũng được sử dụng để đính kèm dữ liệu (hoặc thêm attribute) cho hàm.
```
# A decorator function to attach
# data to func
def attach_data(func):
       func.data = 3
       return func
 
@attach_data
def add (x, y):
       return x + y
# This call is equivalent to attach_data()
# with add() as parameter
print(add(2, 3))
 
print(add.data)
```
"add()" trả lại tổng của x và y được chuyển thành đối số nhưng it được bọc bởi decorator function, gọi add(2,3) chỉ đơn giản là gọi tổng của hai số nhưng khi chúng ta gọi thêm add.data sau đó "add" function được truyền vào sau đó decorator function "attach_data" như là đối số và hàm này trả về "add" function với một ttribute "data", cái được set là 3 và in nó.

Note: 
- Hàm được đĩnh nghĩa bên trong decorator và hàm được truyền vào phải có tham số phù hợp
- Một hàm có thể dùng nhiều decorator cùng lúc.

### Conclusion
Python decorator là một công cụ mạnh mẽ để loại bỏ dư thừa, cho phép tái sử dụng code. Mở rộng các hàm hoặc lớp mà không cần thay đổi code có sẵn.

Nguồn: https://www.geeksforgeeks.org/function-decorators-in-python-set-1-introduction/