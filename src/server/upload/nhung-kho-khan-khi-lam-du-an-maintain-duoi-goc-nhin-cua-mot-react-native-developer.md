Đi làm một vài năm ở công ty outsource, minh thấy hầu như các anh em đều khá e ngại với các dự án maintain, nhất là thuộc hàng code "siêu thối", spec thuộc loại "siêu to khổng lồ ",... Và mình cũng thế, mình cũng đang "theo đuổi" một chú em với "chức năng siêu to khổng lồ". Chứng kiến dự án  "có người đến, có người đi, và có người ở lại" , mình cũng ngẫm thấy một chút "vị đời" gì đó.....

# 1. Sờ pếch dự án là...
Đối với một dự án outsource nào, vấn đề spec luôn là thứ quan trọng của cả dự án, nhất là đối với dự án lớn.
Dev thì soi spec để code, QA soi spec để test, và đôi khi là để "oánh nhau" (lol).

### 1.1 Mò spec...
Dự án mình đang làm, có một đợt, một phía dev khác được thuê ngoài vào code cùng. Sau một thời gian rút lui, không để lại gì ngoài "đống bùi nhùi code trơ trọi", làm anh em dự án khá đau đầu về khoản xây spec dư lào :(. Dev dùng app mà gặp những case không biết là spec như vậy hay code lỗi nữa...

### 1.2 Ngôn từ sử dụng
Mình đã từng gặp trường hợp dev, QA, BrSE có cách nhìn khác nhau về một vấn đề. Cái chính là ngôn từ mà mình dùng giao tiếp với nhau. Vậy nên, các khái niệm cơ bản nên thống nhất rõ ràng với nhau, viết nhất quán với nhau trong spec.

***Ví dụ như:*** Thế nào là Alert ? Thế nào là Toast? Khi nào thì trên app nên show alert, nên show toast.

Show alert khi báo cáo create account thành công, hay update profile thành công chẳng hạn.

Toast thì dùng khi mà thông báo đang chờ downloading file về, download success chẳng hạn. 

### 1.3 Khi mình là "tấm chiếu mới" tới
Một dự án mà spec thuộc loại siêu khủng, mấy "tấm chiếu mới" được join vào tiếp xúc chắc không khỏi bỡ ngỡ, liệu bao giờ mình đọc hết đống spec này để mà code chớ. Đừng lo, mình cũng từng như thế nè. Cứ tới ticket nào anh leader assign thì mình lại kiếm spec đọc dần dần, không hiểu thì mạnh dạn hỏi thôi, mình là "chiếu mới mà" :D, chứ sao mà tiêu hoá hết chỗ đó. Mà khả năng xấu là spec chưa đầy đủ, spec cũ rồi còn "thốn" nữa, chứ đọc rồi check hoạt động hiện tại rồi chủ động hỏi thoai hehe.

### 1.4 Update spec kịp thời
Mình nghĩ đây là điều cũng khá quan trọng. Khi làm đôi khi mình có những suggest đóng góp, khách hàng OK, nhờ BrSE note luôn spec, update history, anh em sau nhìn vào đỡ "cãi nhau".


# 2. Code dự án
### 2.1 Base dự án
Với những dự án đã chạy lâu năm, nếu khi xây base mà không nhìn nhận vấn đề tốt, thì sau việc maintain rất khó khăn. 

Không chỉ base, đôi khi chỉ là một function, nếu đặt theo cách tổng quát, sau này ta vẫn có cơ hội dùng lại hơn.

***Ví dụ:*** Mình có một base component dành cho việc select ảnh.
Ở 1 màn A, nếu select ảnh thì chỉ hiển thị ảnh tĩnh. Nhưng, từ màn B hay C lại được hiển thị all ảnh.

Mình có đọc được 1 cách xử lí của một bạn: bạn ý khi đi từ màn A tới màn select ảnh bạn ý truyền một bến typeScreen, nếu là màn A sẽ handle hide ảnh động, chỉ show ảnh tĩnh.

Cách làm tuy không sai, code vẫn chạy đúng, tuy nhiên, ở trường hợp này, nếu một màn D nào đó cũng có yêu cầu như màn A, mình lại phải sửa lại cả code ở màn select ảnh. 

Thay vì đó, mình có thể truyền vào 1 biến hideImageStatic chẳng hạn, lúc này, ở màn D chỉ cần truyền biến đó như màn A thôi


### 2.2 Code dư thừa
Nhiều khi, CR nối tiếp CR, sợ rằng sau dùng tới mà người làm CR không xoá code cũ đi, comment lại , người sau vào thấy khá "rén" : ủa sao lại có màn này mà không dùng nhỉ, code này sao phải comment dòng này vậy, log gì debug xong mà còn nhiều thế này... ? 

Vậy nên, anh em cố gắng code sạch, đẹp để anh em sau "hót" đỡ thắc mắc nhớ.

### 2.3 Code giống nhau ở every where.
Trong quá trình làm maintain, mình từng thấy có khá nhiều màn, code khá giống nhau, nhưng lại được viết ở rất nhiều chỗ. 

***Ví dụ như:***
Mình cần valid input nhập mail, mình có 3-4 màn dùng nó. Nhưng mỗi màn lại có một func validMail riêng.

Giả sử, cái code handle validMail đó của mình bị lỗi khi QA test 1 chức năng liên quan tới màn A thôi. Phía dev nhanh tay, tìm được một regex hợp lí, pass mọi trường hợp của QA. Nhưng đen cái, member đó mới vào dự án, thấy log màn A fix màn A thôi, mà không biết, còn B,C,D đang chờ fix.

Nhưng, nếu func này được viết ở một file ValidHelper nào đó, thì đã hay biết mấy...

Thế nên là, trường hợp này, code thì nên gọn gàng và khi vớ phải ticket kiểu như thế này, chúng ta nên check code và đưa ra một impact range chuẩn xác, tránh bị reopen ticket hay có quả boom nổ chậm dưới code. Tip của mình là valid mail rồi, chư search cụm "mail", "email" toàn app xem chỗ nào các cụ dùng...


### 2.4 Code lạc hậu quá rồi bạn ê... 

Ví dụ về "bộ môn" React Native, mình thấy các bác facebook rất chăm update làm mới, nên dự án của mình, dù mới được hai năm thôi, nhưng cũng thấy code có vẻ lạc hậu roài :(. 

Vậy nên, đôi khi cũng nên chịu khó update tin tức, làm mới bản thân xem thế giới dạo này như nào rồi...

RN 0.xx có lỗi này không biết tới RN 0.yy fix chưa nhỉ, thử phát cái nào...

### Tổng kết
 "Ai rồi cũng sẽ có lúc được maintain thôi" - theo mình nghĩ là thế (lol).
Thế nên trong lúc code, hãy code xanh, sạch, đẹp và flexible nhất có thể để có thể là giúp người code sau, hoặc chính chúng ta nhìn lại, không muốn "đấm" vào mặt mình mấy cái nhé =))) .