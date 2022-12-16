Trong hướng dẫn này, chúng ta sẽ xem xét cách khai thác sức mạnh của trình vòng lặp bằng cách sử dụng mô-đun itertools của Python
Mô-đun itertools cung cấp cho chúng ta một giao diện để tạo các trình vòng lặp nhanh và tiết kiệm bộ nhớ. Các trình vòng lặp này có thể là vô hạn, tổ hợp hoặc kết thúc.
# 1. Iterator vs Iterable
Một Iterator là một con trỏ thông minh có thể hướng dẫn (lặp lại) chúng ta qua các mục của một Iterator (vùng chứa) theo một thứ tự nhất định. Xem xét danh sách các màu cũng như danh sách các số nguyên:
```
colors = ['red', 'blue', 'pink']
ints = [1, 3, 5, 4, 2]
```
Mặc dù chúng tôi đã xác định các danh sách này theo một thứ tự cụ thể, chúng không phải được lưu trữ theo cùng một thứ tự khi được đặt trong bộ nhớ:
```
iterators:  it1                 it2 
             V                   V
memory:     red   4   2   blue   1    3    pink   5
```
Nếu chúng ta xem xét theo thứ tự bộ nhớ, chúng ta sẽ nhận được rằng phần tử thứ hai của mảng màu là 4, đó là lý do tại sao chúng ta cần các trình vòng lặp. Công việc của trình lặp là tìm phần tử tiếp theo của danh sách trong bộ nhớ, bất kể nó ở đâu. Điều này được thực hiện thông qua phương thức next () trả về phần tử tiếp theo mà trình vòng lặp trỏ đến. it1 sẽ rà soát bộ nhớ mà nó có quyền truy cập và trả về màu xanh lam trong khi it2 sẽ trả về 3 .

Một tính năng tuyệt vời của trình lặp là chúng ta có thể xác định cách chúng tìm kiếm các phần tử trong các vòng lặp tương ứng của chúng. Ví dụ, chúng ta có thể yêu cầu nó bỏ qua tất cả các số lẻ và trả về một tập hợp con. Điều này đạt được bằng cách triển khai phương thức next () tùy chỉnh hoặc bằng cách sử dụng itertools tích hợp sẵn cho phép chúng ta tạo trình lặp cụ thể để lặp qua các đối tượng theo nhiều cách khác nhau. Các công cụ lặp lại mà chúng ta sẽ đề cập đến là:
* compress()
* dropwhile()
* takewhile()
* groupby()

Mỗi hàm xây dựng trình vòng lặp này (chúng tạo ra các trình vòng lặp) có thể được sử dụng riêng hoặc được kết hợp với nhau.
# 2. compress() 
Hàm compress(data, selector) hàm tạo ra một trình lặp có chọn lọc các giá trị từ data theo danh sách boolean -selector. Nếu một giá trị từ
data tương ứng với một giá trị True trong selector nó sẽ được chọn và bỏ qua nếu không.
Nếu data and selector không cùng kích thước. compress() dừng lại khi data or selector danh sách đã hết:
```
# Importing the compress tool
from itertools import compress


cars = ['Audi', 'Volvo', 'Benz', 
        'BMW', 'Nissan', 'Mazda',
        'Ford']
        
selector = [True, True, False, False, 
            False, True, False]

# This makes an iterator that filters elements, 
# from data, for which selector values amount to True
my_cars = compress(cars, selector)

for each in my_cars:
	print(each)
```
Kết quả này trong:
```
Audi
Volvo
Mazda
```

Bộ chọn cũng có thể là danh sách các giá trị 1 và 0 hoặc bất kỳ giá trị trung thực / sai lệch nào.

Bạn thường có được các danh sách boolean này thông qua một số loại điều kiện, chẳng hạn như:
```
int_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
boolean_list = [True if x % 2 == 0 else False for x in int_list]

# OR

boolean_list = [1 if x % 2 == 0 else 0 for x in int_list]

print(boolean_list)
```
Ở đây, chúng tôi đã tạo boolean_list với giá trị True cho mỗi số chẵn:
```
[False, True, False, True, False, True, False, True, False, True]

# OR

[0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
```
Thông thường, để làm cho mọi thứ ngắn hơn - bạn sẽ sử dụng công cụ nén (), cũng như các công cụ khác mà không cần gán kết quả cho một biến mới:
```
S
A 
U 
S 
E
```
Ngoài ra, về mặt kỹ thuật, chúng tôi có thể trộn và kết hợp các giá trị trong bộ chọn với bất kỳ giá trị trung thực / sai lệch nào:
```
from itertools import compress

cars = ['Audi', 'Volvo', 'Benz',
        'BMW', 'Nissan', 'Mazda', 'Ford']

# Empty string is falsy, non empty is truthy
selector = [True, 1, 0, 0, '', 1, 'string']

for each in compress(cars, selector):
	print(each)
```
```
Audi
Volvo
Mazda
Ford
```
# 3. dropwhile()
Hàm dropwhile(criteria, sequence) tạo một trình lặp làm giảm (bỏ qua) mọi phần tử trong sequence,trả về True khi được chuyển qua hàm criteria.

 Hàm criteria thường là một hàm lambda nhưng không nhất thiết phải như vậy. Thông thường, nếu đó là một hàm đơn giản, nó được rút ngắn thành lambda, trong khi các hàm phức tạp thì không:
```
from itertools import dropwhile

int_list = [0, 1, 2, 3, 4, 5, 6]
result = list(dropwhile(lambda x : x < 3, int_list))

print(result)
```
Với hàm lambda này, mọi phần tử có giá trị nhỏ hơn 3 sẽ trả về True, vì vậy tất cả các phần tử nhỏ hơn 3 đều bị bỏ qua. Chúng bị loại bỏ trong khi tiêu chí là đúng:
```
[3, 4, 5, 6]
```
Thay vì một hàm lambda, chúng ta có thể xác định một hàm phức tạp hơn và chuyển một tham chiếu đến nó thay vào đó:
```
from itertools import dropwhile

def doesnt_contain_character(str):
    substring = 'a'
    if substring in str:
        return False
    else:
        return True
        
string_list = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
print(list(dropwhile(doesnt_contain_character, string_list)))
```
Ví dụ: phương thức này kiểm tra xem một chuỗi có chứa chuỗi con không - trong trường hợp này, chỉ cần a. Nếu chuỗi đã cho có chứa a, thì trả về False và nếu không chứa - thì trả về True. Do đó, tất cả các từ trong chuỗi, cho đến khi amet trả về True, và bị loại khỏi kết quả:
```
['amet']
```
Tuy nhiên, tất cả các yếu tố sau khi tiêu chí không đạt sẽ được bao hàm. Trong trường hợp của chúng tôi, mọi thứ sau phần tử 'amet' sẽ được bao gồm, bất kể tiêu chí:
```
from itertools import dropwhile

def doesnt_contain_character(str):
    substring = 'a'
    if substring in str:
        return False
    else:
        return True
        
string_list = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'a', 'b']
print(list(dropwhile(doesnt_contain_character, string_list)))
```
Thao tác này làm giảm các phần tử cho đến khi 'amet' và ngừng thả chúng sau đó:
```
['amet', 'a', 'b']
```
# 4. takewhile()
Hàm takewhile(criteria, sequence) chức năng là đối cực của dropwhile(). Nó bảo tồn tất cả các phần tử mà hàm không bị lỗi. Hãy viết lại ví dụ trước để kiểm tra xem một từ có chứa một ký tự nhất định hay không
```
from itertools import takewhile

def contains_character(str):
    substring = 'o'
    if substring in str:
        return True
    else:
        return False
        
string_list = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
print(list(takewhile(contains_character, string_list)))

>> ['lorem']
```
Vì tiêu chí không thành công ở phần tử thứ hai, mặc dù 'dolor' cũng chứa ký tự o - nó không được xem xét.
# 5 . groupby()
Hàm groupby(iterable, key_function) là một hàm tạo ra một trình lặp gói các phần tử liên tiếp với nhau thuộc cùng một nhóm.
Một phần tử có thuộc về một nhóm hay không phụ thuộc vào key_ function. Nó tính toán giá trị khóa cho mỗi phần tử, giá trị khóa trong trường hợp này là id của một nhóm cụ thể.
Một cụm được kết thúc và một cụm mới được tạo khi key_ functions trả về một id mới, ngay cả khi nó đã được nhìn thấy trước đó.
Nếu key_ function không được chỉ định, thì nó sẽ mặc định là chức năng nhận dạng. Tuy nhiên, cần lưu ý rằng ngay cả với các giá trị trùng lặp - chúng sẽ không được nhóm lại với nhau nếu chúng được phân tách bằng một cụm khác:
```
from itertools import groupby

word = "aaabbbccaabbbbb"

for key, group in groupby(word):
	print(key, list(group))
```
Theo trực giác, bạn có thể mong đợi tất cả các trường hợp của a và b được nhóm lại với nhau, nhưng vì có các cụm giữa chúng - chúng được tách thành các cụm riêng:
```
a ['a', 'a', 'a'] 
b ['b', 'b', 'b'] 
c ['c', 'c'] 
a ['a', 'a'] 
b ['b', 'b', 'b', 'b', 'b']
```
Lưu ý: Cách duy nhất để tránh điều này là sắp xếp trước tệp có thể lặp lại dựa trên các khóa. Bây giờ, hãy xác định một key_ function tùy chỉnh, có thể là lambda hoặc function chuyên dụng:
```
from itertools import groupby

some_list = [("Animal", "cat"), 
          ("Animal", "dog"),
          ("Animal", "lion"),
          ("Plant", "dandellion"),
          ("Plant", "blumen")]
  
for key, group in groupby(some_list, lambda x : x[0]):
    key_and_group = { key : list(group) }
    print(key_and_group)
```
Chúng tôi đã tạo một danh sách các bộ giá trị, trong đó phần tử đầu tiên biểu thị một phân loại chung - cho dù mục nhập là Động vật hay Thực vật và phần tử thứ hai biểu thị tên động vật hoặc thực vật. Sau đó, chúng tôi đã nhóm các phần tử này dựa trên phần tử đầu tiên và in từng phần tử của dãy:
```
{'Animal': [('Animal', 'cat'), ('Animal', 'dog'), ('Animal', 'lion')]}
{'Plant': [('Plant', 'dandellion'), ('Plant', 'blumen')]}
```
Nguồn: https://stackabuse.com/pythons-itertools-compress-dropwhile-takewhile-and-groupby