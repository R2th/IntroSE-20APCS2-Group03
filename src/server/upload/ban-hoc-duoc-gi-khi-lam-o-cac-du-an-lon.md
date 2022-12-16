Trong quá trình làm việc tại công ty, mình cũng khá may mắn được join vào các dự án khác nhau, quy mô khác nhau. Với mỗi dự án đều cho mình những kiến thức, kinh nghiệm quý báu không chỉ là về mặt technic mà còn cả mindset, cách người ta quản lý team thế nào ....

Bài viết này là những kinh nghiệm mình đúc kết được, có thể có thiếu sót nhưng mong rằng ít ra nó sẽ mang lại điều gì đó cho mọi nguời, có thể là một cách nhìn tổng quát hơn khi tham gia vào dự án.

### 1. Quy trình

Nói đến quy trình thì chúng ta có thể nghĩ ngay đến: Quy trình quản lý ticket trên Redmine, quy trình review code, quy trình deploy, quy trình Q&A, ... Một dự án tốt là một dự án có quy trình rõ ràng, dễ hiểu để một người mới join vào cũng có thể nắm bắt và vận hành được ngay. Và tất nhiên, dự án nào cũng có những quy trình như thế, chỉ khác là cách xây dựng quy trình quản lý thì khác nhau. Tuy nhiên ở các dự án lớn thì bạn cần chú ý như sau:


- **Quy trình tạo ticket, update description càng chi tiết càng tốt:** Thường thì các dự án lớn đều có format chung để dev update vào description của ticket, trên đó ghi các thông tin chi đầy đủ của: pullrequest là gì?, nội dung sửa ra sao?, ảnh hưởng đến đâu?, đã deploy lên môi trường nào? Thời gian mất bao lâu, spec như thế nào .... Ngoài ra có thể note cả bằng chứng khách hàng yêu cầu bạn làm task đó ... Tin tôi đi, thời gian đầu việc update ticket này có vẻ nhàm chán vì bạn làm 1 task 1h nhưng phải update ticket mất 30p. Ấy thế mà sau khi update đầy đủ, về sau này bạn sẽ thấy nó hữu dụng thế nào.
- **Quy trình Q&A, cái gì không biết, không rõ ràng là hỏi:** Khi khách hàng đưa ra yêu cầu, dev bắt tay vào làm và thấy những vấn đề chưa được rõ ràng, hoặc phân vân giữa nhiều cách xử lý, mà mỗi cách thì đều có sự ảnh hưởng nhất định. Sau khi bàn bạc kỹ càng trong team mà chưa chốt được phương án thì sẽ note Q&A và để khách làm clear vấn đề này. Đương nhiên chúng ta ko thể hỏi những câu đại loại như: Task này làm thế nào? mà hãy đưa ra vấn đề và phương án mình định giải quyết xem họ có đồng ý hay là muốn xử lý theo cách khác. Việc Q&A ko chỉ clear spec hơn mà còn là bằng chứng sau này (Một ngày đẹp trời khách hỏi "ơ sao mày lại làm thế, tao đâu có muốn vậy", thì Q&A là cách trả lời của bạn). Không những thế Q&A còn thể hiện cách nhìn của dev đối với task được giao, và những người khác có thể hiểu họ định làm gì với task đó.
- **Quy trình deploy, ai được quyền deploy, và deploy như thế nào:** Trong một dự án lớn thì leader có thể phân chia quyền deploy cho một vài member khác trong team, nhưng nhất định là phải có một quy trình deploy rõ ràng, ví dụ có nhiều server, mỗi server deploy các chức năng khác nhau thì phải có quy trình quản lý. Nếu không thì chức năng này deploy lên server khác thì bạn tưởng tượng được hậu quả rồi đấy =))
- Ngoài ra những chú ý trên thì uy trình update tiến độ dự án, pullrequest ra làm sao thì tùy từng dự án sẽ có cách update khác nhau, nhìn chung là những chú ý khi chúng ta thực hiện.

### 2. Quản lý cơ sở dữ liệu

Tôi nhớ rằng, khi được giao một task làm về một chức năng trong dự án có liên quan đến việc tạo một vài table mới, mặc dù task cũng khá gấp nhưng team leader của tôi vẫn bảo tôi phải vẽ những table đó ra, note lại validate rồi đưa cho moi người trong team review.

Khác hẳn với những dự án nhỏ nhỏ trước đó tôi làm, nhận task, tự nghĩ table, và hùng hục create, validate trong model các thứ các thứ. 

Đây là một cách khá hay mà tôi học được, khi mọi người review bản thiết kế database, mọi người trong team đều hiểu những table trong DB ảnh hưởng đến nhau như thế nào, validate ra làm sao, có thiếu sót gì cần bổ sung không. 

Dù tạo 1 table hay nhiều tables, là nhỏ hay lớn thì việc làm trên giúp cho cả team có sự thống nhất về cách đặt tên, hiểu được mối liên kết trong DB, và đương nhiên bug về validate sẽ giảm rồi.

**Bài học rút ra:** Xây dựng database không nên vội vàng, dựng được gốc tốt thì phát triển về sau sẽ dễ dàng hơn. Việc quản lý database tốt cho thấy việc tầm nhìn về hệ thống tốt, định hướng được khả năng mở rộng của hệ thống như thế nào.

### 3. Quản lý change request
Bạn đã từng gặp, deadline thì sát rồi mà khách hàng lại muốn thay đổi change request hay chưa? Đấy là việc hết sức bình thường, nhưng đến đây mình đánh giá cao người quản lý dự án. Họ bình tĩnh phân tích, dựa vào sự ảnh hưởng của việc change request này để đưa ra schedule.

Mọi việc đánh giá đều dựa vào con số thực tế, ko dựa vào tâm lý chiều lòng khách hàng để cắm đầu làm theo yêu cầu của khách. Gây nguy hiểm cho việc đảm bảo tiến độ cũng như ảnh hưởng uy tín bản thân và cho cả đội dev.

### 4. Thái độ và Trình độ

Trong một dự án lớn thì đương nhiên rồi, sẽ có người này người kia. Có người trình độ tốt nhưng thái độ làm việc lại chưa tốt (đi muộn, về sớm, hay nghỉ đột xuất ...) Có những người thì trình độ ko tốt lắm nhưng rất chăm chỉ, thường ở lại muộn hơn để hoàn thành task được giao ... Nhìn chung  có thể đầu ra công việc giữa 2 người này có thể là như nhau, nhưng việc quản lý ông thứ nhất có vẻ khá là đau đầu.

Cũng không thể đánh giá việc người nào hơn người nào, bởi vì nếu một team toàn người chăm chỉ nhưng mindset không tốt thì cũng khó lòng hoàn thành dự án đúng hạn, và ngược lại. Bởi vậy, việc quản lý và phân chia công việc của người quản lý là vô cùng quan trọng, không những thế cũng phải seminar động viên, chỉ ra mặt mạnh yếu của từng người để cùng phải khắc phục, .... 

Đây cũng là một câu chuyện dài và cũng là bài học khó nhất vì liên quan nhiều hơn đến khả năng communicate, động viên, khen chê đúng lúc của Team Leader. Tùy theo tính cách từng người sẽ có cách giải quyết khác nhau, nhưng mục tiêu chung thì đều muốn tất cả member cùng tiến bộ.

### 5. Kết luận

Trên đây là kinh nghiệm của bạn thân đúc kết được trong quá trình học hỏi những người quản lý của các dự án lớn. Có thể còn nhiều thiếu sót, hi vọng bạn đọc sẽ bổ sung thêm để bản thân mình có thêm những bài học quý báu.