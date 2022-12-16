Trong các dự án Mobiles, việc "Keep evidence (image, video)"  khi kiểm thử ứng dụng trên các thiết bị di động khiến chúng ta mất khá nhiều thời gian. Nếu không sử dụng phần mềm, chúng ta phải thực hiện chụp màn hình trên thiết bị (hoặc ghi lại video) sau đó phải dùng dây cáp để kết nối với máy tính thì mới lấy được dữ liệu hình ảnh và video để sử dụng. 

Hôm nay, mình muốn giới thiệu và hướng dẫn sử dụng một số công cụ hữu ích giúp QA chúng ta có thể "Keep evidence" khi thực hiện kiểm thử ở các dự án Mobiles ngay trên máy tính của mình, nhanh và dễ dàng hơn.  Thực hiện trên OS (hệ điều hành) WINDOW.
 
 
### I. CAPTURE/RECORD VIDEO CHO CÁC THIẾT BỊ ANDROID

**1. CÁC CÔNG CỤ CẦN CÀI ĐẶT**
* Trên máy tính: Tải về và cài đặt **Snagit 13.**  
   Link tải: https://download.com.vn/snagit/download
   
   Link lấy key: https://www.serials.be/serial/Snagit_13_68803344.html 
  (Mở link >> Nhập capcha vào ô "Type here" >> Click vào "View in text" >> Key sẽ được hiển thị, lấy key này để registration Snagit)
 
 //Bạn có thể dùng bất kỳ phần mềm capture/record video khác mà không nhất thiết phải là Snagit. Hiện mình đang dùng Snagit thấy rất dễ sử dụng, có thể lấy link file trực tiếp, có nhiều options edit.
 
 * Trên thiết bị Android: Vào Play Store và tải về "**AirDroid**"
 
**2. HƯỚNG DẪN SỬ DỤNG**

**2.1.** Hãy kết nối máy tính của bạn và và thiết bị test cùng một mạng (network)

**2.2.** Mở AirDroid trên thiết bị 

Giao diện AirDroid: 

![](https://images.viblo.asia/6c417c34-d7f1-46b8-8a0d-31d7e1f31bb6.jpg)

**2.3.** Chọn AirDroid Web


![](https://images.viblo.asia/452156c3-dfdb-4a75-aadc-7ab8a242f855.jpg)


**2.4.** Trên màn hình AirDroid Web, chúng ta sẽ phản ánh device lên màn hình máy tính bằng *Option 2: Connect via IP address*

Tại Option 2, bạn sẽ thấy một địa chỉ IP, đây chính là địa chỉ được sử dụng để kết nối giữa thiết bị test và máy tính của bạn.

*Chú ý:* Mỗi thiết bị test sẽ có một địa chỉ khác nhau và bạn có thể kết nối nhiều thiết bị vào máy tính cùng 1 lúc mà không cần dây cáp.

![](https://images.viblo.asia/4a35e5bb-5c18-41db-a3f2-3181d26eebf8.png)

**2.5.** Nhập địa chỉ IP tại bước 2.4 vào trình duyệt web trên máy tính

Tại bước này, sau khi nhập địa chỉ IP vào trình duyệt trên máy tính sẽ xuất hiện một thông báo "Request to connect" trên thiết bị Android đang cần kết nối. Lúc này bạn hãy nhấn vào "Accept" nhé.
Sau đó nhấn vào thông báo đẩy connect xuất hiện trên thiết bị.

![](https://images.viblo.asia/92243ae2-496f-48fa-82de-12438271dd47.png)

**2.6.** Sau bước 2.5 trên trình duyệt màn hình máy tính sẽ hiển thị như dưới:

![](https://images.viblo.asia/b9b95abc-9348-47c9-b79c-7bf79dce9f5d.png)


**2.7.** Mở item "Screenshot" tại màn hình kết nối
Vậy là chúng ta đã kết nối được giữa máy tính và thiết bị di động. Lúc này mọi thao tác trên thiết bị kiểm thử của bạn sẽ được phản ánh lên máy tính. 

Bạn có thể sử dụng một phần mềm capture/record màn hình (Snagit, Zing...) để capture/record video những thao tác bạn thực hiện trên thiết bị test và lưu thẳng vào máy tính mà không cần phải sử dụng dây cáp.

![](https://images.viblo.asia/f4d7e829-7a4c-4c11-a4c6-50868f75d6d2.png)


Dưới đây là một video ví dụ mà mình record lại những thao tác trên thiết bị Android: (Sử dụng Snagit để record lại những thao tác trên thiết bị test)

https://www.screencast.com/t/l9ovK4Jw


### II. CAPTURE/RECORD VIDEO CHO CÁC THIẾT BỊ iOS

**1. CÁC CÔNG CỤ CẦN CÀI ĐẶT**

* Trên máy tính: 

   Tải về iTunes và cài đặt
   
   Tải về iTools 3 và cài đặt
   
   Tải về AirPlayer
   
   Bạn có thể tải ngay các phần mềm này tại đây:  https://drive.google.com/drive/u/1/folders/1kwl2tYfV_qSZBCAqFpALeAGZ-paF4ceV
 
 * Trên thiết bị iOS: Sử dụng chức năng **Screen Mirroring** đã có sẵn trên các thiết bị iOS
 
**2. HƯỚNG DẪN SỬ DỤNG**

**2.1.** Hãy kết nối máy tính của bạn và và thiết bị test cùng một mạng (network)

**2.2.** Mở AirPlayer đã tải về

Giao diện AirPlay:

![](https://images.viblo.asia/50b48b22-7c68-480b-8632-74b83d055a50.png)

Tại màn hình này bạn hãy chọn version tương ứng của thiết bị iOS mình cần kết nối, sau đó sẽ hiển thị màn hình dưới (mở lên và để vậy không tắt nhé):

![](https://images.viblo.asia/793b26c3-17f2-4bd0-b968-ed01121e2990.png)

**2.3.** Trên thiết bị iOS muốn kết nối, bạn chỉ việc mở chức năng Screen Mirroring đã có sẵn trên mọi thiết bị iOS và chọn đúng tên máy của bạn để kết nối. 

Chức năng Screen Mirroring trên iOS:

![](https://images.viblo.asia/4334634e-5c1f-4a20-9061-4a368039ee4f.PNG)

Dưới đây là một video ví dụ mà mình record lại những thao tác trên thiết bị iOS: (Sử dụng Snagit để record lại những thao tác trên thiết bị test):
https://www.screencast.com/t/Tz4vbH7OPD