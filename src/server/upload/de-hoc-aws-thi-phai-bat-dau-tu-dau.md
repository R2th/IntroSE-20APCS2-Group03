Bạn đang tìm hiểu về AWS ? Sau khi mày mò một hồi trên internet, bạn tìm thấy một danh sách "quá trời" dịch vụ mà AWS cung cấp :scream:, bạn bắt đầu cảm thấy "overwhelming" , bạn tự hỏi không biết nên bắt đầu từ đâu ?  Don't worry !!! Trong bài viết này mình sẽ cùng các bạn tìm hiểu về AWS, và những dịch vụ nào được coi là cốt lõi, những thứ bạn nên ưu tiên tìm hiểu khi bạn còn đang là một beginner nhé !

# AWS là gì ?
![image.png](https://images.viblo.asia/2a8ba154-3ad4-40bf-88f0-67632d480377.png)
AWS (viết tắt của Amazon Web Services) là một trong những dịch vụ cloud computing lớn nhất thế giới hiện nay, nó cho phép bạn có thể làm mọi thứ từ thiết lập database, event queues, đến website hosting cơ bản, ...

Nhưng AWS được thiết kế ở mức low-level, nó đòi hỏi bạn phải có kiến thức về Cloud Computing, không chỉ vậy như mình đã nói ở trên nó có quá nhiều dịch vụ điều này cũng đòi hỏi bạn phải hiểu biết "đủ" về các services mà nó cung cấp và cách chúng hoạt động.

Vậy vẫn là câu hỏi "Để tìm hiểu về AWS thì nên bắt đầu từ đâu ??", không vòng vo, luyên thuyên nữa chúng ta hãy cùng đi tìm câu trả lời nào ! Let's get started !!! 

# Những service nào được cho là "core services" của AWS ?
Bên trong AWS có rất nhiều services là những built-on services, hay những services hỗ trợ. Vậy đâu là "core service" ?? Hay làm như thế nào mà các services có thể được build trên các services khác ?  Nào bây giờ chúng ta cùng đưa ra một ví dụ nhé !

AWS có một service gọi là [ECS](https://aws.amazon.com/ecs/) (Elastic Container Service). ECS cho phép bạn chạy những containerized applications, khi đó bạn cần phải cấu hình host để những application của bạn chạy được trên nó. Và một trong những option để làm được điều đó là bạn sẽ chạy host của bạn trên EC2 (Elastic Cloud Compute). Như vậy ở đây EC2 chính là "core service", và nếu bạn không nắm rõ EC2 thì sẽ rất khó để làm việc với ECS. 

Như vậy đó, một khi bạn nắm được một service cụ thể thì việc liên kết nó với các service khác sẽ trở nên dễ dàng hơn rất nhiều. Rất nhiều các service của AWS chỉ là những dịch vụ "ngoại vi" được build dựa trên các service khác.

Đó là lý do tại sao việc học AWS bắt đầu từ những core service là rất quan trọng. Nếu bạn dành quá nhiều thời gian để học những dịch vụ "ngoại vi" đó bạn sẽ gặp khó khăn khi tìm cách liên kết chúng với nhau và dần trở nên mất phương hướng. 

Có lẽ bây giờ bạn đang tự hỏi vậy đâu được coi là những core service của AWS ? Không dài dòng, miên man nữa chúng ta sẽ đi thẳng vào vấn đề. Có 3 core service mình muốn giới thiệu trong bài viết này đó là: EC2, IAM và S3. Và bây giờ chúng ta sẽ đi vào chi tiết một chút xem những service này là gì ? Và chúng ta có thể làm được gì với chúng ? Và tại sao chúng lại là core service ?

## EC2 là gì ?

![image.png](https://images.viblo.asia/f644264f-f007-4d53-a720-d1c41ec1f87f.png)

EC2 là một trong những "sản phẩm bán chạy" hàng đầu của AWS, phần lớn lợi nhuận của AWS đến từ nó. Vậy tại sao nó lại phổ biến đến vậy ?

EC2 là viết tắt của **Elastic Compute Cloud**,  EC2 là cách mà bạn chạy một cái máy tính trên môi trường cloud, bạn có thể chạy trên nó các OS khác nhau như: Linux hoặc Window. Hiểu một cách đơn giản thì EC2 như là một cái máy tính, nó được bật 24/7 và có thể kết nối vào từ bên ngoài.

Vậy tại sao EC2 lại phổ biến đến thế ? Câu trả lời là tính linh hoạt. Với EC2, bạn có thể chạy rất nhiều các task vụ khác nhau, bạn có thể cài WordPress để chạy 1 website hay bạn có thể cài đặt database và lưu data, tất cả trực tiếp trên EC2. Thực tế là bạn có thể làm mọi thứ trên đó, tất cả những thứ mà bạn có thể hình dung ra.

Bây giờ bạn có thể đặt câu hỏi: "Nếu EC2 tiện lợi như thế tại sao chúng ta không chạy mọi thứ trên EC2 và không cần đến các services khác ?" Câu trả lời ngắn gọn nhất cho câu hỏi này là chúng ta cần chia nhỏ các công việc ra để có thể quản lý tốt hơn và các service có thể hỗ trợ tốt hơn, giống như khi code việc bạn chia nhỏ các module ra các mục thì tốt hơn là việc gộp hết chúng vào trong cùng một chỗ.

Còn rất nhiều điều có thể nói về EC2, nhưng hãy nhớ rằng EC2 thực sự là một core service, và bạn nên dành thời gian tìm hiểu về nó và cách nó hoạt động. 

## IAM là gì ?
![image.png](https://images.viblo.asia/6c886fdf-7b0f-49e5-be4b-769b4221f648.png)

AWS IAM sẽ giúp bạn quản lý quyền và quyền truy cập trong AWS. Ví dụ như để chạy một server EC2  của bạn, bạn cần có một account user có quyền truy cập để làm việc đó.

Nhưng IAM khá là phức tạp, nó không chỉ là cách quản lý người dùng được cấp quyền truy cập trong AWS ra sao, nó cũng là cách để bạn có thể quản lý hay cấp phép cho cách dịch vụ hoặc server tương tác với nhau. Ví dụ, đối với dịch vụ EC2, server EC2 có thể được chỉ định một role nào đó, và role đó quy định những gì server EC2 đó có thể làm và những gì nó không thể.

Vậy bạn cần nắm được những điều gì về IAM ? Câu trả lời là bạn cần hiểu được sự khác biệt giữa các IAM object và mối quan hệ của chúng. Bên trong IAM chúng ta có: users, groups, roles, và policies và chúng đều có quan hệ nào đó với nhau. Hãy lấy một ví dụ ...

Một user ở trong một group, và group đó có access policies được cấp cho các user trong group. Nhưng một user cũng thể có thể được cấp access policies trực tiếp mà không cần nằm trong group nào. Cả 2 hướng tiếp cận đó đều có ưu và nhược điểm. Ví dụ, bạn cấp access policies trực tiếp cho một user điều đó đồng nghĩa với việc bạn cũng phải làm việc tương tự cho tất cả các user còn lại nếu bạn muốn cấp cho họ quyền hạn giống nhau. 

Cùng nhìn lại thì bây giờ trong "balo" của chúng ta đã có EC2 và IAM, chúng ta hãy cùng tiếp tục tìm hiểu core service thứ 3, S3.

## S3 là gì ?

![image.png](https://images.viblo.asia/6ed4ad15-1621-4ec6-9f0d-da39b8a2e612.png)

S3 là một dịch vụ tiện lợi và linh hoạt khác, nó cho phép bạn lưu trữ các tệp dữ liệu một cách vô cùng linh hoạt. S3 có thể được sử dụng để hosting website, lưu trữ ảnh, media và kể cả là các tệp log. 

Lý do mà S3 là core service thì vẫn là bởi tính linh hoạt của nó. Hãy để tôi đưa cho bạn một vài ví dụ về tính linh hoạt của nó nhé !

Ví dụ, nếu bạn muốn sử dụng AWS Redshift (một querying tool) bạn sẽ cần phải lưu data của mình trong S3. Nếu bạn muốn lấy file ghi lại log truy cập của tài khoản AWS của bạn ? Dữ liệu được lưu trong S3. Bạn muốn một bản backup RDS database của bạn ? Vâng, lại là S3. Bạn muốn host một web tĩnh ? Câu trả lời vẫn là S3.

Như vậy bạn có thể thấy tính linh hoạt của S3 là như nào rồi phải không ? Và còn hơn thế nữa là rất nhiều các service khác trên AWS được build xung quanh S3. Vì thế S3 chắc hẳn sẽ là thứ bạn phải nắm được trước tiên khi tìm hiểu về các loại dịch vụ của AWS.

Vậy sau khi đã nắm được 3 service được gọi là những core service rồi thì bước tiếp theo sẽ là gì ? Hãy để tôi giới thiệu với bạn về một vài các service
khác mà bạn cần chú ý tới. Nào nhào zô !!

## Một vài các dịch vụ khác trên AWS mà bạn cần chú ý tới

Việc lựa chọn những service được gọi là "core" service sẽ khá là khó vì nó phụ thuộc vào công ty của bạn đang làm và công việc của bạn. Nhưng gần như chắc chắn bạn sẽ phải sử dụng tới 3 dịch vụ mà tôi đã nói ở phần trên là EC2, IAM và S3. Vậy ngoài 3 dịch vụ đó ra chúng ta còn có những dịch vụ nào khác ? Chúng ta sẽ điểm qua một vài dịch vụ mà bạn cần chú ý ngoài 3 dịch vụ đã kể trên.

* **CloudWatch** - Là một monitoring tool hữu ích của AWS
* **Route 53** - Mua domain và định tuyến DNS. Nó cho phép bạn trỏ website hoặc server của mình đến một domain name.
* **RDS** - Giải pháp cho database. Nó cung cấp nhiều loại database từ SQL đến document-based.
* **CloudFormation** - AWS built-in Infrastructure as Code. Tạo các resources bằng cách viết kiến trúc của bạn dưới dạng mẫu JSON và AWS sẽ giúp bạn cấu hình theo mẫu đó. 

# Tổng kết
Tổng kết lại thì AWS có những services chính và những service khác được xây dựng dựa vào chúng. Nếu bạn nắm được những service nào là "core" là cốt lõi thì việc nắm bắt được các dịch vụ khác của  AWS sẽ trở lên dễ dàng và nhanh hơn nhiều.

Trên đây là tất cả những gì mình muốn chia sẻ trong bài viết này, đây cũng là lần đầu tiên mình viết bài nên chắc chắn còn nhiều thiếu sót, rất mong được sự góp ý của mọi người để các bài viết sau được hoàn thiện hơn. Hẹn mọi người vào các bài viết sau về AWS hoặc một topic nào đó khác nhé :kissing_heart: