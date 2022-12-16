Nhưng điều đầu tiên thu hút sự chú ý của người dùng là giao diện của ứng dụng GUI (Giao diện người dùng đồ họa).
Trong kỷ nguyên số hóa ngày nay, GUT Testing không giới hạn ở các máy tính để bàn, nó đang mở rộng trên điện thoại thông minh và máy tính bảng như các tiện ích điện tử. Chúng ta sẽ tìm hiểu kiểm thử GUI bằng cách sử dụng các công cụ kiểm tra GUI.
Kiểm thử GUI tự động giúp người kiểm thử và nhà phát triển thực hiện kiểm tra chính xác hơn và trong thời gian hạn chế.

**1. Kiểm thử GUI là gì?**
1) GUI Testing là quá trình kiểm thử GUI của ứng dụng, xác định các lỗi xảy ra trong ứng dụng trong giai đoạn thiết kế
2) GUI Testing được thực hiện để xác minh chức năng của GUI theo thông số kỹ thuật và phụ thuộc vào công nghệ được sử dụng
3) GUI Testing cũng đánh giá các tính năng điều khiển như menu, nút, biểu tượng, hộp văn bản, danh sách, hộp thoại, bố trí, màu sắc, kích thước phông chữ, định dạng văn bản, v.v.
4) GUI Testing có thể được thực hiện thủ công hoặc tự động với sự trợ giúp của các công cụ thường được thực hiện bởi công ty bên thứ ba thay vì nhà phát triển hoặc người dùng
5) GUI Testing được sử dụng để thực hiện giá trị của từng đối tượng GUI và thực hiện các sự kiện GUI như nhấn phím hoặc bấm chuột

Sau đây là danh sách gợi ý những gì cần kiểm thử trong quá trình thực hiện kiểm thử GUI:
- Xác thực màn hình
- Kích thước và vị trí của các phần tử GUI
- Hình ảnh rõ ràng và được căn chỉnh
- Điều hướng (liên kết)
- Phông chữ và căn chỉnh văn bản
- Trường ngày và số
- Điều kiện khả năng sử dụng và tính toàn vẹn của dữ liệu
- Thông báo lỗi
- Các trường bắt buộc
- Mâu thuẫn của chữ viết tắ
- Thanh tiến độ (Progress bars)
- Phím tắt

**2.  Phương pháp tiếp cận để kiểm tra GUI**

*2.1 Kiểm thử thủ công*:
    Testers áp dụng kiến thức của họ và kiểm tra màn hình đồ họa theo yêu cầu kinh doanh.

*2.2 Kiểm thử Record và Replay*:
    Điều này được thực hiện bằng cách sử dụng các công cụ tự động hóa và các hành động Record và Replay của tool đó. Sau đó, thực thi các bước được ghi lại trên ứng dụng đang được kiểm tra trong khi Record/ Replay.

*2.3 Kiểm thử dựa trên mô hình*:
    Kiểm thử dựa trên mô hình được thực hiện theo hành vi của hệ thống. Các mô hình này có thể được phân loại thành 3 loại như sau:
+ Mô hình dựa trên sự kiện: Dựa trên các sự kiện GUI sẽ xảy ra ít nhất một lần
+ Mô hình dựa trên trạng thái: Dựa trên trạng thái GUI được thực hiện ít nhất một lần
+ Mô hình miền: Dựa trên miền và chức năng của ứng dụng
    
    Với trên 3 mô hình sau đây yêu cầu cũng cần phải được theo sau:
+ Xây dựng mô hình
+ Chỉ định đầu vào cho mô hình
+ Xác định kết quả mong đợi
+ Thực hiện kiểm tra
+ So sánh kết quả thực tế và mong đợi
+ Quyết định hành động trong tương lai sẽ được thực hiện
+ Công cụ kiểm tra giao diện người dùng hàng đầu

**3. Các công cụ kiểm thử GUI**
Sau đây là một số công cụ được sử dụng để kiểm thử GUI:

*3.1 Abbot Java GUI Test Framework*
- Abbot Java GUI Test Framework được sử dụng thử nghiệm Java GUI
- Framework này được sử dụng với tập lệnh và mã được biên dịch
- Nó bao gồm các tham chiếu GUI và thực hiện các hành động của người dùng trên các thành phần GUI
- Cung cấp kiểm thử đơn vị và kiểm thử chức năng cho AWT và SWING
- Đây là famework nguồn mở có sẵn để sử dụng miễn phí và sở hữu các tính năng như Ghi và Phát lại

*3.2 RAPISE by Inflectra*
 Rapise cung cấp giải pháp tự động hóa tất cả-trong-một kiểm thử. Nó có thể kiểm tra máy tính để bàn, điện thoại di động, trang web (bao gồm cả với sự hỗ trợ Selenium), các ứng dụng Java, và thậm chí các API (REST và SOAP). Nó công cụ học tập và theo dõi rất vững chắc và được thiết kế để làm việc với các ứng dụng phức tạp nhất trên nhiều loại kết nối.
 Rapise sử dụng tiêu chuẩn JavaScript với các thư viện dễ sử dụng, làm cho nhanh chóng và đơn giản để có được lên đến tốc độ. Nó cũng bao gồm một tập hợp ngày càng tăng của các thư viện tùy chỉnh cho thử nghiệm một số ứng dụng phổ biến, bao gồm cả Microsoft Dynamics. Phiên bản mới nhất thậm chí bao gồm một khung điều khiển từ khóa không kịch bản.

*3.3 AutoIt UI testing*
- AutoIt là ngôn ngữ kịch bản phần mềm miễn phí với các cấu trúc cơ bản sử dụng Windows GUI và kịch bản chung
- Nó là một công cụ thương mại khép kín, là sự kết hợp của các tổ hợp phím, chuyển động của chuột và thao tác trên Windows
- Công cụ tận dụng hỗ trợ COM và biên dịch tập lệnh với các tệp thực thi độc lập
- Công cụ này bao gồm Trình chỉnh sửa tích hợp, Cú pháp giống cơ bản, Bộ chức năng phong phú, v.v.

*3.4 CubicTest*
- CubicTest là một mã nguồn mở Eclipse plugin giúp cho các ứng dụng web thử nghiệm để thiết kế và hiểu, không có vấn đề nếu người dùng có bất kỳ kiến thức về kỹ thuật hay không
- Nó sử dụng GUI để kiểm thử mô hình thay vì các kịch bản kiểm thử và cho phép phát triển theo hướng kiểm thử của ứng dụng web
- Thay thế các thông số yêu cầu và các kịch bản lệnh kiểm tra thủ công bằng các thiết kế kiểu hộp CubicTest

*3.5 eggPlant UI automation testing*
- eggPlant là một công cụ tự động hóa và kiểm tra phần mềm GUI thương mại được thiết kế bởi TestPlant
- Nó là là phần mềm kiểm thử GUI và được sử dụng cho toàn bộ quá trình thử nghiệm
- Nó sử dụng VNC để xem xét SUT và gửi các lệnh chuột và bàn phím
- Tạo các bài kiểm thử nhanh chóng thông qua giao diện eggDrive
- Chúng ta có thể tích hợp cà eggPlant vào Jenkins, IBM Quality Quality Manager và HP Quality Center cho quá trình QA

*3.6 FitNesse*
- FitNesse là khung nguồn mở được sử dụng cho kiểm thử chấp nhận cộng tác, có khả năng chạy với ứng dụng trên một hoặc nhiều thiết bị
- Nó là một công cụ  giúp quyết định phần mềm nên làm gì và bạn thực sự là gì
- Nó có thể chạy trên máy hoặc máy chủ và có sẵn với tất cả trong một gói

*3.7 Ascentialtest*
- Ascentialtest được thiết kế để giảm thời gian và hiệu quả trong việc tạo và bảo trì trường hợp kiểm thử
- Cung cấp môi trường trực quan để tạo thành phần kiểm thử chỉ thông qua tính năng kéo và thả
- Tạo điều kiện lập kế hoạch kiểm tra, quản lý dữ liệu thử nghiệm, thực hiện kiểm tra, phát triển thử nghiệm thủ công và tự động, theo dõi lỗi và báo cáo

*3.8 iMacros*
-  Về cơ bản, iMacros được biết đến như một phần mở rộng cho Mozilla Firefox, Google Chrome và Internet Explorer với chức năng Ghi và Phát lại
-  Nó có các tính năng hỗ trợ cho kịch bản web, giám sát máy chủ internet và kiểm tra web
-  Nó là một công cụ thương mại có thể tự động hóa Adobe Flash, Adobe Flex, Silverlight, Java Applet, v.v.
-  Tích hợp với dữ liệu nghiệp vụ và Excel tự động kiểm tra Ajax và kiểm tra chức năng, hiệu suất và hồi quy cho trình duyệt

*3.9 Maveryx*
-  Maveryx là một công cụ kiểm thử tự động cho chức năng, hồi quy, dựa trên dữ liệu và giao diện thử nghiệm đặc biệt cho tất cả các ứng dụng Java và Android
-  Maveryx chụp nhanh giao diện người dùng ứng dụng đang chạy để xác định phần tử giao diện người dùng để tự động kiểm tra
-  Đây là một mã nguồn mở cũng như công cụ thương mại có giao diện và kiến trúc plugin để hỗ trợ các điều khiển tùy chỉnh
-  Nó là một nền tảng đa chạy ứng dụng độc lập hoặc như là trình cài thêm Eclipse

*3.10 Công cụ kiểm tra tự động hóa Ranorex GUI*
-  Ranorex là công cụ tự động hóa thử nghiệm Windows GUI thương mại cung cấp thử nghiệm cho tất cả các cửa sổ, ứng dụng web và di động
-  Nó sử dụng công nghệ RanoreXPath về bảo trì thử nghiệm phía đông và đơn giản hóa việc thử nghiệm các giao diện động
-  Ranorex đi kèm với kho lưu trữ bản đồ với các bài kiểm tra duy trì cùng với Capture và Replay hoặc Record và Edit Actions.

*3.11 RIATest*
-  RIATest là một công cụ tự động hóa thử nghiệm GUI mang lại lợi ích cho các ứng dụng Flex, HTML, JavaScript, jQuery hoặc Windows 8
-  RIATest được thêm vào hệ thống tích hợp liên tục để tìm ra các vấn đề nhanh chóng
-  Giúp tạo tập lệnh thử nghiệm có thể đọc được, sử dụng thanh tra thành phần để nhận dạng các phần tử GUI
-  Nó là một công cụ thương mại cho phép xử lý lỗi tùy chỉnh thông qua việc ghi nhật ký lỗi hoặc ném một ngoại lệ

*3.12 SilkTest*
-  SilkTest là một công cụ để tự động kiểm tra chức năng và hồi quy
-  Nó là một công cụ thương mại được sử dụng để tạo ra các kiểm thử chức năng mạnh mẽ và di động
-  Nó tạo điều kiện cho các trường hợp thử nghiệm cho các ứng dụng web, bản địa và phần mềm khác
-  Cung cấp hỗ trợ trình duyệt chéo, hỗ trợ trình duyệt di động, thực thi kiểm tra nhanh, v.v.

*3.13 Framework tự động hóa giao diện người dùng Sikuli*
- Sikuli là một framework mã nguồn mở để tự động kiểm tra GUI
- Nó sử dụng kịch bản Sikuli có thể được sử dụng để tự động hóa mọi thứ trên màn hình mà không cần hỗ trợ API nội bộ
- Nó cung cấp hỗ trợ cho các trang web, ứng dụng máy tính để bàn trên Windows, Linux, Mac, iPhone và Android

*3.14  Squish*
- Squish là công cụ thương mại cho thử nghiệm tự động hóa GUI
- Nó sử dụng các bản ghi và chỉnh sửa các bài kiểm tra bằng cách sử dụng các ngôn ngữ kịch bản như JavaScript, Perl, Python và Ruby
- Tạo điều kiện xác minh thuộc tính, ảnh chụp màn hình, hình ảnh, dữ liệu phức tạp, tệp bên ngoài và cơ sở dữ liệu
- Sở hữu môi trường phát triển thử nghiệm tích hợp dựa trên Eclipse

*3.15 SWTBot*
- SWTBot là một nền tảng Java dựa trên mã nguồn mở cho GUI và thử nghiệm chức năng
- Về cơ bản nó hỗ trợ nền tảng chạy Eclipse vì nó dựa trên các trình cắm thêm của Eclipse và ứng dụng dựa trên Eclipse RCP
- Nó cung cấp các API dễ đọc và viết

*3.16 Selenium*
- Selen được gọi là dự án ô cho phép kiểm tra trình duyệt web cho tất cả các trình duyệt
- Nó được thực hiện như là phần mở rộng của Firefox tốt, chỉnh sửa và gỡ lỗi
- Nó là một ứng dụng miễn phí mã nguồn mở hỗ trợ kiểm tra GUI và thử nghiệm chức năng web
- Cũng hỗ trợ một số ngôn ngữ kịch bản như Java, C #, Python, v.v.

*3.17 elerik TestStudio*
- elerik TestStudio là công cụ kiểm thử phần mềm dựa trên Windows thương mại với các plugin Visual Studio
- Nó tạo điều kiện thử nghiệm chức năng web và máy tính để bàn (GUI), thử nghiệm hiệu suất và thử nghiệm ứng dụng dành cho thiết bị di động với tính năng Ghi và Phát lại
- Hỗ trợ JavaScript, HTML, ASP.NET, Ajax, Silverlight vv và tạo điều kiện xác thực nhanh chóng
- Có thể được sử dụng cho tất cả các trình duyệt như IE, Firefox, Chrome, Safari

*3.18 TestComplete*
- TestComplete là một nền tảng thương mại cho thử nghiệm web, di động và GUI
- Đây là công cụ giá cả phải chăng với chi phí thấp để kiểm tra nhanh chóng và chính xác
- Hỗ trợ kiểm tra theo hướng dữ liệu, thử nghiệm hướng đối tượng, kiểm tra theo từ khóa cùng với hỗ trợ kiểm tra cơ sở dữ liệu
- Tích hợp với các công cụ khác và đi kèm với Trình chỉnh sửa thử nghiệm, Trình gỡ lỗi và Trình chỉnh sửa mã

*3.19 Test Anywhere*
- Test Anywhere là công cụ kiểm thử phần mềm thương mại không yêu cầu bất kỳ chương trình nào
- Hỗ trợ các tính năng như Record, Replay và chạy các trường hợp thử nghiệm phức tạp
- Cung cấp GUI và kiểm tra Front-end với trình soạn thảo thử nghiệm dựa trên đối tượng và dựa trên hình ảnh
- Nền tảng thử nghiệm đơn và dựa trên các phương pháp thử nghiệm như Waterfall, Agile, V, Spiral và RUP / RAD

*3.20 TestPrtner*
- TestPrtner là công cụ kiểm tra tự động thương mại được thiết kế và phát triển bởi Micro Focus
- Theo dõi quy trình kinh doanh thông qua phương pháp tiếp cận theo định hướng và trực quan
- Cung cấp kịch bản VBA và tạo điều kiện làm việc theo nhóm cho người dùng, nhà phát triển và người thử nghiệm
- Tự động kiểm tra hồi quy và tạo kịch bản hướng đối tượng

*3.21 Jubula GUI*
- Jubula GUI là một thử nghiệm GUI tự động được sử dụng như là một thay thế cho GUIDancer
- Nó là tốt hơn như GUIDancer và được sử dụng để thực hiện thử nghiệm chức năng
- Nó cũng có thể phục vụ kiểm thử tích hợp, hệ thống và chấp nhận
- Một công cụ miễn phí hỗ trợ nền tảng Windows và Linux và cung cấp hỗ trợ bộ công cụ cho các ứng dụng SW Swing, các ứng dụng SWT, các ứng dụng Eclipse RPC, ứng dụng HTML và iOS

*3.22 GTT*
- Công cụ kiểm tra GUI GTT được sử dụng cho ứng dụng dựa trên Java Swing
- Áp dụng cho phát triển theo hướng thử nghiệm và đi kèm với các chức năng chụp và phát lại để thử nghiệm GUI
- Nó là một công cụ mã nguồn mở sử dụng các sự kiện Jemmy làm mô hình sự kiện của nó
- Để xác minh tính chính xác, nó sử dụng cơ chế xác nhận xem và xác nhận mô hình

*3.23 IcuTest*
-  IcuTest là một khung kiểm thử đơn vị để kiểm tra GUI giúp tạo các bài kiểm tra đơn giản và dễ quản lý
-  Nó là công cụ độc quyền không hỗ trợ tính năng ghi lại và phát lại mà còn thử nghiệm tự động và nhanh chóng
-  Cung cấp phạm vi mã rộng và tìm lỗi một cách nhanh chóng
-  Không cần phải bắt đầu toàn bộ ứng dụng để thử nghiệm và cũng có thể kiểm tra các thành phần GUI riêng lẻ

*3.24 QF-Test*
-  QF-Test là công cụ kiểm tra tự động chuyên nghiệp cho giao diện web và ứng dụng Java
-  Công cụ mạnh mẽ và mạnh mẽ cho các ứng dụng Java Swing, SWT, Eclipse-plugins và RCP
-  Công cụ miễn phí hỗ trợ kiểm tra trình duyệt chéo và các thử nghiệm có thể sử dụng lại
-  Nó có sẵn cho các nhà phát triển và thử nghiệm và được chứng minh thân thiện với người dùng

*3.25 QAliber*
-  QAliber tự động kiểm tra để kiểm tra GUI với chức năng ghi và phát lại
-  Về cơ bản, nó có hai phần là QAliber Test Builder và QAliber Test Developer
-  QAliber Test Builder với quản lý kiểm tra GUI hoàn chỉnh
-  Công cụ nguồn mở lưu trữ các trường hợp thử nghiệm với tất cả các chi tiết

*3.26 RCP Testing*
-  Công cụ kiểm tra RCP được sử dụng cho thử nghiệm tự động hóa GUI cho ứng dụng dựa trên Eclipse
-  Cung cấp khả năng tạo trường hợp thử nghiệm và hỗ trợ mạnh mẽ cho công nghệ Eclipse
-  Các kết quả hữu ích và đáng tin cậy, có thể mở rộng và dễ phát triển
-  Ban đầu, nó là thương mại nhưng trong năm 2014 nó đã phát hành như một công cụ nguồn mở

*3.27 Sahi*
-  Sahi là một công cụ kiểm tra tự động được sử dụng để thử nghiệm ứng dụng web và có sẵn với cả hai phiên bản nguồn mở và độc quyền
-  Mã nguồn mở đi kèm với các bản ghi cơ bản và các chức năng phát lại được viết bằng Java và JavaScript
-  Phiên bản độc quyền bao gồm các tính năng bổ sung và tùy chỉnh báo cáo
-  Phiên bản nguồn mở đã được SourceForge lưu trữ và phiên bản sở hữu độc quyền được lưu trữ bởi trang web Sahi Pro

*3.28 Soatest*
- Parasoft Soatest là một công cụ kiểm tra được sử dụng để xác nhận ứng dụng định hướng API
- Nó cũng được sử dụng cho thử nghiệm đơn vị chức năng, kiểm tra tích hợp, kiểm tra hồi quy, kiểm tra hệ thống, kiểm tra bảo mật và kiểm tra giao diện người dùng web
- Hỗ trợ phát hiện lỗi thời gian chạy. Tải thử nghiệm và giới thiệu Dịch vụ ảo hóa
- Công cụ độc quyền tạo điều kiện cho trí thông minh trước cho thế hệ thử nghiệm tự động hóa

*3.29 Telerik Testing framework* 
- Telerik Testing framework là một công cụ miễn phí có API phong phú để chuẩn bị các trường hợp kiểm tra chức năng có thể duy trì
- Giúp thiết lập các yếu tố trang động, hoạt ảnh và các điều khiển giao diện người dùng tùy chỉnh
- Đi kèm với khả năng tương thích giữa các trình duyệt và tự động kiểm tra cho ứng dụng AJAX, HTML5 và XAML
- Tích hợp với studio trực quan và xử lý các sự kiện JavaScript

*3.30 Telerik Test Studio GUI testing tool*
- Telerik Test Studio là công cụ dựa trên Windows độc quyền cho web và máy tính để bàn
- Được sử dụng để kiểm tra chức năng, kiểm tra hiệu suất, kiểm tra tải và thử nghiệm các ứng dụng di động được phát triển bởi Telerik
- Bật tính năng ghi lại và ghi lại không cần script và tạo điều kiện cho thử nghiệm trình duyệt chéo
- Hỗ trợ kiểm tra ứng dụng HTML, AJAX, Silverlight và kiểm tra định hướng dữ liệu tự động
- Tích hợp với công cụ theo dõi lỗi và Trung tâm Chất lượng HP

*3.31 Tellurium Automated Testing Framework*
- Khung kiểm tra tự động Tellurium là một khung kiểm tra tự động nguồn mở cho ứng dụng web
- Nó được phát triển từ Selenium và được xây dựng trên khái niệm mô-đun giao diện người dùng có sẵn cho các nhà phát triển và người thử nghiệm
- Tellurium hoạt động ở hai chế độ đầu tiên là trình bao bọc cho khung Selenium và phần thứ hai sử dụng Tellurium Engine
- Các mẫu giao diện người dùng Tellurium đã được sử dụng để thể hiện nội dung web động và hỗ trợ kiểm tra trình duyệt chéo

*3.32 TestStack.White Framework*
- TestStack.White Framework là một công cụ tự động hóa nguồn mở UI được viết bằng C # và dựa trên Win32, WinForm, WPF và Java SWT
- Nó phụ thuộc nhiều vào (dựa trên) .NET do đó không yêu cầu bất kỳ ngôn ngữ kịch bản nào
- Xử lý tự động hóa giao diện người dùng phức tạp và API hướng đối tượng nhất quán của chúng tôi
- TestStack.White Framework đã được thay thế bằng TestStack.White

*3.33 UI Automation Powershell Extensions*
- Đây là công cụ miễn phí chứa mô-đun giao diện người dùng giúp dễ dàng thực hiện kiểm tra tự động hóa GUI
- Nó dựa trên thư viện Tự động hóa giao diện người dùng, là một phần của .NET Framework 3.0.
- Hiện tại hỗ trợ các ứng dụng Win32, Windows Form, Java SWT và Delphi (các ứng dụng Delphi cho phép tạo ứng dụng GUI hoặc Console)

*3.34 Watir*
- Watir là viết tắt của Web Application Testing trong Ruby là một nguồn mở được sử dụng để kiểm tra trình duyệt web tự động.
-  Nó được viết bằng Ruby và hỗ trợ tất cả các ứng dụng bất kể công nghệ.
- Được phân loại thành 3 loại chính như Watir-classic, Watir-webdriver và Watirspec.
-  Được chứng minh là nhẹ, mạnh mẽ và dễ sử dụng.

*3.35 Coded UI*
-  Công cụ này tự động kiểm tra hệ thống cho giao diện người dùng của ứng dụng của bạn
-  Nói chung kiểm tra chức năng cho giao diện người dùng của bạn bao gồm kiểm soát giao diện người dùng cá nhân mà bạn đã sử dụng
-  Tập trung vào các xác nhận hợp lệ và logic khác liên quan đến thiết kế giao diện người dùng và có thể được sử dụng để tạo các thử nghiệm dựa trên dữ liệu
-  Nó đòi hỏi Visual Studio Enterprise vì nó là một phần của Visual Studio IDE và hỗ trợ các hệ điều hành như Windows 7, Windows 8 và Windows 10
-  Công cụ thương mại có thể được sử dụng bởi người thử nghiệm và nhà phát triển và được sử dụng thường xuyên

*3.36 HP Unified Functional Testing*
-  Kiểm tra chức năng thống nhất của HP (UFT) nổi tiếng là HP QuickTest Professional
-  Hình thức mới của công cụ kết hợp các tính năng tốt nhất của QuickTest Professional, WinRunner và HP Service Test
-  HP UFT cung cấp khung công tác mạnh mẽ và hiệu quả cho thử nghiệm GUI và API
-  Nó xảy ra các bài kiểm tra chức năng có thể được thực hiện tự động trong việc tăng tốc độ và hiệu quả chi phí
-  Công cụ độc quyền cung cấp kết quả tốt nhất trong Kiểm tra hồi quy và hữu ích để ghi lại từng hành động được thực hiện bởi người dùng trên GUI

*3.37 Cucumber*
-  Cucumber là công cụ phát triển dựa trên hành vi nguồn mở miễn phí sử dụng mã nguồn mở
-  Nó đòi hỏi phải sử dụng Ruby và nó được viết bằng Ruby
-  Ngoài Ruby nó cũng có thể hỗ trợ các ngôn ngữ và ứng dụng khác
-  Thực hiện mô tả chức năng văn bản thuần tuý dưới dạng kiểm tra tự động
-  Hỗ trợ JVM, .NET, Python, Adobe Flex, PHP, WebDriver, Selenium, Waitr, v.v.
-  Nó tập trung vào hành động hệ thống thay vì GUI

*3.38 LoadUI*
-  LoadUI Pro là công cụ kiểm tra tải đi kèm với cả phiên bản thương mại và mã nguồn mở và được thiết kế bởi SmartBear
-  Cho phép giao diện kéo và thả trực quan và dễ dàng tạo và cấu hình thử tải
-  Hỗ trợ kiểm tra web bao gồm thử nghiệm chức năng, kiểm tra khả năng sử dụng, kiểm tra giao diện người dùng, kiểm tra cơ sở dữ liệu, kiểm tra khả năng tương thích, kiểm tra hiệu suất, đào tạo bảo mật, v.v ...
-  Hỗ trợ các giao thức như SOAP / WSDL, REST, Http / Https, JDBC, POX, v.v.

**Kết luận**
    Trên đây là giới thiệu sơ qua về 38 công cụ kiểm thử tự động GUI. Việc sử dụng công cụ kiểm thử GUI giúp Tester phát hiện sơ hở một cách tốt hơn. Tùy thuộc vào từng dự án mà ta sẽ chọn công cụ phù hợp để đạt hiệu quả tốt nhất
    
    
*Tài liệu tham khảo:* https://www.softwaretestinghelp.com/best-gui-testing-tools/