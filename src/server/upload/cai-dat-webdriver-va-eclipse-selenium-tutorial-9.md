Ở bài viết trước, chúng ta đã cùng nhau giới thiệu về cấu trúc và các tính năng cơ bản của Tool test tự động WebDriver. Bài viết thứ 9 sẽ đề cập đến quy trình cài đặt để bắt đầu với WebDrivers. 

Để có thể sử dụng WebDriver để viết script, chúng ta cần đáp ứng các yêu cầu tiên quyết như môi trường cài đặt. Trong series này, chúng ta sẽ sử dụng Java là ngôn ngữ lập trình trong các ví dụ. Do đó chúng ta sẽ bắt đầu với việc cài đặt Java.

# 1. Cài đặt Java
**JDK - Java Development Kit** - là một bộ công cụ phát triển Java dành cho những người lập trình Java để phát triển ứng dụng. Về cơ bản nó bao gồm:
* JRE (Java Runtime Environment) là một môi trường để chạy ứng dụng Java.
* Javac: Một chương trình để dịch mã mà bạn viết thành mã bytecode - có thể gọi là mã trung gian. Khi ứng dụng Java chạy nó sẽ dịch mã bytecode thành mã máy tính và thực thi.
* Archive (jar): Là một chương trình nén các file thành một file duy nhất có đuôi jar. Thường dùng để đóng gói các file class.
* Javadoc: Là một công cụ tạo ra tài liệu hướng dẫn sử dụng API.
* Và các công cụ khác cần thiết cho phát triển Java.

**Bước 1**: Mở trang chính thức của Oracle - https://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html - thực hiện tải về máy tính: Java Platform, Standard Edition

![](https://images.viblo.asia/6bba679b-d153-4f9c-9872-34adff988050.jpg)

**Bước 2**: Click nút Download, màn hình danh sách các bộ cài hiển thị. Người dùng sẽ lựa chọn các gói cài đặt  phù hợp với thiết bị/ môi trường của mình - bộ cài cho hệ điều hành Ubuntu, Mac, Window... Máy tính hiện tại của tôi sử dụng hệ điều hành Windows nên lựa chọn bản cài tương ứng và hướng dẫn cài đặt chi tiết ở bước tiếp theo.

![](https://images.viblo.asia/0a9e6708-725d-488c-bdd0-aad23e31c2ec.jpg)

Bộ cài JDK đã bao gồm cả JRE (Java Runtime Enviroment), do đó người dùng sẽ không cần phải tải và cài đặt JRE riêng.

**Bước 3**: Mở folder chứa file JDK vừa tải về và tiến hành cài đặt tuần tự theo các hình ảnh phía dưới.

![](https://images.viblo.asia/a44c83ac-25de-43b7-97ed-59c4502619d1.jpg)

Hiển thị màn hình bắt đầu cài đặt JDK.

![](https://images.viblo.asia/6780bcf1-71b0-4e61-a548-60502b52b61f.jpg)

Trường hợp muốn thay đổi folder cài đặt, hãy click vào nút Change và chọn lại thư mục khác. Nếu sử dụng folder mặc định thì chúng ta bỏ qua và click Next.

![](https://images.viblo.asia/92d39fd8-4595-437b-81d0-0423daf9d91a.jpg)

JDK và JRE được cài đặt thành công.

![](https://images.viblo.asia/588c3bef-3b1a-4c92-bcc1-c0023d1fcb62.jpg)

Hiển thị 2 thư mục đã được cài đặt.

![](https://images.viblo.asia/d868f1d9-1bd4-4cde-9210-27fbdf896034.jpg)

Lưu ý: Nếu trên máy tính của bạn có nhiều phiên bản Java thì sẽ cần cấu hình biến môi trường để xác định phiên bản java nào sẽ được dùng mặc định. Chi tiết xem hướng dẫn theo link sau: https://o7planning.org/vi/10377/huong-dan-cai-dat-va-cau-hinh-java.
# 2. Cài đặt Eclipse IDE
**Eclipse**  là một  trình IDE - Integrated Development Enviroment - phần mềm hỗ trợ viết phần mềm dùng để lập trình Java. Thực tế Eclipse cũng hỗ trợ cho nhiều ngôn ngữ khác nha C, C++, PHP... nhưng khá mạnh về Java. Eclipse có lợi thế là miễn phí với nhiều plugin tiện ích, tuy nhiên có 1 số plugin mất phí.
Bạn có thể tìm hiểu thêm các thông tin về Eclipse theo link sau: https://viblo.asia/p/eclipse-that-la-tuyet-voi-d6BAMYz7Gnjz

**Bước 1**: Vào trang chính của Eclipse - https://www.eclipse.org/downloads/packages/release/kepler/sr2/eclipse-ide-java-ee-developers - để download Eclipse IDE for Java EE developers. Hầu hết tất cả các bản phát hành gần đây đều có trên trang. 

Hãy chắc chắn bạn đã chọn đúng phiên bản phù hợp với môi trường/ hệ điều hành của bạn như Window, Mac, Ubuntu và 32bit hay 64bit.

![](https://images.viblo.asia/0e6c2716-648f-4344-9c2c-b346e4ee7ac2.jpg)

**Bước 2**: Ngay sau khi bạn click vào 1 phiên bản phù hợp nhất, sẽ được điều hướng tới trang bảo mật thông tin để tiến hành tải phần mềm. Click nút Download và chờ đợi trong vài phút để hoàn thành việc tải về máy.

![](https://images.viblo.asia/f9ef2d84-59a4-4f47-bb13-bd9a02277c62.jpg)

**Bước 3**: Sau khi download thành công, bạn hãy copy file và đặt vào thư mục mình mong muốn.

![](https://images.viblo.asia/67dc238f-bb70-4c43-876e-4936c957849d.jpg)

**Bước 4:** Bạn thực hiện giải nén file Eclipse để tiến hành cài đặt

![](https://images.viblo.asia/bbfa0b50-5ae7-4ad5-9efc-c8fc2c8cc878.jpg)

**Bước 5**: Sau khi giải nén, click khởi chạy tệp tin eclipse.exe để tiến hành cài đặt

![](https://images.viblo.asia/065de742-9540-4ab8-9b2f-7505f7777829.jpg)

**Bước 6:** Trong quá trình cài đặt, bạn hãy chỉ định vị trí vùng làm việc - là ổ/thư mục mà tất cả các project của bạn sẽ lưu và chứ trong đó. Kích nút Browse để chọn vị trí mong muốn - khác với thư mục mặc định mà ứng dụng gợi ý. Click nút OK để xác nhận vị trí đã thiết lập.

# 3. Cấu hình WebDriver.
Khi sử dụng java làm ngôn ngữ lập trình cho series bài viết này và để tạo kịch bản test trong Java, chúng ta sẽ giới thiệu các drivers cho các máy client. Do đó, chúng ta sẽ bắt đầu với việc tải Thư viện Selenium Java cho Client.

### Tải Selenium Java Client Libraries
**Bước 1**: Mở trang chính thức của Selenium để thực hiện download – http://docs.seleniumhq.org/download/. Tìm đến mục Selenium Client & WebDriver Language Bindings, chọn đúng thư viện trong danh sách được list ra phù hợp với đúng loại ngôn ngữ lập trình mình đang sử dụng. Click vào link download cho Thư viện Java Client và đợi trong vài phút.

![](https://images.viblo.asia/a60f7474-3ddd-41b8-9161-eaef54ca5212.jpg)

**Bước 2**: Sau khi download thành công, bạn hãy copy file và đặt vào thư mục mình mong muốn.

**Bước 3:** Bạn thực hiện giải nén file vừa tải về. Thư mục chứa tất cả các tệp jar cần thiết cho phép người dùng tạo các tập lệnh test trong Java.

![](https://images.viblo.asia/29e96960-de5f-4761-a1ea-410c904fc126.jpg)

### Cấu hình các thư viện cho Eclipse IDE
**Bước 1**: Mở Eclipse IDE. Thực hiện tạo một Project cơ bản bằng Jave theo các bước: File -> New -> Java Project. 

![](https://images.viblo.asia/8c29d53e-090f-492a-902e-910728d1bd5f.jpg)

**Bước 2**: Bạn hãy đặt tên cho Project Java ví dụ như Learning_Selenium hay Demo_Selenium và click nút Finish. Dự án vừa mới tạo sẽ hiển thị ở phía bên trái màn hình của bảng điều khiển Explorer.

![](https://images.viblo.asia/d4e8ab4e-a0a0-4fff-a995-8d1b12a5d023.jpg)

**Bước 3**: Tạo một class Java, ví dụ như "First_WebdriverClass" hoặc"Demo_Class" ngay ở dưới thư mục nguồn bằng cách click chuột phải vào đó và chọn New --> Class.

![](https://images.viblo.asia/6ed09e83-c5f0-4909-81c3-fca939aa18ba.jpg)

**Bước 4**: Bây giờ chúng ta sẽ cấu hình thư viện trong Project. Để thực hiện, kích chọn Project và chuột phải tại đó. Kích chọn "Properties" trong hộp chọn được list ra. Màn hình dưới đây sẽ hiển thị, kích chọn "Java Build Path" từ bảng hộp chọn. Hoặc chọn "Build Path" > "Configure Build Path..."

![](https://images.viblo.asia/b435705f-abca-49cc-a08b-a96986829333.jpg)

**Bước 5**: Tab "Libraries" luôn mặc định mở ra. Nếu không, bạn click vào tab "Libraries". Sau đó, click vào nút "Add External Jars...". Mở ra đúng thư mục mà chũng ta đã lưu trữ Thư viện Java Client đã được giải nén. 

**Bước 6**: Kích chọn tất cả các file JAR trong thư mục “selenium-java-2.41.0” và click vào nút Open trong hộp thoại. 

![](https://images.viblo.asia/698775c4-063f-4023-8dc9-5f0237b35744.jpg)

**Bước 7**: Click vào nút "OK" trong hộp thoại để hoàn tất việc cấu hình phần Thư viện Selenium cho Project.

# 4. Các Drivers có sẵn
Có một số các lớp driver có sẵn trong WebDriver, và mỗi class sẽ phục vụ một trình duyệt web riêng biệt. Bởi trong WebDriver, mỗi trình duyệt sẽ có một cách thực thi khác nhau.

Một vài trình duyệt có thể tự động hóa một cách trực tiếp, cũng như thực thi các kịch bản kiểm thử, tuy nhiên một vài trình duyệt khác cần có yếu tố bên ngoài tác động mới có thể làm như vậy. Và các thực thể ngoại vị đó được biết đến với tên gọi Driver Server. Do đó, người dùng sẽ được yêu cầu tải thêm Driver Server cho các trình duyệt khác nhau.

Lưu ý rằng có từng Server Driver riêng biệt cho từng trình duyệt web và người dùng không thể sử dụng duy nhất 1 Server Driver cho các trình duyệt khác với cái đã được chỉ định. 

Dưới đây là danh sách các trình duyệt web hiện có và các Driver Server tương ứng. 

| Web-Browser | Driver Server |
| -------- | -------- |
| Mozilla Firefox | No (No external server is required to spin the Firefox browser) |
| Google Chrome | Yes (ChromeDriver) |
| Internet Explorer | Yes (Internet Explorer Driver Server) |
| Opera | Yes (OperaDriver) |
| Safari | Yes (SafariDriver) |
| HTML Unit| No (No external server is required to spin the HTML Unit) |


# 5. Tổng kết
Trong bài hướng dẫn này, chúng ta đã cùng nhau làm quen với cài đặt các môi trường và các cài đặt khác để chuẩn bị cho việc tạo ra kịch bản kiểm thử WebDriver.

Dưới đây là các điểm quan trọng trong bài:
* Trước khi tạo ra các kịch bản kiểm thử WebDriver, chúng ta sẽ cần cài đặt một số các gói và tiện ích.
* Tiến hành cài đặt JDK (Java Development Kit) - trong bộ kit này sẽ có kèm JRE nên user không cần cài đặt riêng. 
* Tải Eclipse IDE.
* Tải thư viện Java Client để có thể tạo kịch bản kiểm thử với ngôn ngữ lập trình Java.
* Chạy Eclipse bằng cách sử dụng file eclipse.exe và chọn vùng để lưu thông tin project.
* Tạo một Project Java trong Eclipse. Tạo một Class java mới trong Project.
* Cấu hình eclipse bằng cách import các file JAR cho Driver Java Client.
* Trong WebDriver, một số các trình duyệt cần có thể tự động hóa một cách trực tiếp nhưng một số khác cần có Server Driver bên ngoài hỗ trợ để thực hiện điều đó.
* Firefox và HTML Unit là các trình duyệt duy nhất có thể tự động hóa một cách trực tiếp. Do đó chúng không  cần phải có các Driver riêng. Một số các trình duyệt khác: Chrome, IE, Safari... cần có Driver tương ứng.d

Nguồn bài viết: https://www.softwaretestinghelp.com/webdriver-eclipse-installation-selenium-tutorial-9/