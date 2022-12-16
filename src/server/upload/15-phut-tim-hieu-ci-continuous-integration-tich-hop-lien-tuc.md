## CI LÀ GÌ ?

Định nghĩa lý thuyết thì CI (là viết tắt của Continous Integration) là một thực hành trong phát triển phần mềm trong đó các thành viên của một đội tích hợp công việc của họ một cách thường xuyên, thường thì mỗi người sẽ tích hợp ít nhất là hàng ngày - dẫn tới có nhiều tích hợp trong một ngày. Mỗi sự tích hợp sẽ được kiểm định lại bởi một build tự động (bao gồm cả test) để phát hiện ra lỗi tích hợp càng sớm càng tốt. Nhiều người nhận thấy rằng hướng làm việc này giúp giảm thiểu đáng kể các vấn đề khi tích hợp và cho phép một đội phát triển có thể viết phần mềm nhanh hơn.
Nói tóm lại thì CI là phương pháp được sử dụng để đảm bảo code của toàn dự án luôn build được, luôn chạy đúng (Pass toàn bộ các test case).
## LỢI ÍCH KHI SỬ DỤNG CI

Trước khi nói đến lợi ích khi sử dụng CI. Ta thử xét ví dụ nếu không có CI thì sẽ như thế nào : 

Mẫn là dev làm việc ở công ty lập trình A. Mỗi sáng, các thành viên trong team update code từ Git về, code say sưa, sau đó commit code lên trước khi về nhà.
Đôi khi code không build được, cả team lại nháo nhào “truy tìm thủ phạm”: anh Kiều Sơn B sửa code mà quên commit file mới lên, chị Nguyễn Thị B sửa connection string, … Đời nhiều khi còn trái ngang hơn, anh A sửa code, chị B sửa code làm phần của Mẫn chạy bị lỗi, thế là Mẫn lãnh đủ. 
Mỗi cuối tuần, cả team lại phải OT để tích hợp và sửa lỗi. Và với quy trình như thế thì sản phẩm  phần mềm không bán được vì quá nhiều lỗi, release chậm và tệ hơn nữa là sẽ ảnh hưởng đến uy tín công ty A,...
Các lợi ích khi sử dụng CI có thể kể đến như sau:
* Giảm rủi ro tích hợp: Làm việc trên các dự án có nghĩa là nhiều người sẽ làm việc trên các task công việc riêng biệt hoặc các phần của mã nguồn. Càng nhiều người thì rủi ro khi tích hợp sẽ càng lớn dẫn đến việc sửa lỗi cũng như khắc phục những rủi ro này.  Thực hiện tích hợp hàng ngày hoặc thậm chí thường xuyên hơn có thể giúp giảm thiểu các loại vấn đề này ở mức tối thiểu.
* Tăng chất lượng code: Không cần phải lo lắng về các vấn đề xảy ra và tập trung nhiều hơn vào các tính năng của hệ thống giúp ta viết ra sản phẩm có chất lượng cao hơn.
* Phát hiện lỗi code sớm : Nếu việc build thất bại thì bạn và nhóm của bạn sẽ nhận được thông báo ngay lập tức và sẽ có phương án khắc phục sự cố trước khi những người khác trong nhóm kéo code lỗi đó về dẫn đến các rủi ro về sau.
* Giảm sự tranh luận giữa các thành viên: Hệ thống mang khách quan tại chỗ giúp giảm sự tranh cãi giữa các thành viên xem ai là người gây ra lỗi vì chỉ cần xem CI report thì sẽ tìm ra thủ phạm ngay.
* Giúp bớt phần nào công việc của tester: Vì hệ thống đã tích hợp việc chạy các test case khiến các bug cơ bản được phát hiện sớm giúp giảm lượng công việc của các tester và họ có thể dùng effort vào những việc khác.
* Giảm thời gian deploy:  Deploy dự án là một công việc rất nhàm chán và tốn thời gian, và việc tự động hoá quá trình này là rất cần thiết.
* Tạo tâm lý thoải mái : chúng ta sẽ không làm việc hiệu quả nếu cứ lo sợ sẽ làm hỏng một cái gì đó. Việc áp dụng CI sẽ giúp các thành viên có tâm lý thoải mái từ đó tập trung tinh thần tạo ra kết quả tốt hơn.
* Thành viên mới có thể hòa nhập dễ dàng hơn : Quá trình build có thể tăng tốc sự thích ứng của thành viên mới đối với nhóm của mình.
### Tóm lại:

| Không sử dụng CI | Sử dụng CI |
| -------- | -------- |
| Rất nhiều lỗi|Ít lỗi hơn|
| Commit không thường xuyên|Commit thường xuyên|
| Bản phát hành không thường xuyên, chậm|Bản phát hành hoạt động thường xuyên|
| Khó tích hợp|Tích hợp dễ dàng và hiệu quả|
| Kiểm thử xảy ra muộn|Kiểm thử xảy ra sớm và thường xuyên|
| Khó khắc phục các sự cố|Khắc phục sự cố nhanh và hiệu quả|
## QUY TRÌNH CI

Quay lại ví dụ ở trên. Sau khi áp dụng CI vào dự án:
1. Mỗi khi có người commit code, hệ thống CI sẽ tự lấy code từ SVN, thực hiện build. Hệ thống sẽ gửi mail thông báo cho toàn bộ thành viên nếu như build bị lỗi. Cả nhóm chỉ việc đọc mail, xem ai là người commit revision đó, và “nắm đầu” thủ phạm, bắt hắn sửa lỗi.
2. Project của Nam được viết Unit Test rất cẩn thận, đầy đủ. Khi anh A, chị B sửa code, commit lên, hệ thống sẽ build và chạy lại toàn bộ các Unit Test. Nếu có case nào bị fail, cả team sẽ nhận được thông báo, và anh A, chị B phải nhanh chóng fix code để các case này pass.
3. Việc tích hợp được diễn ra hàng ngày, nhiều lần trong ngày. Mỗi khi ai đó commit code làm hư build hoặc gây lỗi, cả team có thể giải quyết vấn đề NGAY LẬP TỨC.
![](https://images.viblo.asia/43fe6e90-44a2-498e-ba1c-9d97430702a1.jpg)
## TẠM KẾT

Hiện tại có rất nhiều bên thứ 3 cung cấp cái CI tool. Sử dụng các CI tool này giúp đảm bảo toàn bộ quy trình và cho phép chúng ta bổ sung, mở rộng tính năng dễ dàng. Về mặt kỹ thuật, CI tool không bắt buộc được dùng, cũng giống như IDE không nhất thiết phải có cho việc phát triển phải mềm, nhưng việc implement sẽ khó hơn đáng kể nếu không có một tool như thế. Những CI tool được biết đến rộng rãi có thể tìm thấy ở [đây](https://code-maze.com/top-8-continuous-integration-tools/).

Bài viết tập trung tìm hiểu về CI. Ở bài viết tới mình sẽ trình bày khái niệm về CD (Continuous delivery). Cảm ơn các bạn đã theo dõi bài viết nhé.
## TÀI LIỆU THAM KHẢO

https://toidicodedao.com/2015/08/27/giai-thich-don-gian-ve-ci-continuous-integration-tich-hop-lien-tuc/
https://code-maze.com/what-is-continuous-integration/