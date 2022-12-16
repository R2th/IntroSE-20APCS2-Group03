Python 3.8 là phiên bản mới nhất vừa được tung ra, nó chứa nhiều tính năng mới và được tối ưu hóa hơn so với phiên bản tiền nhiệm.
![](https://images.viblo.asia/cf59a855-361e-4eda-9cfe-f7877c564e8e.png)
Dưới đây là một vài tính năng mới trong phiên bản mới này:
## 1. Toán tử Walrus


Chúng ta có một loại toán tử gán mới trong phiên bản mới này, nó được gọi là toán tử Walrus ( := ). Toán tử này có lợi thế là thiết lập và trả về một biến trong một dòng. Ví dụ:
```
sample_data = [
{“id”: 1, “name”: “Srijan”},
{“id”: 2, “name”: “Abhishek”},
{“id”: 3, “name”: “Dilip”},
{“id”: 4, “name”: “Vishal”},
{“id”: 4, “name”: None},
]
print(“With Python 3.8 Walrus Operator:”)
for entry in sample_data:
    if name := entry.get(“name”):
        print(f’Found name = {name}’)
print(“Without Walrus operator:”)
for entry in sample_data:
    name = entry.get(“name”)
    if name:
        print(f’Found name = {name}’)
   
 #Output:
#With Python 3.8 Walrus Operator:
#Found name = “Srijan”
#Found name = “Abhishek”
#Found name = “Dilip”
#Found name = “Vishal”
#
#Without Walrus operator:
#Found name = “Srijan”
#Found name = “Abhishek”
#Found name = “Dilip”
#Found name = “Vishal”
```
## 2. Đối số chỉ vị trí


Một ký tự đánh dấu đặc biệt '/' được sử dụng khi khai báo đối số của một hàm để chỉ định rằng hàm chỉ chấp nhận các đối số ở bên trái của điểm đánh dấu. Dấu ’/' trong ví dụ dưới đây có nghĩa là việc truyền các giá trị cho x, y và z chỉ có thể được thực hiện theo vị trí và không sử dụng các từ khóa đối số.
```
def func1(x,y,z=None,/):
    r = x + y
    if z is not None:
        r -= z
        return r
print(func1(2, 5)) #7
print(func1(2, 5, 3)) #4
print(func1(x=2, y=10)) #TypeError
print(func1(2, 10, z=3)) #TypeError
```
## 3. f-string hỗ trợ toán tử '='


Bây giờ chúng ta có thể sử dụng toán tử '=' trong f-string để lấy và in giá trị. Điều này có nghĩa là bây giờ chúng ta có thể thực hiện các phép toán số học của mình trong f-string.
```
a=5
b=6
print(f'sum={a+b}') #11
```
## 4. Cảnh báo lỗi cú pháp mới


Python đã giới thiệu các thông báo cảnh báo mới cho lỗi dấu phẩy bị thiếu cùng với các thông báo lỗi khác trong phiên bản mới này. Trình thông dịch sẽ đưa ra thông báo cảnh báo hữu ích hơn giúp người dùng nhanh chóng tìm ra lỗi.
```
list1=[[0,1] [2,3]]
#Dòng code sẽ gây ra lỗi cú pháp khi thiếu dấu phẩy
```
Thông báo cảnh báo lỗi:
![](https://images.viblo.asia/0263c4ca-3ed6-45bd-9709-8079896121f0.jpeg)
## 5. Dictionary có thể nghịch đảo


Hàm reversed() giờ có thể làm việc với dictionary. Python đã bắt đầu lưu trữ thứ tự khóa được chèn trong từ điển từ phiên bản 3.7 nhưng giờ đây trong phiên bản 3.8 bạn cũng có thể đảo ngược nó.
```
dict1={'a':5,'b':6}
print(dict1)    #{'a': 5, 'b': 6}
print(list(reversed(dict1)))    #['b', 'a']
```
## 6. Bộ nhớ dùng chung trong đa tiến trình


Khi sử dụng đa tiến trình, dữ liệu có thể được chia sẻ và truy cập toàn cục trên tất cả các instance. Điều này sẽ tăng tốc độ lưu, lưu trữ, truy cập và truyền dữ liệu dễ dàng hơn nhiều
## 7. Giao thức mới để tạo file pickle


Pickle trong Python chủ yếu được sử dụng trong việc tuần tự hóa và khử tuần tự dữ liệu và code cũng có thể được sử dụng lại ở một nơi khác. Trong phiên bản mới này, Python sẽ sử dụng Giao thức 4 theo mặc định, ngoài ra nhà phát triển cũng có thể sử dụng Giao thức 5. Điều này sẽ được các API tận dụng tối đa, do đó cải thiện được hiệu suất. Đối với những người làm việc trong lĩnh vực khoa học dữ liệu, đây là một tin thú vị vì nó sẽ hoạt động tốt với Django và Flask ngay cả trong các máy chủ có dung lượng thấp hoặc hạn chế.
## 8. Cải thiện CPython


Python cũng đã nói rằng họ đã cải tiến CPython. Điều này sẽ làm cho việc tối ưu hóa dễ dàng trong Python. Nhiều người trong lĩnh vực khoa học dữ liệu đã gặp phải nhiều trường hợp môi trường Python hoặc Jupyter bị sập vì lượng dữ liệu khổng lồ. Với sự cải tiến trong mô-đun CPython của nó, người dùng có thể mong đợi kết quả tốt hơn trong việc xử lý và truy vấn dữ liệu.
## 9. Cải thiện hiệu suất


Bản phát hành này đã thêm một số cải tiến giúp tăng tốc trình thông dịch. Một số trong số chúng là:
* operator.itemgetter() nhanh hơn 33%
* Tìm kiếm field trong collections.namedtuple() bây giờ nhanh hơn hai lần.
* Hàm khởi tạo list giờ có thể tạo list dung lượng nhỏ hơn trung bình 12%.
* Gọi một số phương thức dựng sẵn giờ nhanh hơn 20% đến 50%.
## Tổng kết
Bản phát hành sắp tới của Python bổ sung một số tính năng mới tuyệt vời cho ngôn ngữ và cải thiện đáng kể hiệu năng với các bản sửa lỗi tăng tốc cơ bản. Hãy chào đón Python 3.8 và sử dụng nó tốt nhất.