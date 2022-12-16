Bài hướng dẫn sau đây sẽ giới thiệu 7 nguyên tắc cơ bản trong kiểm thử phần mềm mà tất cả các chuyên viên kiểm thử phần mềm từ cơ bản đến nâng cao nên biết.
Trong tiến hành kiểm thử phần mềm, điều quan trọng nhất là bạn đạt được kết quả tối ưu mà không đi chệch hướng khỏi mục tiêu ban đầu. Để đảm bảo rằng bạn không đi chệch hướng khỏi mục tiêu, bạn cần tuân thử theo một nguyên tắc kiểm thử cơ bản. Sau đây là 7 nguyên tắc kiểm thử phổ biến được áp dụng rộng rãi trong kiểm thử phần mềm.
Để tìm hiểu điều này, chúng ta hãy cùng xem xét một kịch bản đơn giản khi bạn thực hiện di chuyển một tệp từ Thư mục A sang Thư mục B.

Hãy nghĩ về tất cả những cách bạn có thể kiểm tra điều này.

Ngoài các kịch bản thông thường, bạn cũng có thể kiểm tra các điều kiện như sau :

-	Bạn đang cố gắng di chuyển tệp khi nó đang mở
-	Bạn không có quyền bảo mật để dán tệp vào Thư mục B
-	Thư mục B nằm trên ổ đĩa chung và dung lượng lưu trữ đã đầy.
-	Thư mục B đã có một tệp có cùng tên, trên thực tế, danh sách này là vô tận
-	Hoặc giả sử bạn có 15 trường đầu vào để kiểm tra, mỗi trường có 5 giá trị có sẵn, số lượng kết hợp sẽ được kiểm tra sẽ là 5 ^ 15

Nếu bạn muốn kiểm tra toàn bộ dự án kết hợp có thể THỜI GIAN THỰC HIỆN & CHI PHÍ sẽ tăng theo cấp số nhân. Chúng tôi cần một số nguyên tắc và chiến lược nhất định để tối ưu hóa nỗ lực thử nghiệm

Dưới đây là 7 nguyên tắc:

**1) Kiểm thử tất cả là không thể**

Đúng thế! Kiểm thử tất cả là không thể. Thay vào đó, chúng ta cần chọn thực thi những loại kiểm thử quan trọng nhất dựa trên phân tích rủi ro cũng như tầm quan trọng và độ ưu tiên của việc kiểm thử.

Và câu hỏi đáng giá triệu đô la là, làm thế nào để bạn xác định rủi ro này?

Để trả lời điều này thì theo bạn, thao tác nào có khả năng khiến hệ điều hành của bạn bị lỗi?

Tôi chắc chắn rằng hầu hết các bạn sẽ đoán, mở tất cả 10 ứng dụng khác nhau cùng một lúc.

Vì vậy, nếu bạn đang thử nghiệm Hệ điều hành này, bạn sẽ nhận ra rằng các lỗi có thể được tìm thấy trong hoạt động đa tác vụ và cần phải được kiểm tra kỹ lưỡng, điều này đưa chúng ta đến nguyên tắc tiếp theo: Cụm lỗi

**2) Cụm lỗi**

Trong quá trình kiểm thử, chúng ta sẽ có thể dễ dàng quan sát thấy đa phần những lỗi tìm được thường chỉ liên quan đến một vài tính năng của hệ thống.. Đây là ứng dụng của Nguyên tắc Pareto để kiểm tra phần mềm: khoảng 80% các vấn đề được tìm thấy trong 20% các tính năng của hệ thống.

Theo kinh nghiệm, bạn có thể xác định các tính năng rủi ro như vậy. Nhưng phương pháp này cũng có vấn đề riêng của nó.

Nếu các thử nghiệm tương tự được lặp đi lặp lại nhiều lần, cuối cùng các trường hợp thử nghiệm tương tự sẽ không còn tìm thấy các lỗi mới.

**3) Nghịch lý thuốc trừ sâu**

Việc sử dụng lặp đi lặp lại cùng một loại thuốc trừ sâu để diệt côn trùng trong quá trình nuôi sẽ theo thời gian dẫn đến việc côn trùng phát triển tính kháng thuốc trừ sâu. Do đó, thuốc trừ sâu trên côn trùng không hiệu quả. Điều tương tự cũng áp dụng cho kiểm thử phần mềm. Nếu một bộ test cases được thực hiện lặp đi lặp lại nhiều lần sẽ không còn ý nghĩa trong việc phát hiện ra các lỗi mới.

Để khắc phục điều này, các trường hợp kiểm thử cần phải được xem xét & sửa đổi thường xuyên, thêm các trường hợp kiểm thử mới & khác nhau để giúp tìm ra nhiều lỗi hơn.

Người kiểm tra không thể phụ thuộc đơn giản vào các kỹ thuật kiểm tra hiện có. Chúng ta phải liên tục cải thiện các phương pháp hiện có để kiểm thử được hiệu quả hơn. Nhưng ngay cả sau khi thử nghiệm mồ hôi và công sức này, bạn không bao giờ có thể khẳng định sản phẩm của mình không có lỗi. Để chứng minh điểm này, chúng ta hãy xem video này về sự ra mắt công khai của Windows 98

Bạn nghĩ rằng một công ty như MICROSOFT sẽ không kiểm tra hệ điều hành của họ một cách kỹ lưỡng và sẽ mạo hiểm danh tiếng của họ chỉ để thấy hệ điều hành của họ bị sập trong khi ra mắt công khai!

**4) Kiểm thử chứng minh sự hiện diện của lỗi**

Do đó, nguyên tắc kiểm thử nói rằng - Kiểm thử chỉ chứng minh được sự hiện diện của lỗi và không thể chứng minh được sản phẩn không còn lỗi.. Tức là Kiểm thử phần mềm làm giảm xác suất lỗi chưa được phát hiện trong phần mềm nhưng ngay cả khi không tìm thấy lỗi, đó không phải là bằng chứng về tính chính xác. Nhưng nếu, bạn làm việc chăm chỉ hơn, thực hiện mọi biện pháp phòng ngừa và làm cho sản phẩm phần mềm của bạn không có lỗi 99%. Và phần mềm không đáp ứng nhu cầu & yêu cầu của khách hàng. Điều này dẫn chúng ta đến nguyên tắc tiếp theo, trong đó nêu rõ rằng - Sự vắng mặt của Lỗi

**5) Sự vắng mặt của lỗi**

Có thể phần mềm không có lỗi 99% vẫn không sử dụng được. Đây có thể là trường hợp nếu hệ thống được kiểm tra kỹ lưỡng cho các yêu cầu sai. Kiểm thử phần mềm không chỉ đơn thuần là tìm lỗi, mà còn để kiểm tra xem phần mềm có đáp ứng nhu cầu kinh doanh không. Sự vắng mặt của Lỗi là sai lầm, tức là việc tìm và sửa lỗi không giúp ích gì nếu việc xây dựng hệ thống không sử dụng được và không đáp ứng nhu cầu & yêu cầu của người dùng.

Để giải quyết vấn đề này, nguyên tắc thử nghiệm tiếp theo nêu rõ rằng Kiểm thử sớm

**6) Kiểm thử sớm**

Kiểm thử nên bắt đầu sớm nhất có thể trong Vòng đời phát triển phần mềm. Vì vậy, bất kỳ lỗi nào trong các yêu cầu hoặc giai đoạn thiết kế được nắm bắt trong giai đoạn đầu. Nó rẻ hơn nhiều để sửa một lỗi trong giai đoạn đầu của thử nghiệm. Nhưng làm thế nào để bắt đầu kiểm thử sớm? Bạn nên bắt đầu tìm lỗi ngay khi yêu cầu được xác định. Thêm về nguyên tắc này trong một hướng dẫn đào tạo sau này.

**7) Kiểm thử phụ thuộc vào ngữ cảnh**

 Kiểm thử phụ thuộc vào ngữ cảnh, về cơ bản có nghĩa là cách bạn kiểm tra trang web thương mại điện tử sẽ khác với cách bạn kiểm tra quảng cáo ngoài ứng dụng. Tất cả các phần mềm được phát triển không giống nhau. Bạn có thể sử dụng một cách tiếp cận, phương pháp, kỹ thuật và loại kiểm thử khác nhau tùy thuộc vào loại ứng dụng. Đối với kiểm thử ví dụ, bất kỳ hệ thống POS nào tại cửa hàng bán lẻ sẽ khác với thử nghiệm máy ATM. 
 
**Tóm tắt bảy nguyên tắc kiểm tra**

Nguyên tắc 1 Kiểm thử cho thấy sự hiện diện của lỗi
Nguyên tắc 2 Kiểm thử toàn diện là không thể
Nguyên tắc 3 Kiểm thử sớm
Nguyên tắc 4 Cụm lỗi
Nguyên tắc 5 Nghịch lý thuốc trừ sâu
Nguyên tắc 6 Kiểm thử là phụ thuộc vào ngữ cảnh
Nguyên tắc 7 Sự vắng mặt của lỗi

**Quan niệm: "Nguyên tắc chỉ mang tính tham khảo. Tôi sẽ không sử dụng chúng trong thực tế."**

Điều này là rất sai sự thật. Nguyên tắc kiểm tra sẽ giúp bạn tạo Chiến lược kiểm thử hiệu quả và dự thảo các trường hợp kiểm tra lỗi.

Nhưng học các nguyên tắc kiểm thử cũng giống như học lái xe lần đầu tiên.

Ban đầu, trong khi bạn học lái xe, bạn chú ý đến từng thứ và mọi thứ như sang số, tốc độ, xử lý ly hợp, v.v. Nhưng với kinh nghiệm, bạn chỉ tập trung vào việc lái phần còn lại một cách tự nhiên. Như vậy, bạn thậm chí còn tổ chức các cuộc trò chuyện với các hành khách khác trong xe.

Điều tương tự cũng đúng cho các nguyên tắc kiểm thử. Những người kiểm thử có kinh nghiệm đã tóm tắt những nguyên tắc này đến một mức độ mà họ áp dụng chúng ngay cả khi không cần suy nghĩ. Do đó, quan niệm cho rằng các nguyên tắc không được sử dụng trong thực tế đơn giản là không đúng.


Nguồn tham khảo:  https://www.guru99.com/software-testing-seven-principles.html