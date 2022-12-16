# Mở đầu
**Mục đích:** Trong phần này, chúng ta sẽ mở rộng chuyên môn với một cái hiểu chi tiết về **thuật toán truyền ngược**, là một cách để tính đạo hàm của một biểu thức sử dụng quy tắc chuối (chain rule).  Hiểu được thuật toán này và sự tính tế của nó rất quan trọng cho bạn để hiểu, phát triển, thiết kế và debug mạng neurol

**Bài toán"** Vấn đề cốt lỗi của phần này như sau: Chúng a được cho một hàm $f(x)$ trong đó x là một vector của dữ liệu và chúng ta muốn tính đạo hàm của $f$ theo $x$ (i.e. $\nabla f(x)$.

**Mục đích:** Nhắc lại về mục đích ban đầu chúng ta quan tâm đến vấn đề này là trong những trường hợp đặc biệt của Mạng Neurol, $f$ sẽ tương ứng với hàm mất mát (loss function) ($L$) và dữ liệu đầu vào $x$ chứ dữ liệu huấn luyện và trọng số của mạng neural. Ví dụ, hàm mất mát của hàm SVM và dữ liệu đầu vào là dữ liệu huấn luyện $(x_{i}, y_{i}), i = 1.... N$ và trọng số,  biases $W,b$. Chú ý rằng ( trong những trường hợp thông thường của Học máy), chúng ta đã có dữ liệu huấn luyện và chúng ta có quyền kiểm soát các trọng số. Từ đó, chúng ta có thể dễ dàn dùng truyền ngược để tính đạo hàm theo $x_{i}$. Trong thực tế, chúng ta thường chỉ tính đạo hàm theo tham số ($W, b$) để chúng ta dùng nó để thực hiển cập nhật tham số. Tuy nhiên, về sau chúng ta sẽ thấy rằng đạo hàm theo $x_{i}$ vẫn có thế có ích, ví dụ cho mục đích quan sát Mạng neural có thể làm gì.

Nếu bạn tính đạo hàm bằng quy tắc chuỗi, chúng tôi khuyến khích bạn lờ đi cách này trong phần này, bởi vì nó bày tỏ một quan điểm hiếm khi được phát triển của truyền ngược như dòng chảy ngược có giá trị thực và bất kỳ hiểu biết nào mà bạn sẽ đạt được có thể giúp bạn trong cả lớp.

# Biểu thức đơn giản và sự biểu diễn của đạo hàm riêng (gradient)
Cùng bắt đầu để chúng ta có thể phát triển ký hiệu và sự tiện lợi cho những biểu thức phức tạp hơn. Xét một hàm đã thực đơn giản $f(x,y) = xy$. Rất đơn giản để tính đạo hàm riêng theo $x$ và $y$.

$f(x,y) = x y \hspace{0.5in} \rightarrow \hspace{0.5in} \frac{\partial f}{\partial x} = y \hspace{0.5in} \frac{\partial f}{\partial y} = x$

**Biểu diễn**: Giữ trong đầu rằng đạo hàm cho ta biết điều gì: Chúng chỉ ra tỉ lệ thay đổi của một hàm ứng với biến đó xung quan một khoảng vô cùng bé   của điểm đó:

$\frac{df(x)}{dx} = \lim_{h\ \to 0} \frac{f(x + h) - f(x)}{h}$

Một chú ý rằng dấu chia ở vế phải khác với dấu chia ở vế trái (kí hiệu vi phân). Ký hiệu vi phân thể hiển rằng toán tử $\frac{d}{dx}$ đang được ứng dụng vào trong hàm $f$, và trả về một đạo hàm. Một cách hay để nghĩ về biểu thức trên là khi $h$ rất nhỏ, hàm số sẽ xấp xỉ một đường thẳng, và đạo hàm là đường dốc của nó. Nói cách khác, đạo hàm theo mỗi biến cho ta biệt mức độ "nhạy cảm" của toàn bộ biểu thức theo giá trị đó. Ví dụ, nếu $x=4, y=-3$, => $x=12$ và đạo hàm theo $x$ $\frac{\partial f}{\partial x} = -3$. Nói cho chúng ta rằng nếu chúng ta tăng giá trị của biến $x$ một ít sẽ làm giảm giá trị của biểu thực bằng 3 lần giá trị $x$ tăng.  Nhìn giống như ta thay đổi phương trình hàm $f$ $f(x + h) = f(x) + h \frac{df(x)}{dx}$. 

Như đã đề cập, gradient $\nabla f$ là một vector của đạo hàm riêng, nên chúng ta có $\nabla f = [\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}] = [y, x]$. Mặc dù gradient là một vector, chúng ta thường sử dụng khái niệm "gradient theo x" thay thế cho "đạo hàm riêng theo x".

Chúng ta có thể đạo hàm cho phép cộng:

$f(x,y) = x + y \hspace{0.5in} \rightarrow \hspace{0.5in} \frac{\partial f}{\partial x} = 1 \hspace{0.5in} \frac{\partial f}{\partial y} = 1$

đạo hàm the cả $x,y$ là ra bất kể ta tăng giá trị của $x,y$ thì hàm $f$ cũng sẽ tăng và tỉ lệ không phụ thuộc vào giá trị của x, y. Cuối cùng là hàm tìm số lớn nhất

$f(x,y) = \max(x, y) \hspace{0.5in} \rightarrow \hspace{0.5in} \frac{\partial f}{\partial x} = \mathbb{1}(x >= y) \hspace{0.5in} \frac{\partial f}{\partial y} = \mathbb{1}(y >= x)$

Nếu $x=4,y=2$, giá trị của hàm là 4 và giá trị của nó không bị ảnh hưởng bới $y$. Nghĩa là nếu chúng ta tăng giá trị của $y$ một lượng nhọ $h$ thì hàm số vẫn trả về giá trị 4 và đạo hàm riêng theo $y$ là 0. Dĩ nhiên nếu ta tăng $y$ một lượng lớn hơn 2 thì giá trị của $f$ sẽ thay đổi nhưng đạo hàm k nói cho chúng ta điều gì về ảnh hưởng của hàm khi biến thay đổi lớn.

# Hàm hợp với quy tắc chuỗi

Bây giờ xét một biểu thức phức tạp hơn, $f(x,y,z) = (x + y) z$. Biểu thức này vẫn khá đơn giản để đạo hàm trực tiếp, nhưng chúng tôi sẽ dùng một cách khác để giúp bản hiểu rõ về truyền ngược. Ta có thể tách biểu thức trên thành 2 biểu thức: $q = x + y$ và $f = q z$.  Thêm nữa, chúng ta biết cách tính đạo hàm của cả 2 biểu thức trên. Biểu thức $f$ là tích của $q$ và $z$ nên $\frac{\partial f}{\partial q} = z, \frac{\partial f}{\partial z} = q$ và $q$ là tổng của $x$ và $y$ nên $\frac{\partial q}{\partial x} = 1, \frac{\partial q}{\partial y} = 1$. Tuy nhiên, chúng ta không cần thiết phải quan tâm về đạo hàm riêng theo  $q$ - giá trị của $\frac{\partial f}{\partial q}$ không nói nên gì. Thay vào đó, chúng ta quan tâm đến đạo hàm riêng của $f$ theo $x,y,z$. **Quy tắc chuỗi** cho chúng ta biết cách chính xác để nối các đạo hàm riêng lại với nhau thông qua phép nhân. Ví dụ, $\frac{\partial f}{\partial x} = \frac{\partial f}{\partial q} \frac{\partial q}{\partial x}$. Trong thực hành, đấy là một phép nhân thông thương của hai số.  Xem ví dụ dưới đây
``` python
# set some inputs
x = -2; y = 5; z = -4

# perform the forward pass
q = x + y # q becomes 3
f = q * z # f becomes -12

# perform the backward pass (backpropagation) in reverse order:
# first backprop through f = q * z
dfdz = q # df/dz = q, so gradient on z becomes 3
dfdq = z # df/dq = z, so gradient on q becomes -4
# now backprop through q = x + y
dfdx = 1.0 * dfdq # dq/dx = 1. And the multiplication here is the chain rule!
dfdy = 1.0 * dfdq # dq/dy = 1
```

Kết thức trương trình, chỉ còn lại đạo hàm riêng theo các biến $x.y.x$ **[dfdx,dfdy,dfdz]**, cho chúng ta biết độ nhạy cảm của hàm $f$ theo $z,y,z$. Đó là ví dụ đơn giản nhất của lan truyền ngược. Chúng tôi muốn những kí hiệu súc tích cho ngắn gọn.  Thay vì viết **dfdq** chúng ta có thể viết **dq** và luôn luôn giả định gradient( ma trận của đạo hàm riêng) ứng với kết quả cuối cùng.

Đây là phần đầu của bài dịch thuật toán lan truyền ngược- nói về đạo hàm riêng, gradient và chain rule. Trong phần 2 mình sẽ đi sâu vào thuật toán, cảm ơn các bạn đã đọc bài dịch của mình.[Link gốc](http://cs231n.github.io/optimization-2/)