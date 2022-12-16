Xin chào các bạn, chào mừng các bạn quay trở lại với seri bài viết về Kotlin cho người mới bắt đầu. 

Ở bài viết trước mình đã hướng dẫn các bạn về Class, variable và function. Trong bài viết lần này mình sẽ hướng dẫn cho các bạn cách sử dụng về package và control flow

# 1 Package.
```
package foo.bar

fun baz() { ... }
class Goo { ... }

// 
```
Cũng như Java tất cả các classes functions của một file đều đựoc khai báo trong một package, và như ở ví dụ trên tên đầy đủ của function ```baz()``` sẽ là ```foo.bar.baz``` và full name của class ```Goo``` sẽ là
```foo.bar.Goo```

Nếu package không được khai báo thì tất cả nội dung trong fole đó thuộc về package default  (package ko có tên)


# 2. Import
Trong Kotlin tất cả các file ```*.kt``` đều được mwajc định import các gói sau
* kotlin.*
* kotlin.annotation.*
* kotlin.collections.*
* kotlin.comparisons.* (since 1.1)
* kotlin.io.*
* kotlin.ranges.*
* kotlin.sequences.*
* kotlin.text.*

Tùy từng nền tảng sẽ có thêm một vài package bổ sung 
* JVM
    * java.lang.*
    * kotlin.jvm.*
* JS
    * kotlin.js.*

# 3. Control flow
## 3.1 If expression
Khác một chút với Java, ```if``` trong Kotlin là một biếu thức, nó có thể trả về một giá trị. Do đó toán tử 3 ngôi (condition? then: else ví dụ trong java ```boolean isEvenNumber = number % 2 == 0? true : false;```) sẽ không có trong Kotlin bới vì ```if``` trong kotlin đã làm được việc này rồi

```
// Traditional usage 
var max = a 
if (a < b) max = b

// With else 
var max: Int
if (a > b) {
    max = a
} else {
    max = b
}
 
// As expression 
val max = if (a > b) a else b
```

các nhánh của ```if``` có thể là các block code (khối lệnh), và biểu thức cuối cùng sẽ là giá trị của khối lệnh, và khi các bạn sử dụng ```if``` như một biểu thức thì bắt buộc phải có nhánh else.
```
val max = if (a > b) {
    print("Choose a")
    a
} else {
    print("Choose b")
    b
}
```

## 3.2 When expression
Trong java chúng ta có ```switch``` thì đối với Kotlin có ```when```, theo mình đánh giá thì ```when``` trong kotlin mạnh mẽ hơn nhiều lần so với switch trong java
Một biểu thức ```when``` sẽ có dạng như sau
```
when (x) {
    1 -> print("x == 1")
    2 -> print("x == 2")
    else -> { // Note the block
        print("x is neither 1 nor 2")
    }
}
```

```when``` sẽ kiểm tra giá trị truyền vào với lần lượt các biểu thức trong ```when```, nếu điều kiện nào được thoả mãn, nó sẽ dừng lại ở đó theo thứ tự từ trên xuống dưới. Nếu không có bất kì điều kiện nào được thỏa mãn thì ```else``` sẽ được gọi.

### Trong nhiều truờng hợp có thể xử lý theo cùng 1 cách, các bạn có thể sử dụng dấu , 
```
when (x) {
    0, 1 -> print("x == 0 or x == 1")
    else -> print("otherwise")
}
```

### Có thể sử dụng các biểu thức tùy ý làm điều kiện cho các nhánh
Khác với ```switch``` - các ```case``` bắt buộc phải là hằng số, còn ở Kotlin bạn có thể sử dụng các biểu thức, biến tùy ý
```
when (x) {
    parseInt(s) -> print("s encodes x")
    else -> print("s does not encode x")
}
```

### Có thể check xem một gía trị có thể nằm trong khoảng, hoặc nằm ngoài khoảng giá trị nào đó
```
when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
}
```

### Có thể kiểm tra xem gía trị truyền vào có hoặc không thuộc một loai dữ liệu nhất định
Cái này na ná giống như ```isInstanceOf``` trong java. Chỉ khác là các bạn sẽ sử dụng từ khóa ```is``` hoặc ```!is```.
```
fun hasPrefix(x: Any) = when(x) {
    is String -> x.startsWith("prefix")
    else -> false
}
```
###  Có thể sử dụng như một biểu thức
Khác với ```switch```, trong kotlin ```when``` (từ version Kotlin 1.3 trở lên) cũng có thể sử dụng như một biểu thức  như ```if``` mình đã đề cập ở trên. (ví dụ)

```
fun Request.getBody() =
        when (val response = executeRequest()) {
            is Success -> response.body
            is HttpError -> throw HttpException(response.status)
        }
```

Và cũng giống như ```if``` khi sử dụng ```when``` như một biểu thức thì bắt buộc phải có trường hợp ```else``` trừ trường hợp trình biên dịch có thể chứng minh rằng tất cả các trường hợp đã được thỏa mãn và không cần tới else. (cái này các bạn có thể hiểu nó giống như các câu lệnh ```if-else if``` lồng nhau vậy.

# 3.3 For loops
### Sử dụng như foreach trong Java và các ngôn ngữ khác
Vòng lặp ```for``` có thể được sử dụng đối với bất cứ thứ gì mà được hỗ trợ interator.  Nó tuơng đuơng với ```foreach``` trong Java
Cú pháp như sau
```
for (item in collection) print(item)
```

Trường hợp body có thể là khối lệnh
```
for (item: Int in ints) {
    // ...
}
```
### Sử dụng for trong một khoảng số
For cũng có thể sử dụng cho một dãy số bằng cáhc sử dụng như sau
```
for (i in 1..3) {
    println(i)
}
for (i in 6 downTo 0 step 2) {
    println(i)
}
```
Nó tuơng đương với đoạn code sau trong java nhưng cú pháp thì dễ đọc và có vẻ gần guĩ với ngôn ngữ tự nhiên hơn rất nhiều.
```for (int i = 1; i<=3; i++)```
```for (int i = 6; i<=0; i-=2) ```

## 3.4 While
Trong kotlin, thì ```while``` và ```do-while``` cũng được sử dụng giống như trong Java, k có gì khác cả.
```
while (x > 0) {
    x--
}

do {
    val y = retrieveData()
} while (y != null) // y is visible here!
```

# 5. Reference https://kotlinlang.org

Trong bài viết lần này, mình đã hướng dẫn cho các bạn cách sử dụng của các control flow cơ bản trong Kotlin, theo mình đánh giá thì nó tuơng đối dễ đọc và gần gũi với ngôn ngữ tự nhiên, và đặc biệt mình nghĩ nó cực kì mạnh mẽ.
Trong bài viết tới mình sẽ giới thiệu với các bạn một số class đặc biệt trong Kotlin. Hi vong các bạn sẽ tiếp tục theo dõi seri này của mình.

Rất cám ơn các bạn đã đón đọc. Chúc các bạn học kotlin hiệu quả.