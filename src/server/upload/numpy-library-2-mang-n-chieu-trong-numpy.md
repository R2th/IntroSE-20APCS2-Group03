## ndarray trong NumPy là gì?
Mảng trong Numpy là một bảng gồm các phần tử (thường sẽ là số), dữ liệu trong mảng cùng một loại, được lập chỉ mục (index) bằng một bộ số nguyên dương. Trong Numpy, số chiều của mảng được gọi là cấp/bậc của mảng( hay còn gọi là mảng 1 chiều, mảng 2 chiều,..). Một bộ số nguyên cho kích thước của mảng dọc theo mỗi kích thước được gọi là hình dạng của mảng. Một lớp mảng trong Numpy được gọi là ndarray. Các phần tử trong mảng Numpy được truy cập bằng cách sử dụng dấu ngoặc vuông và có thể được khởi tạo bằng cách sử dụng các list Python lồng nhau.
```
[[ 1, 2, 3],
  [ 4, 2, 5]]
Ở đây là một mảng cấp 2, hay còn gọi là mảng 2 chiều hay mảng 2 trục
Chiều thứ nhất cólength bằng 2, chiều thứ 2 có length bằng 3 
Hình dạng tổng thể của mảng có thể được kí hiệu là (2, 3)
```

```
import numpy as np
# Tạo mới một đối tượng mảng
arr = np.array( [[ 4, 2, 2],
                 [ 4, 3, 4]] )
 
# In ra loại của đối tượng mảng vừa được tạo
print("Array thuộc loại: ", type(arr))
 
# In ra số chiều (trục)
print("Số chiều: ", arr.ndim)
 
# In ra hình dạng của mảng 
print("Dạng của mảng: ", arr.shape)
 
# In ra tổng số phần tử
print("Tổng số phần tử: ", arr.size)
 
# In ra loại dữ liệu của phần tử trong mảng
print("Array chứa các phần tử kiểu: ", arr.dtype)
```

**OUTPUT:**
```
Array thuộc loại:  <class 'numpy.ndarray'>
Số chiều:  2
Dạng của mảng:  (2, 3)
Tổng số phần tử:  6
Array chứa các phần tử kiểu:  int32
```

##  Tạo mảng
Có nhiều cách khác nhau để tạo mảng trong NumPy:

Ví dụ: 
* Chúng ta có thể tạo một mảng từ Python list thông thường hoặc tuple sử dụng array function. Kiểu dữ liệu của mảng kết quả được suy ra từ kiểu của các phần tử trong chuỗi.
* Thông thường, các phần tử của một mảng ban đầu không xác định, nhưng kích thước của thì được xác định. Do đó, NumPy cung cấp một số chức năng để tạo mảng với các phần tử mặc định ban đầu, hay còn biết đến như các phần tử để "tạm giữ chỗ"
* Ví dụ: np.zeros, np.ones, np.full, np.empty, v.v.
* Để tạo các chuỗi số, NumPy cung cấp một hàm tương tự với phạm vi trả về mảng thay vì danh sách.
* Định hình lại mảng: Chúng ta có thể sử dụng phương pháp định hình lại để định hình lại một mảng. Hãy xem xét một mảng có hình dạng (a1, a2, a3, ..., aN). Chúng ta có thể định hình lại và chuyển đổi nó thành một mảng khác với hình dạng (b1, b2, b3, ..., bM). Điều kiện bắt buộc duy nhất là: a1 x a2 x a3 x ... x aN = b1 x b2 x b3 x ... x bM. (nói cách khác là kích thước ban đầu của mảng vẫn không thay đổi.)
* Làm phẳng mảng: Chúng ta có thể sử dụng flatten method để có được một bản sao của mảng được thu gọn thành một chiều, hay nói cách khác là biến mảng hiện có thành mảng một chiều
import numpy as np
 
```
# Tạo một mảng từ list với kiểu float
a = np.array([[1, 2, 4], [5, 8, 7]], dtype = 'float')
print ("Mảng với các phần tử kiểu float được tạo sử dụng list:\n", a)
 
# Tạo mảng từ tuple
b = np.array((1 , 3, 2))
print ("\nMảng được tạo sử dụng tuple:\n", b)
 
# Tạp mảng 3x4 với tất cả các phần tử đều bằng không
c = np.zeros((3, 4))
print ("\nMảng được khởi tạo với tất cả các phần tử đều bằng không:\n", c)
 
# Tạo một mảng giá trị không đổi của loại số phức
d = np.full((3, 3), 6, dtype = 'complex')
print ("\nMảng được tạo với các phần tử số phức.\n", d)
```

**OUTPUT:**
```
Mảng với các phần tử kiểu float được tạo sử dụng list:
 [[1. 2. 4.]
 [5. 8. 7.]]

Mảng được tạo sử dụng tuple:
 [1 3 2]

Mảng được khởi tạo với tất cả các phần tử đều bằng không:
 [[0. 0. 0. 0.]
 [0. 0. 0. 0.]
 [0. 0. 0. 0.]]

Mảng được tạo với các phần tử số phức.
 [[6.+0.j 6.+0.j 6.+0.j]
 [6.+0.j 6.+0.j 6.+0.j]
 [6.+0.j 6.+0.j 6.+0.j]]
```

## Array Indexing
Việc biết các khái niệm cơ bản về lập chỉ mục (index) mảng rất quan trọng để phân tích và thao tác đối tượng mảng. NumPy cung cấp nhiều cách để lập chỉ mục (index)  mảng.

* Slicing: Giống như danh sách trong python, mảng NumPy có thể được cắt. Vì các mảng có thể là đa chiều, bạn cần chỉ định một lát cho mỗi chiều của mảng.
* Integer array indexing: Lập chỉ mục mảng số nguyên: Trong phương pháp này, các danh sách được truyền để lập chỉ mục cho từng chiều. Ánh xạ một đến một của các phần tử tương ứng được thực hiện để xây dựng một mảng tùy ý mới.
* Boolean array indexing:  Phương pháp này được sử dụng khi chúng ta muốn chọn các phần tử từ mảng thỏa mãn một số điều kiện.

```
import numpy as np
 
# Mảng ban đầu
arr = np.array([[-1, 2, 0, 4],
                [4, -0.5, 6, 0],
                [2.6, 0, 7, 8],
                [3, -7, 4, 2.0]])
 
# Cắt mảng
temp = arr[:3, ::2]
print ("Mảng với 3 hàng đầu và cột xen kẽ (cột số 0 và số 2):\n", temp)
 
# Dùng chỉ mục với mảng số nguyên
temp = arr[[0, 1, 2, 3], [3, 2, 1, 0]]
print ("\nElements at indices (0, 3), (1, 2), (2, 1), (3, 0):\n", temp)
 
# Mảng sử dụng các điều kiện để lấy phần tử
cond = arr > 0
temp = arr[cond]
print ("\nCác phần tử lớn hơn không là:\n", temp)
```

**OUTPUT:**
```
Mảng với 3 hàng đầu và cột xen kẽ (cột số 0 và số 2):
 [[-1.   0. ]
 [ 4.   6. ]
 [ 2.6  7. ]]

Elements at indices (0, 3), (1, 2), (2, 1), (3, 0):
 [4. 6. 0. 3.]

Các phần tử lớn hơn không là:
 [2.  4.  4.  6.  2.6 7.  8.  3.  4.  2. ]
```
Còn nữa...

- Link tham khảo [Trang chủ Thư viên NumPy](https://www.numpy.org/)