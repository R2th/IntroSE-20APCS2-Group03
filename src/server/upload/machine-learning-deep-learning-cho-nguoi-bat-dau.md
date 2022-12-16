![](https://images.viblo.asia/b9969549-8f60-4d55-85e1-023a66773d71.png)

Bạn đang xem những phần đầu tiên của chuỗi bài viết Machine Learning, Deep Learning cho người bắt đầu! Hy vọng qua lộ trình này bạn sẽ nắm chắc được công nghệ này từ cơ bản đến nâng cao, xây dựng Machine Learning model từ python thuần cho đến các thư viện cao cấp như TensorFlow hay Keras.

Series này mình sẽ triển khai cụ thể các kiến thức toán học cần thiết, khung sườn nội dung được sự cho phép của tác giả [Ngoc Nguyen Ba](https://github.com/bangoc123) từ tài khoản [Github](https://github.com/bangoc123/learn-machine-learning-in-two-months/) -  Hiện đang là Founder và Community Manager của GDG Hanoi

Lộ trình này bao gồm:
* [Kiến thức toán học cần thiết](https://viblo.asia/p/machine-learning-deep-learning-cho-nguoi-bat-dau-1VgZvEeYKAw)
* [Kỹ năng lập trình Python](https://viblo.asia/p/machine-learning-deep-learning-cho-nguoi-bat-dau-ky-nang-lap-trinh-python-mang-numpy-numpy-array-OeVKByL25kW)
* Thư viện Numpy và TensorFlow
* Bài toán hồi quy (Regression)
* Bài toán phân loại (Classification)
* Xây dựng mô hình Decision Trees và Random Forests
* Xây dựng mạng Neural Network
* Xây dựng mạng Convolutional Neural Network (CNN)
* Xây dựng mạng Recurrent Neural Network (RNN)
* Triển khai (Deploy) Machine Learning Model trên Production
## 1. Kiến thức toán học cần thiết
![](https://images.viblo.asia/6e5e8e0c-3ffc-4722-9b78-4d3279df6321.jpg)
### a. Đại số tuyến tính
Nếu bạn có nhiều thời gian có thể tham khảo Series về đại số tuyến tính này [link youtube](https://www.youtube.com/watch?v=ZK3O402wf1c&list=PLE7DDD91010BC51F8) (MIT 18.06 Linear Algebra). Tuy nhiên với bản thân mình cũng như nhiều bạn thì không có thời gian (mình cũng không đủ kiên trì nữa (yaoming)) thì mình xin tổng hợp lại những kiến thức chính mà các bạn nên nắm bẳt sau:

* Scalar/Vector
* Ma trận (Matrix)
* Chuyển vị ma trận
* Norm Vector
* Tensor
* Các phép toán với ma trận: Phép cộng ma trận, Phép nhân ma trận, Tích Hadamard/Element-Wise
* Ma trận đơn vị
* Ma trận nghịch đảo


### b. Đạo hàm
Xin giới thiệu với các bạn series kinh điển để nhắc lại kiến thức đạo hàm. [Essence of calculus - 3Blue1Brown](https://www.youtube.com/watch?v=WUvTyaaNkzM&list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr)
### c. Lý thuyết xác suất
Phần này các bạn cần chú ý các khái niệm cơ bản:
* Xác suất sử dụng không gian mẫu
* Tiên đề xác suất
* Các loại xác suất
* Biến ngẫu nhiên và phân phối xác suất


## 2. Kỹ năng lập trình Python

![](https://images.viblo.asia/166062dc-6355-4e37-869b-1916d6d78bc2.png)

Tại sao lại là Python?

Python là ngôn ngữ được dùng nhiều nhất để làm Machine Learning vì tính đơn giản gọn nhẹ của nó. Nhưng để đưa vào Production thì mình nghĩ Javascript cũng là một lựa chọn không tồi. Mình sẽ chia sẻ về Machine Learning với Javascript trong các phần tiếp theo.
### a. Cài đặt Python và các thư viện cần thiết:
Các bạn chú ý cài đặt đầy đủ các thư viện
* Python
* Pip
* Jupyter Notebook
### b. Tính chất đặc điểm
Python là ngôn ngữ thông dịch có:
* Điểm mạnh:

   - Dễ viết/ Dễ đọc
   - Quy trình phát triển phần mềm nhanh vì dòng lệnh được thông dịch thành mã máy và thực thi ngay lập tức
   - Có nhiều thư viện mạnh để tính toán cũng như làm Machine Learning như Numpy, Sympy, Scipy, Matplotlib, Pandas, TensorFlow, Keras, vv.
* Điểm yếu:
  - Mang đầy đủ điểm yếu của các ngôn ngữ thông dịch như tốc độ chậm, tiềm tàng lỗi trong quá trình thông dịch, source code dễ dàng bị dịch ngược.
  - Ngôn ngữ có tính linh hoạt cao nên thiếu tính chặt chẽ.

### c. Các hàm dựng sẵn và kiểu dữ liệu trên Python
#### Các hàm dựng sãn trong Python


|      Hàm | Mô tả    |
| -------- | -------- |
|abs()|	Trả về giá trị tuyệt đối của một số
|all()|	Trả về True khi tất cả các phần tử trong iterable là đúng
|any()|	Kiểm tra bất kỳ phần tử nào của iterable là True
|ascii()	|Tả về string chứa đại diện (representation) có thể in
|bin()	|Chuyển đổi số nguyên sang chuỗi nhị phân
|bool()	|Chuyển một giá trị sang Boolean
|bytearray()	|Trả về mảng kích thước byte được cấp
|bytes()	|Trả về đối tượng byte không đổi
|callable()	|Kiểm tra xem đối tượng có thể gọi hay không
|chr()	|Trả về một ký tự (một chuỗi) từ Integer
|classmethod()|	Trả về một class method cho hàm
|compile()|	Trả về đối tượng code Python
|complex()|	Tạo một số phức
|delattr()|	Xóa thuộc tính khỏi đối tượng
|dict()	|Tạo Dictionary
|dir()	|Trả lại thuộc tính của đối tượng
|divmod()	|Trả về một Tuple của Quotient và Remainder
|enumerate()|	Trả về đối tượng kê khai
|eval()|	Chạy code Python trong chương trình
|exec()	|Thực thi chương trình được tạo động
|filter()|	Xây dựng iterator từ các phần tử True
|float()|	Trả về số thập phân từ số, chuỗi
|format()|	Trả về representation được định dạng của giá trị
|frozenset()|	Trả về đối tượng frozenset không thay đổi
|getattr()|	Trả về giá trị thuộc tính được đặt tên của đối tượng
|globals()|	Trả về dictionary của bảng sumbol toàn cục hiện tại
|hasattr()|	Trả về đối tượng dù có thuộc tính được đặt tên hay không
|hash()|	Trả về giá trị hash của đối tượng
|help()	|Gọi Help System được tích hợp sẵn
|hex()	|Chuyển Integer thành Hexadecimal
|id()	|Trả về định danh của đối tượng
|input()|	Đọc và trả về chuỗi trong một dòng
|int()|	Trả về số nguyên từ số hoặc chuỗi
|isinstance()|	Kiểm tra xem đối tượng có là Instance của Class không
|issubclass()	|Kiểm tra xem đối tượng có là Subclass của Class không
|iter()	|Trả về iterator cho đối tượng
|len()	|Trả về độ dài của đối tượng
|list()|	Tạo list trong Python
|locals()	|Trả về dictionary của bảng sumbol cục bộ hiện tại
|map()	|Áp dụng hàm và trả về một list
|max()	|Trả về phần tử lớn nhất
|memoryview()|	Trả về chế độ xem bộ nhớ của đối số
|min()	|Trả về phần tử nhỏ nhất
|next()	|Trích xuất phần tử tiếp theo từ Iterator
|bject()|	Tạo một đối tượng không có tính năng (Featureless Object)
|oct()|	Chuyển số nguyên sang bát phân
|open()|	Trả về đối tượng File
|ord()	|Trả về mã Unicode code cho ký tự Unicode
|pow()	|Trả về x mũ y
|print()	|In đối tượng được cung cấp
|property()	|Trả về thuộc tính property
|range()|	Trả về chuỗi số nguyên từ số bắt đầu đến số kết thúc
|repr()	|Trả về representation có thể in của đối tượng
|reversed()	|Trả về iterator đảo ngược của một dãy
|round()	|Làm tròn số thập phân
|set()	|Tạo một set các phần tử mới
|setattr()	|Đặt giá trị cho một thuộc tính của đối tượng
|slice()|	Cắt đối tượng được chỉ định bằng range()
|sorted()	|Trả về list được sắp xếp
|staticmethod()|	Tạo static method từ một hàm
|str()	|Trả về một representation không chính thức của một đối tượng
|sum()	|Thêm một mục vào Iterable
|super()|	Cho phép tham chiếu đến Parent Class bằng super
|tuple()| Function	Tạo một Tuple
|type()	|Trả về kiểu đối tượng
|vars()	|Trả về thuộc tính __dict__ của class
|zip()	|Trả về Iterator của Tuple
|__import__()	|Hàm nâng cao, được gọi bằng import


> Nếu muốn biết hàm này cụ thể làm gì, có đối số nào, bạn chỉ cần nhập lệnh:
> 
> `print(ten_ham.__doc__)`
> 
> Python sẽ giải thích khá đầy đủ về hàm, bạn có thể đọc và làm vài ví dụ để hiểu hàm đó.


#### Các kiểu dữ liệu trong Python
##### Kiểu dữ liệu cơ bản
* Kiểu int: Kiểu số nguyên (không có chứa dấu chấm thập phân), có thể lưu các số nguyên âm và dương.
   - Ví dụ: 113, -114
* Kiểu float: Kiểu số thực (có chứa dấu chấm thập phân),
    - ví dụ: 5.2, -7.3
* Kiểu complex: Kiểu số phức,
   - ví dụ 1: z = 2+3j thì 2 là phần thực, 3 là phần ảo (j là từ khóa để đánh dấu phần ảo)
   - ví dụ 2: z=complex(2,3) thì 2 là phần thực, 3 là phần ảo
   - Khi xuất kết quả ta có thể xuất:
    -  print(“Phần thực= “,z.real) ==>Phần thực= 2 
    -  print(“Phần ảo= “,z.imag) ==> Phần ảo= 3

* Kiểu str: Kiểu chuỗi, để trong nháy đôi hoặc nháy đơn
   - Ví dụ: “Obama”, ‘Putin’
* Kiểu bool: Kiểu luận lý, để lưu True hoặc False
   - Ví dụ 1: t1=True
   - Ví dụ 2: t2=False



> Đọc tiếp [tại đây](https://viblo.asia/p/machine-learning-deep-learning-cho-nguoi-bat-dau-python-mang-numpy-numpy-array-OeVKByL25kW) bạn nhé