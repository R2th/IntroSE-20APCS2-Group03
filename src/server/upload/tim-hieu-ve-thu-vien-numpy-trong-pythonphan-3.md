Trong bài viết trước tôi đã giới thiệu cho bạn về NumPy, tìm hiểu về Mảng trong NumPy. Trong bài viết này chúng ta sẽ tiếp tục tìm hiểu về các kiểu dữ liệu khác trong NumPy

## Tìm kiếm Mảng

Bạn có thể tìm kiếm một mảng cho một giá trị nhất định và trả về các chỉ mục nhận được một kết quả phù hợp. Để tìm kiếm một mảng, hãy sử dụng `where()`.

Tìm các chỉ mục có giá trị là 4:

```
arr = np.array ([1, 2, 3, 4, 5, 4, 4]) 

x = np.where (arr == 4) 
print (x)
```

Output: `(mảng ([3, 5, 6], dtype = int64),)`

Giá trị 4 có ở chỉ mục 3, 5 và 6.

Tìm các chỉ mục trong đó các giá trị là chẵn:

```
arr = np.array ([1, 2, 3, 4, 5, 6, 7, 8]) 

x = np.where (arr% 2 == 0) 
print (x)
```

Output: `(array([1, 3, 5, 7], dtype=int64),)`

## Tạo số ngẫu nhiên

NumPy cung cấp module random hoạt động với các số ngẫu nhiên. Bạn sẽ cần sử dụng từ khóa from để nhập ngẫu nhiên từ numpy.

```
nhập numpy dưới dạng np
#Import Random Mô-đun 
từ ngẫu nhiên nhập numpy
x = random.randint (100) 
print (x)
```

Output: 86

## Tạo Float ngẫu nhiên

Phương thức module random `rand()` trả về một số thực ngẫu nhiên từ 0 đến 1.

```
x = random.rand()
print(x)
```

Output: `0.048781085334483776`

## Tạo mảng ngẫu nhiên

Trong NumPy, chúng tôi làm việc với mảng và bạn có thể sử dụng hai phương pháp từ các ví dụ trên để tạo mảng ngẫu nhiên.

### Số nguyên (Integer)

Các phương pháp `randint()` có một `size` số nơi bạn có thể xác định hình dạng của một mảng.

```
x = random.randint (100, size = (5)) 

print (x)
```

Output: `[13 31 70 76 31]`

### Số thập phân (Floats)

Các phương pháp rand() cũng cho phép bạn chỉ định hình dạng của mảng.

```
x = random.rand (5) 
print (x)
```

Output: `[0,64724056 0,96725784 0,52396417 0,57882588 0,41752778]`

## Tạo số ngẫu nhiên từ mảng

Các phương pháp`choice()` cho phép bạn tạo ra một giá trị ngẫu nhiên dựa trên một mảng các giá trị.

```
x = random.choice ([3, 5, 7, 9]) 
print (x)
```

Output: `9`

## Các hàm toán học

NumPy chứa một số lượng lớn các phép toán khác nhau. NumPy cung cấp các hàm lượng giác tiêu chuẩn, các hàm cho các phép toán số học, xử lý số phức, v.v.

### Hàm lượng giác

NumPy có các hàm lượng giác tiêu chuẩn trả về tỷ số lượng giác cho một góc nhất định tính bằng radian.

```
import numpy as np 
a = np.array([0,30,45,60,90]) 

print 'Sine of different angles:' 
# Convert to radians by multiplying with pi/180 
print np.sin(a*np.pi/180) 
print '\n'  

print 'Cosine values for angles in array:' 
print np.cos(a*np.pi/180) 
print '\n'  

print 'Tangent values for given angles:' 
print np.tan(a*np.pi/180) 
```

Output: 

```
Sine of different angles:
[ 0.          0.5         0.70710678  0.8660254   1.        ]

Cosine values for angles in array:
[  1.00000000e+00   8.66025404e-01   7.07106781e-01   5.00000000e-01
   6.12323400e-17]                                                            

Tangent values for given angles:
[  0.00000000e+00   5.77350269e-01   1.00000000e+00   1.73205081e+00
   1.63312394e+16]
```

Các hàm **arcsin, arcos**  và **arctan** trả về nghịch đảo lượng giác của **sin, cos**  và **tan** của góc đã cho. Kết quả của các hàm này có thể được xác minh bởi hàm `numpy.degrees ()` bằng cách chuyển đổi radian sang độ.

Ex: 
```
import numpy as np 
a = np.array([0,30,45,60,90]) 

print 'Array containing sine values:' 
sin = np.sin(a*np.pi/180) 
print sin 
print '\n'  

print 'Compute sine inverse of angles. Returned values are in radians.' 
inv = np.arcsin(sin) 
print inv 
print '\n'  

print 'Check result by converting to degrees:' 
print np.degrees(inv) 
print '\n'  

print 'arccos and arctan functions behave similarly:' 
cos = np.cos(a*np.pi/180) 
print cos 
print '\n'  

print 'Inverse of cos:' 
inv = np.arccos(cos) 
print inv 
print '\n'  

print 'In degrees:' 
print np.degrees(inv) 
print '\n'  

print 'Tan function:' 
tan = np.tan(a*np.pi/180) 
print tan
print '\n'  

print 'Inverse of tan:' 
inv = np.arctan(tan) 
print inv 
print '\n'  

print 'In degrees:' 
print np.degrees(inv) 
```
OUtput: 
```
Array containing sine values:
[ 0.          0.5         0.70710678  0.8660254   1.        ]

Compute sine inverse of angles. Returned values are in radians.
[ 0.          0.52359878  0.78539816  1.04719755  1.57079633] 

Check result by converting to degrees:
[  0.  30.  45.  60.  90.]

arccos and arctan functions behave similarly:
[  1.00000000e+00   8.66025404e-01   7.07106781e-01   5.00000000e-01          
   6.12323400e-17] 

Inverse of cos:
[ 0.          0.52359878  0.78539816  1.04719755  1.57079633] 

In degrees:
[  0.  30.  45.  60.  90.] 

Tan function:
[  0.00000000e+00   5.77350269e-01   1.00000000e+00   1.73205081e+00          
   1.63312394e+16]

Inverse of tan:
[ 0.          0.52359878  0.78539816  1.04719755  1.57079633]

In degrees:
[  0.  30.  45.  60.  90.]
```
### Các chức năng để làm tròn

`numpy.around ()`

Đây là một hàm trả về giá trị được làm tròn đến độ chính xác mong muốn. Hàm nhận các tham số sau: `numpy.around(a,decimals)`
Trong đó: `a`: là dữ liệu đầu vào 
`decimals`: Số lượng số thập phân làm tròn đến. Mặc định là 0. Nếu âm, số nguyên được làm tròn đến vị trí bên trái của dấu thập phân

Ex: 
```
import numpy as np 
a = np.array([1.0,5.55, 123, 0.567, 25.532]) 

print 'Original array:' 
print a 
print '\n'  

print 'After rounding:' 
print np.around(a) 
print np.around(a, decimals = 1) 
print np.around(a, decimals = -1)
```
Output: 
```
Original array:                                                               
[   1.       5.55   123.       0.567   25.532] 

After rounding:                                                               
[   1.    6.   123.    1.   26. ]                                               
[   1.    5.6  123.    0.6  25.5]                                          
[   0.    10.  120.    0.   30. ]
```

### numpy.floor ()

Hàm này trả về số nguyên lớn nhất không lớn hơn tham số đầu vào. Tầng của vô hướng x là số nguyên i lớn nhất , sao cho i <= x . Lưu ý rằng trong Python, luôn được làm tròn từ 0.

Ex:
```
import numpy as np 
a = np.array([-1.7, 1.5, -0.2, 0.6, 10]) 

print 'The given array:' 
print a 
print '\n'  

print 'The modified array:' 
print np.floor(a)
```

Output:
```
The given array:                                                              
[ -1.7   1.5  -0.2   0.6  10. ]

The modified array:                                                           
[ -2.   1.  -1.   0.  10.]
```

### numpy.ceil ()
Hàm `ceil()` trả về giá trị trần của giá trị đầu vào, tức là ceil của vô hướng x là số nguyên i nhỏ nhất , sao cho i >= x.

Ex:
```
import numpy as np 
a = np.array([-1.7, 1.5, -0.2, 0.6, 10]) 

print 'The given array:' 
print a 
print '\n'  

print 'The modified array:' 
print np.ceil(a)
```

Output: 
```
The given array:                                                              
[ -1.7   1.5  -0.2   0.6  10. ]

The modified array:                                                           
[ -1.   2.  -0.   1.  10.]
```


## Tham khảo:

[Numpy Tutorial](https://www.tutorialspoint.com/numpy/numpy_ndarray_object.htm)
[Numpy.org](https://numpy.org/learn/)
[Numpy Medium](https://medium.com/insights-school/learn-python-numpy-with-examples-1b0dc887187a)