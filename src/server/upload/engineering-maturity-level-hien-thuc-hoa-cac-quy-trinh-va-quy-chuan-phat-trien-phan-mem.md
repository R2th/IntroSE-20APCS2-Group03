## **Tại sao cần có Engineering Maturity Level tại ACB?**

**45.000.000** là con số thống kê số lượng xe gắn máy tại Việt Nam. Trong khi tổng dân số là **95.540.000** người, như vậy mỗi người dân sở hữu gần **0.5** chiếc xe gắn máy, tức khoảng 1 bánh xe.
Ở Việt Nam, hầu như mỗi ngã tư đều có một tiệm sửa xe gắn máy. Các bạn không tin à? Hãy bước ra trước cổng ACB tại CMT8, bạn không chỉ thấy 1, mà những 2 tiệm, có một bác ngồi trước cây ATM với mỗi bình hơi để bơm, vá xe; còn đối diện là một tiệm sửa xe có bảng hiệu và có ít nhất 2 chú thợ. Đây nhé:

![](https://images.viblo.asia/83bf8638-adc8-4778-8d98-a05cf14e573c.jpg)

Còn về khía cạnh sản xuất, với con số khiêm tốt là 3.500 sản xuất trong năm 1950 cho chiếc Honda D-Type (tiền thân của Honda Dream huyền thoại), đến nay Honda đã có thể sản xuất 2,38 triệu xe (2018) chỉ cho thị trường Việt Nam. Mỗi năm, họ lại ra những sản phẩm mới một cách dễ dàng như PCX, SH Mode, AirBlade, Vision, Rebel….

Các bạn có bao giờ tự hỏi, điều gì làm cho việc sản xuất và sửa xe gắn máy đơn giản một cách kinh khủng thế? Honda sản xuất số lượng lớn xe gắn máy và chỉ cần một bình hơi, vài cái kềm, tua-vít là có thể mở một tiệm sửa xe.

Nhưng sản xuất xe gắn máy thì có liên quan gì đến ACB Engineering? Về sản phẩm thì không, nhưng về khái niệm là giống nhau:

* Giai đoạn 1: Quy mô ban đầu: Honda sản xuất 3.500 Honda D-Type; so với ACB Engineering 300 nhân viên, làm ra khoảng 100 phiếu yêu cầu, vận hành 500 server, 100 app, 50 database, 300 thiết bị firewall, network.
* …
* …
* Giai đoạn 4: Phát triển diện rộng: Honda có thể sản xuất 2,38 triệu xe vào 2018, hàng trăm nghìn tiệm sửa xe trên khắp mọi miền tổ quốc; so với ACB Engineering muốn làm ra 2000 phiếu yêu cầu, vận hành, bảo trì tốt 1000 app, 500 database 1000 thiết bị firewall, network mỗi năm, phục vụ lên đến 6 triệu khách hàng:
* Giai đoạn 5: Vận hành tốt + Sản phẩm mới: Honda cho ra những dòng xe mới mỗi năm; so với ACB Engineering muốn đưa ra những sản phẩm mới cho nghiệp vụ mỗi năm như Giải pháp tích hợp với các ecosystems, Giải pháp bảo mật chống mất dữ liệu DLP, Giải pháp tăng tốc độ cho các phần mềm…

Có thể nói, Honda đã đạt đến Maturity Level cao nhất của việc sản xuất, vận hành: sản xuất một khối lượng lớn các sản phẩm có chất lượng cao (**Operations**), đồng thời, có thể tạo ra các sản phẩm mới một cách dễ dàng (**Development**). Ở đâu đấy giữa Giai đoạn 1 đến Giai đoạn 4 & 5, Honda đã làm được điều kỳ diệu này.

Câu trả lời chắc chắn không nằm ngoài: **quy chuẩn** và **quy trình**. Một số bạn sẽ thắc mắc, đặc biệt là Khối Quản trị Nguồn nhân lực, “Vậy yếu tố **con người** nằm đâu?”. Vâng, chỉ có **con người** mới tạo ra được **quy chuẩn** và **quy trình**, hay nói cách khác, **quy chuẩn** và **quy trình** là đầu ra, là thước đo của yếu tố **con người**. Vậy chúng ta hãy chỉ đề cập đến đầu ra trong tài liệu này, để yếu tố **con người** cho những bài viết sau chuyên về đề tài nhân sự nhé.

Về **quy chuẩn**, tất cả các hãng xe gắn máy (Honda, Yamaha, Kawasaki…) đều dùng những con ốc theo các kích thước như 4, 6, 8, 10, 12 li… bánh xe theo kích thước 70/90–17, 85/90–17, 80/90–14… đèn xi-nhan, pha theo điện áp 12V… các bạn lên trang web của Tổ chức quy chuẩn thế giới ISO sẽ xem được các thông số này: Motorcycles and Mopeds standards — https://www.iso.org/ics/43.140/x/. Những **quy chuẩn** này giúp cho **quy trình** sản xuất, kiểm tra chất lượng, vận hành, bảo trì, sửa chữa trở nên dễ dàng như các bạn đã biết, tất cả các bác thợ sửa xe đều có thể sửa chữa, bảo trì các dòng xe thông dụng trên thị trường.

“*Engineering Maturity Level giúp ACB có được một **quy chuẩn** về cách triển khai phần mềm và từ đó, xây dựng được các **quy trình** làm việc xoay quanh quy chuẩn, góp phần vận hành, bảo trì tốt (**Operations**) và phát triển được các phần mềm mới (**Development**) dễ dàng cho ACB*”

## **Các cấp độ của Maturity Level**

Thông thường, Maturity Level của một tổ chức được đánh giá qua 05 cấp độ (tham khảo CMMI, https://cmmiinstitute.com/):

![](https://images.viblo.asia/d00e7fe0-de93-4b1e-b142-11e45aa68f33.png)
*Nguồn: Primvis, http://www.primvis.com/service-1/*

* Cấp độ 1: Bắt đầu — Chưa có quy chuẩn, quy trình, các phần mềm được phát triển case by case.
* Cấp độ 2: Có quản lý — Các phần mềm được quản lý, đo lường và giám sát chặt chẽ.
* Cấp độ 3: Quy chuẩn được hình thành — việc quản lý, đo lường và giám sát tuân theo quy chuẩn của toàn hàng.
* Cấp độ 4: Quản lý ở diện rộng bằng số liệu — số liệu được đo đạc, phân tích kỹ càng để đáp ứng nhu cầu phát triển mới của Ngân hàng, ví dụ: để ACB phát triển gấp đôi số lượng khách hàng trong 2022, hệ thống hạ tầng CNTT, con người sẽ phải được phát triển ra sao để đáp ứng nhu cầu này.
* Cấp độ 5: Tối ưu hóa — nền tảng vững chắc, quy trình, quy chuẩn rõ ràng, giúp việc phát triển các chiến lược kinh doanh mới của Ngân hàng dễ dàng được hiện thực hóa, ví dụ: hệ thống CNTT có thể giúp ACB chuyển sang định hướng phát triển Ngân hàng di động (Mobile only) một cách dễ dàng…

## **ACB EML gồm những gì?**

Phiên bản v1.0 của ACB Engineering Maturity Level EML gồm 02 bộ quy chuẩn:
* EML Software Development Life Cycle (EML-SDLC) — dựa trên Agile Development
* EML Application Maturity Specifications (EML-AMS)

EML-SDLC bao gồm các hướng dẫn thực hiện, template và các tài liệu phát sinh từ những bước:
1. Planning: lên kế hoạch thực hiện các thay đổi về nguồn lực, thời gian, hạ tầng, chi phí…
1. Analysis: phân tích chi tiết các yêu cầu để thực hiện.
1. Design: lên thiết kế hệ thống, thiết kế giao diện UI/UX.
1. Development: bắt đầu phát triển phần mềm qua các sprint.
1. Testing: kiểm tra chất lượng code, unit test, SIT, load test, security test…
1. Deployment: thực hiện việc triển khai trên các môi trường khác nhau.
1. Maintenance: đưa vào vận hành, tiếp tục giám sát lỗi để liên tục cải tiến.

EML-AMS bao gồm 5 quy chuẩn con:
1. Design: các quy chuẩn về thiết kế tốt, dễ bảo trì, mở rộng, tích hợp
1. Development: các quy chuẩn về viết code sạch (clean code), bảo mật, an toàn và có khả năng phân tải cao.
1. QC: quy chuẩn về chất lượng, quy chuẩn viết automation test, security test…
1. CI/CD: quy chuẩn về tự động hóa việc đóng gói (build) và deploy…
1. Giám sát: quy chuẩn về việc in log, lưu log để có thể giám sát, cảnh báo tự động khi có sự cố.

[Nguồn](https://medium.com/acb-fintech/engineering-maturity-level-862b829f1b13)