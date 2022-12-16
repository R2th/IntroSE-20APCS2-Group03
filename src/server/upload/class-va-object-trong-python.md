Chào tất cả mọi người. Ở bài viết trước mình đã giới thiệu cho các bạn về hàm và cách sử dụng của nó. Hôm nay mình sẽ giới thiệu cho các bạn một khái niệm rất là quen thuộc với những ai yêu mến OOP (Object Oriented Programming). Exactly! It is Class and Object.<br>
Để có thể hiểu rõ hết những gì mình sắp trình bày, các bạn mới xem lần đầu có thể đọc các bài viết trước của mình về Python nhé:<br>
* [Python Language](https://viblo.asia/p/python-language-LzD5dJDeZjY)
* [Cấu trúc rẽ nhánh trong Python](https://viblo.asia/p/cau-truc-re-nhanh-trong-python-E375zW4RKGW)
* [Hàm trong Python](https://viblo.asia/p/ham-trong-python-eW65GgkP5DO)<br>
Không dài dòng nữa, chúng ta bắt đầu tìm hiểu nào.
# Khái niệm
Python là một ngôn ngữ hướng đối tượng. Vì vậy hầu hết mọi thứ trong Python đều là những đối tượng với những thuộc tính (properties) và phương thức (methods) riêng.<br>
OOP có 3 tính chất cơ bản các bạn cần phải nắm đó là:
* Tính đóng gói.
* Tính kế thừa.
* Tính đa hình.<br>

Còn chi tiết cụ thể mỗi tính chất các bạn có thể search for google nhá.<br>
Túm lại, theo cách hiểu của mình (sau khi đã gu gồ dịch) thì class nó là như thế này:
"Một Class giống như một hàm tạo đối tượng hoặc một "bản thiết kế" để tạo các đối tượng".
## Tạo một class 
Để tạo một class các bạn sử dụng từ khóa "class" theo cấu trúc như sau:<br>
```
class ClassName:
    [listOfProperties here]
    [listOfMethods here]
```
Ví dụ: Sau đây mình sẽ tạo một class Student có các thuộc tính là (name, age, math, literature, english) cùng với các phương thức như getName(), getAge(), getAverage().<br>
```
class Student:
    def __init__ (self, name, age, math, literature, english):
        self.name = name
        self.age = age
        self.math = math
        self.literature = literature
        self.english = english
        
    def getName(self):
        return self.name
        
    def getAge(self):
        return self.age
        
    def getAverage(self):
        return (self.math + self.literature + self.english) / 3
```
Như các bạn đã thấy, ở trên mình có sử dụng phương thức rất là đặc biệt `__init__(self, args)`. Vậy nó là gì vậy, và có cần thiết để sử dụng trong class hay không?<br>
### Phương thức khởi tạo `__init__(self, args)`
* Phương thức khởi tạo (Constructor) là một phương thức đặc biệt của lớp (class), nó luôn có tên là `__init__`.
* Tham số đầu tiên của constructor luôn là self (Một từ khóa ám chỉ chính class đó).
* Constructor được sử dụng để tạo ra một đối tượng.
* Constructor gán các giá trị từ tham số vào các thuộc tính của đối tượng sẽ được tạo ra.
* Bạn chỉ có thể định nghĩa nhiều nhất một phương thức khởi tạo (constructor) trong class.
* Nếu class không được định nghĩa constructor, Python mặc định coi rằng nó thừa kết từ constructor của lớp cha.<br>

Và cuối cùng, chúng ta có thể không cần dùng phương thức khởi tạo để gán giá trị cho các properties của class vì nó không cần thiết. Nhưng trong những dự án thực tế thì điều này lại tỏ ra rất cần thiết bởi vì code của chúng ta sẽ trở nên rõ ràng và dễ đọc hơn nhiều.<br>
## Khởi tạo đối tượng từ class
Để khởi tạo một đối tượng từ class ta thực hiện theo cấu trúc sau:
```
nameOfObject = nameOfClass([args])
```
VÍ dụ: Mình sẽ tạo một đối tượng student từ class Student đã được tạo ra ở phần trên.
```
student = Student('Jake', 24, 85, 90, 77)
```
Trên đây là những gì mình biết về class và object. Các bạn có cảm thấy hoang mang không nhỉ? Nếu có thì đừng lo lắng gì cả. Sau đây mình sẽ làm một ví dụ về việc sử dụng class và object trong Python ngay bây giờ.
# Ví dụ minh họa
Trong ví dụ này mình sẽ sử dụng class Student ở trên kết hợp với List trong Python để làm một chương trình quản lý học sinh đơn giản.
Dưới đây là code đầy đủ của class Student.<br>
![](https://images.viblo.asia/0f41b5ec-cdd5-4abf-a9e8-490747cbd0a2.png)<br>
Các bạn lưu vào file student.py nhé.<br>
Còn đây là code trong file main.py của mình.<br>
![](https://images.viblo.asia/7d6b27a0-bba8-49b6-be2b-901e4bd6552d.png)<br>
Để sử dụng được class Student đã viết trong file student.py thì các bạn dùng cặp từ khóa **from** và **import** nhé. Trong này mình có import thêm random dùng để tạo số ngẫu nhiên. Cái này mình sẽ trình bày sau nếu có thời gian.<br>
Và đây là demo của mình: <br>
![](https://images.viblo.asia/dd873b33-f678-4acf-83d4-5efd3b9bb8a8.png)<br>
# Kết luận
Vậy là qua bài viết hôm nay mình đã trình bày cho các bạn hiểu rõ về class cũng như cách sử dụng class để tạo nên đối tượng ứng dụng trong chính dự án của các bạn.<br>
Bài viết sau mình sẽ cố gắng trình bày thêm về phần class nâng cao hơn. Hy vọng các bạn sẽ tiếp tục theo dõi và ủng hộ. Thank you very much.