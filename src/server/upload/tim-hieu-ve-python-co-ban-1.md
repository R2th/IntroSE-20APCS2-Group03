Python là ngôn ngữ lập trình hướng đối tượng, bậc cao, mạnh mẽ. Nó được tạo bởi Guido van Rossum trong giai đoạn 1985- 1990. Giống như Perl, mã nguồn Python cũng có GNU General Public License (GPL).

## 1. Overview
Python là một ngôn ngữ lập trình thông dịch (interpreted), hướng đối tượng (object-oriented), và là một ngôn ngữ bậc cao (high-level)  ngữ nghĩa động (dynamic semantics). Python hỗ trợ các module và gói (packages), khuyến khích chương trình module hóa và tái sử dụng mã. Trình thông dịch Python và thư viện chuẩn mở rộng có sẵn dưới dạng mã nguồn hoặc dạng nhị phân miễn phí cho tất cả các nền tảng chính và có thể được phân phối tự do.

* Python is Interpreted - Python được trình thông dịch xử lý trong thời gian chạy. Bạn không cần phải biên dịch chương trình của mình trước khi thực hiện nó. Điều này tương tự với PERL và PHP.
* Python is Interactive - Bạn có thể sử dụng các Python prompt để tương tác trực tiếp với trình thông dịch để viết chương trình của bạn.
* Python is Object-Oriented - Python hỗ trợ lập trình hướng đối tượng hoặc kỹ thuật lập trình đóng gói mã trong các đối tượng.
* Python is a Beginner's Language - Python là ngôn ngữ tuyệt vời cho các lập trình viên mới bắt đầu và hỗ trợ phát triển một loạt các ứng dụng từ xử lý văn bản đơn giản đến trình duyệt WWW cho đến các trò chơi.

***Lịch sử của Python***

Python được Guido van Rossum phát triển vào cuối những năm 80 và đầu những năm 90 tại Viện nghiên cứu quốc gia về toán học và khoa học máy tính ở Hà Lan.

Python có nguồn gốc từ nhiều ngôn ngữ khác, bao gồm ABC, Modula-3, C, C ++, Algol-68, SmallTalk và Unix shell và các ngôn ngữ script khác.

Python có bản quyền. Giống như Perl, mã nguồn Python hiện có sẵn theo Giấy phép Công cộng GNU (GPL).

Python hiện được duy trì bởi một nhóm phát triển cốt lõi tại viện, mặc dù Guido van Rossum vẫn giữ một vai trò quan trọng trong việc chỉ đạo tiến trình của nó.

***Python Features***

Cú pháp rất tường minh, dễ đọc.

Các khả năng tự xét mạnh mẽ.

Hướng đối tượng trực giác.

Cách thể hiện tự nhiên mã thủ tục.

Hoàn toàn mô-đun hóa, hỗ trợ các gói theo cấp bậc.

Xử lý lỗi dựa theo ngoại lệ.

Kiểu dữ liệu động ở mức rất cao.

Các thư viện chuẩn và các mô-đun ngoài bao quát hầu như mọi việc.

Phần mở rộng và mô-đun dễ dàng viết trong C, C++.

Có thể nhúng trong ứng dụng như một giao diện kịch bản (scripting interface).

Python mạnh mẽ và thực hiện rất nhanh.

## 2. Basic Syntax
Ngôn ngữ Python có nhiều điểm tương đồng với Perl, C và Java. Tuy nhiên, có một số khác biệt nhất định giữa các ngôn ngữ.

***Chương trình Python đầu tiên***

*Lập trình chế độ tương tác*

Gọi trình thông dịch mà không chuyển tệp script làm tham số sẽ đưa ra lời nhắc sau:
```
$ python
Python 2.4.3 (#1, Nov 11 2010, 13:34:43)
[GCC 4.1.2 20080704 (Red Hat 4.1.2-48)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Nhập văn bản sau vào dấu nhắc Python và nhấn Enter

```
>>> print "Hello, Python!"
```

Nếu bạn đang chạy phiên bản mới của Python, thì bạn sẽ cần sử dụng câu lệnh in với dấu ngoặc đơn như **print ("Hello, Python!");**. Tuy nhiên, trong phiên bản Python 2.4.3, điều này tạo ra kết quả như sau

```
Hello, Python!
```

*Lập trình chế độ tập lệnh*

Gọi trình thông dịch với tham số tập lệnh bắt đầu thực thi tập lệnh và tiếp tục cho đến khi tập lệnh kết thúc. Khi tập lệnh kết thúc, trình thông dịch không còn hoạt động.

Hãy  viết một chương trình Python đơn giản trong một kịch bản. Các tệp Python có phần mở rộng .py. Nhập mã nguồn sau vào tệp test.py
```
print "Hello, Python!"
```

Bây giờ, hãy thử chạy chương trình này như sau:
```
$ python test.py
```

Kết quả:
```
Hello, Python!
```

Chúng ta hãy thử một cách khác để thực thi một kịch bản Python. Đây là tập tin test.py đã sửa đổi:
```
#!/usr/bin/python

print "Hello, Python!"
```

Chạy chương trình này như sau:

```
$ chmod +x test.py     # This is to make file executable
$./test.py
```

Kết quả:
```
Hello, Python!
```

*Python Identifiers*

Định danh Python là tên được sử dụng để xác định một biến, hàm, lớp, mô-đun hoặc đối tượng khác. Một định danh bắt đầu bằng một chữ cái từ A đến Z hoặc a đến z hoặc dấu gạch dưới (_) theo sau là 0 hoặc nhiều chữ cái, dấu gạch dưới và chữ số (0 đến 9).

Python không cho phép các ký tự dấu chấm câu như @, $ và% trong các định danh. Python là một ngôn ngữ lập trình phân biệt chữ hoa chữ thường. Do đó, **Manpower** và **manpower** là hai định danh khác nhau trong Python.

Quy ước đặt tên cho định danh Python
* Tên class bắt đầu bằng một chữ cái viết hoa. Tất cả các định danh khác bắt đầu bằng một chữ cái viết thường.
* Bắt đầu một định danh với một dấu gạch dưới hàng đầu duy nhất cho biết rằng định danh là private.
* Bắt đầu một định danh với hai dấu gạch dưới hàng đầu cho thấy một định danh private mạnh mẽ.
* Nếu mã định danh cũng kết thúc bằng hai dấu gạch dưới, thì mã định danh là tên đặc biệt do ngôn ngữ xác định.

*Reserved Words*

Danh sách sau đây cho thấy các từ khóa Python. Đây là những từ dành riêng và bạn không thể sử dụng chúng dưới dạng hằng hoặc biến hoặc bất kỳ tên định danh nào khác. Tất cả các từ khóa Python chỉ chứa các chữ cái viết thường.
* and
* exec
* not
* assert
* finally
* or
* break
* for
* pass
* class
* from
* print
* continue
* global
* raise
* def
* if
* return
* del
* import
* try
* elif
* in
* while
* else
* is
* with
* except
* lambda
* yield

*Lines and Indentation*

Python không cung cấp dấu ngoặc để chỉ ra các khối mã cho các định nghĩa lớp và hàm hoặc điều khiển luồng. Các khối mã được biểu thị bằng cách thụt dòng, được thi hành một cách cứng nhắc.

Số lượng khoảng trắng trong thụt đầu dòng có thể thay đổi, nhưng tất cả các câu lệnh trong khối phải được thụt vào cùng một lượng. Ví dụ:
```
if True:
   print "True"
else:
   print "False"
```

Tuy nhiên, khối sau tạo ra lỗi:
```
if True:
print "Answer"
print "True"
else:
print "Answer"
print "False"
```

Do đó, trong Python, tất cả các dòng liên tục được thụt vào với cùng một số khoảng trắng sẽ tạo thành một khối.

*Multi-Line Statements*

Các câu lệnh trong Python thường kết thúc bằng một dòng mới. Tuy nhiên, Python cho phép sử dụng ký tự tiếp tục dòng (\) để biểu thị rằng dòng sẽ tiếp tục. Ví dụ:
```
total = item_one + \
        item_two + \
        item_three
```

Các câu lệnh có trong dấu ngoặc [], {} hoặc () không cần sử dụng ký tự tiếp tục dòng. Ví dụ:

```
days = ['Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday']
```

*Quotation in Python*

Python chấp nhận các trích dẫn đơn ('), double (") và triple (' '' hoặc" "") để biểu thị các chuỗi ký tự, miễn là cùng một loại trích dẫn bắt đầu và kết thúc chuỗi.

Các trích dẫn (""" ) được sử dụng để trải dài chuỗi trên nhiều dòng. Ví dụ:
```
word = 'word'
sentence = "This is a sentence."
paragraph = """This is a paragraph. It is
made up of multiple lines and sentences."""
```

*Comments in Python*

Dấu thăng (#) không nằm trong chuỗi ký tự bắt đầu nhận xét. Tất cả các ký tự sau # và cho đến cuối dòng vật lý là một phần của nhận xét và trình thông dịch Python bỏ qua chúng.

```
#!/usr/bin/python

# First comment
print "Hello, Python!" # second comment
```

Theo sau chuỗi ba trích dẫn cũng bị bỏ qua bởi trình thông dịch Python và có thể được sử dụng như một nhận xét đa dòng:
```
'''
This is a multiline
comment.
'''
```

*Sử dụng dòng trống*

Một dòng chỉ chứa khoảng trắng, có thể có một nhận xét, được gọi là một dòng trống và Python hoàn toàn bỏ qua nó.

Trong phiên phiên dịch tương tác, bạn phải nhập một dòng vật lý trống để chấm dứt câu lệnh đa dòng.

*Chờ người dùng*

Dòng sau của chương trình hiển thị lời nhắc, câu lệnh cho biết Bấm phím Enter để thoát ra khỏi chế độ và chờ người dùng thực hiện hành động.

```
#!/usr/bin/python

raw_input("\n\nPress the enter key to exit.")
```

Ở đây, "\ n \ n" được sử dụng để tạo hai dòng mới trước khi hiển thị dòng thực. Khi người dùng nhấn phím, chương trình kết thúc. Đây là một mẹo hay để giữ cửa sổ giao diện điều khiển mở cho đến khi người dùng hoàn thành với một ứng dụng.

Nguồn tham khảo: [tại đây.](http://www.tutorialspoint.com/python/index.htm)