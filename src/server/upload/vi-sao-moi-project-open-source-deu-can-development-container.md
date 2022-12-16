Với sự gia tăng của các ứng dụng cloud native và sự ra đời của các kiến trúc microservice, đã có rất nhiều thay đổi về cách chúng ta phát triển các application, một trong số đó là sự áp dụng Development Container.  
Mục đích chính của việc áp dụng Dev Container là làm cho dự án dễ tiếp cận hơn với các developer trong tương lai. 

## Development containers
Dev container là container Docker đang chạy với tool / runtime stack được xác định rõ và các điều kiện tiên quyết của nó. Về cơ bản, dev container sẽ tự động hóa mọi thứ cần thực hiện trước khi có thể bắt đầu viết code và chạy nó ở local.  
Khái niệm có tất cả các công cụ phát triển cần thiết được đóng gói và phân phối trong một container đã có từ lâu. Sự ra đời gần đây của Remote Container (VS Code Extension) và Dev Environment (một tính năng của  Docker Desktop có từ v3.3.1) đã giúp việc build và sử dụng dev container dễ dàng hơn nhiều.  

## Development lifecycle  

Workflow dành cho development lý tưởng có thể như sau: bạn mở IDE yêu thích của mình (local hoặc desktop), checkout một repo / git branch và bắt đầu viết code. Để chạy code, bạn chỉ cần nhấp vào Run / Debug project.  
Workflow này có vẻ rất quen thuộc, và chúng ta áp dụng nó cho hầu hết các project - thường chỉ sau khi bỏ nhiều thời gian cài đặt, thiết lập và cấu hình môi trường develop của chúng ta, thậm chí có khi phải có tài liệu ghi lại từng step.  
Dev Container có thể giúp chúng ta kích hoạt quá trình vừa nêu ngay từ bước *git clone* đầu tiên. Điều này có thể cải thiện communication của team, tăng khả năng maintenance cho project và sự hài lòng của developer.  
 
## Lợi ích của development containers
Dev container có thể mang lại lợi ích cho tất cả các loại dự án, không chỉ các dự án open source.  
Một project có nhiều hơn 1 người làm việc trên đó, thì việc đầu tư thời gian để thiết lập dev container có lẽ rất hợp lý. Một số lợi ích của dev container có thể kể đến như:
* Nó cho phép các developer nhanh chóng access và lấy code để thử nghiệm. Không ai có thời gian cũng như không muốn dành hàng giờ hoặc hàng ngày chỉ để có thể chạy một ví dụ HelloWorld đơn giản…
* Nó giảm thiểu tác động của các thay đổi của bên thứ ba đối với các tool và runtime stack. Điều này hoàn toàn đúng với bất kỳ dự án nào, nhưng nó đặc biệt ảnh hưởng đến các nhóm phát triển quy mô lớn, những người sử dụng nhiều tool mã nguồn mở. Điều này giúp giảm thiểu trách nhiệm và phạm vi maintenance. Ví dụ: chúng ta cần giảm thiểu thời gian cập nhật documentation của mình do những thay đổi về dependencie của bên thứ 3.  
* Nó có thể thực thi các phương pháp security tốt nhất trong toàn tổ chức hoặc cộng đồng. Gần đây, điều này ngày càng trở nên quan trọng đối với dev machine local/remote, do các cuộc tấn công supply chain ngày càng phổ biến việc khai thác liên kết yếu nhất của delivery lifecycle của phần mềm.  
* Nó đơn giản hóa việc thử nghiệm và học hỏi. Đôi khi việc thay đổi development context có thể rất phức tạp, và dev container có thể giúp đơn giản hoá nó. Ví dụ, với dev container, có thể dễ dàng chuyển đổi giữa các git branch khác nhau mà không cần phải mất thời gian khôi phục configuration, environment và các runtime service.  

## Những vấn đề còn tồn tại
* Vẫn còn thô sơ. Mặc dù container là một công nghệ khá phát triển, nhưng dev container vẫn còn ở phía sau, đặc biệt là về hỗ trợ tool. Điều này làm cho việc xây dựng các custom dev container vẫn còn một chút thách thức.  
* Nó có thể rất chậm. Hiện tại, có một software stack khá đồ sộ và một số lượng lớn các lớp ảo hóa làm nền tảng cho các dev container. Tất nhiên là performance còn phụ thuộc vào workstation (resource, hỗ trợ ảo hóa, hệ điều hành, v.v.) nhưng ngay cả những tác vụ thông thường nhất cũng có thể rất chậm. Ví dụ: nếu bạn mount một thư mục source code từ host lưu trữ vào một container (không sử dụng ổ đĩa), việc thực hiện build / install và run đơn giản có thể mất nhiều thời gian.
* Quản lý portable configuration. Khi cố gắng đặt mọi thứ vào container, việc phải viết các script shell tùy chỉnh dường như là điều không thể tránh khỏi. Dev container cũng không có gì khác biệt. Bạn có thể sẽ thấy khó chịu khi phải mount và parse các file config của host theo cách thủ công, để chúng có ý nghĩa khi áp dụng bên trong container. Ví dụ: thay thế localhost bằng host.docker.internal bằng sed.

## Tạm kết
Dev container có tiềm năng sớm trở thành tiêu chuẩn thực tế trong hầu hết các project hiện đại. Hơn nữa, sẽ không có gì đáng ngạc nhiên nếu nó nhanh chóng khẳng định mình là một phần không thể thiếu của DevOps chính thống. Điều này cũng có thể tạo ra nhiều cơ hội về việc cung cấp các tool chuyên dụng xung quanh các dev container.

## Tham khảo
Đây là một bài dịch, bạn có thể xem bài gốc tại đây.  
https://stefannastic.medium.com/why-every-open-source-project-needs-a-development-container-b1f5180ad5aa  
Tham khảo thêm:
https://github.com/microsoft/vscode-dev-containers