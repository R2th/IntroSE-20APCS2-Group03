Hi every body! Ở bài trước thì mình có giới thiệu cũng như ví dụ demo về biến và cấu trúc rẽ nhánh trong Python (ai chưa xem thì có thể xem lại tại [đây](https://viblo.asia/p/cau-truc-re-nhanh-trong-python-E375zW4RKGW)). Và như thường lệ để tiếp tục với loạt bài tìm hiểu về Python hôm nay, chúng ta sẽ đi tìm hiểu về functions (sau này mình xin phép được gọi bằng ngôn ngữ quen thuộc của chúng ta là "hàm" nhé) trong Python cũng như một số ứng dụng của nó.
# Khái niệm
Trước hết thì mình có tìm thấy khái niệm về hàm bằng tiếng anh như sau:
> A function is a block of code which only runs when it is called. We can pass data, known as parameters, into a function. A function can return data as a result.

Và sau khi dùng tran-sờ-lết của chị google thì mình đã có được kết quả là: <br>Hàm là một khối các câu lệnh mà chỉ được thực thi khi nó được gọi đến. Chúng ta có thể đưa dữ liệu vào trong hàm như là tham số của hàm đó. Và một hàm có thể trả về dữ liệu như là kết quả.<br>
Trông có vẻ hơi khó hiểu đúng không nào? Các bạn đừng quá lo lắng, hãy xem tiếp những phần dưới đây và các bạn sẽ thấy hàm cũng không khó lắm đâu :)
# Hàm trong Python
## Cú pháp
Để tạo một hàm trong Python thì các bạn cần sử dụng từ khóa **def**. Cú pháp khai báo và định nghĩa một hàm như sau:<br>
```
def nameOfFunction ([listOfParameters]):
    enter your code here
    
    [return theReturnValue]
```
## Hàm không có tham số và giá trị trả về.
```
def printHelloWorld ():
    print("Hello World!")
# Khi sử dụng chỉ cần gọi tên hàm là được: printHelloWorld()
```
Trong ví dụ trên mình tạo một hàm in ra dòng "Hello World!". Hàm này mình không dùng danh sách tham số cũng như không cấp giá trị trả về cho nó. Và như vậy, sau này mỗi khi mình muốn in ra "HelloWorld!" nhưng lười gõ thì mình chỉ việc gọi **printHelloWorld()** bao nhiêu lần tùy thích mà thôi.<br>
## Hàm có tham số và giá trị trả về.
```
def findGreaterNumber(a, b):
	if a > b:
		return a
	else:
		return b

print(findGreaterNumber(5, 7))
print(findGreaterNumber(9, 3))
```
Lưu vào file demo.py và thực thi ta sẽ có kết quả như sau:
![](https://images.viblo.asia/cb2b4379-885f-4ac0-bfa6-6a8a31655909.png)<br>
## Hàm có tham số với giá trị mặc định
Các bạn cũng có thể đưa một List vào như là một tham số của hàm đó:
```
def printElementOfList(yourList = []):
	if len(yourList):
		for element in yourList:
			print(element)
	else:
		print("There are not element in this list")

yourList = ["element 1", "element 2", "element 3"]

printElementOfList(yourList)
printElementOfList()
```
Và đây là kết quả:
![](https://images.viblo.asia/a7cce01e-723a-4962-b7b0-aa0d61edd9a2.png)<br>
# Bài tập áp dụng
Sau đây mình sẽ áp dụng những hiểu biết về hàm để viết một chương trình đơn giản dùng để tính tổng, hiệu, tích, thương của 2 số nhập vào từ bàn phím.
```
def SumOf(a, b): # Hàm tính tổng
	return a + b

def SubOf(a, b): # Hàm tính hiệu
	return a - b

def MulOf(a, b): # Hàm tính tích
	return a * b

def DivOf(a, b): # Hàm tính thương
	if b == 0:
		return "Could not division by zero"
	else:
		return a / b

a = int(input("Enter number a: ")) # Dùng hàm input để nhập từ bàn phím
b = int(input("Enter number b: ")) # rồi ép kiểu sang int để tiếp tục

print(SumOf(a, b))
print(SubOf(a, b))
print(MulOf(a, b))
print(DivOf(a, b))
```
Ý nghĩa của mỗi dòng code mình đã comment ở trên, các bạn có thể lưu lại vào file và chạy demo thử. Và dưới đây là kết quả của mình:<br>
![](https://images.viblo.asia/61c2c24f-6f13-42e7-b0ec-7d39d355e83d.png)<br>
# Kết luận
Trên đây là đóng gói tất cả những gì mình biết về hàm trong Python của mình. Các bạn nếu thấy cần bổ sung ở đâu thì có thể comment ở dưới nhá. Hy vọng sau bài viết này sẽ giúp các bạn hiểu rõ hơn về hàm và cách sử dụng trong ứng dụng Python. <br>Và cuối cùng chúc các bạn may mắn và hẹn gặp lại trong các bài viết sau nhé :)