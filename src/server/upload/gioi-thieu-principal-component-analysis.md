### Mở đầu.
> Đây là thuật toán sinh ra để giải quyết vấn đề dữ liệu có quá nhiều chiều dữ liệu, cần giảm bớt chiều dữ liệu nhằm tăng tốc độ xử lí, nhưng vẫn giữ lại thông tin nhiều nhất có thể (high variance).
- Chúng ta cần tìm ra chiều dữ liệu có độ quan trọng cao, nhằm giảm bớt việc tính toán, cũng như tăng tốc độ xử lí.
![](https://images.viblo.asia/be29a36d-1d2e-4470-bf5c-4dec289f1eb2.png)
- PCA chuyển dữ liệu từ linear thành các thuộc tính mới không liên quan lẫn nhau.
### Dữ liệu.
> Chúng ta cần phân biệt 2 loại dữ liệu:
1. Dữ liệu liên quan (correlated):

![](https://images.viblo.asia/38d01de9-13d3-40c6-bc0f-24bfe6698d12.png)

2. Dữ liệu không liên quan (uncorrelated):

![](https://images.viblo.asia/86abb5cf-648c-4a28-80da-dacca3282cca.png)

> PCA tìm ra mean và principal components. 

![](https://images.viblo.asia/e6fa45d9-55f5-4762-a520-7fcdc7c79d70.png)
![](https://images.viblo.asia/527b83c6-c4d4-4baf-ac7c-cf599f0acf2c.gif)

### Làm thế nào để implement PCA:

> - Biến đổi X về dạng đồng nhất.
> - Tính toán covariance matrix Σ
> - Tìm eigenvectors của Σ
> - Lấy K dimensions có giá trị variance cao nhất 

### eigenvectors (vector màu đỏ) 
là vector không thay đổi hướng khi apply linear transformation.
![](https://images.viblo.asia/1c882e25-c77b-46f5-8ec8-ce65ec4e422b.png)

### eigenvalue cho PC1
![](https://images.viblo.asia/e5149b73-d00f-4cce-866c-7df18b05c777.png)
### eigenvalue cho PC2
![](https://images.viblo.asia/b1e6f91a-d54d-4f6c-b110-06c197d690a7.png)
### eigenvector
![](https://images.viblo.asia/f3fdeca7-80cd-4963-9805-c0b2e4747c24.png)
### Sự phân bổ độ quan trọng của chiều dữ liệu
![](https://images.viblo.asia/4523d6f5-4b9f-4674-8a8c-1f407811674f.png)
![](https://images.viblo.asia/4011ecc3-f710-488a-b127-2c9760b868dd.png)

### Algorithm
```
from numpy import array
from numpy import mean
from numpy import cov
from numpy.linalg import eig
# define a matrix
A = array([[1, 2], [3, 4], [5, 6]])
print(A)
# calculate the mean of each column
M = mean(A.T, axis=1)
print(M)
# center columns by subtracting column means
C = A - M
print(C)
# calculate covariance matrix of centered matrix
V = cov(C.T)
print(V)
# eigendecomposition of covariance matrix
values, vectors = eig(V)
print(vectors)
print(values)
# project data
P = vectors.T.dot(C.T)
print(P.T)
```
Output:
```
[[1 2]
 [3 4]
 [5 6]]

[[ 0.70710678 -0.70710678]
 [ 0.70710678  0.70710678]]

[ 8.  0.]

[[-2.82842712  0.        ]
 [ 0.          0.        ]
 [ 2.82842712  0.        ]]
```

### Kết.
- Đây chỉ bài viết mang mục đích giới thiệu, hy vọng các bạn có cái nhìn tổng quan về nó, :laughing::grinning:

Reference:
- https://www.youtube.com/watch?v=FgakZw6K1QQ
- https://towardsdatascience.com/https-medium-com-abdullatif-h-dimensionality-reduction-for-dummies-part-1-a8c9ec7b7e79