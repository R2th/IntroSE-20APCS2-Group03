Hi every body, rất vui được gặp lại các bạn trong loạt bài viết về ngôn ngữ Python. Ở bài trước, mình đã giới thiệu với các bạn cú pháp cơ bản về Python (mọi người có thể xem lại ở [đây](https://viblo.asia/p/python-language-LzD5dJDeZjY)). Hôm nay mình sẽ tiếp tục trình bày về các câu lệnh rẻ nhánh if-else và vòng lặp.
# Biến
Trước khi bắt đầu chúng ta hãy cùng tìm hiểu về biến trong Python nhé.<br>
Khác với các ngôn ngữ lập trình khác, Python không có câu lệnh khai báo biến. Một biến được tạo vào thời điểm đầu tiên bạn gán giá trị cho nó.
```
x = 1
y = "Jake"
```
Chính vì vậy nên chúng ta có thể thay đổi được kiểu dữ liệu cho biến sau đó.
```
x = 5 # Ở đây x có kiểu int
x = "Jake" # Ở đây x có kiểu là str
```
Tên biến có thể ở dạng tên ngắn (x, y, ...)  hay tên dài (age, yourName,...). Sau đây là một số các quy ước về tên biến Python:
* Tên biến phải được bắt đầu bằng một ký tự hoặc dấu gạch dưới. Không thể bắt đầu bằng ký tự số.
* Tên biến chỉ có thể chứa các ký tự số, các chữ cái, dấu gạch dưới (A-z, 0-9, và _).
* Lưu ý rằng tên biến trong Python có phân biệt hoa thường, do đó các biến name, Name và NAME là 3 biến hoàn toàn khác nhau.
# Cấu trúc rẻ nhánh if-else
Câu lệnh if được viết bằng cách sử dụng **if** keyword. Cú pháp được trình bày trong ví dụ sau đây:<br>
```
a = 5
b = 7
if b > a:
    print("b lớn hơn a")
```
Đoạn code trên sẽ kiểm tra xem b có lớn hơn a hay không. Nếu có thì in ra câu "b lớn hơn a". Thêm một việc nữa đó là hãy nhớ thụt lề sau mỗi lệnh if nếu không thì sẽ nhận được một **IndentationError** nhé.<br>
Với câu lệnh if có nhiều biểu thức điều kiện thì Python cung cấp cho chúng ta **elif** và **else** keyword.<br>
```
a = 5
b = 7
if b > a:
  print("b lớn hơn a")
elif a == b:
  print("a bằng b")
else:
  print("a lớn hơn b")
```
Lưu lại với tên file là demo.py rồi chạy ta được kết quả như hình. À quên mất, các bạn nhớ thêm câu `# -*- coding: utf-8 -*-a` vào đầu file để chiến được tiếng Việt nhé.
![](https://images.viblo.asia/ce223ded-9f6e-41a2-9c1f-b4774b784ab8.png)<br>
Ngoài ra, Python còn cung cấp cách viết gọn cho cấu trúc if-else lần lượt như sau:
```
if a > b: print("a lớn hơn b") #viết gọn cho 1 câu thực thi sau if.
print("A") if a > b else print("B") #viết gọn cho 1 cặp if-else.
```
# Vòng lặp
Python hỗ trợ 2 loại vòng lặp đó là:
## Vòng lặp while
Vòng lặp while được dùng để thực thi 1 hoặc 1 khối lệnh cho đến khi nào biểu thức điều kiện còn đúng. Ví dụ dưới đây in ra màn hình các số từ 1 đến 5
```
i = 1
while i < 6:
  print(i)
  i += 1
```
![](https://images.viblo.asia/184baf9f-874d-4b4e-ab5e-8061baeccb70.png)<br>
Chúng ta cũng có thể dùng **break** để thoát ra khỏi vòng lặp hoặc **continue** để đi đến vòng lặp tiếp theo sao cho phù hợp với yêu cầu bài toán.
## Vòng lặp for
Vòng lặp for trong Python được dùng để lặp qua các phần tử liên tục của một chuỗi liên tục (có thể là một list, tuple, set, dictionary,...).
```
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
```
Ở ví dụ trên ta sẽ dùng vòng lặp for để duyệt qua từng phần tử của một list có tên là fruits sau đó in ra màn hình các phần tử đó.
![](https://images.viblo.asia/87c09985-3af2-411e-a59f-d6f1597149e3.png)<br>
# Ví dụ
Trên đây là tổng hợp những gì mình biết về cấu trúc rẻ nhánh if-else cũng như cấu trúc vòng lặp của Python. Nói lý thuyết xuôi thì có vẻ hơi khan nên mình sẽ làm thêm 1 ví dụ có ứng dụng những cấu trúc đã học vào để cho các bạn dễ hình dung hơn. <br>
Bài toán chúng ta đặt ra ở đây là tính tổng các số chẳn và các số lẽ từ 1 đến 10 rồi in ra màn hình.
```
totalOfOdd = 0
totalOfEven = 0
i = 1;
while i <= 10:
	if (i % 2) == 0:
		totalOfEven += i
	else:
		totalOfOdd += i
	i += 1
print('The total of even number: ',totalOfEven)
print('The total of odd number: ',totalOfOdd)
```
Kết quả:
![](https://images.viblo.asia/129a6e2f-0a3c-45e6-9094-cf02322706f9.png)<br>
Như vậy là chúng ta đã cùng nhau tìm hiểu xong về cấu trúc rẻ nhánh if-else và vòng lặp. Thông qua ví dụ nêu trên mình hy vọng các bạn đã phần nào hiểu rõ hơn về các khái niệm cũng như cách sử dụng của cấu trúc rẻ nhánh trong  ngôn ngữ lập trình Python. Xin chào và hẹn gặp lại :)