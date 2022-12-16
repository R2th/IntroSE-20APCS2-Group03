Xin chào các bạn, hôm nay tôi sẽ cùng các bạn tìm hiểu một số phép tính toán số học đơn giản trên ảnh sử dụng thư viện OpenCV nhé

# Image Addition
Đây là phép tính cộng hai ảnh vào với nhau, hiểu đơn giản là ảnh thu được sau phép cộng sẽ là kết quả của việc cộng giá trị các pixel tương ứng ở cùng một vị trí của các ảnh thành phần.
`img_dst = img1 + img2`. Điều kiện để có thể thực hiện phép cộng là 2 ảnh phải có cùng kích thước và cùng kiểu giá trị biểu diễn các pixel, hoặc ảnh thứ 2 là một ma trận số nguyên.

> Lưu ý phép cộng 2 ảnh khác với phép cộng của thư viện numpy
Xem ví dụ dưới đây để hiểu sự khác nhau nhé

```bash
>>> x = np.uint8([250])
>>> y = np.uint8([10])
>>> print( cv2.add(x,y) ) # 250+10 = 260 => 255
[[255]]
>>> print( x+y )          # 250+10 = 260 % 256 = 4
[4]
```

Khi cộng 2 ảnh ta có thể sử dụng luôn dòng code `img_dst = img1 + img2` hoặc sử dụng hàm [cv2.add()](https://docs.opencv.org/master/d2/de8/group__core__array.html#ga10ac1bfb180e2cfda1701d06c24fdbd6)

Dưới đây là 1 ví dụ khi cộng 2 ảnh vào nhau :D
```python
import cv2 
    
image1 = cv2.imread('images/img1.jpg') 
image2 = cv2.imread('images/img2.jpg')
  
imgAdd = cv2.add(image1, image2)
cv2.imshow("Add", imgAdd)

if cv2.waitKey(0) & 0xff == 27: 
    cv2.destroyAllWindows() 
```
kết quả thu được như hình dưới đây

![](https://i.imgur.com/O8HWiJd.png)

# Image Subtraction
Nếu như Image Addition là việc cộng 2 giá trị pixel tại tọa độ tương ứng trên hai ảnh thì Image Subtraction sẽ thực hiện phép trừ giá trị 2 pixel tại cùng một tọa độ trên hai ảnh.

Cùng xem ví dụ  thông qua đoạn code dưới đây nhé
```python
import cv2 
import numpy as np 

image1 = cv2.imread('images/img_sub1.jpg') 
image2 = cv2.imread('images/imgsub2.jpg')

sub = cv2.subtract(image1, image2)
cv2.imshow('Subtracted Image', sub)

if cv2.waitKey(0) & 0xff == 27: 
    cv2.destroyAllWindows() 
```

Kết quả được thể hiện ở hình dưới đây:
![](https://i.imgur.com/UuzlYFG.png)

Sau khi lấy image 1 trừ đi image 2 thì trên ảnh kết quả, những pixel trắng trên image 2 đã sang màu đen do trên ảnh image 1 cũng có những pixel trắng nằm ở vị trí tương ứng.


# Image Saturation
Như đã đề cập ở trên phần Image Addition, thay vì việc cộng hoặc trừ 2 ảnh cho nhau, ta có thể cộng hoặc trừ một ảnh với một ma trận số nguyên nhằm thay đổi giá trị pixel của ảnh ban đầu. Cách làm như vậy gọi là Image Saturation, nó thường được sử dụng để tăng hoặc giảm độ sáng của ảnh đầu vào.

Để thực hiện ta sẽ tạo ra một ma trận số nguyên với kích thước bằng đúng ảnh đầu vào. Và tùy mục đích tăng hay giảm độ sáng ta sẽ sử dụng các function hợp lý. Ví dụ như tăng độ sáng thì sẽ dùng [cv2.add()](https://docs.opencv.org/master/d2/de8/group__core__array.html#ga10ac1bfb180e2cfda1701d06c24fdbd6) và ngược lại giảm độ sáng ta sẽ dùng cv2.subtract()
Cùng thử ví dụ nhé:

Dùng OpenCV đọc ảnh cần xử lý:
```python
import cv2
import numpy as np

img = cv2.imread("images/meow.jpg", 1)
cv2.imshow("Original image", img)
```
![](https://i.imgur.com/Uvaq3ab.jpg)

Tạo ma trận số nguyên để sử dụng
```python
img_100 = np.ones(img.shape, dtype = "uint8") * 100
```

Thử tăng độ sáng
```python
img2=cv2.add(img,img_100)
cv2_imshow(img2)
```
và kết quả là
![](https://i.imgur.com/8l6UT5m.png)


-----


Thử giảm độ sáng xem sao
```python
img3=cv2.subtract(img,img_100)
cv2_imshow(img3)
```
và kết quả
![](https://i.imgur.com/zsLqZuM.png)

# Image Blending
Image Blending cũng có thể coi là 1 loại Image Addition. Trong khi Image Addition chỉ đơn giản là việc cộng giá trị của các pixel có cùng vị trí trên hai ảnh để thu được kết quả thì Image Blending có thêm một cơ chế đánh trọng số vào giá trị các pixel của mỗi ảnh.

$g(x)=(1-\alpha)f_0(x)+\alpha.f_1(x)$

Trong đó:
* $x$ là tọa độ của pixel trong ảnh.
* $g(x)$ là giá trị của pixel tại tọa độ x trên ảnh kết quả.
* $f_0$ và $f_1$ là 2 ảnh để thực hiện phép blending.
* $\alpha$ là giá trị trọng số, giá trị của $\alpha$ nằm trong đoạn $[0, 1]$. Với mỗi giá trị $\alpha$ khác nhau ta sẽ thu được một ảnh kết quả khác nhau.

Ngoài ra công thức trên ta cũng có thể thực hiện Image Blending với công thức sau:

$g(x)=\alpha.f_0(x)+\beta.f_1(x)+\gamma$

Trong đó:
* $x, g(x),f_0, f_1$ giống với công thức phía trên
* $\alpha, \beta$ là trọng số của từng ảnh thành phần, và hai trọng số này không phụ thuộc vào nhau.
* $\gamma$ là một phần giá trị được thêm vào sau quá trình cộng 2 ảnh. Thường thì $\gamma=0$ 

Thư viện OpenCV cung cấp hàm [ cv2.addWeighted()](https://docs.opencv.org/master/d2/de8/group__core__array.html#gafafb2513349db3bcff51f54ee5592a19) để thực hiện blending image.

Để thử nghiệm ta dùng đoạn code dưới đây:
```python
import cv2 

image1 = cv2.imread('images/img1.jpg') 
image2 = cv2.imread('images/img2.jpg')

weightedSum = cv2.addWeighted(image1, 0.5, image2, 0.4, 0)
cv2.imshow('Weighted Image', weightedSum)

if cv2.waitKey(0) & 0xff == 27: 
    cv2.destroyAllWindows() 
```

Sau khi thực hiện đoạn code trên sẽ thu được ảnh kết quả như hình dưới đây
![](https://i.imgur.com/Swc1tA4.png)


# Bitwise Operations
Bitwise operations bao gồm các phép *AND, OR, XOR, NOT*. Bảng chân lý của các phép toán này được thể hiện ở hình dưới đây: 
![](https://i.imgur.com/Rx1XlxG.jpg)


Khi thực hiện trên ảnh, X, Y sẽ đại diện cho giá trị pixel của ảnh khi đó:
* **AND** có giá trị 1 khi 2 pixel có giá trị lớn hơn 0.
* **OR** có giá trị 1 nếu một trong 2 pixel có giá trị lớn hơn 0.
* **XOR** có giá trị 1 nếu một trong 2 pixel có giá trị lớn hơn 0, nhưng đồng thời pixel còn lại phải có giá trị 0.
* **NOT** Đảo ngược giá trị pixel.

Với Bitwise Operations, phép toán này chỉ thực hiện trên ảnh nhị phân. Do đó để thực hiện ta cần đưa ảnh về nhị phân với quy luật đơn giản là pixel nào có giá trị lớn hơn 0 thì sẽ mang giá trị 1 và còn lại những pixel nào có giá trị 0 thì vẫn giữ nguyên giá trị là 0. Hình dưới mô tả điều này
![](https://i.imgur.com/Jarp5jA.jpg)

Sau khi đưa về được ảnh nhị phân rồi thì kết quả các phép AND OR XOR NOT sẽ như hình dưới đây :v
![](https://i.imgur.com/6ZXMZ1X.jpg)

Để hiểu rõ hơn về cách thức hoạt động của các phép bitwise tôi sẽ cùng các bạn đi vào ví dụ cụ thể nhé.

Đầu tiên tôi tạo 2 ảnh có kích thước bằng nhau, một hình nền đen chứa hình chữ nhật trắng và một hình nền đen chứ hình tròn trắng. Để tạo được 2 hình này tôi sử dụng đoạn code dưới đây

Đầu tiên là hình chữ nhật trắng trên nền đen
```python
img_rectangle = np.ones((400,400), dtype = "uint8") 
cv2.rectangle(img_rectangle, (50,50), (300,300), (255,255,255), -1)
```
và đây là kết quả
![](https://i.imgur.com/bHSOrBd.png)


-----

Tiếp theo là hình tròn trắng trên nền đen
```python
img_circle = np.ones((400, 400), dtype="uint8")
cv2.circle(img_circle, (300, 300), 70, (255, 255, 255), -1)
```
và đây là kết quả
![](https://i.imgur.com/goCiTRd.png)

Tiếp theo ta sẽ đi xem kết quả của từng phép bitwise trên 2 ảnh vừa rồi nhé

**AND**
```python
bitwiseAnd = cv2.bitwise_and(img_rectangle,img_circle)
```
Kết quả là 
![](https://i.imgur.com/RI1b6HL.png)



-----

**OR**
```python
bitwiseOr = cv2.bitwise_or(img_rectangle,img_circle)
```
Kết quả là 
![](https://i.imgur.com/hoppQ9K.png)



-----

**XOR**
```python
bitwiseXor = cv2.bitwise_xor(img_rectangle,img_circle)
```
Kết quả là 
![](https://i.imgur.com/VZdRNDz.png)



-----

**NOT**
```python
bitwiseNot_rec = cv2.bitwise_not(img_rectangle)
bitwiseNot_circ = cv2.bitwise_not(img_circle)
```
Kết quả trên ảnh hình chữ nhật
![](https://i.imgur.com/pskpTnS.png)

Kết quả trên ảnh hình tròn
![](https://i.imgur.com/bvwvo7B.png)



-----


Tổng hợp kết quả lại ta có như hình dưới đây
> Hình này được tôi tham khảo tại [#005 Image Arithmetic and Logical operations in OpenCV with Python](http://datahacker.rs/005-image-arithmetic-and-logical-operations-in-opencv-with-python/)

![](https://i.imgur.com/cCAtp8a.jpg)

# Tham khảo
* [Arithmetic Operations on Images](https://opencv24-python-tutorials.readthedocs.io/en/latest/py_tutorials/py_core/py_image_arithmetics/py_image_arithmetics.html)
* [Arithmetic Operations on Images using OpenCV | Set-1 (Addition and Subtraction)](https://www.geeksforgeeks.org/arithmetic-operations-on-images-using-opencv-set-1-addition-and-subtraction/)
* [#005 Image Arithmetic and Logical operations in OpenCV with Python](http://datahacker.rs/005-image-arithmetic-and-logical-operations-in-opencv-with-python/)