**What is a Ruby hash?**
Hash là một cấu trúc dữ liệu, được sử dụng để lưu trữ data dưới dạng 1 cặp key-value duy nhất. Không giống như array, nó không có index và bạn lấy value của hash thông qua key

**Example:**
* Danh sách mã số xe tương ứng với từng thành phố.
* Tên miền và địa chỉ IP.

Sử dụng hash trong Ruby programs có thể tăng tốc độ code nếu nó được sử dụng trong tình huống thích hợp. 
Nói cách khác: sử dụng Hash khi dữ liệu (hoặc có thể được chuyển đổi thành) định dạng giống như từ điển, nơi mà dữ liệu có thể được nhóm theo keys & associated values.

**How to Create a Hash**
Ok. Chúng ta đã biết khái niệm về Hash là gì, nhưng làm sao để tạo được 1 hash?
* `{}` : Đây là 1 hash rỗng
* `{ a: 1, b: 2, c: 3 }` : Một hash với 3 cặp key-value với a,b,c là key còn value là 1,2,3.

**Storing Values in a Ruby Hash**
* Bạn có thể tạo 1 hash với tập hợp các giá trị ban đầu như sau:
```
fruits = { coconut: 1, apple: 2, banana: 3 }
```
* Ngoài ra có thể thêm giá trị mới vào 1 hash đã có.
```
fruits[:orange] = 4
```
Với :orange là key còn 4 là value. Value có thể là bất kỳ Ruby object nào (Strings, Integers, Floats, Arrays). Key có thể là bất kỳ, nhưng symbols(:orange) và strings thường được dùng nhiều nhất.

**Note:**
* Key là duy nhất, khi bạn sử dụng key để thêm vào giá trị 2 lần nghĩa là bạn đang thay đổi giá trị của key đó.

**How to Access Values From a Hash**
Bạn có thể truy xuất value của hash thông qua key. Nếu bạn cần truy xuất trực tiếp vào values  thì hash không phải là cấu trúc dữ liệu phù hợp.

Example: ta có 1 hash như sau
```
fruits = { coconut: 1, apple: 2, banana: 3, orange: 4 }
fruits[:orange]
# 4
```
Nếu key không tồn tại giá trị trả về là nil
```
fruits[:peach]
# nil
```
Bạn có thể sử dụng `fetch` method, cho phép cung cấp giá trị mặc định
```
fruits.fetch(:peach, 0)
```
Nếu sử dụng `fetch` mà không có giá trị mặc định, Ruby sẽ raise lỗi KeyError exception

**How to Merge Two Ruby Hashes**
Bạn có thể merge 2 hash với nhau thành 1 hash mới bằng cách sử dụng `merge` method.

```
defaults    = { a: 1, b: 2, c: 3 }
preferences = { c: 4 }

defaults.merge!(preferences)
# {:a=>1, :b=>2, :c=>4}
```
Lưu ý rằng vì key là duy nhất, các giá trị mới hơn sẽ ghi đề các giá trị cũ hơn.
Bạn có thể sử dụng block để merge
```
defaults.merge!(preferences) { |key, old, new| [old, new].max }
```
Trong đó các giá trị cũ đến từ `defaults` và giá trị mới từ `preferences`

**Multiple Values For One Key**
Trong 1 cuốn từ điển
Các từ là duy nhất, nhưng chúng có thể có nhiều giá trị(được định nghĩa) liên kết với chúng
Bạn có thể làm điều này trong Ruby
```
dictionary = {
  opportunity: [
    "a set of circumstances that makes it possible to do something",
    "a situation or condition favorable for attainment of a goal"
  ],
  creativity: [
    "the use of imagination or original ideas to create something new",
    "the ability to create",
    "the process where new ideas emerge from combining existing ideas in new ways"
  ]
}

dictionary[:creativity][1]
```
Trong đó `dictionary[:creativity]` cung cấp cho bạn một mảng và `[1]` cung cấp cho bạn phần tử thứ 2 của mảng đó
**Nói cách khác:**

Key là symbol và values là arrays. Khi bạn truy xuất vào 1 `hash` bạn sẽ nhận lại được 1 array

**How to Sort a Hash**

Bạn có thể sort các mảng. Nhưng bạn có biết rằng `hash` cũng có thể sort được không ?
Khi bạn sort 1 `hash`, nó sẽ được sort theo key
```
{ b: 1, a: 2 }.sort

# [[:a, 2], [:b, 1]]
```
Nhưng bạn cũng có thể sort theo value
```
{ c: 3, b: 1, a: 2 }.sort_by(&:last)
```
Bạn chú ý rằng những gì nhận được khi sort 1 `hash` là 1 array
Nhưng bạn có thể chuyển đổi array sang `hash` bằng cách sử dụng `to_h` method.

**Get All Keys & Values From a Hash**

Nếu bạn muốn lấy 1 danh sách tất cả các keys:
```
{ apple: 1, banana: 2 }.keys

# [:apple, :banana]
```
hoặc
```
{ apple: 1, banana: 2 }.values

# [1, 2]
```
Nếu bạn muốn biết một key có tồn tại trong 1 `hash` thì sử dụng `key?` method.

**Tổng kết**

Bạn đã biết về `hash` là gì, một cấu trúc dữ liệu bao gồm 1 cặp key-value. Bạn cũng đã học cách truy cập `hash` theo từ khóa và cách lưu trữ dữ liệu mới vào `hash`
Bây giờ hãy mở irb (hoặc pry) và bắt đầu vọc nào.

Cám ơn vì đã đọc.

Nguồn tham khảo: https://www.rubyguides.com/2020/05/ruby-hash-methods/