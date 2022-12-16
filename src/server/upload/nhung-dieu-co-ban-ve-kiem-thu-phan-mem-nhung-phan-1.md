Kiểm thử là bước cuối cùng trong phát triển phần mềm. Việc thu thập yêu cầu, thiết kế cấp cao, thiết kế chi tiết, mã hóa, thực hiện thử nghiệm đơn vị, sau đó tích hợp và cuối cùng là  thử nghiệm. 
Vì hầu hết các dự án đều chậm tiến độ, bạn nghĩ gì nếu bị cắt dự án? Hàm ý là chúng ta cung cấp các sản phẩm có lỗi, làm khác hàng tức giận và đưa họ đến các sản phẩm của đối thủ cạnh tranh.

Quá trình thử nghiệm tốt nhất luôn bao gồm kiểm tra mã hóa. Tuy nhiên, kiểm tra thường chỉ tìm thấy 70% lỗi của hệ thống, do đó, một chế độ kiểm tra đặc biệt là hoàn toàn cần thiết. Kiểm tra giống như một hệ thống sổ sách kế toán kép đảm bảo những sai lầm không bị rò rỉ vào sản phẩm được triển khai.

Trong thế giới phần mềm, thử nghiệm là bước nhỏ rắc rồi. Không ai thích làm việc này. Thời gian viết kịch bản để thử nghiệm có vẻ lãng phí, mặc dù thực tế thử nghiệm là một phần quan trọng của tất cả các ngành kỹ thuật. Nhiều giai đoạn của cộng đồng thiết kế hệ thống nhúng đã chấp nhận thử nghiệm như là một phần cốt lõi trong quy trình của họ, và ủng hộ việc tạo thử nghiệm đồng bộ bằng cách viết mã hóa, họ nhận ra rằng bỏ qua một bước quan trọng cho đến khi kết thúc dự án là điên rồ.

### So sánh Thử nghiệm ứng dụng với Thử nghiệm nhúng

Kiểm thử phần mềm hệ thống nhúng có nhiều điểm chung với kiểm thử phần mềm ứng dụng. Vì vậy, phần lớn ở bài viết là một bản tóm tắt các khái niệm và thuật ngữ thử nghiệm cơ bản. 
Tuy nhiên, có một số khác biệt quan trọng giữa thử nghiệm ứng dụng và thử nghiệm hệ thống nhúng:

- *Các nhà phát triển nhúng thường có quyền truy cập vào các công cụ kiểm thử dựa trên phần cứng, việc này thường không được sử dụng trong phát triển ứng dụng.*
- *Ngoài ra, các hệ thống nhúng thường có các đặc điểm độc đáo cần được phản ánh trong kế hoạch kiểm tra. Những khác biệt này có xu hướng cung cấp cho các hệ thống nhúng cách thử nghiệm đặc biệt riêng của nó.*

Bài viết này trình bày các khái niệm cơ bản về kiểm thử và phát triển trường hợp thử nghiệm và chỉ ra các điểm khác biệt cho các hệ thống nhúng hoạt động

### Tại sao thử nghiệm?
Trước khi bạn bắt đầu thiết kế thử nghiệm, điều quan trọng là phải hiểu rõ lý do tại sao bạn thử nghiệm. Việc hiểu rõ ảnh hưởng đến những thử nghiệm nào bạn dùng nhiều lần và (quan trọng hơn) là làm thế nào bạn có thể bắt đầu thử nghiệm sớm nhất. Nói chung, bạn kiểm tra vì bốn lý do:
- Để tìm lỗi trong phần mềm (thử nghiệm là cách duy nhất để làm điều này)
- Để giảm rủi ro cho cả người dùng và công ty
- Giảm chi phí phát triển và bảo trì
- Để cải thiện hiệu suất

**Tìm lỗi**

Một trong những kết quả quan trọng đầu tiên từ lý thuyết khoa học máy tính là một bằng chứng (được gọi là Định lý dừng) mà không thể chứng minh rằng một chương trình tùy ý là chính xác.

**Giảm chi phí.**

Một thực tế đã được HP thử nghiệp trong 1 năm cho thấy. Chi phí để sửa lại những sai sót trong phần mềm là 400 triệu đô la. Đây là khoản chi phí khổng lồ, đã làm thay đổi hoàn toàn suy nghĩ về việc giảm chi phí sửa chữa trong viết phần mềm
Việc tìm kiếm được các lỗi sớm sẽ ít tốn kém hơn là việc sửa chữa chúng. Chi phí tìm lỗi và lỗi trong một sản phẩm được phát hành cao hơn khá nhiều so với trong quá trình thử nghiệm đơn vị, ví dụ (Hình 1 bên dưới).

![](https://images.viblo.asia/af0f8905-7231-4548-b9e3-cf11c9a34be1.jpg)
*Hình 1: Chi phí để khắc phục vấn đề. Biểu đồ đơn giản hiển thị chi phí để khắc phục sự cố dưới dạng hàm của thời gian trong vòng đời sản phẩm khi tìm thấy lỗi.*

**Cải thiện hiệu suất**

Thử nghiệm tối đa hóa hiệu suất của hệ thống. Việc tìm kiếm và loại bỏ mã chết và mã không hiệu quả có thể giúp đảm bảo rằng phần mềm sử dụng toàn bộ tiềm năng của phần cứng 

### Khi nào và làm thế nào để thử nghiệm?

Nhìn từ biểu đồ ở hình 1, thì chúng ta thấy rằng, thử nghiệm nên bắt đầu càng sớm càng tốt. Thông thường, các thử nghiệm sớm nhất là các thử nghiệm mô-đun hoặc đơn vị được thực hiện bởi nhà phát triển ban đầu. (Unit test)
Thật không may, vài nhà phát triển có hiểu biết về việc thử nghiệm để xây dựng một bộ các trường hợp thử nghiệm toàn diện. Bởi vì các trường hợp thử nghiệm được xây dựng cẩn thận thường không được sử dụng cho đến khi thử nghiệm tích hợp; nhiều lỗi có thể được tìm thấy trong quá trình kiểm tra đơn vị không được phát hiện cho đến khi thử nghiệm tích hợp.

**Kiểm tra đơn vị (Unit testing)**

Cá nhân các nhà phát triển kiểm tra ở cấp mô-đun bằng cách viết sơ lược mã để thay thế cho phần còn lại của hệ thống phần cứng và phần mềm. Tại giai đoạn này trong chu kỳ phát triển, các trường hợp thử nghiệm tập trung vào hiệu suất logic của mã.
Thông thường, các nhà phát triển thử nghiệm với một số giá trị trung bình, một số giá trị cao. Tuy nhiên, những trường hợp thử nghiệm có nguồn gốc “hộp đen” này chỉ thử nghiệm được một phần nhỏ trong tổng số mã lệnh trong mô-đun.

**Kiểm tra hồi quy (Regression Testing)**
 
 Thử nghiệm một lần là không đủ. Mỗi khi chương trình được sửa đổi, nó phải được kiểm tra lại để đảm bảo rằng các thay đổi không vô tình "phá vỡ" một số phần không liên quan.

Được gọi là thử nghiệm hồi quy, các thử nghiệm này thường được tự động thông qua một tập lệnh thử nghiệm. Ví dụ, nếu bạn thiết kế một bộ kiểm tra đầu vào / đầu ra (I / O), tập lệnh thử nghiệm hồi quy sẽ tự động thực hiện 100 phép thử và so sánh đầu ra với bộ kết quả “tiêu chuẩn”. Mỗi lần thay đổi được thực hiện cho bất kỳ phần nào của mã, bộ hồi quy đầy đủ chạy trên cơ sở mã đã sửa đổi để đảm bảo rằng một phần khác không liên quan không bị ảnh hưởng trong quy trình.

### Thử nghiệm những gì?
Không có bất kỳ thử nghiệm thực tế nào có thể chứng minh một chương trình chính xác, vấn đề chính đó là tập con của các trường hợp thử nghiệm có xác suất phát hiện nhiều lỗi nhất. Vấn đề chọn các trường hợp thử nghiệm thích hợp được gọi là thiết kế trường hợp thử nghiệm.

Mặc dù hàng chục chiến lược tồn tại để tạo ra các trường hợp thử nghiệm; chúng có xu hướng rơi vào hai phương pháp tiếp cận cơ bản khác nhau đó là: kiểm tra chức năng và kiểm tra mức độ phù hợp.
- Kiểm tra chức năng (còn được gọi là kiểm thử hộp đen): chọn các thử nghiệm mà đánh giá mức độ đáp ứng các yêu cầu kỹ thuật được đề ra.
- Kiểm tra mức độ phù hợp (còn được gọi là kiểm tra hộp trắng): chọn các trường hợp ít nhiều gây ra một số phần nhất định của mã được thực hiện. 

Cả hai loại thử nghiệm đều cần thiết để kiểm tra kỹ lưỡng thiết kế nhúng. 
- Kiểm tra mức độ phù hợp nghĩa là: Kiểm tra độ ổn định của mã hóa, vì vậy nó được dành riêng để thử nghiệm một sản phẩm hoàn chỉnh hoặc gần như đã hoàn thành. 
- Kiểm tra chức năng thì khác, nó có thể được viết song song với các tài liệu yêu cầu.
Trong thực tế, thường các bài kiểm tra chức năng sẽ được viết và thực hiện trước

Mọi người đều đồng ý rằng các bài kiểm tra chức năng có thể được viết đầu tiên, nhưng cũng có một ví dụ chứng minh rằng sự kết hợp giữa  các chiến lược thử nghiệm chức năng và thử nghiệm mức độ phù hợp:
1. Xác định các chức năng nào KHÔNG được bao phủ đầy đủ bởi các bài kiểm tra chức năng.
2. Xác định phần nào của từng chức năng chưa được thực hiện.
3. Xác định các bài kiểm tra bảo hiểm bổ sung là bắt buộc.
4. Chạy thử nghiệm bổ sung mới.
5. Lặp lại.


### Khi nào ngừng thử nghiệm?
Việc thử nghiệm phụ thuộc vào một số tiêu chí được xác định từ trước: chính là Kế hoạch thử nghiệm, và kế hoạch phát hành sản phẩm
Nếu hệ thống được thiết kế cho các ứng dụng quan trọng, mức độ bạn phải kiểm tra mã của mình sẽ được ghi rõ trong tài liệu
Các tiêu chí dừng được sử dụng phổ biến nhất (theo thứ tự độ tin cậy) là:

- Khi ông chủ nói dừng thử nghiệm
- Khi đã thử nghiệm lặp lại nhiều lần, và số lỗi phát hiện ít hơn một số N (nào đó) lỗi mới
- Khi đến một ngưỡng bảo đảm nhất định mà không phát hiện ra bất kỳ lỗi mới nào

Dù chúng ta đã thử nghiệm rất kỹ lưỡng chương trình của mình, nhưng không bao giờ có thể chắc chắn rằng mình đã tìm thấy tất cả các lỗi. Điều này là đáp ăn cho một câu hỏi thú vị: Bạn có thể bỏ qua được bao nhiêu lỗi?

Giả sử rằng trong quá trình thử nghiệm ứng dụng phần mềm, bạn thấy rằng hệ thống bị khóa khoảng 20 giờ kiểm tra. Bạn kiểm tra mã nhưng không thể tìm ra nguyên nhân gốc của lỗi. Bạn có nên bàn giao sản phẩm hay không?

Bao nhiêu thử nghiệm là "đủ tốt"? Câu hỏi này rất khó để trả lời. Nó sẽ tốt hơn nếu có quy tắc thử nghiệm theo thời gian: “nếu phương pháp Z ước tính có ít hơn X lỗi trong dòng mã Y, thì chương trình của bạn sẽ an toàn để phát hành.” Chúng ta mong chờ có thể sẽ có một ngày như vậy. 

Ngành công nghiệp lập trình còn khá trẻ, do đó chưa có nhiều tài liệu thống kê, thu thập để đánh giá, ước lượng được việc thử nghiệm bao nhiêu là đủ, nhưng tin rằng trong tương lai, ngành lập trình có thể làm được điều đó

### Lựa chọn trường hợp kiểm tra
Trong điều kiện lý tưởng, bạn muốn kiểm tra mọi hành vi có thể có trong chương trình của mình. Điều này có nghĩa kiểm tra mọi kết hợp đầu vào có thể có, hoặc mọi đường dẫn quyết định có thể có ít nhất một lần được kiểm tra
Đây là một mục tiêu vĩ đại, nhưng hoàn toàn không thực tế, bởi vì mất quá nhiều thời gian để thực hiện được hết các trường hợp thử nghiệm đó. 

Rõ ràng, điều kiện lý tưởng là ngoài tầm với, vì vậy phải tương đương hóa lý tưởng này. Như bạn sẽ thấy, kết hợp thử nghiệm chức năng và thử nghiệm tích hợp là phù hợp. Cách tiếp cận cơ bản là để chọn các bài kiểm tra một số chức năng, một số phạm vi để bảo đảm xác suất tìm ra lỗi là cao nhất.

**Kiểm tra chức năng. (Functional Test)**

Kiểm tra chức năng thường được gọi là thử nghiệm hộp đen vì các trường hợp thử nghiệm cho các chức năng được đưa ra mà không tham chiếu đến mã thực tế — tức là không nhìn vào bên trong hộp.

Một hệ thống nhúng có đầu vào và đầu ra và giữa chúng là việc thực hiện một số thuật toán. Kiểm tra hộp đen dựa trên những gì được biết về đầu vào nào được chấp nhận và cách chúng sẽ ảnh hưởng đến đầu ra. Kiểm tra hộp đen không biết gì về cách giải thuật được thực hiện. Ví dụ của kiểm tra hộp đen bao gồm:

- Thử nghiệm tải (Stress tests): Thử nghiệm quá tải kênh đầu vào, bộ đệm bộ nhớ, bộ điều khiển đĩa, hệ thống quản lý bộ nhớ, v.v.
- Thử nghiệm giá trị biên (Boundary value tests) : Truyền vào giá trị đại diện cho “ranh giới” trong từng phạm vi cụ thể, và giá trị đầu vào sẽ khiến đầu ra chuyển đổi qua ranh giới tương tự ở phạm vi đầu ra.
- Thử nghiệm ngoại lệ (Exception tests): Các thử nghiệm sẽ kích hoạt chế độ lỗi hoặc chế độ ngoại lệ.
- Đoán lỗi (Error guessing): Kiểm tra dựa trên trải nghiệm trước đó với phần mềm kiểm tra hoặc từ thử nghiệm các chương trình tương tự.
- Thử nghiệm ngẫu nhiên (Random tests): Hình thức thử nghiệm này  ít hiệu quả nhất nhưng vẫn được sử dụng rộng rãi để đánh giá độ mạnh của giao diện người dùng.
- Thử nghiệm hiệu suất (Performance tests): Bởi vì kỳ vọng hiệu suất là một phần của yêu cầu sản phẩm, nên  phân tích hiệu suất nằm trong phạm vi kiểm tra chức năng.

Vì các phương pháp kiểm tra hộp đen chỉ phụ thuộc vào các yêu cầu của chương trình và hành vi I / O của nó, chúng có thể được phát triển ngay sau khi các yêu cầu được hoàn thành. Điều này cho phép các trường hợp thử nghiệm hộp đen được phát triển song song với phần còn lại của thiết kế hệ thống.
Giống như tất cả các thử nghiệm, các thử nghiệm chức năng phải được thiết kế để phá hoại, nghĩa là, để chứng minh chương trình không hoạt động. 

**Kiểm tra mức độ phù hợp**

Điểm yếu của thử nghiệm chức năng là nó hiếm khi thực hiện tất cả các mã. Thử nghiệm mức độ phù hợp cố gắng tránh điểm yếu này bằng cách (lý tưởng) đảm bảo rằng mỗi câu lệnh mã, điểm quyết định hoặc đường dẫn quyết định được thực hiện ít nhất một lần. 

Kiểm tra mức độ phù hợp còn được gọi là kiểm tra hộp trắng hoặc kiểm tra hộp kính, kiểm thử được đưa ra với đầy đủ kiến thức về cách phần mềm được triển khai, có nghĩa là, với sự cho phép “nhìn vào bên trong hộp.” Kiểm tra hộp trắng được thiết kế với mã nguồn dễ vận dụng.
Dựa vào khai thác kiến thức của lập trình viên về API trong chương trình, cấu trúc kiểm soát nội bộ và khả năng xử lý ngoại lệ. Bởi vì kiểm tra hộp trắng phụ thuộc vào các quyết định triển khai cụ thể, nên chúng không thể được thiết kế cho đến sau khi mã được viết.

Từ quan điểm của hệ thống nhúng, thử nghiệm mức độ phù hợp là loại thử nghiệm quan trọng nhất bởi vì số lượng mã lệnh đã được thực hiện là một yếu tố dự báo tuyệt vời về nguy cơ các lỗi không bị phát hiện mà bạn sẽ gặp phải sau này. Ví dụ của kiểm tra hộp trắng bao gồm:

- Bao phủ câu lệnh  (Statement coverage): Các trường hợp kiểm thử được chọn vì chúng thực hiện mọi câu lệnh trong chương trình ít nhất một lần.
- Bao phủ phạm vi nhánh (Decision or branch coverage): Các trường hợp kiểm tra được chọn vì chúng gây ra mọi nhánh (cả đường dẫn đúng và sai) sẽ được thực thi ít nhất một lần.
- Bao phủ điều kiện (Condition coverage): Các trường hợp kiểm tra được chọn để buộc mỗi điều kiện (thuật ngữ) trong một quyết định nhận tất cả các giá trị logic có thể có.

Về mặt lý thuyết, một thử nghiệm hộp trắng có thể khai thác hoặc điều khiển bất cứ điều gì cần thiết để tiến hành thử nghiệm. Thực tế hơn, thử nghiệm hộp trắng có thể phân tích đường dẫn thực hiện được  bằng cách phân tích logic.

**Kiểm tra hộp xám**

Bởi vì các thử nghiệm hộp trắng có thể được kết nối mật thiết với nội bộ của mã, chúng có thể tốn kém hơn để duy trì so với các thử nghiệm hộp đen. Trong khi các kiểm tra hộp đen vẫn hợp lệ miễn là các yêu cầu và các mối quan hệ I / O vẫn ổn định, các kiểm tra hộp trắng có thể cần phải được thiết kế lại mỗi khi mã lệnh được thay đổi.
Do đó, các trường hợp thử nghiệm hộp trắng hiệu quả nhất thường là những người khai thác kiến thức về việc thực thi chương trình mà không bị ràng buộc mật thiết với các chi tiết mã hóa.

Các thử nghiệm khi mà chỉ biết một chút về cấu trúc bên trong chương trình được gọi là xét nghiệm hộp xám. Kiểm tra hộp xám có thể rất hiệu quả khi kết hợp với “đoán lỗi”. Nếu bạn biết, hoặc ít nhất là nghi ngờ, nơi các điểm yếu nằm trong mã hóa, bạn có thể thiết kế các bài kiểm tra nhấn mạnh những điểm yếu đó.

Các thử nghiệm này là hộp xám vì chúng bao gồm các phần cụ thể của mã; họ đoán lỗi bởi vì họ được chọn dựa trên phỏng đoán về những lỗi nào có khả năng xảy ra.
Chiến lược thử nghiệm này hữu ích khi bạn tích hợp chức năng mới với cơ sở mã hóa đã tồn tại ổn định. Vì cơ sở mã đã được kiểm tra tốt, nên bạn nên tập trung nỗ lực thử nghiệm vào khu vực nơi mã mới và mã cũ kết hợp với nhau.

Tài liệu tham khảo:
https://www.embedded.com/design/other/4212929/The-basics-of-embedded-software-testing
(Bài viết chưa được hoàn thiện, mọi người theo dõi tiếp phần 2 nhé ạ)