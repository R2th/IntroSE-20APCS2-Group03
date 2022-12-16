## Android App Bundle (.aab) là gì? 

Đồng hành với sự phát triển của công nghệ, ứng dụng Android cũng như các hệ điều hành khác của thiết bị di động tăng đột biến mỗi năm, Tuy nhiên, có một điểm là tất cả đồ họa, độ nét cao, các tính năng sáng tạo và nội dung đa phương tiện phong phú đều có tác động tiêu cực đến trải nghiệm người dùng. Không ai muốn một ứng dụng phải tải xuống mãi mãi và sau đó loại bỏ chúng bộ nhớ của thiết bị do app quá nặng không thể tương thích với bộ nhớ thiết bị. Vậy nên sự xuất hiện của Android App Bundle nhằm giảm thiểu dung lượng file APK ứng dụng Android.
Android App Bundle là một file (với phần đuôi mở rộng .aab) để bạn upload lên Google Play để hỗ trợ Dynamic Delivery. Nó bao gồm tất cả các resource và mã code được compile trong ứng dụng của bạn, nhưng không tạo APK và chữ ký Google Play. Bạn không cần phải build, ký và quản lý nhiều APKs để support nhiều thiết bị khác nhau và từ đó người dùng có các bản tải xuống nhỏ hơn, tối ưu hơn.
Và công việc của QA là test app, vậy thì làm thế nào để deploy file .aab sang .apk hoặc .apks để test. Mình sử dụng bundletool- command line tool mà Gradle, Android Studio và Google Play sử dụng để xây dựng Android App Bundle hoặc chuyển đổi app bundle thành APK được deployed cho các thiết bị.

## Yêu cầu cài đặt:

**1. Android SDK:**
Để cài Android SDK mình download theo link sau: https://developer.android.com/studio/#downloads

**2. Java Home**
Để cài đặt Java Home thì mình cần download Java JDK/JRE theo link sau: https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html

## Tiến hành cài đặt:


### 1. Android Home

**Bước 1:** Sau khi click vào link download bên trên chọn như hình bên dưới, mình dùng win 10 - 64 bit nhé
![](https://images.viblo.asia/45ea94f9-ea0d-40ea-b91e-e6322c7ed278.png)

**Bước 2:** Sau khi download xong về thư mục cá nhân mình tiến hành giải nén file
Trường hợp bạn có Android Studio rồi thì mình không cần down SDK này nữa vì Android Studio đã bao gồm cả SDK rồi

**Bước 3:** Sau khi giải nén file mình lấy đường dẫn thư mục Android gốc để paste vào Environment Variables của System
<div align="center"><img src="https://images.viblo.asia/71bcfa2f-7921-4c53-b203-15c9c2cff03d.png" /></div>

**Bước 4:** Mở Environment Variables của System
<div align="center"><img src="https://images.viblo.asia/acf7ee78-279c-40bc-b79e-c8c42f321ae6.png" /></div>
Chọn Advanced system settings
<div align="center"><img src="https://images.viblo.asia/45ddb1e7-d504-4470-b391-efbf4f9ff869.png" /></div>
Chọn Environment Variables
<div align="center"><img src="https://images.viblo.asia/f472bdef-eee7-4da2-8a7b-95374d2a8b98.png" /></div>
Chọn New
<div align="center"><img src="https://images.viblo.asia/2733dd11-8c38-41b0-9f5d-4351bffc7d87.png" /></div>

Trong hộp thoại New System Variables điền :
Variable name: ANDROID_HOME
Variable value: *đưa đường dẫn ở Bước 3 vào đây nhé*
<div align="center"><img src="https://images.viblo.asia/6f39030f-b361-4a48-aea7-44bd89d2715c.png" /></div>
Tiếp theo chọn Path trong System variables và chọn Edit
<div align="center"><img src="https://images.viblo.asia/864d31e2-e9f9-4bf2-bc99-0067e4bf5f6e.png" /></div>
Trong hộp thoại này chọn New và thêm lần lượt 3 giá trị như sau vào vào dưới cùng các giá trị sẵn có :
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%ANDROID_HOME%\platform-tools
![](https://images.viblo.asia/ce82402d-9586-43f8-8a62-c45e2a697320.png)
Sau đó click OK

### 2. Java Home

**Bước 1:** Sau khi click vào link download Java JDK ở trên mình chọn Accept License Agreement và chọn file .exe để cài đặt
<div align="center"><img src="https://images.viblo.asia/0b127647-daec-4016-b939-30d031c22657.png" /></div>

**Bước 2:** Sau khi download xong về thư mục cá nhân mình tiến hành giải nén file, lấy đường dẫn thư mục Java JDK/JRE gốc để paste vào Environment Variables của System

**Bước 3:** Mở Environment Variables của System
Tương tự như khi cài đặt Android Home
Mình add thêm value cho System Variables
<div align="center"><img src="https://images.viblo.asia/189bee22-3093-4ead-b837-14abfb92bc4a.png" /></div>
Add thêm Path sau vào giá trị cuối trong hộp thoại Environment Variables
%JAVA_HOME%\bin
Click OK

## Tiến hành deployed file (.aab) cho device

**Bước 1:** Trước hết cần download bundle tool tại https://github.com/google/bundletool/releases
<div align="center"><img src="https://images.viblo.asia/6fbe5037-8679-4bfe-9cd4-5907a4803658.png" /></div>
Sau khi download mở file vào Run Adminitrators nhé

**Bước 2:** Cần lấy file aab từ Developer của bạn và đưa vào 1 folder riêng

**Bước 3:**  Cắm device bạn cần deploy vào máy tính nhé, nhớ ấn Allow trong device để Allow access to phone data thì mình mới có thể tiếp tục cài đặt được nha

**Bước 4:** Mở folder có file aab, giữ phím Shift và click right vào file aab đó, chọn Open PowerShell window here:
<div align="center"><img src="https://images.viblo.asia/79205dc9-1a25-40ff-8d44-74cc97495837.png" /></div>

**Bước 5:** 
Chú ý tên file của mình là app.stg
Trong hộp thoại mình sẽ gõ như sau để gen ra file apk như mong muốn và bạn chú ý là cần thay tên file của bạn vào nhé: 
```
java -jar .\bundletool.jar build-apks --connected-device --bundle=.\app_stg.aab --output app_stg.apks
```
<div align="center"><img src="https://images.viblo.asia/21057ad4-ed7f-431c-9010-e3c704f7f4da.png" /></div>

Dòng thứ 1 chạy xong, bạn cần gõ tiếp dòng thứ 2 để cài file vào máy của bạn

```
java -jar .\bundletool.jar install-apks --apks=.\app_stg.apks
```
<div align="center"><img src="https://images.viblo.asia/9285816a-0310-4398-aee4-4afec16532e4.png" /></div>
Như hình trên là bạn đã thành công rồi nhé. Trên device của bạn lúc này sẽ xuất hiện app vừa cài đặt của bạn đó, test ngay đi nào.

Chúc bạn thành công :) Thanks