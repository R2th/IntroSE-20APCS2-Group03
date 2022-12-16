### Một chút giới thiệu về NumPy
Thư viện NumPy là một thư viện Python quan trọng dành cho các nhà khoa học dữ liệu và là một thư viện mà bạn nên làm quen. Mảng Numpy giống như danh sách trong Python, nhưng nó tốt và hữu dụng hơn rất nhiều. Thao tác với mảng Numpy dễ hơn là thao tác với danh sách trong Python. Bạn cũng có thể sử dụng một mảng Numpy thay cho việc có nhiều danh sách Python. Mảng Numpy tính toán nhanh hơn danh sách và cực kỳ hiệu quả khi thực hiện các phép toán và logic
OK. Bắt đầu tìm hiểu nhé!
### Numpy
Đầu tiên và quan trọng nhất, bạn phải import Numpy như sau: 
```
import numpy as np
```
### Những cách để tạo mảng Numpy
Không giống như một danh sách, bạn không thể tạo một mảng Numpy trống được. Dưới đây là những cách để khởi tạo một mảng Numpy:
![](https://images.viblo.asia/178395cd-5c49-4eed-9d81-485551b5b24f.png)

Nếu bạn có một danh sách mà bạn muốn chuyển đổi thành một mảng Numpy, chúng ta có thể dễ dàng chuyển đổi nó bằng câu lệnh như sau:
![](https://images.viblo.asia/6669ead2-600a-44bc-a6ed-dc772f4fa0fe.png)

### Truy cập các phần tử trong mảng/duyệt mảng
Chúng ta có thể truy cập vào một mục riêng lẻ hoặc một phần của dữ liệu. Tương tự như danh sách, phần tử đầu tiên là chỉ mục (index) ở 0. Ví dụ, array1 [0,0] chỉ ra rằng chúng tôi đang truy cập vào hàng đầu tiên và cột đầu tiên. Số đầu tiên trong bộ dữ liệu [0,0] cho biết chỉ số của hàng(dòng) và số thứ hai cho biết chỉ số của cột.
![](https://images.viblo.asia/8689ff09-83d0-4b13-a953-3ba19010207e.png)

### Broadcasting
Thuật ngữ Broadcasting mô tả cách thức numpy xử lý các mảng với các hình dạng khác nhau trong các các biểu thức số học. - - SciPy.org
Broadcasting là cách mà người ta có thể nhận được đầu ra bên ngoài của hai mảng.
Theo mô tả của tài liệu sử dụng thư viện, khi Khi hoạt động trên hai mảng, NumPy so sánh các yếu tố hình dạng của chúng là một cách rất khoa học, rằng điều kiện bắt buộc là:

* Chúng bằng nhau
* Hoặc một trong số chúng là 1

Nếu các điều kiện này không được đáp ứng, một lỗi sẽ xuất hiện như sau:
```
a ValueError: frames are not aligned
```

![](https://images.viblo.asia/ec9362ff-5076-46f4-8a49-6018db72570d.png)

Để có thể thực hiện phép toán mà không gặp lỗi, chúng ta sử `reshape` . Phương thức này thay đổi hình dạng của mảng để chúng ta có thể làm cho nó tương thích với các hoạt động của Numpy.

![](https://images.viblo.asia/2f2c15b4-bdf1-4ef1-ae23-b385bd3bfcb4.png)
### Tính toán và ma trận
Một trong những lý do tôi yêu thích mảng Numpy là vì nó cực dễ thao tác. Ghép, cộng, nhân, hoán vị chỉ với một dòng code!
Dưới đây là một số ví dụ về các phép toán số học và nhân khác nhau với các mảng Numpy

![](https://images.viblo.asia/d9a49221-db71-40e2-8948-7699808a7f05.png)

Các tính năng thú vị khác bao gồm nối, tách, hoán vị (chuyển các mục từ hàng sang cột và ngược lại) và nhận các phần tử đường chéo.

![](https://images.viblo.asia/2bf400d9-c858-4b7b-b020-28d450833a04.png)

Ở ví dụ trêntrên, trục = 0 cho máy tính biết rằng chúng ta muốn nối theo hàng. Thay vào đó, nếu chúng ta muốn nối các cột, chúng ta sử dụng trục = 1.

### Comparisons

Một điều hữu ích chúng ta có thể làm với mảng Numpy là so sánh mảng này với mảng khác. Kết qủa trả về là một ma trận boolean:

![](https://images.viblo.asia/0836b366-da03-444c-afa6-66e758bbc03d.png)


Link tham khảo: [Numpy home page ](http://www.numpy.org/)