## I. Tổng quan:
![](https://images.viblo.asia/11fb5e5b-b8aa-4ba3-ad10-087547610cec.jpg)

Hey mọi người, nhìn vào chiếc ảnh trên kia chắc rằng mọi người sẽ tự hỏi rằng : " Hệ thống này dùng để làm gì ? Hệ thống này điều khiển bằng tay hay tự động hoàn toàn nhỉ ? blabla ". Mình cũng từng có cơ hội được nhìn những hệ thống như thế này rồi và nó sử dụng với nhiều mục đích nhất định tùy theo nhu cầu của mỗi người như: xây dựng hệ thống tự động buff view, share livestream bán hàng, tăng người theo dõi trên các nền tảng như Youtube,  Tiktok, Facebook,... Vậy làm thế nào để control được những con máy Android này ? Có rất nhiều công cụ, framework để có thể làm được điều này nhưng mình thấy mọi người hay sử dụng đó là ADB viết tắt của Android Debug Bridge.

ADB viết tắt của Android Debug Bridge là một công cụ Command Line như một chiếc cầu nối (Bridge) giữa thiết bị Android và Máy tính thông qua các dòng lệnh cmd để có thể giao tiếp với nhau, sử dụng để điều khiển và giao tiếp với điện thoại Android. Cho phép bạn truy cập vào Unix shell để thi hành các lệnh nhân Unix trên thiết bị.

## II. Cài đặt :
Để điều khiển được điện thoại điều kiện tiên quyết là bạn phải mở chế độ USB Debuging trên điện thoại nhó.[ Link tham khảo](https://quantrimang.com/cach-kich-hoat-che-do-usb-debugging-tren-android-162845) cách bật ở đây.

Tiếp theo chúng ta sẽ install ADB tool trên PC của mình để giao tiếp với điện thoại nhé. Mình dùng Python và hệ điều hành ubuntu nên sẽ sử dụng package này [pure-python-adb](https://pypi.org/project/pure-python-adb/) :

```
pip install pure-python-adb
```

Note thêm: Nếu mọi người không có điện thoại thật để vọc thì dùng giả lập Android trên PC luôn nhé, mình hay sử dụng một phần mềm mã nguồn mở có tên là scrcpy. Mọi người[ install ở đây](https://github.com/Genymobile/scrcpy).

Bây giờ tất cả những thứ chúng ta cần đã Setup rồi, mở điện thoại lên cắm cable để kết nối điện thoại và máy tính nhé. Gõ command line này để start kết nối nhé :

```
sudo adb start-server

// ready for connect
* daemon not running. 
* starting it now on port 5037 
```

Viết một đoạn script nhỏ get thiết bị kết nối để điều khiển nào :

```
from ppadb.client import Client as AdbClient
import time

def getDevice():
    # Default is "127.0.0.1" and 5037
    client = AdbClient(host="127.0.0.1", port=5037)
    devices = client.devices()
    if (len(devices) < 0):
        print("0 device")
        return 0

    return devices[0]

device = getDevice()

print(device)
```
Đoạn code trên mục đích là get ra thiết bị đầu tiên mà mình kết nối.

## III. Get Started:
![](https://images.viblo.asia/ff0d967a-1fe5-4d96-9015-cb14b552418c.png)


Cách để chúng ta có thể giao tiếp với điện thoại Android là sử dụng shell, qua đó chúng ta có thể gửi các command line để giả lập các thao tác như vuốt màn hình, gõ phím, nhấn vào vị trí bất kỳ trên màn hình, blabla
À mà để nhấn vào vị trí bất kỳ trên màn hình thì cách ez nhất là chúng ta phải xác định tọa độ trên màn hình và tọa độ trên điện thoại sẽ được tính toán như sau :
{@embed: https://gist.github.com/longnd-1038/e9391cba3ac0adf63c4f8ebf4c1c1d1e#file-download-png}
Để get tọa độ dễ dàng nhất mọi người vào CHPLAY tải app [Screen Coordinates](https://play.google.com/store/apps/details?id=com.app.firescript.screencoordinates&hl=en_US&gl=US) để lấy nhé.

* Một số command hay sử dụng để Automation:
```
adb shell input tap x y                   // chạm vào vị trí có tọa độ (x, y) trên màn hình
adb shell input text "Hello VietNam"      // Nhập text vào input
adb shell keyevent eventID               // Một số event trên điện thoại ứng với eventID tương ứng

Đây là danh sách EventID nè :
3: Bấm nút HOME
4: Bấm nút quay lại
5: Gọi
6: Kết thúc cuộc gọi
24: Tăng âm lượng
25: Giảm âm lượng
26: Bật tắt điện thoại
27: Mở Camera
64: Mở browser
66: Enter
67: Backspace
207: mở danh bạ
220: tăng độ sáng
221: giảm độ sáng
277: cut
278: copy
279: paste
```

Ở trên là một số command đủ để chúng ta có thể viết các tool cơ bản rồi. Còn nhiều và rất nhiều command nữa mọi người tham khảo ở [đây nhé](https://github.com/mzlogin/awesome-adb/blob/master/README.en.md).

## IV: Viết tool nào :
### 1. Auto đăng bài lên Facebook :
{@embed: https://www.youtube.com/watch?v=f6-PuayxTH4}

Mình sẽ sử dụng kiến thức ở trên để viết một Automation Tool trên điện thoại để post bài viết tự động nhé, kịch bản sẽ như sau :
1. Mở ứng dụng Facebook
2. Nhấn vào vị trí nhập Text
3. Gõ nội dung bài viết
4. Nhấn nút Đăng để submit bài viết

Đầu tiên chúng ta cần dùng app Screen Cordinates để lấy tọa độ một số chỗ trên màn hình nhé :
![](https://images.viblo.asia/08139795-f6eb-4e2f-be62-b4b11b02fa63.jpg)

Script theo kịch bản trên ở đây :
```
from ppadb.client import Client as AdbClient
import time

def getDevice():
    # Default is "127.0.0.1" and 5037
    client = AdbClient(host="127.0.0.1", port=5037)
    devices = client.devices()
    if (len(devices) < 0):
        print("0 device")
        return 0

    return devices[0]

device = getDevice()

def postFacebook():
    # Trở về màn hình home
    device.input_keyevent(HOME_BUTTON)
    # Nhấn vào icon facebook chở 1 giây
    device.input_tap(672, 1237)
    time.sleep(1)
    # Nhấn vào input đăng
    device.input_tap(648, 479)
    time.sleep(1)
    # Nhấn vào icon facebook chở 1 giây
    device.input_tap(574, 647)
    time.sleep(2)
    # Gõ text facebook chở 2 giây
    device.input_text("Tu dong dang bai len FACEBOOK")
    time.sleep(2)
    # Nhấn đăng bài
    device.input_tap(949, 152)
    
postFacebook()
```

## 2. Nhá máy ( gọi liên tục ) :
{@embed: https://www.youtube.com/watch?v=A-gl13XSpsk}
Chẳng hạn mình muốn troll thằng bạn ml bằng cách nhá máy đến số điện thoại nó cho sml luôn và không muốn lặp đi lặp lại thao tác này. Kịch bản tool sẽ như sau :
1. Vào màn hình cuộc gọi
2. Gõ số điện thoại 
3. Chờ khoảng 13 giây cho đổ tí chuông
4. Kết thúc cuộc gọi
5. Lặp lại cho tới khi chặn thì thôi =))

Script ở đây :

```
from ppadb.client import Client as AdbClient
import time

def getDevice():
    # Default is "127.0.0.1" and 5037
    client = AdbClient(host="127.0.0.1", port=5037)
    devices = client.devices()
    if (len(devices) < 0):
        print("0 device")
        return 0

    return devices[0]

device = getDevice()

def callPhoneNumber(device, phoneNumber):
    #call phone Number
    device.input_keyevent(5)
    device.input_text("")
    device.input_text(phoneNumber)
    device.input_keyevent(5)
    #wait 13s
    time.sleep(13)
    # end call
    device.input_keyevent(6)
    
while True:
    callPhoneNumber(device, "0774751111")
```

## 3. Tự động đăng ký tài khoản FACEBOOK trên điện thoại :
Nó cũng giống như các công cụ ở trên đưa ra kịch bản rồi viết script thôi, nhưng script này hơi dài nên mình không public lên đây, chỉ show kết quả cho mọi người xem nhé:
{@embed: https://www.youtube.com/watch?v=dVInlExfb4U}
# V. Một số lưu ý :
Ở trên là một số kiến thức cơ bản đủ để mọi người có thể làm một số công cụ tự động trên điện thoại, nhưng một số điều mình chưa đề cập là :
- Chúng ta có thể điều khiển song song nhiều điện thoại để thực hiện một auto gì đó chẳng hạn thì mọi người dùng đa luồng để xử lý ( năng suất sẽ cao hơn ).
- Việc xác định tọa độ như trên thì script sẽ hoạt động không chính xác trên các màn hình khác nhau nhé, có một số phương pháp khác để xác định linh động hơn như: chụp ảnh màn hình và dùng OCR để xác định tọa độ, sử dụng dump xml để lấy vị trí của element [tham khảo đây](https://stackoverflow.com/questions/26586685/is-there-a-way-to-get-current-activitys-layout-and-views-via-adb?fbclid=IwAR3924o9HMd-W7X-ZxHfSkf2zmKyA5zMNeZCEG9KRL6X_8uoCuMrHDY2N7M) nhé.
- Một số vấn đề về thay đổi ip, proxy, fake IMEI các kiểu mọi người tự tìm hiểu nhé
HI vọng một số kiến thức thú vị trên sẽ giúp được gì đó cho bạn trong việc bắt đầu học automation (yay) !