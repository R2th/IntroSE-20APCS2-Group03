Chào các bạn trong bài viết này, mình sẽ giới thiệu với các bạn về Lỗi  và các ngoại lệ tích hợp trong Python.Mình sẽ giải thích cho các bạn hiểu về khái niệm của chúng là gì, cú pháp và cách xử dụng của chúng. Các bạn cùng tìm hiểu trong bài viết của mình nhé!

----


Về cơ bản.Chúng ta rất dễ  mắc một số sai lầm nhất định trong khi viết một chương trình có tthể  dẫn đến lỗi khi chúng ta cố gắng chạy chương trình đó. Một chương trình python sẽ kết thúc ngay sau khi nó gặp lỗi mà chưa được được khắc phục. Những lỗi này có thể được phân loại  thành hai loại:

1. Lỗi cú pháp.
2. Lỗi logic(Exceptions)

----

####  Lỗi cú pháp trong Python
Lỗi này thường sảy ra cho bạn không tuân theo cấu trúc logic của Python. Thường được gọi là lỗi cú pháp hoặc lỗi phân tích cú pháp

Mình có 1 ví dụ sau:

``` html
>>> if a < 3
  File "<interactive input>", line 1
    if a < 3
           ^
SyntaxError: invalid syntax
```

Theo hình ảnh trên. Mũi tên ở trên đã chỉ ra lỗi đang sảy ra là lỗi cú pháp.
Ta có thể thấy rằng lỗi là do đang thiếu dấu `:` sau câu lệnh `if`

----

####  Lỗi logic trong Python (Exceptions)

Các lỗi xảy ra khi đã chạy chương trình và không sảy ra lỗi cú pháp thì sẽ được gọi là Exceptions hoặc lỗi logic.

Ví dụ  sẽ có 1 lỗi xảy ra khi ta mở 1 file mà file đó không tồn tại `(FileNotFoundError)` hoặc import 1 module không tồn tại `(ImportError)`.
Bất cứ khi nào các lỗi này xảy ra. Python sẽ tạo ra một `exception`. Nếu không được xử lý nó sẽ hiện ra một error cũng với message lý do tại sao error đó xảy ra.
Đây là một ví dụ cách Python xử lý 1 lỗi logic:

``` html
>>> 1 / 0
Traceback (most recent call last):
 File "<string>", line 301, in runcode
 File "<interactive input>", line 1, in <module>
ZeroDivisionError: division by zero

>>> open("imaginary.txt")
Traceback (most recent call last):
 File "<string>", line 301, in runcode
 File "<interactive input>", line 1, in <module>
FileNotFoundError: [Errno 2] No such file or directory: 'imaginary.txt'
```


----

####  Các Exceptions tích hợp trong Python

Có rất nhiều `Exceptions` được tích hợp sẵn trong Python sẽ được hiển thị ra khi sảy ra các lỗi tương ứng.Bạn có thể xem được list các `Exceptions` được tích tích hợp sẵn bẳng cách xử dụng hàm `local()` :
``` html
print(dir(locals()['__builtins__']))
```

`print(dir(locals()['__builtins__']))` sẽ trả về 1 modul gồm các `Exceptions` và thuộc tính được tích hợp sẵn.`dir` cho phép bạn liệt kê các thuộc tính này dưới dạng `string`.

Dưới đây là 1 số `Exceptions` được tích hợp sẵn và thuộc tính của chúng.



| Exception |  Nguyên nhân lỗi | 
| -------- | -------- | 
| `AssertionError`     | Thông báo khi câu lệnh   `assert` không thành công   |
| `AttributeError`     | Thông báo khi  gán hoặc tham chiếu thuộc tính không thành công    |
| `ImportError`     | Thông báo khi không tìm thấy 1 module bạn import    |
| `MemoryError`     | Thông báo khi  hết bộ nhớ    |
| `NameError`     | Khi không tìm thấy 1 biến global hoặc local  |
| `OSError`     | Thông báo khi hoạt động gây ra lỗi hệ thống    |
Bạn có thể tham khảo thêm list các `Exceptions` [ở đây](https://www.tutorialsteacher.com/python/error-types-in-python)

----

#### Kết Luận
Dưới đây mình đã giới thiệu với các bạn về Lỗi  và các ngoại lệ tích hợp trong Python
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://www.tutorialsteacher.com/python/error-types-in-python