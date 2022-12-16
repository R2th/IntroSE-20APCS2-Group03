Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn về việc cách xử lý tập tin cơ bản  trong Python

- [Mở tập tin](#openfile)
- [Đóng tập tin](#closefile)
- [Đọc một tập tin](#readfile)
- [Xử dụng Statement để đóng tập tin](#usestatement)
- [Ghi nội dung lên tập tin](#writefile)


Một tập tin chứa thông tin hoặc dữ liệu được lưu trữ trên thiết bị lưu trữ của máy tính. Như bạn đã biết về các kiểu của tập tin như âm nhạc, video, và tập tin văn bản. Python sẽ cung cấp cho bạn cách để điều khiển các tập tin. Chúng ta sẽ tập trung vào hai loại: tập tin văn bản và binary.

## Mở tập tin

Để thực hiện mở một tập tin chúng ta sử dụng hàm open\(\). Với hàm này sẽ có hai tham số được truyền vào đó là đường dẫn và chế độ mở. Các chế độ như sau:

```text
    “r” -> Chế độ chỉ đọc, bạn không thể xóa hay chỉnh sửa gì.
    “w” -> Chế độ ghi, bạn có thể ghi dữ liệu vào tập tin.
    “a” -> open in append mode
```

Mặc định chế độ read sẽ đươc thiết lập, ví dụ

```text
>>> fobj = open("love.txt")
>>> fobj
<open file 'love.txt', mode 'r' at 0xb7f2d968>
```

## Đóng tập tin

Sau khi bạn mở tập tin để thao tác bạn nên đóng tập tin đó lại sau khi thao tác, bạn có thể sử dụng hàm close\(\).

```text
>>> fobj = open("love.txt")
>>> fobj
<open file 'love.txt', mode 'r' at 0xb7f2d968>
>>> fobj.close()
```

Ghi chú

Bạn cần chắc chắn rằng bạn luôn đóng sau khi mở một tập tin, sau khi công việc được thực hiện bạn không còn lý do nào để mở nó nữa. Bởi vì có giới hạn số tập tin mà chương trình có thể mở. Nếu bạn mở quá giới hạn sẽ không có cách nào khôi phục được, hoặc cũng có thể gặp sự cố. Với mỗi tập tin được mở tài nguyên bộ nhớ sẽ được cung cấp cho nó như mô tả tập tin xử lý hoặc khóa tập tin. Vì vậy bạn có thể tiết kiệm được tài nguyền không sử dụng hoặc ít sử dụng. Mở tập tin liên tục có thể gây ra lỗi hoặc mất dữ liệu.

## Đọc một tập tin

Để đọc tập tin chúng ta có thể sử dụng hàm read\(\).

```text
>>> fobj = open("sample.txt")
>>> fobj.read()
'I love Python\nPradeepto loves KDE\nSankarshan loves Openoffice\n'
```

Nếu bạn gọi hàm read\(\) nó sẽ trả về chuỗi trong tập tin mà nó đọc được. readline\(\) có thể giúp bạn đọc từng dòng của tập tin. Ví dụ:

```text
>>> fobj = open("sample.txt")
>>> fobj.readline()
'I love Python\n'
>>> fobj.readline()
'Pradeepto loves KDE\n'
```

Để đọc toàn bộ các dòng chúng ta dùng readlines\(\).

```text
>>> fobj = open("sample.txt")
>>> fobj.readlines()
['I love Python\n', 'Pradeepto loves KDE\n', 'Sankarshan loves Openoffice\n']
```

You can even loop through the lines in a file object.

```text
>>> fobj = open("sample.txt")
>>> for x in f:
...     print x,
...
I love Python
Pradeepto loves KDE
Sankarshan loves Openoffice
```

Chúng ta sẽ viết chương trình nhỏ đưa tên của tập tin sau đó đưa ra màn hình nội dung của tập tin đó.

```text
#!/usr/bin/env python
name = raw_input("Enter the file name: ")
fobj = open(name)
print fobj.read()
fobj.close()
```

Cuối chương trình chúng ta sử dụng hàm close\(\) để thực hiện đóng tập tin khi không còn thao tác với nó nữa.

Kết quả như sau:

```text
$ ./showfile.py
Enter the filename: sample.txt
I love Python
Pradeepto loves KDE
Sankarshan loves Openoffice
```

## Sử dụng statement

Trong thực tế chúng ta nên sử dụng statement. Chúng sẽ đảm nhiệm việc đóng tập tin cho bạn.

```text
>>> with open('setup.py') as fobj:
...     for line in fobj:
...         print line,
...
```

```text
#!/usr/bin/env python
"""Factorial project"""
from setuptools import find_packages, setup

setup(name = 'factorial',
    version = '0.1',
    description = "Factorial module.",
    long_description = "A test module for our book.",
    platforms = ["Linux"],
    author="Thang Nguyen Manh",
    author_email="nguyen.manh.thang@framgia.com",
    url="http://pymbook.readthedocs.org/en/latest/",
    license = "http://www.gnu.org/copyleft/gpl.html",
    packages=find_packages()
    )
```

## Ghi nội dung lên tập tin

Chúng ta mở tập tin sau đó ghi một vài thông tin ngẫu nhiên vào nó sử dụng hàm write\(\).

```text
>>> fobj = open("ircnicks.txt", 'w')
>>> fobj.write('powerpork\n')
>>> fobj.write('indrag\n')
>>> fobj.write('mishti\n')
>>> fobj.write('sankarshan')
>>> fobj.close()
```

Giờ chúng ta sẽ đọc tập tin chúng ta vừa tạo

```text
>>> fobj = open('ircnicks.txt')
>>> s = fobj.read()
>>> print s
powerpork
indrag
mishti
sankarshan
```

copyfile.py

Trong ví dụ này chúng ta sẽ sao chép tập tin văn bản này sang tập tin khác.

```text
#!/usr/bin/env python
import sys
if len(sys.argv) < 3:
    print "Wrong parameter"
    print "./copyfile.py file1 file2"
    sys.exit(1)
f1 = open(sys.argv[1])
s = f1.read()
f1.close()
f2 = open(sys.argv[2], 'w')
f2.write(s)
f2.close()
```

Ghi nhớ

Đây là cách để đọc một tập tin nhưng không phải là một ý tưởng hay, một tập tin với dung lượng rất lớn để đọc và sẽ tốn nhiều bộ nhớ. Có một cách khác là tạo ra một tập tin mới với dung lượng nhỏ hơn rồi thực hiện đọc chúng.

Bạn có thể thấy chúng ta một module mới ở đây là sys. sys.argv chưa tất cả các lệnh về dòng. Ghi nhớ câu lênh cp trong dòng lệnh, sau câu lệnh cp chúng ta sao chép tập tin và nó sẽ thành một tập tin mới.

Các giá trị trong sys.argv là các lệnh đầu tiên của nó.

```text
#!/usr/bin/env python
import sys
print "First value", sys.argv[0]
print "All values"
for i, x  in enumerate(sys.argv):
    print i, x
```

Kết quả như sau:

```text
$ ./argvtest.py Hi there
First value ./argvtest.py
All values
0 ./argvtest.py
1 Hi
2 there
```

Trong ví dụ trên chúng ta sử dụng một hàm mới enumerate\(iterableobject\), cái mà sẽ trả về chỉ số và giá trị từ iterable.

Random seeking in a file \(tìm kiếm ngẫu nhiên\)

Bạn có thể sinh ngẫu nhiên nội dung trong tập tin sử dụng seek\(\). Nó sẽ có hai chiều offset và whence. Bạn có thể đọc thêm trong help của Python.

seek\(...\) seek\(offset\[, whence\]\) -&gt; None. Di chuyên vị chị của tập tin mới.

Ví dụ

```text
>>> fobj = open('/tmp/tempfile', 'w')
>>> fobj.write('0123456789abcdef')
>>> fobj.close()
>>> fobj = open('/tmp/tempfile')
>>> fobj.tell()    #tell us the offset position
0L
>>> fobj.seek(5) # Goto 5th byte
>>> fobj.tell()
5L
>>> fobj.read(1) #Read 1 byte
'5'
>>> fobj.seek(-3, 2) # goto 3rd byte from the end
>>> fobj.read() #Read till the end of the file
'def'
```

Dưới đây mình  đã giới thiệu với các bạn các bước cơ bản để xử lý 1 tập tin trong python. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.


### Thao Khảo

https://pymbook.readthedocs.io/en/latest/file.html