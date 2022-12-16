Xin chào các bạn, hôm nay mình sẽ giới thiệu các bạn về thư viện Opencv2, 1 thư viện rất mạnh hay sử dụng trong xử lý ảnh, đây cũng chính là thư viện mình sử chủ yếu code trong các bài tiếp theo.
Và ở đây mình sẽ code bằng ngôn ngữ python 3 trên môn trường jupyter notebook.
# Setup
Mình khuyến khích các bạn sử dụng anaconda ở đó sẽ có jupyter notebook, cách settup bạn có thể tham khảo đường link sau [đây](https://www.youtube.com/watch?v=T8wK5loXkXg).

Cài đặt thư viện opencv2: 
```python 
pip install opencv-python
```
Kiểm tra version: 
```python
import cv2
cv2.__version__
#'4.1.1'
```
Hoặc nếu bạn không muốn mất thời gian bạn có thể sử dụng [colab](https://colab.research.google.com/notebooks/welcome.ipynb)
# Read and display image
Ảnh mình sẽ dùng sẽ là ảnh như sau: 
![](https://images.viblo.asia/997a07b5-5dbb-4e42-9fb6-9a0fa4f8b7c7.jpg)

```python 
iname = 'lena.jpg'
#read image
img = cv2.imread(iname)
img
```
Đầu ra của img lúc này sẽ là 1 ma trận ba chiều nhưng trong phần lý thuyết RGB.
Chúng ta sẽ có câu lệnh xem shape và size của ảnh:
```python
img.shape()
# output: (512, 512, 3)
img.size
# output: 786432
```

Khi display ảnh thì có 2 cách:

* Cách 1 dùng hàm có sẵn trong cv2:
    ```python
    # cv2.imshow(window_name, image)
    cv2.imshow('test', img)
    ```
* Cách 2 dùng thư viện matplotlib.
     ```python
     #to display at jupyter notebook
    import matplotlib.pyplot as plt
    #Note cv2 read BGR as default
    plt.imshow(image)
     ```
    Nếu code như trên thì ảnh đầu ra sẽ như sau: ![](https://images.viblo.asia/d3a6b7e8-2791-41ec-9160-86eed4425202.png)

  Bởi vì cv2 mặc định đọc ảnh màu theo thứ là BGR (là blue, green và red). VÌ vậy muốn display đúng ta phài viết:
    ```python
    #display rgb image
    plt.imshow(image[:,:,::-1])
    ```
# Accessing image data with numpy.array 
Các phép toán ta quen thuộc sử dụng trên numpy cũng được sử dụng trong image data.
ví dụ: 
```python
img[0,0] 
#output: array([128, 138, 225], dtype=uint8)
```
Crop ra 1 phần trong ảnh và display chúng: 
```python
#crop image
crop = img[100:300, 100:300]
plt.imshow(crop[:,:,::-1])
```
Kết quả: ![](https://images.viblo.asia/9e44d1a9-e564-48e6-8299-51bc6d07f954.png)

Chuyển màu vùng ta vừa crop thành màu xanh: 
```python
copy = img.copy()
copy[100:300, 100:300] = [255, 0, 0] #assign blue color
plt.imshow(copy[:,:,::-1])
```
Kết quả: ![](https://images.viblo.asia/9ec23d2c-95f1-4b57-80ba-19c31e7a83f7.png)

# Resizing images
Ta muốn resize lại ảnh trên thành ảnh có kích thước 200, 200 sẽ làm như sau:
```python
h, w = image.shape[:2]
resized = cv2.resize(image, (200, 200))
plt.imshow(resized[:,:,::-1])
```
# Write images
Lưu file ảnh ta dùng câu lệnh sau: 
```python
# cv2.imwrite(filename, image)
cv2.imwrite("test.jpg", resized)
```

# Tổng kết
Tất cả code bạn có thể xem chi tiết tại đây: [đây](https://colab.research.google.com/drive/1QnHygc-dz218pZUGQsyInMf88HZ_u0Z8)

Trên đây mình đã giới thiệu với các bạn về cách đọc, display và lưu một file ảnh