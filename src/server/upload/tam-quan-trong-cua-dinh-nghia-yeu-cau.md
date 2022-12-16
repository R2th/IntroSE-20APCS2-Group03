Trong quy trình phát triển phần mềm, giai đoạn vô cùng quan trọng cần làm trước khi bắt đầu phát triển đó là phân tích yêu cầu. Đây là giai đoạn chúng ta làm rõ việc tại sao cần có hệ thống này, vai trò của hệ thống này là gì, những mong đợi của khách hàng đối với hệ thống. Sau khi hiểu rõ được những câu hỏi này thì chúng ta có thể biết được cần phải làm gì để tạo ra sản phầm đúng với mong muốn của khách hàng. Sau đây tôi sẽ giới thiệu về những việc quan trọng trong định nghĩa yêu cầu 

# Yêu cầu (Requirement) là gì
[Yêu cầu]
 
1. Công việc quan trọng
2. Điều kiện quan trọng
Nếu thử tra Google thì sẽ là “điều kiện cần thiết”.
Tóm lại, Định nghĩa yêu cầu là việc liệt kê yêu cầu và vấn đề của khách hàng, sau đó định nghĩa các “điều kiện cần thiết” để tạo ra hệ thống phải không?
# Các hạng mục sẽ định nghĩa trong tài liệu định nghĩa yêu cầu
Có rất nhiều nên tôi chỉ trích dẫn một số ví dụ

**Khái quát hệ thống**
* Bối cảnh của việc hệ thống hóa
* Mục đích ・ phương châm
* Phạm vi hệ thống hóa

**Yêu cầu chức năng**
* Flow nghiệp vụ
* Function list

**Yêu cầu phi chức năng**
* Performance
* Tính mở rộng

**Yêu cầu migration**
* Quy trình migration
* Thời điểm migration

**Vận hành ・ maintain**
* Cơ cấu vận hành
* Maintain

 
## Hạng mục đặc biệt quan trọng
Có nhiều hạng mục định nghĩa trong định nghĩa yêu cầu nhưng tôi nghĩ hạng mục đặc biệt quan trọng đó là "bối cảnh của việc hệ thống hóa" "mục đích, phương châm", "phạm vi", "flow nghiệp vụ".

Nói cách khác, những mục này vô cùng quan trọng, vì nếu hiểu sai chúng thì có thể sẽ làm hỏng toàn bộ công đoạn còn lại 
*  Tại sao cần phải hệ thống hóa?
* Vai trò của hệ thống là gì?
* Đang mong đợi gì trong hệ thống?
* Phạm vi muốn hệ thống hóa?

Việc làm rõ mục đích, và xác nhận ý hiểu giữa các bên, và giao tiếp là điều rất quan trọng để chúng ta không tạo nên một hệ thống “khác so với kỳ vọng”.

Nói ngoài lề một chút nhưng tôi nghĩ rằng ở ngành marketing cũng cần hiểu rõ những điều tương tự,
* Issue hiện tại là gì (bản chất của issue là gì?)
* Tại sao cần phân tích?
* Vai trò mà kết quả phân tích mang lại là gì?
* Muốn kết nối với đối sách nào?

Việc thống nhất ý hiểu ngay từ ban đầu là điều rất quan trọng.

Về flow nghiệp vụ thì điều đó là đương nhiên, nhưng bằng việc làm rõ công việc hiện tại và sắp xếp công việc đang thực hiện, chúng ta có thể có được cái nhìn tổng thể về quy trình cần thay đổi, hiệu quả được cải thiện và kiểu hệ thống nào sẽ được thực hiện. Đây là điểm tôi muốn bạn cần lưu ý.

Đây cũng là yếu tố quan trong để thống nhất ý hiểu với khách hàng.
## Khi thực hiện định nghĩa yêu cầu thì có cần kiến thức cơ bản về ngành nghề, nghiệp vụ không?
Khi thực hiện định nghĩa yêu cầu, cần phải trao đổi với với khách hàng, vì vậy cần hiểu được kiến thức cơ bản.

Nếu bất cứ cái gì bạn cũng hỏi lại rằng “đó có nghĩa là gì”  “đó là việc gì vậy” thì khách hàng sẽ vô cùng lo lắng.

Nói như vậy nhưng cũng có những điều chúng ta thật sự không hiểu, những từ chuyên ngành đặc biệt vì vậy những điều cần hỏi thì hãy hỏi một cách kỹ càng 
## Phân chia yêu cầu từ phía khách hàng
Trong khi trao đổi với khách hàng, sẽ có những yêu cầu không được mô tả trong RFP ban đầu
(Mở rộng mong muốn hơn).
Nếu thực hiện toàn bộ thì khách hàng sẽ rất hài lòng, nhưng cũng có trường hợp ngược lại, nếu thực hiện thì sẽ bị chậm kế hoạch giao hàng

Vì vậy, cần phải phân chia rõ
* Chức năng cần thiết
* Chức năng có thì tốt

Việc phán đoán này sẽ phán đoán tổng hợp dựa trên nguồn lưc, kế hoạch, ngân sách… để đưa ra quyết định.
Đặc biệt, trường hợp đang phát triển theo mô hình waterfall thì có thể bỏ lại yêu cầu chức năng để thực hiện sau được.

Trong định nghĩa yêu cầu, việc tìm ra chỗ bỏ bớt “ chức năng tốt ” (cả hai bên cùng thỏa thuận chứ không phải bất đắc dĩ) và sắp xếp lại các yêu cầu rất quan trọng
## Có thể quyết định tất cả các yêu cầu không?
Khi tiến hành phát triển hệ thống, sẽ thực hiện schedule định nghĩa yêu cầu ở giao đoạn khời đầu project.

Trong thời gian định nghĩa yêu cầu đó, việc quyết định toàn bộ yêu cầu có thể thực hiện được đối với dự án nhỏ, nhưng với các dự án lớn thì điều này vô cùng khó khăn.

Do đó, cần ưu tiên tiến hành những yêu cầu quan trọng có độ ưu tiên cao, những yêu cầu có ảnh hưởng đến tiến độ tiếp theo, và giảm mức độ ưu tiên đối với những yêu cầu dù có làm sau cũng không gây ảnh hưởng đến schedule (ví dụ những yêu cầu đơn giản). Việc hiểu rõ schedule tổng thể cũng vô cùng quan trọng.
## Cách làm rõ yêu cầu
Nếu chỉ confirm yêu cầu bằng miệng thì có khả năng ý hiểu cả 2 bên sẽ không khớp nhau.
Với những định nghĩa không rõ ràng, chẳng hạn như “ luồng dữ liệu chuỗi thời gian” và “ di chuyển trạng thái”, chúng ta có thể chuẩn bị tài liệu bổ sung như sample data để họp. Việc này giúp giảm thời gian trao đổi, và việc xác nhận ý hiểu cũng dễ dàng hơn.
## Trao đổi với ai?
Về cơ bản thì tôi nghĩ là sẽ tiến hành với “ người phụ trách project ” của khách hàng,
Cũng có trường hợp sẽ lấy ý kiến từ cấp trên, từ hệ thống thông tin, nơi làm việc...

Nếu nhận quyết định cuối cùng từ người phụ trách project thì cũng tốt, nhưng nếu trong quá trình làm rõ yêu cầu, chúng ta được nghe ý kiến từ người dùng tại nơi làm viêc, hoặc được tham gia các cuộc họp nghe ý kiến trực tiếp thì sẽ dễ dàng xác nhận ý hiểu và giảm thiểu rủi ro hơn
## Tính quan trọng của biên bản cuộc họp
Khi tiến hành định nghĩa yêu cầu thì một việc quan trọng khác đó là “biên bản cuộc họp”.
Biên bản cuộc họp được sử dụng như sau:
* Xem lại meeting/chia sẻ cho member
* Ghi chép xác nhận “ phê chuẩn ・ phủ quyết ・ bảo lưu ” về các vấn đề
* Ghi vào file quản lý vấn đề (ghi rõ deadline đối ứng(※))

(※) Cần ghi rõ người phụ trách, deadline đối với vấn đề phát sinh trong cuộc họp

Ngoài ra, với mục đích sử dụng quan trọng của biên bản họp là để tránh sau này có tranh luận qua lại về việc“ đã nói, không nói ” 

Nếu nảy sinh tranh luận qua lại sẽ rất khó xử lý, vì vậy cần ghi chép cẩn thận.
* Ghi yêu cầu cần thiết vào nội dung cuộc họp
* Ghi biên bản họp
* Chia sẻ biên bản họp với khách hàng
* Yêu cầu xác nhận biên bản họp (nếu cần thiết thì sẽ đọc và đóng dấu gửi lại)
## Others
Nên chuẩn bị sẵn template cho những tài liệu thường sử dụng như tài liệu định nghĩa yêu cầu, biên bản họp, bản kế hoạch, bảng quản lý vấn đề, tài liệu design...
Nếu có thể thì tạo template nội bộ cho toàn công ty.
Điểm lợi là
* Rút ngắn thời gian (không cần nghĩ đến format)
* Nâng cao chất lượng (giảm thiểu sai sót)
* Vì dùng chung trong công ty, giúp ích khi thay thế người (khi bị giao gấp dự án)

Tuy nhiên, để vận hành đúng cách, cần có người chịu trách nhiệm xây dựng, đánh giá các điểm cần cải thiện và đào tạo nội bộ để khuyến khích các thành viên sử dụng chúng, điều này sẽ gây ra nhiều trở ngại.

Nếu như chưa được template hóa thì chuẩn bị cho bản thân sử dụng cũng được.
# Tổng hợp
* Trong định nghĩa yêu cầu, làm rõ bối cạnh của việc hệ thống hóa, phương châm ・ mục đích ”, và thống nhất ý hiểu với nhau.
* Phân chia chức năng nếu có tốt và chức năng cần thiết
* Những mục cần thiết để không phát sinh tranh luận“đã nói vậy, chưa từng nói” thì cần ghi chép lại nội dung trong cuộc họp
* Hỏi những gì chưa hiểu, không để lại nghi vấn
* Cố gắng làm rõ những vấn đề cần thiết
* Không chỉ nghe ý kiến phụ trách project mà nên thu thập cả ý kiến của user
* Nên template hóa tài liệu
 
 
Tham khảo: https: //qiita. com/ryota_i/items/760cf496ec3631f37942