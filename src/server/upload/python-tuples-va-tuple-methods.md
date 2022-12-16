Tuples là gồm chuỗi các mục được sắp xếp, giống như lists . Sự khác biệt chính giữa các tuple và lists là tuples không thể thay đổi (immutable) không giống như lists có thể (mutable). Đối với người lập trình mới tiếp cận với python thì list và dict có lẽ sẽ dễ tiếp cận hơn tuple
# 1. Khởi tạo một Tuple
Có hai cách để khởi tạo một tuple trống. Bạn có thể khởi tạo một tuple trống bằng cách có () không có giá trị nào trong chúng.
```
# Way 1
emptyTuple = ()
```
Bạn cũng có thể khởi tạo một tuple trống bằng cách sử dụng function tuple.
```
# Way 2
emptyTuple = tuple()
```
Một tuple với các giá trị có thể được khởi tạo bằng cách tạo một chuỗi các giá trị được phân tách bằng dấu phẩy.
```
# way 1
z = (3, 7, 4, 2)
# way 2 (tuples can also can be created without parenthesis)
z = 3, 7, 4, 2
```
![](https://images.viblo.asia/9f8e1344-1277-49c1-a6b3-a897b628bb69.png)
Điều quan trọng cần lưu ý là nếu bạn muốn tạo một tuple chỉ chứa một giá trị, bạn cần có dấu phẩy sau mục của bạn.
```
# tuple with one value
tup1 = ('Michael',)
# tuple with one value
tup2 = 'Michael', 
# This is a string, NOT a tuple.
notTuple = ('Michael')
```
   # 2.  Truy cập các giá trị trong Tuples
![](https://images.viblo.asia/21738298-d212-4191-8718-9ad9342cfef1.png)
Mỗi giá trị trong một tuple có một index được gán. Điều quan trọng cần lưu ý là python là ngôn ngữ dựa trên index 0. Tất cả điều này có nghĩa là giá trị đầu tiên trong tuple nằm ở chỉ số 0.
```
# Initialize a tuple
z = (3, 7, 4, 2)
# Access the first item of a tuple at index 0
print(z[0])
```
Python cũng hỗ trợ lập index âm. Index âm bắt đầu từ cuối bộ. Đôi khi có thể thuận tiện hơn khi sử dụng lập index âm để lấy mục cuối cùng trong một tuple vì bạn không cần phải biết chiều dài của một tuple để truy cập vào mục cuối cùng.
![](https://images.viblo.asia/302b0c1c-d0bb-483d-98f9-a5181a0614e8.png)
```
# print last item in the tuple
print(z[-1])
```
# 3. Cắt Tuple 
Slices trả về một tuple mới có chứa các mục được yêu cầu. Slices là cách tốt để có được một tập hợp con các giá trị trong tuple của bạn. Đối với mã ví dụ bên dưới, nó sẽ trả về một tuple với các mục từ index 0 trở lên và không bao gồm index 2.
![](https://images.viblo.asia/81ce06c3-422f-4eff-8ef1-8184209e3c96.png)
```
# Initialize a tuple
z = (3, 7, 4, 2)
# first index is inclusive (before the :) and last (after the :) is not.
print(z[0:2])
>>>(3,7)
# everything up to but not including index 3
print(z[:3])
>>> (3,7,4)
# You can even make slices with negative indexes.
print(z[-4:-1])
>>> (3,7,4)
```
# 4. Tuples là bất biến
Tuples là bất biến, điều đó có nghĩa là sau khi khởi tạo một tuple, không thể cập nhật các mục riêng lẻ trong một bộ. Như bạn có thể thấy trong đoạn mã bên dưới, bạn không thể cập nhật hoặc thay đổi giá trị của các mục tuple (điều này khác với list Python có thể thay đổi).
![](https://images.viblo.asia/ab689702-b476-4106-9d74-0876803b1cb1.png)
Mặc dù các tuple là bất biến, có thể lấy các phần của tuple hiện có để tạo tuple mới như ví dụ sau đây minh họa.
![](https://images.viblo.asia/4d51acf6-a560-4e73-b5d7-9c797246bfa8.png)
# 5. Tuple Methods
![](https://images.viblo.asia/17fde94b-982e-4741-90ba-84435f2dac0a.png)
Trước khi bắt đầu phần này, trước tiên, hãy khởi động một tuple.
```
# Initialize a tuple
animals = ('lama', 'sheep', 'lama', 48)
```
* index method: trả về giá trị xuất hiện đầu tiên 
```
print(animals.index('lama'))
>>> 0 
```
* count method: trả về số lần xuất hiện giá trị
```
print(animals.count('lama'))
>>> 2
```
# 6. Advantages of Tuples over Lists
List và tuple là các loại dữ liệu Python tiêu chuẩn lưu trữ các giá trị theo một chuỗi.  Một tuple là bất biến trong khi một list là có thể thay đổi. Dưới đây là một số lợi thế khác của tuple trên danh sách (một phần từ Stack Overflow)
* Tuples nhanh hơn danh sách:  Nếu bạn xác định một tập hợp các giá trị không đổi và tất cả những gì bạn sẽ làm với nó là lặp lại thông qua nó, hãy sử dụng một tuple thay vì một danh sách. Sự khác biệt hiệu suất có thể được đo một phần bằng thư viện timeit cho phép bạn định thời gian mã Python của mình. Mã dưới đây chạy mã cho mỗi cách tiếp cận 1 triệu lần và xuất ra tổng thời gian cần thiết trong vài giây.

![](https://images.viblo.asia/a2b206d3-6897-4173-ad7e-2b774d04c986.png)
* Một số tuple có thể được sử dụng làm khóa dictionary (cụ thể là tuple có chứa các giá trị bất biến như chuỗi, số và tuple khác). Danh sách không bao giờ có thể được sử dụng làm khóa dictionary, vì danh sách không phải là bất biến .
![](https://images.viblo.asia/86234861-0acb-4eee-aa0c-ae15fb6938e5.png)
* Các tuple có thể được sử dụng làm giá trị trong các set khi list không thể
![](https://images.viblo.asia/25c477cf-6094-4ea6-9f6a-6df3ceaae683.png)
Nguồn : https://hackernoon.com/python-basics-9-tuples-tuple-manipulation-and-the-fibonacci-sequence-2d0da4e2d326