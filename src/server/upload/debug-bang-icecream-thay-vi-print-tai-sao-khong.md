Xin chào mọi người, hôm nay mình sẽ chia sẻ một bài viết khá là thú vị mình đọc được từ Towardsdatascience đó là dùng Icecream để debug thay vì Print hoặc Log. Bình thường các bạn debug code hay dùng cách nào? Với mình thì mình hay dùng Print =)) vì nó nhanh mà cũng hiệu quả tốt nữa. Thôi không lan man nữa chúng ta bắt đầu thôi nào. 
![](https://images.viblo.asia/8aaf8f44-7c59-47e3-97c6-f95aa9b88585.jpeg)

# Đặt vấn đề
Khi bạn dùng Print để debug thì bạn thường hay debug như thế nào? Với bản thân mình thì mình sẽ debug như thế này: 
```
num1 = 30
num2 = 40 

print(num1)
print(num2)
```

Kết quả trả ra:
```
30
40
```
Tuy nhiên thì nếu Print nhiều biến thì mình thường sẽ thêm text vào để xem xem nó đang trả ra kết quả cho biến nào:

```
num1 = 30
num2 = 40 

print('num1', num1)
print('num2', num2)
```

Output: 
```
num1 30
num2 40
```

Hoặc với một số biến phức tạp thì mình thường in ra type của từng biến đó nữa, mỗi người đều có cách debug code riêng của bản thân mà :D. Tuy nhiên việc ghi luôn cả text sẽ thường mất khá nhiều thời gian và nhàm chán. Vì vậy mình đã thử tìm xem có cách nào không cần thêm text vẫn show ra hết những cái mình muốn không?  Và các bạn cùng xem đây :D 

```
num1 = 30
num2 = 40 

ic(num1)
ic(num2)
```

Kết quả sẽ như thế nào nhỉ: "30, 40" chăng? Không hề nhé kết quả như sau: 
```
ic| num1: 30
ic| num2: 40
```

# Icecream là gì? 
Icecream là thư viện Python giúp việc debug dễ dàng và ít phải gõ hơn :v 

## Install
Việc đầu tiên để sử dụng nó chúng ta phải cài đặt đã nha. 

```
pip install icecream 
```
## Thực hành với Icecream
Sau khi đã install thì chúng ta sử dụng thôi nào :D. Viết thử vài dòng code và print ra thử xem kết quả như thế nào nhé. 

```
from icecream import ic 

def plus_five(num):
    return num + 5

ic(plus_five(4))
ic(plus_five(5))
```

Kết qủa thu được như dưới đây: 
![](https://images.viblo.asia/5a9df8da-68a7-4791-a244-c5235bcaa237.png)
Hình: kết quả 

Khi sử dụng ic chúng ta không những chỉ nhìn thấy output mà còn thấy hàm để thực hiện nó luôn như ở hình trên đúng không nào:D. Như mình nói ở trên vừa nhanh gọn vừa không phải gõ nhiều :v. 

### Kiểm tra việc thực thi code 
Khi thực hiện để debug code mà muốn xem nó đang chạy trong hàm nào hay câu lệnh nào mình thường dùng: print(1), print(2) , .... hoặc như dưới đây 

```

def hello(user:bool):
    if user:
        print("I'm user")
    else:
        print("I'm not user")

hello(user=True)
```

Kết quả thu được là :
```
I'm user
```

Dựa vào kết quả này mình biết khi truyền user == True vào thì sẽ chạy vào dòng if thay vì else kia. Tuy nhiên, Icecream giúp chúng ta làm việc này đơn giản hơn bằng cách chạy ic() không cần thêm tex luôn. 

```
from icecream import ic 

def hello(user:bool):
    if user:
        ic()
    else:
        ic()

hello(user=True)
```

Kết quả thu được sẽ như sau:

```
ic| <ipython-input-6-cc091b2e66d0>:5 in hello() at 09:10:15.877
```

## Thông tin ngữ cảnh thêm 
Bên cạnh việc biết code nào đang trả về kết quả về cho bạn, bạn cũng có thể biết tường tận chi tiết rằng dòng code và file code nào đang thực hiện, việc đơn giản là bạn chỉ cần thêm ** includeContext=True bằng  ic.configureOutput()** mà thôi 

```
from icecream import ic 

def plus_five(num):
    return num + 5

ic.configureOutput(includeContext=True)
ic(plus_five(4))
ic(plus_five(5))
```
Kết quả nhận được sẽ như sau: 
![](https://images.viblo.asia/caa8212d-6d0e-4c9d-9770-ec73883c479a.PNG)
Hình: thêm context

Ở đây chúng ta nhận được kết quả từ hình ảnh là đang dùng hàm plus_file để thực hiện và được thực hiện ở dòng 7. Nếu như lúc code một chương trình chúng ta cần code nhiều file để rõ ràng rành mạch hơn thì khi thực thi để debug như vậy sẽ hiện ra là code đang ở trong file nào nữa. 

## Khác 
Trong icecream output  có thể bị vô hiệu hóa hoàn toàn và sau đó được kích hoạt lại bằng **ic.disable()** và **ic.enable()**
```
from icecream import ic

ic(1)

ic.disable()
ic(2)

ic.enable()
ic(3)
```
Kết quả sẽ như sau:
```
ic| 1: 1
ic| 3: 3
```

Để sử dụng icecream với tất cả các file mà không cần import nhiều lần thì chúng ta làm như dưới đây nè: 

Ví dụ bạn có 2 file A.py, B.py thì bạn chỉ cần thêm **install()** vào A.py là đc 

```
from icecream import install
install()

from B import foo
foo()
```
Và trong file B.py bạn chỉ cần gọi đến **ic** là được 
```
def foo():
    x = 3
    ic(x)
```

## Delete
Và sau khi đã hoàn thành việc debug của mình các bạn nhớ xóa hết mấy câu lệnh **ic** thêm vào để debug nhé ^^. 

# Kết Luận 
Icecream giúp chúng ta debug đơn giản hơn đúng không nào, nếu bạn cảm thấy dùng nó thích hơn thì thử từ bỏ thói quen debug bằng **print** thay vào đó hãy dùng **Icecream** nhé. Cảm ơn mọi người đã đọc bài viết của mình, nếu cảm thấy hữu ích nhớ **Upvote** cho bài viết nhé. 
# Reference 
https://towardsdatascience.com/stop-using-print-to-debug-in-python-use-icecream-instead-79e17b963fcc

https://pypi.org/project/icecream/

https://github.com/gruns/icecream