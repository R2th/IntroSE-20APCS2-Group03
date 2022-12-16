# Giới thiệu
Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn cách để cài đặt Kali Linux trên các máy Mac chạy chip M1/M2 bằng phần mềm UTM và tránh lỗi trong quá trình cài đặt.

## Kali Linux
Kali Linux chắc hẳn đã quá quen thuộc với các bạn làm về Security và Pentest. Kali Linux là một bản phân phối Linux dựa trên Debian nhằm mục đích kiểm tra bảo mật, được phát triển và duy trì bởi Offensive Security. Kali Linux được ví như **Swiss Army Knife** trong tay các Hacker và các chuyên gia bảo mật.

Nó chứa hàng trăm công cụ hướng đến các nhiệm vụ bảo mật thông tin khác nhau. Chẳng hạn như kiểm tra thâm nhập, nghiên cứu bảo mật, kiểm tra máy tính và kỹ thuật dịch ngược. Kali Linux được phát triển và tài trợ bởi Offensive Security, một công ty đào tạo bảo mật thông tin hàng đầu.

## Macbook sử dụng chip ARM
Dòng chip M1 đầu tiên được Apple trình làng năm 2020 với vô số thống kê khủng về hiệu năng của kiến trúc SoC (System on Chip) mới do chính Apple phát triển trên kiến trúc ARM. Tuy có hiệu năng vượt trội nhưng do sử dụng kiến trúc ARM mới nên gặp phải tình trạng các ứng dụng cũ được viết cho nền tảng x86/x64 không thể chạy native trên chip ARM của Apple mà phải dùng một hệ thống giả lập là Rosetta 2.

Vấn đề không tương thích này khá nan giải với lập trình viên vì không thể chạy trực tiếp các ứng dụng, thư viện cho lập trình như Docker, NPM, Gradle... Bản thân mình cũng khá là chật vật cho việc cài đặt thư viện và phần mềm cần thiết cho con Macbook Pro M1. Hiện tại, qua hơn 2 năm ra mắt, các nhà cung cấp cũng đã dần release các phiên bản phần mềm hỗ trợ native cho chip ARM của Apple. 

Nếu bạn thường xuyên làm việc với hệ điều hành Kali Linux hoặc các công cụ của có trên Kali Linux, và bạn mới mua một chiếc máy Mac chạy Chip ARM thì bài viết này có thể có ích cho bạn và tiết kiệm một khoảng thời gian kha khá cho việc cài đặt một máy ảo Kali Linux để làm việc :D

# Cài đặt Kali Linux trên máy Macbook M1/M2
## 1. Cài đặt UTM
UTM là một công cụ hỗ trợ chạy máy ảo trên hệ điều hành Mac, có chức năng tương tự như các phần mềm VMware, HyperV. Lợi thế của UTM là nó hoàn toàn miễn phí và là mã nguồn mở. Ngoài ra, UTM cũng khá nhẹ và đã có bản chính thức hỗ trợ Mac M1

Đầu tiên là tải UTM: https://mac.getutm.app/

Sau khi tải về thì cài đặt như các phần mềm trên MacOS khác và nhấn đồng ý nếu ứng dụng hỏi các quyền truy cập hệ thống.

## 2. Tải bản image của Kali Linux
Truy cập trang chủ của Kali Linux: https://www.kali.org/get-kali/

Các bạn kéo xuống dưới mục Installer, chọn Tab Apple Silicon (ARM64) và chọn phiên bản muốn cài đặt. Ở thời điểm mình viết thì bản 2022.3 đang là bản Stable mới nhất. Mình thì highly recommend bản Installer vì là bản stable nhất, còn cách tải thì bạn có thể chọn tải trực tiếp file ISO hoặc chọn torrent nếu đã có tool get torrent hoặc đang dùng  trình duyệt hỗ trợ torrent.
![](https://images.viblo.asia/8da74de2-4ed3-4b52-bf98-aa92b07c4df7.png)<div align="center"></div>

## 3. Tạo máy ảo Kali Linux trên UTM

Đầu tiên, bạn mở phần mềm UTM lên và chọn vào mục **Create a New Virtual Machine**:

 ![image.png](https://images.viblo.asia/d8ba4ea5-7c6d-4da3-917d-0c0dfd957bc1.png)<div align="center"></div>
 
 Chọn mục **Virtualize**
 
 ![image.png](https://images.viblo.asia/bfb923a8-3fa1-4a1d-9ed8-56936d173965.png)<div align="center"></div><div align="center"></div>
 
 Ở mục Operation System, chọn **Linux**:
 
 ![image.png](https://images.viblo.asia/fec0a050-f5bd-431c-bbbb-c76fc9dddee7.png)<div align="center"></div>
 
 Ở Tab tiếp theo thì bạn để trống các mục **Virtualization Engine** và **Boot Image Type**, ở mục **Boot ISO Image** thì bạn chọn vào Browse và trỏ tới file ISO của Kali Linux đã tải về ở bước 2:
 
![image.png](https://images.viblo.asia/a7cf2de9-f9ef-4572-8f59-658190e40fca.png)
 
![image.png](https://images.viblo.asia/039e021a-7c1b-4920-927d-859c6ce0044d.png)

Chọn xong file ISO thì bạn chọn vào **Continue** để tiếp tục.

Ở mục Hardware thì phần **Memory** là dung lượng RAM thì bạn chọn **4096 MB** (4GB) và mục **CPU Core** thì bạn chọn **4**. Tùy vào mục đích cá nhân, bạn có thể chọn cấu hình cao hơn để đáp ứng. Mục **Hardware OpenGL Acceleration** bạn có thể chọn để enable. Cuối cùng bạn chọn **Continue**:

![image.png](https://images.viblo.asia/6742b059-fac1-44fa-80ee-b9b9215d80a1.png)

Mục tiếp theo Storage là dung lượng ổ cứng bạn muốn dùng để chạy Kali Linux, nên chọn tối thiểu là 30 GB
![image.png](https://images.viblo.asia/8b22f973-2597-430f-9607-f1c1c2256177.png)

Tiếp theo là phần **Shared Directory Path,** là phân vùng mà UTM sẽ dùng để lưu trữ dữ liệu của máy ảo Kali Linux. Bạn co thể chọn phân vùng Home trên máy hoặc tạo 1 Folder riêng để lưu trữ. Sau đó bạn chọn **Continue**:

![image.png](https://images.viblo.asia/3b4b7279-1d2a-4a7b-8b3f-90b4d7c5f65a.png)

Khi này một bảng **Summary** cấu hình của máy ảo sẽ hiện ra để bạn kiểm tra lại lần cuối. Bạn có thể đổi tên máy ảo cho dễ nhớ. Nếu thấy có mục cấu hình nào chưa đúng, bạn có thể chọn **Go Back** để chỉnh sửa lại. Cuối cùng bạn chọn **Save** để lưu lại cấu hình máy ảo.

![image.png](https://images.viblo.asia/29578b3f-4530-40f0-a07f-573358970eeb.png)

Sau khi tạo máy ảo thành công, bạn sẽ được đưa về trang Console của phần mềm UTM. Tiếp theo là phần Tricky nhất nè. Nếu thiếu bước này thì khi bạn bật VM lên để cài, sau khi nhấn Install sẽ thấy màn hình Đen thui luôn :(.   

Bạn chọn vào phần Edit selected VM ở phía trên bên phải màn hình 
![image.png](https://images.viblo.asia/b8b8ebba-d2b0-4d34-ae52-370fac16997e.png)

Một cửa sổ Setting sẽ hiện ra, bạn chọn New Device và chọn Serial:

![image.png](https://images.viblo.asia/0d5c385e-920f-40b8-9d37-751fbc73e3bb.png)

Chọn vào mục Serial mới được tạo ra, bạn sẽ thấy một cửa sổ thiết lập, sửa phần Font Size thành 20 và Save lại.
![image.png](https://images.viblo.asia/176c7353-5c44-42fa-bc09-21ec9ea996af.png)

## 4. Cài đặt Kali Linux lên máy ảo vừa tạo

Quay lại trang chủ của UTM. Bạn chọn máy ảo và nhấn vào nút Play để khởi chạy máy ảo. Khi này bạn sẽ thấy có 02 cửa sổ Terminal được tạo ra, hãy chọn Terminal có dòng chữ **(Terminal 1)** và nhấn **Install**. Chú ý là trong cửa sổ này không hỗ trợ GUI nên bạn phải dùng bàn phím để thao tác:

![image.png](https://images.viblo.asia/4ab5cb56-44f0-41ad-b941-8ac2db5589cd.png)

Đợi 1 lát thì cửa sổ tiếp theo sẽ là phần chọn **Language**, bạn chọn English

![image.png](https://images.viblo.asia/7fba2df0-884a-4645-8fcf-856054abba07.png)

Mục tiếp theo là **location**, nếu không cần thiết lập đặc biệt gì thì bạn có thể để mặc định United States.

![image.png](https://images.viblo.asia/f1c0c325-9de9-4d47-aa38-c1820958ad68.png)

Tiếp theo là phần chọn loại Keyboard, bạn để mặc định thôi.

![image.png](https://images.viblo.asia/cde205d1-31b1-44b1-8015-40b9ee57bdb4.png)

Sau khi máy cài các settings thì cửa số tiếp theo là đặt **Host name** cho máy, bạn có thể  thay đổi nếu muốn:

![image.png](https://images.viblo.asia/86588d94-6541-47b7-a90a-aefd35396ab9.png)

Phần tiếp theo là **Domain name**, bạn có thể để trống:

![image.png](https://images.viblo.asia/4d848c5b-3c7c-4e77-a3ce-d79badcb4330.png)

Tiếp theo là cài đặt **Full name** và  **Username** cho tài khoản root, phần Fullname có thể để trống:

![image.png](https://images.viblo.asia/44aa355a-0a14-4a14-8077-5164d80acc5f.png)

Sau đó là tới phần nhập Password và Re-enter Password:
![image.png](https://images.viblo.asia/7411eb5d-11af-4214-9630-8410e603dce8.png)

Tiếp theo là cửa sổ cài đặt Time zone, bạn có thể để mặc định:

![image.png](https://images.viblo.asia/187c6945-5fc2-4e9d-a003-337f9fc3707a.png)

Mục kế tiếp là tùy chọn phân vùng ổ cứng như dùng toàn bộ ổ cứng, có sử dụng **Logical Volume Management (LVM)** hay không. Nếu không rõ thì bạn nên để mặc định.

![image.png](https://images.viblo.asia/ef17563b-d43f-464a-8ed2-3e0482091c67.png)

Tiếp theo là chọn ổ đĩa để phân vùng, do là tạo VM nên sẽ chi có 01 ổ cứng hiện lên.

![image.png](https://images.viblo.asia/2e9eb5c9-4207-44d2-a241-ce85ff92fbcb.png)

Tiếp theo là chọn cách phân chia vùng nhớ trên ổ cứng, nếu không cần thiết lập gì đặc biệt thì để Default thôi ạ

![image.png](https://images.viblo.asia/3b534347-d7bc-44c3-89d0-1c97faee9fa2.png)

Cuối cùng là một bảng Overview, chọn Finish để bắt đầu cài đặt.

![image.png](https://images.viblo.asia/858144c5-a88d-45a7-b293-ec8c6b5815d2.png)

Kế tiếp là bảng chọn GUI mà mọi người muốn cài đặt, nếu không cần thay đổi thì để mặc định và chọn Continue

![image.png](https://images.viblo.asia/1e0c8160-1dcc-4576-95de-fbcd445dcf92.png)

Sau khi việc cài đặt hoàn tất, một cửa sổ yêu cầu bạn remove installation media ra khỏi máy trước khi Reboot lại sẽ hiện ra. Bạn không chọn gì cả mà Shutdown máy ảo đi (ở cả 2 cửa sổ).

![image.png](https://images.viblo.asia/0fba34c2-089b-4501-8a20-a5e88b66d0e5.png)

Chọn máy ảo mà bạn mới tạo, ở mục **CD/DVD** chon **Clear** để remove file ISO dùng để boot khỏi máy áo. Điều này tương đương khi bạn cài trên máy thật, khi cài xong phải bỏ USB cài ra để hệ thống có thể boot vào OS.

![image.png](https://images.viblo.asia/79711803-8b23-4d0a-bf99-75751e732b98.png)

Cuối cùng là bạn vào phần Setting của máy ảo để xóa thiết bị Serial mà bạn đã thêm ở phần trước đi.

![image.png](https://images.viblo.asia/e0fe4162-fb8e-45f1-8be5-39a549cb4826.png)

Congratulation, đến đây coi như việc cài đặt hoàn tất, bạn chỉ cần bật máy ảo lại và đăng nhập

![image.png](https://images.viblo.asia/e018ebc5-41fc-4ec9-8b49-8b1348a0a548.png)


# Kết luận
Hy vọng bài viết của mình có thể giúp các bạn tiết kiệm thời gian trong việc cài đặt Kali Linux trên máy Mac dùng chip ARM. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

# Tham khảo
1. https://www.youtube.com/watch?v=9zdjQ9w_v_4