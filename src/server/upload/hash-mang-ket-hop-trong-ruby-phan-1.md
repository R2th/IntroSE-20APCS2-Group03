Hash trong ruby là một tập hợp chứa các key duy nhất - bạn có thể coi nó như quyển từ điển ý. key ở đây là các từ vựng và nó là duy nhất. Hash còn được gọi là mảng kết hợp. 

Nó khá giống so với Mảng bình thường nhưng mảng thì đánh chỉ số là số nguyên (integer)  còn Hash thì có thể định dạng các key với đa dạng kiểu dữ liệu hơn. ví dụ:

    `score = { "germany" => 2, "sweden" => 1 }`
 trên đây cũng là cách định nghĩa Hash. Dấu `=>` biểu thị cho việc gán giá trị cho key tương ứng. 
 Hash trong ruby cũng có thể dùng kiểu symbol để làm key.
 
     `score = { :germany => 2, :sweden => 1 }`
     
 có một cách khác đơn giản mà nhìn gọn gàng hơn:
 
  `score = { germany: 2, sweden: 1 }`
  
  với Hash như trên thì làm sao để truy xuất được giá trị của key? đơn giản lắm nó tương tự việc bạn truy cập giá trị của mảng thôi, nhưng số thứ tự thay bằng key: `score[:germany]`
  
  trên chưa gì đã demo tóe loe về các dùng các kiểu rồi nhưng các khai báo và khởi tạo chưa có thì đây là cách khai bảo Hash và cách gán giá trị cho chúng:

```
foo = Hash.new
foo["bar"] = "Hello World"
```

- Hash có một phương thức giúp cho việc gán giá trị mặc định nếu truy cập vào những key không tồn tại trong Hash
```
foo = Hash.new
foo["bar"] = "Hello World"
foo.default = 0
foo["wc"] #=> 0
```
- có một cách khác thay vì dùng method `default` thì chúng ta dùng như sau:

`foo = Hash.new(0)`

Chúng ta thường thấy Hash định nghĩa ra một cấu trúc dữ liệu hoặc đơn giản hơn là tham số trong các function, vì đơn giản là bạn sẽ kiểm soát và dễ quan sát hơn các tham số truyền vào của các function đó khi chúng được sử dụng.

2 Hash so sánh bằng nhau khi trùng nhau tất cả các key và giá trị các key đó cũng bằng nhau
```
sore1= { germany: 2, sweden: 1 }
score1= { germany: 2, sweden: 1 }
score1 == score2 #=> true
```

* Một số public class methods:
```
Hash[ key, value, ... ] → new_hash
Hash[ [ [key, value], ... ] ] → new_hash
Hash[ object ] → new_hash 
``` 

 cả 3 cách trên đều đưa ra kết quả cuối cùng là 1 Hash giống như sau:
 ```
Hash["a", 100, "b", 200]             #=> {"a"=>100, "b"=>200}
Hash[ [ ["a", 100], ["b", 200] ] ]   #=> {"a"=>100, "b"=>200}
Hash["a" => 100, "b" => 200]         #=> {"a"=>100, "b"=>200}
```

=> từ 3 cách trên bạn có thể sử dụng chúng cho các mục đích khác nhau để trả về 1 Hash. Có thể từ 1 mảng gồm các phẩn tử với thứ tự key, value, key, value,... hay một mảng gồm nhiều phần tử là các mảng con với tính chất của chúng là [key, value] hoặc cũng có thể là từ 1 object. Rất đơn giản, nó rất tiện khi bản phải xử lý data.

Như cách trên là chúng ta xử lý dữ liệu để trở thành một Hash, còn dưới đây là tạo một Hash chưa biết phần tử trong nó.
```
new → new_hash
new(obj) → new_hash
new {|hash, key| block } → new_hash 
```
=> với 3 các trên sẽ trả về một hash rỗng. 

```
#Tạo 1 hash có giá trị mặc định cho các key chưa được gán giá trị 
h = Hash.new("Default value")
h["a"] = 100
h["b"] = 200
h["a"]           #=> 100
h["c"]           #=> "Default value"

# Thay đổi giá trị của 1 phần tử mặc định thì giá trị mặc định sẽ bị thay đổi
h["c"].upcase!   #=> "DEFAULT VALUE"
h["d"]           #=> "DEFAULT VALUE"
h.keys           #=> ["a", "b"]

# Tạo một Hash với một giá trị mặc định riêng mỗi phần tử
h = Hash.new { |hash, key| hash[key] = "Default value: #{key}" }
h["c"]           #=> "Default value: c"
h["c"].upcase!   #=> "DEFAULT VALUE: C"
h["d"]           #=> "DEFAULT VALUE: d"
h.keys           #=> ["c", "d"]

```

"Ép" kiểu về Hash:
```
try_convert(obj) → hash or nil 
```

=>  đây cũng giống như một cách ép kiểu thông thường như `to_i`, 'to_s',... nhưng nó dành cho Hash.
```
Hash.try_convert({1=>2})   # => {1=>2}
Hash.try_convert("1=>2")   # => nil
```
* Public Instance Methods:
```
hsh == other_hash → true or false 
```
So sánh 2 hash, trả về True hoặc False.
```
h = { "a" => 100, "b" => 200 }
h["a"]   #=> 100
h["c"]   #=> nil
```
cách lấy giá trị của một key tương ứng.

Một số cách gán giá trị cho Hash:

* Đơn giản nhất là bạn sử sụng như gán một phần tử cho Array thông thường, chỉ cần thay chỉ số mảng bằng key mà bạn muốn là được.

```
user = { "name" =>  "foo", "age" => 80 }
user["name"] = "bar"
user["phone"] = 0123456789
user   #=> {"name"=> "bar", "age" => 80, "phone" => 0123456789}
```

* `assoc(obj)` Tìm kiếm trong hash

- Kết quả sẽ trả về dưới dạng 1 array gồm 2 phần tử, phần tử thứ nhất là key, còn phần tử còn lại là value, nếu không có kết quả sẽ trả về nil.
```
h = {"colors"  => ["red", "blue", "green"],
     "letters" => ["a", "b", "c" ]}
h.assoc("letters")  #=> ["letters", ["a", "b", "c"]]
h.assoc("foo")      #=> nil
```
* `clear` xóa toàn bộ key khỏi hash
```
c = { "a" => 100, "b" => 200 }   #=> {"a"=>100, "b"=>200}
c.clear                          #=> {}
```
* delete(key) xóa một key khỏi hash
* delete(key) {| key | block } → value.

```
c = { "a" => 100, "b" => 200 }
c.delete("a")                              #=> 100
c.delete("z")                              #=> nil
c.delete("z") { |el| "#{el} not found" } #=> "z not found"
```
đối với delete có kèm theo block khi key bị xóa không tồn tại thi sẽ trả về giá trị được return từ block đó.

=> Trên đây là phần 1, mình sẽ tiếp tục phần 2 để mọi người có tài liệu tốt khi làm việc và sử dụng Hash.