# 1. Tổng quan
## Về kiến trúc Monolithic
Trên mạng có khá nhiều các cách giải thích về kiến trúc này và nhiều bạn khi lập trình một ứng dụng web nào đó cũng hay dùng nhưng để tóm lược cho dễ hiểu nhất thì như tên gọi Monolithic - nguyên khối - đây là ứng dụng mà mọi dịch vụ đều nằm trên một hệ thống và dùng chung 1 database. Người dùng cứ thẳng đuột mà thao tác với giao diện, giao diện gọi đến chức năng, chức năng lại tìm đến dữ liệu trong database. Đó chính là kiến trúc Monolithic - Nguyên khối.
## Về kiến trúc Microservce
Do có cái nhìn tổng quan nhờ Monolithic thì ta cũng mườn tượng ra kiến trúc Microservice như nào rồi. Đó là kiểu kiến trúc thay vì các chức năng được đặt cùng nhau trong hệ thống thì nó sẽ được tách riêng lẻ và có thể với mỗi chức năng đó sẽ tương tác đến các database khác nhau.
# 2. So sánh
## Độ phức tạp
Về độ phức tạp ta sẽ phải xem xét về 2 vấn đề:
* Độ phức tạp của quá trình phát triển
* Độ phức tạp của việc triển khai phần mềm. 
	
Đối với sự phức tạp của việc phát triển, kích thước của codebase có thể nhanh chóng phát triển khi xây dựng phần mềm dựa trên microservice. Nhiều mã nguồn có liên quan, sử dụng các framework, ngôn ngữ khác nhau và  các phiên bản thư viện ở từng dịch vụ có thể sẽ 0khác nhau. Đối với khía cạnh điều hành và giám sát, số lượng dịch vụ bị ảnh hưởng có liên quan nhiều. Kiến trúc nguyên khối chỉ giao tiếp trong phạm vi nhất định, đó có nghĩa là mỗi chức năng cụ thể sẽ luôn có một quy trình xử lý của mình. Bên cạnh đó, một chức năng trong kiến trúc microservice có thể ảnh hưởng đến các dịch vụ khác nhau. 
	
Với việc triển khai hệ thống microservices có thể dùng nhiều công cụ khác nhau, lấy ví dụ như Kubernetes là một công cụ phổ biến thì việc triển khai cũng khá phức tạp, mặc dù Kubernetes cho phép các khả năng như tự động mở rộng quy mô, nhưng nó không phải là một hệ thống dễ quản lý. Bên cạnh đó, để triển khai một hệ thống sử dụng kiến trúc nguyên khối, chỉ cần một thao tác sao chép đơn giản là đủ. Để bắt đầu hoặc dừng hệ thống nguyên khối thường chỉ cần một lệnh đơn giản là đủ. Các dữ liệu giữa các dịch vụ cũng làm tăng thêm sự phức tạp khi chạy ở kiến trúc microservice, so với một khối nguyên khối. Ngoài ra việc đồng bộ hóa cũng là 1 thử thách ở kiến trúc microservice. Ví dụ: việc xử lý các requests không tốt có thể gây ra lỗi thanh toán hai lần. Các kiến trúc microservice có thể quản lý điều này bằng cách sử dụng các kỹ thuật như bộ điều phối trung tâm. Tuy nhiên, trong một kiến trúc nguyên khối, các giao dịch rất dễ xử lý hoặc thậm chí minh bạch đối với nhà phát triển.
    
👉️ Kiến trúc nguyên khối thắng về độ phức tạp
## Độ tin cậy
Khi thiết kế hệ thống ta phải giả định rẳng hệ thống sẽ gặp sự cố tại một thời điểm nào đó. Với hệ thống sử dụng kiến trúc Microservcies, một dịch vụ trong hệ thống bị lỗi, người quản lý chỉ cần khoanh vùng và đưa ra giải pháp để xử lý dịch vụ đó khiến cho hệ thống sẽ vẫn hoạt động bình thường với các chức năng đang hoạt động. Kiến trúc Microservices đã cung cấp một số các giải pháp để giải quyết vấn đề này như Chaos Monkey (Netflix).
	
    
Bên cạnh đó với kiến trúc nguyên khối việc xảy ra sự cố sẽ gây tê liệt toàn bộ hệ thống dẫn đén thiệt hại khá lớn

VD: Nếu xảy ra sự cố sập máy chủ, hệ thống với các dịch vụ được phân tán khắp nơi sẽ được đảm bảo an toàn hơn.

👉️Microservices giành chiến thắng về độ tin cậy 

## Tài nguyên sử dụng
Với một hệ thống nhỏ việc gọi đến một request thì kiến trúc Microservice sẽ sử dụng nhiều tài nguyên hơn (trong trường hợp thuật toán giống nhau). Một số chi phí phát sinh có thể do docker, máy ảo, việc ghi nhật ký, giám sát tiến trình … 
	
    
Tuy nhiên, microservices cho phép chúng ta sử dụng tài nguyên thông minh hơn rất nhiều. Vì người quản lý có thể phân bổ tài nguyên khi cần thiết nên mức sử dụng tài nguyên thực tế có thể thấp hơn nhiều. 
	
Do việc so sánh 2 kiến trúc thường sẽ thực hiện trên các hệ thống có quy mô lớn nên đây có thể coi là điểm tốt hơn của microservices so với monolithic.

👉️Microservices giành chiến thắng về tài nguyên sử dụng với hệ thống lớn. 

## Khả năng mở rộng
Nhờ tính linh hoạt khi kết hợp các dịch vụ trong hệ thống nên việc mở rộng đối với kiến trúc Microservices sẽ dễ dàng hơn. Với kiến trúc Monolithic việc thêm các tính năng sẽ càng làm cho codebase của dự án lớn lên, các công nghệ có thể xung đột khi thêm một chức năng mới. Ngoài ra chi phí cũng là một điểm cần lưu ý do tính linh hoạt khi tính phí theo từng khoảng thời của các dịch vụ riêng lẻ trong hệ thống sử dụng kiến trúc

Microservices, điều này sẽ giúp tiết kiệm hơn so với việc chạy liên tục của hệ thống sử dụng kiến trúc nguyên khối.

Để mở rộng quy mô một cách chính xác và sử dụng tài nguyên tốt hơn thì kiến trúc Microservices sẽ mang lại nhiều lợi ích hơn

👉️Microservices giành chiến thắng về khả năng mở rộng. 

## Hiệu suất truyền tải
Trong các khối lượng công việc không thể chạy đồng thời trên toàn mạng, kiến trúc nguyên khối có thể mang lại hiệu suất tốt hơn. Dữ liệu cần được gửi giữa các dịch vụ và cũng như tất cả cơ sở hạ tầng gây ra một chi phí nhất định. Nếu khối lượng công việc không thể được chia tỷ lệ cho nhiều trường hợp, một hệ thống sử dụng kiến trúc nguyên khối có thể mang lại hiệu suất truyền tải cao hơn.

Với khối lượng công việc được chạy trong cùng local và không có chi phí do container, giám sát container hoặc dịch vụ, 

👉️Kiến trúc nguyên khối giành chiến thắng về hiệu suất truyền tải

# Tổng kết
![image.png](https://images.viblo.asia/c683507a-2d7f-4e9b-86ec-ecc1ffc48302.png)

💪Với mỗi từng kiến trúc sẽ có ưu nhược điểm riêng nên việc lựa chọn kiến trúc sẽ tùy thuộc vào dự án mà bạn sẽ triển khai.