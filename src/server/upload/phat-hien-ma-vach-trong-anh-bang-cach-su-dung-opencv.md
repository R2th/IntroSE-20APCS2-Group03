Hôm trước trong khi đọc linh tinh trên các trang blog và StackOverflow, mình có đọc được câu hỏi về cách phát hiện mã vạch trên ảnh. Dựa theo câu trả lời của câu hỏi đó, mình đã thử cài đặt mã và thu được kết quả khá tốt. Mặc dù phần mã này này sẽ không hoạt động đối với tất cả các mã vạch, nhưng nó sẽ cung cấp cho ta hiểu biết cơ bản cơ bản về loại kỹ thuật nên áp dụng.

Trong ví dụ này, ta sẽ phát hiện mã vạch trong hình ảnh sau:
![](https://images.viblo.asia/f45c7148-ce07-4879-84cc-23086a99a713.jpg)

# Triển khai mã
Việc đầu tiên chúng ta cần làm đó là import các thư viện cần thiết. Để nhận điện mã vạch trong ảnh, chúng ta sử dụng các thư viện numpy (dùng để xử lý ma trận), imutils và cv2.
Trong phần triển khai mã, đầu tiên ta sử dụng cv2 để tải ảnh cũng như chuyển ảnh màu sang ảnh xám.
 ```python
image = cv2.imread('in.jpg')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
```
Sau đó, ta sử dụng toán tử Sobel với ksize = -1 để xây dựng biểu diễn cường độ gradient của ảnh xám theo hướng ngang và dọc.Từ đó, ta trừ kết quả thu được theo chiều dọc của toán tử Sobel với kết quả thu được theo chiều ngang của toán tử Sobel. Bằng cách thực hiện phép trừ này, ta chỉ còn lại các vùng của hình ảnh có cường độ gradient ngang cao và cường độ gradient dọc thấp.
```python
ddepth = cv2.cv.CV_32F if imutils.is_cv2() else cv2.CV_32F
gradX = cv2.Sobel(gray, ddepth=ddepth, dx=1, dy=0, ksize=-1)
gradY = cv2.Sobel(gray, ddepth=ddepth, dx=0, dy=1, ksize=-1)
gradient = cv2.subtract(gradX, gradY)
gradient = cv2.convertScaleAbs(gradient)
```
Tiếp đến, ta áp dụng filter blur trung bình cho hình ảnh gradient bằng hạt nhân 11x11. Điều này sẽ giúp làm giảm nhiễu tần số cao trong biểu diễn cường độ gradient của ảnh.
```python
blurred = cv2.blur(gradient, (11, 11))
```
Sau đó, ta sẽ threshold ảnh mờ đã được blur trên. Bất kỳ pixel nào trong ảnh không lớn hơn 150 được đặt thành 0 (màu đen) và các pixel còn lại được đặt thành 255 (màu trắng).
```python
(_, thresh) = cv2.threshold(blurred, 150, 255, cv2.THRESH_BINARY)
```
Tiếp đó, ta sẽ bắt đầu bằng cách xây dựng một hạt nhân hình chữ nhật bằng cách sử dụng hàm ```cv2.getSturationuringEuity```. Sau đó, ta thực hiện morphological operation bằng cách áp dụng hạt nhân vào hình ảnh đã được threshold, từ đó có thể lấp đầy các khoảng trống giữa các mã vạch.
```python
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (21, 63))
closed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
```
Tiếp theo ta thực hiện phép Closing để làm trơn đường bao các đối tượng, lấp đầy các khoảng trống biên và loại bỏ những hố nhỏ. Phép toán này được thực hiện bằng cách mở rộng sau đó xói mòn ảnh.
```python
closed = cv2.dilate(closed, None, iterations=10)
closed = cv2.erode(closed, None, iterations=10)
```

Ở bước cuối cùng, bằng cách sử dụng hàm ```cv2.findContours``` ta tìm vùng liên tục có giá trị lớn nhất và xác định đây là vùng chứa mã vạch. Bằng hàm ```cv2.drawContours``` ta có thể dễ dàng đánh dấu vùng này bằng cách vẽ một khung hình chữ nhật.
```python
cnts = cv2.findContours(closed.copy(), cv2.RETR_EXTERNAL,
                            cv2.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)
c = sorted(cnts, key=cv2.contourArea, reverse=True)[0]

rect = cv2.minAreaRect(c)
box = cv2.boxPoints(rect)
box = np.int0(box)

cv2.drawContours(image, [box], -1, (0, 255, 0), 3)
cv2.imwrite("out.jpg", image)
```
Kết quả thu được như sau:
![](https://images.viblo.asia/53994892-af16-43d4-9de6-25ff08ae14f8.jpg)
Tuy không đạt được độ chính xác tuyệt đối nhưng phần khung màu xanh đã bao trọn khá sát với mã vạch của ta.
# Một số lý thuyết được sử dụng
Phần này liệt kê một số phần thuật toán đã sử dụng được triển khai sẵn trong openCV
## Mask Filter
Thực ra trong xử lý ảnh, phép lọc được dùng rất nhiều và có nhiều vai trò quan trọng. Bằng cách sử dụng cửa sổ/bộ lọc là các ma trận cỡ lẻ (ví dụ 3x3 hoặc 5x5) và dùng toán tử convolution để áp cửa sổ/bộ lọc lên ảnh gốc ta có thể thu được ảnh mới với độ nhiễu thấp hơn cũng như đã được làm mịn hơn ảnh gốc.
## Sobel
Một cách đơn giản để xác định pixel có phải là cạnh hay không là kiểm tra giá trị cường độ sáng tại pixel đó trừ đi giá trị cường độ sáng của pixel ở gần đó. Nếu hiệu số cao, điều đấy có nghĩa có sự thay đổi đột ngột về độ sáng tại điểm đấy; và ngược lại, nếu kết quả trả về là một giá trị thấp, thì điểm đấy khả năng cao không phải là cạnh. Để thực hiện điều này, chúng ta sẽ sử dụng cách tính tích chập (convolution) để giải quyết vấn đề này một cách nhanh chóng. Cách thực hiện phép toán Sobel thực chất cũng chính là cách tính tích chập được đề cập ở  trên với giá trị của kernel (nói đơn giản là ma trận) được phương pháp này sử dụng như sau:
![](https://images.viblo.asia/697f37b5-ee50-4d52-bff7-f61c38efbedf.JPG)
OpenCV cung cấp hàm có sẵn có thể được sử dụng như sau:
```python
cv2.Sobel(gray, ddepth=ddepth, dx=1, dy=0, ksize=-1)
```

## Structuring Element
#### Phép mở rộng ảnh - Dilation 
Là một trong các hoạt động cơ bản trong hình thái toán học. Phép toàn này có tác dụng làm cho đối tượng ban đầu trong ảnh tăng lên về kích thước.

Phép mở rộng ảnh A bằng B được ký hiệu như sau:
![](https://wikimedia.org/api/rest_v1/media/math/render/svg/f8be2d595a97dad0f7ff0ab4bd1c1b823ded82f4)
#### Phép xói mòn ảnh - Erosion  
Là một trong các hoạt động cơ bản trong hình thái toán học. Phép toàn này có tác dụng giảm kích thước của đối tượng, tách rời các đối tượng gần nhau, làm mảnh và tìm xương của đối tượng.

Phép xói mòn ảnh A bằng B được ký hiệu như sau:
![](https://wikimedia.org/api/rest_v1/media/math/render/svg/c00044c9825775c039a1851a305eca978f291a1a)
### Phép Closing
là phép toán thực hiện phép giãn nở (Dilation) trước sau đó mới thực hiện phép co (Erosion). 
![](https://wikimedia.org/api/rest_v1/media/math/render/svg/f6acfb0227af88e8c657ea8420a4710ea4c00427)

Phép toán đóng (Closing) được dùng trong ứng dụng làm trơn đường bao các đối tượng, lấp đầy các khoảng trống biên và loại bỏ những hố nhỏ.
# Tài liệu tham khảo
- [How to find the location of red region in an image using MATLAB?
](https://stackoverflow.com/questions/9013703/how-to-find-the-location-of-red-region-in-an-image-using-matlab/9014569)
- [Closing (morphology)](https://en.wikipedia.org/wiki/Closing_(morphology))
- [Dilation (morphology)](https://en.wikipedia.org/wiki/Dilation_(morphology))
- [Erosion  (morphology)](https://en.wikipedia.org/wiki/Erosion_(morphology))
- [Sobel operator](https://en.wikipedia.org/wiki/Sobel_operator)