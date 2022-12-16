## String Concatenation

Khi chúng ta nói về concatenating strings, nó có nghĩa là chúng ta muốn thêm một chuỗi này vào cuối chuỗi khác. Khái niệm này chỉ một trong nhiều cách để thêm các biến string với nhau để hoàn thành một chuỗi lớn hơn. Ví dụ đầu tiên, để thêm ba chuỗi riêng biệt với nhau:

```python
# using the addition operator without variables
name = "John" + " " + "Smith"
print(name)
```

Output chúng ta sẽ có là **"John Smith"**. Chúng ta đã thêm hai chuỗi là tên và phân tách chúng bằng cách sử dụng một chuỗi có khoảng trắng bên trong.

```python
# using the addition operator with variables
first_name = "John"
last_name = "Smith"
full_name = first_name + " " + last_name
print(full_name)
```

Chúng ta được output chính xác giống như đọan code trước đó, tuy nhiên chúng ta đã sử dụng các biến để lưu trữ thông tin lần này.

## Formatting Strings

Trước đó chúng ta đã tạo full name trên đầy đủ bằng cách thêm nhiều chuỗi với nhau để tạo ra một chuỗi lớn hơn. Trong khi điều này là rất tốt để sử dụng, đối với các chuỗi lớn hơn, nó trở nên khó đọc. Hãy tưởng tượng rằng bạn phải tạo một chuỗi sử dụng 10 biến. Nối tất cả 10 biến vào một chuỗi là khó khăn để theo dõi, không đề cập đến đọc. Chúng ta cần phải sử dụng một khái niệm gọi là string formating. Điều này sẽ cho phép chúng ta viết toàn bộ chuỗi và thêm các biến chúng ta muốn sử dụng vào các vị trí thích hợp.

### .format()

Phương thức format hoạt động bằng cách đặt một dấu cách trực tiếp trong dấu ngoặc nhọn, theo sau là keywork "format". Trong dấu ngoặc đơn sau keywork là các biến sẽ được chèn vào chuỗi. Bất kể đó là loại dữ liệu nào, nó sẽ chèn vào chuỗi ở vị trí thích hợp, điều này đưa ra câu hỏi, làm thế nào để biết nó đặt ở đâu? Đó là nơi mà các dấu ngoặc nhọn. Thứ tự của dấu ngoặc nhọn là cùng thứ tự cho các biến trong ngoặc đơn format. Để bao gồm nhiều biến trong một chuỗi định dạng, bạn chỉ cần phân tách từng biến bằng dấu phẩy. Hãy cùng xem một số ví dụ:

```python
# injecting variables using the format method
name = "John"
print( "Hello { }".format(name) )
print( "Hello { }, you are { } years old!".format(name, 28) )
```

Chúng ta sẽ thấy rằng output trong dòng đầu tiên là **"Hello John"** và thứ hai là **"Hello John, you are 28 years old"**. Hãy nhớ rằng hàm format sẽ chèn các biến và thậm chí chính các kiểu dữ liệu. Trong trường hợp này, chúng ta đã chèn số nguyên 28.

### f Strings (New in Python 3.6)

Cách mới để đưa các biến vào một chuỗi trong Python là sử dụng cái mà chúng ta gọi là chuỗi **"f"**. Bằng cách đặt chữ cái **"f"** trước chuỗi, bạn có thể đưa một biến vào một chuỗi trực tiếp. Điều này rất quan trọng, vì nó làm cho chuỗi dễ đọc hơn khi dài hơn, làm cho nó trở thành phương thức ưa thích để định dạng chuỗi. Chỉ cần lưu ý rằng bạn cần Python 3.6 để sử dụng cái này; nếu không, bạn sẽ nhận được error. Để thêm một biến trong một chuỗi, chỉ cần bọc dấu ngoặc nhọn { } quanh tên của biến. Hãy nhìn vào một ví dụ:

```python
# using the new f strings
name = "John"
print( f"Hello {name}" )
```

Chúng ta sẽ nhận được cùng một output mà chúng ta đã nhận được với phương thức *.format ()* tuy nhiên, lần này nó dễ đọc code hơn nhiều.

## Formatting in Python 2

Python 2 không bao gồm phương thức .format (); thay vào đó, bạn sẽ sử dụng các ** percent operators** để đánh dấu vị trí của biến được chèn. Sau đây là một ví dụ để đưa biến *"name"*  đổi tên vào một vị trí của **"%s"** . Chữ cái sau toán tử phần trăm biểu thị kiểu dữ liệu. Đối với số nguyên(integer), bạn sẽ sử dụng **"%d"** cho chữ số. Sau khi chuỗi đóng, bạn sẽ đặt một toán tử phần trăm, theo sau là các biến bạn muốn sử dụng. Hãy nhìn vào một ví dụ:

```python
# one major difference between versions 2 & 3
name = 'John'
print('Hello, %s' % name)
```

Bạn có thể nhận thấy rằng chúng ta nhận được cùng một đầu ra như các phương thức trước đó. Nếu bạn muốn định dạng một chuỗi trong Python 2 với nhiều biến, thì bạn cần phải viết như sau:

```python
# python 2 multiple variable formatting
first_name = "John"
last_name = "Smith"
print( "Hello, %s %s" % (first_name, last_name) )
# surround the variables in parenthesis
```

Chúng ta sẽ nhận được output là  *“Hello, John Smith”*.  Khi truyền nhiều biến, bạn cần bao quanh các tên biến trong ngoặc đơn và phân tách từng biến bằng dấu phẩy. Lưu ý rằng cũng có hai biểu tượng trong chuỗi đại diện cho vị trí của từng biến tương ứng theo thứ tự từ trái sang phải.

### String Index

Một khái niệm quan trọng khác mà chúng ta cần hiểu về chuỗi là cách chúng được lưu trữ. Khi máy tính lưu một chuỗi vào bộ nhớ, mỗi ký tự trong chuỗi được gán cho cái mà chúng ta gọi là **"index"**. **Index** là một vị trí trong bộ nhớ. Hãy nghĩ về index như một vị trí trong một hàng mà bạn đang chờ đợi tại trung tâm mua sắm. Nếu bạn ở đầu hàng, bạn sẽ được cấp số index bằng 0. Người đứng sau bạn sẽ được trao vị trí chỉ số 1. Người đứng sau họ sẽ được trao vị trí chỉ số 2 và cứ thế.

Điều này cũng giống với các chuỗi trong Python. Nếu chúng ta lấy một chuỗi như kiểu *"Hello"* và phá vỡ các index của chúng, chúng ta có thể thấy rằng chữ cái *H* được đặt index là 0. Hãy để thử một ví dụ:

```python
# using indexes to print each element
word = "Hello"
print( word[ 0 ] ) # will output 'H'
print( word[ 1 ] ) # will output 'e'
print( word[ -1 ] ) # will output 'o'
```

Để gọi index một thành phần cụ thể, bạn sử dụng dấu ngoặc vuông ở bên phải tên biến. Trong các dấu ngoặc vuông đó, bạn đặt vị trí index bạn muốn truy cập. Trong trường hợp trước, chúng tôi đã truy cập vào hai phần tử đầu tiên trong chuỗi **"Hello"** được lưu trữ trong biến **"word"**.  Dòng cuối cùng truy cập phần tử ở vị trí cuối cùng.  Sử dụng số index âm sẽ dẫn đến việc cố gắng truy cập thông tin từ phía sau, như vậy -4 sẽ dẫn đến kết quả đầu ra của chữ cái *"e"*.

![](https://images.viblo.asia/674a473f-7bc4-42a9-993d-7d0a1cc540d0.png)


Hãy thật cẩn thận khi làm việc với các index. Index là một vị trí cụ thể trong bộ nhớ. Nếu bạn cố gắng truy cập một vị trí nằm ngoài phạm vi, bạn sẽ làm hỏng chương trình của mình vì nó cố gắng truy cập một vị trí trong bộ nhớ không tồn tại. Ví dụ: nếu chúng ta cố gắng truy cập index 5 trên trên *"Hello"*.

### String Slicing

Slicing được sử dụng chủ yếu với Python list; tuy nhiên, bạn cũng có thể sử dụng nó trong chuỗi. Slicing về cơ bản là khi bạn chỉ muốn một phần của biến, sao cho nếu chúng ta chỉ muốn "He" từ biến word. Chúng ta sẽ viết như sau:

```
print( word[ 0 : 2 ] ) # will output 'He'
```

Số đầu tiên trong ngoặc là index bắt đầu; thứ hai là index dừng lại.

```
variable_name[ start : stop : step ]
```

Chúng tôi ta bao dùng start và stop vì step là tùy chọn và mặc định tăng dần mỗi lần. Tuy nhiên, điều gì sẽ xảy ra nếu chúng ta muốn in mọi chữ cái khác:

```
print( word[ 0 : 5 : 2 ] ) # will output 'Hlo'
```

Bằng cách truyền step là số hai, nó sẽ tăng index lên hai lần thay vì một.

## Tài liệu tham khảo
https://docs.google.com/viewer?url=http://file.allitebooks.com/20191124/Python%20Projects%20for%20Beginners.pdf