# 1. Khái niệm biến và hàm
Nhớ lại ngày xưa học toán có hàm số **f(x) = 2x + 1**, khi đó ta gọi **f(x) là hàm số còn x là biến số**.! Bài toán yêu cầu tính giá trị của hàm số khi biến số **x = 3**. Ta chỉ cần thay **x = 3** vào **2x + 1 = 2 * 3 + 1 = 7**. Easy! :D

> Biến và hàm trong lập trình nó cũng giống như biến số và hàm số trong toán học ở ví dụ trên vậy thôi. 

Nhớ lại [bài 1](https://viblo.asia/p/tro-thanh-lap-trinh-vien-voi-ngon-ngu-kotlin-bai-1-hello-kotlin-hi-may-tinh-RnB5p39JlPG#_4-may-tinh-hoat-dong-nhu-the-nao-3) chúng ta đã biết máy tính hoạt động dựa vào 4 bước chính là: Input (nhập dữ liệu đầu vào có thể là số, text hay file pdf, mp3, mp4,...), Storage (lưu trữ dữ liệu đó), Processing (xử lý dữ liệu đó) và Output (cho ra kết quả mong muốn). Hiểu ở cấp độ nhỏ hơn thì **biến** nó đóng vai trò như 2 bước đầu là **Input** và **Storage**, còn **hàm** đóng vai trò 2 bước còn lại là **Processing** và **Output**. Giống như ở ví dụ trên chúng ta nhập `3` vào `x` (3 chính là input), `x` sẽ lưu trữ giá trị `3` đó và đưa vào hàm số `f(x)` xử lý tính toán ra đáp số là `7` (7 chính là output). 

Như vậy, **biến** dùng để chứa thông tin (có thể là số, text hay file pdf, mp3, mp4,...), còn **hàm** là để xử lý thông tin cho ra kết quả.

# 2. Kiểu dữ liệu, cách khai báo biến trong Kotlin
Như đã nói ở trên, biến dùng để chứa thông tin (có thể là số, text hay file pdf, mp3, mp4,...). Như vậy để biết chính xác biến đó đang lưu số hay text hay File ta cần khai báo cho biến một kiểu dữ liệu, vậy kiểu dữ liệu có thể là kiểu số, kiểu text, kiểu file,...

Trong Kotlin để khai báo một biến ta làm theo cú pháp như sau:
``` kotlin
var myAge : Int = 18
```

![](https://images.viblo.asia/29c9ccf4-ad6f-459f-a529-d5d461ede859.PNG)

Trong đó:

`var` là syntax (hay keyword) của ngôn ngữ Kotlin, nó giúp Kotlin có thể hiểu rằng bạn đang khai báo một biến.

`myAge` là tên biến, tên do mình đặt. Tên biến không phải ưa đặt tên gì cũng được, có quy ước cách đặt tên (naming convention). Cụ thể chữ cái đầu tiên được viết thường `my`, các chữ cái đầu của từ tiếp theo có thể viết hoa `Age`

`Int` là kiểu dữ liệu số nguyên (số nguyên là số âm, số dương, số 0 như trong Toán ấy :v)

`18` là giá trị khởi tạo của biến, nó giúp Kotlin hiểu rằng biến myAge này đang lưu trữ số 18

`dấu :` trước kiểu dữ liệu Int là syntax của ngôn ngữ Kotlin, Kotlin sẽ hiểu là biến myAge này có kiểu dữ liệu là Int (số nguyên)

`dấu =` trước số 18 là lệnh gán (assign), Kotlin sẽ hiểu biến myAge được gán cho lưu trữ một giá trị là 18.

> Tóm lại khi gõ dòng code: `var myAge : Int = 18` thì ta đang muốn nói cho Kotlin hiểu `ta muốn tạo ra một biến tên là myAge, kiểu dữ liệu là số nguyên và lưu trữ số 18`.
# 3. Các kiểu dữ liệu cơ bản trong Kotlin
Ở bài 1, mình có nói [đơn vị lưu trữ thông tin là bit](https://viblo.asia/p/tro-thanh-lap-trinh-vien-voi-ngon-ngu-kotlin-bai-1-hello-kotlin-hi-may-tinh-RnB5p39JlPG#_6-bit---don-vi-bieu-dien-thong-tin-5). Kiểu `Int` nó dùng `32 bit` để lưu trữ thông tin, có nghĩa là nó có thể biểu diễn được 2^32 (số khác nhau cả số âm cả số dương và số 0). Nó dùng 1 bit để biễu diễn `dấu âm (-)` hoặc `dấu dương (+),` vậy nó chỉ còn 31 bit để biểu diễn số. Như vậy với bit đầu là dấu âm (-) thì 31 bit còn lại có thể biểu diễn các số từ -2^31 = -2147483648 (dưới âm 2 tỷ) đến -1, còn với bit đầu là bit dương thì 31 bit còn lại có thể biểu diễn các số từ 0 đến 2^31 - 1 = 2147483647 (trên 2 tỷ). Điều đó có nghĩa là khi mình khai báo: `var myAge: Int = 2147483648` thì Kotlin sẽ báo lỗi ngay vì nó vượt qua vùng giá trị kiểu Int có thể biểu diễn, hay nói cách khác số `2147483648` cần nhiều hơn `32 bit` để lưu trữ

![](https://images.viblo.asia/77080024-25a6-428f-aa0b-ed569813deaa.PNG)

Khi cần lưu trữ các kiểu số lớn hơn ta có thể dùng đến kiểu `Long (dùng 64 bit)`, hoặc không cần thiết phải tốn tới 32 bit để lưu trữ tuổi tác con người, ta có thể dùng kiểu `Byte (8 bit) `để lưu trữ (biểu diễn từ -128 -> 127). À mà có người sống hơn 127 tuổi rồi nên dùng kiểu `Short (16 bit)` cho nó chắc :D. Các bạn có thể bảng sau để chọn kiểu dữ liệu dạng số nguyên phù hợp với bài toán của mình :D

| Kiểu dữ liệu | Số bit để lưu trữ 1 biến | Giá trị nhỏ nhất biến có thể lưu trữ | Giá trị lớn nhất biến có thể lưu trữ |
| -------- | -------- | -------- | -------- |
| Long     | 64 bits    | -2^63 = -9223372036854775808 (âm 9 tỷ tỷ)    | 2^63  - 1 =   9223372036854775807 (9 tỷ tỷ)   |
| Int     | 32 bits    | -2^31 = -2147483648 (âm 2 tỷ)     | 2^31 - 1 = 2147483647 (2 tỷ)   |
| Short     | 16 bits     | -2^15 = -32768     | 2^15 - 1 =   32767  |
| Byte     | 8 bits    | -2^7 = -128     | 2^7 - 1 = 127     |

* Khai báo biến kiểu Long, để phân biệt với kiểu Int ta cần thêm chữ cái `L` vào cuối giá trị: `var bigNumber : Long = 1000000000L`. Nếu thấy khó đọc quá ta có thể dùng dấu underscore `_` để phân ra cho dễ đọc:  `var bigNumber : Long = 1_000_000_000L`

Tương tự, nếu chúng ta muốn biểu diễn số thập phân như `-3.14` hay `999.9` thì có thể dùng 1 trong 2 kiểu dữ liệu:
`Double (64 bit)` hoặc `Float (32 bit)`. Số thập phân trong lập trình dùng dấu chấm `.` chứ ko dùng dấu phẩy `,` như khi mình học Toán đâu nha :D

* Khai báo biến kiểu `Double`: `var toyPrice : Double= 69.96`

* Khai báo biến kiểu `Float` thì để phân biệt với kiểu Double ta thêm chữ cái `f` vào cuối giá trị: `var toyPrice: Float = 69.96f`

Kiểu dữ liệu lưu trữ 1 ký tự như 'a', 'b', 'C', '$', '0' (ký tự '0' ko phải số 0) thì có kiểu `Char`. 

* Khai báo biến kiểu `Char`: giá trị của kiểu Char phải được đặt trong 2 dấu nháy đơn `' '`. Ví dụ: `var dollar : Char = '$'`

Kiểu dữ liệu lưu trữ thông tin là đúng hay sai (true or false) thì có kiểu `Boolean`. 

* Khai báo biến kiểu `Boolean`: Ví dụ: `var isMyWallet : Boolean = true` hoặc `var isSingle : Boolean = false`

Kiểu dữ liệu lưu trữ text như: "Hi everyone, My name is Minh" thì có kiểu `String`. 

* Khai báo biến kiểu `String`: giá trị của kiểu Char phải được đặt trong 2 dấu nháy kép `" "`.Ví dụ: `var myName : String = "Hi everyone, My name is Minh"`
# 4. Comment trong code
Comment trong code giúp chúng ta diễn giải, giải thích code theo ngôn ngữ bình thường, ko phải sử dụng ngôn ngữ lập trình nữa. Ví dụ như khi chúng ta muốn note lại cho đồng nghiệp hiểu dòng code này của mình có ý nghĩa là gì?

Có 2 cách comment code trong Kotlin là:

* Comment được viết chỉ trên 1 dòng: ta sẽ dùng `// nội dung comment`. Ví dụ 
```kotlin
// đây là code tui viết, cấm xóa
var myAge : Int = 18
```

* Comment được viết trên nhiều dòng: ta sẽ dùng `/* nội dung comment */`. Ví dụ:
```kotlin
    /*
        myAge là tên biến
        myAge có kiểu Int
        myAge có giá trị là 18
     */
    var myAge : Int = 18
```
# 5. Phép gán (assignment)
Như đã nói ở trên dấu `=` dùng để gán giá trị vào biến. Ta có thể gán lại giá trị mới cho biến bằng dấu `=` này. Sau khi gán giá trị mới cho biến thì biến sẽ lưu giá trị mới này mà ko lưu giá trị cũ nữa. Ví dụ:
```kotlin
var myAge : Int = 18 // biến myAge lúc này có giá trị là 18
myAge = 25 // biến myAge được gán giá trị mới là 25 nên bây giờ nó sẽ có giá trị là 25
```
Như vậy, biến `myAge` ban đầu được gán giá trị là `18` nhưng sau đó ta gán lại giá trị mới cho nó là `25` nên nó sẽ lưu giá trị mới là `25` mà ko còn lưu giá trị `18` nữa.
# 6. Mutable Variables & Immutable Variables
Trong lập trình, thuật ngữ **Mutable** để chỉ cái gì đó có thể đọc được (read) và sửa lại cũng được (can update), còn **Immutable** là cái gì đó chỉ có thể đọc được (read only) mà không thể sửa được (can not update).

Chúng ta có tới 2 keyword để khai báo một biến là `val` và `var`. từ khóa `var` đã được mình giới thiệu ở phần 2. 

* Khi ta sử dụng từ khóa `val` (viết tắt của value) để khai báo biến thì biến đó sẽ là Immutable, tức là chúng ta chỉ có thể đọc được giá trị biến đó đang lưu trữ mà ko thể gán lại giá trị mới cho biến đó (can not re-assign).
```kotlin
val myAge : Int = 18
myAge = 25  // không thể gán lại giá trị mới được. Nó sẽ báo lỗi "val cannot be reassigned"
```
* Khi ta sử dụng từ khóa `var` (viết tắt của variable) để khai báo biến thì biến đó sẽ là Mutable, tức là chúng ta vừa có thể đọc được giá trị của biến đó, vừa có thể gán lại giá trị mới cho biến đó.
```kotlin
var myAge : Int = 18
myAge = 25 // có thể gán lại giá trị mới là 25
```

Vì sao Kotlin lại cần tạo ra kiểu Immutable (`val`) làm gì, trong khi kiểu `var` là đủ rồi (vừa có thể đọc vừa có thể gán lại)?. Đó là vì trong lập trình đôi khi ta muốn một giá trị nào đó được lưu trữ an toàn, một giá trị ko thể thay đổi được, khi đó ta cần dùng `val`, nếu ai đó vô tình sửa biến `val` nó sẽ báo lỗi ngay. Giống như số CMND vậy, một khi đã tạo ra là không sửa được :D. Và bạn cũng thế nhé, nếu cảm thấy biến này chỉ nên read-only thì khuyến khích dùng `val` nha :D
# 7. Cách khai báo hàm
Trong Kotlin, để khai báo một hàm ta cần 3 thông tin sau: 1 là một hoặc nhiều **biến** đầu vào (Input) hoặc không có đầu vào, 2 là **kiểu dữ liệu** đầu ra (Output) và 3 là thân hàm (function body), thân hàm là nơi chúng ta viết code nhận các giá trị của các biến đầu vào, xử lý để cho ra kết quả đầu ra.

Cú pháp trong Kotlin:
```kotlin
fun sumOf (firstNumber : Int, secondNumber : Int)  : Int {  return firstNumber + secondNumber  }
```

![](https://images.viblo.asia/2513b94d-75fe-4f2c-9243-4bf9b4b4bbb6.png)


Trong đó:

`fun` là syntax (hay keyword) của ngôn ngữ Kotlin, nó giúp Kotlin có thể hiểu rằng bạn đang khai báo một hàm.

`sumOf` là tên hàm, tên hàm là động từ, quy ước đặt tên hàm cũng như đặt tên biến mình đã nói ở trên.

`firstNumber : Int, secondNumber : Int`: đây là 2 biến đầu vào có kiểu `Int` và có tên là `firstNumber` và `secondNumber`. Các biến đầu vào được đặt trong cặp dấu `( )`

`Int` cuối cùng sau dấu `:` trước dấu `{` là kiểu trả về của hàm, nó giúp Kotlin hiểu rằng hàm này trả về một kết quả số nguyên

`return firstNumber + secondNumber` : đây chính là thân hàm, thân hàm được viết bên trong cặp dấu `{ }`. Trong đó `firstNumber + secondNumber` là kết quả trả về của hàm `sumOf` còn `return` là syntax của Kotlin, giúp Kotlin hiểu là sau khi xử lý xong thì hàm này trả về giá trị bao nhiêu. Còn dấu `+` đó trong lập trình gọi là toán tử (operator), nó giúp mình tính tổng 2 số nguyên, mình sẽ giới thiệu các toán tử trong bài sau :D. Giống như câu lệnh `if` trong tấm ảnh trên mình cũng sẽ giới thiệu ở bài sau. Bài này chủ yếu để hiểu hàm là gì trước rồi các bài sau sẽ tập trung vào cách viết code cho thân hàm :D

Để cho dễ đọc dễ nhìn thì người ta thường viết hàm thành nhiều dòng như thế này:
```kotlin
fun sumOf(firstNumber: Int, secondNumber: Int): Int {
    return firstNumber + secondNumber
}
```

> Như vậy, khi chúng ta gõ đoạn code trên tức là ta đang muốn tạo ra 1 hàm cho phép truyền vào 2 số nguyên và hàm này sẽ thực hiện xử lý tính tổng 2 số nguyên này và trả về một kết quả là một số nguyên.

# 8. Standard Library Funtions vs User defined Functions

![](https://images.viblo.asia/d7e197f2-9493-466a-a218-f21f9330bb6f.png)

Hàm thì nó phân thành 2 nhóm: **Standard Library Funtions** và **User defined Functions**

**Standard Library Funtions** là những hàm do Kotlin đã viết code sẵn cho chúng ta, chúng ta chỉ việc dùng thôi. Ví dụ hàm [println()](https://viblo.asia/p/tro-thanh-lap-trinh-vien-voi-ngon-ngu-kotlin-bai-1-hello-kotlin-hi-may-tinh-RnB5p39JlPG#_3-hello-kotlin-2) mà mình dùng để in ra từ `"Hello World"` ở bài 1 là một hàm do Kotlin code sẵn. Kotlin nó viết ra rất rất nhiều hàm cho anh em mình để anh em đỡ nhọc nhằn suy nghĩ code, chỉ việc dùng thôi, các bài sau sẽ giới thiệu thêm rất nhiều hàm thế này :D

**User defined Functions** là những hàm do chúng ta tự viết code. Ví dụ như hàm `sumOf` mình viết ở trên là hàm do chính chủ mình tự code :D
# 9. Tiên đoán kiểu dữ liệu trong Kotlin (Type Inference)
Kotlin là một ngôn ngữ cực kỳ thông minh, khi chúng ta khai báo biến không có kiểu dữ liệu như thế này:
```kotlin
val number = 10
```
thì nó hiểu ngay biến number này kiểu Int. Đây gọi là tính năng tiên đoán kiểu dữ liệu của biến mà Kotlin cung cấp cho dev đỡ nhọc, bớt code, đỡ to tay :D

Tương tự, ngoài kiểu Int ra các kiểu dữ liệu khác Kotlin cũng có thể đoán được:
```kotlin
    val a = 10     // kiểu Int
    val b = 10L    // kiểu Long
    val c = 10.1   // kiểu Double
    val d = 10.1f  // kiểu Float
    val e = true   // kiểu Boolean
    val f = '$'    // kiểu Char
    val g = "Minh" // kiểu String
```

Không những tiên đoán được kiểu dữ liệu của biến mà của hàm, Kotlin cũng đoán được tất:
```kotlin
fun sumOf(a: Int, b: Int) = a + b
```
Chỉ cần viết vậy Kotlin cũng hiểu kiểu trả về của hàm `sumOf` là kiểu `Int`, lý do vì biến `a` có kiểu `Int`, biến `b` có kiểu `Int` thì tổng của chúng cũng là kiểu `Int`. 

Có một sự khác nhẹ giữa cách viết này so với cách viết hàm thông thường ở trên, đó là thân hàm được viết sau dấu `=` thay vì trong cặp dấu `{ }`. Trong Kotlin người ta gọi các hàm viết tắt thế này với thuật ngữ là: **Single-Expression functions**. Đúng như tên gọi của nó, cách viết này chỉ dùng được nếu thân hàm được viết trên duy nhất một dòng :D. Có nghĩa là hàm như thế này thì nó chịu thua, ko thể viết kiểu **Single-Expression functions** được.
```kotlin
fun sumOf(firstNumber: Int, secondNumber: Int): Int {
    val a = 2
    val b = 3
    return a + b + firstNumber + secondNumber
}
```
# 10. Kiểu dữ liệu Unit
Khi chúng ta muốn viết hàm mà không cần trả về output, chỉ cần xử lý thôi. Ví dụ như hàm `println` dùng để in ra chữ `"Hello World"` thì ko cần output chỉ cần xử lý in là được. Chúng ta chỉ cần lược bỏ kiểu trả về là được và tất nhiên khi không cần trả về output thì chúng ta cũng không cần dùng syntax `return` nữa. Ví dụ:
```kotlin
fun printName(name: String) { // hàm ko có kiểu trả về
    println(name) // không cần dùng return ở đây nữa
}
```

Thực tế, trong Kotlin không có khái niệm hàm không có kiểu trả về. Có nghĩa là tất cả hàm trong Kotlin đều có kiểu trả về. Nhưng tại sao ở trên mình viết 1 hàm không có kiểu trả về vẫn được. Khi mình viết code không có kiểu trả về thì Kotlin ngầm hiểu sẽ trả về một kiểu dữ liệu là `Unit`. `Unit` là một kiểu dữ liệu đặc biệt, nó chỉ có 1 giá trị duy nhất là `Unit` (vâng chính nó luôn :v). Thằng này giống kiểu vô danh ấy, có cũng được, ko có cũng được. Điều đó có nghĩa là chúng ta viết lại hàm `printName` thế này cũng được luôn:
```kotlin
fun printName(name: String) : Unit{ // hàm ko có kiểu trả về
    println(name) 
    
    // không có dòng return Unit này thì code nó vẫn chạy như thường nhé
    return Unit // dùng return ở đây cũng được mà không dùng return thì cũng được :D
}
```
Mà đâu ai rảnh đi viết thừa thãi như vậy :D
# Kết luận
Biến và hàm là 2 thành phần quan trọng bậc nhất trong lập trình, hy vọng qua bài viết này bạn đã hiểu về khái niệm biến, hàm và kiểu dữ liệu. Mặc dù đã cố gắng rút ngắn bài viết nhưng do là những bài đầu tiên nên thường rất vất vả, mong các bạn thông cảm. Hẹn gặp lại các bạn ở những bài tiếp theo.