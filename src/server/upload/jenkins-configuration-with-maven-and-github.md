Git là hệ thống kiểm soát phiên bản hiện đại được sử dụng rộng rãi nhất trên thế giới hiện nay, cho phép nhiều người làm việc an toàn trong cùng một dự án mà không cản trở các thành viên khác trong nhóm. Là một phần của nhóm đang sử dụng Git, Bạn và các thành viên trong nhóm của bạn sẽ clone bản sao làm việc của kho lưu trữ cục bộ từ máy chủ Git. Bạn / nhóm sẽ thêm và cam kết các tập lệnh thử nghiệm được phát triển cục bộ và đẩy các thay đổi của bạn lên Git

Chúng ta có thể khiến Jenkins lấy mã nguồn dự án từ máy chủ Git từ xa, bằng cách chọn tùy chọn trong quản lý mã nguồn và chỉ định đường dẫn / url có thể tìm mã nguồn của dự án.

Trong ví dụ dưới đây, chúng ta sẽ configure plugin Git và gọi testng.xml bằng maven từ jenkins. Bạn có thể có các scripts/tests selenium của bạn được thêm vào testng.xml. Bạn cũng có thể tham số hóa selenium tests của mình bằng Maven-Testng

**Configure Git Plugin in Jenkins**

**Bước 1**: - Manage Plugins -> Lọc danh sách các plugin có sẵn với 'Plugin Git'. Tìm thêm chi tiết về Plug-in Git

**Bước 2**: - Kiểm tra Plug-in Git và nhấp vào nút Cài đặt mà không cần khởi động lại

**Bước 3**: - Sau khi cài đặt xong, bạn vui lòng khởi động lại Jenkins bằng cách sử dụng lệnh trong trình duyệt. http: // localhost: 8080 / jenkins / restart

Khi Jenkins được khởi động lại, tùy chọn Git sẽ khả dụng trong quản lý mã nguồn khi định cấu hình job

![](https://images.viblo.asia/c1f87e9d-09ff-459e-bc09-5fdc41c7b25b.jpg)

**Bước 4**: - Từ Manage Jenkins> Configure System, vui lòng cung cấp Đường dẫn đúng để Git thực thi.

![](https://images.viblo.asia/e01198e3-4813-4f46-b397-30b19ccf9828.jpg)

**Bước 5**: - Trong Plug-in Git, Đặt git user.name và user.email để khớp với các tùy chọn cấu hình toàn cầu của bạn

![](https://images.viblo.asia/2c9b2a68-d303-40fd-8bde-bede7250b010.jpg)

**Bây giờ chúng ta hãy tạo một Maven Project và build một job từ Git project**

**Bước 1**:- Click New Items -> Enter Project Name -> Chọn Maven Project -> Click OK

**Bước 2**:- Mô tả job

**Bước 3**:- Trong quản lý Source Code, Chọn 'Git' option

![](https://images.viblo.asia/f89a822c-5b5a-40c4-a7a0-e038d5fbc7c6.jpg)

**Bước 4**: - Từ Build Triggers, Nếu bạn muốn Jenkins giám sát kho lưu trữ và bắt đầu build bất cứ khi nào có bất kỳ thay đổi nào được thực hiện, chúng ta có thể chọn tùy chọn Poll SCM và nhập cú pháp của cron.

*Builds Periodically : sẽ kích hoạt các bản builds theo lịch trình (Nếu chúng ta chỉ định H / 5* * * * *, cứ sau 5 phút) ngay cả khi bạn không thay đổi gì. Pull SCM sẽ kiểm tra các thay đổi trước khi kích hoạt bất kỳ bản build nào, nếu có thay đổi cho phiên bản trước thì chỉ có bản build sẽ được kích hoạt.

Cả hai trường này theo cú pháp của cron bên dưới, bao gồm 5 trường được phân tách bằng TAB hoặc khoảng trắng: 

MINUTE (0-59), HOUR (0-23), DAY (1-31), MONTH (1-12), DAY OF THE WEEK (0-7)

* MINUTE -  phút trong khoảng từ  (0–59)

* HOUR -  giờ trong khoảng (0–23)

* DOM -  ngày trong khoảng (1–31)

* MONTH - tháng trong khoảng (1–12)

* DAY OF THE WEEK -  ngày trong tuần từ  (0–7) 

**Ví dụ**

- Nếu bạn muốn chạy job cứ sau 15 phút, chúng ta nên chỉ định cú pháp  như sau:H / 5 * * * *
- Nếu bạn muốn trigger, cứ sau 2 giờ H * / 2 * * * để phân phối tải đều trong suốt cả giờ

Ngoài các cách trên, Jenkins cũng hỗ trợ các tag tiện lợi như @yearly, @annual, @monthly, @weekly, @daily, @midnight và @hourly.

![](https://images.viblo.asia/907d65ff-ae31-4eea-a980-eff2840d607a.jpg)

**Bước 5**: - Trong Build Settings, để gửi thông báo email, bạn có thể kiểm tra 'Thông báo email' và thêm địa chỉ Người nhận được phân tách bằng dấu phẩy.

**Bước 6**: - Trong Post Build Actions, bạn có thể chọn các bước như Lưu trữ tạo tác, xuất bản kết quả, v.v.

**Bước 7**: - Nhấp vào Apply and Save.

Bây giờ theo cấu hình ở trên, bản build sẽ kích hoạt cứ sau 5 phút.
Khi quá trình xây dựng được kích hoạt, bạn có thể kiểm tra đầu ra console output, nó sẽ hiển thị cho bạn như hình ảnh bên dưới:

![](https://images.viblo.asia/27b81ea4-8df0-4748-adae-5fadf963082a.jpg)

Và cũng khi bạn xem thông tin bản build, nó sẽ hiển thị cho bạn như hình ảnh bên dưới có thông tin như ảnh sau

![](https://images.viblo.asia/3c183af0-2419-45c6-8f00-d1385a623337.jpg)

Vì chúng ta đang kích hoạt bản build cứ sau 5 phút, bạn có thể thấy các jobs đang chạy cứ sau 5 phút (hiển thị trong hình dưới đây).

![](https://images.viblo.asia/1dede9da-5e06-4394-86dc-7d8317f2dc70.jpg)

Hy vọng bài này sẽ có ích cho bạn! 

link tham khảo : 

https://www.seleniumeasy.com/jenkins-tutorials/configure-maven-github-jenkins-to-run-testng-xml