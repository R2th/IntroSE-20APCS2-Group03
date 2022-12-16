# Giới thiệu
 Báo cáo lỗi là một khía cạnh quan trọng của kiểm thử phần mềm. Một báo cáo lỗi tốt giúp giao tiếp tốt với đội ngũ phát triển hiệu quả và tránh nhầm lẫn, bên cạnh đó cũng là để phòng ngừa và phát hiện những vấn đề nghiêm trọng xảy ra, liên quan và ảnh hưởng trực tiếp đến chất lượng sản phẩm phần mềm..
# Báo cáo lỗi hiệu quả
* Một báo cáo lỗi tốt phải rõ ràng và súc tích mà vẫn không thiếu các điểm chính. Bất kỳ sự thiếu rõ ràng nào sẽ dẫn đến sự hiểu nhầm và làm ảnh hưởng đến quá trình phát triển dự án. Viết báo lỗi là một trong những giai đoạn quan trọng nhất trong việc kiểm thử giúp cho người đọc có thể dễ dàng nhìn ra được vấn đề đang xảy ra.

![](https://images.viblo.asia/6c160fb7-c427-4d98-a835-8a5398da796b.jpg)

*  Viết báo cáo là một quá trình quan trọng để gửi một lỗi. Một điều quan trọng mà một người kiểm thử nên ghi nhớ là không sử dụng lệnh chỉ huy trong báo cáo. Điều này sẽ làm phá vỡ tinh thần đồng đội và tạo ra một môi trường làm việc không lành mạnh. Hãy luôn tạo sự thoải mãi giữa Test và Dev.

*  Nên kiểm tra danh sách các lỗi đã có sẵn tránh log những bug bị trùng. Lỗi trùng lặp xảy ra sẽ khiến Dev dễ mất lòng tin vào mình, và gây tốn thời gian của dự án 
 
*  Thông tin quan trọng mà báo cáo lỗi phải có là "Làm thế nào?" , "Ở đâu?" và "Xảy ra khi nào?".Báo cáo lỗi phải trả lời rõ ràng các hỏi : "cách kiểm tra đã được thực hiện như thế nào và nơi xảy ra lỗi là ở đâu?" Người đọc sẽ dễ dàng hiểu và tìm lỗi ở đâu.

*  Hãy nhớ rằng mục tiêu của việc viết báo cáo lỗi là để cho người đọc hình dung ra vấn đề đang xảy ra.  Hãy tập trung vào một vấn đề cụ thể đang gặp phải, cung cấp đầy đủ thông tin có liên quan mà Dev đang tìm kiếm. Tránh log chung nhiều vấn đề vào 1 bug sẽ gây khó hiểu cho người đọc, khiến Dev mất nhiều thời gian để có thể giải quyết và close được bug.

 Cũng nên lưu ý rằng một báo cáo lỗi tốt, trong tương lai có thể dễ dàng xem lại và sử dụng.
# Các nội dung quan trọng trong báo cáo lỗi
Mỗi công ty, dự án khác nhau sẽ có cách quản lý lỗi khác nhau, các biểu mẫu và cách báo cáo lỗi khác nhau. Nhưng nhìn chung thì log bug chúng ta cũng đều phải đảm bảo và lưu ý một số yếu tố dưới đây:

**1) Bug number/ID**: Số lỗi/ID giúp cho báo cáo lỗi và đề cập đến một lỗi dễ dàng hơn. Giúp đội phát triển có thể dễ dàng kiểm tra lỗi đã được fix hay chưa? Giúp Tester có thể tìm kiếm thực hiện test và re-test dễ dàng.

**2) Bug Title (Tiêu đề lỗi):** Tiêu đề lỗi sẽ được đọc nhiều nhất trước khi mở lỗi và đọc những phần tiếp theo. Tiêu đề lỗi nên gợi ý đủ về những gì lỗi đang xảy ra. Một tiêu đề rõ ràng làm cho người đọc hiểu rõ hơn, có thể biết được lỗi đã được báo cáo trước đó hay chưa hoặc đã được fixed hay chưa?

**3) Priority (Mức độ ưu tiên):**  Dựa vào mức độ nghiêm trọng của lỗi, bạn có thể đặt ra độ ưu tiên cho nó để có thể cung cấp mức độ ảnh hưởng của lỗi đến hệ thống trước xem trước hết nội dung. Tùy từng hệ thống, thường thì sẽ dựa vào chỉ số này để ưu tiên các bug nào sẽ phải được/nên được fix trước

**4) Description (Mô tả):** Mô tả lỗi giúp đội phát triển hiểu được lỗi. Nó mô tả các vấn đề đang gặp phải. Mô tả không rõ ràng sẽ tạo ra sự nhầm lẫn và lãng phí thời gian của đội phát triển. Cần phải thông báo rõ ràng về hiệu quả trong mô tả. Sẽ rất hữu ích nếu sử dụng các câu hoàn chỉnh. Một báo cáo tốt là có thể tách riêng từng vấn đề một cách riêng biệt thay vì gộp chung vấn đề. Không sử dụng cụm từ như "Tôi nghĩ" hoặc "Tôi tin".

**5) Step (Các bước để tái hiện):** Một báo cáo lỗi tốt nên đề cập rõ đến các bước để tái hiện lỗi. Các bước nên bao gồm các hành động gây ra lỗi. Không đưa ra các tuyên bố chung, hãy cụ thể trong các bước để làm theo.
VD: Các bước kiểm tra thông tin profile hiển thị: 
1. Đăng nhập vào hệ thống 
2. Tới màn hình Profile
3. Kiểm tra thông tin cá nhân hiển thị 

**6)Environment (Môi trường test):**   Môi trường test và cấu hình trình duyệt là 1 yếu tố cần thiết cho một báo cáo lỗi rõ ràng. Đó là cách tốt nhất để truyền đạt giúp người đọc tái hiện bug. Nếu không môi trường chính xác, ứng dụng có thể hoạt động khác và lỗi ở cuối của người đọc báo cáo lỗi không thể tái hiện được. Vì vậy tốt nhất nên đề cập đến rõ ràng môi trường phát hiện lỗi.
+ Thiết bị : Bạn đang sử dụng loại phần cứng nào? Mô hình cụ thể nào?
+  OS : Sử dụng phiên bản nào của hệ điều hành ?
+  Browser: Trình duyệt được sử dụng là gì? 

**7) Expected and Actual Result (Kết quả mong đợi và thực tế) :** Mô tả lỗi sẽ không đầy đủ nếu  không có kết quả dự kiến và thực tế. Cần nêu được kết quả cụ thể sau khi tiến hành cac bước kiểm thử là gì và mong đợi kết quả mới như thế nào. 

**8) Attachment (Bằng chứng: Video, Ảnh chụp màn hình lỗi):** Chụp ảnh màn hình,quay video ở trường hợp thất bại với phụ đề phù hợp để làm rõ hơn lỗi đang báo cáo là gì, giúp người đọc có thể kiểm tra và làm theo dễ dàng.

Sau đây là một ví dụ cụ thể trong quá trình viết báo cáo lỗi: "Hiển thị trang chết khi người dùng click vào icon Profile" 

![](https://images.viblo.asia/f4e49828-eda2-4388-b71f-c953dd43d613.png)

# Kết luận
 Lời khuyên tốt để viết báo cáo lỗi hiệu quả là phải chính xác và rõ ràng. Khi báo cáo 1 lỗi cần luôn phải nhớ rằng mô tả cần ngắn gọn, rõ ràng, dễ hiểu, cung cấp đầy đủ thông tin cần thiết, để có thể dễ dàng tái hiện lỗi , tránh mất thời gian để trao đổi quá nhiều lần. Nên nhớ rằng một báo cáo lỗi hiệu quả giúp giao tiếp tốt với đội ngũ phát triển, không bị lãng phí thời gian.
## Nguồn tham khảo 
https://testlio.com/blog/the-ideal-bug-report/