Xin chào các bạn, hôm nay mình sẽ quay lại khám phá Python, và lần này với từ khóa mà ắt hẳn rất nhiều người đã dùng qua. Có lẽ bạn đã đọc nó ở phần thao tác đóng mở file với python, ví dụ như sau:
```js
open("file.txt", "r") as f:
    f.readline()
    f.close()
```


Có thể bạn đã đọc được rằng nếu muốn file này tự đóng mà không cần `f.close`, bạn có thể dùng nó trong block `with` :

```js
with open("file.txt", "r") as f:
    f.readline()
```

Vậy tại sao lại thế, và ngoài việc giúp bạn tiết kiệm 1 dòng thì `with` còn công dụng gì nữa không ? Cùng đi tìm hiểu nào.

# Nguồn gốc của with

Nếu bạn đọc câu trả lời [này](https://stackoverflow.com/questions/3012488/what-is-the-python-with-statement-designed-for) trên stack overflow, sẽ được dẫn đến [PEP343](https://www.python.org/dev/peps/pep-0343/), đây là lần thứ hai `with` được đề cập đến và là lần đầu tiên nó được thêm vào ngôn ngữ Python bản 2.5 bởi chính tác giả của nó, Guido van Rossum. (Bạn có thể đọc về PEP khởi nguồn của `with` ở đây - [PEP-310](https://www.python.org/dev/peps/pep-0310/) ). 

# Công dụng của with

Nếu bạn xem phần Abstract của PEP-343 ở trên, sẽ thấy:

> This PEP adds a new statement "with" to the Python language to make it possible to factor out standard uses of try/finally statements.

> In this PEP, context managers provide __enter__() and __exit__() methods that are invoked on entry to and exit from the body of the with statement.

Như vậy, mục đích của `with` được thêm vào để đơn giản hóa các phần mà yêu cầu block `try` và `finally`. Ví dụ bạn có một đoạn code 

```js
f = open("foo.txt", "r"):
    file = f.read()
    if condition1:
    .....
    else
    if condition2:
        //do something
        f.close()
    if condition3:
        //do something
        .....
        f.close()
        if condition3.1:
        //do something
        f.close()
```

Có thể thấy việc xử lý các lệnh `file.close()` sẽ khá cồng kềnh, vì vậy ở nhiều ngôn ngữ, họ cung cấp cho bạn các block `try...finally`:

```js
try:
    f = open("foo.txt", "r"):
        file = f.read()
        if condition1:
        .....
        else
        if condition2:
            //do something
        if condition3:
            //do something
            .....
            if condition3.1:
            //do something
finally:
    f.close()
```

và với từ khóa `with`, việc này có thể được viết đơn giản hơn:

```js
with open("foo.txt", "r") as f:
        file = f.read()
        if condition1:
        .....
        else
        if condition2:
            //do something
        if condition3:
            //do something
            .....
            if condition3.1:
            //do something
```


# with hoạt động như thế nào
Ở câu 2 phần Abstract ở trên, có thể thấy rằng việc bọc code block của bạn trong `with` cũng tương đương với việc gọi hàm `__enter__` và` __exit__` với một Context Manager. Context Manager là gì thì mình sẽ giải thích trong một bài khác, nhưng chúng ta cứ tạm hiểu là một cơ chế để khóa và mở khóa tài nguyên của máy tính khi cần. Điều này có nghĩa là khi bạn dùng `with`, phần code của bạn sẽ chạy hàm __enter__ rồi mới đi đến code block của bạn, cuối cùng là __exit__. Chúng ta có thể tham khảo ví dụ trục tiếp từ doc:

```js
with EXPR as VAR:
    BLOCK
```
 sẽ đồng nghĩa với:
 ```py
 mgr = (EXPR)
exit = type(mgr).__exit__  # Not calling it yet
value = type(mgr).__enter__(mgr)
exc = True
try:
    try:
        VAR = value  # Only if "as VAR" is present
        BLOCK
    except:
        # The exceptional case is handled here
        exc = False
        if not exit(mgr, *sys.exc_info()):
            raise
        # The exception is swallowed if exit() returns true
finally:
    # The normal and non-local-goto cases are handled here
    if exc:
        exit(mgr, None, None, None)
 ```

Đó tạm thời là những thông tin cơ bản về `with`,  ở bài sau mình sẽ chia sẻ thêm các ví dụ về cách sử dụng `with`, sau khi chúng a đã làm quen với context manager. Nếu các bạn muốn tìm hiểu trước có thể tham khảo các nguồn sau:
1. https://www.python.org/dev/peps/pep-0343/
2. https://docs.python.org/3/reference/datamodel.html#context-managers
3. https://docs.python.org/release/2.5.2/lib/typecontextmanager.html
4. https://docs.python.org/3/reference/compound_stmts.html#the-with-statement
5. https://www.python.org/dev/peps/pep-0310/


Cảm ơn vì đã đọc.