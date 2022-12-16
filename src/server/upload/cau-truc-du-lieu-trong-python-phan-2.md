# 3. Cấu trúc dữ liệu Set (Tập hợp)
Set trong Python là một cấu trúc dữ liệu liên quan đến toán tập hợp hay còn gọi là lý thuyết tập hợp. 

Set có thể chứa nhiều các phần tử và các phần tử trong tập hợp không có thứ tự . Bạn có thể duyệt qua các phần tử trong tập hợp, có thể thêm hoặc xóa đi các phần tử và thực hiện các phép toán tập hợp như phép hợp (union), phép giao (intersection), phép hiệu (difference)...

Các phần tử của tập hợp phải là các dữ liệu không thể thay đổi như một số (int), một chuỗi (string), hoặc một Tuple.

## 3.1 Khai báo tập hợp
Tập hợp (Set) trong Python có một số tính chất cần nhớ:
* Các phần tử trong tập hợp không có thứ tự.
* Các phần tử này là duy nhất, không cho phép lặp lại.
* Set có thể thay đổi (thêm bớt phần tử) nhưng các phần tử của tập hợp phải ở dạng không thể thay đổi (tức là xác định được dung lượng bộ nhớ ngay khi khai báo).
* 
Chúng ta sử dụng các dấu ngoặc nhọn trong khai báo Set, ví dụ:
```php
members = {"Dung","Van","Duc"}
print(members)
```
>***Chú ý:***
> * [] sử dụng khai báo List
> * () sử dụng khai báo Tuple
> * {} sử dụng khai báo Set

## 3.2 Thay đổi tập hợp
Các phần tử trong tập hợp có thể thêm hoặc loại bỏ. Python hỗ trợ các phương thức để thực hiện thao tác thay đổi tập hợp.

**3.2.1 Phương thức .add()**

Thêm một phần tử vào tập hợp. Ví dụ:
```php
members = {"Dung","Van","Duc"}
members.add("Huy")
print(friends) # Kết quả là {"Duc","Van","Huy","Dung"}
```
Chú ý, kết quả có thể khác đi do Set không sắp xếp các phần tử theo một trật tự nào cả.

**3.2.2 Phương thức .remove()**

Loại bỏ một phần tử trong tập hợp. Ví dụ:
```php
members = {"Dung","Van","Duc"}
members.remove("Dung")
print(members) # Kết quả là {"Van","Duc"}
members.remove("Huy")
print(members) # Kết quả là lỗi KeyError: "Huy"
```
Khi loại bỏ một phần tử, nếu phần tử đó không tồn tại trong tập hợp, chương trình sẽ dừng và một thông báo lỗi **KeyError** xuất hiện.

**3.2.3 Phương thức .discard()**

Giống như phương thức **.remove()** loại bỏ phần tử trong tập hợp, tuy nhiên nếu phần tử đó không tồn tại thì nó không báo lỗi gì cả.
```php
members = {"Dung","Van","Duc"}
members.discard("Dung")
print(members) # Kết quả là {"Van","Duc"}
members.discard("Huy")
print(members) # Kết quả là {"Van","Duc"}
```
**3.2.4 Phương thức .pop()**

Loại bỏ một phần tử ngẫu nhiên khỏi tập hợp.
```php
members = {"Dung","Van","Duc"}
members.pop()
print(members) # Kết quả là {"Van","Duc"}
```
Bạn cần chú ý về thứ tự các phần tử trong tập hợp, nó không được sắp xếp theo bất kỳ quy tắc nào.

**3.2.5 Phương thức .clear()**

Loại bỏ tất cả các phần tử trong tập hợp, khi đó tập hợp được gọi là tập rỗng.

```php
members = {"Dung","Van","Duc"}
members.clear()
print(members) # Kết quả là set()
```
**3.2.6 Phương thức .update()**

Phương thức **.add()** ở trên chỉ thêm được 1 phần tử vào tập hợp với 1 câu lệnh, để thêm nhiều phần tử, chúng ta sử dụng **.update()**. 

Chú ý, đầu vào của **.update()** có thể là một **Set**, một **List** hoặc một **Tuple**.

```php
members = {"Dung","Van","Duc"}
members.update(["Tuan","Huy"],{"Ha", "Trang"},("Ngan","Trung"))
print(members) # Kết quả là {'Dung', 'Huy', 'Van', 'Tuan', 'Ha', 'Trang', 'Ngan 'Trung', 'Duc'}
```

Chú ý: Không sử dụng chuỗi để cập nhập vào tập hợp mà các phần tử là chuỗi, bởi vì chuỗi sẽ được coi là một danh sách các ký tự, ví dụ:

```php
members = {"Dung","Van","Duc"}
members.update("Nga")
print(members) # Kết quả là {'g', 'a', 'Dung', 'Van', 'Duc', 'N'}
```

Bạn có thể sử dụng phương thức **.add()** hoặc có thể chuyển chuỗi thành Set, List hoặc Tuple có 1 phần tử:

```php
members = {"Dung","Van","Duc"}
members.update(("Nga",))
# hoặc
members.update(["Nga"])
# hoặc
members.update({"Nga"})
```

## 3.3 Các phép toán trong tập hợp
Các tập hợp có lợi thế hơn các cấu trúc dữ liệu khác ở chỗ nó thực hiện được các phép toán tập hợp như hợp, hiệu, giao... 
### 3.3.1 Phép hợp (Union)
Hợp của hai tập hợp cho kết quả là tất cả các phần tử trong hai tập hợp, chú ý phần tử nào lặp lại sẽ chỉ xuất hiện 1 lần trong tập kết quả. Trong Python, để thực hiện phép hợp, chúng ta sử dụng phương thức **.union()**. 

Chú ý, sử dụng tập hợp nào trước cũng cho kết quả như nhau, python_class.union(php_class) cũng cho kết quả như php_class.union(python_class).

```php
python_class = {"Dung", "Van", "Duc"}
php_class = {"Huy", "Dung"}
all_class = python_class.union(php_class)
print(all_class) # Kết quả {'Dung', 'Van', 'Duc', 'Huy'}
```

### 3.3.2 Phép trừ (Difference)
Hiệu của một tập A trừ đi một tập B cho kết quả là tất các phần tử thuộc A nhưng không thuộc B. Sử dụng phương thức **.difference()** để thực hiện phép trừ hai tập hợp.

```php
python_class = {"Dung", "Van", "Duc"}
php_class = {"Huy", "Dung"}
python_but_not_php = python_class.difference(php_class)
php_but_not_python = php_class.difference(python_class)

print(python_but_not_php) # Kết quả {'Van', 'Duc'}
print(php_but_not_python) # Kết quả {'CharlHuyie'}
```

### 3.3.3 Hiệu đối xứng của hai tập hợp (Symmetric difference)
Hiệu đối xứng của hai tập A và B được kết quả là tập hợp các phần tử thuộc cả A và B nhưng không đồng thời thuộc cả tập A và B. Phương thức **.symmetric_difference()** cho kết quả là hiệu đối xứng của hai tập hợp. 

Chú ý, do tính chất đối xứng nên python_class.symmetric_difference(php_class) và php_class.symmetric_difference(python_class) cho kết quả như nhau.

```php
python_class = {"Dung", "Van", "Duc"}
php_class = {"Huy", "Dung"}

not_in_both_1 = python_class.symmetric_difference(php_class)
print(not_in_both_1) # Kết quả {'Van', 'Duc', 'Huy'}

not_in_both_2 = php_class.symmetric_difference(python_class)
print(not_in_both_2) # Kết quả {'Van', 'Duc', 'Huy'}
```
### 3.3.4 Phép giao (Intersection)
Phép giao hai tập hợp cho kết quả là các phần tử đồng thời thuộc cả hai tập hợp. Trong Python sử dụng phương thức **.intersection()** để thực hiện phép giao.

Chú ý tập hợp nào đứng trước cũng được, do đó kết quả python_class.intersection(php_class) và php_class.intersection(python_class)  là như nhau.

```php
python_class = {"Dung", "Van", "Duc"}
php_class = {"Huy", "Dung"}

python_php = python_class.intersection(php_class)
print(python_php) # Kết quả là {"Dung"}
```

### 3.3.5 Thay đổi tập hợp dựa trên phép toán tập hợp
Trong phần trước chúng ta đã biết đến phương thức **.update()** để thêm nhiều phần tử vào một tập hợp. Dựa vào các phép toán tập hợp, Python cung cấp một số các phương thức khác để thay đổi tập hợp như sau:

**.difference_update()**

Phương thức này là sự kết hợp của **.difference() và .update()**. Nó thực hiện phép trừ tập hợp trước, được kết quả như thế nào sẽ update vào tập hợp đích.

```php
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

A.difference_update(B)
print(A) # Kết quả {1, 2}
```

**.symmetric_difference_update()**

Phương thức này là sự kết hợp của **.symmetric_difference() và .update()**. Nó thực hiện phép trừ đối xứng 2 tập hợp trước, được kết quả như thế nào sẽ update vào tập hợp đích.

```php
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

A.symmetric_difference_update(B)
print(A) # Kết quả là {1, 2, 5, 6}
```

**.intersection_update()**

Tương tự, Python thực hiện **.intersection() trước sau đó thực hiện .update():**

```php
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

A.intersection_update(B)
print(A) # Kết quả là {3, 4}
```

### 3.3.6 Một số các phép toán khác
**.isdisjoint()** Trả về True nếu hai tập hợp không giao nhau (không có phần tử chung)

```php
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print(A.isdisjoint(B)) # Kết quả là False => A, B không giao nhau
```

**.issubset()** Trả về True nếu tập này là tập con của tập đích (tập trong ngoặc).

```php
A = {3, 4}
B = {3, 4, 5, 6}

print(A.issubset(B)) # Kết quả là True => A là tập con của B
```

**.issuperset()** Trả về True nếu tập này là tập cha của tập đích (tập trong ngoặc).

```php
A = {3, 4}
B = {3, 4, 5, 6}

print(B.issuperset(A)) # Kết quả là False => B là tập cha của A
```

Ngoài ra chúng ta có thể sử dụng các ký hiệu phép toán so sánh thông thường để kiểm tra xem là tập con, tập cha hay hai tập bằng nhau với >, >=, ==, <, <=.

```php
A = {3, 4}
B = {3, 4, 5, 6}

print(A.issubset(B)) # Kết quả là True => A là tập con của B

# Tương đương với 
print(A <= B) # Kết quả là True => A là tập con của B
```

# 4. Từ điển - Dictionary
Từ điển dữ liệu (Dictionary) còn được gọi là mảng liên kết (associative array) trong một số ngôn ngữ lập trình, là một dạng danh sách. 

Điểm khác biệt: 
- Các phần tử trong danh sách được truy xuất thông qua vị trí
- Các phần tử trong từ điển được truy xuất qua khóa (key). Bạn có thể định nghĩa khóa này, nó có thể là một chuỗi hoặc số nhưng nó phải là duy nhất trong từ điển. Ví dụ: Hai người có cùng một số tài khoản, vậy biết chuyển khoản cho ai bây giờ? Chính vì vậy, khóa (key) trong từ điển phải là duy nhất.

Từ điển trong Python cũng có thể tưởng tượng giống như một cuốn từ điển Anh - Việt chẳng hạn. Khi tra từ "python" - tương ứng với khóa trong Dictionary, bạn sẽ có được phần diễn giải chính là giá trị trong Dictionary. Vậy từ điển bao gồm rất nhiều các phần tử mà mỗi phần tử đi theo cặp khóa - giá trị (key-value).

## 4.1 Khai báo Dictionary
Dictionary trong Python được khai báo với cặp dấu ngoặc nhọn {} bao ngoài giống như với Set. 

Bên trong các phần tử theo cặp (key - value). Cú pháp chung như sau:

```php
dictionary_name = {key_1: value_1, key_2: value_2, ..., key_n: value_n}
```

Ví dụ: