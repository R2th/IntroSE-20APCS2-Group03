Trong Python, chuỗi là chuỗi ký tự, được lưu trữ một cách hiệu quả trong bộ nhớ dưới dạng đối tượng. Mỗi đối tượng có thể được xác định bằng cách sử dụng phương thức id (), như bạn có thể thấy ví dụ bên dưới. Python cố gắng tái sử dụng các đối tượng trong bộ nhớ có cùng giá trị, cũng làm cho việc so sánh các đối tượng rất nhanh trong Python:
```
$ python
Python 2.7.9 (default, Jun 29 2016, 13:08:31)  
[GCC 4.9.2] on linux2
Type "help", "copyright", "credits" or "license" for more information.  
>>> a = "abc"
>>> b = "abc"
>>> c = "def"
>>> print (id(a), id(b), id(c))
(139949123041320, 139949123041320, 139949122390576)
>>> quit()
```
Để so sánh các chuỗi, Python cung cấp một vài toán tử khác nhau để so sánh. Đầu tiên, chúng ta sẽ giải thích chi tiết hơn bên dưới. Thứ hai, chúng ta sẽ đi qua cả chuỗi và các module re, chứa các phương thức để xử lý các trường hợp không phân biệt dạng chữ và không chính xác. Thứ ba, để xử lý các chuỗi nhiều dòng, module difflib khá tiện dụng. Một số ví dụ sẽ giúp bạn hiểu cách sử dụng chúng.
# 1. Toán tử == và! =
Là toán tử so sánh cơ bản, bạn sẽ muốn sử dụng == và! =. Chúng hoạt động chính xác giống như với các giá trị số nguyên và float. Toán tử == trả về True nếu có kết quả khớp chính xác, nếu không False sẽ được trả về. Ngược lại, toán tử! = Trả về True nếu không có match và ngược lại trả về False. ví dụ dưới chứng minh điều này.

Trong vòng lặp for, một chuỗi có chứa tên của thành phố Thụy Sĩ "Lausanne" được so sánh với một mục nhập từ danh sách các địa điểm khác và kết quả so sánh được in trên thiết bị xuất.
```
# define strings
listOfPlaces = ["Berlin", "Paris", "Lausanne"]  
currentCity = "Lausanne"

for place in listOfPlaces:  
    print ("comparing %s with %s: %s" % (place, currentCity, place == currentCity))

>>>
$ python3 comparing-strings.py
comparing Berlin with Lausanne: False  
comparing Paris with Lausanne: False  
comparing Lausanne with Lausanne: True  
```
# 2 . Toán tử == và is  
Python có hai toán tử so sánh == và is. Ngay từ cái nhìn đầu tiên, chúng dường như giống nhau, nhưng thực ra chúng không giống nhau. == so sánh hai biến dựa trên giá trị thực của chúng. Ngược lại, toán tử is so sánh hai biến dựa trên id đối tượng và trả về True nếu hai biến tham chiếu đến cùng một đối tượng.

Ví dụ tiếp theo cho thấy rằng đối với ba biến có giá trị số nguyên. Hai biến a và b có cùng giá trị, và Python đề cập đến cùng một đối tượng để giảm thiểu mức sử dụng bộ nhớ.
```
>>> a = 1
>>> b = 1
>>> c = 2
>>> a is b
True  
>>> a is c
False  
>>> id(a)
10771520  
>>> id(b)
10771520
```
Ngay khi giá trị thay đổi, Python sẽ khôi phục lại đối tượng và gán biến. Trong đoạn mã tiếp theo b nhận giá trị là 2, và sau đó b và c tham chiếu đến cùng một đối tượng.
```
>>> b = 2
>>> id(b)
10771552  
>>> id(c)
10771552  
```
Một nguyên tắc để làm theo là sử dụng == khi so sánh các loại bất biến (như ints) và is khi so sánh các đối tượng.
# 3. Các loại so sánh khác
Để so sánh về thứ tự mảng, bạn có thể sử dụng toán tử so sánh <,>, <= và> =. Việc so sánh chính nó được thực hiện giữa các charactor. Thứ tự phụ thuộc vào thứ tự của các ký tự trong bảng chữ cái. Thứ tự này phụ thuộc vào bảng ký tự đang được sử dụng trên máy của bạn trong khi thực thi mã Python. Hãy nhớ rằng thứ tự phân biệt chữ hoa chữ thường. Ví dụ cho bảng chữ cái Latinh, "Bus" xuất hiện trước "bus". ví dụ sau cho thấy các toán tử so sánh này hoạt động như thế nào trong thực tế.
```
# define the strings
listOfPlaces = ["Berlin", "Paris", "Lausanne"]  
currentCity = "Lausanne"

for place in listOfPlaces:  
    if place < currentCity:
            print ("%s comes before %s" % (place, currentCity))
    elif place > currentCity:
            print ("%s comes after %s" % (place, currentCity))
    else:
            print ("%s is similar to %s" % (place, currentCity))
>>>
$ python3 comparing-strings-order.py
Berlin comes before Lausanne  
Paris comes after Lausanne  
Lausanne is similar to Lausanne  
```
# 4. So sánh không phân biệt chữ hoa chữ thường
Các ví dụ trước tập trung vào các kết hợp chính xác giữa các chuỗi. Để cho phép so sánh phân biệt dạng chữ, Python cung cấp các phương thức chuỗi đặc biệt như upper () và lower (). Cả hai đều có sẵn trực tiếp dưới dạng các phương thức của đối tượng chuỗi theo. upper () chuyển đổi toàn bộ chuỗi thành chữ in hoa và thấp hơn () thành chữ thường, tương ứng. Danh sách tiếp theo cho thấy cách sử dụng phương thức lower ().
```
# using the == operator
listOfPlaces = ["Berlin", "Paris", "Lausanne"]  
currentCity = "lausANne"

for place in listOfPlaces:  
    print ("comparing %s with %s: %s" % (place, currentCity, place.lower() == currentCity.lower()))
>>>
$ python3 comparing-strings-case-insensitive.py
comparing Berlin with lausANne: False  
comparing Paris with lausANne: False  
comparing Lausanne with lausANne: True  
```
# 5. Sử dụng Regular Expression hoặc "regex" 
Để sử dụng cơ chế này trong Python, hãy import re module đầu tiên và xác định một mẫu cụ thể, tiếp theo. Mẫu tìm kiếm khớp với "bay" và bắt đầu bằng chữ thường hoặc chữ hoa. Chính xác, mã Python sau tìm tất cả các chuỗi trong đó mẫu tìm kiếm xảy ra bất kể vị trí của chuỗi - ở đầu, hoặc ở giữa, hoặc ở cuối.
```
import re

# define list of places
listOfPlaces = ["Bayswater", "Table Bay", "Bejing", "Bombay"]

# define search string
pattern = re.compile("[Bb]ay")

for place in listOfPlaces:  
    if pattern.search(place):
        print ("%s matches the search pattern" % place)
>>>
$ python3 comparing-strings-re.py
Bayswater matches the search pattern  
Table Bay matches the search pattern  
Bombay matches the search pattern  
```
# 6. So sánh nhiều dòng và danh sách
Sử dụng mô-đun difflib Python cũng cung cấp cách so sánh các chuỗi nhiều dòng và toàn bộ danh sách các từ. Đầu ra có thể được cấu hình theo các định dạng khác nhau của các công cụ khác nhau.

Ví dụ tiếp theo so sánh hai chuỗi nhiều dòng theo từng dòng và hiển thị các xóa cũng như các bổ sung. Sau khi khởi tạo đối tượng Differ trong dòng 12, phép so sánh được thực hiện bằng phương thức compare () trong dòng 15. Kết quả được in trên stdout (dòng 18).
```
# import the additional module
import difflib

# define original text
# taken from: https://en.wikipedia.org/wiki/Internet_Information_Services
original = ["About the IIS", "", "IIS 8.5 has several improvements related", "to performance in large-scale scenarios, such", "as those used by commercial hosting providers and Microsoft's", "own cloud offerings."]

# define modified text
edited = ["About the IIS", "", "It has several improvements related", "to performance in large-scale scenarios."]

# initiate the Differ object
d = difflib.Differ()

# calculate the difference between the two texts
diff = d.compare(original, edited)

# output the result
print ('\n'.join(diff))
```
Các dòng có xóa được biểu thị bằng dấu - trong khi các dòng có phần bổ sung bắt đầu bằng dấu +. Hơn nữa, các dòng có thay đổi bắt đầu bằng dấu chấm hỏi. Thay đổi được chỉ định bằng cách sử dụng ^ dấu hiệu ở vị trí theo. Các dòng không có chỉ báo vẫn giống nhau.
```
$ python comparing-strings-difflib.py
  About the IIS

- IIS 8.5 has several improvements related
?  ^^^^^^

+ It has several improvements related
?  ^

- to performance in large-scale scenarios, such
?                                        ^^^^^^

+ to performance in large-scale scenarios.
?                                        ^

- as those used by commercial hosting providers and Microsoft's
- own cloud offerings.
```
nguồn : https://stackabuse.com/comparing-strings-using-python/