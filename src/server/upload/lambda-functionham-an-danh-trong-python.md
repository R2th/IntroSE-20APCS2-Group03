Chào các bạn trong bài viết này, mình sẽ giới thiệu với các bạn về  `Lambda Function` còn được gọi là các hàm ẩn danh.Mình sẽ giải thích cho các bạn hiểu về khái niệm của chúng là gì, cú pháp và cách xử dụng của chúng. Các bạn cùng tìm hiểu trong bài viết của mình nhé!



###  Khái niệm Lambda Function(hàm ẩn danh) trong Python
Trong Python, một hàm ẩn danh là một hàm được định nghĩa mà không có tên. Trong khi các hàm bình thường sẽ được định nghĩa bằng các từ khóa `def` trong Python, thì các hàm ẩn danh sẽ được định nghĩa bằng từ khóa `lambda`.
Vì vậy các hàm ẩn danh còn được gọi là các `Lambda Function`.

----

###  Làm cách nào xử dụng Lambda Function trong Python?
Một `lambda function` trong Python  sẽ có cú pháp như sau:

####  Cú pháp của  Lambda Function trong python
``` html
lambda arguments: expression
```

Các hàm lambda có thể có bất kỳ số đối số nào nhưng chỉ có một biểu thức. Biểu thức được đánh giá và trả về. Các  `lambda function` có thể được sử dụng ở bất cứ chỗ  nào yêu cầu các đối tượng hàm.

----
####  Ví dụ về  Lambda Function trong python

Dưới đây là một ví dụ về `lambda function` để xử lý việc tăng gấp đôi giá trị đầu vào:

``` html
#Ví dụ về việc sử dụng các Lambda Function trong Python
double = lambda x: x * 2

print(double(5))
```

Kết quả:
``` html
10
```

Ở ví dụ trên `lambda x: x * 2` sẽ là hàm lamba. Ở đây `x` là đối số vào `x*2` là biểu thức được đánh giá và trả về.

Function này sẽ không có tên. Nó trả về một object được định danh là `double`. Giờ thì chúng ta có thể gọi nó như một hàm bình thường. Ví dụ:
``` html
double = lambda x: x * 2
```
Nó sẽ tương tự như các khai báo function như sau:

``` html
def double(x):
   return x * 2
```

----
###  Xử dụng Lambda Function trong Python

Chúng ta thường sử dụng `lambda function` khi mà  cần một hàm không tên trong một khoảng thời gian ngắn.

Trong Python, chúng ta thường sử dụng `lambda function` làm đối số cho một hàm bậc cao hơn (một hàm mà có thể nhận các hàm khác làm đối số). `Lambda function` thường được sử dụng cùng với các hàm tích hợp sẵn như `filter()`, `map()`...

#### Ví dụ khi xử dụng Lambda Function với Filter()

Hàm `filter()` trong Python nhận một hàm và một danh sách làm đối số.
Hàm được gọi với tất cả các items trong danh sách và một i danh sách mới được trả về chứa các items mà hàm đánh giá là `True`.

Đây là một ví dụ sử dụng hàm `filter()` để chỉ lọc ra các số chẵn từ danh sách.

``` html
my_list = [1, 5, 4, 6, 8, 11, 3, 12]

new_list = list(filter(lambda x: (x%2 == 0) , my_list))

print(new_list)
```

Kết quả:
``` html
[4, 6, 8, 12]
```

#### Ví dụ khi xử dụng Lambda Function với map()

Hàm `map()` trong Python nhận một hàm và một danh sách.

Hàm được gọi với tất cả các items trong danh sách và một danh sách mới được trả về chứa các item được hàm đó for each cho từng item.
Đây là một ví dụ sử dụng hàm `map()` để nhân đôi tất cả các mục trong một danh sách.

``` html
my_list = [1, 5, 4, 6, 8, 11, 3, 12]

new_list = list(map(lambda x: x * 2 , my_list))

print(new_list)
```

Kết quả:
``` html
[2, 10, 8, 12, 16, 22, 6, 24]
```

#### Ưu điểm
Ưu điểm khi sử dụng `Lambda Function` theo tìm hiểu các nhân mình thấy thì nó sẽ viết khá ngắn gọn. Tối ưu khi viết Code là rất tốt.
Rất tối ưu khi cần xử lý logic trong một chỗ nhất định trong 1 khoảng thời gian ngắn

#### Nhược  điểm

Ưu điểm khi sử dụng `Lambda Function` theo mình thì sẽ rất khó cho việc `debug` và `maintenance`.

----

#### Kết Luận
Dưới đây mình đã giới thiệu với các bạn về `Lambda Function` khái niệm, các xử dụng và một số ví dụ sử dụng Lambda Function trong Python. Hi vọng các bạn thích bài viết này.
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://www.programiz.com/python-programming/anonymous-function