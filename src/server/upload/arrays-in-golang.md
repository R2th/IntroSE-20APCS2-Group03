## 1. Mảng và các nguyên tắc cơ bản

Hôm nay mình sẽ nói về mảng (array) trong **Go** . Mảng là một cấu trúc dữ liệu quan trọng trong hầu hết các ngôn ngữ lập trình. Trong **Go** cũng không phải ngoại lệ. Những cấu trúc như *slices* và *maps* trong **Go** cũng được xây dựng dựa trên mảng. Hiểu về cách hoạt động của mảng sẽ giúp các bạn nhận ra được sức mạnh của *slices* và *maps* trong **Go**.

### 1.1 Khái niệm

Một mảng (array) trong **Go** là kiểu dữ liệu có độ dài cố định chứa một khối dữ liệu cùng kiểu. Nó có thể là những kiểu nguyên thuỷ như int và string hoặc nó có thể có kiểu là struct.

Bạn có thể xem ví dụ bên dưới minh hoạ về mảng (array). Những phần tử của một mảng được đặt bên trong một chiếc hộp màu grey và được đặt liên tiếp nhau. Mỗi phần tử có cùng kiểu, trong ảnh minh hoạ nó là một *integer*, và nó có thể được truy cập thông qua một vị trí duy nhất

![](https://images.viblo.asia/e5d117d6-3d48-4efd-92cd-3369bbcff542.png)

Mảng là một cấu trúc dữ liệu có giá trị. Bạn có thể truy cập từng phần tử của mảng một cách nhanh chóng khi sử dụng index. Kiểu của mảng cung cấp khoảng cách trong bộ nhớ mà bạn phải di chuyển để tìm từng phần tử. Vì mỗi phần tử là cùng kiểu và nối tiếp nhau nên việc di chuyển giữa các phần tử trong mảng là nhất quán và nhanh chóng.

### 1.2 Khai báo và khởi tạo (Declaring and initializing)

Một mảng (array) được khai báo bằng cách chỉ định loại dữ liệu được lưu trữ và tổng số phần từ (hay còn gọi là độ dài của mảng)

```go
//khai báo một mảng integer có 5 phần tử.
var array [5]int
```

Khi một mảng được khai báo, thì kiểu dữ liệu và và độ dài của mảng đều không thể thay đổi được nữa. Nếu bạn cần thêm phần tử, bận cần tạo mới một mảng với độ dài mong muốn, sau đó sao chép giá trị từ mảng cũ sang mảng mới.

Khi một biến trong **Go** được khai báo, chúng luôn luôn được gán một giá trị khởi tạo mặc định, và mảng cũng không phải ngoại lệ. Khi một mảng được khởi tạo, mỗi phần tử được riêng biệt được khởi tạo về giá trị 0. Bạn có thể xem hình minh hoạ bên dưới, mỗi phần tử trong một mảng kiểu integer sẽ được khởi tạo giá trị là 0

![](https://images.viblo.asia/d0eaa31c-e574-467e-8199-249fb2447479.png)

Một cách nhanh và đơn giản để khai báo và khởi tạo một mảng là sử dụng array literal (từ này mình cũng chưa biết dịch sao cho thuận nghĩa). Array literals cho phép bạn khai báo số lượng phần tử và giá trị của từng phần tử trong mảng

```go
// Khai báo một mảng integer có 5 phần tử
// Khởi tạo giá trị cho mỗi phần tử
array := [5]int{10, 20, 30, 40, 50}
```

Nếu độ dài của mảng nhận vào **...**, **Go** sẽ xác định độ dài của mảng dựa vào số phần tử được khởi tạo.

```go
// Khai báo một mảng kiểu integer.
// Khởi tạo giá trị cho mỗi phần tử.
// Mảng lúc này sẽ có độ dài là 6.
array := [...]int{10, 20, 30, 40, 50, 60}
```

### 1.3 Làm việc với mảng (Working with arrays)
Như bạn đã biết, mảng là một cấu trúc dữ liệu hiệu quả vì bộ nhớ được sắp xếp theo trình tự. Điều này mang lại lợi thế khi truy cập từng phần tử của mảng. Để truy cập từng phần tử của mảng sử dụng toán tử **[ ]**
```go
// Khai báo một mảng integer có 5 phần tử.
// Khởi tạo giá trị cho mỗi phần tử.
array := [5]int{1, 2, 3, 4, 5}

// Thay đổi giá trị của mảng tại vị trí số 2.
array[2] = 6
```
Bạn cũng có thể sử dụng con trỏ với mảng. Sử dụng toán toán tử **star(*)** để truy cập vào giá trị mà mỗi con trỏ trỏ đến. Hình minh hoạ bên dưới:
```go
// Khai báo một mảng con trỏ integer có 5 phần tử.
// Khởi tạo giá trị cho phần tử có index là 0 và 1.
array := [5]*int{0: new(int), 1: new(int)}

// Gán giá trị cho phần tử ở vị trí 0 và 1.
*array[0] = 10
*array[1] = 20
```

![](https://images.viblo.asia/33d5ad7c-6561-4ee3-a442-b06a51e2ca5f.png)

Trong **Go**, mảng là một giá trị. Điều này nghĩa là bạn có thể dùng nó với toán tử gán (assignment operation). Tên biến biểu thị toàn bộ mảng, do đó bạn có thể gán cho các mảng cùng kiểu.
```go
//Khai báo mảng có 5 phần tử.
var array1 [5]string

// Khai báo mảng có 5 phần tử.
// Khởi tạo giá trị colors cho 5 phần tử.
array2 := [5]string{"Red", "Blue", "Green", "Yellow", "Pink"}

// Gán giá trị của array2 vào array1.
array1 = array2
```
Sau khi thực hiện toán tử gán, bạn sẽ có 2 mảng giống hệt nhau. Như hình minh hoạ bên dưới:
![](https://images.viblo.asia/e40c301b-8f88-42c5-a010-0e2d6af8c4b8.png)

Loại của một biến mảng bao gồm cả độ dài và kiểu dữ liệu nó có thể lưu trữ cho mỗi phần tử. *Bạn chỉ có thể sử dụng toán tử gán với những mảng có cùng kiểu*

Sao chép một mảng con trỏ sẽ sao chép giá trị của con trỏ chứ không phải giá trị mà con trỏ đang trỏ tới.
```go
// Khai báo một mảng con trỏ string có 3 phần tử.
var array1 [3]*string

// Khai báo một mảng con trỏ string có 3 phần tử và khởi tạo.
array2 := [3]*string{new(string), new(string), new(string)}

// Thêm giá trị cho mỗi phần tử.
*array[0] = "Red"
*array[1] = "Blue"
*array[0] = "Green"

// Sao chép giá trị từ array2 vào array1.
array1 = array2
```
Sau khi sao chép, bạn có 2 mảng cùng trỏ đến một string. Như hình mình hoạ bên dưới:
![](https://images.viblo.asia/58e46571-7776-42e9-80a9-cd0cc73c422d.png)

### 1.4 Truyền mảng giữa các hàm (Passing arrays between functions)

Truyền mảng giữa các hàm có thể ảnh hưởng đến hiệu năng và tốn kém về bộ nhớ. Khi bạn truyền một biến giữa các hàm, chúng luôn luôn truyền giá trị. Khi biến của bạn là một mảng, bất kể kích thước của nó là gì, nó sẽ tạo ra một bản sao và truyền nó vào hàm. Xem ví dụ minh hoạ bên dưới:
```go
// Khai báo một mảng integer (8 megabytes trên hệ điều hành 64 bit).
var array [1e6]int

// Truyền mảng vào hàm foo.
foo(array)

// Hàm foo nhận vào một mảng integer một triệu phần tử.
func foo(array [1e6]int) {
    ...
}
```
Mỗi khi hàm *foo* được gọi 8 megabytes sẽ được phân bổ trên stack, sau đó chúng được sao chép và truyền vào hàm *foo*. **Go** có thể xử lý hành động sao chép này, nhưng để hiệu quả hơn, bạn nên truyền vào một con trỏ và nó chỉ copy 8 bytes, thay vì 8 megabytes của bộ nhớ được phân bổ trên stack.
```go
// Khai báo một mảng integer (8 megabytes trên hệ điều hành 64 bit).
var array [1e6]int

// Truyền địa chỉ của mảng vào hàm *foo*.
foo(&array)

// Hàm foo nhận vào một con trỏ tới một mảng integer một triệu phần tử.
func foo(array *[1e6]int) {
    ...
}
```
Khi hàm *foo* được gọi sẽ nhận vào một con trỏ tới một mảng có 1 triệu phần tử kiểu integer. Hàm bây giờ sẽ nhận vào địa chỉ của mảng, điều này chỉ yêu cầu 8 bytes của bộ nhớ được phân bổ trên stack cho biến con trỏ.
Hành động này sẽ giúp tối ưu về hiểu năng trên bộ nhớ. Bạn chỉ cần nhận biết điều này vì khi bạn sử dụng con trỏ, thay đổi giá trị mà con trỏ đang trỏ tới sẽ thay đổi giá trị trên bộ nhớ đã được chia sẻ.

Bài viết về mảng khá dài, tuy nhiên mình nghĩ nội dung này cũng cấp khá đầy đủ về cách khai báo, cách sử dụng, cũng như là cách tối ưu khi sử dụng mảng truyền giữa các hàm. Nếu các bạn thấy hay thì hãy cho mình xin 1 like để mình có động lực làm thêm những bài sau nữa nhé :)

Link bài viết gốc đây các bạn nhé https://chiasekienthuc.netlify.app/blog/arrays.