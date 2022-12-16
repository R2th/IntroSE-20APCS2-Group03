### 1. Estimate là gì ?
*Estimate là một hoạt động trong việc quản lý dự án nhằm ước lượng bao lâu thì công việc có thể thoàn thành, đây cũng là chủ để thường gây tranh cãi lớn nhất giữa dev và quản lý dự án (PM).*

Có nhiều người cho rằng estimate là việc lãng phí thời gian. Một số khác lại nghĩ, thực hiện dự án mà không có estimate giống như cứ đi mà không có đích đến.
Tuy nhiên, cả 2 nhóm này đều công nhận một điều "Thật là khó để đội dev có thể estimate được con số chính xác!"

> Có một thực tế về estimate, đó là chúng gần như không bao giờ chính xác bởi vì các task phải làm thường là task mới, mơ-hồ và có nhiều yếu tố không-xác-định xuất hiện trong suốt quá trình thực hiện.
> Hầu hết mỗi lần bạn nghĩ là bạn sắp hoàn thành công việc, thì đội kỹ thuật thường cho biết là họ đang phải xử lý thêm một mớ lỗi mới và bạn sẽ không thể phát hành sản phẩm đúng hạn.


### 2. Những con số trong Estimate
### 
*    20 – số ngày trong 1 tháng (đã trừ thứ 7 chủ nhật và lễ)
*    5 – số tiếng trong 1 ngày (= 8 tiếng * 62%)
*   10% – task management (Task quản lý của PM – TL)
*   10% – buffer risk (Sai số nếu xảy ra risk)
> Nếu 1 anh dev code (+UT) được 20 line Java trong 1 tiếng liên tục thì 1 tháng sẽ code được : 20 * 5 * 20 = 2000 => KLOC = 2000. 1 ngày có 8 tiếng, trong đó sẽ bao gồm nhiều task khác như mail, họp, nghỉ ngơi … khi estimate chỉ nên tính 5, cao lắm thì 6, còn nếu tính 8 chắc chắn phải OT mới keep được deadline.

### 3. Phân loại dự án và cách ước tính
Có nhiều phương pháp estimate mà các bạn đã từng nghe như Delphi, COCOMO… nhưng trong các dự án phần mềm thì mình thấy dùng WBS (Work Breakdown Structure) vẫn là chuẩn nhất. Nó có điểm lợi là phân chia rạch ròi công việc ra từ đầu cho tới cuối dự án dựa theo scope mà khách yêu cầu, có thể base để lên Plan-Schedule cho team luôn.
Ngoài ra còn 1 yếu tố nữa, nếu các bạn làm với Nhật thì sẽ biết được mức độ kỹ lưỡng của họ. Nếu mình break được công việc ra thành nhiều khối nhỏ họ sẽ dễ đánh giá và approve cho bản estimate mà mình đưa.

**Maintenance**

Đối với dòng dự án này chúng ta cần tỉnh táo phân tích rõ phạm vi maintain và mức độ ảnh hưởng của các module tới phần còn lại của hệ thống. Đối với những Framework và source được tổ chức tốt cộng với tính độc lập cao của function – method ta sẽ đỡ mất công hơn. Vậy nên trước khi estimate ta cần phải đọc và hiểu cấu trúc source, đặc biệt là phần common thì mới đưa ra được phương án tốt nhất. Về productivity maintain project có hệ số 1.2 đến 1.5 so với code mới. Ví dụ code java có productivity là 2.5 KLOC (2500 line code/1tháng) thì maintain thường rơi vào khoảng 3k đến 3.5k. Cách tính LOC thì không phải chỉ những dòng thêm mới mà cả những dòng chỉnh sửa – xoá cũng phải được liệt kê vào.

Các đầu mục cần list ra :
 1.  Chuẩn bị môi trường – tài liệu
 2.  Phân tích source
 3.  Phần update : cần phân tích độ khó của yêu cầu để đưa ra productivity hợp lý và ước lượng số LOC cần update.
 4.  Phần delete : cần xem xét mức độ ảnh hưởng tới các module khác để thêm bớt thời gian test lại hệ thống.
 5.  Phần add new : nếu có phần tương tự đã có sẵn thì set produtivity cao hơn còn nếu không phải theo qui chuẩn (của công ty bạn qui định đối với năng suất dev trên các ngôn ngữ – FW)
 6.  Test UAT : nếu khách yêu cần thêm cả CT hay IT cũng cần phải đưa vào Estimate.
==> Tổng tất cả lại tính ra số MM bước đầu, sau đó cộng với buffer risk (10%) và task quản lý (10%) sẽ ra được con số cuối cùng.

**Migration**

Có rất nhiều loại : Migration Platform, Migration Language, Migration Version, Migarion database. Đối với dòng dự án này thông thường có tool hỗ trợ, nếu không phải tự tay code ra để dùng. Thời gian code tool cũng sẽ được tính vào trong estimate nhưng đổi lại phải nâng Productivity cho phần update code sau khi converted. Hoặc cũng có nhiều trường hợp estimate dựa trên hình thức làm thủ công nhưng khi triển khai thực tế mình tự code tool để nâng cao năng suất. Cái này không cần cho khách biết vì chuyện nội bộ, mình code tool mà tool không chạy được mình chịu nên nếu làm được tool ngon thì là của mình – không phải của khách.

Language : ta thường gặp nhất là Lotus Node => Sharepoint, Cobol => Java, Orther => Java, Other => C#, VB => VB.Net …

Cách làm tối ưu nhất vẫn là lấy mẫu thử (sampling) theo 3 cấp độ : Khó + trung bình + dễ, sau đó cho dev thử (hoặc tự xử nếu code tốt) rồi đưa ra con số. Bước tiếp theo là phân tích module đánh trọng số, sau đó kết hợp với con số productivity ở bước đầu ta sẽ có được con số cuối cùng.

Verion : Hay gặp nhất là Java old => Java new version, .Net old => .Net new, C => GCC … cách làm cũng là lấy mẫu thử rồi tính toán.

Database : DB2 => SQL, Oracle => SQL, Other => Oracle, Other => SQL, etx => etc … Cần xác định rõ môi trường 2 DB có kết nối được với nhau không, nếu có thì tool migration data có hỗ trợ tốt không. Ví dụ Oracle => SQL thì có tool SSMA (SQL Server Migration Assistant) của Microsoft hỗ trợ rất tốt nhưng điều kiện 2 server phải thông nhau. Trường hợp không thông thì cần phải get DB cũ lưu ra file từng table riêng => convert DDL => convert Data => Create Data/table/index/sequence… => Import => Test. Các thông số mình cần khách cung cấp : Số lượng table – view – procedure, record, độ phức tạp của dữ liệu …

**Development**

Đầu tiên là xác định scope : Design => UAT, thì khách cần mình làm công đoạn nào. Sau đó cũng WBS nó ra từng phần nhỏ, ứng mỗi phần lấy mẫu thử rồi tổng hợp lại. Thông số quan trọng nhất mà các bạn cần phải nắm đó là Productivity của ngôn ngữ. Từng công ty sẽ có các thông số khác nhau, ví dụ Java thông thường là 2k5 KLOC nhưng cũng có nơi 2k có nơi 2k7. Riêng dev Nhật thì tầm 3k5 .

Tỉ lệ % giữ các công đoạn – tương ứng độ khó : Design – code – test

Giả sử tất cả các module đều có độ khó trung bình, sau khi phân tích module và chức năng hệ thống ta tính được con số 15MM dành cho design thì tương ứng sẽ là 10MM code và 5MM test. Trong đó basic design 35% ~ 5MM, detail design 45% ~ 7MM, program design (detail of detail design) 20% ~ 3MM.

## 4. Những mẹo nhỏ khi Estimate một dự án
### Bước 1. Phân bổ thời gian dành cho việc estimate
Nếu bạn thực sự muốn đội của mình có thể đưa ra estimate chính xác nhất, cố gắng đừng bắt đầu câu chuyện bằng những câu kiểu như “tôi cần bạn hoàn thành toàn bộ các đầu việc này trước thời điểm X”.

Đưa ra thời điểm cần hoàn thành trước, rồi mới yêu cầu anh em estimate sẽ khiến cho việc estimate không còn đúng với lẽ tự nhiên. Kéo theo kết quả estimate sẽ không gần với thực tế.
Khi anh em dev bị giới hạn thời điểm deadline và liên tục bị giục hoàn thành việc estimate, mọi người sẽ khó có thể nhìn nhận các yếu tố phức tạp của bài toán để estimate, và sẽ estimate theo kiểu cố gắng làm hài lòng người quản lý là chính.

Do vậy, tốt hơn hơn là cho phép cả team một khoảng thời gian, tùy vào khối lượng của project để nhìn nhận được các vấn đề phức tạp tiềm ẩn và không đề cập tới hạn deadline của các tính năng trước khi estimate.
Việc này để để sau khi estimate xong, để quyết định xem có nên xóa một phải chức năng phức tạp quá hay không.

### Bước 2. Chia nhỏ công việc thành các công việc con
Thông thường vào thời điểm bắt đầu dự án, bạn không có đủ thông tin chi tiết về tính năng phải làm. Do vậy, số ngày mà bạn estimate được thường không phản ánh đúng số ngày thực tế.
Tuy nhiên, nếu bạn chia nhỏ công việc cần estimate thành những công việc nhỏ hơn, bạn sẽ có khả năng nhìn thấy được cụ thể những bước cần phải. Do vậy, bạn sẽ estimate được chính xác hơn.
>  "Khi bạn còn chưa biết được cụ thể bạn sẽ làm những gì, bạn sẽ không thể biết khi nào bạn sẽ hoàn thành nó" –Joel Spolsky, Stack Overflow CEO

Nguyên tắc ở đây là bạn cứ tiếp tục chia nhỏ task cho đến khi thời gian estimate hoàn thành mỗi task nhỏ là từ 8-10h.

### Bước 3. Phân loại task
Sau khi chia nhỏ công việc thành những công việc nhỏ hơn, bạn cần lùi lại một chút để nhìn được tổng thể những công việc sẽ phải làm. Bạn sẽ để ý thấy được có vô vàn những việc bạn có thể bắt tay vào làm luôn, một vài việc vẫn còn lờ mờ, và một vài việc vẫn có nhiều điều bí ẩn như là vùng tối phía bên kia của mặt trăng.

**Task đã rõ những việc phải làm (Known Tasks)**
Đây là những task mà bạn đã biết rõ input, output và cụ thể các bước cần phải làm để có được output. Do vậy thời gian estimate để hoàn thành công việc này là xác định.

**Task mới chỉ rõ một phần những việc phải làm (Partially Known Tasks)**
Đây là loại task mà bạn mới chỉ nắm được input, output và nắm được sơ bộ cách làm. Tuy nhiên bạn ước lượng sẽ mất chừng 15-30 phút để tìm hiểu thêm hoặc cần thêm sự trợ giúp từ những người đã gặp vấn đề tương tự để có thể hoàn thành được task.

**Task không xác định (Unknown Tasks)**
Thường những task này sẽ cần bạn dành khoảng vài giờ tới cả ngày để hiểu công nghệ mà bạn sẽ định sử dụng để hoàn thành task.

> Việc xây dựng phần mềm hiếm khi là việc xây dựng những thứ bạn đã biết cách nó hoạt động như thế nào. Thông thường bạn sẽ cần phải tìm những công cụ, nền tảng API khác khau để giải quyết các bài toán. Do vậy, thời gian dành cho việc tìm hiểu hay nghiên cứu là yếu tố quan trọng cần phải được tính vào estimate.

Sau khi phân loại task, bạn cần cố gắng đặt mục tiêu tìm hiểu thêm về project để cố gắng chuyển task Partially Known Tasks và Unknown Tasks về loại Known Tasks

### Bước 4. Estimate lại
Tới bước này, tất cả các task của bạn đã được chuyển thành Known Task, bạn đã có thêm nhiều thông tin cụ thể hơn cho công đoạn implement. Do vậy, kéo theo là kết quả estimate sẽ chính xác hơn.

## 5. Một số lưu ý khi Estimate
### Điều 1. Lưu ý những câu có từ "Chỉ" - "Just"
Có một lệ bất thành văn là thường những task có nhiệm vụ "Chỉ" làm một tính năng nào đó:

`- Task này chỉ nhỏ như con muỗi ấy mà!`

`- Chắc chỉ mất 5 phút để fix lỗi thôi`

`- Chắc task này không chiếm quá 15 phút đâu.`


Những task này ban đầu nhìn có vẻ tốn ít thời gian, nhưng té ra lại thường là loại task tốn kém nhất. Những loại task như thế này hay là nguyên nhân khiến team trễ deadline.

Nguyên nhân chính khiến những loại task này chiếm nhiều thời gian hơn mong đợi là chúng thường xuất hiện từ các cuộc họp standup hàng ngày hoặc qua những cuộc trò chuyện giữa mọi người. Khi dev không có đủ thời gian để xem xét độ phức tạp của task, họ sẽ đánh giá thấp độ phức tạp và dẫn đến estimate sai.

### Điều 2. Người nào làm, người đó estimate
Người được giao nhiệm vụ làm task thường là người hiểu rõ hoặc có động lực để hiểu rõ nhất công việc phải làm. Người này sẽ có khả năng nhìn thấy những chi tiết lặt vặt mà cũng không kém phần quan trọng của công việc. Đây là những yếu tố quan trọng để có được estimate chính xác nhất.

### Điều 3. Đừng bỏ qua những task lặt vặt
Thường trong quá trình thực hiện project, bạn sẽ nhận được mộ lô những task lặt vặt kiểu như:
 - Checkbug
 - Fixbug
 - Review code
 - Build App
 - Deploy App
Nhìn qua thì những việc này không tốn thời gian lắm. Tuy nhiên luôn có vấn đề nào đó xảy ra. Và bạn sẽ khó mà lường trước được độ phức tạp. Hơn nữa, ngay cả khi không có vấn đề, khi bạn cộng gộp thời gian lại, bạn sẽ có được con số không hề nhỏ.

### Điều 4. Xem xét tới một vài khả năng gây ra việc delay bất thình lình
Một thành viên nào đó đột nhiên bị ốm, hoặc có kỳ nghỉ mát, hoặc có một vài ngày nghỉ bắt buộc, hoặc một vài bug khủng xuất hiện vào những lúc không ngờ tới. Bạn cố gắng dựa vào kinh nghiệm đã làm của mình, để xem xét đưa những yếu tố này vào kết quả estimate của mình.

Chú ý ở đây là trong quá trình làm project, bạn cố gắng để ý tới các sự kiện không mong đợi, khả năng xuất hiện của bug theo thời gian để có thể có những chú ý cho những lần estimate tiếp theo.

***Estimate là một công việc khó, thường không thể chính xác được, nhưng hãy estimate một cách chuẩn xác nhất có thể. Vì estimate sai có thể khiến cả team lâm vào tình trạng khốn đốn, OT triền miên, và quan trọng hơn là mất đi niềm tin của khách hàng, đôi khi còn phá hỏng luôn cả một dự án.***

*Nguồn: sưu tầm.*