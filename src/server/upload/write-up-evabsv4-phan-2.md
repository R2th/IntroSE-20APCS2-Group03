![](https://images.viblo.asia/259a908b-d42a-4758-990b-2e22dd43e5c9.PNG)

Trong [phần 1](https://viblo.asia/p/write-up-evabsv4-phan-1-4dbZN2AvZYM) mình đã giới thiệu từ Level 1 - 8 của lab EVABSv4. Qua 8 levels đầu chúng ta được làm quen với ADB (logcat, shell, pull); SQLite DB Browser; sơ qua về cấu trúc tệp tin trong file apk và cấu trúc thư mục trong local storage của 1 ứng dụng cài đặt trên thiết bị android.

Trong phần 2 này mình sẽ nói thêm về các sử dụng framework Frida, Patch app, Intercept http request bằng Burp Suite. Mình sẽ không nói thêm về các nội dung đã đề cập kỹ trong các bài writeup trước đó. Còn với các kiến thức về Frida và Burp Suite mình sẽ hướng đẫn kỹ hơn.

Và giờ thì chúng ta sẽ tiếp tục với...

### Level 9: Smali Injection

![](https://images.viblo.asia/cace2e6a-2a6a-4a32-b97d-d723e600a3c0.png)

Xem source code bằng bytecode viewer:
- SmaliInject.class:  
![](https://images.viblo.asia/718255a0-7b14-4869-a6e0-9181eb1b0eb3.png)
- SmaliInject$2.class:  
![](https://images.viblo.asia/1e9ce9f8-5d1a-490d-be7f-11533fdd9534.png)

Dễ thấy nếu biến SIGNAL = "LAB_ON" thì chương trình sẽ in ra flag. Nhưng biến SIGNAL đang được đặt mặc định là "LAB_OFF" và không có lệnh nào thay đổi giá trị của biến này cả.

Vì thế chúng ta cần sửa code smali và build lại app mới sau khi sửa thì chương mình sẽ in ra flag. Cách patch và build lại file apk mình đã đề cập đến trong bài viết về [dịch ngược và patch file apk] (https://viblo.asia/p/tim-hieu-dang-ctf-reverse-android-dich-nguoc-va-patch-file-apk-Eb85okv252G)

Chúng ta có thể sửa code và build lại ứng dụng mới mà vẫn dùng được các chức năng bình thường do Dev đã không có cơ chế kiểm tra độ toàn vẹn code.

### Level 10: Intercept

![](https://images.viblo.asia/81f374ec-2db4-4fb2-9a39-d378381da89a.png)

Theo như hint thì cần phải intercept request bằng burpsuite. Để intercept được request trên các phiên bản Android từ Android N trở lên thì phải add root CA có thời hạn ngắn. Nếu muốn đơn giản hơn thì chỉ cần cài EVABSv4 lên thiết bị có phiên bản thấp hơn Android N là sử dụng được burp CA.

Cách cài đặt Burp Suite theo [hướng dẫn](https://portswigger.net/support/installing-burp-suites-ca-certificate-in-an-android-device) của portswigger.

Cấu hình Proxy như sau để bắt được các request từ thiết bị android ra ngoài:

![](https://images.viblo.asia/46fcb742-b5e9-4a28-aef3-789af7e6a50f.png)

Sau khi config để intercept được request rồi thì chỉ cần Send to repeater và gửi request lên là được. Trong respond có chứa flag.

![](https://images.viblo.asia/419d6d02-dd78-4a71-a7dc-4ce7c6a6e65f.png)

Đây là một nguy cơ mất an toàn ứng dụng android do Dev không thực hiện SSL Pinning. Nếu một ứng dụng sử dụng SSL Pinning một cách cẩn thận thì server sẽ không phản hồi lại các request chúng ta gửi qua Burp.

### Level 11: Custom PERM

![](https://images.viblo.asia/1952cffc-ce73-41ae-80c5-ba700c0fd684.png)

Ở Level này ta phải tìm đúng input mới được, xem source trên bytecode viewer dễ dàng thấy ngay input đúng là cust0m_p3rm.

![](https://images.viblo.asia/94512d78-0ef5-466f-b2dd-490b8d92a9c9.png)

Sau khi nhập đúng input thì flag sẽ được truyền vào intent com.revo.evabs.action.SENSOR_KEY bằng hàm putExtra().

Ban đầu mình tìm cách để tác động vào intent nhằm lấy được data truyền vào intend đó nhưng tốn khá nhiều thời gian mà không được. Có thể do kiến thức của mình chưa đủ. Vì thế mình chuyển sang dùng Frida luôn. Ý tưởng là hook và sửa hàm putExtra() cho nó in ra flag.

Mình cùng từng viết 1 bài writeup sử dung Frida để hook function [tại đây](https://viblo.asia/p/write-up-owasp-uncrackable-level-1-luyen-tap-co-ban-ve-hooking-functions-bang-frida-va-chen-smali-code-LzD5dgb4ljY). Lần này thì mình sẽ giải thích kỹ hơn về Frida.

Hiểu nôm na thì khi sử dụng Frida mình sẽ phải xác định rõ đối tượng (hàm) mà mình muốn thay đổi và process (ứng dụng) sẽ thực hiện hàm này. Frida sẽ thay nội dung hàm mình muốn thành nội dung mới. Bằng cách đó, khi ứng dụng chạy hàm này thì thực ra nó đang hoạt động theo đúng cách ta muốn.

Có 2 hàm mà mình thường xử dụng với Frida:
- Java.choose(): scan trên heap tìm instance của class to muốn. Khi tìm được thì Frida sẽ chạy đoạn code mới của ta.
- Java.use(): khi hệ thống tạo instance mới của class mình muốn thì phần code mới mình viết sẽ được ghi đè vào.

Mình thường dùng Java.use() nhiều hơn. Ở bài này, vì hàm putExtra() có nhiều bản tùy theo kiểu tham số, nên mình phải sử dụng overload() để chỉ ra đúng hàm putExtra() nhận tham số là 2 string.

``` python
import frida
import sys

def onMessage(message, data):
    print(message)

package = "com.revo.evabs"

jscode = """
Java.perform(function () {
    send("[-] Starting hooks android.content.Intent.putExtra");
    var intent = Java.use("android.content.Intent");
    intent.putExtra.overload("java.lang.String", "java.lang.String").implementation = function(var_1, var_2) {
        send("[+] Flag: " + var_2);
    };

});
"""

process = frida.get_usb_device().attach(package)
script = process.create_script(jscode)
script.on("message", onMessage)
print("[*] Hooking", package)
script.load()
sys.stdin.read()
```

Kết qủa:

![](https://images.viblo.asia/47792f63-6627-4aab-933f-c12d896db1c2.png)

Ở đây khi mình kiểm tra flag thì lại báo là sai flag, trong khi mình khá chắc là cách mình làm đúng. Vì thế mình đã gửi mail hỏi tác giả của EVABS và nhận được phản hồi rằng cách mình làm là chính xác. Do code random có lỗi nên flag sinh sai.

![](https://images.viblo.asia/dfc0911b-f497-4237-be2d-533254b6674f.png)

Qua đó khẳng định thêm rằng các anh Ấn Độ rất nhiệt tình :)))

### Level 12 - Instrument

![](https://images.viblo.asia/220232bb-69b6-4a88-8a6d-6695438aeb81.png)

Khi click "MAP AREA" thì sẽ xuất hiện 2 tọa độ x và y cùng với 1 giá trị bằng x * y. Bài này cũng cần sử dụng Frida để làm, theo cảm nhận của mình thì còn dễ hơn level 11. Source code của level 12 trong file frida1.class

![](https://images.viblo.asia/c00268fb-c00b-4272-b9e4-0a51f8c2eb90.png)

Logic so sánh của bài này rất đơn giản, flag sẽ được in ra nếu (x = a * b) > var5 + 150 với var5 là 1 số int random trong khoảng 0 -> 70. Vì a b cố định khiến x luôn là 50, như thế thì var5 random kiểu gì thì x cũng không thỏa mãn được. Vậy thì chỉ cần hook và sửa lại hàm nextInt(int) cho return -150 là được, nhanh gọn chẳng phải nghĩ hay tính toán gì.

```python
import frida
import sys

def onMessage(message, data):
    print(message)

package = "com.revo.evabs"

jscode = """
Java.perform(function () {
    send("[-] Starting hooks java.util.Random.nextInt");
    var random = Java.use("java.util.Random");
    random.nextInt.overload("int").implementation = function(var_1) {
        return -150;
    };

});
"""

process = frida.get_usb_device().attach(package)
script = process.create_script(jscode)
script.on("message", onMessage)
print("[*] Hooking", package)
script.load()
sys.stdin.read()
```

Flag sẽ được in ra log:

![](https://images.viblo.asia/ada9715c-507e-4fbd-a21e-e4082a7857fc.png)

Kiểm tra flag vẫn sai, chắc vẫn lỗi như level 11 :V