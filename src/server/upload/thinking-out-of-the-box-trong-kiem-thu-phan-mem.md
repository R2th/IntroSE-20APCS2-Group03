‘Creative Thinking’ hay ‘Out of the Box Thinking’ là một cụm từ mà chúng ta thường bắt gặp tại nơi làm việc hoặc thậm chí trong cuộc sống hàng ngày.

Bạn đã bao giờ thử tìm hiểu ý nghĩa của nó khi chúng ta nói  ‘Thinking out of the Box’?

Theo Wikipedia:

“Thinking outside the box là để suy nghĩ khác biệt, độc đáo hoặc từ một quan điểm mới. Cụm từ này thường đề cập đến tiểu thuyết hoặc tư duy sáng tạo”

![](https://images.viblo.asia/7127a27c-84c7-4205-9437-ae8aea893581.jpg)

Tuy nhiên, định nghĩa trên có thể được mở rộng cho lĩnh vực của chúng tôi, Kiểm thử phần mềm.

Khi chúng ta bước vào lĩnh vực kiểm thử phần mềm, điều đầu tiên chúng ta được dạy hoặc chúng ta học là white box và black box. Khi được dạy, tất cả những gì chúng ta luôn làm là kiểm tra black box hoặc white box. Điều này đã hạn chế tư duy của chúng ta khỏi suy nghĩ vượt ra ngoài các box. Có bao giờ chúng ta nghĩ rằng vượt ra ngoài việc test black box hoặc white box có thể giúp chúng ta đạt được một cách nhanh chóng để hướng tới một sự nghiệp vững chắc trong kiểm thử phần mềm?

![](https://images.viblo.asia/09df9b08-d172-4127-b16c-62b81ab402e6.jpg)

Chúng tôi sẽ thảo luận ở đây một vài kỹ thuật mà tôi và nhiều Người cố vấn của tôi tuân theo trong khi kiểm thử phần mềm:

## Tạo các testcase "rapid fire":

Kỹ thuật này, cũng như tên của nó gợi về việc nhanh chóng tạo ra các test case. Đó là một cách tiếp cận của con người để test những cái liên kết mà test hướng tới hiệu suất của con người.

Những điều ban đầu xuất hiện trong đầu chúng ta khi chúng ta nói về việc tạo test case là 1 requrement document, 1 bảng tính Excel và một số hướng dẫn do tổ chức cung cấp. Đầu tiên, hãy bỏ qua tất cả những điều này và có được một ý tưởng về những gì bạn nghĩ bạn sắp test. Nhấc Bút & Giấy và viết thật nhiều kịch bản bạn có thể viết trong vòng 60 giây. Lặp lại quá trình cho đến khi bạn không thể nghĩ ra kịch bản hoặc ý tưởng nào nữa và cuối cùng xem lại chúng.

Bạn sẽ ngạc nhiên khi thấy số lượng ý tưởng / test case bạn đã có mà không cần xem requirement document.

## Các ý tưởng test chéo (analogy):

Trước khi bạn bắt đầu test một ứng dụng, hãy ghi nhớ một ứng dụng tương tự mà bạn đã sử dụng trong quá khứ. Làm điều này sẽ cho phép bạn xác định những vấn đề cái mà không liên quan đến các requirement nhưng thể hiện một tính năng chung cần có trong ứng dụng nhưng đã bị bỏ qua.

Ví dụ: Nếu bạn đang test một portal, sử dụng nó giống như bạn sử dụng chương trình Email của bạn hoặc bất kỳ ứng dụng nào bạn đã làm việc trước đó và xem ứng dụng này hoạt động như thế nào.

Tôi nhớ đã khám phá một critical defect bằng cách sử dụng kỹ thuật này. Tôi đã test 1 secure login của một ứng dụng tài chính và đã thử thay đổi URL và điều hướng đến một trang khác (đó là một khiếm khuyết trong ứng dụng được test cuối cùng của tôi). Bằng cách này, tôi có thể bỏ qua cơ chế đăng nhập bằng secure ID! Đây không phải là 1 test case cũng như không được highlight bởi bất kỳ thành viên nào khác của team như một kịch bản test khả dĩ.

## Ý tưởng test reverse hoặc backward:

Quy trình làm việc thông thường bạn làm theo trong khi test là gì? Đây có phải là các bước chính xác giống như đã được sử dụng trong khi phát triển ứng dụng:

“Các requirement  >>   Các unit case     >>      Integration testing     >>       System testing 

hay bất kỳ cách tiếp cận nào khác?"

Suy nghĩ của những người làm việc trong việc phát triển một ứng dụng chắc chắn sẽ suy nghĩ theo hướng mà bao gồm hầu hết các positive testing. End user có thể không nghĩ theo cùng một hướng. Đó là lý do tại sao các product effect hoặc UAT effect tồn tại ngay cả sau các vòng Unit test, integration test, và system test.

Ví dụ: requirement nói rằng bạn có thể upload một file không vượt quá 10 MB. Hầu hết các tester sẽ theo dõi việc upload 1 MB, 2 MB, 3 MB và cứ thế đạt đến 10 MB hoặc thông báo lỗi được hiển thị. Tại sao không bắt đầu với 10 MB và sau đó thử 11 MB rồi 9 MB? Ví dụ này không có gì ngoài một BVA (Phân tích giá trị biên). Tuy nhiên, có bao nhiêu người trong chúng ta đã thử sử dụng BVA trong các tình huống khác với 1 input box.

## Đặt câu hỏi:

![](https://images.viblo.asia/28b5eb06-5fc8-4f73-ac99-a59244049e2e.jpg)

Ý tưởng là, mỗi kỹ sư QA nên biết mục đích của một requirement. Đặt các câu hỏi sẽ giúp Kỹ sư QA hoàn thiện mục đích test của mình. Nếu một Kỹ sư QA thật tốt trong việc đặt câu hỏi, họ sẽ nghiễm nhiên test tốt. Bạn cần chắc chắn rằng không có câu hỏi nào (nhỏ đến mức ngớ ngẩn) bị bỏ qua.

Và, lần lượt, đặt câu hỏi cũng sẽ nâng cao domain knowledge của người đang thực hiện test.

Hãy nhớ rằng: “Câu hỏi ngớ ngẩn duy nhất là câu hỏi mà không được nêu ra.”

## Nghiên cứu:

Nghiên cứu được chứng minh là rất có lợi trước khi bắt đầu test. Chỉ cần lưu ý đến những vấn đề mà người khác đã gặp phải trong khi thực hiện nhiệm vụ tương tự. Giả sử, bạn được yêu cầu bắt đầu 1 cross-browser testing như một trong những assignment của mình. Trước khi bắt đầu test, nghiên cứu các vấn đề mà người khác gặp phải khi sử dụng cùng một browser sẽ giúp bạn tìm ra lỗi trước khi bắt đầu test thực tế.

## Dừng làm việc: Một icebreaker

Testing đôi khi có thể là một quá trình đơn điệu và các ý tưởng có thể bắt đầu bão hòa. Bạn có thể bắt đầu cảm thấy rằng không có giải pháp nào hiệu quả hoặc thậm chí bạn có thể hết ý tưởng. Trong những trường hợp như vậy, Dừng làm việc 1 cách hiệu quả có thể làm rất nhiều điều kỳ diệu và có thể giúp bạn bắt đầu từ nơi bạn rời đi.

Dừng làm việc có thể là 1 ly Cà phê hoặc đơn giản là nhìn ra ngoài cửa sổ hoặc bất cứ điều gì bạn muốn để làm mới mình.

Ngoài việc Sáng tạo, các yếu tố như thời gian, tốc độ thực hiện ý tưởng và thực hiện chúng cũng có tầm quan trọng rất cao. Bạn có thể có được một ý tưởng tuyệt vời nhưng sẽ ra sao nếu quá muộn để thực hiện nó.

Danh sách trên chỉ là một vài ý tưởng sẽ giúp bạn tạo ra nhiều ý tưởng mà thôi.

Tham khảo: [https://www.softwaretestinghelp.com/thinking-out-of-the-box-while-testing-software/](https://www.softwaretestinghelp.com/thinking-out-of-the-box-while-testing-software/)