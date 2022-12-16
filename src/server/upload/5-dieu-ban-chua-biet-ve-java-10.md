Local-variable type inference đang là một trong những chủ đề đang gây tranh cãi hiện nay, nhưng Java 10 sẽ mang đến những thay đổi đáng trông đợi đến garbage collection và container awareness trong JVM.

Các Java developer đã quen với việc chờ đợi mỏi mòn các release mới của Java, nhưng release mới đây nhất sẽ thay đổi hết những điều đó. Đã 6 tháng kể từ khi Java 9 "xuất giá", và giờ đây Java 10 đã đến ngay ngưỡng cửa. Chỉ trong 6 tháng nữa chúng ta sẽ được chứng kiến Java 11. Một số developer sẽ cảm thấy quá tải, nhưng những phiên bản mới này đánh dấu những thay đổi lâu dài và chắc chắn sẽ không làm bạn thất vọng.

Đúng như tên gọi, Java 10 sẽ có 10 feature mới, và bài viết này sẽ phân tích 5 cái tôi thấy quan trọng và đặc sắc nhất (bạn có thể xem đầy đủ tại Open JDK 10 project page).

Note hay: [Người khiếm thị làm công nghệ – Điều kỳ diệu trong cuộc sống](https://topdev.vn/blog/nguoi-khiem-thi-lam-cong-nghe-dieu-ky-dieu-trong-cuoc-song/)
# 1. Java's new release cadence
Trong quá khứ, JDK release cadence đã được chạy bởi các feature lớn hơ, mới hơn. Như những ví dụ gần đây, Java 8 đã cho ra mắt lập trình functional dưới dạng lambdas và stream, và Jva 9 đã ra mắt modular Java system. Cứ mỗi version mới ra mắt là được kì vọng cực kì, nhưng vẫn chưa được chỉnh sửa nhiều để đợi thêm nhiều component lớn hơn được hoàn thiện. Sự trưởng thành của Java chậm hơn so với các ngôn ngữ khác.

Cadence high-frequency mới đã đưa Java tiến lên vào các increment nhỏ hơn. Nó sẽ bao gồm cả các feature sẵn sàng vào ngày release, và riêng những cái chưa có sẵn thì có thể delay sang đượt release sau, chỉ 6 tháng nữa thôi. Version Java đầu tiên trong vòng tròn này là Java 9, ra mắt vào tháng 10 năm 2017. Java 10 ra mắt vào tháng 3 năm 2018, và Java 11 được kì vọng sẽ ra mắt vào tháng 9 năm 2018.

Là một phần trong cadence mới, Oracle tuyên bố họ chỉ support release hiện tại cho đến khi release mới ra mắt. Nghĩa là, khi Java 11 ra mắt, Oracle sẽ ngừng support Java 10. Những developer nào muốn đảm bảo phiên bản Java của họ được support thì phải update lên bản release mới 6 tháng 1 lần. Những ai không muốn update có thể tận dụng LTS (long-term support), update mỗi 3 năm 1 lần. Bản LTS hiện tại, Java 8, sẽ được support cho đến khi Java 11 ra mắt vào mùa thu năm nay.

# 2. Local-variable type inference
Cho đến thời điểm hiện tại, Local-variable type inference là feature nổi bật nhất trong Java 10. Nó để compiler cho ra loại local variable, hơn là yêu cầu programmer phải phân tích chi tiết.

Listing 1 sẽ show ra làm sao String variable type sẽ được xác định trước khi có bản Java 10.

Listing 1. Declare và assign một String variable
`String name = "Alex";`

Listing 2 cho thấy variable String này được xác định trong Java 10.

Listing 2. Một String variable được xác định dùng local-variable type inference

`var name = "Alex";`

Theo như tôi thấy, điểm khác biệt duy nhất là sử dụng reversed type name var. Using the expression to the right, the compiler can infer the type of the variable name as String.

Đấy là một ví dụ khá đơn giản, bây giờ hãy cùng xem ví dụ phức tạp hơn. Nếu như variable được gán cho return value của method call thì sao? Trong trường hợp này compiler có thể infer dạng variable từ return type của method, như trong Listing 3.

Listing 3. Một String variable được infer từ return type
```
var name = getName();
 
String getName(){
    return "Alex";
}
```
# Sử dụng các local variable type
Như tên gọi của nó, feature local-variable type inference chỉ dùng được cho các local variable. Nó không thể dùng để xác định instance hoặc các class variable, hay dùng trong các method parameter hoặc các dạng return. Tuy nhiên, bạn có thể dùng var và tăng for-loops ở đâu mà type có thể được infer từ iterator, như trong Listing 4.

Listing 4. Dùng var-in-loops
```
for(var book : books){}
for(var i = 0; i < 10; i++){}
```
Lý do rõ ràng nhất để dùng type này đó là nó giảm những dây dưa rườm rà trong code của bạn. Hãy xem ví dụ trong Listing 5.

Listing 5. Tên type dài làm code dài
```
String message = "Incy wincy spider...";
StringReader reader = new StringReader(message);
StreamTokenizer tokenizer = new StreamTokenizer(reader);
```
Hãy lưu ý chuyện gì xảy ra khi chúng ta viết lại Listing 5 dùng reversed type name của var.
Listing 6. Một var type giảm tình trạng code dài
```
var message = "Incy wincy spider...";
var reader = new StringReader(message);
var tokenizer = new StreamTokenizer(reader);
```
Các bộ khai báo type trong Listing 6 xếp theo hàng dọc và type được nhắc đến một lần trong mỗi statement, bên phải constructor call. Tưởng tượng xem những lợi ích của việc dùng type này cho các long class name phổ biến trong các framework Java.

# Issues with local variable types
## 1. var obscures type
var có thể giúp cải thiện chất lượng đọc code rất nhiều, nhưng cũng có thể làm giảm thiểu nó. Xem ví dụ trong Listing 7.

Listing 7. Return type không rõ ràng
`var result = searchService.retrieveTopResult();`
Trong Listing 7 chúng ta phải đoán return type. Code nào bắt người đọc phải đoán chuyện gì đang xảy ra đều rất khó giữ.

## 2. var không mix với lambdas
Type inference sẽ không hiệu quả khi kết hợp với các lambda, chủ yếu là do thiếu info cho compiler. Lambda trong Listing 8 sẽ không compile.

Listing 8. Thiếu information
```
Function<String, String> quotify = m -> "'" + message + "'";
var quotify = m -> "'" + message + "'";
```
Trong Listing 8 sẽ không đủ information cho compiler để infer variable type. Các lambda statement phải luôn khai báo một type riêng biệt.

## 3. var không mix với diamond operator
Type inference không hoạt động tốt khi kết hợp với diamond operator. Xem ví dụ trong Listing 9.

Listing 9. Dùng diamond operator với var
`var books = new ArrayList<>();`
 
Thử sức!

Để thử local-variable type inference, bạn cần download JDK 10 và một IDE support nó. EAP (Early Access Program) version của IntelliJ có dạng support này. Một khi đã download và cài đặt bạn có thể bắt đầu check GitHub repository có trong bài viết này. Bạn sẽ thấy có các ví dụ về local-variable type inference.

Trong Listing 9, parameter type của `ArrayList` tham chiếu bởi books là gì? Bạn biết rằng bạn muốn ArrayList lưu trữ một list sách, nhưng compiler không thể infer được. Thay vì thế compiler sẽ làm thứ duy nhất nó biết làm, đó là infer `ArrayList` được parameter hoá bằng Object type: `ArrayList<Object>()`.

Một cách thay thế đó là làm rõ type của diamond operator trong right-hand expression. Sau đó bạn có thể để compiler infer variable type như ví dụ trong Listing 10. Nếu không, bạn phải khai báo chi tiết variable theo như cách cũ:` List<Book> books`. Trên thực tế, bạn sẽ thích option này hơn vì nó cho phép bạn làm rõ abstract type và program đến List interface:

Listing 10. Làm rõ type

`var books = new ArrayList<Book>();`
## 3. Các phần được bổ sung, bớt và hoàn thiện
## Những phần bị remove
Java 10 đã remove một số tool sau:

* Command-line tool javah, thay vì thế bạn có thể dùng javac -h.
* Command-line option -X:prof, bạn có thể dùnh tool jmap để access vào thông tin profiling.
* policytool.
Một số API được gán mác chờ hoàn thiện từ Java 1.2 cũng đã bị remove vĩnh viễn, bao gồm `java.lang.SecurityManager.inCheck` field và các method sau:

```
java.lang.SecurityManager.classDepth(java.lang.String)
java.lang.SecurityManager.classLoaderDepth()
java.lang.SecurityManager.currentClassLoader()
java.lang.SecurityManager.currentLoadedClass()
java.lang.SecurityManager.getInCheck()
java.lang.SecurityManager.inClass(java.lang.String)
java.lang.SecurityManager.inClassLoader()
java.lang.Runtime.getLocalizedInputStream(java.io.InputStream)
java.lang.Runtime.getLocalizedOutputStream(java.io.OutputStream)
```


## Deprecations
JDK 10 cũng đã cải thiện một số API. Package java.security.acl được đánh dấu đã được cải thiện, và một số class liên quan (Certificate, Identity, IdentityScope, Singer, auth.Policy) trong java.security package. Đồng thời, CREDENTIAL_TYPE trong class javax.management.remote.rmi.RMIConnectorServer cũng được đánh dấu là cải thiện xong. Method finalize() trong java.io.FileInputStream và java.io.FileOutputStream cũng vậy, và cả method finalize() trong các class java.util.zip.Deflater/Inflater/ZipFile.

## Phần được bổ sung 
Tiếp nối sự liên kết của Oracle JDK và Open JDK, Open JDK bao gồm một subset của root certificates authority có sẵn trong Oracle JDK. Chúng bao gồm Java Flight Recorder và Java Mission Control. Ngoài ra, JDK 10 đã tăng mức support cho các Unicode extension của các tag ngôn ngữ BCP 47 phú hợp trong các package java.text, java.time, và java.util. Một feature mới khác cho phép thực hiện callback trên các thread mà không phải đụng tới global VM safepoint, làm cho nó vừa khả thi vừa tiết kiệm chi phí tạm ngừng các thread cá nhân, hơn là bắt bạn phải ngừng hết các thread hoặc không cái nào cả.

# 4. Container awareness đã được cải thiện
Nếu bạn deploy đến các container như Docker thì feature này là dành riêng cho bạn. JVM đã hiểu là nó chạy trong container, và sẽ nghi vấn container về số lượng processor có sẵn, hơn là về host operating system. Nó cũng có thể attach với một Java process đang chạy trong container, cái sẽ hỗ trợ quan sát JVM processes dễ dàng hơn.

JVM trước đây không nhận biết container của nó và sẽ hỏi host operating system về số lượng các CPU active. Trong một số trường hợp, nó có thể dẫn đến các nguồn over-reporting đến JVM, gây ra nhiều rắc rối khi nhiều container cùng chạy trên một operating system. Trong Java 10, bạn có thể configure một container để sử dụng subset của các CPU của host operating system, và JVM có thể xác định được số CPU đang được sử dụng. Bạn cũng có thể xác định chi tiếi số processor mà JVM có thể thấy bằng flag -XX:ActiveProcessorCount.

# 5. Application class data sharing
Mục tiêu của feature này là để cải thiện thời gian tái khởi động JVM trong lúc chạy và với nhiều JVM chạy cùng một code, đồng thời vẫn làm giảm bộ nhớ, thông qua metadata sharing về các class trong các JVM. Đợt chạy đầu của JVM thu thập và tạo file data về các class mà nó đã load. Sau đó file này sẽ có sẵn cho các JVM khác và các đợt chạy sau của JVM, giúp tiết kiệm thời gian và resource trong quá trình khời động JVM. Class data sharing đã có từ lâu, nhưng chỉ dành cho system classes. Giờ nó đã mở rộng cho tất cả các application class.

# Kết luận
Headline feature trong Java 10 rõ ràng là một var reserved type name. Nó giúp làm rõ và đơn giản hoá code, nếu dùng bất cẩn sẽ mang đến kết quả mập mờ. Một IDE có thể giúp nhận diện các type khi nó không rõ, nhưng không phải code nào cũng được đọc trong IDE. Thuường chúng ta đọc code online trên GitHub repository, trong debugger, hoặc trong các tool code-review. Các developer dùng feature mới nên cẩn thận trong việc đọc code.

High frequency release cadence mới của Java là một sự thay đổi được kì vọng cao. Nó buộc các bản mới của feature phải kịp ngày release. Chu trình mới thúc đẩy sự phát triển của Java, và các developer không phải đợi cả năm trời cho những feature đã có và chờ ngày lên kệ. Đương nhiên vẫn có nhiều quan ngại xoay quanh thời gian support ngắn hơn nhiều, nhưng LTS sẽ giúp giải quyết vấn đề này. Một risk khác nữa là sức chịu đựng của release, vì các developer đã quá mệt mỏi về việc thay đổi liên tục. Tuy vậy nhìn chung, tôi nghĩ đây vẫn là một bước đi hợp lí giúp Java tồn tại và phát triển trong thời gian tới.