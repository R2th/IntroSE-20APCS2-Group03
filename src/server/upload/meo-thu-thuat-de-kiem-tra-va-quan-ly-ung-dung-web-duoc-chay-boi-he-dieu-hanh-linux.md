### Cách kiểm tra, quản lý và định cấu hình ứng dụng web được chạy bởi hệ điều hành Linux:

Hãy cùng tìm hiểu cách quản lý hệ điều hành đang phát triển nhanh nhất hiện nay trong lĩnh vực thử nghiệm ứng dụng web. Những điều sau đây có thể áp dụng nếu ứng dụng của bạn đang chạy trên các máy chủ được vận hành bởi bất kỳ phân phối nào giống Unix.

Hướng dẫn này sẽ hữu ích cho bất kỳ người dùng Linux mới làm quen nào trong quá trình giáo dục của mình. Đặc biệt, phần lớn các câu hỏi thường gặp mà chúng tôi phải giải quyết trong quá trình nghiên cứu Linux của chúng tôi được mô tả dưới đây.

**Những gì bạn sẽ học trong Hướng dẫn này:**

Chúng tôi sẽ chạy qua một vài chủ đề thiết yếu mà bất kỳ Kỹ sư QA nào cũng có thể gặp phải trong quá trình quản lý và kiểm tra các ứng dụng web do Linux OS điều hành:

1. Linux vs Windows.
2. General * nix "must know".
3. Tên và đường dẫn giới hạn.
4. Quản lý công việc và quy trình.
5. 3 cách chính để cài đặt phần mềm mới.
6. Dụng cụ cơ bản để tự kiểm tra

![](https://images.viblo.asia/4fce8a08-f3d4-4b57-807e-48126defbcdf.jpg)

Ít liên quan đến lịch sử. Đó là một công việc khó khăn bởi những người theo Linux thực sự để mang lại * nix OS cho Cộng đồng CNTT trong quá khứ. Nhờ có họ, hệ điều hành này đã hoạt động tốt.

Thống kê toàn cầu đề cập đến phần lớn các máy chủ ứng dụng siêu máy tính và máy chủ ứng dụng tải cao được vận hành bởi Linux. Các máy chủ Linux thường có môi trường ổn định và hiệu quả được thiết kế để được chia sẻ bởi một số lượng lớn người dùng (ví dụ: mạng xã hội).

**Hãy bắt đầu với một vài so sánh:**

### Windows vs Linux:
![](https://images.viblo.asia/eae1be5e-46e0-4c59-9421-fcf3f9997a63.jpg)
1. Ưu điểm chính và thực sự cân bằng của Linux là miễn phí: FLOSS (Phần mềm miễn phí / Libre và mã nguồn mở). Ngoài ra, các phần mềm và trình điều khiển khác nhau đã được bao gồm trong phần lớn các bản phân phối cũng miễn phí.
2. Hỗ trợ, sửa lỗi và các tính năng mới được cung cấp bởi cộng đồng Unix (nhà phát triển và nền tảng trên toàn thế giới) thay vì Windows được phát triển và hỗ trợ bởi tập đoàn duy nhất của Microsoft.
3. Linux cực kỳ linh hoạt và sẵn sàng cho mọi cấu hình và thay đổi của người dùng. Nó dẫn đến bất kỳ hệ thống nào là duy nhất và dành riêng cho người dùng. Thật không may, điều đó không đúng về Windows được cài đặt trên PC của bạn.
4. Ngoài ra, đến thời điểm trước đó, tất cả các nỗ lực của tin tặc và nhà sản xuất phần mềm độc hại nhằm phá vỡ bảo mật Linux với vi-rút don don đều có tác động thực sự. Nói một cách thẳng thắn, nó không có ý nghĩa và không phổ biến. Linux an toàn và ổn định hơn Windows.
5. Như chúng tôi đã đề cập ở trên, hiệu suất cao được người dùng web và viễn thông mong đợi. Chúng ta không thể bỏ qua điểm rằng phần cứng tương tự sẽ có năng suất cao hơn đáng kể nếu được chạy bởi Linux. Hơn 95% (!) Siêu máy tính được vận hành bởi * nix. Đó không phải là sự trùng hợp!

Đây chỉ là một phần của tất cả các lợi thế chúng tôi có thể liệt kê ở đây. Hãy tiếp tục.


**Mẹo và thủ thuật thuần hóa chim cánh cụt: thử nghiệm ứng dụng web**

### General *nix  "must know":
**Chúng ta hãy bắt đầu từ một số điểm cần thiết nhưng đơn giản ở đây:**

* Lệnh tốt nhất để người dùng Linux mới bắt đầu sử dụng là **man**: nó hiển thị các trang thủ công trực tuyến cho lệnh được chỉ định. Ví dụ: *man ls*. Lệnh này sẽ trả về thông tin liên bạn muốn tìm hiểu: Tên, Tóm tắt, Mô tả, Tùy chọn.
* Tên lệnh, đường dẫn, tên tệp là trường hợp nhạy cảm. Ví dụ: “test.log” và “TEST.log”  có thể là các tệp khác nhau trong cùng một thư mục.
* Sử dụng khoảng trắng trong tên tệp trong thiết bị đầu cuối (bàn điều khiển) sẽ gây ra hành vi không chính xác vì ban đầu không gian được sử dụng để trỏ nhiều đối số của lệnh. Thay vào đó, hãy sử dụng dấu gạch dưới hoặc CamelCase (PascalCase) (ví dụ: “test_log” hoặc “testLog” thay vì “test log”).
* Để đổi tên một tệp bằng lệnh mv: mv test.tar.gz temptest.tar.gz. Nó thay đổi tên của test.tar.gz thành temptest.tar.gz.
* Không có  "**undo**". Nó không thể khôi phục các tập tin bị ghi đè hoặc sửa đổi về trạng thái ban đầu của chúng trong Linux.
* Không có  "**Trash**" hay "**Recycle Bin**".. Không có khả năng khôi phục các tệp và thư mục đã xóa bằng các công cụ tiêu chuẩn trong phần lớn các bản phân phối Unix. Vì vậy, hãy đảm bảo bạn chỉ xóa các tệp cần thiết: chỉ định tham số duy nhất cho lệnh rm. Ví dụ: rm -I test*.txt  (người dùng sẽ được nhắc. Cuối cùng, lệnh *alias* sẽ giúp cấu hình lại lệnh *rm* nếu bạn thực sự quan tâm đến việc mất dữ liệu.
* Đừng quên sử dụng các phím tắt: **current directory** (.), **parent directory** (..). Và đó là lý do tại sao bạn phải để mắt không chạy như sau: *rm -r .** ,  Vì lệnh này sẽ xóa thư mục mẹ.
* Ngoài ra, bất kỳ ai làm việc trong bảng điều khiển cũng nên biết về chức năng tự động hoàn thành cho tên lệnh hoặc tệp: chỉ cần nhập một vài ký tự đầu tiên của tên và nhấn phím Tab.
* Và một gợi ý hữu ích hơn ở đây là truy cập lịch sử lệnh gần đây. Sử dụng mũi tên lên và xuống trên bàn phím để duyệt các lệnh chạy trước đó.

### Tên và giới hạn đường dẫn trong HĐH Linux:
Trong khi đó, tôi lại muốn thu hút sự chú ý của bạn đến một vài chi tiết về các loại đường dẫn cũng như giới hạn độ dài tên trong hệ điều hành * nix.

Trước hết, hãy để chỉ định các thuật ngữ phổ biến.

Đường dẫn tuyệt đối có nghĩa là vị trí của tệp hoặc thư mục từ thư mục gốc (cấp cao nhất): ví dụ: *var/log/protocol/log.*.

Đường dẫn tương đối có nghĩa là đường dẫn liên quan đến thư mục hiện tại (*pwd*). Ví dụ: bạn được đặt trong */var/log* và bạn muốn đến thư mục sau */var/log/protocol/log/*. Bạn có thể sử dụng một đường dẫn tương đối ở đây, vì vậy chỉ cần áp dụng *cd protocol/log/*.

Và cuối cùng, có những hạn chế sau được áp dụng cho tên thư mục và tệp trong * nix (những hạn chế này cũng cần được kiểm tra trong quá trình kiểm tra ứng dụng web của bạn):
- 256 ký tự cho một tên;
- 1024 ký tự cho một đường dẫn tuyệt đối.

Về cơ bản, nó bị cấm (hoặc không thể do mật khẩu không xác định hoặc bị ẩn theo chính sách bảo mật) để đăng nhập với tư cách người dùng root (về mặt kỹ thuật, người dùng cấp cao nhất, Quản trị viên). Nhưng đồng thời, phần lớn các tác vụ quản trị thông thường hàng ngày yêu cầu quyền của quản trị viên: khởi động / dừng ứng dụng web, khởi động lại / dọn dẹp cơ sở dữ liệu, triển khai bản dựng mới, v.v.

Cách giải quyết thực tế ở đây là sử dụng lệnh sudo (cũng yêu cầu mật khẩu): *superuser does*. Vì vậy, sử dụng *sudo* theo sau bởi lệnh được yêu cầu để thực hiện các hoạt động với cái gọi là quyền superuser: *sudo apt-get install shell utilities.*

### Quản lý công việc và quy trình trong Linux:
Việc quản trị máy chủ Linux (nơi ứng dụng web của bạn chạy) yêu cầu công việc và quy trình quản lý hoạt động thường xuyên.

**Chúng tôi đã liệt kê một vài điều cần biết dưới đây:**

* Sử dụng phím tắt Ctrl-C để làm gián đoạn công việc.
* Sử dụng phím tắt Ctrl-Z để tiếp tục công việc. Lệnh *FG* sẽ khởi động lại công việc đó và *bg* sẽ đặt một công việc xuống nền (để thực hiện các nhiệm vụ bổ sung song song). Ngoài ra, hãy thêm một dấu và (“&”) vào lệnh của bạn ở cuối chuỗi để bắt đầu trong nền.
* Chạy "*ps*" để xem các quy trình hiện đang chạy. Tất cả các công việc có ID quy trình duy nhất, được hiển thị trong cột đầu tiên của đầu ra. Hãy yên tâm có một số tùy chọn hữu ích hơn ở đây để sửa đổi chế độ xem kết quả của nó.
* Chạy  "*kill / killall*" theo sau là ID tiến trình (hoặc tên tiến trình) để kết thúc công việc cần thiết. Ví dụ: *kill 22064; killall java*.
* Ngoài ra, bạn có thể tìm kiếm công việc cụ thể mà bạn muốn trong danh sách quy trình bằng lệnh *grep*: *grep* là một công cụ tìm kiếm rất hiệu quả với phạm vi cấu hình lớn. Ví dụ: *ps -aux | grep java.*. Các ps trả về danh sách của tất cả các quá trình. *grep* lọc danh sách theo tiêu chí tìm kiếm của bạn.
### 3 cách chính để cài đặt phần mềm mới trên Linux:
![](https://images.viblo.asia/9fa883af-9e3a-4c6d-a017-cc72c9fb1a8e.jpg)
Tôi muốn hoàn thành phần giới thiệu này với các hướng dẫn sau đây về cách cài đặt phần mềm mới trong Linux vào thời điểm này là một thách thức đặc biệt và được kêu gọi trong số những người dùng Windows trước đây. Các phương pháp phổ biến nhất dưới đây:

* Cài đặt gói RPM
* Cài đặt gói DEB
* Cài đặt từ tarball (đặc biệt là mã nguồn).
Đầu tiên, bất kỳ người dùng Linux nào cũng cần lưu ý những điều như đối với kho phần mềm. Kho lưu trữ là bộ lưu trữ cho các gói (cả nguồn và nhị phân) có thể truy cập qua Internet để cài đặt bất kỳ phần mềm cần thiết nào trên máy tính của bạn.

Bạn có thể dễ dàng chọn sử dụng hoặc thậm chí tạo tài khoản của riêng mình: danh sách các kho lưu trữ được kết nối được lưu trữ ở đây theo mặc định (ví dụ về các tiện ích phổ biến nhất):
- **YUM**: trong tệp *repo* trong thư mục */etc/yum.repos.d/;*
- **APT**: trong tệp */etc/apt/sources.list* và trong các tệp trong thư mục /etc/apt/source.list.d/.
### Các công cụ cơ bản để kiểm tra các ứng dụng Linux:
Hơn nữa, đến với khía cạnh kỹ thuật của chính thử nghiệm, bạn có thể tìm thấy một bộ công cụ cơ bản để thử nghiệm các ứng dụng Linux mà bạn chắc chắn sẽ phải đối mặt trong khi thử nghiệm chúng. Nhưng hầu hết các giải pháp này đều có thể áp dụng cho phần lớn các hệ thống dựa trên Unix và trên thực tế, chúng là bảng điều khiển dễ dàng tự động hóa hơn.

**Trên Linux, tất cả các chương trình có thể được chia thành các nhóm sau:**

**a) Core (Kernel)**

Điều này bao gồm chính lõi, các mô-đun hạt nhân và mức không gian người dùng để kiểm soát hạt nhân (có nghĩa là các giao diện / Proc và / sys). Do hạt nhân được viết bằng C và ASM, nên để kiểm tra bạn về cơ bản tốt hơn để sử dụng C. Thông thường, đây là các mô-đun hạt nhân thử nghiệm nhỏ, kiểm tra một số chức năng hoặc mô-đun với các tham số + tập lệnh khác nhau.

Như thực tế cho thấy, tốt hơn hết là không nên sử dụng một mô-đun kiểm tra toàn bộ tính năng của Wap, nhưng nhiều mô-đun kiểm tra riêng từng chức năng. Bạn cũng không nên quên kiểm tra tất cả các chức năng có thể trả về mã.

**b) Ứng dụng người dùng (cấp độ không gian người dùng)**

Bất kỳ ứng dụng nào chạy trên hệ điều hành đó. Tất nhiên, nếu ứng dụng đó được viết bằng Java, bạn sẽ cần phải sở hữu Java, ít nhất là để đảm bảo rằng chương trình đang hoạt động.

**c) Core và Ứng dụng**

Nhiều khả năng loại ứng dụng này bạn sẽ tương tác nhiều nhất. Sơ đồ này bao gồm trình điều khiển lõi cung cấp giao tiếp cấp thấp với bất kỳ thiết bị và chương trình người dùng nào.

Linux thực sự thuận tiện cho việc lập trình và thử nghiệm. Hầu như tất cả các công cụ có trong bất kỳ phân phối hoặc có thể được tải xuống vì chúng được phân phối miễn phí.

**Hãy cùng cố gắng mô tả tất cả các công cụ cần thiết để kiểm tra các ứng dụng Linux:**

**#1) Gnu C** - *Trình biên dịch GCC*
Trình biên dịch C, C ++ cơ bản cho Linux. Nếu bạn cần kiểm tra trình biên dịch, trang gcc có các bài kiểm tra đặc biệt. Biên dịch với tùy chọn -g sẽ giúp gỡ lỗi với gdb.

**#2) bash**
Vỏ BASH cũng được bao gồm trong mỗi phân phối. Thực tế nó rất hữu ích cho việc viết kịch bản.

**#3) expect**
Cũng có mặt trong mỗi phân phối. Cú pháp khá đơn giản nhưng rất tiện dụng TCL.
- mong đợi-perl? mong đợi-python (pyExect) - các thư viện mong đợi cho các ngôn ngữ script perl và python.

**#4) gdb**  - *Trình gỡ lỗi Gnu*
Đây là trình gỡ lỗi C / C + + tiêu chuẩn có rất nhiều cơ hội. Nếu bạn chưa bao giờ sử dụng nó, tôi khuyên bạn nên làm quen với nó. Sử dụng kgdb cho kernel.

**#5) ltt**  -* Bộ công cụ theo dõi Linux*
Nếu lõi Linux của bạn hỗ trợ LTT, bạn có thể xem các quy trình / cuộc gọi hệ thống đang hoạt động trong quy trình hiện tại.

**#6) import? gimp**
Có thể được sử dụng để chụp ảnh màn hình của các ứng dụng đồ họa thử nghiệm.

**#7) minicom**
Một chương trình để kiểm tra thủ công. Nếu bạn muốn tự động hóa giao diện điều khiển, tốt hơn là sử dụng kỳ vọng (hoặc kết hợp với bộ điều chỉnh mèo và dữ liệu tiếng vang, hoặc chỉ mở / dev / ttySx dưới dạng tệp - đôi khi tùy chọn thứ hai không phù hợp).

**#8) ltp**  - *Trang thử nghiệm Linux [ltp.sf.net]*
Bộ sưu tập các bài kiểm tra rất hữu ích. Bao gồm các bài kiểm tra hệ thống tập tin, cuộc gọi hệ thống, v.v.

**#9) Một số công cụ phổ biến hơn:**
*netperf* - tiện ích để xác minh hiệu suất mạng.
*ircp, irdump, openobex* - Tiện ích để kiểm tra hồng ngoại.
*telnet, ssh* - remote shell.

### Phần kết luận:
Hôm nay chúng ta đã học được một loạt các chủ đề hoàn toàn quan trọng bao gồm Câu hỏi thường gặp, điểm đặc biệt của Linux, quản lý quy trình, các hạn chế cụ thể và một số điểm khác có thể quan trọng đối với các dịch vụ QA trong lĩnh vực thử nghiệm ứng dụng web.

Chúng tôi đã cố gắng liệt kê các ví dụ hữu ích cũng như để chứng minh các cách phần mềm mới có thể được cài đặt. Bắt đầu từ bài viết này, bạn có thể tiếp tục nghiên cứu hệ điều hành một cách ổn định, hiệu quả, an toàn và hợp pháp nhất từ trước đến nay. 

*Nguồn: * https://www.softwaretestinghelp.com/testing-and-managing-web-applications-run-by-linux-os/