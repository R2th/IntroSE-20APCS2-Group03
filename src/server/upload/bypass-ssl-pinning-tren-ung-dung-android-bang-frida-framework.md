Hello mọi người, lâu rùi mình không viết một bài chia sẻ chi tiết về cách sử dụng một framework hay một công cụ, vì mình chưa tìm được công cụ nào thật sự ấn tượng để chia sẻ. Tuy nhiên hôm nay sau khi test qua một số thì mình quyết định viết bài chia sẻ về Frida, một công cụ khá hay giúp các bạn có thể pentest, trace,... các ứng dụng trên điện thoại Android hay IOS.

Để nói về Frida thì công cụ này có rất nhiều chức năng, tuy nhiên bài viết này sẽ chỉ tập trung vào việc bypass SSL Pinning. Để giải thích cho bạn nào chưa biết thì SSL Pinning hay còn gọi là Certificate Pinning là một kĩ thuật giúp máy chủ có thể biết được và ngăn chặn các request giả mạo bằng cách làm giả Certificate bằng cách check một lần nữa các certificate được gửi lên. Điều này làm cho các ứng dụng sử dụng SSL Pinning sẽ không bị Burp Suite log lại request hoặc không thể chạy được nếu dùng Burp Suite Certificate.

Ngày nay, các ứng dụng thường xuyên được cập nhật các công nghệ mới để bảo mật hơn, SSL Pinning là một kĩ thuật khá quan trọng và được rất nhiều ứng dụng áp dụng. Giúp tránh các cuộc tấn công MITM, tránh bị lộ các API quan trọng ( Ít nhất là với người dùng phổ thông hay tò mò)

Frida là một framework giúp bạn chèn được các đoạn mã vào một ứng dụng đang được cài trên thiết bị, giúp bạn có thể nắm được các luồng hoạt động của ứng dụng làm cho việc pentest trở nên dễ dàng hơn rất nhiều.

1\. Những điều cần chuẩn bị
---------------------------

### I, Thiết bị đã được root

Để sử dụng Frida thì bạn cần có một máy Android đã được root ( Máy thật hoặc máy ảo tùy bạn ) để có thể chèn được script vào thư mục root của máy. Trong bài viết này thì mình dùng Genymotion để thao tác vì mình không có máy Android :((( Bạn có thể dễ dàng tải Genymotion tại link này

> [Fun Zone](https://www.genymotion.com/fun-zone/)

Sau khi tải về thì bạn sẽ tải máy ảo về. Nên cài Android 7+ để có thể sử dụng tốt nhất. Trong bài này mình cài *Google pixel XL* với cấu hình như sau

![](https://anonymousvn.org/wp-content/uploads/2019/12/frida-ssl-pinning-googlexl-1.png)

### II, Cài đặt Python Frida

Cài đặt Python trên windows tại link :

<https://www.python.org/downloads/windows/>

Sau khi đã cài đặt python xong, bạn mở Windows Powershell lên và gõ lần lượt các lệnh sau để cài các package còn thiếu

python -m pip install Frida
python -m pip install objection
python -m pip install frida-tools

Hoặc

pip install Frida\
pip install objection\
pip install frida-tools

### III, Cài đặt Platform-tools ( ADB)

Tiến hành tải Platform-tools cho windows bản mới nhất tại link :

<https://dl.google.com/android/repository/platform-tools-latest-windows.zip>

![](https://anonymousvn.org/wp-content/uploads/2019/12/Platform-tools-adb.png)

### IV, Tải về mã SSL Bypass để chèn vào ứng dụng

Để có thể bypass được SSL Pinning thì chúng ta cần viết một đoạn mã để bypass, ở đây mình sử dụng script được viết sẵn tại link

<https://codeshare.frida.re/@pcipolloni/universal-android-ssl-pinning-bypass-with-frida/>

Tải đoạn mã về và lưu thành fridascript.js và lưu luôn ở trong folder của adb để tiện thao tác ^^

2\. Tiến hành cài đặt
---------------------

### I, Kết nối thiết bị vào ADB

Đầu tiên bạn phải bật USB Debugging trên điện thoại. Truy cập vào Cài đặt -- Tùy chọn nhà phát triển và bật chế độ Gỡ lỗi USB ( USB Debugging). Tùy loại máy mà có cách bật khác nhau, Bạn có thể tra google với cụm từ "Cách bật gỡ lỗi USB + tên máy của bạn "

Sau khi bật thì mở thư mục platform-tools vừa tải về và gõ lệnh sau để kết nối tới thiết bị :

//adb connect <ip of device:port>
adb connect 192.168.1.190:5555
Hoặc
 adb connect 192.168.1.190:21503

Bấm chọn OK nếu có thông báo như sau trên điện thoại

![](https://anonymousvn.org/wp-content/uploads/2019/12/frida-enable-usb-debug.png)

### II, Tải và cài đặt Frida Server trên điện thoại

Truy cập vào link sau để tải Frida Server

<https://github.com/frida/frida/releases/>

Để biết cần tải bản nào về, bạn cần gõ lệnh sau trên cmd:

adb shell getprop ro.product.cpu.abi

Nếu thiết bị của bạn cài đặt giống mình thì bạn hãy tải 2 file sau về :

 *frida-server-12.4.7-android-x86.xz*\
*frida-server-12.4.7-android-x86_64.xz*

### II, Tải và cài đặt ứng dụng cần pentest vào điện thoại

Phần này là đương nhiên, bạn cần test gì thì bạn cài cái đó zô !

3\. Cài đặt Frida Server
------------------------

Chúng ta cần cài đặt frida-server vào trong điện thoại trước khi có thể inject được script vào ứng dụng.

#### Bước 1 : Đẩy frida-server vào trong điện thoại

Copy file *frida-server-12.4.7-android-x86.xz* vừa tải ở trên vào folder adb và gõ lệnh sau để đưa file vào trong điện thoại qua ADB

//adb push <path_of_frida_server_folder><space></data/local/tmp>adb push C:\ADB\frida-server /data/local/tmp

#### Bước 2 : Phân quyền chạy cho frida-server

 adb shell chmod 777 /data/local/tmp/frida-server

4\. Cài đặt Burp Suite
----------------------

Truy cập vào link sau để tìm hiểu rõ hơn cách cấu hình thiết bị android để dùng được Burp proxy. Mình sẽ không nói chi tiết về phần này ở đây. Bạn có thể đặt câu hỏi ở phần bình luận nếu gặp thắc mắc.

<https://support.portswigger.net/customer/portal/articles/1841101-configuring-an-android-device-to-work-with-burp>

5\. Đẩy cert của Burp suite vào ứng dụng
----------------------------------------

Gõ lệnh sau để đẩy certificate đã tải ở mục 4 vào trong điện thoại.

 // adb push <path to cacert.der> /data/local/tmp/cert-der.crt\
adb push cacert.der /data/local/tmp/cert-der.crt

6\. Inject script và bypass SSL Pinning
---------------------------------------

Sau khi tải hoàn tất các bước chuẩn bị ở trên thì giờ mới đến lúc chúng ta thực sự "làm gì đó" :))) Ở đây là sẽ inject file "fridascript.js" vào ứng dụng.

### Đẩy file "fridascript.js" vào thiết bị

//adb push <path_to_fridascript.js_folder> /data/local/tmp
adb push C:\ADB\fridascript.js /data/local/tmp

### Kiểm tra và chạy frida-server

adb shell /data/local/tmp/frida-server &

Nhớ là có dấu "&" ở cuối lệnh nha.

### Liệt kê các ứng dụng đang chạy trên điện thoại

Bạn có thể gõ lệnh sau để liệt kê các ứng dụng đang chạy, trong bài này mình sẽ tập trung vào bypass SSL Pinning của Twitter

frida-ps -U

![](https://anonymousvn.org/wp-content/uploads/2019/12/frida-get-running-app.png)

Để ý phần com.twitter.android là package name của ứng dụng Twitter. Để inject script vào ứng dụng này thì mình gõ :

//frida -U -f <your_application_package_name> -l <path_to_fridascript.js_on_your_computer> --no-paus

frida -U -f com.twitter.android -l D:\frida\fridascript.js --no-paus

![](https://anonymousvn.org/wp-content/uploads/2019/12/firda-inject-script-to-app-1024x388.png?v=1575996598)

Nếu mọi thứ trơn tru không xảy ra lỗi gì, thì bạn làm xong rồi đấy !Bạn có thể mở Burp suite lên để kiểm chứng kết quả

![](https://anonymousvn.org/wp-content/uploads/2019/12/frida-burp-suite-ok-1024x550.png?v=1575996654)

Chúc bạn thành công <3
                       
                       Tham khảo : https://medium.com/@ved_wayal/hail-frida-the-universal-ssl-pinning-bypass-for-android-e9e1d733d29