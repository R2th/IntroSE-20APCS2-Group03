Xin chào mọi người, nếu bạn đang muốn tìm hiểu về DevOps thì hãy bắt đầu cùng mình nhé!

![](https://images.viblo.asia/fc6345c3-f72b-4f2d-878c-3753b586c9e0.jpg)

*<div align="center">Image from Pramod Tiwari</div>*

## DevOps là gì?
DevOps không phải là một công cụ, phần mềm hoặc một ngôn ngữ lập trình nào đó. Nếu search google bạn có thể thấy nó được định nghĩa như sau:

```
*DevOps is a set of practices that combines software development and IT operations.*
DevOps là một tập hợp các hoạt động để kết hợp software development và IT operations.

*It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.* 
Nó nhằm mục đích rút ngắn vòng đời phát triển phần mềm và cho phép phân phối phần mềm liên tục với chất lượng cao.

*DevOps is complementary with Agile software development; several DevOps aspects came from the Agile way of working*
DevOps bổ sung cho phương pháp Agile; một số khía cạnh DevOps đến từ cách làm việc Agile
```

Có thể nói một cách ngắn gọn DevOps là con đường để làm mọi thứ theo cách thông minh hơn khi phát triển phần mềm.  Dưới đây là 1 ví dụ cụ thể để tụi mình có thể hình dung vai trò của DevOps trong quy trình phát triển 1 phần mềm:

Một công ty sản xuất phần mềm có 2 bộ phận:
* Team Development: (Developer, Designer, BrSe, BA, QC,...) chịu trách nhiệm lên kế hoạch (planning), thiết kế và xây dựng sản phẩm từ con số 0
* Team Operation: (System Administrator, System Engineer, Network Engineer, Security Engineer,..) chịu trách nhiệm kiểm tra, đánh giá và triển khai sản phẩm (được develop từ team Development) đến cho người dùng. Ngoài ra Operation team cũng sẽ gửi feedback (bug, tính năng) cho team Development để tiếp tục fix hoặc cải tiến sản phẩm.


**Vấn đề: sẽ có 1 khoảng thời gian chờ để team Development nhận được feedback từ team Operation. Điều này sẽ làm quá trình phát triển sản phẩm bị gián đoạn và mất nhiều thời gian hơn.**

Đây là lúc khái niệm DevOps xuất hiện để giải quyết vấn đề trên.

![image.png](https://images.viblo.asia/7dac2c97-77f2-4a2b-9bc2-5f015036ac59.png)

Như đã đề cập ở trên, DevOps bổ sung cho phương pháp Agile, một số khía cạnh DevOps đến từ cách làm việc Agile:

Bắt đầu sprint:
1. Plan: Lên kế hoạch và thiết kế tính năng sẽ phát triển trong sprint
2. Code: coding chức năng/fix bug theo kế hoạch ở trên
3. Build: đóng gói các output của quá trình coding bằng cách build
4. Test: kiểm thử trên bản build trên môi trường development (dev)
5. Release (Integrate): sau khi bản build ở môi trường dev pass, bản release sẽ được gửi đến team Operation để build và test 1 lần nữa
6. Deploy: triển code lên các môi trường STG/PRD
7. Operate: duy trì và vận hành sản phẩm 
8. Monitor: đo lường và theo dõi sản phẩm để có được feedback cho sprint sau
Kết thúc sprint.
Bắt đầu sprint mới...

Một case study thực tế đó là Netflix. Năm 2007, Netflix ra mắt dịch vụ streaming video. Tại thời điểm năm 2014, họ đã ước tính rằng cứ mỗi 1 giờ downtime thì sẽ tiêu tốn khoảng 200.000 USD. Nhưng giờ thì Netflix đã có thể giải quyết vấn đề đấy bằng cách chọn áp dụng DevOps để phát triển sản phẩm. Cụ thể là họ phát triển 1 tool có tên là Simian Army, cái sẽ liên tục tạo ra bugs trong 1 môi trường Dev. Điều này khiến các developer của Netflix có động lực để xây dựng một hệ thống không dễ bị đổ vỡ khi có bất kì điều gì xảy ra.

Trên đây là những gì mình rút ra được theo cách mình hiểu trong quá trình tự học DevOps. Nếu có chỗ nào chưa đúng hi vọng các bạn sẽ comment phía dưới để giúp mình học tốt hơn nhé. Cảm ơn mọi người đã xem!

Networking cũng là một trong những kiến thức quan trọng mà một Devops Engineer cần có, cùng mình tìm hiểu các khái niệm cơ bản của Networking trong [bài viết sau](https://viblo.asia/p/router-ip-address-host-la-gi-cung-minh-tim-hieu-cac-khai-niem-co-ban-trong-networking-nhe-PwlVmyygV5Z) nhé!

## Tham khảo
[90DaysOfDevOps](https://github.com/MichaelCade/90DaysOfDevOps?fbclid=IwAR0YihnJ0vr6MjAa6O_N4u88MD2T1PJoWZcxUe4_jGWNqFV2a5fMRirYTaA)

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).

Đồng đội [Junior Backend Engineer](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067).

Đồng đội [Junior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068).