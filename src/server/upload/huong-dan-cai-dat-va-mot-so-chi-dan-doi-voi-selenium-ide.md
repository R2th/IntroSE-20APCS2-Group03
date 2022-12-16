Ở bài trước chúng ta đã tìm hiểu [tổng quan về  Selenium](https://viblo.asia/p/lam-quen-voi-trinh-kiem-thu-tu-dong-selenium-GrLZDQ8wlk0). Tiếp đến chúng ta cùng tìm hiểu cách cài đặt và một số chỉ dẫn đối với Selenium IDE để tiện hơn khi sử dụng nhé (yeah)
    
  Trong hướng dẫn này, chúng ta sẽ tìm hiểu tất cả về Selenium IDE, bắt đầu từ quá trình cài đặt đến các chi tiết về từng tính năng của nó. Đọc hết bài hướng dẫn này, dự kiến bạn sẽ có thể cài đặt thành công công cụ Selenium IDE và thành thạo với các tính năng của nó :D
  
  Bản gốc : https://www.softwaretestinghelp.com/selenium-ide-download-and-installation-selenium-tutorial-2/
  
###   Giới thiệu về Selenium IDE

![](https://images.viblo.asia/0537d194-624e-411f-b5f6-11adfc2a0953.jpg)

Selenium IDE là viết tắt của cụm từ Môi trường phát triển tích hợp Selenium, là một công cụ kiểm thử tự động được phát hành dưới dạng trình cắm Firefox (Firefox plug-in). Đây là một trong những công cụ đơn giản và dễ dàng sử dụng nhất để cài đặt, tìm hiểu và tạo các kịch bản test. Công cụ này được đặt trên một bản ghi, có thể phát lại tập lệnh và cũng cho phép chỉnh sửa các tập lệnh được ghi (chỉnh sửa kịch bản kiểm thử).

Điểm ấn tượng nhất của việc sử dụng selenium IDE là người dùng không bắt buộc phải có kiến thức lập trình nào trước đó. Tối thiểu mà người dùng cần là biết về HTML, DOMS và JavaScript để tạo ra các tập lệnh thử nghiệm (kịch bản test) bằng công cụ này.

Vì là một trình cắm thêm của Firefox, nên Selenium IDE chỉ hỗ trợ trên Firefox, do đó các tập lệnh kiểm thử được tạo chỉ có thể được thực thi trên Firefox. Một vài sơ hở nữa làm cho công cụ này không phù hợp để sử dụng cho các kịch bản thử nghiệm phức tạp. Khi đó sẽ cần đến các công cụ khác như Selenium RC, WebDriver.

Trước khi tìm hiểu thông tin chi tiết về Selenium IDE, trước tiên hãy xem phần cài đặt của nó.

### Download và Cài đặt Selenium IDE

**Pre-condition** : Đã cài đặt Mozilla Firefox 

Để dễ hiểu, họ đã phân chia toàn bộ quá trình cài đặt IDE theo các bước sau:

**Bước # 1: Tải xuống Selenium IDE:** 
Mở trình duyệt (Firefox) và nhập URL http://seleniumhq.org/. Nó sẽ mở ra trang web trụ sở chính của Selenium. Click vào button "Download", nó sẽ điều hướng đến trang Tải xuống; trang này bao gồm tất cả các bản phát hành mới nhất của tất cả các thành phần Selenium.

Tham khảo hình sau.

![](https://images.viblo.asia/bc706b55-221c-4b9d-b1dd-2aab05e5ac85.jpg)

**Bước # 2:** Di chuyển xuống dưới và nhấp vào liên kết giống hình dưới đây. Liên kết này đại diện cho phiên bản mới nhất của công cụ trong kho lưu trữ.

Tham khảo hình sau.

![](https://images.viblo.asia/2382a1bb-044c-432e-a295-561b24de8885.jpg)

**Bước # 3:** Ngay sau khi chúng ta nhấp vào liên kết trên, một popup cảnh báo bảo mật sẽ xuất hiện để bảo vệ hệ thống của chúng ta trước các rủi ro tiềm ẩn. Vì chúng ta đang tải xuống trình cắm từ trang web xác thực, do đó, hãy nhấp vào nút "Allow" để cho phép cài đặt.

**Bước # 4:** Bây giờ Firefox tải xuống trình cắm trong nền. Ngay sau khi quá trình hoàn tất, cửa sổ cài đặt phần mềm sẽ xuất hiện. Bây giờ bấm vào nút “Install Now”.

![](https://images.viblo.asia/e9e1a1b3-8760-463e-8f4b-bb0ad2fa4d9a.jpg)

**Bước # 5:** Sau khi cài đặt hoàn tất, một cửa sổ bật lên xuất hiện yêu cầu khởi động lại Firefox. Nhấp vào nút Khởi động lại ngay bây giờ “Restart Now” để phản ánh Cài đặt Selenium IDE.

**Bước # 6:** Khi Firefox được khởi động lại, chúng ta có thể thấy selenium IDE được lập chỉ mục dưới thanh menu -> Web Developer -> Selenium IDE.

![](https://images.viblo.asia/39363cd5-7ef0-473f-bcb3-7c44a1f210a9.jpg)

**Bước # 7:** Ngay sau khi chúng ta mở Selenium IDE, cửa sổ Selenium IDE sẽ xuất hiện.

## Các tính năng của Selenium IDE

![](https://images.viblo.asia/90009555-8180-4284-b0c6-4905fbb20256.jpg)

###  #1. Menu Bar

Thanh menu được đặt ở vị trí cao nhất của cửa sổ Selenium IDE. Thanh menu thường bao gồm 5 mô-đun:
* File Menu
* Edit Menu
* Actions Menu
* Options Menu
* Help Menu

**A) File Menu**

![](https://images.viblo.asia/3806b6e3-d721-4acd-9cda-43aa78f560ec.jpg)

File Menu giống với file menu thuộc bất kỳ ứng dụng nào khác. Nó cho phép người dùng:
* Tạo kịch bản test mới (New Test Case), mở/xem kịch bản test hiện có (Open...), lưu kịch bản test hiện tại (Save, Save As ... trong trường hợp có thay đổi/chỉnh sửa).
* Export các kịch bản test ra file (Export Test Case As và Export Test Suite As) trong bất kỳ ngôn ngữ lập trình liên quan nào tương thích với Selenium RC và WebDriver. Nó cũng cho phép người dùng tự do sử dụng các khung thử nghiệm đơn vị có sẵn như jUnit, TestNG, v.v... nếu thích. Do đó, một kịch bản test của IDE có thể được export theo một bộ liên kết : ngôn ngữ lập trình (Ruby, Java, Python 2 ...), công cụ kiểm tra đơn vị - Unit Testing (RSpec, Test::Unit, JUnit 4 ...) và tool của gói selenium đã chọn (WebDriver, Remote Control ...). Xem ảnh dưới đây để trực quan hơn.
* Export Test Case As... : chỉ export và convert kịch bản test hiện đang mở.
* Export Test Suite As... : export và convert toàn bộ bộ Testcase của kịch bản test đang mở.
* Đóng kịch bản test hiện tại.

![](https://images.viblo.asia/bcc7c620-6872-4402-8601-6ddc94c11325.jpg)

**Các kịch bản test Selenium IDE có thể được lưu thành định dạng sau:**
* HTML format

Các kịch bản test Selenium IDE có thể được xuất (export) sang các định dạng / ngôn ngữ lập trình sau:
* .java (IDE được export trong Java)
* .rb (IDE được export trong Ruby)
* .py (IDE được export trong Python)
* .cs (IDE được export trong C#)

![](https://images.viblo.asia/59c32bda-de78-42c4-8b8d-74754f40e48b.jpg)

Ở các phiên bản mới hơn của Selenium IDE sắp tới, sự hỗ trợ cho các định dạng có thể sẽ mở rộng hơn nữa.

**B) Edit Menu**

![](https://images.viblo.asia/e46b913a-02a7-4d96-8156-43debd15c7f7.jpg)

Phần này cung cấp các tùy chọn như : Hoàn tác (Undo), Làm lại (Redo), Cắt (Cut), Sao chép (Copy), Dán (Paste), Xóa (Delete) và Chọn Tất cả (Select All) - những thứ thường xuyên có trong bất kỳ menu chỉnh sửa nào khác. Trong số đó, đáng chú ý là:
* Insert New Command (Chèn lệnh mới) - Cho phép người dùng chèn lệnh / bước kiểm tra mới ở bất cứ đâu trong kịch bản test hiện tại.
* Insert New Comment (Chèn nhận xét mới) - Cho phép người dùng chèn comment mới ở bất kỳ đâu trong kịch bản test hiện tại (có thể là comment để mô tả các bước kiểm tra tiếp theo).

**Insert New Command (Chèn lệnh mới)**

Lệnh mới sẽ được chèn phía trên dòng lệnh đã chọn.

![](https://images.viblo.asia/030ed7cb-d2f8-406f-8db9-7cc123c315b3.jpg)

Sau khi chèn command thành công thì nhập value cho các mục : Command, Target, Value

![](https://images.viblo.asia/697b7f4c-6435-4672-84a0-e12517982015.jpg)

**Insert New Comment (Chèn nhận xét mới)**

Tương tự như chèn command mới, chúng ta có thể chèn comment mới 1 cách dễ dàng

![](https://images.viblo.asia/684b0007-f42a-46b1-a0b6-8fbd21c77d06.jpg)

Phần màu tím là ô để nhập nội dung comment mong muốn.

**C) Actions Menu**

![](https://images.viblo.asia/aaadc877-5191-4d6e-94db-1de74ec9e7a1.jpg)

Bao gồm các tùy chọn như:

* **Record** – Tinh chỉnh IDE Selenium vào chế độ ghi. Do đó, mọi hành động được thực hiện bởi người dùng trên trình duyệt Firefox sẽ được ghi lại trong IDE.
* **Play entire test suite** – Chạy/phát toàn bộ kịch bản test của bộ kịch bản hiện tại.
* **Play the current test case** – Chạy/phát kịch bản test hiện tại.
* **Pause / Resume** – Tạm dừng / Tiếp tục kịch bản test tại bất kỳ thời điểm nào trong khi thực hiện.
* **Toggle Breakpoint** – Người dùng có thể đặt một hoặc nhiều điểm dừng để phá vỡ mạch test tại bất kỳ bước kiểm tra cụ thể nào trong khi thực hiện.
* **Set / Clear Start Point** – Đặt điểm bắt đầu tại bất kỳ bước kiểm tra cụ thể nào để thực hiện. Nó sẽ bắt đầu kiểm tra từ điểm bắt đầu này ở các lần chạy tiếp theo.
* Fast - Slow bar – điều chỉnh tốc độ chạy kịch bản test, từ nhanh đến chậm (tốc độ giảm dần)

**D) Options Menu**

![](https://images.viblo.asia/1bf8516c-ea8d-45ac-b149-dc46b8137958.jpg)

Options Menu cho phép người dùng thiết lập các cài đặt khác nhau do Selenium IDE cung cấp. Options Menu được khuyến nghị là một trong những menu quan trọng và tiện lợi nhất của tool này. Chủ yếu bao gồm bốn thành phần sau đây:

![](https://images.viblo.asia/0b662c25-4dbe-4b0b-a32d-ef8a7f5fe25a.jpg)

**D.1. Options...**

Hộp thoại các tùy chọn của Selenium IDE

Để khởi chạy hộp thoại này, hãy làm theo các bước:
* Nhấp vào Options Menu
* Nhấp vào Options

Một hộp thoại các tùy chọn của Selenium IDE xuất hiện (hình dưới đây)

![](https://images.viblo.asia/ed8ce5f9-b5d5-4411-9a3d-5c63e39d2fb5.jpg)

Hộp thoại này hỗ trợ người dùng thiết lập các cài đặt chung (General), Định dạng có sẵn (Formats), các trình cắm có sẵn (Pluggins), các loại định vị có sẵn (Locator Builders) và trình tạo của chúng (WebDriver). Trong đó có 1 số phần quan trọng:

***General Settings***

![](https://images.viblo.asia/3e147a19-d6d7-4e5e-94ca-ef81df5029fb.jpg)

* **Default Timeout Value** – Thời gian chờ mặc định biểu thị thời gian (tính bằng mili giây) mà selenium sẽ đợi step test được thực thi nếu không thì báo lỗi. Giá trị thời gian chờ tiêu chuẩn là 30000 mili giây tức là 30 giây. Chúng ta có thể chỉnh sửa thời gian chờ này theo nhu cầu sử dụng thực tế.
* **Extensions** – Selenium IDE hỗ trợ một loạt các tiện ích mở rộng để tiện lợi cho người dùng. Các tiện ích mở rộng này chỉ đơn giản là các tệp JavaScript. Có thể thiết lập bằng cách đề cập đường dẫn tuyệt đối của các tệp JavaScript này trong input field của mục (phần này mình chưa hiểu lắm cũng chưa có dịp thực hiện, sẽ update chi tiết dễ hiểu hơn sau khi hiểu cặn kẽ).
* **Remember base URL** – Việc chọn tùy chọn này cho phép Selenium IDE ghi nhớ URL mỗi khi chúng ta khởi chạy nó (nên chọn mục này). Bỏ chọn tùy chọn này sẽ để trống trường base URL mỗi khi mở Selenium IDE.
* **Record assertTitle automatically** – Việc chọn tùy chọn này cho phép tự động chèn lệnh assertTitle cùng với giá trị đích cho mỗi trang web được truy cập.

![](https://images.viblo.asia/a54fda5c-3b02-4ecf-b144-01c9a2912652.jpg)

* **Enable experimental features** (Bật các tính năng thử nghiệm) – Tự động nhập các định dạng có sẵn khác nhau vào Selenium IDE ở lần đầu import.

***Formats***

![](https://images.viblo.asia/76eea887-ecd0-4500-85be-dfa4f0eeb403.jpg)

Tab Formats hiển thị tất cả các định dạng có sẵn của selenium IDE. Người dùng có thể lựa chọn kích hoạt và vô hiệu hóa bất kỳ định dạng nào trong đây.

***Plugins***

Tab Plugins hiển thị các trình cắm Firefox được hỗ trợ cài đặt trên phiên bản Selenium IDE của chúng ta. Có một số plugin có sẵn để phục vụ các nhu cầu khác nhau, do đó chúng ta có thể cài đặt các tiện ích bổ sung này giống như cài đặt các plugin thông thường khác. Một trong những plugin được giới thiệu gần đây là "File Logging". Chúng ta sẽ được biết cách cài đặt và sử dụng trình cắm này ở cuối bài viết.

Với bản phân phối chuẩn, Selenium IDE đi kèm với một nhóm các trình cắm sau:

* Selenium IDE: Ruby Formatters (Trình định dạng Ruby)
* Selenium IDE: Python Formatters (Trình định dạng Python)
* Selenium IDE: Java Formatters (Trình định dạng Java)
* Selenium IDE: C# Formatters (Trình định dạng C#)

Các trình định dạng này chịu trách nhiệm chuyển đổi các kịch bản test HTML thành các định dạng ngôn ngữ lập trình mong muốn.

![](https://images.viblo.asia/ae654be1-e25c-4ccc-a774-f0e8ec6177bc.jpg)

***Locator Builders***

Trình xây dựng trình định vị (Locator Builders) cho phép chúng ta ưu tiên thứ tự các loại locator mà được sinh ra trong khi ghi lại hành động của người dùng. Các locator là một bộ các tiêu chuẩn bằng cách đó chúng ta xác định được một phần tử trên trang web.

![](https://images.viblo.asia/43fbe15e-1aff-4007-a55f-5fc45c154653.jpg)

**D.2. Formats**

Tùy chọn định dạng cho phép người dùng chuyển đổi kịch bản test Selenium IDE (các câu lệnh selenese) sang định dạng mong muốn.

![](https://images.viblo.asia/400307a9-1027-46b3-a8b4-91a5fa4e3fd1.jpg)

**E) Help Menu**

Tổng hợp các tip và hướng dẫn sử dụng

### #2. Thanh Base URL

Thanh Base URL giống như thanh địa chỉ url. Nó nhớ các trang web đã truy cập trước đó để giúp dễ dàng điều hướng sau này.

![](https://images.viblo.asia/cd2c888b-4d89-4005-b03e-cd782fe94e2f.jpg)

Bây giờ, bất cứ khi nào người dùng sử dụng lệnh mở Selenium IDE của Microsoft mà không có giá trị đích, thì Base URL sẽ được khởi chạy trên trình duyệt.

**Accessing relative paths  - Truy cập đường dẫn tương đối**

Để truy cập các đường dẫn tương đối, người dùng chỉ cần nhập một từ khóa trong giá trị đích , ví dụ như “/download”, cùng với lệnh open. Sau đó, URL cơ sở sẽ được gắn thêm hậu tố “/downloads”  (hoặc nếu nhập "/resource" vào mục Target như hình trên thì http://docs.seleniumhq.org/resource sẽ được khởi chạy trên trình duyệt).

### #3. Toolbar

![](https://images.viblo.asia/a69b4a63-dc35-4e8e-b168-edbcbdd4f45b.jpg)

Toolbar cung cấp các tính năng phục vụ việc ghi và thực thi kịch bản test

* ![](https://images.viblo.asia/fcc7e7a4-545b-482b-80b2-47aa7149716c.jpg) **Playback Speed** – Điều chỉnh tốc độ thực hiện nhanh chậm tùy ý
* ![](https://images.viblo.asia/c1c0afff-a0c7-4c84-81ff-593e212b0731.jpg) **Play test suite** – Thực hiện tuần tự toàn bộ từng testcase trong bộ test suite hiện tại
* ![](https://images.viblo.asia/84f429f2-7326-46cb-a2c3-e5119648fb41.jpg) **Play test case** – Thực hiện testcase đang được chọn
* ![](https://images.viblo.asia/c3f7b14a-41f9-4e5b-b85e-7aef45f28c87.jpg) **Pause** – Tạm dừng
* ![](https://images.viblo.asia/f64efe59-a47b-4179-b19c-c0b3da589e57.jpg) **Step** – Thực hiện theo step
* ![](https://images.viblo.asia/3f1bc905-6346-4487-b489-80cb32c28ee6.jpg) **Rollup** – Nhóm nhiều test step thành 1 command
* ![](https://images.viblo.asia/57930bca-ce2b-4b29-8683-3af28d849690.jpg) **Record** – Start/Stop ghi lại hành động của người dùng. Quả bóng (icon record) màu đỏ rỗng (nhạt) là đang ghi, đỏ đậm (đặc) là đã kết thúc phiên ghi.  Theo mặc định, Selenium IDE mở trong chế độ đang ghi.