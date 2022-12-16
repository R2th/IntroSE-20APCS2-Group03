## Hôm nay mình sẽ trình bày với các bạn bài viết về việc migrate từ Xen Server đến VMWare Server.
##   Việc này thì có nhiều cách, cách mình hướng dẫn dưới đây khá basic và dể dùng, không yêu cầu nhiều về kỹ thuật.
### 1. Chuẩn bị<br>
1 Server Xen. <br>
1 Server VMWare. <br> 
1 Tool: StarWind V2V Image Converter. <br> 
1 Kiến thức nền tảng về 2 loại ảo hóa này. <br>
### 2. Tiến hành trên XEN Server <br>
Đầu tiên, trên Server XEN tiến hành  export VM:<br>
Lựa chọn VM -> Export.<br>
![](https://images.viblo.asia/c581857e-f4da-4b09-a744-256d2e29f98f.png)<br>
Lưu trữ đường dẫn và chọn format là: (*.ovf, *.ova)<br>
![](https://images.viblo.asia/7d9c972d-4902-4a3d-8961-abec31d771e9.png)<br>
Xác nhận lại, và click next<br>
![](https://images.viblo.asia/d0e82b17-6256-4a5b-af60-a3589b49cd14.png)<br>
Trong phần Advanced Options: bỏ tick tất cả các ô.<br>
![](https://images.viblo.asia/40caa242-5209-4649-ad58-2a9d504db219.png)<br>
Trong phần Transfer VM Settings: Tiến hành đặt UP tĩnh ( khi mình để DHCP thì export fail nên rút kinh nghiệm)<br>
![](https://images.viblo.asia/2fec913d-73f5-4e28-b8ae-98c082f6bc15.png)<br>
Kết quả hoàn tất - ta được 2 file export như hình bên dưới:<br>
![](https://images.viblo.asia/16e44887-5be0-462b-803e-41df15d2f5a2.png)<br>
### 3. Sử dụng Tool Starwind v2v Converter<br>
- Tool này free, bạn có thể search tìm trên trang chủ để download về dùng.<br>
- Mục đích của tool: Convert file *.ovf đã được export từ Xen Server thành *.vmdk để tương thích với VMWare.<br>
- Ta lựa chọn Local file<br>
![](https://images.viblo.asia/0e536c34-d950-4014-a709-1c4601bb2caa.png)<br>
Trỏ đến file *.ovf đã được export ban nãy<br>
![](https://images.viblo.asia/e5f2715d-6266-4b07-af78-04d38fdc54d8.png)<br>
Lựa chọn định dạng VMDK<br>
![](https://images.viblo.asia/9460d313-c2a3-471e-aa9e-f0f2569172ad.png)<br>
Lựa chọn VMWare Workstation growable image<br>
![](https://images.viblo.asia/2abf677b-e052-4875-a05e-65f83c4e1d9c.png)<br>
Qúa trình convert khoảng 10 - 15' tùy vào dung lượng file<br>
![](https://images.viblo.asia/75c98ac9-9ac9-47e8-9acb-85222bb03149.png)<br>
### 4. Tiến hành trên VMWare<br>
 Login vào Vcenter bằng vsphere hoặc trình duyệt ( tùy theo version của ESXi)<br>
 Lựa chọn datastore -> Browse Datastore..  (Mục đích là up file đã convert từ bước 3 lên)<br>
 ![](https://images.viblo.asia/f93fdd1d-072a-4e21-85d4-b5b6cd281269.png)<br>
 Lựa chọn upload files....<br>
 ![](https://images.viblo.asia/9cdb1419-1b7d-495b-9e46-5f634e96500c.png)<br>
 Qúa trình upload đang diễn ra...<br>
 ![](https://images.viblo.asia/1ab50ead-1256-4597-b9df-6fdcf05ef93c.PNG)<br>
 Upload thành công:<br>
![](https://images.viblo.asia/b4e3f6db-752e-4a21-a2ba-0179a921cdba.png)<br>
Chúng ta tiến hành tạo 1 VM mới.<br>
![](https://images.viblo.asia/49cf7fd9-4084-454c-b561-ad99323b1de1.png)<br>
Đặt tên phù hợp...<br>
![](https://images.viblo.asia/bce7f115-2767-4f55-b9af-a9c8731c9a61.PNG)<br>
Lựa chọn RAM, card mạng, CPUs....  nhưng lưu ý phần DISK<br>
phần này thay vì tạo mới - ta sẽ chọn Existing<br>
Có nghĩa là, ta sẽ sử dụng file convert khi nãy để làm disk cho nó.<br>
![](https://images.viblo.asia/237d7fe1-54ef-4421-b673-1541b9dade4b.PNG)<br>
OK, cứ next dần ( để default )...<br>
Kết quả thành công, ta Power on VM lên để check<br>
Data, mọi thứ vẫn còn nguyên vẹn.<br>
![](https://images.viblo.asia/63a4c141-c8b3-4f4c-bd34-d2d8d2c46288.png) <br>
Tới đây là kết thúc.<br>
Cảm ơn các bạn, anh (chị) đã đọc bài - bài viết còn basic, nếu có sai xót có thể góp ý để em(mình) cải thiện.<br>

Nguồn tham khảo; <br>
https://giritharan.com/move-virtual-machines-from-xen-to-vmware/<br>