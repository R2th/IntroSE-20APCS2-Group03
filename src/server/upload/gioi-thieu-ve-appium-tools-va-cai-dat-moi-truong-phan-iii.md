## I. Download Appium:
1. Go to page http://appium.io/ 
2. Tại list các version: Chọn version appium-desktop-setup-1.10.0.exe
3. Click button Download.
4. Thực hiện install bản vừa download theo hướng dẫn.
5. Giao diện tool Appium sau khi được cài đặt xong
![](https://images.viblo.asia/6f5c4f19-bad1-4385-8868-784bbea833f5.png)


## II. Kết nối device test với PC 
1. Vào setting > Thông tin thiết bị > Thông tin phần mềm > Click vào item Phiên bản 5 lần để khởi động chế độ "Cài đặt cho người phát triển"
![](https://images.viblo.asia/40307db6-a2b7-46c6-8383-7984e42d0b00.png)
2. Thực hiện kết nối với PC thông qua dây cáp.
3. Vào mục "Cài đặt cho người phát triển" > Turn ON chế độ USB debug 
![](https://images.viblo.asia/1506b306-9372-4355-895c-e0d4567a7616.png)
4. Xác minh thiết bị được kết nối đúng với PC bằng cách
 + Mở cmd
 + Run command 'adb devices'
 + Thiết bị đã được kết nối với PC như dưới
 ![](https://images.viblo.asia/95818c75-7765-44a3-a410-9bacdebba81e.png)

## III. Configure Appium tool
1. Android Settings :
+ Chọn Platform Name = Android
+ Chọn Automation Name = Appium
+ Chọn PlatformVersion =  OS vesion thiết bị đã kết nối
![](https://images.viblo.asia/4a34c2f3-ddb6-448c-b67e-f1697a148de0.png)

2. General Settings:
+ Nhập Server Address  
+ Nhập Port number 
+ Không check vào item Pre-Launch Application
![](https://images.viblo.asia/66537965-b8e0-4554-830d-3552dca093c1.png)

## IV. Sử dụng UI Automator Viewer để xác định các phần tử trên  Android
+ Tại đường dẫn C:\Users\ngo.thuy.lien\AppData\Local\Android\Sdk\tools\bin: Chạy file uiautomatorviewer.bat
+ Giao diện của công cụ UI Automator Viewer sẽ được hiển thị như dưới đây.
![](https://images.viblo.asia/90899683-f52c-4fe9-bc0b-d0f566c25fba.png)
+ Mở 1 ứng dụng bất kỳ trên device
+ Trên Automator Viewer: click vào button Chụp hình (đảm bảo device không bị khóa màn hình trong lúc này)
+ Thông tin của các element của ứng dụng được hiển thị như dưới
![](https://images.viblo.asia/930b8fd7-59db-4496-9d6d-866ea939f313.png)
+ Trên app: click vào Email Address để xem chi tiết các thuộc tính của item đã chọn
![](https://images.viblo.asia/02ff2df8-4713-4789-a509-3a715b71494e.png)

## V. Lấy file APK của app
+ Vào trang https://play.google.com/store: thực hiện tìm kiếm app "Chatwork"
+  Click chọn vào kết quả tìm kiếm
+  Copy đường link 
![](https://images.viblo.asia/2970bd3f-c1cf-4703-882f-66b9485d043d.png)
+ Paste vào site http://apps.evozi.com/apk-downloader/ 
![](https://images.viblo.asia/90e457d2-7ebe-48a1-a2a4-3f60e7e958ad.png)
+ Click button Generate Download Link 
![](https://images.viblo.asia/f435dede-850b-42d5-b220-37ccc4545419.png)
+ Download file APK về máy của bạn
+ Để file jp.ecstudio.chatworkandroid_4530003_apps.evozi.com.apk vào thư mục Project (Ex: C:\Users\ngo.thuy.lien\Downloads\APPIUM\TEST APP CW)

## VI. Viết testscript
+ Mở tool Eclipse 
+ Thiết lập một đoạn code như dưới.
deviceName: 781bcc41
platformName: Android
APP_PACKAGE: com.framgia.fgoal.stg
APP_ACTIVITY: com.framgia.fgoal.screen.login.LoginActivity
AppiumDriver: http://0.0.0.0:4723/wd/hub
![](https://images.viblo.asia/df0b22ad-3760-428c-b7af-574fbf00cc18.png)

## VII. Reference:
http://www.software-testing-tutorials-automation.com/2015/09/appium-tutorials.html 
http://appium.io/
## VIII. Free Comment:
Trong phần IV mình sẽ giới thiệu thêm về các testscrip và cách kết hợp các phần đã chuẩn bị để excute test nha!!!

Link phần II: https://viblo.asia/p/gioi-thieu-ve-appium-tools-va-cai-dat-moi-truong-phan-ii-63vKjQOb52R