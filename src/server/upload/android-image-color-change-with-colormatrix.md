### 1. Introduction
Đã bao giờ bạn tự hỏi liệu để đổi màu sắc của một bức ảnh có phức tạp không ? Hay bộ filter màu của các app chỉnh sửa làm thế nào mà trông xịn vậy ?
Trong bài viết này, mình sẽ hướng dẫn chi các bạn làm thế nào để xử lý bài toán trên với **ColorMatrix**.

### 2. ColorMatrix 

Để minh họa, mình sẽ sử dụng hình ảnh hoa hồng bên dưới nhé :

![](https://images.viblo.asia/b2f7096c-daa5-43c4-a7a9-7017d078b660.png)

#### 2.1. ColorMatrix Mathematically

ColorMatrix là một lớp dữ liệu chứa một mảng [4x5] các giá trị bao gồm 4 hàng x 5 cột. Về mặt toán học, nó được biểu diễn như sau :

~~~
[ a, b, c, d, e,
  f, g, h, i, j,
  k, l, m, n, o,
  p, q, r, s, t ]
  ~~~
  
Sau đó, bộ màu [R' G' B' A'] được áp dụng cho bức ảnh là một phép toán dựa trên màu gốc [RGBA] như sau :
~~~
R’ = a*R + b*G + c*B + d*A + e;
G’ = f*R + g*G + h*B + i*A + j;
B’ = k*R + l*G + m*B + n*A + o;
A’ = p*R + q*G + r*B + s*A + t;
~~~

Nhìn trông có vẻ phức tạp, giờ mình sẽ giải thích nó một cách đơn giản qua các ví dụ.

Trước khi làm điều đó, cùng xem convert 1 bức ảnh sang gray bằng code :
~~~java
val matrix = floatArray(
    1f, 1f, 1f, 0f, 0f,
    1f, 1f, 1f, 0f, 0f,
    1f, 1f, 1f, 0f, 0f,
    0f, 0f, 0f, 1f, 0f)
image.colorFilter = ColorMatrixColorFilter(matrix)
~~~

#### 2.2. Original Color

Nếu bạn muốn có màu gốc như hình ảnh, matrix sẽ như sau :
~~~
[ 1, 0, 0, 0, 0,
  0, 1, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0 ]
  ~~~
  Bạn sẽ  nhận ra điều này, màu mới sẽ có hệ số như sau :
  ~~~
  R' = 1*R
G' = 1*G
B' = 1*B
A' = 1*A
~~~

### 3. Colorized It

Để tô màu nó thành một màu củ thể, ta chỉ cần tập trung vào hàng cụ thể cho màu mà chúng ta muốn thay đổi.

#### 3.1 Red

Nếu bạn muốn đổi màu bức ảnh sang màu đỏ hoặc không màu, hãy tập trung vào dòng đầu tiên.

~~~
[ 1, 1, 1, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 1, 0 ]
  ~~~
  Công thức như sau :
  
  ~~~
  R' = 1*R + 1*G + 1*B
G' = 0
B' = 0
A' = 1*A (giữ nguyên dộ mờ)
~~~

Điều này có nghĩ bất cứ màu đổ đậm, xanh lá cây, hoặc xanh dương sẽ trở thành màu đỏ đậm. Còn những phần yếu hơn sẽ có màu đỏ tối hơn hoặc đen.

![](https://images.viblo.asia/7b6311b6-cb7e-40f7-b467-fbb2bbb80d9c.png)

##### 3.2 Green

Tương tự, đối với màu xanh lá cây. Ta có thể làm tương tự bằng cách focus vào hàng thứ 2.
~~~
[ 0, 0, 0, 0, 0,
  1, 1, 1, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 1, 0 ]
  ~~~
  
 Kết quả :
 
![](https://images.viblo.asia/eabdf0b6-337a-4427-b64e-b7501741c9cc.png)

#### 3.3 Blue

Đối với màu xanh dương, Focus vào hàng thứ ba :
~~~
[ 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  1, 1, 1, 0, 0,
  0, 0, 0, 1, 0 ]
~~~

Kết quả :

![](https://images.viblo.asia/4f96d2da-1851-4d00-b8d8-4e11a0f9b7ca.png)

#### 3.4 Gray Scale It

Màu xám là màu thỏa màn R,G,B có cùng 1 giá trị.
Để đồng đều màu xám, sử dụng công thức dưới đây ( Chú ý : Mình sử dụng 0.33 thay vì 1 để đảm bảo nó không sáng quá, giá trị càng lớn, hình ảnh sẽ càng sáng (hoặc trắng ) hơn.
~~~
[ 0.33, 0.33, 0.33, 0, 0,
  0.33, 0.33, 0.33, 0, 0,
  0.33, 0.33, 0.33, 0, 0,
  0, 0, 0, 1, 0 ]
  ~~~
  
  Kết quả sẽ như dưới đây trong đó R' = G' = B'
  
  ~~~
  R' = 0.33*R + 0.33*G + 0.33*B
G' = 0.33*R + 0.33*G + 0.33*B
B' = 0.33*R + 0.33*G + 0.33*B
A' = 1*A ( giữ nguyên độ mờ)
~~~

![](https://images.viblo.asia/d26c1795-14ef-4077-9918-70f060a49701.png)

#### 3.5 Inverting the Color

Giống như phim ảnh ngày xưa, nếu ta muốn đảo ngược màu của hình ảnh. Ta cần tạo 1 số với giá trị 255 - màu gốc.

~~~
[ -1, 0, 0, 0, 255,
  0, -1, 0, 0, 255,
  0, 0, -1, 0, 255,
  0, 0, 0, 1, 0 ]
~~~
Khi đó, bộ màu mới sẽ như sau :

~~~java
R' = -1*R + 255 = 255 -1*R
G' = -1*G + 255 = 255 -1*G
B' = -1*B + 255 = 255 -1*B
A' = 1*A
~~~

![](https://images.viblo.asia/4f2860ac-378d-48d3-9032-7d6c66b0a2b9.png)

### 4. ColorMatrix Data Class

Nếu thao tác thủ công ma trận gây rắc rối cho bạn, bạn có thể sử dụng lớp ColorMatrix. Khởi tạo một ma trận gốc như sau :
~~~java
val colorMatrix = ColorMatrix()
~~~
Ma trận gốc thủ công sẽ như sau :
~~~
[ 1, 0, 0, 0, 0,
  0, 1, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0 ]
  ~~~
  
  Chuyển đổi ma trận sang code : 
  
  ~~~java
val matrix = floatArray(
    1f, 0f, 0f, 0f, 0f,
    0f, 1f, 0f, 0f, 0f,
    0f, 0f, 1f, 0f, 0f,
    0f, 0f, 0f, 1f, 0f)
~~~

Cuối cùng, áp dụng filter cho ảnh bằng dòng lệnh :
~~~java
image.colorFilter = ColorMatrixColorFilter(matrix)
~~~

OK, giờ cùng tìm hiểu 1 số thuật toán chuyển đổi nữa nhé.

####  4.1 Scaling

Scale đơn giản là làm sáng từng vùng màu sao cho phù hợp.

Thông thường, nó sẽ được set khoảng 0-1 ( từ không màu -> màu gốc ). Tuy nhiên, nó cũng được set lớn hơn 1 để làm sáng màu cụ thể.

~~~java
matrix.setScale(redScale, greenScale, blueScale, alphaScale)
~~~

#### 4.2 Saturation

Saturation ( bão hòa ) là sự chuyển đổi màu từ màu xám chưa bão hòa sang màu gốc và cao hơn. Nó trông giống scaling nhưng thiên về màu sắc hơn ( ko có khả năng tạo hiệu ứng làm trắng như scaling )

~~~java
matrix.setSaturation(saturationValue)
~~~


#### 4.3 Rotating 

Tương tự như scaling nhưng áp dụng cho 1 màu cụ thể.

~~~
matrix.setRotate(colorInt, degree)
~~~

colorInt thuộc các giá trị : 0 - đỏ, 1 = xanh lá, 2 = xanh da trời. Và degree trong khoảng 0 -> 360. 

### 5. Conclusion

Về cơ bản, có rất nhiều cách để thao tác với màu sắc. Happy coding ^^


### 6. Reference

- [Medium - ColorMatrix](https://medium.com/better-programming/android-image-color-change-with-colormatrix-e927d7fb6eb4)