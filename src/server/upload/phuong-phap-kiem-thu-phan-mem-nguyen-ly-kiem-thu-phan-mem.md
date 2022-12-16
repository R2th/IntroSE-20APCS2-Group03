# 1. Phương pháp kiểm thử phần mềm (Testing Methods)
Có ba phương pháp kiểm thử phần mềm:
- Kiểm thử hộp trắng (White box testing)
- Kiểm thử hộp đen (Black box testing)
- Kiểm thử hộp xám (Gray box testing)

## 1.1 Kiểm thử hộp trắng (White box testing)

![](https://images.viblo.asia/b21963ea-9d3e-4add-992a-5ce1d4b542d9.PNG)

Trong kiểm thử hộp trắng, cấu trúc mã hoặc thuật toán của chương trình được đưa vào xem xét. Các trường hợp kiểm thử được thiết kế dựa vào cấu trúc mã hoặc cách thức làm việc của chương trình. Người kiểm thử truy cập vào mã nguồn của chương trình và có thể kiểm tra nó, lấy đó làm cơ sở để hỗ trợ việc kiểm thử.

## 1.2 Kiểm thử hộp đen (Black box testing)

![](https://images.viblo.asia/c27339b6-9be2-49b5-abc7-b8d0f1bf2243.PNG)
Trong khi đó kiểm thử hộp đen không yêu cầu người kiểm thử cần phải có bất kỳ kiến thức về mã hoặc thuật toán của chương trình. Nó kiểm tra các chức năng của hệ thống tức là những gì hệ thống được cho là cần phải làm dựa trên các " Đặc tả yêu cầu". Các trường hợp kiểm thử thường được xây dựng xung quanh nó.

Hay nói cách khác, kiểm thử hộp đen là phương pháp test dựa trên đầu vào và đầu ra của chương trình để test mà không quan tâm tới code bên trong được viết ra sao. Tester xem phần mềm như là một hộp đen.

## 1.3 Kiểm thử hộp xám (Gray box testing)
![](https://images.viblo.asia/2072c927-195d-4f0e-b5b4-e5b544be36d5.PNG)

Kiểm thử hộp xám là một phương pháp kiểm thử phần mềm được kết hợp giữa phương pháp kiểm thử hộp đen và phương pháp kiểm thử hộp trắng. 

Trong kiểm thử hộp xám, cấu trúc bên trong sản phẩm chỉ được biết một phần, tester có thể truy cập vào cấu trúc dữ liệu bên trong và thuật toán của chương trình với mục đích là để thiết kế test case, nhưng khi test thì test như là người dùng cuối hoặc là ở mức hộp đen.

# 2. Nguyên lý kiểm thử phần mềm 

Có bảy nguyên lý khi kiểm thử phần mềm:
- Kiểm thử đưa ra lỗi
- Kiểm thử cạn kiệt là không thể
- Kiểm thử càng sớm càng tốt
- Sự tập trung của lỗi
- Nghịch lý thuốc trừ sâu
- Kiểm thử phụ thuộc vào ngữ cảnh
- Không có lỗi - Sai lầm 

## 2.1 Kiểm thử đưa ra lỗi

Kiểm thử có thể cho thấy rằng phần mềm đang có lỗi, nhưng không thể chứng minh rằng phần mềm không có lỗi. Kiểm thử được thực hiện bằng những kĩ thuật khác nhau. Kiểm thử làm giảm xác suất lỗi chưa tìm thấy vẫn còn trong phần mềm, ngay cả khi đã kiểm thử nghiêm ngặt phần mềm vẫn có thể còn lỗi. Vì vậy chúng ta phải tìm được càng nhiều lỗi càng tốt.

## 2.2 Kiểm thử cạn kiệt là không thể
Nguyên lý này nói rằng, kiểm tra mọi thứ trong phần mềm một cách trọn vẹn là không thể. Kiểm thử với tất cả các kết hợp đầu vào và đầu ra, với tất cả các kịch bản là không thể trừ phi nó chỉ bao gồm ít trường hợp thì có thể kiểm thử toàn bộ. Thay vì kiểm thử toàn bộ, việc phân tích rủi ro và dựa trên sự mức độ ưu tiên chúng ta có thể tập trung việc kiểm thử vào một số điểm cần thiết, có nguy cơ lỗi cao hơn.

## 2.3 Kiểm thử càng sớm càng tốt
Nguyên lý này yêu cầu bắt đầu thử nghiệm phần mềm trong giai đoạn đầu của vòng đời phát triển phần mềm. Các hoạt động kiểm thử phần mềm từ giai đoạn đầu sẽ giúp phát hiện bug sớm hơn. Nó cho phép chuyển giao phần mềm theo yêu cầu đúng thời gian với chất lượng dự kiến.

## 2.4  Sự tập trung của lỗi
Thông thường, lỗi tập trung vào những module, thành phần chức năng chính của hệ thống. Nếu xác định được điều này bạn sẽ tập trung vào tìm kiếm lỗi quanh khu vực được xác định. Nó được coi là một trong những cách hiệu quả nhất để thực hiện kiểm tra hiệu quả.

## 2.5 Nghịch lý thuốc trừ sâu
Nếu bạn sử dụng cùng một tập hợp các trường hợp kiểm thử liên tục, sau đó một thời gian các trường hợp kiểm thử không tìm thấy lỗi nào mới. Hiệu quả của các trường hợp kiểm thử bắt đầu giảm xuống sau một số lần thực hiện, vì vậy luôn luôn chúng ta phải luôn xem xét và sửa đổi các trường hợp kiểm thử trên một khoảng thời gian thường xuyên.

## 2.6 Kiểm thử phụ thuộc vào ngữ cảnh
Theo nguyên tắc này thì việc kiểm thử phụ thuộc vào ngữ cảnh và chúng ta phải tiếp cận kiểm thử theo nhiều ngữ cảnh khác nhau. 

Nếu bạn đang kiểm thử ứng dụng web và ứng dụng di động bằng cách sử dụng chiến lược kiểm thử giống nhau, thì đó là sai. Chiến lược để kiểm thử ứng dụng web sẽ khác với kiểm thử ứng dụng cho thiết bị di động của Android.

## 2.7 Không có lỗi - Sai lầm 
Việc không tìm thấy lỗi trên sản phẩm không đồng nghĩa với việc sản phẩm đã sẵn sàng để tung ra thị trường. Việc không tìm thấy lỗi cũng có thể là do bộ trường hợp kiểm thử được tạo ra chỉ nhằm kiểm tra những tính năng được làm đúng theo yêu cầu thay vì nhằm tìm kiếm lỗi mới.

# Kết Luận
Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về "Phương pháp kiểm thử phần mềm" và "Nguyên lý kiểm thử phần mềm" .Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn về các phương pháp cũng như những nguyên lý này cũng như áp dụng hiệu quả nó vào công việc của bạn.

Tài liệu tham khảo: http://hoccungchuyengia.com/cac-phuong-phap-kiem-thu-phan-mem/, http://kiemthuphanmemvvn.blogspot.com/2015/03/nguyen-tac-testing.html