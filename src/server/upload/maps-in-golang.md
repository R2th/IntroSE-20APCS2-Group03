Tiếp tục chuỗi của về những cấu trúc giữ liệu trong **Go** của mình. Hôm nay, mình sẽ giới thiệu với mọi người cách sử dụng *Maps*, và đây cũng là bài cuối cùng trong seri những cấu trúc giữ liệu hay dùng mà mình muốn giới thiệu với các bạn. Các bạn có thể xem lại *Part 1*  [Arrays](https://chiasekienthuc.netlify.app/blog/arrays) và *Part 2* [Slices](https://chiasekienthuc.netlify.app/blog/slices) tại đây nhé.

### 1. Khái niệm
Map là một cấu trúc dữ liệu cung cấp cho lập trình viên một bộ sưu tập các cặp key/value không có thứ tự. Bạn lưu trữ những giá trị trong *map* dựa vào key. Ưu điểm của *map* là khả năng nhận được giá trị nhanh chóng dựa vào *key*. *Key* làm việc giống như *index*, chỉ ra giá trị đang được liên kết với *key*.

### 2. Các nguyên tắc cơ bản
*Maps* là một bộ sưu tập, bạn có thể lặp đi lặp lại giống như bạn làm với *arrays* và *slices*. Nhưng *maps* là bộ sưu tập không có thứ tự vì thế không có cách nào để dự đoán thứ tự mà các cặp *key/value* sẽ được trả lại. Ngay cả khi bạn lưu trữ cặp *key/value* cùng thứ tự, mỗi khi bạn lặp đi lặp lại trên *map* có thể nhận được thứ tự khác nhau. Điều này xảy ra bởi vì *map* triển khai *hash table* (các bạn có thể tìm hiểu kỹ hơn về *hash table* để có thể hiểu được nhé. Chi tiết về *hash table* mình sẽ viết một bài viết khác).

### 3. Khai báo và khởi tạo

Có một vài cách để khai báo mà khởi tạo *maps* trong **Go**. Bạn có thể sử dụng hàm `make` hoặc sử dụng *map literal*.
```go
// Tạo một map với key có kiểu string và value có kiểu int.
dict := make(map[string]int)

// Tạo mới một map với key có kiểu string và value có kiểu string.
dict := map[string]string{"Red": "#da1337", "Orange": "#e95a22"}
```

Sử dụng *map literal* là một cách để tạo mới một *map*.  Độ dài của *map* sẽ dựa trên số cặp *key/value* mà bạn đã khởi tạo khi tạo mới một *map*. *Key* của *map* có thể là một kiểu nguyên thuỷ hoặc kiểu struct do người dùng tự định nghĩa nhưng phải thoả mãn điều kiện có thể sử dụng được toán tử *==*.  **Slices, functions, và struct chứa slices không thể** sử dụng làm *key* của *map*

### 4. Làm việc với maps
Gán một cặp *key/value* cho *map* được thực hiện bằng cách chỉ định một khoá và gán giá trị cho khoá đó
```go
// Tạo mới một map rỗng để lưu chữ màu và mã màu.
colors := map[string]string{}

colors["Red"] = "#da1337"
```
Bạn cũng có thể tạo một *map* `nil` bằng cách khai báo *map* mà không khởi tạo giá trị cho nó. **Lưu ý**, một *map* `nil` không thể sử dụng để lưu trữ cặp *key/value*.
```go
// Tạo mới một map nil
var colors map[string]string

// Thêm mới color vào map
colors["Red"] = "#da1337"

Runtime Error:
panic: runtime error: assignment to entry in nil map
```
Kiểm tra một *key* đã tồn tại hay chưa là một việc quan trọng khi dùng *map*. Nó cho phép bạn viết logic để xác định xem bạn thực hiện một thao tác hay bạn đã lưu giá trị vào *map*. Nó cũng được sử dụng để so sánh hai *maps* để xác định cặp *key/value* nào khớp hoặc bị thiếu.

Khi nhận được giá trị từ một *map*, bạn có hai lựa chọn. Bạn có thể nhận được giá trị và một cờ chỉ ra key đó đã tồn tại hay chưa.
```go
// Nhận được giá trị của key "Blue".
value, exists := colors["Blue"]

// Nếu key đã tồn tại?
if exists {
    fmt.Println(value)
}
```
Một lựa chọn khác đó là nó chỉ trả lại giá trị và kiểm tra giá trị đó để xác định *key* đó có tồn tại hay không. Điều này chỉ có thể hoạt động nếu giá trị **0** không phải là giá trị hợp lệ trong *map*.
```go
// Nhận được giá trị của key "Blue".
value := colors["Blue"]

//  Nếu key đã tồn tại?
if value != "" {
    fmt.Println(value)
}
```
Khi bạn truy cập *map* sử dụng index trong **Go**, nó sẽ luôn luôn trả lại một giá trị, ngay cả khi *key* không tồn tại. Trong trường hợp này, giá trị **0** được trả lại. 

Lặp trên *map* giống như lặp trên arrays hoặc slices. Bạn sử dụng từ khoá `range`; nhưng đối với map, bạn không thể lấy *index/value* thay vào đó bạn sẽ nhận được cặp *key/value* .
```go
// Tạo một map màu sắc
colors := map[string]string{
    "AliceBlue":   "#f0f8ff",
    "Coral":       "#ff7F50",
    "DarkGray":    "#a9a9a9",
    "ForestGreen": "#228b22",
}

// Hiển thị tất cả màu sắc trong map.
for key, value := range colors {
    fmt.Printf("Key: %s  Value: %s\n", key, value)
}
```
Nếu bạn muốn xoá một cặp *key/value* từ một *map*, bạn sử dụng hàm `delete` được **Go** cung cấp. 
```go
// Xoá một cặp key/value
delete(colors, "Coral")

// Hiển thị tất cả màu sắc trong map.
for key, value := range colors {
    fmt.Printf("Key: %s  Value: %s\n", key, value)
}
```
Lần này, khi bạn lặp trên map, bạn sẽ không nhìn thấy màu `Coral` trên màn hình.
### 5. Truyền map giữa các hàm
Truyền một *map* giữa hai hàm sẽ không tạo ra một bản sao chép của nó. Trong thực tế, bạn có thể truyền một *map* vào một hàm tạo ra sự  thay đổi của *map* và thay đổi này sẽ được nhìn thấy ở tất cả các *map* tham chiếu tới nó.
```go
func main() {
    // Create a map of colors and color hex codes.
    colors := map[string]string{
       "AliceBlue":   "#f0f8ff",
       "Coral":       "#ff7F50",
       "DarkGray":    "#a9a9a9",
       "ForestGreen": "#228b22",
       }
       
     // Hiển thị tất cả màu trong map.
    for key, value := range colors {
        fmt.Printf("Key: %s  Value: %s\n", key, value)
    }

    // Xoá một màu được chỉ định trong map
    removeColor(colors, "Coral")

    // Hiển thị tất cả màu trong map.
    for key, value := range colors {
        fmt.Printf("Key: %s  Value: %s\n", key, value)
    }
}
// removeColor xoá một key từ map
func removeColor(colors map[string]string, key string) {
    delete(colors, key)
}
```
Nếu bạn thực thi chương trình trên, bạn sẽ thấy kết quả như sau:
```go
Key: AliceBlue Value: #F0F8FF
Key: Coral Value: #FF7F50
Key: DarkGray Value: #A9A9A9
Key: ForestGreen Value: #228B22

Key: AliceBlue Value: #F0F8FF
Key: DarkGray Value: #A9A9A9
Key: ForestGreen Value: #228B22
```
Bạn có thể thấy, sau khi hàm removeColor được thực thi, màu `Coral` đã không còn tồn tại trong *map* được tham chiếu ở hàm `main`. *Maps* được thiết kế giống *slices* ở điểm này.

Bài viết của mình về **Maps** khá ngắn gọn. Tuy nhiên, nếu muốn tìm hiểu kỹ hơn các bạn có thể tìm hiểu thêm kỹ thuật bên dưới thì có thể tìm hiểu về *hash table*. Cảm ơn các bạn đã đọc bài của mình nhé :). Nếu có bất cứ thắc mắc gì thì đừng ngại để lại một comment nhé các bạn.

Link bài viết gốc đây các bạn nhé: https://chiasekienthuc.netlify.app/blog/maps