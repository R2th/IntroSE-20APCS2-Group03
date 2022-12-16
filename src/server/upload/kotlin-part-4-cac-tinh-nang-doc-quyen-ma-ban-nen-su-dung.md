Với các tính năng thú vị và cú pháp tuyêt vời  của Kotlin, bạn dễ dàng bị lạc trong mê cung tính năng của Kotlin và trong quá trình sử dụng chúng thì ta lại vô tình dùng nó một cách vô chủ đích mà không biết thực sự nó có tác dụng gì (đó có thể không phải là một sai lầm, nhưng chắc chắn đó sẽ không phải là đoạn code lý tưởng). Điều này có thể dẫn đến team của bạn gặp vấn đề nghiêm trọng trong thời gian dài. Vì vậy, trong bài viết này, bạn sẽ tìm hiểu cách sử dụng các tính năng độc quyền của Kotlin theo cách tốt hơn.

Có thể các bạn sẽ thắc mắc là các bài viết trước của mình thì khuyên nên dùng nọ kia , mà bài viết này lại khuyên không nên này nọ.  Hãy tìm hiểu xem thế nào nhé

# Scope Functions
Các scope function trong Kotlin là một tính năng siêu hấp dẫn - bạn có thể sử dụng chúng để lập trình function cho code của mình. Chúng cũng hữu ích trong các tình huống như `let` kiểm tra null ,  `apply` trong `viewholder`  và hơn thế nữa. Mình sẽ không nói về việc nên sử dụng một scope functions nào cả mà sẽ nói về việc không nên sử dụng chúng. 

Hãy lấy một đoạn mã mà chúng ta không sử dụng bất kỳ "style" lạ  nào của Kotlin cả 
```kotlin
fun ricksPartPlan(){
    val Cathy = HelpCrewMember("Cathy Marshell",
            true, "Delores")
    
    val partyDetails = PartyDetails(partyAt = "Vegas",
            partyBy = "Rick Grims",
            coHostedBy = "RobinSon")
    partyDetails.crew.add(Cathy)
    partyDetails.crew.add(Viv)
    partyDetails.crew.add(Betty)
    val arrayGuest : ArrayList<Guest> = ArrayList()
    arrayGuest.add(Guest("Klaus Mikelson", true, true))
    arrayGuest.add(Guest("Freya", false, false))
    arrayGuest.add(Guest("John Snow", true, false))
    arrayGuest.add(Guest("Ragnarok", false, true))
    arrayGuest.add(Guest("Meridith", true, true))
}
```
Trông có vẻ ổn- có thể điều gì đó giống như chúng ta đã làm trong Java những năm trước với tất cả các code và nội dung lặp đi lặp lại. Hãy thử làm lại nó  với Kotlin xem thế nào nha :
```kotlin
fun ricksPartPlanOverKotliny(){

        val partyDetails = PartyDetails(partyAt = "Vegas",
                partyBy = "Rick Grims",
                coHostedBy = "RobinSon").apply {

            crew.apply {
                add(HelpCrewMember("Cathy Marshell",
                        true, "Delores"))
                add(Viv)
                add(Betty)
            }.also {
                it.forEachIndexed { index, helpCrewMember -> println(helpCrewMember.name) }
            }

            guests.apply {
                add(Guest("Klaus Mikelson", true, true))
                add(Guest("Freya", false, false))
                add(Guest("John Snow", true, false))
                add(Guest("Ragnarok", false, true))
                add(Guest("Meridith", true, true))
            }.also {
                it.forEachIndexed { index, guests -> println(guests.name) }
            }
        }
    }
```
Luôn là tốt đằng sau việc viết các đoạn code này, như xác định mọi thứ và giảm thiểu boilerplate. Nhưng  nesting  scope function không phải là một trong guide-line của Kotlin. 
Sử dụng scope function giúp code gọn gàng cũng như chuẩn theo style kotlin . Tuy nhiên chúng ta cũng cần kiểm soát việc sử dụng nó. Không phải mọi thứ đều dùng scope function. Vô hình chung sẽ làm cho code trở nên khó hiểu , khó self-explain. Mình từng check pull 1 bạn code rất khá , base kotlin rất tốt nhưng việc bạn đó lạm dụng scope function khiến code khá khó hiểu và lòng vòng. Nó không như Hải Phòng các bạn ạ

Thử viết gọn lại đoạn code phía trên nhé :
```kotlin
fun ricksPartPlanKotline(){

        val partyDetails = PartyDetails(partyAt = "Vegas",
                partyBy = "Rick Grims",
                coHostedBy = "RobinSon")

        partyDetails.crew = getCrew().apply {
            add(HelpCrewMember("Cathy Marshell",
                    true, "Delores"))
            add(Viv)
            add(Betty)
        }

        partyDetails.guests.apply {
                add(Guest("Klaus Mikelson", true, true))
                add(Guest("Freya", false, false))
                add(Guest("John Snow", true, false))
                add(Guest("Ragnarok", false, true))
                add(Guest("Meridith", true, true))
            }
    }
```
Đây có thể không phải là đoạn code ngắn gọn nhất, nhưng theo ý kiến của mình, đó là cách tốt nhất hiện tại mà không cần lồng bất k scope functions nào cả. Viết code bằng Kotlin không có nghĩa là bạn phải sử dụng các tính năng của Kotlin mọi lúc mọi nơi. 
Đừng lạm dụng cái gì đó thái quá . Đơn giản dễ hiểu  mà vẫn đúng mới luôn là cái nên hướng tới 
# Extension Functions thật là tuyệt vời, nhưng cũng đừng lạm dụng nó 
Extension functions trong Kotlin thật là `cool` khi mình lần đầu tiên dùng chúng trong một một project cá nhân - có thể viết code theo style riêng của mình

![](https://miro.medium.com/max/700/0*JFhDQrHlekRxuGez.png)

Nhìn vào biểu đồ ta có thể thấy là extension function là một trong những tính năng hay ho nhất của Kotlin và cũng được ưa dùng nhất. Nhưng có thứ khiến ta nên xem xét việc dùng chúng một cách hợp lý hơn .

> Kotlin provides the ability to extend a class with new functionality without having to inherit from the class or use design patterns. Such functions are available for calling in the usual way as if they were methods of the original class. This mechanism is called extension functions.”
> — Creators of Kotlin

Kotlin cung cấp khả năng mở rộng một lớp với chức năng mới mà không cần phải kế thừa từ lớp hoặc sử dụng các mẫu thiết kế. Các hàm như vậy có sẵn để gọi theo cách thông thường như thể chúng là các phương thức của lớp gốc. Cơ chế này được gọi là.....

Hóa ra các extension functions không nhằm mục đích chỉnh sửa cú pháp  (không có nghĩa là làm vậy là sai), nhưng mục đích chính là triển khai chức năng bổ sung trên một lớp để triển khai các tính năng mà không cần tạo một lớp mới.
Vẫn có vẻ hơi mơ hồ nhỉ .Tìm hiểu sâu các ví dụ này đẻ có cái nhìn cụ thể hơn nhé.

Hãy tưởng tượng bạn viết một project mà toàn dùng extension function . Render ảnh ra màn hình, render text ra màn hình, . .. Ok không sao nhưng khi thực hiện các công việc background  như loading  và caching thì căng đó . Vậy thì logic và state sẽ nếu lưu trữ ở đâu khi mọi thứ đều chỉ là một extension function. Thay vào việc tạo các lớp mới và khái niệm mới, chúng ta lại tạo ra extension functionns. Toang rồi .

We don’t do this ❌

Chúng ta không sử dụng các hàm tiện ích mở rộng cho các phương thức không liên quan. Ví dụ: ví dụ dưới đây không phải là một phần của API . Đây là chức năng không liên quan đến lớp `String` và không nên được cung cấp dưới dạng extension  vì nó đặc trưng cho business logic .
```kotlin
fun String.toUserProperties() : UserProperties {
    return UserProperties(this.toUppercase())
}
```
Trong trường hợp này, chúng ta không muốn tạo extension functions và chỉ sử dụng hàm tạo của lớp `UserProperties` để có được chức năng này. Một điều cần nhớ là chức năng này là public cho toàn bộ dự án của bạn (nếu nó không được private), đây cũng là một lý do lớn để không tạo một extension fucntion.

We do this ✅

Chúng ta sẽ dùng các extension functions nếu như chức năng đó liên quan đến class mà ta định mở rộng 

Ví dụ: method này hoàn toàn có thể là một phần của API chuỗi vì nó liên quan đến thao tác chuỗi : 
```kotlin
fun String.toGraphemeCharsList(): List<String> {
    // do something to get list of grapheme characters
}
```
Túm cái váy lại thì : Chúng ta sử dụng các extension functions trên các lớp không thể mở rộng ( tức là các lớp là một phần framework hoặc dữ liệu nguyên thủy). Chúng ta cũng tạo private extension functions và chỉ sử dụng chúng trong file chúng đã được tạo .
Hãy nhớ đừng lạm dụng cái gì quá cả. Không có gì là hoàn hảo hoàn toàn nhé .

Bài viết cũng đủ dài rồi. Mình xin kết tại đây . 
Bài viết được mình dịch từ  [Medium](https://medium.com/better-programming/advanced-android-programing-in-kotlin-part-4-187b88fea048#:~:text=Extension%20Functions%20Are%20Awesome%2C%20But%20Don't%20Overextend%20Them&text=%E2%80%9CKotlin%20provides%20the%20ability%20to,class%20or%20use%20design%20patterns.&text=This%20mechanism%20is%20called%20extension%20functions.%E2%80%9D) ,[đây  nữa ](https://medium.com/over-engineering/lessons-learnt-with-kotlin-extension-functions-9405789365a9) và cũng thêm bớt 1 số quan điểm cá nhân của bản thân. Rất mong nhận được ý kiến đóng góp của các bạn. Xin cảm ơn.

Các bạn cũng có thể xem lại các bài viết khác trong series này nhé https://viblo.asia/s/kotlin-cac-tinh-nang-doc-quyen-ma-ban-nen-su-dung-P0lPmrXv5ox