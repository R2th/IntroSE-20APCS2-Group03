![](https://images.viblo.asia/fb65951b-94d0-4e65-919b-d6cc5349b7d6.png)

*(Với lộ trình ban đầu thì Google ra mắt muộn hơn dự tính do nhiều nguyên nhân)*


Hiện nay phiên bản Android 11 đang được mong đợi nhất đã ở phiên bản Beta cuối cùng và là bản thử nghiệm với hiệu năng ổn định nhất. Trước khi nó được ra mắt phổ biến cho đại đa số người dùng Android, trên vai trò developer chắc hẳn anh em đã chạy thử Android 11 simulator rồi nhưng hôm nay bạn có thể chạy nó trên thiết bị thật để trải nghiệm nhé. Và bài viết này sẽ trình bày chi tiết các bước để cài đặt Android 11 Beta Step by step chúng ta cùng thực hành!

**Chúng ta sẽ có 2 phương án để cài đặt**, bạn có thể chọn cách phù hợp (quan điểm cá nhân mình thích cái số 2 hơn :D )

### 1. Cài đặt qua Android Flash Tool

Đây là phương pháp làm rất dễ dàng và gần như là tự động bạn sẽ có phiên bản Android 11 Beta mới nhất trên thiết bị của mình nhưng đừng quên sao chép dữ liệu quan trọng ở nơi an toàn để tránh gián đoạn công việc của mình nha. Bao giờ cũng vậy đây là bước mình hay thực hiện trước khi thử nghiệm phiên bản mới :wink:

Bước 1: Bạn cần đăng nhập tài khoản gmail của bạn trên thiết bị cần cài đặt ( Ở mục **Google Account**)

Bước 2: Tiến hành đăng ký làm người dùng thử nghiệm phiên bản mới của Google tại đây ([Link sign up here](https://www.google.com/android/beta))

Bước 3: Kết nối thiết bị với máy tính (Mac, Linux, Window) hiện có thông qua USB cable

Bước 4: Truy cập Android Flash Tool ([Link access](https://flash.android.com/welcome?continue=%2Fpreview%2Fbeta3))

Bước 5: Chọn phiên bản bạn muốn và quá trình cài đặt tự động diễn ra. Ngồi chờ cho em nó hoàn thành và hưởng thụ thôi :D 

**Note:** 

- Thiết bị cần phải có ít nhất 10Gb trống để cài đặt

![](https://images.viblo.asia/48305035-f89d-4ece-a81d-2910b45405d5.png)

### 2. Tự mình cài

Bạn sẽ phải tự làm tất cả các bước nói đơn giản là như vậy. Chắc hẳn anh em cũng đã quen với việc cài đặt nhiều thứ trên máy của mình rồi từ ROM, Firmware v..v cái gì tự mò nó vẫn có cái sướng của nó phải không nào. Và nó cũng không phải là khó.

**Bước 1:** Bạn cần vào image OTA store của Google tải về phiên bạn tương ứng với điện thoại hiện có của mình. [Link OTA](https://developer.android.com/preview/download.html)

![](https://images.viblo.asia/7195e6b0-23d4-4b60-a88b-4dc1f095e09b.png)

**Bước 2:** Kết nối điện thoại với máy tính qua USB cable

**Note:** Máy tính của bạn phải được cài đặt ADB Tool ( Cái này AE Android Developer nào cũng có rồi thì bỏ qua ) Nếu bạn chưa cài thì download Android Studio về cài vào là có đủ bạn nha.

**Bước 3:**  Mở CMD (Window PC) hoặc Terminal (Linux & MAC).

**CMD:** gõ `adb` 

**Terminal:** gõ` ./adb `

**Bước 4:** Đưa điện thoại của bạn về chế độ Recovery Mode theo từng bước dưới đây, bạn nên làm chậm tránh nhầm lẫn ở bước này

- Tắt máy
- Bấm đồng thời phím nguồn + giảm âm lượng
- Đến khi thấy menu hiện ra hãy dùng các phím tăng giảm âm lượng để điều hướng tới **Recovery Mode**
- Khi đang chọn Recovery Mode thì bấm tiếp phím Nguồn để bắt đầu thực thi
- Bây giờ bạn sẽ thấy biểu tượng Android xuất hiện
- Bấm đồng thời phím Nguồn + Tăng Âm lượng trong 1s
- Nhả nút Tăng âm lượng ra => Bạn đã vào chế độ recovery rồi đó
- Lại dùng phím âm lượng để chọn "**Apply update from ADB**"
- Bấm nút nguồn để chọn 
- Bạn sẽ thấy 1 màn trống cho bạn biết rằng cần tải 1 bản OTA về. Hãy quay lại máy tính và tiếp tục bước 5 nha. Sắp xong đến nơi rồi.

**Bước 5:** Nhập tên file zip đã tải về ở trên. AE ném vào đâu cho dễ tìm nha, giờ mò lại folder Download mệt lắm :D Nhập xong thì Enter phát cho nó run

**Bước 6 (Final Step)** Chờ 1 lúc để nó nạp OS Android 11 khi hoàn tất thì máy bạn lại quay trở về Recovery Mode. Hãy rút cable ra và dùng phím âm lượng để chọn **Reboot now**

![](https://images.viblo.asia/d25d9962-3b8e-436c-90b6-365bd47af07e.jpg)


### 3. Các thiết bị hỗ trợ cài đặt Android 11

Danh sách thiết bị để hỗ trợ Android 11 tương đối hạn chế ít nhất là ở thời điểm hiện tại và tất cả thuộc về các máy điện thoại của Google họ Pixel dưới đây :

**Google Pixel 4 / 4XL, Pixel 3a / 3a XL, Pixel 3 / 3 XL, and Pixel 2 / 2 XL**

Nếu như chưa có các thiết bị kể trên thì bạn vẫn có thể cài đặt và sử dụng trên simulator để phục vụ công việc trước mắt của mình, nhưng để lâu dài anh em nên có cho mình 1 trong các thiết bị trên nha.

### 4. Tổng kết 

Trên đây là bài viết hướng dẫn cài đặt Android 11 phiên bản Beta mới nhất, với mong muốn anh em cập nhật hệ điều hành mới phục vụ tốt cho công việc nghiên cứu và phát triển của riêng mình. Hy vọng bài viết sẽ thực sự hữu ích đến ai đó đang cần, nếu có thắc mắc bạn vui lòng comment để được hỗ trợ từ mình và cộng đồng.