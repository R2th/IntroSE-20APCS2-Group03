# **Sử dụng TensorFlow Lite Library để nhận diện Object**

TensorFlow Lite là một phiên bản nhỏ gọn của TensorFlow cho mobile.

**Một số điểm tốt của TensorFlow Lite:**

-  Nhanh hơn, do TensorFlow Lite cho phép thực hiện machine learning ngay trên device với độ trễ thấp.
-  TensorFlow Lite tốn ít dung lượng nên khá tốt cho mobile
-  TensorFlow Lite cũng hỗ trợ cảm biến gia tốc của thiết bị android với Android Neural Networks API

TensorFlow Lite sử dụng nhiều kĩ thuật để cho đỗ trễ thấp như:

- Tối ưu kernels cho mobile apps
- Kích hoạt trước khi hợp nhất (Pre-fused activations)
- Lượng tử hóa kernels cho phép models nhỏ hơn và nhanh hơn

**Làm thế nào để sử dụng TensorFlow Lite trong viết ứng dụng android?**

Phần khó khăn và quan trọng nhất trong việc sử dụng TensorFlow Lite là chuẩn bị model (.tflite) cũng là cái khác biệt nhất so với TensorFlow model thông thường.
Để có thể chạy model với TensorFlow Lite bạn phải convert model thành model dạng (.tflite) đây là định dạng được chấp nhận bởi TensorFlow Lite.
Thực hiện các bước như ở đây: https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/lite#step-2-model-format-conversion

Bây giờ bạn đã có model (.tflite) và label file. Ban có thể thể bắt đầu sử dụng những model và các label file trong ứng dụng Android của bạn để load model và dự đoán các output sử dụng thư viện TensorFlow Lite.

Tôi đã tạo ra một ứng dụng sample hoàn thiện chạy TensorFlow Lite cho việc nhận diện object. [Check out the project here](https://github.com/amitshekhariitbhu/Android-TensorFlow-Lite-Example)

Đây là ứng dụng sample:

![](https://images.viblo.asia/b6000f0a-87f2-4b48-a7d9-1f40088aa1bd.png)
![](https://images.viblo.asia/67f498e2-a32a-4eb5-8077-ad2822a34d51.png)
![](https://images.viblo.asia/3db0be1d-da6f-4064-9bd9-62cd416c64cc.png)

Reference: https://www.letslearnai.com/2018/03/17/android-tensorflow-lite-machine-learning-example.html