Quá trình phát triển python 3.10 đã ổn định và cuối cùng chúng ta có thể thử nghiệm tất cả các tính năng mới sẽ được đưa vào bản phát hành cuối cùng.

Chúng ta sẽ đề cập đến một số bổ sung thú vị nhất cho Python - đối sánh mẫu cấu trúc, trình quản lý ngữ cảnh có dấu ngoặc đơn, nhập nhiều hơn và thông báo lỗi mới và cải tiến.
# 1.  Mô hình cấu trúc đối xứng
Mô hình cấu trúc đối xứng là một tính năng đáng kinh ngạc được thêm vào Python. Hãy tưởng tượng một câu lệnh if-else giống như sau:
```
http_code = "418"

if http_code == "200":
    print("OK")
elif http_code == "404":
    print("Not Found")
elif http_code == "418":
    print("I'm a teapot")
else:
    print("Code not found")
    
>>> I'm a teapot
```
Sửa đổi cú pháp để nó trông giống như sau:
```
http_code = "418"

match http_code:
    case "200":
        print("OK")
    case "404":
        print("Not Found")
    case "418":
        print("I'm a teapot")
    case _:
        print("Code not found")
  ```
   Điều làm cho câu lệnh so khớp trường hợp thú vị như vậy được gọi là mô hình cấu trúc đối xứng. Cho phép chúng ta thực hiện cùng một logic  trường hợp đối sánh, nhưng dựa trên việc cấu trúc của đối tượng so sánh của chúng ta có khớp với một mẫu nhất định hay không.
   Vì vậy, chúng ta hãy định nghĩa hai dict, cả hai đều có cấu trúc khác nhau.
   ```
   dict_a = {
    'id': 1,
    'meta': {
        'source': 'abc',
        'location': 'west'
    }
}

dict_b = {
    'id': 2,
    'source': 'def',
    'location': 'west'
}
   ```
Bây giờ, chúng ta có thể viết một mẫu để khớp với dict_a như sau:
```
{
    'id': int,
    'meta': {'source': str,
             'location': str}
}
```
Và một mẫu để khớp với dict_b nữa:

```
{
    'id': int,
    'source': str,
    'location': str
}
```
Nếu chúng ta đặt cả hai điều này lại với nhau trong một câu lệnh so khớp, cùng với một câu lệnh khác / bắt tất cả với trường hợp _ - chúng ta nhận được:
```
# loop through both dictionaries and a 'test'
for d in [dict_a, dict_b, 'test']:
    match d:
        case {'id': ident,
              'meta': {'source': source,
                       'location': loc}}:
            print(ident, source, loc)
        case {'id': ident,
              'source': source,
              'location': loc}:
            print(ident, source, loc)
        case _:
            print('no match')
>>> 1 abc west
>>> 2 def west
>>> no match
```
# 2. Trình quản lý ngữ cảnh có dấu ngoặc đơn
Một thay đổi nhỏ hơn bắt nguồn từ một thay đổi lớn hơn nhiều xuất hiện với Python 3.9
Trình phân tích cú pháp Python trước đây có nhiều hạn chế, điều này đã hạn chế các nhà phát triển Python mà họ có thể cho phép cú pháp.Trình phân tích cú pháp dựa trên PEG của Python 3.9 đã loại bỏ những rào cản này, về lâu dài có thể dẫn đến cú pháp thanh lịch hơn - ví dụ đầu tiên của chúng tôi về thay đổi này là trình quản lý ngữ cảnh trong ngoặc đơn mới. Trước Python 3.9, chúng ta có thể viết một cái gì đó như thế này để mở hai (hoặc nhiều) file I / O :
```
with open('file1.txt', 'r') as fin, open('file2.txt', 'w') as fout:
    fout.write(fin.read())
```
```
with open('file1.txt', 'r') as fin, \
     open('file2.txt', 'w') as fout:
    fout.write(fin.read())
```
Nó hoạt động, nhưng nó không phải là Pythonic. Với trình phân tích cú pháp mới, giờ đây chúng tôi có thể chia dòng này thành nhiều dòng bằng cách sử dụng các dấu ngoặc đơn như sau:
```
with (open('file1.txt', 'r') as fin,
      open('file2.txt', 'w') as fout):
    fout.write(fin.read())
```
# 3. Nhập nhiều hơn
Dễ dàng thấy thú vị nhất ở đây là bao gồm một toán tử mới hoạt động giống như một logic HOẶC cho các kiểu, điều mà trước đây chúng ta đã sử dụng cho phương pháp Union:
```

from typing import Union

def add(x: Union[int, float], y: Union[int, float]):
    return x + y
```
Bây giờ, chúng ta không cần phải viết từ nhập import Union và Union [int, float] đã được đơn giản hóa thành int | float - trông sạch hơn nhiều:
```
def add(x: int | float, y: int | float):
    return x + 
```
# 4 .Thông báo lỗi tốt hơn
Chắc hẳn bạn đã quen thuộc với thông báo lỗi này
```
SyntaxError: unexpected EOF while parsing
```

Đó không phải là một thông báo lỗi rõ ràng và Python chứa đầy các thông báo lỗi ít hơn lý tưởng. May mắn thay, ai đó đã nhận thấy - và nhiều thông điệp trong số này đã được cải thiện đáng kể.

Ví dụ:

* Thiếu dấu ngoặc với 3,9
![](https://images.viblo.asia/10350d53-e487-4859-b71c-ccd38dd48fe5.png)

3.10
![](https://images.viblo.asia/abe50259-c3eb-4e9f-b4a2-ad1fb43dd5cf.png)
* Unclosed string with 3.9 and 3.10

![](https://images.viblo.asia/525422a7-b518-4ea6-9fdb-3339f35b3851.png)
![](https://images.viblo.asia/46653c69-2096-4899-a430-6a8d155c018a.png)

* Toán tử gán thay vì toán tử so sánh được sử dụng với 3.9 và 3.10

![](https://images.viblo.asia/6c89196f-872c-46bc-b927-55ce8aa767da.png)

![](https://images.viblo.asia/17d1d7df-8784-4ba0-9816-3d422ff93752.png)


```
from collections import namedtoplo
> AttributeError: module 'collections' has no attribute 'namedtoplo'. Did you mean: namedtuple?
```
Theo cách tương tự, chúng tôi thấy sự cải thiện tương tự đối với các thông báo NameError
```
new_var = 5
print(new_vr)
> NameError: name 'new_vr' is not defined. Did you mean: new_var?
```
Nguồn: https://towardsdatascience.com/whats-new-in-python-3-10-a757c6c69342