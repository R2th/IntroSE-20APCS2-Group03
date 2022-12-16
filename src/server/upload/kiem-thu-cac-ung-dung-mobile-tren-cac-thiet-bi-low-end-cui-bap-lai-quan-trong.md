# Tại sao vậy nhỉ?
Hãy cùng mình tìm hiểu nhé!

Low-End devices được định nghĩa là các thiết bị chất lượng thấp, tuy nhưng trong bài dịch này mình xin phép thay thế thành từ Thiết bị Cùi bắp cho gần gũi và dễ hiểu nhé ^^
 
Khi một QA bắt đầu làm một dự về án ứng dụng di động thì câu hỏi lớn nhất mà QA thường phải đối mặt chính là vấn đề môi trường kiểm thử.

Với thị trường ngày càng gia tăng các thiết bị điện thoại di động mỗi ngày, thì nó thực sự là một thách thức để quyết định xem thiết bị nào mà ứng dụng di động của bạn nên được kiểm thử trên đó. 

Lý do là gì vậy? Chắc chắn là bạn không thể mua tất cả các thiết bị đang có trên thị trường. Hay bạn cũng không thể thực hiện được mọi thử nghiệm trên các trình mô phỏng. Chính vì thế, việc kiểm thử cần phải được tạo ra theo một cách thông minh.

Android là một hệ điều hành mã nguồn mở và cho phép các công ty khởi động ứng dụng trên các thiết bị của họ và đương nhiên là với một mức giá rất thấp nữa chứ. Bạn cũng biết là không phải ai cũng có thể mua một chiếc iPhone hoặc Samsung S7 hoặc Nexus 6 vv, do đó mọi người thường có xu hướng mua điện thoại giá cả phải chăng như Samsung S6 hoặc Nexus 5 hoặc Redmi Note 4, v.v.
![](https://images.viblo.asia/58bbf688-cd5b-4f8a-87b0-10375f36cbc8.jpg)
# Các loại thiết bị di động
Các loại thiết bị có thể được chia thành Các thiết bị cao cấp và Thiết bị Cùi bắp:

Thiết bị cao cấp thường là các thiết bị với hệ điều hành Android cao nhất, 4G hoặc có thể sử dụng mạng LTE, kích thước màn hình 8 inches hoặc lớn hơn nữa, Bộ nhớ trên 7GB vân vân và mây mây. Và tất nhiên là giá của các thiết bị này là rất đắt nữa chứ :D

Ngược lại, Thiết bị Cùi bắp chỉ là những thiết bị đối lập hoàn toàn. Đó là các thiết bị với các phiên bản hệ điều hành cũ hơn, 2G hoặc cùng lắm là 3G, màn hình nhỏ, bộ nhớ ít hoặc là các điện thoại với khe cắm thẻ nhớ ngoài không lớn hơn 2 hoặc 3GB và do đó giá thành chúng khá là rẻ (Nói cách khác đi là giá cả phải chăng cho tất cả mọi người).

Ví dụ, dưới đây là sự phân phối người sử dụng smartphone dựa trên các loại mạng:
![](https://images.viblo.asia/a607b5d6-38a3-4d56-b559-8d254142fe2d.jpg)

Như bạn có thể nhìn thấy, thì chỉ có 28% người sử dụng sử dụng công nghệ tiên tiến và mới nhất của LTE trong khi đa số người dùng vẫn dùng GSM.

# Kiểm thử điện thoại di động

Nếu là một người kiểm thử phần mềm thì điện thoại di động tôi nên kiểm thử sẽ là gì? 

Khi bạn chọn thiết bị kiểm thử cho các ứng dụng di động, cho kiểm thử thủ công hoặc kiểm thử tự động, bạn có thể sử dụng các thiết bị giả lập, mô phỏng và thiết bị thật.

Việc chọn các lựa giữa các thiết bị thật và thiết bị giả lập và các thiết bị thật là một câu hỏi khó bởi vì không phải tất các lỗi Crash đều được phát hiện trên các thiết bị giả lập hoặc mô phỏng (các thông báo hoặc popup lỗi thường bị chặn) trong khi nếu phải mua tất các thiết bị thật thì công ty có thể sẽ tốn quá nhiều chi phí.

Tôi khuyên bạn nên có một chiếc điện thoại chất lượng cao, một hoặc hai chiếc điện thoại tầm trung và ít nhất là nên có hai chiếc điện thoại Cùi bắp.
Kinh nghiệm mà tôi có được khi làm việc trên nhiều loại thiết bị khác nhau là:

**#1) Thiết bị cao cấp:** Các ứng dụng chạy rất mượt trên các điện thoại cao cấp, rõ ràng khi bạn có kết nối 4G, bộ nhớ 8GB, thì khả năng một màn hình lớn bị trục trặc hoặc máy bị treo là ít nhất. Các điện thoại cao cấp nên được đưa vào để kiểm thử về mặt chức năng của ứng dụng nhưng điều đó cũng không chứng minh được rằng nó là một lựa chọn tốt để kiểm tra khả năng mở rộng (chống lại dữ liệu di động) hay giao diện người dùng bị lỗi hoặc rò rỉ bộ nhớ.

**#2) Thiết bị tầm trung:** Các ứng dụng chạy trơn tru nhưng vấn đề khả năng mở rộng và rò rỉ bộ nhớ vẫn bị 1/15 lần thử nghiệm. Tuy nhiên, nó vẫn không thể thỏa mãn được vì những lỗi crash được khách hàng báo cáo xảy ra trên thiết bị di động là không thể chấp nhận được và nó để lại ấn tượng xấu cho khách hàng về nhóm dự án, không giống như các ứng dụng trên máy tính để bàn hoặc ứng dụng web.

Các ứng dụng có thể hoặc không chạy trơn tru trên điện thoại cùi bắp vì một số yếu tố nhất định.
# Các yếu tố này bao gồm:
**1. Mạng chậm:** Hiện tại các thiết bị Cùi bắp không có các loại mạng vượt quá 3G và có các ứng dụng chạy trong background sử dụng băng thông mạng. Một kịch bản thực tế như sau: có thể người dùng có Sync On cho tài khoản email của anh ấy / cô ấy, Whatsapp, Google Now, v.v. thì lại chạy ở chế độ background ăn băng thông.

![](https://images.viblo.asia/6a9a5beb-7c20-4c9d-b283-3796bfda2fdf.jpg)

![](https://images.viblo.asia/8f757420-33e6-41f0-8010-9a66affd63cd.jpg)

**2. UI:** Các thiết bị Cùi bắp có thể có kích thước màn hình nhỏ khoảng từ 4 inches đến 6 hoặc 7 inches do đó việc cuộn xuống danh sách hay chạm vào các biểu tượng là một khó khăn. Các biểu tượng có kích thước nhỏ và không dễ để chạm vào chúng. Tương tự như việc chúng ta cuộn xuống một danh sách dài có thể là lý do gây ra lỗi hoặc các thẻ trong danh sách không thể tải đầy đủ hoặc bị méo mó.

Dưới đây là một lỗi về UI như thế:
![](https://images.viblo.asia/8d6d9893-592e-4c5e-8559-5e29b48a6022.jpg)

**3. Bộ nhớ ít:** Các thiết bị Cùi bắp không có 1 bộ nhớ lớn và hầu hết các ứng dụng có dung lượng tối đa khoảng 5-6 GB. Do đó, các ứng dụng chạy chậm và đôi khi điện thoại hiển thị các tin nhắn đóng hoặc "buộc dừng" một số ứng dụng để giải phóng bộ nhớ. 

# Tại sao kiểm thử trên các thiết bị Cùi bắp lại quan trọng?
Tùy thuộc vào đối tượng mục tiêu của bạn, có thể không cần sử dụng các thiết bị Cùi bắp mọi lần nhưng khi bạn đang thực hiện bản phát hành đầu tiên của ứng dụng, chắc chắn bạn nên thực hiện kiểm thử đầy đủ trên các thiết bị Cùi bắp.

Trên toàn thế giới, người dùng điện thoại đắt tiền cao cấp ít hơn và người dùng điện thoại tầm trung và Cùi bắp nhiều hơn. Nếu ứng dụng của bạn chạy trơn tru trên điện thoại cao cấp thì điều đó không có nghĩa là ứng dụng đó sẽ hoạt động tốt trên thiết bị Cùi bắp đâu nhé.

Dựa trên kinh nghiệm 3 năm của tôi (tác giả bài viết), tôi thích kiểm thử trên điện thoại Cùi bắp trước.

Kiểm thử trên điện thoại cùi bắp là quan trọng vì:
* Hệ điều hành của điện thoại là cũ và phiên bản không phải là mới nhất.
* Có rất nhiều ứng dụng đã được cài đặt trên điện thoại sử dụng một bộ nhớ lớn, do đó, nó là một môi trường hoàn hảo để kiểm thử các trường hợp "bộ nhớ ít".
* Tương tác với các ứng dụng khác để tương thích như sử dụng Google Maps, Trình quay số điện thoại, ứng dụng Nhắn tin, v.v.
* Chức năng Camera không nâng cao ở các điện thoại Cùi bắp.
* Nếu ứng dụng của bạn cần gửi tọa độ địa lý, thì pin của điện thoại Cùi bắp sẽ bị cạn kiệt.
* Do màn hình quá nhỏ dẫn đến việc nhấn vào các biểu tượng hoặc cuộn màn hình hoặc điều hướng giữa các màn hình có thể có vấn đề, v.v.

Một số lỗi điển hình chỉ thấy xảy ra trên các thiết bị Cùi bắp (Đây là những lỗi mà tác giả bài viết này gặp phải khi kiểm thử):

1. Ứng dụng của chúng ta có một dịch vụ web để gửi vị trí địa lý mỗi 10 phút một lần nhưng như trên điện thoại cùi bắp (thiết bị tác giả dùng để kiểm thử) có 2G, cuộc gọi dịch vụ web đã bị thất bại. Do đó, 2 vấn đề chính xuất hiện - [i] vị trí không ghi lại trong DB và [ii] pin của điện thoại đã bị cạn kiệt.

2. Trong khi thực hiện kiểm thử trên mạng 2G, chúng tôi nhận thấy rằng các dịch vụ web mất nhiều thời gian hơn để đăng nhập hay nạp dữ liệu cho màn hình hay gửi dữ liệu. Đôi khi để xem dữ liệu cập nhật cũng mất tận 15 phút.

3. Chúng tôi đã có các thẻ để hiển thị danh sách phân phối trong một ngày và trong khi cuộn một danh sách dài 50 thẻ thì ứng dụng đã crash.

4. Trong khi ấn nút quay lại, điều hướng bị thất bại và nó đã điều hướng sang 2 màn hình trở lại thay vì một màn hình.

5. Chúng tôi đã chụp ảnh và sau khi chụp ảnh, chúng tôi đã thay đổi lại kích thước (giảm kích thước) hình ảnh. Trên điện thoại cấp thấp, ứng dụng Camera bị crash sau khi chụp 3-4 ảnh trong khi đang thay đổi kích thước ảnh do bộ nhớ không được giải phóng khỏi ảnh chụp trước đó.

Ví dụ về lỗi Camera bị crash:
![](https://images.viblo.asia/b8281e31-4084-4cb9-8591-9f0262642703.jpg)

6. Một số biểu tượng quá nhỏ để có thể ấn và do đó không thể kiểm thử được một số chức năng liên quan.

Đây là một số lỗi quan trọng nhất nó không xuất hiện ngay cả trên thiết bị cao cấp dựa theo quan sát của nhóm chúng tôi. Tất cả những vấn đề này sau đó đã được sửa bởi nhóm phát triển và chúng tôi đã thực hiện hồi quy hoàn toàn trên các thiết bị Cùi bắp.

Trong thực tế, tôi nhớ rằng trong bản phát hành đầu tiên, chúng tôi đã nhận được rất nhiều lỗi về chức năng camera từ những khách hàng đang sử dụng điện thoại cùi bắp và sau khi ấn vào khoảng 20-30 hình ảnh, chúng tôi đã có thể tái hiện được lỗi đó. Đó là một thử thách khó khăn đối với chúng tôi khi chúng tôi bắt đầu làm ứng dụng và hơn nữa ứng dụng di động đó hoàn toàn là một thử thách mới đối với chúng tôi.

Người dùng không sử dụng điện thoại cao cấp và chỉ có khoảng 5% trong số họ có iPhone 5 hoặc S3 (đó là phiên bản mới nhất vào thời điểm đó. Trong khi thử nghiệm trên một thiết bị Cùi bắp thì sẽ thật tuyệt vời khi sử dụng mạng di động thay vì Wifi tốc độ cao.
![](https://images.viblo.asia/e72206e4-8441-4e2b-8836-cf517e8e2198.jpg)

![](https://images.viblo.asia/d9c0e6f9-d4c1-4a2b-90ea-0b601b5c4679.jpg)
 
Sau lần phát hành đầu tiên, chúng tôi đã kiểm thử khả năng mở rộng, Stress và UI trên 2 điện thoại Cùi bắp và 1 điện thoại tầm trung, tuy nhiên, vấn đề chủ yếu được tìm thấy trên điện thoại Cùi bắp. Để chắc chắn, chúng tôi đã thực hiện BVT trên điện thoại cao cấp.

Nó không cần thiết là bạn sẽ thấy cùng một loại lỗi trên các thiết bị khác nhau nhưng chắc chắn bạn sẽ thấy được các lỗi mà chỉ có trên điện thoại Cùi bắp mà không bao giờ thấy trên các điện thoại cao cấp.
# Trình giả lập hoặc mô phỏng như một sự thay thế cho điện thoại cùi bắp
Câu hỏi đặt ra là: Tôi có thể sử dụng Trình giả lập hoặc mô phỏng làm thiết bị thay thế cho Điện thoại Cùi bắp không?

Câu trả lời là: Bạn không nên sử dụng trình giả lập hoặc mô phỏng cho điện thoại cùi bắp vì nhóm phát triển ứng dụng của tôi đã thử điều đó. Họ đã đang thực hiện BVT trên trình giả lập và do đó họ đã bỏ lỡ một vài lỗi crash.

Ban đầu, khi chúng tôi bắt đầu làm trên một ứng dụng dành cho thiết bị di động, bởi nó khá là mới mẻ với chúng tôi và nhóm phát triển không biết rằng nhiều thông báo lỗi bị các trình giả lập chặn và các lỗi không được hiển thị. Và chúng tôi đã tìm thấy những lỗi này khi kiểm thử trên các thiết bị thực.

Sau đó, ngay cả nhóm phát triển của chúng tôi cũng bắt đầu sử dụng các thiết bị thực để kiểm thử thay vì dùng thiết bị giả lập hoặc mô phỏng. Một lý do khác để tránh sử dụng trình giả lập là không thể tạo ra mạng 2G hoặc 3G và họ sử dụng mạng tốc độ cao của máy tính xách tay hoặc máy tính để bàn. Tuy nhiên, bạn có thể thực hiện kiểm thử những thứ như UI và điều hướng trên trình giả lập.
# Chiến lược kiểm thử đối với các điện thoại Cùi bắp

Là một QA, chiến lược “kiểm thử” đối với điện thoại Cùi bắp của tôi là gì?

Để quyết định chiến lược thử nghiệm cho điện thoại Cùi bắp thì cần phải rõ ràng về yêu cầu ứng dụng và những tính năng của điện thoại Cùi bắp sẽ ảnh hưởng đến ứng dụng và hiệu suất của nó. Các khiếm khuyết được tìm thấy trên điện thoại Cùi bắp là rất khó tìm và hơn thế là rất khó cho các QA có thể tái hiện, xác minh và phục hồi các lỗi như vậy.

Sau đây là một số điểm lưu ý để quyết định chiến lược kiểm thử, những điều này đã giúp tôi và nhóm của tôi, hy vọng chúng sẽ có ích cho bạn:

1. Không bao giờ được kiểm thử bằng tay độc lập trên một chiếc điện thoại cùi bắp, càng vận dụng nhiều kiến thức trí óc liên quan đến kiểm thử thì càng có cơ hội tìm ra các lỗi ẩn. Do đó, hãy thử “ghép cặp QA” hoặc kiểm thử trong một vòng tròn như là QA1 kiểm thử chức năng F1, sau đó để QA2 xác minh các lỗi tìm được ở chức năng F1, tiếp đó QA3 sẽ thực hiện kiểm thử hồi quy.

2. Thảo luận về chiến lược hay những phát hiện của bạn với các QA khác trong nhóm, điều này sẽ giúp ích rất nhiều vì có thể họ sẽ thấy điều gì đó mà bạn có thể không biết hoặc có thể họ có một số kinh nghiệm có thể giúp bạn.

3. Đến khi ứng dụng của bạn không ổn định, hãy tạo ra một nhiệm vụ kiểm thử riêng biệt chỉ dành điện thoại Cùi bắp và ước tính chúng.

4. Thực tế là không thể tạo ra một môi trường kiểm thử lý tưởng và cũng không có một số thiết bị điện thoại. Do đó (với sự đồng ý của người quản lý hoặc SM) hãy xem xem liệu các đồng nghiệp khác có các thiết bị như vậy không. Nếu có hãy yêu cầu hoặc nhờ họ cài đặt và sử dụng ứng dụng của bạn nhé.

5. Tương tự đối với kiểm thử Beta, hãy có BA hoặc Chủ sở hữu sản phẩm sử dụng điện thoại Cùi bắp và thực hiện kiểm thử một vòng từ đầu đến cuối.

6. Khi các lỗi chính được tìm thấy (như những lỗi đã đề cập ở trên), hãy ngồi với developer được phân công trong khi họ sửa lỗi. Như vậy bạn cũng phần nào hiểu được lý do đằng sau lỗi đó. Điều này sẽ giúp bạn không chỉ trong việc xác minh lỗi mà còn trong việc kiểm thử hồi quy về sau. Bạn cũng có thể lấy ý kiến của các developer về việc các lỗi đó sẽ được sửa như thế nào.

7. Cuối cùng nhưng không kém phần quan trọng, hãy ghi lại những lỗi như vậy. Bởi vì đó là một kiến ​​thức lớn mà bạn đã có được và có thể giúp đỡ người khác nữa. Tài liệu về việc lỗi xuất hiện như thế nào, nó được sửa ra sao, xác minh và kiểm thử hồi quy những lỗi đó.
# Kết luận

Ứng dụng di động là một thị trường phát triển nhanh chóng và một hệ điều hành mới được khởi chạy mỗi tháng, do đó là một QA, bạn không thể kiểm thử mọi sự kết hợp giữa hệ điều hành với thiết bị điện thoại và nó cũng không hề khả thi tẹo nào cả. Vì vậy, hãy lựa chọn thiết bị kiểm thử một cách thông minh. Kiểu như chọn các điện thoại thực, giả lập vv cho từng loại thiết bị cao cấp, tầm trung và Cùi bắp.

Có thể việc kiểm thử sẽ chỉ cần trên một số danh mục khác nhau tùy theo yêu cầu ứng dụng của bạn, nhưng theo kinh nghiệm của tôi thì bạn nên kiểm thử từ đầu đến cuối trên thiết bị Cùi bắp. Lý do là các tính năng trở nên lỗi thời, mạng chậm vv dẫn đến các lỗi mà bạn có thể không tìm thấy được trên điện thoại cao cấp đâu.

Trong kiểm thử ứng dụng dành cho thiết bị di động, các lỗi crash không phải lúc nào cũng được tìm thấy trong khi bạn kiểm và đôi khi có các lỗi báo cáo khách hàng mà bạn không bao giờ chú ý tới. Do đó Product Owner của bạn có thể một lần hoặc hai lần bỏ qua cho các lỗi bị sót đó nhưng không phải lúc nào điều đó cũng được chấp nhận, do đó, hãy cố gắng kiểm thử nhiều hơn trên điện thoại Cùi bắp nhé.

Nếu người quản lý hoặc BA của bạn không quan tâm đến việc phải có thiết bị cấp thấp để làm thiết bị thử nghiệm, hãy cố gắng và kiên quyết thuyết phục, trừ khi họ có lý do chính đáng nào đó hoặc chắc chắn rằng của khách hàng đều sử dụng điện thoại tốt nhất.(cái này khó à nha ^^)

Hy vọng bài dịch của mình sẽ giúp ích phần nào cho những bạn QA nào làm các dự án ứng dụng trên các thiết bị di động :)

Bài được dịch từ link: https://www.softwaretestinghelp.com/mobile-testing-low-end-devices/