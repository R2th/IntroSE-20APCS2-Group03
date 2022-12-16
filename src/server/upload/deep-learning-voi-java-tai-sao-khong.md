Muốn tìm hiểu về Machine Learning / Deep Learning nhưng với background là Java thì sẽ như thế nào và bắt đầu từ đâu? Để tìm được câu trả lời, hãy đọc bài viết này - có thể kỹ năng Java vốn có sẽ giúp bạn có những chuyến phiêu lưu thú vị.
### 1. DJL là gì?
DJL là tên viết tắt của Deep Java Library - một thư viện mã nguồn mở được phát triển bởi AWS nhằm mục đích xây dựng và triển khai các mô hình Deep Learning với ngôn ngữ Java.

DJL cung cấp môi trường và "trải nghiệm" cũng như các chức năng như bất cứ thư viện Java nào khác, đồng thời cũng được phát triển chuyên biệt cho lĩnh vực machine learning và deep learning để bắt kịp với xu thể hiện nay.

Lập trình viên có thể sử dụng IDE hiện có như Eclipse, IntelliJ, ... để xây dựng, đào tạo và triển khai các mô hình - dễ dàng tích hợp với các ứng dụng Java. Các API được đơn giản hóa giúp bạn có thể tiếp cận và tích hợp Deep Learning vào các ứng dụng Java ngay lập tức, chỉ cần bạn có nền tảng tốt về ngôn ngữ này.

DJL là một engine-agnostic đi cùng với câu slogan nổi tiếng "Write once, run anywhere". Vì vậy, lập trình viên có thể phát triển các mô hình sử dụng DJL và chạy nó trên bất kỳ công cụ nào mà họ muốn, chẳng hạn như: MXNet, Pytorch hay TensorFlow.
### 2. Phát hiện đối tượng với DJL
Phát hiện đối tượng (Object detection) là một kỹ thuật thị giác máy tính để xác định vị trí của các đối tượng trong hình ảnh hoặc video.
Trong phần này, chúng ta sẽ sử dụng DJL để phát hiện một số đối tượng quen thuộc từ hình ảnh.

Yêu cầu:
* Cài đặt JDK 8 (do DJL có một số vấn đề với JDK 11)
* IntelliJ hoặc Eclipse (Ở đây mình dùng Eclipse)
* Import code từ thư viện.

Do DJL là thư viện nên việc sử dụng vô cùng đơn giản. Bạn chỉ cần làm 2 bước quan trọng sau:

1. Clone thư viện về máy:
```
git clone https://github.com/awslabs/djl.git
```
2. Mở IDE và import Project (thư viện) vừa clone về.

Phần quan trọng sử dụng trong bài viết này là file `ObjectDetection.java` nằm ở thư mục `djl/examples/src/main/java/ai/djl/examples/inference/`

Class ObjectDetection mình trích ra với nội dung như sau:
```
public final class ObjectDetection {

    private static final Logger logger = LoggerFactory.getLogger(ObjectDetection.class);

    private ObjectDetection() {}

    public static void main(String[] args) throws IOException, ModelException, TranslateException {
        DetectedObjects detection = ObjectDetection.predict();
        logger.info("{}", detection);
    }

    public static DetectedObjects predict() throws IOException, ModelException, TranslateException {
        Path imageFile = Paths.get("src/test/resources/picture-to-detect.jpg");
        Image img = ImageFactory.getInstance().fromFile(imageFile);

        String backbone;
        if ("TensorFlow".equals(Engine.getInstance().getEngineName())) {
            backbone = "mobilenet_v2";
        } else {
            backbone = "resnet50";
        }

        Criteria<Image, DetectedObjects> criteria =
                Criteria.builder()
                        .optApplication(Application.CV.OBJECT_DETECTION)
                        .setTypes(Image.class, DetectedObjects.class)
                        .optFilter("backbone", backbone)
                        .optProgress(new ProgressBar())
                        .build();

        try (ZooModel<Image, DetectedObjects> model = ModelZoo.loadModel(criteria)) {
            try (Predictor<Image, DetectedObjects> predictor = model.newPredictor()) {
                DetectedObjects detection = predictor.predict(img);
                saveBoundingBoxImage(img, detection);
                return detection;
            }
        }
    }

    private static void saveBoundingBoxImage(Image img, DetectedObjects detection)
            throws IOException {
        Path outputDir = Paths.get("build/output");
        Files.createDirectories(outputDir);

        Image newImage = img.duplicate(Image.Type.TYPE_INT_ARGB);
        newImage.drawBoundingBoxes(detection);

// File picture-detected sẽ được tự động tạo ra sau khi pát hiện được đối tượng, được lưu tại build/output
        Path imagePath = outputDir.resolve("picture-detected.png");

        newImage.save(Files.newOutputStream(imagePath), "png");
        logger.info("Detected objects image has been saved in: {}", imagePath);
    }
}
```
Bạn cần chú ý đến 2 dòng code sau:
* Khai báo đường dẫn đến file chứa đối tượng cần phát hiện:
```
Path imageFile = Paths.get("src/test/resources/picture-to-detect.jpg");
```
* Khai báo đường dẫn đến thư mục để lưu file ảnh được xuất ra sau khi detect xong:
```
Path outputDir = Paths.get("build/output");
```
### 3. Test
Sau khi đã tham khảo qua phần chi tiết của code. Việc cần thiết bây giờ là chuẩn bị các hình ảnh để phục vụ cho việc detection. 

Ảnh cần detect phải được lưu tại thư mục `src/test/resources/`, việc này là bắt buộc hoặc bạn phải định nghĩa lại đường dẫn (nếu bạn muốn). Ở đây mình để như trên code cho đơn giản. 

Với mỗi lần thay đổi ảnh nguồn, bạn cần chạy lại lệnh:
`./gradlew run -Dmain=ai.djl.examples.inference.ObjectDetection` trong thư mục `examples`
* *Hình 1:* `src/test/resources/dog_bike_car.jpg`
![](https://images.viblo.asia/533c9e0d-1058-4432-bd3a-c6ea951a8c83.jpg)
*Kết quả*:
![](https://images.viblo.asia/4661156c-e8ca-4a4c-94e9-32bafa30766b.png)

* *Hình 2:* `src/test/resources/dog-cat.jpg`
![](https://images.viblo.asia/fb7496d7-de0a-4454-9539-2bef1d34c564.jpg)

*Kết quả:*
![](https://images.viblo.asia/1c426fbe-60b8-4999-87cb-74a1557dd1d0.png)

* *Hình 3:* `src/test/resources/cr7-picture.jpg`
![](https://images.viblo.asia/f7d768bb-df25-402d-be46-503501e0861e.jpg)

*Kết quả:*
![](https://images.viblo.asia/03b0a118-dac6-4649-bbc1-6dc4f00b879f.png)

Chà, ... Bạn nhìn xem! Kết quả xem ra code đã phát hiện chính xác các đối tượng có trong ảnh. Bạn có thể mài mò thêm để sử dụng DJL thành thạo hơn cho các xử lý phức tạp hơn.

### 4. Kết luận
Trong lĩnh vực Deep Learning, có rất nhiều tài nguyên dành cho người dùng Python để phân tích dữ liệu hoặc các framework như MXNet, TensorFlow. Nhưng rất ít tài nguyên cho Java. 

Nhờ DJL mà việc đào tạo và phục vụ các mô hình Deep Learning trong Java trở nên đơn giản và dễ dàng hơn rất nhiều. Chặng đường của các bạn với Deep Learning và Java có thể được khai thông từ đây.

Bài viết dựa trên nguồn bên dưới - mang tính ghi (Note) lưu trữ để mai này có thể xem lại, nhân tiện chia sẻ trên đây để các bạn cùng đọc.

Nguồn:
[Deep Java Library and How To Get Started](https://hackernoon.com/djl-deep-java-library-and-how-to-get-started-wm3o3wdy)