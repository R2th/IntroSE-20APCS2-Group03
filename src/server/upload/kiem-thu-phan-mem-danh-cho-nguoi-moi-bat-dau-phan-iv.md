Sau khi đã nắm rõ các khái niệm trong kiểm thử phần mềm, chúng ta bắt đầu tìm hiểu về các nguyên tắc trong kiểm thử phần mềm và vòng đời của kiểm thử trong quá trình phát triển của phần mềm.
Cụ thể như sau:
# I. Những nguyên tắc chung trong kiểm thử phần mềm

![](https://images.viblo.asia/cceca7db-39b0-4d7b-9727-c0ee8aba1ecc.PNG)

## 1. Kiểm thử phần mềm chính là chứng minh sự hiện diện của lỗi trong phần mềm
* Mục tiêu của kiểm thử phần mềm là làm cho phần mềm bị bug để fix bug nhằm làm giảm sự hiện diện của bug. 
* Kiểm thử phần mềm có thể đảm bảo rằng có bug trong hệ thống nhưng không thể chứng minh rằng phần mềm không có bug. 
* Ngay cả áp dụng nhiều phương pháp kiểm thử khác nhau trên cùng một chức năng/hệ thống cũng không bao giờ có thể đảm bảo rằng phần mềm không có bug 100%. 
* Kiểm thử có thể làm giảm số lượng bug nhưng không loại bỏ tất cả các bug hoàn toàn.

## 2. Kiểm thử phần mềm một cách toàn diện là điều không thể
* Đây là quá trình kiểm tra chức năng của một phần mềm trong tất cả các đầu vào có thể (hợp lệ hoặc không hợp lệ) và các điều kiện trước được gọi là kiểm thử  toàn diện. 
* Kiểm thử toàn diện là không thể có nghĩa là phần mềm không bao giờ có thể được kiểm tra với mọi trường hợp kiểm thử. 
* Nó chỉ có thể kiểm tra một số trường hợp kiểm thử và cho rằng phần mềm là chính xác và nó sẽ tạo ra đầu ra chính xác trong mọi trường hợp kiểm thử. 
* Nếu phần mềm sẽ kiểm tra mọi trường hợp kiểm thử thì sẽ tốn nhiều chi phí, công sức hơn, v.v. và điều đó là không thực tế.

## 3. Kiểm thử càng sớm càng tốt
* Để tìm ra lỗi trong phần mềm, hoạt động kiểm thử sớm sẽ được bắt đầu. 
* Các khiếm khuyết được phát hiện trong các giai đoạn đầu của SDLC sẽ rất ít tốn kém. 
* Để có hiệu suất tốt hơn của phần mềm, kiểm thử phần mềm sẽ bắt đầu ở giai đoạn ban đầu, tức là kiểm thử sẽ thực hiện ở giai đoạn phân tích yêu cầu chứ không phải đợi đến khi hình thành sản phẩm mới bắt tay vào tìm lỗi

## 4. Khiếm khuyết phần mềm sẽ được kiểm tra phát hiện theo từng cụm
* Trong một dự án, một số lượng nhỏ mô-đun có thể chứa hầu hết các lỗi phần mềm
* Nguyên tắc Pareto đối với kiểm thử phần mềm nói rằng 80% lỗi phần mềm đến từ 20% là các mô-đun.

## 5. Nghịch lý thuốc trừ sâu
* Lặp đi lặp lại các trường hợp kiểm thử  tương tự sẽ không tìm thấy lỗi mới. 
* Một phương pháp kiểm thử có thể hiệu quả với hệ thống này nhưng chưa chắc đem lại kết quả kiểm thử tốt đối với hệ thống khác.
* Vì vậy, cần phải xem xét các trường hợp thử nghiệm và thêm hoặc cập nhật các trường hợp thử nghiệm để tìm ra lỗi mới.

***Lấy một số ví dụ cho các bạn dễ hiểu như sau:***
- Về nghĩa đen: 
   + Một loại thuốc trừ sâu có thể phát huy tối đa hiệu quả diệt sâu bọ là diệt 99% loại sâu A. Nhưng nếu lấy đó làm kết quả đánh giá tổng quát rằng loại thuốc này tốt để đem đi diệt tất cả các loại sâu bọ thì không chính xác. Vì thành phần của thuốc có thể diệt 99% sâu A, nhưng có thể chỉ diệt được 50% sâu B, và sâu C, D, E... thì công dụng chị còn 10-20%
   + Ngoài ra, với loại sâu A ban đầu diệt được 99% nhưng nếu cứ dùng loại thuốc này từ mùa này sang mùa khác thì dẫn tới tình trạng "kháng thuốc" hay nói cách khác loài sâu đó theo thời gian sẽ dần dần thích nghi và có thể tạo ra kháng thể chống lại sự tấn công của thuốc nếu chúng tiếp xúc một thời gian quá dài. Như vậy, lâu dần thuốc trừ sau sẽ không còn tác dụng hiệu quả dùng để diệt sâu nữa.
   + Và việc của các nhà khoa học là cải tiến thuốc trừ sâu này để nó vẫn còn khả năng diệt sâu A hiệu quả như ban đầu.

- Trong kiểm thử phần mềm cũng vậy.
   + Cùng thực hiện kiểm thử hai ứng dụng trên điện thoại di động nhưng bộ test case các bạn viết cho ứng dụng A không thể áp dụng triệt để cho ứng dụng B mà bạn chỉ có thể chọn lọc những trường hợp kiểm thử cho thiết bị di động từ bộ test case của A cho B hoặc những trường hợp kiểm thử cho một số chức năng của B mà có điểm tương đồng với A.
   + Thêm vào đó, bộ test case của A có thể cover được bug rất tốt tại thời điểm này, nhưng sau 3-6 tháng khi mà A đã được phát triển thêm các tính năng mới, một số chức năng của A được thay đổi theo nhu cầu khách hàng thì bạn có chắc chắn là bộ test case còn phù hợp với A nữa không? Bạn có chắc tìm ra bug không? Câu trả lời tất nhiên là KHÔNG.
   + Vậy điều cần làm lúc này là xem xét, cập nhật lại bộ test case để phù hợp với những tính năng mới, phù hợp với những tính năng đã được thay đổi. Có như vậy thì mục tiêu cover bug của bạn mới được thực hiện.

## 6. Kiểm thử phụ thuộc vào ngữ cảnh
* Phương pháp kiểm thử  phụ thuộc vào bối cảnh của phần mềm được phát triển. 
* Các loại phần mềm khác nhau cần thực hiện các loại thử nghiệm khác nhau. 
* Ví dụ: Việc kiểm thử  trang web thương mại điện tử khác với kiểm thử của ứng dụng Android.

## 7. Không có lỗi sai
* Nếu một phần mềm được xây dựng không có lỗi 99% nhưng nó không tuân theo yêu cầu của người dùng thì nó không thể sử dụng được=> vô dụng. 
* Do đó, không phải cần thiết là phần mềm không có lỗi 99% mà quan trọng hơn là nó phải bắt buộc thực hiện tất cả các yêu cầu của khách hàng mới là điều quan trọng nhất.

# II. Vòng đời kiểm thử phần mềm

![](https://images.viblo.asia/07725d89-8e87-4aec-9965-2369c8dc021f.jpg)

Vòng đời phát triển phần mềm cũng có 6 bước cơ bản. Mỗi bước yêu cầu một tiêu chuẩn riêng và thực hiện những hoạt động khác nhau tạo thành một vòng đời kiểm thử hoàn chỉnh.

## Bước 1. Phân tích yêu cầu
* Phân tích yêu cầu là bước đầu tiên trong Vòng đời kiểm thử phần mềm (STLC). 
* Trong bước này, nhóm Đảm bảo chất lượng (QA) hiểu được yêu cầu về những gì sẽ kiểm tra và tìm ra các yêu cầu có thể kiểm tra được. 
* Nếu có bất kỳ xung đột, thiếu hoặc không hiểu bất kỳ yêu cầu nào, thì nhóm QA sẽ theo dõi các bên liên quan khác nhau như Chuyên viên phân tích nghiệp vụ, Kiến trúc hệ thống, Khách hàng, Giám đốc kỹ thuật / Trưởng nhóm để hiểu rõ hơn về kiến thức chi tiết về yêu cầu.
* Ngay từ bước đầu tiên, QA đã tham gia vào STLC giúp ngăn chặn các lỗi của phần mềm.
* Các yêu cầu có thể là Chức năng hoặc Phi chức năng như Hiệu suất, Kiểm tra bảo mật. 
* Ngoài ra yêu cầu và tính khả thi của kiểm thử Tự động hóa của dự án có thể được thực hiện trong giai đoạn này (nếu có)

Bước này được mô phỏng như sau:

### Tiêu chuẩn đầu vào :
Tài liệu sau đây nên có sẵn:
- Yêu cầu kỹ thuật.
- Tài liệu Kiến trúc của ứng dụng 
- Cùng với các tài liệu trên Tiêu chí chấp nhận nên được xác định rõ. 

### Hoạt động:
- Chuẩn bị danh sách các câu hỏi hoặc truy vấn và được giải quyết từ Chuyên viên phân tích nghiệp vụ, Kiến trúc hệ thống, Khách hàng, Giám đốc kỹ thuật / Trưởng nhóm, v.v.
- Lập danh sách cho tất cả các loại kiểm thử được thực hiện như Chức năng, Bảo mật và Hiệu suất, v.v.
- Xác định trọng tâm kiểm thử và độ ưu tiên.
- Liệt kê chi tiết môi trường kiểm thử nơi các hoạt động kiểm tra sẽ được thực hiện.

### Kết quả:
- Kiểm tra tính khả thi của kiểm thử Tự động hóa nếu được yêu cầu & chuẩn bị báo cáo tính khả thi kiểm thử Tự động hóa.
- Danh sách các câu hỏi với tất cả các câu trả lời sẽ được giải quyết từ Chuyên viên phân tích nghiệp vụ, Kiến trúc hệ thống, Khách hàng, Giám đốc kỹ thuật / Trưởng nhóm, v.v., tức là các yêu cầu có thể kiểm tra
- Báo cáo khả thi của kiểm thử tự động hóa (nếu khách hàng yêu cầu)

## Bước 2. Lên kế hoạch kiểm thử
* Lập kế hoạch kiểm thử là giai đoạn quan trọng nhất của vòng đời kiểm thử phần mềm trong đó tất cả các chiến lược kiểm thử phù hợp được xác định ngay từ đầu. 
* Giai đoạn này cũng được gọi là giai đoạn Chiến lược thử nghiệm. 
* Trong giai đoạn này, thường có test manager  (hoặc test leader) tham gia để xác định effort kiểm thử và dự toán resource cũng như chi phí cho toàn bộ dự án. 
* Giai đoạn này sẽ được khởi động sau khi giai đoạn thu thập yêu cầu được hoàn thành & dựa trên phân tích yêu cầu, bắt đầu chuẩn bị Kế hoạch kiểm thử. 
* Kết quả của giai đoạn Lập kế hoạch kiểm thử sẽ là Test plan hoặc Chiến lược kiểm tra & Tài liệu ước tính effort kiểm thử
* Sau khi hoàn thành giai đoạn lập kế hoạch kiểm tra, nhóm QA có thể bắt đầu với hoạt động phát triển trường hợp kiểm thử.

Bước này được mô phỏng như sau:

### Tiêu chuẩn đầu vào :
- Yêu cầu Tài liệu (Phiên bản cập nhật của yêu cầu không rõ ràng hoặc thiếu trước đó).
- Báo cáo tính khả thi của kiểm thử tự động hóa.

### Hoạt động:
- Xác định mục tiêu & phạm vi của dự án.
- Liệt kê các loại thử nghiệm liên quan đến STLC.
- Kiểm tra dự toán effort và lập kế hoạch resource.
- Lựa chọn công cụ kiểm tra nếu được yêu cầu.
- Xác định tổng quan quá trình kiểm thử.
- Xác định môi trường kiểm thử cần thiết cho toàn bộ dự án.
- Chuẩn bị lịch thực thi kiểm thử.
- Xác định các thủ tục kiểm soát.
- Xác định vai trò và trách nhiệm của từng member trong team.
- Liệt kê các trường hợp sau khi kiểm thử có thể giao được.
- Xác định tiêu chí đầu vào, tiêu chí đình chỉ, tiêu chí thực thi lại và tiêu chí kết thúc kiểm thử.
- Xác định rủi ro liên quan nếu có.

### Kết quả:
- Test plan hoặc tài liệu chiến lược thử nghiệm.
- Kiểm tra tài liệu dự toán các effort trong quá trình kiểm thử

## Bước 3. Phát triển các trường hợp thử nghiệm
* Hoạt động phát triển trường hợp thử nghiệm được bắt đầu khi hoạt động lập kế hoạch kiểm thử kết thúc. 
* Đây là giai đoạn của STLC nơi nhóm kiểm thử viết ra các trường hợp kiểm thử chi tiết hay còn được gọi là test case.
* Chuẩn bị các data test cho từng test case nếu cần.
* Khi các test case đã sẵn sàng thì được review chéo bởi các thành viên ngang hàng hoặc QA leader.

Bước này được mô phỏng như sau:

### Tiêu chuẩn đầu vào :
- Yêu cầu Tài liệu (Phiên bản cập nhật của yêu cầu không rõ ràng hoặc thiếu).
- Báo cáo tính khả thi tự động hóa.

### Hoạt động:
- Chuẩn bị các trường hợp kiểm thử (test case).
- Chuẩn bị các kịch bản kiểm thử tự động hóa (nếu cần).
- Yêu cầu lại chuẩn bị data test để thực hiện các trường hợp kiểm thử.

### Kết quả: 
- Tài liệu test case
- Dữ liệu test
- Kiểm tra tập lệnh tự động hóa (nếu cần).

## Bước 4. Thiết lập môi trường kiểm thử
* Thiết lập môi trường thử nghiệm là một phần quan trọng của STLC. 
* Về cơ bản môi trường kiểm thử quyết định phần mềm nào được kiểm tra. 
* Đây là hoạt động độc lập và có thể được bắt đầu song song với bước phát triển các trường hợp kiểm thử
* Trong quá trình thiết lập môi trường kiểm thử thì tester/QA không tham gia vào.
* Tuy từng dự án mà team phát triển hoặc khách hàng cung cấp môi trường kiểm thử. 
* Có nghĩa là trong khi nhóm kiểm thử nên chuẩn bị các trường hợp smoke test để kiểm tra mức độ sẵn sàng của thiết lập môi trường kiểm thử.

Bước này được mô phỏng như sau:

### Tiêu chuẩn đầu vào :
- Kế hoạch kiểm tra có sẵn.
- Smoke test case có sẵn
- Dữ liệu test có sẵn.

### Hoạt động:
- Phân tích các yêu cầu và chuẩn bị danh sách Phần mềm & phần cứng cần thiết để thiết lập môi trường kiểm thử.
- Thiết lập môi trường kiểm thử.
- Khi môi trường kiểm tra được thiết lập, thực hiện các trường hợp smoke test để kiểm tra mức độ sẵn sàng của môi trường kiểm tra.

### Kết quả: 
- Môi trường kiểm thử sẽ sẵn sàng với data test
- Kết quả các trường hợp smoke test

## Bước 5. Thực thi kiểm thử
* Khi quá trình chuẩn bị Thiết lập môi trường kiểm thử  và thiết lập môi trường kiểm thử được hoàn thành, giai đoạn thực thi kiểm thử có thể được khởi động. 
* Trong giai đoạn này, nhóm bắt đầu thực hiện các trường hợp kiểm thử  dựa trên kế hoạch đã chuẩn bị & các trường hợp kiểm thử đã được chuẩn bị trong bước trước đó.
* Khi trường hợp kiểm tra được thông qua thì có thể được đánh dấu là Đạt. 
* Nếu bất kỳ trường hợp kiểm thử nào bị lỗi thì bug tương ứng có thể được báo cáo cho nhóm phát triển thông qua hệ thống theo dõi bug & bug có thể được liên kết cho trường hợp kiểm thử tương ứng để phân tích thêm. 
* Lý tưởng nhất là test case failed nên được liên kết với ít nhất một bug tương ứng. 
* Sử dụng liên kết này, có thể nhận được trường hợp kiểm thử thất bại với bug liên quan đến nó. 
* Khi bug được fix bởi nhóm phát triển thì trường hợp kiểm thử tương tự có thể được thực thi dựa trên kế hoạch kiểm tra của bạn.
* Nếu bất kỳ trường hợp kiểm tra nào bị chặn do bất kỳ lỗi nào thì các trường hợp kiểm thử đó có thể được đánh dấu là Blocked, vì vậy có thể nhận được báo cáo dựa trên số lượng trường hợp kiểm tra đã Passed, Failed, Blocked, Pending, N/A...
* Một khi các bug đã được sửa, các trường hợp kiểm thử Failed hoặc Blocked có thể được thực hiện lại để kiểm tra lại chức năng cho tới khi Passed thì dừng lại.

Bước này được mô phỏng như sau:

### Tiêu chuẩn đầu vào :
- Test plan hoặc tài liệu chiến lược kiểm thử.
- Tài liệu test case
- Dữ liệu test

### Hoạt động:
- Dựa trêntest plan thực hiện các trường hợp kiểm thử.
- Đánh dấu trạng thái của các trường hợp kiểm tra như Passed, Failed, Blocked, Pending, N/A ...
- Tạo ticket tracking bug cho tất cả các trường hợp kiểm tra Failed và Blocked
- Làm lại một lần các trường hợp kiểm thử khi các bug đã được sửa.
- Theo dõi các trạng thái bug để close chúng.

### Kết quả: 
- Báo cáo thực thi test case
- Báo cáo bug

## Bước 6. Đóng chu kỳ kiểm thử
* Sau khi hoàn thành bước thực thi kiểm thử sẽ có cuộc họp đánh giá các tiêu chí hoàn thành chu kỳ dựa trên phạm vi kiểm tra, Chất lượng, Chi phí, Thời gian, Mục tiêu kinh doanh quan trọng và Phần mềm. 
* Thảo luận về những gì đã diễn ra tốt đẹp, lĩnh vực nào cần được cải thiện & lấy các bài học từ STLC hiện tại làm đầu vào cho các chu kỳ thử nghiệm sắp tới, điều này sẽ giúp cải thiện tình trạng tắc nghẽn trong quy trình STLC. 
* Trường hợp kiểm tra & báo cáo lỗi sẽ phân tích để tìm ra phân phối lỗi theo loại và mức độ nghiêm trọng. 
* Sau khi hoàn thành chu trình kiểm tra, sau đó kiểm tra báo cáo đóng cửa & số liệu kiểm tra sẽ được chuẩn bị. 
* Kiểm tra phân tích kết quả để tìm ra phân phối lỗi theo loại và mức độ nghiêm trọng.

Bước này được mô phỏng như sau:

### Tiêu chuẩn đầu vào :
- Các test case đã được thực thi xong
- Đã có báo cáo cho các trường hợp kiểm thử
- Báo cáo bug

### Hoạt động:
- Đánh giá các tiêu chí hoàn thành chu kỳ dựa trên phạm vi kiểm tra, Chất lượng, Chi phí, Thời gian, Mục tiêu kinh doanh quan trọng và Phần mềm Chuẩn bị các số liệu kiểm tra dựa trên các thông số trên.
- Chuẩn bị báo cáo đóng chu kỳ kiểm thử
- Chia sẻ các lesson learn cho bất kỳ dự án tương tự trong tương lai

### Kết quả: 
- Báo cáo kết thúc kiểm tra
- Kiểm tra số liệu

***Lưu ý: Trên đây à trường hợp lý tưởng nhất cho vòng đời kiểm thử phần mềm hoặc chúng ta có thể nói bước tiếp theo không thể bắt đầu trừ khi và cho đến khi bước trước đó hoàn thành. 
Có thể trong tình huống lý tưởng, nhưng thực tế không phải lúc nào cũng đúng. Tùy theo đặc thù từng dự án mà có thể linh động thực hiện các bước kiểm thử phù hợp với điều kiện vận hành của dự án và sản phẩm.***

Nguồn: Sách Software Testing: An ISTQB-BCS Certified Tester Foundation guide, xuất bản lần thứ 4

Nhóm tác giả: Brian Hambling, Peter Morgan, Angelina Samaroo, Geoff Thompson, Peter Williams