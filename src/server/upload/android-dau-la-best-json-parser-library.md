# [Android] Đâu là best JSON Parser library?
## Lời mở đầu
Trong quá trình phát triển ứng dụng android, khi nhắc đến thư viện hiệu quả và dễ dùng để xử lý các công việc phức tạp với **Network** thì không thể không nhắc đến **Retrofit**. :smiley:  

Nhưng khi nói đến thư viện để tuần tự hóa các object thành các request hoặc phân tích các response **JSON** thành các object, chúng ta có một vài đối thủ. Hôm nay mình sẽ giới thiệu và phân tích cho các bạn thấy đâu là trình phân tích cú pháp **JSON** đỉnh nhất trong Android.
## 1. Tại sao các JSON Parser Library ra đời? 
Đầu tiên trước khi biết đến các **JSON Parser library** chắc các bạn đã từng Parse Json trong android bằng cách tạo ra các đối tượng **JSONObject** hoặc **JSONArray**. Nếu như đối tượng json của chúng ta khá phức tạp thì công việc đó trở nên rất khó khăn, tốn thời gian và nhiều code hơn, khiến dự án ta phình lên một cách không cần thiết.    

May mắn là hiện nay chúng ta có nhiều thư viện vô cùng mạnh mẽ trong việc chuyển đổi tự động từ 'Object' sang 'json' và ngược lại.

- **Gson**
> Thư viện phân tích cú pháp **JSON** của riêng **Google** dành cho **Android** và là thư viện phổ biến nhất  (Có đến 18,6k star trên **Github** cao hơn so với **Jackson** - 6,0k và **Moshi** - 6,6k). Nó cũng là phiên bản ra đời sớm nhất, với phiên bản 1.0 được phát hành vào năm 2008  

- **Jackson** 
>Là đối thủ cạnh tranh rất lâu của **Gson** trong nỗ lực cung cấp trình phân tích cú pháp nhanh hơn và nhiều tính năng hơn.  Phiên bản 1.0 của nó được phát hành vào năm 2009 có tên mã là “**Hazelnut**”.  

- **Moshi**  
> Là thư viện ra đời trễ hơn trong số 3 **JSON Parser Library** nó được phát hành đầu tiên là vào năm 2015. Nó đứa con được tạo ra bởi một số người đã làm việc trên **Gson** trong quá khứ và **Square**, cha đẻ của **Retrofit**  

Và trong não tôi nảy lên một vài câu hỏi.
* **???** - Trong nhiều tình huống, trường hợp có thể cái này sẽ tốt hơn cái kia nhỉ?
* **Tôi** - Oh! Maybe :slightly_smiling_face: 
* **???** - Hay là làm một vài round để xem đâu là thằng best nhất? :smile: 
* **Tôi** - Đúng vậy! Bắt đầu vào vấn đề để tìm ra nào! :stuck_out_tongue_closed_eyes: 
## 2. Cuộc chiến bắt đầu
 Ban đầu mình nghĩ có đến 4 tiêu chí để đánh giá. Tuy nhiên, sau đó mình  loại bỏ tiêu chí thứ 4 là **Dễ sử dụng** vì không có cái nào trong số 3 thư viện đặc biệt hay khó sử dụng, hầu hết đều được sử dụng phổ biến.  
 Nên Cuộc thi của chúng ta sẽ có những tiêu chí như sau để đánh giá:  
**1. Features - Đặc trưng**  
**2. Reliability and error handling - Độ tin cậy và xử lý lỗi**  
**3. Performance and size - Hiệu suất và kích thước**  
### 2.1 Round-1 FEATURES (Đặt trưng)
**Gson**, **Jackson** và **Moshi** đều hỗ trợ liên kết dữ liệu **JSON** hoàn chỉnh cho **Java** để tuần tự hóa các đối tượng **Java** thành **JSON** và ngược lại. Tuy nhiên, trong số 3 điều này, chỉ có **Jackson** hỗ trợ phân tích cú pháp **XML**.

Cả 3 cũng hỗ trợ các bộ điều hợp kiểu tùy chỉnh, giúp ích rất nhiều khi phân tích các cấu trúc **API** phức tạp hơn mà không cần phải làm ngập dự án của bạn với các lớp dữ liệu không cần thiết chỉ vì mục đích phân tích response **JSON** của bạn. Cả 3 cũng hỗ trợ các loại chung và đủ khả năng config cho hầu hết các trường hợp sử dụng phổ biến.

Đối với sự khác biệt? **Gson** là đơn giản nhất trong số 3 nhưng điều đó có nghĩa là nó ít tính năng hơn. **Jackson** có hỗ trợ các extensive annotation .  
Một số annotations của Jackson:  
![](https://images.viblo.asia/c829bade-4cf6-4b0e-be8e-b3e2ab87cd17.png)

Đây là những chú thích có thể được sử dụng trên cả hai lớp và thuộc tính để sửa đổi hành vi trong quá trình tuần tự hóa hoặc deserialisation. Lấy `@JsonIgnoreProperties` làm ví dụ. Theo tài liệu Java:

> *"**Annotation** that can be used to either suppress serialization of properties (during serialization), or ignore processing of JSON properties read (during deserialization)"*

Mình tạm dịch:
> *“**Annotation** có thể được sử dụng để ngăn tuần tự hóa các thuộc tính (trong quá trình tuần tự hóa) hoặc bỏ qua việc xử lý các thuộc tính JSON đã đọc (trong quá trình giải mã hóa)”*

**Jackson** có một số lượng lớn các annotations này cho phép rất nhiều sự linh hoạt khi nói đến tuần tự hóa và giải mã mà Gson không có hoặc sẽ cần nhiều nỗ lực hơn để làm như vậy.

Vậy còn **Moshi** thì sao? **Moshi** cũng không nằm trong danh sách tính năng. Bạn nhận được các bộ định lượng như `@HexColor int` cho phép nhiều biểu diễn **JSON** cho một loại Java duy nhất và một số phương pháp thuận tiện cho adapter như `JsonAdapter. failOnUnknown()` cho phép bạn từ chối dữ liệu **JSON** không mong muốn.

Điều này được nêu một cách chi tiết ở  [**comment**](https://www.reddit.com/r/androiddev/comments/684flw/why_use_moshi_over_gson/dgx3gpm?utm_source=share&utm_medium=web2x&context=3) của **swankjesse’s** trong một bài **[post](https://www.reddit.com/r/androiddev/comments/684flw/why_use_moshi_over_gson/)** trên **Reddit**

Tuy nhiên, hỗ trợ **XML** của **Jackson** cũng như số lượng **Annotation** tuyệt đối của nó (trên thực tế là chúng được tích hợp vào các **Annotation** dễ sử dụng) đưa nó lên đầu danh sách tính năng.

#### Do đó 1 điểm cho *Jackon* vòng này
### 2.2 Round-2 RELIABILITY & EROR HANDLING (Độ tin cậy và xử lý lỗi)
Đầu tiên hãy nói về **Gson**, bởi vì nó có một vài vấn đề. Trước hết, nó là một thư viện **Java** thuần túy. Bất kỳ người đam mê **Kotlin** nào cũng sẽ cho bạn biết lợi thế quan trọng nhất mà nó có so với **Java** là các kiểu **nullable**, và điều đó cho phép xử lý an toàn nói chung và tránh các ngoại lệ con trỏ **null** nói riêng.

Điều này có ý nghĩa gì đối với **Gson**? Vì đây là một thư viện **Java**, nó khởi tạo các class **Kotlin** của bạn mà không quan tâm đến khả năng vô hiệu của chúng và do đó các giá trị **null** có thể được **deserialised** thành các kiểu không **null** của **Kotlin** và gây ra lỗi **runtime**.

Không những vậy, , **Gson** còn gặp các vấn đề khác như rò rỉ chi tiết triển khai của các loại nền tảng vào JSON được mã hóa của bạn. thêm nữa `Date` được mã hóa không có timezone(múi giờ) nên dữ liệu bị hỏng khi bộ mã hóa(encoder) và bộ giải mã(decoder) không chia sẻ timezone cho nó. Phần khó chịu của lỗi này là nó cũng rất nguy hiểm để sửa: chúng ta không biết ứng dụng nào đang mong đợi định dạng hiện tại và chúng ta cũng không biết điều gì sẽ bị hỏng nếu chúng tôi thay đổi nó. (Gson sẽ đọc các ngày RFC 3339 giống như 1970–01–01T00:00:00Z theo mặc định).

Những lý do này, trong số những lý do khác là nguồn cảm hứng đằng sau việc tạo ra **Moshi**, Nó được tạo ra để giải quyết những vấn đề mà **Gson** gặp phải. **Moshi** cũng có một số hỗ trợ **Kotlin** khá tốt và có thể còn nhiều hơn thế nữa.

![](https://images.viblo.asia/3cb82193-4338-4660-8de6-6c4d73568ad5.png)

Khi nói đến xử lý lỗi, **Moshi** cũng tự hào về các trường hợp ngoại lệ có thể dự đoán được. Nó sẽ tạo ra một `IOException` đối với các vấn đề **IO** và một `JsonDataException` nếu kiểu không khớp.

Đối với **Jackson**, mặc dù mô-đun cốt lõi của nó hoàn toàn là **Java**, nhưng nó có một mô-đun hỗ trợ **Kotlin**. **Jackson** cũng có nhiều lớp ngoại lệ duy nhất cho bạn biết chính xác lý do tuần tự hóa / deserialisation không hoạt động theo cách mà nó cần. [Bài báo của Bealdung](https://www.baeldung.com/jackson-exception) giải thích nó một cách hoàn hảo .

Nhưng nhìn sâu hơn, nhiều vấn đề trong số này là những vấn đề mà thư viện lẽ ra có thể xử lý tốt hơn để tránh hoàn toàn vấn đề.

#### Vì lý do này, *Moshi* giành chiến thắng khi nói đến độ tin cậy và xử lý lỗi.
### 2.3 Final Round PERFORMACE & SIZE (Hiệu suất và kích thướt)
Đã có rất nhiều bài kiểm tra điểm benchmaking đã được thực hiện cho 3 trình phân tích cú pháp JSON này, vì vậy chúng ta sẽ lấy từ các bài phân tích này:

[1. Here’s why you probably shouldn’t be using the Gson library in 2018](https://medium.com/@dannydamsky99/heres-why-you-probably-shouldn-t-be-using-the-gson-library-in-2018-4bed5698b78b#:~:text=Gson%20is%20the%20slowest%20at,Strings%20than%20the%20other%20solutions)

[2. Android JSON Parsers Comparison](https://medium.com/@IlyaEremin/android-json-parsers-comparison-2017-8b5221721e31)
 
[3. Beyond Gson — Evaluating JSON Parsers for Android & Kotlin](https://blog.usejournal.com/beyond-gson-evaluating-json-parsers-for-android-kotlin-e7aa4bcc413e)

Cái thứ ba trong danh sách này là cái gần đây nhất, với thử nghiệm được thực hiện vào tháng 10 năm 2019. Vì vậy, chúng ta sẽ xem xét điều đó trước.

Bài kiểm tra hiệu suất vào tháng 10 năm 2019 của **Rob Pridham**:
![](https://images.viblo.asia/734da0d1-9e37-4400-b29b-0cb68f87c930.png)

Trong các thử nghiệm được thực hiện bởi **Rob Pridham** vào tháng 10 năm 2019, cả trong thời gian thực hiện đầu tiên và trong các thử nghiệm tiếp theo sau đó, thì **Jackson** là người chậm nhất và **Gson** cũng không khá hơn mất. Anh ấy nói trong bài báo rằng không có gì ngạc nhiên khi **Jackson** là người chậm nhất khi xem xét về các **Annotation** được sử dụng nhiều.

Tuy nhiên, điều đáng ngạc nhiên là **Gson** chậm hơn **Moshi** bao nhiêu? Trong khi nó không có nhiều tính năng và cả độ an toàn.

Hai bài kiểm tra  đầu tiên từ năm 2018 và 2017 dường như lại cho kết quả khác.

Bài kiểm tra hiệu suất vào tháng 8 năm 2018 của **Danny Damsky**:
![](https://images.viblo.asia/1673c120-4c14-4101-abff-ab540106d8b6.png)

Bài kiểm tra hiệu suất tháng 3 năm 2017 của **Ilya Eremin**:
![](https://images.viblo.asia/96e5795a-95df-4f01-acfa-f163a1d8d96b.png)

Cả hai bài kiểm tra này đều cho thấy **Jackson** là người nhanh nhất và **Moshi** hoặc **Gson** là người chậm nhất.

Bây giờ chúng ta hãy tự tìm hiểu điều này. Tại sao **Moshi** lại chậm nhất trong 2 bài kiểm tra này, nhưng lại nhanh nhất trong bài kiểm tra mình phân tích đầu tiên?

Tháng 5 năm 2018 là ngày phát hành 1.6.0 của **Moshi**, bổ sung thêm tính năng tạo mã **kapt** với xử lý **Annotation**. Điều này có nghĩa là bạn có thể chú thích các lớp dữ liệu **Kotlin** của mình để có các adapter nhỏ và nhanh được tạo cho chúng khi biên dịch chúng, do đó làm tăng đáng kể hiệu suất của **Moshi**.

Tất nhiên, thử nghiệm năm 2017 của **Ilya Eremin** không thể sử dụng phiên bản và tính năng này vì nó chưa được phát hành vào thời điểm đó và **Danny Damsky** mặc dù sử dụng **Moshi** 1.6.0 nhưng đã không chọn chức năng **kapt** này trong khi thử nghiệm như của **Rob Pridham** đã làm.

Điều đó giải thích tại sao kết quả bài kiểm tra của **Moshi** là nhanh nhất trong bài kiểm tra gần đây, nhưng tại sao **Jackson** lại đột ngột nhảy xuống chậm nhất nhỉ ? :relieved: 

Đi tiếp một thử nghiệm nữa. Các bạn hãy đọc bài viết này của **Milosz Moczkowski**

[Save my ass: benchmark of json deserializers on Android](https://medium.com/stanwood/save-my-ass-benchmark-of-json-deserializers-on-android-28341c1e82df)

Bài kiểm tra Performance tháng 12 năm 2018 của **Milosz Moczkowski**:  
![](https://images.viblo.asia/d2364449-626b-4b18-8a21-eef6a9bd0c52.png)

Tháng 12 năm 2018 và lại một lần nữa **Jackson** chậm nhất và **Moshi** nhanh nhất. Vậy, điều gì giải thích cho câu hỏi tại sao **Jackson** lại chậm như vậy ở đây và trong bài kiểm tra năm 2019, nhưng lại nhanh nhất trong các bài kiểm tra cũ?

Tôi chỉ có thể đoán rằng đó là một trong hai điều này: 
1. **Gson** đã có một sự thúc đẩy hiệu suất lớn vào cuối năm 2018, do đó vượt qua **Jackson** về hiệu suất (**Moshi** với **kapt** đã có)  
2. Tháng 8 năm 2018 và tháng 3 năm 2017 đã không sử dụng nhiều **Annotation** của **Jackson**

Chưa kể, số lương method (phương thức) của **Jackson** cao hơn nhiều so với của **Gson** hoặc **Moshi**. **Danny Damsky** đã đưa ra ý kiến này trong bài báo của mình, vì vậy chúng ta sẽ xem xét nó trong hình bên dưới.  
![](https://images.viblo.asia/840f2a36-8924-459c-bce6-65cacb39b878.png)

**Moshi** đi kèm với gói **Okio** nhiều gấp đôi số phương thức của nó, nhưng nếu bạn đang sử dụng các thư viện **Square** phổ biến khác như **OkHttp**, thì bạn đã có **Okio** rồi 
#### Trong cả hai trường hợp, *Moshi* với *kapt* giành chiến thắng cho cả hiệu suất và kích thước.
### 2.4 Result
**Gson** - 0

**Jackson**  - 1

**Moshi**  - 2
## 3 Kết luận
**Moshi** giành chiến thắng ở đây. 

**Gson** khá được mong đợi vì nó đã ra đời sớm nhất nhưng  nó lại không xuất sắc ở bất kỳ khía cạnh nào so với hai đối thủ còn lại

**Jackson** có nhiều tính năng nhưng có kích thướt lớn hơn và chậm hơn so với hai  thủ còn lại. Độ tin cậy lại không bằng **Moshi**

Vậy trong trường hợp hay tinh huống nào **Gson** và **Jackson** sẽ là lựa chọn tố hơn **Moshi** ? Đối với **Gson**, nếu chúng ta hiện đang sử dụng nó trong một dự án mà không có vấn đề gì và bạn không muốn dành thời gian để di chuyển sang **Moshi**, thì hãy tiếp tục sử dụng **Gson**. Dẫu sao nó cũng là con của **Google** nên đội ngũ của họ vẫn đang làm việc để đảm bảo **Gson** là một thư viện vững chắc nhất có thể.

Bạn có thể chọn **Jackson** nếu bạn nghĩ rằng nhiều loại **Annotation**của nó sẽ hữu ích cho bạn, yêu cầu phân tích cú pháp dữ liệu bằng XML hoặc các định dạng khác. Nếu không, **Moshi** is the best Android JSON Parser.

Vâỵ là chúng ta đã trả lời được các câu hỏi thắc mắc ở đầu bài :smiley:   

Bài chia sẻ này mình đã tham khảo các tài liệu trên mạng. Nếu có sai xót gì mong mọi người bỏ qua sai và có thể góp ý cho mình cải thiện ở cmt bên dưới. :smiley: Nếu đã xác nhận được độ tin cậy hãy vote để ủng hộ cho mình nhé :smile:  mình xin dừng bài viết ở đây! Cảm ơn mọi người đã theo dõi.  :heart: