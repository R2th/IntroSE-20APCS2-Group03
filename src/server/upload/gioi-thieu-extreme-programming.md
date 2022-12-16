Trong số các phương pháp Phát triển Phần mềm Linh hoạt (gọi tắt là Agile) thời kì đầu, chỉ duy nhất có eXtreme Programming (viết tắt XP) là tập trung mọi nỗ lực vào các biện pháp kĩ thuật (technical practices) để làm ra phần mềm chất lượng. Cho đến ngày nay, các kĩ thuật trong XP đã trở nên phổ biến và không thể thiếu, như TDD, Pair-programing, daily standup, refactoring, simple design, chuyển giao liên tục và tích hợp liên tục CI.

Mục đích cuối cùng của XP là phát triển những phần mềm với chất lượng cao nhất, với chi phí thấp nhất, ít lỗi nhất, siêu năng suất và tối đa hóa lợi nhuận đầu tư (chữ Extreme). XP làm điều này thông qua các các giá trị định hướng (values), nguyên tắc (principles) và kĩ thuật thực hành(Practices) đặc thù theo định hướng của triết lí Agile.

**1. Các giá trị cốt lõi của XP**
* Giao tiếp (Communication): mọi người trong nhóm trao đổi trực diện hằng ngày, trong tất cả các công việc từ phân tích yêu cầu cho tới lập trình
* Tính đơn giản (Simplicity): chỉ làm những gì cần thiết, không hơn. Làm những gì cần thiết cho thì hiện tại, không phải tương lai quá xa, với những bước nhỏ để cán đích và giản lược tối đa các sai hỏng.
* Phản hồi (Feedback):  cam kết nghiêm túc để liên tục bàn giao các phần mềm chạy tốt vào cuối các phân đoạn (iteration) ngắn. Luôn có thể demo phần mềm chạy tốt từ sớm và thường xuyên, lắng nghe phản hồi từ các bên và thực hiện các điều chỉnh cần thiết.
* Tôn trọng (Respect): mọi người tự cảm thấy và được tôn trọng vì họ là những thành viên quan trọng của nhóm. Mỗi người đều đóng vai trò vào việc tạo ra các giá trị không kể công việc như thế nào.
* Can đảm (Courage): luôn nói đúng về tiến độ và ước lượng. Không cần thiết phải sợ điều gì bởi vì thành viên không làm việc cô độc. Mỗi khi có thay đổi, nhóm sẽ có các hành động cần thiết để thích ứng. Can đảm trong việc vứt đi những gì không thực sự cần thiết nữa (mã nguồn, giấy tờ …) 

**2. Các nguyên tắc XP**
Ken Beck, một trong những người được coi là cha đẻ của XP, đã mô tả các nguyên tắc cơ bản của XP trong cuốn sách “Extreme Programming Explained: Embrace Change”,  gồm:

* Phản hồi nhanh(Rapid Feedback): luôn lắng nghe phản hồi từ  nhiều phía, lấy được phản hồi một cách nhanh nhất, tìm hiểu chúng và đưa những hiểu biết đó vào trong hệ thống nhanh nhất có thể. Lập trình viên có thể học được cách thiết kế, lập trình, kiểm thử tốt nhất trong phạm vi từng phút chứ không phải hằng ngày, tuần hoặc thậm chí hằng tháng.
* Giả định Đơn giản(Assume Simplicity): Đối xử với các vấn đề như thể chúng có thể giải quyết bằng những giải pháp đơn giản đến ngớ ngẩn. Đây có thể là nguyên lí khó “xơi” nhất của XP.
* Thay đổi tiệm tiến(Incremental Change): không thay đổi cả “lố”, mà chỉ thay đổi một ít trong thiết kế, chức năng.
* Sống chung với Thay đổi(Embracing Change): chiến thuật tốt nhất là tôn trọng tất cả các khả năng trong khi giải quyết các vấn đề áp lực nhất.
* Công việc chất lượng cao(Quality Work): phải luôn đầu tư để có được chất lượng công việc cao nhất, đến mức “hoàn hảo”. 

Ngoài ra, có những nguyên tắc mở rộng khác cũng góp phần tham gia quy định và điều chỉnh các hoạt động của đội ngũ phát triển, gồm:
* Dạy lẫn nhau (Teach Learning)
* Đầu tư ban đầu tối giản (Small Initial Investment)
* Chơi để thắng (Play to Win)
* Thử nghiệm cụ thể (Concrete Experiments)
* Giao tiếp mở và trung thực (Open, honest Communication)
* Làm việc phù hợp với bản năng của con người, không phải chống lại chúng (Work with people’s instincts – not against them)
* Các trách nhiệm được thừa nhận (Accepted Responsibility)
* Thích ứng cục bộ (Local Adaptation)
* Di chuyển nhẹ nhàng (Travel Light)
* Độ đo trung thực (Honest Measurement)

**3. Các kĩ thuật thực hành**
XP sử dụng 12 cách thức thực hành được sử dụng trong quá trình phát triển phần mềm, gồm:

* Trò chơi Lập kế hoạch(The Planning Game) — nhanh chóng xác định phạm vi của lần phát hành (release) tới bằng cách kết hợp những ưu tiên nghiệp vụ (business priorities) và ước lượng kĩ thuật (technical estimates). Khi thực tiễn có những tác động tới kế hoạch, cập nhật kế hoạch. Trò chơi Lập kế hoạch được sử dụng cả trong việc lập kế hoạch phát hành (Release Planning) lẫn lập Kế hoạch Phân đoạn (Iteration Planning).
* Các bản phát hành nhỏ(Small releases) — Đưa hệ thống vào trạng thái sản xuất (production, đối lập với trạng thái “development” – phát triển), rồi phát hành phiên bản mới vào cuối mỗi vòng đời ngắn.
* System Metaphor(Ẩn dụ Hệ thống) — Hướng dẫn tất cả quá trình phát triển bằng những câu chuyện chia sẻ đơn giản về cách mà hệ thống sẽ làm việc. Đó có thể là một hệ thống những khái niệm về những lớp, phương thức để giúp thành viên đội phát triển dễ dàng đoán được chức năng nó thực hiện.
* Thiết kế Đơn giản(Simple design) — Hệ thống cần được thiết kế đơn giản nhất có thể tại bất kì thời điểm nào. Mỗi khi phát hiện ra chỗ nào phức tạp, cần loại bỏ ngay tức thì.
* Kiểm thử(Testing) — Lập trình viên thường xuyên viết các kiểm thử đơn vị (unit tests) trong khi  phát triển, còn khách hàng thì viết ra những bài kiểm thử để xác định điều kiện hoàn thành cho mỗi tính năng.
* Tái cấu trúc(Refactoring) — Lập trình viên tái cấu trúc hệ thống mà không làm ảnh hưởng đến hoạt động của hệ thống để loại bỏ các trùng lặp, dư thừa, để cải thiện tính giao tiếp, đơn giản và gia tăng sự linh hoạt của hệ thống.
* Lập trình theo cặp(Pair programming) — Tất cả các đoạn mã sản xuất (production code, phân biệt với “test code”-các mã lệnh viết ra để kiểm thử) phải được viết bởi hai lập trình viên trên mỗi máy tính.
* Sở hữu tập thể(Collective ownership) — Bất kì người nào đều có thể thay đổi bất kì dòng lệnh nào vào bất kì thời điểm nào.
* Tích hợp liên tục(Continuous integration) — Tích hợp và xây dựng (build) hệ thống nhiều lần trong ngày, mỗi khi một tác vụ được hoàn thành.
* Làm việc 40 giờ một tuần— Không làm việc nhiều hơn 40 giờ một tuần. Không bao giờ làm việc quá giờ đến tuần thứ hai.
* Khách hàng tại chỗ(On-site customer) — Kết hợp một người dùng thật vào đội ngũ phát triển, làm việc toàn thời gian để trả lời các câu hỏi cho đội phát triển.
* Các chuẩn mực lập trình(Coding standards) — Lập trình viên viết tất cả các mã lệnh tuân theo những quy tắc nhằm khuyến khích giao tiếp thông qua mã lệnh.

**4. Quy trình của một dự án XP trông như thế nào?**
Hình vẽ dưới đây mô tả khái lược một chu trình phát triển dự án XP, từ lập kế hoạch phát hành (Release Planning) tới những hoạt động lập trình hằng ngày:
![](https://images.viblo.asia/bf68d7c0-3dd8-4668-8180-9a519fe88b36.png)

Ngày nay, rất nhiều kĩ thuật thực hành của XP được sử dụng rộng rãi dù đội ngũ phát triển có sử dụng XP hay không. Các kĩ thuật như lập trình theo cặp, lập trình hướng kiểm thử (TDD), tích hợp liên tục v.v. là những biện pháp “tiêu chuẩn” để các nhóm Agile đạt được chất lượng kĩ thuật cao nhất (technical excellence) trong  phát triển phần mềm linh hoạt, giúp loại bỏ được những món nợ kĩ thuật vốn là các vấn đề đau đầu của các mô hình phát triển phần mềm truyền thống. Theo dữ liệu của VersionOne một sự lựa chọn phổ biến của các nhóm Agile là kết hợp khung làm việc Scrum (thiên về quản lí công việc) và XP (thiên về kĩ thuật) để có được một quy trình phát triển phần mềm đầy đủ, đơn giản mà vẫn hiệu quả và mạnh mẽ.

Thao khảo thêm về XP tại:
http://www.extremeprogramming.org/

http://xp123.com