Nguồn: https://www.raywenderlich.com/7181017-unsafe-swift-using-pointers-and-interacting-with-c

Trong bài hướng dẫn này, bạn sẽ học  cách sử dụng unsafe Swift để truy cập trực tiếp vào memory thông qua các kiểu con trỏ pointer đa dạng.

Mặc định thì Swift là memory safe: Nó ngăn chặn truy cập trực tiếp vào memory và chắc chắn là bạn đã khởi tạo mọi thứ trước khi sử dụng. Cụm từ khoá chính là "by default". Bạn cũng có thể sử dụng unsafe Swift, cái sẽ cho phép bạn truy cập trực tiếp vào memory thông qua pointer.

Unsafe không có nghĩa là nguy hiểm, code ko tốt, đoạn code mà có thể ko làm việc. Thay vào đó, nó có nghĩa là đoạn code cần chú ý cẩn thận bởi những giới hạn mà trình compiler có thể bảo vệ bạn khỏi các lỗi sai.

Những tính năng này sẽ unsafe nếu bạn phối hợp với ngôn ngữ unsafe như là C, cần phải đạt được hiệu năng thời gian chạy bổ sung hoặc chỉ đơn giản là muốn khám phá nội bộ của Swift. Trong bài hướng dẫn này, bạn sẽ học cách sử dụng pointer và tương tác trực tiếp với memory system.

# Getting Started/Bắt đầu
Download file source demo trong link nguồn.

Bài hướng dẫn này bao gồm 3 file Swift playground rỗng.
- Trong file playground đầu tiên, bạn sẽ sử dụng một vài đoạn snipper ngắn của code để khám phá memory layout. Bạn cũng sẽ thử một chút về unsafe pointer.
- Trong file thứ hai, bạn sẽ sử dụng low-level C API, cái thực hiện streaming data nén và wrap (tách) nó với Swift interface.
- Trong file cuối cùng, bạn sẽ tạo một platform độc lập thay thế cho `arc4random`để tạo các số ngẫu nhiên. Nó sử dụng unsafe Swift, nhưng sẽ ẩn các chi tiết đó khỏi người dùng.

Hãy bắt đầu bằng việc mở file **UnsafeSwift** playground. Vì code trong bài hướng dẫn này là platform-agnostic nên bạn có thể chọn bất khi platform nào.

# Exploring Memory Layout With Unsafe Swift/Khám phá memory layout với unsafe Swift
![](https://images.viblo.asia/d973a676-1fd3-4606-888f-93d40d74425e.png)

Unsafe Swift làm việc trực tiếp với memory system. Bạn có thể giả tưởng memory như là tập hợp các hộp - hàng tỷ cái hộp, và mỗi hộp chứ một con số.

Mỗi hộp sẽ có memory address riêng. Đơn vị nhỏ nhất để lưu trữ địa chỉ bộ nhớ là **byte**, cái thường bao gồm 8 **bits**.

8bit có thể lưu trữ giá trị từ 0-255. Bộ xử lý cũng có thể truy cập hiệu quả vào các **words** của memory, cái mà thường là nhiều hơn 1 byte.

Trên hệ thống 64-bit, ví dụ, một từ sẽ là 8bytes hoặc 64bits. Để thấy nó bạn sẽ sử dụng `MemoryLayout` để thấy kích thước và căn chỉnh một vài thành phần của kiểu Swift native.

Thêm đoạn sau vào playground:
```
import Foundation

MemoryLayout<Int>.size          // returns 8 (on 64-bit)
MemoryLayout<Int>.alignment     // returns 8 (on 64-bit)
MemoryLayout<Int>.stride        // returns 8 (on 64-bit)

MemoryLayout<Int16>.size        // returns 2
MemoryLayout<Int16>.alignment   // returns 2
MemoryLayout<Int16>.stride      // returns 2

MemoryLayout<Bool>.size         // returns 1
MemoryLayout<Bool>.alignment    // returns 1
MemoryLayout<Bool>.stride       // returns 1

MemoryLayout<Float>.size        // returns 4
MemoryLayout<Float>.alignment   // returns 4
MemoryLayout<Float>.stride      // returns 4

MemoryLayout<Double>.size       // returns 8
MemoryLayout<Double>.alignment  // returns 8
MemoryLayout<Double>.stride     // returns 8
```

`MemoryLayout<Type>` là kiểu dữ liệu động, được đánh giá khi complite. Nó xác định kích `size`, `alignment` và `stride` của mỗi `Type` nhất định và trả về số byte.

Ví dụ, một `Int16` là có `size` 2 byte và `alignment` cũng là 2. Điều đó có nghĩa là nó sẽ phải bắt đầu mới address chẵn, nghĩa là address phải chia hết cho 2.

Ví dụ, được phép khởi tạo một `Int16`  ở address 100, nhưng không được tạo ở 101, số lẻ sẽ vi phạm yêu cầu alignment.

Khi bạn gói một bó của các `Int16` cùng nhau, chúng sẽ gói trong một bó của các `stride`. Cho những kiểu basic này, `size` cũng tương tự như `stride`.

# Examining Struct Layouts/Kiểm tra cấu trúc layout

Tiếp theo, nhìn vào layout của một số `struct` được định nghĩa bởi user bằng cách thêm đoạn code sau vào playground:
```
struct EmptyStruct {}

MemoryLayout<EmptyStruct>.size      // returns 0
MemoryLayout<EmptyStruct>.alignment // returns 1
MemoryLayout<EmptyStruct>.stride    // returns 1

struct SampleStruct {
  let number: UInt32
  let flag: Bool
}

MemoryLayout<SampleStruct>.size       // returns 5
MemoryLayout<SampleStruct>.alignment  // returns 4
MemoryLayout<SampleStruct>.stride     // returns 8
```

Một struce rỗng sẽ có size là 0 (zero). Nó có thể tồn tại ở bất kỳ address nào vì `alignment` là 1, và mọi số đều chia hết cho 1.

Còn `stride`, cũng là 1. Đó là bởi vì mỗi `EmptyStruct` bạn tạo sẽ phải có một memory address riêng, mặc dù size của nó là 0.

Với `SampleStruct`, `size` của nó là 5 nhưng `stride` là 8. Đó là bởi vì alignment của nó cần có viền 4-byte. Với điều đó, điều tốt nhất mà Swift có thể làm là gói 8byte một.

Để xem layout khác nhau thế nào cho `class` và `struct`, thêm đoạn sau:
```
class EmptyClass {}

MemoryLayout<EmptyClass>.size      // returns 8 (on 64-bit)
MemoryLayout<EmptyClass>.stride    // returns 8 (on 64-bit)
MemoryLayout<EmptyClass>.alignment // returns 8 (on 64-bit)

class SampleClass {
  let number: Int64 = 0
  let flag = false
}

MemoryLayout<SampleClass>.size      // returns 8 (on 64-bit)
MemoryLayout<SampleClass>.stride    // returns 8 (on 64-bit)
MemoryLayout<SampleClass>.alignment // returns 8 (on 64-bit)
```

Các class là kiểu reference, nên `MemoryLayout` sẽ báo kích thước của một reference: 8 bytes.

# Using Pointers in Unsafe Swift/Sử dụng Pointers với Unsafe Swift
Một pointer sẽ bao một memory address.

Kiểu mà liên quan trực tiếp đến memory access sẽ có một unsafe prefix, vì vậy mà tên của kiểu pointer là `UnsafePointer`.

Những thứ phải gõ thêm có thể là hơi phiền, nhưng hãy nhớ rằng bạn đang truy cập vào memory cái mà compiler đang không kiểm tra. Khi chạy không đúng, nó có thể dẫn tới những hành vi không được định nghĩa (undefined behavior), chứ không chỉ là crash.

Swift không cung cấp một kiểu `UnsafePointer` để truy cập vào memory với con đường không được cấu trúc (unstructured), như là `char *` của C. Swift chứa gần như 1 tá kiểu pointer, mỗi cái phục vụ chức năng và mục tiêu khác nhau.

Bạn sẽ luôn muốn sử dụng kiểu pointer thích hợp nhất với mục đích của bạn. Điều này là nhằm ý định giao tiếp tốt hơn, ít lỗi và tránh các hành vi không được định nghĩa.

Unsage Swift pointer sử dụng một cấu trúc đặt tên có thể dự đoán được, mô tả hành vi của pointer: mutable hoặc immutable, raw hoặc typed, buffer style hoặc không. Trong tổng thế, có 8 pointer kết hợp với nhau. Bạn sẽ có thêm thông tin về nó trong các phần sau.
![](https://images.viblo.asia/4e3458ef-8146-46ac-ade9-c46552666bbf.png)

# Using Raw Pointers/Sử dụng Raw Pointer
Trong phần này, bạn sẽ sử dụng unsafe Swift pointer để lưu trữ và load 2 số integers. Thêm đoạn code sau vào playground:
```
// 1
let count = 2
let stride = MemoryLayout<Int>.stride
let alignment = MemoryLayout<Int>.alignment
let byteCount = stride * count

// 2
do {
  print("Raw pointers")
  
  // 3
  let pointer = UnsafeMutableRawPointer.allocate(
    byteCount: byteCount,
    alignment: alignment)
  // 4
  defer {
    pointer.deallocate()
  }
  
  // 5
  pointer.storeBytes(of: 42, as: Int.self)
  pointer.advanced(by: stride).storeBytes(of: 6, as: Int.self)
  pointer.load(as: Int.self)
  pointer.advanced(by: stride).load(as: Int.self)
  
  // 6
  let bufferPointer = UnsafeRawBufferPointer(start: pointer, count: byteCount)
  for (index, byte) in bufferPointer.enumerated() {
    print("byte \(index): \(byte)")
  }
}
```

Đây là những gì đang diễn ra:
1. Những hằng số giữ các giá trị hay được sử dụng:
    * **Count** giữ số integer để lưu trữ
    * **Stride** giữ stride của kiểu `Int`
    * **Alignment** giữ alignment của kiểu `Int`
    * **ByteCount** giữ tổng số byte cần
2. Một khối `do`  để thêm scope level, để bạn có thể sử dụng lại các tên biến trong các ví dụ tiếp theo.
3. `UnsafeMutableRawPointer.allocate` khởi tạo các byte được yêu cầu. Method này trả về một `UnsafeMutableRawPointer`. Tên của kiểu này sẽ cho bạn biết pointer có thể load, store hoặc mutable, raw byte.
4. Một khối `defer` để chắc chắn bạn huỷ pointer chính xác. ARC sẽ không thể giúp bạn ở đây - bạn cần tự quản lý memory! 
5. `storeBytes` và `load`, không ngạc nhiên, lưu trữ và load byte. Bạn tính toán memory address của số integer thứ hai bằng byte pointer `stride`. Khi pointer là `Strideable`, bạn cũng có thể sử dụng pointer số học như:
 `(pointer+stride).storeBytes(of: 6, as: Int.self)`
6. Một `UnsafeRawBufferPointer` cho phép bạn truy cập memory như là nơi lưu trữ của byte. Điều đó có nghĩa bạn có thể tương tác thông qua byte và truy cập chúng sử dụng subscripting (đăng ký). Bạn cũng có thể sử dụng những phương thức rất hay như `filter, map, reduce`. Bạn khởi tạo buffer pointer sử dụng pointer gốc.

Mặc dù vậy `UnsafeRawBufferPointer` là unsafe, bạn vẫn có thể làm nó an toàn hơn bằng cách ràng buộc với một kiểu cố định.

### Phần sau:
### Sử dụng Type Pointer