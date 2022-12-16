# Introduction
Hello mọi người, trong bài viết này  mình sẽ giới thiệu với các bạn một kỹ thuật object detection mà không sử dụng machine learning mang tên Template Matching.

**Template matching** cho phép chúng ta phát hiện vật thể trong ảnh đầu vào bằng cách sử dụng một ảnh tham chiếu (template) chứa vật thể cần phát hiện.  Cách thuật toán hoạt động:
* Trượt ảnh template trên ảnh đầu vào (giống tích chập 2D)
* Ảnh  template sẽ được so sánh với cửa sổ trượt tương ứng trên ảnh đầu vào bằng một công thức. Một số phương pháp so sánh được hỗ trợ trong opencv được cho ở hình dưới

![](https://images.viblo.asia/058408be-62a5-46e2-8d6c-8b3ced21353e.png)

Trong bảng trên, $T$ là ảnh template, $I$ là ảnh đầu vào. Khi ta trượt ảnh template trên ảnh đầu vào, một metric sẽ được tính toán tại mỗi pixel của ma trận đầu ra $R$. Ma trận $R$ sẽ có kích thước nhỏ hơn ảnh đầu vào (giống với kết quả khi thực hiện tích chập). Giá trị mỗi pixel của $R$ biểu diễn mức độ trùng khớp của ảnh template với vị trí tương ứng trên ảnh đầu vào. Từ đó, ta có thể chọn ra pixel có giá trị cao nhất (nếu muốn detect 1 vật thể) hoặc lấy threshold  $R$ (nếu detect nhiều vật thể).

Ưu điểm:
*  Nhanh, đơn giản
*  Không tốn công làm data

Nhược điểm
* Template phải rất giống với vật thể trong ảnh cả về kích thước độ nghiêng, ... Nếu khác biệt quá lớn sẽ không phát hiện được.
# Template matching trong opencv
Đầu tiên các bạn cài đặt opencv đã nhé 
```python
pip install opencv-contrib-python
```
Opencv cung cấp sẵn hàm ` cv2.matchTemplate()` cho thuật toán template matching. Hàm này nhận vào 3 tham số chính
* Ảnh đầu vào `input` chứa vật thể cần detect
* Ảnh template `temp1`
* `method`: cách tính ma trận output $R$

Để minh họa chạy thuật toán, ta sẽ cần 1 ảnh đầu vào và 1 ảnh template. Ở đây mình  sẽ dùng 2 ảnh này. Ảnh template đã được mình crop ra từ 1 vùng của ảnh đầu vào để cho kết quả tốt nhất
![](https://images.viblo.asia/abc75517-7c07-45f8-b2fb-ed2caadfb1fa.png)

![](https://images.viblo.asia/8811c62a-5867-4911-b9a2-534767f50f1a.png)


Đầu tiên ta import các thư viện và đọc ảnh vào 
```python
import cv2 
import matplotlib.pyplot as plt

def imshow(img, figsize=(6, 6)):
    fig, ax = plt.subplots(1, 1, figsize=(figsize))
    ax.axis('off')
    ax.imshow(img)
    
img = cv2.imread('spade.png')
#Convert to grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
template = cv2.imread('template.png', 0)
w, h = template.shape[1], template.shape[0]
imshow(img)
```

Tiếp theo, ta gọi hàm `cv2.matchTemplate()` với `img_gray` và `template`
```python
res = cv2.matchTemplate(img_gray,template, cv2.TM_CCOEFF_NORMED)
imshow(res)
```
![](https://images.viblo.asia/e037b780-885d-4814-8e96-e3063acf3d64.png)

Ở trên mình visualize ma trận output $R$.  Những vị trí sáng hơn là những vị trí có độ tương đồng cao với ảnh template. Tiếp theo ta lấy threshold để lọc ra những vị trí này
```python
THRESHOLD = 0.95
loc = np.where(res >= THRESHOLD)

#Draw boudning box
for y, x in zip(loc[0], loc[1]):
    cv2.rectangle(img, (x, y), (x + w, y + h), (255,0,0), 1)
imshow(img)
```
Và kết quả là:

![](https://images.viblo.asia/adce3047-9275-4736-87f6-81b0a052ad0e.png)

Trông rất tốt đúng không nào! Nếu các bạn muốn phát hiện thêm  những hình quân bích ở dưới thì có thể hạ threshold xuống, và tất nhiên các trường hợp false positive cũng sẽ tăng theo.

```python
THRESHOLD = 0.6
loc = np.where(res >= THRESHOLD)

#Draw boudning box
for y, x in zip(loc[0], loc[1]):
    cv2.rectangle(img, (x, y), (x + w, y + h), (255,0,0), 1)
imshow(img)
```
![](https://images.viblo.asia/674f93fe-3e23-4300-b740-aca7ca3b0be9.png)

Lý do có nhiều các đường bao dày lên như vậy là do có nhiều bounding box bị vẽ đè lên nhau. Để loại bỏ bớt các bạn có thể sử dụng thuật toán như Non Maximum Suppression. Và thật may mắn khi có bài viết rất hay về chủ đề này  tại [đây](https://viblo.asia/p/tim-hieu-va-trien-khai-thuat-toan-non-maximum-suppression-bJzKmr66Z9N) của tác giả [Lê Minh Chiến](https://viblo.asia/u/chienbk98).

# Kết luận
Trong bài viết này, mình đã giới thiệu tới các bạn thuật toán Template Matching sử dụng opencv. Đây là một kỹ thuật khá đơn giản, có thể áp dụng cho một số bài toán phát hiện vật thể trong các điều kiện nhất định.  Nếu các bạn thấy có ích thì hãy like, share hoặc upvote nhé. Chào tạm biệt và hẹn các bạn ở bài viết sau :)