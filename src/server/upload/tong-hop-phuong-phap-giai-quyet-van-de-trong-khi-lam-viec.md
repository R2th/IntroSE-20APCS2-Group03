Khi phát sinh vấn đề trong khi làm việc dưới đây là sổ tay các bước để giải quyết.

### 0. Bắt đầu
Khi xảy ra vấn đề thì chúng ta có xu hướng rơi vào trạng thái hoảng loạn. Vì thế mà tôi đã thực hiện theo các bước dưới đây 

### 1. Kiểm tra vấn đề
Khi phát sinh vấn đề phần lớn chúng ta đều không hiểu rõ nguyên nhân gốc rễ của vấn đề. Vì thế mà điều đầu tiên là cần xác định rõ vấn đề là gì 

#### 1.1 Đã xảy ra vấn đề gì
Kiểm tra xem ở thời điểm phát sinh vấn đề có gì đặc biệt xảy ra
ví dụ: có error phát sinh không ?

#### 1.2 Trước khi phát sinh vấn đề thì có gì đặc biệt
Trước khi phát sinh vấn đề thì có vừa xảy ra cảnh báo nhưng vẫn thực hiện chức năng thành công gì không. Vì thế hãy kiểm tra kết quả các lệnh ở thời điểm trước khi phát sinh vấn đề.
Ví dụ: xuất hiện layout khác so với layout mà dự định sẽ xuất hiện

#### 1.3 Vấn đề là gì 
Tổng hợp lại các thông tin và xem vấn đề ở đây là gì 
Ví dụ: bản thân code có bị sai không? error notifition có hoạt động không,...

Đến đây hãy viết các thông tin ra và kiểm tra lại vấn đề một lần nữa 

### 2. Xác định vấn đề
Tiếp theo tổng hợp những thông tin đã kiểm tra được về vấn đề

#### 2.1 Xác định chỗ phát sinh vấn đề
Kiểm tra xem nguyên nhân vấn đề đang ở đâu
Tiến hành song song việc kiểm tra mã lỗi (error code) và nguyên nhân phát sinh vấn đề
Ví dụ: ở dòng X đang phát sinh ra lỗi

#### 2.2 Kiểm tra nguyên nhân phát sinh vấn đề
Kiểm tra xem tại sao lại phát sinh vấn đề này. Xem lại những dòng lệnh lúc nãy kiểm tra xem tạo sao lại có lỗi, có sự thiếu sót nào ở đây không ?
Ví dụ: Có thiếu dấu chấm phẩy không ?

#### 2.3 Thiết lập các giả định
Cũng có trường hợp là xác định được vấn đề xảy ra ở đâu nhưng lại không xác định được tại sao lại xảy ra vấn đề này
Đặc biệt, đối với những người khi sử dụng framework mới thì thường xuyên phát sinh tình trạng này
Ví dụ: Thiếu thêm controller, view mới. Khi paste link mới và redirect đến trang mới thì xuất hiện lỗi.
Trường hợp này  dành bớt chút thời gian để giả thuyết
Ví dụ: file rooting đang đặt ở đâu, và phải bắt buộc thêm vào đó nhưng lại đang chưa thêm.

Ngoài ra chúng ta có thể hỏi Google.
Nếu điều tra khoảng 15' mà chưa tìm ra được vấn đề thì nên đặt câu hỏi với bạn bè

### 3. Giải quyết vấn đề
Điều tra đến đây rồi cùng tìm cách giải quyết vấn đề
#### 3.1 Ước lượng thời gian cần thiết để giải quyết vấn đề
Đầu tiên, việc chỉnh sửa sẽ mất bao nhiêu thời gian 
Ví dụ: nếu tìm ra bug của toàn hệ thống phạm vi ảnh hưởng rộng thì sẽ tốn nhiều thời gian của bản thân 
Ví dụ: nếu chỉ là bug thiếu dấu chấm phẩy thì chỉ sửa không đến 30 giây phải không

#### 3.2 Báo cáo ước lượng thời gian sửa
Vấn đề dù lớn hay dù nhỏ thì cũng sẽ mất thời gian để xử lý.
Ví dụ trường hợp thời gian hoàn thành task muộn hơn trên 1h, tiến hành báo cáo.
Đầu tiên báo cáo với cấp trên xem hiện tại đang xử lý đến đâu, vấn đề đang phát sinh là gì, cần bao nhiêu thời gian nữa để sửa xong và có chỗ nào khó xử lý không 

Kết quả cấp trên sẽ dựa vào tình hình xử lý vấn đề để nắm được và đưa ra phán đoán phù hợp.

#### 3.3 Giải quyết vấn đề
Tiến hành sửa những điểm khi tiến hành estimate. 
Trường hợp sửa mất thời gian hoặc estimate khó khăn thì cần thông báo lại cấp trên là sẽ mất thời gian để nhận được chỉ thị tiếp theo.

### Extra. Trường hợp không nắm được cách giải quyết vấn đề, một số chú ý khi đặt câu hỏi
Có rất nhiều trường hợp ở thời điểm estimate thì chưa nắm rõ cách sửa như thế nào cho tốt.
Ở trường hợp đó thì thường xuyên nhận được câu hỏi của cấp trên là hãy đưa ra cách sửa
Trong trường hợp đó thì tiến hành đặt câu hỏi như các điểm dưới đây
1.  Điều chỉnh lại câu hỏi 
Kiểm tra lại tất cả nội dung ở thời điểm phát sinh vấn đề
Vì cấp trên bận nên tự nhiên đặt câu hỏi thì sẽ không hiểu cái gì cả nên hãy đăng kí ticket và ghi nội dung cụ thể (URL, number) vào trong đó

2. Giả thuyết và tổng hợp các kết quả của giả định đó
Khi có điểm không hiểu thì cần đặt ra giả thuyết nhưng dù là hướng tiếp cận nào đi chăng nữa thì cũng cần truyền đạt lên cấp trên cách tiếp cận.
Vì thế cần tổng hợp thông tin kiếm tra lại cách điều tra theo thứ tự nào
Ví dụ:
Giả thuyết là có vấn đề ○○○
theo giả thuyết đó thì đã tiến hành điều tra
kết quả điều tra đã hiểu được XX
giả thuyết có đang sai không 

### Tổng kết
Trên đây là tổng hợp các bước khi giải quyết vấn đề
Không hẳn là theo các bước trên thì sẽ giải quyết được chính xác vấn đề nhưng mà đó là các bước nên tham khảo. Nếu các bạn có ý kiến xin hãy comment.