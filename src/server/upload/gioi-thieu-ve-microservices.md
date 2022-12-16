# Mở Đầu
Dạo gần đây, mình có tham gia một dự án của công ty và có nhận ra một điều rằng, dự án này rất to. Vì vậy lượng code của nó thì chắc chắn không cần nói, khổng lồ. Và mỗi khi khách hàng có sự thay đổi về yêu cầu thì việc update nó thật khủng khiếp. Dự án trên là thể hiện cho một mô hình mà theo mình tìm hiểu được gọi là mô hình Nguyên Khối (**Monolithic Architecture**). 

Đây là mô hình đặc thù của phần lớn các dự án mà theo mình khi phát triển ban đầu thì không quá khó nhưng để phát triển và cải thiện thì khá là khó.

Và đó là lí do ra đời của một mô hình khác có vẻ hợp lý hơn mô hình cũ này. Đó là mô hình Dịch Vụ Vi Mô (**Microservices Architecture**). Vậy mô hình này là gì và nó có khác biệt gì so với mô hình cũ kia không thì bài viết này chúng ta sẽ đi phân tích nó :)) 
# Nội Dung
## Bài Toán
Ví dụ, nếu sếp chúng ta kéo được một dự án về, specs rõ ràng, chúng ta sẽ làm gì đây :)) 

Bắt tay vào phân tích yêu cầu và code luôn chứ sao nữa. Code từ đầu đến cuối, database này, modules này, controller này, view này, ... Và sau "en nờ" ngày tháng thì chúng ta đã có một sản phẩm khá ổn :))
![](https://images.viblo.asia/530ab1d8-5912-4446-a653-0560b1a1f1f1.png)

Bàn giao lại cho khách hàng, khách hàng ok, sau đó lại giao thêm yêu cầu nữa. 

Và đây sẽ là phần thú vị, yêu cầu thêm tính năng. Chúng ta sẽ phải phân tích và nhận ra rằng cần có sự update trong một module nào đó, nhưng mà giờ mà update module này thì nó lại ảnh hưởng đến module khác, và thế này một đống code được update vào.
Và sau n yêu cầu thì ta nhận ra rằng cái dự án so với ban đầu chỉ cần qua vài lần thay đổi yêu càu là nó to lên khủng khiếp =)) Toang thật sự. 

# Giải Pháp
Để giải quyết bài toán trên thì mô hình **Microservices** đã được áp dụng. 
## Định Nghĩa
> Kiểu kiến trúc Microservice là một cách tiếp cận để phát triển một ứng dụng như một bộ dịch vụ nhỏ , mỗi dịch vụ chạy trong quy trình riêng và giao tiếp với các cơ chế nhẹ, thường là API tài nguyên HTTP và nó thể được viết bằng các ngôn ngữ lập trình khác nhau và sử dụng các công nghệ lưu trữ dữ liệu khác nhau.
## Áp Dụng
Quay trở lại bài toán trên, nếu chúng ta áp dụng mô hình **Microservices** vào, chúng ta sẽ có các khối service nhỏ như sau:
![](https://images.viblo.asia/56bbefd0-0c40-469d-a2ff-323572cbb201.png)

Như hình trên có thể thấy ta sẽ tách các dịch vụ của dự án đó ra thành các thành phần con, mỗi một thành phần nhỏ đảm nhiệm một phần chức năng phục cho cho dự án, được điều khiển bởi một trình quản lí khác nhau. Điều này đảm cho cho các dịch vụ chạy độc lập với nhau mà không bị ảnh hưởng bỏi các dịch vụ khác khi chúng ta thay đổi. 

Khi đó việc liên kết các khối dịch vụ này với nhau được thực hiện thông qua Rest API:

![](https://images.viblo.asia/fda5de98-4c10-4e0e-8c28-82ca22971c62.png)

Khi tách các dịch vụ ra thế này thì việc đảm bảo sự thống nhất về dữ liệu chạy giữa các hệ thống là một vấn đề khó, do mỗi một dịch vụ sẽ có riêng một cơ sơ dữ liệu riêng phục vụ.

Tuy chúng ta hưởng lợi từ việc không bị ràng buộc về công nghệ sử dụng giữa các dịch vụ nhưng chúng ta lại gặp vấn đề khó khăn về mặt thống nhất và đồng bộ dữ liệu =))

## Ưu Điểm
* Phải thừ nhận rằng điểm mạnh nhất của mô hình dịch vụ Microservice này là nó giúp dự án dễ nâng cấp và mở rộng.
* Do tách các service thành các khối nhỏ nên khi một service bị chết thì dự án vẫn chạy bình thường, điều mà khó có thể xảy ra với mô hình Monolith do các service được viết chung vào với nhau
* Việc thoải mái sự dụng các công nghệ khác nhau trong từng service giúp dự án có thêm nhiều lựa chọn về các công nghệ và cơ sử dữ liệu cho riêng mình
* Tách biệt các chức năng giúp tập trung phát triển cho từng service, dễ dàng thay đổi
##  Nhược Điểm
* Do việc phân tách thành các service con nên cũng sẽ có các cơ sở dữ liệu con, nên việc kiểm soát sự thống nhất và đồng bộ dữ liệu giữa các cơ sở dữ liệu là vấn đề khó
* Phương thức giao tiếp giữa các service cần lựa chọn để đảm bảo khả năng giao tiếp
* Sử dụng nhiều service nên việc theo dõi, quản lý các service này sẽ phức tạp hơn

Đó như các bạn thấy, ưu điểm cũng có mà khuyết điểm cũng có. Nói chung là áp dụng mô hình nào là còn tùy các tình hình phát triển của các thành viên trong dự án cũng như tiềm năng phát triển mở rộng của dự án. 

Chém gió vậy thôi, hi vọng bài viết mang được phần thông tin nào đó để bạn hình dung ra mô hình phát triển này.

Bài viết tham khảo https://www.nginx.com/blog/introduction-to-microservices/