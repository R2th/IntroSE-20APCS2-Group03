Trong bài viết này, mình và các bạn sẽ cùng nhau học và tìm hiểu về Regular expression ( viết tắt là RegExp) - biểu thức chính quy. RegExp đặc biệt phổ biến trong các câu lệnh Unix như `grep` , `find`, `sed`, ... dùng để thao tác với chuỗi một cách mạnh mẽ.  Làm chủ RegExp sẽ giúp bạn đỡ khổ hơn trong việc copy, paste hay replace làm việc với chuỗi văn bản dài vô tận mà ko cần căng người ra làm từng bước một.  Vì phần này tương đôi dài mình sẽ chia thành 2 phần để cho mọi người dễ theo dõi.
Bài viết này bao gồm: phần 1 và 2 là các thao tác cơ bản với chuỗi cũng như là định dạng chuỗi trong python. Bài viêt sau sẽ viết về phần 3 và 4 sẽ tập trung vào regex từ cơ bản đến nâng cao. 
# I. Các thao tác cơ bản với chuỗi.
Mục đích của thao tác với chuỗi là 
- Clearn dataset để chuẩn bị cho các bước tiếp theo như phân tích dữ liệu (EDA), chạy model,..
- Xử lý và lấy ra những dữ liệu cần thiết từ một website để xây dựng bộ dữ liệu

Đâu tiên ta phải hiểu `strings` (chuỗi) là một tập hợp các ký tự đặt trong ngoặc có thể là ngoặc đơn hoặc ngoặc kép.

Các thao tác cơ bản mà bạn có thể quen thuộc như:
- Kiểm tra đồ dài của chuỗi 
    ```python
    my_string = "Awesome day"
    len(my_string)
    # 11
    ```
- Chuyển sang định dạng chuỗi 
    ```python
    srt(123)
    #'123'
    ```
- Kết hợp chuỗi bằng phép toán `+`
    ```python
    my_string1 = "Awesome day"
    my_string2 = "for biking"
    print(my_string1+" "+my_string2)
    # Awesome day for biking
    ```

- Chuyển đổi thành chữ thường
    ```python
    my_string = "tHis Is a niCe StriNg"
    my_string.lower()
    # this is a nice string
    ```
- Chuyển đổi thành chữ hoa: 
    ```python
    my_string.upper()
    # THIS IS A NICE STRING
    ```
- Viết hoa chữ cái đầu tiên
    ```python
    my_string.capitalize()
    # This is a nice string.
    ```
 
 Đến những phép toán cao cấp hơn như sau.
## 1.Splitting 
Chia một chuỗi thành danh sách các chuỗi con, ta có ví dụ sau:
```python
my_string = "This string will be split"
my_string.split(sep=" ", maxsplit=2)
#['This', 'string', 'will be split']
```
Trong câu lệnh `split` có các tham số tùy chọn, 1 là sep ( separator) là ký tự để cắt chuỗi, mặc định là dấu cách, thứ 2 là số lần chia cắt chuỗi mặc định là -1 (tất cả các lần). Phương thức split thì sẽ chia cắt chuỗi từ trái sang phải, một phương thức chia cắt tương tự như chia cắt chuỗi từ phải sang trái là `rsplit`: 
```python
my_string.rsplit(sep=" ", maxsplit=2)
# ['This string will', 'be', 'split']
```

Trong việc xử lý chuỗi, ví dụ là đọc file txt khi in ra ta sẽ thấy các ký tự đặc biêt như `\n` được hiểu là xuống dòng (newline).
```python
my_string = "This string will be split\nin two"
print(my_string)
# This string will be split
# in two
```

Hoặc một ký tự đặc biệt khác là `\r` (nghĩa là carriage return), các ký tự sau `\r` sẽ thay thế các ký tự trước nó, ví dụ:
```python
my_string = "This is a number\r1234"
print(my_string)
#1234 is a number
```

Chia các thành danh sách các chuỗi ký tự con khi gặp ký tự đặc biệt `\n` ta có câu lệnh:
```python
my_string = "This string will be split\nin two"
my_string.splitlines()
# ['This string will be split', 'in two']
```
## 2. Joining

Nối các chuỗi từ một list và một ký tự lặp lại chẽn giữa 2 ký tự đó. Ví dụ
(xóa các ky hiệu)
```python
my_list = ["this", "would", "be", "a", "string"]
print(" ".join(my_list))
# this would be a string
```

## 3. Stripping characters
- Loại bỏ các ký tự đặc biệt bên trái và bên phải của chuỗi ta dùng `.strip()`: 
    ```python
    my_string = " This string will be stripped\n"
    my_string.strip()
    #'This string will be stripped'
    ```
- Loại bỏ các ký tự đặc biện ngoài cùng bên phải ta dùng `rstrip()`:
    ```python
    my_string.rstrip()
    #' This string will be stripped'
    ```
- Loại bỏ các ký tự ngoài cùng bên trái ta dùng `lstrip()`
     ```python
     my_string.lstrip()
     #'This string will be stripped\n'
     ```
     
## 4. Finding substrings
Tìm kiếm một chuỗi con trong một chuỗi cha, ta dùng như sau: 
![](https://images.viblo.asia/17b01bc2-03d7-44c6-8a71-77fe1b667723.png)

Đầu ra của nó sẽ là ví trị đầu tiên bắt đầu chứa chuỗi con đếm từ 0 (nếu có) còn không trả ra -1. Ta cũng có thể xác định ví trí bắt đầu tìm kiếm trong chuỗi.

```python
my_string = "Where's Waldo?"
my_string.find("Waldo")
# 8
my_string.find("Wenda")
#-1
my_string.find("Waldo", 0, 6)
#-1
```
## 5. Counting occurrences
Trả ra số lần xuát hiện của một chuỗi con trong một chuỗi cha bất ký ta dùng câu lệnh sau:
![image.png](https://images.viblo.asia/50b97f22-8f0e-40c8-bd40-7ed32efb6815.png)

Như câu lệnh tìm kiếm, ta có thể chỉ định ví trí bắt đầu và kết thúc đếm chuỗi con.
```python
my_string = "How many fruits do you have in your fruit basket?"
my_string.count("fruit")
# 8
my_string.count("fruit", 0, 16)
# 1
```

## 6.Replacing substrings
Thay thế một chuỗi con bằng một chuỗi con mới, ta cũng có thể chỉ định số lần thay thế (mặc định là thay thế tất cả): 
![image.png](https://images.viblo.asia/9c8c8e14-8e0c-4fb9-ba0c-075db0b550af.png)

```python
my_string = "The red house is between the blue house and the old house"
print(my_string.replace("house", "car"))
# The red car is between the blue car and the old car
print(my_string.replace("house", "car", 2))
# The red car is between the blue car and the old house
```

# II. Định dang chuỗi
Định dạng chuỗi là quá trình truyền các biến vào trong chuỗi và trình bày chuỗi.
Trong chương này, mình sẽ trình bày cách hoạt động của bốn cách để định dạng chuỗi này và điểm mạnh và điểm yếu tương ứng của chúng là gì. 
Mình cũng sẽ cung cấp cho bạn “quy tắc ngón tay cái” đơn giản của mình về cách mình chọn phương pháp định dạng chuỗi có mục đích chung tốt nhất. 
## 1. Positional formatting
Định dạng theo vị trí trong chuỗi ta có 2 cách.

### Old Style %:

Các chuỗi trong Python có một cách truy cập đặc biệt bằng % . Đó là một phím tắt cho phép bạn thực hiện định dạng vị trí đơn giản rất dễ dàng. Nếu bạn đã từng làm việc với hàm printf -style trong C, bạn sẽ ngay lập tức nhận ra cách hoạt động của hàm này. Ví dụ: 
```python
name = 'dat'
print('Hello, %s' % name)
# 'Hello, dat'
```
    
Ở đây, mình đang dùng `%s` được gọi là một mã định dạng (`format specifier`) để nói cho python biết biết nơi nhập giá trị của biến `name`, được biểu thị dưới dạng chuỗi (string). Đây được gọi là `old style` string formatting. Trong định dạng chuỗi kiểu cũ, cũng có sẵn các mã định dạng khác cho phép bạn kiểm soát chuỗi đầu ra. 

Một ví dụ khác dùng để chuyển đổi các số sang ký hiệu thập lục phân như sau:
```python
print('%x' % 15)
# f
```
Cú pháp định dạng chuỗi "kiểu cũ" thay đổi một chút nếu bạn muốn thực hiện nhiều thay thế trong một chuỗi duy nhất. Bởi vì toán tử "%" chỉ nhận một đối số, bạn cần phải bọc phía bên phải trong một tupe như sau:
``` python
name = 'John'
errno = 100
print('Hey %s, there is a 0x%x error!' % (name, errno))
# Hey John, there is a 0x64 error!
```

Ta cũng có thể thay thế các biến giá trị trong chuỗi, nếu ta ánh xạ theo toán tử %: 
```python
print('Hey %(name)s, there is a 0x%(errno)x error!' % { "errno":10, "name": 'Luna'})
# Hey Luna, there is a 0xa error!
```

Điều này làm cho các chuỗi định dạng của bạn dễ bảo trì hơn và dễ sửa đổi hơn trong tương lai. Bạn không phải lo lắng về việc đảm bảo thứ tự giá trị bạn biến vào biến khớp với thứ tự mà các biến được tham chiếu trong chuỗi định dạng. Tất nhiên, nhược điểm là kỹ thuật này đòi hỏi phải gõ nhiều hơn một chút :D.  Chắc rằng bạn đang thắc mắc tại sao định dạng kiểu printf này được gọi là định dạng chuỗi “Old Style”. Bởi vì nó được thay thế về mặt công nghệ bởi định dạng “New Style” mà chúng ta sẽ nói trong phần tiếp theo. Tuy nhiên, mặc dù định dạng "Old Style" đã không còn được chú trọng, nhưng nó vẫn không bị ngừng sử dụng. Nó vẫn được hỗ trợ trong các phiên bản của Python.

###  New Style

Python 3 đã giới thiệu một cách mới để thực hiện định dạng chuỗi mà sau này cũng được chuyển tiếp sang Python 2.7. Định dạng chuỗi “New Style” này loại bỏ cú pháp đặc biệt `%`  và làm cho cú pháp định dạng chuỗi trở nên thông thường hơn. Định dạng hiện được xử lý bằng cách gọi một hàm **format ()** trên một đối tượng chuỗi.
Bạn có thể sử dụng hàm format () để thực hiện định dạng vị trí đơn giản, giống như bạn có thể làm với định dạng “Old Style”:
   
```python
 name = 'Bob'
 print('Hello, {}'.format(name))
#'Hello, Bob'
```

Ngoài ra cách này còn có các điểm mạnh như sau:
- Reordering values: Bao gồm một số chỉ mục vào các vị trí để sắp xếp lại các giá trị:

    ```python
    print("{} has a friend called {} and a sister called {}".format("Betty", "Linda", "Daisy"))
    # Betty has a friend called Linda and a sister called Daisy
    print("{2} {0} {1}".format("one", "two", "three"))
    # three one two
    ```
- Named placeholders: Chỉ định một tên biến ở một ví trí
    ```python
    tool="Unsupervised algorithms" 
    goal="patterns" 
    print("{title} try to find {aim} in the dataset".format(title=tool, aim=goal))
    # Unsupervised algorithms try to find patterns in the dataset
    ```
    Hoặc ta có thể cho đầu vào là một dict: 
    ```python
    my_methods = {"tool": "Unsupervised algorithms", "goal": "patterns"}
    print('{data[tool]} try to find {data[goal]} in he dataset'.format(data=my_methods))
    # Unsupervised algorithms try to find patterns in he dataset
    ```

- Format specifier
    - Specify data type được sử dụng theo cú pháp: {index:specifier}
    
    Ví dụ ở đây ta sẽ in ra số thập phân có  3 số sau dấu thập phân như sau:
    ```python
    print("Only {0:.3f}% of the {1} produced worldwide is {2}!".format(0.5, "data", "analyzed"))
    # Only 0.500% of the data produced worldwide is analyzed!
    ```
    Hoặc định dạng lại ngày tháng: 
    ```python
    from datetime import datetime 
    print(datetime.now())
    # 2022-02-28 23:47:01.306068
    print ("Today's date is {:%Y-%m-%d %H:%M}".format(datetime.now()))
    Today's date is 2022-02-28 23:48
    ```
    
Trong Python 3, định dạng chuỗi “kiểu mới” này được ưu tiên hơn là định dạng  kiểu `%` hơn. Mặc dù định dạng "kiểu cũ" đã không còn được nhấn mạnh , nhưng nó vẫn không bị ngừng sử dụng. Nó vẫn được hỗ trợ trong các phiên bản Python mới nhất.  Tuy nhiên, mình vẫn khuyên khích bạn dùng kiể này hơn. Bắt đầu với Python 3.6, có một cách khác để định dạng chuỗi của bạn. 


## 2.  String Interpolation / f-Strings (Python 3.6+)
Python 3.6 đã thêm một cách tiếp cận định dạng chuỗi mới được gọi là **formatted string literals** hoặc **f-Strings**. Cách định dạng chuỗi mới này cho phép bạn sử dụng các biểu thức Python được nhúng bên trong chuỗi. Dưới đây là một ví dụ đơn giản để bạn có cảm nhận về tính năng này:



- Sử dụng ký hiệu tối thiểu
- Thêm tiền tố **f** vào chuỗi:

> f "literal string {expression}"
> 

```python
ways = "code"
method = "learning Python faster"
print(f"Practicing how to {way} is the best method for {method}")
```



- Ta có các **Format specifiers** hay dùng như sau:
    - **e**: floating-point in an exponent format - dấu phẩy động ở dịnh dạng số mũ ví dụ g 5 10^3
    - **d**:digit số tự nhiên 
    - **f**: float
    - **b** (binary numbers):  Số nhị phân
     ‘ o’ for octal numbers
     ‘x’ for octal hexadecimal numbers
     ‘s’ for string
     ‘e’ for floating-point in an exponent format
    
    ```python
    number = 90.41890417471841
    print(f"In the last 2 years, {number:.2f}% of the data was produced worldwide!")
    #In the last 2 years, 90.42% of the data was produced worldwide!
    ```
    
    - Datetime
    
    ```python
    from datetime import datetime
    my_today = datetime.now()print(f"Today's date is {my_today:%B %d, %Y}")
    #Today's date is April 14, 2019
    ```
   
 ## 3. Template strings
Đây là một công cụ khác để định dạng chuỗi trong Python: chuỗi mẫu (template strings. Đó là một cơ chế đơn giản hơn và ít mạnh mẽ hơn, nhưng trong một số trường hợp, đây có thể là chính xác những gì bạn đang tìm kiếm.

Hãy xem một ví dụ đơn giản:
```python
from string import Template 
job = "Data science" 
name = "sexiest job of the 21st century" 
my_string = Template('$title ha been called $description') 
my_string.substitute(title=job, description=name)
# 'Data science has been called sexiest job of the 21st century'
```


Một sự khác biệt nữa là các chuỗi mẫu không cho phép **Format specifiers** .  Khi sử dụng biến để người dùng nhập vào ta có một số lưu ý như sau: 
- Sử dụng `$identifier$` thay thế các biến:
```python
from string import Template 
job = "Data science" name = "sexiest job of the 21st century" 
my_string = Template('$title ha been called $description') 
my_string.substitute(title=job, description=name)
# 'Data science has been called sexiest job of the 21st century'
```
- Sử dụng `${identifier}` khi đi sau đó là các ký tự thường.
```python
my_string = Template('I find Python very ${noun}ing but my sister has lost $noun') 
my_string.substitute(noun="interest")
# 'I find Python very interesting but my sister has lost interest'
```
- Sử dụng `$$` thay thế ký tự `$`.
- Sẽ xảy ra lỗi nếu ta không gán đẩy đủ các biến: 
```python
favorite = dict(flavor="chocolate") 
my_string = Template('I love $flavor $cake very much') 
my_string.substitute(favorite)
# Traceback (most recent call last): KeyError: 'cake'
```
- Để tránh lỗi trên ta có thể sử dụng cấu trúc `try ... except` nhưng còn cách sử dụng `safe_substitute` lúc nào cũng trả ra chuỗi và biến nào không được gán sẽ xuất hiện trong chuỗi kết quả.
```python
favorite = dict(flavor="chocolate")
my_string = Template('I love $flavor $cake very much') 
my_string.safe_substitute(favorite)
# 'I love chocolate $cake very much'
```

## Vậy chúng ta nên sử dụng phương pháp nào ?
Nếu chuỗi định dạng của bạn do người dùng cung cấp, hãy sử dụng **Template strings (#4)** để tránh các vấn đề bảo mật. Nếu không, hãy sử dụng **f-Strings (# 3)** nếu bạn đang sử dụng Python 3.6+ và **str.format (# 2)** nếu bạn không sử dụng python 3.6+. Để dễ hiểu hơn ta có biểu đồ như bên dưới. 

![](https://images.viblo.asia/9b1a1029-c0f3-4f7d-b040-868dd310fc45.png)


# Tổng kết 
Trong bài này, chúng ta đã đi qua các phép toán làm việc chuỗi trong python cũng như các cách xử lý định dạng chuỗi. Mỗi cách định dạng chuỗi đều có ưu nhược điểm riêng. Trong bài tiếp theo, ta sẽ tập trung vào biểu thức chính quy trong python. Tạm biệt và hẹn gặp các bạn vào các bài viết tiếp theo. 





# Tài liệu tham khảo

https://app.datacamp.com/learn/courses/regular-expressions-in-python

https://www.geeksforgeeks.org/string-formatting-in-python/

https://realpython.com/python-string-formatting/