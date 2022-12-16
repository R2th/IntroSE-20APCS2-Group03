Phát triển phần mềm là một thị trường vô cùng rộng lớn và phức tạp, có rất nhiều quy trình, quy trình khác nhau được các công ty áp dụng để phát triển và phát hành các sản phẩm phần mềm. Việc lựa chọn quy trình thường phụ thuộc vào nhiều yếu tố như nhu cầu kinh doanh, chuyên môn, nhóm phát triển, loại ứng dụng, mục tiêu kinh doanh, khung thời gian phát triển, v.v.

Quá trình phát triển phần mềm được gọi là SDLC (Software Development Life Cycle). Nó bao gồm một số giai đoạn như lập kế hoạch, phân tích, thiết kế và thực hiện. Nhiều mô hình SDLC đã được tạo ra như thác nước, xoắn ốc và mô hình chữ V, v.v.

Mỗi quy trình trình bày  một cách tiếp cận khác nhau để lập kế hoạch, thiết kế, phát triển, thử nghiệm và thực hiện dự án tổng thể. Trong bài viết này, chúng ta sẽ cùng tìm hiểu hai quy trình phổ biến hiện nay là Thác nước và SCRUM.

# 1. Quy trình phát triển phần mềm truyền thống (SDLC).
Mô hình Vòng đời phát triển phần mềm (SDLC) bao gồm các giai đoạn sau:
![](https://images.viblo.asia/ed44ef2d-539f-486a-b919-74f0c5f01c6a.png)

**Requirement planing and analysis ( Lập kế hoạch và phân tích yêu cầu):** Yêu cầu được thu thập trong giai đoạn này. Giai đoạn này là trọng tâm chính của dự án. Các cuộc họp với người quản lý, với các bên liên quan và người dùng được tổ chức để xác định yêu cầu như: Ai sẽ sử dụng hệ thống? Họ sẽ sử dụng hệ thống như thế nào? Dữ liệu nào nên được nhập vào hệ thống? Dữ liệu nào nên được xuất bởi hệ thống? Đây là những câu hỏi chung được trả lời trong giai đoạn thu thập yêu cầu. Sau đó các yêu cầu này được phân tích về tính hợp lệ của chúng và khả năng kết hợp với các yêu cầu khác trong hệ thống.

Cuối cùng, một tài liệu đăc tả yêu cầu được tạo ra, phục vụ cho giai đoạn tiếp theo của quy trình. Nhóm kiểm thử tuân theo quy trình kiểm thử phần mềm và bắt đầu giai đoạn lập kế hoạch kiểm thử sau khi phân tích yêu cầu được hoàn thành.

**Design ( Thiết kế):** Trong giai đoạn này, thiết kế hệ thống và phần mềm được chuẩn bị từ các thông số kỹ thuật yêu cầu đã được nghiên cứu trong giai đoạn đầu tiên. Thiết kế hệ thống giúp xác định các yêu cầu phần cứng và kiến trúc hệ thống tổng thể. Các thông số kỹ thuật thiết kế hệ thống phục vụ như đầu vào cho giai đoạn tiếp theo của mô hình.

Trong giai đoạn này, tester cũng nên viết testplan, checklist, testcase,... để chuẩn bị cho việc kiểm thử.

**Implementation or coding (Thực hiện / Mã hóa):** Khi nhận được tài liệu thiết kế hệ thống, công việc được chia thành các mô-đun / đơn vị và việc mã hóa được bắt đầu. Vì, trong giai đoạn này mã được tạo ra nên nó là trọng tâm chính cho phát triển phần mềm. Đây là giai đoạn dài nhất của vòng đời phát triển phần mềm.

**Testing (Thử nghiệm):** Sau khi code xong, mã nguồn được kiểm thử dựa trên spec đã được thu thập trong giai đoạn đầu và dựa trên tính khả dụng người dùng. Trong giai đoạn này tất cả các loại kiểm thử chức năng như kiểm thử đơn vị, kiểm thử tích hợp, kiểm tra hệ thống, kiểm tra chấp nhận được thực hiện cùng với các kiểm thử phi chức năng cũng được thực hiện.

**Deployment (Triển khai)**: Sau khi thử nghiệm thành công, sản phẩm được phân phối / triển khai cho khách hàng để sử dụng.

Ngay sau khi sản phẩm được cung cấp cho khách hàng, trước tiên họ sẽ thực hiện kiểm thử beta. Nếu có bất kỳ thay đổi nào được yêu cầu hoặc nếu bất kỳ lỗi nào tồn tại, thì sẽ báo cáo cho nhóm kỹ thuật. Một khi những lỗi đó được khắc phục hoặc các lỗi là cố định thì việc triển khai cuối cùng sẽ xảy ra.

**Maintenance (Bảo trì)**: Sau khi đưa sản phẩm phần mềm cho khách hàng sử dụng nếu phát sinh lỗi và cần giải quyết theo thời gian thì sẽ được đưa lại bộ phận chăm sóc để khắc phục.

Có rất nhiều mô hình phát triển phần mềm trong SDLC như: thác nước, mô hình chữ V, xoắn ốc… Nhưng thác nước là mô hình SDLC truyền thống nổi tiếng và được nhiều người biết đến rộng rãi nhất. Nó chỉ thực hiện theo một quy trình tuần tự, chảy đều đặn xuống dưới như một dòng thác và được sử dụng trong quá trình phát triển phần mềm.
Không thể thay đổi bất cứ điều gì khi phát sinh yêu cầu của khách hàng, vì nó luôn tuân theo một thứ tự nhất định. Điều này dẫn đến việc phải đối mặt với một số vấn đề như: khách hàng sẽ không nhận được sự hài lòng, yêu cầu sẽ được chờ xử lý, không có lợi nhuận, lãng phí thời gian.

# 2. AGILE
Nhịp độ môi trường kinh doanh ngày càng nhanh buộc các công ty phải nhanh chóng thay đổi để đáp ứng với các điều kiện thị trường đang biến động. Để có thể duy trì tính cạnh tranh, các sản phẩm cần phải thích ứng với những thay đổi, nhu cầu trên thị trường, cho ra các tính năng mới và bổ sung với tốc độ nhanh. Do đó, phần lớn các công ty về phần mềm hiện nay đang chuyển sang mô hình Agile.

Agile là một quy trình có nhiều khung công tác như SCRUM, Kanban, Scrumban, vv 

SCRUM được khởi xướng bởi Ken Swaber vào năm 1995. Nó là một trong các quy trình phát triển Agile vì nó có chứa tất cả các đặc điểm cốt lõi của Agile . SCRUM là một nhóm hoạt động, được ví như là một bao gói, trong đó mọi người trong nhóm cùng nhau thực hiện các công việc. Nó thực hiện dự án với thời gian và chi phí tối thiểu. 

SCRUM là quy trình mạnh và có cấu trúc thể hiện rõ nhất của Agile. Người ta nói rằng “SCRUM giống như một người mẹ chồng. Mong đợi bạn tuân theo mọi yêu cầu mà nó đã xác định và tuyệt vời trong việc chỉ ra các sai sót ”.

![](https://images.viblo.asia/de67c653-2fc6-4b7b-ad84-4b39e4708390.png)

Có một số bước cụ thể, không thay đổi trong quy trình Scrum. Bao gồm:

**Product backlog:** Product Backlog là danh sách các chức năng cần được phát triển của sản phẩm. Danh sách này do Product Owner quyết định. Nó thường xuyên được cập nhật để đáp ứng được nhu cầu thay đổi của khách hàng cũng như các điều kiện của dự án.

 
**Sprint planning:** Như chúng ta đã biết ở trên Sprint là một giai đoạn phát triển có thời gian từ 2-4 tuần. Để chuẩn bị cho mỗi Sprint team cần phải họp để xác định những chức năng nào (story) sẽ phát triển trong giai đoạn này (sprint backlog), kết quả đầu ra dự kiến (Goal, kết quả Release), Estimate (ước lượng ai làm việc gì) và thảo luận các giải pháp. Tất cả được ghi thành biên bản để có cơ sở thực hiện và Review sau này.

 
**Backlog refinement/grooming:** Vào cuối một sprint, nhóm phát triển và PO phải đảm bảo backlog đã sẵn sàng cho sprint tiếp theo. Nhóm có thể loại bỏ các chức năng không liên quan, tạo vấn đề mới, đánh giá lại mức độ ưu tiên của các vấn đề hoặc chia nhỏ các yêu cầu của người dùng thành các tác vụ nhỏ hơn. Mục đích của cuộc họp này là đảm bảo việc tồn đọng chỉ chứa các mục có liên quan, chi tiết, và đáp ứng các mục tiêu của dự án.

 
**Daily Scrum meetings:** là một cuộc họp đứng lên 15 phút, nơi mỗi thành viên trong nhóm nói về mục tiêu của họ và bất kỳ vấn đề nào nảy sinh. cuộc họp diễn ra mỗi ngày trong Sprint, giúp dễ dàng theo dỗi các công việc đang thực hiện , chưa thực hiện hay sắp thực hiện.Thường cuộc họp này mỗi người sẽ phải tự trả lời 3 câu hỏi: Hôm qua đã làm những gì ? Có gặp khó khăn gì không? Hôm nay sẽ làm gì ?

 
**Sprint review meeting:** Vào cuối mỗi Sprint, nhóm trình bày công việc họ đã hoàn thành tại cuộc họp đánh giá. Cuộc họp này phải trình bày trực tiếp, không thông qua báo cáo hay bản trình bày PowerPoint.

 
**Sprint retrospective meeting:**  Vào cuối mỗi Sprint, nhóm nghiên cứu phản ánh mức độ làm việc với nhau và thảo luận về bất kỳ thay đổi nào cần được thực hiện trong Sprint tiếp theo. Nhóm có thể nói về những gì diễn ra tốt đẹp trong thời gian Sprint vừa qua , điều gì đã xảy ra và những gì họ có thể làm khác đi.


# 3. So sánh giữa quy trình phát triển phần mềm truyền thống (Mô hình Thác nước) và SCRUM (Agile)




| STT |       Mô tả     | SDLC truyền thống |        SCRUM     |
|-----| ----------------| ----------------- | ---------------- |
| 1   | Đối tượng       | Phân tích nghiệp vụ(BA),Quản lý chu trình, Quản lý dự án, Phát triển phần mềm (Dev),Kiểm thử phần mềm (Test),Thiết kế/ giao diện người dùng      | Người chịu tránh nhiệm sản phẩm (PO),Đảm bảo sự vận hành (Scrum Master), Nhóm Scrum chức năng chéo  |
|  2  |  Quy trình      | Phân tích, thiết kế, phát triển. Triển khai cần được hoàn thành cho mọi giai đoạn của dự án. |Mỗi giai đoạn của dự án có nhiều lần lặp lại. Phân tích, thiết kế, phát triển. Triển khai cần phải được hoàn thành trong mỗi vòng lặp.    |
|  3  |  Thời gian chuyển giao| Dựa trên thời gian dự án tổng thể| Từ 2-4 tuần                    |
|  4  | Kích thước nhóm | Số thành viên nhóm là tập trung, quy mô nhóm có thể thay đổi từ 2 đến 100 thành viên.| Chia nhỏ các nhóm lớn thành các nhóm nhỏ, từ 2 đến 8 thành viên nhóm có sự phối hợp và cộng tác cao.|
| 5   | Tính khả dụng của khách hàng| Sự tham gia của khách hàng ngày càng quan trọng hơn.| Cách tiếp cận hợp tác hơn, nơi sự tham gia của khách hàng được đề cao.|
| 6   |Thay đổi cách quản lý|Phải dựa vào các điều khoản của hợp đồng.Chi phí cho một thay đổi có thể rất cao nếu thay đổi có tác động lớn hơn đến thiết kế.|Thích ứng với những thay đổi. Chi phí cho một thay đổi thấp hơn khi phạm vi được xác định cho các thời gian chuyển giao nhỏ hơn.|
| 7   |Độ ưu tiên       | Nhấn mạnh vào việc thực hiện các xây dựng đã được đưa ra trong yêu cầu. Làm tăng việc có các tính năng được xây dựng mà không đem lại giá trị cho ứng dụng.|Tập trung vào việc thực hiện các tính năng có giá trị quan trọng trước tiên. Giảm nguy cơ có các tính năng không sử dụng được / không được sử dụng được tích hợp trong ứng dụng.|
| 8   |Kích thước dự án| Tốt nhất là dự án dài hạn cái mà đòi hỏi nhiều tài liệu và nhiều sự tham gia của các bên liên quan.|Linh hoạt cho các dự án nhỏ từ 2-3 tuần đối với các dự án chạy trong nhiều năm với nhau.|
| 9|Tài trợ/ ROI|Hoạt động tốt với các dự án có kinh phí cố định trong đó phạm vi và độ lệch thỏa thuận bị hạn chế. ROI đạt được sau khi triển khai thành công dự án.|Hoạt động tốt với tất cả các dự án T & M và không cố định. Với nhóm phù hợp, ROI có thể được nhìn thấy trong một khoảng thời gian ngắn hơn.|
| 10 |Suy nghĩ tổng quan|Ngày nay, có một số doanh nghiệp lớn sử dụng quy trình thác nước trong ngành công nghiệp phần mềm. Tôi cảm thấy quy trình này thích hợp nhất với các lĩnh vực như xây dựng, ví dụ xây dựng một cây cầu. Nhưng đã có nhiều ý kiến cho rằng, ngay cả các lĩnh vực xây dựng hiện nay cũng đang chuyển sang quy trình Lean, Kanban (Agile) dựa trên sự tiếp cận để loại bỏ các hoang phí từ quá trình của họ.|Scrum phù hợp hơn với môi trường phát triển nhịp độ nhanh hoặc ngành sản xuất liên tục.|


# 4. Kết luận
Quy trình SDLC truyền thống (Thác nước) hay quy trình SDLC mới (SCRUM) quy trình nào cũng đều có những ưu điểm và nhược điểm riêng, việc lựa chọn quy trình nào là phụ thuộc vào tổ chức và dự án thực hiện: 
- SCRUM là tốt nhất nếu các yêu cầu thường xuyên thay đổi.
- WATERFALL là tốt nhất nếu không có thay đổi trong yêu cầu.

Bạn nên sử dụng Waterfall cho các dự án mà bạn đã có tất cả tài liệu (từ đầu đến cuối), và không cần phải thay đổi gì khi thực hiện. Bất cứ khi nào bạn phải đối mặt với một dự án chưa có mục tiêu cuối rõ ràng và yêu cầu phải đổi mới liên tục, hãy dùng Agile.
#  Tài liệu tham khảo
https://www.clariontech.com/blog/scrum-vs-traditional-sdlc-waterfall
http://istqbexamcertification.com/what-are-the-software-development-life-cycle-sdlc-phases/