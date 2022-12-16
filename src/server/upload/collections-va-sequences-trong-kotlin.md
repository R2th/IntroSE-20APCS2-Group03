Làm việc với các bộ sưu tập là một nhiệm vụ phổ biến và Kotlin Standard Library  cung cấp nhiều chức năng tiện ích tuyệt vời. Nó cũng cung cấp hai cách làm việc với các collections dựa trên cách họ đánh giá:  **eagerly** — với Collections, và **lazily** — với Sequences. Tiếp tục đọc để tìm hiểu những gì khác biệt giữa chúng, bạn nên sử dụng cái nào và khi nào, và ý nghĩa hiệu suất của mỗi cái là gì.

#
##### Collections vs Sequences
Sự khác biệt giữa đánh giá eager and lazy nằm ở khi mỗi biến đổi trên bộ sưu tập được thực hiện.

Các Collections được đánh giá là một cách eager - mỗi thao tác được thực hiện khi nó được gọi và kết quả của hoạt động được lưu trữ trong một Collections mới. Các biến đổi trên các Collections là các inline function.

Ví dụ, nhìn vào cách *map* được triển khai, chúng ta có thể thấy rằng nó là inline function, tạo ra một ArrayList mới:

```kotlin
public inline fun <T, R> Iterable<T>.map(transform: (T) -> R): List<R> {
  return mapTo(ArrayList<R>(collectionSizeOrDefault(10)), transform)
}
```
#
Sequences được đánh giá là lazy. Nó có hai loại hoạt động **intermediate** và **terminal**. Hoạt động Intermediate không được thực hiện tại chỗ, nó chỉ lưu trữ. Chỉ khi một hoạt động terminal được gọi, các hoạt động tintermediate được kích hoạt trên mỗi phần tử liên tiếp và cuối cùng, hoạt động terminal được áp dụng. Các hoạt động Intermediate (như *map*, *distinct*, *groupBy*, v.v.) trả về một chuỗi khác trong khi các hoạt động đầu cuối (như *first*, *toList*, *count*, v.v.)

Sequences không  giữ một reference cho các item của Sequences. Chúng đã tạo ra dựa trên trình vòng lặp của Sequences gốc và giữ một tham chiếu đến tất cả các hoạt động intermediate cần được thực hiện.

Không giống như các phép biến đổi trên các Collections, các phép biến đổi intermediate trên các chuỗi không phải là các inline function - các inline function không thể được lưu trữ và các Sequence cần lưu trữ chúng.

```kotlin
public fun <T, R> Sequence<T>.map(transform: (T) -> R): Sequence<R>{      
   return TransformingSequence(this, transform)
}
```

Một hoạt động terminal, giống như *first*, lặp qua các phần tử của chuỗi cho đến khi điều kiện vị ngữ được khớp.

```kotlin
public inline fun <T> Sequence<T>.first(predicate: (T) -> Boolean): T {
   for (element in this) if (predicate(element)) return element
   throw NoSuchElementException(“Sequence contains no element matching the predicate.”)
}
```


Nếu chúng ta xem cách thực hiện sequence như TransformingSequence (được sử dụng trong *map* ở trên), chúng ta sẽ thấy rằng khi tiếp theo được gọi trên trình vòng lặp trình tự, phép chuyển đổi được lưu trữ cũng được áp dụng.

```kotlin
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

Không phụ thuộc vào việc bạn có sử dụng các collections hay sequences hay không, Kotlin Standard Library cung cấp một loạt các hoạt động cho cả hai, như *find*, *filter*, *groupBy* và các thứ khác. Hãy chắc chắn rằng bạn kiểm tra chúng, trước khi thực hiện phiên bản này của riêng bạn.

![](https://miro.medium.com/max/3200/0*cW3fdJErm_N2hIUp)