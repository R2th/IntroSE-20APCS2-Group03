Ứng dụng ngân hàng là một trong những ứng dụng phức tạp nhất trong ngành công nghiệp kiểm thử và phát triển phần mềm ngày nay. Điều gì khiến cho ứng dụng Ngân hàng trở nên phức tạp như vậy? Làm cách nào để test các quy trình phức tạp liên quan đến các ứng dụng ngân hàng?

Trong bài viết này, chúng tôi sẽ làm nổi bật các giai đoạn và kỹ thuật khác nhau liên quan đến việc thử nghiệm các ứng dụng Ngân hàng.
![](https://images.viblo.asia/c75ea46c-2fb0-49d0-a65c-38606f150d3f.jpg)

 ***Cách kiểm tra ứng dụng ngân hàng***

Các đặc điểm của một ứng dụng Ngân hàng như sau:

+ Chức năng có nhiều tầng để hỗ trợ hàng nghìn phiên người dùng đồng thời
+ Tích hợp quy mô lớn: Thông thường, một ứng dụng ngân hàng tích hợp với nhiều ứng dụng khác như tiện ích Bill Pay và Tài khoản giao dịch
+ Quy trình công việc phức tạp
+ Thời gian thực và xử lý hàng loạt
+ Tỷ lệ giao dịch cao trên đơn vị thời gian tính bằng giây
+ Giao dịch phải đảm bảo độ an toàn tuyệt đối
+ Phần Báo cáo mạnh mẽ để theo dõi các giao dịch hàng ngày
+ Kiểm tra mạnh mẽ để khắc phục sự cố của khách hàng
+ Hệ thống lưu trữ lớn
+ Quản lý rủi ro / phục hồi tốt .

--> Mười điểm nêu trên là những đặc điểm quan trọng nhất của ứng dụng Ngân hàng.

Các ứng dụng ngân hàng có nhiều tầng liên quan đến việc thực hiện một thao tác nào đó ví dụ, một ứng dụng ngân hàng có thể có:

- Máy chủ web tương tác với người dùng cuối thông qua Trình duyệt
- Tầng giữa để xác thực đầu vào và đầu ra cho máy chủ web
- Cơ sở dữ liệu để lưu trữ dữ liệu và các thủ tục
- Bộ xử lý giao dịch có thể là một khung công suất lớn hoặc bất kỳ hệ thống cũ nào khác để thực hiện hàng nghìn tỷ giao dịch mỗi giây.

    Đối với việc thử nghiệm các ứng dụng ngân hàng, luôn đòi hỏi phương pháp end to end testing, đây là phương pháp thử nghiệm chính liên quan đến nhiều kỹ thuật kiểm thử phần mềm khác nhằm có mức đảm bảo tối đa:

Tổng các mức bao phủ của tất cả quy trình công việc của ngân hàng và Yêu cầu kinh doanh bao gồm: 
+ Chức năng của ứng dụng
+ Độ bảo mật của ứng dụng
+ Tính toàn vẹn của dữ liệu
+ Tính đồng thời
+ Kinh nghiệm của người dùng ứng dụng

    Các giai đoạn điển hình liên quan đến thử nghiệm ứng dụng ngân hàng được thể hiện trong quy trình làm việc dưới đây. Chúng tôi sẽ đi sâu phân tích riêng từng giai đoạn.

![](https://images.viblo.asia/ffc4b65d-b691-4dce-be62-357ab97b9a2f.jpg)
1) Thu thập yêu cầu :
Giai đoạn thu thập yêu cầu bao gồm tài liệu yêu cầu hoặc Thông số các chức năng hoặc các trường hợp sử dụng. Yêu cầu được thu thập theo nhu cầu của khách hàng và được ghi chép bởi các chuyên gia ngân hàng hoặc chuyên viên phân tích kinh doanh.

    Vì bản thân các website ngân hàng có nhiều tên miền phụ và một app ngân hàng đầy đủ sẽ là sự tích hợp của tất cả các miền này.

    Ví dụ: Ứng dụng ngân hàng có thể có các mô-đun riêng cho Chuyển khoản, Thẻ tín dụng, Báo cáo, Tài khoản cho vay, Thanh toán hóa đơn, Giao dịch v.v.

2) Đánh giá yêu cầu:

    Việc deliver yêu cầu thu thập sẽ được xem xét bởi tất cả các bên liên quan như kỹ sư QA, Dev leads và BA.


    Họ kiểm tra chéo để chắc chắn rằng không có quy trình việc kinh doanh hiện tại và luồng công việc mới nào bị vi phạm. Tất cả các yêu cầu được xác minh và xác nhận. Các hành động tiếp theo và các sửa đổi tài liệu yêu cầu được thực hiện .

3) Chuẩn bị kịch bản kinh doanh:

    Trong giai đoạn này, kịch bản kinh doanh là các kịch bản mức high level mà không có bất kỳ bước chi tiết nào. Hơn nữa, các kịch bản kinh doanh này được xem xét bởi các nhà phân tích kinh doanh để đảm bảo tất cả các yêu cầu kinh doanh được đáp ứng. BAs dễ dàng hơn để xem xét các kịch bản cấp cao hơn là xem xét các trường hợp kiểm tra chi tiết cấp thấp.

    Ví dụ , một khách hàng mở một khoản tiền gửi cố định trên giao diện ngân hàng kỹ thuật số có thể là một kịch bản kinh doanh. Tương tự, chúng tôi có thể có các kịch bản kinh doanh khác nhau liên quan đến việc tạo tài khoản ngân hàng net, tiền gửi trực tuyến, chuyển khoản trực tuyến, v.v.

4) Kiểm tra chức năng :

    Trong giai đoạn này, kiểm tra chức năng được thực hiện và các hoạt động kiểm thử phần mềm thông thường được thực hiện như:
- Chuẩn bị testcases:

- Trong giai đoạn này Các trường hợp thử nghiệm được lấy từ các kịch bản nghiệp vụ, một kịch bản nghiệp vụ dẫn đến một số trường hợp thử nghiệm tích cực và các trường hợp thử nghiệm tiêu cực. Nói chung, các công cụ được sử dụng trong giai đoạn này là Microsoft Excel, Test lead hoặc Trung tâm Chất lượng.

    Xem xét trường hợp kiểm tra: Đánh giá bởi các kỹ sư QA ngang hàng

- Chạy testcases

    Test Case Execution có thể là thủ công hoặc tự động liên quan đến các tool như QC, QTP hay bất kỳ tool nào khác.

    Kiểm thử chức năng của một ứng dụng ngân hàng hoàn toàn khác với thử nghiệm phần mềm thông thường. Vì các ứng dụng này hoạt động với tiền của khách hàng và dữ liệu tài chính vô cùng nhạy cảm, chúng luôn phải được kiểm tra kỹ lưỡng. Không cho phép bỏ lỡ test scenarios quan trọng nào . Ngoài ra, đội ngũ QA đang thử nghiệm ứng dụng cần phải có kiến ​​thức cơ bản về lĩnh vực ngân hàng.

5) Kiểm tra cơ sở dữ liệu :

    Ứng dụng ngân hàng liên quan đến giao dịch phức tạp được thực hiện ở cả cấp độ giao diện người dùng và cấp cơ sở dữ liệu, do đó, kiểm tra cơ sở dữ liệu cũng quan trọng như kiểm tra chức năng. Cơ sở dữ liệu phức tạp và là lớp hoàn toàn riêng biệt trong ứng dụng --> do đó thử nghiệm dữ liệu được thực hiện bởi các chuyên gia cơ sở dữ liệu, nó sử dụng các kỹ thuật như:
+ Load dữ liệu
+ Migration cơ sở dữ liệu
+ Kiểm tra lược đồ DB và các kiểu dữ liệu
+ Kiểm tra quy tắc
+ Kiểm tra các thủ tục và chức năng được lưu trữ
+ Trình kích hoạt thử nghiệm (data trigger)
+ Tính toàn vẹn dữ liệu
6) Kiểm tra bảo mật :

    Kiểm tra bảo mật thường là giai đoạn cuối cùng trong chu kỳ kiểm tra. Điều kiện tiên quyết để bắt đầu kiểm tra bảo mật là hoàn thành thử nghiệm chức năng và phi chức năng. Kiểm tra bảo mật là một trong những giai đoạn chính trong toàn bộ chu kỳ kiểm tra Ứng dụng vì giai đoạn này đảm bảo rằng ứng dụng tuân thủ các tiêu chuẩn của Liên bang và các tiêu chuẩn hiệp.

    Do tính chất của dữ liệu, các ứng dụng ngân hàng rất nhạy cảm và là mục tiêu chính cho tin tặc và các hoạt động gian lận. Kiểm tra bảo mật đảm bảo rằng ứng dụng không có bất kỳ lỗ hổng web nào có thể làm lộ dữ liệu nhạy cảm với kẻ xâm nhập hoặc kẻ tấn công. Nó cũng đảm bảo rằng ứng dụng tuân thủ các tiêu chuẩn như OWASP.

    Trong giai đoạn này, nhiệm vụ chính là quét toàn bộ ứng dụng được thực hiện bằng các tool như IBM AppScan hoặc HP WebInspect (2 công cụ phổ biến nhất).

    Khi Quét xong, Báo cáo quét sẽ được xuất ra. Trong báo cáo này, False Positives được lọc ra và phần còn lại của các lỗ hổng được báo cáo cho nhóm phát triển để họ bắt đầu sửa chữa các vấn đề tùy thuộc vào mức độ nghiêm trọng của từng vấn đề.

    Kiểm tra bảo mật nghiêm ngặt nên được thực hiện trên các nền tảng, mạng và hệ điều hành.

    Một số công cụ thủ công khác để kiểm tra bảo mật được sử dụng là: Paros Proxy , Http Watch , Burp Suite , Fortify tools Etc.

Ngoài các giai đoạn chính ở trên, có thể có các giai đoạn khác nhau liên quan đến Kiểm tra tích hợp, Kiểm tra khả năng sử dụng, Kiểm tra chấp nhận người dùng và Kiểm tra hiệu suất. Chúng ta hãy nói ngắn gọn về các giai đoạn này:

+ Thử nghiệm tích hợp
Như bạn biết rằng trong một ứng dụng ngân hàng, có thể có một số mô-đun khác nhau như chuyển tiền, thanh toán hóa đơn, tiền gửi, vv Và do đó, có rất nhiều thành phần được phát triển. Trong thử nghiệm tích hợp, tất cả các thành phần được tích hợp với nhau và xác nhận.

+ Kiểm tra khả năng sử dụng: Một ứng dụng ngân hàng phục vụ cho nhiều khách hàng. Một số khách hàng có thể thiếu các kỹ năng và nhận thức cần thiết để thực hiện các nhiệm vụ ngân hàng trên ứng dụng. Do đó, ứng dụng ngân hàng cần được kiểm tra để thiết kế đơn giản và hiệu quả để làm cho nó có thể sử dụng được trên các nhóm khách hàng khác nhau. Giao diện đơn giản và dễ sử dụng hơn, số lượng khách hàng cao hơn sẽ được hưởng lợi từ ứng dụng ngân hàng.

+ Kiểm tra hiệu suất: Một số khoảng thời gian nhất định như ngày trả lương, tài chính cuối năm, mùa lễ hội có thể mang lại thay đổi hoặc tăng đột biến trong lưu lượng truy cập thông thường trên ứng dụng. Do đó, một thử nghiệm hiệu suất toàn diện nên được thực hiện để khách hàng không bị ảnh hưởng bởi các lỗi hiệu suất. Một ví dụ quan trọng từ ngày trước: nơi khách hàng của ngân hàng bị ảnh hưởng cá nhân do thất bại về hiệu năng là mạng CNTT của NatWest và RBS vào thứ Hai, trong đó khách hàng có thẻ ghi nợ và thẻ tín dụng bị từ chối giao dịch trên khắp các cửa hàng trong nước.

+ Kiểm tra chấp nhận người dùng: Điều này được thực hiện bằng cách liên quan đến người dùng cuối để đảm bảo rằng ứng dụng tuân thủ các tình huống trong thế giới thực và sẽ được người dùng chấp nhận nếu nó hoạt động.

    Trong kịch bản hiện nay đa số các dự án ngân hàng đang sử dụng : Agile / Scrum, RUP và phương pháp tích hợp liên tục, và các gói Tools như VSTS và Rational Tools của Microsoft.

    Như chúng tôi đã đề cập về RUP ở trên, RUP là viết tắt của Rational Unified Process, là một phương pháp phát triển phần mềm lặp đi lặp lại do IBM giới thiệu bao gồm bốn giai đoạn trong đó các hoạt động phát triển và thử nghiệm được thực hiện. Bốn giai đoạn là

    i) Khởi đầu 
    
    ii) Hợp tác 
    
    iii) Xây dựng 
    
    iv) Chuyển đổi 
    RUP liên quan rộng rãi đến các công cụ Rational của IBM.

Trong bài viết này, chúng tôi đã thảo luận về việc một ứng dụng ngân hàng có thể phức tạp như thế nào và các giai đoạn điển hình liên quan đến việc thử nghiệm ứng dụng là gì . Ngoài ra cũng thảo luận về xu hướng hiện tại và xu hướng tiếp theo là các ngành công nghiệp CNTT bao gồm các phương pháp và công cụ phát triển phần mềm.

Bài viết được tham khảo và dịch từ link https://www.softwaretestinghelp.com/testing-banking-applications/