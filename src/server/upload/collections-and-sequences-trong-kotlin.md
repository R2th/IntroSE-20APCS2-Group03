Làm việc với các **Collections** là một nhiệm vụ phổ biến và Kotlin Standard Library cung cấp nhiều chức năng tiện ích tuyệt vời. 
Nó cũng cung cấp hai cách làm việc với các bộ sưu tập dựa trên cách họ đánh giá: **eagerly** - với **Collections**  và **lazily**  - với **Sequences**.

## Collections vs sequences

Sự khác biệt giữa eager và lazy nằm ở khi mỗi biến đổi trên Collections được thực hiện.

Các Collections được cho là eager - mỗi thao tác được thực hiện khi nó được gọi và kết quả của hoạt động được lưu trữ trong một bộ sưu tập mới. Các biến đổi trên các bộ sưu tập là các hàm nội tuyến.

Ví dụ, nhìn vào cách map được triển khai, chúng ta có thể thấy rằng nó có chức năng nội tuyến, tạo ra một ArrayList mới:
```
public inline fun <T, R> Iterable<T>.map(transform: (T) -> R): List<R> {
  return mapTo(ArrayList<R>(collectionSizeOrDefault(10)), transform)
}
```

Sequences được đánh giá lazy. Nó có hai loại biến đổi: **intermediate** và **terminal**. 

**Intermediate operations** không được thực hiện tại chỗ; Nó chỉ lưu trữ. Chỉ khi một **terminal operations** được gọi, **Intermediate operations** được kích hoạt trên mỗi phần tử trong 1 row và cuối cùng **terminal operations** áp dụng. 

**Intermediate operations** (như map, distinct, groupBy, v.v.) trả về một **sequence** khác trong khi các hoạt động **terminal** (như first, toList, count, v.v.) thì không

**Sequences** không giữ một tham chiếu cho các mục của **Collections**. Họ được tạo ra dựa trên iterator của Collections gốc và giữ một tham chiếu đến tất cả các **intermediate operation** cần được thực hiện.

Không giống như các phép biến đổi trên các Collections, các phép biến đổi **intermediate** trên các Sequences không phải là các hàm nội tuyến - các hàm nội tuyến không thể được lưu trữ và các Sequences cần lưu trữ chúng. Nhìn vào cách một biến đổi trung gian như map được triển khai, chúng ta có thể thấy rằng hàm biến đổi được giữ trong một instance mới của Sequence:

```
public fun <T, R> Sequence<T>.map(transform: (T) -> R): Sequence<R>{      
   return TransformingSequence(this, transform)
}
```
    
Một **terminal operations**,  như **first**, lặp qua các phần tử của chuỗi cho đến khi điều kiện được khớp.

```
public inline fun <T> Sequence<T>.first(predicate: (T) -> Boolean): T {
   for (element in this) if (predicate(element)) return element
   throw NoSuchElementException(“Sequence contains no element matching the predicate.”)
}
```

Nếu chúng ta xem cách triển khai một Sequence như TransformingSequence (được sử dụng trong map ở trên), chúng ta sẽ thấy rằng khi next được gọi trên Sequence Iterator, phép chuyển đổi được lưu trữ cũng được áp dụng.

```
internal class TransformingIndexedSequence<T, R> 
constructor(private val sequence: Sequence<T>, private val transformer: (Int, T) -> R) : Sequence<R> {
override fun iterator(): Iterator<R> = object : Iterator<R> {
   …
   override fun next(): R {
     return transformer(checkIndexOverflow(index++), iterator.next())
   }
   …
}
```
    
Phụ thuộc vào việc bạn có sử dụng các **Collection** hay **Sequence** hay không, Thư viện tiêu chuẩn Kotlin cung cấp một loạt các hoạt động cho cả hai, như find, filter, groupBy và các thứ khác. Hãy chắc chắn rằng bạn kiểm tra chúng, trước khi thực hiện phiên bản này của riêng bạn.

Tham khảo
https://medium.com/androiddevelopers/collections-and-sequences-in-kotlin-55db18283aca