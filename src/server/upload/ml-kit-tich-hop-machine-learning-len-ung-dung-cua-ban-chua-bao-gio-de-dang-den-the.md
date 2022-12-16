# 1. Giới thiệu
* Trong thế giới, mà công nghệ ngày càng phát triển, khi sử dụng một ứng dụng ngoài hỗ trợ đủ tính năng cần thiết,ta mong đợi các ứng dụng di động trở nên thông minh - thích nghi với hoạt động của người dùng hoặc làm hài lòng chúng ta bằng những tính năng đáng kinh ngạc. Đó là lí do tại sao việc áp dụng học máy đã trở thành một phần quan trọng trong việc phát triển ứng dụng di động. 

* Các developer đang ngày càng dựa vào học máy để nâng cao trải nghiệm người dùng của ứng dụng. Và chỉ với các mô hình học máy tinh vi, họ mới có thể cung cấp những tính năng mạnh mẽ để làm hài lòng người dùng của họ. Nhưng nếu chúng ta không có chuyên môn về học máy thì sao? Làm thế nào để bắt đầu? 

* Chính vì lí do đó, tại Google I/O 2018, Google đã ra mắt bộ công cụ phát triển phần mềm (SDK) mới có tên ML Kit bản Beta được tích hợp vào Firebase. Nó cung cấp các công nghệ học máy của google nhiều năm nghiên cứu cho các mobile developer, cho phép họ tích hợp một số mô hình học máy vào ứng dụng của mình một cách dễ dàng hơn.
{@youtube: https://youtu.be/Z-dqGRSsaBs}
# 2. Chi tiết về ML Kit
ML Kit thích hợp với tất cả các developer mọi cấp độ. Cho dù là người mới bắt đầu hay có kinh nghiệm trong học máy, ta cũng có thể dễ dàng thực hiện chức năng chỉ bằng vài dòng code. Không cần phải có kiến thức sâu về neural networks hay model optimization để bắt đầu. Mặt khác, nếu bạn là một nhà phát triển có kinh nghiệm, hãy xem Mô hình học máy tùy chỉnh với bảng mã ML Kit để tìm hiểu cách ML Kit giúp bạn dễ dàng sử dụng các mô hình TensorFlow Lite tùy chỉnh trong ứng dụng di động của mình.

Hiện tại ML Kit đang cung cấp 5 API cơ sở và custom model support
* Text recognition (nhân dạng văn bản)
* Image labeling (ghi nhãn hình ảnh)
* Barcode scanning (quét mã vạch)
*  Face detection (nhận diện khuôn mặt)
* Landmark recognition (nhận diện mốc)


Trong tương lai gần, ML Kit sẽ cho ra mắt thêm api rất đáng mong đợi là High density contour và Smart reply API -> cung cấp cho ta đoạn văn bản phù hợp với ngữ cảnh

Tương ứng với từng API ta có thể lựa chọn chạy nó trên thiết bị(local) hoặc trên cloud.Điều này là rất cần thiết vì có thể xử lý dữ liệu một cách nhanh chóng ngay cả khi app không có mạng . Mặt khác, API dựa cloud thì nó tận dụng tối đa sức mạnh của công nghệ học máy của Google Cloud Platform để cung cấp cho chúng ta mức độ chính xác cao hơn. Khi sử dụng cloud thì được free với 1000 lần dùng đầu tiên, sau đó sẽ phải trả phí vì vậy bạn nên cân nhắc trước khi sử dụng.

Những tính năng có sẵn trên thiết bị, cloud:
![](https://images.viblo.asia/ad230676-e4a2-48d3-a79a-542cacdbe1f0.png)

Ngoài những API cơ sở ở trên thì nếu bạn là một nhà phát triển machine learning có kinh nghiệm, thì bạn cũng có thể sử dụng mô hình TensorFlow Lite tùy chỉnh của MLKit. Lưu trữ các mô hình TensorFlow của mình bằng cách sử dụng với FireBase Console hoặc lưu trữ trực tiếp vào ứng dụng của mình.
![](https://images.viblo.asia/69ab663a-b390-4774-85ba-01a1f517083d.png)
# 3.Tích hợp ML Kit vào Android app
Add plugin google serivce và dependencies
```
dependencies {
    implementation 'com.google.firebase:firebase-core:16.0.0'
    implementation 'com.google.firebase:firebase-ml-vision:16.0.0'
    implementation 'com.google.firebase:firebase-ml-vision-image-label-model:15.0.0'
    implementation 'com.google.firebase:firebase-ml-model-interpreter:16.0.0'
}
apply plugin: 'com.google.gms.google-services'

```
Lấy label image ở Local : 
```
FirebaseVisionLabelDetector detector = FirebaseVision.getInstance().getVisionLabelDetector();

FirebaseVisionImage image = FirebaseVisionImage.fromFilePath(context, uri);
Task<List<FirebaseVisionCloudLabel>> result =
        detector.detectInImage(image)
                .addOnSuccessListener(
                        new OnSuccessListener<List<FirebaseVisionLabel>>() {
                            @Override
                            public void onSuccess(List<FirebaseVisionLabel> labels) {
                                // Task completed successfully
                                // ...
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                // Task failed with an exception
                                // ...
                            }
                        });

```

Khi lấy kết quả từ cloud thì cách làm cũng tương tự như Local nhưng nó sẽ trả về FirebaseVisionCloudLabel thay vì FirebaseVisionLabel
```
FirebaseVisionLabelDetector detector = FirebaseVision.getInstance().getVisionLabelDetector();

FirebaseVisionImage image = FirebaseVisionImage.fromFilePath(context, uri);
Task<List<FirebaseVisionCloudLabel>> result =
        detector.detectInImage(image)
                .addOnSuccessListener(
                        new OnSuccessListener<List<FirebaseVisionCloudLabel>>() {
                            @Override
                            public void onSuccess(List<FirebaseVisionCloudLabel> labels) {
                                // Task completed successfully
                                // ...
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                // Task failed with an exception
                                // ...
                            }
                        });

```
Bạn có thể tham khảo chi tiết tại : https://firebase.google.com/docs/ml-kit/android/label-images
## Demo 

{@youtube: https://www.youtube.com/watch?v=UicGpBtNJxY}
# 4.Tài liệu tham khảo 
https://firebase.google.com/docs/ml-kit

https://www.youtube.com/watch?v=Z-dqGRSsaBs&t=1300s