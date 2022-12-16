<div align="center">
    
![](https://images.viblo.asia/ee365aeb-246d-4b9c-8837-db97d8413936.gif)
    
</div>

Một trong những thay đổi lớn nhất trong Android Q là việc giới thiệu điều hướng cử chỉ mới. Để tóm tắt lại - với chế độ điều hướng hệ thống mới - người dùng có thể điều hướng quay lại (vuốt cạnh trái / phải), đến màn hình chính (vuốt lên từ dưới cùng) và kích hoạt trợ lý thiết bị (vuốt từ góc dưới cùng) bằng cử chỉ thay vì các nút.

Bằng cách chuyển sang mô hình cử chỉ để điều hướng hệ thống, chúng tôi có thể cung cấp thêm màn hình cho các ứng dụng để cho phép trải nghiệm nhập vai hơn.

## Tại sao lại là Gesture

Một trong những điều tuyệt vời về Android là cơ hội cho các nhà phát triển ứng dụng và đối tác Android thử các cách tiếp cận mới, sáng tạo trên điện thoại.

Trong 3 năm qua, các mẫu điều hướng cử chỉ phổ biến trên các thiết bị cầm tay (mặc dù các cử chỉ đã xuất hiện từ đầu năm 2009!). Xu hướng này được dẫn dắt bởi các đối tác Android và ứng dụng Android sáng tạo đang thử một số ý tưởng rất hay (ví dụ: Fluid NG, XDA).

Những lợi ích của việc dùng gesture:

1. Cử chỉ có thể là một cách nhanh hơn, tự nhiên hơn và thuận tiện hơn để điều hướng điện thoại
2. Cử chỉ có chủ ý hơn các button trên app mà bạn có thể kích hoạt chỉ bằng cách cầm điện thoại của mình
3. Các cử chỉ cho phép trải nghiệm nhiều hơn cho các app bằng cách giảm thiểu mức độ mà hệ thống vẽ lên nội dung ứng dụng, tức là vị trí các nút HOME / BACK - đặc biệt là xu hướng phần cứng đối với màn hình lớn hơn và viền mỏng hơn

Tuy nhiên, sử dụng gesture không phải là không có các nhược điểm:

1. Gesture không hoạt động tốt với tất cả các user
2. Gesture khó học để có thể sử dụng hơn và có thể điều chỉnh được
3. Cử chỉ có thể can thiệp vào navigation pattern của app

Nhưng trên hết, có một vấn đề lớn hơn là sự phân mảnh khi các điện thoại Android khác nhau có cử chỉ khác nhau, đặc biệt là đối với các nhà phát triển Android.

Trong năm ngoái, Google đã làm việc với các đối tác như Samsung, Xiaomi, HMD Global, OPPO, OnePlus, LG, Motorola và nhiều đối tác khác để chuẩn hóa điều hướng cử chỉ trong tương lai. Để đảm bảo trải nghiệm người dùng và nhà phát triển nhất quán, các cử chỉ Android Q sẽ là điều hướng cử chỉ mặc định cho các thiết bị Q + mới.

Mặc dù những cử chỉ này không có tác dụng với mọi người dùng, đặc biệt là những người có kỹ năng và khả năng di chuyển hạn chế hơn, điều hướng ba nút sẽ tiếp tục là một tùy chọn trên mọi thiết bị Android.

## Vậy tại sao lại là những gesture này?

Bắt đầu với việc nghiên cứu để hiểu cách người dùng cầm điện thoại của họ, tầm với điển hình trông như thế nào và phần nào của người dùng điện thoại sử dụng nhiều nhất. Từ đó, Google đã xây dựng nhiều nguyên mẫu để thử nghiệm trên các trục như mong muốn, tốc độ sử dụng, công thái học, v.v. Và đưa thiết kế cuối cùng thông qua một loạt các nghiên cứu - người dùng đã học hệ thống nhanh như thế nào, người dùng đã nhanh chóng làm quen với hệ thống như thế nào, người dùng cảm thấy thế nào về nó.

Một yếu tố duy nhất của điều hướng Android kể từ khi bắt đầu là nút Back. Nhiều người dùng đánh giá cao rằng Android dễ dàng điều hướng và tìm hiểu hơn (mặc dù có nhiều cuộc tranh luận về hành vi chính xác của Back là gì) - và nó được sử dụng rất nhiều! Trong thực tế, nhiều hơn 50% so với ngay cả nút Home. Vì vậy, một trong những mục tiêu thiết kế là đảm bảo cử chỉ phía sau là tiện dụng, đáng tin cậy và trực quan - và ưu tiên mục tiêu này hơn các điều hướng ít thường xuyên hơn như kéo thả và nút Recent.

Nhìn vào các biểu đồ khả năng tiếp cận bên dưới, hai cử chỉ cốt lõi (Back và Home) trùng khớp với các khu vực có thể tiếp cận / thoải mái nhất và chuyển động cho ngón tay cái.

<div align="center">
    
![](https://images.viblo.asia/5ea9d24c-8bd5-4a31-b0b0-acfe65bb7ec1.png)
    
  *Bản đồ nhiệt màn hình điện thoại cho thấy người dùng có thể thoải mái thực hiện các cử chỉ, cầm điện thoại chỉ bằng một tay*
    
</div>

Như đã đề cập, các nguyên mẫu của nhiều mô hình cử chỉ khác nhau đã được xây dựng, so sánh xếp hạng của người dùng và thời gian thực hiện các tác vụ của người dùng về những gì cuối cùng đã trở thành mô hình Q với một số mô hình điều hướng khác. Dưới đây, một vài biểu đồ hiển thị kết quả thử nghiệm:

<div align="center">
    
![](https://images.viblo.asia/924e7a2f-6a29-4b41-9256-0198e6ce5a88.png)
    
  *So sánh xếp hạng của người dùng về công thái học và sử dụng bằng một tay trên các chế độ điều hướng khác nhau (cao hơn là tốt hơn)*
    
</div>

<div align="center">
    
![](https://images.viblo.asia/7464c2ab-a937-40dc-8a0a-33a66a04288f.png)
    
 *So sánh thời gian trung bình cần thiết để hoàn thành các tác vụ Home / Back trên các chế độ điều hướng khác nhau (thấp hơn là tốt hơn)*
    
</div>

<div align="center">
    
![](https://images.viblo.asia/6576e472-5cb2-454d-a589-f5753793138d.png)
    
  *So sánh thời gian trung bình cần thiết để hoàn thành các tác vụ Tổng quan / Gần đây trên các chế độ điều hướng khác nhau (thấp hơn là tốt hơn)*
    
</div>

Người dùng, trung bình, thực hiện các tác vụ liên quan đến Home và Back nhanh hơn hầu hết các kiểu máy khác - thậm chí nhanh hơn so với họ đã làm với các nút. Tuy nhiên, mô hình này có tính cả truy cập nhanh vào Tổng quan / Ứng dụng gần đây, mà người dùng thường truy cập ít hơn một nửa so với Home.

Từ góc độ chất lượng hơn, người dùng đã xem mô hình Q là nhiều hơn một tay và có thể tiếp cận được, mặc dù các nút vẫn được xem là tiện dụng hơn cho nhiều người dùng hơn.

Trên đây mình đã điểm qua về những câu chuyện đằng sau các gesture navigation trên Android cho đến Android Q. Cảm ơn mọi người đã đọc bài của mình :D