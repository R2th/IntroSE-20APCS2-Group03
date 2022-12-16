![](https://images.viblo.asia/28e78487-0745-40d8-8f84-9b8115354508.png)

# Python Numpy là gì?
NumPy là một gói Python là viết tắt của Numerical Python. Đây là thư viện cốt lõi cho scientific computing, nó chứa một đối tượng mảng n chiều mạnh mẽ, cung cấp các công cụ để tích hợp C, C ++, v.v. Nó cũng hữu ích trong đại số tuyến tính, random number capability, ... . NumPy Array cũng có thể được sử dụng như multi-dimensional container hiệu quả cho dữ liệu chung. Bây giờ, hãy xem chính xác một numpy array là gì nha.

##  NumPy Array

Numpy array là một đối tượng mảng N chiều mạnh mẽ ở dạng hàng và cột. Chúng ta có thể khởi tạo các numpy arrays từ nested Python lists và truy cập các phần tử của nó. Để thực hiện thao tác này, câu hỏi tiếp theo xuất hiện trong đầu bạn là:

### Numpy cài đặt như thế nào?

Để cài đặt Python NumPy, đi tới command của bạn và nhập vào `pip install numpy`. Sau khi cài đặt hoàn tất, hãy truy cập IDE của bạn (Ví dụ: PyCharm) và chỉ cần import nó bằng cách nhập: `import numpy as np`.

### Multi-dimensional numPy array là gì?

![](https://images.viblo.asia/e178bef2-888c-4c5d-a940-6c4ffe6643f8.png)

Ở đây, tôi có các yếu tố khác nhau được lưu trữ trong các vị trí bộ nhớ tương ứng của chúng. Nó được gọi là hai chiều vì nó có hàng cũng như cột. Trong hình trên, chúng tôi có 3 cột và 4 hàng có sẵn. 

Hãy xem nó được triển khai trong Pycharm như thế nào:

**Single-dimensional Numpy Array:**

```
import numpy as np
a=np.array([1,2,3])
print(a)
```
Output: 
```
[1 2 3]
```

**Multi-dimensional Array:**
```
a=np.array([(1,2,3),(4,5,6)])
print(a)
```
Output:
```
[[1 2 3]
 [4 5 6]]
```
### Python NumPy Array v/s List

Chúng tôi sử dụng numpy array thay vì một list vì ba lý do dưới đây:
1. Bộ nhớ ít hơn
2. Nhanh
3. Tiện lợi

Tôi sẽ chứng minh từng điểm một trên thực tế trong PyCharm. Hãy xem xét ví dụ dưới đây:
```
import numpy as np

import time
import sys

S = range(1000)
print(sys.getsizeof(5) * len(S))

D = np.arange(1000)
print(D.size * D.itemsize)
```
Output:
```
24000
8000
```
Đầu ra ở trên cho thấy rằng bộ nhớ được phân bổ theo list (ký hiệu là S) là 24000 trong khi bộ nhớ được phân bổ bởi numpy array chỉ là 4000. Từ đó, bạn có thể kết luận rằng có một sự khác biệt lớn giữa hai và điều này tạo ra numpy array là sự lựa chọn ưu tiên hơn so với list. 

Tiếp theo, hãy nói về cách thức numpy array của python nhanh hơn và thuận tiện hơn khi so sánh với list.
```
import time
import sys
 
SIZE = 1000000
 
L1= range(SIZE)
L2= range(SIZE)
A1= np.arange(SIZE)
A2=np.arange(SIZE)
 
start= time.time()
result=[(x,y) for x,y in zip(L1,L2)]
print((time.time()-start)*1000)
 
start=time.time()
result= A1+A2
print((time.time()-start)*1000)
```
Output:
```
256.494998932
28.0041694641
```
Trong đoạn code trên, chúng tôi đã xác định hai lists  và numpy arrays. Sau đó, chúng tôi đã so sánh thời gian thực hiện để tìm tổng của list và tổng của numpy array. Nếu bạn thấy đầu ra của chương trình trên, có hai thay đổi đáng kể trong hai giá trị. List mất 256ms trong khi  numpy array mất 28ms. Do đó, numpy array nhanh hơn list. Bây giờ, nếu bạn nhận thấy chúng tôi đã chạy một vòng lặp ‘for cho một list trả về sự kết hợp của cả hai lists trong khi đối với các numpy arrays, chúng tôi vừa thêm hai array bằng cách A1 + A2. Đó là lý do tại sao làm việc với numpy dễ dàng và thuận tiện hơn nhiều khi so sánh với list. 

Do đó, các ví dụ trên chứng minh lý do tại sao bạn nên chọn numpy array chứ không phải là một list!

### Python NumPy Operations
**1. ndim:** Số chiều của mảng.

![](https://images.viblo.asia/dcd78f65-8a83-41e1-aff9-0554dfd396fd.jpg)
```
import numpy as np
a = np.array([(1,2,3),(4,5,6)])
print(a.ndim)
```
Output:
```
2
```
Vì đầu ra là 2, nó là một mảng hai chiều (đa chiều).

**2. itemsize:** Độ dài của một phần tử mảng tính bằng byte.

![](https://images.viblo.asia/7b868356-bdd2-4f9c-9ac7-2a35a0834279.png)
```
import numpy as np
a = np.array([(1,2,3)])
print(a.itemsize)
```
Output:
```
8
```
**3. dtype:** data type của phần tử

![](https://images.viblo.asia/27169974-b04b-49c0-9d2c-0ed7caf9ec24.jpg)
```
import numpy as np
a = np.array([(1,2,3)])
print(a.dtype)
```
Output:
```
int64
```
**4. Size, shape:**
Tương tự, bạn có thể tìm thấy kích thước và hình dạng của mảng bằng cách sử dụng hàm `size` và `shape` tương ứng.
```
import numpy as np
a = np.array([(1,2,3,4,5,6)])
print(a.size)
print(a.shape)
```
Output:
```
6
(1, 6)
```
**5. reshape:** Cung cấp một hình dạng mới cho một mảng mà không thay đổi dữ liệu của nó.
![](https://images.viblo.asia/3a33cdc5-4fef-4d7c-900a-f9c39f700f29.jpg)
```
import numpy as np
a = np.array([(8,9,10),(11,12,13)])
print(a)
a=a.reshape(3,2)
print(a)
```
Output:
```
[[ 8  9 10]
 [11 12 13]]
[[ 8  9]
 [10 11]
 [12 13]]
```
**6. slicing:** trích xuất tập hợp các phần tử cụ thể từ một mảng.

![](https://images.viblo.asia/5dccad9d-0526-411d-b254-0bf1814c4eb9.jpg)
Trước khi đi vào ví dụ trên, hãy để một cái nhìn đơn giản. Chúng ta có một mảng và chúng ta cần một phần tử cụ thể (giả sử 3) trong một mảng nhất định. Hãy xem xét ví dụ dưới đây:
```
import numpy as np
a=np.array([(1,2,3,4),(3,4,5,6)])
print(a[0,2])
```
Output:

```
3
```

Ở đây, mảng (1,2,3,4) là chỉ số 0 của bạn và (3,4,5,6) là chỉ số 1 của numpy array. Do đó, chúng tôi đã in phần tử thứ hai từ chỉ mục 0. 
Tiến lên một bước, hãy để nói rằng chúng ta cần phần tử thứ 2 từ chỉ số 0 và chỉ mục đầu tiên của mảng. Hãy để xem cách bạn có thể thực hiện thao tác này:
```
import numpy as np
a=np.array([(1,2,3,4),(3,4,5,6)])
print(a[0:,2])
```
Output:
```
[3 5]
```
Ở đây dấu hai chấm đại diện cho tất cả các hàng, bao gồm 0. Bây giờ để có được phần tử thứ 2, chúng tôi sẽ gọi chỉ số 2 từ cả hai hàng cung cấp cho chúng tôi giá trị 3 và 5 tương ứng. 

Tiếp theo, chỉ để loại bỏ sự nhầm lẫn,  chúng tôi có thêm một hàng và chúng tôi không muốn nhận phần tử thứ 2 của nó như hình ảnh trên. Chúng ta có thể làm gì trong trường hợp như vậy? 
Hãy xem xét mã dưới đây:
```
import numpy as np
a=np.array([(8,9),(10,11),(12,13)])
print(a[0:2,1])
```
Output:
```
[9 11]
```
Như bạn có thể thấy trong đoạn mã trên, chỉ có 9 và 11 được in. Bây giờ khi tôi đã viết 0: 2, điều này không bao gồm chỉ mục thứ hai của hàng thứ ba của một mảng. Do đó, chỉ 9 và 11 được in ra.

**7. linspace:** Trả về các số cách đều nhau trong một khoảng thời gian xác định.
```
import numpy as np
a=np.linspace(1,3,10)
print(a)
```
Output:
```
[1.         1.22222222 1.44444444 1.66666667 1.88888889 2.11111111
 2.33333333 2.55555556 2.77777778 3.        ]
```
Như bạn có thể thấy trong kết quả, nó đã in 10 giá trị từ 1 đến 3 cách đều nhau.

**8. max/ min:**  tìm mức tối thiểu, tối đa cũng như tổng của numpy array.
```
import numpy as np
 
a= np.array([1,2,3])
print(a.min())
print(a.max())
print(a.sum())
```
Output:
```
1 3 6
```
Bạn phải tìm hiểu những thứ này khá cơ bản này, với sự giúp đỡ của kiến thức này, bạn cũng có thể thực hiện nhiều nhiệm vụ lớn hơn. Bây giờ, hãy hiểu khái niệm trục (axis) trong python numpy.
![](https://images.viblo.asia/2096d850-f373-4bad-a33d-17553bb05223.png)
Như bạn có thể thấy trong hình, chúng ta có một mảng 2 * 3 gọn gàng. Ở đây các hàng được gọi là trục 1 và các cột được gọi là trục 0. Bây giờ bạn phải tự hỏi việc sử dụng các trục này là gì? 

Giả sử bạn muốn tính tổng của tất cả các cột, thì bạn có thể sử dụng trục. Hãy để tôi chỉ cho bạn thực tế, cách bạn có thể triển khai trục trong PyCharm của mình:
```
import numpy as np
a= np.array([(1,2,3),(3,4,5)])
print(a.sum(axis=0))
```
Output:
```
[4 6 8]
```
Do đó, tổng của tất cả các cột được thêm vào trong đó 1 + 3 = 4, 2 + 4 = 6 và 3 + 5 = 8. Tương tự, nếu bạn thay thế trục bằng 1, thì nó sẽ in [6 12] trong đó tất cả các hàng được thêm vào.

**9. Square Root & Standard Deviation:**  
Có nhiều hàm toán học khác nhau có thể được thực hiện bằng cách sử dụng python numpy. Bạn có thể tìm thấy căn bậc hai, độ lệch chuẩn của mảng.
```
import numpy as np
a=np.array([(1,2,3),(3,4,5,)])
print(np.sqrt(a))
print(np.std(a))
```
Output:
```
[[1.         1.41421356 1.73205081]
 [1.73205081 2.         2.23606798]]
1.2909944487358056
```
Như bạn có thể thấy đầu ra ở trên, căn bậc hai của tất cả các yếu tố được in. Ngoài ra, độ lệch chuẩn được in cho mảng trên, tức là mỗi phần tử thay đổi bao nhiêu so với giá trị trung bình của numpy array.

**10.Addition Operation:** 

Bạn có thể thực hiện nhiều thao tác hơn trên numpy array, tức là phép trừ, phép nhân và phép chia của hai ma trận. Hãy để tôi đi trước trong hướng dẫn numpy python, và hiển thị nó :
```
import numpy as np
x= np.array([(1,2,3),(3,4,5)])
y= np.array([(1,2,3),(3,4,5)])
print(x+y)
```
Output:
```
[[ 2  4  6]
 [ 6  8 10]]
```
Điều này cực kỳ đơn giản! Đúng? Tương tự, chúng ta có thể thực hiện các hoạt động khác như trừ, nhân và chia. Hãy xem xét ví dụ dưới đây:
```
import numpy as np
x= np.array([(1,2,3),(3,4,5)])
y= np.array([(1,2,3),(3,4,5)])
print(x-y)
print(x*y)
print(x/y)
```
Output:
```
[[0 0 0]
 [0 0 0]]
[[ 1  4  9]
 [ 9 16 25]]
[[1 1 1]
 [1 1 1]]
```
**11. Vertical & Horizontal Stacking:** 

Tiếp theo, nếu bạn muốn nối hai mảng và không chỉ thêm chúng, bạn có thể thực hiện nó bằng hai cách - xếp chồng dọc và xếp chồng ngang.
```
import numpy as np
x= np.array([(1,2,3),(3,4,5)])
y= np.array([(1,2,3),(3,4,5)])
print(np.vstack((x,y)))
print(np.hstack((x,y)))
```
Output:
```
[[1 2 3]
 [3 4 5]
 [1 2 3]
 [3 4 5]]
[[1 2 3 1 2 3]
 [3 4 5 3 4 5]]
```
**12. ravel:** 

Có một hoạt động nữa trong đó bạn có thể chuyển đổi một numpy array thành một cột duy nhất.
```
import numpy as np
x= np.array([(1,2,3),(3,4,5)])
print(x.ravel())
```
Output:
```
[1 2 3 3 4 5]
```

Hi vọng với những chia sẻ trên có thể giúp ích cho bạn. Cảm ơn các bạn đã đọc bài viết :smiley:
# Tham khảo
https://www.edureka.co/blog/python-numpy-tutorial/