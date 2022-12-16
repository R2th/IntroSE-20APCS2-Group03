![](https://images.viblo.asia/0359270f-c0d0-4be2-82d3-b09f20798184.png)
> Paring programming is not a “go faster“ strategy, it’s about “waste less” strategy (which often results in going faster). ~ Kent Beck

Paring là một khái niệm trong agile sofware development, trong đó hai lập trình viên cùng làm việc chung với nhau trên một bàn làm việc, cùng chia sẻ một màn hình, một bàn phím và một con chuột.

### Tại sao phải pair programming:
- Đây là một trong những hình thức nhằm xây dựng kỹ năng làm việc theo nhóm, công việc sẽ được hoàn thành nhờ việc cộng tác trong team
- Giúp tăng chất lượng phần mềm mà không làm ảnh hưởng tới thời gian bàn giao sản phẩm
- Mặc dù nếu hai người cùng làm thì dường như ít việc sẽ được hoàn thành hơn, nhưng thực tế, sản phẩm sẽ có chất lượng tốt hơn hẳn
- Việc này sẽ giúp thành viên mới tham gia team nắm bắt được công việc nhanh hơn nhờ được làm trực tiếp với người đã có kinh nghiệm với dự án
- Giúp các bạn lập trình viên trẻ mài dũa kỹ năng của họ cũng như giúp các lập trình viên có kinh nghiệm tăng cường thêm kiến thức khi chia sẻ chúng

### Các kỹ thuật pair programming:
- Ping Pong: Kỹ thuật này được sử dụng khi kết hợp với việc viết TDD, một người sẽ viết test và người còn lại viết các đoạn code để pass những testcase này. Và thay đổi vị trí cho nhau luân phiên.
- Driver-Navigator: Một người sẽ lái (gõ bàn phím) và người kia chỉ đường
- Unstructured Pairing: Khi không theo một cách cụ thể nào


### Làm thế nào để Pair Programming?
Sau đây là các bước để pair theo phương pháp Ping-Pong:
- Người driver viết code
- Trong lúc đó người kia sẽ theo dõi hoặc hướng dẫn, kiểm tra từng dòng lệnh được viết
- Hai người sẽ đổi vai cho nhau một cách luân phiên
- Ngoài ra, người này có thể làm việc mà người kia đang không làm để tiết kiệm thời gian, ví dụ như trong lúc một người đang viết unitest thì người kia sẽ suy nghĩ về class nào có thể thoả mãn những testcase kia

### Những hiểu lầm về Pair Programming 
- Bạn phải làm pair programming nếu bạn đang làm theo quy trình của agile
- Extreme programming khiến bạn bắt buộc phải làm Pair-Programming
- Bạn không cần làm pair bởi bạn không thích nó
- Pair-programming sẽ làm giảm phân nửa năng suất của lập trình viên
- Chỉ cần pair với những đoạn code phức tạp, những đoạn mã đơn giản sẽ không mang lại hiệu quả


### Lưu ý để pair program một cách hiệu quả
- Luôn nói chuyện với nhau để giữ sự tập trung của cả hai người vào công việc đang làm, khi không nói chuyện chúng ta rất dễ mất tập trung
- Dành một khoảng thời gian bằng nhau cho cả hai người khi đến phiên pair (thường kéo dài không quá 30 phút, trung bình khoảng 20 phút một phiên) 
- Sử dụng một môi trường phát triển mà cả hai người tham gia đều cảm thấy thoải mái
- Thông thường, khi bắt đầu pair, ta có thể pair trong khoảng thời gian từ 2-4h một tuần, sau đó, nếu mọi thứ diễn ra thuận lợi, ta có thể tăng dần lên và sau đó là nguyên ngày.
- Khoá buổi pair lại như một buổi meeting, ở đó, không ai làm việc riêng như đọc mail, trả lời tin nhắn... Mọi thứ nhằm tạo ra môi trường tập trung cao độ thì mới có thể mang lại hiệu quả cao.
- Không nên ép buộc người khác phải pair
- Không pair nhiều hơn khoản thời gian mà ta lên kế hoạch, khi hết giờ, ta cũng dừng ngay việc pair hoặc đổi role. Ta có thể sử dụng đồng hồ hẹn giờ để báo khi hết giờ.

### Ai là người nên drive?
Thông thường, người drive sẽ tập trung vào việc đang làm hơn, vì vậy việc chuyển đổi qua lại giữa hai người sẽ giúp cho cả hai cùng tập trung vào vấn đề hơn. Và khi pair, ta có thể yêu cầu người kia trao lại quyền nếu người kia đang giữ quá lâu, điều này không chỉ giúp bạn lấy lại quyền kiểm soát mà còn giúp người kia nhận ra họ đang không làm tốt việc giữ cho bạn tập trung vào công việc.

Và đừng la rầy người kia thậm tệ, việc làm chung với nhau thường sẽ khiến nảy sinh nhiều mâu thuẫn nếu hai người có nhiều khác biệt, tuy nhiên cần giữ cho mình sự bình tĩnh và cùng tập trung vào công việc để đạt được hiệu quả cao. Driving là cách hiệu quả nhất để giữ cho người tham gia tập trung cao, nếu bàn phím và chuột không dễ để chia sẻ thì hãy hỏi thật nhiều câu hỏi về đoạn code và về các vấn đề liên quan.

### Nên làm việc trên project của ai?
Khi pair programming với nhau, ta không nên chia thời gian giữa project của người này và project của người kia mà nên dành toàn bộ thời gian của một buổi làm việc trên một dự án mà thôi. 

Nếu đó là project của bạn, bạn sẽ hoàn thành được khá nhiều công việc, tuy nhiên bạn cũng cần chuẩn bị cho một khoảng thời gian làm việc khó khăn hơn cũng như giữ cho người pair cùng mình gắn kết vào dự án. 
Trước mỗi phiên làm việc, hãy liệt kê ra khoảng 2~3 task và trình bày chúng trước khi để người pair cùng bạn chọn một task để làm. Và hãy nhớ là đổi vai cho nhau liên tục. 

Nếu đó không phải là project của bạn thì có thể cả ngày hôm đó bạn sẽ không hoàn thành được bất cứ task nào, tuy nhiên hãy tập trung cao độ vào việc pair và cố gắng học hỏi càng nhiều càng tốt, giống như cách bạn đang làm cho dự án của chính mình. Nếu ta làm việc này tốt, thì lần sau, khi tới phiên dự án của bạn, người kia cũng sẽ hết lòng vì bạn đấy.

### Remote hay Local
Local luôn tốt hơn, nhưng remote cũng vẫn chấp nhận được nếu bạn không có điều kiện để ngồi cạnh nhau. Tuy nhiên, nên sắp xếp để gặp nhau một lần trước khi bắt đầu pair, cảm xúc khi gặp mặt trực tiếp có thể sẽ giúp cho hai người thoải mái và làm việc với nhau hiệu quả hơn.

Có thể sử dụng laptop vì tiện di chuyển, và hai người pair nên ngồi cạnh nhau thay vì có khoảng cách, ví dụ, người trước người sau, nó sẽ giúp việc giao tiếp tốt hơn.

Mục tiêu của pairing sau cùng cũng là học hỏi, học hỏi về ngôn ngữ lập trình, học về công ty, về đồng nghiệp, về dự án, hoặc về cách để pair, luôn có thứ gì đó mới để chúng ta học hỏi khi pair với người khác.

Pairing không chỉ giúp bạn bàn giao được nhiều code hơn, mà nó còn giúp chúng ta trở thành những người lập trình viên giỏi hơn, và tạo ra được những dự án tốt hơn.