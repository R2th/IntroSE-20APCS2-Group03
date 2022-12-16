Xin chào mọi người, đây là bài viết mở màn của mình trong series Học Android trong 1000 từ. Đây là một series mang tính chất mì ăn liền, dùng để làm guideline cho các bạn beginner giống mình, để không bị lạc lối trong rất nhiều nội dung ngoài kia. Sau mỗi bài viết mình sẽ dẫn thêm các link để mọi người nghiên cứu sâu hơn. Bài viết này sẽ phù hợp nhất với những ngoài đã từng làm việc mới 1 ngôn ngữ nào trước đó, và muốn học Kotlin một cách nhanh nhất.

 Để giữ vững bản sắc mì ăn liền, mỗi bài viết sẽ chỉ kéo dài tối đa 1000 từ. FYI, riêng đoạn giới thiệu này là gần 100 từ rồi nha.

# Basic syntax
## Variable and Constant
Dùng từ khoá **val** để khai báo hằng số. Bạn phải khởi tạo giá trị ngay lập tức, hoặc khai báo kiểu dữ liệu của hằng số.
```
val x = 10;
val x : Int;
x = 10;

x = 5; // ERROR: x không thể được gán giá trị nhiều hơn 1 lần
val y; // ERROR: phải xác định kiểu giữ liệu hoặc khởi tạo ngay
val z : Int
z = "Hello" // ERROR: sai kiểu dữ liệu
```
Dùng từ khoá **var** để khai báo biến số. Biến số có thể được gán giá trị nhiều lần, ngoài ra, về quy tắc khởi tạo và kiểu dữ liệu thì giống như hằng số.
```
var x = 10;
x = 20;
```
Hiện thì giá trị của biến số/hằng số bên trong chuỗi
```
val name = "Vu";
println("Hello, ${name}!"); // result: Hello, Vu!
```
## Function
Nếu có tham số thì phải khai báo kiểu dữ liệu. Nếu có trả về giá trị thì phải khai báo kiểu trả về, nếu không trả về gì có thể khai báo là Unit hoặc bỏ trống.
```
fun add(number1 : Int, number : Int) : Int {
    return number1 + number2;
}
fun speak() {
    println("Hello!");
}
```
Cách viết hàm ngắn gọn hơn, phòng khi sử dụng hàm như callback (giống arrow function trong Javascript)
```
fun main() {
    val add = fun (a : Int, b : Int) = a + b;
    println(add(5, 4));
} // => console: 9
```
Mỗi chương trình bắt đầu từ hàm main, và nếu bạn muốn in ra console thì dùng hàm println() nhé
```
fun main() {
    println("Hello!");
}
```
## Conditional Expression
```
val x : Int;
if (a > b) {
    x = 1
} else {
    x = 0
}
```
Hoặc ngắn gọn hơn, nhưng mình không khuyến khích sử dụng
```
x = if (a > b) 1 else 0
```

## Loop
Lặp qua các giá trị trong một list. Chi tiết hơn về cách tạo một list sẽ có ở phần sau.
```
val items = listOf("apple", "banana", "kiwifruit")
for (item in items) {
    println(item)
}

for (item in 1..3) {
    print(item)
} // result: 123
```

Vòng lặp while
```
var x = 0;
while (x < 10) {
    print(x);
    x++;
} // result: 0123456789
```
```
var x = 0;
do {
    print(x);
    x++;
} while (x < 10) // result: 0123456789
```
Trong vòng lặp cũng có các lệnh nhảy break và continue như các ngôn ngữ khác.
# Data
## Các kiểu dữ liệu
Các kiểu số nguyên: Byte, Short, Int, Long (lần lượt dùng 8, 16, 32 và 64 bit)
Các kiểu số thực: Float, Double (dùng 32 và 64 bit)
Kiểu Boolean nhận 2 giá trị true/false. Ngoài ra có thể dùng kiểu Boolean? nhận 3 giá trị là true, false và null.
Kiểu Char dùng 1 byte, hiển thị 1 ký tự
Kiểu String dùng hiển thị chuỗi
## Các cấu trúc dữ liệu cơ bản
Có 3 loại collect là: list, set và map
List là danh sách có thứ tự và được đánh index từ 0 tới N, dùng các index này để truy cập các phần từ trong list.
```
val numbers = listOf("one", "two", "three", "four")
println("Number of elements: ${numbers.size}")
println("Third element: ${numbers.get(2)}")
println("Fourth element: ${numbers[3]}")
println("Index of element \"two\" ${numbers.indexOf("two")}")
```

Set là một danh sách không trùng nhau, thứ tự các phần tử trong set không quan trọng.
```
val numbers = setOf(1, 2, 3, 4)
println("Number of elements: ${numbers.size}")
if (numbers.contains(1)) println("1 is in the set")
```

Map là tập các cặp key->value, trong đó không có 2 key trùng nhau.
```
val numbersMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3, "key4" to 1)

println("All keys: ${numbersMap.keys}")
println("All values: ${numbersMap.values}")
if ("key2" in numbersMap) println("Value by key \"key2\": ${numbersMap["key2"]}")    
if (1 in numbersMap.values) println("The value 1 is in the map")
if (numbersMap.containsValue(1)) println("The value 1 is in the map")
```

Range là một khoảng các giá trị
```
var range = 1..5;
for (item in range) {
    print(item)
} // resule: 12345

var range = 1..5 step 2; // 1, 3, 5
var range = 5 downTo 1; // 5, 4, 3, 2, 1
var range = 5 downTo 1 step 2; //5, 3, 1
```
# End
Tạm dùng lại ở đây vì đã hết quota 1000 từ. Còn một phần rất quan trọng của Kotlin là OOP, chủ đề này khá hay ho và xứng đáng được dành 1 bài viết riêng