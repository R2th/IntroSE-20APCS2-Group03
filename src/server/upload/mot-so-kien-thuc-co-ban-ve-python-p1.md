### Python là?
là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng, do Guido van Rossum tạo ra và lần đầu ra mắt vào năm 1991. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh ngắn gọn và có thể sử dụng các thư viện của C để làm các task xử lý tính toán nặng.
### Simple hello world:
Các bạn có thể tải pycharm để lập trình ở đây https://www.jetbrains.com/pycharm/
```
def hello_word(): // def ten_ham(param...):
        print("Simple hello world")

hello_word()  // goi ham

//Hàm có kết quả trả về.

 def sum(a, b):
   return a+ b

c = sum(4, 5);
print("Sum " + str(c))

// hàm có tham số mặc định có thể ko cần truyền tham số
def ten_ham(param = defaultValue): // defaultValue là giá trị mặc định của tham số đó mà bạn muốn gán. 
// ví dụ : def ten_ham(param = 5): 
    # code
```
### Intro: running the Python Shell 
Có thể chạy Python trên Shell  bằng cách gõ lệnh python trên Linux hoặc Mac (terminal) và mở Python Shell nếu trên Windows.
mở terminal Mac gõ python
![](https://images.viblo.asia/0f09a805-d1f1-49b7-b3bf-32ffb4129e2c.png)

ở đây là Python 2.7.10 nếu bạn muốn dùng Python 3 thì gõ : python3 
![](https://images.viblo.asia/4d03e1fd-b0a0-4d9f-bd53-4899fe221a15.png)

bạn có thể thấy python 3 và 2.7 khác nhau như sau:
```
Last login: Wed Feb 20 22:12:20 on console
idevBaos-MacBook-Pro:~ nguyen.van.bao$ python
Python 2.7.10 (default, Aug 17 2018, 19:45:58) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.0.42)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 5/3
1
>>> 

idevBaos-MacBook-Pro:~ nguyen.van.bao$ python3
Python 3.7.1 (v3.7.1:260ec2c36a, Oct 20 2018, 03:13:28) 
[Clang 6.0 (clang-600.0.57)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 5/3
1.6666666666666667
>>> 

// ở python 2.7 muốn lấy kiểu float thì bạn phải dùng 5.0/3.0
và đây là kết quả
Python 2.7.10 (default, Aug 17 2018, 19:45:58) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.0.42)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 5.0/3.0
1.6666666666666667
>>> 
// tiếp theo là toán tử '//' chia lấy số nguyên
>>> 5//1.5
3.0
>>> 5//2
2
>>> 5//1
5
>>> 
>>> 5%2 // lấy dư
1
>>> 5*2 // mũ 2
25
>>> 2e2 // 2x10x2
200.0
```

### Language Basics: Types
Trong Python, bạn có thể chuyển đổi từ loại này sang loại khác (ép kiểu) bằng cách gọi Type đó dưới dạng hàm (ví dụ: int (), str ()).
```
>>> str(2)
'2'
>>> a = str(5)
>>> int(a)
5
>>> 
```

### Language Basics: Conditionals
```
>>> 'Kteam' == "Kteam" // so sánh
True
>>> 'Free' == 'Education'
False

>>> lst = [1, 2, 3]
>>> lst_ = [1, 2, 3]
// bây giờ ta so sánh 2 mảng này với toán tử là == và is

>>> lst == lst_
True
// còn với is liệu kết quả trả về có phải là True đoán xem
>>> lst is lst_
False
// ở đây có thể giải thích theo mình hiểu là lst ko phải là lst_ mà 2 thằng này chỉ có giá trị giống nhau thôi
// thử tiếp mảng
>>> _lst = lst
>>> _lst
[1, 2, 3]
// bây h dùng is tiếp nhé 
>>> _lst is lst
True // vì đơn giản là 2 List này đang trỏ chung vào một địa chỉ khác nhau mỗi tên 
// Lưu ý toán tử is
>>> 99 is 99
True  
>>> a = 699
>>> b = 699
>>> a is b
False
>>> a = -5
>>> b = -5
>>> a is b
True 
// ở đây các bạn thấy có gì đó sai sai đúng không ạ thật ra thì 
// Các số từ -5 đến 256 hoặc là một số chuỗi có số kí tự dưới 20 thì các biến có cùng một giá trị sẽ có cùng một giá trị trả về từ hàm id.
>>> c = 256
>>> d = 256
>>> c is d
True
```
### NOT, AND và OR
![](https://images.viblo.asia/3165e663-a065-474c-a451-e6f7687a640a.png)

```
>>> True and True
True
>>> True and False
False
>>> False and True
False
>>> False and False
False

>>> True or True
True
>>> True or False
True
>>> False or True
True
>>> False or False
False

>>> not True
False
>>> not False
True

>>> False or not ((2==3)and(7<=5))
// giải từ từ nhé ((2==3)and(7<=5)) => False có not ở đầu nữa là => True , False or True => True
```

### Example program with if-else syntax:
![](https://images.viblo.asia/d8df33ea-95a4-4ff3-8c1d-bdd3f7560907.png)

### Language Basics: Loops
![](https://images.viblo.asia/a8c5aae0-b709-4cb9-b78a-9288395d6b54.png)

ở phần sau mình sẽ nói tiếp về Data Structures.