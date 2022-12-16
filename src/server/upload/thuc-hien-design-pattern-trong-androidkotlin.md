# I, Lời mở đầu
* Bạn đã tự hỏi: **cái gì quyết định đến chất lượng code của mình chưa** ?
* Tất cả mọi thứ từ coding convention, code structure...là những thứ giúp bạn tạo ra những dòng ngắn gọn, sạch đẹp và chính xác.
* [Coding convention](https://kotlinlang.org/docs/reference/coding-conventions.html) là thứ mà các developer thường không quan tâm nhưng lại rất quan trọng. Coding convention giúp các developer viết code theo đúng quy chuẩn của một ngôn ngữ. Nó có thể bao hàm các tác vụ như: formatting, comment, suggestion...
* Hãy thử tưởng tượng 1 tuần hay 1 tháng, bạn đọc lại code của chính mình hay đồng nghiệp đọc code của bạn. Thậm chí bạn có thể không thể nhớ tại sao mình lại viết đoạn code này hay sao đoạn code này lung tung thế ?
* Bài viết này mình sẽ không nói về coding convention mà 1 thứ khác cũng rất đáng nói đến đó chình là **design pattern**.
* Android cũng đã cung cấp các công cụ (Jetpack, di, coroutine...) giúp các developer thực hiện Architecture component. Awesome !!!
* Để code của bạn trở nên chuyên nghiệp, dễ hiểu và ngắn gọn, mình khuyên mọi người nên áp dụng cả design pattern vào trong code của mình.
* **Note**: không có sự bắt buộc nào trong việc bạn có sử dụng design pattern hay không. 
# II, Design pattern là gì
* [Design pattern](https://en.wikipedia.org/wiki/Software_design_pattern) là một giải pháp chung để giải quyết những vấn đề thông thường trong một số trường hợp nhất định.
* Những lợi ích của việc sử dụng design pattern:
    * **Code dễ hiểu**: bởi vì bạn theo những guildline, quy tắc chuẩn nên các developer khác khi đọc code sẽ dễ dàng hiểu được bạn đang làm gì. *Ví dụ*: khi bạn sử dụng singleton pattern, mọi người sẽ hiểu bạn muốn tạo ra 1 instance duy nhất trong ứng dụng của mình.
    * **Code dễ dàng tái sử dụng**: Bạn có thể thực hiện 1 task vụ nhiều lần, áp dụng design pattern bạn sẽ giảm được việc lặp đi lặp lại đoạn code của minh.
    * **Code sạch hơn**: design pattern làm cho code của bạn trở nên ngắn gọn và module hoá hơn.
* Trong software design, chúng ta có thể chia design pattern ra làm 3 nhóm:
    * Creational pattern.
    * Structural pattern.
    * Behavior pattern.
* Phần đầu tiên, mình sẽ giới thiệu nhóm đầu tiên và cũng phổ biến nhất: **creational pattern**.

# III, Creational pattern
* [Creational pattern](https://en.wikipedia.org/wiki/Software_design_pattern#Creational_patterns) được sử dụng để tạo những object mà không đòi hỏi bạn phải show ra logic hay các step để tạo ra object đó.
* Do đó, mỗi lần bạn tạo ra 1 đối tượng, bạn không cần phải khởi tạo đối tượng thông qua việc sử dụng new operator nữa.
* Mỗi ngôn ngữ hay system áp dụng design pattern một cách khác nhau. 
* Nhóm creational có rất nhiều cách implement tuỳ thuộc vào tình huống. 
* Mình sẽ đưa ra 3 pattern phổ biến nhát implement creational pattern: singleton pattern, dependency injection pattern và builder pattern.
## 1, Singleton pattern
* Singleton pattern được sử dụng khi bạn muốn thực hiện 1 nhóm các tác vụ một lần.
* Do đó trong ứng dụng chỉ có một instance được tạo ra và nó gắn với vòng đời của ứng dụng.
* Singleton pattern thường được sử dụng trong các trường hợp: logging, database creation, thread pool...
* **Ví dụ**: Với mỗi database, bạn chỉ cần tạo ra 1 Room instance duy nhất trong toàn bộ ứng dụng.
* Singleton pattern rất được ưu ái, được Kotlin hỗ trợ việc implement thông qua việc sử dụng **object class** và **companion object class**.
* Trong kotlin, object class và companion object có một số đặc điểm đáng chú ý sau:
    * Không có contructor method.
    * Có thể có init{}, variables và functions.
    * Có thể extend 1 class khác nhưng không thể để class khác kế thừa.
* **Ví dụ**:

![](https://images.viblo.asia/d3460483-6ae7-4713-8ea4-049feeb08dbe.png)
* Do companion object và object class không cho phép tạo constructor, do đó chúng ta không thể truyền tham số vào trong chúng. 
* Trong trường hợp, bạn muốn tạo 1 class implement singletion pattern và có constructor. Bạn hãy làm theo ví dụ sau:

![](https://images.viblo.asia/3b160178-6a61-4324-86fb-7eb093e0d91f.png)

* Ví dụ trên tạo ra 1 single instance Room database tồn tại trong suốt ứng dụng của bạn.
* Để có đảm bảo INSTANCE là duy nhất (kể cả trên các thread khác nhau), bạn phải sử dụng [@Volatile](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.jvm/-volatile/).
* Để không có bất kì ảnh hưởng nào trong quá trình tạo instance, bạn phải sử dụng [synchronized()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/synchronized.html).
## 2, Dependency injection pattern
* Chúng ta đều biết rằng hầu hết các class đều cần đến các dependency.
* Nếu không thực hiện denpendecy injection pattern, thông thường chúng ta sẽ hard-code và khởi tạo dependency trong chính class đó.
* Vấn đề là bạn đã sử dụng việc đó quá nhiều lần rồi sau đó lại muốn thay đổi dependecy đó bằng dependency khác, bạn sẽ phải thay thế ở tất cả mọi nơi có khai báo đó.

![](https://images.viblo.asia/69e6f1ab-21fc-4e25-920b-1b3ea49c775a.png)

* Do đó chúng ta không nên khởi tạo trực tiếp dependency ở trong 1 class mà hãy cung cấp nó từ bên ngoài.

![](https://images.viblo.asia/87db2360-f6be-4a93-af11-2e2322e8faea.png)

* Google hỗ trợ chúng ta thực hiện dependecy injection pattern cách sử dụng [dagger](https://developer.android.com/training/dependency-injection/dagger-basics), [hilt](https://developer.android.com/training/dependency-injection/hilt-android)...
## 3, Builder pattern
* Trong một tác vụ, đôi khi bạn chỉ quan tâm đến một số dữ liệu đầu vào và không quan tâm phần còn lại (có thì càng tốt :grinning:). Trong trường hợp như vậy bạn nên cân nhắc tới việc sử dụng **builder pattern**.
* **Ví dụ**: bạn cần mua 1 cái laptop, trong laptop có nhiều bộ phận nhưng bạn chỉ quan tâm tới: processor. Những bộ phận khác như ram, battery, screen bạn không quan tâm đến. Sau đó, người bán hàng sẽ đưa ra cho bạn mẫu laptop thoả mãn yêu cầu của bạn.
* Trong lập trình cũng thế, bạn tạo 1 class có nhiều variable, trong đó 1 số tham số là quan trọng và một số khác không quan trọng, hãy cân nhắc tới việc sử dụng builder pattern.
* Khi bạn thực hiện builder pattern, nó không yêu cầu bạn thực hiện tất cả các method và bạn cũng không cần quan tâm đến thứ tự của các method set.
* **Ví dụ**: mình sẽ tạo ra 1 class Laptop theo yêu cầu ở ví dụ trước đưa ra:

![](https://images.viblo.asia/1c7a62e0-04a2-441b-8617-0ea3d04be72b.png)

* Khi bạn muốn tạo ra 1 instance của Laptop class:

![](https://images.viblo.asia/5c0d433e-645f-4da8-9818-1efbd6e141c5.png)

* Android cũng có rất nhiều class được implement theo builder pattern như AlertDialog...
# IV, Tổng kết
* Bạn không cần vội vã học các thứ kiến thức cao siêu đâu. Những thứ căn bản sẽ giúp bạn trở nên tốt hơn đó.
* Trong lập trình cũng thế, nó đòi hỏi sự tỉ mỉ, kiên trì và sáng tạo nên đi chậm mà chắc nhé sau đó tăng tốc nhé.
* Qua bài này, chúng ta lại có 1 công cụ mới để kết hợp đó là Architecture component + design pattern.
* Cảm ơn các bạn đã dành thời gian quý báu để đọc bài viết của mình :laughing::laughing::laughing:.
* Hẹn mọi người vào bài chia sẻ sau nhé !!!