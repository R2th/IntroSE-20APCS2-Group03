Trong bài viết trước tôi đã giới thiệu cho bạn về NumPy, lợi ích của nó, cách cài đặt nó để sử dụng, tìm hiểu về Mảng trong NumPy, kiểu dữ liệu trong NumPy. Trong bài viết này chúng ta sẽ tiếp tục tìm hiểu về các kiểu dữ liệu khác trong NumPy

## Tạo mảng

Để tạo một mảng NumPy, bạn có thể sử dụng hàm np.array () . Để tạo mảng bạn cần chuyền một danh sách cho nó.

```
#Load Library
import numpy as np

#create an array
a = np.array([1, 2, 3])
```

Bên cạnh việc tạo mảng từ một chuỗi các phần tử, bạn có thể dễ dàng tạo mảng bằng cách sử dụng các hàm khác. Các chức năng được thảo luận như sau:
`numpy.zeros`: Bạn có thể dễ dàng tạo một mảng chứa các số 0 bằng cách sử dụng numpy.zeros vì nó trả về một mảng mới có kích thước được chỉ định, chứa đầy các số không.

**`np.zeros (2) `**

output sẽ là: `[0., 0.]`

Chú ý: Đừng nhầm lẫn với np.zeros và numpy.zeros . Vì tôi đã nhập thư viện NumPy dưới dạng: nhập numpy dưới dạng np , đó là lý do tôi sử dụng np.zeros .

**`numpy.ones`**: trả về một mảng mới có kích thước và kiểu được chỉ định, chứa đầy các mảng.

`np.ones (5)`
ouput: `[ 1.  1.  1.  1.  1.]`

**`numpy.empty`**: Hàm trống tạo một mảng có nội dung ban đầu là ngẫu nhiên và phụ thuộc vào trạng thái của bộ nhớ.

`# Create an empty array with 2 elements
np.empty(2)`

Output: `[ 5.26288483e+064 -1.80841072e-141]`

**Chú ý**: Các phần tử trong một mảng hiển thị các giá trị ngẫu nhiên vì chúng không được khởi tạo.

Kiểu dữ liệu mặc định là floating point (float64), bạn có thể chỉ định rõ ràng kiểu dữ liệu nào bạn muốn bằng cách sử dụng dtype như tôi giới thiệu ở bài trước 

`a = np.empty([3,2], dtype = int)`

output hiển thị mảng 3 x 2: 
```
    [[ 873918640      32764]
     [ 873923184      32764]
     [1851858988 1752375396]]
 ```
 
 **`numpy.arange`**: Bạn có thể tạo một mảng với một loạt các phần tử.
 Ex: input `arange (4)`
 
 output: `[0, 1, 2, 3]`
 
 Hoặc thậm chí là một mảng có chứa một loạt các khoảng cách đều nhau. Để làm điều này, bạn sẽ chỉ định số đầu tiên , số cuối cùng và kích thước step .
 
 Input: `np.arange(2,9,2)`
 
 Output: `[2, 4, 6, 8]`
 
 **`numpy.linspace`**: Hàm này tương tự như hàm arange (). Trong hàm này, thay vì kích thước step, số lượng các giá trị cách đều giữa khoảng được chỉ định.
 Input: `linspace (10,20,5)`
 Output: `[10.  12.5 15.  17.5 20. ]`
 
 ## Sửa đổi mảng
 
 Giả sử ta có Array như sau: `arr = np.array ([1, 2, 3, 4, 5, 6, 7, 8])`
 
 Ta có thể thêm các phần tử vào mảng của mình bất kỳ lúc nào với `np.append ()` . Đảm bảo chỉ định mảng và các phần tử bạn muốn đưa vào.
 
 Input: `np.append (arr, [1,2])`
 
 Ouput: `([1, 2, 3, 4, 5, 6, 7, 8, 1, 2])`
 
 ## Xóa trong mảng
 
 Ta có thể xóa một phần tử bằng `np.delete ()` . Nếu bạn muốn xóa phần tử ở vị trí 1 trong mảng của mình, bạn có thể chạy:
 
 Input: `np.delete (arr, 1)`
 
 Output: `([1, 3, 4, 5, 6, 7, 8])`
 
 Chú ý: Chỉ số của một mảng bắt đầu bằng 0, vì vậy vị trí phần tử 1 là thực tế là thứ 2.
 
 ## Định hình lại mảng (Reshaping Array)
 
 Sử dụng `np.reshape ()` sẽ cung cấp một hình dạng mới cho một mảng mà không làm thay đổi dữ liệu. Chỉ cần nhớ rằng khi bạn sử dụng hàm reshape, mảng bạn muốn tạo ra cần có cùng số phần tử với mảng ban đầu. Nếu bạn bắt đầu với một mảng có 12 phần tử, bạn sẽ cần đảm bảo rằng mảng mới của bạn cũng có tổng số 12 phần tử.
 
 Trước khi chuyển sang phương pháp định hình lại, điều quan trọng là phải biết hình dạng và kích thước mảng của bạn. Để có được điều này, NumPy cung cấp cho chúng ta một số chức năng:
 
 `ndarray.ndim` sẽ cho bạn biết số lượng trục hoặc kích thước của mảng.
 
 `ndarray.size` sẽ cho bạn biết tổng số phần tử của mảng. Đây là sản phẩm của các phần tử của hình dạng của mảng.
 
 `ndarray.shape` sẽ hiển thị một bộ số nguyên cho biết số lượng phần tử được lưu trữ dọc theo mỗi chiều của mảng. Ví dụ: nếu bạn có một mảng 2D với 2 hàng và 3 cột, hình dạng của mảng của bạn là (2,3).
 
 Giả sử, chúng ta bắt đầu với mảng này:
 
 ```
 arr = np.array ([[1,2,3], [4,5,6]]) 
print (arr)
```

sau đó ta tìm kích thước mảng: `print (arr.ndim)`. output: `2`

`print (arr.size)`. Output: `6`

hình dạng của mảng: `print (arr.shape)` Output: `(2, 3)`

## Sắp xếp mảng

Việc sắp xếp một phần tử rất đơn giản với np.sort () . Bạn có thể chỉ định trục, loại và thứ tự khi bạn gọi hàm.

Ta bắt đầu với mảng này: `arr = np.array ([2, 1, 5, 3, 7, 4, 6, 8])`

Bạn có thể nhanh chóng sắp xếp các số theo thứ tự tăng dần với: `print (np.sort (arr))`

Output: `[1, 2, 3, 4, 5, 6, 7, 8]`

## Lập chỉ mục mảng / Cắt lát(Array Indexing / Slicing)

Bạn có thể lập chỉ mục và cắt các mảng NumPy theo cách giống như cách bạn có thể cắt các danh sách Python.

```
data = np.array ([1,2,3]) 
print (data [0]) 
print (data [1]) 
print (data [0: 2]) 
print (data [1:]) 
print (data [- 2:])
```

Output: 
```
1 
2 
[1 2] 
[2 3]
```

Chúng ta hãy thử và làm tương tự với mảng đa chiều :

```
a = np.array ([[1,2,3], [3,4,5], [4,5,6]]) 
print (a)
```

// Slice items starting from index
`print a[:]`

Output: 
```
[[3 4 5]
 [4 5 6]]
 ```
 
 **Lưu ý**:  Đừng nhầm lẫn ở đây, chúng ta đã cắt nó từ chỉ mục 1 trở đi, trong ngắn hạn chỉ mục 0 sẽ bị xóa khỏi đầu.
 
 Nếu bạn muốn chọn các giá trị từ mảng của mình đáp ứng các điều kiện nhất định, nó rất đơn giản với NumPy.
 
 Ví dụ: Ta có mảng này: `a = np.array ([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])`
 
 Bạn có thể dễ dàng in tất cả các giá trị trong mảng nhỏ hơn 5.
 
 `print (a [a <5])` Ouput: `[1 2 3 4]`
 
 bạn cũng có thể chọn các số bằng hoặc lớn hơn 5 và sử dụng điều kiện đó để lập chỉ mục một mảng.
 
 ```
 five_up = (a> = 5) 
print (a [five_up])
```

Ouput: `[5 6 7 8 9 10 11 12]`

Hoặc bạn có thể chọn các phần tử thỏa mãn hai điều kiện bằng cách sử dụng dấu & và | toán tử:

Input: ```
c = a [(a> 2) & (a <11)] 
print (c)
```

Output: `[3 4 5 6 7 8 9 10]`

Bạn cũng có thể sử dụng các toán tử logic & và | để trả về các giá trị boolean chỉ định các giá trị trong một mảng có đáp ứng một điều kiện nhất định hay không. Điều này có thể hữu ích với các mảng có chứa tên hoặc các giá trị phân loại khác.

Input: 
```
five_up = (a > 5) | (a == 5)
print(five_up)
```

Output:

```python
[[False False False False]
 [ True  True  True  True]
 [ True  True  True  True]]
 ```
 
Bạn cũng có thể sử dụng `np.where ()` để chọn các phần tử hoặc chỉ số từ một mảng.

Ta có mảng

`a = np.array ([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])`

Bạn có thể sử dụng np.where () để in các chỉ số của các phần tử, ví dụ: nhỏ hơn 5:

Input: 

```
b = np.where (a <5) 
print (b)
```

Output: `(Array ([0, 0, 0, 0]), Array ([0, 1, 2, 3]))`

## Xếp chồng mảng

### Joining Array

Joining có nghĩa là đưa nội dung của hai hoặc nhiều mảng vào một mảng duy nhất. Chúng ta truyền một chuỗi các mảng mà chúng ta muốn nối vào `concatenate()`, cùng với trục. Nếu trục không được thông qua một cách rõ ràng, nó được coi là 0.

```
arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])
arr = np.concatenate((arr1, arr2))
print(arr)
```

Output: `[1 2 3 4 5 6]`

với mảng 2D:

```
arr1 = np.array ([[1, 2], [3, 4]]) 
arr2 = np.array ([[5, 6], [7, 8]]) 
arr = np.concatenate ((arr1, arr2 ), axis = 1) 
print (arr)
```

Output: 

```
[[1 2 5 6] 
[3 4 7 8]]
```

### Nối các mảng bằng các hàm ngăn xếp(Joining Arrays Using Stack Functions)

Xếp chồng cũng giống như nối, khác biệt duy nhất là xếp chồng được thực hiện dọc theo một trục mới. Chúng ta có thể nối hai mảng 1-D dọc theo trục thứ hai, điều này sẽ dẫn đến việc đặt chúng chồng lên nhau, tức là. xếp chồng.

```
arr1 = np.array ([1, 2, 3]) 
arr2 = np.array ([4, 5, 6]) 
arr = np.stack ((arr1, arr2), axis = 1) 
print (arr)
```

Output: 

```
[[1 4] 
[2 5] 
[3 6]]
```

### Xếp chồng lên hàng

NumPy cung cấp một chức năng trợ giúp: hstack()xếp chồng dọc theo hàng.

```
arr1 = np.array ([1, 2, 3]) 
arr2 = np.array ([4, 5, 6]) 
arr = np.hstack ((arr1, arr2)) #h đề cập đến hàng ngang tức là hàng 
in (arr )
```

Output: `[1 2 3 4 5 6]`

### Xếp chồng dọc theo cột

NumPy cung cấp một chức năng trợ giúp: `vstack()` xếp chồng dọc theo các cột.

```
arr1 = np.array ([1, 2, 3]) 
arr2 = np.array ([4, 5, 6]) 
arr = np.vstack ((arr1, arr2)) 
print (arr)
```

Output:

```
[[1 2 3] 
[4 5 6]]
```

### Tách mảng

Chia tách là hoạt động ngược lại của Gia nhập.
Tham gia hợp nhất nhiều mảng thành một và Chia tách sẽ chia một mảng thành nhiều mảng.
Chúng tôi sử dụng `array_split()` để tách mảng, chúng tôi chuyển cho nó mảng mà chúng tôi muốn tách và số lần tách.

```
arr = np.array ([1, 2, 3, 4, 5, 6]) 
newarr = np.array_split (arr, 3) 
print (newarr)
```

Output: `[array([1, 2]), array([3, 4]), array([5, 6])]`

#### Chia thành các mảng

Giá trị trả về của `array_split()` phương thức là một mảng chứa mỗi phần tách dưới dạng một mảng.
Nếu bạn chia một mảng thành 3 mảng, bạn có thể truy cập chúng từ kết quả giống như bất kỳ phần tử mảng nào:

```
arr = np.array ([1, 2, 3, 4, 5, 6]) 
newarr = np.array_split (arr, 3) 

print (newarr [0]) 
print (newarr [1]) 
print (newarr [2] )
```

Output:

```
[1 2] 
[3 4] 
[5 6]
```

#### Tách mảng 2-D

Sử dụng cú pháp tương tự khi tách mảng 2-D.
Sử dụng `array_split()` phương thức, truyền vào mảng bạn muốn tách và số lần tách bạn muốn thực hiện.
Ví dụ: Chia mảng 2-D thành ba mảng 2-D:

```
arr = np.array ([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]]) 
newarr = np.array_split ( arr, 3) 
in (newarr)
```

OUtput

```
[array([[1, 2],
 [3, 4]]), array([[5, 6],
 [7, 8]]), array([[ 9, 10],
 [11, 12]])]
 ```
 
 Bạn có thể chia một mảng thành nhiều mảng nhỏ hơn bằng cách sử dụng function `hsplit`. Bạn có thể chỉ định số lượng các mảng có hình dạng bằng nhau để trả về hoặc các cột mà sau đó phép chia sẽ xảy ra.
 
 Ví dụ ta có mảng này:
 
 ```
 arr = np.array ([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 
     [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]])
 ```
 
 Nếu bạn muốn chia mảng này thành ba mảng có hình dạng bằng nhau, ta sẽ chạy: 
 
 Input: `np.hsplit (arr, 3)`
 
 Output: 
 
 ```
 [array([[ 1,  2,  3,  4],
      [13, 14, 15, 16]]), array([[ 5,  6,  7,  8],
      [17, 18, 19, 20]]), array([[ 9, 10, 11, 12],
      [21, 22, 23, 24]])]
 ```
 
 ### Array Operations
 
 Các thao tác cơ bản đơn giản với NumPy. Nếu bạn muốn tìm tổng của các phần tử trong một mảng, bạn sẽ sử dụng sum (). Điều này hoạt động đối với mảng 1D, mảng 2D và mảng ở kích thước cao hơn.
 
 ```
 a = np.array ([1, 2, 3, 4])
# Add all of the elements in the array
print (a.sum())
```

Output: `10`

Với Array 3x4:

```
a = np.array ([[1,2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) 
print (a.sum ())
```

Output: `78`

Tương tự, các phép toán số học khác như cộng (), trừ (), nhân () và chia () cũng dễ sử dụng:

```
a = np.array ([1, 2, 3]) 
print (a) 
 
b = np.array ([10,10,10]) 
print (b) 

print (np.add (a, b)) 
print (np .subtract (a, b)) 
print (np.multiply (a, b)) 
print (np.divide (a, b))
```

Lưu ý - Các mảng đầu vào để thực hiện các phép toán số học như cộng (), trừ (), nhân () và chia () phải có cùng hình dạng hoặc phải tuân theo quy tắc phát mảng.

### Phát sóng mảng(Array Broadcasting)

Thuật ngữ phát sóng hay  đề cập đến khả năng của NumPy để xử lý các mảng có hình dạng khác nhau trong các phép toán số học. Các phép toán số học trên mảng thường được thực hiện trên các phần tử tương ứng. Nếu hai mảng có hình dạng hoàn toàn giống nhau thì các thao tác này được thực hiện trơn tru.

```
a = np.array ([1,2,3,4]) 
b = np.array ([10,20,30,40]) 
c = a * b 
print (c)
```

Output: `[ 10  40  90 160]`

Nếu kích thước của hai mảng không giống nhau (tức là không giống nhau), thì không thể thực hiện các thao tác giữa phần tử với phần tử. Tuy nhiên, các thao tác trên các mảng có hình dạng không giống nhau vẫn có thể thực hiện được trong NumPy, vì khả năng phát sóng. Mảng nhỏ hơn được `phát` tới kích thước của mảng lớn hơn để chúng có hình dạng tương thích.

Ex:

```
a = np.array ([[0,0,0.0,0.0], [10.0,10.0,10.0], [20.0,20.0,20.0], [30.0,30.0,30.0]]) 
b = np.array ([1.0,2.0 , 3.0]) 
print (a) 
print (b) 
print (a + b)
```

Hình sau minh họa cách mảng b được phát sóng để tương thích với a .

![image](https://user-images.githubusercontent.com/51064915/104994435-05bf2680-5a57-11eb-9ac0-7285c0198668.png)

Output:

```
[[ 0.  0.  0.]
 [10. 10. 10.]
 [20. 20. 20.]
 [30. 30. 30.]]
[1. 2. 3.]
[[ 1.  2.  3.]
 [11. 12. 13.]
 [21. 22. 23.]
 [31. 32. 33.]]
 ```
 
 ### Lặp lại các mảng
 
 Lặp lại có nghĩa là đi qua từng phần tử một.
 
Khi chúng ta xử lý mảng nhiều chiều trong numpy, chúng ta có thể thực hiện việc này bằng cách sử dụng vòng for lặp cơ bản của python.

Nếu chúng ta lặp lại trên một mảng 1-D, nó sẽ đi qua từng phần tử một.

```
arr = np.array ([1, 2, 3]) 

cho x trong arr: 
  print (x)
```

Output:

```
1
2
3
```

#### Lặp lại Mảng 2-D

Trong mảng 2-D, nó sẽ đi qua tất cả các hàng.

```
arr = np.array ([[1, 2, 3], [4, 5, 6]]) 

cho x trong arr: 
  print (x)
```

Output: 

```
[1 2 3]
[4 5 6]
```


## Tham khảo:

[Numpy Tutorial](https://www.tutorialspoint.com/numpy/numpy_ndarray_object.htm)
[Numpy.org](https://numpy.org/learn/)
[Numpy Medium](https://medium.com/insights-school/learn-python-numpy-with-examples-1b0dc887187a)