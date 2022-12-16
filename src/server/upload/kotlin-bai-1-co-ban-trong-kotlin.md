### 1. Biến
**Biến là gì**  
    Biến đề cập đến một vị trí bộ nhớ. Nó được sử dụng để lưu trữ dữ liệu. Dữ liệu của biến có thể được thay đổi và sử dụng lại tùy theo điều kiện hoặc thông tin được truyền đến chương trình.  
**Sử dụng biến**  
```
var language ="Java"
val salary = 30000
```
- Từ khóa var và val mình sẽ giải thích sau. 
- Ở trên mình khởi tạo biến:
    -  language = "Java" đồng nghĩa với việc biến language có kiểu dữ liệu là String và được gán dữ liệu là chữ "Java".
    -  salary = 30000 đồng nghĩa với việc biến salary có kiểu dữ liệu là Int và được gán dữ liệu là số 30000.
- Chúng ta cũng có thể chỉ định dữ liệu cụ thể cho biến như sau:
```
var language:String ="Java"
val salary:Int = 30000
```
- chúng ta cũng có thể khai báo cho biến rồi mới gán dữ liệu cho nó sau: 
```
var language: String  
... ... ...  
language = "Java"  
val salary: Int  
... ... ...  
salary = 30000  
```
**Sự khác biệt giữa vả và val:**
- var : những biến để var sữ liệu của chúng có thể được thay đổi liên tục.
- val : những biến để val sữ liệu của chúng chỉ được tạo 1 lần duy nhất.
    - Ví dụ:
```
var salary = 30000  
salary = 40000 // thực hiện  
//Biến được thay đổi giá trị từ 30000 sang 40000
```
```
val language = "Java"  
language = "Kotlin" //lỗi
//Biến không thể đổi từ "Java" sang "Kotlin"
```
### 2. Kiểu dữ liệu:
- các kiểu dữ liệu trong kotlin:
    - Số
    - Kí tự
    - Logic
    - mảng
    - chuỗi  
     
**Kiểu số:**  

| Kiểu | Kích thước | Khoảng |
| -------- | -------- | -------- |
| Byte     | 8 bit     | -128 to 127     |
| Short     | 16 bit     |	-32768 to 32767     |
| Int     | 32 bit     | -2,147,483,648 to 2,147,483,647    |
| Long     | 64 bit     | -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807     |
| Float     | 32 bit     | 1.40129846432481707e-45 to 3.40282346638528860e+38     |
| Double     | 64 bit     | 4.94065645841246544e-324 to 1.79769313486231570e+308     |
**Kiểu kí tự:**
  
| Kiểu | Kích thước | Khoảng |
| -------- | -------- | -------- |
| Char     | 4 bit     | -128 to 127     |
Ví dụ:
```
val value1 = 'A'  
//hoặc
val  value2: Char  
value2= 'A'  
```
**Kiểu logic**

| Kiểu | Kích thước | Khoảng |
| -------- | -------- | -------- |
| Boolean     | 1 bit     |true / false    |
Ví dụ:
```
val flag = true  
```
**Kiểu mảng**
- Mảng là tập hợp của nhiều phần tử có cùng kiểu dữ liệu.
- Mảng arrayOf():
```
val id = arrayOf(1,2,3,4,5)  // khởi tạo mảng
val firstId = id[0]  // lấy phần tử thứ 0 của mảng trên tức lấy ra số 1
val lasted = id[id.size-1]  // lấy phần tử cuối cùng của mảng trên tức lấy ra số 5
```
- Mảng Aray():
```
val asc = Array(5, { i -> i * 2 }) //tạo mảng có 5 phần thử phần tử đứng sao bằng phần tử đứng trước nhân 2
```
2.5. Kiểu chuỗi:
```
val text = "Xin chào!" // chuỗi dduwwocj đặt trong dẫu ""
```
### 3. Gán và chuyển đổi dữ liệu:
- khi bán muốn một biến có giá trị là là giá trị của một biến khác bắc buộc 2 biến đấy phải có cùng kiểu dữ liệu:
```
var value1 = 10  
val value2: Long = value1  // lỗi

var value1 = 10  
val value2: Long = value1.toLong()  // ok
```
- Các chuyển đổi:
    - toByte()
    - toShort()
    - toInt()
    - toLong()
    - toFloat()
    - toDouble()
    - toChar()  
    - 
### 4 Toán tử trong kotlin

- Toán tử số học
- Toán tử quan hệ
- Toán tử chuyển nhượng
- Toán tử đơn phương
- Hoạt động bitwise
- Toán tử logic

**4.1 Toán tử số học:**  

| Toán tử | Mô tả | Viết | Dùng |
| -------- | -------- | -------- | -------- |
|+	|Thêm vào	|a + b	|a.plus (b)|
|-	|Phép trừ	|a - b	|a.minus (b)|
|*	|Nhân	|a * b	|a.times (b)|
|/	|Chia lấy nguyên	|a / b	|a.div (b)|
|%	|Chia lấy dư	|a % b	|a.rem (b)|
    
Ví dụ:
```
fun main(args : Array<String>) {  
    var a=10;  
    var b=5;  
    println(a+b);  
    println(a-b);  
    println(a*b);  
    println(a/b);  
    println(a%b);  
}  
// Kết quả:
// 15
// 5
// 50
// 2
// 0
```
**Toán tử quan hệ:**  

| Toán tử | Mô tả | Viết | Dùng |
| -------- | -------- | -------- | -------- |
|>	|lớn hơn	|a> b	|a.compateTo (b)> 0|
|<	|Ít hơn	|a <b	|a.compateTo (b) <0|
|>=	|lớn hơn hoặc bằng	|a> = b	|a.compateTo (b)> = 0|
|<=	|ít hơn hoặc bằng	|a <= b	|a? .equals (b)? : ( b === null)|
|==|	bằng	|a == b	|a? .equals (b)? : ( b === null)|
|!=	|không bằng	|a! = b	! |(a?. Bằng (b)? : ( b === null))|
    
Ví dụ:
```
 fun main(args : Array<String>) {  
    val a = 5  
    val b = 10  
    val max = if (a > b) {  
        println("a lớn hơn b.")  
        a  
    } else{  
        println("b lớn hơn a.")  
        b  
    }  
    println("max = $max")  
}  

// Kết quá
// b lớn hơn a
```
**4.3 Toán tử chuyển nhượng:**  

| Toán tử | Mô tả | Viết | Dùng |
| -------- | -------- | -------- | -------- |
|+=	|thêm và gán	|a += b |a.plusAssign (b)|
|-==	|trừ và gán	|a -= b	" |a.minusAssign (b)|
|*=	|nhân và gán	|a *= b	|a.timesAssign (b)|
|/=	|chia và gán	|a /= b	|a.divAssign (b)|
|%=	|chia dư và gán	|a %= b	|a.remAssign (b)|
    
Ví dụ:
```
fun main(args : Array<String>) {  
    var a =20;var b=5  
    a+=b  
    println("a+=b :"+ a)  
    a-=b  
    println("a-=b :"+ a)  
    a*=b  
    println("a*=b :"+ a)  
    a/=b  
    println("a/=b :"+ a)  
    a%=b  
    println("a%=b :"+ a)  
}  

// Kết quá
// a+=b :25
// a-=b :20
// a*=b :100
// a/=b :20
// a%=b :0
```
**Toán tử toán học**  

| Toán tử | Mô tả | Viết | Dùng |
| -------- | -------- | -------- | -------- |
|+	|dương	|+a	|a.unaryPlus()|
|-	|âm	|-a	|a.unaryMinus()|
|++	|cộng 1 đơn vị	|++a	|a.inc()|
|--	| trừ 1 đơn vị	|--a	|a.dec()|
|!	|phủ định	|!a	|a.not()|
    
Ví dụ:
```
fun main(args: Array<String>){  
    var a=10  
    var b=5  
    var flag = true  
    println("+a :"+ +a)  
    println("-b :"+ -b)  
    println("++a :"+ ++a)  
    println("--b :"+ --b)  
    println("!flag :"+ !flag)  
}  

// Kết quá
// +a :10
// -b :-5
// ++a :11
// --b :4
// !flag :false
```
**Toán tử Logic**  

| Toán tử | Mô tả | Viết | Dùng |
| -------- | -------- | -------- | -------- |
|&&	|a lớn hơn c và a lớn hơn b	|(a>b) && (a>c)	|(a>b) and (a>c)|
|or	|a lớn hơn c hoặc a lớn hơn b	|(a>b) or (a>c) |(a>b) or(a>c)|
|!	|ngược lại của a	|!a|a.not()|
    
Ví dụ:
```
fun main(args: Array<String>){  
    var a=10  
    var b=5  
    var c=15  
    var flag = false  
    var result: Boolean  
    result = (a>b) && (a>c)  
    println("(a>b) && (a>c) :"+ result)  
    result = (a>b) || (a>c)  
    println("(a>b) || (a>c) :"+ result)  
    result = !flag  
    println("!flag :"+ result)  
}  

// Kết quá
// (a>b) && (a>c) :false
// (a>b) || (a>c) :true
// !flag :true
```
**Toán tử về bit**  

| Toán tử | Mô tả | Viết 
| -------- | -------- | -------- 
|shl (bits)	|signed shift left	|a.shl(b)|
|shr (bits)	|signed shift right	|a.shr(b)|
|ushr (bits)	|unsigned shift right	|a.ushr(b)|
|and (bits)	|bitwise and	|a.and(b)|
|or (bits)	|bitwise or	|a.or(b)|
|xor (bits)	|bitwise xor	|a.xor(b)|
|inv()	|bitwise inverse	|a.inv()|
    
Ví dụ:
```
fun main(args: Array<String>){  
    var a=10  
    var b=2  

    println("a.shl(b): "+a.shl(b))  
    println("a.shr(b): "+a.shr(b))  
    println("a.ushr(b:) "+a.ushr(b))  
    println("a.and(b): "+a.and(b))  
    println("a.or(b): "+a.or(b))  
    println("a.xor(b): "+a.xor(b))  
    println("a.inv(): "+a.inv())  
}  

// Kết quá
// a.shl(b): 40
// a.shr(b): 2
// a.ushr(b:) 2
// a.and(b): 2
// a.or(b): 10
// a.xor(b): 8
// a.inv(): -11
```
### 5,  nhập vào và in ra
**In ra:**
```
fun main(args: Array<String>) {  
    println("Hello World!")  
}  
// kết quả
// Hello World!
```
```
fun main(args: Array<String>){  
    println(10)  
    print("Hello")  
    print(20)  
    print("Hello")  
} 

// kết quả
// 10
// hello
// 20hello
```

**Nhập vào:**  
```
fun main(args: Array<String>) {  
    println("tên = ")  
    val name = readLine()  
    println("tuổi = ")  
    var age: Int =Integer.valueOf(readLine())  
    println("tên là $name tuổi là $age")  
}  
// kết quả
// tên =
// bình
// tuổi =
// 25
// tên là bình tuổi là 225
```
```
import java.util.Scanner  
fun main(args: Array<String>) {  
    val read = Scanner(System.`in`)  
    println("tuổi =")  
    var age = read.nextInt()  
    println("tuổi là "+age)  
}  
// kết quả
// tuổi = 
// 25
// tuổi là 25
```
### 6. Comment:
```
fun main(args: Array<String>) {  
    // đây là comment
    println("Hello World!")  
}  

fun main(args: Array<String>) {  
/* đây cũng là comment */  
    println("Hello World!")  
} 
```