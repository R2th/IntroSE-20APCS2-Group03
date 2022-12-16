## Giới thiệu về Interface testing:

**Interface Testing là gì? **

Khi phát triển ứng dụng, phần mềm hay một trang web , chúng ta cần phải có các thành phần cấu tạo nên nó. Ví dụ: server, database...v.v
Việc kết nối giữa các thành phần này được gọi là interface.

Nói một cách đơn giản, một interface là một phần mềm bao gồm các lệnh, message...v.v

Bài viết này sẽ giúp bạn có một cái nhìn tổng quan, hoàn chỉnh về Interface testing: Các yêu cầu mà interface test cần làm, phân loại, chiến lược, checklist và một số tool của nó theo một cách đơn giản. Hy vọng bài viết này sẽ làm phong phú thêm kiến thức của bạn.

![](https://images.viblo.asia/e7c1d6b1-e55f-4182-a3c7-12f78f78ed19.jpg)

**Giới thiệu **

Với một máy tính,  interface có thể là các API, web service, ... Sự giao tiếp giữa các thành phần khác nhau của một phần mềm, một ứng dụng hoặc một website....v.v có thể ảnh hưởng đến hiệu suất tổng thể. Do đó interface cũng cần được test và confirm.

Việc kiểm thử được thực hiện để kiểm chứng các chức năng giao tiếp được gọi là interface testing.

![](https://images.viblo.asia/27637dcd-3c91-473a-8946-f559482fbf93.jpg)

**2 thành phần phổ biến của Interface testing bao gồm:**

- Giao tiếp giữa web server và application server
- Giao tiếp giữa database server và application server

## Khi nào, và tại sao nên kiểm thử Interface?

![](https://images.viblo.asia/92917a4f-596b-4905-bcb7-90bf53d82029.jpg)

Dưới đây là 3 phase của Interface testing trong một vòng đời giao tiếp:

**1) Cấu hình và phát triển:**

Khi  interface được cấu hình , một khi đã bắt tay vào phát triển (lập trình viên bắt đầu thực hiện dev) :  sẽ phải thực hiện xác minh (verify)  các cấu hình theo như requirement.

**2) Validation:**

Khi kết thúc việc phát triển, interface cần được xác thực (validate) và xác minh (vefify). Interface testing được thực hiện như một phần của unit testing.

**3) Bảo trì:**

Khi toàn bộ phần mềm đã sẵn sàng, được deploy và hoạt động,  cần phải theo dõi xem Interface (giao tiếp)  có xảy ra vấn đề nào hay không? Hay hiệu suất có bị giảm khi có sự thay đổi hay không.

Còn khi bắt đầu phát triển một interface, cần đảm bảo rằng chúng ta đang không gây ra bất kỳ một defect nào trong code. Và vì thế cần phải kiểm thử interface để xác minh: việc thêm code mới không gây thêm bất kỳ một lỗi mới nào. Điều đó sẽ giúp bạn xác minh được interface có bị lỗi hay không,  theo như yêu cầu.

Khi chúng ta đã hài lòng, OK với interface, chúng ta cần check xem nó đã đúng với luồng dự kiến, dữ liệu hay chưa, ... Chúng ta có thể chạy performance test với dữ liệu lớn và kiểm tra xem interface đáp ứng tốt chưa. Việc này sẽ tiết kiệm nhiều thời gian để fix defect sau này.

**Tóm lại, Interface testing được thực hiện để:**

- Kiểm tra xem việc thực hiện  server đã đúng chưa.
- Xử lý lỗi được thực hiện đúng cách, các thông báo lỗi thích hợp được hiển thị cho các truy vấn được thực hiện bởi ứng dụng hoặc phần mềm.
- Để kiểm tra kết quả khi kết nối tới máy chủ được reset.
- Để kiểm tra độ bảo mật khi các thành phần giao tiếp với nhau.
- Để kiểm tra mức độ ảnh hưởng của lỗi mất kết nối giữa các thành phần.

## Các loại Interface Testing:

Interface testing về cơ bản được thực hiện trên messaging layer của kiến trúc hệ thống. 
Nó chủ yếu liên quan đến việc kiểm tra REST API hoặc SOAP web service với JSON hoặc XML.

Các loại Interface testing liên quan đến các hoạt động dưới đây:

- **Unit Testing**: test chức năng của mỗi hoạt động riêng rẽ (trong một function)
- **Functional Testing**: test chức năng của các kịch bản rộng hơn liên quan đến tạo test case, validation, hồi quy, ...
- **Load Testing**: xác định hiệu suất dưới tải, chủ yếu sử dụng các test case chức năng.
- **Security Testing**: test cơ chế bảo mật và nó bao gồm test thâm nhập cũng như kiểm soát truy cập xác nhận, mã hóa, ...
- **Phát hiện lỗi chạy thời gian**: Theo dõi một ứng dụng về các vấn đề như: cuộc đua thời gian chạy, rò rỉ nguồn lực, ...
- **Workflow testing**: nó được thực hiện để đảm bảo nếu interface xử lý luồng workflow của bạn như mong đợi.
- **Individual Systems**: việc test này được thực hiện để xác thực tính riêng tư của từng hệ thống. Ví dụ: nên thực hiện riêng rẽ hệ thống tính tiền billing và hệ thống quản lý hàng tồn.

## Chiến lược hoặc Cách tiếp cận của Interface testing

Giống các loại testing khác, Interface testing cũng quan trọng không kém vì nó đảm bảo các chức năng liền mạch, hiệu suất, ... của các ứng dụng và hệ thống dữ liệu khác nhau, bằng cách xác minh sự kết nối giữa database, mạng và hệ thống.

Đặc biệt, Interface testing rất quan trọng khi chúng ta muốn xác minh "sự phụ thuộc của ứng dụng mình đang phát triển"  với các ứng dụng khác.

**Dưới đây là một vài step đảm bảo Interface testing thành công:**

**1) Xác định yêu cầu:**

Trước khi tạo test Interface, cần phải hiểu ứng dụng. Vì vậy, các bạn hãy cố gắng tìm các câu trả lời cho các câu hỏi, như:
- Mục đích của Interface là gì?
-  Workflow của hệ thống hoặc ứng dụng là gì?
-   Các chức năng và tính năng của Interface là gì?

Các câu trả lời sẽ giúp bạn hiểu được yêu cầu, tìm ra những điểm phức tạp của ứng dụng= > Từ đó, bạn tạo được các test case phù hợp. 
Thông thường, QA bị miss điều này. Do đó thường dẫn tới nhầm lẫn về yêu cầu hoặc test không đúng.

**2) Kết quả mong đợi:**

Khi đã hiểu yêu cầu rồi, chúng ta cần phải xác định kết quả mong đợi của việc test. Kết quả mong đợi không chỉ là Pass hay Fail, mà còn phải check xem dữ liệu, việc gọi đến API khác đã chính xác chưa...v.v 

Việc tính toán, xác định kết quả mong đợi không chỉ phức tạp mà còn khá rủi ro nữa. Vì vậy các bạn hãy cố gắng tìm những gì có thể xảy ra bằng cách thảo luận với developer nhé.

**3) Những khởi đầu nhỏ:**

Với Interface testing, chúng ta không thể trực tiếp tạo ra những test case lớn. Hãy tạo những test case nhỏ hoặc các cuộc gọi tương đối đơn giản. Ít nhất, trong một chức năng nhỏ, bạn hãy tạo test code các phần nhỏ, rồi xác minh xem outpu đã đúng với mong đợi hay chưa.

**4) Cố gắng để tự động hóa test interface:**

Việc viết code để test một interface có thể gây nhàm chán.
Bạn không chỉ tốn thời gian viết code mà còn mất thời gian để hiểu format, style, ngôn ngữ lập trình sử dụng cho việc phát triển. 
Sau đó bạn còn phải đảm bảo code của bạn không tạo ra vấn đề gì cho ứng dụng hoặc hệ thống.

Vì vậy, tốt nhất là nghiên cứu và tìm một số công cụ tự động để tiết kiệm thời gian của bạn. Nó sẽ dễ dàng và tiết kiệm thời gian.

**5) Xác định điểm bắt đầu và kết thúc:**

Trước khi thực thi test, chúng ta cần phải xác định rõ điểm bắt đầu (entry) và kết thúc (exit) của việc test Interface;  cũng như quyết định xem việc "Toàn bộ quá trình  kiểm thử" sẽ bắt đầu và kết thúc vào lúc nào. Tương tự, chúng ta cũng cần đo lường mức độ hiệu suất của interface testing. 

**Để làm điều đó, chúng ta cần tìm câu trả lời cho 2 câu hỏi dưới đây:**

- Thời gian hoàn thành mong đợi của một inteface test là gì?
- Thời gian hoàn thành thực tế của một interface test là gì?

Bước này sẽ giúp bạn xác định hiệu suất của việc test. Nó cũng giúp bạn có được quyết định về kế hoạch kiểm tra.

## Sự khác nhau giữa Interface testing, Integration và Component Testing



| STT | Component testing | Interface testing | Integration Testing |
| -------- | -------- | -------- | -------- |
| 1     | Test một thành phần riêng lẻ có đúng mong đợi hay không: được gọi là component testing     | Test một interface có đúng mong đợi hay không:  được gọi là interface testing     | Khi tất cả hoặc một vài module, thành phần được tích hợp để hoạt động phối hợp, test để xác minh chức năng được tích hợp chạy đúng được gọi là Integration testing     |
| 2     | Một thành phần có thể là bất kỳ cái gì, ví dụ: 1 màn hình, 1 module login, ...    | Interfaces là các dịch vụ web phổ biến, API, chuỗi kết nối, ...     | Tích hợp có thể là một use case hoàn thiện như một ứng dụng ngân hàng, login,...     |
| 3     | Việc test tương đối dễ dàng     | Việc test khó khăn và tẻ nhạt     | Việc test khá dễ dàng nhưng lâu     |
| 4     | Có thể test thủ công hoặc tự động     | Hầu hết là test tự động     | Có thể test thủ công hoặc tự động     |
| 5     | Việc test bao gồm cả code và GUI của ứng dụng hoặc hệ thống     | Việc test chỉ được thực hiện với code, không có GUI     | Việc test bao gồm cả code và GUI, nhưng hầu hết là GUI     |

## Checklist for Interface Testing

![](https://images.viblo.asia/9dda484c-76e4-4973-a444-ddd581128f19.jpg)

**Dưới đây là một vài điểm checklist cần quan tâm của Interface Testing:**

- Lỗi 4xx và 5xx nên có, được thông báo khi test. Bởi vì các lỗi này sẽ giúp bạn xác minh xử lý lỗi của phía server và client. 
Lý tưởng nhất  là cho hiển thị một message thích hợp,  hơn là việc chỉ cho show ra erro code.  
- Xác thực người dùng bằng cách sử dụng xác thực HTTP.
- Xác minh tất cả các phương thức được sử dụng trong API hoặc web service như GET, PUT, POST, ...
- Xác minh việc chuyển đổi từ định dạng JSON sang XML và ngược lại.
- Xác minh các hoạt động hàng loạt trên một interface có đúng với kết quả mong đợi không.
- Xác minh time zone của API có khớp với đặc tả của time zone của một khu vực địa lý không.
- Xác minh nếu truy cập trái phép vào interface thì có thông báo lỗi thích hợp không. 
- Xác minh lỗi kết nối được xử lý đúng chưa.
- Xác minh nếu một số thành phần bị xóa khỏi ứng dụng thì sau đó interface không tương tác với các thành phần đó nữa.

## Best Tools for Interface Testing

![](https://images.viblo.asia/f7eba715-acaf-46bb-ad57-e0ad09164355.jpg)

Khi các công ty chuyển sang DevOps, tích hợp liên tục và triển khai liên tục, thì việc phản hồi testing cần phải được thực hiệnn nhanh hơn bao giờ hết. Trước khi bạn bàn giao ứng dụng của bạn, phải cần đảm bảo rằng interface đã được test tốt. 

Test thủ công interface có thể rất tẻ nhạt, phức tạp và tốn thời gian. Nên cách tốt nhất để thực hiện test interface là sử dụng tự động.

Do đó, danh sách các tool dưới đây sẽ giúp bạn hoàn thiện việc test interface nhanh nhất có thể: 

**1) REST-Assured**

Với những ai đang làm việc với Java:  REST – Assured là công cụ phù hợp nhất. 
Thực tế, nó là công cụ tốt nhất cho API testing với Java, bởi vì việc xác thực Rest web service trong Java là khá khó khăn. 
Nó được thiết kế cho mục đích test, nên nó có thể dễ dàng tích hợp với vài Java-based framework.

Nó có nhiều chức năng có sẵn, do đó bạn không cần phải viết mã từ đầu. Công cụ này tích hợp tốt với Serenity framework và bạn có thể tạo ra các test report tuyệt vời.

**2) Postman**

Một vài tester không thích sử dụng ngôn ngữ lập trình giống nhau như của IDE. Nên Postman là lưạ chọn tốt nhất cho tự động. Nó cũng là lưạ chọn tốt nhất cho việc test interface theo cách khám phá.

Postman is một REST-client đơn giản và là một Chrome plugin. Nó có sẵn một phiên bản gốc,  có thể sử dụng cho Mac, Linux và Windows. Nó có UI giúp cho việc xây dựng request và response.

**3) SoapUI**

Nếu team của bạn chỉ làm việc với API testing, thì SoapUI là lựa chọn tốt nhất. Nó là công cụ kiểm thử chức năng hoàn chỉnh dành riêng cho API testing. Nó cũng hỗ trợ kiểm thử theo hướng dữ liệu, nơi dữ liệu có thể được truyền vào với dạng CSV hoặc excel. Tool này cũng có một bản mất phí,  được gọi là SoapUI Pro - cung cấp các tính năng tốt hơn,  cải tiến hơn cho việc test web service.

Nếu bạn muốn thêm code mở rộng cho một số workflow hoặc tính năng đặc biệt, hãy sử dụng Groovy cho script. Bạn cũng có thể tạo biến toàn cục và sử dụng nó cho toàn bộ test của mình thay vì sử dụng từng biến cho từng đoạn test.

**4) JMeter**

JMeter được sử dụng rộng rãi cho load test và nó cũng có thể được dùng để test interface. JMeter hỗ trợ record và playback và nó tạo ra báo cáo HTML giúp dễ dàng đọc và hiểu. JMeter tương thích với các file CSV nên nó cho phép tạo các tham số duy nhất để thử nghiệm.

Nó dễ dàng tích hợp với Jenkins để các test của bạn có thể bao gồm trong CI. Nếu bạn mốn sử dụng cùng một công cụ cho test interface và load test thì JMeter là một lưạ chọn xứng đáng.

**5) Fiddler**

Fiddler giúp bạn check và sử dụng HTTP request. Nó có nhiều tính năng giúp bạn debug các issue của website.
Ngoài ra, với những chức năng mở rộng của tool này,  bạn có thể làm được nhiều điều hơn nữa. 
Tool này cũng là một công cụ tốt cho kiểm thử bảo mật vì nó có thể cấu hình để giải các yêu cầu mã hóa và sau đó sửa đổi các yêu cầu cho mục đích thử nghiệm.

Một trong các extension của Fiddler là APITest extension. Tool này giúp xác minh hành vi web của interface. Để kiểm tra interface sâu hơn thì bạn có thể sử dụng thư viện FiddlerCore.Net để tạo cơ sở hạ tầng kiểm tra interface.

## KẾT LUẬN

Interface testing là một phần rất quan trọng cho các ứng dụng có quy mô lớn, và đó và việc bạn cần phải thực hiện kiểm thử. Ngay cả các ứng dụng  thường xuyên được follow bằng CI cũng cần phải được  thực hiện Interface testing.

Interface testing khá phức tạp và không mấy rõ ràng. Vì vậy cần phải có một chiến lược thích hợp để thiết kế và thực hiện việc test. Ngoài ra, các bạn có thể nhờ  team phát triển vì họ hiểu code tốt hơn.

Cách tốt nhất và đơn giản nhất để thực hiện kiểm thử là tự động và tích hợp bộ test trong CI để tiết kiệm thời gian, và đạt được kết quả nhanh hơn.

Link tham khảo:
https://www.softwaretestinghelp.com/what-is-interface-testing/