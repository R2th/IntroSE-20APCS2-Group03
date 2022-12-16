Khi mới bắt đầu tìm hiểu về AWS thì regions, availability zones, vpc là các khái niệm đầu tiên ta cần phải nắm được, ở bài dưới đây mình sẽ giải thích các khái niệm trên và xây dựng hệ thống thế nào cho phù hợp.

![](https://images.viblo.asia/5491dc30-a336-4233-b70f-bd13cc18a081.png)

Vòng tròn màu vàng tương ứng với một region, con số ở trong thể hiện số availability zones có trong region đó, vòng tròn màu xánh là region sắp được xây dựng.

# 1. AWS Region
Các AWS region là các vị trí địa lí trên thế giới, nơi mà AWS tập trung xây dựng cơ sở hạ tầng của họ. Trong mỗi region chứa các khu vực khả dụng (availability zone - AZ), mỗi regin là độc lập với các regin khác về mặt cơ sở hạ tầng như khu vực, năng lượng, hệ thống cung cấp nước...Hiện nay AWS có khoảng 23 regions, region lớn nhất: us-east-1, có 5 availability zones

Sự cô lập này đảm bảo các yêu cầu về chủ quyền dữ liệu về việc dữ liệu người dùng không được rời khỏi một khu vực địa lý cự thể. Sự tổ chức các AWS Regin trên thê giới cũng rất quan trọng trong việc giảm độ trễ của hệ thống của bạn, tùy theo mật độ người dùng của chúng ta mà ta có thể chọn Region tại vị trí có nhiều người dùng nhất.

Trong mỗi Region sẽ có một hoặc nhiều vungf khả dụng (availability zone) với mỗi vùng là một trung tâm dữ liệu tách biệt với mỗi vùng khác, vậy thì tại sao lại có sự phân chia này thì mình sẽ giải thích ở phần sau.

![](https://images.viblo.asia/22f71e09-139a-4642-badd-acd17dda836a.png)


# 2. AWS availability zones
Một vùng khả dụng (availability zone) là một khu vực chứa trung tâm dữ liệu (data center). Mỗi availability zone có nguồn điện, mạng và kết nối dự phòng và riêng biệt để giảm khả năng hai khu vực bị lỗi đồng thời. Mỗi availability zone sẽ được hỗ trợ bởi nhiều data center vật lý, với availability zone lớn nhất được hỗ trợ bởi năm data center.

Một availability zone được mở rộng bởi nhiều data center vật lý, tuy nhiên các data center này là riêng biệt với mỗi availability zone, không có data center nào phục vụ đồng thời 2 hay nhiều availability zone.

Trong mỗi zone, các data center được kết nối với nhau bằng các đường dẫn mạng có độ trễ thấp. Tương tự, các zone trong một region giao tiếp với nhau thông qua các đường dẫn mạng riêng. Sự giao tiếp này nhăm mục đích đồng bộ, sao chép và phục hồi dữ liệu khi cần thiết của một số dịch vụ vủa AWS.

Vậy tại sao lại có sự phân chia nhiều availability zone trong một vùng? Biểu đồ dưới đây minh họa một một Region có 2 availability zone nhưng chỉ một zone được sử dụng để xây dự hệ thống. Kiến trúc phản ánh một mô hệ thống ứng dụng 3 tầng (web- app - DB). Với các máy chủ và cơ sở dữ liệu dự phòng được đặt chung trong một availability zone.

![](https://images.viblo.asia/50e8c5a8-a3a7-477c-b96d-3ddb4dd5e967.png)


Tuy có các máy chủ dự phòng, kiến trúc hệ thống trên sẽ dễ phát sinh lỗi [single point of failure](https://en.wikipedia.org/wiki/Single_point_of_failure). Vì khi availability zone này gặp sự cố, toàn bộ hệ thống ứng dụng sẽ không hoạt động được nữa. Mô hình phân tán hệ thống ra nhiều zone dưới đây sẽ giải quyết được vấn đề này.

![](https://images.viblo.asia/6498fb8b-1a9a-4706-9ebf-5552fb396e8f.png)


Bằng cách đặt các instance của mỗi lớp ở 2 zone riêng biệt, người dùng sẽ tránh được lỗi single point of failure. Bộ cân bằng tải (Amazon Elastic Load Balancers - ELBs) nằm ở các cấp ứng dụng khác nhau đảm bảo rằng ngay cả khi toàn bộ zone ngoại tuyến, lưu lượng truy cập sẽ được chuyển hướng đến zone thích hợp. ELB là một trong nhiều dịch vụ AWS có phạm vi Region và có thể trải dài qua các zone trong một region nhất định, vì thế nó vẫn hoạt động khi một zone gặp sự cố.

# 3. AWS virtual private clouds

![](https://images.viblo.asia/fc4cc978-3c03-4ef4-9449-86f54c825b7f.png)


VPC trong AWS rất rộng nên ở bài này chỉ nói về mặt khái niệm, chi tiết cụ thể sẽ giải thích và thực hành ở phần tiếp theo.
VPC là một hệ thống mạng riêng ảo, phạm vi trong một AWS region, được sử dụng để:
- Cô lập các tài nguyên AWS của bạn khỏi các tài khoảng khác
- Điều hướng network ra và vào
- Bảo vệ các tài nguyên AWS của bạn khỏi các cuộc tấn công mạng

Bạn có thể đặt toàn bộ hệ thống vào một VPC để cô lập với môi trường bên ngoài. Bạn có toàn quyền kiểm soát môi trường mạng ảo của mình, bao gồm lựa chọn dải địa chỉ IP của riêng bạn, tạo mạng con và cấu hình bảng định tuyến và cổng mạng. Với VPC bạn có thể cấu hình để các thành phần nào có thể cho phép truy cập internet vào và ra (server, file store) và các thành phần nào không (database, ...)