Hôm nay mình lại tiếp tục trình bày về Robotium
# 3. Robotium APIs
## 3.1. Mục đích

Giới thiệu về lớp Solo và thông tin về các API trong framework Robotium, kiến thức mang tính quốc tế về sử dụng Robotium - Resource ID test case, đánh giá Test case

**Solo**
Lớp Solo là một lớp chính được cung cấp trong Robotium framework, bao gồm các APIs (Application Program Interface) hỗ trợ cho việc viết test case trong dự án. Robotium được dùng để liên kết các lớp kiểm thử trong  Android 

*Ví dụ như ActivityInstrumentationTestCase2 và SingleLaunchActivityTestCase.*

Lớp Solo có 2 hàm khởi tạo sau:
* Solo (android.app.Instrumentation instrumentation): hàm khởi tạo nhận 1 tham số instrumentation từ package android.app.Instrumentation
* Solo (android.app.Instrumentation instrumentation, android.app.Activity activity): hàm khởi tạo nhận 2 tham số instrumentation và activity

**Lời gọi APIs**

Application program interface (API)  là một tập hợp các công việc thường làm, các giao thức và công cụ để xây dựng ứng dụng phần mềm. Về cơ bản, API đưa ra cách thức để tương tác giữa các thành phần trong phần mềm với nhau. Ngoài ra, API được sử dụng khi lập trình các thành phần giao diện người dùng đồ họa (GUI).

Có nhiều API bên trong Robotium framework và chúng bao phủ hầu hết các tính năng có sẵn trong Android. Phương thức countIncreases dựa trên phản hồi của người dùng và các đề xuất, phải thực hiện nếu phương thức đó liên quan đến các chức năng cụ thể , các phương thức đó có thể được thêm vào như 1 phần của Robotium framework. Phương thức countIncreases đó sẽ được sử dụng trong các dự án tương tự.

Đội ngũ phát triển Robotium phân tích yêu cầu dựa trên sự ưu tiên. Nếu API support bị ngừng khi chạy trong các phiên bản của dự án thì dự án test Robotium có thể đang gặp vấn đề.

Các phương thức của lớp Solo có thể tìm thấy ở các đường link sau:
http://robotium.googlecode.com/svn/doc/com/jayway/android/robotium/solo/Solo.html

Source code Javadoc về tập hợp các API ở đường link sau:
https://github.com/jayway/robotium/trê/master/robotium-solo

![](https://images.viblo.asia/b1c1df60-b85b-433c-a1c3-f36b90176b03.PNG)

## 3.2 Resource ID trong Robotium

Trong Robotium không cần phải import Application Under Test (AUT) resources vào trong dự án test để sử dụng được Resource ID.

Người thực hiện có thể dùng Resource ID mà không cần import resource. Chỉ cần lấy Resource ID bằng cách truyền tên và loại hiển thị vào phương thức getIdentifier(), truyền ID vào phương thức getView() đối với mỗi loại đối tượng hiển thị tương ứng.

![](https://images.viblo.asia/de7c0901-0154-42bf-9561-e13f1d7bd12c.PNG)

Có thể truyền tham số kiểu chuỗi vào trong phương thức getView() như sau:

![](https://images.viblo.asia/69d137ce-2afb-4dd5-9668-94877fa45f4b.PNG)


**Tìm hiểu về Internationalization (sự quốc tế hóa)**

![](https://images.viblo.asia/018baac8-5c84-40cf-997e-67895bd20d3e.PNG)


Internationalization nghĩa là làm cho ứng dụng tương thích với nhiều loại ngôn ngữ hay môi trường sử dụng khác nhau (ứng dụng đa ngôn ngữ), sử dụng các component thích hợp và biên dịch.

Để có một ứng dụng hỗ trợ đa ngôn ngữ và kiểm thử ứng dụng này không nên sử dụng bất kì một ngôn ngữ nào trong test case, thay vào đó nên sử dụng  các đoạn strings trong file res/values/strings.xml để định nghĩa các ngôn ngữ này.


# 4. Hỗ trợ WEB trong Robotium 

## 4.1 Mục đích

Giới thiệu về cách truy cập cách để sử dụng WebElements trong Android và các phương thức web support trong Robotium

**Cài đặt API **

Web support được đưa vào trong Robotium Framework từ phiên bản Robotium 4.0. Robotium hỗ trợ đầy đủ cho ứng dụng phức tạp . Dưới đây  là bảng so sánh về native application và hybrid application



| Native Application |Hybrid Application |
| -------- | -------- |
| - Phụ thuộc vào nền tảng   | - Đa nền tảng    | 
| - Chạy trên phần mềm và phần cứng bên trong thiết bị   |- Xây dựng bằng HTML5 và JavaScript và được bao bên trong 1 khung chứa nguyên bản cung cấp truy cập tới các tính năng của nền tảng nguyên bản    | 
| - Tốn nhiều công sức hơn để xây dựng ứng dụng trên nền tảng khác và tốn thời gian tìm hiểu   | - Tiết kiệm chi phí phát triển và thời gian    | 
|- Hiệu năng cao   |- Hiệu năng kém hơn    | 



Một số phương thức có sẵn trong Robotium giúp truy cập nội dung web:

* searchText (String text)
* scrollUp () / scrollDown ()
* clickOnText ()
* takeScreenshot ()
* waitForText (String text)

Trong các phương thức được đưa vào để hỗ trợ web, có lớp **By** được đưa vào như một tham số. Đó là một  lớp abstract dùng như cầu nối trong các phương thức của web. Những phương thức trên được dùng để chọn ra các WebElements khác nhau dựa trên các thuộc tính như ID hay name. 

Các thành phần sử dụng trong web view được hiểu như các WebElement, tương tự như WebDriver. Bảng dưới đây liệt kê danh sách các phương thức bên trong lớp **By**:



| Phương thức | Mô tả | 
| -------- | -------- |
| className (String className)     | Lấy một WebElement theo tên class     |
| cssSelector (String selectors)     | Lấy một WebElement theo css selector     |
| getValue ()     | Trả về giá trị     |
| id (String id)     | Lấy một WebElement theo id     |
| name (String name)     | Lấy một WebElement theo name     |
| tagName (String tagName)     | Lấy một WebElement theo tag name     |
| textContent (String textContent)     | Lấy một WebElement theo nội dung text |
| xpath (String xpath)     | Lấy một WebElement theo xpath|

![](https://images.viblo.asia/e22ff33a-6e1e-4ff1-ab1d-e02b3fbbd9bd.PNG)


Một số phương thức quan trọng trong Robotium framework dùng để kết nối giữa web và Android :
* clickOnWebElement (By by): Click vào WebElement phù hợp với đối tượng lớp By truyền vào
* waitForWebElement (By by): Đợi WebElement phù hợp với đối tượng lớp By truyền vào
* getWebElement (By by, int index): Trả về 1 WebElement phù hợp với đối tượng lớp By và index truyền vào
* enterTextInWebElement (By by, String text): Nhập vào text bên trong 1 WebElement phù hợp với đối tượng lớp By truyền vào
* typeTextInWebElement (By by): Nhập text vào trong 1 WebElement phù hợp với đối tượng lớp By truyền vào. Trong phương thức này chương trình nhập vào kí tự chữ cái trên bàn phím
* clearTextInWebElement (By by): Xóa text trong 1 WebElement phù hợp với đối tượng lớp By truyền vào
* getCurrentWebElement (By by): Trả về ArrayList WebElement hiển thị trong web view hiện tại phù hợp với đối tượng lớp By truyền vào.

**WebView trong Android:**

Có thể lấy ra 1 thực thể WebView sử dụng lớp Solo như sau:

`WebView wb = solo.getCurrentViews(WebView.class).get(0);`

Khi đã Webview có thể thêm JavaScript code vào trong WebView như sau:

`wb.loadUrl(“<JavaScript>”);`

## 4.2 Ví dụ về Hybrid test 


Một ví dụ về hybrid application, tạo một dự án kiểm thử đơn giản. Ứng dụng này cung cấp 1 WebView và tải lên trang chủ Google

![](https://images.viblo.asia/3713d710-16c3-4509-bb83-c7baba5dd9c3.PNG)


Source code lớp WebViewActivity.java như sau:

![](https://images.viblo.asia/5cdd5add-79a7-4e7d-9fff-fc6c3c36a5a9.PNG)


Thêm code sau vào file web_main.xml là trang layout của Activity WebViewActivity

![](https://images.viblo.asia/521bc05e-01ce-4c05-8eb8-0901ad839854.PNG)


Thêm quyền cho phép truy cập Internet

![](https://images.viblo.asia/061509a5-e121-4d46-9d21-096b3386293c.PNG)
 

Các bước trên chỉ là các cài đặt ứng dụng WebView. 

Giờ bắt đầu viết test case truy cập WebElement của trang Google

![](https://images.viblo.asia/3a00700f-c912-420f-8bc0-4386b6e15336.PNG)


Đoạn code trên nhập “Robotium” vào ô search box của google và click vào nút tìm kiếm. Kết quả hiện thị ra như sau:

![](https://images.viblo.asia/b5a39f0a-fc21-4853-b005-d2c4c8fbbffc.PNG)


Ảnh chụp màn hình trên được lưu vào trong thư mục /sdcard/Robotium-Screenshots/ bởi API. Nó yêu cầu quyền (android.permission.WRITE_EXTERNAL_STORAGE) trong file AndroidManifest.xml

Kết quả trên được  JUnit ghi lại khi chạy dự án kiểm thử Android JUnit như sau:

![](https://images.viblo.asia/48124023-3a63-4152-aafb-c13eb8c4f1f0.PNG)


Test case testSearchRobotium mất 66.106 giây để hoàn thành kiểm thử
![](https://images.viblo.asia/4d957406-73ff-444d-8913-296803aba600.PNG)



# 5. So sánh với các Frameworks khác

Chương này so sánh Robotium với các Frameworks kiểm thử khác dựa trên các thông số nhất định. Điều này sẽ cung cấp thông tin giúp lựa chọn Frameworks thích hợp theo nhu cầu của từng dự án. Trong phần này, tôi và các bạn sẽ  cùng nhau so sánh Robotium với MonkeyRunner, Robolectric, UI Automator và Calabash
 
## 5.1 MonkeyRunner

MonkeyRunner là một công cụ được sử dụng để viết chương trình truy cập giả lập Android / thiết bị từ bên ngoài mã Android.

Chương trình có ảnh chụp màn hình giao diện người dùng Android và gửi nó đến máy trạm để lưu trữ.

MonkeyRunner là một API, không phải là một chương trình. 

Từ khi MonkeyRunner là một mô-đun của Python, nên bạn có thể làm bất cứ điều gì đều được hỗ trợ bởi Python. Tất cả những gì bạn cần làm là tạo một chương trình Python và thêm MonkeyRunner !

Hãy xem sự khác biệt giữa Robotium và MonkeyRunner trong bảng sau:



| Tính năng  | Robotium |MonkeyRunner |
| -------- | -------- | -------- |
| Đối tượng     | Lựa chọn đối tượng dựa trên các thuộc tính như chỉ mục, văn bản / tên, hình ảnh và ID     | Lựa chọn đối tượng dựa trên vị trí của nó (tọa độ x, y ), có thể thay đổi khi ứng dụng phát triển.  |
| Hoạt động   | Nó chỉ có thể thực hiện các hành động trên ứng dụng thử nghiệm     | Nó có thể thực hiện vào trong toàn bộ thiết bị, nghĩa là tất cả các ứng dụng hiện tại.     |
| Xác minh     | Dựa trên JUnit     | Xác minh dựa trên ảnh chụp màn hình     |
| Ngôn ngữ     | java     | Kịch bản python     |

Có một số điểm chung :

*  Chúng có thể chạy trên một máy ảo / thiết bị bằng cách gửi các lệnh và các sự kiện cụ thể từ một API.
* Trong miền kiểm thử Android, các framword  khác nhau có mặt cho các nhu cầu khác nhau. Vì Robotium chủ yếu được sử dụng để kiểm tra giao diện người dùng, nó không hỗ trợ một số tính năng sau của MonkeyRunner:
1.  Tự động hóa mở rộng
1. Kiểm thử nhiều ứng dụng và điều khiển thiết bị

## 5.2 Robolectric

Robolectric là một máy ảo kiểm thử,  một phần của Frameworks hỗ trợ Android, cho phép chạy các trường hợp kiểm thử trực tiếp trên Máy ảo Java (JVM) với sự trợ giúp của Frameworks JUnit 4. Điều quan trọng nhất về Robolectric là : 
* không cần máy ảo / thiết bị hỗ trợ.
* Robolectric chứa các đối tượng Android hoạt động như các đối tượng có trong SDK Android.

Hãy xem sự khác biệt giữa Robotium và Robolectric trong bảng sau:



| Tính năng | Robotium | Robolectric |
| -------- | -------- | -------- |
| Máy ảo / thiết bị    | Robotium cần máy ảo hoặc thiết bị hỗ trợ để thực hiện các kiểm thử   | Robolectric không cần bất kỳ máy ảo / thiết bị hỗ trợ nào để thực thi kiểm thử. Đây là lý do tại sao nó nhanh hơn nhiều so với Robotium    |
| Máy chủ | Nó cần một mấy ảo hoặc thiết bị hỗ trợ trên máy chủ để chạy các trường hợp kiểm thử; nếu không,  sẽ không thể được thêm vào | Nó có thể được cấu hình dễ dàng trên máy chủ |
| Hướng phát triển | Nó được sử dụng để kiểm tra trên một thiết bị Android thực tế và các API không được mô phỏng bởi Robolectric. | Nó giúp tăng tốc chu trình phát triển kiểm thử hơn Robotium |
| Thiết bị đánh giá | Nó sử dụng kiểm thử  JUnit 3 | Nó sử dụng kiểm thử JUnit 4 |

## 5.3 UI Automator

UI Automator là một thư viện Java được sử dụng để khởi tạo các trường hợp kiểm thử giao diện người dùng,  tùy chỉnh cho một  ứng dụng  android và nó cung cấp một công cụ thực thi tự động để chạy các trường hợp kiểm thử.

Hãy xem sự khác biệt giữa Robotium và UI Automator trong bảng sau:



| Tính năng | Robotium | UI Automator |
| -------- | -------- | -------- |
| Ứng dụng chéo    | không thể vượt qua     | Có thể vượt qua. Ví dụ: nếu ứng dụng thư viện và  có thể chọn bất kỳ album nào, điều này có thể đạt được bằng cách sử dụng Công cụ tự động hóa giao diện người dùng. Thư viện là một gói ứng dụng khác và chọn vào album bên trong thư viện là một hoạt động chéo ứng dụng.  |
| Bộ API     | Robotium có một bộ API khổng lồ, chứa các phương pháp để kích hoạt việc nhận khuân mẫu, v.v. Do đó, Robotium cung cấp nhiều quyền kiểm soát hơn so với UI Automator     | UI Automator chứa các phương thức để kích hoạt việc nhận khuân mẫu, nhưng phương thức đó lại thực hiện tính năng khác so với Robotium   |
| Hỗ trợ cấp độ API     | Cấp độ 4 trở lên | Hỗ trợ các thiết bị có API cấp độ 16 (hoặc cao hơn) và không quay trở lại để hỗ trợ các mức API cũ hơn; do đó, không có khả năng tương thích ngược     |
 | Tích hợp với IDE     | Tích hợp thông suốt với IDE Eclipse    | Tích hợp giao diện người dùng UI với IDE là cồng kềnh khi bạn cần thêm thư viện JUnit bằng Android.jar và uiautomator.jar theo cách thủ công và xây dựng nó bằng cách sử dụng Ant
     |
 | Hỗ trợ web     | Hỗ trợ đầy đủ cho Web trong ứng dụng    | Thiếu tính năng này     |
 
## 5.4 Calabash

Calabash là nền tảng chéo cho phép bạn viết các test case chức năng một cách tự động cho các ứng dụng di động, hỗ trợ các ứng dụng trên nền tảng Android và iOS.

Hãy xem sự khác biệt giữa Robotium và Calabash trong bảng sau:



| Tính năng | Robotium | Calabash |
| -------- | -------- | -------- |
| Ngôn ngữ     | Java     | Ngôn ngữ linh hoạt hơn Ruby, Java |
| Điều khiển     | Từ thiết bị     | Điều khiển từ máy tính thay vì thiết bị     |
| Phiên     | Có thể đặt hướng thiết bị thành Landscape hoặc Portrait     | Không bắt chước thay phiên điện thoại thành Landscape hoặc Portrait  được   |


 
 
**Tóm lược**

Trong phần này, đã có sự so sánh Robotium với các khuôn mẫu kiểm thử khác dựa trên về các yếu tố khác nhau và đi đến kết luận rằng tất cả các khuôn mẫu được sử dụng theo nhu cầu khác nhau. Không có khuôn mẫu nào là hoàn hảo, luôn có một số ưu và khuyết điểm liên quan đến nó.

Trong phần tiếp theo, sẽ xem xét tính năng điều khiển từ xa và cách sử dụng nó trong Robotium.


Còn nữa , .......

# Tài liệu Tham khảo 
https://doc.lagout.org/programmation/Android/Robotium%20Automated%20Testing%20for%20Android%20%5BZadgaonkar%202013-11-22%5D.pdf?fbclid=IwAR0JSTaqgDW4ShQEDgY9KKCSEulJ3cLYr4OkF50dPZ6M8OALYnVsJckYz_k