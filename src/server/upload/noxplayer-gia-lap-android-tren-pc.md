# Noxplayer - Giả lập android trên PC

### I. Giới thiệu về Noxplayer

Ngày trước mình biết tới Noxplayer ngoài việc cần một máy ảo android để chơi game, thì mình còn dùng nó với mục đích code với Android. Mình đã một thời từng dùng các loại máy ảo như Genymotion, Bluestack, KOPlayer, máy ảo được tích hợp trong android studio,... Nhưng lâu dài, mình lại quen thuộc với Noxplayer hơn.

NoxPlayer có những ưu điểm như sau:

- Tối ưu tốt, ít tốn RAM và CPU
“Mượt”, đây là cảm giác đầu tiên khi mình chuyển từ Genymotion sang Noxplayer. Việc tương tác trên Noxplayer nhanh đến mức mình ko cảm giác sự khác biệt khi mình làm việc trực tiếp với window. Khác hẳn lúc lúc làm việc với Genymotion, mình sẽ cảm nhận được sự delay giữa các thao tác click, chuyển màn hình.

- Hỗ trợ game tốt, tương thích tuyệt đối, tính năng multi-driver
Mình ngày trước cũng hay chơi game trên mobile, nhất là các tự game cày cuốc thì dùng Noxplayer khỏi chê vào đâu được. Nhất là mình có thể bật 1 lúc 2, 3 cái máy ảo để đăng nhập tài khoản. Chưa kể nó tương thích cao với game với ứng dụng, dù có là game mới hay game cũ khi cài vào đều có thể sử dụng rất tốt

- Dễ cài đặt, dễ sử dụng, hỗ trợ tốt trên các hệ điều hành
Cài đặt sử dụng Noxplayer cũng vô cùng đơn giản. Chỉ cần download về và sau vài cú click chuột mình đã sử dụng được.

Và đây là yêu cầu thông số khi cài đặt Noxplayer

<br>
<br>

![](https://images.viblo.asia/1f25a673-a86f-4bcb-9089-a7d6c299d9e7.PNG)

<br>

- Có sẵn CHPlay trên máy ảo
Đây là điều mình khá thích, bởi vì đôi lúc mình cần phải download và thứ trên chợ. Như một số máy ảo khác thì còn phải cài đặt thêm CHPlay khá loằng ngoằng mất thời gian.

<br>
<br>

### II. Cài đặt Noxplayer

<br>

**Bước 1:** Bạn vào trang chủ để tiến hành download NoxPlayer https://vn.bignox.com/

<br>

Phiên bản mới nhất lúc mình viết bài viết này là 6.2.7.1

<br>
<br>

**Bước 2:** Cài đặt

![](https://images.viblo.asia/ede20d76-2513-4f93-aedc-3790707d85f4.PNG)

Các bạn cứ click install và đợi cho đến khi finish là xong

![](https://images.viblo.asia/6d6cacce-3792-499b-ab54-b8a681ebf3b5.PNG)

Như này là đã cài xong

![](https://images.viblo.asia/6fdff665-6d9c-43b4-9897-c70ddb409f85.PNG)

Mình hay chọn chế độ Root + chọn Resolution setting là Mobile phone

![](https://images.viblo.asia/895311ce-65cd-4e5a-9360-c901492b1680.PNG)


<br>
<br>

### III. Các tham số dòng lệnh mà Noxplayer hỗ trợ

<br>

Đây là 1 trong số những support mà mình thích nhất. Bản thân mình là dev, nên đôi khi muốn tự tạo các máy ảo theo các thông số mình cần để test và chạy chương trình.

<br>

Để thực hiện tính năng này, bạn vào command prompt và dùng lệnh cd vào thư mục bin của Noxplayer. Như của mình là D:\Program Files\Nox\bin

![](https://images.viblo.asia/541fc3e7-105e-4c78-ad7f-c2370a9ba136.PNG)


**1.1 Tên của mỗi đối tượng Nox (hiện thị ở góc trên bên trái của cửa sổ Nox)**
<br>

-title:<player_name>

Ví dụ:

Nox.exe "-title:Demo Cmd Noxplayer"

![](https://images.viblo.asia/1059c3c2-4d85-4427-8234-7515bb506c20.PNG)
 
![](https://images.viblo.asia/ab40f480-7884-4bf2-b3d8-a5b96cc24a74.PNG)
 
**1.2 Ngôn ngữ và vị trí**

a) Cài đặt ngôn ngữ hệ thống Nox. Nox hỗ trợ 4 cài đặt ngôn ngữ là zh-Hans: tiếng Trung, en: tiếng Anh, ko: tiếng Hàn, jp: tiếng Nhật.

-lang:\[zh-Hans|en|ko|jp]

<br>

b) Thiết lập vị trí

-locale:\<locale>
    
Ví dụ
    
Nox.exe -lang:en -locale:sg

<br>
    
**1.3 Cài đặt hiển thị màn hình như định hướng, độ phân giải và dpi**
<br>

a) Định hướng màn hình: ngang (trên máy tính bảng), dọc (trên điện thoại). Nox sẽ tự động điều chỉnh kích thước, độ phân giải và dpi thích hợp tùy thuộc vào độ phân giải màn hình máy tính.

-screen:\[horizontalvertical]

Ví dụ:

Nox.exe -screen:vertical

<br>

b) Tùy chỉnh độ phân giải

-resolution:\<resolution>

Ví dụ

Nox.exe -resolution:1440x900

<br>

c) Tùy chỉnh dpi

-dpi:\<dpi>

Ví dụ

Nox.exe -resolution:1440x900 -dpi:270

<br>

**1.4 Cài đặt hiệu suất**

<br>

a) Cài đặt hiệu suất có ba tùy chọn: thấp, trung bình, cao.

-performance:\[low|middle|high]

Ví dụ:

Nox.exe -performance:high

<br>

b) Tùy chỉnh phân bố CPU và RAM cho Nox. Bạn phải đặt cả hai tham số cùng một lúc. Chỉ thiết lập một tham số sẽ không hoạt động. Nếu không kích hoạt VT trên máy tính, bạn sẽ chỉ có thể thiết lập 1 CPU và 2048 MB bộ nhớ ở mức tối đa.

-cpu:<cpu_number> -memory:<memory_in_mb>

Ví dụ:

Nox.exe -cpu:1 -memory:1024
<br>

**1.5 Root**

<br>

Chọn để cho phép hoặc ngăn hệ thống Android được root.

-root:\[true|false]

Ví dụ:

Nox.exe -root:false

<br>

**1.6 Cài đặt hiển thị phím ảo**

<br>

Chọn để hiển thị hoặc ẩn ba phím ảo của hệ thống Android.

-virtualKey:\[true|false]

Ví dụ:

Nox.exe -virtualKey:true

<br>

**1.7 Thay đổi IMEI**

<br>

-imei:xxxxxx

Ví dụ

Nox.exe -imei:864394100050568

Lưu ý: Tham số này chỉ áp dụng cho phiên bản Nox 3.1. Hãy thoát Nox trước khi thay đổi IMEI bằng cách sử dụng dòng lệnh.

<br>

**1.8 Thay đổi hãng sản xuất và model thiết bị di động**

-manufacturer:google

-model:Nexus5

Ví dụ:

Nox.exe -manufacturer:googleNox.exe -model:Nexus5

<br>

### IV. Làm việc với android studio

<br>

Khi dùng Noxplayer làm việc với android studio, đôi lúc mình hay bị mất kết nối với android studio. Bình thường bạn chỉ cần tắt noxplayer đi bật lại là ok. Nhưng có 1 cách khác bạn không cần phải làm điều này đó là dùng lệnh connect lại là được.

<br>

Đầu tiên bạn cần cd vào thư mục bin của Noxplayer. Sau đó nhập lệnh 
**nox_adb.exe connect 127.0.0.1:62001**


<br>
<br>


## Ở trên là vài điều chia sẻ của mình về Noxplayer. Cám ơn mọi người đã theo dõi!