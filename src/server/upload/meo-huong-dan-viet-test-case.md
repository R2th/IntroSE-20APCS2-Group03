Test Cases là 1 tập hợp các trường hợp điều kiện theo đó mà Tester có thể dựa vào nó để xác định liệu 1 ứng dụng, hệ thống phần mềm hoặc là 1 trong các tính năng của nó có hoạt động như mong muốn cần làm hay không?
Các cơ chế để xác định liệu một chương trình phần mềm hoặc hệ thống đã được thông qua hay không, một trường hợp kiểm thử (1 case) được biết đến như một định hướng kiểm thử ( nghĩa là bạn cần phải xác định được trường các trường hợp có thể xảy ra).

### Một trường hợp kiểm thử (test case)  là gì?

Trường hợp kiểm thử  được thiết lập các hoạt động với kết quả thực tế và kết quả mong đợi , nó được thực hiện theo trình tự để xác thực tính năng của ứng dụng. Có chạy đúng theo yêu cầu hay không .Trường hợp kiểm thử là tài liệu và được người kiểm thử thiết kế dựa trên tài liệu SRS và tài liệu ca sử dụng.

![](https://images.viblo.asia/951ad594-adf3-40d8-abd1-bc5cc538f6db.png)

### Làm thế nào để viết trường hợp kiểm thử ?
Trước tiên, bạn cần hiểu rõ đặc tả yêu cầu của khách hàng. Khi bắt đầu viết TCs cho các tính năng của 1 hệ thống phần mềm, việc đầu tiên cần xác định đó là cần hiểu và xác định được yêu cầu của hệ thống.

* Trước khi thiết kế các trường hợp kiểm thử tìm ra tất cả các tính năng của ứng dụng.

*  Đảm bảo rằng trường hợp kiểm thử phải bao gồm tất cả các chức năng được đề cập trong tài liệu SRS và tài liệu ca sử dụng. Nên sử dụng ma trận theo dấu yêu cầu để đảm bảo rằng tất cả các yêu cầu đều được kiểm tra.

* Tránh lặp lại các trường hợp kiểm thử để có được phạm vi kiểm thử chính xác.

* Các trường hợp kiểm thử chung nên được thu thập & kết hợp với nhau trong bộ kiểm thử

* Độ ưu tiên kiểm thử nên được chỉ định cho từng case kiểm thử. Chọn mức độ ưu tiên của trường hợp kiểm thử tùy thuộc vào mức độ quan trọng của trường hợp kiểm thử đối với Tính năng, thành phần của sản phẩm đó. Trong hàng đợi thực hiện, các trường hợp kiểm thử ưu tiên cao nên được chọn trước tiên sau đó là trung bình và sau đó là các trường hợp kiểm thử ưu tiên thấp.

* Hãy ghi nhớ dữ liệu đầu vào cho các trường hợp kiểm thử là một phần rất quan trọng trong kiểm thử, các trường hợp kiểm thử của bạn sẽ xác nhận phạm vi của dữ liệu đầu vào. 

* Kiểm tra cách hệ thống hoạt động trong điều kiện bình thường & bất thường.

* Khi viết các trường hợp kiểm thử, bạn nên tập trung vào các tình huống thực tế trước tiên mà người dùng cuối sẽ thường xuyên thao tác trong cuộc sống hàng ngày 

### Định dạng của trường hợp kiểm thử là gì?
Format của 1 TCs thông thường bao gồm:

`Id trường hợp kiểm thử `- (Giá trị cần để xác định số lượng trường hợp cần để kiểm thử.)
`Tiêu đề trường hợp kiểm thử` - (Mô tả ngắn gọn về trường hợp kiểm thử)
`Tóm tắt trường hợp kiểm thử `- (Mô tả chi tiết về trường hợp kiểm thử & thông tin bổ sung cần thiết cho trường hợp kiểm thử để thực thi)
`Dữ liệu tiền điều kiện / kiểm thử` - (Bất kỳ điều kiện tiên quyết nào được yêu cầu để thực hiện trường hợp kiểm thử)
`Các bước kiểm tra `- (Mô tả các bước thực hiện test)
`Kết quả mong muốn` - (Kết quả mong đợi từ các bước thực hiện test)
`Kết quả thực tế` - (Kết quả nhận được sau khi  thực hiện các bước kiểm tra)
                                      (Đạt / Không đạt)
`Nhận xét `- (Nhận xét bổ sung hoặc bất kỳ ghi chú nào được yêu cầu trong khi thực hiện trường hợp kiểm tra hoặc ghi chú đặc biệt cho người kiểm tra cần được xem xét)
Giải thích thêm về  case kiểm thử
![](https://images.viblo.asia/a2c35ba7-6e96-4574-ab8b-91867a37cbf7.jpg)


### Tiêu đề trường hợp kiểm thử:

1. Các trường hợp kiểm thử không có gì ngoài hành động của người dùng trên ứng dụng. Vì vậy, trong khi viết các trường hợp kiểm thử, đảm bảo rằng người dùng đang thực hiện các hành 
động đó. Xác minh chéo rằng người dùng có thể đăng nhập, Xác minh rằng người dùng có thể thực hiện các tác vụ cần thiết.

2. Cố gắng làm theo định dạng sau bất cứ khi nào có thể:
[Xác minh] - Nếu viết các trường hợp kiểm tra chức năng
[Sử dụng] - Trường hợp kiểm tra IF là về việc sử dụng tên Công cụ, Tên thẻ, Hộp thoại, v.v.
[Với] - Nếu kiểm tra có liên quan đến bất kỳ điều kiện nào
[To] - Nếu trường hợp kiểm thử nói về những gì được trả lại, hiển thị, thể hiện, v.v.


### Tóm tắt trường hợp kiểm tra:

Tóm tắt trường hợp kiểm thử có nghĩa là mô tả ngắn gọn trường hợp kiểm thử.
Đảm bảo rằng bạn ghi lại thông tin bổ sung cần thiết cho trường hợp kiểm thử để thực thi, chẳng hạn như Giả định, Data test , URL và thông tin kiểm tra.

### Các bước kiểm tra trường hợp:

Step test phải viết chi tiết rõ ràng để ngay cả khi tester khác đọc có thể thực hiện được
Các bước thực hiện chỉ mô tả các bước thực hiện đứng từ phía người dùng cuối bao gồm nhập dữ liệu, nhấn button.
Việc kiểm tra dữ liệu trong DB so với hiện thị trên màn hình nằm ở kết quả mong muốn. Thường được dùng cho các trường hợp kiểm thử kiểm tra lưu, cập nhật, xóa DB SELECT * FROM … WHERE…

### Trường hợp kiểm thử Kết quả dự kiến:

Kết qủa mong muốn theo như Requirement mô tả. Mô tả kết quả mong muốn bao gồm lỗi hoặc thông báo xuất hiện trên màn hình. Người kiểm thử cần phải biết kết quả mong muốn để đánh giá xem trường hợp kiểm thử này có thành công hay không
Không nên gộp quá nhiều kết quả confirm vào 1 case mà nên tách mỗi kết quả confirm ra từng case.

### Các nhóm chính của test case:

GUI test case: Là tất cả các test case được thiết kế để kiểm tra giao diện.

Positive test case:  Là test case tích cực. Là những trường hợp nhập dữ liệu đúng, hợp lệ.

Negative test case: Là những TCs tiêu cực. Là những TCs nhập dữ liệu sai, không  hợp lệ.

Combination test case: Là những TCs đc kết hợp cả 2 loại Positive TC và Negative TC: Bao gồm nhiều steps đúng/sai phức tạp và cuối cùng là step đúng.

### Làm thế nào để xử lý bảo trì trường hợp kiểm thử ?

Ngày nay, các yêu cầu ứng dụng phần mềm thế giới đang phát triển nhanh chóng liên tục thay đổi sau mỗi lần nâng cấp phần mềm. Vì vậy, trong mọi bộ kiểm tra nâng cấp cần phải được cập nhật hoặc duy trì dựa trên các yêu cầu mới. 

`Thêm trường hợp kiểm thử mới:` Bổ sung các trường hợp kiểm thử mới trong bộ kiểm thử cho các yêu cầu mới

`Xóa các trường hợp kiểm tra lỗi thời: `Khi có các thay đổi trong yêu cầu, nó có thể thêm các tính năng mới và đồng thời một số tính đã bị bỏ,  không còn hợp lệ hoặc không được hỗ trợ trong bản phát hành lần này, vì vậy các trường hợp kiểm thử lỗi thời này phải được xóa khỏi bộ test case hiện tại.

### Những bước quan trọng để bạn viết được một test case hiệu quả

Đầu tiên, phải xác định được phạm vi và mục đích của việc test.

Xác định những điểm có thể test, hiểu mục đích của việc test, bạn phải hiểu được nội dung requirement.

File test case cần có những step test đơn giản, minh bạch, dễ hiểu, các trường hợp thử nghiệm nên có giá trị, tóm tắt và ngắn, test case nên có sự liên kết, chuẩn bị dữ liệu test. Dữ liệu test nên đa dạng ứng với các trường hợp kiểm thử. Các dữ liệu hợp lệ, không hợp lệ, data lỗi.

Nội dung đơn giản, có mục đích rõ ràng và ai đọc cũng hiểu theo một cách duy nhất. (đầu vào, đầu ra, các bước thực hiện rõ ràng) Trình bày mạch lạc thống nhất cho toàn bộ tài liệu.
Có khả năng tái sử dụng (có thể dễ dàng cập nhật và sửa đổi)

Tôi nghĩ rằng tôi đã giải quyết tất cả các mẹo quan trọng về viết trường hợp kiểm thử với ví dụ trường hợp thử nghiệm. Tôi muốn hỏi một câu hỏi cho bạn, Công cụ kiểm tra nào bạn sử dụng hàng ngày để viết các trường hợp kiểm tra. Hãy chia sẻ kinh nghiệm của bạn cho người mới, để họ có thể có ý tưởng về việc viết các trường hợp thử nghiệm.

Nguồn :https://www.softwaretestingclass.com/tips-guidelines-for-writing-test-cases/