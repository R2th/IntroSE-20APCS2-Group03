# Mở đầu
Trong Kotlin, biểu thức `switch...case` đã được thay thế bằng biểu thức `when`. Biểu thức `when` hoạt động rất mạnh mẽ, đa năng, đáp ứng được nhiểu trường hợp xử lý cho lập trình viên. Hi vọng với bài viết này, các bạn sẽ nắm rõ hơn cách thức hoạt động của biểu thức `when` để có thể áp dụng vào công việc.

# Kiến thức cơ bản
Cú pháp tổng quát của biểu thức `when` như sau:
```php
when(<expression>){
    <value 1> -> <statement 1>
    <value 2> -> <statement 2>
     else -> <statement else>
}
```

`when` lấy giá trị trong `expression`, đem so sánh với các `value` bên trong biểu thức.  Nếu trùng khớp với `value` nào thì `statement` đó sẽ được thực thi. Nếu tất cả `value` đều không trùng khớp với `expression` nào cả thì `else` sẽ được thực hiện.

Lược đồ của biểu thức `when` có thể được mô tả như hình dưới đây:
![](https://images.viblo.asia/a2651a4a-23ec-4d74-a4d2-65452a43ef31.png)

# Các ví dụ
## Ví dụ 1:
Ta có thể viết một biểu thức `if...else` khổng lồ với tất cả các điều kiện, nhưng điều đó rất khó để maintain về sau này. 
```php
val instruction = fetchNextInstruction()
if (instruction == 0x0)
    handleBreak()
else if (instruction == 0x8)
    handlePushProcessorStatus()
else if (instruction == 0x10)
    handleBranchOnPlus()
// Many other instructions...
else
    throw IllegalStateException("Unknown instruction: ${instruction.toHex()}")
```
Thay vào đó ta có thể thay thế bằng `when`:
```php
val instruction = fetchNextInstruction()
when (instruction) {
    0x0 -> handleBreak()
    0x8 -> handlePushProcessorStatus()
    0x10 -> handleBranchOnPlus()
    // Many other instructions...
    else -> throw IllegalStateException("Unknown instruction: ${instruction.toHex()}")
}
```

## Ví dụ 2:
`Kotlin` cho phép ta gom nhóm điều kiện để sử dụng trong biểu thức `when` nếu như các giá trị này đều cùng giải quyết một vấn đề nào đó bằng dấu phẩy để ngăn cách các giá trị:
```php
when (month) {
    1, 2, 3 -> println("Quý I")
    4, 5, 6 -> println("Quý II")
    7, 8, 9 -> println("Quý III")
    10, 11, 12 -> println("Quý IV")
    else -> println("Tháng không hợp lệ")
}
```

## Ví dụ 3:
Biểu thức `when` của `Kotlin` rất mạnh mẽ, cho phép ta kiểm tra theo các vùng dữ liệu liên tục:
```php
when (month) {
    1..3 -> println("Quý I")
    4..6 -> println("Quý II")
    7..9 -> println("Quý III")
    10..12 -> println("Quý IV")
    else -> println("Tháng không hợp lệ")
}
```

## Ví dụ 4:
Ngoài ra `when` còn là một biểu thức trả về kết quả:
```php
fun getCartridgeMapper(rom: Cartridge): Mapper {
    var mapper: Mapper? = null
    when (rom.mapperId) {
        1 -> mapper = MMC1(rom)
        3 -> mapper = CNROM(rom)
        4 -> mapper = MMC3(rom)
        // Etc…
    }
    return mapper ?: throw NotImplementedError("Mapper for ${rom.mapperId} not yet implemented")
}
```
Hoặc ta có thể đơn giản hóa như sau:

```php
fun getCartridgeMapper(rom: Cartridge): Mapper = when (rom.mapperId) {
    1 -> MMC1(rom)
    3 -> CNROM(rom)
    4 -> MMC3(rom)
    // Etc...
    else -> throw NotImplementedError("Mapper for ${rom.mapperId} not yet implemented")
}
```
Cách sử dụng này loại bỏ các biến tạm thời và chuyển đổi phần thân của hàm thành phần thân của biểu thức. 

## Ví dụ 5:
Ta cũng có thể sử dụng toán tử `is` để kiểm tra loại tham số đầu vào của `when`:
```php
interrupt?.let {
    val handled = when (interrupt) {
        is NonMaskableInterrupt -> handleNMI()
        is ResetInterrupt -> handleReset()
        is BreakInterrupt -> handleBreak()
        is InterruptRequestInterrupt -> handleIRQ(interrupt.number)
    }
}
```

# Kết luận
Từ các ví dụ trên, hi vọng các bạn nhận thấy được sức mạnh của biểu thức `when` để áp dụng nó nhiều hơn trong những dự án của các bạn. Cảm ơn các bạn đã theo dõi bài viết này.

## Nguồn tham khảo:
[https://medium.com/androiddevelopers/kotlin-demystified-the-power-of-when-f0ac616ddd1a](https://medium.com/androiddevelopers/kotlin-demystified-the-power-of-when-f0ac616ddd1a)