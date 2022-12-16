Tiếp nối phần trước [Unicode trong python 2 (Phần 1)](https://viblo.asia/p/unicode-trong-python-2-phan-1-yMnKM1aaK7P) thì phần này tiếp tục nêu ra một số trường hợp gặp lỗi khi tương tác với dữ liệu dạng Unicode
### 3. Các vấn đề xảy ra khi làm việc với Unicode(Tiếp)
#### 3. Hàm ép kiểu str()
Hàm `str()` của python 2.7 sẽ ép kiểu của tham số đầu vào về kiểu `str`. Chúng ta thường dùng hàm này để ép kiểu float, int về  string, nhưng đôi khi input đầu vào chứa cả string thì chúng ta cũng vẫn dùng vì str(string) thì vẫn ra string. Lỗi sẽ xảy ra khi input là string `Unicode`
```
In [49]: s = u"Tiếng Việt"

In [50]: type(s)
Out[50]: unicode

In [51]: str(s)
---------------------------------------------------------------------------
UnicodeEncodeError                        Traceback (most recent call last)
<ipython-input-51-8467727b1feb> in <module>()
----> 1 str(s)

UnicodeEncodeError: 'ascii' codec can't encode character u'\u1ebf' in position 2: ordinal not in range(128)
```
Solution là cần detect type của input, nếu là `Unicode` thì bỏ qua
```
if isinstance(input, unicode):
    return
else:
    str(input)
```

#### 4. Tương tác với chuỗi Unicode
Hãy thận trọng khi xử lý data nếu có chứa chuỗi Unicode. Việc cắt, ghép, đếm số từ có thể bị sai với mong muốn của bạn nếu chưa nắm rõ được chung ta đang thực sự tương tác với chuỗi là `Unicode` hay `str`. Ví dụ ta có spec trả ra 10 ký tự đầu tiên trong chuỗi đầu vào nếu chuỗi có độ dài lớn hơn 10 ký tự hoặc toàn bộ chuỗi nếu nhỏ hơn hoặc bằng 10 ký tự:
```
def sub_string(s):
    if len(s) > 10:
        return s[:10]
    else:
        return s
```
Nếu input là `Tieng Viet` thì kết quả bình thường
```
In [60]: input = 'Tieng Viet trong sang'

In [61]: print sub_string(input)
Tieng Viet
```
Nhưng nếu input là `Tiếng Việt trong sáng` thì
```
In [62]: input = "Tiếng Việt trong sáng"

In [63]: print sub_string(input)
Tiếng Vi
```

#### 5. Ghi file với chuỗi Unicode
```
def write_fo_file(content, file_path):
    with open(file_path, 'w') as f:
        f.write(content)
```
Đoạn code trên là để ghi một đoạn chuỗi vào file, nếu content của mình có giá trị sau: u"Tiếng việt" thì sao?
```
      1 def write_fo_file(content, file_path):
      2     with open(file_path, 'w') as f:
----> 3         f.write(content)
      4 

UnicodeEncodeError: 'ascii' codec can't encode character u'\u1ebf' in position 2: ordinal not in range(128)
```
Tại sao vậy? Vì chuỗi mình truyền vào là `Unicode`, bảng mã dùng để hiển thị cho con người, giúp chúng ta tương tác(đếm, cắt, nối) được chuẩn xác thôi. Còn khi ghi vào database, file... thì lúc đó ta phải chuyển chuỗi đó về dạng `str` kiểu mã hóa mà máy tính có thể đọc được. Code như sau:
```
def write_fo_file(content, file_path, encoding='utf-8'):
    with open(file_path, 'w') as f:
        f.write(content.encode(encoding))
```

### 4. Kết luận
Solution chung:

**1.** Luôn đảm bảo rằng bạn đang tương tác với chuỗi `Unicode`, nếu bất cứ chuỗi nào khác `Unicode` thì ta cần decode chúng.
```
def to_unicode_or_bust(obj, encoding='utf-8'):
    if isinstance(obj, basestring) and encoding:
        if not isinstance(obj, unicode):
            obj = unicode(obj, encoding)
    return obj
```
Có 1 vấn đề khi decode là ta cần biết được chuỗi đã được mã hóa dạng nào: utf-8, shift-jis... chúng ta có thể dùng một vài lib như `pykf`, `chardet`... để phát hiện xem chuỗi được mã hóa dạng nào.

**2.** Encode khi kết thúc. Khi ghi dữ liệu vào file, databases... ta cần encode chúng về dạng mà máy tính hiểu được và đúng spec của Khách hàng