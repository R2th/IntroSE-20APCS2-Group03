Chào các bạn trong bài viết này, mình sẽ giới thiệu với các bạn về  Từ khóa Global trong  Python.Mình sẽ giải thích cho các bạn hiểu về khái niệm của chúng là gì, cú pháp và cách xử dụng của chúng. Các bạn cùng tìm hiểu trong bài viết của mình nhé!



###  Từ khóa Global là gì.

Trong Python, từ khóa `Global` cho phép bạn sửa đổi biến bên ngoài phạm vi hiện tại. Nó được sử dụng để tạo một biến toàn cục và thực hiện các thay đổi đối với biến đó trong ngữ cảnh cục bộ.


----

###  Những quy tắc của từ khóa Global .

Các quy tắc cơ bản cho từ khóa  `Global` trong Python là:

* Khi  ta tạo một biến bên trong một hàm, nó sẽ là cục bộ theo mặc định.
* Khi chúng ta xác định một biến bên ngoài một hàm, nó là toàn cục theo mặc định. Bạn không cần phải sử dụng từ khóa`Global`.
* Ta sẽ sử dụng từ khóa `Global` để đọc và ghi một biến toàn cục bên trong một hàm.
*  Lưu ý việc sử dụng từ khóa `Global`  bên ngoài một hàm  sẽ không có tác dụng nhé.

----

###  Sử dụng từ khóa  Global.

Mình sẽ có một vài  ví dụ.

##### Ví dụ 1: Truy cập biến `Global` từ bên trong một hàm
``` html
c = 1 # global variable

def add():
    print(c)

add()
```
Khi mình  chạy chương trình trên, kết quả đầu ra sẽ là:

``` html
1
```


Tuy nhiên, chúng ta có thể gặp một số trường hợp cần sửa đổi biến toàn cục từ bên trong một hàm.

----


##### Ví dụ 2: Sửa đổi biến toàn cục từ bên trong hàm

``` html
c = 1 # global variable
    
def add():
    c = c + 2 # increment c by 2
    print(c)

add()
```

Khi  mình chạy chương trình trên, sẽ sảy ra lỗi:

``` html
UnboundLocalError: local variable 'c' referenced before assignment
```

Điều này là do  ta chỉ có thể truy cập biến toàn cục nhưng không thể sửa đổi nó từ bên trong hàm.
Nên giải pháp được đưa ra sẽ là mình sẽ sử dùng từ khóa `Global`.

----

### Biến Global trong các mô-đun Python

Trong Python,ta sẽ  tạo một mô-đun `config.py` để chứa các biến `Global` và chia sẻ thông tin trên các mô-đun Python trong cùng một program.

Đây là cách mà   ta có thể chia sẻ các biến`Global` trên các mô-đun python.

##### Ví dụ 3: Chia sẻ một biến  Global qua các mô-đun Python

Tạo 1 file  `config.py` để lưu trữ các biến `Global`.

``` html
a = 0
b = "empty"
```

Tạo 1 file  `update.py` để thay đổi các biến `Global`.

``` html
import config

config.a = 10
config.b = "alphabet"
```

Tạo 1 file  `main.py`để kiểm tra các thay đổi về giá trị

``` html
10
alphabet
```

Ở trên,  ta  đã tạo ba file: `config.py`, `update.py` và `main.py`.

Mô-đun `config.py` lưu trữ các biến Global của `a` và `b`.Trong file `update.py`,  ta import  mô-đun `config.py` và sửa đổi các giá trị của `a` và `b`. Tương tự, trong file `main.py`,  ta import  cả mô-đun `config.py` và `update.py`.Cuối cùng  ta  in và kiểm tra các giá trị của các biến `Global` xem chúng có bị thay đổi hay không.

----

#### Kết Luận
Dưới đây mình đã giới thiệu với các bạn về `Từ khóa Global` khái niệm, các xử dụng và một số ví dụ sử dụng Từ khóa Global trong Python. Hi vọng các bạn thích bài viết này.
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://www.programiz.com/python-programming/global-keyword