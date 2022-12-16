Bài viết được dịch từ bài đăng trên trang Qiita (được hơn 1k likes)

https://qiita.com/yutakakn/items/b0e36196df474acf9359

# Mở đầu
Bài viết này sẽ giới thiệu về cách estimate effort bỏ ra khi làm việc.
# Effort là gì?
Effort có nghĩa là tổng thời gian ước tính cho đến khi hoàn thành 1 task nào đó trong công việc. Nó khác với nghĩa của cụm từ TAT (Turnaround time) xuất hiện trong kỳ thi FE.

Ví dụ, trong trường hợp có một task cần 40 tiếng để hoàn thành, vậy có thể nói effort chính là “40 tiếng”. Nếu một ngày làm việc 8 tiếng, có thể hiểu “40 tiếng” là 5 man-day. Ngoài ra, nếu một tháng đi làm 20 ngày thì 40 tiếng đõ sẽ tương đương 0.25 man-month.

Thông thường man-day và man-month sẽ là đơn vị được sử dụng để tính effort.

Thời học sinh hẳn bạn không để ý lắm đến effort nhưng nếu trở thành kỹ sư IT làm việc trong công ty thì cần phải biết về effort.
# Tại sao cần có ý thức về effort?
Cần có ý thức về effort là bởi vì thời gian làm việc mà nhân viên có thể làm là có hạn.

Theo quy định của Luật lao động, nhân viên làm việc tại một công ty, không phải phía vận hành công ty sẽ có giới hạn về thời gian làm việc tối đa. Năm 2015, do vụ việc làm quá giờ ở một doanh nghiệp lớn, quy định về việc làm thêm giờ trở nên nghiêm ngặt hơn. Người tử vong do làm việc quá sức là do trong một tháng làm thêm giờ khoảng 80 tiếng. 

Ngoài ra, cũng một phần vì vấn đề ngân sách. Thông thường nhân viên văn phòng được trả lương theo giờ làm việc nên dù đảm bảo tiêu chuẩn về luật lao động đi nữa, nếu ngân sách công ty không đủ thì vẫn phải hạn chế làm thêm giờ. 

Dưới thời kỳ kinh tế bong bóng hơn 20 năm trước, vốn chẳng có cụm từ “cải cách cách làm việc", công ty cũng có rất nhiều tiền nên nhân viên xem việc làm thêm một cách bất thường là một việc bình thường. Thế nhưng thời đại đó đã qua rồi.
# C trong QCD
Các kỹ sư IT khi làm việc cần ý thức được về QCD.

* Q=Quality

* C=Cost, chính là effort

* D=Delivery

Bài viết này sẽ nói về chữ C trong QCD.
# Tầm quan trọng của việc estimate effort
Trước khi bắt đầu làm task, đầu tiên phải tiến hành estimate effort để làm task đó.

Như trên tôi có nói, nếu là một kỹ sư IT làm việc chuyên nghiệp thì sẽ không đổ thời gian vô hạn vào task, mà phải giới hạn về thời gian có thể bỏ ra cho task đó. 
Thêm vào đó, 1 task có khi phải thực hiện song song với task khác, nếu bỏ ra effort nhiều hơn dự định để làm 1 task, thì không đủ effort để làm task khác, và kết quả là tiến độ task sẽ bị chậm.

Vậy nên đầu tiên phải chốt được “Giá trị ước tính" cho effort làm task. Ngoài ra còn phải khiến giá trị ước tính (effort est) này không vượt quá effort sẽ sử dụng thực tế, nên công việc estimate này thực tế là task có độ khó cao mà nhiều người cảm thấy khó khăn.  
Tóm lại, quan trọng là đạt được:


```
Effort thực tế < Effort ước tính
```


Nếu lỡ như effort thực tế vượt quá effort estimate mà chỉ có cách tiếp tục cho đến lúc hoàn thành, effort để hoàn thành các task khác giảm xuống mà cũng không moi đâu ra được effort bổ sung thì dev sẽ bị dồn vào thế khó khăn.

Nói chung effort estimate chính là cái bảo về chính bản thân mình nên quan trọng là không để nó lớn hơn effort thực tế. Nếu effort thực tế mà vượt quá effort estimate thì đại khái trách nhiệm thuộc về người đã đưa ra estimation.
# Những case không cần estimate effort (?)
Cần chú ý khi không estimate effort mà nhận yêu cầu từ cấp trên kiểu như:
- Dự án gấp, hãy làm trong MM/DD nhé.

Khả năng là đang ưu tiên lịch delivery nên buộc phải thực hiện với effort cố định cho đến khi release. Nếu đó là việc mà làm theo cách lung tung cũng không sao thì có lẽ không cần estimate thật, nhưng tôi không khuyến khích điều này.

# Cách estimate
## Khái quát
Việc biểu hiện estimate ra bằng công thức một cách logic là rất quan trọng. Dở nhất là estimate tuỳ tiện.
Ví dụ công việc của kỹ sư IT là lập trình viên thì hãy để bạn ấy estimate cho “fix bug phần mềm”. 
Ví dụ với cách estimate như này:
"Nói chung chưa làm thì chưa biết nhưng chắc khoảng 3 ngày".

3 ngày nên effort ước tính sẽ là 3 man-day (24h). Tuy nhiên con số này lại không có một cơ sở nào cả nên không có tính tin tưởng. 
Nhưng nếu đây là kết luận của một kỹ sư có kinh nghiệm thì lại không có vấn đề gì. Vì tính tin cậy đến từ trực giác của một người có trên kinh nghiệm chứ không phải một con số được đưa ra tùy tiện.
Để tiến hành estimate có độ chính xác cao, không đại khái, thì cần chú ý những điểm quan trọng sau.
* Chia nhỏ task và đưa ra từng con số nhỏ
* Feedback lại thành tích trong quá khứ
* Cộng thêm buffer
* Nhờ cấp trên check chéo
## Chia nhỏ task
Nếu phát triển phần mềm theo sở thích thì thường rất tập trung vào code, cơ bản sẽ có flow như sau:
* Điều tra nguyên nhân bug
* Sửa code phần có bug
* Cho hoạt động để confirm chỉnh sửa

Tuy nhiên khi làm việc nghiêm túc thì các công đoạn sẽ có nhiều thay đổi. Tùy vào từng công ty và dự án mà văn hóa sẽ khác nhau nhưng thường có flow như sau:

* Điều tra nguyên nhân bug
* Sửa đoạn code có bug
* Chạy chương trình, confirm chỉnh sửa
Nếu là công việc thì các công đoạn sẽ thay đổi khá nhiều. Tùy công ty, tùy dự án mà sẽ khác nhau nhưng thường theo flow như sau:
* Điều tra nguyên nhân bug
* Phán đoán xem có phải nguyên nhân gốc rễ không. Nếu không thì quay lại 1.
* Đánh giá tại sao phát sinh bug
* Xem xét phương pháp sửa bug. Sửa sao cho phạm vi ảnh hưởng là nhỏ nhất
* Nếu là bug về mặt thiết kế cấu trúc thì cần phải sửa lại design
* Sửa source code
* Tiến hành review chéo. Làm 5,6 lần trước khi hoàn thành.
* Tiến hành unit test với chỗ đã chỉnh sửa
* Tiến hành funtion test ở chỗ chỉnh sửa
* Tiến hành regression test ở chỗ chỉnh sửa
Như trên, bạn phải hiểu rằng không chỉ đơn giản sửa source code cho xong là được. Chỉ một từ “fix bug” thôi nhưng được chia nhỏ làm nhiều đầu mục. Mình sẽ phải estimate cho từng đầu mục đó.

|Item|Effort(H)|
| -------- | -------- |
|Điều tra nguyên nhân|8|
|Xem xét cách fix|3|
|Sửa design|2|
|Sửa code|2|
|Tạo TCs|2|
|Review|2|
|Unit test|3|
|Funtion test|5|
|Test quy hồi|3|
|Tổng|30|

##  Thành tích trong quá khứ

Khi làm task, có nhiều điều mà mình không thể biết được nếu thực tế chưa bắt tay vào làm thử nên nếu có thành tích, kinh nghiệm trong quá khứ thì có thể check trước được có cách biệt gì nhiều so với effort đã estimate không.
Ví dụ như giá trị trung bình cho task sửa bug là 30h nhưng nếu effort đã estimate là 20h thì sẽ thấy chênh lệch vì đang nhỏ hơn giá trị trung bình và với effort ít như thế thì có thực sự làm hết việc được không

## Cộng thêm buffer

Buộc phải cộng thêm bufer vào effort đã estimate. Buffer là lượng effort dư được cộng thêm vào. Vì estimation suy cho cùng chỉ là giá trị ước tính, khi tiến hành làm thực tế sẽ xuất hiện những việc chưa lường trước được, có thể có những items làm lâu hơn mình nghĩ.
Bởi vậy ta cần công thêm một lượng dư effort cho những rủi ro đó.
Bạn nên nhân effort đã estimate với 1.5. Con số 1.5 không có ý nghĩa gì đặc biệt, nó chỉ đơn giản là con số rút ra từ kinh nghiệm của tác giả.
Như vậy với ví dụ bên trên thì sau khi nhân 1.5 với 30h, ta sẽ có 45h.

## Nhờ cấp trên check chéo

Cuối cùng hãy nhờ cấp trên cross check lại effort đã buffer.
Cấp trên sẽ check cho bạn xem còn sót item nào không, có chỗ nào effort ít quá không, và nếu như có vấn đề thì bạn sẽ phải sửa lại estimation.
Thêm vào đó, việc này còn thể hiện cấp trên của bạn cũng có trách nhiệm đối với estimation đưa ra.

# Kết luận

Khi tiến hành dự án, lượng effort chắc chắn dư ban đầu cứ càng ngày càng thiếu. Nguyên nhân thì có nhiều nhưng việc estimate thiếu rất hay xảy ra.
Hãy estimate cẩn thận để tiến hành công việc thuận lợi và để không bị trách mắng “Tại sao lại estimate ít như thế này” các bạn nhé.