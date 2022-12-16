# Giới thiệu
Nhận diện và so sánh khuôn mặt bằng máy học trong những năm trở lại đây là một đề tài rất hot nhận được sự quan tâm của rất nhiều doanh nghiệp bởi vì khả năng ứng dụng rộng rãi. Nó giúp cho những việc như điểm hay EKYC khác hàng trở nên 1 cách đơn giản, tự động và độ chính xác của rất cao. Thế nhưng không ít lập trình viên trong chúng ta gặp khó khăn khi phải xây dựng 1 hệ thống như thế vì không phải ai cũng đủ hiểu biết về máy học để có thể tự bắt đầu.
Rất may là vì độ hot của đề tài này nên đã có rất nhiều open source hỗ trợ chúng ta. Một trong số đó là deepface.
Thư viện deepface được viết để sử dụng với python3 và nó được tích hợp sẵn rất nhiều model nhận diện, so sánh tốt nhất hiện này (state of the art) như là:  VGG-Face, Google FaceNet, OpenFace, Facebook DeepFace, DeepID, ArcFace, Dlib và SFace.
Ở bài này mình sẽ hướng dẫn các bạn cài đặt và sử dụng thư viện này.

# Cài đặt môi trường
Dĩ nhiên các bạn sẽ phải có python3 để chạy, mình sẽ không hướng dẫn cài python3 nữa.
Trước khi viết hay cài đặt các lib cho python thì trước tiên chúng ta nên tạo virtual env(venv) để có thể có 1 môi trường riêng biệt cho dự án, tránh trường hợp khi ta có nhiều dự án trên cùng 1 máy sẽ dễ bị xung đột giữa các lib. Để tạo virtual env thì mình sẽ chạy lệnh  
    `python3 -m venv venv`  
Sau khi có chạy thì chúng ta sẽ có 1 folder là venv ở trong folder dự án hiện tại. Chúng ta sẽ cần phải source lại folder này để có thể chuyển python3/pip về đây.  
    `source venv/bin/activate`  
Các bạn lưu ý là nếu thay đổi terminal thì chúng ta sẽ phải source lại nếu không chúng ta sẽ đang sử dụng python của hệ thống.
Nếu kỹ các bạn có thể chạy thêm `which python3` và `which pip` để chắc chắn là venv hoạt động đúng.   
# Cài đặt thư viện 
Linux:  
```
pip install tensorflow
pip install deepface
```

MacOs:
Bản thân mình thì xài mac nên việc cài lib có vẻ hơi khó khăn hơn do cái python của thằng mac nó không hỗ trợ mình install tensorflow với deepface dễ như linux, cho nên mình phải cài qua 1 số lệnh như sau thì mới có thể chạy thành công deepface

```
pip install tensorflow-macos
pip install tensorflow-metal
pip install retina-face --no-deps
pip install pandas Flask gdown mtcnn Pillow fire
pip install deepface --no-deps
```

# Chạy thử 1 số hàm của deepface

Sau khi cài lib thành công thì chúng ta đã có thể sử dụng deepface. Ở đây mình sẽ thử nhận diện và so sánh khuôn mặt trong 2 bức hình này 
![](https://images.viblo.asia/b48aa248-12db-4eae-8093-0a0c61d845eb.jpeg)
![](https://images.viblo.asia/0ebd063b-6b41-45e3-a773-2c5113c3f3a0.jpeg)

kết quả nhận diện
![](https://images.viblo.asia/f1e5d349-e45b-4242-81fd-644375fe407b.png)
![](https://images.viblo.asia/fb98c8dd-6dd0-4823-8eef-a76d3a770568.png)

code:  
```
from deepface import DeepFace
import matplotlib.pyplot as plt

detected_face_1 = DeepFace.detectFace(img_path = "face1.jpeg")
plt.imshow(detected_face_1)
plt.show()

detected_face_2 = DeepFace.detectFace(img_path = "face2.jpeg")
plt.imshow(detected_face_2)
plt.show()
```

Tiếp theo ta sẽ thử so sánh 2 khuôn mặt này:  
```
result = DeepFace.verify(img1_path = "./face1.jpeg", img2_path = "./face2.jpeg", model_name = "Facenet")
print(result)
```

Kết quả so sánh:  
`{'verified': False, 'distance': 0.8645276446946638, 'threshold': 0.4, 'model': 'Facenet', 'detector_backend': 'opencv', 'similarity_metric': 'cosine'}`  
verified ở đây là 2 khuôn mặt có khớp hay không và distance là độ chênh lệch của 2 khuôn mặt, càng về 0 thì sẽ càng giống nhau. Threshold là ngưỡng đúng sai, > threshold thì kết quả sẽ là false  
Mặc định deepface dùng vgg-face nhưng mình thấy Facenet có vẻ chính xác hơn nên mình sẽ dùng model là Facenet. 
Lần đầu chạy có thể sẽ phải download model nhưng các lần sau sẽ không phải download nữa. Đây là danh sách các model mà các bạn có thể sử dụng:  
* VGG-Face
* OpenFace
* Facenet
* Facenet512
* DeepFace
* DeepID
* Dlib
* ArcFace
* SFace

Ngoài nhận diện và so sánh khuôn mặt, Deepface còn cung cấp cho chúng ta 1 số chức năng khá thú vị như phân tích khuôn mặt để dự đoán độ tuổi, giới tính, chủng tộc, cảm xúc.
vd:  
```
obj = DeepFace.analyze(img_path = "face1.jpeg", actions = ['age', 'gender', 'race', 'emotion'])
print(obj)  
```  
kết quả sẽ là:
```
{'age': 40, 'region': {'x': 255, 'y': 29, 'w': 165, 'h': 165}, 'gender': 'Man', 'race': {'asian': 18.35305800158131, 'indian': 12.667413810933459, 'black': 27.042837562730167, 'white': 7.209931743736967, 'middle eastern': 5.449669760445938, 'latino hispanic': 29.277088002985}, 'dominant_race': 'latino hispanic', 'emotion': {'angry': 24.804694950580597, 'disgust': 0.0015981857359292917, 'fear': 7.38416463136673, 'happy': 0.19465479999780655, 'sad': 57.68662095069885, 'surprise': 0.2808759920299053, 'neutral': 9.647384285926819}, 'dominant_emotion': 'sad'}
```

# Tổng kết
Như vậy là chúng ta đã có thể có cái nhìn tổng quan cũng như sử dụng được thư viện deepface để nhận diện, so sánh, phân tích khuôn mặt một cách dễ dàng mà không cần phải bỏ thời gian để tìm hiểu sâu về thuật toán. Mong các bạn có thể ứng dụng được thư viện này vào trong dự án của mình. Hẹn gặp các bạn ở các bài viết sau.