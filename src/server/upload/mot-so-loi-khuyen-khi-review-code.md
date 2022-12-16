- Bài viết được lược dịch từ nguồn: https://blog.asana.com/2016/12/7-ways-to-uplevel-your-code-review-skills/#close

Để trở thành một người review code tốt là điều không dễ dàng, ngay cả khi bạn đã lập trình nhiều năm. Dưới đây là một vài thói quen tốt nhất mà có thể sẽ hỗ trợ bạn hiệu quả trong công việc này.

## 1. Đặt ra thứ tự ưu tiên khi review
Hãy dành thời gian để thảo luận với các thành viên trong nhóm về những mục tiêu cơ bản của việc review code. Nếu bạn đang cố gắng sử dụng quá trình này để tạo ra sự nhất quán trong phong cách viết code, nhưng những thành viên khác của team đang trông cậy vào bạn để phát hiện ra bug thì không ai trong nhóm sẽ nhận được lợi ích tối đa từ việc làm này. Nếu tất cả mọi người cùng nhất trí về mục đích của việc review, thời gian của mỗi người sẽ được sử dụng hiệu quả hơn.

Một số mục tiêu yêu thích của tôi khi review code:
- học cách suy nghĩ của đồng nghiệp, từ đó có thể theo dõi luồng chương trình và sửa đổi, bổ sung code dễ dàng hơn
- cập nhật kiến thức về việc các file và các chức năng gần đây đã có sự thay đổi như thế nào. Do đó khi bug xảy ra, ít nhất có 2 người (chính tôi và người đã thực hiện những thay đổi đó) có thể tìm hiểu và sửa chữa nó. Không nên để cho một người nào đó ở tình trạng "cô độc" một mình trong nhóm.

Một số mục đích mà tôi ít thích nhất của việc review code:
- tìm ra bug. Tôi cho rằng việc kiểm thử tự động và việc sử dụng ứng dụng là những cách tốt hơn để khám phá xem code sẽ thực sự hoạt động như thế nào.
- tuân thủ theo những nguyên tắc cơ bản. Trong trường hợp này, hãy để lại việc ấy cho máy tính, nó sẽ làm tốt hơn con người, không nên lãng phí thời gian của bạn và cả team như vậy. Thêm nữa, khi có nhiều comment không thực sự quan trọng và ít mang ý nghĩa tích cực thì có thể ảnh hưởng không tốt đến tinh thần đội nhóm, sự tin tưởng lẫn nhau giữa các thành viên.

## 2. Hãy "chơi đùa" với ứng dụng
Đọc code là một cách không thực sự tự nhiên để tương tác với nó. Việc tìm ra bug bằng việc chỉ đọc code cần nhiều năm để luyện tập, trải nghiệm.

Tin tốt lành ở đây là, khi chạy chương trình, bạn có thể thực hiện một vài thứ khác biệt nho nhỏ so với lúc người viết code kiểm tra lại những thay đổi mà họ đã tạo ra. Bạn có thể khám phá ra những tình huống, ca kiểm thử mà họ bỏ qua hoặc chưa nghĩ đến.

Đặt những breakpoint khi chương trình đang được thực thi cũng là một cách hiệu quả khi tìm hiểu về những dòng code có chu trình phức tạp. Với việc có 3 breakpoint như vậy, bạn có thể tiết kiệm khoảng nửa giờ đồng trong việc cố gắng hiểu xem những đoạn code ăn khớp với nhau như thế nào. Thêm nữa, nếu mã nguồn chương trình đang tuân theo một chu trình khác với những dự kiến của bạn, bạn có thể tìm ra bug hoặc học hỏi một vài điều quan trọng từ cách viết code này.

## 3. Trực quan hóa
Thường thì chúng ta khó có thể hiểu rõ về những chi tiết khi review code. Tôi cần có những thủ thuật, mẹo để bắt ép não bộ của mình hiểu và thẩm thấu nội dung của code sâu sắc hơn. Thỉnh thoảng việc vẽ ra hoặc trực quan hóa cách các method gọi đến nhau, hoặc object nào sử dụng object nào sẽ giúp ích và hiệu quả. Việc đọc đơn thuần thì không hiệu quả bằng cách lọc, trích chọn một vài thông tin trong trí nhớ của bạn và viết nó ra. Kỹ thuật này sẽ giúp bạn ghi nhớ tốt hơn đó, hãy thực hành và kiểm nghiệm nó nhé.

## 4. Khi có yêu cầu từ ai đó, hãy review code càng sớm càng tốt
Thậm chí nếu như khối lượng code cần review không nhỏ, cố gắng thực hiện việc này càng sớm càng tốt. Đồng nghiệp của bạn sẽ cảm thấy biết ơn bạn về điều này, và sự thiện chí hợp tác của họ sẽ giúp bạn tiến bộ nhanh hơn trong vai trò một người review.

Dĩ nhiên, đây không phải lúc nào cũng là việc dễ dàng, nhất là khi ai đó thay đổi rất nhiều code hoặc cần có thời gian tương đối lâu để chạy ứng dụng của bạn. Nếu bạn thấy mình đang trì hoãn trong việc review code, những mẹo và thủ thuật dưới đây có thể giúp bạn thực hiện nó hiệu quả hơn:
- đặt ra một giới hạn thời gian, ví dụ như nửa giờ đồng hồ. Trong nửa giờ đầu tiên, cố gắng hiểu những sự thay đổi đã được thực hiện và viết ra những câu hỏi. Nếu hết thời gian, bạn cho rằng mình có thể chấp nhận những thay đổi này, hãy thực hiện nó. Nếu bạn chưa sẵn sàng, hãy thảo luận với tác giả những câu hỏi, suy nghĩ mà bạn đã ghi chép lại. Tiếp tục đưa ra lịch trình và những cam kết về mặt thời gian rằng khi nào bạn có ý định review kỹ lưỡng hơn, chấp nhận hoặc yêu cầu có những thay đổi khác.
- lưu trữ 2 repo trong máy tính cá nhân của bạn, một cái là những thay đổi của bản thân bạn, một cái dành cho những thay đổi mà bạn đang review. Bằng cách này, những thay đổi thực hiện bởi đồng nghiệp của mỗi người sẽ không ảnh hưởng đến nhau.

## 5. Tưởng tượng mình là người thực hiện những thay đổi đó

![](https://images.viblo.asia/733a8f6c-21a4-4d42-b70f-0bf08ec8312e.jpg)

Đầu tiên, bạn hãy đọc những mô tả về chức năng, sau đó cố gắng đưa ra danh sách những file mà bạn kỳ vọng muốn thay đổi. Sau đó, review phần code mà đồng nghiệp đã thực sự làm. Nếu chúng khác với những gì bạn dự định, hãy tìm hiểu tại sao lại có sự khác nhau ấy. Một số file có thể tình cờ bị thay đổi, hoặc có thể là một dịp tốt để bạn học hỏi về code base. Hãy thử nghiệm cách làm này và tìm ra nhiều cách khác nhau để cùng thực hiện một chức năng.

## 6. Đọc về những thay đổi trong môi trường phát triển thực tế
Github chủ yếu được tối ưu cho việc quan sát những thay đổi về code. Những trình biên tập văn bản như `App Code`, `IntelliJ` và `RubyMine` được tối ưu cho việc trình bày code.

Lấy về máy cá nhân của bạn những sự thay đổi để bạn có thể tìm hiểu những lỗi biên dịch chương trình, những cảnh báo và những test bị sai. Cách làm này cũng giúp bạn có được những công cụ mà bạn thường sử dụng để tìm hiểu về code, ví dụ như những thao tác nhấn nút hoặc tìm kiếm code linh hoạt. Review toàn bộ file code, không chỉ giới hạn ở những chỗ diễn ra thay đổi sẽ giúp bạn phát hiện tốt hơn những đoạn code có liên quan có đang bị tách ra quá nhiều không, hoặc là cấu trúc tổng thể của file có dễ tiếp cận với những lập trình sau đó hay không.

## 7. Luôn luôn đưa ra những sự đồng thuận, trừ khi bạn có thể chứng tỏ rằng có bug xảy ra
Khi bạn đưa ra những gợi ý thay đổi, hãy dự kiến rằng tác giả có thể xử lý những đề xuất đó.

Nếu bạn cảm thấy không chắc chắn với việc đồng thuận, hãy nói ra với đồng đội và đưa ra kế hoạch để có thể có được người phù hợp cho việc review. Hãy giúp họ thấy được thiện chí của bạn bằng cách chỉ rõ ra những bước cụ thể tiếp theo cần thực hiện.

## Tài liệu tham khảo
- https://medium.com/@palantir/code-review-best-practices-19e02780015f
- https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/
- https://www.ibm.com/developerworks/rational/library/11-proven-practices-for-peer-review/
- https://nyu-cds.github.io/effective-code-reviews/02-best-practices/