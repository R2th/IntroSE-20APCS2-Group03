Trong bài hướng dẫn lần này, chúng ta sẽ học về ***Selenium IDE***, bắt đầu từ việc cài đặt đến tìm hiểu chi tiết về các tính năng của tool. Kết thúc bài hướng dẫn, hi vọng các bạn đọc sẽ có thể cài đặt IDE và thử nghiệm với các tính năng của nó.
### Giới thiệu về Selenium IDE

Selenium integrated development environment - Môi trường phát triển được tích hợp Selenium, được viết tắt là Selenium IDE là một tool test tự động được phát triển như một plug-in của trình duyệt Firefox. Đó là một trong những tool đơn giản và dễ nhất để cài đặt, học và tiến tới việc viết kịch bản test. Tool được dựa trên tính năng play and record - chạy và ghi lại rất cơ bản và cho phép chỉnh sửa lại các kịch bản đã được record.

Điểm ấn tượng nhất trong việc sử dụng Selenium IDE là  người dùng không cần phải phải nắm được bất kỳ kiến thức lập trình trước. Họ chỉ cần biết một chút về HTML, DOMS và JavaScript để tạo ra nhiều kịch bản test bằng tool này.

Là một plug-in của Firefox, Selenium IDE chỉ hỗ trợ trên trình duyệt Firefox, do đó các kịch bản test chỉ có thể thực hiện trên chính trình duyệt này. Một vài lỗ hổng làm tool không phù hợp để tạo ra các kịch bản test phức tạp. Do đó, các tool khác như Selenium RC, WebDriver sẽ khắc phục.

Vì vậy, trước khi nắm bắt chi tiết về tool Selenium IDE, chúng ta cùng tìm hiểu cách cài đặt nó trước.
### Download và cài đặt Selenium IDE
Để dễ hiểu, chúng ta sẽ chia quy trình cài đặt thành các bước sau đây.

Trước khi, các bạn cần đảm bảo đã cài đặt trình duyệt Mozilla Firefox - có thể download tại đây: https://www.mozilla.org/en-US/

**Step #1: download Selenium IDE**: Mở trình duyệt (Firefox) và nhập đường dẫn: http://seleniumhq.org/ - sẽ mở ra trang web chính thức của Selenium. Hãy kích vào tab Download trên màn hình để xem thông tin tất cả các phiên bản release gần đây nhất.

![](https://images.viblo.asia/9731b5d3-51a5-4440-9dab-cddff5842bf0.jpg)

**Step #2:** Di chuột xuống phần đầu "Selenium IDE" và click vào link hiện tại. Đây là link phiên bản mới nhất của tool.

![](https://images.viblo.asia/8db5b498-659e-4a14-83a2-eae3abb4a3df.jpg)

**Step #3:** Ngay khi click vào link trên, sẽ mở ra màn hình thông tin Add-on của Firefox. Click "Add to Firefox. Lưu ý: cần đọc thêm thông tin "About this extension" để biết thêm thông tin và đảm bảo tương thích với version hiện tại của trình duyệt.

![](https://images.viblo.asia/1916e7e2-080d-4df6-a1f6-2f93f0273884.jpg)

**Step #4:** Sau khi Firefox tải plug-in IDE, click "Install"

![](https://images.viblo.asia/5675505f-0afe-4a05-b441-c39d581a94fb.jpg)

**Step #5:** Firefox thực hiện cài đặt xong sẽ hiển thị hộp thông báo khởi động lại Firefox. Click vào nút "Restart Now" để hoàn thành cài đặt

![](https://images.viblo.asia/744dc603-f234-4f34-8f49-bf5c7e8f71b0.jpg)

**Step #6:** Khi Firefox được restart lại, chúng ta sẽ có thể thấy Selenium IDE hiện thị trong menu bar: Web Developer/ Developer -> Selenium IDE.

![](https://images.viblo.asia/3a183325-7250-4c58-95b4-2616e8ef62dd.jpg)

**Step #7:** Click Web Developer/ Developer -> Selenium IDE hoặc sử dụng phím tắt Ctrl+Alt+S để mở tool.
### Tính năng của Selenium IDE
Chúng ta sẽ cùng đi vào chi tiết của từng tính năng.
![](https://images.viblo.asia/cb4d05c3-71cb-4de8-b14e-04b9fc9347fc.jpg)

**#1. Menu bar**

Menu bar được đặt ở trên đầu cửa sổ Selenium IDE và thường gồm 5 module sau:

* File Menu
* Edit Menu
* Actions Menu
* Options Menu
* Help Menu

 ***1.1 File Menu***
    
![](https://images.viblo.asia/e059b922-79a6-467c-83cc-3febb04867cd.jpg)
    
File Menu khá là giống với tất cả file menu trong những ứng dụng khác. Nó cho phép người dùng:
*  New Test Case: Tạo test case, mở các test case tạo trước đó, lưu thông tin các test case hiện tại.
*  Export Test Case As and Export Test Suite As: là tính năng hỗ trợ xuất ra các test case, bộ test case với các ngôn ngữ lập trình tương thích với Selenium RC và WebDriver. Nó cũng cho phép người dùng tự do lựa chọn giữa các Framework test unit như jUnit, TestNG... Do đó test case IDE có thể được export cho sự kết hợp của ngôn ngữ lập trình, framework test và tool trong gói Selenium.
*  Lựa chọn Export Test Case As sẽ chỉ xuất và chuyển đổi các test case Selenium IDE hiện đang mở.
*  Lựa chọn Export Test Suite As sẽ xuất và chuyển đổi tất cả test case liên quan đế bộ test hiện đang mở.
*  Đóng test case.

![](https://images.viblo.asia/d2aedbea-70ba-4268-a5f1-fa661816c5ef.jpg)

Test case Selenium IDE có thể lưu với các định dạng sau:
* HTML.


Test case Selenium IDE có thể xuất với các định dạng/ngôn ngữ lập trình sau:
* Java (IDE xuất bằng Java).
* rb (IDE xuất bằng Ruby).
* py (IDE xuất bằng Python).
* cs (IDE xuất bằng C#).

![](https://images.viblo.asia/a64fa680-7337-471c-9f20-c5d81dcb19ae.jpg)

Lưu ý: các phiên bản mới sắp tới của Selenium IDE có thể sẽ hỗ trợ nhiều định dạng hơn.

   ***1.2 Edit Menu***
    
 ![](https://images.viblo.asia/cfef5ab8-2c36-483c-b528-593d45358cf5.jpg)
 
 Menu Edit cung cấp các lựa chọn: Undo (Hoàn tác), Redo (Làm lại), Cut, Copy, Paste, Delete, và Select All, tất cả đều giống như những menu Edit khác. Trong đó, đáng chú ý:
 
* Insert New Command - Cho phép người dùng thêm các câu lệnh mới/ các bước test mới ở bất cứ chỗ nào trong test case hiện tại.
* Insert New Comment - Cho phép người dùng thêm các comment ở bất cứ chỗ nào trong test case hiện tại để mô tả các bước thực hiện tiếp theo.

**Insert New Command**

Câu lệnh mới sẽ được thêm vào bên trên dòng lệnh/bước được chọn.

![](https://images.viblo.asia/03dcb782-c333-41fb-8323-e56ba47cc8d4.jpg)

Người dùng có thể thêm action (hành động), taget (đích) và value (giá trị)
![](https://images.viblo.asia/36bb3faa-1915-47b0-8390-06d719f80444.jpg)

**Insert New Comment**

Cách thức thêm comment tương tự như thêm command.

![](https://images.viblo.asia/791991b3-55b3-40f0-afc8-cec99e21d6c9.jpg)

Dòng text màu tím chính là nội dung comment.

   ***1.3 Actions Menu***
   
   ![](https://images.viblo.asia/5c49b10f-d88b-4889-b165-d2ca4dbb1ff9.jpg)
   
  Menu Actions bao gồm các tác vụ sau:
  
*  Record - Tùy chọn Record là để đưa Selenium IDE vào chế độ ghi. Do đó, bất cứ hành động nào của user trên trình duyệt Firefox đều được ghi lại trong IDE. 
*  Play entire test suite - Tùy chọn để chạy lại tất cả các testcase Selenium IDE có liên quan đến bộ kiểm thử hiện tại.
*  Play current test case - Tùy chọn chạy lại testcase Selenium IDe hiện tại đã được ghi lại/ tạo ra bởi người dùng.
*  Pause/ Resume - User  có thể dừng/ khôi phục testcase ở bất kỳ thời điểm nào trong khi đang thực hiện.
*  Toggle Breakpoint - User có thể đặt 1 hoặc nhiều breakpoint để dừng thực thi ở bất cứ bước kiểm tra nào trong quá trình thực hiện.
*  Set/ Clear Start Point - User có thể đặt điểm bắt đầu thực thi ở bất cứ bước kiểm tra nào. Nó cho phép người dùng thực hiện testcase từ điểm bắt đầu cho các lần chạy tiếp theo.
*  Để xử lý việc tải trang/ phần tử, người dùng cần đặt tốc độ thực thi từ nhanh nhất đến thấp nhất cho phù hợp với sự phản hồi của ứng dụng đang test.

   ***1.4 Option Menu***
   
   ![](https://images.viblo.asia/9f56b4da-2145-4ab9-8ca5-d66e119d5378.jpg)
   
Menu Options cho phép người dùng thiết đặt và thực hiện các cài đặt khác nhau của Selenium IDe. Menu Options được gợi ý như một menu quan trọng nhất và hữu ích nhất của tool.

Menu Options chủ yếu gồm 4 phần sau:

![](https://images.viblo.asia/c6214b73-567c-43a7-862d-0487a623094d.jpg)

**Options**

Để mở hộp Selenium IDE Options, thực hiện theo các bước:

  1. Click vào menu Options
  2. Click vào Options

Hộp chọn Selenium IDE Options xuất hiện.

![](https://images.viblo.asia/44bfbc58-fd55-4660-ba2c-2f7223c07fec.jpg)

Selenium IDE Options giúp người dùng thực hiện với các cài đặt chung, định dạng, plug-in, loại định vị sẵn có. Cùng tập trung vào một số các tab quan trọng.

*Genenal Settings*

![](https://images.viblo.asia/f5cd8fd1-0412-4d74-b9e8-29b6cf91b614.jpg)

* Default Timeout Value - Thể hiện bằng thời gian (tính theo mili giây) mà selenium sẽ đợi để thực hiện 1 bước kiểm tra trước khi nón tạo ra lỗi. Thời gian timeout chuẩn là 30000 mili giây (30 giây). Người dùng có thể sử dụng tính năng này bằng cách thay đổi thời gian mặc định trong trường hợp các phần tử của web mất nhiều hơn/ ít hơn thời gian để load.
* Extensions - Selenium IDE hỗ trợ một loại các mở rộng để nâng cao khả năng của tool core bằng cách gia tăng tiềm lực của nó. Những phần mở rộng này đơn giản là các file JavaScript. Chúng có thể thiết lập bằng cách nhập các đường dẫn tuyệt đối vào trường đó. 
* Remember base URL - Lựa chọn option này cho phép Selenium IDE ghi nhớ đường dẫn mỗi khi thực hiện chạy. Do đó, khuyến khích user tích chọn. Không lựa chọn các option này sẽ để trường URL rỗng và nó sẽ chỉ được điền khi chúng ta chạy một URL khác trên trình duyệt.
* Record assertTitle automatically - Lựa chọn này sẽ tự động thêm câu lệnh assertTitle với giá trị mục tiêu cho từng trang web đã truy cập.

![](https://images.viblo.asia/33a5addd-7ee9-42e1-863d-9f26511f150f.jpg)

* Enable experimental features - Lựa chọn trường này cho lần import đầu tiên các định dạng có sẵn vào SElenium IDE.

*Formats*

![](https://images.viblo.asia/82e61a6d-8ddc-419e-a755-10f8939e10a2.jpg)

Tab Formats hiển thị tất cả các định đạng sẵn có của Selenium IDE. Người dùng bị tính thuế với việc kích hoạt hoặc vô hiệu hóa bất kỳ định dạng nào. 

*Selenium IDE Plugins*

Tab Plug-ins hiển thị các plug-ins hỗ trợ cho Firefox mà đã được cài đặt theo yêu cầu của Selenium IDE. Một số các plug-ins có sẵn để trợ giúp các nhu cầu khác nhau, do đó chúng ta có thể cài đặt các add-ons giống như chúng ta đã làm với các plug-ins khác. Một trong các plugin được giới thiệu gần đây laf "File Logging". Trong phần cuối của bài hướng dẫn này, chúng ta sẽ cùng xem cách để cài đặt và sử dụng plug-in này.

Selenium IDE sẽ được chia thành các nhóm plug-ins sau:
* Selenium IDE: Các định dạng của Ruby
* Selenium IDE: Các định dạng của Python
* Selenium IDE: Các định dạng của Java
* Selenium IDE: Các định dạng C#

Các format này phục vụ cho việc chuyển đổi test case HTML thành các định dạng lập trình mong muốn.

![](https://images.viblo.asia/05e3b398-b0ce-4bc5-8c67-90727e006d3f.jpg)

*Locator Builders*

Locator Builders cho phép chúng ta ưu tiên thứ tự các loại locator mà được sinh ra trong khi record hành động của người dùng. Các locator là một bộ các tiêu chuẩn bằng cách đó chúng ta xác định được một phần tử trên trang web.

![](https://images.viblo.asia/0851f0ad-4d06-40ea-8487-fefcb41ca3c8.jpg)

**Formats**

Tùy chọn Formats cho phép người dùng chuyển đổi test case Selenium IDE sang định dạng mong muốn.

![](https://images.viblo.asia/116fdf7d-6f3d-4b7f-9060-2e19810dd3f0.jpg)

   ***1.5 Help Menu***
   
Selenium có một cộng đồng lớn và lượng người dùng cơ bản, do đó các tài liệu, ghi chú phát hành, hướng dẫn... luôn sẵn sàng. Menu Help sẽ liệt kê một loạt các tài liệu chính thức và các ghi chú phát hành để hỗ trợ người dùng.

**#2. Base URL Bar**
   
Thanh Base URL về cơ bản giống với thanh địa chỉ. Nó ghi nhớ các trang web đã từng truy cập trước đây vì thế việc điều hướng trở nên dễ dàng hơn.

![](https://images.viblo.asia/f3c28d52-87a9-4ae4-a7c4-9819a651d8c9.jpg)

Hiện nay, bất cứ khi nào người dùng sử dụng lệnh "open" của Selenium IDE mà không có giá trị mục tiêu, URL cơ sở sẽ được chạy trên trình duyệt.

**Truy cập đường dẫn tương đối**

Để truy cập đường dẫn tương đối, người dùng đơn giản cần nhập giá trị mục tiêu như "/download" cùng với câu lệnh "open". Do đó, URL cơ bản sẽ nối thêm "/download" và đưa lên trình duyệt để chạy.

**#3. Toolbar**

![](https://images.viblo.asia/4af168a9-5a02-4e98-9ba6-186d364345b1.jpg)

Toolbarr cung cấp các tùy chọn thích hợp để ghi và thực thi test case.

* ![](https://images.viblo.asia/1559f879-fc4f-4d94-bf7f-442fe98e927c.jpg) Playback Speed - Lựa chọn này cho phép người dùng quản lý tốc độ thực thi test case từ nhanh đến chậm.
* ![](https://images.viblo.asia/ba869be1-48de-415b-b066-f8c5416acb5a.jpg) Play test suite - Lựa chọn này cho phép người dùng thực hiện tất cả testcase thuộc bộ kiểm thử hiện tại.
* ![](https://images.viblo.asia/e246c49b-a620-41de-81b7-61bf7c9f27a8.jpg) Play test case - Lựa chọn này cho phép người dùng thực hiện các testcase hiện được chọn.
* ![](https://images.viblo.asia/733468ee-f433-4d99-9c1e-6e64b57e2a5b.jpg) Pause - Lựa chọn này cho phép người dùng tạm dừng thực thi đang chạy.
* ![](https://images.viblo.asia/bf635571-7bf1-429e-b3f6-fdd6c530aeb2.jpg) Step - Lựa chọn này cho phép người dùng bước vào bước kiểm tra.
* ![](https://images.viblo.asia/5703b656-de88-4e03-bae9-1912c2cb7983.jpg) Rollup - Lựa chọn cho phép người dùng kết hợp nhiều bước kiểm thử để hoạt động giống như một câu lệnh duy nhất.
* ![](https://images.viblo.asia/e7efae42-192d-4cad-bc45-c4baeeb329f0.jpg) Record - Lựa chọn cho phép người dùng bắt đầu hoặc dừng thao tác ghi hành động của người dùng. Nếu biểu tượng có màu hồng nhưng rỗng màu ở giữa: bắt đầu ghi, biểu tưởng được phủ kín màu đỏ: dừng ghi. Selenium IDE mở ra luôn ở chế độ mặc định là record.

**#4. Editor**

Editor là một phần nơi mà IDE ghi testcase. Từng hành động của người dùng được ghi vào editor theo đúng thứ tự như khi họ thực hiện.

Editor có 2 cách để xem như sau:

   ***4.1 Table View***
   
   ![](https://images.viblo.asia/f408bc27-517d-4c8b-adaa-3073eb5329fa.jpg)
   
Đây là chế độ view mặc định của Selenium IDE. Test case được hiển thị dạng bảng. Mỗi hành động của người dùng trong bảng là 1 sự kết hợp của "Command" - lệnh; "Target" - đích; "Value" - giá trị, trong đó lệnh - ành động người dùng, mục tiêu - các phần tử web được xác định duy nhất và giá trị - dữ liệu test tương ứng. Bên cách việc ghi lại thì nó cũng cho phép người dùng thêm, tạo hoặc chỉnh sửa các câu lệnh with sự hỗ trợ của form editor hiện tại phía dưới.

   ***4.2 Source View***
   
   ![](https://images.viblo.asia/ecb98cdc-14d5-42a8-87fe-c3c73517a4c9.jpg)

Testcase được hiển thị dưới dạng HTML. Mỗi bước kiểm thử được coi là 1 dòng <tr>, là sự kết hợp bởi lệnh, mục tiêu và giá trị trong các cột riêng biệt <td>. Giống như bất cứ tài liệu HTML nào, nhiều dòng và nhiều cột được thêm vào để tương ứng với lệnh Selenese.
    
**Editor Form** cho phép người dùng gõ bất kỳ lệnh nào và các lệnh gợi ý có liên quan có thể tự động điền vào. Nút Select cho phép người dùng chọn bất cứ phần tử web và vị trí của nó có thể tự động nạp vào trường mục tiêu. Button Find cho phép người dùng tìm kiếm các phần tử web trên trang web với mục tiêu đã được xác định. Value là dữ liệu kiểm thử được nhập vào với mục tiêu là để chúng ta kiểm thử kịch bản.

![](https://images.viblo.asia/40e35f5e-a055-45ed-9da3-086a47c42fce.jpg)

**#5. Test case pane**

![](https://images.viblo.asia/e23eafaf-f09a-4106-afd5-909b0355ef35.jpg)

Trường hợp chúng ta mở giao diện Selenium IDE, chúng ta thấy vùng phía bên trái sẽ có dòng tiêu đề "Test case" bao gồm 1 test case "Untitled". Do đó, hộp bên trái này được coi như là Test case pan - Vùng Test case.

Test case pane bao gồm tất cả test case được ghi lại bởi IDE. Công cụ có khả năng mở nhiều hơn một test case vào cùng 1 thời điểm ở Test case pane và người dùng có thể dễ dàng trộn giữa các test case. Các bước kiểm thử của Test cases được tổ chức trong phần biên tập - Editor.

Selenium IDE có thực hiện mã hóa màu sắc để phục vụ việc báo cáo. Sau khi thực thi, test case được đánh dấu màu đỏ hoặc màu xanh.
* Màu đỏ tượng trưng cho việc chạy không thành công, ví dụ: lỗi test case
* Màu xanh tượng trưng cho việc chạy test case thành công.
* Nó cũng bố trí màn hình tóm tắt về tổng số lượng test case được thực thi với số lượng các test case thất bại.
* Nếu chúng ta thực hiện bộ kiểm thử, tất cả các test case được kết hợp sẽ được liệt kê ở Test case pane. Khi thực thi, các mã màu ở trên sẽ được hiển thị phù hợp.

**#6. Log Pane**

![](https://images.viblo.asia/ea7f222b-748f-444a-9e4c-89ef5237ab43.jpg)

Log pane - vùng ghi log - cung cấp thông tin chi tiết về việc thực thi hiện tại theo dạng thông báo với cấp độ ghi log theo thời gian thực. Do đó, message log cho phép user có thể debug - gỡ lỗi - các vấn đề trong trường hợp thực thi test case thất bại.

**Các thức in/ cấp độ log được sử dụng:**

* Error - Thông báo lỗi đưa ra thông tin về các bước kiểm thử lỗi. Nó có thể được sinh ra trong trường hợp khi không tìm thấy phần tử, trang không load được, xác nhận/ xác minh bị thất bại...
* Warn - Cảnh báo đưa ra thông tin về các điều kiện không mong muốn.
* Info - Thông báo Info đưa ra các thông tin về thực thi các bước kiểm thử hiện tại.
* Debug - Thông báo debug đưa ra các thông tin về các kỹ thuật trong backdrop về bước kiểm thử hiện tại.

Log có thể được lọc với sự hỗ trợ của hộp dropdown được đặt ở góc phải phía trên của footer ngay bên cạnh nút Clear. Nút Clear sẽ xóa tất cả các thông báo log được sinh ra ở lần chạy hiện tại hoặc ở lần trước đó.

**Sinh log trong môi trường bên ngoài**

Plug-in "File Logging" được giới thiệu gần đây,  cho phép người dùng lưu thông tin log vào một file mở rộng. File Logging có thế được cài vào IDE giống như bất cứ các plug-in khác. Khi cài đặt, nó có thể được tìm thấy ở 1 tab có tên "File Logging" ở phần footer bên cạnh nút Clear.

![](https://images.viblo.asia/ea7f222b-748f-444a-9e4c-89ef5237ab43.jpg)

![](https://images.viblo.asia/c8cd2135-53c4-498a-b17d-33b6fcbeb578.jpg)

**Reference Pane**

Reference Pane đưa ra các mô tả ngắn gọn về các lệnh Selenses được chọn hiện tại với các đối số chi tiết của nó.

![](https://images.viblo.asia/865726c5-434b-40d2-8efe-63c2c5751fa6.jpg)

**UI-Element Pane**

UI - Element Pane cho phép người dùng Selenium sử dụng các cụm chú giải cho đối tượng JavaScript như JSON để truy cập phần tử của trang. Bạn có thể tìm hiểu thêm thông tin trong tài iệu UI-Element trong phần Help Menu.

**Rollup Pane**

Rollup Pane cho phép người dùng cuộn lên hoặc kết hợp nhiều bước kiểm thử để tạo thành một lệnh đơn với tên gọi "rollup". Các rollup lần lượt được gọi nhiều lần trong test case.

### Kết luận

Qua bài hướng dẫn này, mục tiêu mong muốn để các bạn có thể làm quen và hiểu hơn về các thuật ngữ cơ bản và danh pháp của Selenium IDE. Ngoài ra, chúng tôi cũng đã trình bày chi tiết về các tính năng của Selenium IDE.

**Dưới đây là những điểm then chốt của bài hướng dẫn:**
* Selenium IDE là một tool test tự động, hỗ trợ bằng cách record and play back.
* Người dùng không cần phải có kiến thức về ngôn ngữ lập trình ngoại trừ những hiểu biết cơ bản về HTML, JavaScript và DOM.
* Thanh menu cho phép người dùng, tạo, lưu, chỉnh sửa và chuyển đổi các kịch bản kiểm thử do Selenium IDE record lại. Nó cũng cho phép người dùng thiết đặt các định dạng và Plug-ins.
* Toolbar cho phép người dùng thiết đặt tốc độ thực hiện kiểm thử, dừng lại hoặc khôi phục test case, roll up lệnh...
* Roll ups là sự kết hợp nhiều hơn một bước thực hiện kiểm thử và do đó các lệnh roll up hoạt động và thực hiện như một lệnh độc lập.
* Editor cho phép người dùng ghi và tạo ra các kịch bản test. Editor có 2 cách view là: table và source
* View dạng table, mỗi bước kiểm thử là sự kết hợp của command, target và value.
* View dạng source hiển thị test case dạng HTML.
* Test case pane hiển thị một danh sách đầy đủ các test case thất bại và thành công với những màu sắc tương ứng.
* Log Pane hiển thị kết quả kiêm thử theo dạng message.
* Log messages có thể lưu lại thành file bằng cách sử dụng plug-in "File Logging".
* Reference pane đưa ra các mô tả về từng câu lệnh được chọn.
* UI-Element và Rollup thường được sử dụng trong khi tạo ra kịch bản Selenium IDE nâng cao.



Nguồn bài viết: http://www.softwaretestinghelp.com/selenium-ide-download-and-installation-selenium-tutorial-2/