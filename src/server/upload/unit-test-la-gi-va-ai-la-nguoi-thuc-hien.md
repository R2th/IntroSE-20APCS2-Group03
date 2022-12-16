# 1. Unit test là gì?
![](https://images.viblo.asia/2381acae-6042-4d23-a345-09330c6989a5.png)
 
 Unit Test – Kiểm tra mức đơn vị.
 
Để có thể hiểu rõ về Unit Test, khái niệm trước tiên ta cần làm rõ: thế nào là một đơn vị PM (Unit)? 

Một Unit là một thành phần PM nhỏ nhất mà ta có thể kiểm tra được. Theo định nghĩa này, các hàm (Function), thủ tục (Procedure), lớp (Class), hoặc các phương thức (Method) đều có thể được xem là Unit.
# 2. Unit test có phải được dùng để tìm bugs?
Vì Unit được chọn để kiểm tra thường có kích thước nhỏ và chức năng hoạt động đơn giản, chúng ta không khó khăn gì trong việc tổ chức, kiểm tra, ghi nhận và phân tích kết quả kiểm tra. Theo định nghĩa, thì các unit test kiểm tra mỗi đơn vị (unit) code của bạn một cách riêng biệt. Nhưng khi ứng dụng của bạn chạy trong thực tế, tất cả những đơn vị phải làm việc cùng nhau, toàn bộ sẽ trở nên phức tạp và tinh tế hơn so với tổng số các phần của nó đã được kiểm thử độc lập. Việc chứng minh rằng các thành phần X và Y có thể làm việc độc lập không chứng tỏ rằng chúng tương thích với nhau hoặc được cấu hình một cách chính xác. Ngoài ra, các khuyết điểm trong một thành phần riêng biệt có thể chẳng liên quan đến các triệu chứng mà người dùng sẽ trải nghiệm và báo lại. Khi bạn thiết kế các điều kiện tiên quyết cho các unit test của mình, chúng sẽ không bao giờ phát hiện các vấn đề gây ra bởi những điều kiện tiên quyết mà bạn không lường trước được (ví dụ, như một số can thiệp không mong muốn của IHttpModule trong các request gửi đến).
Vì vậy, nếu bạn đang cố gắng tìm kiếm bug, thì có một cách hiệu quả hơn nhiều đó là hãy chạy toàn bộ ứng dụng với nhau như nó sẽ chạy trong môi trường thực tế, giống như bạn làm công việc kiểm tra thủ công một cách tự nhiên vậy. Nếu bạn tự động hóa kiểu test này để phát hiện những sai sót khi chúng xảy ra trong tương lai, đây được gọi là integration testing và thường sử dụng các kỹ thuật và công nghệ khác hơn là unit test.
 Unit test không phải dùng để tìm bugs, thì dùng để làm gì? Theo blog Steven Sanderson, (https://pragprog.com/titles/utc2/pragmatic-unit-testing-in-c-with-nunit), thì Unit test "là một quá trình thiết kế, chứ không phải là một quá trình kiểm thử".
#  3. Ai là người thực hiện unit test?
  Unit Test thường do lập trình viên thực hiện. Công đoạn này cần được thực hiện càng sớm càng tốt trong giai đoạn viết code và xuyên suốt chu kỳ PTPM. Thông thường, Unit Test đòi hỏi kiểm tra viên có kiến thức về thiết kế và code của chương trình. Mục đích của Unit Test là bảo đảm thông tin được xử lý và xuất (khỏi Unit) là chính xác, trong mối tương quan với dữ liệu nhập và chức năng của Unit. Điều này thường đòi hỏi tất cả các nhánh bên trong Unit đều phải được kiểm tra. Một nhánh thường là một chuỗi các lệnh được thực thi trong một Unit, ví dụ: chuỗi các lệnh sau điều kiện If và nằm giữa then ... else là một nhánh. Thực tế việc chọn lựa các nhánh để đơn giản hóa việc kiểm tra và quét hết Unit đòi hỏi phải có kỹ thuật, đôi khi phải dùng thuật toán để chọn lựa.
# 4. Làm thế nào để viết được unit test tốt
Một bộ unit test tốt là vô cùng có giá trị: nó là tài liệu thiết kế của bạn, khiến cho việc tái cấu trúc và mở rộng code của bạn được dễ dàng hơn trong khi giữ lại một cái nhìn tổng quan rõ ràng về hành vi của mỗi thành phần. Tuy nhiên, một bộ unit test tồi là vô cùng đau thương: nó chẳng chứng tỏ bất cứ điều gì rõ ràng cả, và có thể làm cản trở nghiêm trọng khả năng tái cấu trúc hoặc thay đổi code của bạn theo bất kỳ cách nào.
## 4.1 Hãy làm cho mỗi test độc lập với tất cả những phần khác

Bất kỳ hành vi nhất định nào cũng nên được xác định tại một và chỉ duy nhất một test. Nếu không, sau này khi bạn thay đổi hành vi đó, bạn sẽ phải thay đổi rất nhiều test. Các hệ quả của nguyên tắc này bao gồm:

    Đừng làm những assertion không cần thiết

Những hành vi cụ thể nào mà bạn đang kiểm thử? Nó sẽ gây phản tác dụng nếu cứ Assert() bất cứ thứ gì mà cũng đã được assert bằng test khác: nó chỉ làm tăng tần suất của những thất bại vô nghĩa mà chẳng cải thiện unit test một chút nào cả. Điều này cũng áp dụng cho việc gọi Verify() không cần thiết - nếu nó không phải là hành vi cốt lõi dưới test đó, thì hãy dừng việc quan sát về nó! Đôi khi, cộng đồng TDD thường diễn đạt điều này bằng cách nói rằng "chỉ có duy nhất một assertion hợp lý trên mỗi test".

Hãy nhớ rằng, các unit test là một thiết kế chỉ rõ một hành vi nào đó sẽ làm việc như thế nào, không phải là một danh sách các quan sát của tất cả mọi thứ mà phần code đó thực hiện.

    Kiểm thử chỉ một unit code tại một thời điểm

Kiến trúc của bạn phải hỗ trợ việc testing units (tức là, các class hoặc mọi nhóm rất nhỏ của các class) độc lập, chứ không phải là tất cả chúng kết lại với nhau. Nếu không, bạn sẽ có rất nhiều chồng chéo giữa các test, vì vậy việc thay đổi một unit ảnh hưởng ra bên ngoài và gây ra thất bại ở khắp mọi nơi.

Nếu bạn không thể làm được điều này, thì kiến trúc của bạn đang làm hạn chế chất lượng công việc của bạn - hãy xem xét sử dụng Inversion of Control.

    Giả lập tất cả những dịch vụ và trạng thái bên ngoài

Nếu không, hành vi trong những dịch vụ bên ngoài sẽ chồng chéo lên nhiều test, và trạng thái dữ liệu khác nhau trong mỗi unit test có thể ảnh hưởng đến kết quả của nhau.

Bạn chắc chắn phải nhận một kết quả sai nếu chạy các test của mình theo một thứ tự xác định, hoặc nếu chúng chỉ làm việc khi cơ sở dữ liệu hoặc kết nối mạng của bạn đang hoạt động.

(Bằng cách này, đôi khi kiến trúc của bạn có thể có nghĩa là code của bạn tương tác với các biến static trong quá trình unit test. Hãy tránh điều này nếu có thể, nhưng nếu bạn không thể, ít nhất là đảm bảo mỗi test sẽ reset các biến static liên quan đến một trạng thái được biết đến trước khi nó chạy.) 

    Tránh những điều kiện tiên quyết không cần thiết

Tránh việc có các code setup chung chạy vào lúc bắt đầu của rất nhiều các test không liên quan. Nếu không, nó không rõ ràng về những giả định mà mỗi test dựa trên đó, và chỉ ra rằng bạn đang không test chỉ một đơn vị duy nhất.

Một ngoại lệ: Đôi khi tôi thấy nó hữu ích khi có một phương pháp thiết lập chung được chia sẻ bởi một số lượng rất nhỏ các unit test (một nhóm nhỏ) nhưng chỉ khi tất cả những test đó yêu cầu tất cả những điều kiện tiên quyết này. Nó liên quan đến một unit testing pattern là context-specification, nhưng vẫn có rủi ro là nó trở nên không thể bảo trì được nếu bạn cố gắng sử dụng lại cùng một setup code cho một số lượng lớn các test.

(Bằng cách này, tôi sẽ không tính đẩy nhiều điểm dữ liệu thông qua các test tương tự (ví dụ, bằng cách sử dụng các [TestCase] API của NUnit) là vi phạm quy tắc độc lập này. Quá trình test có thể hiển thị nhiều thất bại nếu một cái gì đó thay đổi, nhưng nó vẫn chỉ có một phương pháp test để duy trì, vì vậy điều đó cũng tốt.)

## 4.2 Đừng sử dụng unit test trong phần thiết lập cấu hình

Theo định nghĩa, các thiết lập cấu hình của bạn không phải là một phần của bất kỳ unit code nào (đó là lý do tại sao bạn trích xuất các thiết lập ra khỏi code của unit của bạn). Ngay cả khi bạn có thể viết một unit test để kiểm tra cấu hình của mình, nó chỉ đơn thuần buộc bạn phải xác định cấu hình tương tự tại một vị trí dự phòng bổ sung. Xin chúc mừng: nó chứng tỏ rằng bạn có thể copy và paste!

Việc sử dụng những thứ như các filter trong ASP.NET MVC như là cấu hình. Các filter như [Authorize] hoặc [RequiresSsl] là các cấu hình tùy chọn gắn vào trong code của bạn. Bằng mọi cách viết một kiểm thử tích hợp (integration test) cho các hành vi bên ngoài-quan sát được (externally-observable), nhưng nó là vô nghĩa để thử unit testing cho sự hiện diện của các thuộc tính của filter trong mã nguồn của bạn - một lần nữa nó chỉ chứng tỏ rằng bạn có thể copy và paste. Điều đó không giúp bạn thiết kế bất cứ điều gì, và nó sẽ chẳng bao giờ phát hiện bất kỳ lỗi nào cả.

## 4.3 Đặt tên các unit test của bạn một cách rõ ràng và nhất quán

Nếu bạn đang kiểm thử action Purchase của ProductController hành động như thế nào khi hết hàng trong kho (stock is zero), sau đó có thể có một lớp test fixture được gọi là PurchasingTests cùng với một unit test gọi là ProductPurchaseAction_IfStockIsZero_RendersOutOfStockView(). Cái tên này mô tả đối tượng (action Purchase của ProductController), kịch bản (hết hàng trong kho), và kết quả (hiển thị trên view là "hết hàng"). Tôi không biết liệu có một cái tên cho mô hình đặt tên này hay không, mặc dù tôi biết nhiều người khác cũng làm theo cách này. 

Tránh sử dụng những tên unit test không rõ nghĩa như Purchase() hoặc OutOfStock(). Việc bảo trì sẽ rất khó khăn nếu bạn không biết là mình đang cố duy trì cái gì.

# 5. Kết luận:
Unit testing có thể làm tăng đáng kể chất lượng dự án của bạn. Nhiều người trong ngành cho rằng việc có thêm bất kỳ unit test thì tốt hơn là không có gì, nhưng không hẳn là như vậy: một bộ test có thể là một tài sản tuyệt vời, hoặc nó có thể là một gánh nặng rất lớn mà không mang lại giá trị gì nhiều. Nó phụ thuộc vào chất lượng của những test này, mà dường như được xác định bởi mức độ các nhà phát triển hiểu rõ những mục tiêu và nguyên tắc của unit testing.

Nguồn: tổng hợp từ internet.