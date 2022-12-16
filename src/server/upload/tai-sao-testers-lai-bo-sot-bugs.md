**Bạn đã từng bị miss bugs, thậm chí là những bugs cơ bản bao giờ chưa? Đôi khi bạn tự hỏi tại sao mình lại bỏ sót những bugs này?**

Trong cuộc đời đi làm của một Tester, tôi chắc hẳn test qua test  rằng bạn đã từng gặp những trường hợp:
* Bugs xảy ra cho dù bạn đã test những cases đó rồi
* Bỏ qua những test cases cơ bản
* Không bao quát được tất cả các requirements

Do áp lực công việc: Đảm bảo chất lượng phần mềm, đã tạo ra ý khiến rằng: Mọi khiếm khuyết sau giai đoạn kiểm thử đều do sai lầm của Tester và bạn phải chịu trách nghiệm với nó. Chính vì thế, bỏ sót lỗi (lack bugs) là một điều khá là tồi tệ với một kiểm thử viên. Không thể phủ nhận rằng việc bỏ sót lỗi này có cả những nguyên nhân chủ quan, do nhận thức sai lầm hoặc cẩu thả của chính người kiểm thử viên. Tuy nhiên cũng có rất nhiều nguyên khách quan đã đến bugs bị bỏ sót. Bài viết này sẽ giúp bạn làm rõ các lý do khiến chúng ta bỏ sót bugs và cách ngăn chặn để giảm thiểu tối đa bugs đó không xảy nữa.

# Nguyên nhân chủ quan
## Nhận thức sai lầm

Khi con người tiếp cận bất kỳ một vấn đề luôn hướng tới những điều logic, có cấu trúc hợp lí. Nhưng thực tế thật đáng buồn là chúng ta luôn bị ảnh hưởng bởi những nhận thức sai lầm từ cấu trúc bộ não hay những sự việc mà chúng ta trải qua hàng ngày. Những nhận thức sai lầm có thể dẫn đến các biến thể của tri giác và hành động. Với nghề Tester, họ sẽ bị ảnh hưởng bởi những thành kiến riêng của họ - Phán đoán nơi có những bugs ẩn, người phát triển nó, toàn bộ lịch sử của hệ thống, v.v.

![](https://images.viblo.asia/97cbc171-29dc-4ed9-b67d-29abce161438.png)


### 1. Khuynh hướng tương tự

Con người dễ dàng thường đánh giá một tình huống dựa vào một tình huống tương tự. Trường hợp này thường xảy ra khi bạn test một testcase thành công và thường mặc định rằng những testcases có cùng scenarios tương tự đều sẽ pass. Chúng ta có xu hướng bỏ qua những bugs tiềm tàng.

**Bạn có thể làm gì để ngăn chặn?**
* Sử dụng các kỹ thuật Equivalence partitioning (Phân vùng tương đương) và Boundary value analysis (Giá trị biên) để viết testcases
* Phân tích những trường hợp đặc biệt khi sử dụng kỹ thật Equivalence partitioning (Phân vùng tương đương) 
* Không chủ quan với những Scenarios giống nhau

###  2. Khuynh hướng xác nhận

Đây là xu hướng tìm kiếm và diễn giải thông tin dựa trên niềm tin và các giả thuyết của chúng ta. 
Ví dụ, bạn cho rằng code của một Developer thường gặp nhiều bugs hơn một Developer khác. Điều này sẽ khiến bạn mất rất nhiều thời gian để test những modules mà anh ấy phát triển vì thế sẽ dẫn đến việc thiếu thời gian để test những modules của người khác. 

**Bạn có thể làm gì để ngăn chặn?**
*  Công tâm khi thực hiện test tránh để những giả thuyết ảnh hưởng đến các hoạt động testing
*  Không giả thuyết một vấn đề mà không có căn cứ
*  Kể cả khi bạn đã thu thập được dữ liệu thực tế thì luôn ý thức rằng có trường hợp ngoại lệ xảy ra

### 3. Mù nhận thức

Đôi khi bugs bị bỏ sót là những bugs rõ ràng, hiển nhiên và ở ngay trước mặt nhưng chúng ta không nhận ra.
Nguyên nhân của việc này chính là:
* Quá tập trung vào một phạm vi cụ thể của hệ thống mà không để ý tới những vấn đề của phần khác.
* Bugs quá rõ ràng và hiển nhiên khiến bạn không để ý tới hoặc nghĩ rằng Tester khác đã chú ý tới nó rồi
* Tập trung vào công việc khác (ví dụ viết Test Design, Test case,...) mà không chú ý đến bugs
* Không thay phương pháp test và cập nhật testcases mới

**Bạn có thể làm gì để ngăn chặn?**
* Cố gắng trở thành một "multi-tasking" Tester nhưng không bỏ qua những thiếu sót/nghi vấn nhỏ nhặt nhất
* Thay đổi cách tiếp cận hệ thống từ một góc nhìn khác và thay đổi các kỹ thuật thiết kế testcase

### 4. Quên báo cáo bugs

Có đôi khi bạn thực hiện test cho một module nhưng lại phát hiện ra bug của một modules khác. Bạn nghĩ rằng sẽ báo cáo nó sau nhưng sau (later) lại trở thành không bao giờ (never). Bạn chuyển qua một công việc khác và hoàn toàn quên mất sự tồn tại của bug đó.
Trong vài trường hợp khác, bạn không chắc chắn về bug tìm được - có thể là bug sometime hoặc requirement mơ hồ. Bạn không muốn làm phiền Developer hoặc BA. Đôi khi, bạn đánh giá bugs đó có độ nghiêm trọng thấp. Những có thể độ nghiêm trọng của bugs thấp với bạn (phần này) nhưng lại cao với người khác (phần khác)

**Bạn có thể làm gì để ngăn chặn?**
* Nếu bạn nghĩ rằng nó là một bug, hãy báo cáo (tất nhiên, luôn luôn giải thích lý do tại sao bạn cho rằng đó là một lỗi)
* Note lại các vấn đề ngay sau khi bạn tìm ra nó
* Báo cáo sớm nhất có thể khi phát hiện ván đề

# Nguyên nhân khách quan

### 5. Missing communication:

Đây là trường hợp phổ biến nhất dẫn đến lọt bugs. 
* Code bị thay đổi do impact từ việc phát triển dự án, sửa bugs khác, refactor code, v.v. sẽ có thể phát sinh ra bugs mặc dù bạn đã test thành công các testcases từ trước đó.
* Developer che giấu việc sửa code vì anh ấy nghĩ đó là vấn đề nhỏ
* Tester Leader/PM chưa truyền đạt sự thay đổi để bạn kiểm thử
* Dự án lớn và chia thành nhiều teams nhưng lại thiếu việc chia sẻ thông tin cho nhau
* Một tester chỉ test một module hoặc Tester cứng nghỉ việc

**Bạn có thể làm gì để ngăn chặn?**
* Yêu cầu Developer thông báo khi có bất kỳ hành động gì liên quan đến việc thay đổi code
* Thực hiện phân tích ảnh hưởng của code mới tới hệ thống
* Theo dõi và lưu lại bằng chứng là kết quả của testing trước đó
* Nhờ leader trao đổi vấn đề với tất cả thành phần trong dự án, thường xuyên giao tiếp, trao đổi để truyền đạt thông tin cần thiết, nói thêm về rủi ro, chất lượng của hệ thống
* Tạo ra những events để trao đổi và chia sẻ kiến thức về hệ thống giữa các teams
* Thực hiện trao đổi Testers giữa các teams để giúp một tester cố gắng bao quát được nhiều kiến thức của hệ thống nhất có thể

###  6. Sức ép về thời gian

Nhiều khách hàng muốn ra mắt sản phẩm phần mềm tới thị trường càng sớm càng tốt. Mặt trái của việc này là đội kiểm thử bị áp lực về thời gian khi phải hoàn thành kiểm thử cho kịp deadline. Điều đó đồng nghĩa với việc họ phải làm thêm giờ hoặc chấp nhận bỏ qua một số trường hợp kiểm thử trong đợt release này. Khi đội kiểm thử đang "chạy" để kịp release, họ bỏ qua một số trường hợp, và bug lại tiềm ẩn trong các trường hợp mà họ đã bỏ qua.

**Bạn có thể làm gì để ngăn chặn?**
*  Automation testing
*  Phân tích đánh giá priority của risks từ cao xuống thấp
*  Trao đổi với leader về tiến độ kiểm thử, những rủi ro có thể gặp phải khi không thực hiện kiểm thử cho trường hợp đó.

# Kết luận:
Hy vọng bạn sẽ có một ý tưởng tốt hơn về nhận thức sai lầm trong software testing hay những vấn đề tưởng chừng rất quen thuộc nhưng lại là nguyên nhân khiến chúng ta bỏ lỡ bugs. Quan trọng hơn là những gì có thể được thực hiện để loại bỏ những ảnh hưởng đó?

Ở đây, có điểm quan trọng cần lưu ý: Bỏ qua bug là không tốt, có thể gây nhiều hậu quả nghiêm trọng. Nếu có xảy ra, hãy cùng xem xét quá trình kiểm thử, rút ra bài học để ngăn chặn việc đó xảy ra lần nữa.