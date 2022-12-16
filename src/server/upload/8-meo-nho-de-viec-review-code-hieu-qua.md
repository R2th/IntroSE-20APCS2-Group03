Một trong những thứ mà chúng ta không được học ở trường đó chính là làm thế nào để review code một cách hiệu quả. Bạn có thể đã được học về thuật toán, cấu trúc dữ liệu, những khái niệm về ngôn ngữ lập trình nhưng không ai chỉ cho bạn làm thế nào để đưa ra những phản hồi, ý kiến đánh giá có chất lượng.

Việc review code là một quá trình quan trọng để tạo nên các phần mềm tốt. Những đoạn code được review thường có ít bug và chất lượng cao hơn. Một lợi ích khác của review code hiệu quả là giới hạn bus factor (một khái niệm về số lượng thành viên không thể thiếu trong một team) - điều này cực kỳ hữu ích trong việc đào tạo những thành viên mới. Review code cũng là cách tuyệt vời để chia sẻ kiến thức.

# Tình huống giả định

Trước khi đi vào nội dung chính của bài viết, các tình huống giả định được đưa ra như sau:

- Bạn làm việc trong một môi trường mà niềm tin là rất quan trọng hoặc bạn và team của bạn đang cố gắng để cải thiện độ tin tưởng của bạn.

- Bạn đang hoặc sẽ có thể đưa ra những phản hồi trong những ngữ cảnh khác ngoài lập trình.

- Team của bạn muốn tạo ra những đoạn code tốt hơn và hiểu rằng việc cải thiện này là liên tục. Chúng ta có thể tìm được những cách làm tốt hơn vào ngày hôm sau. Đồng thời chúng ta cũng cần một tư duy mở.

-  Công ty của bạn đánh giá cao những đoạn code có chất lượng nhưng cũng hiểu rằng chúng có thể không hoạt động tức thì như mong muốn. Bởi có nhiều trường hợp, ngay cả những đoạn code đã được test và review cũng có thể không hoạt động theo một cách nào đó.

Dưới đây sẽ là một vài quy tắc trong việc review code:

# 1. Tính nhân văn

Thấu hiểu người mà đã dành thời gian để viết những đoạn code mà bạn sẽ review. Họ cũng muốn những đoạn code này trở nên hoàn thiện. Đồng nghiệp của bạn đã làm hết sức mình và không ai muốn đưa ra những đoạn code tệ hại cả.

Có thể sẽ rất khó để duy trì được mục tiêu đề ra. Bạn phải luôn đảm bảo việc đánh giá tập trung vào code và hiểu ngữ cảnh mà đoạn code được viết ra. Cố gắng diễn tả càng nhiều càng tốt. Thay vì nói:

> Bạn viết hàm này khó hiểu quá.

Hãy thử nhấn mạnh vào bản thân đoạn code và cách hiểu của bạn về nó:

> Hàm này làm cho tôi hơi khó hiểu một chút. Liệu chúng ta có thể tìm được một tên biến phù hợp hơn được không?

Trong ví dụ này, chúng ta đang giải thích dưới góc độ cảm nhận của người đọc về đoạn code. Nó không phải về hành động và ý đồ của người viết. Mà là về chính chúng ta và cách nhìn nhận của chúng ta về đoạn code.

Mỗi Pull Request đều có điểm khúc mắc trong giao tiếp. Cố gắng hiểu và thông cảm với đồng đội của bạn và cùng nhau cải thiện những dòng code.

Nếu bạn chỉ mới quen về đồng đội của mình và có những phản hồi phê bình trên Pull Request, hãy thử review code cùng nhau. Điều này sẽ là cơ hội tốt để bắt đầu xây dựng một mối quan hệ với cộng sự của bạn. Thực hiện điều này với mỗi đồng nghiệp cho đến khi không còn cảm giác xa lạ.

# 2. Tự động hóa

Nếu việc áp dụng các quy tắc nào đó có thể làm tự động thì hãy để việc đó trở nên tự động hóa. Tranh luận về dấu space hay tab không phải là cách sử dụng thời gian hiểu quả. Thay vào đó, hãy dành thời gian để có được những thỏa thuận về những quy định nào sẽ được áp dụng. Đây là cơ hội để có thể thấy được team của bạn sẽ xử lý như thế nào với việc biểu quyết trong những trường hợp rủi ro thấp.

Các ngôn ngữ và công cụ ngày nay không thiếu những cách để áp dụng các quy tắc một cách liên tục. Với Ruby, có thể dùng Rubocop, Javascript thì có eslint. Tìm công cụ phù hợp với ngôn ngữ đang được sử dụng và triển khai nó trong luồng làm việc hiện tại. Nếu không có công cụ phù hợp, hãy thử tự viết công cụ của riêng mình.

# 3. Mọi người cùng review

Giả sử có một người tên là Shirley có trách nhiệm review code của tất cả mọi người. Shirley là một chuyên gia với khả năng luôn luôn biết điều gì là tối ưu nhất đối với những đoạn code. Cô ấy biết luồng vào và luồng ra của hệ thống và cũng là người có thâm niên nhất trong team.

Tuy nhiên, Shirley hiểu một vấn đề gì đó không đồng nghĩa với việc người khác trong team cũng có thể hiểu được. Những thành viên trẻ hơn có thể đang do dự để chỉ ra những điểm chưa hiểu về những lần review code của Shirley.

Việc để những thành viên khác nhau trong team cùng review sẽ giúp team trở nên linh động và code được cải thiện hơn. Một trong những cụm từ hữu ích khi một kỹ sư trẻ dùng trong một bài review code là "Tôi cảm thấy điều này khó hiểu". Đây chính là cơ hội để code trở nên rõ ràng và đơn giản hơn.

# 4. Dễ đọc

Một trong những điểm hay của Github là mọi thẻ `<textarea>` đều hỗ trợ Markdown. Đây là một cách đơn giản để thêm định dạng HTML vào những comment khi review code.

Sử dụng Markdown là cách hữu hiệu để mọi thứ trở nên dễ đọc hơn. Github hoặc bất cứ công cụ nào bạn chọn chắc chắn có những cú pháp bôi đen, giúp việc chèn các đoạn code vào comment một cách dễ dàng. Sử dụng dấu backtick đơn `` ` `` cho đoạn code inline và dấu backtick nhân ba ` ``` ` cho những block code để việc truyền tải ý tưởng được mạch lạc hơn.

Sử dụng cú pháp Markdown một cách thoải mái, đặc biệt khi viết code trong những đoạn commnet. Điều này sẽ giúp việc review trở nên cụ thể và tập trung hơn.

# 5. Để lại ít nhất một đánh dấu tích cực

Review code mặc định thường được hiểu là việc có tính tiêu cực. Kiểu như: "Hãy chỉ ra giúp tôi đoạn code này có gì không ổn không trước khi tôi gửi nó đi chỗ khác.". Đó là vấn đề cốt lõi việc review. Kỳ vọng cuối cùng là bạn sẽ chỉ ra những chỗ có thể được cải thiện tốt hơn.

Chính vì lẽ đó, hãy luôn để lại một đánh dấu tích cực. Khiến nó trở nên có ý nghĩa và mang tính cá nhân. Nếu ai đó đã hiểu được vấn đề họ đang gặp phải, hãy thể hiện sự tích cực đó. Có thể đơn giản chỉ là 👍 hoặc "Được đó ! "

Để lại một vài dấu hiệu tích cực trong mỗi lần review là cách nhắc nhở khéo rằng chúng ta làm việc này cùng nhau. Tất cả cùng có lợi nếu code được cải thiện.

# 6. Đưa ra những phương án thay thế

Cách này có thể áp dụng cho những người chỉ mới học một ngôn ngữ hay framework. Tuy nhiên nên cẩn thận với việc này. Nếu diễn tả không chính xác, nó có thể dẫn đến những quyết định chủ quan. Cố gắng giữ vững mục tiêu đề ra và bàn về những đánh đổi của phương án thay thể được đề xuất. Nếu thực hiện tốt, điều này sẽ giúp mở rộng kiến thức của mọi người chỉ trong những lần review.

# 7. Độ trì hoãn

Việc quay vòng review code một cách nhanh chóng là rất quan trọng. Điều này có thể được thực hiện theo quy tắc: Chia nhỏ để review.

Thời gian review lâu có thể làm mất đi tính năng suất và tinh thần làm việc. Việc để Pull Request được gán cho bạn review cách đây 3 ngày nghe khá chói tai. Để tránh việc trì hoãn quá lâu, bạn sẽ cần phải nhắc nhở team của mình rằng tiến độ được đo trên một team chứ không phải một cá nhân. Mọi người trong team nên quan tâm tới độ trễ của việc review và hoạt động nhóm tốt hơn.

Để giảm độ trễ của việc review code, quy tắc sau nên được áp dụng: Review code trước khi viết code mới.

Một chiến lược trong việc giảm thiểu độ trễ là ghép nối các lần review lại với nhau. Nắm bắt điểm chung hay gặp phải và thực hiện chia sẻ điều này với cả team. Kết hợp các giải pháp và chuyển code về trạng thái approved.

# 8. Đối với người gửi Pull Request: Chia nhỏ Pull Request

Chất lượng đánh giá mà bạn nhận được ở mỗi lần review code tỉ lệ nghịch với kích cỡ của Pull Request.

Để có được những phản hồi thỏa đáng và có tính xây dựng, Pull Request nên được chia nhỏ để việc review một cách dễ dàng.

Nếu bạn đang chia nhỏ Pull Request, thì cũng cần chú ý rằng nó phải có giá trị khác biệt trong những cuộc trao đổi ở bức tranh lớn hơn. Pull Request này có phù hợp với công việc của tuần này hoặc tháng này hay không? Chúng ta đang đi đến đâu và Pull Request này đưa chúng ta đến đó như thế nào? Những cuộc trao đổi trực tiếp và chéo nhau phù hợp cho những bàn luận kiểu như này. Pull Request càng nhỏ thì càng khó để nắm bắt ngữ cảnh mà nó được tạo ra.

Chữ "nhỏ" ở đây sẽ rất khác nhau ở mỗi ngôn ngữ và mỗi team. Pull request có thể dưới 300 dòng code hoặc dưới 15 files.

# Tổng kết

Bằng việc cải thiện quá trình review code, bạn sẽ viết code tốt hơn, có những cộng sự vui vẻ hơn, và công việc có thể sẽ thuận lợi hơn.
 
### ** Lược dịch **

**Kelly Sutton**, *8 Tips for Great Code Reviews*, [kellysutton.com](https://kellysutton.com/2018/10/08/8-tips-for-great-code-reviews.html)