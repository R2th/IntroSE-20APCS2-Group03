Bài viết cũng đồng thời được đăng tại blog **Code cùng Trung** của mình

Các bạn ngó qua nhé: [Kotlin và Java: kế thừa và phát triển](https://codecungtrung.com/kotlin/kotlin-va-java/) :D

Now let's go !!!

Bạn đang dùng ngôn ngữ gì để code cho native app Android / ứng dụng web?

“Vâng tôi dùng Java, sao thế ?? “

Hẳn bạn cũng từng được hỏi câu hỏi đó và câu trả lời của bạn là Java. Bao năm qua code native app / ứng dụng web vẫn bằng Java mà, nhiều người code Java cho Android / ứng dụng web, cty họ tuyển cũng người biết code Java , …

<img src="https://uploads-ssl.webflow.com/5c486ea64aa6f81b63559b08/5d10726e0d9cdd295967c2e6_Most%20wanted%20programming%20languages.png"/>

Nhưng đó là câu chuyện của … vài năm trước rồi, giờ có một ngôn ngữ mới, đang được kì vọng có thể thay thế được Java (vâng mình đang nói là “thay thế”), đó chính là Kotlin – được giới thiệu bởi Google vào năm 2017.

Kotlin đang lên và đứng thứ 2 trong những ngôn ngữ được yêu thích luôn
Code ngắn hơn, nhiều cái mới, check lỗi Null thần thánh, …

Sau đây chúng ta sẽ đi vào chi tiết hơn nhé

## I. Kotlin là cái chi ?
Kotlin là một ngôn ngữ lập trình đa nền tảng, statically–typed (kiểu dữ liệu được xác định lúc compile-time ) dựa trên … Java Virtual Machine (JVM), nhưng bạn cũng có thể compile nó sang JavaScript hoặc build code để chạy trên iOS. (Vi diệu ghê : )) )

Kotlin học hỏi nhiều từ những ngôn ngữ khác hiện nay, là tập hợp của những cái hay, cái mới nhất của những ngôn ngữ đó: như python, swift, javascript, …

<img src="https://d540vms5r2s2d.cloudfront.net/mad/uploads/mad_blog_5cd2cb2ac6f931557318442.png"/>

Kotlin được thiết kế để tương tác hoàn toàn với Java và phiên bản JVM của thư viện chuẩn của nó phụ thuộc vào thư viện của Java.

Nó được phát triển bởi Jetbrains, bắt đầu từ năm 2010. Và đã được Google thông báo là **“Android official language”** vào … Google I/O năm 2017.

Wow ! **“Android official language“**, tại sao lại vậy nhỉ ?

Java đang dùng tốt, rất nhiều người dùng mà. Đã ra lâu nữa nên cộng đồng lớn, support nhiều hơn, mà chắc hẳn làm được nhiều thứ hơn Kotlin nữa – nó mới ra mà. Và còn nhiều câu hỏi khác các bạn có thể đặt ra nữa 😀

<img src="https://habrastorage.org/webt/8v/uk/rm/8vukrmsn8fklzgyhtgdmwv9ipsq.jpeg"/>

Đương nhiên có cái hay, cái mới thì Google mới công bố nó là “Android official language” rồi. Sang phần tiếp chúng ta sẽ tìm hiểu rõ hơn nhé. Let’s go !!!

## II. Java vs Kotlin

### 1. Java và những tồn tại

Học Java từ những năm đại học, thật sự mình khá thích nó – hơn C, C++ nhiều:

- Dễ hiểu về cú pháp, code được nhiều thứ (mình đã từng dùng nó để code server cho đồ án – tính dùng pHp nhưng thôi). Những bạn mới học lập trình thấy cũng nên chọn nó làm ngôn ngữ đầu tiên để học.
- Code Android bằng Java tương thích rất tốt, rất ít lỗi linh tinh.
- Cộng đồng lớn nên hỏi được nhiều, nhiều hướng dẫn, lib trên mạng bằng java nên clone về là chiến được ngay. (tuổi đời Java đã lên tới 24 năm rồi đó)
- Nhiều người sử dụng, cty họ cũng tuyển Java Android nhiều nên ok, mình học thôi.

Tuy nhiên một số điều mình thấy còn tồn tại, chưa hay là:

- Code Java thật sự … dài, nhiều lúc rất rất dài. Chính vì để cho dễ hiểu, nên cần phải dùng “nhiều hơn” … để thể hiện. Học Kotlin được một thời gian, so sánh đoạn code đó trong Java thì những gì Kotlin làm được thật đáng nể.
- NullPointerException – “one billion dollar mistake” – hẳn bạn đã gặp. Bạn quên check null và bùm, lỗi crash 🙁 Mà quên là chuyện … rất bình thường 😀 Tuy nhiên kotlin sẽ xử lý cho bạn những điều này.
<img src="http://sd.keepcalm-o-matic.co.uk/i/keep-calm-and-nullpointerexception.png"/>
- Dấu “;” ở cuối mỗi câu lệnh: nhiều lúc các bạn cũng hay quên phải không ? Các bạn có thấy … khó chịu cứ mỗi khi kết thúc câu lệnh lại phải “;” không ? Tại sao phải cần trong khi python, swift, … lại không cần ????
- Raw type: Java cho phép ta viết kiểu này

```
List names = new ArrayList(); // warning: raw type!
names.add("John");
names.add("Mary");
names.add(Boolean.FALSE);
```
Và khi code như sau sẽ lỗi
```
for (Object o : names) {
    String name = (String) o;
    System.out.println(name);
} // throws ClassCastException!
  //    java.lang.Boolean cannot be cast to java.lang.String
  ```
Các bạn có gặp những điều trên không ? Còn gặp những điều gì nữa ? Share lại với mình nhé 😀

### 2. Kotlin – làn gió mới

Và giờ, “It show time” cho Kotlin. Những điểm hay, cực hay của Kotlin là:

#### a. Sự tương thích
Một trong những lợi thế của Kotlin là nó tương thích với Java. Nghĩa là có thể code Java và Kotlin trong cùng một project. Và cũng có thể gọi qua lại method giữa class viết bằng Java và Kotlin.

#### b. Kotlin ngắn gọn hơn Java
Đây là một trong những … lợi ích lớn nhất của Kotlin so với Java. Bạn có thể làm được những thứ như bên Java… nhưng với lượng code ít, ít hơn nhiều.

Một ví dụ trong Kotlin

class bên Java + hàm khởi tạo + get/set cho các thuộc tính + toString() + hashcode() + equals() + copy() = data class bên Kotlin (What ??? How ???)

Và bạn thấy chỉ mất … duy nhất một dòng code

<img src="https://miro.medium.com/max/1024/1*Cg3gH2WYnat6nxZdkmbYYw.png"/>

Một ví dụ khác. Các bạn sẽ thấy code gọn hơn nhiều, loại bỏ được những thứ cứ lặp đi lặp lại. Mình đang sử dụng … scope function trong Kotlin

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/kotlin-vs-java-1024x223.jpg"/>

#### c. Nhiều điều mới

Kotlin mang tới nhiều tính năng mới như extension functions, smart cast … và đặc biệt là **lập trình hàm**.

Mình sẽ nói về một số cái mới này

- Extension function: giúp bạn thêm chức năng cho một class mà không cần … kế thừa lại class đó. Ví dụ đó là những class của third-party library, của android và dĩ nhiên bạn không thể sửa trực tiếp chúng được.
Xét ví dụ sau:
```
//  Extension function.  Ý nghĩa của hàm nó là để lấy từ đầu tiên của câu  
fun String.getFirstWordOfSentences(): String = this.split(" ").get(0) 

// Khai báo biến tên  testSentences, giá trị là chuỗi "Kotlin is so cool"   
var testSentences = "Kotlin is so cool"

testSentences.getFirstWordOfSentences() // Kết quả là “Kotlin”
```
Bạn thấy đấy, String là class của hệ thống và dĩ nhiên không sửa trực tiếp nó được. Và wow, nhờ extension function ta có thể.

Còn nhiều cái khác bạn có thể nghịch thêm như
```
// Tính tổng tất các số lẻ trong list
fun ArrayList<Int>.sumOfAllOddNumber(): Int {
    var sum = 0
// đoạn này hiểu là chạy từng phần tử của list,
// check nếu lẻ thì cộng vào biến sum ở trên
    this.forEach {
        if (it % 2 == 1) sum += it
    }
    return sum
}

// Lấy text từ EditText và xử lý tiếp
// Dùng when, bạn có thể hiểu nó như switch trong java
fun EditText.showExpression() =
        when (this.text.toString()) {
            "Java" -> "Old"
            "Kotlin" -> "New"
            else -> "No idea"
        }
 ```
- Lập trình hàm:
Bạn biết tới Lambda expression trong Java 8 ?? Đó là một phần của lập trình hàm đó.

Kotlin còn hỗ trợ rất nhiều cho lập trình hàm, chúng là:

- Higher-order function
- Anonymous functions
Và rất nhiều thứ khác.

Đặc biệt với Collection trong Kotlin, lập trình hàm rất mạnh, có rất nhiều phương thức bạn có thể sử dụng như filter (lọc theo điều kiện), map (biến đổi một collection cũ thành mới), find (tìm kiếm trong collection), takeIf (lấy nếu thỏa mãn điều kiện), … Giúp cho việc tương tác với collection trở nên dễ dàng hơn.

#### d. Code an toàn hơn
Mình hay gặp lỗi NullPointerException trong Java – rất hay bị gặp. Nếu không gặp thì cũng thường xuyên phải … check null cho biến và mình cũng hay quên luôn : ))

Kotlin xử lý điều này rất tốt bằng cách

#### 1.Bạn khai báo biến như thường bên Java nhưng ko được, báo lỗi

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/null-768x71.jpg"/>

Các gợi ý để sửa sẽ là như sau. Chúng sẽ giúp bạn dễ tránh lỗi NullPointerException hơn

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/kotlin-fix-null.jpg"/>


#### 2. Hỗ trợ check null tận răng luôn

Một bên báo lỗi, một bên không, tại sao ???

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/in-code-check-1-1024x165.jpg"/>;

Đi sâu hơn vào lỗi bên Kotlin


Thông báo gì đó ???
” Thông báo gì vậy trời ??? “

Trả lời: Thông báo gì ư ? Do biến data có … khả năng bị null, nên Kotlin sẽ báo lỗi cho đoạn này. Bạn phải sửa như trong thông báo thì mới code được.

Sửa như trong thông báo, còn mấy chỗ nữa cũng bị này, sửa tiếp thôi

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/kotlin-check-1.jpg"/>


Sửa hết là có thể chạy ok 😀 (Chắc vậy :)) )

Tuy nhiên bạn có tự hỏi nếu không sửa, hoặc quên không sửa mà nhấn “Run” thì có sao không ?? Câu trả lời là rất sao nhé 😀

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/kotlin-check-2.png"/>

Đó Kotlin xử lý rất tốt cho lỗi null, phát hiện lỗi ở … compile-time luôn chứ không cần đợi đến lúc ứng dụng chạy và lỗi crash xảy ra.

#### e. Đa nền tảng
Kotlin có thể được dễ dàng … compile sang nhiều nền tảng khác như Android, Ios, JVM, JavaScript, Linux, Window. Sử dụng framework “Kotlin Multiplatform“, bạn có thể extract code ra những nền tảng trên cùng lúc 😀

Ý tưởng của phần này là có những phương thức, module, … muốn dùng chung giữa các nền tảng – **“sharing code between platforms“.**

Dùng chung nghĩa là bạn sẽ không phải viết lại nữa. Viết ở một nơi và dùng được trên các nền tảng khác. Do đó bạn sẽ tiết kiệm được thời gian để tập trung vào những module quan trọng khác.

<img src="https://miro.medium.com/proxy/0*KfJfAH1kBOyFAk2c"/>

Common code – build ra các nền tảng khác nhau
Concept này bạn có thể đã thấy nhiều hiện nay như Flutter, React Native và nhiều cái trước đó như: **Cordova, PhoneGap, Kony, Titanium**

Nghe hay phải không nào các bạn 😀

Tuy nhiên một số điểm mình vẫn nên lưu ý là

- Kotlin Multiplatform hiện tại ở Kotlin 1.3 vẫn là bản thử nghiệm. Và bạn biết đấy, thử nghiệm thì có thể thay đổi bất cứ lúc nào mà không cần cảnh báo gì.
- Ít thư viện đa nền tảng: một ngôn ngữ có rất nhiều thư viện đi kèm. Tuy nhiên giờ có rất ít thư viện đa nền tảng. Và người viết thư viện có thể bỏ qua một số nền tảng nhất định.
- Mỗi nền tảng vẫn là khác nhau: có những đoạn code bằng Kotlin dùng chung giữa các nền tảng. Tuy nhiên bạn vẫn cần những kiến thức riêng ở mỗi ngôn ngữ thì mới có thể thực sự code được “Kotlin Multiplatform”. Đơn giản nhất là giao diện vẫn phải code riêng :((
Mong rằng tương lai “Kotlin Multiplatform” sẽ thành chính thức, phổ biến và mạnh mẽ hơn.

## Tóm lại
Kotlin ư ? Với những lợi ích như trên, tại sao lại không thử cơ chứ ? Nhiều cty cũng bắt đầu code Kotlin rồi, nhiều người bắt đầu code bằng Kotlin, cộng đồng Kotlin đang phát triển mạnh.

Làn gió mới Kotlin – hãy thử ngay thôi nào 😀

----------------
Bài viết cũng đồng thời được đăng tại blog **Code cùng Trung** của mình

Các bạn ngó qua nhé: [Kotlin và Java: kế thừa và phát triển](https://codecungtrung.com/kotlin/kotlin-va-java/) :D


Tham khảo

- https://www.promptbytes.com/blog/java-vs-kotlin-the-no-nonsense-comparison-of-android-programming-languages
- https://medium.com/netguru/kotlin-vs-java-which-one-you-should-choose-for-your-next-android-app-1d08c4d3a22f
- https://medium.com/netguru/kotlin-vs-java-which-one-you-should-choose-for-your-next-android-app-1d08c4d3a22f
- https://kotlinlang.org/docs/reference/comparison-to-java.html
- https://medium.com/@snrawoof93/java-vs-kotlin-android-development-7550660dc2b0