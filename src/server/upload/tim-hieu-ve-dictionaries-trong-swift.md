### Dictionary là gì ?
Một Dictionary là một khối chứa cặp key-values. Trong đó, key được dùng để định danh duy nhất cho value (giá trị). Một Dictionary không đảm bảo thứ tự các cặp key-values được xếp bởi vì chúng ta tìm kiếm value theo key hơn là theo index của value. Dictionary khá hữu dụng cho việc sắp xếp các mục để có thể giống với các định danh duy nhất, nơi mà các định danh đó được dùng để lấy giá trị các mục.
![](https://images.viblo.asia/5f2c23ab-64f2-42a9-898a-586392783cfe.png)
### Khởi tạo Dictionary
Chúng ta có thể khởi tạo một Dictionary tương tự như đối với một mảng:
`let countries = [“UK”: “United Kingdom”, “DE”: “Germany”, “AL”: “Albania”]`
`var countries = [“UK”: “United Kingdom”, “DE”: “Germany”, “AL”: “Albania”]`

Trong hai ví dụ trên chúng ta tạo các dictionary khi cả key và value đều là kiểu String. Nếu chúng ta muốn tạo một dictionary trống chúng ta cần nói với complier về kiểu giá trị của key và value: 
```
var stringKeyStringValue = [String: String]()
var intKeyStringValue = [Int: String]()
var stringKeyMyObjectValue = [String: MyObject]()
```

### Truy cập dictionary value:
Bằng việc sử dụng cú pháp subscript để lấy giá trị cho một key cụ thể nào đó, nếu dictionary không chứa key chúng ta tìm kiếm thì dictionary sẽ trả lại nil. Vì thế biến trả về sẽ là kiểu optional, ví dụ:
```
let countries = [“UK”: “United Kingdom”, “DE”: “Germany”, “AL”: “Albania”]
var name = countries[“AL”]
```
Giá trị trả về sẽ là Albania.
### Đếm key/values trong một dictionary:
Phương thức đếm của dictionary sẽ trả về số cặp key-value trong dictionary, ví dụ: 
```
let countries = [“UK”: “United Kingdom”, “DE”: “Germany”, “AL”: “Albania”]
var countOfCountries: Int = countries.count //the count will be: 3
```

### Còn một dictionary trống thì sao?
Để xem thử một dictionary có trống hay không ta dùng phương thức `isEmpty`. Ví dụ:
```
let countries = [“UK”: “United Kingdom”, “DE”: “Germany”, “AL”: “Albania”]
var isCountriesEmpty = countries.isEmpty
```
Kết quả isCountriesEmpty trả về false vì trong countries có 3 cặp key-value.
### Cập nhật value của key:
Có 2 cách để cập nhật:
1/ Sử dụng câu lệnh subscript 
2/ Phương thức updateValue(value: String, forKey: String)
Phương thức updateValue có thêm một tính năng mà câu lệnh subscript không là nó trả về giá trị gốc kèm với key thay đổi value đó. Ví dụ:
```
var countries = [“UK”: “United Kingdom”, “DE”: “Germany”, “AL”: “Albania”]
countries[“AL”] = “Lovely Albania” — value của AL giờ được gán lại là ‘Lovely Albania’
```
### Thêm một cặp key-value:
Tương tự khi cập nhật giá trị trong dictionary, chúng ta cũng có hai cách là sử dụng subscript và `updateValue(forKey:)`. Chỉ có một khác biệt của việc sử dụng updateValue(forKey: ) đó là nếu key không tồn tại thì sẽ bị nil, vì thế phương thức đó sẽ tạo thêm một cặp key-value và trả về nil. Ví dụ:
```
var countries = [“UK”: “United Kingdom”, “DE”: “Germany”, “AL”: “Albania”]
countries[“FR”] = “France” — The value of ‘FR’ is set to ‘France’
```
### Xoá cặp key-value:
Có nhiều cách để xoá một cặp key-value nào đó, như là subscript syntax, `removeValue(forKey: )`,  `removeAll()`. removeValue(forKey: ) trả về giá trị của key đó trước khi xoá. removeAll() xoá tất cả phần tử trong dictionary. Ví dụ: 
```
var countries = [“UK”: “United Kingdom”, “DE”: “Germany”, “AL”: “Albania”]
countries[“DE”] = nil — ‘DE’ key/value đã bị xoá
```

Bài viết được dịch từ : https://medium.com/flawless-app-stories/dictionaries-in-swift-90c4df6dd828