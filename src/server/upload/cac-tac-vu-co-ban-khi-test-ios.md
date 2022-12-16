## 1. Kết nối với thiết bị
Thông thường, để thuận tiện cho việc pentest, ta sẽ sử dụng một shell để truy cập tới thiết bị. 
### a. Remote shell
Để có được một remote shell tới thiết bị iOS, ta sẽ sử dụng thông qua ssh. Đầu tiên, vào Cydia, tìm kiếm từ khoá `OpenSSH`. Sau khi cài đặt sẽ thấy như thế này: 

![](https://images.viblo.asia/2809fad0-0686-489b-8a9c-0da3efe27798.jpg)

Tiếp theo là kết nối máy tính và thiết bị test vào cùng một mạng wifi cục bộ. Rồi sử dụng `ssh` tới thiết bị với câu lệnh:
```
ssh -p 22 root@<ip của iOS>
```
Trong đó <ip của iOS> là địa chỉ của thiết bị test trong mạng nội bộ. Có thể  xem thông tin này tại Setting > Wifi > `<tên mạng wifi>`.  Mật khẩu mặc định cho tài khoản root sau khi jailbreak sẽ là `alpine`. Mình khuyến khích đổi mật khẩu này nếu làm việc trong môi trường không riêng tư lắm vì người khác cũng có thể truy cập tới thiết bị iOS của bạn bằng tài khoản mặc định này. Tham khảo phần đổi mật khẩu phía dưới nhé.

![](https://images.viblo.asia/99f28477-282e-493f-8f2c-b8600aa9c9d8.png)

Thế là chúng ta đã truy cập được vào thiết bị iOS rồi.

#### Thay đổi mật khẩu của thiết bị iOS
Sau khi truy cập được vào thiết bị, để thay đổi mật khẩu tương tự như với linux, gõ 
```
passwd
```
Sau đó thực hiện nhập mật khẩu mới và confirm lại mật khẩu mới này.

![](https://images.viblo.asia/8dbadba4-3603-487f-a7cc-778be3c56ef1.png)

### b. On-device shell app.
### c. Via Usb
Trên thực tế, việc xử dụng chung một mạng wifi thường không khả thi hoặc không hiệu quả do tín hiệu chập chờn. Cách mình khuyến khích sử dụng kết nối thông qua usb.

Trên thiết bị iOS có 1 tiến trình daemon là `Usbmuxd` cho phép map cổng trên thiết bị với cổng TCP trên máy host. Nhờ đó ta có thể setup được kết nối ssh mà không thực sự cần một kết nối mạng. Khi mà usbmuxd  thấy thiết bị iOS chạy ở normal mode,  nó sẽ kết nối tới thiết bị  và bắt đầu chuyển tiếp các request nó nhận được thông qua `/var/run/usbmuxd`.

Kết nối macOS và iPhone bằng iproxy:
- Trước tiên cần cài đặt `libimobiledevice`
```
brew install libimobiledevice
```
- Tiếp theo map cổng 22 của thiết bị iOS với 1 cổng của TCP của host với `iproxy`:
```
iproxy 2222 22
```
Trong đó 2222 là cổng tcp của máy host. Cuối cùng là thực hiện kết nối tới thiết bị iOS thôi:
```
ssh -p 2222 root@localhost
```
Vì cổng 2222 nằm luôn trên máy host nên địa chỉ t sử dụng sẽ là `localhost`.

## 2. Host-Device Data Transfer
### a. Copying App Data Files via SSH and SCP
Dữ liệu của app thường sẽ nằm ở `(/private)/var/mobile/Containers/Data/Application/<app id data>`. Để lấy được dữ liệu này có thể sử dụng `scp` để tải về máy thông qua kết nối ssh. Vì `scp` chỉ chuyển 1 file 1 lần nên dễ nhất là nén nó lại rồi chuyển.

Nén data:
```
tar czvf /var/mobile/Containers/Data/Application/<app id data> (<nơi lưu>)
```
Để tìm được `<app id data>` có thể dùng câu lệnh `find` để tìm kiếm:
```
find /var/mobile/Containers/Data/Application/ -name <key word>
```
với keyword thường là tên app.

Sau khi đã có được file nén, về shell của máy host và chạy `scp` để tải về máy:
```
scp root@localhost:<nơi lưu> <nơi lưu trên máy host>
```
Nếu kết nối thông qua usb như bên trên, thêm option `-P <tcp port>`.
```
scp -P 2222 root@localhost:/var/root/dvia.tar  ./
```

### b. Passionfruit
Trên giao diện của passionfruit, chuyển sang tab File, tìm file muốn tải về và click vào, sẽ thấy ở bên phải sẽ có nhiều các option để xem hoặc tải file về. 

![](https://images.viblo.asia/d7654c24-367e-4d04-a5c9-fb6d20fdd04a.png)

### c. Objection

Vì mình chưa sử dụng Objection nên sẽ bổ sung sau ạ

### d. iFunbox
Tại giao diện của iFunbox, click chuột phải vào file muốn tải và bấm vào copy to mac ==> so easy.

![](https://images.viblo.asia/cea352be-2c8c-4ca4-8203-94bbee7865f3.png)

## 3. Obtaining and Extracting Apps
### Getting the IPA File from an OTA Distribution Link
*Phần này chỉ là mình dịch lại của OWASP vì chưa từng tiếp xúc với OTA bao giờ, có thể khi làm thực tế sẽ có*

 Trong quá trình phát triển,  đôi khi tester sẽ được cung cấp app thông qua   over-the-air (OTA) distribution.  Trong trường hợp này,  chúng ta sẽ nhận được 1 itms-services link, giống như sau:
 ```
 itms-services://?action=download-manifest&url=https://s3-ap-southeast-1.amazonaws.com/test-uat/manifest.plist
 ```
 Ta có thể sử dụng itms service assets downloader để tải IPS từ OTA distribution URL. Để cài đặt, chạy câu lệnh:
 ```
 npm install -g itms-services
 ```
 Lưu lại api :
 ```
  itms-services -u "itms-services://?action=download-manifest&url=https://s3-ap-southeast-1.amazonaws.com/testuat/manifest.plist" -o - > out.ipa
  ```
  ### Acquiring the App Binary
  #### a. Từ API file:
  Nếu đã có api file (có thể đã có sẵn mã nhị phân đã giải mã), chỉ đơn giản là giải nén và đọc nó thôi. Thường binary sẽ nằm trong thư mục main bundle (.app). Trên macOS, `.app` được mở đơn giản bằng việc show package content. (trong Finder, click chuột phải vào vào chọn Show Package Content).
  #### b. Từ thiết bị đã jailbreak
  Nếu không có api file, chúng ta cần có 1 thiết bị jailbroken để cài đặt app trên đó. Tuy nhiên vì có DRM, binary app sẽ được mã hoá nên việc kéo nó về để dùng gần như là vô nghĩa. Để có được binary đã giải mã, ta sẽ dùng các tool như frida-ios-dump hay Clutch.
  
  ##### Sử dụng Clutch
  Trước tiên, sử dụng Clutch để xem các app đã cài đặt trên máy. (**Chú ý** Clutch sẽ không ghi nhận các app được cài đặt thông qua sideloading, nói cách khác là chỉ ghi nhận các app được cài từ App Store):
 
 ![](https://images.viblo.asia/ebaf272b-2656-4d2d-b07d-508ebc4fae86.png)

Sau đó dump app bằng câu lệnh:
```
Clutch -d <id>
```
##### Sử dụng frida-ios-dump
Cái này mình chưa sử dụng nên sẽ bổ sung sau.

## 4. Installing app
### a. Cydia Impactor
Công cụ này vốn được thiết kế nhằm jailbreak iOS. Nhưng đã được viết lại để sign và cài đặt app trên iOS thông qua sideloading. Để cài đặt ipa file, chỉ cần đơn giản kéo file thả vào app và quá trình cài đặt sẽ tự động được thực thi.
### b. libimobiledevice
Đây là một bộ thư viện đa nền tảng và set các tool để giao tiếp với thiết bị iOS. Để cài đặt, chạy câu lệnh:
```
brew install libimobiledevice
```
Sau khi cài đặt, bạn sẽ có thể thực hiện các lệnh khác như `ideviceinfo` , `ideviceinstaller` hay `idevicedebug `.

Sau đó có thể dùng `ideviceinstaller` để cài đặt app.

### c. ipainstaller
Một công cụ cho phép cài đặt app bằng ipa file. Sau khi upload file lên thiết bị, sử dụng câu lệnh sau để cài đặt app:
```
ipainstaller App_name.ipa
```
### d. XCode
- Mở XCode
- Chọn `Window/Devices and Simulators`
- Chọn thiết bị iOS được kết nối và bấm vào `+` để cài app

### e. iFunbox
Cài đặt với iFunbox rất đơn giản khi chỉ cần bấm vào install app và chọn ipa file.

![](https://images.viblo.asia/fffcc80f-db92-443a-9891-249a76dbee77.png)

## 5. Information Gathering
Quá trình này là một quá trình cơ bản trong việc pentest app. Trong phần này, chúng ta sẽ chỉ nói tới việc như: lấy ra các app đã cài đặt, xem các package hay data của app. Điều này sẽ cho ta một vài thông tin thú vị mà chưa cần biết gì tới reverse engeneering. Các kĩ thuật nâng cao hơn sẽ được đề cập trong các bài viết tiếp theo.

Khi thực hiện bước này, chúng ta sẽ tập trung trả lời các câu hỏi:
- Các file nào nằm trong package?
- Framework nào được sử dụng?
- Dung lượng mà app yêu cầu/ sử dụng?
- App đòi các quyền gì? Mục đích là gì?
- App có sử dụng các kết nối không an toàn không?
- Trong quá trình cài đặt có sinh ra các file nào không?

### a. Liệt kê các app đã cài đặt
Ta có thể sử dụng frida-ps để lấy ra các app (A) được install (i) trên thiết bị kết nối qua USB (U) với câu lệnh
```
frida-ps -Uai
```
![](https://images.viblo.asia/338780a9-6d06-4c66-9caf-18d81b04185f.png)

Cũng có thể dùng passionfruit để nhìn các app trên giao diện: 
![](https://images.viblo.asia/4559ff70-1cf0-4ee4-a588-47500b828318.png)

Tương tự với iFunbox:
![](https://images.viblo.asia/2cd4e316-88e0-47b9-b0cc-ca9ede15e3d6.png)

và một vài cách khác nữa bạn có thể tự tìm hiểu thêm nhé.

### b. Exploring the App Package
Nếu chúng ta có ipa file, đơn giản chỉ cần giải nén với `unzip` hay bất kì tool giải nén nào khác. Ta sẽ thấy các package của nó trong 1 thư mục payload. Nếu không, có thể sử dụng passionfruit để xem các thông tin này. Cùng điểm qua các thông tin quan trọng có thể tìm thấy ở đây:
#### Info.plist
Các information property list hay Info.plist (tên quy ước) là nguồn thông tin chính cho các ứng dụng iOS. Nó thường có các cặp key-value mô tả cấu hình của app. Trên thực tế, một bundle sẽ thường có 1 file Info.plist.

Có thể sử dụng plutil để chuyển sang định dạng xml1:
```
plutil -convert xml1 Info.plist
```
Ngoài ra passionfruit cũng hỗ trợ view các file này trực tiếp.
#### App binary
App binary của iOS là dạng fat binary (Có thể chạy cả trên 32-bit và 64-bit). Khác với Android khi có thể decompile binary thành Java/Smali code, app binary của iOS chỉ có thể được deassembler.

Chúng ta sẽ nói thêm về điều này trong phần về "Reverse Engineering and Tampering on iOS" 
#### Native Libraries
Các native libraries này còn được biết tới với cái tên Framwork. Có thể xem các framework này ở mục "Modules" của passionfruit:
![](https://images.viblo.asia/925aaf52-a291-4040-88a1-1bad86ef2136.png)

Đối với ipa file thì nó nằm trong thư mục Frameworks.

**Chú ý:** Đây có thể không phải list đầy đủ các framework, có thể  là có framework nằm trong source code và không hiển thị ra ở mục này. Cách duy nhất để xem các framework này là đọc phần về `Tampering and Reverse Engineering on iOS`.
#### Các thông tin khác 
- Keychain
- sqlite3 database
- yap database
- realm database
- couchdatabase
- Log 

....
### c. Accessing App Data Directories
Trước tiên, app data sẽ được lưu tại `(/private)/var/mobile/Containers/Data/Application/<app data id>`. Tuy nhiên, `<app data id>` và `<app bundle id>` là 2 id khác nhau và việc tìm kiếm thủ công sẽ rất mất thời gian nên hãy điểm qua vài cách để liệt tìm toạ độ của app ta cần nào :
- Dùng `find`:
```
find (/private)/var/mobile/Containers/Data/Application/ -name <pattern>
```
- ipainstaller:

![](https://images.viblo.asia/4a062dcf-f145-4739-8f4a-c68ddad2a4c1.png)

- Dùng passionfruit

![](https://images.viblo.asia/ca1ad1a5-15e0-48d2-9dad-4b78b7efd5d1.png)

và cả tá các cách nữa, hãy tự mình tìm hiểu thêm nhé.

Thông thường 1 app sẽ có các thư mục như
- Documents/
    -  Chứa các thông tin được tạo bởi người dùng.
    -  Người dùng có thể xem và viết lên các thông tin này.
    -  Nội dung được backup.
    -  App có thể tắt đường dẫn bằng cách sử dụng NSURLIsExcludedFromBackupKey.
- Library
    -  Chứa các file không phải của người dùng như caches, preferences, cookies, and property list (plist) configuration files.
    - iOS app thường sử dụng  Application Support and Caches subdirectories, but the app có thể tự tạo custom subdirectories.
- Library/Caches/
    -  Chứa các file bán bán ổn định.
    -  Người dùng không thấy và không thể viết lên đây.
    -  Dữ liệu trong này không được backup.
    -  Hệ điều hành có thể tự đông xoá thư mục này khi app không chạy và bộ nhớ còn lại ít.
- Library/Application Support/
    - Chứa các persistent file cần để chạy được app.
    -  Người dùng không thấy và không thể sửa các file này.
     -  Nội dung trong file được backup.
    -  Có thể disable đường dẫn này với NSURLIsExcludedFromBackupKey.
- Library/Preferences/
    -  Chứa các thuộc tính mà vẫn còn tồn tại dù có khởi động lại app.
    -  Thông tin được lưu, không mã hoá,  bên trong sandbox với 1 file `[Bundle_id].plist`.
    -  Tất cả các key-value sử dụng NSUserDefaults có thể tìm thấy trong  file này.
- tmp/
    -  Dùng để ghi các temporary files  mà không cần tính liên tục  khi chạy app.
    -  Chứa các file caches không cần tính liên tục.
    -  Người dùng có thể thấy.
    -  Dữ liệu không được backup.
    - Hệ điều hành có thể tự đông xoá thư mục này khi app không chạy và bộ nhớ còn lại ít.
 
 ###  d. Setting up an Interception Proxy
Mình khuyến khích ở đây chúng ta sẽ sử dụng Burp Suite để làm Interception Proxy vì nó dễ dùng, nhiều tài liệu và có hệ thống support để tìm cách khắc phục lỗi khá ổn cũng như có nhiều tính năng được tích hợp hoặc có thể cài đặt thêm.

Về cách cài đặt Burp và sử dụng cơ bản, xem lại phần về [Setup môi trường test](https://viblo.asia/p/ios-testing-setup-eW65GDAJKDO) nhé.

#### Cấu hình burp để làm việc với thiết bị iOS:
Đầu tiên vào proxy > options > sửa lại interface mà burp bắt gói tin như hình. **chú ý:** Nếu kết nối usb thì có thể để loopback cho an toàn.

![](https://images.viblo.asia/8a19378d-2e51-4265-bbcc-6ee9144bc12d.png)

Tuy nhiên, có một số app hay trang web sẽ không chấp thuận các chứng chỉ dài quá dài (nếu không nhầm là dài hơn 39 tháng). Thế nên chúng ta cần tự taọ 1 chứng chỉ của riêng mình và import vào burp tại proxy > options > import/export CA certificate 

![](https://images.viblo.asia/ab6bbe95-46c4-48c8-8e3c-d64e3e3a7b6e.png)


#### Cấu hình thiết bị để kết nối tới burp:
**Đối với kết nối wifi**:
Kết nối vào mạng wifi, rồi tìm vào infomation > configure proxy

![](https://images.viblo.asia/8fcd8fbc-e436-4fbf-966b-b802daa24bac.jpg)

Chọn manual và cấu hình:
- Server: <ip của máy macOS>
- Port: <port trên burp> (8080)

 ![](https://images.viblo.asia/569a3d41-7af9-4327-bbe8-23fae565d532.jpg)

**Đối với kết nối usb**
- Kết nối tới 1 mạng wifi 
- Cũng vào chỉnh proxy như trên, tuy nhiên server để là `localhost`
- Thực hiện remote port forwarding trên máy macOS bằng câu lệnh:
```
ssh -p 2222 -R 8080:localhost:8080 root@localhost
```
#### Add chứng chỉ của burp vào thiết bị iOS:
Sau khi cấu hình proxy xong, mở sarafy lên, truy cập tới http://burp

![](https://images.viblo.asia/b16a22bb-15fb-49ff-a0ca-14a4c6ed929d.jpg)

Bấm vào `CA Certificate` > allow để tải chứng chỉ về

![](https://images.viblo.asia/bdd0474a-8b11-4c76-a9e4-959447c2563b.jpg)

Vào setting > general > profile 

![](https://images.viblo.asia/dde9b2e3-577b-45f5-b7c7-b16c787bc5a5.png)

Bấm vào profile vừa tải về và install 

![](https://images.viblo.asia/d978fe19-8871-4e6c-a7af-2010bde8249b.png)

Tiếp theo vào setting > general > about > certificate trust setting và cho phép profile lên root CA

![](https://images.viblo.asia/14fe68e7-b684-4255-b45d-4f0931aed93f.png)

ok vậy là xong, thử vào burp để kiểm tra :

![](https://images.viblo.asia/241ae6fb-3bf8-4c70-a6ba-b49774c7626e.png)

Vậy là xong phần setting cơ bản để bắt gói tin rồi.

**Chú ý thứ n:** Việc add root CA cho là một trong những cách để vượt qua SSL Pinning. Ngoài ra còn có nhiều cách khác, có thể tham khảo tại [đây](https://blog.netspi.com/four-ways-to-bypass-ios-ssl-verification-and-certificate-pinning/)