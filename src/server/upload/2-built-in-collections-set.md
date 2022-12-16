# Sets
Kiểu tập hợp chính lớn thứ 3 trong thư viện cơ bản là Set. 1 set là tập hợp không thứ tự các đối tượng, với mỗi đối tượng là riêng biệt. Bạn có thể về cơ bản 1 set như dictionary nhưng chỉ lưu trữ các key mà không có value. Giống như Dictionary, Set cũng được bổ sung với 1 bảng hash và có đặc điểm và yêu cầu hiệu suất tương tự. Kiểm thử giá trị mỗi thành phiên trong set mất thời gian cố định, và thành phần của set phải thoả mãn Hashable, giống như key của dictionary.

Sử dụng set thay thế mảng khi bạn cần kiểm tra hiệu quả cho thành viên ( toán tử O(n) cho array) và thứ tự phần tử không quan trọng, hoặc khi bạn cần chắc rằng tập hợp các đối tượng không bị lặp lại.

Set thoả mản giao thức ExpressibleByArrayLiteral, nghĩa là chúng ta có thể khởi tạo nó với 1 mảng như sau:

```
let naturals: Set = [1, 2, 3, 2]
naturals // [2, 3, 1] 
naturals.contains(3) // true
naturals.contains(0) // false
```

Nhớ rằng số 2 chỉ tồn tại 1 lần trong set, giá trị bị lặp sẽ không được thêm vào.
Gioongs như tất cả tập hợp, set hỗ trợ những toán tử cở ản chúng ta sẽ sớm được thấy: bạn có thể tiêp cận các phần tử thông qua vòng lặp for, map hoặc filter chúng, và làm tất cả các phép sắp xếp chúng.

## Set Algebra
Giống như cái tên, Set có liên quan mật thiết với khái niệm toán học của 1 tập hợp; nó hỗ trợ tất cả các toán tử tập hợp bạn từng hợp trong lớp học toán. Ví dụ, bạn có thể `subtract` 1 set này với cái khác:

```
let iPods: Set = ["iPod touch", "iPod nano", "iPod mini", "iPod shuffle", "iPod Classic"]
let discontinuedIPods: Set = ["iPod mini", "iPod Classic", "iPod nano", "iPod shuffle"]
let currentIPods = iPods.subtracting(discontinuedIPods) // ["iPod touch"]
```

Chúng ta cũng có thể `intersection` giữa 2 set. Tìm ra tất cả phẩn tử có ở cả 2:

```
let touchscreen: Set = ["iPhone", "iPad", "iPod touch", "iPod nano"] 
let iPodsWithTouch = iPods.intersection(touchscreen)
// ["iPod touch", "iPod nano"]
```

Hoặc cũng có thể `union` 2 set. Kết hợp chúng thành 1 ( tất nhiên là có loại sự lặp lại):

```
var discontinued: Set = ["iBook", "Powerbook", "Power Mac"] 
discontinued.formUnion(discontinuedIPods)
discontinued
/*
["iBook", "Powerbook", "Power Mac", "iPod Classic", "iPod mini", "iPod shuffle", "iPod nano"]
*/
```

Ơ đây, chúng ta đã sử dụng những phương thức biến đổi gốc `fromUnion` để thay đổi set gốc( chúng như kết qủa được khởi tạo với định danh var). Phần lớn các toán tử set có cả chuyển biến hoặc không, bắt đầu với `form`... Để tìm hiểu thêm về toán tử set, hãy xem qua giao thức SetAlgebra.

## Index Set và Character Set
Set và OptionSet đều chỉ là những kiểu trong thư viện cơ bản thoả mãn SetAlgebra, nhưng giao thức cũng được thừa hưởng bởi 2 loại thường dùng trong Foundation: IndexSet và CharacterSet. Chúng đều đã có từ lâu trước khi Swift ra đời. Cách mà chúng và những lớp Objective-C được sử dụng trong Swift 1 cách đầy đủ nhất - áp dụng các giao thức thư viện cơ bản chung trong quá trình - là cách tuyệt vời để chúng ngay lập tức trở nên gần gũi với lập trình viên Swift.

Indết được miêu tả như tập hợp những giá trị nguyên dương. Bạn có thể làm việc với `Set<Int>`nhưng `IndexSet` còn lưu trữ hiệu quả hơn vì nó sử dụng mảng lưu trữ nội bộ. Ví dụ bạn có 1 bảng có 1000 phần tử và bạn muốn sử dụng tập hợp để quản lý chỉ số tất cả hàng được chọn. 1 `Set<Int>` cần lưu trữ lên tới 1000 đối tượng, tuỳ thuộc vào bao nhiêu hàng được chọn. Mặt khác, 1 IndexSet, lưu trữ mảng liên tục, do đó việc lưu trữ 500 hàng đầu tiên của bảng chỉ mất 2 số nguyên để lưu trữ ( phương pháp chọn đầu và cuối).
    
Tuy nhiên, là người sử dụng 1 IndexSet, bạn không cần quan tâm tới cấu trúc nội bộ, vì đã được ẩn hoàn toàn bên dưới giao diện SetAlgebra và Collection. ( trừ phi bạn muốn làm việc với phạm vị trực tiếp, thì, IndexSet sẽ hiển thị chúng thông qua thuộc tính rangeView, bản thân nó là 1 collection.) Ví dụ: bạn có thể thêm một vài phạm vi vào một bộ chỉ mục và sau đó ánh xạ qua các chỉ mục như thể chúng là các thành viên riêng lẻ:
    
```
var indices = IndexSet()
indices.insert(integersIn: 1..<5)
indices.insert(integersIn: 11..<15)
let evenIndices = indices.filter { $0 % 2 == 0 } // [2, 4, 12, 14]
```

CharacterSet là 1 cách hiệu quả tương tự lưu trữ 1 tập hợp điểm Unicode. Nó thường sử dụng để kiểm tra nếu chuỗi đang dùng có chữa kí tự từ 1 chuỗi  ký tự đặc biệt , giống như chữ số hoặc số thập phân. Tuy nhiên, không như IndexSet, CharacterSet không là 1collection. Cái tên CharacterSet, được thêm vào từ Objective-C, cũng không tương thích với loại Character của Swift. 1 cái tên khác phổ biến hơn là UnicodeScalarSet. Chúng ta sẽ nói về CharacterSet vào chương về String.

## Sử dụng tập hợp bên trong Closures
Dictionary và set có thể sử dụng cấu trúc dữ liệu được dùng bên trong phương thức của bạn, kể cả khi chúng không biết nơi chúng được gọi tới. Ví dụ, bạn muốn viết 1 mở rộng trên Sequence để lấy tất cả phần tử độc lập trong chuỗi, bạn có thể dễ dàng đặt các đối tượng trong set và trả về dữ liệu của nó. Tuy nhiên, điều đó, sẽ không `stable`: vì 1 tập hợp không có định nghĩa thứ tự, phần tự được thêm vào sẽ được sắp xếp lại trong kết quả. Để sửa điều này, chúng ta có thể viết 1 mở rộng để duy trì việc sắp xếp bởi Set trong bookeeping:

```
extension Sequence where Element: Hashable { 
    func unique() -> [Element] {
        var seen: Set<Element> = [] 
        return filter { element in
            if seen.contains(element) { 
                return false
            } else {
                    seen.insert(element) return true
            }
        }
    } 
}

[1,2,3,12,1,3,4,5,6,4,6].unique() // [1, 2, 3, 12, 4, 5, 6]
```

Phương thức bên dưới cho phếp chúng ta tìm tát cả phần tử duy nhất trong 1 chuỗi trong khi vẫn duy trì thứ tự gốc ( cùng với điều kiện các phần tử phải là Hashable). Bên trong closure chúng ta chuyền vào filter, ánh xạ tới giá trị seen mà chúng ta đã khởi tạo bên ngoài closure, do đó duy trì trạng thái qua nhiều lần lặp lại của closure, chúng ta sẽ tìm hiểu chi tiết công nghệ này sau.