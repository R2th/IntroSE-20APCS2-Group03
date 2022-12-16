Các kiểu dữ liệu cơ bản trong Python bao gồm kiểu số nguyên (int), kiểu số thực (float), kiểu chuỗi (string) và kiểu logic (boolean). Với các kiểu dữ liệu cơ bản này, chúng ta có thể viết các ứng dụng đơn giản với Python. 

Với các ứng dụng có số lượng các biến nhiều, dữ liệu lớn chúng ta cần tới các cấu trúc dữ liệu giúp cho việc viết code ngắn gọn và hiệu quả. Trong Python có 4 kiểu cấu trúc dữ liệu là List, Tuple, Set và Dictionary.

## Tại sao cấu trúc dữ liệu cần thiết
Cấu trúc dữ liệu được sử dụng trong các chương trình để dễ dàng hơn trong việc định vị thông tin và lấy thông tin. Cấu trúc dữ liệu là cách các ngôn ngữ lập trình thể hiện các giá trị cơ bản, chúng chứa các kiểu dữ liệu cơ bản như số, chuỗi, boolean..., nó đưa ra cách thức lưu trữ nhiều giá trị trong một biến số. 

Cấu trúc dữ liệu cũng được sử dụng để phân nhóm và tổ chức cho các cấu trúc khác.
# 1. Cấu trúc dữ liệu List
## 1.1 Định nghĩa và cách sử dụng List
List là một tập dữ liệu đơn giản nhất trong Python, một List là một danh sách các thành phần dữ liệu được phân cách bởi dấu phẩy và được bao ngoài bởi dấu ngoặc vuông. List có thể chứa các con số hoặc các chuỗi.
```php
members = ["Dung","Van","Duc"]
ages = [24,25,23]
```

Chú ý: Một danh sách có thể chứa nhiều loại dữ liệu khác nhau nếu bạn thấy cần thiết, tuy nhiên nên dừng một loại dữ liệu thống nhất cho các phần tử trong danh sách.

```
members = ["Dung",25,"Duc"]
```

## 1.2 Truy xuất phần tử trong List
Mỗi phần tử trong List sẽ có một vị trí nhất định tương ứng với một con số, bắt đầu từ số 0 và tăng dần. Chúng ta có thể truy xuất đến các phần tử trong danh sách với cú pháp:
```php
list_name[element_position]
```

Trong ví dụ trên, để truy xuất đến tên Van, chúng ta thực hiện như sau:
```php
members = ["Dung","Van","Duc"]
print(members[1])
```

Chú ý: Nếu bạn truy xuất đến một phần tử không có trong danh sách, một lỗi sẽ xuất hiện có dạng *"index out of range"*. 

## 1.3 Danh sách đa chiều
Mỗi phần tử trong danh sách của Python có thể là một danh sách, ví dụ như danh sách sau đây, mỗi phần tử là một danh sách gồm tên và tuổi của bạn bè.
```php
members = [["Dung", 24], ["Van", 25], ["Duc", 23]]
print(members[0][1])  # 24
print(members[1][0])  # Van
```

Trong Python không giới hạn số chiều của danh sách cũng như số phần tử danh sách có thể chứa, nó chỉ phụ thuộc vào dung lượng bộ nhớ máy tính bạn dùng để chạy ứng dụng.

Chú ý, với các danh sách dài, chúng ta nên trình bày mỗi phần tử trên một dòng, như vậy code chương trình sẽ dễ đọc hơn, ví dụ:

```php
friends = [
    ["Dung", 24],
    ["Vu", 30],
    ["Ha", 27],
    ["Duc", 23],
    ["Van", 25],
    ["Nga", 29],
]
```


## 1.4 Một số hàm liên quan đến danh sách
Trong quá trình thao tác với danh sách, chúng ta cần: kiểm tra xem danh sách có chứa một phần tử nào đó không, đếm số phần tử hoặc thêm , xóa, sửa phần tử trong danh sách... Các yêu cầu này đều có toán tử hoặc các phương thức được xây dựng sẵn trong đối tượng List.

### 1.4.1 Toán tử in

Toán tử in cho phép bạn kiểm tra một phần tử có nằm trong một danh sách hay không. Ví dụ: Kiểm tra xem "Dung" có trong danh sách members không?

```php
members = ["Dung","Van","Duc"]
check = "Dung" in members
print(check) #Kết quả là True
```

### 1.4.2 Hàm len()

Hàm len() trả về số phần tử có trong một danh sách. 

```php
members = ["Dung","Van","Duc"]

print(f"Danh sách members có {len(members)} bạn") #Kết quả là 3
```

### 1.4.3 Một số phương thức trên Model List
**.append()** thêm một phần tử vào vị trí cuối cùng trong List:

```php
members = ["Dung","Van","Duc"]
members.append("Ha")
new_member = "Trung"
members.append(new_member)
print(members) #Kết quả là ["Dung","Van","Duc","Ha","Trung"]
```

**.insert(position, item)** chèn một phần tử vào List tại vị trí cho trước.

```php
members = ["Dung","Van","Duc"]
members.insert(1,"Ha")
print(members) #Kết quả là ["Dung","Van","Duc","Ha"]
```

Các phần tử phía sau sẽ có vị trí tăng lên 1, cần chú ý khi truy xuất giá trị các phần tử này.

**listname[index]=newvalue** Thay đổi giá trị một phần tử có vị trí index trong List.

```php
members = ["Dung","Van","Duc"]
members[1] = "Trang"
print(members) #Kết quả là ["Dung","Trang","Duc"]
```

**.extend()** Kết hợp danh sách với một List khác.
```php
members = ["Dung","Van","Duc"]
old_members = ["Ha","Ngan"]
members.extend(old_members)
print(friends) #Kết quả là ["Dung","Van","Duc","Ha","Ngan"]
```

**.remove()** Loại bỏ một phần tử khỏi List.

```php
members = ["Dung","Van","Duc"]
members.remove("Van")
print(members) #Kết quả là ["Dung","Duc"]
```

**.pop(index)** Loại bỏ phần tử ở vị trí index cho trước trong List.
```php
members = ["Dung","Van","Duc"]
members.pop(1)
print(members) #Kết quả là ["Dung","Duc"]
```

**del** Xóa một phần tử hoặc toàn bộ danh sách
```php
members = ["Dung","Van","Duc"]****
del members[1]
print(members) #Kết quả là ["Dung","Duc"]
del members
print(members) #Lỗi name 'members' is not defined
```

**.clear()** Xóa sạch các phần tử trong danh sách
```php
members = ["Dung","Van","Duc"]
members.clear()
print(members) #Kết quả là []
```
Chú ý, .clear() khác với del, .clear() xóa toàn bộ các phần tử trong List, còn del xóa luôn cả biến List.

**.count()** Đếm số lần một phần tử xuất hiện trong List.
```php
members = ["Dung","Van","Duc","Dung"]

print(f"Có {members.count('Dung')} người tên Dung trong danh sách member") #Kết quả là 2
```

**.index()** Trả về vị trí phần tử trong List
```php
members = ["Dung","Van","Duc"]

print(f"Dung ở vị trí thứ {members.index('Dung')} trong danh sách") #Kết quả là 0
```

**.sort()** sắp xếp các phần tử trong List.
```php
members = ["Ha","Trung","Dung"]
members.sort()
print(members) #Kết quả là ["Dung","Ha","Trung"]
```
Mặc định sắp xếp tăng dần với dữ liệu chuỗi sẽ sắp xếp a-z, A-Z, với số 0-9. Để sắp xếp giảm dần sử dụng tham số reverse = True.

**reverse()** Đảo ngược thứ tự các phần tử trong List.
```php
members = ["Dung","Van","Duc", "Huy"]
members.reverse()
print(members) #Kết quả là ["Huy","Duc","Van","Dung"]
```
**.copy()** Copy toàn bộ List.
```php
members = ["Dung","Van","Duc"]
news_members = members.copy()
news_members.append("Huy")
print(news_members) #Kết quả là ["Dung","Van","Duc","Huy"]
```
# 2. Cấu trúc dữ liệu Tuple
Python hỗ trợ một cấu trúc dữ liệu cũng tương tự với List có tên là Tuple, chỉ có một khác biệt Tuple là danh sách bất biến, không thể thay đổi nội dung. Tức là ngay sau khi định nghĩa Tuple, bạn không thể thay đổi nó.

## 2.1 Khai báo Tuple
Định nghĩa một Tuple cũng giống như định nghĩa một List trong Python, chỉ khác là thay vì sử dụng ngoặc vuông chúng ta sử dụng ngoặc tròn.
```php
members = ("Dung","Van","Duc")
```

***Chú ý:***

Python cho phép định nghĩa Tuple mà không cần sử dụng dấu ngoặc thường. Ví dụ:
```php
members = "Dung","Van","Duc"
```
Thậm chí Tuple chỉ có một phần tử:
```php
members = "Dung",
```
Chú ý dấu phẩy, nếu không có dấu phẩy thì đây là định nghĩa một chuỗi.

## 2.2 Thao tác với Tuple
Tuple là một danh sách đặc biệt, không thể thay đổi khi đã tạo ra, do đó bạn có thể sử dụng tất cả các kỹ thuật, các hàm như với List nhưng loại trừ những hàm tác động thay đổi nội dung.

Ví dụ, bạn có thể sử dụng toán tử **in**, hàm **len()** với Tuple:
```php
members = ("Dung","Van","Duc")
check = "Huy" in members
print(check) #Kết quả là Flase
```

```php
members = ("Dung","Van","Duc")

print(f"Danh sách member có {len(members)} bạn") #Kết quả là 3
```

Tất cả các phương thức .append(), .extend(), .clear(), .copy(), .insert(), .pop(), .remove(), .reverse(), .sort() không sử dụng được với cấu trúc dữ liệu Tuple.

Chú ý:  Không thể thay đổi Tuple nhưng có thể tạo ra một Tuple từ hai Tuple, ví dụ :
```php
members = ("Dung","Van","Duc")
members = members + ("Trung",)

print(members) #Kết quả là ("Dung","Van","Duc","Trung")
```

## 2.3 Tại sao sử dụng Tuple
Tuple có những hạn chế là khi tạo ra không thể thay đổi được tuy nhiên Tuple lại có những ưu điểm sau:

- Tuple có tốc độ xử lý nhanh hơn List, do Tuple được lưu trữ một khối bộ nhớ xác định còn List thì thường xuyên phải thay đổi không gian lưu trữ. Nếu bạn định nghĩa một tập các giá trị là hằng số thì nên chọn Tuple.

- Sử dụng Tuple giúp code an toàn hơn, khi đó chế độ "write-protect" giúp cho dữ liệu không thể thay đổi. Do vậy nên lựa chọn cho những dữ liệu dạng hằng số, dữ liệu không thay đổi theo thời gian.

- Tuple còn được sử dụng làm khóa trong Dictionary do nó chứa các giá trị không đổi, List không được sử dụng làm khóa cho Dictionary.