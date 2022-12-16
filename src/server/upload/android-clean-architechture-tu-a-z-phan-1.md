## **Clean Architechture.**
### Mục lục:
1. Một câu chuyện trong quá khứ của mình.
2. Giới thiệu tổng quát về Clean Architechture.
3. Android implements Clean Architechture như thế nào?
4. Áp dụng Clean Architechture vào 1 một ứng dụng Android cụ thể.
5. Ưu nhược điểm, so sánh nó với MVVM, MVP.

### 1. Một câu chuyện trong quá khứ của mình.
Nhớ lại thời điểm cách đây 1 năm, mình sẽ tự cho mình cái danh xưng là GOD. Vì sao ư? Vì mình đang dev mọi ứng dụng theo kiểu “GOD Activity” tức là một activity sẽ làm hết mọi việc của thiên hạ từ logic, call api, catch data db local… (và mình nghĩ bất kể ai trong chúng ta khi mới bắt đầu học Android cũng từng là GOD như vậy :smile:). Sau đó mình suy nghĩ nếu cứ code theo kiểu chạy được như vậy thì mình với những người được gọi là Senior cũng không khác nhau là mấy vì cả hai cùng code cho ứng dụng chạy được. Tình cờ trong lúc đó mình lên Reddit và lướt thấy 1 người đặt câu hỏi như vậy:

_ “Tôi đang là Junior, tôi muốn trở thành một Senior thì tôi cần học thêm RxJava hay Dagger“


Mình cũng không hiểu sao người này có thể tự xác định được level của họ là ở Junior nữa :sunglasses:. Nhưng có một comment trong bài post đó mà mãi đến giờ mình vẫn không quên và chính comment đó đã thay đổi mình (một điều đặc biệt đây là một comment của người Việt Nam):

_ “None of them matters, you are an engineer, learn the Architechture first“.


Khi xây dựng một ngôi nhà điều quan trọng là kiến trúc của ngôi nhà chứ không phải xây cái cột nhà dùng loại cát nào, hay loại xi-măng nào. Một ứng dụng Android cũng vậy, cái quan trọng nhất là kiến trúc của nó còn những cái như RxJava hay Dagger bản chất nó cũng như là loại xi-măng hay cát trong việc xây nhà, nó giống như những plugin mà ta chỉ việc inject vào cái Architechture. Không dùng Dagger thì ta dùng Koin thay thế, không dùng RxJava thì có thể dùng Coroutines. Bất kể một ứng dụng Android dù lớn hay nhỏ cũng đều cần Architechture bởi một điều đơn giản Architechture giúp cho ứng dụng của chúng ta dễ “Extend“, “Maintain“, “Unit-Test“. Và hôm nay mình xin giới thiệu 1 Architechture trong Android mà thoả mãn tất cả những điều kiện trên đó là Clean Architechture.

### 2. Giới thiệu về Clean Architechture.
_ Clean Architechture là mô hình kiến trúc phân tầng ứng dụng. Ứng dụng sẽ được chia thành các layer riêng biệt (đây là lý thuyết dịch ra vậy với mình thì nó chỉ là cái để đọc cho vui và cực kỳ khó hiểu :joy:). Dưới đây là một hình vẽ về Clean Architechture 1 cách tổng quát nhất mà bất kì tài liệu nào cũng sẽ đưa vào khi nói về Clean Architechture – đó là 4 vòng tròn đồng tâm. Mình sẽ giải thích theo cách mình hiểu mà không bám theo bất kì một tài liệu trên mạng nào mà mình đã từng đọc trước đây. Lứu ý đây là hình vẽ về Clean Architechture tổng quát (nó dùng áp dụng cho cả những nền tảng khác không chỉ riêng Android) không phải hình vẽ để áp dụng cho Android nên mình chỉ nói một cách bao quát nhất. Còn về phần Clean Architechture được Android implement như thế nào mình sẽ trình bày chi tiết ở phần sau.

![](https://images.viblo.asia/66d789b0-dcb2-4efb-b625-8a321d1b9ed5.png)

 
**•	Một vài nguyên tắc mà hình vẽ muốn thể hiện:**

_ Một vòng tròn với một màu sắc tương ứng với một layer.

_ Các thành phần chứa code không liên quan đến framework sẽ nằm sát bên trong tâm vòng tròn (cụ thể ở đây là tầng Enterprise Business Rules & Application Business Rules). Chắc nhiều bạn sẽ thắc mắc “code không liên quan đến framwork là gì?”. Mình cũng xin giải thích ngắn gọn như thế này: Nếu bạn dùng Android để implement thì code ở 2 tầng này bắt buộc nó phải là Java hoặc Kotlin thuần 100%, nếu có bất kì code của Android framework nào xuất hiện ở tầng này (ví dụ như : Retrofit, Realm, Room….) thì cách tổ chức Clean Architechture của bạn đã failed ^^.

_ Đẩy những thành phần phụ thuộc vào framework (có thể hiểu ở đây là UI của WEB, IOS, Android..) ra càng xa tâm vòng tròn càng tốt (ở hình vẽ chính là Frameworks & Drivers – vòng tròn màu xanh dương).

_ Interface Adapters: Tầng ở giữa chịu trách nhiệm giao tiếp giữa những thành phần phụ thuộc vào framework và những thành phần không phụ thuộc vào framework (ở đây thông thường là request data và trả về framework để show lên view).

**•	Một vài câu hỏi được đặt ra:**

**_ Tại sao phải tổ chức vị trí của các layer như vậy?** –> Tổ chức các layer như vậy để tuân theo **QUY LUẬT PHỤ THUỘC** mà Clean Archiechture quy định đó là: 

1. Sự phụ thuộc của các lớp sẽ hướng vào trong tâm vòng tròn (Frameworks & Drivers -> Interface Adapters -> Application Business Rules -> Enterprise Business Rules). Chính quy luật phụ thuộc này nó làm cho 1 vòng tròn bất kỳ khi thay đổi nó sẽ không làm ảnh hưởng những vòng tròn nhỏ hơn nó, nhưng nó sẽ làm ảnh hưởng những vòng tròn to hơn nó. Ví dụ code ở vòng tròn “Interface adapter” thay đổi thì những vòng tròng bé hơn là “Application Business Rules” và “Enterprise Business Rules” sẽ không bị ảnh hưởng. Nhưng vòng tròn lớn hơn là “Frameworks & Drivers” sẽ bị ảnh hưởng. Do đó khi ta tổ chức Clean Architechture những gì hay thay đổi chỉnh sửa ta phải đẩy nó ra càng xa tâm vòng tròn càng tốt (cụ thể ở đây là những thành phần phụ thuộc framework ^^). Còn những usecase rất ít thay đổi hoặc gần như không bao giờ thay đổi nó sẽ nằm sát tâm vòng tròn nhất. 

2. Tại một vòng tròn bất kì, nó chỉ được phép sử dụng những đối tượng của vòng tròn nhỏ hơn nữa. Không được phép sử dụng các đối tượng của vòng tròn to hơn hoặc đồng cấp với nó. 

**_ Khi ứng dụng hiện thực Clean Architechture luôn luôn phải tuân theo 4 lớp như hình vẽ?** –> Câu trả lời KHÔNG. Tuỳ theo từng hệ thống sẽ có số lượng các lớp khác nhau nếu hệ thống của bạn nhỏ không nhất thiết phải tách biệt giữa entities và usecase. Điều quan trọng nhất là hệ thống phải tuân theo quy luật như đã nói ở trên đó là **QUY LUẬT PHỤ THUỘC.**

Phần 1 mình xin dừng lại ở đây. Cám ơn mọi người đã dành thời gian đọc bài viết của mình :grinning: