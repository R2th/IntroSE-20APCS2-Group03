# Giới thiệu
List (danh sách) là một Collection trong Kotlin. Đây là cấu trúc dữ liệu được sử dụng nhiều nhất và nó có thể được sử dụng theo nhiều cách khác nhau để lập mô hình và giải quyết một loạt các vấn đề. Trong bài viết này, chúng ta sẽ xem xét một số mẹo và thủ thuật khi làm việc với List trong Kotlin.
Hy vọng bạn sẽ thấy chúng hữu ích.
# 1 - Tìm giá trị thường xuyên nhất
```
val list = listOf("Ahsen","Saeed","Just","Another","Programming Nerd","Ahsen")
fun main() {
    val countByElement = list.groupingBy { it }.eachCount()
    val maximumElement = countByElement.maxBy { it.value }?.key
    println(countByElement) 
    println(maximumElement) 
}
```
**Output:**
```
{Ahsen=2, Saeed=1, Just=1, Another=1, Programming Nerd=1}
Ahsen
```
# 2 - Tạo một chuỗi từ tất cả các phần tử trong List
```
val list = listOf("Ahsen","Saeed","Just","Another","Programming")
fun main() {
   val joinedString = list.joinToString(prefix = "Hey There, ", separator = " ", postfix = " Nerd")
   println(joinedString)
}
```
**Output:**
```
Hey There, Ahsen Saeed Just Another Programming Nerd
```
joinToString tạo một chuỗi từ tất cả các phần tử được phân tách bằng dấu cách sử dụng prefix và postfix. Đây là các giá trị mặc định cho phương thức joinToString ở trên.

| Parameter Name | Default Value |
| -------- | -------- | 
| separator| “,” |
| prefix| “” |
| postfix| “” |
# 3 - Hoán đổi hai List
```
fun main() {
    var (first,second) = listOf(1,2,3,4,5) to listOf(6,7,8,9,10)
    println("Before swapping: first -> $first and second -> $second")
    first = second.also { second = first }
    println("After swapping: first -> $first and second -> $second")
}
```
**Output:**
```
Before swapping: first -> [1, 2, 3, 4, 5] and second -> [6, 7, 8, 9, 10]
After swapping: first -> [6, 7, 8, 9, 10] and second -> [1, 2, 3, 4, 5]
```
# 4 - Sắp xếp List theo thứ tự tăng dần/giảm dần
```
val avengerNames = listOf("Chris Evans", "Jeremy Renner", "Scarlett johansson", "Josh Brolin", "Chris Hemsworth")
val numbers = listOf(5, 8, 1, 6, 10, 4, 7, 3, 9, 2)
fun main() {
   val avengersNamesAscendingOrder = avengerNames.sorted()
   val avengersNamesDescendingOrder = avengerNames.sortedDescending()
   val numbersInAscending = numbers.sorted()
   val numbersInDescending = numbers.sortedDescending()
   println("Avengers names in ascending -> $avengersNamesAscendingOrder")
   println("Avengers names in descending $avengersNamesDescendingOrder")
   println("Numbers in ascending -> $numbersInAscending")
   println("Numbers in descending -> $numbersInDescending")
}
```
**Output:**
```
Avengers names in ascending -> [Chris Evans, Chris Hemsworth, Jeremy Renner, Josh Brolin, Scarlett johansson]
Avengers names in descending [Scarlett johansson, Josh Brolin, Jeremy Renner, Chris Hemsworth, Chris Evans]
Numbers in ascending -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Numbers in descending -> [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```
# 5 - Xóa bản sao khỏi danh sách
```
val numbers = listOf(1, 2, 3, 4, 5, 1, 2, 3, 6, 7, 5, 9, 10)
fun main() {
   val distinctedList = numbers.distinct()
   println(distinctedList)
}
```
**Output:**
```
[1, 2, 3, 4, 5, 6, 7, 9, 10]
```
Note: distinct hoạt động khá tốt với các kiểu dữ liệu khác.
# 6 - Tìm phần tử lớn/nhỏ nhất
```
val animals = listOf("Baboon", "Argalis", "Cat", "Lion", "Monkey", "Zebra", "Fox", "Elephant")
val numbers = listOf(10, 2, 3, 4, 5, 1, 2, 3, 6, 7, 5, 9)
fun main() {
   val minAnimal = animals.min()
   val maxAnimal = animals.max()
   val minNumber = numbers.min()
   val maxNumber = numbers.max()
   println("Min animal: $minAnimal")
   println("Max animal: $maxAnimal")
   println("Min number: $minNumber")
   println("Max number: $maxNumber")
}
```
**Output:**
```
Min animal: Argalis
Max animal: Zebra
Min number: 1
Max number: 10
```
# 7 - Thực hiện tính toán trên List và trả về Kết quả
```
val numbers = listOf(1, 2, 3, 4, 5)
fun main() {
   val productResult = numbers.reduce { x, y -> x * y}
   println("Result: " + productResult)
} 
```
**Output:**
```
Result: 120
```
Method reduce hơi phức tạp nên tôi cố gắng giải thích nó hoạt động bên trong. Ban đầu, phương thức reduce gọi ra hai mục đầu tiên từ một List và trả về kết quả. Sau đó, hàm được gọi lại với kết quả thu được trước đó và giá trị tiếp theo trong List. Quá trình này tiếp tục lặp lại cho đến khi có các mục trong List.
# 8 - Đảo ngược List
```
val avengers = listOf("Chris Evans", "Jeremy Renner", "Scarlett johansson", "Josh Brolin", "Chris Hemsworth")
fun main() {
   val reversedAvengers = avengers.reversed()
   println(reversedAvengers)
}
```
**Output:**
```
[Chris Hemsworth, Josh Brolin, Scarlett johansson, Jeremy Renner, Chris Evans]
```
# 9 - Tìm kiếm nhị phân
```
val animals = listOf("Baboon", "Argalis", "Cat", "Lion", "Monkey", "Zebra", "Fox", "Elephant")
fun main() {
   val sortedAnimals = animals.sorted()
   val index = sortedAnimals.binarySearch("Lion")
   println(sortedAnimals[index]) 
}
```
**Output:**
```
Lion
```
Note: Danh sách tìm kiếm phải được sắp xếp, nếu không sẽ không xác định được kết quả.
# 10 - Chuyển đổi một mảng thành List
```
data class Person(val name: String, val age: Int)
val array = arrayOf<Person>()
val list = array.toList()
```
# Kết luận
Trên đây là 10 mẹo và thủ thuật khi làm việc với List. Nếu trong bài viết có vấn đề nào thì các bạn hãy đề xuất để tôi có thể cập nhật lại bài viết một cách chính xác nhất.
Cám ơn và hẹn gặp lại các bạn ở bài viết tới.