# Mở đầu

**Slices** là một cấu trúc dữ liệu cũng cấp cho bạn một cách để làm việc và quản lí các bộ sưu tập (*collections*) dữ liệu. *Slices* được xây dựng dựa trên ý tưởng của một mảng có thể linh động về số lượng phần tử. *Slices* có thể linh hoạt khi thêm phần tử một cách đơn giản vì nó đã được xây dựng sẵn tính năng **append**, nó có thể giúp mình thêm phần tử vào *slices* nhanh chóng và hiểu quả. Bạn cũng có thể giảm kích thước của *slices* bằng cách lấy một phần của bộ nhớ bên dưới. *Slices* cũng cung cấp cho bạn tất cả những tiện ích như index, iteration, và garbage collection optimizations vì bộ nhớ bên dưới được sắp xếp là những khối liên tiếp.

## 1. Khái niệm
*Slices* là một cấu trúc dữ liệu đã được trừu tượng hoá, và thao tác với một mảng bên dưới. Nó có *ba field* chứa metadata giúp **Go** có thể quản lí được một mảng bên dưới (Hình minh hoạ bên dưới). Ba field này là con trỏ trỏ đến mảng, độ dài (length), và sức chứa (capacity) sẵn sàng của *slices*. Độ dài và sức chưa sẽ có một vài sự khác biệt mình sẽ đề cập ở phần sau.

![](https://images.viblo.asia/6ceeb5a3-5982-4999-bcbc-357c0533d405.png)

## 2. Khai báo và khởi tạo
Có một vài cách để khai báo và khởi tạo *slices* trong **Go**.  Biết trước sức chứa của *slices* sẽ giúp bạn xác định được làm thế nào để tạo một *slices*. Bạn có thể tạo *slices* bằng cách sử dụng hàm **make** đã được **Go** hỗ trợ. Khi bạn sử dụng **make**, bạn phải chỉ rõ độ dài của *slices*

```go
// Tạo một slices string
// Bao gồm độ dài và sức chứa của 5 phần tử
slice := make([]string, 5)
```

Khi bạn chỉ chỉ định độ dài của *slices* khi khai báo, thì sức chứa (capacity) sẵn sàng sẽ bằng độ dài của *slices* khi khai báo. Bạn cũng có thể chỉ định rõ độ dài và sức chứa sẵn sàng riêng biệt.

```go
// Khởi tạo một slices integer
// Bao gồm độ dài là 3 và sức chứa sẵn sàng là 5
slice := make([]int, 3, 5)
```

Khi bạn chỉ định độ dài và sức chứa sẵn sàng riêng biệt. Bạn có thể tạo ra một *slices* với sức chứa khả dụng trong mảng bên dưới, nhưng sẽ không thể truy cập. Điều này nghĩa là, bạn chỉ có thể truy cập 3 phần tử, nhưng bên dưới có thể có 5 phần tử (ví dụ trên). 2 phần tử không liên kết với độ dài của *slices*  có thể được kết hợp để *slices* sử dụng những yếu tố đó. **Go** *không cho phép* bạn tạo một *slices* có sức chứa sẵn sàng nhỏ hơn độ dài.

Bạn có thể sử dụng slice literal để khởi tạo một slice. Nó giống như cách bạn khởi tạo một mảng, nhưng bạn sẽ không cần phải chỉ định rõ giá trị bên trong toàn tử **[ ]**. Giá trị khởi tạo của độ dài và sức chứa sẵn sàng được dựa trên số lượng phần tử của *slices*.

```go
// Tạo một slice string có 5 phần tử.
// Bao gồm độ dài và sức chứa sẵn sàng của 5 phần tử
slice := []string{"Red", "Blue", "Green", "Yellow", "Pink"}

// Tạo một slice integer có 3 phần tử.
// Bao gồm độ dài và sức chứa sẵn sàng của 3 phần tử
slice := []int{10, 20, 30}
```

Khi sử dụng slice literal, bạn có thể đặt giá trị khởi tạo cho độ dài và sức chứa sẵn sàng. Để làm được việc này, bạn chỉ cần khởi tạo index được đại diện để làm độ dài và sức chứa sẵn sàng. Cùng xem ví dụ bên dưới nhé :)

```go
// Tạo một slice string
// Khởi tạo 100 phần tử với string empty
slice := []string{99: ""}
```

**Hãy nhớ rằng,** nếu bạn khởi tạo giá trị bên trong toán tử  **[ ]**, nghĩa là bạn đang tạo một mảng. Nếu bạn không chỉ rõ giá trị, nghĩa là bạn đang tạo một *slice*.

Đôi khi trong chương trình của bạn có thể cần khai báo một **nil** slice. Một slice có giá trị *nil*  sẽ được khởi tạo  như sau:
```go
// Khai báo một nil slice integer
var slice []int
```

Bạn cũng có thể khởi tạo slice rỗng như sau:

```go
// sử dụng make để tạo một slice có kiểu integer rỗng
slice := make([]int, 0)

// sử dụng slice literal để tạo một slice kiểu integer rỗng
slice := []int{}
```
Một slice rỗng không chứa phần tử nào ở mảng bên dưới. Slice rỗng rất có ích khi bạn muốn đại diện cho một models hay collection rông, ví dụ như kết quả trả về của một câu query từ cơ sở dữ liệu.
## 3. Làm việc với slices
Đến đây chắc chắn mọi người đều đã biết cách khai báo cũng như khởi tạo một *slice*, bây giờ chúng ta sẽ cùng tìm hiểu làm sao để sử dụng *slice* trong một chương trình nhé.

Cũng giống như mảng, chúng ta cũng có thể sử dụng toán tử gán (**=**) để gán một giá trị cho một phần tử trong *slice*.
```go
// Tạo mới một slice kiểu integer
slice := []int{10, 20, 30, 40, 50}

// Thay đổi giá trị của phần tử có index là 1
slice[1] = 25
```

Các bạn cũng có thể tạo mới một *slice*  bằng cách lấy một phần *slice*
```go
// Tạo mới một slice kiểu integer.
slice := []int{10, 20, 30, 40, 50}

// Tạo mới một slice có độ dài là 2 và sức chứa sẵn sàng là 4.
newSlice := slice[1:3]
```
Với cách tạo *slice* như trên, chúng ta sẽ có 2 slices chia sẻ chung mảng bên dưới. Tuy nhiên mỗi *slice* sẽ có cái nhìn với mảng bên dưới một cách khác nhau.

![](https://images.viblo.asia/666dfa34-ca25-4170-b87a-8f6fa6bce6a4.png)

Bất kỳ *slice* mới nào được tạo ra theo cách trên sẽ thực hiện tính độ dài và sức chứa sẵn sàng theo công thức sau:
```go
slice[i:j] và sức chứa sẵn sàng là k.
Độ dài: j - i
Sức chứa sẵn sàng: k - i

Vậy trong trường hợp ví dụ trên của mình sẽ là slice[1:3]
Độ dài: 3 - 1 = 2
Sức chứa sẵn sàng: 5 - 1 = 4
```
Bạn cần nhớ rằng, bạn có hai *slices* đang chia sẻ cùng một mảng bên dưới. Nếu bạn thực hiện bất cứ thay đổi nào ở mảng bên dưới thì cả hai *slice* sẽ cùng nhận được sự thay đổi đó.
```go
// Tạo một slice kiểu integer.
slice := []int{10, 20, 30, 40, 50}

// Tạo mới một slice.
newSlice := slice[1:3]

// Thay đổi giá trị ở index là 2 ở slice.
newSlice[1] = 35
```
Sau khi thực hiện xong toán tử gán, lúc này giá trị của **slice** tại vị trí thứ 2 cũng bị thay đổi. Các bạn có thể nhìn hình ảnh minh hoạ bên dưới nhé:

![](https://images.viblo.asia/771ea1a7-e1f9-4a0f-b463-54bfe6f7130c.png)

Bạn luôn luôn nhớ răng, bạn chỉ có thể sử dụng index để truy cập từng phần tử với index lớn nhất là độ dài của *slice*. 

**Growing slices**
Một trong những lợi thế của *slice* so với mảng là việc bạn có thể thêm số phần tử vào *slice* một cách đơn giản. **Go** đã cung cấp chức nằng *append* giúp bạn có thể thực hiện công việc đó.

Để sử dụng *append*, bạn cần một *slice gốc* và một giá trị mà bạn chuẩn bị thêm vào. *append* sẽ trả lại cho bạn một *slice* mới với sự thay đổi. *append* sẽ luôn luôn tăng độ dài của *slice* mới, nhưng sức chứa sẵn sàng (capacity) có thể thay đổi hoặc không, phụ thuộc vào sức chứa sẵn sàng (capacity) của *slice gốc*.
```go
// Tạo mới một slice integer.
// Độ dài và capacity là 5.
slice := []int{10, 20, 30, 40, 50}

// Tạo mới một slice từ slice gốc.
// Độ dài là 2 và capacity là 4.
newSlice := slice[1:3]

newSlice = append(newSlice, 60)
```
Sau khi thực hiện xong *append*. *slices* và mảng bên dưới sẽ được mình hoạ như sau:

![](https://images.viblo.asia/67d67226-6f2d-41af-ac2a-db22c6d8d207.png)

Vì *newSlice* **vẫn còn dư** (*nghĩa là độ dài của slice bé hơn capacity*) capacity, nên khi *append* hoạt động, nó hợp nhất những phần tử có sẵn và độ dài của *slice* và gán giá trị. Vì *slice* ban đầu đang chia sẻ chung mảng bên dưới, nên cũng sẽ nhìn thấy sự thay đổi ở phần tử có index là 3.

Khi *slice* **đã dùng hết** (*nghĩa là độ dài của slice bằng với capacity*) capacity ở mảng bên dưới, *append* sẽ tạo mới một mảng bên dưới, sao chép giá trị nó đang tham chiếu và gán cho giá trị mới. Các bạn hãy xem hình bên dưới để hiểu rõ hơn nhé:

![](https://images.viblo.asia/3cdfa10c-03eb-44ad-88d7-712c3289e3b9.png)

Tuy còn khá nhiều nội dung mình muốn truyền đạt trong bài này, nhưng đến đây mình nghĩ hàm lượng kiến thức cũng khá dài và cũng đủ cơ bản để các bạn có thể sử dụng *slices* trong **Go**. Nếu có bất cứ thắc mắc gì các bạn cứ comment phía dưới nhé, mình sẽ cố gắng giải thích cho các bạn một các dễ hiểu nhất. Cảm ơn mọi người đã đọc bài của mình :) 

Link bài viết gốc: https://chiasekienthuc.netlify.app/blog/slices