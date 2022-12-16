Với những sinh viên mới ra trường hay thậm chí là sinh viên vẫn đang ngồi trong ghế nhà trường thì phỏng vấn không còn là cụm từ quá xa lạ. Trước những buổi phỏng vấn thì mình chuẩn bị rất kỹ các kiến thức liên quan đến chuyên nghành mình đi phỏng vấn tuy nhiên thì không ít bạn sẽ đặt ra câu hỏi là nhà tuyển dụng họ sẽ hỏi những câu như nào?  Hôm nay mình sẽ chia sẻ cho các bạn các câu hỏi thường gặp trong các buổi phỏng vấn QA/Tester cho sinh viên mới ra trường hay những người mới bắt đầu.
## I. Các câu hỏi thường gặp
### 1. Em hãy giới thiệu về bản thân
Đây là câu hỏi gần  như mở đầu mỗi buổi phỏng vấn nào cũng có. Giới thiệu bản thân thì bạn nên giới thiệu những thông tin gì? <br>
* Tên bạn là gì? Hiện tại bạn vẫn đang là sinh viên hay ra trường rồi? Học khoa nào, trường gì?<br>
* Mục tiêu ngắn hạn là gì? Mục tiêu dài hạn là gì?
* Điểm mạnh, điểm yếu là gi?<br>

Nhà tuyển dụng sẽ hỏi thêm bạn về mục tiêu nghề nghiệp của bạn: ví dụ *bạn đã có kế hoạch cụ thể nào cho những mục tiêu của bạn chưa?* 
### 2. Lý do em chọn nghề QA là gì? Em  đã tìm hiểu về nghề QA này bao lâu rồi?
* Em rất thích học về công nghệ thông tin, sau khi tìm hiểu em rất yêu thích công việc làm QA/Tester. QA/Tester là 1 vị trí quan trọng trong quy trình phát triển phần mềm, đảm bảo sản phẩm hoàn thiện tốt nhất trước khi đến tay người dùng cuối cùng.
* Thời gian bạn đã tìm hiểu: Ví dụ bạn đi học ở trung tâm nào đó rồi trong khoảng thời gian nào? Hay học trên trường........
### 3. Trong quá trình viết test case em thường sử dụng các kỹ thuật nào?
Nếu bạn apply vào vị trí manual test thì nêu ra các kỹ thuật trong kiểm thử hộp đen như: kỹ thuật phân vùng tương đương, kỹ thuật phân tích giá trị biên, kỹ thuật bảng quyết định, kỹ thuật chuyển trạng thái, sử dụng use case,..Bạn cần nêu ra được định nghĩa và giải thích về các kỹ thuật này nếu bạn khó giải thích thì bạn có thể lấy ví dụ cụ thể.<br>
Trong câu này thì thường khi bạn trả lời xong thường nhà tuyển  sẽ hỏi thêm bạn câu: *Phân biệt kỹ thuật phân vùng tương đương và kỹ thuật phân tích giá trị biên*<br>
### 4. Các thành phần thường có trong 1 test case là gì?
Tùy vào từng template của từng công ty tuy nhiên thì trong 1 test case thường sẽ có các thành phần sau:<br>
* **ID**: số thứ tự của test case đó
* **Function/Screen:** Chức năng hoặc màn hình cần test
* **Tên test case:** Mô tả ngắn gọn case cần test
* **Tiền điều kiện:** Điều kiện cần trước khi thực hiện case đó
* **Các bước thực hiện:** Mô tả chi tiết các bước để test được case đó
* **Kết quả mong muốn:** Kết quả của case đó mà khách hàng mong muốn
* **Kết quả:** Kết quả của case đó khi thực hiện test ví dụ: passed, failed, peding, N/A,... thùy thuộc vào công ty
* **Ngày test:** Ngày mà tester/QA thực hiện test
* **Tester:** Tên của Tester/QA thực hiện test case đó
* **Note:** Ghi chú lại những gì cần note ví dụ như khi mà case test có kết quả là fail thì mình cần ghi lại link mà mình đã log ticket đó lên giúp cho việc tracking được dễ dàng

Sau khi trả lời xong nhà tuyển sẽ hỏi bạn là *làm thế nào để viết bộ test case hiệu quả?*<br>
### 5. Em sẽ test những case nào cho trường hợp nhập vào số tự nhiên từ 0-100?
Em sẽ kết hợp các kỹ thuật phân tích giá trị biên và phân vùng tương đương vào để test các case như sau:<br>
* Bỏ trống
* Nhập  toàn khoảng trắng
* Nhập 0
* Nhập -1
* Nhập 50
* Nhập 100
* Nhập 101
* Nhập số thập phân
* Nhập phân số
* Nhập chữ
* Nhập các ký tự đặc biệt: !@#$%^&*()
* Nhập thẻ html: <table>Test</table>
* Nhập câu lệnh sql injection:    'a' or '1=1--'
### 6. Khi nào thì log bug và các thành phần thường có trong 1 bug report?
Khi mà mình thực hiện test và thấy kết quả thực tế khác với kết quả mong đợi thì phải log bug.<br>
Tùy vào từng công ty hay từng tool quản lý bug thì sẽ có các thành phần khác nhau. Dưới đây em xin trình bày về các thành phần thường có khi sử dụng tool redmine để quản lý lỗi:<br>
* **Title:** Phần này sẽ ghi ngắn gọn về bug làm sao nhìn vào có thể hiểu ngay được lỗi đang xảy ra ở đâu, thế nào. Nên ghi theo  cấu trúc:<br>
[Prefix]Lỗi hiển thị như thế nào + Khi người dùng thực hiện gì trên màn hình nào <br>
*Ví dụ:* [User][Apply job] Do NOT display error message when user input invalid value into "Email" field<br>
* **Description:** Mô tả bug, thường gồm có các thành phần:<br>
* **Sumary:** Tóm tắt lại cái bug đó nếu trên title chưa làm rõ được bug thì dưới phần sumary sẽ bổ sung thêm và làm rõ hơn cho bug nên dừng lại ở 3 câu.<br>
* **Pre-condition:** Trước khi xảy ra bug này thì cần phải có điều kiện gì trước đó. Tùy vào từng bug mới có Pre-condition.<br>
 *Ví dụ:* Muốn edit được 1 cái form xin nghỉ thì cần phải có 1 form đã được tạo thành công trước đó<br>
* **Step to re- produce:** Các bước để tái tạo bug giống như các bước trong test case<br>
* **Expected result:** Kết quả mong đợi của bug<br>
 *Ví dụ:* Sign up successful account<br>
* **Actual result:** Kết quả thực tế của bug (thực tế hệ thống đang chạy như thế nào)<br>
* **Note:** Ghi lại môi trường test của bug đó, Requirement nói gì và chỉ rõ ở phần nào trang bao nhiêu rồi paste link vào<br>
**Attachment:** Đính kèm hình ảnh hay gif để tái tạo được bug đó<br>

Ngoài ra còn có các thành phần: <br>
* **Priority:** Độ ưu tiên của bug<br>
* **Severity:** Mức độ nghiêm trọng của bug<br>
### 7. Dựa vào đâu để xác định được kết quả mong đợi
Kết quả mong đợi xác định được là dựa vào:<br>
* Requirement
* Q&A file
* Các ticket trên tool quản lý (ví dụ như redmine)
### 8. Khi viết test case thì em thường test các case như thế nào?
Khi viết test case em thường test các case như sau:
* Check GUI (genaral user interface): Check tổng quát giao diện<br>
* Check screen flow: Check luồng màn hình<br>
* Check permission role: Check xem những role truy cập vào màn hình đó thì có nhưng chức năng nào<br>
* Check initial display: Check hiển thị ban đầu của các trường trong màn hình<br>
* Ckeck Function: Đi vào chi tiết từng function và từng trường 1. 

## II. Một số tip khi đi phỏng vấn

### 1. Làm thế nào để chuẩn bị cho buổi phỏng vấn
* Sẽ có người thì chuẩn bị mai đi phỏng  vấn thì tối nay mới ngồi ôn lại các phần kiến thức, cũng có người thì trước đó 1 ngày, 2 ngày, 3 ngày hay 1 tuần. Tuy nhiên thì tích lũy kiến thức là quá trình lâu dài, kiến thức được tích lũy qua từng ngày chứ không phải ngày 1 ngày 2 là bạn có thể nhồi nhét hết chúng vào đầu. Vì thế nên mỗi ngày mình nên tự trau dồi kiến thức cho bản thân. Chỉ có làm chủ kiến thức của bản thân thì mới tự tin trả lời các câu hỏi và chỉ có luyện tập hàng ngày thì mình mới tốt lên được.<br>
* Nếu bạn không tự tin,bạn run thì hãy hàng ngày tự đặt ra câu hỏi và tự trả lời to ra miệng hay luyện tập trước gương.<br>

![](https://images.viblo.asia/2a3a5701-d1d8-4695-b0eb-f2e990a58d69.jpg)<br>
* Trước khi đi phỏng vấn thì bạn nên update CV lại 1 các cẩn thận tránh trường hợp 1 cái CV gửi cả chục công ty.<br>

Ngoài chuẩn bị thật tốt về mặt kiến thức bạn còn phải chuẩn bị về trang phục:<br>
* Bạn nên mặc những trang phục đơn giản, bình thường và làm sao cho bạn tự tin nhất và cũng thể hiện được rằng bạn cũng rất tôn trọng người đối diện.<br>
* Bạn cũng có thể make up nhẹ nhàng nhưng tránh trường hợp make up quá đậm và lòe loẹt.<br>


Trước khi đi phỏng vấn thì bạn nên tìm hiểu về công ty và chuẩn bị các câu hỏi để đặt ra cho người  phỏng vấn. Một số câu hỏi có thể đặt:<br>
1. Cho em xin job description chi tiết, quyền hạn, trách nhiệm và KPA vị trí đang tuyển dụng
1. Các vấn đề công ty đang ưu tiên triển khai và kế hoạch triển khai chung
1. Vào trong công ty yêu cầu của 1 người nhân viên về kiến thức, kỹ năng và thái độ như thế nào?
2. Tôi sẽ báo cáo công việc cho ai và cách thức quản lý như thế nào?
3. Công ty kỳ vọng tôi thực hiện vị trí như thế nào trong 90 ngày đầu?
4. Các vấn đề mà em phải quan tâm?
5. Công ty làm việc nhóm như thế nào? Yêu cầu như thế nao?
6. Tôi muốn gắn bó lâu dài với công ty nên anh/chị có thể tư vấn cho em định hướng phát triển lâu dài được không ạ?
7. Trong quá trình chị/anh phỏng vấn em thì anh/chị có thể cho em chút nhận xét về bản thân em được không ạ?

Điểm cộng cho bạn khi bạn đặt được câu hỏi với nhà tuyển dụng nó thể hiện bạn đang rất quan tâm đến công việc này và quan tâm đến công ty này.
### 2. Khi trả lời phỏng vấn
* Khi trả lời phỏng vấn đừng nên người phỏng vấn hỏi gì thì bạn chỉ trả lời phần đó mà ta nên mở rộng vấn đề với điều kiện là ta chắc chắn vì chủ yếu các nhà phỏng vấn sẽ dựa vào câu trả lời của bạn để họ đặt ra câu hỏi tiếp theo cho bạn. Dựa vào đó nhà tuyển dụng có thể biết được bạn hiểu vấn đề đó có sâu không hay chỉ là qua loa.<br>
* Hãy nói vừa phải đủ nghe như chia sẻ hay nói chuyện bình thường.<br>
* Trả lời tập trung và trực tiếp vào câu hỏi.<br>

Trên đây mình vừa trình bày 1 số câu hỏi và gợi ý cách trả lời cho câu hỏi đó cùng với  1 số tip mình có tìm hiểu được và đã tích lũy được trong quá trình mình đi phỏng vấn. Rất mong sẽ có ích cho các bạn:heart_eyes:.
## Tài liệu tham khảo:
https://timviec365.vn/cau-hoi-tuyen-dung