Người dịch:   ***[QuynhBC](https://www.facebook.com/bui.congquynh)***

**Bài viết 1**
## Tại sao phải học ABAP?

***ABAP là gì?***

Công nghệ ABAP là nền tảng lâu dài vũng chắc cho danh mục giải pháp của SAP.  Sự mạnh mẽ, khả năng mở rộng và khả năng mở rộng được chứng minh của nó làm cho nó trở thành nền tảng được lựa chọn để chạy các quy trình kinh doanh quan trọng.

Đây là công nghệ cơ bản của Bộ phân kinh doanh truyền thông của SAP, giải pháp hàng đầu của SAP S / 4Hana và các giải pháp sáng tạo sắp tới khác như kho dữ liệu thế hệ tiếp theo SAP BW4 / HANA. Công nghệ ABAP cũng có sẵn như một nền tảng độc lập để phát triển tùy chỉnh các ứng dụng kinh doanh dựa trên ABAP hiện đại. Khách hàng và đối tác của SAP cũng có truyền thống lâu đời về việc xây dựng mã tùy chỉnh và tiện ích bổ sung chạy trên nền tảng công nghệ ABAP.

* Nó cũng là một nền tảng phát triển ứng dụng và thời gian chạy hoàn chỉnh. Nó kết hợp: tiềm năng đổi mới của cơ sở dữ liệu trong bố nhớ của SAP SAP HANA. 
* Độ tin cậy và độ mạnh mẽ đã được chứng minh bởi máy chủ SAP.


***Đặc điểm nổi bật của ABAP***


ABAP hoạt động hiểu quả trong hơn 100.000 hệ thống khách hàng SAP, nơi nó cho phép các ứng dụng và quy trình kinh doanh sẵn sàng cho doanh nghiệp và giảm tổng chi phí phát triển tính chất tích hợp, tự biên tự dịch của nó.

***Nền tảng ABAP***

*  5.000 Hệ thống Bộ kinh doanh hiệu quả
*  64.000 Hệ thống độc lập
*  4.5 triệu nhà phát triển ABAP đã đăng kí
*  1650 dự án trức tiếp SAP S/4 HANA


***Nổi bât***
* Ngôn ngữ ABAP hiên đại, được thiết kế riêng để lập trình kinh doanh hiệu quả
* Máy chủ ứng dụng đã được chứng minh, có khả năng mở rộng cao và mạnh mẽ
* Phát triển trung tâm máy chủ với mã nguồn tích hợp và quản lý phiên bản
* Hỗ trợ cơ sở dữ liệu độc lập với nhà cung cấp tích hợp
* Mỗi trường phát triển vượt trội và các công cụ ABAP cho toàn bộ vòng đời phát triển được cung cấp trong Eclipse
* Thay đổi toàn diện và quản lý giao diện
* SAP Cloud

![](https://images.viblo.asia/cf36d377-bdd8-4763-acac-60febfedc24a.png)

***Khái niệm cốt lõi***

Kiến trúc chung của ABAP là gì?

Máy chủ ứng dụng ABAP (AS ABAP) bao gồm ba lớp: trình bày, ứng dụng và cơ sở dữ liệu. Sự phân chia lớp hoàn toàn hợp lý. Trên thực tế, cả ba lớp thực sự có thể chạy trên một máy tính duy nhất.


Cơ sở dữ liệu không chỉ chứa dữ liệu người dùng, mà còn toàn bộ mã chương trình của Máy chủ ứng dụng ABAP và các chương trình ứng dụng, tất cả dữ liệu quản trị, v.v. Các chương trình bạn phát triển được lưu trữ trong sơ đồ ABAP của hệ thống.

Lớp ứng dụng bao gồm một hoặc nhiều phiên bản AS ABAP, một Máy chủ tin nhắn duy nhất, chịu trách nhiệm liên lạc và phân phối tải trong lớp này và một Máy chủ Enqueue duy nhất, quản lý khóa. Các chương trình ABAP và tất cả các công cụ phát triển chạy trong lớp ứng dụng. ABAP Dispatcher phân phối các yêu cầu cho các quy trình làm việc (WP) trong một AS ABAP. WP xử lý chương trình của bạn và sở hữu kết nối cơ sở dữ liệu để bạn không cần phải xử lý cơ sở dữ liệu (ví dụ: kết nối cơ sở dữ liệu mở / đóng). WP chỉ được gán cho bạn trong thời gian xử lý chương trình và sau đó nó miễn phí cho người dùng khác. Kiến trúc này mạnh mẽ và có thể mở rộng. Không có gì gọi là đâm toàn bộ động cơ trong ABAP bởi một lỗi cú pháp nghiêm trọng trong chương trình của bạn. Ngoài hệ thống ABAP này và các chương trình bên ngoài có thể giao tiếp với nhau thông qua các giao thức khác nhau như RFC, TCP / IP, HTTP và OData.

Lớp trình bày đại diện cho giao diện người dùng và chịu trách nhiệm cho màn hình hiển thị. Lớp này nhận được các mục nhập của người dùng - nghĩa là nhấp chuột và đầu vào bàn phím - và chuyển chúng vào lớp ứng dụng. Hơn nữa, nó nhận dữ liệu từ lớp ứng dụng và hiển thị nó cho người dùng. Khi viết một ứng dụng kinh doanh, bạn nên sử dụng GIAO DIỆN NGƯỜI DÙNG SAP Fiori như một giao diện người dùng hiện đại. Khi phát triển trong ABAP, bạn cũng có thể gặp phải công nghệ Web Dynpro ABAP / Floorplan Manager dựa trên trình duyệt hoặc công nghệ Dynpro. Trước SAP Fiori, Web Dynpro cho ABAP là công nghệ giao diện người dùng tiêu chuẩn SAP để phát triển các ứng dụng Web trong môi trường ABAP. Dynpros là giao diện người dùng cổ điển của hầu hết các chương trình SAP dựa trên ABAP và chạy trong SAP GUI.

![](https://images.viblo.asia/d1ccc7d0-42a1-4b1e-94b8-d5565ddaa15b.png)

***Tại sao và làm thế nào để Application Server ABAP quan trọng đối với bạn với tư cách là nhà phát triển?***

Nói chung, bạn phát triển trên một máy chủ trung tâm trong ABAP. Do đó, bạn yêu cầu quyền truy cập và ủy quyền của nhà phát triển cho AS ABAP. Tất cả các công cụ cho toàn bộ vòng đời phát triển được tích hợp ở đó và cũng là một phần của máy chủ.

Bạn viết các chương trình của mình bằng cách sử dụng Các công cụ phát triển ABAP. Khi bạn chọn Lưu, trình soạn thảo ABAP lưu trữ chương trình của bạn trong cơ sở dữ liệu. Sau đó, bạn truy xuất nó theo tên: bạn không phải xử lý các tệp chương trình trong ABAP; Server làm tất cả vì bạn. Thông thường nhiều nhà phát triển đang làm việc trên cùng một máy chủ. Trong khi bạn viết mã nguồn của mình trong trình soạn thảo, đối tượng phát triển này bị khóa cho bạn. Khi bạn chọn nút Lưu, phiên bản không hoạt động của đối tượng phát triển được tạo. Điều này có thể hiển thị cho tất cả các nhà phát triển trên máy chủ và họ có thể thay đổi nó. Khi bạn nhấn nút Kích hoạt, một phiên bản hoạt động của đối tượng phát triển được tạo ra và các chương trình khác có thể truy cập nó.

Ưu điểm
* Bạn không cần phải đối phó với quản lý phiên bản: máy chủ làm điều đó cho bạn
* Bạn luôn sử dụng các nguồn mới nhất
* Sự không tương thích trở nên rõ ràng rất sớm: khi kích hoạt mã nguồn của bạn
* Không cần một hệ thống riêng biệt để kiểm tra sự tương tác của mã nguồn từ các nhà phát triển khác nhau

Kinh nghiệm điển hình khi làm việc với AS ABAP: Nhiều điều mà các nhà phát triển hoặc nhà quản lý chất lượng thường phải quan tâm đã được cung cấp và bạn có thể tập trung vào công việc hàng ngày của mình: lập trình kinh doanh.


***Tại sao và làm thế nào để kết nối với hậu cần phần mềm tích hợp trên máy chủ ABAP?***

Tất cả các đối tượng phát triển ABAP được lưu trữ trong cơ sở dữ liệu của hệ thống. Bạn không cần phải sao chép tệp chương trình theo cách thủ công nếu bạn cần nó ở nơi khác. Máy chủ ABAP cung cấp cơ chế tích hợp (thay đổi và hệ thống quản lý vận tải, CTS) cho các đối tượng phát triển vận tải thông qua cảnh quan hệ thống. Bên cạnh đó, cấu trúc thích hợp của các đối tượng phát triển trở nên đặc biệt quan trọng nếu bạn làm việc trong một nhóm trong một dự án phát triển.

Mỗi đối tượng phát triển trong ABAP thuộc về một gói. Các gói tổ chức các đối tượng phát triển và xử lý kết nối của chúng với hậu cần phần mềm AS ABAP. Đó là một gói giống như một thư mục theo một cách nào đó. Lớp vận chuyển là một khái niệm quan trọng trong hậu cần phần mềm ABAP. Nó đề cập đến con đường vận chuyển mà một gói nên đi trong một cảnh quan hệ thống. Cảnh quan thông thường có ít nhất ba lớp hệ thống:
![](https://images.viblo.asia/ff422fd7-739a-4954-b8ba-52d9f4989437.png)
Bạn phát triển một đối tượng trong hệ thống phát triển và kiểm tra nó trong hệ thống hợp nhất. Khi tất cả các thử nghiệm thành công, bạn vận chuyển các đối tượng phát triển đã thử nghiệm của mình đến hệ thống sản xuất. Bạn xác định đường dẫn này (lớp vận chuyển) như một thuộc tính của một gói và theo cách này, các điểm đến của các đối tượng phát triển của bạn rõ ràng ngay từ khi bắt đầu phát triển của bạn.

**Bài viết này được ghi nhận và chỉnh sửa từ bài viết gốc trên SAP Community:** ***[tại đây](https://community.sap.com/topics/abap/abap-for-newbies)***

Chủ đề cho bài viết tiếp theo:
* Giao diện SAP GUI cho lập trình viên.
* Cú pháp và code trong SAP ABAP.


***Cảm ơn các bạn đọc tiếp cận bài viết này.***