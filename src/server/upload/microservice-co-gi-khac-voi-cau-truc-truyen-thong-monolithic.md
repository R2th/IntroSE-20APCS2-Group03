![microsercice](https://images.viblo.asia/c7f38e9d-b4bf-40ca-a72b-ec5ddc11f202.png)

Như các bạn cũng đã biết và vô cùng quen thuộc với cấu trúc khối (monolithic). Cấu trúc này tức là mọi thứ từ cấu trúc, ngôn ngữ, cơ sở dữ liệu, ... đều được gộp lại thành 1 khối. Dự án càng lớn thì project của bạn càng phình to dẫn đến cho việc maintenance càng trở nên phức tạp. Độ mở rộng cũng sẽ khó hơn rất nhiều gần như chúng ta sẽ phải sửa lại code hoặc xấu hơn nữa là đập bỏ và xây dựng lại. Tuy nhiên mình cũng không chê bai lối cấu trúc này vì như hiện tại thì đa số các dự án outsource đều sử dụng cấu trúc khối. Cấu trúc microservice thì chắc cũng không còn ai xa lạ. Bài viết này mình sẽ nói chi tiết và đưa ra nhận xét cá nhân và cách sử dụng hợp lý với từng cấu trúc này.

## Microservice là gì?
Nói tới Micro tức là rất nhỏ. Nhỏ tới mức mỗi một instance gần như là một feature. Ý tưởng của micro rất hay, Nó tách nhỏ các chức năng ra làm 1 service riêng lẽ độc lập và gần như không liên quan gì đến nhau. Chúng giao tiếp với nhau qua rất nhiều phương thức có thể là `rest API` hoặc là `GRPC` hoặc `lambda`  hoặc bất cứ phương thức nào có thể giao tiếp được. Ưu điểm của giải pháp này thì quá rõ ràng. Với các service được tách nhỏ vụn độc lập như vậy thì bạn hoàn toàn có thể nâng cấp, bảo trì bổ sung từng feature riêng lẻ mà không hề làm ảnh hưởng tới cả tổng thể của cả 1 project.

## Microservice sử dụng ngôn ngữ nào?
Ưu điểm của cấu trúc micro bạn có thể sử dụng mọi ngôn ngữ cho mọi service. Chắc chắn rồi, trong 1 project với cấu trúc micro bạn có thể tách ra thành nhiều team nhỏ. Tuỳ vào khả năng của mỗi người mà tự chọn cho mình language, framework các bạn yêu thích mà vẫn không sợ bị ảnh hưởng tới các dịch vụ khác xung quanh. Tuy nhiên điều này không hẳn đã là hiệu quả. Hãy tuỳ vào từng feature, chìa khoá để tạo ra sử ổn định và mở rộng kiến trúc này là nó phải đảm bảo sự duy trì và đi theo xu hướng chung .

## Microservice giao tiếp với nhau như thế nào?
Trong quá khứ vấn đề giao tiếp giữa các microservice với nhau đã từng là mỗi lo ngại. Khi chúng giao tiếp với nhau mất quá nhiều thời gian và làm ảnh hưởng tới performance project của bạn. Tuy nhiên vấn đề nào thì cũng có cách giải quyết các micro thường giao tiếp với nhau và sử dụng qua phương thức `GRPC`. gRPC là 1 RPC framework cho hiệu quả cao. Các dữ liệu binary được gửi đến các instance với 1 tốc độ cực cao các bạn có thể tham khảo thêm bài viết về [gRPC và ứng dụng nó trong microservices
](https://viblo.asia/p/grpc-va-ung-dung-no-trong-microservices-ORNZqo8N50n) của mình ở bài viết trước. Tuy nhiên không phải là nó ko có những vấn đề. Dưới đây là mô hình mà mình thường sử dụng trong kiến trúc này


![](https://images.viblo.asia/3aef761f-4647-47df-a93a-c4966dc121b5.jpg)

## Triển khai 1 cấu trúc microservice như thế nào?
Hẳn rồi với 1 cấu trúc microservice thì việc deploy và scale vô cùng phức tạp đòi hỏi bạn phải là người thành thạo trong việc thiết kế architecture và infrastructure. Chúng độc lập với nhau nên bạn hoàn toàn có thể xếp đặt mỗi service ứng với từng instance riêng biệt trong cùng hệ sinh thái. so với cấu trúc khối thì việc deploy sẽ phức tạp hơn rất nhiều. Tuy nhiên ưu điểm của nó sẽ làm giảm tải cho mỗi server bạn sẽ ko cần phải sử dụng đến những giải pháp cân bằng tải server như Round-robin scheduling. Ngày nay đã có rất nhiều những doanh nghiệp họ sử dụng `docker` để Scale mô hình microservice này

## Kết luận
Bài viết này của mình hơi nặng về lý thuyết. Tuy nhiên mình cũng sẽ tóm gọn nó bởi 1 vài ý chính.
Nếu so sánh cấu trúc này với cấu trúc khối (monolithic) thì theo mình nó có rất nhiều ưu điểm hơn rõ rệt.
* Về tính bảo mật nó sẽ có độ an toàn cao hơn bởi vì mỗi feature nằm ở từng service riêng biệt và mỗi service có cơ chế bảo mật riêng và khác nhau. nên sẽ rất khó sâm nhập vào hết được
* Tính mở rộng thì rõ ràng là microservice sẽ có độ tuỳ biến và mở rộng cao hơn hẳn.
* Có thể sử dụng nhiều database hạn chế được vấn đề phình to của csdl
* Tuy nhiên việc testing và deploy còn tương đối phức tạp so với kiến trúc khối.

Hiện tại với những dự án outsource thì ít ai sử dụng giải pháp này, nhưng với những dự án production hay dự án lớn mang tính chất lâu dài thì microservice là 1 ý tưởng không tồi. 

Cảm ơn các bạn đã đọc bài viết của mình. Hi vọng nó sẽ mang lại cho các bạn những kiến thức bổ ích.