## Có một vài vấn đề đặt ra đối với Tester
Ví dụ như: 
### * Liệu QA có nắm được số lượng ứng dụng chạy trên thiết bị di động hay không? 
### * Điều gì xảy ra nếu bạn biết rằng một trong số các ứng dụng di động đã bị tấn công và có khả năng các dữ liệu cá nhân đã bị lộ? 
Những vấn đề xảy ra như trên đều gây hoang mang và lo lắng cho người dùng và người phát triển vì mọi ứng dụng đều được xây dựng dựa trên sự tin cậy trong một khoảng thời gian dài phát triển và sử dụng giữa đội ngũ phát triển và khách hàng, đặc biệt là đối với các ứng dụng tài chính.
Vậy câu trả lời tốt nhất giúp chúng ta giải quyết những vấn đề trên là sử dụng các tool test tự động.
Theo Gartner: “ Nhu cầu về tự động hóa trong kiểm thử dành cho thiết bị di động được thúc đẩy bởi các nhu cầu kinh doanh theo thời gian của thị trường và các sáng kiến kỹ thuật số hóa. Các nhóm phát triển những ứng dụng test tự động này sử dụng các phương pháp phát triển nhanh để cung cấp các ứng dụng với chất lượng cao và tốc độ nhanh, kết hợp với hệ thống thiết bị hiện đại tạo ra môi trường đầy thách thức để duy trì chất lượng kiểm thử cao nhất. Không có tự động hóa, ngành công nghiệp phát triển phần mềm sẽ kết thúc cùng những nộ lực phát triển những ứng dụng đơn giản nhât”

Khi các ứng dụng càng ngày càng trở nên phức tạp thì việc kiểm thử ứng dụng bằng các test tool cho phép các nhà sản xuất kiểm trả chức năng, khả năng sử dụng, tính nhất quán và bảo mật.
Các ứng dụng di động được dự kiến sẽ chạy trên các thiết bị khác nhau với các tài nguyên khác nhau, các điều kiện mạng khác nhau và nhiều hệ điều hành. Điều này đòi hỏi kiểm thử phần mềm cần nghiêm ngặt hơn và đẩm bảo chất lượng, được thực hiện hiệu quả với các công cụ kiểm thử và tự động hóa phần mềm tốt.
Trong bài viết ngày hôm nay, tôi muốn cùng các bạn tìm hiểu về một test tool được đánh giá tốt và hiệu quả - Appium
![](https://images.viblo.asia/0e949c54-3315-49e7-bb00-ce37d66892c8.png)

# I - Khái quát

Appium đã nổi lên là một trong những test tool phổ biến nhất để thử nghiệm các ứng dụng di động và đã được xác nhận hiệu quả bởi những Tester và Developer về tính dễ sử dụng.
Nó là một tool mã nguồn mở cho phép tự động hóa web gốc, web di động và ứng dụng lai trên nền tảng iOS và Android. Ứng dụng gốc là những ứng dụng được viết bằng iOS, Android hoặc Windows SDK. Ứng dụng web di động là các ứng dụng web được truy cập bằng trình duyệt dành cho thiết bị di động. Ứng dụng lai có trình bao bọc xung quanh “ chế độ xem web” một điều khiển gốc cho phép tương tác với nội dung web. Các dự án như Apache Cordova hoặc Phoneapp giúp dễ dàng xây dựng các ứng dụng bằng cách sử dụng công nghệ web sau đó được gói thành một trình bao bọc gốc, tạo ra một ứng dụng lai.

 Một trong những điểm nổi bật của Appium là nó hỗ trợ Safari trên iOS và Chrome trên Android hoặc bất kỳ trình duyệt nào tích hợp trên Android. Điều này giúp cho Appium trở thành một công cụ tự động hóa đa nền tảng và cho phép người dùng viết các thử ngiệm trên nhiều nền tảng, cụ thể là iOS, Android và Windows với cùng một API. 

Công cụ này được built trên nền tảng testing native apps, không cần phải xử lý SDK hoặc sắp xếp lại ứng dụng. Quan trọng nhất, nó cho phép người dùng sử dụng đồng thời với các framework và tool khác cùng lúc. Hơn nữa, phụ trợ của Appium là Selenium, cung cấp mọi chức năng của Selenium cho các yêu cầu kiểm thử của bạn.

# II - Triết lý Appium
Appium được thiết kế để đáp ứng nhu cầu tự động hóa di động theo triết lý được nêu ra bởi bốn nguyên lý sau
1. Bạn không cần phải biên dịch lại ứng dụng của minfhhoawcj sửa đổi nó theo bất kỳ cách nào để tự động hóa nó
2. Bạn không nên bị khóa vào một ngôn ngữ hoặc khuôn khổ cụ thể để viết và chạy kiểm thử của bạn
3. Một Framework test tool mobile không nên tái tạo lại bánh xe khi nói đến các API tự động hóa
4. Một framework test tool phải là nguồn mở, về tinh thần và thực hành cũng như ở cả cái tên

# III - Appium Clients

Một số thư viện Client ( ví dụ trong Java, Ruby, Python, PHP, JavaScript và C#) hỗ trợ các phần mở rộng của APpium cho giao thức WebDriver. 

# IV - Appium Desktop

Có một cái trình GUI bao quanh máy chủ Appium có thể được tải xuống cho mọi platform và nó đi kèm với mọi thứ cần thiết để chạy máy chủ Appium. Nó cũng đi kèm với một Inspector, cho phép bạn kiểm tra các thứ bậc của ứng dụng. Điều này khá hữu ích khi bạn viết test script. 

# V - Appium hoạt động như thế nào?
Appium là một “ máy chủ HTTP” được viết bằng cách sử dụng nền tảng Node.js và thúc đẩy iOS và phiên Android sử dụng giao thức dây JSON của Webdriver. Do đó, trước khi khởi tạo máy chủ Appium, Node.js phải được cài đặt sẵn trên hệ thống.
Appium có thể được built và cài đặt từ nguồn hoặc cài đặt trực tiếp từ NPM:
![](https://images.viblo.asia/037819ac-e217-4648-b224-7dae674b7a66.png)

Khi Appium được tài xuống và cài đặt, thì một máy chủ được thiết lập trên máy của bạn và lộ ra một API REST.
Nó nhận được yêu cầu kết nối và lệnh từ máy khách, thực thi lệnh đó trên thiết bị di động ( Android/ iOS)
Nó phản hồi lại với các phản hồi HTTP và để thực hiện các yêu cầu, nó lại sử dụng các test automation framework để xử lý giao diện người dùng của ứng dụng.
### Một số framework tích hợp như:
* Apple Instrusment for iOS ( công cụ chỉ có sẵn trong Xcode 3.0 trở lên với OS X v10.5 trở lên)
* Google UIAutomator cho Android API level 16 trở lên
* Selendroid cho Android API level 15 trở xuống

# VI - Điều kiện tiên quyết để sử dụng Appium
1. Cài đặt SDK Android  - link: https://developer.android.com/studio/
2. Cài đặt JDK ( Java Development Kit) - link: https://www.guru99.com/install-java.html
3. Cài đặt Eclipse - link: http://www.eclipse.org/downloads/
4. Cài đặt testNG cho Eclipse - link: https://www.guru99.com/all-about-testng-and-selenium.html#1
5. Cài đặt Selenium Server JAR - link: https://www.guru99.com/introduction-to-selenium-grid.html#1
6. Thư viện Appium Client - link: http://appium.io/docs/en/about-appium/appium-clients/index.html
7. APK App Info trên Google Play - link: https://play.google.com/store/apps/details?id=de.migali.soft.apkinfo&hl=en
8. Js( không bắt buộc) Bất cứ khi nào máy chủ Appium được cài đặt, mặc định nó đi kèm với “Node.exe” và NPM. Nó đã được đi kèm trong phiên bản hiện tại của Appium
9. Cài đặt Appium Desktop 

##  Cài đặt Appium Desktop:
### Step1
Tới website http://appium.io/ và click on Download Appium
![](https://images.viblo.asia/2977bf65-c056-40e1-b629-46da89d6051c.png)

### Step 2
Với Windows, chọn file exe và download. File này nặng tầm 162MB sẽ mất kha khá thời gian để download
![](https://images.viblo.asia/ea9ec4f6-ab7c-471e-bc6b-26586337806f.png)

Với các máy windows, ko cần phải cài đặt Appium, nó sẽ chạy luôn từ file exe. 
Với máy Mac, bạn cần cài đặt dmg

### Step 3
Server Appium khởi động ở window. Nó sẽ hiển thị host và port mặc định và bạn có thể tự thay đổi thông số này
![](https://images.viblo.asia/11e0e059-d651-46a2-a4a2-9eddd7dd86a7.png)

### Step 4
Khi clicking vào button Start Server, một máy chủ mới sẽ khởi động ở địa chỉ host và post đã cài đặt. Server đầu ra được hiển thị
![](https://images.viblo.asia/29f55f58-6a39-4214-924e-a8a7797182b3.png)

Trên đây là một chút tìm hiểu và giới thiệu về Test tool Appium. Để biết cách sử dụng và ứng dụng của test tool này vào trong công việc và process testing, tôi sẽ dành thời gian cho những bài Viblo sau này.


Link tham khảo:
https://dzone.com/articles/5-awesome-mobile-application-testing-tools-amp-pla
 http://appium.io/docs/en/about-appium/intro/
https://www.guru99.com/introduction-to-appium.html