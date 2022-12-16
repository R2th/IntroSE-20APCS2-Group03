![image.png](https://images.viblo.asia/0bebace5-c31f-4661-9388-e2bb568501e1.png)


Bài viết này sẽ giới thiệu cho bạn về Amazon Rekognition, một chức năng của AWS cung cấp tính năng thị giác máy tính (CV) có thể tùy chỉnh và được đào tạo trước để trích xuất thông tin và chi tiết từ hình ảnh cũng như video của bạn, hay còn gọi đơn giản là AI.


![image.png](https://images.viblo.asia/168e34fa-6979-493e-a289-0a50be868191.png)
![image.png](https://images.viblo.asia/929cabae-1219-4081-8ca3-b988ae5783cb.png)

Bên trên là các hình ảnh minh họa cho các chức năng hiện có của Amazon Rekognition, bao gồm:

**Kiểm duyệt nội dung**: Phát hiện nội dung có thể không an toàn, không phù hợp hoặc không mong muốn trên các hình ảnh và video.

**Tìm kiếm và so sánh khuôn mặt**: Xác định điểm tương đồng giữa khuôn mặt với hình ảnh khác hoặc từ kho hình ảnh riêng tư của bạn.

**Nhận diện và phân tích khuôn mặt**: Phát hiện khuôn mặt xuất hiện trong hình ảnh và video cũng như nhận dạng các thuộc tính như mắt mở, kính và râu cho từng người.

**Nhãn**: Phát hiện hàng nghìn đối tượng và cảnh cũng như các hoạt động, ví dụ: “giao kiện hàng” hoặc “chơi bóng đá”.

**Nhãn tùy chỉnh** : Phát hiện các đối tượng tùy chỉnh như logo thương hiệu bằng máy học tự động (AutoML) để đào tạo mô hình của bạn chỉ với 10 hình ảnh.

**Phát hiện văn bản** : Trích xuất văn bản bị lệch và bị biến dạng từ hình ảnh và video về biển báo trên đường phố, các bài đăng trên mạng xã hội và bao bì sản phẩm.

**Nhận dạng người nổi tiếng** : Nhận dạng người nổi tiếng để tạo danh mục ảnh và đoạn phim cho nội dung nghe nhìn, tiếp thị và quảng cáo.

**Phát hiện phân đoạn video** : Phát hiện phân đoạn chính trong video, ví dụ như khung hình đen, danh đề mở đầu hoặc kết thúc, bảng ghi tên, thanh màu và cảnh quay.

**Phát hiện Thiết bị bảo hộ cá nhân (PPE)**:  Tự động phát hiện PPE như mũ bảo hiểm, găng tay và khẩu trang được sử dụng trong hình ảnh.



Tất cả các chức năng này đều được sử dụng thông qua cơ chế xác định tự động với trí thông minh nhân tạo - AI để làm việc.


Ở bài viết này, mình sẽ giới thiệu đến 1 trong các chức năng phổ biến là nhận diện và phân tích khuôn mặt để mọi người có thể hiểu rõ hơn.

**Nhận diện và phát hiện khuôn mặt**

Amazon Rekognition có thể lưu trữ thông tin về các khuôn mặt được phát hiện trong các vùng chứa phía máy chủ được gọi là bộ sưu tập. Bạn có thể sử dụng thông tin khuôn mặt được lưu trữ trong bộ sưu tập để tìm kiếm các khuôn mặt đã biết trong hình ảnh, video được lưu trữ và video phát trực tuyến. Amazon Rekognition hỗ trợ hoạt động **IndexFaces**. Bạn có thể sử dụng thao tác này để phát hiện khuôn mặt trong hình ảnh và lưu giữ thông tin về các đặc điểm khuôn mặt được phát hiện vào một bộ sưu tập. Đây là một ví dụ về hoạt động API dựa trên lưu trữ vì dịch vụ này lưu giữ thông tin trên máy chủ.

Để lưu trữ thông tin về khuôn mặt, trước tiên bạn phải tạo (**CreateCollection**) một bộ sưu tập khuôn mặt tại một trong các Vùng AWS trong tài khoản của bạn. Bạn chỉ định bộ sưu tập khuôn mặt này khi bạn gọi hoạt động **IndexFaces**. Sau khi bạn tạo bộ sưu tập khuôn mặt và lưu trữ thông tin về đặc điểm khuôn mặt cho tất cả các khuôn mặt, bạn có thể tìm kiếm các khuôn mặt trùng khớp trong bộ sưu tập. Để tìm kiếm các khuôn mặt trong một hình ảnh, hãy gọi **SearchFacesByImage**. Để tìm kiếm các khuôn mặt trong video đã lưu trữ, hãy gọi **StartFaceSearch**. Để tìm kiếm các khuôn mặt trong video đang phát trực tuyến, hãy gọi **CreateStreamProcessor**.

***Dịch vụ này không tồn tại các byte hình ảnh thực tế. Thay vào đó, thuật toán phát hiện cơ bản trước tiên sẽ phát hiện các khuôn mặt trong hình ảnh đầu vào, trích xuất các đặc điểm trên khuôn mặt thành một vectơ đặc trưng cho mỗi khuôn mặt, sau đó lưu trữ nó trong bộ sưu tập. Amazon Rekognition sử dụng các vectơ đặc điểm này khi thực hiện đối sánh khuôn mặt.***

Ví dụ:

![image.png](https://images.viblo.asia/e6bdf9f5-9fa6-4204-bb99-9ad87ceb7e48.png)

![image.png](https://images.viblo.asia/2fca936f-3645-4a69-872b-1bd05b11e917.png)

![image.png](https://images.viblo.asia/a7208cd4-f010-403e-9d1d-b85276c506c3.png)

Với các ví dụ trên, hệ thống của AWS - Rekognition đã phát hiện được hình ảnh vùng khuôn mặt trong bức ảnh để xác định người, và có thể để dùng so sánh với bộ sưu tập có sẵn các khuôn mặt để đưa ra kết quả cuối cùng cho việc nhận diện và xác định đối tượng ( tên / id).
Với việc nhận diện được khuôn mặt này, ta có tể áp dụng vào nhiều tiện ích như: nhận diện khuôn mặt để điểm danh thay cho cơ chế vân tay / thẻ ( tránh tiếp xúc covid), nhận diện để mở cửa nhà, cửa hầm bí mật ( như trong phim), hoặc tìm kiếm trong một hệ thống lớn hơn với nhiều camera được lắp đặt trên đường ( cũng giống trong phim),...
Ngoài ra, Amazon Rekognition còn có thêm một chức năng dựa trên Facial là nhận diện người nổi tiếng từ ảnh / video, bạn cũng có thể tham khảo.

Với các chức năng nhận diện này, phía AWS đều có trích xuất ra các API để tích hợp vào hệ thống người dùng ( web front-end, backend java, golang,...) để sử dụng.

AWS cho chúng ta dùng thử miễn phí lên đến 12 tháng và 5000 ảnh mỗi tháng, một con số khá lớn. Ngoài ra, để sử dụng vào mục đích thương mại lớn hơn, ta có biểu phí như sau:

![image.png](https://images.viblo.asia/cda77403-d947-4bce-8a97-aae2027656b0.png)

Bộ API hỗ trợ rất nhiều ngôn ngữ đa dạng và dễ hiểu để có thể tích hợp:

![image.png](https://images.viblo.asia/fe7d913d-e6ba-4326-95eb-e21a3f14d057.png)


Trên đây là bài giới thiệu các dịch vụ AI về nhận diện hình ảnh / video mà AWS đang có.
Mọi người có thắc mắc hãy cùng nhau trao đổi ở comment nha.
Cám ơn.