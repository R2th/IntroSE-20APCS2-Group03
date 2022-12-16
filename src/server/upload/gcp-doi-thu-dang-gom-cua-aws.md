AWS có thể nói là tiêu chuẩn trong dịch vụ cung cấp dịch vụ điện toán đám mấy, song cũng có những "điểm trừ" nhất định. Và ngày hôm nay, chúng ta sẽ cùng nhau so sánh 2 đối trọng lớn trong mảng này: AWS vs GCP 

![img](https://miro.medium.com/max/536/0*2n5BCKrD1FgQnBJT.jpg)

Vào năm 2006, AWS đã phất ngọn cờ đầu tiên trong ngành công nghiệp IaaS (Infrastructure as a Service) và độc tôn thị trường này trong 5 năm trước khi các nhà cung cấp "mặt bự" khác xuất hiện.  Tuy nhiên, chính điều này cũng là lý do khiến AWS có những điểm bất cập, hạn chế - mà các đối thủ có thể khai thác. Một ví dụ điển hình: số lượng dịch vụ của AWS quá nhiều! 

![img](https://miro.medium.com/max/990/0*pcpo49vuMxiu1VoV.jpg)

Tuy không thể khoe khoang hàng dài danh sách dịch vụ như AWS, nhưng Google Cloud Platform đang rất nhanh chóng tiếp tục bổ sung vào danh sách của riêng mình. Các bạn có thể tham khảo ở [đây](https://cloud.google.com/products/). Trông có vẻ nhiều thật, nhưng thực tế đa phần các dịch vụ của AWS hướng đẫn những đối tượng đặc thù, và chỉ rất ít trong số đó là cần thiết cho mọi Project - với những dịch vụ loại này thì GCP đang tỏ ra là một đối thủ trực tiếp, với một vài dịch vụ thầm chí còn qua mặt AWS.

Dưới đây là những khía cạnh mà Google Cloud đang cạnh tranh khốc liệt với AWS

- Chính sách giảm giá dài hạn (Long-term discounts)
- Các dịch vụ Big Data và Machine Learning
- Tùy chỉnh thiết lập Instance (có thể hiểu là các Virtual Machines) và payment (phương thức thanh toán)
- Privacy và traffic security

# Chính sách Long-term discounts, bắt đầu từ 1 tháng sử dụng, ko phải 1 năm

Các chính sách "Khách hàng trung thành" chiếm vai trò không thể bàn cãi trong việc giúp các Khách Hàng (KH) này sử dụng hiệu quả từng Dollar của họ, và cũng do đó giữ chân họ sử dụng dịch vụ lâu dài. 

Ở đây có một điểm khác biệt rất lớn giữa cách làm của AWS và GCP.

Trong khi KH của AWS chỉ có thể nhận được discount sau [hợp đồng 1 năm sử dụng](https://aws.amazon.com/ec2/pricing/reserved-instances/buyer/) cam kết không được thay đổi kế hoạch sử dụng dịch vụ - điều này rõ ràng là một sự lựa chọn không khôn ngoan vì, chiến lược business các công ty thay nhanh và bất thường, nếu chưa muốn kể đến chuyện 1 năm là quãng thời gian đủ dài để tiêu tốn một khoản tiền lớn.

GCP cũng trang bị cho mình một chính sách tên [sustained-use discounts](https://cloud.google.com/compute/docs/sustained-use-discounts) (tạm dịch "Gói giảm giá khi duy trì dử dụng"). Chỉ sau khoảng 1 tháng sử dụng dịch vụ, KH có thể nhận được lợi ích từ chính sách này, thậm chí có thể sử dụng gói giảm giá đó cho những kế hoạch dử dụng dịch vụ khác (không nhất thiết là áp mức giảm giá đó cho kế hoạch dịch vụ đang sử dụng). 

Điều này khiến chính sách của GCP ưu thế, nổi trội hơn nhiều so với chính sách mà AWS đang ban hành. KH có thể xem đây là một khoản đầu tư thử nghiệm dịch vụ GCP trong một tháng đầu tiên, và sau đó xem xét thêm... chứ không phải bị ràng buộc pháp lý trong khoảng thời gian dài 1 năm như thế. 

![img](https://miro.medium.com/max/1200/1*R_6b5_hhtocYqNHn6dhZPQ.jpeg)

# Big Data and Machine Learning products

AWS chắc chắn dẫn đầu trong lĩnh vực xây dựng các hệ thống Big Data, do có quan hệ sâu rộng với nhiều [tools DevOps nối tiếng](https://itsvit.com/blog/types-big-data-tools-svit-uses/) như [Docker và Kubernetes](https://itsvit.com/blog/docker-kubernetes-till-death-us-part/), cũng như cung cấp giải pháp điện toán serverless [AWS Lambda](https://aws.amazon.com/lambda/details/), đặc biệt cho những nhiệm vụ phân tích Big Data đòi hỏi thời gian ngắn.

Mặt khác, GCP thì sở hữu cho mình một "mỏ" Big Data khổng lồ từ Google Chrome, mà được cho là [xử lý đến hơn 2 nghìn tỉ lượt tìm kiếm mỗi năm](https://searchengineland.com/google-now-handles-2-999-trillion-searches-per-year-250247). Rõ ràng, để handle "mỏ vàng" này đòi hỏi bộ sản phẩm đủ sức mạnh và giải pháp không đâu hết chính là [Bigquery](https://cloud.google.com/bigquery/) . 

Bigquery được trang bị khả năng xử lý nhanh chóng khối lượng cực lớn data, đưa ra những phân tích sâu theo thời gian thực trên số data đó. Và một điểm cộng lớn là Bigquery rất dễ để thao tác, sử dụng, chỉ yêu cầu rất ít hoặc thậm chí không đòi hỏi kiến thức về kĩ thuật của bạn. (Ngoài việc bạn phải bỏ ra 300$ để sử dụng  :smile:)

# Instance and payment configurability

AWS đưa ra rất nhiều sự lựa chọn về cấu hình [các máy ảo EC2](https://aws.amazon.com/ec2/pricing/) đi cùng nhiều cách thức thanh toán, nhưng những "thiết lập phần cững" này không thể tùy biến. Điều này có nghĩa, nếu bạn chỉ cần 1.4GB RAM thì bạn phải dùng gói tối thiểu 2GB RAM, đồng nghĩa chúng ta đang phải trả nhiều hơn những thứ chúng ta muốn. Tất nhiên, có nhiều "chiêu" giúp ta có thể tiết kiệm hơn khi dùng AWS như [Spot instances](https://aws.amazon.com/ec2/spot/) hay [Reserved instances](https://aws.amazon.com/ec2/pricing/reserved-instances/buyer/) and opting for [per-second billing](https://aws.amazon.com/ec2/pricing/). Nhưng hiện tại một số option chỉ dành cho máy chủ Linux.

GCP, mặt khác, đưa ra dịch vụ cho phép bạn [chỉ cần trả theo từng giây (s) những gì bạn sử dụng](https://cloudplatform.googleblog.com/2017/09/extending-per-second-billing-in-google.html), không phân biệt OS. 

Tuyệt vời hơn nữa, bạn có thể tùy biến cấu hình như bạn muốn, ví dụ bạn cần một máy tính chỉ 1 CPU và 3.25GB RAM hay 4.5GB hoặc thậm chí chỉ 2.5GB.

# Privacy and traffic security
Theo [Tờ The Washington đưa tin](https://www.washingtonpost.com/world/national-security/nsa-infiltrates-links-to-yahoo-google-data-centers-worldwide-snowden-documents-say/2013/10/30/e51d661e-4166-11e3-8b74-d89d714ca4dd_story.html) dẫn chứng, NSA (Cơ quan An Ninh Hoa Kỳ) đã tiến hành nghe lén vào các kết nối giữa các trung tâm dữ liệu của Google một (hoặc nhiều) lần. Tin này đã khiến Google phải đi đến quyết định tiến hành mã hòa toàn bộ hệ thống bao gồm mã hóa dữ liệu, kênh truyền tín hiệu. 

![img](https://miro.medium.com/max/1000/0*ytV7BEQQ3lCyUEGV.jpg)

AWS thì lại khá tụt hậu ở mảng này. Mặc dù Relational Database Service (RDS) của AWS cũng cung cấp chức năng mã hóa, song nó không phải là lựa chọn băt buộc, và mất rất nhiều công sức để thiết lập, nếu hệ thống của bạn dàn trải trên nhiều zones (các khu vực khác nhau trên cùng vùng địa lý). Hệ thống giao thông thông tin nội bộ cũng không được mã hóa khiến đây trở thành một nguy cơ về an ninh mà người dùng cần cảnh giác.

*Nguồn: https://medium.com/hackernoon/aws-vs-google-cloud-platform-which-cloud-service-provider-to-choose-94a65e4ef0c5*****