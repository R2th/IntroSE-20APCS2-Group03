*Ngay từ đầu, Java là một trong những ngôn ngữ lập trình thống trị. Trong thời đại tiến bộ ngày này, nơi mà nhiều ngôn ngữ mạnh mẽ có mặt đã chết từ lâu, Java vẫn phù hợp và phát triển nhanh chóng theo xu hướng.
Theo như biểu đồ được cung cấp bởi Oracle, có thể lấy ví dụ như tháng 12 năm 2019, Java nằm vị trí thứ nhất về ngôn ngữ lập trình cho các ứng dụng như DevOps, Thực tế ảo, Big Data, Mobile, microservices development.
Đây là lí do tại sao các lập trình viên trẻ thường lựa chọn Java là ngôn ngữ chính để học. Ngôn ngữ lập trình thường xanh(ít lỗi và cứ run là xanh =)))) dường như là sự lựa chọn tốt nhất để bắt đầu. Do sự cạnh tranh gay gắt, để nổi bật giữa hàng trăm lập trình viên xung quanh ta, công việc của bạn cần phải đáp ứng một số tiêu chuẩn nhất định mà bạn có thể tích lũy được thông qua Java coding best practice.*
**<div align="center">Java Best Practices: Tổng quan.</div>**

*Một mã thực thi, erro-free code (không lỗi) có thể là đủ nhưng điều đó là không phải, Code nên được viết theo một tập hợp các tiêu chuẩn và quy tắc. Bằng cách áp dụng java coding best practices, nó có thể cải thiện đáng kể chất lượng code của bạn khiến nó trở nên dễ hiểu hơn với bạn và với người khác. Một số java best practices thậm chí có thể
tăng hiệu xuất của mã, làm cho nó hiệu quả hơn rất nhiều.
Top 15 Java Best Practices dưới đây, bạn nên bắt đầu làm theo để nâng cao tiêu chuẩn code và khả năng của chính mình.*

**1.	Use Proper Naming Conventions (Sử dụng các quy tắc đặt tên riêng)**
-	Điều đầu tiên, trước khi bắt đầu viết code, hãy đặt một quy ước đặt tên thích hợp cho dự án java của chính mình. Quyết định trước tên cho mọi class, interface, phương thức và biến ..v.v.. Nếu các lập trình viên khác cũng làm việc với bạn trong cùng một dự án. Họ cũng lên tuân theo nó để duy trì tính thống nhất. Quy tắc đặt tên là rất quan trọng vì mọi thứ từ class đến interface đều được xác định từ tên của chúng trong code mà ra.
-	Đừng gán những cái tên ngẫu nhiên chỉ để thỏa mãn trình biên dịch, sử dụng tên có ý nghĩa, dễ hiểu, dễ đọc và sau này có thể hiểu được được bới chính bạn, thành viên trong nhóm của bạn, quality assurance engineers (qa) và nhân viên bảo trì dự án sau này

**2.	Class Members must be accessed privately (Các thành viên trong class phải được truy cập private)**
-   Nó sẽ giữ cho khả năng truy cập (accessibility) của các trường trong class càng không thể truy cập được. Nó được thực hiện để bảo vệ các trường này và để làm được điều đó **access modifier** là sự lựa chọn lí tưởng. Nó được thực hiện để duy trình tính đóng gói (encapsulation), một trong những nội dung cơ bản của OOP(Object Oriented Programming). Mặc dù chỉ là nội dung cực kì cơ bản của OOP và nhiều lập trình viên mới đã biết về nó nhưng họ vẫn không hoàn toàn gán access modifiers cho các class mà vẫn muốn giữ ở chễ độ public cho dễ.

- Hãy xem class dưới đây, các trường được đặt public:

![](https://images.viblo.asia/f4165c44-4ef5-4062-97ad-ba9ce1d117ec.png)

- Tính đóng gói bị xâm phạm vì bất kì ai cũng có thể thay đổi các giá trị giống như này,
![](https://images.viblo.asia/444b6f08-1928-4a25-af2b-aea96b2b46f8.png)

- Sử dụng private access modifier với các lớp thành viên để giữ cho các trường luôn được ẩn, ngăn người dùng có thể thay đổi dữ liệu ngoại trừ phương thức setter.
Dưới đây là ví dụ sử dụng private access modifier:
 
![](https://images.viblo.asia/4ac6dab1-b709-464d-a1f7-8c85dfb4920a.png)


**3. Use Underscores in lengthy Numberic Literals (Sử dụng dấu gạch dưới trong các chữ số dài)**
- Đây là một tính năng mới được giới thiệu trong Java 7, có thể giúp cho bạn viết các chữ số dài một cách dễ đọc hơn nhiều. Do vậy, thay vì viết theo cách cũ phổ biến như thế này

 ![](https://images.viblo.asia/1e68b3ed-659b-4fe0-ad05-bec36b273b8e.png)

- Bạn có thể gán một số dài như thế này :
 ![](https://images.viblo.asia/b2682dad-bf0f-4f6b-9c02-5432582a47fa.png)

- Việc điều chỉnh này sẽ làm cho code java của bạn trở nên dễ đọc, có cấu trúc tốt hơn và cá tính hơn nữa.

**4. Never leave a Catch Blocks empty (Không bao giờ để trống Catch Blocks).**
- Nó là một trong những best practice hay nhất được các lập trình viên ưu tú sử dụng để viết một thông điệp thích hợp và có ý nghĩa trong khối catch khi xử lí ngoại lệ. Các lập trình viên mới thường để khối catch trống vì ban đầu họ chỉ làm việc một mình trên code, và họ thường không bận tâm nhiều đến việc chạy (cứ run được là xong) và fix bug sau này. Chính vì thế, điều gì xảy ra khi exception được bắt bởi một khối catch trống, nó sẽ chẳng hiển thị ra bất cứ thứ gì, điều này gây khó khăn cho việc debug và mất thời gian hơn rất nhiều.
- Thông thường, try-catch rỗng là một ý tưởng tồi vì bạn đang âm thầm nuốt một điều kiện lỗi và sau đó tiếp tục thực hiện. Đôi khi đây có thể là điều đúng đắn nên làm, nhưng thường đó là dấu hiệu cho thấy một nhà phát triển đã nhìn thấy một ngoại lệ, không biết phải làm gì với nó và vì vậy đã sử dụng một phương thức trống để ngăn chặn vấn đề.

**5.Use StringBuilder or StringBuffer for String Concatenation (Sử dụng StringBuilder hoặc StringBuffer để ghép chuỗi).**

- Sử dụng “+” toán tử để ghép chuỗi String vào nhau là cách thực hiện chung cho mọi ngôn ngữ lập trình kể cả Java.
Đây là cách viết chung và không sai, tuy nhiên, khi bạn cần nối nhiều chuỗi , toán tử “+” tỏ ra không hiệu quá vì trình biên dịch Java sẽ tạo ra nhiều String Objects trung gian trước khi tạo ra chuỗi nối cuối cùng.
Trong trường hợp này, bạn bên sử dụng “StringBuilder” hoặc “StringBuffer”. Đây là chức năng sửa đổi chuỗi được tích hợp sẵn mà không tạo thêm đối tượng chuỗi trung gian giúp tiết kiệm thời gian xử lí và sử dụng bộ nhớ không cần thiết.

- Ví dụ : 
 ![](https://images.viblo.asia/a28faea7-e1d6-4ef8-87de-aa5c38855ce1.png)

- Đoạn mã được đề cập ở trên có thể được viết bởi StringBuilder như sau:
 ![](https://images.viblo.asia/d02f2df7-8b7f-4e42-8232-eac53abf2365.png)


**6. Avoid Redundant Initializations (Tránh việc khởi tạo dư thừa)**
- Mặc dù thực tế rất phổ biến. nhưng nó không hề được khuyến khích để khởi tạo các biến thành viên với giá trị như là : 0, false and null. Những biến này đã là giá trị khởi tạo mặc định của các biến thành viên trong Java. Do đó, cách tốt nhất là lưu ý khởi tạo các giá trị mặc định của các biến thành viên và tránh khởi tạo các biến một cách rõ ràng.

- Ví dụ như như đoạn code dưới đây, việc khởi tạo là không cần thiết do đó nó là dư thừa.

![](https://images.viblo.asia/cfc82abd-54ec-4a07-a564-f56e24a56407.png)

**7. Using Enhanced For Loops Instead Of Loop With Counter (Sử dụng vòng lặp for nâng cao thay vì vòng lặp for với bộ đếm)**
- Vòng lặp “for” được sử dụng với một giá trị đếm, nhưng cách thức duy nhất đươc các lập trình viên hàng đầu đề xuất là sử dụng vòng lặp for nâng cao (for-each) thay vì vòng lặp for như cách cũ với bộ đếm. Nhìn chung, nó sẽ không tạo nên sự thay đổi lớn, nhưng trong một số trường hợp, biến đếm được sử dụng có thể rất dễ bị lỗi. Biến đếm có thể tình cờ bị thay đổi, nó có thể được sử dụng sau đó trong code hoặc bạn có thể bắt đầu index từ 1 thay vì 0, điều này sẽ gây ra sự xáo trộn code ở nhiều điểm. Để loại bỏ điều này, vòng lặp for nâng cao là một sự lựa chọn tốt.

- Xem đoạn code dưới đây :
 
 ![](https://images.viblo.asia/ff8d2be3-f17f-4cd4-9a5b-71bd33897b5a.png)

 
- Ở dây biến “i” được sử dụng như một bộ đếm cho vòng lắp cũng như chỉ mục cho mảng names. Nó có thể găp sự cố sau này trong code. Do vậy chúng ta có thể hạn chế các lỗi tiềm tàng bằng cách sử dụng vòng lặp for-each như bên dưới:

 ![](https://images.viblo.asia/2b6cc444-0c34-4e52-afac-81c855bd2a49.png)

**8. Xử lý một cách hợp lý Null Pointer Exception.**
- Null Pointer Exception rất phổ biến trong Java. Lỗi này xảy ra trong khi cố gắng gọi một phương thức trên tham chiếu một đối tượng null. Ví dụ, nhìn dòng code dưới đây: 
 
 ![](https://images.viblo.asia/eca3202f-5ff0-4bd0-b4ac-98ad15183fa8.png)


- Dòng này không có bất kì lỗi nào, nhưng nếu một trong hai đối tượng “office” hoặc phương thức “listEmployees()” là Null thì chắc chắn sau đó code sẽ ném ra Null Pointer Exception. Null Pointer Exception là không thể tránh khỏi nhưng để xử lí nó tốt hơn, có một số cách sau cần tuân theo. Đầu tiên , điều quan trọng là kiểm tra quá trình thực thị Null trước khi chúng có thể được loại bỏ và sửa lại mã của bạn để chúng xử kí tốt hơn. 
Ví dụ như đoạn code dưới đây:
 
 ![](https://images.viblo.asia/6d8a7220-aa90-42f1-a0c4-c34c93b7f03e.png)


**9. Float or Double : the right choice? (Float hay Double : đâu là sự lựa chọn đúng đắn)**
- Thông thường các lập trình viên thiếu kinh nghiệm không thể phân biệt sự khác nhau giữa Double và Float, họ biết cơ bản nhưng khi sử dụng chúng, họ thường đi đến cùng một sự lựa chọn giống nhau cho tất cả các trường hợp. Vậy câu trả lời cho câu hỏi ở trên là gì? Hầu hết các bộ xử lý mất gần như nhau thời gian trong việc xử lý các hoạt động trên Float và Double nhưng Double mang lại độ chính xác cao hơn Float, đó là lí do tại sao cách tốt nhất là sử dụng Double khi độ chính xác là quan trọng, ngược lại sử dụng Float vì nó chỉ yêu cầu một nửa không gian so với Double


**10. Use of single quotes and double quotes (Sử dụng dấu nháy đơn và dấu nháy kép)**

- Tất cả chúng ta đều đã biết dấu nháy kép được sử dụng để thể hiện strings và dấu nháy đơn được sử dụng cho các kí tự nhưng trong một số trường hợp, nó có thể sai. Khi nó yêu cầu ghép các kí tự này thành một chuỗi., cách tốt nhất là hãy sử dụng dấu nháy kép. Lí do đằng sau việc này là bởi vì nếu sử dụng dấu nháy kép, các kí tự sẽ được coi là strings và sẽ chẳng có vấn đề gì xảy ra cả nhưng nếu bạn sử dụng dấu nháy đơn, các giá trị số nguyên của kí tự sẻ được xem xét do một quá trình được gọi là widening primitive conversion.

 ![](https://images.viblo.asia/e48ed241-9b2d-4e5f-ae53-18c3a0d90c7e.png)


- Như bạn có thể thấy ở đây, output đáng ra phải là ABCD nhưng bạn sẽ chỉ nhận được AB135 bới vì với AB thì mọi thứ đều ổn nhưng với C & D nằm trong dấu nháy đơn, thì giá trị ASCII của chúng được sử dụng và cộng với nhau do toán tử “+” dẫn đến kết quả AB135.

**11. Avoiding memory leaks (Tránh rò ri bộ nhớ)**

- Trong java, các nhà phát triển không có nhiều quyền kiểm soát việc quản lý bộ nhớ vì Java quản lý bộ nhớ một cách tự động. Tuy vậy, vẫn có những cách tốt được sử dụng bởi những lập trình viên hàng để giảm thiểu cũng như ngăn chặn rò ri bộ nhớ bởi vì nó có thể gây ra suy giảm hiệu suất khá đáng kể. Luôn luôn giải phóng các kết nối cơ sở dữ liệu sau khi truy vấn hoàn tất, sử dụng Finally block thường xuyên và giải phóng các instances được lưu trữ trong Static Tables là một trong nhưng cách hay nhất mà bạn phải thích ứng để tránh rò rỉ bộ nhớ

**12. Return Empty Collections instead of returning Null elements (Trả về Collections rỗng thay vì các phần tử Null)**

- Việc xử lí các phần tử null cần được làm việc thêm là bởi vì nếu một phương thức trả về một collection không có bất kì giá trị nào, cách tốt nhất là trả về một collection trống thay vì các phần tử null. Điều này sẽ bỏ qua các phần tử null giúp tiết kiệm việc kiểm tra không cần thiết trên các phần tử đó.

**13. Efficient use of String (Sử dụng hiệu quả các chuỗi)**
- String được xử lí rất dễ dàng ở trong Java nhưng bạn nên sử dụng nó một cách hợp lí để giảm thiểu truy cập bộ nhớ. Ví dụ, nếu String đươc ghép với nhau trong vòng lặp, một đối tượng String mới sẽ được tạo trong mỗi lần lặp. Nếu số lượng lặp là đáng kể, nó có thể là nguyên nhân dẫn đến hao phí bộ nhớ và sẽ làm tăng thời gian hoạt động. Trường hợp khác, khi bạn khởi tạo một đối tượng String, cách tốt nhất là tránh việc sử dụng contructors(hàm tạo) – chỉ khi bạn thực sự biết bạn đang làm gì mà thay vào đó hãy khởi tạo trực tiếp. Đó là cách nhanh hơn rất nhiều so với sử dụng hàm tạo.

 ![](https://images.viblo.asia/2bf6a414-6736-483f-96f5-beaa0de89687.png)
 
- Các bạn hãy thử nhìn vào kết quả bên trên, sự cách biệt là khá đáng kể đấy.

![](https://images.viblo.asia/6be0df92-9220-4716-a079-75dd783a77b1.png)

**14. Unnecessary Objects Creation (Khởi tạo đối tượng không cần thiết)**
- Khởi tạo đối tượng, là một trong những hàng động tiêu tốn bộ nhớ nhất đó là lí do tại sao cần tránh làm điều này không cần thiết và chỉ tạo khi được yêu cầu

**15. Proper Commenting (Comment thích hợp, có tính toán)**
- Như đã nói, code của bạn sẽ được đọc bới những người khác, sự hiểu biết về Java của họ cũng là khác nhau. Những comment thích hợp nên được sử dụng để mang đến cái nhìn tổng quan về code của bạn và cung cấp thêm thông tin về những thứ mà không thể nhận ra từ chính mã của mình. Các comment phải mô tả mã của bạn để nhưng người như QA, Tester đọc hoặc hỗ trợ cho việc bảo trì, mở rộng, nâng cấp sau này.

**Tóm lại**
- Java là một ngôn ngữ lập trình xuất sắc, các phương pháp hay nhất về viết mã java này sẽ đóng một vai trò quan trọng trong việc cải thiện kỹ năng của bạn. Cuối cùng, bạn sẽ có thể viết một mã hoạt động tốt hơn, nó sẽ dễ đọc hơn và được cấu tạo tốt hơn, đó là những thứ sẽ tạo nên một nhà phát triển hàng đầu.