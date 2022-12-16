*Bài viết gốc: [デグレとは　種類や原因と共に、対策の考え方を解説](https://service.shiftinc.jp/en/column/4923/)*

---------------------------------
**Mục lục**
1. Degrade là gì?
2. Phân loại degrade
3. Nguyên nhân cơ bản phát sinh degrade
4. Đánh giá risk khi phát sinh degrade
5. Hướng xử lý degrade

## Degrade là gì?

Degrade được sử dụng trong ngành Công nghệ thông tin để chỉ về các trouble gây giảm sút chất lượng phần mềm, ví dụ như khi sửa một bug làm cho các phần khác - vốn dĩ đang hoạt động bình thường - bị ngừng hoạt động.

Trong ngành công nghệ thông tin Việt Nam hay Nhật Bản, degrade là thuật ngữ quen dùng để chỉ các vấn đề kiểu này, nhưng ở các nước nói tiếng Anh, từ "Regression" hay được sử dụng hơn. Theo định nghĩa của ISTQB - Standard Glossary of Terms used in Software Testing, degrade hay regression là sự suy giảm chất lượng thành phần hay hệ thống do các thay đổi gây ra.

## Phân loại degrade

Có rất nhiều loại degrade, tuy nhiên trong bài viết này sẽ phân thành 3 loại lớn tùy theo vị trí gây phát sinh degrade.

### Degrade do xử lý không đúng (bug) trong quá trình implement/chỉnh sửa program

Đây là loại degrade chúng ta gặp nhiều nhất.

Phạm vi ảnh hưởng của loại degrade này khác nhau tùy thuộc vào nội dung cũng như vị trí source code, có thể phát sinh ảnh hưởng không chỉ đối với chức năng liên quan trực tiếp mà còn đối với cả các chức năng khác.

Với degrade loại này, khi chỉnh sửa bắt buộc phải có sự tham gia của người phụ trách chức năng đã gây ra ảnh hưởng.

### Degrade do bị ảnh hưởng bởi những thay đổi của môi trường cơ sở hạ tầng

Đây là ví dụ về loại degrade tương đối "khó chịu" trong hệ thống bao gồm nhiều cơ sở hạ tầng hoặc kết hợp của nhiều dịch vụ khác nhau. Loại degrade này phát sinh không chỉ do việc thay đổi từng giá trị cài đặt môi trường riêng lẻ, mà còn có thể do việc nâng cấp phiên bản phần mềm trung gian hoặc thư viện, hoặc việc migrate môi trường. Trong các trường hợp này, phạm vi ảnh hưởng có xu hướng tương đối lớn, cần thận trọng trong việc phòng tránh phát sinh degrade bất ngờ ở  giai đoạn trước release.

### Degrade do debug không liên quan trực tiếp đến program

Trong phát triển hệ thống, ngoài việc implement xử lý để quyết định hành vi của phần mềm, có thể còn bao gồm cả xử lý được gọi là output log để debug. Ngay cả đối với các chức năng không ảnh hưởng trực tiếp đến khách hàng là người dùng cuối, ví dụ như chức năng output log này, nếu implement không chính xác cũng có thể phát sinh degrade. Ví dụ, nếu xuất quá nhiều log có thể gây ảnh hưởng đến sự ổn định của hệ thống, dẫn đến không thể thực hiện các xử lý thông thường được.

Ngoài ra, mặc dù là trường hợp hiếm gặp nhưng nếu xử lý lưu dữ liệu debug quá mức cần thiết mà không có đủ tính toán có thể gây mở rộng cơ sở dữ liệu hơn mức dự kiến, ngay cả các xử lý thông thường - vốn dĩ không liên quan đến debug - cũng có thể phát sinh lỗi. Điều này có thể khó xảy ra đối với môi trường PROD - môi trường chắc chắn phải đảm bảo được dung lượng cần thiết; tuy nhiên với môi trường STG - do có hạn chế nhất định về mặt dung lượng nên có thể xảy ra hiện tượng này, ít nhiều có thể gây hưởng hưởng xấu đến tiến độ dự án.

## Nguyên nhân cơ bản phát sinh degrade

Một số nguyên nhân cơ bản có thể kể đến như sau:

### Nguyên nhân do lỗi của người implement

Nguyên nhân đầu tiên có thể kể đến là do lỗi từ phía người implement, cụ thể ở đây là việc hiểu sai specs khi implement hoặc điều tra phạm vi ảnh hưởng dẫn đến xảy ra sai lầm hoặc thiếu sót. Hiểu lầm, hiểu sai là nguyên nhân trực tiếp, và điều này có thể thường đơn giản được coi là "vấn đề cá nhân mắc lỗi".

Tuy nhiên, nếu phân tích kỹ hơn một chút, có thể có những vấn đề không chỉ giới hạn ở sai lầm cá nhân, chẳng hạn như những vấn đề mang tính hệ thống hoặc những tình huống dễ xảy ra sai sót.

Dưới đây là một ví dụ cơ bản:
- Kỹ năng của người implement không phù hợp
- Phía review thiếu kỹ năng, phương pháp review chưa chuẩn

Các tình huống dễ mắc lỗi khi implement:
- Sức ép từ bên ngoài (phải hoàn thành trong thời gian ngắn, bị quản lý và can thiệp quá mức, làm việc vất vả quá mức...)
- Specs không rõ ràng, có thể hiểu theo nhiều cách khác nhau

Trên thực tế, cho dù có xây dựng đội hình phát triển hay quy tắc phát triển chuẩn chỉ đến mấy thì cũng rất khó để loại bỏ hoàn toàn những sai sót. Ngược lại, nếu để tình trạng sai sót thường xuyên xảy ra thì ko thể tránh khỏi viêc đối ứng bị chậm trễ, ảnh hưởng rất lớn đến tiến độ chung.

Do vậy, việc đầu tiên cần lưu tâm là phải tạo ra một đội ngũ và trạng thái phát triển khiến sai sót khó xảy ra. Sau đó, dựa trên tiền đề sai sót có thể xảy ra, cần cân nhắc các biện pháp để phát hiện và ứng phó nhanh chóng với degrade.

### Nguyên nhân do specs không được cập nhật hoặc maintain đầy đủ

Nếu các thông số kỹ thuật không được cập nhật mới nhất và chính xác nhất, có thể xảy ra tình huống "không thể xem xét chính xác dựa trên thông tin chính xác". Ngoài ra, nếu xem xét cụ thể hơn về nguyên nhân gây chậm trễ trong việc cập nhật/maintain specs, có thể thấy có các vấn đề sau:
- Rule cập nhật/maintain specs trong dự án không rõ ràng
- Đã đề ra rule cập nhật/maintain specs nhưng không được thực hiện triệt để
- Bản thân chính các rule cập nhật/maintain specs hiện tại có vấn đề

Key ở đây là phải thực hiện triệt để các rule cập nhật/maintain specs, tuy nhiên thực tế rất khó thực hiện nếu chỉ đơn thuần bằng cách kêu gọi các thành viên trong dự án.
Để các thành viên có thể tự mình hiểu và thực hiện thành thục các rule này, cần ghi nhớ một số điểm sau đây.
- Áp dụng phương pháp quản lý bắt buộc phía hệ thống phải cập nhật/maintain specs ở mức độ vừa đủ (không nên sa đà vào việc cập nhật realtime)
- Bằng cách kết hợp các rule vào quy trình chung, tạo ra trạng thái mà ở đó bất kỳ ai khác ngoài PIC phụ trách đều được khuyến khích cập nhật/maintain specs 
- Xem xét lại nếu có bất kỳ nội dung nào là nguyên nhân chính khiến các rule đã đề ra không được thực thi triệt để

### Nguyên nhân do sai sót trong quá trình communication

Tiến hành dự án không đơn thuần là những công việc đồng loạt, do đó kiểu gì cũng phát sinh sai lệch ở thời điểm cập nhật/maintain specs, rất khó để tự mỗi cá nhân nắm được thông tin mới nhất. Một trong những điều quan trọng là communication giữa các thành viên, nhưng trong quá trình đó, nếu các bên tiến hành công việc mà không xác nhận đầy đủ lẫn nhau về Q&A hay specs mới nhất, có thể dẫn đến degrade không mong muốn. Ngoài ra, đối với các dự án có nhiều vendor làm việc cùng nhau, degrade có thể xảy ra do vấn đề giao tiếp giữa các nhóm với nhóm, hoặc giữa các member trong nhóm.

Điều quan trọng là phải thiết lập quy tắc cho các vấn đề về communication, thế nhưng trên hết, cần tạo sự thông suốt trong dự án, đồng thời tạo ra cơ chế khiến mọi thành viên nhận thức được việc chia sẻ thông tin và xác nhận lẫn nhau sẽ có lợi cho nhau, qua đó giảm bớt rào cản giao tiếp trên phương diện môi trường và tâm lý.

## Đánh giá risk khi phát sinh degrade

Ngay cả khi biết rõ các nguyên nhân phát sinh như phân tích trên này, vì một lý do nào đó degrade vẫn có thể xảy ra. Ở đây sẽ đề cập đến những vấn đề phát sinh khi degrade xảy ra, tập trung vào những điểm có mức độ ảnh hưởng lớn và rủi ro cao.

### Đánh mất lòng tin của Khách hàng

Phát sinh degrade sẽ tạo ra tình huống mà những gì lẽ ra phải sử dụng được lại không thể sử dụng được. Tình trạng này trực tiếp dẫn đến mất lòng tin và tự tin tưởng của Khách hàng.

Một khi đã bị mất uy tín, Khách hàng có xu hướng đánh giá khắt khe hơn và yêu cầu khó hơn. Ngoài ra, nếu khách hàng là người dùng cuối thì có thể dẫn đến việc giảm số lượng người sử dụng dịch vụ.

### Phát sinh effort và chi phí ngoài dự kiến

Thông thường degrade sẽ được yêu cầu sửa ngay lập tức để ngăn chặn việc degrade hơn nữa ở thời điểm đó. Do vậy bắt buộc kèm theo việc điều tra và thử nghiệm đầy đủ về phạm vi ảnh hưởng cũng như các báo cáo cần thiết. Tuy nhiên, đối ứng trên này rõ ràng là đầu việc ngoài dự kiến, có thể cần đến effort và chi phí liên quan. 

Ngoài ra, không chỉ về khía cạnh công việc, lịch trình release hay giao hàng cũng sẽ bị xáo trộn rất lớn khi phát sinh degrade. Nếu đến hạn mà chưa xong - trường hợp của dự án ủy thác - có thể bị coi là vi phạm hợp đồng và không được chi trả, tùy trường hợp có thể bị yêu cầu bồi thường thiệt hại.

### Tái phát degrade

Việc phát sinh degrade có thể coi là kết quả của risk đã được thực tế hóa thành vấn đề mà ngay từ đầu risk đó đã bị che giấu. Nói cách khác, nếu có chỗ mà ngay từ đầu đã có rủi ro cao thì vấn đề tương tự có khả năng xảy ra lần nữa. Do vậy, việc sửa degrade cũng cần chính xác và thận trọng hơn mức bình thường.

Ngoài việc yêu cầu độ chính xác và chắc chắn, degrade đòi hỏi phải đối ứng khẩn cấp. Hơn thế nữa, vì đối ứng này là không mong muốn (nằm ngoài dự kiến), nó có xu hướng gây ra sự thiếu kiên nhẫn cho người hoặc nhóm người đối ứng, rất dễ phát sinh sai sót mang "tính chất con người".

Trong trường hợp đó, khả năng gây tái phát degrade sẽ tăng lên, có thể trở thành trạng thái "xoắn ốc tiêu cực" khi mà degrade phát sinh degrade. Khi đó, điều quan trọng là phải đối ứng hết sức thận trọng dựa trên thông tin chính xác, chứ không đơn thuần là đối ứng tạm để xử lý cho xong tình huống hiện tại.

## Hướng xử lý degrade

![](https://images.viblo.asia/ec00bd31-6d0d-4776-8818-5498dd93fcc1.png)

Hướng xử lý degrade tùy vào mục đích có thể chia thành 2 loại lớn sau:
- Biện pháp phòng ngừa để ngăn chặn phát sinh degrade
- Biện pháp đối phó để giảm thiểu mức độ ảnh hưởng khi degrade xảy ra

Vì bản thân degrade là ngoài dự kiến nên rất khó để ngăn chặn hoàn toàn. Nếu chấp nhận thực tế này và giả định rằng luôn có một số bug/degrade không mong muốn có thể xảy ra bất cứ khi nào... thì không chỉ các biện pháp phòng ngừa nhằm mục đích ngăn chặn sự xuất hiện của degrade mà các biện pháp đối phó để giảm thiểu mức độ ảnh hưởng cũng vô cùng cần thiết.

Ngoài ra, điều quan trọng khác nữa là phải xem xét mức độ hiệu quả của các biện pháp này và làm thế nào để có thể kiểm soát tốt chúng.

### Biện pháp phòng ngừa

Biện pháp phòng ngừa - cụ thể ở đây là xem xét các biện pháp hữu hiệu cho nguyên nhân gây ra degrade. 

Các biện pháp được giới thiệu ở đây rất cơ bản nhưng vô cùng quan trọng, bằng cách kết hợp một hoặc nhiều có thể giảm đáng kể việc phát sinh degrade.

**Tiêu chuẩn hóa việc quản lý**

*To be continued (Chi tiết sẽ được cập nhật thêm trong thời gian tới)*

**Điều tra phạm vi ảnh hưởng đầy đủ**

*To be continued (Chi tiết sẽ được cập nhật thêm trong thời gian tới)*

### Biện pháp đối phó

Biện pháp đối phó - chính là việc xem xét loại kiểm soát nào sẽ phát huy tác dụng cho đến thời điểm release cuối cùng - ngay cả khi tồn tại degrade.

Một số ví dụ có thể kể đến như test để phát hiện và xử lý trước degrade để không ảnh hưởng đến khách hàng, hoặc ngay cả khi không làm được như vậy, đánh giá xem biện pháp nào hiệu quả để giảm thiểu tối đa ảnh hưởng đến việc release.

Các biện pháp đối phó được giới thiệu dưới đây ngoài ưu điểm giúp dễ dàng hơn trong việc kiểm soát degrade, còn có ưu điểm rất lớn trong việc kiểm soát chất lượng hệ thống. 

**Regression testing**

*To be continued (Chi tiết sẽ được cập nhật thêm trong thời gian tới)*

**Continuous testing & Automated testing**

*To be continued (Chi tiết sẽ được cập nhật thêm trong thời gian tới)*

**Degrade Improvement**

*To be continued (Chi tiết sẽ được cập nhật thêm trong thời gian tới)*

**Release Control**

*To be continued (Chi tiết sẽ được cập nhật thêm trong thời gian tới)*

## Lời kết

Trên thực tế, không có biện pháp nào thực sự hoàn hảo để khẳng định chắc nịch rằng nếu làm như vậy sẽ không bao giờ phát sinh degrade, và chắc chắn degrade rất phiền toái. 

Tuy nhiên, nếu không đối mặt với nó và có những biện pháp phù hợp, sẽ có nguy cơ cao dẫn đến những rủi ro như đã giới thiệu phía trên này. 

Ngoài ra, rất khó để ngăn chặn degrade không xảy ra, do vậy điều cần thiết hơn là phải xem xét các biện pháp phòng ngừa và các biện pháp đối phó thích hợp.