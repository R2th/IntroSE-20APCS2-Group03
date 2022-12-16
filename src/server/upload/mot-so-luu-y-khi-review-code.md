# Động lực để review
Thực hiện code review là để cài thiện chất lượng code và tăng cường thêm các hiệu ứng tích cực đối với văn hóa nhóm và công ty. Ví dụ:

* **Tạo động lực cho người sửa đổi** rằng sẽ luôn có người xem xét phần code của bạn nên họ sẽ chủ động trong việc: clean code, bổ sung các phần TODO, performance ....
* **Chia sẻ kiến thức** giúp các nhóm phát triển theo nhiều cách:
- Truyền đạt rõ ràng chức năng được thêm / thay đổi / loại bỏ cho các thành viên trong nhóm, người sau đó có thể xây dựng dựa trên công việc đã hoàn thành.
- Học hỏi lẫn nhau giữa người làm và người review thông qua các phần thay đổi. 
- Cùng nhau cải thiện mã code để hướng tới mực tiêu chung là chất lượng dự án tốt
- Tăng sự tương tác và giao tiếp giữa các thành viên trong nhóm

* **Tính nhất quán** giữa các thành viên trong nhóm sẽ có chung một cách đọc và hiểu, giúp ngăn ngữa lỗi và tạo điều kiện cho người phát triển sau này có thể nhanh chóng thích nghi với thay đổi.
* **Tính dễ đọc** của các đoạn code khó đánh giá đối với tác giả và người đánh giá khi không có bối cảnh đầy đủ. Mã dễ đọc có thể tái sử dụng nhiều hơn, không có lỗi và không bị lỗi trong tương lai.
* **Lỗi ngẫu nhiên** (ví dụ: lỗi chính tả) cũng như lỗi cấu trúc (ví dụ: mã chết, lỗi logic hoặc thuật toán, mối quan tâm về hiệu suất hoặc kiến trúc) thường dễ dàng phát hiện hơn đối với người đánh giá. 
* **Tuân thủ**. Code review là một cách tuyệt vời để tránh các lỗi bảo mật phổ biến. 

# Review cái gì?
Không có câu trả lời chính xác cho câu hỏi này. Điều này sẽ phụ thuộc vào cách tiếp cận riêng của từng nhóm phát triển. Một số nhóm sẽ xem xét mọi thay đổi với nhánh chính, trong khi nhóm khác sẽ bỏ qua đối với những thay đổi nhỏ. Ở đây thường thì chúng ta sẽ quan tâm tới việc thời gian sử dụng hiệu quả các kỹ sư (tác giả và người review) và duy trì chất lượng code.  Trong một số trường hợp nhất định, chúng ta cần quan tâm tới cả những thay đổi nhỏ nhất.

Đặc biệt cần lưu ý rằng code review không nên có ngoại lệ. Cho dù bạn có là senior trong nhóm thì code của bạn vẫn cần được review. Điều đó cũng tạo điều kiện cho những người khác có thể học hỏi từ bạn, giảm thiểu những lỗi bất ngờ có thể xảy ra và tăng thêm sự đa dạng hóa sự hiểu biết về code.

# Khi nào review?
Việc review sẽ diễn ra sau khi những kiểm tra tự động (CI) đã hoàn thành thành công, nhưng trước khi merge vào nhánh làm việc chính. 

Đối với những thay đổi phức tạp, có thể tham khảo việc là sẽ tạo một nhánh riêng để làm tính năng lớn và kèm theo các nhánh phụ (để xử lí 1 phần nhỏ trong tính năng lớn) sau đó thực hiện review trên các nhánh phụ. Khi mọi thứ xong xuôi sẽ tạo merge nhánh lớn với nhánh làm việc chính.

# Cần chuẩn bị những gì để hỗ trợ người review?
Người cần được review nên xem xét tới các yếu tốt sau để không lãng phí thời gian và động lực của người đánh giá:

* **Scope và size**: Các thay đổi nên có phạm vi hẹp, được xác định rõ ràng, đọc lập. Việc review một pull request dài thường mất rất nhiều thời gian và giảm sự hưng phấn của người đánh giá. 
* **Self review**: chủ động review các lỗi cơ bản như cú pháp, chính tả để tiết kiệm thời gian cho người đánh giá. Hãy chắc chắn rằng mỗi PR của bạn đều đã pass qua CI trước khi gửi
* **Refactoring changes** không nên thay đổi hành vi; ngược lại, một thay đổi thay đổi hành vi nên tránh tái cấu trúc và thay đổi định dạng mã. Có nhiều lý do tốt cho việc này:
- Tái cấu trúc các thay đổi thường phải sửa trên nhiều dòng và file, do đó sẽ được xem xét mà ít chú ý hơn. Thay đổi hành vi ngoài ý muốn có thể gây lỗi mà không ai nhận thấy.
- Thay đổi tái cấu trúc lớn phá vỡ cherry-picking, rebasing .... Rất khó để hoàn tác một thay đổi hành vi đã được commit.
- Thời gian review nên tập trung để review logic hơn là các kiểu tranh luận, cú pháp hoặc định dạng. Bạn có thể tích hợp những công cụ tự động Rubocop, ESLint ...

# Nội dung commit
Việc này sẽ tùy theo yêu cầu của từng team. Làm sao để thuận lời nhất cho người review có thể nắm được những thay đổi là gì, thay đổi như thế nào - một cách ngắn gọn. 

# Tìm kiếm người review
Thông thường, project leader hoặc một senior sẽ chịu trách nhiệm chính trong việc review. Ngoài ra giữa các thành viên trong nhóm có thể chủ động thực hiện việc review để nắm được các phần khác nhau trong dự án. Tuy nhiên cũng nên lưu ý rằng việc này đôi khi có thể không hiệu quả hoặc thậm chí phản tác dụng khi mỗi người sẽ có một cách nhìn khác nhau và dễ dàng xảy ra những mâu thuẫn trong việc review. Tùy theo tính hình dự án cũng như các trường hợp thì project leader nên sắp xếp việc review sao cho hợp lý. 
# Review code
Việc review là một điểm đồng bộ hóa giữa các thành viên nhóm khác nhau và có  thể gây ra sự ùn tắc về tiến độ. Nếu bạn không nghĩ rằng bạn có thể hoàn thành đánh giá kịp thời, vui lòng cho người đi làm biết ngay để họ có thể tìm người khác. Bên cạnh đó trong thời gian chờ review bạn cũng nên chủ động trong việc xử lí các task khác để tránh việc bị ách tắc. 

Review phải đủ kỹ lưỡng để người đánh giá có thể giải thích sự thay đổi ở mức độ chi tiết hợp lý cho một developer khác. Điều này đảm bảo rằng code được biết đến nhiều hơn một người.

Là một người review, bạn có trách nhiệm đảm bảo các tiêu chuẩn và duy trì chất lượng code. Đó là cả một nghệ thuật. Cách duy nhất là thực hành; một người review có kinh nghiệm nên xem xét đưa những người review ít kinh nghiệm khác vào những thay đổi của họ và để họ thực hiện review trước. 

Dưới đây là một số mục mà người review cần lưu ý: 

## Mục đích
* **Liệu mã này có hoàn thành mục đích của tác giả không?** Mỗi thay đổi cần có một lý do cụ thể (tính năng mới, cấu trúc lại, sửa lỗi, v.v.). Liệu mã được gửi thực sự hoàn thành mục đích này?
* **Đặt câu hỏi.** Function và class nên tồn tại vì một lý do. Khi có gì đó không rõ ràng, đây có thể là một dấu hiệu cho thấy code cần phải được viết lại hoặc bổ sung thêm comment hoặc test

## Thực hiện
* **Hãy suy nghĩ về cách bạn sẽ giải quyết vấn đề.** Nếu nó khác nhau, tại sao vậy? Mã của bạn xử lý nhiều trường hợp? Là nó ngắn hơn / dễ dàng hơn / sạch hơn / nhanh hơn / an toàn hơn nhưng chức năng tương đương? 
* **Bạn có thấy những chỗ cần phải trừu tượng hóa?** Mã trùng lặp một phần thường chỉ ra rằng một phần chức năng cần trừu tượng hóa hoặc chung hơn để có thể tái sự dụng trong bối cảnh khác nhau.
* **Hãy suy nghĩ về các thư viện hoặc code hiện có.** Khi ai đó thực hiện lại chức năng hiện có, có thể không biết rằng nó đã tồn tại hoặc được copy theo mục đích (ví dụ: để tránh phụ thuộc). Trong những trường hợp như vậy, người review cần làm rõ ý định và nhắc nhở lại về việc đã có chức năng hoặc thư viện tương tự xử lí rồi. 
* **Sự thay đổi có tuân theo pattern không?** Hãy đảm bảo rằng tất cả mọi thay đổi đều được tuân theo những pattern mà nhóm của bạn thống nhất. 
* **Sự thay đổi có thêm phụ thuộc thời gian biên dịch hoặc thời gian chạy (đặc biệt là giữa các dự án con) không?** Chúng tôi muốn giữ cho các sản phẩm của chúng tôi liên kết lỏng lẻo, với càng ít phụ thuộc càng tốt. Thay đổi phụ thuộc và hệ thống xây dựng nên được xem xét kỹ lưỡng.

## Tính dễ đọc và phong cách 
* **Hãy suy nghĩ về kinh nghiệm đọc của bạn.** Bạn đã nắm bắt các khái niệm trong một khoảng thời gian hợp lý? Là tên biến và phương thức dễ theo dõi? Bạn có thể theo dõi qua nhiều file hoặc chức năng không? Bạn đã đặt ra bằng cách đặt tên không nhất quán?
* **Code có tuân thủ các coding guidelines và code style không?** Code có phù hợp với dự án về style, API conventions, v.v. không? Như đã đề cập ở trên, chúng ta nên giải quyết các cuộc tranh luận về style bằng công cụ tự động.
* **Code này có TODO không?** TODO chỉ chồng chất code và trở nên cũ kỹ theo thời gian. Yêu cầu tác giả gửi một ticket về các vấn đề GitHub hoặc JIRA và đính kèm số vấn đề vào TODO. 

## Bảo trì
* **Đọc kĩ test.** Nếu thiếu, nên yêu cầu tác giả phải thực hiện một cách đầy đủ. Rất ít chức năng không thể test được - trường hợp đó hãy suy nghĩ lại về code của bạn viết, có thể nó thực sự có vấn đề. 
* **PR này có gây rủi ro cho test, CI không?** Chúng thường không được kiểm tra như là một phần của kiểm tra pre-commit/merge, nhưng việc chúng bị lỗi là điều không được chấp nhận. 
* **Liệu sự thay đổi này phá vỡ khả năng tương thích ngược?** Nếu vậy, bạn có thể hợp nhất thay đổi vào thời điểm này hay nên đẩy nó vào lần release sau?
* **Code này có cần integration tests không?** Đôi khi, code không thể được kiểm tra đầy đủ với chỉ unit tests, đặc biệt nếu có tương tác với các hệ thống hoặc cấu hình bên ngoài.
* **Để lại comment, tài liệu và commit message.** Hãy chú ý việc để lại những comment một cách cẩn thận. Nó có thể làm rối thêm cho code của bạn nhưng cũng sẽ mang lại những lợi ích đang kể khi có những comment xuất sắc.
* **Đã cập nhật lại document chưa?** Nếu dự án của bạn duy trì README, CHANGELOG hoặc tài liệu khác, nó có được cập nhật để phản ánh các thay đổi không? Tài liệu lỗi thời có thể gây nhầm lẫn hơn không, và sẽ tốn kém hơn để sửa nó trong tương lai hơn là cập nhật nó ngay bây giờ.

Đặc biệt, đững ngại gì mà không đưa ra những lời khen cho những đoạn code ngắn gọn, dễ đọc, hiệu quả. Ngược lại thì hãy từ chỗi những thay đổi dư thừa hoặc không liên quan, lưu ý là cần kèm theo một lời giải thích cụ thể. 

Hãy tôn trọng những người được đánh giá. Có thể sẽ xuất hiện những mâu thuẫn, nhưng đừng luôn cho là mình đúng. Nếu bạn không thể thỏa thuận được với tác giả thì nên lấy ý kiến từ một bên thứ 3. Đó có  thể là một cơ hội để bạn nhìn lại và học hỏi những điều khác biệt. 

## Bảo mật
Hãy chắc chắn những thông tin như API endpoint, token xác thực với bên thứ 3 hoặc các cấu hình đặc biệt ... không tồn tại trong PR. 

## Bình luận: súc tích, thân thiện, hành động
Đánh giá nên được súc tích và viết bằng ngôn ngữ trung tính. Phê bình code, không phải tác giả. Khi một cái gì đó không rõ ràng,  hãy hỏi tác giả để làm rõ. 

Tránh các đại từ sở hữu, đặc biệt là kết hợp với các đánh giá: *"Mã của tôi đã hoạt động trước khi thay đổi của bạn"*, *Phần thay đổi của bạn có một lỗi*, v.v. Tránh các phán đoán tuyệt đối: *"Lỗi này không bao giờ có thể làm việc, kết quả luôn luôn sai."*

Cố gắng phân biệt giữa các đề xuất, các thay đổi bắt buộc và các điểm cần thảo luận hoặc làm rõ.

Hãy cố gắng thể hiện thiện chí trong việc review là mang tích xây dựng chứ không phải là phê phán, để tạo sự thoải mái giữa người review và tác giả. 

## Trả lời review
Một phần của mục đích review code là cải thiện yêu cầu thay đổi của tác giả; do đó, hãy tôn trọng những gợi ý của người review và thực hiện chúng một cách nghiêm túc ngay cả khi bạn không đồng ý. Trả lời mọi bình luận, ngay cả khi đó chỉ là một cách đơn giản, thực hiện một cách đơn giản, thực hiện một số quyết định, tại sao một số chức năng tồn tại, v.v. Nếu bạn không thể đi đến thỏa thuận với người review, hãy chuyển sang trao đổi trực tiếp hoặc tìm kiếm một ý kiến bên ngoài.

Các bản sửa lỗi nên được đẩy đến cùng một nhánh, nhưng trong một commit riêng. Squashing commit trong quá trình review làm cho người review khó theo dõi các thay đổi.

Bài viết được dịch từ [nguồn](https://medium.com/palantir/code-review-best-practices-19e02780015f) cảm ơn các bạn đã theo dõi.