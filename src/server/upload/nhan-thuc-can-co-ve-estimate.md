Ở bài viết này, sẽ giải thích về phương pháp estiamte effort cần bỏ ra khi làm một công việc

### Effort(工数) là gì ?
Effort ở đây được hiểu là tổng hời gian cần bỏ ra để hoàn thành một công việc. Không tính trong trường hợp từ lúc bắt đầu đến lúc kết thúc giữa chừng có phát sinh công việc ngoài dự kiến.

Ví dụ: Trường hợp cần 40 giờ để làm một công việc, thì effort ở đây là 40 giờ. 
Trường hợp 1 ngày 8 tiếng làm việc, thì có thể nói là 40 giờ tương đương với 5 người làm trong 1 ngày(5 man day). Ngoài ra nếu 1 tháng tính là 20 ngày làm việc thì tương ứng với 0.25 người làm trong một tháng (0.25 man month)

Thông thường thì đơn vị của effort sẽ là man day hoặc man month

khi còn là sinh viên thì khái niệm effort hầu như không được mọi người để ý nhưng mà đối với một kỹ sư IT khi làm việc thì nhất định cần phải có ý thức về khái niệm này.

### Tại sao lại cần phải có ý thức về effort
Bởi vì thời gian làm việc của mỗi người chỉ có trong khung thời gian nhất định
Không chỉ là phía vận hành của công ty mà nó còn là phía từng nhân viên của công ty nữa. Hiện tại theo tiêu chuẩn luật lao động thì có giới hạn thời gian làm việc tối đa (Tối đa là làm thêm 80 giờ trong một tháng đối với bên Nhật)

### QCD
Đối với một kỹ sư IT thì khi làm việc cần có nhận thức đầy đủ về QCD
* Q = Quality
* C = Cost
* D = Delivery  
Trong bài viết này sẽ chỉ trình bày liên quan đến phần "C" trong 3 phần trên

### Tính quan trọng của việc estimate
Trước khi bắt đầu một công việc, đầu tiên chúng ta tiếng hành việc estimate thời gian cần thiết để làm công việc đó.

Như đã trình bày ở trên thì đối với một kỹ sư IT chuyên nghiệp thì không phải đơn thuần là estiamte kiểu bỏ ra càng nhiều thời gian cho công việc đó mà là giới hạn thời gian tối đa cần thiết để làm công việc đó.
ngoài ra, cũng có những trường hợp khi thực hiện công việc đó thì phải thực hiện song song cùng 1 công việc khác nữa nên thời gian vượt qua mức giới hạn trên cho công việc đó làm phát sinh trường hợp tiến độ công việc bị chậm.

Vì thế, thời điểm ban đầu estimate chỉ mang tính dự đoán thời gian cần thiết để làm thôi. Và cái giá trị dự đoán này so với thực tế thì không được lớn hơn. Cái việc estimate này thực tế là một công việc có độ khó cao vì thế mà rất nhiều người không làm tốt dược việc này

Tóm lại
```
Thời gian thực tế < Thời gian estimate
```
thiết lập được việc này là rất quan trọng

Giả sử, trường hợp thời gian thực tế mà nhiều hơn thời gian estimate thì thay vì chỉ còn cách tiếp tục làm công việc đó cho đến lúc hoàn thành, thì hãy xem xét điều chỉnh giảm thời gian của các task khác.

Việc estimate thì hãy tuân thủ sự tự tin của bản thân để làm sao số thời gian thực tế sẽ nhỏ hơn số thời gian bỏ ra là điều rất quan trọng. Ngoài ra, trường hợp thời gian thực tế mà vượt quá thời gian estimate thì hầu như là do trách nhiệm của người đưa ra estimate (hầu như là cấp trên người đã approve estimate đó, nhưng thực tế thì không phải lúc nào cũng vậy)

### Case không cần estimate 
Trường hợp công việc gấp gáp cần thực hiện luôn
Trường hợp ưu tiên deadline, cũng có thể có trường hợp để kịp giao sản phẩm thì có thể làm bỏ quan phần estimate, tuy nhiên không khuyến khích làm theo như thế này.

### Cách estimate
**Khái niệm** 
Estimate thời gian làm một việc quan trọng là việc biểu hiện bằng công thức tính toán một cách lý thuyết. Không được estimate kiểu cảm thấy hợp lý

Ví dụ: Đối với một kỹ sư IT khi estimate một việc sửa bug
Đầu tiên khi chưa làm thử thì chưa thể biết được nên nghĩ là khoảng 3 ngày
3 ngày làm việc nên tương ứng với estimate ở đây là 24 giờ làm việc. Tuy nhiên, con số này không có căn cứ nào cả nên không có tính tin tưởng. Nhưng mà, nếu là một kỹ sư có nhiều kinh nghiệm thì cách làm này lại không vấn đề gì. Estimate không phải là việc tính thời gian theo cảm giác phù hợp mà là dựa trên kinh nghiệm để đưa ra con số thì mới có tính tin tưởng

Để estimate có tính tin tưởng cao thì chú ý các điểm dưới đây
* Đưa ra con sốcho từng phần riêng biệt sau khi đã chi tiết hoá công viêc
* Feedback thành tích trong quá khứ
* TÍnh thêm buffer
* Nhận sự kiểm tra chéo của cấp trên 

**Chi tiết hoá công việc**
Trường hợp phát triển phát mềm thì hầu như chỉ có việc lập trình là nhiều nên phần lớn sẽ theo các bước dưới đây
1. Điều tra nguyên nhân của bug
2. Sửa code 
3. Kiểm tra lại phần sửa code 

Nếu theo các bước trên làm việc thì thời gian của công việc sẽ thay đổi cực kì lớn. Tuỳ theo quy trình của từng công ty hoặc từng project thì sẽ có sự khác nhau nhưng mà thông thường sẽ có những luồng công việc như sau
1. Điều tra nguyên nhân bug
2. Phán đoán nguyên nhân gốc rễ của bug nếu không có thì quay lại bước 1
3. Đưa ra cách giải quyết bug
4. Thảo luận về phương pháp sửa bug để tìm ra phương pháp có phạm vi ảnh hưởng ít nhất
5. Nếu là bug thiết kế thì sửa tài liệu thiết kế
6. Sửa source code
7. Tiến hành Evidence và cross review, lặp lại 5,6 cho đến khi review hoàn thành
8. Viết unit test cho phần code sửa
9. Tiến hành test những chức năng đã sửa
10. Tiến hành test hồi quy

Tuy chỉ nói là sửa bug nhưng có rất nhiều item được chi tiết hoá và sẽ estimate cho mỗi item
| Item | Time(H) |
| -------- | -------- | 
| điều tra nguyên nhân   | 8     |
| trao đổi cách sửa   | 3     |
| sửa thiết kế    | 2   |
|  sửa code  | 2   |
|  tạo item test | 2   |
|  review  | 2   |
|  viết Unit Test  | 3   |
|  test tính năng | 5   |
|  test hồi quy  | 3   |
|  Tổng số  | 30   |

**Thành tích quá khứ**
Công việc này thực tế chưa làm thì sẽ không biết trước được vì thế có công việc tương tự trong quá khứ thì đầu tiên cần kiểm tra xem estimate có sự cách biệt về thời gian không 

Ví dụ: Cùng một công việc sửa bug trung bình mất khoảng 30 giờ nhưng mà lần này estimate lại chỉ có 20 giờ  thì đang có sự khác biệt ngoài ra thời gian đang nhỏ hơn giá trị trung bình nên thực tế với thời gian ít hơn như thế thì có làm được không ?

**Tính thêm buffer**
Nhất định phải thêm buffer vào con số estimate. Vì estimate chỉ mang tính chất là con số dự đoán thực tế khi tiến hành làm việc, sẽ phát sinh những công việc không nằm trong dự doán, ngoài ra có thể có những task mất nhiều hơn thời gian estimate.
Ngoài ra cần có thời gian để đối ứng được với trouble phát sinh thì cần thiết phải có một lượng effort dư thừa.
Nhân 1.5 vào con số estimate là OK. Con số 1.5 chỉ là theo kinh nghiệm của người viết bài này.
Như trường hợp trên thì sau khi nhân với 1.5 thì sẽ thành 40 giờ.

**Cross Check**
Ở bước cuối cùng sẽ nhờ cấp trên kiểm tra lại estimate đã đưa ra.
Xem có bỏ sót item nào không ? Con số estimate có ít quá không ? 
Nếu có vấn đề phát sinh thì sẽ tiến hành sửa estimate.

### Tổng kết
Thực tế khi tiến hành dự án thì phần dư thừa thời gian giai đoạn đầu dần dần bị thiếu dần. Nguyên nhân thì có rất nhiều nhưng mà hầu hết là do estimate thời gian ít quá. Khi đó thì đừng tức giận hỏi "tại sao lại estimate thời gian ít như thế này" mà hãy estimate cẩn thận chỉnh rùi hãy bắt tay vào làm.

Tham khảo: https://qiita.com/yutakakn/items/b0e36196df474acf9359?utm_source=Qiita#fnref8