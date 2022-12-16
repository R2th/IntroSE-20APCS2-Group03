Chúng ta đều biết Pair Programing ( xin được viết tắt là PP) là một trong những phương pháp lập trình của Extreme Programming (Agile). Vậy phương pháp này là gì ? Ưu nhược điểm của nó ra làm sao, có thể áp dụng vào mọi dự án lập trình hay không ? Hãy cùng tìm hiểu qua bài viết này.


**1. Pair Programing là gì ?**

Nó được định nghĩa là một phương pháp lập trình gồm 2 lập trình viên chia sẻ với nhau một không gian làm việc chung (chuột, bàn phím, màn hình, nội dung công việc ...). Nói đơn giản hơn là cả 2 người cùng sử dụng chung tài nguyên để cùng làm một công việc. Người sử dụng bàn phím được gọi là "driver", người còn lại cũng làm việc lập trình tuy nhiên quan tâm đến việc điều hướng hơn, người này được gọi là "navigator". Vai trò của 2 người này sẽ được hoán đổi liên tục cho nhau sau một khoảng thời gian nhất định (thường khoảng 30 phút ~ 1 giờ). Cả 2 người phải trao đổi với nhau ở mức độ cao nhất, để hướng tới việc giải quyết công việc môt cách hiệu quả, chất lượng cao, hạn chế sai sót cá nhân.

Tôi không thể phủ nhận thành quả mà PP mang lại nếu bạn triển khai nó thành công, thực sự chất lượng công việc được nâng cao đáng kể, hạn chết bug phát sinh và giữ được ổn định của tiến độ công việc trong team, 1 người trong pair có nghỉ thì cũng không phải là vấn đề lớn lắm. Và nó cũng là 1 phương pháp tuyệt vời để traning cho 1 thành viên mới, giúp họ bắt kịp với trình độ và thích nghi được với môi trường công việc mới nhanh nhất.
Tuy nhiên thực tế khi khi triển khai PP lại không hề đơn giản, nó có rất nhiều cạm bẫy dẫn ra đến thất bại, cụ thể:
- Cả 2 lập trình viên phải tích cự tham gia vào công việc, một người thao tác với máy tính thì người còn lại phải theo dõi kiểm tra, điều hướng nội dung công viêc. Nếu không hiệu quả sẽ không được như mong muốn.
- Khi mà 2 người làm cùng 1 việc không có nghĩa công ty sẽ chịu "doubles costs", tức là chịu gấp đôi chi phí cho việc đó. Nhưng nếu triển khai PP thất bại thì điều lo lắng trên sẽ xảy ra.
- PP cũng được gọi là phương pháp lập trình ồn ào, bởi nó đòi hỏi sự trao đổi thường xuyên giữa driver và navigator, nếu mọi người giữ im lặng quá mức dẫn đến PP sẽ thất bại.
- Với những người tiêu cực PP có thể coi là phương pháp giết chết sự tự do cá nhân. Bởi bạn đang sử dụng chung 1 máy tính với người khác, mọi hành động nằm ngoài yếu tố công việc đều bị hạn chế. Bạn có một tin nhắn riêng tư của ai đó (sếp, bạn gái, vợ ...) nhưng không đọc được bởi đang có người ngồi cạnh chăm chú nhìn vào màn hình máy tính của bạn.
- PP cũng đòi hỏi 2 lập trinh viên phải có kĩ năng làm việc nhóm ở mức độ cao nhất. Với 2 con người có tính cách sở thích khác nhau, nền tảng kiến thức, mức độ hiểu biết khác nhau thì mâu thuân có thể xảy ra thường xuyên, nó gây tranh luận không ngừng, đôi khi vượt quá vấn đề công viêc. Điều này khiến cho không khí làm việc trở lên vô cùng căng thẳng ngột ngạt, sự im lặng xuất hiện và PP sẽ thất bại.

Chính những vấn đề trên khiến cho mỗi lập trình viên khi tham gia PP có thể stress rất nặng, họ có tâm lý muốn thoát khỏi nó và PP lúc này coi như đã thất bại. Mục đích hướng tới đều không thể đạt được.

**2. Các cấp độ có thể đạt được trong PP**

PP đòi hỏi sự hợp tác của 2 lập trình viên ở mức rất cao, nên một có 1 vấn đề ngăn cản đó là tính thụ động. Khi PP được kết hợp với 1 phương pháp lập trình khác như TDD chẳng hạn sẽ khá thú vị. Một người có thể viết test và 1 người viết code implement, cách thức này đặc biệt thích hợp cho việc đào tạo, nhân viên mới có thể tiếp thu và nắm bắt công việc trong dự án nhanh nhất.
Khi áp dụng PP trong công viêc, bạn có thể đạt được cấp độ sau:
- Cấp Beginner:
+ Tham gia được vai trò navigator, có thể can thiệp vào thao tác của driver một cách thích hợp nhằm sửa lỗi hay refactoring source code.
+ Tham gia được vai trò driver, có thể giải thích được source code mà mình đang implement.

- Cấp Intermediate:
+ Có thể can thiệp đúng thời điểm để thayđổi vai trò (switch roles giữa navigator và driver). Ví dụ khi bạn đang là navigator mà đến 1 phần việc bạn cảm thấy mình có kinh nghiệm và giải pháp hay hơn "đồng đội" thì có thể can thiệp để đổi vai trò, tốc độ và chất lượng hoàn thành công việc vì thế mà sẽ tăng lên.

- Advanced:
+ Có thể chuyển sang pair khác mà vẫn làm việc bình thường ở vai trò driver và navigator.

Việc triển khai PP khó khăn vậy nhưng nó vẫn tồn tại cho đến ngày nay, được khá nhiều dự án áp dụng, vậy hãy cũng điểm qua nhưng ưu điểm mà nó mang lại:


**3. Lợi ích của việc triển khai PP vào dự án**
- Nâng cao chất lượng công việc, chất lượng code, hạn chế bug phát sinh do sai sót cá nhân. Những vấn đề phức tạp liên quan đến yêu cầu khách hàng hay kĩ thuật sẽ được làm sáng tỏ hơn thông qua việc trao đổi tích cực giữa 2 thành viên trong pair
- Đây là cách tốt đề chia sẻ kiến thức và kinh nghiệm giữa các thành viên trong team, một senior có thể pair cùng với junior để đào tạo.
- Giảm nhiều nỗ lực phối hợp, vì có các cặp N / 2 phối hợp làm việc thay vì N lập trình viên.
- Một người trong pair vắng mặt cũng gây ảnh hưởng quá nhiều đến tiến độ công việc.
- Một việc bất kì luôn được làm và theo dõi bởi 2 người, bởi thế nếu có thành viên trong team nghỉ việc cũng không phải vấn đề quá lớn, việc đưa thêm người mới vào team cũng đơn giản hơn.

**(*) Lưu ý: chỉ áp dụng PP khi nhận thấy trong team có 1 số đặc điểm sau:**

- Không gian làm việc thuật tiện cho việc lập trình theo cặp (chỗ ngồi, trang thiết bị ...) Nếu người người ở cách nhau quá xa, phải remote thì cũng không mang lại hiệu quả
- Mức độ tiếng ồn có thể kiểm soát, việc các thành viên trong team trao đổi không ảnh hưởng tới các bộ phận phòng ban khác.
- Mỗi quan hệ giữa các thành viên trong team không có vấn đề gì, không xảy ra xung đột hay bất đồng lớn.
- Team member có kĩ năng làm việc nhóm và khả năng chủ động, chịu được áp lực cao.

Hy vọng qua những phân tích vừa rồi có thể giúp bạn hiểu rõ ưu nhược điểm và trả lời được câu hỏi "Có nên áp dụng Pair Programing vào dự án hay không ?". Nó hoàn toàn phụ thuộc vào mức độ ưu tiên trong kết quả công việc mà bạn mong muốn. Nếu team bạn có những đặc điểm cần thiết để áp dụng PP, nếu bạn quan tâm đến chất lượng công việc nhất (coi tốc độ thấp hơn), coi trọng tính ổn định trong team, muốn đào tạo người mới thì PP là phương án đúng đắn mà bạn có thể áp dung. Không dễ để áp dụng thành công nhưng nếu đạt được bạn sẽ có rất nhiều thành quả tuyệt với....