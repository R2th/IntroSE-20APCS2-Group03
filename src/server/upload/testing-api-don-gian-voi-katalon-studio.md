## Katalon Studio là gì ?

**Katalon Studio** là một giải pháp kiểm tra tự động hóa miễn phí được phát triển bởi Katalon LLC. 

Phần mềm này được xây dựng dựa trên khung cộng tác tự động nguồn mở Selenium , Appium với giao diện IDE chuyên biệt cho API ,dùng cho kiểm tra Web và Mobile 

![](https://images.viblo.asia/eed6390e-2eac-4397-9222-ca1254af468a.png)

## Tại sao lại chọn Katalon Studio?

Katalon Studio được xây dựng từ Selenium/Appium, vậy thì tại sao chúng ta không dùng trực tiếp hai công cụ phổ biến trong cộng động kiểm thử này mà cần phải dùng đến Katalon Studio . Và đây là những lý do chọn Katalon Studio

* Nó miễn phí.
* Dễ dàng cài đặt và dễ dàng sử dụng cho cả những người có kỹ thuật kiểm thử hay những người phi kỹ thuật.
* Giao diện thân thiện dễ thao tác, dễ sử dụng cho các test case tự động hóa.
* Các từ khóa được tích hợp sẵn sẽ giảm effort cho việc tạo lại từ đầu quá trình kiểm thử. Tích hợp nhiều library, apps hữu ích: POI, TestNG, Data Driven ...
* Các chế độ thủ công và kịch bản kép sẽ đáp ứng kỹ năng của team theo các cấp độ khác nhau.
* Hỗ trợ BDD Cucumber.
* Hỗ trợ nhiều nền tảng và nhiều thiết bị di động. Nó hoạt động trên hầu hết các hệ điều hành và các trình duyệt phổ biến.
* Nó có thể áp dụng cho các loại kiểm thử khác nhau bao gồm API, Web UI và thiết bị di động.
* Nó cho phép mọi người trong nhóm cộng tác và tập trung vào các kiểm thử của họ.
* Nó có một cộng đồng người dùng tích cực và năng động.

![](https://images.viblo.asia/4ea5d9c1-026d-41f2-be37-5a8cd51da6ac.png)

## Cài đặt Katalon Studio

Katalon Studio yêu cầu cấu hình tối thiểu với 1Ghz Processor và 1GB RAM , điều này thực sự hữu ích cho bất kỳ ai muốn cài đặt Katalon Studio. Với máy PC hiện tại, khó mà tìm ra cấu hình dưới 1Ghz, như một chip Atom cũng đã là 1,33Ghz rồi. Ngược lại, với Selenium chuẩn, cấu hình tối thiểu hoàn toàn phụ thuộc vào IDE mà kỹ sư kiểm thử sử dụng (Visual Studio hay Eclipse, IntelliJ).

**Việc cài đặt studio Katalon cực kỳ dễ dàng và đơn giản chỉ với hai bước:**
* Tải xuống công cụ từ [đây](https://www.katalon.com)
* Khởi động và kích hoạt bằng địa chỉ email hợp lệ.

![](https://images.viblo.asia/999fa466-8fdb-4b5a-b382-65cfd5f18630.png)

## Tạo kiểm thử API
### I. Hãy tạo một dự án kiểm thử:

Vào **File** => **New** => **Project**

Nhập tên dự án và đường dẫn thư mục của nó để tạo project mới.
![](https://images.viblo.asia/02d31e0a-f797-4a2c-be9e-c1aecfc37e01.png)

Cấu trúc thư mục được xác định trước của dự án được tạo ra để lưu trữ các phần tử khác nhau, được hiển thị trong phần **Tests Explorer**. 

Ba thư mục quan trọng bao gồm **Test Cases**, **Object Repository** và **Test Suites**.

*  **Object Repository** là nơi lưu trữ tất cả các thông tin điểm cuối của Web Service (hoặc các yêu cầu) bao gồm : các phương thức yêu cầu, URL, tiêu đề, nội dung và xác thực.

* **Test Cases** là nơi tất cả các kịch bản kiểm thử được đặt ra và nhóm lại. Mỗi một test case bao gồm các bước kiểm thử thể hiện cho một kịch bản thử nghiệm.

* **Test Suites** chứa tất cả các bộ kiểm thử là tập hợp các test case được xác minh mục tiêu cụ thể. Tập hợp các Test Suites là tập hợp các bộ kiểm thử xác minh mục tiêu lớn hơn.

![](https://images.viblo.asia/a6882abe-e769-443f-b810-762de7faca43.png)

### II. Tạo điểm cuối Web service.

Katalon Studio lưu trữ tất cả các điểm cuối của Web Service trong Object Repository.

Chọn **Object Repository** => **New** => **Web Service Request** để tạo một yêu cầu mới.

![](https://images.viblo.asia/2bbb6ef8-ecb8-41ea-b968-8d0698a28d3e.png)

Trong hộp thông tin **Create New Web Service Request**: 
- Nhập Name, Request Type, URL và Description để tạo yêu cầu. 
- Bạn có thể chọn loại yêu cầu RESTful hoặc SOAP.
- Cuối cùng nhấn OK. 

![](https://images.viblo.asia/2c2d77bb-9c07-4d4b-900d-79849dc0e4aa.png)

Màn hình sau đây sẽ được hiển thị cho phép bạn nhập thêm các yêu cầu khác một cách chi tiết hơn.

![](https://images.viblo.asia/194c0569-90d2-48d1-87ea-aefeb2d4b014.jpg)

#### Vài mục bạn cần xác định cho một yêu cầu RESTful:

**1. Request Method (Phương thức yêu cầu)**
- Bạn có thể chọn một trong bốn phương thức REST này cho yêu cầu: GET, POST, PUT và DELETE.
Phương thức phải khớp với URL yêu cầu. 
- Trong ví dụ dưới, ta sẽ sử dụng phương thức GET để lấy thông tin về một vé hiện có qua ID trong JIRA.

**2. URL yêu cầu (Request URL)**

- URL yêu cầu chỉ định địa chỉ của yêu cầu ( Ví dụ: Máy chủ web, cổng và đường dẫn).

**3. Ủy quyền (Authorization)**

- Ủy quyền là một phần thiết yếu của một API. Nó được sử dụng để xác thực người dùng và yêu cầu truy cập. Katalon Studio hỗ trợ các phương thức xác thực phổ biến và một trong số đó là cơ bản phải có.

- Phương thức cơ bản sẽ yêu cầu tên người dùng và mật khẩu. Đảm bảo nhấp vào **Update to HTTP Header** để thông tin đăng nhập được áp dụng cho **HTTP Header**.

![](https://images.viblo.asia/d4b3f8c8-29cc-4fe2-bdb4-596d7e3c9f15.png)

**4. Xác minh (Verification)**

- Verification được sử dụng để xác định các xác nhận nhằm mục đích đảm bảo rằng phản hồi chứa các thông tin mong muốn.

- Tab Verification cho yêu cầu tương tự như tab Script cho một test case.
Nói một cách khác, bạn có thể viết các tập lệnh tùy chỉnh với các từ khóa được xây dựng sẵn hoặc các kịch bản lệnh Groovy/Java để xác minh dữ liệu phản hồi. Bên cạnh các từ khóa được tích hợp sẵn, Katalon Studio còn cung cấp các đoạn mã được tích hợp sẵn để giúp tạo ra các xác nhận dễ dàng.

- Để bao gồm tập lệnh xác minh khi gửi yêu cầu, bạn cần chọn tùy chọn **Test Request and Verify** (được hiển thị trong ảnh chụp màn hình bên dưới). Các tập lệnh xác minh cho phép bạn kiểm tra trạng thái yêu cầu một cách dễ dàng.

![](https://images.viblo.asia/ac8ee88b-341d-40f9-915d-ea2b27a4b392.jpg)

**5. Các biến (Variables)**

Variables làm cho việc kiểm thử API trở nên mạnh mẽ và năng động hơn bằng cách tiếp cận theo hướng dữ liệu.

Trong Katalon Studio, mọi phần của yêu cầu có thể được tham số hóa. Nói một cách khác, bạn có thể xác định các biến cho URL, Xác thực (Authentication), HTTP Header và HTTP Body.

![](https://images.viblo.asia/6a2bfa8f-93de-4114-9515-4fdfe9218f20.png)

**6. Trình định dạng (Formatter)**

Phản hồi sẽ được tự động hiển thị ở định dạng gọn gàng trong JSON, XML, HTML hoặc JavaScript. Formatter rất hữu ích cho việc hiển thị của trạng thái phản hồi.

## Thêm yêu cầu hiện tại (Existing Request) vào test case

Một yêu cầu có thể được chèn vào một test case bằng cách sử dụng các từ khóa tích hợp web service. 

Có một số từ khóa nhất định để gửi yêu cầu, để xác minh phản hồi và đưa ra yêu cầu như là một phần của luồng kiểm thử lớn hơn.

![](https://images.viblo.asia/6d2de3b0-0546-49aa-b826-4e71ecb989f2.png)

**Test case sau đây minh họa cách gọi yêu cầu với các bước xác minh:**

![](https://images.viblo.asia/8d48505f-9f5c-4ddc-ae79-588f0855073c.png)

Các test case có thể được thực hiện như bình thường. Và mỗi bước xác minh có thể được xem từ Log Viewer.

![](https://images.viblo.asia/0375b586-9bdd-4cff-9115-45ed071b7d9e.png)

## Thêm các test case vào bộ kiểm thử

Bạn có thể thêm một test case vào một bộ kiểm thử bằng cách sử dụng chức năng kéo và thả hoặc chức năng **Add test case**

Một khi các test case được thêm vào test suite, bạn có thể thực hiện test suite bằng cách kích **Run** (không chọn trình duyệt để chạy như khi test Web UI)

![](https://images.viblo.asia/230b70e7-2cfd-4ed3-924d-e96b0d4835b6.png)

## Bước tiếp theo

Sau khi tạo các test case để kiểm thử API bằng cách sử dụng các bước ở trên, bạn có thể sửa đổi các test case của mình để phản ánh nhu cầu kiểm thử thực sự của dự án theo cách tốt hơn.

**Katalon Studio cho phép bạn:**
- Tham số hóa các bài kiểm thử của bạn.
- Áp dụng cách tiếp cận theo hướng dữ liệu.
- Tạo các từ khóa / gói tùy chỉnh.
- Kiểm thử cuộc gọi và sử dụng lại mã.
- Bao gồm xử lý lỗi.
- Xem báo cáo kiểm thử sau khi thực hiện kiểm thử.

## Hỗ trợ BDD Cucumber 

Katalon Studio gần đây đã phát hành một phiên bản mới để hỗ trợ BDD Cucumber. 

**BDD Cucumber** là phương pháp kiểm thử trong đó các test case được viết bằng ngôn ngữ tự nhiên. Do đó, các test case có thể được chuẩn bị bởi các thành viên trong nhóm với các kỹ năng khác nhau, cả nhân viên kỹ thuật và các bên kinh doanh liên quan.

BDD Cucumber cũng giúp tạo ra các kịch bản kiểm thử cho giai đoạn kiểm thử nghiệm thu (Acceptance test).

## UI / UX của Katalon Studio
Katalon Studio hiện cung cấp UI/ UX cho người kiểm thử có ít kỹ năng lập trình một cách rất tốt. Vì vậy họ có thể dễ dàng sử dụng các tính năng như tích hợp từ khóa, kéo/thả cũng như tìm kiếm hoặc chọn các test case để sử dụng lại.

Tuy nhiên, việc sử dụng các tính năng này có thể tốn thời gian cho những người nhiều có kinh nghiệm. Sẽ thật tuyệt nếu Katalon Studio tập trung hơn vào việc cải thiện các kịch bản trải nghiệm.

## Phần kết
Sau khi thử các tính năng kiểm thử API Katalon Studio, bạn sẽ khá hài lòng với kết quả vì nó phù hợp với nhóm và về cả người kiểm thử tự động và thủ công. Chúng ta có thể sử dụng Katalon Studio để kiểm thử API cũng như kiểm thử Web UI một cách dễ dàng .
Ngoài ra việc tìm kiếm và tham khảo về Katalon Studio cũng rất đơn giản . 

Ví dụ tham khảo tại [Katalon Studio Youtube Channel](https://www.youtube.com/channel/UC0g8oLvxnX0i3Ul98uSOrPA/videos) 

- Nguồn: https://www.softwaretestinghelp.com/katalon-studio/