Review code, nghe thì khá oai, nhưng lại chẳng dễ chút nào, và chỉ đến khi trực tiếp bắt tay vào làm, bạn mới hiểu để đọc hiểu được code của người khác, để comment hay refactor lại nó, không hề đơn giản, và đôi khi, việc comment sao cho họ vui vẻ sửa cũng là cả 1 nghệ thuật. 

Đầu tiên, chúng ta hãy bắt đầu từ việc trả lời câu hỏi: "Vì sao chúng ta cần review code?"
1. Giúp giảm số lượng bug trong code
2. Đảm bảo tất cả các yêu cầu đã được thực hiện
3. Một cách hiệu quả để học hỏi lẫn nhau và làm quen với code base.
4. Giúp duy trì một style code chung cho toàn đội (như kiểu trong rails hay sử dụng rubocop vậy)
5. Gắn kết đội - khuyến khích các developer nói chuyện với nhau để tìm ra cách giải quyết tốt nhất

Tuy nhiên, review code thường là một trong những phần khó khăn và mất thời gian nhất trong quá trình phát triển. 

Sau khi đã code xong, mọi người có thể đã phải chờ nhiều ngày cho đến lúc code được review xong. Rồi sau đó khi lại bắt đầu quá trình comment, fix comment giữa người review và người được reivew, có khi tiêu tốn của bạn hàng tuần liền. Bạn mắc kẹt giữa những tính năng mới và những tính năng cũ cần được sửa lại.

Đó là lý do tại sao việc xây dựng một quy trình chi tiết về review code trong team lại vô cùng quan trọng.

Nhìn chung, bạn sẽ phải có các hướng dẫn chi tiết cho cả 2 phía, trước khi tạo một pull request và trong khi review. Cụ thể là:

### Xác định các điều kiện để tạo pull request:
Những điều dưới đây rất cần thiết cho việc giảm thiểu conflict:

1. Đảm bảo rằng code build thành công.
2. Đọc và chú thích code.
3. Build và chạy test.
4. Tất cả code trong phần codebase đều cần được test.
5. Lick ticket/issue vào pull request.
6. Không chuyển cho người review khi chưa đảm bảo được các điều kiện trên.

### Trách nhiệm của người được review
Mặc dù người review là người cuối cùng có quyền merge pull request, nhưng những chỉ dẫn dưới đây đối với người được review sẽ giúp càng có ít rủi ro về lâu về dài:

**1. Giao tiếp với reviewer** - đưa cho reviewer yêu cầu về task của bạn. Vì đa số chúng ta đã từng ở vị trí reviewer, hãy đặt mình vào vị trí của reviewer và tự hỏi “Liệu thế này có đủ cho chúng ta không?”

**2. Tạo các pull request nhỏ** - Tạo các pull request nhỏ là cách tốt nhất để tăng tốc độ review. Giữ cho các pull request đủ nhỏ để bạn có thể thực hiện vòng lặp review - fix comment nhanh chóng và chính xác. Nhìn chung, các thay đổi code nhỏ sẽ dễ test hơn và các reviewer có thể hiểu cấu trúc và logic hơn.

**3. Tránh thay đổi trong khi review code** - Các thay đổi lớn trong quá trình review code về cơ bản sẽ khiến quá trình review phải review lại từ đầu. Nếu bạn cần thực hiện các thay đổi lớn sau khi submit review, bạn có thể sẽ phải đưa review hiện có và cùng với các thay đổi bổ sung. Nếu bạn muốn tạo các thay đổi lớn sau khi bắt đầu quá trình review code, hãy đảm bảo đã trao đổi với reviewer về vấn đề này càng sớm càng tốt.

**4. Phản hồi tất cả các comment của reviewer** - Kể cả khi bạn không thực hiện comment của họ, hãy phản hồi và giải thích lý do. Nếu có gì đó bạn không hiểu, hãy đưa ra các câu hỏi.

**5. Review code là những cuộc thảo luận, không phải sự sai khiến** - bạn có thể nghĩ hầu hết comment như một đề xuất hơn là một yêu cầu. Việc không đồng ý với comment của reviewer cũng không phải là vấn đề, nhưng bạn cần giải thích lý do và cho họ một cơ hội để phản hồi.

### Trách nhiệm của reviewer

Vì người review là người cuối cùng trước khi merge code, trách nhiệm quan trọng nhất của họ là giảm thiểu lỗi. Người review nên:
1. Chú ý miêu tả và yêu cầu của task.
2. Đảm bảo hoàn toàn hiểu được code.
3. Chia bình luận của bạn làm 3 loại: Bắt buộc, không bắt buộc và tích cực. Đầu tiên là những bình luận mà lập trình viên cần chấp nhận để thay đổi, và cuối cùng là những bình luận cảm ơn lập trình viên vì những dòng code tốt.
4. Tránh bình luận quá nhiều lần với cùng một nội dung

![](https://images.viblo.asia/75e2936f-f51c-41bb-b5d5-57f1811b7131.png)

Thay vì thế có thể viết

![](https://images.viblo.asia/3a6546e8-6388-4756-8c69-7c671f89332f.png)

Nếu comment nhiều, có thể sử dụng Github review để thay thế, và thông báo cho lập trình viên khi bạn đã hoàn thành.

![](https://images.viblo.asia/9acbdf00-00a2-461c-8fa5-7802e5e1b743.png)

5, Biết được khi nào cần có một cuộc thảo luận trực tiếp: Sau một loạt những comment tranh luận qua lại mà không có kết quả, hãy gửi một lời đề nghị thảo luận trực tiếp, nói chuyện trực tiếp sẽ giúp đưa ra giải pháp giải quyết vấn đề nhanh và dễ hơn.

**Cuối cùng, một số câu hỏi dưới đây sẽ là công cụ rất tốt giúp bạn cải thiện quá trình review của mình:**

* Tôi có gặp khó khăn trong việc hiểu code này không?
* Có phần nào quá phức tạp cần refactor lại không?
* Code này đã được sắp xếp hợp lý trong cấu trúc thư mục chưa?
* Class name có trực quan và có đúng với chức năng không?
* Có class nào quá lớn không?
* Có phương thức nào quá dài không?
* Các tên phương thức có rõ ràng và trực quan không?
* Đã viết đủ document cho các phần code cần chưa (như viết doc cho API chẳng hạn)?
* Code đã được test kỹ chưa?
* Có cách nào làm cho code trở nên hiệu quả hơn không?
* Code có đúng với quy chuẩn của team không?

Có khá nhiều thói quen khác nhau và hiệu quả dựa trên nhu cầu của team. Vì thế đây cũng chỉ là ý kiến cá nhân thôi và có thể có những cách khác có hiệu quả hơn đối với team củ bạn. Hy vọng bài viết có thể giúp cho bạn hay team của bạn phần nào để xây dựng một quy trình review hiểu quả.

Nguồn: https://medium.com/free-code-camp/code-review-the-ultimate-guide-aa45c358bbf5