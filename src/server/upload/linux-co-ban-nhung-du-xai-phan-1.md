Khi còn ngồi trên ghế nhà trường hoặc sinh viên thì mình thường xuyên sử dụng hệ đề hành window cho đến khi đi thực tập có họ bắt cài hệ điều hành ubuntu. Ôi nhìn lạ hoắc một sự mới mẻ và mới đầu trải nghiệm nó nói thật là mình thấy chả có thú vị gì cả. Tại sao lại k dùng window mà lại cài cái này :) . Từ đó mình tìm hiểu thêm về linux và cũng tự giải thích được cho bản thân tại sao lại phải dùng linux (đơn giản vì nó nhẹ và free, mã nguồn mở và bảo mật .... ). Đặc biệt với lập trình web thì cần phải biết và làm việc ở mức độ cơ bản được với server đối với các dòng lệnh nên hôm nay mình cũng xin tổng hợp và chia sẻ lại những gì mình nghĩ là cơ bản và cần thiết để mọi người có 1 cái nhìn tổng quan và  mới mẻ hơn về linux cũng như biến những cái trước mọi người coi lại phức tạp thành đơn giản hơn. <br>
Oke bắt đầu thôi nào.
# I.Kernel, Operating System (GNU/ Linux), Shell, Distribution/Distro chúng là gì? 
### 1. Kernel


![](https://images.viblo.asia/02831a57-8125-4cfa-bdcc-5c205a2ba127.PNG)

Như hình bên trên thì 1 máy tính sẽ là tập hợp của các hardware (phần cứng) gồm: CPU, memory, I/O devices <br>
Ở phần **data** mình nói gọn lại là thao tác người dùng ví dụ như muốn lấy mở 1 thư mục để lấy dữ liệu từ phần cứng thì nó k thể lấy trực tiếp từ  **data**  sang **hardware** mà bắt buộc phải đi qua thằng **Kernel** <br>

**Kernel** (nhân) bản chất của nó là 1 cái chương trình máy tính có khả năng truy cập và quản lý các tài nguyên của phần cứng. 
Như hình trên ví dụ như người dùng mở 1 phần mềm thì **Kernel** sẽ quyết định rằng phần mềm này sẽ được cấp bao nhiêu memory hay xử lý CPU như thế nào...

**Chú ý**: Khi các bạn mới tiếp xúc với linux các bạn có thể nhầm linux là 1 cái hệ điều hành như window, macOS, ... nhưng thực tế nó không phải 
Linux nó chỉ là 1 **Kernel** (nhân) hay mĩ miều hơn là trái tim của hệ điều hành (tức là hệ điều hành sẽ chứa Kernel và bắt buộc phải có nó) 


### 2. Operating System (hệ điều hành) GNU/Linux
![](https://images.viblo.asia/6bc3470d-effe-49ff-aaee-0aaec6a36eaa.PNG)


Trên hình trên mình muốn nói đến là hệ điều hành **GNU/ Linux** <br>
**Linux** như ở phần 1 mình đã nói rồi nó thực chất là Kernel <br>
**GNU**  ( GNU is Not Unix) nó là các câu lệnh rm, ls, chmod, ... và nó được viết bằng ngôn ngữ C <br>
Các bạn có thể tham khảo thêm source code của nó ở đây
https://github.com/coreutils/coreutils/tree/master/src <br>
Sơ lược sự ra đời của hệ điều hành **GNU/Linux** : <br>

Ngày xưa có hệ điều hành gọi là **Unix** (mã nguồn đóng) 
Ở đây mình giải thích qua 2 cái **mã nguồn đóng và mở** là gì? <br>
Các bạn có thể hiểu đơn giản khi các bạn chỉ nhìn thấy 1 chức năng thực hiện các tác vụ nào đó nhưng k biết bên trong nó làm gì để làm ra nó (tức ở đây là viết bằng ngôn ngữ gì hay có thể xem hoặc chỉnh sửa được không) thì đó là **mã nguồn đóng** còn ngược lại là **mã nguồn mở** <br>

Chính vì **Unix** là hệ điều hành mã nguồn đóng nên ta không thể xem được source bên trong đó và lúc đó có 2 người cùng chung 1 ý tưởng: <br>
* Một người tạo ra Linux (**Kernel**) có thể làm việc được với **hardware** và các chức năng ý chang hay gọi là clone từ **UNIX**
* Một người tạo ra **GNU** tức là các tập câu lệnh có thể nói là y chang  hệ điều hành **UNIX**

Vậy là 2 ý tưởng đều là muốn tạo ra mã nguồn mở và chức năng muốn clone từ **UNIX** gặp nhau và tạo nên 1 hệ điều hành hoàn chỉnh mang tên hệ điều hành  **GNU/Linux** (có thể gọi tắt là hệ điều hành linux)
### 3. Shell
![](https://images.viblo.asia/72679e91-01c9-4a29-a06e-f7b4bb065f73.PNG)



Như hình trên các bạn có thể thấy **Shell** sẽ bao bọc **Kernel** tức là sao? <br>

Nghĩa là khi bạn muốn lấy thông tin, dữ liệu, ... từ **hardware** thì nó các bạn sẽ phải sử dụng các câu lệnh như ls, mv,...  gọi đến **Kernel** để Kernel xử lý nhưng Kernel nó lại k thể hiểu được ngôn mấy cái cú pháp ls, mv, ... là cái gì. <br>

Lý do là vì  **Kernel** nó thực hiện nhiệm vụ làm việc với phần cứng và chỉ hiểu được ngôn ngữ nhị nhân (01).<br>
Chính vì vậy **Shell** sinh ra như là 1 thằng phiên dịch để giúp Kernel có thể hiểu được các câu lệnh của **GNU** và nó cũng là 1 chương trình máy tính mà thôi.

### 4. Distribution/Distro




**Distribution** là các bản phân phối linux hay còn gọi tắt là **Distro** giúp người dùng có thể tùy chỉnh  và tự do phát triển và định hướng  theo nhu cầu thực tế của mình cái mà hệ điều hành mã nguồn đóng bị hạn chế. <br>

Như hình dưới đây ta có thể thấy có rất nhiều bản  **Distro Linux**:

![](https://images.viblo.asia/ec3e75b4-cb25-4b7b-8eef-8d8eacf30743.png)

Thực ra có nhiều bản phân phối  nhưng bản chất nó vẫn  dùng chung cấu trúc của **OS GNU/LINUX** và có bổ sung thêm 1 số cái như hình bên dưới: <br>

![](https://images.viblo.asia/dc27d286-6995-4d45-ab12-c61c074e3334.PNG)
                                                                                                                                   
**Package manager**: Là những công cụ quản lý các gói tập tin như trong  như DPKG (debian), APT (ubuntu, debian), RPM (Red Hat), YUM (Centos), .... giúp ta dễ dàng cài đặt các chương trình (cái này gần như là bắt buộc phải có) <br>

**Destop enviroment**: Các bạn có thể hiểu đơn giản nó là các bản giao diện đồ họa thân thiện và giúp chúng ta tương tác dễ dàng hơn chứ phải là kiểu dòng lệnh đơn thuần như trước nữa. Có vài cái tên **GNOME Desktop** và **Unity Desktop**, ...2 cái này thường được sử dụng làm giao diện cho ubuntu <br>

**Graphical programs**: Ứng dụng đồ họa  ví như Chrome, GIMP,  Mozilla Firefox, LibreOffice, ....

Ví dụ: Như hệ điều hành ubuntu  nó sẽ sử dụng **Destop enviroment** là **GNOME Desktop** hoặc **Unity Desktop** và **Package manager** là **APT** và thêm **Graphical programs** như LibreOffice, Mozilla Firefox, .... (nếu cần).
<br>

Bài này của mình cũng khá dài rồi nên mình kết thúc bài ở đây nhé <br>
Các bạn có thể xem phần 2 của mình ở [đây](https://viblo.asia/p/linux-co-ban-nhung-du-sai-phan-2-bJzKmr36Z9N)

Tài liệu tham khảo: <br>

https://viblo.asia/p/linux-101-bo-ngo-buoc-vao-the-gioi-linux-oOVlYWOQK8W <br>
https://kimochimart.com/linux-tim-hieu-ve-cac-khai-niem-kernel-operating-system-shell-distribution-distro/