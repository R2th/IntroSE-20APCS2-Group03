Phần I của bài viết: https://viblo.asia/p/python-sleep-how-to-add-time-delays-to-your-code-part-i-translated-6J3ZgP6glmB

Phần II của bài viết: https://viblo.asia/p/python-sleep-cach-them-do-tre-vao-chuong-trinh-phan-ii-translated-ORNZq1O3Z0n

### Adding a Python sleep() Call With Async IO

Khả năng bất đồng bộ đã được thêm vào Python 3.4 và tập tính năng này ngày càng được phát triển mạnh mẽ. Lập trình bất đồng bộ là một kiểu lập trình song song cho phép bạn chạy đa tác vụ cùng một lúc. Khi một tác vụ hoàn thành, nó sẽ thông báo về thread chính.

`asyncio` là module cho phép bạn thêm một lời gọi `sleep()` bất đồng bộ. Nếu bạn không quen với bản thực thi lập trình bất đồng bộ của python, hãy xem bài viết [Async IO in Python: A Complete Walkthrough](https://realpython.com/async-io-python/) và [Python Concurrency & Parallel Programming](https://realpython.com/learning-paths/python-concurrency-parallel-programming/).

Đây là một ví dụ từ documentation của chính Python:

```Python
import asyncio

async def main():
    print('Hello ...')
    await asyncio.sleep(1)
    print('... World!')

# Python 3.7+
asyncio.run(main())
```

Trong ví dụ này, bạn chạy `main()` và khiến nó ngủ 1 giây giữa hai lời gọi `print()`.

Còn đây là một ví dụ hấp dẫn hơn từ phần documentation [Coroutines and Tasks](https://docs.python.org/3/library/asyncio-task.html):

```Python
import asyncio
import time

async def output(sleep, text):
    await asyncio.sleep(sleep)
    print(text)

async def main():
    print(f"Started: {time.strftime('%X')}")
    await output(1, 'First')
    await output(2, 'Second')
    await output(3, 'Third')
    print(f"Ended: {time.strftime('%X')}")

# Python 3.7+
asyncio.run(main())
```

Trong đoạn code này, bạn tạo ra worker `output()` nhận số giây `sleep` để ngủ và `text` để in ra. Sau đó, bạn sử dụng từ khóa `await` để chờ hàm `output()` chạy. `await` bắt buộc phải có vì `output()` đã được đánh dấu là một hàm `async`, vậy nên bạn không thể gọi nó giống như với hàm thông thường.

Khi nào bạn chạy đoạn code, chương trình sẽ xử lý `await` ba lần. Đoạn code sẽ chờ 1, 2 và 3 giây, tổng cộng là 6 giây. Bạn có thể viết lại đoạn code để các tác vụ chạy song song:

```Python
import asyncio
import time

async def output(text, sleep):
    while sleep > 0:
        await asyncio.sleep(1)
        print(f'{text} counter: {sleep} seconds')
        sleep -= 1

async def main():
    task_1 = asyncio.create_task(output('First', 1))
    task_2 = asyncio.create_task(output('Second', 2))
    task_3 = asyncio.create_task(output('Third', 3))
    print(f"Started: {time.strftime('%X')}")
    await task_1
    await task_2
    await task_3                                 
    print(f"Ended: {time.strftime('%X')}")

if __name__ == '__main__':
    asyncio.run(main())
```

Bạn đang sử dụng khái niệm về các task mà bạn có thể tạo với `create_task()`.  Khi bạn sử dụng task trong `asyncio`, Python sẽ chạy các task bất đồng bộ. Do vậy, khi bạn chạy đoạn code bên trên, nó sẽ hoàn thành trong 3 giây thay vì 6.

### Adding a Python sleep() Call With GUIs

Các ứng dụng command line không phải là nơi duy nhất bạn có thể cần sử dụng hàm `sleep()`. Khi bạn tại mội GUI, thi thoảng bạn sẽ cần thêm độ trễ. Ví dụ, bạn có thể tạo một ứng dụng FTP để download hàng triệu file nhưng bạn cần thêm một lời gọi `sleep()` giữa các batch để server của bạn tránh bị chết.

Code GUI sẽ chạy các công việc xử lý và vẽ trong thread chính gọi là **event loop**. Nếu bạn sử dụng `time.sleep()` trong code GUI, bạn sẽ block event loop. Ở khía cạnh nghĩa dùng, ứng dụng có thể treo. Người dùng không thể tương tác với ứng dụng trong khi nó ngủ với phương thức này. Trên Windows, bạn thậm chí có thể nhận được một cảnh báo.

May thay, có các phương thức khác bạn có thể sử dụng bên trong `time.sleep()`. Trong các phần tiếp theo, bạn sẽ tìm hiểu cách thêm lời gọi `sleep()` trong cả Tkinter và wxPython.

#### Sleeping in Tkinter



Nguồn: https://realpython.com/python-sleep/

[`tkinter`](https://docs.python.org/3/library/tk.html) thuộc thư viện chuẩn của Python. Nó có thể không có sẵn nếu bạn đang dùng Python phiên bản cài đặt sẵn trên Linux và Mac. Nếu bạn gặp lỗi `ImportError` thì bạn cần tìm cách thêm nó vào hệ thống. Nhưng nếu bạn tự cài đặt Python, `tkinter` sẽ sẵn sàng để sử dụng.

Bạn sẽ bắt đầu với ví dụ sử dụng `time.sleep()`. Chạy đoạn code này để xem điều gì xảy ra khi bạn thêm lệnh gọi `sleep()` sai cách:

```Python
import tkinter
import time

class MyApp:
    def __init__(self, parent):
        self.root = parent
        self.root.geometry("400x400")
        self.frame = tkinter.Frame(parent)
        self.frame.pack()
        b = tkinter.Button(text="click me", command=self.delayed)
        b.pack()

    def delayed(self):
        time.sleep(3)

if __name__ == "__main__":
    root = tkinter.Tk()
    app = MyApp(root)
    root.mainloop()
```

Một khi bạn chạy đoạn code trên, ấn nút trong GUI. Nút bấm sẽ khựng lại trong ba giây vì nó chờ `sleep()` hoàn thành. Nếu ứng dụng có các nút khác, bạn không thể click vào chúng. Bạn không thể đóng ứng dụng khi nó đang ngủ bởi vì nó không thể trả lời sự kiện đóng.

Để khiến `tkinter` ngủ đúng cách, bạn cần sử dụng `after()`:

```Python
import tkinter

class MyApp:
    def __init__(self, parent):
        self.root = parent
        self.root.geometry("400x400")
        self.frame = tkinter.Frame(parent)
        self.frame.pack()
        self.root.after(3000, self.delayed)

    def delayed(self):
        print('I was delayed')

if __name__ == "__main__":
    root = tkinter.Tk()
    app = MyApp(root)
    root.mainloop()
```

Ở đây, bạn tạo ra một ứng dụng có kích thước 400 x 400, không chứa widget. Tất cả những gì nó làm là hiển thị một frame. Sau đó, bạn gọi `self.root.after()` mà ở đó `self.root` tham chiếu tới đối tượng `Tk()` nhận hai tham trị:

1. Số millisecond để ngủ
2. Phương thức để gọi khi việc ngủ kết thúc

Trong trường hợp này, ứng dụng của bạn sẽ in ra một chuỗi ra stdout sau 3 giây. Bạn có thể coi `after()` như là `time.sleep()` phiên bản `tkinter` nhưng nó cũng có thể khả năng gọi một hàm sau khi việc ngủ kết thúc.

Bạn có thể sử dụng chức năng này để cải thiện UX (trải nghiệm người dùng). Bằng cách thêm một lệnh gọi `sleep()`, bạn có thể làm cho ứng dụng của bạn có cảm giác tải nhanh hơn và sau đó khởi động các tiến trình lâu hơn. Bằng cách này, người dùng sẽ không phải chờ ứng dụng được mở.

#### Sleeping in wxPython

Có hai khác biệt chính giữa `wxPython` và `Tkinter`:

1. `wxPython` gồm rất nhiều widget
2. `wxPython` hướng tới đặc tính đa nền tảng

Framework `wxPython` không được tích hợp sẵn vào Python vậy nên bạn phải tự tải chúng về. Nếu bạn không quan về `wxPython`, hãy kiểm tra [How to Build a Python GUI Application With wxPython](https://realpython.com/python-gui-with-wxpython/).

Trong `https://realpython.com/python-gui-with-wxpython/`, bạn có thể sử dụng `wx.CallLater()` để thêm một lời gọi `sleep()`:

```Python
import wx

class MyFrame(wx.Frame):
    def __init__(self):
        super().__init__(parent=None, title='Hello World')
        wx.CallLater(4000, self.delayed)
        self.Show()

    def delayed(self):
        print('I was delayed')

if __name__ == '__main__':
    app = wx.App()
    frame = MyFrame()
    app.MainLoop()
```

Ở đây, bạn thực hiện kế thừa trực tiếp và sau đó gọi `wx.CallLater()`. Hàm này nhận các tham số giống `after()` của Tkinter:

1. Số millisecond để ngủ
2. Phương thức để gọi khi việc ngủ kết thúc

Khi bạn chạy đoạn code này, bạn sẽ thấy một cửa sổ trắng (blank) xuất hiện mà không có bất cứ widget nào. Sau 4 giây, bạn sẽ thấy chuỗi "I was delayed" được in ra stdout.

Một trong những lợi ích của việc sử dụng `wx.CallLater()` chính là thread-safe. Bạn có thể sử dụng phương thức này từ một thread để gọi một hàm ở trong ứng dụng `wxPython`

Loạt bài viết xin được kết thúc tại đây!

Nguồn: https://realpython.com/python-sleep/