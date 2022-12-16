Xin chào các bạn, hôm nay mình xin viết tiếp serie về Context Manager trong Python. Bạn có thể đọc thêm về từ khóa with trong phần 1 ở [đây](https://viblo.asia/p/context-manager-trong-python-phan-1-tu-khoa-with-Qbq5QaeJ5D8).
Mình xin tóm gọn lại nội dung phần 1: khi bọc code block của bạn với từ khóa` with`, bạn sẽ gọi 2 hàm` __enter__`  (nếu được cấp giá trị) trước khi chạy block code của mình và `__exit__ ` sau khi chạy xong code block của mình. Giờ chúng ta sẽ đi sâu thêm vào 1 số khái niệm.
### 1. Context Manager là gì ?
Context Manager là 1 object định nghĩa runtime context khi chạy với từ khóa `with`. Nó sẽ xử lý việc chạy vào và thoát ra context của 1 code block. Runtime context có thể hiểu là một môi trường riêng được tạo bởi hàm` __enter__` và xóa bởi hàm` __exit__`.

### 2. Tại sao lại cần đến Context Manager ?
Một vấn đề mà bạn sẽ hay gặp phải trong lập trình đó là quản lý các tài nguyên của máy tính như network, dùng file, khóa, v.v.. Giả dụ bạn có 1 chương trình chiếm các tài nguyên này nhưng lại quên không trả lại chúng kể cả sau khi đã không dùng đến nữa, điều này có thể dẫn đến vấn đề về [memory leak](https://en.wikipedia.org/wiki/Memory_leak). Để giải quyết triệt để vấn đề này thì bạn cần 2 giai đoạn: setUp để cung cấp các thông tin cần thiết cho code block chạy và tearDown để dọn dẹp sau khi nó chạy xong.

Ví dụ ngoài đời: để ăn cơm trước hết phải nấu cơm, rồi sau khi ăn phải rửa bát. Nếu không rửa thì sau vài ngày sẽ không còn bát ăn. Context Manager sẽ đảm nhiệm việc nấu cơm và rửa bát, việc của bạn chỉ là ăn. 

### 3. Dùng Context Manager như thế nào ?
Context Manager thường được sử dụng cùng với từ khóa `with` hoặc bằng cách gọi thẳng các hàm `__enter__` và `__exit__`. 

Ví dụ: 
```py
with open(file_path, 'r') as f:
    f.read()
```
Để xem thêm ví dụ về các cách sử dụng từ khóa `with`, bạn có thể xem tại [đây](https://docs.python.org/3/library/contextlib.html#examples-and-recipes) . Có khả năng cao bạn đã sử dụng 1 vài Context Manager rồi mà không biết, ví dụ như `open`, `close`

### 4. Có thể tự viết Context Manager được không ? 
Có, nhớ rằng Context Manager là một object, bạn chỉ cần cho nó 2 method như sau:
```py
    def __enter__(self):
        # set up something
    
    def __exit__(self, exc_type, exc_value, traceback):
        # tear down
```
Lưu ý là hàm `__exit__` cần có các params `exc_type`, `exc_value` và `traceback` khi bạn định nghĩa nó, exc ở đây là Exception, khi gặp Exception Context Manager sẽ thoát. Cả 3 tham số này sẽ là `None` nếu bạn thoát Context Manager mà không `raise` lên `Exception`. 

Ví dụ:
```py
class PrintContextManager:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"Entering context for {self.name}")
        print("Setting up some stuff")

    def __exit__(self, exc_type, exc_value, traceback):
        print(f"Cleaning up some stuff for {self.name}")
        print("Exiting..")


print_context_manager = PrintContextManager("PCM")
with print_context_manager as pcm:
    print("This is your code block")
    
"""
->
Entering context for PCM
Setting up some stuff
This is your code block
Cleaning up some stuff for PCM
Exiting..
"""
```

Nếu muốn tìm hiểu sâu hơn hoặc tự viết, bạn có thể đọc thêm ở các nguồn sau:
1. https://docs.python.org/3/reference/datamodel.html#context-managers
2. https://realpython.com/python-with-statement/#creating-custom-context-managers
3. https://docs.python.org/3/library/contextlib.html#examples-and-recipes

Cảm ơn vì đã đọc.