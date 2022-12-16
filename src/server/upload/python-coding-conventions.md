Coding Conventions: Thời còn là sinh viên mình cũng đã từng được nghe qua khái niệm này từ các **tiền bối**, mình hiểu nôm na nó là những quy tắc khi code và mình cũng không quá quan tâm đến nó vì lúc đó mình chỉ nghĩ đơn giản là: Project mình làm chỉ phục vụ cho việc qua môn nên là `My code - my rules. Chấm hết`. Cho đến khi mình bắt đầu đi làm, thì việc đầu tiên tuân thủ `coding conventions` này là bắt buộc và mình đã vô cùng **ngại** khi `pull request` nào của mình cũng bị các **tiền bối** comments rằng **em sai convention rồi này**. Về sau, nghĩ kĩ hơn thì mình hiểu được suy nghĩ của các anh/chị đó là *Ừ thì chú code được đấy nhưng code xấu *** *** !* =)) Tâm sự một chút về những trải nghiệm đầu tiên của mình khi vào môi trường làm việc chuyên nghiệp vậy thôi. Chúng ta cùng đi vào nội dung chính của bài viết hôm nay nhé.

![](https://images.viblo.asia/4de21836-09c5-4902-aee5-c9c719372fda.png)

## 1. Coding Conventions là gì?
Như trên mình cũng đã chia sẻ. `Coding Conventions` là một tập hợp các quy tắc chung khi code ví dụ như: cách tổ chức file, thụt lề, hướng dẫn comment, khai báo biến, quy tắc viết câu lệnh, khoảng trắng, quy tắc đặt tên, nguyên tắc lập trình phần mền, … Các quy tắc lập trình giúp nâng cao hiệu suất làm việc cá nhân từ đó giúp nâng cao hiệu suất làm việc của tập thể. Có một chuẩn rõ ràng sẽ giúp một file code mạch lạc, dễ đọc, dể hiểu và dễ chỉnh sửa.<br>
Tùy thuộc vào ngôn ngữ mà các **Coder** sử dụng sẽ có từng quy chuẩn riêng. Ví dụ: 
- `PHP` follow theo 2 chuẩn: [PSR1](https://www.php-fig.org/psr/psr-1/) và [PSR2](https://www.php-fig.org/psr/psr-2/)
- `Python` follow theo chuẩn: [PEP-8](https://www.python.org/dev/peps/pep-0008/)

## 2. Python và PEP 8 
`PEP 8`, đôi khi được viết là `PEP8` hay `PEP-8`, nhưng nói chung gọi nó là **Pép tám**  là một chuẩn code dùng trong ngôn ngữ lập trình python. Chúng được viết vào năm 2001 bởi Guido van Rossum, Barry Warsaw và Nick Coghlan. Mình sẽ trích dẫn một số quy tắc được quy định trong `PEP 8` như sau:
### 2.1. Naming conventions (quy tắc đặt tên)
Khi những đứa trẻ được sinh ra, một trong những thứ mà ba mẹ chúng quan tâm đầu tiên đến chính là đặt tên cho chúng. Và trong lập trình cũng vậy, từ những class, những function,... hay đến cả từng biến nhỏ chúng ta đều phải đặt tên. Và đặt tên làm sao để cho người khác nhìn vào có thể hiểu được mục đích của từng class, function đó là gì cũng là một quy tắc. <br>
**Các cú pháp thông dụng:**
- Cú pháp lạc đà **(camelCase)**: Từ đầu tiên viết thường và những từ tiếp theo viết hoa chữ cái đầu tiên của mỗi từ. VD: `firstName`, `doSomething`, ...
- Cú phaprs Pascal **(PascalCase)**: Viết hoa chữ cái đầu t iên của mỗi từ. VD: `FirstName`, `MyFirstLover`, ...
- Cú pháp con rắn **(snake_case)**: Tất cả các từ đều viết hoa và ngăn cách nhau bởi dấu gạch dưới " **_** ". VD: `first_name`, `do_something`...
- Ngoài 3 cú pháp trên, chúng ta còn một cú pháp nữa gọi là **UPPER_CASE**: Tất cả các chữ cái đều viết hoa và ngăn cách nhau bởi dấu gạch dưới

Trong `Python`, chúng ta sẽ không sử dụng `camelCase`, mà thay vào đó chúng ta sẽ sử dụng `PascalCase` và `snake_case` cụ thể như dưới đây:
- tên class: đặt theo **PascalCase**, thường là những **cụm danh từ**: `MyFirstClass`.
- tên function: đặt theo **snake_case**, thường là những **động từ** hoặc **cụm động từ**: `calculate_age`, `do_something`.
- tên biến: đặt theo **snake_case**, thường là những **danh từ** hoặc **cụm danh từ**: `age`, `service_provided`.
- tên hằng số: đặt theo **UPPER_CASE**: `ENGLISH`, `PER_PAGE`

**Mình cũng có một vài lưu ý khi đặt tên:**
- Tên bắt buộc phải bắt đầu bằng chữ cái.
- Tên đặt phải có nghĩa, không được đặt tên kiểu viết tắt: `MFClass`, `do_st`, `a`, ...
- Tránh đặt những tên quá chung chung, tối nghĩa:  `calculate`, `name`, ...
### 2.2. Identation (thụt lề, thụt dòng)
Sự thụt lề, hoặc khoảng trắng đầu dòng cực quan trọng trong `Python`. Mức độ thụt dòng của code trong `Python` sẽ xác định được các nhóm các dòng code.
Các quy tắc lùi lề chính được đặt ra bởi PEP 8 như sau:
- Sử dụng 4 khoảng trắng liên tiếp để chỉ ra vị trí thụt lề.
- Ưu tiên khoảng trống hơn các tab.

### 2.3. Code Layout (giao diện code)
![](https://images.viblo.asia/666dbc39-3e7e-4444-9c58-2becd56f46e4.png)


Một giao diện code đẹp có vai trò rất quan trọng đối với khả năng đọc code của bạn. Chúng ta thêm khoảng trắng để cải thiện khả năng đọc code của bạn. Trong PEP 8, một dòng được đề xuất giới hạn bởi 79 kí tự.
#### Blank lines (Dòng trống)
Thêm các khoảng trắng hoặc dòng trống có thể cải thiện đáng kể khả năng đọc code của bạn. Code mà tập trung lại, 1 mạch từ đầu tới cuối thì trông thật là **kinh hoàng** đúng không nào? Hoặc ngược lại, quá nhiều dòng trống trong code của bạn làm cho nó trông rất thưa thớt và người đọc có thể phải scroll nhiều hơn mức cần thiết. Dưới đây là 3 hướng dẫn chính về cách sử dụng `blank line` làm sao cho hợp lí 
##### Các function trong cùng một class cách nhau một dòng trống
```python
class MyClass:
    def do_first_thing(self):
        return True
        
    def do_second_thing(self):
        return True
```
##### Các class, function không cùng một class cách nhau hai dòng trống
```python
class MyFirstClass:
    pass
    

class MySecondClass:
    pass
    

def do_first_thing():
    return True
```
##### Sử dụng các dòng trống bên trong các function để chia thành các blocks code
Trong một function, có thể cúng ta xử lý rất nhiều logic mà không thể tách ra thành các function riêng biệt, vì vậy chúng ta cần thêm một dòng trống để ngăn cách các đoạn code.
```python
def calculate_age(members_list):
    name_list = []
    age_list = []

    for member in members_list:
        name_list.append(member.full_name)
        age_list.append(member.age)
        
    if name_list:
        pass
    else:
        pass
    
    if age_list:
        pass
    else:
        pass
```
#### Tối đa hóa độ dài dòng và ngắt dòng
`PEP 8` gợi ý các dòng nên được giới hạn ở 79 ký tự. Điều này là do nó cho phép bạn có nhiều tệp được mở cạnh nhau để quan sát, đồng thời tránh việc ngắt dòng.

Tất nhiên, việc giữ các câu lệnh có 79 ký tự trở xuống không phải lúc nào cũng có thể. `PEP 8` phác thảo các cách để cho phép các câu lệnh chạy trên một số dòng.
```python
def do_something(arg_one, arg_two
                 arg_three, arg_four):
    return True
```
Hoặc có thể sử dụng dấu gạch chéo để ngắt dòng:
```python
from my_package import first_module, \
    second_module, third_module
```
## 3. Install package 
Trong phần trên, mình đã lấy một số ví dụ về các quy tắc được quy định trong `PEP 8`. Nhưng `PEP 8` chỉ là một style guide, nó không phải là một tool hay library. Chúng ta cũng khó có thể kiểm soát được sự sai sót trong khi code nên việc setup một công cụ format tự đọngo theo chuẩn `PEP 8` là một vấn đề hết sức cần thiết, vì nó sẽ giúp chúng ta:
- Không cần phải ghi nhớ những quy tắc dài dòng hay tốn thời gian review thủ công. Công cụ này sẽ xử lý hầu hết những vấn đề nhỏ đó cho bạn: Báo cáo những chỗ cần chỉnh sửa và có thể format code một cách tự động.
- Giảm thời gian thảo luận những thứ nhỏ nhặt, nhờ đó có thêm thời gian để tập trung vào những việc quan trọng hơn như viết logic xử lý hay tối ưu hóa performance.

### 3.1. Chuẩn bị
Để kiểm tra các tool có thật sự hoạt động thì trước tiên mình sẽ tạo 2 file `.py` như sau:
```main.py
from .sub_main import say_hi, say_hello

import datetime

# Press the green button in the gutter to run the script.
say_hi('huuhai_nguyen')


```
```submain.py
# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

def say_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.

def say_hello(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


```
### 3.2. flake8
`flake8` là một công cụ rất mạnh giúp kiểm tra code của bạn có thực sự tuân thủ chuẩn `PEP 8` hay không.
```python
$ pipenv install flake8
```
Và chúng ta thử kiểm tra xem 2 files trên chúng ta đã vi phạm những quy tắc gì nha:
```python
$ flake8
```
```python
# Output
./sub_main.py:4:80: E501 line too long (98 > 79 characters)
./sub_main.py:10:1: E302 expected 2 blank lines, found 1
./sub_main.py:13:1: W391 blank line at end of file
./main.py:1:1: F401 '.sub_main.say_hello' imported but unused
./main.py:3:1: F401 'datetime' imported but unused
./main.py:7:1: W391 blank line at end of file
```
Và việc của chúng ta giờ đây đơn giản hơn rồi. Hãy xem từng lỗi là gì và sửa lại chúng thôi. :D 

Trước khi sửa lại, chúng ta hãy thử xem lỗi đầu tiên chúng ta gặp phải là gì nhé. Đó là lỗi "ký tự trên 1 dòng đã vượt quá 79". Tùy vào từng dự án chúng ta có thể quy định cho một số lỗi tương tự như vậy trong file `setup.cfg`. Chúng ta có thể quy định lại một số quy tắc cho các tool để chúng có thể chạy mượt mà hơn. Chẳng hạn ở đây mình sẽ cho phép nhiều hơn 79 ký tự trên 1 dòng khi check bằng `flake8`:
```python
[flake8]
max-line-length = 119
```
Và chúng ta hãy cùng kiểm tra lại một lần nữa:
```python
# Output 
./sub_main.py:10:1: E302 expected 2 blank lines, found 1
./sub_main.py:13:1: W391 blank line at end of file
./main.py:1:1: F401 '.sub_main.say_hello' imported but unused
./main.py:3:1: F401 'datetime' imported but unused
./main.py:7:1: W391 blank line at end of file
```
Như vậy, lỗi quá ký tự trên 1 dòng đã biến mất. Ngoài ra, các bạn cũng có thể tự định nghĩa lại một số quy tắc cho dự án của mình bằng cách tham khảo ở [đây](https://flake8.pycqa.org/en/latest/user/configuration.html) nhé.
### 3.3. isort
Trong `Python` thứ tự import thường được sử dụng nhất đó là: 
- Built-in packages
- 3rd packages
- Local packages

Và `isort` là một package giúp chúng ta kiểm tra các biểu thức import trong các file `python` và có thể giúp chúng ta luôn việc sắp xếp lại chúng theo các loại import khác nhau.
```python
$ pipenv install 
```
Tương tự như flake8, chúng ta cũng kiểm tra xem đang gặp lỗi import ra sao nhé?
```python
$ pipenv run isort . -c
```
```python
# Output
ERROR: /coding_convention/main.py Imports are incorrectly sorted and/or formatted.
```
Chúng ta thấy, ở file `main.py` chúng ta đã import sai thứ tự ở đâu đó rồi phải không. Và xử lý việc này cũng rất đơn giản.
```python
$ pipenv run isort .
```
và kiểm tra lại 
```python
$ pipenv run isort . -c
```
Như vậy, lỗi import này đã được xử lý hoàn toàn gọn gàng.

### Lời kết 
Bài viết của mình hôm nay dừng lại ở đây thôi, cảm ơn các bạn đã đọc và ủng hộ mình.