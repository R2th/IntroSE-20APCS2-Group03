![](https://images.viblo.asia/21d2fcc6-849c-4a6c-9bcb-cac479a2ef68.png)

Hi các bạn, cũng lâu rồi mới ngoi lên đây viết vài dòng tâm sự chia sẻ chuyện đời, chuyện dev. Không biết bác nào giống mình không, càng già càng ngại viết lách :smiley: 

Đây ra seri bài viết xung quanh vấn đề review code, rất mong các bạn đón đọc. Nói là seri, nhưng cũng chẳng có thứ tự, hãy tận hưởng nhé

- Phần 1: Trách nhiệm đến từ hai phía (P1)
- Phần 2: Trách nhiệm đến từ hai phía (P2)


Tiếp theo phần trước, chúng ta tiếp tục bàn về trách nhiệm của PR author's

## Trách nhiệm của PR author’s
Như đã trình bày ở trên với các bạn, trách nhiệm đến từ 2 phía, vậy PR author's cần làm điều gì để giúp ích cho việc review code diễn ra thuận lợi hơn.
 
### Cần có một description tốt
=> Hãy đọc nội dung này ở phần 1 nhé :hand: 

### Các PR nhỏ thì tốt hơn
![small-code-review-please.jpg](https://images.viblo.asia/9b5c9b50-19f0-4889-a468-85674c2e9f07.jpg)

#### Tại sao PR cần nhỏ?
-  **Review sẽ nhanh hơn**: Reviewer sẽ dễ dàng dành 5, 10 phút review nếu PR nhỏ thì dễ hơn là 30 phút cho một PR lớn.
-  **Xem xét PR kĩ lưỡng hơn**: Với những thay đổi lớn, reviewer và authors thường sẽ có xu hướng cảm thấy nản vì các comment chi tiết chuyên qua chuyển lại. Đôi khi các điểm quan trọng sẽ bị bỏ sót
-  **Ít khả năng xảy ra bugs**: Vì bạn đang thực hiện ít thay đổi hơn, nên bạn và reviewer sẽ dễ dàng suy luận một cách hiệu quả về tác động của PR và xem liệu có thể xảy ra bugs hay không một cách tốt hơn.
-  **Đỡ tốn effort hơn nếu PR bị reject**: Nếu bạn tạo 1 PR lớn, sau đó bị reject vì đang sai hướng đi, sẽ rất tốn công sức để làm lại
-  **Dễ dàng merge hơn**: Làm việc trên một PR lớn tốn rất nhiều thời gian, vì vậy bạn sẽ có nhiều conflict khi merge code, và bạn sẽ phải fix conflict nhiều hơn.
-  **Không cần phải chờ đợi review quá lâu để có thể xử  lý tiếp**: Đôi lúc, 1 task của bạn rất lớn, và tách ra làm nhiều phần khác nhau. Bạn thử nghĩ xem, nếu phần PR bạn nhờ review to => tổn thời gian để chờ. Và bạn lại cần merge gấp để có thể start việc coding của mình. Quả thật là toanggg.
-  **Dễ dàng quay lại fix nếu có comments**: Đôi lúc, bạn đang code task 3, 4 mà cần phải quay lại để fix review của task 1. Nếu PR quá lớn, sẽ rất mất thời gian để bạn nắm lại spec cũng như check lại tính đúng đắn của PR.

Chú ý rằng, reviewer có quyền reject hoàn toàn PR của bạn vì lý do duy nhất là PR quá lớn. Thông thường, vì lịch sự, họ sẽ cảm ơn đóng góp của bạn, nhưng yêu cầu bạn bằng cách nào đó tách nó thành các PR nhỏ hơn. Đương nhiên, có thể nó sẽ tốn nhiều thời gian và công sức. Vậy nên tốt nhất là hãy tách các PR đủ nhỏ ngay từ đầu.

#### Thế nào là PR nhỏ
Nhìn chung, PR vừa đủ để tiện cho việc review thường là sẽ thực hiện một chức năng duy nhất, riêng biệt. Điều đó có nghĩa là:
- PR thực hiện một chức năng duy nhất. Đây thường chỉ là một phần của một task thay vì toàn bộ task đó. Nếu có thể, hãy làm việc với reviewer trước để có thể đi đến thống nhất.
- PR nên bao gồm cả UnitTest
- Mọi thứ mà reviewer cần để hiểu về PR của bạn như description, codebase hiện tại, hoặc các PR khác tương tự, ...
- Các PR cũng không nên quá nhỏ, khi đó nó sẽ rất khó hiểu. Nếu được, bạn hãy đính kèm documents để tiện cho việc review.

Thực sự thì không có quy tắc cố định nào quy định về việc một PR thế nào là đủ nhỏ. hoặc quá lớn. Nhưng có một vài số liệu chung như
- 100 lines change thường là kích thước hợp lý
- 1000 lines change thường là kích thước quá lớn.
- 200 lines change trong một file thường không sao, nhưng nếu có nhiều files như vậy thì sẽ là quá lớn.

#### Khi nào PR to có thể được chấp nhận
Trong một vài trường hợp, PR to có thể chấp nhận được như
- Bạn có thể coi rằng việc xóa files nào đó là 1 line change, vì thường thì reviewer sẽ không mất nhiều thời gian để xem xét chúng
- Đôi khi, bạn có các PR về việc refactoring code mà được xử lý tự động bằng 1 vài tools có thể tin tưởng được. Mặc dù là PR lớn, nhưng chúng ta có thể chấp nhận điều này, đương nhiên, cho dù vậy, chúng ta vẫn cần các bước y hệt 1 PR bình thường như testing.

#### Refactoring nên là 1 PR riêng biệt
Thông thường, chúng ta nên tách riêng PR cho việc xử lý spec mới, và refactoring nếu chúng đủ to để tách. Đừng nên quá cứng nhắc trong việc này. Ví du như các bước bỏ như sửa tên biến trong phạm vi nhỏ,  hay chính sửa logic cũ cần thiết để có thể đáp ứng được spec thì cũng không cần thiết phải tách ra. Đừng để việc refactoring ảnh hưởng tới tiến độ của task.

#### PR nên có đẩy đủ cả UnitTest
Hãy nhớ rằng, PR nhỏ ở đây có nghĩa là nên tập trung vào một hoặc vài chức năng liên quan được chấp thuận, chứ không phải chỉ là vài dòng thay đổi thì được gọi là nhỏ.

Hãy luôn bảo đảm rằng code của mình đã có UnitTest, cho dù đó là thay đổi nhỏ nhất.

#### Phải làm gì nếu không thể tách nhỏ PR?
Đôi khi bạn gặp phải một vài tính huống dẫn đễn việc PR bắt buộc phải lớn. Điều này rất hiếm khi xảy ra. Các developer hầu như luôn có thể tìm ra cách để tách nhỏ các PR

Trước khi xử lý một PR lớn. hãy xem xét đến việc refactoring trước có giúp cho việc triển khai PR tốt hơn không? Hoặc đơn giản hơn là nói chuyện trao đổi với reviewer hoặc đồng nghiệp của bạn để tìm giải pháp

Nếu tất cả những điều trên không thể thực hiện, thì ít nhất hãy thông báo cho reviewer của bạn để có được sự đồng ý từ họ, cũng như giúp cho họ chuẩn bị đễ review 1 PR lớn. Nếu điều này xảy ra, hãy hiểu rằng, PR của bạn sẽ được review trong một thời gian dài.

### Xử lý feedback, comments của reviewer
Đương nhiên, đã review thì thường sẽ có comment, mà đã có comment thì sẽ phải giải quyết. Dưới đây là một số điều hữu ích cần biết về việc xử lý comments của reviewer

#### Đừng coi việc review là công kích cá nhân.
![1_Ypd0z4OhOmegm-WHyGHgxg.jpeg](https://images.viblo.asia/c447afe8-996a-462e-a960-79ecd8ff1e9a.jpeg)
Nên nhớ rằng, mục tiêu của việc review code là làm cho codebase tốt lên. Khi reviewer review và đưa ra comments về code của bạn. Hãy hiểu rằng đó hoàn toàn là vấn đề công việc. Không có ý công kích cá nhân gì ở đây cả. Hãy hạ cái tôi của mình xuống, luôn đón nhận với tâm thế học hỏi.

**Đừng bao giờ trả lời, hay phản ứng review code một cách tức giận !
**

#### Fix the Code
Đương nhiên, phần lớn chúng ta đều phải fix comments code. Không ai tránh khỏi việc này. Nên hãy chắc chắn rằng
1. Đừng bao giờ lặp lại lỗi tương tự như vậy nữa.
2. Hãy cố gắng làm code của bạn dễ hiểu nhất đối với reviewer => Vì chúng ta cần hiểu rằng, code của chúng ta sẽ sử dụng lại vào thời điểm sau này bởi bất kì ai.
3. Hãy chắc chắn rằng mình chạy lại UnitTest, hay self-test, hoặc check lại PR ít nhất 1 lần trước khi gửi lại cho reviewer.
4. Hãy nhớ rằng, không phải tất cả các comment cần phải fix, hay kiểm chứng lại, hoặc hỏi lại reviewer của mình để cùng đưa ra hướng đi tốt nhất.


### Tổng kết
Qua bài viết này chúng ta rút ra được những điều gì?
1. Tách nhỏ các PR nếu có thể, tránh để PR quá to và nhờ người khác review.
2. Hãy mang tâm thế học hỏi, đừng coi việc comment code là công kích cá nhân.
3. Đừng trả lời comment trong khi tức giận.

Thực sự thì, việc review code là một cách tốt nhất để **học hỏi kinh nghiệm từ ai đó**. Bạn nên mang trong mình tâm thế học hỏi khi nhờ người khác review, và có comment lại, cho dù đó là người có level cao hơn hay thấp hơn mình.

Hãy chờ đón phần tiếp theo nhé. Nêu có bất kì thắc mắc gì cần giải đáp, hoặc góp ý cho mình, thì hãy comment ở dưới nhé. Cảm ơn các bạn đã đọc bài viết đến đây.
___
[@hoangpn - Better every day!](https://hoangpn.com)