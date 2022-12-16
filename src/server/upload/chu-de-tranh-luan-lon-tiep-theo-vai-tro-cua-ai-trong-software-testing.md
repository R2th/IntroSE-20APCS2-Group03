## Đầu tiên, tại sao chúng ta cần AI cho Software testing?
Có vẻ như hiện tại chúng ta chỉ chú ý tới vai trò của Automation test trong Software testing. Hiện tại chúng ta phải bắt đầu chuẩn bị cho giai đoạn tiếp theo, giai đoạn mà vai trò của AI đóng một vị trí quan trọng trong Software testing. Sự phát triển của Automation test được thúc đẩy bởi các mô hình phát triền phần mềm như Agile nhằm đưa các sản phẩm ít lỗi nhất có thể vào thị trường nhanh hơn. Từ đó, chúng ta đã tiến vào kỷ nguyên của Daily Dev với sự phát triển của DevOps. DevOps đang thúc đẩy các tổ chức đẩy nhanh quy trình QA hơn nữa, nhằm giảm chi phí kiểm thử và cho phép quản lý một cách tối ưu hơn. 

### Vậy thì:
- Công nghệ Test dựa trên AI sẽ là giấc mơ hay ác mộng đối với các Software tester chuyên nghiệp?
- Phạm vi test có thể ( và nên) dựa vào AI?
- Lợi ích đích thực và rủi ro đến từ AI?

Để kích thích thêm sự tò mò của bạn, dưới đây, Người sáng lập và Chief Product Wofgang Platz đã có những tóm tắt về Cuộc tranh luận lớn cuối cùng tại Accelerate SF (Nguyên bản đã được xuất bản trên InfoWorld):

## Nhàm chán hay Lôi cuốn? Quá trình tiến hoá của Software testing
Hãy tưởng tượng tới kịch bản quá đỗi phỗ biến này: Những Software tester  được yêu cầu kiểm tra chức năng của ứng dụng mới sau khi Các Developer quả quyết rằng đã xong phần "Dev". Họ có một danh sách các action và họ click một cách thủ công qua từng step - Cố gắng theo sát từng hướng dẫn và ghi lại một cách có phương pháp kết quả outcome của từng bước đề phòng trường hợp có điều gì đó không ổn xảy ra. Họ không thực sự hiểu nghiệp vụ và đứng trên quan điểm của người dùng, và họ hiếm khi tương tác với các developer hoặc các bên liên quan. Mục tiêu chính của những tester này là truy cập vào X và kiểm tra xem kết quả đầu ra chính là Y chứ không phải Z.

Không thể phủ nhận rằng điều này là rất nhàm chán nhưng thực sự tôi không nghĩ rằng đó thực sự là Software testing. Đó chắc chán không phải là loại Software testing có yêu cầu cung cấp trải nghiệm của khách hàng nhanh hơn các đối thủ cạnh tranh khác. 

"Digital Tranformation" - Sự chuyển đổi kỹ thuật đang ảnh hưởng tới hầu hết mọi bộ phận doanh nghiệp hiện nay và một số bộ phận QA vẫn giữ được trạng thái không bị ảnh hưởng. Làn sóng kết quả có thể xoá sạch đi sự nhàm chán của người dùng vì việc xác thực thủ công như đã đề cập tới ở trên. Nhưng điều này cũng có thể nâng tầm thành phạm trù mới lôi cuốn hơn, nơi mà các tester  trở thành người quản lý chính cho trải nghiệm của khách hàng.

Trong chủ đề tranh luận gần đây nhất "Chủ đề tranh luận Kiểm thử tuyệt vời". Khi tranh luận về sự phát triển của testing, chủ đề được chạm tới như là vai trò mới nổi của SDET và tương lai của TCoEs. Tất cả chúng ta phải đồng ý rằng, những vấn đề chúng ta phải đối mặt hiện tại sẽ đem đến một cơ hội tuyệt vời để định hình lại vị trí của Testing như là một môn học thúc đẩy sự đổi mới thay vì kéo sự phát triển của testing đi xuống. Tuy nhiên, khó khăn nằm trong từng chi tiết. Chính xác những gì cần thay đổi, và làm thế nào để chúng ta tiến tới được lúc đó?

## Dưới đây là một số tóm tắt thú vị về những quan điểm tranh luận
## 
### One team, one fight - Một team, một cuộc đấu
### 
Diễn giả Ander đã giới thiệu một câu thần trú tuyệt vời để nắm bắt phương thức mà chất lượng trở thành trách nghiệm của tất cả mọi người: "Khi khách hàng thấy một bug, họ không đổ lỗi cho các tester và các developer. Họ đẩy trách nghiệm cho công ty đã phát hành ra phần mềm đó".

Tiếp tục với chủ đề này, diễn giả cũng chia sẻ một cách tương đối thú vị về cách tiếp cận chất lượng phần mềm như là một quy tình: "Hãy nghĩ về School House Rock về cách một dự luật trở thành luật. Đây là các chúng ta nên suy nghĩ về cách code. Chúng ta cần xem xét lại tất cả những điều khác nhau xảy ra với code của chúng ta khi phần mềm của chúng ta đi dọc theo băng chuyền nhà máy,  tất cả những khác nhau đó đều bao gồm quy trình. Khi chúng ta lập ra bản đồ này, đó là khi chúng ta có thể bắt đầu tối ưu hoá quy trình. Nếu để lọt một bug thoát ra khỏi quy trình đó, có nghĩa là lỗi của một tổ chức và lỗi này cần phải được phát hiện, phân tích và xử lý

### Nhu cầu đa dạng
### 
Trong chủ đề này, Chúng ta đã tập trung vào việc chuyển từ DevOps sang mở ra nhiều tuỳ chọn khác nhau để phù hợp với các kỹ năng khác nhau. Ví dụ, những tester thủ công trước đây có thể lấy một số dường dẫn khác nhau để đóng góp cho nỗ lực tự động hoá. Những người muốn tiếp tục theo con đường Automation test có thể học và thử nghiệm mô hình/ hoặc là Selenium để duy trì thị trường trong lĩnh vực Software testing. Một số khác có thể quyết định tập trung vào quản lý dữ liệu test. Những người khác có thể sẽ có xu hướng phân nhánh và làm chủ các nền tảng thực tiễn và nền tàng DevOps. Có khoảng 40,000 Tester tại Accenture. Tất cả họ đều không có những tính cách và kỹ năng giống nhau, kết quả Accenture trở thành một công ty mạnh hơn rất nhiều. 

### Tầm quan trọng của Unit Test
### 
Chủ đề tranh luận tiếp theo có những diễn giả ủng hộ trung thành Unit test. Họ yêu cầu các kỹ sư viết Unit test cho code của họ bởi vì nó rất nhanh và rẻ hơn việc để lọt bug ở nhiều cấp độ. Theo kinh nghiệm hiện tại, rất nhiều vấn đề được tìm thấy trong khâu production và thực trạng này có thể ( và nên) dừng lại với Unit test tốt hơn.

Tôi đồng ý rằng Unit test có giá trị và cần thiết. Như các diễn giả đã lưu ý, nó tạo thành nền tảng ổn định trong mô hình Kim tự tháp cảu Agile test. Tuy nhiên, tôi không cho rằng Unit test sẽ nắm bắt được các những vấn đề thực sự ảnh hưởng tới trải nghiệm của End user. Đặc biệt là trong các doanh nghiệp lớn, tôi đã thấy các bài Unit test phân rã theo thời gian, tới mức không ai còn chú ý tới chúng. Tôi cũng nhận thấy rằng hầu hết các vấn đề dược báo cáo bới End user không thể tìm thấy ở unit level, họ sẽ yêu cầu Integration test, system test, hoặc end-to-end test bởi các tester chuyên nghiệp thực sự hiểu về phần mềm. 

Điều này cuối cùng đã trở thành một trong số ít các quan điểm tranh luận mà chúng ta phải thống nhất rằng chúng ta không đồng tình.

### Developer test, nhưng họ không phải là các tester
### 
Tôi nhấn mạnh rằng, trừ khi bạn là một GAFA (Google, Apple, Facebook, Amazon), bạn không thể affort việc thuê dịch vụ xa xỉ như SDETS: Các developer sẽ cống hiến cho việc test. Tuy nhiên, ngay cả khi chúng ta có thể khiến cho các developer tiến hành test, họ không phải là lựa chọn tốt nhất cho chúng ta để bảo vệ trải nghiệm của End user.

Và có, tất nhiên các developer có thể check được code của họ và phân tích, unit test, peer code review,... Tìm thấy vấn đề càng sớm càng tốt. Tuy nhiên, chúng ta cũng nên xem xét rằng người giỏi nhất trong việc tạo ra điều gì đó không có nghĩa rằng họ là người giỏi nhất trong việc phá vỡ thứ đó. Đây rõ ràng là những ngành học khác nhau rõ ràng. Nếu bạn chuyển tới một toà nhà chọc trời, bạn muốn việc kiểm tra toà nhà lúc cuối cùng thực hiện bởi kiển trúc sư hay thanh tra xây dựng chuyên nghiệp?

Có diễn giả đã nói: "QA là mindset. Để trở thành một QA tốt, chúng ta phải đam mê về lĩnh vực chất lượng."

### Shift Left
### 
Ngày càng có nhiều tổ chức, bao gồm Accenture, Electric Cloud, và rất nhiều khách hàng của Tricentis, đang phát minh lại "Testing" trở thành "Quality Engineering". Khi Testing là reactive, còn Quality engineering là proactive (chủ động). Chúng ta không chỉ bắt lỗi, mà chúng ta còn ngăn chặn các lỗi thâm nhập vào code ngay từ đầu.

Tất cả chúng ta đều đồng ý rắng Quality engineering nghĩa là giải quyết vấn đề về chát lượng sớm hơn nhiều trong quy trình so với hầu hết các tổ chức hiện nay. Nhưng giải pháp chỉ đơn giản là áp dụng các kỹ thuật thường được gắn nhãn là "Shift left testing". Nó cũng liên quan đến các đánh giá ở giai đoạn đầu, với những tester tham gia vào các đánh giá đó. Xa hơn, nó có thể liên quan tới việc mời các tester đến các phase thiết kế, nơi họ có thể thiết lập chiến lược về cách xây dựng chất lượng và khă năng kiểm thử ngay từ đầu.

Với sự thay đổi này, những tester sẽ được nâng tầm trong vai trò thành những người cố vấn đáng tin cậy, những đại sứ của chất lượng thay vì công việc test nhàm chán trong quá khứ. 


Nguồn: https://www.qasymphony.com/blog/next-great-debate-role-ai-software-testing/