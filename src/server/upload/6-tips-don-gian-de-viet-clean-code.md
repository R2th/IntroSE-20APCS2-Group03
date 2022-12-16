![](https://images.viblo.asia/2d01ddea-638f-4d24-8fde-90a4463ef6ca.jpeg)

Một vấn đề thường xuyên gặp phải trong dự án là dự án có deadline. Bạn không có thời gian cho clean code. Khách hàng và manager của bạn liên tục thúc giục bạn phải hoàn thành phần việc của mình vào cuối tuần này. Bạn phải làm thêm giờ. Và thường kết quả của quá trình này là code của bạn như một đống hỗn độn, không có quy tắc. Chúng ta thường code nhanh để có thể đưa ra được kết quả nhanh nhất có thể. Tuy nhiên, sự thật là điều này dẫn đến việc là tiến độ dự án trở nên chậm hơn. Có nhiều bug phát sinh hơn, điều này dẫn đến việc phải quay lại để fix bug. Mà vì code xấu nên việc tìm bug trở nên khó khăn hơn. Cuối cùng thì thời gian thực hiện toàn bộ công việc lại tốn nhiều hơn sẽ với việc viết clean code từ ban đầu. Hay nói cách khác: phòng bệnh hơn chữa bệnh.

Đã có những thống kê thực tế về việc developer sử dụng thời gian của mình như thế nào. Và cho thấy tỉ lệ thời gian giữa đọc code và viết code là hơn 10:1. Developer dành rất nhiều thời gian scroll lên xuống trong file để tìm 1 đoạn code, không tìm thấy nó rồi mở 1 file khác và lặp lại. Thời gian dành để viết code thực tế ít hơn nhiều so với thời gian đi tìm chỗ để viết nó. Do vậy, nếu bạn dành thời gian làm cho code dễ đọc, bạn sẽ tiết kiệm được nhiều thời gian viết và sửa code.

Sau đây là 6 tips đơn giản để viết clean code

#### 1. Bạn chịu trách nhiệm về chất lượng code của bạn
![](https://images.viblo.asia/04c62160-aa67-4cbf-9457-fd082014bfd9.jpg)

Hãy lấy ví dụ của 1 số nghề nghiệp khác như bác sĩ, luật sư,... Những nghề nghiệp đều có tiêu chuẩn hành nghề nhất định. Khi bạn đến gặp bác sĩ, dù bạn vội thì bạn cũng không nói `"Anh bác sĩ ơi, em đang hơi vội nên anh không cần rửa tay đâu mà khám luôn đi anh ạ"`. Với developer cũng nên tự đặt ra cho mình tiêu chuẩn như vậy, khi code bạn cần chịu trách nhiệm với chính đoạn code mình viết ra, do vậy hãy viết code có chất lượng tốt, dễ hiểu cho người đọc.

#### 2. Sử dụng tên có nghĩa
![](https://images.viblo.asia/e47220c9-575e-47b7-8cf1-2f3c898fafd5.jpg)

Khi viết code, hãy sử dụng những tên có ý nghĩa. 

VD xấu:

`$d; // elapsed time in days`

Tuy là ở VD trên có comment ở bên cạnh là biến này có ý nghĩa gì. Nhưng khi đọc code thì bạn lại phải liên tục quay lại kiểm tra xem biến này có ý nghĩa gì hay phải biến đó. Việc này gây tốn rất nhiều thời gian khi viết code hay đọc hiểu code.

VD tốt:

`$elapsed_time_in_days`


Một nguyên tắc cơ bản khi đặt tên biến là khi đọc tên biến phải biết biến đó chứa giá trị gì. 

#### 3. Viết code thể hiện được mục đích của đoạn code đó
Tên biến và tên hàm cần thể hiện được rõ biến và hàm đó được tạo ra với mục đích gì. Sao cho khi người khác đọc 1 đoạn code có thể biết được đoạn code đó làm việc gì mà không cần bối cảnh (chẳng hạn như không cần biết đoạn code này thuộc class nào, module nào) và quan trọng nhất là ko cần nhiều COMMENT.

#### 4. Comment thường là lời nói dối chờ trực để xảy ra
![](https://images.viblo.asia/8d048bd7-16ee-4341-9b01-be7834cc1169.png)

Viết comment là viết thêm 1 phần khác ngoài code mà sau này bạn hoặc người khác cần phải maintain thêm. Có nhiều trường hợp khi sử dụng comment, những developer khác sau khi họ sửa đoạn code, họ không sửa comment, dẫn đến những comment đó sai. Comment là cần thiết trong một số trường hợp, tuy nhiên nếu có thể thể hiện được mục đích của code qua chính code mà không cần comment, hãy làm như vậy. Vì vậy, trước khi viết 1 đoạn hay suy nghĩ lại xem, mình có thể trình bày được mục đích của mình ở ngay trong code mà không cần comment hay không.

#### 5. Hãy để lại 1 đoạn code đẹp hơn khi bạn tìm thấy nó
Khi bạn đang viết hay sửa 1 đoạn code có sẵn, đừng chỉ tập trung vào viết đoạn code của bạn đúng clean code mà hãy bỏ thêm chút thời gian và xem những đoạn code xung quanh. Hãy xem có đoạn code nào mình có thể viết lại cho dễ hiểu hơn không, có biến nào có thể đặt lại tên hợp lý hơn, có hàm nào mà có thể chia nhỏ cho dễ đọc hơn không,... Bằng việc này, thay vì việc code càng ngày càng hỗn độn hơn thì ngược lại, code trong dự án sẽ càng lúc càng dễ hiểu hơn, clean hơn.

#### 6. Single Responsibility Principle
Là nguyên tắc là một hàm làm 1 việc, làm việc đó tốt và chỉ làm duy nhất việc đó. Hay đối với class, "Một class (object) có một và chỉ một trách nhiệm duy nhất". Nói cách khác, "một class chỉ nên có duy nhất 1 lý do để thay đổi".

Reference: https://www.youtube.com/watch?v=UjhX2sVf0eg