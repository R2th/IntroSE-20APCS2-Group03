Chúng ta cùng nhau overview về quy trình phát triển phần mềm Agile phải bao hồm vai trò testing. Và vai trò đó thường được gọi là QA. Chúng ta cùng tìm hiều nhé.

![](https://images.viblo.asia/1e54f57b-6b8f-471f-ac57-6582e4c42069.jpg)
# 1. Bắt đầu dự án (Kick off)
![](https://images.viblo.asia/f9d30bad-b820-45d2-95f4-e5f2c498c6d1.png)
- Đây là một cuộc họp với tất cả mọi người tham gia vào dự án. Bao gồm người quản lý dự án, chủ sở hữu sản phẩm (product owner), developer, architect và QA,... 
- Mục tiêu là để cho mọi người không chỉ cùng hiểu chung một ý tưởng những gì họ dự định làm mà còn tại sao phải làm ra sản phẩm đó. Việc cùng nhau tìm hiểu các mục tiêu của dự án (goals) để đưa ra các phân tích hệ thống đúng đắn là rất cần thiết. Điều này rất quan trọng đối với một người nào đó trong vai trò là QA để hiểu các mục tiêu dự án để có được ý tưởng tốt hơn về nâng cao chất lượng của dự án. 
- Sau đó, họ có thể làm việc với team của mình để giúp tạo ra test scenarios hay test cases nơi mà các issue có thể xảy ra.
- Nếu đây là một dự án đang trong giai đoạn bắt đầu, sẽ rất có lợi khi tổ chức các cuộc họp thường xuyên với mục đích liên kết với các yêu cầu và cập nhật cho mọi người khi business thay đổi để đáp ứng với những thay đổi của thị trường.
# 2. Definition of Done (DoD)
Điều quan trọng đối với các team là xác định ý nghĩa của User Story trước khi họ thực sự bắt đầu làm việc. Tuy nhiên, một DoD có thể được cập nhật lại nếu team quyết định nó là cần thiết. DoD có thể bao gồm những thứ như:

- Tất cả các Merge Request được hai developer chấp thuận trước khi deploy lên môi trường testing
- Tất cả unit test phải pass
- Tất cả acceptance Criteria phải đáp ứng
- Tất cả functional Tests phải pass
- Các bug liên quan đã được sửa (trừ khi được xác định bởi PO)
- PO chấp nhận tất cả các User Story

![](https://images.viblo.asia/573066e4-360c-42a2-b06e-18f5e2cf8290.png)

Có nhiều phiên bản khác nhau của DoD nhưng điều tôi thấy cực kỳ quan trọng là User Story có thể được coi là hoàn thành trừ khi nó đã được test và bất kỳ bug nào đã được phát hiện đều phải xử lý. Việc team đã đồng ý với DoD bao gồm testing và fix bug có nghĩa là team đã chấp nhận trách nhiệm chung để tạo ra một sản phẩm chất lượng. 
# 3. Sprint Planning
![](https://images.viblo.asia/2cebb703-a311-4804-b5f3-2d98841b76d6.jpg)
- Đây là một buổi họp cho một team và có thể rất khó khăn cho vai trò QA. Do DoD bao gồm testing, điều này rất quan trọng đối với hoạt động testing để estimate cụ thể User Story. Điều đó có nghĩa là QA cần phải là một phần của cuộc cuộc họp. Họ cần đặt câu hỏi về các acceptance criteria và đưa ra phản hồi nếu có gì đó không thể test được hoặc có vẻ không đúng dựa trên business của sản phẩm. 
- Các developer có xu hướng thảo luận về những khó khăn khi thực hiện một phần chức năng và đó là điều quan trọng cần phải biết. Nếu một developer lo lắng về vẫn đề nào đó thì QA nên ghi chú lại để nói chuyện với developer đó sau cuộc họp để hiểu lý do tại sao. Điều này có thể có nghĩa là cần nhiều test case hơn hoặc họ nên hợp tác với developer sớm hơn trong quy trình làm việc để trợ giúp. 
- Một số thứ dễ viết code nhưng khó test và ngược lại. Điều quan trọng là team phải biết nhận định mức độ khó mà không làm hỏng cuộc họp. Để tạo ra sự cân bằng đó rất khó khăn. Cũng có thể khó lên tiếng nếu tester cảm thấy User Story không bao gồm đủ thời gian testing. Tuy nhiên, không lên tiếng có nghĩa là sau khi bắt tay vào thực hiện sẽ thiếu thời gian. Team không estimate được effort dành cho testing là các team sẽ gặp khó khắn và có thể không hoàn thành được các User Story dẫn đến không hoàn thành được spring goal. 
- Các team tham gia Story có kích thước khác nhau trong một Sprint để tránh loạng choạng khi User Story được chuyển đến QA hoặc PO. Điều này giúp giảm bớt việc thắt cổ chai trong Sprint khi tất cả các User Story cần được release và chấp nhận vào ngày trước khi Sprint kết thúc.
# 4. Trong Sprint
![](https://images.viblo.asia/e83367af-d1a8-4158-a5a0-a9cca025216d.png)
Một phần của việc làm việc theo nhóm là tất cả mọi người sử dụng cùng một tool với tất cả thông tin nằm cùng một nơi. Thông thường là một tool như Jira nhưng cũng có nhiều tool tương tự. Nó rất hữu ích cho các team sử dụng tool online để theo dõi trạng thái của từng User Story. Thường thì sẽ có ít nhất ba cột như thế này:

**To Do | In Progress | Done.**

Tuy nhiên, ba cột như trên vẫn chưa thể hiện đầy đủ các trạng thái. Vì vậy tôi đã sửa đổi thêm các cột vào để các trạng thái rõ ràng hơn. Nó sẽ trông như thế này:

**To Do | In Development | In Testing | Tested & Open Issues | Done | Accepted**

* To Do = Những User Story đang trong sprint nhưng chưa được bắt đầu
* In Development = User Story đang trong được thực hiện
* In Testing = User Story đang được test
* Tested & Open Issues = User Story đã được test nhưng có bug
* Done = User Story đã được test và tất cả các lỗi đã ưu tiên xử lý
* Accepted = User Story đã được chấp nhận bởi PO và sẵn sàng deploy lên Production

# 5. Những ngày đầu tiên trong một Sprint
Có thể dễ dàng nghĩ rằng bắt đầu sprint là thời gian nhẹ nhàng cho các vai trò QA vì không có User Story hoàn chỉnh để kiểm tra. Tuy nhiên, có khá nhiều hoạt động mà vai trò này có thể đảm nhận.
### 5.1 Story Kick Offs (Ba Amigos)
Quá trình này nằm trong danh sách Todo của tôi để list ra cụ thể hơn. Tuy nhiên, một phiên bản nhanh là trước khi develop bắt đầu làm việc với User Story, họ nhanh chóng trò chuyện với PO và QA. Cuộc trò chuyện dài tầm 5 phút để xem xét các acceptance criteria cũng như thảo luận chi tiết hơn về User Story đó sẽ được test như thế nào. User Story có thể được cập nhật dựa trên cuộc trò chuyện này. Developer cũng sẽ có một ý tưởng rõ ràng hơn về những test case nào có thể sẽ được thực hiện để có nhiều khả năng đảm bảo những test case đó sẽ pass trước khi chuyển nó sang QA để testing.
### 5.2 Đánh giá design
Các nhà thiết kế trải nghiệm trực quan và người dùng có thể có các cuộc họp trong đó họ thảo luận về các thiết kế trong tương lai và thu hút phản hồi. QA có thể hữu ích khi tham dự các cuộc họp đó để cảm nhận về việc sản phẩm đang phát triển như thế nào. Họ thậm chí có thể cung cấp một số phản hồi dựa trên trải nghiệm sản phẩm để ngăn chặn các sự cố về tính năng trong tương lai.
### 5.3 Targeted Manual Regression
Một danh sách được tạo và cập nhật với các khu vực hoặc phần chức năng. Bắt đầu của sprint là thời điểm tốt để thực hiện một số testing ở những khu vực ít quan trọng hơn mà QA có thể không có thời gian ở cuối giai đoạn sprint. (Cập nhật: Dưới đây là chi tiết hơn về quy trình này.)
### 5.4 Chuẩn bị testing
Một số User Story có thể yêu cầu một số thiết lập hoặc thậm chí một số tài liệu. Tester nên xem qua tất cả các User Story trong Sprint và đảm bảo chúng có đủ những gì cần sau khi quá trình phát triển hoàn tất.
### 5.5 Cập nhật automation test
Đây có thể là cập nhật script hoặc tạo script mới. Nó cũng có thể bao gồm xem xét các lần chạy và hành vi khi bị thất bại.
## 6. Testing Stories
- Khi một User Story đã được gán cho QA, họ có thể bắt đầu bằng cách đảm bảo Acceptance Criteria đã được đáp ứng. Làm thế nào để hoàn thành thì tùy thuộc vào từng tester. Tại thời điểm này, họ hiểu rõ về business và đã xem xét User Story với PO cũng như developer. Họ nên có thông tin họ cần để test có hiệu quả. Tuy nhiên, quá trình test không bao giờ chỉ nên tập trung vào Acceptance Criteria. Thăm dò là điều cần thiết và team nên hiểu rằng các vấn đề không được nêu rõ ràng trong User Story có thể được báo cáo. Đối với một số vấn đề, có thể hữu ích khi thảo luận với developer hoặc PO trước khi thực sự tìm ra một lỗi. Nó có thể không phải là một vấn đề gì cả và do đó, không cần phải ghi chép lại. Ngoài ra, vấn đề có thể nhỏ đến mức có thể khắc phục và kiểm tra tại chỗ.
- Mục tiêu cho QA không nên là tìm và viết càng nhiều lỗi càng tốt. Mục tiêu nên là cung cấp feedback về business nhanh và tập trung vào sản phẩm đang được test. Lỗi chỉ là một cách để cung cấp thông tin feedback đó. Ghi lại các quyết định được đưa ra trong các cuộc hội thoại là hữu ích để làm cho rõ ràng khi toàn bộ nhóm hiểu những gì đã được quyết định. Nhận xét trên User Story có thể hữu ích như tìm ra bug trong một số trường hợp.
- Nếu lỗi được tìm thấy và ghi lại, chúng nên được liên kết với User Story theo một cách nào đó. Nó rất hữu ích khi nghĩ về User Story với tư cách là parent của các lỗi, comment và sub task. Điều này cho phép team xem lại User Story và xem mọi thứ liên quan đến User Story.
- Nếu không có vấn đề gì được tìm thấy, họ có thể được chỉ định cho PO để chấp nhận. Bất kỳ lỗi nào được ghi lại phải được chỉ định cho developer đã làm việc trên User Story đó. Sau khi sửa xong, chúng được gán lại cho người định nghĩa bug. Sau khi được xử lý và gán lại cho QA, họ sẽ đảm bảo bug đã fix và đóng nó nếu có thể. Bug không nên được mở lại nhiều lần. Một developer và tester nên làm việc cùng nhau để giải quyết các bug khó khăn hơn đẩy qua đẩy lại bug.

# Tham khảo
> https://www.testingexcellence.com/agile-testing-mindset-tester-role-agile-team/

> [The Testing Role in Agile — An Overview](https://medium.com/@Squidish_QA/the-testing-role-in-agile-an-overview-714912fa7728)

> https://www.amarinfotech.com/roles-responsibilities-agile-tester.html