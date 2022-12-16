Bài viết được tham khảo từ nguồn:
https://www.stickyminds.com/article/shift-left-approach-software-testing

# **Tóm lược:**
Càng sớm phát hiện ra các vấn đề từ trong code, thì chúng càng có ít ảnh hưởng và chi phí khắc phục chúng càng ít hơn. Do đó, thật hữu ích khi thay đổi các hoạt động kiểm thử sớm nhất có thể trong vòng đời phát triển của phần mềm - dịch chuyển nó sang trái trong dòng thời gian xử lý. Bài viết này tìm hiểu phương pháp thay đổi bên trái và cách mà bạn có thể tiếp cận dịch chuyển trái trong tổ chức của mình.

Chiến dịch nhóm Agile và DevOps trong phương pháp dịch chuyển trái là việc di chuyển quá trình test quan trọng hơn thì nên test sớm hơn trong một vòng đời phát triển của phần mềm.

Có nhiều hoạt động test xảy ra vào cuối chu kỳ, trong đó có những bug/issue mất rất nhiều thời gian để tìm hiểu và giải quyết nó, chi phí cũng cao hơn để khắc phục chúng. Khi bạn đợi để thực hiện các hoạt động test sau này trong chu kỳ phát triển, các yêu cầu nghiệp vụ về phi chức năng của bạn, đặc biệt là kiểm tra bảo mật và hiệu suất, nó đã ăn sâu vào code đến nỗi tất cả những gì bạn thực sự có thể làm là vá chúng thay vì sửa chúng theo cách đúng.

Dịch chuyển quá trình test sang trái là việc xác định và ngăn ngừa các defect sớm hơn.

# Phát hiện và sửa defects trong phần mềm
Chiến lược test theo cách dịch chuyển sang trái được minh họa rõ ràng trong biển đồ có phần nổi tiếng từ Capers Jones, như bên dưới, cho thấy chi phí ngày càng tăng khi các lỗi được phát hiện muộn càng vào sâu trong mỗi giai đoạn phát triển phần mềm.

![](https://images.viblo.asia/19ec4fcd-370b-4ab4-b161-cbbcb06fa069.png)

Phần đầu tiên của biểu đồ cho thấy phần lớn các lỗi xuất hiện trong giai đoạn coding, đây là phần dự kiến.

Cho dù họ có làm ra mistake, hiểu sai các yêu cầu, hay không nghĩ đến thông qua việc phân chia một đoạn code cụ thể, các development đưa ra các lỗi khi code đã được tạo ra. Các defects cũng được đưa vào ứng dụng khi đến lúc khớp các mảnh lại với nhau, đặc biệt là nếu có nhiều nhóm tham gia (và khi các kiến trúc hiện đại như microservices trở nên phức tạp hơn).

Bây giờ, hãy để lớp phủ trên lớp phủ trên cùng một biểu đồ hiển thị khi tìm thấy lỗi (màu da cam). Hãy lưu ý rằng về cơ bản nó là nghịch đảo của dòng đầu tiên:

![](https://images.viblo.asia/78e74270-b3f1-4b72-b56d-eac6fe02160b.png)

Nhìn vào biểu đồ bạn thấy đáng ngạc nhiên, bởi vì thông thường bạn tìm thấy lỗi khi bạn bắt đầu quá trình testing, và có thể khó khăn nếu không có cơ sở hạ tầng thích hợp để bắt đầu quá trình test trước khi mọi thứ sẵn sàng. Nhưng những gì chúng ta cũng thấy ở đây là trong khi các bugs chủ yếu được tìm thấy trong giai đoạn đầu. Chi phí để sữa lỗi này là bao nhiêu?

Điều quan trọng là phải hiểu sự khác biệt trong chi phí để sửa chữa các defect ở mỗi giai đoạn phát triển. Điều này được thể hiện ở biểu đồ thứ 3:

![](https://images.viblo.asia/f967cb7c-0cfa-4f43-8edf-e4822842f94c.png)

Bây giờ nó bắt đầu trở nên thực sự thú vị, khi chúng ta thấy một sự tiến triển không mấy dễ chịu của chi phí làm tăng đáng kể các defects sau này được tìm thấy. Để một không công khai thông qua hệ thống sẽ tốn gấp bốn mươi lần chi phí khi tìm thấy lỗi đó trong quá trình coding, hoặc tốn kém gấp mười lần so với việc tìm ra lỗi tương tự trong quá trình unit test. Và nó trở nên đắt đỏ một cách lố bịch khi bạn nhìn vào những con số để cho các lỗi xuất hiện trong quá trình triển khai thực tế.

**Có một vài lý do cho sự leo thang chi phí này:**

*Thời gian và effort cần thiết để theo dõi vấn đề. Trường hợp thử nghiệm càng phức tạp thì càng khó tìm ra phần nào là phần gây ra lỗi thực sự.*

*Nhiệm vụ tái hiện lỗi là một thách thức đối với đội develop khi các hệ thống phụ thuộc vào cơ sở dữ liệu hoặc của bên thứ ba được đưa vào.*

*Tác động của sự thay đổi là cần thiết để khắc phục một defect. Nếu đó là một lỗi đơn giản, nó không quan trọng lắm, nhưng nếu bạn có nó ở nhiều nơi, bạn đã sử dụng sai framework, hoặc đã xây dựng code không đủ khả năng mở rộng cho sức chịu tải dự kiến hoặc có thể không được bảo mật, nó là một vấn đề lớn.*

# Những lý do đằng sau việc dịch chuyển trái

Bây giờ hãy nhìn vào đường màu cam ở biểu đồ bên dưới, vì nó minh họa một chu trình phát hiện lỗi được đề xuất dựa trên thử nghiệm trước đó. Bạn có thể thấy đường cong phát hiện màu cam ngày càng lớn hơn ở mặt chi phí thấp và nhỏ hơn ở mặt có chi phí cao, giúp chúng ta giảm chi phí khá đáng kể:

![](https://images.viblo.asia/5550ae31-0c01-4104-a592-0d1d2ab1c260.png)

Sự thay đổi này phụ thuộc vào một thực tiễn phát triển trưởng thành hơn, chẳng hạn như dựa trên cơ sở phát triển phần mềm kiềm tra kim tự tháp, tạo ra một bộ kiểm thử đơn vị bao gồm mã hợp lý, và người kiểm tra chức năng cùng với người kiểm tra API làm hết sức có thể để giảm thiểu sự phụ thuộc trong quá trình test ở cuối của chu kỳ, vì vậy bạn có đủ các case test thủ công và giao diện end user để chứng minh rằng mọi thứ đều đang hoạt động. Bằng cách này, các case test chu kỳ muộn là có để chứng minh các chức năng, không tìm thấy lỗi. “Test sớm, test thường xuyên” là một câu thần chú của các đội khi test bằng phương thức dịch chuyển trái.

Một số tổ chức dừng lại ở điểm này. Nhưng bạn thậm chí còn nhận được nhiều giá trị hơn khi bạn đẩy xa hơn nữa, vào chính những dòng code của mình. Rốt cuộc, đây chính là nơi mà các lỗi được tìm thấy đầu tiên, vì vậy hãy bắt đầu tìm kiếm lỗi ở đó trong khi quá trình phát triển vẫn đang hoạt động.

Đây là nơi chúng ta được hưởng lợi từ việc phân tích code tĩnh. Bạn có thể bắt đầu tìm lỗi trong giai đoạn coding thực tế, khi chi phí tìm lỗi thấp nhất có thể.

Việc tìm ra lỗi trước khi bắt đầu quá trình test không chỉ hiệu quả nhất về chi phí mà còn hiệu quả nhất về thời gian, bởi vì nó không để lại cho đội develop bất kỳ vấn đề nào khi cố gắng tái tạo lỗi hoặc hiểu các lỗi. Có thể thu nhỏ một chu kỳ khắc phục các defects từ vài ngày hoặc vài tuần đến vài giờ hoặc vài phút là rất hữu ích.

# Áp dụng phương pháp thay đổi bên trái
Làm thế nào để thay đổi phương pháp thay đổi trái? Vì lợi ích của sự ngắn gọn, cách tiếp cận thử nghiệm bên trái được chia thành hai hoạt động chính: Áp dụng các thực tiễn tốt nhất về phát triển và thử nghiệm và tận dụng ảo hóa dịch vụ để cho phép thử nghiệm liên tục.

Thực hiện các thực tiễn phát triển ở giai đoạn sớm hơn, như phân tích code tĩnh và unit test, giúp bạn xác định và ngăn ngừa các lỗi sớm hơn trong quy trình. Điều quan trọng cần nhớ là mục tiêu không phải là tìm lỗi, mà là giảm số lượng lỗi, đặc biệt là những lỗi sau khi đã release. Cuối cùng, việc tạo ra ít lỗi hơn ở nơi đầu tiên có giá trị nhiều hơn so với việc tìm kiếm nhiều lỗi hơn và nó rẻ hơn rất nhiều. Hãy cùng xem biểu đồ dưới đây:

![](https://images.viblo.asia/6f17bafe-ef80-4904-a018-a4570ddd6c1e.jpg)

Các tiêu chuẩn mã hóa là phần mềm tương đương với các tiêu chuẩn kỹ thuật và chúng là chìa khóa để giảm khối lượng lỗi (ngoài việc tìm ra các lỗi trước đó) và nhận được giá trị cao nhất từ sáng kiến dịch chuyển trái. Các tiêu chuẩn coding giúp bạn tránh được code xấu, nguy hiểm hoặc không an toàn thông qua phân tích mã tĩnh.

Để bảo mật cho phần mềm, điều đặc biệt quan trọng là làm cứng phần mềm của bạn. Bạn muốn xây dựng security vào code của mình, không phải test nó. Các tiêu chuẩn coding cho phép bạn xây dựng một ứng dụng an toàn hơn ngay từ đầu (nghĩa là làm cho nó an toàn theo design), đó là một ý tưởng tốt và là một yêu cầu.

Tiếp theo, bạn phải thực hiện quá trình test mà đã được tạo ở tất cả các giai đoạn của quá trình phát triển, bao gồm các giai đoạn sau và thực hiện chúng liên tục tiến về phía trước. Điều quan trọng đối với các nhóm đang áp dụng các thực tiễn phát triển nhanh để cung cấp phản hồi liên tục trong suốt quá trình phát triển. Quá trình Unit test có thể dễ dàng được thực hiện liên tục, nhưng việc dịch chuyển sang trái thực hiện các thử nghiệm chức năng giai đoạn sau thường khó khăn do phụ thuộc vào hệ thống bên ngoài. Đây là nơi bạn có thể tận dụng áo hóa dịch vụ cho phép thử nghiệm liên tục.

Ảo hóa dịch vụ cho phép bạn mô phỏng các hệ thống phụ thuộc có thể có sẵn hạn chế, chẳng hạn như máy tính lớn, dịch vụ của bên thứ ba hoặc hệ thống chưa sẵn sàng. Bằng cách mô phỏng chúng, bạn có thể thực hiện kiểm tra chức năng mà không cần có toàn bộ hệ thống và bạn có thể chuyển việc thực hiện phương pháp dịch chuyển trái cho máy tính đề bàn.

Về mặt kiểm tra performance, ảo hóa dịch vụ cho phép bạn kiểm tra trước khi mọi thứ sẵn sàng và không cần có một phòng thí nghiệm hoàn chỉnh về mọi thứ trong hệ thống. Bạn có thể chạy tất cả các loại kịch bản, nếu như máy chủ ứng dụng nhanh và cơ sở dữ liệu chậm (điều đó khó thực hiện trong thế giới thực)? Hoặc điều gì xảy ra nếu máy chủ bắt đầu đưa ra các lỗi hài hước, giống như lỗi 500 - điều đó sẽ ảnh hưởng đến hiệu năng hệ thống như thế nào? Bạn có thể đẩy hệ thống mạnh nhất có thể và hơn thế nữa, hãy thực hiện sớm nhất có thể.

Tương tự, bạn có thể bắt đầu thực hiện kiểm tra bảo mật sớm. Việc tách rời khỏi các hệ thống vật lý cho phép bạn làm một điều thậm chí còn thú vị hơn: Làm cho các hệ thống giả lập mô phỏng hoạt động theo kiểu xấu. Thay vì chỉ chọc vào hệ thống của bạn để tìm dữ liệu bị nhiễm độc và các cuộc tấn công từ chối dịch vụ phân tán, bạn có thể khiến hệ thống tràn ngập các gói tin, gửi dữ liệu không sử dụng bởi những kẻ tấn công. Vì vậy, bạn không chỉ có kiểm tra sớm hơn mà còn có thể kiểm tra sâu hơn nhiều so với khả năng của phòng thí nghiệm hoặc hệ thống sản xuất.

# Tránh sai lầm và bẫy

Một mối nguy hiểm trong việc chuyển phát hiện lỗi vào giai đoạn coding là vô tình đặt quá nhiều gánh nặng thử nghiệm lên đội develop. Điều quan trọng cần nhớ khi bạn nhìn vào biểu đồ là trong khi chi phí khắc phục defect tăng cao đáng kể khi bạn đi bên phải, thì các tài nguyên bên trái có thể có chi phí cao nhất trong bất kỳ vòng đời phần mềm nào không đề cập đến là bạn đưa họ đi từ tập trung vào việc phát triển chức năng.

Bạn không muốn tìm defect sớm hơn; bạn muốn giảm số lượng lỗi mà bạn đưa vào ứng dụng ngay từ đầu.

Và có một cái bẫy khác: Nếu bạn chủ quan vì mọi người đã tìm và sửa rất nhiều lỗi, nhưng bây giờ họ tìm được ít bug hơn - đó cũng là những gì mà bạn mong muốn. Đo lường được số lượng lỗi là số liệu tốt hơn rất nhiều.

# Cải thiện quy trình và sản phẩm

Bằng cách tận dụng các công nghệ kiểm thử phần mềm hiện đại, bạn có thể đạt được phần mềm một cách an toàn - đem đến sự hài lòng cho khách hàng, đáng tin cậy và bảo mật. Bằng cách thay đổi quá trình test còn lại trong vòng đời phát triển phần mềm, bạn có thể giảm chi phí test bằng cách tìm ra các lỗi trước đó, khi nó rẻ hơn, đồng thời giảm số lượng lỗi đưa vào code từ ngay giai đoạn đầu. Hãy thử phương pháp này để tiết kiệm thời gian, tiền bạc và công sức.