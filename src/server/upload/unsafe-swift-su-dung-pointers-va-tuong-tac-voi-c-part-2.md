Nguồn: https://www.raywenderlich.com/7181017-unsafe-swift-using-pointers-and-interacting-with-c

Phần 1: https://viblo.asia/p/unsafe-swift-su-dung-pointers-va-tuong-tac-voi-c-part-1-V3m5WaebZO7

# Using Typed Pointers/Sử dụng Typed Poninter

Bạn có thể làm đơn giản ví dụ trước đó sử dụng typed pointer. Thêm đoạn code sau vào playground của bạn:
```
do {
  print("Typed pointers")
  
  let pointer = UnsafeMutablePointer<Int>.allocate(capacity: count)
  pointer.initialize(repeating: 0, count: count)
  defer {
    pointer.deinitialize(count: count)
    pointer.deallocate()
  }
  
  pointer.pointee = 42
  pointer.advanced(by: 1).pointee = 6
  pointer.pointee
  pointer.advanced(by: 1).pointee
  
  let bufferPointer = UnsafeBufferPointer(start: pointer, count: count)
  for (index, value) in bufferPointer.enumerated() {
    print("value \(index): \(value)")
  }
}
```
* Bạn khởi tạo memory sử dụng `UnsafeMutablePointer.allocate`. Parameter động sẽ cho phép Swift biết bạn đang sử dụng pointer để load và store value dạng Int.
* Bạn phải khởi tạo memory trước khi sử dụng và huỷ bỏ sau khi sử dụng. Bạn làm nó sử dụng method `initialize` và `deinitialize`. Hàm huỷ (deinitialization) chỉ yêu cầu với kiểu `non-trivial`. Tuy nhiên, bao gồm cả deinitialize là cách tốt để chuẩn bị trước cho tương lai trong trường hợp bạn đổi sang dạng non-trivial. Nó trường ko mất thêm chi phí gì vì compiler sẽ tinh chỉnh cho bạn.
* Kiểu pointer có thuộc tính `pointee`, cung cấp 1cách type-safe để load và store value.
* Khi nâng cấp một kiểu pointer, bạn có thể đơn giản state lại số của value mà bạn muốn nâng cấp. Pointer có thể tính toán chính xác stride dựa trên kiểu của value. Thêm nữa, kiểu pointer số học cũng hoạt động ở đây. Bạn có thể sử dụng `(pointer+1).pointee = 6`
* Điều tương tự cũng đúng với kiểu buffer pointer: Nó lặp đi lặp lại qua các value thay vì byte.

Tiếp theo, bạn sẽ học cách đi từ `UnsafeRawBufferPointer` không ràng buộc đến một kiểu an toàn hơn, kiểu `UnsafeRawBufferPointer` ràng buộc.

# Converting Raw Pointers to Typed Pointers/Chuyển đổi Raw Pointer sang Typed Pointer
Bạn không phải luôn cần khởi tại typed pointer trực tiếp. Bạn có thể chuyển hoá chúng từ raw pointer.

Thêm đoạn code sau vào playground:
```
do {
  print("Converting raw pointers to typed pointers")
  
  let rawPointer = UnsafeMutableRawPointer.allocate(
    byteCount: byteCount,
    alignment: alignment)
  defer {
    rawPointer.deallocate()
  }
  
  let typedPointer = rawPointer.bindMemory(to: Int.self, capacity: count)
  typedPointer.initialize(repeating: 0, count: count)
  defer {
    typedPointer.deinitialize(count: count)
  }

  typedPointer.pointee = 42
  typedPointer.advanced(by: 1).pointee = 6
  typedPointer.pointee
  typedPointer.advanced(by: 1).pointee
  
  let bufferPointer = UnsafeBufferPointer(start: typedPointer, count: count)
  for (index, value) in bufferPointer.enumerated() {
    print("value \(index): \(value)")
  }
}
```
Ví dụ này cũng tương tự như cái trước, trừ việc là tạo raw pointer đầu tiên. Bạn tạo typed pointer bằng cách binding memory đến các kiểu Int cần thiết.

Bằng việc binding memory, bạn có thể truy cập nó một cách type-safe. Memory binding sẽ làm việc ở phía sau cánh gà khi bạn tạo typed pointer.

Phần còn lại của ví dụ cũng tương tự như phần trước. Một khi bạn đã bước vào vùng đất của typed pinter, bạn có thể sử dụng `pointee`.

# Getting the Bytes of an Instance/Lấy Byte của một Instance

Thường thì bạn sẽ có một instance đã tốn tại của 1 type, và bạn muốn điều tra các byte từ nó. Bạn có thể đạt được bằng các sử dụng method gọi là `withUnsafeBytes(of:)`.

Để làm điều đó, thêm đoạn code sau vào playground:
```
do {
  print("Getting the bytes of an instance")
  
  var sampleStruct = SampleStruct(number: 25, flag: true)

  withUnsafeBytes(of: &sampleStruct) { bytes in
    for byte in bytes {
      print(byte)
    }
  }
}
```
Nó sẽ in ra các byte gốc của `SampleStruct`.

`withUnsafeBytes(of:)` cho phép bạn truy cập vào một `UnsafeRawBufferPointer` để bạn có thể sử dụng bên trong dấu ngoặc.

`withUnsafeBytes` cũng có thể sử dụng như một instance method của Array và Data.

# Computing a Checksum/Tính toán một Checksum

Sử dụng `withUnsafeBytes(of:)`, bạn có thể trả về một kết quả. Ví dụ, bạn có thể sử dụng nó để tính toán 32-bit checksum của byte trong một structure.

Thêm đoạn code sau vào playground:
```
do {
  print("Checksum the bytes of a struct")
  
  var sampleStruct = SampleStruct(number: 25, flag: true)
  
  let checksum = withUnsafeBytes(of: &sampleStruct) { (bytes) -> UInt32 in
    return ~bytes.reduce(UInt32(0)) { $0 + numericCast($1) }
  }
  
  print("checksum", checksum) // prints checksum 4294967269
}
```
Lệnh `reduce` sẽ thêm byte, sau đó `~` sẽ lật các bit. Khi mà không thấy có lỗi nào lớn, nó sẽ cho ta thấy ý tưởng.

Giờ bạn đã biết làm thể nào để sử dụng unsafe Swift, nó là lúc để học những điều bạn chắc chắn không nên làm với nó.

# Three Rules of the Unsafe Club/Ba luật của Unsafe Club

Cẩn thận để tránh nhưng hành vi không xác định khi viết unsafe code. Đây là một vài ví dụ của *bad code*:

## **Đừng trả về Pointer từ withUnsafeBytes!**
```
// Rule #1
do {
  print("1. Don't return the pointer from withUnsafeBytes!")
  
  var sampleStruct = SampleStruct(number: 25, flag: true)
  
  let bytes = withUnsafeBytes(of: &sampleStruct) { bytes in
    return bytes // strange bugs here we come ☠️☠️☠️
  }
  
  print("Horse is out of the barn!", bytes) // undefined!!!
}
```
Bạn không bao giờ nên để pointer thoát khỏi vòng kín của `withUnsafeBytes(of:)`. Thậm chí nếu hiện tại code của bạn đã chạy được, nó có thể xảy ra những bug lạ trong tương lai.

## **Chỉ Bind một kiểu một lúc!**
```
// Rule #2
do {
  print("2. Only bind to one type at a time!")
  
  let count = 3
  let stride = MemoryLayout<Int16>.stride
  let alignment = MemoryLayout<Int16>.alignment
  let byteCount = count * stride
  
  let pointer = UnsafeMutableRawPointer.allocate(
    byteCount: byteCount,
    alignment: alignment)
  
  let typedPointer1 = pointer.bindMemory(to: UInt16.self, capacity: count)
  
  // Breakin' the Law... Breakin' the Law (Undefined behavior)
  let typedPointer2 = pointer.bindMemory(to: Bool.self, capacity: count * 2)
  
  // If you must, do it this way:
  typedPointer1.withMemoryRebound(to: Bool.self, capacity: count * 2) {
    (boolPointer: UnsafeMutablePointer<Bool>) in
    print(boolPointer.pointee) // See Rule #1, don't return the pointer
  }
}
```
Không bao giờ bind memory vào 2 kiểu không liên quan cùng một lúc. Nó được gọi là **Type Punning** (kiểu nói giỡn) và Swift không thích bị nói giỡn.

Thay vào đó, bind tạm vào memory với method như là  `withMemoryRebound(to:capacity:)`.

Hơn nữa, nó là không được phép khi rebind từ một kiểu thường, như là `Int` đến một kiểu khác như là một `Class`. Đừng làm điều đó.

## Đừng đi ra ngoài End... Úi!
```
// Rule #3... wait
do {
  print("3. Don't walk off the end... whoops!")
  
  let count = 3
  let stride = MemoryLayout<Int16>.stride
  let alignment = MemoryLayout<Int16>.alignment
  let byteCount =  count * stride
  
  let pointer = UnsafeMutableRawPointer.allocate(
    byteCount: byteCount,
    alignment: alignment)
  let bufferPointer = UnsafeRawBufferPointer(start: pointer, count: byteCount + 1) 
  // OMG +1????
  
  for byte in bufferPointer {
    print(byte) // pawing through memory like an animal
  }
}
```
Vấn đề muôn thuở off-by-one sẽ trở nên tệ hơn với unsafe code. Cẩn thận, review là test lại!