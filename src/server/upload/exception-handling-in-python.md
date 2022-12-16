## Overview
Trong python cũng như tất các các ngôn ngữ lập trình khác, những trường hợp ngoại lệ luôn có thể xảy ra  gây ra lỗi. Với các lỗi nhỏ không ảnh hưởng đến  performance của app có thể chúng ta không để ý nhưng đôi khi xuất hiện một số lỗi có thể gây ra crash hoặc khiến server downtime.  Trong bài này chúng ta sẽ đi tìm hiều cách mà Python xử lý khi có lỗi xảy ra.

## What is an Exception?
Exception là một lỗi xảy ra trong quá trình thực thi một chương trình. Khi nó xảy ra, Python tạo ra một exception để xử lý vấn đề đó tránh cho ứng dụng hay server của bạn bị crash.
## Why use Exceptions ?
Exceptions là một phương thức hết sức đơn giản để các bạn có thể handle những lỗi có thể xảy ra trong code của bạn. Khi bạn nghĩ đoạn code của bạn có thể gây ra lỗi bạn có thể sử dụng exceptions để detect và handle chúng.

## Exception Errors
Dưới đây là một số exception phổ biến trong Python:
IOError
Thường thì lỗi này liên quan đến tệp tin của bạn, có thể nó đã bị lỗi và không thể nào mở được.

ImportError
Lỗi này thường gặp khi python không thể nào tìm thấy module khi bạn thực hiện import chúng.

ValueError
Lỗi này xảy ra khi bạn truyền giá trị vào một function với đúng kiểu dữ liệu nhưng giá trị của nó lại không thích hợp.

## Exception Errors Examples
Để in ra chi tiết một số lỗi cơ bản trong python các bạn có thể làm như sau:
Lấy một số ví dụ:

```
except IOError:
    print('An error occurred trying to read the file.')

except ValueError:
    print('Non-numeric data found in the file.')

except ImportError:
    print "NO module found"

except EOFError:
    print('Why did you do an EOF on me?')

except KeyboardInterrupt:
    print('You cancelled the operation.')

except:
    print('An error occurred.')
```
    
## Set up exception handling blocks
Để sử dụng exception handling in Python, đầu tiên bạn cần phải làm sao detect được các ngoại lệ có thể phát sinh trong đoạn code của bạn. Trong python bạn có thể sử dụng từ khoá "try" và "except" để bắt toàn bộ ngoại lệ có thể xảy ra trong một khối code của bạn.

Khối lệnh năm giữa "try" và "except" nếu xảy ra lỗi nó sẽ gọi ra trong block except tại đây chúng ta sẽ handle nó.
Ví dụ:

```
try:
    some statements here
except:
    exception handling

```
Hoặc đơn giản nhất bạn có thể test như sau :3 

```
try:
    print 1/0

except ZeroDivisionError:
    print "You can't divide by zero, you're silly."

```

## How does it work?

Việc xử lý lỗi được thực hiện thông qua việc sử dụng exceptions, Nó được thực thi trong  try block và nếu bất có bất kỳ lỗi nào xảy ra nó sẽ được handle trong except block.

In addition to using an except block after the try block, you can also use the
finally block. 
Ngoài ra ngoài việc sử dụng try để detect exception và xử lý chúng trong except thì bạn cũng thể xử dụng một block khác mà python cung cấp cho bạn đó là finally.

Đoạn code trong finally sẽ được thực thi bất kể khi có exception xảy ra.

```
mport sys

print "Lets fix the previous code with exception handling"
try:
    number = int(raw_input("Enter a number between 1 - 10 "))

except ValueError:
    print "Err.. numbers only"
    sys.exit()

print "you entered number ", number
```

## Try ... finally clause
Finally là không bắt buộc. Nó được thêm vào với mục đích thực hiện một số tác vụ bất kể trong trường hợp có ngoại lệ xả ra.

```
try:
    raise KeyboardInterrupt
finally:
    print 'Goodbye, world!'
...
```

Trong bài mình có đưa ra một số các cơ bản để handle các ngoại lệ có thể xảy ra trong quá trình phát triển phần mềm sử dụng ngôn ngữ python. Mong rằng nó giúp ích được các bạn.