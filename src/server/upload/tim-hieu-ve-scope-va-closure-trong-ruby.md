### Trong bài viết này, chúng ta hãy cùng nhau tìm hiểu và làm rõ định nghĩa về Scope, Closure trong Ruby
# I. Scope trong Ruby
### Định nghĩa:

Scope là miền được sinh ra bởi một Class, Module hoặc một method, bao gồm tất cả những variable nằm bên trong miền đó.

The Top Level: Là miền chương trình phía ngoài cùng, bao gồm tất cả những phần không thuộc bất cứ một scope nào, nó thuộc sự quản lí của MainObject 

### Chúng ta sẽ đi sâu vào phân tích Scope qua từng ví dụ dưới đây:
![](https://images.viblo.asia/f923a81f-225e-477f-b198-67f2903ba791.png)

Kết quả thu được là một số 1 và một lỗi:

`NameError: undefined local variable or method ‘x’ for main:Object`

Chúng ta có thể thấy được, biến x nằm ở TopLevel không thể được truy cập từ phía bên trong của method!
![](https://images.viblo.asia/b23b7ac6-7859-47c3-a786-dd64c383be56.png)

Để rõ ràng hơn, hãy hỏi chính Ruby về các biến của nó:

```
x = 1
p "Local variables at the top level : #
{local_variables}"
def test
p "Local variables inside the test method : #
{local_variables}"
end
test
```
Kết quả:
```
Local variables at the top level : [:x]
Local variables inside the test method : []
```
Điều này cho thấy, ở TopLevel chúng ta có một biến Local là x. Trong khi đó, ở trong method, không có bất cứ một biến Local nào.
Bất kì một biến này được định nghĩa trong một method, thì sau khi ra khỏi phạm vi scope của method ấy, các biến sẽ bị xóa bỏ.![](https://images.viblo.asia/bd973d6d-0a58-4f4c-b84f-e90938bfabe0.png)

Hình minh họa về phạm vị của scope đối với một method
### Biến local trong các scope khác nhau
Chuyện gì sẽ xảy ra khi chúng ta định nghĩa một biến local bên trong một toplevel method? Haỹ xem một ví dụ đơn giản dưới đây về việc định nghĩa một biến local ở topLevel và bên trong một topLevel method.

```
x = 1
p "At top level x is : #{x}"
def test
 x = 2
 p "Inside the top level method x is : #{x}"
end
test
p "Back at the top level x is : #{x}"
```

Kết quả:
```
At top level x is : 1
Inside the top level method x is :  2
Back at the top level x is : 1
```
![](https://images.viblo.asia/09e15175-3c57-4a99-95dd-8dba5b9b8660.png)

Đó là lí do tại sao chúng ta thấy x ở trong topLevel có giá trị bằng 1 trong khi ở trong method `test` lại có giá trị bằng 2. Tên biến là giống nhau, nhưng nó năm trong 2 scope khác nhau. Vì vậy chúng là 2 object khác nhau.
![](https://images.viblo.asia/c3dd0dad-217e-471b-94c0-630e4dab01e5.png)

Chúng ta sẽ tiếp tục tìm hiểu chuyện gì xảy ra tiếp theo khi cố gẵng call một biến được khởi tạo ở topLevel bên trong một class:
```
x = 1
class A
  p x
end
```
Kết quả:
`NameError:	undefined	local	variable	or	method	‘x’	 for A:Class`

Lý do tuơng tự: Biến x được định nghĩa ở trong TopLevel chứ không được định nghĩa trong class
![](https://images.viblo.asia/75dd8e8f-0baa-42bd-8f75-d7271e5be158.png)
Trường hợp này cũng xảy ra tuơng tự đối với module và method khác nhau. Bản chất ở đây là các biến được định nghĩa ở các scope khác nhau thì là hai object khác nhau, có object_id và vị trí lưu trong bộ nhớ khác nhau.
# II. Colsure trong Ruby
Trước hết, khi gặp một định nghĩa mới, chúng ta thường tự hỏi: "Nó là cái gì". Vậy thì Closure là cái gì?
Trong Ruby, Closure được định nghĩa là một anonymous function, trỏ đến chính bối cảnh mà nó được tạo ra.

Chúng ta sẽ xem xét tí mỉ Closure thông qua các ví dụ dưới đây:
```
x = 0
seconds = -> {x}
p seconds.call
```
Đuơng nhiên, chúng ta cũng đoán ra được kết quả trả về:

```
0
```
Tiếp theo, hãy cũng thay đổi giá trị của x và in nó ra:
```
x = 0
seconds = -> {x}
p seconds.call

x = 1
p.seconds.call
```

Kết quả:
```
0
1
```
Giá trị của x thay đổi thành 1 sau khi một block object dược khởi tạo. Tuy nhiên, sự thay đổi vẫn được phản ánh khi thực thi code trong block. Điều nay khẳng định x đang tham chiếu đến một Fixnum object.
![](https://images.viblo.asia/eed14c23-8d70-4d10-b7a0-0f69f7faf32c.png)

Nếu ta thay đổi tham chiếu đến một Fixnum Object khác, x sẽ trỏ đến object mới
![](https://images.viblo.asia/e51a6b16-1ba7-4e3c-814b-8747e78ab7f4.png)

### Thay đổi giá trị bên trong một block
Chúng ta cùng nhau xem xét ví dụ dưới đây"
```
x= 0
seconds = -> {x += 1}
p seconds.call
p seconds.call
p seconds.call
p seconds.call
```

Kết quả:
```
1
2
3
4
```
Ở đây, khi block object được khởi tạo, biến x trong block đã tham chiếu đên object Fixnum được khởi tạo ở cũng scope. Khi có sự thay đổi giá trị trong block thì giá trị của object Fixnum(ở đây là x) cũng thay đổi theo.

### Thực thi một block bên trong một scope khác
```
x= 0
seconds = -> { x += 1 }
def tester(s)
  x = 100
  p s.call
  p s.call
  p s.call
  p s.call
end
tester(seconds)
```
Kết quả:
```
1
2
3
4
```
Rõ ràng biễn `x` ở trong method test có giá trị là 100, nhưng nó không tác động đến Proc object. Điểu này thể hiện biễn` x` bên trong Proc object đã tham chiếu đến biến `x` nơi mà nó được khởi tạo (cụ thể ở đây là: `seconds = -> { x += 1 }` khởi tạo tại topLevel, nó sẽ tham chiếu đến biễn `x `ở topLevel)
![](https://images.viblo.asia/908122a8-f3a0-482e-84b7-574be1e4acd3.png)
## Kết Luận

Qua những ví  dụ trên, hi vọng chúng ta phần nào hiểu rõ hơn về scope và closure trong Ruby.

Hẹn gặp các bạn trong những bài tiếp theo!!