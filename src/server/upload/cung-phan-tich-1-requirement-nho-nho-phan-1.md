Kể từ vụ bé trai tử vong tại trường Gateway, cũng như gần đây có 1 trường hợp 1 bé bị bỏ quên trên xe, mình thấy một số trường  có nhu cầu tạo 1 ứng dụng liên quan đến việc theo dõi trẻ đi học bằng xe bus.

Vậy hôm nay chúng ta cùng nhau phân tích requirement của ứng dụng "**Theo dõi con đi học**" xem sao nhé. 

*Lưu ý: Những phân tích dưới đây đều xuất phát từ những suy luận, kinh nghiệm của bản thân, vậy nên có gì mọi người góp ý nhẹ tay nha!*

# 1. Quy trình đón học sinh bằng xe bus

*Bây giờ mình sẽ đưa ra quy trình đón học sinh ở một trường tiểu học, mọi người cứ đọc bình tĩnh nhé:*

> Trước khi vào năm học, phụ huynh sẽ đăng ký với nhà trường về việc con có đi học bằng xe bus hay không. Việc đăng ký này phụ huynh sẽ điền form bằng giấy, đưa cho học sinh để nộp cho cô chủ nhiệm và phải hoàn thành trước ngày bắt đầu học 2 tuần. Nhà trường sẽ tập hợp danh sách các học sinh đi xe rồi phân chia học sinh về các xe, lên lộ trình di chuyển cho các xe. Sau khi hoàn thành vụ này thì nhà trường sẽ thông báo cho phụ huynh địa điểm đưa đón học sinh (gần nhà của nhiều học sinh trong cùng 1 khu vực nhất), số điện thoại của cô bảo mẫu trên xe, thông tin về xe (loại xe, màu sắc).
> 
> Đến thời điểm đón học sinh, xe bus sẽ đi qua từng chặng để đón học sinh. Đến mỗi chặng bảo mẫu sẽ điểm danh các học sinh lên xe. Nếu học sinh nghỉ thì phụ huynh phải báo cho bảo mẫu, hoặc nếu muộn quá 10' xe sẽ đi tiếp, việc đưa học sinh đến trường lúc này do phụ huynh tự chịu trách nhiệm. Khi đủ học sinh tại các chặng thì xe sẽ đi tiếp.
> 
> Khi đến trường xe sẽ đi thẳng vào trong sân trường. Cô bảo mẫu sau đó sẽ cho học sinh xuống xe và tự về lớp, riêng với học sinh lớp 1 thì bảo mẫu sẽ đưa vào tận lớp. Lúc xuống xe bảo mẫu sẽ không điểm danh nữa mà chỉ nhìn qua xem còn học sinh nào trên xe hay không.

# 2. Cùng mô hình hóa lại quy trình này
Để trực quan hóa, ta nên sử dụng phương pháp mô hình hóa lại các quy trình để từ đó dễ hình dung quy trình tổng quan, rồi tìm kiếm các vấn đề xảy ra trong cả quy trình này và đưa ra cách giải quyết nó.

Trong bài này mình sẽ sử dụng 1 loại biểu đồ hơi lạ chút đó là BPMN, nếu ai chưa biết thì có thể click vào [đây](https://viblo.asia/p/cung-tim-hieu-ve-business-process-modeling-notation-bpmn-Qbq5Qm8m5D8) để đọc nhé.
Quy trình trên sẽ được tách thành 2 giai đoạn riêng biệt: **Đăng ký**, **đưa đón**.

*Ảnh hơi nhỏ, mọi người chịu khó click vào zoom lên nhé*

## Đăng ký
![](https://images.viblo.asia/de9e75ef-f514-4f4e-80f7-3d67e9a7f662.png)

## Đón học sinh
![](https://images.viblo.asia/3807e8d0-5461-4f9a-9a23-9701edc1b0e7.png)

# 3. Tìm hiểu vấn đề
Ok, giờ chúng ta hãy nhìn vào 2 sơ đồ trên, ta thấy được những vấn đề gì ở đây nhỉ ?

## Đăng ký
1. Phụ huynh phải viết đơn bằng tay và giao cho học sinh nộp => dễ thất lạc đơn do học sinh không cẩn thận giữ 
2. Nhà trường phải thực hiện các tác vụ sau 1 cách thủ công: tổng hợp danh sách học sinh đi xe, phân chia học sinh vào các xe, lên lộ trình di chuyển cho các xe => mất nhiều công sức
3. Nhà trường phải thông báo cho phụ huynh bằng cách nhắn tin đến từng phụ huynh => mất nhiều công sức cho nhà trường

## Đón học sinh
1. Để thông báo học sinh nghỉ, phụ huynh cần phải biết số điện thoại của bảo mẫu, mà nhiều khi có các phụ huynh không lưu & mất tin nhắn thông báo số của bảo mẫu => không liên lạc được với bảo mẫu
2. Bảo mẫu tiếp nhận thông tin xin nghỉ của học sinh 1 cách lẻ tẻ => khó tổng hợp lại, nhiều khi gạch nhầm tên của học sinh trên danh sách điểm danh
3. Điểm danh thủ công => dễ sai lệch
4. **Không điểm danh khi học sinh xuống xe** => đây là lý do chính dẫn đến sự việc thương tâm tại trường Gateway

# 4. Cùng nghĩ solution nào
Mình sẽ trình bày luôn solution ở dưới dạng requirement để các phần sau triển khai các bước tiếp theo luôn
*Ở phần này chúng ta chỉ cần đưa ra requirement ở mức sơ khai, các phần sau sẽ chi tiết hơn*

### Nhà trường
1. Quản lý được danh sách các học sinh đăng ký đi xe bus
2. Tự động phân chia học sinh vào các xe
3. Tự động lên lộ trình di chuyển cho các xe
4. Tự động nhắn tin về thời gian đón, điểm đón cho phụ huynh
5. Quản lý được danh sách các xe, danh sách bảo mẫu, lái xe theo từng xe
6. Thay đổi được thông tin chuyến xe, bảo mẫu phù hợp theo ngày trong trường hợp có xảy ra phát sinh (xe hỏng, bảo mẫu nghỉ, ...)

### Phụ huynh
1. Có thể đăng ký cho con đi xe bus với nhà trường
2. Có thể theo dõi được hành trình của con đến lớp (không cần cụ thể dạng map, chỉ cần thể hiện thành các step)
3. Có thể nhận được các thông báo bất thường về tình hình của con
4. Có thể báo được việc hôm nay con nghỉ học
5. Có thể xem thông tin của bảo mẫu đi cùng xe (tên, số điện thoại, ...)

### Bảo mẫu
1. Có thể xem được danh sách các học sinh đi xe (xem được học sinh nào nghỉ)
2. Có thể cho học sinh điểm danh bằng cách quẹt thẻ khi lên, xuống xe
3. Nhận cảnh báo khi thiếu học sinh quẹt thẻ
4. Xem được thông tin của học sinh, phụ huynh học sinh

# 5. Tạm kết
Ok, trước mắt phần này chúng ta đưa ra được những requirement trên đây để có thể cùng nhau phân tích một hệ thống giúp kiểm soát việc đi xe bus của học sinh.

Phần sau chúng ta sẽ cùng tiến thêm 1 bước trong việc phân tích hệ thống này nhé!