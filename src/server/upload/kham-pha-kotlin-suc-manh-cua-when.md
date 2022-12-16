>  Chúng ta có thể viết một biểu thức lớn bao gồm các if - else if lồng nhau để sử dụng cho việc xử lí Logic nhưng bạn có nghĩ một ngày nào đó vài năm sau chúng ta quay trở lại với Project hoặc function đó để develop hoặc maintain chúng . Thật khó để đọc hiểu và nắm bắt chúng một lần nữa . Chính vì thế " When " thể hiện sức mạnh của mình .
### Basic :
```
val instruction = fetchNextInstruction()
when (instruction) {
    0x0 -> handleBreak()
    0x8 -> handlePushProcessorStatus()
    0x10 -> handleBranchOnPlus()
    // Many other instructions...
    else -> ShowSnackBar(throw.message)
}
 fun Int.toHex() = this.toString(16)
```
Trong trường hợp này "When" được sử dụng như là "Switch" Trong C++ hoặc Java
> Và đây chỉ là một trường hợp cơ bản để sử dụng when !! Đọc tiếp nào !!
### As an expression :
When có thể sử để lập lịch các điều kiện Logic để sau đó trả về một giá trị đầu ra của một hàm . Dựa trên việc hiện thực hóa When là Switch của Kotlin .
```
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
Trên đây là ví dụ về việc trả lại giá trị đầu ra của hàm nhưng nó chưa phải là cách viết tốt nhất . When cho phép chúng ta viết như thế này !!
```
fun getCartridgeMapper(rom: Cartridge): Mapper = when (rom.mapperId) {
    1 -> MMC1(rom)
    3 -> CNROM(rom)
    4 -> MMC3(rom)
    // Etc...
    else -> throw NotImplementedError("Mapper for ${rom.mapperId} not yet implemented")
}
```
Điều này giúp loại bỏ được biến tạm thời và chuyển đổi thân hàm thành biểu thức chứa When  nhưng vẫn tập trung vào thành phần chính của biểu thức !
### Beyond simple case statements
Một trong những hạn chế của Switch trong C++ là các gía trị bị giới hạn bởi cái biểu thức không đổi . Chúng ta cùng xem When xử lí nó như thế nào với ví dụ dưới dây :
```
val data = when (addressToRead) {
    in 0..0x1fff -> {
        val bank = addressToRead / 0x1000
        val bankAddress = addressToRead % 0x1000
        readBank(bank, bankAddress)
    }
    in 0x6000..0x7fff -> {
        readPrgRam(addressToRead - 0x6000)
    }
    // etc...
}
```
Bạn còn có thể dùng toán tử "Is" để kiểm tra Parameter . Ta có các class :
```
class NonMaskableInterrupt : Interrupt()
class ResetInterrupt : Interrupt()
class BreakInterrupt : Interrupt()
class InterruptRequestInterrupt(val number: Int) : Interrupt()
```
Và sau đó :
```
interrupt?.let {
    val handled = when (interrupt) {
        is NonMaskableInterrupt -> handleNMI()
        is ResetInterrupt -> handleReset()
        is BreakInterrupt -> handleBreak()
        is InterruptRequestInterrupt -> handleIRQ(interrupt.number)
    }
}
```
When cũng có thể dùng mà không cần có một parameter . Ví dụ như :
```
when {
    address < 0x2000 -> writeBank(address, value)
    address >= 0x6000 && address < 0x8000 -> writeSRam(address, value)
    address >= 0x8000 -> writeRegister(address, value)
    else -> throw RuntimeException("Unhandled write to address ${address.toHex()}")
}
```
###  One more thing 
Bình thường chúng ta có thể thực hiện các hàm và đây là cách duy nhất để thực hiện nó :
```
getMapper().let { mapper ->
    when (mapper) {
        is MMC5 -> mapper.audioTick()
        is Mapper49 -> mapper.processQuirks()
        // Etc... 
    }
}
```
Nhưng kể từ Kotlin 1.3M1 , nó có thể viết như sau , việc này có thể thay vì một biểu thức thì nó hoàn toàn được xử lý với  When thông qua biến trung gian  :
```
when (val mapper = getMapper()) {
    is MMC5 -> mapper.audioTick()
    is Mapper49 -> mapper.processQuirks()
    // Etc... 
}
```
### Kết Luận : 
> Trên đây chúng ta thấy được cách When hoạt động  như Switch trong C++ và Java . Nhưng nó còn thể hiện được sức mạnh của mình trong những vấn đề phức tạp khi cần và giải quyết nó gọn gàng dễ đọc hiểu khi maintain lại code . Đây là Chia sẽ của mình Về When mong là nó giúp ích cho các bạn . Thank for watching !!