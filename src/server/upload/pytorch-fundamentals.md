## Khởi tạo một tensor

Tensors là kiểu dữ liệu phổ biến trong các bài toán về Trí tuệ nhân tạo. Ngoài việc sử dụng chúng làm cấu trúc dữ liệu cơ sở cho hình ảnh, một công dụng nổi bật hơn của tensor là được tận dụng để khởi tạo weight kết nối các layer của mạng nơ-ron. Trong phần này, ta sẽ thực hành các cách khác nhau để khởi tạo một đối tượng tensor:

1. Import Pytorch và khởi tạo tensor bằng cách gọi ```torch.tensor``` như sau
```py
import torch
x = torch.tensor([[1,2]])
y = torch.tensor([[1],[2]])
```

2. In ra shape và kiểu dữ liệu của tensor
```py
print(x.shape) # torch.Size([1,2]) # one entity of two items
print(y.shape) # torch.Size([2,1]) # two entities of one item each
print(x.dtype) # torch.int64
```
Kiểu dữ liệu của tất cả phần tử trong một tensor là giống nhau. Điểu đó có nghĩa là nếu một tensor mà bao gồm các kiểu dữ liệu khác nhau (ví dụ như một phần tử kiểu boolean, một phần tử là số nguyên, một phần tử là số thập phân) thì  toàn bộ tensor bị ép  vào kiểu dữ liệu chung (generic) nhất.
```py
x = torch.tensor([False, 1, 2.0])
print(x)
# tensor([0., 1., 2.])
```

3.  Sinh một tensor với 3 hàng 4 cột gồm các phần tử 0
```py
torch.zeros((3,4))
```

4. Sinh một tensor với 3 hàng 4 cột gồm các phần tử 1
```py
torch.ones((3,4))
```

5. Sinh một tensor gồm 3 hàng 4 cột chứa các phần tử ngẫu nhiên trong nửa đoạn [0,10)
```py
torch.randint(low = 0, high = 10, size = (3,4))
```

6. Sinh một tensor gồm 3 hàng 4 cột chứa các phần tử ngẫu nhiên có giá trị nằm giữa 0 và 1
```py
torch.rand(3,4)
```

7. Sinh một tensor gồm 3 hàng 4 cột với giá trị các phần tử theo một phân phối chuẩn
```py
torch.randn((3,4))
```

8. Ta có thể convert một Numpy array thành một Torch tensor sử dụng ```torch.tensor(<numpy-array>)```
```py
x = np.array([10,20,30],[2,3,4]])
y = torch.tensor(x)
print(type(x), type(y))
# <class 'numpy.ndarray'> <class 'torch.Tensor'>
```

## Các thao tác trên tensor 1
Tương tự như Numpy, bạn có thể thực hiện các thao tác cơ bản trên tensor. 

1. Nhân tất cả phần tử trong ```x``` với 10
```py
import torch
x = torch.tensor([[1,2,3,4], [5,6,7,8]])
print(x * 10)
# tensor([[10, 20, 30, 40],
# [50, 60, 70, 80]])
```

2. Cộng 10 và các phần tử trong ```x``` và lưu kết quả vào biến ```y```
```py
x = torch.tensor([[1,2,3,4], [5,6,7,8]])
y = x.add(10)
print(y)
# tensor([[11, 12, 13, 14],
# [15, 16, 17, 18]])
```

3. Reshape tensor
```py
y = torch.tensor([2, 3, 1, 0])
# y.shape == (4)
y = y.view(4,1)
# y.shape == (4, 1)
```

4. Một cách khác để reshape tensor là sử dụng phương thức ```squeeeze``` trong đó ta thêm axis index mà ta muốn xóa. Chú ý rằng điều này chỉ được áp dụng chỉ khi axis mà ta muốn xóa chỉ có một phần tử 
```py
x = torch.randn(10,1,10)
z1 = torch.squeeze(x, 1) # similar to np.squeeze()
# The same operation can be directly performed on
# x by calling squeeze and the dimension to squeeze out
z2 = x.squeeze(1)
assert torch.all(z1 == z2)
# all the elements in both tensors are equal
print('Squeeze:\n', x.shape, z1.shape)
# Squeeze: torch.Size([10, 1, 10]) torch.Size([10, 10])
```

5. Ngược lại với ```squeeze``` là ```unsqueeze``` nghĩa là ta thêm chiều (dimension) vào ma trận
```py
x = torch.randn(10,10)
print(x.shape)
# torch.size(10,10)
z1 = x.unsqueeze(0)
print(z1.shape)
# torch.size(1,10,10)
# The same can be achieved using [None] indexing
# Adding None will auto create a fake dim
# at the specified axis
x = torch.randn(10,10)
z2, z3, z4 = x[None], x[:,None], x[:,:,None]
print(z2.shape, z3.shape, z4.shape)
# torch.Size([1, 10, 10])
# torch.Size([10, 1, 10])
# torch.Size([10, 10, 1])
```

Việc sử dụng ```None``` là một cách khá hay nếu chúng ta muốn fake channel hoặc batch dimension.

## Các thao tác trên tensor 2

1. Nhân 2 tensor khác nhau
```py
tensor1 = torch.randn(3)
tensor2 = torch.randn(3)
torch.matmul(tensor1, tensor2).size()
torch.Size([])
tensor1 = torch.randn(3, 4)
tensor2 = torch.randn(4)
torch.matmul(tensor1, tensor2).size()
torch.Size([3])
```

2. Tương tự như ```concatenate``` trong Numpy, ta có thể concat tensor sử dụng phương thức ```cat```
```py
import torch
x = torch.randn(10,10,10)
z = torch.cat([x,x], axis=0) # np.concatenate()
print('Cat axis 0:', x.shape, z.shape)
# Cat axis 0: torch.Size([10, 10, 10])
# torch.Size([20, 10, 10])
z = torch.cat([x,x], axis=1) # np.concatenate()
print('Cat axis 1:', x.shape, z.shape)
# Cat axis 1: torch.Size([10, 10, 10])
# torch.Size([10, 20, 10])
```

3. Lấy giá trị lớn nhất trong tensor
```py
x = torch.arange(25).reshape(5,5)
print('Max:', x.shape, x.max())
# Max: torch.Size([5, 5]) tensor(24)
```

4. Ta có thể lấy giá trị lớn nhất theo hàng và chỉ số của các giá trị đó
```py
x.max(dim=0)
# torch.return_types.max(values=tensor([20, 21, 22, 23, 24]),
# indices=tensor([4, 4, 4, 4, 4]))
```
Tương tự theo cột
```py
m, argm = x.max(dim=1)
print('Max in axis 1:\n', m, argm)
# Max in axis 1: tensor([ 4, 9, 14, 19, 24])
# tensor([4, 4, 4, 4, 4])
```

5. Hoán vị chiều của tensor
```py
x = torch.randn(10,20,30)
z = x.permute(2,0,1) # np.permute()
print('Permute dimensions:', x.shape, z.shape)
# Permute dimensions: torch.Size([10, 20, 30])
# torch.Size([30, 10, 20])
```

Lưu ý rằng không nên reshape một tensor sử dụng ```tensor.view```. Mặc dù Torch không báo lỗi nhưng nó sẽ ra kết quả sai mà ta không nhìn thấy được trong quá trình training. Nếu muốn swap dimension, bạn nên sử dụng permute.

Ngoài ra còn rất nhiều method khác như ``` abs, add, argsort,
ceil, floor, sin, cos, tan, cumsum, cumprod, diag, eig, exp, log, log2, log10,
mean, median, mode, resize, round, sigmoid, softmax, square, sqrt, svd``` cách gọi các method này giống như các method đã trình bày.

## Auto gradient

Vi phân và tính toán đạo hàm đóng vai trò rất quan trọng đối với việc cập nhật trọng số trong mạng neural network. Pytorch tensor cung cấp một hàm built in để tính toán đạo hàm.

1. Định nghĩa một tensor và yêu gradient được tính toán
```py
import torch
x = torch.tensor([[2., -1.], [1., 1.]], requires_grad=True)
print(x)
```

2. Tiếp theo, định nghĩa cách tính toán ra output, ví dụ như sau
![alt text](/uploads/db2c/cdca/image.png)
```py
out = x.pow(2).sum()
```
Ta đều biết rằng đạo hàm của hàm trên là ```2*x``` hãy thử kiểm chứng bằng hàm của Pytorch.

3. Giá trị của một đạo hàm được tính bằng cách gọi phương thức ```backward()```
```py
out.backward()
```

4. Okay! Giờ ta sẽ xác định giá trị đạo hàm tương ứng với đầu vào là ```x```
```py
x.grad
```

## Lợi ích của của Pytorch tensor so với Numpy array

Tensor Torch được tối ưu hóa để hoạt động với GPU so với NumPy. Để hiểu thêm điều này, hãy thực hiện một thử nghiệm nhỏ, trong đó ta thực hiện phép nhân ma trận bằng cách sử dụng NumPy trong một kịch bản và tensor trong một kịch bản khác và so sánh thời gian thực hiện phép nhân ma trận trong cả hai tình huống:

1. Sinh 2 torch object
```py
import torch
x = torch.rand(1, 6400)
y = torch.rand(6400, 5000)
```

2. Xác định device sử dụng để lưu trữ tensor object
```py
device = 'cuda' if torch.cuda.is_available() else 'cpu'
```
Lưu ý rằng nếu không có GPU thì device sẽ là CPU

3. Lưu 2 tensor vào device
```py
x, y = x.to(device), y.to(device)
```

4. Thực hiện nhân ma trận sử dụng Torch object
```py
%timeit z=(x@y)
# It takes 0.515 milli seconds on an average to
# perform matrix multiplication
```

5. Thực hiện nhân ma trận trên sử dụng cpu
```py
x, y = x.cpu(), y.cpu()
%timeit z=(x@y)
# It takes 9 milli seconds on an average to
# perform matrix multiplication
```

6. Thực hiện nhân ma trận sử dụng Numpy array
```py
import numpy as np
x = np.random.random((1, 6400))
y = np.random.random((6400, 5000))
%timeit z = np.matmul(x,y)
# It takes 19 milli seconds on an average to
# perform matrix multiplication
```

Ta thấy rằng nhân ma trận sử dụng Torch trên GPU nhanh ~18 lần so với Torch trên CPU và ~40 lần so với sử dụng Numpy array. Do đó nếu không có GPU, bạn có thể sử dụng Google Colab cho các thao tác tính toán trên tensor để tăng tốc độ tính toán :)))