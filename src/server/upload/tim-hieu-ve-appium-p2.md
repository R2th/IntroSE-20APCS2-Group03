Ở bài trước, mình đã tìm hiểu chung về Appium và giới thiệu một tutorial đơn giản ứng dụng Appium và ngôn ngữ Javascript trong Kiểm thử tự động. Với bài viết này, mình sẽ đi sâu hơn về cách Appium hoạt động cũng như đưa thêm ví dụ và bài toán mà mình đã áp dụng trong quá trình học về Kiểm thử tự động (vẫn là với Appium và Javascript)

# Appium
## Thiết kế của Appium
Ở bài viết trước, mình đã tìm hiểu về Triết lý Appium thong qua 04 nguyên lý:
> 1. Bạn không cần phải biên dịch lại hay sửa đổi ứng dụng của mình theo bất kỳ cách nào để tự động hóa nó.
> 1. Bạn không bị bó buộc vào một ngôn ngữ hay một khung làm việc (framwork) cụ thể để viết và thực thi các kiểm tra của mình.
> 1. Một khung làm việc tự động hóa trên thiết bị di động không nên tái tạo lại một cách không cần thiết khi nói đến các API tự động hóa.
> 1. Một khung làm việc tự động hóa trên thiết bị di động nên là mã nguồn mở, trong tinh thần và thực tiễn cũng như trong chính tên gọi của nó.

Vậy cấu trúc của Appium đã thực hiện triết lý nào như thế nào?

*  Appium đáp ứng yêu cầu thứ nhất bằng cách sử dụng các framworks tự động được cung cấp bởi nhà cung cấp :)
Bởi vậy, chúng ta không cần phải biên dịch bất kì đoạn mã hay framworks nào của riêng Appium hoặc của bên thứ ba cho ứng dụng của mình.
<br> Các framworks được cung cấp như:
    * iOS 9.3 trở lên: [XCUITest](https://developer.apple.com/documentation/xctest) của Apple
    * iOS 9.3 trở xuống: [UIAutomation](https://web.archive.org/web/20160425114149/https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/) của Apple
    * Android 4.3 trở lên: [UiAutomator/UiAutomator2](https://developer.android.com/training/testing/ui-automator) của Google
    * Windows: [WinAppDriver](https://github.com/microsoft/winappdriver) của Microsoft
*  Appium đáp ứng yêu cầu thứ hai bằng cách gói các framworks được cung cấp trong một API, được gọi là WebDriver API.
<br> WebDriver (hay còn được gọi là Selenium WebDriver) chỉ định một giao thức máy khách-máy chủ (client-server) (được biết đến là JSON Wire Protocol). Với kiến trúc máy khách-máy chủ này, một máy khách (client) được viết bằng bất kỳ ngôn ngữ nào cũng có thể được sử dụng để gửi đi một yêu cầu HTTP thích hợp đến máy chủ (server). Điều đó cũng có nghĩa là bạn có thể tự do sử dụng bất kỳ trình chạy thử nghiệm hoặc framwork thử nghiệm nào bạn muốn; các thư viện máy khách chỉ đơn giản là các máy khách HTTP và có thể được thêm vào đoạn mã của bạn theo cách bạn muốn. Nói một cách khác, Appium và WebDriver không phải là framwork thử nghiệm về mặt kỹ thuật, chúng là các "thư viện tự động hóa" (automation libraries). Bạn có thể quản lý môi trường kiểm thử của mình theo bất kỳ cách nào bạn muốn.
*  Appium đáp ứng yêu cầu thứ ba theo cách tương tự: WebDriver trở thành một tiêu chuẩn thực tế (de facto standard) cho việc tự động hóa các trình duyệt web và là một bản thảo làm việc W3C ([W3C Working Draft](https://w3c.github.io/webdriver/webdriver-spec.html)). Appium đã mở rộng giao thức với những phương thức API mở rộng hữu ích dành cho tự động hóa di động.
*  Appium đáp ứng yêu cầu thứ bốn: Appium là mã nguồn mở.
# Kiểm thử tự động bằng Appium sử dụng Javascript
Trong quá trình học và bước đầu thực hiện kiểm thử tự động, mình đã chọn một vài ứng dụng để thực hành như Calculator, GG Maps,...
<br> Đối với kiểm thử tự động ứng dụng di động, bước đầu tiên chúng ta cần phải nắm chắc cách xác định các đối tượng UI trên màn hình, sau đó là các thao tác có thể thực hiện đối với chúng. Bạn có thể tìm hiểu điều này thông qua mục "Commands" trên [Appium Docs](https://appium.io/docs/en/commands).

Nói về xác định đối tượng UI trên ứng dụng đi động, chúng ta sẽ dùng các hàm như findElements/findElement để thực hiện tìm kiếm theo các thuộc tính. Có một số phương thức xác định sau:
* ID: Trong ứng dụng Android, chúng ta có resource-id và Appium sử dụng giá trị này trong quá trình xác định đối tượng UI – ID.
* XPath: Cấu trúc của các đối tượng UI trong ứng dụng được sắp xếp với định dạng XML, vậy nên chúng ta có thể sử dụng XPath cùng với các cú pháp và hàm xử lý của XPath để xác định đối tượng UI một cách chính xác và đơn nhất (unique).
* Classname: Khác với Selenium, class là một thuộc tính của thẻ HTML, với Appium, giá trị Class chính là tên của thẻ XML.
* Name/Text: Tương ứng với giá trị ký tự được hiển thị trên giao diện của ứng dụng.

Ở bài viết tiếp theo, mình dự định sẽ thực hiện một số testcase tìm kiếm hoàn chỉnh đối với ứng dụng GG Maps, hi vọng có thể hoàn thành mục tiêu này.
Cảm ơn mọi người đã dành thời gian đọc hết bài viết :)
# Tài liệu tham khảo
* https://appium.io/docs/en
* [Xác định đối tượng UI trong Android](https://vntesters.com/xac-dinh-doi-tuong-ui-trong-android/)