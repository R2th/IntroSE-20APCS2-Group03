Khi bắt đầu với AWS, một trong những khái niệm đầu tiên mà chúng ta cần phải tìm hiểu tới đó là Regions và Availability zone (AZs).

Chúng ta biết rằng AWS cung cấp dịch vụ đám mây trên toàn cầu, vì thế AWS bắt buộc phải có rất nhiều trung tâm dữ liệu (data center) trên khắp thế giới, hãy tưởng tượng tới một căn phòng to lớn và chứa rất nhiều máy tính bên trong, đó chính là các data center.  Và một khu vực địa lí chứa nhiều data center như vậy sẽ được gọi là **Regions**.  Hình dưới đây là các **Regions**  hiện tại của AWS có ở vùng châu Á - Thái bình dương, các bạn có thể xem chi tiết những vùng khác ở https://aws.amazon.com/about-aws/global-infrastructur

![](https://images.viblo.asia/b23acddf-1be2-45ed-8db1-61b2dc19a50d.png)

Các **Regions** có cùng chung một quy ước đặt tên như là us-east-2, ap-southeast-1, nên chỉ cần nhìn cái list dưới đây là bạn có thể xác định khu vực của **Regions** một cách nhanh chóng và thuận tiện.

![](https://images.viblo.asia/9a10b0e8-23b1-47e3-8592-f2327c625d51.png)

Và phần lớn các dịch vụ của AWS được triển khai ở phạm vi **Regions**, điều đó có nghĩa là khi bạn khởi tạo dịch vụ A ở region R1, thì khi bạn đổi sang region R2 thì dữ liệu dịch vụ A của bạn sẽ không được đồng bộ mà bạn buộc lòng phải khởi tạo lại ở region R2. Bạn có thể tham khảo danh sách các dịch vụ cung cấp theo Region ở https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/

Chúng ta đi tới khái niệm tiếp theo là **Availability Zones** (tạm dịch là vùng khả dụng). Mỗi **Regions** sẽ có thể có nhiều AZs, thường thường sẽ là 3, tối thiểu là 2 và tối đã là 6. Chúng sẽ được đặt tên theo tên của Regions và các chữ cái như a, b, c.
Như Region Sysney: ap-southeast-2, sẽ có 3 AZs lần lượt là ap-southeast-2a, ap-southeast-2b, ap-southeast-2c

![](https://images.viblo.asia/7f510f42-6ad9-475c-93ad-823c6fbdf684.png)

Mỗi **AZs** là một hoặc nhiều các data centers rời rạc, và mỗi data centers đều sẽ có nguồn điện dự phòng, hệ thống mạng kết nối mạnh mẽ. Các **AZs** sẽ hoàn toàn tách biệt với nhau về mặt địa lý, nên nếu cái AZ ap-southeast-2a có tèo do thảm họa động đất sống thần, hay đánh bom khủng bố thì 2 **AZs** còn lại là 2b và 2c vẫn có rất nhiều nhiều khả năng là an toàn. Mặc dù hoàn toàn cách biệt bới nhau về mặt địa lí là vậy, nhưng các **AZs** này vẫn đượt kết nối với nhau bằng một hệ thống mạng có băng thông cao và độ trễ cực thấp, đủ để đảm bảo các tác vụ đồng bộ dữ liệu giữa các **AZs**.

![](https://images.viblo.asia/91c3daf6-bb46-4f6c-a9ab-944104864e0d.png)

Và như vậy là chúng ta đã đi qua 2 khái cơ bản của AWS, cảm ơn các bạn đã theo dõi, nếu có điều gì sai xót, hoặc chỗ nào khó hiểu thì mọi người hãy để lại bình luận nhé! Thân!