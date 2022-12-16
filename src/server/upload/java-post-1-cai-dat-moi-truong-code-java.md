Hi all, Rất vui được chia sẻ những kinh nghiệm đang ở lv 0 java của mình đến các bạn, bài viết này mình sẽ hướng dẫn chi tiết làm sao để viết được chương trình đầu tiên với java, cùng theo dõi nhé :V

### Cài đặt java
Ngôn ngữ nào cũng vậy, muốn code chạy được thì cần có môi trường hoàn hảo, như vi khuẩn vậy, muốn phát triển nhanh, đẻ nhiều thì đầu tiên cần có nhiệt độ, độ ẩm thích hợp. ak ak, đang học môn sinh học lại nổi hứng viết nên có chút xuyên tạc, thôi không viết nữa. chúng ta đi vào thực hành.

### B1: Download jdk8
Đầu tiên chúng ta hỏi bác google sau đó các bạn có thể download jdk phù hợp với OS(Hệ điều hành) của mình, do mình dùng window nên mình download cho window.

Download jdk8[ tại đây](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

![](https://images.viblo.asia/373b4677-c1dd-4ba5-888d-fa42b34a8c5c.png)

![](https://images.viblo.asia/a2b01864-80bf-419f-a9cd-030debe89765.png)

Các bạn đợi một chút là down xong ấy :)
### B2: Setup jdk
Giờ đến bước cài đặt, giờ thì cứ ấn next thôi, dễ quá mà: 

![](https://images.viblo.asia/a5e795d3-9c8e-497b-9615-b7d6bdfd69cc.png)

### B3: Setup environment variable
Tiếp theo là cài đặt biến môi trường cho java, nào lét gô nhé:

Đầu tiên chúng ta mở của sổ RUN của window ra nhé (bạn nào không biết thì nhấn tổ hợp phím `window+R`) sau đó nhập vào `sysdm.cpl` xong nhấn Enter hoặc click chuột vào OK nhé!

[](https://images.viblo.asia/9a80f476-988a-485f-84ee-309cf9a08754.PNG)

Tiếp đến chọn thẻ `Advanced` => `Environment Variables`

![](https://images.viblo.asia/f54687d0-c0a5-4251-a24c-1c2641d7aedd.PNG)

Ở đây chúng ta thấy 2 lưa chọn đó là `User variables for (UserName)` và `System variables`. vì là biến system vaiable nên chúng ta sẽ setup vào `System Variables`.

![](https://images.viblo.asia/50347bcf-5335-4df9-9eaa-72ceaa1622e1.png)

Tiếp theo nhấn vào `New` cửa sổ `new system variable` hiện ra, điền `Variable name` vào.

Vd: JAVA_HOME

![](https://images.viblo.asia/173319bb-80f0-473c-a78f-b8be7fd9675a.png)

Trong ô `Variable value` chúng ta sẽ chỏ đến folder bin trong thư mục cài đặt java thường là C:\Program Files\Java\jdk1.8.0_191\bin

![](https://images.viblo.asia/6ff3856a-a771-4138-a360-9804f8598bfd.png)

Bước cuối thêm biến JAVA_HOME vào path
Để hoàn thành quá trình setup env cho java chúng ta cần add biến vừa tạo ra vào path. 

Các bạn tìm biến path trong system variables và nhấn vào edit, cửa sổ edit environment variable hiện ra, tiếp theo chọn New nhập tên biến %JAVA_HOME% và nhấn OK, 

![](https://images.viblo.asia/616b57bb-381f-4ed9-94bc-32765f40e70a.png)

Thế là xong, bây giờ chúng ta kiểm tra xem biến JAVA_HOME đã cài dặt thành công chưa nhé: 

Đầu tiên mở cmd xau đó thử  lệnh `ECHO %JAVA_HOME%` tiếp theo là kiểm tra version bằng lệnh `java --version` của java như hình, phiên bải java sẽ được hiện ra, nếu các bạn không thấy có thể là do sai ở bước nào đó kiểm tra lại xem nhé :)

![](https://images.viblo.asia/7f3292b5-3d1e-4ec8-b07e-e0bc8e8fe4ac.png)

Vậy là xong xuôi rồi nhé, bài viết này mình đã hướng dẫn các bạn cài đặt môi trường để code được java, bài sau mình sẽ hd cài eclipse và viết chương trình đầu tiên nhé!

Thanks kiu!