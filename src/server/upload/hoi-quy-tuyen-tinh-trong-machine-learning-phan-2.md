Trong phần này chúng ta sẽ tiếp tục đánh giá về Hồi quy tuyến tính (ước lượng tham số) và làm 1 ví dụ nhỏ về Hồi quy tuyến tính trong Python.
# 4. Ước lượng tham số
Giả sử ta có mm cặp dữ liệu huấn luyện ![](https://images.viblo.asia/3e699b32-88eb-45a5-97b2-0d4a55c27adf.png) được tổ chức tương ứng bằng ![](https://images.viblo.asia/5334e239-58a0-4046-9b66-49a1d5ad62b5.png) và ![](https://images.viblo.asia/6a6b5717-3fe8-4902-ba41-3b87791e1fb6.png) là kết quả đoán tương ứng. Ta có thể đánh giá mức độ chênh lệch kết quả ![](https://images.viblo.asia/1d566958-2f6f-46ec-89dd-0bc5503b206c.png) và y bằng một hàm lỗi (lost function) như sau:

![](https://images.viblo.asia/6fe35835-3b65-4b82-9178-5b23155e14fe.png)

Công thức trên thể hiện trung bình của độ leehcj (khoảng cách) giữa các điểm dữa lieeyj thực tế và kết quả dự đoán sau khi ta ước lượng tham số. Hàm lỗi còn có tên gọi khác là hàm lỗi bình phương (squared error function) hoặc hàm lỗi trung bình bình phương (mean squared error function) hoặc hàm chi phí (cost function).
Không cần giải thích ta cũng có thể hiểu với nhau rằng tham số tốt nhất là tham số giúp cho hàm lỗi J đạt giá trị nhỏ nhất.

![](https://images.viblo.asia/03d8b82e-e16e-4b34-b532-4b13d1c729f7.png)

Kết quả tối ưu nhất là ![](https://images.viblo.asia/08429787-1820-4686-a723-5dbb8921a369.png), tức là ![](https://images.viblo.asia/0d93d5e2-d656-4e11-b78b-1f9d07315da3.png). Để giải quyết bài toán này ta có thể sử dụng đạo hàm của ![](https://images.viblo.asia/67936680-21ec-41c5-8876-daa99a1b1fb9.png) và tìm ![](https://images.viblo.asia/bc30f7b4-7748-4db1-84dd-c0e22f91d806.png) sao cho ![](https://images.viblo.asia/22dcd393-6dce-46be-a65b-1dd911830f81.png)

![](https://images.viblo.asia/475476c8-5acc-4388-83fc-70b802421d3b.png)

Đây chính là công thức chuẩn (normal equation) của bài toán ta cần giải. Trong đó ma trận ![](https://images.viblo.asia/ed6e2941-6660-49f0-af24-988b3e7c5324.png) được gọi là ma trận mẫu (design matrix), ta có thể hiểu nó đơn giản là tập mẫu của ta: 

![](https://images.viblo.asia/2e1f0b5f-140a-44cc-b63f-de1f47c45105.png)

Để ý rằng ở ma trận Φ ta sắp mỗi dữ liệu huấn luyện theo hàng (m hàng) và các thuộc tính của chúng theo cột (n cột). Các thuộc tính ở đây được biến đổi bằng các hàm ϕi(xj). Và lưu ý rằng như đã đặt phía trên ϕ0(x j)=1 với mọi ![](https://images.viblo.asia/46e66bb9-5c09-4efd-b13e-b4b2b015bb75.png)
Ở phép lấy đạo hàm (3.3) ta thấy rằng mẫu số 2 bị triệt tiêu và giúp bỏ đi được thừa số 2 khi tính đạo hàm. Đấy chính là lý do mà người ta để mẫu số 2 cho hàm lỗi.

# 5. Lập trình

 Ví dụ khởi động này tôi sẽ lấy dữ liệu đơn giản y = 3 + 4x để làm việc. Trước tiên tôi đã chuẩn bị tập dữ liệu huấn luyện gồm 100 cặp dữ liệu được sinh ra theo nhiễu của hàm y=3+4x.

Ở đây tôi sẽ sử dụng các thư viện pandas (xử lý dữ liệu), mathplotlib (đồ hình dữ liệu) và numpy (thao tác toán học) để làm việc:
```
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```
Dữ liệu của ta chỉ có 1 chiều nên dễ dàng đồ hình hoá, việc này cũng giúp ta ước lượng được đôi chút việc chọn các tiêu chí ràng buộc cho mô hình của ta.
```
# load data
df = pd.read_csv(DATA_FILE_NAME)
# plot data
df.plot(x='x', y='y', legend=False, marker='o', style='o', mec='b', mfc='w')
# expected line
plt.plot(df.values[:,0], df.values[:,1], color='g')
plt.xlabel('x'); plt.ylabel('y'); plt.show()

# extract X, y
X = df.values[:,0]
y = df.values[:,2]
# number of training examples
m = y.size
```

![](https://images.viblo.asia/4b7274a9-c864-4ca7-b463-f85a89428389.png)


Nhìn vào biểu đồ của dữ liệu ta có thể nghĩ rằng x ở đây tuyến tính với y, tức là ta có thể chọn 

![](https://images.viblo.asia/a2818d1d-d284-4061-99b9-2931f4f2f74e.png)

Lúc này ta sẽ có:

![](https://images.viblo.asia/05790226-82b1-4d25-abbf-2e54223ee9c4.png)

Như vậy Φ lúc này đơn giản là bằng với ma trận X có thêm cột 1 ở đầu:

![](https://images.viblo.asia/c1b9b7ad-3931-4f09-9902-cb47ad1d3a43.png)
Lúc này ta có thể viết lại y như sau:

![](https://images.viblo.asia/471347cc-39ba-4215-bf33-d59ae8330610.png)
```
X = np.concatenate((np.ones((m,1)), X.reshape(-1,1)), axis=1)
```
Do (Φ ⊺Φ) có thể không khả nghịch nên ta có thể sử dụng phép giả nghịch đảo để làm việc:
```
theta = np.dot(np.linalg.pinv(np.dot(X.T, X)), np.dot(X.T, y))
```
Phép trên sẽ cho ta kết quả: theta=[-577.17310612, 4.16001358], tức:

![](https://images.viblo.asia/bd0ed19d-0138-42ea-8054-6034da9712fa.png)

Giờ ta sẽ tính kết quả ước lượng và mô phỏng lên hình vẽ xem sao.
```
y_hat = np.dot(X, theta)
plt.plot(df.values[:,0], y_hat, color='r')
plt.xlabel('x'); plt.ylabel('y'); plt.show()
```

![](https://images.viblo.asia/5b07d96e-dfa1-4670-bdff-94d2dfe23ac9.png)

Ở hình trên, đường màu xanh là đường mà ta mong muốn đạt được còn đường màu đỏ mà mô hình ước lượng được. Như vậy ta thấy rằng θ1  khá khớp còn θ0 lại lệch rất nhiều, nhưng kết quả lại khá khớp với tập dữ liệu đang có. Nên ta có thể kì vọng rằng nếu gia tăng khoảng dữ liệu thì công thức chuẩn sẽ cho ta kết quả hợp lý hơn.

# 6. Kết luận
Thuật toán hồi quy tuyến tính (linear regression) thuộc vào nhóm học có giám sát (supervised learning) là được mô hình hoá bằng: 

![](https://images.viblo.asia/d4c9939a-1da4-4910-83c3-d319d155b657.png)

Khi khảo sát tìm tham số của mô hình ta có thể giải quyết thông qua việc tối thiểu hoá hàm lỗi (loss function):

![](https://images.viblo.asia/3b4e7568-6b98-4680-9432-168c29a19c87.png)

Hàm lỗi này thể hiện trung bình độ lệch giữa kết quả ước lượng và kết quả thực tế. Việc lấy bình phương giúp ta có thể dễ dàng tối ưu được bằng cách lấy đạo hàm vì nó có đạo hàm tại mọi điểm! Qua phép đạo hàm ta có được công thức chuẩn (normal equation) cho tham số:

![](https://images.viblo.asia/d04bffaf-25ea-4943-80b8-1c2c0fbc07a4.png)

Khi lập trình với python ta có thể giải quyết việc (Φ ⊺Φ) không khả nghịch bằng cách sử dụng giả nghịch đảo để tính toán:
```
np.linalg.pinv(np.dot(X.T, X))
```
Mặc dù công thức chuẩn có thể tính được tham số nhưng với tập dữ liệu mà lớn thì khả năng sẽ không khít được với bộ nhớ của máy tính, nên trong thực tế người ta thường sử dụng phương pháp đạo hàm để tối ưu.