Mọi người thường bỏ lỡ sự khác biệt giữa Iterable và Sequence. Nó có thể giải thích được. Đặc biệt là khi bạn so sánh định nghĩa Iterable và Sequence:
```
interface Iterable<out T> {
    operator fun iterator(): Iterator<T>
}
interface Sequence<out T> {
    operator fun iterator(): Iterator<T>
}
```
Bạn có thể nói rằng sự khác biệt chính thức duy nhất giữa chúng là tên. Nhưng Iterable và Sequence được kết hợp với cách sử dụng hoàn toàn khác nhau nên gần như tất cả các chức năng xử lý của chúng hoạt động theo một cách khác.

Sequence là lazy, vì vậy các hàm trung gian để xử lý Sequence không thực hiện bất kỳ phép tính nào. Thay vào đó, chúng trả về 1 Sequence mới để trang trí cho Sequence trước đó với thao tác mới. Tất cả các tính toán này được đánh giá trong thao tác cuối như toList hoặc count. Mặt khác, các hàm xử lý  Iterable trả về một collection mới.
```
fun main(args: Array<String>) {
    val seq = sequenceOf(1,2,3)
    print(seq.filter { it % 2 == 1 }) 
    // Prints: kotlin.sequences.FilteringSequence@XXXXXXXX
    print(seq.filter { it % 2 == 1 }.toList()) // Prints: [1, 3]
    val list = listOf(1, 2, 3)
    print(list.filter { it % 2 == 1 }) // Prints: [1, 3]
}
```
> Filter sequence là một hoạt động trung gian, do đó, nó không thực hiện bất kỳ phép tính nào, nhưng thay vào đó nó sẽ taoj sequence mới bằng bước xử lý mới. Tính toán được thực hiện trong hoạt động đầu cuối như toList.

Do đó, thứ tự xử lý hoạt động cũng khác nhau. Trong quá trình xử lý sequence, chúng thường xử lý toàn bộ cho một phần tử duy nhất, sau đó cho một phần tử khác. Trong quá trình xử lý Iterable, chúng xử lý toàn bộ collection trên mỗi bước.
```
sequenceOf(1,2,3)
        .filter { println("Filter $it, "); it % 2 == 1 }
        .map { println("Map $it, "); it * 2 }
        .toList()
// Prints: Filter 1, Map 1, Filter 2, Filter 3, Map 3,
listOf(1,2,3)
        .filter { println("Filter $it, "); it % 2 == 1 }
        .map { println("Map $it, "); it * 2 }
// Prints: Filter 1, Filter 2, Filter 3, Map 1, Map 3,
```
Nhờ vào tính chất lazy này và thứ tự xử lý mỗi phần tử, chúng ta có thể tạo ra Sequence vô hạn.
```
generateSequence(1) { it + 1 }
        .map { it * 2 }
        .take(10)
        .forEach(::print)
// Prints: 2468101214161820
```
Đây không phải là điều mới mẻ đối với nhà phát triển Kotlin với một số kinh nghiệm, nhưng có một thực tế quan trọng hơn về sequence không được đề cập trong hầu hết các bài viết hoặc sách: sequence hiêu quả cho việc xử lí collection với nhiều bước xử lý
```
fun singleStepListProcessing(): List<Product> {
    return productsList.filter { it.bought }
}

fun singleStepSequenceProcessing(): List<Product> {
    return productsList.asSequence()
            .filter { it.bought }
            .toList()
}
```
Bạn sẽ nhận thấy rằng gần như không có sự khác biệt về hiệu suất hoặc xử lý list đơn giản là nhanh hơn (vì nó là inline). Mặc dù sau đó bạn so sánh hàm với nhiều bước xử lý, như twoStepListProcessing sử dụng filter và sau đó là map, sự khác biệt sẽ rõ ràng.
```
fun twoStepListProcessing(): List<Double> {
    return productsList
            .filter { it.bought }
            .map { it.price }
}

fun twoStepSequenceProcessing(): List<Double> {
    return productsList.asSequence()
            .filter { it.bought }
            .map { it.price }
            .toList()
}

fun threeStepListProcessing(): Double {
    return productsList
            .filter { it.bought }
            .map { it.price }
            .average()
}

fun threeStepSequenceProcessing(): Double {
    return productsList.asSequence()
            .filter { it.bought }
            .map { it.price }
            .average()
}
```
Điều đó quan trọng như thế nào? Hãy xem thời gian hoạt động trung bình từ các phép đo điểm chuẩn:
```
twoStepListProcessing                                   81 095 ns/op
twoStepSequenceProcessing                               55 685 ns/op
twoStepListProcessingAndAcumulate                       83 307 ns/op
twoStepSequenceProcessingAndAcumulate                    6 928 ns/op
```
Xử lý hai bước đã rõ ràng nhanh hơn khi chúng ta sử dụng Sequence. Trong trường hợp này cải thiện là khoảng 30%.

Sự khác biệt này tăng lên nhiều hơn khi chúng ta reduce thành 1 số thay vì một số list. Trong trường hợp này, không cần tạo collection trung gian nào cả.

Các xử lý thực tế điển hình thì sao? Giả sử chúng ta cần tính giá trung bình của các sản phẩm mà người lớn mua:
```
fun productsListProcessing(): Double {
    return clientsList
            .filter { it.adult }
            .flatMap { it.products }
            .filter { it.bought }
            .map { it.price }
            .average()
}
fun productsSequenceProcessing(): Double {
    return clientsList.asSequence()
            .filter { it.adult }
            .flatMap { it.products.asSequence() }
            .filter { it.bought }
            .map { it.price }
            .average()
}
```
Đây là kết quả:
```
SequencesBenchmark.productsListProcessing             712 434 ns/op
SequencesBenchmark.productsSequenceProcessing         572 012 ns/op
```
Chúng tôi có cải thiện khoảng 20%. Đây là ít hơn cho xử lý trực tiếp (không có flatMap) nhưng vẫn là một sự khác biệt quan trọng.

Điều này cho thấy quy tắc chung có thể được tìm thấy một lần nữa khi bạn đo lường hiệu suất:
> Xử lý sequence thường nhanh hơn xử lý collection trực tiếp khi chúng ta có nhiều bước xử lý.
## Khi nào sequence không nhanh hơn?

Có một số hoạt động hiếm hoi mà chúng ta không có lợi từ việc sử dụng Sequence. Sorted là một ví dụ từ Kotlin stdlib (Tôi tin rằng nó là chức năng duy nhất trong Kotlin stdlib có vấn đề này).

Sorted sử dụng thực hiện tối ưu: Nó tích lũy Sequence vào List và sau đó sử dụng sort từ Java stdlib. Một bất lợi là quá trình tích lũy này mất thêm thời gian nếu chúng ta so sánh với cùng một xử lý trên Collection (mặc dù nếu Iterable không phải là một Collection hoặc mảng thì sự khác biệt là không đáng kể vì nó cũng cần được tích lũy).
> Nó gây tranh cãi nếu Sequence nên có các phương thức như sorted bởi vì nó chỉ lazy về mặt thể chất (được đánh giá khi chúng ta cần lấy phần tử đầu tiên) và không hoạt động trên các sequence vô hạn. Nó đã được thêm vào bởi vì nó là một chức năng phổ biến và nó dễ dàng hơn nhiều để sử dụng nó theo cách này. Mặc dù nhà phát triển Kotlin nên nhớ rằng không thể được sử dụng trên các Sequence vô tận.
```
generateSequence(0) { it + 1 }.sorted().take(10).toList()
// Infinitive calculation time
generateSequence(0) { it + 1 }.take(10).sorted().toList()
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
Sorted là một ví dụ hiếm có về bước xử lý nhanh hơn trên Collection, sau đó trên Sequence. Tuy nhiên, khi chúng ta thực hiện một vài bước xử lý và chức năng sorted đơn lẻ (hoặc chức năng khác cần làm việc trên toàn bộ collection), chúng ta có thể mong đợi cải thiện hiệu suất từ ​​việc di chuyển sang xử lý sequence.
```
// Took around 150 482 ns
fun productsSortAndProcessingList(): Double {
    return productsList
            .sortedBy { it.price }
            .filter { it.bought }
            .map { it.price }
            .average()
}

// Took around 96 811 ns
fun productsSortAndProcessingSequence(): Double {
    return productsList.asSequence()
            .sortedBy { it.price }
            .filter { it.bought }
            .map { it.price }
            .average()
}
```
## Về Java stream?

Java 8 đã giới thiệu stream để cho phép xử lý collection. Chúng hoạt động và trông giống như các sequence Kotlin.
```
productsList.asSequence()
    .filter { it.bought }
    .map { it.price }
    .average()

productsList.stream()
    .filter { it.bought }
    .mapToDouble { it.price }
    .average()
    .orElse(0.0)
```
Chúng cũng lazy và thu thập trong bước cuối cùng (kết thúc). Các stream Java cũng có hiệu quả hơn đối với việc xử lý collection, sau đó  chức năng xử lý trực tiếp collection Kotlin. Hai sự khác biệt lớn giữa các stream Java và các sequence Kotlin như sau:
* Các sequence Kotlin có nhiều hàm xử lý hơn (vì chúng được định nghĩa là các hàm mở rộng) và việc sử dụng chúng dễ dàng hơn (đây là kết quả của thực tế là các sequence Kotlin được thiết kế khi các stream Java đã được sử dụng - ví dụ chúng ta có thể thu thập bằng cách sử dụng toList() thay vì  collect(Collectors.toList()))
* Các stream Java có thể được khởi động ở chế độ song song bằng cách sử dụng hàm parallel. Điều này có thể cho chúng ta cải thiện hiệu suất rất lớn trong các ngữ cảnh khi chúng ta có một máy với nhiều lõi
* Kotltin sequence có thể được sử dụng trong các module chung, Kotlin/JS và Kotlin/Native modules.

Ngoại trừ việc, khi chúng ta không sử dụng chế độ song song, thật khó để đưa ra một câu trả lời đơn giản nếu Java stream hoặc sequence Kotlin hiệu quả hơn.
> Đề nghị của tôi là sử dụng các stream Java chỉ để xử lý nặng tính toán nơi bạn có thể có lợi từ chế độ song song. Nếu không, hãy sử dụng các hàm Kotlin stdlib để code đồng nhất và sạch.

Dịch từ bài viết: https://blog.kotlin-academy.com/effective-kotlin-use-sequence-for-bigger-collections-with-more-than-one-processing-step-649a15bb4bf