**1. Kĩ thuật đảm bảo chất lượng Quality Engineering (QE) là gì?**

- Nếu như trước đây trong thời kỳ phát triển phần mềm thì đội dev viết mã coding, nhóm QA đảm bảo chất lượng vào giai đoạn cuối trong vòng đời phát triển phần mềm, thế nhưng với sự phát triển như ngày nay thì phương pháp này khá lạc hậu rồi.
- Ngày nay mục tiêu của Agile là liên tục kiểm tra, phân tích và nâng cao chất lượng lập trình trong  suốt vòng đời phát triển sản phẩm thay vì chỉ ở cuối chu kỳ như trước
- Do đó kĩ thuật đảm bảo chất lượng phần mềm có thể hiểu nôm na là: 
Giai đoạn đảm bảo chất lượng chuyển từ chỉ thực hiện ở cuối chu trình phát triển phần mềm sang liên tục kiểm tra, phân tích và nâng cao chất lượng sản phẩm trong suốt vòng đời phát triển
![](https://images.viblo.asia/49028abb-fd6d-4031-abe5-bf43bd2bc7ed.jpg)

**2. Nguyên tắc sử dụng** ở đây là "Shift Left" sẽ tiếp cận kiểm thử hệ thống phần mềm. 
![](https://images.viblo.asia/7d87ef2a-e952-4ee1-8805-d6d517355848.jpg)

- Các nguyên tắc “Shift Left” đã ảnh hưởng lớn đến quá trình chuyển đổi sang Kỹ thuật chất lượng . Việc kiểm tra trái là một cách tiếp cận để kiểm thử phần mềm và hệ thống, trong đó thử nghiệm được thực hiện sớm hơn trong vòng đời (ví dụ, di chuyển sang trái trên tiến trình dự án). Các nhóm thử nghiệm (test) và phát triển (dev) làm việc cùng nhau trong một mô hình tích hợp liên tục và điều rất quan trọng là mã code có thể kiểm tra và dễ tích hợp dễ dàng hơn rất nhiều. 

- Nhu cầu và tầm quan trọng của việc kiểm thử phần mềm đang tăng lên nhanh chóng trên toàn cầu. Các ứng dụng và sản phẩm mới phát triển phải được kiểm tra từ đầu tới cuối trong khi vẫn giữ được các tiêu chuẩn về hiệu suất, chức năng, bảo mật --> Quality engineering dùng khả năng của mình trong quá trình coding, automation tiến hành kiểm tra sẽ rất phù hợp với thị trường hiện nay.
- Nhóm development sẽ tìm kiếm được nhiều dữ liệu quan trọng từ các nhóm QE của họ để phát triển coding trước khi đẩy vào môi trường thực production. Do đội QE sẽ xây dựng được cơ sở hạ tầng thử nghiệm và nắm bắt phân tích được các rủi ro tác động đến tầng lớp khách hàng hoặc end user

- Chất lượng sản phẩm là trách nhiệm của tất cả đội ngũ phát triển phần mềm và chỉ có kỹ thuật chất lượng (QE) mới có thể đảm bảo được tính đúng đắn của sản phẩm trước khi đến tay khách hàng hoặc người dùng cuối.


**3. Làm thế nào để trở thành một QE?**

  - Các tổ chức sẽ phải tự chuẩn bị nội bộ để đảm bảo sự chuyển tiếp suôn sẻ từ Đảm bảo chất lượng sang Kỹ thuật chất lượng. Một vài yếu tố mà họ sẽ phải ghi nhớ là:
- Một quy trình kỹ thuật chất lượng mạnh mẽ sẽ xác định và thúc đẩy vòng đời phát triển phần mềm
- Áp dụng phương pháp tự động hóa bền vững (automation giảm thiểu effort kiểm tra thủ công) 
- Mở rộng cơ sở hạ tầng kiểm tra : Đội ngũ kỹ sư chất lượng có thể thực hiện nhiều trường hợp thử nghiệm song song 
- Tích hợp CI / CD và DevOps: Tự động hóa sẽ không hiệu quả nếu nó chỉ tuân theo các cấu trúc kiểu cũ. Quá trình tích hợp liên tục với sự giúp đỡ của kỹ sư DevOps có thể tận dụng tự động hóa thử nghiệm ở cấp độ tiếp theo.
- Môi trường kiểm tra và dữ liệu thử nghiệm: Chuẩn bị môi trường thử nghiệm, cấu hình và dữ liệu thử nghiệm là rất quan trọng để thiết lập gần nhất có thể với môi trường sản xuất.
- Đội QA phải chuyển đổi thành đội QE và trở thành nhà cung cấp dữ liệu hơn là chỉ test lỗi. Họ sẽ phải được tham gia sớm hơn nhiều trong quá trình phát triển phần mềm.
là một phần của thiết kế sản phẩm và thảo luận kiến trúc, viết mã để kiểm tra mã và phát triển công tác tự động hóa kiểm tra có xu hướng hướng tới phát triển thử nghiệm
- Xây dựng các giải pháp tự động phù hợp với thị trường như hiện nay do nhu cầu kiểm thử tăng lên chóng mặt.
- Khách hàng sẽ nhận được toàn bộ tài liệu dự án (thiêt kế, mã code, cơ sở dữ liệu, cơ sở hạ tầng...) với chất lượng cao hơn.

**4. Ưu điểm của QE**
- Tất cả documents của dự án đều được đảm bảo chất lượng hơn trước
- Phát hiện lỗi sớm, giảm chi phí giá thành sản phẩm đi nhiều

**5. Ý nghĩa của việc chuyển đổi từ QA sang QE**

 - Phù hợp với thị trường như hiện nay do nhu cầu kiểm thử tăng lên nhanh chóng.
 - Khách hàng sẽ nhận được toàn bộ tài liệu dự án (thiêt kế, mã code, cơ sở dữ liệu, cơ sở hạ tầng...) với chất lượng cao hơn.