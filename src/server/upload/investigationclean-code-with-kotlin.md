Clean code kotlin là gì? Có lẽ bạn đã nghe quá nhiều những người đi trước nói rằng: Em phải viết clean code thì mã nguồn mới dễ đọc, dễ mở rộng, dễ bảo trì… Nhưng bạn có biết clean code Kotlin là thế nào không? Đầu tiên và cũng là quan trọng nhất, clean code tức là code dễ đọc, dễ hiểu. Không phải cứ viết ngắn gọn là clean code.
![image.png](https://images.viblo.asia/db98c7d9-6bf7-40f0-987d-468772d1ad60.png)
Trong quá trình phát triển dự án hằng ngày chúng ta không hẳn chỉ làm tốt phần việc của mình mà còn phải có cái nhìn tổng quan cùng sự quan tâm đến những gì ta code thì những người khác đọc vào có dễ hiểu không? Hoặc chính ta sau này đọc lại không phải vang lên những câu kiểu "ĐM. Thằng nào viết code xxx thế nhở" :sneezing_face:
Điều này đặc biệt hữu dụng khi dự án có nhiều thành viên, thời gian maintaince dài. Khi đọc code, các member chỉ cần nhìn tên class, tên hàm, tên package… là hiểu ngay. 
Ok. Mở bài vậy đủ rồi cùng tìm hiểu ngay thôi nào
# Tên biến, hàm, Class… phải có nghĩa - chức năng nhỏ
Trong quá trình làm task của mình thì mình thường khá tốn thời gian cho việc đặt tên các biến nhưng bù lại lợi ích nó mang lại vô cùng lớn. Khi mà chương trình ngày càng mở rộng số lượng các biến, hàm, class càng nhiều thì càng cần có quy định và cách đặt tên thống nhất để dễ dàng quản lý. 
### Tên biến
Khi bạn đặt tên biến thì hãy cố gằng trả lời các câu hỏi như "Vì sao biến này tồn tại?", "Biến này là cái gì?", "Biến này sử dụng như thế nào? Khi nào?",... Nếu một tên biến cần phải comment để giải thích thì tên đó vẫn chưa đạt được yêu cầu của “Clean code”.
Ví dụ:
```
// Không nên
var a = 0
var w = 0 
var h = 0 
// Nên
var userAge = 0
var userWeight = 0
var userHeight = 0
```
### Tên hàm
Tên hàm nên sử dụng động từ để đặt tên. Ví dụ: postPayment(), deletePage(), hay save()…
Ví dụ:
```
// Không nên 
fun age()
fun weight()
fun height()
// Nên
fun setUserAge()
fun setUserWeight()
fun setUserHeight()
```
### Tên class
Ngược với tên hàm. Tên Class hay Object nên là danh từ hay cụm danh từ. Ví dụ: Customer, Account, hay Address. Ta nên tránh thêm những hậu tố vào trong tên class: Manager, Processor, Data, or Info.
```
// Không nên 
class UserData()
// Nên
class Users()
```
### Chức năng nhỏ -  Small Functions
Một nguyên tắc vàng là các chức năng phải càng nhỏ càng tốt và chỉ phụ trách một nhiệm vụ cụ thể. Việc ngày khiến nó trở nên dễ hiểu và ít bị thay đổi.
Vậy là sao? Cùng mình tìm hiểu ví dụ cụ thể dưới đây :clap:
# Example
Đây là chức năng hiển thị những người chơi trẻ tuổi trong một game online nào đấy. Các lớp sẽ là Winner, Player, Score. Ở đây Level sẽ là lớp enum. Cùng xem qua đoạn code này nhé:
```
enum class Level {
	GOLD,
    SILVER,
    BRONZE,
    WOOD
}

data class Winner(val name: String, val level: Level)

data class Player(val fullName: String, val age: Int, val score: Score)

data class Score(val value: Int)

fun getListYoungWinners(list: List<Player>): List<Winner> {
    return list.filter {
        it.age > 13 && it.age <= 21 && it.score.value > 7000
    }.map {
        var level: Level
        if (it.score.value >= 7000 && it.score.value <= 8000) {
            level = Level.WOOD
    	} else if (it.score.value > 8000 && it.score.value <= 9000) {
            level = Level.BRONZE
        } else if (it.score.value > 9000 && it.score.value <= 10000) {
            level = Level.SILVER
        } else {
            level = Level.GOLD
        }
    }
    .sortedBy { 
        it.level 
    }
}
```
Các vấn đề dễ thấy trong đoạn code trên như sau:
1. Kích thước của hàm getListYoungWinners quá lớn.
2. Tên dễ gây nhầm lẫn. ("it")
3. Điều kiện lồng nhau.


![image.png](https://images.viblo.asia/bb1605bf-5e51-4231-9e2c-5828be70006c.png)
###  Refactor code
Ta sẽ phân tích từng phần nhé. Đầu tiên, thay vì dùng filter
```
list.filter { it.age > 13 && it.age <= 21 && it.score.value > 7000 }
```
Ta sẽ define ra 2 function nhỏ hơn isYoung thuộc class Player và scoreExceedsMinimumValue. Các hàm này chỉ có một biểu thức cho nên ta có thể define bằng  cách rút gọn như bên dưới:
```
class Player(val fullName: String, val age: Int, val score: Score) {
    //Some code
    fun isYoung() = age in 13..21
    //Some code
} 

fun scoreExceedsMinimumValue(score: Score) = score.value > 7000
```
Đoạn code trên được thay thế thành:
```
list.filter { player -> player.isYoung() }
        .filter { player -> scoreExceedsMinimumValue(player.score) }
```
Các hàm filter nhận lambdas và khi một biểu thức lambdas chỉ có một tham số, Kotlin sẽ ngầm đặt tên `it`. Điều này có thể giúp giảm kích thước của code, nhưng có thể gây nhầm lẫn khi xác định xem `it` thuộc về lambdas nào nhất là trong các đoạn code phức tạp có lambdas lồng nhau. Cho nên nếu có thể hãy đặt tên biến ở đây đễ code dễ hiểu hơn :raised_hands:

Tiếp theo, thay vì dùng map rồi if else lồng nhau như vậy ta sẽ define ra thêm 2 function mapLevelToScore và createWinnerFromPlayer như sau:
```
fun mapLevelToScore(score: Score) = when (score.value) {
    in 7000..8000 -> Level.WOOD
    in 8001..9000 -> Level.BRONZE
    in 9001..8000 -> Level.SILVER
    else -> Level.GOLD
}

fun createWinnerFromPlayer(player: Player): Winner {
    val level = mapLevelToScore(player.score)
    return Winner(player.fullName, level)
}
```
Ta sử dụng When để loại bỏ điều kiện if else if lồng nhau. Toán tử `in` để xác định phạm vi của score. Có thể nhận thấy code đã dễ hiểu hơn rất nhiều.
Cuối cùng ta có đoạn mã đã refactor lại như sau:
```
class Player(val fullName: String, val age: Int, val score: Score) {
    //Some code
    fun isYoung() = age in 13..21
    //Some code
} 

fun scoreExceedsMinimumValue(score: Score) = score.value > 7000

fun mapLevelToScore(score: Score) = when (score.value) {
    in 7000..8000 -> Level.WOOD
    in 8001..9000 -> Level.BRONZE
    in 9001..8000 -> Level.SILVER
    else -> Level.GOLD
}

fun createWinnerFromPlayer(player: Player): Winner {
    val level = mapLevelToScore(player.score)
    return Winner(player.fullName, level)
}

fun getListYoungWinners(list: List<Player>): List<Winner> {
    return list
    .filter { player -> player.isYoung() }
    .filter { player -> scoreExceedsMinimumValue(player.score) }
    .map { player -> createWinnerFromPlayer(player) }
    .sortedBy { winner -> winner.level}
}
```
Vậy thì thay vì để hàm getListYoungWinners gánh team và làm tất cả mọi việc như cũ thì ta sẽ define thêm 4 hàm con đỡ đần là: isYoung, scoreExceedsMinimumValue, mapLevelToScore và createWinnerFromPlayer. Rất tuyệt đúng không nào.
# Dữ liệu bất biến - Immutable Data
Ta nên sử dụng các đối tượng bất biến ví chúng làm cho đoạn code dễ hiểu hơn cũng như tránh các trường hợp bị sửa đổi ở những nơi không mong muốn. 
###  Ví dụ:
Ta có một lớp Player và lớp Game như sau:
```
data class Player(val name: String, val health: Int)

data class Game(val player: Player, val map: Int)
```
Các thuộc tính được khai báo với `val` sẽ không bị thay đổi, vì thế không thể thay đổi Player sau khi nó được khởi tạo. Để tạo một bản sao khác ta có thể sử dụng function copy(). Player sẽ giống nhau ở originalGame và copiedGame nhưng vì các biến của class Game là val cho nên tính bất biến vẫn được đảm bảo.
```
val darkPlayer = Player("Maanx", 100)
val originalGame = Game(darkPlayer, 2)
val copiedGame = originalGame.copy()

copiedGame.player.health = 200 // error: val cannot be reassigned
```
# Tạm kết
Trong giới hạn bài viết trên mình đã giới thiệu đến các bạn về hai trong số những điều quan trọng nhất để clean code với Kotlin. Tóm lại:
* Sử dụng các hàm nhỏ để code dễ hiểu hơn.
* Các modul code phải có một trách nhiệm duy nhất.
* Khi đặt tên biến, hàm, Class… phải có nghĩa.
* Nên sử dụng các kiểu dữ liệu bất biến để tránh các trường hợp bị sửa đổi ở những nơi không mong muốn.

Ngoài ra bạn có thể đọc thêm quy tắc S.O.L.I.D để viết clean code Kotlin. Hẹn gặp lại các bạn ở bài viết sau. :hugs:
# Bài viết tham khảo
https://blog.intive-fdv.com/what-is-a-clean-code-improving-the-code-with-kotlin/