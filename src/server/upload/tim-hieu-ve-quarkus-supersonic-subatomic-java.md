Ngày nay, việc viết một ứng dụng và triển khai lên cloud là điều rất phổ biến và không phải lo lắng về cơ sở hạ tầng. Serverless và FaaS từ đó phổ biến hơn bao giờ hết.

**Serverless** là môi trường, nền tảng thực thi ứng dụng và dịch vụ mà không phải quan tâm đến máy chủ. Ứng dụng serverless không cần phải quan tâm việc phân bổ, quản lý tài nguyên của hệ điều hành, và bỏ qua các vấn đề về nâng cấp và bảo mật. Với khái niệm là chỉ cần tập trung phát triển sản phẩm, việc còn lại về vận hành sẽ để nền tảng này đảm nhiệm.

![](https://images.viblo.asia/3190c33c-dbe8-4792-bfb8-8e3c675981c8.jpg)

Nói thêm chút, **Microservice** là một kiểu kiến trúc phần mềm mà ở đó các module trong phần mềm này được chia thành các service rất nhỏ (microservice). Mỗi service sẽ được đặt trên một server riêng, nhờ vậy sẽ dễ dàng nâng cấp và scale ứng dụng.

Những service này (có thể gọi là app) chạy trên nhiều server đặt ở cloud, mỗi service đó lại được gói gọn trong các container thì ta gọi chúng là **Cloud Native Microservices**.

Hơi đi miên man rồi :laughing:

Trong dạng môi trường này, khi chạy ứng dụng, các instance (container) được tạo ra và hủy bỏ thường xuyên (Mỗi lần deploy, thì 1 hoặc vài instance mới được tạo ra, một số intance cũ sẽ được loại bỏ). Thời gian khởi động và thời gian để nhận request đầu tiên thật sự quan trọng, vì nó góp phần tạo ra trải nghiệm người dùng hoàn toàn khác nhau.

Các ngôn ngữ khác như Javascript hay Python luôn được chú trọng thiết kế để chạy phù hợp hơn với dạng môi trường này. Trong khi đó, Java với các thư viện jar khủng, thời gian khởi động lâu nên chưa bao giờ là ứng cử viên sáng giá để chạy trên môi trường serverless.

## 1. Quarkus là gì
Do những mặt hạn chế của Java, JVM khi chạy trong các container (tốn bộ nhớ + thời gian khởi động chậm), Quarkus đã ra đời. Một framework được mô tả là Supersonic Subatomic giúp chạy tương thích trong các container trên môi trường cloud.

Quarkus thật sự là một giải pháp thay thế giúp đưa Java gần hơn với các môi trường đám mây.

## 2. QuarkusIO

QuarkusIO hứa hẹn sẽ cung cấp các artifact nhỏ, thời gian khởi động cực nhanh và thời gian request đầu tiên thấp hơn hẳn so với các Java Framework khác. Khi kết hợp với GraalVM, Quarkus sẽ biên dịch trước thời hạn (ahead-of-time - AOT).

Quarkus được xây dựng trên các thư viện chuẩn, nên chúng ta sẽ không cần phải học lại nhiều thứ. Chẳng hạn chúng ta có thể sử dụng CDI, JAX-RS và nhiều thứ khác nữa tương tự như các java framework. Có thể kết hợp sử dụng Hibernate, Kafka, OpenShift, Kubernetes, và cả Vert.x,...

## 3. Quarkus start coding

Tương tự như spring boot, quarkus cũng có một công cụ giúp bạn có thể tạo base project một cách dễ dàng. Chỉ cần chọn thư viện mình muốn, và nhấn generate
![](https://images.viblo.asia/adec8ccc-5506-470e-b5e5-d50c2104540e.jpg)

Ngoài ra, bạn cũng có thể sử dụng maven để quản lý project của mình, từ khâu tạo base project đến khâu thêm các extension, VD:
```
mvn io.quarkus:quarkus-maven-plugin:0.13.1:create \
    -DprojectGroupId=com.ngockhuong.quarkus \
    -DprojectArtifactId=quarkus-project \
    -DclassName="com.ngockhuong.quarkus.HelloResource" \
    -Dpath="/hello"
```

## 4. Hot reload
Khi chạy trong chế độ develop (`./mvn compile quarkus:dev`), Quarkus có khả năng hot reload. Khi bạn thay đổi tệp Java hay đơn thuần là một tệp config nào đó, muốn server tự động biên dịch lại, bạn chỉ cần reload trình duyệt. Có vẻ tính năng này không hề xa lạ, bởi nó cũng có trong Spring framework.

## 5. Vân vân mây mưa

Quarkus còn nhiều thứ nữa (VD: native image, native executable,...), tuy nhiên đây là chỉ bài khởi động, chúng ta sẽ tìm hiểu kỹ hơn những thứ mà Quarkus làm được không hề thua kém các framework như Spring ở các bài viết khác trong loạt bài nhé ;)

## 5. Tóm lại một tý

Đó là một số yếu tố chính nổi bật của Quarkus. **Quarkus** thật sự là một trong những framework xịn xò (trong tương lai, theo mình đánh giá), đang được các dev hịn chú ý đến. Đặc biệt, Quarkus lại được Redhat đứng sau hỗ trợ nên có thể nói tương lai phía trước không thể tươi sáng hơn.

Mình tin rằng Quarkus sẽ thổi một luồng gió mới vào Java - ngôn ngữ đã quá tuổi nhưng vẫn bảnh trai, các doanh nghiệp vừa và lớn sẽ dần chuyển sang sử dụng khi xu thế cloud native microservices đang trở nên thời thượng.

Thêm một tý ;) Kubernetes + Knative + Quarkus là bộ ba rất đáng để các lập trình viên Java (Kotlin) thử đấy ;)