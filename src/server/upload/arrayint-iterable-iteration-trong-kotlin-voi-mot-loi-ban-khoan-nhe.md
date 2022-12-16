Array<Int> - Iterable – Iteration, mấy cái này ở ngôn ngữ nào cũng có bởi một lẽ là người ta hay phải dùng đến nó chứ đâu gì Kotlin đâu. Đặc biệt với những bạn làm Android khi chuyển từ Java sang Kotlin sẽ thấy thân quen hơn, vậy thì có gì mà chưa rõ đâu (băn khoăn)?
Điều chưa rõ có phải việc dùng nó như nào? Hay dùng để làm gì không? 
    
Dĩ nhiên nó chỉ là một phần nhỏ thôi và nội dung bài viết mình muốn chúng ta có cái nhiền trực quan hơn khi so sánh nó với một số người anh em, họ hàng của nó trong ngôn ngữ Kotlin và cùng các bạn khám phá qua những ví dụ nhỏ :joy:

1. Array<Int> và IntArray
2. Iterable và Sequence
3. Iteration với indexes
    
### 1. Array<Int> và IntArray

**Sự khác nhau ?**
    
Đầu tiên chúng ta sẽ đi vào tìm hiểu 2 kiểu Array này xem có gì khác nhau không nhé. 
    
**Array<Int>** sử dụng Array class để lưu bất kỳ kiểu dữ liệu `T` - đây là một kiểu generic mà nhiều bạn đã biết. Và ở đây chúng ta thấy đang lưu kiểu **Int**, khi bạn khai báo như vậy nó giống với việc dùng Integer[] trong Java.
Khá đơn giản để hiểu về đối tượng này phải không các bạn? Mình cũng muốn nêu ra để những ai mới tìm hiểu về Java hoặc Kotlin có thể nắm bắt được. Tiếp tục nào các bạn ... 
Bạn có thể khởi tạo một mảng Int bằng việc sử dụng 1 phương thức generic `arrayOf`
    
```
val arrayOfInts: Array<Int> = arrayOf(1, 2, 3, 4, 5)
```
    
**IntArray** đây là một **class đặc biệt** đồng thời nó cũng là **type** đặc biệt, còn Array<Int> nó chỉ là type thôi. Ở bài viết về ["Sự Hữu Ích LỚN Từ Những Điều NHỎ Trong Java và Kotlin"](https://viblo.asia/p/su-huu-ich-lon-tu-nhung-dieu-nho-trong-java-va-kotlin-ORNZqaPqZ0n)  bạn hãy đọc thêm ở đây nếu muốn xem chi tiết hơn.
    
Sở dĩ mình nói nó đặc biệt là vì đây là 1 mảng kiểu dữ liệu nguyên thủy và nó cũng giống như ta lưu kiểu dữ liệu `int[]` trong Java. Bạn có thể khởi tạo nó bằng phương thức (non - generic) **intArrayOf**
    
```
val intArray: IntArray = intArrayOf(1, 2, 3, 4, 5)
```
    
**Làm sao để dùng cho hợp lý?**
    
Nó là một câu hỏi thực sự hữu ích vào lúc này, như đã nói ở trên bạn có thể dễ thấy được trong những trường hợp cơ bản hãy dùng ngay **IntArray** vì tốc độ truy xuất nhanh hơn. Việc khởi tạo **IntArray** có phần dễ dàng hơn **Array<Int>** bởi sự đơn giản trong ý đồ tạo ra kiểu dữ liệu này "Tạo ra nhanh - dùng nhanh" :smile: 
    
Còn một điều nữa, bạn sẽ chọn dùng **Array<Int>** khi cần lấy dữ liệu trả về từ API có những trường hợp nhận giá trị **null**, nếu dùng **IntArray** sẽ rất dễ gặp Exception vì **IntArray** không chấp nhận giá trị null ( giá trị default của nó là 0 ).
    
Ví dụ : `val notActualPeople: Array<Person?> = arrayOfNulls<Person>(13)`
    
### 2. Iterable và Sequence
    
**Có điểm gì khác nhau?**
    
**Iterable** được ánh xạ từ interface *java.lang.Iterable* trong JVM, chúng ta vẫn hay dùng các **Collection** phổ biến như `List`, `Set`. Cách hoạt động của các collection này thực thi ngay lập tức chuyển dữ liệu đầu vào thành một collection mới chứa kết quả.
Để hiểu rõ hơn bạn hãy cùng làm một bài toán nhỏ: 

Bạn cần lấy ra danh sách 5 Person đầu tiên có tuổi từ 21 trong danh sách Person là dữ liệu đầu vào.

`Kotlin`

```
val people: List<Person> = getPeople()
        val allowedEntrance = people
            .filter { it.age >= 21 }
            .map { it.name }
            .take(5)

data class Person(val name: String, val age: Int)

fun getPeople() = listOf(
        Person("Jane", 25),
        Person("Sally", 39),
        Person("Joe", 44),
        Person("Jimmy", 15),
        Person("Samantha", 56),
        Person("Claire", 47),
        Person("Susan", 27)
)

```

Mình sẽ giải thích chi tiết, các bạn hãy để ý chỗ lấy tham số `allowedEntrance` chính là kết quả của bài toán này. Đầu tiên danh sách `people` sẽ được duyệt từng Person để tạo ra 1 danh sách mới (có thể empty) thoả mãn điều kiện `filter` với tuổi từ 21.

Tiếp theo là ánh xạ tuổi của danh sách tìm thấy với tên của mỗi Person nằm ở đầu danh sách. Như vậy danh sách lấy ra của chúng ta sẽ là 1 List<Person> chứ ?
    
Trả lời: Không, đó là một danh sách String : List<String>

```
[Jane, Sally, Joe, Samantha, Claire]
```
**Sequence** là một từ khóa trừu tượng trong Kotlin, nó giống như khái niệm **Stream** trong Java 8, hay nói một cách ngắn gọn đó là tập hợp những giá trị được lấy ra từ một Iterable khác ( nó không tự tạo ra mà đi "nhờ vả") :D 

Vui một chút như vậy, mọi người cùng nhìn vào một vài ví dụ để nắm rõ hơn :

```
val persons = listOf(
    Person("Peter", 16),
    Person("Anna", 23),
    Person("Anna", 28),
    Person("Sonya", 39)
)

val names = persons
    .asSequence()
    .filter { it.age > 18 }
    .map { it.name }
    .distinct()
    .sorted()
    .toList()
```

Một danh sách person được truyền vào và được chuyển đổi thành 1 `Sequence` nhờ vào method `asSequence()` , `Sequence` cũng được trang bị những api mạnh mẽ như một Iterable như :* filter, map, distinct , sorted* để tạo ra một Sequence mới. Và một toán tử đầu cuối là *toList(),  toSet,  sum* để trả về một collection tùy ý. Ở ví dụ này bạn thấy đó là một **List** 

Có những cách khởi tạo nào cho Sequence ?
    
Chúng ta vẫn hay bắt gặp `asSequence()` method để khởi tạo, ngoài ra còn có `sequenceOf`, `generateSequence`. 
   
**(*) Lưu ý:** Việc khởi tạo Sequence là không giới hạn bởi số lượng tham số của các đối tượng. Ví dụ :

```
val result = sequenceOf(1, 2, 3, 4, 5)
    .filter { it % 2 == 1 }
    .toList()

```
    
```
val result = generateSequence(0) { it + 1 }
    .take(5)
    .filter { it % 2 == 1 }
    .toList()
```

**Làm sao để dùng cho hợp lý?**

Mặc định bạn nên dùng **Iterable** để tạo ra các collection, với những trường hợp thực tế cần dùng với số lượng nhỏ thì hiệu năng của nó tốt hơn việc dùng Sequence.

Sequence sẽ được ưu tiên dùng khi bạn cần truy xuất một số lượng lớn các đối tượng và thêm vào đó các thao tác sắp xếp, lọc lên đến 1000 phần tử. Và còn 1 điều nữa nếu bạn đang làm trên Java thì hãy quan tâm đến việc sử dụng Stream bởi lẽ nó hỗ trợ rất tốt và ở Java không có Sequence cho bạn dùng :sunglasses:

### 3. Iteration với indexes

Bạn nên thực hiện vòng lặp với các item trong một collection như thế nào ? Đây chính là mong muốn được trả lời trong phần 3. À vòng lặp ư - "loop" thường dùng như vòng lặp : for, while ,... Điều đó là đúng nhưng không phải điều mình sẽ nói đến trong phần này. Bạn hãy xem nó có điểm gì hấp dẫn nhá ^^

Nào bây giờ bạn hãy xem có bao nhiêu cách tìm đến các item trong một danh sách nhé :

**a. Đầu tiên mọi người thường nghĩ ngay đến việc chạy từ vị trí 0 đến hết phạm vi của Array như này :**

```
fun main(args: Array<String>) {
    val args = arrayOf("arg1", "arg2", "arg3")
    for (i in 0..args.size - 1) {
        println(args[i])
    }
}
```

**b. Sau đó bạn biết được rằng Array có extension property là `lastIndex` sẽ làm cho việc đọc dễ dàng hơn**

```
for (i in 0..args.lastIndex) {
        println(args[i])
    }
```

**c. Sau rồi bạn thấy rằng việc dùng `args.size` cũng đâu tệ lắm chỉ cần dùng thêm key `util` là làm được việc mong muốn rồi. Vậy là đủ**

```
for (i in 0 until args.size) {
        println(args[i])
    }
```

Trông cũng phong phú đấy chứ, đâu phải có một hay 2 cách đâu. Đang có 3 cách rồi này :D Tiếp nhé :astonished:

**d. Bạn mới phát hiện ra việc dùng `indices` nó cũng có một vòng lặp tốt**

```
for (i in args.indices) {
        println(args[i])
    }
```

**e. Bây giờ bạn đã biết, đâu cần phải biết trước phạm vi của mảng vì nó không cần vào lúc này.**

```
for (arg in args) {
        println(arg)
    }
```

Cái này có thể nhiều bạn đã dùng mà không để ý lắm, không sao ở dưới mình sẽ giải thích chi tiết về nó. Vì còn một anh em của nó chưa được đề cập nữa ^_^

**f. Giờ mình không dùng `for` mà dùng `forEach` cho nó oách**

```
args.forEach { arg ->
            println(arg)
    }
```

Nếu bạn từng làm việc với PHP thì đây là một ý tưởng được lấy từ việc dùng `foreach` 

`PHP`

```
$arr = array(1, 2, 3, 4);
foreach ($arr as &$value) {
    $value = $value * 2;
}
```

**(*) Nhận xét:**
   
Sau khi đi qua 5 phương pháp xử lý một vòng lặp ở trên, chắc nhiều bạn đã nhận ra cả điểm chung và riêng của mỗi cách làm rồi đúng không nào? 

Cái chung nhất là kết quả cho ra giống nhau, có mấy cái cùng dùng `for` để làm điều này khỏi nói. Nhưng nếu để ý kỹ hơn ở phương án ** (a)** nếu như danh sách của bạn dùng là `LinkedList` thì thời gian trễ để nó tra cứu phần tử sẽ là **O(n^2)**, sẽ không là vấn đề khi collection bạn dùng là ArrayList vì thời gian trễ là **O(1)**

Dùng extension property `indices` sử dụng vòng lặp `for` để tìm kiếm từng phần tử theo chỉ mục là khá tốt nhưng ở cách làm này nó có mã bytecode sạch nhất so với 3 phương án trước đó. Bạn biết mình đang nói đến phương án **(d)** phải không nào ?

Phương án **(e)** và **(f)** bạn biết khác so với những phương án trên ở chỗ nó không quan tâm đến index gì cả, lấy luôn từng phần tử (item) để xử lý, nhiều bài toán chúng ta cũng thích dùng cách làm này hơn.

### 4. Tổng kết

Chúng ta vừa đi qua Array<Int> - Iterable – Iteration trong Kotlin trên một cái nhìn tổng quát hơn, mình hy vọng các bạn sẽ nhận thêm được cho mình một điều gì đó mới và nó thực sự hữu ích trong quá trình làm việc sau này. Nếu còn điều gì "băn khoăn" bạn hãy để lại comment cho mình nhé. Happy Coding !!!