# Giới thiệu
Dạo gần đây mình có làm việc với **OpenCV** để giải quyết một số bài toán về xử lý ảnh, với việc tích hợp rất nhiều thuật toán để tối ưu cũng như cung cấp nhiều công cụ để hỗ trợ cho việc nghiên cứu và phát triển, đây thực sự là một thư viện tuyệt vời. 

Trong bài viết này, mình xin hướng dẫn cách dùng **opencv** kết hợp với **python** để giải quyết bài toán tìm điểm chính giữa của 1 đa giác.

# Tiến hành
## Xác định bài toán
![](https://images.viblo.asia/9b4954fd-bd3b-459e-b6a9-013ade5e0a9c.jpg)

Ở hình trên, bạn có thể thấy rất nhiều hình đa giác nhiều màu khác nhau, điểm đặc biệt là những đa giác này không thật sự hoàn hảo, như là được vẽ tay. Những hình chữ nhật không thực sự là hình chữ nhật (hơi lệch tí), hay hình tròn không thực sự tròn (hơi méo tí). Công việc của chúng ta là sẽ phải **xác định viền** của các đa giác này, từ đó **tìm điểm chính giữa** của chúng.

## Code
### Tiền xử lý
Để có thể hoàn thành các công việc này, chúng ta phải tiến hành 1 số thao tác tiền xử lý ảnh, bao gồm:
* Convert ảnh sang chế độ gray (xám)
* Làm mờ ảnh để giảm nhiễu (high freequency noise) giúp cho việc xác định viền chính xác hơn.
* Convert ảnh sang ảnh binary (chỉ có đen trắng) 


-----


Trước khi bắt đầu hãy đảm bảo bạn đã install các package cần thiết, bao gồm **imutils**, **cv2**, **argparse**
Tạo một file mới, với tên là "**center_of_shape.py**" và bắt đầu thôi
```python
# (1) import the necessary packages
import argparse
import imutils
import cv2

# (2) construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True, help="path to the input image")
args = vars(ap.parse_args())

# (3) load the image, convert it to grayscale, blur it slightly,
# and threshold it
image = cv2.imread(args["image"])
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imwrite('images/shapes_gray.jpg', gray)

blurred = cv2.GaussianBlur(gray, (5,5), 0)
cv2.imwrite('images/shapes_blurred.jpg', blurred)

thresh = cv2.threshold(blurred, 60, 255, cv2.THRESH_BINARY)[1]
cv2.imwrite('images/shapes_thresh.jpg', thresh)
```
Ở bước 1, chúng ta đơn giản chỉ load các package cần thiết

Ở bước 2, chúng ta cho phép input path của ảnh từ command line, để có thể linh động thay đổi ảnh đầu vào để xử lý

Ở bước 3, bước khá quan trọng, chính là bước tiền xử lý ảnh. Apply grayscale -> Gaussian smoothing sử dụng 5x5 kernel, và cuối cùng là thresholding.
Output của bước tiền xử lý là 1 ảnh nền đen và các hình màu trắng nổi lên.
![](https://images.viblo.asia/ce93a2cf-913d-4341-a224-2aa0dced79e5.png)

### Xử lý
Bước tiếp theo là xác định vị trí của các hình màu trắng nổi lên sử dụng **contour detection**, đó chính là các đa giác của chúng ta. 
```python
# find contours in the thresholded image
cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,
	cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if imutils.is_cv2() else cnts[1]
```
Đoạn code trên trả về 1 list tương ứng với số đa giác (mảng màu trắng) tìm kiếm được trên hình. Do kết quả trả về có sự thay đổi giữa phiên bản opencv 2.4 và 3 nên chúng ta phải check version của open cv. Các bạn có thể xem thêm về function cv.findCountours tại đây https://docs.opencv.org/3.0.0/d4/d73/tutorial_py_contours_begin.html


-----


Sau khi đã có được các viền của các đa giác, chúng ta tiến hành tìm điểm chính giữa và vẽ nó vào vị trí tương ứng với từng đa giác.
```python
# loop over the contours
for c in cnts:
	# compute the center of the contour
	M = cv2.moments(c)
	cX = int(M["m10"] / M["m00"])
	cY = int(M["m01"] / M["m00"])
 
	# draw the contour and center of the shape on the image
	cv2.drawContours(image, [c], -1, (0, 255, 0), 2)
	cv2.circle(image, (cX, cY), 7, (255, 255, 255), -1)
	cv2.putText(image, "center", (cX - 20, cY - 20),
		cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
 
	# show the image
	cv2.imshow("Image", image)
	cv2.waitKey(0)
```


-----


Trong xử lý ảnh, **moment** của ảnh được dùng để nêu bật đặc trưng hình dạng của một ảnh. Những **moment** này ghi lại những thuộc tính của hình ảnh, bao gồm *diện tích của đối tượng* (the area), *trọng tâm* (centroid), *hướng* (orientation) và những thuộc tính liên quan khác.
Ở trên chúng ta đã tính được điểm chính giữa của đa giác, vẽ ra viền của đa giác bằng hàm cv2.drawContours, đặt 1 điểm vòng trắng ở ngay chính giữa đa giác ở tọa độ (cX, cY), sau đó viết text "center" lên gần điểm giữa đó.

Để chạy test code, chúng ta chỉ cần mở **terminal** và chạy dòng lệnh sau
```
python center_of_shape.py --image shapres_and_color.png
```
### Kết quả
![](https://images.viblo.asia/85386875-1250-48ef-aebc-6608e3fd9f40.gif)
Vậy là chúng ta đã xong bài toán tìm điểm chính giữa của 1 hình sử dụng opencv và python. (Goodjob)

Bài viết tham khảo https://www.pyimagesearch.com/2016/02/01/opencv-center-of-contour/