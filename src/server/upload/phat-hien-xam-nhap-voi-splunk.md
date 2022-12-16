# I. Tổng quan về Splunk
## 1. Khái niệm
Splunk là một phần mềm giám sát mạng dựa trên sức mạnh của việc phân tích Log. Splunk thực hiện các công việc tìm kiếm, giám sát và phân tích các dữ liệu lớn được sinh ra từ các ứng dụng, các hệ thống và các thiết bị hạ tầng mạng. Nó có thể thao tác tốt với nhiều loại dịnh dạng dữ liệu khác nhau (Syslog, csv, apache-log, access_combined…). Splunk được xây dựng dựa trên nền tảng Lucene and MongoDB.
## 2. Tính năng
* **Định dạng Log:** Hỗ trợ hầu như tất cả các loại log của hệ thống, thiết bị hạ tầng mạng, phần mềm, Firewall, IDS/IPS, Log Event, Register của các máy trạm ….
* **Các hình thức thu thập dữ liệu:** Splunk có thể thực hiện việc thu thập log từ rất nhiều nguồn khác nhau. Từ một file hoặc thư mục (kể cả file nén) trên server, qua các kết nối UDP, TCP từ các Splunk Server khác trong mô hình Splunk phân tán, từ các Event Logs, Registry của Windows …Splunk kết hợp rất tốt với các công cụ thu thập log khác.
* **Cập nhật dữ liệu:** Splunk cập nhật dữ liệu liên tục khi có thay đổi trong thời gian thực. Giúp cho việc phát hiện và cảnh báo trong thời gian thực.
* **Đánh chỉ mục dữ liệu:** Splunk có thể đánh chỉ mục dữ liệu với một khối lượng dữ liệu rất lớn trong một khoảng thời gian ngắn. Giúp việc tìm kiếm diễn ra nhanh chóng và thuận tiện.
* **Tìm kiếm thông tin:** Splunk làm việc rất tốt với dữ liệu lớn và cập nhật liên tục. Nó cung cấp cơ chế tìm kiếm với một “Splunk Language” cực kỳ thông minh bao gồm các từ khóa, các hàm và cấu trúc tìm kiếm giúp người sử dụng có thể truy xuất mọi thứ, theo rất nhiều tiêu chí từ tập dữ liệu rất lớn. Những nhà quản trị mạng cao cấp và chuyên nghiệp thường gọi Splunk với cái tên “Splunk toàn năng” hay “Splunk as Google for Log files” để nói lên sức mạnh của Splunk.

* **Giám sát và cảnh báo:** Splunk cung cấp cho người dùng một cơ chế cảnh báo dựa trên việc tìm kiếm các thông tin do chính người sử dụng đặt ra. Khi có vấn đề liên quan tới hệ thống phù hợp với các tiêu chí mà người dùng đã đặt ra thì hệ thống sẽ cảnh báo ngay tới người dùng (cảnh bảo trực tiếp qua giao diện, giử Email).
* Khắc phục sự cố: Splunk còn cung câp một cơ chế tự động khắc phục với các vấn đề xảy ra bằng việc tự động chạy các file Script mà người dùng tự tạo (Ví dụ như: Chặn IP, đòng Port …) khi có các cảnh báo xảy ra.

* **Hiển thị thông tin:** Splunk cung cấp một cơ chế hiển thị rất trực quan giúp người sử dụng có thể dễ dàng hình dung về tình trạng của hệ thống, đưa ra các đánh giá về hệ thống. Splunk còn từ động kết xuất ra các báo cáo với nhiều loại định dạng một cách rất chuyên nghiệp.

*	**Phát triển:** Cung cấp các API hỗ trợ việc tạo các ứng dụng trên Splunk của người dùng. Một số bộ API điển hình như Splunk SDK (cung cấp các SDK trên nền tảng Python, Java, JS, PHP), Shep (Splunk Hadoop Intergration - đây là sự kết hợp giữa Splunk và Hadoop), Shuttl (là một sản phẩm hỗ trợ việc sao lưu dữ liệu trong Splunk), Splunkgit (Giúp bạn hình dung dữ liệu tốt hơn), Splunk power shell resource Kit (Bộ công cụ hỗ trợ việc mở rộng và quản lý hệ thống).

## 3.Kiến trúc

![](https://images.viblo.asia/39c5016d-8c4b-4199-ad29-fdfac0b0b21a.png)

* Mức thấp nhất của kiến trúc Splunk mô tả các phương thức nhập liệu khác nhau được hỗ trợ bởi Splunk. Những phương thức nhập này có thể được cấu hình để gửi dữ liệu trên các bộ phân loại Splunk. 

* Trước khi dữ liệu đến được các bộ phân loại Splunk, nó có thể được phân tích cú pháp hoặc thao tác, có nghĩa là làm sạch dữ liệu có thể được thực hiện nếu cần. 
 
*	Một khi dữ liệu được lập chỉ mục trên Splunk, nó sẽ tiến hành đi vào cụ thể để phân tích dữ liệu.
	
* Splunk hỗ trợ hai loại triển khai: triển khai độc lập và triển khai phân tán. Tùy thuộc vào loại triển khai, tìm kiếm tương ứng được thực hiện. Công cụ Splunk có các thành phần bổ sung khác của quản lý dữ liệu, báo cáo và lên kế hoạch, và cảnh báo. Toàn bộ công cụ Splunk được tiếp xúc với người dùng thông qua Splunk CLI, Splunk Web Interface, và Splunk SDK, được hỗ trợ bởi hầu hết các ngôn ngữ.

* Splunk cài đặt một quy trình máy chủ phân tán trên máy chủ được gọi là splunkd. Quá trình này có trách nhiệm lập chỉ mục và xử lý một số lượng lớn dữ liệu thông qua các nguồn khác nhau. Splunkd có khả năng xử lý số lượng lớn dữ liệu phát trực tuyến và lập chỉ mục cho phân tích thời gian thực trên một hoặc nhiều đường ống.
 
*	Mỗi đường ống đơn bao gồm một loạt các bộ vi xử lý, dẫn đến xử lý dữ liệu nhanh hơn và hiệu quả hơn. Danh sách dưới đây là các khối kiến trúc splunk:
    - **Pipeline:** Đây là một quá trình cấu hình đơn luồng duy nhất nằm trong splunk.
    - **Bộ vi xử lý:** Chúng là những hàm số có thể tái sử dụng cá nhân hoạt động trên dữ liệu đi qua một đường ống. Đường ống trao đổi dữ liệu giữa họ thông qua một hàng đợi.

![](https://images.viblo.asia/8834dab2-f7db-4152-aa4d-8dc39f9485d9.png)

* Splunkd cho phép người dùng tìm kiếm, điều hướng và quản lý dữ liệu trên Splunk Enterprise thông qua giao diện web được gọi là Splunk Web. Nó là một máy chủ ứng dụng web dựa trên Python cung cấp một giao diện web để sử dụng Splunk. Trong phiên bản trước của Splunk: splunkd và SplunkTeb là hai quy trình riêng biệt, nhưng từ Splunk 6, cả hai quy trình đã được tích hợp là 1. Nó cho phép người dùng tìm kiếm, phân tích và hình dung dữ liệu bằng cách sử dụng giao diện web. Giao diện Splunk Web có thể được truy cập bằng cách sử dụng cổng Web Splunk, và Splunk cũng cho thấy REST API để truyền thông thông qua cổng quản lý chia sẻ.

* Một trong những thành phần quan trọng của kiến ​​trúc của Splunk là kho dữ liệu. Nó có trách nhiệm nén và lưu trữ dữ liệu ban đầu (nguyên vẹn). Dữ liệu được lưu trữ trong các tệp Time Series Index (T SIDX). Một kho dữ liệu cũng bao gồm lưu trữ và lưu trữ dựa trên chính sách lưu giữ có thể cấu hình.

* Các triển khai của Splunk Enterprise có thể bao gồm từ việc triển khai các máy chủ đơn (có chỉ số vài gigabyte dữ liệu mỗi ngày và được truy cập bởi một vài người dùng đang tìm kiếm, phân tích và hình dung dữ liệu) tới các triển khai lớn của doanh nghiệp ở nhiều trung tâm dữ liệu, lập chỉ mục hàng trăm terabytes dữ liệu và tìm kiếm được thực hiện bởi hàng trăm người dùng. Splunk hỗ trợ truyền thông với một cá thể khác của một máy chủ Splunk thông qua TCP để chuyển tiếp dữ liệu từ một máy chủ Splunk sang một máy khác để lưu trữ dữ liệu và các yêu cầu phân phối và phân phối dữ liệu khác thông qua giao tiếp TCP Splunk-to-Splunk.

* Bundles là các thành phần của kiến trúc Splunk lưu trữ cấu hình dữ liệu đầu vào, tài khoản người dùng, ứng dụng Splunk, tiện ích và môi trường khác.

* Các mô-đun là những thành phần của kiến trúc Splunk được sử dụng để thêm các tính năng mới bằng cách sửa đổi hoặc tạo bộ xử lý và đường ống. Các mô-đun chỉ là các kịch bản tùy chỉnh và các phương pháp nhập dữ liệu hoặc phần mở rộng có thể thêm một tính năng mới hoặc sửa đổi các tính năng hiện có của Splunk.

## 4. Đánh giá

* Splunk mạnh về khả năng phân tích và cảnh báo tuy nhiên nó lại không mạnh và không đảm bảo về việc thu thập và truyền tải log. Cụ thể là nó chưa có cơ chế bảo mật trên đường truyền, không phù hợp với những hệ thống đòi hỏi bảo mật cao.

* Chưa có cơ chế giúp tự động phát hiện ra các tấn công hay các vấn đề từ bên ngoài. Nhưng điều này phụ thuộc vào kinh nghiệm sử dụng và vốn hiểu biết của người quản trị.

* Để triển khai được một hệ thống sử dụng Splunk hiệu quả chúng ta cũng cần có một hệ thống riêng, đây cũng là một trở ngại không nhỏ với các hệ thống có quy mô trung bình và nhỏ.

# II. Cài đặt và cấu hình
Download Splunk tại trang https://www.splunk.com.

Cài đặt Splunk trên Ubuntu:

* Download file cài đặt cho Linux.

* Tại thư mục chứa file cài đặt, chạy lệnh dpkg –i <tên file cài đặt>. Splunk sẽ được cài đặt vào thư mục mặc định là /opt/splunk.

* Chạy lệnh /opt/splunk/bin/splunk –accept-license để chấp nhận giấy phép tự động.

* Splunk đã có thể được khởi động bằng lệnh /opt/splunk/bin/splunk start.

Splunk có thể cấu hình dễ dàng bằng giao diện web tại địa chỉ http://localhost:8000/.

# III. Phát hiện xâm nhập với Splunk
## 1. Hệ thống phát hiện xâm nhập IDS (Instruction Detection System)
IDS (Intrucsion Detection System) được hiểu đơn giản là hệ thống phát hiện xâm nhập thông qua việc phát hiện những bất thường trong lưu thông mạng cũng như các sự kiện xảy ra trên hệ thống máy tính, từ đó phân tích và phát hiện các vấn đề về an ninh hệ thống để đảm bảo việc phòng thủ trước những đợt tấn công mạng đang ngày một gia tăng.

Hệ thống IDS khi phát hiện bất thường sẽ đưa ra các cảnh báo đối với quản trị viên hệ thống để tiến hành quét các cổng, đồng thời khóa các kết nối đang bị ảnh hưởng. Ngoài ra, IDS còn có cả khả năng phân biệt giữa tấn công bên trong và tấn công bên ngoài dựa trên dấu hiệu của tấn công, điều này tương tự như cơ chế của các phần mềm diệt virus.

Chức năng chính ban đầu của IDS chỉ là phát hiện các dấu hiện xâm nhập, do đó IDS chỉ có thể tạo ra các cảnh báo tấn công khi tấn công đang diễn ra hoặc thậm chí sau khi tấn công đã hoàn tất. Càng về sau, nhiều kỹ thuật mới được tích hợp vào IDS, giúp nó có khả năng dự đoán được tấn công (prediction) và thậm chí phản ứng lại các tấn công đang diễn ra (Active response).
Một hệ thống IDS cần thỏa mãn những yêu cầu sau:

* **Tính chính xác (Accuracy):** IDS không được coi những hành động thông thường trong môi trường hệ thống là những hành động bất thường hay lạm dụng.

* **Hiệu năng (Performance):** Hiệu năng của IDS phải đủ để phát hiện xâm nhập trái phép trong thời gian thực.

* **Tính trọn vẹn (Completeness):** IDS không được bỏ qua một xâm nhập trái phép nào. Đây là một điều kiện khó thỏa mãn được.

* **Chịu lỗi (Fault Tolerance):** bản thân IDS cũng phải có khả năng chống lại tấn công.

* **Khả năng mở rộng (Scalability):** IDS phải có khả năng xử lý trong trạng thái xấu nhất là không bỏ sót thông tin nào. Yêu cầu này liên quan tới hệ thống mà các sự kiện trong tương lai đến từ nhiều nguồn tài nguyên với số lượng host nhỏ. Với sự phát triển nhanh và mạnh của mạng máy tính, hệ thống có thể bị quá tải bởi sự tăng trưởng của số lượng sự kiện.

## 2. Kiến trúc và chức năng
### a. Các thành phần của IDS

![](https://images.viblo.asia/3f251b7b-eb3d-4259-be07-b129ec26e9ca.png)

IDS bao gồm các thành phần chính: thành phần thu thập gói tin (information collection), thành phần phân tích gói tin (Detection), thành phần phản hồi (response) nếu gói tin đó được phát hiện là một cuộc tấn công.

Thành phần phân tích gói tin là quan trọng nhất và ở thành phần này bộ cảm biến đóng vai trò quyết định. Bộ cảm biến tích hợp với thành phần là sưu tập dữ liệu và một bộ tạo sự kiến. Vai trò của bộ cảm biến là dùng để lọc thông tin và loại bỏ dữ liệu không tương thích đạt được từ các sự kiện liên quan với hệ thống bảo vệ, vì vậy có thể phát hiện được các hành động nghi ngờ. Bộ phân tích sử dụng cơ sở dữ liệu chính sách phát hiện cho mục này.

Ngoài ra còn có các thành phần: dấu hiệu tấn công, profile hành vi thông thường, các tham số cần thiết. Thêm vào đó, cơ sở dữ liệu giữa các tham số cấu hình, gồm các chế độ truyền thông với module đáp trả. Bộ cảm biến cũng có sơ sở dữ liệu của riêng nó.

### b. Quy trình hoạt động

*Một host tạo ra một gói tin mạng.

* Các cảm biến trong mạng đọc các gói tin trong khoảng thời gian trước khi nó được gửi ra khỏi mạng cục bộ (cảm biến này cần phải được đặt sao cho nó có thể đọc tất cả các gói tin).

* Chương trình phát hiện nằm trong bộ cảm biến kiểm tra xem có gói tin nào có dấu hiệu vi phạm hay không. Khi có dấu hiệu vi phạm thì một cảnh báo sẽ được tạo ra và gửi đến giao diện điều khiển.

* Khi giao diện điều khiển lệnh nhận được cảnh báo nó sẽ gửi thông báo cho một người hoặc một nhóm đã được chỉ định từ trước (thông qua email, cửa sổ popup, trang web v.v…).

* Phản hồi được khởi tạo theo quy định ứng với dấu hiệu xâm nhập này.

* Các cảnh báo được lưu lại để tham khảo trong tương lai (trên địa chỉ cục bộ hoặc trên cơ sở dữ liệu).

* Một báo cáo tóm tắt về chi tiết của sự cố được tạo ra.

* Cảnh báo được so sánh với các dữ liệu khác để xác định xem đây có phải là cuộc tấn công hay không.

# IV. Tổng kết 
Trên đây mới chỉ là những cái nhìn tổn quát nhất về những khái niệm, kiến trúc và cách thức hoạt động của một hệ thống phát hiện xấm nhập với Splunk.
Hy vọng sau bài viết này, các bạn có thể tự cài đặt và cấu hình được một hệ thống phát hiện xâm nhập cơ bản trên hệ thống của mình. Xin cảm ơn! 😃 😃