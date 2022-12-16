Python là một trong những ngôn ngữ mình thích sử dụng nhất. Lí do là vì python có nhiều thư viện hỗ trợ mạnh, gần như cần gì thì chỉ cần google là ra. Gần đây mình mới tìm được một thư viện khá hay ho của python hỗ trợ chúng ta trong việc điều khiển bàn phím và chuột. Đó là thư viện pynput.

Với pynput chúng ta có thể làm những tool như keylogger, làm cho bàn phím gõ loạn lên,... và nhiều thứ hay ho khác. Trong bài này chúng ta sẽ tìm hiểu về cách sử dụng pynput để điều khiển bàn phím.

### 1. Cài đặt
Với đa số máy tính thì chỉ cần gõ 1 lệnh thôi:
```shell
pip install pynput
```
Với python3:
```shell
pip3 install pynput
```

Trong trường hợp máy tính không cài đặt thư viện thì các bạn có thể sử dụng các IDE xịn như pycharm.<br>
Với pycharm, sau khi tạo project các bạn vào file > Setting (Ctrl + Alt + S). Tại cửa sổ setting mở mục project ra, chọn phần Project Interpreter.
![](https://images.viblo.asia/da838a2e-2b43-4c4d-bb04-e3471130f737.png)

Ấn vào dấu + ở trên thanh dọc nằm ở phía bên phải cửa sổ. Tìm kiếm thư viện pynput và click Install Package. Chờ IDE tiến hành download và install xong là bạn có thể import pynput được rồi.
![](https://images.viblo.asia/6a125c64-0492-404e-92ab-34acdfa8c164.png)

### 2. Ghi lại phím
Để ghi lại các phím được gõ chúng ta sẽ sử dụng **pynput.keyboard.Listener** như sau:
```python
from pynput import keyboard

def keyPressed(key):
    # Do something ...

def keyReleased(key):
    # Do something ...
    if key == keyboard.Key.esc:
        return False

# Collect events until released
with keyboard.Listener(
        on_press = keyPressed,
        on_release = keyReleased) as listener:
    listener.join()
```
Các bạn có thể viết bất cứ gì trong 2 hàm **keyPressed(key)** và **keyReleased(key)**: in ra phím được gõ, lưu lại phím được gõ,...

Để ngừng việc ghi phím lại có 3 cách:
- Trả về **False** trong **keyPressed(key)** hoặc **keyReleased(key)**.
- Gọi phương thức **pynput.keyboard.Listener.stop()** ở bất cứ đâu.
- Gặp ngoại lệ **StopException** trong khi đang ghi phím.

Các bạn có thể viết bất cứ gì trong **keyPressed(key)** và **keyReleased(key)**. Ví dụ như ghi lại danh sách các phím đã gõ, cùng với thời gian ghi nhận phím:
```python
from pynput import keyboard
from datetime import datetime

logdata = []

def getKeyName(key):
    if isinstance(key, keyboard.KeyCode):
        return key.char
    else:
        return str(key)

def keyPressed(key):
    keyName = getKeyName(key)
    logdata.append([datetime.now().timestamp(), keyName])

def keyReleased(key):
    if key == keyboard.Key.esc:
        print(logdata)
        return False

# Collect events until released
with keyboard.Listener(
        on_press = keyPressed,
        on_release = keyReleased) as listener:
    listener.join()
```

### 3. Gõ phím theo file log
Trong trường hợp chúng ta có một file log phím khoảng vài trăm, vài nghìn dòng, hoặc nhiều hơn thế nữa thì có thể sử dụng pynput để máy tự gõ lại các phím trong file log. Đi uống cốc cà phê, hoặc làm ván cờ tự động rồi sau đó quay lại xem nội dung là gì :3

Để máy tự động gõ lại phím từ file log chúng ta sử dụng **pynput.keyboard.Controller** như sau:
```python
from pynput.keyboard import Key, Controller

keyboard = Controller()

# Press and release special key 
keyboard.press(Key.space)
keyboard.release(Key.space)

# Press and release normal key 
keyboard.press('a')
keyboard.release('a')

# Press and release normal upper key 
keyboard.press('A')
keyboard.release('A')
```
Còn lại chỉ cần đọc file log là được, đơn giản hơn cả ghi lại phím đúng không.
***
Vừa rồi chỉ là cách sử dụng **pynput** để điều khiển phím đơn giản. Nếu muốn tự code tool keylogger hoặc keytroller để cài vào máy bạn bè trên tinh thần "hòa bình hữu nghị" thì còn phải tìm hiểu thêm nhiều cái nữa :v