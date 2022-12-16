Trong bài viết lần này, chúng ta sẽ cùng nhau làm quen với một ngôn ngữ đang rất phổ biến hiện nay, Python. Chúng ta sẽ đi ngay vô phần setup môi trường thay vì giới thiệu các thông tin liên quan. Và chúng ta sẽ mượn framework Django để dẫn qua các khái niệm của Python, như vậy, khi hoàn thành chuỗi bài về làm quen Python này, chúng ta cũng đồng thời làm quen với framework Django. Một mũi tên trúng 2 con nhạn :stuck_out_tongue_winking_eye:

Hệ điều hành mà chúng ta sử dụng là Ubuntu 20.04

# 1. Cài đặt python

Ubuntu 20.04 đã kèm sẵn trong nó python. Chạy `python3 --version` để kiểm tra version hiện tại của python. Trên máy mình là `Python 3.8.2`

Tiếp theo, cài đặt [python3-venv](https://packaging.python.org/guides/installing-using-linux-tools/)

```
sudo apt install python3-venv
```

Tạo một folder `work` trên desktop, sau đó `cd work`. Sau đó, chúng ta sẽ tạo một môi trường ảo, ([virtual environment](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments)), tất cả các package sẽ được cài đặt vào đây. [See](https://packaging.python.org/tutorials/installing-packages/#id16)

```
python3 -m venv venv
```

[venv](https://docs.python.org/3/library/venv.html) là gì? tại sao chúng ta cần sử dụng venv?
venv cho phép các Python packages được cài đặt "local", thay vì cài đặt "global". Với các bạn từng lập trình NodeJS, thì sử dụng venv cũng tương tự việc chúng ta không thêm `-g` khi cài đặt `npm install packageA`. Sau đó, chúng ta sẽ kích hoạt môi trường ảo này bằng cách chạy câu lệnh:

```
source venv/bin/activate
```
Để kiểm tra, ta có thể chạy lệnh:
```
$ python --version
Python 3.8.2
$ pip --version
pip 20.0.2
```
Tiếp theo, chúng ta sẽ cài Django bằng câu lệnh
```
pip install Django==3.1
```
Lưu ý là không có [--user](https://pip.pypa.io/en/stable/user_guide/#user-installs)

Sau khi cài đặt xong, trong thư mục `bin` sẽ có một file `django-admin`. Chúng ta sẽ tạo một django project mới sử dụng câu lệnh:

```
 $ django-admin startproject mysite
```

Câu lệnh này sẽ tạo cho chúng ta một thư mục có các files như sau:
```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

Tiếp theo chúng ta sẽ tạo app. Trong Django có sự khác biệt giữa project và app, Django tư duy theo hướng mỗi một project sẽ bao gồm nhiều app và mỗi app là một web application, thực hiện một tính năng chức năng nào đó, vị dụ như poll app. Một app thì có thể thuộc về nhiều project và một project có thể chứa nhiều app. Tạo app:

```
$ python manage.py startapp polls
```

Một thư mục polls sẽ được tạo ra có cấu trúc :

```
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

Về bản chất, thì một app thật chất là một python [package](https://docs.python.org/3/tutorial/modules.html#tut-packages), file `__init__.py` bắt buộc phải có để Python xác định một folder là một package. Nhưng trước khi tìm hiểu về python package, chúng ta sẽ còn nhau tìm hiểu xem python module là gì.

# 2. Python module là gì?
Thông thường một project được cấu thành bởi tập hợp của rất nhiều file code, hay nói cách khác là chúng ta viết code trong rất nhiều file. Việc chia nhỏ source code ra nhiều file và đặt cho từng file một tên gọi phản ánh công việc mà các dòng code trong file đó thực hiện sẽ giúp quá trình maintain đỡ vất vả. 

Mỗi ngôn ngữ lập trình sẽ có các cơ chế khác nhau cho việc hỗ trợ chia nhỏ source code ra nhiều file. Trong Python, mỗi một file như vậy được gọi là một **Module**. 

> A module is a file containing Python definitions and statements. The file name is the module name with the suffix `.py` appended.

Như vậy một python module chỉ đơn giản là một file có phần extension là `py`. Và bên trong nó sẽ chứa code python. 

Để sử dụng code từ một module ở một module khác. Ta dùng câu lệnh `import`.  Trong Python, không bắt buộc các câu lệnh **import** phải đặt tất cả ở đầu file. Ví dụ:
```
>>> import fibo
>>> fibo.fib(1000)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
>>> fibo.fib2(100)
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
>>> fibo.__name__
'fibo'
```

> Each module has its own private symbol table, which is used as the global symbol table by all functions defined in the module.

Ở các ngôn ngữ lập trình khác, ta sử dụng khái niệm **scope** để chỉ phạm vi tồn tại của các hàm và biến. Trong Python, các tài liệu đề cập với nó với tên gọi **symbol table**. Như nội dung documentation mô tả, thì mỗi một module sẽ có một **private** symbol table. Nghĩa là các biến và hàm trong một module sẽ được "scoped" lại, đều này có nghĩa, ở hai module khác nhau, thì các biến và hàm sẽ vẫn có thể được đặt trùng tên.

> There is a variant of the import statement that imports names from a module directly into the importing module’s symbol table.

Có nhiều cách để `import` một module vào một module khác, ví dụ, thay vì `import` module name rồi sau đó dùng `modname.func` hay `modname.itemname` để gọi tới các hàm và biến. Ta có thể mang trực tiếp các tên hàm và biến đó vào thẳng symbol table của module đang được sử dụng:

```
>>> from fibo import fib, fib2
>>> fib(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

Import như này, chúng ta sẽ không có biến `fibo` để gọi các thành phần của module fibo. Mà thay vào đó, ta sẽ có hai hàm thuộc fibo, đó là fib và fib2. Từ đây chúng ta có thể sử dụng trực tiếp chúng.

Một dạng import khác là import toàn bộ `names` trong một module vào module hiện tại:

```
>>> from fibo import *
>>> fib(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

Tất cả các biến và hàm trong module fibo sẽ được import vào module hiện hành, trừ các biến và hàm bắt đầu bằng ký tự `_`
Tuy đây là một tính năng được hỗ trợ, phần đông dev không sử dụng nó vì nó rất khó quản lý, sẽ có nhiều thứ ẩn đi mà ta không biết nó có tồn tại. Tuy nhiên, nó lại hữu ích trong `interactive mode`, khi mà ta không muốn phải gõ quá nhiều.

Ta có thể đặt lên tên của module được import, như sau:

```
>>> import fibo as fib
>>> fib.fib(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

Tương tự cho câu lệnh `from`

```
>>> from fibo import fib as fibonacci
>>> fibonacci(500)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

#  3. Python package

(to be continue...)