Hôm nay, chúng ta sẽ tìm hiểu một số tính năng thú vị của Kotlin mà bạn có thể chưa thấy hoặc đã sử dụng và cũng có một số điều mà bạn nên biết khi bạn lập trình với Kotlin.
Nào triển luôn thôi 
## 1. Hàm với số lượng đối số khác nhau
Chúng ta có thể truyền một số lượng đối số khác nhau cho một hàm trong Kotlin. Điều đó có nghĩa là bạn có thể truyền **n** số lượng đối số cho một hàm. Tính năng này tồn tại trong Java, nhưng bạn có biết làm thế nào để làm điều đó trong Kotlin không? Xem qua nhé :
```kotlin 
// function with varargs
fun functionWithVaribalParams(vararg values : String){
    values.map {
        val v = "${tv_value.text.toString().trim()} $it"
        tv_value.text = v
    }
}

//simple invokation
functionWithVaribalParams("Bob","Bill")
```
Đến đây, bạn có thế nghĩ, cái này mới học ai chả biết, thế mà cũng nói. Vấn để ở đây là chúng ta có thể truyền bao nhiêu biến số mà chúng ta cần, nhưng điều đó không có nghĩa là bạn có thể truyền  một `ArrayList`. Tuy nhiên, có một cách để truyền một mảng và bạn cũng có thể truyền kết hợp cả mảng và các chuỗi riêng lẻ. Như vậy mới khác bọt chứ, hãy xem nhé:
```kotlin
val arrayNames  = arrayOf("sam","neha")
// example to pass an array of values
functionWithVaribalParams(*arrayNames.copyOf())
// example to pass an array of values along with individual values
functionWithVaribalParams("Bob",*arrayNames.copyOf(),"Bill")
```
Điều xảy ra trong đó, khi `vararg` được gọi đến các tham số bạn đã truyền, dưới dạng định dạng `Array` hoặc các loại riêng lẻ tương ứng, tất cả đều được chuyển đổi thành một mảng các giá trị trong trình biên dịch Kotlin, trong khi tạo các tệp Java. Mình cá là nhiều bạn không biết đâu nha :stuck_out_tongue_closed_eyes:.
## 2. Tối ưu hóa các hàm đệ quy
Gọi các hàm đệ quy luôn là khó nhằn trên bất kỳ nền tảng nào. Đệ quy vô cùng tiện lợi trong một số trường hợp nhưng cũng có lúc xử lý nó không phải đơn giản. Khi hàm đệ quy đó làm các công việc khó khăn , nó sẽ phức tạp hơn nhiều. Chúng ta nên làm một cái gì đó để tối ưu hóa chức năng và `tailrec` là cách để làm điều đó trong Kotlin. Hãy xem một hàm đệ quy đơn giản:
```kotlin 
//recursion function
fun Fact(num: Int):Long{ 
    return if(num==1) num.toLong()
    else num*Fact(num-1) 
} 

fun main() { 
    println("Factorial of 5 is: "+Fact(5)) 
//Recursive call 
} 
```
Điều này trông có vẻ đơn giản, nhưng khi bạn thay `30000` thay vì `5`, nó có còn đơn giản không ? Và điều gì xảy ra nếu hàm `Fact` có một số thao tác phức tạp , chẳng hạn như ghi vào tệp hoặc giao tiếp socket. Bạn có thể thấy mọi thứ có thể trở nên phức tạp như thế nào với đệ quy.

Thật không may, Kotlin thông qua JVM nên sẽ không có bất kỳ tối ưu hóa nào về việc này. Nhưng Kotlin có thể tối ưu hóa nó bằng cách chỉ cần thêm `tailrec` trước function. Hãy xem:
```kotlin
tailrec fun Fact(num: Int):Long{ 
    return if(num==1) num.toLong()
    else num*Fact(num-1) 
} 
```
Có thể hiểu đơn giản khi bạn chạy đệ quy mà không thể thoát ra khỏi được thì `tailrec` sẽ giúp bạn out ra, tránh việc crash chương trình. Khi bạn nhập 3000 (1000 cũng đủ toang rồi nhé  ông giáo ạ ), thì sẽ có rất vòng lặp và máy sẽ không tính được. Không tin bạn có thể bấn casio mà ra kết quả là MATH ERROR luôn. Không thì code xem và nhận ra sự khác bọt nhé 

## 3. Property Delegation
Giả sử rằng ta có một thuộc tính , thay vì phải lấy và thiết lập các phương thức trên đó, ta muốn gọi một lớp khác khi get hoặc set invoke. Hơi mơ hồ nhỉ , hãy xem đoạn code sau:
```kotlin 
var name: String by Delegate()
class Delegate {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return "$thisRef, thank you for delegating '${property.name}' to me!"
    }
 
    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        println("$value has been assigned to '${property.name}' in $thisRef.")
    }
}
```
Chúng ta có thể sử dụng Kotlin delegation  theo nhiều cách. Một cách mình thấy hữu ích là loại bỏ các hàm get và set riêng biệt trong `preference` .
```kotlin 
var accessToken: String
    get() = sharedPreferenceHelper.getString(Constants.ACCESS_TOKEN,"")
    set(accessToken) = sharedPreferenceHelper.setString(Constants.ACCESS_TOKEN, accessToken)
```
Cách sử dụng hữu ích tiếp theo là quan sát một giá trị biến - để ta được thông báo giá trị biến bị thay đổi. Bằng cách đó, nếu có bất kỳ UI  nào cần cập nhật, chúng ta có thể thực hiện chúng. Hãy xem đoạn code sau để biết cách quan sát một biến:
```kotlin 
var status : Boolean by Delegates.observable(false){
    property, oldValue, newValue ->
    if (status){
        // Do the functionality like updateing UI
    }else{
        // else case functionality
    }
}
```
## 4. “step” trong Loops
Chúng ta đều biết các vòng lặp hoạt động như thế nào trong Kotlin. Bạn đưa ra một giá trị ban đầu và gia tăng trên mỗi lần lặp cho đến khi điều kiện bạn đề cập không được thỏa mãn :
```kotlin
for(i in 1 .. 10 ){
  Log.v("present iteration",": $i")
}
```
Còn với trường hợp nhảy cách thì sao, step sẽ hộ trợ chúng ta :
```kotlin
for(i in 1 .. 10 step 3){
  Log.v("present iteration",": $i")
}
```
Trông khá tiện lợi đúng không nhỉ , nhưng theo `Romain Guy`phát biểu trong KotlinConfig 2019, điều này sẽ làm tăng đáng kể kích thước, vì vậy bạn chỉ nên sử dụng nó như là phương pháp cuối cùng chứ không nên lạm dụng nhé 
## 5. lazy
Giả sử có một biến mà giá trị của nó được thiết lập bằng cách  thực hiện một công việc tốn tài nguyên, nhưng biến đó chỉ hữu ích khi người dùng truy cập các tính năng cụ thể trên màn hình. Cách đơn giản nhất để giải quyết vấn đề này là biến biến thành `null` ban đầu và khởi tạo giá trị khi người dùng truy cập tính năng này. Nhưng sau đó chúng ta phải sử dụng kiểm tra `null` mỗi lần chúng tôi truy cập vào biến.
Chúng ta có thể làm tốt hơn thế, và chúng ta có thể làm theo hai cách, một là khai báo` lateinit var` khởi tạo khi được yêu cầu. Một cách khác là` lazy initialization`

Nhớ lại một chút về` property delegation` mà ta đã thảo luận ở trên? Ở đây chúng ta khởi tạo biến theo kiểu lazy bằng cách sử dụng các `delegate` của Kotlin. Đối với điều này, trước tiên chúng ta cần tạo một `delegate` có thể được sử dụng ở bất cứ đâu trong suốt dự án, như ví dụ sau :
```kotlin 
class LazyInitialization(val functionforvalur : () -> Boolean){
    var valueHolder : Boolean? = null
    operator fun getValue(thisRef: Any?,property: KProperty<*>) : Boolean{
        valueHolder?.let {
            valueHolder = functionforvalur()
        }
        return valueHolder!!
    }
    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: Boolean) {
        println("$value has been assigned to '${property.name}' in $thisRef.")
    }
}
```
Delegates đã làm gì ở đây ? Nếu như `valueHolder` là null và chỉ là null lần đầu tiên,  nó sẽ gọi `higher-order function` mà truyền qua `constructor`, gán giá trị kết quả cho `valueHolder` và reuturn lại chính nó.
Và đây là kết quả :
```kotlin
var status : Boolean by LazyInitialization{expensiveOperationsTogetValue()}
```
## 6. Inner Sealed classes
Quản lý trạng thái là một trong những điều quan trọng trong phát triển di động, đặc biệt là trong Android khi chúng ta phải làm những việc khác nhau cho các trạng thái khác nhau. Ví dụ: khi chúng ta thực hiện kết nối api , kết quả có thể là `Success` hoặc `Error`

Và trong Kotlin, sealed class có thể giải quyết nó:
```kotlin
sealed class Result {
    class Sucess : Result()
    class Error : Result()
}
```
Vậy thì điều gì xảy ra nếu có hai lỗi khác nhau, như lỗi không xác định và lỗi cục bộ? Và nếu hành động cũng khác nhau, như khi xảy ra lỗi máy chủ và ta muốn hiển thị hộp thoại cảnh báo. Khi xảy ra lỗi cục bộ, ta chỉ muốn hiển thị `Toast`. Đây là nơi các i`nner sealed class` ra đời để cung cấp một cấu trúc ngắn gọn và rõ ràng hơn:
```kotlin
sealed class Result {
    class Sucess : Result()
    sealed class ErrorType : Result() {
        class remoteError : ErrorType()
        class localError : ErrorType()
    }
}
```
Và khi xử lý thì nó sẽ như sau:
```kotlin
fun dataClasification(result: Result){
    when(result){
        is Result.Sucess ->{
            updateUI()
        }
        is Result.ErrorType.localError ->{
            showToast()
        }
        is Result.ErrorType.remoteError ->{
            showDialog()
        }
    }
}
```
 Bài viết được dịch từ trang [Medium](https://medium.com/better-programming/advanced-programming-in-kotlin-2e01fbc39134) và có thêm chút xàm xí của mình nữa. Có gì sai xót mong mọi người góp ý .
 Các bạn có thể xem qua các bài viết khác trong seri này nhé : https://viblo.asia/s/kotlin-cac-tinh-nang-doc-quyen-ma-ban-nen-su-dung-P0lPmrXv5ox