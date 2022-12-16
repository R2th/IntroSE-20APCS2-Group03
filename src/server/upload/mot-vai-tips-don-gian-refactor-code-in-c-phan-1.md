Khi còn là 1 sinh viên và ra trường thậm chí được vài năm. Vấn đề không những mình mà có thể là nhiều bạn khác quan tâm đó chính là làm sao code chạy được và không bị lỗi. 
Nhưng sau một thời mình nhận ra 1 điều đơn giản rằng Code thì không bao giờ là không bị lỗi, và việc làm sao để phát hiện được lỗi và fix nó 1 cách nhanh chóng thực sự không phải là điều đơn giản. 
Và một điều nữa là ban đầu code có thể chạy được  nhưng khi chương trình phình to lên có thể đoạn code đó không thể nào chạy được nữa đơn giản là đoạn code đó không thể làm đáp ứng được khả năng mở rộng cho các feature mới hoặc bị low performance .... 
Và như một điều tất yếu đoạn code đó bị đập đi. Và xây dựng lại đoạn code khác. Thật mất thời gian phải không nào.
Khi đã trải qua các vấn đề trên bản thân mình mới bắt đầu nhìn nhận lại tất cả. Từ cách tiếp cận vấn đề khi mới bắt tay vào code, cho đến lúc implement các module, fix bug, add thêm tính năng và thậm chí là ngay cả cách đặt tên biến ntn .....
Bản thân mình cũng rút ra được một vài tips mà mình nghĩ rằng khi áp dụng các điều đơn giản này thì ít nhất code của mình cũng có thể hiểu được bởi CON NGƯỜI :)), dễ dàng mở rộng, maintain, cũng như dễ dàng detect được bugs nằm ở đâu .....
Đi vào vấn đề chính thôi nào. Refactor là cái quái gì vậy.

**1/ Refactor là gì ?**

*    Refactor nghĩa là thực hiện một số phương pháp để cải thiện thiết kế, cấu trúc lại chương trình cũng như chất lượng của code đã có mà không thay đổi tính chất đúng đắn ban đầu.
    
**2/  Tại sao phải refactor**

*    Refactor cải thiện được thiết kế hệ thống của bạn
*    Refactor giúp chương trình dễ hiểu hơn
*    Refactor giúp dễ tìm lỗi hơn
*    Refactor giúp bạn code nhanh hơn

**3/ Khi nào cần phải refactor**

*    Khi thêm một feature/function mới
*    Khi fix bug
*    Khi review code
*    Khi thực hiện UnitTest

**4/ Làm sao xác định "Code Smells"**

**Code Smells**. Nghe cái tên có vẻ kình khủng nhỉ.  Đang có mùi gì đó chăng. Đúng như vậy code smell không phải là bug, nó cũng không gây ảnh hưởng đến các chức năng của chương trình. 
Tuy nhiên code "đang bốc mùi" đang ám chỉ đến việc một vài thiết kế đang tiềm ẩn những điểm yếu mà nó có thể làm chậm đi tốc độ code, tăng nguy cơ xảy ra bug,  failed nếu có thêm các tính năng mới trong tương lai.
Dưới đây là một số code smells mà chúng ta có thể hay bắt gặp trong chương trình . Để xác định 1 cách rõ ràng vấn đề nằm ở đâu chúng ta sẽ đi từ tổng thể đến chi tiết của 1 chương trình nhé.

**Application level smells: Tầng chương trình**

*    Duplicate Code: Cùng 1 đoạn hoặc logic code nhưng nó được lặp đi lặp lại ở nhiều nơi khác nhau trong chương trình.
*    Contrived Complexity: Sử dụng 1 thiết kế quá phức tạp và cấp cao trong khi 1 thiết kế đơn giản đã xử lý được vấn đề.
*    Shotgun Surgery:  Hãy nghiệm lại trong quá trình lập trình của mình, đã có lúc nào bạn thay đổi 1 đoạn nhỏ của code. Thì bắt buộc bạn phải thay đổi ở rất nhiều chỗ khác để có thể chạy được chưa. 
 
**Class level smells: Tầng Class**

*    Large Class :  Hãy thử tưởng tượng một class mà đến vài nghìn line code, vài chục method, vài trăm property thì kinh khủng như thế nào. Riêng mình thì kéo chuột cũng đã mệt rồi chứ đừng nói nhìn nũa :)).
*    Feature Envy:  Trong 1 method mà truy cập đến data của 1 object khác nhiều hơn chính class chứa nó.
*    Inappropriate Intimacy: Cái bạn còn nhớ DI Principle(dependency injection) chứ. 1 class tốt thì nó sẽ biết càng ít càng tốt đến internal class khác. Điều này có nghĩa là nếu 1 lớp mà nó phụ thuộc vào implement của 1 class khác thì nó bắt đầu có "MÙI" rồi nhé.
*    Refused Bequest:  Hãy nhớ lại Liskov Principle trong SOLID. Các class con có thể hoàn toàn thay thế được class cha mà không thay đổi tính đúng đắn của chương trình.  Triệu chứng này nó tương đồng 
      với nguyên lý này. Nghĩa là khi 1 class kế thừa từ 1 class khác. mà bản chất implement các method bên trong là khác với class cha.
*    Lazy class: 1 số class được viết ra nhưng nó không được sử dụng hoặc thể là sẽ không có nhu cầu sử dụng trong tương lai.
*    Dead Code: Cũng giống như Lazy class, 1 số method, filed hoặc là parameter sẽ không được sử dụng. Trong 1 đống bùi nhùi code, những thứ dư thừa này đôi lúc lại khiến chúng ta bối rối và không tập trung được vào thứ cần thiết.
     
**Method level smells: Tầng Method**
 
*    Long Method:  1 Method xử lý quá nhiều thứ và nó quá dài. Thường thì 1 method mà nhiều hơn 10 line code. Tôi sẽ đặt câu hỏi tại sao ?
*    Naming: Đặt tên, vấn đề muôn thủa. Khi tôi code, chỉ có tôi và chúa biết tôi code gì. 1 tháng sau thì chỉ có chúa mới biết mà thôi. Việc đặt tên rõ ràng và có ý nghĩa góp phần gợi nhớ giúp bạn hiểu được những gì bạn đã tạo ra.
*    Write Useful Comments: Vấn đề này cũng tương tự như việc đặt tên. Comment mọi thứ mà bạn nghĩ là cần thiết để hiểu về nó. 
*    Long Parameter List: Vấn đề này tương đối hay gặp, đặc biệt là với các bạn sinh viên mới ra trườngđó là khai báo rất nhiều params đầu vào cho 1 method.
*    Condition complexity: 1 vấn đề nữa mà các bạn ít kinh nghiệm hay gặp phải đó là thường để tất cả các logic trong 1 câu condition (if, while....), việc này sẽ làm code của bạn khó hiểu hơn.
*    Excessive return of data:  Thử tưởng tượng như thế này nhé. Khi bạn lập trình với API. Bạn expose 1 method chứa thông tin địa chỉ người dùng: tên, địa chỉ. Thì thường các bạn sẽ bonus thêm 1 vài thông nữa như là email, phone....
*    Extreme long lines of code: 1 line code quá dài sẽ rất khó hiểu, thậm chí khó debug, và giảm khả năng sửa đổi.
*    Switch Statement: Đã khi bạn đã rơi vào trường hợp code có quá nhiều case phải xử lý và phải sử dụng switch case 1 cách phức tạp hoặc 1 đống  bùi nhùi các lệnh if else. 

Fine, sau khi đọc tới đây thì hãy nghiệm lại các chương trình mà bạn đã viết ra trước đây nhé. Xem thử với list trên thì liệu code của các bạn có đang "MEO" lên không. 
Nếu MEO thì ở phần tiếp theo mình sẽ chia sẻ cách phương pháp để giải quyết các vấn đề ở trên, những điều cần lưu ý khi thực hiện và có phải là lúc nào cũng cần Refactor không nhé.