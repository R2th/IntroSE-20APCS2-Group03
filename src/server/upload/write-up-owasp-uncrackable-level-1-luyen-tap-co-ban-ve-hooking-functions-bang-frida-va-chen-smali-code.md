![](https://images.viblo.asia/df7384a6-a075-4061-8269-f773a803824d.png)

Link tải file apk: [UnCrackable-Level1.apk](https://github.com/MinhNhatTran/Android-CTF/blob/master/UnCrackable%20Level%201/UnCrackable-Level1.apk)

UnCrackable Level 1 là bài đầu tiên về reverse android apk trong series bài luyện tập mobile reverse engineeing của Owasp.

Link repo gốc: https://github.com/OWASP/owasp-mstg/tree/master/Crackmes

Để đúng với mục đích luyện tập thì mình sẽ làm bài này bằng phương pháp: Static và Dynamic.

## Cấu trúc code decompiled

Cấu trúc file code decompiled bằng bytecode viewer:

```
sg.vantagepoint/
├── a/
│   ├── a.class
│   ├── b.class
│   ├── c.class
└── uncrackable1/
    ├── a.class
    ├── MainActivity$1.class
    ├── MainActivity$2.class
    └── MainActivity.class
```

***Tên file và tên hàm toàn a b c nên có thể gây nhầm lẫn, rối trong quá trình làm.***

## Bypass root check

Ngay khi mở ứng dụng lên thì sẽ có thông báo "Root detected" hiện lên. Ấn vào button "OK" thì chương trình sẽ tắt luôn.

![](https://images.viblo.asia/79ce0213-65ee-4642-832a-2dc98b0944be.PNG)

Vậy thì bước đầu tiên là phải bypass được phần check root. Nếu chỉ để xem các chức năng của app như nào thì có thể cài apk vào 1 thiết bị không bị root là được. Tất nhiên là chúng ta không làm thế, nếu bị detect thì mình bypass thẳng luôn.

Code phần check root:

![](https://images.viblo.asia/0c8c5d55-114d-4233-9eaa-a31412cb7414.PNG)

Việc kiểm tra root được thực hiện bằng 3 cách, class c trong package **sg.vantagepoint.a** sẽ làm việc này

![](https://images.viblo.asia/f18c5c20-f95b-4bb0-a27b-85024ca72e66.PNG)

#### Static: patch apk

Decompile bằng apktool: ``` java -jar apktool_2.4.1.jar d UnCrackable-Level1.apk ```

Sửa code 3 hàm **c.a()**, **c.b()** và **c.c()** trong smali/sg/vantagepoint/a. Cách sửa rất đơn giản, chỉ cần ***đảm bảo 3 hàm này luôn return false*** là được: sửa các đoạn **const/4** trước lệnh **return** thành khai báo 0x0 hết. VD: ``` const/4 v0, 0x1 ``` -> ``` const/4 v0, 0x0 ```

Build lại bằng apktool: ``` java -jar apktool_2.4.1.jar b UnCrackable-Level1 ```

Tạo key: ``` keytool -genkeypair -v -keystore key.keystore -alias publishingdoc -keyalg RSA -keysize 2048 -validity 10000 ```

Sign new apk: ``` jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./key.keystore UnCrackable-Level1.apk publishingdoc ```

Cài đặt lại và không còn thông báo nào hiện lên.

Code smali đã sửa: [c.smali](https://github.com/MinhNhatTran/Android-CTF/blob/master/UnCrackable%20Level%201/code/c.smali)

#### Dynamic: hook bằng Frida

Ý tưởng đầu tiên là mình sẽ hook và sửa nội dung 3 hàm **c.a()**, **c.b()** và **c.c()** return false hết. Như vậy sẽ vượt qua được bước check root của app:

```python
import frida
import sys

def onMessage(message, data):
    print(message)

package = "owasp.mstg.uncrackable1"

jscode = """
Java.perform(function () {
    send("[-] Starting hooks sg.vantagepoint.a.c");
    var rootCheck = Java.use("sg.vantagepoint.a.c");
    rootCheck.a.implementation = function() {
        return false;
    };
    rootCheck.b.implementation = function() {
        return false;
    };
    rootCheck.c.implementation = function() {
        return false;
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

Nhưng không thành công. Mình kiểm tra lại và nghĩ rằng code không sai. Mình đoán lí do hook không thành công là do các hàm này được gọi ngay khi chương trình bắt đầu (được gọi ngay đầu **onCreate()**) nên frida không kịp chuẩn bị.

=> Cần tìm 1 hàm chưa được gọi ngay khi chương trình bắt đầu để Frida có thể hook và sửa nội dung.

Chú ý rằng việc đóng app chỉ xảy ra khi thực hiện ấn button OK trong thông báo phát hiện root. Vì thế ý tưởng thứ 2 là hook và thay đổi chức năng của button đó. Đây là lệnh thực thi của button OK:

```java
var2.setButton(-3, "OK", new 1(this));
```

New 1(this) chính là phần code trong MainActivity$1.class:

![](https://images.viblo.asia/59c298bf-0b0e-4b16-bffa-eee9240aacdd.PNG)

Khi click button OK thì sẽ chạy hàm System.exit(0), muốn chặn việc đóng chương trình lại thì chúng ta có thể hook và sửa nội dung chức năng exit này:

```python
import frida
import sys

def onMessage(message, data):
    print(message)

package = "owasp.mstg.uncrackable1"

jscode = """
Java.perform(function () {
    send("[-] Starting hooks java.lang.System.exit");
    var sysexit = Java.use("java.lang.System");
    sysexit.exit.implementation = function(var_0) {
        send("[+] Success: prevent application exit");
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

![](https://images.viblo.asia/7ddb9620-58a0-4d14-bd68-eedac19e6c3c.PNG)

Thành công! Chúng ta đã bypass được phần check root. 

Thực ra không hẳn là bypass root check vì chúng ta chỉ ngăn được việc chương trình exit khi ấn button OK thôi. Nhưng cái chúng ta cần thực sự là tiếp cận được các chức năng chính của app, còn việc bypass root hay không, không quan trọng, vì các chức năng còn lại của app không bị ảnh hưởng tùy theo thiết bị root hay không root.

## Get flag

Tại MainActivity của app có chức năng nhập vào input và button kiểm tra. Nếu input đúng (nhập vào flag) thì sẽ có thông báo "Success", ngược lại thì "Nope". Chức năng này được xử lý trong hàm MainActivity.verify()

Việc kiểm tra input được xử lý bởi class **sg.vantagepoint.uncrackable1.a**:

![](https://images.viblo.asia/d8137af0-6e6b-4d2d-b7b4-819f663c5457.PNG)

Không cần để ý chi tiết code làm gì, chúng ta chỉ cần quan tâm xem flow của quá trình check input như nào:

```
-> Decode B64 xâu "5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=" và convert sang mảng kiểu byte (1)
   
-> Gọi hàm sg.vantagepoint.uncrackable1.a.b() để convert hex string "8d127684cbc37c17616d806cf50473cc" thành mảng kiểu byte (2)

-> Gọi hàm sg.vantagepoint.a.a.a() với 2 tham số lần lượt là mảng kiểu byte từ bước 2 và bước 1.

-> Chuyển kết quả của hàm sg.vantagepoint.a.a.a() thành String (4)

-> So sánh input nhập vào với string tại bước 4

-> Nếu input giống với string tại bước 4 thì đúng là flag và hiện thông báo Success.
```

Chúng ta sẽ thay đổi flow này, mục đích là lấy được kết quả của hàm sg.vantagepoint.a.a.a() với đúng tham số là 2 mảng byte.

#### Dynamic: hook bằng Frida

Khi hook bằng frida mình nghĩ ra 2 hướng hook:

**Cách 1:** Sau khi đã chạy 1 lần chức năng check input, sử dụng Java.choose() để tìm trên heap và sử dụng lại chức năng đó với đúng input. Như vậy chúng ta sẽ lấy được kết quả của hàm - flag cần tìm.

Cách này chỉ mới dừng lại ở ý tưởng của mình thôi, chứ mình cũng chưa làm được. Vì việc truyền tham số là mảng kiểu byte vào mình chưa làm được. Nếu muốn chuyển hex string sang mảng byte bằng hàm sg.vantagepoint.uncrackable1.a.b() luôn thì lại rắc rối nữa, vì **sg.vantagepoint.uncrackable1.a.b()** và **sg.vantagepoint.a.a.a()** nằm ở 2 class khác nhau.

Vì thế mình cần tìm cách khác để hook

**Cách 2:** Sử dụng Java.use() để hook hàm sg.vantagepoint.a.a.a() và sửa nội dung hàm ngay trước khi hàm đó được chạy. Ý tưởng là mình sẽ hook hàm sg.vantagepoint.a.a.a(), sửa nội dung cho hàm này gọi instance của chính nó trước khi bị hook. Hơi khó hiểu nhỉ, cụ thể như trong hình sau:

![](https://images.viblo.asia/fffaeb0d-afa3-48e1-8a06-f319b9a79526.PNG)

Theo ý tưởng đó, chúng ta có script:

```python
import frida
import sys
import time

def onMessage(message, data):
    print(message)

package = "owasp.mstg.uncrackable1"

jscode = """
Java.perform(function () {
    send("[-] Starting hooks sg.vantagepoint.a.a");
    var aes_decrypt = Java.use("sg.vantagepoint.a.a");
    aes_decrypt.a.implementation = function(var_0, var_1) {
        var ret = this.a.call(this, var_0, var_1);
        var flag = "";
        
        for (var i=0; i < ret.length; i++){
            flag += String.fromCharCode(ret[i]);
        }
        send("[*] Decrypted flag: " + flag);

        return ret;
    };

});
"""

time.sleep(1)
process = frida.get_usb_device().attach(package)
script = process.create_script(jscode)
script.on("message", onMessage)
print("[*] Hooking", package)
script.load()
sys.stdin.read()
```

Kết quả hook:

![](https://images.viblo.asia/b8730364-75e2-44b3-86c1-0fd833b7f270.PNG)

#### Static: patch apk

Ở phần get flag này mình trình bày phương pháp patch code smali sau, vì đối với mình cách này khó hơn, mãi đến lúc viết ra bài hướng dẫn này mình mới thành công :<

Theo phương pháp này, mình không thay đổi flow của phần decrypt ra flag mà chỉ chèn thêm vào quá trình đó 1 bước. Cách làm là thêm 1 bước để ứng dụng hiển thị kết quả sau khi decrypt, trước khi hàm sg.vantagepoint.a.a.a() return kết quả so sánh input với flag.

Đây là đoạn code smali return kết quả so sánh 2 chuỗi:

```smali
new-instance v1, Ljava/lang/String;

invoke-direct {v1, v0}, Ljava/lang/String;-><init>([B)V

# Chúng ta sẽ viết thêm code vào đây

invoke-virtual {p0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z    # So sánh 2 string

move-result p0

return p0
```

Để chương trình in ra flag mình sẽ thêm 1 lệnh in ra log thôi. Khi flag đã được in ra log rồi thì chúng ta có thể dễ dàng xem được bằng cách sử dụng ``` adb logcat ```.

Cấu trúc lệnh print string ra log bằng code smali như sau:

```smali
invoke-static {v0, v1}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I
```

Trong đó 2 biến **v0** và **v1** lần lượt là **log-tag** và **log-message**. Hai biến này có thể thay thế bằng 2 biến khác được chương trình khai báo sẵn rồi. Mình tránh khai báo thêm biến mới trong code smali vì chưa hiểu lắm về Dalvik opcode và hệ thống Android.

Trong đoạn code smali ở trên thì biến v1 chính là flag mà mình đang muốn lấy. Mình cũng không biết log-tag để như nào nên cứ cho in ra flag/flag hết:

```smali
new-instance v1, Ljava/lang/String;

invoke-direct {v1, v0}, Ljava/lang/String;-><init>([B)V

invoke-static {v1, v1}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I    # patch here

invoke-virtual {p0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

move-result p0

return p0
```

Các bước build, sign apk và install quá cơ bản rồi, mình sẽ không viết lại nữa. Sau khi install và nhập bừa input để kiểm tra thì flag đã được in trong log:

![](https://images.viblo.asia/29433c06-48a5-4e41-8a44-4ba68674c196.PNG)

Code smali đã sửa: [a.smali](https://github.com/MinhNhatTran/Android-CTF/blob/master/UnCrackable%20Level%201/code/a.smali)