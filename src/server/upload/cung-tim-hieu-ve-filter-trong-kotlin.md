Xin chào các bạn, hôm nay mình sẽ giới thiệu về Filter trong Kotlin. Filter là một trong những tasks phổ biến nhất trong collection. Trong Kotlin, các điều kiện filter được xác định bởi các *predicates* - các hàm lambda nhận một phần tử tập hợp và trả về giá trị boolean: true có nghĩa là phần tử đã cho khớp với predicates, false nghĩa là ngược lại.

Thư viện tiêu chuẩn chứa một nhóm các hàm mở rộng cho phép bạn filter các collection chỉ một lệnh gọi. Các hàm này không thay đổi collection ban đầu, để có được kết quả filter, bạn nên gán nó cho một biến hoặc chuỗi các chức năng(ví dụ Pair, Triple ) sau khi filter.

## Filtering bởi predicate

Chức năng Filter cơ bản là *filter()*. Khi được gọi với một predicates,  filter()  trả về một list các phần tử  khớp với nó. Đối với List và Set, kết quả của filter() là một List, đối với Map thì là một Map.
Ví dụ: 
```
val numbers = listOf("one", "two", "three", "four")  
val longerThan3 = numbers.filter { it.length > 3 }
println(longerThan3)

val numbersMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3, "key11" to 11)
val filteredMap = numbersMap.filter { (key, value) -> key.endsWith("1") && value > 10}
println(filteredMap)

// kết quả là: 
[three, four]
{key11=11}
```

Khi dùng filter thì chỉ có thể check các predicates là giá trị phần tử của mảng. Nếu muốn check predicates là index thì cần dùng hàm filterIndexed(). Nó nhận một vị từ với hai đối số: index  và giá trị của phần tử của mảng.

Để filter theo các điều kiện phủ định, hãy sử dụng hàm filterNot(). Nó trả về một list các phần tử là  có predicates trả về false

Ví dụ: 
```
val numbers = listOf("one", "two", "three", "four")

val filteredIdx = numbers.filterIndexed { index, s -> (index != 0) && (s.length < 5)  }
val filteredNot = numbers.filterNot { it.length <= 3 }

println(filteredIdx)
println(filteredNot)

// kết quả là:
[two, four]
[three, four]
```

Nếu trong một mảng có nhiều kiểu dữ liêu , Để filter các loại kiểu dữ liệu đó (Integer , String , object ...) thì cần sử dùng hàm *filterIsInstance()*

Ví dụ:
```
val numbers = listOf(null, 1, "two", 3.0, "four")
println("All String elements in upper case:")
numbers.filterIsInstance<String>().forEach {
    println(it.toUpperCase())
}

// kết quả là:
All String elements in upper case:
TWO
FOUR
```

Để lấy ra các phần tử khác null thì sẽ sử dùng hàm *filterNotNull()*
Ví dụ:
```
val numbers = listOf(null, "one", "two", null)
numbers.filterNotNull().forEach {
    println(it.length)   // length is unavailable for nullable Strings
}

// kết quả là :
3
3
```

## Partitioning
Một hàm Filter hay dùng khác là *partition()* - filter một tập hợp theo một predicate và giữ các phần tử không khớp với nó trong một list riêng. Vì vậy, bạn có một Pair trong số list là giá trị trả về: danh sách đầu tiên chứa các phần tử khớp với predicate  và danh sách thứ hai  chứa các phần tử còn lại.
Ví dụ:
```
val numbers = listOf("one", "two", "three", "four")
val (match, rest) = numbers.partition { it.length > 3 }

println(match)
println(rest)

 // kết quả là:
[three, four]
[one, two]
```

## Testing predicates
Cuối cùng, có những hàm chỉ đơn giản là kiểm tra một predicate so với các phần tử tập hợp:

* *any()* trả về true nếu ít nhất một phần tử khớp với predicate đã cho. 
* *none()* trả về true nếu không có phần tử nào phù hợp với predicate đã cho.
* *all()* trả về true nếu tất cả các phần tử khớp với predicate đã cho. all() trả về true khi được gọi với bất kỳ predicate hợp lệ nào trên một tập hợp null.

Ví dụ:
```
val numbers = listOf("one", "two", "three", "four")

println(numbers.any { it.endsWith("e") })
println(numbers.none { it.endsWith("a") })
println(numbers.all { it.endsWith("e") })

println(emptyList<Int>().all { it > 5 })

// kết quả là: 
true
true
false
true
```

Bài viết của mình kết thúc ở đây, tài liệu mình lấy trên trang doc của Kotlin: https://kotlinlang.org/docs/reference/collection-filtering.html

Cảm ơn bạn đã đọc bài viết <3.