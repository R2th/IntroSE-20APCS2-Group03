# Introduction
Hello mọi người, trong bài viết trước, mình đã giới thiệu tới mọi người kỹ thuật **template matching** dùng để phát hiện đối tượng trong ảnh. Tuy nhiên, phương pháp này có nhược điểm là ảnh template phải rất giống với vật thể trong ảnh cả về kích thước độ nghiêng, ... Nếu khác biệt quá lớn sẽ không phát hiện được
Trong bài viết này, mình sẽ sử dụng một mẹo nhỏ giúp ta sử dụng template matching với object có kích thước lớn hơn 
# Multiscale template matching
Ở bài viết trước, ta đã dừng lại ở đây
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

res = cv2.matchTemplate(img_gray,template, cv2.TM_CCOEFF_NORMED)

THRESHOLD = 0.95
loc = np.where(res >= THRESHOLD)

#Draw boudning box
for y, x in zip(loc[0], loc[1]):
    cv2.rectangle(img, (x, y), (x + w, y + h), (255,0,0), 1)
imshow(img)
```

![](https://images.viblo.asia/adce3047-9275-4736-87f6-81b0a052ad0e.png)

Khi ta thử đoạn code trên với object lớn hơn 

![](https://images.viblo.asia/e7e81ec7-769a-4feb-8656-847a8e22a853.png)

```python
img = cv2.imread('spade.png')
#Convert to grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
template = cv2.imread('template.png', 0)
w, h = template.shape[1], template.shape[0]

res = cv2.matchTemplate(img_gray,template, cv2.TM_CCOEFF_NORMED)

THRESHOLD = 0.95
loc = np.where(res >= THRESHOLD)
print(loc)
#Output: (array([], dtype=int64), array([], dtype=int64))
```
Có thể thấy, khi vật thể lớn hơn hoặc bé hơn so với template thì thuật toán không phát hiện được. Ta có thể áp dụng mẹo sau để có phát hiện vật thể lớn hơn (hoặc làm ngược lại với vật thể nhỏ)
* Downscale ảnh đầu vào xuống nhiều kích cỡ khác nhau (hoặc upscale lên) 
* Áp dụng thuật toán lên ảnh ở nhiều kích cỡ khác nhau
* Lấy threshold và scale lại tọa độ tìm được

# Code 
Đầu tiên vẫn là tiết mục đọc ảnh quen thuộc
```
THRESHOLD = 0.9
img = cv2.imread('sun_work/ace.png')
#Convert to grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
template = cv2.imread('template.png', 0)
template_width, template_height = template.shape[1], template.shape[0]
imshow(img)
```

Định nghĩa các mức scale ảnh khác nhau bằng hàm `np.linspace`
```python
for scale in np.linspace(0.1, 1.0, 20)[::-1]:
     resized = imutils.resize(img_gray, width=int(img_gray.shape[1] * scale))
     ratio = img_gray.shape[1] / float(resized.shape[1])
     
     #Bé hơn template thì dừng
     if resized.shape[0] < template_height or resized.shape[1] < template_width:
        break
```
Áp dụng template matching
```python
res = cv2.matchTemplate(resized, template, cv2.TM_CCOEFF_NORMED)
loc = np.where(res >= THRESHOLD)

#Draw boudning box
for y, x in zip(loc[0], loc[1]):
    cv2.rectangle(img, (x, y), (x + w, y + h), (255,0,0), 1)
```
Kết quả
![](https://images.viblo.asia/1a035d9d-188f-4661-b706-b958de2f4b3a.png)
# Kết luận 
Có thể thấy thuật toán chỉ phát hiện được một phần của vật thể. Tuy đã giải quyết được một phần  vấn đề với vật thể nhiều kích thược khác nhau, nhưng cách cải tiến đơn giản   này vẫn hoạt động không tốt trong các điểu kiện khác như ảnh bị nghiêng.. Một số cách tiếp cận khác để xử lý vẫn đề này có thể kể đến như keypoint matching sử dụng SIFT hoặc SURF