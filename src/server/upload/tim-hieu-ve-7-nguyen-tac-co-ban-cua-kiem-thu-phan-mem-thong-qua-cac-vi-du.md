Trong cuộc sống bất cứ công việc gì cũng đều có những nguyên tắc hoạt động riêng và kiểm thử phần mềm cũng vậy. Bạn là một kiểm thử phần mềm chuyên nghiệp, một chuyên gia QA?  Bạn đã từng nghe đến các nguyên tắc này chưa? 

Để đạt được kết quả kiểm thử tối ưu trong khi tiến hành kiểm thử phần mềm mà không đi lệch khỏi mục tiêu là điều cực kì quan trọng. Nhưng làm thế nào để xác định rằng bạn đang theo đúng chiến lược kiểm thử? Để làm được điều đó, bạn cần tuân thủ một số nguyên tắc kiểm thử cơ bản. Dưới đây là bảy nguyên tắc kiểm thử phổ biến được áp dụng rộng rãi trong ngành công nghiệp phần mềm.

![](https://images.viblo.asia/62496b19-05d8-435d-a0a3-07390b335ed8.PNG)

Để dễ hiểu hơn chúng ta cùng đến với ví dụ sau: Bạn đang copy một file từ thư mục A sang Thư mục B. Ngoài các kịch bản thông thường, bạn cũng có thể kiểm tra với các điều kiện sau:

* Bạn copy file khi nó đang được mở
* Bạn không có quyền để paste tệp vào Thư mục B
* Dung lượng ổ đĩa chứa thư mục B đã đầy.
* Thư mục B đã có một file giống tên file bạn muốn copy
* Hoặc giả sử có 15 trường để kiểm tra, mỗi trường có thể nhập 5 giá trị, vậy sẽ có thể kiểm tra là 5 x 15 trường hợp.

Nếu bạn muốn kiểm tra toàn bộ những điều trên thì sẽ tốn khá nhiều thời gian và chi phí.  Vì vậy chúng ta cần có một só nguyên tắc và chiến lược nhất định để tối ưu hóa effort kiểm thử.

# Có 7 nguyên tắc kiểm thử như sau:

## 1) Kiểm tra toàn bộ là không thể
Đúng! Kiểm thử toàn bộ là không thể. Thay vào đó, chúng ta cần cân nhắc những loại kiểm thử nào phù hợp dựa trên phân tích rủi ro cũng như tầm quan trọng và độ ưu tiên của việc kiểm thử.

Vậy thì làm thế nào để bạn xác định được rủi ro?

Theo bạn, hoạt động nào có khả năng khiến hệ điều hành của ban bị lỗi?

Chắc chắn hầu hết các bạn sẽ nghĩ rằng: Mở tất cả 10 ứng dụng khác nhau cùng một lúc.

Vì vậy, nếu bạn đang kiểm thử Hệ điều hành này, bạn sẽ thấy các lỗi có thể được tìm thấy bởi nhiều hành động và cần phải được kiểm thử kỹ. Chính vì điều này sẽ đưa chúng ta đến với nguyên lý tiếp theo.

## 2) Lỗi phân bố tập trung
Trong quá trình kiểm thử, chúng ta sẽ có thể dễ dàng quan sát thấy đa phần những lỗi tìm được thường chỉ liên quan đến một vài tính năng của hệ thống. Điều này cũng thuận theo nguyên lý Pareto: 80% số lượng lỗi được tìm thấy trong 20% tính năng của hệ thống.

Theo kinh nghiệm, bạn có thể xác định các mô-đun rủi ro. Nhưng phương pháp này cũng có vấn đề: Nếu lặp đi lặp lại nhiều lần các trường hợp kiểm thử tương tự nhau sẽ không còn tìm thấy các lỗi mới.

## 3) Nghịch lý thuốc trừ sâu
Việc sử dụng lặp đi lặp lại cùng một loại thuốc trừ sâu để diệt côn trùng, theo thời gian sẽ dẫn đến việc côn trùng bị kháng thuốc trừ sâu. Do đó, dùng thuốc trừ sâu để tiêu diệt côn trùng sẽ không còn hiệu quả. Tương tự thì trong kiểm thử phần mềm cũng vậy. Nếu một bộ test cases được thực hiện lặp đi lặp lại nhiều lần sẽ không còn ý nghĩa trong việc phát hiện ra các lỗi mới.

Để khắc phục điều này, các test cases cần phải được xem xét và sửa đổi thường xuyên, thêm các test cases mới để giúp tìm ra nhiều lỗi hơn.

Testers không thể chỉ phụ thuộc vào các kỹ thuật kiểm tra hiện có. Chúng ta phải liên tục cải thiện các phương pháp đã có để kiểm thử được hiệu quả hơn. Nhưng ngay cả sau quá trình kiểm thử tốn nhiều effort và thời gian, bạn không thể khẳng định rằng sản phẩm của mình không có lỗi. 

## 4) Kiểm thử chứng minh sự hiện diện của lỗi.
Kiểm thử chỉ chứng minh được sự hiện diện của lỗi và không thể chứng minh được sản phẩn không còn lỗi. Tức là Kiểm thử phần mềm làm giảm xác suất lỗi chưa được phát hiện trong phần mềm ngay cả khi không tìm thấy lỗi.

Nếu bạn chăm chỉ hơn, thực hiện mọi biện pháp ngăn chặn lỗi và làm cho sản phẩm phần mềm của bạn 99% không có lỗi. Và nếu phần mềm không đáp ứng nhu cầu & yêu cầu của khách hàng. Điều này dẫn chúng ta đến nguyên lý tiếp theo - Hết Lỗi.

## 5)  Quan niệm sai lầm về việc “hết lỗi”
Có thể phần mềm không có lỗi 99% nhưng vẫn không sử dụng được. Đây có thể là trường hợp hệ thống được kiểm tra kỹ lưỡng nhưng không đúng theo các yêu cầu  của khách hàng. Kiểm thử phần mềm không chỉ đơn thuần là tìm lỗi, mà còn để kiểm tra xem phần mềm có đáp ứng nhu cầu của người dùng hay không. **Hết Lỗi** là sai lầm, tức là việc tìm và sửa lỗi không giúp ích gì nếu việc xây dựng hệ thống không sử dụng được và không đáp ứng nhu cầu & yêu cầu của người dùng.

Để giải quyết vấn đề này, cần thực hiện nguyên lý thử nghiệm tiếp theo: Kiểm thử sớm

## 6) Kiểm thử sớm
Kiểm thử sớm - Kiểm thử nên bắt đầu sớm nhất có thể trong Vòng đời phát triển phần mềm. Vì vậy, bất kỳ lỗi nào được phát hiện trong giai đoạn đầu (ví dụ như giai đoan lấy yêu cầu khách hàng hay thiết kế tài liệu sản phẩm) thì chi phí để sửa lỗi sẽ rẻ hơn, việc phát hiện lỗi càng muộn bao nhiêu thì chi phí sữa lỗi càng cao bấy nhiêu.
Nhưng kiểm thử sớm bằng cách nào? Chúng ta nên bắt đầu tìm lỗi ngay khi yêu cầu được xác định.

## 7) Kiểm thử phụ thuộc vào ngữ cảnh
Kiểm thử phụ thuộc vào ngữ cảnh, về cơ bản có nghĩa là cách bạn kiểm thử trang web thương mại điện tử sẽ khác với cách bạn kiểm thử một ứng dụng trên điện thoại di động. Tất cả các phần mềm được phát triển không giống nhau. Bạn có thể sử dụng cách tiếp cận, phương pháp, kỹ thuật và loại thử nghiệm khác nhau tùy thuộc vào loại ứng dụng. 

Ví dụ: Kiểm thử hệ thống POS tại cửa hàng sẽ khác với thử nghiệm trên máy ATM.


# Tóm lại chúng ta có 7 nguyên tắc để kiểm thử:
Nguyên tắc 1:  Thử nghiệm cho thấy sự hiện diện của lỗi
Nguyên tắc 2:  Thử nghiệm toàn bộ là không thể
Nguyên tắc 3:  Thử nghiệm sớm
Nguyên tắc 4:  Lỗi thường phân bố tập trung
Nguyên tắc 5:  Nghịch lý thuốc trừ sâu
Nguyên tắc 6:  Kiểm thử phụ thuộc vào ngữ cảnh
Nguyên tắc 7:  Hết lỗi - quan niệm sai lầm

# Quan niệm: "Nguyên tắc chỉ mang tính tham khảo. Tôi sẽ không sử dụng chúng trong thực tế."
Điều này sai hoàn toàn. Nguyên tắc kiểm thử sẽ giúp bạn tạo được Chiến lược kiểm thử hiệu quả và liệt kê ra các trường hợp kiểm tra lỗi.

Học các nguyên tắc kiểm thử cũng giống như bạn học lái xe lần đầu tiên. Ban đầu, trong khi bạn học lái xe, bạn sẽ chú ý đến từng thứ và mọi thứ như sang số, tốc độ, xử lý, kết hợp, v.v. Nhưng với kinh nghiệm, bạn chỉ tập trung vào việc lái những cái còn lại bạn làm theo một cách tự nhiên. Bạn thậm chí còn có thể nói chuyện trao đôi với người khác trong xe.

Tương tự như  vậy, với các nguyên tắc thử nghiệm. Những người kiểm thử có kinh nghiệm đã nội tâm hóa những nguyên tắc này đến một mức độ mà họ áp dụng chúng ngay cả khi không cần suy nghĩ. Do đó, quan niệm cho rằng các nguyên tắc không được sử dụng trong thực tế là không đúng.

Tài liệu tham khảo: https://www.guru99.com/software-testing-seven-principles.html