Bài tiếp theo trong series [Machine Learning, Deep Learning cho người bắt đầu](https://viblo.asia/s/machine-learning-deep-learning-cho-nguoi-bat-dau-vElaBkkY5kw)

Chúng ta cùng điểm lại những kiến thức mà mình đã nói tới trong [bài viết đầu](https://viblo.asia/p/machine-learning-deep-learning-cho-nguoi-bat-dau-1VgZvEeYKAw) của series này:
*  Kiến thức toán học cần thiết
    * Đại số tuyến tính
    * Đạo hàm
    * Lý thuyết xác suất
* Kỹ năng lập trình Python
    * Cài đặt Python và các thư viện cần thiết
    * Tính chất đặc điểm
    * Các hàm dựng sẵn và kiểu dữ liệu trên Python

## 2. Kỹ năng lập trình Python
### a. [Cài đặt Python và các thư viện cần thiết](https://viblo.asia/p/machine-learning-deep-learning-cho-nguoi-bat-dau-1VgZvEeYKAw#_a-cai-dat-python-va-cac-thu-vien-can-thiet-5)
### b. [Tính chất đặc điểm](https://viblo.asia/p/machine-learning-deep-learning-cho-nguoi-bat-dau-1VgZvEeYKAw#_b-tinh-chat-dac-diem-6)
### c. [Các hàm dựng sẵn và kiểu dữ liệu trên Python](https://viblo.asia/p/machine-learning-deep-learning-cho-nguoi-bat-dau-1VgZvEeYKAw#_c-cac-ham-dung-san-va-kieu-du-lieu-tren-python-7)
### d. Vòng lặp
Trong Python các câu lệnh (statement) được thực hiện một cách tuần tự từ trên xuống dưới. Tuy nhiên đôi khi bạn muốn thực hiện một khối các câu lệnh nhiều lần, bạn có thể sử dụng vòng lặp (loop).
![](https://images.viblo.asia/b7a84a71-5096-432f-a659-86617ff72500.jpeg)
* Vòng lặp while: lặp đi lặp lại một lệnh hoặc một nhóm lệnh trong khi một điều kiện đã cho là TRUE. Nó kiểm tra điều kiện trước khi thực thi phần thân của vòng lặp.

* Vòng lặp for: nó có khả năng lặp qua các item của bất kỳ dãy nào như một list hoặc một string.

* Lồng vòng lặp: bạn có thể sử dụng một hoặc nhiều vòng lặp bên trong bất kỳ vòng lặp while, for hoặc do…while nào.
#### Các câu lệnh

| Lệnh | Mô tả |
| -------- | -------- |
| **break**     | 	Đây là câu lệnh ngừng vòng lặp.     | 
| **continue**     | Đây là câu lệnh để bỏ qua các câu lệnh còn lại trong khối lệnh (block),  và ngay lập tức kiểm tra lại điều kiện trước khi tiếp tục thực thi lại khối lệnh.     | 
| **pass**     | Lệnh pass trong vòng lặp chỉ đơn giản là một đánh dấu, nhắc bạn nhớ thêm mã (code) nào đó trong tương lai. Nó là một lệnh null (Không làm gì cả).     | 

Bạn có thể tìm hiểu nhiều hơn về vòng lặp [tại đây](https://docs.python.org/2/library/itertools.html)

> Hãy đảm bảo rằng kiến thức về Python của bạn đã vững để chúng ta tiếp tục với series Machine Learning

## 3. Thư viện Numpy và TensorFlow
### a. Numpy
#### Giới thiệu về Numpy
[Numpy](http://www.numpy.org/) (hay Numeric Python) là một gói công cụ hỗ trợ tính toán rất hiệu quả trên mảng (array), nhanh hơn rất nhiều so với tính toán trên danh sách (list) mặc định của Python. Ngoài ra, numpy còn hỗ trợ các phép tính trực tiếp trên toàn bộ mảng, chứ không cần phải duyệt qua từng phần tử của mảng.

Ví dụ

```
import numpy as np
 
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])
 
C = A + B
 
print(C)
```

Lưu ý, một mảng của numpy sẽ chỉ lưu trữ duy nhất một kiểu dữ liệu, khác với danh sách thông thường của Python. Đây là một trong các lý do mà các tính toán trên mảng của numpy được thực hiện nhanh hơn rất nhiều.

Bạn hãy chú ý, như trong ví dụ trên, phép cộng (+) trên 2 mảng numpy cũng được thực hiện khác trên 2 danh sách thông thường. Phép cộng được thực hiện như sau: từng phần tử của A được cộng với phần tử có chỉ số tương ứng trong B. Các phép tính số học khác như -, * hay / cũng được thực hiện tương tự như vậy đối với mảng numpy.

Numpy là một gói công cụ mạnh mẽ, được viết bằng Python và C nên tốc độ thực thi tốt, được sử dụng rất nhiều trong các ứng dụng của Khoa học dữ liệu.
> NumPy thường được sử dụng cùng SciPy và Matplotlib để thay thế cho MatLab vô cùng đắt đỏ.
#### Các APIs
##### Array

Điểm ưu thế của NumPy so với Python thuần là có thể mô phỏng được mảng nhiều chiều
![](https://images.viblo.asia/b3c4457d-e37e-4c99-bafb-f48d112a5fcf.png)

Ảnh từ [DataCamp](https://www.datacamp.com/community/tutorials/python-numpy-tutorial)


**1.** **Import thư viện NumPy**
 
```
import numpy as np
```
 
**2.**  **Khởi tạo một Array**

-----


 
##### Dùng np.array()

-----


 
**a. Mảng một chiều**

- Bạn có thể liên hệ mảng một chiều với Vector
```
number_vector = np.array([1, 2, 3, 4])
```

```
Input:
    number_vectornumber_ .shape
    
Output:
    (4,)
```

**b. Mảng hai chiều**

-  Bạn có thể liên hệ mảng 2 chiều với ma trận hai chiều

```
number_matrix = np.array([[1, 2, 3], [4, 5, 6]])
```

```
Input:
    number_matrix
    
Output: 
    array([[1, 2, 3],
           [4, 5, 6]])
```


Ma trận có số hàng là 2 và số cột là 3

```
number_matrix.shape

Output: (2, 3)
```

**c. Mảng ba chiều**

* Bạn có thể liên hệ mảng 3 chiều với ma trận 3 chiều




```
Input:
    number_3D_matrixnumber_3  = np.array([
        [[1, 2, 3], [4, 5, 6]],
        [[1, 2, 3], [4, 5, 6]]
    ])
    number_3D_matrix.shape
    
Output:
    (2, 2, 3)
```

-----

##### Dùng zeros() - ones() - full()

-----

- Tạo ra mảng có các giá trị bằng nhau

    - zeros() tạo ra mảng các giá trị đều bằng 0
        - Đầu vào là shape của array dưới dạng tuple

    - ones() tạo ra mảng các giá trị đều bằng 1
        - Đầu vào là shape của array dưới dạng tuple

    - full() tạo ra mảng các giá trị bằng nhau và bằng một số cho trước
        - Đầu vào là shape của array dưới dạng tuple và giá trị cho trước
  
 


**a. Mảng một chiều**

**np.zeros()**
```
number_1D_zeros = np.zeros((7, ))

number_1D_zerosnumber_1

Output:
    array([0., 0., 0., 0., 0., 0., 0.])
```
**np.ones()**
```
number_1D_ones = np.ones((3, ))

number_1D_onesnumber_1D

Output:
    array([1., 1., 1.])
```
**np.full()**


```
number_1D_sevens = np.full((6, ), 7)

number_1D_sevens

Output:
    array([1., 1., 1.])

```
**np.full()**
```
number_1D_sevens = np.full((6, ), 7)

number_1D_sevens

Output:
    array([7, 7, 7, 7, 7, 7])
```

**b. Mảng hai chiều**

**np.zeros()**
```
number_2D_zeros = np.zeros((7, 7))

number_2D_zeros

Output:
    array([[0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0.]])
```

**np.ones()**
```
number_2D_ones = np.ones((6, 5))

number_2D_ones

Output:
    array([[1., 1., 1., 1., 1.],
           [1., 1., 1., 1., 1.],
           [1., 1., 1., 1., 1.],
           [1., 1., 1., 1., 1.],
           [1., 1., 1., 1., 1.],
           [1., 1., 1., 1., 1.]])
```
**np.full()**
```
number_2D_eights = np.full((8, 8), 8)

number_2D_eights

array([[8, 8, 8, 8, 8, 8, 8, 8],
       [8, 8, 8, 8, 8, 8, 8, 8],
       [8, 8, 8, 8, 8, 8, 8, 8],
       [8, 8, 8, 8, 8, 8, 8, 8],
       [8, 8, 8, 8, 8, 8, 8, 8],
       [8, 8, 8, 8, 8, 8, 8, 8],
       [8, 8, 8, 8, 8, 8, 8, 8],
       [8, 8, 8, 8, 8, 8, 8, 8]])
```

**c.Mảng ba chiều**

**np.zeros()**
```
number_3D_zeros = np.zeros((4, 2, 3))

number_3D_zeros

Output:
    array([[[0., 0., 0.],
            [0., 0., 0.]],

           [[0., 0., 0.],
            [0., 0., 0.]],

           [[0., 0., 0.],
            [0., 0., 0.]],

           [[0., 0., 0.],
            [0., 0., 0.]]])
```

**np.ones()**
```
number_3D_ones = np.ones((3, 3, 4))

number_3D_ones

Output:
    array([[[1., 1., 1., 1.],
            [1., 1., 1., 1.],
            [1., 1., 1., 1.]],

           [[1., 1., 1., 1.],
            [1., 1., 1., 1.],
            [1., 1., 1., 1.]],

           [[1., 1., 1., 1.],
            [1., 1., 1., 1.],
            [1., 1., 1., 1.]]])
```

**np.full()**
```
number_3D_twenties = np.full((3, 2, 7), 20)

number_3D_twenties

Output:
    array([[[20, 20, 20, 20, 20, 20, 20],
            [20, 20, 20, 20, 20, 20, 20]],

           [[20, 20, 20, 20, 20, 20, 20],
            [20, 20, 20, 20, 20, 20, 20]],

           [[20, 20, 20, 20, 20, 20, 20],
            [20, 20, 20, 20, 20, 20, 20]]])
```


-----
**Dùng np.eye()**

-----

- Tạo ra một ma trận đơn vị
```
np.eye((10))

Output:
    array([[1., 0., 0., 0., 0., 0., 0., 0., 0., 0.],
           [0., 1., 0., 0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 1., 0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 1., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 1., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 1., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 1., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0., 1., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0., 0., 1., 0.],
           [0., 0., 0., 0., 0., 0., 0., 0., 0., 1.]])
```
-----
**Dùng np.arange()**

-----

**a. Tạo 1 Array giá trị chạy từ 0 -> 10**
```
number_1D_range_10 = np.arange(10)

number_1D_range_10

Output:
    array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```
**b. Tạo 1 Array giá trị chạy từ 2 -> 20**
```
number_1D_range_20 = np.arange(2, 10)

number_1D_range_20

Output:
    array([2, 3, 4, 5, 6, 7, 8, 9])
```
**c. Tạo 1 Array giá trị chạy từ 0 -> 30. Khoảng cách giữa các giá trị là 2.**
```
number_1D_range_30 = np.arange(0, 30, 2)

number_1D_range_30

Output:
    array([ 0,  2,  4,  6,  8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28])
```

-----
**Dùng  np.random.random()**

-----
- Tạo ra ma trận với các giá trị ngẫu nhiên
```
np.random.random((10, 5))

Outpt:
    array([[0.2416562 , 0.07738853, 0.48258709, 0.2607063 , 0.80988611],
           [0.55631239, 0.51562934, 0.95095416, 0.59066717, 0.64751756],
           [0.42497374, 0.11966676, 0.82407811, 0.80352517, 0.12991066],
           [0.24715683, 0.29748386, 0.26677741, 0.02107929, 0.21032197],
           [0.18406292, 0.86952751, 0.63418968, 0.07755376, 0.50483528],
           [0.87096656, 0.04928014, 0.65223194, 0.63928117, 0.4443445 ],
           [0.19519642, 0.55467875, 0.57888658, 0.01509584, 0.50863294],
           [0.09283353, 0.54861298, 0.76249622, 0.70733076, 0.1887354 ],
           [0.82271984, 0.53933904, 0.20685336, 0.42698788, 0.37528835],
           [0.6270273 , 0.66702909, 0.69230398, 0.22863118, 0.63605925]])
```

Các bạn hãy thực hành để nắm vững kiến thức về Mảng NumPy - NumPy Array nhé!
> Còn nữa ...