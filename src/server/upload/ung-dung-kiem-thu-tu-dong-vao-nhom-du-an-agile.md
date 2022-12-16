Phương pháp phát triển phần mềm theo triết lý/mô hình Agile đang ngày càng trở nên phổ biến trên khắp thế giới. Các công ty, doanh nghiệp và nhóm dự án vì thế cũng cần một cách thức kiểm thử phần mềm mới mới để phù hợp với mô hình làm việc theo Agile - vốn được biết đến là 1 triết lý hay một khung tư duy để nhanh chóng thích ứng và phản hồi với thay đổi. 

Mặc dù kiểm thử tự động không được thiết kế để hỗ trợ các dự án Agile, nhưng nó giúp cho kiểm thử Agile - một thành phần quan trọng của các dự án Agile - có thể thực hiện được. Bài viết này sẽ giúp bạn hiểu được tầm quan trọng của Automation Testing – Kiểm thử tự động trong Agile và hướng dẫn các bước cần thiết để thiết để áp dụng kiểm thử tự động cho các nhóm dự án làm việc theo mô hình Agile. 

## 1. Trước Agile là gì?

Trước khi xuất hiện các khái niệm phát triển Agile, Mô hình Waterfall thường được sử dụng trong việc phát triển phần mềm. Có thể nói  Waterfall thực sự là mô hình được sử dụng rộng rãi đầu tiên để phát triển phần mềm.
Giống như tên gọi, phương pháp luận Waterfall (thác nước) là một phương pháp quản lý dự án dựa trên quy trình thiết kế tuần tự và liên tiếp, giống như 1 thác nước chảy. Mỗi bước trong quá trình phát triển phải được hoàn thành trước khi chuyển sang bước tiếp theo.

![](https://images.viblo.asia/5231d885-5ac9-47ea-8124-d741d1b44ad6.jpeg)

Như hình ảnh minh hoạ , kiểm thử là bước hoàn thành tất cả công việc trong mô hình Waterfall . Vì vậy, trước khi test một tính năng mới (giả sử một yêu cầu mới của sản phẩm), nhóm của bạn cần hoàn thành quá trình phát triển. Nếu xuất hiện lỗi, đội ngũ phát triển sẽ cần quay lại từng dòng mã của mình và kiểm tra (các) lỗi.

## 2. Mô hình Agile là gì? 

Theo wikipedia, Agile là một phương thức thực hiện các dự án công nghệ phần mềm, phương thức này khuyến khích sự thay đổi khi phát triển dự án và đưa sản phẩm đến tay người dùng sao cho nhanh nhất.

![](https://images.viblo.asia/86b6614c-9bc7-4ecc-8602-56220b1a21d1.png)

Mục tiêu của Agile là xuất bản phần mềm theo chức năng. Để hoàn thành và xuất bản các ứng dụng theo chức năng, các lập trình viên và kiểm thử viên cần cộng tác theo nhóm. Thay vì phát triển và triển khai toàn bộ ứng dụng cùng 1 lúc, giờ đây bạn chỉ cần hoàn thành từng phần của ứng dụng như cơ sở dữ liệu, nghiệp vụ logic và giao diện người dùng..v..v..

Sự hợp tác để hoàn thành nhiệm vụ là 1 điều tất yếu trong mô hình Agile. Giữa nhóm và các thành viên trong nhóm cần phải giao tiếp thường xuyên để mọi người đều ý thức được những gì team đang xây dựng và  phát triển, cũng như trách nhiệm của mỗi cá nhân trong nhóm. 

## 3. 4 Giá trị cốt lõi trong Tuyên ngôn Agile

### 3.1. Cá nhân và tương tác hơn là quy trình và công cụ (Individuals and Interactions Over Processes and Tools) 
Con người được đánh giá cao hơn các quy trình hoặc công cụ vì con người có thể đáp ứng nhu cầu kinh doanh và thúc đẩy quá trình phát triển. Nhóm sẽ kém thích nghi với sự thay đổi và ít có khả năng đáp ứng kỳ vọng của khách hàng nếu chỉ dựa quy trình hoặc công cụ để thúc đẩy sự phát triển.

### 3.2. Phần mềm hoạt động tốt hơn là tài liệu đầy đủ (Working Software Over Comprehensive Documentation) 
Trong dự án Agile, mặc dù tài liệu được khuyến khích nhưng phần mềm hoạt động vẫn quan trọng hơn
Trong dự án Agile tài liệu được đơn giản hoá và trình bày dễ hiểu để đội ngũ phát triển có thể hoàn thành yêu cầu mà mà không bị sa lầy vào chi tiết. Agile tạo ra các câu chuyện của người dùng từ các yêu cầu, những yêu cầu đủ để lập trình viên bắt đầu làm một chức năng mới. 

### 3.3. Hợp tác với khách hàng hơn là đàm phán hợp đồng (Customer Collaboration Over Contract Negotiation) 
Tuyên ngôn Agile xác định khách hàng là người tham gia và làm việc với đội ngũ phát triển trong các dự án. Việc phát triển  sản phẩm thoả mãn nhu cầu của khách hàng vì thế cũng trở nên đơn giản hơn nhiều. Trong 1 dự án Agile, khách hàng cũng có thể là người dùng cuối (end user) tham gia tất cả các cuộc họp, các buổi demo để đảm bảo rằng các chức năng đang phát triển đáp ứng/thoả mãn nhu cầu của khách hàng.

### 3.4. Ứng phó, phản hồi với các thay đổi hơn là làm theo kế hoạch (Responding to Change Over Following a Plan)

Đa phần các dự án đều có sự thay đổi điều chỉnh khi triển khai ví dụ như thay đổi về yêu cầu, thay đổi tech stack, thay đổi nhân sự, thay đổi deadline, thay đổi phương thức làm việc…v..v mặc dù kế hoạch đã được định ra rõ ràng từ đầu. 
Mặc dù không khuyến khích sự thay đổi nhưng Agile khuyến chúng ta tập thích nghi, ứng phó với sự thay đổi.

Nhóm dự án agile thường xuyên làm việc trực tiếp với khách hàng, điều này giúp cho dự án nắm được độ ưu tiên giữa các yêu cầu đồng thời cập nhật các thay đổi từ phía khách hàng để kịp thời điều chỉnh. Nhờ đó các dự án agile thường giúp khách hàng tối ưu hóa được giá trị của dự án. Agile giúp dự án gia tăng đáng kể độ hài lòng của khách hàng.

## 4. Lợi ích của việc áp dụng Kiểm thử tự động vào nhóm Agile 

### 4.1 Tối ưu nguồn lực cho kiểm thử hồi quy
Kiểm thử hồi quy là loại hình quan trọng nhất được tự động hoá. Thay vì thực hiện các trường hợp kiểm thử lặp đi lặp lại tốn nhiều thời gian, kiểm thử viên có thể chuẩn bị sẵn các kịch bản kiểm thử để thực thi kiểm thử tự động. 

### 4.2 Gia tăng phạm vi kiểm thử 
Kiểm thử tự động mang đến cho các nhóm QA cơ hội chạy thử nghiệm trên một số nền tảng và trình duyệt khác nhau. Vì vậy, bằng cách sử dụng công cụ tự động hóa phù hợp mới nhất, nhóm có thể test tất cả các thành phần tiềm năng trong dự án. 

### 4.3. Cải thiện khả năng giao tiếp và làm việc theo nhóm

Mọi dự án Agile đều yêu cầu các nhóm hợp tác với nhau. Với sự tham gia sâu hơn của QA vào mọi cấp độ của SDLC, việc giao tiếp giữa các lập trình viên và kiểm thử viên phải thường xuyên hơn để theo kịp các bản cập nhật. Khi sử dụng công cụ kiểm thử tự động, nhóm sẽ nâng cao khả năng kết nối, cập nhật và báo cáo mạnh mẽ hơn bao giờ hết. 

## 5. Triển khai Automation Test vào dự án 

### 5.1. Lên kế hoạch tự động hoá.

Một dự án Aglie thành công rất cần có một kế hoạch kiểm thử tự động gồm đầy đủ các framework tự động hoá cần thiết.  Ngoài ra hãy chắc chắn rằng nhóm lập trình viên và quản lý chất lượng dự án của bạn làm việc tốt với nhau.

### 5.2. Xác định những trường hợp kiểm thử nào có thể được tự động hóa.

Không phải tất cả các trường hợp thử nghiệm đều có thể kiểm thử tự động vậy nên điều quan trọng thứ 2 khi triển khai kiểm thử tự động đó là bạn cần phải biết trước những trường hợp nào có thể tự động hoá.

### 5.3. Hoàn thành thử nghiệm song song 
Với kiểm thử tự động, nhóm QA có thể chạy nhiều thử nghiệm trên một số thiết bị, trình duyệt và hệ điều hành cùng một lúc. Đặc biệt, các đội tiết kiệm được một lượng thời gian đáng kể thông qua việc thử nghiệm song song.


### 5.4. Tích hợp DevOps
DevOps giúp các nhóm làm việc cùng nhau một cách dễ dàng. Việc kiểm thử hiệu quả hơn khi kết hợp công cụ tự động hoá có kết hợp CI/CD.

### 5.5. Lựa chọn công cụ kiểm thử tự động thích hợp
Lựa chọn công cụ kiểm thử tự động thích hợp rất quan trọng . Mặc dù các giải pháp kiểm thử tự động tiết kiệm thời gian khi kiểm thử hồi quy và đảm bảo rằng phần mềm chất lượng cao được kiểm tra nhanh chóng. Tuy nhiên, điều đó chỉ thực sự phát huy tác dụng khi công cụ kiểm thử tự động mà họ sử dụng phù hợp với khả năng kỹ thuật, yêu cầu kiểm thử phần mềm, cơ sở hạ tầng CNTT hiện có, v.v.